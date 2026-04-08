import AiPrompts from './src/ai-prompts.vue';
export declare const YhAiPrompts: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        items: {
            type: import("vue").PropType<(import("./index.js").AiPromptItem | string)[]>;
            default: () => never[];
        };
        layout: {
            type: import("vue").PropType<"horizontal" | "vertical" | "waterfall">;
            default: string;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        themeOverrides: {
            type: import("vue").PropType<import("@yh-ui/theme").AiPromptsThemeVars>;
            default: undefined;
        };
    }>> & Readonly<{
        onClick?: ((item: string | import("./index.js").AiPromptItem) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        click: (item: string | import("./index.js").AiPromptItem) => void;
    }, import("vue").PublicProps, {
        title: string;
        themeOverrides: import("@yh-ui/theme").AiPromptsThemeVars;
        layout: "waterfall" | "vertical" | "horizontal";
        items: (string | import("./index.js").AiPromptItem)[];
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        items: {
            type: import("vue").PropType<(import("./index.js").AiPromptItem | string)[]>;
            default: () => never[];
        };
        layout: {
            type: import("vue").PropType<"horizontal" | "vertical" | "waterfall">;
            default: string;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        themeOverrides: {
            type: import("vue").PropType<import("@yh-ui/theme").AiPromptsThemeVars>;
            default: undefined;
        };
    }>> & Readonly<{
        onClick?: ((item: string | import("./index.js").AiPromptItem) => any) | undefined;
    }>, {}, {}, {}, {}, {
        title: string;
        themeOverrides: import("@yh-ui/theme").AiPromptsThemeVars;
        layout: "waterfall" | "vertical" | "horizontal";
        items: (string | import("./index.js").AiPromptItem)[];
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: import("vue").PropType<(import("./index.js").AiPromptItem | string)[]>;
        default: () => never[];
    };
    layout: {
        type: import("vue").PropType<"horizontal" | "vertical" | "waterfall">;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    themeOverrides: {
        type: import("vue").PropType<import("@yh-ui/theme").AiPromptsThemeVars>;
        default: undefined;
    };
}>> & Readonly<{
    onClick?: ((item: string | import("./index.js").AiPromptItem) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (item: string | import("./index.js").AiPromptItem) => void;
}, string, {
    title: string;
    themeOverrides: import("@yh-ui/theme").AiPromptsThemeVars;
    layout: "waterfall" | "vertical" | "horizontal";
    items: (string | import("./index.js").AiPromptItem)[];
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        title?: (props: {}) => any;
    } & {
        item?: (props: {
            item: string | import("./index.js").AiPromptItem;
            index: number;
        }) => any;
    } & {
        icon?: (props: {
            icon: string;
        }) => any;
    };
})> & Record<string, unknown>;
export default YhAiPrompts;
export * from './src/ai-prompts';
export type AiPromptsInstance = InstanceType<typeof AiPrompts>;
