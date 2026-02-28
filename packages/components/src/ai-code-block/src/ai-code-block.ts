export interface AiCodeBlockProps {
  /**
   * @description 代码语言
   */
  language?: string
  /**
   * @description 代码内容
   */
  code?: string
  /**
   * @description 文件名称
   */
  filename?: string
  /**
   * @description 是否高亮显示
   */
  highlight?: boolean
}

export interface AiCodeBlockEmits {
  (e: 'copy', code: string): void
}
