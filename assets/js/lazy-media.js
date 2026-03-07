(function () {
  var images = document.querySelectorAll("img");
  images.forEach(function (img, index) {
    if (img.classList.contains("hero-photo") || img.classList.contains("brand__logo") || index === 0) {
      if (!img.hasAttribute("loading")) img.setAttribute("loading", "eager");
      return;
    }

    if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
    if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
  });
})();
