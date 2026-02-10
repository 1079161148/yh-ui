<script setup lang="ts">
/**
 * YhInputTag - 标签输入框组件
 * @description 用于输入和管理多个标签，支持折叠、拖拽等功能
 */
import { computed, ref, useSlots, nextTick, inject } from 'vue'
import { useNamespace, useFormItem, useLocale } from '@yh-ui/hooks'
import { useConfig } from '../../hooks/use-config'
import type { InputTagProps, InputTagEmits, InputTagExpose } from './input-tag'

defineOptions({
  name: 'YhInputTag'
})

const props = withDefaults(defineProps<InputTagProps>(), {
  modelValue: () => [],
  type: 'info',
  size: 'default',
  disabled: false,
  readonly: false,
  separator: () => [',', 'Enter'],
  placeholder: '',
  clearable: false,
  addOnBlur: true,
  closable: true,
  trim: true,
  allowDuplicate: false,
  collapseTags: false,
  collapseTagsTooltip: false,
  maxCollapseTags: 1,
  draggable: false,
  tagEffect: 'light',
  validateEvent: true
})

const emit = defineEmits<InputTagEmits>()
const slots = useSlots()

// 命名空间
const ns = useNamespace('input-tag')
const { t } = useLocale()

// 全局配置
const { globalSize } = useConfig()

// 元素引用
const inputRef = ref<HTMLInputElement>()
const wrapperRef = ref<HTMLDivElement>()

// 表单集成
const { validate: triggerValidate } = useFormItem()

// 内部状态
const inputValue = ref('')

const focused = ref(false)
const hovering = ref(false)
const showTooltip = ref(false)
const dragIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

// 标签数组
const tags = computed(() => props.modelValue || [])

// 显示的标签（折叠模式）
const displayTags = computed(() => {
  if (!props.collapseTags) {
    return tags.value
  }
  return tags.value.slice(0, props.maxCollapseTags)
})

// 折叠的标签
const collapsedTags = computed(() => {
  if (!props.collapseTags) {
    return []
  }
  return tags.value.slice(props.maxCollapseTags)
})

// 折叠标签数量
const collapsedCount = computed(() => collapsedTags.value.length)

// 是否达到最大数量
const isMaxReached = computed(() => {
  return props.max !== undefined && tags.value.length >= props.max
})

// 是否显示清空按钮
const showClear = computed(() => {
  return (
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    tags.value.length > 0 &&
    (focused.value || hovering.value)
  )
})

// 是否有前缀
const hasPrefix = computed(() => {
  return !!props.prefix || !!props.prefixIcon || !!slots.prefix
})

// 是否有后缀
const hasSuffix = computed(() => {
  return !!props.suffix || !!props.suffixIcon || !!slots.suffix || showClear.value
})

// 分隔符数组
const separators = computed(() => {
  if (Array.isArray(props.separator)) {
    return props.separator
  }
  return [props.separator]
})

// 类名计算
const inputTagClasses = computed(() => [
  ns.b(),
  ns.m(props.size || globalSize.value || 'default'),
  ns.is('disabled', props.disabled),
  ns.is('focused', focused.value),
  ns.is('has-prefix', hasPrefix.value),
  ns.is('has-suffix', hasSuffix.value)
])

// 标签类名
const getTagClasses = (index: number) => [
  ns.e('tag'),
  `is-${props.type}`,
  `is-${props.tagEffect}`,
  {
    'is-dragging': dragIndex.value === index,
    'is-drag-over': dragOverIndex.value === index
  }
]

// 添加标签
const addTag = (value: string) => {
  let tagValue = value

  // 去除首尾空格
  if (props.trim) {
    tagValue = tagValue.trim()
  }

  // 空值不添加
  if (!tagValue) {
    return false
  }

  // 检查是否达到最大数量
  if (isMaxReached.value) {
    return false
  }

  // 检查是否允许重复
  if (!props.allowDuplicate && tags.value.includes(tagValue)) {
    return false
  }

  // 自定义验证
  if (props.validateTag && !props.validateTag(tagValue)) {
    return false
  }

  const newTags = [...tags.value, tagValue]
  emit('update:modelValue', newTags)
  emit('change', newTags)
  emit('add', tagValue)

  if (props.validateEvent) {
    triggerValidate('change')
  }


  return true
}

// 移除标签
const removeTag = (index: number) => {
  if (props.disabled || props.readonly) {
    return
  }

  const removedTag = tags.value[index]
  const newTags = tags.value.filter((_, i) => i !== index)
  emit('update:modelValue', newTags)
  emit('change', newTags)
  emit('remove', removedTag, index)

  if (props.validateEvent) {
    triggerValidate('change')
  }
}

// 清空所有标签
const clearTags = () => {
  if (props.disabled || props.readonly) {
    return
  }

  emit('update:modelValue', [])
  emit('change', [])
  emit('clear')
  inputValue.value = ''
}

// 输入处理
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
  emit('input', target.value)
}

// 键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled || props.readonly) {
    return
  }

  const value = inputValue.value

  // 检查分隔符
  if (separators.value.includes(event.key)) {
    event.preventDefault()
    if (addTag(value)) {
      inputValue.value = ''
    }
    return
  }

  // 退格键删除最后一个标签
  if (event.key === 'Backspace' && !value && tags.value.length > 0) {
    removeTag(tags.value.length - 1)
  }
}

// 聚焦处理
const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)
}

// 失焦处理
const handleBlur = (event: FocusEvent) => {
  focused.value = false

  // 失焦时添加标签
  if (props.addOnBlur && inputValue.value) {
    if (addTag(inputValue.value)) {
      inputValue.value = ''
    }
  }

  emit('blur', event)

  if (props.validateEvent) {
    triggerValidate('blur')
  }
}

// 点击包装器聚焦输入框
const handleWrapperClick = () => {
  if (!props.disabled && !props.readonly) {
    inputRef.value?.focus()
  }
}

// 鼠标事件
const handleMouseenter = () => {
  hovering.value = true
}

const handleMouseleave = () => {
  hovering.value = false
}

// 折叠标签 tooltip
const handleCollapseMouseenter = () => {
  if (props.collapseTagsTooltip && collapsedCount.value > 0) {
    showTooltip.value = true
  }
}

const handleCollapseMouseleave = () => {
  showTooltip.value = false
}

// 拖拽功能
const handleDragStart = (event: DragEvent, index: number) => {
  if (!props.draggable || props.disabled || props.readonly) {
    event.preventDefault()
    return
  }

  dragIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(index))
  }
}

const handleDragOver = (event: DragEvent, index: number) => {
  if (!props.draggable) return

  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
  dragOverIndex.value = index
}

const handleDragLeave = () => {
  dragOverIndex.value = null
}

const handleDrop = (event: DragEvent, targetIndex: number) => {
  if (!props.draggable) return

  event.preventDefault()

  const sourceIndex = dragIndex.value
  if (sourceIndex === null || sourceIndex === targetIndex) {
    dragIndex.value = null
    dragOverIndex.value = null
    return
  }

  const newTags = [...tags.value]
  const [removed] = newTags.splice(sourceIndex, 1)
  newTags.splice(targetIndex, 0, removed)

  emit('update:modelValue', newTags)
  emit('change', newTags)
  emit('drag-end', newTags)

  dragIndex.value = null
  dragOverIndex.value = null
}

const handleDragEnd = () => {
  dragIndex.value = null
  dragOverIndex.value = null
}

// 暴露的方法
const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

const clear = () => {
  clearTags()
}

defineExpose<InputTagExpose>({
  focus,
  blur,
  clear
})
</script>

<template>
  <div ref="wrapperRef" :class="inputTagClasses" @click="handleWrapperClick" @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave">
    <!-- 前缀 -->
    <span v-if="hasPrefix" :class="ns.e('prefix')">
      <slot name="prefix">
        <span v-if="prefix" :class="ns.e('prefix-text')">{{ prefix }}</span>
        <component v-if="prefixIcon && typeof prefixIcon !== 'string'" :is="prefixIcon" />
      </slot>
    </span>

    <!-- 标签区域 -->
    <div :class="ns.e('wrapper')">
      <!-- 已有标签 -->
      <template v-for="(tag, index) in displayTags" :key="index">
        <slot name="tag" :tag="tag" :index="index" :close="() => removeTag(index)">
          <span :class="getTagClasses(index)" :draggable="draggable && !disabled && !readonly"
            @dragstart="handleDragStart($event, index)" @dragover="handleDragOver($event, index)"
            @dragleave="handleDragLeave" @drop="handleDrop($event, index)" @dragend="handleDragEnd">
            <span :class="ns.e('tag-content')">{{ tag }}</span>
            <span v-if="closable && !disabled && !readonly" :class="ns.e('tag-close')" @click.stop="removeTag(index)">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
                <path fill="currentColor"
                  d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z" />
              </svg>
            </span>
          </span>
        </slot>
      </template>

      <!-- 折叠标签 -->
      <span v-if="collapseTags && collapsedCount > 0" :class="[ns.e('collapsed'), `is-${type}`, `is-${tagEffect}`]"
        @mouseenter="handleCollapseMouseenter" @mouseleave="handleCollapseMouseleave">
        <slot name="collapseTag" :count="collapsedCount" :tags="collapsedTags">
          + {{ collapsedCount }}
        </slot>

        <!-- Tooltip -->
        <transition name="yh-fade">
          <div v-if="showTooltip && collapseTagsTooltip" :class="ns.e('tooltip')">
            <span v-for="(tag, index) in collapsedTags" :key="index"
              :class="[ns.e('tooltip-tag'), `is-${type}`, `is-${tagEffect}`]">
              {{ tag }}
            </span>
          </div>
        </transition>
      </span>

      <!-- 输入框 -->
      <input ref="inputRef" type="text" :class="ns.e('inner')" :value="inputValue"
        :placeholder="tags.length === 0 ? (placeholder || t('inputtag.placeholder')) : ''" :disabled="disabled"
        :readonly="readonly || isMaxReached" @input="handleInput" @keydown="handleKeydown" @focus="handleFocus"
        @blur="handleBlur" />
    </div>

    <!-- 后缀/清空按钮 -->
    <span v-if="hasSuffix" :class="ns.e('suffix')">
      <!-- 清空按钮 -->
      <span v-if="showClear" :class="ns.e('clear')" @click.stop="clearTags">
        <slot name="clearIcon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
            <path fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm-160-448l128 128-128 128 45.248 45.248L525.248 621.248l128 128L698.496 704l-128-128 128-128L653.248 402.752 525.248 530.752l-128-128z" />
          </svg>
        </slot>
      </span>
      <slot name="suffix">
        <span v-if="suffix" :class="ns.e('suffix-text')">{{ suffix }}</span>
        <component v-if="suffixIcon && typeof suffixIcon !== 'string'" :is="suffixIcon" />
      </slot>
    </span>
  </div>
</template>

<style lang="scss">
@use './input-tag.scss';
</style>
