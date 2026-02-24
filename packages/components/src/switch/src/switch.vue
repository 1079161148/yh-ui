<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import { useNamespace, useFormItem } from '@yh-ui/hooks'
import { useConfig } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { switchProps, switchEmits, type SwitchValueType } from './switch'

defineOptions({
  name: 'YhSwitch'
})

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)
const ns = useNamespace('switch')

const { form, validate } = useFormItem()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme(
  'switch',
  computed(() => props.themeOverrides)
)

// 全局配置
const { globalSize } = useConfig()

const inputRef = ref<HTMLInputElement>()

// 是否为选中状态
const isChecked = computed(() => props.modelValue === props.activeValue)

// 是否禁用（组件 disabled 或 表单 disabled，不包括 loading）
const isDisabled = computed(() => {
  return props.disabled || form?.disabled === true
})

// 是否可交互（非禁用且非加载中）
const isInteractive = computed(() => {
  return !isDisabled.value && !props.loading
})

// 实际宽度
const actualWidth = computed(() => {
  if (!props.width) return undefined
  return typeof props.width === 'number' ? `${props.width}px` : props.width
})

// 处理点击切换
const handleClick = () => {
  if (!isInteractive.value) return
  handleChange()
}

// 处理切换逻辑
const handleChange = async () => {
  const { beforeChange } = props
  const newValue = isChecked.value ? props.inactiveValue : props.activeValue

  if (!beforeChange) {
    updateValue(newValue)
    return
  }

  try {
    const result = beforeChange()
    const shouldChange = result instanceof Promise ? await result : result
    if (shouldChange !== false) {
      updateValue(newValue)
    }
  } catch {
    // beforeChange 被 reject，不切换
  }
}

// 更新值
const updateValue = (val: SwitchValueType) => {
  emit('update:modelValue', val)
  emit('change', val)

  if (props.validateEvent) {
    validate('change')
  }

  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.checked = isChecked.value
    }
  })
}

// 聚焦方法
const focus = () => {
  inputRef.value?.focus()
}

// 样式变量
const switchStyle = computed(() => ({
  ...themeStyle.value,
  '--yh-switch-width': actualWidth.value
}))

// 组件类名
const switchClass = computed(() => [
  ns.b(),
  ns.m(props.size || globalSize.value || 'default'),
  ns.is('disabled', isDisabled.value),
  ns.is('checked', isChecked.value),
  ns.is('loading', props.loading)
])

// 核心样式
const coreStyle = computed(() => {
  const style: Record<string, string> = {}
  if (actualWidth.value) {
    style.width = actualWidth.value
  }
  return style
})

// 暴露方法
defineExpose({
  focus,
  checked: isChecked
})
</script>

<template>
  <div
    :class="switchClass"
    :style="switchStyle"
    role="switch"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
    @click="handleClick"
  >
    <input
      ref="inputRef"
      :class="ns.e('input')"
      type="checkbox"
      :id="props.id"
      :name="props.name"
      :disabled="!isInteractive"
      :checked="isChecked"
      :tabindex="props.tabindex"
      :aria-label="props.ariaLabel"
      @change.stop
      @keydown.enter="handleClick"
    />

    <!-- 左侧标签（非内嵌模式） -->
    <span
      v-if="!props.inlinePrompt && (props.inactiveIcon || props.inactiveText)"
      :class="[ns.e('label'), ns.e('label--left'), ns.is('active', !isChecked)]"
    >
      <slot name="inactive">
        <component v-if="props.inactiveIcon" :is="props.inactiveIcon" :class="ns.e('icon')" />
        <span v-else-if="props.inactiveText">{{ props.inactiveText }}</span>
      </slot>
    </span>

    <!-- 开关核心 -->
    <span :class="ns.e('core')" :style="coreStyle">
      <!-- 内嵌内容 -->
      <div v-if="props.inlinePrompt" :class="ns.e('inner')">
        <template v-if="isChecked">
          <slot name="active">
            <component v-if="props.activeIcon" :is="props.activeIcon" :class="ns.e('icon')" />
            <span v-else-if="props.activeText" :class="ns.e('inner-text')">
              {{ props.activeText.substring(0, 3) }}
            </span>
          </slot>
        </template>
        <template v-else>
          <slot name="inactive">
            <component v-if="props.inactiveIcon" :is="props.inactiveIcon" :class="ns.e('icon')" />
            <span v-else-if="props.inactiveText" :class="ns.e('inner-text')">
              {{ props.inactiveText.substring(0, 3) }}
            </span>
          </slot>
        </template>
      </div>

      <!-- 滑块（action） -->
      <div :class="ns.e('action')">
        <!-- Loading 图标 -->
        <svg
          v-if="props.loading"
          :class="ns.e('loading-icon')"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
          />
        </svg>
        <!-- 自定义 action 图标 -->
        <template v-else>
          <slot v-if="isChecked" name="active-action">
            <component v-if="props.activeActionIcon" :is="props.activeActionIcon" />
          </slot>
          <slot v-else name="inactive-action">
            <component v-if="props.inactiveActionIcon" :is="props.inactiveActionIcon" />
          </slot>
        </template>
      </div>
    </span>

    <!-- 右侧标签（非内嵌模式） -->
    <span
      v-if="!props.inlinePrompt && (props.activeIcon || props.activeText)"
      :class="[ns.e('label'), ns.e('label--right'), ns.is('active', isChecked)]"
    >
      <slot name="active">
        <component v-if="props.activeIcon" :is="props.activeIcon" :class="ns.e('icon')" />
        <span v-else-if="props.activeText">{{ props.activeText }}</span>
      </slot>
    </span>
  </div>
</template>

<style lang="scss">
@use './switch.scss';
</style>
