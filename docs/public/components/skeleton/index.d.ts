import Skeleton from './src/skeleton.vue';
import SkeletonItem from './src/skeleton-item.vue';
export declare const YhSkeleton: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly loading: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly animated: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly rows: {
            readonly type: NumberConstructor;
            readonly default: 3;
        };
        readonly title: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly avatar: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly throttle: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly lazy: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        readonly title: boolean;
        readonly loading: boolean;
        readonly avatar: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly rows: number;
        readonly lazy: boolean;
        readonly animated: boolean;
        readonly throttle: number;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly loading: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly animated: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly rows: {
            readonly type: NumberConstructor;
            readonly default: 3;
        };
        readonly title: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly avatar: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly throttle: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly lazy: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, {
        readonly title: boolean;
        readonly loading: boolean;
        readonly avatar: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly rows: number;
        readonly lazy: boolean;
        readonly animated: boolean;
        readonly throttle: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly loading: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly animated: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly rows: {
        readonly type: NumberConstructor;
        readonly default: 3;
    };
    readonly title: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly avatar: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly throttle: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly lazy: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    readonly title: boolean;
    readonly loading: boolean;
    readonly avatar: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly rows: number;
    readonly lazy: boolean;
    readonly animated: boolean;
    readonly throttle: number;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        template?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export declare const YhSkeletonItem: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly variant: {
            readonly type: import("vue").PropType<import("./index.js").SkeletonItemVariant>;
            readonly default: "text";
        };
        readonly width: {
            readonly type: import("vue").PropType<string | number>;
        };
        readonly height: {
            readonly type: import("vue").PropType<string | number>;
        };
        readonly animated: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly round: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly sharp: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly repeat: {
            readonly type: NumberConstructor;
            readonly default: 1;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        readonly repeat: number;
        readonly round: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly variant: "button" | "caption" | "h1" | "h3" | "image" | "text" | "circle" | "rect";
        readonly animated: boolean;
        readonly sharp: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly variant: {
            readonly type: import("vue").PropType<import("./index.js").SkeletonItemVariant>;
            readonly default: "text";
        };
        readonly width: {
            readonly type: import("vue").PropType<string | number>;
        };
        readonly height: {
            readonly type: import("vue").PropType<string | number>;
        };
        readonly animated: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly round: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly sharp: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly repeat: {
            readonly type: NumberConstructor;
            readonly default: 1;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, {
        readonly repeat: number;
        readonly round: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly variant: "button" | "caption" | "h1" | "h3" | "image" | "text" | "circle" | "rect";
        readonly animated: boolean;
        readonly sharp: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly variant: {
        readonly type: import("vue").PropType<import("./index.js").SkeletonItemVariant>;
        readonly default: "text";
    };
    readonly width: {
        readonly type: import("vue").PropType<string | number>;
    };
    readonly height: {
        readonly type: import("vue").PropType<string | number>;
    };
    readonly animated: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly round: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly sharp: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly repeat: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    readonly repeat: number;
    readonly round: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly variant: "button" | "caption" | "h1" | "h3" | "image" | "text" | "circle" | "rect";
    readonly animated: boolean;
    readonly sharp: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        image?: (props: {}) => any;
    } & {
        image?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhSkeleton;
export * from './src/skeleton';
export type SkeletonInstance = InstanceType<typeof Skeleton>;
export type SkeletonItemInstance = InstanceType<typeof SkeletonItem>;
