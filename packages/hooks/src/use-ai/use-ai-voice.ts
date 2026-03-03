import { ref, onUnmounted, shallowRef } from 'vue'

// ─── 类型定义 ─────────────────────────────────────────────────────────────────

export interface UseAiVoiceOptions {
  /**
   * 语言代码 (用于 SpeechRecognition)
   * @default 'zh-CN'
   */
  language?: string
  /**
   * 是否需要临时结果（在说话过程中实时返回）
   * @default true
   */
  interimResults?: boolean
  /**
   * 是否连续识别
   * @default false
   */
  continuous?: boolean
  /**
   * 智能静音检测（VAD）
   * 开启后，当检测到长时间无声会自动停止录音
   * @default true
   */
  vad?: boolean
  /**
   * 静音检测阈值 (ms)
   * @default 2000
   */
  vadThreshold?: number
  /**
   * 音量变化敏感度 (0-1)
   * @default 0.05
   */
  volumeThreshold?: number
  /**
   * 返回波形柱的数量（对应 AiVoiceTrigger 的 amplitudes）
   * @default 20
   */
  waveCount?: number
  /**
   * 是否在开始时自动执行浏览器语音识别 (SpeechRecognition)
   * 如果关闭，则只进行物理音频录制
   * @default true
   */
  useSTT?: boolean

  /** 回调事件 */
  onStart?: () => void
  /** 停止回调，包含最终转写文本和录音文件 Blob */
  onStop?: (transcript: string, blob: Blob | null) => void
  onResult?: (transcript: string) => void
  onPartialResult?: (transcript: string) => void
  onError?: (error: unknown) => void
}

// ─── 浏览器语音识别 (Web Speech API) 类型声明 ────────────────────────────────
interface ISpeechRecognitionResult {
  readonly length: number
  readonly isFinal: boolean
  readonly [index: number]: { transcript: string; confidence: number }
}

interface ISpeechRecognitionResultList {
  readonly length: number
  readonly [index: number]: ISpeechRecognitionResult
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number
  readonly results: ISpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string
  readonly message: string
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: (event: SpeechRecognitionEvent) => void
  onerror: (event: SpeechRecognitionErrorEvent) => void
  onstart: (event: Event) => void
  onend: (event: Event) => void
  start: () => void
  stop: () => void
  abort: () => void
}

export interface UseAiVoiceReturn {
  /** 是否正在录音 */
  isRecording: import('vue').Ref<boolean>
  /** 最终转写文本 */
  transcript: import('vue').Ref<string>
  /** 过程中的临时文本 */
  interimTranscript: import('vue').Ref<string>
  /** 实时波形数据 */
  amplitudes: import('vue').Ref<number[]>
  /** 实时音量 (0-100) */
  volume: import('vue').Ref<number>
  /** 录音文件的 Blob */
  audioBlob: import('vue').Ref<Blob | null>
  /** 开始录音 */
  start: () => Promise<void>
  /** 停止录音 */
  stop: () => void
  /** 取消并放弃当前结果 */
  cancel: () => void
  /** 浏览器是否支持 SpeechRecognition (用于显示警告) */
  sttSupported: boolean
}

// ─── Hook 主体 ────────────────────────────────────────────────────────────────

/**
 * useAiVoice - 专业级 AI 语音交互 Hook
 *
 * 核心能力：
 * 1. 【音频录制】：通过 MediaRecorder 真实录制音频并导出 Blob 文件。
 * 2. 【视觉分析】：通过 Web Audio API 实时输出驱动 AiVoiceTrigger 的波形数组。
 * 3. 【智能 VAD】：多维检测静音状态，支持自动停顿结束。
 * 4. 【语音转写】：内置 Web Speech API 实时转写及临时结果反馈。
 */
export function useAiVoice(options: UseAiVoiceOptions = {}): UseAiVoiceReturn {
  const {
    language = 'zh-CN',
    interimResults = true,
    continuous = false,
    vad = true,
    vadThreshold = 2000,
    volumeThreshold = 0.05,
    waveCount = 20,
    useSTT = true
  } = options

  // 状态
  const isRecording = ref(false)
  const transcript = ref('')
  const interimTranscript = ref('')
  const volume = ref(0)
  const amplitudes = ref<number[]>(new Array(waveCount).fill(5))
  const audioBlob = ref<Blob | null>(null)

  // 内部实例
  const recognition = shallowRef<ISpeechRecognition | null>(null)
  const audioContext = shallowRef<AudioContext | null>(null)
  const analyser = shallowRef<AnalyserNode | null>(null)
  const stream = shallowRef<MediaStream | null>(null)
  const mediaRecorder = shallowRef<MediaRecorder | null>(null)

  let chunks: Blob[] = []
  let animationId: number | null = null
  let silenceStart: number | null = null

  // STT 支持检查
  const _window =
    typeof window !== 'undefined'
      ? (window as unknown as {
          SpeechRecognition: new () => ISpeechRecognition
          webkitSpeechRecognition: new () => ISpeechRecognition
          AudioContext: typeof AudioContext
          webkitAudioContext: typeof AudioContext
        })
      : null
  const SpeechRecognition = _window?.SpeechRecognition || _window?.webkitSpeechRecognition
  const sttSupported = !!SpeechRecognition

  // ── 1. 初始化物理录音机 (MediaRecorder) ───────────────────────────────────
  const initMediaRecorder = (mediaStream: MediaStream) => {
    chunks = []
    const recorder = new MediaRecorder(mediaStream)

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data)
    }

    recorder.onstop = () => {
      const blob = chunks.length > 0 ? new Blob(chunks, { type: 'audio/webm' }) : null
      audioBlob.value = blob
      // 仅在非取消的情况下（isRecording 变为 false 且不是 abort 触发）响应业务回调
      // 此时 transcript 可能已经有值了
      if (!isRecording.value) {
        options.onStop?.(transcript.value, blob)
      }
    }

    mediaRecorder.value = recorder
  }

  // ── 2. 初始化语音转写 (STT) ──────────────────────────────────────────────
  const initRecognition = () => {
    if (!sttSupported || !useSTT) return
    const recognitionInstance = new SpeechRecognition()
    recognitionInstance.lang = language
    recognitionInstance.interimResults = interimResults
    recognitionInstance.continuous = continuous

    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      let currentInterim = ''
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcript.value += event.results[i][0].transcript
          options.onResult?.(transcript.value)
        } else {
          currentInterim += event.results[i][0].transcript
        }
      }
      interimTranscript.value = currentInterim
      options.onPartialResult?.(currentInterim)
    }

    recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
      // 忽略因静音导致的 no-speech 错误，它是正常的
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        options.onError?.(event)
      }
    }

    recognition.value = recognitionInstance
  }

  // ── 3. 初始化音频分析器 (Web Audio API) ─────────────────────────────────
  const initAudioAnalyzer = async (mediaStream: MediaStream) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioContext.value = new AudioCtx()

      // 关键！在某些浏览器必须在 resume 后才能产生有效读数
      if (audioContext.value.state === 'suspended') {
        await audioContext.value.resume()
      }

      analyser.value = audioContext.value.createAnalyser()
      analyser.value.fftSize = 256

      const source = audioContext.value.createMediaStreamSource(mediaStream)
      source.connect(analyser.value)

      const bufferLength = analyser.value.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const process = () => {
        if (!isRecording.value) {
          // 停止时重置波纹
          amplitudes.value = new Array(waveCount).fill(5)
          volume.value = 0
          return
        }

        animationId = requestAnimationFrame(process)
        analyser.value!.getByteFrequencyData(dataArray)

        // (1) 总音量计算
        let total = 0
        for (let i = 0; i < bufferLength; i++) total += dataArray[i]
        const avg = total / bufferLength
        volume.value = Math.min(100, (avg / 128) * 100)

        // (2) 映射波形数据 (Amplitudes)
        const step = Math.floor(bufferLength / waveCount)
        const newAmps = []
        for (let i = 0; i < waveCount; i++) {
          const val = dataArray[i * step]
          // 加上基础高度，确保静音时也有微弱波纹感
          newAmps.push(6 + (val / 255) * 34)
        }
        amplitudes.value = newAmps

        // (3) VAD 逻辑：检测静音自动停止
        if (vad) {
          const normalizedVol = avg / 255
          if (normalizedVol < volumeThreshold) {
            if (silenceStart === null) silenceStart = Date.now()
            else if (Date.now() - silenceStart > vadThreshold) {
              stop()
            }
          } else {
            silenceStart = null
          }
        }
      }

      process()
    } catch (err) {
      options.onError?.(err)
    }
  }

  // ── 4. API 导出函数 ─────────────────────────────────────────────────────
  const start = async () => {
    // 改为检查 stream 是否存在，因为 v-model 可能已经提前把 isRecording 置为 true 了
    if (stream.value) return

    try {
      transcript.value = ''
      interimTranscript.value = ''
      audioBlob.value = null
      silenceStart = null

      // 1. 获取音视频流（必须在用户点击的回调中由于安全限制）
      stream.value = await navigator.mediaDevices.getUserMedia({ audio: true })

      // 2. 标记状态
      isRecording.value = true

      // 3. 多路引擎分步启动
      initMediaRecorder(stream.value!)
      initRecognition()
      await initAudioAnalyzer(stream.value!)

      mediaRecorder.value?.start(1000) // 1s 分片，确保长录音稳定性
      recognition.value?.start()

      options.onStart?.()
    } catch (err: unknown) {
      isRecording.value = false
      if (stream.value) {
        stream.value.getTracks().forEach((t) => t.stop())
        stream.value = null
      }
      console.error('[yh-ui/hooks] useAiVoice start failed:', err)
      options.onError?.(err)
    }
  }

  const stop = () => {
    // 改为检查 stream 是否存在，因为 v-model 可能已经提前把 isRecording 置为 false 了
    if (!stream.value) return
    isRecording.value = false

    if (mediaRecorder.value && mediaRecorder.value.state !== 'inactive') {
      try {
        mediaRecorder.value.stop()
      } catch {}
    }

    if (recognition.value) {
      try {
        recognition.value.stop()
      } catch {}
    }

    // 停止所有音频轨道以关闭浏览器话筒图标
    if (stream.value) {
      stream.value.getTracks().forEach((track) => track.stop())
      stream.value = null
    }

    cleanup()
  }

  const cancel = () => {
    // 改为检查 stream 是否存在，防止 v-model 已同步修改 isRecording
    if (!isRecording.value && !stream.value) return
    isRecording.value = false

    if (recognition.value) {
      try {
        recognition.value.abort()
      } catch {}
    }

    if (mediaRecorder.value && mediaRecorder.value.state !== 'inactive') {
      try {
        mediaRecorder.value.stop()
      } catch {}
    }

    if (stream.value) {
      stream.value.getTracks().forEach((track) => track.stop())
      stream.value = null
    }

    cleanup()
  }

  const cleanup = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }

    if (audioContext.value && audioContext.value.state !== 'closed') {
      audioContext.value.close().catch((_err: unknown) => {})
      audioContext.value = null
    }

    // 重置视觉状态
    amplitudes.value = new Array(waveCount).fill(5)
    volume.value = 0
  }

  onUnmounted(() => {
    if (isRecording.value) stop()
    else cleanup()
  })

  return {
    isRecording,
    transcript,
    interimTranscript,
    amplitudes,
    volume,
    audioBlob,
    start,
    stop,
    cancel,
    sttSupported
  }
}
