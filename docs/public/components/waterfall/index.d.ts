export declare const YhWaterfall: import("@yh-ui/utils").SFCWithInstall<(<T extends Record<string, unknown>>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
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
    attrs: any;
    emit: {};
}, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: {
        items?: T[] | undefined;
        cols?: number | {
            xs?: number;
            sm?: number;
            md?: number;
            lg?: number;
            xl?: number;
        } | undefined;
        gap?: number | undefined;
        animation?: boolean | undefined;
        delay?: number | undefined;
        rowKey?: string | undefined;
        responsive?: boolean | undefined;
        loading?: boolean | undefined;
        heightProperty?: string | undefined;
        imgSelector?: string | undefined;
        themeOverrides?: import("@yh-ui/theme").ComponentThemeVars | undefined;
    } & import("vue").PublicProps;
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
})> & Record<string, unknown>;
export default YhWaterfall;
export * from './src/waterfall';
/** 泛型组件无法直接使用 InstanceType，手动定义暴露 API */
export interface WaterfallInstance {
    /** 触发重新布局 */
    layout: () => void;
}
export type YhWaterfallInstance = WaterfallInstance;
export type YhWaterfallCols = import('./src/waterfall').WaterfallCols;
export type YhWaterfallItemBase = import('./src/waterfall').WaterfallItemBase;
export type YhWaterfallProps = import('./src/waterfall').WaterfallProps;
export type YhWaterfallSlots = import('./src/waterfall').WaterfallSlots;
export type YhWaterfallExpose = import('./src/waterfall').WaterfallExpose;
