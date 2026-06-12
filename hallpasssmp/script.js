const HALLPASS_API_BASE = "PUT_PUBLIC_API_URL_HERE";
const HALLPASS_API_KEY = "PUT_API_KEY_HERE";

const fallbackMessage = "Live data appears when the public NovaBridge API is configured.";
const placeholderApiBase = "PUT_PUBLIC_API_URL_HERE";

const state = {
  health: null,
  server: null,
  players: [],
};

const selectors = {
  statusDot: document.querySelector("#status-dot"),
  statusText: document.querySelector("#server-status-text"),
  statusDetail: document.querySelector("#server-status-detail"),
  playerCount: document.querySelector("#player-count"),
  apiState: document.querySelector("#api-state"),
  playerList: document.querySelector("#player-list"),
  refreshStatus: document.querySelector("#refresh-status"),
  statsForm: document.querySelector("#stats-form"),
  playerName: document.querySelector("#player-name"),
  statsPlayer: document.querySelector("#stats-player"),
  statsOnline: document.querySelector("#stats-online"),
  statsMessage: document.querySelector("#stats-message"),
};

let toastTimer;

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

function hasApiBase() {
  return HALLPASS_API_BASE.trim().length > 0 && HALLPASS_API_BASE !== placeholderApiBase;
}

function apiUrl(path) {
  return `${HALLPASS_API_BASE.replace(/\/+$/, "")}${path}`;
}

async function fetchJson(path) {
  if (!hasApiBase()) {
    throw new Error("HallPass API base is not configured.");
  }

  const headers = { Accept: "application/json" };
  if (HALLPASS_API_KEY.trim().length > 0) {
    headers.Authorization = `Bearer ${HALLPASS_API_KEY}`;
  }

  const response = await fetch(apiUrl(path), {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API returned ${response.status}`);
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
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
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
      const rotateX = ((0.5 - (y / rect.height)) * 3.5);

      card.classList.add("is-lit");
      card.style.setProperty("--spot-x", `${x}px`);
      card.style.setProperty("--spot-y", `${y}px`);

      if (window.matchMedia("(pointer: fine)").matches) {
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      }
    });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("is-lit");
      card.style.transform = "";
    });
  });

  document.addEventListener("pointermove", (event) => {
    document.body.style.setProperty("--cursor-x", `${event.clientX}px`);
    document.body.style.setProperty("--cursor-y", `${event.clientY}px`);
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

function renderPlayers(players) {
  selectors.playerList.innerHTML = "";

  if (!players.length) {
    selectors.playerList.className = "player-list empty";
    selectors.playerList.textContent = "No player list available yet.";
    return;
  }

  selectors.playerList.className = "player-list";
  for (const player of players) {
    const chip = document.createElement("span");
    chip.textContent = typeof player === "string" ? player : valueFrom(player, ["name", "username", "player"], "Unknown");
    selectors.playerList.append(chip);
  }
}

function normalizePlayers(payload) {
  const players = valueFrom(payload, ["players", "onlinePlayers", "list", "names"], []);
  return Array.isArray(players) ? players : [];
}

async function loadServerInfo() {
  selectors.apiState.textContent = hasApiBase() ? "Loading" : "Not set";

  if (!hasApiBase()) {
    setStatus("unknown", "Status unavailable", fallbackMessage);
    selectors.playerCount.textContent = "--";
    renderPlayers([]);
    selectors.apiState.textContent = "Not set";
    return;
  }

  try {
    const [health, server, onlinePayload] = await Promise.all([
      fetchJson("/api/health"),
      fetchJson("/api/server"),
      fetchJson("/api/online"),
    ]);

    state.health = health;
    state.server = server;
    state.players = normalizePlayers(onlinePayload);

    const online = Boolean(valueFrom(health, ["online", "isOnline", "ok", "healthy"], false));
    const playerCount = valueFrom(onlinePayload, ["count", "online", "onlineCount"], state.players.length);
    const maxPlayers = valueFrom(server, ["maxPlayers", "max", "slots"], "");

    setStatus(
      online ? "online" : "offline",
      online ? "Server online" : "Server offline",
      online ? "HallPass SMP is reachable from the public API." : "The public API reports the server is offline."
    );

    selectors.playerCount.textContent = maxPlayers ? `${playerCount}/${maxPlayers}` : String(playerCount);
    selectors.apiState.textContent = "Connected";
    renderPlayers(state.players);
  } catch (error) {
    setStatus("unknown", "Status unavailable", "The public API is offline or not reachable right now.");
    selectors.playerCount.textContent = "--";
    selectors.apiState.textContent = "Offline";
    renderPlayers([]);
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
  selectors.statsMessage.textContent = "Latest player stats from the HallPass SMP public API.";

  statFields.world.textContent = valueFrom(stats, ["world", "currentWorld"]);
  statFields.rank.textContent = valueFrom(stats, ["rank", "group"]);
  statFields.balance.textContent = valueFrom(stats, ["balance", "money"]);
  statFields.playtime.textContent = valueFrom(stats, ["playtime", "playTime"]);
  statFields.joins.textContent = formatNumber(valueFrom(stats, ["joins", "joinCount"]));
  statFields.deaths.textContent = formatNumber(valueFrom(stats, ["deaths"]));
  statFields.playerKills.textContent = formatNumber(valueFrom(stats, ["playerKills", "kills"]));
  statFields.mobKills.textContent = formatNumber(valueFrom(stats, ["mobKills"]));
  statFields.blocksBroken.textContent = formatNumber(valueFrom(stats, ["blocksBroken", "broken"]));
  statFields.blocksPlaced.textContent = formatNumber(valueFrom(stats, ["blocksPlaced", "placed"]));
  statFields.distanceWalked.textContent = valueFrom(stats, ["distanceWalked", "walked"]);
  statFields.jumps.textContent = formatNumber(valueFrom(stats, ["jumps"]));
  statFields.firstJoined.textContent = formatDate(valueFrom(stats, ["firstJoined", "firstJoin"]));
  statFields.lastSeen.textContent = formatDate(valueFrom(stats, ["lastSeen", "lastOnline"]));
}

function mergePayloads(payloads) {
  return payloads.reduce((merged, payload) => {
    if (payload && typeof payload === "object" && !Array.isArray(payload)) {
      return { ...merged, ...payload };
    }
    return merged;
  }, {});
}

async function lookupStats(playerName) {
  clearStats(playerName);

  if (!hasApiBase()) {
    selectors.statsMessage.innerHTML = 'Stats lookup is ready, but <code>HALLPASS_API_BASE</code> still has the placeholder value.';
    return;
  }

  selectors.statsMessage.textContent = "Looking up player stats...";

  try {
    const encodedPlayer = encodeURIComponent(playerName);
    const responses = await Promise.allSettled([
      fetchJson(`/api/stats/${encodedPlayer}`),
      fetchJson(`/api/player/${encodedPlayer}`),
      fetchJson(`/api/seen/${encodedPlayer}`),
      fetchJson(`/api/playtime/${encodedPlayer}`),
      fetchJson(`/api/balance/${encodedPlayer}`),
      fetchJson(`/api/rank/${encodedPlayer}`),
    ]);
    const payloads = responses
      .filter((response) => response.status === "fulfilled")
      .map((response) => response.value);
    const stats = mergePayloads(payloads);

    if (!payloads.length) {
      throw new Error("No player stat endpoints returned data.");
    }

    stats.name = valueFrom(stats, ["name", "player", "username"], playerName);
    renderStats(stats);
  } catch (error) {
    selectors.statsMessage.textContent = "Player stats are unavailable right now. Try again when the public API is online.";
  }
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
loadServerInfo();
