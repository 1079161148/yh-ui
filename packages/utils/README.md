# @yh-ui/utils

<p align="center">
  <img src="https://raw.githubusercontent.com/1079161148/yh-ui/main/docs/public/logo.svg" width="100" height="100" alt="YH-UI Logo">
</p>

<h3 align="center">YH-UI 工具函数库</h3>

<p align="center">
  YH-UI 组件库的基础工具集。高性能、零依赖、完整类型，可独立用于任意 Vue 3 项目。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@yh-ui/utils">
    <img src="https://img.shields.io/npm/v/@yh-ui/utils.svg?style=flat-square&colorB=409eff" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@yh-ui/utils">
    <img src="https://img.shields.io/npm/dm/@yh-ui/utils.svg?style=flat-square&colorB=409eff" alt="npm downloads">
  </a>
  <a href="https://github.com/1079161148/yh-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@yh-ui/utils.svg?style=flat-square" alt="license">
  </a>
</p>

---

## ✨ 特性

- 🔒 **完整 TypeScript 类型** — 所有函数均有精确类型定义，无 `any`
- 🌿 **Tree-shaking 友好** — 每个工具函数均可单独导入
- 🌐 **SSR 安全** — 所有涉及 DOM/BOM 的操作均有服务端安全防护
- 📦 **零运行时依赖** — 不引入任何第三方库
- ⚡ **高性能** — 广泛使用记忆化、惰性求值等优化手段

---

## 📦 安装

```bash
# pnpm（推荐）
pnpm add @yh-ui/utils

# npm
npm install @yh-ui/utils
```

> **注意**：`@yh-ui/utils` 是 `@yh-ui/yh-ui` 的基础子包，若已安装主包则无需单独安装。

---

## 🔨 使用

### 完整导入

```ts
import { isString, debounce, deepClone } from '@yh-ui/utils'
```

### 按需导入

```ts
import { isString } from '@yh-ui/utils/is'
import { debounce } from '@yh-ui/utils/function'
import { deepClone } from '@yh-ui/utils/object'
```

---

## 📚 工具函数分类

### 🔍 类型判断（`is`）

```ts
import {
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isArray,
  isObject,
  isDate,
  isRegExp,
  isPromise,
  isSymbol,
  isNil,
  isDef,
  isClient,
  isServer,
  isEmpty
} from '@yh-ui/utils'

isString('hello') // true
isArray([1, 2]) // true
isClient // 是否在浏览器环境
isNil(null) // true（null 或 undefined）
isEmpty({}) // true
isEmpty([]) // true
isEmpty('') // true
```

### ⏱ 函数工具（`function`）

```ts
import { debounce, throttle, once, memoize } from '@yh-ui/utils'

// 防抖：300ms 内只执行一次
const handleInput = debounce((val: string) => fetchSearch(val), 300)

// 节流：每 200ms 最多执行一次
const handleScroll = throttle(() => updatePosition(), 200)

// 只执行一次
const initOnce = once(() => setupSdk())

// 记忆化（相同参数缓存结果）
const expensiveCalc = memoize((n: number) => fibonacci(n))
```

### 🧮 对象工具（`object`）

```ts
import { deepClone, deepMerge, pick, omit, flattenObject } from '@yh-ui/utils'

// 深拷贝（支持循环引用、Date、RegExp、Map、Set）
const clone = deepClone(original)

// 深合并（不可变，返回新对象）
const merged = deepMerge(defaults, overrides)

// 提取指定属性
const subset = pick(obj, ['name', 'age'])

// 排除指定属性
const without = omit(obj, ['password', 'secret'])

// 扁平化嵌套对象
// { a: { b: { c: 1 } } } => { 'a.b.c': 1 }
const flat = flattenObject(nestedObj)
```

### 📝 字符串工具（`string`）

```ts
import {
  capitalize,
  camelCase,
  kebabCase,
  snakeCase,
  truncate,
  escapeHtml,
  stripHtml,
  generateId
} from '@yh-ui/utils'

capitalize('hello world') // 'Hello world'
camelCase('background-color') // 'backgroundColor'
kebabCase('backgroundColor') // 'background-color'
truncate('很长的文字内容', 10) // '很长的文字内容...'
escapeHtml('<script>alert(1)</script>') // '&lt;script&gt;...'
generateId() // 'yh-xxxxxxxx'（唯一 ID）
```

### 🔢 数字工具（`number`）

```ts
import { clamp, round, formatNumber, randomInt } from '@yh-ui/utils'

clamp(150, 0, 100) // 100（限制在范围内）
round(3.14159, 2) // 3.14
formatNumber(1234567.89) // '1,234,567.89'
randomInt(1, 10) // 随机整数 [1, 10]
```

### 📅 日期工具（`date`）

```ts
import { formatDate, parseDate, diffDate, isToday } from '@yh-ui/utils'

formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') // '2025-03-26 11:30:00'
isToday(new Date()) // true
diffDate(date1, date2, 'day') // 相差天数
```

### 🌐 DOM 工具（`dom`）

```ts
import { getScrollTop, setScrollTop, getStyle, hasClass, addClass, removeClass } from '@yh-ui/utils'

// 所有 DOM 工具均有 SSR 安全防护
getScrollTop() // 获取页面滚动距离
setScrollTop(200) // 设置页面滚动位置
getStyle(el, 'font-size') // 获取计算样式
hasClass(el, 'active') // 是否有类名
addClass(el, 'active') // 添加类名
removeClass(el, 'active') // 移除类名
```

### 🎨 颜色工具（`color`）

```ts
import { hexToRgb, rgbToHsv, lighten, darken, mix } from '@yh-ui/utils'

hexToRgb('#409eff') // { r: 64, g: 158, b: 255 }
lighten('#409eff', 0.3) // 亮化 30%
darken('#409eff', 0.3) // 暗化 30%
mix('#409eff', '#ffffff', 0.5) // 混合两种颜色
```

---

## ⚠️ 注意事项

- **DOM 工具**：在 SSR 环境（Nuxt）中，`isClient` 会返回 `false`，所有 DOM 操作自动跳过
- **deepClone**：对于 `WeakMap`、`WeakSet` 等弱引用类型不做深拷贝处理
- **escapeHtml**：始终对用户输入使用此函数，防范 XSS 攻击

---

## 🔗 相关资源

- [📖 官方文档](https://1079161148.github.io/yh-ui/)
- [📦 GitHub 仓库](https://github.com/1079161148/yh-ui)

## 📄 开源协议

MIT License © 2024-present YH-UI Team
