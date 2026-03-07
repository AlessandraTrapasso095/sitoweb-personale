(function () {
  var form = document.querySelector(".contact-form");
  if (!form) return;

  var submitButton = form.querySelector('button[type="submit"]');
  var note = form.querySelector(".contact-form__note");

  if (note) {
    note.setAttribute("aria-live", "polite");
  }

  form.addEventListener("submit", function () {
    if (!submitButton) return;
    submitButton.disabled = true;
    submitButton.textContent = "Invio in corso...";

    if (note) {
      note.textContent = "Invio del messaggio in corso...";
    }
  });
})();
