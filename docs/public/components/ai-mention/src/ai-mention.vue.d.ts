import { type AiMentionOption, type AiMentionFileNode } from './ai-mention';
declare var __VLS_22: string, __VLS_23: any;
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_22>]?: (props: typeof __VLS_23) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly types: {
        readonly type: import("vue").PropType<import("./ai-mention").AiMentionType[]>;
        readonly default: () => string[];
    };
    readonly options: {
        readonly type: import("vue").PropType<AiMentionOption[]>;
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
        readonly type: import("vue").PropType<((keyword: string, option: import("../..").MentionOption) => boolean) | false>;
        readonly default: undefined;
    };
    readonly enableFileTree: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly fileLoader: {
        readonly type: import("vue").PropType<import("./ai-mention").AiMentionFileLoader>;
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
}>, {
    focus: () => void;
    blur: () => void;
    clear: () => void;
    getRef: () => HTMLTextAreaElement | HTMLInputElement | undefined | null;
    insertMention: (option: AiMentionOption, trigger?: string) => void;
    refreshFileTree: () => void;
    toggleFolder: (key: string) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    input: (value: string) => void;
    search: (keyword: string, trigger: string) => void;
    select: (option: AiMentionOption, trigger: string) => void;
    focus: (event: FocusEvent) => void;
    change: (value: string) => void;
    blur: (event: FocusEvent) => void;
    keydown: (event: KeyboardEvent) => void;
    "update:modelValue": (value: string) => void;
    "file-load": (_type: "table" | "document" | "knowledge" | "file", _nodes: AiMentionFileNode[]) => void;
    "file-select": (node: AiMentionFileNode, option: AiMentionOption) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly types: {
        readonly type: import("vue").PropType<import("./ai-mention").AiMentionType[]>;
        readonly default: () => string[];
    };
    readonly options: {
        readonly type: import("vue").PropType<AiMentionOption[]>;
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
        readonly type: import("vue").PropType<((keyword: string, option: import("../..").MentionOption) => boolean) | false>;
        readonly default: undefined;
    };
    readonly enableFileTree: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly fileLoader: {
        readonly type: import("vue").PropType<import("./ai-mention").AiMentionFileLoader>;
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
    onSelect?: ((option: AiMentionOption, trigger: string) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: string) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onKeydown?: ((event: KeyboardEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    "onFile-load"?: ((_type: "table" | "document" | "knowledge" | "file", _nodes: AiMentionFileNode[]) => any) | undefined;
    "onFile-select"?: ((node: AiMentionFileNode, option: AiMentionOption) => any) | undefined;
}>, {
    readonly loading: boolean;
    readonly type: "input" | "textarea";
    readonly disabled: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly modelValue: string;
    readonly rows: number;
    readonly options: AiMentionOption[];
    readonly triggers: string[];
    readonly filterOption: false | ((keyword: string, option: import("../..").MentionOption) => boolean);
    readonly types: ("table" | "agent" | "document" | "knowledge" | "file")[];
    readonly enableFileTree: boolean;
    readonly fileLoader: import("./ai-mention").AiMentionFileLoader;
    readonly fileRoot: string;
    readonly fileTreeExpandedLevel: number;
    readonly showFileIcon: boolean;
    readonly showFileSize: boolean;
    readonly showModifiedTime: boolean;
    readonly formatFileSize: (size: number) => string;
    readonly searchDebounce: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
