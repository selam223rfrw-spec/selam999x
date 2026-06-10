#!/usr/bin/env node

import fs from "fs";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";
import path from "path";

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

// ---------------- FIX CSS ----------------
async function inlineCSS(css, baseURL) {
  const urlRegex = /url\(([^)]+)\)/g;

  for (const match of css.matchAll(urlRegex)) {
    let raw = match[1].replace(/['"]/g, "");
    if (raw.startsWith("data:")) continue;

    try {
      const full = raw.startsWith("http")
        ? raw
        : new URL(raw, baseURL).href;

      let type = "application/octet-stream";
      if (raw.includes(".png")) type = "image/png";
      if (raw.includes(".jpg") || raw.includes(".jpeg")) type = "image/jpeg";
      if (raw.includes(".svg")) type = "image/svg+xml";
      if (raw.includes(".woff2")) type = "font/woff2";

      const data = await urlToDataUri(full, type);
      css = css.replace(match[0], `url("${data}")`);
    } catch (err) {
      console.log("⚠ CSS asset failed:", raw);
    }
  }

  return css;
}

// ---------------- FIX HTML IMAGES (IMPORTANT FIX) ----------------
async function inlineImages(html, baseURL) {
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;

  let matches = [...html.matchAll(imgRegex)];

  for (const match of matches) {
    let src = match[1];
    if (src.startsWith("data:")) continue;

    try {
      const full = src.startsWith("http")
        ? src
        : new URL(src, baseURL).href;

      const data = await urlToDataUri(full, "image/png");

      html = html.replace(match[0], match[0].replace(src, data));
    } catch (err) {
      console.log("⚠ Image failed:", src);
    }
  }

  return html;
}

// ---------------- MAIN ----------------
async function run() {
  console.log("🚀 Fetching site...");
  let html = await fetchURL(SITE_URL);

  console.log("🎨 Inline CSS...");
  const cssRegex = /<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/g;

  for (const match of html.matchAll(cssRegex)) {
    try {
      const url = match[1];
      const full = url.startsWith("http") ? url : new URL(url, SITE_URL).href;

      let css = await fetchURL(full);
      css = await inlineCSS(css, SITE_URL);

      html = html.replace(match[0], `<style>${css}</style>`);
    } catch (err) {
      console.log("⚠ CSS failed:", match[1]);
    }
  }

  console.log("⚡ Inline JS...");
  const jsRegex = /<script[^>]+src=["']([^"']+)["'][^>]*><\/script>/g;

  for (const match of html.matchAll(jsRegex)) {
    try {
      const url = match[1];
      const full = url.startsWith("http") ? url : new URL(url, SITE_URL).href;

      const js = await fetchURL(full);
      html = html.replace(match[0], `<script>${js}</script>`);
    } catch (err) {
      console.log("⚠ JS failed:", match[1]);
    }
  }

  console.log("🖼 Inline images...");
  html = await inlineImages(html, SITE_URL);

  fs.writeFileSync(OUTPUT_FILE, html);

  console.log("✅ DONE:", OUTPUT_FILE);
}

run();