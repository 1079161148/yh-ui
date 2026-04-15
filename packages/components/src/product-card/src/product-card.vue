<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { productCardProps, productCardEmits } from './product-card'

defineOptions({ name: 'YhProductCard' })

const props = defineProps(productCardProps)
const emit = defineEmits(productCardEmits)

const ns = useNamespace('product-card')
const { t } = useLocale()
const { themeStyle } = useComponentTheme(
  'product-card',
  computed(() => props.themeOverrides)
)

const cardRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
const hasExposed = ref(false)

const setupObserver = () => {
  if (!props.exposure || hasExposed.value) return
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= props.exposureThreshold) {
          emit('expose')
          hasExposed.value = true
          if (props.exposureOnce) observer?.disconnect()
        }
      })
    },
    { threshold: [props.exposureThreshold] }
  )
  if (cardRef.value) observer.observe(cardRef.value)
}

onMounted(setupObserver)
onUnmounted(() => observer?.disconnect())

const currentImage = ref(props.image)
const isHovering = ref(false)
const videoActive = ref(false)

watch(
  () => props.image,
  (val) => {
    currentImage.value = val
  }
)

const handleMouseEnter = () => {
  isHovering.value = true
  if (props.hoverImage) currentImage.value = props.hoverImage
  if (props.videoSrc) videoActive.value = true
}

const handleMouseLeave = () => {
  isHovering.value = false
  currentImage.value = props.image
  if (props.videoSrc) videoActive.value = false
}

const displayPrice = computed(() => {
  const p = Number(props.price)
  return isNaN(p) ? props.price : p.toFixed(2)
})

const displayMarketPrice = computed(() => {
  const p = Number(props.marketPrice)
  return isNaN(p) ? props.marketPrice : p.toFixed(2)
})

const displayVipPrice = computed(() => {
  const p = Number(props.vipPrice)
  return isNaN(p) ? props.vipPrice : p.toFixed(2)
})

const vipLabelText = computed(() => props.vipLabel || t('productcard.vip'))
const soldOutText = computed(() => t('productcard.soldOut'))
const actionText = computed(() => props.actionText || t('productcard.buyNow'))

const stockStyle = computed(() => ({
  width: `${Math.min(100, Math.max(0, props.stockProgress))}%`,
  background: props.stockColor || 'var(--yh-color-primary)'
}))

const handleAction = (e: MouseEvent) => {
  if (props.soldOut || props.actionLoading) return
  emit('action', e)
}

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}

const badgeImageErrors = ref<Record<number, boolean>>({})
const handleBadgeImageError = (idx: number) => {
  badgeImageErrors.value[idx] = true
}
</script>

<template>
  <div
    ref="cardRef"
    :class="[
      ns.b(),
      ns.m(props.layout),
      ns.is('border', props.border),
      ns.is('shadow', props.shadow),
      ns.is('sold-out', props.soldOut)
    ]"
    :style="[
      themeStyle,
      {
        '--yh-product-card-title-lines': props.titleLines,
        '--yh-product-card-desc-lines': props.descriptionLines
      }
    ]"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-if="props.ribbon"
      :class="ns.e('ribbon')"
      :style="{ backgroundColor: props.ribbonColor }"
    >
      {{ props.ribbon }}
    </div>

    <div :class="ns.e('image-wrapper')">
      <img
        :src="currentImage"
        :alt="props.title"
        :class="ns.e('image')"
        :loading="props.lazy ? 'lazy' : 'eager'"
      />

      <Transition name="yh-fade">
        <div v-if="videoActive && props.videoSrc" :class="ns.e('video-overlay')">
          <video :src="props.videoSrc" autoplay muted loop playsinline :class="ns.e('video')" />
        </div>
      </Transition>

      <div v-if="props.soldOut" :class="ns.e('sold-out-mask')">
        <span :class="ns.e('sold-out-text')">{{ soldOutText }}</span>
      </div>
    </div>

    <div :class="ns.e('content')">
      <div
        v-if="(props.tag || props.badges.length) && props.badgePosition === 'top'"
        :class="ns.e('badges')"
      >
        <span v-if="props.tag" :class="[ns.e('badge-tag'), ns.is(props.tagType)]">{{
          props.tag
        }}</span>
        <template v-for="(badge, idx) in props.badges" :key="idx">
          <span v-if="badge.image && !badgeImageErrors[idx]" :class="ns.e('badge-img-wrap')">
            <img
              :src="badge.image"
              :class="ns.e('badge-img')"
              alt="badge"
              @error="handleBadgeImageError(idx)"
            />
          </span>
          <span
            v-if="badge.text"
            :class="[ns.e('badge-tag'), ns.is(badge.type || 'primary')]"
            :style="{ backgroundColor: badge.color }"
            >{{ badge.text }}</span
          >
        </template>
      </div>

      <h3 :class="ns.e('title')" :title="props.title">
        <span
          v-if="(props.tag || props.badges.length) && props.badgePosition === 'inline'"
          :class="[ns.e('badges'), ns.is('inline')]"
        >
          <span v-if="props.tag" :class="[ns.e('badge-tag'), ns.is(props.tagType)]">{{
            props.tag
          }}</span>
          <template v-for="(badge, idx) in props.badges" :key="idx">
            <span v-if="badge.image && !badgeImageErrors[idx]" :class="ns.e('badge-img-wrap')">
              <img
                :src="badge.image"
                :class="ns.e('badge-img')"
                alt="badge"
                @error="handleBadgeImageError(idx)"
              />
            </span>
            <span
              v-if="badge.text"
              :class="[ns.e('badge-tag'), ns.is(badge.type || 'primary')]"
              :style="{ backgroundColor: badge.color }"
              >{{ badge.text }}</span
            >
          </template>
        </span>
        <slot name="title">{{ props.title }}</slot>
      </h3>

      <div
        v-if="props.description || $slots.description"
        :class="ns.e('description')"
        :title="props.description"
      >
        <slot name="description">{{ props.description }}</slot>
      </div>

      <div :class="ns.e('price-row')">
        <div :class="ns.e('main-price')">
          <span :class="ns.e('currency')">{{ props.currency }}</span>
          <span :class="ns.e('price-val')">{{ displayPrice }}</span>
          <span v-if="props.unit" :class="ns.e('unit')">{{ props.unit }}</span>
        </div>

        <div v-if="props.vipPrice" :class="ns.e('vip-row')">
          <span :class="ns.e('vip-label')">{{ vipLabelText }}</span>
          <span :class="ns.e('currency')">{{ props.currency }}</span>
          <span :class="ns.e('vip-price')">{{ displayVipPrice }}</span>
        </div>

        <div v-if="props.marketPrice" :class="ns.e('market-price')">
          {{ props.currency }}{{ displayMarketPrice }}
        </div>
      </div>

      <div v-if="props.stockProgress" :class="ns.e('stock-area')">
        <div :class="ns.e('stock-bar-bg')">
          <div :class="ns.e('stock-bar-inner')" :style="stockStyle" />
        </div>
        <span v-if="props.stockText" :class="ns.e('stock-text')">{{ props.stockText }}</span>
      </div>

      <div v-if="!props.readonly" :class="ns.e('footer')">
        <slot name="footer">
          <button
            :class="[
              ns.e('action-btn'),
              ns.is('loading', props.actionLoading),
              ns.is('disabled', props.soldOut)
            ]"
            @click.stop="handleAction"
          >
            <span v-if="props.actionLoading" :class="ns.e('loading-spinner')" />
            {{ actionText }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './product-card.scss';
</style>
