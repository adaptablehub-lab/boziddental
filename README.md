# Bozid Dental Clinic Website

A fast, responsive, single-page website for Bozid Dental Clinic, built with plain HTML, CSS and JavaScript. It has no build step and no dependencies.

## Sections
Full-screen hero · About · Services (expandable cards) · Our promise (scrolling numbered cards) · Insurance partners · First visit · Reviews · Team · Booking form · FAQ · Call-to-action banner · Footer

## Run locally
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

## Photos
Every image slot uses a soft placeholder in `assets/img/`. To add real photos, replace a file with your own photo **using the same file name** (for example `assets/img/hero.jpg`). No code changes are needed.

- `hero.jpg`: wide treatment-room or smiling-patient photo (about 1600×1000)
- `service-*.jpg`: one per service card (about 700×770)
- `value-1…4.jpg`: tall photos for the promise cards (about 760×1010)
- `first-visit.jpg`: dentist with a patient (portrait)
- `team-1…4.jpg`: team portraits (portrait)
- `cta.jpg`: wide photo for the bottom banner

## Things to customise
Search the code for these placeholders and replace them:
- Phone number `+1 (000) 000-0000` / `tel:+10000000000`
- Email `hello@boziddental.com`
- Address `123 Smile Avenue, Your City`
- Team names `[Name]`
- Sample reviews (use real testimonials, with patient permission)
- Opening hours
- Insurance partner names (`Insurer One` … `Insurer Five`)

The booking form currently opens the visitor's email client. To receive submissions directly, connect it to a form service (Formspree, Netlify Forms, etc.) in `js/main.js`.

## Deploy
Any static host works: GitHub Pages (Settings → Pages → deploy from `main`), Netlify or Vercel.
