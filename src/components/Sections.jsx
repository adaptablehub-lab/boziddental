import { useEffect, useRef, useState } from "react";
import {
  aboutPoints, brand, clinic, extraServices, faqs, hmos, reviews, services, steps, team, whyUs,
} from "../data.js";
import { prefersReducedMotion } from "../hooks/index.js";
import { Button, Photo, SectionHead, Tag } from "./ui.jsx";

export function About() {
  return (
    <section className="section" id="about">
      <div className="wrap about">
        <div>
          <Tag>About us</Tag>
          <h2 className="h-lg">We combine clinical expertise with a genuinely caring approach to dentistry.</h2>
          <Button>Meet us in person</Button>
        </div>
        <ul className="about__list">
          {aboutPoints.map((p, i) => (
            <li key={p.title}>
              <span>0{i + 1}</span>
              <div><h3>{p.title}</h3><p>{p.text}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Services({ onPickService }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section section--grey" id="services">
      <div className="wrap">
        <SectionHead tag="Our services" title="Modern treatments for every kind of smile">
          From a routine clean to a full smile makeover, everything is planned around your comfort and your goals.
        </SectionHead>
        <div className="svc-list">
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <div key={s.slug} className={isOpen ? "svc is-open" : "svc"}>
                <button
                  type="button"
                  className="svc__head"
                  aria-expanded={isOpen}
                  aria-controls={`svc-${s.slug}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="svc__num">({String(i + 1).padStart(2, "0")})</span>
                  <h3>{s.title}</h3>
                  <span className="plus" aria-hidden="true" />
                </button>
                {isOpen && (
                  <div className="svc__body" id={`svc-${s.slug}`}>
                    <Photo name={`service-${s.slug}.jpg`} className="svc__img" />
                    <div className="svc__text">
                      <p>{s.text}</p>
                      <Button onClick={() => onPickService(s.service || s.title)}>Book this treatment</Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="also">
          <p>Also available</p>
          <ul className="service-chips">
            {extraServices.map((x) => <li key={x}>{x}</li>)}
            <li className="chip--alert"><a href={clinic.phoneHref}>Emergency care · call now</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  const ref = useRef(null);
  const scroll = (dir) => {
    const el = ref.current;
    const card = el?.querySelector(".value");
    const step = card ? card.getBoundingClientRect().width + 16 : 400;
    el?.scrollBy({ left: step * dir, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };
  return (
    <section className="section" id="why">
      <div className="wrap">
        <SectionHead
          tag="Why choose us"
          title="Expert care, with real attention to how you feel"
          aside={
            <div className="scroller-nav">
              <button type="button" onClick={() => scroll(-1)} aria-label="Scroll left">←</button>
              <button type="button" onClick={() => scroll(1)} aria-label="Scroll right">→</button>
            </div>
          }
        />
      </div>
      <div className="values" ref={ref}>
        {whyUs.map((v, i) => (
          <Photo key={v.title} name={v.image} className="value">
            <div className="value__top">
              <span className="value__num">0{i + 1}</span>
              <span className="value__kicker">{v.kicker}</span>
            </div>
            <div><h3>{v.title}</h3><p>{v.text}</p></div>
          </Photo>
        ))}
      </div>
    </section>
  );
}

export function Partners() {
  return (
    <section className="partners">
      <div className="wrap">
        <p>We accept most HMOs and health insurance plans</p>
        <ul>{hmos.map((h, i) => <li key={i}>{h}</li>)}</ul>
      </div>
    </section>
  );
}

export function FirstVisit() {
  return (
    <section className="section">
      <div className="wrap split">
        <Photo name="first-visit.jpg" className="split__img" label="Smiling dentist in a modern clinic" />
        <div className="split__copy">
          <Tag>Your first visit</Tag>
          <h2 className="h-lg">Simple from first call to finished smile</h2>
          <p className="muted">We keep things relaxed and clear, so you always know what's happening and why.</p>
          <ol className="steps">
            {steps.map((s) => <li key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>)}
          </ol>
          <Button>Book your first visit</Button>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  // How many cards fit, and how far to move per card
  const measure = () => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!card) return { perView: 1, step: 0 };
    const step = card.getBoundingClientRect().width + 16;
    const perView = Math.max(1, Math.round((track.getBoundingClientRect().width + 16) / step));
    return { perView, step };
  };
  const go = (i) => {
    const { perView, step } = measure();
    const max = Math.max(0, reviews.length - perView);
    const next = i > max ? 0 : i < 0 ? max : i;
    setIndex(next);
    setOffset(next * step);
  };
  useEffect(() => {
    const on = () => go(index);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  });

  return (
    <section className="section section--grey" id="reviews">
      <div className="wrap">
        <SectionHead
          tag="Patient stories"
          title="What our patients say"
          aside={
            <div className="scroller-nav">
              <button type="button" onClick={() => go(index - 1)} aria-label="Previous review">←</button>
              <button type="button" onClick={() => go(index + 1)} aria-label="Next review">→</button>
            </div>
          }
        />
        <div className="reviews">
          <div className="reviews__track" ref={trackRef} style={{ transform: `translateX(-${offset}px)` }}>
            {reviews.map((r, i) => (
              <blockquote className="review" key={i}>
                <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
                <p>“{r.text}”</p>
                <footer>
                  <span className="avatar">{r.name.charAt(0)}</span>
                  <div><strong>{r.name}</strong><small>{r.detail}</small></div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
        <p className="note">Sample reviews: replace with real patient testimonials (with permission).</p>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section className="section" id="team">
      <div className="wrap">
        <SectionHead tag="Our team" title="The people behind your smile">
          Experienced clinicians who care about doing things properly and kindly.
        </SectionHead>
        <div className="team">
          {team.map((m) => (
            <article className="member" key={m.image}>
              <Photo name={m.image} className="member__img">
                {m.badge && <Tag light>{m.badge}</Tag>}
              </Photo>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(-1);
  return (
    <section className="section" id="faq">
      <div className="wrap faq-wrap">
        <div>
          <Tag>FAQ</Tag>
          <h2 className="h-lg">Common questions</h2>
        </div>
        <div className="faq">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={isOpen ? "faq__item is-open" : "faq__item"} key={f.q}>
                <button type="button" className="faq__q" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  {f.q}<span className="plus" aria-hidden="true" />
                </button>
                <div className="faq__a" id={`faq-${i}`} hidden={!isOpen}><p>{f.a}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="cta-section">
      <div className="wrap">
        <Photo name="cta.jpg" className="cta">
          <img className="cta__smile" src={brand("smile-white.png")} alt="" aria-hidden="true" />
          <h2>Your healthiest smile starts with one visit.</h2>
          <p>Gentle, modern dentistry for the whole family, right here in your community.</p>
          <Button light>Book a visit</Button>
        </Photo>
      </div>
    </section>
  );
}
