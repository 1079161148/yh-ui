import type { ExtractPropTypes, PropType } from 'vue';
export declare const watermarkProps: {
    /** 宽度 */
    readonly width: {
        readonly type: NumberConstructor;
        readonly default: 120;
    };
    /** 高度 */
    readonly height: {
        readonly type: NumberConstructor;
        readonly default: 64;
    };
    /** 旋转角度 */
    readonly rotate: {
        readonly type: NumberConstructor;
        readonly default: -22;
    };
    /** z-index */
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 9;
    };
    /** 图片源 */
    readonly image: StringConstructor;
    /** 文字内容 */
    readonly content: {
        readonly type: PropType<string | string[]>;
        readonly default: "YH-UI";
    };
    /** 字体设置 */
    readonly font: {
        readonly type: PropType<{
            color?: string;
            fontSize?: number | string;
            fontWeight?: string | number;
            fontFamily?: string;
            fontStyle?: "normal" | "italic" | "oblique";
            textAlign?: "start" | "end" | "left" | "right" | "center";
            lineHeight?: number;
        }>;
        readonly default: () => {
            color: string;
            fontSize: number;
            fontWeight: string;
            fontFamily: string;
            fontStyle: string;
            textAlign: string;
            lineHeight: number;
        };
    };
    /** 整体旋转角度 */
    readonly globalRotate: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /** 间距 */
    readonly gap: {
        readonly type: PropType<[number, number]>;
        readonly default: () => number[];
    };
    /** 偏移 */
    readonly offset: {
        readonly type: PropType<[number, number]>;
        readonly default: () => number[];
    };
    /** 是否全屏 */
    readonly fullScreen: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 防篡改 */
    readonly antiTamper: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>;
