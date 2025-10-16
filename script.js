// Manually defined GitHub projects
const projects = [
  {
    name: "itz-me-fisherYT.github.io",
    description: "Personal portfolio website hosted on GitHub Pages.",
    url: "https://github.com/itz-me-fisherYT/itz-me-fisherYT.github.io",
    stars: 1,
    forks: 0,
    language: "HTML/CSS/JS",
    explanation: "A modern, dark-themed portfolio inspired by asktheman.xyz, featuring multi-page layout and dark theme."
  },
  {
    name: "TicketForge",
    description: "Modern Discord ticket bot built with discord.js v14.",
    url: "https://github.com/itz-me-fisherYT/TicketForge",
    stars: 0,
    forks: 0,
    language: "JavaScript",
    explanation: "Provides topic-based ticket creation, per-topic categories, local transcript logging, and staff channel logs."
  },
  {
    name: "Goose-Discord-Bot",
    description: "Discord bot with various features to enhance the server experience.",
    url: "https://github.com/itz-me-fisherYT/Goose-Discord-Bot",
    stars: 0,
    forks: 0,
    language: "Python",
    explanation: "Features include Quote System, Moderation, YouTube Notifications to enhance the Discord experience."
  }
];

// Populate the projects grid
const reposGrid = document.getElementById('reposGrid');

projects.forEach(project => {
  const card = document.createElement('div');
  card.className = 'card project-card';
  card.innerHTML = `
    <h3>${project.name}</h3>
    <p>${project.description}</p>
    <div class="badges">
      <span class="badge">⭐ ${project.stars}</span>
      <span class="badge">🍴 ${project.forks}</span>
      <span class="badge">${project.language}</span>
    </div>
    <a href="${project.url}" target="_blank" class="repo-link">View Repo</a>
    <p class="explanation"><em>${project.explanation}</em></p>
  `;
  reposGrid.appendChild(card);
});
