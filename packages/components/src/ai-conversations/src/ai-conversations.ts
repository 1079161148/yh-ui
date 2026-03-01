import type { ExtractPropTypes, PropType } from 'vue'
import type { AiConversation } from '@yh-ui/hooks'

export const aiConversationsProps = {
  /**
   * @description Data list for the conversation sidebar
   */
  data: {
    type: Array as PropType<AiConversation[]>,
    default: () => []
  },
  /**
   * @description Currently selected conversation ID
   */
  activeId: {
    type: String,
    default: ''
  },
  /**
   * @description Show loading state
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * @description Theme overrides for the component
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').AiConversationsThemeVars>,
    default: undefined
  }
}

export type AiConversationsProps = ExtractPropTypes<typeof aiConversationsProps>

export const aiConversationsEmits = {
  /**
   * @description Emit when active item changes
   */
  'update:activeId': (id: string) => typeof id === 'string',
  /**
   * @description User clicks the "Create New" or "Plus" button
   */
  create: () => true,
  /**
   * @description User deletes a conversation item
   */
  delete: (conversation: AiConversation) => typeof conversation === 'object',
  /**
   * @description User edits a conversation title
   */
  edit: (conversation: AiConversation, newTitle: string) =>
    typeof conversation === 'object' && typeof newTitle === 'string',
  /**
   * @description User clicks an item
   */
  click: (conversation: AiConversation) => typeof conversation === 'object'
}

export type AiConversationsEmits = typeof aiConversationsEmits
