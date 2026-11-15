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
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export const footerLinks = [
  { to: "/about", label: "About us" },
  { to: "/services", label: "Services" },
  { to: "/team", label: "Our team" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faqs", label: "FAQs" },
  { to: "/blog", label: "Blog" },
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
  { id: "preventive", label: "Preventive", blurb: "Keep teeth and gums healthy and catch problems early." },
  { id: "restorative", label: "Restorative", blurb: "Repair, strengthen or replace damaged and missing teeth." },
  { id: "cosmetic", label: "Cosmetic & orthodontic", blurb: "Brighten, reshape and straighten your smile." },
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
export const serviceOptions = [...services.map((s) => s.title), "Not sure yet"];

export const whyUs = [
  { image: "value-1.jpg", kicker: "Care you can trust", title: "Experienced team", text: "Skilled, caring dental professionals focused on getting things right for you." },
  { image: "value-2.jpg", kicker: "Accurate from day one", title: "On-site X-rays", text: "Dental radiography in the clinic for accurate diagnosis and clear treatment plans." },
  { image: "value-3.jpg", kicker: "Calm, not clinical", title: "Comfortable environment", text: "A friendly, relaxed space and a gentle approach, especially for nervous patients." },
  { image: "value-4.jpg", kicker: "Accessible to all", title: "Quality, affordable care", text: "Our goal is to make quality dental care accessible to every patient." },
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

// Gallery. Add real photos to public/assets/img/gallery/ and list them here.
// Before & after photos need written consent from the patient.
export const gallery = {
  beforeAfter: [
    // { title: "Teeth whitening", before: "gallery/whitening-before.jpg", after: "gallery/whitening-after.jpg" },
  ],
  facilities: [
    // { image: "gallery/reception.jpg", caption: "Our reception" },
  ],
};

export const blogPosts = [
  {
    slug: "how-often-should-you-visit-the-dentist",
    title: "How often should you visit the dentist?",
    date: "2026-11-10",
    image: "service-checkup.jpg",
    excerpt: "Regular check-ups are the simplest way to keep your teeth healthy. Here's how often to come in, and why it matters.",
    body: [
      "For most adults and children, a dental check-up every six months is a good rhythm. It gives your dentist the chance to spot small problems, such as early decay or gum inflammation, while they are still quick and simple to treat.",
      "Some people benefit from more frequent visits, for example if you have gum disease, a history of cavities, or wear braces. Others with excellent oral health may be advised to come a little less often. Your dentist will recommend the right schedule for you.",
      "A typical check-up includes an examination of your teeth, gums and mouth, and X-rays when needed. It's also a good time to ask questions about brushing, flossing, diet or any changes you've noticed.",
      "Don't wait for pain. Many dental problems develop quietly, so regular visits are the best way to keep your smile healthy and avoid bigger treatment later.",
    ],
  },
  {
    slug: "scaling-and-polishing-what-to-expect",
    title: "Scaling and polishing: what to expect",
    date: "2026-11-03",
    image: "service-scaling.jpg",
    excerpt: "A professional clean removes the build-up that brushing can't reach. Here's what happens during scaling and polishing.",
    body: [
      "Even with careful brushing, plaque can harden into tartar (calculus), especially along the gum line. Tartar can't be removed with a toothbrush, and over time it can irritate the gums and lead to gum disease.",
      "During scaling, your dentist or hygienist gently removes tartar from the surfaces of your teeth and just below the gum line. Polishing then smooths the teeth and removes surface stains, leaving them feeling clean and fresh.",
      "Most people find scaling comfortable. If your gums are sensitive, let your dentist know so they can take extra care. You may notice slight sensitivity for a day or two afterwards, which usually settles quickly.",
      "Regular scaling and polishing, usually every six months, helps keep your gums healthy, freshens your breath and keeps your smile looking its best.",
    ],
  },
  {
    slug: "is-teeth-whitening-safe",
    title: "Is teeth whitening safe?",
    date: "2026-10-27",
    image: "service-whitening.jpg",
    excerpt: "Professional whitening can brighten your smile safely. Here's what to know before you start.",
    body: [
      "Professional teeth whitening, carried out or supervised by a dentist, is a safe and effective way to lighten stains caused by food, drinks, smoking and age.",
      "Before whitening, your dentist will check that your teeth and gums are healthy. Problems such as cavities or gum disease should be treated first, and existing crowns, veneers or fillings won't change colour, which is worth planning for.",
      "Some people feel temporary sensitivity during or after whitening. Your dentist can adjust the treatment and recommend products to keep you comfortable.",
      "Avoid unregulated whitening products bought online, which can contain harmful ingredients or damage your enamel and gums. If you'd like a brighter smile, book a consultation and we'll recommend the best option for you.",
    ],
  },
];
