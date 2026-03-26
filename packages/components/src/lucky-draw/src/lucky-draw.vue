<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { luckyDrawProps, luckyDrawEmits } from './lucky-draw'

defineOptions({ name: 'YhLuckyDraw' })

const props = defineProps(luckyDrawProps)
const emit = defineEmits(luckyDrawEmits)

const ns = useNamespace('lucky-draw')
const { t } = useLocale()
const { themeStyle } = useComponentTheme(
  'lucky-draw',
  computed(() => props.themeOverrides)
)

const isRotating = ref(false)
const wheelRotate = ref(0)
const gridActiveIndex = ref(-1)
let animationFrameId: number | null = null

const finalActionText = computed(() => {
  if (isRotating.value || props.loading) return t('luckydraw.drawing')
  return props.actionText || t('luckydraw.start')
})

const containerStyle = computed(() => ({
  ...themeStyle.value,
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: typeof props.size === 'number' ? `${props.size}px` : props.size
}))

// Auto-detect layout mode: if no images are present, we switch to pure-text radial layout
const isPureText = computed(() => props.prizes.length > 0 && props.prizes.every((p) => !p.image))

// Soft Modern Peach & White (Matching Premium Target Aesthetic)
const defaultColors = ['#FFF4EB', '#FFFFFF']

const wheelInnerStyle = computed(() => {
  const prizeCount = props.prizes.length
  if (prizeCount === 0) return {}

  const degreesPerPrize = 360 / prizeCount
  const gradientParts: string[] = []

  props.prizes.forEach((prize, index) => {
    const start = index * degreesPerPrize
    const end = (index + 1) * degreesPerPrize
    const color = prize.color || defaultColors[index % defaultColors.length]
    gradientParts.push(`${color} ${start}deg ${end}deg`)
  })

  return {
    background: `conic-gradient(${gradientParts.join(', ')})`
  }
})

const handleStart = (e: MouseEvent) => {
  if (isRotating.value || props.loading) return
  emit('click', e)
  emit('start')
}

const startWheel = (id: string | number) => {
  const index = props.prizes.findIndex((p) => p.id === id)
  if (index === -1) return

  isRotating.value = true
  const prizeCount = props.prizes.length
  const degreesPerPrize = 360 / prizeCount

  // Target pointer is at the TOP (0deg).
  const destAngle = -(index * degreesPerPrize + degreesPerPrize / 2)
  const baseRotation = (props.rounds || 8) * 360

  const currentRotation = wheelRotate.value

  let extra = (destAngle - (currentRotation % 360)) % 360
  if (extra > 0) extra -= 360

  wheelRotate.value = currentRotation + baseRotation + extra

  setTimeout(() => {
    isRotating.value = false
    emit('finish', props.prizes[index])
  }, props.duration || 4000)
}

const startGrid = (id: string | number) => {
  const index = props.prizes.findIndex((p) => p.id === id)
  if (index === -1) return

  isRotating.value = true
  const prizeCount = Math.min(props.prizes.length, 8)
  const totalSteps = prizeCount * (props.rounds || 8) + index
  const startTime = Date.now()

  const tick = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / props.duration, 1)

    const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    const currentStep = Math.round(totalSteps * easedProgress)
    gridActiveIndex.value = currentStep % prizeCount

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(tick)
    } else {
      gridActiveIndex.value = index
      isRotating.value = false
      emit('finish', props.prizes[index])
    }
  }

  animationFrameId = requestAnimationFrame(tick)
}

watch(
  () => props.targetId,
  (newId) => {
    if (newId !== '' && newId !== undefined && newId !== null) {
      if (props.type === 'wheel') startWheel(newId)
      else startGrid(newId)
    }
  }
)

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})

const gridAreas = ['1/1', '1/2', '1/3', '2/3', '3/3', '3/2', '3/1', '2/1']
</script>

<template>
  <div :class="[ns.b(), ns.m(type)]" :style="containerStyle">
    <template v-if="type === 'wheel'">
      <!-- Dynamic class injection for styling decoupling based on exact content -->
      <div :class="[ns.e('wheel-container'), ns.is('pure-text', isPureText)]">
        <div
          :class="ns.e('wheel-inner')"
          :style="[
            wheelInnerStyle,
            {
              transform: `rotate(${wheelRotate}deg)`,
              transition: isRotating
                ? `transform ${duration}ms cubic-bezier(0.15, 0, 0, 1.0)`
                : 'none'
            }
          ]"
        >
          <div
            v-for="(prize, index) in prizes"
            :key="prize.id"
            :class="ns.e('prize-item')"
            :style="{
              transform: `rotate(${(360 / prizes.length) * index + 360 / prizes.length / 2}deg)`
            }"
          >
            <slot name="prize" :prize="prize">
              <div :class="ns.e('prize-content')">
                <div :class="ns.e('prize-name')" :style="{ color: prize.textColor }">
                  {{ prize.name }}
                </div>
                <div v-if="prize.image" :class="ns.e('prize-icon')">{{ prize.image }}</div>
              </div>
            </slot>
          </div>
        </div>
        <div v-if="!hideBtn" :class="ns.e('pointer')" @click="handleStart">
          <slot name="action">
            <div :class="ns.e('pointer-btn')">
              <span>{{ finalActionText }}</span>
            </div>
          </slot>
        </div>
      </div>
    </template>

    <template v-else-if="type === 'grid'">
      <div :class="ns.e('grid-container')">
        <div
          v-for="idx in 8"
          :key="idx"
          :class="[ns.e('grid-item'), ns.is('active', gridActiveIndex === idx - 1)]"
          :style="{ 'grid-area': gridAreas[idx - 1] }"
        >
          <slot v-if="prizes[idx - 1]" name="prize" :prize="prizes[idx - 1]">
            <div v-if="prizes[idx - 1].image" :class="ns.e('prize-icon')">{{
              prizes[idx - 1].image
            }}</div>
            <div :class="ns.e('prize-name')" :style="{ color: prizes[idx - 1].textColor }">
              {{ prizes[idx - 1].name }}
            </div>
          </slot>
        </div>
        <div
          v-if="!hideBtn"
          :class="ns.e('grid-btn')"
          @click="handleStart"
          style="grid-area: 2 / 2"
        >
          <slot name="action">{{ finalActionText }}</slot>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
@use './lucky-draw.scss';
</style>
