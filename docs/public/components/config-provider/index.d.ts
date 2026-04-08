import ConfigProvider from './src/config-provider';
export declare const YhConfigProvider: import("@yh-ui/utils").SFCWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    theme: {
        type: import("vue").PropType<string | import("@yh-ui/theme").PresetTheme>;
        default: string;
    };
    locale: {
        type: import("vue").PropType<import("@yh-ui/locale").Language>;
        default: import("@yh-ui/locale").Language;
    };
    size: {
        type: import("vue").PropType<"small" | "default" | "large">;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    message: {
        type: import("vue").PropType<import("@yh-ui/hooks").ConfigProviderContext["message"]>;
        default: () => {};
    };
    global: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    theme: {
        type: import("vue").PropType<string | import("@yh-ui/theme").PresetTheme>;
        default: string;
    };
    locale: {
        type: import("vue").PropType<import("@yh-ui/locale").Language>;
        default: import("@yh-ui/locale").Language;
    };
    size: {
        type: import("vue").PropType<"small" | "default" | "large">;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    message: {
        type: import("vue").PropType<import("@yh-ui/hooks").ConfigProviderContext["message"]>;
        default: () => {};
    };
    global: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    size: "large" | "default" | "small";
    message: {
        max?: number;
        duration?: number;
        offset?: number;
    } | undefined;
    theme: string;
    zIndex: number;
    locale: import("@yh-ui/locale").Language;
    global: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>> & Record<string, unknown>;
export default YhConfigProvider;
export * from './src/config-provider';
export * from './src/locale';
export { configProviderContextKey } from '@yh-ui/hooks';
export type { ConfigProviderContext } from '@yh-ui/hooks';
export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>;
