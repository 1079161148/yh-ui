/**
 * Mention Component
 * @description 提及组件导出
 */
import Mention from './src/mention.vue';
export declare const YhMention: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").MentionProps> & Readonly<{
        onInput?: ((value: string) => any) | undefined;
        onSearch?: ((keyword: string, trigger: string) => any) | undefined;
        onSelect?: ((option: import("./index.js").MentionOption, trigger: string) => any) | undefined;
        onClear?: (() => any) | undefined;
        onClose?: (() => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((value: string) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        onKeydown?: ((event: KeyboardEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string) => any) | undefined;
        onOpen?: (() => any) | undefined;
    }>, {
        ref: HTMLInputElement | HTMLTextAreaElement | undefined;
        wrapperRef: HTMLElement | undefined;
        focus: () => void;
        blur: () => void;
        clear: () => void;
        insertMention: (option: import("./index.js").MentionOption, trigger?: string) => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        input: (value: string) => any;
        search: (keyword: string, trigger: string) => any;
        select: (option: import("./index.js").MentionOption, trigger: string) => any;
        clear: () => any;
        close: () => any;
        focus: (event: FocusEvent) => any;
        change: (value: string) => any;
        blur: (event: FocusEvent) => any;
        keydown: (event: KeyboardEvent) => any;
        "update:modelValue": (value: string) => any;
        open: () => any;
    }, import("vue").PublicProps, {
        size: import("./index.js").MentionSize;
        split: string;
        loading: boolean;
        readonly: boolean;
        type: "input" | "textarea";
        disabled: boolean;
        autofocus: boolean;
        modelValue: string;
        clearable: boolean;
        showWordLimit: boolean;
        validateEvent: boolean;
        rows: number;
        options: import("./index.js").MentionOption[];
        debounce: number;
        placement: import("./index.js").MentionPlacement;
        popperClass: string;
        teleported: boolean;
        loadingText: string;
        noDataText: string;
        triggers: string[];
        maxCount: number;
        filterOption: ((keyword: string, option: import("./index.js").MentionOption) => boolean) | false;
        wholeWord: boolean;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").MentionProps> & Readonly<{
        onInput?: ((value: string) => any) | undefined;
        onSearch?: ((keyword: string, trigger: string) => any) | undefined;
        onSelect?: ((option: import("./index.js").MentionOption, trigger: string) => any) | undefined;
        onClear?: (() => any) | undefined;
        onClose?: (() => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((value: string) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        onKeydown?: ((event: KeyboardEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string) => any) | undefined;
        onOpen?: (() => any) | undefined;
    }>, {
        ref: HTMLInputElement | HTMLTextAreaElement | undefined;
        wrapperRef: HTMLElement | undefined;
        focus: () => void;
        blur: () => void;
        clear: () => void;
        insertMention: (option: import("./index.js").MentionOption, trigger?: string) => void;
    }, {}, {}, {}, {
        size: import("./index.js").MentionSize;
        split: string;
        loading: boolean;
        readonly: boolean;
        type: "input" | "textarea";
        disabled: boolean;
        autofocus: boolean;
        modelValue: string;
        clearable: boolean;
        showWordLimit: boolean;
        validateEvent: boolean;
        rows: number;
        options: import("./index.js").MentionOption[];
        debounce: number;
        placement: import("./index.js").MentionPlacement;
        popperClass: string;
        teleported: boolean;
        loadingText: string;
        noDataText: string;
        triggers: string[];
        maxCount: number;
        filterOption: ((keyword: string, option: import("./index.js").MentionOption) => boolean) | false;
        wholeWord: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").MentionProps> & Readonly<{
    onInput?: ((value: string) => any) | undefined;
    onSearch?: ((keyword: string, trigger: string) => any) | undefined;
    onSelect?: ((option: import("./index.js").MentionOption, trigger: string) => any) | undefined;
    onClear?: (() => any) | undefined;
    onClose?: (() => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: string) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onKeydown?: ((event: KeyboardEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onOpen?: (() => any) | undefined;
}>, {
    ref: HTMLInputElement | HTMLTextAreaElement | undefined;
    wrapperRef: HTMLElement | undefined;
    focus: () => void;
    blur: () => void;
    clear: () => void;
    insertMention: (option: import("./index.js").MentionOption, trigger?: string) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    input: (value: string) => any;
    search: (keyword: string, trigger: string) => any;
    select: (option: import("./index.js").MentionOption, trigger: string) => any;
    clear: () => any;
    close: () => any;
    focus: (event: FocusEvent) => any;
    change: (value: string) => any;
    blur: (event: FocusEvent) => any;
    keydown: (event: KeyboardEvent) => any;
    "update:modelValue": (value: string) => any;
    open: () => any;
}, string, {
    size: import("./index.js").MentionSize;
    split: string;
    loading: boolean;
    readonly: boolean;
    type: "input" | "textarea";
    disabled: boolean;
    autofocus: boolean;
    modelValue: string;
    clearable: boolean;
    showWordLimit: boolean;
    validateEvent: boolean;
    rows: number;
    options: import("./index.js").MentionOption[];
    debounce: number;
    placement: import("./index.js").MentionPlacement;
    popperClass: string;
    teleported: boolean;
    loadingText: string;
    noDataText: string;
    triggers: string[];
    maxCount: number;
    filterOption: ((keyword: string, option: import("./index.js").MentionOption) => boolean) | false;
    wholeWord: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        prefix?: (props: {}) => any;
    } & {
        suffix?: (props: {}) => any;
    } & {
        loading?: (props: {}) => any;
    } & {
        empty?: (props: {}) => any;
    } & {
        option?: (props: {
            option: import("./index.js").MentionOption;
            keyword: string;
        }) => any;
    };
})> & Record<string, unknown>;
export default YhMention;
export * from './src/mention';
export type MentionInstance = InstanceType<typeof Mention>;
export type YhMentionInstance = MentionInstance;
export type YhMentionProps = import('./src/mention').MentionProps;
export type YhMentionEmits = import('./src/mention').MentionEmits;
export type YhMentionSlots = import('./src/mention').MentionSlots;
export type YhMentionExpose = import('./src/mention').MentionExpose;
export type YhMentionOption = import('./src/mention').MentionOption;
export type YhMentionTriggerPosition = import('./src/mention').MentionTriggerPosition;
export type YhMentionPlacement = import('./src/mention').MentionPlacement;
export type YhMentionSize = import('./src/mention').MentionSize;
