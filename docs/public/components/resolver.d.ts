/**
 * unplugin-vue-components resolver for YH-UI.
 */
export interface YhUIResolverOptions {
    /**
     * Whether to inject the published CSS entry for resolved components.
     * When enabled, the resolver adds `@yh-ui/components/style` as a side effect.
     * @default true
     */
    importStyle?: boolean;
}
/**
 * YH-UI component auto-import resolver.
 *
 * @example
 * ```ts
 * import Components from 'unplugin-vue-components/vite'
 * import { YhUIResolver } from '@yh-ui/components/resolver'
 *
 * export default {
 *   plugins: [
 *     Components({
 *       resolvers: [YhUIResolver()]
 *     })
 *   ]
 * }
 * ```
 */
export declare function YhUIResolver(options?: YhUIResolverOptions): {
    type: "component";
    resolve: (name: string) => {
        name: string;
        from: string;
        sideEffects: string | undefined;
    } | undefined;
};
export default YhUIResolver;
