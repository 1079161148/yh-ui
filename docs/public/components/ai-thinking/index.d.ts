import AiThinking from './src/ai-thinking.vue';
export declare const YhAiThinking: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly status: {
            readonly type: import("vue").PropType<import("./index.js").AiThinkingStatus>;
            readonly default: "thinking";
        };
        readonly title: StringConstructor;
        readonly content: StringConstructor;
        readonly modelValue: BooleanConstructor;
        readonly autoCollapse: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly className: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly classNames: {
            readonly type: import("vue").PropType<Record<string, string>>;
            readonly default: () => {};
        };
        readonly styles: {
            readonly type: import("vue").PropType<Record<string, string>>;
            readonly default: () => {};
        };
        readonly style: {
            readonly type: import("vue").PropType<Record<string, string>>;
            readonly default: () => {};
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (value: boolean) => void;
    }, import("vue").PublicProps, {
        readonly style: Record<string, string>;
        readonly status: import("./index.js").AiThinkingStatus;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly modelValue: boolean;
        readonly className: string;
        readonly autoCollapse: boolean;
        readonly classNames: Record<string, string>;
        readonly styles: Record<string, string>;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly status: {
            readonly type: import("vue").PropType<import("./index.js").AiThinkingStatus>;
            readonly default: "thinking";
        };
        readonly title: StringConstructor;
        readonly content: StringConstructor;
        readonly modelValue: BooleanConstructor;
        readonly autoCollapse: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly className: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly classNames: {
            readonly type: import("vue").PropType<Record<string, string>>;
            readonly default: () => {};
        };
        readonly styles: {
            readonly type: import("vue").PropType<Record<string, string>>;
            readonly default: () => {};
        };
        readonly style: {
            readonly type: import("vue").PropType<Record<string, string>>;
            readonly default: () => {};
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    }>, {}, {}, {}, {}, {
        readonly style: Record<string, string>;
        readonly status: import("./index.js").AiThinkingStatus;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly modelValue: boolean;
        readonly className: string;
        readonly autoCollapse: boolean;
        readonly classNames: Record<string, string>;
        readonly styles: Record<string, string>;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly status: {
        readonly type: import("vue").PropType<import("./index.js").AiThinkingStatus>;
        readonly default: "thinking";
    };
    readonly title: StringConstructor;
    readonly content: StringConstructor;
    readonly modelValue: BooleanConstructor;
    readonly autoCollapse: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly className: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly classNames: {
        readonly type: import("vue").PropType<Record<string, string>>;
        readonly default: () => {};
    };
    readonly styles: {
        readonly type: import("vue").PropType<Record<string, string>>;
        readonly default: () => {};
    };
    readonly style: {
        readonly type: import("vue").PropType<Record<string, string>>;
        readonly default: () => {};
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => void;
}, string, {
    readonly style: Record<string, string>;
    readonly status: import("./index.js").AiThinkingStatus;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly modelValue: boolean;
    readonly className: string;
    readonly autoCollapse: boolean;
    readonly classNames: Record<string, string>;
    readonly styles: Record<string, string>;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhAiThinking;
export * from './src/ai-thinking';
export type AiThinkingInstance = InstanceType<typeof AiThinking>;
