<script setup lang="ts">
/**
 * YhFormSchema - 高级动态表单渲染组件
 * @description 配置驱动的高性能表单渲染引擎，支持：
 * - 校验 (validate/resetFields/clearValidate)：已修复 localModel 传递 BUG
 * - 分组 (Group + collapsible)
 * - 24 栅格布局 (col 1-24)
 * - 异步选项加载 (asyncOptions)
 * - 动态 Props (函数式)
 * - 动态显隐 (hidden 函数)
 * - 自定义渲染函数 (render)
 * - 作用域插槽 (field-{name}, label-{name})
 * - 字段默认值 (defaultValue)
 * - 字段禁用 (disabled 支持函数)
 * - tooltip 提示
 * - 分隔线 (type: 'divider')
 * - 纯文本展示 (type: 'text')
 */
import { ref, watch, reactive, toRaw } from 'vue'
import YhForm from './form.vue'
import type { FormInstance } from './form'
import YhFormItem from './form-item.vue'
import { formSchemaProps } from './form-schema'
import type { FormSchemaItem, FormSchemaGroup } from './form-schema'
import { useNamespace } from '@yh-ui/hooks'
import { get, set } from '@yh-ui/utils'

defineOptions({
  name: 'YhFormSchema'
})

const props = defineProps(formSchemaProps)
const emit = defineEmits<{
  (e: 'update:modelValue', val: Record<string, unknown>): void
  (e: 'submit', val: Record<string, unknown>): void
  (e: 'change', field: string, val: unknown, model: Record<string, unknown>): void
  (e: 'validate', isValid: boolean, invalidFields?: Record<string, unknown>): void
}>()
const ns = useNamespace('form-schema')

const formRef = ref<FormInstance>()

/**
 * 关键修复：localModel 必须是一个普通响应式对象（reactive），
 * 而不是 ref 包裹，这样 :model="localModel" 传给 YhForm 才能
 * 在其 context 中正确地被 FormItem 读取。
 */
const localModel = reactive<Record<string, unknown>>({ ...props.modelValue })

// 监听外部 modelValue 变化，同步更新 localModel（不替换引用，只更新 key）
watch(
  () => props.modelValue,
  (val) => {
    if (!val) return
    // 新增或更新 key
    for (const key of Object.keys(val)) {
      if (localModel[key] !== val[key]) {
        localModel[key] = val[key]
      }
    }
    // 删除外部已经没有的 key
    for (const key of Object.keys(localModel)) {
      if (!(key in val)) {
        delete localModel[key]
      }
    }
  },
  { deep: true }
)

// 辅助函数：判断是否为分组
const isGroup = (item: FormSchemaItem | FormSchemaGroup): item is FormSchemaGroup => {
  return 'items' in item && Array.isArray((item as FormSchemaGroup).items)
}

// 异步选项状态
const optionMap = reactive<Record<string, Record<string, unknown>[]>>({})
// 折叠状态
const collapsedMap = reactive<Record<string, boolean>>({})
// 加载状态
const loadingMap = reactive<Record<string, boolean>>({})

// 初始化默认值（在 schema 加载后立即设置未定义的字段默认值）
const initDefaultValues = () => {
  const traverse = (items: (FormSchemaItem | FormSchemaGroup)[]) => {
    for (const item of items) {
      if (isGroup(item)) {
        traverse(item.items)
      } else {
        const schemaItem = item as FormSchemaItem
        if (
          schemaItem.defaultValue !== undefined &&
          get(localModel, schemaItem.field) === undefined
        ) {
          set(localModel, schemaItem.field, schemaItem.defaultValue)
          emit('update:modelValue', { ...toRaw(localModel) })
        }
      }
    }
  }
  traverse(props.schema)
}

// 初始化异步选项
const initAsyncOptions = async () => {
  const traverse = async (items: (FormSchemaItem | FormSchemaGroup)[]) => {
    for (const item of items) {
      if (isGroup(item)) {
        await traverse(item.items)
      } else {
        const schemaItem = item as FormSchemaItem
        if (schemaItem.asyncOptions && !optionMap[schemaItem.field]) {
          try {
            loadingMap[schemaItem.field] = true
            optionMap[schemaItem.field] = await schemaItem.asyncOptions()
          } catch (e) {
            console.error(`[YhFormSchema] Failed to load options for ${schemaItem.field}`, e)
          } finally {
            loadingMap[schemaItem.field] = false
          }
        }
      }
    }
  }
  await traverse(props.schema)
}

// 初始化折叠状态并加载异步数据
watch(
  () => props.schema,
  (val) => {
    val.forEach((item) => {
      if (isGroup(item) && item.title) {
        if (collapsedMap[item.title] === undefined) {
          collapsedMap[item.title] = item.collapsed ?? false
        }
      }
    })
    initDefaultValues()
    initAsyncOptions()
  },
  { immediate: true, deep: true }
)

// 切换折叠
const toggleCollapse = (title: string) => {
  if (title) {
    collapsedMap[title] = !collapsedMap[title]
  }
}

// 解析最终组件 Props（支持动态 props 函数、异步 options、disabled 联动）
const resolveProps = (item: FormSchemaItem) => {
  let finalProps: Record<string, unknown> = {}

  if (typeof item.props === 'function') {
    finalProps = { ...item.props(localModel) }
  } else {
    finalProps = { ...(item.props || {}) }
  }

  // 注入异步选项
  if (item.asyncOptions && optionMap[item.field]) {
    const propName = item.optionProp || 'options'
    finalProps[propName] = optionMap[item.field]
  }

  // 注入 loading 状态
  if (item.asyncOptions) {
    finalProps.loading = loadingMap[item.field] ?? false
  }

  // 字段级 disabled 支持函数
  if (item.disabled !== undefined) {
    finalProps.disabled =
      typeof item.disabled === 'function' ? item.disabled(localModel) : item.disabled
  }

  // 表单整体 disabled 透传
  if (props.formProps?.disabled) {
    finalProps.disabled = true
  }

  return finalProps
}

// 解析字段级规则（合并 required 简写 → rule 对象）
const resolveRules = (item: FormSchemaItem) => {
  const rules = [...(item.rules || [])]

  // 将 required: true 自动补充一条必填规则（如果未手动写）
  if (item.required && !rules.some((r) => r.required)) {
    const isBoolean = typeof item.defaultValue === 'boolean' || item.component === 'switch'
    rules.unshift({
      required: true,
      type: isBoolean ? 'boolean' : undefined,
      message: `${item.label || item.field} 不能为空`,
      trigger: ['blur', 'change']
    })
  }

  return rules.length > 0 ? rules : undefined
}

// 获取组件映射（支持库内置简写）
const getComponent = (comp: string | import('vue').Component) => {
  if (typeof comp === 'string') {
    const map: Record<string, string> = {
      input: 'yh-input',
      'input-number': 'yh-input-number',
      'input-tag': 'yh-input-tag',
      autocomplete: 'yh-autocomplete',
      checkbox: 'yh-checkbox',
      'checkbox-group': 'yh-checkbox-group',
      radio: 'yh-radio',
      'radio-group': 'yh-radio-group',
      select: 'yh-select',
      cascader: 'yh-cascader',
      switch: 'yh-switch',
      slider: 'yh-slider',
      rate: 'yh-rate',
      'date-picker': 'yh-date-picker',
      'time-picker': 'yh-time-picker',
      'color-picker': 'yh-color-picker',
      'time-select': 'yh-time-select',
      transfer: 'yh-transfer',
      'tree-select': 'yh-tree-select',
      mention: 'yh-mention',
      tag: 'yh-tag',
      upload: 'yh-upload'
    }
    return map[comp] || comp
  }
  return comp
}

// 判断项是否隐藏
const isItemHidden = (item: FormSchemaItem) => {
  if (typeof item.hidden === 'function') {
    return item.hidden(localModel)
  }
  return item.hidden === true
}

// 处理组件值更新
const handleUpdate = (field: string, val: unknown) => {
  set(localModel, field, val)
  const snapshot = { ...toRaw(localModel) }
  emit('update:modelValue', snapshot)
  emit('change', field, val, snapshot)
}

// 表单提交
const handleSubmit = () => {
  emit('submit', { ...toRaw(localModel) })
}

/**
 * footer 插槽暴露给外部的 formRef 代理
 * 使用函数包装确保不会因 formRef.value 未初始化而崩溃，同时避免传递 Ref 对象
 */
const footerFormRef = {
  validate: (...args: Parameters<FormInstance['validate']>) => formRef.value?.validate(...args),
  resetFields: (...args: Parameters<FormInstance['resetFields']>) =>
    formRef.value?.resetFields(...args),
  clearValidate: (...args: Parameters<FormInstance['clearValidate']>) =>
    formRef.value?.clearValidate(...args),
  scrollToField: (field: string) => formRef.value?.scrollToField(field)
}

// 暴露完整 API 给父组件
defineExpose({
  /** 触发校验，支持指定字段 */
  validate: (fields?: string | string[], callback?: (isValid: boolean) => void) =>
    formRef.value?.validate(fields, callback),
  /** 重置字段（恢复初始值并清除校验），支持指定字段 */
  resetFields: (fields?: string | string[]) => formRef.value?.resetFields(fields),
  /** 清除指定字段校验结果 */
  clearValidate: (fields?: string | string[]) => formRef.value?.clearValidate(fields),
  /** 滚动到指定字段 */
  scrollToField: (field: string) => formRef.value?.scrollToField(field),
  /** 获取当前表单数据快照 */
  getModel: () => ({ ...toRaw(localModel) }),
  /** 动态更新单个字段值 */
  setFieldValue: (field: string, val: unknown) => handleUpdate(field, val),
  /** 底层 form 实例 */
  formRef
})
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
              :class="[
                ns.e('group'),
                { 'is-collapsed': collapsedMap[(item as FormSchemaGroup).title || ''] }
              ]"
              v-bind="(item as FormSchemaGroup).props"
            >
              <legend
                v-if="(item as FormSchemaGroup).title"
                :class="ns.e('group-title')"
                @click="
                  (item as FormSchemaGroup).collapsible &&
                  toggleCollapse((item as FormSchemaGroup).title!)
                "
              >
                <span class="yh-form-schema__group-title-text">{{
                  (item as FormSchemaGroup).title
                }}</span>
                <span
                  v-if="(item as FormSchemaGroup).collapsible"
                  :class="[
                    'yh-form-schema__collapse-icon',
                    { 'is-collapsed': collapsedMap[(item as FormSchemaGroup).title!] }
                  ]"
                >
                  <svg viewBox="0 0 1024 1024" width="12" height="12">
                    <path
                      fill="currentColor"
                      d="M512 714.667L85.333 288l60.267-60.267L512 594.133l366.4-366.4L938.667 288z"
                    />
                  </svg>
                </span>
              </legend>

              <div
                v-show="!collapsedMap[(item as FormSchemaGroup).title || '']"
                class="yh-form--grid"
              >
                <template v-for="subItem in (item as FormSchemaGroup).items" :key="subItem.field">
                  <div
                    v-if="!isItemHidden(subItem)"
                    :class="[
                      'yh-form-col',
                      subItem.col ? `yh-form-col--${subItem.col}` : 'yh-form-col--24'
                    ]"
                    :style="subItem.span ? { gridColumn: `span ${subItem.span}` } : undefined"
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
                        :required="subItem.required"
                        :rules="resolveRules(subItem)"
                      >
                        <!-- 自定义标签插槽 -->
                        <template
                          #label
                          v-if="
                            !$slots[`field-${subItem.field}`] &&
                            (subItem.slots?.label || $slots[`label-${subItem.field}`])
                          "
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
                          <component :is="() => subItem.render!(localModel)" />
                        </template>

                        <!-- 默认组件渲染 -->
                        <template v-else-if="subItem.component">
                          <component
                            :is="getComponent(subItem.component)"
                            v-bind="resolveProps(subItem)"
                            :model-value="get(localModel, subItem.field)"
                            @update:model-value="(val: unknown) => handleUpdate(subItem.field, val)"
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
            v-if="!isItemHidden(item as FormSchemaItem)"
            :class="[
              'yh-form-col',
              (item as FormSchemaItem).col
                ? `yh-form-col--${(item as FormSchemaItem).col}`
                : 'yh-form-col--24'
            ]"
          >
            <!-- 分隔线类型 -->
            <template v-if="(item as FormSchemaItem).type === 'divider'">
              <div :class="ns.e('divider')">
                <span v-if="(item as FormSchemaItem).label" :class="ns.e('divider-label')">
                  {{ (item as FormSchemaItem).label }}
                </span>
              </div>
            </template>

            <!-- 纯文本展示 -->
            <template v-else-if="(item as FormSchemaItem).type === 'text'">
              <yh-form-item
                :label="(item as FormSchemaItem).label"
                v-bind="(item as FormSchemaItem).formItemProps"
              >
                <span :class="ns.e('text-value')">
                  {{ get(localModel, (item as FormSchemaItem).field) }}
                </span>
              </yh-form-item>
            </template>

            <!-- 普通字段 -->
            <template v-else>
              <yh-form-item
                v-bind="(item as FormSchemaItem).formItemProps"
                :label="(item as FormSchemaItem).label"
                :prop="(item as FormSchemaItem).field"
                :required="(item as FormSchemaItem).required"
                :rules="resolveRules(item as FormSchemaItem)"
              >
                <!-- 自定义 label 插槽 -->
                <template
                  #label
                  v-if="
                    !$slots[`field-${(item as FormSchemaItem).field}`] &&
                    ((item as FormSchemaItem).slots?.label ||
                      $slots[`label-${(item as FormSchemaItem).field}`])
                  "
                >
                  <slot
                    :name="`label-${(item as FormSchemaItem).field}`"
                    :model="localModel"
                    :item="item"
                  >
                    <component
                      :is="(item as FormSchemaItem).slots?.label"
                      :model="localModel"
                      :field="(item as FormSchemaItem).field"
                    />
                  </slot>
                </template>

                <!-- 字段自定义插槽 -->
                <template v-if="$slots[`field-${(item as FormSchemaItem).field}`]">
                  <slot
                    :name="`field-${(item as FormSchemaItem).field}`"
                    :model="localModel"
                    :item="item"
                    :handle-update="handleUpdate"
                  />
                </template>

                <!-- render 函数 -->
                <template v-else-if="(item as FormSchemaItem).render">
                  <component :is="() => (item as FormSchemaItem).render!(localModel)" />
                </template>

                <!-- 默认组件渲染 -->
                <template v-else-if="(item as FormSchemaItem).component">
                  <component
                    :is="getComponent((item as FormSchemaItem).component!)"
                    v-bind="resolveProps(item as FormSchemaItem)"
                    :model-value="get(localModel, (item as FormSchemaItem).field)"
                    @update:model-value="
                      (val: unknown) => handleUpdate((item as FormSchemaItem).field, val)
                    "
                  >
                    <template
                      v-for="(slotContent, slotName) in (item as FormSchemaItem).slots"
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

<style lang="scss">
.yh-form-schema {
  &__group {
    border: 1px solid var(--yh-border-color-light, #ebeef5);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 24px;
    background: var(--yh-bg-color-overlay, #fff);
    transition: all 0.3s;

    &.is-collapsed {
      padding-bottom: 0;
    }

    &-title {
      font-weight: 600;
      font-size: 15px;
      padding: 0 10px;
      color: var(--yh-text-color-primary, #303133);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: default;

      &-text {
        flex: 1;
      }
    }
  }

  &__collapse-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    color: var(--yh-text-color-secondary, #909399);
    transition: transform 0.25s ease;
    cursor: pointer;

    &.is-collapsed {
      transform: rotate(-90deg);
    }
  }

  &__footer {
    padding-top: 12px;
    border-top: 1px solid var(--yh-border-color-lighter, #f2f6fc);
    margin-top: 12px;
  }

  &__divider {
    display: flex;
    align-items: center;
    margin: 8px 0 16px;

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--yh-border-color-light, #ebeef5);
    }

    &-label {
      padding: 0 12px;
      font-size: 13px;
      color: var(--yh-text-color-secondary, #909399);
      white-space: nowrap;
    }
  }

  &__text-value {
    font-size: 14px;
    color: var(--yh-text-color-primary, #303133);
    line-height: 1.5;
  }

  &__tooltip {
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
}
</style>
