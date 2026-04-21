import Space from './src/space.vue';
export declare const YhSpace: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").SpaceProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        size: import("./index.js").SpaceSize | [import("./index.js").SpaceSize, import("./index.js").SpaceSize];
        fill: boolean;
        direction: import("./index.js").SpaceDirection;
        wrap: boolean;
        justify: import("./index.js").SpaceJustify;
        align: import("./index.js").SpaceAlign;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").SpaceProps> & Readonly<{}>, {}, {}, {}, {}, {
        size: import("./index.js").SpaceSize | [import("./index.js").SpaceSize, import("./index.js").SpaceSize];
        fill: boolean;
        direction: import("./index.js").SpaceDirection;
        wrap: boolean;
        justify: import("./index.js").SpaceJustify;
        align: import("./index.js").SpaceAlign;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").SpaceProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    size: import("./index.js").SpaceSize | [import("./index.js").SpaceSize, import("./index.js").SpaceSize];
    fill: boolean;
    direction: import("./index.js").SpaceDirection;
    wrap: boolean;
    justify: import("./index.js").SpaceJustify;
    align: import("./index.js").SpaceAlign;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        spacer?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhSpace;
export * from './src/space';
export type { SpaceProps, SpaceSlots } from './src/space';
export type SpaceInstance = InstanceType<typeof Space>;
export type YhSpaceInstance = SpaceInstance;
export type YhSpaceProps = import('./src/space').SpaceProps;
export type YhSpaceSlots = import('./src/space').SpaceSlots;
export type YhSpaceSize = import('./src/space').SpaceSize;
export type YhSpaceDirection = import('./src/space').SpaceDirection;
export type YhSpaceAlign = import('./src/space').SpaceAlign;
export type YhSpaceJustify = import('./src/space').SpaceJustify;
