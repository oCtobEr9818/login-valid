import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
import commonjs from "vite-plugin-commonjs";

// 將本地端變成 localhost:port
dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 加入這段才能使用CanvasJS
    commonjs({
      filter(id) {
        if (
          id.includes("./src/assets/canvasjs-chart-3.7.19/canvasjs.react.js")
        ) {
          return true;
        }
      },
    }),
  ],
});
