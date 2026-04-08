import type { TagProps } from './tag';
declare var __VLS_1: {}, __VLS_7: {}, __VLS_9: {}, __VLS_15: {};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_7) => any;
} & {
    suffixIcon?: (props: typeof __VLS_9) => any;
} & {
    closeIcon?: (props: typeof __VLS_15) => any;
};
declare const __VLS_component: import("vue").DefineComponent<TagProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    close: (event: MouseEvent) => any;
    edit: (value: string) => any;
    change: (checked: boolean) => any;
    click: (event: MouseEvent) => any;
    "update:checked": (checked: boolean) => any;
}, string, import("vue").PublicProps, Readonly<TagProps> & Readonly<{
    onClose?: ((event: MouseEvent) => any) | undefined;
    onEdit?: ((value: string) => any) | undefined;
    onChange?: ((checked: boolean) => any) | undefined;
    onClick?: ((event: MouseEvent) => any) | undefined;
    "onUpdate:checked"?: ((checked: boolean) => any) | undefined;
}>, {
    size: import("./tag").TagSize;
    effect: import("./tag").TagEffect;
    type: import("./tag").TagType;
    round: boolean;
    closable: boolean;
    checked: boolean;
    disableTransitions: boolean;
    hit: boolean;
    checkable: boolean;
    editable: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
