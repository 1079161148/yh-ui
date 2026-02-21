<script setup lang="ts">
/**
 * YhAutocomplete - 自动补全输入框组件
 * @description 根据用户输入提供建议选项
 */
import { computed, ref, watch, nextTick, useSlots, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace, useFormItem, useId, useZIndex, useLocale, useConfig } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { AutocompleteProps, AutocompleteEmits, AutocompleteExpose, AutocompleteSuggestion } from './autocomplete'

defineOptions({
  name: 'YhAutocomplete'
})

const props = withDefaults(defineProps<AutocompleteProps>(), {
  disabled: false,
  clearable: false,
  size: undefined,
  triggerOnFocus: true,
  debounce: 300,
  placement: 'bottom-start',
  valueKey: 'value',
  teleported: true,
  fitInputWidth: true,
  highlightFirstItem: false,
  validateEvent: true,
  autofocus: false,
  autocomplete: 'off'
})

const emit = defineEmits<AutocompleteEmits>()
const slots = useSlots()
const ns = useNamespace('autocomplete')
const inputId = useId()
const { t } = useLocale()
const { nextZIndex } = useZIndex()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('autocomplete', computed(() => props.themeOverrides))

// 表单集成
const { form, formItem, validate: triggerValidate } = useFormItem()

// 全局配置
const { globalSize } = useConfig()

const autocompleteSize = computed(() => props.size || formItem?.size || form?.size || globalSize.value || 'default')
const autocompleteDisabled = computed(() => props.disabled || form?.disabled || false)

// 元素引用
const inputRef = ref<HTMLInputElement>()
const wrapperRef = ref<HTMLElement>()
const dropdownRef = ref<HTMLElement>()
const listRef = ref<HTMLElement>()

// 内部状态
const focused = ref(false)
const hovering = ref(false)
const visible = ref(false)
const loading = ref(false)
const suggestions = ref<AutocompleteSuggestion[]>([])
const highlightedIndex = ref(-1)
const isClickingDropdown = ref(false)
const dropdownZIndex = ref(nextZIndex())

// 下拉框位置
const dropdownStyle = ref<Record<string, string>>({})

let debounceTimer: ReturnType<typeof setTimeout> | null = null

// 计算属性
const showClear = computed(() =>
  props.clearable &&
  !autocompleteDisabled.value &&
  !!props.modelValue &&
  (focused.value || hovering.value)
)

const hasPrefix = computed(() => !!slots.prefix || !!props.prefixIcon)
const hasSuffix = computed(() => !!slots.suffix || !!props.suffixIcon || showClear.value)
const hasPrepend = computed(() => !!slots.prepend)
const hasAppend = computed(() => !!slots.append)

// 类名计算
const wrapperClasses = computed(() => [
  ns.b(),
  ns.m(autocompleteSize.value),
  ns.is('disabled', autocompleteDisabled.value),
  ns.is('focused', focused.value),
  {
    [ns.b('group')]: hasPrepend.value || hasAppend.value,
    [ns.bem('group', '', 'prepend')]: hasPrepend.value,
    [ns.bem('group', '', 'append')]: hasAppend.value
  }
])

// 更新下拉框位置
const updateDropdownPosition = () => {
  if (!wrapperRef.value || !props.teleported) return

  const rect = wrapperRef.value.getBoundingClientRect()

  // 提取主题变量
  const styles = window.getComputedStyle(wrapperRef.value)
  const primary = styles.getPropertyValue('--yh-color-primary').trim()
  const primaryRgb = styles.getPropertyValue('--yh-color-primary-rgb').trim()

  const style: Record<string, string> = {
    ...themeStyle.value as any,
    position: 'fixed',
    zIndex: String(dropdownZIndex.value),
    minWidth: props.fitInputWidth ? `${rect.width}px` : 'auto',
    '--yh-color-primary': primary,
    '--yh-color-primary-rgb': primaryRgb
  }

  if (props.placement.startsWith('top')) {
    style.bottom = `${window.innerHeight - rect.top + 4}px`
  } else {
    style.top = `${rect.bottom + 4}px`
  }

  if (props.placement.endsWith('start')) {
    style.left = `${rect.left}px`
  } else if (props.placement.endsWith('end')) {
    style.right = `${window.innerWidth - rect.right}px`
  } else {
    style.left = `${rect.left}px`
  }

  dropdownStyle.value = style
}

// 监听建议列表显示状态
watch(visible, (val: boolean) => {
  if (val) {
    dropdownZIndex.value = nextZIndex()
    if (props.teleported) {
      nextTick(updateDropdownPosition)
    }
  }
})

// 监听窗口事件
const handleResize = () => {
  if (visible.value) {
    updateDropdownPosition()
  }
}

const handleScroll = () => {
  if (visible.value) {
    updateDropdownPosition()
  }
}

// 全局点击关闭建议
const handleOutsideClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (wrapperRef.value?.contains(target) || dropdownRef.value?.contains(target)) {
    return
  }
  visible.value = false
}

onMounted(() => {
  if (props.teleported) {
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, true)
  }
  window.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  if (props.teleported) {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', handleScroll, true)
  }
  window.removeEventListener('click', handleOutsideClick)
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})

// 获取建议
const fetchSuggestions = (query: string) => {
  if (!props.fetchSuggestions) {
    suggestions.value = []
    return
  }

  loading.value = true
  // 加载中时显示下拉框
  if (focused.value) {
    visible.value = true
  }

  props.fetchSuggestions(query, (results) => {
    loading.value = false
    suggestions.value = results || []
    if (props.highlightFirstItem && suggestions.value.length > 0) {
      highlightedIndex.value = 0
    } else {
      highlightedIndex.value = -1
    }

    // 如果当前输入框仍有焦点，保持下拉框显示（包括无数据情况）
    if (focused.value) {
      visible.value = true
    }
  })
}

// 防抖获取建议
const debouncedFetch = (query: string) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = setTimeout(() => {
    fetchSuggestions(query)
  }, props.debounce)
}

// 事件处理
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value

  emit('update:modelValue', value)
  emit('input', value)

  if (value) {
    debouncedFetch(value)
  } else {
    suggestions.value = []
    visible.value = false
  }
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)

  if (props.triggerOnFocus) {
    fetchSuggestions(props.modelValue || '')
  }
}

const handleBlur = (event: FocusEvent) => {
  // 延迟处理失焦，以免点击建议项时列表先关闭
  setTimeout(() => {
    if (!isClickingDropdown.value) {
      focused.value = false
      visible.value = false
      emit('blur', event)
      if (props.validateEvent) {
        triggerValidate('blur')
      }
    }
  }, 150)
}

const handleMouseEnter = () => {
  hovering.value = true
}

const handleMouseLeave = () => {
  hovering.value = false
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  suggestions.value = []
  visible.value = false
  nextTick(() => {
    focus()
  })
}

const handleSelect = (item: AutocompleteSuggestion) => {
  const value = String(item[props.valueKey] || item.value)
  emit('update:modelValue', value)
  emit('select', item)
  emit('change', value)
  visible.value = false
  highlightedIndex.value = -1
  if (props.validateEvent) {
    triggerValidate('change')
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (autocompleteDisabled.value) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!visible.value) {
        if (props.triggerOnFocus || props.modelValue) {
          visible.value = true
          fetchSuggestions(props.modelValue || '')
        }
      } else {
        highlightedIndex.value = (highlightedIndex.value + 1) % suggestions.value.length
        scrollToHighlighted()
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (visible.value) {
        highlightedIndex.value = (highlightedIndex.value - 1 + suggestions.value.length) % suggestions.value.length
        scrollToHighlighted()
      }
      break
    case 'Enter':
      if (visible.value && highlightedIndex.value >= 0) {
        event.preventDefault()
        handleSelect(suggestions.value[highlightedIndex.value])
      }
      break
    case 'Escape':
      if (visible.value) {
        event.preventDefault()
        visible.value = false
      }
      break
    case 'Tab':
      visible.value = false
      break
  }
}

const scrollToHighlighted = () => {
  nextTick(() => {
    if (listRef.value && highlightedIndex.value >= 0) {
      const items = listRef.value.querySelectorAll(`.${ns.e('suggestion')}`)
      const item = items[highlightedIndex.value] as HTMLElement
      if (item) {
        const list = listRef.value
        const scrollTop = list.scrollTop
        const offsetTop = item.offsetTop
        const height = list.offsetHeight
        const itemHeight = item.offsetHeight

        if (offsetTop < scrollTop) {
          list.scrollTop = offsetTop
        } else if (offsetTop + itemHeight > scrollTop + height) {
          list.scrollTop = offsetTop + itemHeight - height
        }
      }
    }
  })
}

// 暴露的方法
const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

const close = () => {
  visible.value = false
}

const highlight = (index: number) => {
  highlightedIndex.value = Math.max(0, Math.min(index, suggestions.value.length - 1))
}

defineExpose<AutocompleteExpose>({
  focus,
  blur,
  close,
  highlight,
  inputRef: inputRef.value
})
</script>

<template>
  <div ref="wrapperRef" :class="wrapperClasses" :style="themeStyle" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <!-- 前置元素 -->
    <div v-if="hasPrepend" :class="ns.e('prepend')">
      <slot name="prepend" />
    </div>

    <!-- 输入框包装器 -->
    <div :class="ns.e('wrapper')">
      <!-- 前置图标 -->
      <span v-if="hasPrefix" :class="ns.e('prefix')">
        <slot name="prefix">
          <component v-if="prefixIcon && typeof prefixIcon !== 'string'" :is="prefixIcon" :class="ns.e('icon')" />
          <span v-else-if="prefixIcon" :class="ns.e('icon')">{{ prefixIcon }}</span>
        </slot>
      </span>

      <!-- 输入框 -->
      <input ref="inputRef" :id="inputId" :class="ns.e('inner')" :value="modelValue"
        :placeholder="placeholder || t('autocomplete.placeholder')" :disabled="autocompleteDisabled" :name="name"
        :autocomplete="autocomplete" :autofocus="autofocus" role="combobox" :aria-expanded="visible"
        :aria-autocomplete="'list'" :aria-controls="`${inputId}-listbox`"
        :aria-activedescendant="highlightedIndex >= 0 ? `${inputId}-option-${highlightedIndex}` : undefined"
        @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur" @keydown="handleKeydown" />

      <!-- 后置图标 -->
      <span v-if="hasSuffix" :class="ns.e('suffix')">
        <!-- 清空按钮 -->
        <span v-if="showClear" :class="[ns.e('icon'), ns.e('clear')]" @mousedown.prevent @click.stop="handleClear">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
            <path fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" />
          </svg>
        </span>

        <!-- 后置图标插槽 -->
        <slot name="suffix">
          <component v-if="suffixIcon && typeof suffixIcon !== 'string'" :is="suffixIcon" :class="ns.e('icon')" />
          <span v-else-if="suffixIcon" :class="ns.e('icon')">{{ suffixIcon }}</span>
        </slot>
      </span>
    </div>

    <!-- 后置元素 -->
    <div v-if="hasAppend" :class="ns.e('append')">
      <slot name="append" />
    </div>

    <!-- 下拉建议列表 -->
    <Teleport to="body" :disabled="!teleported">
      <Transition :name="ns.b('dropdown')">
        <div v-show="visible && (suggestions.length > 0 || loading || slots.empty)" ref="dropdownRef"
          :class="[ns.e('dropdown'), popperClass]" :style="teleported ? dropdownStyle : {}"
          @mousedown="isClickingDropdown = true" @mouseup="isClickingDropdown = false">
          <!-- 加载状态 -->
          <div v-if="loading" :class="ns.e('loading')">
            <slot name="loading">
              <svg :class="ns.e('loading-icon')" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                  d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z" />
              </svg>
              <span>{{ t('autocomplete.loading') }}</span>
            </slot>
          </div>

          <!-- 建议列表 -->
          <ul v-else-if="suggestions.length > 0" ref="listRef" :id="`${inputId}-listbox`" :class="ns.e('suggestions')"
            role="listbox">
            <li v-for="(item, index) in suggestions" :key="index" :id="`${inputId}-option-${index}`" :class="[
              ns.e('suggestion'),
              ns.is('highlighted', highlightedIndex === index)
            ]" role="option" :aria-selected="highlightedIndex === index" @mousedown.prevent @click="handleSelect(item)"
              @mouseenter="highlightedIndex = index">
              <slot :item="item">
                {{ item[valueKey] || item.value }}
              </slot>
            </li>
          </ul>

          <!-- 无数据 -->
          <div v-else-if="slots.empty" :class="ns.e('empty')">
            <slot name="empty" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use './autocomplete.scss';
</style>
