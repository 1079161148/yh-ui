import type { NotificationProps } from './notification';
declare var __VLS_9: {}, __VLS_11: {};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_9) => any;
} & {
    default?: (props: typeof __VLS_11) => any;
};
declare const __VLS_component: import("vue").DefineComponent<NotificationProps, {
    visible: import("vue").Ref<boolean, boolean>;
    close: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: () => any;
    destroy: () => any;
}, string, import("vue").PublicProps, Readonly<NotificationProps> & Readonly<{
    onClick?: (() => any) | undefined;
    onDestroy?: (() => any) | undefined;
}>, {
    position: import("./notification").NotificationPosition;
    offset: number;
    duration: number;
    showClose: boolean;
    dangerouslyUseHTMLString: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
