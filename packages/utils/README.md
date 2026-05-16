# @yh-ui/utils

YH-UI 的基础工具函数包，提供类型判断、DOM 安全访问、Vue install helpers、样式工具和通用对象函数。它是组件库内部的基础层，也适合在业务项目中作为轻量工具包使用。

[Documentation](https://1079161148.github.io/yh-ui/) | [GitHub](https://github.com/1079161148/yh-ui)

## Highlights

- 类型判断：`isString`、`isNumber`、`isBoolean`、`isFunction`、`isObject`、`isPromise`、`isNil`、`isEmpty`、`isNumeric`。
- 通用函数：`generateId`、`debounce`、`throttle`、`deepClone`、`deepMerge`、`toArray`、`capitalize`、`kebabCase`、`camelCase`、`sleep`、`get`、`set`、`retry`。
- DOM 工具：`isClient`、`isServer`、`getStyle`、`setStyle`、`addClass`、`removeClass`、`getScrollContainer`、`isInViewport`、`getScrollbarWidth`。
- 样式工具：`addUnit`、`removeUnit`、`hexToRgb`、`rgbToHex`、`adjustColorBrightness`、`generateColorPalette`、`setCssVar`、`getCssVar`、`setCssVars`。
- Vue helpers：`withInstall`、`withNoopInstall`、`withInstallFunction`、`withInstallDirective`、`withInstallAll`。
- TypeScript first：导出 `Nullable`、`Awaitable`、`Arrayable`、`Recordable`、`ComponentSize`、`SFCWithInstall` 等常用类型。

## Install

```bash
pnpm add @yh-ui/utils
```

## Usage

```ts
import { debounce, deepClone, isClient, kebabCase } from '@yh-ui/utils'

const search = debounce((keyword: string) => {
  console.log(keyword)
}, 300)

const copied = deepClone({ nested: { value: 1 } })
const className = kebabCase('YhButton')

if (isClient) {
  search('yh-ui')
}
```

## Style Utilities

```ts
import { generateColorPalette, setCssVar } from '@yh-ui/utils'

const palette = generateColorPalette('#409eff')
setCssVar('--yh-color-primary', palette.primary)
```

## Vue Install Helpers

```ts
import { withInstall } from '@yh-ui/utils'
import Button from './Button.vue'

export const YhButton = withInstall(Button)
```

## License

MIT
