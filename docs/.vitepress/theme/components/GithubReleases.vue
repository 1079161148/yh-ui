<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface GitHubRelease {
  tag_name: string
  name: string | null
  html_url: string
  published_at: string | null
  prerelease: boolean
  draft: boolean
  body: string | null
  author?: {
    login: string
  } | null
}

const props = withDefaults(
  defineProps<{
    locale?: 'zh' | 'en'
  }>(),
  {
    locale: 'zh'
  }
)

const repo = '1079161148/yh-ui'
const releasesUrl = `https://github.com/${repo}/releases`
const apiUrl = `https://api.github.com/repos/${repo}/releases?per_page=30`

const releases = ref<GitHubRelease[]>([])
const selectedTag = ref('')
const loading = ref(true)
const error = ref('')

const text = computed(() => {
  if (props.locale === 'en') {
    return {
      latest: 'Latest release',
      description:
        'YH-UI release notes are maintained in GitHub Releases. This page shows the latest public release records from the repository instead of duplicating changelog content in the docs.',
      external: 'Open GitHub Releases',
      open: 'Open release',
      select: 'Select version',
      publisher: 'Publisher',
      fallback: 'Unable to load GitHub Releases right now. Please open the release page directly.',
      empty: 'No release notes have been published yet.'
    }
  }

  return {
    latest: '最新版本',
    description:
      'YH-UI 的版本说明统一维护在 GitHub Releases 中。本页面从仓库读取最近的公开发布记录，文档站不再重复维护更新日志内容。',
    external: '打开 GitHub Releases',
    open: '打开链接',
    select: '选择版本',
    publisher: '发布者',
    fallback: '暂时无法读取 GitHub Releases，请直接打开发布页面查看。',
    empty: '还没有公开发布记录。'
  }
})

const selectedRelease = computed(() => {
  return (
    releases.value.find((release) => release.tag_name === selectedTag.value) ?? releases.value[0]
  )
})

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderInline(value: string) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>'
    )
    .replace(/#(\d+)/g, '<span class="release-issue">#$1</span>')
}

function renderMarkdown(markdown: string | null) {
  const source = markdown?.trim()
  if (!source) return `<p>${text.value.empty}</p>`

  const lines = source.split(/\r?\n/)
  const html: string[] = []
  let inList = false

  const closeList = () => {
    if (!inList) return
    html.push('</ul>')
    inList = false
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      closeList()
      continue
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/)
    if (heading) {
      closeList()
      const level = Math.min(heading[1].length + 1, 5)
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`)
      continue
    }

    const bullet = line.match(/^[-*]\s+(.+)$/)
    if (bullet) {
      if (!inList) {
        html.push('<ul>')
        inList = true
      }
      html.push(`<li>${renderInline(bullet[1])}</li>`)
      continue
    }

    closeList()
    html.push(`<p>${renderInline(line)}</p>`)
  }

  closeList()
  return html.join('\n')
}

function formatDate(value: string | null) {
  if (!value) return ''

  return new Intl.DateTimeFormat(props.locale === 'en' ? 'en-US' : 'zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value))
}

onMounted(async () => {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/vnd.github+json'
      }
    })

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`)
    }

    releases.value = ((await response.json()) as GitHubRelease[]).filter(
      (release) => !release.draft
    )
    selectedTag.value = releases.value[0]?.tag_name ?? ''
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="github-releases">
    <div class="release-intro">
      <p>{{ text.description }}</p>
      <a :href="releasesUrl" target="_blank" rel="noreferrer">
        {{ text.external }}
      </a>
    </div>

    <div v-if="loading" class="release-card release-muted"> Loading GitHub Releases... </div>

    <div v-else-if="error" class="release-card release-muted">
      <p>{{ text.fallback }}</p>
      <a :href="releasesUrl" target="_blank" rel="noreferrer">{{ releasesUrl }}</a>
    </div>

    <div v-else-if="selectedRelease" class="release-panel">
      <div class="release-toolbar">
        <label>
          <span>{{ text.select }}</span>
          <select v-model="selectedTag">
            <option v-for="release in releases" :key="release.tag_name" :value="release.tag_name">
              {{ release.name || release.tag_name }}
            </option>
          </select>
        </label>
      </div>

      <article class="release-card">
        <header class="release-header">
          <div>
            <p class="release-meta">
              {{ text.publisher }}
              <strong>{{ selectedRelease.author?.login || 'GitHub' }}</strong>
              <span v-if="selectedRelease.published_at">
                {{ formatDate(selectedRelease.published_at) }}
              </span>
            </p>
            <h2>
              {{ selectedRelease.name || selectedRelease.tag_name }}
              <span v-if="selectedRelease.prerelease">Pre-release</span>
              <span v-else>{{ text.latest }}</span>
            </h2>
          </div>
          <a :href="selectedRelease.html_url" target="_blank" rel="noreferrer">
            {{ text.open }}
          </a>
        </header>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="release-body" v-html="renderMarkdown(selectedRelease.body)" />
      </article>
    </div>
  </section>
</template>

<style scoped>
.github-releases {
  margin-top: 24px;
}

.release-intro {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}

.release-intro p {
  margin: 0;
  color: var(--vp-c-text-2);
}

.release-intro a,
.release-header a,
.release-muted a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: none;
}

.release-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.release-toolbar label {
  display: flex;
  gap: 10px;
  align-items: center;
  color: var(--vp-c-text-2);
}

.release-toolbar select {
  min-width: 200px;
  height: 34px;
  padding: 0 32px 0 12px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.release-card {
  overflow: hidden;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.release-muted {
  padding: 18px 20px;
  color: var(--vp-c-text-2);
}

.release-header {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.release-header h2 {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 6px 0 0;
  border-top: 0;
  padding-top: 0;
}

.release-header h2 span {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 600;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 999px;
}

.release-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  color: var(--vp-c-text-2);
}

.release-body {
  padding: 22px 20px;
}

.release-body :deep(h3),
.release-body :deep(h4),
.release-body :deep(h5) {
  margin: 24px 0 12px;
  border-top: 0;
  padding-top: 0;
}

.release-body :deep(p),
.release-body :deep(li) {
  line-height: 1.75;
}

.release-body :deep(code) {
  padding: 2px 6px;
  background: var(--vp-c-default-soft);
  border-radius: 4px;
}

.release-body :deep(.release-issue) {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

@media (max-width: 640px) {
  .release-intro,
  .release-header {
    flex-direction: column;
  }

  .release-toolbar {
    justify-content: stretch;
  }

  .release-toolbar label,
  .release-toolbar select {
    width: 100%;
  }
}
</style>
