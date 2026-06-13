const HALLPASS_DATA_URL = "data/status.json";

const state = {
  snapshot: null,
  players: [],
  statsByName: {},
};

const selectors = {
  statusDot: document.querySelector("#status-dot"),
  statusText: document.querySelector("#server-status-text"),
  statusDetail: document.querySelector("#server-status-detail"),
  playerCount: document.querySelector("#player-count"),
  apiState: document.querySelector("#api-state"),
  playerList: document.querySelector("#player-list"),
  offlinePlayerList: document.querySelector("#offline-player-list"),
  refreshStatus: document.querySelector("#refresh-status"),
  statsForm: document.querySelector("#stats-form"),
  playerName: document.querySelector("#player-name"),
  statsPlayer: document.querySelector("#stats-player"),
  statsOnline: document.querySelector("#stats-online"),
  statsMessage: document.querySelector("#stats-message"),
  cursorOrb: document.querySelector("#cursor-orb"),
};

let toastTimer;
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let orbX = cursorX;
let orbY = cursorY;

const statFields = {
  world: document.querySelector("#stat-world"),
  rank: document.querySelector("#stat-rank"),
  balance: document.querySelector("#stat-balance"),
  playtime: document.querySelector("#stat-playtime"),
  joins: document.querySelector("#stat-joins"),
  deaths: document.querySelector("#stat-deaths"),
  playerKills: document.querySelector("#stat-player-kills"),
  mobKills: document.querySelector("#stat-mob-kills"),
  blocksBroken: document.querySelector("#stat-blocks-broken"),
  blocksPlaced: document.querySelector("#stat-blocks-placed"),
  distanceWalked: document.querySelector("#stat-distance-walked"),
  jumps: document.querySelector("#stat-jumps"),
  firstJoined: document.querySelector("#stat-first-joined"),
  lastSeen: document.querySelector("#stat-last-seen"),
};

async function fetchSnapshot() {
  const response = await fetch(`${HALLPASS_DATA_URL}?v=${Date.now()}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Snapshot returned ${response.status}`);
  }

  return response.json();
}

function valueFrom(source, keys, fallback = "--") {
  for (const key of keys) {
    if (source && source[key] !== undefined && source[key] !== null && source[key] !== "") {
      return source[key];
    }
  }
  return fallback;
}

function formatNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString() : value || "--";
}

function formatDate(value) {
  if (!value) return "--";
  const date = new Date(normalizeTimestamp(value));
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function normalizeTimestamp(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return value;
  return number < 10000000000 ? number * 1000 : number;
}

function formatDuration(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return value || "--";

  let totalSeconds = number > 100000 ? Math.floor(number / 1000) : Math.floor(number);
  const days = Math.floor(totalSeconds / 86400);
  totalSeconds -= days * 86400;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds -= hours * 3600;
  const minutes = Math.floor(totalSeconds / 60);

  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes || !parts.length) parts.push(`${minutes}m`);
  return parts.slice(0, 3).join(" ");
}

function formatDistance(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return value || "--";
  if (number >= 1000) return `${(number / 1000).toFixed(1)}k`;
  return Math.round(number).toLocaleString();
}

function normalizeName(name) {
  return String(name || "").trim().toLowerCase();
}

function setStatus(kind, title, detail) {
  selectors.statusDot.className = `status-dot ${kind}`;
  selectors.statusText.textContent = title;
  selectors.statusDetail.textContent = detail;
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.append(toast);
  }

  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1700);
}

function burstSpark(target, event) {
  const rect = target.getBoundingClientRect();
  const spark = document.createElement("span");
  spark.className = "spark";
  spark.style.left = `${event.clientX - rect.left}px`;
  spark.style.top = `${event.clientY - rect.top}px`;
  target.append(spark);
  spark.addEventListener("animationend", () => spark.remove(), { once: true });
}

function makeGlowCardsInteractive() {
  const glowCards = document.querySelectorAll(".hero-copy, .status-panel, .stats-lookup, .section, .server-status, .status-metrics article, .stats-card, .stats-grid div, .command-columns article");

  glowCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 3.5;
      const rotateX = (0.5 - (y / rect.height)) * 3.5;

      card.classList.add("is-lit");

      if (window.matchMedia("(pointer: fine)").matches) {
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      }
    });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("is-lit");
      card.style.transform = "";
    });
  });
}

function makeClickableBitsInteractive() {
  const clickableBits = document.querySelectorAll(".copy-button, .discord-button, .lookup-form button, .icon-button, .chip-grid span, .command-list code");

  clickableBits.forEach((element) => {
    element.addEventListener("click", (event) => {
      burstSpark(element, event);
    });
  });

  document.querySelectorAll(".command-list code").forEach((command) => {
    command.title = "Click to copy";
    command.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(command.textContent.trim());
        command.classList.add("is-active");
        showToast(`Copied ${command.textContent.trim()}`);
        setTimeout(() => command.classList.remove("is-active"), 900);
      } catch (error) {
        window.prompt("Copy this command", command.textContent.trim());
      }
    });
  });

  document.querySelectorAll(".chip-grid span").forEach((chip) => {
    chip.title = "Click to highlight";
    chip.addEventListener("click", () => {
      chip.classList.toggle("is-active");
      showToast(chip.classList.contains("is-active") ? `${chip.textContent} selected` : `${chip.textContent} unselected`);
    });
  });
}

function moveCursorFollower(event) {
  cursorX = event.clientX;
  cursorY = event.clientY;
  selectors.cursorOrb.classList.add("is-active");
}

function animateCursorFollower() {
  orbX += (cursorX - orbX) * 0.18;
  orbY += (cursorY - orbY) * 0.18;
  selectors.cursorOrb.style.transform = `translate3d(${orbX}px, ${orbY}px, 0)`;
  requestAnimationFrame(animateCursorFollower);
}

function startCursorFollower() {
  if (!selectors.cursorOrb || !window.matchMedia("(pointer: fine)").matches) return;
  window.addEventListener("pointermove", moveCursorFollower);
  animateCursorFollower();
}

function normalizePlayers(payload) {
  const players = valueFrom(payload, ["players", "onlinePlayers", "list", "names"], []);
  return Array.isArray(players) ? players : [];
}

function renderPlayers(players) {
  renderPlayerChips(selectors.playerList, players, "No player list available in the latest snapshot.");
}

function renderOfflinePlayers(players) {
  renderPlayerChips(selectors.offlinePlayerList, players, "No offline player stats saved yet.");
}

function renderPlayerChips(container, players, emptyMessage) {
  container.innerHTML = "";

  if (!players.length) {
    container.className = "player-list empty";
    container.textContent = emptyMessage;
    return;
  }

  container.className = "player-list";
  for (const player of players) {
    const chip = document.createElement("span");
    const playerName = typeof player === "string" ? player : valueFrom(player, ["name", "username", "player"], "Unknown");
    chip.textContent = playerName;
    chip.title = "Click to lookup stats";
    chip.tabIndex = 0;
    chip.setAttribute("role", "button");
    chip.addEventListener("click", () => lookupPlayerFromChip(playerName));
    chip.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        lookupPlayerFromChip(playerName);
      }
    });
    container.append(chip);
  }
}

function getSnapshotAge(snapshot) {
  const generatedAt = snapshot && snapshot.generatedAt;
  if (!generatedAt) return "Snapshot has not updated yet.";

  const date = new Date(generatedAt);
  if (Number.isNaN(date.getTime())) return `Last updated: ${generatedAt}`;

  return `Last updated ${date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}.`;
}

function buildStatsIndex(snapshot) {
  const stats = snapshot.statsByName || {};
  const index = {};
  const onlinePlayers = normalizePlayers(snapshot.online || {});

  for (const [name, value] of Object.entries(stats)) {
    index[normalizeName(name)] = { ...value };
  }

  for (const player of onlinePlayers) {
    const name = typeof player === "string" ? player : valueFrom(player, ["name", "username", "player"], "");
    if (!name) continue;
    const key = normalizeName(name);
    index[key] = {
      ...(index[key] || {}),
      ...(typeof player === "object" ? player : {}),
      name,
      online: true,
    };
  }

  for (const value of Object.values(index)) {
    if (value.online !== true) {
      value.online = false;
    }
  }

  return index;
}

function getOfflinePlayers(snapshot, onlinePlayers) {
  const onlineNames = new Set(onlinePlayers.map((player) => {
    const name = typeof player === "string" ? player : valueFrom(player, ["name", "username", "player"], "");
    return normalizeName(name);
  }));

  return Object.keys(snapshot.statsByName || {})
    .filter((name) => !onlineNames.has(normalizeName(name)))
    .sort((a, b) => a.localeCompare(b));
}

async function loadServerInfo() {
  selectors.apiState.textContent = "Loading";

  try {
    const snapshot = await fetchSnapshot();
    state.snapshot = snapshot;
    state.players = normalizePlayers(snapshot.online || {});
    state.statsByName = buildStatsIndex(snapshot);

    const online = Boolean(valueFrom(snapshot.health, ["online", "isOnline", "ok", "healthy"], false));
    const playerCount = valueFrom(snapshot.online, ["count", "online", "onlineCount"], state.players.length);
    const maxPlayers = valueFrom(snapshot.server, ["maxPlayers", "max", "slots"], "");

    setStatus(
      online ? "online" : "offline",
      online ? "Server online" : "Server offline",
      getSnapshotAge(snapshot)
    );

    selectors.playerCount.textContent = maxPlayers ? `${playerCount}/${maxPlayers}` : String(playerCount);
    selectors.apiState.textContent = snapshot.ok ? "Snapshot" : "Stale";
    renderPlayers(state.players);
    renderOfflinePlayers(getOfflinePlayers(snapshot, state.players));
  } catch (error) {
    setStatus("unknown", "Status unavailable", "No static server snapshot is available yet.");
    selectors.playerCount.textContent = "--";
    selectors.apiState.textContent = "No data";
    renderPlayers([]);
    renderOfflinePlayers([]);
  }
}

function setStatsOnline(value) {
  selectors.statsOnline.className = "pill neutral";
  selectors.statsOnline.textContent = "Unavailable";

  if (value === true) {
    selectors.statsOnline.className = "pill online";
    selectors.statsOnline.textContent = "Online";
  }

  if (value === false) {
    selectors.statsOnline.className = "pill offline";
    selectors.statsOnline.textContent = "Offline";
  }
}

function clearStats(playerName = "Waiting for lookup") {
  selectors.statsPlayer.textContent = playerName;
  setStatsOnline(null);
  for (const field of Object.values(statFields)) {
    field.textContent = "--";
  }
}

function renderStats(stats) {
  selectors.statsPlayer.textContent = valueFrom(stats, ["name", "player", "username"], "Unknown player");
  setStatsOnline(valueFrom(stats, ["online", "isOnline"], null));
  selectors.statsMessage.textContent = "Stats from the latest static HallPass snapshot.";

  statFields.world.textContent = valueFrom(stats, ["world", "currentWorld"]);
  statFields.rank.textContent = valueFrom(stats, ["rank", "group"]);
  statFields.balance.textContent = valueFrom(stats, ["balance", "money"]);
  statFields.playtime.textContent = formatDuration(valueFrom(stats, ["playtime", "playTime", "totalPlaytime"], 0));
  statFields.joins.textContent = formatNumber(valueFrom(stats, ["joins", "joinCount"]));
  statFields.deaths.textContent = formatNumber(valueFrom(stats, ["deaths"]));
  statFields.playerKills.textContent = formatNumber(valueFrom(stats, ["playerKills", "kills"]));
  statFields.mobKills.textContent = formatNumber(valueFrom(stats, ["mobKills"]));
  statFields.blocksBroken.textContent = formatNumber(valueFrom(stats, ["blocksBroken", "broken"]));
  statFields.blocksPlaced.textContent = formatNumber(valueFrom(stats, ["blocksPlaced", "placed"]));
  statFields.distanceWalked.textContent = formatDistance(valueFrom(stats, ["distanceWalked", "walked"], 0));
  statFields.jumps.textContent = formatNumber(valueFrom(stats, ["jumps"]));
  statFields.firstJoined.textContent = formatDate(valueFrom(stats, ["firstJoined", "firstJoin"]));
  statFields.lastSeen.textContent = formatDate(valueFrom(stats, ["lastSeen", "lastOnline"]));
}

function lookupStats(playerName) {
  clearStats(playerName);

  const stats = state.statsByName[normalizeName(playerName)];
  if (!stats) {
    selectors.statsMessage.textContent = "That player is not in the latest static snapshot yet. The updater usually captures online players and any configured names.";
    return;
  }

  renderStats(stats);
}

function lookupPlayerFromChip(playerName) {
  selectors.playerName.value = playerName;
  lookupStats(playerName);
  document.querySelector("#stats").scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      const original = button.querySelector("span").textContent;
      button.querySelector("span").textContent = "Copied";
      showToast(`Copied ${value}`);
      setTimeout(() => {
        button.querySelector("span").textContent = original;
      }, 1400);
    } catch (error) {
      window.prompt("Copy the server IP", value);
    }
  });
});

selectors.refreshStatus.addEventListener("click", loadServerInfo);

selectors.statsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const playerName = selectors.playerName.value.trim();
  if (playerName) {
    lookupStats(playerName);
  }
});

makeGlowCardsInteractive();
makeClickableBitsInteractive();
startCursorFollower();
loadServerInfo();
