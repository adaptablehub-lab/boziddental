// Build-time renderer: turns each route into static HTML so search engines and link previews see real content.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./App.jsx";

export * as seo from "./seo.js";
export { faqs } from "./data.js";

export function render(url) {
  return renderToString(
    <StaticRouter basename="/boziddental" location={`/boziddental${url}`} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </StaticRouter>
  );
}
