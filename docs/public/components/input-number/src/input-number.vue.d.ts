import type { InputNumberProps } from './input-number';
declare var __VLS_1: {}, __VLS_3: {}, __VLS_9: {}, __VLS_15: {};
type __VLS_Slots = {} & {
    decreaseIcon?: (props: typeof __VLS_1) => any;
} & {
    prefix?: (props: typeof __VLS_3) => any;
} & {
    suffix?: (props: typeof __VLS_9) => any;
} & {
    increaseIcon?: (props: typeof __VLS_15) => any;
};
declare const __VLS_component: import("vue").DefineComponent<InputNumberProps, {
    focus: () => void | undefined;
    blur: () => void | undefined;
    clear: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    input: (value: number | undefined) => any;
    clear: () => any;
    focus: (event: FocusEvent) => any;
    change: (currentValue: number | undefined, oldValue: number | undefined) => any;
    blur: (event: FocusEvent) => any;
    "update:modelValue": (value: number | undefined) => any;
}, string, import("vue").PublicProps, Readonly<InputNumberProps> & Readonly<{
    onInput?: ((value: number | undefined) => any) | undefined;
    onClear?: (() => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((currentValue: number | undefined, oldValue: number | undefined) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: number | undefined) => any) | undefined;
}>, {
    size: import("./input-number").InputNumberSize;
    readonly: boolean;
    disabled: boolean;
    clearable: boolean;
    validateEvent: boolean;
    min: number;
    max: number;
    step: number;
    stepStrictly: boolean;
    controlsPosition: import("./input-number").ControlsPosition;
    controls: boolean;
    valueOnClear: number | null | "min" | "max";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
