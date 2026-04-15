// public/codesandbox-runtime/components/smart-address/src/smart-address.js
import {
  createCommentVNode as _createCommentVNode5,
  vModelText as _vModelText,
  normalizeClass as _normalizeClass4,
  createElementVNode as _createElementVNode5,
  withDirectives as _withDirectives4,
  toDisplayString as _toDisplayString4,
  openBlock as _openBlock5,
  createElementBlock as _createElementBlock5,
  renderSlot as _renderSlot5,
  createTextVNode as _createTextVNode4,
  renderList as _renderList4,
  Fragment as _Fragment5,
  createBlock as _createBlock4,
  withCtx as _withCtx4,
  createVNode as _createVNode3,
  normalizeStyle as _normalizeStyle4
} from 'vue'
import { ref as ref15, computed as computed15, reactive } from 'vue'

// public/codesandbox-runtime/hooks/use-namespace/index.js
import { inject, ref, unref } from 'vue'
var defaultNamespace = 'yh'
var statePrefix = 'is-'
var namespaceContextKey = Symbol('namespaceContextKey')
var useGlobalNamespace = () => {
  return inject(namespaceContextKey, ref(defaultNamespace))
}
var useNamespace = (block) => {
  const namespace = useGlobalNamespace()
  const b = (blockSuffix = '') => {
    const ns = unref(namespace)
    return blockSuffix ? `${ns}-${block}-${blockSuffix}` : `${ns}-${block}`
  }
  const e = (element) => {
    return element ? `${b()}__${element}` : ''
  }
  const m = (modifier) => {
    return modifier ? `${b()}--${modifier}` : ''
  }
  const bem = (blockSuffix, element, modifier) => {
    let cls = b(blockSuffix)
    if (element) cls += `__${element}`
    if (modifier) cls += `--${modifier}`
    return cls
  }
  const em = (element, modifier) => {
    return element && modifier ? `${b()}__${element}--${modifier}` : ''
  }
  function is(state, value) {
    if (arguments.length === 1) {
      return `${statePrefix}${state}`
    }
    return value ? `${statePrefix}${state}` : ''
  }
  const cssVar = (name) => {
    return `--${unref(namespace)}-${block}-${name}`
  }
  const cssVarObj = (vars) => {
    const obj = {}
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVar(key)] = value
    })
    return obj
  }
  const cssVarBlock = (name) => {
    return `--${unref(namespace)}-${name}`
  }
  const cssVarBlockObj = (vars) => {
    const obj = {}
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVarBlock(key)] = value
    })
    return obj
  }
  return {
    namespace,
    b,
    e,
    m,
    bem,
    em,
    is,
    cssVar,
    cssVarObj,
    cssVarBlock,
    cssVarBlockObj
  }
}

// public/codesandbox-runtime/theme/component-theme.js
import { inject as inject2, provide, computed, unref as unref2 } from 'vue'
var __defProp = Object.defineProperty
var __getOwnPropSymbols = Object.getOwnPropertySymbols
var __hasOwnProp = Object.prototype.hasOwnProperty
var __propIsEnum = Object.prototype.propertyIsEnumerable
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop])
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop])
    }
  return a
}
var COMPONENT_THEME_KEY = Symbol('component-theme')
function useComponentTheme(componentName, localOverrides) {
  const globalThemes = inject2(COMPONENT_THEME_KEY, {})
  const mergedVars = computed(() => {
    const globalVars = globalThemes[componentName] || {}
    const local = unref2(localOverrides) || {}
    return __spreadValues(__spreadValues({}, globalVars), local)
  })
  const themeStyle = computed(() => {
    const vars = mergedVars.value
    const style = {}
    Object.entries(vars).forEach(([key, value]) => {
      if (value !== void 0) {
        const cssVarName = `--yh-${componentName}-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        style[cssVarName] = value
      }
    })
    return style
  })
  const hasCustomTheme = computed(() => {
    return Object.keys(mergedVars.value).length > 0
  })
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  }
}

// public/codesandbox-runtime/hooks/use-z-index/index.js
import { computed as computed2, inject as inject3, unref as unref3 } from 'vue'
var zIndexContextKey = Symbol('zIndexContextKey')
var zIndexCounterKey = Symbol('zIndexCounterKey')

// public/codesandbox-runtime/hooks/use-sku/index.js
import { ref as ref2, computed as computed3 } from 'vue'

// public/codesandbox-runtime/hooks/use-countdown/index.js
import { ref as ref3, computed as computed4, onUnmounted } from 'vue'

// public/codesandbox-runtime/hooks/use-locale/index.js
import { computed as computed6, unref as unref5, watch } from 'vue'

// public/codesandbox-runtime/locale/lang/zh-cn.js
var zhCn = {
  name: 'zh-cn',
  yh: {
    // 通用
    common: {
      yes: '\u662F',
      no: '\u5426',
      confirm: '\u786E\u8BA4',
      cancel: '\u53D6\u6D88',
      loading: '\u52A0\u8F7D\u4E2D',
      close: '\u5173\u95ED',
      clear: '\u6E05\u7A7A',
      reset: '\u91CD\u7F6E',
      save: '\u4FDD\u5B58',
      delete: '\u5220\u9664',
      edit: '\u7F16\u8F91',
      add: '\u65B0\u589E',
      search: '\u641C\u7D22',
      refresh: '\u5237\u65B0',
      expand: '\u5C55\u5F00',
      collapse: '\u6536\u8D77',
      more: '\u66F4\u591A',
      noData: '\u6682\u65E0\u6570\u636E',
      noMatch: '\u65E0\u5339\u914D\u6570\u636E',
      selectAll: '\u5168\u9009',
      unselectAll: '\u53D6\u6D88\u5168\u9009'
    },
    // 颜色选择器
    colorpicker: {
      confirm: '\u786E\u5B9A',
      clear: '\u6E05\u7A7A',
      eyeDropper: '\u5438\u8272\u5668',
      suggestionDark: '\u767D\u8272\u6587\u5B57\u6700\u4F73',
      suggestionLight: '\u9ED1\u8272\u6587\u5B57\u6700\u4F73',
      recentColors: '\u6700\u8FD1\u4F7F\u7528',
      presetColors: '\u9884\u8BBE\u989C\u8272'
    },
    // 日期选择器
    datepicker: {
      now: '\u6B64\u523B',
      today: '\u4ECA\u5929',
      cancel: '\u53D6\u6D88',
      clear: '\u6E05\u7A7A',
      confirm: '\u786E\u5B9A',
      selectDate: '\u9009\u62E9\u65E5\u671F',
      selectTime: '\u9009\u62E9\u65F6\u95F4',
      startDate: '\u5F00\u59CB\u65E5\u671F',
      startTime: '\u5F00\u59CB\u65F6\u95F4',
      endDate: '\u7ED3\u675F\u65E5\u671F',
      endTime: '\u7ED3\u675F\u65F6\u95F4',
      year: '\u5E74',
      month: '\u6708',
      day: '\u65E5',
      week: '\u5468',
      monthBeforeYear: false,
      prevYear: '\u4E0A\u4E00\u5E74',
      nextYear: '\u4E0B\u4E00\u5E74',
      prevMonth: '\u4E0A\u4E2A\u6708',
      nextMonth: '\u4E0B\u4E2A\u6708',
      weeks: {
        sun: '\u65E5',
        mon: '\u4E00',
        tue: '\u4E8C',
        wed: '\u4E09',
        thu: '\u56DB',
        fri: '\u4E94',
        sat: '\u516D'
      },
      months: {
        jan: '\u4E00\u6708',
        feb: '\u4E8C\u6708',
        mar: '\u4E09\u6708',
        apr: '\u56DB\u6708',
        may: '\u4E94\u6708',
        jun: '\u516D\u6708',
        jul: '\u4E03\u6708',
        aug: '\u516B\u6708',
        sep: '\u4E5D\u6708',
        oct: '\u5341\u6708',
        nov: '\u5341\u4E00\u6708',
        dec: '\u5341\u4E8C\u6708'
      },
      quarters: {
        q1: '\u7B2C\u4E00\u5B63\u5EA6',
        q2: '\u7B2C\u4E8C\u5B63\u5EA6',
        q3: '\u7B2C\u4E09\u5B63\u5EA6',
        q4: '\u7B2C\u56DB\u5B63\u5EA6'
      }
    },
    // 时间选择器
    timepicker: {
      confirm: '\u786E\u5B9A',
      cancel: '\u53D6\u6D88',
      now: '\u6B64\u523B',
      placeholder: '\u9009\u62E9\u65F6\u95F4',
      startPlaceholder: '\u5F00\u59CB\u65F6\u95F4',
      endPlaceholder: '\u7ED3\u675F\u65F6\u95F4',
      selectTime: '\u9009\u62E9\u65F6\u95F4'
    },
    // 时间选择
    timeselect: {
      placeholder: '\u9009\u62E9\u65F6\u95F4'
    },
    // 树
    tree: {
      emptyText: '\u6682\u65E0\u6570\u636E',
      loading: '\u52A0\u8F7D\u4E2D...',
      checkAll: '\u5168\u9009',
      uncheckAll: '\u53D6\u6D88\u5168\u9009',
      expandAll: '\u5C55\u5F00\u5168\u90E8',
      collapseAll: '\u6536\u8D77\u5168\u90E8'
    },
    // 树选择
    treeselect: {
      placeholder: '\u8BF7\u9009\u62E9',
      emptyText: '\u6682\u65E0\u6570\u636E',
      loading: '\u52A0\u8F7D\u4E2D...',
      noMatch: '\u65E0\u5339\u914D\u6570\u636E'
    },
    // 日历
    calendar: {
      prevMonth: '\u4E0A\u4E2A\u6708',
      nextMonth: '\u4E0B\u4E2A\u6708',
      prevYear: '\u4E0A\u4E00\u5E74',
      nextYear: '\u4E0B\u4E00\u5E74',
      today: '\u4ECA\u5929',
      week: '\u5468',
      holiday: '\u4F11',
      workday: '\u73ED',
      monthHeaderFormat: 'YYYY\u5E74M\u6708',
      weeks: {
        sun: '\u65E5',
        mon: '\u4E00',
        tue: '\u4E8C',
        wed: '\u4E09',
        thu: '\u56DB',
        fri: '\u4E94',
        sat: '\u516D'
      }
    },
    // 自动完成
    autocomplete: {
      loading: '\u52A0\u8F7D\u4E2D...',
      placeholder: '\u8BF7\u8F93\u5165',
      noData: '\u6682\u65E0\u6570\u636E',
      noMatch: '\u65E0\u5339\u914D\u6570\u636E'
    },
    // 倒计时
    countdown: {
      days: '\u5929',
      hours: '\u65F6',
      minutes: '\u5206',
      seconds: '\u79D2',
      milliseconds: '\u6BEB\u79D2',
      finished: '\u5DF2\u7ED3\u675F'
    },
    // 级联选择
    cascader: {
      noMatch: '\u65E0\u5339\u914D\u6570\u636E',
      placeholder: '\u8BF7\u9009\u62E9',
      loading: '\u52A0\u8F7D\u4E2D...',
      noData: '\u6682\u65E0\u6570\u636E'
    },
    // 穿梭框
    transfer: {
      noMatch: '\u65E0\u5339\u914D\u6570\u636E',
      noData: '\u65E0\u6570\u636E',
      titles: ['\u5217\u8868 1', '\u5217\u8868 2'],
      filterPlaceholder: '\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9',
      noCheckedFormat: '\u5171 {total} \u9879',
      hasCheckedFormat: '\u5DF2\u9009 {checked}/{total} \u9879',
      searchPlaceholder: '\u8BF7\u8F93\u5165\u5173\u952E\u8BCD'
    },
    // 表格
    table: {
      emptyText: '\u6682\u65E0\u6570\u636E',
      confirmFilter: '\u7B5B\u9009',
      resetFilter: '\u91CD\u7F6E',
      clearFilter: '\u5168\u90E8',
      sumText: '\u5408\u8BA1',
      loading: '\u6B63\u5728\u52A0\u8F7D...',
      index: '\u5E8F\u53F7',
      print: '\u6253 \u5370',
      cancel: '\u53D6 \u6D88',
      preview: '\u6253\u5370\u9884\u89C8',
      printTime: '\u6253\u5370\u65F6\u95F4',
      total: '\u5171 {total} \u6761',
      page: '\u7B2C {page} \u9875',
      yes: '\u662F',
      no: '\u5426',
      // 工具栏
      toolbar: {
        refresh: '\u5237\u65B0',
        density: '\u5BC6\u5EA6',
        densityDefault: '\u9ED8\u8BA4',
        densityLarge: '\u5BBD\u677E',
        densitySmall: '\u7D27\u51D1',
        columnSetting: '\u5217\u8BBE\u7F6E',
        fullscreen: '\u5168\u5C4F',
        exitFullscreen: '\u9000\u51FA\u5168\u5C4F',
        export: '\u5BFC\u51FA',
        import: '\u5BFC\u5165',
        search: '\u641C\u7D22',
        searchPlaceholder: '\u8BF7\u8F93\u5165\u5173\u952E\u8BCD\u641C\u7D22'
      },
      // 筛选
      filter: {
        selectAll: '\u5168\u9009',
        selectInvert: '\u53CD\u9009',
        empty: '\u4E3A\u7A7A',
        notEmpty: '\u4E0D\u4E3A\u7A7A',
        contains: '\u5305\u542B',
        notContains: '\u4E0D\u5305\u542B',
        equals: '\u7B49\u4E8E',
        notEquals: '\u4E0D\u7B49\u4E8E',
        startsWith: '\u5F00\u5934\u662F',
        endsWith: '\u7ED3\u5C3E\u662F',
        greaterThan: '\u5927\u4E8E',
        lessThan: '\u5C0F\u4E8E',
        between: '\u4ECB\u4E8E'
      },
      // 排序
      sort: {
        asc: '\u5347\u5E8F',
        desc: '\u964D\u5E8F',
        clear: '\u53D6\u6D88\u6392\u5E8F'
      },
      // 导出
      export: {
        title: '\u5BFC\u51FA\u6570\u636E',
        filename: '\u6587\u4EF6\u540D',
        type: '\u6587\u4EF6\u7C7B\u578B',
        scope: '\u5BFC\u51FA\u8303\u56F4',
        scopeAll: '\u5168\u90E8\u6570\u636E',
        scopeSelected: '\u9009\u4E2D\u6570\u636E',
        scopeCurrentPage: '\u5F53\u524D\u9875\u6570\u636E',
        includeHeader: '\u5305\u542B\u8868\u5934',
        exporting: '\u6B63\u5728\u5BFC\u51FA...',
        success: '\u5BFC\u51FA\u6210\u529F',
        error: '\u5BFC\u51FA\u5931\u8D25'
      },
      // 导入
      import: {
        title: '\u5BFC\u5165\u6570\u636E',
        selectFile: '\u9009\u62E9\u6587\u4EF6',
        dragTip: '\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904\u4E0A\u4F20',
        importing: '\u6B63\u5728\u5BFC\u5165...',
        success: '\u5BFC\u5165\u6210\u529F',
        error: '\u5BFC\u5165\u5931\u8D25',
        preview: '\u6570\u636E\u9884\u89C8',
        confirm: '\u786E\u8BA4\u5BFC\u5165'
      },
      // 打印
      printConfig: {
        title: '\u6253\u5370\u8BBE\u7F6E',
        pageTitle: '\u9875\u9762\u6807\u9898',
        pageHeader: '\u9875\u7709',
        pageFooter: '\u9875\u811A',
        printAll: '\u6253\u5370\u5168\u90E8',
        printSelected: '\u6253\u5370\u9009\u4E2D',
        printCurrentPage: '\u6253\u5370\u5F53\u524D\u9875',
        landscape: '\u6A2A\u5411',
        portrait: '\u7EB5\u5411',
        printing: '\u6B63\u5728\u6253\u5370...'
      },
      // 列设置
      columnSetting: {
        title: '\u5217\u8BBE\u7F6E',
        showAll: '\u663E\u793A\u5168\u90E8',
        hideAll: '\u9690\u85CF\u5168\u90E8',
        reset: '\u91CD\u7F6E',
        fixedLeft: '\u56FA\u5B9A\u5728\u5DE6\u4FA7',
        fixedRight: '\u56FA\u5B9A\u5728\u53F3\u4FA7',
        unfixed: '\u53D6\u6D88\u56FA\u5B9A'
      },
      // 右键菜单
      contextMenu: {
        copy: '\u590D\u5236',
        copyRow: '\u590D\u5236\u884C',
        copyCell: '\u590D\u5236\u5355\u5143\u683C',
        paste: '\u7C98\u8D34',
        insertRowAbove: '\u5728\u4E0A\u65B9\u63D2\u5165\u884C',
        insertRowBelow: '\u5728\u4E0B\u65B9\u63D2\u5165\u884C',
        deleteRow: '\u5220\u9664\u884C',
        deleteSelectedRows: '\u5220\u9664\u9009\u4E2D\u884C',
        exportSelected: '\u5BFC\u51FA\u9009\u4E2D\u6570\u636E'
      },
      // 选择
      selection: {
        selectAll: '\u5168\u9009',
        selectInvert: '\u53CD\u9009',
        selectNone: '\u53D6\u6D88\u9009\u62E9',
        selected: '\u5DF2\u9009\u62E9 {count} \u9879'
      },
      // 展开
      expand: {
        expandAll: '\u5C55\u5F00\u5168\u90E8',
        collapseAll: '\u6536\u8D77\u5168\u90E8'
      },
      // 树形
      tree: {
        expandAll: '\u5C55\u5F00\u5168\u90E8',
        collapseAll: '\u6536\u8D77\u5168\u90E8',
        expandLevel: '\u5C55\u5F00\u5230\u7B2C {level} \u5C42'
      },
      // 拖拽
      drag: {
        dragTip: '\u62D6\u62FD\u4EE5\u8C03\u6574\u987A\u5E8F',
        dropTip: '\u91CA\u653E\u4EE5\u653E\u7F6E'
      }
    },
    // 消息框
    messagebox: {
      title: '\u63D0\u793A',
      confirm: '\u786E\u5B9A',
      cancel: '\u53D6\u6D88',
      close: '\u5173\u95ED',
      error: '\u8F93\u5165\u7684\u6570\u636E\u4E0D\u5408\u6CD5!',
      alert: '\u8B66\u544A',
      prompt: '\u8BF7\u8F93\u5165',
      inputPlaceholder: '\u8BF7\u8F93\u5165\u5185\u5BB9'
    },
    // 上传
    upload: {
      deleteTip: '\u6309 delete \u952E\u53EF\u5220\u9664',
      delete: '\u5220\u9664',
      preview: '\u67E5\u770B\u56FE\u7247',
      continue: '\u7EE7\u7EED\u4E0A\u4F20',
      upload: '\u70B9\u51FB\u4E0A\u4F20',
      tip: '\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904<em>\u4E0A\u4F20</em>',
      dragTip: '\u5C06\u6587\u4EF6\u62D6\u5230\u6B64\u5904\uFF0C\u6216\u70B9\u51FB\u4E0A\u4F20',
      uploading: '\u4E0A\u4F20\u4E2D...',
      success: '\u4E0A\u4F20\u6210\u529F',
      error: '\u4E0A\u4F20\u5931\u8D25',
      retry: '\u91CD\u65B0\u4E0A\u4F20',
      cancel: '\u53D6\u6D88\u4E0A\u4F20',
      fileTypeError: '\u6587\u4EF6\u7C7B\u578B\u4E0D\u652F\u6301',
      fileSizeError: '\u6587\u4EF6\u5927\u5C0F\u8D85\u51FA\u9650\u5236',
      fileCountError: '\u6587\u4EF6\u6570\u91CF\u8D85\u51FA\u9650\u5236'
    },
    // 表单
    form: {
      validationFailed: '\u6821\u9A8C\u5931\u8D25',
      required: '\u5FC5\u586B\u9879',
      pleaseInput: '\u8BF7\u8F93\u5165',
      pleaseSelect: '\u8BF7\u9009\u62E9'
    },
    // 按钮
    button: {
      loading: '\u52A0\u8F7D\u4E2D...'
    },
    // 输入框
    input: {
      placeholder: '\u8BF7\u8F93\u5165\u5185\u5BB9',
      clear: '\u6E05\u7A7A',
      showPassword: '\u663E\u793A\u5BC6\u7801',
      hidePassword: '\u9690\u85CF\u5BC6\u7801',
      copy: '\u590D\u5236',
      copied: '\u5DF2\u590D\u5236'
    },
    // 数字输入框
    inputnumber: {
      placeholder: '\u8BF7\u8F93\u5165\u6570\u5B57',
      increase: '\u589E\u52A0',
      decrease: '\u51CF\u5C11'
    },
    // 标签输入
    inputtag: {
      placeholder: '\u8BF7\u8F93\u5165',
      add: '\u6DFB\u52A0',
      remove: '\u79FB\u9664'
    },
    // 面包屑
    breadcrumb: {
      label: '\u9762\u5305\u5C51',
      more: '\u66F4\u591A'
    },
    // 返回顶部
    backtop: {
      text: '\u56DE\u5230\u9876\u90E8'
    },
    // 选择器
    select: {
      placeholder: '\u8BF7\u9009\u62E9',
      noData: '\u6682\u65E0\u6570\u636E',
      loading: '\u52A0\u8F7D\u4E2D...',
      noMatch: '\u65E0\u5339\u914D\u6570\u636E',
      selectAll: '\u5168\u9009',
      clearAll: '\u6E05\u7A7A'
    },
    // 分页
    pagination: {
      goto: '\u524D\u5F80',
      page: '\u9875',
      total: '\u5171 {total} \u6761',
      pageSize: '\u6761/\u9875',
      prev: '\u4E0A\u4E00\u9875',
      next: '\u4E0B\u4E00\u9875',
      first: '\u9996\u9875',
      last: '\u672B\u9875',
      pageClassifier: '\u9875'
    },
    // 气泡确认
    popconfirm: {
      confirm: '\u786E\u5B9A',
      cancel: '\u53D6\u6D88',
      dontAskAgain: '\u4E0D\u518D\u63D0\u793A'
    },
    // 对话框
    dialog: {
      confirm: '\u786E\u5B9A',
      cancel: '\u53D6\u6D88',
      close: '\u5173\u95ED',
      maximize: '\u6700\u5927\u5316',
      restore: '\u8FD8\u539F'
    },
    // 抽屉
    drawer: {
      close: '\u5173\u95ED',
      confirm: '\u786E\u5B9A',
      cancel: '\u53D6\u6D88'
    },
    // 下拉菜单
    dropdown: {
      loading: '\u52A0\u8F7D\u4E2D...'
    },
    // 图片
    image: {
      error: '\u52A0\u8F7D\u5931\u8D25',
      loading: '\u52A0\u8F7D\u4E2D...',
      preview: '\u9884\u89C8',
      zoomIn: '\u653E\u5927',
      zoomOut: '\u7F29\u5C0F',
      rotateLeft: '\u5411\u5DE6\u65CB\u8F6C',
      rotateRight: '\u5411\u53F3\u65CB\u8F6C',
      originalSize: '\u539F\u59CB\u5927\u5C0F',
      fullscreen: '\u5168\u5C4F'
    },
    // 图片预览
    imageviewer: {
      close: '\u5173\u95ED',
      prev: '\u4E0A\u4E00\u5F20',
      next: '\u4E0B\u4E00\u5F20',
      zoomIn: '\u653E\u5927',
      zoomOut: '\u7F29\u5C0F',
      rotateLeft: '\u5411\u5DE6\u65CB\u8F6C',
      rotateRight: '\u5411\u53F3\u65CB\u8F6C',
      reset: '\u91CD\u7F6E',
      fullscreen: '\u5168\u5C4F',
      exitFullscreen: '\u9000\u51FA\u5168\u5C4F'
    },
    // 无限滚动
    infinitescroll: {
      loading: '\u52A0\u8F7D\u4E2D...',
      finished: '\u6CA1\u6709\u66F4\u591A\u4E86',
      error: '\u52A0\u8F7D\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5',
      retry: '\u70B9\u51FB\u91CD\u8BD5'
    },
    // 消息
    message: {
      close: '\u5173\u95ED'
    },
    // 通知
    notification: {
      close: '\u5173\u95ED'
    },
    // 加载
    loading: {
      text: '\u52A0\u8F7D\u4E2D...'
    },
    // 加载中
    spin: {
      text: '\u52A0\u8F7D\u4E2D...'
    },
    // 评分
    rate: {
      texts: ['\u6781\u5DEE', '\u5931\u671B', '\u4E00\u822C', '\u6EE1\u610F', '\u60CA\u559C']
    },
    // 警告
    alert: {
      close: '\u5173\u95ED'
    },
    // 标签
    tag: {
      close: '\u5173\u95ED'
    },
    // 标签页
    tabs: {
      close: '\u5173\u95ED',
      add: '\u65B0\u589E',
      more: '\u66F4\u591A'
    },
    // 步骤条
    steps: {
      finish: '\u5DF2\u5B8C\u6210',
      process: '\u8FDB\u884C\u4E2D',
      wait: '\u7B49\u5F85\u4E2D',
      error: '\u9519\u8BEF'
    },
    // 进度条
    progress: {
      success: '\u6210\u529F',
      exception: '\u5F02\u5E38',
      warning: '\u8B66\u544A'
    },
    // 骨架屏
    skeleton: {
      loading: '\u52A0\u8F7D\u4E2D...'
    },
    // 空状态
    empty: {
      description: '\u6682\u65E0\u6570\u636E',
      noData: '\u6682\u65E0\u6570\u636E',
      noResult: '\u6682\u65E0\u7ED3\u679C',
      networkError: '\u7F51\u7EDC\u9519\u8BEF',
      serverError: '\u670D\u52A1\u5668\u9519\u8BEF'
    },
    // 结果
    result: {
      success: '\u64CD\u4F5C\u6210\u529F',
      error: '\u64CD\u4F5C\u5931\u8D25',
      warning: '\u8B66\u544A',
      info: '\u63D0\u793A',
      backHome: '\u8FD4\u56DE\u9996\u9875'
    },
    // 瀑布流
    waterfall: {
      loading: '\u52A0\u8F7D\u4E2D...',
      noMore: '\u6CA1\u6709\u66F4\u591A\u4E86',
      empty: '\u6682\u65E0\u6570\u636E'
    },
    // 描述列表
    descriptions: {
      colon: '\uFF1A'
    },
    // 滑块
    slider: {
      tipFormatter: '{value}'
    },
    // 开关
    switch: {
      on: '\u5F00',
      off: '\u5173'
    },
    // 复选框
    checkbox: {
      selectAll: '\u5168\u9009'
    },
    // 单选框
    radio: {},
    // 菜单
    menu: {
      collapse: '\u6536\u8D77\u83DC\u5355',
      expand: '\u5C55\u5F00\u83DC\u5355'
    },
    // 卡片
    card: {
      collapse: '\u6536\u8D77',
      expand: '\u5C55\u5F00'
    },
    // 折叠面板
    collapse: {
      expand: '\u5C55\u5F00',
      collapse: '\u6536\u8D77'
    },
    // 工具提示
    tooltip: {},
    // 气泡卡片
    popover: {},
    // 徽标
    badge: {},
    // 头像
    avatar: {
      error: '\u52A0\u8F7D\u5931\u8D25'
    },
    // 水印
    watermark: {},
    // 分割线
    divider: {},
    // 走马灯
    carousel: {
      prev: '\u4E0A\u4E00\u5F20',
      next: '\u4E0B\u4E00\u5F20'
    },
    // 跑马灯
    marquee: {},
    // 固钉
    affix: {},
    // 流程图
    flow: {
      zoomIn: '\u653E\u5927\u753B\u5E03',
      zoomOut: '\u7F29\u5C0F\u753B\u5E03',
      fitView: '\u81EA\u9002\u5E94\u89C6\u56FE',
      lock: '\u9501\u5B9A/\u89E3\u9501\u753B\u5E03'
    },
    // 锚点
    anchor: {},
    // 提及
    mention: {
      placeholder: '\u8BF7\u8F93\u5165',
      loading: '\u52A0\u8F7D\u4E2D...',
      noData: '\u6682\u65E0\u6570\u636E'
    },
    // SKU 选择器
    skuselector: {
      placeholder: '\u8BF7\u9009\u62E9\u89C4\u683C',
      emptyText: '\u6682\u65E0\u89C4\u683C',
      stock: '\u5E93\u5B58',
      price: '\u4EF7\u683C',
      selected: '\u5DF2\u9009',
      outOfStock: '\u6682\u65F6\u65E0\u8D27'
    },
    // 商品卡片
    productcard: {
      viewDetails: '\u67E5\u770B\u8BE6\u60C5',
      buyNow: '\u7ACB\u5373\u8D2D\u4E70',
      addToCart: '\u52A0\u5165\u8D2D\u7269\u8F66',
      sold: '\u5DF2\u552E',
      soldOut: '\u552E\u7F44',
      vip: '\u4F1A\u5458'
    },
    // 价格
    price: {
      original: '\u539F\u4EF7'
    },
    // 优惠券
    couponcard: {
      available: '\u70B9\u51FB\u9886\u53D6',
      used: '\u5DF2\u4F7F\u7528',
      expired: '\u5DF2\u8FC7\u671F',
      received: '\u5DF2\u9886\u53D6',
      limit: '\u6EE1 {threshold} \u5143\u53EF\u7528',
      noThreshold: '\u65E0\u95E8\u69DB',
      validPeriod: '\u6709\u6548\u671F',
      ruleTitle: '\u4F7F\u7528\u8BF4\u660E\u53CA\u89C4\u5219'
    },
    // 幸运抽奖
    luckydraw: {
      start: '\u5F00\u59CB\u62BD\u5956',
      drawing: '\u62BD\u5956\u4E2D...',
      end: '\u4E2D\u5956\u4E86',
      retry: '\u518D\u8BD5\u4E00\u6B21'
    },
    // 筛选排序栏
    filterbar: {
      all: '\u5168\u90E8',
      sort: '\u6392\u5E8F',
      filter: '\u7B5B\u9009',
      cancel: '\u53D6\u6D88',
      reset: '\u91CD\u7F6E',
      confirm: '\u786E\u5B9A',
      noOptions: '\u6682\u65E0\u7B5B\u9009\u9879',
      asc: '\u5347\u5E8F',
      desc: '\u964D\u5E8F',
      selected: '\u5DF2\u9009'
    },
    // 结算栏
    submitbar: {
      total: '\u5C0F\u8BA1\uFF1A',
      selected: '\u5DF2\u9009 {count} \u4EF6',
      submit: '\u53BB\u7ED3\u7B97',
      allSelect: '\u5168\u9009'
    },
    // 品类导航
    categorynav: {
      all: '\u5168\u90E8',
      noData: '\u6682\u65E0\u6570\u636E',
      loading: '\u52A0\u8F7D\u4E2D...'
    },
    // 智能地址
    smartaddress: {
      placeholder:
        '\u8BF7\u7C98\u8D34\u6536\u8D27\u5730\u5740\uFF0C\u81EA\u52A8\u8BC6\u522B\u59D3\u540D\u3001\u624B\u673A\u53F7\u3001\u5730\u5740',
      parse: '\u667A\u80FD\u8BC6\u522B',
      province: '\u7701/\u5E02/\u533A',
      city: '\u5E02',
      district: '\u533A/\u53BF',
      street: '\u8857\u9053/\u9547',
      detail: '\u8BE6\u7EC6\u5730\u5740',
      phone: '\u624B\u673A\u53F7',
      name: '\u6536\u8D27\u4EBA',
      parseSuccess: '\u5730\u5740\u8BC6\u522B\u6210\u529F',
      parseFailed: '\u672A\u80FD\u8BC6\u522B\uFF0C\u8BF7\u624B\u52A8\u586B\u5199',
      required: '\u8BF7\u586B\u5199\u5B8C\u6574\u5730\u5740',
      provinceKeywords: ['\u7701', '\u81EA\u6CBB\u533A', '\u7279\u522B\u884C\u653F\u533A'],
      cityKeywords: ['\u5E02', '\u5DDE', '\u76DF'],
      districtKeywords: ['\u533A', '\u53BF', '\u65D7', '\u9547', '\u5E02'],
      streetKeywords: ['\u8857\u9053', '\u9547', '\u4E61', '\u6751']
    },
    // AI 组件
    ai: {
      bubble: {
        citations: '\u53C2\u8003\u5F15\u7528'
      },
      mention: {
        placeholder: '@ \u547C\u53EB Agent\u3001\u6587\u6863\u6216\u8868\u683C...',
        agent: '\u667A\u80FD\u4F53',
        document: '\u6587\u6863',
        table: '\u8868\u683C',
        knowledge: '\u77E5\u8BC6\u5E93'
      },
      codeBlock: {
        copyCode: '\u590D\u5236\u4EE3\u7801',
        copied: '\u5DF2\u590D\u5236\uFF01',
        run: '\u8FD0\u884C\u4EE3\u7801',
        edit: '\u7F16\u8F91',
        save: '\u4FDD\u5B58',
        cancel: '\u53D6\u6D88'
      },
      codeRunner: {
        run: '\u8FD0\u884C',
        stop: '\u505C\u6B62',
        clear: '\u6E05\u7A7A',
        reset: '\u91CD\u7F6E',
        placeholder: '\u70B9\u51FB\u8FD0\u884C\u6309\u94AE\u6267\u884C\u4EE3\u7801...'
      },
      sender: {
        placeholder: '\u53D1\u9001\u6D88\u606F...',
        dragTip: '\u91CA\u653E\u9F20\u6807\u4EE5\u4E0A\u4F20\u6587\u4EF6'
      },
      thoughtChain: {
        thoughtProcess: '\u601D\u8003\u8FC7\u7A0B',
        thinking: '\u601D\u8003\u4E2D...',
        defaultTitle: '\u65B0\u6B65\u9AA4',
        addNode: '\u6DFB\u52A0\u8282\u70B9'
      },
      thinking: {
        start: '\u5F00\u59CB\u601D\u8003',
        thinking: '\u601D\u8003\u4E2D...',
        complete: '\u5DF2\u5B8C\u6210\u601D\u8003',
        error: '\u601D\u8003\u51FA\u9519\u4E86'
      },
      welcome: {
        title: '\u4F60\u597D\uFF0C\u6211\u662F YH AI',
        description:
          '\u6211\u53EF\u4EE5\u5E2E\u4F60\u5199\u4EE3\u7801\u3001\u7FFB\u8BD1\u6587\u6863\u6216\u8FDB\u884C\u521B\u610F\u5199\u4F5C\u3002\u4ECA\u5929\u6211\u80FD\u4E3A\u4F60\u505A\u70B9\u4EC0\u4E48\uFF1F'
      },
      action: {
        copy: '\u590D\u5236',
        regenerate: '\u91CD\u65B0\u751F\u6210',
        share: '\u5206\u4EAB',
        like: '\u8D5E\u540C',
        dislike: '\u53CD\u5BF9',
        edit: '\u7F16\u8F91',
        delete: '\u5220\u9664'
      },
      artifacts: {
        preview: '\u9884\u89C8',
        inline: '\u884C\u5185',
        code: '\u6E90\u7801',
        versions: '\u7248\u672C\u5386\u53F2',
        rendering: '\u6B63\u5728\u6E32\u67D3\u7EC4\u4EF6...',
        renderingChart: '\u6B63\u5728\u6E32\u67D3\u56FE\u8868...',
        renderingCanvas: '\u6B63\u5728\u51C6\u5907\u753B\u677F...'
      },
      voice: {
        trigger: '\u70B9\u51FB\u8BF4\u8BDD',
        listening: '\u8046\u542C\u4E2D...'
      },
      // AiAgentCard
      agent: {
        uses: '\u6B21\u8C03\u7528',
        use: '\u7ACB\u5373\u4F7F\u7528',
        favorite: '\u6536\u85CF',
        unfavorite: '\u53D6\u6D88\u6536\u85CF',
        share: '\u5206\u4EAB',
        online: '\u5728\u7EBF',
        offline: '\u79BB\u7EBF',
        busy: '\u5FD9\u788C',
        verified: '\u5B98\u65B9\u8BA4\u8BC1',
        rating: '\u8BC4\u5206',
        reviews: '\u6761\u8BC4\u4EF7',
        responseTime: '\u54CD\u5E94\u65F6\u95F4',
        ms: 'ms'
      },
      // AiSources
      sources: {
        references: '\u53C2\u8003\u6765\u6E90',
        referencedSources: '\u5F15\u7528\u6765\u6E90',
        relevant: '\u76F8\u5173\u5EA6',
        viewOriginal: '\u67E5\u770B\u539F\u6587',
        showAll: '\u663E\u793A\u5168\u90E8',
        more: '\u66F4\u591A\u6765\u6E90',
        drawerTitle: '\u53C2\u8003\u6765\u6E90',
        expandMore: '\u5C55\u5F00\u66F4\u591A',
        collapseMore: '\u6536\u8D77',
        noSources: '\u6682\u65E0\u6765\u6E90',
        today: '\u4ECA\u5929',
        last7Days: '\u6700\u8FD1 7 \u5929',
        last30Days: '\u6700\u8FD1 30 \u5929',
        earlier: '\u66F4\u65E9',
        pinned: '\u5DF2\u7F6E\u9876'
      },
      // AiConversations groups
      conversations: {
        today: '\u4ECA\u5929',
        last7Days: '\u6700\u8FD1 7 \u5929',
        last30Days: '\u6700\u8FD1 30 \u5929',
        earlier: '\u66F4\u65E9',
        pinned: '\u7F6E\u9876',
        pin: '\u7F6E\u9876',
        unpin: '\u53D6\u6D88\u7F6E\u9876',
        newConversation: '\u65B0\u5EFA\u5BF9\u8BDD',
        noData: '\u6682\u65E0\u5BF9\u8BDD\u8BB0\u5F55',
        rename: '\u91CD\u547D\u540D',
        delete: '\u5220\u9664',
        deleteConfirm: '\u786E\u8BA4\u5220\u9664\u6B64\u5BF9\u8BDD\uFF1F'
      },
      // AiAttachments
      attachments: {
        dropTip: '\u91CA\u653E\u9F20\u6807\u4EE5\u4E0A\u4F20\u6587\u4EF6',
        clickToUpload: '\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904\u4E0A\u4F20',
        uploadSuccess: '\u4E0A\u4F20\u6210\u529F',
        uploadError: '\u4E0A\u4F20\u5931\u8D25',
        deleteConfirm: '\u786E\u5B9A\u5220\u9664\u6B64\u6587\u4EF6\uFF1F',
        fileTooLarge: '\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 {size}',
        invalidFileType: '\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B'
      },
      // AiMermaid
      mermaid: {
        image: '\u56FE\u7247',
        code: '\u4EE3\u7801',
        zoomIn: '\u653E\u5927',
        zoomOut: '\u7F29\u5C0F',
        reset: '\u91CD\u7F6E',
        download: '\u4E0B\u8F7D',
        copyCode: '\u590D\u5236\u4EE3\u7801',
        rendering: '\u6B63\u5728\u6E32\u67D3...',
        renderError: '\u6E32\u67D3\u5931\u8D25',
        renderSuccess: '\u6E32\u67D3\u6210\u529F',
        retry: '\u91CD\u8BD5'
      }
    }
  }
}

// public/codesandbox-runtime/locale/lang/en.js
var en = {
  name: 'en',
  yh: {
    // Common
    common: {
      yes: 'Yes',
      no: 'No',
      confirm: 'Confirm',
      cancel: 'Cancel',
      loading: 'Loading',
      close: 'Close',
      clear: 'Clear',
      reset: 'Reset',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      refresh: 'Refresh',
      expand: 'Expand',
      collapse: 'Collapse',
      more: 'More',
      noData: 'No Data',
      noMatch: 'No matching data',
      selectAll: 'Select All',
      unselectAll: 'Unselect All'
    },
    // Color Picker
    colorpicker: {
      confirm: 'OK',
      clear: 'Clear',
      eyeDropper: 'Eye Dropper',
      suggestionDark: 'White text is best',
      suggestionLight: 'Black text is best',
      recentColors: 'Recent Colors',
      presetColors: 'Preset Colors'
    },
    // Date Picker
    datepicker: {
      now: 'Now',
      today: 'Today',
      cancel: 'Cancel',
      clear: 'Clear',
      confirm: 'OK',
      selectDate: 'Select date',
      selectTime: 'Select time',
      startDate: 'Start Date',
      startTime: 'Start Time',
      endDate: 'End Date',
      endTime: 'End Time',
      year: '',
      month: '',
      day: '',
      week: 'Week',
      monthBeforeYear: true,
      prevYear: 'Previous Year',
      nextYear: 'Next Year',
      prevMonth: 'Previous Month',
      nextMonth: 'Next Month',
      weeks: {
        sun: 'Sun',
        mon: 'Mon',
        tue: 'Tue',
        wed: 'Wed',
        thu: 'Thu',
        fri: 'Fri',
        sat: 'Sat'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'May',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
        sep: 'Sep',
        oct: 'Oct',
        nov: 'Nov',
        dec: 'Dec'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Time Picker
    timepicker: {
      confirm: 'OK',
      cancel: 'Cancel',
      now: 'Now',
      placeholder: 'Select time',
      startPlaceholder: 'Start time',
      endPlaceholder: 'End time',
      selectTime: 'Select time'
    },
    // Time Select
    timeselect: {
      placeholder: 'Select time'
    },
    // Tree
    tree: {
      emptyText: 'No Data',
      loading: 'Loading...',
      checkAll: 'Check All',
      uncheckAll: 'Uncheck All',
      expandAll: 'Expand All',
      collapseAll: 'Collapse All'
    },
    // Tree Select
    treeselect: {
      placeholder: 'Select',
      emptyText: 'No Data',
      loading: 'Loading...',
      noMatch: 'No matching data'
    },
    // Calendar
    calendar: {
      prevMonth: 'Previous Month',
      nextMonth: 'Next Month',
      prevYear: 'Previous Year',
      nextYear: 'Next Year',
      today: 'Today',
      week: 'Week',
      holiday: 'Holiday',
      workday: 'Work',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Sun',
        mon: 'Mon',
        tue: 'Tue',
        wed: 'Wed',
        thu: 'Thu',
        fri: 'Fri',
        sat: 'Sat'
      }
    },
    // Autocomplete
    autocomplete: {
      loading: 'Loading...',
      placeholder: 'Please input',
      noData: 'No Data',
      noMatch: 'No matching data'
    },
    // Countdown
    countdown: {
      days: 'days',
      hours: 'hours',
      minutes: 'minutes',
      seconds: 'seconds',
      milliseconds: 'milliseconds',
      finished: 'Finished'
    },
    // Cascader
    cascader: {
      noMatch: 'No matching data',
      placeholder: 'Select',
      loading: 'Loading...',
      noData: 'No Data'
    },
    // Transfer
    transfer: {
      noMatch: 'No matching data',
      noData: 'No data',
      titles: ['List 1', 'List 2'],
      filterPlaceholder: 'Enter keyword',
      noCheckedFormat: '{total} items',
      hasCheckedFormat: '{checked}/{total} checked',
      searchPlaceholder: 'Enter keyword'
    },
    // Table
    table: {
      emptyText: 'No Data',
      confirmFilter: 'Confirm',
      resetFilter: 'Reset',
      clearFilter: 'All',
      sumText: 'Sum',
      loading: 'Loading...',
      index: 'Index',
      print: 'Print',
      cancel: 'Cancel',
      preview: 'Print Preview',
      printTime: 'Print Time',
      total: 'Total {total} items',
      page: 'Page {page}',
      yes: 'Yes',
      no: 'No',
      // Toolbar
      toolbar: {
        refresh: 'Refresh',
        density: 'Density',
        densityDefault: 'Default',
        densityLarge: 'Large',
        densitySmall: 'Small',
        columnSetting: 'Column Settings',
        fullscreen: 'Fullscreen',
        exitFullscreen: 'Exit Fullscreen',
        export: 'Export',
        import: 'Import',
        search: 'Search',
        searchPlaceholder: 'Enter keywords to search'
      },
      // Filter
      filter: {
        selectAll: 'Select All',
        selectInvert: 'Invert Selection',
        empty: 'Is Empty',
        notEmpty: 'Is Not Empty',
        contains: 'Contains',
        notContains: 'Does Not Contain',
        equals: 'Equals',
        notEquals: 'Does Not Equal',
        startsWith: 'Starts With',
        endsWith: 'Ends With',
        greaterThan: 'Greater Than',
        lessThan: 'Less Than',
        between: 'Between'
      },
      // Sort
      sort: {
        asc: 'Ascending',
        desc: 'Descending',
        clear: 'Clear Sort'
      },
      // Export
      export: {
        title: 'Export Data',
        filename: 'Filename',
        type: 'File Type',
        scope: 'Export Scope',
        scopeAll: 'All Data',
        scopeSelected: 'Selected Data',
        scopeCurrentPage: 'Current Page',
        includeHeader: 'Include Header',
        exporting: 'Exporting...',
        success: 'Export Successful',
        error: 'Export Failed'
      },
      // Import
      import: {
        title: 'Import Data',
        selectFile: 'Select File',
        dragTip: 'Click or drag file here to upload',
        importing: 'Importing...',
        success: 'Import Successful',
        error: 'Import Failed',
        preview: 'Data Preview',
        confirm: 'Confirm Import'
      },
      // Print
      printConfig: {
        title: 'Print Settings',
        pageTitle: 'Page Title',
        pageHeader: 'Header',
        pageFooter: 'Footer',
        printAll: 'Print All',
        printSelected: 'Print Selected',
        printCurrentPage: 'Print Current Page',
        landscape: 'Landscape',
        portrait: 'Portrait',
        printing: 'Printing...'
      },
      // Column Settings
      columnSetting: {
        title: 'Column Settings',
        showAll: 'Show All',
        hideAll: 'Hide All',
        reset: 'Reset',
        fixedLeft: 'Fix to Left',
        fixedRight: 'Fix to Right',
        unfixed: 'Unfix'
      },
      // Context Menu
      contextMenu: {
        copy: 'Copy',
        copyRow: 'Copy Row',
        copyCell: 'Copy Cell',
        paste: 'Paste',
        insertRowAbove: 'Insert Row Above',
        insertRowBelow: 'Insert Row Below',
        deleteRow: 'Delete Row',
        deleteSelectedRows: 'Delete Selected Rows',
        exportSelected: 'Export Selected'
      },
      // Selection
      selection: {
        selectAll: 'Select All',
        selectInvert: 'Invert Selection',
        selectNone: 'Clear Selection',
        selected: '{count} items selected'
      },
      // Expand
      expand: {
        expandAll: 'Expand All',
        collapseAll: 'Collapse All'
      },
      // Tree
      tree: {
        expandAll: 'Expand All',
        collapseAll: 'Collapse All',
        expandLevel: 'Expand to Level {level}'
      },
      // Drag
      drag: {
        dragTip: 'Drag to reorder',
        dropTip: 'Drop to place'
      }
    },
    // Message Box
    messagebox: {
      title: 'Message',
      confirm: 'OK',
      cancel: 'Cancel',
      close: 'Close',
      error: 'Illegal input',
      alert: 'Alert',
      prompt: 'Prompt',
      inputPlaceholder: 'Please input'
    },
    // Upload
    upload: {
      deleteTip: 'press delete to remove',
      delete: 'Delete',
      preview: 'Preview',
      continue: 'Continue',
      upload: 'Click to upload',
      tip: 'Click or drag file to this area to <em>upload</em>',
      dragTip: 'Drop file here or click to upload',
      uploading: 'Uploading...',
      success: 'Upload successful',
      error: 'Upload failed',
      retry: 'Retry',
      cancel: 'Cancel upload',
      fileTypeError: 'File type not supported',
      fileSizeError: 'File size exceeds limit',
      fileCountError: 'File count exceeds limit'
    },
    // Form
    form: {
      validationFailed: 'Validation failed',
      required: 'Required',
      pleaseInput: 'Please input',
      pleaseSelect: 'Please select'
    },
    // Button
    button: {
      loading: 'Loading...'
    },
    // Input
    input: {
      placeholder: 'Please input',
      clear: 'Clear',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      copy: 'Copy',
      copied: 'Copied'
    },
    // Input Number
    inputnumber: {
      placeholder: 'Please input number',
      increase: 'Increase',
      decrease: 'Decrease'
    },
    // Input Tag
    inputtag: {
      placeholder: 'Please input',
      add: 'Add',
      remove: 'Remove'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'More'
    },
    // Back Top
    backtop: {
      text: 'Back to Top'
    },
    // Select
    select: {
      placeholder: 'Please select',
      noData: 'No Data',
      loading: 'Loading...',
      noMatch: 'No matching data',
      selectAll: 'Select All',
      clearAll: 'Clear All'
    },
    // Pagination
    pagination: {
      goto: 'Go to',
      page: '',
      total: 'Total {total}',
      pageSize: '/page',
      prev: 'Previous',
      next: 'Next',
      first: 'First',
      last: 'Last',
      pageClassifier: ''
    },
    // Popconfirm
    popconfirm: {
      confirm: 'OK',
      cancel: 'Cancel',
      dontAskAgain: "Don't ask again"
    },
    // Dialog
    dialog: {
      confirm: 'OK',
      cancel: 'Cancel',
      close: 'Close',
      maximize: 'Maximize',
      restore: 'Restore'
    },
    // Drawer
    drawer: {
      close: 'Close',
      confirm: 'OK',
      cancel: 'Cancel'
    },
    // Dropdown
    dropdown: {
      loading: 'Loading...'
    },
    // Image
    image: {
      error: 'FAILED',
      loading: 'Loading...',
      preview: 'Preview',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      rotateLeft: 'Rotate Left',
      rotateRight: 'Rotate Right',
      originalSize: 'Original Size',
      fullscreen: 'Fullscreen'
    },
    // Image Viewer
    imageviewer: {
      close: 'Close',
      prev: 'Previous',
      next: 'Next',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      rotateLeft: 'Rotate Left',
      rotateRight: 'Rotate Right',
      reset: 'Reset',
      fullscreen: 'Fullscreen',
      exitFullscreen: 'Exit Fullscreen'
    },
    // Infinite Scroll
    infinitescroll: {
      loading: 'Loading...',
      finished: 'No more data',
      error: 'Load failed, click to retry',
      retry: 'Click to retry'
    },
    // Message
    message: {
      close: 'Close'
    },
    // Notification
    notification: {
      close: 'Close'
    },
    // Loading
    loading: {
      text: 'Loading...'
    },
    // Spin
    spin: {
      text: 'Loading...'
    },
    // Rate
    rate: {
      texts: ['Extremely poor', 'Disappointed', 'Fair', 'Satisfied', 'Surprised']
    },
    // Alert
    alert: {
      close: 'Close'
    },
    // Tag
    tag: {
      close: 'Close'
    },
    // Tabs
    tabs: {
      close: 'Close',
      add: 'Add',
      more: 'More'
    },
    // Steps
    steps: {
      finish: 'Finished',
      process: 'In Progress',
      wait: 'Waiting',
      error: 'Error'
    },
    // Progress
    progress: {
      success: 'Success',
      exception: 'Exception',
      warning: 'Warning'
    },
    // Skeleton
    skeleton: {
      loading: 'Loading...'
    },
    // Empty
    empty: {
      description: 'No Data',
      noData: 'No Data',
      noResult: 'No Results',
      networkError: 'Network Error',
      serverError: 'Server Error'
    },
    // Result
    result: {
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Info',
      backHome: 'Back to Home'
    },
    // Waterfall
    waterfall: {
      loading: 'Loading...',
      noMore: 'No more data',
      empty: 'No Data'
    },
    // Descriptions
    descriptions: {
      colon: ':'
    },
    // Slider
    slider: {
      tipFormatter: '{value}'
    },
    // Switch
    switch: {
      on: 'ON',
      off: 'OFF'
    },
    // Checkbox
    checkbox: {
      selectAll: 'Select All'
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: 'Collapse Menu',
      expand: 'Expand Menu'
    },
    // Card
    card: {
      collapse: 'Collapse',
      expand: 'Expand'
    },
    // Collapse
    collapse: {
      expand: 'Expand',
      collapse: 'Collapse'
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: 'Load failed'
    },
    // Watermark
    watermark: {},
    // Divider
    divider: {},
    // Carousel
    carousel: {
      prev: 'Previous',
      next: 'Next'
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Flow
    flow: {
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      fitView: 'Fit View',
      lock: 'Toggle Interactivity'
    },
    // Anchor
    anchor: {},
    // Mention
    mention: {
      placeholder: 'Please input',
      loading: 'Loading...',
      noData: 'No Data'
    },
    // SKU Selector
    skuselector: {
      placeholder: 'Select specifications',
      emptyText: 'No specifications',
      stock: 'Stock',
      price: 'Price',
      selected: 'Selected',
      outOfStock: 'Out of Stock'
    },
    // Product Card
    productcard: {
      viewDetails: 'View Details',
      buyNow: 'Buy Now',
      addToCart: 'Add to Cart',
      sold: 'Sold',
      soldOut: 'Sold Out',
      vip: 'VIP'
    },
    // Price
    price: {
      original: 'Original'
    },
    // Coupon Card
    couponcard: {
      available: 'Claim Now',
      used: 'Used',
      expired: 'Expired',
      received: 'Received',
      limit: 'Orders over {threshold}',
      noThreshold: 'No threshold',
      validPeriod: 'Validity',
      ruleTitle: 'Usage Rules'
    },
    // Lucky Draw
    luckydraw: {
      start: 'Start',
      drawing: 'Drawing...',
      end: 'Winner!',
      retry: 'Retry'
    },
    // Filter Bar
    filterbar: {
      all: 'All',
      sort: 'Sort',
      filter: 'Filter',
      cancel: 'Cancel',
      reset: 'Reset',
      confirm: 'Confirm',
      noOptions: 'No options',
      asc: 'Ascending',
      desc: 'Descending',
      selected: 'Selected'
    },
    // Submit Bar
    submitbar: {
      total: 'Total: ',
      selected: '{count} selected',
      submit: 'Checkout',
      allSelect: 'Select All'
    },
    // Category Nav
    categorynav: {
      all: 'All',
      noData: 'No Data',
      loading: 'Loading...'
    },
    // Smart Address
    smartaddress: {
      placeholder: 'Paste address here, auto-detect name, phone, location',
      parse: 'Smart Parse',
      province: 'Province/City/District',
      city: 'City',
      district: 'District/County',
      street: 'Street/Town',
      detail: 'Detailed Address',
      phone: 'Phone',
      name: 'Recipient',
      parseSuccess: 'Address parsed successfully',
      parseFailed: 'Parse failed, please fill manually',
      required: 'Please fill complete address',
      provinceKeywords: ['Province', 'State'],
      cityKeywords: ['City', 'Prefecture'],
      districtKeywords: ['District', 'County', 'Township'],
      streetKeywords: ['Street', 'Road', 'Ave', 'Lane']
    },
    ganttchart: {
      taskName: 'Task Name',
      searchPlaceholder: 'Search tasks...',
      zoom: 'Zoom',
      day: 'Day',
      week: 'Week',
      month: 'Month',
      year: 'Year',
      milestone: 'Milestone'
    },
    imagemagnifier: {
      switchToImage: 'Switch to image {index}',
      galleryItem: 'Gallery {index}',
      close: 'Close'
    },
    // AI Components
    ai: {
      bubble: {
        citations: 'Citations'
      },
      mention: {
        placeholder: '@ Mention Agent, Doc or Table...',
        agent: 'Agent',
        document: 'Document',
        table: 'Table',
        knowledge: 'Knowledge'
      },
      codeBlock: {
        copyCode: 'Copy code',
        copied: 'Copied!',
        run: 'Run Code',
        edit: 'Edit',
        save: 'Save',
        cancel: 'Cancel'
      },
      codeRunner: {
        run: 'Run',
        stop: 'Stop',
        clear: 'Clear',
        reset: 'Reset',
        placeholder: 'Click Run to execute the code...'
      },
      sender: {
        placeholder: 'Send a message...',
        dragTip: 'Release to upload files'
      },
      thoughtChain: {
        thoughtProcess: 'Thought Process',
        thinking: 'Thinking...',
        defaultTitle: 'New Step',
        addNode: 'Add Step'
      },
      thinking: {
        start: 'Start thinking',
        thinking: 'Thinking...',
        complete: 'Thinking complete',
        error: 'Thinking error'
      },
      welcome: {
        title: 'Hello, I am YH AI',
        description:
          'I can help you with coding, translating documents, or creative writing. What can I do for you today?'
      },
      action: {
        copy: 'Copy',
        regenerate: 'Regenerate',
        share: 'Share',
        like: 'Like',
        dislike: 'Dislike',
        edit: 'Edit',
        delete: 'Delete'
      },
      artifacts: {
        preview: 'Preview',
        inline: 'Inline',
        code: 'Source',
        versions: 'Versions',
        rendering: 'Rendering component...',
        renderingChart: 'Rendering chart...',
        renderingCanvas: 'Preparing canvas...'
      },
      voice: {
        trigger: 'Click to Speak',
        listening: 'Listening...'
      },
      // AiAgentCard
      agent: {
        uses: 'uses',
        use: 'Use Now',
        favorite: 'Favorite',
        unfavorite: 'Unfavorite',
        share: 'Share',
        online: 'Online',
        offline: 'Offline',
        busy: 'Busy',
        verified: 'Verified',
        rating: 'Rating',
        reviews: 'reviews',
        responseTime: 'Avg. Response',
        ms: 'ms'
      },
      // AiSources
      sources: {
        references: 'References',
        referencedSources: 'Referenced Sources',
        relevant: 'Relevance',
        viewOriginal: 'View Original',
        showAll: 'Show All',
        more: 'more sources',
        drawerTitle: 'References',
        expandMore: 'Show More',
        collapseMore: 'Collapse',
        noSources: 'No sources',
        today: 'Today',
        last7Days: 'Last 7 Days',
        last30Days: 'Last 30 Days',
        earlier: 'Earlier',
        pinned: 'Pinned'
      },
      // AiConversations groups
      conversations: {
        today: 'Today',
        last7Days: 'Last 7 Days',
        last30Days: 'Last 30 Days',
        earlier: 'Earlier',
        pinned: 'Pinned',
        pin: 'Pin',
        unpin: 'Unpin',
        newConversation: 'New Conversation',
        noData: 'No conversations yet',
        rename: 'Rename',
        delete: 'Delete',
        deleteConfirm: 'Confirm delete this conversation?'
      },
      // AiAttachments
      attachments: {
        dropTip: 'Drop files here to upload',
        clickToUpload: 'Click or drag files to upload',
        uploadSuccess: 'Upload success',
        uploadError: 'Upload failed',
        deleteConfirm: 'Are you sure to delete this file?',
        fileTooLarge: 'File size cannot exceed {size}',
        invalidFileType: 'Invalid file type'
      },
      // AiMermaid
      mermaid: {
        image: 'Image',
        code: 'Code',
        zoomIn: 'Zoom In',
        zoomOut: 'Zoom Out',
        reset: 'Reset',
        download: 'Download',
        copyCode: 'Copy Code',
        rendering: 'Rendering...',
        renderError: 'Render failed',
        renderSuccess: 'Render success',
        retry: 'Retry'
      }
    }
  }
}

// public/codesandbox-runtime/hooks/use-config/index.js
import { inject as inject4, computed as computed5, unref as unref4 } from 'vue'
var configProviderContextKey = Symbol('configProviderContextKey')
var useConfig = () => {
  const configRef = inject4(configProviderContextKey, null)
  const globalSize = computed5(() => {
    const config = unref4(configRef)
    return (config == null ? void 0 : config.size) || 'default'
  })
  const globalZIndex = computed5(() => {
    const config = unref4(configRef)
    return (config == null ? void 0 : config.zIndex) || 2e3
  })
  const globalLocale = computed5(() => {
    const config = unref4(configRef)
    return config == null ? void 0 : config.locale
  })
  return {
    config: configRef,
    globalSize,
    globalZIndex,
    globalLocale
  }
}

// public/codesandbox-runtime/hooks/dayjs.js
import * as dayjsModule from 'dayjs'
var _a
var dayjs =
  'default' in dayjsModule ? ((_a = dayjsModule.default) != null ? _a : dayjsModule) : dayjsModule
var stdin_default = dayjs

// public/codesandbox-runtime/hooks/use-locale/dayjs-locale.js
import 'dayjs/locale/en'
var dayjsLocales = {}
var loadedLocales = /* @__PURE__ */ new Set(['en'])
var localeMapping = {
  'zh-cn': 'zh-cn',
  'zh-tw': 'zh-tw',
  'zh-hk': 'zh-hk',
  'zh-mo': 'zh-tw',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  de: 'de',
  fr: 'fr',
  es: 'es',
  pt: 'pt',
  'pt-br': 'pt-br',
  ru: 'ru',
  ar: 'ar',
  'ar-eg': 'ar',
  tr: 'tr',
  it: 'it',
  nl: 'nl',
  pl: 'pl',
  th: 'th',
  vi: 'vi',
  id: 'id',
  ms: 'ms',
  da: 'da',
  sv: 'sv',
  fi: 'fi',
  no: 'nb',
  'nb-NO': 'nb',
  cs: 'cs',
  sk: 'sk',
  uk: 'uk',
  hu: 'hu',
  ro: 'ro',
  bg: 'bg',
  az: 'az',
  fa: 'fa',
  hi: 'hi',
  pa: 'pa-in',
  el: 'el',
  ca: 'ca',
  tk: 'tk',
  ta: 'ta',
  lv: 'lv',
  af: 'af',
  et: 'et',
  sl: 'sl',
  he: 'he',
  lo: 'lo',
  lt: 'lt',
  mn: 'mn',
  kk: 'kk',
  ku: 'ku',
  ckb: 'ku',
  'ug-cn': 'ug-cn',
  km: 'km',
  sr: 'sr',
  eu: 'eu',
  ky: 'ky',
  'hy-am': 'hy-am',
  hr: 'hr',
  eo: 'eo',
  bn: 'bn',
  mg: 'mg',
  sw: 'sw',
  'uz-uz': 'uz',
  my: 'my',
  te: 'te'
}
var loadDayjsLocale = async (dayjsLocale) => {
  const path = `../../../../node_modules/dayjs/locale/${dayjsLocale}.js`
  const loader = dayjsLocales[path]
  if (loader) {
    await loader()
    return true
  }
  try {
    await import(
      /* @vite-ignore */
      `dayjs/locale/${dayjsLocale}.js`
    )
    return true
  } catch (e) {
    return false
  }
}
var getDayjsLocale = (localeCode) => {
  return localeMapping[localeCode.toLowerCase()] || 'en'
}
var setDayjsLocale = async (localeCode) => {
  const dayjsLocale = getDayjsLocale(localeCode)
  if (loadedLocales.has(dayjsLocale)) {
    stdin_default.locale(dayjsLocale)
    return
  }
  if (dayjsLocale === 'en') {
    stdin_default.locale('en')
    return
  }
  try {
    const loaded = await loadDayjsLocale(dayjsLocale)
    if (!loaded) {
      stdin_default.locale('en')
      return
    }
    loadedLocales.add(dayjsLocale)
    stdin_default.locale(dayjsLocale)
  } catch (e) {
    stdin_default.locale('en')
  }
}

// public/codesandbox-runtime/hooks/use-locale/index.js
var useLocale = (localeOverrides) => {
  const { globalLocale } = useConfig()
  const locale = computed6(() => {
    var _a2, _b
    return (_b = (_a2 = unref5(localeOverrides)) != null ? _a2 : unref5(globalLocale)) != null
      ? _b
      : zhCn
  })
  const lang = computed6(() => locale.value.name)
  watch(
    lang,
    (newLang) => {
      setDayjsLocale(newLang)
    },
    { immediate: true }
  )
  const resolveLocaleValue = (path) => {
    const keys = path.split('.')
    const sources = [locale.value.yh, zhCn.yh, en.yh]
    for (const source of sources) {
      let result = source
      for (const key of keys) {
        if (result && typeof result === 'object') {
          result = result[key]
        } else {
          result = void 0
          break
        }
      }
      if (result !== void 0) return result
    }
    return void 0
  }
  const t = (path, options) => {
    const result = resolveLocaleValue(path)
    if (typeof result !== 'string') return path
    if (options) {
      return result.replace(/\{(\w+)\}/g, (_match, key) => {
        const val = options[key]
        return val !== void 0 ? String(val) : `{${key}}`
      })
    }
    return result
  }
  const tRaw = (path) => {
    const result = resolveLocaleValue(path)
    if (result === void 0) return path
    return result
  }
  return {
    locale,
    lang,
    t,
    tRaw
  }
}

// public/codesandbox-runtime/hooks/use-id/index.js
import { computed as computed7, inject as inject5, unref as unref6, useId as useVueId } from 'vue'
var idInjectionKey = Symbol('idInjectionKey')
var useId = (idOverrides) => {
  const injectedId = inject5(idInjectionKey, void 0)
  const nativeId = useVueId()
  const id = computed7(() => {
    const override = unref6(idOverrides)
    if (override) return override
    const injected = unref6(injectedId)
    if (injected) return injected
    return nativeId
  })
  return id
}

// public/codesandbox-runtime/hooks/use-form-item/index.js
import { inject as inject6 } from 'vue'
var FormContextKey = Symbol('FormContextKey')
var FormItemContextKey = Symbol('FormItemContextKey')
var useFormItem = () => {
  const form = inject6(FormContextKey, void 0)
  const formItem = inject6(FormItemContextKey, void 0)
  return {
    form,
    formItem,
    // 触发校验
    validate: (trigger) => {
      if (formItem) {
        return formItem.validate(trigger).catch(() => {
          return false
        })
      }
      return Promise.resolve(true)
    }
  }
}

// public/codesandbox-runtime/hooks/use-virtual-scroll/index.js
import { ref as ref4, computed as computed8, unref as unref7 } from 'vue'

// public/codesandbox-runtime/hooks/use-cache/index.js
import { shallowRef } from 'vue'

// public/codesandbox-runtime/hooks/use-event-listener/index.js
import { onMounted, onBeforeUnmount, isRef, watch as watch2, unref as unref8 } from 'vue'

// public/codesandbox-runtime/hooks/use-scroll-lock/index.js
import { ref as ref5, watch as watch3, onUnmounted as onUnmounted2 } from 'vue'

// public/codesandbox-runtime/hooks/use-click-outside/index.js
import { unref as unref9 } from 'vue'

// public/codesandbox-runtime/hooks/use-ai/use-ai-chat.js
import { ref as ref7, computed as computed9 } from 'vue'

// public/codesandbox-runtime/hooks/use-ai/use-ai-stream.js
import { ref as ref6 } from 'vue'

// public/codesandbox-runtime/hooks/use-ai/use-ai-conversations.js
import { ref as ref8, computed as computed10 } from 'vue'

// public/codesandbox-runtime/hooks/use-ai/use-ai-request.js
import { ref as ref9 } from 'vue'

// public/codesandbox-runtime/hooks/use-ai/use-ai-voice.js
import { ref as ref10, onUnmounted as onUnmounted3, shallowRef as shallowRef2 } from 'vue'

// public/codesandbox-runtime/hooks/use-ai/use-ai-persistence.js
import { ref as ref11, onMounted as onMounted2 } from 'vue'

// public/codesandbox-runtime/components/smart-address/src/smart-address-meta.js
var smartAddressProps = {
  modelValue: {
    type: Object,
    default: () => ({
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      street: '',
      detail: ''
    })
  },
  showName: {
    type: Boolean,
    default: true
  },
  showPhone: {
    type: Boolean,
    default: true
  },
  showStreet: {
    type: Boolean,
    default: false
  },
  parsePlaceholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  parseButtonText: {
    type: String,
    default: ''
  },
  showParser: {
    type: Boolean,
    default: true
  },
  regionType: {
    type: String,
    default: 'input'
  },
  regionOptions: {
    type: Array,
    default: () => []
  },
  labelField: {
    type: String,
    default: 'label'
  },
  valueField: {
    type: String,
    default: 'value'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  labelPlacement: {
    type: String,
    default: 'left'
  },
  parser: {
    type: Function,
    default: null
  },
  themeOverrides: {
    type: Object,
    default: () => ({})
  }
}
var smartAddressEmits = {
  'update:modelValue': (val) => val !== void 0,
  parsed: (val) => val !== void 0,
  change: (val) => val !== void 0
}

// public/codesandbox-runtime/components/smart-address/src/use-address-parser.js
var PHONE_RE = /(?:\+?\d{1,4}[-.\s]?)?1[3-9]\d{9}|(?:\+?\d{1,4}[-.\s]?)?\d{7,14}/
var CN_NAME_RE = /[\u4e00-\u9fa5]{2,5}/
var EN_NAME_RE = /\b[A-Za-z]+(?:\s[A-Z a-z]+){1,2}\b/
var DEFAULT_PROVINCE_KW = [
  '\u7701',
  '\u81EA\u6CBB\u533A',
  '\u7279\u522B\u884C\u653F\u533A',
  'Province',
  'State'
]
var DEFAULT_CITY_KW = ['\u5E02', '\u5DDE', '\u76DF', 'City', 'Prefecture']
var DEFAULT_DISTRICT_KW = ['\u533A', '\u53BF', '\u65D7', 'District', 'County', 'Township']
var DEFAULT_STREET_KW = [
  '\u8857\u9053',
  '\u9547',
  '\u4E61',
  '\u6751',
  'Street',
  'Road',
  'Ave',
  'Lane'
]
function parseAddress(raw, options = {}) {
  let text = raw
    .replace(/\r?\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
  const result = {
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    street: '',
    detail: '',
    raw
  }
  const phoneMatch = text.match(PHONE_RE)
  let textAfterPhone = text
  if (phoneMatch) {
    result.phone = phoneMatch[0]
    const phoneIdx = text.indexOf(phoneMatch[0])
    const textBeforePhone = text.slice(0, phoneIdx).trim()
    if (textBeforePhone && textBeforePhone.length <= 20) {
      if (!/\d/.test(textBeforePhone)) {
        result.name = textBeforePhone
      }
    }
    textAfterPhone = text.replace(phoneMatch[0], ' ').trim()
  }
  let remaining = textAfterPhone
  if (!result.name) {
    const namePrefixMatch = remaining.match(
      /^([A-Za-z\s]{2,15}|[\u4e00-\u9fa5]{2,5})[,，\s:：\-_|]/
    )
    if (namePrefixMatch) {
      result.name = namePrefixMatch[1].trim()
      remaining = remaining.slice(namePrefixMatch[0].length).trim()
    }
  } else {
    if (remaining.startsWith(result.name)) {
      remaining = remaining.slice(result.name.length).trim()
      remaining = remaining.replace(/^[,，\s:：\-_|]+/, '').trim()
    }
  }
  if (remaining.includes(',') || remaining.includes('\uFF0C')) {
    remaining = parseByDelimiter(remaining, result, options)
  } else {
    remaining = extractRegion(remaining, result, options)
  }
  result.detail = remaining.replace(/^[;；,，\s]+/, '').trim()
  if (!result.name) {
    const potentialName = remaining.match(EN_NAME_RE) || remaining.match(CN_NAME_RE)
    if (potentialName && remaining.indexOf(potentialName[0]) < 10) {
      result.name = potentialName[0]
    }
  }
  return result
}
function parseByDelimiter(text, result, options) {
  const segments = text
    .split(/[,，]/)
    .map((s) => s.trim())
    .filter(Boolean)
  const pK = options.provinceKeywords || DEFAULT_PROVINCE_KW
  const cK = options.cityKeywords || DEFAULT_CITY_KW
  const dK = options.districtKeywords || DEFAULT_DISTRICT_KW
  const sK = options.streetKeywords || DEFAULT_STREET_KW
  const matchedIndices = /* @__PURE__ */ new Set()
  segments.forEach((seg, idx) => {
    if (dK.some((k) => seg.includes(k)) && !result.district) {
      result.district = seg
      matchedIndices.add(idx)
    } else if (cK.some((k) => seg.includes(k)) && !result.city) {
      result.city = seg
      matchedIndices.add(idx)
    } else if (pK.some((k) => seg.includes(k)) && !result.province) {
      result.province = seg
      matchedIndices.add(idx)
    } else if (sK.some((k) => seg.includes(k)) && !result.street) {
      result.street = seg
      matchedIndices.add(idx)
    }
  })
  segments.forEach((seg, idx) => {
    if (matchedIndices.has(idx)) return
    if (
      idx > 0 &&
      matchedIndices.has(idx - 1) &&
      segments[idx - 1] === result.district &&
      !result.city
    ) {
      result.city = seg
      matchedIndices.add(idx)
    } else if (
      idx > 0 &&
      matchedIndices.has(idx - 1) &&
      segments[idx - 1] === result.city &&
      !result.province
    ) {
      result.province = seg
      matchedIndices.add(idx)
    } else if (idx === 0 && segments.length >= 2 && matchedIndices.has(1) && !result.city) {
      if (pK.some((k) => segments[1].includes(k)) && !result.province && !result.city) {
        result.city = seg
        matchedIndices.add(idx)
      } else if (cK.some((k) => segments[1].includes(k)) && !result.city) {
        if (pK.some((k) => segments[1].includes(k)) && !result.city) {
          result.city = seg
          matchedIndices.add(idx)
        }
      }
    }
  })
  const remainingSegments = segments.filter((_, idx) => !matchedIndices.has(idx))
  return remainingSegments.join(', ')
}
function extractRegion(text, result, options) {
  let remaining = text
  const pK = options.provinceKeywords || DEFAULT_PROVINCE_KW
  const cK = options.cityKeywords || DEFAULT_CITY_KW
  const dK = options.districtKeywords || DEFAULT_DISTRICT_KW
  const sK = options.streetKeywords || DEFAULT_STREET_KW
  const processSuffix = (field, keywords, maxWords) => {
    for (const kw of keywords) {
      const idx = remaining.indexOf(kw)
      if (idx >= 0 && idx <= maxWords) {
        result[field] = remaining.slice(0, idx + kw.length)
        remaining = remaining.slice(idx + kw.length).trim()
        return true
      }
    }
    return false
  }
  processSuffix('province', pK, 12)
  processSuffix('city', cK, 12)
  processSuffix('district', dK, 12)
  processSuffix('street', sK, 15)
  return remaining
}

// public/codesandbox-runtime/utils/vue.js
var withInstall = (main, extra) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
      const name = comp.name || comp.__name
      if (name) {
        app.component(name, comp)
      }
    }
  }
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      main[key] = comp
    }
  }
  return main
}

// public/codesandbox-runtime/components/select/src/select.js
import {
  createCommentVNode as _createCommentVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  withModifiers as _withModifiers,
  renderSlot as _renderSlot,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle,
  vShow as _vShow,
  withDirectives as _withDirectives,
  Transition as _Transition,
  withCtx as _withCtx,
  createVNode as _createVNode,
  Teleport as _Teleport,
  createBlock as _createBlock
} from 'vue'
import {
  computed as computed11,
  ref as ref12,
  nextTick,
  provide as provide2,
  watch as watch4,
  onMounted as onMounted3,
  onBeforeUnmount as onBeforeUnmount2
} from 'vue'

// public/codesandbox-runtime/components/select/src/select-meta.js
var SelectContextKey = Symbol('SelectContextKey')

// public/codesandbox-runtime/components/select/src/select.js
var __defProp2 = Object.defineProperty
var __defProps = Object.defineProperties
var __getOwnPropDescs = Object.getOwnPropertyDescriptors
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols
var __hasOwnProp2 = Object.prototype.hasOwnProperty
var __propIsEnum2 = Object.prototype.propertyIsEnumerable
var __defNormalProp2 = (obj, key, value) =>
  key in obj
    ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop)) __defNormalProp2(a, prop, b[prop])
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop)) __defNormalProp2(a, prop, b[prop])
    }
  return a
}
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b))
var _hoisted_1 = ['onClick']
var _hoisted_2 = [
  'id',
  'value',
  'placeholder',
  'disabled',
  'readonly',
  'aria-expanded',
  'aria-controls'
]
var _hoisted_3 = ['id']
var _hoisted_4 = ['aria-selected', 'onClick', 'onMouseenter']
var _hoisted_5 = ['aria-selected', 'onClick', 'onMouseenter']
var _hoisted_6 = { key: 0 }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        ref: 'wrapperRef',
        class: _normalizeClass($setup.wrapperClasses),
        style: _normalizeStyle($setup.themeStyle),
        onMouseenter: $setup.handleMouseEnter,
        onMouseleave: $setup.handleMouseLeave,
        onClick: $setup.toggleDropdown
      },
      [
        _createCommentVNode(' \u8F93\u5165\u533A\u57DF '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('wrapper'))
          },
          [
            _createCommentVNode(' \u591A\u9009\u6807\u7B7E '),
            $props.multiple
              ? (_openBlock(),
                _createElementBlock(
                  _Fragment,
                  { key: 0 },
                  [
                    (_openBlock(true),
                    _createElementBlock(
                      _Fragment,
                      null,
                      _renderList($setup.displayTags, (label, index) => {
                        return (
                          _openBlock(),
                          _createElementBlock(
                            'span',
                            {
                              key: index,
                              class: _normalizeClass([
                                $setup.ns.e('tag'),
                                $props.tagType ? `yh-tag--${$props.tagType}` : ''
                              ])
                            },
                            [
                              _createElementVNode(
                                'span',
                                {
                                  class: _normalizeClass($setup.ns.e('tag-text'))
                                },
                                _toDisplayString(label),
                                3
                                /* TEXT, CLASS */
                              ),
                              _createElementVNode(
                                'span',
                                {
                                  class: _normalizeClass($setup.ns.e('tag-close')),
                                  onClick: ($event) =>
                                    $setup.handleRemoveTag(
                                      Array.isArray($props.modelValue)
                                        ? $props.modelValue[index]
                                        : $props.modelValue,
                                      $event
                                    )
                                },
                                [
                                  ...(_cache[3] ||
                                    (_cache[3] = [
                                      _createElementVNode(
                                        'svg',
                                        {
                                          viewBox: '0 0 1024 1024',
                                          width: '1em',
                                          height: '1em'
                                        },
                                        [
                                          _createElementVNode('path', {
                                            fill: 'currentColor',
                                            d: 'M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z'
                                          })
                                        ],
                                        -1
                                        /* CACHED */
                                      )
                                    ]))
                                ],
                                10,
                                _hoisted_1
                              )
                            ],
                            2
                            /* CLASS */
                          )
                        )
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    $setup.collapsedCount > 0
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('tag'))
                          },
                          ' +' + _toDisplayString($setup.collapsedCount),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode('v-if', true)
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u8F93\u5165\u6846 '),
            _createElementVNode(
              'input',
              {
                ref: 'inputRef',
                id: $setup.inputId,
                class: _normalizeClass($setup.ns.e('inner')),
                value: $props.filterable ? $setup.query : '',
                placeholder: $setup.hasValue
                  ? ''
                  : $props.placeholder || $setup.t('select.placeholder'),
                disabled: $props.disabled,
                readonly: !$props.filterable,
                autocomplete: 'off',
                role: 'combobox',
                'aria-expanded': $setup.visible,
                'aria-controls': `${$setup.inputId}-listbox`,
                onInput: $setup.handleInput,
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur,
                onKeydown: $setup.handleKeydown
              },
              null,
              42,
              _hoisted_2
            ),
            _createCommentVNode(' \u5355\u9009\u663E\u793A\u503C '),
            !$props.multiple && $setup.hasValue && !$setup.query
              ? (_openBlock(),
                _createElementBlock(
                  'span',
                  {
                    key: 1,
                    class: _normalizeClass($setup.ns.e('selected-value'))
                  },
                  _toDisplayString($setup.selectedLabels),
                  3
                  /* TEXT, CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u540E\u7F00\u56FE\u6807 '),
            _createElementVNode(
              'span',
              {
                class: _normalizeClass($setup.ns.e('suffix'))
              },
              [
                _createCommentVNode(' \u6E05\u7A7A\u6309\u94AE '),
                $setup.showClear
                  ? (_openBlock(),
                    _createElementBlock(
                      'span',
                      {
                        key: 0,
                        class: _normalizeClass([$setup.ns.e('icon'), $setup.ns.e('clear')]),
                        onClick: _withModifiers($setup.handleClear, ['stop'])
                      },
                      [
                        ...(_cache[4] ||
                          (_cache[4] = [
                            _createElementVNode(
                              'svg',
                              {
                                viewBox: '0 0 1024 1024',
                                width: '1em',
                                height: '1em'
                              },
                              [
                                _createElementVNode('path', {
                                  fill: 'currentColor',
                                  d: 'M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z'
                                })
                              ],
                              -1
                              /* CACHED */
                            )
                          ]))
                      ],
                      2
                      /* CLASS */
                    ))
                  : _createCommentVNode('v-if', true),
                _createCommentVNode(' \u7BAD\u5934\u56FE\u6807 '),
                _createElementVNode(
                  'span',
                  {
                    class: _normalizeClass([
                      $setup.ns.e('icon'),
                      $setup.ns.e('arrow'),
                      {
                        'is-reverse': $setup.visible
                      }
                    ])
                  },
                  [
                    ...(_cache[5] ||
                      (_cache[5] = [
                        _createElementVNode(
                          'svg',
                          {
                            viewBox: '0 0 1024 1024',
                            width: '1em',
                            height: '1em'
                          },
                          [
                            _createElementVNode('path', {
                              fill: 'currentColor',
                              d: 'M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z'
                            })
                          ],
                          -1
                          /* CACHED */
                        )
                      ]))
                  ],
                  2
                  /* CLASS */
                )
              ],
              2
              /* CLASS */
            )
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u4E0B\u62C9\u6846 '),
        (_openBlock(),
        _createBlock(
          _Teleport,
          {
            to: 'body',
            disabled: !$props.teleported
          },
          [
            _createVNode(
              _Transition,
              {
                name: $setup.ns.b('dropdown'),
                persisted: ''
              },
              {
                default: _withCtx(() => [
                  _withDirectives(
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass([$setup.ns.e('dropdown'), $props.popperClass]),
                        style: _normalizeStyle(
                          $props.teleported
                            ? $setup.dropdownStyle
                            : {
                                minWidth:
                                  $props.fitInputWidth && $setup.wrapperRef
                                    ? `${$setup.wrapperRef.offsetWidth}px`
                                    : void 0
                              }
                        ),
                        onMousedown: $setup.handleDropdownMousedown,
                        onMouseup: $setup.handleDropdownMouseup
                      },
                      [
                        _createCommentVNode(' \u52A0\u8F7D\u72B6\u6001 '),
                        $props.loading
                          ? (_openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: 0,
                                class: _normalizeClass($setup.ns.e('loading'))
                              },
                              [
                                (_openBlock(),
                                _createElementBlock(
                                  'svg',
                                  {
                                    class: _normalizeClass($setup.ns.e('loading-icon')),
                                    viewBox: '0 0 1024 1024'
                                  },
                                  [
                                    ...(_cache[6] ||
                                      (_cache[6] = [
                                        _createElementVNode(
                                          'path',
                                          {
                                            fill: 'currentColor',
                                            d: 'M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32z'
                                          },
                                          null,
                                          -1
                                          /* CACHED */
                                        )
                                      ]))
                                  ],
                                  2
                                  /* CLASS */
                                )),
                                _createElementVNode(
                                  'span',
                                  null,
                                  _toDisplayString($setup.translatedLoadingText),
                                  1
                                  /* TEXT */
                                )
                              ],
                              2
                              /* CLASS */
                            ))
                          : $setup.filteredOptions.length === 0
                            ? (_openBlock(),
                              _createElementBlock(
                                _Fragment,
                                { key: 1 },
                                [
                                  _createCommentVNode(' \u65E0\u6570\u636E '),
                                  _createElementVNode(
                                    'div',
                                    {
                                      class: _normalizeClass($setup.ns.e('empty'))
                                    },
                                    [
                                      _renderSlot(_ctx.$slots, 'empty', {}, () => [
                                        _createTextVNode(
                                          _toDisplayString(
                                            $setup.query
                                              ? $setup.translatedNoMatchText
                                              : $setup.translatedNoDataText
                                          ),
                                          1
                                          /* TEXT */
                                        )
                                      ])
                                    ],
                                    2
                                    /* CLASS */
                                  )
                                ],
                                2112
                                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                              ))
                            : (_openBlock(),
                              _createElementBlock(
                                _Fragment,
                                { key: 2 },
                                [
                                  _createCommentVNode(' \u9009\u9879\u5217\u8868 '),
                                  _createElementVNode(
                                    'div',
                                    {
                                      id: `${$setup.inputId}-listbox`,
                                      class: _normalizeClass($setup.ns.e('options')),
                                      role: 'listbox',
                                      style: _normalizeStyle(
                                        $props.virtualScroll
                                          ? {
                                              height: `${$props.height}px`,
                                              overflow: 'auto'
                                            }
                                          : {}
                                      ),
                                      onScroll:
                                        _cache[2] ||
                                        (_cache[2] = ($event) =>
                                          $props.virtualScroll
                                            ? $setup.handleVirtualScroll($event)
                                            : void 0)
                                    },
                                    [
                                      _createCommentVNode(' \u865A\u62DF\u6EDA\u52A8\u5360\u4F4D '),
                                      $props.virtualScroll
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            'div',
                                            {
                                              key: 0,
                                              style: _normalizeStyle({
                                                height: `${$setup.totalHeight}px`,
                                                position: 'relative'
                                              })
                                            },
                                            [
                                              _createElementVNode(
                                                'div',
                                                {
                                                  style: _normalizeStyle({
                                                    transform: `translateY(${$setup.offsetY}px)`
                                                  })
                                                },
                                                [
                                                  (_openBlock(true),
                                                  _createElementBlock(
                                                    _Fragment,
                                                    null,
                                                    _renderList(
                                                      $setup.displayOptions,
                                                      (option, index) => {
                                                        return (
                                                          _openBlock(),
                                                          _createElementBlock(
                                                            'div',
                                                            {
                                                              key: String(
                                                                option[$props.valueKey || 'value']
                                                              ),
                                                              class: _normalizeClass([
                                                                $setup.ns.e('option'),
                                                                $setup.ns.is(
                                                                  'selected',
                                                                  $setup.isSelected(
                                                                    option[
                                                                      $props.valueKey || 'value'
                                                                    ]
                                                                  )
                                                                ),
                                                                $setup.ns.is(
                                                                  'disabled',
                                                                  option.disabled
                                                                ),
                                                                $setup.ns.is(
                                                                  'hovering',
                                                                  $setup.hoveredIndex === index
                                                                )
                                                              ]),
                                                              role: 'option',
                                                              'aria-selected': $setup.isSelected(
                                                                option[$props.valueKey || 'value']
                                                              ),
                                                              onMousedown:
                                                                _cache[0] ||
                                                                (_cache[0] =
                                                                  _withModifiers(() => {}, [
                                                                    'prevent'
                                                                  ])),
                                                              onClick: ($event) =>
                                                                $setup.handleOptionClick(
                                                                  option,
                                                                  $event
                                                                ),
                                                              onMouseenter: ($event) =>
                                                                ($setup.hoveredIndex =
                                                                  $setup.startIndex + index)
                                                            },
                                                            [
                                                              _renderSlot(
                                                                _ctx.$slots,
                                                                'option',
                                                                { option },
                                                                () => [
                                                                  _createTextVNode(
                                                                    _toDisplayString(
                                                                      option[
                                                                        $props.labelKey || 'label'
                                                                      ] || option.label
                                                                    ),
                                                                    1
                                                                    /* TEXT */
                                                                  )
                                                                ]
                                                              ),
                                                              $props.multiple &&
                                                              $setup.isSelected(
                                                                option[$props.valueKey || 'value']
                                                              )
                                                                ? (_openBlock(),
                                                                  _createElementBlock(
                                                                    'span',
                                                                    {
                                                                      key: 0,
                                                                      class: _normalizeClass(
                                                                        $setup.ns.e('option-check')
                                                                      )
                                                                    },
                                                                    [
                                                                      ...(_cache[7] ||
                                                                        (_cache[7] = [
                                                                          _createElementVNode(
                                                                            'svg',
                                                                            {
                                                                              viewBox:
                                                                                '0 0 1024 1024',
                                                                              width: '1em',
                                                                              height: '1em'
                                                                            },
                                                                            [
                                                                              _createElementVNode(
                                                                                'path',
                                                                                {
                                                                                  fill: 'currentColor',
                                                                                  d: 'M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z'
                                                                                }
                                                                              )
                                                                            ],
                                                                            -1
                                                                            /* CACHED */
                                                                          )
                                                                        ]))
                                                                    ],
                                                                    2
                                                                    /* CLASS */
                                                                  ))
                                                                : _createCommentVNode('v-if', true)
                                                            ],
                                                            42,
                                                            _hoisted_4
                                                          )
                                                        )
                                                      }
                                                    ),
                                                    128
                                                    /* KEYED_FRAGMENT */
                                                  ))
                                                ],
                                                4
                                                /* STYLE */
                                              )
                                            ],
                                            4
                                            /* STYLE */
                                          ))
                                        : (_openBlock(),
                                          _createElementBlock(
                                            _Fragment,
                                            { key: 1 },
                                            [
                                              _createCommentVNode(' \u666E\u901A\u5217\u8868 '),
                                              (_openBlock(true),
                                              _createElementBlock(
                                                _Fragment,
                                                null,
                                                _renderList(
                                                  $setup.displayOptions,
                                                  (option, index) => {
                                                    return (
                                                      _openBlock(),
                                                      _createElementBlock(
                                                        'div',
                                                        {
                                                          key: String(
                                                            option[$props.valueKey || 'value']
                                                          ),
                                                          class: _normalizeClass([
                                                            $setup.ns.e('option'),
                                                            $setup.ns.is(
                                                              'selected',
                                                              $setup.isSelected(
                                                                option[$props.valueKey || 'value']
                                                              )
                                                            ),
                                                            $setup.ns.is(
                                                              'disabled',
                                                              option.disabled
                                                            ),
                                                            $setup.ns.is(
                                                              'hovering',
                                                              $setup.hoveredIndex === index
                                                            )
                                                          ]),
                                                          role: 'option',
                                                          'aria-selected': $setup.isSelected(
                                                            option[$props.valueKey || 'value']
                                                          ),
                                                          onMousedown:
                                                            _cache[1] ||
                                                            (_cache[1] = _withModifiers(() => {}, [
                                                              'prevent'
                                                            ])),
                                                          onClick: ($event) =>
                                                            $setup.handleOptionClick(
                                                              option,
                                                              $event
                                                            ),
                                                          onMouseenter: ($event) =>
                                                            ($setup.hoveredIndex = index)
                                                        },
                                                        [
                                                          _renderSlot(
                                                            _ctx.$slots,
                                                            'option',
                                                            { option },
                                                            () => [
                                                              _createTextVNode(
                                                                _toDisplayString(
                                                                  option[
                                                                    $props.labelKey || 'label'
                                                                  ] || option.label
                                                                ),
                                                                1
                                                                /* TEXT */
                                                              )
                                                            ]
                                                          ),
                                                          $props.multiple &&
                                                          $setup.isSelected(
                                                            option[$props.valueKey || 'value']
                                                          )
                                                            ? (_openBlock(),
                                                              _createElementBlock(
                                                                'span',
                                                                {
                                                                  key: 0,
                                                                  class: _normalizeClass(
                                                                    $setup.ns.e('option-check')
                                                                  )
                                                                },
                                                                [
                                                                  ...(_cache[8] ||
                                                                    (_cache[8] = [
                                                                      _createElementVNode(
                                                                        'svg',
                                                                        {
                                                                          viewBox: '0 0 1024 1024',
                                                                          width: '1em',
                                                                          height: '1em'
                                                                        },
                                                                        [
                                                                          _createElementVNode(
                                                                            'path',
                                                                            {
                                                                              fill: 'currentColor',
                                                                              d: 'M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z'
                                                                            }
                                                                          )
                                                                        ],
                                                                        -1
                                                                        /* CACHED */
                                                                      )
                                                                    ]))
                                                                ],
                                                                2
                                                                /* CLASS */
                                                              ))
                                                            : _createCommentVNode('v-if', true)
                                                        ],
                                                        42,
                                                        _hoisted_5
                                                      )
                                                    )
                                                  }
                                                ),
                                                128
                                                /* KEYED_FRAGMENT */
                                              ))
                                            ],
                                            64
                                            /* STABLE_FRAGMENT */
                                          ))
                                    ],
                                    46,
                                    _hoisted_3
                                  )
                                ],
                                2112
                                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                              ))
                      ],
                      38
                      /* CLASS, STYLE, NEED_HYDRATION */
                    ),
                    [[_vShow, $setup.visible]]
                  )
                ]),
                _: 3
                /* FORWARDED */
              },
              8,
              ['name']
            )
          ],
          8,
          ['disabled']
        )),
        _createCommentVNode(' \u9690\u85CF\u63D2\u69FD\uFF0C\u7528\u4E8E\u6CE8\u518C Option '),
        _ctx.$slots.default
          ? _withDirectives(
              (_openBlock(),
              _createElementBlock(
                'div',
                _hoisted_6,
                [_renderSlot(_ctx.$slots, 'default')],
                512
                /* NEED_PATCH */
              )),
              [[_vShow, false]]
            )
          : _createCommentVNode('v-if', true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhSelect'
  },
  {
    __name: 'select',
    props: {
      modelValue: { type: [String, Number, Boolean, Array], required: false },
      options: { type: Array, required: false },
      placeholder: { type: String, required: false },
      disabled: { type: Boolean, required: false, default: false },
      clearable: { type: Boolean, required: false, default: false },
      size: { type: String, required: false, default: void 0 },
      multiple: { type: Boolean, required: false, default: false },
      multipleLimit: { type: Number, required: false, default: 0 },
      filterable: { type: Boolean, required: false, default: false },
      filterMethod: { type: Function, required: false },
      remote: { type: Boolean, required: false, default: false },
      remoteMethod: { type: Function, required: false },
      loading: { type: Boolean, required: false, default: false },
      loadingText: { type: String, required: false, default: '' },
      noMatchText: { type: String, required: false, default: '' },
      noDataText: { type: String, required: false, default: '' },
      allowCreate: { type: Boolean, required: false, default: false },
      collapseTags: { type: Boolean, required: false, default: false },
      collapseTagsTooltip: { type: Boolean, required: false, default: false },
      maxCollapseTags: { type: Number, required: false, default: 1 },
      popperClass: { type: String, required: false },
      teleported: { type: Boolean, required: false, default: true },
      fitInputWidth: { type: Boolean, required: false, default: true },
      tagType: { type: String, required: false, default: '' },
      virtualScroll: { type: Boolean, required: false, default: false },
      itemHeight: { type: Number, required: false, default: 34 },
      height: { type: Number, required: false, default: 274 },
      validateEvent: { type: Boolean, required: false, default: true },
      valueKey: { type: String, required: false, default: 'value' },
      labelKey: { type: String, required: false, default: 'label' },
      themeOverrides: { type: null, required: false }
    },
    emits: [
      'update:modelValue',
      'change',
      'focus',
      'blur',
      'clear',
      'visible-change',
      'remove-tag'
    ],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('select')
      const { t } = useLocale()
      const inputId = useId()
      const { themeStyle } = useComponentTheme(
        'select',
        computed11(() => props.themeOverrides)
      )
      const { form, formItem, validate: triggerValidate } = useFormItem()
      const { globalSize } = useConfig()
      const selectSize = computed11(
        () =>
          props.size ||
          (formItem == null ? void 0 : formItem.size) ||
          (form == null ? void 0 : form.size) ||
          globalSize.value ||
          'default'
      )
      const translatedLoadingText = computed11(() => props.loadingText || t('select.loading'))
      const translatedNoMatchText = computed11(() => props.noMatchText || t('select.noMatch'))
      const translatedNoDataText = computed11(() => props.noDataText || t('select.noData'))
      const wrapperRef = ref12()
      const inputRef = ref12()
      const visible = ref12(false)
      const focused = ref12(false)
      const hovering = ref12(false)
      const query = ref12('')
      const hoveredIndex = ref12(-1)
      const createdOptions = ref12([])
      const slotOptions = ref12([])
      const onOptionCreate = (option) => {
        const index = slotOptions.value.findIndex((o) => o.value === option.value)
        if (index > -1) {
          slotOptions.value.splice(index, 1, option)
        } else {
          slotOptions.value.push(option)
        }
      }
      const onOptionDestroy = (value) => {
        const index = slotOptions.value.findIndex((o) => o.value === value)
        if (index > -1) {
          slotOptions.value.splice(index, 1)
        }
      }
      const dropdownStyle = ref12({})
      const updateDropdownPosition = () => {
        if (!wrapperRef.value || !props.teleported) return
        const rect = wrapperRef.value.getBoundingClientRect()
        const styles = window.getComputedStyle(wrapperRef.value)
        const primary = styles.getPropertyValue('--yh-color-primary').trim()
        const primaryRgb = styles.getPropertyValue('--yh-color-primary-rgb').trim()
        const primaryLight9 = styles.getPropertyValue('--yh-color-primary-light-9').trim()
        dropdownStyle.value = __spreadProps(__spreadValues2({}, themeStyle.value), {
          position: 'fixed',
          top: `${rect.bottom + 4}px`,
          left: `${rect.left}px`,
          minWidth: props.fitInputWidth ? `${rect.width}px` : void 0,
          zIndex: '2000',
          '--yh-color-primary': primary,
          '--yh-color-primary-rgb': primaryRgb,
          '--yh-color-primary-light-9': primaryLight9
        })
      }
      watch4(visible, (val) => {
        if (val && props.teleported) {
          nextTick(updateDropdownPosition)
        }
      })
      onMounted3(() => {
        if (props.teleported) {
          window.addEventListener('scroll', updateDropdownPosition, true)
          window.addEventListener('resize', updateDropdownPosition)
        }
      })
      onBeforeUnmount2(() => {
        if (props.teleported) {
          window.removeEventListener('scroll', updateDropdownPosition, true)
          window.removeEventListener('resize', updateDropdownPosition)
        }
      })
      const allOptions = computed11(() => {
        return [...createdOptions.value, ...slotOptions.value, ...(props.options || [])]
      })
      const filteredOptions = computed11(() => {
        if (!props.filterable || !query.value) {
          return allOptions.value
        }
        const q = query.value.toLowerCase()
        return allOptions.value.filter((opt) => {
          const label = String(opt[props.labelKey || 'label'] || opt.label || '')
          return label.toLowerCase().includes(q)
        })
      })
      const scrollTop = ref12(0)
      const virtualConfig = computed11(() => {
        const itemHeight = props.itemHeight || 34
        const containerHeight = props.height || 274
        const overscan = 3
        const items = filteredOptions.value
        if (!props.virtualScroll || items.length === 0) {
          return {
            visibleItems: items,
            totalHeight: items.length * itemHeight,
            offsetY: 0,
            startIndex: 0,
            endIndex: items.length
          }
        }
        const visibleCount = Math.ceil(containerHeight / itemHeight)
        const start = Math.floor(scrollTop.value / itemHeight)
        const startIndex2 = Math.max(0, start - overscan)
        const endIndex = Math.min(items.length, start + visibleCount + overscan)
        return {
          visibleItems: items.slice(startIndex2, endIndex),
          totalHeight: items.length * itemHeight,
          offsetY: startIndex2 * itemHeight,
          startIndex: startIndex2,
          endIndex
        }
      })
      const handleVirtualScroll = (event) => {
        const target = event.target
        scrollTop.value = target.scrollTop
      }
      const displayOptions = computed11(() => {
        return props.virtualScroll ? virtualConfig.value.visibleItems : filteredOptions.value
      })
      const totalHeight = computed11(() => virtualConfig.value.totalHeight)
      const offsetY = computed11(() => virtualConfig.value.offsetY)
      const startIndex = computed11(() => virtualConfig.value.startIndex)
      const selectedLabels = computed11(() => {
        var _a2
        if (props.multiple) {
          const values = Array.isArray(props.modelValue) ? props.modelValue : []
          return values.map((v) => {
            const opt2 = allOptions.value.find((o) => o[props.valueKey || 'value'] === v)
            return opt2 ? opt2[props.labelKey || 'label'] || opt2.label : String(v)
          })
        }
        const opt = allOptions.value.find((o) => o[props.valueKey || 'value'] === props.modelValue)
        return opt
          ? opt[props.labelKey || 'label'] || opt.label
          : String((_a2 = props.modelValue) != null ? _a2 : '')
      })
      const displayTags = computed11(() => {
        if (!props.multiple || !Array.isArray(selectedLabels.value)) return []
        if (props.collapseTags) {
          return selectedLabels.value.slice(0, props.maxCollapseTags)
        }
        return selectedLabels.value
      })
      const collapsedCount = computed11(() => {
        if (!props.multiple || !props.collapseTags || !Array.isArray(selectedLabels.value)) return 0
        return Math.max(0, selectedLabels.value.length - (props.maxCollapseTags || 1))
      })
      const showClear = computed11(
        () =>
          props.clearable &&
          !props.disabled &&
          (props.multiple
            ? Array.isArray(props.modelValue) && props.modelValue.length > 0
            : props.modelValue !== void 0 && props.modelValue !== '') &&
          (focused.value || hovering.value)
      )
      const hasValue = computed11(() => {
        if (props.multiple) {
          return Array.isArray(props.modelValue) && props.modelValue.length > 0
        }
        return props.modelValue !== void 0 && props.modelValue !== ''
      })
      const wrapperClasses = computed11(() => [
        ns.b(),
        ns.m(selectSize.value),
        ns.is('disabled', props.disabled),
        ns.is('focused', focused.value || visible.value),
        ns.is('multiple', props.multiple)
      ])
      const isSelected = (value) => {
        if (props.multiple) {
          return Array.isArray(props.modelValue) && props.modelValue.includes(value)
        }
        return props.modelValue === value
      }
      const handleOptionSelect = (option, event) => {
        if (option.disabled) return
        if (event) {
          event.stopPropagation()
        }
        const value = option[props.valueKey || 'value']
        if (props.multiple) {
          const values = Array.isArray(props.modelValue) ? [...props.modelValue] : []
          const index = values.indexOf(value)
          if (index > -1) {
            values.splice(index, 1)
          } else {
            if (
              props.multipleLimit &&
              props.multipleLimit > 0 &&
              values.length >= props.multipleLimit
            ) {
              return
            }
            values.push(value)
          }
          emit('update:modelValue', values)
          emit('change', values)
        } else {
          emit('update:modelValue', value)
          emit('change', value)
          visible.value = false
        }
        if (props.validateEvent) {
          triggerValidate('change')
        }
        query.value = ''
      }
      const handleRemoveTag = (value, event) => {
        event.stopPropagation()
        if (props.disabled) return
        const values = Array.isArray(props.modelValue) ? [...props.modelValue] : []
        const index = values.indexOf(value)
        if (index > -1) {
          values.splice(index, 1)
          emit('update:modelValue', values)
          emit('change', values)
          emit('remove-tag', value)
          if (props.validateEvent) {
            triggerValidate('change')
          }
        }
      }
      const handleClear = (event) => {
        event.stopPropagation()
        const value = props.multiple ? [] : void 0
        emit('update:modelValue', value)
        emit('change', value)
        emit('clear')
        query.value = ''
        if (props.validateEvent) {
          triggerValidate('change')
        }
      }
      const toggleDropdown = () => {
        if (props.disabled) return
        visible.value = !visible.value
        emit('visible-change', visible.value)
        if (visible.value) {
          nextTick(() => {
            var _a2
            if (props.filterable) {
              ;(_a2 = inputRef.value) == null ? void 0 : _a2.focus()
            }
          })
        }
      }
      const handleInput = (event) => {
        const target = event.target
        query.value = target.value
        if (props.remote && props.remoteMethod) {
          props.remoteMethod(query.value)
        } else if (props.filterMethod) {
          props.filterMethod(query.value)
        }
      }
      const handleKeydown = (event) => {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault()
            if (!visible.value) {
              visible.value = true
              emit('visible-change', true)
            } else {
              hoveredIndex.value = Math.min(
                hoveredIndex.value + 1,
                filteredOptions.value.length - 1
              )
            }
            break
          case 'ArrowUp':
            event.preventDefault()
            hoveredIndex.value = Math.max(hoveredIndex.value - 1, 0)
            break
          case 'Enter':
            event.preventDefault()
            if (
              visible.value &&
              hoveredIndex.value >= 0 &&
              filteredOptions.value[hoveredIndex.value]
            ) {
              handleOptionSelect(filteredOptions.value[hoveredIndex.value])
            } else if (props.allowCreate && query.value) {
              const newOption = {
                value: query.value,
                label: query.value,
                [props.valueKey || 'value']: query.value,
                [props.labelKey || 'label']: query.value
              }
              createdOptions.value.push(newOption)
              handleOptionSelect(newOption)
            }
            break
          case 'Escape':
            visible.value = false
            emit('visible-change', false)
            break
          case 'Backspace':
            if (
              props.multiple &&
              !query.value &&
              Array.isArray(props.modelValue) &&
              props.modelValue.length > 0
            ) {
              const values = [...props.modelValue]
              const removed = values.pop()
              if (removed !== void 0) {
                emit('update:modelValue', values)
                emit('change', values)
                emit('remove-tag', removed)
              }
            }
            break
        }
      }
      const isClickingDropdown = ref12(false)
      const handleFocus = (event) => {
        focused.value = true
        emit('focus', event)
      }
      const handleBlur = (event) => {
        if (isClickingDropdown.value) {
          return
        }
        focused.value = false
        visible.value = false
        emit('visible-change', false)
        emit('blur', event)
        if (props.validateEvent) {
          triggerValidate('blur')
        }
      }
      const handleDropdownMousedown = (event) => {
        event.preventDefault()
        isClickingDropdown.value = true
      }
      const handleDropdownMouseup = () => {
        setTimeout(() => {
          isClickingDropdown.value = false
        }, 0)
      }
      const handleOptionClick = (option, event) => {
        event.stopPropagation()
        handleOptionSelect(option, event)
        if (!props.multiple) {
          nextTick(() => {
            var _a2
            ;(_a2 = inputRef.value) == null ? void 0 : _a2.focus()
          })
        }
      }
      const handleMouseEnter = () => {
        hovering.value = true
      }
      const handleMouseLeave = () => {
        hovering.value = false
      }
      const focus = () => {
        var _a2
        ;(_a2 = inputRef.value) == null ? void 0 : _a2.focus()
      }
      const blur = () => {
        var _a2
        ;(_a2 = inputRef.value) == null ? void 0 : _a2.blur()
      }
      provide2(SelectContextKey, {
        props,
        selectValue: computed11(() => props.modelValue),
        hoveredIndex,
        handleOptionSelect: (option, event) => handleOptionSelect(option, event),
        isSelected,
        onOptionCreate,
        onOptionDestroy
      })
      __expose({
        focus,
        blur,
        inputRef
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        inputId,
        themeStyle,
        form,
        formItem,
        triggerValidate,
        globalSize,
        selectSize,
        translatedLoadingText,
        translatedNoMatchText,
        translatedNoDataText,
        wrapperRef,
        inputRef,
        visible,
        focused,
        hovering,
        query,
        hoveredIndex,
        createdOptions,
        slotOptions,
        onOptionCreate,
        onOptionDestroy,
        dropdownStyle,
        updateDropdownPosition,
        allOptions,
        filteredOptions,
        scrollTop,
        virtualConfig,
        handleVirtualScroll,
        displayOptions,
        totalHeight,
        offsetY,
        startIndex,
        selectedLabels,
        displayTags,
        collapsedCount,
        showClear,
        hasValue,
        wrapperClasses,
        isSelected,
        handleOptionSelect,
        handleRemoveTag,
        handleClear,
        toggleDropdown,
        handleInput,
        handleKeydown,
        isClickingDropdown,
        handleFocus,
        handleBlur,
        handleDropdownMousedown,
        handleDropdownMouseup,
        handleOptionClick,
        handleMouseEnter,
        handleMouseLeave,
        focus,
        blur,
        computed: computed11,
        ref: ref12,
        nextTick,
        provide: provide2,
        watch: watch4,
        onMounted: onMounted3,
        onBeforeUnmount: onBeforeUnmount2,
        get useNamespace() {
          return useNamespace
        },
        get useFormItem() {
          return useFormItem
        },
        get useId() {
          return useId
        },
        get useLocale() {
          return useLocale
        },
        get useConfig() {
          return useConfig
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get SelectContextKey() {
          return SelectContextKey
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default2 = __sfc__

// public/codesandbox-runtime/components/select/src/option.js
import {
  createCommentVNode as _createCommentVNode2,
  renderSlot as _renderSlot2,
  vShow as _vShow2,
  createElementVNode as _createElementVNode2,
  withDirectives as _withDirectives2,
  Fragment as _Fragment2,
  openBlock as _openBlock2,
  createElementBlock as _createElementBlock2
} from 'vue'
import {
  computed as computed12,
  inject as inject7,
  onMounted as onMounted4,
  onBeforeUnmount as onBeforeUnmount3,
  useSlots
} from 'vue'
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock2(),
    _createElementBlock2(
      _Fragment2,
      null,
      [
        _createCommentVNode2(
          ' \u8FD9\u4E2A\u7EC4\u4EF6\u5728 Select \u5185\u90E8\u662F\u4EE5\u6570\u636E\u5F62\u5F0F\u5B58\u5728\u7684\uFF0C\u5176 template \u4EC5\u4F5C\u4E3A slot \u5185\u5BB9\u5BB9\u5668 '
        ),
        _withDirectives2(
          _createElementVNode2(
            'div',
            null,
            [_renderSlot2(_ctx.$slots, 'default')],
            512
            /* NEED_PATCH */
          ),
          [[_vShow2, false]]
        )
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    )
  )
}
var __sfc__2 = /* @__PURE__ */ Object.assign(
  {
    name: 'YhOption'
  },
  {
    __name: 'option',
    props: {
      value: { type: [String, Number, Boolean], required: true },
      label: { type: String, required: false },
      disabled: { type: Boolean, required: false, default: false }
    },
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const select = inject7(SelectContextKey, null)
      const slots = useSlots()
      const optionData = computed12(() => ({
        value: props.value,
        // 逻辑修正：优先使用 label 属性
        label: props.label || (slots.default ? ' ' : String(props.value)),
        disabled: props.disabled
      }))
      onMounted4(() => {
        if (select) {
          select.onOptionCreate(optionData.value)
        }
      })
      onBeforeUnmount3(() => {
        if (select) {
          select.onOptionDestroy(props.value)
        }
      })
      const __returned__ = {
        props,
        select,
        slots,
        optionData,
        computed: computed12,
        inject: inject7,
        onMounted: onMounted4,
        onBeforeUnmount: onBeforeUnmount3,
        useSlots,
        get SelectContextKey() {
          return SelectContextKey
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__2.render = render2
var stdin_default3 = __sfc__2

// public/codesandbox-runtime/components/select/index.js
var YhSelect = withInstall(stdin_default2)
var YhOption = withInstall(stdin_default3)

// public/codesandbox-runtime/components/cascader/src/cascader.js
import {
  createCommentVNode as _createCommentVNode4,
  renderList as _renderList3,
  Fragment as _Fragment4,
  openBlock as _openBlock4,
  createElementBlock as _createElementBlock4,
  toDisplayString as _toDisplayString3,
  normalizeClass as _normalizeClass3,
  createElementVNode as _createElementVNode4,
  withModifiers as _withModifiers3,
  renderSlot as _renderSlot4,
  createTextVNode as _createTextVNode3,
  withCtx as _withCtx3,
  createVNode as _createVNode2,
  vShow as _vShow3,
  normalizeStyle as _normalizeStyle3,
  withDirectives as _withDirectives3,
  Transition as _Transition2,
  Teleport as _Teleport2,
  createBlock as _createBlock3
} from 'vue'
import {
  computed as computed14,
  ref as ref14,
  watch as watch6,
  nextTick as nextTick2,
  provide as provide3,
  onMounted as onMounted5,
  onBeforeUnmount as onBeforeUnmount4
} from 'vue'

// public/codesandbox-runtime/components/cascader/src/cascader-meta.js
var CascaderContextKey = Symbol('CascaderContextKey')
var defaultCascaderConfig = {
  expandTrigger: 'click',
  multiple: false,
  checkStrictly: false,
  emitPath: true,
  lazy: false,
  lazyLoad: void 0,
  value: 'value',
  label: 'label',
  children: 'children',
  disabled: 'disabled',
  leaf: 'leaf'
}

// public/codesandbox-runtime/components/cascader/src/cascader-panel.js
import {
  renderList as _renderList2,
  Fragment as _Fragment3,
  openBlock as _openBlock3,
  createElementBlock as _createElementBlock3,
  createCommentVNode as _createCommentVNode3,
  createElementVNode as _createElementVNode3,
  normalizeClass as _normalizeClass2,
  withModifiers as _withModifiers2,
  renderSlot as _renderSlot3,
  toDisplayString as _toDisplayString2,
  createTextVNode as _createTextVNode2,
  normalizeStyle as _normalizeStyle2,
  withCtx as _withCtx2,
  createBlock as _createBlock2
} from 'vue'
import { computed as computed13, ref as ref13, watch as watch5, defineComponent, h } from 'vue'
var _hoisted_12 = ['onClick', 'onMouseenter']
var _hoisted_22 = ['onClick']
var _hoisted_32 = {
  key: 0,
  viewBox: '0 0 1024 1024',
  width: '1em',
  height: '1em'
}
function render3(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock3(),
    _createElementBlock3(
      'div',
      {
        class: _normalizeClass2($setup.ns.e('panel'))
      },
      [
        (_openBlock3(true),
        _createElementBlock3(
          _Fragment3,
          null,
          _renderList2($setup.menus, (colMenu, colLevel) => {
            return (
              _openBlock3(),
              _createBlock2(
                $setup['CascaderMenu'],
                {
                  key: colLevel,
                  menu: colMenu,
                  level: colLevel,
                  virtual: $props.virtual,
                  'item-height': $props.itemHeight
                },
                {
                  default: _withCtx2(({ option, level: menuLevel, startIndex, idx }) => [
                    (_openBlock3(),
                    _createElementBlock3(
                      'div',
                      {
                        key: option[$props.config.value],
                        class: _normalizeClass2([
                          $setup.ns.e('node'),
                          $setup.ns.is('expanded', $setup.isExpanded(option, menuLevel)),
                          $setup.ns.is(
                            'checked',
                            $props.isChecked($setup.getPath(option, menuLevel))
                          ),
                          $setup.ns.is('disabled', option[$props.config.disabled]),
                          $setup.ns.is('selectable', $setup.isSelectable(option))
                        ]),
                        style: _normalizeStyle2(
                          $props.virtual
                            ? {
                                position: 'absolute',
                                top: `${(startIndex + idx) * $props.itemHeight}px`,
                                left: 0,
                                right: 0,
                                height: `${$props.itemHeight}px`
                              }
                            : {}
                        ),
                        onMousedown:
                          _cache[0] || (_cache[0] = _withModifiers2(() => {}, ['prevent'])),
                        onClick: ($event) => $setup.handleClick(option, menuLevel, $event),
                        onMouseenter: ($event) => $setup.handleMouseEnter(option, menuLevel)
                      },
                      [
                        _createCommentVNode3(' \u591A\u9009\u590D\u9009\u6846 '),
                        $props.isMultiple && $setup.isSelectable(option)
                          ? (_openBlock3(),
                            _createElementBlock3(
                              'span',
                              {
                                key: 0,
                                class: _normalizeClass2($setup.ns.e('checkbox')),
                                onClick: _withModifiers2(
                                  ($event) => $setup.handleCheckboxClick(option, menuLevel, $event),
                                  ['stop']
                                )
                              },
                              [
                                _createElementVNode3(
                                  'span',
                                  {
                                    class: _normalizeClass2([
                                      $setup.ns.e('checkbox-inner'),
                                      $setup.ns.is(
                                        'checked',
                                        $props.isChecked($setup.getPath(option, menuLevel))
                                      )
                                    ])
                                  },
                                  [
                                    $props.isChecked($setup.getPath(option, menuLevel))
                                      ? (_openBlock3(),
                                        _createElementBlock3('svg', _hoisted_32, [
                                          ...(_cache[1] ||
                                            (_cache[1] = [
                                              _createElementVNode3(
                                                'path',
                                                {
                                                  fill: 'currentColor',
                                                  d: 'M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z'
                                                },
                                                null,
                                                -1
                                                /* CACHED */
                                              )
                                            ]))
                                        ]))
                                      : _createCommentVNode3('v-if', true)
                                  ],
                                  2
                                  /* CLASS */
                                )
                              ],
                              10,
                              _hoisted_22
                            ))
                          : _createCommentVNode3('v-if', true),
                        _createCommentVNode3(' \u6807\u7B7E\u5185\u5BB9 '),
                        _createElementVNode3(
                          'span',
                          {
                            class: _normalizeClass2($setup.ns.e('label'))
                          },
                          [
                            _renderSlot3(
                              _ctx.$slots,
                              'default',
                              {
                                node: option,
                                data: option
                              },
                              () => [
                                _createTextVNode2(
                                  _toDisplayString2(option[$props.config.label]),
                                  1
                                  /* TEXT */
                                )
                              ]
                            )
                          ],
                          2
                          /* CLASS */
                        ),
                        _createCommentVNode3(' \u5C55\u5F00\u56FE\u6807 '),
                        $setup.hasChildren(option)
                          ? (_openBlock3(),
                            _createElementBlock3(
                              'span',
                              {
                                key: 1,
                                class: _normalizeClass2($setup.ns.e('expand-icon'))
                              },
                              [
                                ...(_cache[2] ||
                                  (_cache[2] = [
                                    _createElementVNode3(
                                      'svg',
                                      {
                                        viewBox: '0 0 1024 1024',
                                        width: '1em',
                                        height: '1em'
                                      },
                                      [
                                        _createElementVNode3('path', {
                                          fill: 'currentColor',
                                          d: 'M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z'
                                        })
                                      ],
                                      -1
                                      /* CACHED */
                                    )
                                  ]))
                              ],
                              2
                              /* CLASS */
                            ))
                          : _createCommentVNode3('v-if', true)
                      ],
                      46,
                      _hoisted_12
                    ))
                  ]),
                  _: 3
                  /* FORWARDED */
                },
                8,
                ['menu', 'level', 'virtual', 'item-height']
              )
            )
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      2
      /* CLASS */
    )
  )
}
var __sfc__3 = /* @__PURE__ */ Object.assign(
  {
    name: 'YhCascaderPanel'
  },
  {
    __name: 'cascader-panel',
    props: {
      options: { type: Array, required: false, default: () => [] },
      expandedPath: { type: Array, required: true, default: () => [] },
      config: { type: Object, required: true },
      isMultiple: { type: Boolean, required: true, default: false },
      isChecked: { type: Function, required: true },
      virtual: { type: Boolean, required: false, default: false },
      itemHeight: { type: Number, required: false, default: 34 }
    },
    emits: ['expand', 'check'],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('cascader')
      const { t } = useLocale()
      const CascaderMenu = defineComponent({
        name: 'CascaderMenu',
        props: {
          menu: { type: Array, required: true },
          level: { type: Number, required: true },
          virtual: Boolean,
          itemHeight: { type: Number, default: 34 }
        },
        setup(menuProps, { slots }) {
          const scrollTop = ref13(0)
          const visibleInfo = computed13(() => {
            if (!menuProps.virtual) return { options: menuProps.menu, startIndex: 0 }
            const containerHeight = 274
            const visibleCount = Math.ceil(containerHeight / menuProps.itemHeight) + 2
            const st = scrollTop.value
            const maxStartIndex = Math.max(0, menuProps.menu.length - visibleCount)
            const startIndex = Math.min(
              Math.max(0, Math.floor(st / menuProps.itemHeight) - 1),
              maxStartIndex
            )
            return {
              options: menuProps.menu.slice(startIndex, startIndex + visibleCount + 2),
              startIndex
            }
          })
          const handleScroll = (e) => {
            scrollTop.value = e.target.scrollTop
          }
          watch5(
            () => menuProps.menu,
            () => {
              scrollTop.value = 0
            }
          )
          return () =>
            h(
              'div',
              {
                class: [ns.e('menu'), menuProps.virtual && ns.is('virtual')],
                onScroll: handleScroll
              },
              [
                menuProps.virtual
                  ? h(
                      'div',
                      {
                        style: {
                          height: `${menuProps.menu.length * menuProps.itemHeight}px`,
                          position: 'relative'
                        }
                      },
                      visibleInfo.value.options.map((option, idx) => {
                        var _a2
                        return (_a2 = slots.default) == null
                          ? void 0
                          : _a2.call(slots, {
                              option,
                              level: menuProps.level,
                              startIndex: visibleInfo.value.startIndex,
                              idx
                            })
                      })
                    )
                  : menuProps.menu.map((option) => {
                      var _a2
                      return (_a2 = slots.default) == null
                        ? void 0
                        : _a2.call(slots, {
                            option,
                            level: menuProps.level
                          })
                    }),
                // 空状态处理
                menuProps.menu.length === 0
                  ? h('div', { class: ns.e('empty') }, t('cascader.noData'))
                  : null
              ]
            )
        }
      })
      const menus = computed13(() => {
        const result = [props.options || []]
        let currentOptions = props.options || []
        for (const value of props.expandedPath) {
          const option = currentOptions.find((o) => o[props.config.value] === value)
          const children = option ? option[props.config.children] : void 0
          if (option && children && children.length) {
            result.push(children)
            currentOptions = children
          } else {
            break
          }
        }
        return result
      })
      const isExpanded = (option, level) => props.expandedPath[level] === option[props.config.value]
      const hasChildren = (option) => {
        const children = option[props.config.children]
        return !!(children && children.length > 0)
      }
      const isLeaf = (option) => {
        const leaf = option[props.config.leaf]
        if (leaf !== void 0) return leaf
        return !hasChildren(option)
      }
      const isSelectable = (option) => (props.config.checkStrictly ? true : isLeaf(option))
      const getPath = (option, level) => [
        ...props.expandedPath.slice(0, level),
        option[props.config.value]
      ]
      const handleCheckboxClick = (option, level, event) => {
        event.stopPropagation()
        if (option[props.config.disabled] || !isSelectable(option)) return
        emit('check', option, getPath(option, level))
      }
      const handleClick = (option, level, event) => {
        event.stopPropagation()
        if (option[props.config.disabled]) return
        const path = getPath(option, level)
        if (hasChildren(option)) emit('expand', option, level)
        if (!props.isMultiple && isSelectable(option)) {
          emit('check', option, path)
        } else if (props.isMultiple && props.config.checkStrictly && !hasChildren(option)) {
          emit('check', option, path)
        }
      }
      const handleMouseEnter = (option, level) => {
        if (props.config.expandTrigger !== 'hover' || option[props.config.disabled]) return
        if (hasChildren(option)) emit('expand', option, level)
      }
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        CascaderMenu,
        menus,
        isExpanded,
        hasChildren,
        isLeaf,
        isSelectable,
        getPath,
        handleCheckboxClick,
        handleClick,
        handleMouseEnter,
        computed: computed13,
        ref: ref13,
        watch: watch5,
        defineComponent,
        h,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__3.render = render3
var stdin_default4 = __sfc__3

// public/codesandbox-runtime/components/cascader/src/cascader.js
var __defProp3 = Object.defineProperty
var __defProps2 = Object.defineProperties
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors
var __getOwnPropSymbols3 = Object.getOwnPropertySymbols
var __hasOwnProp3 = Object.prototype.hasOwnProperty
var __propIsEnum3 = Object.prototype.propertyIsEnumerable
var __defNormalProp3 = (obj, key, value) =>
  key in obj
    ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp3.call(b, prop)) __defNormalProp3(a, prop, b[prop])
  if (__getOwnPropSymbols3)
    for (var prop of __getOwnPropSymbols3(b)) {
      if (__propIsEnum3.call(b, prop)) __defNormalProp3(a, prop, b[prop])
    }
  return a
}
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b))
var _hoisted_13 = ['onClick']
var _hoisted_23 = ['id', 'value', 'placeholder', 'disabled', 'readonly', 'aria-expanded']
var _hoisted_33 = ['onClick']
function render4(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock4(),
    _createElementBlock4(
      'div',
      {
        ref: 'wrapperRef',
        class: _normalizeClass3($setup.wrapperClasses),
        style: _normalizeStyle3($setup.themeStyle),
        onMouseenter: $setup.handleMouseEnter,
        onMouseleave: $setup.handleMouseLeave,
        onClick: $setup.toggleDropdown
      },
      [
        _createCommentVNode4(' \u8F93\u5165\u533A\u57DF '),
        _createElementVNode4(
          'div',
          {
            class: _normalizeClass3($setup.ns.e('wrapper'))
          },
          [
            _createCommentVNode4(' \u591A\u9009\u6807\u7B7E '),
            $setup.isMultiple
              ? (_openBlock4(),
                _createElementBlock4(
                  _Fragment4,
                  { key: 0 },
                  [
                    (_openBlock4(true),
                    _createElementBlock4(
                      _Fragment4,
                      null,
                      _renderList3($setup.displayTags, (tag) => {
                        return (
                          _openBlock4(),
                          _createElementBlock4(
                            'span',
                            {
                              key: tag.path.join(','),
                              class: _normalizeClass3([
                                $setup.ns.e('tag'),
                                $props.tagType ? `yh-tag--${$props.tagType}` : ''
                              ])
                            },
                            [
                              _createElementVNode4(
                                'span',
                                {
                                  class: _normalizeClass3($setup.ns.e('tag-text'))
                                },
                                _toDisplayString3(tag.text),
                                3
                                /* TEXT, CLASS */
                              ),
                              _createElementVNode4(
                                'span',
                                {
                                  class: _normalizeClass3($setup.ns.e('tag-close')),
                                  onClick: ($event) => $setup.handleRemoveTag(tag.path, $event)
                                },
                                [
                                  ...(_cache[0] ||
                                    (_cache[0] = [
                                      _createElementVNode4(
                                        'svg',
                                        {
                                          viewBox: '0 0 1024 1024',
                                          width: '1em',
                                          height: '1em'
                                        },
                                        [
                                          _createElementVNode4('path', {
                                            fill: 'currentColor',
                                            d: 'M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z'
                                          })
                                        ],
                                        -1
                                        /* CACHED */
                                      )
                                    ]))
                                ],
                                10,
                                _hoisted_13
                              )
                            ],
                            2
                            /* CLASS */
                          )
                        )
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    $setup.collapsedCount > 0
                      ? (_openBlock4(),
                        _createElementBlock4(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass3($setup.ns.e('tag'))
                          },
                          ' +' + _toDisplayString3($setup.collapsedCount),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode4('v-if', true)
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              : _createCommentVNode4('v-if', true),
            _createCommentVNode4(' \u8F93\u5165\u6846 '),
            _createElementVNode4(
              'input',
              {
                ref: 'inputRef',
                id: $setup.inputId,
                class: _normalizeClass3($setup.ns.e('inner')),
                value: $props.filterable ? $setup.query : '',
                placeholder: $setup.hasValue
                  ? ''
                  : $props.placeholder || $setup.t('cascader.placeholder'),
                disabled: $props.disabled,
                readonly: !$props.filterable,
                autocomplete: 'off',
                role: 'combobox',
                'aria-expanded': $setup.visible,
                onInput: $setup.handleInput,
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur
              },
              null,
              42,
              _hoisted_23
            ),
            _createCommentVNode4(' \u5355\u9009\u663E\u793A\u503C '),
            !$setup.isMultiple && $setup.hasValue && !$setup.query
              ? (_openBlock4(),
                _createElementBlock4(
                  'span',
                  {
                    key: 1,
                    class: _normalizeClass3($setup.ns.e('selected-value'))
                  },
                  _toDisplayString3($setup.presentText),
                  3
                  /* TEXT, CLASS */
                ))
              : _createCommentVNode4('v-if', true),
            _createCommentVNode4(' \u540E\u7F00\u56FE\u6807 '),
            _createElementVNode4(
              'span',
              {
                class: _normalizeClass3($setup.ns.e('suffix'))
              },
              [
                _createCommentVNode4(' \u6E05\u7A7A\u6309\u94AE '),
                $setup.showClear
                  ? (_openBlock4(),
                    _createElementBlock4(
                      'span',
                      {
                        key: 0,
                        class: _normalizeClass3([$setup.ns.e('icon'), $setup.ns.e('clear')]),
                        onClick: _withModifiers3($setup.handleClear, ['stop'])
                      },
                      [
                        ...(_cache[1] ||
                          (_cache[1] = [
                            _createElementVNode4(
                              'svg',
                              {
                                viewBox: '0 0 1024 1024',
                                width: '1em',
                                height: '1em'
                              },
                              [
                                _createElementVNode4('path', {
                                  fill: 'currentColor',
                                  d: 'M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z'
                                })
                              ],
                              -1
                              /* CACHED */
                            )
                          ]))
                      ],
                      2
                      /* CLASS */
                    ))
                  : _createCommentVNode4('v-if', true),
                _createCommentVNode4(' \u7BAD\u5934\u56FE\u6807 '),
                _createElementVNode4(
                  'span',
                  {
                    class: _normalizeClass3([
                      $setup.ns.e('icon'),
                      $setup.ns.e('arrow'),
                      {
                        'is-reverse': $setup.visible
                      }
                    ])
                  },
                  [
                    ...(_cache[2] ||
                      (_cache[2] = [
                        _createElementVNode4(
                          'svg',
                          {
                            viewBox: '0 0 1024 1024',
                            width: '1em',
                            height: '1em'
                          },
                          [
                            _createElementVNode4('path', {
                              fill: 'currentColor',
                              d: 'M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z'
                            })
                          ],
                          -1
                          /* CACHED */
                        )
                      ]))
                  ],
                  2
                  /* CLASS */
                )
              ],
              2
              /* CLASS */
            )
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode4(' \u4E0B\u62C9\u6846 '),
        (_openBlock4(),
        _createBlock3(
          _Teleport2,
          {
            to: 'body',
            disabled: !$props.teleported
          },
          [
            _createVNode2(
              _Transition2,
              {
                name: $setup.ns.b('dropdown'),
                persisted: ''
              },
              {
                default: _withCtx3(() => [
                  _withDirectives3(
                    _createElementVNode4(
                      'div',
                      {
                        ref: 'dropdownRef',
                        class: _normalizeClass3([$setup.ns.e('dropdown'), $props.popperClass]),
                        style: _normalizeStyle3($props.teleported ? $setup.dropdownStyle : {}),
                        onMousedown: $setup.handleDropdownMousedown,
                        onMouseup: $setup.handleDropdownMouseup
                      },
                      [
                        _createCommentVNode4(' \u8FC7\u6EE4\u5EFA\u8BAE '),
                        $props.filterable && $setup.query && $setup.filteredSuggestions.length > 0
                          ? (_openBlock4(),
                            _createElementBlock4(
                              'div',
                              {
                                key: 0,
                                class: _normalizeClass3($setup.ns.e('suggestions'))
                              },
                              [
                                (_openBlock4(true),
                                _createElementBlock4(
                                  _Fragment4,
                                  null,
                                  _renderList3($setup.filteredSuggestions, (suggestion) => {
                                    return (
                                      _openBlock4(),
                                      _createElementBlock4(
                                        'div',
                                        {
                                          key: suggestion.path.join(','),
                                          class: _normalizeClass3([
                                            $setup.ns.e('suggestion'),
                                            $setup.ns.is(
                                              'checked',
                                              $setup.isChecked(suggestion.path)
                                            )
                                          ]),
                                          onClick: _withModifiers3(
                                            ($event) => $setup.handleSelectSuggestion(suggestion),
                                            ['stop']
                                          )
                                        },
                                        _toDisplayString3(suggestion.labels.join($props.separator)),
                                        11,
                                        _hoisted_33
                                      )
                                    )
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ],
                              2
                              /* CLASS */
                            ))
                          : $props.filterable &&
                              $setup.query &&
                              $setup.filteredSuggestions.length === 0
                            ? (_openBlock4(),
                              _createElementBlock4(
                                _Fragment4,
                                { key: 1 },
                                [
                                  _createCommentVNode4(' \u65E0\u5339\u914D\u6570\u636E '),
                                  _createElementVNode4(
                                    'div',
                                    {
                                      class: _normalizeClass3($setup.ns.e('empty'))
                                    },
                                    [
                                      _renderSlot4(_ctx.$slots, 'empty', {}, () => [
                                        _createTextVNode3(
                                          _toDisplayString3($setup.t('cascader.noMatch')),
                                          1
                                          /* TEXT */
                                        )
                                      ])
                                    ],
                                    2
                                    /* CLASS */
                                  )
                                ],
                                2112
                                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                              ))
                            : (_openBlock4(),
                              _createElementBlock4(
                                _Fragment4,
                                { key: 2 },
                                [
                                  _createCommentVNode4(' \u7EA7\u8054\u9762\u677F '),
                                  _createVNode2(
                                    $setup['CascaderPanel'],
                                    {
                                      options: $props.options,
                                      'expanded-path': $setup.expandedPath,
                                      config: $setup.config,
                                      'is-multiple': $setup.isMultiple,
                                      virtual: $props.virtual,
                                      'item-height': $props.virtualItemHeight,
                                      onExpand: $setup.handleExpand,
                                      onCheck: $setup.handleCheck,
                                      'is-checked': $setup.isChecked
                                    },
                                    {
                                      default: _withCtx3(({ node, data }) => [
                                        _renderSlot4(_ctx.$slots, 'default', {
                                          node,
                                          data
                                        })
                                      ]),
                                      _: 3
                                      /* FORWARDED */
                                    },
                                    8,
                                    [
                                      'options',
                                      'expanded-path',
                                      'config',
                                      'is-multiple',
                                      'virtual',
                                      'item-height'
                                    ]
                                  )
                                ],
                                2112
                                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                              ))
                      ],
                      38
                      /* CLASS, STYLE, NEED_HYDRATION */
                    ),
                    [[_vShow3, $setup.visible]]
                  )
                ]),
                _: 3
                /* FORWARDED */
              },
              8,
              ['name']
            )
          ],
          8,
          ['disabled']
        ))
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
var __sfc__4 = /* @__PURE__ */ Object.assign(
  {
    name: 'YhCascader'
  },
  {
    __name: 'cascader',
    props: {
      modelValue: { type: [String, Number, Array], required: false },
      options: { type: Array, required: false },
      placeholder: { type: String, required: false },
      disabled: { type: Boolean, required: false, default: false },
      clearable: { type: Boolean, required: false, default: false },
      size: { type: String, required: false, default: void 0 },
      filterable: { type: Boolean, required: false, default: false },
      filterMethod: { type: Function, required: false },
      separator: { type: String, required: false, default: ' / ' },
      showAllLevels: { type: Boolean, required: false, default: true },
      collapseTags: { type: Boolean, required: false, default: false },
      collapseTagsTooltip: { type: Boolean, required: false, default: false },
      maxCollapseTags: { type: Number, required: false, default: 1 },
      multiple: { type: Boolean, required: false, default: false },
      checkStrictly: { type: Boolean, required: false, default: false },
      expandTrigger: { type: String, required: false, default: void 0 },
      emitPath: { type: Boolean, required: false, default: true },
      virtual: { type: Boolean, required: false, default: false },
      virtualItemHeight: { type: Number, required: false, default: 34 },
      props: { type: Object, required: false },
      popperClass: { type: String, required: false },
      teleported: { type: Boolean, required: false, default: true },
      tagType: { type: String, required: false, default: '' },
      validateEvent: { type: Boolean, required: false, default: true },
      themeOverrides: { type: null, required: false }
    },
    emits: [
      'update:modelValue',
      'change',
      'focus',
      'blur',
      'clear',
      'expand-change',
      'visible-change'
    ],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('cascader')
      const { t } = useLocale()
      const inputId = useId()
      const { themeStyle } = useComponentTheme(
        'cascader',
        computed14(() => props.themeOverrides)
      )
      const { form, formItem, validate: triggerValidate } = useFormItem()
      const { globalSize } = useConfig()
      const cascaderSize = computed14(
        () =>
          props.size ||
          (formItem == null ? void 0 : formItem.size) ||
          (form == null ? void 0 : form.size) ||
          globalSize.value ||
          'default'
      )
      const config = computed14(() => {
        var _a2, _b, _c, _d, _e, _f
        return __spreadProps2(
          __spreadValues3(__spreadValues3({}, defaultCascaderConfig), props.props),
          {
            // 直接属性覆盖
            multiple:
              props.multiple || ((_a2 = props.props) == null ? void 0 : _a2.multiple) || false,
            checkStrictly:
              props.checkStrictly ||
              ((_b = props.props) == null ? void 0 : _b.checkStrictly) ||
              false,
            expandTrigger:
              props.expandTrigger ||
              ((_c = props.props) == null ? void 0 : _c.expandTrigger) ||
              'click',
            emitPath:
              (_f =
                (_e = props.emitPath) != null
                  ? _e
                  : (_d = props.props) == null
                    ? void 0
                    : _d.emitPath) != null
                ? _f
                : true
          }
        )
      })
      const wrapperRef = ref14()
      const inputRef = ref14()
      const dropdownRef = ref14()
      const visible = ref14(false)
      const focused = ref14(false)
      const hovering = ref14(false)
      const query = ref14('')
      const expandedPath = ref14([])
      const isClickingDropdown = ref14(false)
      const dropdownStyle = ref14({})
      const updateDropdownPosition = () => {
        if (!wrapperRef.value || !props.teleported) return
        const rect = wrapperRef.value.getBoundingClientRect()
        const styles = window.getComputedStyle(wrapperRef.value)
        const primary = styles.getPropertyValue('--yh-color-primary').trim()
        const primaryRgb = styles.getPropertyValue('--yh-color-primary-rgb').trim()
        const primaryLight9 = styles.getPropertyValue('--yh-color-primary-light-9').trim()
        dropdownStyle.value = {
          position: 'fixed',
          top: `${rect.bottom + 4}px`,
          left: `${rect.left}px`,
          minWidth: `${rect.width}px`,
          zIndex: '2000',
          '--yh-color-primary': primary,
          '--yh-color-primary-rgb': primaryRgb,
          '--yh-color-primary-light-9': primaryLight9
        }
      }
      watch6(visible, (val) => {
        if (val && props.teleported) {
          nextTick2(updateDropdownPosition)
        }
      })
      onMounted5(() => {
        if (props.teleported) {
          window.addEventListener('scroll', updateDropdownPosition, true)
          window.addEventListener('resize', updateDropdownPosition)
        }
      })
      onBeforeUnmount4(() => {
        if (props.teleported) {
          window.removeEventListener('scroll', updateDropdownPosition, true)
          window.removeEventListener('resize', updateDropdownPosition)
        }
      })
      const isMultiple = computed14(() => config.value.multiple)
      const getPathLabels = (path) => {
        const labels = []
        let currentOptions = props.options || []
        for (const value of path) {
          const valKey = config.value.value
          const labelKey = config.value.label
          const childrenKey = config.value.children
          const option = currentOptions.find((o) => o[valKey] === value)
          if (option) {
            labels.push(String(option[labelKey] || ''))
            currentOptions = option[childrenKey] || []
          }
        }
        return labels
      }
      const findPathByValue = (targetValue, options) => {
        const valKey = config.value.value
        const childrenKey = config.value.children
        for (const option of options) {
          const val = option[valKey]
          const children = option[childrenKey]
          if (val === targetValue) return [val]
          if (children && children.length > 0) {
            const path = findPathByValue(targetValue, children)
            if (path) return [val, ...path]
          }
        }
        return null
      }
      const presentText = computed14(() => {
        if (isMultiple.value) return ''
        const value = props.modelValue
        if (value === void 0 || value === null) return ''
        let path = []
        if (Array.isArray(value)) {
          path = value
        } else {
          path = findPathByValue(value, props.options || []) || []
        }
        if (path.length === 0) return ''
        const labels = getPathLabels(path)
        return props.showAllLevels ? labels.join(props.separator) : labels[labels.length - 1]
      })
      const presentTags = computed14(() => {
        if (!isMultiple.value) return []
        const values = props.modelValue
        if (!Array.isArray(values) || values.length === 0) return []
        return values.map((v) => {
          let path = []
          if (Array.isArray(v)) {
            path = v
          } else {
            path = findPathByValue(v, props.options || []) || []
          }
          const labels = getPathLabels(path)
          return {
            path,
            text: props.showAllLevels ? labels.join(props.separator) : labels[labels.length - 1]
          }
        })
      })
      const displayTags = computed14(() => {
        if (props.collapseTags) {
          return presentTags.value.slice(0, props.maxCollapseTags)
        }
        return presentTags.value
      })
      const collapsedCount = computed14(() => {
        if (!isMultiple.value || !props.collapseTags) return 0
        return Math.max(0, presentTags.value.length - props.maxCollapseTags)
      })
      const showClear = computed14(() => {
        if (!props.clearable || props.disabled || !hovering.value) return false
        if (isMultiple.value) {
          return Array.isArray(props.modelValue) && props.modelValue.length > 0
        } else {
          return (
            props.modelValue !== void 0 &&
            props.modelValue !== null &&
            (Array.isArray(props.modelValue) ? props.modelValue.length > 0 : true)
          )
        }
      })
      const hasValue = computed14(() => {
        if (isMultiple.value) {
          return Array.isArray(props.modelValue) && props.modelValue.length > 0
        }
        return (
          props.modelValue !== void 0 &&
          props.modelValue !== null &&
          (Array.isArray(props.modelValue) ? props.modelValue.length > 0 : true)
        )
      })
      const filteredSuggestions = computed14(() => {
        if (!props.filterable || !query.value) return []
        const results = []
        const keyword = query.value.toLowerCase()
        const traverse = (options, path, labels) => {
          const valKey = config.value.value
          const labelKey = config.value.label
          const childrenKey = config.value.children
          for (const option of options) {
            const value = option[valKey]
            const label = String(option[labelKey] || '')
            const children = option[childrenKey]
            const currentPath = [...path, value]
            const currentLabels = [...labels, label]
            const fullPathLabel = currentLabels.join(props.separator || ' / ').toLowerCase()
            const matches = props.filterMethod
              ? props.filterMethod(option, query.value)
              : fullPathLabel.includes(keyword)
            const isLeafNode = !children || children.length === 0
            if (matches && (isLeafNode || config.value.checkStrictly)) {
              results.push({ path: currentPath, labels: currentLabels })
            }
            if (children && children.length > 0) {
              traverse(children, currentPath, currentLabels)
            }
          }
        }
        traverse(props.options || [], [], [])
        return results
      })
      const wrapperClasses = computed14(() => [
        ns.b(),
        ns.m(cascaderSize.value),
        ns.is('disabled', props.disabled),
        ns.is('focused', focused.value || visible.value)
      ])
      const handleExpand = (option, level) => {
        const value = option[config.value.value]
        expandedPath.value = [...expandedPath.value.slice(0, level), value]
        emit('expand-change', expandedPath.value)
      }
      const handleCheck = (option, path) => {
        const disabledKey = config.value.disabled
        if (option[disabledKey]) return
        if (isMultiple.value) {
          const values = (props.modelValue || []).slice()
          const pathStr = path.join(',')
          const index = values.findIndex((v) => v.join(',') === pathStr)
          if (index > -1) {
            values.splice(index, 1)
          } else {
            values.push(path)
          }
          emit('update:modelValue', values)
          emit('change', values)
        } else {
          const value = config.value.emitPath ? path : path[path.length - 1]
          emit('update:modelValue', value)
          emit('change', value)
          visible.value = false
        }
        if (props.validateEvent) {
          triggerValidate('change')
        }
        query.value = ''
      }
      const isChecked = (path) => {
        if (isMultiple.value) {
          const values = props.modelValue
          if (!values || !Array.isArray(values)) return false
          const pathStr = path.join(',')
          return values.some((v) => Array.isArray(v) && v.join(',') === pathStr)
        }
        const value = props.modelValue
        if (value === void 0 || value === null) return false
        if (config.value.emitPath) {
          if (!Array.isArray(value)) return false
          return value.join(',') === path.join(',')
        } else {
          return value === path[path.length - 1]
        }
      }
      const handleRemoveTag = (path, event) => {
        event.stopPropagation()
        if (props.disabled) return
        const values = (props.modelValue || []).slice()
        const pathStr = path.join(',')
        const index = values.findIndex((v) => v.join(',') === pathStr)
        if (index > -1) {
          values.splice(index, 1)
          emit('update:modelValue', values)
          emit('change', values)
          if (props.validateEvent) {
            triggerValidate('change')
          }
        }
      }
      const handleClear = (event) => {
        event.stopPropagation()
        const value = isMultiple.value || config.value.emitPath ? [] : void 0
        emit('update:modelValue', value)
        emit('change', value)
        emit('clear')
        query.value = ''
        expandedPath.value = []
        if (props.validateEvent) {
          triggerValidate('change')
        }
      }
      const toggleDropdown = () => {
        if (props.disabled) return
        visible.value = !visible.value
        emit('visible-change', visible.value)
        if (visible.value) {
          nextTick2(() => {
            var _a2
            if (props.filterable) {
              ;(_a2 = inputRef.value) == null ? void 0 : _a2.focus()
            }
          })
        }
      }
      const handleSelectSuggestion = (suggestion) => {
        if (isMultiple.value) {
          const values = (props.modelValue || []).slice()
          const pathStr = suggestion.path.join(',')
          const index = values.findIndex((v) => v.join(',') === pathStr)
          if (index === -1) {
            values.push(suggestion.path)
            emit('update:modelValue', values)
            emit('change', values)
          }
        } else {
          const value = config.value.emitPath
            ? suggestion.path
            : suggestion.path[suggestion.path.length - 1]
          emit('update:modelValue', value)
          emit('change', value)
          visible.value = false
        }
        query.value = ''
        if (props.validateEvent) {
          triggerValidate('change')
        }
      }
      const handleInput = (event) => {
        const target = event.target
        query.value = target.value
        if (!visible.value && query.value) {
          visible.value = true
          emit('visible-change', true)
        }
      }
      const handleFocus = (event) => {
        focused.value = true
        emit('focus', event)
      }
      const handleBlur = (event) => {
        if (isClickingDropdown.value) {
          return
        }
        focused.value = false
        visible.value = false
        emit('blur', event)
        emit('visible-change', false)
        if (props.validateEvent) {
          triggerValidate('blur')
        }
      }
      const handleDropdownMousedown = (event) => {
        event.preventDefault()
        isClickingDropdown.value = true
      }
      const handleDropdownMouseup = () => {
        setTimeout(() => {
          isClickingDropdown.value = false
        }, 0)
      }
      const handleMouseEnter = () => {
        hovering.value = true
      }
      const handleMouseLeave = () => {
        hovering.value = false
      }
      const getCheckedNodes = (leafOnly = false) => {
        var _a2, _b
        const nodes = []
        const findNode = (options, path, index) => {
          if (index >= path.length) return null
          const valKey = config.value.value
          const childrenKey = config.value.children
          const option = options.find((o) => o[valKey] === path[index])
          if (!option) return null
          if (index === path.length - 1) return option
          return findNode(option[childrenKey] || [], path, index + 1)
        }
        if (isMultiple.value) {
          const values = props.modelValue
          if (values && Array.isArray(values)) {
            for (const path of values) {
              const node = findNode(props.options || [], path, 0)
              if (
                node &&
                (!leafOnly || !((_a2 = node[config.value.children]) == null ? void 0 : _a2.length))
              ) {
                nodes.push(node)
              }
            }
          }
        } else {
          const value = props.modelValue
          if (value) {
            const path = Array.isArray(value) ? value : findPathByValue(value, props.options || [])
            if (path) {
              const node = findNode(props.options || [], path, 0)
              if (
                node &&
                (!leafOnly || !((_b = node[config.value.children]) == null ? void 0 : _b.length))
              ) {
                nodes.push(node)
              }
            }
          }
        }
        return nodes
      }
      const focus = () => {
        var _a2
        ;(_a2 = inputRef.value) == null ? void 0 : _a2.focus()
      }
      const blur = () => {
        var _a2
        ;(_a2 = inputRef.value) == null ? void 0 : _a2.blur()
      }
      provide3(CascaderContextKey, {
        props,
        config: computed14(() => config.value),
        expandedPath: computed14(() => expandedPath.value),
        checkedValue: computed14(() => props.modelValue),
        handleExpand,
        handleCheck,
        isChecked
      })
      __expose({
        focus,
        blur,
        getCheckedNodes,
        inputRef
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        inputId,
        themeStyle,
        form,
        formItem,
        triggerValidate,
        globalSize,
        cascaderSize,
        config,
        wrapperRef,
        inputRef,
        dropdownRef,
        visible,
        focused,
        hovering,
        query,
        expandedPath,
        isClickingDropdown,
        dropdownStyle,
        updateDropdownPosition,
        isMultiple,
        getPathLabels,
        findPathByValue,
        presentText,
        presentTags,
        displayTags,
        collapsedCount,
        showClear,
        hasValue,
        filteredSuggestions,
        wrapperClasses,
        handleExpand,
        handleCheck,
        isChecked,
        handleRemoveTag,
        handleClear,
        toggleDropdown,
        handleSelectSuggestion,
        handleInput,
        handleFocus,
        handleBlur,
        handleDropdownMousedown,
        handleDropdownMouseup,
        handleMouseEnter,
        handleMouseLeave,
        getCheckedNodes,
        focus,
        blur,
        computed: computed14,
        ref: ref14,
        watch: watch6,
        nextTick: nextTick2,
        provide: provide3,
        onMounted: onMounted5,
        onBeforeUnmount: onBeforeUnmount4,
        get useNamespace() {
          return useNamespace
        },
        get useFormItem() {
          return useFormItem
        },
        get useId() {
          return useId
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get useConfig() {
          return useConfig
        },
        get CascaderContextKey() {
          return CascaderContextKey
        },
        get defaultCascaderConfig() {
          return defaultCascaderConfig
        },
        CascaderPanel: stdin_default4
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__4.render = render4
var stdin_default5 = __sfc__4

// public/codesandbox-runtime/components/cascader/index.js
var YhCascader = withInstall(stdin_default5)
var YhCascaderPanel = withInstall(stdin_default4)

// public/codesandbox-runtime/components/smart-address/src/smart-address.js
var __defProp4 = Object.defineProperty
var __getOwnPropSymbols4 = Object.getOwnPropertySymbols
var __hasOwnProp4 = Object.prototype.hasOwnProperty
var __propIsEnum4 = Object.prototype.propertyIsEnumerable
var __defNormalProp4 = (obj, key, value) =>
  key in obj
    ? __defProp4(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp4.call(b, prop)) __defNormalProp4(a, prop, b[prop])
  if (__getOwnPropSymbols4)
    for (var prop of __getOwnPropSymbols4(b)) {
      if (__propIsEnum4.call(b, prop)) __defNormalProp4(a, prop, b[prop])
    }
  return a
}
var _hoisted_14 = ['placeholder', 'disabled', 'aria-label']
var _hoisted_24 = ['disabled']
var _hoisted_34 = ['value', 'disabled', 'placeholder']
var _hoisted_42 = ['value', 'disabled', 'placeholder']
var _hoisted_52 = ['value', 'disabled', 'placeholder']
var _hoisted_62 = ['value', 'disabled', 'placeholder']
var _hoisted_7 = ['value', 'disabled', 'placeholder']
var _hoisted_8 = ['value', 'disabled', 'placeholder']
var _hoisted_9 = ['value', 'disabled', 'placeholder']
function render5(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock5(),
    _createElementBlock5(
      'div',
      {
        class: _normalizeClass4([$setup.ns.b(), $setup.ns.is('disabled', _ctx.disabled)]),
        style: _normalizeStyle4($setup.themeStyle)
      },
      [
        _createCommentVNode5(' \u667A\u80FD\u8BC6\u522B\u533A '),
        _ctx.showParser
          ? (_openBlock5(),
            _createElementBlock5(
              'div',
              {
                key: 0,
                class: _normalizeClass4($setup.ns.e('parser'))
              },
              [
                _withDirectives4(
                  _createElementVNode5(
                    'textarea',
                    {
                      'onUpdate:modelValue':
                        _cache[0] || (_cache[0] = ($event) => ($setup.rawText = $event)),
                      class: _normalizeClass4($setup.ns.e('parser-input')),
                      placeholder: $setup.placeholder,
                      disabled: _ctx.disabled,
                      rows: '3',
                      'aria-label': $setup.t('smartaddress.parse')
                    },
                    null,
                    10,
                    _hoisted_14
                  ),
                  [[_vModelText, $setup.rawText]]
                ),
                _createElementVNode5(
                  'div',
                  {
                    class: _normalizeClass4($setup.ns.e('parser-actions'))
                  },
                  [
                    $setup.parseTip
                      ? (_openBlock5(),
                        _createElementBlock5(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass4([
                              $setup.ns.e('parser-tip'),
                              $setup.ns.is('success', $setup.parseStatus === 'success'),
                              $setup.ns.is('error', $setup.parseStatus === 'error')
                            ])
                          },
                          _toDisplayString4($setup.parseTip),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode5('v-if', true),
                    _createElementVNode5(
                      'button',
                      {
                        class: _normalizeClass4($setup.ns.e('parse-btn')),
                        disabled: _ctx.disabled || !$setup.rawText.trim(),
                        onClick: $setup.handleParse
                      },
                      [
                        _renderSlot5(_ctx.$slots, 'parse-icon', {}, () => [
                          _cache[12] ||
                            (_cache[12] = _createTextVNode4(
                              '\u2726',
                              -1
                              /* CACHED */
                            ))
                        ]),
                        _createTextVNode4(
                          ' ' + _toDisplayString4($setup.btnText),
                          1
                          /* TEXT */
                        )
                      ],
                      10,
                      _hoisted_24
                    )
                  ],
                  2
                  /* CLASS */
                )
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode5('v-if', true),
        _createCommentVNode5(' \u7ED3\u6784\u5316\u5B57\u6BB5 '),
        _createElementVNode5(
          'div',
          {
            class: _normalizeClass4([
              $setup.ns.e('fields'),
              $setup.ns.is('top', _ctx.labelPlacement === 'top')
            ])
          },
          [
            _createCommentVNode5(' \u59D3\u540D '),
            _ctx.showName
              ? (_openBlock5(),
                _createElementBlock5(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass4($setup.ns.e('field'))
                  },
                  [
                    _createElementVNode5(
                      'label',
                      {
                        class: _normalizeClass4([
                          $setup.ns.e('label'),
                          $setup.ns.is('required', _ctx.required)
                        ])
                      },
                      _toDisplayString4($setup.t('smartaddress.name')),
                      3
                      /* TEXT, CLASS */
                    ),
                    _createElementVNode5(
                      'input',
                      {
                        class: _normalizeClass4($setup.ns.e('input')),
                        value: $setup.innerVal.name,
                        disabled: _ctx.disabled,
                        placeholder: `${$setup.t('smartaddress.name')}...`,
                        onInput:
                          _cache[1] ||
                          (_cache[1] = (e) => $setup.updateField('name', e.target.value))
                      },
                      null,
                      42,
                      _hoisted_34
                    )
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode5('v-if', true),
            _createCommentVNode5(' \u624B\u673A\u53F7 '),
            _ctx.showPhone
              ? (_openBlock5(),
                _createElementBlock5(
                  'div',
                  {
                    key: 1,
                    class: _normalizeClass4($setup.ns.e('field'))
                  },
                  [
                    _createElementVNode5(
                      'label',
                      {
                        class: _normalizeClass4([
                          $setup.ns.e('label'),
                          $setup.ns.is('required', _ctx.required)
                        ])
                      },
                      _toDisplayString4($setup.t('smartaddress.phone')),
                      3
                      /* TEXT, CLASS */
                    ),
                    _createElementVNode5(
                      'input',
                      {
                        class: _normalizeClass4($setup.ns.e('input')),
                        value: $setup.innerVal.phone,
                        disabled: _ctx.disabled,
                        type: 'tel',
                        inputmode: 'numeric',
                        maxlength: '11',
                        placeholder: `${$setup.t('smartaddress.phone')}...`,
                        onInput:
                          _cache[2] ||
                          (_cache[2] = (e) => $setup.updateField('phone', e.target.value))
                      },
                      null,
                      42,
                      _hoisted_42
                    )
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode5('v-if', true),
            _createCommentVNode5(
              ' \u7701/\u5E02/\u533A \u4E09\u4E2A\u4E0B\u62C9\uFF08\u5F53\u524D\u7B80\u5316\u4E3A input\uFF0C\u53EF\u7531\u5916\u90E8\u63D2\u69FD\u66FF\u6362\u4E3A Cascader\uFF09 '
            ),
            _createElementVNode5(
              'div',
              {
                class: _normalizeClass4([$setup.ns.e('field'), $setup.ns.e('region')])
              },
              [
                _createElementVNode5(
                  'label',
                  {
                    class: _normalizeClass4([
                      $setup.ns.e('label'),
                      $setup.ns.is('required', _ctx.required)
                    ])
                  },
                  _toDisplayString4($setup.t('smartaddress.province')),
                  3
                  /* TEXT, CLASS */
                ),
                _renderSlot5(
                  _ctx.$slots,
                  'region',
                  {
                    value: $setup.innerVal,
                    update: $setup.updateField
                  },
                  () => [
                    _createCommentVNode5(' \u8F93\u5165\u6846\u6A21\u5F0F '),
                    _ctx.regionType === 'input'
                      ? (_openBlock5(),
                        _createElementBlock5(
                          'div',
                          {
                            key: 0,
                            class: _normalizeClass4($setup.ns.e('region-inputs'))
                          },
                          [
                            _createElementVNode5(
                              'input',
                              {
                                class: _normalizeClass4($setup.ns.e('input')),
                                value: $setup.innerVal.province,
                                disabled: _ctx.disabled,
                                placeholder: $setup.t('smartaddress.province'),
                                onInput:
                                  _cache[3] ||
                                  (_cache[3] = (e) =>
                                    $setup.updateField('province', e.target.value))
                              },
                              null,
                              42,
                              _hoisted_52
                            ),
                            _createElementVNode5(
                              'input',
                              {
                                class: _normalizeClass4($setup.ns.e('input')),
                                value: $setup.innerVal.city,
                                disabled: _ctx.disabled,
                                placeholder: $setup.t('smartaddress.city'),
                                onInput:
                                  _cache[4] ||
                                  (_cache[4] = (e) => $setup.updateField('city', e.target.value))
                              },
                              null,
                              42,
                              _hoisted_62
                            ),
                            _createElementVNode5(
                              'input',
                              {
                                class: _normalizeClass4($setup.ns.e('input')),
                                value: $setup.innerVal.district,
                                disabled: _ctx.disabled,
                                placeholder: $setup.t('smartaddress.district'),
                                onInput:
                                  _cache[5] ||
                                  (_cache[5] = (e) =>
                                    $setup.updateField('district', e.target.value))
                              },
                              null,
                              42,
                              _hoisted_7
                            )
                          ],
                          2
                          /* CLASS */
                        ))
                      : _ctx.regionType === 'select'
                        ? (_openBlock5(),
                          _createElementBlock5(
                            _Fragment5,
                            { key: 1 },
                            [
                              _createCommentVNode5(' \u4E0B\u62C9\u6846\u6A21\u5F0F '),
                              _createElementVNode5(
                                'div',
                                {
                                  class: _normalizeClass4($setup.ns.e('region-inputs'))
                                },
                                [
                                  _createVNode3(
                                    $setup['YhSelect'],
                                    {
                                      'model-value': $setup.innerVal.province,
                                      disabled: _ctx.disabled,
                                      placeholder: $setup.t('smartaddress.province'),
                                      style: { flex: '1', 'min-width': '0' },
                                      'onUpdate:modelValue':
                                        _cache[6] ||
                                        (_cache[6] = (val) => {
                                          $setup.updateField('province', val)
                                          $setup.updateField('city', '')
                                          $setup.updateField('district', '')
                                        })
                                    },
                                    {
                                      default: _withCtx4(() => [
                                        (_openBlock5(true),
                                        _createElementBlock5(
                                          _Fragment5,
                                          null,
                                          _renderList4($setup.provinceOptions, (opt) => {
                                            return (
                                              _openBlock5(),
                                              _createBlock4(
                                                $setup['YhOption'],
                                                {
                                                  key: opt.value,
                                                  label: opt.label,
                                                  value: opt.value
                                                },
                                                null,
                                                8,
                                                ['label', 'value']
                                              )
                                            )
                                          }),
                                          128
                                          /* KEYED_FRAGMENT */
                                        ))
                                      ]),
                                      _: 1
                                      /* STABLE */
                                    },
                                    8,
                                    ['model-value', 'disabled', 'placeholder']
                                  ),
                                  _createVNode3(
                                    $setup['YhSelect'],
                                    {
                                      'model-value': $setup.innerVal.city,
                                      disabled: _ctx.disabled,
                                      placeholder: $setup.t('smartaddress.city'),
                                      style: { flex: '1', 'min-width': '0' },
                                      'onUpdate:modelValue':
                                        _cache[7] ||
                                        (_cache[7] = (val) => {
                                          $setup.updateField('city', val)
                                          $setup.updateField('district', '')
                                        })
                                    },
                                    {
                                      default: _withCtx4(() => [
                                        (_openBlock5(true),
                                        _createElementBlock5(
                                          _Fragment5,
                                          null,
                                          _renderList4($setup.cityOptions, (opt) => {
                                            return (
                                              _openBlock5(),
                                              _createBlock4(
                                                $setup['YhOption'],
                                                {
                                                  key: opt.value,
                                                  label: opt.label,
                                                  value: opt.value
                                                },
                                                null,
                                                8,
                                                ['label', 'value']
                                              )
                                            )
                                          }),
                                          128
                                          /* KEYED_FRAGMENT */
                                        ))
                                      ]),
                                      _: 1
                                      /* STABLE */
                                    },
                                    8,
                                    ['model-value', 'disabled', 'placeholder']
                                  ),
                                  _createVNode3(
                                    $setup['YhSelect'],
                                    {
                                      'model-value': $setup.innerVal.district,
                                      disabled: _ctx.disabled,
                                      placeholder: $setup.t('smartaddress.district'),
                                      style: { flex: '1', 'min-width': '0' },
                                      'onUpdate:modelValue':
                                        _cache[8] ||
                                        (_cache[8] = (val) => $setup.updateField('district', val))
                                    },
                                    {
                                      default: _withCtx4(() => [
                                        (_openBlock5(true),
                                        _createElementBlock5(
                                          _Fragment5,
                                          null,
                                          _renderList4($setup.districtOptions, (opt) => {
                                            return (
                                              _openBlock5(),
                                              _createBlock4(
                                                $setup['YhOption'],
                                                {
                                                  key: opt.value,
                                                  label: opt.label,
                                                  value: opt.value
                                                },
                                                null,
                                                8,
                                                ['label', 'value']
                                              )
                                            )
                                          }),
                                          128
                                          /* KEYED_FRAGMENT */
                                        ))
                                      ]),
                                      _: 1
                                      /* STABLE */
                                    },
                                    8,
                                    ['model-value', 'disabled', 'placeholder']
                                  )
                                ],
                                2
                                /* CLASS */
                              )
                            ],
                            2112
                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                          ))
                        : _ctx.regionType === 'cascader'
                          ? (_openBlock5(),
                            _createElementBlock5(
                              _Fragment5,
                              { key: 2 },
                              [
                                _createCommentVNode5(' \u7EA7\u8054\u6A21\u5F0F '),
                                _createElementVNode5(
                                  'div',
                                  {
                                    class: _normalizeClass4($setup.ns.e('region-inputs'))
                                  },
                                  [
                                    _createVNode3(
                                      $setup['YhCascader'],
                                      {
                                        modelValue: $setup.regionCascaderValue,
                                        'onUpdate:modelValue':
                                          _cache[9] ||
                                          (_cache[9] = ($event) =>
                                            ($setup.regionCascaderValue = $event)),
                                        options: $setup.cascaderOptions,
                                        disabled: _ctx.disabled,
                                        placeholder: $setup.t('smartaddress.province'),
                                        style: { width: '100%' }
                                      },
                                      null,
                                      8,
                                      ['modelValue', 'options', 'disabled', 'placeholder']
                                    )
                                  ],
                                  2
                                  /* CLASS */
                                )
                              ],
                              2112
                              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                            ))
                          : _createCommentVNode5('v-if', true)
                  ]
                )
              ],
              2
              /* CLASS */
            ),
            _createCommentVNode5(' \u8857\u9053\uFF08\u53EF\u9009\uFF09 '),
            _ctx.showStreet
              ? (_openBlock5(),
                _createElementBlock5(
                  'div',
                  {
                    key: 2,
                    class: _normalizeClass4($setup.ns.e('field'))
                  },
                  [
                    _createElementVNode5(
                      'label',
                      {
                        class: _normalizeClass4($setup.ns.e('label'))
                      },
                      _toDisplayString4($setup.t('smartaddress.street')),
                      3
                      /* TEXT, CLASS */
                    ),
                    _createElementVNode5(
                      'input',
                      {
                        class: _normalizeClass4($setup.ns.e('input')),
                        value: $setup.innerVal.street,
                        disabled: _ctx.disabled,
                        placeholder: `${$setup.t('smartaddress.street')}...`,
                        onInput:
                          _cache[10] ||
                          (_cache[10] = (e) => $setup.updateField('street', e.target.value))
                      },
                      null,
                      42,
                      _hoisted_8
                    )
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode5('v-if', true),
            _createCommentVNode5(' \u8BE6\u7EC6\u5730\u5740 '),
            _createElementVNode5(
              'div',
              {
                class: _normalizeClass4($setup.ns.e('field'))
              },
              [
                _createElementVNode5(
                  'label',
                  {
                    class: _normalizeClass4([
                      $setup.ns.e('label'),
                      $setup.ns.is('required', _ctx.required)
                    ])
                  },
                  _toDisplayString4($setup.t('smartaddress.detail')),
                  3
                  /* TEXT, CLASS */
                ),
                _createElementVNode5(
                  'input',
                  {
                    class: _normalizeClass4($setup.ns.e('input')),
                    value: $setup.innerVal.detail,
                    disabled: _ctx.disabled,
                    placeholder: `${$setup.t('smartaddress.detail')}...`,
                    onInput:
                      _cache[11] ||
                      (_cache[11] = (e) => $setup.updateField('detail', e.target.value))
                  },
                  null,
                  42,
                  _hoisted_9
                )
              ],
              2
              /* CLASS */
            ),
            _createCommentVNode5(' \u81EA\u5B9A\u4E49\u6269\u5C55\u5B57\u6BB5\u533A '),
            _renderSlot5(_ctx.$slots, 'extra', {
              value: $setup.innerVal,
              update: $setup.updateField
            })
          ],
          2
          /* CLASS */
        )
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
var __sfc__5 = /* @__PURE__ */ Object.assign(
  { name: 'YhSmartAddress' },
  {
    __name: 'smart-address',
    props: smartAddressProps,
    emits: smartAddressEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('smart-address')
      const { themeStyle } = useComponentTheme(
        'smart-address',
        computed15(() => props.themeOverrides)
      )
      const { t, tRaw } = useLocale()
      const rawText = ref15('')
      const parseStatus = ref15('idle')
      const parseTip = ref15('')
      function getValueByLabel(options, label) {
        if (!label) return null
        const match = options.find((opt) => opt[props.labelField] === label)
        return match ? match[props.valueField] : null
      }
      function handleParse() {
        if (!rawText.value.trim()) return
        const getKw = (p) => {
          const res = tRaw(p)
          return Array.isArray(res) ? res : void 0
        }
        const parseOptions = {
          provinceKeywords: getKw('smartaddress.provinceKeywords'),
          cityKeywords: getKw('smartaddress.cityKeywords'),
          districtKeywords: getKw('smartaddress.districtKeywords'),
          streetKeywords: getKw('smartaddress.streetKeywords')
        }
        const result = props.parser
          ? props.parser(rawText.value)
          : parseAddress(rawText.value, parseOptions)
        const hasRegion = result.province || result.city || result.district || result.detail
        if (!hasRegion && !result.phone && !result.name) {
          parseStatus.value = 'error'
          parseTip.value = t('smartaddress.parseFailed')
          return
        }
        const provinceVal = getValueByLabel(props.regionOptions, result.province) || result.province
        let cityVal = result.city
        const provinceMatch = props.regionOptions.find(
          (opt) => opt[props.labelField] === result.province
        )
        const provinceChildren =
          (provinceMatch == null ? void 0 : provinceMatch[props.childrenField]) || []
        if (provinceChildren.length) {
          cityVal = getValueByLabel(provinceChildren, result.city) || result.city
        }
        let districtVal = result.district
        const cityMatch = provinceChildren.find((opt) => opt[props.labelField] === result.city)
        const cityChildren = (cityMatch == null ? void 0 : cityMatch[props.childrenField]) || []
        if (cityChildren.length) {
          districtVal = getValueByLabel(cityChildren, result.district) || result.district
        }
        const newVal = {
          name: result.name || innerVal.name,
          phone: result.phone || innerVal.phone,
          province: provinceVal || innerVal.province,
          city: cityVal || innerVal.city,
          district: districtVal || innerVal.district,
          street: result.street || innerVal.street,
          detail: result.detail || innerVal.detail
        }
        Object.assign(innerVal, newVal)
        parseStatus.value = 'success'
        parseTip.value = t('smartaddress.parseSuccess')
        rawText.value = ''
        emit('update:modelValue', __spreadValues4({}, innerVal))
        emit('parsed', result)
        emit('change', __spreadValues4({}, innerVal))
        setTimeout(() => {
          parseStatus.value = 'idle'
          parseTip.value = ''
        }, 3e3)
      }
      const innerVal = reactive(__spreadValues4({}, props.modelValue))
      function updateField(field, value) {
        innerVal[field] = value
        emit('update:modelValue', __spreadValues4({}, innerVal))
        emit('change', __spreadValues4({}, innerVal))
      }
      const provinceOptions = computed15(() => {
        return props.regionOptions.map((p) => ({
          label: p[props.labelField] || '',
          value: p[props.valueField] || ''
        }))
      })
      const cityOptions = computed15(() => {
        if (!innerVal.province) return []
        const p = props.regionOptions.find((opt) => opt[props.valueField] === innerVal.province)
        const children = (p == null ? void 0 : p[props.childrenField]) || []
        if (children.length) {
          return children.map((c) => ({
            label: c[props.labelField] || '',
            value: c[props.valueField] || ''
          }))
        }
        return []
      })
      const districtOptions = computed15(() => {
        if (!innerVal.province || !innerVal.city) return []
        const p = props.regionOptions.find((opt) => opt[props.valueField] === innerVal.province)
        const provinceChildren = (p == null ? void 0 : p[props.childrenField]) || []
        if (provinceChildren.length) {
          const c = provinceChildren.find((child) => child[props.valueField] === innerVal.city)
          const cityChildren = (c == null ? void 0 : c[props.childrenField]) || []
          if (cityChildren.length) {
            return cityChildren.map((d) => ({
              label: d[props.labelField] || '',
              value: d[props.valueField] || ''
            }))
          }
        }
        return []
      })
      const cascaderOptions = computed15(() => {
        const transform = (opts) => {
          return opts.map((opt) => ({
            label: opt[props.labelField] || '',
            value: opt[props.valueField] || '',
            children: opt[props.childrenField] ? transform(opt[props.childrenField]) : void 0
          }))
        }
        return transform(props.regionOptions)
      })
      const regionCascaderValue = computed15({
        get() {
          const vals = []
          if (innerVal.province) vals.push(innerVal.province)
          if (innerVal.city) vals.push(innerVal.city)
          if (innerVal.district) vals.push(innerVal.district)
          return vals
        },
        set(val) {
          const arr = val
          if (Array.isArray(arr)) {
            updateField('province', arr[0] || '')
            updateField('city', arr[1] || '')
            updateField('district', arr[2] || '')
          } else {
            updateField('province', '')
            updateField('city', '')
            updateField('district', '')
          }
        }
      })
      const placeholder = computed15(() => props.parsePlaceholder || t('smartaddress.placeholder'))
      const btnText = computed15(() => props.parseButtonText || t('smartaddress.parse'))
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        t,
        tRaw,
        rawText,
        parseStatus,
        parseTip,
        getValueByLabel,
        handleParse,
        innerVal,
        updateField,
        provinceOptions,
        cityOptions,
        districtOptions,
        cascaderOptions,
        regionCascaderValue,
        placeholder,
        btnText,
        ref: ref15,
        computed: computed15,
        reactive,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get useLocale() {
          return useLocale
        },
        get smartAddressProps() {
          return smartAddressProps
        },
        get smartAddressEmits() {
          return smartAddressEmits
        },
        get parseAddress() {
          return parseAddress
        },
        get YhSelect() {
          return YhSelect
        },
        get YhOption() {
          return YhOption
        },
        get YhCascader() {
          return YhCascader
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__5.render = render5
var stdin_default6 = __sfc__5
export { stdin_default6 as default }
