// Dark/Light Mode Toggle
const toggleButton = document.getElementById('mode-toggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Fun Facts
const funFacts = [
    "Minecraft was created by Markus Persson, also known as 'Notch'.",
    "The first version of Minecraft was released in 2009.",
    "JavaScript was created by Brendan Eich in just 10 days in 1995.",
    "Python was named after the comedy series 'Monty Python's Flying Circus'."
];

const funFactElement = document.getElementById('fun-fact');
if(funFactElement) {
    funFactElement.textContent = funFacts[Math.floor(Math.random() * funFacts.length)];
}
