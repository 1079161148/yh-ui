/**
 * Type utilities
 * @description 基础类型工具库，彻底移除 any，支持更严谨的类型推断
 */
import type { App, Plugin } from 'vue';
/**
 * 可空类型
 */
export type Nullable<T> = T | null;
/**
 * 可异步类型
 */
export type Awaitable<T> = T | Promise<T>;
/**
 * 数组或单值类型
 */
export type Arrayable<T> = T | T[];
/**
 * 通用对象类型
 */
export type Recordable<T = unknown> = Record<string, T>;
/**
 * 组件尺寸标准
 */
export type ComponentSize = 'large' | 'default' | 'small';
/**
 * Vue 插件类型（带安装器）
 */
export type SFCWithInstall<T> = T & Plugin & {
    install: (app: App, options?: Record<string, unknown>) => void;
};
/**
 * 类型判断工具函数
 */
export declare const isString: (val: unknown) => val is string;
export declare const isNumber: (val: unknown) => val is number;
export declare const isBoolean: (val: unknown) => val is boolean;
export declare const isFunction: (val: unknown) => val is (...args: unknown[]) => unknown;
export declare const isObject: (val: unknown) => val is Record<string, unknown>;
export declare const isPromise: <T = unknown>(val: unknown) => val is Promise<T>;
export declare const isArray: (arg: any) => arg is any[];
export declare const isUndefined: (val: unknown) => val is undefined;
export declare const isNil: (val: unknown) => val is null | undefined;
/**
 * 判断是否为空值（null, undefined, '', [], {}）
 */
export declare const isEmpty: (val: unknown) => boolean;
/**
 * 判断是否为有效的数字字符串
 */
export declare const isNumeric: (val: unknown) => val is string | number;
