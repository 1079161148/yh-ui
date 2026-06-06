import { ref, onUnmounted } from 'vue'
import type { Ref } from 'vue'

interface FullscreenResult {
  isFullscreen: Ref<boolean>
  enter: () => Promise<void>
  exit: () => Promise<void>
  toggle: () => Promise<void>
}

export function useFullscreen(): FullscreenResult {
  const isFullscreen = ref(!!document.fullscreenElement)

  function handleChange() {
    isFullscreen.value = !!document.fullscreenElement
  }

  document.addEventListener('fullscreenchange', handleChange)

  async function enter() {
    if (!isFullscreen.value) {
      await document.documentElement.requestFullscreen()
    }
  }

  async function exit() {
    if (isFullscreen.value) {
      await document.exitFullscreen()
    }
  }

  async function toggle() {
    if (isFullscreen.value) {
      await exit()
    } else {
      await enter()
    }
  }

  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', handleChange)
  })

  return { isFullscreen, enter, exit, toggle }
}
