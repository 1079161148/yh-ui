import Result from './src/result.vue';
export declare const YhResult: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").ResultProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        icon: import("./index.js").ResultIconType;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").ResultProps> & Readonly<{}>, {}, {}, {}, {}, {
        icon: import("./index.js").ResultIconType;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").ResultProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    icon: import("./index.js").ResultIconType;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        icon?: (props: {}) => any;
    } & {
        title?: (props: {}) => any;
    } & {
        'sub-title'?: (props: {}) => any;
    } & {
        extra?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhResult;
export * from './src/result';
export type ResultInstance = InstanceType<typeof Result>;
export type YhResultInstance = ResultInstance;
export type YhResultProps = import('./src/result').ResultProps;
export type YhResultSlots = import('./src/result').ResultSlots;
export type YhResultIconType = import('./src/result').ResultIconType;
