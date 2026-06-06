<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { useLocale } from '@yh-ui/hooks'
import { submitBarProps, submitBarEmits } from './submit-bar'

defineOptions({ name: 'YhSubmitBar' })

const props = defineProps(submitBarProps)
const emit = defineEmits(submitBarEmits)

const ns = useNamespace('submit-bar')
const { themeStyle } = useComponentTheme(
  'submit-bar',
  computed(() => props.themeOverrides)
)
const { t } = useLocale()

const displayPrice = computed(() => {
  const raw = props.centUnit ? props.price / 100 : props.price
  return raw.toFixed(props.decimalLength)
})

const priceLabel = computed(() => props.label || t('submitbar.total'))

const selectedText = computed(() => {
  if (!props.selectedCount) return ''
  return t('submitbar.selected').replace('{count}', String(props.selectedCount))
})

const btnText = computed(() => props.buttonText || t('submitbar.submit'))

function handleSubmit(e: MouseEvent) {
  if (props.disabled || props.loading) return
  emit('submit', e)
}

function handleCheck(e: Event) {
  const val = (e.target as HTMLInputElement).checked
  emit('update:checked', val)
  emit('check-change', val)
}
</script>

<template>
  <div
    :class="[ns.b(), ns.is('safe-area', safeAreaInsetBottom)]"
    :style="themeStyle"
    role="toolbar"
  >
    <!-- 顶部提示 -->
    <div v-if="tip || $slots.tip" :class="ns.e('tip')">
      <slot name="tip">{{ tip }}</slot>
    </div>

    <div :class="ns.e('inner')">
      <!-- 全选区 -->
      <label
        v-if="showCheckbox"
        :class="ns.e('check')"
        role="checkbox"
        :aria-checked="indeterminate ? 'mixed' : checked"
      >
        <input
          type="checkbox"
          :class="ns.e('check-input')"
          :checked="checked"
          :indeterminate="indeterminate"
          @change="handleCheck"
        />
        <span :class="ns.e('check-label')">{{ t('submitbar.allSelect') }}</span>
      </label>

      <!-- 左侧自定义 -->
      <slot name="left" />

      <!-- 价格区 -->
      <div :class="ns.e('price-area')">
        <div v-if="selectedText" :class="ns.e('selected-count')">{{ selectedText }}</div>
        <div :class="ns.e('price-row')">
          <span :class="ns.e('label')">{{ priceLabel }}</span>
          <slot name="price">
            <span :class="ns.e('price')">
              <span :class="ns.e('currency')">{{ currency }}</span>
              <span :class="ns.e('price-int')">{{ displayPrice.split('.')[0] }}</span>
              <span v-if="decimalLength > 0" :class="ns.e('price-dec')"
                >.{{ displayPrice.split('.')[1] }}</span
              >
            </span>
          </slot>
        </div>
      </div>

      <!-- 右侧自定义 -->
      <slot name="right" />

      <!-- 提交按钮 -->
      <button
        :class="[ns.e('btn'), ns.em('btn', buttonType), ns.is('disabled', disabled || loading)]"
        :disabled="disabled || loading"
        :aria-disabled="disabled || loading"
        :aria-busy="loading"
        @click="handleSubmit"
      >
        <slot name="button">
          <span v-if="loading" :class="ns.e('btn-loading')" aria-hidden="true" />
          <span>{{ btnText }}</span>
        </slot>
      </button>
    </div>

    <!-- 安全区底部占位 -->
    <div v-if="safeAreaInsetBottom" :class="ns.e('safe')"></div>
  </div>
</template>

<style lang="scss">
@use './submit-bar.scss';
</style>
