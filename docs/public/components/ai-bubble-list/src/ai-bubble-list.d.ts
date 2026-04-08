import type { ExtractPropTypes, PropType } from 'vue';
import type { AiBubbleProps } from '../../ai-bubble';
export interface AiBubbleListItem extends Partial<AiBubbleProps> {
    id?: string | number;
    [key: string]: unknown;
}
export declare const aiBubbleListProps: {
    /**
     * 消息列表
     */
    items: {
        type: PropType<AiBubbleListItem[]>;
        default: () => never[];
    };
    /**
     * 是否开启虚拟滚动
     */
    virtualScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 虚拟滚动容器高度
     */
    height: {
        type: PropType<number | string>;
        default: number;
    };
    /**
     * 预估项高度（用于虚拟滚动）
     */
    itemHeight: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 自动滚动到底部
     */
    autoScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 加载状态
     */
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 主题覆盖
     */
    themeOverrides: {
        type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        default: undefined;
    };
};
export type AiBubbleListProps = ExtractPropTypes<typeof aiBubbleListProps>;
