<script setup lang="ts">
/**
 * YhColorPicker - Premium Color Selection Component
 */
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace, useFormItem, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { colorPickerProps, colorPickerEmits } from './color-picker'
import SVPanel from './sv-panel.vue'
import HueSlider from './hue-slider.vue'
import AlphaSlider from './alpha-slider.vue'
import { parseColor, formatColor, hsvToRgb, getLuminance, getContrastRatio } from './utils'

// EyeDropper API 类型声明（实验性 API）
interface EyeDropper {
  open(): Promise<{ sRGBHex: string }>
  abort(): void
}

declare global {
  interface Window {
    EyeDropper: new () => EyeDropper
  }
}

defineOptions({
  name: 'YhColorPicker'
})

const props = defineProps(colorPickerProps)
const emit = defineEmits(colorPickerEmits)

const ns = useNamespace('color-picker')
const { t } = useLocale()
const { formItem } = useFormItem()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('color-picker', computed(() => props.themeOverrides))

// --- Internal State ---
const visible = ref(false)
const color = ref(parseColor(props.modelValue))
const inputValue = ref(props.modelValue || '')

const triggerRef = ref<HTMLElement>()
const popperRef = ref<HTMLElement>()

const rgb = computed(() => hsvToRgb(color.value.h, color.value.s, color.value.v))
const baseColor = computed(() => `hsl(${color.value.h}, 100%, 50%)`)
const currentColor = computed(() => formatColor(color.value, props.showAlpha ? 'rgb' : 'hex'))

const contrastInfo = computed(() => {
  const l = getLuminance(rgb.value.r, rgb.value.g, rgb.value.b)
  return {
    isDark: l < 0.5,
    suggestion: l < 0.5 ? t('colorpicker.suggestionDark') : t('colorpicker.suggestionLight')
  }
})

// --- Sync state ---
watch(() => props.modelValue, (val: string) => {
  const parsed = parseColor(val)
  if (JSON.stringify(parsed) !== JSON.stringify(color.value)) {
    color.value = parsed
  }
  inputValue.value = val || ''
})

watch(currentColor, (val: string) => {
  inputValue.value = val
})

const updateColor = () => {
  const val = currentColor.value
  emit('update:modelValue', val)
  emit('activeChange', val)
}

const handleInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const text = target.value
  const parsed = parseColor(text)
  color.value = parsed
  updateColor()
}

const handleConfirm = () => {
  emit('change', currentColor.value)
  visible.value = false
}

const handleClear = () => {
  inputValue.value = ''
  color.value = { h: 0, s: 0, v: 100, a: 1 } // default white
  emit('update:modelValue', '')
  emit('change', '')
  visible.value = false
}

// --- Innovation: EyeDropper ---
const isEyeDropperSupported = ref(false)
onMounted(() => {
  isEyeDropperSupported.value = typeof window.EyeDropper !== 'undefined'
})
const handleEyeDropper = async () => {
  if (!isEyeDropperSupported.value) return
  const eyeDropper = new window.EyeDropper()
  try {
    const result = await eyeDropper.open()
    color.value = parseColor(result.sRGBHex)
    updateColor()
  } catch {
    // user cancelled
  }
}

// --- Interaction ---
const togglePopper = () => {
  if (props.disabled) return
  visible.value = !visible.value
}

const handleClickOutside = (e: MouseEvent) => {
  if (visible.value &&
    triggerRef.value && !triggerRef.value.contains(e.target as Node) &&
    popperRef.value && !popperRef.value.contains(e.target as Node)) {
    visible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// --- Positioning ---
const popperStyle = ref<any>({})
watch(visible, (val: boolean) => {
  if (val && triggerRef.value) {
    const rect = triggerRef.value.getBoundingClientRect()

    // 提取主题变量
    const styles = window.getComputedStyle(triggerRef.value)
    const primary = styles.getPropertyValue('--yh-color-primary').trim()
    const primaryRgb = styles.getPropertyValue('--yh-color-primary-rgb').trim()

    popperStyle.value = {
      top: `${rect.bottom + window.scrollY + 8}px`,
      left: `${rect.left + window.scrollX}px`,
      position: 'absolute',
      zIndex: 3000,
      '--yh-color-primary': primary,
      '--yh-color-primary-rgb': primaryRgb
    }
  }
})
</script>

<template>
  <div ref="triggerRef" :class="[
    ns.b(),
    ns.m(size),
    ns.is('disabled', disabled)
  ]" :style="themeStyle" @click="togglePopper">
    <div :class="ns.e('trigger')">
      <div :class="ns.e('color')" :style="{ backgroundColor: modelValue || 'transparent' }">
        <svg v-if="!modelValue" viewBox="0 0 1024 1024" width="1em" height="1em" class="yh-color-picker__empty">
          <path fill="currentColor"
            d="M764.288 214.592L512 466.88L259.712 214.592l-45.12 45.12L466.88 512l-252.288 252.288l45.12 45.12L512 557.12l252.288 252.288l45.12-45.12L557.12 512l252.288-252.288z" />
        </svg>
      </div>
      <div :class="ns.e('icon')">
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          <path fill="currentColor"
            d="M831.872 340.864L512 652.672L192.128 340.864l-45.248 45.248L512 743.168l365.12-357.056z" />
        </svg>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="yh-fade">
        <div v-if="visible" ref="popperRef" :class="[ns.e('panel'), popperClass]" :style="popperStyle" @click.stop>
          <div :class="ns.e('main')">
            <SVPanel :h="color.h" :s="color.s" :v="color.v"
              @update="(s, v) => { color.s = s; color.v = v; updateColor() }" />
            <div :class="ns.e('contrast-advisor')" :title="t('colorpicker.suggestionDark')">
              <span :class="ns.e('contrast-dot')"
                :style="{ backgroundColor: contrastInfo.isDark ? '#fff' : '#000' }"></span>
              {{ contrastInfo.suggestion }}
            </div>
            <div :class="ns.e('sliders')">
              <HueSlider :h="color.h" @update="(h) => { color.h = h; updateColor() }" />
              <AlphaSlider v-if="showAlpha" :a="color.a" :color="baseColor"
                @update="(a) => { color.a = a; updateColor() }" />
            </div>
          </div>

          <div v-if="predefine.length > 0" :class="ns.e('predefine')">
            <div v-for="c in predefine" :key="c" :class="ns.e('predefine-item')" :style="{ backgroundColor: c }"
              @click="color = parseColor(c); updateColor()"></div>
          </div>

          <div :class="ns.e('footer')">
            <div :class="ns.e('tools')">
              <div v-if="isEyeDropperSupported" :class="ns.e('eye-dropper')" @click="handleEyeDropper"
                :title="t('colorpicker.eyeDropper')">
                <svg viewBox="0 0 1024 1024" width="1.2em" height="1.2em">
                  <path fill="currentColor"
                    d="M148.65 892.42c-29.6 0-53.59-24-53.59-53.59 0-14.28 5.68-27.97 15.76-38.05L511.45 400.1c11.02-11.02 26.23-16.71 42.84-16.03l68.74 3c14.77.65 26.79 12.67 27.44 27.44l3 68.74c.68 16.61-5.01 31.81-16.03 42.84L236.78 926.75a53.48 53.48 0 0 1-38.05 15.76c-16.63-.04-33.31-7.04-50.08-50.09zm522.61-460.67l-26.68 26.68c34.78 35.8 70.9 71.55 107.5 107.22l26.68-26.68c-36.63-35.61-72.76-71.38-107.5-107.22zm256.4-180.25l-20.91-20.91c-43.11-43.11-113-43.11-156.11 0L575.48 405.74c-4.47 4.47-7.16 10.4-7.58 16.68l-4.52 103.88c-.37 8.52 3.01 16.59 9.53 22.73s15.17 9.17 23.63 8.35L711.66 550c6.26-.49 12.1-3.26 16.5-7.78l175.16-180.36c43.11-43.11 43.11-113 0-156.11z" />
                </svg>
              </div>
              <input :class="ns.e('value')" :value="inputValue" @change="handleInputChange" spellcheck="false" />
            </div>
            <div :class="ns.e('btns')">
              <button :class="ns.e('btn-clear')" @click="handleClear">{{ t('colorpicker.clear') }}</button>
              <button :class="ns.e('btn-confirm')" @click="handleConfirm">{{ t('colorpicker.confirm') }}</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use './color-picker.scss';
</style>
