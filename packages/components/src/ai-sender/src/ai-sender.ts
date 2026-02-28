export interface AiSenderProps {
  /**
   * @description 输入框内容
   */
  modelValue?: string
  /**
   * @description 是否禁用
   */
  disabled?: boolean
  /**
   * @description 是否加载中
   */
  loading?: boolean
  /**
   * @description 提示词
   */
  placeholder?: string
  /**
   * @description 是否可清空
   */
  clearable?: boolean
  /**
   * @description 最大输入长度
   */
  maxLength?: number
  /**
   * @description 显示字数统计
   */
  showWordLimit?: boolean
}

export interface AiSenderEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'send', value: string): void
  (e: 'change', value: string): void
  (e: 'clear'): void
}
