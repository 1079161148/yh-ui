<template>
  <div :class="[ns.b(), ns.is('loading', loading)]" :style="themeStyle">
    <div :class="ns.e('header')">
      <!-- Create New Button -->
      <button :class="ns.e('add-btn')" @click="handleCreate">
        <slot name="add-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </slot>
        <span :class="ns.e('add-text')">
          <slot name="add-text">新对话</slot>
        </span>
      </button>
    </div>

    <!-- Conversation List -->
    <div :class="ns.e('list')">
      <div v-if="loading && data.length === 0" :class="ns.e('loading-placer')">
        <span class="yh-spin"></span>
      </div>

      <template v-else>
        <!-- Item -->
        <div
          v-for="item in data"
          :key="item.id"
          :class="[ns.e('item'), ns.is('active', activeId === item.id)]"
          @click="handleClick(item)"
        >
          <!-- Item Info -->
          <div :class="ns.e('item-content')">
            <span
              v-if="!editingId || editingId !== item.id"
              :class="ns.e('title')"
              :title="item.title"
            >
              {{ item.title }}
            </span>
            <input
              v-else
              v-model="editTitle"
              :class="ns.e('input')"
              @blur="confirmEdit(item)"
              @keydown.enter="confirmEdit(item)"
              @keydown.esc="cancelEdit"
              @click.stop
              ref="inputRef"
            />

            <span v-if="item.updatedAt" :class="ns.e('time')">
              {{ formatTime(item.updatedAt) }}
            </span>
            <span v-if="item.excerpt" :class="ns.e('excerpt')">
              {{ item.excerpt }}
            </span>
          </div>

          <!-- Actions -->
          <div :class="ns.e('actions')" @click.stop v-if="!editingId || editingId !== item.id">
            <!-- Edit Icon -->
            <span :class="ns.e('action-btn')" @click.stop="startEdit(item)">
              <slot name="edit-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </slot>
            </span>
            <!-- Delete Icon -->
            <span :class="ns.e('action-btn')" @click.stop="handleDelete(item)">
              <slot name="delete-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </slot>
            </span>
          </div>
        </div>
      </template>

      <!-- Empty State -->
      <div v-if="!loading && data.length === 0" :class="ns.e('empty')">
        <slot name="empty">暂无对话记录</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { aiConversationsProps, aiConversationsEmits } from './ai-conversations'
import type { AiConversation } from '@yh-ui/hooks'

defineOptions({
  name: 'YhAiConversations'
})

const props = defineProps(aiConversationsProps)
const emit = defineEmits(aiConversationsEmits)

const ns = useNamespace('ai-conversations')
const { themeStyle } = useComponentTheme('ai-conversations', props.themeOverrides)

const editingId = ref<string | null>(null)
const editTitle = ref('')
const inputRef = ref<HTMLInputElement[]>()

const handleCreate = () => {
  emit('create')
}

const handleClick = (item: AiConversation) => {
  if (editingId.value === item.id) return
  emit('update:activeId', item.id)
  emit('click', item)
}

const handleDelete = (item: AiConversation) => {
  emit('delete', item)
}

const startEdit = (item: AiConversation) => {
  editingId.value = item.id
  editTitle.value = item.title
  nextTick(() => {
    // try to focus
    if (inputRef.value && inputRef.value[0]) {
      inputRef.value[0].focus()
    }
  })
}

const confirmEdit = (item: AiConversation) => {
  if (!editingId.value) return
  const title = editTitle.value.trim()
  if (title && title !== item.title) {
    emit('edit', item, title)
  }
  editingId.value = null
}

const cancelEdit = () => {
  editingId.value = null
}

const formatTime = (ts: number) => {
  const d = new Date(ts)
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
</script>

<style lang="scss">
@use './ai-conversations.scss';
</style>
