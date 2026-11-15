import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  aboutPoints, brand, clinic, faqs, reviews, serviceCategories, services, steps, team, waLink, whyUs,
} from "../data.js";
import { prefersReducedMotion } from "../hooks/index.js";
import { Button, Photo, SectionHead, Tag, WhatsAppIcon, bookLink } from "./ui.jsx";

/* ---------- About / intro ---------- */
export function Intro({ more = true }) {
  return (
    <section className="section">
      <div className="wrap about">
        <div>
          <Tag>About Bozid Dental</Tag>
          <h2 className="h-lg">Quality, affordable dental care in a friendly, comfortable environment.</h2>
          <p className="lead">{clinic.description}</p>
          {more ? <Button to="/about">More about us</Button> : <Button to="/book">Book a visit</Button>}
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

/* ---------- Services ---------- */
export function ServicesList() {
  const [params] = useSearchParams();
  const fromCat = params.get("cat");
  const fromOpen = params.get("open");
  const [cat, setCat] = useState(serviceCategories.some((c) => c.id === fromCat) ? fromCat : "all");
  const [open, setOpen] = useState(services.some((s) => s.slug === fromOpen) ? fromOpen : services[0].slug);

  // Arriving from the home page: bring the chosen category or treatment into view
  useEffect(() => {
    if (!fromCat && !fromOpen) return;
    const el = document.getElementById(fromOpen ? `svc-row-${fromOpen}` : "services");
    const t = setTimeout(() => el?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" }), 150);
    return () => clearTimeout(t);
  }, [fromCat, fromOpen]);
  const list = cat === "all" ? services : services.filter((s) => s.category === cat);
  const catLabel = (id) => serviceCategories.find((c) => c.id === id)?.label;

  return (
    <section className="section section--grey" id="services">
      <div className="wrap">
        <SectionHead tag="Our services" title="Preventive, restorative and cosmetic care">
          Everything from routine check-ups to implants and Invisalign, under one roof.
        </SectionHead>

        <div className="filters" role="group" aria-label="Filter services">
          {[{ id: "all", label: `All (${services.length})` }, ...serviceCategories].map((c) => (
            <button key={c.id} type="button" className={cat === c.id ? "filter is-active" : "filter"} aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="svc-list">
          {list.map((s) => {
            const isOpen = open === s.slug;
            const n = services.indexOf(s) + 1;
            return (
              <div key={s.slug} id={`svc-row-${s.slug}`} className={isOpen ? "svc is-open" : "svc"}>
                <button type="button" className="svc__head" aria-expanded={isOpen} aria-controls={`svc-${s.slug}`} onClick={() => setOpen(isOpen ? null : s.slug)}>
                  <span className="svc__num">({String(n).padStart(2, "0")})</span>
                  <h3>{s.title}</h3>
                  <span className="svc__cat">{catLabel(s.category)}</span>
                  <span className="plus" aria-hidden="true" />
                </button>
                {isOpen && (
                  <div className="svc__body" id={`svc-${s.slug}`}>
                    <Photo name={`service-${s.slug}.jpg`} className="svc__img" />
                    <div className="svc__text">
                      <p>{s.text}</p>
                      <Button to={bookLink(s.title)}>Book this treatment</Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Home page: interactive expanding panels, one per service category. */
export function ServicesPreview() {
  const [active, setActive] = useState(0);
  // Hover expands a panel on devices with a mouse; touch and keyboard use the panel's button
  const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <section className="section section--grey">
      <div className="wrap">
        <SectionHead tag="Our services" title="Complete dental care under one roof" aside={<Button to="/services">All {services.length} services</Button>} />
        <div className="cat-panels">
          {serviceCategories.map((c, i) => {
            const items = services.filter((s) => s.category === c.id);
            const isActive = active === i;
            return (
              <div
                key={c.id}
                className={isActive ? "cat-panel is-active" : "cat-panel"}
                onMouseEnter={canHover ? () => setActive(i) : undefined}
              >
                <Photo name={c.image} className="cat-panel__bg" />
                <button
                  type="button"
                  className="cat-panel__head"
                  aria-expanded={isActive}
                  aria-controls={`cat-${c.id}`}
                  onClick={() => setActive(i)}
                >
                  <span className="cat-panel__meta">
                    <span className="cat-panel__num">0{i + 1}</span>
                    <span className="cat-panel__count">{items.length} treatments</span>
                  </span>
                  <h3>{c.label}</h3>
                  <span className="cat-panel__plus" aria-hidden="true" />
                </button>
                <div className="cat-panel__body" id={`cat-${c.id}`} aria-hidden={!isActive} inert={isActive ? undefined : ""}>
                  <p className="cat-panel__title" aria-hidden="true">{c.label}</p>
                  <p>{c.blurb}</p>
                  <ul className="cat-panel__list">
                    {items.map((s) => (
                      <li key={s.slug}>
                        <Link to={`/services?open=${s.slug}`}>{s.title}<span aria-hidden="true">↗</span></Link>
                      </li>
                    ))}
                  </ul>
                  <Button light to={`/services?cat=${c.id}`}>Explore {c.label.split(" ")[0].toLowerCase()} care</Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why us: continuous sliding cards ---------- */
function ValueCard({ v, n }) {
  return (
    <Photo name={v.image} className="value">
      <div className="value__top">
        <span className="value__num">0{n}</span>
        <span className="value__kicker">{v.kicker}</span>
      </div>
      <div><h3>{v.title}</h3><p>{v.text}</p></div>
    </Photo>
  );
}

export function WhyUs() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="section" id="why">
      <div className="wrap">
        <SectionHead tag="Why choose us" title="Trusted care, with real attention to how you feel">
          Five reasons patients across Ibadan choose Bozid Dental. Hover or tap to pause.
        </SectionHead>
      </div>
      <div
        className={paused ? "marquee is-paused" : "marquee"}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={() => setPaused((p) => !p)}
      >
        {/* the list is rendered twice so the loop is seamless; the copy is hidden from screen readers */}
        <div className="marquee__track" style={{ "--count": whyUs.length }}>
          <div className="marquee__group">
            {whyUs.map((v, i) => <ValueCard key={v.title} v={v} n={i + 1} />)}
          </div>
          <div className="marquee__group" aria-hidden="true">
            {whyUs.map((v, i) => <ValueCard key={v.title} v={v} n={i + 1} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- How booking works ---------- */
export function FirstVisit() {
  return (
    <section className="section">
      <div className="wrap split">
        <Photo name="first-visit.jpg" className="split__img" label="Smiling dentist in a modern clinic" />
        <div className="split__copy">
          <Tag>Booking is easy</Tag>
          <h2 className="h-lg">From request to healthy smile in three steps</h2>
          <p className="muted">Book online or on WhatsApp, and we'll take care of the rest.</p>
          <ol className="steps">
            {steps.map((s) => <li key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>)}
          </ol>
          <div className="btn-row">
            <Button to="/book">Request an appointment</Button>
            <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />WhatsApp us</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews ---------- */
function ReviewCard({ r }) {
  return (
    <blockquote className="review">
      <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
      <p>“{r.text}”</p>
      <footer>
        <span className="avatar">{r.name.charAt(0)}</span>
        <div><strong>{r.name}</strong><small>{r.detail}</small></div>
      </footer>
    </blockquote>
  );
}

export function ReviewsSlider() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const measure = () => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!card) return { perView: 1, step: 0 };
    const step = card.getBoundingClientRect().width + 16;
    return { perView: Math.max(1, Math.round((track.getBoundingClientRect().width + 16) / step)), step };
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
    <section className="section section--grey">
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
            {reviews.map((r, i) => <ReviewCard key={i} r={r} />)}
          </div>
        </div>
        <div className="section-foot">
          <p className="note">Sample reviews: replace with real patient testimonials (with permission).</p>
          <Link to="/reviews" className="text-link">All reviews →</Link>
        </div>
      </div>
    </section>
  );
}

export function ReviewsGrid() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="reviews-grid">{reviews.map((r, i) => <ReviewCard key={i} r={r} />)}</div>
        <p className="note">Sample reviews: replace with real patient testimonials (with permission).</p>
      </div>
    </section>
  );
}

/* ---------- Team ---------- */
export function TeamGrid() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="team team--full">
          {team.map((m) => (
            <article className="member" key={m.image}>
              <Photo name={m.image} className="member__img" />
              <div className="member__body">
                <h3>{m.name}</h3>
                <p className="member__role">{m.role}</p>
                <dl className="member__facts">
                  <div><dt>Qualifications</dt><dd>{m.qualifications}</dd></div>
                  <div><dt>Specialties</dt><dd>{m.specialties}</dd></div>
                  <div><dt>Experience</dt><dd>{m.years} years</dd></div>
                </dl>
                <p className="member__bio">{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function FaqList({ items = faqs, title = "Common questions", withIntro = true }) {
  const [open, setOpen] = useState(-1);
  return (
    <section className="section" id="faq">
      <div className={withIntro ? "wrap faq-wrap" : "wrap wrap--narrow"}>
        {withIntro && (
          <div>
            <Tag>FAQs</Tag>
            <h2 className="h-lg">{title}</h2>
            <Link to="/faqs" className="text-link">See all FAQs →</Link>
          </div>
        )}
        <div className="faq">
          {items.map((f, i) => {
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

/* ---------- Contact ---------- */
export function ContactList() {
  return (
    <ul className="contact">
      {clinic.phones.map((ph) => (
        <li key={ph.display}>
          <small>{ph.label}</small>
          <span className="contact__line">
            {ph.call ? <a href={ph.href}>{ph.display}</a> : <span>{ph.display}</span>}
            <a className="contact__wa" href={`https://wa.me/${ph.wa}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${ph.display}`}><WhatsAppIcon /></a>
          </span>
        </li>
      ))}
      <li><small>Email</small><span className="contact__line contact__line--stack">{clinic.emails.map((e) => <a key={e} href={`mailto:${e}`}>{e}</a>)}</span></li>
      <li><small>Address</small><span>{clinic.address} · <a href={clinic.mapUrl} target="_blank" rel="noopener noreferrer">Directions</a></span></li>
      <li><small>Hours</small><span>{clinic.hoursShort}</span></li>
    </ul>
  );
}

export function HoursTable() {
  return (
    <table className="hours">
      <tbody>
        {clinic.hours.map((h) => <tr key={h.days}><th scope="row">{h.days}</th><td>{h.time}</td></tr>)}
      </tbody>
    </table>
  );
}

/* ---------- CTA ---------- */
export function Cta() {
  return (
    <section className="cta-section">
      <div className="wrap">
        <Photo name="cta.jpg" className="cta">
          <img className="cta__smile" src={brand("smile-white.png")} alt="" aria-hidden="true" />
          <h2>Your healthiest smile starts with one visit.</h2>
          <p>Quality, affordable dental care on Ring Road, Ibadan. Book online or message us on WhatsApp.</p>
          <div className="btn-row btn-row--center">
            <Button light to="/book">Book an appointment</Button>
            <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />WhatsApp us</a>
          </div>
        </Photo>
      </div>
    </section>
  );
}
