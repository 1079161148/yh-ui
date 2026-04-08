import Marquee from './src/marquee.vue';
export declare const YhMarquee: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly direction: {
            readonly type: import("vue").PropType<import("./index.js").MarqueeDirection>;
            readonly default: "horizontal";
            readonly validator: (val: string) => boolean;
        };
        readonly duration: {
            readonly type: NumberConstructor;
            readonly default: 20;
        };
        readonly reverse: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly pauseOnHover: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly pauseOnClick: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly gap: {
            readonly type: import("vue").PropType<number | string>;
            readonly default: 0;
        };
        readonly gradient: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly gradientColor: {
            readonly type: StringConstructor;
            readonly default: "#ffffff";
        };
        readonly gradientWidth: {
            readonly type: import("vue").PropType<number | string>;
            readonly default: "40px";
        };
        readonly autoFill: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly play: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly loop: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly speed: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly delay: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly loopDelay: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly pauseOnHidden: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onCycleComplete?: (() => any) | undefined;
    }>, {
        calculateClones: () => Promise<void>;
        containerRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
        contentRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        cycleComplete: () => void;
    }, import("vue").PublicProps, {
        readonly reverse: boolean;
        readonly play: boolean;
        readonly gap: string | number;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly direction: "vertical" | "horizontal";
        readonly duration: number;
        readonly delay: number;
        readonly gradient: boolean;
        readonly pauseOnHover: boolean;
        readonly pauseOnClick: boolean;
        readonly gradientColor: string;
        readonly gradientWidth: string | number;
        readonly autoFill: boolean;
        readonly loop: number;
        readonly speed: number;
        readonly loopDelay: number;
        readonly pauseOnHidden: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly direction: {
            readonly type: import("vue").PropType<import("./index.js").MarqueeDirection>;
            readonly default: "horizontal";
            readonly validator: (val: string) => boolean;
        };
        readonly duration: {
            readonly type: NumberConstructor;
            readonly default: 20;
        };
        readonly reverse: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly pauseOnHover: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly pauseOnClick: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly gap: {
            readonly type: import("vue").PropType<number | string>;
            readonly default: 0;
        };
        readonly gradient: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly gradientColor: {
            readonly type: StringConstructor;
            readonly default: "#ffffff";
        };
        readonly gradientWidth: {
            readonly type: import("vue").PropType<number | string>;
            readonly default: "40px";
        };
        readonly autoFill: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly play: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly loop: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly speed: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly delay: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly loopDelay: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly pauseOnHidden: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onCycleComplete?: (() => any) | undefined;
    }>, {
        calculateClones: () => Promise<void>;
        containerRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
        contentRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    }, {}, {}, {}, {
        readonly reverse: boolean;
        readonly play: boolean;
        readonly gap: string | number;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly direction: "vertical" | "horizontal";
        readonly duration: number;
        readonly delay: number;
        readonly gradient: boolean;
        readonly pauseOnHover: boolean;
        readonly pauseOnClick: boolean;
        readonly gradientColor: string;
        readonly gradientWidth: string | number;
        readonly autoFill: boolean;
        readonly loop: number;
        readonly speed: number;
        readonly loopDelay: number;
        readonly pauseOnHidden: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly direction: {
        readonly type: import("vue").PropType<import("./index.js").MarqueeDirection>;
        readonly default: "horizontal";
        readonly validator: (val: string) => boolean;
    };
    readonly duration: {
        readonly type: NumberConstructor;
        readonly default: 20;
    };
    readonly reverse: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly pauseOnHover: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly pauseOnClick: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly gap: {
        readonly type: import("vue").PropType<number | string>;
        readonly default: 0;
    };
    readonly gradient: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly gradientColor: {
        readonly type: StringConstructor;
        readonly default: "#ffffff";
    };
    readonly gradientWidth: {
        readonly type: import("vue").PropType<number | string>;
        readonly default: "40px";
    };
    readonly autoFill: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly play: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly loop: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly speed: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly delay: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly loopDelay: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly pauseOnHidden: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onCycleComplete?: (() => any) | undefined;
}>, {
    calculateClones: () => Promise<void>;
    containerRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    contentRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    cycleComplete: () => void;
}, string, {
    readonly reverse: boolean;
    readonly play: boolean;
    readonly gap: string | number;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly direction: "vertical" | "horizontal";
    readonly duration: number;
    readonly delay: number;
    readonly gradient: boolean;
    readonly pauseOnHover: boolean;
    readonly pauseOnClick: boolean;
    readonly gradientColor: string;
    readonly gradientWidth: string | number;
    readonly autoFill: boolean;
    readonly loop: number;
    readonly speed: number;
    readonly loopDelay: number;
    readonly pauseOnHidden: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhMarquee;
export * from './src/marquee';
export type MarqueeInstance = InstanceType<typeof Marquee>;
