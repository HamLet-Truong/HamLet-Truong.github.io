import { cvData } from "./cv-data.js";

function createList(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function renderContactInfo() {
  const contactItems = [
    `DOB: ${cvData.profile.dob}`,
    `Gender: ${cvData.profile.gender}`,
    `Phone: ${cvData.profile.phone}`,
    `Address: ${cvData.profile.address}`,
    `Email: <a href="mailto:${cvData.profile.email}">${cvData.profile.email}</a>`
  ];

  document.getElementById("contactList").innerHTML = contactItems
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function renderEducation() {
  const education = cvData.education;
  document.getElementById("education").innerHTML = `
    <article class="education-card">
      <div class="education-head">
        <h3>${education.school}</h3>
        <span>${education.period}</span>
      </div>
      <ul class="clean-list">
        <li>${education.degree}</li>
        <li>Major: ${education.major}</li>
        <li>GPA: ${education.gpa}</li>
        <li>Relevant Coursework: ${education.coursework.join(", ")}</li>
      </ul>
    </article>
  `;
}

function renderSkills() {
  document.getElementById("skills").innerHTML = cvData.technicalSkills
    .map(
      (skill) => `
      <article class="skill-group">
        <h3>${skill.label}</h3>
        <p>${skill.items.join(", ")}</p>
      </article>
    `
    )
    .join("");
}

function renderProjects() {
  document.getElementById("projects").innerHTML = cvData.projects
    .map(
      (project) => `
      <article class="project-card">
        <header>
          <h3>${project.name}</h3>
          <p class="project-role">${project.role}</p>
          <p class="project-stack"><strong>Tech Stack:</strong> ${project.stack}</p>
        </header>
        <ul class="clean-list">${createList(project.highlights)}</ul>
      </article>
    `
    )
    .join("");
}

function renderSimpleLists() {
  document.getElementById("competencies").innerHTML = cvData.competencies
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.getElementById("additional").innerHTML = createList(
    cvData.additionalInformation
  );
}

function applyBaseContent() {
  document.getElementById("name").textContent = cvData.name;
  document.getElementById("role").textContent = cvData.role;
  document.getElementById("summary").textContent = cvData.summary;
  document.getElementById("footerName").textContent = cvData.name;

  const githubLink = document.getElementById("githubLink");
  githubLink.href = cvData.profile.github;
}

function activateRevealAnimation() {
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

applyBaseContent();
renderContactInfo();
renderEducation();
renderSkills();
renderProjects();
renderSimpleLists();
activateRevealAnimation();
