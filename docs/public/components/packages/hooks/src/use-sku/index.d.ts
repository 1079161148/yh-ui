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
export declare function useSKU(
  specs: SkuSpec[],
  skus: SkuItem[],
  initialSelection?: Array<string | number>
): {
  selectedValueIds: import('vue').Ref<(string | number)[], (string | number)[]>
  isValueSelectable: (specIndex: number, valueId: string | number) => boolean
  selectedSku: import('vue').ComputedRef<SkuItem | null>
  toggleValue: (specIndex: number, valueId: string | number) => void
}
