<script setup lang="ts">
/**
 * YhFormSchema - 高级动态表单渲染组件
 * @description 基于配置驱动，支持分组(Group)、栅格(Grid)、插槽(Slot)和渲染函数(Render)
 */
import { ref, watch, reactive, onMounted, computed } from 'vue'
import YhForm from './form.vue'
import YhFormItem from './form-item.vue'
import { formSchemaProps } from './form-schema'
import type { FormSchemaItem, FormSchemaGroup } from './form-schema'
import { useNamespace } from '@yh-ui/hooks'
import { get, set } from '@yh-ui/utils'

defineOptions({
  name: 'YhFormSchema'
})

const props = defineProps(formSchemaProps)
const emit = defineEmits(['update:modelValue', 'submit', 'change'])
const ns = useNamespace('form-schema')

const formRef = ref()

// 内部维护一份 model 拷贝以保证响应式流畅性
const localModel = ref({ ...props.modelValue })

watch(() => props.modelValue, (val) => {
  localModel.value = { ...val }
}, { deep: true })

// 辅助函数：判断是否为分组
const isGroup = (item: any): item is FormSchemaGroup => {
  return item && Array.isArray(item.items)
}

// 异步选项状态
const optionMap = reactive<Record<string, any[]>>({})
// 折叠状态
const collapsedMap = reactive<Record<string, boolean>>({})

// 初始化异步选项
const initAsyncOptions = async () => {
  const traverse = async (items: any[]) => {
    for (const item of items) {
      if (isGroup(item)) {
        await traverse(item.items)
      } else {
        if (item.asyncOptions) {
          try {
            // 防止重复加载
            if (!optionMap[item.field]) {
              optionMap[item.field] = await item.asyncOptions()
            }
          } catch (e) {
            console.error(`[YhFormSchema] Failed to load options for ${item.field}`, e)
          }
        }
      }
    }
  }
  await traverse(props.schema)
}

// 初始化折叠状态
watch(() => props.schema, (val) => {
  val.forEach((item: any) => {
    if (isGroup(item) && item.title) {
      if (collapsedMap[item.title] === undefined) {
        collapsedMap[item.title] = item.collapsed ?? false
      }
    }
  })
  initAsyncOptions()
}, { immediate: true, deep: true })

// 切换折叠
const toggleCollapse = (title: string) => {
  if (title) {
    collapsedMap[title] = !collapsedMap[title]
  }
}

// 解析属性 (支持动态 props 和异步 options)
const resolveProps = (item: FormSchemaItem) => {
  let finalProps: Record<string, any> = {}

  // 基础 Props
  if (typeof item.props === 'function') {
    finalProps = { ...item.props(localModel.value) }
  } else {
    finalProps = { ...(item.props || {}) }
  }

  // 注入异步 Options
  if (item.asyncOptions && optionMap[item.field]) {
    const propName = item.optionProp || 'options'
    finalProps[propName] = optionMap[item.field]
  }

  return finalProps
}

// 获取组件映射（支持库内置简写）
const getComponent = (comp: string | any) => {
  if (typeof comp === 'string') {
    const map: Record<string, string> = {
      'input': 'yh-input',
      'input-number': 'yh-input-number',
      'input-tag': 'yh-input-tag',
      'checkbox': 'yh-checkbox',
      'radio': 'yh-radio',
      'select': 'yh-select',
      'switch': 'yh-switch',
      'tag': 'yh-tag'
    }
    return map[comp] || comp
  }
  return comp
}

// 判断项是否隐藏
const isItemHidden = (item: FormSchemaItem) => {
  if (typeof item.hidden === 'function') {
    return item.hidden(localModel.value)
  }
  return item.hidden || false
}

// 处理组件值更新
const handleUpdate = (field: string, val: any) => {
  set(localModel.value, field, val)
  emit('update:modelValue', { ...localModel.value })
  emit('change', field, val)
}

// 处理 render 函数
const RenderComponent = (item: FormSchemaItem) => {
  if (item.render) {
    return item.render(localModel.value)
  }
  return null
}

// 暴露 API 给父组件
defineExpose({
  validate: (props?: any, callback?: any) => formRef.value?.validate(props, callback),
  resetFields: (props?: any) => formRef.value?.resetFields(props),
  clearValidate: (props?: any) => formRef.value?.clearValidate(props),
  scrollToField: (prop: string) => formRef.value?.scrollToField(prop),
  formRef
})
</script>

<template>
  <yh-form v-bind="formProps" :model="localModel" ref="formRef" :class="[ns.b(), { 'yh-form--grid': true }]">
    <div class="yh-form-schema__body">
      <template v-for="(item, index) in schema" :key="index">
        <!-- 分组渲染 -->
        <fieldset v-if="isGroup(item)" :class="[ns.e('group'), { 'is-collapsed': collapsedMap[item.title || ''] }]"
          v-bind="item.props">
          <legend v-if="item.title" :class="ns.e('group-title')"
            @click="item.collapsible && toggleCollapse(item.title)">
            {{ item.title }}
            <span v-if="item.collapsible" :class="['yh-form-schema__collapse-icon']">
              {{ collapsedMap[item.title] ? '▼' : '▲' }}
            </span>
          </legend>

          <div v-show="!collapsedMap[item.title || '']" :class="['yh-form--grid']">
            <template v-for="subItem in item.items" :key="subItem.field">
              <div v-if="!isItemHidden(subItem)"
                :class="['yh-form-col', subItem.col ? `yh-form-col--${subItem.col}` : 'yh-form-col--24']">
                <yh-form-item v-bind="subItem.formItemProps" :label="subItem.label" :prop="subItem.field"
                  :required="subItem.required" :rules="subItem.rules">

                  <!-- Label 插槽 -->
                  <template #label
                    v-if="!$slots[`field-${subItem.field}`] && (subItem.slots?.label || $slots[`label-${subItem.field}`])">
                    <slot :name="`label-${subItem.field}`" :model="localModel" :item="subItem">
                      <component :is="subItem.slots?.label" :model="localModel" :field="subItem.field" />
                    </slot>
                  </template>

                  <!-- 字段插槽: 优先级最高 -->
                  <template v-if="$slots[`field-${subItem.field}`]">
                    <slot :name="`field-${subItem.field}`" :model="localModel" :item="subItem"
                      :handle-update="handleUpdate" />
                  </template>

                  <!-- 默认渲染 & Render -->
                  <template v-else>
                    <component v-if="subItem.render" :is="RenderComponent(subItem)" />
                    <component v-else :is="getComponent(subItem.component)" v-bind="resolveProps(subItem)"
                      :model-value="get(localModel, subItem.field)"
                      @update:model-value="(val: any) => handleUpdate(subItem.field, val)">
                      <template v-for="(slotContent, slotName) in subItem.slots" :key="slotName"
                        #[slotName]="slotProps">
                        <component v-if="slotName !== 'label'" :is="slotContent" v-bind="slotProps" />
                      </template>
                    </component>
                  </template>
                </yh-form-item>
              </div>
            </template>
          </div>
        </fieldset>

        <!-- 普通项渲染 -->
        <div v-else-if="!isItemHidden(item)"
          :class="['yh-form-col', (item as any).col ? `yh-form-col--${(item as any).col}` : 'yh-form-col--24']">
          <yh-form-item v-bind="(item as any).formItemProps" :label="(item as any).label" :prop="(item as any).field"
            :required="(item as any).required" :rules="(item as any).rules">

            <template #label
              v-if="!$slots[`field-${(item as any).field}`] && ((item as any).slots?.label || $slots[`label-${(item as any).field}`])">
              <slot :name="`label-${(item as any).field}`" :model="localModel" :item="item">
                <component :is="(item as any).slots?.label" :model="localModel" :field="(item as any).field" />
              </slot>
            </template>

            <template v-if="$slots[`field-${(item as any).field}`]">
              <slot :name="`field-${(item as any).field}`" :model="localModel" :item="item"
                :handle-update="handleUpdate" />
            </template>

            <template v-else>
              <component v-if="(item as any).render" :is="RenderComponent(item as any)" />
              <component v-else :is="getComponent((item as any).component)" v-bind="resolveProps(item as any)"
                :model-value="get(localModel, (item as any).field)"
                @update:model-value="(val: any) => handleUpdate((item as any).field, val)">
                <template v-for="(slotContent, slotName) in (item as any).slots" :key="slotName"
                  #[slotName]="slotProps">
                  <component v-if="slotName !== 'label'" :is="slotContent" v-bind="slotProps" />
                </template>
              </component>
            </template>
          </yh-form-item>
        </div>
      </template>
    </div>

    <div v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer" :model="localModel" :form-ref="formRef" />
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
      border-bottom: none;
    }

    &-title {
      font-weight: 600;
      font-size: 16px;
      padding: 0 10px;
      color: var(--yh-text-color-primary, #303133);
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }
  }

  &__collapse-icon {
    margin-left: 8px;
    font-size: 12px;
    opacity: 0.6;
    transition: transform 0.3s;
  }

  &__footer {
    padding-top: 12px;
    border-top: 1px solid var(--yh-border-color-lighter, #f2f6fc);
    margin-top: 12px;
  }
}
</style>
