import AiProvider from './src/ai-provider.vue';
export declare const YhAiProvider: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<{
        baseUrl?: string;
        token?: string;
        headers?: Record<string, string>;
        userAvatar?: string;
        assistantAvatar?: string;
        userName?: string;
        assistantName?: string;
        systemPrompt?: string;
        typewriter?: {
            enabled?: boolean;
            charsPerFrame?: number;
        };
        timeout?: number;
        withCredentials?: boolean;
        mode?: "cors" | "no-cors" | "same-origin";
        cache?: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
    }> & Readonly<{}>, {
        addRequestInterceptor: (interceptor: Parameters<(interceptor: import("./index.js").AiRequestInterceptor) => number>[0]) => number;
        addResponseInterceptor: (interceptor: Parameters<(interceptor: import("./index.js").AiResponseInterceptor) => number>[0]) => number;
        removeRequestInterceptor: (id: number) => void;
        removeResponseInterceptor: (id: number) => void;
        clearInterceptors: () => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        mode: "cors" | "no-cors" | "same-origin";
        typewriter: {
            enabled?: boolean;
            charsPerFrame?: number;
        };
        systemPrompt: string;
        headers: Record<string, string>;
        withCredentials: boolean;
        baseUrl: string;
        token: string;
        userAvatar: string;
        assistantAvatar: string;
        userName: string;
        assistantName: string;
        timeout: number;
        cache: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<{
        baseUrl?: string;
        token?: string;
        headers?: Record<string, string>;
        userAvatar?: string;
        assistantAvatar?: string;
        userName?: string;
        assistantName?: string;
        systemPrompt?: string;
        typewriter?: {
            enabled?: boolean;
            charsPerFrame?: number;
        };
        timeout?: number;
        withCredentials?: boolean;
        mode?: "cors" | "no-cors" | "same-origin";
        cache?: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
    }> & Readonly<{}>, {
        addRequestInterceptor: (interceptor: Parameters<(interceptor: import("./index.js").AiRequestInterceptor) => number>[0]) => number;
        addResponseInterceptor: (interceptor: Parameters<(interceptor: import("./index.js").AiResponseInterceptor) => number>[0]) => number;
        removeRequestInterceptor: (id: number) => void;
        removeResponseInterceptor: (id: number) => void;
        clearInterceptors: () => void;
    }, {}, {}, {}, {
        mode: "cors" | "no-cors" | "same-origin";
        typewriter: {
            enabled?: boolean;
            charsPerFrame?: number;
        };
        systemPrompt: string;
        headers: Record<string, string>;
        withCredentials: boolean;
        baseUrl: string;
        token: string;
        userAvatar: string;
        assistantAvatar: string;
        userName: string;
        assistantName: string;
        timeout: number;
        cache: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<{
    baseUrl?: string;
    token?: string;
    headers?: Record<string, string>;
    userAvatar?: string;
    assistantAvatar?: string;
    userName?: string;
    assistantName?: string;
    systemPrompt?: string;
    typewriter?: {
        enabled?: boolean;
        charsPerFrame?: number;
    };
    timeout?: number;
    withCredentials?: boolean;
    mode?: "cors" | "no-cors" | "same-origin";
    cache?: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
}> & Readonly<{}>, {
    addRequestInterceptor: (interceptor: Parameters<(interceptor: import("./index.js").AiRequestInterceptor) => number>[0]) => number;
    addResponseInterceptor: (interceptor: Parameters<(interceptor: import("./index.js").AiResponseInterceptor) => number>[0]) => number;
    removeRequestInterceptor: (id: number) => void;
    removeResponseInterceptor: (id: number) => void;
    clearInterceptors: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    mode: "cors" | "no-cors" | "same-origin";
    typewriter: {
        enabled?: boolean;
        charsPerFrame?: number;
    };
    systemPrompt: string;
    headers: Record<string, string>;
    withCredentials: boolean;
    baseUrl: string;
    token: string;
    userAvatar: string;
    assistantAvatar: string;
    userName: string;
    assistantName: string;
    timeout: number;
    cache: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhAiProvider;
export * from './src/ai-provider';
export * from './src/use-ai-provider';
export type AiProviderInstance = InstanceType<typeof AiProvider>;
