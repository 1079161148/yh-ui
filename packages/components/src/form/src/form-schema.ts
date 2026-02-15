import type { ExtractPropTypes, PropType, Component } from 'vue'
import type { FormProps } from './form'
import type { FormItemProps } from './form-item'
import type { FormRule } from './form'

/**
 * FormSchema 单项配置
 */
export interface FormSchemaItem {
  /** 字段名 */
  field: string
  /** 标签名 */
  label?: string
  /** 组件名，支持 yh-input 等字符串或原生组件对象 */
  component: string | Component
  /** 绑定到组件的 props */
  props?: Record<string, unknown> | ((model: Record<string, unknown>) => Record<string, unknown>)
  /** 绑定到 form-item 的 props */
  formItemProps?: Partial<FormItemProps>
  /** 校验规则 */
  rules?: FormRule[]
  /** 是否必填 */
  required?: boolean
  /** 是否隐藏 */
  hidden?: boolean | ((model: Record<string, unknown>) => boolean)
  /** 插槽配置 */
  slots?: Record<string, unknown>
  /** 栅格占位 (1-24) */
  col?: number
  /** 自定义渲染函数 */
  render?: (model: Record<string, unknown>) => Component
  /** 异步加载选项配置 */
  asyncOptions?: () => Promise<Record<string, unknown>[]>
  /** 接收选项数据的属性名，默认 options */
  optionProp?: string
}

/**
 * FormSchema 分组配置
 */
export interface FormSchemaGroup {
  /** 分组标题 */
  title?: string
  /** 分组内的表单项 */
  items: FormSchemaItem[]
  /** 分组绑定的额外属性 */
  props?: Record<string, unknown>
  /** 是否可折叠 */
  collapsible?: boolean
  /** 默认是否折叠 */
  collapsed?: boolean
}

export type FormSchema = (FormSchemaItem | FormSchemaGroup)[]

export const formSchemaProps = {
  /**
   * 表单数据对象 (v-model)
   */
  modelValue: {
    type: Object as PropType<Record<string, unknown>>,
    required: true
  },
  /**
   * 表单配置列表
   */
  schema: {
    type: Array as PropType<FormSchema>,
    required: true,
    default: () => []
  },
  /**
   * 透传给 YhForm 的属性
   */
  formProps: {
    type: Object as PropType<Partial<FormProps>>,
    default: () => ({})
  },
  /**
   * 栅格间隔
   */
  gutter: {
    type: Number,
    default: 20
  }
} as const

export type FormSchemaProps = ExtractPropTypes<typeof formSchemaProps>
