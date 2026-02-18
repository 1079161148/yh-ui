<script setup lang="ts">
import { inject, ref, computed, type ToRefs } from 'vue'
import { routerKey } from 'vue-router'
import { useNamespace } from '@yh-ui/hooks'
import { breadcrumbItemProps, type BreadcrumbProps } from './breadcrumb'

defineOptions({
  name: 'YhBreadcrumbItem'
})

const props = defineProps(breadcrumbItemProps)
const ns = useNamespace('breadcrumb-item')

// 注入父组件配置
const breadcrumbContext = inject<ToRefs<BreadcrumbProps>>('breadcrumbProps')

const router = inject(routerKey, null)
const linkRef = ref<HTMLElement>()

const linkClass = computed(() => [
  ns.e('link'),
  ns.is('link', !!props.to)
])

const handleLinkClick = (e: MouseEvent) => {
  if (!props.to || !router) return
  e.preventDefault()
  props.replace ? router.replace(props.to) : router.push(props.to)
}
</script>

<template>
  <span :class="ns.b()">
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
