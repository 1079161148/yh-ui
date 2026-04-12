import { computed, inject, unref, useId as useVueId } from "vue";
const idInjectionKey = Symbol("idInjectionKey");
const useId = (idOverrides) => {
  const injectedId = inject(idInjectionKey, void 0);
  const nativeId = useVueId();
  const id = computed(() => {
    const override = unref(idOverrides);
    if (override) return override;
    const injected = unref(injectedId);
    if (injected) return injected;
    return nativeId;
  });
  return id;
};
const useIdInjection = () => {
  return {
    prefix: computed(() => `yh-${Date.now()}`),
    current: 0
    // No longer using counter
  };
};
export {
  idInjectionKey,
  useId,
  useIdInjection
};
