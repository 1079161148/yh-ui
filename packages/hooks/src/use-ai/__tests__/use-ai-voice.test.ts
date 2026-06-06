import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useAiVoice, type UseAiVoiceOptions } from '../use-ai-voice'

// ─── Mocks ───────────────────────────────────────────────────────────────────

let lastMediaRecorder: MockMediaRecorder
let lastRecognition: MockSpeechRecognition

class MockMediaRecorder {
  state = 'inactive'
  onstop: any = null
  ondataavailable: any = null
  constructor() {
    lastMediaRecorder = this as any
  }
  start = vi.fn((timeslice?: number) => {
    this.state = 'recording'
  })
  stop = vi.fn(() => {
    this.state = 'inactive'
    if (this.onstop) this.onstop()
  })
}

class MockAudioContext {
  state = 'suspended'
  resume = vi.fn().mockResolvedValue(undefined)
  close = vi.fn().mockResolvedValue(undefined)
  createAnalyser = vi.fn(() => ({
    fftSize: 0,
    frequencyBinCount: 128,
    connect: vi.fn(),
    getByteFrequencyData: vi.fn()
  }))
  createMediaStreamSource = vi.fn(() => ({
    connect: vi.fn()
  }))
}

class MockSpeechRecognition {
  lang = ''
  interimResults = false
  continuous = false
  onresult: any = null
  onstart: any = null
  onend: any = null
  onerror: any = null
  constructor() {
    lastRecognition = this as any
  }
  start = vi.fn()
  stop = vi.fn()
  abort = vi.fn()
}

// Helper to test hook
function mountAiVoice(options: UseAiVoiceOptions = {}) {
  let result: any
  mount(
    defineComponent({
      setup() {
        result = useAiVoice(options)
        return () => null
      }
    })
  )
  return result
}

describe('useAiVoice', () => {
  beforeEach(() => {
    vi.stubGlobal('MediaRecorder', MockMediaRecorder)
    vi.stubGlobal('AudioContext', MockAudioContext)
    vi.stubGlobal('SpeechRecognition', MockSpeechRecognition)
    vi.stubGlobal('webkitSpeechRecognition', MockSpeechRecognition)
    vi.stubGlobal(
      'Blob',
      class {
        constructor(parts: any, options: any) {}
      }
    )

    // Mock navigator.mediaDevices
    Object.defineProperty(global.navigator, 'mediaDevices', {
      value: {
        getUserMedia: vi.fn().mockResolvedValue({
          getTracks: () => [{ stop: vi.fn() }]
        })
      },
      writable: true,
      configurable: true
    })

    vi.stubGlobal('requestAnimationFrame', vi.fn())
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should initialize with default states', () => {
    const { isRecording, transcript, amplitudes, volume, sttSupported } = mountAiVoice()
    expect(isRecording.value).toBe(false)
    expect(transcript.value).toBe('')
    expect(amplitudes.value.length).toBe(20)
    expect(volume.value).toBe(0)
    expect(sttSupported).toBe(true)
  })

  it('should start recording', async () => {
    const onStart = vi.fn()
    const { start, isRecording } = mountAiVoice({ onStart })

    await start()
    expect(isRecording.value).toBe(true)
    expect(onStart).toHaveBeenCalled()
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ audio: true })
    expect(lastMediaRecorder).toBeDefined()
    expect(lastRecognition).toBeDefined()
  })

  it('should stop recording and handle onstop', async () => {
    const onStop = vi.fn()
    const { start, stop, isRecording, transcript } = mountAiVoice({ onStop })

    await start()
    transcript.value = 'hello world'
    stop()
    expect(isRecording.value).toBe(false)

    // Trigger mediaRecorder onstop
    lastMediaRecorder.onstop()
    expect(onStop).toHaveBeenCalledWith('hello world', expect.any(Object))
  })

  it('should handle cancel', async () => {
    const { start, cancel, isRecording } = mountAiVoice()
    await start()
    cancel()
    expect(isRecording.value).toBe(false)
    expect(lastRecognition.abort).toHaveBeenCalled()
  })

  it('should handle speech recognition results', async () => {
    const onResult = vi.fn()
    const { start, transcript, interimTranscript } = mountAiVoice({ onResult })
    await start()

    // Simulate final result
    lastRecognition.onresult({
      resultIndex: 0,
      results: [{ isFinal: true, 0: { transcript: 'hello' } }]
    } as any)

    expect(transcript.value).toBe('hello')
    expect(onResult).toHaveBeenCalledWith('hello')

    // Simulate interim result
    lastRecognition.onresult({
      resultIndex: 1,
      results: [
        { isFinal: true, 0: { transcript: 'hello' } },
        { isFinal: false, 0: { transcript: ' world' } }
      ]
    } as any)

    expect(interimTranscript.value).toBe(' world')
  })

  it('should handle recognition errors', async () => {
    const onError = vi.fn()
    const { start } = mountAiVoice({ onError })
    await start()

    lastRecognition.onerror({ error: 'network', message: 'err' } as any)
    expect(onError).toHaveBeenCalled()
  })
})
