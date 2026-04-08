declare var __VLS_6: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_6) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly span: {
        readonly type: NumberConstructor;
        readonly default: 24;
    };
    readonly offset: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly push: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly pull: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly xs: {
        readonly type: import("vue").PropType<number | {
            span?: number;
            offset?: number;
            push?: number;
            pull?: number;
        }>;
        readonly default: () => {};
    };
    readonly sm: {
        readonly type: import("vue").PropType<number | {
            span?: number;
            offset?: number;
            push?: number;
            pull?: number;
        }>;
        readonly default: () => {};
    };
    readonly md: {
        readonly type: import("vue").PropType<number | {
            span?: number;
            offset?: number;
            push?: number;
            pull?: number;
        }>;
        readonly default: () => {};
    };
    readonly lg: {
        readonly type: import("vue").PropType<number | {
            span?: number;
            offset?: number;
            push?: number;
            pull?: number;
        }>;
        readonly default: () => {};
    };
    readonly xl: {
        readonly type: import("vue").PropType<number | {
            span?: number;
            offset?: number;
            push?: number;
            pull?: number;
        }>;
        readonly default: () => {};
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
    readonly span: {
        readonly type: NumberConstructor;
        readonly default: 24;
    };
    readonly offset: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly push: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly pull: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly xs: {
        readonly type: import("vue").PropType<number | {
            span?: number;
            offset?: number;
            push?: number;
            pull?: number;
        }>;
        readonly default: () => {};
    };
    readonly sm: {
        readonly type: import("vue").PropType<number | {
            span?: number;
            offset?: number;
            push?: number;
            pull?: number;
        }>;
        readonly default: () => {};
    };
    readonly md: {
        readonly type: import("vue").PropType<number | {
            span?: number;
            offset?: number;
            push?: number;
            pull?: number;
        }>;
        readonly default: () => {};
    };
    readonly lg: {
        readonly type: import("vue").PropType<number | {
            span?: number;
            offset?: number;
            push?: number;
            pull?: number;
        }>;
        readonly default: () => {};
    };
    readonly xl: {
        readonly type: import("vue").PropType<number | {
            span?: number;
            offset?: number;
            push?: number;
            pull?: number;
        }>;
        readonly default: () => {};
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {
    readonly span: number;
    readonly push: number;
    readonly tag: string;
    readonly md: number | {
        span?: number;
        offset?: number;
        push?: number;
        pull?: number;
    };
    readonly xs: number | {
        span?: number;
        offset?: number;
        push?: number;
        pull?: number;
    };
    readonly sm: number | {
        span?: number;
        offset?: number;
        push?: number;
        pull?: number;
    };
    readonly lg: number | {
        span?: number;
        offset?: number;
        push?: number;
        pull?: number;
    };
    readonly xl: number | {
        span?: number;
        offset?: number;
        push?: number;
        pull?: number;
    };
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly offset: number;
    readonly pull: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
