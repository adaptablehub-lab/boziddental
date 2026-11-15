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
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
