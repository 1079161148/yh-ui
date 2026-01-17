/**
 * TimeSelect Types & Props
 * @description 时间选择器组件类型定义
 */

import type { Component } from 'vue'

export type TimeSelectSize = 'large' | 'default' | 'small'

/**
 * 时间选项接口
 */
export interface TimeOption {
  /** 时间值 */
  value: string
  /** 显示标签 */
  label: string
  /** 是否禁用 */
  disabled?: boolean
}

/**
 * TimeSelect Props
 */
export interface TimeSelectProps {
  /** 绑定值 */
  modelValue?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否可编辑 */
  editable?: boolean
  /** 是否可清空 */
  clearable?: boolean
  /** 输入框尺寸 */
  size?: TimeSelectSize
  /** 占位文本 */
  placeholder?: string
  /** 输入框 name 属性 */
  name?: string
  /** 下拉框主题 */
  effect?: 'dark' | 'light'
  /** 前缀图标 */
  prefixIcon?: string | Component
  /** 清空图标 */
  clearIcon?: string | Component
  /** 开始时间 */
  start?: string
  /** 结束时间 */
  end?: string
  /** 时间间隔 */
  step?: string
  /** 最小可选时间 */
  minTime?: string
  /** 最大可选时间 */
  maxTime?: string
  /** 清空时的返回值 */
  valueOnClear?: string
  /** 显示格式 */
  format?: string
  /** 下拉框类名 */
  popperClass?: string
  /** 下拉框样式 */
  popperStyle?: string | Record<string, string>
  /** 是否将下拉框插入到 body */
  teleported?: boolean
  /** 是否在结束时间包含边界值 */
  includeEndTime?: boolean
  /** 是否触发表单验证 */
  validateEvent?: boolean
  /** 自定义时间选项（优先级高于 start/end/step） */
  options?: TimeOption[]
  /** 禁用的时间段（二维数组，如 [['08:00', '09:00'], ['12:00', '13:00']]） */
  disabledHours?: string[][]
}

/**
 * TimeSelect Emits
 */
export interface TimeSelectEmits {
  (e: 'update:modelValue', value: string | undefined): void
  (e: 'change', value: string | undefined): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'visible-change', visible: boolean): void
}

/**
 * TimeSelect Slots
 */
export interface TimeSelectSlots {
  /** 自定义前缀图标 */
  prefix?: () => unknown
  /** 无数据时的内容 */
  empty?: () => unknown
  /** 自定义选项内容 */
  option?: (props: { option: TimeOption }) => unknown
}

/**
 * TimeSelect Expose
 */
export interface TimeSelectExpose {
  /** 获取焦点 */
  focus: () => void
  /** 失去焦点 */
  blur: () => void
  /** 输入框引用 */
  inputRef: HTMLInputElement | undefined
}

/**
 * 解析时间字符串为分钟数
 * @param time 时间字符串，格式 HH:mm 或 HH:mm:ss
 * @returns 分钟数
 */
export const parseTimeToMinutes = (time: string): number => {
  if (!time) return 0
  const parts = time.split(':')
  const hours = parseInt(parts[0], 10) || 0
  const minutes = parseInt(parts[1], 10) || 0
  return hours * 60 + minutes
}

/**
 * 从分钟数格式化为时间字符串
 * @param minutes 分钟数
 * @param format 格式（默认 HH:mm）
 * @returns 时间字符串
 */
export const formatMinutesToTime = (minutes: number, format = 'HH:mm'): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  const HH = String(hours).padStart(2, '0')
  const mm = String(mins).padStart(2, '0')

  return format
    .replace('HH', HH)
    .replace('H', String(hours))
    .replace('mm', mm)
    .replace('m', String(mins))
}

/**
 * 比较两个时间
 * @param time1 时间1
 * @param time2 时间2
 * @returns -1: time1 < time2, 0: time1 = time2, 1: time1 > time2
 */
export const compareTime = (time1: string, time2: string): number => {
  const m1 = parseTimeToMinutes(time1)
  const m2 = parseTimeToMinutes(time2)
  if (m1 < m2) return -1
  if (m1 > m2) return 1
  return 0
}

/**
 * 检查时间是否在指定范围内
 * @param time 要检查的时间
 * @param start 开始时间
 * @param end 结束时间
 * @returns 是否在范围内
 */
export const isTimeInRange = (time: string, start: string, end: string): boolean => {
  const t = parseTimeToMinutes(time)
  const s = parseTimeToMinutes(start)
  const e = parseTimeToMinutes(end)
  return t >= s && t <= e
}

/**
 * 生成时间选项列表
 * @param start 开始时间
 * @param end 结束时间
 * @param step 时间间隔
 * @param format 显示格式
 * @param includeEnd 是否包含结束时间
 * @returns 时间选项列表
 */
export const generateTimeOptions = (
  start: string,
  end: string,
  step: string,
  format = 'HH:mm',
  includeEnd = false
): TimeOption[] => {
  const options: TimeOption[] = []
  const startMinutes = parseTimeToMinutes(start)
  const endMinutes = parseTimeToMinutes(end)
  const stepMinutes = parseTimeToMinutes(step)

  if (stepMinutes <= 0) return options

  // 始终包含结束时间点，与 Element Plus 保持一致
  for (let m = startMinutes; m <= endMinutes; m += stepMinutes) {
    if (m > 24 * 60) break // 不超过 24 小时
    const value = formatMinutesToTime(m, 'HH:mm')
    const label = formatMinutesToTime(m, format)
    options.push({ value, label })
  }

  return options
}
