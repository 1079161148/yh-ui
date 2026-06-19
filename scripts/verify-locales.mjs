import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const langDistDir = path.join(repoRoot, 'packages', 'locale', 'dist', 'lang')
const langSrcDir = path.join(repoRoot, 'packages', 'locale', 'src', 'lang')

const sectionComments = {
  common: '通用',
  colorpicker: '颜色选择器',
  datepicker: '日期选择器',
  timepicker: '时间选择器',
  timeselect: '时间选择',
  tree: '树',
  treeselect: '树选择',
  calendar: '日历',
  autocomplete: '自动完成',
  countdown: '倒计时',
  cascader: '级联选择',
  transfer: '穿梭框',
  table: '表格',
  messagebox: '消息框',
  upload: '上传',
  form: '表单',
  button: '按钮',
  input: '输入框',
  inputnumber: '数字输入框',
  inputtag: '标签输入',
  breadcrumb: '面包屑',
  backtop: '返回顶部',
  select: '选择器',
  pagination: '分页',
  popconfirm: '气泡确认',
  dialog: '对话框',
  drawer: '抽屉',
  dropdown: '下拉菜单',
  image: '图片',
  imageviewer: '图片预览',
  infinitescroll: '无限滚动',
  message: '消息',
  notification: '通知',
  loading: '加载',
  spin: '加载中',
  rate: '评分',
  alert: '警告',
  tag: '标签',
  tabs: '标签页',
  steps: '步骤条',
  progress: '进度条',
  skeleton: '骨架屏',
  empty: '空状态',
  result: '结果',
  waterfall: '瀑布流',
  descriptions: '描述列表',
  slider: '滑块',
  switch: '开关',
  checkbox: '复选框',
  radio: '单选框',
  menu: '菜单',
  card: '卡片',
  collapse: '折叠面板',
  tooltip: '工具提示',
  popover: '气泡卡片',
  badge: '徽标',
  avatar: '头像',
  watermark: '水印',
  divider: '分割线',
  carousel: '走马灯',
  marquee: '跑马灯',
  affix: '固钉',
  flow: '流程图',
  anchor: '锚点',
  mention: '提及',
  skuselector: 'SKU 选择器',
  productcard: '商品卡片',
  price: '价格',
  couponcard: '优惠券',
  luckydraw: '幸运抽奖',
  filterbar: '筛选排序栏',
  submitbar: '结算栏',
  categorynav: '品类导航',
  smartaddress: '智能地址',
  ganttchart: '甘特图',
  imagemagnifier: '图片放大镜',
  ai: 'AI Components'
}

function getLeafPaths(obj, prefix = '') {
  const paths = {}
  for (const key of Object.keys(obj)) {
    const val = obj[key]
    const path = prefix ? `${prefix}.${key}` : key
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      Object.assign(paths, getLeafPaths(val, path))
    } else {
      paths[path] = typeof val
    }
  }
  return paths
}

function getPathValue(obj, path) {
  const parts = path.split('.')
  let curr = obj
  for (const part of parts) {
    if (curr === undefined || curr === null) return undefined
    curr = curr[part]
  }
  return curr
}

function repairObject(baseline, target) {
  const result = {}
  for (const key of Object.keys(baseline)) {
    const baseVal = baseline[key]
    const targetVal = target[key]
    if (typeof baseVal === 'object' && baseVal !== null && !Array.isArray(baseVal)) {
      result[key] = repairObject(baseVal, typeof targetVal === 'object' && targetVal !== null && !Array.isArray(targetVal) ? targetVal : {})
    } else {
      result[key] = targetVal !== undefined && typeof targetVal === typeof baseVal ? targetVal : baseVal
    }
  }
  return result
}

function stringifyObj(obj, indent = 2, parentKey = '') {
  const spaces = ' '.repeat(indent)
  if (Array.isArray(obj)) {
    return `[\n${obj.map((item) => `${spaces}  ${stringifyObj(item, indent + 2)}`).join(',\n')}\n${spaces}]`
  }
  if (typeof obj === 'object' && obj !== null) {
    const keys = Object.keys(obj)
    const lines = []
    for (const key of keys) {
      const val = obj[key]
      const commentKey = parentKey ? `${parentKey}.${key}` : key

      if (parentKey === 'yh' && sectionComments[key]) {
        lines.push(`\n${spaces}// ${sectionComments[key]}`)
      }

      const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key)
      lines.push(`${spaces}${formattedKey}: ${stringifyObj(val, indent + 2, commentKey)}`)
    }
    return `{\n${lines.join(',\n')}\n${spaces}}`
  }
  if (typeof obj === 'string') {
    return `'${obj.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r')}'`
  }
  return JSON.stringify(obj)
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}

async function main() {
  const isFix = process.argv.includes('--fix')

  // Read all source typescript files to get filenames
  const files = await fs.readdir(langSrcDir)
  const tsFiles = files.filter((f) => f.endsWith('.ts'))

  // Load baseline (en)
  const enModulePath = path.join(langDistDir, 'en.mjs')
  const enModule = await import(`file://${enModulePath}`)
  const baseline = enModule.en || enModule.default
  const baselinePaths = getLeafPaths(baseline)
  const baselineKeys = Object.keys(baselinePaths)

  console.log(`Baseline language: en (${baselineKeys.length} keys found)`)

  const semanticChecks = [
    { lang: 'ja', checks: [{ path: 'yh.common.yes', expected: 'はい' }, { path: 'yh.common.no', expected: 'いい越' }] }, // wait, no is いいえ, let's fix check below
    { lang: 'zh-cn', checks: [{ path: 'yh.common.yes', expected: '是' }, { path: 'yh.common.no', expected: '否' }] },
    { lang: 'en', checks: [{ path: 'yh.common.yes', expected: 'Yes' }, { path: 'yh.common.no', expected: 'No' }] }
  ]

  let hasErrors = false

  for (const tsFile of tsFiles) {
    const langName = path.basename(tsFile, '.ts')
    const mjsPath = path.join(langDistDir, `${langName}.mjs`)

    let target
    try {
      const module = await import(`file://${mjsPath}`)
      const exportName = toCamelCase(langName)
      target = module[exportName] || module.default
    } catch (e) {
      console.error(`[ERROR] Failed to load compiled module for ${langName}:`, e.message)
      hasErrors = true
      continue
    }

    const targetPaths = getLeafPaths(target)
    const targetKeys = Object.keys(targetPaths)

    const missingKeys = baselineKeys.filter((k) => !targetPaths[k])
    const extraKeys = targetKeys.filter((k) => !baselinePaths[k])
    const typeMismatches = baselineKeys.filter((k) => targetPaths[k] && targetPaths[k] !== baselinePaths[k])

    // Run semantic checks
    const semanticErrors = []
    const rules = semanticChecks.find((c) => c.lang === langName)
    if (rules) {
      for (const rule of rules.checks) {
        const val = getPathValue(target, rule.path)
        // If checking ja.no, check for 'いいえ'
        let expected = rule.expected
        if (langName === 'ja' && rule.path === 'yh.common.no') {
          expected = 'いいえ'
        }
        if (val !== expected) {
          semanticErrors.push(`${rule.path}: expected '${expected}', got '${val}'`)
        }
      }
    }

    const fileHasIssue = missingKeys.length > 0 || extraKeys.length > 0 || typeMismatches.length > 0 || semanticErrors.length > 0

    if (fileHasIssue) {
      console.log(`\nLocale checks for [${langName}]:`)
      if (missingKeys.length > 0) {
        console.log(`  - Missing keys (${missingKeys.length}):`, missingKeys.join(', '))
      }
      if (extraKeys.length > 0) {
        console.log(`  - Extra keys (${extraKeys.length}):`, extraKeys.join(', '))
      }
      if (typeMismatches.length > 0) {
        console.log(`  - Type mismatches (${typeMismatches.length}):`, typeMismatches.map((k) => `${k} (expected ${baselinePaths[k]}, got ${targetPaths[k]})`).join(', '))
      }
      if (semanticErrors.length > 0) {
        console.log(`  - Semantic errors (${semanticErrors.length}):`, semanticErrors.join(', '))
        hasErrors = true // semantic errors are hard errors
      }

      if (isFix) {
        console.log(`  -> Fixing and rewriting packages/locale/src/lang/${tsFile}...`)
        
        // Correct semantic values if it's ja yes/no
        if (langName === 'ja') {
          if (target.yh?.common) {
            target.yh.common.yes = 'はい'
            target.yh.common.no = 'いいえ'
          }
        }

        const repaired = repairObject(baseline, target)
        // Ensure name is correct
        repaired.name = langName

        const camelName = toCamelCase(langName)
        const code = `import type { Language } from '../index'

export const ${camelName}: Language = ${stringifyObj(repaired)}

export default ${camelName}
`
        const srcPath = path.join(langSrcDir, tsFile)
        await fs.writeFile(srcPath, code, 'utf8')
      } else {
        hasErrors = true
      }
    }
  }

  if (hasErrors) {
    if (isFix) {
      console.log('\n[FIX COMPLETED] Please rebuild the packages and re-run to verify.')
    } else {
      console.error('\n[ERROR] Locale consistency check failed. Run `node scripts/verify-locales.mjs --fix` to auto-align structures.')
      process.exit(1)
    }
  } else {
    console.log('\n[SUCCESS] All locale files are structurally consistent and semantically correct!')
  }
}

main().catch((err) => {
  console.error('[FATAL]', err)
  process.exit(1)
})
