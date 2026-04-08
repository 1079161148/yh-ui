import { type AiProviderConfig } from './ai-provider';
/**
 * useAiProvider - 消费 YhAiProvider 注入的全局配置
 *
 * @example
 * ```ts
 * const { baseUrl, token, parser } = useAiProvider()
 * ```
 */
export declare function useAiProvider(): AiProviderConfig;
