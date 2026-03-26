import { describe, it, expect, vi } from 'vitest'
import { useCountdown } from '../index'

describe('useCountdown', () => {
  it('should initialize with the correct time', () => {
    const { remain } = useCountdown({ time: 1000 })
    expect(remain.value).toBe(1000)
  })

  it('should start counting down', async () => {
    vi.useFakeTimers()
    const { remain, start } = useCountdown({ time: 5000, interval: 1000 })

    start()
    expect(remain.value).toBe(5000)

    vi.advanceTimersByTime(1000)
    expect(remain.value).toBe(4000)

    vi.advanceTimersByTime(2000)
    expect(remain.value).toBe(2000)

    vi.useRealTimers()
  })

  it('should stop counting down', async () => {
    vi.useFakeTimers()
    const { remain, start, stop } = useCountdown({ time: 5000, interval: 1000 })

    start()
    vi.advanceTimersByTime(1000)
    expect(remain.value).toBe(4000)

    stop()
    vi.advanceTimersByTime(1000)
    expect(remain.value).toBe(4000)

    vi.useRealTimers()
  })

  it('should call onFinish when countdown reaches zero', async () => {
    vi.useFakeTimers()
    const onFinish = vi.fn()
    const { remain, start } = useCountdown({ time: 2000, interval: 1000, onFinish })

    start()
    vi.advanceTimersByTime(2000)
    expect(remain.value).toBe(0)
    expect(onFinish).toHaveBeenCalled()

    vi.useRealTimers()
  })

  it('should call onChange on each interval', async () => {
    vi.useFakeTimers()
    const onChange = vi.fn()
    const { start } = useCountdown({ time: 3000, interval: 1000, onChange })

    start()
    vi.advanceTimersByTime(1000)
    expect(onChange).toHaveBeenCalledWith(2000)
    vi.advanceTimersByTime(1000)
    expect(onChange).toHaveBeenCalledWith(1000)

    vi.useRealTimers()
  })

  it('should reset the countdown', () => {
    const { remain, reset } = useCountdown({ time: 5000 })
    remain.value = 2000
    reset()
    expect(remain.value).toBe(5000)

    reset(3000)
    expect(remain.value).toBe(3000)
  })

  it('should update isRunning status', async () => {
    vi.useFakeTimers()
    const { isRunning, start, stop } = useCountdown({ time: 5000 })

    expect(isRunning.value).toBe(false)
    start()
    expect(isRunning.value).toBe(true)
    stop()
    expect(isRunning.value).toBe(false)

    vi.useRealTimers()
  })
})
