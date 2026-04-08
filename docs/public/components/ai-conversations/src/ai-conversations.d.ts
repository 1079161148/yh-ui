import type { ExtractPropTypes, PropType } from 'vue';
import type { AiConversation } from '@yh-ui/hooks';
export declare const aiConversationsProps: {
    /**
     * @description Data list for the conversation sidebar
     */
    data: {
        type: PropType<AiConversation[]>;
        default: () => never[];
    };
    /**
     * @description Currently selected conversation ID
     */
    activeId: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description Show loading state
     */
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description Theme overrides for the component
     */
    themeOverrides: {
        type: PropType<import("@yh-ui/theme").AiConversationsThemeVars>;
        default: undefined;
    };
    /**
     * @description 是否按时间分组显示对话
     */
    grouped: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description 是否启用虚拟滚动
     */
    virtualScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description 虚拟滚动容器高度
     */
    virtualScrollHeight: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 虚拟滚动每项高度
     */
    virtualScrollItemHeight: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 虚拟滚动 overscan 数量
     */
    virtualScrollOverscan: {
        type: NumberConstructor;
        default: number;
    };
};
export type AiConversationsProps = ExtractPropTypes<typeof aiConversationsProps>;
export declare const aiConversationsEmits: {
    /**
     * @description Emit when active item changes
     */
    'update:activeId': (id: string) => boolean;
    /**
     * @description User clicks the "Create New" or "Plus" button
     */
    create: () => boolean;
    /**
     * @description User deletes a conversation item
     */
    delete: (conversation: AiConversation) => boolean;
    /**
     * @description User edits a conversation title
     */
    edit: (conversation: AiConversation, newTitle: string) => boolean;
    /**
     * @description User clicks an item
     */
    click: (conversation: AiConversation) => boolean;
    /**
     * @description User pins/unpins a conversation
     */
    pin: (conversation: AiConversation, pinned: boolean) => boolean;
};
export type AiConversationsEmits = typeof aiConversationsEmits;
