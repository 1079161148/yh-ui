<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { computed, ref, useSlots } from 'vue'
import {
  aiMentionProps,
  aiMentionEmits,
  type AiMentionOption,
  type AiMentionFileNode,
  type AiMentionExpose
} from './ai-mention'
import { YhMention } from '../../mention'
import { YhIcon } from '../../icon'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({
  name: 'YhAiMention'
})

const props = defineProps(aiMentionProps)
const emit = defineEmits(aiMentionEmits)
const slots = useSlots()
const forwardedSlotNames = computed(() => Object.keys(slots))

const ns = useNamespace('ai-mention')
const { t } = useLocale()
const { themeStyle } = useComponentTheme('ai-mention', props.themeOverrides)

const mentionRef = ref<InstanceType<typeof YhMention> | null>(null)

// 文件树相关状态
const fileTreeData = ref<AiMentionFileNode[]>([])
const fileTreeLoading = ref(false)
const expandedFolders = ref<Set<string>>(new Set())
const currentFileType = ref<'document' | 'table' | 'file' | 'knowledge' | null>(null)

// 防抖定时器
let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null

// 过滤选项
const filteredOptions = computed(() => {
  if (!props.types || props.types.length === 0) return props.options
  return props.options.filter((option) => !option.type || props.types.includes(option.type))
})

const handleUpdateValue = (val: string) => {
  emit('update:modelValue', val)
}

const handleSelect = (option: AiMentionOption, trigger: string) => {
  emit('select', option, trigger)
}

// 获取类型图标
const getTypeIcon = (type: string): string => {
  const iconMap: Record<string, string> = {
    document: 'document',
    table: 'grid',
    file: 'folder',
    knowledge: 'book'
  }
  return iconMap[type] || 'document'
}

// 获取类型标签
const getTypeLabel = (type: string): string => {
  const labelMap: Record<string, string> = {
    document: '文档',
    table: '表格',
    file: '文件',
    knowledge: '知识库'
  }
  return labelMap[type] || type
}

// 获取选项图标
const getOptionIcon = (type?: string): string => {
  switch (type) {
    case 'agent':
      return 'robot'
    case 'document':
      return 'document'
    case 'table':
      return 'table'
    case 'knowledge':
      return 'book'
    case 'file':
      return 'folder'
    default:
      return 'sparkles'
  }
}

const asAiMentionOption = (option: unknown): AiMentionOption => option as AiMentionOption

// 文件树面板位置（简化版本）
const fileTreePanelStyle = computed(() => ({
  position: 'fixed' as const,
  top: '200px',
  left: '100px',
  width: '320px',
  maxHeight: '400px',
  zIndex: 9999
}))

// 文件树加载
const loadFileTree = async (
  type: 'document' | 'table' | 'file' | 'knowledge',
  keyword: string = ''
) => {
  if (!props.enableFileTree) return

  fileTreeLoading.value = true
  currentFileType.value = type

  try {
    let nodes: AiMentionFileNode[] = []

    if (props.fileLoader) {
      nodes = await props.fileLoader(keyword, type)
    } else {
      nodes = generateMockFileTree(type, keyword)
    }

    fileTreeData.value = nodes
    emit('file-load', type, nodes)

    if (props.fileTreeExpandedLevel > 0) {
      nodes.forEach((node) => {
        if (node.isFolder && node.children?.length) {
          expandedFolders.value.add(node.key)
        }
      })
    }
  } catch (error) {
    console.error('Failed to load file tree:', error)
    fileTreeData.value = []
  } finally {
    fileTreeLoading.value = false
  }
}

// 生成模拟文件树数据
const generateMockFileTree = (
  type: 'document' | 'table' | 'file' | 'knowledge',
  keyword: string
): AiMentionFileNode[] => {
  const mockData: Record<string, AiMentionFileNode[]> = {
    document: [
      {
        key: 'docs',
        label: '文档',
        isFolder: true,
        path: '/docs',
        children: [
          {
            key: 'docs/readme',
            label: 'README.md',
            isFolder: false,
            path: '/docs/README.md',
            size: 2048,
            modifiedAt: Date.now() - 86400000
          },
          {
            key: 'docs/guide',
            label: '使用指南.md',
            isFolder: false,
            path: '/docs/guide.md',
            size: 5120,
            modifiedAt: Date.now() - 172800000
          },
          {
            key: 'docs/api',
            label: 'API 文档.md',
            isFolder: false,
            path: '/docs/api.md',
            size: 10240,
            modifiedAt: Date.now() - 259200000
          }
        ]
      },
      {
        key: 'contracts',
        label: '合同',
        isFolder: true,
        path: '/contracts',
        children: [
          {
            key: 'contracts/2024',
            label: '2024合同',
            isFolder: true,
            path: '/contracts/2024',
            children: [
              {
                key: 'contracts/2024/a',
                label: '合同A.pdf',
                isFolder: false,
                path: '/contracts/2024/a.pdf',
                size: 1048576,
                modifiedAt: Date.now() - 345600000
              }
            ]
          }
        ]
      },
      {
        key: 'notes',
        label: '笔记.txt',
        isFolder: false,
        path: '/notes.txt',
        size: 1024,
        modifiedAt: Date.now()
      }
    ],
    table: [
      {
        key: 'excel',
        label: 'Excel 文件',
        isFolder: true,
        path: '/excel',
        children: [
          {
            key: 'excel/sales',
            label: '销售报表.xlsx',
            isFolder: false,
            path: '/excel/sales.xlsx',
            size: 524288,
            modifiedAt: Date.now() - 86400000
          },
          {
            key: 'excel/inventory',
            label: '库存表.xlsx',
            isFolder: false,
            path: '/excel/inventory.xlsx',
            size: 262144,
            modifiedAt: Date.now() - 172800000
          }
        ]
      },
      {
        key: 'csv',
        label: 'CSV 数据',
        isFolder: true,
        path: '/csv',
        children: [
          {
            key: 'csv/users',
            label: '用户数据.csv',
            isFolder: false,
            path: '/csv/users.csv',
            size: 4096,
            modifiedAt: Date.now()
          }
        ]
      }
    ],
    knowledge: [
      {
        key: 'kb',
        label: '知识库',
        isFolder: true,
        path: '/knowledge',
        children: [
          {
            key: 'kb/faq',
            label: '常见问题',
            isFolder: false,
            path: '/knowledge/faq',
            size: 8192,
            modifiedAt: Date.now() - 259200000
          },
          {
            key: 'kb/product',
            label: '产品知识',
            isFolder: false,
            path: '/knowledge/product',
            size: 12288,
            modifiedAt: Date.now() - 432000000
          }
        ]
      },
      {
        key: 'wiki',
        label: 'Wiki',
        isFolder: true,
        path: '/wiki',
        children: [
          {
            key: 'wiki/tech',
            label: '技术文档',
            isFolder: false,
            path: '/wiki/tech',
            size: 20480,
            modifiedAt: Date.now() - 604800000
          }
        ]
      }
    ],
    file: [
      {
        key: 'root',
        label: '全部文件',
        isFolder: true,
        path: '/',
        children: [
          {
            key: 'images',
            label: '图片',
            isFolder: true,
            path: '/images',
            children: [
              {
                key: 'images/logo',
                label: 'logo.png',
                isFolder: false,
                path: '/images/logo.png',
                size: 25600,
                modifiedAt: Date.now() - 86400000
              }
            ]
          },
          {
            key: 'videos',
            label: '视频',
            isFolder: true,
            path: '/videos',
            children: [
              {
                key: 'videos/demo',
                label: 'demo.mp4',
                isFolder: false,
                path: '/videos/demo.mp4',
                size: 104857600,
                modifiedAt: Date.now() - 172800000
              }
            ]
          }
        ]
      }
    ]
  }

  let data = mockData[type] || []

  if (keyword) {
    const filterNodes = (nodes: AiMentionFileNode[]): AiMentionFileNode[] => {
      const result: AiMentionFileNode[] = []
      for (const node of nodes) {
        if (node.label.toLowerCase().includes(keyword.toLowerCase())) {
          result.push(node)
        } else if (node.children) {
          const filteredChildren = filterNodes(node.children)
          if (filteredChildren.length > 0) {
            result.push({ ...node, children: filteredChildren })
          }
        }
      }
      return result
    }
    data = filterNodes(data)
  }

  return data
}

// 处理搜索
const handleSearch = (keyword: string, trigger: string) => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }

  if (trigger === '@' && props.enableFileTree) {
    const typeMap: Record<string, 'document' | 'table' | 'file' | 'knowledge'> = {
      文档: 'document',
      文件: 'file',
      表格: 'table',
      知识库: 'knowledge'
    }

    const raw = (keyword || '').trimStart()
    for (const [key, type] of Object.entries(typeMap)) {
      // 仅当用户输入 "@文档/@文件/@表格/@知识库" 等前缀时才触发文件树
      if (raw.startsWith(key)) {
        const rest = raw.slice(key.length).trim()
        searchDebounceTimer = setTimeout(() => {
          loadFileTree(type, rest)
        }, props.searchDebounce)
        emit('search', keyword, trigger)
        return
      }
    }

    // 未命中文件树前缀时，清空文件树状态，避免一直悬浮显示
    currentFileType.value = null
    fileTreeData.value = []
  }

  emit('search', keyword, trigger)
}

// 展开/折叠文件夹
const toggleFolder = (key: string) => {
  if (expandedFolders.value.has(key)) {
    expandedFolders.value.delete(key)
  } else {
    expandedFolders.value.add(key)
  }
}

const isFolderExpanded = (key: string) => expandedFolders.value.has(key)

// 选中文件节点
const handleFileSelect = (node: AiMentionFileNode) => {
  if (node.isFolder) {
    toggleFolder(node.key)
    return
  }

  const option: AiMentionOption = {
    value: node.path,
    label: node.label,
    type: currentFileType.value as AiMentionOption['type'],
    path: node.path,
    size: node.size,
    modifiedAt: node.modifiedAt,
    icon: getFileIcon(node)
  }

  emit('select', option, '@')
  emit('file-select', node, option)
}

// 获取文件图标
const getFileIcon = (node: AiMentionFileNode): string => {
  if (node.isFolder) return 'folder'
  if (node.icon) return node.icon

  const ext = node.path.split('.').pop()?.toLowerCase() || ''
  const iconMap: Record<string, string> = {
    pdf: 'file-pdf',
    doc: 'file-word',
    docx: 'file-word',
    xlsx: 'file-excel',
    xls: 'file-excel',
    csv: 'file-excel',
    txt: 'document',
    md: 'document',
    png: 'picture',
    jpg: 'picture',
    jpeg: 'picture',
    gif: 'picture',
    mp4: 'video-play',
    mp3: 'headset'
  }

  return iconMap[ext] || 'document'
}

const formatFileSizeFn = (size?: number) => {
  if (!size) return ''
  return props.formatFileSize(size)
}

const formatTimeFn = (timestamp?: number) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  if (diff < 86400000) {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }
  if (diff < 604800000) {
    return Math.floor(diff / 86400000) + '天前'
  }
  return date.toLocaleDateString('zh-CN')
}

const showFileTree = computed(() => {
  return props.enableFileTree && currentFileType.value !== null && fileTreeData.value.length > 0
})

const refreshFileTree = () => {
  if (currentFileType.value) {
    loadFileTree(currentFileType.value)
  }
}

defineExpose<AiMentionExpose>({
  focus: () => mentionRef.value?.focus(),
  blur: () => mentionRef.value?.blur(),
  clear: () => mentionRef.value?.clear(),
  getRef: () => mentionRef.value?.ref,
  insertMention: (option: AiMentionOption, trigger?: string) =>
    mentionRef.value?.insertMention(option, trigger),
  refreshFileTree,
  toggleFolder: (key: string) => toggleFolder(key)
})
</script>

<template>
  <div :class="ns.b()" :style="themeStyle">
    <YhMention
      ref="mentionRef"
      v-bind="$attrs"
      :model-value="modelValue"
      :options="filteredOptions"
      :triggers="triggers"
      :type="type"
      :placeholder="placeholder || t('ai.mention.placeholder')"
      :disabled="disabled"
      :size="size"
      :loading="loading || fileTreeLoading"
      :filter-option="filterOption"
      :maxlength="maxLength"
      :rows="rows"
      @update:model-value="handleUpdateValue"
      @select="handleSelect"
      @search="handleSearch"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @input="emit('input', $event)"
      @keydown="emit('keydown', $event)"
    >
      <template #option="{ option }">
        <div :class="ns.e('option-item')">
          <div
            :class="[
              ns.e('option-icon'),
              asAiMentionOption(option).type
                ? ns.em('option-icon', asAiMentionOption(option).type)
                : ''
            ]"
          >
            <YhIcon
              :name="
                asAiMentionOption(option).icon || getOptionIcon(asAiMentionOption(option).type)
              "
            />
          </div>
          <div :class="ns.e('option-info')">
            <div :class="ns.e('option-label')">
              {{ asAiMentionOption(option).label || asAiMentionOption(option).value }}
            </div>
            <div v-if="asAiMentionOption(option).description" :class="ns.e('option-desc')">
              {{ asAiMentionOption(option).description }}
            </div>
          </div>
          <div
            v-if="asAiMentionOption(option).type"
            :class="[ns.e('option-tag'), ns.em('option-tag', asAiMentionOption(option).type)]"
          >
            {{
              t(`ai.mention.${asAiMentionOption(option).type}`) || asAiMentionOption(option).type
            }}
          </div>
        </div>
      </template>

      <template v-for="name in forwardedSlotNames" :key="name" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </YhMention>

    <!-- 文件树面板 -->
    <Teleport to="body">
      <Transition name="yh-fade-in-scale-up">
        <div v-if="showFileTree" :class="ns.e('file-tree-panel')" :style="fileTreePanelStyle">
          <div :class="ns.e('file-tree-header')">
            <YhIcon :name="getTypeIcon(currentFileType!)" />
            <span>{{ getTypeLabel(currentFileType!) }}</span>
            <span :class="ns.e('file-tree-count')">{{ fileTreeData.length }}</span>
          </div>
          <div :class="ns.e('file-tree-content')">
            <div :class="ns.e('file-tree-list')">
              <template v-for="node in fileTreeData" :key="node.key">
                <div
                  :class="[
                    ns.e('file-tree-node'),
                    ns.is('folder', node.isFolder),
                    ns.is('expanded', isFolderExpanded(node.key))
                  ]"
                  @click="handleFileSelect(node)"
                >
                  <span
                    v-if="node.isFolder"
                    :class="ns.e('folder-toggle')"
                    @click.stop="toggleFolder(node.key)"
                  >
                    <YhIcon :name="isFolderExpanded(node.key) ? 'chevron-down' : 'chevron-right'" />
                  </span>
                  <span v-else :class="ns.e('file-tree-indent')"></span>

                  <YhIcon
                    v-if="showFileIcon"
                    :name="getFileIcon(node)"
                    :class="ns.e('file-tree-icon')"
                  />

                  <span :class="ns.e('file-tree-label')">{{ node.label }}</span>

                  <span v-if="showFileSize && !node.isFolder" :class="ns.e('file-tree-size')">
                    {{ formatFileSizeFn(node.size) }}
                  </span>

                  <span v-if="showModifiedTime && !node.isFolder" :class="ns.e('file-tree-time')">
                    {{ formatTimeFn(node.modifiedAt) }}
                  </span>
                </div>

                <template v-if="node.isFolder && node.children && isFolderExpanded(node.key)">
                  <div
                    v-for="child in node.children"
                    :key="child.key"
                    :class="[
                      ns.e('file-tree-node'),
                      ns.e('file-tree-child'),
                      ns.is('folder', child.isFolder)
                    ]"
                    @click="handleFileSelect(child)"
                  >
                    <span :class="ns.e('file-tree-indent')"></span>
                    <span :class="ns.e('file-tree-indent')"></span>

                    <YhIcon
                      v-if="showFileIcon"
                      :name="getFileIcon(child)"
                      :class="ns.e('file-tree-icon')"
                    />

                    <span :class="ns.e('file-tree-label')">{{ child.label }}</span>

                    <span v-if="showFileSize && !child.isFolder" :class="ns.e('file-tree-size')">
                      {{ formatFileSizeFn(child.size) }}
                    </span>

                    <span
                      v-if="showModifiedTime && !child.isFolder"
                      :class="ns.e('file-tree-time')"
                    >
                      {{ formatTimeFn(child.modifiedAt) }}
                    </span>
                  </div>
                </template>
              </template>

              <div
                v-if="fileTreeData.length === 0 && !fileTreeLoading"
                :class="ns.e('file-tree-empty')"
              >
                <YhIcon name="folder-opened" />
                <span>{{ t('ai.mention.noFiles') }}</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use './ai-mention.scss';
</style>
