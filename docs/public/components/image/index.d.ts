/**
 * Image Component
 * @description 图片组件导出
 */
import Image from './src/image.vue';
import ImageViewer from './src/image-viewer.vue';
export declare const YhImage: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly src: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly fit: {
            readonly type: import("vue").PropType<import("./index.js").ImageFit>;
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
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        switch: (index: number) => any;
        close: () => any;
        error: (event: string | Event) => any;
        load: (event: Event) => any;
        show: () => any;
    }, import("vue").PublicProps, {
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
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly src: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly fit: {
            readonly type: import("vue").PropType<import("./index.js").ImageFit>;
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
    }>, {}, {}, {}, {}, {
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
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly src: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly fit: {
        readonly type: import("vue").PropType<import("./index.js").ImageFit>;
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
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    switch: (index: number) => any;
    close: () => any;
    error: (event: string | Event) => any;
    load: (event: Event) => any;
    show: () => any;
}, string, {
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
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        placeholder?: (props: {}) => any;
    } & {
        error?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export declare const YhImageViewer: import("@yh-ui/utils").SFCWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
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
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>> & Record<string, unknown>;
export default YhImage;
export * from './src/image';
export * from './src/image-viewer';
export type ImageInstance = InstanceType<typeof Image>;
export type ImageViewerInstance = InstanceType<typeof ImageViewer>;
