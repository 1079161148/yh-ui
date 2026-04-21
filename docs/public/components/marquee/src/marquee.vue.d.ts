declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_3) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly direction: {
        readonly type: import("vue").PropType<import("./marquee").MarqueeDirection>;
        readonly default: "horizontal";
        readonly validator: (val: string) => boolean;
    };
    readonly duration: {
        readonly type: NumberConstructor;
        readonly default: 20;
    };
    readonly reverse: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly pauseOnHover: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly pauseOnClick: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly gap: {
        readonly type: import("vue").PropType<number | string>;
        readonly default: 0;
    };
    readonly gradient: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly gradientColor: {
        readonly type: StringConstructor;
        readonly default: "#ffffff";
    };
    readonly gradientWidth: {
        readonly type: import("vue").PropType<number | string>;
        readonly default: "40px";
    };
    readonly autoFill: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly play: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly loop: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly speed: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly delay: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly loopDelay: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly pauseOnHidden: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {
    calculateClones: () => Promise<void>;
    containerRef: import("vue").Ref<HTMLElement | null>;
    contentRef: import("vue").Ref<HTMLElement | null>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    cycleComplete: () => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly direction: {
        readonly type: import("vue").PropType<import("./marquee").MarqueeDirection>;
        readonly default: "horizontal";
        readonly validator: (val: string) => boolean;
    };
    readonly duration: {
        readonly type: NumberConstructor;
        readonly default: 20;
    };
    readonly reverse: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly pauseOnHover: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly pauseOnClick: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly gap: {
        readonly type: import("vue").PropType<number | string>;
        readonly default: 0;
    };
    readonly gradient: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly gradientColor: {
        readonly type: StringConstructor;
        readonly default: "#ffffff";
    };
    readonly gradientWidth: {
        readonly type: import("vue").PropType<number | string>;
        readonly default: "40px";
    };
    readonly autoFill: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly play: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly loop: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly speed: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly delay: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly loopDelay: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly pauseOnHidden: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onCycleComplete?: (() => any) | undefined;
}>, {
    readonly reverse: boolean;
    readonly play: boolean;
    readonly gap: string | number;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly direction: "vertical" | "horizontal";
    readonly duration: number;
    readonly delay: number;
    readonly gradient: boolean;
    readonly pauseOnHover: boolean;
    readonly pauseOnClick: boolean;
    readonly gradientColor: string;
    readonly gradientWidth: string | number;
    readonly autoFill: boolean;
    readonly loop: number;
    readonly speed: number;
    readonly loopDelay: number;
    readonly pauseOnHidden: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
