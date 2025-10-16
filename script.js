const reposGrid = document.getElementById('reposGrid');

if (reposGrid) {
  fetch('https://api.github.com/users/itz-me-fisherYT/repos?sort=updated&per_page=20')
    .then(res => {
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (data.length === 0) {
        reposGrid.innerHTML = '<p>No projects found.</p>';
        return;
      }

      reposGrid.innerHTML = '';
      data.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'card project-card';
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || 'No description'}</p>
          <div class="badges">
            <span class="badge">⭐ ${repo.stargazers_count}</span>
            <span class="badge">🍴 ${repo.forks_count}</span>
            <span class="badge">${repo.language || 'Unknown'}</span>
          </div>
          <a href="${repo.html_url}" target="_blank" class="repo-link">View Repo</a>
        `;
        reposGrid.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      reposGrid.innerHTML = '<p>Failed to load projects. Check console for errors.</p>';
    });
}
