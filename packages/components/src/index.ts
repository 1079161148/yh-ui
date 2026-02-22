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
import { YhSpin } from './spin'
import { YhLoading } from './loading'
import { YhMessageBox } from './message-box'
import { YhBreadcrumb, YhBreadcrumbItem } from './breadcrumb'
import { YhBackTop } from './back-top'
import { YhAlert } from './alert'
import { YhSkeleton, YhSkeletonItem } from './skeleton'
import { YhProgress } from './progress'
import { YhTooltip } from './tooltip'
import { YhPopconfirm } from './popconfirm'
import { YhPopover } from './popover'
import { YhDialog, YhDialogMethod } from './dialog'
import { YhDrawer } from './drawer'
import { YhWatermark } from './watermark'
import { YhUpload } from './upload'
import { YhMarquee } from './marquee'
import { YhPagination } from './pagination'
import { YhImage, YhImageViewer } from './image'
import { YhDescriptions, YhDescriptionsItem } from './descriptions'
import { YhTabs, YhTabPane } from './tabs'
import { YhSteps, YhStep } from './steps'
import { YhConfigProvider } from './config-provider'
import { YhAffix } from './affix'
import { YhInfiniteScroll } from './infinite-scroll'
import { YhDropdown, YhDropdownItem, YhDropdownMenu } from './dropdown'
import { YhMenu, YhMenuItem, YhMenuItemGroup, YhSubMenu } from './menu'
import { YhCalendar } from './calendar'
import { YhWaterfall } from './waterfall'
import { YhTree, YhTreeNode } from './tree'
import { YhCountdown } from './countdown'
import { YhTable, YhTableColumn } from './table'
import { YhSpace } from './space'
import { YhAvatar } from './avatar'
import { YhEmpty } from './empty'
import {
  YhTypographyTitle,
  YhTypographyText,
  YhTypographyParagraph,
  YhTypographyLink
} from './typography'
import { YhContainer, YhHeader, YhAside, YhMain, YhFooter } from './container'
import { YhResult } from './result'
import { YhGrid, YhGridItem } from './grid'
import { YhMention } from './mention'

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
export * from './spin'
export * from './loading'
export * from './message-box'
export * from './breadcrumb'
export * from './back-top'
export * from './alert'
export * from './skeleton'
export * from './progress'
export * from './tooltip'
export * from './popconfirm'
export * from './popover'
export * from './dialog'
export * from './drawer'
export * from './watermark'
export * from './upload'
export * from './marquee'
export * from './pagination'
export * from './image'
export * from './descriptions'
export * from './tabs'
export * from './steps'
export * from './config-provider'
export * from './affix'
export * from './infinite-scroll'
export * from './dropdown'
export * from './menu'
export * from './calendar'
export * from './waterfall'
export * from './tree'
export * from './countdown'
export * from './table'
export * from './space'
export * from './avatar'
export * from './empty'
export * from './typography'
export * from './container'
export * from './result'
export * from './grid'
export * from './mention'

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
  YhSpin,
  YhLoading,
  YhMessageBox,
  YhBreadcrumb,
  YhBreadcrumbItem,
  YhBackTop,
  YhAlert,
  YhSkeleton,
  YhSkeletonItem,
  YhProgress,
  YhTooltip,
  YhPopconfirm,
  YhPopover,
  YhDialog,
  YhDialogMethod,
  YhDrawer,
  YhWatermark,
  YhUpload,
  YhMarquee,
  YhPagination,
  YhImage,
  YhImageViewer,
  YhDescriptions,
  YhDescriptionsItem,
  YhTabs,
  YhTabPane,
  YhSteps,
  YhStep,
  YhConfigProvider,
  YhAffix,
  YhInfiniteScroll,
  YhDropdown,
  YhDropdownItem,
  YhDropdownMenu,
  YhMenu,
  YhMenuItem,
  YhMenuItemGroup,
  YhSubMenu,
  YhCalendar,
  YhWaterfall,
  YhTree,
  YhTreeNode,
  YhCountdown,
  YhTable,
  YhTableColumn,
  YhSpace,
  YhAvatar,
  YhEmpty,
  YhTypographyTitle,
  YhTypographyText,
  YhTypographyParagraph,
  YhTypographyLink,
  YhContainer,
  YhHeader,
  YhAside,
  YhMain,
  YhFooter,
  YhResult,
  YhGrid,
  YhGridItem,
  YhMention
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
  app.config.globalProperties.$dialog = YhDialogMethod
  app.config.globalProperties.$msgbox = YhMessageBox
  app.config.globalProperties.$alert = YhMessageBox.alert
  app.config.globalProperties.$confirm = YhMessageBox.confirm
  app.config.globalProperties.$prompt = YhMessageBox.prompt
}

/**
 * 默认导出
 */
export default {
  install,
  // 导出函数式 API，便于具名导入
  YhMessage,
  YhNotification,
  YhDialogMethod
}
