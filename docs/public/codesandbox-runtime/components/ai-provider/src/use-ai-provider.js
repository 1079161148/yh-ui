import { inject } from 'vue'
import { AI_PROVIDER_KEY } from './ai-provider-meta.js'
function useAiProvider() {
  return inject(AI_PROVIDER_KEY, {})
}
export { useAiProvider }
