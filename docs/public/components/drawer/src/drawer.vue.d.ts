import { type CSSProperties } from 'vue';
declare var __VLS_13: {}, __VLS_19: {}, __VLS_21: {}, __VLS_27: {}, __VLS_29: {};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_13) => any;
} & {
    title?: (props: typeof __VLS_19) => any;
} & {
    'close-icon'?: (props: typeof __VLS_21) => any;
} & {
    default?: (props: typeof __VLS_27) => any;
} & {
    footer?: (props: typeof __VLS_29) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly title: {
        readonly type: import("vue").PropType<import("./drawer").DrawerRenderContent>;
    };
    readonly placement: {
        readonly type: import("vue").PropType<import("./drawer").DrawerPlacement>;
        readonly default: "right";
    };
    readonly size: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "30%";
    };
    readonly modal: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly closeOnClickModal: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly closeOnPressEscape: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showClose: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly closeIcon: {
        readonly type: StringConstructor;
        readonly default: "close";
    };
    readonly destroyOnClose: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
    };
    readonly teleportTo: {
        readonly type: import("vue").PropType<string | HTMLElement>;
        readonly default: "body";
    };
    readonly showHeader: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showFooter: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly customClass: StringConstructor;
    readonly modalClass: StringConstructor;
    readonly lockScroll: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly glass: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly resizable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly minSize: {
        readonly type: NumberConstructor;
        readonly default: 150;
    };
    readonly maxSize: {
        readonly type: NumberConstructor;
        readonly default: 1000;
    };
    readonly beforeClose: {
        readonly type: import("vue").PropType<(done: () => void) => void>;
    };
    readonly titleStyle: import("vue").PropType<CSSProperties | string>;
    readonly contentStyle: import("vue").PropType<CSSProperties | string>;
    readonly footerStyle: import("vue").PropType<CSSProperties | string>;
    readonly round: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly inner: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly drawerStyle: import("vue").PropType<CSSProperties | string>;
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {
    drawerRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    handleClose: (isClickModal?: boolean) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => void;
    closed: () => void;
    resize: (size: number) => void;
    "update:modelValue": (value: boolean) => void;
    open: () => void;
    opened: () => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly title: {
        readonly type: import("vue").PropType<import("./drawer").DrawerRenderContent>;
    };
    readonly placement: {
        readonly type: import("vue").PropType<import("./drawer").DrawerPlacement>;
        readonly default: "right";
    };
    readonly size: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "30%";
    };
    readonly modal: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly closeOnClickModal: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly closeOnPressEscape: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showClose: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly closeIcon: {
        readonly type: StringConstructor;
        readonly default: "close";
    };
    readonly destroyOnClose: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
    };
    readonly teleportTo: {
        readonly type: import("vue").PropType<string | HTMLElement>;
        readonly default: "body";
    };
    readonly showHeader: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showFooter: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly customClass: StringConstructor;
    readonly modalClass: StringConstructor;
    readonly lockScroll: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly glass: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly resizable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly minSize: {
        readonly type: NumberConstructor;
        readonly default: 150;
    };
    readonly maxSize: {
        readonly type: NumberConstructor;
        readonly default: 1000;
    };
    readonly beforeClose: {
        readonly type: import("vue").PropType<(done: () => void) => void>;
    };
    readonly titleStyle: import("vue").PropType<CSSProperties | string>;
    readonly contentStyle: import("vue").PropType<CSSProperties | string>;
    readonly footerStyle: import("vue").PropType<CSSProperties | string>;
    readonly round: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly inner: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly drawerStyle: import("vue").PropType<CSSProperties | string>;
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onClose?: (() => any) | undefined;
    onClosed?: (() => any) | undefined;
    onResize?: ((size: number) => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onOpen?: (() => any) | undefined;
    onOpened?: (() => any) | undefined;
}>, {
    readonly size: string | number;
    readonly round: boolean;
    readonly modal: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly modelValue: boolean;
    readonly inner: boolean;
    readonly placement: import("./drawer").DrawerPlacement;
    readonly showFooter: boolean;
    readonly glass: boolean;
    readonly closeIcon: string;
    readonly lockScroll: boolean;
    readonly closeOnClickModal: boolean;
    readonly closeOnPressEscape: boolean;
    readonly showClose: boolean;
    readonly destroyOnClose: boolean;
    readonly teleportTo: string | HTMLElement;
    readonly showHeader: boolean;
    readonly resizable: boolean;
    readonly minSize: number;
    readonly maxSize: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
