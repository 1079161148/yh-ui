<script setup lang="ts">
/**
 * YhTag - 标签组件
 * @description 用于标记和选择，支持动态编辑、选中状态、图标配置
 */
import { computed, ref, nextTick, useSlots } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import type { TagProps, TagEmits } from './tag'

defineOptions({
  name: 'YhTag'
})

const props = withDefaults(defineProps<TagProps>(), {
  type: 'primary',
  size: 'default',
  effect: 'light',
  closable: false,
  disableTransitions: false,
  hit: false,
  round: false,
  checkable: false,
  checked: false,
  editable: false
})

const emit = defineEmits<TagEmits>()
const slots = useSlots()

// 命名空间
const ns = useNamespace('tag')

// 编辑状态
const isEditing = ref(false)
const editValue = ref('')
const inputRef = ref<HTMLInputElement>()

// 是否有左侧图标
const hasIcon = computed(() => !!props.icon || !!slots.icon)

// 是否有右侧图标
const hasSuffixIcon = computed(() => !!props.suffixIcon || !!slots.suffixIcon)

// 类名计算
const tagClasses = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(props.size),
  ns.m(props.effect),
  ns.is('closable', props.closable),
  ns.is('hit', props.hit),
  ns.is('round', props.round),
  ns.is('checkable', props.checkable),
  ns.is('checked', props.checkable && props.checked),
  ns.is('editable', props.editable),
  ns.is('has-icon', hasIcon.value),
  ns.is('has-suffix-icon', hasSuffixIcon.value)
])

// 自定义颜色样式
const tagStyle = computed(() => {
  if (!props.color) return {}

  const style: Record<string, string> = {}

  if (props.effect === 'dark') {
    style['--yh-tag-bg-color'] = props.color
    style['--yh-tag-border-color'] = props.color
    style['--yh-tag-text-color'] = '#fff'
  } else if (props.effect === 'light') {
    style['--yh-tag-bg-color'] = `${props.color}20`
    style['--yh-tag-border-color'] = `${props.color}40`
    style['--yh-tag-text-color'] = props.color
  } else {
    style['--yh-tag-bg-color'] = 'transparent'
    style['--yh-tag-border-color'] = props.color
    style['--yh-tag-text-color'] = props.color
  }

  return style
})

// 事件处理
const handleClick = (event: MouseEvent) => {
  if (props.checkable) {
    const newChecked = !props.checked
    emit('update:checked', newChecked)
    emit('change', newChecked)
  }
  emit('click', event)
}

const handleClose = (event: MouseEvent) => {
  event.stopPropagation()
  emit('close', event)
}

// 编辑相关
const startEdit = () => {
  if (!props.editable) return
  isEditing.value = true
  nextTick(() => {
    inputRef.value?.focus()
    inputRef.value?.select()
  })
}

const handleEditInput = (event: Event) => {
  editValue.value = (event.target as HTMLInputElement).value
}

const handleEditConfirm = () => {
  isEditing.value = false
  if (editValue.value.trim()) {
    emit('edit', editValue.value.trim())
  }
  editValue.value = ''
}

const handleEditKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleEditConfirm()
  } else if (event.key === 'Escape') {
    isEditing.value = false
    editValue.value = ''
  }
}
</script>

<template>
  <!-- 编辑模式 -->
  <input v-if="editable && isEditing" ref="inputRef" :class="[ns.e('input'), ns.m(size)]" :value="editValue"
    @input="handleEditInput" @blur="handleEditConfirm" @keydown="handleEditKeydown" />

  <!-- 普通模式 -->
  <span v-else :class="tagClasses" :style="tagStyle" @click="handleClick" @dblclick="startEdit">
    <!-- 左侧图标 -->
    <span v-if="hasIcon" :class="ns.e('icon')">
      <slot name="icon">
        <component v-if="icon && typeof icon !== 'string'" :is="icon" />
      </slot>
    </span>

    <!-- 内容 -->
    <span :class="ns.e('content')">
      <slot />
    </span>

    <!-- 右侧图标 -->
    <span v-if="hasSuffixIcon" :class="ns.e('suffix-icon')">
      <slot name="suffixIcon">
        <component v-if="suffixIcon && typeof suffixIcon !== 'string'" :is="suffixIcon" />
      </slot>
    </span>

    <!-- 关闭按钮 -->
    <span v-if="closable" :class="ns.e('close')" @click="handleClose">
      <slot name="closeIcon">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
          <path fill="currentColor"
            d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z" />
        </svg>
      </slot>
    </span>
  </span>
</template>

<style lang="scss">
@use './tag.scss';
</style>
