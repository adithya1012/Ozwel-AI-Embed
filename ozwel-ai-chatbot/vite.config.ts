import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4173,
    host: "0.0.0.0",
    allowedHosts: ["ozwel-ai-embed.opensource.mieweb.org"],
  },
});
