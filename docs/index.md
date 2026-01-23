---
layout: home

hero:
  name: YH-UI
  text: 现代化 Vue 3 组件库
  tagline: 融合众家之长，打造高性能、灵活定制的企业级组件库
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quickstart
    - theme: alt
      text: 在 Nuxt 中使用
      link: /guide/nuxt
    - theme: alt
      text: 组件文档
      link: /components/button

features:
  - icon: 🚀
    title: 高性能
    details: 基于 Vue 3 Composition API 构建，支持 Tree-shaking，按需加载，体积最小化
  - icon: 🎨
    title: 灵活定制
    details: 完善的 CSS 变量系统，支持运行时主题切换，深色模式，无侵入式样式覆盖
  - icon: 🧩
    title: Nuxt 官方模组
    details: 专为 Nuxt 设计的模块，完美支持 SSR、自动导入及组件请求级隔离
  - icon: 📦
    title: 开箱即用
    details: 丰富的组件库，覆盖绝大部分业务场景，API 设计简洁直观，上手成本低
  - icon: 🔧
    title: TS 强类型
    details: 完整的 TypeScript 类型定义，享受完善的类型提示和类型检查
  - icon: 🌍
    title: 国际化
    details: 内置国际化支持，轻松切换多语言，满足全球化业务需求
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #646cff 0%, #42b883 100%);
  --vp-home-hero-image-background-image: linear-gradient(135deg, #646cff33 0%, #42b88333 100%);
  --vp-home-hero-image-filter: blur(56px);
}

@media (min-width: 960px) {
  .VPHero {
    padding-top: 120px !important;
    padding-bottom: 120px !important;
    position: relative;
    overflow: hidden;
  }
}

/* 模拟 Naive UI 的炫彩背景 */
.VPHero::before,
.VPHero::after {
  content: '';
  position: absolute;
  z-index: -1;
  filter: blur(40px);
  opacity: 0.15;
  pointer-events: none;
}

.VPHero::before {
  width: 400px;
  height: 100px;
  background: #42b883;
  border-radius: 100px;
  top: 20%;
  left: -100px;
  transform: rotate(-15deg);
  animation: float 20s infinite linear;
}

.VPHero::after {
  width: 600px;
  height: 150px;
  background: #646cff;
  border-radius: 100px;
  bottom: 10%;
  right: -200px;
  transform: rotate(10deg);
  animation: float-reverse 25s infinite linear;
}

@keyframes float {
  0% { transform: translate(0, 0) rotate(-15deg); }
  50% { transform: translate(30px, 40px) rotate(-10deg); }
  100% { transform: translate(0, 0) rotate(-15deg); }
}

@keyframes float-reverse {
  0% { transform: translate(0, 0) rotate(10deg); }
  50% { transform: translate(-40px, -20px) rotate(15deg); }
  100% { transform: translate(0, 0) rotate(10deg); }
}

.VPHero .name {
  font-weight: 800;
  letter-spacing: -2px;
}

.VPFeature {
  border-radius: 16px;
  transition: all 0.3s ease;
  background-color: var(--vp-c-bg-soft);
}

.VPFeature:hover {
  transform: translateY(-8px);
  background-color: var(--vp-c-bg-mute);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
}

.dark .VPFeature:hover {
  box-shadow: 0 12px 24px rgba(0,0,0,0.4);
}
</style>
