<script setup lang="ts">
/**
 * YhSelect - 选择器组件
 * @description 从预定义选项中选择一个或多个值
 */
import { computed, ref, nextTick, provide, watch, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace, useFormItem, useId, useLocale } from '@yh-ui/hooks'
import { useConfig } from '../../hooks/use-config'
import type { SelectProps, SelectEmits, SelectExpose, SelectOption, SelectContext, SelectValue } from './select'
import { SelectContextKey } from './select'

defineOptions({
  name: 'YhSelect'
})

const props = withDefaults(defineProps<SelectProps>(), {
  disabled: false,
  clearable: false,
  size: undefined,
  multiple: false,
  multipleLimit: 0,
  filterable: false,
  remote: false,
  loading: false,
  loadingText: '',
  noMatchText: '',
  noDataText: '',
  allowCreate: false,
  collapseTags: false,
  collapseTagsTooltip: false,
  maxCollapseTags: 1,
  teleported: true,
  fitInputWidth: true,
  tagType: '',
  virtualScroll: false,
  itemHeight: 34,
  height: 274,
  validateEvent: true,
  valueKey: 'value',
  labelKey: 'label'
})

const emit = defineEmits<SelectEmits>()
const ns = useNamespace('select')
const { t } = useLocale()
const inputId = useId()

// 表单集成
const { form, formItem, validate: triggerValidate } = useFormItem()

// 全局配置
const { globalSize } = useConfig()

const selectSize = computed(() => props.size || formItem?.size || form?.size || globalSize.value || 'default')

// 默认文案翻译
const translatedLoadingText = computed(() => props.loadingText || t('select.loading'))
const translatedNoMatchText = computed(() => props.noMatchText || t('select.noMatch'))
const translatedNoDataText = computed(() => props.noDataText || t('select.noData'))

// 元素引用
const wrapperRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()

// 内部状态
const visible = ref(false)
const focused = ref(false)
const hovering = ref(false)
const query = ref('')
const hoveredIndex = ref(-1)
const createdOptions = ref<SelectOption[]>([])
const slotOptions = ref<SelectOption[]>([])

// 注册 Option
const onOptionCreate = (option: SelectOption) => {
  const index = slotOptions.value.findIndex(o => o.value === option.value)
  if (index > -1) {
    slotOptions.value.splice(index, 1, option)
  } else {
    slotOptions.value.push(option)
  }
}

// 注销 Option
const onOptionDestroy = (value: SelectValue) => {
  const index = slotOptions.value.findIndex(o => o.value === value)
  if (index > -1) {
    slotOptions.value.splice(index, 1)
  }
}

// 下拉框位置
const dropdownStyle = ref<Record<string, string>>({})

// 更新下拉框位置
const updateDropdownPosition = () => {
  if (!wrapperRef.value || !props.teleported) return

  const rect = wrapperRef.value.getBoundingClientRect()

  // 从所在容器提取当前有效的主题变量，支持局部主题覆盖（如内联样式设置的紫色）
  const styles = window.getComputedStyle(wrapperRef.value)
  const primary = styles.getPropertyValue('--yh-color-primary').trim()
  const primaryRgb = styles.getPropertyValue('--yh-color-primary-rgb').trim()
  const primaryLight9 = styles.getPropertyValue('--yh-color-primary-light-9').trim()

  dropdownStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: props.fitInputWidth ? `${rect.width}px` : undefined,
    zIndex: '2000',
    '--yh-color-primary': primary,
    '--yh-color-primary-rgb': primaryRgb,
    '--yh-color-primary-light-9': primaryLight9
  } as Record<string, string>
}

// 监听 visible 变化更新位置
watch(visible, (val) => {
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

// 合并选项
const allOptions = computed(() => {
  return [...createdOptions.value, ...slotOptions.value, ...(props.options || [])]
})

// 过滤后的选项
const filteredOptions = computed(() => {
  if (!props.filterable || !query.value) {
    return allOptions.value
  }
  const q = query.value.toLowerCase()
  return allOptions.value.filter(opt => {
    const label = String(opt[props.labelKey || 'label'] || opt.label || '')
    return label.toLowerCase().includes(q)
  })
})

// 虚拟滚动状态
const scrollTop = ref(0)

// 虚拟滚动计算
const virtualConfig = computed(() => {
  const itemHeight = props.itemHeight || 34
  const containerHeight = props.height || 274
  const overscan = 3
  const items = filteredOptions.value

  if (!props.virtualScroll || items.length === 0) {
    return {
      visibleItems: items,
      totalHeight: items.length * itemHeight,
      offsetY: 0,
      startIndex: 0,
      endIndex: items.length
    }
  }

  const visibleCount = Math.ceil(containerHeight / itemHeight)
  const start = Math.floor(scrollTop.value / itemHeight)
  const startIndex = Math.max(0, start - overscan)
  const endIndex = Math.min(items.length, start + visibleCount + overscan)

  return {
    visibleItems: items.slice(startIndex, endIndex),
    totalHeight: items.length * itemHeight,
    offsetY: startIndex * itemHeight,
    startIndex,
    endIndex
  }
})

// 虚拟滚动处理
const handleVirtualScroll = (event: Event) => {
  const target = event.target as HTMLElement
  scrollTop.value = target.scrollTop
}

// 显示的选项
const displayOptions = computed(() => {
  return props.virtualScroll ? virtualConfig.value.visibleItems : filteredOptions.value
})

// 虚拟滚动总高度
const totalHeight = computed(() => virtualConfig.value.totalHeight)

// 虚拟滚动偏移量
const offsetY = computed(() => virtualConfig.value.offsetY)

// 虚拟滚动起始索引
const startIndex = computed(() => virtualConfig.value.startIndex)

// 选中的标签
const selectedLabels = computed(() => {
  if (props.multiple) {
    const values = Array.isArray(props.modelValue) ? props.modelValue : []
    return values.map(v => {
      const opt = allOptions.value.find(o => o[props.valueKey || 'value'] === v)
      return opt ? (opt[props.labelKey || 'label'] as string || opt.label) : String(v)
    })
  }
  const opt = allOptions.value.find(o => o[props.valueKey || 'value'] === props.modelValue)
  return opt ? (opt[props.labelKey || 'label'] as string || opt.label) : String(props.modelValue ?? '')
})

// 显示的标签（折叠）
const displayTags = computed(() => {
  if (!props.multiple || !Array.isArray(selectedLabels.value)) return []
  if (props.collapseTags) {
    return selectedLabels.value.slice(0, props.maxCollapseTags)
  }
  return selectedLabels.value
})

// 折叠的标签数量
const collapsedCount = computed(() => {
  if (!props.multiple || !props.collapseTags || !Array.isArray(selectedLabels.value)) return 0
  return Math.max(0, selectedLabels.value.length - (props.maxCollapseTags || 1))
})

// 是否显示清空按钮
const showClear = computed(() =>
  props.clearable &&
  !props.disabled &&
  (props.multiple ? (Array.isArray(props.modelValue) && props.modelValue.length > 0) : props.modelValue !== undefined && props.modelValue !== '') &&
  (focused.value || hovering.value)
)

// 是否有值
const hasValue = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  }
  return props.modelValue !== undefined && props.modelValue !== ''
})

// 类名
const wrapperClasses = computed(() => [
  ns.b(),
  ns.m(selectSize.value),
  ns.is('disabled', props.disabled),
  ns.is('focused', focused.value || visible.value),
  ns.is('multiple', props.multiple)
])

// 判断是否选中
const isSelected = (value: SelectValue) => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(value)
  }
  return props.modelValue === value
}

// 选择选项
const handleOptionSelect = (option: SelectOption, event?: MouseEvent) => {
  if (option.disabled) return

  // 阻止事件冒泡
  if (event) {
    event.stopPropagation()
  }

  const value = option[props.valueKey || 'value'] as SelectValue

  if (props.multiple) {
    const values = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = values.indexOf(value)
    if (index > -1) {
      values.splice(index, 1)
    } else {
      if (props.multipleLimit && props.multipleLimit > 0 && values.length >= props.multipleLimit) {
        return
      }
      values.push(value)
    }
    emit('update:modelValue', values)
    emit('change', values)
  } else {
    emit('update:modelValue', value)
    emit('change', value)
    visible.value = false
  }

  if (props.validateEvent) {
    triggerValidate('change')
  }

  query.value = ''
}

// 移除标签
const handleRemoveTag = (value: SelectValue, event: Event) => {
  event.stopPropagation()
  if (props.disabled) return

  const values = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const index = values.indexOf(value)
  if (index > -1) {
    values.splice(index, 1)
    emit('update:modelValue', values)
    emit('change', values)
    emit('remove-tag', value)
    if (props.validateEvent) {
      triggerValidate('change')
    }
  }
}

// 清空
const handleClear = (event: Event) => {
  event.stopPropagation()
  const value = props.multiple ? [] : undefined
  emit('update:modelValue', value as any)
  emit('change', value as any)
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
  emit('visible-change', visible.value)
  if (visible.value) {
    nextTick(() => {
      if (props.filterable) {
        inputRef.value?.focus()
      }
    })
  }
}

// 输入处理
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  query.value = target.value

  if (props.remote && props.remoteMethod) {
    props.remoteMethod(query.value)
  } else if (props.filterMethod) {
    props.filterMethod(query.value)
  }
}

// 键盘导航
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!visible.value) {
        visible.value = true
        emit('visible-change', true)
      } else {
        hoveredIndex.value = Math.min(hoveredIndex.value + 1, filteredOptions.value.length - 1)
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      hoveredIndex.value = Math.max(hoveredIndex.value - 1, 0)
      break
    case 'Enter':
      event.preventDefault()
      if (visible.value && hoveredIndex.value >= 0 && filteredOptions.value[hoveredIndex.value]) {
        handleOptionSelect(filteredOptions.value[hoveredIndex.value])
      } else if (props.allowCreate && query.value) {
        const newOption: SelectOption = {
          value: query.value,
          label: query.value,
          [props.valueKey || 'value']: query.value,
          [props.labelKey || 'label']: query.value
        }
        createdOptions.value.push(newOption)
        handleOptionSelect(newOption)
      }
      break
    case 'Escape':
      visible.value = false
      emit('visible-change', false)
      break
    case 'Backspace':
      if (props.multiple && !query.value && Array.isArray(props.modelValue) && props.modelValue.length > 0) {
        const values = [...props.modelValue]
        const removed = values.pop()
        if (removed !== undefined) {
          emit('update:modelValue', values)
          emit('change', values)
          emit('remove-tag', removed)
        }
      }
      break
  }
}

// 是否正在点击下拉框
const isClickingDropdown = ref(false)

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
  emit('visible-change', false)
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
  // 使用 setTimeout 确保 click 事件先执行
  setTimeout(() => {
    isClickingDropdown.value = false
  }, 0)
}

// 选项点击处理 - 直接处理，不依赖 mousedown
const handleOptionClick = (option: SelectOption, event: MouseEvent) => {
  event.stopPropagation()
  handleOptionSelect(option, event)

  // 单选模式下，选择后重新聚焦输入框
  if (!props.multiple) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
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

// 提供上下文
provide<SelectContext>(SelectContextKey, {
  props,
  selectValue: computed(() => props.modelValue),
  hoveredIndex,
  handleOptionSelect: (option, event) => handleOptionSelect(option, event),
  isSelected,
  onOptionCreate,
  onOptionDestroy
})

defineExpose<SelectExpose>({
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
      <!-- 多选标签 -->
      <template v-if="multiple">
        <span v-for="(label, index) in displayTags" :key="index"
          :class="[ns.e('tag'), tagType ? `yh-tag--${tagType}` : '']">
          <span :class="ns.e('tag-text')">{{ label }}</span>
          <span :class="ns.e('tag-close')"
            @click="handleRemoveTag(Array.isArray(modelValue) ? modelValue[index] : (modelValue as SelectValue), $event)">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path fill="currentColor"
                d="M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
            </svg>
          </span>
        </span>
        <span v-if="collapsedCount > 0" :class="ns.e('tag')">
          +{{ collapsedCount }}
        </span>
      </template>

      <!-- 输入框 -->
      <input ref="inputRef" :id="inputId" :class="ns.e('inner')" :value="filterable ? query : ''"
        :placeholder="hasValue ? '' : (placeholder || t('select.placeholder'))" :disabled="disabled"
        :readonly="!filterable" autocomplete="off" role="combobox" :aria-expanded="visible"
        :aria-controls="`${inputId}-listbox`" @input="handleInput" @focus="handleFocus" @blur="handleBlur"
        @keydown="handleKeydown" />

      <!-- 单选显示值 -->
      <span v-if="!multiple && hasValue && !query" :class="ns.e('selected-value')">
        {{ selectedLabels }}
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
        <div v-show="visible" :class="[ns.e('dropdown'), popperClass]"
          :style="teleported ? dropdownStyle : { minWidth: fitInputWidth && wrapperRef ? `${wrapperRef.offsetWidth}px` : undefined }"
          @mousedown="handleDropdownMousedown" @mouseup="handleDropdownMouseup">
          <!-- 加载状态 -->
          <div v-if="loading" :class="ns.e('loading')">
            <svg :class="ns.e('loading-icon')" viewBox="0 0 1024 1024">
              <path fill="currentColor"
                d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32z" />
            </svg>
            <span>{{ translatedLoadingText }}</span>
          </div>

          <!-- 无数据 -->
          <div v-else-if="filteredOptions.length === 0" :class="ns.e('empty')">
            <slot name="empty">
              {{ query ? translatedNoMatchText : translatedNoDataText }}
            </slot>
          </div>

          <!-- 选项列表 -->
          <div v-else :id="`${inputId}-listbox`" :class="ns.e('options')" role="listbox"
            :style="virtualScroll ? { height: `${height}px`, overflow: 'auto' } : {}"
            @scroll="virtualScroll ? handleVirtualScroll($event) : undefined">
            <!-- 虚拟滚动占位 -->
            <div v-if="virtualScroll" :style="{ height: `${totalHeight}px`, position: 'relative' }">
              <div :style="{ transform: `translateY(${offsetY}px)` }">
                <div v-for="(option, index) in displayOptions" :key="(String(option[valueKey || 'value']))" :class="[
                  ns.e('option'),
                  ns.is('selected', isSelected(option[valueKey || 'value'] as SelectValue)),
                  ns.is('disabled', option.disabled),
                  ns.is('hovering', hoveredIndex === index)
                ]" role="option" :aria-selected="isSelected(option[valueKey || 'value'] as SelectValue)"
                  @mousedown.prevent @click="handleOptionClick(option, $event)"
                  @mouseenter="hoveredIndex = startIndex + index">
                  <slot name="option" :option="option">
                    {{ option[labelKey || 'label'] || option.label }}
                  </slot>
                  <span v-if="multiple && isSelected(option[valueKey || 'value'] as SelectValue)"
                    :class="ns.e('option-check')">
                    <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                      <path fill="currentColor"
                        d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <!-- 普通列表 -->
            <template v-else>
              <div v-for="(option, index) in displayOptions" :key="(String(option[valueKey || 'value']))" :class="[
                ns.e('option'),
                ns.is('selected', isSelected(option[valueKey || 'value'] as SelectValue)),
                ns.is('disabled', option.disabled),
                ns.is('hovering', hoveredIndex === index)
              ]" role="option" :aria-selected="isSelected(option[valueKey || 'value'] as SelectValue)"
                @mousedown.prevent @click="handleOptionClick(option, $event)" @mouseenter="hoveredIndex = index">
                <slot name="option" :option="option">
                  {{ option[labelKey || 'label'] || option.label }}
                </slot>
                <span v-if="multiple && isSelected(option[valueKey || 'value'] as SelectValue)"
                  :class="ns.e('option-check')">
                  <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                    <path fill="currentColor"
                      d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z" />
                  </svg>
                </span>
              </div>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- 隐藏插槽，用于注册 Option -->
    <div v-show="false" v-if="$slots.default">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use './select.scss';
</style>
