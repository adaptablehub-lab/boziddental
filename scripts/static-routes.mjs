// GitHub Pages has no server-side routing, so give every page its own index.html.
// This makes direct links (e.g. /boziddental/services) return 200 instead of the 404 fallback.
import { readFileSync, mkdirSync, copyFileSync } from "node:fs";

const routes = ["about", "services", "team", "gallery", "reviews", "faqs", "blog", "contact", "book"];
const data = readFileSync(new URL("../src/data.js", import.meta.url), "utf8");
const blog = data.slice(data.indexOf("export const blogPosts"));
for (const m of blog.matchAll(/slug:\s*"([^"]+)"/g)) routes.push(`blog/${m[1]}`);

for (const r of routes) {
  mkdirSync(`dist/${r}`, { recursive: true });
  copyFileSync("dist/index.html", `dist/${r}/index.html`);
}
copyFileSync("dist/index.html", "dist/404.html");
console.log(`static routes: ${routes.length} pages + 404.html`);
