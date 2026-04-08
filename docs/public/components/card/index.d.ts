import Card from './src/card.vue';
export declare const YhCard: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").CardProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        size: "small" | "default" | "large";
        loading: boolean;
        bodyPadding: boolean;
        bordered: boolean;
        shadow: import("./index.js").CardShadow;
        hoverable: boolean;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").CardProps> & Readonly<{}>, {}, {}, {}, {}, {
        size: "small" | "default" | "large";
        loading: boolean;
        bodyPadding: boolean;
        bordered: boolean;
        shadow: import("./index.js").CardShadow;
        hoverable: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").CardProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    size: "small" | "default" | "large";
    loading: boolean;
    bodyPadding: boolean;
    bordered: boolean;
    shadow: import("./index.js").CardShadow;
    hoverable: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        header?: (props: {}) => any;
    } & {
        extra?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        footer?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhCard;
export * from './src/card';
export type CardInstance = InstanceType<typeof Card>;
