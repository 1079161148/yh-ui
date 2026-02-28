export type AiThinkingStatus = 'start' | 'thinking' | 'end' | 'error'

export interface AiThinkingProps {
  /**
   * @description 思考状态
   */
  status?: AiThinkingStatus
  /**
   * @description 思考标题
   */
  title?: string
  /**
   * @description 思考详情内容
   */
  content?: string
  /**
   * @description 是否展开详情 (v-model)
   */
  modelValue?: boolean
  /**
   * @description 完成后是否自动收起
   */
  autoCollapse?: boolean
}

export interface AiThinkingEmits {
  (e: 'update:modelValue', value: boolean): void
}
