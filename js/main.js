(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Header: transparent over hero, solid after scrolling
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 60);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Hero slideshow
  const heroMedia = document.querySelector("[data-hero]");
  if (heroMedia) {
    const hero = heroMedia.closest(".hero");
    const slides = Array.from(heroMedia.querySelectorAll(".hero__slide"));
    const dots = Array.from(hero.querySelectorAll(".hero__dot"));
    const panels = Array.from(hero.querySelectorAll(".hero__panel"));
    const DELAY = 6000;
    let current = 0;
    let timer = null;
    let paused = false;
    hero.style.setProperty("--hero-delay", `${DELAY}ms`);

    const show = (i) => {
      current = (i + slides.length) % slides.length;
      slides.forEach((s, n) => {
        s.classList.toggle("is-active", n === current);
        s.setAttribute("aria-hidden", String(n !== current));
      });
      // Swap the headline, text and button to match the slide
      panels.forEach((p, n) => {
        const on = n === current;
        p.classList.toggle("is-active", on);
        p.toggleAttribute("inert", !on);
        if (on) p.removeAttribute("aria-hidden"); else p.setAttribute("aria-hidden", "true");
      });
      dots.forEach((d, n) => {
        d.classList.remove("is-active");
        d.classList.toggle("is-done", n < current);
        d.removeAttribute("aria-current");
      });
      void dots[current].offsetWidth; // restart the progress animation
      dots[current].classList.add("is-active");
      dots[current].setAttribute("aria-current", "true");
    };
    const schedule = () => {
      clearTimeout(timer);
      if (reduceMotion || paused) return;
      timer = setTimeout(() => { show(current + 1); schedule(); }, DELAY);
    };
    const setPaused = (p) => {
      paused = p;
      hero.classList.toggle("is-paused", p);
      if (p) clearTimeout(timer); else schedule();
    };

    dots.forEach((d, n) => d.addEventListener("click", () => { show(n); schedule(); }));
    hero.addEventListener("mouseenter", () => setPaused(true));
    hero.addEventListener("mouseleave", () => setPaused(false));
    hero.addEventListener("focusin", () => setPaused(true));
    hero.addEventListener("focusout", () => setPaused(false));
    document.addEventListener("visibilitychange", () => setPaused(document.hidden));

    // Preload the other slides so they appear instantly
    slides.slice(1).forEach((s) => {
      const m = s.style.backgroundImage.match(/url\(["']?([^"')]+)/);
      if (m) new Image().src = m[1];
    });
    if (reduceMotion) hero.classList.add("is-paused");
    show(0);
    schedule();
  }

  // Mobile menu
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("nav-menu");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".section-head, .about > *, .svc, .value, .split > *, .review, .member, .book > *, .faq-wrap > *, .cta");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    revealEls.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  }

  // Values: horizontal scroller arrows
  const scroller = document.querySelector("[data-scroller]");
  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = scroller.querySelector(".value");
      const step = card ? card.getBoundingClientRect().width + 16 : 400;
      scroller.scrollBy({ left: step * Number(btn.dataset.scroll), behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  // Reviews slider (moves one card at a time; shows 1–3 depending on width)
  const slider = document.querySelector("[data-slider]");
  if (slider) {
    const track = slider.querySelector(".reviews__track");
    const cards = Array.from(track.children);
    const section = slider.closest("section");
    let index = 0;

    const perView = () => {
      const w = cards[0].getBoundingClientRect().width;
      return Math.max(1, Math.round(track.getBoundingClientRect().width / (w + 16)));
    };
    const go = (i) => {
      const max = Math.max(0, cards.length - perView());
      index = Math.min(Math.max(i, 0), max);
      const step = cards[0].getBoundingClientRect().width + 16;
      track.style.transform = `translateX(-${index * step}px)`;
    };
    section.querySelector("[data-prev]").addEventListener("click", () => go(index - 1));
    section.querySelector("[data-next]").addEventListener("click", () => {
      const max = Math.max(0, cards.length - perView());
      go(index >= max ? 0 : index + 1);
    });
    window.addEventListener("resize", () => go(index));
  }

  // Services list: keep one item open at a time (fallback for browsers without <details name>)
  const svcs = document.querySelectorAll(".svc");
  svcs.forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) svcs.forEach((o) => { if (o !== d) o.open = false; });
  }));

  // Booking form
  const form = document.getElementById("booking-form");
  // "Book this treatment" buttons pre-select the service in the form
  document.querySelectorAll("[data-service]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const select = form && form.querySelector('select[name="service"]');
      if (select) select.value = btn.dataset.service;
    });
  });
  if (form) {
    const status = form.querySelector(".form__status");
    form.querySelector('input[type="date"]').min = new Date().toISOString().split("T")[0];

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll("[required]").forEach((field) => {
        const ok = field.checkValidity() && field.value.trim() !== "";
        field.classList.toggle("is-invalid", !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        status.textContent = "Please fill in all required fields.";
        status.className = "form__status is-err";
        return;
      }

      // TODO: connect to a form service (e.g. Formspree) to receive requests directly.
      const d = Object.fromEntries(new FormData(form));
      const body = `Name: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}\nService: ${d.service}\nPreferred date: ${d.date}\nMessage: ${d.message || "-"}`;
      window.location.href = `mailto:hello@boziddental.com?subject=${encodeURIComponent("Appointment request: " + d.service)}&body=${encodeURIComponent(body)}`;

      status.textContent = "Thank you! Your email app should open to send the request. We'll confirm within one business day.";
      status.className = "form__status is-ok";
      form.reset();
    });
    form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));
  }
})();
