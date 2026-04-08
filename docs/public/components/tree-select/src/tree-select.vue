<template>
  <div
    :class="[ns.b(), ns.is('disabled', disabled), ns.is('multiple', multiple)]"
    :style="themeStyle"
    ref="selectRef"
  >
    <div
      :class="[ns.e('trigger'), ns.is('active', visible)]"
      @click="handleTriggerClick"
      @mouseenter="showClear = true"
      @mouseleave="showClear = false"
    >
      <div :class="ns.e('tags')">
        <template v-if="multiple && Array.isArray(modelValue)">
          <!-- 如果开启折叠，仅渲染 maxCollapseTags 数量的标签 -->
          <div
            v-for="item in collapseTags ? selectedLabels.slice(0, maxCollapseTags) : selectedLabels"
            :key="item.value"
            :class="ns.e('tag')"
          >
            <span>{{ item.label }}</span>
            <span :class="ns.e('tag-close')" @click.stop="removeTag(item.value)">
              <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                <path
                  fill="currentColor"
                  d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
                />
              </svg>
            </span>
          </div>
          <!-- 折叠占位符 -->
          <div
            v-if="collapseTags && selectedLabels.length > maxCollapseTags"
            :class="[ns.e('tag'), ns.m('info')]"
          >
            <span>+ {{ selectedLabels.length - maxCollapseTags }}</span>
          </div>
        </template>

        <input
          ref="inputRef"
          v-model="query"
          :placeholder="inputPlaceholder"
          :disabled="disabled"
          :readonly="!filterable"
          :class="[ns.e('inner'), ns.is('invisible', !multiple && hasValue && !visible && !query)]"
          autocomplete="off"
          @input="handleInput"
          @focus="handleInputFocus"
        />

        <span :class="ns.e('suffix')">
          <span
            v-if="showClear && clearable && hasValue"
            :class="ns.e('clear')"
            @click.stop="handleClear"
          >
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path
                fill="currentColor"
                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
              />
            </svg>
          </span>
          <span :class="[ns.e('caret'), ns.is('reverse', visible)]">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path
                fill="currentColor"
                d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
              />
            </svg>
          </span>
        </span>
      </div>

      <div v-if="!multiple && hasValue && !visible && !query" :class="ns.e('selected-label')">
        {{ singleLabel }}
      </div>
    </div>

    <!-- Dropdown -->
    <Teleport to="body" :disabled="!teleported">
      <Transition name="yh-zoom-in-top">
        <div
          v-if="visible"
          ref="popperRef"
          :class="[ns.e('popper'), popperClass]"
          :style="dropdownStyle"
        >
          <div :class="ns.e('dropdown')">
            <div
              ref="virtualWrapperRef"
              :class="ns.e('options-wrapper')"
              :style="{
  maxHeight: heightNumber + 'px',
  overflow: 'auto'
}"
              @scroll="handleScroll"
            >
              <!-- 列表区域 -->
              <div v-if="flatData.length > 0" :style="listContainerStyle">
                <div :style="listShiftStyle">
                  <div
                    v-for="node in renderedNodes"
                    :key="node.key"
                    :class="[ns.e('node'), ns.is('selected', node.checked), ns.is('disabled', node.disabled)]"
                    :style="{
  paddingLeft: `${node.level * indent + 8}px`,
  height: itemSize + 'px'
}"
                    @click.stop="handleNodeClick(node, $event)"
                  >
                    <div :class="ns.e('node-content')">
                      <!-- 展开图标 -->
                      <span
                        :class="[ns.e('expand-icon'), ns.is('leaf', node.isLeaf), ns.is('expanded', node.expanded)]"
                        @click.stop="toggleExpand(node)"
                      >
                        <svg v-if="!node.loading" viewBox="0 0 1024 1024" width="1em" height="1em">
                          <path
                            fill="currentColor"
                            d="M340.864 149.312l470.4 362.688-470.4 362.688c-26.432 20.416-64 1.6-64-32V181.312c0-33.6 37.568-52.416 64-32z"
                          />
                        </svg>
                        <svg
                          v-else
                          :class="ns.is('loading')"
                          viewBox="0 0 1024 1024"
                          width="1em"
                          height="1em"
                        >
                          <path
                            fill="currentColor"
                            d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32z"
                          />
                        </svg>
                      </span>

                      <!-- 复选框 -->
                      <span
                        v-if="showCheckbox"
                        :class="[ns.e('checkbox'), ns.is('checked', node.checked), ns.is('indeterminate', node.indeterminate), ns.is('disabled', node.disabled)]"
                      >
                        <span :class="ns.e('checkbox-inner')">
                          <svg
                            v-if="node.checked && !node.indeterminate"
                            viewBox="0 0 1024 1024"
                            width="1em"
                            height="1em"
                          >
                            <path
                              fill="currentColor"
                              d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
                            />
                          </svg>
                          <svg
                            v-else-if="node.indeterminate"
                            viewBox="0 0 1024 1024"
                            width="1em"
                            height="1em"
                          >
                            <path fill="currentColor" d="M192 448h640v128H192z" />
                          </svg>
                        </span>
                      </span>

                      <!-- 文本 -->
                      <span :class="ns.e('node-label')">
                        <slot name="default" :node="node" :data="node.raw">
                          {{ node.label }}
                        </slot>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else :class="ns.e('empty')">{{ emptyText || t("treeselect.emptyText") }}</div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from "vue";
import { useNamespace, useLocale } from "@yh-ui/hooks";
import { useComponentTheme } from "@yh-ui/theme";
import { treeSelectProps, treeSelectEmits } from "./tree-select";
import { useTree } from "./use-tree";
defineOptions({ name: "YhTreeSelect" });
const props = defineProps(treeSelectProps);
const emit = defineEmits(treeSelectEmits);
const ns = useNamespace("tree-select");
const { t } = useLocale();
const { themeStyle } = useComponentTheme(
  "tree-select",
  computed(() => props.themeOverrides)
);
const visible = ref(false);
const query = ref("");
const dropdownStyle = ref({});
const inputRef = ref(null);
const selectRef = ref(null);
const popperRef = ref(null);
const virtualWrapperRef = ref(null);
const scrollTop = ref(0);
const showClear = ref(false);
const { flatData, nodeMap, mapVersion, checkNode, toggleExpand, filter, getNode } = useTree(
  props,
  emit
);
const heightNumber = computed(() => {
  if (typeof props.height === "number") return props.height;
  const parsed = parseInt(String(props.height));
  return isNaN(parsed) ? 274 : parsed;
});
const renderedNodes = computed(() => {
  if (!props.virtual) return flatData.value;
  const start = Math.max(0, Math.floor(scrollTop.value / props.itemSize) - 5);
  const end = Math.min(
    flatData.value.length,
    start + Math.ceil(heightNumber.value / props.itemSize) + 10
  );
  return flatData.value.slice(start, end);
});
const listContainerStyle = computed(() => {
  if (!props.virtual) return {};
  return {
    height: `${flatData.value.length * props.itemSize}px`,
    position: "relative"
  };
});
const listShiftStyle = computed(() => {
  if (!props.virtual) return {};
  const start = Math.max(0, Math.floor(scrollTop.value / props.itemSize) - 5);
  return {
    transform: `translateY(${start * props.itemSize}px)`,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  };
});
const handleScroll = (e) => {
  if (props.virtual) {
    scrollTop.value = e.target.scrollTop;
  }
};
const hasValue = computed(() => {
  if (props.multiple) return Array.isArray(props.modelValue) && props.modelValue.length > 0;
  return props.modelValue !== void 0 && props.modelValue !== null && props.modelValue !== "";
});
const singleLabel = computed(() => {
  void mapVersion.value;
  if (props.multiple || !hasValue.value) return "";
  const node = getNode(props.modelValue);
  return node ? node.label : String(props.modelValue ?? "");
});
const inputPlaceholder = computed(() => {
  if (props.multiple) return hasValue.value ? "" : props.placeholder || t("treeselect.placeholder");
  if (hasValue.value && props.filterable && visible.value) return singleLabel.value;
  return props.placeholder || t("treeselect.placeholder");
});
const selectedLabels = computed(() => {
  void mapVersion.value;
  const value = props.modelValue;
  const keys = Array.isArray(value) ? value : value !== void 0 && value !== null && value !== "" ? [value] : [];
  return keys.map((k) => {
    const node = getNode(k);
    return { value: k, label: node ? node.label : String(k) };
  });
});
const handleTriggerClick = () => {
  if (props.disabled) return;
  visible.value = !visible.value;
};
const closeMenu = () => {
  visible.value = false;
  query.value = "";
  filter("");
};
const handleOutsideClick = (e) => {
  const target = e.target;
  if (visible.value && selectRef.value && !selectRef.value.contains(target) && popperRef.value && !popperRef.value.contains(target)) {
    closeMenu();
  }
};
const handleNodeClick = (node, e) => {
  if (node.disabled) return;
  emit("node-click", node.raw, node, e);
  if (props.lazy && !node.loaded && !node.isLeaf) {
    toggleExpand(node);
    return;
  }
  if (props.showCheckbox || props.checkStrictly || props.checkOnClickNode) {
    checkNode(node, !node.checked);
    if (!props.multiple && !props.showCheckbox) {
      nextTick(() => closeMenu());
    }
  } else {
    if (node.isLeaf) {
      checkNode(node, !node.checked);
      if (!props.multiple) {
        nextTick(() => closeMenu());
      }
    } else if (props.expandOnClickNode) {
      toggleExpand(node);
    }
  }
};
const removeTag = (key) => {
  const node = getNode(key);
  if (node) checkNode(node, false);
  else if (Array.isArray(props.modelValue)) {
    emit(
      "update:modelValue",
      props.modelValue.filter((v) => v !== key)
    );
  }
};
const handleClear = () => {
  emit("update:modelValue", props.multiple ? [] : void 0);
  emit("clear");
  nextTick(() => {
    nodeMap.value.forEach((n) => {
      n.checked = false;
      n.indeterminate = false;
    });
    mapVersion.value++;
  });
};
const handleInput = () => {
  if (!visible.value) visible.value = true;
  filter(query.value);
};
const handleInputFocus = () => {
  if (!props.disabled && props.filterable) visible.value = true;
};
const updatePopper = () => {
  nextTick(() => {
    if (selectRef.value) {
      const rect = selectRef.value.getBoundingClientRect();
      const styles = window.getComputedStyle(selectRef.value);
      const primary = styles.getPropertyValue("--yh-color-primary").trim();
      const primaryRgb = styles.getPropertyValue("--yh-color-primary-rgb").trim();
      dropdownStyle.value = {
        width: `${rect.width}px`,
        position: "fixed",
        top: `${rect.bottom + 4}px`,
        left: `${rect.left}px`,
        zIndex: "2000",
        "--yh-color-primary": primary,
        "--yh-color-primary-rgb": primaryRgb
      };
    }
  });
};
watch(visible, (val) => {
  emit("visible-change", val);
  if (val) {
    scrollTop.value = 0;
    updatePopper();
    window.addEventListener("click", handleOutsideClick, true);
    window.addEventListener("scroll", updatePopper, true);
    window.addEventListener("resize", updatePopper);
    nextTick(() => {
      if (virtualWrapperRef.value) virtualWrapperRef.value.scrollTop = 0;
    });
  } else {
    window.removeEventListener("click", handleOutsideClick, true);
    window.removeEventListener("scroll", updatePopper, true);
    window.removeEventListener("resize", updatePopper);
  }
});
onMounted(() => {
  if (visible.value) updatePopper();
});
onBeforeUnmount(() => {
  window.removeEventListener("click", handleOutsideClick, true);
  window.removeEventListener("scroll", updatePopper, true);
  window.removeEventListener("resize", updatePopper);
});
</script>

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
.yh-tree-select {
  position: relative;
  display: inline-block;
  width: 100%;
  --yh-tree-select-node-hover-bg: var(--yh-fill-color-light, #f5f7fa);
  --yh-tree-select-node-active-bg: var(--yh-color-primary-light-9, #ecf5ff);
  --yh-tree-select-active-color: var(--yh-color-primary, #409eff);
}
.yh-tree-select__trigger {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  border: 1px solid var(--yh-border-color, #dcdfe6);
  border-radius: var(--yh-border-radius-base, 4px);
  padding: 0 12px;
  min-height: 32px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  background-color: var(--yh-bg-color, #fff);
  box-sizing: border-box;
}
.yh-tree-select__trigger:hover:not(.is-disabled) {
  border-color: var(--yh-border-color-hover, #c0c4cc);
}
.yh-tree-select__trigger.is-active {
  border-color: var(--yh-color-primary, #409eff) !important;
  box-shadow: 0 0 0 2px rgba(var(--yh-color-primary-rgb), 0.15);
  outline: none;
}

.yh-tree-select__tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  flex: 1;
  overflow: hidden;
  padding: 3px 0;
  min-width: 0;
}

.yh-tree-select__tag {
  display: inline-flex;
  align-items: center;
  background: var(--yh-fill-color-light, #f4f4f5);
  border: 1px solid var(--yh-border-color-light, #e9e9eb);
  border-radius: 4px;
  padding: 0 8px;
  height: 24px;
  line-height: 22px;
  font-size: 12px;
  color: var(--yh-text-color-regular, #606266);
  white-space: nowrap;
  box-sizing: border-box;
}
.yh-tree-select__tag-close {
  margin-left: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: var(--yh-text-color-placeholder);
  transition: color 0.2s;
}
.yh-tree-select__tag-close:hover {
  color: var(--yh-color-danger, #f56c6c);
}

.yh-tree-select__tag--info {
  background-color: var(--yh-fill-color-light, #f4f4f5);
  color: var(--yh-text-color-secondary, #909399);
  border-color: var(--yh-border-color-light, #e9e9eb);
}

.yh-tree-select__inner {
  flex: 1;
  min-width: 4px;
  width: 0;
  border: none !important;
  outline: none !important;
  padding: 0;
  margin: 0;
  color: var(--yh-text-color-regular, #606266);
  font-size: 14px;
  background: transparent;
  cursor: pointer;
}
.yh-tree-select__inner::placeholder {
  color: var(--yh-text-color-placeholder, #a8abb2);
}
.yh-tree-select__inner.is-invisible {
  opacity: 0;
}

.yh-tree-select__suffix {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--yh-text-color-placeholder, #a8abb2);
  flex-shrink: 0;
}

.yh-tree-select__caret {
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 14px;
  display: flex;
  align-items: center;
}
.yh-tree-select__caret.is-reverse {
  transform: rotate(180deg);
}

.yh-tree-select__clear {
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}
.yh-tree-select__clear:hover {
  color: var(--yh-text-color-secondary, #909399);
}

.yh-tree-select__selected-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--yh-text-color-regular, #606266);
  font-size: 14px;
  pointer-events: none;
  white-space: nowrap;
  max-width: calc(100% - 40px);
  overflow: hidden;
  text-overflow: ellipsis;
}

.yh-tree-select__popper {
  position: fixed;
  z-index: var(--yh-z-index-popup, 2000);
  margin-top: 8px;
  filter: drop-shadow(var(--yh-box-shadow-light));
  animation: yh-tree-select-fade-in 0.2s cubic-bezier(0.23, 1, 0.32, 1);
}

.yh-tree-select__dropdown {
  background: var(--yh-bg-color-overlay, #fff);
  border: 1px solid var(--yh-border-color-lighter, #ebeef5);
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.yh-tree-select__options-wrapper {
  scrollbar-width: thin;
}
.yh-tree-select__options-wrapper::-webkit-scrollbar {
  width: 6px;
}
.yh-tree-select__options-wrapper::-webkit-scrollbar-thumb {
  background: var(--yh-border-color-lighter);
  border-radius: 3px;
}

.yh-tree-select__empty {
  padding: 24px 0;
  text-align: center;
  color: var(--yh-text-color-placeholder, #a8abb2);
  font-size: 14px;
}

.yh-tree-select__node {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.25s, color 0.25s;
  font-size: 14px;
  color: var(--yh-text-color-regular, #606266);
  position: relative;
}
.yh-tree-select__node:hover {
  background-color: var(--yh-tree-select-node-hover-bg);
}
.yh-tree-select__node.is-selected {
  color: var(--yh-tree-select-active-color);
  background-color: var(--yh-tree-select-node-active-bg);
  font-weight: 600;
}
.yh-tree-select__node.is-selected::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: var(--yh-tree-select-active-color);
}
.yh-tree-select__node.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background-color: transparent !important;
}
.yh-tree-select__node-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.yh-tree-select__node-label {
  flex: 1;
  margin-left: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.yh-tree-select__expand-icon {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--yh-text-color-placeholder);
  transition: transform 0.3s;
  flex-shrink: 0;
  cursor: pointer;
}
.yh-tree-select__expand-icon:hover {
  color: var(--yh-text-color-regular);
}
.yh-tree-select__expand-icon.is-expanded {
  transform: rotate(90deg);
}
.yh-tree-select__expand-icon.is-leaf {
  visibility: hidden;
}

.yh-tree-select__checkbox {
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
}
.yh-tree-select__checkbox-inner {
  width: 14px;
  height: 14px;
  border: 1px solid var(--yh-border-color);
  border-radius: 3px;
  background: var(--yh-bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.yh-tree-select__checkbox.is-checked .yh-tree-select__checkbox-inner {
  background-color: var(--yh-color-primary, #409eff);
  border-color: var(--yh-color-primary, #409eff);
}

.yh-tree-select__checkbox.is-indeterminate .yh-tree-select__checkbox-inner {
  background-color: var(--yh-color-primary, #409eff);
  border-color: var(--yh-color-primary, #409eff);
}

.yh-tree-select__checkbox.is-disabled {
  cursor: not-allowed;
}
.yh-tree-select__checkbox.is-disabled .yh-tree-select__checkbox-inner {
  background-color: var(--yh-fill-color-light);
  border-color: var(--yh-border-color-lighter);
}

.yh-tree-select.is-loading {
  animation: yh-tree-select-rotate 2s linear infinite;
}
.yh-tree-select.is-disabled {
  cursor: not-allowed;
}
.yh-tree-select.is-disabled .yh-tree-select__trigger {
  background-color: var(--yh-fill-color-light);
  border-color: var(--yh-border-color-lighter);
  cursor: not-allowed;
}

.yh-tree-select.is-disabled .yh-tree-select__inner {
  cursor: not-allowed;
  color: var(--yh-text-color-disabled);
}

@keyframes yh-tree-select-rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes yh-tree-select-fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.yh-zoom-in-top-enter-active,
.yh-zoom-in-top-leave-active {
  transition: opacity 0.25s cubic-bezier(0.23, 1, 0.32, 1), transform 0.25s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}

.yh-zoom-in-top-enter-from,
.yh-zoom-in-top-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
