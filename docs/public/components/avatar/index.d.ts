import Avatar from './src/avatar.vue';
export declare const YhAvatar: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").AvatarProps> & Readonly<{
        onError?: ((event: Event) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        error: (event: Event) => any;
    }, import("vue").PublicProps, {
        size: import("./index.js").AvatarSize;
        crossorigin: "" | "anonymous" | "use-credentials";
        fit: import("./index.js").AvatarFit;
        shape: import("./index.js").AvatarShape;
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
        size: import("./index.js").AvatarSize;
        crossorigin: "" | "anonymous" | "use-credentials";
        fit: import("./index.js").AvatarFit;
        shape: import("./index.js").AvatarShape;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").AvatarProps> & Readonly<{
    onError?: ((event: Event) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    error: (event: Event) => any;
}, string, {
    size: import("./index.js").AvatarSize;
    crossorigin: "" | "anonymous" | "use-credentials";
    fit: import("./index.js").AvatarFit;
    shape: import("./index.js").AvatarShape;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhAvatar;
export * from './src/avatar';
export type { AvatarProps, AvatarEmits, AvatarSlots } from './src/avatar';
export type AvatarInstance = InstanceType<typeof Avatar>;
export type YhAvatarInstance = AvatarInstance;
export type YhAvatarProps = import('./src/avatar').AvatarProps;
export type YhAvatarEmits = import('./src/avatar').AvatarEmits;
export type YhAvatarSlots = import('./src/avatar').AvatarSlots;
export type YhAvatarShape = import('./src/avatar').AvatarShape;
export type YhAvatarSize = import('./src/avatar').AvatarSize;
export type YhAvatarFit = import('./src/avatar').AvatarFit;
