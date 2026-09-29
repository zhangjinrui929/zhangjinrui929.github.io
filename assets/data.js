/* 个人主页内容总表。更新方法见「网站使用教程.md」。论文按最新在前排序。 */
window.SITE_DATA = {
  profile: {
    nameEn: "Jinrui Zhang",
    nameZh: "张金锐", // 中文姓名待确认，避免猜测汉字
    headlineFirst: "Jinrui",
    headlineLast: "Zhang",
    initials: "JZ",
    photo: "assets/avatar-placeholder.svg",
    role: "香港科技大学数学系 · 博士后研究员",
    affiliation: "香港科技大学 · 数学系",
    location: "中国香港",
    email: "jinruizhang@ust.hk",
    status: "从事波散射与计算反问题研究",
    intro: "我研究波散射与反散射中的数学问题，关注快速数值算法、边界积分方程，以及层状介质中的多粒子成像。目前在香港科技大学数学系从事博士后研究。",
    introEn: "I work on wave scattering and inverse scattering, with interests in fast algorithms, boundary integral equations, and computational imaging in layered media.",
    keywords: ["Wave Scattering", "Inverse Problems", "Fast Algorithms", "Computational Imaging"],
    links: [
      { label: "Email", href: "mailto:jinruizhang@ust.hk" },
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=vPo_tkkAAAAJ&hl=zh-CN" },
      { label: "arXiv", href: "https://arxiv.org/search/?query=Jinrui+Zhang&searchtype=author" },
      { label: "FMM Code", href: "https://gitee.com/lai123jun/adaptive_fmm" }
    ]
  },
  news: [
    { date: "2026.08", text: "两篇关于层状介质弹性散射快速求解与三维多极展开谱收敛的预印本上线 arXiv。", linkLabel: "查看预印本", href: "publications.html" },
    { date: "2026.05", text: "关于层状介质中多粒子选择性聚焦的论文发表于 SIAM Journal on Imaging Sciences。", linkLabel: "查看论文", href: "https://doi.org/10.1137/25M1761410" },
    { date: "2025.12", text: "获得浙江大学 2025 年优秀博士学位论文。", linkLabel: "查看经历", href: "index.html#journey" }
  ],
  research: [
    { number: "01", title: "波散射与反散射", titleEn: "Wave & Inverse Scattering", description: "研究声波和弹性波与多个散射体的相互作用，并利用远场测量反演未知目标的位置与形状。", tags: ["Multiple Scattering", "Inverse Problems"] },
    { number: "02", title: "快速数值算法", titleEn: "Fast Numerical Algorithms", description: "结合快速多极方法、散射矩阵和边界积分方程，构造适用于复杂几何与大规模粒子系统的高效求解器。", tags: ["FMM", "Integral Equations"] },
    { number: "03", title: "计算成像与聚焦", titleEn: "Computational Imaging", description: "关注层状介质中的选择性聚焦、时间反演与贝叶斯反演，以及数值方法的精度和收敛性。", tags: ["Time Reversal", "Layered Media"] }
  ],
  journey: [
    { period: "2025.07 — 至今", title: "博士后研究员", place: "香港科技大学 · 数学系", detail: "合作导师：张海教授" },
    { period: "2020.09 — 2025.06", title: "计算数学博士", place: "浙江大学 · 数学科学学院", detail: "导师：赖俊教授" },
    { period: "2016.09 — 2020.06", title: "信息与计算科学学士", place: "南京理工大学", detail: "" }
  ],
  awards: [
    { year: "2025", title: "浙江大学优秀博士学位论文" },
    { year: "2025", title: "浙江省优秀毕业生" },
    { year: "2022", title: "浙江大学优秀研究生" },
    { year: "2018", title: "国家奖学金；南京理工大学理学院院长奖章" }
  ],
  publications: [
    { year: "2026", type: "Preprint", title: "A fast solver for many-particle elastic scattering in layered media", authors: "Jinrui Zhang, Yixiao He, Jun Lai", venue: "arXiv:2608.26875", note: "New", featured: true, links: [{ label: "arXiv", href: "https://arxiv.org/abs/2608.26875" }, { label: "PDF", href: "https://arxiv.org/pdf/2608.26875" }] },
    { year: "2026", type: "Preprint", title: "Spectral Convergence of the Multipole Expansion Method for Acoustic Scattering in Three Dimensions", authors: "Jinrui Zhang, Jun Lai", venue: "arXiv:2608.26884", note: "New", featured: true, links: [{ label: "arXiv", href: "https://arxiv.org/abs/2608.26884" }, { label: "PDF", href: "https://arxiv.org/pdf/2608.26884" }] },
    { year: "2026", type: "Journal", title: "Selective Focusing of Multiple Particles in a Layered Medium", authors: "Jun Lai, Jinrui Zhang", venue: "SIAM Journal on Imaging Sciences, 19(2): 1110–1136", note: "", featured: true, links: [{ label: "DOI", href: "https://doi.org/10.1137/25M1761410" }, { label: "arXiv", href: "https://arxiv.org/abs/2505.19524" }] },
    { year: "2025", type: "Journal", title: "Selective focusing of multiple traction-free elastic particles", authors: "Jinrui Zhang, Jun Lai", venue: "Inverse Problems and Imaging, 19(6): 1245–1267", note: "", featured: false, links: [{ label: "DOI", href: "https://doi.org/10.3934/ipi.2025014" }] },
    { year: "2025", type: "Journal", title: "Brief Implementation of Adaptive Fast Multipole Method Based on MATLAB", authors: "Jun Lai, Jinrui Zhang", venue: "Mathematica Numerica Sinica, 47(1): 1–20", note: "", featured: false, links: [{ label: "DOI", href: "https://doi.org/10.12286/jssx.j2024-1267" }, { label: "Code", href: "https://gitee.com/lai123jun/adaptive_fmm" }] },
    { year: "2024", type: "Journal", title: "Singularity Swapping Method for Nearly Singular Integrals Based on Trapezoidal Rule", authors: "Gang Bao, Wenmao Hua, Jun Lai, Jinrui Zhang", venue: "SIAM Journal on Numerical Analysis, 62(2): 974–997", note: "", featured: false, links: [{ label: "DOI", href: "https://doi.org/10.1137/23M1571666" }] },
    { year: "2022", type: "Journal", title: "Fast inverse elastic scattering of multiple particles in three dimensions", authors: "Jun Lai, Jinrui Zhang", venue: "Inverse Problems, 38: 104002", note: "Cover article", featured: false, links: [{ label: "DOI", href: "https://doi.org/10.1088/1361-6420/ac8ac7" }, { label: "arXiv", href: "https://arxiv.org/abs/2204.03302" }] }
  ],
  posts: [
    { slug: "wave-scattering-notes", title: "示意博客：从 Helmholtz 方程看波散射", excerpt: "用一个最简单的模型展示如何在博客里插入公式、示意图、图注和论文链接。", date: "2026-09-29", dateLabel: "示意文章 · 2026.09", readTime: "5 min", tags: ["示意文章", "波散射"], href: "blog/post.html?slug=wave-scattering-notes", featured: true },
    { slug: "layered-media-notes", title: "示意博客：层状介质中的多粒子问题", excerpt: "一篇带图片与行间公式的写作示范，说明如何介绍研究背景和引用自己的预印本。", date: "2026-09-29", dateLabel: "示意文章 · 2026.09", readTime: "6 min", tags: ["示意文章", "层状介质"], href: "blog/post.html?slug=layered-media-notes", featured: true }
  ]
};
