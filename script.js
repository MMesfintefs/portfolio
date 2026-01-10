// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");

toggle?.addEventListener("click", () => {
  const isOpen = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after click (mobile)
document.querySelectorAll(".nav__links a").forEach(a => {
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

// Copy email helper
const copyBtn = document.getElementById("copyEmailBtn");
const status = document.getElementById("copyStatus");
const email = "your.email@example.com"; // change this

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    status.textContent = "Copied email to clipboard.";
  } catch {
    status.textContent = "Couldn’t copy. Just email me the old-fashioned way.";
  }
});
