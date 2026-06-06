# Table 表格 - 打印表格

通过内置的打印功能，可以将表格数据以美观的格式打印输出，支持自定义标题、页眉页脚、指定列、分页切割、打印多张表格和自定义模板等。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ==================== 公共数据 ====================
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const baseData = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])

// ==================== 1. 打印表格（基础） ====================
const tableRef1 = ref()
const handlePrint1 = () => {
  tableRef1.value?.print({ title: '员工信息表', showIndex: true })
}

// ==================== 2. 自定义顶部和底部 ====================
const tableRef2 = ref()
const handlePrint2 = () => {
  tableRef2.value?.print({
    title: '员工信息表',
    showIndex: true,
    headerHtml: '<div style="display:flex;justify-content:space-between;font-size:12px;color:#909399"><span>XX 公司人力资源部</span><span>机密文件</span></div>',
    footerHtml: '<div style="text-align:center;font-size:12px;color:#909399;margin-top:8px">此报表仅供内部使用，禁止外传 — 人力资源部</div>'
  })
}

// ==================== 3. 高级打印 ====================
const tableRef3 = ref()
const printTitle3 = ref('员工信息表')
const printShowIndex3 = ref(true)
const printShowTime3 = ref(true)
const printShowCount3 = ref(true)
const printOrientation3 = ref('portrait')

const handlePrint3 = () => {
  tableRef3.value?.print({
    title: printTitle3.value,
    showIndex: printShowIndex3.value,
    showTime: printShowTime3.value,
    showCount: printShowCount3.value,
    orientation: printOrientation3.value
  })
}

// ==================== 4. 指定列 ====================
const tableRef4 = ref()
const printCols4 = ref(columns.map(c => ({ ...c, checked: true })))

const handlePrint4 = () => {
  const selected = printCols4.value.filter(c => c.checked).map(c => c.prop)
  if (selected.length === 0) return
  tableRef4.value?.print({
    title: '指定列打印',
    columns: selected,
    showIndex: true
  })
}

// ==================== 5. 自定义页眉/标题 ====================
const tableRef5 = ref()
const handlePrint5 = () => {
  tableRef5.value?.print({
    title: '季度绩效报告',
    headerHtml: [
      '<div style="text-align:center;margin-bottom:12px">',
      '<div style="font-size:20px;font-weight:700;color:#303133">XX 科技有限公司</div>',
      '<div style="font-size:14px;color:#606266;margin-top:4px">2026年第一季度员工绩效汇总表</div>',
      '<div style="font-size:12px;color:#909399;margin-top:4px">报表编号：HR-2026-Q1-001</div>',
      '</div>'
    ].join(''),
    showIndex: true
  })
}

// ==================== 6. 自定义页尾/页码 ====================
const tableRef6 = ref()
const handlePrint6 = () => {
  tableRef6.value?.print({
    title: '员工信息表',
    showIndex: true,
    footerHtml: [
      '<div style="display:flex;justify-content:space-between;font-size:11px;color:#909399;border-top:1px solid #ebeef5;padding-top:8px;margin-top:12px">',
      '<span>制表人：管理员</span>',
      '<span>审核人：__________</span>',
      '<span>日期：' + new Date().toLocaleDateString() + '</span>',
      '</div>'
    ].join('')
  })
}

// ==================== 7. 设置边距 ====================
const tableRef7 = ref()
const marginTop = ref('15mm')
const marginRight = ref('10mm')
const marginBottom = ref('15mm')
const marginLeft = ref('10mm')

const handlePrint7 = () => {
  tableRef7.value?.print({
    title: '员工信息表',
    showIndex: true,
    margin: {
      top: marginTop.value,
      right: marginRight.value,
      bottom: marginBottom.value,
      left: marginLeft.value
    }
  })
}

// ==================== 8. 分页切割 ====================
const tableRef8 = ref()

// 生成更多数据用于分页测试
const moreData = ref(Array.from({ length: 20 }, (_, i) => ({
  name: '员工' + (i + 1),
  age: 22 + (i % 15),
  dept: ['技术部', '产品部', '设计部', '运营部', '市场部'][i % 5],
  salary: 12000 + i * 500,
  status: i % 4 === 0 ? '离职' : '在职',
  address: ['北京', '上海', '广州', '深圳', '杭州'][i % 5] + '市'
})))

const handlePrint8 = () => {
  tableRef8.value?.print({
    title: '员工花名册',
    showIndex: true,
    pageSize: 8,          // 每页 8 条
    showPageNumber: true,  // 显示页码
    showTime: true,
    showCount: true
  })
}

// ==================== 9. 打印多张表格 ====================
const tableRef9 = ref()
const techData = baseData.value.filter(r => r.dept === '技术部' || r.dept === '产品部')
const otherData = baseData.value.filter(r => r.dept !== '技术部' && r.dept !== '产品部')

const handlePrint9 = () => {
  tableRef9.value?.printMultiple([
    {
      title: '技术 & 产品部员工',
      data: techData,
      config: { showIndex: true }
    },
    {
      title: '其他部门员工',
      data: otherData,
      config: { showIndex: true }
    }
  ], {
    showTime: true,
    showCount: true
  })
}

// ==================== 10. 打印出货单 ====================
const tableRef10 = ref()

const handlePrint10 = () => {
  const orderHtml = [
    '<div style="text-align:center;margin-bottom:20px">',
    '<div style="font-size:22px;font-weight:700">XX 科技有限公司</div>',
    '<div style="font-size:18px;margin-top:6px;color:#606266">出 货 单</div>',
    '</div>',
    '<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:12px;color:#606266">',
    '<span>单号：SH-2026020701</span>',
    '<span>日期：' + new Date().toLocaleDateString() + '</span>',
    '<span>客户：某某公司</span>',
    '</div>',
    '<table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:16px">',
    '<thead><tr>',
    '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">序号</th>',
    '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">商品名称</th>',
    '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">规格</th>',
    '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">数量</th>',
    '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">单价</th>',
    '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">金额</th>',
    '</tr></thead>',
    '<tbody>',
    '<tr><td style="border:1px solid #333;padding:8px;text-align:center">1</td><td style="border:1px solid #333;padding:8px">智能手表 Pro</td><td style="border:1px solid #333;padding:8px">黑色/44mm</td><td style="border:1px solid #333;padding:8px;text-align:right">50</td><td style="border:1px solid #333;padding:8px;text-align:right">¥2,999</td><td style="border:1px solid #333;padding:8px;text-align:right">¥149,950</td></tr>',
    '<tr><td style="border:1px solid #333;padding:8px;text-align:center">2</td><td style="border:1px solid #333;padding:8px">无线耳机 Max</td><td style="border:1px solid #333;padding:8px">白色</td><td style="border:1px solid #333;padding:8px;text-align:right">100</td><td style="border:1px solid #333;padding:8px;text-align:right">¥1,599</td><td style="border:1px solid #333;padding:8px;text-align:right">¥159,900</td></tr>',
    '<tr><td style="border:1px solid #333;padding:8px;text-align:center">3</td><td style="border:1px solid #333;padding:8px">充电器 65W</td><td style="border:1px solid #333;padding:8px">Type-C</td><td style="border:1px solid #333;padding:8px;text-align:right">200</td><td style="border:1px solid #333;padding:8px;text-align:right">¥199</td><td style="border:1px solid #333;padding:8px;text-align:right">¥39,800</td></tr>',
    '</tbody>',
    '<tfoot><tr><td colspan="5" style="border:1px solid #333;padding:8px;text-align:right;font-weight:700">合 计</td><td style="border:1px solid #333;padding:8px;text-align:right;font-weight:700;color:#e6a23c">¥349,650</td></tr></tfoot>',
    '</table>',
    '<div style="display:flex;justify-content:space-between;font-size:13px;color:#606266;margin-top:30px">',
    '<div>发货人：__________</div>',
    '<div>收货人：__________</div>',
    '<div>经办人：__________</div>',
    '</div>'
  ].join('')

  tableRef10.value?.printTemplate(orderHtml, {
    title: '出货单',
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
  })
}

// ==================== 示例代码 ====================

const tsPrintBasic = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint">打印表格</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handlePrint = () => {
  tableRef.value?.print({ title: '员工信息表', showIndex: true })
}
</${_S}>`
const jsPrintBasic = toJs(tsPrintBasic)

const tsCustomHeaderFooter = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint">自定义顶部和底部</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handlePrint = () => {
  tableRef.value?.print({
    title: '员工信息表',
    showIndex: true,
    headerHtml: '<div style="display:flex;justify-content:space-between;font-size:12px;color:#909399"><span>XX 公司人力资源部</span><span>机密文件</span></div>',
    footerHtml: '<div style="text-align:center;font-size:12px;color:#909399;margin-top:8px">此报表仅供内部使用 — 人力资源部</div>'
  })
}
</${_S}>`
const jsCustomHeaderFooter = toJs(tsCustomHeaderFooter)

const tsAdvancedPrint = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">标题：</span>
    <input v-model="printTitle" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 120px;" />
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="showIndex" /> 序号
    </label>
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="showTime" /> 时间
    </label>
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="showCount" /> 条数
    </label>
    <select v-model="orientation" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="portrait">纵向</option>
      <option value="landscape">横向</option>
    </select>
    <yh-button type="primary" @click="handlePrint">打印</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const printTitle = ref('员工信息表')
const showIndex = ref(true)
const showTime = ref(true)
const showCount = ref(true)
const orientation = ref('portrait')

const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handlePrint = () => {
  tableRef.value?.print({
    title: printTitle.value,
    showIndex: showIndex.value,
    showTime: showTime.value,
    showCount: showCount.value,
    orientation: orientation.value
  })
}
</${_S}>`
const jsAdvancedPrint = toJs(tsAdvancedPrint)

const tsSpecifyCols = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">打印列：</span>
    <label v-for="col in printCols" :key="col.prop" style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="col.checked" /> {{ col.label }}
    </label>
    <yh-button type="primary" @click="handlePrint">打印</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]
const printCols = ref(columns.map(c => ({ ...c, checked: true })))
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])

const handlePrint = () => {
  const selected = printCols.value.filter(c => c.checked).map(c => c.prop)
  if (selected.length === 0) return
  tableRef.value?.print({ title: '指定列打印', columns: selected, showIndex: true })
}
</${_S}>`
const jsSpecifyCols = toJs(tsSpecifyCols)

const tsCustomTitle = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint">自定义页眉/标题</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handlePrint = () => {
  tableRef.value?.print({
    title: '季度绩效报告',
    headerHtml: [
      '<div style="text-align:center;margin-bottom:12px">',
      '<div style="font-size:20px;font-weight:700">XX 科技有限公司</div>',
      '<div style="font-size:14px;color:#606266;margin-top:4px">2026年第一季度员工绩效汇总表</div>',
      '<div style="font-size:12px;color:#909399;margin-top:4px">报表编号：HR-2026-Q1-001</div>',
      '</div>'
    ].join(''),
    showIndex: true
  })
}
</${_S}>`
const jsCustomTitle = toJs(tsCustomTitle)

const tsCustomFooter = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint">自定义页尾</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handlePrint = () => {
  tableRef.value?.print({
    title: '员工信息表',
    showIndex: true,
    footerHtml: [
      '<div style="display:flex;justify-content:space-between;font-size:11px;color:#909399;border-top:1px solid #ebeef5;padding-top:8px;margin-top:12px">',
      '<span>制表人：管理员</span>',
      '<span>审核人：__________</span>',
      '<span>日期：' + new Date().toLocaleDateString() + '</span>',
      '</div>'
    ].join('')
  })
}
</${_S}>`
const jsCustomFooter = toJs(tsCustomFooter)

const tsMargin = `<${_T}>
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">上：</span>
    <input v-model="mt" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <span style="font-size: 13px; color: #606266;">右：</span>
    <input v-model="mr" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <span style="font-size: 13px; color: #606266;">下：</span>
    <input v-model="mb" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <span style="font-size: 13px; color: #606266;">左：</span>
    <input v-model="ml" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <yh-button type="primary" @click="handlePrint">打印</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const mt = ref('15mm')
const mr = ref('10mm')
const mb = ref('15mm')
const ml = ref('10mm')

const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' },
  { name: '钱七', age: 29, dept: '市场部', salary: 16000, status: '在职', address: '杭州市西湖区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handlePrint = () => {
  tableRef.value?.print({
    title: '员工信息表',
    showIndex: true,
    margin: { top: mt.value, right: mr.value, bottom: mb.value, left: ml.value }
  })
}
</${_S}>`
const jsMargin = toJs(tsMargin)

const tsPageSplit = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint">分页打印（每页 8 条）</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref(Array.from({ length: 20 }, (_, i) => ({
  name: '员工' + (i + 1),
  age: 22 + (i % 15),
  dept: ['技术部', '产品部', '设计部', '运营部', '市场部'][i % 5],
  salary: 12000 + i * 500,
  status: i % 4 === 0 ? '离职' : '在职',
  address: ['北京', '上海', '广州', '深圳', '杭州'][i % 5] + '市'
})))
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handlePrint = () => {
  tableRef.value?.print({
    title: '员工花名册',
    showIndex: true,
    pageSize: 8,
    showPageNumber: true,
    showTime: true,
    showCount: true
  })
}
</${_S}>`
const jsPageSplit = toJs(tsPageSplit)

const tsMultiTable = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint">打印多张表格</yh-button>
  </div>
  <yh-table ref="tableRef" :data="data" :columns="columns" border show-index />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()
const data = ref([
  { name: '张三', age: 28, dept: '技术部', salary: 15000, status: '在职', address: '北京市朝阳区' },
  { name: '李四', age: 32, dept: '产品部', salary: 18000, status: '在职', address: '上海市浦东新区' },
  { name: '王五', age: 25, dept: '设计部', salary: 14000, status: '离职', address: '广州市天河区' },
  { name: '赵六', age: 35, dept: '运营部', salary: 22000, status: '在职', address: '深圳市南山区' }
])
const columns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'dept', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'address', label: '地址' }
]

const handlePrint = () => {
  const techData = data.value.filter(r => r.dept === '技术部' || r.dept === '产品部')
  const otherData = data.value.filter(r => r.dept !== '技术部' && r.dept !== '产品部')

  // printMultiple 可以打印多张不同标题/数据的表格，每张表自动分页
  tableRef.value?.printMultiple([
    { title: '技术 & 产品部', data: techData, config: { showIndex: true } },
    { title: '其他部门', data: otherData, config: { showIndex: true } }
  ], { showTime: true })
}
</${_S}>`
const jsMultiTable = toJs(tsMultiTable)

const tsOrderPrint = `<${_T}>
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint">打印出货单</yh-button>
  </div>
  <p style="font-size: 13px; color: #909399;">使用 printTemplate 方法可以打印完全自定义的 HTML 模板，如出货单、发票等。</p>
  <yh-table ref="tableRef" :data="[]" :columns="[]" style="display:none" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()

const handlePrint = () => {
  // 构建出货单 HTML
  const orderHtml = '<div style="text-align:center;margin-bottom:20px">'
    + '<div style="font-size:22px;font-weight:700">XX 科技有限公司</div>'
    + '<div style="font-size:18px;margin-top:6px;color:#606266">出 货 单</div>'
    + '</div>'
    + '<table style="width:100%;border-collapse:collapse;font-size:13px">'
    + '<thead><tr>'
    + '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">序号</th>'
    + '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">商品名称</th>'
    + '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">数量</th>'
    + '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">单价</th>'
    + '<th style="border:1px solid #333;padding:8px;background:#f0f0f0">金额</th>'
    + '</tr></thead><tbody>'
    + '<tr><td style="border:1px solid #333;padding:8px;text-align:center">1</td><td style="border:1px solid #333;padding:8px">智能手表 Pro</td><td style="border:1px solid #333;padding:8px;text-align:right">50</td><td style="border:1px solid #333;padding:8px;text-align:right">¥2,999</td><td style="border:1px solid #333;padding:8px;text-align:right">¥149,950</td></tr>'
    + '</tbody></table>'
    + '<div style="display:flex;justify-content:space-between;margin-top:30px;font-size:13px"><div>发货人：__________</div><div>收货人：__________</div></div>'

  tableRef.value?.printTemplate(orderHtml, {
    title: '出货单',
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
  })
}
</${_S}>`
const jsOrderPrint = toJs(tsOrderPrint)
</script>

## 打印表格

最基础的打印方式，通过组件实例方法 `print()` 在新窗口中生成打印预览。

<DemoBlock title="打印表格" :ts-code="tsPrintBasic" :js-code="jsPrintBasic">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint1">打印表格</yh-button>
  </div>
  <yh-table ref="tableRef1" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 自定义顶部和底部

通过 `headerHtml` 和 `footerHtml` 自定义打印页面的顶部和底部内容。

<DemoBlock title="自定义顶部和底部" :ts-code="tsCustomHeaderFooter" :js-code="jsCustomHeaderFooter">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint2">自定义顶部和底部</yh-button>
  </div>
  <yh-table ref="tableRef2" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 高级打印

可配置标题、序号、时间、条数、纸张方向等多种选项。

<DemoBlock title="高级打印" :ts-code="tsAdvancedPrint" :js-code="jsAdvancedPrint">
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">标题：</span>
    <input v-model="printTitle3" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px; width: 120px;" />
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="printShowIndex3" /> 序号
    </label>
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="printShowTime3" /> 时间
    </label>
    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="printShowCount3" /> 条数
    </label>
    <select v-model="printOrientation3" style="padding: 4px 8px; border: 1px solid #dcdfe6; border-radius: 4px;">
      <option value="portrait">纵向</option>
      <option value="landscape">横向</option>
    </select>
    <yh-button type="primary" @click="handlePrint3">打印</yh-button>
  </div>
  <yh-table ref="tableRef3" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 指定列

通过勾选控制需要打印的列。

<DemoBlock title="指定列" :ts-code="tsSpecifyCols" :js-code="jsSpecifyCols">
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">打印列：</span>
    <label v-for="col in printCols4" :key="col.prop" style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
      <input type="checkbox" v-model="col.checked" /> {{ col.label }}
    </label>
    <yh-button type="primary" @click="handlePrint4">打印</yh-button>
  </div>
  <yh-table ref="tableRef4" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 自定义页眉/标题

通过 `headerHtml` 构建复杂的公司页眉，包含公司名、报表名、编号等。

<DemoBlock title="自定义页眉/标题" :ts-code="tsCustomTitle" :js-code="jsCustomTitle">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint5">自定义页眉/标题</yh-button>
  </div>
  <yh-table ref="tableRef5" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 自定义页尾/页码

通过 `footerHtml` 添加制表人、审核人、日期等签名栏。

<DemoBlock title="自定义页尾" :ts-code="tsCustomFooter" :js-code="jsCustomFooter">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint6">自定义页尾</yh-button>
  </div>
  <yh-table ref="tableRef6" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 设置边距

通过 `margin` 配置打印页面的上、右、下、左边距。

<DemoBlock title="设置边距" :ts-code="tsMargin" :js-code="jsMargin">
  <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 13px; color: #606266;">上：</span>
    <input v-model="marginTop" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <span style="font-size: 13px; color: #606266;">右：</span>
    <input v-model="marginRight" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <span style="font-size: 13px; color: #606266;">下：</span>
    <input v-model="marginBottom" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <span style="font-size: 13px; color: #606266;">左：</span>
    <input v-model="marginLeft" style="width: 60px; padding: 4px; border: 1px solid #dcdfe6; border-radius: 4px;" />
    <yh-button type="primary" @click="handlePrint7">打印</yh-button>
  </div>
  <yh-table ref="tableRef7" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 将表格切割为多页打印

通过 `pageSize` 设置每页最大行数，自动进行分页。配合 `showPageNumber` 显示页码。

<DemoBlock title="分页打印" :ts-code="tsPageSplit" :js-code="jsPageSplit">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint8">分页打印（每页 8 条）</yh-button>
  </div>
  <yh-table ref="tableRef8" :data="moreData" :columns="columns" border show-index />
</DemoBlock>

## 打印多张表格

通过 `printMultiple` 方法一次打印多张不同数据的表格，每张表自动分页。

<DemoBlock title="打印多张表格" :ts-code="tsMultiTable" :js-code="jsMultiTable">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint9">打印多张表格</yh-button>
  </div>
  <yh-table ref="tableRef9" :data="baseData" :columns="columns" border show-index />
</DemoBlock>

## 打印出货单

通过 `printTemplate` 方法可以打印完全自定义的 HTML 模板，如出货单、发票、报表等。

<DemoBlock title="打印出货单" :ts-code="tsOrderPrint" :js-code="jsOrderPrint">
  <div style="margin-bottom: 12px;">
    <yh-button type="primary" @click="handlePrint10">打印出货单</yh-button>
  </div>
  <p style="font-size: 13px; color: #909399;">使用 <code>printTemplate</code> 方法可以打印完全自定义的 HTML 模板，如出货单、发票等。</p>
  <yh-table ref="tableRef10" :data="[]" :columns="[]" style="display:none" />
</DemoBlock>

## API

### print(config?) 方法

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 打印标题 | `string` | — |
| showIndex | 是否显示序号 | `boolean` | `false` |
| indexTitle | 序号列标题 | `string` | `'序号'` |
| columns | 指定打印列（prop 数组） | `string[]` | 全部可见列 |
| excludeColumns | 排除列 | `string[]` | — |
| data | 自定义打印数据 | `Record<string, unknown>[]` | 当前数据 |
| formatCell | 格式化单元格 | `(value, column, row) => string` | — |
| headerHtml | 自定义页眉 HTML | `string` | — |
| footerHtml | 自定义页脚 HTML | `string` | — |
| margin | 页边距 | `{ top?, right?, bottom?, left? }` | `10mm` |
| orientation | 纸张方向 | `'portrait' \| 'landscape'` | `'portrait'` |
| showTime | 是否显示打印时间 | `boolean` | `true` |
| showCount | 是否显示数据条数 | `boolean` | `true` |
| columnTitles | 自定义列标题 | `Record<string, string>` | — |
| pageSize | 每页最大行数 | `number` | — |
| showPageNumber | 是否显示页码 | `boolean` | `false` |
| tableStyle | 自定义表格样式 | `string` | — |
| extraCss | 额外 CSS | `string` | — |
| autoPrint | 自动弹出打印对话框 | `boolean` | `false` |
| beforePrint | 打印前回调 | `() => boolean` | — |
| afterPrint | 打印后回调 | `() => void` | — |

### printMultiple(tables, config?) 方法

打印多张表格，每张表自动分页。

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| tables | 表格配置数组 | `Array<{ title?, data, columns?, config? }>` |
| config | 全局配置 | 同 `print(config)` |

### printTemplate(html, config?) 方法

打印完全自定义的 HTML 模板。

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| html | 自定义 HTML 内容 | `string` |
| config | 打印配置 | 同 `print(config)` |

### 注意事项

- 打印功能依赖 `window.open()`，请确保浏览器允许弹窗
- 打印样式通过内联 CSS 实现，确保在打印预览中正确渲染
- 使用 `@page` CSS 规则控制纸张方向和边距
- 分页使用 `page-break-after: always` 实现
- `autoPrint: true` 可以打开窗口后自动弹出打印对话框

