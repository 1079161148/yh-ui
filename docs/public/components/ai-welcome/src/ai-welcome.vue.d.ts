import { type AiSuggestion } from './ai-welcome';
declare var __VLS_1: {}, __VLS_7: {}, __VLS_9: {}, __VLS_15: {};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_1) => any;
} & {
    title?: (props: typeof __VLS_7) => any;
} & {
    description?: (props: typeof __VLS_9) => any;
} & {
    default?: (props: typeof __VLS_15) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly title: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly description: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly suggestions: {
        readonly type: import("vue").PropType<AiSuggestion[]>;
        readonly default: () => never[];
    };
    readonly showIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly icon: {
        readonly type: StringConstructor;
        readonly default: "sparkles";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (suggestion: AiSuggestion) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly title: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly description: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly suggestions: {
        readonly type: import("vue").PropType<AiSuggestion[]>;
        readonly default: () => never[];
    };
    readonly showIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly icon: {
        readonly type: StringConstructor;
        readonly default: "sparkles";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onSelect?: ((suggestion: AiSuggestion) => any) | undefined;
}>, {
    readonly title: string;
    readonly description: string;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly icon: string;
    readonly suggestions: AiSuggestion[];
    readonly showIcon: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
