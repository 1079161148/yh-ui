import type { TypographyTextProps } from './typography';
declare var __VLS_6: {}, __VLS_8: {}, __VLS_10: {}, __VLS_12: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_6) => any;
} & {
    default?: (props: typeof __VLS_8) => any;
} & {
    default?: (props: typeof __VLS_10) => any;
} & {
    default?: (props: typeof __VLS_12) => any;
};
declare const __VLS_component: import("vue").DefineComponent<TypographyTextProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TypographyTextProps> & Readonly<{}>, {
    code: boolean;
    mark: boolean;
    delete: boolean;
    bold: boolean;
    tag: string;
    italic: boolean;
    underline: boolean;
    ellipsis: boolean;
    keyboard: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
