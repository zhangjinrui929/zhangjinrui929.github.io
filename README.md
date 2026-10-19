# Jinrui Zhang · Academic Homepage

静态学术主页，包含研究方向、近期动态、论文列表和带图片/公式的博客示例。首页可直接打开 `index.html` 预览；Markdown 博客需要通过本地预览服务或 GitHub Pages 打开。

发布到 GitHub Pages 时请保留仓库根目录的 `.nojekyll`，确保博客的 `.md` 正文作为原始文件提供给浏览器。

首次使用请阅读 [网站使用教程](网站使用教程.md)，其中包含修改资料、增加论文和博客、插入图片与数学公式，以及部署到 GitHub Pages 的分步说明。

提供给本站制作的原始 CV 未放入仓库，原文件中的手机号码不会随此站发布。

## 搜索引擎与静态个人信息

首页初始 HTML 包含中文姓名、单位、研究简介与博客链接；JavaScript 加载后仍使用 `assets/data.js` 渲染相同内容，不重复显示。首页、论文和博客列表有独立标题、描述和规范网址，文章页按实际文章设置规范网址。`sitemap.xml` 列出首页、论文页、博客列表及各篇文章，`robots.txt` 指向网站地图。

修改 `assets/data.js` 中的个人信息或文章列表后，发布前运行（需要 Node.js）：

```bash
node scripts/generate-seo.cjs
```

脚本同步首页静态信息、网页标题与简介、人物结构化数据及网站地图。不要单独编辑 `STATIC_PROFILE`、`STATIC_POSTS` 标记内的生成内容；以 `assets/data.js` 为准。生成后检查差异并与内容修改一起提交。该脚本不会联网或推送，也不会替你完成搜索引擎账号验证。

Google Search Console 使用“网址前缀”资源 `https://zhangjinrui929.github.io/`，通过平台提供的 HTML 文件或首页 meta 标签验证。验证文件必须按原文件名放在仓库根目录，部署成功后再点击验证，且应长期保留。网站地图提交 `sitemap.xml`。不能用本地 localhost 地址验证线上网站，提交也不保证收录或排名。
