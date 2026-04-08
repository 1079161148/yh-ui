import type { RadioButtonProps, RadioValueType } from './radio';
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<RadioButtonProps, {
    ref: HTMLInputElement | undefined;
    focus: () => void;
    blur: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: RadioValueType) => any;
    "update:modelValue": (value: RadioValueType) => any;
}, string, import("vue").PublicProps, Readonly<RadioButtonProps> & Readonly<{
    onChange?: ((value: RadioValueType) => any) | undefined;
    "onUpdate:modelValue"?: ((value: RadioValueType) => any) | undefined;
}>, {
    disabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
