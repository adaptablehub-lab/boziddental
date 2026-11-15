import { useEffect, useState } from "react";
import { heroSlides, img } from "../data.js";
import { prefersReducedMotion } from "../hooks/index.js";
import { Button, Tag, bookLink } from "./ui.jsx";

const DELAY = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false); // user pressed pause
  const [cycle, setCycle] = useState(0); // bumps to restart the progress bar on manual picks
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => setReduceMotion(prefersReducedMotion()), []);

  // Auto-advance
  useEffect(() => {
    if (reduceMotion || paused || stopped) return;
    const t = setTimeout(() => setCurrent((c) => (c + 1) % heroSlides.length), DELAY);
    return () => clearTimeout(t);
  }, [current, paused, cycle, reduceMotion, stopped]);

  // Pause while the tab is hidden
  useEffect(() => {
    const on = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);

  // Only the first slide's photo loads with the page; the rest follow shortly after (or as soon as they're needed)
  const [restReady, setRestReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRestReady(true), 1500);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { if (current !== 0) setRestReady(true); }, [current]);

  const go = (i) => { setCurrent(i); setCycle((c) => c + 1); };
  const isPaused = paused || reduceMotion || stopped;

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
            style={{ backgroundImage: i === 0 || restReady ? `url(${img(s.image)}), var(--ph)` : "var(--ph)", "--pos-m": s.position }}
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
        <button
          type="button"
          className="hero__toggle"
          onClick={() => setStopped((s) => !s)}
          aria-label={stopped || reduceMotion ? "Play slideshow" : "Pause slideshow"}
        >
          {stopped || reduceMotion
            ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" /></svg>}
        </button>
        {heroSlides.map((s, i) => (
          <button
            key={s.nav}
            type="button"
            className={["hero__dot", i === current && "is-active", i < current && "is-done"].filter(Boolean).join(" ")}
            aria-label={`Show slide ${i + 1}: ${s.nav}`}
            aria-current={i === current ? "true" : undefined}
            onClick={() => go(i)}
          >
            {/* key forces the progress animation to restart */}
            <span className="hero__progress"><i key={i === current ? `${current}-${cycle}` : "idle"} /></span>
          </button>
        ))}
      </div>
    </section>
  );
}
