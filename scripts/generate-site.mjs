import fs from "node:fs";
import path from "node:path";

const outDir = process.cwd();
const siteUrl = "https://video.skyba.cn";
const company = {
  name: "成都天际网络科技有限公司",
  phone: "028-27359595",
  mobile: "17313127895",
  address: "成都市简阳市园中苑A区",
};

const regions = [
  ["sc", "四川"],
  ["cd", "成都"],
  ["lqy", "龙泉驿"],
  ["qbj", "青白江"],
  ["xd", "新都"],
  ["wj", "温江"],
  ["sl", "双流"],
  ["pd", "郫都"],
  ["xj", "新津"],
  ["jt", "金堂"],
  ["dy", "大邑"],
  ["pj", "蒲江"],
  ["jy", "简阳"],
  ["djy", "都江堰"],
  ["pz", "彭州"],
  ["ql", "邛崃"],
  ["cz", "崇州"],
];

const services = [
  ["企业宣传片", "企业形象片、品牌故事、工厂实力片、招商片、产品发布片，以策划脚本和镜头语言强化信任感。"],
  ["城市宣传片", "城市形象、文旅推介、园区招商、乡村振兴、项目汇报，兼顾航拍视野与叙事节奏。"],
  ["短视频制作", "抖音、视频号、小红书、快手内容策划拍摄剪辑，覆盖账号栏目、探店、口播、剧情和活动传播。"],
  ["MG动画制作", "二维动画、信息可视化、政策解读、产品原理、课程动画，让复杂内容更容易被理解和转发。"],
  ["广告片/TVC", "品牌广告、产品广告、门店广告、互联网投放素材，从创意分镜到交付成片一站式执行。"],
  ["活动会议拍摄", "发布会、年会、论坛、峰会、展会、培训、庆典，多机位拍摄、快剪回顾、直播导播支持。"],
  ["电商与产品视频", "产品展示、详情页视频、直播预热视频、种草内容、使用教程，提升转化与停留时长。"],
  ["航拍与延时摄影", "无人机航拍、城市地标、厂区园区、工程进度、自然风光、延时摄影，为画面建立规模感。"],
];

const industries = [
  "制造业与工业园区",
  "政府机关与事业单位",
  "文旅景区与城市品牌",
  "地产建筑与工程项目",
  "教育培训与学校宣传",
  "医疗健康与连锁机构",
  "餐饮酒店与本地生活",
  "科技互联网与软件服务",
  "农业品牌与乡村振兴",
  "展会活动与商业发布",
];

const workflow = [
  ["需求诊断", "明确传播目标、受众、投放渠道、预算范围和交付周期。"],
  ["策划脚本", "输出创意方向、内容结构、采访提纲、分镜脚本与拍摄清单。"],
  ["现场拍摄", "导演、摄影、灯光、收音、航拍与制片统筹，保障现场效率。"],
  ["后期制作", "剪辑、调色、字幕、配音、音乐、包装、MG动画和版本适配。"],
  ["交付优化", "根据投放平台输出横版、竖版、海报封面和精简传播版本。"],
];

const packages = [
  ["标准宣传片", "适合企业官网、招商洽谈、展会播放", "脚本策划 / 1-2天拍摄 / 精剪成片 / 字幕配音 / 常用比例输出"],
  ["城市与园区片", "适合政府文旅、园区招商、项目汇报", "创意策划 / 航拍地标 / 采访素材 / 数据包装 / 多版本交付"],
  ["短视频月度服务", "适合持续运营抖音、视频号、小红书", "选题策划 / 批量拍摄 / 快剪包装 / 封面字幕 / 账号内容节奏建议"],
];

const css = String.raw`
:root {
  --ink: #111319;
  --deep: #171a22;
  --panel: #f7f5ef;
  --paper: #ffffff;
  --muted: #6b7280;
  --line: #ded8c9;
  --gold: #b88942;
  --gold-dark: #8a612d;
  --blue: #2f6f88;
  --jade: #2f7d68;
  --danger: #a35042;
  --shadow: 0 18px 50px rgba(16, 19, 25, .12);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", Arial, sans-serif;
  color: var(--ink);
  background: #f3f0e8;
  line-height: 1.7;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
.container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }

.site-header {
  position: fixed;
  z-index: 20;
  inset: 0 0 auto 0;
  background: rgba(17, 19, 25, .82);
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,.12);
  backdrop-filter: blur(16px);
}
.header-inner { display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 24px; }
.brand { display: flex; flex-direction: column; line-height: 1.2; min-width: 198px; }
.brand strong { font-size: 18px; letter-spacing: 0; }
.brand span { color: rgba(255,255,255,.66); font-size: 12px; margin-top: 6px; }
.nav { display: flex; align-items: center; gap: 24px; font-size: 14px; color: rgba(255,255,255,.84); }
.nav a:hover { color: #fff; }
.header-actions { display: flex; align-items: center; gap: 12px; }
.phone-link { color: #fff; font-weight: 700; white-space: nowrap; }
.menu-toggle {
  display: none;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255,255,255,.22);
  background: transparent;
  color: #fff;
  border-radius: 6px;
  font-size: 22px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-weight: 700;
  line-height: 1.2;
}
.btn-primary { background: var(--gold); color: #121212; }
.btn-primary:hover { background: #c99a52; }
.btn-outline { border-color: rgba(255,255,255,.32); color: #fff; }
.btn-dark { background: var(--ink); color: #fff; }

.hero {
  min-height: 720px;
  color: #fff;
  padding-top: 72px;
  background:
    linear-gradient(90deg, rgba(13,14,18,.93) 0%, rgba(13,14,18,.82) 34%, rgba(13,14,18,.28) 68%, rgba(13,14,18,.62) 100%),
    url("../images/hero-production.png") center / cover no-repeat;
}
.hero-inner { min-height: 648px; display: grid; align-items: center; padding: 56px 0 64px; }
.eyebrow { color: #d8b070; font-size: 14px; font-weight: 700; letter-spacing: 0; text-transform: uppercase; }
.hero h1 {
  width: min(780px, 100%);
  margin: 18px 0 20px;
  font-size: clamp(38px, 6vw, 72px);
  line-height: 1.08;
  letter-spacing: 0;
}
.hero .lead { width: min(690px, 100%); color: rgba(255,255,255,.82); font-size: 19px; margin: 0 0 30px; }
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
.hero-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  width: min(900px, 100%);
  margin-top: 58px;
  border: 1px solid rgba(255,255,255,.13);
  background: rgba(255,255,255,.1);
}
.metric { padding: 18px; background: rgba(16,18,24,.72); }
.metric strong { display: block; font-size: 24px; color: #fff; }
.metric span { color: rgba(255,255,255,.7); font-size: 13px; }

section { padding: 82px 0; }
.section-dark { background: var(--deep); color: #fff; }
.section-soft { background: var(--panel); }
.section-head { display: flex; justify-content: space-between; align-items: end; gap: 28px; margin-bottom: 34px; }
.section-head h2 { font-size: clamp(28px, 4vw, 44px); line-height: 1.18; margin: 0; letter-spacing: 0; }
.section-head p { margin: 0; max-width: 560px; color: var(--muted); }
.section-dark .section-head p { color: rgba(255,255,255,.68); }

.service-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.service-card {
  min-height: 252px;
  padding: 24px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: 0 10px 28px rgba(17,19,25,.06);
}
.service-card b { display: block; color: var(--gold-dark); margin-bottom: 10px; font-size: 17px; }
.service-card p { color: #555b66; margin: 0; font-size: 14px; }
.service-num { font-size: 13px; color: #9b8b6b; margin-bottom: 22px; }

.industries { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
.industry { padding: 15px 14px; border: 1px solid rgba(255,255,255,.18); border-radius: 6px; color: rgba(255,255,255,.86); background: rgba(255,255,255,.04); }

.process { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 1px; background: var(--line); border: 1px solid var(--line); }
.process-step { min-height: 205px; padding: 24px 20px; background: #fff; }
.process-step span { color: var(--gold); font-weight: 800; }
.process-step h3 { margin: 18px 0 8px; font-size: 18px; }
.process-step p { margin: 0; color: #606672; font-size: 14px; }

.package-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.package { padding: 26px; border-radius: 8px; background: #fff; border: 1px solid var(--line); box-shadow: var(--shadow); }
.package h3 { margin: 0 0 8px; font-size: 22px; }
.package p { margin: 0 0 18px; color: var(--muted); }
.package .scope { border-top: 1px solid var(--line); padding-top: 18px; color: #3c424c; font-size: 14px; }

.region-layout { display: grid; grid-template-columns: 1.1fr .9fr; gap: 34px; align-items: start; }
.region-copy h2 { font-size: clamp(28px, 4vw, 42px); line-height: 1.2; margin: 0 0 18px; }
.region-copy p { color: #505762; margin: 0 0 16px; }
.area-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.area-link { padding: 13px 14px; background: #fff; border: 1px solid var(--line); border-radius: 6px; color: #333943; }
.area-link:hover { border-color: var(--gold); color: var(--gold-dark); }

.seo-content { padding-top: 0; }
.seo-panel {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 32px;
  box-shadow: var(--shadow);
}
.seo-panel h2, .seo-panel h3 { line-height: 1.25; margin-top: 0; }
.seo-panel p, .seo-panel li { color: #4f5661; }
.seo-panel ul { padding-left: 20px; }
.keyword-cloud { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
.keyword-cloud span {
  border: 1px solid var(--line);
  background: #faf8f1;
  color: #5b4931;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
}

.contact-band { background: var(--ink); color: #fff; padding: 64px 0; }
.contact-inner { display: grid; grid-template-columns: 1fr auto; gap: 28px; align-items: center; }
.contact-inner h2 { font-size: clamp(28px, 4vw, 42px); margin: 0 0 12px; }
.contact-inner p { margin: 0; color: rgba(255,255,255,.72); }
.contact-list { display: grid; gap: 8px; margin-top: 20px; color: rgba(255,255,255,.86); }
.contact-actions { display: grid; justify-items: center; gap: 14px; }
.qr-card {
  width: 172px;
  padding: 12px;
  border-radius: 8px;
  background: #fff;
  color: var(--ink);
  box-shadow: 0 16px 38px rgba(0,0,0,.22);
}
.qr-card img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  border-radius: 4px;
}
.qr-card span {
  display: block;
  margin-top: 8px;
  text-align: center;
  color: #343842;
  font-size: 13px;
  line-height: 1.35;
}
.aside-qr {
  margin: 18px 0 24px;
  width: 150px;
  box-shadow: 0 12px 30px rgba(17,19,25,.12);
}

.footer { background: #0c0d11; color: rgba(255,255,255,.66); padding: 34px 0; font-size: 14px; }
.footer-inner { display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
.breadcrumb { padding: 104px 0 22px; color: rgba(255,255,255,.72); font-size: 14px; }
.page-hero { min-height: 520px; color: #fff; background:
  linear-gradient(90deg, rgba(13,14,18,.94), rgba(13,14,18,.74), rgba(13,14,18,.42)),
  url("../images/hero-production.png") center / cover no-repeat;
}
.page-hero h1 { font-size: clamp(34px, 6vw, 64px); line-height: 1.1; margin: 18px 0; max-width: 900px; }
.page-hero p { max-width: 760px; color: rgba(255,255,255,.8); font-size: 18px; }

@media (max-width: 980px) {
  .nav {
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    background: rgba(17, 19, 25, .98);
    border-top: 1px solid rgba(255,255,255,.12);
  }
  .nav.is-open { display: flex; }
  .nav a { padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,.08); }
  .menu-toggle { display: inline-grid; place-items: center; }
  .header-actions .btn { display: none; }
  .service-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .industries { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .process { grid-template-columns: 1fr; }
  .package-grid, .region-layout { grid-template-columns: 1fr; }
  .hero-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .contact-inner { grid-template-columns: 1fr; }
  .contact-actions { justify-items: start; }
}

@media (max-width: 640px) {
  .container { width: min(100% - 28px, 1180px); }
  .header-inner { height: 64px; }
  .brand strong { font-size: 15px; }
  .brand span { display: none; }
  .phone-link { display: none; }
  .nav { top: 64px; }
  .hero { min-height: auto; padding-top: 64px; background-position: 62% center; }
  .hero-inner { min-height: 620px; padding: 42px 0 48px; }
  .hero .lead { font-size: 16px; }
  .hero-actions .btn { width: 100%; }
  .hero-metrics { grid-template-columns: 1fr 1fr; margin-top: 34px; }
  .metric { padding: 14px; }
  section { padding: 58px 0; }
  .section-head { display: block; }
  .section-head p { margin-top: 12px; }
  .service-grid, .area-grid { grid-template-columns: 1fr; }
  .service-card { min-height: auto; }
  .industries { grid-template-columns: 1fr; }
  .seo-panel { padding: 22px; }
  .qr-card { width: 158px; }
  .page-hero { min-height: 500px; }
  .breadcrumb { padding-top: 92px; }
}
`;

const js = String.raw`
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".menu-toggle");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
`;

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function header(prefix = "") {
  return `
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="${prefix}index.html" aria-label="${company.name}">
        <strong>${company.name}</strong>
        <span>视频拍摄 · 宣传片制作 · 短视频运营内容</span>
      </a>
      <nav class="nav" aria-label="主导航">
        <a href="${prefix}index.html#services">服务</a>
        <a href="${prefix}index.html#industries">行业</a>
        <a href="${prefix}index.html#process">流程</a>
        <a href="${prefix}index.html#regions">区域</a>
        <a href="${prefix}index.html#contact">联系</a>
      </nav>
      <div class="header-actions">
        <a class="phone-link" href="tel:${company.mobile}">${company.mobile}</a>
        <a class="btn btn-primary" href="tel:${company.phone}">立即咨询</a>
        <button class="menu-toggle" type="button" aria-label="打开导航" aria-expanded="false">☰</button>
      </div>
    </div>
  </header>`;
}

function footer(prefix = "") {
  return `
  <footer class="footer">
    <div class="container footer-inner">
      <span>© <span data-year></span> ${company.name}. 专注四川及成都周边视频拍摄制作服务。</span>
      <span>${company.phone} / ${company.mobile}（微信同号） / ${company.address}</span>
    </div>
  </footer>
  <script src="${prefix}assets/js/site.js"></script>`;
}

function regionLinks(current = "") {
  return regions.map(([slug, name]) => `<a class="area-link" href="${current === "root" ? "" : "../"}${slug}/">${name}视频拍摄</a>`).join("");
}

function ldJson(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function pageShell({ title, description, keywords, canonical, body, prefix = "", schema = [] }) {
  const schemaHtml = schema.map(ldJson).join("\n");
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(keywords)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${siteUrl}/assets/images/hero-production.png">
  <link rel="stylesheet" href="${prefix}assets/css/styles.css">
  ${schemaHtml}
</head>
<body>
${body}
</body>
</html>
`;
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.name,
  telephone: [company.phone, company.mobile],
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address,
    addressLocality: "简阳市",
    addressRegion: "四川省",
    addressCountry: "CN",
  },
  areaServed: regions.map(([, name]) => name),
  url: siteUrl,
  image: `${siteUrl}/assets/images/hero-production.png`,
  serviceType: ["视频拍摄", "企业宣传片拍摄", "城市宣传片制作", "短视频制作", "MG动画制作"],
};

function homePage() {
  const title = "成都视频拍摄制作公司_企业宣传片拍摄_城市宣传片_短视频制作_MG动画制作 | 成都天际网络科技有限公司";
  const description = "成都天际网络科技有限公司提供四川、成都及周边区域视频拍摄、企业宣传片、城市宣传片、短视频制作、MG动画、广告片、活动会议拍摄与航拍服务。电话028-27359595。";
  const body = `${header("")}
  <main>
    <section class="hero">
      <div class="container hero-inner">
        <div>
          <div class="eyebrow">Video Production Studio · Sichuan Chengdu</div>
          <h1>成都高端视频拍摄与宣传片制作公司</h1>
          <p class="lead">从企业宣传片、城市宣传片、短视频内容到MG动画制作，成都天际网络科技有限公司以策划、拍摄、剪辑、包装和投放适配为核心，为四川及成都周边客户打造更具传播力的视频内容。</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="tel:${company.mobile}">手机/微信：${company.mobile}</a>
            <a class="btn btn-outline" href="#regions">查看服务区域</a>
          </div>
          <div class="hero-metrics" aria-label="服务优势">
            <div class="metric"><strong>8+</strong><span>核心视频制作服务</span></div>
            <div class="metric"><strong>17</strong><span>四川成都区域SEO页面</span></div>
            <div class="metric"><strong>1站式</strong><span>策划拍摄剪辑交付</span></div>
            <div class="metric"><strong>H5/PC</strong><span>响应式访问体验</span></div>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="section-soft">
      <div class="container">
        <div class="section-head">
          <h2>覆盖企业、城市、品牌与新媒体的视频制作服务</h2>
          <p>每一种视频都不是简单拍摄，而是围绕传播目标做内容结构、视觉质感、节奏控制和多平台版本适配。</p>
        </div>
        <div class="service-grid">
          ${services.map(([name, desc], i) => `<article class="service-card"><div class="service-num">${String(i + 1).padStart(2, "0")}</div><b>${name}</b><p>${desc}</p></article>`).join("")}
        </div>
      </div>
    </section>

    <section id="industries" class="section-dark">
      <div class="container">
        <div class="section-head">
          <h2>按行业理解内容，而不是套模板拍摄</h2>
          <p>面对政府、企业、园区、文旅、教育、医疗、本地生活和电商品牌，我们会先梳理“谁看、看完做什么、在哪投放”。</p>
        </div>
        <div class="industries">
          ${industries.map((item) => `<div class="industry">${item}</div>`).join("")}
        </div>
      </div>
    </section>

    <section id="process" class="section-soft">
      <div class="container">
        <div class="section-head">
          <h2>从策划到交付的完整制作流程</h2>
          <p>用清晰流程控制预算、周期和成片质量，让客户在每个节点都知道内容正在朝哪个方向推进。</p>
        </div>
        <div class="process">
          ${workflow.map(([name, desc], i) => `<div class="process-step"><span>0${i + 1}</span><h3>${name}</h3><p>${desc}</p></div>`).join("")}
        </div>
      </div>
    </section>

    <section class="section-soft">
      <div class="container">
        <div class="section-head">
          <h2>常用视频制作方案</h2>
          <p>可根据企业规模、拍摄周期、输出平台和预算做定制组合。</p>
        </div>
        <div class="package-grid">
          ${packages.map(([name, desc, scope]) => `<article class="package"><h3>${name}</h3><p>${desc}</p><div class="scope">${scope}</div></article>`).join("")}
        </div>
      </div>
    </section>

    <section id="regions" class="section-soft">
      <div class="container region-layout">
        <div class="region-copy">
          <h2>四川与成都周边区域视频拍摄服务</h2>
          <p>围绕“区域 + 视频拍摄”“区域 + 企业宣传片拍摄”“区域 + 城市宣传片制作”“区域 + 短视频制作”等关键词建立独立页面，便于搜索引擎理解服务覆盖范围。</p>
          <p>每个区域页面都包含本地化标题、关键词、服务说明、内链和结构化数据，可直接用于部署后的SEO收录。</p>
        </div>
        <div class="area-grid">
          ${regionLinks("root")}
        </div>
      </div>
    </section>

    ${contactSection()}
  </main>
  ${footer("")}`;

  return pageShell({
    title,
    description,
    keywords: "成都视频拍摄,成都宣传片制作,企业宣传片拍摄,城市宣传片制作,短视频制作,MG动画制作,四川视频制作公司",
    canonical: `${siteUrl}/`,
    body,
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "成都视频拍摄制作一般包含哪些服务？",
            acceptedAnswer: { "@type": "Answer", text: "通常包含前期策划、脚本分镜、现场拍摄、航拍、收音、剪辑、调色、字幕、配音、包装、MG动画和多平台版本交付。" },
          },
          {
            "@type": "Question",
            name: "企业宣传片和短视频制作有什么区别？",
            acceptedAnswer: { "@type": "Answer", text: "企业宣传片更强调品牌形象、实力展示和长期使用，短视频制作更强调持续选题、平台节奏、转化线索和快速传播。" },
          },
        ],
      },
    ],
  });
}

function contactSection(prefix = "") {
  return `<section id="contact" class="contact-band">
    <div class="container contact-inner">
      <div>
        <h2>需要拍摄宣传片、短视频或MG动画？</h2>
        <p>把行业、用途、预算和期望周期告诉我们，先给您梳理可执行的视频制作方案。</p>
        <div class="contact-list">
          <span>公司：${company.name}</span>
          <span>电话：<a href="tel:${company.phone}">${company.phone}</a></span>
          <span>手机/微信：<a href="tel:${company.mobile}">${company.mobile}</a></span>
          <span>地址：${company.address}</span>
        </div>
      </div>
      <div class="contact-actions">
        <div class="qr-card">
          <img src="${prefix}assets/images/wechat-qr.jpg" alt="微信二维码，手机微信同号${company.mobile}" loading="lazy">
          <span>微信扫码咨询<br>${company.mobile}</span>
        </div>
        <a class="btn btn-primary" href="tel:${company.mobile}">立即沟通需求</a>
      </div>
    </div>
  </section>`;
}

function regionPage(slug, name) {
  const title = `${name}视频拍摄公司_${name}企业宣传片拍摄_${name}城市宣传片制作_${name}短视频制作_MG动画制作 | ${company.name}`;
  const description = `${company.name}提供${name}视频拍摄、${name}企业宣传片拍摄、城市宣传片制作、短视频制作、MG动画制作、广告片、活动会议拍摄、航拍剪辑与后期包装服务。咨询${company.mobile}。`;
  const keywords = `${name}视频拍摄,${name}视频制作公司,${name}企业宣传片拍摄,${name}宣传片制作,${name}城市宣传片,${name}短视频制作,${name}MG动画制作,${name}广告片拍摄`;
  const serviceKeywords = [
    `${name}企业宣传片拍摄`,
    `${name}城市宣传片制作`,
    `${name}短视频制作`,
    `${name}MG动画制作`,
    `${name}广告片拍摄`,
    `${name}活动会议拍摄`,
    `${name}航拍视频制作`,
    `${name}产品视频拍摄`,
  ];
  const body = `${header("../")}
  <main>
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a href="../">首页</a> / ${name}视频拍摄</div>
        <div>
          <div class="eyebrow">${name} Video Production</div>
          <h1>${name}视频拍摄与企业宣传片制作</h1>
          <p>${company.name}面向${name}客户提供宣传片、城市形象片、短视频、MG动画、广告片、活动会议拍摄、航拍和后期包装服务，适合企业官网、招商推介、政务汇报、展会播放和新媒体投放。</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="tel:${company.mobile}">咨询：${company.mobile}</a>
            <a class="btn btn-outline" href="#contact">获取拍摄方案</a>
          </div>
        </div>
      </div>
    </section>

    <section class="seo-content section-soft">
      <div class="container region-layout">
        <article class="seo-panel">
          <h2>${name}视频拍摄服务怎么做更容易出效果？</h2>
          <p>${name}视频拍摄不是把镜头拍得漂亮就结束。真正有效的成片，需要先明确传播目标：是展示企业实力、服务招商引资、推广城市文旅、辅助销售转化，还是为抖音和视频号持续输出内容。成都天际网络科技有限公司会根据${name}客户的行业属性、受众场景和投放渠道，规划脚本结构、采访内容、镜头清单和后期包装风格。</p>
          <p>针对${name}企业宣传片拍摄，我们重点呈现企业规模、研发生产、产品优势、团队服务和客户案例；针对${name}城市宣传片制作，会强化城市地标、产业基础、文旅资源、发展成果与人文温度；针对${name}短视频制作，则更重视选题节奏、前三秒吸引力、字幕包装和多平台分发效率。</p>
          <h3>${name}客户常选的视频类型</h3>
          <ul>
            ${services.slice(0, 6).map(([s, d]) => `<li><strong>${name}${s}：</strong>${d}</li>`).join("")}
          </ul>
          <h3>${name}视频制作交付内容</h3>
          <p>可交付横版宣传片、竖版短视频、15秒/30秒广告版本、会议暖场片、招商推介片、项目汇报片、产品演示片、封面图、字幕版、无字幕版以及适配不同平台的压缩格式。拍摄范围可覆盖${name}本地及四川、成都周边区域。</p>
          <div class="keyword-cloud">
            ${serviceKeywords.map((item) => `<span>${item}</span>`).join("")}
          </div>
        </article>

        <aside class="seo-panel">
          <h2>联系${name}视频制作团队</h2>
          <p>如果您正在寻找${name}视频拍摄公司、${name}宣传片制作团队或短视频制作服务，可以先沟通用途和预算，我们会给出更匹配的执行建议。</p>
          <p><strong>公司：</strong>${company.name}</p>
          <p><strong>电话：</strong><a href="tel:${company.phone}">${company.phone}</a></p>
          <p><strong>手机/微信：</strong><a href="tel:${company.mobile}">${company.mobile}</a></p>
          <p><strong>地址：</strong>${company.address}</p>
          <div class="qr-card aside-qr">
            <img src="../assets/images/wechat-qr.jpg" alt="${name}视频拍摄微信二维码，手机微信同号${company.mobile}" loading="lazy">
            <span>扫码添加微信<br>${company.mobile}</span>
          </div>
          <h3>服务区域内链</h3>
          <div class="area-grid">
            ${regions.filter(([s]) => s !== slug).map(([s, n]) => `<a class="area-link" href="../${s}/">${n}视频拍摄</a>`).join("")}
          </div>
        </aside>
      </div>
    </section>

    <section class="section-soft">
      <div class="container">
        <div class="section-head">
          <h2>${name}视频拍摄制作流程</h2>
          <p>流程清楚，项目就更容易按时、按质、按预算交付。</p>
        </div>
        <div class="process">
          ${workflow.map(([step, desc], i) => `<div class="process-step"><span>0${i + 1}</span><h3>${step}</h3><p>${desc}</p></div>`).join("")}
        </div>
      </div>
    </section>

    ${contactSection("../")}
  </main>
  ${footer("../")}`;

  return pageShell({
    title,
    description,
    keywords,
    canonical: `${siteUrl}/${slug}/`,
    body,
    prefix: "../",
    schema: [
      { ...localBusinessSchema, areaServed: name, url: `${siteUrl}/${slug}/` },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首页", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: `${name}视频拍摄`, item: `${siteUrl}/${slug}/` },
        ],
      },
    ],
  });
}

function write(file, content) {
  const full = path.join(outDir, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
}

write("assets/css/styles.css", css.trimStart());
write("assets/js/site.js", js.trimStart());
write("index.html", homePage());
for (const [slug, name] of regions) {
  write(path.join(slug, "index.html"), regionPage(slug, name));
}

const urls = ["", ...regions.map(([slug]) => `${slug}/`)];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${siteUrl}/${u}</loc><changefreq>weekly</changefreq><priority>${u ? "0.8" : "1.0"}</priority></url>`).join("\n")}
</urlset>
`);
write("urls.txt", `${urls.map((u) => `${siteUrl}/${u}`).join("\n")}\n`);
write("robots.txt", `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`);

console.log(`Generated ${urls.length} pages plus sitemap and robots.`);
