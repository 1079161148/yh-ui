import type { InjectionKey, Ref } from 'vue';
export declare const idInjectionKey: InjectionKey<Ref<string | undefined>>;
/**
 * useId - 生成唯一 ID
 * @param idOverrides - 可选的自定义 ID 前缀
 * @returns 唯一 ID
 *
 * @example
 * const id = useId() // 'yh-id-1' (or vue native id)
 * const customId = useId(ref('custom')) // 'custom'
 */
export declare const useId: (idOverrides?: Ref<string | undefined>) => Ref<string>;
/**
 * useIdInjection - ID 注入工具
 * @description 用于组件内部生成关联 ID
 */
export declare const useIdInjection: () => {
    prefix: import("vue").ComputedRef<string>;
    current: number;
};
export type UseIdReturn = ReturnType<typeof useId>;
