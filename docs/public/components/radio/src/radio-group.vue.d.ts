import type { RadioGroupProps, RadioValueType } from './radio';
declare var __VLS_6: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_6) => any;
};
declare const __VLS_component: import("vue").DefineComponent<RadioGroupProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: RadioValueType) => any;
    "update:modelValue": (value: RadioValueType) => any;
}, string, import("vue").PublicProps, Readonly<RadioGroupProps> & Readonly<{
    onChange?: ((value: RadioValueType) => any) | undefined;
    "onUpdate:modelValue"?: ((value: RadioValueType) => any) | undefined;
}>, {
    tag: string | import("vue").Component;
    disabled: boolean;
    validateEvent: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
