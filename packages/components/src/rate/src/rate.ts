import type { ExtractPropTypes, PropType, Component } from 'vue'

export const rateProps = {
  modelValue: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 5
  },
  disabled: {
    type: Boolean,
    default: false
  },
  allowHalf: {
    type: Boolean,
    default: false
  },
  // 自定义图标 - 选中状态
  icon: {
    type: [String, Object] as PropType<string | Component>,
    default: ''
  },
  // 自定义图标 - 未选中状态
  voidIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: ''
  },
  // 禁用状态下未选中图标
  disabledVoidIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: ''
  },
  // 选中颜色
  colors: {
    type: [Array, Object, String] as PropType<string[] | Record<number, string> | string>,
    default: '#F7BA2A'
  },
  // 未选中颜色
  voidColor: {
    type: String,
    default: '#C6D1DE'
  },
  // 禁用状态下未选中颜色
  disabledVoidColor: {
    type: String,
    default: '#EFF2F7'
  },
  showScore: {
    type: Boolean,
    default: false
  },
  showText: {
    type: Boolean,
    default: false
  },
  textColor: {
    type: String,
    default: '#1f2d3d'
  },
  texts: {
    type: Array as PropType<string[]>,
    default: () => ['极差', '失望', '一般', '满意', '惊喜']
  },
  scoreTemplate: {
    type: String,
    default: '{value}'
  },
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default'
  },
  // 清除评分
  clearable: {
    type: Boolean,
    default: false
  }
} as const

export type RateProps = ExtractPropTypes<typeof rateProps>
export const rateEmits = {
  'update:modelValue': (value: number) => typeof value === 'number',
  change: (value: number) => typeof value === 'number'
}
export type RateEmits = typeof rateEmits
