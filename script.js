// Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 1200);
});

// Cat cursor
const cat = document.getElementById("cat");
document.addEventListener("mousemove", (e) => {
  cat.style.left = e.clientX + "px";
  cat.style.top = e.clientY + "px";
});

// Particles
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.2
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff88";

  particles.forEach(p => {
    p.y += p.speed;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// Discord profile loader
async function loadDiscordProfile() {
  try {
    const res = await fetch("https://discord-profile-api-ru01.onrender.com/profile.json");
    const data = await res.json();

    const statusColors = { online:"lime", idle:"orange", dnd:"red", offline:"gray" };

    document.getElementById("discord-card").innerHTML = `
      <img src="${data.avatar}" style="width:120px;border-radius:50%;border:3px solid #00ff88;">
      <h3>${data.username}</h3>
      <p>Status: ${data.status}<br>Activity: ${data.activity || "None"}</p>
    `;
  } catch {
    document.getElementById("discord-card").innerHTML = "Failed to load Discord 😭";
  }
}

loadDiscordProfile();
