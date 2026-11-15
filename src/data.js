// All editable site content lives here.
// Contact details, hours, description and services come from the client discovery form.

export const img = (name) => `${import.meta.env.BASE_URL}assets/img/${name}`;
export const brand = (name) => `${import.meta.env.BASE_URL}assets/brand/${name}`;

const WHATSAPP_MAIN = "2348086622159"; // 0808 662 2159 (WhatsApp and call)
export const waLink = (text = "Hello Bozid Dental, I'd like to book an appointment.") =>
  `https://wa.me/${WHATSAPP_MAIN}?text=${encodeURIComponent(text)}`;

export const clinic = {
  name: "Bozid Dental",
  fullName: "Bozid Dental Clinic",
  tagline: "Your smile, our priority.",
  description:
    "Bozid Dental Clinic is a trusted dental clinic in Ibadan providing quality, affordable dental care in a friendly and comfortable environment. We offer preventive, restorative and cosmetic dental services, and our goal is to make quality dental care accessible while helping every patient maintain a healthy, confident smile.",
  phones: [
    { display: "0808 662 2159", href: "tel:+2348086622159", wa: "2348086622159", label: "Call & WhatsApp", call: true },
    { display: "0808 788 9495", href: "tel:+2348087889495", wa: "2348087889495", label: "Call & WhatsApp", call: true },
    { display: "0909 357 1213", href: null, wa: "2349093571213", label: "WhatsApp only", call: false },
  ],
  primaryPhone: { display: "0808 662 2159", href: "tel:+2348086622159" },
  whatsapp: waLink(),
  emails: ["boziddental@gmail.com", "pmbozid@gmail.com"],
  email: "boziddental@gmail.com",
  address: "Block 1, Plot 2, Opposite Capital Building/Foodco, Ring Road, Ibadan",
  addressLines: ["Block 1, Plot 2, Opposite Capital Building/Foodco", "Ring Road, Ibadan"],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Capital Building Foodco Ring Road Ibadan"),
  mapEmbed: "https://www.google.com/maps?output=embed&q=" + encodeURIComponent("Foodco Ring Road Ibadan"),
  hours: [
    { days: "Monday – Friday", time: "8:00am – 6:00pm" },
    { days: "Saturday", time: "9:00am – 5:00pm" },
    { days: "Sunday", time: "Closed" },
  ],
  hoursShort: "Mon–Fri 8am–6pm · Sat 9am–5pm",
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

export const footerLinks = [
  { to: "/about", label: "About us" },
  { to: "/services", label: "Services" },
  { to: "/team", label: "Our team" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
  { to: "/book", label: "Book an appointment" },
];

export const heroSlides = [
  {
    image: "hero-1.jpg",
    alt: "Dentist chatting with a father and his young son",
    position: "80% center",
    nav: "Care for the whole family",
    tag: "Family dentistry in Ibadan",
    title: "Quality dental care for the whole family.",
    text: "Friendly, affordable dental care in a comfortable environment, from routine check-ups to complete smile makeovers.",
    cta: "Book an appointment",
  },
  {
    image: "hero-2.jpg",
    alt: "Dentist explaining an X-ray to a father and his daughter",
    position: "22% center",
    nav: "Every option explained",
    tag: "Honest advice",
    title: "Every option explained before we begin.",
    text: "On-site dental X-rays, a clear treatment plan and time for all your questions. No pressure, ever.",
    cta: "Book a check-up",
    service: "Dental check-up",
  },
  {
    image: "hero-3.jpg",
    alt: "Child during a gentle dental check-up",
    position: "50% center",
    nav: "Gentle care for all ages",
    tag: "For all ages",
    title: "Gentle care from first teeth to golden years.",
    text: "Patient, caring dentistry for children, adults and seniors, so every visit feels calm and easy.",
    cta: "Book a family visit",
    service: "Dental check-up",
  },
  {
    image: "hero-4.jpg",
    alt: "Young woman with a bright, confident smile",
    position: "45% center",
    nav: "Smile with confidence",
    tag: "Cosmetic dentistry",
    title: "Smile brighter, feel more confident.",
    text: "Teeth whitening, veneers, crowns and Invisalign that bring out the best in your natural smile.",
    cta: "Book a smile consultation",
    service: "Teeth whitening",
  },
];

export const aboutPoints = [
  { title: "Quality, affordable care", text: "Making quality dental care accessible to everyone in our community." },
  { title: "Everything in one place", text: "Preventive, restorative and cosmetic treatments under one roof, including on-site X-rays." },
  { title: "Friendly & comfortable", text: "A warm, relaxed environment where every patient is treated with care." },
];

export const serviceCategories = [
  { id: "preventive", label: "Preventive", image: "cat-preventive.jpg", blurb: "Keep teeth and gums healthy and catch problems early." },
  { id: "restorative", label: "Restorative", image: "service-extraction.jpg", blurb: "Repair, strengthen or replace damaged and missing teeth." },
  { id: "cosmetic", label: "Cosmetic & orthodontic", image: "service-veneers.jpg", blurb: "Brighten, reshape and straighten your smile." },
];

export const services = [
  { slug: "checkup", category: "preventive", title: "Dental check-up", text: "A thorough examination of your teeth, gums and mouth to keep you healthy and spot small problems before they grow." },
  { slug: "scaling", category: "preventive", title: "Scaling & polishing", text: "Professional cleaning that removes plaque and tartar, freshens your breath and leaves teeth smooth and bright." },
  { slug: "radiography", category: "preventive", title: "Dental radiography (X-rays)", text: "On-site dental X-rays that show what can't be seen with the eye, for accurate diagnosis and planning." },
  { slug: "filling", category: "restorative", title: "Tooth filling", text: "Tooth-coloured fillings that repair cavities and small breaks, restoring strength and appearance." },
  { slug: "rootcanal", category: "restorative", title: "Root canal treatment", text: "Gentle treatment that removes infection from inside a tooth, relieves pain and saves the natural tooth." },
  { slug: "crowns", category: "restorative", title: "Dental crowns", text: "Custom caps that cover and protect weak, cracked or heavily filled teeth while looking natural." },
  { slug: "bridges", category: "restorative", title: "Dental bridges", text: "A fixed replacement for one or more missing teeth, anchored to the teeth on either side." },
  { slug: "dentures", category: "restorative", title: "Dentures", text: "Comfortable, natural-looking full or partial dentures that restore your smile and your bite." },
  { slug: "implants", category: "restorative", title: "Dental implants", text: "A long-lasting replacement for missing teeth that looks, feels and works like a natural tooth." },
  { slug: "extraction", category: "restorative", title: "Tooth extraction", text: "Careful, well-numbed removal of teeth that can't be saved, with clear aftercare advice." },
  { slug: "whitening", category: "cosmetic", title: "Teeth whitening", text: "Safe, professional whitening that lifts stains and brightens your smile noticeably." },
  { slug: "veneers", category: "cosmetic", title: "Veneers", text: "Thin custom shells that fix chips, gaps, uneven shape or discolouration on the front teeth." },
  { slug: "orthodontics", category: "cosmetic", title: "Orthodontics", text: "Braces and orthodontic treatment that straighten teeth and correct your bite." },
  { slug: "invisalign", category: "cosmetic", title: "Invisalign", text: "Nearly invisible clear aligners that gradually straighten teeth, with no metal brackets or wires." },
];

// Options for the booking form's service dropdown
export const serviceOptions = [...services.map((s) => s.title), "Virtual consultation", "Not sure yet"];

export const whyUs = [
  { image: "value-1.jpg", kicker: "Care you can trust", title: "Experienced team", text: "Skilled, caring dental professionals focused on getting things right for you." },
  { image: "value-2.jpg", kicker: "Accurate from day one", title: "On-site X-rays", text: "Dental radiography in the clinic for accurate diagnosis and clear treatment plans." },
  { image: "value-3.jpg", kicker: "Calm, not clinical", title: "Comfortable environment", text: "A friendly, relaxed space and a gentle approach, especially for nervous patients." },
  { image: "value-4.jpg", kicker: "Accessible to all", title: "Quality, affordable care", text: "Our goal is to make quality dental care accessible to every patient." },
  { image: "value-5.jpg", kicker: "Book in minutes", title: "Easy WhatsApp booking", text: "Request an appointment online or on WhatsApp, and our team confirms it with you directly." },
];

// Accreditations: confirm each one with the clinic and fill in the real registration numbers.
// Don't publish until confirmed, and don't add regulator logos without their permission.
export const accreditations = [
  {
    body: "Medical and Dental Council of Nigeria (MDCN)",
    short: "MDCN",
    scope: "National regulator",
    text: "Our dentists are registered and licensed to practise by the Medical and Dental Council of Nigeria.",
    ref: "Licence no. [to be confirmed]",
  },
  {
    body: "Oyo State Ministry of Health",
    short: "Oyo State",
    scope: "State regulator",
    text: "Bozid Dental Clinic is a registered private health facility with the Oyo State Ministry of Health.",
    ref: "Facility reg. no. [to be confirmed]",
  },
];

// Virtual services (not in the discovery form: confirm with the clinic what they offer)
export const virtualServices = [
  { icon: "video", title: "Video consultation", text: "Speak with our team on a WhatsApp video call about symptoms, treatment options or a second opinion." },
  { icon: "camera", title: "Photo assessment", text: "Send clear photos of your teeth or concern, and we'll advise on next steps and how soon you should come in." },
  { icon: "chat", title: "Aftercare check-ins", text: "Ask questions after your treatment and get recovery advice from home, without another trip." },
  { icon: "plan", title: "Treatment planning", text: "Talk through your treatment plan and costs before you visit, so your appointment is quick and clear." },
];

export const steps = [
  { title: "Request a visit", text: "Send the booking form or message us on WhatsApp with a time that suits you." },
  { title: "We confirm", text: "Our team calls or messages you to confirm your appointment." },
  { title: "Visit & plan", text: "A thorough check-up and a clear, honest plan for your smile." },
];

// Sample reviews: replace with real testimonials (with patient permission)
export const reviews = [
  { text: "I used to dread the dentist. The team explained everything and I didn't feel a thing. I actually look forward to check-ups now.", name: "Patient name", detail: "Scaling & polishing" },
  { text: "My new crown looks completely natural. The staff were friendly and everything was explained clearly from start to finish.", name: "Patient name", detail: "Dental crown" },
  { text: "Our whole family comes here now. They are patient with the children and genuinely kind. Highly recommended.", name: "Patient name", detail: "Family patient" },
  { text: "Booking on WhatsApp was so easy, and they confirmed my appointment the same day.", name: "Patient name", detail: "Dental check-up" },
];

// Team profiles. The client asked for qualifications, specialties, years of experience and a short bio.
// Replace the [placeholders] and add real photos of your own staff.
export const team = [
  {
    image: "team-1.jpg", name: "Dr. Ibrahim A. Oyediran", role: "Executive Director",
    qualifications: "[Qualifications]", specialties: "[Specialties]", years: "[Years]",
    bio: "[Short biography]",
  },
  { image: "team-2.jpg", name: "Dr. [Name]", role: "Dentist", qualifications: "[Qualifications]", specialties: "[Specialties]", years: "[Years]", bio: "[Short biography]" },
  { image: "team-3.jpg", name: "Dr. [Name]", role: "Dentist", qualifications: "[Qualifications]", specialties: "[Specialties]", years: "[Years]", bio: "[Short biography]" },
  { image: "team-4.jpg", name: "[Name]", role: "Dental hygienist", qualifications: "[Qualifications]", specialties: "[Specialties]", years: "[Years]", bio: "[Short biography]" },
];

export const faqs = [
  { q: "Are you accepting new patients?", a: "Yes. We welcome patients of all ages. Request an appointment online or send us a WhatsApp message." },
  { q: "How does booking work?", a: "Send the booking form on our website (or message us on WhatsApp) with your preferred date. Our team will then call or message you to confirm your appointment." },
  { q: "Where are you located?", a: "We're at Block 1, Plot 2, Opposite Capital Building/Foodco, Ring Road, Ibadan." },
  { q: "What are your opening hours?", a: "Monday to Friday, 8:00am to 6:00pm, and Saturday, 9:00am to 5:00pm." },
  { q: "Do you list your prices?", a: "Every treatment is tailored to the patient, so we explain your options and costs clearly at your consultation, before any treatment begins." },
  { q: "I have tooth pain. What should I do?", a: "Call or WhatsApp us and describe the problem. We'll advise you and arrange the earliest available appointment." },
  { q: "How often should I visit the dentist?", a: "For most people, a check-up and scaling & polishing every six months. We may suggest a different schedule depending on your oral health." },
];
