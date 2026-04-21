declare var __VLS_7: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_7) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly height: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
    };
    readonly maxHeight: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
    };
    readonly native: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly always: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly minSize: {
        readonly type: NumberConstructor;
        readonly default: 20;
    };
    readonly viewClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly viewStyle: {
        readonly type: import("vue").PropType<import("vue").StyleValue>;
        readonly default: "";
    };
    readonly noresize: BooleanConstructor;
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {
    wrap: import("vue").Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
    update: () => void;
    scrollTo(options: ScrollToOptions | number, y?: number): void;
    setScrollTop(value: number): void;
    setScrollLeft(value: number): void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    scroll: (args_0: import("./scrollbar").ScrollbarScrollPayload) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly height: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
    };
    readonly maxHeight: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
    };
    readonly native: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly always: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly minSize: {
        readonly type: NumberConstructor;
        readonly default: 20;
    };
    readonly viewClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly viewStyle: {
        readonly type: import("vue").PropType<import("vue").StyleValue>;
        readonly default: "";
    };
    readonly noresize: BooleanConstructor;
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onScroll?: ((args_0: import("./scrollbar").ScrollbarScrollPayload) => any) | undefined;
}>, {
    readonly tag: string;
    readonly height: string | number;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly maxHeight: string | number;
    readonly always: boolean;
    readonly minSize: number;
    readonly native: boolean;
    readonly viewClass: string;
    readonly viewStyle: import("vue").StyleValue;
    readonly noresize: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
