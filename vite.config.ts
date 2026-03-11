import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Use the repo name when served from GitHub Pages (https://<user>.github.io/<repo>/)
  // Change to "/" if you later set a custom domain.
  base: "/prop-sheet/",
  plugins: [react()],
  server: {
    port: 5173
  }
});
