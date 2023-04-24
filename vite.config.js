import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    https: {
      key: fs.readFileSync("./localhost-key.pem"),
      cert: fs.readFileSync("./localhost.pem"),
    },
  },
  plugins: [react(), mkcert()],
});
