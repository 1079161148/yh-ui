import type { MessageProps } from './message';
declare var __VLS_9: {}, __VLS_11: {};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_9) => any;
} & {
    default?: (props: typeof __VLS_11) => any;
};
declare const __VLS_component: import("vue").DefineComponent<MessageProps, {
    visible: import("vue").Ref<boolean, boolean>;
    close: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    destroy: () => any;
}, string, import("vue").PublicProps, Readonly<MessageProps> & Readonly<{
    onDestroy?: (() => any) | undefined;
}>, {
    type: import("./message").MessageType;
    center: boolean;
    offset: number;
    duration: number;
    placement: import("./message").MessagePlacement;
    showClose: boolean;
    dangerouslyUseHTMLString: boolean;
    grouping: boolean;
    repeatNum: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
