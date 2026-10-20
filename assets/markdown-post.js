(function () {
  "use strict";

  const title = document.querySelector("#post-title");
  const content = document.querySelector("#post-content");
  if (!title || !content) return;

  const slug = new URLSearchParams(window.location.search).get("slug");
  const post = window.SITE_DATA?.posts.find(
    (item) => item.slug === slug && item.href === `blog/post.html?slug=${slug}`
  );

  function showError(message) {
    title.textContent = "文章暂时无法显示";
    content.textContent = message;
  }

  if (!post) {
    showError("未找到这篇文章。请从博客列表进入，或检查文章地址。 ");
    return;
  }

  if (!window.marked || !window.DOMPurify) {
    showError("Markdown 排版工具未能加载。请检查网络连接后刷新页面。 ");
    return;
  }

  title.textContent = post.title;
  const authorName = [window.SITE_DATA.profile.nameZh, window.SITE_DATA.profile.nameEn].filter(Boolean).join(" ");
  document.title = `${post.title} · ${authorName}`;
  document.querySelector('meta[name="description"]').content = post.excerpt;
  // 每篇文章有独立的规范地址，不能把所有查询参数页面归并成同一篇。
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  canonical.href = new URL(post.href, "https://zhangjinrui929.github.io/").href;
  document.querySelector("#post-excerpt").textContent = post.excerpt;
  document.querySelector("#post-date").textContent = post.dateLabel;
  document.querySelector("#post-reading-time").textContent = `预计阅读 ${post.readTime}`;
  document.querySelector("#post-tags").textContent = `标签：${post.tags.join(" · ")}`;

  function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // 先保护数学公式，避免 Markdown 把 TeX 中的下划线等符号当成排版标记。
  function protectMath(source) {
    const math = [];
    const token = (value, display) => {
      const index = math.push({ value, display }) - 1;
      return `MATHPLACEHOLDER${index}END`;
    };

    const text = source
      .replace(/\$\$([\s\S]+?)\$\$/g, (_, value) => `\n\n${token(value.trim(), true)}\n\n`)
      .replace(/\$([^\n$]+?)\$/g, (_, value) => token(value.trim(), false));

    return { text, math };
  }

  function restoreMath(html, math) {
    let output = html;
    math.forEach(({ value, display }, index) => {
      const placeholder = `MATHPLACEHOLDER${index}END`;
      const safe = escapeHtml(value);
      if (display) {
        output = output.replace(
          `<p>${placeholder}</p>`,
          `<div class="math-display">\\[${safe}\\]</div>`
        );
      } else {
        output = output.replace(placeholder, `<span class="math-inline">\\(${safe}\\)</span>`);
      }
    });
    return output;
  }

  const markdownUrl = new URL(`posts/${encodeURIComponent(slug)}.md`, window.location.href);

  // Build the navigation from the actual Markdown headings, so new posts need no manual TOC.
  function buildTableOfContents() {
    const toc = document.querySelector("#article-toc");
    const list = document.querySelector("#toc-list");
    const headings = [...content.querySelectorAll("h2, h3")];
    if (!toc || !list || !headings.length) return;
    const links = headings.map((heading, index) => {
      if (!heading.id) {
        let id = `section-${index + 1}`;
        while (document.getElementById(id)) id += "-heading";
        heading.id = id;
      }
      const item = document.createElement("li");
      if (heading.tagName === "H3") item.className = "toc-subheading";
      const link = document.createElement("a");
      link.href = `#${encodeURIComponent(heading.id)}`;
      link.textContent = heading.textContent;
      item.append(link);
      list.append(item);
      return link;
    });
    toc.hidden = false;
    toc.open = window.matchMedia("(min-width: 761px)").matches;
    let scheduled = false;
    function updateActive() {
      let active = 0;
      headings.forEach((heading, index) => {
        if (heading.getBoundingClientRect().top <= 125) active = index;
      });
      links.forEach((link, index) => {
        if (index === active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      scheduled = false;
    }
    window.addEventListener("scroll", () => {
      if (!scheduled) {
        scheduled = true;
        window.requestAnimationFrame(updateActive);
      }
    }, { passive: true });
    updateActive();
    // The article loads asynchronously, so honor an incoming chapter link after rendering.
    function restoreAnchor() {
      if (!window.location.hash) return;
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (target && content.contains(target)) target.scrollIntoView();
    }
    restoreAnchor();
    return restoreAnchor;
  }

  // 重新验证正文缓存，避免更新后继续展示旧文章。
  fetch(markdownUrl, { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    })
    .then((markdown) => {
      const { text, math } = protectMath(markdown);
      const html = restoreMath(window.marked.parse(text), math);
      content.innerHTML = window.DOMPurify.sanitize(html);
      // Keep table semantics while allowing wide tables to scroll on small screens.
      content.querySelectorAll("table").forEach((table, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = "article-table";
        wrapper.setAttribute("role", "region");
        wrapper.setAttribute("aria-label", `表格 ${index + 1}，可横向滚动`);
        wrapper.tabIndex = 0;
        table.before(wrapper);
        wrapper.append(table);
        table.querySelectorAll("thead th").forEach((cell) => {
          cell.setAttribute("scope", "col");
        });
      });

      // 相对路径以 .md 所在目录为准，兼容 VS Code 预览和 GitHub Pages。
      const mediaAttributes = [
        ["img[src], video[src], video source[src], video track[src]", "src"],
        ["video[poster]", "poster"],
        ["a[href]", "href"]
      ];
      mediaAttributes.forEach(([selector, attribute]) => {
        content.querySelectorAll(selector).forEach((element) => {
          const value = element.getAttribute(attribute);
          if (value && !/^(?:[a-z][a-z\d+.-]*:|\/\/|\/|#)/i.test(value)) {
            element.setAttribute(attribute, new URL(value, markdownUrl).href);
          }
        });
      });
      // source 的地址修正后重新选择媒体资源；保留清理器默认的安全过滤。
      content.querySelectorAll("video").forEach((video) => {
        video.controls = true;
        video.playsInline = true;
        video.load();
      });

      const restoreAnchor = buildTableOfContents();
      window.MathJax = {
        tex: { inlineMath: [["\\(", "\\)"]] },
        startup: {
          pageReady: () => window.MathJax.startup.defaultPageReady().then(() => {
            if (restoreAnchor) restoreAnchor();
          })
        }
      };
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js";
      script.defer = true;
      script.onerror = () => {
        const notice = document.createElement("p");
        notice.className = "article-note";
        notice.textContent = "公式排版工具未能加载；请检查网络连接。";
        content.prepend(notice);
      };
      document.head.append(script);
    })
    .catch(() => {
      showError("文章文件无法读取。请确认对应的 .md 文件已上传；本地预览请使用 localhost，不要直接双击 HTML 文件。 ");
    });
})();
