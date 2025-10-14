import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: "./index.html",
  },
  source: {
    entry: {
      index: "./src/main.tsx",
    },
  },
  output: {
    distPath: {
      root: "dist",
    },
    legalComments: "none",
    copy: [
      { from: "./robots.txt", to: "robots.txt" },
      { from: "./sitemap.xml", to: "sitemap.xml" },
      { from: "./images/Preview_Image.webp", to: "Preview_Image.webp" },
    ],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});