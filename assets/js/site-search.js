(function () {
  var styleId = "site-search-ui";
  if (!document.getElementById(styleId)) {
    var style = document.createElement("style");
    style.id = styleId;
    style.textContent =
      ".nav-search,.nav-drawer__search{position:relative}" +
      ".site-search-results{position:absolute;top:44px;left:0;right:0;list-style:none;margin:0;padding:8px;background:#fff;border:1px solid rgba(17,17,17,.12);border-radius:12px;box-shadow:0 16px 30px rgba(0,0,0,.14);z-index:10020;max-height:320px;overflow:auto}" +
      ".site-search-results li{margin:0}" +
      ".site-search-results a{display:block;padding:8px 10px;border-radius:8px;text-decoration:none;color:#111;font-size:13px;font-weight:600}" +
      ".site-search-results a:hover{background:rgba(81,112,255,.08)}" +
      ".site-search-empty{padding:8px 10px;font-size:13px;color:#666}";
    document.head.appendChild(style);
  }

  var body = document.body;
  if (!body) return;

  var basePath = body.dataset.basePath || ".";
  var homeUrl = basePath === "." ? "index.html" : "../index.html";
  var aboutUrl = basePath === "." ? "aboutme/index.html" : "../aboutme/index.html";
  var cvUrl = basePath === "." ? "cv/index.html" : "../cv/index.html";
  var contactUrl = basePath === "." ? "contattami/index.html" : "../contattami/index.html";

  var entries = [];

  var addEntry = function (label, keywords, url) {
    if (!label || !url) return;
    entries.push({
      label: label.trim(),
      keywords: (keywords || "").trim(),
      url: url,
    });
  };

  addEntry("Home", "home portfolio sviluppatrice web developer", homeUrl + "#home");
  addEntry("Chi Sono", "bio percorso studi lingue transizione web", aboutUrl);
  addEntry("Skills", "skills competenze tech stack", homeUrl + "#skills");
  addEntry("Progetti", "progetti portfolio github demo case study", homeUrl + "#progetti");
  addEntry("CV", "cv curriculum esperienza formazione certificazioni", cvUrl);
  addEntry("Contattami", "contatti modulo messaggio", contactUrl);

  var projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  projects.forEach(function (project) {
    addEntry(
      project.title,
      (project.description || "") + " " + (project.tags || []).join(" ") + " " + (project.status || ""),
      homeUrl + "#progetti"
    );
  });

  var getPageEntries = function (doc, pageUrl) {
    var pageEntries = [];
    var headingNodes = doc.querySelectorAll("h1, h2, h3");
    headingNodes.forEach(function (heading) {
      var label = (heading.textContent || "").trim();
      if (!label) return;
      var parent = heading.closest("section, article, div");
      var id = (parent && parent.id) || heading.id || "";
      var paragraph = parent ? parent.querySelector("p") : null;
      var keywords = paragraph ? paragraph.textContent : "";
      var url = id ? pageUrl + "#" + id : pageUrl;
      pageEntries.push({ label: label, keywords: keywords, url: url });
    });
    return pageEntries;
  };

  var pathToCurrent = window.location.pathname.replace(/\/+$/, "");
  var pages = [
    { path: homeUrl, url: homeUrl, key: "home" },
    { path: aboutUrl, url: aboutUrl, key: "about" },
    { path: cvUrl, url: cvUrl, key: "cv" },
    { path: contactUrl, url: contactUrl, key: "contact" },
  ];

  getPageEntries(document, window.location.pathname).forEach(function (entry) {
    addEntry(entry.label, entry.keywords, entry.url);
  });

  var fetchPageIndex = function (page) {
    var normalized = page.path.replace(/^\.\.\//, "/");
    if (pathToCurrent.endsWith(normalized)) return Promise.resolve();
    return fetch(page.path)
      .then(function (response) {
        if (!response.ok) return null;
        return response.text();
      })
      .then(function (html) {
        if (!html) return;
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        getPageEntries(doc, page.url).forEach(function (entry) {
          addEntry(entry.label, entry.keywords, entry.url);
        });
      })
      .catch(function () {});
  };

  Promise.all(pages.map(fetchPageIndex)).then(function () {
    var dedupeMap = new Map();
    entries.forEach(function (entry) {
      var key = (entry.label + "|" + entry.url).toLowerCase();
      if (!dedupeMap.has(key)) {
        dedupeMap.set(key, entry);
      }
    });
    entries = Array.from(dedupeMap.values());
  });

  var forms = document.querySelectorAll(".nav-search, .nav-drawer__search");
  forms.forEach(function (form) {
    var input = form.querySelector('input[type="search"]');
    if (!input) return;

    var list = document.createElement("ul");
    list.className = "site-search-results";
    list.hidden = true;
    form.appendChild(list);

    var searchEntries = function (query) {
      var normalized = query.trim().toLowerCase();
      if (!normalized) return [];
      return entries.filter(function (entry) {
        var haystack = (entry.label + " " + entry.keywords).toLowerCase();
        return haystack.indexOf(normalized) !== -1;
      });
    };

    var renderResults = function (items) {
      if (!items.length) {
        list.innerHTML = '<li class="site-search-empty">Nessun risultato</li>';
        list.hidden = false;
        return;
      }

      list.innerHTML = items
        .slice(0, 8)
        .map(function (item) {
          return '<li><a href="' + item.url + '">' + item.label + "</a></li>";
        })
        .join("");
      list.hidden = false;
    };

    input.addEventListener("input", function () {
      var query = input.value;
      if (!query.trim()) {
        list.hidden = true;
        return;
      }
      renderResults(searchEntries(query));
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var query = input.value;
      var matches = searchEntries(query);
      if (matches.length) {
        window.location.href = matches[0].url;
      }
    });

    form.addEventListener("focusout", function () {
      setTimeout(function () {
        list.hidden = true;
      }, 120);
    });

    form.addEventListener("focusin", function () {
      if (input.value.trim()) {
        input.dispatchEvent(new Event("input"));
      }
    });
  });
})();
