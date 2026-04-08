import AiCodeBlock from './src/ai-code-block.vue';
export declare const YhAiCodeBlock: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly language: {
            readonly type: StringConstructor;
            readonly default: "text";
        };
        readonly code: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly filename: StringConstructor;
        readonly showLineNumbers: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly highlightLines: {
            readonly type: import("vue").PropType<number[]>;
            readonly default: () => never[];
        };
        readonly collapsible: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly defaultCollapsed: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly showRun: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly showEdit: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly highlight: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly editable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onEdit?: ((code: string) => any) | undefined;
        onCopy?: ((code: string) => any) | undefined;
        onRun?: ((code: string) => any) | undefined;
        onUpdate?: ((code: string) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        edit: (code: string) => void;
        copy: (code: string) => void;
        run: (code: string) => void;
        update: (code: string) => void;
    }, import("vue").PublicProps, {
        readonly code: string;
        readonly language: string;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly editable: boolean;
        readonly highlight: boolean;
        readonly collapsible: boolean;
        readonly showLineNumbers: boolean;
        readonly highlightLines: number[];
        readonly defaultCollapsed: boolean;
        readonly showRun: boolean;
        readonly showEdit: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly language: {
            readonly type: StringConstructor;
            readonly default: "text";
        };
        readonly code: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly filename: StringConstructor;
        readonly showLineNumbers: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly highlightLines: {
            readonly type: import("vue").PropType<number[]>;
            readonly default: () => never[];
        };
        readonly collapsible: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly defaultCollapsed: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly showRun: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly showEdit: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly highlight: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly editable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onEdit?: ((code: string) => any) | undefined;
        onCopy?: ((code: string) => any) | undefined;
        onRun?: ((code: string) => any) | undefined;
        onUpdate?: ((code: string) => any) | undefined;
    }>, {}, {}, {}, {}, {
        readonly code: string;
        readonly language: string;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly editable: boolean;
        readonly highlight: boolean;
        readonly collapsible: boolean;
        readonly showLineNumbers: boolean;
        readonly highlightLines: number[];
        readonly defaultCollapsed: boolean;
        readonly showRun: boolean;
        readonly showEdit: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly language: {
        readonly type: StringConstructor;
        readonly default: "text";
    };
    readonly code: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly filename: StringConstructor;
    readonly showLineNumbers: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly highlightLines: {
        readonly type: import("vue").PropType<number[]>;
        readonly default: () => never[];
    };
    readonly collapsible: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly defaultCollapsed: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showRun: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showEdit: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly highlight: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly editable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onEdit?: ((code: string) => any) | undefined;
    onCopy?: ((code: string) => any) | undefined;
    onRun?: ((code: string) => any) | undefined;
    onUpdate?: ((code: string) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    edit: (code: string) => void;
    copy: (code: string) => void;
    run: (code: string) => void;
    update: (code: string) => void;
}, string, {
    readonly code: string;
    readonly language: string;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly editable: boolean;
    readonly highlight: boolean;
    readonly collapsible: boolean;
    readonly showLineNumbers: boolean;
    readonly highlightLines: number[];
    readonly defaultCollapsed: boolean;
    readonly showRun: boolean;
    readonly showEdit: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        actions?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhAiCodeBlock;
export * from './src/ai-code-block';
export type AiCodeBlockInstance = InstanceType<typeof AiCodeBlock>;
