<script setup lang="ts">
/**
 * YhDescriptionsItem - 描述列表项组件
 */
import { defineComponent } from 'vue'
import { descriptionsItemProps } from './descriptions'

defineOptions({
  name: 'YhDescriptionsItem'
})

defineProps(descriptionsItemProps)
</script>

<template>
  <slot />
</template>

<style lang="scss">
@use './descriptions.scss';
</style>
