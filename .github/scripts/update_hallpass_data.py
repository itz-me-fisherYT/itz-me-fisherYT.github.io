import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[2]
OUTFILE = ROOT / "hallpasssmp" / "data" / "status.json"
PLAYERS_FILE = ROOT / "hallpasssmp" / "data" / "players.json"
BASE_URL = os.environ.get("HALLPASS_API_BASE", "").rstrip("/")
API_KEY = os.environ.get("HALLPASS_API_KEY", "")
EXTRA_PLAYERS = [
    name.strip()
    for name in os.environ.get("HALLPASS_PLAYERS", "").split(",")
    if name.strip()
]


def load_existing_names():
    if not OUTFILE.exists():
        return []
    try:
        existing = json.loads(OUTFILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return []
    stats = existing.get("statsByName", {})
    return list(stats.keys()) if isinstance(stats, dict) else []


def load_configured_names():
    if not PLAYERS_FILE.exists():
        return []
    try:
        players = json.loads(PLAYERS_FILE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return []
    return [name for name in players if isinstance(name, str) and name.strip()]


def fetch_json(path):
    if not BASE_URL:
        raise RuntimeError("HALLPASS_API_BASE is missing")
    if not API_KEY:
        raise RuntimeError("HALLPASS_API_KEY is missing")

    request = Request(
        f"{BASE_URL}{path}",
        headers={
            "Accept": "application/json",
            "Authorization": f"Bearer {API_KEY}",
            "User-Agent": "HallPassSMP-GitHub-Pages-Updater/1.0",
        },
    )

    with urlopen(request, timeout=20) as response:
        return json.loads(response.read().decode("utf-8"))


def safe_fetch(path, errors):
    try:
        return fetch_json(path)
    except (HTTPError, URLError, TimeoutError, RuntimeError, json.JSONDecodeError) as exc:
        errors.append(f"{path}: {exc}")
        return {}


def value_from(source, keys, fallback=None):
    for key in keys:
        value = source.get(key) if isinstance(source, dict) else None
        if value not in (None, ""):
            return value
    return fallback


def normalize_players(online):
    players = value_from(online, ["players", "onlinePlayers", "list", "names"], [])
    if not isinstance(players, list):
        return []

    names = []
    for player in players:
        if isinstance(player, str):
            names.append(player)
        elif isinstance(player, dict):
            name = value_from(player, ["name", "username", "player"])
            if name:
                names.append(name)
    return names


def merge_dicts(*payloads):
    merged = {}
    for payload in payloads:
        if isinstance(payload, dict):
            merged.update(payload)
    return merged


def fetch_player_snapshot(name, errors):
    encoded = quote(name, safe="")
    payloads = [
        safe_fetch(f"/api/player/{encoded}", errors),
        safe_fetch(f"/api/balance/{encoded}", errors),
        safe_fetch(f"/api/rank/{encoded}", errors),
    ]
    stats = merge_dicts(*payloads)
    if not stats:
        stats = safe_fetch(f"/api/stats/{encoded}", errors)
    if not stats:
        return None
    stats.setdefault("name", name)
    return stats


def main():
    errors = []
    health = safe_fetch("/api/health", errors)
    server = safe_fetch("/api/server", errors)
    online = safe_fetch("/api/online", errors)

    player_names = []
    for name in normalize_players(online) + EXTRA_PLAYERS + load_configured_names() + load_existing_names():
        if name.lower() not in [existing.lower() for existing in player_names]:
            player_names.append(name)

    stats_by_name = {}
    for name in player_names:
        player_snapshot = fetch_player_snapshot(name, errors)
        if player_snapshot:
            stats_by_name[name] = player_snapshot
        time.sleep(0.35)

    snapshot = {
        "ok": bool(health.get("ok") or health.get("online") or health.get("healthy")),
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "health": health,
        "server": server,
        "online": online,
        "statsByName": stats_by_name,
        "errors": errors,
    }

    OUTFILE.parent.mkdir(parents=True, exist_ok=True)
    OUTFILE.write_text(json.dumps(snapshot, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    if errors:
        print("Snapshot generated with some endpoint errors:")
        for error in errors:
            print(f"- {error}")
    else:
        print("Snapshot generated successfully.")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"Failed to update HallPass data: {exc}", file=sys.stderr)
        sys.exit(1)
