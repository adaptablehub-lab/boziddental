# Bozid Dental Clinic Website

A fast, responsive, single-page website for Bozid Dental Clinic, built with plain HTML, CSS and JavaScript. It has no build step and no dependencies.

## Sections
Hero · Services · About · First visit steps · Team · Reviews slider · Booking form · FAQ · Hours & contact

## Run locally
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

## Things to customise
Search the code for these placeholders and replace them:
- Phone number `+1 (000) 000-0000` / `tel:+10000000000`
- Email `hello@boziddental.com`
- Address `123 Smile Avenue, Your City`
- Team names `[Name]`
- Sample reviews (use real testimonials, with patient permission)
- Opening hours

The booking form currently opens the visitor's email client. To receive submissions directly, connect it to a form service (Formspree, Netlify Forms, etc.) in `js/main.js`.

## Deploy
Any static host works: GitHub Pages (Settings → Pages → deploy from `main`), Netlify or Vercel.
