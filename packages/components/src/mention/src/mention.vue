<script setup lang="ts">
/**
 * YhMention - 提及组件
 * @description 在输入中通过触发符号（@、#等）选择提及对象，支持 input/textarea 双模式
 */
import {
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
  useSlots
} from 'vue'
import { useNamespace, useFormItem, useId, useZIndex, useLocale, useConfig } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { MentionProps, MentionEmits, MentionExpose, MentionOption } from './mention'

defineOptions({ name: 'YhMention' })

const props = withDefaults(defineProps<MentionProps>(), {
  modelValue: '',
  options: () => [],
  triggers: () => ['@'],
  type: 'input',
  placement: 'bottom',
  disabled: false,
  readonly: false,
  size: undefined,
  clearable: false,
  showWordLimit: false,
  maxCount: 8,
  filterOption: undefined,
  loading: false,
  loadingText: undefined,
  noDataText: undefined,
  teleported: true,
  popperClass: '',
  split: ' ',
  wholeWord: false,
  autofocus: false,
  rows: 3,
  debounce: 100,
  validateEvent: true
})

const emit = defineEmits<MentionEmits>()
const slots = useSlots()
const ns = useNamespace('mention')
const inputId = useId()
const { t } = useLocale()
const { nextZIndex } = useZIndex()
const { themeStyle } = useComponentTheme('mention', computed(() => props.themeOverrides))
const { form, formItem, validate: triggerValidate } = useFormItem()
const { globalSize } = useConfig()

// ─── 计算尺寸 / 禁用 ──────────────────────────────────────────────────────────
const mentionSize = computed(
  () => props.size || formItem?.size || form?.size || globalSize.value || 'default'
)
const mentionDisabled = computed(() => props.disabled || form?.disabled || false)

// ─── 元素引用 ────────────────────────────────────────────────────────────────
const inputRef = ref<HTMLInputElement | HTMLTextAreaElement>()
const wrapperRef = ref<HTMLElement>()
const dropdownRef = ref<HTMLElement>()

// ─── 状态 ────────────────────────────────────────────────────────────────────
const focused = ref(false)
const hovering = ref(false)
const dropdownVisible = ref(false)
const isClickingDropdown = ref(false)
const highlightedIndex = ref(-1)
const dropdownZIndex = ref(nextZIndex())

/** 当前触发位置信息 */
const triggerPos = ref<{ index: number; trigger: string; keyword: string } | null>(null)

/** 过滤后的选项 */
const filteredOptions = computed(() => {
  const keyword = triggerPos.value?.keyword ?? ''
  return props.options.filter((opt) => {
    if (props.filterOption === false) return true
    if (typeof props.filterOption === 'function') {
      return props.filterOption(keyword, opt)
    }
    // 默认：label 或 value 包含 keyword（忽略大小写）
    const text = (opt.label ?? opt.value).toLowerCase()
    return text.includes(keyword.toLowerCase())
  })
})

/** 按分组整理 */
const groupedOptions = computed(() => {
  const map = new Map<string, MentionOption[]>()
  for (const opt of filteredOptions.value) {
    const g = opt.group ?? ''
    if (!map.has(g)) map.set(g, [])
    map.get(g)!.push(opt)
  }
  return map
})

// ─── 样式类名 ────────────────────────────────────────────────────────────────
const wrapperClasses = computed(() => [
  ns.b(),
  ns.m(mentionSize.value),
  ns.is('disabled', mentionDisabled.value),
  ns.is('focused', focused.value),
  ns.is('textarea', props.type === 'textarea'),
  !!slots.prefix || !!props.prefixIcon ? ns.is('prefix', true) : '',
  !!slots.suffix || !!props.suffixIcon || props.clearable ? ns.is('suffix', true) : ''
])

// ─── 下拉框位置 ──────────────────────────────────────────────────────────────
const dropdownStyle = ref<Record<string, string>>({})

const updateDropdownPosition = () => {
  if (!wrapperRef.value || !props.teleported) return
  const rect = wrapperRef.value.getBoundingClientRect()
  const style: Record<string, string> = {
    position: 'fixed',
    zIndex: String(dropdownZIndex.value),
    minWidth: `${rect.width}px`
  }

  if (props.placement === 'top') {
    style.bottom = `${window.innerHeight - rect.top + 4}px`
    style.left = `${rect.left}px`
  } else {
    style.top = `${rect.bottom + 4}px`
    style.left = `${rect.left}px`
  }
  dropdownStyle.value = style
}

watch(dropdownVisible, (val) => {
  if (val) {
    dropdownZIndex.value = nextZIndex()
    nextTick(updateDropdownPosition)
    emit('open')
  } else {
    emit('close')
  }
})

// ─── 触发解析 ────────────────────────────────────────────────────────────────

/**
 * 从光标位置向前扫描，判断是否处于 mention 触发态
 */
const parseTrigger = (value: string, cursorIndex: number) => {
  for (const trigger of props.triggers) {
    // 从光标往前找最近的触发符
    const segment = value.substring(0, cursorIndex)
    const lastIdx = segment.lastIndexOf(trigger)
    if (lastIdx === -1) continue

    // 触发符之后的文字不含空格（含空格则说明 mention 已结束）
    const after = segment.substring(lastIdx + trigger.length)
    if (/\s/.test(after)) continue

    // 触发符前面必须是字符串开头、换行或空格
    const before = segment[lastIdx - 1]
    if (before !== undefined && !/[\s\n]/.test(before)) continue

    return {
      index: lastIdx,
      trigger,
      keyword: after
    }
  }
  return null
}

// ─── 防抖 ────────────────────────────────────────────────────────────────────
let debounceTimer: ReturnType<typeof setTimeout> | null = null

const debouncedSearch = (keyword: string, trigger: string) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search', keyword, trigger)
  }, props.debounce)
}

// ─── 事件处理：输入 ──────────────────────────────────────────────────────────
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  const value = target.value
  // Happy-DOM / JSDOM 中 selectionStart 可能为 null 或 0（尚未更新）
  // 当选择位置为 0 且字符串非空时，以 value.length 作为光标位置
  const rawCursor = target.selectionStart
  const cursor = rawCursor === null || (rawCursor === 0 && value.length > 0)
    ? value.length
    : rawCursor

  emit('update:modelValue', value)
  emit('input', value)

  const hit = parseTrigger(value, cursor)
  if (hit) {
    triggerPos.value = hit
    dropdownVisible.value = true
    highlightedIndex.value = 0
    debouncedSearch(hit.keyword, hit.trigger)
  } else {
    dropdownVisible.value = false
    triggerPos.value = null
  }
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  emit('change', target.value)
  if (props.validateEvent) triggerValidate('change')
}

const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  setTimeout(() => {
    if (!isClickingDropdown.value) {
      focused.value = false
      dropdownVisible.value = false
      triggerPos.value = null
      emit('blur', event)
      if (props.validateEvent) triggerValidate('blur')
    }
  }, 150)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
  if (!dropdownVisible.value) return

  const total = filteredOptions.value.length
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      highlightedIndex.value = (highlightedIndex.value + 1) % total
      break
    case 'ArrowUp':
      event.preventDefault()
      highlightedIndex.value = (highlightedIndex.value - 1 + total) % total
      break
    case 'Enter':
      event.preventDefault()
      if (highlightedIndex.value >= 0 && filteredOptions.value[highlightedIndex.value]) {
        selectOption(filteredOptions.value[highlightedIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      dropdownVisible.value = false
      triggerPos.value = null
      break
    case 'Tab':
      if (highlightedIndex.value >= 0 && filteredOptions.value[highlightedIndex.value]) {
        event.preventDefault()
        selectOption(filteredOptions.value[highlightedIndex.value])
      } else {
        dropdownVisible.value = false
      }
      break
  }
}

// ─── 选中选项 ────────────────────────────────────────────────────────────────
const selectOption = (option: MentionOption) => {
  if (option.disabled || !triggerPos.value) return

  const { index, trigger } = triggerPos.value
  const before = (props.modelValue ?? '').substring(0, index)
  const after = (() => {
    const cursor = inputRef.value?.selectionStart ?? (props.modelValue ?? '').length
    return (props.modelValue ?? '').substring(cursor)
  })()

  const label = option.label ?? option.value
  const insertText = props.wholeWord
    ? `${trigger}${label}${props.split}`
    : `${trigger}${label}${props.split}`

  const newValue = before + insertText + after
  emit('update:modelValue', newValue)
  emit('select', option, trigger)

  dropdownVisible.value = false
  triggerPos.value = null

  // 光标移到插入文字末尾
  nextTick(() => {
    const el = inputRef.value
    if (!el) return
    const pos = before.length + insertText.length
    el.setSelectionRange(pos, pos)
    el.focus()
  })

  if (props.validateEvent) triggerValidate('change')
}

// ─── 清空 ────────────────────────────────────────────────────────────────────
const showClear = computed(
  () =>
    props.clearable &&
    !mentionDisabled.value &&
    !props.readonly &&
    !!props.modelValue &&
    (focused.value || hovering.value)
)

const handleClear = () => {
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  dropdownVisible.value = false
  triggerPos.value = null
  nextTick(() => focus())
}

// ─── 全局点击关闭 ────────────────────────────────────────────────────────────
const handleOutsideClick = (e: MouseEvent) => {
  const target = e.target as Node
  if (wrapperRef.value?.contains(target) || dropdownRef.value?.contains(target)) return
  dropdownVisible.value = false
  triggerPos.value = null
}

const handleResize = () => {
  if (dropdownVisible.value) updateDropdownPosition()
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('click', handleOutsideClick)
    window.addEventListener('resize', handleResize)
    if (props.teleported) {
      window.addEventListener('scroll', handleResize, true)
    }
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('click', handleOutsideClick)
    window.removeEventListener('resize', handleResize)
    if (props.teleported) {
      window.removeEventListener('scroll', handleResize, true)
    }
  }
  if (debounceTimer) clearTimeout(debounceTimer)
})

// ─── 编程式插入 ──────────────────────────────────────────────────────────────
const insertMention = (option: MentionOption, trigger?: string) => {
  const t = trigger ?? props.triggers[0] ?? '@'
  const label = option.label ?? option.value
  const insertText = `${t}${label}${props.split}`
  const current = props.modelValue ?? ''
  const cursor = inputRef.value?.selectionStart ?? current.length
  const newValue = current.substring(0, cursor) + insertText + current.substring(cursor)
  emit('update:modelValue', newValue)
}

// ─── expose ──────────────────────────────────────────────────────────────────
const focus = () => inputRef.value?.focus()
const blur = () => inputRef.value?.blur()
const clear = () => handleClear()

defineExpose<MentionExpose>({
  ref: inputRef.value,
  wrapperRef: wrapperRef.value,
  focus,
  blur,
  clear,
  insertMention
})

// ─── 字数统计 ─────────────────────────────────────────────────────────────────
const textLength = computed(() => (props.modelValue ?? '').length)
</script>

<template>
  <div ref="wrapperRef" :class="wrapperClasses" :style="themeStyle" @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <!-- 前缀 -->
    <span v-if="slots.prefix || prefixIcon" :class="ns.e('prefix')">
      <slot name="prefix">
        <component v-if="prefixIcon && typeof prefixIcon !== 'string'" :is="prefixIcon" :class="ns.e('icon')" />
        <span v-else-if="prefixIcon" :class="ns.e('icon')">{{ prefixIcon }}</span>
      </slot>
    </span>

    <!-- 输入框 -->
    <textarea v-if="type === 'textarea'" :id="inputId" ref="inputRef" :class="ns.e('inner')" :value="modelValue"
      :placeholder="placeholder || t('mention.placeholder')" :disabled="mentionDisabled" :readonly="readonly"
      :maxlength="maxlength" :rows="rows" :autofocus="autofocus" role="combobox" :aria-expanded="dropdownVisible"
      :aria-autocomplete="'list'" :aria-controls="`${inputId}-listbox`" :aria-activedescendant="highlightedIndex >= 0 ? `${inputId}-option-${highlightedIndex}` : undefined
        " @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur"
      @keydown="handleKeydown" />
    <input v-else :id="inputId" ref="inputRef" :class="ns.e('inner')" type="text" :value="modelValue"
      :placeholder="placeholder || t('mention.placeholder')" :disabled="mentionDisabled" :readonly="readonly"
      :maxlength="maxlength" :autofocus="autofocus" role="combobox" :aria-expanded="dropdownVisible"
      :aria-autocomplete="'list'" :aria-controls="`${inputId}-listbox`" :aria-activedescendant="highlightedIndex >= 0 ? `${inputId}-option-${highlightedIndex}` : undefined
        " @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur"
      @keydown="handleKeydown" />

    <!-- 后缀 / 清空 -->
    <span v-if="slots.suffix || suffixIcon || showClear || showWordLimit" :class="ns.e('suffix')">
      <!-- 清空按钮 -->
      <span v-if="showClear" :class="[ns.e('icon'), ns.e('clear')]" @mousedown.prevent @click.stop="handleClear"
        aria-label="Clear">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
          <path fill="currentColor"
            d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" />
        </svg>
      </span>
      <!-- 字数统计 -->
      <span v-if="showWordLimit && maxlength" :class="ns.e('count')">
        {{ textLength }} / {{ maxlength }}
      </span>
      <!-- 自定义后缀 -->
      <slot name="suffix">
        <component v-if="suffixIcon && typeof suffixIcon !== 'string'" :is="suffixIcon" :class="ns.e('icon')" />
        <span v-else-if="suffixIcon" :class="ns.e('icon')">{{ suffixIcon }}</span>
      </slot>
    </span>

    <!-- 下拉面板 -->
    <Teleport to="body" :disabled="!teleported">
      <Transition :name="ns.b('dropdown')">
        <div v-show="dropdownVisible" ref="dropdownRef" :id="`${inputId}-listbox`"
          :class="[ns.e('dropdown'), popperClass]"
          :style="teleported ? { ...themeStyle, ...dropdownStyle } : themeStyle" role="listbox"
          @mousedown="isClickingDropdown = true" @mouseup="isClickingDropdown = false">
          <!-- 加载中 -->
          <div v-if="loading" :class="ns.e('loading')">
            <slot name="loading">
              <svg :class="ns.e('loading-icon')" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                  d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32z" />
              </svg>
              <span>{{ loadingText || t('mention.loading') }}</span>
            </slot>
          </div>

          <!-- 无数据 -->
          <div v-else-if="!loading && filteredOptions.length === 0" :class="ns.e('empty')">
            <slot name="empty">
              <span>{{ noDataText || t('mention.noData') }}</span>
            </slot>
          </div>

          <!-- 选项列表（分组支持） -->
          <template v-else>
            <template v-for="[group, groupOpts] in groupedOptions" :key="group">
              <!-- 分组标题 -->
              <div v-if="group" :class="ns.e('group-label')">{{ group }}</div>
              <!-- 选项条目 -->
              <div v-for="(option, idx) in groupOpts" :key="option.value"
                :id="`${inputId}-option-${filteredOptions.indexOf(option)}`" :class="[
                  ns.e('option'),
                  ns.is('highlighted', filteredOptions.indexOf(option) === highlightedIndex),
                  ns.is('disabled', !!option.disabled)
                ]" role="option" :aria-selected="filteredOptions.indexOf(option) === highlightedIndex"
                :aria-disabled="option.disabled" @mousedown.prevent @click="selectOption(option)"
                @mouseenter="highlightedIndex = filteredOptions.indexOf(option)">
                <slot name="option" :option="option" :keyword="triggerPos?.keyword ?? ''">
                  <!-- 头像 -->
                  <img v-if="option.avatar" :src="option.avatar" :class="ns.e('option-avatar')"
                    :alt="option.label ?? option.value" />
                  <div :class="ns.e('option-content')">
                    <span :class="ns.e('option-label')">{{ option.label ?? option.value }}</span>
                    <span v-if="option.description" :class="ns.e('option-desc')">{{ option.description }}</span>
                  </div>
                </slot>
              </div>
            </template>
          </template>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use './mention.scss';
</style>
