/**
 * 获取 dayjs locale code
 */
export declare const getDayjsLocale: (localeCode: string) => string;
/**
 * 动态加载并设置 dayjs locale
 */
export declare const setDayjsLocale: (localeCode: string) => Promise<void>;
/**
 * 同步设置 dayjs locale（立即生效，异步加载后会更新）
 */
export declare const setDayjsLocaleSync: (localeCode: string) => void;
/**
 * 使用自定义月份名称更新 dayjs locale
 */
export declare const updateDayjsMonths: (localeCode: string, months: {
    jan: string;
    feb: string;
    mar: string;
    apr: string;
    may: string;
    jun: string;
    jul: string;
    aug: string;
    sep: string;
    oct: string;
    nov: string;
    dec: string;
}) => void;
