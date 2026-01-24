// ✅ Enable reveal animations only if JS actually runs
document.documentElement.classList.add("js");

// --------------------
// CONFIG: EDIT THESE
// --------------------
const PROFILE = {
  email: "mtefera@falcon.bentley.edu",
  linkedin: "https://www.linkedin.com/in/mtefe001-314910238/",
  profileImagePath: "" // leave blank until you actually add the image
};

// Curated Knowledge Base (public-safe)
const KB = {
  identity: {
    name: "Michael Mesfin Tefera",
    positioning:
      "Business analytics graduate student with a systems, risk, compliance, and governance mindset focused on data-driven decision-making.",
    origin:
      "Born and raised in Addis Ababa, Ethiopia. Educated at Ethio-Parents’ School (Gerji Campus). Moved to the U.S. in Fall 2021 to begin undergraduate studies, later expanding into MIS and Business Administration to deepen the business–technology intersection."
  },
  education: [
    {
      school: "Bentley University – McCallum Graduate School of Business",
      degree: "M.S. Business Analytics",
      gpa: "3.56 / 4.00",
      dates: "Expected May 2027"
    },
    {
      school: "SUNY Plattsburgh",
      degree: "B.S. (International Business, MIS, Business Administration) • Minor: Global Supply Chain Management",
      gpa: "3.68 / 4.00 (cum laude)",
      dates: "May 2025"
    }
  ],
  experience: [
    {
      role: "Graduate Assistant — CIS Sandbox (Bentley)",
      dates: "Sep 2025 – Present",
      bullets: [
        "Tutors 20+ students weekly in Excel, SQL, and Python",
        "Validates datasets and analytical models to identify errors and edge cases",
        "Supports faculty with datasets, documentation, and analytical demos"
      ]
    },
    {
      role: "Supply Chain Associate Intern — Fastenal",
      dates: "Jan 2025 – May 2025",
      bullets: [
        "Managed inventory operations across two manufacturing plants",
        "Tracked 100+ SKUs weekly to prevent downtime",
        "Coordinated 30+ purchase orders/week; improved urgent turnaround by ~15%",
        "Oversaw inbound inventory valued at ~$50K/month"
      ]
    },
    {
      role: "Project & Data Coordinator Intern — Center for Cybersecurity & Technology (CCT)",
      dates: "Aug 2024 – May 2025",
      bullets: [
        "Analyzed system logs and structured datasets for trends and anomalies",
        "Identified and helped resolve 10+ security gaps in simulations",
        "Translated analysis into clear, stakeholder-ready documentation"
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
// Helpers
// --------------------
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
const norm = (s) => (s || "").toLowerCase().trim();
const includesAny = (q, arr) => arr.some(k => q.includes(k));

function setHref(id, href){
  const el = document.getElementById(id);
  if (el) el.href = href;
}
function bullets(arr){
  return arr.map(x => `• ${x}`).join("\n");
}

// --------------------
// Footer year
// --------------------
const year = new Date().getFullYear();
$("#year") && ($("#year").textContent = year);
$("#year2") && ($("#year2").textContent = year);

// --------------------
// Links
// --------------------
setHref("lnkLinkedIn", PROFILE.linkedin);
setHref("lnkGitHub", PROFILE.github);
setHref("lnkEmail", `mailto:${PROFILE.email}`);
setHref("btnLinkedIn", PROFILE.linkedin);
setHref("btnGitHub", PROFILE.github);
setHref("btnEmail", `mailto:${PROFILE.email}`);

// --------------------
// Progress bar
// --------------------
const progressBar = $("#progressBar");
function updateProgress(){
  const doc = document.documentElement;
  const st = doc.scrollTop || document.body.scrollTop;
  const sh = doc.scrollHeight - doc.clientHeight;
  const pct = sh ? (st / sh) * 100 : 0;
  if (progressBar) progressBar.style.width = `${pct}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// --------------------
// Scroll headline (subtle shrink + lift)
// --------------------
const title = document.querySelector("[data-scrolltitle]");
function updateTitle(){
  if (!title) return;
  const t = Math.min(window.scrollY / 700, 1);
  const scale = 1 - (0.12 * t);
  const lift = -14 * t;
  title.style.transform = `translateY(${lift}px) scale(${scale})`;
}
window.addEventListener("scroll", updateTitle, { passive: true });
updateTitle();

// --------------------
// Reveal on scroll
// --------------------
const revealEls = $$(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("isVisible");
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// --------------------
// Portrait image loader (optional)
// --------------------
const img = $("#profileImg");
if (img){
  img.onload = () => {
    img.style.display = "block";
    const ph = document.querySelector(".imgPlaceholder");
    if (ph) ph.style.display = "none";
  };
  img.onerror = () => {};
  img.src = PROFILE.profileImagePath;
}

// --------------------
// Ask Michael bot (curated)
// --------------------
const askInput = $("#askInput");
const askBtn = $("#askBtn");
const askAnswer = $("#askAnswer");

function answer(qRaw){
  const q = norm(qRaw);

  if (!q){
    return { title:"Ask Michael", text:"Try: “Who is Michael?” “Where did he attend?” “What roles fit him?”" };
  }

  if (includesAny(q, ["who is michael", "who is he", "summary", "bio", "about michael", "tell me about"])){
    return { title:"Who is Michael?", text:`${KB.identity.name}\n\n${KB.identity.positioning}` };
  }

  if (includesAny(q, ["where is he from", "origin", "background", "born", "where is michael from"])){
    return { title:"Origins", text:KB.identity.origin };
  }

  if (includesAny(q, ["education", "school", "attend", "university", "college"])){
    const edu = KB.education.map(e =>
      `• ${e.school}\n  - ${e.degree}\n  - GPA: ${e.gpa}\n  - ${e.dates}`
    ).join("\n\n");
    return { title:"Education", text:edu };
  }

  if (includesAny(q, ["gpa", "grades"])){
    return {
      title:"GPA",
      text:`• MSBA (Bentley): ${KB.education[0].gpa}\n• BA (SUNY Plattsburgh): ${KB.education[1].gpa}\n\n${KB.boundaries[0]}`
    };
  }

  if (includesAny(q, ["work", "experience", "job", "intern", "where did he work"])){
    const exp = KB.experience.map(e =>
      `• ${e.role} (${e.dates})\n${bullets(e.bullets)}`
    ).join("\n\n");
    return { title:"Experience", text:exp };
  }

  if (includesAny(q, ["honors", "deans list", "beta gamma", "gamma sigma", "naba", "awards"])){
    return {
      title:"Honors & Memberships",
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
    return { title:"Certifications", text:bullets(KB.certifications) };
  }

  if (includesAny(q, ["roles fit", "career", "path", "best fit", "what roles"])){
    return {
      title:"Best-fit roles (current positioning)",
      text:
`• Business Analyst / Strategy Analyst
• Risk / Controls / Compliance Analytics
• Operations / Supply Chain Analytics
• Finance Analytics (FP&A / reporting)
• Data Analyst (SQL-heavy)

Your edge: reliable execution + governance mindset, not gimmicks.`
    };
  }

  if (includesAny(q, ["transcript", "degreeworks", "course grades"])){
    return {
      title:"Private academic records",
      text:"Michael does not publish transcripts or course-by-course grades publicly. The site provides curated signals and verified milestones instead."
    };
  }

  return {
    title:"Try a sharper question",
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

function render(a){
  if (!askAnswer) return;
  askAnswer.innerHTML = `<div class="aTitle">${a.title}</div><pre>${a.text}</pre>`;
}

askBtn?.addEventListener("click", () => render(answer(askInput.value)));
askInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") render(answer(askInput.value));
});
$$("[data-q]").forEach(b => b.addEventListener("click", () => {
  const q = b.getAttribute("data-q");
  askInput.value = q;
  render(answer(q));
}));

render(answer("Who is Michael?"));
