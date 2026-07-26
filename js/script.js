/* SNOW */
const container = document.querySelector(".snow-container");
const SNOW_COUNT = 200;

// Create snowflakes
for (let i = 0; i < SNOW_COUNT; i++) {
  createSnow();
}

function createSnow() {
  const snow = document.createElement("span");
  snow.className = "snow";
  // Random Size
  const size = Math.random() * 6 + 2;
  snow.style.width = `${size}px`;
  snow.style.height = `${size}px`;
  // Random X Position
  snow.style.left = `${Math.random() * 100}%`;
  // Already visible on screen
  snow.style.top = `${Math.random() * 100}vh`;
  // Random opacity
  snow.style.opacity = Math.random() * 0.7 + 0.3;
  // Different speeds
  const duration = 8 + Math.random() * 12;
  snow.style.animationDuration = `${duration}s`;
  // Animation already in progress
  snow.style.animationDelay = `-${Math.random() * duration}s`;
  container.appendChild(snow);
}

/* Show the invitation */
const btn = document.querySelector(".invite-btn");
const hero = document.querySelector(".hero");
const videoContainer = document.getElementById("video-container");
const video = document.getElementById("intro-video");
const bodyBg = document.querySelector(".landing-page");
const invitation = document.getElementById("invitation");
const music = document.getElementById("bgMusic");

btn.addEventListener("click", () => {
  music.play();
  // Hide hero
  hero.classList.add("hide");
  // Show video
  videoContainer.classList.add("show");
  video.muted = true;
  // Play video
  video.play();
});

video.addEventListener("ended", () => {
  videoContainer.classList.remove("show");
  bodyBg.style.display = "none";
  invitation.classList.remove("hidden");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      invitation.style.opacity = "1";
    });
  });
});

const weddingDate = new Date("2026-08-17T10:30:00").getTime();

function updateCard(id, value) {
  const element = document.getElementById(id);
  value = String(value).padStart(2, "0");
  if (element.textContent === value) return;
  element.classList.remove("flip");
  void element.offsetWidth;
  element.classList.add("flip");
  setTimeout(() => {
    element.textContent = value;
  }, 250);
}

function updateCountdown() {
  const now = new Date().getTime();
  const diff = weddingDate - now;
  if (diff <= 0) return;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  updateCard("days", d);
  updateCard("hours", h);
  updateCard("minutes", m);
  updateCard("seconds", s);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* PAUSE MUSIC WHEN APP LOSES FOCUS */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    music.pause();
  } else if (!music.paused || music.currentTime > 0) {
    music.play();
  }
});

/* SCROLL HINT */
const scrollHint = document.getElementById("scrollHint");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    scrollHint.classList.add("hide");
  }
}, { passive: true });

/* FALLING PETALS */
const petalContainer = document.querySelector(".petal-container");
const PETAL_COUNT = 30;
const petalChars = ["❀", "✿", "✾", "❁"];
const petalColors = ["#f9a8c9", "#ec3ea7", "#d4679a", "#f7c6dd", "#e06dac", "#fbc8dd"];

function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = petalChars[Math.floor(Math.random() * petalChars.length)];

  const size = Math.random() * 16 + 12;
  petal.style.fontSize = `${size}px`;
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.color = petalColors[Math.floor(Math.random() * petalColors.length)];

  const duration = 10 + Math.random() * 12;
  petal.style.animationDuration = `${duration}s`;
  petal.style.animationDelay = `-${Math.random() * duration}s`;

  const sx1 = (Math.random() - 0.5) * 140;
  const sx2 = (Math.random() - 0.5) * 140;
  petal.style.setProperty("--sx1", `${sx1}px`);
  petal.style.setProperty("--sx2", `${sx2}px`);

  petalContainer.appendChild(petal);
}

for (let i = 0; i < PETAL_COUNT; i++) {
  createPetal();
}
