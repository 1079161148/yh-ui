/**
 * VitePress Theme Configuration
 *
 * Features:
 * - Custom glassmorphism theme
 * - Language switcher (zh-CN / en-US)
 * - Collapsible sidebar
 * - Back to top button
 * - Micro-animations
 */
import { App, h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

// 导入组件库样式
import '@yh-ui/theme/styles/index.scss'

// 导入组件样式（仅用于函数式调用的组件，这些组件可能不通过模板引用所以需要预加载样式）
import '@yh-ui/components/message/src/message.scss'
import '@yh-ui/components/notification/src/notification.scss'

// 自定义样式
import './styles/index.scss'
import './styles/animations.scss'

// 导入组件
import {
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
  YhSlider,
  YhTimePicker,
  YhTimeSelect,
  YhDatePicker,
  YhTransfer,
  YhTransferPanel,
  YhTreeSelect,
  YhBadge,
  YhCard,
  YhOption,
  YhColorPicker,
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
  YhDrawer,
  YhWatermark,
  YhUpload,
  YhMarquee,
  YhSpin,
  YhLoading,
  YhMessageBox,
  YhPagination,
  YhImage,
  YhImageViewer,
  YhDescriptions,
  YhDescriptionsItem,
  YhTabs,
  YhTabPane,
  YhSteps,
  YhStep,
  YhAffix,
  YhInfiniteScroll,
  YhDropdown,
  YhDropdownItem,
  YhDropdownMenu,
  YhMenu,
  YhMenuItem,
  YhMenuItemGroup,
  YhSubMenu,
  YhConfigProvider,
  YhWaterfall,
  YhTree,
  YhTreeNode,
  YhCalendar,
  YhCountdown,
  vInfiniteScroll
} from '@yh-ui/components'

// 导入文档组件
import DemoBlock from './components/DemoBlock.vue'
import CustomLayout from './components/CustomLayout.vue'

export default {
  extends: DefaultTheme,
  // 使用自定义布局
  Layout: CustomLayout,
  enhanceApp({ app }: { app: App }) {
    // 注册全局组件用于文档演示
    app.component('YhButton', YhButton)
    app.component('YhInput', YhInput)
    app.component('yh-input', YhInput)
    app.component('YhCheckbox', YhCheckbox)
    app.component('yh-checkbox', YhCheckbox)
    app.component('YhCheckboxGroup', YhCheckboxGroup)
    app.component('YhRadio', YhRadio)
    app.component('YhRadioGroup', YhRadioGroup)
    app.component('YhRadioButton', YhRadioButton)
    app.component('YhTag', YhTag)
    app.component('yh-tag', YhTag)
    app.component('YhInputNumber', YhInputNumber)
    app.component('YhInputTag', YhInputTag)
    app.component('YhIcon', YhIcon)
    app.component('yh-icon', YhIcon)
    app.component('YhForm', YhForm)
    app.component('YhFormItem', YhFormItem)
    app.component('YhFormSchema', YhFormSchema)
    app.component('YhRow', YhRow)
    app.component('YhCol', YhCol)
    app.component('YhDivider', YhDivider)
    app.component('YhRate', YhRate)
    app.component('YhSwitch', YhSwitch)
    app.component('YhAutocomplete', YhAutocomplete)
    app.component('YhSelect', YhSelect)
    app.component('YhCascader', YhCascader)
    app.component('YhCascaderPanel', YhCascaderPanel)
    app.component('YhSlider', YhSlider)
    app.component('YhTimePicker', YhTimePicker)
    app.component('YhTimeSelect', YhTimeSelect)
    app.component('YhDatePicker', YhDatePicker)
    app.component('YhTransfer', YhTransfer)
    app.component('YhTransferPanel', YhTransferPanel)
    app.component('YhTreeSelect', YhTreeSelect)
    app.component('YhBadge', YhBadge)
    app.component('YhCard', YhCard)
    app.component('YhOption', YhOption)
    app.component('YhColorPicker', YhColorPicker)
    app.component('yh-color-picker', YhColorPicker)
    app.component('YhBreadcrumb', YhBreadcrumb)
    app.component('YhBreadcrumbItem', YhBreadcrumbItem)
    app.component('YhBackTop', YhBackTop)
    app.component('YhAlert', YhAlert)
    app.component('YhSkeleton', YhSkeleton)
    app.component('YhSkeletonItem', YhSkeletonItem)
    app.component('YhProgress', YhProgress)
    app.component('YhTooltip', YhTooltip)
    app.component('yh-tooltip', YhTooltip)
    app.component('YhPopconfirm', YhPopconfirm)
    app.component('yh-popconfirm', YhPopconfirm)
    app.component('YhPopover', YhPopover)
    app.component('yh-popover', YhPopover)
    app.component('YhDialog', YhDialog)
    app.component('yh-dialog', YhDialog)
    app.component('YhDrawer', YhDrawer)
    app.component('yh-drawer', YhDrawer)
    app.component('YhWatermark', YhWatermark)
    app.component('yh-watermark', YhWatermark)
    app.component('YhUpload', YhUpload)
    app.component('yh-upload', YhUpload)
    app.component('YhMarquee', YhMarquee)
    app.component('yh-marquee', YhMarquee)
    app.component('YhSpin', YhSpin)
    app.component('yh-spin', YhSpin)
    app.component('YhLoading', YhLoading as any)
    app.component('YhMessageBox', YhMessageBox as any)
    app.component('YhPagination', YhPagination)
    app.component('yh-pagination', YhPagination)
    app.component('YhImage', YhImage)
    app.component('yh-image', YhImage)
    app.component('YhImageViewer', YhImageViewer)
    app.component('yh-image-viewer', YhImageViewer)
    app.component('YhDescriptions', YhDescriptions)
    app.component('yh-descriptions', YhDescriptions)
    app.component('YhDescriptionsItem', YhDescriptionsItem)
    app.component('yh-descriptions-item', YhDescriptionsItem)
    app.component('YhConfigProvider', YhConfigProvider)
    app.component('YhTabs', YhTabs)
    app.component('yh-tabs', YhTabs)
    app.component('YhTabPane', YhTabPane)
    app.component('yh-tab-pane', YhTabPane)
    app.component('YhSteps', YhSteps)
    app.component('yh-steps', YhSteps)
    app.component('YhStep', YhStep)
    app.component('yh-step', YhStep)

    // 新增组件
    app.component('YhAffix', YhAffix)
    app.component('yh-affix', YhAffix)
    app.component('YhInfiniteScroll', YhInfiniteScroll)
    app.component('yh-infinite-scroll', YhInfiniteScroll)
    app.component('YhDropdown', YhDropdown)
    app.component('yh-dropdown', YhDropdown)
    app.component('YhDropdownItem', YhDropdownItem)
    app.component('yh-dropdown-item', YhDropdownItem)
    app.component('YhDropdownMenu', YhDropdownMenu)
    app.component('yh-dropdown-menu', YhDropdownMenu)
    app.component('YhMenu', YhMenu)
    app.component('yh-menu', YhMenu)
    app.component('YhMenuItem', YhMenuItem)
    app.component('yh-menu-item', YhMenuItem)
    app.component('YhMenuItemGroup', YhMenuItemGroup)
    app.component('yh-menu-item-group', YhMenuItemGroup)
    app.component('YhSubMenu', YhSubMenu)
    app.component('yh-sub-menu', YhSubMenu)
    app.component('YhWaterfall', YhWaterfall)
    app.component('yh-waterfall', YhWaterfall)
    app.component('YhTree', YhTree)
    app.component('yh-tree', YhTree)
    app.component('YhTreeNode', YhTreeNode)
    app.component('yh-tree-node', YhTreeNode)
    app.component('YhCalendar', YhCalendar)
    app.component('yh-calendar', YhCalendar)
    app.component('YhCountdown', YhCountdown)
    app.component('yh-countdown', YhCountdown)

    // 注册指令
    app.directive('infinite-scroll', vInfiniteScroll)

    // 注册文档组件
    app.component('DemoBlock', DemoBlock)
  }
} satisfies Theme
