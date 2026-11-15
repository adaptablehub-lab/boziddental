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
Image slots use Pexels stock photos (see credits below), and the team slots use soft placeholders. To add real photos, replace a file in `public/assets/img/` with your own photo **using the same file name** (for example `hero-1.jpg`). No code changes are needed: the build automatically creates the smaller WebP versions the site actually serves.

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

## Performance
- Photos are served as **WebP** (about 75% smaller than JPEG), generated automatically at build time by `scripts/images.mjs`. The `.jpg` originals stay for social previews.
- Photos **lazy-load** as they approach the screen; only the first hero slide loads with the page (and is preloaded on the home page). The home page's first load dropped from ~2.4 MB of images to ~0.2 MB.
- JavaScript ~67 KB and CSS ~8 KB (gzipped).

## Accessibility
- Checked with axe-core (WCAG 2.2 AA): no violations on any page.
- Keyboard: skip link, visible focus, focus moves to the new page's content after navigation, Escape closes the menu.
- The hero slideshow has a pause/play button and respects "reduce motion".
- Colour contrast meets AA, including the WhatsApp buttons (a darker WhatsApp green).

## SEO
- **Pre-rendered pages:** `npm run build` renders every page to real HTML (`src/entry-server.jsx` + `scripts/prerender.mjs`), so search engines and WhatsApp/social link previews see the full content. The app then takes over in the browser.
- **Per-page titles, descriptions and social tags** live in `src/seo.js` (`pages`). Keep titles under ~60 characters and descriptions under ~160.
- **Structured data:** every page includes schema.org `Dentist` data (name, address, phones, hours, services); the home and FAQ pages also include `FAQPage` data.
- **Social previews:** `og-image.jpg` (1200×630) for WhatsApp/Facebook/X link previews.
- **Team page** is marked `noindex` (hidden from Google) until real staff details are added. Remove `noindex: true` for `/team` in `src/seo.js` then.
- **Sitemap & robots:** `sitemap.xml` and `robots.txt` are generated at build time. On GitHub Pages the robots.txt sits under `/boziddental/`, so submit the sitemap directly in Google Search Console: https://adaptablehub-lab.github.io/boziddental/sitemap.xml
- **Moving to a custom domain:** update `SITE_URL` and `BASE_PATH` in `src/seo.js`, `base` in `vite.config.js`, and the `basename` in `src/App.jsx` / `src/entry-server.jsx`.
- **Next steps for the clinic:** create a Google Business Profile with the same name, address and phone numbers, and add the site link there.

## Virtual assistant (AI)
A chat button ("Ask us") on every page answers questions about the clinic's services, hours, location and booking, and hands over to WhatsApp for anything else.

- **How it works:** the widget (`src/components/Assistant.jsx`) sends the chat to a small Cloudflare Worker (`worker/`), which calls Claude (`claude-opus-5-5`) with the Claude API key kept secret on the server. The assistant's knowledge and rules are built from `src/data.js` in `src/assistant/knowledge.js`, so editing the site content updates the assistant too.
- **Safety rules:** it only states facts from the site, never quotes prices, never diagnoses or recommends medicine, sends urgent symptoms to emergency care, and can't book or confirm appointments (it links to the booking page and WhatsApp). Server-side fallbacks are on: if Claude's safety filter declines a normal question, the API retries it on Anthropic's recommended fallback model.
- **Without the Worker** (or if it is down), the widget still works with instant offline answers from the same data.

### Set it up (one time)
1. Create a Claude API key at https://console.anthropic.com (add billing; you pay per message).
2. Create a free Cloudflare account, then in `worker/` (Node 22+):
   ```bash
   npm install
   npx wrangler login
   npx wrangler secret put ANTHROPIC_API_KEY
   npx wrangler deploy
   ```
   Wrangler prints the Worker address, e.g. `https://bozid-assistant.<you>.workers.dev`.
3. In GitHub: repo **Settings → Secrets and variables → Actions → Variables**, add `ASSISTANT_URL` with that address, then re-run the deploy (or push).
4. If the site moves to its own domain, add it to `ALLOWED_ORIGINS` in `worker/wrangler.toml` and deploy the Worker again.

To try it locally, create `.env.local` with `VITE_ASSISTANT_URL=http://localhost:8787` and run `npm run dev` here and in `worker/` (put the key in `worker/.dev.vars` as `ANTHROPIC_API_KEY=...`; never commit it).

Tip: set a monthly spend limit in the Claude Console, and a rate-limiting rule for the Worker in Cloudflare to stop abuse.

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
| hero-5.jpg | https://www.pexels.com/photo/6812453/ |
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
