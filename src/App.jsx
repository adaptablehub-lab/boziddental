import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { applyHead } from "./head.js";
import Header from "./components/Header.jsx";
import { Footer, WhatsAppFab } from "./components/Footer.jsx";
import Assistant from "./components/Assistant.jsx";
import { useReveal, useScrollY } from "./hooks/index.js";
import * as P from "./pages/index.jsx";

function Layout() {
  const { pathname, search } = useLocation();
  const scrollY = useScrollY();
  const viewport = typeof window !== "undefined" ? window.innerHeight : 800;

  // Start each page at the top, and update the title/description/social tags
  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current) firstLoad.current = false;
    else document.getElementById("main")?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
    applyHead(pathname.length > 1 ? pathname.replace(/\/$/, "") : "/");
  }, [pathname]);

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

  useReveal(".section-head, .about > *, .svc-card, .value, .split > *, .review, .member, .cat-panels, .virtual__intro, .vcard, .accred__card, .faq-wrap > *, .cta", pathname + search);

  const [chatOpen, setChatOpen] = useState(false);
  const isHome = pathname === "/";
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header scrolled={scrollY > 60} />
      <main id="main" tabIndex={-1}><Outlet /></main>
      <WhatsAppFab visible={scrollY > (isHome ? viewport * 0.6 : 240) && !overlapping && !chatOpen} />
      <Assistant onOpenChange={setChatOpen} />
      <Footer />
    </>
  );
}

/** All routes; used by the browser app and by the build-time pre-renderer. */
export function AppRoutes() {
  return (
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
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </BrowserRouter>
  );
}
