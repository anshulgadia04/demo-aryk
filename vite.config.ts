import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Allow all IPv6 addresses
    port: 8081,
    allowedHosts: [
      '.ngrok-free.app',  // Add the exact ngrok URL
      'all',  // Optionally, you can keep this to allow all hosts
    ],
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
