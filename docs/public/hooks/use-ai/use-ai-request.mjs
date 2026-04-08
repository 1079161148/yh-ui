import { ref } from "vue";
export function useAiRequest(options) {
  const loading = ref(false);
  const data = ref("");
  const error = ref(null);
  const send = async (query, ...args) => {
    loading.value = true;
    error.value = null;
    try {
      const result = await options.request(query, ...args);
      data.value = result;
      options.onSuccess?.(result);
      return result;
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      error.value = err;
      options.onError?.(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  return {
    loading,
    data,
    error,
    send
  };
}
