/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

// 扩展 Vue 全局属性类型
declare module 'vue' {
  import type { MessageFn } from '@yh-ui/components/message'
  import type { NotificationFn } from '@yh-ui/components/notification'

  interface ComponentCustomProperties {
    $message: MessageFn
    $notify: NotificationFn
  }
}
