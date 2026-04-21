/**
 * Image Viewer Types & Props
 * @description 图片预览组件类型定义
 */
import type { ExtractPropTypes, PropType } from 'vue';
export declare const imageViewerProps: {
    /**
     * @description 预览图片源列表
     */
    readonly urlList: {
        readonly type: PropType<string[]>;
        readonly default: () => never[];
    };
    /**
     * @description 预览的 z-index
     */
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 2000;
    };
    /**
     * @description 开启预览图片时，第一张显示的图片索引
     */
    readonly initialIndex: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /**
     * @description 无限循环预览
     */
    readonly infinite: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 点击遮罩层是否关闭
     */
    readonly hideOnClickModal: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 预览是否可以按 ESC 关闭
     */
    readonly closeOnPressEscape: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 缩放比例
     */
    readonly zoomRate: {
        readonly type: NumberConstructor;
        readonly default: 1.2;
    };
    /**
     * @description 是否展示操作栏
     */
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 预览容器渲染到的目标节点
     */
    readonly teleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 预览模式，'default' 为内置预览器，'viewerjs' 为外部 viewerjs
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
};
export type ImageViewerProps = ExtractPropTypes<typeof imageViewerProps>;
export declare const imageViewerEmits: {
    close: () => boolean;
    switch: (index: number) => boolean;
};
export type ImageViewerEmits = typeof imageViewerEmits;
export interface ImageViewerSlots {
}
export interface ImageViewerExpose {
    prev: () => void;
    next: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
    rotateLeft: () => void;
    rotateRight: () => void;
    reset: () => void;
}
