import Icon from './src/icon.vue';
import './src/icon.css';
export * from './src/icons';
export * from './src/icon';
export declare const YhIcon: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly name: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly svg: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly icon: {
            readonly type: import("vue").PropType<import("vue").Component>;
            readonly default: undefined;
        };
        readonly size: {
            readonly type: import("vue").PropType<number | string>;
            readonly default: undefined;
        };
        readonly color: {
            readonly type: StringConstructor;
            readonly default: undefined;
        };
        readonly spin: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly rotate: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        readonly size: string | number;
        readonly name: string;
        readonly spin: boolean;
        readonly svg: string;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly icon: import("vue").Component;
        readonly color: string;
        readonly rotate: number;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly name: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly svg: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly icon: {
            readonly type: import("vue").PropType<import("vue").Component>;
            readonly default: undefined;
        };
        readonly size: {
            readonly type: import("vue").PropType<number | string>;
            readonly default: undefined;
        };
        readonly color: {
            readonly type: StringConstructor;
            readonly default: undefined;
        };
        readonly spin: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly rotate: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, {
        readonly size: string | number;
        readonly name: string;
        readonly spin: boolean;
        readonly svg: string;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly icon: import("vue").Component;
        readonly color: string;
        readonly rotate: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly name: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly svg: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly icon: {
        readonly type: import("vue").PropType<import("vue").Component>;
        readonly default: undefined;
    };
    readonly size: {
        readonly type: import("vue").PropType<number | string>;
        readonly default: undefined;
    };
    readonly color: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    readonly spin: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly rotate: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    readonly size: string | number;
    readonly name: string;
    readonly spin: boolean;
    readonly svg: string;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly icon: import("vue").Component;
    readonly color: string;
    readonly rotate: number;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhIcon;
export type IconInstance = InstanceType<typeof Icon>;
