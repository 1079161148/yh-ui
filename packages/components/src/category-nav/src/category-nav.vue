<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { useLocale } from '@yh-ui/hooks'
import { categoryNavProps, categoryNavEmits } from './category-nav'
import type { CategoryItem, CategorySubItem } from './category-nav'

defineOptions({ name: 'YhCategoryNav' })

const props = defineProps(categoryNavProps)
const emit = defineEmits(categoryNavEmits)

const ns = useNamespace('category-nav')
const { themeStyle } = useComponentTheme(
  'category-nav',
  computed(() => props.themeOverrides)
)
const { t } = useLocale()

// ─── 当前激活 ID ──────────────────────────────────────────────────────────────
const activeId = ref<string | number | null>(props.modelValue)
const activeSubId = ref<string | number | null>(props.subValue)

watch(
  () => props.modelValue,
  (v) => {
    activeId.value = v
  }
)
watch(
  () => props.subValue,
  (v) => {
    activeSubId.value = v
  }
)

// ─── 左侧菜单 ref，用于自动滚动 ───────────────────────────────────────────────
const sideRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const sectionRefs = ref<Record<string | number, HTMLElement>>({})

// ─── 当前激活分类的子列表 ─────────────────────────────────────────────────────
const activeCategory = computed<CategoryItem | null>(() => {
  if (activeId.value === null) return null
  return props.categories.find((c) => c.id === activeId.value) ?? null
})

let isScrollByClick = false
let scrollTimer: ReturnType<typeof setTimeout> | null = null
let rafId: number | null = null
let observer: IntersectionObserver | null = null

// ─── 侧边栏自动滚动到激活项居中 ───────────────────────────────────────────────
function scrollSideToActive() {
  const sideEl = sideRef.value
  if (!sideEl) return

  nextTick(() => {
    // 寻找侧边栏当前带有 is-active 状态的按钮
    const activeEl = sideEl.querySelector(`[role="tab"].${ns.is('active')}`) as HTMLElement | null
    if (activeEl) {
      const { height: containerHeight } = sideEl.getBoundingClientRect()
      const { height: activeHeight, top: activeTop } = activeEl.getBoundingClientRect()
      const containerTop = sideEl.getBoundingClientRect().top

      // 计算其在侧边栏容器内的绝对 Y 坐标，并扣除一半容器高度使其居中
      const relativeTop = activeTop - containerTop + sideEl.scrollTop
      const targetTop = relativeTop - (containerHeight - activeHeight) / 2

      sideEl.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
      })
    }
  })
}

// ─── 用户点击左侧菜单交互 ─────────────────────────────────────────────────────
async function selectCategory(item: CategoryItem | null) {
  const id = item ? item.id : null
  if (activeId.value === id) return

  isScrollByClick = true
  activeId.value = id
  emit('update:modelValue', id)
  if (item) emit('categoryClick', item)

  if (props.anchor && contentRef.value) {
    await nextTick()
    const target = id !== null ? sectionRefs.value[id] : null

    if (target) {
      // 使用 offsetTop 实现工业级的精准滚动锁定，避免 scrollIntoView 在嵌套容器中的 side effect
      contentRef.value.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      })
    } else {
      contentRef.value.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  scrollSideToActive()

  // 1.5s 锁定周期，配合长距离平滑滚动，防止点击引发的联动抖动
  if (scrollTimer) clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    isScrollByClick = false
  }, 1500)
}

function selectSub(subItem: CategorySubItem, parent: CategoryItem) {
  activeSubId.value = subItem.id
  emit('update:subValue', subItem.id)
  emit('subCategoryClick', subItem, parent)
}

// ─── 现代化联动逻辑 (IntersectionObserver - 多帧稳定版) ─────────────────────
// 用 Map 记录当前正在相交的所有 section，避免 forEach 顺序依赖导致的误判
const intersectingMap = new Map<string | number, HTMLElement>()

function initObserver() {
  if (!props.anchor || !contentRef.value) return

  // rootMargin: 顶部留 5% 作为激活触发带，底部忽略 80% 以确保只有真正在顶部的分类高亮
  const options: IntersectionObserverInit = {
    root: contentRef.value,
    rootMargin: '-5% 0px -80% 0px',
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    if (isScrollByClick) return

    // 1. 更新相交状态 Map
    // 关键：通过 props.categories 查找原始类型的 id，避免 data-id 字符串与 cat.id 类型不匹配
    entries.forEach((entry) => {
      const rawId = entry.target.getAttribute('data-id')
      if (rawId === null) return
      // 从 props.categories 中找到其原始 id（保持 string | number 原始类型）
      const matchedCat = props.categories.find((c) => String(c.id) === rawId)
      if (!matchedCat) return
      if (entry.isIntersecting) {
        intersectingMap.set(matchedCat.id, entry.target as HTMLElement)
      } else {
        intersectingMap.delete(matchedCat.id)
      }
    })

    // 2. 在所有当前相交的 section 中，选取 offsetTop 最小（最靠近顶部）的那个
    interface TopmostEntry {
      id: string | number
      offsetTop: number
    }
    const candidates: TopmostEntry[] = Array.from(intersectingMap.entries()).map(([id, el]) => ({
      id,
      offsetTop: el.offsetTop
    }))

    if (candidates.length > 0) {
      const topmost = candidates.reduce((prev, curr) =>
        curr.offsetTop < prev.offsetTop ? curr : prev
      )
      if (activeId.value !== topmost.id) {
        activeId.value = topmost.id
        emit('update:modelValue', topmost.id)
        scrollSideToActive()
      }
    }
  }, options)

  // 注册所有 section
  Object.values(sectionRefs.value).forEach((el) => observer?.observe(el))
}

// 边界处理仍需 Scroll 监听（由于 IO 在极其快速滚动下可能跳过窄感知带）
function onContentScroll() {
  if (isScrollByClick || !props.anchor || !contentRef.value) return

  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    const container = contentRef.value
    if (!container) return

    const scrollTop = container.scrollTop

    // 特殊情况 1：回到顶部，强制高亮“全部”
    if (scrollTop < 10 && props.showAll) {
      if (activeId.value !== null) {
        activeId.value = null
        emit('update:modelValue', null)
        scrollSideToActive()
      }
    }
    // 特殊情况 2：滚到底部，强制高亮最后一项（处理末尾分类过短无法触碰顶边的情况）
    else if (scrollTop + container.clientHeight >= container.scrollHeight - 2) {
      const last = props.categories[props.categories.length - 1]
      if (last && activeId.value !== last.id) {
        activeId.value = last.id
        emit('update:modelValue', last.id)
        scrollSideToActive()
      }
    }
  })
}

function setSectionRef(el: HTMLElement | null, id: string | number) {
  if (el) sectionRefs.value[id] = el
}

// ─── 生命周期管理 ─────────────────────────────────────────────────────────────
onMounted(() => {
  if (activeId.value === null && props.categories.length > 0 && !props.showAll) {
    activeId.value = props.categories[0].id
  }

  nextTick(() => {
    initObserver()
    scrollSideToActive()
  })
})

onUnmounted(() => {
  if (scrollTimer) clearTimeout(scrollTimer)
  if (rafId) cancelAnimationFrame(rafId)
  if (observer) observer.disconnect()
})
</script>

<template>
  <div
    :class="ns.b()"
    :style="[
      themeStyle,
      {
        '--yh-category-nav-side-width': sideWidth,
        '--yh-category-nav-sub-image-size': `${subImageSize}px`,
        '--yh-category-nav-columns': columns
      }
    ]"
  >
    <!-- 左侧一级菜单 -->
    <aside ref="sideRef" :class="ns.e('side')" role="tablist" :aria-label="t('categorynav.all')">
      <!-- 全部 -->
      <button
        v-if="showAll"
        :class="[ns.e('side-item'), ns.is('active', activeId === null)]"
        role="tab"
        :aria-selected="activeId === null"
        @click="selectCategory(null)"
      >
        <slot name="all-icon" />
        <span :class="ns.e('side-name')">{{ t('categorynav.all') }}</span>
      </button>

      <!-- 加载骨架 -->
      <template v-if="loading">
        <div v-for="i in 8" :key="i" :class="[ns.e('side-item'), ns.e('skeleton')]" />
      </template>

      <template v-else>
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="[ns.e('side-item'), ns.is('active', activeId === cat.id)]"
          role="tab"
          :aria-selected="activeId === cat.id"
          @click="selectCategory(cat)"
        >
          <span v-if="cat.badge" :class="ns.e('badge')">{{ cat.badge }}</span>
          <img
            v-if="cat.image"
            :class="ns.e('side-img')"
            :src="cat.image"
            :alt="cat.name"
            loading="lazy"
          />
          <i v-else-if="cat.icon" :class="[ns.e('side-icon'), cat.icon]" aria-hidden="true" />
          <span :class="ns.e('side-name')">{{ cat.name }}</span>
        </button>
      </template>
    </aside>

    <!-- 右侧内容区 -->
    <main ref="contentRef" :class="ns.e('content')" role="tabpanel" @scroll="onContentScroll">
      <slot name="header" />

      <!-- 加载骨架 -->
      <template v-if="loading">
        <div :class="ns.e('section')">
          <div :class="ns.e('sub-grid')">
            <div v-for="i in 9" :key="i" :class="[ns.e('sub-item'), ns.e('skeleton')]" />
          </div>
        </div>
      </template>

      <!-- 普通视图：仅显示当前激活的子分类 -->
      <template v-else-if="!anchor">
        <div v-if="activeCategory" :class="ns.e('section')">
          <slot name="section-header" :category="activeCategory" />
          <div :class="ns.e('sub-grid')">
            <button
              v-for="sub in activeCategory.children ?? []"
              :key="sub.id"
              :class="[ns.e('sub-item'), ns.is('active', activeSubId === sub.id)]"
              @click="selectSub(sub, activeCategory)"
            >
              <img
                v-if="sub.image"
                :class="ns.e('sub-img')"
                :src="sub.image"
                :alt="sub.name"
                loading="lazy"
              />
              <span :class="ns.e('sub-name')">{{ sub.name }}</span>
              <span v-if="sub.count" :class="ns.e('sub-count')">{{ sub.count }}</span>
            </button>
          </div>
        </div>
        <p v-else :class="ns.e('empty')">{{ t('categorynav.noData') }}</p>
      </template>

      <!-- 锚定模式：所有分类的子项全部渲染，滚动联动 -->
      <template v-else>
        <div
          v-for="cat in categories"
          :key="cat.id"
          :ref="(el) => setSectionRef(el as HTMLElement | null, cat.id)"
          :class="ns.e('section')"
          :data-id="cat.id"
        >
          <div :class="ns.e('section-title')">
            <slot name="section-header" :category="cat">
              <span>{{ cat.name }}</span>
            </slot>
          </div>
          <div :class="ns.e('sub-grid')">
            <button
              v-for="sub in cat.children ?? []"
              :key="sub.id"
              :class="[ns.e('sub-item'), ns.is('active', activeSubId === sub.id)]"
              @click="selectSub(sub, cat)"
            >
              <slot name="sub-item" :sub="sub" :parent="cat">
                <img
                  v-if="sub.image"
                  :class="ns.e('sub-img')"
                  :src="sub.image"
                  :alt="sub.name"
                  loading="lazy"
                />
                <span :class="ns.e('sub-name')">{{ sub.name }}</span>
                <span v-if="sub.count" :class="ns.e('sub-count')">{{ sub.count }}</span>
              </slot>
            </button>
          </div>
          <slot name="section-footer" :category="cat" />
        </div>
      </template>

      <slot name="footer" />
    </main>
  </div>
</template>

<style lang="scss">
@use './category-nav.scss';
</style>
