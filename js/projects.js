const completedProjects = document.querySelectorAll(".completed");
const goingProjects = document.querySelectorAll(".going");
const allProjects = document.querySelectorAll(".all");
const projectTitle = document.getElementById("project-title");


console.log(completedProjects); // Log to check element selection

document.addEventListener("DOMContentLoaded", requestToAllProjects); // Initial request

completedProjects.forEach((project) => {
  project.addEventListener("click", requestToCompleteds); // Corrected function name
});

goingProjects.forEach((project) => {
  project.addEventListener("click", requestToGoings); // Corrected function name
});

allProjects.forEach((project) => {
  project.addEventListener("click", requestToAllProjects); // Corrected function name
});

// Requests

async function requestToGoings() {
  try {
    const response = await fetch("projects.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json();
    const goings = json.goings; // Assuming property name is 'goings'
    renderProjects(goings);
    setTitleProjects("Devam Eden Projeler");
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

async function requestToCompleteds() {
  try {
    const response = await fetch("projects.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json();
    const completeds = json.completeds; // Assuming property name is 'completeds'
    renderProjects(completeds);
    console.log(completeds);
    setTitleProjects("Tamamlanan Projeler");
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

async function requestToAllProjects() {
  try {
    const response = await fetch("projects.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json();
    const allprojects = json.all; // Assuming property name is 'all'
    renderProjects(allprojects);
    console.log(allprojects);
    setTitleProjects("Tüm Projeler");
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

async function renderProjects(projects) {
  const projectsWrapper = document.createElement("div");
  projectsWrapper.classList.add("projects-wrapper");

  // Clear existing projects before rendering new ones (assuming desired behavior)
  const projectContainer = document.querySelector(".projects-box");
  if (projectContainer) {
    projectContainer.innerHTML = ""; // Clear existing content
  } else {
    console.warn(
      "Element with class 'projects-box' not found for project rendering."
    );
  }

  console.log(projects);

  projects.forEach((project) => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");

    const title = document.createElement("h6");
    title.style.paddingLeft = "15px";
    title.style.paddingTop = "15px";
    title.style.overflow = "hidden";
    title.innerHTML = project.title;

    const locationSpan = document.createElement("span");
    locationSpan.style.paddingLeft = "15px";
    locationSpan.style.paddingTop = "15px";
    locationSpan.innerHTML = `Location: <span>${project.location}</span><br/>`;

    projectDiv.appendChild(title);
    projectDiv.appendChild(locationSpan);

    if (project.year) {
      const yearSpan = document.createElement("span");
      yearSpan.style.paddingLeft = "15px";
      yearSpan.style.paddingTop = "15px";
      yearSpan.style.overflow = "hidden";

      yearSpan.innerHTML = `Year: <span>${project.year}</span>`;
      projectDiv.appendChild(yearSpan);
    }

    if (project.communication) {
      const communicationSpan = document.createElement("span");
      communicationSpan.style.paddingLeft = "15px";
      communicationSpan.style.paddingTop = "15px";
      communicationSpan.style.overflow = "hidden";
      communicationSpan.innerHTML = `Communication: <span>${project.communication}</span> </br>`;
      projectDiv.appendChild(communicationSpan);
    }

    if (project.contact) {
      const contactSpan = document.createElement("span");
      contactSpan.style.paddingLeft = "15px";
      contactSpan.style.paddingTop = "15px";
      contactSpan.innerHTML = `Contact: <span>${project.contact}</span>`;
      projectDiv.appendChild(contactSpan);
    }

    if (project.description) {
      const descriptionSpan = document.createElement("span");
      descriptionSpan.style.paddingLeft = "15px";
      descriptionSpan.style.paddingTop = "15px";
      descriptionSpan.innerHTML = `Description: <span>${project.description}</span>`;
      projectDiv.appendChild(descriptionSpan);
    }

    projectsWrapper.appendChild(projectDiv); // Append to wrapper directly
  });
  projectContainer.appendChild(projectsWrapper); // Assuming you want it in body
}

function setTitleProjects(title){
  projectTitle.innerHTML = title;
}