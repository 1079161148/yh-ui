export declare const YhSpace: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").SpaceProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        size: import("./src/space").SpaceSize | [import("./src/space").SpaceSize, import("./src/space").SpaceSize];
        fill: boolean;
        direction: import("./src/space").SpaceDirection;
        wrap: boolean;
        justify: import("./src/space").SpaceJustify;
        align: import("./src/space").SpaceAlign;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").SpaceProps> & Readonly<{}>, {}, {}, {}, {}, {
        size: import("./src/space").SpaceSize | [import("./src/space").SpaceSize, import("./src/space").SpaceSize];
        fill: boolean;
        direction: import("./src/space").SpaceDirection;
        wrap: boolean;
        justify: import("./src/space").SpaceJustify;
        align: import("./src/space").SpaceAlign;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").SpaceProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    size: import("./src/space").SpaceSize | [import("./src/space").SpaceSize, import("./src/space").SpaceSize];
    fill: boolean;
    direction: import("./src/space").SpaceDirection;
    wrap: boolean;
    justify: import("./src/space").SpaceJustify;
    align: import("./src/space").SpaceAlign;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        spacer?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhSpace;
export type { SpaceProps, SpaceSlots } from './src/space';
