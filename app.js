(function () {
  const cfg = window.BIRTHDAY_CONFIG;
  if (!cfg) return;

  const app = document.getElementById("app");
  const audio = document.getElementById("page-audio");
  const player = document.getElementById("music-player");
  const toggle = document.getElementById("music-toggle");
  const skip = document.getElementById("music-skip");
  const toggleLabel = document.getElementById("music-toggle-label");
  const disc = document.getElementById("music-disc");
  const trackLabel = document.getElementById("music-track-label");
  const topBar = document.getElementById("now-playing-top");
  const topText = document.getElementById("now-playing-top-text");

  function esc(s) {
    const d = document.createElement("div");
    d.textContent = s ?? "";
    return d.innerHTML;
  }

  function imgTag(src, alt, className = "") {
    const safeSrc = esc(src);
    const safeAlt = esc(alt);
    return `<img src="${safeSrc}" alt="${safeAlt}" class="${className}" loading="lazy" onerror="this.closest('.img-wrap')?.classList.add('img-wrap--missing');" />`;
  }

  const polaroidRotations = [-4, 2.5, -2, 3, -1.5, 2];

  const tapeVisual = cfg.soundtrack.tapeImage
    ? `<div class="tape-photo">${imgTag(cfg.soundtrack.tapeImage, "Cassette tape")}</div>`
    : `<div class="cassette-icon cassette-icon--large" aria-hidden="true"></div>`;

  app.innerHTML = `
    <section class="hero hero--shirah" id="top">
      <span class="corner-note hero__corner">${esc(cfg.hero.cornerNote)}</span>
      <div class="hero__content">
        <p class="hero__meta">${esc(cfg.dateLabel)}</p>
        <h1 class="hero__title-bold">${esc(cfg.hero.title)}</h1>
        <p class="hero__subtitle-lowercase">${esc(cfg.hero.subtitle)}</p>
        <a class="btn-pill" href="#letter">${esc(cfg.hero.ctaText)}</a>
      </div>
      <div class="hero__visual">
        ${cfg.hero.image ? `
          <div class="arch-frame">
            <div class="img-wrap">${imgTag(cfg.hero.image, cfg.sisterName)}</div>
            <span class="arch-tag">${esc(cfg.hero.imageCaption)}</span>
          </div>` : ""}
        <div class="age-badge">${esc(String(cfg.age))}</div>
      </div>
    </section>

    <section class="letter-section" id="letter">
      <div class="letter-section__inner">
        <span class="section-tag">${esc(cfg.letter.tag)}</span>
        <p class="letter-greeting">${esc(cfg.letter.greeting)}</p>
        ${cfg.letter.paragraphs
          .map((p) => `<p class="letter-body">${esc(p)}</p>`)
          .join("")}
        <div class="letter-signoff">
          ${cfg.letter.signOff.map((line) => `<span>${esc(line)}</span>`).join("")}
        </div>
      </div>
    </section>

    <section class="panel panel--throwback" id="throwback">
      <div class="panel__head">
        <div>
          <span class="section-tag">${esc(cfg.throwback.tag)}</span>
          <h2 class="cursive-title">${esc(cfg.throwback.titleCursive)}</h2>
        </div>
        <span class="corner-note panel__corner">${esc(cfg.throwback.cornerNote)}</span>
      </div>
      <div class="polaroids polaroids--scroll">
        ${cfg.throwback.photos
          .map(
            (p, i) => `
          <figure class="polaroid" style="--rot: ${polaroidRotations[i % polaroidRotations.length]}deg">
            <div class="polaroid__img img-wrap">${imgTag(p.src, p.caption)}</div>
            <figcaption class="polaroid__caption">${esc(p.caption)}</figcaption>
          </figure>`
          )
          .join("")}
      </div>
    </section>

    <section class="mixtape-section" id="soundtrack">
      <div class="mixtape-header">
        <div>
          <span class="section-tag">${esc(cfg.soundtrack.tag)}</span>
          <h2>${esc(cfg.soundtrack.titleBefore)} <span class="emphasis">${esc(cfg.soundtrack.titleEmphasis)}</span></h2>
          <p>${esc(cfg.soundtrack.subtitle)}</p>
        </div>
        ${tapeVisual}
      </div>
      <div class="mixtape-grid mixtape-grid--links">
        ${cfg.soundtrack.tracks
          .map(
            (t, i) => `
          <a href="${esc(t.url)}" class="track-card track-card--link ${i === 0 ? "track-card--active" : ""}" data-title="${esc(t.title)}" data-wave="${esc(String(t.wave ?? 35))}" target="_blank" rel="noopener noreferrer">
            <span class="track-card__num">${String(i + 1).padStart(2, "0")}</span>
            <span class="track-card__tag">LISTEN</span>
            <div class="track-card__title">${esc(t.title)}</div>
            <div class="track-card__note">${esc(t.artist)}</div>
            <div class="track-card__bar"><span></span></div>
          </a>`
          )
          .join("")}
      </div>
    </section>

    <section class="next-year">
      <div class="next-year__inner">
        <span class="section-tag">${esc(cfg.nextYear.tag)}</span>
        <h2>${esc(cfg.nextYear.titleBefore)} <span class="emphasis">${esc(cfg.nextYear.titleEmphasis)}</span></h2>
        <p class="next-year__sub">${esc(cfg.nextYear.subtitle)}</p>
        <ul class="goals-list">
          ${cfg.nextYear.goals
            .map(
              (g, i) => `
            <li class="goals-list__item">
              <span class="goals-list__num">${String(i + 1).padStart(2, "0")}</span>
              <span class="goals-list__text">${esc(g)}</span>
            </li>`
            )
            .join("")}
        </ul>
      </div>
    </section>

    <section class="mosaic-section dumpy-section" id="dumpy">
      <div class="mosaic-head">
        <div>
          <span class="section-tag">${esc(cfg.dumpy.tag)}</span>
          <h2>${esc(cfg.dumpy.titleBefore)} <span class="emphasis">${esc(cfg.dumpy.titleEmphasis)}</span></h2>
        </div>
        <span class="corner-note">${esc(cfg.dumpy.cornerNote)}</span>
      </div>
      <div class="masonry">
        ${cfg.dumpy.images
          .map(
            (src, i) => `
          <div class="masonry__item img-wrap">${imgTag(src, `Photo ${i + 1}`)}</div>`
          )
          .join("")}
      </div>
    </section>

    <section class="always-remember">
      <div class="always-remember__inner">
        <span class="section-tag">${esc(cfg.alwaysRemember.tag)}</span>
        <h2>${esc(cfg.alwaysRemember.titleBefore)} <span class="emphasis">${esc(cfg.alwaysRemember.titleEmphasis)}</span></h2>
        <div class="always-remember__list">
          ${cfg.alwaysRemember.verses
            .map(
              (verse) => `
              <blockquote class="always-remember__verse">${esc(verse)}</blockquote>`
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="family-love" id="family">
      <header class="family-love__head">
        <span class="section-tag section-tag--light">${esc(cfg.familyLove.tag)}</span>
        <h2>${esc(cfg.familyLove.titleBefore)} <span class="emphasis emphasis--light">${esc(cfg.familyLove.titleEmphasis)}</span></h2>
      </header>
      <div class="family-cards">
        ${cfg.familyLove.messages
          .map(
            (m) => `
          <article class="family-card">
            <div class="family-card__label">from ${esc(m.from)} ${esc(m.emoji)}</div>
            <p class="family-card__opening">${esc(m.opening)}</p>
            ${m.paragraphs.map((p) => `<p class="family-card__body">${esc(p)}</p>`).join("")}
            ${m.quotes
              .map(
                (q) => `
              <blockquote class="family-card__quote">
                <p>"${esc(q.text)}"</p>
                <cite>— ${esc(q.ref)}</cite>
              </blockquote>`
              )
              .join("")}
            ${m.closing ? `<p class="family-card__closing">${esc(m.closing)}</p>` : ""}
            <div class="family-card__sign">
              <span>${esc(m.signOff)}</span>
              <span class="family-card__signature">${esc(m.signature)}</span>
            </div>
          </article>`
          )
          .join("")}
      </div>
    </section>

    <footer class="site-footer">
      <p class="site-footer__line">happy birthday, <span class="emphasis">${esc(cfg.sisterName)}</span>.</p>
      <p class="site-footer__small">made with love · ${esc(String(cfg.age))} never looked so good</p>
    </footer>
  `;

  function initMusic() {
    const m = cfg.music;
    const playlist = Array.isArray(m?.tracks) && m.tracks.length ? m.tracks : (m?.src ? [{ src: m.src, title: m.title, artist: m.artist }] : []);
    if (!playlist.length) return;

    let currentIndex = 0;

    function syncSoundtrackCard(track) {
      const cards = document.querySelectorAll(".track-card--link");
      const match = track?.title ? track.title.toLowerCase() : "";

      cards.forEach((card) => {
        const isActive = (card.dataset.title || "").toLowerCase() === match;
        card.classList.toggle("track-card--active", isActive);

        if (isActive) {
          const wave = Number(card.dataset.wave || track?.wave || 35);
          card.style.setProperty("--line-width", `${Math.min(Math.max(wave, 12), 100)}%`);
          card.querySelector(".track-card__bar span")?.style.setProperty("width", `${Math.min(Math.max(wave, 12), 100)}%`);
        }
      });
    }

    function updateTrackMeta(track) {
      const label = `${track.title} — ${track.artist}`;
      trackLabel.textContent = label;
      topText.textContent = label;
      topBar.hidden = false;
      player.hidden = false;
      syncSoundtrackCard(track);
    }

    function loadTrack(index) {
      currentIndex = (index + playlist.length) % playlist.length;
      const track = playlist[currentIndex];
      updateTrackMeta(track);
      audio.src = track.src;
      audio.loop = false;
      if (m.autoplay) {
        audio.play().then(() => setPlaying(true)).catch(() => {});
      }
    }

    function setPlaying(playing) {
      player.classList.toggle("is-playing", playing);
      toggle.classList.toggle("is-playing", playing);
      toggleLabel.textContent = playing ? "PAUSE" : "PLAY";
      toggle.setAttribute("aria-label", playing ? "Pause music" : "Play music");
    }

    if (m.cover) {
      disc.style.backgroundImage = `url("${m.cover.replace(/"/g, '\\"')}")`;
    }

    toggle.addEventListener("click", async () => {
      try {
        if (audio.paused) {
          if (!audio.src) {
            loadTrack(currentIndex);
          }
          await audio.play();
          setPlaying(true);
        } else {
          audio.pause();
          setPlaying(false);
        }
      } catch (e) {
        console.warn("Playback blocked — tap play again.", e);
      }
    });

    skip.addEventListener("click", async () => {
      loadTrack(currentIndex + 1);
      try {
        await audio.play();
        setPlaying(true);
      } catch (e) {
        console.warn("Playback blocked — tap play again.", e);
      }
    });

    audio.addEventListener("play", () => setPlaying(true));
    audio.addEventListener("pause", () => setPlaying(false));
    audio.addEventListener("ended", () => {
      loadTrack(currentIndex + 1);
    });
    audio.addEventListener("error", () => {
      const track = playlist[currentIndex];
      trackLabel.textContent = `Add song: ${track?.src ?? "audio file"}`;
    });

    loadTrack(0);
  }

  initMusic();
})();
