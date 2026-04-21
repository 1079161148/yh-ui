import AiBubble from './src/ai-bubble.vue';
export declare const YhAiBubble: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        content: {
            type: StringConstructor;
            default: string;
        };
        markdown: {
            type: BooleanConstructor;
            default: boolean;
        };
        role: {
            type: import("vue").PropType<"user" | "assistant" | "system">;
            default: string;
        };
        placement: {
            type: import("vue").PropType<"start" | "end">;
        };
        shape: {
            type: import("vue").PropType<"round" | "corner">;
            default: string;
        };
        variant: {
            type: import("vue").PropType<"filled" | "outlined" | "borderless" | "shadow">;
            default: string;
        };
        time: StringConstructor;
        avatar: StringConstructor;
        loading: BooleanConstructor;
        typing: BooleanConstructor;
        streaming: {
            type: BooleanConstructor;
            default: boolean;
        };
        streamMode: {
            type: import("vue").PropType<"word" | "sentence" | "paragraph">;
            default: string;
        };
        streamSpeed: {
            type: NumberConstructor;
            default: number;
        };
        streamInterval: {
            type: NumberConstructor;
            default: number;
        };
        onStreamComplete: {
            type: import("vue").PropType<() => void>;
        };
        citations: {
            type: import("vue").PropType<import("./index.js").AiCitation[]>;
            default: () => never[];
        };
        multimodal: {
            type: import("vue").PropType<import("./index.js").AiMultimodal[]>;
            default: () => never[];
        };
        markdownOptions: {
            type: import("vue").PropType<import("./index.js").AiMarkdownOptions>;
            default: () => {};
        };
        structuredData: {
            type: import("vue").PropType<import("./index.js").AiStructuredData>;
        };
        onExplainCode: {
            type: import("vue").PropType<(code: string, language: string) => Promise<string>>;
        };
        onRunCode: {
            type: import("vue").PropType<(code: string, language: string) => Promise<{
                output: string;
                error?: string;
            }>>;
        };
        onCitationClick: {
            type: import("vue").PropType<(citation: import("./index.js").AiCitation) => void>;
        };
        themeOverrides: {
            type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            default: undefined;
        };
        enablePythonRuntime: {
            type: BooleanConstructor;
            default: boolean;
        };
        pythonRuntime: {
            type: import("vue").PropType<"browser" | "remote">;
            default: string;
        };
        pythonApiUrl: {
            type: StringConstructor;
            default: string;
        };
        pyodideUrl: {
            type: StringConstructor;
            default: string;
        };
        enableSanitizer: {
            type: BooleanConstructor;
            default: boolean;
        };
        sanitizer: {
            type: import("vue").PropType<(html: string) => string>;
            default: undefined;
        };
        allowedTags: {
            type: import("vue").PropType<string[]>;
            default: () => string[];
        };
        allowedAttributes: {
            type: import("vue").PropType<string[]>;
            default: () => string[];
        };
        allowedSchemes: {
            type: import("vue").PropType<string[]>;
            default: () => string[];
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        loading: boolean;
        citations: import("./index.js").AiCitation[];
        role: "user" | "assistant" | "system";
        content: string;
        themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        variant: "filled" | "borderless" | "shadow" | "outlined";
        shape: "round" | "corner";
        markdown: boolean;
        typing: boolean;
        streaming: boolean;
        streamMode: "paragraph" | "word" | "sentence";
        streamSpeed: number;
        streamInterval: number;
        multimodal: import("./index.js").AiMultimodal[];
        markdownOptions: import("./index.js").AiMarkdownOptions;
        enablePythonRuntime: boolean;
        pythonRuntime: "remote" | "browser";
        pythonApiUrl: string;
        pyodideUrl: string;
        enableSanitizer: boolean;
        sanitizer: (html: string) => string;
        allowedTags: string[];
        allowedAttributes: string[];
        allowedSchemes: string[];
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        content: {
            type: StringConstructor;
            default: string;
        };
        markdown: {
            type: BooleanConstructor;
            default: boolean;
        };
        role: {
            type: import("vue").PropType<"user" | "assistant" | "system">;
            default: string;
        };
        placement: {
            type: import("vue").PropType<"start" | "end">;
        };
        shape: {
            type: import("vue").PropType<"round" | "corner">;
            default: string;
        };
        variant: {
            type: import("vue").PropType<"filled" | "outlined" | "borderless" | "shadow">;
            default: string;
        };
        time: StringConstructor;
        avatar: StringConstructor;
        loading: BooleanConstructor;
        typing: BooleanConstructor;
        streaming: {
            type: BooleanConstructor;
            default: boolean;
        };
        streamMode: {
            type: import("vue").PropType<"word" | "sentence" | "paragraph">;
            default: string;
        };
        streamSpeed: {
            type: NumberConstructor;
            default: number;
        };
        streamInterval: {
            type: NumberConstructor;
            default: number;
        };
        onStreamComplete: {
            type: import("vue").PropType<() => void>;
        };
        citations: {
            type: import("vue").PropType<import("./index.js").AiCitation[]>;
            default: () => never[];
        };
        multimodal: {
            type: import("vue").PropType<import("./index.js").AiMultimodal[]>;
            default: () => never[];
        };
        markdownOptions: {
            type: import("vue").PropType<import("./index.js").AiMarkdownOptions>;
            default: () => {};
        };
        structuredData: {
            type: import("vue").PropType<import("./index.js").AiStructuredData>;
        };
        onExplainCode: {
            type: import("vue").PropType<(code: string, language: string) => Promise<string>>;
        };
        onRunCode: {
            type: import("vue").PropType<(code: string, language: string) => Promise<{
                output: string;
                error?: string;
            }>>;
        };
        onCitationClick: {
            type: import("vue").PropType<(citation: import("./index.js").AiCitation) => void>;
        };
        themeOverrides: {
            type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            default: undefined;
        };
        enablePythonRuntime: {
            type: BooleanConstructor;
            default: boolean;
        };
        pythonRuntime: {
            type: import("vue").PropType<"browser" | "remote">;
            default: string;
        };
        pythonApiUrl: {
            type: StringConstructor;
            default: string;
        };
        pyodideUrl: {
            type: StringConstructor;
            default: string;
        };
        enableSanitizer: {
            type: BooleanConstructor;
            default: boolean;
        };
        sanitizer: {
            type: import("vue").PropType<(html: string) => string>;
            default: undefined;
        };
        allowedTags: {
            type: import("vue").PropType<string[]>;
            default: () => string[];
        };
        allowedAttributes: {
            type: import("vue").PropType<string[]>;
            default: () => string[];
        };
        allowedSchemes: {
            type: import("vue").PropType<string[]>;
            default: () => string[];
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, {
        loading: boolean;
        citations: import("./index.js").AiCitation[];
        role: "user" | "assistant" | "system";
        content: string;
        themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        variant: "filled" | "borderless" | "shadow" | "outlined";
        shape: "round" | "corner";
        markdown: boolean;
        typing: boolean;
        streaming: boolean;
        streamMode: "paragraph" | "word" | "sentence";
        streamSpeed: number;
        streamInterval: number;
        multimodal: import("./index.js").AiMultimodal[];
        markdownOptions: import("./index.js").AiMarkdownOptions;
        enablePythonRuntime: boolean;
        pythonRuntime: "remote" | "browser";
        pythonApiUrl: string;
        pyodideUrl: string;
        enableSanitizer: boolean;
        sanitizer: (html: string) => string;
        allowedTags: string[];
        allowedAttributes: string[];
        allowedSchemes: string[];
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    content: {
        type: StringConstructor;
        default: string;
    };
    markdown: {
        type: BooleanConstructor;
        default: boolean;
    };
    role: {
        type: import("vue").PropType<"user" | "assistant" | "system">;
        default: string;
    };
    placement: {
        type: import("vue").PropType<"start" | "end">;
    };
    shape: {
        type: import("vue").PropType<"round" | "corner">;
        default: string;
    };
    variant: {
        type: import("vue").PropType<"filled" | "outlined" | "borderless" | "shadow">;
        default: string;
    };
    time: StringConstructor;
    avatar: StringConstructor;
    loading: BooleanConstructor;
    typing: BooleanConstructor;
    streaming: {
        type: BooleanConstructor;
        default: boolean;
    };
    streamMode: {
        type: import("vue").PropType<"word" | "sentence" | "paragraph">;
        default: string;
    };
    streamSpeed: {
        type: NumberConstructor;
        default: number;
    };
    streamInterval: {
        type: NumberConstructor;
        default: number;
    };
    onStreamComplete: {
        type: import("vue").PropType<() => void>;
    };
    citations: {
        type: import("vue").PropType<import("./index.js").AiCitation[]>;
        default: () => never[];
    };
    multimodal: {
        type: import("vue").PropType<import("./index.js").AiMultimodal[]>;
        default: () => never[];
    };
    markdownOptions: {
        type: import("vue").PropType<import("./index.js").AiMarkdownOptions>;
        default: () => {};
    };
    structuredData: {
        type: import("vue").PropType<import("./index.js").AiStructuredData>;
    };
    onExplainCode: {
        type: import("vue").PropType<(code: string, language: string) => Promise<string>>;
    };
    onRunCode: {
        type: import("vue").PropType<(code: string, language: string) => Promise<{
            output: string;
            error?: string;
        }>>;
    };
    onCitationClick: {
        type: import("vue").PropType<(citation: import("./index.js").AiCitation) => void>;
    };
    themeOverrides: {
        type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        default: undefined;
    };
    enablePythonRuntime: {
        type: BooleanConstructor;
        default: boolean;
    };
    pythonRuntime: {
        type: import("vue").PropType<"browser" | "remote">;
        default: string;
    };
    pythonApiUrl: {
        type: StringConstructor;
        default: string;
    };
    pyodideUrl: {
        type: StringConstructor;
        default: string;
    };
    enableSanitizer: {
        type: BooleanConstructor;
        default: boolean;
    };
    sanitizer: {
        type: import("vue").PropType<(html: string) => string>;
        default: undefined;
    };
    allowedTags: {
        type: import("vue").PropType<string[]>;
        default: () => string[];
    };
    allowedAttributes: {
        type: import("vue").PropType<string[]>;
        default: () => string[];
    };
    allowedSchemes: {
        type: import("vue").PropType<string[]>;
        default: () => string[];
    };
}>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    loading: boolean;
    citations: import("./index.js").AiCitation[];
    role: "user" | "assistant" | "system";
    content: string;
    themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    variant: "filled" | "borderless" | "shadow" | "outlined";
    shape: "round" | "corner";
    markdown: boolean;
    typing: boolean;
    streaming: boolean;
    streamMode: "paragraph" | "word" | "sentence";
    streamSpeed: number;
    streamInterval: number;
    multimodal: import("./index.js").AiMultimodal[];
    markdownOptions: import("./index.js").AiMarkdownOptions;
    enablePythonRuntime: boolean;
    pythonRuntime: "remote" | "browser";
    pythonApiUrl: string;
    pyodideUrl: string;
    enableSanitizer: boolean;
    sanitizer: (html: string) => string;
    allowedTags: string[];
    allowedAttributes: string[];
    allowedSchemes: string[];
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        avatar?: (props: {}) => any;
    } & {
        header?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        footer?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhAiBubble;
export * from './src/ai-bubble';
export type AiBubbleInstance = InstanceType<typeof AiBubble>;
export type YhAiBubbleInstance = AiBubbleInstance;
export type YhAiBubbleProps = import('./src/ai-bubble').AiBubbleProps;
export type YhAiBubbleSlots = import('./src/ai-bubble').AiBubbleSlots;
export type YhAiCitation = import('./src/ai-bubble').AiCitation;
export type YhAiMultimodal = import('./src/ai-bubble').AiMultimodal;
export type YhAiCodeBlockOptions = import('./src/ai-bubble').AiCodeBlockOptions;
export type YhAiMermaidConfig = import('./src/ai-bubble').AiMermaidConfig;
export type YhAiStructuredTableData = import('./src/ai-bubble').AiStructuredTableData;
export type YhAiLatexOptions = import('./src/ai-bubble').AiLatexOptions;
export type YhAiFilePreviewOptions = import('./src/ai-bubble').AiFilePreviewOptions;
export type YhAiStructuredData = import('./src/ai-bubble').AiStructuredData;
export type YhAiMarkdownOptions = import('./src/ai-bubble').AiMarkdownOptions;
