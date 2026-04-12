/**
 * 图标库类型定义
 */
/**
 * 图标名称或图标标识符
 * 支持格式：
 * - 简写名称（如：'home', 'search'）
 * - 带前缀的图标名（如：'mdi:home', 'ep:search'）
 * - 完整图标标识符（如：'mdi/home', '@iconify-icons/mdi/home'）
 */
export type IconName = string;
/**
 * 图标尺寸
 */
export type IconSize = number | string;
/**
 * 图标颜色
 */
export type IconColor = string;
/**
 * 图标旋转角度
 */
export type IconRotate = number;
/**
 * 预设图标集
 * 每个预设代表一个常用的图标库
 */
export interface IconPreset {
    /** 预设名称 */
    name: string;
    /** 图标集前缀 */
    prefix: string;
    /** 图标数量 */
    count: number;
    /** 图标集描述 */
    description?: string;
}
/**
 * 图标配置选项
 */
export interface IconOptions {
    /** 默认图标尺寸 */
    defaultSize?: IconSize;
    /** 默认图标颜色 */
    defaultColor?: IconColor;
    /** 默认启用旋转动画 */
    defaultSpin?: boolean;
    /** 加载失败时显示的备用图标 */
    fallbackIcon?: string;
}
/**
 * 图标集配置
 */
export interface IconCollection {
    /** 图标集名称 */
    name: string;
    /** 图标集前缀 */
    prefix: string;
    /** 图标集作者 */
    author?: string;
    /** 图标集许可证 */
    license?: string;
    /** 图标数量 */
    total: number;
}
/**
 * 图标搜索结果
 */
export interface IconSearchResult {
    /** 图标名称 */
    name: string;
    /** 图标完整标识符 */
    icon: string;
    /** 图标集 */
    collection: string;
    /** 图标集前缀 */
    prefix: string;
}
/**
 * Vue 组件图标属性
 */
export interface IconProps {
    /** 图标名称 */
    icon?: IconName;
    /** 图标尺寸 */
    size?: IconSize;
    /** 图标颜色 */
    color?: IconColor;
    /** 是否旋转 */
    spin?: boolean;
    /** 旋转角度 */
    rotate?: IconRotate;
}
/**
 * 可用的图标集列表
 * 常用的图标集
 */
export declare const AVAILABLE_COLLECTIONS: readonly [{
    readonly prefix: "mdi";
    readonly name: "Material Design Icons";
    readonly count: 7000;
}, {
    readonly prefix: "ep";
    readonly name: "Element Plus";
    readonly count: 200;
}, {
    readonly prefix: "antd";
    readonly name: "Ant Design Icons";
    readonly count: 800;
}, {
    readonly prefix: "fa";
    readonly name: "Font Awesome 6 Free";
    readonly count: 2000;
}, {
    readonly prefix: "heroicons";
    readonly name: "Heroicons";
    readonly count: 600;
}, {
    readonly prefix: "lucide";
    readonly name: "Lucide";
    readonly count: 1500;
}, {
    readonly prefix: "carbon";
    readonly name: "Carbon Icons";
    readonly count: 1600;
}, {
    readonly prefix: "tabler";
    readonly name: "Tabler Icons";
    readonly count: 4600;
}, {
    readonly prefix: "ri";
    readonly name: "Remix Icon";
    readonly count: 2500;
}, {
    readonly prefix: "bi";
    readonly name: "Bootstrap Icons";
    readonly count: 2600;
}];
/**
 * 推荐的图标集（默认启用的图标集）
 */
export declare const RECOMMENDED_COLLECTIONS: readonly ["mdi", "ep", "lucide", "tabler", "ri"];
export type RecommendedCollection = typeof RECOMMENDED_COLLECTIONS[number];
//# sourceMappingURL=types.d.ts.map