import { inject } from 'vue'
import { AI_PROVIDER_KEY, type AiProviderConfig } from './ai-provider'

/**
 * useAiProvider - 消费 YhAiProvider 注入的全局配置
 *
 * @example
 * ```ts
 * const { baseUrl, token, parser } = useAiProvider()
 * ```
 */
export function useAiProvider(): AiProviderConfig {
  return inject(AI_PROVIDER_KEY, {})
}
