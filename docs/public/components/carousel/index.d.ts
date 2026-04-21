import Carousel from './src/carousel.vue';
import CarouselItem from './src/carousel-item.vue';
export declare const YhCarousel: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly currentIndex: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly defaultIndex: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly autoplay: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly interval: {
            readonly type: NumberConstructor;
            readonly default: 3000;
        };
        readonly loop: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly effect: {
            readonly type: import("vue").PropType<import("./index.js").CarouselEffect>;
            readonly default: "slide";
        };
        readonly direction: {
            readonly type: import("vue").PropType<import("./index.js").CarouselDirection>;
            readonly default: "horizontal";
        };
        readonly showArrow: {
            readonly type: import("vue").PropType<import("./index.js").CarouselArrow>;
            readonly default: "hover";
        };
        readonly showDots: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly dotTrigger: {
            readonly type: import("vue").PropType<import("./index.js").CarouselTrigger>;
            readonly default: "click";
        };
        readonly dotPlacement: {
            readonly type: import("vue").PropType<import("./index.js").CarouselDotPlacement>;
            readonly default: "bottom";
        };
        readonly dotType: {
            readonly type: import("vue").PropType<"dot" | "line">;
            readonly default: "dot";
        };
        readonly keyboard: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly pauseOnHover: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly draggable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly mousewheel: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly spaceBetween: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly cardGutter: {
            readonly type: NumberConstructor;
            readonly default: 20;
        };
        readonly slidesPreView: {
            readonly type: import("vue").PropType<number | "auto">;
            readonly default: 1;
        };
        readonly duration: {
            readonly type: NumberConstructor;
            readonly default: 500;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onChange?: ((index: number, prevIndex: number) => any) | undefined;
        "onUpdate:currentIndex"?: ((index: number) => any) | undefined;
    }>, {
        prev: () => number;
        next: () => number;
        jump: (index: number) => void;
        to: (index: number) => void;
        getCurrentIndex: () => number;
        currentIndex: import("vue").ShallowRef<number, number>;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        change: (index: number, prevIndex: number) => void;
        "update:currentIndex": (index: number) => void;
    }, import("vue").PublicProps, {
        readonly interval: number;
        readonly effect: import("./index.js").CarouselEffect;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly direction: import("./index.js").CarouselDirection;
        readonly draggable: boolean;
        readonly duration: number;
        readonly pauseOnHover: boolean;
        readonly showArrow: import("./index.js").CarouselArrow;
        readonly loop: boolean;
        readonly keyboard: boolean;
        readonly currentIndex: number;
        readonly defaultIndex: number;
        readonly autoplay: boolean;
        readonly showDots: boolean;
        readonly dotTrigger: import("./index.js").CarouselTrigger;
        readonly dotPlacement: import("./index.js").CarouselDotPlacement;
        readonly dotType: "line" | "dot";
        readonly mousewheel: boolean;
        readonly spaceBetween: number;
        readonly cardGutter: number;
        readonly slidesPreView: number | "auto";
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly currentIndex: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly defaultIndex: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly autoplay: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly interval: {
            readonly type: NumberConstructor;
            readonly default: 3000;
        };
        readonly loop: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly effect: {
            readonly type: import("vue").PropType<import("./index.js").CarouselEffect>;
            readonly default: "slide";
        };
        readonly direction: {
            readonly type: import("vue").PropType<import("./index.js").CarouselDirection>;
            readonly default: "horizontal";
        };
        readonly showArrow: {
            readonly type: import("vue").PropType<import("./index.js").CarouselArrow>;
            readonly default: "hover";
        };
        readonly showDots: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly dotTrigger: {
            readonly type: import("vue").PropType<import("./index.js").CarouselTrigger>;
            readonly default: "click";
        };
        readonly dotPlacement: {
            readonly type: import("vue").PropType<import("./index.js").CarouselDotPlacement>;
            readonly default: "bottom";
        };
        readonly dotType: {
            readonly type: import("vue").PropType<"dot" | "line">;
            readonly default: "dot";
        };
        readonly keyboard: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly pauseOnHover: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly draggable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly mousewheel: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly spaceBetween: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly cardGutter: {
            readonly type: NumberConstructor;
            readonly default: 20;
        };
        readonly slidesPreView: {
            readonly type: import("vue").PropType<number | "auto">;
            readonly default: 1;
        };
        readonly duration: {
            readonly type: NumberConstructor;
            readonly default: 500;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onChange?: ((index: number, prevIndex: number) => any) | undefined;
        "onUpdate:currentIndex"?: ((index: number) => any) | undefined;
    }>, {
        prev: () => number;
        next: () => number;
        jump: (index: number) => void;
        to: (index: number) => void;
        getCurrentIndex: () => number;
        currentIndex: import("vue").ShallowRef<number, number>;
    }, {}, {}, {}, {
        readonly interval: number;
        readonly effect: import("./index.js").CarouselEffect;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly direction: import("./index.js").CarouselDirection;
        readonly draggable: boolean;
        readonly duration: number;
        readonly pauseOnHover: boolean;
        readonly showArrow: import("./index.js").CarouselArrow;
        readonly loop: boolean;
        readonly keyboard: boolean;
        readonly currentIndex: number;
        readonly defaultIndex: number;
        readonly autoplay: boolean;
        readonly showDots: boolean;
        readonly dotTrigger: import("./index.js").CarouselTrigger;
        readonly dotPlacement: import("./index.js").CarouselDotPlacement;
        readonly dotType: "line" | "dot";
        readonly mousewheel: boolean;
        readonly spaceBetween: number;
        readonly cardGutter: number;
        readonly slidesPreView: number | "auto";
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly currentIndex: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly defaultIndex: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly autoplay: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly interval: {
        readonly type: NumberConstructor;
        readonly default: 3000;
    };
    readonly loop: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly effect: {
        readonly type: import("vue").PropType<import("./index.js").CarouselEffect>;
        readonly default: "slide";
    };
    readonly direction: {
        readonly type: import("vue").PropType<import("./index.js").CarouselDirection>;
        readonly default: "horizontal";
    };
    readonly showArrow: {
        readonly type: import("vue").PropType<import("./index.js").CarouselArrow>;
        readonly default: "hover";
    };
    readonly showDots: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly dotTrigger: {
        readonly type: import("vue").PropType<import("./index.js").CarouselTrigger>;
        readonly default: "click";
    };
    readonly dotPlacement: {
        readonly type: import("vue").PropType<import("./index.js").CarouselDotPlacement>;
        readonly default: "bottom";
    };
    readonly dotType: {
        readonly type: import("vue").PropType<"dot" | "line">;
        readonly default: "dot";
    };
    readonly keyboard: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly pauseOnHover: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly draggable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly mousewheel: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly spaceBetween: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly cardGutter: {
        readonly type: NumberConstructor;
        readonly default: 20;
    };
    readonly slidesPreView: {
        readonly type: import("vue").PropType<number | "auto">;
        readonly default: 1;
    };
    readonly duration: {
        readonly type: NumberConstructor;
        readonly default: 500;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onChange?: ((index: number, prevIndex: number) => any) | undefined;
    "onUpdate:currentIndex"?: ((index: number) => any) | undefined;
}>, {
    prev: () => number;
    next: () => number;
    jump: (index: number) => void;
    to: (index: number) => void;
    getCurrentIndex: () => number;
    currentIndex: import("vue").ShallowRef<number, number>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (index: number, prevIndex: number) => void;
    "update:currentIndex": (index: number) => void;
}, string, {
    readonly interval: number;
    readonly effect: import("./index.js").CarouselEffect;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly direction: import("./index.js").CarouselDirection;
    readonly draggable: boolean;
    readonly duration: number;
    readonly pauseOnHover: boolean;
    readonly showArrow: import("./index.js").CarouselArrow;
    readonly loop: boolean;
    readonly keyboard: boolean;
    readonly currentIndex: number;
    readonly defaultIndex: number;
    readonly autoplay: boolean;
    readonly showDots: boolean;
    readonly dotTrigger: import("./index.js").CarouselTrigger;
    readonly dotPlacement: import("./index.js").CarouselDotPlacement;
    readonly dotType: "line" | "dot";
    readonly mousewheel: boolean;
    readonly spaceBetween: number;
    readonly cardGutter: number;
    readonly slidesPreView: number | "auto";
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    } & {
        dots?: (props: {
            total: number;
            currentIndex: number;
            to: (index: number) => void;
        }) => any;
    } & {
        arrow?: (props: {
            total: number;
            currentIndex: number;
            to: (index: number) => void;
            prev: () => number;
            next: () => number;
        }) => any;
    } & {
        'prev-arrow'?: (props: {}) => any;
    } & {
        'next-arrow'?: (props: {}) => any;
    };
})> & {
    CarouselItem: {
        new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
            readonly name: StringConstructor;
        }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            readonly name: StringConstructor;
        }>> & Readonly<{}>, {}, {}, {}, {}, {}>;
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        readonly name: StringConstructor;
    }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?: (props: {}) => any;
        } & {
            default?: (props: {}) => any;
        };
    });
};
export default YhCarousel;
export declare const YhCarouselItem: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly name: StringConstructor;
    }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly name: StringConstructor;
    }>> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly name: StringConstructor;
}>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
})>;
export * from './src/carousel';
export * from './src/carousel-item';
export type CarouselInstance = InstanceType<typeof Carousel>;
export type YhCarouselInstance = CarouselInstance;
export type CarouselItemInstance = InstanceType<typeof CarouselItem>;
export type YhCarouselItemInstance = CarouselItemInstance;
export type { CarouselProps } from './src/carousel';
export type YhCarouselProps = import('./src/carousel').CarouselProps;
export type YhCarouselEmits = import('./src/carousel').CarouselEmits;
export type YhCarouselSlots = import('./src/carousel').CarouselSlots;
export type YhCarouselExpose = import('./src/carousel').CarouselExpose;
export type YhCarouselEffect = import('./src/carousel').CarouselEffect;
export type YhCarouselDirection = import('./src/carousel').CarouselDirection;
export type YhCarouselArrow = import('./src/carousel').CarouselArrow;
export type YhCarouselTrigger = import('./src/carousel').CarouselTrigger;
export type YhCarouselDotPlacement = import('./src/carousel').CarouselDotPlacement;
export type { CarouselItemProps } from './src/carousel-item';
export type YhCarouselItemProps = import('./src/carousel-item').CarouselItemProps;
export type YhCarouselItemSlots = import('./src/carousel-item').CarouselItemSlots;
