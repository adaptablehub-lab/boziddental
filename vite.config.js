import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://adaptablehub-lab.github.io/boziddental/
export default defineConfig({
  base: "/boziddental/",
  plugins: [react()],
  // bundle the router into the server build used for pre-rendering
  ssr: { noExternal: ["react-router-dom", "react-router"] },
});
