/**
 * TimePicker Types & Props
 * @description 时间选择器组件类型定义
 * 设计参考: 市面组件库, Naive UI, Ant Design Vue
 */
import type { Component, Ref } from 'vue'
export type TimePickerSize = 'large' | 'default' | 'small'
/**
 * 时间值类型
 */
export type TimeValue = string | Date | number | null
/**
 * 时间范围值类型
 */
export type TimeRangeValue = [TimeValue, TimeValue] | null
/**
 * 禁用时间配置
 */
export interface DisabledTimeConfig {
  /** 禁用的小时 */
  disabledHours?: () => number[]
  /** 禁用的分钟（基于选中的小时） */
  disabledMinutes?: (hour: number) => number[]
  /** 禁用的秒（基于选中的小时和分钟） */
  disabledSeconds?: (hour: number, minute: number) => number[]
}
/**
 * 时间选择器 Props
 */
export interface TimePickerProps {
  /** 绑定值 */
  modelValue?: TimeValue | TimeRangeValue
  /** 是否禁用 */
  disabled?: boolean
  /** 是否可编辑 */
  editable?: boolean
  /** 是否可清空 */
  clearable?: boolean
  /** 输入框尺寸 */
  size?: TimePickerSize
  /** 占位文本 */
  placeholder?: string
  /** 范围选择时开始的占位文本 */
  startPlaceholder?: string
  /** 范围选择时结束的占位文本 */
  endPlaceholder?: string
  /** 输入框 name 属性 */
  name?: string
  /** 是否为范围选择 */
  isRange?: boolean
  /** 时间格式 */
  format?: string
  /** 绑定值的格式（当绑定值为字符串时使用） */
  valueFormat?: string
  /** 前缀图标 */
  prefixIcon?: string | Component
  /** 清空图标 */
  clearIcon?: string | Component
  /** 是否使用 12 小时制 */
  use12Hours?: boolean
  /** 是否显示秒选择器 */
  showSeconds?: boolean
  /** 小时步长 */
  hourStep?: number
  /** 分钟步长 */
  minuteStep?: number
  /** 秒步长 */
  secondStep?: number
  /** 禁用的时间配置 */
  disabledTime?: DisabledTimeConfig
  /** 下拉框类名 */
  popperClass?: string
  /** 下拉框样式 */
  popperStyle?: string | Record<string, string>
  /** 是否将下拉框插入到 body */
  teleported?: boolean
  /** 是否触发表单验证 */
  validateEvent?: boolean
  /** 下拉框偏移量 */
  popperOffset?: number
  /** 范围分隔符 */
  rangeSeparator?: string
  /** 默认显示时间（当值为空时面板打开时显示的时间） */
  defaultValue?: TimeValue | TimeRangeValue
  /** 小时列表的额外选项 */
  hourOptions?: number[]
  /** 分钟列表的额外选项 */
  minuteOptions?: number[]
  /** 秒列表的额外选项 */
  secondOptions?: number[]
  /** 是否在失去焦点时隐藏面板 */
  hideOnBlur?: boolean
  /** 确认按钮文本 */
  confirmText?: string
  /** 取消按钮文本 */
  cancelText?: string
  /** 现在按钮文本 */
  nowText?: string
  /** 是否显示底部操作栏 */
  showFooter?: boolean
  /** 是否显示"此刻"按钮 */
  showNow?: boolean
  /** 箭头控制器 */
  arrowControl?: boolean
  /** tabindex */
  tabindex?: number | string
  /** 输入框 id */
  id?: string
  /** 范围选择时，如果结束时间早于开始时间，是否自动排序 */
  orderOnConfirm?: boolean
  /** 主题覆盖变量 */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}
/**
 * TimePicker Emits
 */
export interface TimePickerEmits {
  (e: 'update:modelValue', value: TimeValue | TimeRangeValue): void
  (e: 'change', value: TimeValue | TimeRangeValue): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'visible-change', visible: boolean): void
  (e: 'confirm', value: TimeValue | TimeRangeValue): void
  (e: 'cancel'): void
}
/**
 * TimePicker Slots
 */
export interface TimePickerSlots {
  /** 自定义前缀图标 */
  prefix?: () => unknown
  /** 自定义后缀图标 */
  suffix?: () => unknown
  /** 自定义范围分隔符 */
  rangeSeparator?: () => unknown
}
/**
 * TimePicker Expose
 */
export interface TimePickerExpose {
  /** 获取焦点 */
  focus: () => void
  /** 失去焦点 */
  blur: () => void
  /** 打开面板 */
  open: () => void
  /** 关闭面板 */
  close: () => void
  /** 输入框引用 */
  inputRef: Ref<HTMLInputElement | undefined>
}
/**
 * 时间面板内部状态
 */
export interface TimeState {
  hours: number
  minutes: number
  seconds: number
}
/**
 * 解析时间字符串或 Date 对象为 TimeState
 */
export declare const parseTimeValue: (value: TimeValue, _format?: string) => TimeState | null
/**
 * 格式化 TimeState 为字符串
 */
export declare const formatTimeState: (
  state: TimeState | null,
  format?: string,
  use12Hours?: boolean
) => string
/**
 * TimeState 转换为 Date 对象
 */
export declare const timeStateToDate: (state: TimeState) => Date
/**
 * 生成数字列表
 */
export declare const generateNumberList: (
  max: number,
  step?: number,
  disabledList?: number[],
  customOptions?: number[]
) => Array<{
  value: number
  disabled: boolean
}>
/**
 * 比较两个 TimeState 是否相等
 */
export declare const isTimeStateEqual: (a: TimeState | null, b: TimeState | null) => boolean
/**
 * 获取当前时间的 TimeState
 */
export declare const getCurrentTimeState: () => TimeState
