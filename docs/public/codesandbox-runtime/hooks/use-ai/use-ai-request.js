import { ref } from 'vue'
function useAiRequest(options) {
  const loading = ref(false)
  const data = ref('')
  const error = ref(null)
  const send = async (query, ...args) => {
    var _a, _b
    loading.value = true
    error.value = null
    try {
      const result = await options.request(query, ...args)
      data.value = result
      ;(_a = options.onSuccess) == null ? void 0 : _a.call(options, result)
      return result
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e))
      error.value = err
      ;(_b = options.onError) == null ? void 0 : _b.call(options, err)
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
export { useAiRequest }
