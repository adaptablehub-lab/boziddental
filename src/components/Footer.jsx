import { Link } from "react-router-dom";
import { clinic, footerLinks } from "../data.js";
import { Logo, WhatsAppIcon } from "./ui.jsx";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <div>
          <Logo white />
          <p className="footer__tagline">{clinic.tagline}</p>
          <p className="footer__about">Quality, affordable dental care in a friendly and comfortable environment in Ibadan.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul className="footer__links">
            {footerLinks.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4>Visit</h4>
          <p>{clinic.addressLines.map((l, i) => <span key={i}>{l}<br /></span>)}</p>
          <p><a href={clinic.mapUrl} target="_blank" rel="noopener noreferrer">Get directions →</a></p>
          <h4 className="footer__h4-gap">Hours</h4>
          <p>{clinic.hours.map((h) => <span key={h.days}>{h.days}: {h.time}<br /></span>)}</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>
            {clinic.phones.map((ph) => (
              <span key={ph.display}>
                {ph.call ? <a href={ph.href}>{ph.display}</a> : ph.display}
                <small className="footer__label"> · {ph.label}</small><br />
              </span>
            ))}
          </p>
          <p>{clinic.emails.map((e) => <span key={e}><a href={`mailto:${e}`}>{e}</a><br /></span>)}</p>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <p>© {new Date().getFullYear()} {clinic.fullName}. All rights reserved.</p>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Back to top ↑</a>
      </div>
    </footer>
  );
}

export function WhatsAppFab({ visible }) {
  return (
    <a
      className={visible ? "wa-fab is-visible" : "wa-fab"}
      href={clinic.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Bozid Dental on WhatsApp"
      tabIndex={visible ? undefined : -1}
    >
      <WhatsAppIcon />
      <span>WhatsApp us</span>
    </a>
  );
}
