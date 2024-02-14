document.addEventListener("DOMContentLoaded", function () {
  const projects = [
    { title: "Project A", status: "devam", tags: ["otel", "konut"] },
    // Add more project objects as needed
  ];

  const projectsContent = document.querySelector(".projects-content");

  // Function to create project item
  function createProjectItem(project) {
    const projectItem = document.createElement("div");
    projectItem.className = "project-item";
    projectItem.setAttribute("data-status", project.status);
    projectItem.setAttribute("data-tags", project.tags.join(","));
    projectItem.textContent = project.title;
    projectsContent.appendChild(projectItem);
  }

  // Function to filter projects based on selected filters
  function updateProjects() {
    const selectedStatus = document.querySelector(
      'input[name="project-status"]:checked'
    ).value;
    const selectedTags = Array.from(
      document.querySelectorAll('input[name="tag"]:checked')
    ).map((checkbox) => checkbox.value);

    // Remove existing project items
    projectsContent.innerHTML = "";

    // Filter and create project items based on selected filters
    projects.forEach((project) => {
      if (
        (selectedStatus === "tum" || project.status === selectedStatus) &&
        (selectedTags.length === 0 ||
          selectedTags.some((tag) => project.tags.includes(tag)))
      ) {
        createProjectItem(project);
      }
    });
  }

  // Add event listeners to filter controls
  const projectStatusRadio = document.querySelectorAll(
    'input[name="project-status"]'
  );
  const tagCheckboxes = document.querySelectorAll('input[name="tag"]');

  projectStatusRadio.forEach((radio) => {
    radio.addEventListener("change", updateProjects);
  });

  tagCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateProjects);
  });

  // Initial project update
  updateProjects();
});
