/* 个人主页内容总表。更新方法见「网站使用教程.md」。论文按最新在前排序。 */
window.SITE_DATA = {
  profile: {
    nameEn: "Jinrui Zhang",
    nameZh: "张金锐", // 中文姓名待确认，避免猜测汉字
    headlineFirst: "Jinrui",
    headlineLast: "Zhang",
    initials: "JZ",
    photo: "assets/profile-photo.png",
    role: "香港科技大学数学系 · 博士后研究员",
    affiliation: "香港科技大学 · 数学系",
    location: "中国香港",
    email: "jinruizhang@ust.hk",
    status: "从事波散射与计算反问题研究",
    intro: "我的研究主要围绕波散射与反问题，关注复杂介质中波传播的高精度数值计算、快速算法及其理论分析，并研究选择性聚焦、统计成像与分辨率问题。",
    introEn: "My research focuses on wave scattering and inverse problems, including high-accuracy numerical methods, fast algorithms, and their theoretical analysis for wave propagation in complex media. I also study selective focusing, statistical imaging, and resolution analysis.",
    keywords: ["Wave Scattering", "Inverse Problems", "Fast Algorithms", "Computational Imaging"],
    links: [
      { label: "Email", href: "mailto:jinruizhang@ust.hk" },
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=vPo_tkkAAAAJ&hl=zh-CN" },
      { label: "zhihu", href: "https://www.zhihu.com/people/zhang-jin-rui-58-26" }
    ]
  },
  news: [
    { date: "2026.08", text: "两篇关于层状介质弹性散射快速求解与三维多极展开谱收敛的预印本上线 arXiv。", linkLabel: "查看预印本", href: "publications.html" },
    { date: "2026.05", text: "关于层状介质中多粒子选择性聚焦的论文发表于 SIAM Journal on Imaging Sciences。", linkLabel: "查看论文", href: "https://doi.org/10.1137/25M1761410" },
    { date: "2025.12", text: "获得浙江大学 2025 年优秀博士学位论文。", linkLabel: "查看经历", href: "index.html#journey" }
  ],
  research: [
    { number: "01", title: "波散射的高精度计算与快速算法", titleEn: "High-order Numerical Methods & Fast Algorithms", description: "研究波散射问题的高精度数值离散与高效求解，发展基于边界积分方程、快速多极算法和降阶模型的计算方法，关注三维弹性波多粒子散射及复杂介质中的大规模计算。", tags: ["Multiple Scattering", "Layered Media"] },
    { number: "02", title: "复杂介质中的反问题与波成像", titleEn: "Inverse Problems & Wave Imaging", description: "研究多粒子系统及分层介质中的散射反问题，包括选择性聚焦、统计成像及其分辨率分析。", tags: ["Selective focusing", "Computational Imaging"] },
    { number: "03", title: "散射数值方法的收敛性与误差分析", titleEn: "Convergence & Error Analysis for Scattering Problems", description: "研究波散射数值方法的数学基础，包括三维多体散射中多极展开方法的收敛性分析，以及降阶模型的算法设计与理论分析。", tags: ["Convergence Analysis", "Reduced-order model"] }
  ],
  journey: [
    { period: "2025.07 — 至今", title: "博士后", place: "香港科技大学 · 数学系", detail: "合作导师：张海教授" },
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
    { slug: "wave-scattering-notes", title: "波遇见世界：从水面涟漪到散射方程", excerpt: "从一盆水里的波纹出发，认识声呐、雷达与超声检测，再一步步推导弦振动、声波和电磁波的方程。", date: "2026-10-19", dateLabel: "2026.10.19", readTime: "30 min", tags: ["科普", "波散射", "物理建模"], href: "blog/post.html?slug=wave-scattering-notes", featured: true },
    { slug: "layered-media-notes", title: "由果溯因：从敲西瓜到反散射成像", excerpt: "从敲西瓜、听接水声到 CT 与雷达，认识反问题的存在性、唯一性和稳定性，再用波动方程与可复现算例理解反障碍成像。", date: "2026-10-19", dateLabel: "2026.10.19", readTime: "25 min", tags: ["科普", "反问题", "反散射成像"], href: "blog/post.html?slug=layered-media-notes", featured: true }
  ]
};
