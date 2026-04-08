import Title from './src/title.vue';
import Text from './src/text.vue';
import Paragraph from './src/paragraph.vue';
import Link from './src/link.vue';
export declare const YhTypographyTitle: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").TypographyTitleProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        code: boolean;
        mark: boolean;
        delete: boolean;
        bold: boolean;
        italic: boolean;
        underline: boolean;
        ellipsis: boolean;
        level: import("./index.js").TypographyTitleLevel;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").TypographyTitleProps> & Readonly<{}>, {}, {}, {}, {}, {
        code: boolean;
        mark: boolean;
        delete: boolean;
        bold: boolean;
        italic: boolean;
        underline: boolean;
        ellipsis: boolean;
        level: import("./index.js").TypographyTitleLevel;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").TypographyTitleProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    code: boolean;
    mark: boolean;
    delete: boolean;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    ellipsis: boolean;
    level: import("./index.js").TypographyTitleLevel;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export declare const YhTypographyText: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").TypographyTextProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        code: boolean;
        mark: boolean;
        delete: boolean;
        bold: boolean;
        tag: string;
        italic: boolean;
        underline: boolean;
        ellipsis: boolean;
        keyboard: boolean;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").TypographyTextProps> & Readonly<{}>, {}, {}, {}, {}, {
        code: boolean;
        mark: boolean;
        delete: boolean;
        bold: boolean;
        tag: string;
        italic: boolean;
        underline: boolean;
        ellipsis: boolean;
        keyboard: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").TypographyTextProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    code: boolean;
    mark: boolean;
    delete: boolean;
    bold: boolean;
    tag: string;
    italic: boolean;
    underline: boolean;
    ellipsis: boolean;
    keyboard: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export declare const YhTypographyParagraph: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").TypographyParagraphProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        mark: boolean;
        delete: boolean;
        bold: boolean;
        italic: boolean;
        ellipsis: boolean | number;
        spacing: "compact" | "default" | "loose";
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").TypographyParagraphProps> & Readonly<{}>, {}, {}, {}, {}, {
        mark: boolean;
        delete: boolean;
        bold: boolean;
        italic: boolean;
        ellipsis: boolean | number;
        spacing: "compact" | "default" | "loose";
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").TypographyParagraphProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    mark: boolean;
    delete: boolean;
    bold: boolean;
    italic: boolean;
    ellipsis: boolean | number;
    spacing: "compact" | "default" | "loose";
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export declare const YhTypographyLink: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").TypographyLinkProps> & Readonly<{
        onClick?: ((event: MouseEvent) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        click: (event: MouseEvent) => any;
    }, import("vue").PublicProps, {
        disabled: boolean;
        underline: boolean;
        target: "_blank" | "_self" | "_parent" | "_top";
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").TypographyLinkProps> & Readonly<{
        onClick?: ((event: MouseEvent) => any) | undefined;
    }>, {}, {}, {}, {}, {
        disabled: boolean;
        underline: boolean;
        target: "_blank" | "_self" | "_parent" | "_top";
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").TypographyLinkProps> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (event: MouseEvent) => any;
}, string, {
    disabled: boolean;
    underline: boolean;
    target: "_blank" | "_self" | "_parent" | "_top";
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhTypographyTitle;
export * from './src/typography';
export type TypographyTitleInstance = InstanceType<typeof Title>;
export type TypographyTextInstance = InstanceType<typeof Text>;
export type TypographyParagraphInstance = InstanceType<typeof Paragraph>;
export type TypographyLinkInstance = InstanceType<typeof Link>;
