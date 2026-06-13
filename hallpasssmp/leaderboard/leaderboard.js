const DATA_URL = "../data/status.json";

const metrics = [
  { key: "totalPlaytime", label: "Playtime", format: formatDuration },
  { key: "balance", label: "Balance", format: formatNumber },
  { key: "deaths", label: "Deaths", format: formatNumber },
  { key: "playerKills", label: "Player Kills", format: formatNumber },
  { key: "mobKills", label: "Mob Kills", format: formatNumber },
  { key: "blocksBroken", label: "Blocks Broken", format: formatNumber },
  { key: "blocksPlaced", label: "Blocks Placed", format: formatNumber },
  { key: "distanceWalked", label: "Distance", format: formatDistance },
  { key: "jumps", label: "Jumps", format: formatNumber },
];

const updated = document.querySelector("#leaderboard-updated");
const tabs = document.querySelector("#leaderboard-tabs");
const topCards = document.querySelector("#top-cards");
const tableBody = document.querySelector("#leaderboard-table");
const cursorOrb = document.querySelector("#cursor-orb");

let rows = [];
let activeMetric = metrics[0];
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let orbX = cursorX;
let orbY = cursorY;

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
  return Number.isFinite(number) ? number.toLocaleString() : value || "0";
}

function formatDuration(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return "0m";

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
  if (!Number.isFinite(number)) return value || "0";
  if (number >= 1000) return `${(number / 1000).toFixed(1)}k`;
  return Math.round(number).toLocaleString();
}

function getMetricValue(player, key) {
  if (key === "totalPlaytime") {
    return Number(valueFrom(player, ["totalPlaytime", "playtime", "playTime"], 0)) || 0;
  }
  return Number(player[key]) || 0;
}

function normalizePlayer(name, stats) {
  return {
    name: valueFrom(stats, ["name", "player", "username"], name),
    rank: valueFrom(stats, ["rank", "group"], "default"),
    balance: getMetricValue(stats, "balance"),
    totalPlaytime: getMetricValue(stats, "totalPlaytime"),
    deaths: getMetricValue(stats, "deaths"),
    playerKills: getMetricValue(stats, "playerKills"),
    mobKills: getMetricValue(stats, "mobKills"),
    blocksBroken: getMetricValue(stats, "blocksBroken"),
    blocksPlaced: getMetricValue(stats, "blocksPlaced"),
    distanceWalked: getMetricValue(stats, "distanceWalked"),
    jumps: getMetricValue(stats, "jumps"),
  };
}

function sortedRows(metric = activeMetric) {
  return [...rows].sort((a, b) => getMetricValue(b, metric.key) - getMetricValue(a, metric.key) || a.name.localeCompare(b.name));
}

function renderTabs() {
  tabs.innerHTML = "";
  metrics.forEach((metric) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = metric.label;
    button.className = metric.key === activeMetric.key ? "is-active" : "";
    button.addEventListener("click", () => {
      activeMetric = metric;
      renderTabs();
      renderTopCards();
      renderTable();
    });
    tabs.append(button);
  });
}

function renderTopCards() {
  const leaders = sortedRows().slice(0, 3);
  topCards.innerHTML = "";

  if (!leaders.length) {
    topCards.textContent = "No leaderboard data available yet.";
    return;
  }

  leaders.forEach((player, index) => {
    const card = document.createElement("article");
    card.className = "leader-card";
    card.innerHTML = `
      <span>#${index + 1} ${activeMetric.label}</span>
      <strong>${player.name}</strong>
      <b>${activeMetric.format(getMetricValue(player, activeMetric.key))}</b>
      <p><span class="rank-pill">${player.rank}</span></p>
    `;
    topCards.append(card);
  });
}

function renderTable() {
  const sorted = sortedRows();
  tableBody.innerHTML = "";

  if (!sorted.length) {
    tableBody.innerHTML = '<tr><td colspan="11">No leaderboard data available yet.</td></tr>';
    return;
  }

  sorted.forEach((player) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${player.name}</td>
      <td><span class="rank-pill">${player.rank}</span></td>
      <td>${formatNumber(player.balance)}</td>
      <td>${formatDuration(player.totalPlaytime)}</td>
      <td>${formatNumber(player.deaths)}</td>
      <td>${formatNumber(player.playerKills)}</td>
      <td>${formatNumber(player.mobKills)}</td>
      <td>${formatNumber(player.blocksBroken)}</td>
      <td>${formatNumber(player.blocksPlaced)}</td>
      <td>${formatDistance(player.distanceWalked)}</td>
      <td>${formatNumber(player.jumps)}</td>
    `;
    tableBody.append(tr);
  });
}

function updateTimestamp(snapshot) {
  const generatedAt = snapshot.generatedAt ? new Date(snapshot.generatedAt) : null;
  if (!generatedAt || Number.isNaN(generatedAt.getTime())) {
    updated.textContent = "Waiting for the first leaderboard snapshot.";
    return;
  }
  updated.textContent = `Last updated ${generatedAt.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}`;
}

async function loadLeaderboard() {
  try {
    const response = await fetch(`${DATA_URL}?v=${Date.now()}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Snapshot ${response.status}`);
    const snapshot = await response.json();
    rows = Object.entries(snapshot.statsByName || {}).map(([name, stats]) => normalizePlayer(name, stats));
    updateTimestamp(snapshot);
    renderTabs();
    renderTopCards();
    renderTable();
  } catch (error) {
    updated.textContent = "Leaderboard snapshot is unavailable right now.";
    topCards.textContent = "No leaderboard data available yet.";
    tableBody.innerHTML = '<tr><td colspan="11">No leaderboard data available yet.</td></tr>';
  }
}

function moveCursorFollower(event) {
  cursorX = event.clientX;
  cursorY = event.clientY;
  cursorOrb.classList.add("is-active");
}

function animateCursorFollower() {
  orbX += (cursorX - orbX) * 0.18;
  orbY += (cursorY - orbY) * 0.18;
  cursorOrb.style.transform = `translate3d(${orbX}px, ${orbY}px, 0)`;
  requestAnimationFrame(animateCursorFollower);
}

if (cursorOrb && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", moveCursorFollower);
  animateCursorFollower();
}

loadLeaderboard();
