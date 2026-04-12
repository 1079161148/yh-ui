const aiCodeRunnerProps = {
  /**
   * @description 代码语言
   */
  language: {
    type: String,
    default: 'javascript'
  },
  /**
   * @description 代码内容
   */
  code: {
    type: String,
    default: ''
  },
  /**
   * @description 终端高度
   */
  height: {
    type: [String, Number],
    default: 200
  },
  /**
   * @description 是否自动运行
   */
  autorun: {
    type: Boolean,
    default: false
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
const aiCodeRunnerEmits = {
  run: (code) => typeof code === 'string',
  stop: () => true,
  output: (data) => typeof data === 'string',
  error: (error) => typeof error === 'string',
  ready: (instance) => !!instance
}
export { aiCodeRunnerEmits, aiCodeRunnerProps }
