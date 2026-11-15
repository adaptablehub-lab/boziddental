// Pre-renders every page to static HTML (with per-page SEO tags), then writes sitemap.xml and robots.txt.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const { render, seo, faqs } = await import(pathToFileURL(resolve("dist-ssr/entry-server.js")).href);

const template = readFileSync("dist/index.html", "utf8");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

function headFor(path) {
  const m = seo.metaFor(path);
  const tags = [
    `<meta name="robots" content="${m.noindex ? "noindex, follow" : "index, follow"}" />`,
    m.url && `<link rel="canonical" href="${m.url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(seo.SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_NG" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    m.url && `<meta property="og:url" content="${m.url}" />`,
    `<meta property="og:image" content="${m.image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${m.image}" />`,
    `<meta name="geo.region" content="NG-OY" />`,
    `<meta name="geo.placename" content="Ibadan" />`,
  ];
  // the home page's first hero photo is the largest thing on screen: start downloading it immediately
  if (path === "/") tags.unshift(`<link rel="preload" as="image" href="${seo.BASE_PATH}/assets/img/hero-1.webp" type="image/webp" fetchpriority="high" />`);
  if (!m.noindex) tags.push(jsonLd(seo.dentistSchema()));
  if (path === "/faqs" || path === "/") tags.push(jsonLd(seo.faqSchema(path === "/" ? faqs.slice(0, 4) : faqs)));
  return { m, head: tags.filter(Boolean).join("\n  ") };
}

function page(path, url = path) {
  const { m, head } = headFor(path);
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(m.description)}" />`)
    .replace("<!--seo-head-->", head)
    .replace("<!--app-html-->", render(url));
}

const routes = Object.keys(seo.pages);
for (const path of routes) {
  const dir = path === "/" ? "dist" : `dist${path}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, page(path));
}
writeFileSync("dist/404.html", page("/404", "/404"));

const today = new Date().toISOString().slice(0, 10);
const priority = (p) => (p === "/" ? "1.0" : p === "/services" || p === "/book" ? "0.9" : "0.7");
writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.filter((p) => !seo.pages[p].noindex).map((p) => `  <url><loc>${seo.absUrl(p)}</loc><lastmod>${today}</lastmod><priority>${priority(p)}</priority></url>`).join("\n")}
</urlset>
`);
writeFileSync("dist/robots.txt", `User-agent: *
Allow: /

Sitemap: ${seo.SITE_URL}${seo.BASE_PATH}/sitemap.xml
`);

rmSync("dist-ssr", { recursive: true, force: true });
console.log(`pre-rendered ${routes.length} pages + 404.html, sitemap.xml, robots.txt`);
