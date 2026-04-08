import Watermark from './src/watermark.vue';
export declare const YhWatermark: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
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
            readonly type: import("vue").PropType<{
                color?: string;
                fontSize?: number | string;
                fontWeight?: string | number;
                fontFamily?: string;
                fontStyle?: "normal" | "italic" | "oblique";
                textAlign?: "start" | "end" | "left" | "right" | "center";
                lineHeight?: number;
            }>;
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
        renderWatermark: () => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        readonly content: string | string[];
        readonly font: {
            color?: string;
            fontSize?: number | string;
            fontWeight?: string | number;
            fontFamily?: string;
            fontStyle?: "normal" | "italic" | "oblique";
            textAlign?: "start" | "end" | "left" | "right" | "center";
            lineHeight?: number;
        };
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
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
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
            readonly type: import("vue").PropType<{
                color?: string;
                fontSize?: number | string;
                fontWeight?: string | number;
                fontFamily?: string;
                fontStyle?: "normal" | "italic" | "oblique";
                textAlign?: "start" | "end" | "left" | "right" | "center";
                lineHeight?: number;
            }>;
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
        renderWatermark: () => void;
    }, {}, {}, {}, {
        readonly content: string | string[];
        readonly font: {
            color?: string;
            fontSize?: number | string;
            fontWeight?: string | number;
            fontFamily?: string;
            fontStyle?: "normal" | "italic" | "oblique";
            textAlign?: "start" | "end" | "left" | "right" | "center";
            lineHeight?: number;
        };
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
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
        readonly type: import("vue").PropType<{
            color?: string;
            fontSize?: number | string;
            fontWeight?: string | number;
            fontFamily?: string;
            fontStyle?: "normal" | "italic" | "oblique";
            textAlign?: "start" | "end" | "left" | "right" | "center";
            lineHeight?: number;
        }>;
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
    renderWatermark: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    readonly content: string | string[];
    readonly font: {
        color?: string;
        fontSize?: number | string;
        fontWeight?: string | number;
        fontFamily?: string;
        fontStyle?: "normal" | "italic" | "oblique";
        textAlign?: "start" | "end" | "left" | "right" | "center";
        lineHeight?: number;
    };
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
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhWatermark;
export * from './src/watermark';
export type WatermarkInstance = InstanceType<typeof Watermark>;
