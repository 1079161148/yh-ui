---
layout: home

hero:
  name: YH-UI
  text: Modern Vue 3 UI Library
  tagline: A high-performance, flexible and customizable enterprise-grade component library
  actions:
    - theme: brand
      text: Quick Start
      link: /en/guide/quickstart
    - theme: alt
      text: Use in Nuxt
      link: /en/guide/nuxt
    - theme: alt
      text: Components
      link: /en/components/button

features:
  - icon: 🚀
    title: High Performance
    details: Built with Vue 3 Composition API, supports Tree-shaking, on-demand loading, minimal bundle size
  - icon: 🎨
    title: Flexible Theming
    details: Complete CSS variable system, supports runtime theme switching, dark mode, non-intrusive style overrides
  - icon: 🧩
    title: Nuxt Module
    details: Specially designed module for Nuxt, perfect SSR support, auto-imports and request-level isolation
  - icon: 📦
    title: Out of the Box
    details: Rich component ecosystem, comprehensive documentation, full TypeScript support
  - icon: 🔧
    title: TypeScript
    details: Complete TypeScript type definitions, enjoy full type hints and type checking
  - icon: 🌍
    title: Internationalization
    details: Built-in i18n support, easy to add more languages, comprehensive locale files
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

/* Simulate Naive UI's colorful background */
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
