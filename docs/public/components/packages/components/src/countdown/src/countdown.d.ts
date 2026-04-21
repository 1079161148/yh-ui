import type { ExtractPropTypes, PropType, CSSProperties } from 'vue'
/** 倒计时时间单位配置 */
export interface CountdownTimeUnits {
  /** 天 */
  days: number
  /** 小时 */
  hours: number
  /** 分钟 */
  minutes: number
  /** 秒 */
  seconds: number
  /** 毫秒 */
  milliseconds: number
}
/** 倒计时格式化上下文 */
export interface CountdownFormatContext extends CountdownTimeUnits {
  /** 总剩余毫秒数 */
  total: number
  /** 两位数天 (DD) */
  DD: string
  /** 两位数小时 (HH) */
  HH: string
  /** 两位数分钟 (mm) */
  mm: string
  /** 两位数秒 (ss) */
  ss: string
  /** 三位数毫秒 (SSS) */
  SSS: string
  /** 两位数毫秒前两位 (SS) */
  SS: string
  /** 一位数毫秒前一位 (S) */
  S: string
}
/** 倒计时值类型 - 支持目标时间(Date/number)和时长(number) */
export type CountdownValue = Date | number
/** 倒计时格式化类型 */
export type CountdownFormat = string | ((ctx: CountdownFormatContext) => string)
/** 倒计时状态 */
export type CountdownStatus = 'pending' | 'running' | 'paused' | 'finished'
export declare const countdownProps: {
  /**
   * 目标截止时间（Date 或毫秒时间戳）或倒计时时长（毫秒）
   * @description 当传入 Date 或 > 1e12 的数值时视为目标时间戳，否则视为持续时间
   */
  readonly value: {
    readonly type: PropType<CountdownValue>
    readonly required: true
  }
  /**
   * 格式化模板或自定义格式化函数
   * @description 支持 DD（天）、HH（时）、mm（分）、ss（秒）、SSS（毫秒）占位符
   * @default 'HH:mm:ss'
   */
  readonly format: {
    readonly type: PropType<CountdownFormat>
    readonly default: 'HH:mm:ss'
  }
  /**
   * 是否自动开始倒计时
   * @default true
   */
  readonly autoStart: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /**
   * 刷新间隔（毫秒）
   * @description 设置小于 1000 可显示毫秒级变化。建议值 1000/100/50 等
   * @default 1000
   */
  readonly interval: {
    readonly type: NumberConstructor
    readonly default: 1000
    readonly validator: (val: number) => boolean
  }
  /**
   * 倒计时精度（毫秒）
   * @description 配合 interval 使用，决定毫秒位的刷新频率
   * @default 1000
   */
  readonly precision: {
    readonly type: PropType<1000 | 100 | 10>
    readonly default: 1000
    readonly validator: (val: number) => boolean
  }
  /**
   * 标题/前缀文本
   */
  readonly title: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /**
   * 后缀文本
   */
  readonly suffix: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /**
   * 数字使用等宽字体（防止数字变化时抖动）
   * @default true
   */
  readonly useMonospaceFont: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /**
   * 是否使用翻牌效果动画
   * @default false
   */
  readonly flipAnimation: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /**
   * 值的样式
   */
  readonly valueStyle: {
    readonly type: PropType<CSSProperties | string>
  }
  /**
   * 分隔符
   * @description 用于格式化显示中各时间单位之间的分隔符
   * @default ':'
   */
  readonly separator: {
    readonly type: StringConstructor
    readonly default: ':'
  }
  /**
   * 是否显示日（当剩余时间 >= 24 小时时强制显示）
   * @default 'auto'
   */
  readonly showDays: {
    readonly type: PropType<boolean | 'auto'>
    readonly default: 'auto'
  }
  /**
   * 是否显示小时
   * @default true
   */
  readonly showHours: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /**
   * 是否显示分钟
   * @default true
   */
  readonly showMinutes: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /**
   * 是否显示秒
   * @default true
   */
  readonly showSeconds: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /**
   * 是否显示毫秒
   * @default false
   */
  readonly showMilliseconds: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /**
   * 时间单位标签（自动模式）
   * @description 为每个时间单位添加标签，如 { days: '天', hours: '时' }
   */
  readonly labels: {
    readonly type: PropType<Partial<Record<keyof CountdownTimeUnits, string>>>
  }
  /**
   * 时间结束时是否保持在 0 而不是隐藏
   * @default true
   */
  readonly keepAliveOnFinish: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /**
   * 倒计时结束前预警时间（毫秒）
   * @description 倒计时剩余时间小于此值时，会添加 is-warning 类名并触发 warning 事件
   */
  readonly warningThreshold: {
    readonly type: NumberConstructor
  }
  /**
   * 时区偏移（分钟）
   * @description 用于服务端和客户端时间校准
   */
  readonly timezoneOffset: {
    readonly type: NumberConstructor
  }
  /**
   * 服务器时间校准值（毫秒）
   * @description 当服务器时间和本地时间存在偏差时使用，值 = 服务器时间 - 本地时间
   */
  readonly serverTimeOffset: {
    readonly type: NumberConstructor
    readonly default: 0
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export declare const countdownEmits: {
  /** 倒计时更新时触发 */
  change: (_ctx: CountdownFormatContext) => boolean
  /** 倒计时结束时触发 */
  finish: () => boolean
  /** 倒计时开始时触发 */
  start: () => boolean
  /** 倒计时暂停时触发 */
  pause: () => boolean
  /** 倒计时继续时触发 */
  resume: () => boolean
  /** 倒计时重置时触发 */
  reset: () => boolean
  /** 进入预警状态时触发 */
  warning: (_ctx: CountdownFormatContext) => boolean
  /** 状态变化时触发 */
  statusChange: (status: CountdownStatus) => boolean
}
export type CountdownProps = ExtractPropTypes<typeof countdownProps>
export type CountdownEmits = typeof countdownEmits
/** 组件暴露的方法 */
export interface CountdownExpose {
  /** 开始倒计时 */
  start: () => void
  /** 暂停倒计时 */
  pause: () => void
  /** 恢复倒计时 */
  resume: () => void
  /** 重置倒计时 */
  reset: () => void
  /** 获取当前剩余毫秒数 */
  getRemain: () => number
  /** 获取当前状态 */
  getStatus: () => CountdownStatus
}
/** 时间常量（避免魔法数字） */
export declare const TIME_CONSTANTS: {
  /** 毫秒/秒 */
  readonly SECOND: 1000
  /** 毫秒/分 */
  readonly MINUTE: number
  /** 毫秒/时 */
  readonly HOUR: number
  /** 毫秒/天 */
  readonly DAY: number
}
/**
 * 解析剩余毫秒数为时间单位对象
 * @param remain 剩余毫秒数
 */
export declare function parseTimeUnits(remain: number): CountdownTimeUnits
/**
 * 数字补零
 * @param num 数字
 * @param len 目标长度
 */
export declare function padZero(num: number, len?: number): string
/**
 * 创建格式化上下文
 * @param remain 剩余毫秒数
 */
export declare function createFormatContext(remain: number): CountdownFormatContext
/**
 * 格式化倒计时时间
 * @param format 格式化模板或函数
 * @param ctx 格式化上下文
 */
export declare function formatCountdown(
  format: CountdownFormat,
  ctx: CountdownFormatContext
): string
/**
 * 判断值是否为目标时间戳
 * @param value 传入的值
 * @returns true 表示是目标时间戳，false 表示是持续时间
 */
export declare function isTargetTimestamp(value: CountdownValue): boolean
/**
 * 计算剩余时间
 * @param value 目标时间或持续时间
 * @param serverTimeOffset 服务器时间偏移
 */
export declare function calculateRemain(value: CountdownValue, serverTimeOffset?: number): number
