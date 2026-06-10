// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// When building for GitHub Pages we need a static-prerendered output and a
// base path that matches the repo subpath (https://<user>.github.io/<repo>/).
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBase = process.env.GITHUB_PAGES_BASE ?? "/selam9x/";

export default defineConfig({
  vite: {
    base: isGithubPages ? repoBase : "/",
    server: {
      host: "0.0.0.0",
      port: 5000,
      allowedHosts: true,
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  // GitHub Pages is static-only — switch nitro to the github_pages preset
  // so the build prerenders into .output/public/ instead of producing a
  // Cloudflare Worker bundle that Pages can't run.
  nitro: isGithubPages
    ? {
        preset: "github_pages",
        prerender: { crawlLinks: true, routes: ["/"] },
      }
    : undefined,
});
