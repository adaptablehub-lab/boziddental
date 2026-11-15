// Keeps <head> tags in sync with the current page during client-side navigation.
import { metaFor } from "./seo.js";

function upsert(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) { el = create(); document.head.appendChild(el); }
  return el;
}
const meta = (attr, key, content) => {
  const el = upsert(`meta[${attr}="${key}"]`, () => Object.assign(document.createElement("meta"), { [attr === "name" ? "name" : "content"]: "" }));
  el.setAttribute(attr, key);
  el.setAttribute("content", content);
};

export function applyHead(path) {
  const m = metaFor(path);
  document.title = m.title;
  meta("name", "description", m.description);
  meta("name", "robots", m.noindex ? "noindex, follow" : "index, follow");
  meta("property", "og:title", m.title);
  meta("property", "og:description", m.description);
  meta("property", "og:image", m.image);
  meta("name", "twitter:title", m.title);
  meta("name", "twitter:description", m.description);
  meta("name", "twitter:image", m.image);
  const canonical = upsert('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }));
  if (m.url) { canonical.href = m.url; meta("property", "og:url", m.url); } else canonical.remove();
}
