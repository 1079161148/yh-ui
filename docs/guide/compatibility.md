# 兼容性与支持边界

本页用于说明 YH-UI 当前公开承诺的兼容范围，帮助接入方在评估阶段快速判断是否适配现有技术栈。

## 运行时支持矩阵

| 项目    | 当前支持                     | 说明                                                           |
| ------- | ---------------------------- | -------------------------------------------------------------- |
| Vue     | `>= 3.5.0`                   | 当前组件能力与 Nuxt SSR 适配依赖 Vue 3.5 提供的 `useId` 等能力 |
| Node.js | `>= 18.12.0`                 | 推荐使用当前 LTS 版本                                          |
| pnpm    | `>= 9`                       | 仓库开发与 CI 默认基于 pnpm 9                                  |
| Nuxt    | `>= 3.11.0` 或 `^4.0.0-rc.1` | 通过 `@yh-ui/nuxt` 模块提供支持                                |
| Vite    | 已验证 `6.x` 基线            | 仓库内的 consumer smoke 已覆盖干净的 Vite + Vue 场景           |

## 浏览器支持

YH-UI 面向现代浏览器，不支持 Internet Explorer。

| 浏览器  | 最低版本 |
| ------- | -------- |
| Chrome  | `>= 87`  |
| Edge    | `>= 88`  |
| Firefox | `>= 78`  |
| Safari  | `>= 14`  |

## SSR 支持预期

### 明确支持

- 通过 `@yh-ui/nuxt` 在 Nuxt 3 / 4 中实现组件自动导入与样式注入
- 常规表单、展示、反馈、导航类组件的服务端渲染
- 基于稳定 ID 与请求级 z-index 隔离能力保证 hydration 一致性
- 覆盖 Vite + Vue 与 Nuxt SSR 的 clean consumer smoke 场景

### 使用时需注意

- 依赖浏览器原生 API 的能力会在 SSR 阶段安全降级，并在客户端恢复
- 动画、测量、滚动、拖拽、Canvas 等强交互场景已尽量保证首屏与水合后的一致性，但业务代码仍应避免在 `setup` 中直接访问 `window`、`document` 或布局尺寸
- `flow`、高级可视化、在线编辑器等能力更适合作为专项集成能力评估，而不是默认零风险 SSR 首批接入对象

### 不在支持承诺内

- Internet Explorer 兼容
- Vue 3.5 以下版本
- Node 18 以下版本
- 未经过文档、测试或 consumer smoke 验证的第三方定制构建链路

## 开源稳定性说明

当前仓库已经具备以下验证基线：

- `pnpm typecheck`
- `pnpm lint`
- `pnpm test:ci`
- `pnpm test:coverage`
- `pnpm test:perf`
- `pnpm build`
- `pnpm docs:build`
- `pnpm verify:consumer-smoke`

这意味着项目已经适合公开发布 `0.x / beta / rc` 级别版本；如果要对外承诺“稳定版”，仍以仓库根目录中的 `STABLE_RELEASE_BLOCKERS.md` 作为最终发布门槛。

## 包体积基线

首份包体积基线记录见 [PACKAGE_SIZE_BASELINE.md](https://github.com/1079161148/yh-ui/blob/main/PACKAGE_SIZE_BASELINE.md)。

建议在以下场景重新记录：

- 引入大型依赖
- 新增整套组件族
- 发布前发现构建体积出现明显增长
