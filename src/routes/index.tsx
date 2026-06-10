import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import {
  Mail, Phone, Github, Globe, Code2, Zap, Twitter, Instagram,
  ChevronRight, RefreshCw, Menu, X, ArrowUpRight, Sun, Moon, Sparkles,
  Palette, Layout, Rocket,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abdulselam Elahmed — Web Designer & Developer" },
      { name: "description", content: "Neo-brutalist portfolio of Abdulselam Elahmed. I design and build bold, fast, accessible websites and web apps." },
      { property: "og:title", content: "Abdulselam Elahmed — Web Designer & Developer" },
      { property: "og:description", content: "Bold neo-brutalist web design and development." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- i18n ---------- */
type Lang = "en" | "ar" | "tr";

const LANGS: { code: Lang; label: string; next: Lang }[] = [
  { code: "en", label: "EN", next: "ar" },
  { code: "ar", label: "AR", next: "tr" },
  { code: "tr", label: "TR", next: "en" },
];

const T = {
  nav_work:    { en: "Work",     ar: "الأعمال",  tr: "Çalışmalar" },
  nav_about:   { en: "About",    ar: "عني",      tr: "Hakkımda" },
  nav_stack:   { en: "Stack",    ar: "الأدوات",  tr: "Yetkinlikler" },
  nav_services:{ en: "Services", ar: "الخدمات",  tr: "Hizmetler" },
  nav_contact: { en: "Contact",  ar: "تواصل",    tr: "İletişim" },
  hero_kicker: { en: "WEB DESIGNER · DEVELOPER · 2026", ar: "مصمم ومطور ويب · 2026", tr: "WEB TASARIMCI · GELİŞTİRİCİ · 2026" },
  hero_line1:  { en: "I DESIGN",  ar: "أصمم",  tr: "TASARLAR" },
  hero_line2:  { en: "& BUILD",   ar: "وأبني",  tr: "& İNŞA" },
  hero_line3:  { en: "WEBSITES.", ar: "مواقع.", tr: "EDERİM." },
  hero_sub: {
    en: "I'm Abdulselam Elahmed — a web designer and developer crafting bold neo-brutalist sites, e-commerce stores and web apps that load fast and convert.",
    ar: "أنا عبدالسلام الأحمد — مصمم ومطور ويب أبني مواقع جريئة بأسلوب نيو-بروتاليزم ومتاجر وتطبيقات سريعة ومُحسَّنة للتحويل.",
    tr: "Ben Abdulselam Elahmed — cesur neo-brutalist siteler, e-ticaret mağazaları ve hızlı yüklenen, dönüşüm sağlayan web uygulamaları tasarlayan ve geliştiren bir web tasarımcısı ve geliştiriciyim.",
  },
  hero_cta1:   { en: "See my work",   ar: "شاهد أعمالي", tr: "Çalışmalarımı gör" },
  hero_cta2:   { en: "Hire me",       ar: "وظّفني",      tr: "Bana ulaş" },
  hero_stat1:  { en: "Years coding",  ar: "سنوات برمجة",  tr: "Yıl deneyim" },
  hero_stat2:  { en: "Sites shipped", ar: "موقع منشور",   tr: "Yayında site" },
  hero_stat3:  { en: "Happy clients", ar: "عميل سعيد",    tr: "Memnun müşteri" },
  tag_about:   { en: "ABOUT ME",  ar: "نبذة",     tr: "HAKKIMDA" },
  about_h:     { en: "Hello",     ar: "مرحباً",   tr: "Merhaba" },
  about_desc: {
    en: "I'm Abdulselam Elahmed. I design and build websites end-to-end — from the first wireframe to the last deploy. My work focuses on clarity, speed, and personality. No template look, no fluff.",
    ar: "أنا عبدالسلام الأحمد. أصمم وأطوّر المواقع من البداية للنهاية — من أول مخطط حتى آخر نشر. أركّز على الوضوح والسرعة والشخصية. لا قوالب جاهزة ولا حشو.",
    tr: "Ben Abdulselam Elahmed. Web sitelerini baştan sona tasarlar ve geliştiririm — ilk wireframe'den son yayına kadar. İşim netlik, hız ve karakter üzerine kuruludur. Şablon görünüm yok, gereksiz süs yok.",
  },
  tag_stack:   { en: "STACK",    ar: "المنظومة", tr: "TEKNOLOJİLER" },
  toolbelt:    { en: "Toolbelt", ar: "أدواتي",    tr: "Araç Kutum" },
  reset:       { en: "Reset",    ar: "إعادة",    tr: "Sıfırla" },
  tag_services:{ en: "SERVICES", ar: "الخدمات",  tr: "HİZMETLER" },
  services_h:  { en: "What I do", ar: "ماذا أُقدّم", tr: "Neler yapıyorum" },
  svc1_t:      { en: "Web Design",     ar: "تصميم المواقع",      tr: "Web Tasarımı" },
  svc1_d:      { en: "Bold, unique brand sites — wireframes, UI design, prototypes in Figma.", ar: "مواقع علامة تجارية مميزة — مخططات وتصميم واجهات ونماذج في فيغما.", tr: "Cesur, özgün marka siteleri — Figma'da wireframe, UI tasarımı, prototipler." },
  svc2_t:      { en: "Development",    ar: "تطوير الويب",        tr: "Geliştirme" },
  svc2_d:      { en: "React, Next.js, TypeScript, Tailwind. Fast, accessible, SEO-ready.",     ar: "ريأكت، نكست، تايب سكريبت، تيلويند. سريع، متاح، جاهز للسيو.",        tr: "React, Next.js, TypeScript, Tailwind. Hızlı, erişilebilir, SEO uyumlu." },
  svc3_t:      { en: "E-commerce",     ar: "متاجر إلكترونية",    tr: "E-ticaret" },
  svc3_d:      { en: "Shopify and headless storefronts — designed and built to convert.",      ar: "شوبيفاي ومتاجر هيدلس — مصممة ومبنية للتحويل.",                 tr: "Shopify ve headless mağazalar — dönüşüm için tasarlanmış ve geliştirilmiş." },
  featured:    { en: "Selected Work",  ar: "أعمال مختارة",       tr: "Seçili Çalışmalar" },
  featured_sub:{ en: "Recent websites and web apps I designed and built.", ar: "مواقع وتطبيقات حديثة قمت بتصميمها وتطويرها.", tr: "Son dönemde tasarlayıp geliştirdiğim siteler ve web uygulamaları." },
  case_study:  { en: "View project", ar: "عرض المشروع", tr: "Projeyi gör" },
  trusted:     { en: "Tools I use every day", ar: "أدوات أستخدمها يوميًا", tr: "Her gün kullandığım araçlar" },
  footer_title:{ en: "Let's build your next website.", ar: "لنبنِ موقعك القادم.", tr: "Bir sonraki web sitenizi birlikte yapalım." },
  footer_sub:  { en: "Available for freelance web design and development projects worldwide.", ar: "متاح لمشاريع تصميم وتطوير المواقع حول العالم.", tr: "Dünya genelinde freelance web tasarım ve geliştirme projelerine açığım." },
  navigate:    { en: "Navigate", ar: "التنقل", tr: "Gezin" },
  contact:     { en: "Contact",  ar: "تواصل",  tr: "İletişim" },
  rights:      { en: "All rights reserved", ar: "جميع الحقوق محفوظة", tr: "Tüm hakları saklıdır" },
  theme_light: { en: "Light", ar: "فاتح", tr: "Açık" },
  theme_dark:  { en: "Dark",  ar: "داكن", tr: "Koyu" },
};

function t<K extends keyof typeof T>(k: K, lang: Lang): string {
  return T[k][lang];
}

/* ---------- data ---------- */
const PILLS = [
  { label: "React",      color: "#61DAFB", text: "#000", slug: "react" },
  { label: "TypeScript", color: "#3178C6", text: "#fff", slug: "typescript" },
  { label: "Next.js",    color: "#e2e2e2", text: "#000", slug: "nextdotjs" },
  { label: "Tailwind",   color: "#06B6D4", text: "#fff", slug: "tailwindcss" },
  { label: "Figma",      color: "#F24E1E", text: "#fff", slug: "figma" },
  { label: "Node.js",    color: "#3eff8b", text: "#000", slug: "nodedotjs" },
  { label: "Shopify",    color: "#95BF47", text: "#000", slug: "shopify" },
  { label: "WordPress",  color: "#21759B", text: "#fff", slug: "wordpress" },
  { label: "GSAP",       color: "#88CE02", text: "#000", slug: "greensock" },
  { label: "Framer",     color: "#0055FF", text: "#fff", slug: "framer" },
  { label: "Supabase",   color: "#3ECF8E", text: "#000", slug: "supabase" },
  { label: "Vercel",     color: "#e8e8e8", text: "#000", slug: "vercel" },
  { label: "GitHub",     color: "#2d333b", text: "#fff", slug: "github" },
  { label: "Stripe",     color: "#635BFF", text: "#fff", slug: "stripe" },
  { label: "Webflow",    color: "#146EF5", text: "#fff", slug: "webflow" },
  { label: "Vite",       color: "#646CFF", text: "#fff", slug: "vite" },
  { label: "PostgreSQL", color: "#336791", text: "#fff", slug: "postgresql" },
  { label: "HTML5",      color: "#E34F26", text: "#fff", slug: "html5" },
  { label: "CSS3",       color: "#1572B6", text: "#fff", slug: "css3" },
  { label: "Sanity",     color: "#F03E2F", text: "#fff", slug: "sanity" },
];

const LOGO_ROW1 = [
  { name: "Figma", slug: "figma", color: "F24E1E" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
  { name: "Tailwind", slug: "tailwindcss", color: "06B6D4" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Shopify", slug: "shopify", color: "95BF47" },
  { name: "WordPress", slug: "wordpress", color: "21759B" },
  { name: "Webflow", slug: "webflow", color: "146EF5" },
  { name: "Framer", slug: "framer", color: "0055FF" },
  { name: "GitHub", slug: "github", color: "000000" },
  { name: "Vercel", slug: "vercel", color: "000000" },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
];

const LOGO_ROW2 = [
  { name: "Supabase", slug: "supabase", color: "3ECF8E" },
  { name: "Sanity", slug: "sanity", color: "F03E2F" },
  { name: "Notion", slug: "notion", color: "000000" },
  { name: "Linear", slug: "linear", color: "5E6AD2" },
  { name: "Adobe", slug: "adobe", color: "FF0000" },
  { name: "GSAP", slug: "greensock", color: "88CE02" },
  { name: "Vite", slug: "vite", color: "646CFF" },
  { name: "Node", slug: "nodedotjs", color: "5FA04E" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "Cloudflare", slug: "cloudflare", color: "F38020" },
  { name: "Google", slug: "google", color: "4285F4" },
  { name: "Spotify", slug: "spotify", color: "1DB954" },
];

const PROJECTS = [
  {
    num: "01",
    title: { en: "Brutalist Bakery", ar: "مخبز بروتاليست", tr: "Brutalist Fırın" },
    year: "2026",
    tags: ["Web Design", "Shopify", "Branding"],
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    desc: {
      en: "Bold Shopify storefront for an artisan bakery — designed and developed end-to-end.",
      ar: "متجر شوبيفاي جريء لمخبز حرفي — تصميم وتطوير من الألف إلى الياء.",
      tr: "Bir artisan fırın için cesur Shopify mağazası — uçtan uca tasarım ve geliştirme.",
    },
    accent: "pink",
  },
  {
    num: "02",
    title: { en: "Studio Kairos", ar: "ستوديو كايروس", tr: "Studio Kairos" },
    year: "2025",
    tags: ["Next.js", "CMS", "Animation"],
    img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=80",
    desc: {
      en: "Editorial design-studio site built with Next.js, Sanity CMS and GSAP motion.",
      ar: "موقع استوديو تصميم تحريري مبني بـ Next.js وسانيتي وحركة GSAP.",
      tr: "Next.js, Sanity CMS ve GSAP hareketleriyle inşa edilmiş editöryel stüdyo sitesi.",
    },
    accent: "blue",
  },
  {
    num: "03",
    title: { en: "Mintwave SaaS", ar: "مينت ويف سَاس", tr: "Mintwave SaaS" },
    year: "2025",
    tags: ["React", "Dashboard", "UI/UX"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    desc: {
      en: "Marketing site + product dashboard for a B2B SaaS — design system, components and auth.",
      ar: "موقع تسويقي ولوحة منتج لشركة SaaS — نظام تصميم ومكونات وتسجيل دخول.",
      tr: "Bir B2B SaaS için pazarlama sitesi + ürün paneli — tasarım sistemi, bileşenler ve giriş.",
    },
    accent: "green",
  },
  {
    num: "04",
    title: { en: "Atlas Portfolio", ar: "بورتفوليو أطلس", tr: "Atlas Portfolyo" },
    year: "2024",
    tags: ["Portfolio", "Framer", "Branding"],
    img: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&w=900&q=80",
    desc: {
      en: "Personal portfolio for a photographer — minimal grid, big type, fast everywhere.",
      ar: "بورتفوليو شخصي لمصور — شبكة بسيطة وخطوط كبيرة وسرعة في كل مكان.",
      tr: "Bir fotoğrafçı için kişisel portfolyo — sade grid, büyük tipografi, her yerde hızlı.",
    },
    accent: "orange",
  },
];

const SCROLL_ROWS_I18N: { bg: string; color: string; dir: "left" | "right"; items: Record<Lang, string[]> }[] = [
  { bg: "var(--brut-pink)",   color: "#000", dir: "left",  items: {
    en: ["WEB DESIGN", "DEVELOPMENT", "BRANDING", "UI/UX", "FIGMA", "REACT"],
    ar: ["تصميم ويب", "تطوير", "هوية", "تجربة مستخدم", "فيغما", "ريأكت"],
    tr: ["WEB TASARIM", "GELİŞTİRME", "MARKA", "UI/UX", "FIGMA", "REACT"],
  }},
  { bg: "var(--brut-blue)",   color: "#fff", dir: "right", items: {
    en: ["SHOPIFY", "NEXT.JS", "TAILWIND", "TYPESCRIPT", "ANIMATION", "SEO"],
    ar: ["شوبيفاي", "نكست", "تيلويند", "تايب سكريبت", "حركة", "سيو"],
    tr: ["SHOPIFY", "NEXT.JS", "TAILWIND", "TYPESCRIPT", "ANİMASYON", "SEO"],
  }},
  { bg: "var(--brut-green)",  color: "#000", dir: "left",  items: {
    en: ["FAST", "ACCESSIBLE", "RESPONSIVE", "BOLD", "CRAFTED", "SHIPPED"],
    ar: ["سريع", "متاح", "متجاوب", "جريء", "متقن", "منشور"],
    tr: ["HIZLI", "ERİŞİLEBİLİR", "DUYARLI", "CESUR", "ÖZENLİ", "YAYINDA"],
  }},
];

/* ================================================================== */
function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const dir = lang === "ar" ? "rtl" : "ltr";
  const current = LANGS.find((l) => l.code === lang)!;
  const nextLang = LANGS.find((l) => l.code === current.next)!;

  // Init theme from localStorage / system
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="brut-root" dir={dir} data-lang={lang}>
      {/* HEADER */}
      <header className="brut-header">
        <a href="#top" className="brut-logo">
          <Sparkles size={18} strokeWidth={3} />
          <span>SELAM</span>
        </a>

        <nav className="brut-nav">
          <a href="#work">{t("nav_work", lang)}</a>
          <a href="#about">{t("nav_about", lang)}</a>
          <a href="#services">{t("nav_services", lang)}</a>
          <a href="#stack">{t("nav_stack", lang)}</a>
          <a href="#contact">{t("nav_contact", lang)}</a>
        </nav>

        <div className="brut-actions">
          <button
            className="brut-icon-btn"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            aria-label="Toggle theme"
            title={theme === "light" ? t("theme_dark", lang) : t("theme_light", lang)}
          >
            {theme === "light" ? <Moon size={16} strokeWidth={3} /> : <Sun size={16} strokeWidth={3} />}
          </button>
          <button className="brut-lang" onClick={() => setLang(nextLang.code)}>
            <Globe size={14} strokeWidth={3} />
            <span>{nextLang.label}</span>
          </button>
          <button className="brut-icon-btn brut-menu" aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? <X size={18} strokeWidth={3} /> : <Menu size={18} strokeWidth={3} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="brut-mobile-menu" onClick={() => setMenuOpen(false)}>
          <a href="#work">{t("nav_work", lang)}</a>
          <a href="#about">{t("nav_about", lang)}</a>
          <a href="#services">{t("nav_services", lang)}</a>
          <a href="#stack">{t("nav_stack", lang)}</a>
          <a href="#contact">{t("nav_contact", lang)}</a>
        </div>
      )}

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-kicker">
          <span className="hero-dot" />
          {t("hero_kicker", lang)}
        </div>
        <h1 className="hero-title">
          <span className="hero-word">{t("hero_line1", lang)}</span>
          <span className="hero-word hero-word-accent">{t("hero_line2", lang)}</span>
          <span className="hero-word">{t("hero_line3", lang)}</span>
        </h1>
        <p className="hero-sub">{t("hero_sub", lang)}</p>
        <div className="hero-cta-row">
          <a href="#work" className="brut-btn brut-btn-primary">
            {t("hero_cta1", lang)} <ArrowUpRight size={18} strokeWidth={3} />
          </a>
          <a href="#contact" className="brut-btn brut-btn-ghost">
            {t("hero_cta2", lang)}
          </a>
        </div>
        <div className="hero-stats">
          <div><strong>06+</strong><span>{t("hero_stat1", lang)}</span></div>
          <div><strong>40+</strong><span>{t("hero_stat2", lang)}</span></div>
          <div><strong>25+</strong><span>{t("hero_stat3", lang)}</span></div>
        </div>
      </section>

      <main className="cv-grid" id="about">
        {/* Profile */}
        <section className="brut-card">
          <div className="card-tag">
            <Code2 size={14} strokeWidth={3} />
            {t("tag_about", lang)}
          </div>

          <div className="profile-row">
            <div className="avatar-frame">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"
                alt="Abdulselam Elahmed"
              />
            </div>
            <div>
              <h2 className="profile-name">Abdulselam Elahmed</h2>
              <p className="profile-role">Web Designer · Developer</p>
            </div>
          </div>

          <h3 className="section-title">{t("about_h", lang)}</h3>
          <p className="about-desc">{t("about_desc", lang)}</p>

          <div className="contact-row" id="contact">
            <a href="mailto:hougjgrxkj@gmail.com" className="contact-btn">
              <Mail size={16} strokeWidth={2.5} />
              <span>hougjgrxkj@gmail.com</span>
            </a>
            <a href="https://instagram.com/selam9x" target="_blank" rel="noreferrer" className="contact-btn">
              <Instagram size={16} strokeWidth={2.5} />
              <span>@selam9x</span>
            </a>
            <a href="tel:+905411442870" className="contact-btn">
              <Phone size={16} strokeWidth={2.5} />
              <span>+90 541 144 2870</span>
            </a>
            <a href="https://github.com/Parasayte" target="_blank" rel="noreferrer" className="contact-btn">
              <Github size={16} strokeWidth={2.5} />
              <span>github.com/abdulselam</span>
            </a>
          </div>
        </section>

        {/* Toolbelt */}
        <section className="brut-card stack-card" id="stack">
          <div className="card-tag tag-pink">
            <Zap size={14} strokeWidth={3} />
            {t("tag_stack", lang)}
          </div>
          <h3 className="section-title">{t("toolbelt", lang)}</h3>
          <ToolbeltPhysics resetLabel={t("reset", lang)} />
        </section>
      </main>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="services-head">
          <div className="services-eyebrow">{t("tag_services", lang)} · 2026</div>
          <h2 className="services-title">{t("services_h", lang)}</h2>
        </div>
        <div className="services-grid">
          <article className="svc-card svc-yellow">
            <div className="svc-icon"><Palette size={28} strokeWidth={3} /></div>
            <h3>{t("svc1_t", lang)}</h3>
            <p>{t("svc1_d", lang)}</p>
          </article>
          <article className="svc-card svc-pink">
            <div className="svc-icon"><Layout size={28} strokeWidth={3} /></div>
            <h3>{t("svc2_t", lang)}</h3>
            <p>{t("svc2_d", lang)}</p>
          </article>
          <article className="svc-card svc-green">
            <div className="svc-icon"><Rocket size={28} strokeWidth={3} /></div>
            <h3>{t("svc3_t", lang)}</h3>
            <p>{t("svc3_d", lang)}</p>
          </article>
        </div>
      </section>

      {/* WORK */}
      <section className="work" id="work">
        <div className="work-head">
          <div className="work-eyebrow">{t("nav_work", lang).toUpperCase()} · 2023—2026</div>
          <h2 className="work-title">{t("featured", lang)}</h2>
          <p className="work-sub">{t("featured_sub", lang)}</p>
        </div>

        <div className="work-grid">
          {PROJECTS.map((p) => (
            <article key={p.num} className={`work-card work-accent-${p.accent}`}>
              <div className="work-media">
                <img src={p.img} alt={p.title[lang]} loading="lazy" />
                <div className="work-overlay">
                  <ArrowUpRight size={26} strokeWidth={3} />
                </div>
              </div>
              <div className="work-meta">
                <span className="work-num">{p.num}</span>
                <span className="work-year">{p.year}</span>
              </div>
              <h3 className="work-name">{p.title[lang]}</h3>
              <p className="work-desc">{p.desc[lang]}</p>
              <div className="work-tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="work-tag">{tag}</span>
                ))}
              </div>
              <a className="work-link" href="#">
                {t("case_study", lang)} <ChevronRight size={14} strokeWidth={3} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <ScrollingBanners lang={lang} />

      <div className="logo-strip-heading"><span>{t("trusted", lang)}</span></div>
      <CompanyLogoStrip />

      <footer className="brut-footer">
        <div className="footer-container">
          <div className="footer-branding">
            <h3>{t("footer_title", lang)}</h3>
            <p>{t("footer_sub", lang)}</p>
            <div className="footer-socials">
              <a className="social-btn" href="https://twitter.com" aria-label="Twitter"><Twitter size={16} strokeWidth={2.5} /></a>
              <a className="social-btn" href="https://instagram.com/selam9x" aria-label="Instagram"><Instagram size={16} strokeWidth={2.5} /></a>
              <a className="social-btn" href="https://github.com/Parasayte" aria-label="GitHub"><Github size={16} strokeWidth={2.5} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t("navigate", lang)}</h4>
            <ul>
              <li><a href="#work"><ChevronRight size={12} strokeWidth={3} /> {t("nav_work", lang)}</a></li>
              <li><a href="#about"><ChevronRight size={12} strokeWidth={3} /> {t("nav_about", lang)}</a></li>
              <li><a href="#services"><ChevronRight size={12} strokeWidth={3} /> {t("nav_services", lang)}</a></li>
              <li><a href="#stack"><ChevronRight size={12} strokeWidth={3} /> {t("nav_stack", lang)}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t("contact", lang)}</h4>
            <ul>
              <li><a href="mailto:hougjgrxkj@gmail.com"><Mail size={12} strokeWidth={3} /> hougjgrxkj@gmail.com</a></li>
              <li><a href="tel:+905411442870"><Phone size={12} strokeWidth={3} /> +90 541 144 2870</a></li>
              <li><a href="https://instagram.com/selam9x"><Instagram size={12} strokeWidth={3} /> @selam9x</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Abdulselam Elahmed · {t("rights", lang)}</p>
          <p>Built with React · Matter.js</p>
        </div>
      </footer>

      <style>{CSS}</style>
    </div>
  );
}

/* ============================================================ */
/* TOOLBELT PHYSICS                                             */
/* ============================================================ */
function ToolbeltPhysics({ resetLabel }: { resetLabel: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillEls = useRef<(HTMLDivElement | null)[]>([]);
  const [key, setKey] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let lastW = el.clientWidth;
    const ro = new ResizeObserver(() => {
      if (Math.abs(el.clientWidth - lastW) > 20) {
        lastW = el.clientWidth;
        setKey((k) => k + 1);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setReady(false);
    let id1: number, id2: number;
    id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setReady(true));
    });
    return () => { cancelAnimationFrame(id1); cancelAnimationFrame(id2); };
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    const container = containerRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;
    const engine = Matter.Engine.create({ gravity: { y: 2.2 } });
    const invis = { isStatic: true, render: { visible: false } };
    Matter.Composite.add(engine.world, [
      Matter.Bodies.rectangle(W / 2, H + 25, W * 2, 50, invis),
      Matter.Bodies.rectangle(-25, H / 2, 50, H * 2, invis),
      Matter.Bodies.rectangle(W + 25, H / 2, 50, H * 2, invis),
    ]);

    const PH = 40;
    const bodies = pillEls.current.map((el, i) => {
      if (!el) return null;
      const PW = el.offsetWidth || 90;
      const cols = W < 400 ? 2 : W < 640 ? 3 : 4;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const startX = (col + 0.5) * (W / cols) + (Math.random() - 0.5) * 18;
      const startY = -(PH + row * (PH + 12) + Math.random() * 10);
      return Matter.Bodies.rectangle(startX, startY, PW, PH, {
        restitution: 0.25, friction: 0.55, frictionAir: 0.018,
        chamfer: { radius: PH / 2 }, render: { visible: false },
      });
    }).filter(Boolean) as Matter.Body[];

    Matter.Composite.add(engine.world, bodies);

    let raf: number;
    const sync = () => {
      pillEls.current.forEach((el, i) => {
        const body = bodies[i];
        if (!el || !body) return;
        const { x, y } = body.position;
        const deg = (body.angle * 180) / Math.PI;
        el.style.transform = `translate(${x - el.offsetWidth / 2}px,${y - PH / 2}px) rotate(${deg}deg)`;
      });
      raf = requestAnimationFrame(sync);
    };
    sync();

    const mouse = Matter.Mouse.create(container);
    const mw = (mouse as unknown as { mousewheel: EventListener }).mousewheel;
    container.removeEventListener("wheel", mw);
    container.removeEventListener("mousewheel", mw);
    container.removeEventListener("DOMMouseScroll", mw);

    const mc = Matter.MouseConstraint.create(engine, {
      mouse, constraint: { stiffness: 0.3, damping: 0.1, render: { visible: false } },
    });
    Matter.Composite.add(engine.world, mc);
    Matter.Events.on(mc, "startdrag", () => { container.style.cursor = "grabbing"; });
    Matter.Events.on(mc, "enddrag", () => { container.style.cursor = "grab"; });

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    return () => {
      cancelAnimationFrame(raf);
      Matter.Runner.stop(runner);
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [ready]);

  return (
    <div className="toolbelt-wrap">
      <div ref={containerRef} className="toolbelt-canvas">
        {PILLS.map((pill, i) => (
          <div
            key={`${key}-${pill.slug}`}
            ref={(el) => { pillEls.current[i] = el; }}
            className="dom-pill"
            style={{ background: pill.color, color: pill.text, opacity: ready ? 1 : 0 }}
          >
            <img
              src={`https://cdn.simpleicons.org/${pill.slug}/${pill.text === "#000" ? "000000" : "ffffff"}`}
              width={15} height={15} alt=""
              draggable={false}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <span>{pill.label}</span>
          </div>
        ))}
      </div>
      <button className="reset-btn" onClick={() => setKey((k) => k + 1)}>
        <RefreshCw size={14} strokeWidth={3} /> {resetLabel}
      </button>
    </div>
  );
}

/* ============================================================ */
function CompanyLogoStrip() {
  const row1 = [...LOGO_ROW1, ...LOGO_ROW1, ...LOGO_ROW1];
  const row2 = [...LOGO_ROW2, ...LOGO_ROW2, ...LOGO_ROW2];
  return (
    <section className="logo-strip">
      <div className="logo-strip-row">
        <div className="logo-strip-track logo-track-ltr">
          {row1.map((logo, i) => (
            <div key={i} className="logo-item" title={logo.name}>
              <img
                src={`https://cdn.simpleicons.org/${logo.slug}/${logo.color}`}
                alt={logo.name}
                className="logo-img"
                draggable={false}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="logo-strip-row">
        <div className="logo-strip-track logo-track-rtl">
          {row2.map((logo, i) => (
            <div key={i} className="logo-item" title={logo.name}>
              <img
                src={`https://cdn.simpleicons.org/${logo.slug}/${logo.color}`}
                alt={logo.name}
                className="logo-img"
                draggable={false}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
function ScrollingBanners({ lang }: { lang: Lang }) {
  return (
    <section className="scroll-stage" aria-label="Banners">
      {SCROLL_ROWS_I18N.map((row, i) => {
        const items = row.items[lang];
        return (
          <div key={i} className="scroll-ribbon" style={{ background: row.bg, color: row.color }}>
            <div className={`scroll-track ${row.dir === "right" ? "scroll-rtl" : "scroll-ltr"}`}>
              {[...items, ...items, ...items, ...items].map((item, k) => (
                <span key={k}>{item}&nbsp;&nbsp;★&nbsp;&nbsp;</span>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

/* ============================================================ */
/* STYLES                                                       */
/* ============================================================ */
const CSS = `
.brut-root {
  font-family: 'Thmanyah', system-ui, sans-serif;
  background: var(--background);
  color: var(--foreground);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

.brut-root *, .brut-root *::before, .brut-root *::after {
  font-family: 'Thmanyah', system-ui, sans-serif !important;
}

.brut-root h1, .brut-root h2, .brut-root .hero-title, .brut-root .footer-branding h3 {
  font-family: 'Thmanyah Display', 'Thmanyah', serif !important;
}

/* HEADER */
.brut-header {
  position: sticky; top: 16px; z-index: 50;
  margin: 16px auto 0;
  max-width: 1320px;
  padding: 12px 18px;
  display: flex; justify-content: space-between; align-items: center; gap: 14px;
  background: var(--card);
  border: 3px solid var(--foreground);
  border-radius: 999px;
  box-shadow: var(--shadow-brut);
}
.brut-logo {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--accent); color: var(--accent-foreground);
  border: 3px solid var(--foreground); border-radius: 999px;
  padding: 8px 18px;
  font-weight: 900; letter-spacing: 0.5px;
  text-decoration: none;
  box-shadow: var(--shadow-brut-sm);
  transition: transform .12s, box-shadow .12s;
  flex-shrink: 0;
}
.brut-logo:hover { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 0 var(--foreground); }

.brut-nav { display: flex; gap: 4px; align-items: center; }
.brut-nav a {
  color: var(--foreground); text-decoration: none;
  padding: 8px 16px; font-weight: 700; font-size: .9rem;
  border-radius: 999px;
  border: 2px solid transparent;
  transition: background .15s, border-color .15s;
}
.brut-nav a:hover { background: var(--accent); border-color: var(--foreground); }

.brut-actions { display: flex; align-items: center; gap: 8px; }
.brut-icon-btn {
  width: 40px; height: 40px;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--card); color: var(--foreground);
  border: 3px solid var(--foreground); border-radius: 999px;
  cursor: pointer; box-shadow: var(--shadow-brut-sm);
  transition: transform .12s, box-shadow .12s, background .15s;
}
.brut-icon-btn:hover { transform: translate(-1px,-1px); background: var(--accent); }
.brut-lang {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--card); color: var(--foreground);
  border: 3px solid var(--foreground); border-radius: 999px;
  padding: 8px 14px; font-weight: 900; font-size: .85rem;
  cursor: pointer; box-shadow: var(--shadow-brut-sm);
  transition: transform .12s, background .15s;
}
.brut-lang:hover { transform: translate(-1px,-1px); background: var(--accent); }
.brut-menu { display: none; }

.brut-mobile-menu {
  position: fixed; top: 84px; left: 16px; right: 16px;
  z-index: 49;
  background: var(--card);
  border: 3px solid var(--foreground); border-radius: 24px;
  box-shadow: var(--shadow-brut);
  padding: 12px;
  display: flex; flex-direction: column; gap: 4px;
}
.brut-mobile-menu a {
  color: var(--foreground); text-decoration: none;
  padding: 12px 18px; font-weight: 800;
  border-radius: 999px;
  border: 2px solid transparent;
}
.brut-mobile-menu a:hover { background: var(--accent); border-color: var(--foreground); }

@media (max-width: 900px) {
  .brut-nav { display: none; }
  .brut-menu { display: inline-flex; }
}

/* HERO */
.hero {
  max-width: 1320px; margin: 60px auto 30px;
  padding: 30px 28px 50px;
  position: relative; z-index: 1;
}
.hero-kicker {
  display: inline-flex; align-items: center; gap: 10px;
  background: var(--card);
  border: 3px solid var(--foreground);
  padding: 8px 18px; border-radius: 999px;
  font-size: .72rem; font-weight: 800; letter-spacing: 2px;
  text-transform: uppercase;
  box-shadow: var(--shadow-brut-sm);
  margin-bottom: 28px;
}
.hero-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--brut-green);
  border: 2px solid var(--foreground);
  animation: pulse 1.6s ease-in-out infinite;
}
@keyframes pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: .5; transform: scale(.7); }
}

.hero-title {
  font-size: clamp(2.8rem, 11vw, 9.5rem);
  line-height: .9;
  letter-spacing: -.03em;
  margin: 0;
  display: flex; flex-direction: column;
  font-weight: 900;
  text-transform: uppercase;
}
.hero-word { display: block; }
.hero-word-accent {
  display: inline-block;
  background: var(--accent);
  color: var(--accent-foreground);
  padding: 0 .25em;
  border: 4px solid var(--foreground);
  border-radius: 18px;
  box-shadow: 8px 8px 0 0 var(--foreground);
  align-self: flex-start;
  margin: .1em 0;
  transform: rotate(-1.5deg);
}
[dir="rtl"] .hero-word-accent { transform: rotate(1.5deg); align-self: flex-end; }

.hero-sub {
  max-width: 640px;
  margin: 30px 0 0;
  color: var(--muted-foreground);
  font-size: clamp(1rem, 1.3vw, 1.15rem);
  line-height: 1.65;
  font-weight: 400;
}
.hero-cta-row {
  margin-top: 28px;
  display: flex; flex-wrap: wrap; gap: 12px;
}
.brut-btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 26px;
  border: 3px solid var(--foreground); border-radius: 999px;
  font-weight: 900;
  text-decoration: none;
  font-size: .92rem; letter-spacing: .3px;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: var(--shadow-brut-sm);
  transition: transform .12s, box-shadow .12s;
}
.brut-btn:hover { transform: translate(-3px,-3px); box-shadow: 6px 6px 0 0 var(--foreground); }
.brut-btn-primary { background: var(--accent); color: var(--accent-foreground); }
.brut-btn-ghost   { background: var(--card);   color: var(--foreground); }

.hero-stats {
  margin-top: 48px;
  display: grid; grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 14px; max-width: 600px;
}
.hero-stats > div {
  display: flex; flex-direction: column;
  padding: 18px 20px;
  background: var(--card);
  border: 3px solid var(--foreground); border-radius: 22px;
  box-shadow: var(--shadow-brut-sm);
}
.hero-stats strong {
  font-family: 'Thmanyah Display', 'Thmanyah', serif !important;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  line-height: 1;
  font-weight: 900;
}
.hero-stats span {
  font-size: .72rem; color: var(--muted-foreground);
  margin-top: 8px; text-transform: uppercase; letter-spacing: .7px;
  font-weight: 700;
}
@media (max-width: 640px) {
  .hero { padding: 16px 16px 30px; margin-top: 24px; }
  .hero-kicker { font-size: .65rem; padding: 6px 12px; margin-bottom: 18px; }
  .hero-stats { gap: 10px; margin-top: 28px; }
  .hero-stats > div { padding: 12px 14px; border-radius: 16px; }
  .hero-stats span { font-size: .6rem; }
}

/* CV GRID */
.cv-grid {
  max-width: 1320px; margin: 20px auto 60px;
  padding: 0 28px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 22px;
  position: relative; z-index: 1;
}
@media (max-width: 900px) { .cv-grid { grid-template-columns: 1fr; padding: 0 16px; } }

.brut-card {
  background: var(--card);
  border: 3px solid var(--foreground);
  border-radius: 28px;
  padding: 30px;
  box-shadow: var(--shadow-brut);
  position: relative;
  overflow: hidden;
}
@media (max-width: 480px) { .brut-card { padding: 22px; border-radius: 22px; } }

.card-tag {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--brut-green); color: #000;
  border: 3px solid var(--foreground);
  padding: 5px 14px; border-radius: 999px;
  font-weight: 900; font-size: .72rem; margin-bottom: 20px;
  text-transform: uppercase; letter-spacing: 1px;
  box-shadow: var(--shadow-brut-sm);
}
.tag-pink { background: var(--brut-pink); color: #000; }

.section-title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  margin: 0 0 18px; letter-spacing: -.5px; line-height: 1.05;
  font-weight: 900;
}

.profile-row { display: flex; gap: 18px; align-items: center; margin-bottom: 22px; }
.avatar-frame {
  width: 96px; height: 96px; min-width: 96px;
  border: 3px solid var(--foreground); border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-brut-sm);
}
.avatar-frame img { width: 100%; height: 100%; object-fit: cover; }
.profile-name {
  font-size: clamp(1.3rem, 2.4vw, 1.8rem);
  line-height: 1.05; margin: 0; font-weight: 900;
}
.profile-role {
  margin: 6px 0 0; font-size: .85rem;
  color: var(--muted-foreground); font-weight: 600;
}

.about-desc { font-size: .95rem; color: var(--muted-foreground); line-height: 1.7; margin: 0 0 14px; }

.contact-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
@media (max-width: 540px) { .contact-row { grid-template-columns: 1fr; } }
.contact-btn {
  background: var(--background);
  border: 3px solid var(--foreground); border-radius: 16px;
  padding: 12px 14px; display: flex; align-items: center; gap: 10px;
  color: var(--foreground); text-decoration: none; font-weight: 700;
  font-size: .85rem;
  box-shadow: var(--shadow-brut-sm);
  transition: transform .12s, background .15s;
  overflow: hidden;
}
.contact-btn:hover { transform: translate(-2px,-2px); background: var(--accent); }
.contact-btn svg { flex-shrink: 0; }
.contact-btn span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* TOOLBELT */
.stack-card { padding-bottom: 18px; display: flex; flex-direction: column; }
.toolbelt-wrap { display: flex; flex-direction: column; gap: 12px; flex: 1; }
.toolbelt-canvas {
  flex: 1; width: calc(100% + 60px); margin-left: -30px;
  height: 360px; overflow: hidden; position: relative;
  background: var(--background);
  border-top: 3px solid var(--foreground);
  border-bottom: 3px solid var(--foreground);
  cursor: grab;
}
[dir="rtl"] .toolbelt-canvas { margin-left: 0; margin-right: -30px; }
.dom-pill {
  position: absolute; top: 0; left: 0;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 14px;
  border: 3px solid var(--foreground); border-radius: 999px;
  font-weight: 800; font-size: .85rem;
  user-select: none; pointer-events: none;
  white-space: nowrap;
  box-shadow: 3px 3px 0 0 rgba(0,0,0,0.5);
  transition: opacity .3s;
}
.reset-btn {
  align-self: flex-start;
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--card); color: var(--foreground);
  border: 3px solid var(--foreground); border-radius: 999px;
  padding: 10px 18px; font-weight: 800; font-size: .85rem;
  cursor: pointer; box-shadow: var(--shadow-brut-sm);
  transition: transform .12s, background .15s;
  margin-top: 14px;
}
.reset-btn:hover { transform: translate(-2px,-2px); background: var(--accent); }

/* SERVICES */
.services {
  max-width: 1320px; margin: 40px auto;
  padding: 0 28px;
  position: relative; z-index: 1;
}
.services-head { margin-bottom: 28px; }
.services-eyebrow {
  display: inline-block;
  background: var(--card);
  border: 3px solid var(--foreground); border-radius: 999px;
  padding: 6px 16px; font-size: .72rem; font-weight: 800;
  letter-spacing: 1.5px; text-transform: uppercase;
  box-shadow: var(--shadow-brut-sm);
  margin-bottom: 14px;
}
.services-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  letter-spacing: -.5px; margin: 0; font-weight: 900;
}
.services-grid {
  display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 18px;
}
@media (max-width: 900px) { .services-grid { grid-template-columns: 1fr; } }

.svc-card {
  border: 3px solid var(--foreground); border-radius: 28px;
  padding: 28px;
  box-shadow: var(--shadow-brut);
  display: flex; flex-direction: column; gap: 12px;
  transition: transform .15s, box-shadow .15s;
}
.svc-card:hover { transform: translate(-3px,-3px); box-shadow: 10px 10px 0 0 var(--foreground); }
.svc-card h3 { font-size: 1.4rem; margin: 0; font-weight: 900; }
.svc-card p { margin: 0; font-size: .95rem; line-height: 1.55; color: #1a1a1a; font-weight: 500; }
.svc-icon {
  width: 56px; height: 56px;
  display: inline-flex; align-items: center; justify-content: center;
  background: #000; color: #fff;
  border: 3px solid var(--foreground); border-radius: 18px;
  box-shadow: var(--shadow-brut-sm);
}
.svc-yellow { background: var(--accent); color: #000; }
.svc-pink   { background: var(--brut-pink); color: #000; }
.svc-green  { background: var(--brut-green); color: #000; }

/* WORK */
.work {
  max-width: 1320px; margin: 60px auto 40px;
  padding: 0 28px;
  position: relative; z-index: 1;
}
.work-head { margin-bottom: 32px; }
.work-eyebrow {
  display: inline-block;
  background: var(--card);
  border: 3px solid var(--foreground); border-radius: 999px;
  padding: 6px 16px; font-size: .72rem; font-weight: 800;
  letter-spacing: 1.5px; text-transform: uppercase;
  box-shadow: var(--shadow-brut-sm);
  margin-bottom: 14px;
}
.work-title {
  font-size: clamp(2rem, 5vw, 3.4rem);
  letter-spacing: -1px; margin: 0 0 10px; font-weight: 900; line-height: 1;
}
.work-sub {
  max-width: 580px; color: var(--muted-foreground);
  font-size: 1rem; line-height: 1.6; margin: 0;
}
.work-grid {
  display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 22px;
}
@media (max-width: 768px) { .work-grid { grid-template-columns: 1fr; } }

.work-card {
  background: var(--card);
  border: 3px solid var(--foreground); border-radius: 28px;
  padding: 22px;
  box-shadow: var(--shadow-brut);
  display: flex; flex-direction: column; gap: 14px;
  transition: transform .15s, box-shadow .15s;
}
.work-card:hover { transform: translate(-3px,-3px); box-shadow: 10px 10px 0 0 var(--foreground); }
.work-accent-pink   { background: color-mix(in oklab, var(--brut-pink) 12%, var(--card)); }
.work-accent-blue   { background: color-mix(in oklab, var(--brut-blue) 12%, var(--card)); }
.work-accent-green  { background: color-mix(in oklab, var(--brut-green) 12%, var(--card)); }
.work-accent-orange { background: color-mix(in oklab, var(--brut-orange) 12%, var(--card)); }

.work-media {
  position: relative; overflow: hidden;
  border: 3px solid var(--foreground); border-radius: 20px;
  aspect-ratio: 4/3;
}
.work-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s; }
.work-card:hover .work-media img { transform: scale(1.05); }
.work-overlay {
  position: absolute; top: 12px; right: 12px;
  width: 44px; height: 44px;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--accent); color: var(--accent-foreground);
  border: 3px solid var(--foreground); border-radius: 50%;
  box-shadow: var(--shadow-brut-sm);
}
.work-meta {
  display: flex; justify-content: space-between; align-items: center;
  font-size: .8rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 1px;
}
.work-num { color: var(--foreground); }
.work-year { color: var(--muted-foreground); }
.work-name {
  font-size: 1.4rem; margin: 0; font-weight: 900;
  letter-spacing: -.5px; line-height: 1.1;
}
.work-desc { margin: 0; font-size: .92rem; color: var(--muted-foreground); line-height: 1.55; }
.work-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.work-tag {
  background: var(--background);
  border: 2px solid var(--foreground); border-radius: 999px;
  padding: 4px 12px; font-size: .72rem; font-weight: 700;
}
.work-link {
  display: inline-flex; align-items: center; gap: 4px;
  color: var(--foreground); text-decoration: none;
  font-weight: 800; font-size: .85rem;
  text-transform: uppercase; letter-spacing: 1px;
  align-self: flex-start;
  border-bottom: 2px solid var(--foreground);
  padding-bottom: 2px;
}

/* SCROLLING BANNERS */
.scroll-stage {
  max-width: 1400px; margin: 50px auto;
  padding: 0; display: flex; flex-direction: column; gap: 0;
  border-top: 3px solid var(--foreground);
  border-bottom: 3px solid var(--foreground);
  overflow: hidden;
}
.scroll-ribbon {
  padding: 14px 0; overflow: hidden;
  border-top: 3px solid var(--foreground);
}
.scroll-ribbon:first-child { border-top: 0; }
.scroll-track {
  display: flex; white-space: nowrap;
  font-weight: 900; font-size: 1.4rem;
  letter-spacing: 1px;
  font-family: 'Thmanyah Display', 'Thmanyah', serif !important;
}
.scroll-ltr { animation: scrollLeft 30s linear infinite; }
.scroll-rtl { animation: scrollRight 30s linear infinite; }
@keyframes scrollLeft { from { transform: translateX(0); } to { transform: translateX(-25%); } }
@keyframes scrollRight { from { transform: translateX(-25%); } to { transform: translateX(0); } }

/* LOGO STRIP */
.logo-strip-heading {
  text-align: center; margin: 40px auto 14px;
  font-size: .78rem; letter-spacing: 2px; text-transform: uppercase;
  color: var(--muted-foreground); font-weight: 700;
}
.logo-strip {
  max-width: 1400px; margin: 0 auto 50px;
  padding: 18px 0;
  border-top: 3px solid var(--foreground);
  border-bottom: 3px solid var(--foreground);
  background: var(--card);
  overflow: hidden;
  display: flex; flex-direction: column; gap: 18px;
}
.logo-strip-row { overflow: hidden; }
.logo-strip-track {
  display: flex; gap: 60px; white-space: nowrap;
  width: max-content;
}
.logo-track-ltr { animation: scrollLeft 40s linear infinite; }
.logo-track-rtl { animation: scrollRight 40s linear infinite; }
.logo-item { flex-shrink: 0; width: 60px; height: 40px; display: flex; align-items: center; justify-content: center; }
.logo-img { max-width: 100%; max-height: 100%; filter: grayscale(1) brightness(.6); opacity: .8; transition: filter .3s, opacity .3s; }
.dark .logo-img { filter: grayscale(1) brightness(1.4); }
.logo-item:hover .logo-img { filter: none; opacity: 1; }

/* FOOTER */
.brut-footer {
  background: var(--foreground); color: var(--background);
  margin-top: 50px;
  border-top: 3px solid var(--foreground);
}
.footer-container {
  max-width: 1320px; margin: 0 auto;
  padding: 50px 28px 30px;
  display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px;
}
@media (max-width: 768px) { .footer-container { grid-template-columns: 1fr; gap: 30px; } }
.footer-branding h3 {
  font-size: clamp(1.6rem, 3vw, 2.4rem); margin: 0 0 12px; font-weight: 900; line-height: 1.1;
}
.footer-branding p { margin: 0 0 18px; color: var(--muted-foreground); font-size: .95rem; line-height: 1.55; }
.footer-socials { display: flex; gap: 8px; }
.social-btn {
  width: 40px; height: 40px;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--background); color: var(--foreground);
  border: 3px solid var(--background); border-radius: 999px;
  transition: transform .12s, background .15s, color .15s;
}
.social-btn:hover { transform: translate(-2px,-2px); background: var(--accent); color: #000; }
.footer-col h4 {
  font-size: .82rem; letter-spacing: 2px; text-transform: uppercase;
  margin: 0 0 14px; font-weight: 900;
}
.footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.footer-col a {
  display: inline-flex; align-items: center; gap: 6px;
  color: var(--muted-foreground); text-decoration: none;
  font-size: .9rem; font-weight: 600;
  transition: color .15s;
}
.footer-col a:hover { color: var(--background); }

.footer-bottom {
  max-width: 1320px; margin: 0 auto;
  padding: 18px 28px;
  border-top: 1px solid color-mix(in oklab, var(--background) 20%, transparent);
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;
  font-size: .8rem; color: var(--muted-foreground);
}
`;
