# Bozid Dental Clinic Website

A fast, responsive, single-page website for Bozid Dental Clinic, built with **React** and **Vite**.

## Pages
Home · About · Services (14, filterable) · Team · Reviews · FAQs · Contact · Book an appointment

Content follows the client discovery form (Oct 2026): contact details, hours, description, the 14 services offered, booking by form + confirmation, WhatsApp, no public prices.

## Run locally
Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173/boziddental/
npm run build      # production build in dist/
```

## Brand
Follows the *Bozid Dental Brand Guide*:
- **Colours:** Deep Blue `#0e113d` (primary), Turquoise Green `#48c2c5` (secondary), white and black. Tokens are at the top of `src/styles.css`.
- **Logo:** `public/assets/brand/logo.png` (full colour) and `logo-white.png` (for dark backgrounds), always used whole with clear space around it.
- **Smile asset:** `public/assets/brand/smile.png` / `smile-white.png`, used sparingly (CTA banner watermark, favicon).
- **Shapes:** rounded edges throughout; the deep-blue bar with a turquoise segment (from the letterhead and call cards) tops the booking form and footer.
- **Type:** Bariol Bold for headings and Helvetica Neue for body text. Bariol isn't a free web font, so **Nunito** stands in for it until a Bariol web-font licence is added (add an `@font-face` for "Bariol" and it takes over automatically).

## Where things live
- `src/data.js`: **all text and contact details**: phones, WhatsApp, emails, address, hours, services, FAQs, team and reviews. Edit this file to change content.
- `src/pages/index.jsx`: one component per page; routes are in `src/App.jsx`
- `src/components/`: one React component per section
- `src/styles.css`: all styling
- `public/assets/img/`: photos (replace a file with one of the same name to swap a photo)

## Photos
Image slots use Pexels stock photos (see credits below), and the team slots use soft placeholders. To add real photos, replace a file in `public/assets/img/` with your own photo **using the same file name** (for example `hero-1.jpg`). No code changes are needed.

- `hero-1…4.jpg`: the four hero slides, wide photos (about 1800×1200). Slides 1 and 4 are your own photos
- `service-*.jpg`: one per service (14), about 1000px wide
- `value-1…4.jpg`: tall photos for the "Why choose us" cards (about 760×1010)
- `first-visit.jpg`: dentist with a patient (portrait)
- `team-1…4.jpg`: team portraits (portrait)
- `cta.jpg`: wide photo for the bottom banner

## Still needed from the clinic (all in `src/data.js`)
- **Accreditations (`accreditations`):** confirm the clinic is registered with the Medical and Dental Council of Nigeria (MDCN) and the Oyo State Ministry of Health, and add the real licence/registration numbers. Don't publish these claims until confirmed, and only add regulator logos with their permission.
- **Virtual services (`virtualServices`):** not in the discovery form; confirm what the clinic actually offers.
- **Team:** the client was "not sure" about featuring staff. Profiles are set up with the fields they asked for (qualifications, specialties, years of experience, short bio) but need real details and photos, or remove the Team page from `nav`.
- **Reviews:** replace the sample testimonials with real ones (with permission).

The booking form sends the request through the patient's WhatsApp (to 0808 662 2159) or email app, and the clinic confirms. To receive submissions directly on a server, connect a form service (Formspree, Netlify Forms, etc.) in `src/components/Booking.jsx`.

## Deploy
Every push to `main` builds the site and publishes it to GitHub Pages automatically (see `.github/workflows/deploy.yml`).
Live site: https://adaptablehub-lab.github.io/boziddental/

## Photo credits
Stock photos are from [Pexels](https://www.pexels.com) and used under the [Pexels License](https://www.pexels.com/license/) (free to use, attribution not required). Replace them with your own clinic photos when you can.

| File | Pexels photo |
|---|---|
| hero-1.jpg | Provided by the clinic |
| hero-2.jpg | https://www.pexels.com/photo/6502163/ |
| hero-3.jpg | https://www.pexels.com/photo/6502555/ |
| hero-4.jpg | Provided by the clinic |
| cta.jpg | https://www.pexels.com/photo/287237/ |
| first-visit.jpg | https://www.pexels.com/photo/5355867/ |
| service-checkup.jpg | https://www.pexels.com/photo/5355705/ |
| service-veneers.jpg | https://www.pexels.com/photo/36763563/ |
| service-whitening.jpg | https://www.pexels.com/photo/3845686/ |
| service-implants.jpg | https://www.pexels.com/photo/6502305/ |
| service-invisalign.jpg | https://www.pexels.com/photo/3845985/ |
| service-orthodontics.jpg | https://www.pexels.com/photo/6502309/ |
| service-scaling.jpg | https://www.pexels.com/photo/16903478/ |
| service-radiography.jpg | https://www.pexels.com/photo/6501862/ |
| service-filling.jpg | https://www.pexels.com/photo/6627594/ |
| service-crowns.jpg | https://www.pexels.com/photo/33748061/ |
| service-bridges.jpg | https://www.pexels.com/photo/12712256/ |
| service-dentures.jpg | https://www.pexels.com/photo/6627607/ |
| service-extraction.jpg | https://www.pexels.com/photo/11756810/ |
| service-rootcanal.jpg | https://www.pexels.com/photo/16903641/ |
| value-1.jpg | https://www.pexels.com/photo/11756843/ |
| value-2.jpg | https://www.pexels.com/photo/3845680/ |
| value-3.jpg | https://www.pexels.com/photo/3881145/ |
| value-4.jpg | https://www.pexels.com/photo/16903232/ |
| value-5.jpg | https://www.pexels.com/photo/5915255/ |
| cat-preventive.jpg | https://www.pexels.com/photo/32644642/ |

Team photos (`team-1…4.jpg`) are intentionally left as placeholders: use real photos of your own staff.
