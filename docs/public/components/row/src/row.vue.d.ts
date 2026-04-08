declare var __VLS_6: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_6) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly gutter: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly justify: {
        readonly type: import("vue").PropType<"start" | "end" | "center" | "space-around" | "space-between" | "space-evenly">;
        readonly default: "start";
    };
    readonly align: {
        readonly type: import("vue").PropType<"top" | "middle" | "bottom">;
        readonly default: "top";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly gutter: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly justify: {
        readonly type: import("vue").PropType<"start" | "end" | "center" | "space-around" | "space-between" | "space-evenly">;
        readonly default: "start";
    };
    readonly align: {
        readonly type: import("vue").PropType<"top" | "middle" | "bottom">;
        readonly default: "top";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {
    readonly tag: string;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly justify: "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
    readonly gutter: number;
    readonly align: "top" | "bottom" | "middle";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
