(function () {
  var styleId = "lazy-sections-style";
  if (!document.getElementById(styleId)) {
    var style = document.createElement("style");
    style.id = styleId;
    style.textContent =
      ".lazy-section{opacity:0;transform:translateY(34px) scale(.985);filter:blur(8px);transition:opacity .7s cubic-bezier(.2,.9,.2,1),transform .7s cubic-bezier(.2,.9,.2,1),filter .7s ease}" +
      ".lazy-section.is-visible{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}";
    document.head.appendChild(style);
  }

  var sections = Array.from(document.querySelectorAll("main section"));
  if (!sections.length) return;

  sections.forEach(function (section, index) {
    if (index === 0) return;
    section.classList.add("lazy-section");
  });

  if (!("IntersectionObserver" in window)) {
    sections.forEach(function (section) {
      section.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -12% 0px" }
  );

  sections.forEach(function (section, index) {
    if (index === 0) {
      section.classList.add("is-visible");
      return;
    }
    observer.observe(section);
  });
})();
