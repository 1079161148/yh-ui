# Cascader 级联选择器

适用于具有明确层级结构的数据选择，如地区、部门、分类和资源目录等。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

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

const customFieldData = [
  {
    code: 'res', name: '资源库',
    sub: [
      { code: 'img', name: '图片区' },
      { code: 'video', name: '视频区' }
    ]
  },
  {
    code: 'doc', name: '文档库',
    sub: [
      { code: 'pdf', name: 'PDF 文档' },
      { code: 'word', name: 'Word 文档' }
    ]
  }
]

const v1 = ref([])
const v2 = ref([])
const v3 = ref([])
const v4 = ref(['zhejiang', 'hangzhou', 'xihu'])
const v5 = ref([])
const v6 = ref([
  ['zhejiang', 'hangzhou', 'binjiang'],
  ['jiangsu', 'nanjing', 'xuanwu']
])
const v8 = ref([])
const v9 = ref([])
const v10 = ref([])
const v11 = ref('xihu')
const v12 = ref([])
const nuxtCascader = ref([])

const bigData = Array.from({ length: 40 }).map((_, i) => ({
  value: `group-${i}`, label: `监控分组 ${i + 1}`,
  children: Array.from({ length: 40 }).map((_, j) => ({
    value: `point-${i}-${j}`, label: `设备节点 ${i + 1}-${j + 1}`
  }))
}))

const codeRegionData = `const options = [
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

const tsBasic = `<${_T}>
  <yh-cascader v-model="value" :options="options" placeholder="请选择地区" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
${codeRegionData}
</${_S}>`

const tsInitValue = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-cascader v-model="value1" :options="options" placeholder="单选回显" />
    <yh-cascader v-model="value2" :options="options" multiple placeholder="多选回显" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value1 = ref(['zhejiang', 'hangzhou', 'xihu'])
const value2 = ref([
  ['zhejiang', 'hangzhou', 'binjiang'],
  ['jiangsu', 'nanjing', 'xuanwu']
])

${codeRegionData}
</${_S}>`

const tsDisabled = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-cascader v-model="value1" :options="options1" disabled placeholder="整机禁用" />
    <yh-cascader v-model="value2" :options="options2" placeholder="选项禁用" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value1 = ref(['zhejiang', 'hangzhou', 'xihu'])
const value2 = ref([])

const options1 = [
  {
    value: 'zhejiang', label: '浙江省',
    children: [
      {
        value: 'hangzhou', label: '杭州市',
        children: [{ value: 'xihu', label: '西湖区' }]
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
</${_S}>`

const tsMultiple = `<${_T}>
  <yh-cascader
    v-model="value"
    :options="options"
    multiple
    collapse-tags
    placeholder="多选并折叠标签"
  />
</${_T}>

<${_S} setup lang="ts">
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
</${_S}>`

const tsStrictly = `<${_T}>
  <yh-cascader
    v-model="value"
    :options="options"
    check-strictly
    placeholder="允许选择任意层级"
  />
</${_T}>

<${_S} setup lang="ts">
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
</${_S}>`

const tsEmitPath = `<${_T}>
  <yh-cascader
    v-model="value"
    :options="options"
    :emit-path="false"
    placeholder="仅返回叶子值"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('xihu')
${codeRegionData}
</${_S}>`

const tsFilterable = `<${_T}>
  <yh-cascader
    v-model="value"
    :options="options"
    filterable
    placeholder="尝试搜索：西湖"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
${codeRegionData}
</${_S}>`

const tsSlot = `<${_T}>
  <yh-cascader v-model="value" :options="options" placeholder="自定义节点内容">
    <template #default="{ node, data }">
      <span>{{ data.label }}</span>
      <span v-if="!node.children?.length" style="color: #999; margin-left: 8px; font-size: 12px;">
        ({{ data.value }})
      </span>
    </template>
  </yh-cascader>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
${codeRegionData}
</${_S}>`

const tsCustomProps = `<${_T}>
  <yh-cascader
    v-model="value"
    :options="options"
    :props="{ value: 'code', label: 'name', children: 'sub' }"
    placeholder="自定义字段名"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  {
    code: 'res', name: '资源库',
    sub: [
      { code: 'img', name: '图片区' },
      { code: 'video', name: '视频区' }
    ]
  },
  {
    code: 'doc', name: '文档库',
    sub: [
      { code: 'pdf', name: 'PDF 文档' },
      { code: 'word', name: 'Word 文档' }
    ]
  }
]
</${_S}>`

const tsVirtual = `<${_T}>
  <yh-cascader v-model="value" :options="options" virtual placeholder="大数据量展示" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = Array.from({ length: 40 }).map((_, i) => ({
  value: \`group-\${i}\`, label: \`监控分组 \${i + 1}\`,
  children: Array.from({ length: 40 }).map((_, j) => ({
    value: \`point-\${i}-\${j}\`, label: \`设备节点 \${i + 1}-\${j + 1}\`
  }))
}))
</${_S}>`

const tsNuxt = `<${_T}>
  <yh-cascader v-model="value" :options="options" placeholder="Nuxt 自动导入" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  {
    value: 'guide', label: '指南',
    children: [
      { value: 'design', label: '设计原则' },
      { value: 'nav', label: '导航' }
    ]
  }
]
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsInitValue = toJs(tsInitValue)
const jsDisabled = toJs(tsDisabled)
const jsMultiple = toJs(tsMultiple)
const jsStrictly = toJs(tsStrictly)
const jsEmitPath = toJs(tsEmitPath)
const jsFilterable = toJs(tsFilterable)
const jsSlot = toJs(tsSlot)
const jsCustomProps = toJs(tsCustomProps)
const jsVirtual = toJs(tsVirtual)
const jsNuxt = toJs(tsNuxt)
</script>

## 基础用法

最常见的单选级联场景。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v1" :options="regionData" placeholder="请选择地区" />
  </div>
</DemoBlock>

## 初始值回显

只要 `v-model` 值结构与 `emit-path` 配置一致，就可以正确回显单选和多选结果。

<DemoBlock title="初始值回显" :ts-code="tsInitValue" :js-code="jsInitValue">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-cascader v-model="v4" :options="regionData" placeholder="单选回显" />
    <yh-cascader v-model="v6" :options="regionData" multiple placeholder="多选回显" />
  </div>
</DemoBlock>

## 禁用状态

既可以禁用整个组件，也可以在选项数据中禁用某些节点。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
    <yh-cascader v-model="v4" :options="regionData" disabled placeholder="整机禁用" />
    <yh-cascader v-model="v5" :options="categoryData" placeholder="选项禁用" />
  </div>
</DemoBlock>

## 多选与标签折叠

通过 `multiple` 开启多选，`collapse-tags` 用于压缩标签展示。

<DemoBlock title="多选与标签折叠" :ts-code="tsMultiple" :js-code="jsMultiple">
  <div style="max-width: 400px;">
    <yh-cascader v-model="v2" :options="orgData" multiple collapse-tags placeholder="选择多个部门" />
  </div>
</DemoBlock>

## 任意层级选择

开启 `check-strictly` 后，父节点和叶子节点都可以直接作为结果。

<DemoBlock title="任意层级选择" :ts-code="tsStrictly" :js-code="jsStrictly">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v3" :options="orgData" check-strictly placeholder="允许选择父级" />
  </div>
</DemoBlock>

## 返回叶子值

默认情况下组件返回完整路径数组；设置 `emit-path="false"` 后只返回当前选中节点的值。

<DemoBlock title="返回叶子值" :ts-code="tsEmitPath" :js-code="jsEmitPath">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v11" :options="regionData" :emit-path="false" placeholder="仅返回叶子值" />
    <p class="demo-res">Value: <code>{{ v11 }}</code></p>
  </div>
</DemoBlock>

## 搜索过滤

开启 `filterable` 后会在客户端根据完整路径进行过滤，也可以通过 `filter-method` 自定义匹配逻辑。

<DemoBlock title="搜索过滤" :ts-code="tsFilterable" :js-code="jsFilterable">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v8" :options="regionData" filterable placeholder="尝试搜索：西湖" />
  </div>
</DemoBlock>

## 自定义节点内容

通过默认插槽自定义下拉节点的渲染。

<DemoBlock title="自定义节点内容" :ts-code="tsSlot" :js-code="jsSlot">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v10" :options="regionData" placeholder="自定义节点内容">
      <template #default="{ node, data }">
        <span>{{ data.label }}</span>
        <span v-if="!node.children?.length" style="color: #999; margin-left: 8px; font-size: 12px;">
          ({{ data.value }})
        </span>
      </template>
    </yh-cascader>
  </div>
</DemoBlock>

## 自定义字段名

如果数据结构不是 `value / label / children`，可以通过 `props` 重新映射字段。

<DemoBlock title="自定义字段名" :ts-code="tsCustomProps" :js-code="jsCustomProps">
  <div style="max-width: 320px;">
    <yh-cascader
      v-model="v12"
      :options="customFieldData"
      :props="{ value: 'code', label: 'name', children: 'sub' }"
      placeholder="自定义字段名"
    />
  </div>
</DemoBlock>

## 大数据量优化

开启 `virtual` 后，下拉列表会使用虚拟滚动渲染节点。

<DemoBlock title="虚拟滚动" :ts-code="tsVirtual" :js-code="jsVirtual">
  <div style="max-width: 320px;">
    <yh-cascader v-model="v9" :options="bigData" virtual placeholder="大数据量展示" />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

安装 `@yh-ui/nuxt` 后可以直接使用 `YhCascader`。输入框本体和已选值可以在 SSR 阶段正常输出，下拉层会在客户端交互时通过 `Teleport` 渲染。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 320px;">
    <yh-cascader v-model="nuxtCascader" :options="[{ value: 'guide', label: '指南', children: [{ value: 'design', label: '设计原则' }] }]" placeholder="Nuxt 自动导入" />
  </div>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string \| number \| (string \| number)[] \| (string \| number)[][]` | `undefined` |
| options | 选项数据 | `CascaderOption[]` | `undefined` |
| placeholder | 占位文本 | `string` | `undefined` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| size | 组件尺寸 | `'large' \| 'default' \| 'small'` | `undefined` |
| filterable | 是否支持搜索 | `boolean` | `false` |
| filter-method | 自定义过滤方法 | `(node: CascaderOption, keyword: string) => boolean` | `undefined` |
| separator | 路径分隔符 | `string` | `' / '` |
| show-all-levels | 是否展示完整路径标签 | `boolean` | `true` |
| collapse-tags | 多选时是否折叠标签 | `boolean` | `false` |
| collapse-tags-tooltip | 折叠标签时是否显示提示 | `boolean` | `false` |
| max-collapse-tags | 折叠前最多显示的标签数 | `number` | `1` |
| multiple | 是否多选 | `boolean` | `false` |
| check-strictly | 是否允许选择任意层级 | `boolean` | `false` |
| expand-trigger | 展开触发方式 | `'click' \| 'hover'` | `undefined` |
| emit-path | 是否返回完整路径 | `boolean` | `true` |
| virtual | 是否启用虚拟滚动 | `boolean` | `false` |
| virtual-item-height | 虚拟滚动项高度 | `number` | `34` |
| props | 自定义字段配置 | `Partial<CascaderConfig>` | `undefined` |
| popper-class | 下拉层自定义类名 | `string` | `undefined` |
| teleported | 是否将下拉层传送到 `body` | `boolean` | `true` |
| tag-type | 多选标签类型 | `'success' \| 'info' \| 'warning' \| 'danger' \| ''` | `''` |
| validate-event | 是否触发表单校验 | `boolean` | `true` |
| theme-overrides | 组件主题覆盖变量 | `ComponentThemeVars` | `undefined` |

### CascaderOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| value | 节点值 | `string \| number` |
| label | 节点文本 | `string` |
| children | 子节点数组 | `CascaderOption[] \| undefined` |
| disabled | 是否禁用 | `boolean \| undefined` |
| leaf | 是否叶子节点 | `boolean \| undefined` |

### CascaderConfig

| 字段 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expandTrigger | 展开触发方式 | `'click' \| 'hover'` | `'click'` |
| multiple | 是否多选 | `boolean` | `false` |
| checkStrictly | 是否允许任意层级选择 | `boolean` | `false` |
| emitPath | 是否返回完整路径 | `boolean` | `true` |
| lazy | 是否启用懒加载 | `boolean` | `false` |
| lazyLoad | 懒加载函数 | `(node: CascaderOption, resolve: (children: CascaderOption[]) => void) => void` | `undefined` |
| value | 值字段名 | `string` | `'value'` |
| label | 标签字段名 | `string` | `'label'` |
| children | 子节点字段名 | `string` | `'children'` |
| disabled | 禁用字段名 | `string` | `'disabled'` |
| leaf | 叶子节点字段名 | `string` | `'leaf'` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 绑定值变化时触发 | `(value: CascaderValue \| undefined) => void` |
| change | 选中值变化时触发 | `(value: CascaderValue \| undefined) => void` |
| focus | 输入框获取焦点时触发 | `(event: FocusEvent) => void` |
| blur | 输入框失去焦点时触发 | `(event: FocusEvent) => void` |
| clear | 点击清空按钮时触发 | `() => void` |
| expand-change | 展开路径变化时触发 | `(value: (string \| number)[]) => void` |
| visible-change | 下拉层显隐变化时触发 | `(visible: boolean) => void` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义节点内容 | `{ node: CascaderOption, data: CascaderOption }` |
| empty | 无匹配数据时的内容 | - |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| focus | 让输入框获取焦点 | `() => void` |
| blur | 让输入框失去焦点 | `() => void` |
| getCheckedNodes | 获取当前选中的节点对象 | `(leafOnly?: boolean) => CascaderOption[]` |
| inputRef | 原生输入框引用 | `Ref<HTMLInputElement \| undefined>` |

### 类型导出

| 类型名 | 说明 |
| --- | --- |
| `YhCascaderProps` | 组件 Props 类型 |
| `YhCascaderEmits` | 组件 Emits 类型 |
| `YhCascaderExpose` | 组件 Expose 类型 |
| `YhCascaderOption` | 选项节点类型 |

### 主题变量

组件支持 `themeOverrides`，并在样式中消费以下 CSS 变量：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-cascader-height` | 默认高度 | `32px` |
| `--yh-cascader-height-large` | 大尺寸高度 | `40px` |
| `--yh-cascader-height-small` | 小尺寸高度 | `24px` |
| `--yh-cascader-bg-color` | 输入区背景色 | `var(--yh-fill-color-blank, #fff)` |
| `--yh-cascader-border-color` | 边框颜色 | `var(--yh-border-color, #dcdfe6)` |
| `--yh-cascader-border-color-hover` | 悬停边框色 | `var(--yh-border-color-hover, #c0c4cc)` |
| `--yh-cascader-border-color-focus` | 聚焦边框色 | `var(--yh-color-primary, #409eff)` |
| `--yh-cascader-border-radius` | 圆角 | `var(--yh-border-radius-base, 4px)` |
| `--yh-cascader-text-color` | 文本色 | `var(--yh-text-color-regular, #606266)` |
| `--yh-cascader-placeholder-color` | 占位文本色 | `var(--yh-text-color-placeholder, #a8abb2)` |
| `--yh-cascader-disabled-bg-color` | 禁用背景色 | `var(--yh-fill-color-light, #f5f7fa)` |
| `--yh-cascader-disabled-text-color` | 禁用文本色 | `var(--yh-text-color-placeholder, #a8abb2)` |
| `--yh-cascader-node-height` | 节点高度 | `34px` |
| `--yh-cascader-node-bg-color-hover` | 节点悬停背景色 | `var(--yh-fill-color-light, #f5f7fa)` |
| `--yh-cascader-node-text-color-hover` | 节点悬停文本色 | `var(--yh-text-color-regular, #606266)` |
| `--yh-cascader-node-bg-color-active` | 节点激活背景色 | `var(--yh-fill-color-light, #f5f7fa)` |
| `--yh-cascader-node-text-color-active` | 节点激活文本色 | `var(--yh-color-primary, #409eff)` |
| `--yh-cascader-dropdown-bg-color` | 下拉层背景色 | `var(--yh-bg-color-overlay, #fff)` |
| `--yh-cascader-dropdown-border-color` | 下拉层边框色 | `var(--yh-border-color-light, #e4e7ed)` |
| `--yh-cascader-dropdown-shadow` | 下拉层阴影 | `var(--yh-box-shadow-light, 0 2px 12px 0 rgba(0, 0, 0, 0.1))` |
| `--yh-cascader-menu-min-width` | 菜单最小宽度 | `180px` |
| `--yh-cascader-menu-max-height` | 菜单最大高度 | `274px` |
| `--yh-cascader-menu-border-color` | 菜单分隔线颜色 | `var(--yh-border-color-light, #e4e7ed)` |

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
