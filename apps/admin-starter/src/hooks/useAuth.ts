import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

export function useAuth() {
  const userStore = useUserStore()

  const hasAdminRole = computed(() => userStore.role === 'admin')

  function can(permission: string): boolean {
    return userStore.hasPermission(permission)
  }

  function canAny(permissions: string[]): boolean {
    return permissions.some((p) => userStore.hasPermission(p))
  }

  function canAll(permissions: string[]): boolean {
    return permissions.every((p) => userStore.hasPermission(p))
  }

  return {
    isLoggedIn: computed(() => userStore.isLoggedIn),
    userInfo: computed(() => userStore.userInfo),
    role: computed(() => userStore.role),
    permissions: computed(() => userStore.permissions),
    hasAdminRole,
    can,
    canAny,
    canAll
  }
}
