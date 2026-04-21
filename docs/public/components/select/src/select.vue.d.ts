import type { SelectProps, SelectOption, SelectValue } from './select';
declare var __VLS_9: {}, __VLS_11: {
    option: SelectOption;
}, __VLS_13: {
    option: SelectOption;
}, __VLS_15: {};
type __VLS_Slots = {} & {
    empty?: (props: typeof __VLS_9) => any;
} & {
    option?: (props: typeof __VLS_11) => any;
} & {
    option?: (props: typeof __VLS_13) => any;
} & {
    default?: (props: typeof __VLS_15) => any;
};
declare const __VLS_component: import("vue").DefineComponent<SelectProps, {
    focus: () => void;
    blur: () => void;
    inputRef: import("vue").Ref<HTMLInputElement | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    clear: () => any;
    focus: (event: FocusEvent) => any;
    change: (value: SelectValue | SelectValue[] | undefined) => any;
    blur: (event: FocusEvent) => any;
    "update:modelValue": (value: SelectValue | SelectValue[] | undefined) => any;
    "visible-change": (visible: boolean) => any;
    "remove-tag": (value: SelectValue) => any;
}, string, import("vue").PublicProps, Readonly<SelectProps> & Readonly<{
    onClear?: (() => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: SelectValue | SelectValue[] | undefined) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: SelectValue | SelectValue[] | undefined) => any) | undefined;
    "onVisible-change"?: ((visible: boolean) => any) | undefined;
    "onRemove-tag"?: ((value: SelectValue) => any) | undefined;
}>, {
    size: import("./select").SelectSize;
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
    tagType: import("./select").SelectTagType;
    virtualScroll: boolean;
    labelKey: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
