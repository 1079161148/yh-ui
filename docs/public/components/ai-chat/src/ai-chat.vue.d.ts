declare var __VLS_1: {}, __VLS_23: {
    message: import("./ai-chat").AiChatMessage;
    index: number;
}, __VLS_28: {
    message: import("./ai-chat").AiChatMessage;
    index: number;
}, __VLS_33: {}, __VLS_38: {};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_1) => any;
} & {
    message?: (props: typeof __VLS_23) => any;
} & {
    message?: (props: typeof __VLS_28) => any;
} & {
    loading?: (props: typeof __VLS_33) => any;
} & {
    sender?: (props: typeof __VLS_38) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly messages: {
        readonly type: import("vue").PropType<import("./ai-chat").AiChatMessage[]>;
        readonly default: () => never[];
    };
    readonly loading: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly suggestions: {
        readonly type: import("vue").PropType<string[]>;
        readonly default: () => never[];
    };
    readonly virtualScroll: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly virtualHeight: {
        readonly type: NumberConstructor;
        readonly default: 400;
    };
    readonly estimatedItemHeight: {
        readonly type: NumberConstructor;
        readonly default: 80;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    clear: () => void;
    send: (message: string) => void;
    "update:messages": (messages: import("./ai-chat").AiChatMessage[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly messages: {
        readonly type: import("vue").PropType<import("./ai-chat").AiChatMessage[]>;
        readonly default: () => never[];
    };
    readonly loading: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly suggestions: {
        readonly type: import("vue").PropType<string[]>;
        readonly default: () => never[];
    };
    readonly virtualScroll: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly virtualHeight: {
        readonly type: NumberConstructor;
        readonly default: 400;
    };
    readonly estimatedItemHeight: {
        readonly type: NumberConstructor;
        readonly default: 80;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onClear?: (() => any) | undefined;
    onSend?: ((message: string) => any) | undefined;
    "onUpdate:messages"?: ((messages: import("./ai-chat").AiChatMessage[]) => any) | undefined;
}>, {
    readonly loading: boolean;
    readonly messages: import("./ai-chat").AiChatMessage[];
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly suggestions: string[];
    readonly virtualScroll: boolean;
    readonly virtualHeight: number;
    readonly estimatedItemHeight: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
