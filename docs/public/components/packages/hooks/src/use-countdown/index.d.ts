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
export declare function useCountdown(options: CountdownOptions): {
  remain: import('vue').Ref<number, number>
  isRunning: import('vue').ComputedRef<boolean>
  start: () => void
  stop: () => void
  reset: (newTime?: number) => void
}
