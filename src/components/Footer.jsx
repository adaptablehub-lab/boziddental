import { clinic } from "../data.js";
import { Logo, WhatsAppIcon } from "./ui.jsx";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <div>
          <Logo />
          <p>{clinic.tagline}</p>
        </div>
        <div>
          <h4>Visit</h4>
          <p>{clinic.addressLines.map((l, i) => <span key={i}>{l}<br /></span>)}</p>
        </div>
        <div>
          <h4>Hours</h4>
          <p>{clinic.hours.map((h, i) => <span key={i}>{h}<br /></span>)}</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>
            <a href={clinic.phoneHref}>{clinic.phoneDisplay}</a><br />
            <a href={clinic.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a><br />
            <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
          </p>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <p>© {new Date().getFullYear()} {clinic.fullName}</p>
        <a href="#top">Back to top ↑</a>
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
