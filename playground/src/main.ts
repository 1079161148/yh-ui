import { createApp } from 'vue'
import App from './App.vue'

// 导入主题样式
import '@yh-ui/theme/styles/index.scss'

// 导入组件
import { YhButton } from '@yh-ui/components'

const app = createApp(App)

// 注册组件
app.component('YhButton', YhButton)

app.mount('#app')
