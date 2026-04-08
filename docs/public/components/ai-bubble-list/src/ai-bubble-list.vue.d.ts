import { type AiBubbleListItem } from './ai-bubble-list';
declare var __VLS_1: {
    item: AiBubbleListItem;
    index: number;
}, __VLS_6: {
    item: AiBubbleListItem;
    index: number;
}, __VLS_11: {};
type __VLS_Slots = {} & {
    bubble?: (props: typeof __VLS_1) => any;
} & {
    bubble?: (props: typeof __VLS_6) => any;
} & {
    loading?: (props: typeof __VLS_11) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    items: {
        type: import("vue").PropType<AiBubbleListItem[]>;
        default: () => never[];
    };
    virtualScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: import("vue").PropType<number | string>;
        default: number;
    };
    itemHeight: {
        type: NumberConstructor;
        default: number;
    };
    autoScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    themeOverrides: {
        type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        default: undefined;
    };
}>, {
    scrollToBottom: () => void;
    scrollToIndex: (index: number) => void;
    scrollRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: import("vue").PropType<AiBubbleListItem[]>;
        default: () => never[];
    };
    virtualScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: import("vue").PropType<number | string>;
        default: number;
    };
    itemHeight: {
        type: NumberConstructor;
        default: number;
    };
    autoScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    themeOverrides: {
        type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    loading: boolean;
    height: string | number;
    themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    itemHeight: number;
    items: AiBubbleListItem[];
    virtualScroll: boolean;
    autoScroll: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
