(function () {
  "use strict";

  const data = window.SITE_DATA;
  if (!data) return;

  const body = document.body;
  const base = body.dataset.base || ".";
  const page = body.dataset.page || "home";

  const path = (value) => {
    if (!value || /^(https?:|mailto:|tel:|#)/.test(value)) return value;
    return `${base}/${value}`.replace(/\/\.\//g, "/");
  };

  const escapeHtml = (value = "") =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const renderLink = (link, className = "text-link") => {
    if (!link.href) {
      return `<span class="${className} is-placeholder" title="请在 assets/data.js 中补充链接">${escapeHtml(link.label)}</span>`;
    }
    const external = /^https?:/.test(link.href);
    return `<a class="${className}" href="${escapeHtml(path(link.href))}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${escapeHtml(link.label)}${external ? '<span aria-hidden="true">↗</span>' : ""}</a>`;
  };

  function renderHeader() {
    const target = document.querySelector("#site-header");
    if (!target) return;

    const navItems = [
      ["home", "首页", "index.html"],
      ["publications", "论文", "publications.html"],
      ["blog", "博客", "blog/index.html"]
    ];

    target.innerHTML = `
      <div class="nav-shell">
        <a class="brand" href="${path("index.html")}" aria-label="返回首页">
          <span class="brand-mark">${escapeHtml(data.profile.initials)}</span>
          <span class="brand-name">${escapeHtml(data.profile.nameEn)}</span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
          <span></span><span></span><span></span><span class="sr-only">打开导航</span>
        </button>
        <nav class="primary-nav" id="primary-nav" aria-label="主导航">
          ${navItems
            .map(
              ([key, label, href]) =>
                `<a href="${path(href)}"${page === key || (page === "post" && key === "blog") ? ' aria-current="page"' : ""}>${label}</a>`
            )
            .join("")}
          <a href="${path("index.html#contact")}">联系</a>
        </nav>
        <button class="theme-toggle" type="button" aria-label="切换深浅色模式" title="切换深浅色模式">
          <span class="theme-icon theme-icon-sun" aria-hidden="true">☼</span>
          <span class="theme-icon theme-icon-moon" aria-hidden="true">◐</span>
        </button>
      </div>`;
  }

  function renderFooter() {
    const target = document.querySelector("#site-footer");
    if (!target) return;

    target.innerHTML = `
      <div class="footer-main">
        <div>
          <p class="footer-kicker">LET'S TALK</p>
          <h2>欢迎交流研究、合作与想法。</h2>
        </div>
        <a class="footer-email" href="mailto:${escapeHtml(data.profile.email)}">${escapeHtml(data.profile.email)} <span aria-hidden="true">↗</span></a>
      </div>
      <div class="footer-bottom">
        <p>© <span data-current-year></span> ${escapeHtml(data.profile.nameEn)}.</p>
        <p>Built for ideas worth sharing.</p>
        <a href="#top">回到顶部 ↑</a>
      </div>`;
  }

  function renderHome() {
    if (page !== "home") return;

    const profile = data.profile;
    const heroFirst = profile.nameZh || profile.headlineFirst;
    const heroSecond = profile.nameZh ? profile.nameEn : profile.headlineLast;
    const hero = document.querySelector("#hero-content");
    if (hero) {
      hero.innerHTML = `
        <div class="hero-copy reveal">
          <p class="eyebrow"><span></span> ACADEMIC PROFILE · 2026</p>
          <h1>${escapeHtml(heroFirst)}<br><em>${escapeHtml(heroSecond)}</em></h1>
          <p class="hero-role">${escapeHtml(profile.role)}</p>
          <p class="hero-intro">${escapeHtml(profile.intro)}</p>
          <p class="hero-intro-en">${escapeHtml(profile.introEn)}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#work">查看研究 <span aria-hidden="true">↓</span></a>
            <a class="button button-quiet" href="mailto:${escapeHtml(profile.email)}">发送邮件 <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <aside class="profile-card reveal" aria-label="个人信息卡">
          <div class="portrait-wrap">
            <img src="${path(profile.photo)}" alt="${escapeHtml(profile.nameEn)}的个人照片">
            <span class="availability-dot" title="${escapeHtml(profile.status)}"></span>
          </div>
          <div class="profile-card-body">
            <p class="profile-card-label">CURRENTLY</p>
            <h2>${escapeHtml(profile.affiliation)}</h2>
            <p>${escapeHtml(profile.location)}</p>
            <div class="profile-links">${profile.links.map((link) => renderLink(link)).join("")}</div>
          </div>
        </aside>`;
    }

    const keywordStrip = document.querySelector("#keyword-strip");
    if (keywordStrip) {
      const items = [...profile.keywords, ...profile.keywords];
      keywordStrip.innerHTML = items
        .map((item) => `<span><i></i>${escapeHtml(item)}</span>`)
        .join("");
    }

    const news = document.querySelector("#news-list");
    if (news) {
      news.innerHTML = data.news
        .map(
          (item) => `
            <article class="news-item reveal">
              <time>${escapeHtml(item.date)}</time>
              <p>${escapeHtml(item.text)}</p>
              ${item.href ? renderLink({ label: item.linkLabel, href: item.href }, "arrow-link") : '<span class="demo-label">示例内容</span>'}
            </article>`
        )
        .join("");
    }

    const research = document.querySelector("#research-grid");
    if (research) {
      research.innerHTML = data.research
        .map(
          (item) => `
            <article class="research-card reveal">
              <span class="card-number">${escapeHtml(item.number)}</span>
              <div>
                <h3>${escapeHtml(item.title)}</h3>
                <p class="card-subtitle">${escapeHtml(item.titleEn)}</p>
                <p>${escapeHtml(item.description)}</p>
                <div class="tag-row">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
              </div>
            </article>`
        )
        .join("");
    }

    const publications = document.querySelector("#featured-publications");
    if (publications) {
      publications.innerHTML = data.publications
        .filter((item) => item.featured)
        .map(publicationTemplate)
        .join("");
    }

    const posts = document.querySelector("#featured-posts");
    if (posts) {
      posts.innerHTML = data.posts
        .filter((item) => item.featured)
        .map(postTemplate)
        .join("");
    }

    const journey = document.querySelector("#journey-list");
    if (journey) {
      journey.innerHTML = data.journey
        .map((item) => `
          <article class="journey-item reveal">
            <time>${escapeHtml(item.period)}</time>
            <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.place)}</p>${item.detail ? `<small>${escapeHtml(item.detail)}</small>` : ""}</div>
          </article>`)
        .join("");
    }

    const awards = document.querySelector("#awards-list");
    if (awards) {
      awards.innerHTML = data.awards
        .map((item) => `<li><span>${escapeHtml(item.year)}</span>${escapeHtml(item.title)}</li>`)
        .join("");
    }
  }

  function publicationTemplate(item, index = 0) {
    const links = item.links.map((link) => renderLink(link, "pub-link")).join("");
    return `
      <article class="publication-item reveal" data-year="${escapeHtml(item.year)}" data-type="${escapeHtml(item.type)}" data-search="${escapeHtml(`${item.title} ${item.authors} ${item.venue}`.toLowerCase())}">
        <div class="pub-index">${String(index + 1).padStart(2, "0")}</div>
        <div class="pub-year">${escapeHtml(item.year)}</div>
        <div class="pub-body">
          <div class="pub-meta"><span>${escapeHtml(item.type)}</span>${item.note ? `<strong>${escapeHtml(item.note)}</strong>` : ""}</div>
          <h3>${escapeHtml(item.title)}</h3>
          <p class="pub-authors">${escapeHtml(item.authors)}</p>
          <p class="pub-venue">${escapeHtml(item.venue)}</p>
          <div class="pub-links">${links}</div>
        </div>
      </article>`;
  }

  function postTemplate(item) {
    return `
      <article class="post-card reveal" data-tags="${escapeHtml(item.tags.join(" "))}" data-search="${escapeHtml(`${item.title} ${item.excerpt} ${item.tags.join(" ")}`.toLowerCase())}">
        <a class="post-card-link" href="${path(item.href)}" aria-label="阅读：${escapeHtml(item.title)}">
          <div class="post-card-top">
            <time datetime="${escapeHtml(item.date)}">${escapeHtml(item.dateLabel)}</time>
            <span>${escapeHtml(item.readTime)}</span>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.excerpt)}</p>
          <div class="post-card-bottom">
            <div class="tag-row">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
            <span class="post-arrow" aria-hidden="true">↗</span>
          </div>
        </a>
      </article>`;
  }

  function renderPublicationsPage() {
    if (page !== "publications") return;
    const list = document.querySelector("#publications-list");
    const years = [...new Set(data.publications.map((item) => item.year))];
    const filters = document.querySelector("#publication-years");

    if (filters) {
      filters.innerHTML = ["全部", ...years]
        .map((year, index) => `<button type="button" class="filter-chip${index === 0 ? " is-active" : ""}" data-filter="${year === "全部" ? "all" : escapeHtml(year)}">${escapeHtml(year)}</button>`)
        .join("");
    }
    if (list) list.innerHTML = data.publications.map(publicationTemplate).join("");
    setupFilters(".publication-item", "#publication-search", "#publication-years", "year");
  }

  function renderBlogPage() {
    if (page !== "blog") return;
    const list = document.querySelector("#blog-list");
    const tags = [...new Set(data.posts.flatMap((item) => item.tags))];
    const filters = document.querySelector("#blog-tags");

    if (filters) {
      filters.innerHTML = ["全部", ...tags]
        .map((tag, index) => `<button type="button" class="filter-chip${index === 0 ? " is-active" : ""}" data-filter="${tag === "全部" ? "all" : escapeHtml(tag)}">${escapeHtml(tag)}</button>`)
        .join("");
    }
    if (list) list.innerHTML = data.posts.map(postTemplate).join("");
    setupFilters(".post-card", "#blog-search", "#blog-tags", "tags");
  }

  function setupFilters(itemSelector, searchSelector, chipsSelector, attribute) {
    const search = document.querySelector(searchSelector);
    const chipWrap = document.querySelector(chipsSelector);
    const empty = document.querySelector("#filter-empty");
    let activeFilter = "all";

    const update = () => {
      const query = (search?.value || "").trim().toLowerCase();
      let count = 0;
      document.querySelectorAll(itemSelector).forEach((item) => {
        const matchesSearch = !query || item.dataset.search.includes(query);
        const value = item.dataset[attribute] || "";
        const matchesFilter = activeFilter === "all" || value.split(" ").includes(activeFilter);
        const visible = matchesSearch && matchesFilter;
        item.hidden = !visible;
        if (visible) count += 1;
      });
      if (empty) empty.hidden = count !== 0;
    };

    search?.addEventListener("input", update);
    chipWrap?.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-filter]");
      if (!button) return;
      activeFilter = button.dataset.filter;
      chipWrap.querySelectorAll("button").forEach((item) => item.classList.toggle("is-active", item === button));
      update();
    });
  }

  function setupTheme() {
    const button = document.querySelector(".theme-toggle");
    const stored = localStorage.getItem("site-theme");
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (preferredDark ? "dark" : "light");
    document.documentElement.dataset.theme = initial;

    button?.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("site-theme", next);
    });
  }

  function setupNavigation() {
    const button = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".primary-nav");
    button?.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      nav?.classList.toggle("is-open", !open);
    });
    nav?.addEventListener("click", () => {
      button?.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  }

  function setupReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
  }

  renderHeader();
  renderFooter();
  renderHome();
  renderPublicationsPage();
  renderBlogPage();
  setupTheme();
  setupNavigation();
  setupReveal();

  document.querySelectorAll("[data-current-year]").forEach((item) => {
    item.textContent = new Date().getFullYear();
  });
})();
