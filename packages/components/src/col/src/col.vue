<script setup lang="ts">
import { computed, inject } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { colProps } from './col'
import { rowContextKey } from '../../row/src/row'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'YhCol'
})

const props = defineProps(colProps)
const ns = useNamespace('col')
const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })

const style = computed<CSSProperties>(() => {
  const styles: CSSProperties = {}
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
  sizes.forEach((size) => {
    if (typeof props[size] === 'number') {
      classes.push(ns.b(`${size}-${props[size]}`))
    } else if (typeof props[size] === 'object') {
      const sizeProps = props[size] as any
      Object.keys(sizeProps).forEach((prop) => {
        classes.push(
          prop !== 'span'
            ? ns.b(`${size}-${prop}-${sizeProps[prop]}`)
            : ns.b(`${size}-${sizeProps[prop]}`)
        )
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
