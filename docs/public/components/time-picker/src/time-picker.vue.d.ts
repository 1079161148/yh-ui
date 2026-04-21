import type { TimePickerProps, TimeValue } from './time-picker';
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
    prefix?: (props: typeof __VLS_1) => any;
} & {
    rangeSeparator?: (props: typeof __VLS_3) => any;
};
declare const __VLS_component: import("vue").DefineComponent<TimePickerProps, {
    focus: () => void;
    blur: () => void;
    open: () => void;
    close: () => void;
    inputRef: import("vue").Ref<HTMLInputElement | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    clear: () => any;
    confirm: (value: string | number | Date | [TimeValue, TimeValue] | null) => any;
    cancel: () => any;
    focus: (event: FocusEvent) => any;
    change: (value: string | number | Date | [TimeValue, TimeValue] | null) => any;
    blur: (event: FocusEvent) => any;
    "update:modelValue": (value: string | number | Date | [TimeValue, TimeValue] | null) => any;
    "visible-change": (visible: boolean) => any;
}, string, import("vue").PublicProps, Readonly<TimePickerProps> & Readonly<{
    onClear?: (() => any) | undefined;
    onConfirm?: ((value: string | number | Date | [TimeValue, TimeValue] | null) => any) | undefined;
    onCancel?: (() => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: string | number | Date | [TimeValue, TimeValue] | null) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | number | Date | [TimeValue, TimeValue] | null) => any) | undefined;
    "onVisible-change"?: ((visible: boolean) => any) | undefined;
}>, {
    size: import("./time-picker").TimePickerSize;
    placeholder: string;
    startPlaceholder: string;
    endPlaceholder: string;
    disabled: boolean;
    clearable: boolean;
    tabindex: number | string;
    validateEvent: boolean;
    editable: boolean;
    format: string;
    teleported: boolean;
    showSeconds: boolean;
    arrowControl: boolean;
    hourStep: number;
    minuteStep: number;
    secondStep: number;
    use12Hours: boolean;
    isRange: boolean;
    popperOffset: number;
    rangeSeparator: string;
    hideOnBlur: boolean;
    confirmText: string;
    cancelText: string;
    nowText: string;
    showFooter: boolean;
    showNow: boolean;
    orderOnConfirm: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
