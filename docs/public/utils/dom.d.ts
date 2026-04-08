/**
 * DOM utilities
 */
/**
 * 判断是否在浏览器环境
 */
export declare const isClient: boolean;
/**
 * 判断是否在服务端环境
 */
export declare const isServer: boolean;
/**
 * 获取元素的样式
 */
export declare const getStyle: (element: HTMLElement, styleName: string) => string;
/**
 * 设置元素的样式
 */
export declare const setStyle: (element: HTMLElement, styleName: string | Record<string, string>, value?: string) => void;
/**
 * 检查元素是否包含某个类名
 */
export declare const hasClass: (el: HTMLElement, cls: string) => boolean;
/**
 * 添加类名
 */
export declare const addClass: (el: HTMLElement, cls: string) => void;
/**
 * 移除类名
 */
export declare const removeClass: (el: HTMLElement, cls: string) => void;
/**
 * 切换类名
 */
export declare const toggleClass: (el: HTMLElement, cls: string, force?: boolean) => void;
/**
 * 获取滚动容器
 */
export declare const getScrollContainer: (el: HTMLElement, isVertical?: boolean) => HTMLElement | Window | undefined;
/**
 * 检查元素是否在视口中
 */
export declare const isInViewport: (el: HTMLElement) => boolean;
export declare const getScrollbarWidth: () => number;
