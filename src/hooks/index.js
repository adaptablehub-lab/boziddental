import { useEffect, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Current vertical scroll position (updates on scroll and resize). */
export function useScrollY() {
  const [y, setY] = useState(() => (typeof window !== "undefined" ? window.scrollY : 0));
  useEffect(() => {
    const on = () => setY(window.scrollY);
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return y;
}

/** Fades elements matching `selector` in as they scroll into view. */
export function useReveal(selector) {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || prefersReducedMotion()) return;
    const els = document.querySelectorAll(selector);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
    return () => io.disconnect();
  }, [selector]);
}
