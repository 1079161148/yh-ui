# Cascader 级联选择器

<script setup lang="ts">
import { ref } from 'vue'

// --- 辅助工具：将 TS 代码转为 JS 代码 ---
const toJs = (ts: string) => ts.replace(' lang="ts"', '').replace(' setup lang="ts"', ' setup')

// ==============================
// 共享演示数据 (仅用于文档渲染，代码块中会重复定义以保证 1:1)
// ==============================
const regionData = [
  {
    value: 'zhejiang', label: '浙江省',
    children: [
      {
        value: 'hangzhou', label: '杭州市',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' }
        ]
      },
      {
        value: 'ningbo', label: '宁波市',
        children: [{ value: 'haishu', label: '海曙区' }]
      }
    ]
  },
  {
    value: 'jiangsu', label: '江苏省',
    children: [
      {
        value: 'nanjing', label: '南京市',
        children: [{ value: 'xuanwu', label: '玄武区' }]
      }
    ]
  }
]

const orgData = [
  {
    value: 'tech', label: '研发部',
    children: [
      { value: 'frontend', label: '前端开发' },
      { value: 'backend', label: '后端开发' }
    ]
  },
  {
    value: 'hr', label: '人事部',
    children: [{ value: 'recruit', label: '招聘主管' }]
  }
]

const categoryData = [
  {
    value: 'digital', label: '数码产品',
    children: [
      { value: 'phone', label: '智能手机' },
      { value: 'laptop', label: '笔记本电脑' }
    ]
  },
  {
    value: 'food', label: '休闲食品', disabled: true,
    children: [{ value: 'snack', label: '膨化食品' }]
  }
]

// 演示变量
const v1 = ref([])
const v2 = ref([])
const v3 = ref([])
const v4 = ref(['zhejiang', 'hangzhou', 'xihu'])
const v5 = ref([])
const v6 = ref([])
const v7 = ref([])
const v8 = ref([])
const v9 = ref([])
const v10 = ref([])
const v11 = ref('xihu')

// 搜索配置
const filterMethod = (node: any, keyword: string) => {
  return node.label.toLowerCase().includes(keyword.toLowerCase())
}

// 大数据
const bigData = Array.from({ length: 40 }).map((_, i) => ({
  value: `group-${i}`, label: `监控分组 ${i + 1}`,
  children: Array.from({ length: 40 }).map((_, j) => ({
    value: `point-${i}-${j}`, label: `设备节点 ${i + 1}-${j + 1}`
  }))
}))

// --- 代码字符串宏定义 ---

const code_regionData = `const options = [
  {
    value: 'zhejiang', label: '浙江省',
    children: [
      {
        value: 'hangzhou', label: '杭州市',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' }
        ]
      },
      {
        value: 'ningbo', label: '宁波市',
        children: [{ value: 'haishu', label: '海曙区' }]
      }
    ]
  },
  {
    value: 'jiangsu', label: '江苏省',
    children: [
      {
        value: 'nanjing', label: '南京市',
        children: [{ value: 'xuanwu', label: '玄武区' }]
      }
    ]
  }
]`

const tsBasic = `<template>
  <yh-cascader v-model="value" :options="options" placeholder="请选择地区" />
  <p class="demo-value">Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
${code_regionData}
<\/script>`

const tsMultiple = `<template>
  <yh-cascader 
    v-model="value" 
    :options="options" 
    multiple 
    collapse-tags 
    placeholder="多选且折叠" 
  />
  <p class="demo-value">Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
const options = [
  {
    value: 'tech', label: '研发部',
    children: [
      { value: 'frontend', label: '前端开发' },
      { value: 'backend', label: '后端开发' }
    ]
  },
  {
    value: 'hr', label: '人事部',
    children: [{ value: 'recruit', label: '招聘主管' }]
  }
]
<\/script>`

const tsStrictly = `<template>
  <yh-cascader 
    v-model="value" 
    :options="options" 
    check-strictly 
    placeholder="可选择任意一级" 
  />
  <p class="demo-value">Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
const options = [
  {
    value: 'tech', label: '研发部',
    children: [
      { value: 'frontend', label: '前端开发' },
      { value: 'backend', label: '后端开发' }
    ]
  }
]
<\/script>`

const tsSearch = `<template>
  <yh-cascader 
    v-model="value" 
    :options="options" 
    filterable 
    placeholder="尝试搜索：西湖" 
  />
  <p class="demo-value">Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
${code_regionData}
<\/script>`

const tsEmitPath = `<template>
  <yh-cascader 
    v-model="value" 
    :options="options" 
    :emit-path="false" 
    placeholder="仅返回叶子节点值" 
  />
  <p class="demo-value">Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('xihu')
${code_regionData}
<\/script>`

const tsSlot = `<template>
  <yh-cascader v-model="value" :options="options" placeholder="自定义内容">
    <template #default="{ node, data }">
      <span>{{ data.label }}</span>
      <span v-if="!node.children?.length" style="color: #999; margin-left: 8px;">
        ({{ data.value }})
      </span>
    </template>
  </yh-cascader>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
${code_regionData}
<\/script>`

const tsBigData = `<template>
  <yh-cascader v-model="value" :options="options" virtual placeholder="万级数据展示" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
const options = Array.from({ length: 40 }).map((_, i) => ({
  value: \`group-\${i}\`, label: \`监控分组 \${i + 1}\`,
  children: Array.from({ length: 40 }).map((_, j) => ({
    value: \`point-\${i}-\${j}\`, label: \`设备节点 \${i + 1}-\${j + 1}\`
  }))
}))
<\/script>`

const tsDisabled = `<template>
  <yh-cascader v-model="value1" :options="options1" disabled placeholder="整机禁用" />
  <yh-cascader v-model="value2" :options="options2" placeholder="选项禁用 (休闲食品被禁用)" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(['zhejiang', 'hangzhou', 'xihu'])
const value2 = ref([])

const options1 = [
  {
    value: 'zhejiang', label: '浙江省',
    children: [
      {
        value: 'hangzhou', label: '杭州市',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' }
        ]
      }
    ]
  }
]

const options2 = [
  {
    value: 'digital', label: '数码产品',
    children: [
      { value: 'phone', label: '智能手机' },
      { value: 'laptop', label: '笔记本电脑' }
    ]
  },
  {
    value: 'food', label: '休闲食品', disabled: true,
    children: [{ value: 'snack', label: '膨化食品' }]
  }
]
<\/script>`

</script>

当一个数据集合有清晰的层级结构（如行政区划、部门架构、商品分类）时，可通过级联选择器逐级选择。

## 基础用法

适用广泛的基础单选。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v1" :options="regionData" placeholder="请选择地区" />
    <p class="demo-res">Value: <code>{{ v1 }}</code></p>
  </div>
</DemoBlock>

## 禁用状态

可以禁用整个组件，或在数据中指定某些选项不可选。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="toJs(tsDisabled)">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-cascader v-model="v4" :options="regionData" disabled placeholder="整机禁用" />
    <yh-cascader v-model="v5" :options="categoryData" placeholder="选项禁用 (休闲食品被禁用)" />
    <p class="demo-res">Value: <code>{{ v5 }}</code></p>
  </div>
</DemoBlock>

## 多选与折叠

设置 `multiple` 开启多选；使用 `collapse-tags` 折叠显示标签。

<DemoBlock title="多选模式" :ts-code="tsMultiple" :js-code="toJs(tsMultiple)">
  <div style="max-width: 400px;">
    <yh-cascader v-model="v2" :options="orgData" multiple collapse-tags placeholder="选择多个部门" />
    <p class="demo-res">Value: <code>{{ v2 }}</code></p>
  </div>
</DemoBlock>

## 选择任意一级

启用 `check-strictly` 属性后，用户可以选中分级中的任何一级节点。

<DemoBlock title="任意级选择" :ts-code="tsStrictly" :js-code="toJs(tsStrictly)">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v3" :options="orgData" check-strictly placeholder="允许选择父级" />
    <p class="demo-res">Value: <code>{{ v3 }}</code></p>
  </div>
</DemoBlock>

## 返回模式 (emit-path)

默认返回完整路径数组。设置 `emit-path="false"` 后，将仅返回选中节点的 `value`。

<DemoBlock title="非路径模式" :ts-code="tsEmitPath" :js-code="toJs(tsEmitPath)">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v11" :options="regionData" :emit-path="false" placeholder="只返回叶子值" />
    <p class="demo-res">Value: <code>{{ v11 }}</code></p>
  </div>
</DemoBlock>

## 搜索过滤

开启 `filterable` 支持快速搜索建议。支持匹配完整路径中的任何一段名称。

<DemoBlock title="可搜索" :ts-code="tsSearch" :js-code="toJs(tsSearch)">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v8" :options="regionData" filterable placeholder="输入搜索：如“杭州”或“西湖”" />
    <p class="demo-res">Value: <code>{{ v8 }}</code></p>
  </div>
</DemoBlock>

## 自定义内容

使用 `#default` 插槽可以完全自定义菜单项的渲染样式。

<DemoBlock title="自定义插槽" :ts-code="tsSlot" :js-code="toJs(tsSlot)">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v10" :options="regionData" placeholder="自定义渲染">
      <template #default="{ node, data }">
        <span>{{ data.label }}</span>
        <span v-if="!node.children?.length" style="color: #999; margin-left: 8px; font-size: 12px;">
          ({{ data.value }})
        </span>
      </template>
    </yh-cascader>
  </div>
</DemoBlock>

## 大数据优化

开启 `virtual` 启用虚拟滚动。应对上万级节点时，依然能保持极其流畅的交互体验。

<DemoBlock title="虚拟滚动" :ts-code="tsBigData" :js-code="toJs(tsBigData)">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v9" :options="bigData" virtual placeholder="开启虚拟显示（2500节点）" />
  </div>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string \| number \| (string \| number)[] \| (string \| number)[][]` | — |
| options | 可选项数据源 | `CascaderOption[]` | `[]` |
| props | 配置选项，具体见下表 | `object` | — |
| placeholder | 输入框占位文本 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否支持清空 | `boolean` | `false` |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| filterable | 是否支持搜索过滤 | `boolean` | `false` |
| filter-method | 自定义过滤方法 | `(node: CascaderOption, keyword: string) => boolean` | — |
| separator | 选项路径分隔符 | `string` | `' / '` |
| show-all-levels | 是否显示完整路径标签 | `boolean` | `true` |
| multiple | 是否启用多选 | `boolean` | `false` |
| check-strictly | 是否允许选择任意一级节点 | `boolean` | `false` |
| expand-trigger | 次级菜单展开方式 | `'click' \| 'hover'` | `'click'` |
| emit-path | 在选中节点改变时，是否返回由该节点所在各级菜单的值所组成的数组 | `boolean` | `true` |
| collapse-tags | 多选时是否折叠标签 | `boolean` | `false` |
| collapse-tags-tooltip | 是否在折叠标签时显示 tooltip | `boolean` | `false` |
| max-collapse-tags | 标签折叠前的最大展示数量 | `number` | `1` |
| virtual | 是否开启虚拟滚动 | `boolean` | `false` |
| virtual-item-height | 虚拟滚动项高度 | `number` | `34` |
| popper-class | 下拉框自定义类名 | `string` | — |
| teleported | 是否将下拉层挂载至 body | `boolean` | `true` |
| tag-type | 多选标签的类型 | `'success' \| 'info' \| 'warning' \| 'danger' \| ''` | `''` |
| validate-event | 输入时是否触发表单验证 | `boolean` | `true` |

### CascaderOption

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项的值 | `string \| number` | — |
| label | 选项的标签名 | `string` | — |
| children | 子选项数组 | `CascaderOption[]` | — |
| disabled | 是否禁用该选项 | `boolean` | `false` |
| leaf | 是否是叶子节点 | `boolean` | — |

### Cascader Config (props)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expandTrigger | 次级菜单的展开方式 | `'click' \| 'hover'` | `'click'` |
| multiple | 是否多选 | `boolean` | `false` |
| checkStrictly | 是否允许选择任意一级节点 | `boolean` | `false` |
| emitPath | 是否返回路径数组 | `boolean` | `true` |
| value | 指定选项的值为选项对象的某个属性值 | `string` | `'value'` |
| label | 指定选项标签为选项对象的某个属性值 | `string` | `'label'` |
| children | 指定选项的子选项为选项对象的某个属性值 | `string` | `'children'` |
| disabled | 指定选项的禁用为选项对象的某个属性值 | `string` | `'disabled'` |
| leaf | 指定选项的叶子节点为选项对象的某个属性值 | `string` | `'leaf'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中值发生变化时触发 | `(value: any) => void` |
| expand-change | 展开节点发生变化时触发 | `(value: any[]) => void` |
| visible-change | 下拉框显示/隐藏时触发 | `(visible: boolean) => void` |
| focus | 获取焦点时触发 | `(event: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(event: FocusEvent) => void` |
| clear | 点击清空按钮时触发 | — |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义节点内容 | `{ node: CascaderOption, data: CascaderOption }` |
| empty | 无匹配数据时的显示内容 | — |

### Expose

| 属性/方法名 | 说明 | 类型 |
| --- | --- | --- |
| focus | 使输入框获取焦点 | `() => void` |
| blur | 使输入框失去焦点 | `() => void` |
| getCheckedNodes | 获取当前选中的节点对象数组 | `(leafOnly?: boolean) => CascaderOption[]` |
| inputRef | 输入框的 DOM 引用 | `HTMLInputElement` |

### 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-cascader-height` | 级联选择器高度 | `32px` |
| `--yh-cascader-bg-color` | 背景颜色 | `var(--yh-fill-color-blank)` |
| `--yh-cascader-border-color` | 边框颜色 | `var(--yh-border-color)` |
| `--yh-cascader-border-color-hover` | 悬停时边框颜色 | `var(--yh-border-color-hover)` |
| `--yh-cascader-border-color-focus` | 聚焦时边框颜色 | `var(--yh-color-primary)` |
| `--yh-cascader-text-color` | 文字颜色 | `var(--yh-text-color-regular)` |
| `--yh-cascader-placeholder-color` | 占位文字颜色 | `var(--yh-text-color-placeholder)` |
| `--yh-cascader-node-height` | 选项节点高度 | `34px` |
| `--yh-cascader-node-bg-color-hover` | 选项悬停背景色 | `var(--yh-fill-color-light)` |
| `--yh-cascader-node-bg-color-active` | 选项激活背景色 | `var(--yh-fill-color-light)` |
| `--yh-cascader-node-text-color-active` | 选项激活文字颜色 | `var(--yh-color-primary)` |
| `--yh-cascader-menu-min-width` | 菜单最小宽度 | `180px` |
| `--yh-cascader-menu-max-height` | 菜单最大高度 | `274px` |

<style>
.demo-res {
  margin: 12px 0 0;
  font-size: 13px;
  color: #666;
}
.demo-res code {
  color: var(--yh-color-primary);
  background: var(--yh-color-primary-light-9);
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
