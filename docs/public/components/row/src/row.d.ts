import type { PropType, ExtractPropTypes, InjectionKey, ComputedRef } from 'vue';
export declare const rowProps: {
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly gutter: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly justify: {
        readonly type: PropType<"start" | "end" | "center" | "space-around" | "space-between" | "space-evenly">;
        readonly default: "start";
    };
    readonly align: {
        readonly type: PropType<"top" | "middle" | "bottom">;
        readonly default: "top";
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type RowProps = ExtractPropTypes<typeof rowProps>;
export interface RowContext {
    gutter: ComputedRef<number>;
}
export declare const rowContextKey: InjectionKey<RowContext>;
declare const _default: import("vue").DefineComponent<ExtractPropTypes<{
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly gutter: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly justify: {
        readonly type: PropType<"start" | "end" | "center" | "space-around" | "space-between" | "space-evenly">;
        readonly default: "start";
    };
    readonly align: {
        readonly type: PropType<"top" | "middle" | "bottom">;
        readonly default: "top";
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly gutter: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly justify: {
        readonly type: PropType<"start" | "end" | "center" | "space-around" | "space-between" | "space-evenly">;
        readonly default: "start";
    };
    readonly align: {
        readonly type: PropType<"top" | "middle" | "bottom">;
        readonly default: "top";
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {
    readonly tag: string;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly justify: "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
    readonly gutter: number;
    readonly align: "top" | "bottom" | "middle";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
