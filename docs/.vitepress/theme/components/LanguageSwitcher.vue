<script setup lang="ts">
/**
 * LanguageSwitcher - 语言切换组件
 * @description 支持中英文切换，带动画效果
 */
import { ref, onMounted, watch } from 'vue'

type Language = 'zh-CN' | 'en-US'

const currentLang = ref<Language>('zh-CN')
const isAnimating = ref(false)

const languages = [
  { code: 'zh-CN' as const, name: '中文', flag: '🇨🇳' },
  { code: 'en-US' as const, name: 'EN', flag: '🇺🇸' }
]

// 从 localStorage 读取语言偏好
onMounted(() => {
  const savedLang = localStorage.getItem('yh-ui-lang') as Language | null
  if (savedLang && (savedLang === 'zh-CN' || savedLang === 'en-US')) {
    currentLang.value = savedLang
  }
})

// 监听语言变化
watch(currentLang, (newLang) => {
  localStorage.setItem('yh-ui-lang', newLang)
  document.documentElement.setAttribute('lang', newLang)
})

// 切换语言
const switchLanguage = (lang: Language) => {
  if (lang === currentLang.value || isAnimating.value) return

  isAnimating.value = true
  currentLang.value = lang

  // 动画结束后重置状态
  setTimeout(() => {
    isAnimating.value = false
  }, 300)
}
</script>

<template>
  <div class="lang-switcher">
    <button v-for="lang in languages" :key="lang.code" :class="[
      'lang-switcher__btn',
      { 'lang-switcher__btn--active': currentLang === lang.code }
    ]" @click="switchLanguage(lang.code)" :title="lang.name">
      <span class="lang-switcher__flag">{{ lang.flag }}</span>
      <span class="lang-switcher__text">{{ lang.name }}</span>
    </button>
    <div class="lang-switcher__indicator" :class="{ 'lang-switcher__indicator--right': currentLang === 'en-US' }" />
  </div>
</template>

<style lang="scss" scoped>
.lang-switcher {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 4px;
  margin-left: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  position: relative;
  border: 1px solid var(--vp-c-divider);

  &__btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    font-size: 13px;
    font-weight: 500;
    color: var(--vp-c-text-2);
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.25s ease;
    z-index: 1;

    &:hover {
      color: var(--vp-c-text-1);
    }

    &--active {
      color: var(--vp-c-brand-1);
    }
  }

  &__flag {
    font-size: 14px;
    line-height: 1;
  }

  &__text {
    font-size: 12px;
    font-weight: 600;
  }

  &__indicator {
    position: absolute;
    left: 4px;
    top: 4px;
    width: calc(50% - 4px);
    height: calc(100% - 8px);
    background: var(--vp-c-bg);
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;

    &--right {
      transform: translateX(100%);
    }
  }
}

.dark .lang-switcher {
  &__indicator {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
}
</style>
