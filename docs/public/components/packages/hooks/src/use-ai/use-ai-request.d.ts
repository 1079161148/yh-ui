export interface AiRequestOptions {
  /**
   * 请求函数
   */
  request: (query: string, ...args: unknown[]) => Promise<string> | string
  onSuccess?: (content: string) => void
  onError?: (err: Error) => void
}
/**
 * useAiRequest - 简单的 AI 非流式请求 Hook
 */
export declare function useAiRequest(options: AiRequestOptions): {
  loading: import('vue').Ref<boolean, boolean>
  data: import('vue').Ref<string, string>
  error: import('vue').Ref<Error | null, Error | null>
  send: (query: string, ...args: unknown[]) => Promise<string>
}
