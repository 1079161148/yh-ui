<script setup lang="ts">
/**
 * YhAvatar - 头像组件
 */
import { computed, ref } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { AvatarProps, AvatarEmits } from './avatar'

defineOptions({ name: 'YhAvatar' })

const props = withDefaults(defineProps<AvatarProps>(), {
  shape: 'circle',
  size: 'default',
  fit: 'cover'
})

const emit = defineEmits<AvatarEmits>()

const ns = useNamespace('avatar')

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme(
  'avatar',
  computed(() => props.themeOverrides)
)

const imgError = ref(false)

const sizeMap: Record<string, number> = {
  large: 56,
  default: 40,
  small: 28
}

const avatarSize = computed(() => {
  if (typeof props.size === 'number') return `${props.size}px`
  return `${sizeMap[props.size] ?? 40}px`
})

const avatarStyle = computed(() => {
  const style: import('vue').CSSProperties = {
    ...themeStyle.value,
    width: avatarSize.value,
    height: avatarSize.value,
    lineHeight: avatarSize.value,
    fontSize: `calc(${avatarSize.value} / 2.5)`
  }
  if (props.backgroundColor || props.color) {
    style.backgroundColor = props.backgroundColor || props.color || ''
  }
  return { ...style, ...(typeof props.style === 'object' ? props.style : {}) }
})

const avatarClasses = computed(() => [
  ns.b(),
  ns.m(props.shape),
  typeof props.size === 'string' && ns.m(props.size),
  ns.is('image', !!props.src && !imgError.value)
])

const showImg = computed(() => props.src && !imgError.value)

const handleError = (event: Event) => {
  imgError.value = true
  emit('error', event)
}
</script>

<template>
  <span :class="avatarClasses" :style="avatarStyle" role="img" :aria-label="alt">
    <!-- 图片模式 -->
    <img
      v-if="showImg"
      :src="src"
      :srcset="srcSet"
      :alt="alt"
      :style="{ objectFit: fit }"
      :class="ns.e('img')"
      @error="handleError"
    />
    <!-- 图标模式 -->
    <component :is="icon" v-else-if="icon && !$slots.default" :class="ns.e('icon')" />
    <!-- 默认插槽（文字/自定义） -->
    <slot v-else>
      <span :class="ns.e('text')">?</span>
    </slot>
  </span>
</template>

<style lang="scss">
@use './avatar.scss';
</style>
