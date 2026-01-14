/**
 * @yh-ui/components
 * @description YH-UI Vue 3 组件库
 */

// 基础组件
export * from './button'
export * from './input'
export * from './checkbox'
export * from './radio'
export * from './tag'
export * from './input-number'
export * from './input-tag'

// 导出所有组件的安装器
import type { App, Plugin } from 'vue'
import { YhButton } from './button'
import { YhInput } from './input'
import { YhCheckbox, YhCheckboxGroup } from './checkbox'
import { YhRadio, YhRadioGroup, YhRadioButton } from './radio'
import { YhTag } from './tag'
import { YhInputNumber } from './input-number'
import { YhInputTag } from './input-tag'

// 所有组件列表
const components = [
  YhButton,
  YhInput,
  YhCheckbox,
  YhCheckboxGroup,
  YhRadio,
  YhRadioGroup,
  YhRadioButton,
  YhTag,
  YhInputNumber,
  YhInputTag
] as Plugin[]

/**
 * 全量注册所有组件
 */
export const install = (app: App): void => {
  components.forEach((component) => {
    app.use(component)
  })
}

/**
 * 默认导出
 */
export default {
  install
}
