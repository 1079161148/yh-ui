import type { AutocompleteProps, AutocompleteSuggestion } from './autocomplete';
declare var __VLS_1: {}, __VLS_3: {}, __VLS_9: {}, __VLS_15: {}, __VLS_25: {}, __VLS_27: {
    item: {
        [x: string]: string | number | boolean | object | undefined;
        value: string;
    };
}, __VLS_29: {};
type __VLS_Slots = {} & {
    prepend?: (props: typeof __VLS_1) => any;
} & {
    prefix?: (props: typeof __VLS_3) => any;
} & {
    suffix?: (props: typeof __VLS_9) => any;
} & {
    append?: (props: typeof __VLS_15) => any;
} & {
    loading?: (props: typeof __VLS_25) => any;
} & {
    default?: (props: typeof __VLS_27) => any;
} & {
    empty?: (props: typeof __VLS_29) => any;
};
declare const __VLS_component: import("vue").DefineComponent<AutocompleteProps, {
    focus: () => void;
    blur: () => void;
    close: () => void;
    highlight: (index: number) => void;
    inputRef: HTMLInputElement | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    input: (value: string) => any;
    select: (item: AutocompleteSuggestion) => any;
    clear: () => any;
    focus: (event: FocusEvent) => any;
    change: (value: string) => any;
    blur: (event: FocusEvent) => any;
    "update:modelValue": (value: string) => any;
}, string, import("vue").PublicProps, Readonly<AutocompleteProps> & Readonly<{
    onInput?: ((value: string) => any) | undefined;
    onSelect?: ((item: AutocompleteSuggestion) => any) | undefined;
    onClear?: (() => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: string) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
    size: import("./autocomplete").AutocompleteSize;
    autocomplete: string;
    disabled: boolean;
    autofocus: boolean;
    clearable: boolean;
    validateEvent: boolean;
    triggerOnFocus: boolean;
    debounce: number;
    placement: import("./autocomplete").AutocompletePlacement;
    valueKey: string;
    teleported: boolean;
    fitInputWidth: boolean;
    highlightFirstItem: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
