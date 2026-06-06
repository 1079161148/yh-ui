<script setup lang="ts">
import { inject, ref, computed, getCurrentInstance, type ToRefs } from 'vue'
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

interface RouterLike {
  push: (to: unknown) => unknown
  replace: (to: unknown) => unknown
}

const instance = getCurrentInstance()
const router = computed<RouterLike | null>(() => {
  const globalRouter = instance?.appContext.config.globalProperties?.$router as
    | RouterLike
    | undefined
  return globalRouter ?? null
})
const linkRef = ref<HTMLElement>()

const linkClass = computed(() => [ns.e('link'), ns.is('link', !!props.to)])

const handleLinkClick = (e: MouseEvent) => {
  const activeRouter = router.value
  if (!props.to || !activeRouter) return
  e.preventDefault()
  if (props.replace) {
    activeRouter.replace(props.to)
  } else {
    activeRouter.push(props.to)
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
