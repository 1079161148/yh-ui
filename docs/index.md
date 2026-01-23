---
layout: home

hero:
  name: YH-UI
  text: 现代化 Vue 3 组件库
  tagline: 融合众家之长，打造高性能、灵活定制的企业级组件库
  image:
    src: /logo.svg
    alt: YH-UI
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quickstart
    - theme: alt
      text: 组件文档
      link: /components/button
    - theme: alt
      text: GitHub
      link: https://github.com/1079161148/yh-ui

features:
  - icon: 🚀
    title: 高性能
    details: 基于 Vue 3 Composition API 构建，支持 Tree-shaking，按需加载，体积最小化

  - icon: 🎨
    title: 灵活定制
    details: 完善的 CSS 变量系统，支持运行时主题切换，深色模式，无侵入式样式覆盖

  - icon: 📦
    title: 开箱即用
    details: 丰富的组件库，覆盖绝大部分业务场景，API 设计简洁直观，上手成本低

  - icon: 🔧
    title: TypeScript
    details: 完整的 TypeScript 类型定义，享受完善的类型提示和类型检查

  - icon: 🌍
    title: 国际化
    details: 内置国际化支持，轻松切换多语言，满足全球化业务需求

  - icon: 📱
    title: 响应式设计
    details: 组件支持响应式布局，适配桌面端和移动端，一套代码多端运行
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #409eff 0%, #67c23a 100%);
  --vp-home-hero-image-background-image: linear-gradient(135deg, #409eff33 0%, #67c23a33 100%);
  --vp-home-hero-image-filter: blur(56px);
}

.VPHero .VPImage {
  max-width: 200px;
  max-height: 200px;
}
</style>
