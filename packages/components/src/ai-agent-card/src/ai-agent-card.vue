<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { computed, ref } from 'vue'
import { aiAgentCardProps, aiAgentCardEmits } from './ai-agent-card'
import { YhIcon } from '../../icon'
import { YhTooltip } from '../../tooltip'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({
  name: 'YhAiAgentCard'
})

const props = defineProps(aiAgentCardProps)
const emit = defineEmits(aiAgentCardEmits)
const ns = useNamespace('ai-agent-card')
const { t } = useLocale()
const { themeStyle } = useComponentTheme('ai-agent-card', props.themeOverrides)

const localFavorited = ref(props.data?.favorited ?? false)

const statusClass = computed(() => {
  const s = props.data?.status
  if (s === 'online') return 'is-online'
  if (s === 'busy') return 'is-busy'
  return 'is-offline'
})

const ratingStars = computed(() => {
  const r = props.data?.stats?.rating ?? 0
  return Array.from({ length: 5 }, (_, i) => i < Math.floor(r))
})

const formattedUses = computed(() => {
  const u = props.data?.stats?.uses ?? 0
  if (u >= 10000) return `${(u / 10000).toFixed(1)}w`
  if (u >= 1000) return `${(u / 1000).toFixed(1)}k`
  return String(u)
})

const handleClick = () => {
  if (!props.loading) emit('click', props.data)
}

const handleUse = (e: MouseEvent) => {
  e.stopPropagation()
  emit('use', props.data)
}

const handleFavorite = (e: MouseEvent) => {
  e.stopPropagation()
  localFavorited.value = !localFavorited.value
  emit('favorite', props.data, localFavorited.value)
}

const handleShare = (e: MouseEvent) => {
  e.stopPropagation()
  emit('share', props.data)
}
</script>

<template>
  <!-- Skeleton 加载态 -->
  <div v-if="loading" :class="[ns.b(), ns.m(layout), ns.is('loading', true)]" :style="themeStyle">
    <div :class="ns.e('skeleton-avatar')"></div>
    <div :class="ns.e('skeleton-lines')">
      <div :class="ns.e('skeleton-line')"></div>
      <div :class="ns.e('skeleton-line')" style="width: 70%"></div>
      <div :class="ns.e('skeleton-line')" style="width: 50%"></div>
    </div>
  </div>

  <!-- 正常卡片 -->
  <div
    v-else
    :class="[ns.b(), ns.m(layout), ns.is('selected', selected)]"
    :style="themeStyle"
    @click="handleClick"
  >
    <!-- 收藏 & 分享操作（右上角浮层） -->
    <div :class="ns.e('overlay-actions')">
      <YhTooltip
        v-if="favoritable"
        :content="
          localFavorited ? t('ai.agent.unfavorite') || '取消收藏' : t('ai.agent.favorite') || '收藏'
        "
        placement="top"
      >
        <button :class="[ns.e('fav-btn'), ns.is('active', localFavorited)]" @click="handleFavorite">
          <YhIcon :name="localFavorited ? 'star-filled' : 'star'" />
        </button>
      </YhTooltip>

      <YhTooltip :content="t('ai.agent.share') || '分享'" placement="top">
        <button :class="ns.e('share-btn')" @click="handleShare">
          <YhIcon name="share" />
        </button>
      </YhTooltip>
    </div>

    <!-- 头像区域 -->
    <div :class="ns.e('avatar-wrapper')">
      <div :class="ns.e('avatar')">
        <slot name="avatar">
          <img v-if="data.avatar?.startsWith('http')" :src="data.avatar" :alt="data.name" />
          <YhIcon v-else :name="data.avatar || 'robot'" />
        </slot>
      </div>
      <!-- 状态指示器 -->
      <span v-if="data.status" :class="[ns.e('status-dot'), statusClass]"></span>
    </div>

    <!-- 内容主区域 -->
    <div :class="ns.e('body')">
      <div :class="ns.e('header')">
        <div :class="ns.e('name-row')">
          <span :class="ns.e('name')">{{ data.name }}</span>
          <YhIcon v-if="data.verified" name="checkmark-circle" :class="ns.e('verified-icon')" />
        </div>
        <span v-if="data.model" :class="ns.e('model')">{{ data.model }}</span>
      </div>

      <p v-if="data.description" :class="ns.e('description')">{{ data.description }}</p>

      <!-- 能力标签 -->
      <div v-if="data.capabilities && data.capabilities.length > 0" :class="ns.e('capabilities')">
        <span
          v-for="(cap, idx) in data.capabilities.slice(0, 4)"
          :key="idx"
          :class="[ns.e('capability-tag'), cap.type ? ns.m(cap.type) : '']"
        >
          <YhIcon v-if="cap.icon" :name="cap.icon" />
          {{ cap.label }}
        </span>
        <span v-if="data.capabilities.length > 4" :class="ns.e('capability-more')">
          +{{ data.capabilities.length - 4 }}
        </span>
      </div>

      <!-- 统计信息 -->
      <div v-if="showStats && data.stats" :class="ns.e('stats')">
        <span v-if="data.stats.uses !== undefined" :class="ns.e('stat-item')">
          <YhIcon name="chart-bar" />
          {{ formattedUses }} {{ t('ai.agent.uses') || '次调用' }}
        </span>
        <span v-if="data.stats.rating !== undefined" :class="ns.e('stat-item')">
          <span :class="ns.e('stars')">
            <YhIcon
              v-for="(full, i) in ratingStars"
              :key="i"
              :name="full ? 'star-filled' : 'star'"
              :class="ns.is('filled', full)"
            />
          </span>
          <span>{{ data.stats.rating.toFixed(1) }}</span>
          <span v-if="data.stats.reviewCount" :class="ns.e('review-count')"
            >({{ data.stats.reviewCount }})</span
          >
        </span>
        <span v-if="data.stats.responseTime !== undefined" :class="ns.e('stat-item')">
          <YhIcon name="time" />
          {{ data.stats.responseTime }}ms
        </span>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div v-if="showActions" :class="ns.e('actions')">
      <slot name="actions" :data="data" :use="handleUse">
        <button :class="ns.e('use-btn')" @click="handleUse">
          <YhIcon name="sparkles" />
          {{ t('ai.agent.use') || '立即使用' }}
        </button>
      </slot>
    </div>

    <!-- 默认插槽：额外内容 -->
    <slot :data="data"></slot>
  </div>
</template>

<style lang="scss">
@use './ai-agent-card.scss';
</style>
