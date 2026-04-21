import Badge from './src/badge.vue';
export declare const YhBadge: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").BadgeProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        hidden: boolean;
        type: import("./index.js").BadgeType;
        max: number;
        isDot: boolean;
        showBorder: boolean;
        showZero: boolean;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").BadgeProps> & Readonly<{}>, {}, {}, {}, {}, {
        hidden: boolean;
        type: import("./index.js").BadgeType;
        max: number;
        isDot: boolean;
        showBorder: boolean;
        showZero: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").BadgeProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    hidden: boolean;
    type: import("./index.js").BadgeType;
    max: number;
    isDot: boolean;
    showBorder: boolean;
    showZero: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    } & {
        content?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhBadge;
export * from './src/badge';
export type BadgeInstance = InstanceType<typeof Badge>;
export type YhBadgeInstance = BadgeInstance;
export type YhBadgeProps = import('./src/badge').BadgeProps;
export type YhBadgeSlots = import('./src/badge').BadgeSlots;
export type YhBadgeType = import('./src/badge').BadgeType;
