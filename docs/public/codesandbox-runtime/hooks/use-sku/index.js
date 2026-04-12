import { ref, computed } from "vue";
function useSKU(specs, skus, initialSelection = []) {
  const selectedValueIds = ref(initialSelection);
  const pathDict = computed(() => {
    const dict = {};
    skus.forEach((sku) => {
      if (sku.stock <= 0) return;
      const powerSet = getPowerSet(sku.specValueIds);
      powerSet.forEach((path) => {
        const key = path.join(",");
        dict[key] = (dict[key] || 0) + sku.stock;
      });
    });
    return dict;
  });
  const isValueSelectable = (specIndex, valueId) => {
    const tempSelected = [...selectedValueIds.value];
    if (tempSelected[specIndex] === valueId) {
      tempSelected[specIndex] = "";
    } else {
      tempSelected[specIndex] = valueId;
    }
    const query = tempSelected.filter((v) => !!v).sort((a, b) => String(a).localeCompare(String(b))).join(",");
    if (!query) return true;
    return !!pathDict.value[query];
  };
  const toggleValue = (specIndex, valueId) => {
    if (selectedValueIds.value[specIndex] === valueId) {
      selectedValueIds.value[specIndex] = "";
    } else {
      selectedValueIds.value[specIndex] = valueId;
    }
  };
  const selectedSku = computed(() => {
    const completeSelection = selectedValueIds.value.every((v) => !!v);
    if (!completeSelection || selectedValueIds.value.length < specs.length) return null;
    const targetKey = [...selectedValueIds.value].sort((a, b) => String(a).localeCompare(String(b))).join(",");
    return skus.find(
      (sku) => [...sku.specValueIds].sort((a, b) => String(a).localeCompare(String(b))).join(",") === targetKey
    ) || null;
  });
  function getPowerSet(arr) {
    const result = [[]];
    for (const item of arr) {
      const size = result.length;
      for (let i = 0; i < size; i++) {
        result.push([...result[i], item]);
      }
    }
    return result.filter((v) => v.length > 0).map((v) => [...v].sort((a, b) => String(a).localeCompare(String(b))));
  }
  return {
    selectedValueIds,
    isValueSelectable,
    selectedSku,
    toggleValue
  };
}
export {
  useSKU
};
