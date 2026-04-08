/**
 * Pagination Types & Props
 * @description 分页组件类型定义
 */
import type { ExtractPropTypes, PropType } from 'vue';
export declare const paginationLayouts: readonly ["prev", "pager", "next", "jumper", "total", "sizes", "slot"];
export type PaginationLayout = (typeof paginationLayouts)[number];
export declare const paginationProps: {
    /**
     * @description 当前页码
     * @default 1
     */
    readonly currentPage: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    /**
     * @description 总条数
     * @default 0
     */
    readonly total: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /**
     * @description 每页条数
     * @default 10
     */
    readonly pageSize: {
        readonly type: NumberConstructor;
        readonly default: 10;
    };
    /**
     * @description 每页显示个数选择器的选项设置
     * @default [10, 20, 30, 40, 50, 100]
     */
    readonly pageSizes: {
        readonly type: PropType<number[]>;
        readonly default: () => number[];
    };
    /**
     * @description 组件布局，子组件名用逗号隔开
     * @default 'prev, pager, next'
     */
    readonly layout: {
        readonly type: StringConstructor;
        readonly default: "prev, pager, next";
    };
    /**
     * @description 页码按钮的数量，当总页数超过该值时会折叠
     * @default 7
     */
    readonly pagerCount: {
        readonly type: NumberConstructor;
        readonly default: 7;
    };
    /**
     * @description 是否为背景颜色模式
     * @default false
     */
    readonly background: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 是否使用小型分页
     * @default false
     */
    readonly small: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 是否禁用
     * @default false
     */
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 只有一页时是否隐藏
     * @default false
     */
    readonly hideOnSinglePage: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 是否使用圆形分页
     * @default false
     */
    readonly circle: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 替代图标的文字 - 上一页
     */
    readonly prevText: StringConstructor;
    /**
     * @description 替代图标的文字 - 下一页
     */
    readonly nextText: StringConstructor;
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type PaginationProps = ExtractPropTypes<typeof paginationProps>;
export interface PaginationEmits {
    (e: 'update:currentPage', val: number): void;
    (e: 'update:pageSize', val: number): void;
    (e: 'current-change', val: number): void;
    (e: 'size-change', val: number): void;
    (e: 'prev-click', val: number): void;
    (e: 'next-click', val: number): void;
}
export interface PaginationExpose {
    /**
     * 当前页码
     */
    currentPage: number;
    /**
     * 每页条数
     */
    pageSize: number;
    /**
     * 总页数
     */
    pageCount: number;
}
