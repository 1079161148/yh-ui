import { ref } from 'vue'

export interface AiStreamOptions {
  /**
   * Request adapter, returns an AsyncGenerator or native fetch promise returning Response.
   */
  request: (
    query: string,
    ...args: unknown[]
  ) =>
    | Promise<Response | AsyncGenerator<string, void, unknown>>
    | AsyncGenerator<string, void, unknown>
  onUpdate?: (content: string) => void
  onFinish?: (content: string) => void
  onError?: (err: Error) => void
}

/**
 * Headless Hook for AI Streams
 * Handles Server Sent Events (SSE) or AsyncGenerators parsing.
 */
export function useAiStream(options: AiStreamOptions) {
  const isStreaming = ref(false)
  const currentContent = ref('')
  let abortController = new AbortController()

  const stop = () => {
    if (isStreaming.value) {
      abortController.abort()
      isStreaming.value = false
    }
  }

  const fetchStream = async (query: string, ...args: unknown[]) => {
    isStreaming.value = true
    currentContent.value = ''
    abortController = new AbortController()

    try {
      const response = await options.request(query, ...args)

      // If AsyncGenerator
      if (typeof response === 'object' && response !== null && Symbol.asyncIterator in response) {
        for await (const chunk of response as AsyncGenerator<string, void, unknown>) {
          if (abortController.signal.aborted) break
          currentContent.value += chunk
          options.onUpdate?.(currentContent.value)
        }
      }
      // If standard fetch response
      else if (response instanceof Response && response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')
        while (true) {
          if (abortController.signal.aborted) {
            reader.cancel()
            break
          }
          const { done, value } = await reader.read()
          if (done) break

          const chunkStr = decoder.decode(value, { stream: true })
          currentContent.value += chunkStr
          options.onUpdate?.(currentContent.value)
        }
      }

      if (!abortController.signal.aborted) {
        isStreaming.value = false
        options.onFinish?.(currentContent.value)
      }
    } catch (e: unknown) {
      if ((e as Error).name !== 'AbortError') {
        options.onError?.(e as Error)
      }
      isStreaming.value = false
    }
  }

  return {
    isStreaming,
    currentContent,
    fetchStream,
    stop
  }
}
