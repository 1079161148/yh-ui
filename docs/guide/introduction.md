# 简介

## 什么是 YH-UI？

YH-UI 是一款基于 **Vue 3.5+** 构建的现代化企业级组件库。它不仅汲取了社区优秀组件库的设计精华，更在架构上追求极致的**高性能**与**高扩展性**。

我们致力于为开发者提供一套**视觉高级、函数式驱动、且深度适配 Nuxt 3** 的 UI 解决方案，帮助团队快速构建生产级别的 Web 应用程序。

## 🌟 核心优势

### ⚡ 极致性能与轻量
- **原生 Tree Shaking**：基于 ES Modules 构建，确保生产构建体积最小化。
- **按需加载**：无需引入完整包即可使用单个组件。
- **现代架构**：充分利用 Vue 3.5+ 的响应式优化（如 `shallowRef`、`computed` 优化），减少内存占用。

### 🎨 现代美学与极简深度
- **全面 CSS 变量**：基于 `--yh-*` 变量系统，支持运行时**毫秒级主题切换**。
- **BEM 命名规范**：严格的样式命名约定，确保在复杂项目中永不冲突。
- **高级动效**：内置精心调校的微交互动画，提升用户操作触感。

### 🧩 开发者体验 (DX)
- **Nuxt 3 官方级适配**：提供内置模块，零配置支持 SSR。
- **函数式编程思想**：追求高内聚低耦合，组件逻辑清晰易维护。
- **全量 TypeScript**：严格的类型定义，让编译器成为您的第一道防线。

### 🌍 生产就绪
- **单元测试覆盖**：核心逻辑经过 Vitest 严格测试。
- **持续集成**：严格的代码规范与自动化检查流。
- **国际化 (i18n)**：深度集成国际化方案，支持动态切换多国语言。

## 🏗️ 设计理念

> **"简约而不简单，灵活而不失规范"**

1. **组合优于继承**：采用组合式 API (Composition API) 降低组件复杂度。
2. **数据驱动**：遵循不可变数据流原则，状态变更可预测。
3. **可扩展性优先**：预留丰富的插槽与扩展点，适配各种边界业务场景。

## 💻 浏览器兼容性

YH-UI 仅针对现代浏览器进行优化，不支持 Internet Explorer。

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" /><br/>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /><br/>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /><br/>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /><br/>Safari |
| --- | --- | --- | --- |
| Edge >= 88 | Firefox >= 78 | Chrome >= 87 | Safari >= 14 |

## 🔗 相关资源

- [GitHub 仓库](https://github.com/1079161148/yh-ui)
- [快速开始](/guide/quickstart)
- [定制主题](/guide/theming)

