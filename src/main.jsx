import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Pages are pre-rendered to HTML at build time (for SEO); attach to that HTML instead of re-creating it.
// (In development the template only holds a placeholder comment, so render normally there.)
if (container.firstElementChild) hydrateRoot(container, app);
else { container.innerHTML = ""; createRoot(container).render(app); }
