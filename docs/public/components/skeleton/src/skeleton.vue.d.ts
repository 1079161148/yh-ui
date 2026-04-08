declare var __VLS_1: {}, __VLS_12: {};
type __VLS_Slots = {} & {
    template?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_12) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly loading: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly animated: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly rows: {
        readonly type: NumberConstructor;
        readonly default: 3;
    };
    readonly title: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly avatar: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly throttle: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly lazy: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly loading: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly animated: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly rows: {
        readonly type: NumberConstructor;
        readonly default: 3;
    };
    readonly title: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly avatar: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly throttle: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly lazy: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {
    readonly title: boolean;
    readonly loading: boolean;
    readonly avatar: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly rows: number;
    readonly lazy: boolean;
    readonly animated: boolean;
    readonly throttle: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
