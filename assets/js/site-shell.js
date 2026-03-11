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
  var privacyUrl = basePath === "." ? "privacy/index.html" : "../privacy/index.html";
  var cookieUrl = basePath === "." ? "cookie/index.html" : "../cookie/index.html";

  var a11yStyleId = "site-a11y-style";
  if (!document.getElementById(a11yStyleId)) {
    var a11yStyle = document.createElement("style");
    a11yStyle.id = a11yStyleId;
    a11yStyle.textContent =
      "a:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible{outline:3px solid #ff66c4;outline-offset:3px;border-radius:8px}" +
      ".site-search-results a:focus-visible{outline:2px solid #5170ff;outline-offset:2px}" +
      ".site-footer__legal{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin:8px 0 6px}" +
      ".site-footer__legal-link{display:inline-flex;align-items:center;justify-content:center;height:36px;padding:0 14px;border-radius:999px;text-decoration:none;color:#fff;font-size:12px;font-weight:800;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.24)}" +
      ".site-footer__legal-link:hover{transform:translateY(-1px);opacity:.96}" +
      ".cookie-banner{position:fixed;left:50%;bottom:16px;transform:translate(-50%,20px);width:min(940px,calc(100vw - 20px));background:linear-gradient(135deg,#1d2f7a,#8e2a65);color:#fff;border:1px solid rgba(255,255,255,.28);border-radius:14px;box-shadow:0 18px 38px rgba(0,0,0,.32);padding:14px 14px 12px;z-index:10080;opacity:0;pointer-events:none;transition:all .22s ease}" +
      ".cookie-banner.is-visible{opacity:1;transform:translate(-50%,0);pointer-events:auto}" +
      ".cookie-banner__inner{display:flex;gap:12px;align-items:flex-start;justify-content:space-between}" +
      ".cookie-banner__text{margin:0;font-size:13px;line-height:1.55;max-width:760px}" +
      ".cookie-banner__actions{display:flex;gap:8px;flex-wrap:wrap}" +
      ".cookie-banner__btn,.cookie-banner__link{display:inline-flex;align-items:center;justify-content:center;height:38px;padding:0 14px;border-radius:999px;border:1px solid rgba(255,255,255,.35);font-size:12px;font-weight:800;text-decoration:none}" +
      ".cookie-banner__btn{background:#fff;color:#111;cursor:pointer}" +
      ".cookie-banner__link{background:rgba(255,255,255,.12);color:#fff}" +
      "@media (max-width:760px){.cookie-banner__inner{flex-direction:column}.cookie-banner__actions{width:100%}.cookie-banner__btn,.cookie-banner__link{flex:1}}" +
      "@media (prefers-reduced-motion: reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}";
    document.head.appendChild(a11yStyle);
  }


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
      '<div class="site-footer__legal" aria-label="Link legali">' +
      '<a class="site-footer__legal-link" href="' +
      privacyUrl +
      '">Privacy Policy</a>' +
      '<a class="site-footer__legal-link" href="' +
      cookieUrl +
      '">Cookie Policy</a>' +
      "</div>" +
      '<p class="site-footer__copy">&copy; 2026 Alessandra Trapasso - Junior Web Developer</p>' +
      "</div>" +
      "</div>";
  }

  var consentKey = "at_cookie_notice_v1";
  var canUseStorage = function () {
    try {
      var key = "__consent_test__";
      window.localStorage.setItem(key, "1");
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  };

  var storageEnabled = canUseStorage();
  var consentAccepted = storageEnabled && window.localStorage.getItem(consentKey) === "accepted";

  if (!consentAccepted) {
    var cookieBanner = document.createElement("section");
    cookieBanner.className = "cookie-banner";
    cookieBanner.setAttribute("role", "dialog");
    cookieBanner.setAttribute("aria-label", "Informativa cookie");
    cookieBanner.innerHTML =
      '<div class="cookie-banner__inner">' +
      '<p class="cookie-banner__text">Questo sito usa solo cookie tecnici e tecnologie equivalenti necessari al funzionamento (es. preferenza banner). Non uso cookie di profilazione o pubblicitari.</p>' +
      '<div class="cookie-banner__actions">' +
      '<a class="cookie-banner__link" href="' +
      cookieUrl +
      '">Leggi Cookie Policy</a>' +
      '<button class="cookie-banner__btn" type="button">Ho capito</button>' +
      "</div>" +
      "</div>";
    document.body.appendChild(cookieBanner);

    var closeBanner = function () {
      cookieBanner.classList.remove("is-visible");
      setTimeout(function () {
        cookieBanner.remove();
      }, 240);
    };

    var acceptBtn = cookieBanner.querySelector(".cookie-banner__btn");
    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        if (storageEnabled) {
          window.localStorage.setItem(consentKey, "accepted");
        }
        closeBanner();
      });
    }

    setTimeout(function () {
      cookieBanner.classList.add("is-visible");
    }, 60);
  }
})();
