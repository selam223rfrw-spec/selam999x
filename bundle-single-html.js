#!/usr/bin/env node

import fs from "fs";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://selam999x.lovable.app";
const OUTPUT_FILE = "index-bundle.html";

// ---------------- FETCH ----------------
function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;

    lib.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchURL(res.headers.location));
      }

      let data = [];
      res.on("data", (c) => data.push(c));
      res.on("end", () => resolve(Buffer.concat(data).toString()));
    }).on("error", reject);
  });
}

// ---------------- BASE64 ----------------
function urlToDataUri(url, type = "application/octet-stream") {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;

    lib.get(url, (res) => {
      let chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const base64 = buffer.toString("base64");
        resolve(`data:${type};base64,${base64}`);
      });
    }).on("error", reject);
  });
}

// ---------------- CSS INLINE ----------------
async function inlineCSS(css, baseURL) {
  const urlRegex = /url\(([^)]+)\)/g;

  for (const match of css.matchAll(urlRegex)) {
    let raw = match[1].replace(/['"]/g, "");

    if (raw.startsWith("data:")) continue;

    try {
      const full = raw.startsWith("http")
        ? raw
        : new URL(raw, baseURL).href;

      const ext = raw.split(".").pop().toLowerCase();

      let type = "application/octet-stream";
      if (["png"].includes(ext)) type = "image/png";
      if (["jpg", "jpeg"].includes(ext)) type = "image/jpeg";
      if (["svg"].includes(ext)) type = "image/svg+xml";
      if (["woff2"].includes(ext)) type = "font/woff2";
      if (["woff"].includes(ext)) type = "font/woff";

      const data = await urlToDataUri(full, type);

      css = css.replace(match[0], `url("${data}")`);
    } catch {}
  }

  return css;
}

// ---------------- HTML INLINE ----------------
async function inlineHTML(html, baseURL) {
  // images
  html = await html.replace(
    /<img[^>]+src=["']([^"']+)["']/g,
    async (m, src) => {
      if (src.startsWith("data:")) return m;

      try {
        const full = src.startsWith("http")
          ? src
          : new URL(src, baseURL).href;

        const data = await urlToDataUri(full, "image/png");
        return m.replace(src, data);
      } catch {
        return m;
      }
    }
  );

  return html;
}

// ---------------- MAIN ----------------
async function run() {
  console.log("🚀 Fetching site...");

  let html = await fetchURL(SITE_URL);

  console.log("🎨 Inline CSS...");

  const cssRegex = /<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/g;

  for (const match of html.matchAll(cssRegex)) {
    const url = match[1];
    const full = url.startsWith("http") ? url : new URL(url, SITE_URL).href;

    try {
      let css = await fetchURL(full);
      css = await inlineCSS(css, SITE_URL);

      html = html.replace(match[0], `<style>${css}</style>`);
    } catch {}
  }

  console.log("⚡ Inline JS...");

  const jsRegex = /<script[^>]+src=["']([^"']+)["'][^>]*><\/script>/g;

  for (const match of html.matchAll(jsRegex)) {
    const url = match[1];
    const full = url.startsWith("http") ? url : new URL(url, SITE_URL).href;

    try {
      const js = await fetchURL(full);
      html = html.replace(match[0], `<script>${js}</script>`);
    } catch {}
  }

  console.log("🖼 Inline images...");
  html = await inlineHTML(html, SITE_URL);

  fs.writeFileSync(OUTPUT_FILE, html);

  console.log("✅ DONE:", OUTPUT_FILE);
}

run();