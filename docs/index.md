---
layout: home

hero:
  name: YH-UI
  text: 面向 AI 产品与复杂后台的 Vue 3 组件库
  tagline: 把 AI 对话、流程编排、重数据表格、主题系统与 Nuxt 集成放进同一套生产级基础设施。
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quickstart
    - theme: alt
      text: Starter 计划
      link: /guide/starter
    - theme: alt
      text: 组件文档
      link: /components/button

features:
  - icon: 🤖
    title: AI 产品界面
    details: 覆盖对话、气泡、输入器、思维链、代码块、附件和引用来源等高频 AI 交互。
  - icon: 🔄
    title: Flow 与编排
    details: 提供流程图、节点配置、自动布局、截图导出与工作流场景能力，适合流程平台和自动化产品。
  - icon: 📊
    title: 重数据后台
    details: 面向表格、筛选、导入导出、打印、虚拟滚动和复杂业务页面，而不只是展示型官网组件。
  - icon: 🎨
    title: 主题系统
    details: 基于 Token 与 CSS 变量构建，支持深色模式、运行时主题切换和长期维护的产品级设计体系。
  - icon: 🧩
    title: Nuxt 与工程集成
    details: 提供 Nuxt 模块、按需导入、完整导入和统一的文档示例链路，适合真实项目落地。
  - icon: ✅
    title: 发布级验证
    details: 文档构建、consumer smoke、在线示例与发布校验进入仓库流程，降低“能跑 demo 但不能发版”的风险。
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
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.dark .VPFeature:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
}
</style>
