# Bozid Dental Clinic Website

A fast, responsive, single-page website for Bozid Dental Clinic, built with plain HTML, CSS and JavaScript. It has no build step and no dependencies.

## Sections
Full-screen hero · About · Services (9 numbered, expandable) · Why choose us (scrolling cards) · Insurance partners · First visit · Reviews · Team · Booking form · FAQ · Call-to-action banner · Footer

## Run locally
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

## Photos
Image slots use Pexels stock photos (see credits below), and the team slots use soft placeholders. To add real photos, replace a file with your own photo **using the same file name** (for example `assets/img/hero.jpg`). No code changes are needed.

- `hero-1…4.jpg`: the four hero slides, wide photos (about 1800×1200). Slides 1 and 4 are your own photos
- `service-*.jpg`: one per service (hygiene, aesthetic, veneers, whitening, implants, ortho, braces, extraction, surgery), about 800×600
- `value-1…4.jpg`: tall photos for the "Why choose us" cards (about 760×1010)
- `first-visit.jpg`: dentist with a patient (portrait)
- `team-1…4.jpg`: team portraits (portrait)
- `cta.jpg`: wide photo for the bottom banner

## Things to customise
Search the code for these placeholders and replace them:
- Phone and WhatsApp number `+234 800 000 0000` / `tel:+2348000000000` / `wa.me/2348000000000`
- Email `hello@boziddental.com`
- Address `12 Smile Avenue, Your City, Nigeria`
- Team names `[Name]`
- Sample reviews (use real testimonials, with patient permission)
- Opening hours
- HMO partner names (`HMO partner` ×5): list only HMOs you actually work with

The booking form currently opens the visitor's email client. To receive submissions directly, connect it to a form service (Formspree, Netlify Forms, etc.) in `js/main.js`.

## Deploy
Any static host works: GitHub Pages (Settings → Pages → deploy from `main`), Netlify or Vercel.

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
| service-hygiene.jpg | https://www.pexels.com/photo/5355705/ |
| service-aesthetic.jpg | https://www.pexels.com/photo/10883310/ |
| service-veneers.jpg | https://www.pexels.com/photo/36763563/ |
| service-whitening.jpg | https://www.pexels.com/photo/3845686/ |
| service-implants.jpg | https://www.pexels.com/photo/6502305/ |
| service-ortho.jpg | https://www.pexels.com/photo/3845985/ |
| service-braces.jpg | https://www.pexels.com/photo/6502309/ |
| service-extraction.jpg | https://www.pexels.com/photo/11756810/ |
| service-surgery.jpg | https://www.pexels.com/photo/16903641/ |
| value-1.jpg | https://www.pexels.com/photo/11756843/ |
| value-2.jpg | https://www.pexels.com/photo/3845680/ |
| value-3.jpg | https://www.pexels.com/photo/3881145/ |
| value-4.jpg | https://www.pexels.com/photo/16903232/ |

Team photos (`team-1…4.jpg`) are intentionally left as placeholders: use real photos of your own staff.
