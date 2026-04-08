export declare const YhAvatar: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").AvatarProps> & Readonly<{
        onError?: ((event: Event) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        error: (event: Event) => any;
    }, import("vue").PublicProps, {
        size: import("./src/avatar").AvatarSize;
        crossorigin: "" | "anonymous" | "use-credentials";
        fit: import("./src/avatar").AvatarFit;
        shape: import("./src/avatar").AvatarShape;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").AvatarProps> & Readonly<{
        onError?: ((event: Event) => any) | undefined;
    }>, {}, {}, {}, {}, {
        size: import("./src/avatar").AvatarSize;
        crossorigin: "" | "anonymous" | "use-credentials";
        fit: import("./src/avatar").AvatarFit;
        shape: import("./src/avatar").AvatarShape;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").AvatarProps> & Readonly<{
    onError?: ((event: Event) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    error: (event: Event) => any;
}, string, {
    size: import("./src/avatar").AvatarSize;
    crossorigin: "" | "anonymous" | "use-credentials";
    fit: import("./src/avatar").AvatarFit;
    shape: import("./src/avatar").AvatarShape;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhAvatar;
export type { AvatarProps, AvatarEmits, AvatarSlots } from './src/avatar';
