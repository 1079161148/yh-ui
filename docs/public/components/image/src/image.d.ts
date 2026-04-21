/**
 * Image Types & Props
 * @description 图片组件类型定义
 */
import type { ExtractPropTypes, PropType } from 'vue';
export declare const imageFits: readonly ["", "contain", "cover", "fill", "none", "scale-down"];
export type ImageFit = (typeof imageFits)[number];
export declare const imageProps: {
    /**
     * @description 图片源地址
     */
    readonly src: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /**
     * @description 确定图片如何适应容器框
     */
    readonly fit: {
        readonly type: PropType<ImageFit>;
        readonly default: "";
    };
    /**
     * @description 是否使用懒加载
     */
    readonly lazy: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 是否开启预览
     */
    readonly previewSrcList: {
        readonly type: PropType<string[]>;
        readonly default: () => never[];
    };
    /**
     * @description 预览的 z-index
     */
    readonly zIndex: {
        readonly type: NumberConstructor;
    };
    /**
     * @description 开启预览图片时，第一张显示的图片索引
     */
    readonly initialIndex: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /**
     * @description 预览是否可以按 ESC 关闭
     */
    readonly closeOnPressEscape: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 预览是否在点击遮罩层时关闭
     */
    readonly hideOnClickModal: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 预览模式下是否展示操作栏
     */
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 预览模式下是否可以缩放
     */
    readonly zoomRate: {
        readonly type: NumberConstructor;
        readonly default: 1.2;
    };
    /**
     * @description 无限循环预览
     */
    readonly infinite: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 跨域设置
     */
    readonly crossorigin: {
        readonly type: PropType<"" | "anonymous" | "use-credentials">;
    };
    /**
     * @description 原生 alt 属性
     */
    readonly alt: StringConstructor;
    /**
     * @description 原生 loading 属性
     */
    readonly loading: PropType<"eager" | "lazy">;
    /**
     * @description 预览容器渲染到的目标节点
     */
    readonly previewTeleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 开启懒加载后，指定滚动的容器
     */
    readonly scrollContainer: {
        readonly type: PropType<string | HTMLElement | undefined>;
    };
    /**
     * @description 预览模式，'default' 为内置预览器，'viewerjs' 为外部 viewerjs (需自行安装依赖)
     */
    readonly viewerMode: {
        readonly type: PropType<"default" | "viewerjs">;
        readonly default: "default";
    };
    /**
     * @description 传递给 viewerjs 的配置项
     */
    readonly viewerOptions: {
        readonly type: PropType<Record<string, unknown>>;
        readonly default: () => {};
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type ImageProps = ExtractPropTypes<typeof imageProps>;
export interface ImageEmits {
    (e: 'load', event: Event): void;
    (e: 'error', event: Event | string): void;
    (e: 'switch', index: number): void;
    (e: 'close'): void;
    (e: 'show'): void;
}
export interface ImageSlots {
    placeholder?: () => unknown;
    error?: () => unknown;
}
