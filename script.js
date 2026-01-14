// Dark mode toggle
const toggle = document.getElementById("themeToggle");

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// Typewriter effect
const text = document.querySelector(".typewriter");

if (text) {
  const content = text.textContent;
  text.textContent = "";
  let i = 0;

  function type() {
    if (i < content.length) {
      text.textContent += content.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }

  type();
}

// Fake contact submit
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent! (not really 😄)");
  });
}
