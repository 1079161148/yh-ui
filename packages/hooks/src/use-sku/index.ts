import { ref, computed } from 'vue'

export interface SkuSpec {
  id: string | number
  name: string
  values: SkuSpecValue[]
}

export interface SkuSpecValue {
  id: string | number
  name: string
  [key: string]: unknown
}

export interface SkuItem {
  id: string | number
  specValueIds: Array<string | number>
  price: number
  stock: number
  [key: string]: unknown
}

/**
 * SKU 核心选择逻辑 Hook
 * @description 基于幂集 (Power Set) 算法实现规格项状态联动和库存检查
 * @param specs 规格列表
 * @param skus SKU 列表
 * @param initialSelection 初始选中的 ID
 */
export function useSKU(
  specs: SkuSpec[],
  skus: SkuItem[],
  initialSelection: Array<string | number> = []
) {
  const selectedValueIds = ref<(string | number)[]>(initialSelection)

  // 1. 生成路径字典 (Path Dictionary)
  // 键为选中的 ID 组合（如 "1,2"），值为库存或 SKU 对象
  const pathDict = computed(() => {
    const dict: Record<string, number> = {}

    skus.forEach((sku) => {
      if (sku.stock <= 0) return

      // 生成当前 SKU 的所有子集组合作为路径
      const powerSet = getPowerSet(sku.specValueIds)
      powerSet.forEach((path) => {
        const key = path.join(',')
        dict[key] = (dict[key] || 0) + sku.stock
      })
    })

    return dict
  })

  // 2. 检查选中的 ID 是否导致规格项失效
  const isValueSelectable = (specIndex: number, valueId: string | number) => {
    const tempSelected = [...selectedValueIds.value]

    // 模拟点击后的选中结果
    if (tempSelected[specIndex] === valueId) {
      tempSelected[specIndex] = ''
    } else {
      tempSelected[specIndex] = valueId
    }

    // 过滤掉空的选项并排序，确保与路径字典 Key 对应
    const query = tempSelected
      .filter((v) => !!v)
      .sort((a, b) => String(a).localeCompare(String(b)))
      .join(',')

    if (!query) return true

    // 如果路径字典中存在该组合，说明有库存可选
    return !!pathDict.value[query]
  }

  // 切换选中
  const toggleValue = (specIndex: number, valueId: string | number) => {
    if (selectedValueIds.value[specIndex] === valueId) {
      selectedValueIds.value[specIndex] = ''
    } else {
      selectedValueIds.value[specIndex] = valueId
    }
  }

  // 获取当前选中的完整 SKU 对象
  const selectedSku = computed(() => {
    // 必须要所有规格都选了才算完整 SKU
    const completeSelection = selectedValueIds.value.every((v) => !!v)
    if (!completeSelection || selectedValueIds.value.length < specs.length) return null

    const targetKey = [...selectedValueIds.value]
      .sort((a, b) => String(a).localeCompare(String(b)))
      .join(',')
    return (
      skus.find(
        (sku) =>
          [...sku.specValueIds].sort((a, b) => String(a).localeCompare(String(b))).join(',') ===
          targetKey
      ) || null
    )
  })

  // 工具函数：获取幂集（不含空集）
  function getPowerSet(arr: (string | number)[]) {
    const result: (string | number)[][] = [[]]
    for (const item of arr) {
      const size = result.length
      for (let i = 0; i < size; i++) {
        result.push([...result[i], item])
      }
    }
    // 过滤掉空集并对每个集进行排序保证 Key 唯一
    return result
      .filter((v) => v.length > 0)
      .map((v) => [...v].sort((a, b) => String(a).localeCompare(String(b))))
  }

  return {
    selectedValueIds,
    isValueSelectable,
    selectedSku,
    toggleValue
  }
}
