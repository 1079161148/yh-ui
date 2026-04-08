import Progress from './src/progress.vue';
export declare const YhProgress: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly type: {
            readonly type: import("vue").PropType<import("./index.js").ProgressType>;
            readonly default: "line";
        };
        readonly percentage: {
            readonly type: import("vue").PropType<number | number[]>;
            readonly default: 0;
        };
        readonly secondaryPercentage: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly status: {
            readonly type: import("vue").PropType<import("./index.js").ProgressStatus>;
        };
        readonly strokeWidth: {
            readonly type: NumberConstructor;
            readonly default: 6;
        };
        readonly textInside: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly width: {
            readonly type: NumberConstructor;
            readonly default: 126;
        };
        readonly showText: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly color: {
            readonly type: import("vue").PropType<string | ((p: number) => string) | string[] | Record<string, string>>;
            readonly default: "";
        };
        readonly icon: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly animated: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly defineBackgroundColor: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly format: {
            readonly type: import("vue").PropType<(percentage: number) => string>;
        };
        readonly strokeLinecap: {
            readonly type: import("vue").PropType<"butt" | "round" | "square">;
            readonly default: "round";
        };
        readonly striped: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly stripedFlow: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly indeterminate: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly duration: {
            readonly type: NumberConstructor;
            readonly default: 3;
        };
        readonly steps: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        readonly steps: number;
        readonly type: "circle" | "line" | "dashboard";
        readonly width: number;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly icon: string;
        readonly color: string | string[] | Record<string, string> | ((p: number) => string);
        readonly strokeLinecap: "round" | "butt" | "square";
        readonly strokeWidth: number;
        readonly duration: number;
        readonly indeterminate: boolean;
        readonly showText: boolean;
        readonly animated: boolean;
        readonly percentage: number | number[];
        readonly secondaryPercentage: number;
        readonly textInside: boolean;
        readonly defineBackgroundColor: string;
        readonly striped: boolean;
        readonly stripedFlow: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly type: {
            readonly type: import("vue").PropType<import("./index.js").ProgressType>;
            readonly default: "line";
        };
        readonly percentage: {
            readonly type: import("vue").PropType<number | number[]>;
            readonly default: 0;
        };
        readonly secondaryPercentage: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly status: {
            readonly type: import("vue").PropType<import("./index.js").ProgressStatus>;
        };
        readonly strokeWidth: {
            readonly type: NumberConstructor;
            readonly default: 6;
        };
        readonly textInside: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly width: {
            readonly type: NumberConstructor;
            readonly default: 126;
        };
        readonly showText: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly color: {
            readonly type: import("vue").PropType<string | ((p: number) => string) | string[] | Record<string, string>>;
            readonly default: "";
        };
        readonly icon: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly animated: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly defineBackgroundColor: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly format: {
            readonly type: import("vue").PropType<(percentage: number) => string>;
        };
        readonly strokeLinecap: {
            readonly type: import("vue").PropType<"butt" | "round" | "square">;
            readonly default: "round";
        };
        readonly striped: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly stripedFlow: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly indeterminate: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly duration: {
            readonly type: NumberConstructor;
            readonly default: 3;
        };
        readonly steps: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, {
        readonly steps: number;
        readonly type: "circle" | "line" | "dashboard";
        readonly width: number;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly icon: string;
        readonly color: string | string[] | Record<string, string> | ((p: number) => string);
        readonly strokeLinecap: "round" | "butt" | "square";
        readonly strokeWidth: number;
        readonly duration: number;
        readonly indeterminate: boolean;
        readonly showText: boolean;
        readonly animated: boolean;
        readonly percentage: number | number[];
        readonly secondaryPercentage: number;
        readonly textInside: boolean;
        readonly defineBackgroundColor: string;
        readonly striped: boolean;
        readonly stripedFlow: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly type: {
        readonly type: import("vue").PropType<import("./index.js").ProgressType>;
        readonly default: "line";
    };
    readonly percentage: {
        readonly type: import("vue").PropType<number | number[]>;
        readonly default: 0;
    };
    readonly secondaryPercentage: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly status: {
        readonly type: import("vue").PropType<import("./index.js").ProgressStatus>;
    };
    readonly strokeWidth: {
        readonly type: NumberConstructor;
        readonly default: 6;
    };
    readonly textInside: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly width: {
        readonly type: NumberConstructor;
        readonly default: 126;
    };
    readonly showText: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly color: {
        readonly type: import("vue").PropType<string | ((p: number) => string) | string[] | Record<string, string>>;
        readonly default: "";
    };
    readonly icon: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly animated: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly defineBackgroundColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly format: {
        readonly type: import("vue").PropType<(percentage: number) => string>;
    };
    readonly strokeLinecap: {
        readonly type: import("vue").PropType<"butt" | "round" | "square">;
        readonly default: "round";
    };
    readonly striped: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly stripedFlow: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly indeterminate: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly duration: {
        readonly type: NumberConstructor;
        readonly default: 3;
    };
    readonly steps: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    readonly steps: number;
    readonly type: "circle" | "line" | "dashboard";
    readonly width: number;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly icon: string;
    readonly color: string | string[] | Record<string, string> | ((p: number) => string);
    readonly strokeLinecap: "round" | "butt" | "square";
    readonly strokeWidth: number;
    readonly duration: number;
    readonly indeterminate: boolean;
    readonly showText: boolean;
    readonly animated: boolean;
    readonly percentage: number | number[];
    readonly secondaryPercentage: number;
    readonly textInside: boolean;
    readonly defineBackgroundColor: string;
    readonly striped: boolean;
    readonly stripedFlow: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {
            percentage: number;
        }) => any;
    } & {
        default?: (props: {
            percentage: number;
        }) => any;
    } & {
        default?: (props: {
            percentage: number;
        }) => any;
    };
})> & Record<string, unknown>;
export default YhProgress;
export * from './src/progress';
export type ProgressInstance = InstanceType<typeof Progress>;
