import AiMention from './src/ai-mention.vue';
export declare const YhAiMention: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly modelValue: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly types: {
            readonly type: import("vue").PropType<import("./index.js").AiMentionType[]>;
            readonly default: () => string[];
        };
        readonly options: {
            readonly type: import("vue").PropType<import("./index.js").AiMentionOption[]>;
            readonly default: () => never[];
        };
        readonly triggers: {
            readonly type: import("vue").PropType<string[]>;
            readonly default: () => string[];
        };
        readonly type: {
            readonly type: import("vue").PropType<"input" | "textarea">;
            readonly default: "textarea";
        };
        readonly placeholder: StringConstructor;
        readonly disabled: BooleanConstructor;
        readonly size: import("vue").PropType<"large" | "default" | "small">;
        readonly maxLength: NumberConstructor;
        readonly rows: {
            readonly type: NumberConstructor;
            readonly default: 3;
        };
        readonly loading: BooleanConstructor;
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: () => {};
        };
        readonly filterOption: {
            readonly type: import("vue").PropType<((keyword: string, option: import("../index.js").MentionOption) => boolean) | false>;
            readonly default: undefined;
        };
        readonly enableFileTree: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly fileLoader: {
            readonly type: import("vue").PropType<import("./index.js").AiMentionFileLoader>;
            readonly default: undefined;
        };
        readonly fileRoot: {
            readonly type: StringConstructor;
            readonly default: "/";
        };
        readonly fileTreeExpandedLevel: {
            readonly type: NumberConstructor;
            readonly default: 2;
        };
        readonly showFileIcon: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly showFileSize: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly showModifiedTime: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly formatFileSize: {
            readonly type: import("vue").PropType<(size: number) => string>;
            readonly default: (size: number) => string;
        };
        readonly searchDebounce: {
            readonly type: NumberConstructor;
            readonly default: 300;
        };
    }>> & Readonly<{
        onInput?: ((value: string) => any) | undefined;
        onSearch?: ((keyword: string, trigger: string) => any) | undefined;
        onSelect?: ((option: import("./index.js").AiMentionOption, trigger: string) => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((value: string) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        onKeydown?: ((event: KeyboardEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string) => any) | undefined;
        "onFile-load"?: ((_type: "table" | "document" | "knowledge" | "file", _nodes: import("./index.js").AiMentionFileNode[]) => any) | undefined;
        "onFile-select"?: ((node: import("./index.js").AiMentionFileNode, option: import("./index.js").AiMentionOption) => any) | undefined;
    }>, {
        focus: () => void;
        blur: () => void;
        clear: () => void;
        getRef: () => HTMLTextAreaElement | HTMLInputElement | undefined | null;
        insertMention: (option: import("./index.js").AiMentionOption, trigger?: string) => void;
        refreshFileTree: () => void;
        toggleFolder: (key: string) => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        input: (value: string) => void;
        search: (keyword: string, trigger: string) => void;
        select: (option: import("./index.js").AiMentionOption, trigger: string) => void;
        focus: (event: FocusEvent) => void;
        change: (value: string) => void;
        blur: (event: FocusEvent) => void;
        keydown: (event: KeyboardEvent) => void;
        "update:modelValue": (value: string) => void;
        "file-load": (_type: "table" | "document" | "knowledge" | "file", _nodes: import("./index.js").AiMentionFileNode[]) => void;
        "file-select": (node: import("./index.js").AiMentionFileNode, option: import("./index.js").AiMentionOption) => void;
    }, import("vue").PublicProps, {
        readonly loading: boolean;
        readonly type: "input" | "textarea";
        readonly disabled: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly modelValue: string;
        readonly rows: number;
        readonly options: import("./index.js").AiMentionOption[];
        readonly triggers: string[];
        readonly filterOption: false | ((keyword: string, option: import("../index.js").MentionOption) => boolean);
        readonly types: ("table" | "agent" | "document" | "knowledge" | "file")[];
        readonly enableFileTree: boolean;
        readonly fileLoader: import("./index.js").AiMentionFileLoader;
        readonly fileRoot: string;
        readonly fileTreeExpandedLevel: number;
        readonly showFileIcon: boolean;
        readonly showFileSize: boolean;
        readonly showModifiedTime: boolean;
        readonly formatFileSize: (size: number) => string;
        readonly searchDebounce: number;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly modelValue: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly types: {
            readonly type: import("vue").PropType<import("./index.js").AiMentionType[]>;
            readonly default: () => string[];
        };
        readonly options: {
            readonly type: import("vue").PropType<import("./index.js").AiMentionOption[]>;
            readonly default: () => never[];
        };
        readonly triggers: {
            readonly type: import("vue").PropType<string[]>;
            readonly default: () => string[];
        };
        readonly type: {
            readonly type: import("vue").PropType<"input" | "textarea">;
            readonly default: "textarea";
        };
        readonly placeholder: StringConstructor;
        readonly disabled: BooleanConstructor;
        readonly size: import("vue").PropType<"large" | "default" | "small">;
        readonly maxLength: NumberConstructor;
        readonly rows: {
            readonly type: NumberConstructor;
            readonly default: 3;
        };
        readonly loading: BooleanConstructor;
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: () => {};
        };
        readonly filterOption: {
            readonly type: import("vue").PropType<((keyword: string, option: import("../index.js").MentionOption) => boolean) | false>;
            readonly default: undefined;
        };
        readonly enableFileTree: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly fileLoader: {
            readonly type: import("vue").PropType<import("./index.js").AiMentionFileLoader>;
            readonly default: undefined;
        };
        readonly fileRoot: {
            readonly type: StringConstructor;
            readonly default: "/";
        };
        readonly fileTreeExpandedLevel: {
            readonly type: NumberConstructor;
            readonly default: 2;
        };
        readonly showFileIcon: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly showFileSize: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly showModifiedTime: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly formatFileSize: {
            readonly type: import("vue").PropType<(size: number) => string>;
            readonly default: (size: number) => string;
        };
        readonly searchDebounce: {
            readonly type: NumberConstructor;
            readonly default: 300;
        };
    }>> & Readonly<{
        onInput?: ((value: string) => any) | undefined;
        onSearch?: ((keyword: string, trigger: string) => any) | undefined;
        onSelect?: ((option: import("./index.js").AiMentionOption, trigger: string) => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((value: string) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        onKeydown?: ((event: KeyboardEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string) => any) | undefined;
        "onFile-load"?: ((_type: "table" | "document" | "knowledge" | "file", _nodes: import("./index.js").AiMentionFileNode[]) => any) | undefined;
        "onFile-select"?: ((node: import("./index.js").AiMentionFileNode, option: import("./index.js").AiMentionOption) => any) | undefined;
    }>, {
        focus: () => void;
        blur: () => void;
        clear: () => void;
        getRef: () => HTMLTextAreaElement | HTMLInputElement | undefined | null;
        insertMention: (option: import("./index.js").AiMentionOption, trigger?: string) => void;
        refreshFileTree: () => void;
        toggleFolder: (key: string) => void;
    }, {}, {}, {}, {
        readonly loading: boolean;
        readonly type: "input" | "textarea";
        readonly disabled: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly modelValue: string;
        readonly rows: number;
        readonly options: import("./index.js").AiMentionOption[];
        readonly triggers: string[];
        readonly filterOption: false | ((keyword: string, option: import("../index.js").MentionOption) => boolean);
        readonly types: ("table" | "agent" | "document" | "knowledge" | "file")[];
        readonly enableFileTree: boolean;
        readonly fileLoader: import("./index.js").AiMentionFileLoader;
        readonly fileRoot: string;
        readonly fileTreeExpandedLevel: number;
        readonly showFileIcon: boolean;
        readonly showFileSize: boolean;
        readonly showModifiedTime: boolean;
        readonly formatFileSize: (size: number) => string;
        readonly searchDebounce: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly types: {
        readonly type: import("vue").PropType<import("./index.js").AiMentionType[]>;
        readonly default: () => string[];
    };
    readonly options: {
        readonly type: import("vue").PropType<import("./index.js").AiMentionOption[]>;
        readonly default: () => never[];
    };
    readonly triggers: {
        readonly type: import("vue").PropType<string[]>;
        readonly default: () => string[];
    };
    readonly type: {
        readonly type: import("vue").PropType<"input" | "textarea">;
        readonly default: "textarea";
    };
    readonly placeholder: StringConstructor;
    readonly disabled: BooleanConstructor;
    readonly size: import("vue").PropType<"large" | "default" | "small">;
    readonly maxLength: NumberConstructor;
    readonly rows: {
        readonly type: NumberConstructor;
        readonly default: 3;
    };
    readonly loading: BooleanConstructor;
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: () => {};
    };
    readonly filterOption: {
        readonly type: import("vue").PropType<((keyword: string, option: import("../index.js").MentionOption) => boolean) | false>;
        readonly default: undefined;
    };
    readonly enableFileTree: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly fileLoader: {
        readonly type: import("vue").PropType<import("./index.js").AiMentionFileLoader>;
        readonly default: undefined;
    };
    readonly fileRoot: {
        readonly type: StringConstructor;
        readonly default: "/";
    };
    readonly fileTreeExpandedLevel: {
        readonly type: NumberConstructor;
        readonly default: 2;
    };
    readonly showFileIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showFileSize: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showModifiedTime: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly formatFileSize: {
        readonly type: import("vue").PropType<(size: number) => string>;
        readonly default: (size: number) => string;
    };
    readonly searchDebounce: {
        readonly type: NumberConstructor;
        readonly default: 300;
    };
}>> & Readonly<{
    onInput?: ((value: string) => any) | undefined;
    onSearch?: ((keyword: string, trigger: string) => any) | undefined;
    onSelect?: ((option: import("./index.js").AiMentionOption, trigger: string) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: string) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onKeydown?: ((event: KeyboardEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    "onFile-load"?: ((_type: "table" | "document" | "knowledge" | "file", _nodes: import("./index.js").AiMentionFileNode[]) => any) | undefined;
    "onFile-select"?: ((node: import("./index.js").AiMentionFileNode, option: import("./index.js").AiMentionOption) => any) | undefined;
}>, {
    focus: () => void;
    blur: () => void;
    clear: () => void;
    getRef: () => HTMLTextAreaElement | HTMLInputElement | undefined | null;
    insertMention: (option: import("./index.js").AiMentionOption, trigger?: string) => void;
    refreshFileTree: () => void;
    toggleFolder: (key: string) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    input: (value: string) => void;
    search: (keyword: string, trigger: string) => void;
    select: (option: import("./index.js").AiMentionOption, trigger: string) => void;
    focus: (event: FocusEvent) => void;
    change: (value: string) => void;
    blur: (event: FocusEvent) => void;
    keydown: (event: KeyboardEvent) => void;
    "update:modelValue": (value: string) => void;
    "file-load": (_type: "table" | "document" | "knowledge" | "file", _nodes: import("./index.js").AiMentionFileNode[]) => void;
    "file-select": (node: import("./index.js").AiMentionFileNode, option: import("./index.js").AiMentionOption) => void;
}, string, {
    readonly loading: boolean;
    readonly type: "input" | "textarea";
    readonly disabled: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly modelValue: string;
    readonly rows: number;
    readonly options: import("./index.js").AiMentionOption[];
    readonly triggers: string[];
    readonly filterOption: false | ((keyword: string, option: import("../index.js").MentionOption) => boolean);
    readonly types: ("table" | "agent" | "document" | "knowledge" | "file")[];
    readonly enableFileTree: boolean;
    readonly fileLoader: import("./index.js").AiMentionFileLoader;
    readonly fileRoot: string;
    readonly fileTreeExpandedLevel: number;
    readonly showFileIcon: boolean;
    readonly showFileSize: boolean;
    readonly showModifiedTime: boolean;
    readonly formatFileSize: (size: number) => string;
    readonly searchDebounce: number;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        [x: string]: ((props: any) => any) | undefined;
    };
})> & Record<string, unknown>;
export default YhAiMention;
export * from './src/ai-mention';
export type AiMentionInstance = InstanceType<typeof AiMention>;
