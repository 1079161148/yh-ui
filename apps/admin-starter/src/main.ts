/*
 * @File name:
 * @Author: 1079161148@qq.com
 * @Version: V1.0
 * @Date: 2026-05-22 22:29:36
 * @Description:
 * Copyright (C) 2024-{year} Tsing Micro Technology Inc All rights reserved.
 */
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import '@yh-ui/yh-ui/css'
import App from '@/App.vue'
import { routes } from '@/router'
import { registerDirectives } from '@/directives'
import { useUserStore } from '@/stores/user'
import { useTabsStore } from '@/stores/tabs'
import '@/styles/app.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
registerDirectives(app)
app.mount('#app')

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth !== false && !userStore.isLoggedIn) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  if (to.name === 'login' && userStore.isLoggedIn) {
    next({ name: 'dashboard' })
    return
  }

  if (to.meta.permission && typeof to.meta.permission === 'string') {
    if (!userStore.hasPermission(to.meta.permission as string)) {
      next({ name: 'forbidden' })
      return
    }
  }

  if (to.meta.requiresAuth !== false && to.name && !to.meta.hidden) {
    const tabsStore = useTabsStore()
    tabsStore.addTab(to)
  }

  next()
})
