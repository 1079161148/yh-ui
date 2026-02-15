// 扩展 Vue 全局属性类型
declare module 'vue' {
  interface ComponentCustomProperties {
    /** 消息提示 */
    $message: import('../packages/components/src/message/src/message').MessageFn
    /** 通知 */
    $notify: import('../packages/components/src/notification/src/notification').NotificationFn
    /** 对话框函数式调用 */
    $dialog: import('../packages/components/src/dialog/src/method').DialogMethod
    /** MessageBox 弹窗 */
    $msgbox: import('../packages/components/src/message-box/src/message-box').MessageBoxHandler
    /** 警告弹窗 */
    $alert: import('../packages/components/src/message-box/src/message-box').MessageBoxHandler['alert']
    /** 确认弹窗 */
    $confirm: import('../packages/components/src/message-box/src/message-box').MessageBoxHandler['confirm']
    /** 输入弹窗 */
    $prompt: import('../packages/components/src/message-box/src/message-box').MessageBoxHandler['prompt']
    /** 全局加载服务 */
    $loading: (
      options?: import('../packages/components/src/loading/src/service').LoadingOptions
    ) => import('../packages/components/src/loading/src/service').LoadingInstance
  }
}

export {}
