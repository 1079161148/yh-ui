/**
 * Select Component
 * @description 选择器组件导出
 */
import Select from './src/select.vue';
import Option from './src/option.vue';
export declare const YhSelect: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").SelectProps> & Readonly<{
        onClear?: (() => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((value: import("./index.js").SelectValue | import("./index.js").SelectValue[] | undefined) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import("./index.js").SelectValue | import("./index.js").SelectValue[] | undefined) => any) | undefined;
        "onVisible-change"?: ((visible: boolean) => any) | undefined;
        "onRemove-tag"?: ((value: import("./index.js").SelectValue) => any) | undefined;
    }>, {
        focus: () => void;
        blur: () => void;
        inputRef: HTMLInputElement | undefined;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        clear: () => any;
        focus: (event: FocusEvent) => any;
        change: (value: import("./index.js").SelectValue | import("./index.js").SelectValue[] | undefined) => any;
        blur: (event: FocusEvent) => any;
        "update:modelValue": (value: import("./index.js").SelectValue | import("./index.js").SelectValue[] | undefined) => any;
        "visible-change": (visible: boolean) => any;
        "remove-tag": (value: import("./index.js").SelectValue) => any;
    }, import("vue").PublicProps, {
        size: import("./index.js").SelectSize;
        loading: boolean;
        disabled: boolean;
        height: number;
        itemHeight: number;
        clearable: boolean;
        validateEvent: boolean;
        multiple: boolean;
        collapseTags: boolean;
        collapseTagsTooltip: boolean;
        maxCollapseTags: number;
        valueKey: string;
        teleported: boolean;
        fitInputWidth: boolean;
        multipleLimit: number;
        filterable: boolean;
        remote: boolean;
        loadingText: string;
        noMatchText: string;
        noDataText: string;
        allowCreate: boolean;
        tagType: import("./index.js").SelectTagType;
        virtualScroll: boolean;
        labelKey: string;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").SelectProps> & Readonly<{
        onClear?: (() => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((value: import("./index.js").SelectValue | import("./index.js").SelectValue[] | undefined) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import("./index.js").SelectValue | import("./index.js").SelectValue[] | undefined) => any) | undefined;
        "onVisible-change"?: ((visible: boolean) => any) | undefined;
        "onRemove-tag"?: ((value: import("./index.js").SelectValue) => any) | undefined;
    }>, {
        focus: () => void;
        blur: () => void;
        inputRef: HTMLInputElement | undefined;
    }, {}, {}, {}, {
        size: import("./index.js").SelectSize;
        loading: boolean;
        disabled: boolean;
        height: number;
        itemHeight: number;
        clearable: boolean;
        validateEvent: boolean;
        multiple: boolean;
        collapseTags: boolean;
        collapseTagsTooltip: boolean;
        maxCollapseTags: number;
        valueKey: string;
        teleported: boolean;
        fitInputWidth: boolean;
        multipleLimit: number;
        filterable: boolean;
        remote: boolean;
        loadingText: string;
        noMatchText: string;
        noDataText: string;
        allowCreate: boolean;
        tagType: import("./index.js").SelectTagType;
        virtualScroll: boolean;
        labelKey: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").SelectProps> & Readonly<{
    onClear?: (() => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: import("./index.js").SelectValue | import("./index.js").SelectValue[] | undefined) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: import("./index.js").SelectValue | import("./index.js").SelectValue[] | undefined) => any) | undefined;
    "onVisible-change"?: ((visible: boolean) => any) | undefined;
    "onRemove-tag"?: ((value: import("./index.js").SelectValue) => any) | undefined;
}>, {
    focus: () => void;
    blur: () => void;
    inputRef: HTMLInputElement | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    clear: () => any;
    focus: (event: FocusEvent) => any;
    change: (value: import("./index.js").SelectValue | import("./index.js").SelectValue[] | undefined) => any;
    blur: (event: FocusEvent) => any;
    "update:modelValue": (value: import("./index.js").SelectValue | import("./index.js").SelectValue[] | undefined) => any;
    "visible-change": (visible: boolean) => any;
    "remove-tag": (value: import("./index.js").SelectValue) => any;
}, string, {
    size: import("./index.js").SelectSize;
    loading: boolean;
    disabled: boolean;
    height: number;
    itemHeight: number;
    clearable: boolean;
    validateEvent: boolean;
    multiple: boolean;
    collapseTags: boolean;
    collapseTagsTooltip: boolean;
    maxCollapseTags: number;
    valueKey: string;
    teleported: boolean;
    fitInputWidth: boolean;
    multipleLimit: number;
    filterable: boolean;
    remote: boolean;
    loadingText: string;
    noMatchText: string;
    noDataText: string;
    allowCreate: boolean;
    tagType: import("./index.js").SelectTagType;
    virtualScroll: boolean;
    labelKey: string;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        empty?: (props: {}) => any;
    } & {
        option?: (props: {
            option: import("./index.js").SelectOption;
        }) => any;
    } & {
        option?: (props: {
            option: import("./index.js").SelectOption;
        }) => any;
    } & {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export declare const YhOption: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").OptionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        disabled: boolean;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").OptionProps> & Readonly<{}>, {}, {}, {}, {}, {
        disabled: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").OptionProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    disabled: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhSelect;
export * from './src/select';
export type SelectInstance = InstanceType<typeof Select>;
export type OptionInstance = InstanceType<typeof Option>;
