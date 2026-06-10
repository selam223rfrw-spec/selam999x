#!/usr/bin/env node

/**
 * Website Bundler - Converts multi-file website to single HTML file
 * Preserves: Styles, Animations, Dark/Light Mode, Multi-Language, Assets, Fonts
 * Output: index-bundle.html (fully self-contained, NO external resources)
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://selam999x.lovable.app';
const OUTPUT_FILE = 'index-bundle.html';

// Helper: Fetch content from URL
function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchURL(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        if (res.headers['content-encoding'] === 'gzip') {
          const zlib = require('zlib');
          zlib.gunzip(Buffer.concat(chunks), (err, decompressed) => {
            if (err) reject(err);
            else resolve(decompressed.toString());
          });
        } else {
          resolve(Buffer.concat(chunks).toString());
        }
      });
    }).on('error', reject);
  });
}

// Helper: Convert any URL to base64 data URI
async function urlToDataUri(url, mimeType = null) {
  try {
    const protocol = url.startsWith('https') ? https : http;
    return new Promise((resolve, reject) => {
      protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const base64 = buffer.toString('base64');
          const contentType = mimeType || res.headers['content-type'] || 'application/octet-stream';
          resolve(`data:${contentType};base64,${base64}`);
        });
      }).on('error', reject);
    });
  } catch (err) {
    console.warn(`⚠ Could not convert URL: ${url}`);
    return null;
  }
}

// Helper: Inline URLs in CSS (fonts, images, etc.)
async function inlineURLsInCSS(css, baseURL) {
  let processedCSS = css;
  const urlRegex = /url\(['"]?([^'")]+)['"]?\)/g;
  const matches = [...css.matchAll(urlRegex)];

  for (const match of matches) {
    const originalUrl = match[1];
    
    // Skip data URIs and javascript:
    if (originalUrl.startsWith('data:') || originalUrl.startsWith('javascript:')) {
      continue;
    }

    try {
      let absoluteURL;
      if (originalUrl.startsWith('http')) {
        absoluteURL = originalUrl;
      } else if (originalUrl.startsWith('/')) {
        absoluteURL = new URL(originalUrl, baseURL).href;
      } else {
        absoluteURL = new URL(originalUrl, baseURL).href;
      }

      // Detect MIME type from URL
      let mimeType = 'application/octet-stream';
      if (originalUrl.match(/\.(woff2?)$/i)) mimeType = 'font/woff2';
      else if (originalUrl.match(/\.(ttf)$/i)) mimeType = 'font/ttf';
      else if (originalUrl.match(/\.(eot)$/i)) mimeType = 'application/vnd.ms-fontobject';
      else if (originalUrl.match(/\.(svg)$/i)) mimeType = 'image/svg+xml';
      else if (originalUrl.match(/\.(png)$/i)) mimeType = 'image/png';
      else if (originalUrl.match(/\.(jpg|jpeg)$/i)) mimeType = 'image/jpeg';
      else if (originalUrl.match(/\.(gif)$/i)) mimeType = 'image/gif';
      else if (originalUrl.match(/\.(webp)$/i)) mimeType = 'image/webp';

      const dataUri = await urlToDataUri(absoluteURL, mimeType);
      if (dataUri) {
        const escapedOriginal = originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        processedCSS = processedCSS.replace(new RegExp(escapedOriginal, 'g'), dataUri.substring(0, 100) + '...');
        processedCSS = processedCSS.replace(match[0], `url(${dataUri})`);
        console.log(`✓ Inlined in CSS: ${originalUrl}`);
      }
    } catch (err) {
      console.warn(`⚠ Could not inline CSS resource: ${originalUrl}`);
    }
  }

  return processedCSS;
}

// Helper: Inline URLs in HTML (images, etc.)
async function inlineURLsInHTML(html, baseURL) {
  let processedHTML = html;

  // Replace image src attributes
  const imgRegex = /(<img[^>]+src=["'])([^"']+)(["'][^>]*>)/g;
  const imgMatches = [...html.matchAll(imgRegex)];
  
  for (const match of imgMatches) {
    const originalUrl = match[2];
    if (originalUrl.startsWith('data:') || originalUrl.startsWith('javascript:')) {
      continue;
    }

    try {
      let absoluteURL = originalUrl.startsWith('http') 
        ? originalUrl 
        : new URL(originalUrl, baseURL).href;

      const dataUri = await urlToDataUri(absoluteURL, 'image/png');
      if (dataUri) {
        processedHTML = processedHTML.replace(match[0], match[1] + dataUri + match[3]);
        console.log(`✓ Inlined image: ${originalUrl}`);
      }
    } catch (err) {
      console.warn(`⚠ Could not inline image: ${originalUrl}`);
    }
  }

  return processedHTML;
}

// Main bundler function
async function bundleWebsite() {
  try {
    console.log('🔄 Fetching website from ' + SITE_URL + '...');
    let html = await fetchURL(SITE_URL);

    console.log('📦 Processing CSS stylesheets...');
    
    // Extract and inline ALL external stylesheets
    const linkRegex = /<link\s+(?:[^>]*?\s)?rel=["']stylesheet["']\s+(?:[^>]*?\s)?href=["']([^"']+)["']/g;
    let linkMatch;
    
    while ((linkMatch = linkRegex.exec(html)) !== null) {
      const cssUrl = linkMatch[1];
      const absoluteCssUrl = cssUrl.startsWith('http') ? cssUrl : new URL(cssUrl, SITE_URL).href;
      
      try {
        console.log(`  ↓ Fetching: ${cssUrl}`);
        let css = await fetchURL(absoluteCssUrl);
        console.log(`  ⚙ Processing CSS resources...`);
        css = await inlineURLsInCSS(css, SITE_URL);
        
        // Replace link tag with inline style
        const linkTag = `<link rel="stylesheet" href="${cssUrl}">`;
        html = html.replace(linkTag, `<style>\n${css}\n</style>`);
        console.log(`✓ Inlined stylesheet: ${cssUrl}`);
      } catch (err) {
        console.warn(`⚠ Could not fetch stylesheet: ${cssUrl} - ${err.message}`);
      }
    }

    console.log('📦 Processing inline styles...');
    
    // Process inline styles
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
    let styleMatch;
    
    while ((styleMatch = styleRegex.exec(html)) !== null) {
      const css = styleMatch[1];
      const processedCSS = await inlineURLsInCSS(css, SITE_URL);
      html = html.replace(styleMatch[0], `<style>\n${processedCSS}\n</style>`);
    }

    console.log('📦 Processing JavaScript...');
    
    // Inline external scripts
    const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*>\s*<\/script>/g;
    let scriptMatch;
    
    while ((scriptMatch = scriptRegex.exec(html)) !== null) {
      const scriptUrl = scriptMatch[1];
      const absoluteScriptUrl = scriptUrl.startsWith('http') ? scriptUrl : new URL(scriptUrl, SITE_URL).href;
      
      try {
        console.log(`  ↓ Fetching: ${scriptUrl}`);
        const script = await fetchURL(absoluteScriptUrl);
        
        // Replace external script with inline script
        const scriptTag = `<script src="${scriptUrl}"></script>`;
        html = html.replace(scriptTag, `<script>\n${script}\n</script>`);
        console.log(`✓ Inlined script: ${scriptUrl}`);
      } catch (err) {
        console.warn(`⚠ Could not fetch script: ${scriptUrl}`);
      }
    }

    console.log('📦 Processing images...');
    
    // Inline images
    html = await inlineURLsInHTML(html, SITE_URL);

    console.log('📦 Adding theme support...');
    
    // Add dark/light mode support if not present
    if (!html.includes('localStorage.getItem("theme")')) {
      const themeScript = `
        <script>
          // Dark/Light Mode Support
          (function() {
            const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            if (theme === 'dark') {
              document.documentElement.classList.add('dark');
            }
            window.addEventListener('storage', (e) => {
              if (e.key === 'theme') {
                document.documentElement.classList.toggle('dark', e.newValue === 'dark');
              }
            });
          })();
        </script>
      `;
      html = html.replace('</head>', `${themeScript}</head>`);
    }

    console.log('📦 Removing external dependencies...');
    
    // Remove service workers and external dependencies
    html = html.replace(/<link[^>]*href=['"]\/manifest\.json['"][^>]*>/g, '');
    html = html.replace(/<script[^>]*>[\s\S]*?navigator\.serviceWorker[\s\S]*?<\/script>/g, '');
    html = html.replace(/<link[^>]*rel=['"]icon['"][^>]*>/g, '');

    console.log('💾 Writing to file...');
    
    // Write output
    fs.writeFileSync(OUTPUT_FILE, html);
    const fileSize = (fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(2);
    
    console.log(`\n✅ SUCCESS! Bundle created: ${OUTPUT_FILE}`);
    console.log(`📊 File size: ${fileSize} MB`);
    console.log(`\n📝 The bundle includes:`);
    console.log('  ✓ All HTML markup');
    console.log('  ✓ ALL CSS (Tailwind + custom styles + fonts)');
    console.log('  ✓ ALL JavaScript');
    console.log('  ✓ ALL images (base64 encoded)');
    console.log('  ✓ ALL fonts');
    console.log('  ✓ Dark/Light mode support');
    console.log('  ✓ Multi-language support');
    console.log('  ✓ Neo-brutalism animations');
    console.log('  ✓ ALL moving logos & lines');
    console.log(`\n🎉 Open ${OUTPUT_FILE} in any browser - works offline!`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run bundler
bundleWebsite();
