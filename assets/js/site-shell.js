(function () {
  var body = document.body;
  if (!body) return;

  var basePath = body.dataset.basePath || ".";
  var page = body.dataset.page || "home";
  var config = window.SITE_CONFIG || {};
  var socialLinks = config.socialLinks || {};
  var githubUrl = socialLinks.github || "https://github.com/AlessandraTrapasso095";
  var linkedinUrl = socialLinks.linkedin || "https://www.linkedin.com/";
  var instagramUrl = socialLinks.instagram || "https://www.instagram.com/";

  var toPath = function (path) {
    return basePath === "." ? path : "../" + path;
  };

  var homeUrl = basePath === "." ? "index.html" : "../index.html";
  var aboutUrl = basePath === "." ? "aboutme/index.html" : "../aboutme/index.html";
  var cvUrl = basePath === "." ? "cv/index.html" : "../cv/index.html";
  var contactUrl = basePath === "." ? "contattami/index.html" : "../contattami/index.html";

  var headerTarget = document.querySelector("[data-site-header]");
  if (headerTarget) {
    headerTarget.innerHTML =
      '<nav class="hero-nav" aria-label="Menu principale">' +
      '<a href="' +
      homeUrl +
      '" class="brand" aria-label="Vai alla Home">' +
      '<img src="' +
      toPath("assets/img/logo2.png") +
      '" alt="Logo AT" class="brand__logo" />' +
      "</a>" +
      '<ul class="social-links" aria-label="Social links">' +
      '<li><a href="' +
      githubUrl +
      '" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fa-brands fa-github"></i><span>GitHub</span></a></li>' +
      '<li><a href="' +
      linkedinUrl +
      '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i><span>LinkedIn</span></a></li>' +
      '<li><a href="' +
      instagramUrl +
      '" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i><span>Instagram</span></a></li>' +
      "</ul>" +
      '<div class="menu-bar">' +
      '<ul class="nav-menu">' +
      '<li><a href="' +
      homeUrl +
      '">Home</a></li>' +
      '<li><a href="' +
      aboutUrl +
      '">Chi Sono</a></li>' +
      '<li><a href="' +
      homeUrl +
      '#skills">Skills</a></li>' +
      '<li><a href="' +
      homeUrl +
      '#progetti">Progetti</a></li>' +
      '<li><a href="' +
      cvUrl +
      '">CV</a></li>' +
      '<li><a href="' +
      contactUrl +
      '">Contattami</a></li>' +
      "</ul>" +
      '<form class="nav-search nav-search--desktop" role="search">' +
      '<input type="search" placeholder="Cerca..." aria-label="Cerca nel sito" autocomplete="off" />' +
      "</form>" +
      "</div>" +
      '<input type="checkbox" id="nav-toggle" class="nav-toggle" aria-hidden="true" />' +
      '<label for="nav-toggle" class="nav-hamburger" aria-label="Apri o chiudi il menu"><span></span><span></span><span></span></label>' +
      '<label for="nav-toggle" class="nav-overlay" aria-hidden="true"></label>' +
      '<aside class="nav-drawer" aria-label="Menu mobile">' +
      '<div class="nav-drawer__top"><span class="nav-drawer__title">Menu</span></div>' +
      '<ul class="nav-drawer__menu">' +
      '<li><a href="' +
      homeUrl +
      '">Home</a></li>' +
      '<li><a href="' +
      aboutUrl +
      '">Chi Sono</a></li>' +
      '<li><a href="' +
      homeUrl +
      '#skills">Skills</a></li>' +
      '<li><a href="' +
      homeUrl +
      '#progetti">Progetti</a></li>' +
      '<li><a href="' +
      cvUrl +
      '">CV</a></li>' +
      '<li><a href="' +
      contactUrl +
      '">Contattami</a></li>' +
      "</ul>" +
      '<form class="nav-drawer__search" role="search">' +
      '<input type="search" placeholder="Cerca..." aria-label="Cerca nel sito" autocomplete="off" />' +
      "</form>" +
      "</aside>" +
      "</nav>";

    var activeByPage = {
      home: "Home",
      about: "Chi Sono",
      cv: "CV",
      contact: "Contattami",
    };

    var activeLabel = activeByPage[page];
    if (activeLabel) {
      var links = headerTarget.querySelectorAll(".nav-menu a, .nav-drawer__menu a");
      links.forEach(function (link) {
        if (link.textContent.trim() === activeLabel) {
          link.setAttribute("aria-current", "page");
        }
      });
    }
  }

  var footerTarget = document.querySelector("[data-site-footer]");
  if (footerTarget) {
    footerTarget.innerHTML =
      '<div class="site-footer__inner">' +
      '<div class="site-footer__card">' +
      '<h2 class="site-footer__title">Restiamo in contatto</h2>' +
      '<p class="site-footer__text">Se cerchi una Junior Web Developer motivata e attenta ai dettagli, scrivimi o contattami sui miei profili social.</p>' +
      '<div class="contact-form__actions">' +
      '<a class="site-footer__cta" href="' +
      contactUrl +
      '">Contattami</a>' +
      "</div>" +
      '<ul class="site-footer__social" aria-label="Social links">' +
      '<li><a href="' +
      githubUrl +
      '" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fa-brands fa-github"></i></a></li>' +
      '<li><a href="' +
      linkedinUrl +
      '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a></li>' +
      '<li><a href="' +
      instagramUrl +
      '" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a></li>' +
      "</ul>" +
      '<p class="site-footer__copy">&copy; 2026 Alessandra Trapasso - Junior Web Developer</p>' +
      "</div>" +
      "</div>";
  }
})();
