<script setup>
import { useNamespace, useLocale } from "@yh-ui/hooks";
import { computed, ref, useSlots } from "vue";
import {
  aiMentionProps,
  aiMentionEmits
} from "./ai-mention";
import { YhMention } from "../../mention";
import { YhIcon } from "../../icon";
import { useComponentTheme } from "@yh-ui/theme";
defineOptions({
  name: "YhAiMention"
});
const props = defineProps(aiMentionProps);
const emit = defineEmits(aiMentionEmits);
const slots = useSlots();
const forwardedSlotNames = computed(() => Object.keys(slots));
const ns = useNamespace("ai-mention");
const { t } = useLocale();
const { themeStyle } = useComponentTheme("ai-mention", props.themeOverrides);
const mentionRef = ref(null);
const fileTreeData = ref([]);
const fileTreeLoading = ref(false);
const expandedFolders = ref(/* @__PURE__ */ new Set());
const currentFileType = ref(null);
let searchDebounceTimer = null;
const filteredOptions = computed(() => {
  if (!props.types || props.types.length === 0) return props.options;
  return props.options.filter((option) => !option.type || props.types.includes(option.type));
});
const handleUpdateValue = (val) => {
  emit("update:modelValue", val);
};
const handleSelect = (option, trigger) => {
  emit("select", option, trigger);
};
const getTypeIcon = (type) => {
  const iconMap = {
    document: "document",
    table: "grid",
    file: "folder",
    knowledge: "book"
  };
  return iconMap[type] || "document";
};
const getTypeLabel = (type) => {
  const labelMap = {
    document: "\u6587\u6863",
    table: "\u8868\u683C",
    file: "\u6587\u4EF6",
    knowledge: "\u77E5\u8BC6\u5E93"
  };
  return labelMap[type] || type;
};
const getOptionIcon = (type) => {
  switch (type) {
    case "agent":
      return "robot";
    case "document":
      return "document";
    case "table":
      return "table";
    case "knowledge":
      return "book";
    case "file":
      return "folder";
    default:
      return "sparkles";
  }
};
const asAiMentionOption = (option) => option;
const fileTreePanelStyle = computed(() => ({
  position: "fixed",
  top: "200px",
  left: "100px",
  width: "320px",
  maxHeight: "400px",
  zIndex: 9999
}));
const loadFileTree = async (type, keyword = "") => {
  if (!props.enableFileTree) return;
  fileTreeLoading.value = true;
  currentFileType.value = type;
  try {
    let nodes = [];
    if (props.fileLoader) {
      nodes = await props.fileLoader(keyword, type);
    } else {
      nodes = generateMockFileTree(type, keyword);
    }
    fileTreeData.value = nodes;
    emit("file-load", type, nodes);
    if (props.fileTreeExpandedLevel > 0) {
      nodes.forEach((node) => {
        if (node.isFolder && node.children?.length) {
          expandedFolders.value.add(node.key);
        }
      });
    }
  } catch (error) {
    console.error("Failed to load file tree:", error);
    fileTreeData.value = [];
  } finally {
    fileTreeLoading.value = false;
  }
};
const generateMockFileTree = (type, keyword) => {
  const mockData = {
    document: [
      {
        key: "docs",
        label: "\u6587\u6863",
        isFolder: true,
        path: "/docs",
        children: [
          {
            key: "docs/readme",
            label: "README.md",
            isFolder: false,
            path: "/docs/README.md",
            size: 2048,
            modifiedAt: Date.now() - 864e5
          },
          {
            key: "docs/guide",
            label: "\u4F7F\u7528\u6307\u5357.md",
            isFolder: false,
            path: "/docs/guide.md",
            size: 5120,
            modifiedAt: Date.now() - 1728e5
          },
          {
            key: "docs/api",
            label: "API \u6587\u6863.md",
            isFolder: false,
            path: "/docs/api.md",
            size: 10240,
            modifiedAt: Date.now() - 2592e5
          }
        ]
      },
      {
        key: "contracts",
        label: "\u5408\u540C",
        isFolder: true,
        path: "/contracts",
        children: [
          {
            key: "contracts/2024",
            label: "2024\u5408\u540C",
            isFolder: true,
            path: "/contracts/2024",
            children: [
              {
                key: "contracts/2024/a",
                label: "\u5408\u540CA.pdf",
                isFolder: false,
                path: "/contracts/2024/a.pdf",
                size: 1048576,
                modifiedAt: Date.now() - 3456e5
              }
            ]
          }
        ]
      },
      {
        key: "notes",
        label: "\u7B14\u8BB0.txt",
        isFolder: false,
        path: "/notes.txt",
        size: 1024,
        modifiedAt: Date.now()
      }
    ],
    table: [
      {
        key: "excel",
        label: "Excel \u6587\u4EF6",
        isFolder: true,
        path: "/excel",
        children: [
          {
            key: "excel/sales",
            label: "\u9500\u552E\u62A5\u8868.xlsx",
            isFolder: false,
            path: "/excel/sales.xlsx",
            size: 524288,
            modifiedAt: Date.now() - 864e5
          },
          {
            key: "excel/inventory",
            label: "\u5E93\u5B58\u8868.xlsx",
            isFolder: false,
            path: "/excel/inventory.xlsx",
            size: 262144,
            modifiedAt: Date.now() - 1728e5
          }
        ]
      },
      {
        key: "csv",
        label: "CSV \u6570\u636E",
        isFolder: true,
        path: "/csv",
        children: [
          {
            key: "csv/users",
            label: "\u7528\u6237\u6570\u636E.csv",
            isFolder: false,
            path: "/csv/users.csv",
            size: 4096,
            modifiedAt: Date.now()
          }
        ]
      }
    ],
    knowledge: [
      {
        key: "kb",
        label: "\u77E5\u8BC6\u5E93",
        isFolder: true,
        path: "/knowledge",
        children: [
          {
            key: "kb/faq",
            label: "\u5E38\u89C1\u95EE\u9898",
            isFolder: false,
            path: "/knowledge/faq",
            size: 8192,
            modifiedAt: Date.now() - 2592e5
          },
          {
            key: "kb/product",
            label: "\u4EA7\u54C1\u77E5\u8BC6",
            isFolder: false,
            path: "/knowledge/product",
            size: 12288,
            modifiedAt: Date.now() - 432e6
          }
        ]
      },
      {
        key: "wiki",
        label: "Wiki",
        isFolder: true,
        path: "/wiki",
        children: [
          {
            key: "wiki/tech",
            label: "\u6280\u672F\u6587\u6863",
            isFolder: false,
            path: "/wiki/tech",
            size: 20480,
            modifiedAt: Date.now() - 6048e5
          }
        ]
      }
    ],
    file: [
      {
        key: "root",
        label: "\u5168\u90E8\u6587\u4EF6",
        isFolder: true,
        path: "/",
        children: [
          {
            key: "images",
            label: "\u56FE\u7247",
            isFolder: true,
            path: "/images",
            children: [
              {
                key: "images/logo",
                label: "logo.png",
                isFolder: false,
                path: "/images/logo.png",
                size: 25600,
                modifiedAt: Date.now() - 864e5
              }
            ]
          },
          {
            key: "videos",
            label: "\u89C6\u9891",
            isFolder: true,
            path: "/videos",
            children: [
              {
                key: "videos/demo",
                label: "demo.mp4",
                isFolder: false,
                path: "/videos/demo.mp4",
                size: 104857600,
                modifiedAt: Date.now() - 1728e5
              }
            ]
          }
        ]
      }
    ]
  };
  let data = mockData[type] || [];
  if (keyword) {
    const filterNodes = (nodes) => {
      const result = [];
      for (const node of nodes) {
        if (node.label.toLowerCase().includes(keyword.toLowerCase())) {
          result.push(node);
        } else if (node.children) {
          const filteredChildren = filterNodes(node.children);
          if (filteredChildren.length > 0) {
            result.push({ ...node, children: filteredChildren });
          }
        }
      }
      return result;
    };
    data = filterNodes(data);
  }
  return data;
};
const handleSearch = (keyword, trigger) => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }
  if (trigger === "@" && props.enableFileTree) {
    const typeMap = {
      \u6587\u6863: "document",
      \u6587\u4EF6: "file",
      \u8868\u683C: "table",
      \u77E5\u8BC6\u5E93: "knowledge"
    };
    const raw = (keyword || "").trimStart();
    for (const [key, type] of Object.entries(typeMap)) {
      if (raw.startsWith(key)) {
        const rest = raw.slice(key.length).trim();
        searchDebounceTimer = setTimeout(() => {
          loadFileTree(type, rest);
        }, props.searchDebounce);
        emit("search", keyword, trigger);
        return;
      }
    }
    currentFileType.value = null;
    fileTreeData.value = [];
  }
  emit("search", keyword, trigger);
};
const toggleFolder = (key) => {
  if (expandedFolders.value.has(key)) {
    expandedFolders.value.delete(key);
  } else {
    expandedFolders.value.add(key);
  }
};
const isFolderExpanded = (key) => expandedFolders.value.has(key);
const handleFileSelect = (node) => {
  if (node.isFolder) {
    toggleFolder(node.key);
    return;
  }
  const option = {
    value: node.path,
    label: node.label,
    type: currentFileType.value,
    path: node.path,
    size: node.size,
    modifiedAt: node.modifiedAt,
    icon: getFileIcon(node)
  };
  emit("select", option, "@");
  emit("file-select", node, option);
};
const getFileIcon = (node) => {
  if (node.isFolder) return "folder";
  if (node.icon) return node.icon;
  const ext = node.path.split(".").pop()?.toLowerCase() || "";
  const iconMap = {
    pdf: "file-pdf",
    doc: "file-word",
    docx: "file-word",
    xlsx: "file-excel",
    xls: "file-excel",
    csv: "file-excel",
    txt: "document",
    md: "document",
    png: "picture",
    jpg: "picture",
    jpeg: "picture",
    gif: "picture",
    mp4: "video-play",
    mp3: "headset"
  };
  return iconMap[ext] || "document";
};
const formatFileSizeFn = (size) => {
  if (!size) return "";
  return props.formatFileSize(size);
};
const formatTimeFn = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const now = /* @__PURE__ */ new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 864e5) {
    return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
  }
  if (diff < 6048e5) {
    return Math.floor(diff / 864e5) + "\u5929\u524D";
  }
  return date.toLocaleDateString("zh-CN");
};
const showFileTree = computed(() => {
  return props.enableFileTree && currentFileType.value !== null && fileTreeData.value.length > 0;
});
const refreshFileTree = () => {
  if (currentFileType.value) {
    loadFileTree(currentFileType.value);
  }
};
defineExpose({
  focus: () => mentionRef.value?.focus(),
  blur: () => mentionRef.value?.blur(),
  clear: () => mentionRef.value?.clear(),
  getRef: () => mentionRef.value?.ref,
  insertMention: (option, trigger) => mentionRef.value?.insertMention(option, trigger),
  refreshFileTree,
  toggleFolder: (key) => toggleFolder(key)
});
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
            :class="[ns.e('option-icon'), asAiMentionOption(option).type ? ns.em('option-icon', asAiMentionOption(option).type) : '']"
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
            <YhIcon :name="getTypeIcon(currentFileType)" />
            <span>{{ getTypeLabel(currentFileType) }}</span>
            <span :class="ns.e('file-tree-count')">{{ fileTreeData.length }}</span>
          </div>
          <div :class="ns.e('file-tree-content')">
            <div :class="ns.e('file-tree-list')">
              <template v-for="node in fileTreeData" :key="node.key">
                <div
                  :class="[ns.e('file-tree-node'), ns.is('folder', node.isFolder), ns.is('expanded', isFolderExpanded(node.key))]"
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
                    :class="[ns.e('file-tree-node'), ns.e('file-tree-child'), ns.is('folder', child.isFolder)]"
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
                <span>{{ t("ai.mention.noFiles") }}</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style>
@charset "UTF-8";
/**
 * YH-UI CSS Variables
 * 全局 CSS 变量定义 - 业内最佳主题系统
 */
:root {
  /* ==================== 密度/紧凑度系统 ==================== */
  --yh-density-factor: 1;
  --yh-component-size-default: 32px;
  --yh-component-size-small: 24px;
  --yh-component-size-large: 40px;
  --yh-padding-default: 12px 16px;
  --yh-padding-small: 8px 12px;
  --yh-padding-large: 16px 20px;
  --yh-spacing-unit: 8px;
  /* ==================== 基础颜色 ==================== */
  --yh-color-white: #ffffff;
  --yh-color-black: #000000;
  /* ==================== 颜色系统 ==================== */
  /* 主色 */
  --yh-color-primary: #409eff;
  --yh-color-primary-light-1: #53a8ff;
  --yh-color-primary-light-2: #66b1ff;
  --yh-color-primary-light-3: #79bbff;
  --yh-color-primary-light-4: #8cc5ff;
  --yh-color-primary-light-5: #a0cfff;
  --yh-color-primary-light-6: #b3d8ff;
  --yh-color-primary-light-7: #c6e2ff;
  --yh-color-primary-light-8: #d9ecff;
  --yh-color-primary-light-9: #ecf5ff;
  --yh-color-primary-dark-2: #337ecc;
  /* 成功色 */
  --yh-color-success: #67c23a;
  --yh-color-success-light-3: #95d475;
  --yh-color-success-light-5: #b3e19d;
  --yh-color-success-light-7: #d1edc4;
  --yh-color-success-light-9: #f0f9eb;
  --yh-color-success-dark-2: #529b2e;
  /* 警告色 */
  --yh-color-warning: #e6a23c;
  --yh-color-warning-light-3: #eebe77;
  --yh-color-warning-light-5: #f3d19e;
  --yh-color-warning-light-7: #f8e3c5;
  --yh-color-warning-light-9: #fdf6ec;
  --yh-color-warning-dark-2: #b88230;
  /* 危险色 */
  --yh-color-danger: #f56c6c;
  --yh-color-danger-light-3: #f89898;
  --yh-color-danger-light-5: #fab6b6;
  --yh-color-danger-light-7: #fcd3d3;
  --yh-color-danger-light-9: #fef0f0;
  --yh-color-danger-dark-2: #c45656;
  /* 信息色 */
  --yh-color-info: #909399;
  --yh-color-info-light-3: #b1b3b8;
  --yh-color-info-light-5: #c8c9cc;
  --yh-color-info-light-7: #dedfe0;
  --yh-color-info-light-9: #f4f4f5;
  --yh-color-info-dark-2: #73767a;
  /* 文字颜色 */
  --yh-text-color-primary: #303133;
  --yh-text-color-regular: #606266;
  --yh-text-color-secondary: #909399;
  --yh-text-color-placeholder: #a8abb2;
  --yh-text-color-disabled: #c0c4cc;
  /* 边框颜色 */
  --yh-border-color: #dcdfe6;
  --yh-border-color-hover: var(--yh-color-primary);
  --yh-border-color-light: #e4e7ed;
  --yh-border-color-lighter: #ebeef5;
  --yh-border-color-extra-light: #f2f6fc;
  --yh-border-color-dark: #d4d7de;
  --yh-border-color-darker: #cdd0d6;
  /* 填充颜色 */
  --yh-fill-color: #f0f2f5;
  --yh-fill-color-light: #f5f7fa;
  --yh-fill-color-lighter: #fafafa;
  --yh-fill-color-extra-light: #fafcff;
  --yh-fill-color-dark: #ebedf0;
  --yh-fill-color-darker: #e6e8eb;
  --yh-fill-color-blank: #ffffff;
  /* 背景颜色 */
  --yh-bg-color: #ffffff;
  --yh-bg-color-page: #f2f3f5;
  --yh-bg-color-overlay: #ffffff;
  /* ==================== 间距系统 ==================== */
  --yh-spacing-none: 0;
  --yh-spacing-xs: 4px;
  --yh-spacing-sm: 8px;
  --yh-spacing-md: 16px;
  --yh-spacing-lg: 24px;
  --yh-spacing-xl: 32px;
  --yh-spacing-xxl: 48px;
  /* ==================== 圆角系统 ==================== */
  --yh-radius-none: 0;
  --yh-radius-sm: 2px;
  --yh-radius-base: 4px;
  --yh-radius-md: 8px;
  --yh-radius-lg: 12px;
  --yh-radius-xl: 16px;
  --yh-radius-round: 20px;
  --yh-radius-circle: 50%;
  /* ==================== 字体系统 ==================== */
  --yh-font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  /* 字号 */
  --yh-font-size-xs: 12px;
  --yh-font-size-sm: 13px;
  --yh-font-size-base: 14px;
  --yh-font-size-md: 16px;
  --yh-font-size-lg: 18px;
  --yh-font-size-xl: 20px;
  --yh-font-size-xxl: 24px;
  /* 行高 */
  --yh-line-height-none: 1;
  --yh-line-height-tight: 1.25;
  --yh-line-height-snug: 1.375;
  --yh-line-height-normal: 1.5;
  --yh-line-height-relaxed: 1.625;
  --yh-line-height-loose: 2;
  /* 字重 */
  --yh-font-weight-light: 300;
  --yh-font-weight-normal: 400;
  --yh-font-weight-medium: 500;
  --yh-font-weight-semibold: 600;
  --yh-font-weight-bold: 700;
  /* ==================== 阴影系统 ==================== */
  --yh-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --yh-shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --yh-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --yh-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --yh-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  /* ==================== 过渡动效 ==================== */
  --yh-duration-fast: 150ms;
  --yh-duration-base: 200ms;
  --yh-duration-slow: 300ms;
  --yh-timing-ease: ease;
  --yh-timing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --yh-timing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --yh-timing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --yh-timing-linear: linear;
  --yh-transition-base: all var(--yh-duration-base) var(--yh-timing-ease-in-out);
  --yh-transition-fast: all var(--yh-duration-fast) var(--yh-timing-ease-in-out);
  --yh-transition-slow: all var(--yh-duration-slow) var(--yh-timing-ease-in-out);
  /* ==================== 层级系统 ==================== */
  --yh-z-index-normal: 1;
  --yh-z-index-top: 1000;
  --yh-z-index-popper: 2000;
  --yh-z-index-overlay: 2001;
  --yh-z-index-modal: 2002;
  --yh-z-index-popover: 2003;
  --yh-z-index-tooltip: 2004;
  --yh-z-index-loading: 2005;
  /* ==================== 组件尺寸 ==================== */
  /* Large */
  --yh-component-size-large: 40px;
  --yh-component-size-large-font: 14px;
  --yh-component-size-large-padding: 20px;
  /* Default */
  --yh-component-size-default: 32px;
  --yh-component-size-default-font: 14px;
  --yh-component-size-default-padding: 16px;
  /* Small */
  --yh-component-size-small: 24px;
  --yh-component-size-small-font: 12px;
  --yh-component-size-small-padding: 12px;
  /* ==================== 组件语义化变量 ==================== */
  --yh-border-radius-base: var(--yh-radius-base);
  --yh-border-radius-small: var(--yh-radius-sm);
  --yh-border-radius-round: var(--yh-radius-round);
  /* Message 消息提示 */
  --yh-message-bg-color: var(--yh-bg-color-overlay);
  --yh-message-border-color: var(--yh-border-color-lighter);
  --yh-message-shadow: var(--yh-shadow-lg);
  --yh-message-text-color: var(--yh-text-color-primary);
  --yh-message-close-color: var(--yh-text-color-secondary);
  --yh-message-close-hover-color: var(--yh-text-color-primary);
  /* Notification 通知 */
  --yh-notification-bg-color: var(--yh-bg-color-overlay);
  --yh-notification-border-color: var(--yh-border-color-lighter);
  --yh-notification-shadow: var(--yh-shadow-lg);
  --yh-notification-title-color: var(--yh-text-color-primary);
  --yh-notification-content-color: var(--yh-text-color-regular);
  /* Badge 徽标 */
  --yh-badge-bg-color: var(--yh-color-danger);
  --yh-badge-text-color: #ffffff;
  --yh-badge-border-color: var(--yh-bg-color);
  /* Card 卡片 */
  --yh-card-bg-color: var(--yh-bg-color-overlay);
  --yh-card-border-color: var(--yh-border-color-lighter);
  --yh-card-shadow: var(--yh-shadow-base);
  --yh-card-header-padding: 18px 20px;
  --yh-card-body-padding: 20px;
  /* Input 输入框 */
  --yh-input-bg-color: var(--yh-fill-color-blank);
  --yh-input-text-color: var(--yh-text-color-regular);
  --yh-input-border-color: var(--yh-border-color);
  --yh-input-hover-border-color: var(--yh-color-primary);
  --yh-input-focus-border-color: var(--yh-color-primary);
  --yh-input-placeholder-color: var(--yh-text-color-placeholder);
  --yh-input-icon-color: var(--yh-text-color-placeholder);
  --yh-input-disabled-bg-color: var(--yh-fill-color-light);
  --yh-input-disabled-text-color: var(--yh-text-color-disabled);
  --yh-input-disabled-border-color: var(--yh-border-color-light);
  /* Image 图片 */
  --yh-image-placeholder-bg-color: var(--yh-fill-color-light);
  --yh-image-placeholder-text-color: var(--yh-text-color-placeholder);
  --yh-image-error-bg-color: var(--yh-fill-color-extra-light);
  --yh-image-error-text-color: var(--yh-text-color-placeholder);
  /* Image Viewer 预览器 */
  --yh-image-viewer-mask-bg-color: rgba(0, 0, 0, 0.5);
  --yh-image-viewer-btn-bg-color: var(--yh-text-color-regular);
  --yh-image-viewer-btn-color: #ffffff;
  --yh-image-viewer-btn-hover-bg-color: var(--yh-color-primary);
  /* Calendar 日历 */
  --yh-calendar-bg: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  --yh-calendar-border-color: rgba(0, 0, 0, 0.06);
  --yh-calendar-border-radius: var(--yh-radius-xl);
  --yh-calendar-header-bg: rgba(255, 255, 255, 0.95);
  --yh-calendar-header-border: rgba(0, 0, 0, 0.04);
  --yh-calendar-header-padding: 18px 22px;
  --yh-calendar-body-padding: 14px 18px 18px;
  /* Calendar 尺寸 */
  --yh-calendar-cell-height: 85px;
  --yh-calendar-cell-height-small: 52px;
  --yh-calendar-cell-height-large: 110px;
  --yh-calendar-cell-radius: 10px;
  --yh-calendar-cell-radius-small: 6px;
  --yh-calendar-cell-radius-large: 12px;
  /* Calendar 颜色 */
  --yh-calendar-primary: var(--yh-color-primary);
  --yh-calendar-primary-light: rgba(59, 130, 246, 0.1);
  --yh-calendar-selected-bg: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  --yh-calendar-selected-border: rgba(59, 130, 246, 0.4);
  --yh-calendar-today-dot: var(--yh-color-primary);
  --yh-calendar-weekend-color: #f97316;
  --yh-calendar-disabled-color: var(--yh-text-color-disabled);
  --yh-calendar-other-month-opacity: 0.35;
  /* Calendar 假日 */
  --yh-calendar-holiday-color: var(--yh-color-success);
  --yh-calendar-holiday-bg: rgba(16, 185, 129, 0.12);
  --yh-calendar-holiday-border: rgba(16, 185, 129, 0.25);
  --yh-calendar-workday-color: var(--yh-color-warning);
  --yh-calendar-workday-bg: rgba(245, 158, 11, 0.12);
  --yh-calendar-workday-border: rgba(245, 158, 11, 0.25);
  /* Calendar 范围选择 */
  --yh-calendar-range-bg: rgba(59, 130, 246, 0.08);
  --yh-calendar-range-border: rgba(59, 130, 246, 0.2);
  /* Calendar 字体 */
  --yh-calendar-weekday-font-size: var(--yh-font-size-sm);
  --yh-calendar-weekday-color: var(--yh-text-color-secondary);
  --yh-calendar-day-font-size: 15px;
  --yh-calendar-day-color: var(--yh-text-color-primary);
  --yh-calendar-badge-font-size: 9px;
  /* Table 表格 */
  --yh-table-border-color: var(--yh-border-color-lighter);
  --yh-table-header-bg: var(--yh-fill-color-light);
  --yh-table-header-text-color: var(--yh-text-color-primary);
  --yh-table-header-font-weight: var(--yh-font-weight-semibold);
  --yh-table-row-bg: var(--yh-bg-color);
  --yh-table-row-hover-bg: var(--yh-fill-color-light);
  --yh-table-row-stripe-bg: var(--yh-fill-color-lighter);
  --yh-table-row-current-bg: var(--yh-color-primary-light-9);
  --yh-table-row-selected-bg: var(--yh-color-primary-light-8);
  --yh-table-row-success-bg: var(--yh-color-success-light-9);
  --yh-table-row-warning-bg: var(--yh-color-warning-light-9);
  --yh-table-text-color: var(--yh-text-color-regular);
  --yh-table-empty-text-color: var(--yh-text-color-secondary);
  --yh-table-font-size: var(--yh-font-size-base);
  --yh-table-cell-padding: 12px 0;
  --yh-table-cell-spacing: 12px;
  --yh-table-fixed-left-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.15);
  --yh-table-fixed-right-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.15);
  /* ==================== 边框基础 ==================== */
  --yh-border-width: 1px;
  --yh-border-style: solid;
  --yh-border: var(--yh-border-width) var(--yh-border-style) var(--yh-border-color);
  /* ==================== 断点系统 ==================== */
  --yh-breakpoint-xs: 0;
  --yh-breakpoint-sm: 576px;
  --yh-breakpoint-md: 768px;
  --yh-breakpoint-lg: 992px;
  --yh-breakpoint-xl: 1200px;
  --yh-breakpoint-xxl: 1400px;
  /* ==================== 字体系统扩展 ==================== */
  --yh-font-family-monospace:
    'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  --yh-font-family-serif: Georgia, Cambria, 'Times New Roman', Times, serif;
  /* ==================== 无障碍/聚焦系统 ==================== */
  --yh-focus-ring-color: var(--yh-color-primary);
  --yh-focus-ring-width: 2px;
  --yh-focus-ring-offset: 2px;
  --yh-focus-ring-opacity: 0.2;
  --yh-focus-ring:
    0 0 0 var(--yh-focus-ring-offset) var(--yh-bg-color),
    0 0 0 calc(var(--yh-focus-ring-offset) + var(--yh-focus-ring-width)) var(--yh-focus-ring-color);
  /* 高对比度模式支持 */
  --yh-high-contrast-outline: 2px solid transparent;
  --yh-high-contrast-outline-offset: 2px;
  /* ==================== 滚动条样式 ==================== */
  --yh-scrollbar-width: 6px;
  --yh-scrollbar-thumb-color: var(--yh-text-color-disabled);
  --yh-scrollbar-thumb-hover-color: var(--yh-text-color-secondary);
  --yh-scrollbar-track-color: transparent;
  --yh-scrollbar-thumb-radius: 3px;
  /* ==================== 遮罩层 ==================== */
  --yh-mask-color: rgba(0, 0, 0, 0.5);
  --yh-mask-color-light: rgba(0, 0, 0, 0.3);
  --yh-mask-color-extra-light: rgba(0, 0, 0, 0.1);
}

/* ==================== 暗黑模式 ==================== */
html.dark {
  --yh-color-primary: #409eff;
  --yh-color-primary-light-3: #3375b9;
  --yh-color-primary-light-5: #2a598a;
  --yh-color-primary-light-7: #213d5b;
  --yh-color-primary-light-9: #18222c;
  --yh-color-primary-dark-2: #66b1ff;
  --yh-color-success: #67c23a;
  --yh-color-success-light-3: #4e8e2f;
  --yh-color-success-light-5: #3e6b27;
  --yh-color-success-light-7: #2d481f;
  --yh-color-success-light-9: #1d2518;
  --yh-color-warning: #e6a23c;
  --yh-color-warning-light-3: #a77730;
  --yh-color-warning-light-5: #7d5b28;
  --yh-color-warning-light-7: #533f20;
  --yh-color-warning-light-9: #292218;
  --yh-color-danger: #f56c6c;
  --yh-color-danger-light-3: #b25252;
  --yh-color-danger-light-5: #854040;
  --yh-color-danger-light-7: #582e2e;
  --yh-color-danger-light-9: #2b1d1d;
  --yh-color-info: #909399;
  --yh-color-info-light-3: #6b6d71;
  --yh-color-info-light-5: #525457;
  --yh-color-info-light-7: #393b3e;
  --yh-color-info-light-9: #202124;
  --yh-text-color-primary: #e5eaf3;
  --yh-text-color-regular: #cfd3dc;
  --yh-text-color-secondary: #a3a6ad;
  --yh-text-color-placeholder: #8d9095;
  --yh-text-color-disabled: #6c6e72;
  --yh-border-color: #4c4d4f;
  --yh-border-color-light: #414243;
  --yh-border-color-lighter: #363637;
  --yh-border-color-extra-light: #2b2b2c;
  --yh-border-color-dark: #58585b;
  --yh-border-color-darker: #636466;
  --yh-fill-color: #303030;
  --yh-fill-color-light: #262727;
  --yh-fill-color-lighter: #1d1d1d;
  --yh-fill-color-extra-light: #191919;
  --yh-fill-color-dark: #39393a;
  --yh-fill-color-darker: #424243;
  --yh-fill-color-blank: transparent;
  --yh-bg-color: #141414;
  --yh-bg-color-page: #0a0a0a;
  --yh-bg-color-overlay: #1d1e1f;
  /* 组件暗色模式覆盖 */
  --yh-message-bg-color: var(--yh-bg-color-overlay);
  --yh-message-border-color: var(--yh-border-color-lighter);
  --yh-notification-bg-color: var(--yh-bg-color-overlay);
  --yh-notification-border-color: var(--yh-border-color-lighter);
  --yh-badge-border-color: var(--yh-bg-color);
  --yh-card-bg-color: var(--yh-bg-color-overlay);
  --yh-card-border-color: var(--yh-border-color-lighter);
  /* Calendar 暗黑模式 */
  --yh-calendar-bg: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  --yh-calendar-border-color: rgba(255, 255, 255, 0.08);
  --yh-calendar-header-bg: rgba(30, 30, 30, 0.95);
  --yh-calendar-header-border: rgba(255, 255, 255, 0.06);
  --yh-calendar-day-color: var(--yh-text-color-primary);
  --yh-calendar-weekday-color: var(--yh-text-color-secondary);
  --yh-calendar-selected-bg: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.2) 0%,
    rgba(59, 130, 246, 0.1) 100%
  );
  /* Table 暗黑模式 */
  --yh-table-border-color: var(--yh-border-color-lighter);
  --yh-table-header-bg: var(--yh-fill-color-dark);
  --yh-table-header-text-color: var(--yh-text-color-primary);
  --yh-table-row-bg: var(--yh-bg-color);
  --yh-table-row-hover-bg: var(--yh-fill-color);
  --yh-table-row-stripe-bg: var(--yh-fill-color-light);
  --yh-table-row-current-bg: var(--yh-color-primary-light-9);
  --yh-table-row-selected-bg: var(--yh-color-primary-light-9);
  --yh-table-row-success-bg: var(--yh-color-success-light-9);
  --yh-table-row-warning-bg: var(--yh-color-warning-light-9);
  --yh-table-fixed-left-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.3);
  --yh-table-fixed-right-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.3);
  /* 遮罩层暗黑模式 */
  --yh-mask-color: rgba(0, 0, 0, 0.7);
  --yh-mask-color-light: rgba(0, 0, 0, 0.5);
  --yh-mask-color-extra-light: rgba(0, 0, 0, 0.3);
  /* 滚动条暗黑模式 */
  --yh-scrollbar-thumb-color: var(--yh-fill-color-darker);
  --yh-scrollbar-thumb-hover-color: var(--yh-text-color-placeholder);
}

/* ==================== 减少动画偏好支持 ==================== */
@media (prefers-reduced-motion: reduce) {
  :root,
  html.dark {
    --yh-duration-fast: 0ms;
    --yh-duration-base: 0ms;
    --yh-duration-slow: 0ms;
    --yh-transition-base: none;
    --yh-transition-fast: none;
    --yh-transition-slow: none;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
/* ==================== 高对比度模式支持 ==================== */
@media (prefers-contrast: high) {
  :root {
    --yh-border-color: #000000;
    --yh-border-color-light: #333333;
    --yh-text-color-primary: #000000;
    --yh-text-color-regular: #1a1a1a;
    --yh-focus-ring-width: 3px;
    --yh-focus-ring-color: #000000;
  }
  html.dark {
    --yh-border-color: #ffffff;
    --yh-border-color-light: #cccccc;
    --yh-text-color-primary: #ffffff;
    --yh-text-color-regular: #e5e5e5;
    --yh-focus-ring-color: #ffffff;
  }
}
/* ==================== 强制颜色模式支持 (Windows 高对比度) ==================== */
@media (forced-colors: active) {
  :root {
    --yh-color-primary: LinkText;
    --yh-border-color: ButtonBorder;
    --yh-bg-color: Canvas;
    --yh-text-color-primary: CanvasText;
    --yh-focus-ring-color: Highlight;
  }
}
.yh-ai-mention {
  width: 100%;
  position: relative;
}
.yh-ai-mention__option-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 4px;
  width: 100%;
}

.yh-ai-mention__option-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--yh-color-primary-light-9);
  color: var(--yh-color-primary);
  font-size: 18px;
}
.yh-ai-mention__option-icon--agent {
  background: var(--yh-color-success-light-9);
  color: var(--yh-color-success);
}

.yh-ai-mention__option-icon--document {
  background: var(--yh-color-warning-light-9);
  color: var(--yh-color-warning);
}

.yh-ai-mention__option-icon--table {
  background: var(--yh-color-info-light-9);
  color: var(--yh-color-info);
}

.yh-ai-mention__option-icon--knowledge {
  background: var(--yh-color-danger-light-9);
  color: var(--yh-color-danger);
}

.yh-ai-mention__option-icon--file {
  background: var(--yh-fill-color-light);
  color: var(--yh-text-color-secondary);
}

.yh-ai-mention__option-info {
  flex: 1;
  min-width: 0;
}

.yh-ai-mention__option-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--yh-text-color-primary);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.yh-ai-mention__option-desc {
  font-size: 12px;
  color: var(--yh-text-color-secondary);
  line-height: 1.2;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.yh-ai-mention__option-tag {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--yh-fill-color-light);
  color: var(--yh-text-color-placeholder);
  text-transform: capitalize;
}
.yh-ai-mention__option-tag--agent {
  background: var(--yh-color-success-light-9);
  color: var(--yh-color-success);
}

.yh-ai-mention__option-tag--document {
  background: var(--yh-color-warning-light-9);
  color: var(--yh-color-warning);
}

.yh-ai-mention__option-tag--table {
  background: var(--yh-color-info-light-9);
  color: var(--yh-color-info);
}

.yh-ai-mention__option-tag--knowledge {
  background: var(--yh-color-danger-light-9);
  color: var(--yh-color-danger);
}

.yh-ai-mention__option-tag--file {
  background: var(--yh-fill-color-light);
  color: var(--yh-text-color-secondary);
}

.yh-ai-mention__file-tree-panel {
  background: var(--yh-bg-color-overlay);
  border: 1px solid var(--yh-border-color-lighter);
  border-radius: 12px;
  box-shadow: var(--yh-shadow-lg);
  overflow: hidden;
}

.yh-ai-mention__file-tree-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--yh-border-color-lighter);
  background: var(--yh-fill-color-light);
  font-size: 14px;
  font-weight: 600;
  color: var(--yh-text-color-primary);
}

.yh-ai-mention__file-tree-count {
  margin-left: auto;
  font-size: 12px;
  color: var(--yh-text-color-secondary);
  background: var(--yh-fill-color);
  padding: 2px 8px;
  border-radius: 10px;
}

.yh-ai-mention__file-tree-content {
  max-height: 320px;
  overflow: auto;
}

.yh-ai-mention__file-tree-list {
  padding: 8px 0;
}

.yh-ai-mention__file-tree-node {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;
  color: var(--yh-text-color-primary);
}
.yh-ai-mention__file-tree-node:hover {
  background: var(--yh-fill-color-light);
}
.yh-ai-mention__file-tree-node--folder {
  font-weight: 500;
}

.yh-ai-mention__file-tree-node--expanded {
  background: var(--yh-fill-color-extra-light);
}

.yh-ai-mention__file-tree-child {
  padding-left: 32px;
}

.yh-ai-mention__folder-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: var(--yh-text-color-secondary);
  cursor: pointer;
}
.yh-ai-mention__folder-toggle:hover {
  color: var(--yh-color-primary);
}

.yh-ai-mention__file-tree-indent {
  width: 16px;
}

.yh-ai-mention__file-tree-icon {
  font-size: 16px;
  color: var(--yh-text-color-secondary);
}

.yh-ai-mention__file-tree-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.yh-ai-mention__file-tree-size {
  font-size: 12px;
  color: var(--yh-text-color-secondary);
  white-space: nowrap;
}

.yh-ai-mention__file-tree-time {
  font-size: 12px;
  color: var(--yh-text-color-disabled);
  white-space: nowrap;
}

.yh-ai-mention__file-tree-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px;
  color: var(--yh-text-color-placeholder);
  font-size: 14px;
}
</style>
