<script setup lang="ts">
import { computed, toRefs, ref } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { couponCardProps, couponCardEmits } from './coupon-card'
import { YhButton } from '../../button'
import { YhCheckbox } from '../../checkbox'
import type { CheckboxValueType } from '../../checkbox'

defineOptions({ name: 'YhCouponCard' })

const props = defineProps(couponCardProps)
const emit = defineEmits(couponCardEmits)

const {
  title,
  description,
  amount,
  symbol,
  threshold,
  validPeriod,
  status,
  actionText,
  selectable,
  selected,
  variant,
  badge,
  badgeType,
  percent,
  percentText,
  rules,
  ruleTitle
} = toRefs(props)

const rulesExpanded = ref(false)

const ns = useNamespace('coupon-card')
const { t } = useLocale()
const { themeStyle } = useComponentTheme(
  'coupon-card',
  computed(() => props.themeOverrides)
)

const isAvailable = computed(() => status.value === 'available')
const isUsed = computed(() => status.value === 'used')
const isExpired = computed(() => status.value === 'expired')

const thresholdText = computed(() => {
  const val = Number(threshold.value)
  if (!isNaN(val) && val > 0) {
    return t('couponcard.limit', { threshold: val })
  }
  if (typeof threshold.value === 'string' && threshold.value) {
    return threshold.value
  }
  return t('couponcard.noThreshold')
})

const statusSealText = computed(() => {
  if (isUsed.value) return t('couponcard.used')
  if (isExpired.value) return t('couponcard.expired')
  return ''
})

const finalActionText = computed(() => {
  if (actionText.value) return actionText.value
  if (isUsed.value) return t('couponcard.used')
  if (isExpired.value) return t('couponcard.expired')
  return t('couponcard.available')
})

const finalRuleTitle = computed(() => {
  if (ruleTitle.value) return ruleTitle.value
  return t('couponcard.ruleTitle')
})

const handleActionClick = (e: MouseEvent) => {
  if (!isAvailable.value) return
  e.stopPropagation()
  emit('action', e)
}

const handleCardClick = (e: MouseEvent) => {
  emit('click', e)
}

const handleCheckChange = (val: CheckboxValueType) => {
  emit('update:selected', !!val)
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is(status),
      ns.m(variant),
      ns.is('selectable', selectable),
      ns.is('selected', selected)
    ]"
    :style="themeStyle"
    @click="handleCardClick"
  >
    <!-- 主体内容区域包裹 -->
    <div :class="ns.e('content')">
      <!-- 左侧金额区域 -->
      <div :class="ns.e('amount-side')">
        <div :class="ns.e('amount')">
          <span :class="ns.e('symbol')">{{ symbol }}</span>
          <span>{{ amount }}</span>
        </div>
        <div :class="ns.e('threshold')">{{ thresholdText }}</div>
      </div>

      <!-- 右侧内容区域 -->
      <div :class="ns.e('main-side')">
        <div :class="ns.e('info')">
          <div :class="ns.e('title-row')">
            <slot name="title">
              <div :class="ns.e('title')">{{ title }}</div>
            </slot>
            <div v-if="selectable" :class="ns.e('checkbox')" @click.stop>
              <YhCheckbox :model-value="selected" @update:model-value="handleCheckChange" />
            </div>
          </div>
          <slot name="description">
            <div v-if="description" :class="ns.e('description')">{{ description }}</div>
          </slot>

          <!-- 疯抢进度条 -->
          <div v-if="percent !== undefined" :class="ns.e('progress')">
            <div :class="ns.e('progress-bar')">
              <div :class="ns.e('progress-inner')" :style="{ width: percent + '%' }"></div>
            </div>
            <div v-if="percentText" :class="ns.e('progress-text')">{{ percentText }}</div>
          </div>
        </div>

        <div :class="ns.e('footer')">
          <div :class="ns.e('valid-period')">{{ validPeriod }}</div>
          <div :class="ns.e('action-area')" @click.stop>
            <slot name="action">
              <YhButton
                v-if="finalActionText"
                type="primary"
                size="small"
                :disabled="!isAvailable"
                :class="ns.e('action-btn')"
                @click="handleActionClick"
              >
                {{ finalActionText }}
              </YhButton>
            </slot>
          </div>
        </div>
      </div>

      <!-- 浮动角标 -->
      <slot name="badge">
        <div v-if="badge" :class="[ns.e('badge'), ns.em('badge', badgeType)]">
          {{ badge }}
        </div>
      </slot>

      <!-- 状态水印 -->
      <slot v-if="statusSealText" name="seal" :status="status">
        <div :class="[ns.e('seal'), ns.is(status)]">
          {{ statusSealText }}
        </div>
      </slot>
    </div>

    <!-- 底部使用规则展开区 -->
    <div v-if="rules || $slots.rules" :class="[ns.e('rules'), ns.is('expanded', rulesExpanded)]">
      <div :class="ns.e('rules-trigger')" @click.stop="rulesExpanded = !rulesExpanded">
        <span>{{ finalRuleTitle }}</span>
        <svg :class="ns.e('rules-icon')" viewBox="0 0 1024 1024" width="12" height="12">
          <path
            d="M512 704c-12.8 0-25.6-5.12-35.84-15.36L155.52 368c-19.84-19.84-19.84-51.84 0-71.68s51.84-19.84 71.68 0L512 600.96l284.8-284.8c19.84-19.84 51.84-19.84 71.68 0s19.84 51.84 0 71.68L547.84 688.64C537.6 698.88 524.8 704 512 704z"
            fill="currentColor"
          />
        </svg>
      </div>
      <!-- 折叠面板内容 -->
      <div v-show="rulesExpanded" :class="ns.e('rules-content')">
        <slot name="rules">
          <div style="white-space: pre-wrap">{{ rules }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './coupon-card.scss';
</style>
