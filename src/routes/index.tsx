import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import {
  Mail,
  Phone,
  Github,
  Globe,
  Sparkles,
  Code2,
  Zap,
  Twitter,
  Instagram,
  Dribbble,
  ChevronRight,
  RefreshCw,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Parasayte — Creative Engineer Portfolio" },
      {
        name: "description",
        content:
          "Neo-brutalist portfolio for Parasayte — interactive graphics, physics-driven UI, and full-stack engineering.",
      },
      { property: "og:title", content: "Parasayte — Creative Engineer" },
      {
        property: "og:description",
        content: "Interactive physics-driven multilingual portfolio.",
      },
    ],
  }),
  component: Index,
});

/* ---------- i18n ---------- */
type Lang = "en" | "ar" | "tr";

const LANGS: { code: Lang; label: string; next: Lang }[] = [
  { code: "en", label: "English",  next: "ar" },
  { code: "ar", label: "العربية",  next: "tr" },
  { code: "tr", label: "Türkçe",   next: "en" },
];

const T = {
  nav_work:     { en: "Work",      ar: "الأعمال", tr: "Çalışmalar" },
  nav_about:    { en: "About",     ar: "عني",     tr: "Hakkımda" },
  nav_stack:    { en: "Stack",     ar: "الأدوات", tr: "Yetkinlikler" },
  nav_contact:  { en: "Contact",   ar: "تواصل",   tr: "İletişim" },
  hero_kicker:  { en: "CREATIVE ENGINEER · PORTFOLIO 2026", ar: "مهندس مبدع · معرض 2026", tr: "YARATICI MÜHENDİS · PORTFÖY 2026" },
  hero_line1:   { en: "BUILDING",  ar: "نبني",   tr: "İNŞA" },
  hero_line2:   { en: "LOUD",      ar: "أنظمة",  tr: "GÜRÜLTÜLÜ" },
  hero_line3:   { en: "SYSTEMS.",  ar: "صاخبة.", tr: "SİSTEMLER." },
  hero_sub:     {
    en: "Interactive graphics, physics-driven interfaces and high-performance production systems — designed for shipping, engineered for scale.",
    ar: "بيئات جرافيكس تفاعلية وواجهات تعتمد على الفيزياء وأنظمة إنتاج عالية الأداء — مصممة للإطلاق ومهندسة للنمو.",
    tr: "Etkileşimli grafikler, fizik tabanlı arayüzler ve yüksek performanslı üretim sistemleri — yayına hazır, ölçeklenmek üzere mühendislenmiş.",
  },
  hero_cta1:    { en: "View Selected Work", ar: "تصفّح الأعمال", tr: "Seçili İşleri Gör" },
  hero_cta2:    { en: "Get in touch",       ar: "تواصل معي",     tr: "İletişime Geç" },
  hero_stat1:   { en: "Years shipping", ar: "سنوات خبرة",  tr: "Yıllık deneyim" },
  hero_stat2:   { en: "Live projects",  ar: "مشروع منشور", tr: "Yayındaki proje" },
  hero_stat3:   { en: "Stack mastery",  ar: "تقنية متقنة", tr: "Hakim teknoloji" },
  tag_creative: { en: "CREATIVE ENGINEER", ar: "مهندس برمجيات", tr: "YARATICI MÜHENDİS" },
  about:        { en: "About Me", ar: "نبذة عني", tr: "Hakkımda" },
  about_desc:   {
    en: "Full-stack engineer specialised in interactive graphics, dynamic physics architectures, and production-ready high-performance systems.",
    ar: "مهندس برمجيات متكامل متخصص في بيئات الجرافيكس التفاعلية وهندسة الواجهات وبناء أنظمة برمجية متكاملة.",
    tr: "Etkileşimli grafikler, dinamik fizik mimarileri ve üretim seviyesinde yüksek performanslı sistemlerde uzmanlaşmış full-stack mühendis.",
  },
  tag_stack:    { en: "STACK",    ar: "المنظومة التقنية", tr: "TEKNOLOJİLER" },
  toolbelt:     { en: "Toolbelt", ar: "الأدوات", tr: "Araç Kutusu" },
  reset:        { en: "Reset",    ar: "إعادة",   tr: "Sıfırla" },
  featured:     { en: "Selected Work", ar: "أعمال مختارة", tr: "Seçili Çalışmalar" },
  featured_sub: {
    en: "A curated selection of systems shipped between 2023–2026.",
    ar: "مجموعة مختارة من الأنظمة التي أُطلقت بين 2023 و2026.",
    tr: "2023–2026 arasında yayına alınan seçili sistemler.",
  },
  case_study:   { en: "View case study", ar: "عرض الدراسة", tr: "Vakayı incele" },
  trusted:      { en: "Trusted tech & studios", ar: "موثوق من قبل", tr: "Güvenilen teknoloji ve stüdyolar" },
  footer_title: { en: "Let's build something loud.", ar: "لنبنِ شيئاً يُسمع.", tr: "Birlikte gürültülü bir şey inşa edelim." },
  footer_sub:   {
    en: "Available for selected freelance & contract engagements across interactive engineering, motion design, and product systems.",
    ar: "متاح للمشاريع المستقلة والعقود المختارة في هندسة التفاعل وتصميم الحركة وأنظمة المنتجات.",
    tr: "Etkileşimli mühendislik, hareket tasarımı ve ürün sistemleri alanlarında seçili freelance ve sözleşmeli işler için müsaitim.",
  },
  navigate:     { en: "Navigate", ar: "التنقل", tr: "Gezin" },
  contact:      { en: "Contact",  ar: "تواصل",  tr: "İletişim" },
  journal:      { en: "Journal",  ar: "المدونة", tr: "Günce" },
  rights:       { en: "All rights reserved", ar: "جميع الحقوق محفوظة", tr: "Tüm hakları saklıdır" },
};

function t<K extends keyof typeof T>(k: K, lang: Lang): string {
  return T[k][lang];
}

/* ---------- data ---------- */
const PILLS = [
  { label: "React",       color: "#61DAFB", text: "#000", slug: "react"        },
  { label: "TypeScript",  color: "#3178C6", text: "#fff", slug: "typescript"   },
  { label: "Node.js",     color: "#3eff8b", text: "#000", slug: "nodedotjs"    },
  { label: "WebGL",       color: "#ff65c3", text: "#fff", slug: "webgl"        },
  { label: "Three.js",    color: "#ffca3a", text: "#000", slug: "threedotjs"   },
  { label: "GSAP",        color: "#88CE02", text: "#000", slug: "greensock"    },
  { label: "Rust",        color: "#CE422B", text: "#fff", slug: "rust"         },
  { label: "Figma",       color: "#F24E1E", text: "#fff", slug: "figma"        },
  { label: "Google",      color: "#4285F4", text: "#fff", slug: "google"       },
  { label: "Meta",        color: "#0081FB", text: "#fff", slug: "meta"         },
  { label: "Apple",       color: "#555555", text: "#fff", slug: "apple"        },
  { label: "Microsoft",   color: "#00A4EF", text: "#fff", slug: "microsoft"    },
  { label: "AWS",         color: "#FF9900", text: "#000", slug: "amazonaws"    },
  { label: "OpenAI",      color: "#10A37F", text: "#fff", slug: "anthropic"    },
  { label: "Replit",      color: "#F26207", text: "#fff", slug: "replit"       },
  { label: "Discord",     color: "#5865F2", text: "#fff", slug: "discord"      },
  { label: "Next.js",     color: "#e2e2e2", text: "#000", slug: "nextdotjs"    },
  { label: "Tailwind",    color: "#06B6D4", text: "#fff", slug: "tailwindcss"  },
  { label: "PostgreSQL",  color: "#336791", text: "#fff", slug: "postgresql"   },
  { label: "Docker",      color: "#2496ED", text: "#fff", slug: "docker"       },
  { label: "Vercel",      color: "#e8e8e8", text: "#000", slug: "vercel"       },
  { label: "Supabase",    color: "#3ECF8E", text: "#000", slug: "supabase"     },
  { label: "GitHub",      color: "#2d333b", text: "#fff", slug: "github"       },
  { label: "Stripe",      color: "#635BFF", text: "#fff", slug: "stripe"       },
  { label: "Redis",       color: "#DC382D", text: "#fff", slug: "redis"        },
  { label: "GraphQL",     color: "#E10098", text: "#fff", slug: "graphql"      },
  { label: "Cloudflare",  color: "#F38020", text: "#fff", slug: "cloudflare"   },
  { label: "Kubernetes",  color: "#326CE5", text: "#fff", slug: "kubernetes"   },
  { label: "Terraform",   color: "#844FBA", text: "#fff", slug: "terraform"    },
];

const LOGO_ROW1 = [
  { name: "Replit",      slug: "replit",          color: "F26207" },
  { name: "GitHub",      slug: "github",           color: "ffffff" },
  { name: "Google",      slug: "google",           color: "4285F4" },
  { name: "Kali Linux",  slug: "kalilinux",        color: "557C94" },
  { name: "Kubernetes",  slug: "kubernetes",       color: "326CE5" },
  { name: "Meta",        slug: "meta",             color: "0081FB" },
  { name: "Apple",       slug: "apple",            color: "ffffff" },
  { name: "Terraform",   slug: "terraform",        color: "844FBA" },
  { name: "Anthropic",   slug: "anthropic",        color: "ffffff" },
  { name: "Discord",     slug: "discord",          color: "5865F2" },
  { name: "Vercel",      slug: "vercel",           color: "ffffff" },
  { name: "Figma",       slug: "figma",            color: "F24E1E" },
  { name: "Stripe",      slug: "stripe",           color: "635BFF" },
  { name: "Spotify",     slug: "spotify",          color: "1DB954" },
];

const LOGO_ROW2 = [
  { name: "Docker",     slug: "docker",      color: "2496ED" },
  { name: "Tailwind",   slug: "tailwindcss", color: "06B6D4" },
  { name: "PostgreSQL", slug: "postgresql",  color: "4169E1" },
  { name: "Redis",      slug: "redis",       color: "FF4438" },
  { name: "Cloudflare", slug: "cloudflare",  color: "F38020" },
  { name: "Next.js",    slug: "nextdotjs",   color: "ffffff" },
  { name: "GraphQL",    slug: "graphql",     color: "E10098" },
  { name: "Netflix",    slug: "netflix",     color: "E50914" },
  { name: "Notion",     slug: "notion",      color: "ffffff" },
  { name: "Linear",     slug: "linear",      color: "5E6AD2" },
  { name: "Supabase",   slug: "supabase",    color: "3ECF8E" },
  { name: "MongoDB",    slug: "mongodb",     color: "47A248" },
  { name: "Firebase",   slug: "firebase",    color: "FFCA28" },
  { name: "TypeScript", slug: "typescript",  color: "3178C6" },
];

/* ---------- projects ---------- */
const PROJECTS = [
  {
    num: "01",
    title: { en: "Neural Core Engine", ar: "محرك العصبون المركزي", tr: "Sinirsel Çekirdek Motoru" },
    year: "2026",
    tags: ["WebGL", "TypeScript", "GPU"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    desc: {
      en: "Real-time visualisation layer mapping ML pipelines onto a GPU canvas — sub-frame latency.",
      ar: "طبقة تصوّر فورية ترسم مسارات تعلم الآلة على لوحة GPU بزمن استجابة دون الإطار.",
      tr: "ML hatlarını GPU tuvaline çizen gerçek zamanlı görselleştirme katmanı — kare altı gecikme.",
    },
    accent: "#a374ff",
  },
  {
    num: "02",
    title: { en: "Cryptographic Grid", ar: "الشبكة التشفيرية", tr: "Kriptografik Ağ" },
    year: "2025",
    tags: ["Rust", "Edge", "Security"],
    img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=900&q=80",
    desc: {
      en: "Edge-deployed zero-trust mesh with custom signature scheme and audited bindings.",
      ar: "شبكة انعدام الثقة منشورة على الحافة مع نظام توقيع مخصص وروابط مدققة.",
      tr: "Özel imza şeması ve denetlenmiş bağlamalarla, uçta dağıtılmış sıfır güven ağı.",
    },
    accent: "#3eff8b",
  },
  {
    num: "03",
    title: { en: "Motion OS", ar: "نظام الحركة", tr: "Hareket İşletim Sistemi" },
    year: "2025",
    tags: ["React", "GSAP", "Design System"],
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    desc: {
      en: "Component library powering 40+ marketing sites with physics-grade choreography.",
      ar: "مكتبة مكونات تُشغّل أكثر من 40 موقعًا تسويقيًا بتنسيق حركي على مستوى الفيزياء.",
      tr: "Fizik kalitesinde koreografi ile 40+ pazarlama sitesini besleyen bileşen kütüphanesi.",
    },
    accent: "#ff65c3",
  },
  {
    num: "04",
    title: { en: "Studio Tools", ar: "أدوات الاستوديو", tr: "Stüdyo Araçları" },
    year: "2024",
    tags: ["Node.js", "DevOps", "Realtime"],
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    desc: {
      en: "Internal tooling for a design studio — collaborative canvases, build pipelines, devops.",
      ar: "أدوات داخلية لاستوديو تصميم — لوحات تعاون ومسارات بناء وعمليات تشغيل.",
      tr: "Bir tasarım stüdyosu için iç araçlar — işbirlikçi tuvaller, derleme hatları, devops.",
    },
    accent: "#ffca3a",
  },
];

/* ---------- scrolling banner items (translated) ---------- */
const SCROLL_ROWS_I18N: { bg: string; color: string; dir: "left" | "right"; items: Record<Lang, string[]> }[] = [
  {
    bg: "#ff65c3", color: "#000", dir: "left",
    items: {
      en: ["GRADE", "ENGINEERING", "PRODUCTION", "REACT", "BACKEND", "DATABASE"],
      ar: ["جودة", "هندسة", "إنتاج", "ريأكت", "خلفية", "قاعدة بيانات"],
      tr: ["KALİTE", "MÜHENDİSLİK", "ÜRETİM", "REACT", "BACKEND", "VERİTABANI"],
    },
  },
  {
    bg: "#a374ff", color: "#fff", dir: "right",
    items: {
      en: ["FULLSTACK", "DESIGN", "BUILD", "DEPLOY", "SCALE", "SHIP"],
      ar: ["متكامل", "تصميم", "بناء", "نشر", "توسع", "إطلاق"],
      tr: ["FULLSTACK", "TASARIM", "İNŞA", "DAĞITIM", "ÖLÇEK", "YAYIN"],
    },
  },
  {
    bg: "#3eff8b", color: "#000", dir: "left",
    items: {
      en: ["INTERACTIVE", "GRAPHICS", "MOTION", "WEBGL", "TYPESCRIPT", "NODE"],
      ar: ["تفاعلي", "جرافيكس", "حركة", "ويب جي إل", "تايب سكريبت", "نود"],
      tr: ["ETKİLEŞİMLİ", "GRAFİK", "HAREKET", "WEBGL", "TYPESCRIPT", "NODE"],
    },
  },
  {
    bg: "#ffca3a", color: "#000", dir: "right",
    items: {
      en: ["GITHUB", "VERCEL", "STRIPE", "SUPABASE", "TAILWIND", "NEXTJS"],
      ar: ["جيت هاب", "فيرسل", "سترايب", "سوبابيس", "تيلويند", "نكست"],
      tr: ["GITHUB", "VERCEL", "STRIPE", "SUPABASE", "TAILWIND", "NEXTJS"],
    },
  },
];

/* ================================================================== */
/* AURORA BACKGROUND                                                    */
/* ================================================================== */
function AuroraBackground() {
  return (
    <div className="aurora-root" aria-hidden="true">
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
      <div className="aurora-orb aurora-orb-3" />
      <div className="aurora-orb aurora-orb-4" />
      <div className="aurora-orb aurora-orb-5" />
      <div className="aurora-grid" />
    </div>
  );
}

/* ================================================================== */
/* CURSOR SPOTLIGHT                                                      */
/* ================================================================== */
function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -999, y: -999 });
  const curr = useRef({ x: -999, y: -999 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      const dx = pos.current.x - curr.current.x;
      const dy = pos.current.y - curr.current.y;
      curr.current.x += dx * 0.06;
      curr.current.y += dy * 0.06;
      if (ref.current) {
        ref.current.style.transform = `translate(${curr.current.x - 350}px, ${curr.current.y - 350}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div ref={ref} className="cursor-spotlight" aria-hidden="true" />;
}

/* ================================================================== */
function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const current = LANGS.find((l) => l.code === lang)!;
  const nextLang = LANGS.find((l) => l.code === current.next)!;

  return (
    <div className="brutal-root" dir={dir} data-lang={lang}>
      <style>{CSS}</style>
      <AuroraBackground />
      <CursorSpotlight />

      {/* HEADER */}
      <header className="brutal-header">
        <a href="#top" className="brutal-logo">
          <Sparkles size={18} strokeWidth={3} />
          <span>PARASAYTE</span>
        </a>

        <nav className="brutal-nav">
          <a href="#work">{t("nav_work", lang)}</a>
          <a href="#about">{t("nav_about", lang)}</a>
          <a href="#stack">{t("nav_stack", lang)}</a>
          <a href="#contact">{t("nav_contact", lang)}</a>
        </nav>

        <div className="brutal-header-actions">
          <button className="lang-badge" onClick={() => setLang(nextLang.code)}>
            <Globe size={16} strokeWidth={3} />
            <span>{nextLang.label}</span>
          </button>
          <button
            className="menu-toggle"
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} strokeWidth={3} /> : <Menu size={20} strokeWidth={3} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <a href="#work">{t("nav_work", lang)}</a>
          <a href="#about">{t("nav_about", lang)}</a>
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
          <span className="hero-word hero-word-outline">{t("hero_line2", lang)}</span>
          <span className="hero-word hero-word-accent">{t("hero_line3", lang)}</span>
        </h1>
        <p className="hero-sub">{t("hero_sub", lang)}</p>
        <div className="hero-cta-row">
          <a href="#work" className="hero-cta hero-cta-primary">
            {t("hero_cta1", lang)} <ArrowUpRight size={18} strokeWidth={3} />
          </a>
          <a href="#contact" className="hero-cta hero-cta-ghost">
            {t("hero_cta2", lang)}
          </a>
        </div>
        <div className="hero-stats">
          <div><strong>06+</strong><span>{t("hero_stat1", lang)}</span></div>
          <div><strong>40+</strong><span>{t("hero_stat2", lang)}</span></div>
          <div><strong>30+</strong><span>{t("hero_stat3", lang)}</span></div>
        </div>
      </section>

      <main className="cv-grid" id="about">
        {/* Profile */}
        <section className="brutal-card">
          <div className="card-tag">
            <Code2 size={14} strokeWidth={3} />
            {t("tag_creative", lang)}
          </div>

          <div className="profile-container">
            <div className="avatar-frame">
              <img src="https://images2.imgbox.com/14/5e/YYO6KGYd_o.jpg" alt="Parasayte portrait" />
            </div>
            <div>
              <h2 className="profile-name">Parasayte</h2>
            </div>
          </div>

          <h3 className="section-title">{t("about", lang)}</h3>
          <p className="about-desc">{t("about_desc", lang)}</p>

          <div className="contact-row" id="contact">
            <a href="mailto:hougjgrxkj@gmail.com" className="contact-button">
              <Mail size={18} strokeWidth={2.5} />
              <span>hougjgrxkj@gmail.com</span>
            </a>
            <a href="https://instagram.com/selam9x" target="_blank" rel="noreferrer" className="contact-button">
              <Instagram size={18} strokeWidth={2.5} />
              <span>@selam9x</span>
            </a>
            <a href="tel:+905411442870" className="contact-button">
              <Phone size={18} strokeWidth={2.5} />
              <span>+90 541 144 2870</span>
            </a>
            <a href="https://github.com/Parasayte" target="_blank" rel="noreferrer" className="contact-button">
              <Github size={18} strokeWidth={2.5} />
              <span>Parasayte</span>
            </a>
          </div>
        </section>

        {/* Toolbelt */}
        <section className="brutal-card stack-card" id="stack">
          <div className="card-tag tag-accent">
            <Zap size={14} strokeWidth={3} />
            {t("tag_stack", lang)}
          </div>
          <h3 className="section-title">{t("toolbelt", lang)}</h3>
          <ToolbeltPhysics resetLabel={t("reset", lang)} />
        </section>
      </main>

      {/* WORK — redesigned */}
      <section className="work-section" id="work">
        <div className="work-head">
          <div className="work-head-left">
            <div className="work-eyebrow">{t("nav_work", lang).toUpperCase()} · 2023—2026</div>
            <h2 className="work-title">{t("featured", lang)}</h2>
          </div>
          <p className="work-sub">{t("featured_sub", lang)}</p>
        </div>

        <div className="work-grid">
          {PROJECTS.map((p) => (
            <article
              key={p.num}
              className="work-card"
              style={{ ["--accent" as string]: p.accent }}
            >
              <div className="work-media">
                <img src={p.img} alt={p.title[lang]} loading="lazy" />
                <div className="work-overlay">
                  <ArrowUpRight size={28} strokeWidth={3} />
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

      <div className="logo-strip-heading">
        <span>{t("trusted", lang)}</span>
      </div>
      <CompanyLogoStrip />

      <footer className="brutal-footer">
        <div className="footer-container">
          <div className="footer-branding">
            <h3>{t("footer_title", lang)}</h3>
            <p>{t("footer_sub", lang)}</p>
            <div className="footer-socials">
              <a className="social-icon-btn" href="https://twitter.com" aria-label="Twitter"><Twitter size={18} strokeWidth={2.5} /></a>
              <a className="social-icon-btn" href="https://instagram.com/selam9x" aria-label="Instagram"><Instagram size={18} strokeWidth={2.5} /></a>
              <a className="social-icon-btn" href="https://github.com/Parasayte" aria-label="GitHub"><Github size={18} strokeWidth={2.5} /></a>
              <a className="social-icon-btn" href="https://dribbble.com" aria-label="Dribbble"><Dribbble size={18} strokeWidth={2.5} /></a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>{t("navigate", lang)}</h4>
            <ul>
              <li><a href="#work"><ChevronRight size={12} strokeWidth={3} /> {t("nav_work", lang)}</a></li>
              <li><a href="#about"><ChevronRight size={12} strokeWidth={3} /> {t("nav_about", lang)}</a></li>
              <li><a href="#stack"><ChevronRight size={12} strokeWidth={3} /> {t("nav_stack", lang)}</a></li>
              <li><a href="#contact"><ChevronRight size={12} strokeWidth={3} /> {t("nav_contact", lang)}</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>{t("contact", lang)}</h4>
            <ul>
              <li><a href="mailto:hougjgrxkj@gmail.com"><Mail size={12} strokeWidth={3} /> hougjgrxkj@gmail.com</a></li>
              <li><a href="tel:+905411442870"><Phone size={12} strokeWidth={3} /> +90 541 144 2870</a></li>
              <li><a href="https://instagram.com/selam9x"><Instagram size={12} strokeWidth={3} /> @selam9x</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Parasayte · {t("rights", lang)}</p>
          <p>Built with React · Matter.js</p>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================ */
/* TOOLBELT PHYSICS                                             */
/* ============================================================ */
function ToolbeltPhysics({ resetLabel }: { resetLabel: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillEls      = useRef<(HTMLDivElement | null)[]>([]);
  const [key, setKey]     = useState(0);
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
      Matter.Bodies.rectangle(W / 2, H + 25,  W * 2, 50,    invis),
      Matter.Bodies.rectangle(-25,   H / 2,   50,    H * 2, invis),
      Matter.Bodies.rectangle(W + 25, H / 2,  50,    H * 2, invis),
    ]);

    const PH = 38;
    const bodies = pillEls.current.map((el, i) => {
      if (!el) return null;
      const PW  = el.offsetWidth || 90;
      const cols = W < 400 ? 2 : W < 640 ? 3 : 4;
      const col  = i % cols;
      const row  = Math.floor(i / cols);
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
    container.removeEventListener("wheel",          mw);
    container.removeEventListener("mousewheel",     mw);
    container.removeEventListener("DOMMouseScroll", mw);

    const mc = Matter.MouseConstraint.create(engine, {
      mouse, constraint: { stiffness: 0.3, damping: 0.1, render: { visible: false } },
    });
    Matter.Composite.add(engine.world, mc);
    Matter.Events.on(mc, "startdrag", () => { container.style.cursor = "grabbing"; });
    Matter.Events.on(mc, "enddrag",   () => { container.style.cursor = "grab"; });

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
    <div className="toolbelt-physics-wrap">
      <div ref={containerRef} className="toolbelt-canvas-container">
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
/* COMPANY LOGO STRIP — B&W default, original color on hover    */
/* ============================================================ */
function CompanyLogoStrip() {
  const row1 = [...LOGO_ROW1, ...LOGO_ROW1, ...LOGO_ROW1];
  const row2 = [...LOGO_ROW2, ...LOGO_ROW2, ...LOGO_ROW2];
  return (
    <section className="logo-strip-section">
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
/* SCROLLING BANNERS (translated)                               */
/* ============================================================ */
function ScrollingBanners({ lang }: { lang: Lang }) {
  return (
    <section className="scroll-stage" aria-label="Skill banners">
      {SCROLL_ROWS_I18N.map((row, i) => {
        const items = row.items[lang];
        return (
          <div key={i} className="scroll-ribbon" style={{ background: row.bg, color: row.color }}>
            <div className={`scroll-track ${row.dir === "right" ? "scroll-rtl" : "scroll-ltr"}`}>
              {[...items, ...items, ...items, ...items].map((item, k) => (
                <span key={k}>{item}&nbsp;&nbsp;·&nbsp;&nbsp;</span>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

/* ---------- styles ---------- */
const CSS = `
:root {
  --bg: #08090e;
  --primary: #a374ff;
  --secondary: #ff65c3;
  --accent: #3eff8b;
  --card-bg: #11131c;
  --card-bg-2: #13151f;
  --text: #ffffff;
  --muted: #8e95a8;
  --border-thick: 3px solid #000000;
  --shadow-brutal: 5px 5px 0 #000;
  --shadow-brutal-lg: 10px 10px 0 #000;
  --shadow-glow-purple: 0 0 40px rgba(163,116,255,.25), 0 0 80px rgba(163,116,255,.1);
  --shadow-glow-green: 0 0 40px rgba(62,255,139,.2), 0 0 80px rgba(62,255,139,.08);
  --shadow-glow-pink: 0 0 40px rgba(255,101,195,.2), 0 0 80px rgba(255,101,195,.08);
  --radius: 24px;
  --noise: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
}

/* ====== AURORA BACKGROUND ====== */
.aurora-root {
  position: fixed; inset: 0; z-index: 0;
  pointer-events: none; overflow: hidden;
}

.aurora-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
}

.aurora-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  mix-blend-mode: screen;
}

.aurora-orb-1 {
  width: 700px; height: 700px;
  top: -15%; left: -10%;
  background: radial-gradient(circle, rgba(163,116,255,0.55) 0%, rgba(163,116,255,0.15) 45%, transparent 70%);
  animation: orbDrift1 18s ease-in-out infinite;
}

.aurora-orb-2 {
  width: 600px; height: 600px;
  top: 10%; right: -8%;
  background: radial-gradient(circle, rgba(255,101,195,0.5) 0%, rgba(255,101,195,0.12) 45%, transparent 70%);
  animation: orbDrift2 22s ease-in-out infinite;
}

.aurora-orb-3 {
  width: 500px; height: 500px;
  bottom: 20%; left: 20%;
  background: radial-gradient(circle, rgba(62,255,139,0.4) 0%, rgba(62,255,139,0.1) 45%, transparent 70%);
  animation: orbDrift3 26s ease-in-out infinite;
}

.aurora-orb-4 {
  width: 450px; height: 450px;
  bottom: -10%; right: 10%;
  background: radial-gradient(circle, rgba(255,202,58,0.35) 0%, rgba(255,202,58,0.08) 45%, transparent 70%);
  animation: orbDrift4 20s ease-in-out infinite;
}

.aurora-orb-5 {
  width: 350px; height: 350px;
  top: 45%; left: 40%;
  background: radial-gradient(circle, rgba(0,210,255,0.3) 0%, rgba(0,210,255,0.07) 45%, transparent 70%);
  animation: orbDrift5 30s ease-in-out infinite;
}

@keyframes orbDrift1 {
  0%,100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
  30%     { transform: translate(120px, 80px) scale(1.15); opacity: 1; }
  60%     { transform: translate(-60px, 160px) scale(0.9); opacity: 0.6; }
  80%     { transform: translate(80px, -40px) scale(1.05); opacity: 0.9; }
}
@keyframes orbDrift2 {
  0%,100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
  25%     { transform: translate(-100px, 120px) scale(1.2); opacity: 0.9; }
  55%     { transform: translate(60px, -80px) scale(0.85); opacity: 0.5; }
  75%     { transform: translate(-40px, 60px) scale(1.1); opacity: 0.8; }
}
@keyframes orbDrift3 {
  0%,100% { transform: translate(0, 0) scale(1); opacity: 0.65; }
  35%     { transform: translate(80px, -120px) scale(1.25); opacity: 0.85; }
  65%     { transform: translate(-100px, 40px) scale(0.8); opacity: 0.45; }
  85%     { transform: translate(40px, 80px) scale(1.1); opacity: 0.75; }
}
@keyframes orbDrift4 {
  0%,100% { transform: translate(0, 0) scale(1); opacity: 0.55; }
  40%     { transform: translate(-80px, -100px) scale(1.15); opacity: 0.75; }
  70%     { transform: translate(100px, 60px) scale(0.9); opacity: 0.4; }
}
@keyframes orbDrift5 {
  0%,100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
  33%     { transform: translate(120px, 60px) scale(1.3); opacity: 0.6; }
  66%     { transform: translate(-80px, -100px) scale(0.75); opacity: 0.3; }
}

/* ====== CURSOR SPOTLIGHT ====== */
.cursor-spotlight {
  position: fixed;
  top: 0; left: 0;
  width: 700px; height: 700px;
  pointer-events: none;
  z-index: 1;
  will-change: transform;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(163,116,255,0.07) 0%,
    rgba(62,255,139,0.04) 30%,
    transparent 70%
  );
  mix-blend-mode: screen;
  filter: blur(2px);
}
@media (hover: none) { .cursor-spotlight { display: none; } }

.brutal-root {
  background: var(--bg);
  font-family: 'Plus Jakarta Sans', 'Thmanyah Sans', 'Inter', sans-serif;
  color: var(--text);
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
}

/* Turkish: prioritise a fully-featured Latin-Extended font so ğ/ş/ı/İ/ç/ö/ü render correctly */
[data-lang="tr"] {
  font-family: 'Plus Jakarta Sans', 'Thmanyah Sans', 'Inter', sans-serif;
}
[data-lang="tr"] h1,
[data-lang="tr"] h2,
[data-lang="tr"] h3,
[data-lang="tr"] h4,
[data-lang="tr"] .brutal-logo,
[data-lang="tr"] .section-title,
[data-lang="tr"] .profile-name {
  font-family: 'Syne', 'Plus Jakarta Sans', sans-serif;
}

[dir="rtl"] { font-family: 'Thmanyah Sans', 'Cairo', 'Plus Jakarta Sans', sans-serif; }

.brutal-root h1, .brutal-root h2, .brutal-root h3, .brutal-root h4, .brutal-logo {
  font-family: 'Thmanyah Serif Display', 'Syne', 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
}

[dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] h4,
[dir="rtl"] .brutal-logo, [dir="rtl"] .section-title,
[dir="rtl"] .profile-name, [dir="rtl"] .card-tag {
  font-family: 'Thmanyah Serif Display', 'Thmanyah Sans', sans-serif;
}

/* HEADER */
.brutal-header {
  position: sticky; top: 0; z-index: 50;
  padding: 14px 24px;
  display: flex; justify-content: space-between; align-items: center;
  gap: 18px;
  max-width: 1400px; margin: 0 auto;
  backdrop-filter: blur(20px) saturate(1.4);
  background: rgba(8,9,14,0.7);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.brutal-header::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(163,116,255,0.5), rgba(62,255,139,0.4), transparent);
}
.brutal-logo {
  background: var(--primary); color: #000;
  padding: 10px 22px; border: 3px solid #000; border-radius: 18px;
  box-shadow: var(--shadow-brutal), 0 0 20px rgba(163,116,255,0.35);
  font-size: 1.05rem; letter-spacing: -.5px;
  display: inline-flex; align-items: center; gap: 10px;
  text-decoration: none; flex-shrink: 0;
  transition: box-shadow .2s, transform .15s;
}
.brutal-logo:hover {
  box-shadow: 7px 7px 0 #000, 0 0 35px rgba(163,116,255,0.6);
  transform: translate(-2px,-2px);
}
.brutal-nav {
  display: flex; gap: 4px; align-items: center;
  background: rgba(17,19,28,0.9);
  border: 2px solid rgba(255,255,255,0.1); border-radius: 999px;
  padding: 6px; box-shadow: 0 0 0 1px rgba(163,116,255,0.15), inset 0 1px 0 rgba(255,255,255,0.06);
  backdrop-filter: blur(12px);
}
.brutal-nav a {
  color: var(--muted); text-decoration: none;
  padding: 8px 18px; font-weight: 700; font-size: .85rem;
  text-transform: uppercase; letter-spacing: .8px;
  border-radius: 999px; transition: background .2s, color .2s, box-shadow .2s;
  font-family: 'Syne', sans-serif;
}
.brutal-nav a:hover {
  background: var(--primary); color: #000;
  box-shadow: 0 0 14px rgba(163,116,255,0.5);
}

.brutal-header-actions { display: flex; align-items: center; gap: 10px; }

.lang-badge {
  background: rgba(255,255,255,0.95); color: #000;
  padding: 8px 18px; border: 3px solid #000; border-radius: 15px;
  font-weight: 800; box-shadow: var(--shadow-brutal);
  display: inline-flex; align-items: center; gap: 8px;
  cursor: pointer; font-family: 'Syne', sans-serif; font-size: .9rem;
  transition: transform .12s, box-shadow .12s; flex-shrink: 0;
}
.lang-badge:hover { transform: translate(-2px,-2px); box-shadow: 7px 7px 0 #000; }

.menu-toggle {
  display: none;
  background: var(--accent); color: #000;
  border: 3px solid #000; border-radius: 12px;
  width: 42px; height: 42px;
  align-items: center; justify-content: center;
  cursor: pointer; box-shadow: 3px 3px 0 #000;
  transition: box-shadow .15s, transform .12s;
}
.menu-toggle:hover { transform: translate(-1px,-1px); box-shadow: 4px 4px 0 #000; }

.mobile-menu {
  position: fixed; top: 70px; left: 12px; right: 12px;
  z-index: 49;
  background: rgba(17,19,28,0.95);
  border: 2px solid rgba(255,255,255,0.1); border-radius: 20px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(163,116,255,0.15);
  padding: 16px; backdrop-filter: blur(24px);
  display: flex; flex-direction: column; gap: 6px;
}
.mobile-menu a {
  color: var(--text); text-decoration: none;
  padding: 14px 18px; font-weight: 800;
  text-transform: uppercase; letter-spacing: .5px;
  border-radius: 12px; border: 2px solid transparent;
  font-family: 'Syne', sans-serif; transition: background .18s, color .18s;
}
.mobile-menu a:hover { background: var(--primary); color: #000; border-color: #000; }

@media (max-width: 900px) {
  .brutal-nav { display: none; }
  .menu-toggle { display: inline-flex; }
}
@media (max-width: 520px) {
  .brutal-logo span { display: none; }
  .brutal-logo { padding: 10px 14px; }
  .lang-badge { padding: 8px 12px; }
}

/* HERO */
.hero {
  max-width: 1400px; margin: 30px auto 20px;
  padding: 40px 28px 60px;
  position: relative; z-index: 1;
}
.hero-kicker {
  display: inline-flex; align-items: center; gap: 10px;
  background: rgba(62,255,139,0.07);
  border: 1px solid rgba(62,255,139,0.25);
  padding: 8px 18px; border-radius: 999px;
  font-size: .75rem; font-weight: 700; letter-spacing: 2px;
  color: rgba(62,255,139,0.85); text-transform: uppercase;
  font-family: 'Syne', sans-serif;
  margin-bottom: 36px;
  box-shadow: 0 0 20px rgba(62,255,139,0.1);
}
.hero-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent), 0 0 20px rgba(62,255,139,0.5);
  animation: pulse 1.8s ease-in-out infinite;
}
@keyframes pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: .4; transform: scale(0.75); }
}

.hero-title {
  font-size: clamp(3.2rem, 13vw, 12rem);
  line-height: 0.85;
  letter-spacing: -.04em;
  margin: 0;
  display: flex; flex-direction: column;
  text-transform: uppercase;
}
.hero-word { display: block; }
.hero-word-outline {
  color: transparent;
  -webkit-text-stroke: 2px rgba(255,255,255,0.6);
  padding-left: clamp(20px, 5vw, 80px);
}
.hero-word-accent {
  color: var(--accent);
  text-shadow: 0 0 80px rgba(62,255,139,0.4), 0 0 160px rgba(62,255,139,0.15);
}

[dir="rtl"] .hero-word-outline { padding-left: 0; padding-right: clamp(20px, 5vw, 80px); }

.hero-sub {
  max-width: 600px;
  margin: 36px 0 0;
  color: var(--muted);
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  line-height: 1.7;
}
.hero-cta-row {
  margin-top: 36px;
  display: flex; flex-wrap: wrap; gap: 14px;
}
.hero-cta {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 16px 30px;
  border: 3px solid #000; border-radius: 16px;
  font-weight: 800; font-family: 'Syne', sans-serif;
  text-decoration: none; text-transform: uppercase;
  font-size: .92rem; letter-spacing: .6px;
  box-shadow: var(--shadow-brutal);
  transition: transform .15s, box-shadow .15s, filter .2s;
}
.hero-cta:hover { transform: translate(-3px,-3px); box-shadow: 8px 8px 0 #000; }
.hero-cta-primary {
  background: var(--accent); color: #000;
  box-shadow: var(--shadow-brutal), 0 0 30px rgba(62,255,139,0.3);
}
.hero-cta-primary:hover {
  box-shadow: 8px 8px 0 #000, 0 0 50px rgba(62,255,139,0.5);
}
.hero-cta-ghost {
  background: rgba(255,255,255,0.04); color: var(--text);
  border-color: rgba(255,255,255,0.15);
  box-shadow: none;
  backdrop-filter: blur(8px);
}
.hero-cta-ghost:hover {
  background: rgba(255,255,255,0.09);
  border-color: rgba(255,255,255,0.3);
  box-shadow: 0 0 20px rgba(255,255,255,0.05);
  transform: translate(-2px,-2px);
}

.hero-stats {
  margin-top: 60px;
  display: grid; grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 16px; max-width: 580px;
}
.hero-stats > div {
  display: flex; flex-direction: column;
  padding: 20px 22px;
  background: rgba(17,19,28,0.7);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;
  box-shadow: 0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
  backdrop-filter: blur(12px);
  transition: border-color .3s, box-shadow .3s;
}
.hero-stats > div:hover {
  border-color: rgba(62,255,139,0.3);
  box-shadow: 0 4px 30px rgba(0,0,0,0.4), 0 0 20px rgba(62,255,139,0.1), inset 0 1px 0 rgba(255,255,255,0.06);
}
.hero-stats strong {
  font-family: 'Thmanyah Serif Display', 'Syne', sans-serif;
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  color: var(--accent);
  line-height: 1;
  text-shadow: 0 0 30px rgba(62,255,139,0.4);
}
.hero-stats span {
  font-size: .72rem; color: var(--muted);
  margin-top: 8px; text-transform: uppercase; letter-spacing: .8px;
  font-weight: 600; font-family: 'Syne', sans-serif;
}

@media (max-width: 640px) {
  .hero { padding: 18px 16px 30px; margin-top: 16px; }
  .hero-kicker { font-size: .68rem; padding: 6px 12px; margin-bottom: 22px; }
  .hero-sub { margin-top: 22px; }
  .hero-cta { padding: 13px 20px; font-size: .83rem; }
  .hero-stats { margin-top: 36px; gap: 10px; }
  .hero-stats > div { padding: 14px 14px; border-radius: 14px; }
  .hero-stats span { font-size: .62rem; }
}

/* CV grid */
.cv-grid {
  max-width: 1400px; margin: 20px auto 70px;
  padding: 0 28px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 28px;
  position: relative; z-index: 1;
}
@media (max-width: 1024px) { .cv-grid { padding: 0 16px; gap: 20px; } }
@media (max-width: 768px)  { .cv-grid { grid-template-columns: 1fr; gap: 18px; } }
@media (max-width: 480px)  { .cv-grid { padding: 0 12px; gap: 14px; } }

.brutal-card {
  background: rgba(17,19,28,0.75);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius);
  box-shadow: 0 8px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);
  padding: 34px; position: relative; overflow: hidden;
  backdrop-filter: blur(16px);
  transition: border-color .3s, box-shadow .3s;
}
.brutal-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(163,116,255,0.4), transparent);
}
.brutal-card:hover {
  border-color: rgba(163,116,255,0.25);
  box-shadow: 0 12px 80px rgba(0,0,0,0.6), 0 0 40px rgba(163,116,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1);
}
@media (max-width: 768px) { .brutal-card { padding: 24px; } }
@media (max-width: 480px) { .brutal-card { padding: 18px; border-radius: 18px; } }

.card-tag {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(62,255,139,0.12);
  color: var(--accent);
  border: 1px solid rgba(62,255,139,0.35);
  padding: 6px 14px; border-radius: 10px;
  font-weight: 800; font-size: .75rem; margin-bottom: 22px;
  text-transform: uppercase; letter-spacing: 1px;
  font-family: 'Syne', sans-serif;
  box-shadow: 0 0 12px rgba(62,255,139,0.1);
}
@media (max-width: 480px) {
  .card-tag { padding: 4px 10px; font-size: .68rem; }
}
.tag-accent {
  background: rgba(255,101,195,0.1);
  color: var(--secondary);
  border-color: rgba(255,101,195,0.3);
  box-shadow: 0 0 12px rgba(255,101,195,0.1);
}

.section-title {
  font-size: 2rem; margin-bottom: 22px; letter-spacing: -1px; line-height: 1.1;
  background: linear-gradient(135deg, #fff 60%, rgba(163,116,255,0.8));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
@media (max-width: 768px) { .section-title { font-size: 1.5rem; margin-bottom: 16px; } }
@media (max-width: 480px) { .section-title { font-size: 1.3rem; } }

.profile-container { display: flex; gap: 22px; align-items: center; margin-bottom: 26px; }
@media (max-width: 480px) { .profile-container { gap: 14px; margin-bottom: 18px; } }

.avatar-frame {
  width: 120px; height: 120px; min-width: 120px;
  border: 2px solid rgba(163,116,255,0.4);
  border-radius: 22px;
  box-shadow: 0 0 0 1px rgba(163,116,255,0.15), 0 0 30px rgba(163,116,255,0.2);
  overflow: hidden;
}
@media (max-width: 480px) {
  .avatar-frame { width: 84px; height: 84px; min-width: 84px; }
}
.avatar-frame img { width: 100%; height: 100%; object-fit: cover; }

.profile-name {
  font-size: 2rem; letter-spacing: -1px; line-height: 1.05;
  background: linear-gradient(135deg, #fff, rgba(163,116,255,0.85));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
@media (max-width: 480px) { .profile-name { font-size: 1.3rem; } }

.about-desc { font-size: .94rem; color: var(--muted); line-height: 1.7; margin-bottom: 12px; }
@media (max-width: 480px) { .about-desc { font-size: .85rem; } }

.contact-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 22px; }
@media (max-width: 640px) { .contact-row { grid-template-columns: 1fr; } }

.contact-button {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 12px 16px; display: flex; align-items: center; gap: 10px;
  color: var(--text); text-decoration: none; font-weight: 600;
  font-size: .88rem; backdrop-filter: blur(8px);
  transition: background .2s, border-color .2s, box-shadow .2s, transform .15s;
  overflow: hidden;
}
.contact-button:hover {
  background: rgba(255,101,195,0.08);
  border-color: rgba(255,101,195,0.35);
  box-shadow: 0 0 20px rgba(255,101,195,0.1);
  transform: translateY(-2px);
}
.contact-button svg { color: var(--secondary); flex-shrink: 0; }
.contact-button span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

@media (max-width: 480px) {
  .contact-button { padding: 10px 12px; border-radius: 10px; font-size: .8rem; }
}

/* TOOLBELT */
.stack-card { padding-bottom: 20px; display: flex; flex-direction: column; }
.toolbelt-physics-wrap { display: flex; flex-direction: column; gap: 12px; flex: 1; }
.toolbelt-canvas-container {
  flex: 1; width: calc(100% + 68px); margin-left: -34px;
  height: 370px; overflow: hidden; position: relative;
  cursor: grab; user-select: none; -webkit-user-select: none; touch-action: none;
}
@media (max-width: 768px) {
  .toolbelt-canvas-container { height: 300px; width: calc(100% + 48px); margin-left: -24px; }
}
@media (max-width: 480px) {
  .toolbelt-canvas-container { height: 250px; width: calc(100% + 36px); margin-left: -18px; }
}
.toolbelt-canvas-container:active { cursor: grabbing; }

.dom-pill {
  position: absolute; left: 0; top: 0;
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 15px; border-radius: 9999px;
  border: 1.5px solid rgba(255,255,255,0.15);
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 13px;
  white-space: nowrap; user-select: none; pointer-events: none;
  will-change: transform;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
  transition: opacity 0.15s; z-index: 5;
}
@media (max-width: 480px) { .dom-pill { padding: 6px 12px; font-size: 11px; } }
.dom-pill img { display: block; flex-shrink: 0; }

.reset-btn {
  align-self: flex-start;
  display: inline-flex; align-items: center; gap: 7px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12); border-radius: 10px;
  padding: 8px 16px; color: var(--muted); font-weight: 700; font-size: .8rem;
  cursor: pointer;
  transition: background .2s, color .2s, border-color .2s, transform .12s;
  text-transform: uppercase; letter-spacing: .5px;
  font-family: 'Syne', sans-serif;
}
.reset-btn:hover {
  background: rgba(163,116,255,0.12);
  border-color: rgba(163,116,255,0.4);
  color: var(--primary);
  transform: translateY(-1px);
}

/* ===== WORK SECTION ===== */
.work-section {
  max-width: 1400px; margin: 40px auto 90px;
  padding: 0 28px; position: relative; z-index: 1;
}
@media (max-width: 480px) { .work-section { padding: 0 12px; margin: 24px auto 55px; } }

.work-head {
  display: grid; grid-template-columns: 1.4fr 1fr; gap: 30px;
  align-items: end; margin-bottom: 40px;
  padding-bottom: 28px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
@media (max-width: 768px) {
  .work-head { grid-template-columns: 1fr; gap: 18px; margin-bottom: 28px; padding-bottom: 20px; }
}
.work-eyebrow {
  font-size: .72rem; color: var(--primary); font-weight: 700;
  letter-spacing: 2.5px; margin-bottom: 14px; font-family: 'Syne', sans-serif;
  display: inline-flex; align-items: center; gap: 8px;
}
.work-eyebrow::before {
  content: ''; display: inline-block;
  width: 20px; height: 2px;
  background: var(--primary);
  box-shadow: 0 0 8px var(--primary);
}
.work-title {
  font-size: clamp(2.4rem, 6vw, 5rem);
  letter-spacing: -.03em; line-height: 0.95; margin: 0;
  background: linear-gradient(135deg, #fff 50%, rgba(163,116,255,0.7));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.work-sub { color: var(--muted); font-size: .97rem; line-height: 1.65; max-width: 380px; }

.work-grid {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
@media (max-width: 900px) { .work-grid { grid-template-columns: 1fr; gap: 18px; } }

.work-card {
  position: relative;
  background: rgba(17,19,28,0.7);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 22px;
  box-shadow: 0 8px 50px rgba(0,0,0,0.45);
  padding: 22px;
  display: flex; flex-direction: column; gap: 14px;
  backdrop-filter: blur(12px);
  transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
}
.work-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent,#3eff8b), transparent);
  opacity: 0.4; border-radius: 22px 22px 0 0;
  transition: opacity .3s;
}
.work-card:hover::before { opacity: 0.9; }
.work-card:hover {
  transform: translateY(-6px);
  border-color: rgba(62,255,139,0.2);
  box-shadow: 0 24px 80px rgba(0,0,0,0.55), 0 0 60px rgba(62,255,139,0.06);
}
@media (max-width: 768px) { .work-card { padding: 18px; } }
@media (max-width: 480px) { .work-card { padding: 14px; border-radius: 16px; } }

.work-media {
  position: relative;
  width: 100%; aspect-ratio: 16/10;
  border: 1px solid rgba(255,255,255,0.08); border-radius: 14px;
  overflow: hidden; background: #1a1d28;
}
.work-media img {
  width: 100%; height: 100%; object-fit: cover;
  filter: saturate(0.8) brightness(0.9);
  transition: transform .7s ease, filter .4s ease;
}
.work-card:hover .work-media img { transform: scale(1.06); filter: saturate(1.1) brightness(1); }

.work-overlay {
  position: absolute; top: 12px; right: 12px;
  width: 44px; height: 44px;
  background: var(--accent); color: #000;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transform: translate(8px,-8px) scale(0.8);
  transition: opacity .28s, transform .28s;
  box-shadow: 0 0 24px rgba(62,255,139,0.6);
}
.work-card:hover .work-overlay { opacity: 1; transform: translate(0,0) scale(1); }

.work-meta {
  display: flex; justify-content: space-between; align-items: center;
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: .75rem; letter-spacing: 1.2px;
  color: var(--muted); text-transform: uppercase;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  padding-bottom: 10px;
}
.work-num { color: var(--accent); font-size: 1rem; text-shadow: 0 0 14px rgba(62,255,139,0.6); }

.work-name { font-size: 1.3rem; margin: 0; color: #fff; letter-spacing: -.4px; font-family: 'Syne', sans-serif; font-weight: 800; }
@media (max-width: 480px) { .work-name { font-size: 1.08rem; } }

.work-desc { color: var(--muted); font-size: .9rem; line-height: 1.65; margin: 0; }
@media (max-width: 480px) { .work-desc { font-size: .83rem; } }

.work-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.work-tag {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 4px 11px; border-radius: 999px;
  font-size: .69rem; font-weight: 700;
  color: var(--muted); letter-spacing: .5px;
  font-family: 'Syne', sans-serif;
  transition: background .2s, border-color .2s, color .2s;
}
.work-tag:hover {
  background: rgba(163,116,255,0.1);
  border-color: rgba(163,116,255,0.4);
  color: var(--primary);
}

.work-link {
  margin-top: auto; align-self: flex-start;
  display: inline-flex; align-items: center; gap: 6px;
  font-weight: 800; color: var(--accent); text-decoration: none;
  font-size: .8rem; text-transform: uppercase; letter-spacing: .6px;
  padding-top: 6px; font-family: 'Syne', sans-serif;
  transition: gap .2s, text-shadow .2s;
}
.work-link:hover { gap: 10px; text-shadow: 0 0 16px rgba(62,255,139,0.6); }

/* COMPANY LOGO STRIP */
.logo-strip-heading {
  max-width: 1400px; margin: 0 auto;
  padding: 30px 22px 16px; text-align: center;
}
.logo-strip-heading span {
  font-family: 'Syne', sans-serif; font-weight: 700;
  letter-spacing: 3px; font-size: .7rem;
  color: var(--muted); text-transform: uppercase;
}

.logo-strip-section {
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(8,9,14,0.85);
}
.logo-strip-row {
  overflow: hidden; padding: 28px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.logo-strip-row:last-child { border-bottom: none; }
@media (max-width: 480px) { .logo-strip-row { padding: 16px 0; } }

.logo-strip-track { display: inline-flex; align-items: center; white-space: nowrap; }

@keyframes logoScrollLTR { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
@keyframes logoScrollRTL { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
.logo-track-ltr { animation: logoScrollLTR 38s linear infinite; }
.logo-track-rtl { animation: logoScrollRTL 38s linear infinite; }

.logo-item { display: inline-flex; align-items: center; padding: 0 44px; flex-shrink: 0; }
@media (max-width: 480px) { .logo-item { padding: 0 24px; } }

.logo-img {
  width: 42px; height: 42px; object-fit: contain; display: block;
  filter: grayscale(1) brightness(0.7) contrast(0.7);
  opacity: 0.38;
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
}
.logo-item:hover .logo-img {
  filter: none; opacity: 1; transform: scale(1.3);
}
@media (max-width: 480px) { .logo-img { width: 30px; height: 30px; } }

/* SCROLLING BANNERS */
.scroll-stage { margin: 55px 0 72px; overflow: hidden; }
@media (max-width: 480px) { .scroll-stage { margin: 28px 0 46px; } }
.scroll-ribbon {
  padding: 18px 0; overflow: hidden; margin-bottom: -1px;
  position: relative;
}
.scroll-ribbon::before, .scroll-ribbon::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 80px; z-index: 2;
  pointer-events: none;
}
.scroll-ribbon::before { left: 0; background: linear-gradient(to right, var(--bg-color, #000), transparent); }
.scroll-ribbon::after  { right: 0; background: linear-gradient(to left, var(--bg-color, #000), transparent); }
@media (max-width: 480px) { .scroll-ribbon { padding: 12px 0; } }

.scroll-track {
  display: flex; white-space: nowrap;
  font-family: 'Syne', sans-serif;
  font-weight: 900; font-size: 1.45rem;
  text-transform: uppercase; letter-spacing: 1px;
}
@media (max-width: 768px) { .scroll-track { font-size: 1.15rem; } }
@media (max-width: 480px) { .scroll-track { font-size: 0.9rem; } }

.scroll-track span { display: inline-block; }
.scroll-ltr { animation: scrollLTR 22s linear infinite; }
.scroll-rtl { animation: scrollRTL 22s linear infinite; }
@keyframes scrollLTR { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-50%, 0, 0); } }
@keyframes scrollRTL { 0% { transform: translate3d(-50%, 0, 0); } 100% { transform: translate3d(0, 0, 0); } }

/* FOOTER */
.brutal-footer {
  background: rgba(6,7,12,0.97);
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 72px 28px 32px; position: relative; z-index: 1;
}
.brutal-footer::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(163,116,255,0.55), rgba(62,255,139,0.45), transparent);
}
@media (max-width: 768px) { .brutal-footer { padding: 46px 18px 22px; } }
@media (max-width: 480px) { .brutal-footer { padding: 34px 14px 22px; } }

.footer-container {
  max-width: 1400px; margin: 0 auto;
  display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 50px;
}
@media (max-width: 1024px) { .footer-container { grid-template-columns: 1fr; gap: 32px; } }

.footer-branding h3 {
  font-size: 1.7rem; margin-bottom: 14px;
  background: linear-gradient(135deg, var(--accent), var(--primary));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
@media (max-width: 480px) { .footer-branding h3 { font-size: 1.25rem; } }

.footer-branding p { color: var(--muted); line-height: 1.65; max-width: 440px; margin-bottom: 24px; font-size: .92rem; }
@media (max-width: 480px) { .footer-branding p { font-size: .86rem; } }

.footer-links-col h4 {
  font-size: .85rem; color: rgba(255,255,255,0.65); margin-bottom: 18px;
  border-bottom: 1px solid rgba(255,255,255,0.07); padding-bottom: 10px;
  letter-spacing: 1.5px; text-transform: uppercase; font-family: 'Syne', sans-serif;
}
.footer-links-col ul { list-style: none; padding: 0; margin: 0; }
.footer-links-col ul li { margin-bottom: 10px; }
.footer-links-col ul li a {
  color: var(--muted); text-decoration: none; font-weight: 600;
  display: inline-flex; align-items: center; gap: 8px; transition: color .2s;
  font-size: .88rem;
}
.footer-links-col ul li a:hover { color: var(--accent); }

.footer-socials { display: flex; gap: 10px; }
.social-icon-btn {
  width: 42px; height: 42px;
  background: rgba(255,255,255,0.05); color: var(--muted);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  text-decoration: none; backdrop-filter: blur(8px);
  transition: background .2s, color .2s, border-color .2s, box-shadow .2s, transform .15s;
  flex-shrink: 0;
}
.social-icon-btn:hover {
  background: rgba(163,116,255,0.15); color: var(--primary);
  border-color: rgba(163,116,255,0.4);
  box-shadow: 0 0 20px rgba(163,116,255,0.25);
  transform: translateY(-3px);
}

.footer-bottom {
  max-width: 1400px; margin: 52px auto 0;
  padding-top: 22px; border-top: 1px solid rgba(255,255,255,0.07);
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 18px;
}
@media (max-width: 480px) { .footer-bottom { flex-direction: column; text-align: center; margin: 28px auto 0; gap: 8px; } }
.footer-bottom p { font-size: .82rem; color: rgba(255,255,255,0.3); }
@media (max-width: 480px) { .footer-bottom p { font-size: .75rem; } }
`;
