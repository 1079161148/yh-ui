import { ref, computed, onUnmounted } from 'vue'

export interface CountdownOptions {
  time: number
  interval?: number
  onFinish?: () => void
  onChange?: (current: number) => void
}

/**
 * 倒计时逻辑 Hook
 * @param options
 */
export function useCountdown(options: CountdownOptions) {
  const { time, interval = 1000, onFinish, onChange } = options

  const remain = ref(time)
  const timer = ref<number | null>(null)

  const isRunning = computed(() => timer.value !== null)

  const stop = () => {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }

  const start = () => {
    if (isRunning.value) return
    if (remain.value <= 0) return

    timer.value = setInterval(() => {
      remain.value -= interval
      if (onChange) onChange(remain.value)

      if (remain.value <= 0) {
        remain.value = 0
        stop()
        if (onFinish) onFinish()
      }
    }, interval) as unknown as number
  }

  const reset = (newTime?: number) => {
    stop()
    remain.value = newTime !== undefined ? newTime : time
  }

  onUnmounted(() => {
    stop()
  })

  return {
    remain,
    isRunning,
    start,
    stop,
    reset
  }
}
