<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { useLocale } from '@yh-ui/hooks'
import { smartAddressProps, smartAddressEmits } from './smart-address'
import { parseAddress } from './use-address-parser'
import type { AddressValue, RegionOption } from './smart-address'
// ─── 下拉框与级联选择逻辑 ──────────────────────────────────────────────────────────
import { YhSelect, YhOption } from '../../select'
import { YhCascader } from '../../cascader'
import type { CascaderOption } from '../../cascader'

defineOptions({ name: 'YhSmartAddress' })

const props = defineProps(smartAddressProps)
const emit = defineEmits(smartAddressEmits)

const ns = useNamespace('smart-address')
const { themeStyle } = useComponentTheme(
  'smart-address',
  computed(() => props.themeOverrides)
)
const { t, tRaw } = useLocale()

// ─── 字段转换与解析 ────────────────────────────────────────────────────────────
const rawText = ref('')
const parseStatus = ref<'idle' | 'success' | 'error'>('idle')
const parseTip = ref('')

/** 根据 label 在选项列表查找对应 value */
function getValueByLabel(options: RegionOption[], label: string): string | null {
  if (!label) return null
  const match = options.find((opt) => opt[props.labelField] === label)
  return match ? (match[props.valueField] as string) : null
}

function handleParse() {
  if (!rawText.value.trim()) return

  // 获取语言包定义的解析关键词（用于多语言精准识别）
  const getKw = (p: string) => {
    const res = tRaw(p)
    return Array.isArray(res) ? res : undefined
  }
  const parseOptions = {
    provinceKeywords: getKw('smartaddress.provinceKeywords'),
    cityKeywords: getKw('smartaddress.cityKeywords'),
    districtKeywords: getKw('smartaddress.districtKeywords'),
    streetKeywords: getKw('smartaddress.streetKeywords')
  }

  const result = props.parser
    ? props.parser(rawText.value)
    : parseAddress(rawText.value, parseOptions)
  const hasRegion = result.province || result.city || result.district || result.detail

  if (!hasRegion && !result.phone && !result.name) {
    parseStatus.value = 'error'
    parseTip.value = t('smartaddress.parseFailed')
    return
  }

  // 尝试将解析出的中文地名映射为对应的数据源 Code (如果有匹配的)
  const provinceVal = getValueByLabel(props.regionOptions, result.province) || result.province

  // 查找市级 Code
  let cityVal = result.city
  const provinceMatch = props.regionOptions.find((opt) => opt[props.labelField] === result.province)
  const provinceChildren = (provinceMatch?.[props.childrenField] as RegionOption[]) || []
  if (provinceChildren.length) {
    cityVal = getValueByLabel(provinceChildren, result.city) || result.city
  }

  // 查找区县级 Code
  let districtVal = result.district
  const cityMatch = provinceChildren.find((opt) => opt[props.labelField] === result.city)
  const cityChildren = (cityMatch?.[props.childrenField] as RegionOption[]) || []
  if (cityChildren.length) {
    districtVal = getValueByLabel(cityChildren, result.district) || result.district
  }

  const newVal: AddressValue = {
    name: result.name || innerVal.name,
    phone: result.phone || innerVal.phone,
    province: provinceVal || innerVal.province,
    city: cityVal || innerVal.city,
    district: districtVal || innerVal.district,
    street: result.street || innerVal.street,
    detail: result.detail || innerVal.detail
  }

  Object.assign(innerVal, newVal)
  parseStatus.value = 'success'
  parseTip.value = t('smartaddress.parseSuccess')
  rawText.value = ''

  emit('update:modelValue', { ...innerVal })
  emit('parsed', result)
  emit('change', { ...innerVal })

  setTimeout(() => {
    parseStatus.value = 'idle'
    parseTip.value = ''
  }, 3000)
}

// ─── 表单字段 ─────────────────────────────────────────────────────────────────
const innerVal = reactive<AddressValue>({ ...props.modelValue })

function updateField(field: keyof AddressValue, value: string) {
  innerVal[field] = value
  emit('update:modelValue', { ...innerVal })
  emit('change', { ...innerVal })
}

const provinceOptions = computed(() => {
  return props.regionOptions.map((p) => ({
    label: (p[props.labelField] || '') as string,
    value: (p[props.valueField] || '') as string
  }))
})

const cityOptions = computed(() => {
  if (!innerVal.province) return []
  const p = props.regionOptions.find((opt) => opt[props.valueField] === innerVal.province)
  const children = (p?.[props.childrenField] as RegionOption[]) || []
  if (children.length) {
    return children.map((c) => ({
      label: (c[props.labelField] || '') as string,
      value: (c[props.valueField] || '') as string
    }))
  }
  return []
})

const districtOptions = computed(() => {
  if (!innerVal.province || !innerVal.city) return []
  const p = props.regionOptions.find((opt) => opt[props.valueField] === innerVal.province)
  const provinceChildren = (p?.[props.childrenField] as RegionOption[]) || []
  if (provinceChildren.length) {
    const c = provinceChildren.find((child) => child[props.valueField] === innerVal.city)
    const cityChildren = (c?.[props.childrenField] as RegionOption[]) || []
    if (cityChildren.length) {
      return cityChildren.map((d) => ({
        label: (d[props.labelField] || '') as string,
        value: (d[props.valueField] || '') as string
      }))
    }
  }
  return []
})

/** 适配 Cascader 的数据格式（将动态字段映射为标准 CascaderOption） */
const cascaderOptions = computed<CascaderOption[]>(() => {
  const transform = (opts: RegionOption[]): CascaderOption[] => {
    return opts.map((opt) => ({
      label: (opt[props.labelField] || '') as string,
      value: (opt[props.valueField] || '') as string | number,
      children: opt[props.childrenField]
        ? transform(opt[props.childrenField] as RegionOption[])
        : undefined
    }))
  }
  return transform(props.regionOptions)
})

const regionCascaderValue = computed({
  get() {
    const vals: string[] = []
    if (innerVal.province) vals.push(innerVal.province)
    if (innerVal.city) vals.push(innerVal.city)
    if (innerVal.district) vals.push(innerVal.district)
    return vals
  },
  set(val: unknown) {
    const arr = val as string[]
    if (Array.isArray(arr)) {
      updateField('province', arr[0] || '')
      updateField('city', arr[1] || '')
      updateField('district', arr[2] || '')
    } else {
      updateField('province', '')
      updateField('city', '')
      updateField('district', '')
    }
  }
})

// ─── 标签辅助 ─────────────────────────────────────────────────────────────────
const placeholder = computed(() => props.parsePlaceholder || t('smartaddress.placeholder'))
const btnText = computed(() => props.parseButtonText || t('smartaddress.parse'))
</script>

<template>
  <div :class="[ns.b(), ns.is('disabled', disabled)]" :style="themeStyle">
    <!-- 智能识别区 -->
    <div v-if="showParser" :class="ns.e('parser')">
      <textarea
        v-model="rawText"
        :class="ns.e('parser-input')"
        :placeholder="placeholder"
        :disabled="disabled"
        rows="3"
        :aria-label="t('smartaddress.parse')"
      ></textarea>
      <div :class="ns.e('parser-actions')">
        <span
          v-if="parseTip"
          :class="[
            ns.e('parser-tip'),
            ns.is('success', parseStatus === 'success'),
            ns.is('error', parseStatus === 'error')
          ]"
        >
          {{ parseTip }}
        </span>
        <button
          :class="ns.e('parse-btn')"
          :disabled="disabled || !rawText.trim()"
          @click="handleParse"
        >
          <slot name="parse-icon">✦</slot>
          {{ btnText }}
        </button>
      </div>
    </div>

    <!-- 结构化字段 -->
    <div :class="[ns.e('fields'), ns.is('top', labelPlacement === 'top')]">
      <!-- 姓名 -->
      <div v-if="showName" :class="ns.e('field')">
        <label :class="[ns.e('label'), ns.is('required', required)]">
          {{ t('smartaddress.name') }}
        </label>
        <input
          :class="ns.e('input')"
          :value="innerVal.name"
          :disabled="disabled"
          :placeholder="`${t('smartaddress.name')}...`"
          @input="(e) => updateField('name', (e.target as HTMLInputElement).value)"
        />
      </div>

      <!-- 手机号 -->
      <div v-if="showPhone" :class="ns.e('field')">
        <label :class="[ns.e('label'), ns.is('required', required)]">
          {{ t('smartaddress.phone') }}
        </label>
        <input
          :class="ns.e('input')"
          :value="innerVal.phone"
          :disabled="disabled"
          type="tel"
          inputmode="numeric"
          maxlength="11"
          :placeholder="`${t('smartaddress.phone')}...`"
          @input="(e) => updateField('phone', (e.target as HTMLInputElement).value)"
        />
      </div>

      <!-- 省/市/区 三个下拉（当前简化为 input，可由外部插槽替换为 Cascader） -->
      <div :class="[ns.e('field'), ns.e('region')]">
        <label :class="[ns.e('label'), ns.is('required', required)]">
          {{ t('smartaddress.province') }}
        </label>
        <slot name="region" :value="innerVal" :update="updateField">
          <!-- 输入框模式 -->
          <div v-if="regionType === 'input'" :class="ns.e('region-inputs')">
            <input
              :class="ns.e('input')"
              :value="innerVal.province"
              :disabled="disabled"
              :placeholder="t('smartaddress.province')"
              @input="(e) => updateField('province', (e.target as HTMLInputElement).value)"
            />
            <input
              :class="ns.e('input')"
              :value="innerVal.city"
              :disabled="disabled"
              :placeholder="t('smartaddress.city')"
              @input="(e) => updateField('city', (e.target as HTMLInputElement).value)"
            />
            <input
              :class="ns.e('input')"
              :value="innerVal.district"
              :disabled="disabled"
              :placeholder="t('smartaddress.district')"
              @input="(e) => updateField('district', (e.target as HTMLInputElement).value)"
            />
          </div>

          <!-- 下拉框模式 -->
          <div v-else-if="regionType === 'select'" :class="ns.e('region-inputs')">
            <YhSelect
              :model-value="innerVal.province"
              :disabled="disabled"
              :placeholder="t('smartaddress.province')"
              style="flex: 1; min-width: 0"
              @update:model-value="
                (val) => {
                  updateField('province', val as string)
                  updateField('city', '')
                  updateField('district', '')
                }
              "
            >
              <YhOption
                v-for="opt in provinceOptions"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </YhSelect>
            <YhSelect
              :model-value="innerVal.city"
              :disabled="disabled"
              :placeholder="t('smartaddress.city')"
              style="flex: 1; min-width: 0"
              @update:model-value="
                (val) => {
                  updateField('city', val as string)
                  updateField('district', '')
                }
              "
            >
              <YhOption
                v-for="opt in cityOptions"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </YhSelect>
            <YhSelect
              :model-value="innerVal.district"
              :disabled="disabled"
              :placeholder="t('smartaddress.district')"
              style="flex: 1; min-width: 0"
              @update:model-value="(val) => updateField('district', val as string)"
            >
              <YhOption
                v-for="opt in districtOptions"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </YhSelect>
          </div>

          <!-- 级联模式 -->
          <div v-else-if="regionType === 'cascader'" :class="ns.e('region-inputs')">
            <YhCascader
              v-model="regionCascaderValue"
              :options="cascaderOptions"
              :disabled="disabled"
              :placeholder="t('smartaddress.province')"
              style="width: 100%"
            />
          </div>
        </slot>
      </div>

      <!-- 街道（可选） -->
      <div v-if="showStreet" :class="ns.e('field')">
        <label :class="ns.e('label')">
          {{ t('smartaddress.street') }}
        </label>
        <input
          :class="ns.e('input')"
          :value="innerVal.street"
          :disabled="disabled"
          :placeholder="`${t('smartaddress.street')}...`"
          @input="(e) => updateField('street', (e.target as HTMLInputElement).value)"
        />
      </div>

      <!-- 详细地址 -->
      <div :class="ns.e('field')">
        <label :class="[ns.e('label'), ns.is('required', required)]">
          {{ t('smartaddress.detail') }}
        </label>
        <input
          :class="ns.e('input')"
          :value="innerVal.detail"
          :disabled="disabled"
          :placeholder="`${t('smartaddress.detail')}...`"
          @input="(e) => updateField('detail', (e.target as HTMLInputElement).value)"
        />
      </div>

      <!-- 自定义扩展字段区 -->
      <slot name="extra" :value="innerVal" :update="updateField" />
    </div>
  </div>
</template>

<style lang="scss">
@use './smart-address.scss';
</style>
