import { PropType } from 'vue';
import { IconName, IconSize, IconColor, IconRotate } from '../types';
/**
 * YhIcon Vue 组件
 * 保持与 @yh-ui/components 的 YhIcon 组件完全兼容
 */
export declare const YhIcon: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /**
     * 图标名称
     * 支持格式：
     * - 简写名称（如：'home', 'search'）
     * - 带前缀的图标名（如：'mdi:home', 'ep:search'）
     */
    name: {
        type: PropType<IconName>;
        default: string;
    };
    /**
     * 直接使用 Iconify 图标（优先级高于 name）
     */
    icon: {
        type: PropType<IconName>;
        default: string;
    };
    /**
     * SVG 字符串（直接渲染 SVG）
     */
    svg: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 图标组件（传入 Vue 组件）
     */
    component: {
        type: PropType<object | ((...args: unknown[]) => unknown)>;
        default: undefined;
    };
    /**
     * 图标尺寸
     */
    size: {
        type: PropType<IconSize>;
        default: undefined;
    };
    /**
     * 图标颜色
     */
    color: {
        type: PropType<IconColor>;
        default: undefined;
    };
    /**
     * 是否启用旋转动画
     */
    spin: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 旋转角度（度数）
     */
    rotate: {
        type: PropType<IconRotate>;
        default: number;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /**
     * 图标名称
     * 支持格式：
     * - 简写名称（如：'home', 'search'）
     * - 带前缀的图标名（如：'mdi:home', 'ep:search'）
     */
    name: {
        type: PropType<IconName>;
        default: string;
    };
    /**
     * 直接使用 Iconify 图标（优先级高于 name）
     */
    icon: {
        type: PropType<IconName>;
        default: string;
    };
    /**
     * SVG 字符串（直接渲染 SVG）
     */
    svg: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 图标组件（传入 Vue 组件）
     */
    component: {
        type: PropType<object | ((...args: unknown[]) => unknown)>;
        default: undefined;
    };
    /**
     * 图标尺寸
     */
    size: {
        type: PropType<IconSize>;
        default: undefined;
    };
    /**
     * 图标颜色
     */
    color: {
        type: PropType<IconColor>;
        default: undefined;
    };
    /**
     * 是否启用旋转动画
     */
    spin: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 旋转角度（度数）
     */
    rotate: {
        type: PropType<IconRotate>;
        default: number;
    };
}>> & Readonly<{}>, {
    icon: string;
    size: IconSize;
    color: string;
    spin: boolean;
    rotate: number;
    svg: string;
    name: string;
    component: object | ((...args: unknown[]) => unknown);
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
/**
 * Icon 组件 - YhIcon 的别名
 */
export declare const Icon: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /**
     * 图标名称
     * 支持格式：
     * - 简写名称（如：'home', 'search'）
     * - 带前缀的图标名（如：'mdi:home', 'ep:search'）
     */
    name: {
        type: PropType<IconName>;
        default: string;
    };
    /**
     * 直接使用 Iconify 图标（优先级高于 name）
     */
    icon: {
        type: PropType<IconName>;
        default: string;
    };
    /**
     * SVG 字符串（直接渲染 SVG）
     */
    svg: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 图标组件（传入 Vue 组件）
     */
    component: {
        type: PropType<object | ((...args: unknown[]) => unknown)>;
        default: undefined;
    };
    /**
     * 图标尺寸
     */
    size: {
        type: PropType<IconSize>;
        default: undefined;
    };
    /**
     * 图标颜色
     */
    color: {
        type: PropType<IconColor>;
        default: undefined;
    };
    /**
     * 是否启用旋转动画
     */
    spin: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 旋转角度（度数）
     */
    rotate: {
        type: PropType<IconRotate>;
        default: number;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /**
     * 图标名称
     * 支持格式：
     * - 简写名称（如：'home', 'search'）
     * - 带前缀的图标名（如：'mdi:home', 'ep:search'）
     */
    name: {
        type: PropType<IconName>;
        default: string;
    };
    /**
     * 直接使用 Iconify 图标（优先级高于 name）
     */
    icon: {
        type: PropType<IconName>;
        default: string;
    };
    /**
     * SVG 字符串（直接渲染 SVG）
     */
    svg: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 图标组件（传入 Vue 组件）
     */
    component: {
        type: PropType<object | ((...args: unknown[]) => unknown)>;
        default: undefined;
    };
    /**
     * 图标尺寸
     */
    size: {
        type: PropType<IconSize>;
        default: undefined;
    };
    /**
     * 图标颜色
     */
    color: {
        type: PropType<IconColor>;
        default: undefined;
    };
    /**
     * 是否启用旋转动画
     */
    spin: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 旋转角度（度数）
     */
    rotate: {
        type: PropType<IconRotate>;
        default: number;
    };
}>> & Readonly<{}>, {
    icon: string;
    size: IconSize;
    color: string;
    spin: boolean;
    rotate: number;
    svg: string;
    name: string;
    component: object | ((...args: unknown[]) => unknown);
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
/**
 * YhIcon Props 类型
 */
export type YhIconProps = InstanceType<typeof YhIcon>['$props'];
//# sourceMappingURL=icon.d.ts.map