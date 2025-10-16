// Shared JS: Rotating taglines, GitHub fetch, contact form
const ROTATING=[
'Developer & Creator',
'Crafting code, one block at a time.',
'Building bots, plugins & websites.',
'Powered by coffee and redstone.',
'Always mining new ideas.'
];
const rotRoot=document.getElementById('tagRotator');
if(rotRoot){ROTATING.forEach((t,i)=>{const sp=document.createElement('span');sp.textContent=t;if(i===0)sp.classList.add('show');rotRoot.appendChild(sp);});
let rotIndex=0;setInterval(()=>{const spans=rotRoot.querySelectorAll('span');spans[rotIndex].classList.remove('show');rotIndex=(rotIndex+1)%spans.length;spans[rotIndex].classList.add('show');},3000);}


// Contact form submission
async function submitContact(e){
e.preventDefault();
const name=document.getElementById('contactName').value;
const email=document.getElementById('contactEmail').value;
const message=document.getElementById('contactMessage').value;


if(!name||!email||!message){alert('Please fill all fields');return;}


// EmailJS placeholder
// emailjs.send('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID',{from_name:name,reply_to:email,message:message},'YOUR_PUBLIC_KEY');


// Discord Webhook placeholder
// fetch('YOUR_DISCORD_WEBHOOK_URL',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({content:`New message from ${name} (${email}): ${message}`})});


alert('Message sent!');
document.getElementById('contactForm').reset();
}
document.getElementById('contactForm')?.addEventListener('submit',submitContact);