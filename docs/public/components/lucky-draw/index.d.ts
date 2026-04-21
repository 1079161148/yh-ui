import LuckyDraw from './src/lucky-draw.vue';
export declare const YhLuckyDraw: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        type: {
            type: import("vue").PropType<import("./index.js").LuckyDrawType>;
            default: string;
        };
        prizes: {
            type: import("vue").PropType<import("./index.js").LuckyPrize[]>;
            default: () => never[];
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        targetId: {
            type: import("vue").PropType<string | number>;
            default: string;
        };
        size: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        rounds: {
            type: NumberConstructor;
            default: number;
        };
        duration: {
            type: NumberConstructor;
            default: number;
        };
        actionText: {
            type: StringConstructor;
            default: string;
        };
        hideBtn: {
            type: BooleanConstructor;
            default: boolean;
        };
        themeOverrides: {
            type: import("vue").PropType<Record<string, string>>;
            default: () => {};
        };
    }>> & Readonly<{
        onFinish?: ((prize: import("./index.js").LuckyPrize) => any) | undefined;
        onStart?: (() => any) | undefined;
        onClick?: ((e: MouseEvent) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        finish: (prize: import("./index.js").LuckyPrize) => void;
        start: () => void;
        click: (e: MouseEvent) => void;
    }, import("vue").PublicProps, {
        size: string | number;
        loading: boolean;
        type: import("./index.js").LuckyDrawType;
        themeOverrides: Record<string, string>;
        duration: number;
        actionText: string;
        prizes: import("./index.js").LuckyPrize[];
        targetId: string | number;
        rounds: number;
        hideBtn: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        type: {
            type: import("vue").PropType<import("./index.js").LuckyDrawType>;
            default: string;
        };
        prizes: {
            type: import("vue").PropType<import("./index.js").LuckyPrize[]>;
            default: () => never[];
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        targetId: {
            type: import("vue").PropType<string | number>;
            default: string;
        };
        size: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        rounds: {
            type: NumberConstructor;
            default: number;
        };
        duration: {
            type: NumberConstructor;
            default: number;
        };
        actionText: {
            type: StringConstructor;
            default: string;
        };
        hideBtn: {
            type: BooleanConstructor;
            default: boolean;
        };
        themeOverrides: {
            type: import("vue").PropType<Record<string, string>>;
            default: () => {};
        };
    }>> & Readonly<{
        onFinish?: ((prize: import("./index.js").LuckyPrize) => any) | undefined;
        onStart?: (() => any) | undefined;
        onClick?: ((e: MouseEvent) => any) | undefined;
    }>, {}, {}, {}, {}, {
        size: string | number;
        loading: boolean;
        type: import("./index.js").LuckyDrawType;
        themeOverrides: Record<string, string>;
        duration: number;
        actionText: string;
        prizes: import("./index.js").LuckyPrize[];
        targetId: string | number;
        rounds: number;
        hideBtn: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: import("vue").PropType<import("./index.js").LuckyDrawType>;
        default: string;
    };
    prizes: {
        type: import("vue").PropType<import("./index.js").LuckyPrize[]>;
        default: () => never[];
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    targetId: {
        type: import("vue").PropType<string | number>;
        default: string;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    rounds: {
        type: NumberConstructor;
        default: number;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    actionText: {
        type: StringConstructor;
        default: string;
    };
    hideBtn: {
        type: BooleanConstructor;
        default: boolean;
    };
    themeOverrides: {
        type: import("vue").PropType<Record<string, string>>;
        default: () => {};
    };
}>> & Readonly<{
    onFinish?: ((prize: import("./index.js").LuckyPrize) => any) | undefined;
    onStart?: (() => any) | undefined;
    onClick?: ((e: MouseEvent) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    finish: (prize: import("./index.js").LuckyPrize) => void;
    start: () => void;
    click: (e: MouseEvent) => void;
}, string, {
    size: string | number;
    loading: boolean;
    type: import("./index.js").LuckyDrawType;
    themeOverrides: Record<string, string>;
    duration: number;
    actionText: string;
    prizes: import("./index.js").LuckyPrize[];
    targetId: string | number;
    rounds: number;
    hideBtn: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        prize?: (props: {
            prize: import("./index.js").LuckyPrize;
        }) => any;
    } & {
        action?: (props: {}) => any;
    } & {
        prize?: (props: {
            prize: import("./index.js").LuckyPrize;
        }) => any;
    } & {
        action?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhLuckyDraw;
export * from './src/lucky-draw';
export type LuckyDrawInstance = InstanceType<typeof LuckyDraw>;
export type YhLuckyDrawInstance = LuckyDrawInstance;
export type YhLuckyDrawProps = import('./src/lucky-draw').LuckyDrawProps;
export type YhLuckyDrawEmits = import('./src/lucky-draw').LuckyDrawEmits;
export type YhLuckyDrawSlots = import('./src/lucky-draw').LuckyDrawSlots;
export type YhLuckyPrize = import('./src/lucky-draw').LuckyPrize;
export type YhLuckyDrawType = import('./src/lucky-draw').LuckyDrawType;
