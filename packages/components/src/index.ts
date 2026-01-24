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
import { YhSelect, YhOption } from './select'
import { YhCascader, YhCascaderPanel } from './cascader'
import { YhSlider } from './slider'
import { YhTimeSelect } from './time-select'
import { YhTimePicker } from './time-picker'
import { YhDatePicker } from './date-picker'
import { YhTransfer, YhTransferPanel } from './transfer'
import { YhTreeSelect } from './tree-select'
import { YhBadge } from './badge'
import { YhCard } from './card'
import { YhMessage } from './message'
import { YhNotification } from './notification'
import { YhColorPicker } from './color-picker'
import { YhConfigProvider } from './config-provider'

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
export * from './time-select'
export * from './time-picker'
export * from './date-picker'
export * from './transfer'
export * from './tree-select'
export * from './badge'
export * from './card'
export * from './message'
export * from './notification'
export * from './color-picker'
export * from './config-provider'

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
  YhOption,
  YhCascader,
  YhCascaderPanel,
  YhSlider,
  YhTimeSelect,
  YhTimePicker,
  YhDatePicker,
  YhTransfer,
  YhTransferPanel,
  YhTreeSelect,
  YhBadge,
  YhCard,
  YhColorPicker,
  YhConfigProvider
] as Plugin[]

/**
 * 全量注册所有组件
 */
export const install = (app: App): void => {
  // 注册所有组件
  components.forEach((component) => {
    app.use(component)
  })

  // 挂载全局方法
  app.config.globalProperties.$message = YhMessage
  app.config.globalProperties.$notify = YhNotification
}

/**
 * 默认导出
 */
export default {
  install,
  // 导出函数式 API，便于具名导入
  YhMessage,
  YhNotification
}
