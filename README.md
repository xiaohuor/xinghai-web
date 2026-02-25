# 星海网站（xinghai-web）

一个基于 Vue 2 的前端导航与资源聚合网站，收录常用技术站点、社区资讯、教程文档等，便于快速查找与学习。项目使用 Vue CLI 构建，路由管理基于 Vue Router，UI 组件库使用 View Design（iView）。

## 技术栈
- Vue 2 + Vue Router
- View Design（iView）
- Axios
- Less / Sass
- Vue CLI 4

## 快速开始
- 环境要求：建议 Node.js 12+，已安装 Yarn 或 npm
- 安装依赖：
  - Yarn：`yarn`
  - npm：`npm install`
- 本地开发：`yarn serve` 或 `npm run serve`
- 代码检查：`yarn lint` 或 `npm run lint`
- 生产构建：`yarn build` 或 `npm run build`

## 目录结构
- docs/ 构建产物（静态资源与 index.html，用于部署）
- public/ 静态公共资源（构建时复制）
- src/
  - assets/ 项目静态资源与样式
  - components/ 通用组件（如页面头部）
  - pages/ 业务页面（home、navigation、nav-technology、bookmarks、life、about、error-page 等）
  - router/ 路由入口与路由表
  - App.vue / main.js 应用入口

## 配置说明
- 构建输出目录：在 `vue.config.js` 中配置 `outputDir: "docs"`
- 基础路径：生产环境下 `publicPath: "./"`，适配静态站点相对路径
- 浏览器兼容：`browserslist` 配置为 `> 1%, last 2 versions`

## 部署指南
- 本项目构建产物位于 `docs/` 目录，适合：
  - GitHub Pages（设置页面源为主分支的 `/docs`）
  - Gitee Pages（选择 `/docs` 目录作为站点根）
- 执行 `yarn build` 后将生成的 `docs/` 目录提交并启用 Pages 即可访问

## 常用脚本
- 开发：`yarn serve`
- 构建：`yarn build`
- Lint：`yarn lint`

## 贡献
- Fork 仓库
- 创建特性分支（如 `feat/xxx`）
- 提交代码并发起 Pull Request
