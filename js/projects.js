const completedProjects = document.querySelectorAll(".completed");
const goingProjects = document.querySelectorAll(".going");
const allProjects = document.querySelectorAll(".all");

console.log(completedProjects);

completedProjects.forEach((project) => {
  project.addEventListener("click", requestToCompleteds);
});

goingProjects.forEach((project) => {
  project.addEventListener("click", requestToGoings);
});

// Requests

async function requestToGoings() {
  try {
    const response = await fetch("projects.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json();
    const goings = json.goings;
    renderProjects(goings);
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
    const completeds = json.completeds;
    renderProjects(completeds);
    console.log(completeds);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

async function renderProjects(projects) {
  const projectContainer = document.querySelector(".projects-box");
  const projectsMom = document.querySelector(".projects-div");

  // Clear existing projects

  projects.forEach((project) => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");

    const title = document.createElement("h6");
    title.style.paddingLeft = "15px";
    title.style.paddingTop = "15px";
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
      yearSpan.innerHTML = `Year: <span>${project.year}</span>`;
      projectDiv.appendChild(yearSpan);
    }

    if (project.communication) {
      const communicationSpan = document.createElement("span");
      communicationSpan.style.paddingLeft = "15px";
      communicationSpan.style.paddingTop = "15px";
      communicationSpan.innerHTML = `Communication: <span>${project.communication}</span>`;
      projectDiv.appendChild(communicationSpan);
    }

    projectContainer.appendChild(projectDiv);
  });
}
