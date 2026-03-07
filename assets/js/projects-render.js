(function () {
  var grid = document.querySelector(".projects-grid");
  if (!grid) return;

  var projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  if (!projects.length) return;

  var normalizeUrl = function (url) {
    if (!url || url === "#") return "#";
    if (url.indexOf("http") === 0) return url;
    return url.indexOf("/") === 0 ? url : url;
  };

  grid.innerHTML = projects
    .map(function (project, index) {
      var demoDisabled = !project.demoUrl || project.demoUrl === "#";
      var githubDisabled = !project.githubUrl || project.githubUrl === "#";

      return (
        '<article class="project-card">' +
        '<div class="project-card__top">' +
        '<span class="project-card__tag">' +
        project.status +
        "</span>" +
        '<span class="project-card__num">' +
        String(index + 1).padStart(2, "0") +
        "</span>" +
        "</div>" +
        '<h3 class="project-card__title">' +
        project.title +
        "</h3>" +
        '<p class="project-card__text">' +
        project.description +
        "</p>" +
        '<div class="project-card__meta">' +
        (project.tags || [])
          .slice(0, 4)
          .map(function (tag) {
            return '<span class="project-chip">' + tag + "</span>";
          })
          .join("") +
        "</div>" +
        '<div class="project-card__actions">' +
        '<a class="project-card__btn' +
        (demoDisabled ? " project-card__btn--disabled" : "") +
        '" href="' +
        normalizeUrl(project.demoUrl) +
        '" ' +
        (demoDisabled ? 'aria-disabled="true"' : 'target="_blank" rel="noopener noreferrer"') +
        ">Demo</a>" +
        '<a class="project-card__btn' +
        (githubDisabled ? " project-card__btn--disabled" : "") +
        '" href="' +
        normalizeUrl(project.githubUrl) +
        '" ' +
        (githubDisabled ? 'aria-disabled="true"' : 'target="_blank" rel="noopener noreferrer"') +
        ">GitHub</a>" +
        "</div>" +
        "</article>"
      );
    })
    .join("");
})();
