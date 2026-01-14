<script setup lang="ts">
/**
 * BackToTop - 返回顶部按钮组件
 * @description 当页面滚动超过一定距离时显示，点击可平滑滚动到顶部
 */
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

const handleScroll = () => {
  visible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="back-to-top">
    <button v-show="visible" class="back-to-top" @click="scrollToTop" title="返回顶部">
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
      </svg>
    </button>
  </Transition>
</template>

<style lang="scss" scoped>
.back-to-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  color: var(--vp-c-text-2);
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;

  &:hover {
    color: var(--vp-c-brand-1);
    background: var(--vp-c-brand-soft);
    border-color: var(--vp-c-brand-1);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(64, 158, 255, 0.35);
  }

  &:active {
    transform: translateY(-2px);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateY(-2px);
  }
}

/* 过渡动画 */
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .back-to-top {
    right: 16px;
    bottom: 16px;
    width: 40px;
    height: 40px;
  }
}
</style>
