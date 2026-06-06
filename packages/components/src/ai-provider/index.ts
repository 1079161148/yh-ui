import { withInstall } from '@yh-ui/utils'
import AiProvider from './src/ai-provider.vue'

export const YhAiProvider = withInstall(AiProvider)
export default YhAiProvider

export * from './src/ai-provider'
export * from './src/use-ai-provider'

export type AiProviderInstance = InstanceType<typeof AiProvider>
export type YhAiProviderInstance = AiProviderInstance
export type YhAiProviderProps = import('./src/ai-provider').AiProviderProps
export type YhAiProviderSlots = import('./src/ai-provider').AiProviderSlots
export type YhAiProviderExpose = import('./src/ai-provider').AiProviderExpose
export type YhAiProviderConfig = import('./src/ai-provider').AiProviderConfig
export type YhAiRequestInterceptor = import('./src/ai-provider').AiRequestInterceptor
export type YhAiResponseInterceptor = import('./src/ai-provider').AiResponseInterceptor
export type YhAiRequestConfig = import('./src/ai-provider').AiRequestConfig
export type YhAiResponse<T = unknown> = import('./src/ai-provider').AiResponse<T>
export type YhAiInterceptorManager<T> = import('./src/ai-provider').AiInterceptorManager<T>
