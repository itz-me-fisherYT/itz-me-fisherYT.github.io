const cat = document.getElementById("cat");

document.addEventListener("mousemove", (e) => {
  cat.style.left = e.clientX + "px";
  cat.style.top = e.clientY + "px";
});
