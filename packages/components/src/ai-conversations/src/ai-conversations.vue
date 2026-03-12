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
          <slot name="add-text">{{ t('ai.conversations.newConversation') }}</slot>
        </span>
      </button>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading && data.length === 0" :class="ns.e('loading-placer')">
      <div v-for="i in 5" :key="i" :class="ns.e('skeleton-item')">
        <div :class="ns.e('skeleton-line')"></div>
        <div :class="ns.e('skeleton-line')" style="width: 60%"></div>
      </div>
    </div>

    <!-- Conversation List with groups -->
    <div
      v-else
      ref="virtualScrollContainerRef"
      :class="[ns.e('list'), ns.is('virtual', virtualScroll)]"
      :style="listStyle"
      @scroll.passive="virtualScroll ? handleVirtualScroll($event) : undefined"
    >
      <!-- 时间分组渲染 -->
      <template v-if="groupedData.length > 0">
        <template v-for="group in groupedData" :key="group.label">
          <!-- 分组标题 -->
          <div :class="ns.e('group-label')">
            <slot name="group-label" :label="group.label">
              {{ t(`ai.conversations.${group.label}`) }}
            </slot>
          </div>

          <!-- 分组内的对话项 -->
          <TransitionGroup name="yh-conversation-item" tag="div">
            <div
              v-for="item in group.items"
              :key="item.id"
              :class="[
                ns.e('item'),
                ns.is('active', activeId === item.id),
                ns.is('pinned', !!item.pinned)
              ]"
              @click="handleClick(item)"
            >
              <!-- 置顶图标 -->
              <span v-if="item.pinned" :class="ns.e('pin-icon')">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                  <path
                    d="M16 12V4h1a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1v8l-2 2v2h5v5l1 1 1-1v-5h5v-2l-2-2z"
                  />
                </svg>
              </span>

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
                <!-- 置顶/取消置顶 -->
                <span
                  :class="[ns.e('action-btn'), ns.is('active', !!item.pinned)]"
                  :title="item.pinned ? t('ai.conversations.unpin') : t('ai.conversations.pin')"
                  @click.stop="handlePin(item)"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M16 12V4h1a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1v8l-2 2v2h5v5l1 1 1-1v-5h5v-2l-2-2z"
                    />
                  </svg>
                </span>
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
          </TransitionGroup>
        </template>
      </template>

      <!-- Flat 模式（未分组）-->
      <template v-else-if="data.length > 0 && !showGroups">
        <!-- 虚拟滚动模式 -->
        <template v-if="virtualScroll">
          <!-- 外层：position:relative + 总高度，产生真实滚动条 -->
          <div :style="{ position: 'relative', height: totalHeight + 'px' }">
            <!-- 内层：position:absolute + top:offsetY，定位到当前可见区域 -->
            <div :style="{ position: 'absolute', top: offsetY + 'px', left: 0, right: 0 }">
              <div
                v-for="item in visibleItems"
                :key="item.id"
                :class="[
                  ns.e('item'),
                  ns.is('active', activeId === item.id),
                  ns.is('pinned', !!item.pinned)
                ]"
                :style="{ height: virtualScrollItemHeight + 'px' }"
                @click="handleClick(item)"
              >
                <span v-if="item.pinned" :class="ns.e('pin-icon')">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                    <path
                      d="M16 12V4h1a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1v8l-2 2v2h5v5l1 1 1-1v-5h5v-2l-2-2z"
                    />
                  </svg>
                </span>
                <div :class="ns.e('item-content')">
                  <span :class="ns.e('title')" :title="item.title">{{ item.title }}</span>
                  <span v-if="item.updatedAt" :class="ns.e('time')">{{
                    formatTime(item.updatedAt)
                  }}</span>
                </div>
                <div
                  :class="ns.e('actions')"
                  @click.stop
                  v-if="!editingId || editingId !== item.id"
                >
                  <span
                    :class="[ns.e('action-btn'), ns.is('active', !!item.pinned)]"
                    @click.stop="handlePin(item)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M16 12V4h1a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1v8l-2 2v2h5v5l1 1 1-1v-5h5v-2l-2-2z"
                      />
                    </svg>
                  </span>
                  <span :class="ns.e('action-btn')" @click.stop="handleDelete(item)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path
                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <!-- 普通模式 -->
        <template v-else>
          <div
            v-for="item in data"
            :key="item.id"
            :class="[ns.e('item'), ns.is('active', activeId === item.id)]"
            @click="handleClick(item)"
          >
            <div :class="ns.e('item-content')">
              <span :class="ns.e('title')" :title="item.title">{{ item.title }}</span>
            </div>
          </div>
        </template>
      </template>

      <!-- Empty State -->
      <div v-if="!loading && data.length === 0" :class="ns.e('empty')">
        <slot name="empty">{{ t('common.noData') }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useNamespace, useLocale, useVirtualScroll } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { aiConversationsProps, aiConversationsEmits } from './ai-conversations'
import type { AiConversation } from '@yh-ui/hooks'

defineOptions({
  name: 'YhAiConversations'
})

const props = defineProps(aiConversationsProps)
const emit = defineEmits(aiConversationsEmits)

const ns = useNamespace('ai-conversations')
const { t } = useLocale()
const { themeStyle } = useComponentTheme('ai-conversations', props.themeOverrides)

const editingId = ref<string | null>(null)
const editTitle = ref('')
const inputRef = ref<HTMLInputElement[]>()
const showGroups = computed(() => props.grouped !== false && !props.virtualScroll)

const {
  visibleItems,
  totalHeight,
  offsetY,
  onScroll: handleVirtualScroll,
  scrollToIndex
} = useVirtualScroll({
  itemHeight: computed(() => props.virtualScrollItemHeight),
  containerHeight: computed(() => props.virtualScrollHeight),
  overscan: computed(() => props.virtualScrollOverscan),
  items: computed(() => props.data)
})

const listStyle = computed(() => {
  if (!props.virtualScroll) return {}
  return {
    height: `${props.virtualScrollHeight}px` as const,
    maxHeight: `${props.virtualScrollHeight}px` as const,
    overflowY: 'auto' as const,
    position: 'relative' as const
  }
})

// ── 时间分组逻辑 ────────────────────────────────────────────────────────────

type GroupKey = 'pinned' | 'today' | 'last7Days' | 'last30Days' | 'earlier'

const getGroupKey = (item: AiConversation): GroupKey => {
  if (item.pinned) return 'pinned'
  const diff = Date.now() - item.updatedAt
  const oneDay = 86400000
  if (diff < oneDay) return 'today'
  if (diff < 7 * oneDay) return 'last7Days'
  if (diff < 30 * oneDay) return 'last30Days'
  return 'earlier'
}

const groupedData = computed(() => {
  if (!showGroups.value) return []

  const groups: Record<GroupKey, AiConversation[]> = {
    pinned: [],
    today: [],
    last7Days: [],
    last30Days: [],
    earlier: []
  }

  for (const item of props.data) {
    groups[getGroupKey(item)].push(item)
  }

  const order: GroupKey[] = ['pinned', 'today', 'last7Days', 'last30Days', 'earlier']
  return order.filter((k) => groups[k].length > 0).map((k) => ({ label: k, items: groups[k] }))
})

// ── CRUD 操作 ────────────────────────────────────────────────────────────────

const handleCreate = () => emit('create')

const handleClick = (item: AiConversation) => {
  if (editingId.value === item.id) return
  emit('update:activeId', item.id)
  emit('click', item)
}

const handleDelete = (item: AiConversation) => emit('delete', item)

const handlePin = (item: AiConversation) => emit('pin', item, !item.pinned)

const startEdit = (item: AiConversation) => {
  editingId.value = item.id
  editTitle.value = item.title
  nextTick(() => {
    if (inputRef.value?.[0]) inputRef.value[0].focus()
  })
}

const confirmEdit = (item: AiConversation) => {
  if (!editingId.value) return
  const title = editTitle.value.trim()
  if (title && title !== item.title) emit('edit', item, title)
  editingId.value = null
}

const cancelEdit = () => {
  editingId.value = null
}

const formatTime = (ts: number) => {
  const d = new Date(ts)
  const now = new Date()
  const isToday = d.toDateString() === now.toDateString()
  const pad = (n: number) => n.toString().padStart(2, '0')

  if (isToday) {
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`
  }
  return `${d.getMonth() + 1}/${d.getDate()}`
}

// 滚动到指定对话
const scrollToItem = (id: string) => {
  const index = props.data.findIndex((item) => item.id === id)
  if (index !== -1) {
    scrollToIndex(index)
  }
}

// 暴露方法
defineExpose({
  scrollToItem,
  scrollToIndex
})
</script>

<style lang="scss">
@use './ai-conversations.scss';
</style>
