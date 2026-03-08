(function () {
  var styleId = "contact-popup-style";
  if (!document.getElementById(styleId)) {
    var style = document.createElement("style");
    style.id = styleId;
    style.textContent =
      ".contact-pop-wrap{position:fixed;inset:0;z-index:10040;pointer-events:none}" +
      ".contact-pop-overlay{position:absolute;inset:0;background:rgba(10,10,20,.42);opacity:0;transition:opacity .22s ease}" +
      ".contact-pop-panel{position:absolute;left:50%;top:50%;transform:translate(-50%,-48%) scale(.98);width:min(700px,calc(100vw - 24px));max-height:calc(100vh - 28px);overflow:auto;background:linear-gradient(135deg,#5170ff,#ff66c4);border:1px solid rgba(255,255,255,.35);border-radius:16px;box-shadow:0 22px 44px rgba(0,0,0,.35);padding:20px;color:#fff;opacity:0;transition:opacity .22s ease,transform .22s ease}" +
      ".contact-pop-wrap.is-open{pointer-events:auto}" +
      ".contact-pop-wrap.is-open .contact-pop-overlay{opacity:1}" +
      ".contact-pop-wrap.is-open .contact-pop-panel{opacity:1;transform:translate(-50%,-50%) scale(1)}" +
      ".contact-pop-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}" +
      ".contact-pop-title{margin:0;font-size:20px;font-weight:900}" +
      ".contact-pop-close{border:none;background:rgba(255,255,255,.2);color:#fff;width:34px;height:34px;border-radius:999px;cursor:pointer;font-size:18px}" +
      ".contact-pop-form{display:grid;gap:10px}" +
      ".contact-pop-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}" +
      ".contact-pop-form input,.contact-pop-form textarea{width:100%;border:1px solid rgba(255,255,255,.35);background:#fff;color:#111;border-radius:11px;padding:11px 12px;font-size:14px;outline:none}" +
      ".contact-pop-form textarea{min-height:120px;resize:vertical}" +
      ".contact-pop-form button{border:none;cursor:pointer;height:48px;border-radius:999px;font-weight:900;color:#fff;background:linear-gradient(135deg,#3955ff,#ff4fae);border:2px solid rgba(255,255,255,.5)}" +
      ".contact-pop-note{margin:0;font-size:12px;opacity:.95}" +
      ".contact-pop-hp{display:none!important}" +
      "@media (max-width:640px){.contact-pop-grid{grid-template-columns:1fr}.contact-pop-panel{padding:16px}}";
    document.head.appendChild(style);
  }

  var wrapper = document.createElement("div");
  wrapper.className = "contact-pop-wrap";
  wrapper.innerHTML =
    '<div class="contact-pop-overlay" data-close-popup></div>' +
    '<div class="contact-pop-panel" role="dialog" aria-modal="true" aria-label="Contattami">' +
    '<div class="contact-pop-head"><h3 class="contact-pop-title">Contattami</h3><button class="contact-pop-close" type="button" aria-label="Chiudi" data-close-popup>&times;</button></div>' +
    '<form class="contact-pop-form" method="POST" action="/" data-netlify="true" netlify name="contact" netlify-honeypot="bot-field">' +
    '<input type="hidden" name="form-name" value="contact" />' +
    '<input type="hidden" name="_subject" value="Nuovo contatto dal portfolio" />' +
    '<p class="contact-pop-hp"><label>Non compilare <input name="bot-field" /></label></p>' +
    '<div class="contact-pop-grid">' +
    '<input type="text" name="name" placeholder="Nome e cognome" required />' +
    '<input type="email" name="email" placeholder="Email" required />' +
    "</div>" +
    '<input type="text" name="subject" placeholder="Oggetto" required />' +
    '<textarea name="message" placeholder="Scrivi qui il tuo messaggio..." required></textarea>' +
    '<button type="submit">Invia messaggio</button>' +
    '<p class="contact-pop-note" aria-live="polite">I tuoi dati saranno usati solo per risponderti.</p>' +
    "</form>" +
    "</div>";
  document.body.appendChild(wrapper);

  var panel = wrapper.querySelector(".contact-pop-panel");
  var form = wrapper.querySelector(".contact-pop-form");
  var note = wrapper.querySelector(".contact-pop-note");

  var closePopup = function () {
    wrapper.classList.remove("is-open");
  };

  wrapper.addEventListener("click", function (event) {
    if (event.target.hasAttribute("data-close-popup")) {
      closePopup();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePopup();
    }
  });

  var openPopup = function () {
    wrapper.classList.add("is-open");
  };

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest('a[href*="contattami/index.html"], a[href$="#contact-popup"], button[data-contact-popup]');
    if (!trigger) return;
    event.preventDefault();
    openPopup();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var submitButton = form.querySelector("button[type='submit']");
    var host = window.location.hostname || "";
    var isLocalHost =
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "0.0.0.0" ||
      host === "";

    if (isLocalHost) {
      note.textContent =
        "Su localhost l'invio email non e attivo. Prova dal sito pubblicato su Netlify.";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Invio in corso...";
    note.textContent = "Invio del messaggio in corso...";

    var payload = new URLSearchParams(new FormData(form)).toString();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload,
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Submit error");
        note.textContent = "Messaggio inviato correttamente.";
        submitButton.textContent = "Inviato";
        form.reset();
      })
      .catch(function () {
        note.textContent = "Su localhost il submit puo non essere disponibile. In deploy il form funziona.";
        submitButton.disabled = false;
        submitButton.textContent = "Invia messaggio";
      });
  });
})();
