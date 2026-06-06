import { createApp } from 'vue'
import App from './App.vue'
import YhUI, { YhMessage, YhNotification } from '@yh-ui/components'
import { Flow } from '@yh-ui/flow'
import '@yh-ui/theme/styles/index.scss'

const app = createApp(App)

app.use(YhUI)
app.component('YhFlow', Flow)

app.config.globalProperties.$message = YhMessage
app.config.globalProperties.$notify = YhNotification

app.mount('#app')
