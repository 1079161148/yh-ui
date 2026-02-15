/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  const component: DefineComponent<{}, {}>
  export default component
}

declare module '*.scss' {
  const content: Record<string, string>
  export default content
}
