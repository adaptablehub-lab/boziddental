import { useEffect, useRef, useState } from "react";
import { heroSlides, img } from "../data.js";
import { prefersReducedMotion } from "../hooks/index.js";
import { Button, Tag, bookLink } from "./ui.jsx";

const DELAY = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // bumps to restart the progress bar on manual picks
  const reduce = useRef(prefersReducedMotion());

  // Auto-advance
  useEffect(() => {
    if (reduce.current || paused) return;
    const t = setTimeout(() => setCurrent((c) => (c + 1) % heroSlides.length), DELAY);
    return () => clearTimeout(t);
  }, [current, paused, cycle]);

  // Pause while the tab is hidden
  useEffect(() => {
    const on = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);

  // Preload the other slides so they appear instantly
  useEffect(() => {
    heroSlides.slice(1).forEach((s) => { new Image().src = img(s.image); });
  }, []);

  const go = (i) => { setCurrent(i); setCycle((c) => c + 1); };
  const isPaused = paused || reduce.current;

  return (
    <section
      className={isPaused ? "hero is-paused" : "hero"}
      style={{ "--hero-delay": `${DELAY}ms` }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero__media" aria-roledescription="carousel" aria-label="Clinic photos">
        {heroSlides.map((s, i) => (
          <div
            key={s.image}
            className={i === current ? "hero__slide photo is-active" : "hero__slide photo"}
            style={{ backgroundImage: `url(${img(s.image)}), var(--ph)`, "--pos-m": s.position }}
            role="img"
            aria-label={s.alt}
            aria-hidden={i !== current}
          />
        ))}
      </div>

      <h1 className="sr-only">Bozid Dental Clinic, Ibadan: quality, affordable dental care for the whole family</h1>

      <div className="wrap hero__panels">
        {heroSlides.map((s, i) => {
          const active = i === current;
          return (
            <div
              key={s.title}
              className={active ? "hero__content hero__panel is-active" : "hero__content hero__panel"}
              aria-hidden={!active}
              inert={active ? undefined : ""}
            >
              <div className="hero__copy">
                <Tag light>{s.tag}</Tag>
                <h2 className="hero__title">{s.title}</h2>
              </div>
              <div className="hero__side">
                <p>{s.text}</p>
                <Button light to={bookLink(s.service)}>{s.cta}</Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="wrap hero__nav" role="group" aria-label="Choose slide">
        {heroSlides.map((s, i) => (
          <button
            key={s.nav}
            type="button"
            className={["hero__dot", i === current && "is-active", i < current && "is-done"].filter(Boolean).join(" ")}
            aria-label={`Show slide ${i + 1}: ${s.nav}`}
            aria-current={i === current ? "true" : undefined}
            onClick={() => go(i)}
          >
            <span className="hero__num">0{i + 1}</span>
            <span className="hero__label">{s.nav}</span>
            {/* key forces the progress animation to restart */}
            <span className="hero__progress"><i key={i === current ? `${current}-${cycle}` : "idle"} /></span>
          </button>
        ))}
      </div>
    </section>
  );
}
