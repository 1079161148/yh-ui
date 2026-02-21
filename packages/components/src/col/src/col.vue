<script setup lang="ts">
import { computed, inject } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { colProps } from './col'
import { rowContextKey } from '../../row/src/row'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'YhCol'
})

const props = defineProps(colProps)
const ns = useNamespace('col')

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('col', computed(() => props.themeOverrides))

const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })

const style = computed<CSSProperties>(() => {
  const styles: CSSProperties = {
    ...themeStyle.value as any
  }
  if (gutter.value) {
    styles.paddingLeft = `${gutter.value / 2}px`
    styles.paddingRight = `${gutter.value / 2}px`
  }
  return styles
})

const classes = computed(() => {
  const classes: string[] = []
  const pos = ['span', 'offset', 'pull', 'push'] as const

  pos.forEach((prop) => {
    const size = props[prop]
    if (typeof size === 'number') {
      if (prop === 'span') classes.push(ns.b(`${size}`))
      else if (size > 0) classes.push(ns.b(`${prop}-${size}`))
    }
  })

  // Responsive
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  // 使用 unknown 代替 any，并通过类型守卫确保类型安全
  type ColSizeProps = { span?: number; offset?: number; push?: number; pull?: number;[key: string]: unknown }
  sizes.forEach((size) => {
    if (typeof props[size] === 'number') {
      classes.push(ns.b(`${size}-${props[size]}`))
    } else if (typeof props[size] === 'object' && props[size] !== null) {
      const sizeProps = props[size] as ColSizeProps
      Object.keys(sizeProps).forEach((prop) => {
        const propValue = sizeProps[prop]
        // 类型守卫：确保值是 number 类型才进行处理
        if (typeof propValue === 'number') {
          classes.push(
            prop !== 'span'
              ? ns.b(`${size}-${prop}-${propValue}`)
              : ns.b(`${size}-${propValue}`)
          )
        }
      })
    }
  })

  return [
    ns.b(),
    ...classes
  ]
})
</script>

<template>
  <component :is="tag" :class="classes" :style="style">
    <slot />
  </component>
</template>

<style lang="scss">
@use './col.scss';
</style>
