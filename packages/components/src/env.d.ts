declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

// Vite 的 ?worker 导入（Monaco Editor 在文档/playground 中需要，避免 Worker 请求到 text/html）
declare module '*?worker' {
  const WorkerFactory: new () => Worker
  export default WorkerFactory
}
