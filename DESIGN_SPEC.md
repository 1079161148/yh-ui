# YH-UI 组件库设计规范

> 融合 Element Plus 的简洁性 + Ant Design 的系统性 + Naive UI 的现代性

## 一、设计理念

### 1.1 核心原则

| 原则 | 描述 |
|------|------|
| **简洁性** | API 设计直观，降低学习成本 |
| **一致性** | 统一的设计语言和交互模式 |
| **灵活性** | 高度可定制的主题系统 |
| **高性能** | 极致的 Tree-shaking 和按需加载 |
| **类型安全** | 完整的 TypeScript 支持 |

### 1.2 技术栈

- **核心框架**: Vue 3.5+ (Composition API)
- **构建工具**: Vite 6.x
- **类型系统**: TypeScript 5.x
- **包管理**: pnpm 9.x (monorepo)
- **CSS 预处理**: Sass/SCSS
- **文档框架**: VitePress 1.x
- **测试框架**: Vitest 2.x

---

## 二、CSS 设计系统

### 2.1 命名规范

#### 全局前缀
所有 CSS 类名和变量均以 `yh-` 作为前缀，避免与其他库冲突。

#### BEM 命名规则
```
.yh-{block}
.yh-{block}__{element}
.yh-{block}--{modifier}
.yh-{block}.is-{state}
```

**示例：**
```scss
.yh-button { }                    // Block
.yh-button__icon { }              // Element
.yh-button--primary { }           // Modifier
.yh-button.is-disabled { }        // State
.yh-button.is-loading { }         // State
```

### 2.2 CSS 变量系统

#### 变量命名格式
```
--yh-{category}-{property}-{variant}
```

#### 颜色系统 (Colors)

```scss
// 主题色
--yh-color-primary: #409eff;
--yh-color-primary-light-1: #53a8ff;
--yh-color-primary-light-2: #66b1ff;
--yh-color-primary-light-3: #79bbff;
--yh-color-primary-light-4: #8cc5ff;
--yh-color-primary-light-5: #a0cfff;
--yh-color-primary-light-6: #b3d8ff;
--yh-color-primary-light-7: #c6e2ff;
--yh-color-primary-light-8: #d9ecff;
--yh-color-primary-light-9: #ecf5ff;
--yh-color-primary-dark-2: #337ecc;

// 功能色
--yh-color-success: #67c23a;
--yh-color-success-light-3: #95d475;
--yh-color-success-light-5: #b3e19d;
--yh-color-success-light-7: #d1edc4;
--yh-color-success-light-9: #f0f9eb;
--yh-color-success-dark-2: #529b2e;

--yh-color-warning: #e6a23c;
--yh-color-warning-light-3: #eebe77;
--yh-color-warning-light-5: #f3d19e;
--yh-color-warning-light-7: #f8e3c5;
--yh-color-warning-light-9: #fdf6ec;
--yh-color-warning-dark-2: #b88230;

--yh-color-danger: #f56c6c;
--yh-color-danger-light-3: #f89898;
--yh-color-danger-light-5: #fab6b6;
--yh-color-danger-light-7: #fcd3d3;
--yh-color-danger-light-9: #fef0f0;
--yh-color-danger-dark-2: #c45656;

--yh-color-info: #909399;
--yh-color-info-light-3: #b1b3b8;
--yh-color-info-light-5: #c8c9cc;
--yh-color-info-light-7: #dedfe0;
--yh-color-info-light-9: #f4f4f5;
--yh-color-info-dark-2: #73767a;

// 文字颜色
--yh-text-color-primary: #303133;
--yh-text-color-regular: #606266;
--yh-text-color-secondary: #909399;
--yh-text-color-placeholder: #a8abb2;
--yh-text-color-disabled: #c0c4cc;

// 边框颜色
--yh-border-color: #dcdfe6;
--yh-border-color-light: #e4e7ed;
--yh-border-color-lighter: #ebeef5;
--yh-border-color-extra-light: #f2f6fc;
--yh-border-color-dark: #d4d7de;
--yh-border-color-darker: #cdd0d6;

// 填充颜色
--yh-fill-color: #f0f2f5;
--yh-fill-color-light: #f5f7fa;
--yh-fill-color-lighter: #fafafa;
--yh-fill-color-extra-light: #fafcff;
--yh-fill-color-dark: #ebedf0;
--yh-fill-color-darker: #e6e8eb;
--yh-fill-color-blank: #ffffff;

// 背景颜色
--yh-bg-color: #ffffff;
--yh-bg-color-page: #f2f3f5;
--yh-bg-color-overlay: #ffffff;
```

#### 间距系统 (Spacing)

基于 8px 网格系统：

```scss
--yh-spacing-none: 0;
--yh-spacing-xs: 4px;      // 0.5x
--yh-spacing-sm: 8px;      // 1x
--yh-spacing-md: 16px;     // 2x
--yh-spacing-lg: 24px;     // 3x
--yh-spacing-xl: 32px;     // 4x
--yh-spacing-xxl: 48px;    // 6x
```

#### 圆角系统 (Border Radius)

```scss
--yh-radius-none: 0;
--yh-radius-sm: 2px;
--yh-radius-base: 4px;
--yh-radius-md: 8px;
--yh-radius-lg: 12px;
--yh-radius-xl: 16px;
--yh-radius-round: 20px;
--yh-radius-circle: 50%;
```

#### 字体系统 (Typography)

```scss
// 字体族
--yh-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

// 字号
--yh-font-size-xs: 12px;
--yh-font-size-sm: 13px;
--yh-font-size-base: 14px;
--yh-font-size-md: 16px;
--yh-font-size-lg: 18px;
--yh-font-size-xl: 20px;
--yh-font-size-xxl: 24px;

// 行高
--yh-line-height-none: 1;
--yh-line-height-tight: 1.25;
--yh-line-height-snug: 1.375;
--yh-line-height-normal: 1.5;
--yh-line-height-relaxed: 1.625;
--yh-line-height-loose: 2;

// 字重
--yh-font-weight-light: 300;
--yh-font-weight-normal: 400;
--yh-font-weight-medium: 500;
--yh-font-weight-semibold: 600;
--yh-font-weight-bold: 700;
```

#### 阴影系统 (Shadows)

```scss
--yh-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--yh-shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--yh-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--yh-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--yh-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
```

#### 动效系统 (Transitions)

```scss
// 持续时间
--yh-duration-fast: 150ms;
--yh-duration-base: 200ms;
--yh-duration-slow: 300ms;

// 缓动函数
--yh-timing-ease: ease;
--yh-timing-ease-in: cubic-bezier(0.4, 0, 1, 1);
--yh-timing-ease-out: cubic-bezier(0, 0, 0.2, 1);
--yh-timing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--yh-timing-linear: linear;

// 组合
--yh-transition-base: all var(--yh-duration-base) var(--yh-timing-ease-in-out);
--yh-transition-fast: all var(--yh-duration-fast) var(--yh-timing-ease-in-out);
--yh-transition-slow: all var(--yh-duration-slow) var(--yh-timing-ease-in-out);
```

#### 层级系统 (Z-Index)

```scss
--yh-z-index-normal: 1;
--yh-z-index-top: 1000;
--yh-z-index-popper: 2000;
--yh-z-index-overlay: 2001;
--yh-z-index-modal: 2002;
--yh-z-index-popover: 2003;
--yh-z-index-tooltip: 2004;
--yh-z-index-loading: 2005;
```

---

## 三、组件设计规范

### 3.1 组件分层

```
基础层 (Base)
├── Button, Icon, Typography

表单层 (Form)
├── Input, Select, Checkbox, Radio, Switch, DatePicker

数据展示 (Data Display)
├── Table, Tree, Pagination, Avatar, Badge, Tag

反馈层 (Feedback)
├── Alert, Message, Notification, Dialog, Drawer, Loading

导航层 (Navigation)
├── Menu, Tabs, Breadcrumb, Dropdown, Steps

布局层 (Layout)
├── Container, Row, Col, Space, Divider
```

### 3.2 组件 API 设计原则

#### Props 命名规范

| 类型 | 命名方式 | 示例 |
|------|---------|------|
| 布尔值 | is/has/can/show 前缀或形容词 | `disabled`, `loading`, `showIcon` |
| 尺寸 | size | `size="small" \| "default" \| "large"` |
| 类型 | type | `type="primary" \| "success" \| "warning"` |
| 数值 | 描述性名词 | `maxLength`, `minValue`, `step` |
| 回调 | on 前缀 | `onClick`, `onChange`, `onClose` |

#### Events 命名规范

- 使用动词或动词短语
- 保持与原生事件命名一致
- 使用 kebab-case 格式

```typescript
// ✅ 正确
@change, @click, @focus, @blur, @update:modelValue

// ❌ 错误
@valueChange, @onClick
```

#### Slots 命名规范

| 命名 | 用途 |
|------|------|
| `default` | 默认内容 |
| `header` | 头部内容 |
| `footer` | 底部内容 |
| `prefix` | 前置内容 |
| `suffix` | 后置内容 |
| `icon` | 图标位置 |
| `empty` | 空状态 |
| `loading` | 加载状态 |

### 3.3 组件尺寸规范

| 尺寸 | 高度 | 字号 | 内边距 (水平) |
|------|------|------|--------------|
| `large` | 40px | 14px | 20px |
| `default` | 32px | 14px | 16px |
| `small` | 24px | 12px | 12px |

---

## 四、代码规范

### 4.1 文件命名

```
组件目录结构:
packages/components/src/{component-name}/
├── src/
│   ├── {component-name}.vue      # 组件实现
│   ├── {component-name}.ts       # Props/Emits 类型定义
│   └── {component-name}.scss     # 组件样式
├── __tests__/
│   └── {component-name}.test.ts  # 单元测试
├── index.ts                      # 导出入口
└── README.md                     # 组件文档
```

### 4.2 Vue 组件书写规范

```vue
<script setup lang="ts">
/**
 * @name YhButton
 * @description 按钮组件
 */
import { computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import type { ButtonProps, ButtonEmits } from './button'

// Props & Emits
defineOptions({
  name: 'YhButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'default',
  nativeType: 'button'
})

const emit = defineEmits<ButtonEmits>()

// Hooks
const ns = useNamespace('button')

// Computed
const buttonClasses = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(props.size),
  ns.is('disabled', props.disabled),
  ns.is('loading', props.loading),
  ns.is('plain', props.plain),
  ns.is('round', props.round),
  ns.is('circle', props.circle)
])

// Methods
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>

<template>
  <button
    :class="buttonClasses"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <slot name="loading" v-if="loading">
      <span :class="ns.e('loading-icon')">
        <!-- Loading Icon -->
      </span>
    </slot>
    <slot name="icon" v-if="!loading && $slots.icon" />
    <span :class="ns.e('content')" v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<style lang="scss">
@use './button.scss';
</style>
```

### 4.3 TypeScript 类型定义

```typescript
// button.ts
import type { Component, ExtractPropTypes, PropType } from 'vue'

export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'danger',
  'info'
] as const

export const buttonSizes = ['large', 'default', 'small'] as const

export const buttonNativeTypes = ['button', 'submit', 'reset'] as const

export type ButtonType = (typeof buttonTypes)[number]
export type ButtonSize = (typeof buttonSizes)[number]
export type ButtonNativeType = (typeof buttonNativeTypes)[number]

export interface ButtonProps {
  /**
   * @description 按钮类型
   */
  type?: ButtonType
  /**
   * @description 按钮尺寸
   */
  size?: ButtonSize
  /**
   * @description 是否禁用
   */
  disabled?: boolean
  /**
   * @description 是否加载中
   */
  loading?: boolean
  /**
   * @description 是否为朴素按钮
   */
  plain?: boolean
  /**
   * @description 是否为圆角按钮
   */
  round?: boolean
  /**
   * @description 是否为圆形按钮
   */
  circle?: boolean
  /**
   * @description 是否为文字按钮
   */
  text?: boolean
  /**
   * @description 是否为链接按钮
   */
  link?: boolean
  /**
   * @description 原生 type 属性
   */
  nativeType?: ButtonNativeType
  /**
   * @description 自动聚焦
   */
  autofocus?: boolean
  /**
   * @description 图标组件
   */
  icon?: string | Component
  /**
   * @description 自定义颜色
   */
  color?: string
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}
```

---

## 五、主题定制

### 5.1 CSS 变量覆盖

```css
/* 方式一：全局覆盖 */
:root {
  --yh-color-primary: #6366f1;
  --yh-color-success: #22c55e;
  --yh-radius-base: 8px;
}

/* 方式二：作用域覆盖 */
.my-theme {
  --yh-color-primary: #8b5cf6;
}

/* 方式三：暗黑模式 */
html.dark {
  --yh-bg-color: #141414;
  --yh-bg-color-page: #0a0a0a;
  --yh-text-color-primary: #e5e7eb;
}
```

### 5.2 SCSS 变量定制

```scss
// 自定义主题文件
@forward '@yh-ui/theme/src/styles/variables.scss' with (
  $colors: (
    'primary': #6366f1,
    'success': #22c55e,
  ),
  $border-radius: (
    'base': 8px,
  )
);

@use '@yh-ui/theme';
```

### 5.3 JavaScript 运行时定制

```typescript
import { createYhUI } from '@yh-ui/yh-ui'

const yhUI = createYhUI({
  theme: {
    colors: {
      primary: '#6366f1'
    },
    borderRadius: {
      base: '8px'
    }
  },
  locale: 'zh-CN',
  size: 'default'
})

app.use(yhUI)
```

---

## 六、国际化规范

### 6.1 语言包结构

```typescript
// locale/lang/zh-CN.ts
export default {
  name: 'zh-CN',
  yh: {
    button: {
      loading: '加载中...'
    },
    input: {
      placeholder: '请输入'
    },
    select: {
      placeholder: '请选择',
      noData: '暂无数据',
      loading: '加载中...'
    },
    pagination: {
      goto: '前往',
      page: '页',
      total: '共 {total} 条'
    },
    dialog: {
      confirm: '确定',
      cancel: '取消'
    }
  }
}
```

---

## 七、组件文档规范

### 7.1 文档结构要求

每个组件文档必须遵循统一的结构和规范，确保文档的一致性和可维护性。

#### 文档文件结构

```
docs/components/
├── button.md            # Button 组件文档
├── input.md             # Input 组件文档
└── ...
```

### 7.2 DemoBlock 演示组件

**所有组件示例必须使用 `DemoBlock` 组件包裹**，以确保统一的展示风格和功能。

#### DemoBlock 组件属性

| 属性名 | 说明 | 类型 | 必填 |
|--------|------|------|------|
| `title` | 示例标题 | `string` | ✅ |
| `ts-code` | TypeScript 代码示例 | `string` | ✅ |
| `js-code` | JavaScript 代码示例 | `string` | ✅ |

#### DemoBlock 功能

| 功能 | 描述 |
|------|------|
| 🔀 **语言切换** | 支持 TypeScript / JavaScript 代码风格切换 |
| 📋 **复制代码** | 一键复制当前代码到剪贴板 |
| 🔧 **在线编辑** | 跳转至 StackBlitz / CodeSandbox |
| 📂 **代码展开** | 展开/收起代码预览区域 |

### 7.3 文档模板

每个组件文档的标准模板：

````markdown
# ComponentName 组件名称

<script setup lang="ts">
import { ref } from 'vue'

// 所有 Demo 状态定义
const demoValue1 = ref('')
const demoValue2 = ref('')

// TypeScript 代码示例字符串
const tsBasic = `<template>
  <yh-component v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
<\/script>`

// JavaScript 代码示例字符串
const jsBasic = `<template>
  <yh-component v-model="value" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
<\/script>`

// ... 其他代码示例
</script>

组件描述文字。

## 基础用法

基础用法说明文字。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 400px;">
    <yh-component v-model="demoValue1" placeholder="请输入" />
  </div>
</DemoBlock>

## 进阶用法

进阶用法说明文字。

<DemoBlock title="进阶用法" :ts-code="tsAdvanced" :js-code="jsAdvanced">
  <!-- 组件演示 -->
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 值改变时触发 | `(value: string) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 默认内容 |

### Expose

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| focus | 使组件获取焦点 | `() => void` |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-component-color` | 颜色 | `var(--yh-color-primary)` |
````

### 7.4 代码示例书写规范

#### 代码字符串定义

- 所有代码示例必须在 `<script setup>` 中定义为字符串变量
- 必须提供 TypeScript 和 JavaScript 两个版本
- 代码字符串中的 `</script>` 必须转义为 `<\/script>`

```typescript
// ✅ 正确写法
const tsExample = `<template>
  <yh-input v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
<\/script>`  // 注意转义

// ❌ 错误写法 - 会导致 SFC 解析错误
const badExample = `...
</script>`  // 未转义
```

#### 代码命名规范

| 前缀 | 语言 | 示例 |
|------|------|------|
| `ts` | TypeScript | `tsBasic`, `tsDisabled`, `tsClearable` |
| `js` | JavaScript | `jsBasic`, `jsDisabled`, `jsClearable` |

### 7.5 文档站点功能要求

#### 侧边栏

- ✅ 支持展开/折叠分组
- ✅ 当前页面高亮
- ✅ 平滑滚动动画

#### 语言切换

- ✅ 支持中文/英文切换
- ✅ 语言偏好持久化存储
- ✅ 切换动画效果

#### 视觉效果

- ✅ 毛玻璃导航栏
- ✅ 渐变色主题
- ✅ 微交互动画
- ✅ 代码高亮
- ✅ 暗色模式支持

---

## 八、版本发布规范

### 8.1 语义化版本

- **Major (主版本)**: 不兼容的 API 变更
- **Minor (次版本)**: 向下兼容的功能新增
- **Patch (修订版本)**: 向下兼容的问题修复

### 8.2 发布流程

```bash
# 1. 更新版本号
pnpm version:patch  # 或 minor/major

# 2. 生成变更日志
pnpm changelog

# 3. 构建产物
pnpm build

# 4. 发布到 npm
pnpm publish:all

# 5. 创建 Git 标签
git tag v1.0.0
git push origin v1.0.0
```

---

## 九、贡献指南

### 9.1 开发流程

```bash
# 1. 克隆仓库
git clone https://github.com/xxx/yh-ui.git

# 2. 安装依赖
pnpm install

# 3. 启动开发环境
pnpm dev

# 4. 启动文档站点
pnpm docs:dev

# 5. 运行测试
pnpm test
```

### 9.2 提交规范

遵循 [Conventional Commits](https://conventionalcommits.org/):

```
feat(button): add loading state
fix(input): fix cursor position issue
docs(select): update API documentation
style(theme): format CSS variables
refactor(hooks): optimize useNamespace
test(dialog): add unit tests
chore(deps): update dependencies
```

---

> **最后更新**: 2026-01-11
> **维护者**: YH-UI Team
