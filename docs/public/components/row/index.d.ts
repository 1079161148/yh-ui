import Row from './src/row.vue';
export declare const YhRow: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly tag: {
            readonly type: StringConstructor;
            readonly default: "div";
        };
        readonly gutter: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly justify: {
            readonly type: import("vue").PropType<import("./index.js").RowJustify>;
            readonly default: "start";
        };
        readonly align: {
            readonly type: import("vue").PropType<import("./index.js").RowAlign>;
            readonly default: "top";
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        readonly tag: string;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly justify: import("./index.js").RowJustify;
        readonly gutter: number;
        readonly align: import("./index.js").RowAlign;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly tag: {
            readonly type: StringConstructor;
            readonly default: "div";
        };
        readonly gutter: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly justify: {
            readonly type: import("vue").PropType<import("./index.js").RowJustify>;
            readonly default: "start";
        };
        readonly align: {
            readonly type: import("vue").PropType<import("./index.js").RowAlign>;
            readonly default: "top";
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, {
        readonly tag: string;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly justify: import("./index.js").RowJustify;
        readonly gutter: number;
        readonly align: import("./index.js").RowAlign;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly gutter: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly justify: {
        readonly type: import("vue").PropType<import("./index.js").RowJustify>;
        readonly default: "start";
    };
    readonly align: {
        readonly type: import("vue").PropType<import("./index.js").RowAlign>;
        readonly default: "top";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    readonly tag: string;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly justify: import("./index.js").RowJustify;
    readonly gutter: number;
    readonly align: import("./index.js").RowAlign;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhRow;
export * from './src/row';
export type RowInstance = InstanceType<typeof Row>;
export type YhRowJustify = import('./src/row').RowJustify;
export type YhRowAlign = import('./src/row').RowAlign;
export type YhRowProps = import('./src/row').RowProps;
export type YhRowSlots = import('./src/row').RowSlots;
export type YhRowContext = import('./src/row').RowContext;
export type YhRowInstance = RowInstance;
