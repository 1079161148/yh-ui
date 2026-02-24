<script setup lang="ts">
import { inject, ref, computed, type ToRefs } from 'vue'
import { routerKey } from 'vue-router'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { breadcrumbItemProps, type BreadcrumbProps } from './breadcrumb'

defineOptions({
  name: 'YhBreadcrumbItem'
})

const props = defineProps(breadcrumbItemProps)
const ns = useNamespace('breadcrumb-item')

// 注入父组件配置
const breadcrumbContext =
  inject<ToRefs<BreadcrumbProps & { themeOverrides?: import('@yh-ui/theme').ComponentThemeVars }>>(
    'breadcrumbProps'
  )

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme(
  'breadcrumb-item',
  computed(() => props.themeOverrides || breadcrumbContext?.themeOverrides?.value)
)

const router = inject(routerKey, null)
const linkRef = ref<HTMLElement>()

const linkClass = computed(() => [ns.e('link'), ns.is('link', !!props.to)])

const handleLinkClick = (e: MouseEvent) => {
  if (!props.to || !router) return
  e.preventDefault()
  if (props.replace) {
    router.replace(props.to)
  } else {
    router.push(props.to)
  }
}
</script>

<template>
  <span :class="ns.b()" :style="themeStyle">
    <!-- 文字/链接内容 -->
    <span ref="linkRef" role="link" :class="linkClass" @click="handleLinkClick">
      <slot />
    </span>

    <!-- 分隔符 -->
    <span :class="ns.e('separator')" role="presentation">
      <template v-if="breadcrumbContext?.separatorIcon?.value">
        <component :is="breadcrumbContext.separatorIcon.value" />
      </template>
      <template v-else>
        {{ breadcrumbContext?.separator?.value }}
      </template>
    </span>
  </span>
</template>

<style lang="scss">
@use './breadcrumb.scss';
</style>
