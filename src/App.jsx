import { useEffect, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import { Footer, WhatsAppFab } from "./components/Footer.jsx";
import { useReveal, useScrollY } from "./hooks/index.js";
import * as P from "./pages/index.jsx";

function Layout() {
  const { pathname, search } = useLocation();
  const scrollY = useScrollY();
  const viewport = typeof window !== "undefined" ? window.innerHeight : 800;

  // Start each page at the top
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  // Hide the floating WhatsApp button where it would cover the booking form or footer
  const [overlapping, setOverlapping] = useState(false);
  useEffect(() => {
    const targets = [document.querySelector(".form"), document.querySelector(".footer")].filter(Boolean);
    const seen = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting));
      setOverlapping([...seen.values()].some(Boolean));
    }, { rootMargin: "0px 0px -15% 0px" });
    targets.forEach((t) => io.observe(t));
    return () => { io.disconnect(); setOverlapping(false); };
  }, [pathname]);

  useReveal(".section-head, .about > *, .svc, .value, .split > *, .review, .member, .cat-panels, .faq-wrap > *, .cta", pathname + search);

  const isHome = pathname === "/";
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header scrolled={scrollY > 60} />
      <main id="main"><Outlet /></main>
      <WhatsAppFab visible={scrollY > (isHome ? viewport * 0.6 : 240) && !overlapping} />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<P.Home />} />
          <Route path="about" element={<P.About />} />
          <Route path="services" element={<P.Services />} />
          <Route path="team" element={<P.Team />} />
          <Route path="reviews" element={<P.Reviews />} />
          <Route path="faqs" element={<P.Faqs />} />
          <Route path="contact" element={<P.Contact />} />
          <Route path="book" element={<P.Book />} />
          <Route path="*" element={<P.NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
