import { shallowRef } from "vue";
function useCache(key, fetcher) {
  const data = shallowRef(null);
  const execute = async () => {
    try {
      data.value = await fetcher();
    } catch (err) {
      console.error(`[YH-UI] Cache fetcher error for key ${key}:`, err);
    }
  };
  return {
    data,
    execute
  };
}
export {
  useCache
};
