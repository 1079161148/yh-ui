import { createApp } from 'vue'
import App from './App.vue'
import YhUI from '@yh-ui/components'
import '@yh-ui/components/style'

const app = createApp(App)
app.use(YhUI)
app.mount('#app')
