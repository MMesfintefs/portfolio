// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");
toggle?.addEventListener("click", () => {
  const isOpen = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".nav__links a").forEach(a => {
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

/**
 * Local Knowledge Base (edit this to match your truth)
 * Keep it factual. This is your “Wikipedia infobox”.
 */
const KB = {
  identity: {
    name: "Michael Mesfin Tefera",
    tagline: "Business Analytics graduate student focused on practical analytics, controls-minded execution, and clear storytelling.",
    origin: "Add your origin story here (1–2 sentences)."
  },
  education: [
    {
      school: "Add School (e.g., Bentley University)",
      degree: "MS, Business Analytics",
      dates: "Add dates",
      highlights: ["Add 2–3 highlights: coursework, focus areas, projects"]
    },
    {
      school: "Add School (e.g., SUNY Plattsburgh)",
      degree: "Bachelor’s (add majors/minors)",
      dates: "Add dates",
      highlights: ["Dean’s List (if true)", "Honor societies (if true)", "Key focus areas"]
    }
  ],
  experience: [
    {
      org: "Add Company/Org",
      role: "Add Role Title",
      dates: "Add dates",
      bullets: ["Add impact bullet", "Add tools used", "Add outcome"]
    }
  ],
  honors: [
    "Dean’s List (add semesters/years)",
    "Honor societies (add names)",
    "Scholarships/Awards (add)"
  ],
  leadership: [
    "Add leadership role (org + what you did)",
    "Add campus/community role"
  ],
  passions: [
    "Risk & controls",
    "Business analytics",
    "Finance + markets",
    "Operations & supply chain",
    "Building systems & products"
  ],
  projects: {
    status: "Coming soon",
    planned: [
      "Executive KPI dashboard (SQL + BI)",
      "Python EDA notebook + validation workflow",
      "Risk/controls case study with documentation"
    ]
  },
  links: {
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/"
  }
};

// --- Simple fuzzy matching helpers ---
function norm(s){ return (s || "").toLowerCase().trim(); }
function includesAny(q, arr){ return arr.some(k => q.includes(k)); }

function answerQuestion(qRaw){
  const q = norm(qRaw);

  // Basic intent routing
  if (!q) return { title: "Ask Michael", text: "Type a question like “Who is Michael?” or “Where did he attend?”" };

  if (includesAny(q, ["who is michael", "who is he", "about michael", "summary", "bio", "tell me about"])){
    return {
      title: "Who is Michael?",
      text: `${KB.identity.name}. ${KB.identity.tagline}`
    };
  }

  if (includesAny(q, ["where did he attend", "education", "school", "university", "college", "where did michael study"])){
    const edu = KB.education.map(e =>
      `• ${e.school} — ${e.degree} (${e.dates})`
    ).join("\n");
    return { title: "Education", text: edu };
  }

  if (includesAny(q, ["where did he work", "experience", "work", "job", "intern", "where did michael work"])){
    const exp = KB.experience.length
      ? KB.experience.map(e => `• ${e.role} — ${e.org} (${e.dates})`).join("\n")
      : "Experience entries are being added.";
    return { title: "Experience", text: exp };
  }

  if (includesAny(q, ["honors", "awards", "dean", "deans list", "recognition"])){
    return { title: "Honors & Recognition", text: KB.honors.map(h => `• ${h}`).join("\n") };
  }

  if (includesAny(q, ["leadership", "roles", "clubs", "organizations"])){
    return { title: "Leadership & Roles", text: KB.leadership.map(l => `• ${l}`).join("\n") };
  }

  if (includesAny(q, ["passions", "interests", "what does he like", "focus"])){
    return { title: "Passions", text: KB.passions.map(p => `• ${p}`).join("\n") };
  }

  if (includesAny(q, ["projects", "portfolio", "what has he built", "what are you building"])){
    const planned = KB.projects.planned.map(p => `• ${p}`).join("\n");
    return { title: "Projects", text: `Status: ${KB.projects.status}\n\nPlanned:\n${planned}` };
  }

  if (includesAny(q, ["roles fit", "what roles", "career", "what should he do", "path"])){
    return {
      title: "Best-fit roles (current positioning)",
      text:
`• Business Analyst / Strategy Analyst
• Data Analyst (SQL-heavy)
• Risk / Controls / Compliance Analytics
• Finance Analytics (FP&A / reporting)
• Operations / Supply Chain Analytics

If you want the sharper version: pick one lane and stack projects to match it.`
    };
  }

  // Fallback
  return {
    title: "I can answer that better with more facts",
    text:
`I’m currently answering from what’s written on the site (by design).
Try: “Who is Michael?”, “Where did he attend?”, “Where did he work?”, “What are his honors?”`
  };
}

// --- UI wiring ---
const askInput = document.getElementById("askInput");
const askBtn = document.getElementById("askBtn");
const askAnswer = document.getElementById("askAnswer");

function renderAnswer(obj){
  askAnswer.innerHTML = `
    <div class="answerTitle">${obj.title}</div>
    <pre class="muted small" style="white-space:pre-wrap;margin:0;">${obj.text}</pre>
  `;
}

askBtn?.addEventListener("click", () => renderAnswer(answerQuestion(askInput.value)));
askInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") renderAnswer(answerQuestion(askInput.value));
});

document.querySelectorAll("[data-q]").forEach(btn => {
  btn.addEventListener("click", () => {
    const q = btn.getAttribute("data-q");
    askInput.value = q;
    renderAnswer(answerQuestion(q));
  });
});

// Seed a default answer
renderAnswer(answerQuestion("Who is Michael?"));
