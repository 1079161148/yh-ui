<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { ref, computed, watch } from 'vue'
import type { AiThoughtChainProps, AiThoughtStatus } from './ai-thought-chain'
import { YhIcon } from '../../icon'

defineOptions({
  name: 'YhAiThoughtChain'
})

const props = withDefaults(defineProps<AiThoughtChainProps>(), {
  title: '',
  thinking: undefined,
  content: '',
  status: 'none',
  items: () => [],
  autoCollapse: false,
  dotSize: 'default'
})

const ns = useNamespace('ai-thought-chain')
const { t } = useLocale()
const isExpanded = ref(false)

// 跟踪每个节点的展开状态
const itemExpandedStates = ref<boolean[]>([])

// 综合确定状态
const currentStatus = computed<AiThoughtStatus>(() => {
  if (props.status !== 'none') return props.status
  if (props.thinking === true) return 'thinking'
  if (props.thinking === false) return 'complete'
  return 'none'
})

const displayTitle = computed(() => {
  if (props.title) return props.title
  return currentStatus.value === 'thinking' || currentStatus.value === 'loading'
    ? t('ai.thoughtChain.thinking') || '思考中...'
    : t('ai.thoughtChain.thoughtProcess') || '思维链'
})

// 状态图标映射
const getStatusIcon = (status: AiThoughtStatus = 'none') => {
  switch (status) {
    case 'thinking':
    case 'loading':
      return 'loading'
    case 'success':
    case 'complete':
      return 'check-circle'
    case 'error':
      return 'circle-close'
    default:
      return 'check-circle'
  }
}

// 自动收起逻辑
watch(
  () => currentStatus.value,
  (newStatus) => {
    if (props.autoCollapse && (newStatus === 'complete' || newStatus === 'success')) {
      isExpanded.value = false
    }
  }
)

// 初始化节点展开状态
watch(
  () => props.items,
  (newItems) => {
    if (newItems && newItems.length > 0) {
      // 默认展开最后一个节点，或者遵循 item 自身的 expanded 属性
      itemExpandedStates.value = newItems.map((item, index) => {
        if (item.expanded !== undefined) return item.expanded
        return index === newItems.length - 1
      })
    }
  },
  { immediate: true, deep: true }
)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const toggleItemExpand = (index: number) => {
  itemExpandedStates.value[index] = !itemExpandedStates.value[index]
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('expanded', isExpanded),
      ns.is('thinking', currentStatus === 'thinking' || currentStatus === 'loading'),
      ns.is('timeline', items && items.length > 0)
    ]"
  >
    <!-- 多节点时间轴模式 -->
    <template v-if="items && items.length > 0">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="[
          ns.e('item'),
          ns.is('last', index === items.length - 1),
          ns.is('active', item.status === 'thinking' || item.status === 'loading')
        ]"
      >
        <div :class="ns.e('item-dot-wrapper')">
          <div :class="[ns.e('item-dot'), ns.m(dotSize), ns.m(item.status || 'none')]">
            <YhIcon
              :name="item.icon || getStatusIcon(item.status)"
              :class="{ 'is-loading': item.status === 'thinking' || item.status === 'loading' }"
            />
          </div>
          <div
            v-if="index < items.length - 1"
            :class="[ns.e('item-line'), { 'is-gradient': lineGradient }]"
          ></div>
        </div>

        <div :class="ns.e('item-main')">
          <div :class="ns.e('item-header')" @click="toggleItemExpand(index)">
            <span :class="ns.e('item-title')">{{ item.title }}</span>
            <YhIcon
              v-if="item.content || item.description"
              name="arrow-down"
              :class="[ns.e('item-arrow'), { 'is-expanded': itemExpandedStates[index] }]"
            />
          </div>
          <div
            v-show="itemExpandedStates[index] && (item.content || item.description)"
            :class="ns.e('item-content')"
          >
            <div :class="ns.e('item-text')">{{ item.content || item.description }}</div>
          </div>
        </div>
      </div>
    </template>

    <!-- 单节点/传统模式 -->
    <template v-else>
      <div :class="ns.e('header')" @click="toggleExpand">
        <div :class="ns.e('icon')">
          <YhIcon
            :name="getStatusIcon(currentStatus)"
            :class="[
              ns.e('status-icon'),
              { 'is-loading': currentStatus === 'thinking' || currentStatus === 'loading' }
            ]"
          />
        </div>
        <div :class="ns.e('title')">{{ displayTitle }}</div>
        <YhIcon name="arrow-down" :class="[ns.e('arrow'), { 'is-expanded': isExpanded }]" />
      </div>

      <div v-show="isExpanded" :class="ns.e('content')">
        <slot>
          <div :class="ns.e('text')">{{ content }}</div>
        </slot>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
@use './ai-thought-chain.scss';
</style>
