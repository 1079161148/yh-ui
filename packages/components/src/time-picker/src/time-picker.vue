<script setup lang="ts">
/**
 * YhTimePicker - 时间选择器组件
 * @description 用于选择或输入任意时间点的组件，支持时/分/秒滚轮选择
 * @features
 * - SSR 安全：所有 DOM 操作在 onMounted 中执行
 * - 高性能：滚轮使用原生滚动，无虚拟 DOM 开销
 * - 完整功能：支持 12/24 小时制、禁用时间、时间范围
 * - 无障碍：完整的 ARIA 标签支持
 */
import { computed, ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace, useFormItem, useId, useLocale } from '@yh-ui/hooks'
import { useConfig } from '../../hooks/use-config'
import TimeSpinner from './time-spinner.vue'
import type { TimePickerProps, TimePickerEmits, TimePickerExpose, TimeState, TimeValue, TimeRangeValue, DisabledTimeConfig } from './time-picker'
import { parseTimeValue, formatTimeState, getCurrentTimeState, isTimeStateEqual } from './time-picker'

defineOptions({
  name: 'YhTimePicker'
})

const props = withDefaults(defineProps<TimePickerProps>(), {
  disabled: false,
  editable: true,
  clearable: true,
  size: undefined,
  placeholder: '',
  startPlaceholder: '',
  endPlaceholder: '',
  isRange: false,
  format: 'HH:mm:ss',
  use12Hours: false,
  showSeconds: true,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  teleported: true,
  validateEvent: true,
  popperOffset: 4,
  rangeSeparator: '-',
  hideOnBlur: true,
  confirmText: '',
  cancelText: '',
  nowText: '',
  showFooter: true,
  showNow: true,
  arrowControl: false,
  tabindex: 0,
  orderOnConfirm: false
})

const emit = defineEmits<TimePickerEmits>()
const ns = useNamespace('time-picker')
const { t } = useLocale()
const inputId = useId()

// 表单集成
const { form, formItem, validate: triggerValidate } = useFormItem()

// 全局配置
const { globalSize } = useConfig()

const selectSize = computed(() => props.size || formItem?.size || form?.size || globalSize.value || 'default')

// 元素引用
const wrapperRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const startInputRef = ref<HTMLInputElement>()
const endInputRef = ref<HTMLInputElement>()

// 内部状态
const visible = ref(false)
const focused = ref(false)
const hovering = ref(false)
const isClickingPanel = ref(false)

// 内部时间状态（用于面板交互）
const internalTimeState = ref<TimeState>({ hours: 0, minutes: 0, seconds: 0 })
const internalStartTimeState = ref<TimeState>({ hours: 0, minutes: 0, seconds: 0 })
const internalEndTimeState = ref<TimeState>({ hours: 0, minutes: 0, seconds: 0 })

// 输入框的文本值
const inputValue = ref('')
const startInputValue = ref('')
const endInputValue = ref('')

// 下拉框位置
const dropdownStyle = ref<Record<string, string>>({})

// 解析当前绑定值
const parsedValue = computed(() => {
  if (props.isRange) {
    const rangeValue = props.modelValue as TimeRangeValue
    if (!rangeValue || !Array.isArray(rangeValue)) return [null, null]
    return [
      parseTimeValue(rangeValue[0], props.format),
      parseTimeValue(rangeValue[1], (rangeValue.length > 1 ? props.format : undefined))
    ]
  }
  return parseTimeValue(props.modelValue as TimeValue, props.format)
})

// 显示值（单选模式）
const displayValue = computed(() => {
  if (props.isRange) {
    return '' // 范围模式使用单独的计算属性
  }
  return formatTimeState(parsedValue.value as TimeState | null, props.format, props.use12Hours)
})

// 范围模式下开始时间的显示值
const rangeStartDisplayValue = computed(() => {
  if (!props.isRange) return ''
  const [start] = parsedValue.value as [TimeState | null, TimeState | null]
  return formatTimeState(start, props.format, props.use12Hours)
})

// 范围模式下结束时间的显示值
const rangeEndDisplayValue = computed(() => {
  if (!props.isRange) return ''
  const [, end] = parsedValue.value as [TimeState | null, TimeState | null]
  return formatTimeState(end, props.format, props.use12Hours)
})

// 是否有值
const hasValue = computed(() => {
  if (props.isRange) {
    const rangeValue = props.modelValue as TimeRangeValue
    return rangeValue && rangeValue[0] !== null && rangeValue[1] !== null
  }
  return props.modelValue !== null && props.modelValue !== undefined && props.modelValue !== ''
})

// 是否显示清空按钮
const showClear = computed(() =>
  props.clearable &&
  !props.disabled &&
  hasValue.value &&
  (focused.value || hovering.value)
)

// 类名
const wrapperClasses = computed(() => [
  ns.b(),
  ns.m(selectSize.value),
  ns.is('disabled', props.disabled),
  ns.is('focused', focused.value || visible.value),
  ns.is('range', props.isRange)
])

// 更新下拉框位置
const updateDropdownPosition = () => {
  if (!wrapperRef.value || !props.teleported) return

  const rect = wrapperRef.value.getBoundingClientRect()
  const spaceBelow = window.innerHeight - rect.bottom
  const panelHeight = 320 // 预估高度

  // 决定下拉框显示在上方还是下方
  const showAbove = spaceBelow < panelHeight && rect.top > spaceBelow

  // 提取主题变量
  const styles = window.getComputedStyle(wrapperRef.value)
  const primary = styles.getPropertyValue('--yh-color-primary').trim()
  const primaryRgb = styles.getPropertyValue('--yh-color-primary-rgb').trim()

  dropdownStyle.value = {
    position: 'fixed',
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
    zIndex: '2000',
    '--yh-color-primary': primary,
    '--yh-color-primary-rgb': primaryRgb,
    ...(showAbove
      ? { bottom: `${window.innerHeight - rect.top + props.popperOffset}px` }
      : { top: `${rect.bottom + props.popperOffset}px` }
    )
  }
}

// 同步内部状态（仅在面板打开时调用）
const syncInternalState = () => {
  if (props.isRange) {
    const [start, end] = parsedValue.value as [TimeState | null, TimeState | null]
    // 如果没有值，使用默认时间状态（用于面板显示）
    internalStartTimeState.value = start || { hours: 0, minutes: 0, seconds: 0 }
    internalEndTimeState.value = end || { hours: 0, minutes: 0, seconds: 0 }
  } else {
    const state = parsedValue.value as TimeState | null
    internalTimeState.value = state || (props.defaultValue ? parseTimeValue(props.defaultValue as TimeValue, props.format) : null) || { hours: 0, minutes: 0, seconds: 0 }
  }
}

// 自动计算禁用时间的增强逻辑：当禁用自动排序时，实时约束用户选择
const getDisabledStartTime = (originalConfig: DisabledTimeConfig | undefined): DisabledTimeConfig | undefined => {
  if (props.orderOnConfirm || !props.isRange) return originalConfig

  return {
    ...originalConfig,
    disabledHours: () => {
      return originalConfig?.disabledHours?.() || []
    },
    disabledMinutes: (h: number) => originalConfig?.disabledMinutes?.(h) || [],
    disabledSeconds: (h: number, m: number) => originalConfig?.disabledSeconds?.(h, m) || []
  }
}

const getDisabledEndTime = (originalConfig: DisabledTimeConfig | undefined): DisabledTimeConfig | undefined => {
  if (props.orderOnConfirm || !props.isRange) return originalConfig

  return {
    ...originalConfig,
    disabledHours: () => {
      const hours = originalConfig?.disabledHours?.() || []
      const startHour = internalStartTimeState.value.hours
      // 禁用所有小于开始小时的时间
      for (let i = 0; i < startHour; i++) {
        if (!hours.includes(i)) hours.push(i)
      }
      return hours
    },
    disabledMinutes: (h: number) => {
      const minutes = originalConfig?.disabledMinutes?.(h) || []
      const startHour = internalStartTimeState.value.hours
      const startMin = internalStartTimeState.value.minutes
      if (h === startHour) {
        for (let i = 0; i < startMin; i++) {
          if (!minutes.includes(i)) minutes.push(i)
        }
      }
      return minutes
    },
    disabledSeconds: (h: number, m: number) => {
      const seconds = originalConfig?.disabledSeconds?.(h, m) || []
      const startHour = internalStartTimeState.value.hours
      const startMin = internalStartTimeState.value.minutes
      const startSec = internalStartTimeState.value.seconds
      if (h === startHour && m === startMin) {
        for (let i = 0; i < startSec; i++) {
          if (!seconds.includes(i)) seconds.push(i)
        }
      }
      return seconds
    }
  }
}

// 打开面板
const openPanel = () => {
  if (props.disabled) return
  visible.value = true
  syncInternalState()

  if (props.teleported) {
    nextTick(updateDropdownPosition)
  }

  emit('visible-change', true)
}

// 关闭面板
const closePanel = () => {
  visible.value = false
  emit('visible-change', false)
}

// 确认选择
const handleConfirm = () => {
  let valueToEmit: TimeValue | TimeRangeValue

  if (props.isRange) {
    const startSec = internalStartTimeState.value.hours * 3600 + internalStartTimeState.value.minutes * 60 + internalStartTimeState.value.seconds
    const endSec = internalEndTimeState.value.hours * 3600 + internalEndTimeState.value.minutes * 60 + internalEndTimeState.value.seconds

    let finalStart = { ...internalStartTimeState.value }
    let finalEnd = { ...internalEndTimeState.value }

    if (startSec > endSec) {
      if (props.orderOnConfirm) {
        // 自动排序交换
        finalStart = { ...internalEndTimeState.value }
        finalEnd = { ...internalStartTimeState.value }
      } else {
        // 不允许确认（结束时间早于开始时间）
        return
      }
    }

    valueToEmit = [
      formatTimeState(finalStart, props.valueFormat || props.format),
      formatTimeState(finalEnd, props.valueFormat || props.format)
    ]
  } else {
    valueToEmit = formatTimeState(internalTimeState.value, props.valueFormat || props.format)
  }

  emit('update:modelValue', valueToEmit)
  emit('change', valueToEmit)
  emit('confirm', valueToEmit)

  if (props.validateEvent) {
    triggerValidate('change')
  }

  closePanel()
}

// 取消选择
const handleCancel = () => {
  syncInternalState() // 恢复原值
  emit('cancel')
  closePanel()
}

// 选择"此刻"
const handleNow = () => {
  const now = getCurrentTimeState()

  if (props.isRange) {
    internalStartTimeState.value = { ...now }
    internalEndTimeState.value = { ...now }
  } else {
    internalTimeState.value = { ...now }
  }
}

// 清空
const handleClear = (event: Event) => {
  event.stopPropagation()
  const value = props.isRange ? [null, null] : null
  emit('update:modelValue', value as TimeValue | TimeRangeValue)
  emit('change', value as TimeValue | TimeRangeValue)
  emit('clear')

  if (props.validateEvent) {
    triggerValidate('change')
  }
}

// 切换下拉框
const togglePanel = () => {
  if (props.disabled) return
  if (visible.value) {
    closePanel()
  } else {
    openPanel()
  }
}

// 焦点处理
const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)
}

// 失焦处理
const handleBlur = (event: FocusEvent) => {
  if (isClickingPanel.value) return

  focused.value = false

  if (props.hideOnBlur) {
    closePanel()
  }

  emit('blur', event)

  if (props.validateEvent) {
    triggerValidate('blur')
  }
}

// 面板 mousedown 处理
const handlePanelMousedown = (event: MouseEvent) => {
  event.preventDefault()
  isClickingPanel.value = true
}

// 面板 mouseup 处理
const handlePanelMouseup = () => {
  setTimeout(() => {
    isClickingPanel.value = false
  }, 0)
}

// 鼠标事件
const handleMouseEnter = () => {
  hovering.value = true
}

const handleMouseLeave = () => {
  hovering.value = false
}

// 键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
      if (visible.value) {
        handleConfirm()
      } else {
        openPanel()
      }
      break
    case 'Escape':
      handleCancel()
      break
    case 'Tab':
      if (visible.value) {
        closePanel()
      }
      break
  }
}

// 监听 visible 变化
watch(visible, (val: boolean) => {
  if (val && props.teleported) {
    nextTick(updateDropdownPosition)
  }
})

// 监听窗口滚动和调整大小
onMounted(() => {
  if (props.teleported) {
    window.addEventListener('scroll', updateDropdownPosition, true)
    window.addEventListener('resize', updateDropdownPosition)
  }
})

onBeforeUnmount(() => {
  if (props.teleported) {
    window.removeEventListener('scroll', updateDropdownPosition, true)
    window.removeEventListener('resize', updateDropdownPosition)
  }
})

// 暴露方法
const focus = () => {
  if (props.isRange) {
    startInputRef.value?.focus()
  } else {
    inputRef.value?.focus()
  }
}

const blur = () => {
  if (props.isRange) {
    startInputRef.value?.blur()
    endInputRef.value?.blur()
  } else {
    inputRef.value?.blur()
  }
}

defineExpose<TimePickerExpose>({
  focus,
  blur,
  open: openPanel,
  close: closePanel,
  inputRef: inputRef.value
})
</script>

<template>
  <div ref="wrapperRef" :class="wrapperClasses" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
    @click="togglePanel">
    <!-- 输入区域 -->
    <div :class="ns.e('wrapper')">
      <!-- 前缀图标 -->
      <span :class="ns.e('prefix')">
        <slot name="prefix">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em" :class="ns.e('icon')">
            <path fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 64a384 384 0 1 0 0 768 384 384 0 0 0 0-768zm0 128a32 32 0 0 1 32 32v192l128 64a32 32 0 0 1-28.864 57.088l-144-72A32 32 0 0 1 480 512V288a32 32 0 0 1 32-32z" />
          </svg>
        </slot>
      </span>

      <!-- 单选输入框 -->
      <template v-if="!isRange">
        <input ref="inputRef" :id="id || inputId" :class="ns.e('inner')" :value="displayValue"
          :placeholder="placeholder || t('timepicker.placeholder')" :disabled="disabled" :readonly="!editable"
          :name="name" :tabindex="tabindex" autocomplete="off" role="combobox" :aria-expanded="visible"
          @focus="handleFocus" @blur="handleBlur" @keydown="handleKeydown" />
      </template>

      <!-- 范围选择输入框 -->
      <template v-else>
        <input ref="startInputRef" :class="ns.e('range-input')" :value="rangeStartDisplayValue"
          :placeholder="startPlaceholder || t('timepicker.startPlaceholder')" :disabled="disabled" :readonly="!editable"
          :tabindex="tabindex" autocomplete="off" @focus="handleFocus" @blur="handleBlur" @keydown="handleKeydown" />
        <span :class="ns.e('range-separator')">
          <slot name="rangeSeparator">{{ rangeSeparator }}</slot>
        </span>
        <input ref="endInputRef" :class="ns.e('range-input')" :value="rangeEndDisplayValue"
          :placeholder="endPlaceholder || t('timepicker.endPlaceholder')" :disabled="disabled" :readonly="!editable"
          :tabindex="tabindex" autocomplete="off" @focus="handleFocus" @blur="handleBlur" @keydown="handleKeydown" />
      </template>

      <!-- 后缀图标 -->
      <span :class="ns.e('suffix')">
        <!-- 清空按钮 -->
        <span v-if="showClear" :class="[ns.e('icon'), ns.e('clear')]" @click.stop="handleClear">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" />
          </svg>
        </span>

        <!-- 箭头图标 -->
        <span :class="[ns.e('icon'), ns.e('arrow'), { 'is-reverse': visible }]">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path fill="currentColor"
              d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z" />
          </svg>
        </span>
      </span>
    </div>

    <!-- 下拉面板 -->
    <Teleport to="body" :disabled="!teleported">
      <Transition :name="ns.b('panel')">
        <div v-if="visible" :class="[ns.e('panel'), popperClass]" :style="teleported ? dropdownStyle : {}"
          @mousedown="handlePanelMousedown" @mouseup="handlePanelMouseup">
          <!-- 单选面板 -->
          <template v-if="!isRange">
            <TimeSpinner v-model="internalTimeState" :show-seconds="showSeconds" :arrow-control="arrowControl"
              :hour-step="hourStep" :minute-step="minuteStep" :second-step="secondStep" :disabled-time="disabledTime"
              :use12-hours="use12Hours" :hour-options="hourOptions" :minute-options="minuteOptions"
              :second-options="secondOptions" />
          </template>

          <!-- 范围选择面板 -->
          <template v-else>
            <div :class="ns.e('range-panel')">
              <div :class="ns.e('range-panel-item')">
                <div :class="ns.e('range-panel-title')">{{ startPlaceholder || t('timepicker.startPlaceholder') }}</div>
                <TimeSpinner v-model="internalStartTimeState" :show-seconds="showSeconds" :arrow-control="arrowControl"
                  :hour-step="hourStep" :minute-step="minuteStep" :second-step="secondStep"
                  :disabled-time="getDisabledStartTime(disabledTime)" :use12-hours="use12Hours" />
              </div>
              <div :class="ns.e('range-panel-separator')">
                <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                  <path fill="currentColor" d="M384 512l256-256v512z" />
                </svg>
              </div>
              <div :class="ns.e('range-panel-item')">
                <div :class="ns.e('range-panel-title')">{{ endPlaceholder || t('timepicker.endPlaceholder') }}</div>
                <TimeSpinner v-model="internalEndTimeState" :show-seconds="showSeconds" :arrow-control="arrowControl"
                  :hour-step="hourStep" :minute-step="minuteStep" :second-step="secondStep"
                  :disabled-time="getDisabledEndTime(disabledTime)" :use12-hours="use12Hours" />
              </div>
            </div>
          </template>

          <!-- 底部操作栏 -->
          <div v-if="showFooter" :class="ns.e('footer')">
            <button v-if="showNow" type="button" :class="ns.e('footer-btn')" @click="handleNow">
              {{ nowText || t('timepicker.now') }}
            </button>
            <div :class="ns.e('footer-actions')">
              <button type="button" :class="[ns.e('footer-btn'), ns.e('footer-btn--cancel')]" @click="handleCancel">
                {{ cancelText || t('timepicker.cancel') }}
              </button>
              <button type="button" :class="[ns.e('footer-btn'), ns.e('footer-btn--confirm')]" @click="handleConfirm">
                {{ confirmText || t('timepicker.confirm') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use './time-picker.scss';
</style>
