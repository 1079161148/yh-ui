# Table 表格 - 自定义插槽模板

通过插槽可以在表格的不同位置插入自定义内容，例如表格上方的工具栏、左侧/右侧操作区域等。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 公共数据 ====================
const tableData = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, dept: '设计部', status: '离职', address: '广州市天河区' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', status: '在职', address: '深圳市南山区' }
])

const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

// ==================== 1. 左侧模板 ====================
const searchText1 = ref('')

// ==================== 2. 左侧前缀模板 ====================

// ==================== 3. 左侧后缀模板 ====================

// ==================== 4. 右侧模板 ====================
const tableRef4 = ref()

// ==================== 5. 右侧前缀模板 ====================

// ==================== 6. 右侧后缀模板 ====================

// ==================== 示例代码 ====================

const tsToolbarLeft = `<${_T}>
  <yh-table :data="data" :columns="columns" border show-index>
    <template #toolbar-left>
      <div style="display: flex; gap: 8px; align-items: center;">
        <input v-model="searchText" placeholder="搜索姓名..." style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 160px;" />
        <yh-button type="primary" size="small">搜索</yh-button>
        <yh-button type="success" size="small">新增</yh-button>
        <yh-button type="danger" size="small">批量删除</yh-button>
      </div>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, dept: '设计部', status: '离职', address: '广州市天河区' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', status: '在职', address: '深圳市南山区' }
])

const searchText = ref('')

const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsToolbarLeft = toJs(tsToolbarLeft)

const tsToolbarLeftPrefix = `<${_T}>
  <yh-table :data="data" :columns="columns" border>
    <template #toolbar-left-prefix>
      <span style="font-weight: 600; font-size: 15px; color: #303133; margin-right: 12px;">📋 员工列表</span>
    </template>
    <template #toolbar-left>
      <div style="display: flex; gap: 8px;">
        <yh-button type="primary" size="small">新增</yh-button>
        <yh-button size="small">刷新</yh-button>
      </div>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, dept: '设计部', status: '离职', address: '广州市天河区' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', status: '在职', address: '深圳市南山区' }
])

const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsToolbarLeftPrefix = toJs(tsToolbarLeftPrefix)

const tsToolbarLeftSuffix = `<${_T}>
  <yh-table :data="data" :columns="columns" border>
    <template #toolbar-left>
      <yh-button type="primary" size="small">新增</yh-button>
    </template>
    <template #toolbar-left-suffix>
      <span style="color: #909399; font-size: 12px; margin-left: 8px;">共 {{ data.length }} 条记录</span>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, dept: '设计部', status: '离职', address: '广州市天河区' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', status: '在职', address: '深圳市南山区' }
])

const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsToolbarLeftSuffix = toJs(tsToolbarLeftSuffix)

const tsToolbarRight = `<${_T}>
  <yh-table :data="data" :columns="columns" border>
    <template #toolbar-right>
      <div style="display: flex; gap: 8px;">
        <yh-button size="small" title="刷新">🔄 刷新</yh-button>
        <yh-button size="small" title="导出">📥 导出</yh-button>
        <yh-button size="small" title="打印">🖨️ 打印</yh-button>
        <yh-button size="small" title="设置">⚙️ 设置</yh-button>
      </div>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, dept: '设计部', status: '离职', address: '广州市天河区' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', status: '在职', address: '深圳市南山区' }
])

const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsToolbarRight = toJs(tsToolbarRight)

const tsToolbarRightPrefix = `<${_T}>
  <yh-table :data="data" :columns="columns" border>
    <template #toolbar-left>
      <yh-button type="primary" size="small">新增</yh-button>
    </template>
    <template #toolbar-right-prefix>
      <span style="color: #e6a23c; font-size: 12px; margin-right: 8px;">⚠️ 有 1 条待审核</span>
    </template>
    <template #toolbar-right>
      <yh-button size="small">导出</yh-button>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, dept: '设计部', status: '离职', address: '广州市天河区' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', status: '在职', address: '深圳市南山区' }
])

const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsToolbarRightPrefix = toJs(tsToolbarRightPrefix)

const tsToolbarRightSuffix = `<${_T}>
  <yh-table :data="data" :columns="columns" border>
    <template #toolbar-right>
      <yh-button size="small">导出</yh-button>
    </template>
    <template #toolbar-right-suffix>
      <span style="color: #67c23a; font-size: 12px; margin-left: 8px;">✅ 已同步</span>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, dept: '设计部', status: '离职', address: '广州市天河区' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', status: '在职', address: '深圳市南山区' }
])

const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsToolbarRightSuffix = toJs(tsToolbarRightSuffix)

const tsFullToolbar = `<${_T}>
  <yh-table :data="data" :columns="columns" border show-index>
    <template #toolbar-left-prefix>
      <span style="font-weight: 600; font-size: 15px; color: #303133;">📋 员工管理</span>
    </template>
    <template #toolbar-left>
      <div style="display: flex; gap: 8px; margin-left: 16px;">
        <yh-button type="primary" size="small">新增员工</yh-button>
        <yh-button type="danger" size="small">批量删除</yh-button>
      </div>
    </template>
    <template #toolbar-left-suffix>
      <span style="color: #909399; font-size: 12px; margin-left: 8px;">共 {{ data.length }} 人</span>
    </template>
    <template #toolbar-right-prefix>
      <input placeholder="搜索..." style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 140px; font-size: 12px;" />
    </template>
    <template #toolbar-right>
      <div style="display: flex; gap: 8px; margin-left: 8px;">
        <yh-button size="small">🔄</yh-button>
        <yh-button size="small">📥</yh-button>
        <yh-button size="small">🖨️</yh-button>
      </div>
    </template>
    <template #toolbar-right-suffix>
      <yh-button size="small" style="margin-left: 8px;">⚙️</yh-button>
    </template>
  </yh-table>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const data = ref([
  { id: 1, name: '张三', age: 28, dept: '技术部', status: '在职', address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, dept: '产品部', status: '在职', address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, dept: '设计部', status: '离职', address: '广州市天河区' },
  { id: 4, name: '赵六', age: 35, dept: '运营部', status: '在职', address: '深圳市南山区' }
])

const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]
</${_S}>`

const jsFullToolbar = toJs(tsFullToolbar)
</script>

## 自定义左侧模板

通过 `#toolbar-left` 插槽在表格上方左侧区域放置操作按钮和搜索框，这是最常用的工具栏插槽。

<DemoBlock title="自定义左侧模板" :ts-code="tsToolbarLeft" :js-code="jsToolbarLeft">
  <yh-table :data="tableData" :columns="columns" border show-index>
    <template #toolbar-left>
      <div style="display: flex; gap: 8px; align-items: center;">
        <input v-model="searchText1" placeholder="搜索姓名..." style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 160px;" />
        <yh-button type="primary" size="small">搜索</yh-button>
        <yh-button type="success" size="small">新增</yh-button>
        <yh-button type="danger" size="small">批量删除</yh-button>
      </div>
    </template>
  </yh-table>
</DemoBlock>

## 自定义左侧前缀模板

通过 `#toolbar-left-prefix` 插槽在左侧操作按钮**前面**插入内容，如标题、图标等。

<DemoBlock title="自定义左侧前缀模板" :ts-code="tsToolbarLeftPrefix" :js-code="jsToolbarLeftPrefix">
  <yh-table :data="tableData" :columns="columns" border>
    <template #toolbar-left-prefix>
      <span style="font-weight: 600; font-size: 15px; color: #303133; margin-right: 12px;">📋 员工列表</span>
    </template>
    <template #toolbar-left>
      <div style="display: flex; gap: 8px;">
        <yh-button type="primary" size="small">新增</yh-button>
        <yh-button size="small">刷新</yh-button>
      </div>
    </template>
  </yh-table>
</DemoBlock>

## 自定义左侧后缀模板

通过 `#toolbar-left-suffix` 插槽在左侧操作按钮**后面**追加内容，如数据统计等。

<DemoBlock title="自定义左侧后缀模板" :ts-code="tsToolbarLeftSuffix" :js-code="jsToolbarLeftSuffix">
  <yh-table :data="tableData" :columns="columns" border>
    <template #toolbar-left>
      <yh-button type="primary" size="small">新增</yh-button>
    </template>
    <template #toolbar-left-suffix>
      <span style="color: #909399; font-size: 12px; margin-left: 8px;">共 {{ tableData.length }} 条记录</span>
    </template>
  </yh-table>
</DemoBlock>

## 自定义右侧模板

通过 `#toolbar-right` 插槽在表格上方右侧放置操作按钮，如刷新、导出、打印、设置等。

<DemoBlock title="自定义右侧模板" :ts-code="tsToolbarRight" :js-code="jsToolbarRight">
  <yh-table :data="tableData" :columns="columns" border>
    <template #toolbar-right>
      <div style="display: flex; gap: 8px;">
        <yh-button size="small" title="刷新">🔄 刷新</yh-button>
        <yh-button size="small" title="导出">📥 导出</yh-button>
        <yh-button size="small" title="打印">🖨️ 打印</yh-button>
        <yh-button size="small" title="设置">⚙️ 设置</yh-button>
      </div>
    </template>
  </yh-table>
</DemoBlock>

## 自定义右侧前缀模板

通过 `#toolbar-right-prefix` 插槽在右侧操作按钮**前面**插入内容，如状态提示等。

<DemoBlock title="自定义右侧前缀模板" :ts-code="tsToolbarRightPrefix" :js-code="jsToolbarRightPrefix">
  <yh-table :data="tableData" :columns="columns" border>
    <template #toolbar-left>
      <yh-button type="primary" size="small">新增</yh-button>
    </template>
    <template #toolbar-right-prefix>
      <span style="color: #e6a23c; font-size: 12px; margin-right: 8px;">⚠️ 有 1 条待审核</span>
    </template>
    <template #toolbar-right>
      <yh-button size="small">导出</yh-button>
    </template>
  </yh-table>
</DemoBlock>

## 自定义右侧后缀模板

通过 `#toolbar-right-suffix` 插槽在右侧操作按钮**后面**追加内容，如同步状态等。

<DemoBlock title="自定义右侧后缀模板" :ts-code="tsToolbarRightSuffix" :js-code="jsToolbarRightSuffix">
  <yh-table :data="tableData" :columns="columns" border>
    <template #toolbar-right>
      <yh-button size="small">导出</yh-button>
    </template>
    <template #toolbar-right-suffix>
      <span style="color: #67c23a; font-size: 12px; margin-left: 8px;">✅ 已同步</span>
    </template>
  </yh-table>
</DemoBlock>

## 完整工具栏示例

组合使用所有 6 个工具栏插槽，构建完整的表格工具栏布局。

<DemoBlock title="完整工具栏" :ts-code="tsFullToolbar" :js-code="jsFullToolbar">
  <yh-table :data="tableData" :columns="columns" border show-index>
    <template #toolbar-left-prefix>
      <span style="font-weight: 600; font-size: 15px; color: #303133;">📋 员工管理</span>
    </template>
    <template #toolbar-left>
      <div style="display: flex; gap: 8px; margin-left: 16px;">
        <yh-button type="primary" size="small">新增员工</yh-button>
        <yh-button type="danger" size="small">批量删除</yh-button>
      </div>
    </template>
    <template #toolbar-left-suffix>
      <span style="color: #909399; font-size: 12px; margin-left: 8px;">共 {{ tableData.length }} 人</span>
    </template>
    <template #toolbar-right-prefix>
      <input placeholder="搜索..." style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 140px; font-size: 12px;" />
    </template>
    <template #toolbar-right>
      <div style="display: flex; gap: 8px; margin-left: 8px;">
        <yh-button size="small">🔄</yh-button>
        <yh-button size="small">📥</yh-button>
        <yh-button size="small">🖨️</yh-button>
      </div>
    </template>
    <template #toolbar-right-suffix>
      <yh-button size="small" style="margin-left: 8px;">⚙️</yh-button>
    </template>
  </yh-table>
</DemoBlock>

## 插槽布局说明

工具栏区域分为左右两部分，每部分各有 3 个插槽位：

```
┌──────────────────────────────────────────────────────────────────┐
│ [left-prefix] [left] [left-suffix]   [right-prefix] [right] [right-suffix] │
├──────────────────────────────────────────────────────────────────┤
│                           表格内容区域                              │
└──────────────────────────────────────────────────────────────────┘
```

## API

### 工具栏插槽

| 插槽名                 | 说明                     | 位置     |
| ---------------------- | ------------------------ | -------- |
| `toolbar-left`         | 左侧工具栏主内容         | 左侧     |
| `toolbar-left-prefix`  | 左侧工具栏前缀（如标题） | 左侧最前 |
| `toolbar-left-suffix`  | 左侧工具栏后缀（如统计） | 左侧最后 |
| `toolbar-right`        | 右侧工具栏主内容         | 右侧     |
| `toolbar-right-prefix` | 右侧工具栏前缀（如提示） | 右侧最前 |
| `toolbar-right-suffix` | 右侧工具栏后缀（如状态） | 右侧最后 |
| `empty`                | 空数据状态自定义内容     | 表格内部 |

### 使用建议

1. **左侧** 通常放置操作按钮：新增、批量删除、搜索等
2. **右侧** 通常放置工具按钮：刷新、导出、打印、列设置等
3. **前缀** 适合放置标题、图标等静态内容
4. **后缀** 适合放置统计信息、状态指示等辅助信息
5. 所有插槽均可自由组合使用，未使用的插槽不会渲染额外空间
