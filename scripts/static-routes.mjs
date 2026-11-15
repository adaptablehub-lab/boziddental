// GitHub Pages has no server-side routing, so give every page its own index.html.
// This makes direct links (e.g. /boziddental/services) return 200 instead of the 404 fallback.
import { mkdirSync, copyFileSync } from "node:fs";

const routes = ["about", "services", "team", "reviews", "faqs", "contact", "book"];

for (const r of routes) {
  mkdirSync(`dist/${r}`, { recursive: true });
  copyFileSync("dist/index.html", `dist/${r}/index.html`);
}
copyFileSync("dist/index.html", "dist/404.html");
console.log(`static routes: ${routes.length} pages + 404.html`);
