(function () {
  var styleId = "site-search-ui";
  if (!document.getElementById(styleId)) {
    var style = document.createElement("style");
    style.id = styleId;
    style.textContent =
      ".nav-search,.nav-drawer__search{position:relative}" +
      ".site-search-results{position:absolute;top:44px;left:0;right:0;list-style:none;margin:0;padding:8px;background:#fff;border:1px solid rgba(17,17,17,.12);border-radius:12px;box-shadow:0 16px 30px rgba(0,0,0,.14);z-index:10020;max-height:320px;overflow:auto}" +
      ".site-search-results li{margin:0}" +
      ".site-search-results a{display:block;padding:8px 10px;border-radius:8px;text-decoration:none;color:#111;font-size:13px;font-weight:700}" +
      ".site-search-results a:hover{background:rgba(81,112,255,.08)}" +
      ".site-search-empty{padding:8px 10px;font-size:13px;color:#666}" +
      ".site-search-hit{outline:3px solid rgba(255,102,196,.55);outline-offset:4px;transition:outline .2s ease}";
    document.head.appendChild(style);
  }

  var body = document.body;
  if (!body) return;

  var basePath = body.dataset.basePath || ".";
  var homeUrl = basePath === "." ? "index.html" : "../index.html";
  var aboutUrl = basePath === "." ? "aboutme/index.html" : "../aboutme/index.html";
  var cvUrl = basePath === "." ? "cv/index.html" : "../cv/index.html";
  var contactUrl = basePath === "." ? "contattami/index.html" : "../contattami/index.html";

  var normalize = function (text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  var entries = [];
  var addEntry = function (label, keywords, url) {
    if (!label || !url) return;
    entries.push({
      label: String(label).trim(),
      keywords: String(keywords || "").trim(),
      url: String(url),
      haystack: normalize(label + " " + (keywords || "")),
    });
  };

  addEntry("Home", "portfolio web developer presentazione", homeUrl + "#home");
  addEntry("Chi Sono", "bio percorso professionale", aboutUrl);
  addEntry("Skills", "competenze javascript java typescript react angular vue python php mysql node wordpress ai", homeUrl + "#skills");
  addEntry("Progetti", "sunnee urban ideas book finder tic tac toe github demo", homeUrl + "#progetti");
  addEntry("CV", "curriculum esperienza formazione certificazioni lingue", cvUrl);
  addEntry("Contattami", "contatti messaggio form popup", contactUrl);

  var projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  projects.forEach(function (project) {
    addEntry(
      project.title,
      (project.description || "") + " " + (project.tags || []).join(" ") + " " + (project.status || ""),
      homeUrl + "#progetti"
    );
  });

  var sections = document.querySelectorAll("section[id], h1, h2, h3");
  sections.forEach(function (node) {
    var label = (node.textContent || "").trim();
    if (!label) return;
    var section = node.closest("section") || node;
    var sectionId = section.id || "";
    var text = section.textContent || "";
    var url = sectionId ? window.location.pathname + "#" + sectionId : window.location.pathname;
    addEntry(label, text.slice(0, 280), url);
  });

  var slugify = function (text) {
    return normalize(text).replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  };

  var pageSections = Array.from(document.querySelectorAll("main section, main article, main .u-card"));
  var localTargets = [];

  pageSections.forEach(function (node, index) {
    if (!node.id) {
      var heading = node.querySelector("h1, h2, h3");
      var labelFromHeading = heading ? heading.textContent : node.getAttribute("aria-label");
      var generatedId = slugify(labelFromHeading || "sezione-" + (index + 1));
      if (generatedId) node.id = generatedId;
    }
    if (node.id) {
      localTargets.push({
        id: node.id,
        label: (node.querySelector("h1, h2, h3") || {}).textContent || node.getAttribute("aria-label") || node.id,
        text: normalize(node.textContent || ""),
        node: node,
        url: window.location.pathname + "#" + node.id,
      });
    }
  });

  var clearHighlights = function () {
    pageSections.forEach(function (node) {
      node.classList.remove("site-search-hit");
    });
  };

  var findLocalTarget = function (query) {
    var q = normalize(query);
    if (!q) return null;
    var terms = q.split(" ").filter(Boolean);
    var scored = localTargets
      .map(function (target) {
        var score = 0;
        if (target.text.indexOf(q) !== -1) score += 10;
        terms.forEach(function (term) {
          if (target.text.indexOf(term) !== -1) score += 2;
          if (normalize(target.label).indexOf(term) !== -1) score += 3;
        });
        return { target: target, score: score };
      })
      .filter(function (item) {
        return item.score > 0;
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });
    return scored.length ? scored[0].target : null;
  };

  var goToLocalTarget = function (target) {
    if (!target || !target.node) return false;
    clearHighlights();
    window.location.hash = target.id;
    target.node.classList.add("site-search-hit");
    target.node.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(function () {
      target.node.classList.remove("site-search-hit");
    }, 2200);
    return true;
  };

  var dedupe = new Map();
  entries.forEach(function (entry) {
    var key = normalize(entry.label + "|" + entry.url);
    if (!dedupe.has(key)) dedupe.set(key, entry);
  });
  entries = Array.from(dedupe.values());

  var searchEntries = function (query) {
    var q = normalize(query);
    if (!q) return [];
    var terms = q.split(" ").filter(Boolean);

    return entries
      .map(function (entry) {
        var score = 0;
        if (entry.haystack.indexOf(q) !== -1) score += 8;
        terms.forEach(function (term) {
          if (entry.haystack.indexOf(term) !== -1) score += 2;
          if (normalize(entry.label).indexOf(term) === 0) score += 3;
        });
        return { entry: entry, score: score };
      })
      .filter(function (item) {
        return item.score > 0;
      })
      .sort(function (a, b) {
        return b.score - a.score;
      })
      .map(function (item) {
        return item.entry;
      });
  };

  var bindSearchForm = function (form) {
    if (!form || form.dataset.searchReady === "1") return;
    form.dataset.searchReady = "1";

    var input = form.querySelector('input[type="search"]');
    if (!input) return;

    var list = document.createElement("ul");
    list.className = "site-search-results";
    list.hidden = true;
    form.appendChild(list);

    var hideList = function () {
      list.hidden = true;
    };

    var render = function (matches) {
      if (!matches.length) {
        var localTarget = findLocalTarget(input.value || "");
        var hint = localTarget
          ? '<li><a href="' +
            localTarget.url +
            '" data-local-search="1" data-local-id="' +
            localTarget.id +
            '">Vai a: ' +
            localTarget.label +
            "</a></li>"
          : '<li class="site-search-empty">Nessun risultato</li>';
        list.innerHTML = hint;
        list.hidden = false;
        return;
      }
      list.innerHTML = matches
        .slice(0, 8)
        .map(function (item) {
          return '<li><a href="' + item.url + '">' + item.label + "</a></li>";
        })
        .join("");
      list.hidden = false;
    };

    list.addEventListener("mousedown", function (event) {
      if (event.target.closest("a")) {
        // evita che il blur dell'input nasconda la lista prima del click
        event.preventDefault();
      }
    });

    list.addEventListener("click", function (event) {
      var anchor = event.target.closest("a");
      if (!anchor) return;
      event.preventDefault();

      var local = anchor.getAttribute("data-local-search") === "1";
      if (local) {
        var localId = anchor.getAttribute("data-local-id");
        var target = localTargets.find(function (item) {
          return item.id === localId;
        });
        goToLocalTarget(target || findLocalTarget(input.value || ""));
        hideList();
        return;
      }

      var href = anchor.getAttribute("href");
      if (href) {
        window.location.href = href;
      }
      hideList();
    });

    input.addEventListener("input", function () {
      var value = input.value || "";
      if (!value.trim()) {
        hideList();
        return;
      }
      render(searchEntries(value));
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var matches = searchEntries(input.value || "");
      if (matches.length) {
        window.location.href = matches[0].url;
      } else {
        var target = findLocalTarget(input.value || "");
        if (!goToLocalTarget(target)) {
          render([]);
        }
      }
    });

    document.addEventListener("click", function (event) {
      if (!form.contains(event.target)) {
        hideList();
      }
    });
  };

  var bindAllForms = function () {
    document.querySelectorAll(".nav-search, .nav-drawer__search").forEach(bindSearchForm);
  };

  bindAllForms();

  var observer = new MutationObserver(function () {
    bindAllForms();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
