import type { ExtractPropTypes, PropType, Component, VNode } from 'vue'
import type { FormProps, FormInstance } from './form'
import type { FormItemProps } from './form-item'
import type { FormRule } from './form'

/**
 * FormSchema 字段特殊类型
 */
export type FormSchemaItemType = 'default' | 'divider' | 'text' | 'list'

/**
 * FormSchema 单项配置
 */
export interface FormSchemaItem {
  /** 字段名，支持嵌套路径 (a.b.c) */
  field: string
  /** 标签名 */
  label?: string
  /**
   * 字段渲染类型
   * - 'default'：普通表单项（默认）
   * - 'divider'：分隔线，仅展示 label 作为标题
   * - 'text'：只读文本，直接显示字段值
   * - 'list'：动态列表项，支持增减一组子字段
   */
  type?: FormSchemaItemType
  /**
   * 只读文本 ('text') 为空时的占位符
   * @default '-'
   */
  emptyValue?: string
  /**
   * type 为 'list' 时的表单项 schema 配置
   */
  listSchema?: FormSchemaItem[]
  /**
   * type 为 'list' 时的操作项配置
   */
  listProps?: {
    /** 添加按钮文案 */
    addButtonText?: string
    /** 是否显示删除按钮 @default true */
    allowDelete?: boolean | ((model: Record<string, unknown>, index: number) => boolean)
    /** 是否显示添加按钮 @default true */
    allowAdd?: boolean | ((model: Record<string, unknown>) => boolean)
    /** 最大项数 */
    max?: number
    /** 最小项数 */
    min?: number
  }
  /**
   * 组件名，支持：
   * - 内置简写: 'input' | 'input-number' | 'select' | 'radio' | 'checkbox' |
   *             'switch' | 'slider' | 'rate' | 'cascader' | 'date-picker' | 'upload' 等
   * - 完整组件名: 'yh-input'
   * - Vue 组件对象: MyComponent
   * 当 type 为 'divider' 或 'text' 时可省略
   */
  component?: string | Component
  /**
   * 绑定到组件的 props，支持函数式动态计算
   * @param model 当前表单数据
   */
  props?: Record<string, unknown> | ((model: Record<string, unknown>) => Record<string, unknown>)
  /** 绑定到 form-item 的 props */
  formItemProps?: Partial<FormItemProps>
  /**
   * 校验规则（支持函数式联动，根据 model 返回不同规则）
   * @param model 当前表单数据
   */
  rules?: FormRule[] | ((model: Record<string, unknown>) => FormRule[])
  /**
   * 是否必填（简写，等价于自动添加一条 required: true 的 rule，支持函数式联动）
   * 会在 label/field 缺失时使用 field 名称作为错误提示前缀
   * @param model 当前表单数据
   */
  required?: boolean | ((model: Record<string, unknown>) => boolean)
  /**
   * 是否隐藏（支持函数式联动）
   * @param model 当前表单数据
   */
  hidden?: boolean | ((model: Record<string, unknown>) => boolean)
  /**
   * 是否禁用（支持函数式联动，优先级高于 formProps.disabled）
   * @param model 当前表单数据
   */
  disabled?: boolean | ((model: Record<string, unknown>) => boolean)
  /** 插槽配置（key 为插槽名，value 为组件对象） */
  slots?: Record<string, unknown>
  /**
   * 栅格占位 (1-24)
   * @default 24
   */
  col?: number
  /**
   * 栅格跨度 (grid-column: span x)
   */
  span?: number
  /**
   * 自定义完整渲染函数（优先级低于 field-{name} 具名插槽）
   * @param model 当前表单数据
   */
  render?: (model: Record<string, unknown>) => VNode | Component | null
  /**
   * 异步加载选项（适用于 select/radio/checkbox 等需要远程数据的组件）
   * 会自动注入 loading 状态
   */
  asyncOptions?: () => Promise<Record<string, unknown>[]>
  /**
   * 接收选项数据的 prop 名称
   * @default 'options'
   */
  optionProp?: string
  /**
   * 字段默认值（仅在 localModel 中对应字段为 undefined 时生效）
   */
  defaultValue?: unknown
  /**
   * 字段 tooltip 提示文案（显示在 label 旁边）
   */
  tooltip?: string
}

/**
 * FormSchema 分组配置
 */
export interface FormSchemaGroup {
  /** 分组标题 */
  title?: string
  /** 分组内的表单项 */
  items: FormSchemaItem[]
  /** 绑定到 fieldset 的额外属性 */
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
   * 栅格间距（px）
   * @default 20
   */
  gutter: {
    type: Number,
    default: 20
  }
} as const

export type FormSchemaProps = ExtractPropTypes<typeof formSchemaProps>

/**
 * FormSchema 组件实例 EXPOSE 类型
 */
export interface FormSchemaInstance {
  /** 触发校验，支持指定字段 */
  validate: (
    fields?: string | string[],
    callback?: (isValid: boolean, invalidFields?: Record<string, unknown>) => void
  ) => Promise<boolean>
  /** 重置字段（恢复初始值并清除校验），支持指定字段 */
  resetFields: (fields?: string | string[]) => void
  /** 清除指定字段校验结果 */
  clearValidate: (fields?: string | string[]) => void
  /** 滚动到指定字段 */
  scrollToField: (field: string) => void
  /** 获取当前表单数据快照 */
  getModel: () => Record<string, unknown>
  /** 动态更新单个字段值 */
  setFieldValue: (field: string, val: unknown) => void
  /** 底层 form 实例 */
  formRef: FormInstance | undefined
}
