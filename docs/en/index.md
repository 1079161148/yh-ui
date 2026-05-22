---
layout: home

hero:
  name: YH-UI
  text: A Vue 3 component library for AI products and complex admin apps
  tagline: Bring AI chat, workflow orchestration, heavy data tables, theming, and Nuxt integration into one production-ready foundation.
  actions:
    - theme: brand
      text: Quick Start
      link: /en/guide/quickstart
    - theme: alt
      text: Starter Plan
      link: /en/guide/starter
    - theme: alt
      text: Components
      link: /en/components/button

features:
  - icon: 🤖
    title: AI product surfaces
    details: Covers chat, bubbles, sender, thought chain, code block, attachments, and sources for modern AI application flows.
  - icon: 🔄
    title: Flow and orchestration
    details: Includes flow editing, node configuration, auto layout, screenshot export, and workflow-focused building blocks.
  - icon: 📊
    title: Data-heavy operations
    details: Built for tables, filters, import/export, print, virtual scroll, and complex business pages instead of simple marketing demos.
  - icon: 🎨
    title: Theme system
    details: Based on tokens and CSS variables with dark mode, runtime theme switching, and a durable product-level design foundation.
  - icon: 🧩
    title: Nuxt and engineering integration
    details: Ships with a Nuxt module, on-demand imports, full imports, and a consistent docs-to-consumer integration path.
  - icon: ✅
    title: Release-grade validation
    details: Docs build, consumer smoke, online demo checks, and release verification are part of the repository workflow.
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
