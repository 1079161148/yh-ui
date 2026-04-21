import Dialog from './src/dialog.vue';
export declare const YhDialog: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly modelValue: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly title: {
            readonly type: import("vue").PropType<import("./index.js").RenderContent>;
        };
        readonly showIcon: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly style: {
            readonly type: import("vue").PropType<string | import("vue").CSSProperties>;
        };
        readonly titleClass: StringConstructor;
        readonly titleStyle: import("vue").PropType<import("vue").CSSProperties | string>;
        readonly transformOrigin: {
            readonly type: import("vue").PropType<"mouse" | "center">;
            readonly default: "mouse";
        };
        readonly type: {
            readonly type: import("vue").PropType<"error" | "success" | "warning" | "info" | "default">;
            readonly default: "default";
        };
        readonly loading: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly content: {
            readonly type: import("vue").PropType<import("./index.js").RenderContent>;
        };
        readonly contentClass: StringConstructor;
        readonly contentStyle: import("vue").PropType<import("vue").CSSProperties | string>;
        readonly action: {
            readonly type: import("vue").PropType<() => import("vue").VNode | import("vue").Component>;
        };
        readonly actionClass: StringConstructor;
        readonly actionStyle: import("vue").PropType<import("vue").CSSProperties | string>;
        readonly autoFocus: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly width: {
            readonly type: import("vue").PropType<string | number>;
            readonly default: "50%";
        };
        readonly top: {
            readonly type: StringConstructor;
            readonly default: "15vh";
        };
        readonly fullscreen: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly alignCenter: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly center: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly glass: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly draggable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly lockScroll: {
            readonly type: BooleanConstructor;
            readonly default: true;
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
        readonly overflow: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly showFooter: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly cancelText: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly confirmText: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly modalClass: StringConstructor;
        readonly customClass: StringConstructor;
        readonly zIndex: {
            readonly type: NumberConstructor;
            readonly default: 2000;
        };
        readonly beforeClose: {
            readonly type: import("vue").PropType<(done: () => void) => void>;
        };
        readonly teleportTo: {
            readonly type: import("vue").PropType<string | HTMLElement>;
            readonly default: "body";
        };
        readonly headerAlignCenter: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly headerAlign: {
            readonly type: import("vue").PropType<"left" | "center" | "right">;
            readonly default: "left";
        };
        readonly contentAlign: {
            readonly type: import("vue").PropType<"left" | "center" | "right">;
            readonly default: "left";
        };
        readonly footerAlignCenter: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly footerAlign: {
            readonly type: import("vue").PropType<"left" | "center" | "right">;
            readonly default: "right";
        };
        readonly swapFooterButtons: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onConfirm?: (() => any) | undefined;
        onCancel?: (() => any) | undefined;
        onClose?: (() => any) | undefined;
        onClosed?: (() => any) | undefined;
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        onOpen?: (() => any) | undefined;
        onOpened?: (() => any) | undefined;
        onDragStart?: ((evt: MouseEvent) => any) | undefined;
        onDragMove?: ((evt: MouseEvent) => any) | undefined;
        onDragEnd?: ((evt: MouseEvent) => any) | undefined;
    }>, {
        visible: import("vue").Ref<boolean>;
        dialogRef: import("vue").Ref<HTMLElement | null>;
        handleClose: () => void;
        handleCancel: () => void;
        handleConfirm: () => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        confirm: () => void;
        cancel: () => void;
        close: () => void;
        closed: () => void;
        "update:modelValue": (value: boolean) => void;
        open: () => void;
        opened: () => void;
        dragStart: (evt: MouseEvent) => void;
        dragMove: (evt: MouseEvent) => void;
        dragEnd: (evt: MouseEvent) => void;
    }, import("vue").PublicProps, {
        readonly overflow: boolean;
        readonly loading: boolean;
        readonly fullscreen: boolean;
        readonly type: "default" | "error" | "success" | "warning" | "info";
        readonly center: boolean;
        readonly top: string;
        readonly modal: boolean;
        readonly width: string | number;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly modelValue: boolean;
        readonly transformOrigin: "center" | "mouse";
        readonly zIndex: number;
        readonly draggable: boolean;
        readonly confirmText: string;
        readonly cancelText: string;
        readonly showFooter: boolean;
        readonly glass: boolean;
        readonly closeIcon: string;
        readonly showIcon: boolean;
        readonly autoFocus: boolean;
        readonly alignCenter: boolean;
        readonly lockScroll: boolean;
        readonly closeOnClickModal: boolean;
        readonly closeOnPressEscape: boolean;
        readonly showClose: boolean;
        readonly destroyOnClose: boolean;
        readonly teleportTo: string | HTMLElement;
        readonly headerAlignCenter: boolean;
        readonly headerAlign: "center" | "left" | "right";
        readonly contentAlign: "center" | "left" | "right";
        readonly footerAlignCenter: boolean;
        readonly footerAlign: "center" | "left" | "right";
        readonly swapFooterButtons: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly modelValue: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly title: {
            readonly type: import("vue").PropType<import("./index.js").RenderContent>;
        };
        readonly showIcon: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly style: {
            readonly type: import("vue").PropType<string | import("vue").CSSProperties>;
        };
        readonly titleClass: StringConstructor;
        readonly titleStyle: import("vue").PropType<import("vue").CSSProperties | string>;
        readonly transformOrigin: {
            readonly type: import("vue").PropType<"mouse" | "center">;
            readonly default: "mouse";
        };
        readonly type: {
            readonly type: import("vue").PropType<"error" | "success" | "warning" | "info" | "default">;
            readonly default: "default";
        };
        readonly loading: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly content: {
            readonly type: import("vue").PropType<import("./index.js").RenderContent>;
        };
        readonly contentClass: StringConstructor;
        readonly contentStyle: import("vue").PropType<import("vue").CSSProperties | string>;
        readonly action: {
            readonly type: import("vue").PropType<() => import("vue").VNode | import("vue").Component>;
        };
        readonly actionClass: StringConstructor;
        readonly actionStyle: import("vue").PropType<import("vue").CSSProperties | string>;
        readonly autoFocus: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly width: {
            readonly type: import("vue").PropType<string | number>;
            readonly default: "50%";
        };
        readonly top: {
            readonly type: StringConstructor;
            readonly default: "15vh";
        };
        readonly fullscreen: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly alignCenter: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly center: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly glass: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly draggable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly lockScroll: {
            readonly type: BooleanConstructor;
            readonly default: true;
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
        readonly overflow: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly showFooter: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly cancelText: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly confirmText: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly modalClass: StringConstructor;
        readonly customClass: StringConstructor;
        readonly zIndex: {
            readonly type: NumberConstructor;
            readonly default: 2000;
        };
        readonly beforeClose: {
            readonly type: import("vue").PropType<(done: () => void) => void>;
        };
        readonly teleportTo: {
            readonly type: import("vue").PropType<string | HTMLElement>;
            readonly default: "body";
        };
        readonly headerAlignCenter: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly headerAlign: {
            readonly type: import("vue").PropType<"left" | "center" | "right">;
            readonly default: "left";
        };
        readonly contentAlign: {
            readonly type: import("vue").PropType<"left" | "center" | "right">;
            readonly default: "left";
        };
        readonly footerAlignCenter: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly footerAlign: {
            readonly type: import("vue").PropType<"left" | "center" | "right">;
            readonly default: "right";
        };
        readonly swapFooterButtons: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onConfirm?: (() => any) | undefined;
        onCancel?: (() => any) | undefined;
        onClose?: (() => any) | undefined;
        onClosed?: (() => any) | undefined;
        "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        onOpen?: (() => any) | undefined;
        onOpened?: (() => any) | undefined;
        onDragStart?: ((evt: MouseEvent) => any) | undefined;
        onDragMove?: ((evt: MouseEvent) => any) | undefined;
        onDragEnd?: ((evt: MouseEvent) => any) | undefined;
    }>, {
        visible: import("vue").Ref<boolean>;
        dialogRef: import("vue").Ref<HTMLElement | null>;
        handleClose: () => void;
        handleCancel: () => void;
        handleConfirm: () => void;
    }, {}, {}, {}, {
        readonly overflow: boolean;
        readonly loading: boolean;
        readonly fullscreen: boolean;
        readonly type: "default" | "error" | "success" | "warning" | "info";
        readonly center: boolean;
        readonly top: string;
        readonly modal: boolean;
        readonly width: string | number;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly modelValue: boolean;
        readonly transformOrigin: "center" | "mouse";
        readonly zIndex: number;
        readonly draggable: boolean;
        readonly confirmText: string;
        readonly cancelText: string;
        readonly showFooter: boolean;
        readonly glass: boolean;
        readonly closeIcon: string;
        readonly showIcon: boolean;
        readonly autoFocus: boolean;
        readonly alignCenter: boolean;
        readonly lockScroll: boolean;
        readonly closeOnClickModal: boolean;
        readonly closeOnPressEscape: boolean;
        readonly showClose: boolean;
        readonly destroyOnClose: boolean;
        readonly teleportTo: string | HTMLElement;
        readonly headerAlignCenter: boolean;
        readonly headerAlign: "center" | "left" | "right";
        readonly contentAlign: "center" | "left" | "right";
        readonly footerAlignCenter: boolean;
        readonly footerAlign: "center" | "left" | "right";
        readonly swapFooterButtons: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly title: {
        readonly type: import("vue").PropType<import("./index.js").RenderContent>;
    };
    readonly showIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly style: {
        readonly type: import("vue").PropType<string | import("vue").CSSProperties>;
    };
    readonly titleClass: StringConstructor;
    readonly titleStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    readonly transformOrigin: {
        readonly type: import("vue").PropType<"mouse" | "center">;
        readonly default: "mouse";
    };
    readonly type: {
        readonly type: import("vue").PropType<"error" | "success" | "warning" | "info" | "default">;
        readonly default: "default";
    };
    readonly loading: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly content: {
        readonly type: import("vue").PropType<import("./index.js").RenderContent>;
    };
    readonly contentClass: StringConstructor;
    readonly contentStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    readonly action: {
        readonly type: import("vue").PropType<() => import("vue").VNode | import("vue").Component>;
    };
    readonly actionClass: StringConstructor;
    readonly actionStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    readonly autoFocus: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly width: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "50%";
    };
    readonly top: {
        readonly type: StringConstructor;
        readonly default: "15vh";
    };
    readonly fullscreen: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly alignCenter: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly center: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly glass: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly draggable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly lockScroll: {
        readonly type: BooleanConstructor;
        readonly default: true;
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
    readonly overflow: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showFooter: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly cancelText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly confirmText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly modalClass: StringConstructor;
    readonly customClass: StringConstructor;
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 2000;
    };
    readonly beforeClose: {
        readonly type: import("vue").PropType<(done: () => void) => void>;
    };
    readonly teleportTo: {
        readonly type: import("vue").PropType<string | HTMLElement>;
        readonly default: "body";
    };
    readonly headerAlignCenter: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly headerAlign: {
        readonly type: import("vue").PropType<"left" | "center" | "right">;
        readonly default: "left";
    };
    readonly contentAlign: {
        readonly type: import("vue").PropType<"left" | "center" | "right">;
        readonly default: "left";
    };
    readonly footerAlignCenter: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly footerAlign: {
        readonly type: import("vue").PropType<"left" | "center" | "right">;
        readonly default: "right";
    };
    readonly swapFooterButtons: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onConfirm?: (() => any) | undefined;
    onCancel?: (() => any) | undefined;
    onClose?: (() => any) | undefined;
    onClosed?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onOpen?: (() => any) | undefined;
    onOpened?: (() => any) | undefined;
    onDragStart?: ((evt: MouseEvent) => any) | undefined;
    onDragMove?: ((evt: MouseEvent) => any) | undefined;
    onDragEnd?: ((evt: MouseEvent) => any) | undefined;
}>, {
    visible: import("vue").Ref<boolean>;
    dialogRef: import("vue").Ref<HTMLElement | null>;
    handleClose: () => void;
    handleCancel: () => void;
    handleConfirm: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    confirm: () => void;
    cancel: () => void;
    close: () => void;
    closed: () => void;
    "update:modelValue": (value: boolean) => void;
    open: () => void;
    opened: () => void;
    dragStart: (evt: MouseEvent) => void;
    dragMove: (evt: MouseEvent) => void;
    dragEnd: (evt: MouseEvent) => void;
}, string, {
    readonly overflow: boolean;
    readonly loading: boolean;
    readonly fullscreen: boolean;
    readonly type: "default" | "error" | "success" | "warning" | "info";
    readonly center: boolean;
    readonly top: string;
    readonly modal: boolean;
    readonly width: string | number;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly modelValue: boolean;
    readonly transformOrigin: "center" | "mouse";
    readonly zIndex: number;
    readonly draggable: boolean;
    readonly confirmText: string;
    readonly cancelText: string;
    readonly showFooter: boolean;
    readonly glass: boolean;
    readonly closeIcon: string;
    readonly showIcon: boolean;
    readonly autoFocus: boolean;
    readonly alignCenter: boolean;
    readonly lockScroll: boolean;
    readonly closeOnClickModal: boolean;
    readonly closeOnPressEscape: boolean;
    readonly showClose: boolean;
    readonly destroyOnClose: boolean;
    readonly teleportTo: string | HTMLElement;
    readonly headerAlignCenter: boolean;
    readonly headerAlign: "center" | "left" | "right";
    readonly contentAlign: "center" | "left" | "right";
    readonly footerAlignCenter: boolean;
    readonly footerAlign: "center" | "left" | "right";
    readonly swapFooterButtons: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        header?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        footer?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export declare const YhDialogMethod: import("@yh-ui/utils").SFCWithInstall<import("./index.js").DialogMethod>;
export default YhDialog;
export * from './src/dialog';
export * from './src/use-dialog';
export type { DialogMethod } from './src/method';
export type DialogInstance = InstanceType<typeof Dialog>;
export type YhDialogInstance = DialogInstance;
export type YhDialogProps = import('./src/dialog').DialogProps;
export type YhDialogEmits = import('./src/dialog').DialogEmits;
export type YhDialogSlots = import('./src/dialog').DialogSlots;
export type YhDialogExpose = import('./src/dialog').DialogExpose;
export type YhDialogMethod = import('./src/method').DialogMethod;
