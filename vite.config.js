import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";

// 將本地端變成 localhost:port
dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
