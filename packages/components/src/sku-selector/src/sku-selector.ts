import type { ExtractPropTypes, PropType } from 'vue'

export interface SkuSpecValue {
  id: string | number
  name: string
  image?: string
  disabled?: boolean
  color?: string
  tag?: string
  [key: string]: unknown
}

export interface SkuSpec {
  id: string | number
  name: string
  values: SkuSpecValue[]
  mode?: 'text' | 'image' | 'color'
}

export interface SkuItem {
  id: string | number
  specValueIds: Array<string | number>
  price: number
  stock: number
  marketPrice?: number
  image?: string
  skuNo?: string
  [key: string]: unknown
}

export const skuSelectorProps = {
  specs: {
    type: Array as PropType<SkuSpec[]>,
    default: () => []
  },
  skus: {
    type: Array as PropType<SkuItem[]>,
    default: () => []
  },
  modelValue: {
    type: Array as PropType<Array<string | number>>,
    default: () => []
  },
  checkStock: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  allowUnselect: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default'
  },
  imageSize: {
    type: Number,
    default: 80
  },
  showSelectedSummary: {
    type: Boolean,
    default: false
  },
  summaryPrefix: {
    type: String,
    default: ''
  },
  themeOverrides: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  }
}

export type SkuSelectorProps = ExtractPropTypes<typeof skuSelectorProps>

export const skuSelectorEmits = {
  'update:modelValue': (value: Array<string | number>) => Array.isArray(value),
  change: (_sku: SkuItem | null, _selectedValues: Array<string | number>) => true,
  select: (_spec: SkuSpec, _value: SkuSpecValue) => true
}

export type SkuSelectorEmits = typeof skuSelectorEmits

export interface SkuSelectorSlots {
  summary?: (props: { summary: string; sku: SkuItem | null }) => unknown
  label?: (props: { spec: SkuSpec }) => unknown
  value?: (props: {
    value: SkuSpecValue
    spec: SkuSpec
    active: boolean
    disabled: boolean
  }) => unknown
}
