<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { ref, computed } from 'vue'
import { aiSourcesProps, aiSourcesEmits, type AiSourceItem } from './ai-sources'
import { YhIcon } from '../../icon'
import { YhTooltip } from '../../tooltip'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({
  name: 'YhAiSources'
})

const props = defineProps(aiSourcesProps)
const emit = defineEmits(aiSourcesEmits)
const ns = useNamespace('ai-sources')
const { t } = useLocale()
const { themeStyle } = useComponentTheme('ai-sources', props.themeOverrides)

const isExpanded = ref(false)
const drawerVisible = ref(false)
const activeSource = ref<AiSourceItem | null>(null)

// 文件类型图标映射 - 对应内置图标库中的名称
const fileTypeIcons: Record<string, string> = {
  web: 'globe',
  pdf: 'file-pdf',
  doc: 'file-word',
  xlsx: 'file-excel',
  ppt: 'presentation',
  txt: 'file-txt',
  code: 'code',
  default: 'document'
}

const getFileIcon = (type?: string) => fileTypeIcons[type ?? 'default'] ?? fileTypeIcons.default

const scoreColor = (score?: number) => {
  if (!score) return 'var(--yh-text-color-disabled)'
  if (score >= 0.8) return 'var(--yh-color-success)'
  if (score >= 0.6) return 'var(--yh-color-primary)'
  if (score >= 0.4) return 'var(--yh-color-warning)'
  return 'var(--yh-color-danger)'
}

const visibleSources = computed(() => {
  if (isExpanded.value || props.sources.length <= props.maxVisible) {
    return props.sources
  }
  return props.sources.slice(0, props.maxVisible)
})

const handleClick = (source: AiSourceItem) => {
  emit('click', source)
  if (props.mode === 'badge') {
    activeSource.value = source
    drawerVisible.value = true
  }
}

const handleOpen = (e: MouseEvent, source: AiSourceItem) => {
  e.stopPropagation()
  emit('open', source)
  if (source.url) window.open(source.url, '_blank', 'noopener')
}

const openDrawer = (source: AiSourceItem) => {
  activeSource.value = source
  drawerVisible.value = true
}
</script>

<template>
  <div :class="[ns.b(), ns.m(mode)]" :style="themeStyle">
    <!-- ── badge 模式：仅显示角标 ── -->
    <template v-if="mode === 'badge'">
      <div :class="ns.e('badge-row')">
        <button
          v-for="source in sources"
          :key="source.id"
          :class="ns.e('badge')"
          :title="source.title"
          @click="openDrawer(source)"
        >
          <YhIcon v-if="showFileType" :name="getFileIcon(source.fileType)" />
          {{ source.id }}
        </button>
      </div>

      <!-- 抽屉：来源详情 -->
      <Teleport to="body">
        <Transition name="yh-slide-right">
          <div v-if="drawerVisible" :class="ns.e('drawer')">
            <div :class="ns.e('drawer-header')">
              <span :class="ns.e('drawer-title')">
                <YhIcon name="document" />
                {{ t('ai.sources.drawerTitle') || '参考来源' }}
              </span>
              <button :class="ns.e('drawer-close')" @click="drawerVisible = false">
                <YhIcon name="close" />
              </button>
            </div>
            <div :class="ns.e('drawer-content')">
              <div
                v-for="source in sources"
                :key="source.id"
                :class="[ns.e('source-card'), ns.is('active', activeSource?.id === source.id)]"
                @click="handleClick(source)"
              >
                <div :class="ns.e('card-header')">
                  <div :class="ns.e('card-title-row')">
                    <YhIcon :name="getFileIcon(source.fileType)" :class="ns.e('file-icon')" />
                    <span :class="ns.e('card-title')">{{ source.title }}</span>
                  </div>
                  <div :class="ns.e('card-meta')">
                    <span v-if="source.source" :class="ns.e('source-name')">{{
                      source.source
                    }}</span>
                    <span
                      v-if="showScore && source.score !== undefined"
                      :class="ns.e('score-badge')"
                      :style="{ color: scoreColor(source.score) }"
                    >
                      {{ Math.round(source.score * 100) }}%
                      {{ t('ai.sources.relevant') || '相关度' }}
                    </span>
                  </div>
                </div>
                <p v-if="source.excerpt" :class="ns.e('excerpt')">{{ source.excerpt }}</p>
                <button
                  v-if="source.url"
                  :class="ns.e('open-btn')"
                  @click="handleOpen($event, source)"
                >
                  <YhIcon name="arrow-right" />
                  {{ t('ai.sources.viewOriginal') || '查看原文' }}
                </button>
              </div>
            </div>
          </div>
        </Transition>

        <!-- 遮罩 -->
        <Transition name="yh-fade">
          <div
            v-if="drawerVisible"
            :class="ns.e('drawer-overlay')"
            @click="drawerVisible = false"
          ></div>
        </Transition>
      </Teleport>
    </template>

    <!-- ── inline 模式：内联气泡列表 ── -->
    <template v-else-if="mode === 'inline'">
      <div :class="ns.e('inline-header')">
        <YhIcon name="document" />
        <span>{{ sources.length }} {{ t('ai.sources.references') || '条参考来源' }}</span>
      </div>
      <div :class="ns.e('inline-list')">
        <YhTooltip
          v-for="source in visibleSources"
          :key="source.id"
          placement="top"
          effect="light"
          :disabled="!source.excerpt"
          tabindex="-1"
          popper-class="yh-ai-sources__tooltip-popper"
        >
          <div :class="ns.e('inline-item')" @click="handleClick(source)">
            <span :class="ns.e('inline-index')">{{ source.id }}</span>
            <YhIcon
              v-if="showFileType"
              :name="getFileIcon(source.fileType)"
              :class="ns.e('file-icon')"
            />
            <span :class="ns.e('inline-title')">{{ source.title }}</span>
            <span
              v-if="showScore && source.score !== undefined"
              :class="ns.e('inline-score')"
              :style="{ color: scoreColor(source.score) }"
            >
              {{ Math.round(source.score * 100) }}%
            </span>
            <button
              v-if="source.url"
              :class="ns.e('inline-open')"
              @click.stop="handleOpen($event, source)"
            >
              <YhIcon name="launch" />
            </button>
          </div>

          <template #content>
            <div :class="ns.e('tooltip-content')">
              <div :class="ns.e('tooltip-header')">
                <div :class="ns.e('tooltip-title-wrap')">
                  <YhIcon :name="getFileIcon(source.fileType)" />
                  <span :class="ns.e('tooltip-title')">{{ source.title }}</span>
                </div>
                <span
                  v-if="showScore && source.score !== undefined"
                  :class="ns.e('tooltip-score')"
                  :style="{ color: scoreColor(source.score) }"
                >
                  {{ Math.round(source.score * 100) }}%
                </span>
              </div>
              <p v-if="source.excerpt" :class="ns.e('tooltip-excerpt')">{{ source.excerpt }}</p>
              <div v-if="source.source" :class="ns.e('tooltip-source')">
                <YhIcon name="globe" /> {{ source.source }}
              </div>
            </div>
          </template>
        </YhTooltip>

        <!-- 展开更多 -->
        <button
          v-if="!isExpanded && sources.length > maxVisible"
          :class="ns.e('expand-btn')"
          @click="isExpanded = true"
        >
          +{{ sources.length - maxVisible }} {{ t('ai.sources.more') || '更多来源' }}
          <YhIcon name="arrow-down" />
        </button>
      </div>
    </template>

    <!-- ── card 模式：完整卡片列表 ── -->
    <template v-else>
      <div :class="ns.e('card-list-header')">
        <YhIcon name="document" />
        <span>{{ t('ai.sources.referencedSources') || '引用来源' }}</span>
        <span :class="ns.e('count-badge')">{{ sources.length }}</span>
      </div>
      <div :class="ns.e('card-list')">
        <div
          v-for="source in visibleSources"
          :key="source.id"
          :class="ns.e('source-card')"
          @click="handleClick(source)"
        >
          <div :class="ns.e('card-header')">
            <div :class="ns.e('card-title-row')">
              <YhIcon :name="getFileIcon(source.fileType)" :class="ns.e('file-icon')" />
              <span :class="ns.e('card-title')">{{ source.title }}</span>
            </div>
            <div :class="ns.e('card-meta')">
              <span v-if="source.source" :class="ns.e('source-name')">{{ source.source }}</span>
              <span
                v-if="showScore && source.score !== undefined"
                :class="ns.e('score-badge')"
                :style="{ color: scoreColor(source.score) }"
              >
                {{ Math.round(source.score * 100) }}% {{ t('ai.sources.relevant') || '相关度' }}
              </span>
            </div>
          </div>
          <p v-if="source.excerpt" :class="ns.e('excerpt')">{{ source.excerpt }}</p>
          <button v-if="source.url" :class="ns.e('open-btn')" @click="handleOpen($event, source)">
            <YhIcon name="arrow-right" />
            {{ t('ai.sources.viewOriginal') || '查看原文' }}
          </button>
        </div>

        <button
          v-if="!isExpanded && sources.length > maxVisible"
          :class="ns.e('expand-btn')"
          @click="isExpanded = true"
        >
          {{ t('ai.sources.showAll') || '显示全部' }} ({{ sources.length }})
          <YhIcon name="arrow-down" />
        </button>
      </div>
    </template>

    <!-- 额外插槽 -->
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use './ai-sources.scss';
</style>
