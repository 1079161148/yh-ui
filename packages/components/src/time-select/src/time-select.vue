<script setup lang="ts">
/**
 * YhTimeSelect - 时间选择器组件
 * @description 用于选择或输入固定时间点的组件
 */
import { computed, ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace, useFormItem, useId } from '@yh-ui/hooks'
import { useConfig } from '../../hooks/use-config'
import type { TimeSelectProps, TimeSelectEmits, TimeSelectExpose, TimeOption } from './time-select'
import { generateTimeOptions, parseTimeToMinutes, isTimeInRange } from './time-select'

defineOptions({
  name: 'YhTimeSelect'
})

const props = withDefaults(defineProps<TimeSelectProps>(), {
  disabled: false,
  editable: true,
  clearable: true,
  size: undefined,
  placeholder: '请选择时间',
  effect: 'light',
  start: '09:00',
  end: '18:00',
  step: '00:30',
  format: 'HH:mm',
  teleported: true,
  includeEndTime: false,
  validateEvent: true
})

const emit = defineEmits<TimeSelectEmits>()
const ns = useNamespace('time-select')
const inputId = useId()

// 表单集成
const { form, formItem, validate: triggerValidate } = useFormItem()

// 全局配置
const { globalSize } = useConfig()

const selectSize = computed(() => props.size || formItem?.size || form?.size || globalSize.value || 'default')

// 元素引用
const wrapperRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const optionsRef = ref<HTMLElement>()

// 内部状态
const visible = ref(false)
const focused = ref(false)
const hovering = ref(false)
const query = ref('')
const hoveredIndex = ref(-1)
const isClickingDropdown = ref(false)

// 下拉框位置
const dropdownStyle = ref<Record<string, string>>({})

// 生成时间选项
const timeOptions = computed<TimeOption[]>(() => {
  // 如果提供了自定义选项，优先使用
  if (props.options && props.options.length > 0) {
    return props.options
  }

  // 否则根据 start/end/step 生成
  return generateTimeOptions(
    props.start,
    props.end,
    props.step,
    props.format,
    props.includeEndTime
  )
})

// 过滤后的选项（支持搜索）
const filteredOptions = computed<TimeOption[]>(() => {
  let options = timeOptions.value

  // 应用禁用时间段
  if (props.disabledHours && props.disabledHours.length > 0) {
    options = options.map(opt => {
      const isDisabled = props.disabledHours!.some(range => {
        if (range.length >= 2) {
          return isTimeInRange(opt.value, range[0], range[1])
        }
        return false
      })
      return { ...opt, disabled: opt.disabled || isDisabled }
    })
  }

  // 应用 minTime/maxTime 限制
  if (props.minTime) {
    const minMinutes = parseTimeToMinutes(props.minTime)
    options = options.map(opt => ({
      ...opt,
      disabled: opt.disabled || parseTimeToMinutes(opt.value) < minMinutes
    }))
  }

  if (props.maxTime) {
    const maxMinutes = parseTimeToMinutes(props.maxTime)
    options = options.map(opt => ({
      ...opt,
      disabled: opt.disabled || parseTimeToMinutes(opt.value) > maxMinutes
    }))
  }

  // 搜索过滤
  if (query.value && props.editable) {
    const q = query.value.toLowerCase()
    return options.filter(opt =>
      opt.label.toLowerCase().includes(q) ||
      opt.value.toLowerCase().includes(q)
    )
  }

  return options
})

// 当前选中的显示标签
const displayLabel = computed(() => {
  if (!props.modelValue) return ''
  const opt = timeOptions.value.find(o => o.value === props.modelValue)
  return opt ? opt.label : props.modelValue
})

// 是否显示清空按钮
const showClear = computed(() =>
  props.clearable &&
  !props.disabled &&
  props.modelValue !== undefined &&
  props.modelValue !== '' &&
  (focused.value || hovering.value)
)

// 是否有值
const hasValue = computed(() =>
  props.modelValue !== undefined && props.modelValue !== ''
)

// 类名
const wrapperClasses = computed(() => [
  ns.b(),
  ns.m(selectSize.value),
  ns.is('disabled', props.disabled),
  ns.is('focused', focused.value || visible.value)
])

// 更新下拉框位置
const updateDropdownPosition = () => {
  if (!wrapperRef.value || !props.teleported) return

  const rect = wrapperRef.value.getBoundingClientRect()
  const spaceBelow = window.innerHeight - rect.bottom
  const spaceAbove = rect.top
  const dropdownHeight = 274 // 预估高度

  // 决定下拉框显示在上方还是下方
  const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow

  dropdownStyle.value = {
    position: 'fixed',
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    ...(showAbove
      ? { bottom: `${window.innerHeight - rect.top + 4}px` }
      : { top: `${rect.bottom + 4}px` }
    )
  }
}

// 滚动到选中项
const scrollToSelected = () => {
  if (!optionsRef.value || !props.modelValue) return

  nextTick(() => {
    const selectedEl = optionsRef.value?.querySelector(`.${ns.is('selected', true).slice(1)}`) as HTMLElement
    if (selectedEl && optionsRef.value) {
      const containerHeight = optionsRef.value.clientHeight
      const scrollTop = selectedEl.offsetTop - containerHeight / 2 + selectedEl.offsetHeight / 2
      optionsRef.value.scrollTop = Math.max(0, scrollTop)
    }
  })
}

// 监听 visible 变化更新位置
watch(visible, (val) => {
  if (val) {
    if (props.teleported) {
      nextTick(updateDropdownPosition)
    }
    scrollToSelected()
    // 重置搜索
    query.value = ''
  }
  emit('visible-change', val)
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

// 选择选项
const handleOptionSelect = (option: TimeOption, event?: MouseEvent) => {
  if (option.disabled) return

  // 阻止事件冒泡
  if (event) {
    event.stopPropagation()
  }

  emit('update:modelValue', option.value)
  emit('change', option.value)
  visible.value = false
  query.value = ''

  if (props.validateEvent) {
    triggerValidate('change')
  }
}

// 清空
const handleClear = (event: Event) => {
  event.stopPropagation()
  const value = props.valueOnClear ?? undefined
  emit('update:modelValue', value)
  emit('change', value)
  emit('clear')
  query.value = ''
  if (props.validateEvent) {
    triggerValidate('change')
  }
}

// 切换下拉框
const toggleDropdown = () => {
  if (props.disabled) return
  visible.value = !visible.value
  if (visible.value) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
}

// 输入处理
const handleInput = (event: Event) => {
  if (!props.editable) return
  const target = event.target as HTMLInputElement
  query.value = target.value
}

// 键盘导航
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!visible.value) {
        visible.value = true
      } else {
        // 跳过禁用项
        let nextIndex = hoveredIndex.value + 1
        while (nextIndex < filteredOptions.value.length && filteredOptions.value[nextIndex]?.disabled) {
          nextIndex++
        }
        if (nextIndex < filteredOptions.value.length) {
          hoveredIndex.value = nextIndex
        }
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      // 跳过禁用项
      let prevIndex = hoveredIndex.value - 1
      while (prevIndex >= 0 && filteredOptions.value[prevIndex]?.disabled) {
        prevIndex--
      }
      if (prevIndex >= 0) {
        hoveredIndex.value = prevIndex
      }
      break
    case 'Enter':
      event.preventDefault()
      if (visible.value && hoveredIndex.value >= 0 && filteredOptions.value[hoveredIndex.value]) {
        handleOptionSelect(filteredOptions.value[hoveredIndex.value])
      } else if (!visible.value) {
        visible.value = true
      }
      break
    case 'Escape':
      visible.value = false
      break
    case 'Tab':
      visible.value = false
      break
  }
}

// 焦点处理
const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)
}

// 失焦处理  
const handleBlur = (event: FocusEvent) => {
  // 如果正在点击下拉框，不处理 blur
  if (isClickingDropdown.value) {
    return
  }

  focused.value = false
  visible.value = false
  emit('blur', event)
  if (props.validateEvent) {
    triggerValidate('blur')
  }
}

// 下拉框 mousedown 处理
const handleDropdownMousedown = (event: MouseEvent) => {
  event.preventDefault()
  isClickingDropdown.value = true
}

// 下拉框 mouseup 处理
const handleDropdownMouseup = () => {
  setTimeout(() => {
    isClickingDropdown.value = false
  }, 0)
}

// 选项点击处理
const handleOptionClick = (option: TimeOption, event: MouseEvent) => {
  event.stopPropagation()
  handleOptionSelect(option, event)

  nextTick(() => {
    inputRef.value?.focus()
  })
}

const handleMouseEnter = () => {
  hovering.value = true
}

const handleMouseLeave = () => {
  hovering.value = false
}

// 暴露方法
const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

defineExpose<TimeSelectExpose>({
  focus,
  blur,
  inputRef: inputRef.value
})
</script>

<template>
  <div ref="wrapperRef" :class="wrapperClasses" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
    @click="toggleDropdown">
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

      <!-- 输入框 -->
      <input ref="inputRef" :id="inputId" :class="ns.e('inner')" :value="editable && visible ? query : ''"
        :placeholder="hasValue ? '' : placeholder" :disabled="disabled" :readonly="!editable" :name="name"
        autocomplete="off" role="combobox" :aria-expanded="visible" :aria-controls="`${inputId}-listbox`"
        @input="handleInput" @focus="handleFocus" @blur="handleBlur" @keydown="handleKeydown" />

      <!-- 显示值 -->
      <span v-if="hasValue && !(editable && visible && query)" :class="ns.e('display-value')">
        {{ displayLabel }}
      </span>

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

    <!-- 下拉框 -->
    <Teleport to="body" :disabled="!teleported">
      <Transition :name="ns.b('dropdown')">
        <div v-show="visible" :class="[ns.e('dropdown'), popperClass, `is-${effect}`]"
          :style="teleported ? dropdownStyle : {}" @mousedown="handleDropdownMousedown"
          @mouseup="handleDropdownMouseup">
          <!-- 无数据 -->
          <div v-if="filteredOptions.length === 0" :class="ns.e('empty')">
            <slot name="empty">
              暂无可选时间
            </slot>
          </div>

          <!-- 选项列表 -->
          <div v-else ref="optionsRef" :id="`${inputId}-listbox`" :class="ns.e('options')" role="listbox">
            <div v-for="(option, index) in filteredOptions" :key="option.value" :class="[
              ns.e('option'),
              ns.is('selected', modelValue === option.value),
              ns.is('disabled', option.disabled),
              ns.is('hovering', hoveredIndex === index)
            ]" role="option" :aria-selected="modelValue === option.value" @mousedown.prevent
              @click="handleOptionClick(option, $event)" @mouseenter="hoveredIndex = index">
              <slot name="option" :option="option">
                {{ option.label }}
              </slot>
              <span v-if="modelValue === option.value" :class="ns.e('option-check')">
                <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                  <path fill="currentColor"
                    d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use './time-select.scss';
</style>
