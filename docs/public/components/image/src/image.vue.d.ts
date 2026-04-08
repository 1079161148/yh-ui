import 'viewerjs/dist/viewer.css';
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
    placeholder?: (props: typeof __VLS_1) => any;
} & {
    error?: (props: typeof __VLS_3) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly src: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly fit: {
        readonly type: import("vue").PropType<import("./image").ImageFit>;
        readonly default: "";
    };
    readonly lazy: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly previewSrcList: {
        readonly type: import("vue").PropType<string[]>;
        readonly default: () => never[];
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
    };
    readonly initialIndex: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly closeOnPressEscape: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly hideOnClickModal: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly zoomRate: {
        readonly type: NumberConstructor;
        readonly default: 1.2;
    };
    readonly infinite: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly crossorigin: {
        readonly type: import("vue").PropType<"" | "anonymous" | "use-credentials">;
    };
    readonly alt: StringConstructor;
    readonly loading: import("vue").PropType<"eager" | "lazy">;
    readonly previewTeleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly scrollContainer: {
        readonly type: import("vue").PropType<string | HTMLElement | undefined>;
    };
    readonly viewerMode: {
        readonly type: import("vue").PropType<"default" | "viewerjs">;
        readonly default: "default";
    };
    readonly viewerOptions: {
        readonly type: import("vue").PropType<Record<string, unknown>>;
        readonly default: () => {};
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    switch: (index: number) => any;
    close: () => any;
    error: (event: string | Event) => any;
    load: (event: Event) => any;
    show: () => any;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly src: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly fit: {
        readonly type: import("vue").PropType<import("./image").ImageFit>;
        readonly default: "";
    };
    readonly lazy: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly previewSrcList: {
        readonly type: import("vue").PropType<string[]>;
        readonly default: () => never[];
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
    };
    readonly initialIndex: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly closeOnPressEscape: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly hideOnClickModal: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly zoomRate: {
        readonly type: NumberConstructor;
        readonly default: 1.2;
    };
    readonly infinite: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly crossorigin: {
        readonly type: import("vue").PropType<"" | "anonymous" | "use-credentials">;
    };
    readonly alt: StringConstructor;
    readonly loading: import("vue").PropType<"eager" | "lazy">;
    readonly previewTeleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly scrollContainer: {
        readonly type: import("vue").PropType<string | HTMLElement | undefined>;
    };
    readonly viewerMode: {
        readonly type: import("vue").PropType<"default" | "viewerjs">;
        readonly default: "default";
    };
    readonly viewerOptions: {
        readonly type: import("vue").PropType<Record<string, unknown>>;
        readonly default: () => {};
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onSwitch?: ((index: number) => any) | undefined;
    onClose?: (() => any) | undefined;
    onError?: ((event: string | Event) => any) | undefined;
    onLoad?: ((event: Event) => any) | undefined;
    onShow?: (() => any) | undefined;
}>, {
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly infinite: boolean;
    readonly lazy: boolean;
    readonly showProgress: boolean;
    readonly closeOnPressEscape: boolean;
    readonly src: string;
    readonly fit: "" | "fill" | "none" | "contain" | "cover" | "scale-down";
    readonly previewSrcList: string[];
    readonly initialIndex: number;
    readonly hideOnClickModal: boolean;
    readonly zoomRate: number;
    readonly previewTeleported: boolean;
    readonly viewerMode: "default" | "viewerjs";
    readonly viewerOptions: Record<string, unknown>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
