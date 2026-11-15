import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Booking from "./components/Booking.jsx";
import { Footer, WhatsAppFab } from "./components/Footer.jsx";
import { About, Cta, Faq, FirstVisit, Partners, Reviews, Services, Team, WhyUs } from "./components/Sections.jsx";
import { useReveal, useScrollY } from "./hooks/index.js";

export default function App() {
  // Service chosen in the booking form; "Book" buttons around the page pre-select it
  const [service, setService] = useState("");
  const scrollY = useScrollY();
  const viewport = typeof window !== "undefined" ? window.innerHeight : 800;

  // Hide the floating WhatsApp button where it would cover the form or footer
  // (both already show WhatsApp links)
  const [overlapping, setOverlapping] = useState(false);
  useEffect(() => {
    const targets = [document.getElementById("book"), document.querySelector(".footer")].filter(Boolean);
    const seen = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting));
      setOverlapping([...seen.values()].some(Boolean));
    }, { rootMargin: "0px 0px -15% 0px" });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  useReveal(".section-head, .about > *, .svc, .value, .split > *, .review, .member, .book > *, .faq-wrap > *, .cta");

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header scrolled={scrollY > 60} />
      <main id="main">
        <Hero onPickService={setService} />
        <About />
        <Services onPickService={setService} />
        <WhyUs />
        <Partners />
        <FirstVisit />
        <Reviews />
        <Team />
        <Booking service={service} setService={setService} />
        <Faq />
        <Cta />
      </main>
      {/* shown once the visitor scrolls past most of the hero */}
      <WhatsAppFab visible={scrollY > viewport * 0.6 && !overlapping} />
      <Footer />
    </>
  );
}
