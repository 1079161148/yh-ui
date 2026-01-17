# Transfer 穿梭框

穿梭框将多个列表项从一个列表移动到另一个列表。通常用于权限分配、角色绑定等场景。

<script setup lang="ts">
import { ref, h } from 'vue'

// --- 辅助宏：将 TS 代码转为 JS 代码 ---
const toJs = (ts: string) => ts.replace(' lang="ts"', '').replace(' setup lang="ts"', ' setup')

// ==============================
// 演示数据定义
// ==============================

const basicValue = ref([1, 4])
const basicData = [
  { key: 1, label: 'California' },
  { key: 2, label: 'Illinois' },
  { key: 3, label: 'Maryland', disabled: true },
  { key: 4, label: 'Texas' },
  { key: 5, label: 'Florida' },
  { key: 6, label: 'Colorado' },
  { key: 7, label: 'Connecticut' }
]

const filterValue = ref([])
const filterData = [...basicData]
const filterMethod = (query: string, item: any) => {
  return item.label.toLowerCase().includes(query.toLowerCase())
}

const customValue = ref([])
const customData = [
  { key: 1, label: 'Option 1' },
  { key: 2, label: 'Option 2' },
  { key: 3, label: 'Option 3' }
]

const aliasValue = ref([102])
const aliasProps = { key: 'id', label: 'name', disabled: 'unavailable' }
const aliasData = [
  { id: 101, name: '研发部' },
  { id: 102, name: '市场部' },
  { id: 103, name: '人事部', unavailable: true },
  { id: 104, name: '财务部' }
]

const slotValue = ref([])
const slotValue2 = ref([])
const renderContent = (h: any, option: any) => {
  return h('span', null, option.key + ' - ' + option.label)
}

const virtualValue = ref([])
const virtualData = Array.from({ length: 2000 }).map((_, i) => ({
  key: i,
  label: 'Option ' + i,
  disabled: i % 4 === 0
}))

const btnValue = ref([])
const btnData = [
  { key: 1, label: 'Item A' },
  { key: 2, label: 'Item B' },
  { key: 3, label: 'Item C' }
]

// ==============================
// 代码字符串定义 (恢复正常写法，使用拼接避开编译检测)
// ==============================

const tsBasic = `<` + `template>
  <yh-transfer v-model="value" :data="data" />
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref([1, 4])
const data = [
  { key: 1, label: 'California' },
  { key: 2, label: 'Illinois' },
  { key: 3, label: 'Maryland', disabled: true },
  { key: 4, label: 'Texas' },
  { key: 5, label: 'Florida' },
  { key: 6, label: 'Colorado' },
  { key: 7, label: 'Connecticut' }
]
</` + `script>`

const tsFilter = `<` + `template>
  <yh-transfer
    v-model="value"
    filterable
    :filter-method="filterMethod"
    filter-placeholder="State Abbreviations"
    :data="data"
  />
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const data = [
  { key: 1, label: 'California' },
  { key: 2, label: 'Illinois' },
  { key: 3, label: 'Maryland', disabled: true },
  { key: 4, label: 'Texas' },
  { key: 5, label: 'Florida' },
  { key: 6, label: 'Colorado' },
  { key: 7, label: 'Connecticut' }
]

const filterMethod = (query: string, item: any) => {
  return item.label.toLowerCase().includes(query.toLowerCase())
}
</` + `script>`

const tsCustom = `<` + `template>
  <yh-transfer
    v-model="value"
    :data="data"
    :titles="['Source', 'Target']"
    :button-texts="['To Left', 'To Right']"
  >
    <template #left-footer>
      <div class="transfer-footer">Source Footer</div>
    </template>
    <template #right-footer>
      <div class="transfer-footer">Target Footer</div>
    </template>
  </yh-transfer>
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const data = [
  { key: 1, label: 'Option 1' },
  { key: 2, label: 'Option 2' },
  { key: 3, label: 'Option 3' }
]
</` + `script>

<` + `style>
.transfer-footer {
  text-align: center;
  padding: 5px;
  font-size: 12px;
  color: #909399;
}
</` + `style>`

const tsAlias = `<` + `template>
  <yh-transfer
    v-model="value"
    :props="{
      key: 'id',
      label: 'name',
      disabled: 'unavailable'
    }"
    :data="data"
  />
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref([102])
const data = [
  { id: 101, name: '研发部' },
  { id: 102, name: '市场部' },
  { id: 103, name: '人事部', unavailable: true },
  { id: 104, name: '财务部' }
]
</` + `script>`

const tsSlot = `<` + `template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <!-- 默认插槽 -->
    <yh-transfer v-model="value" :data="data">
      <template #default="{ option }">
        <span style="color: #409eff; font-weight: bold;">{{ option.key }}</span>
        <span> - {{ option.label }}</span>
      </template>
    </yh-transfer>

    <!-- Render Content -->
    <yh-transfer v-model="value2" :data="data" :render-content="renderContent" />
  </div>
</` + `template>

<` + `script setup lang="ts">
import { ref, h } from 'vue'

const value = ref([])
const value2 = ref([])
const data = [
  { key: 1, label: 'California' },
  { key: 2, label: 'Illinois' },
  { key: 3, label: 'Maryland', disabled: true },
  { key: 4, label: 'Texas' },
  { key: 5, label: 'Florida' },
  { key: 6, label: 'Colorado' },
  { key: 7, label: 'Connecticut' }
]

const renderContent = (h, option) => {
  return h('span', null, \`\${option.key} - \${option.label}\`)
}
</` + `script>`

const tsVirtual = `<` + `template>
  <yh-transfer
    v-model="value"
    virtual
    :data="data"
    :height="300"
    :item-height="32"
  />
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const generateData = () => {
  const data = []
  for (let i = 1; i <= 2000; i++) {
    data.push({
      key: i,
      label: 'Option ' + i,
      disabled: i % 4 === 0
    })
  }
  return data
}
const data = generateData()
</` + `script>`

const tsBtn = `<` + `template>
  <yh-transfer v-model="value" :data="data">
    <template #buttons="{ moveToLeft, moveToRight, leftChecked, rightChecked }">
      <div class="custom-buttons">
        <yh-button 
          type="primary" 
          size="small" 
          :disabled="leftChecked.length === 0" 
          @click="moveToRight"
        >
          Add <yh-icon name="arrow-right" />
        </yh-button>
        <yh-button 
          type="primary" 
          size="small" 
          :disabled="rightChecked.length === 0" 
          @click="moveToLeft"
        >
          <yh-icon name="arrow-left" /> Remove
        </yh-button>
      </div>
    </template>
  </yh-transfer>
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const data = [
  { key: 1, label: 'Item A' },
  { key: 2, label: 'Item B' },
  { key: 3, label: 'Item C' }
]
</` + `script>

<` + `style>
.custom-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
}
</` + `style>`

</script>

## 基础用法

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <yh-transfer v-model="basicValue" :data="basicData" />
</DemoBlock>

## 可搜索

<DemoBlock title="可搜索" :ts-code="tsFilter" :js-code="toJs(tsFilter)">
  <yh-transfer
    v-model="filterValue"
    filterable
    :filter-method="filterMethod"
    filter-placeholder="State Abbreviations"
    :data="filterData"
  />
</DemoBlock>

## 自定义文案

<DemoBlock title="自定义文案" :ts-code="tsCustom" :js-code="toJs(tsCustom)">
  <yh-transfer
    v-model="customValue"
    :data="customData"
    :titles="['Source', 'Target']"
    :button-texts="['To Left', 'To Right']"
  >
    <template #left-footer>
      <div class="transfer-footer">Source Footer</div>
    </template>
    <template #right-footer>
      <div class="transfer-footer">Target Footer</div>
    </template>
  </yh-transfer>
</DemoBlock>

## 数据映射

<DemoBlock title="字段别名" :ts-code="tsAlias" :js-code="toJs(tsAlias)">
  <yh-transfer 
    v-model="aliasValue" 
    :props="aliasProps" 
    :data="aliasData" 
  />
</DemoBlock>

## 内容自定义

<DemoBlock title="内容自定义" :ts-code="tsSlot" :js-code="toJs(tsSlot)">
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <yh-transfer v-model="slotValue" :data="basicData">
      <template #default="{ option }">
        <span style="color: #409eff; font-weight: bold;">{{ option.key }}</span>
        <span> - {{ option.label }}</span>
      </template>
    </yh-transfer>
    <yh-transfer v-model="slotValue2" :data="basicData" :render-content="renderContent" />
  </div>
</DemoBlock>

## 虚拟滚动

<DemoBlock title="虚拟滚动" :ts-code="tsVirtual" :js-code="toJs(tsVirtual)">
  <yh-transfer
    v-model="virtualValue"
    virtual
    :data="virtualData"
    :height="300"
    :item-height="32"
  />
</DemoBlock>

## 按钮区自定义

<DemoBlock title="按钮区域自定义" :ts-code="tsBtn" :js-code="toJs(tsBtn)">
  <yh-transfer v-model="btnValue" :data="btnData">
    <template #buttons="{ moveToLeft, moveToRight, leftChecked, rightChecked }">
      <div class="custom-buttons">
        <yh-button 
          type="primary" 
          size="small" 
          :disabled="leftChecked.length === 0" 
          @click="moveToRight"
        >
          Add <yh-icon name="arrow-right" />
        </yh-button>
        <yh-button 
          type="primary" 
          size="small" 
          :disabled="rightChecked.length === 0" 
          @click="moveToLeft"
        >
          <yh-icon name="arrow-left" /> Remove
        </yh-button>
      </div>
    </template>
  </yh-transfer>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `TransferKey[]` | `[]` |
| data | 数据源 | `TransferData[]` | `[]` |
| filterable | 是否可搜索 | `boolean` | `false` |
| filter-placeholder | 搜索框占位符 | `string` | `'请输入关键词'` |
| filter-method | 自定义搜索方法 | `(query, item) => boolean` | — |
| target-order | 右侧排序策略 | `'original' \| 'push' \| 'unshift'` | `'original'` |
| titles | 列表标题 | `[string, string]` | `['列表 1', '列表 2']` |
| button-texts | 按钮文案 | `[string, string]` | `[]` |
| render-content | 自定义渲染内容 | `(h, option) => VNode` | — |
| props | 数据源别名配置 | `TransferPropsAlias` | — |
| left-default-checked | 左侧默认勾选 | `TransferKey[]` | `[]` |
| right-default-checked | 右侧默认勾选 | `TransferKey[]` | `[]` |
| virtual | 开启虚拟滚动 | `boolean` | `false` |
| height | 列表高度 | `number` | `280` |
| item-height | 行高（虚拟滚动） | `number` | `40` |
| empty-text | 空数据文本 | `string` | `'暂无数据'` |
| show-all-checkbox | 是否显示全选 | `boolean` | `true` |
| left-title | 左侧标题 | `string` | — |
| right-title | 右侧标题 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 右侧列表元素变化时触发 | `(value, direction, movedKeys)` |
| left-check-change | 左侧勾选变化时触发 | `(value, movedKeys)` |
| right-check-change | 右侧勾选变化时触发 | `(value, movedKeys)` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义数据项内容 | `{ option }` |
| left-header | 左侧头部内容 | — |
| right-header | 右侧头部内容 | — |
| left-footer | 左侧底部内容 | — |
| right-footer | 右侧底部内容 | — |
| left-empty | 左侧空内容 | — |
| right-empty | 右侧空内容 | — |
| buttons | 自定义操作按钮区 | `{ moveToLeft, moveToRight, leftChecked, rightChecked }` |

### Expose

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| clearLeftChecked | 清空左侧勾选 | `() => void` |
| clearRightChecked | 清空右侧勾选 | `() => void` |
| leftPanel | 左面板实例 | `TransferPanelExpose` |
| rightPanel | 右面板实例 | `TransferPanelExpose` |

## 主题变量

| Variable Name | Default | Description |
| --- | --- | --- |
| `--yh-transfer-panel-width` | `200px` | 面板宽度 |
| `--yh-transfer-panel-height` | `300px` | 面板高度 |
| `--yh-transfer-header-height` | `40px` | 头部高度 |
| `--yh-transfer-header-bg` | `#f5f7fa` | 头部背景 |
| `--yh-transfer-item-height` | `32px` | 行高 |
| `--yh-transfer-border-color` | `#ebeef5` | 边框颜色 |

<style>
.transfer-footer {
  text-align: center;
  padding: 5px;
  font-size: 12px;
  color: #909399;
  border-top: 1px solid #ebeef5;
}
.custom-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
}
</style>
