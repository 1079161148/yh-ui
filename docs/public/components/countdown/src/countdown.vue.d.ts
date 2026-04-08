import { type CountdownStatus, type CountdownFormatContext } from './countdown';
declare var __VLS_1: {}, __VLS_3: {
    current: CountdownFormatContext;
    remaining: number;
    formatted: string;
    status: CountdownStatus;
    isWarning: boolean;
    isFinished: boolean;
}, __VLS_5: {}, __VLS_8: `${string}-cell`, __VLS_9: {
    value: string;
}, __VLS_11: {
    text: string;
}, __VLS_13: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_8>]?: (props: typeof __VLS_9) => any;
} & {
    prefix?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_3) => any;
} & {
    separator?: (props: typeof __VLS_5) => any;
} & {
    value?: (props: typeof __VLS_11) => any;
} & {
    suffix?: (props: typeof __VLS_13) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly value: {
        readonly type: import("vue").PropType<import("./countdown").CountdownValue>;
        readonly required: true;
    };
    readonly format: {
        readonly type: import("vue").PropType<import("./countdown").CountdownFormat>;
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
        readonly type: import("vue").PropType<Partial<Record<keyof import("./countdown").CountdownTimeUnits, string>>>;
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
}>, {
    start: () => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
    getRemain: () => number;
    getStatus: () => CountdownStatus;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    reset: () => void;
    finish: () => void;
    warning: (_ctx: CountdownFormatContext) => void;
    start: () => void;
    change: (_ctx: CountdownFormatContext) => void;
    pause: () => void;
    resume: () => void;
    statusChange: (status: CountdownStatus) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly value: {
        readonly type: import("vue").PropType<import("./countdown").CountdownValue>;
        readonly required: true;
    };
    readonly format: {
        readonly type: import("vue").PropType<import("./countdown").CountdownFormat>;
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
        readonly type: import("vue").PropType<Partial<Record<keyof import("./countdown").CountdownTimeUnits, string>>>;
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
    onWarning?: ((_ctx: CountdownFormatContext) => any) | undefined;
    onStart?: (() => any) | undefined;
    onChange?: ((_ctx: CountdownFormatContext) => any) | undefined;
    onPause?: (() => any) | undefined;
    onResume?: (() => any) | undefined;
    onStatusChange?: ((status: CountdownStatus) => any) | undefined;
}>, {
    readonly title: string;
    readonly interval: number;
    readonly suffix: string;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly separator: string;
    readonly precision: 1000 | 10 | 100;
    readonly format: import("./countdown").CountdownFormat;
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
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
