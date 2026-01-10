// --------------------
// CONFIG (edit these)
// --------------------
const PROFILE = {
  email: "your.email@example.com",
  linkedin: "https://www.linkedin.com/in/YOURHANDLE/",
  github: "https://github.com/YOURHANDLE",
  profileImagePath: "assets/profile.jpg" // optional; will auto-hide placeholder if found
};

// Knowledge Base (public, curated truth only)
const KB = {
  identity: {
    name: "Michael Mesfin Tefera",
    positioning:
      "Business analytics graduate student with a systems, risk, compliance, and governance mindset focused on data-driven decision-making.",
    origin:
      "Born and raised in Addis Ababa, Ethiopia. Educated at Ethio-Parents’ School (Gerji Campus). Moved to the U.S. in Fall 2021 to begin undergraduate studies, later expanding into MIS and Business Administration to deepen the business–technology intersection.",
  },
  education: [
    {
      school: "Bentley University – McCallum Graduate School of Business",
      degree: "M.S. Business Analytics",
      gpa: "3.56 / 4.00",
      dates: "Expected May 2027",
    },
    {
      school: "SUNY Plattsburgh",
      degree: "B.S. (International Business, MIS, Business Administration) • Minor: Global Supply Chain Management",
      gpa: "3.68 / 4.00 (cum laude)",
      dates: "May 2025",
    }
  ],
  experience: [
    {
      role: "Graduate Assistant — CIS Sandbox (Bentley University)",
      dates: "Sep 2025 – Present",
      bullets: [
        "Tutors 20+ students weekly in Excel, SQL, and Python",
        "Validates datasets and analytical models to identify errors and edge cases",
        "Supports faculty with datasets, documentation, and analytical demos",
      ]
    },
    {
      role: "Supply Chain Associate Intern — Fastenal",
      dates: "Jan 2025 – May 2025",
      bullets: [
        "Managed inventory operations across two manufacturing plants",
        "Tracked 100+ SKUs weekly to prevent downtime",
        "Coordinated 30+ purchase orders/week; improved urgent turnaround by ~15%",
        "Oversaw inbound inventory valued at ~$50K/month",
      ]
    },
    {
      role: "Project & Data Coordinator Intern — Center for Cybersecurity & Technology (CCT)",
      dates: "Aug 2024 – May 2025",
      bullets: [
        "Analyzed system logs and structured datasets for trends and anomalies",
        "Identified and helped resolve 10+ security gaps in simulations",
        "Translated technical analysis into clear, stakeholder-ready documentation",
      ]
    }
  ],
  honors: {
    deansList: "Dean’s List — SUNY Plattsburgh (School of Business & Economics), multiple terms.",
    bgs:
      "Beta Gamma Sigma is the international honor society for AACSB-accredited business schools, recognizing high academic achievement in business programs.",
    gsa:
      "Gamma Sigma Alpha is a national Greek academic honor society recognizing excellence in scholarship and sustained academic performance.",
    naba:
      "NABA (National Association of Black Accountants) is a professional organization supporting development in accounting, finance, business leadership, and career growth."
  },
  certifications: [
    "Google Cybersecurity Professional Certificate",
    "Excel Yellow Belt (McGraw-Hill)"
  ],
  boundaries: [
    "No transcripts or course-by-course grades are published.",
    "No immigration status is discussed.",
    "Content is curated and factual."
  ]
};

// --------------------
// SMALL UTILITIES
// --------------------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function norm(s){ return (s || "").toLowerCase().trim(); }
function includesAny(q, arr){ return arr.some(k => q.includes(k)); }

// --------------------
// NAV (mobile)
// --------------------
const toggle = $(".nav__toggle");
const links = $(".nav__links");

toggle?.addEventListener("click", () => {
  const isOpen = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

$$(".nav__links a").forEach(a => {
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

// --------------------
// FOOTER YEAR
// --------------------
$("#year")?.textContent = new Date().getFullYear();

// --------------------
// PROGRESS BAR
// --------------------
const progressBar = $("#progressBar");
function updateProgress(){
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const pct = scrollHeight ? (scrollTop / scrollHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = `${pct}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// --------------------
// SCROLL TITLE EFFECT
// (shrinks + lifts slightly)
// --------------------
const scrollTitle = document.querySelector("[data-scrolltitle]");
function updateScrollTitle(){
  if (!scrollTitle) return;
  const maxShrink = 0.18; // 18% shrink max
  const maxLift = 18;     // px
  const y = window.scrollY;
  const t = Math.min(y / 600, 1); // progress 0..1
  const scale = 1 - maxShrink * t;
  const lift = -maxLift * t;
  scrollTitle.style.transform = `translateY(${lift}px) scale(${scale})`;
}
window.addEventListener("scroll", updateScrollTitle, { passive: true });
updateScrollTitle();

// --------------------
// REVEAL ON SCROLL
// --------------------
const revealEls = $$(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("isVisible");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// --------------------
// PROFILE LINKS
// --------------------
function setHref(id, href){
  const el = document.getElementById(id);
  if (!el) return;
  el.href = href;
}
setHref("lnkLinkedIn", PROFILE.linkedin);
setHref("lnkGitHub", PROFILE.github);
setHref("lnkEmail", `mailto:${PROFILE.email}`);
setHref("btnLinkedIn", PROFILE.linkedin);
setHref("btnGitHub", PROFILE.github);
setHref("btnEmail", `mailto:${PROFILE.email}`);

// --------------------
// PHOTO LOADER (optional)
// If assets/profile.jpg exists, show it.
// If not, keep placeholder.
// --------------------
const img = $("#profileImg");
if (img){
  img.onload = () => {
    img.style.display = "block";
    // hide placeholder layer
    const ph = document.querySelector(".portrait__placeholder");
    if (ph) ph.style.display = "none";
  };
  img.onerror = () => {
    // do nothing; placeholder stays
  };
  img.src = PROFILE.profileImagePath;
}

// --------------------
// ASK MICHAEL BOT (local, curated)
// --------------------
const askInput = $("#askInput");
const askBtn = $("#askBtn");
const askAnswer = $("#askAnswer");

function formatBullets(arr){
  return arr.map(x => `• ${x}`).join("\n");
}

function answerQuestion(qRaw){
  const q = norm(qRaw);

  if (!q){
    return { title: "Ask Michael", text: "Try: “Who is Michael?” “Where did he attend?” “What roles fit him?”" };
  }

  if (includesAny(q, ["who is michael", "who is he", "summary", "bio", "about michael", "tell me about"])){
    return {
      title: "Who is Michael?",
      text: `${KB.identity.name}\n\n${KB.identity.positioning}`
    };
  }

  if (includesAny(q, ["where is he from", "origin", "background", "where was he born", "where is michael from"])){
    return { title: "Origins", text: KB.identity.origin };
  }

  if (includesAny(q, ["where did he attend", "education", "school", "university", "college", "where did michael study"])){
    const edu = KB.education.map(e =>
      `• ${e.school}\n  - ${e.degree}\n  - GPA: ${e.gpa}\n  - ${e.dates}`
    ).join("\n\n");
    return { title: "Education", text: edu };
  }

  if (includesAny(q, ["gpa", "grades"])){
    return {
      title: "GPA",
      text:
`• MSBA (Bentley): ${KB.education[0].gpa}
• BA (SUNY Plattsburgh): ${KB.education[1].gpa}

${KB.boundaries[0]}`
    };
  }

  if (includesAny(q, ["where did he work", "experience", "work", "job", "intern", "roles", "employment"])){
    const exp = KB.experience.map(e =>
      `• ${e.role} (${e.dates})\n${formatBullets(e.bullets)}`
    ).join("\n\n");
    return { title: "Experience", text: exp };
  }

  if (includesAny(q, ["honors", "awards", "deans list", "dean's list", "beta gamma", "gamma sigma", "naba"])){
    return {
      title: "Honors & Memberships",
      text:
`${KB.honors.deansList}

• Beta Gamma Sigma:
  ${KB.honors.bgs}

• Gamma Sigma Alpha:
  ${KB.honors.gsa}

• NABA:
  ${KB.honors.naba}`
    };
  }

  if (includesAny(q, ["certifications", "certs", "certificate"])){
    return { title: "Certifications", text: formatBullets(KB.certifications) };
  }

  if (includesAny(q, ["what roles fit", "what roles", "career", "path", "best fit"])){
    return {
      title: "Best-fit roles (current positioning)",
      text:
`• Business Analyst / Strategy Analyst
• Risk / Controls / Compliance Analytics
• Operations / Supply Chain Analytics
• Finance Analytics (FP&A / reporting)
• Data Analyst (SQL-heavy)

Reason: your profile is strongest where analytics meets systems, governance, and execution.`
    };
  }

  if (includesAny(q, ["transcript", "degreeworks", "show transcript", "course grades"])){
    return {
      title: "Private academic records",
      text:
`Michael does not publish transcripts or course-by-course grades publicly.
The site provides curated coursework signals and verified milestones instead.`
    };
  }

  return {
    title: "Try a sharper question",
    text:
`I answer from this site’s record.
Good prompts:
• Who is Michael?
• Where did he attend?
• Where did he work?
• What honors does he have?
• What roles fit him?`
  };
}

function renderAnswer(obj){
  if (!askAnswer) return;
  askAnswer.innerHTML = `
    <div class="aTitle">${obj.title}</div>
    <pre>${obj.text}</pre>
  `;
}

askBtn?.addEventListener("click", () => renderAnswer(answerQuestion(askInput.value)));
askInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") renderAnswer(answerQuestion(askInput.value));
});

$$("[data-q]").forEach(btn => {
  btn.addEventListener("click", () => {
    const q = btn.getAttribute("data-q");
    askInput.value = q;
    renderAnswer(answerQuestion(q));
  });
});

// Seed
renderAnswer(answerQuestion("Who is Michael?"));
