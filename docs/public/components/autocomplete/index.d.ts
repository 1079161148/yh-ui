/**
 * Autocomplete Component
 * @description 自动补全输入框组件导出
 */
import Autocomplete from './src/autocomplete.vue';
export declare const YhAutocomplete: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").AutocompleteProps> & Readonly<{
        onInput?: ((value: string) => any) | undefined;
        onSelect?: ((item: import("./index.js").AutocompleteSuggestion) => any) | undefined;
        onClear?: (() => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((value: string) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    }>, {
        focus: () => void;
        blur: () => void;
        close: () => void;
        highlight: (index: number) => void;
        inputRef: HTMLInputElement | undefined;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        input: (value: string) => any;
        select: (item: import("./index.js").AutocompleteSuggestion) => any;
        clear: () => any;
        focus: (event: FocusEvent) => any;
        change: (value: string) => any;
        blur: (event: FocusEvent) => any;
        "update:modelValue": (value: string) => any;
    }, import("vue").PublicProps, {
        size: import("./index.js").AutocompleteSize;
        autocomplete: string;
        disabled: boolean;
        autofocus: boolean;
        clearable: boolean;
        validateEvent: boolean;
        triggerOnFocus: boolean;
        debounce: number;
        placement: import("./index.js").AutocompletePlacement;
        valueKey: string;
        teleported: boolean;
        fitInputWidth: boolean;
        highlightFirstItem: boolean;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").AutocompleteProps> & Readonly<{
        onInput?: ((value: string) => any) | undefined;
        onSelect?: ((item: import("./index.js").AutocompleteSuggestion) => any) | undefined;
        onClear?: (() => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((value: string) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    }>, {
        focus: () => void;
        blur: () => void;
        close: () => void;
        highlight: (index: number) => void;
        inputRef: HTMLInputElement | undefined;
    }, {}, {}, {}, {
        size: import("./index.js").AutocompleteSize;
        autocomplete: string;
        disabled: boolean;
        autofocus: boolean;
        clearable: boolean;
        validateEvent: boolean;
        triggerOnFocus: boolean;
        debounce: number;
        placement: import("./index.js").AutocompletePlacement;
        valueKey: string;
        teleported: boolean;
        fitInputWidth: boolean;
        highlightFirstItem: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").AutocompleteProps> & Readonly<{
    onInput?: ((value: string) => any) | undefined;
    onSelect?: ((item: import("./index.js").AutocompleteSuggestion) => any) | undefined;
    onClear?: (() => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: string) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
    focus: () => void;
    blur: () => void;
    close: () => void;
    highlight: (index: number) => void;
    inputRef: HTMLInputElement | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    input: (value: string) => any;
    select: (item: import("./index.js").AutocompleteSuggestion) => any;
    clear: () => any;
    focus: (event: FocusEvent) => any;
    change: (value: string) => any;
    blur: (event: FocusEvent) => any;
    "update:modelValue": (value: string) => any;
}, string, {
    size: import("./index.js").AutocompleteSize;
    autocomplete: string;
    disabled: boolean;
    autofocus: boolean;
    clearable: boolean;
    validateEvent: boolean;
    triggerOnFocus: boolean;
    debounce: number;
    placement: import("./index.js").AutocompletePlacement;
    valueKey: string;
    teleported: boolean;
    fitInputWidth: boolean;
    highlightFirstItem: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        prepend?: (props: {}) => any;
    } & {
        prefix?: (props: {}) => any;
    } & {
        suffix?: (props: {}) => any;
    } & {
        append?: (props: {}) => any;
    } & {
        loading?: (props: {}) => any;
    } & {
        default?: (props: {
            item: {
                [x: string]: string | number | boolean | object | undefined;
                value: string;
            };
        }) => any;
    } & {
        empty?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhAutocomplete;
export * from './src/autocomplete';
export type AutocompleteInstance = InstanceType<typeof Autocomplete>;
