import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createYhUI, en } from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css'
import App from './App.vue'
import { routes } from './router'
import './styles/app.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const app = createApp(App)

app.use(router)
app.use(createYhUI({ locale: en }))

app.mount('#app')
