/**
 * @yh-ui/components
 * @description YH-UI Vue 3 组件库
 */

import type { App, Plugin } from 'vue'

// 导入所有组件
import { YhButton } from './button'
import { YhInput } from './input'
import { YhCheckbox, YhCheckboxGroup } from './checkbox'
import { YhRadio, YhRadioGroup, YhRadioButton } from './radio'
import { YhTag } from './tag'
import { YhInputNumber } from './input-number'
import { YhInputTag } from './input-tag'
import { YhIcon } from './icon'
import { YhForm, YhFormItem, YhFormSchema } from './form'
import { YhRow } from './row'
import { YhCol } from './col'
import { YhDivider } from './divider'
import { YhRate } from './rate'
import { YhSwitch } from './switch'
import { YhAutocomplete } from './autocomplete'
import { YhSelect } from './select'
import { YhCascader, YhCascaderPanel } from './cascader'
import { YhSlider } from './slider'

// 导出所有组件
export * from './button'
export * from './input'
export * from './checkbox'
export * from './radio'
export * from './tag'
export * from './input-number'
export * from './input-tag'
export * from './icon'
export * from './form'
export * from './row'
export * from './col'
export * from './divider'
export * from './rate'
export * from './switch'
export * from './autocomplete'
export * from './select'
export * from './cascader'
export * from './slider'

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
  YhInputTag,
  YhIcon,
  YhForm,
  YhFormItem,
  YhFormSchema,
  YhRow,
  YhCol,
  YhDivider,
  YhRate,
  YhSwitch,
  YhAutocomplete,
  YhSelect,
  YhCascader,
  YhCascaderPanel,
  YhSlider
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
