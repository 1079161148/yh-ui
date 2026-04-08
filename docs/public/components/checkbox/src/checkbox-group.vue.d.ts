import type { CheckboxGroupProps, CheckboxValueType } from './checkbox';
declare var __VLS_6: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_6) => any;
};
declare const __VLS_component: import("vue").DefineComponent<CheckboxGroupProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: CheckboxValueType[]) => any;
    "update:modelValue": (value: CheckboxValueType[]) => any;
}, string, import("vue").PublicProps, Readonly<CheckboxGroupProps> & Readonly<{
    onChange?: ((value: CheckboxValueType[]) => any) | undefined;
    "onUpdate:modelValue"?: ((value: CheckboxValueType[]) => any) | undefined;
}>, {
    tag: string | import("vue").Component;
    disabled: boolean;
    modelValue: CheckboxValueType[];
    validateEvent: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
