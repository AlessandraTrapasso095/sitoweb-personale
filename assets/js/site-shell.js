(function () {
  var body = document.body;
  if (!body) return;

  var basePath = body.dataset.basePath || ".";
  var config = window.SITE_CONFIG || {};
  var socialLinks = config.socialLinks || {};
  var githubUrl = socialLinks.github || "https://github.com/AlessandraTrapasso095";
  var linkedinUrl = socialLinks.linkedin || "https://www.linkedin.com/in/alessandra-trapasso-72b798392/";
  var instagramUrl = socialLinks.instagram || "https://www.instagram.com/";

  function toPath(path) {
    return basePath === "." ? path : "../" + path;
  }

  var homeUrl = basePath === "." ? "index.html#hero" : "../index.html#hero";
  var whyUrl = basePath === "." ? "index.html#perche" : "../index.html#perche";
  var processUrl = basePath === "." ? "index.html#come-lavoro" : "../index.html#come-lavoro";
  var skillsUrl = basePath === "." ? "index.html#skills" : "../index.html#skills";
  var projectsUrl = basePath === "." ? "index.html#progetti" : "../index.html#progetti";
  var cvUrl = basePath === "." ? "index.html#curriculum" : "../index.html#curriculum";
  var contactUrl = basePath === "." ? "index.html#contatti" : "../index.html#contatti";
  var privacyUrl = basePath === "." ? "privacy/index.html" : "../privacy/index.html";
  var cookieUrl = basePath === "." ? "cookie/index.html" : "../cookie/index.html";

  var headerTarget = document.querySelector("[data-site-header]");
  if (headerTarget) {
    headerTarget.innerHTML =
      '<nav class="hero-nav" aria-label="Menu principale">' +
      '<a href="' + homeUrl + '" class="brand" aria-label="Vai alla Home">' +
      '<img src="' + toPath("assets/img/logo2.png") + '" alt="Logo Alessandra Trapasso" class="brand__logo" />' +
      "</a>" +
      '<div class="menu-bar">' +
      '<ul class="nav-menu">' +
      '<li><a href="' + whyUrl + '">Perche</a></li>' +
      '<li><a href="' + processUrl + '">Come lavoro</a></li>' +
      '<li><a href="' + skillsUrl + '">Skills</a></li>' +
      '<li><a href="' + projectsUrl + '">Progetti</a></li>' +
      '<li><a href="' + cvUrl + '">Curriculum</a></li>' +
      '<li><a href="' + contactUrl + '">Contatti</a></li>' +
      "</ul>" +
      '<ul class="social-links" aria-label="Social links">' +
      '<li><a href="' + githubUrl + '" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fa-brands fa-github"></i><span>GitHub</span></a></li>' +
      '<li><a href="' + linkedinUrl + '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i><span>LinkedIn</span></a></li>' +
      '<li><a href="' + instagramUrl + '" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i><span>Instagram</span></a></li>' +
      "</ul>" +
      "</div>" +
      "</nav>";
  }

  var footerTarget = document.querySelector("[data-site-footer]");
  if (footerTarget) {
    footerTarget.innerHTML =
      '<div class="site-footer__inner">' +
      '<div class="site-footer__card">' +
      '<h2 class="site-footer__title">Restiamo in contatto</h2>' +
      '<p class="site-footer__text">La landing principale contiene progetti, curriculum e form contatti. Per collaborazioni o opportunita puoi partire da li.</p>' +
      '<a class="site-footer__cta" href="' + contactUrl + '">Vai alla landing</a>' +
      '<ul class="site-footer__social" aria-label="Social links">' +
      '<li><a href="' + githubUrl + '" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fa-brands fa-github"></i></a></li>' +
      '<li><a href="' + linkedinUrl + '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a></li>' +
      '<li><a href="' + instagramUrl + '" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a></li>' +
      "</ul>" +
      '<div class="site-footer__legal" aria-label="Link legali">' +
      '<a class="site-footer__legal-link" href="' + privacyUrl + '">Privacy Policy</a>' +
      '<a class="site-footer__legal-link" href="' + cookieUrl + '">Cookie Policy</a>' +
      "</div>" +
      '<p class="site-footer__copy">&copy; 2026 Alessandra Trapasso</p>' +
      "</div>" +
      "</div>";
  }

  var consentKey = "at_cookie_notice_v1";
  var storageEnabled = false;

  try {
    var testKey = "__consent_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    storageEnabled = true;
  } catch (error) {
    storageEnabled = false;
  }

  if (!storageEnabled || window.localStorage.getItem(consentKey) === "accepted") {
    return;
  }

  var styleId = "site-cookie-banner-style";
  if (!document.getElementById(styleId)) {
    var style = document.createElement("style");
    style.id = styleId;
    style.textContent =
      ".cookie-banner{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);width:min(960px,calc(100vw - 20px));padding:14px 16px;border-radius:22px;background:linear-gradient(135deg,#4F5DFF,#7B5CFF,#FF5ECF);color:#fff;box-shadow:0 20px 40px rgba(17,24,89,.24);z-index:1200}" +
      ".cookie-banner__inner{display:flex;align-items:center;justify-content:space-between;gap:14px}" +
      ".cookie-banner__text{margin:0;max-width:720px;font-size:13px;line-height:1.55}" +
      ".cookie-banner__actions{display:flex;gap:10px;flex-wrap:wrap}" +
      ".cookie-banner__actions a,.cookie-banner__actions button{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:0 15px;border-radius:999px;font-size:12px;font-weight:800;text-decoration:none;border:none}" +
      ".cookie-banner__actions a{background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.18)}" +
      ".cookie-banner__actions button{background:#fff;color:#2E2A72;cursor:pointer}" +
      "@media (max-width:760px){.cookie-banner__inner{flex-direction:column;align-items:flex-start}}";
    document.head.appendChild(style);
  }

  var cookieBanner = document.createElement("section");
  cookieBanner.className = "cookie-banner";
  cookieBanner.setAttribute("role", "dialog");
  cookieBanner.setAttribute("aria-label", "Informativa cookie");
  cookieBanner.innerHTML =
    '<div class="cookie-banner__inner">' +
    '<p class="cookie-banner__text">Questo sito usa solo cookie tecnici e preferenze locali strettamente necessarie al funzionamento della landing e del banner.</p>' +
    '<div class="cookie-banner__actions">' +
    '<a href="' + cookieUrl + '">Cookie Policy</a>' +
    '<button type="button">Ho capito</button>' +
    "</div>" +
    "</div>";
  document.body.appendChild(cookieBanner);

  cookieBanner.querySelector("button").addEventListener("click", function () {
    window.localStorage.setItem(consentKey, "accepted");
    cookieBanner.remove();
  });
})();
