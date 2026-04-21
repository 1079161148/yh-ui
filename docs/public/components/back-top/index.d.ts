import BackTop from './src/back-top.vue';
export declare const YhBackTop: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly visibilityHeight: {
            readonly type: NumberConstructor;
            readonly default: 200;
        };
        readonly target: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly right: {
            readonly type: NumberConstructor;
            readonly default: 40;
        };
        readonly bottom: {
            readonly type: NumberConstructor;
            readonly default: 40;
        };
        readonly showProgress: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly progressColor: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly duration: {
            readonly type: NumberConstructor;
            readonly default: 400;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onClick?: ((evt: MouseEvent) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        click: (evt: MouseEvent) => void;
    }, import("vue").PublicProps, {
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly progressColor: string;
        readonly right: number;
        readonly bottom: number;
        readonly duration: number;
        readonly target: string;
        readonly visibilityHeight: number;
        readonly showProgress: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly visibilityHeight: {
            readonly type: NumberConstructor;
            readonly default: 200;
        };
        readonly target: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly right: {
            readonly type: NumberConstructor;
            readonly default: 40;
        };
        readonly bottom: {
            readonly type: NumberConstructor;
            readonly default: 40;
        };
        readonly showProgress: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly progressColor: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly duration: {
            readonly type: NumberConstructor;
            readonly default: 400;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onClick?: ((evt: MouseEvent) => any) | undefined;
    }>, {}, {}, {}, {}, {
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly progressColor: string;
        readonly right: number;
        readonly bottom: number;
        readonly duration: number;
        readonly target: string;
        readonly visibilityHeight: number;
        readonly showProgress: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly visibilityHeight: {
        readonly type: NumberConstructor;
        readonly default: 200;
    };
    readonly target: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly right: {
        readonly type: NumberConstructor;
        readonly default: 40;
    };
    readonly bottom: {
        readonly type: NumberConstructor;
        readonly default: 40;
    };
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly progressColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly duration: {
        readonly type: NumberConstructor;
        readonly default: 400;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onClick?: ((evt: MouseEvent) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (evt: MouseEvent) => void;
}, string, {
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly progressColor: string;
    readonly right: number;
    readonly bottom: number;
    readonly duration: number;
    readonly target: string;
    readonly visibilityHeight: number;
    readonly showProgress: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhBackTop;
export * from './src/back-top';
export type BackTopInstance = InstanceType<typeof BackTop>;
export type YhBackTopInstance = BackTopInstance;
export type YhBackTopProps = import('./src/back-top').BackTopProps;
export type YhBackTopEmits = import('./src/back-top').BackTopEmits;
export type YhBackTopSlots = import('./src/back-top').BackTopSlots;
