interface Props {
    modelValue: number;
    vertical: boolean;
    disabled: boolean;
    min: number;
    max: number;
    step: number;
    showTooltip: boolean;
    formatTooltip?: (val: number) => string | number;
    tooltipClass?: string;
    placement?: string;
}
declare var __VLS_1: {
    value: number;
};
type __VLS_Slots = {} & {
    thumb?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<Props, {
    onButtonDown: (event: MouseEvent | TouchEvent) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    input: (value: number) => any;
    change: (value: number) => any;
    "update:modelValue": (value: number) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onInput?: ((value: number) => any) | undefined;
    onChange?: ((value: number) => any) | undefined;
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}>, {
    disabled: boolean;
    vertical: boolean;
    showTooltip: boolean;
    placement: string;
    formatTooltip: (val: number) => string | number;
    tooltipClass: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
