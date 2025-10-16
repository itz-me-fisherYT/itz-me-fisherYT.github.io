// Rotating Taglines
const ROTATING = [
  'Developer & Creator',
  'Crafting code, one block at a time.',
  'Building bots, plugins & websites.',
  'Powered by coffee and redstone.',
  'Always mining new ideas.'
];
const rotRoot = document.getElementById('tagRotator');
if(rotRoot) {
  ROTATING.forEach((t,i)=>{
    const sp = document.createElement('span');
    sp.textContent = t;
    if(i===0) sp.classList.add('show');
    rotRoot.appendChild(sp);
  });
  let rotIndex = 0;
  setInterval(()=>{
    const spans = rotRoot.querySelectorAll('span');
    spans[rotIndex].classList.remove('show');
    rotIndex = (rotIndex + 1) % spans.length;
    spans[rotIndex].classList.add('show');
  }, 3000);
}

// Fetch GitHub Repos
const reposGrid = document.getElementById('reposGrid');

if(reposGrid) {
  fetch('https://api.github.com/users/itz-me-fisherYT/repos?sort=updated')
    .then(res => res.json())
    .then(data => {
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
      reposGrid.innerHTML = '<p>Failed to load projects.</p>';
      console.error(err);
    });
}

// Contact Form Submission
async function submitContact(e){
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const message = document.getElementById('contactMessage').value;
  if(!name||!email||!message){alert('Please fill all fields'); return;}

  // EmailJS
  emailjs.send('service_hqm13gm','template_mon4thq',{from_name:name,reply_to:email,message:message},'suszRhx0XhOv1OGNT')
    .then(()=>console.log('EmailJS: Message sent!'))
    .catch(err=>console.error('EmailJS error:', err));

  // Discord webhook
  fetch('https://discord.com/api/webhooks/1428335032187097158/69dYFJ-QVLI7vNkDmOe6vqnff_VAtyg5abJfTx5LphXtQR3-D_9k_53HlXGFJCrBVs9M',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({content:`New message from ${name} (${email}): ${message}`})
  }).then(()=>console.log('Discord webhook: Message sent!'))
  .catch(err=>console.error('Discord webhook error:', err));

  alert('Message sent!');
  document.getElementById('contactForm').reset();
}

document.getElementById('contactForm')?.addEventListener('submit',submitContact);
