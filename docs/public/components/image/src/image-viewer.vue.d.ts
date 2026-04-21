import 'viewerjs/dist/viewer.css';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly urlList: {
        readonly type: import("vue").PropType<string[]>;
        readonly default: () => never[];
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 2000;
    };
    readonly initialIndex: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly infinite: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly hideOnClickModal: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly closeOnPressEscape: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly zoomRate: {
        readonly type: NumberConstructor;
        readonly default: 1.2;
    };
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly teleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly viewerMode: {
        readonly type: import("vue").PropType<"default" | "viewerjs">;
        readonly default: "default";
    };
    readonly viewerOptions: {
        readonly type: import("vue").PropType<Record<string, unknown>>;
        readonly default: () => {};
    };
}>, {
    prev: () => void;
    next: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
    rotateLeft: () => void;
    rotateRight: () => void;
    reset: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    switch: (index: number) => void;
    close: () => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly urlList: {
        readonly type: import("vue").PropType<string[]>;
        readonly default: () => never[];
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 2000;
    };
    readonly initialIndex: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly infinite: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly hideOnClickModal: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly closeOnPressEscape: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly zoomRate: {
        readonly type: NumberConstructor;
        readonly default: 1.2;
    };
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly teleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly viewerMode: {
        readonly type: import("vue").PropType<"default" | "viewerjs">;
        readonly default: "default";
    };
    readonly viewerOptions: {
        readonly type: import("vue").PropType<Record<string, unknown>>;
        readonly default: () => {};
    };
}>> & Readonly<{
    onSwitch?: ((index: number) => any) | undefined;
    onClose?: (() => any) | undefined;
}>, {
    readonly zIndex: number;
    readonly infinite: boolean;
    readonly teleported: boolean;
    readonly showProgress: boolean;
    readonly closeOnPressEscape: boolean;
    readonly initialIndex: number;
    readonly hideOnClickModal: boolean;
    readonly zoomRate: number;
    readonly viewerMode: "default" | "viewerjs";
    readonly viewerOptions: Record<string, unknown>;
    readonly urlList: string[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
