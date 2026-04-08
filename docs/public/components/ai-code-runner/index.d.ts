import AiCodeRunner from './src/ai-code-runner.vue';
export declare const YhAiCodeRunner: import("@yh-ui/utils").SFCWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly language: {
        readonly type: StringConstructor;
        readonly default: "javascript";
    };
    readonly code: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly height: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: 200;
    };
    readonly autorun: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {
    run: () => Promise<void>;
    stop: () => void;
    reset: () => Promise<void>;
    clear: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    output: (data: string) => void;
    error: (error: string) => void;
    run: (code: string) => void;
    stop: () => void;
    ready: (instance: import("@webcontainer/api").WebContainer) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly language: {
        readonly type: StringConstructor;
        readonly default: "javascript";
    };
    readonly code: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly height: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: 200;
    };
    readonly autorun: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onOutput?: ((data: string) => any) | undefined;
    onError?: ((error: string) => any) | undefined;
    onRun?: ((code: string) => any) | undefined;
    onStop?: (() => any) | undefined;
    onReady?: ((instance: import("@webcontainer/api").WebContainer) => any) | undefined;
}>, {
    readonly code: string;
    readonly language: string;
    readonly height: string | number;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly autorun: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>> & Record<string, unknown>;
export default YhAiCodeRunner;
export * from './src/ai-code-runner';
export type AiCodeRunnerInstance = InstanceType<typeof AiCodeRunner>;
