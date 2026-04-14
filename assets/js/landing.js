(function () {
  var body = document.body;
  if (!body || !body.classList.contains("landing-page")) return;

  var storageKey = "at_portfolio_lang";
  var langToggle = document.querySelector("[data-lang-toggle]");
  var langFlag = document.querySelector("[data-lang-flag]");
  var langLabel = document.querySelector("[data-lang-label]");
  var i18nNodes = Array.from(
    document.querySelectorAll("[data-i18n], [data-i18n-html], [data-i18n-placeholder]")
  );
  var projectsGrid = document.getElementById("projects-grid");
  var form = document.querySelector(".contact-form");
  var note = form ? form.querySelector(".contact-form__note") : null;
  var skillsDev = document.getElementById("skills-dev");
  var skillsAi = document.getElementById("skills-ai");

  var translations = {
    it: {
      navWhy: "Perche scegliere me",
      navProcess: "Come lavoro",
      navSkills: "Skills",
      navProjects: "Progetti",
      navCv: "Curriculum",
      navContact: "Contatti",
      heroTitle: '<span class="line">Ciao! <span class="hero__wave">👋</span> Sono</span><span class="line">Alessandra</span>',
      heroTextLead:
        "<strong>Junior Full Stack Web Developer e AI Developer.</strong><br>Sviluppo interfacce moderne, responsive e orientate all'utente, curando struttura del codice, performance e qualita del dettaglio. Integro strumenti di intelligenza artificiale nel workflow per accelerare analisi, sviluppo e testing, mantenendo sempre il pieno controllo sul risultato finale.",
      heroTextStrong: "Se cerchi una figura junior motivata, scrivimi: rispondo volentieri.",
      heroPrimaryCta: "Contattami",
      whyTitle: 'Perche scegliere <span class="highlight">me?</span>',
      whyIntro:
        "Un approccio pratico, organizzato e orientato al risultato: sviluppo, AI applicata e attenzione costante alla qualita.",
      whyCardOneTitle: "Mentalita orientata alla soluzione",
      whyCardOneText:
        "Non solo codice: costruisco soluzioni utili e concrete. Ogni progetto parte dagli obiettivi richiesti e viene sviluppato con un approccio pratico e funzionale.",
      whyCardTwoTitle: "Autonomia e responsabilita",
      whyCardTwoText:
        "Gestisco il lavoro in modo organizzato e pragmatico, mi muovo seguendo un filo logico e tengo il focus su tempi, qualita e chiarezza operativa.",
      whyCardThreeTitle: "AI e agenti AI applicati",
      whyCardThreeText:
        "Uso l'AI come parte attiva del processo: analisi requisiti, supporto allo sviluppo, testing assistito, automazioni e quality check.",
      processOverline: "",
      processTitle: "Come Lavoro per Te",
      processIntro: "",
      processCardOneTitle: "Analisi",
      processCardOneText:
        "Ascolto obiettivi e requisiti, definisco priorita e user flow, e preparo un piano di lavoro chiaro.",
      processCardTwoTitle: "Progettazione e sviluppo",
      processCardTwoText:
        "Organizzo struttura e contenuti, progetto UX/UI coerente e scelgo stack e componenti adatti al progetto. Implemento frontend e logica applicativa con tecnologie moderne, integrazioni AI e codice mantenibile.",
      processCardThreeTitle: "Testing e rilascio",
      processCardThreeText:
        "Eseguo quality check, test cross-device e ottimizzazioni finali prima della pubblicazione.",
      skillsOverline: "Competenze",
      skillsTitle: "Skills",
      skillsIntro:
        "Competenze di sviluppo web e AI applicata al workflow.",
      skillsDevTitle: "Sviluppo",
      skillsAiTitle: "AI & AI Agents",
      skillsFigmaText:
        "Competenze di base su wireframe semplici, organizzazione layout e handoff essenziale.",
      projectsTitle: "I miei progetti",
      projectsIntro:
        "Una selezione di progetti sviluppati e migliorati nel tempo. Cliccando sull'immagine si apre la demo.",
      projectsMoreText: "Vai a tutti i miei repository su GitHub.",
      projectsMoreCta: "Tutti i repository",
      projectOpenDemo: "Apri demo",
      projectDemoCta: "Demo",
      projectGithubCta: "GitHub",
      cvOverline: "Curriculum Vitae",
      cvTitle: "Curriculum Vitae",
      cvIntro:
        "Una sintesi ordinata del mio profilo, delle aree su cui sto costruendo esperienza concreta e della direzione professionale che sto seguendo.",
      cvExperienceTitle: "Collaborazioni e Progetti Personali",
      cvExperienceItemOneTitle: "Progetti web personali",
      cvExperienceItemOneDate: "2024 - oggi",
      cvExperienceItemOneText:
        "Sviluppo di landing page, interfacce responsive e progetti portfolio-oriented con attenzione a struttura, performance e qualita visiva.",
      cvExperienceItemTwoTitle: "Frontend, UX e refactor",
      cvExperienceItemTwoDate: "2024 - oggi",
      cvExperienceItemTwoText:
        "Lavoro su architettura frontend, componenti riusabili e miglioramento dell'esperienza utente con un approccio pratico e ordinato.",
      cvExperienceItemThreeTitle: "AI nel workflow di sviluppo",
      cvExperienceItemThreeDate: "2025 - oggi",
      cvExperienceItemThreeText:
        "Uso strumenti AI per analisi requisiti, supporto allo sviluppo, testing assistito, automazioni e quality check del risultato finale.",
      cvEducationTitle: "Formazione",
      cvEducationLabelOne: "Academy Tech",
      cvEducationItemOneTitle: "Master in Full Stack Web Development & AI",
      cvEducationItemOneText:
        "Percorso intensivo orientato a frontend, logica applicativa, strumenti AI e costruzione di progetti concreti.",
      cvCertificationsLabel: "Certificazioni",
      cvCertificationOne: "AI Agent Developer",
      cvCertificationTwo: "IBM AI Engineering",
      cvCertificationThree: "Google Cybersecurity",
      cvLanguagesTitle: "Languages",
      cvLanguageOneName: "Italiano",
      cvLanguageOneLevel: "Madrelingua",
      cvLanguageTwoName: "Inglese",
      cvLanguageTwoLevel: "C2",
      cvLanguageThreeName: "Spagnolo",
      cvLanguageThreeLevel: "C1",
      cvCardOneTitle: "Profilo",
      cvCardOneText:
        "Junior Full Stack Web Developer in formazione. Focus su sviluppo web moderno, AI applicata al workflow e qualita del risultato finale.",
      cvCardTwoTitle: "Esperienza",
      cvCardTwoText:
        "Collaborazioni e progetti personali su frontend, refactor, UX, integrazione strumenti AI e miglioramento della manutenibilita.",
      cvCardThreeTitle: "Formazione",
      cvCardThreeText:
        "Percorso in Full Stack Web Development & AI, affiancato da studio continuo, pratica e costruzione di progetti reali.",
      cvCardFourTitle: "Lingue e certificazioni",
      cvCardFourText:
        "Italiano madrelingua, Inglese C2, Spagnolo C1. Certificazioni in ambito digitale, innovation e sviluppo.",
      contactOverline: "Restiamo in contatto",
      contactTitle: "Restiamo in contatto",
      contactIntro:
        "Se hai un progetto in mente o vuoi confrontarti su opportunità, scrivimi.",
      contactLocationLabel: "Disponibilita",
      contactLocationText: "Disponibile per opportunità lavorative, stage, tirocini, collaborazioni e progetti digitali.",
      contactDirectLabel: "Contatto",
      contactDirectText: "alessandratrapasso917@gmail.com",
      contactFollowLabel: "Seguimi anche qui",
      contactMiniOneText: "Opportunita junior, stage, collaborazioni e progetti web.",
      contactMiniTwoText: "Frontend moderno, AI nel workflow, quality check e attenzione UX.",
      contactFormTitle: "Scrivimi",
      formNameLabel: "Nome e cognome",
      formNamePlaceholder: "Es. Mario Rossi",
      formEmailLabel: "Email",
      formEmailPlaceholder: "Es. nome@dominio.com",
      formSubjectLabel: "Oggetto",
      formSubjectPlaceholder: "Es. Collaborazione / Info progetto",
      formMessageLabel: "Messaggio",
      formMessagePlaceholder: "Scrivi qui il tuo messaggio...",
      formConsent:
        'Acconsento al trattamento dei dati per essere ricontattato/a. Ho letto la <a href="privacy/index.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.',
      formSubmit: "Invia messaggio",
      formNote: "I tuoi dati saranno usati solo per risponderti.",
      formSending: "Invio in corso...",
      formSuccess: "Messaggio inviato correttamente.",
      closingOverline: "Chiusura",
      closingTitle: "Non vedo l'ora di aiutarti a dare vita ai tuoi sogni!",
      closingContactHtml:
        'Per qualsiasi domanda puoi contattarmi tramite il&nbsp;<a class="footer-inline-cta" href="#contact-form">form</a>.',
      closingText:
        "Per qualsiasi domanda puoi contattarmi tramite il form.",
      closingPrimary: "Vai al form",
      footerText:
        "© 2026 Alessandra Trapasso — Junior Web Developer",
      footerContactLink: "Vai al form contatti"
    },
    en: {
      navWhy: "Why me",
      navProcess: "How I work",
      navSkills: "Skills",
      navProjects: "Projects",
      navCv: "Resume",
      navContact: "Contact",
      heroTitle: "<span class=\"line\">Hi! <span class=\"hero__wave\">👋</span> I'm</span><span class=\"line\">Alessandra</span>",
      heroTextLead:
        "<strong>Junior Full Stack Web Developer and AI Developer.</strong><br>I build modern, responsive and user-oriented interfaces, with strong attention to code structure, performance and quality of detail. I integrate artificial intelligence tools into the workflow to speed up analysis, development and testing, while always keeping full control over the final result.",
      heroTextStrong: "If you are looking for a motivated junior profile, write to me: I will gladly reply.",
      heroPrimaryCta: "Contact me",
      whyTitle: 'Why choose <span class="highlight">me?</span>',
      whyIntro:
        "A practical, organized and result-oriented approach: development, applied AI and constant attention to quality.",
      whyCardOneTitle: "Solution-oriented mindset",
      whyCardOneText:
        "Not just code: I build useful and concrete solutions. Every project starts from the requested goals and is developed with a practical, functional approach.",
      whyCardTwoTitle: "Autonomy and responsibility",
      whyCardTwoText:
        "I manage work in an organized and pragmatic way, following a logical path and keeping the focus on timing, quality and operational clarity.",
      whyCardThreeTitle: "Applied AI and AI agents",
      whyCardThreeText:
        "I use AI as an active part of the process: requirement analysis, development support, assisted testing, automations and quality checks.",
      processOverline: "",
      processTitle: "How I Work for You",
      processIntro: "",
      processCardOneTitle: "Analysis",
      processCardOneText:
        "I listen to goals and requirements, define priorities and user flows, and prepare a clear working plan.",
      processCardTwoTitle: "Design and development",
      processCardTwoText:
        "I organize structure and content, design a coherent UX/UI, and choose the right stack and components for the project. I implement frontend and application logic with modern technologies, AI integrations and maintainable code.",
      processCardThreeTitle: "Testing and release",
      processCardThreeText:
        "I carry out quality checks, cross-device testing and final optimizations before publication.",
      skillsOverline: "Capabilities",
      skillsTitle: "Skills",
      skillsIntro:
        "Web development and AI skills applied to workflow.",
      skillsDevTitle: "Development",
      skillsAiTitle: "AI & AI Agents",
      skillsFigmaText:
        "Basic skills in simple wireframes, layout organization and essential handoff.",
      projectsTitle: "Selected projects",
      projectsIntro:
        "A curated selection of projects developed and refined over time. Clicking the image opens the demo.",
      projectsMoreText: "Browse all my repositories on GitHub.",
      projectsMoreCta: "All repositories",
      projectOpenDemo: "Open demo",
      projectDemoCta: "Demo",
      projectGithubCta: "GitHub",
      cvOverline: "Resume",
      cvTitle: "Curriculum Vitae",
      cvIntro:
        "An ordered summary of my profile, the areas where I am building practical experience and the professional direction I am following.",
      cvExperienceTitle: "Collaborations and Personal Projects",
      cvExperienceItemOneTitle: "Personal web projects",
      cvExperienceItemOneDate: "2024 - present",
      cvExperienceItemOneText:
        "Development of landing pages, responsive interfaces and portfolio-oriented projects with attention to structure, performance and visual quality.",
      cvExperienceItemTwoTitle: "Frontend, UX and refactoring",
      cvExperienceItemTwoDate: "2024 - present",
      cvExperienceItemTwoText:
        "I work on frontend architecture, reusable components and user experience improvements with a practical and organized approach.",
      cvExperienceItemThreeTitle: "AI in the development workflow",
      cvExperienceItemThreeDate: "2025 - present",
      cvExperienceItemThreeText:
        "I use AI tools for requirement analysis, development support, assisted testing, automation and quality checks on the final result.",
      cvEducationTitle: "Education",
      cvEducationLabelOne: "Academy Tech",
      cvEducationItemOneTitle: "Master in Full Stack Web Development & AI",
      cvEducationItemOneText:
        "An intensive path focused on frontend, application logic, AI tools and building concrete projects.",
      cvCertificationsLabel: "Certifications",
      cvCertificationOne: "AI Agent Developer",
      cvCertificationTwo: "IBM AI Engineering",
      cvCertificationThree: "Google Cybersecurity",
      cvLanguagesTitle: "Languages",
      cvLanguageOneName: "Italian",
      cvLanguageOneLevel: "Native",
      cvLanguageTwoName: "English",
      cvLanguageTwoLevel: "C2",
      cvLanguageThreeName: "Spanish",
      cvLanguageThreeLevel: "C1",
      cvCardOneTitle: "Profile",
      cvCardOneText:
        "Junior Full Stack Web Developer in training. Focused on modern web development, AI-powered workflows and the quality of the final result.",
      cvCardTwoTitle: "Experience",
      cvCardTwoText:
        "Personal projects and collaborations across frontend work, refactoring, UX, AI tool integration and maintainability improvements.",
      cvCardThreeTitle: "Education",
      cvCardThreeText:
        "Training path in Full Stack Web Development & AI, supported by continuous study, hands-on practice and real projects.",
      cvCardFourTitle: "Languages and certifications",
      cvCardFourText:
        "Native Italian, English C2, Spanish C1. Certifications in digital topics, innovation and development.",
      contactOverline: "Let's stay in touch",
      contactTitle: "Let's stay in touch",
      contactIntro:
        "If you have a project in mind or want to talk about opportunities, write to me.",
      contactLocationLabel: "Availability",
      contactLocationText: "Available for junior opportunities, collaborations and digital projects.",
      contactDirectLabel: "Contact",
      contactDirectText: "alessandratrapasso917@gmail.com",
      contactFollowLabel: "Follow the craft",
      contactMiniOneText: "Junior opportunities, internships, collaborations and web projects.",
      contactMiniTwoText: "Modern frontend, AI in the workflow, quality checks and UX attention.",
      contactFormTitle: "Write to me",
      formNameLabel: "Full name",
      formNamePlaceholder: "E.g. Mario Rossi",
      formEmailLabel: "Email",
      formEmailPlaceholder: "E.g. name@domain.com",
      formSubjectLabel: "Subject",
      formSubjectPlaceholder: "E.g. Collaboration / Project info",
      formMessageLabel: "Message",
      formMessagePlaceholder: "Write your message here...",
      formConsent:
        'I consent to the processing of my data so I can be contacted back. I have read the <a href="privacy/index.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.',
      formSubmit: "Send message",
      formNote: "Your data will only be used to reply to you.",
      formSending: "Sending...",
      formSuccess: "Message sent successfully.",
      closingOverline: "Closing",
      closingTitle: "I can't wait to help you bring your dreams to life!",
      closingContactHtml:
        'For any question, you can contact me through the&nbsp;<a class="footer-inline-cta" href="#contact-form">form</a>.',
      closingText:
        "For any question, you can contact me through the form.",
      closingPrimary: "Go to form",
      footerText:
        "© 2026 Alessandra Trapasso — Junior Web Developer",
      footerContactLink: "Go to contact form"
    }
  };

  var skillCards = {
    dev: [
      {
        title: "JavaScript",
        icon: "JS",
        tone: "blue",
        it: "Logiche interattive, DOM, fetch e componenti dinamici per interfacce responsive.",
        en: "Interactive logic, DOM, fetch and dynamic components for responsive interfaces."
      },
      {
        title: "TypeScript",
        icon: "TS",
        tone: "mint",
        it: "Tipizzazione, componenti piu affidabili e codice piu leggibile su progetti scalabili.",
        en: "Typing, more reliable components and more readable code on scalable projects."
      },
      {
        title: "Angular",
        icon: "NG",
        tone: "blue",
        it: "Ambienti frontend strutturati con routing, servizi e organizzazione solida del progetto.",
        en: "Structured frontend environments with routing, services and a solid project architecture."
      },
      {
        title: "Python",
        icon: "PY",
        tone: "dark",
        it: "Script di supporto, automazioni e logiche utili per task tecnici e flussi di sviluppo.",
        en: "Support scripts, automation and useful logic for technical tasks and development workflows."
      },
      {
        title: "Node.js",
        icon: "ND",
        tone: "pink",
        it: "Tooling, processi di build e gestione di ambienti JavaScript moderni e veloci.",
        en: "Tooling, build processes and modern, fast JavaScript environment handling."
      },
      {
        title: "Java",
        icon: "JV",
        tone: "mint",
        it: "Fondamenti OOP, strutture dati e approccio affidabile alla logica applicativa.",
        en: "OOP foundations, data structures and a reliable approach to application logic."
      },
      {
        title: "React",
        icon: "RE",
        tone: "green",
        it: "Componenti riusabili, gestione dello stato e interfacce modulari orientate alla UX.",
        en: "Reusable components, state management and modular interfaces focused on UX."
      },
      {
        title: "Vue.js",
        icon: "VU",
        tone: "blue",
        it: "Componenti riusabili e sviluppo di interfacce moderne con approccio modulare.",
        en: "Reusable components and modern interface development with a modular approach."
      },
      {
        title: "PHP & MySQL",
        icon: "DB",
        tone: "dark",
        it: "Logiche backend, gestione dati e persistenza per funzionalita web strutturate.",
        en: "Backend logic, data handling and persistence for structured web features."
      },
      {
        title: "WordPress",
        icon: "WP",
        tone: "mint",
        it: "Gestione contenuti, personalizzazione layout e operativita su siti professionali.",
        en: "Content management, layout customization and day-to-day work on professional websites."
      }
    ],
    ai: [
      {
        title: "AI Agents",
        icon: "AI",
        variant: "hero",
        ghost: "AI",
        it: "Uso operativo di agenti AI per accelerare task ripetitivi, supporto tecnico e flussi di lavoro.",
        en: "Operational use of AI agents to speed up repetitive tasks, technical support and workflow execution."
      },
      {
        title: "AI per lo sviluppo",
        icon: "DEV",
        variant: "feature",
        it: "Supporto a refactor, prototipazione, debug guidato e miglioramento della produttivita.",
        en: "Support for refactoring, prototyping, guided debugging and productivity improvements."
      },
      {
        title: "AI e Prompt Engineering",
        icon: "PE",
        variant: "medium",
        it: "Prompt strutturati per ottenere output utili, coerenti e verificabili.",
        en: "Structured prompts designed to produce useful, coherent and verifiable output."
      },
      {
        title: "Codex",
        icon: "CX",
        variant: "medium",
        it: "Uso pratico per analisi codice, implementazione e iterazione veloce su task reali.",
        en: "Hands-on use for code analysis, implementation and fast iteration on real tasks."
      },
      {
        title: "Wix e Lovable",
        icon: "WL",
        variant: "medium",
        it: "Supporto alla prototipazione rapida e validazione visiva di interfacce e flussi.",
        en: "Support for rapid prototyping and visual validation of interfaces and flows."
      },
      {
        title: "Manus",
        icon: "MN",
        variant: "small",
        it: "Supporto operativo per task multi-step, ricerca guidata e organizzazione del lavoro.",
        en: "Operational support for multi-step tasks, guided research and work organization."
      },
      {
        title: "N8N",
        icon: "N8",
        variant: "small",
        it: "Workflow automation per collegare strumenti, passaggi ripetitivi e processi digitali.",
        en: "Workflow automation to connect tools, repetitive steps and digital processes."
      },
      {
        title: "Automazioni con AI",
        icon: "AU",
        variant: "small",
        it: "Automazione di passaggi ripetitivi per alleggerire il flusso di lavoro.",
        en: "Automation of repetitive steps to streamline the workflow."
      },
      {
        title: "Testing assistito",
        icon: "TS",
        variant: "small",
        it: "Uso dell'AI per verifiche rapide, casi limite e controlli sul comportamento UI.",
        en: "Using AI for quick checks, edge cases and UI behavior validation."
      },
      {
        title: "Analisi requisiti",
        icon: "AR",
        variant: "small",
        it: "Sintesi e organizzazione dei requisiti per partire con una direzione piu chiara.",
        en: "Requirement synthesis and organization to start with a clearer direction."
      },
      {
        title: "Quality check",
        icon: "QC",
        variant: "small",
        it: "Controlli continui su chiarezza, coerenza e qualita percepita del risultato finale.",
        en: "Continuous checks on clarity, consistency and perceived quality of the final result."
      }
    ]
  };

  var currentLang = "it";

  try {
    var savedLang = window.localStorage.getItem(storageKey);
    if (savedLang && translations[savedLang]) {
      currentLang = savedLang;
    }
  } catch (error) {
    currentLang = "it";
  }

  function renderSkills() {
    var dictKey = currentLang === "en" ? "en" : "it";

    if (skillsDev) {
      skillsDev.innerHTML = skillCards.dev
        .map(function (skill) {
          return (
            '<article class="dev-skill-card' +
            (skill.bordered ? " dev-skill-card--bordered" : "") +
            '">' +
            '<div class="dev-skill-card__top">' +
            '<span class="dev-skill-card__icon dev-skill-card__icon--' +
            skill.tone +
            '">' +
            skill.icon +
            "</span>" +
            "</div>" +
            '<h4 class="dev-skill-card__title">' +
            skill.title +
            "</h4>" +
            '<p class="dev-skill-card__text">' +
            skill[dictKey] +
            "</p>" +
            "</article>"
          );
        })
        .join("");
    }

    if (skillsAi) {
      skillsAi.innerHTML = skillCards.ai
        .map(function (skill) {
          return (
            '<article class="ai-skill-card ai-skill-card--' +
            skill.variant +
            '">' +
            '<span class="ai-skill-card__icon">' +
            skill.icon +
            "</span>" +
            '<h4 class="ai-skill-card__title">' +
            skill.title +
            "</h4>" +
            (skill[dictKey]
              ? '<p class="ai-skill-card__text">' + skill[dictKey] + "</p>"
              : "") +
            (skill.ghost ? '<span class="ai-skill-card__ghost">' + skill.ghost + "</span>" : "") +
            "</article>"
          );
        })
        .join("");
    }
  }

  function svgDataUri(project) {
    var title = project.title.replace(/&/g, "&amp;");
    var tagOne = (project.tags[0] || "").replace(/&/g, "&amp;");
    var tagTwo = (project.tags[1] || "").replace(/&/g, "&amp;");
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720">' +
      "<defs>" +
      '<linearGradient id="g" x1="0" x2="1" y1="0" y2="1">' +
      '<stop offset="0%" stop-color="' +
      project.coverStart +
      '"/>' +
      '<stop offset="100%" stop-color="' +
      project.coverEnd +
      '"/>' +
      "</linearGradient>" +
      "</defs>" +
      '<rect width="1200" height="720" rx="56" fill="url(#g)"/>' +
      '<rect x="74" y="82" width="1052" height="556" rx="38" fill="rgba(255,255,255,0.14)"/>' +
      '<rect x="124" y="136" width="952" height="70" rx="22" fill="rgba(255,255,255,0.86)"/>' +
      '<circle cx="172" cy="171" r="14" fill="' +
      project.coverStart +
      '"/>' +
      '<circle cx="214" cy="171" r="14" fill="' +
      project.coverEnd +
      '"/>' +
      '<circle cx="256" cy="171" r="14" fill="#C6FF9E"/>' +
      '<rect x="124" y="252" width="396" height="252" rx="28" fill="rgba(255,255,255,0.18)"/>' +
      '<rect x="558" y="252" width="518" height="42" rx="18" fill="rgba(255,255,255,0.9)"/>' +
      '<rect x="558" y="320" width="432" height="24" rx="12" fill="rgba(255,255,255,0.72)"/>' +
      '<rect x="558" y="362" width="478" height="24" rx="12" fill="rgba(255,255,255,0.48)"/>' +
      '<rect x="558" y="428" width="148" height="54" rx="20" fill="rgba(255,255,255,0.86)"/>' +
      '<rect x="724" y="428" width="152" height="54" rx="20" fill="rgba(255,255,255,0.3)"/>' +
      '<text x="124" y="594" fill="rgba(255,255,255,0.92)" font-size="88" font-family="Arial, sans-serif" font-weight="700">' +
      title +
      "</text>" +
      '<text x="124" y="648" fill="rgba(255,255,255,0.84)" font-size="36" font-family="Arial, sans-serif" font-weight="700">' +
      tagOne +
      "  •  " +
      tagTwo +
      "</text>" +
      "</svg>";

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  var revealObserver;

  function observeReveals(nodes) {
    if (!("IntersectionObserver" in window)) {
      Array.from(nodes || []).forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
    }

    Array.from(nodes || []).forEach(function (node, index) {
      node.style.transitionDelay = Math.min(index * 0.05, 0.25) + "s";
      revealObserver.observe(node);
    });
  }

  function renderProjects() {
    if (!projectsGrid || !Array.isArray(window.PORTFOLIO_PROJECTS)) return;

    var dict = translations[currentLang];
    projectsGrid.innerHTML = window.PORTFOLIO_PROJECTS.map(function (project) {
      var description = currentLang === "en" ? project.descriptionEn : project.description;
      var status = currentLang === "en" ? project.statusEn : project.status;
      var mediaOpen = project.demoUrl
        ? '<a class="project-card__media" href="' +
          project.demoUrl +
          '" target="_blank" rel="noopener noreferrer" aria-label="' +
          dict.projectOpenDemo +
          " " +
          project.title +
          '">'
        : '<div class="project-card__media project-card__media--static">';
      var mediaClose = project.demoUrl ? "</a>" : "</div>";
      var demoAction = project.demoUrl
        ? '<a class="project-action" href="' +
          project.demoUrl +
          '" target="_blank" rel="noopener noreferrer">' +
          dict.projectDemoCta +
          "</a>"
        : '<span class="project-action project-action--disabled" aria-disabled="true">' +
          dict.projectDemoCta +
          "</span>";

      return (
        '<article class="project-card reveal">' +
        mediaOpen +
        '<img src="' +
        project.imageSrc +
        '" alt="' +
        (project.imageAlt || project.title) +
        '" loading="lazy" />' +
        mediaClose +
        '<div class="project-card__body">' +
        '<p class="project-card__meta">' +
        status +
        "</p>" +
        '<h3 class="project-card__title">' +
        project.title +
        '<span class="project-card__byline">' +
        project.byline +
        "</span>" +
        "</h3>" +
        '<p class="project-card__text">' +
        description +
        "</p>" +
        '<div class="project-tags">' +
        project.tags
          .map(function (tag) {
            return '<span class="project-tag">' + tag + "</span>";
          })
          .join("") +
        "</div>" +
        '<div class="project-actions">' +
        demoAction +
        '<a class="project-action" href="' +
        project.githubUrl +
        '" target="_blank" rel="noopener noreferrer">' +
        dict.projectGithubCta +
        "</a>" +
        "</div>" +
        "</div>" +
        "</article>"
      );
    }).join("");

    observeReveals(projectsGrid.querySelectorAll(".reveal"));
  }

  function applyTranslations() {
    var dict = translations[currentLang];
    if (!dict) return;

    document.documentElement.lang = currentLang === "it" ? "it" : "en";

    i18nNodes.forEach(function (node) {
      var textKey = node.getAttribute("data-i18n");
      var htmlKey = node.getAttribute("data-i18n-html");
      var placeholderKey = node.getAttribute("data-i18n-placeholder");

      if (textKey && dict[textKey]) {
        node.textContent = dict[textKey];
      }

      if (htmlKey && dict[htmlKey]) {
        node.innerHTML = dict[htmlKey];
      }

      if (placeholderKey && dict[placeholderKey]) {
        node.setAttribute("placeholder", dict[placeholderKey]);
      }
    });

    if (langToggle) {
      var isItalian = currentLang === "it";
      langToggle.setAttribute("aria-pressed", isItalian ? "false" : "true");
      langToggle.setAttribute("aria-label", isItalian ? "Passa a English" : "Switch to Italian");
    }

    if (langFlag) {
      langFlag.textContent = currentLang === "it" ? "🇮🇹" : "🇬🇧";
    }

    if (langLabel) {
      langLabel.textContent = currentLang === "it" ? "ITALIAN" : "ENGLISH";
    }

    if (note) {
      note.textContent = dict.formNote;
    }
  }

  function showSuccessToast() {
    var dict = translations[currentLang];
    var toast = document.createElement("div");
    toast.textContent = dict.formSuccess;
    toast.style.cssText =
      "position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:2000;" +
      "background:linear-gradient(135deg,#4F5DFF,#FF5ECF);color:#fff;padding:12px 18px;" +
      "border-radius:999px;box-shadow:0 16px 32px rgba(15,20,78,.24);font-weight:800;font-size:13px;";
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.remove();
    }, 3200);
  }

  function setupForm() {
    if (!form) return;

    var submitButton = form.querySelector(".btn-submit");
    var query = new URLSearchParams(window.location.search);

    if (query.get("contact") === "sent") {
      showSuccessToast();
      query.delete("contact");
      var cleanUrl =
        window.location.pathname +
        (query.toString() ? "?" + query.toString() : "") +
        window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    form.addEventListener("submit", function () {
      if (!submitButton) return;
      submitButton.disabled = true;
      submitButton.textContent = translations[currentLang].formSending;
      if (note) {
        note.textContent = translations[currentLang].formSending;
      }
    });
  }

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var nextLang = currentLang === "it" ? "en" : "it";
      currentLang = nextLang;
      try {
        window.localStorage.setItem(storageKey, currentLang);
      } catch (error) {
        currentLang = nextLang;
      }
      applyTranslations();
      renderSkills();
      renderProjects();
    });
  }

  applyTranslations();
  renderSkills();
  renderProjects();
  setupForm();
  observeReveals(document.querySelectorAll(".reveal"));
})();
