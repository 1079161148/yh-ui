import { VNode } from 'vue';
import { IconName, IconSize, IconColor, IconRotate } from './types';
/**
 * 创建 Iconify 图标组件
 * 这是 @yh-ui/icons 核心组件，提供高性能的图标渲染
 *
 * @example
 * ```vue
 * <script setup>
 * import { Icon } from '@yh-ui/icons/vue'
 * </script>
 *
 * <template>
 *   <!-- 使用前缀:图标名格式 -->
 *   <Icon icon="mdi:home" />
 *
 *   <!-- 使用自定义尺寸和颜色 -->
 *   <Icon icon="mdi:home" :size="24" color="#ff0000" />
 *
 *   <!-- 旋转图标 -->
 *   <Icon icon="mdi:loading" :rotate="90" />
 * </template>
 */
export interface IconifyProps {
    /** 图标名称，支持格式：mdi:home, ep:search, lucide:home */
    icon: IconName;
    /** 图标尺寸 */
    size?: IconSize;
    /** 图标颜色 */
    color?: IconColor;
    /** 是否旋转动画 */
    spin?: boolean;
    /** 旋转角度（0, 90, 180, 270） */
    rotate?: IconRotate;
}
/**
 * Iconify 图标组件 - 渲染用组件
 */
export declare function createIconifyComponent(): (props: IconifyProps) => VNode;
/**
 * Iconify Vue 组件 - 可直接导入使用
 * 需要配合 unplugin-icons 实现按需加载
 */
export declare const Icon: (props: IconifyProps) => VNode;
/**
 * Iconify Icon 组件 - 别名
 */
export { Icon as Iconify };
/**
 * 解析图标名称
 * 支持多种格式：mdi:home, mdi/home, @iconify-icons/mdi/home
 *
 * @param name - 图标名称
 * @returns 解析后的图标名称
 */
export declare function parseIconName(name: string): string;
/**
 * 检查图标是否存在
 * @param name - 图标名称
 * @returns 是否存在
 */
export declare function iconExists(name: string): Promise<boolean>;
/**
 * 获取图标数据
 * @param name - 图标名称
 * @returns 图标的 SVG 数据
 */
export declare function getIconData(name: string): Promise<Required<import('@iconify/types').IconifyIcon>>;
//# sourceMappingURL=iconify.d.ts.map