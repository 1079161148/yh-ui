import Countdown from './src/countdown.vue';
export declare const YhCountdown: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly value: {
            readonly type: import("vue").PropType<import("./index.js").CountdownValue>;
            readonly required: true;
        };
        readonly format: {
            readonly type: import("vue").PropType<import("./index.js").CountdownFormat>;
            readonly default: "HH:mm:ss";
        };
        readonly autoStart: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly interval: {
            readonly type: NumberConstructor;
            readonly default: 1000;
            readonly validator: (val: number) => boolean;
        };
        readonly precision: {
            readonly type: import("vue").PropType<1000 | 100 | 10>;
            readonly default: 1000;
            readonly validator: (val: number) => boolean;
        };
        readonly title: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly suffix: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly useMonospaceFont: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly flipAnimation: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly valueStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties | string>;
        };
        readonly separator: {
            readonly type: StringConstructor;
            readonly default: ":";
        };
        readonly showDays: {
            readonly type: import("vue").PropType<boolean | "auto">;
            readonly default: "auto";
        };
        readonly showHours: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly showMinutes: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly showSeconds: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly showMilliseconds: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly labels: {
            readonly type: import("vue").PropType<Partial<Record<keyof import("./index.js").CountdownTimeUnits, string>>>;
        };
        readonly keepAliveOnFinish: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly warningThreshold: {
            readonly type: NumberConstructor;
        };
        readonly timezoneOffset: {
            readonly type: NumberConstructor;
        };
        readonly serverTimeOffset: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onReset?: (() => any) | undefined;
        onFinish?: (() => any) | undefined;
        onWarning?: ((_ctx: import("./index.js").CountdownFormatContext) => any) | undefined;
        onStart?: (() => any) | undefined;
        onChange?: ((_ctx: import("./index.js").CountdownFormatContext) => any) | undefined;
        onPause?: (() => any) | undefined;
        onResume?: (() => any) | undefined;
        onStatusChange?: ((status: import("./index.js").CountdownStatus) => any) | undefined;
    }>, {
        start: () => void;
        pause: () => void;
        resume: () => void;
        reset: () => void;
        getRemain: () => number;
        getStatus: () => import("./index.js").CountdownStatus;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        reset: () => void;
        finish: () => void;
        warning: (_ctx: import("./index.js").CountdownFormatContext) => void;
        start: () => void;
        change: (_ctx: import("./index.js").CountdownFormatContext) => void;
        pause: () => void;
        resume: () => void;
        statusChange: (status: import("./index.js").CountdownStatus) => void;
    }, import("vue").PublicProps, {
        readonly title: string;
        readonly interval: number;
        readonly suffix: string;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly separator: string;
        readonly precision: 1000 | 10 | 100;
        readonly format: import("./index.js").CountdownFormat;
        readonly showSeconds: boolean;
        readonly autoStart: boolean;
        readonly useMonospaceFont: boolean;
        readonly flipAnimation: boolean;
        readonly showDays: boolean | "auto";
        readonly showHours: boolean;
        readonly showMinutes: boolean;
        readonly showMilliseconds: boolean;
        readonly keepAliveOnFinish: boolean;
        readonly serverTimeOffset: number;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly value: {
            readonly type: import("vue").PropType<import("./index.js").CountdownValue>;
            readonly required: true;
        };
        readonly format: {
            readonly type: import("vue").PropType<import("./index.js").CountdownFormat>;
            readonly default: "HH:mm:ss";
        };
        readonly autoStart: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly interval: {
            readonly type: NumberConstructor;
            readonly default: 1000;
            readonly validator: (val: number) => boolean;
        };
        readonly precision: {
            readonly type: import("vue").PropType<1000 | 100 | 10>;
            readonly default: 1000;
            readonly validator: (val: number) => boolean;
        };
        readonly title: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly suffix: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly useMonospaceFont: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly flipAnimation: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly valueStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties | string>;
        };
        readonly separator: {
            readonly type: StringConstructor;
            readonly default: ":";
        };
        readonly showDays: {
            readonly type: import("vue").PropType<boolean | "auto">;
            readonly default: "auto";
        };
        readonly showHours: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly showMinutes: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly showSeconds: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly showMilliseconds: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly labels: {
            readonly type: import("vue").PropType<Partial<Record<keyof import("./index.js").CountdownTimeUnits, string>>>;
        };
        readonly keepAliveOnFinish: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly warningThreshold: {
            readonly type: NumberConstructor;
        };
        readonly timezoneOffset: {
            readonly type: NumberConstructor;
        };
        readonly serverTimeOffset: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onReset?: (() => any) | undefined;
        onFinish?: (() => any) | undefined;
        onWarning?: ((_ctx: import("./index.js").CountdownFormatContext) => any) | undefined;
        onStart?: (() => any) | undefined;
        onChange?: ((_ctx: import("./index.js").CountdownFormatContext) => any) | undefined;
        onPause?: (() => any) | undefined;
        onResume?: (() => any) | undefined;
        onStatusChange?: ((status: import("./index.js").CountdownStatus) => any) | undefined;
    }>, {
        start: () => void;
        pause: () => void;
        resume: () => void;
        reset: () => void;
        getRemain: () => number;
        getStatus: () => import("./index.js").CountdownStatus;
    }, {}, {}, {}, {
        readonly title: string;
        readonly interval: number;
        readonly suffix: string;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly separator: string;
        readonly precision: 1000 | 10 | 100;
        readonly format: import("./index.js").CountdownFormat;
        readonly showSeconds: boolean;
        readonly autoStart: boolean;
        readonly useMonospaceFont: boolean;
        readonly flipAnimation: boolean;
        readonly showDays: boolean | "auto";
        readonly showHours: boolean;
        readonly showMinutes: boolean;
        readonly showMilliseconds: boolean;
        readonly keepAliveOnFinish: boolean;
        readonly serverTimeOffset: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly value: {
        readonly type: import("vue").PropType<import("./index.js").CountdownValue>;
        readonly required: true;
    };
    readonly format: {
        readonly type: import("vue").PropType<import("./index.js").CountdownFormat>;
        readonly default: "HH:mm:ss";
    };
    readonly autoStart: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly interval: {
        readonly type: NumberConstructor;
        readonly default: 1000;
        readonly validator: (val: number) => boolean;
    };
    readonly precision: {
        readonly type: import("vue").PropType<1000 | 100 | 10>;
        readonly default: 1000;
        readonly validator: (val: number) => boolean;
    };
    readonly title: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly suffix: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly useMonospaceFont: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly flipAnimation: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly valueStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties | string>;
    };
    readonly separator: {
        readonly type: StringConstructor;
        readonly default: ":";
    };
    readonly showDays: {
        readonly type: import("vue").PropType<boolean | "auto">;
        readonly default: "auto";
    };
    readonly showHours: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showMinutes: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showSeconds: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showMilliseconds: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly labels: {
        readonly type: import("vue").PropType<Partial<Record<keyof import("./index.js").CountdownTimeUnits, string>>>;
    };
    readonly keepAliveOnFinish: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly warningThreshold: {
        readonly type: NumberConstructor;
    };
    readonly timezoneOffset: {
        readonly type: NumberConstructor;
    };
    readonly serverTimeOffset: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onReset?: (() => any) | undefined;
    onFinish?: (() => any) | undefined;
    onWarning?: ((_ctx: import("./index.js").CountdownFormatContext) => any) | undefined;
    onStart?: (() => any) | undefined;
    onChange?: ((_ctx: import("./index.js").CountdownFormatContext) => any) | undefined;
    onPause?: (() => any) | undefined;
    onResume?: (() => any) | undefined;
    onStatusChange?: ((status: import("./index.js").CountdownStatus) => any) | undefined;
}>, {
    start: () => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
    getRemain: () => number;
    getStatus: () => import("./index.js").CountdownStatus;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    reset: () => void;
    finish: () => void;
    warning: (_ctx: import("./index.js").CountdownFormatContext) => void;
    start: () => void;
    change: (_ctx: import("./index.js").CountdownFormatContext) => void;
    pause: () => void;
    resume: () => void;
    statusChange: (status: import("./index.js").CountdownStatus) => void;
}, string, {
    readonly title: string;
    readonly interval: number;
    readonly suffix: string;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly separator: string;
    readonly precision: 1000 | 10 | 100;
    readonly format: import("./index.js").CountdownFormat;
    readonly showSeconds: boolean;
    readonly autoStart: boolean;
    readonly useMonospaceFont: boolean;
    readonly flipAnimation: boolean;
    readonly showDays: boolean | "auto";
    readonly showHours: boolean;
    readonly showMinutes: boolean;
    readonly showMilliseconds: boolean;
    readonly keepAliveOnFinish: boolean;
    readonly serverTimeOffset: number;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        [x: `${string}-cell`]: ((props: {
            value: string;
        }) => any) | undefined;
    } & {
        prefix?: (props: {}) => any;
    } & {
        default?: (props: {
            current: import("./index.js").CountdownFormatContext;
            remaining: number;
            formatted: string;
            status: import("./index.js").CountdownStatus;
            isWarning: boolean;
            isFinished: boolean;
        }) => any;
    } & {
        separator?: (props: {}) => any;
    } & {
        value?: (props: {
            text: string;
        }) => any;
    } & {
        suffix?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhCountdown;
export * from './src/countdown';
export type CountdownInstance = InstanceType<typeof Countdown>;
export type YhCountdownInstance = CountdownInstance;
export type YhCountdownProps = import('./src/countdown').CountdownProps;
export type YhCountdownEmits = import('./src/countdown').CountdownEmits;
export type YhCountdownExpose = import('./src/countdown').CountdownExpose;
export type YhCountdownTimeUnits = import('./src/countdown').CountdownTimeUnits;
export type YhCountdownFormatContext = import('./src/countdown').CountdownFormatContext;
export type YhCountdownValue = import('./src/countdown').CountdownValue;
export type YhCountdownFormat = import('./src/countdown').CountdownFormat;
export type YhCountdownStatus = import('./src/countdown').CountdownStatus;
