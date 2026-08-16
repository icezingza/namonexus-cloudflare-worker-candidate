import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "client/src"),
      "@shared": path.resolve(process.cwd(), "shared"),
    },
  },
  test: {
    environment: "node",
    include: ["server/**/*.test.ts", "worker.test.ts"],
    exclude: ["node_modules", "dist"],
  },
});
