/**
 * DatePicker Types & Props
 * @description 日期选择器组件类型定义
 * 设计参考: 市面组件库, Naive UI, Ant Design Vue
 */
import type { Component, ExtractPropTypes, PropType } from 'vue'
export type DatePickerType =
  | 'date'
  | 'datetime'
  | 'year'
  | 'month'
  | 'week'
  | 'quarter'
  | 'daterange'
  | 'datetimerange'
  | 'monthrange'
  | 'yearrange'
  | 'quarterrange'
export type DatePickerSize = 'large' | 'default' | 'small'
/**
 * 预设快捷选项类型
 */
export interface DatePickerPreset {
  label: string
  value: Date | [Date, Date] | (() => Date | [Date, Date])
}
export type DatePickerStatus = 'success' | 'warning' | 'error'
/**
 * 日期值类型
 */
export type DateValue = string | number | Date | null
export type DateRangeValue = [DateValue, DateValue] | null
export declare const datePickerProps: {
  /** 绑定值 */
  readonly modelValue: {
    readonly type: PropType<DateValue | DateRangeValue>
    readonly default: null
  }
  /** 类型 */
  readonly type: {
    readonly type: PropType<DatePickerType>
    readonly default: 'date'
  }
  /** 是否禁用 */
  readonly disabled: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否只读 */
  readonly readonly: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否可清空 */
  readonly clearable: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 尺寸 */
  readonly size: {
    readonly type: PropType<DatePickerSize>
    readonly default: 'default'
  }
  /** 占位符 */
  readonly placeholder: {
    readonly type: StringConstructor
    readonly default: undefined
  }
  /** 范围选择时的开始占位符 */
  readonly startPlaceholder: {
    readonly type: StringConstructor
    readonly default: undefined
  }
  /** 范围选择时的结束占位符 */
  readonly endPlaceholder: {
    readonly type: StringConstructor
    readonly default: undefined
  }
  /** 格式化显示 */
  readonly format: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 绑定值的格式 */
  readonly valueFormat: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 面板显示的日期格式 */
  readonly dateFormat: {
    readonly type: StringConstructor
    readonly default: 'YYYY-MM-DD'
  }
  /** 面板显示的时间格式 */
  readonly timeFormat: {
    readonly type: StringConstructor
    readonly default: 'HH:mm:ss'
  }
  /** 范围分隔符 */
  readonly rangeSeparator: {
    readonly type: StringConstructor
    readonly default: '-'
  }
  /** 第一天是星期几 */
  readonly firstDayOfWeek: {
    readonly type: NumberConstructor
    readonly default: 7
  }
  /** 禁用日期函数 */
  readonly disabledDate: {
    readonly type: PropType<(date: Date) => boolean>
    readonly default: undefined
  }
  /** 预设快捷选项 */
  readonly presets: {
    readonly type: PropType<DatePickerPreset[]>
    readonly default: () => never[]
  }
  /** 预设选项的位置 */
  readonly presetPosition: {
    readonly type: PropType<'left' | 'right' | 'top' | 'bottom'>
    readonly default: 'bottom'
  }
  /** 是否显示底部操作栏 */
  readonly showFooter: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 状态 */
  readonly status: {
    readonly type: PropType<DatePickerStatus>
    readonly default: undefined
  }
  /** 是否自动排序范围（当结束日期早于开始日期时） */
  readonly orderOnConfirm: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 自定义前缀图标 */
  readonly prefixIcon: {
    readonly type: PropType<string | Component>
    readonly default: ''
  }
  /** 自定义清除图标 */
  readonly clearIcon: {
    readonly type: PropType<string | Component>
    readonly default: ''
  }
  /** 选择器打开时默认显示的日期 */
  readonly defaultValue: {
    readonly type: PropType<Date | Date[]>
    readonly default: undefined
  }
  /** 是否内联显示（只显示面板） */
  readonly panelOnly: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 默认时间（datetime 模式下） */
  readonly defaultTime: {
    readonly type: PropType<Date | Date[]>
    readonly default: undefined
  }
  /** 下拉框类名 */
  readonly popperClass: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 是否将面板插入到 body */
  readonly teleported: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 是否触发表单验证 */
  readonly validateEvent: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 小名/标识 */
  readonly name: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** ID */
  readonly id: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 单元格形状 */
  readonly cellShape: {
    readonly type: PropType<'round' | 'square'>
    readonly default: 'round'
  }
  /** 自定义单元格渲染函数 */
  readonly cellRender: {
    readonly type: PropType<
      (date: Date) =>
        | string
        | {
            text: string
            className?: string
          }
    >
    readonly default: undefined
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
export interface DatePickerEmits {
  (e: 'update:modelValue', value: DateValue | DateRangeValue): void
  (e: 'change', value: DateValue | DateRangeValue): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'confirm', value: DateValue | DateRangeValue): void
  (e: 'panel-change', value: Date, mode: PanelView): void
  (e: 'visible-change', visible: boolean): void
}
export interface DatePickerSlots {
  'prefix-icon'?: () => unknown
  'clear-icon'?: () => unknown
  extra?: () => unknown
  'date-cell'?: (props: { cell: Date }) => unknown
  footer?: () => unknown
}
/**
 * 内部状态中的面板视图类型
 */
export type PanelView = 'date' | 'month' | 'year' | 'week' | 'quarter'
