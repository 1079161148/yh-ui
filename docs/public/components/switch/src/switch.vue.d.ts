import { type SwitchValueType } from './switch';
declare var __VLS_1: {}, __VLS_7: {}, __VLS_13: {}, __VLS_19: {}, __VLS_25: {}, __VLS_31: {};
type __VLS_Slots = {} & {
    inactive?: (props: typeof __VLS_1) => any;
} & {
    active?: (props: typeof __VLS_7) => any;
} & {
    inactive?: (props: typeof __VLS_13) => any;
} & {
    'active-action'?: (props: typeof __VLS_19) => any;
} & {
    'inactive-action'?: (props: typeof __VLS_25) => any;
} & {
    active?: (props: typeof __VLS_31) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: import("vue").PropType<SwitchValueType>;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: import("vue").PropType<"" | "large" | "default" | "small">;
        default: string;
    };
    width: {
        type: import("vue").PropType<string | number>;
        default: string;
    };
    inlinePrompt: {
        type: BooleanConstructor;
        default: boolean;
    };
    activeIcon: {
        type: import("vue").PropType<string | import("vue").Component>;
        default: undefined;
    };
    inactiveIcon: {
        type: import("vue").PropType<string | import("vue").Component>;
        default: undefined;
    };
    activeActionIcon: {
        type: import("vue").PropType<string | import("vue").Component>;
        default: undefined;
    };
    inactiveActionIcon: {
        type: import("vue").PropType<string | import("vue").Component>;
        default: undefined;
    };
    activeText: {
        type: StringConstructor;
        default: string;
    };
    inactiveText: {
        type: StringConstructor;
        default: string;
    };
    activeValue: {
        type: import("vue").PropType<SwitchValueType>;
        default: boolean;
    };
    inactiveValue: {
        type: import("vue").PropType<SwitchValueType>;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    beforeChange: {
        type: import("vue").PropType<() => Promise<boolean> | boolean>;
        default: undefined;
    };
    id: {
        type: StringConstructor;
        default: undefined;
    };
    tabindex: {
        type: import("vue").PropType<string | number>;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
    themeOverrides: {
        type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        default: undefined;
    };
}>, {
    focus: () => void;
    checked: import("vue").ComputedRef<boolean>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (_val: SwitchValueType) => void;
    "update:modelValue": (_val: SwitchValueType) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: import("vue").PropType<SwitchValueType>;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: import("vue").PropType<"" | "large" | "default" | "small">;
        default: string;
    };
    width: {
        type: import("vue").PropType<string | number>;
        default: string;
    };
    inlinePrompt: {
        type: BooleanConstructor;
        default: boolean;
    };
    activeIcon: {
        type: import("vue").PropType<string | import("vue").Component>;
        default: undefined;
    };
    inactiveIcon: {
        type: import("vue").PropType<string | import("vue").Component>;
        default: undefined;
    };
    activeActionIcon: {
        type: import("vue").PropType<string | import("vue").Component>;
        default: undefined;
    };
    inactiveActionIcon: {
        type: import("vue").PropType<string | import("vue").Component>;
        default: undefined;
    };
    activeText: {
        type: StringConstructor;
        default: string;
    };
    inactiveText: {
        type: StringConstructor;
        default: string;
    };
    activeValue: {
        type: import("vue").PropType<SwitchValueType>;
        default: boolean;
    };
    inactiveValue: {
        type: import("vue").PropType<SwitchValueType>;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    beforeChange: {
        type: import("vue").PropType<() => Promise<boolean> | boolean>;
        default: undefined;
    };
    id: {
        type: StringConstructor;
        default: undefined;
    };
    tabindex: {
        type: import("vue").PropType<string | number>;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
    themeOverrides: {
        type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        default: undefined;
    };
}>> & Readonly<{
    onChange?: ((_val: SwitchValueType) => any) | undefined;
    "onUpdate:modelValue"?: ((_val: SwitchValueType) => any) | undefined;
}>, {
    size: "" | "large" | "default" | "small";
    name: string;
    id: string;
    loading: boolean;
    disabled: boolean;
    width: string | number;
    themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    modelValue: SwitchValueType;
    tabindex: string | number;
    ariaLabel: string;
    validateEvent: boolean;
    inlinePrompt: boolean;
    activeIcon: string | import("vue").Component;
    inactiveIcon: string | import("vue").Component;
    activeActionIcon: string | import("vue").Component;
    inactiveActionIcon: string | import("vue").Component;
    activeText: string;
    inactiveText: string;
    activeValue: SwitchValueType;
    inactiveValue: SwitchValueType;
    beforeChange: () => Promise<boolean> | boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
