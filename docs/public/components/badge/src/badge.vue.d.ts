import type { BadgeProps } from './badge';
declare var __VLS_1: {}, __VLS_7: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    content?: (props: typeof __VLS_7) => any;
};
declare const __VLS_component: import("vue").DefineComponent<BadgeProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BadgeProps> & Readonly<{}>, {
    hidden: boolean;
    type: import("./badge").BadgeType;
    max: number;
    isDot: boolean;
    showBorder: boolean;
    showZero: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
