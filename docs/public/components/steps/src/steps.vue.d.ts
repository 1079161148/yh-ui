declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly active: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly direction: {
        readonly type: import("vue").PropType<import("./steps").StepsDirection>;
        readonly default: "horizontal";
    };
    readonly alignCenter: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly simple: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly progressDot: {
        readonly type: import("vue").PropType<boolean | import("./steps").StepsProgressDot>;
        readonly default: false;
    };
    readonly finishStatus: {
        readonly type: import("vue").PropType<import("./steps").StepsStatus>;
        readonly default: "finish";
    };
    readonly processStatus: {
        readonly type: import("vue").PropType<import("./steps").StepsStatus>;
        readonly default: "process";
    };
    readonly space: {
        readonly type: import("vue").PropType<number | string>;
        readonly default: "";
    };
    readonly clickable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly size: {
        readonly type: import("vue").PropType<import("./steps").StepsSize>;
        readonly default: "default";
    };
    readonly responsive: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly responsiveBreakpoint: {
        readonly type: NumberConstructor;
        readonly default: 768;
    };
    readonly labelPlacement: {
        readonly type: import("vue").PropType<import("./steps").StepsLabelPlacement>;
        readonly default: "horizontal";
    };
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showTimeline: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (index: number) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly active: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly direction: {
        readonly type: import("vue").PropType<import("./steps").StepsDirection>;
        readonly default: "horizontal";
    };
    readonly alignCenter: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly simple: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly progressDot: {
        readonly type: import("vue").PropType<boolean | import("./steps").StepsProgressDot>;
        readonly default: false;
    };
    readonly finishStatus: {
        readonly type: import("vue").PropType<import("./steps").StepsStatus>;
        readonly default: "finish";
    };
    readonly processStatus: {
        readonly type: import("vue").PropType<import("./steps").StepsStatus>;
        readonly default: "process";
    };
    readonly space: {
        readonly type: import("vue").PropType<number | string>;
        readonly default: "";
    };
    readonly clickable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly size: {
        readonly type: import("vue").PropType<import("./steps").StepsSize>;
        readonly default: "default";
    };
    readonly responsive: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly responsiveBreakpoint: {
        readonly type: NumberConstructor;
        readonly default: 768;
    };
    readonly labelPlacement: {
        readonly type: import("vue").PropType<import("./steps").StepsLabelPlacement>;
        readonly default: "horizontal";
    };
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showTimeline: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onChange?: ((index: number) => any) | undefined;
}>, {
    readonly size: "default" | "small";
    readonly active: number;
    readonly responsive: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly direction: "vertical" | "horizontal";
    readonly space: string | number;
    readonly showProgress: boolean;
    readonly alignCenter: boolean;
    readonly simple: boolean;
    readonly progressDot: boolean | "default" | "dot" | "navigation";
    readonly finishStatus: "error" | "success" | "finish" | "process" | "wait";
    readonly processStatus: "error" | "success" | "finish" | "process" | "wait";
    readonly clickable: boolean;
    readonly responsiveBreakpoint: number;
    readonly labelPlacement: "vertical" | "horizontal";
    readonly showTimeline: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
