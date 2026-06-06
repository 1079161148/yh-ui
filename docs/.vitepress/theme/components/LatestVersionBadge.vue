<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import rootPackage from '../../../../package.json'

const { lang } = useData()

const label = computed(() => (lang.value === 'en-US' ? 'Latest' : '最新版本'))
</script>

<template>
  <span class="latest-version-badge" :aria-label="`${label} ${rootPackage.version}`">
    <span>{{ label }}</span>
    <strong>v{{ rootPackage.version }}</strong>
  </span>
</template>

<style scoped>
.latest-version-badge {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  margin-left: 10px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
  background: var(--vp-c-default-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  cursor: default;
}

.latest-version-badge strong {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

@media (max-width: 768px) {
  .latest-version-badge span {
    display: none;
  }
}
</style>
