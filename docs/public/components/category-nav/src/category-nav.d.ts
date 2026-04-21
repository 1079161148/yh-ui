import type { ExtractPropTypes, PropType } from 'vue';
/** 二级分类项 */
export interface CategorySubItem {
    id: string | number;
    name: string;
    image?: string;
    /** 商品数量 */
    count?: number;
    /** 自定义扩展字段 */
    [key: string]: unknown;
}
/** 一级分类项 */
export interface CategoryItem {
    id: string | number;
    name: string;
    image?: string;
    icon?: string;
    /** 徽标 */
    badge?: string | number;
    /** 子分类列表 */
    children?: CategorySubItem[];
    /** 自定义扩展字段 */
    [key: string]: unknown;
}
export declare const categoryNavProps: {
    /** 分类数据 */
    categories: {
        type: PropType<CategoryItem[]>;
        default: () => never[];
    };
    /** 当前激活的一级分类 ID（支持 v-model） */
    modelValue: {
        type: PropType<string | number | null>;
        default: null;
    };
    /** 当前激活的子分类 ID（支持 v-model:subValue） */
    subValue: {
        type: PropType<string | number | null>;
        default: null;
    };
    /** 左侧菜单宽度 */
    sideWidth: {
        type: StringConstructor;
        default: string;
    };
    /** 是否展示全部标签 */
    showAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 加载中 */
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 右侧内容区的列数（用于子分类网格布局） */
    columns: {
        type: NumberConstructor;
        default: number;
    };
    /** 子分类图片大小 px */
    subImageSize: {
        type: NumberConstructor;
        default: number;
    };
    /** 是否开启右侧滚动锚定联动 */
    anchor: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 主题变量覆盖 */
    themeOverrides: {
        type: PropType<Record<string, string>>;
        default: () => {};
    };
};
export type CategoryNavProps = ExtractPropTypes<typeof categoryNavProps>;
export declare const categoryNavEmits: {
    'update:modelValue': (id: string | number | null) => boolean;
    'update:subValue': (id: string | number | null) => boolean;
    /** 点击一级分类 */
    categoryClick: (item: CategoryItem) => boolean;
    /** 点击子分类 */
    subCategoryClick: (item: CategorySubItem, _parent: CategoryItem) => boolean;
};
export type CategoryNavEmits = typeof categoryNavEmits;
export interface CategoryNavSlots {
    'all-icon'?: () => unknown;
    header?: () => unknown;
    'section-header'?: (props: {
        category: CategoryItem;
    }) => unknown;
    'sub-item'?: (props: {
        sub: CategorySubItem;
        parent: CategoryItem;
    }) => unknown;
    'section-footer'?: (props: {
        category: CategoryItem;
    }) => unknown;
    footer?: () => unknown;
}
