import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  accreditations, aboutPoints, brand, clinic, faqs, reviews, serviceCategories, services, steps, team, virtualServices, waLink, whyUs,
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
  // Start from the defaults so the browser matches the pre-rendered HTML, then apply the link's ?cat= / ?open=
  const [cat, setCat] = useState("all");
  const [highlight, setHighlight] = useState(null);
  const PAGE = 6;
  const [visible, setVisible] = useState(PAGE);
  const list = cat === "all" ? services : services.filter((s) => s.category === cat);
  const shown = list.slice(0, visible);
  const remaining = list.length - shown.length;
  const pickCat = (id) => { setCat(id); setVisible(PAGE); };
  const catLabel = (id) => serviceCategories.find((c) => c.id === id)?.label;

  // Arriving from the home page: bring the chosen category or treatment into view, briefly highlighted
  useEffect(() => {
    if (serviceCategories.some((c) => c.id === fromCat)) setCat(fromCat);
    const idx = services.findIndex((s) => s.slug === fromOpen);
    if (idx >= 0) { setHighlight(fromOpen); setVisible(Math.ceil((idx + 1) / PAGE) * PAGE); } // make sure the linked card is shown
  }, [fromCat, fromOpen]);
  useEffect(() => {
    if (!fromCat && !fromOpen) return;
    const el = document.getElementById(fromOpen ? `svc-row-${fromOpen}` : "services");
    const t = setTimeout(() => el?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: fromOpen ? "center" : "start" }), 150);
    const t2 = setTimeout(() => setHighlight(null), 3500);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [fromCat, fromOpen]);

  return (
    <section className="section section--grey" id="services">
      <div className="wrap">
        <SectionHead tag="Our services" title="Preventive, restorative and cosmetic care">
          Everything from routine check-ups to implants and Invisalign, under one roof.
        </SectionHead>

        <div className="filters" role="group" aria-label="Filter services">
          {[{ id: "all", label: `All (${services.length})` }, ...serviceCategories].map((c) => (
            <button key={c.id} type="button" className={cat === c.id ? "filter is-active" : "filter"} aria-pressed={cat === c.id} onClick={() => pickCat(c.id)}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="svc-grid">
          {shown.map((s) => {
            const n = services.indexOf(s) + 1;
            return (
              <article key={s.slug} id={`svc-row-${s.slug}`} className={highlight === s.slug ? "svc-card is-highlight" : "svc-card"}>
                <div className="svc-card__media">
                  <Photo name={`service-${s.slug}.jpg`} className="svc-card__img" />
                </div>
                <div className="svc-card__body">
                  <span className="svc__cat">{catLabel(s.category)}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <Link to={bookLink(s.title)} className="svc-card__link">Book this treatment <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            );
          })}
        </div>
        {remaining > 0 && (
          <div className="load-more">
            <p className="load-more__count">Showing {shown.length} of {list.length} services</p>
            <button type="button" className="btn btn--outline" onClick={() => setVisible((v) => v + PAGE)}>
              Load {Math.min(PAGE, remaining)} more<span className="btn__arrow" aria-hidden="true">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/** Home page: interactive expanding panels, one per service category. */
export function ServicesPreview() {
  // -1 = none open: all panels start the same size
  const [active, setActive] = useState(-1);
  // Hover expands a panel on devices with a mouse; touch and keyboard use the panel's button
  const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <section className="section section--grey">
      <div className="wrap">
        <SectionHead tag="Our services" title="Complete dental care under one roof" aside={<Button to="/services">All {services.length} services</Button>} />
        <div className={active === -1 ? "cat-panels" : "cat-panels has-active"} onMouseLeave={canHover ? () => setActive(-1) : undefined}>
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
                  onClick={() => setActive(isActive ? -1 : i)}
                >
                  <span className="cat-panel__meta">
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

/* ---------- Why us: swipe / drag slider ---------- */
function ValueCard({ v, n }) {
  return (
    <Photo name={v.image} className="value">
      <div className="value__top">
        <span className="value__kicker">{v.kicker}</span>
      </div>
      <div><h3>{v.title}</h3><p>{v.text}</p></div>
    </Photo>
  );
}

export function WhyUs() {
  const ref = useRef(null);
  const drag = useRef(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  };
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const step = (dir) => {
    const el = ref.current;
    const card = el?.querySelector(".value");
    const w = card ? card.getBoundingClientRect().width + 16 : 360;
    el?.scrollBy({ left: w * dir, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  // Click-and-drag with a mouse (touch devices swipe natively)
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    // switch off smooth scrolling and snapping straight away so the row follows the pointer exactly
    if (!d.moved && Math.abs(dx) > 4) { d.moved = true; ref.current.classList.add("is-dragging"); }
    if (d.moved) ref.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    ref.current.classList.remove("is-dragging");
    // let scroll-snap settle on the nearest card
    const el = ref.current;
    const card = el.querySelector(".value");
    const w = card ? card.getBoundingClientRect().width + 16 : 360;
    el.scrollTo({ left: Math.round(el.scrollLeft / w) * w, behavior: "smooth" });
  };

  return (
    <section className="section" id="why">
      <div className="wrap">
        <SectionHead
          tag="Why choose us"
          title="Trusted care, with real attention to how you feel"
          aside={
            <div className="scroller-nav">
              <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous card">←</button>
              <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next card">→</button>
            </div>
          }
        />
      </div>
      <div
        className="values"
        ref={ref}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onDragStart={(e) => e.preventDefault()}
        role="region"
        aria-label="Why choose us"
        tabIndex={0}
      >
        {whyUs.map((v, i) => <ValueCard key={v.title} v={v} n={i + 1} />)}
      </div>
      <div className="wrap">
        <div className="slider-progress" aria-hidden="true"><i style={{ width: `${Math.max(12, progress * 100)}%` }} /></div>
      </div>
    </section>
  );
}

/* ---------- Accreditations ---------- */
function AccredList() {
  return (
    <ul className="accred__list">
      {accreditations.map((a) => (
        <li className="accred__card" key={a.short}>
          <span className="accred__badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3 5 6v5c0 4.4 3 8.2 7 9.5 4-1.3 7-5.1 7-9.5V6z" /><path d="m9 12 2.2 2.2L15.5 10" />
            </svg>
          </span>
          <div>
            <span className="accred__scope">{a.scope}</span>
            <h3>{a.body}</h3>
            <p>{a.text}</p>
            <span className="accred__ref">{a.ref}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Accreditations({ grey = false }) {
  return (
    <section className={grey ? "section section--grey" : "section"} id="accreditations">
      <div className="wrap accred">
        <div className="accred__intro">
          <Tag>Licensed &amp; accredited</Tag>
          <h2 className="h-lg">Registered with Nigeria's dental and Oyo State health regulators</h2>
          <p className="muted">Your care is in qualified hands. Our dentists and our clinic meet the standards set by national and state regulators.</p>
        </div>
        <AccredList />
      </div>
    </section>
  );
}

/* ---------- Virtual services ---------- */
const vIcons = {
  video: <path d="M3 7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm13 3 5-3v10l-5-3" />,
  camera: <path d="M4 8a2 2 0 0 1 2-2h2l1.5-2h5L16 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm8 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  chat: <path d="M4 5h16v11H9l-5 4zM8 9h8M8 12h5" />,
  plan: <path d="M7 3h10l3 3v15H4V3h3zm1 7h8M8 14h8M8 18h5" />,
};

export function VirtualServices() {
  return (
    <section className="section virtual" id="virtual">
      <img className="virtual__smile" src={brand("smile-white.png")} alt="" aria-hidden="true" />
      <div className="wrap virtual__inner">
        <div className="virtual__intro">
          <Tag light>Virtual services</Tag>
          <h2 className="h-lg">Dental advice from wherever you are</h2>
          <p>Can't get to the clinic yet? Start with a virtual consultation on WhatsApp. We'll listen, advise and help you plan your next step.</p>
          <div className="btn-row">
            <a className="btn btn--wa" href={waLink("Hello Bozid Dental, I'd like a virtual consultation.")} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />Start a virtual consultation</a>
            <Button light to={bookLink("Virtual consultation")}>Schedule a call</Button>
          </div>
          <p className="virtual__note">Virtual advice can't replace an in-person examination. We'll let you know if you need to come in.</p>
        </div>
        <ul className="virtual__grid">
          {virtualServices.map((v) => (
            <li className="vcard" key={v.title}>
              <span className="vcard__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{vIcons[v.icon]}</svg>
              </span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </li>
          ))}
        </ul>
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
        <h2 className="sr-only">Our dental team</h2>
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
function FaqAccordion({ items }) {
  const [open, setOpen] = useState(-1);
  return (
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
  );
}

export function FaqList({ items = faqs, title = "Common questions", withIntro = true }) {
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
        <FaqAccordion items={items} />
      </div>
    </section>
  );
}

/** Home page: accreditations and FAQs side by side in one section. */
export function TrustAndFaq({ faqItems = faqs.slice(0, 4) }) {
  return (
    <section className="section" id="faq">
      <div className="wrap trust-faq">
        <div className="trust-faq__col" id="accreditations">
          <Tag>Licensed &amp; accredited</Tag>
          <h2 className="h-md">Registered with Nigeria's dental and Oyo State health regulators</h2>
          <p className="muted trust-faq__lead">Your care is in qualified hands. Our dentists and our clinic meet national and state standards.</p>
          <AccredList />
        </div>
        <div className="trust-faq__col">
          <Tag>FAQs</Tag>
          <h2 className="h-md">Common questions</h2>
          <FaqAccordion items={faqItems} />
          <Link to="/faqs" className="text-link">See all FAQs →</Link>
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
