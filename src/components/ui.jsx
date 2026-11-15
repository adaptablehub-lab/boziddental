import { img } from "../data.js";

export function Button({ href = "#book", light, block, children, onClick, ...rest }) {
  const cls = ["btn", light && "btn--light", block && "btn--block"].filter(Boolean).join(" ");
  const inner = (
    <>
      {children}
      <span className="btn__arrow" aria-hidden="true">→</span>
    </>
  );
  if (rest.type) {
    return <button className={cls} onClick={onClick} {...rest}>{inner}</button>;
  }
  return <a href={href} className={cls} onClick={onClick} {...rest}>{inner}</a>;
}

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

export function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Bozid Dental home">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 5c-3-2.5-7.5-2.7-10 0-2.6 2.8-1.8 7.3-.6 10.6 1 2.7 1.3 5.5 1.8 8.4.4 2.4 1.3 4 2.8 4 1.8 0 2.2-2.3 2.6-4.4.4-2.3.9-4.6 3.4-4.6s3 2.3 3.4 4.6c.4 2.1.8 4.4 2.6 4.4 1.5 0 2.4-1.6 2.8-4 .5-2.9.8-5.7 1.8-8.4 1.2-3.3 2-7.8-.6-10.6-2.5-2.7-7-2.5-10 0z" fill="currentColor" />
      </svg>
      Bozid Dental
    </a>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}
