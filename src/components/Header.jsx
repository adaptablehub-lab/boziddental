import { useEffect, useState } from "react";
import { nav } from "../data.js";
import { Button, Logo } from "./ui.jsx";

export default function Header({ scrolled }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const cls = ["header", scrolled && "is-scrolled", open && "menu-open"].filter(Boolean).join(" ");

  return (
    <header className={cls} id="top">
      <div className="wrap header__inner">
        <Logo white={!scrolled} />
        <nav aria-label="Main">
          <ul className={open ? "nav is-open" : "nav"} id="nav-menu">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={close}>{item.label}</a>
              </li>
            ))}
            <li className="nav__cta">
              <Button light onClick={close}>Book a visit</Button>
            </li>
          </ul>
        </nav>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
