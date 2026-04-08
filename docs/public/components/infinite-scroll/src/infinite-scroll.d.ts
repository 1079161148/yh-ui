import type { ExtractPropTypes, PropType } from 'vue';
export type InfiniteScrollDirection = 'vertical' | 'horizontal';
export declare const infiniteScrollProps: {
    /** 是否正在加载 */
    readonly loading: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 是否已加载完全部数据 */
    readonly finished: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 是否加载失败 */
    readonly error: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 触发加载的距离阈值 (px) */
    readonly threshold: {
        readonly type: NumberConstructor;
        readonly default: 100;
    };
    /** 滚动方向 */
    readonly direction: {
        readonly type: PropType<InfiniteScrollDirection>;
        readonly default: "vertical";
    };
    /** 加载中的提示文字 */
    readonly loadingText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 加载完成的提示文字 */
    readonly finishedText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 加载失败的提示文字 */
    readonly errorText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 是否在初始化时立即检查是否需要加载 */
    readonly immediateCheck: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 是否禁用滚动加载 */
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 指定滚动容器选择器 */
    readonly target: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 是否使用 IntersectionObserver (推荐) */
    readonly useObserver: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** IntersectionObserver 的 root margin */
    readonly rootMargin: {
        readonly type: StringConstructor;
        readonly default: "0px";
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export declare const infiniteScrollEmits: {
    /** 触发加载更多 */
    load: () => boolean;
    /** 更新 loading 状态 */
    'update:loading': (val: boolean) => boolean;
    /** 更新 error 状态 */
    'update:error': (val: boolean) => boolean;
};
export type InfiniteScrollProps = ExtractPropTypes<typeof infiniteScrollProps>;
export type InfiniteScrollEmits = typeof infiniteScrollEmits;
