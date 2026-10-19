/* Synchronize initial HTML and sitemap with assets/data.js before publishing.
 * No network dependencies: node scripts/generate-seo.cjs
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const sandbox = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/data.js'), 'utf8'), sandbox);
const {profile: p, posts} = sandbox.window.SITE_DATA;
const base = 'https://zhangjinrui929.github.io/';
const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const identity = `${p.nameZh} ${p.nameEn}`;
const description = `${p.nameZh}（${p.nameEn}）的个人学术主页。${p.role}，研究波散射与反问题、高精度数值方法、快速算法及计算成像。分享论文成果与研究博客。`;
function block(html, name, value) {
  const re = new RegExp(`<!-- ${name}_START -->[\\s\\S]*?<!-- ${name}_END -->`);
  if (!re.test(html)) throw new Error(`Missing generated block: ${name}`);
  return html.replace(re, () => `<!-- ${name}_START -->\n${value}\n<!-- ${name}_END -->`);
}
const hero = `<div class="hero-copy">
  <p class="eyebrow"><span></span> ACADEMIC PROFILE</p>
  <h1>${esc(p.nameZh)}<br><em>${esc(p.nameEn)}</em></h1>
  <p class="hero-role">${esc(p.role)}</p>
  <p class="hero-intro">${esc(p.intro)}</p>
  <p class="hero-intro-en">${esc(p.introEn)}</p>
  <div class="hero-actions">
    <a class="button button-primary" href="#work">查看研究 ↓</a>
    <a class="button button-quiet" href="mailto:${esc(p.email)}">发送邮件 ↗</a>
  </div>
</div>
<aside class="profile-card" aria-label="个人信息卡">
  <div class="portrait-wrap"><img src="${esc(p.photo)}" alt="${esc(identity)}的个人照片"></div>
  <div class="profile-card-body">
    <p class="profile-card-label">CURRENTLY</p>
    <h2>${esc(p.affiliation)}</h2><p>${esc(p.location)}</p>
    <div class="profile-links">${p.links.map(link=>`<a class="text-link" href="${esc(link.href)}">${esc(link.label)}</a>`).join('\n')}</div>
  </div>
</aside>`;
const cards = posts.filter(post => post.featured).map(post => `<article class="post-card">
  <a class="post-card-link" href="${esc(post.href)}">
    <div class="post-card-top"><time datetime="${esc(post.date)}">${esc(post.dateLabel)}</time><span>${esc(post.readTime)}</span></div>
    <h3>${esc(post.title)}</h3><p>${esc(post.excerpt)}</p>
  </a>
</article>`).join('\n');
const person = {'@context':'https://schema.org', '@type':'Person', '@id':base+'#person',
  name:p.nameZh, alternateName:p.nameEn, url:base, image:new URL(p.photo,base).href,
  description:p.intro, affiliation:{'@type':'Organization',name:p.affiliation},
  sameAs:p.links.filter(link => /^https:\/\//.test(link.href)).map(link=>link.href)};
const pages = [
  ['index.html', `${identity}｜个人学术主页`, description, base],
  ['publications.html', `论文与学术成果｜${identity}`, `${identity}的论文与预印本，涵盖波散射、反问题、快速算法和边界积分方程。`, base+'publications.html'],
  ['blog/index.html', `研究博客｜${identity}`, `${identity}的研究博客：从日常现象理解波散射、反问题与应用数学，分享物理建模、数值方法和成像笔记。`, base+'blog/index.html']
];
for (const [file,title,desc,url] of pages) {
  const target = path.join(root,file);
  let html = fs.readFileSync(target,'utf8');
  html = html.replace(/<title>[\s\S]*?<\/title>/,()=>`<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/,()=>`<meta name="description" content="${esc(desc)}">`);
  const canonical = `<link rel="canonical" href="${esc(url)}">`;
  html = /<link rel="canonical"[^>]*>/.test(html) ? html.replace(/<link rel="canonical"[^>]*>/,()=>canonical) : html.replace('</title>',`</title>\n    ${canonical}`);
  if (file==='index.html') {
    html = block(html,'STATIC_PROFILE',hero);
    html = block(html,'STATIC_POSTS',cards);
    const json = `<script type="application/ld+json" id="person-schema">${JSON.stringify(person).replace(/</g,'\\u003c')}</script>`;
    html = /<script[^>]*id="person-schema"/.test(html) ? html.replace(/<script type="application\/ld\+json" id="person-schema">[\s\S]*?<\/script>/,()=>json) : html.replace('</head>',`    ${json}\n  </head>`);
  }
  fs.writeFileSync(target,html);
}
const urls = [...pages.map(p=>p[3]),...posts.map(post=>new URL(post.href,base).href)];
// Deliberately omit lastmod instead of inventing modification dates.
fs.writeFileSync(path.join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url=>`  <url><loc>${esc(url)}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Updated three page headers, static profile/blog links, Person data and ${urls.length} sitemap URLs.`);
