import type { InjectionKey, Ref } from 'vue';
export declare const defaultNamespace = "yh";
export declare const namespaceContextKey: InjectionKey<Ref<string>>;
/**
 * 获取全局命名空间
 */
export declare const useGlobalNamespace: () => Ref<string, string>;
/**
 * useNamespace - 生成 BEM 类名
 * @param block - 块名称
 * @returns BEM 类名生成器
 *
 * @example
 * const ns = useNamespace('button')
 * ns.b() // 'yh-button'
 * ns.e('icon') // 'yh-button__icon'
 * ns.m('primary') // 'yh-button--primary'
 * ns.is('disabled') // 'is-disabled'
 * ns.bem('box', 'item', 'active') // 'yh-button-box__item--active'
 */
export declare const useNamespace: (block: string) => {
    namespace: Ref<string, string>;
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    em: (element?: string, modifier?: string) => string;
    is: (state: string, value?: boolean) => string;
    cssVar: (name: string) => string;
    cssVarObj: (vars: Record<string, string>) => Record<string, string>;
    cssVarBlock: (name: string) => string;
    cssVarBlockObj: (vars: Record<string, string>) => Record<string, string>;
};
export type UseNamespaceReturn = ReturnType<typeof useNamespace>;
