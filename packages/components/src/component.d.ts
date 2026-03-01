/**
 * @yh-ui/components - 全局组件类型声明
 * @description 统一声明所有 YH-UI 组件的 GlobalComponents 类型
 * 使用者只要引入 yh-ui 即可自动获得模板内组件的类型提示
 */

import type { YhButton } from './button'
import type { YhInput } from './input'
import type { YhInputNumber } from './input-number'
import type { YhInputTag } from './input-tag'
import type { YhCheckbox, YhCheckboxGroup } from './checkbox'
import type { YhRadio, YhRadioGroup, YhRadioButton } from './radio'
import type { YhTag } from './tag'
import type { YhIcon } from './icon'
import type { YhForm, YhFormItem, YhFormSchema } from './form'
import type { YhRow } from './row'
import type { YhCol } from './col'
import type { YhDivider } from './divider'
import type { YhRate } from './rate'
import type { YhSwitch } from './switch'
import type { YhAutocomplete } from './autocomplete'
import type { YhSelect, YhOption } from './select'
import type { YhCascader, YhCascaderPanel } from './cascader'
import type { YhSlider } from './slider'
import type { YhTimeSelect } from './time-select'
import type { YhTimePicker } from './time-picker'
import type { YhDatePicker } from './date-picker'
import type { YhTransfer, YhTransferPanel } from './transfer'
import type { YhTreeSelect } from './tree-select'
import type { YhBadge } from './badge'
import type { YhCard } from './card'
import type { YhColorPicker } from './color-picker'
import type { YhSpin } from './spin'
import type { YhBreadcrumb, YhBreadcrumbItem } from './breadcrumb'
import type { YhBackTop } from './back-top'
import type { YhAlert } from './alert'
import type { YhSkeleton, YhSkeletonItem } from './skeleton'
import type { YhProgress } from './progress'
import type { YhTooltip } from './tooltip'
import type { YhPopconfirm } from './popconfirm'
import type { YhPopover } from './popover'
import type { YhDialog } from './dialog'
import type { YhDrawer } from './drawer'
import type { YhWatermark } from './watermark'
import type { YhUpload } from './upload'
import type { YhMarquee } from './marquee'
import type { YhPagination } from './pagination'
import type { YhImage, YhImageViewer } from './image'
import type { YhDescriptions, YhDescriptionsItem } from './descriptions'
import type { YhTabs, YhTabPane } from './tabs'
import type { YhSteps, YhStep } from './steps'
import type { YhConfigProvider } from './config-provider'
import type { YhAffix } from './affix'
import type { YhInfiniteScroll } from './infinite-scroll'
import type { YhDropdown, YhDropdownItem, YhDropdownMenu } from './dropdown'
import type { YhMenu, YhMenuItem, YhMenuItemGroup, YhSubMenu } from './menu'
import type { YhCalendar } from './calendar'
import type { YhWaterfall } from './waterfall'
import type { YhTree, YhTreeNode } from './tree'
import type { YhCountdown } from './countdown'
import type { YhTable, YhTableColumn } from './table'
import type { YhLoading } from './loading'
import type { YhSpace } from './space'
import type { YhAvatar } from './avatar'
import type { YhEmpty } from './empty'
import type {
  YhTypographyTitle,
  YhTypographyText,
  YhTypographyParagraph,
  YhTypographyLink
} from './typography'
import type { YhContainer, YhHeader, YhAside, YhMain, YhFooter } from './container'
import type { YhResult } from './result'
import type { YhGrid, YhGridItem } from './grid'
import type { YhMention } from './mention'
import type { YhAiChat } from './ai-chat'
import type { YhAiBubble } from './ai-bubble'
import type { YhAiSender } from './ai-sender'
import type { YhAiThoughtChain } from './ai-thought-chain'
import type { YhAiCodeBlock } from './ai-code-block'
import type { YhAiThinking } from './ai-thinking'
import type { YhAiWelcome } from './ai-welcome'
import type { YhAiActionGroup } from './ai-action-group'
import type { YhAiEditorSender } from './ai-editor-sender'
import type { YhAiArtifacts } from './ai-artifacts'
import type { YhAiVoiceTrigger } from './ai-voice-trigger'
import type { YhAiConversations } from './ai-conversations'
import type { YhAiPrompts } from './ai-prompts'

declare module 'vue' {
  export interface GlobalComponents {
    // =================== 基础组件 ===================
    YhButton: typeof YhButton
    YhIcon: typeof YhIcon
    YhDivider: typeof YhDivider
    YhSpace: typeof YhSpace
    YhAvatar: typeof YhAvatar
    YhEmpty: typeof YhEmpty
    YhTypographyTitle: typeof YhTypographyTitle
    YhTypographyText: typeof YhTypographyText
    YhTypographyParagraph: typeof YhTypographyParagraph
    YhTypographyLink: typeof YhTypographyLink

    // =================== 布局组件 ===================
    YhRow: typeof YhRow
    YhCol: typeof YhCol
    YhContainer: typeof YhContainer
    YhHeader: typeof YhHeader
    YhAside: typeof YhAside
    YhMain: typeof YhMain
    YhFooter: typeof YhFooter
    YhGrid: typeof YhGrid
    YhGridItem: typeof YhGridItem

    // =================== 表单组件 ===================
    YhInput: typeof YhInput
    YhInputNumber: typeof YhInputNumber
    YhInputTag: typeof YhInputTag
    YhCheckbox: typeof YhCheckbox
    YhCheckboxGroup: typeof YhCheckboxGroup
    YhRadio: typeof YhRadio
    YhRadioGroup: typeof YhRadioGroup
    YhRadioButton: typeof YhRadioButton
    YhSelect: typeof YhSelect
    YhOption: typeof YhOption
    YhCascader: typeof YhCascader
    YhCascaderPanel: typeof YhCascaderPanel
    YhSwitch: typeof YhSwitch
    YhSlider: typeof YhSlider
    YhRate: typeof YhRate
    YhColorPicker: typeof YhColorPicker
    YhAutocomplete: typeof YhAutocomplete
    YhTimePicker: typeof YhTimePicker
    YhTimeSelect: typeof YhTimeSelect
    YhDatePicker: typeof YhDatePicker
    YhTransfer: typeof YhTransfer
    YhTransferPanel: typeof YhTransferPanel
    YhTreeSelect: typeof YhTreeSelect
    YhUpload: typeof YhUpload
    YhForm: typeof YhForm
    YhFormItem: typeof YhFormItem
    YhFormSchema: typeof YhFormSchema
    YhMention: typeof YhMention

    // =================== 数据展示 ===================
    YhTag: typeof YhTag
    YhBadge: typeof YhBadge
    YhCard: typeof YhCard
    YhTable: typeof YhTable
    YhTableColumn: typeof YhTableColumn
    YhTree: typeof YhTree
    YhTreeNode: typeof YhTreeNode
    YhPagination: typeof YhPagination
    YhProgress: typeof YhProgress
    YhSkeleton: typeof YhSkeleton
    YhSkeletonItem: typeof YhSkeletonItem
    YhImage: typeof YhImage
    YhImageViewer: typeof YhImageViewer
    YhCalendar: typeof YhCalendar
    YhDescriptions: typeof YhDescriptions
    YhDescriptionsItem: typeof YhDescriptionsItem
    YhCountdown: typeof YhCountdown
    YhWaterfall: typeof YhWaterfall
    YhWatermark: typeof YhWatermark

    // =================== 反馈组件 ===================
    YhAlert: typeof YhAlert
    YhDialog: typeof YhDialog
    YhDrawer: typeof YhDrawer
    YhTooltip: typeof YhTooltip
    YhPopover: typeof YhPopover
    YhPopconfirm: typeof YhPopconfirm
    YhSpin: typeof YhSpin
    YhLoading: typeof YhLoading
    YhResult: typeof YhResult

    // =================== 导航组件 ===================
    YhBreadcrumb: typeof YhBreadcrumb
    YhBreadcrumbItem: typeof YhBreadcrumbItem
    YhTabs: typeof YhTabs
    YhTabPane: typeof YhTabPane
    YhSteps: typeof YhSteps
    YhStep: typeof YhStep
    YhDropdown: typeof YhDropdown
    YhDropdownItem: typeof YhDropdownItem
    YhDropdownMenu: typeof YhDropdownMenu
    YhMenu: typeof YhMenu
    YhMenuItem: typeof YhMenuItem
    YhMenuItemGroup: typeof YhMenuItemGroup
    YhSubMenu: typeof YhSubMenu
    YhBackTop: typeof YhBackTop
    YhAffix: typeof YhAffix

    // =================== 高级组件 ===================
    YhInfiniteScroll: typeof YhInfiniteScroll
    YhMarquee: typeof YhMarquee
    YhConfigProvider: typeof YhConfigProvider

    // =================== AI 组件 ===================
    YhAiChat: typeof YhAiChat
    YhAiBubble: typeof YhAiBubble
    YhAiSender: typeof YhAiSender
    YhAiThoughtChain: typeof YhAiThoughtChain
    YhAiCodeBlock: typeof YhAiCodeBlock
    YhAiThinking: typeof YhAiThinking
    YhAiWelcome: typeof YhAiWelcome
    YhAiActionGroup: typeof YhAiActionGroup
    YhAiEditorSender: typeof YhAiEditorSender
    YhAiArtifacts: typeof YhAiArtifacts
    YhAiVoiceTrigger: typeof YhAiVoiceTrigger
    YhAiConversations: typeof YhAiConversations
    YhAiPrompts: typeof YhAiPrompts
  }

  export interface GlobalDirectives {
    /** Loading 加载指令 */
    YhLoading: typeof import('./loading').vLoading
    /** 无限滚动指令 */
    YhInfiniteScroll: typeof import('./infinite-scroll').vInfiniteScroll
  }
}

export {}
