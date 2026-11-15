// All editable site content lives here.
// Replace the placeholders (phone, address, HMOs, team, reviews) with real details.

export const img = (name) => `${import.meta.env.BASE_URL}assets/img/${name}`;

export const clinic = {
  name: "Bozid Dental",
  fullName: "Bozid Dental Clinic",
  tagline: "Gentle, modern dentistry for the whole family.",
  phoneDisplay: "+234 800 000 0000",
  phoneHref: "tel:+2348000000000",
  whatsapp: "https://wa.me/2348000000000?text=" + encodeURIComponent("Hello Bozid Dental, I'd like to book an appointment."),
  email: "hello@boziddental.com",
  addressLines: ["12 Smile Avenue", "Your City, Nigeria"],
  hoursShort: "Mon–Fri 8:00–18:00 · Sat 9:00–14:00",
  hours: ["Mon–Fri 8:00–18:00", "Sat 9:00–14:00", "Sun closed"],
};

export const nav = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why us" },
  { href: "#team", label: "Team" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export const heroSlides = [
  {
    image: "hero-1.jpg",
    alt: "Dentist chatting with a father and his young son",
    position: "80% center",
    nav: "Care for the whole family",
    tag: "Family dentistry",
    title: "Gentle care for the whole family.",
    text: "From first baby teeth to grandparents' check-ups: one friendly team that gets to know your family by name.",
    cta: "Book a family visit",
  },
  {
    image: "hero-2.jpg",
    alt: "Dentist explaining an X-ray to a father and his daughter",
    position: "22% center",
    nav: "Every option explained",
    tag: "Honest advice",
    title: "Every option explained before we begin.",
    text: "Clear treatment plans, upfront prices and time for all your questions. No pressure, ever.",
    cta: "Book a consultation",
    service: "Not sure yet",
  },
  {
    image: "hero-3.jpg",
    alt: "Child during a gentle dental check-up",
    position: "50% center",
    nav: "Gentle with little ones",
    tag: "Kids' dentistry",
    title: "Happy visits for little smiles.",
    text: "Patient, playful care that helps children feel safe in the chair and build healthy habits for life.",
    cta: "Book a kids' check-up",
    service: "Kids' dentistry",
  },
  {
    image: "hero-4.jpg",
    alt: "Young woman with a bright, confident smile",
    position: "45% center",
    nav: "Smile with confidence",
    tag: "Cosmetic dentistry",
    title: "Smile brighter, feel more confident.",
    text: "Whitening, veneers and gentle cosmetic care that bring out the best in your natural smile.",
    cta: "Book a smile consultation",
    service: "Aesthetic dentistry",
  },
];

export const aboutPoints = [
  { title: "Care for all ages", text: "From a child's first visit to implants for grandparents, the whole family in one place." },
  { title: "Same-day emergencies", text: "We keep time free every day for toothache, swelling and broken teeth." },
  { title: "Flexible payment", text: "Clear estimates up front and monthly plans for larger treatments." },
];

export const services = [
  { slug: "hygiene", title: "Check-ups & hygiene", service: "Check-up & hygiene", text: "Thorough exams, low-dose digital X-rays and a professional clean that keeps gums healthy and stops small problems from growing." },
  { slug: "aesthetic", title: "Aesthetic dentistry", text: "Subtle reshaping, bonding and contouring that brings balance to your smile while keeping it looking natural." },
  { slug: "veneers", title: "Veneers", text: "Thin, custom porcelain shells that fix chips, gaps, uneven shape or stubborn discolouration on the front teeth." },
  { slug: "whitening", title: "Teeth whitening", text: "Safe in-chair or take-home whitening that lifts your shade noticeably without harming enamel." },
  { slug: "implants", title: "Dental implants", text: "A lasting replacement for one, several or all missing teeth that looks, feels and works like the real thing." },
  { slug: "ortho", title: "Clear aligners", text: "Nearly invisible aligners that straighten teeth and correct your bite, for teens and adults." },
  { slug: "braces", title: "Braces", text: "Modern metal or tooth-coloured braces for predictable, steady results on more complex cases." },
  { slug: "extraction", title: "Wisdom tooth removal", text: "Calm, carefully numbed removal of problem wisdom teeth, with clear aftercare so you heal quickly." },
  { slug: "surgery", title: "Oral surgery", text: "Gentle surgical care, from difficult extractions to bone grafting, so your mouth is ready for lasting treatment." },
];

export const extraServices = ["Root canal & fillings", "Crowns & bridges", "Kids' dentistry", "Gum care"];

// Options for the booking form's service dropdown
export const serviceOptions = [
  ...services.map((s) => s.service || s.title),
  "Root canal / filling",
  "Kids' dentistry",
  "Emergency",
  "Not sure yet",
];

export const whyUs = [
  { image: "value-1.jpg", kicker: "Skill you can trust", title: "Experienced clinicians", text: "A team with years of hands-on experience who keep training in the latest techniques." },
  { image: "value-2.jpg", kicker: "Precise from day one", title: "Modern technology", text: "Digital scans and imaging for accurate diagnosis and fewer, shorter appointments." },
  { image: "value-3.jpg", kicker: "Calm, not clinical", title: "Comfort-focused care", text: "Gentle numbing, sedation options and a relaxed pace, especially for nervous patients." },
  { image: "value-4.jpg", kicker: "Built around you", title: "Patient-centred plans", text: "We listen first, explain every option and cost, and never push treatment you don't need." },
];

// Only list HMOs you actually work with
export const hmos = ["HMO partner", "HMO partner", "HMO partner", "HMO partner", "HMO partner"];

export const steps = [
  { title: "Book online or call", text: "Pick a time that suits you. We confirm within one business day." },
  { title: "Exam & consultation", text: "A full check-up and an honest conversation about your goals." },
  { title: "Your personal plan", text: "Clear options, timelines and costs, with no pressure." },
];

// Sample reviews: replace with real testimonials (with patient permission)
export const reviews = [
  { text: "I used to dread the dentist. The team explained everything and I didn't feel a thing. I actually look forward to check-ups now.", name: "Patient name", detail: "Cleaning & fillings" },
  { text: "My implant looks and feels completely natural. Everything was on time and exactly the price I was quoted.", name: "Patient name", detail: "Dental implant" },
  { text: "Our kids love coming here. The staff are patient, fun and genuinely kind. Highly recommended for families.", name: "Patient name", detail: "Family patient" },
];

// Use real photos of your own staff
export const team = [
  { image: "team-1.jpg", name: "Dr. [Name] Bozid", role: "Lead dentist · Restorative & implants", badge: "Founder" },
  { image: "team-2.jpg", name: "Dr. [Name]", role: "Orthodontist · Aligners & braces" },
  { image: "team-3.jpg", name: "Dr. [Name]", role: "Paediatric dentist" },
  { image: "team-4.jpg", name: "[Name]", role: "Dental hygienist" },
];

export const faqs = [
  { q: "Are you accepting new patients?", a: "Yes. We welcome new patients of all ages. Book online or call to schedule your first exam." },
  { q: "Do you accept HMOs and health insurance?", a: "Yes. We work with many HMOs and private health plans. Bring your HMO card or ID and we'll confirm what your plan covers before any treatment." },
  { q: "What should I do in a dental emergency?", a: "Call us right away. We keep time free every day for urgent cases like severe pain, swelling or a knocked-out tooth." },
  { q: "How often should I visit?", a: "For most people, a check-up and cleaning every six months. We may suggest more often depending on your oral health." },
  { q: "Do you offer payment plans?", a: "Yes. Flexible monthly plans are available for larger treatments such as implants and orthodontics." },
  { q: "How can I pay?", a: "Bank transfer, debit card (POS) or cash, plus HMO cover where it applies. You always get a clear estimate before treatment starts." },
];
