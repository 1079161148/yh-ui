<script setup lang="ts">
/**
 * YhDropdownItem - 下拉菜单项
 */
import { inject, computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { YhIcon } from '../../icon'
import { dropdownItemProps, DROPDOWN_INJECTION_KEY } from './dropdown'

defineOptions({
  name: 'YhDropdownItem'
})

const props = defineProps(dropdownItemProps)

const ns = useNamespace('dropdown')
const dropdown = inject(DROPDOWN_INJECTION_KEY, null)

const classes = computed(() => [
  ns.e('item'),
  {
    [ns.is('disabled')]: props.disabled,
    [ns.is('divided')]: props.divided,
    [ns.is('danger')]: props.danger,
    [ns.is('checked')]: dropdown?.checkable.value && props.checked
  }
])

const handleClick = () => {
  if (props.disabled) return
  dropdown?.handleItemClick(props.command)
}
</script>

<template>
  <div v-if="divided" :class="ns.e('divider')" />
  <div :class="classes" @click="handleClick">
    <YhIcon v-if="dropdown?.checkable.value" :name="checked ? 'check' : ''" :class="ns.e('check-icon')" />
    <YhIcon v-if="icon" :name="icon" :class="ns.e('item-icon')" />
    <slot />
  </div>
</template>

<style lang="scss">
@use './dropdown.scss';
</style>
