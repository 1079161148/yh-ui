/**
 * Carousel Types & Props
 */
import type { ExtractPropTypes, PropType, InjectionKey, Ref } from 'vue';
import type { ComponentThemeVars } from '@yh-ui/theme';
export type CarouselEffect = 'slide' | 'fade' | 'card' | 'coverflow' | 'zoom' | 'perspective' | 'dissolve' | 'cloud' | 'wave' | 'radial' | 'fiber' | 'custom' | 'cube' | 'flip' | 'cylinder' | 'stack' | 'parallax' | 'popout' | 'rotate3d' | 'cards' | 'fold';
export type CarouselDirection = 'horizontal' | 'vertical';
export type CarouselArrow = 'always' | 'hover' | 'never';
export type CarouselTrigger = 'click' | 'hover';
export type CarouselDotPlacement = 'top' | 'bottom' | 'left' | 'right' | 'inner-top' | 'inner-bottom' | 'inner-left' | 'inner-right';
export declare const carouselProps: {
    /** 当前展示索引 */
    readonly currentIndex: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /** 默认展示索引 */
    readonly defaultIndex: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /** 是否自动播放 */
    readonly autoplay: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 自动播放间隔（ms） */
    readonly interval: {
        readonly type: NumberConstructor;
        readonly default: 3000;
    };
    /** 是否循环播放 */
    readonly loop: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 过渡效果 */
    readonly effect: {
        readonly type: PropType<CarouselEffect>;
        readonly default: "slide";
    };
    /** 轮播方向 */
    readonly direction: {
        readonly type: PropType<CarouselDirection>;
        readonly default: "horizontal";
    };
    /** 箭头的显示时机 */
    readonly showArrow: {
        readonly type: PropType<CarouselArrow>;
        readonly default: "hover";
    };
    /** 是否显示指示点 */
    readonly showDots: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 指示点触发方式 */
    readonly dotTrigger: {
        readonly type: PropType<CarouselTrigger>;
        readonly default: "click";
    };
    /** 指示点位置 */
    readonly dotPlacement: {
        readonly type: PropType<CarouselDotPlacement>;
        readonly default: "bottom";
    };
    /** 指示标的类型 */
    readonly dotType: {
        readonly type: PropType<"dot" | "line">;
        readonly default: "dot";
    };
    /** 是否开启键盘控制 */
    readonly keyboard: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 是否在鼠标悬浮时暂停自动播放 */
    readonly pauseOnHover: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 是否可以拖拽切换 */
    readonly draggable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 是否允许通过鼠标滚轮切换 */
    readonly mousewheel: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 轮播项之间的间距 (slide 模式) */
    readonly spaceBetween: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /** 相邻卡片之间的间距 (card 模式) */
    readonly cardGutter: {
        readonly type: NumberConstructor;
        readonly default: 20;
    };
    /** 每屏显示数量 */
    readonly slidesPreView: {
        readonly type: PropType<number | "auto">;
        readonly default: 1;
    };
    /** 切换动画的时长 */
    readonly duration: {
        readonly type: NumberConstructor;
        readonly default: 500;
    };
    /** 主题覆盖 */
    readonly themeOverrides: {
        readonly type: PropType<ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type CarouselProps = ExtractPropTypes<typeof carouselProps>;
export declare const carouselEmits: {
    'update:currentIndex': (index: number) => boolean;
    change: (index: number, prevIndex: number) => boolean;
};
export type CarouselEmits = typeof carouselEmits;
export interface CarouselSlots {
    default?: () => unknown;
    dots?: (props: {
        total: number;
        currentIndex: number;
        to: (index: number) => void;
    }) => unknown;
    arrow?: (props: {
        total: number;
        currentIndex: number;
        to: (index: number) => void;
        prev: () => void;
        next: () => void;
    }) => unknown;
    'prev-arrow'?: () => unknown;
    'next-arrow'?: () => unknown;
}
export interface CarouselExpose {
    prev: () => void;
    next: () => void;
    jump: (index: number) => void;
    to: (index: number) => void;
    getCurrentIndex: () => number;
    currentIndex: number;
}
export interface CarouselContext {
    props: CarouselProps;
    itemCount: Ref<number>;
    currentIndex: Ref<number>;
    prevIndex: Ref<number>;
    direction: Ref<CarouselDirection>;
    effect: Ref<CarouselEffect>;
    shouldRenderItem?: (index: number) => boolean;
    addItem: (id: string) => void;
    removeItem: (id: string) => void;
    getItemIndex: (id: string) => number;
    jump: (index: number) => void;
}
export declare const CAROUSEL_INJECTION_KEY: InjectionKey<CarouselContext>;
