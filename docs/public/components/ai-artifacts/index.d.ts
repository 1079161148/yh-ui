import AiArtifacts from './src/ai-artifacts.vue';
export declare const YhAiArtifacts: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        data: {
            type: import("vue").PropType<import("./index.js").ArtifactData>;
        };
        width: {
            type: import("vue").PropType<string | number>;
            default: string;
        };
        fullscreen: {
            type: BooleanConstructor;
            default: boolean;
        };
        mode: {
            type: import("vue").PropType<"preview" | "code" | "inline">;
            default: string;
        };
        themeOverrides: {
            type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            default: undefined;
        };
        echartsOption: {
            type: import("vue").PropType<import("./index.js").ArtifactEChartsOption>;
            default: undefined;
        };
        autoLoadECharts: {
            type: BooleanConstructor;
            default: boolean;
        };
        echartsTheme: {
            type: import("vue").PropType<"light" | "dark" | "default">;
            default: string;
        };
        echartsDataZoom: {
            type: BooleanConstructor;
            default: boolean;
        };
        echartsToolbox: {
            type: BooleanConstructor;
            default: boolean;
        };
        chartHeight: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        responsiveWidth: {
            type: BooleanConstructor;
            default: boolean;
        };
        chartLoadingText: {
            type: StringConstructor;
            default: string;
        };
    }>> & Readonly<{
        onClose?: (() => any) | undefined;
        "onUpdate:visible"?: ((_val: boolean) => any) | undefined;
        "onUpdate:mode"?: ((_val: "code" | "preview" | "inline") => any) | undefined;
        "onVersion-change"?: ((_version: import("./index.js").ArtifactVersion) => any) | undefined;
        "onChart-click"?: ((_params: unknown) => any) | undefined;
        "onChart-ready"?: ((_chart: unknown) => any) | undefined;
        "onChart-error"?: ((_error: Error) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        close: () => void;
        "update:visible": (_val: boolean) => void;
        "update:mode": (_val: "code" | "preview" | "inline") => void;
        "version-change": (_version: import("./index.js").ArtifactVersion) => void;
        "chart-click": (_params: unknown) => void;
        "chart-ready": (_chart: unknown) => void;
        "chart-error": (_error: Error) => void;
    }, import("vue").PublicProps, {
        mode: "code" | "preview" | "inline";
        fullscreen: boolean;
        width: string | number;
        themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        visible: boolean;
        echartsOption: import("./index.js").ArtifactEChartsOption;
        autoLoadECharts: boolean;
        echartsTheme: "default" | "dark" | "light";
        echartsDataZoom: boolean;
        echartsToolbox: boolean;
        chartHeight: string | number;
        responsiveWidth: boolean;
        chartLoadingText: string;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        visible: {
            type: BooleanConstructor;
            default: boolean;
        };
        data: {
            type: import("vue").PropType<import("./index.js").ArtifactData>;
        };
        width: {
            type: import("vue").PropType<string | number>;
            default: string;
        };
        fullscreen: {
            type: BooleanConstructor;
            default: boolean;
        };
        mode: {
            type: import("vue").PropType<"preview" | "code" | "inline">;
            default: string;
        };
        themeOverrides: {
            type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            default: undefined;
        };
        echartsOption: {
            type: import("vue").PropType<import("./index.js").ArtifactEChartsOption>;
            default: undefined;
        };
        autoLoadECharts: {
            type: BooleanConstructor;
            default: boolean;
        };
        echartsTheme: {
            type: import("vue").PropType<"light" | "dark" | "default">;
            default: string;
        };
        echartsDataZoom: {
            type: BooleanConstructor;
            default: boolean;
        };
        echartsToolbox: {
            type: BooleanConstructor;
            default: boolean;
        };
        chartHeight: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        responsiveWidth: {
            type: BooleanConstructor;
            default: boolean;
        };
        chartLoadingText: {
            type: StringConstructor;
            default: string;
        };
    }>> & Readonly<{
        onClose?: (() => any) | undefined;
        "onUpdate:visible"?: ((_val: boolean) => any) | undefined;
        "onUpdate:mode"?: ((_val: "code" | "preview" | "inline") => any) | undefined;
        "onVersion-change"?: ((_version: import("./index.js").ArtifactVersion) => any) | undefined;
        "onChart-click"?: ((_params: unknown) => any) | undefined;
        "onChart-ready"?: ((_chart: unknown) => any) | undefined;
        "onChart-error"?: ((_error: Error) => any) | undefined;
    }>, {}, {}, {}, {}, {
        mode: "code" | "preview" | "inline";
        fullscreen: boolean;
        width: string | number;
        themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        visible: boolean;
        echartsOption: import("./index.js").ArtifactEChartsOption;
        autoLoadECharts: boolean;
        echartsTheme: "default" | "dark" | "light";
        echartsDataZoom: boolean;
        echartsToolbox: boolean;
        chartHeight: string | number;
        responsiveWidth: boolean;
        chartLoadingText: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    data: {
        type: import("vue").PropType<import("./index.js").ArtifactData>;
    };
    width: {
        type: import("vue").PropType<string | number>;
        default: string;
    };
    fullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    mode: {
        type: import("vue").PropType<"preview" | "code" | "inline">;
        default: string;
    };
    themeOverrides: {
        type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        default: undefined;
    };
    echartsOption: {
        type: import("vue").PropType<import("./index.js").ArtifactEChartsOption>;
        default: undefined;
    };
    autoLoadECharts: {
        type: BooleanConstructor;
        default: boolean;
    };
    echartsTheme: {
        type: import("vue").PropType<"light" | "dark" | "default">;
        default: string;
    };
    echartsDataZoom: {
        type: BooleanConstructor;
        default: boolean;
    };
    echartsToolbox: {
        type: BooleanConstructor;
        default: boolean;
    };
    chartHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    responsiveWidth: {
        type: BooleanConstructor;
        default: boolean;
    };
    chartLoadingText: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    onClose?: (() => any) | undefined;
    "onUpdate:visible"?: ((_val: boolean) => any) | undefined;
    "onUpdate:mode"?: ((_val: "code" | "preview" | "inline") => any) | undefined;
    "onVersion-change"?: ((_version: import("./index.js").ArtifactVersion) => any) | undefined;
    "onChart-click"?: ((_params: unknown) => any) | undefined;
    "onChart-ready"?: ((_chart: unknown) => any) | undefined;
    "onChart-error"?: ((_error: Error) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => void;
    "update:visible": (_val: boolean) => void;
    "update:mode": (_val: "code" | "preview" | "inline") => void;
    "version-change": (_version: import("./index.js").ArtifactVersion) => void;
    "chart-click": (_params: unknown) => void;
    "chart-ready": (_chart: unknown) => void;
    "chart-error": (_error: Error) => void;
}, string, {
    mode: "code" | "preview" | "inline";
    fullscreen: boolean;
    width: string | number;
    themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    visible: boolean;
    echartsOption: import("./index.js").ArtifactEChartsOption;
    autoLoadECharts: boolean;
    echartsTheme: "default" | "dark" | "light";
    echartsDataZoom: boolean;
    echartsToolbox: boolean;
    chartHeight: string | number;
    responsiveWidth: boolean;
    chartLoadingText: string;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        chart?: (props: {
            data: import("./index.js").ArtifactVersion | null;
            title: string;
        }) => any;
    } & {
        canvas?: (props: {
            data: import("./index.js").ArtifactVersion | null;
        }) => any;
    };
})> & Record<string, unknown>;
export default YhAiArtifacts;
export * from './src/ai-artifacts';
export type AiArtifactsInstance = InstanceType<typeof AiArtifacts>;
export type YhAiArtifactsInstance = AiArtifactsInstance;
export type YhAiArtifactsProps = import('./src/ai-artifacts').AiArtifactsProps;
export type YhAiArtifactsEmits = import('./src/ai-artifacts').AiArtifactsEmits;
export type YhAiArtifactsSlots = import('./src/ai-artifacts').AiArtifactsSlots;
export type YhArtifactType = import('./src/ai-artifacts').ArtifactType;
export type YhArtifactVersion = import('./src/ai-artifacts').ArtifactVersion;
export type YhArtifactEChartsOption = import('./src/ai-artifacts').ArtifactEChartsOption;
export type YhArtifactData = import('./src/ai-artifacts').ArtifactData;
