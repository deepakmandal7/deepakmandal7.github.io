// Toggle sidebar
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

// Typewriter effect
const text = "I'm a Web Developer";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
document.addEventListener("DOMContentLoaded", typeWriter);

// Parallax effect
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  hero.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute("href"));
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      document.getElementById("sidebar").classList.remove("active"); // Hide sidebar on mobile
    }
  });
});
