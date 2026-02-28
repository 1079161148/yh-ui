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
import { App, Component } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

// 导入组件库主题变量
import '@yh-ui/theme/styles/index.scss'

// 自定义文档样式（先导入，优先级较低）
import './styles/index.scss'
import './styles/animations.scss'

// 导入组件样式（后导入，优先级较高，不会被文档样式覆盖）
import '@yh-ui/components/message/src/message.scss'
import '@yh-ui/components/notification/src/notification.scss'
import '@yh-ui/components/table/src/table.scss'
import '@yh-ui/components/icon/src/icon.scss'

// 导入 icon spin 动画样式（修复文档中 spin 属性不生效的问题）
import './styles/icon-spin.css'

// 导入 @yh-ui/icons 的 Icon 组件
import { Icon as YhIconify } from '@yh-ui/icons'

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
  YhTable,
  YhTableColumn,
  YhSpace,
  YhAvatar,
  YhEmpty,
  // Typography
  YhTypographyTitle,
  YhTypographyText,
  YhTypographyParagraph,
  YhTypographyLink,
  // Container
  YhContainer,
  YhHeader,
  YhAside,
  YhMain,
  YhFooter,
  // Result
  YhResult,
  // Grid
  YhGrid,
  YhGridItem,
  YhMention,
  // AI Components
  YhAiChat,
  YhAiBubble,
  YhAiSender,
  YhAiThoughtChain,
  YhAiCodeBlock,
  YhAiThinking,
  YhAiWelcome,
  YhAiActionGroup,
  YhAiEditorSender,
  vInfiniteScroll,
  vYhLoading
} from '@yh-ui/components'

// 导入文档组件
import DemoBlock from './components/DemoBlock.vue'
import IconDemo from './components/IconDemo.vue'
import CustomLayout from './components/CustomLayout.vue'

export default {
  extends: DefaultTheme,
  // 使用自定义布局
  Layout: CustomLayout,
  enhanceApp({ app }: { app: App }) {
    // 注册全局组件用于文档演示
    app.component('YhButton', YhButton)
    app.component('YhInput', YhInput)
    app.component('YhCheckbox', YhCheckbox)
    app.component('YhCheckboxGroup', YhCheckboxGroup)
    app.component('YhRadio', YhRadio)
    app.component('YhRadioGroup', YhRadioGroup)
    app.component('YhRadioButton', YhRadioButton)
    app.component('YhTag', YhTag)
    app.component('YhInputNumber', YhInputNumber)
    app.component('YhInputTag', YhInputTag)
    app.component('YhIcon', YhIcon)
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
    app.component('YhBreadcrumb', YhBreadcrumb)
    app.component('YhBreadcrumbItem', YhBreadcrumbItem)
    app.component('YhBackTop', YhBackTop)
    app.component('YhAlert', YhAlert)
    app.component('YhSkeleton', YhSkeleton)
    app.component('YhSkeletonItem', YhSkeletonItem)
    app.component('YhProgress', YhProgress)
    app.component('YhTooltip', YhTooltip)
    app.component('YhPopconfirm', YhPopconfirm)
    app.component('YhPopover', YhPopover)
    app.component('YhDialog', YhDialog)
    app.component('YhDrawer', YhDrawer)
    app.component('YhWatermark', YhWatermark)
    app.component('YhUpload', YhUpload)
    app.component('YhMarquee', YhMarquee)
    app.component('YhSpin', YhSpin)
    app.component('YhLoading', YhLoading as unknown as Component)
    app.component('YhMessageBox', YhMessageBox as unknown as Component)
    app.component('YhPagination', YhPagination)
    app.component('YhImage', YhImage)
    app.component('YhImageViewer', YhImageViewer)
    app.component('YhDescriptions', YhDescriptions)
    app.component('YhDescriptionsItem', YhDescriptionsItem)
    app.component('YhConfigProvider', YhConfigProvider)
    app.component('YhTabs', YhTabs)
    app.component('YhTabPane', YhTabPane)
    app.component('YhSteps', YhSteps)
    app.component('YhStep', YhStep)

    // 新增组件
    app.component('YhAffix', YhAffix)
    app.component('YhInfiniteScroll', YhInfiniteScroll)
    app.component('YhDropdown', YhDropdown)
    app.component('YhDropdownItem', YhDropdownItem)
    app.component('YhDropdownMenu', YhDropdownMenu)
    app.component('YhMenu', YhMenu)
    app.component('YhMenuItem', YhMenuItem)
    app.component('YhMenuItemGroup', YhMenuItemGroup)
    app.component('YhSubMenu', YhSubMenu)
    app.component('YhWaterfall', YhWaterfall)
    app.component('YhTree', YhTree)
    app.component('YhTreeNode', YhTreeNode)
    app.component('YhCalendar', YhCalendar)
    app.component('YhCountdown', YhCountdown)
    app.component('YhTable', YhTable)
    app.component('YhTableColumn', YhTableColumn)
    app.component('YhSpace', YhSpace)
    app.component('YhAvatar', YhAvatar)
    app.component('YhEmpty', YhEmpty)

    // Typography 排版
    app.component('YhTypographyTitle', YhTypographyTitle)
    app.component('YhTypographyText', YhTypographyText)
    app.component('YhTypographyParagraph', YhTypographyParagraph)
    app.component('YhTypographyLink', YhTypographyLink)

    // Container 布局容器
    app.component('YhContainer', YhContainer)
    app.component('YhHeader', YhHeader)
    app.component('YhAside', YhAside)
    app.component('YhMain', YhMain)
    app.component('YhFooter', YhFooter)

    // Result 结果
    app.component('YhResult', YhResult)

    // Grid 网格布局
    app.component('YhGrid', YhGrid)
    app.component('YhGridItem', YhGridItem)

    // Mention 提及
    app.component('YhMention', YhMention)

    // AI 组件
    app.component('YhAiChat', YhAiChat)
    app.component('YhAiBubble', YhAiBubble)
    app.component('YhAiSender', YhAiSender)
    app.component('YhAiThoughtChain', YhAiThoughtChain)
    app.component('YhAiCodeBlock', YhAiCodeBlock)
    app.component('YhAiThinking', YhAiThinking)
    app.component('YhAiWelcome', YhAiWelcome)
    app.component('YhAiActionGroup', YhAiActionGroup)
    app.component('YhAiEditorSender', YhAiEditorSender)

    // 注册指令
    app.directive('infinite-scroll', vInfiniteScroll)
    app.directive('yh-loading', vYhLoading)

    // 注册文档组件
    app.component('DemoBlock', DemoBlock)
    app.component('IconDemo', IconDemo)

    // 注册 @yh-ui/icons 的 Icon 组件
    // eslint-disable-next-line vue/multi-word-component-names
    app.component('Icon', YhIconify)
    app.component('YhIconifyIcon', YhIconify)
  }
} satisfies Theme
