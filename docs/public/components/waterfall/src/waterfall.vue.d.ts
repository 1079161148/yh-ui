declare const _default: <T extends Record<string, unknown>>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{} & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, never>, never> & {
        /** 数据源 */
        items?: T[];
        /** 列数，支持响应式对象 { xs, sm, md, lg, xl } */
        cols?: number | {
            xs?: number;
            sm?: number;
            md?: number;
            lg?: number;
            xl?: number;
        };
        /** 间距 (px) */
        gap?: number;
        /** 是否开启入场动画 */
        animation?: boolean;
        /** 动画延迟基数 (ms) */
        delay?: number;
        /** 节点的唯一标识字段 */
        rowKey?: string;
        /** 是否自动监听容器宽度变化 */
        responsive?: boolean;
        /** 是否处于加载状态 */
        loading?: boolean;
        /** 用于平衡布局的高度字段名 (若不提供则采用轮询算法) */
        heightProperty?: string;
        /** 内部图片的选择器，用于在图片加载后自动计算布局 */
        imgSelector?: string;
        /** 主题覆盖变量 */
        themeOverrides?: import("@yh-ui/theme").ComponentThemeVars;
    } & Partial<{}>> & import("vue").PublicProps;
    expose(exposed: import("vue").ShallowUnwrapRef<{
        layout: () => void;
    }>): void;
    attrs: any;
    slots: {
        loading?: (props: {}) => any;
    } & {
        default?: (props: {
            item: T;
            index: number;
            column: number;
        }) => any;
    } & {
        empty?: (props: {}) => any;
    } & {
        'loading-overlay'?: (props: {}) => any;
    };
    emit: {};
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
