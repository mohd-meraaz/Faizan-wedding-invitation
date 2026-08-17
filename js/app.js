/* Royal Elegance — Wedding Invitation Logic (Nikah Redesign with Urdu Translation) */
(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const C = window.CONFIG;
  let activeSlideIndex = 0;

  // Safe storage helper to prevent crashes under file:// protocol or inside private/sandboxed iframe windows
  const safeStorage = {
    _data: {},
    getItem(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        return this._data[key] || null;
      }
    },
    setItem(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
        this._data[key] = String(value);
      }
    }
  };

  // Safe helper to set text content of an element if it exists in the DOM
  function safeText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  /* ---------- Dynamic List Populators ---------- */
  function populateEvents(lang) {
    const list = document.getElementById("eventsList");
    if (!list) return;
    list.innerHTML = "";

    // Event 1: Baraat & Nikah
    const ev1 = C.DATA.events.baraatNikah;
    const card1 = document.createElement("article");
    card1.className = "event-card";
    card1.innerHTML = `
      <svg class="lattice" viewBox="0 0 42 14" aria-hidden="true" style="position: absolute; top: 0.75rem; left: 50%; transform: translateX(-50%); width: 42px; height: 14px; opacity: 0.55; color: var(--gold);">
        <path fill="none" stroke="currentColor" stroke-width="1" d="M1 13 V7 M7 13 V4 M13 13 V7 M21 13 V2 M29 13 V7 M35 13 V4 M41 13 V7" />
      </svg>
      <div class="event-card__inner">
        <div class="event-card__icon" aria-hidden="true">${iconSvg("crescent")}</div>
        <div>
          <h3>${escapeHtml(ev1.name[lang])}</h3>
          <p class="event-card__meta">${escapeHtml(ev1.date[lang])} · ${escapeHtml(ev1.time[lang])}</p>
          <p class="event-card__venue">${escapeHtml(ev1.venue[lang])}</p>
          <p class="event-card__desc">${escapeHtml(ev1.desc[lang])}</p>
        </div>
      </div>`;
    list.appendChild(card1);

    // Event 2: Dawat-e-Ta'am
    const ev2 = C.DATA.events.dawateTaam;
    const card2 = document.createElement("article");
    card2.className = "event-card";
    card2.innerHTML = `
      <svg class="lattice" viewBox="0 0 42 14" aria-hidden="true" style="position: absolute; top: 0.75rem; left: 50%; transform: translateX(-50%); width: 42px; height: 14px; opacity: 0.55; color: var(--gold);">
        <path fill="none" stroke="currentColor" stroke-width="1" d="M1 13 V7 M7 13 V4 M13 13 V7 M21 13 V2 M29 13 V7 M35 13 V4 M41 13 V7" />
      </svg>
      <div class="event-card__inner">
        <div class="event-card__icon" aria-hidden="true">${iconSvg("banquet")}</div>
        <div>
          <h3>${escapeHtml(ev2.name[lang])}</h3>
          <p class="event-card__meta">${escapeHtml(ev2.date[lang])} · ${escapeHtml(ev2.time[lang])}</p>
          <p class="event-card__venue" style="margin-bottom: 0.2rem; font-weight: 500;">${escapeHtml(ev2.gentsVenue[lang])}</p>
          <p class="event-card__venue" style="font-weight: 500;">${escapeHtml(ev2.ladiesVenue[lang])}</p>
          <p class="event-card__desc">${escapeHtml(ev2.desc[lang])}</p>
        </div>
      </div>`;
    list.appendChild(card2);
  }

  function populateSarparast(lang) {
    const list = document.getElementById("sarparastList");
    if (!list) return;
    list.innerHTML = "";
    C.DATA.sarparastHazrat.names[lang].forEach((name) => {
      const p = document.createElement("p");
      p.textContent = name;
      list.appendChild(p);
    });
  }

  function populateGuests(lang) {
    const g1 = document.getElementById("guestsGroup1");
    const g2 = document.getElementById("guestsGroup2");
    if (!g1 || !g2) return;
    g1.innerHTML = "";
    g2.innerHTML = "";

    C.DATA.guestNames.group1[lang].forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      g1.appendChild(li);
    });

    C.DATA.guestNames.group2[lang].forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      g2.appendChild(li);
    });
  }

  function updateCarouselCaption(lang) {
    const captionEl = document.getElementById("carouselCaption");
    if (captionEl && C.story[activeSlideIndex]) {
      captionEl.textContent = C.story[activeSlideIndex].caption[lang];
    }
  }

  /* ---------- Unified Translation Function ---------- */
  function translateAll(lang) {
    const H = C.DATA.headings;
    const G = C.DATA.groom;
    const B = C.DATA.bride;

    // Set theme skin
    const skin = C.theme?.skin || "emerald";
    document.body.setAttribute("data-skin", skin);

    // Dynamic backgrounds
    const heroBg = document.getElementById("heroBg");
    if (heroBg) heroBg.style.backgroundImage = `url("${C.hero.image}")`;
    const backdrop = document.getElementById("pageBackdrop");
    if (backdrop) {
      let gradientColor = "rgba(6, 26, 20, 0.8), rgba(6, 26, 20, 0.92)";
      if (skin === "sage") gradientColor = "rgba(32, 43, 36, 0.8), rgba(32, 43, 36, 0.92)";
      if (skin === "maroon") gradientColor = "rgba(33, 7, 7, 0.8), rgba(33, 7, 7, 0.92)";
      backdrop.style.backgroundImage = `linear-gradient(180deg, ${gradientColor}), url("${C.hero.image}")`;
    }

    // Document title
    document.title = `${G.name[lang]} & ${B.name[lang]} · ${H.weddingTitle[lang]}`;

    // Doors overlay labels
    safeText("tapOpenLabel", lang === "ur" ? "بسم اللہ" : "Bismillah");
    safeText("tapOpenHint", H.enterInvitation[lang]);

    // Hero Section
    const bismillahContainer = document.getElementById("bismillahContainer");
    if (C.theme?.bismillah) {
      if (bismillahContainer) {
        bismillahContainer.hidden = false;
        safeText("bismillahArabic", C.DATA.bismillahArabic[lang]);
        safeText("bismillahTranslation", C.DATA.bismillahTranslation[lang]);
      }
      safeText("heroEyebrow", H.eyebrowBlessing[lang]);
    } else {
      if (bismillahContainer) bismillahContainer.hidden = true;
      safeText("heroEyebrow", lang === "ur" ? "نکاح کی مبارک تقریب" : "Nikah Celebration");
    }

    safeText("heroPoetryText", C.DATA.openingPoetry[lang]);
    safeText("groomName", G.name[lang]);
    safeText("brideName", B.name[lang]);
    safeText("heroTagline", `${G.title[lang]} & ${B.title[lang]}`);

    // Invitation Message Section
    safeText("invitationHeading", H.invitation[lang]);
    safeText("invitationText", C.DATA.invitationMessage[lang]);

    // Groom & Bride Profile Section
    safeText("groomTitleLabel", G.title[lang]);
    safeText("groomNameProfile", G.name[lang]);
    safeText("groomRelation", G.relation[lang]);
    safeText("groomResidence", G.residence[lang]);

    safeText("brideTitleLabel", B.title[lang]);
    safeText("brideNameProfile", B.name[lang]);
    safeText("brideRelation", B.relation[lang]);
    safeText("brideResidence", B.residence[lang]);

    // Save the Date
    safeText("saveDateHeading", H.saveDate[lang]);
    safeText("saveDateSub", lang === "ur" ? "تاریخ ظاہر کرنے کے لیے پیار سے کھرچیں" : "Scratch gently to reveal our special day");
    safeText("weddingDay", H.scratchDay[lang]);
    safeText("weddingDate", H.scratchDate[lang]);
    safeText("scratchHint", H.scratchHint[lang]);

    // Countdown
    safeText("countdownHeading", H.countdownTitle[lang]);
    safeText("cdLabelDays", H.countdownDays[lang]);
    safeText("cdLabelHours", H.countdownHours[lang]);
    safeText("cdLabelMins", H.countdownMins[lang]);
    safeText("cdLabelSecs", H.countdownSecs[lang]);

    // Journey
    safeText("journeyHeading", H.journey[lang]);
    safeText("journeySub", H.journeySub[lang]);

    // Celebrations
    safeText("celebrationsHeading", H.celebrations[lang]);
    safeText("celebrationsSub", H.celebrationsSub[lang]);
    populateEvents(lang);

    // Sarparast Hazrat
    safeText("sarparastHeading", C.DATA.sarparastHazrat.heading[lang]);
    populateSarparast(lang);

    // Family & Guests
    safeText("guestsHeading", C.DATA.guestNames.heading[lang]);
    populateGuests(lang);

    // Venue
    safeText("venueHeading", H.venue[lang]);
    safeText("venueName", C.venue.name);
    safeText("venueAddress", C.venue.address);
    const directionsBtn = document.getElementById("directionsBtn");
    if (directionsBtn) {
      directionsBtn.textContent = H.directions[lang];
      directionsBtn.href = C.venue.mapsLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.venue.mapsQuery)}`;
    }
    const map = document.getElementById("venueMap");
    if (map && !map.src) {
      map.src =
        C.venue.mapsEmbed ||
        `https://maps.google.com/maps?q=${encodeURIComponent(C.venue.mapsQuery)}&z=15&output=embed`;
    }

    // Dress Code
    const dressSection = document.getElementById("dressCode");
    if (!C.dressCode.enabled) {
      if (dressSection) dressSection.hidden = true;
    } else {
      if (dressSection) dressSection.hidden = false;
      safeText("dressHeading", H.dressCode[lang]);
      safeText("dressText", H.dressText[lang]);

      const swatches = document.getElementById("dressSwatches");
      if (swatches && swatches.children.length === 0) {
        C.dressCode.colors.forEach((color) => {
          const el = document.createElement("span");
          el.className = "swatch";
          el.style.background = color;
          el.setAttribute("role", "listitem");
          el.title = color;
          swatches.appendChild(el);
        });
      }

      const toggleBtn = document.getElementById("dressCodeToggle");
      if (toggleBtn) {
        const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
        const span = toggleBtn.querySelector("span");
        if (span) {
          span.textContent = isExpanded ? H.dressBtnHide[lang] : H.dressBtnShow[lang];
        }
      }
    }

    // RSVP Form
    safeText("rsvpTitle", H.rsvpTitle[lang]);
    safeText("rsvpSub", H.rsvpSub[lang]);
    safeText("rsvpLabelName", H.rsvpName[lang]);
    safeText("rsvpLabelGuests", H.rsvpGuests[lang]);
    safeText("rsvpLabelAttending", H.rsvpAttending[lang]);
    safeText("rsvpBtnYes", H.rsvpYes[lang]);
    safeText("rsvpBtnNo", H.rsvpNo[lang]);
    safeText("rsvpLabelMessage", H.rsvpMessage[lang]);
    safeText("rsvpSubmitBtn", H.rsvpSubmit[lang]);
    safeText("rsvpSuccessTitle", H.rsvpSuccessTitle[lang]);
    safeText("rsvpSuccessMsg", H.rsvpSuccessMsg[lang]);

    // Footer Address
    safeText("houseAddressHeading", C.DATA.houseAddress.heading[lang]);
    safeText("houseAddressText", C.DATA.houseAddress.address[lang]);
    safeText("footerLove", lang === "ur"
      ? `خلوص اور دعاؤں کے ساتھ، ${G.name[lang]} اور ${B.name[lang]}`
      : `With sincere regards & prayers, ${G.name[lang]} & ${B.name[lang]}`);
    safeText("footerCredit", C.footer.credit);
    safeText("monogram", lang === "ur" ? "ف ⇄ ص" : C.couple.monogram);

    // Audio Player setup
    const audio = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicToggle");
    if (audio && !audio.src && C.music.enabled !== false && C.music.audioMode !== "ambient") {
      audio.src = C.music.src;
      const savedMute = safeStorage.getItem("invitation_music_muted");
      const initiallyMuted = savedMute !== null ? savedMute === "true" : C.music.startMuted !== false;
      audio.muted = initiallyMuted;
      syncMusicBtn(musicBtn, audio);
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function iconSvg(type) {
    const icons = {
      henna: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 3c2 3 2 6 0 9-2-3-2-6 0-9z"/><path d="M8 8c2 2.5 2 5.5 0 8"/><path d="M16 8c-2 2.5-2 5.5 0 8"/><path d="M12 12v9"/></svg>`,
      crescent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 3a9 9 0 109 9 9.75 9.75 0 01-9-9z"/><circle cx="18" cy="6" r="1.2" fill="currentColor"/><circle cx="15" cy="11" r="0.8" fill="currentColor"/></svg>`,
      depart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M10 21V3c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v18"/><path d="M2 11h14M6 7l-4 4 4 4"/></svg>`,
      banquet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 18h18c1-5-1-10-9-10S4 13 3 18z"/><path d="M12 2v6M2 20h20M7 20v2M17 20v2"/></svg>`
    };
    return icons[type] || icons.crescent;
  }

  /* ---------- Entrance Gateway Reveal ---------- */
  function initDoors() {
    const overlay = document.getElementById("doorsOverlay");
    const tap = document.getElementById("tapOpen");
    const canvas = document.getElementById("doorSparkles");
    if (!overlay || !tap) return;
    document.body.classList.add("doors-locked");

    function openDoors() {
      if (overlay.classList.contains("is-opening")) return;
      overlay.classList.add("is-opening");
      burstSparkles(canvas);
      startMusicSoft();

      const done = () => {
        overlay.classList.add("is-open", "is-gone");
        document.body.classList.remove("doors-locked");
        const hero = document.getElementById("hero");
        if (hero) hero.classList.add("is-visible");
        initScrollReveals();
        window.dispatchEvent(new Event("invite-opened"));
      };

      if (reducedMotion) {
        done();
      } else {
        setTimeout(done, 1300);
      }
    }

    tap.addEventListener("click", openDoors);
    tap.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDoors();
      }
    });
  }

  function burstSparkles(canvas) {
    if (reducedMotion || !canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const particles = Array.from({ length: 48 }, () => ({
      x: rect.width / 2 + (Math.random() - 0.5) * 40,
      y: rect.height / 2 + (Math.random() - 0.5) * 40,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 2,
      life: 1,
      size: Math.random() * 2.5 + 0.8,
      color: Math.random() > 0.4 ? "#D4AF37" : "#FFF8EC",
    }));

    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.life -= 0.018;
        if (p.life <= 0) return;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      frame += 1;
      if (frame < 70) requestAnimationFrame(draw);
    }
    draw();
  }

  /* ---------- Audio Playback ---------- */
  function startMusicSoft() {
    if (C.music.enabled === false || C.music.audioMode === "ambient") return;
    const audio = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicToggle");
    if (!audio) return;
    audio.volume = 0.45;

    const play = audio.play();
    if (play && typeof play.then === "function") {
      play.catch(() => {
        /* blocked */
      });
    }
    syncMusicBtn(musicBtn, audio);
  }

  function syncMusicBtn(btn, audio) {
    if (!btn || !audio) return;
    const muted = audio.muted || audio.paused;
    btn.classList.toggle("is-muted", muted);
    btn.setAttribute("aria-pressed", String(!muted));
    btn.setAttribute("aria-label", muted ? "Unmute audio" : "Mute audio");
  }

  function initMusicToggle() {
    const audio = document.getElementById("bgMusic");
    const btn = document.getElementById("musicToggle");
    if (C.music.enabled === false || C.music.audioMode === "ambient") {
      if (btn) btn.style.display = "none";
      return;
    }

    const savedMute = safeStorage.getItem("invitation_music_muted");
    const initiallyMuted = savedMute !== null ? savedMute === "true" : C.music.startMuted !== false;
    if (btn) btn.classList.toggle("is-muted", initiallyMuted);

    if (btn) {
      btn.addEventListener("click", async () => {
        if (audio.muted || audio.paused) {
          audio.muted = false;
          safeStorage.setItem("invitation_music_muted", "false");
          try {
            await audio.play();
          } catch (_) {
            /* ignore */
          }
        } else {
          audio.muted = true;
          safeStorage.setItem("invitation_music_muted", "true");
        }
        syncMusicBtn(btn, audio);
      });
    }
  }

  /* ---------- Language Swap Controls ---------- */
  function initLanguageToggle() {
    const switchContainer = document.getElementById("langSwitch");
    if (!switchContainer) return;

    switchContainer.querySelectorAll(".lang-switch__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        const currentLang = safeStorage.getItem("invitation_lang") || "en";
        if (lang === currentLang) return;
        setLanguage(lang);
      });
    });
  }

  function setLanguage(lang) {
    safeStorage.setItem("invitation_lang", lang);
    const inviteShell = document.getElementById("invite");
    inviteShell.classList.add("fade-out");

    setTimeout(() => {
      document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.lang === lang);
      });

      if (lang === "ur") {
        document.body.setAttribute("dir", "rtl");
      } else {
        document.body.setAttribute("dir", "ltr");
      }

      translateAll(lang);
      updateCarouselCaption(lang);

      // Refit scratch-off canvas dynamically on toggle
      window.dispatchEvent(new Event("resize"));

      inviteShell.classList.remove("fade-out");
    }, 250);
  }

  /* ---------- Scratch Card reveal ---------- */
  function initScratch() {
    const canvas = document.getElementById("scratchCanvas");
    const hint = document.getElementById("scratchHint");
    const card = document.getElementById("scratchCard");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let revealed = false;
    let drawing = false;

    function sizeCanvas() {
      const rect = card.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintFoil(rect.width, rect.height);
    }

    function paintFoil(w, h) {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "#b8922a");
      grad.addColorStop(0.22, "#e6d08a");
      grad.addColorStop(0.45, "#c9a227");
      grad.addColorStop(0.7, "#f2e4b0");
      grad.addColorStop(1, "#a07a18");
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(255, 250, 242, 0.22)";
      ctx.lineWidth = 1;
      for (let i = -h; i < w + h; i += 15) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + h, h);
        ctx.stroke();
      }

      const vig = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, Math.max(w, h) * 0.7);
      vig.addColorStop(0, "rgba(201,162,39,0.15)");
      vig.addColorStop(1, "rgba(120,90,20,0.35)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);
    }

    function scratch(x, y) {
      if (revealed) return;
      const rect = canvas.getBoundingClientRect();
      const px = x - rect.left;
      const py = y - rect.top;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(px, py, 22, 0, Math.PI * 2);
      ctx.fill();
      hint.classList.add("is-hidden");
      checkReveal();
    }

    function checkReveal() {
      const w = canvas.width;
      const h = canvas.height;
      const sample = ctx.getImageData(0, 0, w, h).data;
      let cleared = 0;
      for (let i = 3; i < sample.length; i += 16) {
        if (sample[i] < 128) cleared += 1;
      }
      const total = sample.length / 16;
      if (cleared / total >= 0.6) autoReveal();
    }

    function autoReveal() {
      if (revealed) return;
      revealed = true;
      canvas.classList.add("is-revealed");
      hint.classList.add("is-hidden");
      confettiBurst(card);
    }

    function pointerPos(e) {
      if (e.touches && e.touches[0]) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    }

    canvas.addEventListener("mousedown", (e) => {
      drawing = true;
      scratch(e.clientX, e.clientY);
    });
    window.addEventListener("mouseup", () => {
      drawing = false;
    });
    canvas.addEventListener("mousemove", (e) => {
      if (drawing) scratch(e.clientX, e.clientY);
    });
    canvas.addEventListener(
      "touchstart",
      (e) => {
        drawing = true;
        const p = pointerPos(e);
        scratch(p.x, p.y);
      },
      { passive: true }
    );
    canvas.addEventListener(
      "touchmove",
      (e) => {
        if (!drawing) return;
        const p = pointerPos(e);
        scratch(p.x, p.y);
      },
      { passive: true }
    );
    window.addEventListener("touchend", () => {
      drawing = false;
    });

    sizeCanvas();
    window.addEventListener("resize", () => {
      if (!revealed) sizeCanvas();
    });
    window.addEventListener("invite-opened", () => {
      if (!revealed) sizeCanvas();
    });
  }

  function confettiBurst(anchor) {
    if (reducedMotion) return;
    const canvas = document.createElement("canvas");
    canvas.className = "confetti-layer";
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "6";
    anchor.style.position = "relative";
    anchor.appendChild(canvas);

    const rect = anchor.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext("2d");
    const colors = ["#D4AF37", "#C9A227", "#FFF8EC", "#EFE1C6", "#0B4F3C"];
    const bits = Array.from({ length: 36 }, () => ({
      x: rect.width / 2,
      y: rect.height / 2,
      vx: (Math.random() - 0.5) * 7,
      vy: (Math.random() - 0.8) * 7,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      w: 4 + Math.random() * 4,
      h: 2 + Math.random() * 3,
      color: colors[(Math.random() * colors.length) | 0],
      life: 1,
    }));

    let frames = 0;
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bits.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.vy += 0.12;
        b.rot += b.vr;
        b.life -= 0.016;
        if (b.life <= 0) return;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.globalAlpha = Math.max(0, b.life);
        ctx.fillStyle = b.color;
        ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
        ctx.restore();
      });
      frames += 1;
      if (frames < 80) requestAnimationFrame(tick);
      else canvas.remove();
    }
    tick();
  }

  /* ---------- Countdown Timer ---------- */
  function initCountdown() {
    const target = new Date(C.wedding.date).getTime();
    const els = {
      days: document.getElementById("cdDays"),
      hours: document.getElementById("cdHours"),
      mins: document.getElementById("cdMins"),
      secs: document.getElementById("cdSecs"),
    };
    if (!els.days) return;
    let prev = {};

    function pad(n) {
      return String(Math.max(0, n)).padStart(2, "0");
    }

    function tick() {
      const diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      const next = {
        days: pad(days),
        hours: pad(hours),
        mins: pad(mins),
        secs: pad(secs),
      };

      Object.keys(els).forEach((key) => {
        if (prev[key] !== next[key]) {
          els[key].textContent = next[key];
          if (!reducedMotion && prev[key] != null) {
            els[key].classList.remove("is-tick");
            void els[key].offsetWidth;
            els[key].classList.add("is-tick");
          }
        }
      });
      prev = next;
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Carousel Slideshow ---------- */
  function initCarousel() {
    const track = document.getElementById("carouselTrack");
    const dots = document.getElementById("carouselDots");
    const caption = document.getElementById("carouselCaption");
    if (!track) return;
    const slides = C.story;
    let index = 0;
    let timer;

    slides.forEach((slide, i) => {
      const el = document.createElement("div");
      el.className = `carousel__slide${i === 0 ? " is-active" : ""}`;
      el.innerHTML = `<img src="${slide.image}" alt="" loading="${i === 0 ? "eager" : "lazy"}" />`;
      track.appendChild(el);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `carousel__dot${i === 0 ? " is-active" : ""}`;
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => go(i));
      if (dots) dots.appendChild(dot);
    });

    const initialLang = safeStorage.getItem("invitation_lang") || "en";
    if (caption) caption.textContent = slides[0].caption[initialLang];

    function go(i) {
      activeSlideIndex = (i + slides.length) % slides.length;
      track.querySelectorAll(".carousel__slide").forEach((s, n) => {
        s.classList.toggle("is-active", n === activeSlideIndex);
      });
      if (dots) {
        dots.querySelectorAll(".carousel__dot").forEach((d, n) => {
          d.classList.toggle("is-active", n === activeSlideIndex);
        });
      }
      
      const currentLang = safeStorage.getItem("invitation_lang") || "en";
      updateCarouselCaption(currentLang);
      restart();
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(() => go(activeSlideIndex + 1), 5000);
    }

    document.getElementById("carouselPrev").addEventListener("click", () => go(activeSlideIndex - 1));
    document.getElementById("carouselNext").addEventListener("click", () => go(activeSlideIndex + 1));
    restart();
  }

  /* ---------- Dress Code Accordion Toggle ---------- */
  function initDressCodeToggle() {
    const btn = document.getElementById("dressCodeToggle");
    const details = document.getElementById("dressCodeDetails");
    if (!btn || !details) return;

    btn.addEventListener("click", () => {
      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isExpanded));
      
      const currentLang = safeStorage.getItem("invitation_lang") || "en";
      const H = C.DATA.headings;
      btn.querySelector("span").textContent = isExpanded ? H.dressBtnShow[currentLang] : H.dressBtnHide[currentLang];

      if (isExpanded) {
        details.classList.remove("is-open");
      } else {
        details.classList.add("is-open");
      }
    });
  }

  /* ---------- RSVP Form ---------- */
  function initRsvp() {
    const form = document.getElementById("rsvpForm");
    const success = document.getElementById("rsvpSuccess");
    const attendingInput = document.getElementById("attendingInput");
    const confettiCanvas = document.getElementById("rsvpConfetti");
    if (!form) return;

    document.querySelectorAll(".attend-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".attend-btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        attendingInput.value = btn.dataset.value;
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      
      const currentLang = safeStorage.getItem("invitation_lang") || "en";
      submitBtn.textContent = C.DATA.headings.rsvpSending[currentLang];

      setTimeout(() => {
        form.hidden = true;
        success.hidden = false;
        const svg = success.querySelector(".check-svg");
        const clone = svg.cloneNode(true);
        svg.replaceWith(clone);
        fireRsvpConfetti(confettiCanvas);
      }, 900);
    });
  }

  function fireRsvpConfetti(canvas) {
    if (reducedMotion || !canvas) return;
    const section = document.getElementById("rsvp");
    canvas.width = section.clientWidth;
    canvas.height = section.clientHeight;
    const ctx = canvas.getContext("2d");
    const colors = ["#D4AF37", "#C9A227", "#FFF8EC", "#EFE1C6", "#0B4F3C"];
    const bits = Array.from({ length: 55 }, () => ({
      x: canvas.width * Math.random(),
      y: -10 - Math.random() * 40,
      vx: (Math.random() - 0.5) * 2.5,
      vy: 1.5 + Math.random() * 3,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.25,
      w: 5 + Math.random() * 5,
      h: 2 + Math.random() * 3,
      color: colors[(Math.random() * colors.length) | 0],
      life: 1,
    }));

    let frames = 0;
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bits.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.rot += b.vr;
        b.life -= 0.008;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.globalAlpha = Math.max(0, Math.min(1, b.life + 0.3));
        ctx.fillStyle = b.color;
        ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
        ctx.restore();
      });
      frames += 1;
      if (frames < 120) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    tick();
  }

  /* ---------- Ambient Particles ---------- */
  function initAmbient(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let particles = [];
    let raf = null;
    let running = false;

    function resize() {
      const parent = canvas.parentElement;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w;
      canvas.height = h;
      particles = Array.from({ length: 18 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vy: -(0.08 + Math.random() * 0.18),
        vx: (Math.random() - 0.5) * 0.12,
        a: 0.15 + Math.random() * 0.35,
      }));
    }

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = Math.random() * w;
        }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(212,175,55,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    function start() {
      if (running) return;
      running = true;
      draw();
    }

    function stop() {
      running = false;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }

    resize();
    start();
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(canvas.parentElement);
  }

  /* ---------- Scroll Reveals ---------- */
  function initScrollReveals() {
    const reveals = document.querySelectorAll(".reveal");
    if (reducedMotion) {
      reveals.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = [...reveals].indexOf(el) * 40;
            setTimeout(() => el.classList.add("is-visible"), Math.min(delay, 200));
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    reveals.forEach((el) => {
      if (el.id === "hero") return;
      io.observe(el);
    });
  }

  function initRsvpQuick() {
    const btn = document.getElementById("rsvpQuick");
    const hero = document.getElementById("hero");
    if (!btn || !hero) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        btn.classList.toggle("is-visible", !entry.isIntersecting);
      },
      { threshold: 0.35 }
    );
    io.observe(hero);

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const rsvp = document.getElementById("rsvp");
      if (rsvp) rsvp.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Bootstrap ---------- */
  initDoors();
  initMusicToggle();
  initScratch();
  initCountdown();
  initCarousel();
  initDressCodeToggle();
  initRsvp();
  initAmbient("heroParticles");
  initAmbient("countdownParticles");
  initRsvpQuick();

  // Language setup bootstrap
  initLanguageToggle();
  const initialLang = safeStorage.getItem("invitation_lang") || "en";
  setLanguage(initialLang);
})();
