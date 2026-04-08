declare var __VLS_17: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_17) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly recording: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly amplitudes: {
        readonly type: import("vue").PropType<number[]>;
        readonly default: () => any[];
    };
    readonly variant: {
        readonly type: import("vue").PropType<"inline" | "floating" | "sphere">;
        readonly default: "inline";
    };
    readonly position: {
        readonly type: import("vue").PropType<"top-left" | "top-right" | "bottom-left" | "bottom-right">;
        readonly default: "bottom-right";
    };
    readonly offset: {
        readonly type: import("vue").PropType<[number, number]>;
        readonly default: () => number[];
    };
    readonly teleport: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    cancel: () => void;
    start: () => void;
    stop: () => void;
    "update:recording": (value: boolean) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly recording: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly amplitudes: {
        readonly type: import("vue").PropType<number[]>;
        readonly default: () => any[];
    };
    readonly variant: {
        readonly type: import("vue").PropType<"inline" | "floating" | "sphere">;
        readonly default: "inline";
    };
    readonly position: {
        readonly type: import("vue").PropType<"top-left" | "top-right" | "bottom-left" | "bottom-right">;
        readonly default: "bottom-right";
    };
    readonly offset: {
        readonly type: import("vue").PropType<[number, number]>;
        readonly default: () => number[];
    };
    readonly teleport: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onCancel?: (() => any) | undefined;
    onStart?: (() => any) | undefined;
    onStop?: (() => any) | undefined;
    "onUpdate:recording"?: ((value: boolean) => any) | undefined;
}>, {
    readonly recording: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly variant: "inline" | "floating" | "sphere";
    readonly position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    readonly offset: [number, number];
    readonly teleport: boolean;
    readonly amplitudes: number[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
