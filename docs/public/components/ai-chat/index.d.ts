import AiChat from './src/ai-chat.vue';
export declare const YhAiChat: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly messages: {
            readonly type: import("vue").PropType<import("./index.js").AiChatMessage[]>;
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
        "onUpdate:messages"?: ((messages: import("./index.js").AiChatMessage[]) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        clear: () => void;
        send: (message: string) => void;
        "update:messages": (messages: import("./index.js").AiChatMessage[]) => void;
    }, import("vue").PublicProps, {
        readonly loading: boolean;
        readonly messages: import("./index.js").AiChatMessage[];
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly suggestions: string[];
        readonly virtualScroll: boolean;
        readonly virtualHeight: number;
        readonly estimatedItemHeight: number;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly messages: {
            readonly type: import("vue").PropType<import("./index.js").AiChatMessage[]>;
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
        "onUpdate:messages"?: ((messages: import("./index.js").AiChatMessage[]) => any) | undefined;
    }>, {}, {}, {}, {}, {
        readonly loading: boolean;
        readonly messages: import("./index.js").AiChatMessage[];
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly suggestions: string[];
        readonly virtualScroll: boolean;
        readonly virtualHeight: number;
        readonly estimatedItemHeight: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly messages: {
        readonly type: import("vue").PropType<import("./index.js").AiChatMessage[]>;
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
    "onUpdate:messages"?: ((messages: import("./index.js").AiChatMessage[]) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    clear: () => void;
    send: (message: string) => void;
    "update:messages": (messages: import("./index.js").AiChatMessage[]) => void;
}, string, {
    readonly loading: boolean;
    readonly messages: import("./index.js").AiChatMessage[];
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly suggestions: string[];
    readonly virtualScroll: boolean;
    readonly virtualHeight: number;
    readonly estimatedItemHeight: number;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        header?: (props: {}) => any;
    } & {
        message?: (props: {
            message: import("./index.js").AiChatMessage;
            index: number;
        }) => any;
    } & {
        message?: (props: {
            message: import("./index.js").AiChatMessage;
            index: number;
        }) => any;
    } & {
        loading?: (props: {}) => any;
    } & {
        sender?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhAiChat;
export * from './src/ai-chat';
export type AiChatInstance = InstanceType<typeof AiChat>;
