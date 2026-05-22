<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { dependencyModeMeta } from '../config/dependency-mode'

const route = useRoute()

const navItems = [
  {
    to: '/dashboard',
    label: 'Control Tower',
    summary: 'workspace state and release signals'
  },
  {
    to: '/workspace',
    label: 'AI Workspace',
    summary: 'conversation, sources, artifacts'
  },
  {
    to: '/flow',
    label: 'Flow Studio',
    summary: 'orchestration route shell'
  },
  {
    to: '/operations',
    label: 'Operations',
    summary: 'queues, releases, escalations'
  },
  {
    to: '/settings',
    label: 'Settings',
    summary: 'tenant defaults and switches'
  }
]

const meta = computed(
  () => route.meta as { section?: string; title?: string; description?: string }
)
</script>

<template>
  <div class="shell">
    <aside class="shell-sidebar">
      <div class="brand-block">
        <div class="brand-mark">YH</div>
        <div>
          <strong>AI Ops Starter</strong>
          <span>{{ dependencyModeMeta.appKind }}</span>
        </div>
      </div>

      <section class="sidebar-card">
        <p class="eyebrow">Dependency mode</p>
        <strong>{{ dependencyModeMeta.displayLabel }}</strong>
        <span>{{ dependencyModeMeta.versionLine }}</span>
      </section>

      <nav class="shell-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="shell-nav-item"
          active-class="is-active"
          exact-active-class="is-active"
        >
          <strong>{{ item.label }}</strong>
          <span>{{ item.summary }}</span>
        </RouterLink>
      </nav>

      <section class="sidebar-card compact">
        <p class="eyebrow">Why this lives here</p>
        <span>
          The starter moves at monorepo speed now, then graduates into a standalone template once
          the route system and product defaults settle down.
        </span>
      </section>
    </aside>

    <div class="shell-body">
      <header class="shell-header">
        <div>
          <p class="eyebrow">{{ meta.section ?? 'Starter' }}</p>
          <h1>{{ meta.title ?? 'YH-UI Starter' }}</h1>
          <p>{{ meta.description ?? 'Consumer application shell.' }}</p>
        </div>

        <div class="shell-header-tags">
          <YhTag type="success">{{ dependencyModeMeta.headerTag }}</YhTag>
          <YhTag>apps/ai-ops-starter</YhTag>
        </div>
      </header>

      <main class="shell-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: 290px minmax(0, 1fr);
  min-height: 100vh;
}

.shell-sidebar {
  position: sticky;
  top: 0;
  display: grid;
  align-content: start;
  gap: 16px;
  height: 100vh;
  padding: 18px;
  border-right: 1px solid var(--starter-border);
  background: #fff;
  overflow-y: auto;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: linear-gradient(135deg, #1d9bf0, #5fcb4a);
  color: #fff;
  font-weight: 800;
}

.brand-block strong,
.brand-block span,
.sidebar-card strong,
.sidebar-card span {
  display: block;
}

.brand-block span,
.sidebar-card span {
  color: var(--starter-muted);
}

.sidebar-card {
  padding: 14px;
  border: 1px solid var(--starter-border);
  border-radius: 8px;
  background: var(--starter-soft);
}

.sidebar-card.compact {
  background: #fff;
}

.shell-nav {
  display: grid;
  gap: 8px;
}

.shell-nav-item {
  display: grid;
  gap: 4px;
  padding: 12px;
  border: 1px solid transparent;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.shell-nav-item strong {
  font-size: 14px;
}

.shell-nav-item span {
  color: var(--starter-muted);
  font-size: 13px;
  line-height: 1.5;
}

.shell-nav-item:hover,
.shell-nav-item.is-active {
  border-color: color-mix(in srgb, var(--starter-primary) 25%, #fff);
  background: color-mix(in srgb, var(--starter-primary) 7%, #fff);
}

.shell-body {
  min-width: 0;
  padding: 20px;
}

.shell-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.shell-header h1 {
  margin: 4px 0 8px;
  font-size: 32px;
  line-height: 1.1;
}

.shell-header p:last-child {
  max-width: 820px;
  margin: 0;
  color: var(--starter-muted);
  line-height: 1.7;
}

.shell-header-tags {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.shell-content {
  min-width: 0;
}

@media (max-width: 1100px) {
  .shell {
    grid-template-columns: 1fr;
  }

  .shell-sidebar {
    position: static;
    height: auto;
  }
}

@media (max-width: 720px) {
  .shell-body {
    padding: 16px;
  }

  .shell-header {
    flex-direction: column;
  }

  .shell-header h1 {
    font-size: 28px;
  }
}
</style>
