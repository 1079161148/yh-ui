import type { Component, PropType, ExtractPropTypes } from 'vue';
/**
 * Icon 组件 Props 类型定义
 * @description 轻量级、高性能的图标组件
 */
export declare const iconProps: {
    /**
     * 图标名称（使用内置图标时）
     */
    readonly name: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /**
     * SVG 字符串（直接渲染 SVG）
     */
    readonly svg: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /**
     * 图标组件（传入 Vue 组件）
     */
    readonly icon: {
        readonly type: PropType<Component>;
        readonly default: undefined;
    };
    /**
     * 图标尺寸
     * - number: 像素值
     * - string: CSS 尺寸值（如 '1em', '24px'）
     */
    readonly size: {
        readonly type: PropType<number | string>;
        readonly default: undefined;
    };
    /**
     * 图标颜色
     * - 默认继承父元素的 color
     */
    readonly color: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    /**
     * 是否启用旋转动画
     */
    readonly spin: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * 旋转角度（度数）
     */
    readonly rotate: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type IconProps = ExtractPropTypes<typeof iconProps>;
/**
 * Icon 组件插槽类型
 */
export interface IconSlots {
    /**
     * 自定义 SVG 内容
     */
    default?: () => unknown;
}
/**
 * 图标数据接口
 * 用于注册自定义图标
 */
export interface IconData {
    /**
     * 图标名称
     */
    name: string;
    /**
     * SVG 内容（不含 <svg> 标签）
     */
    svg: string;
    /**
     * viewBox 属性
     */
    viewBox?: string;
}
/**
 * 图标集接口
 */
export interface IconSet {
    /**
     * 图标集名称前缀
     */
    prefix: string;
    /**
     * 图标集合
     */
    icons: Record<string, IconData>;
}
/**
 * 全局图标注册表
 */
export declare const iconRegistry: Map<string, IconData>;
/**
 * 注册单个图标
 */
export declare function registerIcon(icon: IconData): void;
/**
 * 批量注册图标
 */
export declare function registerIcons(icons: IconData[]): void;
/**
 * 注册图标集
 */
export declare function registerIconSet(iconSet: IconSet): void;
/**
 * 获取已注册的图标
 */
export declare function getIcon(name: string): IconData | undefined;
/**
 * 创建图标组件（用于生成独立图标组件）
 */
export declare function createIconComponent(svg: string, viewBox?: string): {
    name: string;
    render(): null;
    __svg: string;
    __viewBox: string;
};
