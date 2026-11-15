import { Link } from "react-router-dom";
import { brand, img } from "../data.js";

/**
 * Pill button with the round arrow. Internal pages use `to` (router link),
 * external links use `href`, form buttons use `type`.
 */
export function Button({ to, href, light, block, outline, children, className = "", ...rest }) {
  const cls = ["btn", light && "btn--light", block && "btn--block", outline && "btn--outline", className].filter(Boolean).join(" ");
  const inner = (
    <>
      {children}
      <span className="btn__arrow" aria-hidden="true">→</span>
    </>
  );
  if (rest.type) return <button className={cls} {...rest}>{inner}</button>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <Link to={to ?? "/book"} className={cls} {...rest}>{inner}</Link>;
}

export const bookLink = (service) => (service ? `/book?service=${encodeURIComponent(service)}` : "/book");

export function Tag({ light, children }) {
  return <span className={light ? "tag tag--light" : "tag"}>{children}</span>;
}

export function SectionHead({ tag, title, children, aside }) {
  return (
    <div className="section-head">
      <div>
        <Tag>{tag}</Tag>
        <h2 className="h-lg">{title}</h2>
      </div>
      {aside ?? (children && <p>{children}</p>)}
    </div>
  );
}

/** A div with a background photo and a soft placeholder gradient behind it. */
export function Photo({ name, className = "", label, style, children }) {
  return (
    <div
      className={`photo ${className}`}
      style={{ backgroundImage: `url(${img(name)}), var(--ph)`, ...style }}
      {...(label ? { role: "img", "aria-label": label } : {})}
    >
      {children}
    </div>
  );
}

/** Official Bozid Dental logo (brand guide). `white` for dark backgrounds. */
export function Logo({ white = false }) {
  return (
    <Link to="/" className="logo" aria-label="Bozid Dental home">
      <img src={brand(white ? "logo-white.png" : "logo.png")} alt="Bozid Dental" width="473" height="240" />
    </Link>
  );
}

/** Deep-blue banner at the top of inner pages. */
export function PageHero({ tag, title, children, crumb }) {
  return (
    <section className="page-hero">
      <img className="page-hero__smile" src={brand("smile-white.png")} alt="" aria-hidden="true" />
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{crumb ?? title}</span>
        </nav>
        {tag && <Tag light>{tag}</Tag>}
        <h1 className="page-hero__title">{title}</h1>
        {children && <p className="page-hero__lead">{children}</p>}
      </div>
    </section>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}
