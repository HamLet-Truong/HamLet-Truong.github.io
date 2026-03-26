const { cvData } = globalThis;

let currentLanguage = "vi";

function createList(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function renderContactInfo() {
  const t = cvData.text[currentLanguage];
  const contactItems = [
    `${t.contactLabel.dob}: ${cvData.profile.dob}`,
    `${t.contactLabel.phone}: ${cvData.profile.phone}`,
    `${t.contactLabel.address}: ${cvData.profile.address[currentLanguage]}`,
    `${t.contactLabel.email}: <a href="mailto:${cvData.profile.email}">${cvData.profile.email}</a>`
  ];

  document.getElementById("contactList").innerHTML = contactItems
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function renderEducation() {
  const t = cvData.text[currentLanguage];
  const education = t.education;

  document.getElementById("education").innerHTML = `
    <article class="education-card">
      <h3>${education.school}</h3>
      <p class="education-meta">${education.period}</p>
      <ul class="list">
        <li>${education.degree}</li>
        <li>${t.labels.major}: ${education.major}</li>
        <li>${t.labels.gpa}: ${education.gpa}</li>
        <li>${education.courseworkLabel}: ${education.coursework.join(", ")}</li>
      </ul>
    </article>
  `;
}

function renderSkills() {
  const t = cvData.text[currentLanguage];

  document.getElementById("skills").innerHTML = t.technicalSkills
    .map(
      (skill) => `
      <article class="skill-item">
        <h3>${skill.label}</h3>
        <p>${skill.items.join(", ")}</p>
      </article>
    `
    )
    .join("");
}

function renderProjects() {
  const t = cvData.text[currentLanguage];

  document.getElementById("projects").innerHTML = t.projects
    .map(
      (project) => `
      <article class="project-card">
        <header>
          <h3>${project.name}</h3>
          <p class="project-role">${project.role}</p>
          <p class="project-stack"><strong>${t.labels.techStack}:</strong> ${project.stack}</p>
        </header>
        <ul class="list">${createList(project.highlights)}</ul>
      </article>
    `
    )
    .join("");
}

function renderSimpleLists() {
  const t = cvData.text[currentLanguage];

  document.getElementById("competencies").innerHTML = t.competencies
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.getElementById("additional").innerHTML = createList(
    t.additionalInformation
  );
}

function applyBaseContentAndLabels() {
  const t = cvData.text[currentLanguage];

  document.getElementById("name").textContent = cvData.name;
  document.getElementById("role").textContent = t.role;
  document.getElementById("summary").textContent = t.summary;
  document.getElementById("footerName").textContent = cvData.name;
  document.getElementById("footerRole").textContent = t.footerRole;

  document.getElementById("contactTitle").textContent = t.section.contact;
  document.getElementById("educationTitle").textContent = t.section.education;
  document.getElementById("skillsTitle").textContent = t.section.skills;
  document.getElementById("competenciesTitle").textContent = t.section.competencies;
  document.getElementById("additionalTitle").textContent = t.section.additional;
  document.getElementById("projectsTitle").textContent = t.section.projects;
  document.title = t.pageTitle;
  document.documentElement.lang = currentLanguage;

  const githubLink = document.getElementById("githubLink");
  githubLink.href = cvData.profile.github;
  githubLink.textContent = t.githubButton;
}

function updateLanguageButtons() {
  const isVi = currentLanguage === "vi";
  document.getElementById("btnVi").classList.toggle("active", isVi);
  document.getElementById("btnEn").classList.toggle("active", !isVi);
}

function renderAll() {
  applyBaseContentAndLabels();
  renderContactInfo();
  renderEducation();
  renderSkills();
  renderProjects();
  renderSimpleLists();
  updateLanguageButtons();
}

function bindLanguageEvents() {
  document.getElementById("btnVi").addEventListener("click", () => {
    if (currentLanguage !== "vi") {
      currentLanguage = "vi";
      renderAll();
    }
  });

  document.getElementById("btnEn").addEventListener("click", () => {
    if (currentLanguage !== "en") {
      currentLanguage = "en";
      renderAll();
    }
  });
}

renderAll();
bindLanguageEvents();
