/**
 * InputTag Component
 * @description 标签输入框组件导出
 */
import InputTag from './src/input-tag.vue';
export declare const YhInputTag: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").InputTagProps> & Readonly<{
        onInput?: ((value: string) => any) | undefined;
        onClear?: (() => any) | undefined;
        onAdd?: ((tag: string) => any) | undefined;
        onRemove?: ((tag: string, index: number) => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((value: string[]) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string[]) => any) | undefined;
        "onDrag-end"?: ((tags: string[]) => any) | undefined;
    }>, {
        focus: () => void;
        blur: () => void;
        clear: () => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        input: (value: string) => any;
        clear: () => any;
        add: (tag: string) => any;
        remove: (tag: string, index: number) => any;
        focus: (event: FocusEvent) => any;
        change: (value: string[]) => any;
        blur: (event: FocusEvent) => any;
        "update:modelValue": (value: string[]) => any;
        "drag-end": (tags: string[]) => any;
    }, import("vue").PublicProps, {
        size: import("./index.js").InputTagSize;
        trim: boolean;
        placeholder: string;
        readonly: boolean;
        type: import("./index.js").InputTagType;
        disabled: boolean;
        modelValue: string[];
        clearable: boolean;
        validateEvent: boolean;
        separator: string | string[];
        addOnBlur: boolean;
        closable: boolean;
        allowDuplicate: boolean;
        collapseTags: boolean;
        collapseTagsTooltip: boolean;
        maxCollapseTags: number;
        draggable: boolean;
        tagEffect: "dark" | "light" | "plain";
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").InputTagProps> & Readonly<{
        onInput?: ((value: string) => any) | undefined;
        onClear?: (() => any) | undefined;
        onAdd?: ((tag: string) => any) | undefined;
        onRemove?: ((tag: string, index: number) => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((value: string[]) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string[]) => any) | undefined;
        "onDrag-end"?: ((tags: string[]) => any) | undefined;
    }>, {
        focus: () => void;
        blur: () => void;
        clear: () => void;
    }, {}, {}, {}, {
        size: import("./index.js").InputTagSize;
        trim: boolean;
        placeholder: string;
        readonly: boolean;
        type: import("./index.js").InputTagType;
        disabled: boolean;
        modelValue: string[];
        clearable: boolean;
        validateEvent: boolean;
        separator: string | string[];
        addOnBlur: boolean;
        closable: boolean;
        allowDuplicate: boolean;
        collapseTags: boolean;
        collapseTagsTooltip: boolean;
        maxCollapseTags: number;
        draggable: boolean;
        tagEffect: "dark" | "light" | "plain";
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").InputTagProps> & Readonly<{
    onInput?: ((value: string) => any) | undefined;
    onClear?: (() => any) | undefined;
    onAdd?: ((tag: string) => any) | undefined;
    onRemove?: ((tag: string, index: number) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: string[]) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string[]) => any) | undefined;
    "onDrag-end"?: ((tags: string[]) => any) | undefined;
}>, {
    focus: () => void;
    blur: () => void;
    clear: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    input: (value: string) => any;
    clear: () => any;
    add: (tag: string) => any;
    remove: (tag: string, index: number) => any;
    focus: (event: FocusEvent) => any;
    change: (value: string[]) => any;
    blur: (event: FocusEvent) => any;
    "update:modelValue": (value: string[]) => any;
    "drag-end": (tags: string[]) => any;
}, string, {
    size: import("./index.js").InputTagSize;
    trim: boolean;
    placeholder: string;
    readonly: boolean;
    type: import("./index.js").InputTagType;
    disabled: boolean;
    modelValue: string[];
    clearable: boolean;
    validateEvent: boolean;
    separator: string | string[];
    addOnBlur: boolean;
    closable: boolean;
    allowDuplicate: boolean;
    collapseTags: boolean;
    collapseTagsTooltip: boolean;
    maxCollapseTags: number;
    draggable: boolean;
    tagEffect: "dark" | "light" | "plain";
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        prefix?: (props: {}) => any;
    } & {
        tag?: (props: {
            tag: string;
            index: number;
            close: () => void;
        }) => any;
    } & {
        collapseTag?: (props: {
            count: number;
            tags: string[];
        }) => any;
    } & {
        clearIcon?: (props: {}) => any;
    } & {
        suffix?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhInputTag;
export * from './src/input-tag';
export type InputTagInstance = InstanceType<typeof InputTag>;
