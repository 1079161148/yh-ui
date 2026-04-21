import Spin from './src/spin.vue';
export declare const YhSpin: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly show: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly tip: StringConstructor;
        readonly size: {
            readonly type: import("vue").PropType<"small" | "default" | "large" | number>;
            readonly default: "default";
        };
        readonly vertical: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly delay: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly glass: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly dot: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly type: {
            readonly type: import("vue").PropType<import("./index.js").LoadingSpinnerType>;
            readonly default: "circle";
        };
        readonly color: {
            readonly type: import("vue").PropType<string | string[] | Record<string, string>>;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onHide?: (() => any) | undefined;
        onShow?: (() => any) | undefined;
    }>, {
        visible: import("vue").ComputedRef<boolean>;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        hide: () => void;
        show: () => void;
    }, import("vue").PublicProps, {
        readonly size: number | "large" | "default" | "small";
        readonly type: import("./index.js").LoadingSpinnerType;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly vertical: boolean;
        readonly show: boolean;
        readonly dot: boolean;
        readonly delay: number;
        readonly glass: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly show: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly tip: StringConstructor;
        readonly size: {
            readonly type: import("vue").PropType<"small" | "default" | "large" | number>;
            readonly default: "default";
        };
        readonly vertical: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly delay: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly glass: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly dot: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly type: {
            readonly type: import("vue").PropType<import("./index.js").LoadingSpinnerType>;
            readonly default: "circle";
        };
        readonly color: {
            readonly type: import("vue").PropType<string | string[] | Record<string, string>>;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onHide?: (() => any) | undefined;
        onShow?: (() => any) | undefined;
    }>, {
        visible: import("vue").ComputedRef<boolean>;
    }, {}, {}, {}, {
        readonly size: number | "large" | "default" | "small";
        readonly type: import("./index.js").LoadingSpinnerType;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly vertical: boolean;
        readonly show: boolean;
        readonly dot: boolean;
        readonly delay: number;
        readonly glass: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly show: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly tip: StringConstructor;
    readonly size: {
        readonly type: import("vue").PropType<"small" | "default" | "large" | number>;
        readonly default: "default";
    };
    readonly vertical: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly delay: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly glass: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly dot: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly type: {
        readonly type: import("vue").PropType<import("./index.js").LoadingSpinnerType>;
        readonly default: "circle";
    };
    readonly color: {
        readonly type: import("vue").PropType<string | string[] | Record<string, string>>;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onHide?: (() => any) | undefined;
    onShow?: (() => any) | undefined;
}>, {
    visible: import("vue").ComputedRef<boolean>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    hide: () => void;
    show: () => void;
}, string, {
    readonly size: number | "large" | "default" | "small";
    readonly type: import("./index.js").LoadingSpinnerType;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly vertical: boolean;
    readonly show: boolean;
    readonly dot: boolean;
    readonly delay: number;
    readonly glass: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    } & {
        tip?: (props: {}) => any;
    } & {
        tip?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhSpin;
export * from './src/spin';
export type SpinInstance = InstanceType<typeof Spin>;
export type YhSpinInstance = SpinInstance;
export type YhSpinProps = import('./src/spin').SpinProps;
export type YhSpinEmits = import('./src/spin').SpinEmits;
export type YhSpinSlots = import('./src/spin').SpinSlots;
export type YhSpinExpose = import('./src/spin').SpinExpose;
export type YhLoadingSpinnerType = import('./src/spin').LoadingSpinnerType;
