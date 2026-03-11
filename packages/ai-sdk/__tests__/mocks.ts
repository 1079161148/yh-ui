/**
 * YH-UI AI SDK 测试工具和模拟
 */

// 模拟 fetch
export function createMockFetch(
  options: {
    response?: unknown
    error?: Error
    delay?: number
    headers?: Record<string, string>
  } = {}
) {
  return async (url: string | URL | Request, init?: RequestInit) => {
    const { response, error, delay = 0, headers = {} } = options

    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    if (error) {
      throw error
    }

    return {
      ok: true,
      status: 200,
      headers: new Headers(headers),
      json: async () => response || {},
      text: async () => JSON.stringify(response || {}),
      body: response
        ? new ReadableStream({
            start(controller) {
              controller.enqueue(new TextEncoder().encode(JSON.stringify(response)))
              controller.close()
            }
          })
        : null
    } as unknown as Response
  }
}

// 模拟流式响应
export function createMockStreamFetch(
  chunks: string[],
  options: { delay?: number; error?: Error } = {}
) {
  return async () => {
    const { delay = 10, error } = options

    let index = 0
    const readable = new ReadableStream({
      async pull(controller) {
        if (error && index === 0) {
          controller.error(error)
          return
        }

        if (index >= chunks.length) {
          controller.close()
          return
        }

        const chunk = chunks[index++]
        controller.enqueue(
          new TextEncoder().encode(
            `data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`
          )
        )

        if (delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    })

    return {
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'text/event-stream' }),
      body: readable
    } as unknown as Response
  }
}

// 模拟 localStorage
export function createMockStorage() {
  const store = new Map<string, string>()

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear(),
    getStore: () => store
  }
}

// 模拟工具
export const mockTools = {
  getWeather: {
    name: 'get_weather',
    description: '获取城市天气',
    parameters: {
      type: 'object',
      properties: {
        city: { type: 'string', description: '城市名称' }
      },
      required: ['city']
    },
    execute: async (args: { city: string }) => {
      return JSON.stringify({ city: args.city, temp: 25, weather: 'sunny' })
    }
  },

  calculator: {
    name: 'calculator',
    description: '简单计算器',
    parameters: {
      type: 'object',
      properties: {
        expression: { type: 'string', description: '数学表达式' }
      },
      required: ['expression']
    },
    execute: async (args: { expression: string }) => {
      try {
        const result = Function(`"use strict"; return (${args.expression})`)()
        return String(result)
      } catch {
        return 'Error'
      }
    }
  }
}

// 模拟 LLM
export function createMockLLM(response: string) {
  return async (_prompt: string) => response
}

// 等待辅助函数
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
