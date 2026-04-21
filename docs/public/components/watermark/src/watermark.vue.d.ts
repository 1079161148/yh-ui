declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly width: {
        readonly type: NumberConstructor;
        readonly default: 120;
    };
    readonly height: {
        readonly type: NumberConstructor;
        readonly default: 64;
    };
    readonly rotate: {
        readonly type: NumberConstructor;
        readonly default: -22;
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 9;
    };
    readonly image: StringConstructor;
    readonly content: {
        readonly type: import("vue").PropType<string | string[]>;
        readonly default: "YH-UI";
    };
    readonly font: {
        readonly type: import("vue").PropType<import("./watermark").WatermarkFont>;
        readonly default: () => {
            color: string;
            fontSize: number;
            fontWeight: string;
            fontFamily: string;
            fontStyle: string;
            textAlign: string;
            lineHeight: number;
        };
    };
    readonly globalRotate: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly gap: {
        readonly type: import("vue").PropType<[number, number]>;
        readonly default: () => number[];
    };
    readonly offset: {
        readonly type: import("vue").PropType<[number, number]>;
        readonly default: () => number[];
    };
    readonly fullScreen: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly antiTamper: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {
    renderWatermark: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly width: {
        readonly type: NumberConstructor;
        readonly default: 120;
    };
    readonly height: {
        readonly type: NumberConstructor;
        readonly default: 64;
    };
    readonly rotate: {
        readonly type: NumberConstructor;
        readonly default: -22;
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 9;
    };
    readonly image: StringConstructor;
    readonly content: {
        readonly type: import("vue").PropType<string | string[]>;
        readonly default: "YH-UI";
    };
    readonly font: {
        readonly type: import("vue").PropType<import("./watermark").WatermarkFont>;
        readonly default: () => {
            color: string;
            fontSize: number;
            fontWeight: string;
            fontFamily: string;
            fontStyle: string;
            textAlign: string;
            lineHeight: number;
        };
    };
    readonly globalRotate: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly gap: {
        readonly type: import("vue").PropType<[number, number]>;
        readonly default: () => number[];
    };
    readonly offset: {
        readonly type: import("vue").PropType<[number, number]>;
        readonly default: () => number[];
    };
    readonly fullScreen: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly antiTamper: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {
    readonly content: string | string[];
    readonly font: import("./watermark").WatermarkFont;
    readonly width: number;
    readonly height: number;
    readonly gap: [number, number];
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly rotate: number;
    readonly zIndex: number;
    readonly offset: [number, number];
    readonly globalRotate: number;
    readonly fullScreen: boolean;
    readonly antiTamper: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
