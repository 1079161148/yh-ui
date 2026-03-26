<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { useSKU } from '@yh-ui/hooks'
import { skuSelectorProps, skuSelectorEmits } from './sku-selector'
import type { SkuSpec, SkuSpecValue } from './sku-selector'

defineOptions({ name: 'YhSkuSelector' })

const props = defineProps(skuSelectorProps)
const emit = defineEmits(skuSelectorEmits)

const ns = useNamespace('sku-selector')
const { themeStyle } = useComponentTheme(
  'sku-selector',
  computed(() => props.themeOverrides)
)

const { selectedValueIds, isValueSelectable, selectedSku, toggleValue } = useSKU(
  props.specs,
  props.skus,
  props.modelValue
)

const handleValueClick = (index: number, spec: SkuSpec, value: SkuSpecValue) => {
  emit('select', spec, value)
  // 如果当前已经选中，且不允许取消选中，则直接返回
  if (isValueActive(value.id) && !props.allowUnselect) return

  if (props.disabled || !isValueSelectable(index, value.id)) return
  toggleValue(index, value.id)
  emit('update:modelValue', [...selectedValueIds.value])
  emit('change', selectedSku.value, [...selectedValueIds.value])
}

const isValueActive = (valueId: string | number) => {
  return selectedValueIds.value.includes(valueId)
}

// 已选规格汇总文本
const selectedSummary = computed(() => {
  if (!props.showSelectedSummary) return ''
  const names = props.specs
    .map((spec) => {
      const selectedId = selectedValueIds.value.find((id) => spec.values.some((v) => v.id === id))
      return spec.values.find((v) => v.id === selectedId)?.name ?? ''
    })
    .filter(Boolean)
  return names.length ? `${props.summaryPrefix}：${names.join(' / ')}` : ''
})

const imgSizePx = computed(() => `${props.imageSize}px`)
</script>

<template>
  <div
    :class="[ns.b(), ns.m(size), ns.is('disabled', disabled)]"
    :style="[themeStyle, { '--yh-sku-img-size': imgSizePx }]"
    role="group"
  >
    <!-- 已选汇总 -->
    <div v-if="showSelectedSummary" :class="ns.e('summary')">
      <slot name="summary" :summary="selectedSummary" :sku="selectedSku">
        <span v-if="selectedSummary" :class="ns.e('summary-text')">{{ selectedSummary }}</span>
        <span v-else :class="ns.e('summary-placeholder')">请选择规格</span>
      </slot>
    </div>

    <!-- 规格行 -->
    <div v-for="(spec, index) in specs" :key="spec.id" :class="ns.e('item')">
      <!-- 规格标题 -->
      <div :class="ns.e('label')">
        <slot name="label" :spec="spec">
          <span :class="ns.e('label-name')">{{ spec.name }}</span>
        </slot>
      </div>

      <!-- 规格值列表 -->
      <div :class="[ns.e('values'), spec.mode ? ns.em('values', spec.mode) : '']">
        <div
          v-for="value in spec.values"
          :key="value.id"
          :class="[
            ns.e('value'),
            spec.mode ? ns.em('value', spec.mode) : '',
            ns.is('active', isValueActive(value.id)),
            ns.is('disabled', !isValueSelectable(index, value.id))
          ]"
          role="radio"
          :aria-checked="isValueActive(value.id)"
          :aria-disabled="!isValueSelectable(index, value.id)"
          @click="handleValueClick(index, spec, value)"
        >
          <slot
            name="value"
            :value="value"
            :spec="spec"
            :active="isValueActive(value.id)"
            :disabled="!isValueSelectable(index, value.id)"
          >
            <!-- 色块模式 -->
            <span
              v-if="spec.mode === 'color'"
              :class="ns.e('color-swatch')"
              :style="{ backgroundColor: value.color }"
            />

            <!-- 图片模式 -->
            <span v-else-if="spec.mode === 'image'" :class="ns.e('img-wrap')">
              <img
                v-if="value.image"
                :src="value.image"
                :alt="value.name"
                :class="ns.e('item-img')"
              />
            </span>

            <!-- 默认：文字 + 标签 -->
            <span :class="ns.e('value-name')">{{ value.name }}</span>
            <span v-if="value.tag" :class="ns.e('value-tag')">{{ value.tag }}</span>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './sku-selector.scss';
</style>
