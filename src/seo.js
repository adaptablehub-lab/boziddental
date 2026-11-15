// SEO settings shared by the app (client-side navigation) and the build-time pre-renderer.
// If the site moves to its own domain (e.g. https://boziddental.com), change SITE_URL and BASE_PATH.
import { clinic, services } from "./data.js";

export const SITE_URL = "https://adaptablehub-lab.github.io";
export const BASE_PATH = "/boziddental";
export const SITE_NAME = "Bozid Dental Clinic";

export const absUrl = (path = "/") => `${SITE_URL}${BASE_PATH}${path === "/" ? "/" : path.replace(/\/?$/, "/")}`;
export const assetUrl = (file) => `${SITE_URL}${BASE_PATH}/assets/${file}`;

const DEFAULT_IMAGE = "img/og-image.jpg"; // 1200×630 for WhatsApp / Facebook / X previews

/** Per-page titles and descriptions (keep titles under ~60 characters, descriptions under ~160). */
export const pages = {
  "/": {
    title: "Bozid Dental Clinic, Ibadan | Your smile, our priority",
    description: "Quality, affordable dental care in Ibadan for the whole family. Check-ups, scaling & polishing, fillings, root canal, crowns, implants, whitening and Invisalign. Book online or on WhatsApp.",
    image: "img/og-image.jpg",
  },
  "/about": {
    title: "About us | Bozid Dental Clinic, Ibadan",
    description: "A trusted dental clinic on Ring Road, Ibadan, providing quality, affordable care in a friendly, comfortable environment, with on-site dental X-rays.",
    image: "img/hero-5.jpg",
  },
  "/services": {
    title: "Dental services in Ibadan | Bozid Dental Clinic",
    description: `Preventive, restorative and cosmetic dentistry in Ibadan: ${services.map((s) => s.title.toLowerCase()).slice(0, 8).join(", ")} and more.`,
    image: "img/service-checkup.jpg",
  },
  "/team": {
    title: "Meet the team | Bozid Dental Clinic, Ibadan",
    description: "Meet the caring, experienced dental professionals at Bozid Dental Clinic, Ring Road, Ibadan.",
    // Hidden from search until the team profiles have real names, photos and details. Remove this line then.
    noindex: true,
  },
  "/reviews": {
    title: "Patient reviews | Bozid Dental Clinic, Ibadan",
    description: "What patients say about their care at Bozid Dental Clinic, Ibadan.",
  },
  "/faqs": {
    title: "FAQs | Bozid Dental Clinic, Ibadan",
    description: "Answers about booking, opening hours, location, costs and what to expect at Bozid Dental Clinic, Ring Road, Ibadan.",
  },
  "/contact": {
    title: "Contact & directions | Bozid Dental Clinic, Ibadan",
    description: `Call or WhatsApp ${clinic.primaryPhone.display}, or visit us at ${clinic.address}. Open Mon–Fri 8am–6pm, Sat 9am–5pm.`,
  },
  "/book": {
    title: "Book a dental appointment in Ibadan | Bozid Dental Clinic",
    description: "Request a dental appointment online or on WhatsApp. Our team will call or message you to confirm.",
  },
};

export const notFound = {
  title: "Page not found | Bozid Dental Clinic, Ibadan",
  description: "Sorry, we couldn't find that page.",
  noindex: true,
};

export function metaFor(path) {
  const p = pages[path] || notFound;
  return { ...p, url: pages[path] ? absUrl(path) : null, image: assetUrl(p.image || DEFAULT_IMAGE) };
}

/** schema.org structured data so search engines understand the clinic (shown in Google's local results). */
export function dentistSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: SITE_NAME,
    alternateName: clinic.name,
    slogan: clinic.tagline,
    description: clinic.description,
    url: absUrl("/"),
    logo: assetUrl("brand/logo.png"),
    image: [assetUrl("img/hero-1.jpg"), assetUrl("img/hero-5.jpg")],
    telephone: clinic.phones.filter((p) => p.call).map((p) => p.href.replace("tel:", "")),
    email: clinic.emails,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Block 1, Plot 2, Opposite Capital Building/Foodco, Ring Road",
      addressLocality: "Ibadan",
      addressRegion: "Oyo",
      addressCountry: "NG",
    },
    areaServed: { "@type": "City", name: "Ibadan" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "17:00" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dental services",
      itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.text } })),
    },
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
