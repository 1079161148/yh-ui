<script setup>
import { ref, watch, reactive, toRaw } from "vue";
import YhForm from "./form.vue";
import YhFormItem from "./form-item.vue";
import YhButton from "../../button/src/button.vue";
import { formSchemaProps } from "./form-schema";
import { useNamespace } from "@yh-ui/hooks";
import { get, set } from "@yh-ui/utils";
defineOptions({
  name: "YhFormSchema"
});
const props = defineProps(formSchemaProps);
const emit = defineEmits(["update:modelValue", "submit", "change", "validate"]);
const ns = useNamespace("form-schema");
const formRef = ref();
const localModel = reactive({ ...props.modelValue });
watch(
  () => props.modelValue,
  (val) => {
    if (!val) return;
    for (const key of Object.keys(val)) {
      if (localModel[key] !== val[key]) {
        localModel[key] = val[key];
      }
    }
    for (const key of Object.keys(localModel)) {
      if (!(key in val)) {
        delete localModel[key];
      }
    }
  },
  { deep: true }
);
const isGroup = (item) => {
  return "items" in item && Array.isArray(item.items);
};
const getGroupTitle = (item) => isGroup(item) ? item.title || "" : "";
const getGroupProps = (item) => isGroup(item) ? item.props : void 0;
const isGroupCollapsible = (item) => isGroup(item) ? !!item.collapsible : false;
const getGroupItems = (item) => isGroup(item) ? item.items : [];
const optionMap = reactive({});
const collapsedMap = reactive({});
const loadingMap = reactive({});
const initDefaultValues = () => {
  const traverse = (items) => {
    for (const item of items) {
      if (isGroup(item)) {
        traverse(item.items);
      } else {
        const schemaItem = item;
        if (schemaItem.defaultValue !== void 0 && get(localModel, schemaItem.field) === void 0) {
          set(localModel, schemaItem.field, schemaItem.defaultValue);
          emit("update:modelValue", { ...toRaw(localModel) });
        }
      }
    }
  };
  traverse(props.schema);
};
const initAsyncOptions = async () => {
  const traverse = async (items) => {
    for (const item of items) {
      if (isGroup(item)) {
        await traverse(item.items);
      } else {
        const schemaItem = item;
        if (schemaItem.asyncOptions && !optionMap[schemaItem.field]) {
          try {
            loadingMap[schemaItem.field] = true;
            optionMap[schemaItem.field] = await schemaItem.asyncOptions();
          } catch (e) {
            console.error(`[YhFormSchema] Failed to load options for ${schemaItem.field}`, e);
          } finally {
            loadingMap[schemaItem.field] = false;
          }
        }
      }
    }
  };
  await traverse(props.schema);
};
watch(
  () => props.schema,
  (val) => {
    val.forEach((item) => {
      if (isGroup(item) && item.title) {
        if (collapsedMap[item.title] === void 0) {
          collapsedMap[item.title] = item.collapsed ?? false;
        }
      }
    });
    initDefaultValues();
    initAsyncOptions();
  },
  { immediate: true, deep: true }
);
const toggleCollapse = (title) => {
  if (title) {
    collapsedMap[title] = !collapsedMap[title];
  }
};
const resolveProps = (item) => {
  let finalProps = {};
  if (typeof item.props === "function") {
    finalProps = { ...item.props(localModel) };
  } else {
    finalProps = { ...item.props || {} };
  }
  if (item.asyncOptions && optionMap[item.field]) {
    const propName = item.optionProp || "options";
    finalProps[propName] = optionMap[item.field];
  }
  if (item.asyncOptions) {
    finalProps.loading = loadingMap[item.field] ?? false;
  }
  if (item.disabled !== void 0) {
    finalProps.disabled = typeof item.disabled === "function" ? item.disabled(localModel) : item.disabled;
  }
  if (props.formProps?.disabled) {
    finalProps.disabled = true;
  }
  return finalProps;
};
const resolveRequired = (item) => {
  if (typeof item.required === "function") {
    return !!item.required(localModel);
  }
  return !!item.required;
};
const resolveRules = (item) => {
  let sourceRules = [];
  if (typeof item.rules === "function") {
    sourceRules = item.rules(localModel) || [];
  } else {
    sourceRules = item.rules || [];
  }
  const rules = [...sourceRules];
  const isRequired = resolveRequired(item);
  if (isRequired && !rules.some((r) => r.required)) {
    const isBoolean = typeof item.defaultValue === "boolean" || item.component === "switch";
    rules.unshift({
      required: true,
      type: isBoolean ? "boolean" : void 0,
      message: `${item.label || item.field} \u4E0D\u80FD\u4E3A\u7A7A`,
      trigger: ["blur", "change"]
    });
  }
  return rules.length > 0 ? rules : void 0;
};
const getComponent = (comp) => {
  if (typeof comp === "string") {
    const map = {
      input: "yh-input",
      "input-number": "yh-input-number",
      "input-tag": "yh-input-tag",
      autocomplete: "yh-autocomplete",
      checkbox: "yh-checkbox",
      "checkbox-group": "yh-checkbox-group",
      radio: "yh-radio",
      "radio-group": "yh-radio-group",
      select: "yh-select",
      cascader: "yh-cascader",
      switch: "yh-switch",
      slider: "yh-slider",
      rate: "yh-rate",
      "date-picker": "yh-date-picker",
      "time-picker": "yh-time-picker",
      "color-picker": "yh-color-picker",
      "time-select": "yh-time-select",
      transfer: "yh-transfer",
      "tree-select": "yh-tree-select",
      mention: "yh-mention",
      tag: "yh-tag",
      upload: "yh-upload"
    };
    return map[comp] || comp;
  }
  return comp;
};
const isItemHidden = (item) => {
  if (typeof item.hidden === "function") {
    return item.hidden(localModel);
  }
  return item.hidden === true;
};
const getEmptyValue = (item) => {
  const val = get(localModel, item.field);
  if (val === null || val === void 0 || val === "") {
    return item.emptyValue ?? "-";
  }
  return val;
};
const handleAddListItem = (item) => {
  const currentList = get(localModel, item.field) || [];
  const max = item.listProps?.max;
  if (max !== void 0 && currentList.length >= max) return;
  const canAdd = item.listProps?.allowAdd;
  if (canAdd !== void 0) {
    const allow = typeof canAdd === "function" ? canAdd(localModel) : canAdd;
    if (!allow) return;
  }
  const newItem = {};
  item.listSchema?.forEach((sub) => {
    if (sub.defaultValue !== void 0) {
      newItem[sub.field] = sub.defaultValue;
    }
  });
  const newList = [...currentList, newItem];
  handleUpdate(item.field, newList);
};
const handleDeleteListItem = (item, index) => {
  const currentList = get(localModel, item.field) || [];
  const min = item.listProps?.min;
  if (min !== void 0 && currentList.length <= min) return;
  const canDelete = item.listProps?.allowDelete;
  if (canDelete !== void 0) {
    const allow = typeof canDelete === "function" ? canDelete(localModel, index) : canDelete;
    if (!allow) return;
  }
  const newList = [...currentList];
  newList.splice(index, 1);
  handleUpdate(item.field, newList);
};
const handleUpdate = (field, val) => {
  set(localModel, field, val);
  const snapshot = { ...toRaw(localModel) };
  emit("update:modelValue", snapshot);
  emit("change", field, val, snapshot);
};
const handleSubmit = () => {
  emit("submit", { ...toRaw(localModel) });
};
const footerFormRef = {
  validate: (...args) => formRef.value?.validate(...args),
  resetFields: (...args) => formRef.value?.resetFields(...args),
  clearValidate: (...args) => formRef.value?.clearValidate(...args),
  scrollToField: (field) => formRef.value?.scrollToField(field)
};
defineExpose({
  /** 触发校验，支持指定字段 */
  validate: (fields, callback) => formRef.value?.validate(fields, callback),
  /** 重置字段（恢复初始值并清除校验），支持指定字段 */
  resetFields: (fields) => formRef.value?.resetFields(fields),
  /** 清除指定字段校验结果 */
  clearValidate: (fields) => formRef.value?.clearValidate(fields),
  /** 滚动到指定字段 */
  scrollToField: (field) => formRef.value?.scrollToField(field),
  /** 获取当前表单数据快照 */
  getModel: () => ({ ...toRaw(localModel) }),
  /** 动态更新单个字段值 */
  setFieldValue: (field, val) => handleUpdate(field, val),
  /** 底层 form 实例 */
  formRef
});
</script>

<template>
  <yh-form
    v-bind="formProps"
    :model="localModel"
    ref="formRef"
    :class="[ns.b()]"
    @submit.prevent="handleSubmit"
  >
    <div class="yh-form--grid">
      <template v-for="(item, index) in schema" :key="index">
        <!-- ===== 分组渲染 ===== -->
        <template v-if="isGroup(item)">
          <div class="yh-form-col yh-form-col--24">
            <fieldset
              :class="[ns.e('group'), {
  'is-collapsed': collapsedMap[getGroupTitle(item)]
}]"
              v-bind="getGroupProps(item)"
            >
              <legend
                v-if="getGroupTitle(item)"
                :class="ns.e('group-title')"
                @click="isGroupCollapsible(item) && toggleCollapse(getGroupTitle(item))"
              >
                <span class="yh-form-schema__group-title-text">{{ getGroupTitle(item) }}</span>
                <span
                  v-if="isGroupCollapsible(item)"
                  :class="['yh-form-schema__collapse-icon', {
  'is-collapsed': collapsedMap[getGroupTitle(item)]
}]"
                >
                  <svg viewBox="0 0 1024 1024" width="12" height="12">
                    <path
                      fill="currentColor"
                      d="M512 714.667L85.333 288l60.267-60.267L512 594.133l366.4-366.4L938.667 288z"
                    />
                  </svg>
                </span>
              </legend>

              <div v-show="!collapsedMap[getGroupTitle(item)]" class="yh-form--grid">
                <template v-for="subItem in getGroupItems(item)" :key="subItem.field">
                  <div
                    v-if="!isItemHidden(subItem)"
                    :class="['yh-form-col', subItem.col ? `yh-form-col--${subItem.col}` : 'yh-form-col--24']"
                    :style="subItem.span ? {
  gridColumn: `span ${subItem.span}`
} : void 0"
                  >
                    <!-- 分隔线类型 -->
                    <template v-if="subItem.type === 'divider'">
                      <div :class="ns.e('divider')">
                        <span v-if="subItem.label" :class="ns.e('divider-label')">{{
                          subItem.label
                        }}</span>
                      </div>
                    </template>

                    <!-- 纯文本展示 -->
                    <template v-else-if="subItem.type === 'text'">
                      <yh-form-item :label="subItem.label" v-bind="subItem.formItemProps">
                        <span :class="ns.e('text-value')">{{
                          get(localModel, subItem.field)
                        }}</span>
                      </yh-form-item>
                    </template>

                    <!-- 普通字段 -->
                    <template v-else>
                      <yh-form-item
                        v-bind="subItem.formItemProps"
                        :label="subItem.label"
                        :prop="subItem.field"
                        :required="resolveRequired(subItem)"
                        :rules="resolveRules(subItem)"
                      >
                        <!-- 自定义标签插槽 -->
                        <template
                          #label
                          v-if="!$slots[`field-${subItem.field}`] && (subItem.slots?.label || $slots[`label-${subItem.field}`])"
                        >
                          <slot
                            :name="`label-${subItem.field}`"
                            :model="localModel"
                            :item="subItem"
                          >
                            <component
                              :is="subItem.slots?.label"
                              :model="localModel"
                              :field="subItem.field"
                            />
                          </slot>
                          <span
                            v-if="subItem.tooltip"
                            :class="ns.e('tooltip')"
                            :title="subItem.tooltip"
                            >?</span
                          >
                        </template>

                        <!-- 字段自定义插槽（最高优先级） -->
                        <template v-if="$slots[`field-${subItem.field}`]">
                          <slot
                            :name="`field-${subItem.field}`"
                            :model="localModel"
                            :item="subItem"
                            :handle-update="handleUpdate"
                          />
                        </template>

                        <!-- render 函数 -->
                        <template v-else-if="subItem.render">
                          <component :is="() => subItem.render(localModel)" />
                        </template>

                        <!-- 默认组件渲染 -->
                        <template v-else-if="subItem.component">
                          <component
                            :is="getComponent(subItem.component)"
                            v-bind="resolveProps(subItem)"
                            :model-value="get(localModel, subItem.field)"
                            @update:model-value="val => handleUpdate(subItem.field, val)"
                          >
                            <template
                              v-for="(slotContent, slotName) in subItem.slots"
                              :key="slotName"
                              #[slotName]="slotProps"
                            >
                              <component
                                v-if="String(slotName) !== 'label'"
                                :is="slotContent"
                                v-bind="slotProps"
                              />
                            </template>
                          </component>
                        </template>
                      </yh-form-item>
                    </template>
                  </div>
                </template>
              </div>
            </fieldset>
          </div>
        </template>

        <!-- ===== 顶层普通项渲染 ===== -->
        <template v-else>
          <div
            v-if="!isItemHidden(item)"
            :class="['yh-form-col', item.col ? `yh-form-col--${item.col}` : 'yh-form-col--24']"
          >
            <!-- 分隔线类型 -->
            <template v-if="item.type === 'divider'">
              <div :class="ns.e('divider')">
                <span v-if="item.label" :class="ns.e('divider-label')">
                  {{ item.label }}
                </span>
              </div>
            </template>

            <!-- 纯文本展示 -->
            <template v-else-if="item.type === 'text'">
              <yh-form-item
                :label="item.label"
                v-bind="item.formItemProps"
              >
                <span :class="ns.e('text-value')">
                  {{ getEmptyValue(item) }}
                </span>
              </yh-form-item>
            </template>

            <!-- 动态列表 -->
            <template v-else-if="item.type === 'list'">
              <yh-form-item
                :label="item.label"
                v-bind="item.formItemProps"
              >
                <div :class="ns.e('list')">
                  <div
                    v-for="(row, rowIdx) in get(localModel, item.field) || []"
                    :key="rowIdx"
                    :class="ns.e('list-row')"
                  >
                    <div class="yh-form--grid" style="flex: 1">
                      <template v-for="sub in item.listSchema" :key="sub.field">
                        <div
                          :class="['yh-form-col', sub.col ? `yh-form-col--${sub.col}` : 'yh-form-col--24']"
                        >
                          <yh-form-item
                            :label="sub.label"
                            :prop="`${item.field}.${rowIdx}.${sub.field}`"
                            :required="resolveRequired(sub)"
                            :rules="resolveRules(sub)"
                          >
                            <component
                              v-if="sub.component"
                              :is="getComponent(sub.component)"
                              v-bind="resolveProps(sub)"
                              :model-value="row[sub.field]"
                              @update:model-value="val => handleUpdate(`${item.field}.${rowIdx}.${sub.field}`, val)"
                            />
                            <slot
                              v-else
                              :name="`field-${item.field}-${sub.field}`"
                              :row="row"
                              :index="rowIdx"
                              :item="sub"
                            />
                          </yh-form-item>
                        </div>
                      </template>
                    </div>
                    <yh-button
                      type="danger"
                      text
                      :class="ns.e('list-delete')"
                      :disabled="item.listProps?.min !== void 0 && (get(localModel, item.field) || []).length <= item.listProps.min"
                      @click="handleDeleteListItem(item, rowIdx)"
                    >
                      {{ item.listProps?.addButtonText ? "\u5220\u9664" : "\u5220\u9664" }}
                    </yh-button>
                  </div>

                  <yh-button
                    :class="ns.e('list-add')"
                    :disabled="item.listProps?.max !== void 0 && (get(localModel, item.field) || []).length >= item.listProps.max"
                    @click="handleAddListItem(item)"
                  >
                    + {{ item.listProps?.addButtonText ?? "\u6DFB\u52A0\u4E00\u9879" }}
                  </yh-button>

                  <slot
                    :name="`list-footer-${item.field}`"
                    :model="localModel"
                    :item="item"
                  />
                </div>
              </yh-form-item>
            </template>

            <!-- 普通字段 -->
            <template v-else>
              <yh-form-item
                v-bind="item.formItemProps"
                :label="item.label"
                :prop="item.field"
                :required="resolveRequired(item)"
                :rules="resolveRules(item)"
              >
                <!-- 自定义 label 插槽 -->
                <template
                  #label
                  v-if="!$slots[`field-${item.field}`] && (item.slots?.label || $slots[`label-${item.field}`])"
                >
                  <slot
                    :name="`label-${item.field}`"
                    :model="localModel"
                    :item="item"
                  >
                    <component
                      :is="item.slots?.label"
                      :model="localModel"
                      :field="item.field"
                    />
                  </slot>
                </template>

                <!-- 字段自定义插槽 -->
                <template v-if="$slots[`field-${item.field}`]">
                  <slot
                    :name="`field-${item.field}`"
                    :model="localModel"
                    :item="item"
                    :handle-update="handleUpdate"
                  />
                </template>

                <!-- render 函数 -->
                <template v-else-if="item.render">
                  <component :is="() => item.render(localModel)" />
                </template>

                <!-- 默认组件渲染 -->
                <template v-else-if="item.component">
                  <component
                    :is="getComponent(item.component)"
                    v-bind="resolveProps(item)"
                    :model-value="get(localModel, item.field)"
                    @update:model-value="val => handleUpdate(item.field, val)"
                  >
                    <template
                      v-for="(slotContent, slotName) in item.slots"
                      :key="slotName"
                      #[slotName]="slotProps"
                    >
                      <component
                        v-if="String(slotName) !== 'label'"
                        :is="slotContent"
                        v-bind="slotProps"
                      />
                    </template>
                  </component>
                </template>
              </yh-form-item>
            </template>
          </div>
        </template>
      </template>
    </div>

    <!-- Footer 插槽 -->
    <div v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer" :model="localModel" :form-ref="footerFormRef" />
    </div>
  </yh-form>
</template>

<style>
.yh-form-schema__group {
  border: 1px solid var(--yh-border-color-light, #ebeef5);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  background: var(--yh-bg-color-overlay, #fff);
  transition: all 0.3s;
}
.yh-form-schema__group.is-collapsed {
  padding-bottom: 0;
}
.yh-form-schema__group-title {
  font-weight: 600;
  font-size: 15px;
  padding: 0 10px;
  color: var(--yh-text-color-primary, #303133);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
}
.yh-form-schema__group-title-text {
  flex: 1;
}
.yh-form-schema__collapse-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  color: var(--yh-text-color-secondary, #909399);
  transition: transform 0.25s ease;
  cursor: pointer;
}
.yh-form-schema__collapse-icon.is-collapsed {
  transform: rotate(-90deg);
}
.yh-form-schema__footer {
  padding-top: 12px;
  border-top: 1px solid var(--yh-border-color-lighter, #f2f6fc);
  margin-top: 12px;
}
.yh-form-schema__divider {
  display: flex;
  align-items: center;
  margin: 8px 0 16px;
}
.yh-form-schema__divider::before, .yh-form-schema__divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--yh-border-color-light, #ebeef5);
}
.yh-form-schema__divider-label {
  padding: 0 12px;
  font-size: 13px;
  color: var(--yh-text-color-secondary, #909399);
  white-space: nowrap;
}
.yh-form-schema__text-value {
  font-size: 14px;
  color: var(--yh-text-color-primary, #303133);
  line-height: 1.5;
}
.yh-form-schema__tooltip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--yh-color-info-light-7, #d9ecff);
  color: var(--yh-color-primary, #409eff);
  font-size: 11px;
  font-weight: bold;
  margin-left: 4px;
  cursor: help;
  flex-shrink: 0;
}
.yh-form-schema__list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.yh-form-schema__list-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background: var(--yh-fill-color-light, #f5f7fa);
  border-radius: 6px;
  border: 1px solid var(--yh-border-color-lighter, #ebeef5);
  transition: border-color 0.2s;
}
.yh-form-schema__list-row:hover {
  border-color: var(--yh-border-color, #dcdfe6);
}
.yh-form-schema__list-delete {
  flex-shrink: 0;
  margin-top: 2px;
}
.yh-form-schema__list-add {
  align-self: flex-start;
  margin-top: 4px;
}
</style>
