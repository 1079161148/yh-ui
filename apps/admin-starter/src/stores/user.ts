import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const DEFAULT_AVATAR_LOGO_TEXT = 'YH'
export const DEFAULT_ADMIN_AVATAR = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="96" height="96" rx="24" fill="url(#bg)"/>
      <circle cx="48" cy="34" r="14" fill="white" fill-opacity="0.92"/>
      <path d="M24 78C24 64.7452 34.7452 54 48 54C61.2548 54 72 64.7452 72 78V80H24V78Z" fill="white" fill-opacity="0.92"/>
      <defs>
        <linearGradient id="bg" x1="10" y1="8" x2="84" y2="88" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1677FF"/>
          <stop offset="1" stop-color="#69B1FF"/>
        </linearGradient>
      </defs>
    </svg>
  `)}`

interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  permissions: string[]
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem('admin_token') || '')
  const userInfo = ref<UserInfo | null>(null)

  const isLoggedIn = computed(() => !!token.value)
  const role = computed(() => userInfo.value?.role || 'admin')
  const permissions = computed(() => userInfo.value?.permissions || [])

  function hasPermission(perm: string): boolean {
    if (role.value === 'admin') return true
    return permissions.value.includes(perm)
  }

  function setToken(t: string) {
    token.value = t
    localStorage.setItem('admin_token', t)
  }

  function setUserInfo(info: UserInfo) {
    userInfo.value = info
  }

  function clearUser() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('admin_token')
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    role,
    permissions,
    hasPermission,
    setToken,
    setUserInfo,
    clearUser
  }
})
