/* =========================
   DISCORD
========================= */

async function loadDiscord() {
  try {
    const res = await fetch(
      "https://discord-profile-api-ru01.onrender.com/profile.json",
      { cache: "no-store" }
    );

    const data = await res.json();

    document.getElementById("discordAvatar").src = data.avatar;
    document.getElementById("discordName").textContent =
      data.displayName || data.username;

    document.getElementById("discordUsername").textContent =
      "@" + data.username;

    const dot = document.querySelector(".discord-status .dot");
    dot.className = "dot " + (data.status || "offline");

    document.getElementById("discordStatusText").textContent =
      data.status.toUpperCase();

    document.getElementById("discordActivity").textContent =
      data.activity ? "🎧 " + data.activity : "No activity";

  } catch {
    document.getElementById("discordStatusText").textContent = "OFFLINE";
  }
}

/* =========================
   ROBLOX
========================= */

async function loadRoblox() {
  try {
    const res = await fetch("https://roblox-api-vchl.onrender.com/roblox.json");
    const data = await res.json();
    const grid = document.getElementById("robloxAccounts");
    grid.innerHTML = "";

    data.accounts.forEach((acc, index) => {
      const card = document.createElement("a");
      card.className = "roblox-card";
      card.style.setProperty("--i", index);
      card.href = acc.profileUrl;
      card.target = "_blank";

      card.innerHTML = `
        <img src="${acc.avatar}">
        <h3>${acc.displayName || acc.username}</h3>
        <div class="roblox-username" data-tooltip="Roblox username">@${acc.username}</div>
        <div class="roblox-stats" data-tooltip="Friends & followers">
          <span>👥 ${acc.friends}</span>
          <span>⭐ ${acc.followers}</span>
        </div>
      `;

      grid.appendChild(card);
    });
  } catch {
    document.getElementById("robloxAccounts").textContent =
      "Failed to load Roblox accounts.";
  }
}

/* =========================
   LINKS
========================= */

async function loadLinks() {
  try {
    const res = await fetch("links.json");
    const links = await res.json();
    const grid = document.getElementById("linksGrid");
    grid.innerHTML = "";

    links.forEach((link, index) => {
      const card = document.createElement("div");
      card.className = "link-card";
      card.style.setProperty("--i", index);

      card.innerHTML = `
        <a href="${link.url}" target="_blank" data-tooltip="${link.text}">
          <img src="https://cdn.simpleicons.org/${link.icon}/white">
          <span>${link.title}</span>
        </a>
      `;

      grid.appendChild(card);
    });
  } catch {
    document.getElementById("linksGrid").textContent =
      "Failed to load links.";
  }
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  loadDiscord();
  loadRoblox();
  loadLinks();

  setInterval(loadDiscord, 30000);
});
