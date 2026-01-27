import { Loading } from './src/service'
import { vLoading } from './src/directive'
import type { App } from 'vue'

export const YhLoading = {
  ...Loading,
  directive: vLoading,
  install(app: App) {
    app.config.globalProperties.$loading = Loading.service
    app.directive('yh-loading', vLoading)
  }
}

// 供 script setup 自动识别的导出命名约定
export const vYhLoading = vLoading

export default YhLoading

export * from './src/service'
export * from './src/directive'
import './src/loading.scss'
