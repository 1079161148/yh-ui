import ImageMagnifier from './src/image-magnifier.vue';
export declare const YhImageMagnifier: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        src: {
            type: StringConstructor;
            default: string;
        };
        zoomSrc: {
            type: StringConstructor;
            default: string;
        };
        images: {
            type: import("vue").PropType<import("./index.js").ImageMagnifierImage[]>;
            default: () => never[];
        };
        modelValue: {
            type: NumberConstructor;
            default: number;
        };
        scale: {
            type: NumberConstructor;
            default: number;
        };
        wheelZoom: {
            type: BooleanConstructor;
            default: boolean;
        };
        minScale: {
            type: NumberConstructor;
            default: number;
        };
        maxScale: {
            type: NumberConstructor;
            default: number;
        };
        scaleStep: {
            type: NumberConstructor;
            default: number;
        };
        width: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        height: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        position: {
            type: import("vue").PropType<import("./index.js").ImageMagnifierPosition | "auto">;
            default: string;
        };
        offset: {
            type: NumberConstructor;
            default: number;
        };
        maskShape: {
            type: import("vue").PropType<import("./index.js").ImageMagnifierMaskShape>;
            default: string;
        };
        maskWidth: {
            type: NumberConstructor;
            default: number;
        };
        maskHeight: {
            type: NumberConstructor;
            default: number;
        };
        maskColor: {
            type: StringConstructor;
            default: string;
        };
        showMinimap: {
            type: BooleanConstructor;
            default: boolean;
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
        shadow: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        clickToFullscreen: {
            type: BooleanConstructor;
            default: boolean;
        };
        alt: {
            type: StringConstructor;
            default: string;
        };
        loadingColor: {
            type: StringConstructor;
            default: string;
        };
        themeOverrides: {
            type: import("vue").PropType<Record<string, string>>;
            default: () => {};
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((index: number) => any) | undefined;
        onEnter?: (() => any) | undefined;
        onLeave?: (() => any) | undefined;
        "onZoom-start"?: (() => any) | undefined;
        "onZoom-end"?: (() => any) | undefined;
        "onScale-change"?: ((scale: number) => any) | undefined;
        "onImage-change"?: ((index: number) => any) | undefined;
    }>, {
        visible: import("vue").Ref<boolean, boolean>;
        currentScale: import("vue").Ref<number, number>;
        currentIndex: import("vue").Ref<number, number>;
        switchImage: (index: number) => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (index: number) => void;
        enter: () => void;
        leave: () => void;
        "zoom-start": () => void;
        "zoom-end": () => void;
        "scale-change": (scale: number) => void;
        "image-change": (index: number) => void;
    }, import("vue").PublicProps, {
        title: string;
        width: string | number;
        height: string | number;
        themeOverrides: Record<string, string>;
        modelValue: number;
        position: "auto" | import("./index.js").ImageMagnifierPosition;
        scale: number;
        border: boolean;
        offset: number;
        shadow: boolean;
        src: string;
        alt: string;
        images: import("./index.js").ImageMagnifierImage[];
        zoomSrc: string;
        wheelZoom: boolean;
        minScale: number;
        maxScale: number;
        scaleStep: number;
        maskShape: import("./index.js").ImageMagnifierMaskShape;
        maskWidth: number;
        maskHeight: number;
        maskColor: string;
        showMinimap: boolean;
        clickToFullscreen: boolean;
        loadingColor: string;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        src: {
            type: StringConstructor;
            default: string;
        };
        zoomSrc: {
            type: StringConstructor;
            default: string;
        };
        images: {
            type: import("vue").PropType<import("./index.js").ImageMagnifierImage[]>;
            default: () => never[];
        };
        modelValue: {
            type: NumberConstructor;
            default: number;
        };
        scale: {
            type: NumberConstructor;
            default: number;
        };
        wheelZoom: {
            type: BooleanConstructor;
            default: boolean;
        };
        minScale: {
            type: NumberConstructor;
            default: number;
        };
        maxScale: {
            type: NumberConstructor;
            default: number;
        };
        scaleStep: {
            type: NumberConstructor;
            default: number;
        };
        width: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        height: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        position: {
            type: import("vue").PropType<import("./index.js").ImageMagnifierPosition | "auto">;
            default: string;
        };
        offset: {
            type: NumberConstructor;
            default: number;
        };
        maskShape: {
            type: import("vue").PropType<import("./index.js").ImageMagnifierMaskShape>;
            default: string;
        };
        maskWidth: {
            type: NumberConstructor;
            default: number;
        };
        maskHeight: {
            type: NumberConstructor;
            default: number;
        };
        maskColor: {
            type: StringConstructor;
            default: string;
        };
        showMinimap: {
            type: BooleanConstructor;
            default: boolean;
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
        shadow: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        clickToFullscreen: {
            type: BooleanConstructor;
            default: boolean;
        };
        alt: {
            type: StringConstructor;
            default: string;
        };
        loadingColor: {
            type: StringConstructor;
            default: string;
        };
        themeOverrides: {
            type: import("vue").PropType<Record<string, string>>;
            default: () => {};
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((index: number) => any) | undefined;
        onEnter?: (() => any) | undefined;
        onLeave?: (() => any) | undefined;
        "onZoom-start"?: (() => any) | undefined;
        "onZoom-end"?: (() => any) | undefined;
        "onScale-change"?: ((scale: number) => any) | undefined;
        "onImage-change"?: ((index: number) => any) | undefined;
    }>, {
        visible: import("vue").Ref<boolean, boolean>;
        currentScale: import("vue").Ref<number, number>;
        currentIndex: import("vue").Ref<number, number>;
        switchImage: (index: number) => void;
    }, {}, {}, {}, {
        title: string;
        width: string | number;
        height: string | number;
        themeOverrides: Record<string, string>;
        modelValue: number;
        position: "auto" | import("./index.js").ImageMagnifierPosition;
        scale: number;
        border: boolean;
        offset: number;
        shadow: boolean;
        src: string;
        alt: string;
        images: import("./index.js").ImageMagnifierImage[];
        zoomSrc: string;
        wheelZoom: boolean;
        minScale: number;
        maxScale: number;
        scaleStep: number;
        maskShape: import("./index.js").ImageMagnifierMaskShape;
        maskWidth: number;
        maskHeight: number;
        maskColor: string;
        showMinimap: boolean;
        clickToFullscreen: boolean;
        loadingColor: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    src: {
        type: StringConstructor;
        default: string;
    };
    zoomSrc: {
        type: StringConstructor;
        default: string;
    };
    images: {
        type: import("vue").PropType<import("./index.js").ImageMagnifierImage[]>;
        default: () => never[];
    };
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    scale: {
        type: NumberConstructor;
        default: number;
    };
    wheelZoom: {
        type: BooleanConstructor;
        default: boolean;
    };
    minScale: {
        type: NumberConstructor;
        default: number;
    };
    maxScale: {
        type: NumberConstructor;
        default: number;
    };
    scaleStep: {
        type: NumberConstructor;
        default: number;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    position: {
        type: import("vue").PropType<import("./index.js").ImageMagnifierPosition | "auto">;
        default: string;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    maskShape: {
        type: import("vue").PropType<import("./index.js").ImageMagnifierMaskShape>;
        default: string;
    };
    maskWidth: {
        type: NumberConstructor;
        default: number;
    };
    maskHeight: {
        type: NumberConstructor;
        default: number;
    };
    maskColor: {
        type: StringConstructor;
        default: string;
    };
    showMinimap: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    clickToFullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    alt: {
        type: StringConstructor;
        default: string;
    };
    loadingColor: {
        type: StringConstructor;
        default: string;
    };
    themeOverrides: {
        type: import("vue").PropType<Record<string, string>>;
        default: () => {};
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((index: number) => any) | undefined;
    onEnter?: (() => any) | undefined;
    onLeave?: (() => any) | undefined;
    "onZoom-start"?: (() => any) | undefined;
    "onZoom-end"?: (() => any) | undefined;
    "onScale-change"?: ((scale: number) => any) | undefined;
    "onImage-change"?: ((index: number) => any) | undefined;
}>, {
    visible: import("vue").Ref<boolean, boolean>;
    currentScale: import("vue").Ref<number, number>;
    currentIndex: import("vue").Ref<number, number>;
    switchImage: (index: number) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (index: number) => void;
    enter: () => void;
    leave: () => void;
    "zoom-start": () => void;
    "zoom-end": () => void;
    "scale-change": (scale: number) => void;
    "image-change": (index: number) => void;
}, string, {
    title: string;
    width: string | number;
    height: string | number;
    themeOverrides: Record<string, string>;
    modelValue: number;
    position: "auto" | import("./index.js").ImageMagnifierPosition;
    scale: number;
    border: boolean;
    offset: number;
    shadow: boolean;
    src: string;
    alt: string;
    images: import("./index.js").ImageMagnifierImage[];
    zoomSrc: string;
    wheelZoom: boolean;
    minScale: number;
    maxScale: number;
    scaleStep: number;
    maskShape: import("./index.js").ImageMagnifierMaskShape;
    maskWidth: number;
    maskHeight: number;
    maskColor: string;
    showMinimap: boolean;
    clickToFullscreen: boolean;
    loadingColor: string;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    } & {
        title?: (props: {}) => any;
    } & {
        'close-icon'?: (props: {}) => any;
    } & {
        fullscreen?: (props: {
            src: string;
            alt: string;
        }) => any;
    };
})> & Record<string, unknown>;
export default YhImageMagnifier;
export * from './src/image-magnifier';
export type ImageMagnifierInstance = InstanceType<typeof ImageMagnifier>;
export type YhImageMagnifierInstance = ImageMagnifierInstance;
export type YhImageMagnifierProps = import('./src/image-magnifier').ImageMagnifierProps;
