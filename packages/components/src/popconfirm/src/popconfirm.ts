import type { ExtractPropTypes, PropType } from 'vue'
import type { TooltipPlacement } from '../../tooltip/src/tooltip'

export const popconfirmProps = {
  /** 标题 */
  title: {
    type: String,
    default: ''
  },
  /** 描述内容 */
  description: {
    type: String,
    default: ''
  },
  /** 确认按钮文字 */
  confirmButtonText: {
    type: String,
    default: '确定'
  },
  /** 取消按钮文字 */
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  /** 确认按钮类型 */
  confirmButtonType: {
    type: String as PropType<'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: 'primary'
  },
  /** 取消按钮类型 */
  cancelButtonType: {
    type: String as PropType<'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: 'default'
  },
  /** 图标 */
  icon: {
    type: String,
    default: 'warning'
  },
  /** 图标颜色 */
  iconColor: {
    type: String,
    default: '#faad14'
  },
  /** 是否隐藏图标 */
  hideIcon: {
    type: Boolean,
    default: false
  },
  /** 是否隐藏取消按钮 */
  hideCancel: {
    type: Boolean,
    default: false
  },
  /** 偏移量 [skidding, distance] */
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [0, 12]
  },
  /** 出现位置 */
  placement: {
    type: String as PropType<TooltipPlacement>,
    default: 'top'
  },
  /** 手动控制可见性 */
  visible: {
    type: Boolean as PropType<boolean | null>,
    default: null
  },
  /** 宽度 */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: 180
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** z-index */
  zIndex: {
    type: Number,
    default: 2000
  },
  /** 是否显示小三角 */
  showArrow: {
    type: Boolean,
    default: true
  },
  /** 弹出层的自定义类名 */
  popperClass: {
    type: String,
    default: ''
  },
  /** 弹出层自定义样式 */
  popperStyle: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  /** 挂载节点 */
  teleported: {
    type: Boolean,
    default: true
  },
  /** 是否显示“不再提示”勾选框 (高级自创功能) */
  showDontAskAgain: {
    type: Boolean,
    default: false
  },
  /** “不再提示”的文本 */
  dontAskAgainText: {
    type: String,
    default: '不再提示'
  },
  /** 是否反置确认和取消按钮位置 (高级自创功能) */
  swapButtons: {
    type: Boolean,
    default: false
  },
  /** 确认前执行的异步逻辑 */
  beforeConfirm: {
    type: Function as PropType<() => boolean | Promise<boolean>>,
    default: null
  }
} as const

export const popconfirmEmits = {
  confirm: (dontAskAgain?: boolean) => true,
  cancel: () => true,
  'update:visible': (visible: boolean) => typeof visible === 'boolean'
}

export type PopconfirmProps = ExtractPropTypes<typeof popconfirmProps>
export type PopconfirmEmits = typeof popconfirmEmits
