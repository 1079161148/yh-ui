<script setup lang="ts">
import { provide } from 'vue'
import { AI_PROVIDER_KEY, type AiProviderConfig } from './ai-provider'

defineOptions({
  name: 'YhAiProvider'
})

const props = withDefaults(
  defineProps<{
    /** 全局 AI 接口基础 URL */
    baseUrl?: string
    /** 鉴权 Token */
    token?: string
    /** 全局请求头 */
    headers?: Record<string, string>
    /** 用户头像 URL */
    userAvatar?: string
    /** 助手头像 URL */
    assistantAvatar?: string
    /** 用户显示名称 */
    userName?: string
    /** 助手显示名称 */
    assistantName?: string
    /** 全局系统 Prompt */
    systemPrompt?: string
    /** 打字机配置 */
    typewriter?: { enabled?: boolean; charsPerFrame?: number }
  }>(),
  {
    baseUrl: '',
    token: '',
    headers: () => ({}),
    userAvatar: '',
    assistantAvatar: '',
    userName: 'User',
    assistantName: 'Assistant',
    systemPrompt: '',
    typewriter: () => ({ enabled: true, charsPerFrame: 1 })
  }
)

const config: AiProviderConfig = props

provide(AI_PROVIDER_KEY, config)
</script>

<template>
  <slot></slot>
</template>
