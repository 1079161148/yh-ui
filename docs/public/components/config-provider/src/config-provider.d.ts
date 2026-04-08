import type { PropType, ExtractPropTypes } from 'vue';
import type { PresetTheme } from '@yh-ui/theme';
import type { Language } from '@yh-ui/locale';
import type { ConfigProviderContext } from '@yh-ui/hooks';
export declare const configProviderProps: {
    theme: {
        type: PropType<string | PresetTheme>;
        default: string;
    };
    locale: {
        type: PropType<Language>;
        default: Language;
    };
    size: {
        type: PropType<"small" | "default" | "large">;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    message: {
        type: PropType<ConfigProviderContext["message"]>;
        default: () => {};
    };
    global: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;
declare const _default: import("vue").DefineComponent<ExtractPropTypes<{
    theme: {
        type: PropType<string | PresetTheme>;
        default: string;
    };
    locale: {
        type: PropType<Language>;
        default: Language;
    };
    size: {
        type: PropType<"small" | "default" | "large">;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    message: {
        type: PropType<ConfigProviderContext["message"]>;
        default: () => {};
    };
    global: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    theme: {
        type: PropType<string | PresetTheme>;
        default: string;
    };
    locale: {
        type: PropType<Language>;
        default: Language;
    };
    size: {
        type: PropType<"small" | "default" | "large">;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    message: {
        type: PropType<ConfigProviderContext["message"]>;
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
    locale: Language;
    global: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
