import { inject } from "vue";
import { AI_PROVIDER_KEY } from "./ai-provider.mjs";
export function useAiProvider() {
  return inject(AI_PROVIDER_KEY, {});
}
