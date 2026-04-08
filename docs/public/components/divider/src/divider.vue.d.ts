declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly direction: {
        readonly type: import("vue").PropType<"horizontal" | "vertical">;
        readonly default: "horizontal";
    };
    readonly contentPosition: {
        readonly type: import("vue").PropType<"left" | "center" | "right">;
        readonly default: "center";
    };
    readonly borderStyle: {
        readonly type: import("vue").PropType<"solid" | "dashed" | "dotted" | "double">;
        readonly default: "solid";
    };
    readonly borderWidth: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
    };
    readonly color: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly direction: {
        readonly type: import("vue").PropType<"horizontal" | "vertical">;
        readonly default: "horizontal";
    };
    readonly contentPosition: {
        readonly type: import("vue").PropType<"left" | "center" | "right">;
        readonly default: "center";
    };
    readonly borderStyle: {
        readonly type: import("vue").PropType<"solid" | "dashed" | "dotted" | "double">;
        readonly default: "solid";
    };
    readonly borderWidth: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
    };
    readonly color: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly borderWidth: string | number;
    readonly color: string;
    readonly direction: "vertical" | "horizontal";
    readonly borderStyle: "dashed" | "dotted" | "double" | "solid";
    readonly contentPosition: "center" | "left" | "right";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
