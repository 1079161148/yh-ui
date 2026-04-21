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
/**
 * useAiVoice - 专业级 AI 语音交互 Hook
 *
 * 核心能力：
 * 1. 【音频录制】：通过 MediaRecorder 真实录制音频并导出 Blob 文件。
 * 2. 【视觉分析】：通过 Web Audio API 实时输出驱动 AiVoiceTrigger 的波形数组。
 * 3. 【智能 VAD】：多维检测静音状态，支持自动停顿结束。
 * 4. 【语音转写】：内置 Web Speech API 实时转写及临时结果反馈。
 */
export declare function useAiVoice(options?: UseAiVoiceOptions): UseAiVoiceReturn
