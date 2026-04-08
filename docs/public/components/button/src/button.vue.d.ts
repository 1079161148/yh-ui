import type { ButtonProps } from './button';
declare var __VLS_11: {}, __VLS_13: {}, __VLS_19: {}, __VLS_21: {}, __VLS_27: {};
type __VLS_Slots = {} & {
    loading?: (props: typeof __VLS_11) => any;
} & {
    icon?: (props: typeof __VLS_13) => any;
} & {
    default?: (props: typeof __VLS_19) => any;
} & {
    icon?: (props: typeof __VLS_21) => any;
} & {
    suffixIcon?: (props: typeof __VLS_27) => any;
};
declare const __VLS_component: import("vue").DefineComponent<ButtonProps, {
    ref: HTMLElement | undefined;
    size: import("./button").ButtonSize;
    type: import("./button").ButtonType;
    disabled: boolean;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (event: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<ButtonProps> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
}>, {
    link: boolean;
    loading: boolean;
    tag: string | import("vue").Component;
    text: boolean;
    type: import("./button").ButtonType;
    disabled: boolean;
    circle: boolean;
    round: boolean;
    plain: boolean;
    nativeType: import("./button").ButtonNativeType;
    autofocus: boolean;
    iconPosition: import("./button").IconPosition;
    block: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
