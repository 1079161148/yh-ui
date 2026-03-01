<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { computed } from 'vue'
import { aiActionGroupProps, aiActionGroupEmits, type ActionItem } from './ai-action-group'
import { YhIcon } from '../../icon'
import { YhTooltip } from '../../tooltip'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({
  name: 'YhAiActionGroup'
})

const props = defineProps(aiActionGroupProps)
const emit = defineEmits(aiActionGroupEmits)

const ns = useNamespace('ai-action-group')
const { t } = useLocale()
const { themeStyle } = useComponentTheme('ai-action-group', props.themeOverrides)

// 默认图标映射
const defaultIcons: Record<string, string> = {
  copy: 'copy',
  refresh: 'refresh',
  regenerate: 'refresh',
  share: 'share',
  'thumb-up': 'thumb-up',
  'thumb-down': 'thumb-down',
  edit: 'edit',
  delete: 'delete'
}

// 默认标签映射（中英文）
const defaultLabels = computed<Record<string, string>>(() => ({
  copy: t('yh.ai.action.copy'),
  refresh: t('yh.ai.action.regenerate'),
  regenerate: t('yh.ai.action.regenerate'),
  share: t('yh.ai.action.share'),
  'thumb-up': t('yh.ai.action.like'),
  'thumb-down': t('yh.ai.action.dislike'),
  edit: t('yh.ai.action.edit'),
  delete: t('yh.ai.action.delete')
}))

const actionItems = computed(() => {
  return props.items.map((item) => {
    if (typeof item === 'string') {
      return {
        key: item,
        icon: defaultIcons[item] || 'more',
        label: '', // 通常泡泡底座不需要文字标签
        tooltip: defaultLabels.value[item] || item
      }
    }
    return {
      ...item,
      icon: item.icon || defaultIcons[item.key] || 'more'
    }
  })
})

const handleClick = (item: ActionItem) => {
  if (typeof item === 'object' && item.disabled) return
  const key = typeof item === 'string' ? item : item.key
  emit('click', key, item)
}
</script>

<template>
  <div :class="[ns.b(), ns.m(direction), ns.m(size)]" :style="themeStyle">
    <template v-for="(item, index) in actionItems" :key="index">
      <div :class="[ns.e('item'), ns.is('disabled', item.disabled)]" @click="handleClick(item)">
        <!-- 使用 Tooltip 装饰 -->
        <YhTooltip v-if="item.tooltip" :content="item.tooltip" placement="top">
          <div :class="ns.e('item-inner')">
            <YhIcon :class="ns.e('item-icon')" :name="item.icon" />
            <span v-if="item.label" :class="ns.e('item-label')">{{ item.label }}</span>
          </div>
        </YhTooltip>

        <template v-else>
          <YhIcon :class="ns.e('item-icon')" :name="item.icon" />
          <span v-if="item.label" :class="ns.e('item-label')">{{ item.label }}</span>
        </template>
      </div>
    </template>

    <!-- 为插槽预留尾部 -->
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use './ai-action-group.scss';
</style>
