import type { CSSProperties } from 'vue';
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
    title?: (props: typeof __VLS_1) => any;
} & {
    extra?: (props: typeof __VLS_3) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly title: StringConstructor;
    readonly extra: StringConstructor;
    readonly column: {
        readonly type: NumberConstructor;
        readonly default: 3;
    };
    readonly direction: {
        readonly type: import("vue").PropType<"horizontal" | "vertical">;
        readonly default: "horizontal";
    };
    readonly size: {
        readonly type: import("vue").PropType<"large" | "default" | "small">;
        readonly default: "default";
    };
    readonly border: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly colon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly labelStyle: {
        readonly type: import("vue").PropType<CSSProperties>;
    };
    readonly contentStyle: {
        readonly type: import("vue").PropType<CSSProperties>;
    };
    readonly labelClassName: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly contentClassName: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly title: StringConstructor;
    readonly extra: StringConstructor;
    readonly column: {
        readonly type: NumberConstructor;
        readonly default: 3;
    };
    readonly direction: {
        readonly type: import("vue").PropType<"horizontal" | "vertical">;
        readonly default: "horizontal";
    };
    readonly size: {
        readonly type: import("vue").PropType<"large" | "default" | "small">;
        readonly default: "default";
    };
    readonly border: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly colon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly labelStyle: {
        readonly type: import("vue").PropType<CSSProperties>;
    };
    readonly contentStyle: {
        readonly type: import("vue").PropType<CSSProperties>;
    };
    readonly labelClassName: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly contentClassName: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {
    readonly size: "large" | "default" | "small";
    readonly colon: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly direction: "vertical" | "horizontal";
    readonly border: boolean;
    readonly column: number;
    readonly labelClassName: string;
    readonly contentClassName: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
