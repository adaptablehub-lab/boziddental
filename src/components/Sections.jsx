import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  aboutPoints, blogPosts, brand, clinic, faqs, gallery, img, reviews, serviceCategories, services, steps, team, waLink, whyUs,
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
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState(services[0].slug);
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
              <div key={s.slug} className={isOpen ? "svc is-open" : "svc"}>
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

/** Home page: the three categories as cards linking to the services page. */
export function ServicesPreview() {
  return (
    <section className="section section--grey">
      <div className="wrap">
        <SectionHead tag="Our services" title="Complete dental care under one roof" aside={<Button to="/services">All 14 services</Button>} />
        <div className="cat-cards">
          {serviceCategories.map((c) => {
            const items = services.filter((s) => s.category === c.id);
            return (
              <Link to="/services" className="cat-card" key={c.id}>
                <Photo name={`service-${items[0].slug}.jpg`} className="cat-card__img" />
                <div className="cat-card__body">
                  <h3>{c.label}</h3>
                  <p>{c.blurb}</p>
                  <ul>{items.map((s) => <li key={s.slug}>{s.title}</li>)}</ul>
                  <span className="cat-card__more">Explore <span aria-hidden="true">→</span></span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why us ---------- */
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
          title="Trusted care, with real attention to how you feel"
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

/* ---------- Gallery ---------- */
function BeforeAfter({ item }) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="ba">
      <div className="ba__frame" style={{ "--pos": `${pos}%` }}>
        <img src={img(item.after)} alt={`${item.title}: after`} />
        <img className="ba__before" src={img(item.before)} alt={`${item.title}: before`} />
        <span className="ba__label ba__label--l">Before</span>
        <span className="ba__label ba__label--r">After</span>
        <input className="ba__range" type="range" min="0" max="100" value={pos} onChange={(e) => setPos(+e.target.value)} aria-label={`Compare before and after: ${item.title}`} />
      </div>
      <figcaption>{item.title}</figcaption>
    </figure>
  );
}

export function GallerySections() {
  const { beforeAfter, facilities } = gallery;
  return (
    <>
      <section className="section">
        <div className="wrap">
          <SectionHead tag="Before & after" title="Real smiles, real results">
            {beforeAfter.length ? "Drag the slider to compare. Shared with our patients' permission." : "Results from real Bozid Dental patients, shared with their permission."}
          </SectionHead>
          {beforeAfter.length ? (
            <div className="ba-grid">{beforeAfter.map((b) => <BeforeAfter key={b.title + b.before} item={b} />)}</div>
          ) : (
            <ComingSoon text="Before-and-after photos of our patients' results are coming soon." />
          )}
        </div>
      </section>
      <section className="section section--grey">
        <div className="wrap">
          <SectionHead tag="Our clinic" title="A clean, modern and welcoming space">
            Take a look around our clinic on Ring Road, Ibadan.
          </SectionHead>
          {facilities.length ? (
            <div className="facility-grid">
              {facilities.map((f) => (
                <figure key={f.image}><Photo name={f.image} className="facility__img" label={f.caption} /><figcaption>{f.caption}</figcaption></figure>
              ))}
            </div>
          ) : (
            <ComingSoon text="Photos of our clinic and facilities are coming soon. Better still, come and visit us!" />
          )}
        </div>
      </section>
    </>
  );
}

function ComingSoon({ text }) {
  return (
    <div className="coming-soon">
      <img src={brand("smile.png")} alt="" aria-hidden="true" />
      <p>{text}</p>
      <div className="btn-row">
        <Button to="/book">Book a visit</Button>
        <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />WhatsApp us</a>
      </div>
    </div>
  );
}

/* ---------- Blog ---------- */
export const formatDate = (d) => new Date(d + "T12:00:00").toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

export function BlogCards({ limit }) {
  const posts = limit ? blogPosts.slice(0, limit) : blogPosts;
  return (
    <div className="blog-grid">
      {posts.map((p) => (
        <Link to={`/blog/${p.slug}`} className="post-card" key={p.slug}>
          <Photo name={p.image} className="post-card__img" />
          <div className="post-card__body">
            <time dateTime={p.date}>{formatDate(p.date)}</time>
            <h3>{p.title}</h3>
            <p>{p.excerpt}</p>
            <span className="text-link">Read article →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function BlogPreview() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead tag="From our blog" title="Tips for a healthier smile" aside={<Button to="/blog">All articles</Button>} />
        <BlogCards limit={3} />
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
