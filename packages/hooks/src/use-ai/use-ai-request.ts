import { ref } from 'vue'

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
export function useAiRequest(options: AiRequestOptions) {
  const loading = ref(false)
  const data = ref('')
  const error = ref<Error | null>(null)

  const send = async (query: string, ...args: unknown[]) => {
    loading.value = true
    error.value = null
    try {
      const result = await options.request(query, ...args)
      data.value = result
      options.onSuccess?.(result)
      return result
    } catch (e: unknown) {
      const err = e instanceof Error ? e : new Error(String(e))
      error.value = err
      options.onError?.(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    data,
    error,
    send
  }
}
