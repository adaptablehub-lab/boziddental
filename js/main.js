(() => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Sticky header shadow
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  const toggle = document.querySelector(".nav__toggle");
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
  const revealEls = document.querySelectorAll(".section__head, .card, .person, .steps li, .split__copy, .info, .faq details");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  }

  // Reviews slider
  const slider = document.querySelector("[data-slider]");
  if (slider) {
    const track = slider.querySelector(".slider__track");
    const slides = Array.from(track.children);
    const dotsWrap = slider.querySelector(".slider__dots");
    let index = 0;
    let timer;

    const dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", `Show review ${i + 1}`);
      b.addEventListener("click", () => { go(i); restart(); });
      dotsWrap.appendChild(b);
      return b;
    });

    const go = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, n) => d.setAttribute("aria-selected", String(n === index)));
    };
    const restart = () => {
      clearInterval(timer);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        timer = setInterval(() => go(index + 1), 6000);
      }
    };

    slider.querySelector("[data-prev]").addEventListener("click", () => { go(index - 1); restart(); });
    slider.querySelector("[data-next]").addEventListener("click", () => { go(index + 1); restart(); });
    slider.addEventListener("mouseenter", () => clearInterval(timer));
    slider.addEventListener("mouseleave", restart);
    go(0);
    restart();
  }

  // Booking form
  const form = document.getElementById("booking-form");
  if (form) {
    const status = form.querySelector(".form__status");
    const dateInput = form.querySelector('input[type="date"]');
    dateInput.min = new Date().toISOString().split("T")[0];

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

      // TODO: connect to a real backend or form service (e.g. Formspree, Netlify Forms).
      // For now, we open the visitor's email client with the request pre-filled.
      const data = Object.fromEntries(new FormData(form));
      const body = [
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Service: ${data.service}`,
        `Preferred date: ${data.date}`,
        `Message: ${data.message || "-"}`,
      ].join("\n");
      window.location.href =
        `mailto:hello@boziddental.com?subject=${encodeURIComponent("Appointment request: " + data.service)}&body=${encodeURIComponent(body)}`;

      status.textContent = "Thank you! Your email app should open to send your request. We'll confirm within one business day.";
      status.className = "form__status is-ok";
      form.reset();
    });

    form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));
  }
})();
