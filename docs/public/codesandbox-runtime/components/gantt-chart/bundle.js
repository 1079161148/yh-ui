// public/codesandbox-runtime/components/gantt-chart/src/gantt-chart.js
import {
  createVNode as _createVNode2,
  normalizeClass as _normalizeClass6,
  createElementVNode as _createElementVNode5,
  toDisplayString as _toDisplayString5,
  vModelText as _vModelText,
  withDirectives as _withDirectives2,
  createTextVNode as _createTextVNode3,
  withCtx as _withCtx3,
  renderList as _renderList2,
  Fragment as _Fragment3,
  openBlock as _openBlock6,
  createElementBlock as _createElementBlock6,
  normalizeStyle as _normalizeStyle6,
  createCommentVNode as _createCommentVNode5,
  renderSlot as _renderSlot6,
  withModifiers as _withModifiers2,
  createBlock as _createBlock4
} from 'vue'
import { ref as ref16, computed as computed16, watch as watch6 } from 'vue'

// public/codesandbox-runtime/components/dayjs.js
import dayjs from 'dayjs'
var stdin_default = dayjs

// public/codesandbox-runtime/components/gantt-chart/src/gantt-chart.js
import isBetweenPluginModule from 'dayjs/plugin/isBetween.js'
import isoWeekPluginModule from 'dayjs/plugin/isoWeek.js'
import quarterOfYearPluginModule from 'dayjs/plugin/quarterOfYear.js'

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

// public/codesandbox-runtime/hooks/use-z-index/index.js
import { computed, inject as inject2, unref as unref2 } from 'vue'
var zIndexContextKey = Symbol('zIndexContextKey')
var zIndexCounterKey = Symbol('zIndexCounterKey')

// public/codesandbox-runtime/hooks/use-sku/index.js
import { ref as ref2, computed as computed2 } from 'vue'

// public/codesandbox-runtime/hooks/use-countdown/index.js
import { ref as ref3, computed as computed3, onUnmounted } from 'vue'

// public/codesandbox-runtime/hooks/use-locale/index.js
import { computed as computed5, unref as unref4, watch } from 'vue'

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
import { inject as inject3, computed as computed4, unref as unref3 } from 'vue'
var configProviderContextKey = Symbol('configProviderContextKey')
var useConfig = () => {
  const configRef = inject3(configProviderContextKey, null)
  const globalSize = computed4(() => {
    const config = unref3(configRef)
    return (config == null ? void 0 : config.size) || 'default'
  })
  const globalZIndex = computed4(() => {
    const config = unref3(configRef)
    return (config == null ? void 0 : config.zIndex) || 2e3
  })
  const globalLocale = computed4(() => {
    const config = unref3(configRef)
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
var dayjs2 =
  'default' in dayjsModule ? ((_a = dayjsModule.default) != null ? _a : dayjsModule) : dayjsModule
var stdin_default2 = dayjs2

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
    stdin_default2.locale(dayjsLocale)
    return
  }
  if (dayjsLocale === 'en') {
    stdin_default2.locale('en')
    return
  }
  try {
    const loaded = await loadDayjsLocale(dayjsLocale)
    if (!loaded) {
      stdin_default2.locale('en')
      return
    }
    loadedLocales.add(dayjsLocale)
    stdin_default2.locale(dayjsLocale)
  } catch (e) {
    stdin_default2.locale('en')
  }
}

// public/codesandbox-runtime/hooks/use-locale/index.js
var useLocale = (localeOverrides) => {
  const { globalLocale } = useConfig()
  const locale = computed5(() => {
    var _a2, _b
    return (_b = (_a2 = unref4(localeOverrides)) != null ? _a2 : unref4(globalLocale)) != null
      ? _b
      : zhCn
  })
  const lang = computed5(() => locale.value.name)
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
import { computed as computed6, inject as inject4, unref as unref5, useId as useVueId } from 'vue'
var idInjectionKey = Symbol('idInjectionKey')
var useId = (idOverrides) => {
  const injectedId = inject4(idInjectionKey, void 0)
  const nativeId = useVueId()
  const id = computed6(() => {
    const override = unref5(idOverrides)
    if (override) return override
    const injected = unref5(injectedId)
    if (injected) return injected
    return nativeId
  })
  return id
}

// public/codesandbox-runtime/hooks/use-form-item/index.js
import { inject as inject5 } from 'vue'
var FormContextKey = Symbol('FormContextKey')
var FormItemContextKey = Symbol('FormItemContextKey')
var useFormItem = () => {
  const form = inject5(FormContextKey, void 0)
  const formItem = inject5(FormItemContextKey, void 0)
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
import { ref as ref4, computed as computed7, unref as unref6 } from 'vue'

// public/codesandbox-runtime/hooks/use-cache/index.js
import { shallowRef } from 'vue'

// public/codesandbox-runtime/hooks/use-event-listener/index.js
import { onMounted, onBeforeUnmount, isRef, watch as watch2, unref as unref7 } from 'vue'
function useEventListener(target, event, handler, options) {
  if (typeof window === 'undefined') return
  const getTarget = () => {
    if (typeof target === 'function') {
      return target()
    }
    return unref7(target)
  }
  const add = () => {
    const el = getTarget()
    if (el) {
      el.addEventListener(event, handler, options)
    }
  }
  const remove = () => {
    const el = getTarget()
    if (el) {
      el.removeEventListener(event, handler, options)
    }
  }
  onMounted(add)
  onBeforeUnmount(remove)
  if (isRef(target)) {
    watch2(target, (newVal, oldVal) => {
      if (oldVal) {
        oldVal.removeEventListener(event, handler, options)
      }
      if (newVal) {
        newVal.addEventListener(event, handler, options)
      }
    })
  }
}

// public/codesandbox-runtime/hooks/use-scroll-lock/index.js
import { ref as ref5, watch as watch3, onUnmounted as onUnmounted2 } from 'vue'

// public/codesandbox-runtime/hooks/use-click-outside/index.js
import { unref as unref8 } from 'vue'

// public/codesandbox-runtime/hooks/use-ai/use-ai-chat.js
import { ref as ref7, computed as computed8 } from 'vue'

// public/codesandbox-runtime/hooks/use-ai/use-ai-stream.js
import { ref as ref6 } from 'vue'

// public/codesandbox-runtime/hooks/use-ai/use-ai-conversations.js
import { ref as ref8, computed as computed9 } from 'vue'

// public/codesandbox-runtime/hooks/use-ai/use-ai-request.js
import { ref as ref9 } from 'vue'

// public/codesandbox-runtime/hooks/use-ai/use-ai-voice.js
import { ref as ref10, onUnmounted as onUnmounted3, shallowRef as shallowRef2 } from 'vue'

// public/codesandbox-runtime/hooks/use-ai/use-ai-persistence.js
import { ref as ref11, onMounted as onMounted2 } from 'vue'

// public/codesandbox-runtime/theme/component-theme.js
import { inject as inject6, provide, computed as computed10, unref as unref9 } from 'vue'
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
  const globalThemes = inject6(COMPONENT_THEME_KEY, {})
  const mergedVars = computed10(() => {
    const globalVars = globalThemes[componentName] || {}
    const local = unref9(localOverrides) || {}
    return __spreadValues(__spreadValues({}, globalVars), local)
  })
  const themeStyle = computed10(() => {
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
  const hasCustomTheme = computed10(() => {
    return Object.keys(mergedVars.value).length > 0
  })
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  }
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

// public/codesandbox-runtime/components/tooltip/src/tooltip.js
import {
  renderSlot as _renderSlot,
  createCommentVNode as _createCommentVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  createElementVNode as _createElementVNode,
  vShow as _vShow,
  withDirectives as _withDirectives,
  Transition as _Transition,
  withCtx as _withCtx,
  createVNode as _createVNode,
  Teleport as _Teleport,
  createBlock as _createBlock
} from 'vue'
import {
  ref as ref12,
  computed as computed11,
  watch as watch4,
  onMounted as onMounted3,
  onUnmounted as onUnmounted4,
  nextTick
} from 'vue'
import { computePosition, offset, flip, shift, arrow, autoUpdate } from '@floating-ui/dom'

// public/codesandbox-runtime/components/tooltip/src/tooltip-meta.js
var tooltipProps = {
  /** 显示内容 */
  content: {
    type: String,
    default: ''
  },
  /** 出现位置 */
  placement: {
    type: String,
    default: 'top'
  },
  /** 触发方式 */
  trigger: {
    type: [String, Array],
    default: 'hover'
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 出现延迟 (ms) */
  showAfter: {
    type: Number,
    default: 0
  },
  /** 消失延迟 (ms) */
  hideAfter: {
    type: Number,
    default: 200
  },
  /** 偏移量 [skidding, distance] */
  offset: {
    type: Array,
    default: () => [0, 8]
  },
  /** 是否显示小三角 */
  showArrow: {
    type: Boolean,
    default: true
  },
  /** 是否允许鼠标进入提示框 */
  interactive: {
    type: Boolean,
    default: true
  },
  /** 手动控制显示隐藏 */
  visible: {
    type: Boolean,
    default: null
  },
  /** 提示框的主题：dark / light 或自定义名称 */
  effect: {
    type: String,
    default: 'dark'
  },
  /** 是否跟随鼠标移动 (高级功能) */
  followCursor: {
    type: Boolean,
    default: false
  },
  /** 弹出层的自定义类名 */
  popperClass: {
    type: String,
    default: ''
  },
  /** 挂载节点 */
  teleported: {
    type: Boolean,
    default: true
  },
  /** z-index */
  zIndex: {
    type: Number,
    default: 2e3
  },
  /** 手动控制动画名称 */
  transition: {
    type: String,
    default: 'yh-tooltip-fade'
  },
  /** 是否在隐藏时销毁 DOM 节点 */
  persistent: {
    type: Boolean,
    default: true
  },
  /** 是否作为 HTML 字符串渲染 content 属性 */
  rawContent: {
    type: Boolean,
    default: false
  },
  /** 弹出层宽度 */
  width: {
    type: [String, Number],
    default: 'auto'
  },
  /** 弹出层最大高度 */
  maxHeight: {
    type: [String, Number],
    default: 'none'
  },
  /** 内容是否可滚动 */
  scrollable: {
    type: Boolean,
    default: false
  },
  /** 弹出内容自定义类名 */
  contentClass: {
    type: String,
    default: ''
  },
  /** 弹出内容自定义样式 */
  contentStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 箭头自定义类名 */
  arrowClass: {
    type: String,
    default: ''
  },
  /** 箭头自定义样式 */
  arrowStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 弹出层自定义样式 */
  popperStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 箭头容器自定义类名 */
  arrowWrapperClass: {
    type: String,
    default: ''
  },
  /** 箭头容器自定义样式 */
  arrowWrapperStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
var tooltipEmits = {
  'update:visible': (visible) => typeof visible === 'boolean',
  show: () => true,
  hide: () => true
}

// public/codesandbox-runtime/components/tooltip/src/tooltip.js
var __defProp2 = Object.defineProperty
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
var _hoisted_1 = ['id', 'data-placement']
var _hoisted_2 = ['innerHTML']
var _hoisted_3 = { key: 1 }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.ns.b()),
        ref: 'triggerRef',
        onMouseenter: _cache[2] || (_cache[2] = ($event) => $setup.handleTrigger($event, 'hover')),
        onMouseleave:
          _cache[3] ||
          (_cache[3] = ($event) => $setup.triggers.has('hover') && $setup.toggleVisible(false)),
        onClick: _cache[4] || (_cache[4] = ($event) => $setup.handleTrigger($event, 'click')),
        onContextmenu:
          _cache[5] || (_cache[5] = ($event) => $setup.handleTrigger($event, 'contextmenu')),
        onFocusin: _cache[6] || (_cache[6] = ($event) => $setup.handleTrigger($event, 'focus')),
        onFocusout:
          _cache[7] ||
          (_cache[7] = ($event) => $setup.triggers.has('focus') && $setup.toggleVisible(false))
      },
      [
        _renderSlot(_ctx.$slots, 'default'),
        (_openBlock(),
        _createBlock(
          _Teleport,
          {
            to: 'body',
            disabled: !_ctx.teleported
          },
          [
            _createVNode(
              _Transition,
              { name: _ctx.transition },
              {
                default: _withCtx(() => [
                  $setup.shouldRender
                    ? _withDirectives(
                        (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            id: $setup.tooltipId,
                            ref: 'popperRef',
                            class: _normalizeClass($setup.popperClasses),
                            style: _normalizeStyle($setup.computedPopperStyle),
                            'data-placement': $setup.actualPlacement,
                            onMouseenter:
                              _cache[0] ||
                              (_cache[0] = ($event) =>
                                _ctx.interactive && $setup.toggleVisible(true)),
                            onMouseleave:
                              _cache[1] ||
                              (_cache[1] = ($event) =>
                                _ctx.interactive &&
                                $setup.triggers.has('hover') &&
                                $setup.toggleVisible(false))
                          },
                          [
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass([
                                  $setup.ns.e('content'),
                                  $setup.props.contentClass
                                ]),
                                style: _normalizeStyle($setup.computedContentStyle)
                              },
                              [
                                _renderSlot(_ctx.$slots, 'content', {}, () => [
                                  _createCommentVNode(' eslint-disable-next-line vue/no-v-html '),
                                  _ctx.rawContent
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'span',
                                        {
                                          key: 0,
                                          innerHTML: _ctx.content
                                        },
                                        null,
                                        8,
                                        _hoisted_2
                                      ))
                                    : (_openBlock(),
                                      _createElementBlock(
                                        'span',
                                        _hoisted_3,
                                        _toDisplayString(_ctx.content),
                                        1
                                        /* TEXT */
                                      ))
                                ])
                              ],
                              6
                              /* CLASS, STYLE */
                            ),
                            _createCommentVNode(
                              ' \u5C0F\u4E09\u89D2 - \u4F7F\u7528 Floating UI \u5B98\u65B9\u63A8\u8350\u7684 SVG \u8DEF\u5F84\u65B9\u6848 '
                            ),
                            _ctx.showArrow
                              ? (_openBlock(),
                                _createElementBlock(
                                  'div',
                                  {
                                    key: 0,
                                    ref: 'arrowRef',
                                    class: _normalizeClass($setup.ns.e('arrow-wrapper')),
                                    style: _normalizeStyle($setup.arrowStyle)
                                  },
                                  [
                                    (_openBlock(),
                                    _createElementBlock(
                                      'svg',
                                      {
                                        class: _normalizeClass($setup.ns.e('arrow')),
                                        width: '12',
                                        height: '12',
                                        viewBox: '0 0 12 12',
                                        xmlns: 'http://www.w3.org/2000/svg'
                                      },
                                      [
                                        ...(_cache[8] ||
                                          (_cache[8] = [
                                            _createElementVNode(
                                              'path',
                                              { d: 'M0,0 L6,6 L12,0' },
                                              null,
                                              -1
                                              /* CACHED */
                                            )
                                          ]))
                                      ],
                                      2
                                      /* CLASS */
                                    ))
                                  ],
                                  6
                                  /* CLASS, STYLE */
                                ))
                              : _createCommentVNode('v-if', true)
                          ],
                          46,
                          _hoisted_1
                        )),
                        [[_vShow, $setup.showPopper]]
                      )
                    : _createCommentVNode('v-if', true)
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
      34
      /* CLASS, NEED_HYDRATION */
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhTooltip'
  },
  {
    __name: 'tooltip',
    props: tooltipProps,
    emits: tooltipEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('tooltip')
      const tooltipId = useId()
      const { themeStyle } = useComponentTheme(
        'tooltip',
        computed11(() => props.themeOverrides)
      )
      const triggerRef = ref12(null)
      const popperRef = ref12(null)
      const arrowRef = ref12(null)
      const visible = ref12(false)
      const popperStyle = ref12({})
      const arrowStyle = ref12({})
      const computedPopperStyle = computed11(() => {
        const styles = __spreadValues2(__spreadValues2({}, themeStyle.value), popperStyle.value)
        if (typeof props.popperStyle === 'object') {
          Object.assign(styles, props.popperStyle)
        }
        return styles
      })
      const computedContentStyle = computed11(() => {
        const styles = {
          width: typeof props.width === 'number' ? `${props.width}px` : props.width,
          maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
          overflowY: props.scrollable ? 'auto' : 'visible'
        }
        if (typeof props.contentStyle === 'object') {
          Object.assign(styles, props.contentStyle)
        }
        return styles
      })
      const actualPlacement = ref12(props.placement)
      let cleanup = null
      let showTimer = null
      let hideTimer = null
      const showPopper = computed11(() => {
        if (props.disabled) return false
        return props.visible !== null ? props.visible : visible.value
      })
      const shouldRender = computed11(() => props.persistent || showPopper.value)
      const popperClasses = computed11(() => [
        ns.e('popper'),
        ns.is(props.effect, true),
        // 使用 is-dark / is-light 更加稳定
        ns.em('popper', props.effect),
        ns.is('interactive', props.interactive),
        props.popperClass
      ])
      const updatePosition = async () => {
        if (!triggerRef.value || !popperRef.value || typeof window === 'undefined') return
        const { x, y, placement, middlewareData } = await computePosition(
          triggerRef.value,
          popperRef.value,
          {
            placement: props.placement,
            middleware: [
              offset(props.offset[1]),
              flip(),
              shift({ padding: 5 }),
              props.showArrow ? arrow({ element: arrowRef.value }) : null
            ].filter((item) => item !== null)
          }
        )
        popperStyle.value = {
          left: `${x}px`,
          top: `${y}px`,
          zIndex: String(props.zIndex)
        }
        actualPlacement.value = placement
        if (middlewareData.arrow && arrowRef.value) {
          const { x: ax, y: ay } = middlewareData.arrow
          const side = placement.split('-')[0]
          const staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right'
          }[side]
          arrowStyle.value = {
            left: ax != null ? `${ax}px` : '',
            top: ay != null ? `${ay}px` : '',
            [staticSide]: '-12px'
          }
        }
      }
      const handleMouseMove = async (e) => {
        if (!props.followCursor || !visible.value || typeof window === 'undefined') return
        const virtualElement = {
          getBoundingClientRect: () => {
            const rect = {
              width: 0,
              height: 0,
              x: e.clientX,
              y: e.clientY,
              top: e.clientY,
              left: e.clientX,
              right: e.clientX,
              bottom: e.clientY,
              toJSON: () => ({})
            }
            return rect
          }
        }
        const { x, y } = await computePosition(virtualElement, popperRef.value, {
          placement: props.placement,
          middleware: [offset(10), flip(), shift()]
        })
        popperStyle.value = {
          left: `${x}px`,
          top: `${y}px`,
          zIndex: String(props.zIndex)
        }
      }
      const toggleVisible = (value) => {
        if (props.disabled) return
        if (showTimer) {
          clearTimeout(showTimer)
          showTimer = null
        }
        if (hideTimer) {
          clearTimeout(hideTimer)
          hideTimer = null
        }
        if (value) {
          const delay = props.showAfter
          if (delay <= 0) {
            visible.value = true
            emit('update:visible', true)
            emit('show')
            nextTick(startAutoUpdate)
          } else {
            showTimer = setTimeout(() => {
              visible.value = true
              emit('update:visible', true)
              emit('show')
              nextTick(startAutoUpdate)
            }, delay)
          }
        } else {
          const delay = props.hideAfter
          if (delay <= 0) {
            visible.value = false
            emit('update:visible', false)
            emit('hide')
            stopAutoUpdate()
          } else {
            hideTimer = setTimeout(() => {
              visible.value = false
              emit('update:visible', false)
              emit('hide')
              stopAutoUpdate()
            }, delay)
          }
        }
      }
      const startAutoUpdate = async () => {
        if (cleanup) cleanup()
        if (
          triggerRef.value &&
          popperRef.value &&
          !props.followCursor &&
          typeof window !== 'undefined'
        ) {
          cleanup = autoUpdate(triggerRef.value, popperRef.value, updatePosition)
        }
      }
      const stopAutoUpdate = () => {
        if (cleanup) {
          cleanup()
          cleanup = null
        }
      }
      const triggers = computed11(() => {
        const t = Array.isArray(props.trigger) ? props.trigger : [props.trigger]
        return new Set(t)
      })
      const handleTrigger = (e, type) => {
        if (!triggers.value.has(type)) return
        if (type === 'hover') {
          toggleVisible(true)
        } else if (type === 'click') {
          const isShowing = (visible.value && !hideTimer) || showTimer
          toggleVisible(!isShowing)
        } else if (type === 'contextmenu') {
          e.preventDefault()
          toggleVisible(true)
        } else if (type === 'focus') {
          toggleVisible(true)
        }
      }
      useEventListener(
        () => window,
        'click',
        (e) => {
          var _a2, _b
          const me = e
          if (!visible.value) return
          const needsClose = triggers.value.has('click') || triggers.value.has('contextmenu')
          if (!needsClose) return
          const target = me.target
          if (
            !((_a2 = triggerRef.value) == null ? void 0 : _a2.contains(target)) &&
            !((_b = popperRef.value) == null ? void 0 : _b.contains(target))
          ) {
            toggleVisible(false)
          }
        }
      )
      watch4(
        () => props.visible,
        (val) => {
          if (val !== null && val !== visible.value) {
            visible.value = val
            if (val) nextTick(startAutoUpdate)
            else stopAutoUpdate()
          }
        },
        { immediate: true }
      )
      watch4(
        () => props.followCursor,
        (val) => {
          if (typeof window === 'undefined') return
          if (val) {
            window.addEventListener('mousemove', handleMouseMove)
          } else {
            window.removeEventListener('mousemove', handleMouseMove)
          }
        }
      )
      onMounted3(() => {
        if (props.followCursor && typeof window !== 'undefined') {
          window.addEventListener('mousemove', handleMouseMove)
        }
      })
      onUnmounted4(() => {
        stopAutoUpdate()
        if (typeof window !== 'undefined') {
          window.removeEventListener('mousemove', handleMouseMove)
        }
      })
      __expose({
        updatePosition,
        visible,
        triggerRef,
        popperRef
      })
      const __returned__ = {
        props,
        emit,
        ns,
        tooltipId,
        themeStyle,
        triggerRef,
        popperRef,
        arrowRef,
        visible,
        popperStyle,
        arrowStyle,
        computedPopperStyle,
        computedContentStyle,
        actualPlacement,
        get cleanup() {
          return cleanup
        },
        set cleanup(v) {
          cleanup = v
        },
        get showTimer() {
          return showTimer
        },
        set showTimer(v) {
          showTimer = v
        },
        get hideTimer() {
          return hideTimer
        },
        set hideTimer(v) {
          hideTimer = v
        },
        showPopper,
        shouldRender,
        popperClasses,
        updatePosition,
        handleMouseMove,
        toggleVisible,
        startAutoUpdate,
        stopAutoUpdate,
        triggers,
        handleTrigger,
        ref: ref12,
        computed: computed11,
        watch: watch4,
        onMounted: onMounted3,
        onUnmounted: onUnmounted4,
        nextTick,
        get computePosition() {
          return computePosition
        },
        get offset() {
          return offset
        },
        get flip() {
          return flip
        },
        get shift() {
          return shift
        },
        get arrow() {
          return arrow
        },
        get autoUpdate() {
          return autoUpdate
        },
        get useNamespace() {
          return useNamespace
        },
        get useId() {
          return useId
        },
        get useEventListener() {
          return useEventListener
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get tooltipProps() {
          return tooltipProps
        },
        get tooltipEmits() {
          return tooltipEmits
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default3 = __sfc__

// public/codesandbox-runtime/components/tooltip/index.js
var YhTooltip = withInstall(stdin_default3)

// public/codesandbox-runtime/components/input/src/input.js
import {
  createCommentVNode as _createCommentVNode2,
  renderSlot as _renderSlot2,
  normalizeClass as _normalizeClass2,
  openBlock as _openBlock2,
  createElementBlock as _createElementBlock2,
  toDisplayString as _toDisplayString2,
  resolveDynamicComponent as _resolveDynamicComponent,
  createBlock as _createBlock2,
  normalizeStyle as _normalizeStyle2,
  createElementVNode as _createElementVNode2,
  Fragment as _Fragment,
  withModifiers as _withModifiers
} from 'vue'
import {
  computed as computed12,
  ref as ref13,
  watch as watch5,
  nextTick as nextTick2,
  useSlots,
  onMounted as onMounted4
} from 'vue'

// public/codesandbox-runtime/components/input/src/utils.js
var hiddenTextarea
var HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`
var CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
]
function calculateNodeStyling(targetElement) {
  const style = window.getComputedStyle(targetElement)
  const boxSizing = style.getPropertyValue('box-sizing')
  const paddingSize =
    Number.parseFloat(style.getPropertyValue('padding-bottom')) +
    Number.parseFloat(style.getPropertyValue('padding-top'))
  const borderSize =
    Number.parseFloat(style.getPropertyValue('border-bottom-width')) +
    Number.parseFloat(style.getPropertyValue('border-top-width'))
  const contextStyle = CONTEXT_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(
    ';'
  )
  return { contextStyle, boxSizing, paddingSize, borderSize }
}
function calcTextareaHeight(targetElement, minRows = 1, maxRows) {
  var _a2
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea')
    document.body.appendChild(hiddenTextarea)
  }
  const { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElement)
  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`)
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || ''
  let height = hiddenTextarea.scrollHeight
  const result = { height: '', minHeight: '' }
  if (boxSizing === 'border-box') {
    height = height + borderSize
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize
  }
  hiddenTextarea.value = ''
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize
  if (minRows > 0) {
    let minHeight = singleRowHeight * minRows
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize
    }
    height = Math.max(minHeight, height)
    result.minHeight = `${minHeight}px`
  }
  if (maxRows && maxRows > 0) {
    let maxHeight = singleRowHeight * maxRows
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize
    }
    height = Math.min(maxHeight, height)
  }
  result.height = `${height}px`
  ;(_a2 = hiddenTextarea.parentNode) == null ? void 0 : _a2.removeChild(hiddenTextarea)
  hiddenTextarea = void 0
  return result
}

// public/codesandbox-runtime/components/input/src/input.js
var __defProp3 = Object.defineProperty
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
var _hoisted_12 = [
  'value',
  'placeholder',
  'disabled',
  'readonly',
  'maxlength',
  'minlength',
  'rows',
  'name',
  'id',
  'tabindex',
  'autocomplete',
  'autofocus',
  'aria-label',
  'inputmode'
]
var _hoisted_22 = [
  'type',
  'value',
  'placeholder',
  'disabled',
  'readonly',
  'maxlength',
  'minlength',
  'name',
  'id',
  'tabindex',
  'list',
  'autocomplete',
  'autofocus',
  'aria-label',
  'inputmode',
  'aria-invalid',
  'aria-describedby'
]
var _hoisted_32 = {
  key: 0,
  viewBox: '0 0 24 24',
  width: '1em',
  height: '1em',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  style: { overflow: 'visible' }
}
var _hoisted_4 = {
  key: 1,
  viewBox: '0 0 24 24',
  width: '1em',
  height: '1em',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  style: { overflow: 'visible' }
}
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  var _a2
  return (
    _openBlock2(),
    _createElementBlock2(
      'div',
      {
        ref: 'wrapperRef',
        class: _normalizeClass2($setup.wrapperClasses),
        style: _normalizeStyle2($setup.wrapperStyle),
        onMouseenter: $setup.handleMouseEnter,
        onMouseleave: $setup.handleMouseLeave
      },
      [
        _createCommentVNode2(' \u524D\u7F6E\u5143\u7D20 '),
        $setup.hasPrepend
          ? (_openBlock2(),
            _createElementBlock2(
              'div',
              {
                key: 0,
                class: _normalizeClass2($setup.ns.e('prepend'))
              },
              [_renderSlot2(_ctx.$slots, 'prepend')],
              2
              /* CLASS */
            ))
          : _createCommentVNode2('v-if', true),
        _createCommentVNode2(' \u8F93\u5165\u6846\u5305\u88C5\u5668 '),
        _createElementVNode2(
          'div',
          {
            class: _normalizeClass2($setup.ns.e('wrapper'))
          },
          [
            _createCommentVNode2(' \u524D\u7F6E\u56FE\u6807/\u6587\u672C/\u5185\u5BB9 '),
            $setup.hasPrefix
              ? (_openBlock2(),
                _createElementBlock2(
                  'span',
                  {
                    key: 0,
                    class: _normalizeClass2($setup.ns.e('prefix'))
                  },
                  [
                    _renderSlot2(_ctx.$slots, 'prefix', {}, () => [
                      _createCommentVNode2(' Feature 6: prefix string prop '),
                      $props.prefix
                        ? (_openBlock2(),
                          _createElementBlock2(
                            'span',
                            {
                              key: 0,
                              class: _normalizeClass2($setup.ns.e('prefix-text'))
                            },
                            _toDisplayString2($props.prefix),
                            3
                            /* TEXT, CLASS */
                          ))
                        : $props.prefixIcon && typeof $props.prefixIcon !== 'string'
                          ? (_openBlock2(),
                            _createBlock2(
                              _resolveDynamicComponent($props.prefixIcon),
                              {
                                key: 1,
                                class: _normalizeClass2($setup.ns.e('icon'))
                              },
                              null,
                              8,
                              ['class']
                            ))
                          : $props.prefixIcon
                            ? (_openBlock2(),
                              _createElementBlock2(
                                'span',
                                {
                                  key: 2,
                                  class: _normalizeClass2($setup.ns.e('icon'))
                                },
                                _toDisplayString2($props.prefixIcon),
                                3
                                /* TEXT, CLASS */
                              ))
                            : _createCommentVNode2('v-if', true)
                    ])
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode2('v-if', true),
            _createCommentVNode2(' \u6587\u672C\u57DF '),
            $setup.isTextarea
              ? (_openBlock2(),
                _createElementBlock2(
                  'textarea',
                  {
                    key: 1,
                    ref: 'textareaRef',
                    class: _normalizeClass2($setup.inputClasses),
                    value: $setup.nativeInputValue,
                    placeholder: $props.placeholder || $setup.t('input.placeholder'),
                    disabled: $props.disabled,
                    readonly: $props.readonly,
                    maxlength: $props.maxlength,
                    minlength: $props.minlength,
                    rows: $props.rows,
                    name: $props.name,
                    id: $props.id,
                    tabindex: $props.tabindex,
                    autocomplete: $props.autocomplete,
                    autofocus: $props.autofocus,
                    'aria-label': $props.ariaLabel || $props.label,
                    inputmode: $props.inputmode,
                    style: _normalizeStyle2($setup.textareaStyle),
                    onInput: $setup.handleInput,
                    onChange: $setup.handleChange,
                    onFocus: $setup.handleFocus,
                    onBlur: $setup.handleBlur,
                    onKeydown: $setup.handleKeydown,
                    onKeyup: $setup.handleKeyup,
                    onCompositionstart: $setup.handleCompositionStart,
                    onCompositionupdate: $setup.handleCompositionUpdate,
                    onCompositionend: $setup.handleCompositionEnd
                  },
                  null,
                  46,
                  _hoisted_12
                ))
              : (_openBlock2(),
                _createElementBlock2(
                  _Fragment,
                  { key: 2 },
                  [
                    _createCommentVNode2(' \u666E\u901A\u8F93\u5165\u6846 '),
                    _createElementVNode2(
                      'input',
                      {
                        ref: 'inputRef',
                        class: _normalizeClass2($setup.inputClasses),
                        type: $props.showPassword
                          ? $setup.passwordVisible
                            ? 'text'
                            : 'password'
                          : $props.type,
                        value: $setup.nativeInputValue,
                        placeholder: $props.placeholder || $setup.t('input.placeholder'),
                        disabled: $props.disabled,
                        readonly: $props.readonly,
                        maxlength: $props.maxlength,
                        minlength: $props.minlength,
                        name: $props.name,
                        id: $props.id,
                        tabindex: $props.tabindex,
                        list: $props.list,
                        autocomplete: $props.autocomplete,
                        autofocus: $props.autofocus,
                        style: _normalizeStyle2($props.inputStyle),
                        'aria-label': $props.ariaLabel || $props.label,
                        inputmode: $props.inputmode,
                        'aria-invalid': $setup.mergedStatus === 'error',
                        'aria-describedby':
                          $setup.mergedStatus === 'error'
                            ? (_a2 = $setup.formItem) == null
                              ? void 0
                              : _a2.errorId
                            : void 0,
                        onInput: $setup.handleInput,
                        onChange: $setup.handleChange,
                        onFocus: $setup.handleFocus,
                        onBlur: $setup.handleBlur,
                        onKeydown: $setup.handleKeydown,
                        onKeyup: $setup.handleKeyup,
                        onCompositionstart: $setup.handleCompositionStart,
                        onCompositionupdate: $setup.handleCompositionUpdate,
                        onCompositionend: $setup.handleCompositionEnd
                      },
                      null,
                      46,
                      _hoisted_22
                    )
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )),
            _createCommentVNode2(' \u540E\u7F6E\u56FE\u6807/\u6587\u672C/\u5185\u5BB9 '),
            $setup.hasSuffix
              ? (_openBlock2(),
                _createElementBlock2(
                  'span',
                  {
                    key: 3,
                    class: _normalizeClass2($setup.ns.e('suffix'))
                  },
                  [
                    _createCommentVNode2(' Feature 2: \u52A0\u8F7D\u72B6\u6001\u56FE\u6807 '),
                    $setup.isLoading
                      ? (_openBlock2(),
                        _createElementBlock2(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass2([$setup.ns.e('icon'), $setup.ns.e('loading')])
                          },
                          [
                            _renderSlot2(_ctx.$slots, 'loadingIcon', {}, () => [
                              _cache[1] ||
                                (_cache[1] = _createElementVNode2(
                                  'svg',
                                  {
                                    viewBox: '0 0 1024 1024',
                                    xmlns: 'http://www.w3.org/2000/svg',
                                    width: '1em',
                                    height: '1em',
                                    class: 'yh-input__loading-spin'
                                  },
                                  [
                                    _createElementVNode2('path', {
                                      fill: 'currentColor',
                                      d: 'M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z'
                                    })
                                  ],
                                  -1
                                  /* CACHED */
                                ))
                            ])
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode2('v-if', true),
                    _createCommentVNode2(' \u6E05\u7A7A\u6309\u94AE '),
                    $setup.showClear && !$setup.isLoading
                      ? (_openBlock2(),
                        _createElementBlock2(
                          'span',
                          {
                            key: 1,
                            class: _normalizeClass2([$setup.ns.e('icon'), $setup.ns.e('clear')]),
                            onMousedown:
                              _cache[0] || (_cache[0] = _withModifiers(() => {}, ['prevent'])),
                            onClick: _withModifiers($setup.handleClear, ['stop'])
                          },
                          [
                            _renderSlot2(_ctx.$slots, 'clearIcon', {}, () => [
                              _cache[2] ||
                                (_cache[2] = _createElementVNode2(
                                  'svg',
                                  {
                                    viewBox: '0 0 1024 1024',
                                    xmlns: 'http://www.w3.org/2000/svg',
                                    width: '1em',
                                    height: '1em'
                                  },
                                  [
                                    _createElementVNode2('path', {
                                      fill: 'currentColor',
                                      d: 'm466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512zM512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 1 0 0-768 384 384 0 0 0 0 768z'
                                    })
                                  ],
                                  -1
                                  /* CACHED */
                                ))
                            ])
                          ],
                          34
                          /* CLASS, NEED_HYDRATION */
                        ))
                      : _createCommentVNode2('v-if', true),
                    _createCommentVNode2(' \u5BC6\u7801\u5207\u6362\u6309\u94AE '),
                    $setup.showPasswordIcon
                      ? (_openBlock2(),
                        _createElementBlock2(
                          'span',
                          {
                            key: 2,
                            class: _normalizeClass2([$setup.ns.e('icon'), $setup.ns.e('password')]),
                            onClick: _withModifiers($setup.handlePasswordToggle, ['stop'])
                          },
                          [
                            $setup.passwordVisible
                              ? (_openBlock2(),
                                _createElementBlock2('svg', _hoisted_32, [
                                  ...(_cache[3] ||
                                    (_cache[3] = [
                                      _createElementVNode2(
                                        'path',
                                        { d: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z' },
                                        null,
                                        -1
                                        /* CACHED */
                                      ),
                                      _createElementVNode2(
                                        'circle',
                                        {
                                          cx: '12',
                                          cy: '12',
                                          r: '3'
                                        },
                                        null,
                                        -1
                                        /* CACHED */
                                      )
                                    ]))
                                ]))
                              : (_openBlock2(),
                                _createElementBlock2('svg', _hoisted_4, [
                                  ...(_cache[4] ||
                                    (_cache[4] = [
                                      _createElementVNode2(
                                        'path',
                                        {
                                          d: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'
                                        },
                                        null,
                                        -1
                                        /* CACHED */
                                      ),
                                      _createElementVNode2(
                                        'line',
                                        {
                                          x1: '3',
                                          y1: '3',
                                          x2: '21',
                                          y2: '21'
                                        },
                                        null,
                                        -1
                                        /* CACHED */
                                      )
                                    ]))
                                ]))
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode2('v-if', true),
                    _createCommentVNode2(' \u540E\u7F6E\u56FE\u6807/\u6587\u672C\u63D2\u69FD '),
                    _renderSlot2(_ctx.$slots, 'suffix', {}, () => [
                      _createCommentVNode2(' Feature 6: suffix string prop '),
                      $props.suffix
                        ? (_openBlock2(),
                          _createElementBlock2(
                            'span',
                            {
                              key: 0,
                              class: _normalizeClass2($setup.ns.e('suffix-text'))
                            },
                            _toDisplayString2($props.suffix),
                            3
                            /* TEXT, CLASS */
                          ))
                        : $props.suffixIcon && typeof $props.suffixIcon !== 'string'
                          ? (_openBlock2(),
                            _createBlock2(
                              _resolveDynamicComponent($props.suffixIcon),
                              {
                                key: 1,
                                class: _normalizeClass2($setup.ns.e('icon'))
                              },
                              null,
                              8,
                              ['class']
                            ))
                          : $props.suffixIcon
                            ? (_openBlock2(),
                              _createElementBlock2(
                                'span',
                                {
                                  key: 2,
                                  class: _normalizeClass2($setup.ns.e('icon'))
                                },
                                _toDisplayString2($props.suffixIcon),
                                3
                                /* TEXT, CLASS */
                              ))
                            : _createCommentVNode2('v-if', true)
                    ])
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode2('v-if', true),
            _createCommentVNode2(
              ' \u5B57\u6570\u7EDF\u8BA1 (\u8F93\u5165\u6846\u5185\u90E8\uFF0C\u4EC5\u9488\u5BF9 type=text) '
            ),
            $setup.showWordLimitCount && !$setup.isTextarea
              ? (_openBlock2(),
                _createElementBlock2(
                  'span',
                  {
                    key: 4,
                    class: _normalizeClass2($setup.ns.e('count'))
                  },
                  _toDisplayString2($setup.textLength) +
                    ' / ' +
                    _toDisplayString2($props.maxlength),
                  3
                  /* TEXT, CLASS */
                ))
              : _createCommentVNode2('v-if', true)
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode2(' \u540E\u7F6E\u5143\u7D20 '),
        $setup.hasAppend
          ? (_openBlock2(),
            _createElementBlock2(
              'div',
              {
                key: 1,
                class: _normalizeClass2($setup.ns.e('append'))
              },
              [_renderSlot2(_ctx.$slots, 'append')],
              2
              /* CLASS */
            ))
          : _createCommentVNode2('v-if', true),
        _createCommentVNode2(
          ' \u5B57\u6570\u7EDF\u8BA1 (Textarea \u5916\u90E8\u53F3\u4E0B\u89D2) '
        ),
        $setup.showWordLimitCount && $setup.isTextarea
          ? (_openBlock2(),
            _createElementBlock2(
              'span',
              {
                key: 2,
                class: _normalizeClass2([$setup.ns.e('count'), $setup.ns.em('count', 'textarea')])
              },
              _toDisplayString2($setup.textLength) + ' / ' + _toDisplayString2($props.maxlength),
              3
              /* TEXT, CLASS */
            ))
          : _createCommentVNode2('v-if', true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
var __sfc__2 = /* @__PURE__ */ Object.assign(
  {
    name: 'YhInput'
  },
  {
    __name: 'input',
    props: {
      modelValue: { type: [String, Number], required: false },
      type: { type: null, required: false, default: 'text' },
      size: { type: null, required: false, default: void 0 },
      variant: { type: null, required: false, default: 'default' },
      status: { type: null, required: false, default: '' },
      loading: { type: Boolean, required: false, default: false },
      placeholder: { type: String, required: false },
      disabled: { type: Boolean, required: false, default: false },
      readonly: { type: Boolean, required: false, default: false },
      clearable: { type: Boolean, required: false, default: false },
      clearOnEscape: { type: Boolean, required: false, default: false },
      selectOnFocus: { type: Boolean, required: false, default: false },
      showPassword: { type: Boolean, required: false, default: false },
      showWordLimit: { type: Boolean, required: false, default: false },
      countConfig: { type: Object, required: false },
      maxlength: { type: [Number, String], required: false },
      minlength: { type: [Number, String], required: false },
      prefixIcon: { type: null, required: false },
      suffixIcon: { type: null, required: false },
      clearIcon: { type: null, required: false },
      prefix: { type: String, required: false },
      suffix: { type: String, required: false },
      list: { type: String, required: false },
      autofocus: { type: Boolean, required: false, default: false },
      autocomplete: { type: String, required: false, default: 'off' },
      name: { type: String, required: false },
      form: { type: String, required: false },
      id: { type: String, required: false },
      tabindex: { type: [String, Number], required: false },
      ariaLabel: { type: String, required: false, default: void 0 },
      label: { type: String, required: false, default: void 0 },
      inputmode: { type: String, required: false, default: void 0 },
      modelModifiers: { type: Object, required: false, default: () => ({}) },
      validateEvent: { type: Boolean, required: false, default: true },
      inputStyle: { type: [String, Object], required: false },
      formatter: { type: Function, required: false },
      parser: { type: Function, required: false },
      rows: { type: Number, required: false, default: 2 },
      autosize: { type: [Boolean, Object], required: false },
      resize: { type: String, required: false },
      themeOverrides: { type: null, required: false }
    },
    emits: [
      'update:modelValue',
      'input',
      'change',
      'focus',
      'blur',
      'clear',
      'keydown',
      'keyup',
      'compositionstart',
      'compositionupdate',
      'compositionend'
    ],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const slots = useSlots()
      const ns = useNamespace('input')
      const { t } = useLocale()
      const inputRef = ref13()
      const textareaRef = ref13()
      const wrapperRef = ref13()
      const { form, formItem, validate: triggerValidate } = useFormItem()
      const { themeStyle } = useComponentTheme(
        'input',
        computed12(() => props.themeOverrides)
      )
      const { globalSize } = useConfig()
      const inputSize = computed12(
        () =>
          props.size ||
          (formItem == null ? void 0 : formItem.size) ||
          (form == null ? void 0 : form.size) ||
          globalSize.value ||
          'default'
      )
      const focused = ref13(false)
      const hovering = ref13(false)
      const isComposing = ref13(false)
      const passwordVisible = ref13(false)
      const textareaCalcStyle = ref13({})
      const inputOrTextarea = computed12(() => inputRef.value || textareaRef.value)
      const isTextarea = computed12(() => props.type === 'textarea')
      const nativeInputValue = computed12(() => {
        const value =
          props.modelValue === null || props.modelValue === void 0 ? '' : String(props.modelValue)
        if (props.formatter && !isTextarea.value) {
          return props.formatter(value)
        }
        return value
      })
      const showClear = computed12(
        () =>
          props.clearable &&
          !props.disabled &&
          !props.readonly &&
          !!nativeInputValue.value &&
          (focused.value || hovering.value)
      )
      const showPasswordIcon = computed12(
        () => props.showPassword && !props.disabled && !props.readonly && !!nativeInputValue.value
      )
      const textLength = computed12(() => {
        var _a2
        const value =
          props.modelValue === null || props.modelValue === void 0 ? '' : String(props.modelValue)
        if ((_a2 = props.countConfig) == null ? void 0 : _a2.calculate) {
          return props.countConfig.calculate(value)
        }
        return value.length
      })
      const showWordLimitCount = computed12(
        () =>
          props.showWordLimit &&
          !!props.maxlength &&
          (props.type === 'text' || props.type === 'textarea') &&
          !props.disabled &&
          !props.readonly
      )
      const inputExceed = computed12(
        () => showWordLimitCount.value && textLength.value > Number(props.maxlength)
      )
      const isLoading = computed12(() => props.loading && !props.disabled)
      const hasPrepend = computed12(() => !!slots.prepend)
      const hasAppend = computed12(() => !!slots.append)
      const hasPrefix = computed12(() => !!slots.prefix || !!props.prefixIcon || !!props.prefix)
      const hasSuffix = computed12(
        () =>
          !!slots.suffix ||
          !!props.suffixIcon ||
          !!props.suffix ||
          showClear.value ||
          showPasswordIcon.value ||
          isLoading.value
      )
      const mergedStatus = computed12(() => {
        if (props.status) return props.status
        if ((formItem == null ? void 0 : formItem.validateStatus) === 'error') return 'error'
        if ((formItem == null ? void 0 : formItem.validateStatus) === 'success') return 'success'
        return ''
      })
      const wrapperClasses = computed12(() => [
        ns.b(),
        ns.m(inputSize.value),
        ns.is('disabled', props.disabled),
        ns.is('focused', focused.value),
        ns.is('textarea', isTextarea.value),
        ns.is('exceed', inputExceed.value),
        ns.is('loading', isLoading.value),
        // Feature 1: Variant
        props.variant && props.variant !== 'default' ? ns.m(`variant-${props.variant}`) : '',
        // Feature 3: Status
        mergedStatus.value ? ns.m(`status-${mergedStatus.value}`) : '',
        {
          [ns.b('group')]: hasPrepend.value || hasAppend.value,
          [ns.is('prepend')]: hasPrepend.value,
          [ns.is('append')]: hasAppend.value
        }
      ])
      const wrapperStyle = computed12(() => __spreadValues3({}, themeStyle.value))
      const inputClasses = computed12(() => [ns.e('inner'), ns.is('disabled', props.disabled)])
      const textareaStyle = computed12(() => {
        return [props.inputStyle, textareaCalcStyle.value, { resize: props.resize }]
      })
      const setNativeInputValue = () => {
        const input = inputOrTextarea.value
        if (!input || input.value === nativeInputValue.value) return
        input.value = nativeInputValue.value
      }
      const handleInput = (event) => {
        var _a2, _b
        const target = event.target
        let value = target.value
        if (isComposing.value) return
        if (props.parser) {
          value = props.parser(value)
        }
        if ((_a2 = props.modelModifiers) == null ? void 0 : _a2.trim) {
          value = value.trim()
        }
        if ((_b = props.modelModifiers) == null ? void 0 : _b.number) {
          const n = parseFloat(value)
          emit('update:modelValue', isNaN(n) ? value : n)
          emit('input', isNaN(n) ? value : n)
        } else {
          emit('update:modelValue', value)
          emit('input', value)
        }
      }
      const handleChange = (event) => {
        const target = event.target
        emit('change', target.value)
        if (props.validateEvent) {
          nextTick2(() => {
            triggerValidate('change')
          })
        }
      }
      const handleFocus = (event) => {
        focused.value = true
        emit('focus', event)
        if (props.selectOnFocus) {
          nextTick2(() => {
            var _a2
            ;(_a2 = inputOrTextarea.value) == null ? void 0 : _a2.select()
          })
        }
      }
      const handleBlur = (event) => {
        focused.value = false
        emit('blur', event)
        if (props.validateEvent) {
          nextTick2(() => {
            triggerValidate('blur')
          })
        }
      }
      const handleMouseEnter = () => {
        hovering.value = true
      }
      const handleMouseLeave = () => {
        hovering.value = false
      }
      const handleClear = () => {
        emit('update:modelValue', '')
        emit('change', '')
        emit('clear')
        emit('input', '')
        const input = inputOrTextarea.value
        if (input) {
          input.value = ''
        }
        nextTick2(() => {
          focus()
        })
      }
      const handleKeydown = (event) => {
        if (props.clearOnEscape && event.key === 'Escape' && !props.disabled && !props.readonly) {
          handleClear()
        }
        emit('keydown', event)
      }
      const handleKeyup = (event) => {
        emit('keyup', event)
      }
      const handlePasswordToggle = () => {
        passwordVisible.value = !passwordVisible.value
        nextTick2(() => {
          focus()
        })
      }
      const handleCompositionStart = (event) => {
        isComposing.value = true
        emit('compositionstart', event)
      }
      const handleCompositionUpdate = (event) => {
        emit('compositionupdate', event)
      }
      const handleCompositionEnd = (event) => {
        if (isComposing.value) {
          isComposing.value = false
          handleInput(event)
        }
        emit('compositionend', event)
      }
      const focus = () => {
        var _a2
        ;(_a2 = inputOrTextarea.value) == null ? void 0 : _a2.focus()
      }
      const blur = () => {
        var _a2
        ;(_a2 = inputOrTextarea.value) == null ? void 0 : _a2.blur()
      }
      const select = () => {
        var _a2
        ;(_a2 = inputOrTextarea.value) == null ? void 0 : _a2.select()
      }
      const clear = () => {
        handleClear()
      }
      const resizeTextarea = () => {
        const { type, autosize } = props
        if (type !== 'textarea') return
        if (!autosize) {
          textareaCalcStyle.value = {}
          return
        }
        const minRows = typeof autosize === 'object' ? autosize.minRows : void 0
        const maxRows = typeof autosize === 'object' ? autosize.maxRows : void 0
        const textarea = textareaRef.value
        if (!textarea) return
        const style = calcTextareaHeight(textarea, minRows, maxRows)
        textareaCalcStyle.value = {
          height: style.height,
          minHeight: style.minHeight
        }
      }
      watch5(
        () => props.modelValue,
        () => {
          nextTick2(() => {
            setNativeInputValue()
            resizeTextarea()
          })
        }
      )
      onMounted4(() => {
        setNativeInputValue()
        resizeTextarea()
        if (props.autofocus) {
          focus()
        }
      })
      __expose({
        ref: inputOrTextarea.value,
        wrapperRef: wrapperRef.value,
        focus,
        blur,
        select,
        clear,
        get textLength() {
          return textLength.value
        }
      })
      const __returned__ = {
        props,
        emit,
        slots,
        ns,
        t,
        inputRef,
        textareaRef,
        wrapperRef,
        form,
        formItem,
        triggerValidate,
        themeStyle,
        globalSize,
        inputSize,
        focused,
        hovering,
        isComposing,
        passwordVisible,
        textareaCalcStyle,
        inputOrTextarea,
        isTextarea,
        nativeInputValue,
        showClear,
        showPasswordIcon,
        textLength,
        showWordLimitCount,
        inputExceed,
        isLoading,
        hasPrepend,
        hasAppend,
        hasPrefix,
        hasSuffix,
        mergedStatus,
        wrapperClasses,
        wrapperStyle,
        inputClasses,
        textareaStyle,
        setNativeInputValue,
        handleInput,
        handleChange,
        handleFocus,
        handleBlur,
        handleMouseEnter,
        handleMouseLeave,
        handleClear,
        handleKeydown,
        handleKeyup,
        handlePasswordToggle,
        handleCompositionStart,
        handleCompositionUpdate,
        handleCompositionEnd,
        focus,
        blur,
        select,
        clear,
        resizeTextarea,
        computed: computed12,
        ref: ref13,
        watch: watch5,
        nextTick: nextTick2,
        useSlots,
        onMounted: onMounted4,
        get useNamespace() {
          return useNamespace
        },
        get useFormItem() {
          return useFormItem
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
        get calcTextareaHeight() {
          return calcTextareaHeight
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__2.render = render2
var stdin_default4 = __sfc__2

// public/codesandbox-runtime/components/input/index.js
var YhInput = withInstall(stdin_default4)

// public/codesandbox-runtime/components/radio/src/radio.js
import {
  createCommentVNode as _createCommentVNode3,
  normalizeClass as _normalizeClass3,
  openBlock as _openBlock3,
  createElementBlock as _createElementBlock3,
  createElementVNode as _createElementVNode3,
  renderSlot as _renderSlot3,
  toDisplayString as _toDisplayString3,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle3
} from 'vue'
import { computed as computed13, ref as ref14, inject as inject7 } from 'vue'

// public/codesandbox-runtime/components/radio/src/radio-meta.js
var radioGroupContextKey = Symbol('radioGroupContextKey')

// public/codesandbox-runtime/components/radio/src/radio.js
var _hoisted_13 = ['name', 'id', 'tabindex', 'disabled', 'checked', 'value']
function render3(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock3(),
    _createElementBlock3(
      'label',
      {
        class: _normalizeClass3($setup.radioClasses),
        style: _normalizeStyle3($setup.themeStyle),
        onMouseenter: _cache[0] || (_cache[0] = ($event) => ($setup.hovering = true)),
        onMouseleave: _cache[1] || (_cache[1] = ($event) => ($setup.hovering = false))
      },
      [
        _createElementVNode3(
          'span',
          {
            class: _normalizeClass3($setup.ns.e('input'))
          },
          [
            _createElementVNode3(
              'span',
              {
                class: _normalizeClass3($setup.innerClasses)
              },
              [
                _createCommentVNode3(' \u9009\u4E2D\u5706\u70B9 '),
                $setup.isChecked
                  ? (_openBlock3(),
                    _createElementBlock3(
                      'span',
                      {
                        key: 0,
                        class: _normalizeClass3($setup.ns.e('dot'))
                      },
                      null,
                      2
                      /* CLASS */
                    ))
                  : _createCommentVNode3('v-if', true)
              ],
              2
              /* CLASS */
            ),
            _createElementVNode3(
              'input',
              {
                ref: 'inputRef',
                class: _normalizeClass3($setup.ns.e('original')),
                type: 'radio',
                name: $setup.radioName,
                id: $props.id,
                tabindex: $props.tabindex,
                disabled: $setup.isDisabled,
                checked: $setup.isChecked,
                value: $props.value,
                onChange: $setup.handleChange,
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur
              },
              null,
              42,
              _hoisted_13
            )
          ],
          2
          /* CLASS */
        ),
        _ctx.$slots.default || $props.label
          ? (_openBlock3(),
            _createElementBlock3(
              'span',
              {
                key: 0,
                class: _normalizeClass3($setup.ns.e('label'))
              },
              [
                _renderSlot3(_ctx.$slots, 'default', {}, () => [
                  _createTextVNode(
                    _toDisplayString3($props.label),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode3('v-if', true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
var __sfc__3 = /* @__PURE__ */ Object.assign(
  {
    name: 'YhRadio'
  },
  {
    __name: 'radio',
    props: {
      modelValue: { type: [String, Number, Boolean], required: false },
      value: { type: [String, Number, Boolean], required: false },
      name: { type: String, required: false },
      label: { type: String, required: false },
      size: { type: null, required: false },
      disabled: { type: Boolean, required: false, default: false },
      border: { type: Boolean, required: false, default: false },
      id: { type: String, required: false },
      tabindex: { type: [String, Number], required: false },
      themeOverrides: { type: null, required: false }
    },
    emits: ['update:modelValue', 'change'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('radio')
      const radioGroup = inject7(radioGroupContextKey, void 0)
      const { themeStyle } = useComponentTheme(
        'radio',
        computed13(
          () => props.themeOverrides || (radioGroup == null ? void 0 : radioGroup.themeOverrides)
        )
      )
      const inputRef = ref14()
      const focused = ref14(false)
      const hovering = ref14(false)
      const isGroup = computed13(() => !!radioGroup)
      const radioSize = computed13(() => {
        return props.size || (radioGroup == null ? void 0 : radioGroup.size) || 'default'
      })
      const isDisabled = computed13(() => {
        return props.disabled || (radioGroup == null ? void 0 : radioGroup.disabled) || false
      })
      const radioName = computed13(() => {
        return props.name || (radioGroup == null ? void 0 : radioGroup.name) || ''
      })
      const isChecked = computed13(() => {
        var _a2
        const value = (_a2 = props.value) != null ? _a2 : props.label
        if (isGroup.value && radioGroup) {
          return radioGroup.modelValue === value
        }
        return props.modelValue === value
      })
      const radioClasses = computed13(() => [
        ns.b(),
        radioSize.value !== 'default' ? ns.m(radioSize.value) : '',
        ns.is('disabled', isDisabled.value),
        ns.is('checked', isChecked.value),
        ns.is('focused', focused.value),
        ns.is('bordered', props.border)
      ])
      const innerClasses = computed13(() => [
        ns.e('inner'),
        ns.is('checked', isChecked.value),
        ns.is('disabled', isDisabled.value)
      ])
      const handleChange = () => {
        var _a2
        if (isDisabled.value) return
        const value = props.value
        if (isGroup.value && radioGroup) {
          ;(_a2 = radioGroup.changeEvent) == null ? void 0 : _a2.call(radioGroup, value)
        } else {
          emit('update:modelValue', value)
          emit('change', value)
        }
      }
      const handleFocus = () => {
        focused.value = true
      }
      const handleBlur = () => {
        focused.value = false
      }
      const focus = () => {
        var _a2
        ;(_a2 = inputRef.value) == null ? void 0 : _a2.focus()
      }
      const blur = () => {
        var _a2
        ;(_a2 = inputRef.value) == null ? void 0 : _a2.blur()
      }
      __expose({
        ref: inputRef.value,
        focus,
        blur
      })
      const __returned__ = {
        props,
        emit,
        ns,
        radioGroup,
        themeStyle,
        inputRef,
        focused,
        hovering,
        isGroup,
        radioSize,
        isDisabled,
        radioName,
        isChecked,
        radioClasses,
        innerClasses,
        handleChange,
        handleFocus,
        handleBlur,
        focus,
        blur,
        computed: computed13,
        ref: ref14,
        inject: inject7,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get radioGroupContextKey() {
          return radioGroupContextKey
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__3.render = render3
var stdin_default5 = __sfc__3

// public/codesandbox-runtime/components/radio/src/radio-group.js
import {
  renderSlot as _renderSlot4,
  renderList as _renderList,
  Fragment as _Fragment2,
  openBlock as _openBlock4,
  createElementBlock as _createElementBlock4,
  createBlock as _createBlock3,
  createCommentVNode as _createCommentVNode4,
  resolveDynamicComponent as _resolveDynamicComponent2,
  normalizeClass as _normalizeClass4,
  normalizeStyle as _normalizeStyle4,
  withCtx as _withCtx2
} from 'vue'
import { computed as computed14, provide as provide2, toRefs } from 'vue'
function render4(_ctx, _cache, $props, $setup, $data, $options) {
  var _a2, _b, _c
  return (
    _openBlock4(),
    _createBlock3(
      _resolveDynamicComponent2($props.tag),
      {
        class: _normalizeClass4($setup.groupClasses),
        style: _normalizeStyle4($setup.themeStyle),
        role: 'radiogroup',
        'aria-labelledby': $setup.labelId,
        'aria-invalid': ((_a2 = $setup.formItem) == null ? void 0 : _a2.validateStatus) === 'error',
        'aria-describedby':
          ((_b = $setup.formItem) == null ? void 0 : _b.validateStatus) === 'error'
            ? (_c = $setup.formItem) == null
              ? void 0
              : _c.errorId
            : void 0
      },
      {
        default: _withCtx2(() => [
          _renderSlot4(_ctx.$slots, 'default', {}, () => [
            $props.options && $props.options.length
              ? (_openBlock4(true),
                _createElementBlock4(
                  _Fragment2,
                  { key: 0 },
                  _renderList($props.options, (item) => {
                    return (
                      _openBlock4(),
                      _createBlock3(
                        $setup['YhRadio'],
                        {
                          key: String(item.value),
                          value: item.value,
                          label: item.label,
                          disabled: item.disabled
                        },
                        null,
                        8,
                        ['value', 'label', 'disabled']
                      )
                    )
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              : _createCommentVNode4('v-if', true)
          ])
        ]),
        _: 3
        /* FORWARDED */
      },
      8,
      ['class', 'style', 'aria-labelledby', 'aria-invalid', 'aria-describedby']
    )
  )
}
var __sfc__4 = /* @__PURE__ */ Object.assign(
  {
    name: 'YhRadioGroup'
  },
  {
    __name: 'radio-group',
    props: {
      modelValue: { type: [String, Number, Boolean], required: false },
      options: { type: Array, required: false },
      size: { type: null, required: false },
      disabled: { type: Boolean, required: false, default: false },
      name: { type: String, required: false },
      validateEvent: { type: Boolean, required: false, default: true },
      textColor: { type: String, required: false },
      fill: { type: String, required: false },
      tag: { type: null, required: false, default: 'div' },
      themeOverrides: { type: null, required: false }
    },
    emits: ['update:modelValue', 'change'],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('radio-group')
      const { themeStyle } = useComponentTheme(
        'radio-group',
        computed14(() => props.themeOverrides)
      )
      const { formItem } = useFormItem()
      const { validate } = useFormItem()
      const labelId = useId().value
      const { globalSize } = useConfig()
      const changeEvent = (value) => {
        emit('update:modelValue', value)
        emit('change', value)
        if (props.validateEvent) {
          validate('change')
        }
      }
      const { modelValue, size, disabled, name, fill, textColor } = toRefs(props)
      provide2(radioGroupContextKey, {
        get modelValue() {
          return modelValue.value
        },
        get size() {
          return (size == null ? void 0 : size.value) || globalSize.value || 'default'
        },
        get disabled() {
          return disabled.value
        },
        get name() {
          return name == null ? void 0 : name.value
        },
        get fill() {
          return fill == null ? void 0 : fill.value
        },
        get textColor() {
          return textColor == null ? void 0 : textColor.value
        },
        get themeOverrides() {
          return props.themeOverrides
        },
        changeEvent
      })
      const groupSize = computed14(() => props.size || globalSize.value || 'default')
      const groupClasses = computed14(() => [
        ns.b(),
        groupSize.value !== 'default' ? ns.m(groupSize.value) : ''
      ])
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        formItem,
        validate,
        labelId,
        globalSize,
        changeEvent,
        modelValue,
        size,
        disabled,
        name,
        fill,
        textColor,
        groupSize,
        groupClasses,
        computed: computed14,
        provide: provide2,
        toRefs,
        get useNamespace() {
          return useNamespace
        },
        get useFormItem() {
          return useFormItem
        },
        get useId() {
          return useId
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get useConfig() {
          return useConfig
        },
        YhRadio: stdin_default5,
        get radioGroupContextKey() {
          return radioGroupContextKey
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__4.render = render4
var stdin_default6 = __sfc__4

// public/codesandbox-runtime/components/radio/src/radio-button.js
import {
  normalizeClass as _normalizeClass5,
  createElementVNode as _createElementVNode4,
  renderSlot as _renderSlot5,
  toDisplayString as _toDisplayString4,
  createTextVNode as _createTextVNode2,
  normalizeStyle as _normalizeStyle5,
  openBlock as _openBlock5,
  createElementBlock as _createElementBlock5
} from 'vue'
import { computed as computed15, ref as ref15, inject as inject8 } from 'vue'
var _hoisted_14 = ['name', 'id', 'tabindex', 'disabled', 'checked', 'value']
function render5(_ctx, _cache, $props, $setup, $data, $options) {
  var _a2
  return (
    _openBlock5(),
    _createElementBlock5(
      'label',
      {
        class: _normalizeClass5($setup.buttonClasses),
        style: _normalizeStyle5([$setup.activeStyle, $setup.themeStyle])
      },
      [
        _createElementVNode4(
          'input',
          {
            ref: 'inputRef',
            class: _normalizeClass5($setup.ns.e('original')),
            type: 'radio',
            name: $setup.radioName,
            id: $props.id,
            tabindex: $props.tabindex,
            disabled: $setup.isDisabled,
            checked: $setup.isChecked,
            value: (_a2 = $props.value) != null ? _a2 : $props.label,
            onChange: $setup.handleChange,
            onFocus: $setup.handleFocus,
            onBlur: $setup.handleBlur
          },
          null,
          42,
          _hoisted_14
        ),
        _createElementVNode4(
          'span',
          {
            class: _normalizeClass5($setup.ns.e('inner'))
          },
          [
            _renderSlot5(_ctx.$slots, 'default', {}, () => [
              _createTextVNode2(
                _toDisplayString4($props.label),
                1
                /* TEXT */
              )
            ])
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
  {
    name: 'YhRadioButton'
  },
  {
    __name: 'radio-button',
    props: {
      modelValue: { type: [String, Number, Boolean], required: false },
      value: { type: [String, Number, Boolean], required: false },
      name: { type: String, required: false },
      label: { type: String, required: false },
      size: { type: null, required: false },
      disabled: { type: Boolean, required: false, default: false },
      id: { type: String, required: false },
      tabindex: { type: [String, Number], required: false },
      themeOverrides: { type: null, required: false }
    },
    emits: ['update:modelValue', 'change'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('radio-button')
      const radioGroup = inject8(radioGroupContextKey, void 0)
      const { themeStyle } = useComponentTheme(
        'radio-button',
        computed15(
          () => props.themeOverrides || (radioGroup == null ? void 0 : radioGroup.themeOverrides)
        )
      )
      const inputRef = ref15()
      const focused = ref15(false)
      const isGroup = computed15(() => !!radioGroup)
      const buttonSize = computed15(() => {
        return props.size || (radioGroup == null ? void 0 : radioGroup.size) || 'default'
      })
      const isDisabled = computed15(() => {
        return props.disabled || (radioGroup == null ? void 0 : radioGroup.disabled) || false
      })
      const radioName = computed15(() => {
        return props.name || (radioGroup == null ? void 0 : radioGroup.name) || ''
      })
      const isChecked = computed15(() => {
        var _a2
        const value = (_a2 = props.value) != null ? _a2 : props.label
        if (isGroup.value && radioGroup) {
          return radioGroup.modelValue === value
        }
        return props.modelValue === value
      })
      const activeStyle = computed15(() => {
        if (!isChecked.value) return {}
        const style = {}
        if (radioGroup == null ? void 0 : radioGroup.fill) {
          style['--yh-radio-button-checked-bg-color'] = radioGroup.fill
          style['--yh-radio-button-checked-border-color'] = radioGroup.fill
        }
        if (radioGroup == null ? void 0 : radioGroup.textColor) {
          style['--yh-radio-button-checked-text-color'] = radioGroup.textColor
        }
        return style
      })
      const buttonClasses = computed15(() => [
        ns.b(),
        buttonSize.value !== 'default' ? ns.m(buttonSize.value) : '',
        ns.is('disabled', isDisabled.value),
        ns.is('checked', isChecked.value),
        ns.is('focused', focused.value)
      ])
      const handleChange = () => {
        var _a2, _b
        if (isDisabled.value) return
        const value = (_a2 = props.value) != null ? _a2 : props.label
        if (isGroup.value && radioGroup) {
          ;(_b = radioGroup.changeEvent) == null ? void 0 : _b.call(radioGroup, value)
        } else {
          emit('update:modelValue', value)
          emit('change', value)
        }
      }
      const handleFocus = () => {
        focused.value = true
      }
      const handleBlur = () => {
        focused.value = false
      }
      const focus = () => {
        var _a2
        ;(_a2 = inputRef.value) == null ? void 0 : _a2.focus()
      }
      const blur = () => {
        var _a2
        ;(_a2 = inputRef.value) == null ? void 0 : _a2.blur()
      }
      __expose({
        ref: inputRef.value,
        focus,
        blur
      })
      const __returned__ = {
        props,
        emit,
        ns,
        radioGroup,
        themeStyle,
        inputRef,
        focused,
        isGroup,
        buttonSize,
        isDisabled,
        radioName,
        isChecked,
        activeStyle,
        buttonClasses,
        handleChange,
        handleFocus,
        handleBlur,
        focus,
        blur,
        computed: computed15,
        ref: ref15,
        inject: inject8,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get radioGroupContextKey() {
          return radioGroupContextKey
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__5.render = render5
var stdin_default7 = __sfc__5

// public/codesandbox-runtime/components/radio/index.js
var YhRadio = withInstall(stdin_default5)
var YhRadioGroup = withInstall(stdin_default6)
var YhRadioButton = withInstall(stdin_default7)

// public/codesandbox-runtime/components/gantt-chart/src/gantt-chart.js
var __defProp4 = Object.defineProperty
var __defProps = Object.defineProperties
var __getOwnPropDescs = Object.getOwnPropertyDescriptors
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b))
var _hoisted_15 = { style: { 'font-size': '12px', color: 'var(--yh-text-color-secondary)' } }
var _hoisted_23 = ['min']
var _hoisted_33 = ['onClick']
var _hoisted_42 = {
  key: 1,
  style: { display: 'inline-block', width: '14px' }
}
var _hoisted_5 = {
  key: 0,
  style: { overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }
}
var _hoisted_6 = ['d']
var _hoisted_7 = ['onClick', 'onDblclick', 'onMousedown']
var _hoisted_8 = ['onMousedown']
var _hoisted_9 = ['onMousedown']
function render6(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock6(),
    _createElementBlock6(
      'div',
      {
        ref: 'ganttRef',
        class: _normalizeClass6([
          $setup.ns.b(),
          $setup.ns.is('bordered', $props.bordered),
          $setup.ns.is('loading', $props.loading)
        ]),
        style: _normalizeStyle6($setup.themeStyle)
      },
      [
        _createElementVNode5(
          'div',
          {
            class: _normalizeClass6($setup.ns.e('toolbar'))
          },
          [
            _createElementVNode5(
              'div',
              {
                class: _normalizeClass6($setup.ns.e('toolbar-left'))
              },
              [
                _createVNode2(
                  $setup['YhInput'],
                  {
                    id: 'gantt-search-input',
                    modelValue: $setup.searchKeyword,
                    'onUpdate:modelValue':
                      _cache[0] || (_cache[0] = ($event) => ($setup.searchKeyword = $event)),
                    placeholder: $setup.ganttSearchPlaceholder,
                    'prefix-icon': 'search',
                    size: 'small',
                    style: { width: '200px' }
                  },
                  null,
                  8,
                  ['modelValue', 'placeholder']
                )
              ],
              2
              /* CLASS */
            ),
            _createElementVNode5(
              'div',
              {
                class: _normalizeClass6($setup.ns.e('toolbar-right'))
              },
              [
                _createElementVNode5(
                  'span',
                  _hoisted_15,
                  _toDisplayString5($setup.ganttZoomText),
                  1
                  /* TEXT */
                ),
                _withDirectives2(
                  _createElementVNode5(
                    'input',
                    {
                      type: 'range',
                      'onUpdate:modelValue':
                        _cache[1] || (_cache[1] = ($event) => ($setup.PIXELS_PER_DAY = $event)),
                      min: $setup.minPixelsPerDay,
                      max: '100',
                      step: '0.5',
                      style: { width: '80px' }
                    },
                    null,
                    8,
                    _hoisted_23
                  ),
                  [[_vModelText, $setup.PIXELS_PER_DAY, void 0, { number: true }]]
                ),
                _createVNode2(
                  $setup['YhRadioGroup'],
                  {
                    modelValue: $setup.internalViewMode,
                    'onUpdate:modelValue':
                      _cache[2] || (_cache[2] = ($event) => ($setup.internalViewMode = $event)),
                    size: 'small',
                    type: 'button',
                    name: 'gantt-view-switcher'
                  },
                  {
                    default: _withCtx3(() => [
                      _createVNode2(
                        $setup['YhRadioButton'],
                        { value: 'day' },
                        {
                          default: _withCtx3(() => [
                            _createTextVNode3(
                              _toDisplayString5($setup.t('ganttchart.day')),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        }
                      ),
                      _createVNode2(
                        $setup['YhRadioButton'],
                        { value: 'week' },
                        {
                          default: _withCtx3(() => [
                            _createTextVNode3(
                              _toDisplayString5($setup.t('ganttchart.week')),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        }
                      ),
                      _createVNode2(
                        $setup['YhRadioButton'],
                        { value: 'month' },
                        {
                          default: _withCtx3(() => [
                            _createTextVNode3(
                              _toDisplayString5($setup.t('ganttchart.month')),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        }
                      ),
                      _createVNode2(
                        $setup['YhRadioButton'],
                        { value: 'year' },
                        {
                          default: _withCtx3(() => [
                            _createTextVNode3(
                              _toDisplayString5($setup.t('ganttchart.year')),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        }
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  },
                  8,
                  ['modelValue']
                )
              ],
              2
              /* CLASS */
            )
          ],
          2
          /* CLASS */
        ),
        _createElementVNode5(
          'div',
          {
            class: _normalizeClass6($setup.ns.e('main'))
          },
          [
            _createElementVNode5(
              'div',
              {
                class: _normalizeClass6($setup.ns.e('sidebar'))
              },
              [
                _createElementVNode5(
                  'div',
                  {
                    ref: 'sidebarHeaderRef',
                    class: _normalizeClass6($setup.ns.e('sidebar-header-wrapper')),
                    style: _normalizeStyle6({
                      height: `${$props.headerHeight}px`
                    })
                  },
                  [
                    _createElementVNode5(
                      'div',
                      {
                        class: _normalizeClass6($setup.ns.e('sidebar-header'))
                      },
                      [
                        (_openBlock6(true),
                        _createElementBlock6(
                          _Fragment3,
                          null,
                          _renderList2($setup.resolvedColumns, (col) => {
                            return (
                              _openBlock6(),
                              _createElementBlock6(
                                'div',
                                {
                                  key: col.prop,
                                  class: _normalizeClass6($setup.ns.e('sidebar-header-cell')),
                                  style: _normalizeStyle6({
                                    width:
                                      typeof col.width === 'number' ? `${col.width}px` : col.width
                                  })
                                },
                                _toDisplayString5(col.label),
                                7
                                /* TEXT, CLASS, STYLE */
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
                  ],
                  6
                  /* CLASS, STYLE */
                ),
                _createElementVNode5(
                  'div',
                  {
                    ref: 'sidebarBodyRef',
                    class: _normalizeClass6($setup.ns.e('sidebar-body')),
                    onScroll: $setup.handleBodyScroll
                  },
                  [
                    $props.virtual
                      ? (_openBlock6(),
                        _createElementBlock6(
                          'div',
                          {
                            key: 0,
                            style: _normalizeStyle6({
                              height: `${$setup.virtualState.offsetTop}px`
                            })
                          },
                          null,
                          4
                          /* STYLE */
                        ))
                      : _createCommentVNode5('v-if', true),
                    (_openBlock6(true),
                    _createElementBlock6(
                      _Fragment3,
                      null,
                      _renderList2($setup.renderTasks, (task, index) => {
                        return (
                          _openBlock6(),
                          _createElementBlock6(
                            'div',
                            {
                              key: task.id,
                              class: _normalizeClass6($setup.ns.e('row')),
                              style: _normalizeStyle6({
                                height: `${$props.rowHeight}px`
                              })
                            },
                            [
                              (_openBlock6(true),
                              _createElementBlock6(
                                _Fragment3,
                                null,
                                _renderList2($setup.resolvedColumns, (col) => {
                                  return (
                                    _openBlock6(),
                                    _createElementBlock6(
                                      'div',
                                      {
                                        key: col.prop,
                                        class: _normalizeClass6($setup.ns.e('cell')),
                                        style: _normalizeStyle6({
                                          width:
                                            typeof col.width === 'number'
                                              ? `${col.width}px`
                                              : col.width
                                        })
                                      },
                                      [
                                        _renderSlot6(
                                          _ctx.$slots,
                                          'table-cell',
                                          {
                                            row: task,
                                            column: col,
                                            index
                                          },
                                          () => [
                                            col.prop === $setup.resolvedColumns[0].prop
                                              ? (_openBlock6(),
                                                _createElementBlock6(
                                                  'span',
                                                  {
                                                    key: 0,
                                                    class: _normalizeClass6(
                                                      $setup.ns.e('tree-node')
                                                    )
                                                  },
                                                  [
                                                    (_openBlock6(true),
                                                    _createElementBlock6(
                                                      _Fragment3,
                                                      null,
                                                      _renderList2(
                                                        task._ancestorHasNext,
                                                        (hasNext, i) => {
                                                          return (
                                                            _openBlock6(),
                                                            _createElementBlock6(
                                                              'span',
                                                              {
                                                                key: i,
                                                                class: _normalizeClass6([
                                                                  $setup.ns.e('tree-indent'),
                                                                  $setup.ns.is('last', !hasNext)
                                                                ])
                                                              },
                                                              null,
                                                              2
                                                              /* CLASS */
                                                            )
                                                          )
                                                        }
                                                      ),
                                                      128
                                                      /* KEYED_FRAGMENT */
                                                    )),
                                                    _createElementVNode5(
                                                      'span',
                                                      {
                                                        class: _normalizeClass6([
                                                          $setup.ns.e('tree-indent'),
                                                          $setup.ns.is('last', task._isLast)
                                                        ])
                                                      },
                                                      [
                                                        _createElementVNode5(
                                                          'span',
                                                          {
                                                            class: _normalizeClass6(
                                                              $setup.ns.e('tree-content')
                                                            )
                                                          },
                                                          [
                                                            task._hasChildren
                                                              ? (_openBlock6(),
                                                                _createElementBlock6(
                                                                  'span',
                                                                  {
                                                                    key: 0,
                                                                    class: _normalizeClass6([
                                                                      $setup.ns.e('tree-arrow'),
                                                                      $setup.expandedTasks.has(
                                                                        task.id
                                                                      ) && 'is-expanded'
                                                                    ]),
                                                                    onClick: _withModifiers2(
                                                                      ($event) =>
                                                                        $setup.toggleExpand(task),
                                                                      ['stop']
                                                                    )
                                                                  },
                                                                  [
                                                                    ...(_cache[3] ||
                                                                      (_cache[3] = [
                                                                        _createElementVNode5(
                                                                          'svg',
                                                                          {
                                                                            viewBox:
                                                                              '0 0 1024 1024',
                                                                            width: '12',
                                                                            height: '12'
                                                                          },
                                                                          [
                                                                            _createElementVNode5(
                                                                              'path',
                                                                              {
                                                                                d: 'M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.936a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 533.376a30.592 30.592 0 0 0 0-42.752L382.592 149.312a29.12 29.12 0 0 0-41.728 0z'
                                                                              }
                                                                            )
                                                                          ],
                                                                          -1
                                                                          /* CACHED */
                                                                        )
                                                                      ]))
                                                                  ],
                                                                  10,
                                                                  _hoisted_33
                                                                ))
                                                              : (_openBlock6(),
                                                                _createElementBlock6(
                                                                  'span',
                                                                  _hoisted_42
                                                                )),
                                                            _createElementVNode5(
                                                              'span',
                                                              {
                                                                class: _normalizeClass6(
                                                                  $setup.ns.e('tree-line')
                                                                )
                                                              },
                                                              null,
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
                                                    )
                                                  ],
                                                  2
                                                  /* CLASS */
                                                ))
                                              : _createCommentVNode5('v-if', true),
                                            _createVNode2(
                                              $setup['YhTooltip'],
                                              {
                                                content: String(task[col.prop]),
                                                placement: 'top'
                                              },
                                              {
                                                default: _withCtx3(() => [
                                                  _createElementVNode5(
                                                    'span',
                                                    {
                                                      class: _normalizeClass6(
                                                        $setup.ns.e('cell-text')
                                                      )
                                                    },
                                                    _toDisplayString5(task[col.prop]),
                                                    3
                                                    /* TEXT, CLASS */
                                                  )
                                                ]),
                                                _: 2
                                                /* DYNAMIC */
                                              },
                                              1032,
                                              ['content']
                                            )
                                          ]
                                        )
                                      ],
                                      6
                                      /* CLASS, STYLE */
                                    )
                                  )
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ],
                            6
                            /* CLASS, STYLE */
                          )
                        )
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    $props.virtual
                      ? (_openBlock6(),
                        _createElementBlock6(
                          'div',
                          {
                            key: 1,
                            style: _normalizeStyle6({
                              height: `${$setup.totalHeight - ($setup.virtualState.offsetTop + $setup.renderTasks.length * $props.rowHeight)}px`
                            })
                          },
                          null,
                          4
                          /* STYLE */
                        ))
                      : _createCommentVNode5('v-if', true)
                  ],
                  34
                  /* CLASS, NEED_HYDRATION */
                )
              ],
              2
              /* CLASS */
            ),
            _createElementVNode5(
              'div',
              {
                class: _normalizeClass6($setup.ns.e('timeline'))
              },
              [
                _createElementVNode5(
                  'div',
                  {
                    class: _normalizeClass6($setup.ns.e('timeline-header')),
                    style: _normalizeStyle6({
                      height: `${$props.headerHeight}px`
                    })
                  },
                  [
                    _createElementVNode5(
                      'div',
                      {
                        class: _normalizeClass6($setup.ns.e('timeline-header-top')),
                        style: _normalizeStyle6({
                          height: `${$props.headerHeight / 2}px`,
                          width: `${$setup.timelineWidth}px`
                        })
                      },
                      [
                        (_openBlock6(true),
                        _createElementBlock6(
                          _Fragment3,
                          null,
                          _renderList2($setup.topHeaders, (th, i) => {
                            return (
                              _openBlock6(),
                              _createElementBlock6(
                                'div',
                                {
                                  key: i,
                                  class: _normalizeClass6($setup.ns.e('timeline-unit')),
                                  style: _normalizeStyle6({
                                    width: `${th.width}px`
                                  })
                                },
                                _toDisplayString5(th.label),
                                7
                                /* TEXT, CLASS, STYLE */
                              )
                            )
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      6
                      /* CLASS, STYLE */
                    ),
                    _createElementVNode5(
                      'div',
                      {
                        class: _normalizeClass6($setup.ns.e('timeline-header-bottom')),
                        style: _normalizeStyle6({
                          height: `${$props.headerHeight / 2}px`,
                          width: `${$setup.timelineWidth}px`
                        })
                      },
                      [
                        (_openBlock6(true),
                        _createElementBlock6(
                          _Fragment3,
                          null,
                          _renderList2($setup.bottomHeaders, (th, i) => {
                            return (
                              _openBlock6(),
                              _createElementBlock6(
                                'div',
                                {
                                  key: i,
                                  class: _normalizeClass6([
                                    $setup.ns.e('timeline-unit'),
                                    th.isToday ? $setup.ns.em('timeline-unit', 'today') : ''
                                  ]),
                                  style: _normalizeStyle6({
                                    width: `${th.width}px`
                                  })
                                },
                                [
                                  th.width > 20
                                    ? (_openBlock6(),
                                      _createElementBlock6(
                                        'span',
                                        _hoisted_5,
                                        _toDisplayString5(th.label),
                                        1
                                        /* TEXT */
                                      ))
                                    : _createCommentVNode5('v-if', true)
                                ],
                                6
                                /* CLASS, STYLE */
                              )
                            )
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      6
                      /* CLASS, STYLE */
                    )
                  ],
                  6
                  /* CLASS, STYLE */
                ),
                _createElementVNode5(
                  'div',
                  {
                    ref: 'timelineBodyRef',
                    class: _normalizeClass6($setup.ns.e('timeline-body')),
                    onScroll: $setup.handleBodyScroll
                  },
                  [
                    _createElementVNode5(
                      'div',
                      {
                        style: _normalizeStyle6({
                          width: `${$setup.timelineWidth}px`,
                          height: `${$setup.totalHeight}px`,
                          position: 'relative'
                        })
                      },
                      [
                        $props.virtual
                          ? (_openBlock6(),
                            _createElementBlock6(
                              'div',
                              {
                                key: 0,
                                style: _normalizeStyle6({
                                  height: `${$setup.virtualState.offsetTop}px`
                                })
                              },
                              null,
                              4
                              /* STYLE */
                            ))
                          : _createCommentVNode5('v-if', true),
                        _createElementVNode5(
                          'div',
                          {
                            class: _normalizeClass6($setup.ns.e('grid')),
                            style: _normalizeStyle6({
                              width: `${$setup.timelineWidth}px`,
                              height: `${$setup.totalHeight}px`
                            })
                          },
                          [
                            (_openBlock6(true),
                            _createElementBlock6(
                              _Fragment3,
                              null,
                              _renderList2($setup.bottomHeaders, (th, i) => {
                                return (
                                  _openBlock6(),
                                  _createElementBlock6(
                                    'div',
                                    {
                                      key: i,
                                      class: _normalizeClass6($setup.ns.e('grid-column')),
                                      style: _normalizeStyle6({
                                        width: `${th.width}px`
                                      })
                                    },
                                    null,
                                    6
                                    /* CLASS, STYLE */
                                  )
                                )
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ],
                          6
                          /* CLASS, STYLE */
                        ),
                        (_openBlock6(true),
                        _createElementBlock6(
                          _Fragment3,
                          null,
                          _renderList2($setup.renderTasks, (_, index) => {
                            return (
                              _openBlock6(),
                              _createElementBlock6(
                                'div',
                                {
                                  key: index,
                                  class: _normalizeClass6($setup.ns.e('timeline-row')),
                                  style: _normalizeStyle6({
                                    height: `${$props.rowHeight}px`,
                                    width: `${$setup.timelineWidth}px`
                                  })
                                },
                                null,
                                6
                                /* CLASS, STYLE */
                              )
                            )
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        )),
                        $props.showDependencies
                          ? (_openBlock6(),
                            _createElementBlock6(
                              'svg',
                              {
                                key: 1,
                                class: _normalizeClass6($setup.ns.e('dependency-svg')),
                                style: _normalizeStyle6({
                                  width: `${$setup.timelineWidth}px`,
                                  height: `${$setup.totalHeight}px`
                                })
                              },
                              [
                                (_openBlock6(true),
                                _createElementBlock6(
                                  _Fragment3,
                                  null,
                                  _renderList2($setup.dependenciesLinks, (link) => {
                                    return (
                                      _openBlock6(),
                                      _createElementBlock6(
                                        'path',
                                        {
                                          key: link.id,
                                          d: link.path,
                                          class: _normalizeClass6($setup.ns.e('dependency-path'))
                                        },
                                        null,
                                        10,
                                        _hoisted_6
                                      )
                                    )
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ],
                              6
                              /* CLASS, STYLE */
                            ))
                          : _createCommentVNode5('v-if', true),
                        (_openBlock6(true),
                        _createElementBlock6(
                          _Fragment3,
                          null,
                          _renderList2($setup.taskStyles, (ts) => {
                            return (
                              _openBlock6(),
                              _createBlock4(
                                $setup['YhTooltip'],
                                {
                                  key: ts.task.id,
                                  content: ts.isMilestone
                                    ? `${ts.task.name} (${$setup.ganttMilestoneText})`
                                    : ts.task.name,
                                  placement: 'top',
                                  class: _normalizeClass6([
                                    $setup.ns.e('task-wrapper'),
                                    $setup.ns.is('milestone', ts.isMilestone),
                                    $setup.ns.is('summary', ts.isSummary),
                                    ts.task.status ? $setup.ns.e(`task-${ts.task.status}`) : ''
                                  ]),
                                  style: _normalizeStyle6(ts.style),
                                  onMouseenter: ($event) => $setup.handleMouseEnter($event, ts.task)
                                },
                                {
                                  default: _withCtx3(() => [
                                    _createElementVNode5(
                                      'div',
                                      {
                                        class: _normalizeClass6($setup.ns.e('task-inner')),
                                        style: {
                                          width: '100%',
                                          height: '100%',
                                          display: 'flex',
                                          'align-items': 'center'
                                        },
                                        onClick: ($event) =>
                                          $setup.handleTaskClick($event, ts.task),
                                        onDblclick: ($event) =>
                                          $setup.handleTaskDblClick($event, ts.task),
                                        onMousedown: ($event) =>
                                          $setup.onDragStart($event, ts.task, 'move')
                                      },
                                      [
                                        ts.isSummary
                                          ? (_openBlock6(),
                                            _createElementBlock6(
                                              'div',
                                              {
                                                key: 0,
                                                class: _normalizeClass6($setup.ns.e('summary-bar'))
                                              },
                                              [
                                                _createElementVNode5(
                                                  'div',
                                                  {
                                                    class: _normalizeClass6(
                                                      $setup.ns.e('summary-left')
                                                    )
                                                  },
                                                  null,
                                                  2
                                                  /* CLASS */
                                                ),
                                                _createElementVNode5(
                                                  'div',
                                                  {
                                                    class: _normalizeClass6(
                                                      $setup.ns.e('summary-right')
                                                    )
                                                  },
                                                  null,
                                                  2
                                                  /* CLASS */
                                                )
                                              ],
                                              2
                                              /* CLASS */
                                            ))
                                          : ts.isMilestone
                                            ? (_openBlock6(),
                                              _createElementBlock6(
                                                'div',
                                                {
                                                  key: 1,
                                                  class: _normalizeClass6(
                                                    $setup.ns.e('milestone-diamond')
                                                  ),
                                                  style: _normalizeStyle6({
                                                    backgroundColor:
                                                      ts.task.color || 'var(--yh-color-primary)'
                                                  })
                                                },
                                                null,
                                                6
                                                /* CLASS, STYLE */
                                              ))
                                            : (_openBlock6(),
                                              _createElementBlock6(
                                                _Fragment3,
                                                { key: 2 },
                                                [
                                                  ts.task.progress
                                                    ? (_openBlock6(),
                                                      _createElementBlock6(
                                                        'div',
                                                        {
                                                          key: 0,
                                                          class: _normalizeClass6(
                                                            $setup.ns.e('task-progress')
                                                          ),
                                                          style: _normalizeStyle6({
                                                            width: `${ts.task.progress}%`
                                                          })
                                                        },
                                                        null,
                                                        6
                                                        /* CLASS, STYLE */
                                                      ))
                                                    : _createCommentVNode5('v-if', true),
                                                  _renderSlot6(
                                                    _ctx.$slots,
                                                    'task-content',
                                                    {
                                                      task: ts.task
                                                    },
                                                    () => [
                                                      _createElementVNode5(
                                                        'span',
                                                        {
                                                          class: _normalizeClass6(
                                                            $setup.ns.e('task-label')
                                                          )
                                                        },
                                                        _toDisplayString5(ts.task.name),
                                                        3
                                                        /* TEXT, CLASS */
                                                      )
                                                    ]
                                                  )
                                                ],
                                                64
                                                /* STABLE_FRAGMENT */
                                              )),
                                        !ts.isMilestone && $props.draggable
                                          ? (_openBlock6(),
                                            _createElementBlock6(
                                              _Fragment3,
                                              { key: 3 },
                                              [
                                                _createElementVNode5(
                                                  'div',
                                                  {
                                                    class: _normalizeClass6(
                                                      $setup.ns.e('resizer-left')
                                                    ),
                                                    onMousedown: _withModifiers2(
                                                      ($event) =>
                                                        $setup.onDragStart($event, ts.task, 'left'),
                                                      ['stop']
                                                    )
                                                  },
                                                  null,
                                                  42,
                                                  _hoisted_8
                                                ),
                                                _createElementVNode5(
                                                  'div',
                                                  {
                                                    class: _normalizeClass6(
                                                      $setup.ns.e('resizer-right')
                                                    ),
                                                    onMousedown: _withModifiers2(
                                                      ($event) =>
                                                        $setup.onDragStart(
                                                          $event,
                                                          ts.task,
                                                          'right'
                                                        ),
                                                      ['stop']
                                                    )
                                                  },
                                                  null,
                                                  42,
                                                  _hoisted_9
                                                )
                                              ],
                                              64
                                              /* STABLE_FRAGMENT */
                                            ))
                                          : _createCommentVNode5('v-if', true)
                                      ],
                                      42,
                                      _hoisted_7
                                    )
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                },
                                1032,
                                ['content', 'class', 'style', 'onMouseenter']
                              )
                            )
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      4
                      /* STYLE */
                    )
                  ],
                  34
                  /* CLASS, NEED_HYDRATION */
                )
              ],
              2
              /* CLASS */
            )
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
var __sfc__6 = /* @__PURE__ */ Object.assign(
  { name: 'YhGanttChart' },
  {
    __name: 'gantt-chart',
    props: {
      data: { type: Array, required: true, default: () => [] },
      columns: { type: Array, required: false, default: () => [] },
      startDate: { type: [String, Number, Date], required: false },
      endDate: { type: [String, Number, Date], required: false },
      viewMode: { type: String, required: false, default: 'day' },
      showDependencies: { type: Boolean, required: false, default: true },
      draggable: { type: Boolean, required: false, default: false },
      progressDraggable: { type: Boolean, required: false, default: false },
      autoSchedule: { type: Boolean, required: false, default: true },
      virtual: { type: Boolean, required: false, default: false },
      showResourceLoad: { type: Boolean, required: false, default: true },
      rowHeight: { type: Number, required: false, default: 40 },
      headerHeight: { type: Number, required: false, default: 60 },
      bordered: { type: Boolean, required: false, default: true },
      loading: { type: Boolean, required: false, default: false },
      teleported: { type: Boolean, required: false },
      themeOverrides: { type: Object, required: false }
    },
    emits: [
      'update:data',
      'update:viewMode',
      'task-click',
      'task-dblclick',
      'task-drag-end',
      'progress-drag-end',
      'dependency-click'
    ],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      stdin_default.extend(isBetweenPluginModule)
      stdin_default.extend(isoWeekPluginModule)
      stdin_default.extend(quarterOfYearPluginModule)
      const props = __props
      const emit = __emit
      const ns = useNamespace('gantt-chart')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'gantt',
        computed16(() => props.themeOverrides)
      )
      const resolvedColumns = computed16(() => {
        var _a2, _b
        const isDefaultNameColumn =
          props.columns.length === 1 &&
          ((_a2 = props.columns[0]) == null ? void 0 : _a2.prop) === 'name' &&
          ((_b = props.columns[0]) == null ? void 0 : _b.width) === 200
        return isDefaultNameColumn
          ? [
              __spreadProps(__spreadValues4({}, props.columns[0]), {
                label: t('ganttchart.taskName')
              })
            ]
          : props.columns
      })
      const ganttSearchPlaceholder = computed16(() => t('ganttchart.searchPlaceholder'))
      const ganttZoomText = computed16(() => t('ganttchart.zoom'))
      const ganttMilestoneText = computed16(() => t('ganttchart.milestone'))
      const ganttRef = ref16(null)
      const timelineBodyRef = ref16(null)
      const sidebarBodyRef = ref16(null)
      const sidebarHeaderRef = ref16(null)
      const PIXELS_PER_DAY = ref16(40)
      const internalViewModeState = ref16(props.viewMode || 'day')
      const internalViewMode = computed16({
        get: () => internalViewModeState.value,
        set: (val) => {
          internalViewModeState.value = val
          emit('update:viewMode', val)
        }
      })
      watch6(
        () => props.viewMode,
        (val) => {
          if (val) internalViewModeState.value = val
        }
      )
      const minPixelsPerDay = computed16(() => {
        if (internalViewMode.value === 'day') return 20
        if (internalViewMode.value === 'week') return 6
        if (internalViewMode.value === 'month') return 2
        return 0.5
      })
      watch6(
        internalViewMode,
        (val) => {
          if (val === 'day') PIXELS_PER_DAY.value = Math.max(PIXELS_PER_DAY.value, 40)
          else if (val === 'week') PIXELS_PER_DAY.value = Math.max(PIXELS_PER_DAY.value, 10)
          else if (val === 'month') PIXELS_PER_DAY.value = Math.max(PIXELS_PER_DAY.value, 4)
          else if (val === 'year') PIXELS_PER_DAY.value = Math.max(PIXELS_PER_DAY.value, 1)
        },
        { immediate: true }
      )
      const minMaxDates = computed16(() => {
        let minDate = stdin_default('2099-12-31')
        let maxDate = stdin_default('1970-01-01')
        if (props.data.length === 0) {
          minDate = stdin_default().subtract(7, 'day')
          maxDate = stdin_default().add(23, 'day')
        } else {
          const checkTasks = (tasks) => {
            tasks.forEach((task) => {
              const start = stdin_default(task.startDate)
              const end = stdin_default(task.endDate)
              if (start.isBefore(minDate)) minDate = start
              if (end.isAfter(maxDate)) maxDate = end
              if (task.children) checkTasks(task.children)
            })
          }
          checkTasks(props.data)
          minDate = minDate.subtract(7, 'day')
          maxDate = maxDate.add(7, 'day')
        }
        return {
          start: props.startDate ? stdin_default(props.startDate) : minDate,
          end: props.endDate ? stdin_default(props.endDate) : maxDate
        }
      })
      const timelineStart = computed16(() =>
        minMaxDates.value.start.startOf(
          internalViewMode.value === 'day' ? 'day' : internalViewMode.value
        )
      )
      const timelineEnd = computed16(() =>
        minMaxDates.value.end.endOf(
          internalViewMode.value === 'day' ? 'day' : internalViewMode.value
        )
      )
      const expandedTasks = ref16(/* @__PURE__ */ new Set())
      const searchKeyword = ref16('')
      const toggleExpand = (task) => {
        if (expandedTasks.value.has(task.id)) {
          expandedTasks.value.delete(task.id)
        } else {
          expandedTasks.value.add(task.id)
        }
      }
      const getFlattenedTasks = (tasks, parentId = null, level = 0, ancestorHasNext = []) => {
        let result = []
        tasks.forEach((task, index) => {
          var _a2, _b, _c
          const matchesSearch =
            !searchKeyword.value ||
            task.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
          let start = stdin_default(task.startDate),
            end = stdin_default(task.endDate)
          const isMilestone = start.isSame(end, 'day')
          if ((_a2 = task.children) == null ? void 0 : _a2.length) {
            task.children.forEach((c) => {
              const cs = stdin_default(c.startDate),
                ce = stdin_default(c.endDate)
              if (cs.isBefore(start)) start = cs
              if (ce.isAfter(end)) end = ce
            })
          }
          const isLast = index === tasks.length - 1
          const flatTask = __spreadProps(__spreadValues4({}, task), {
            _original: task,
            // 保持对原始对象的引用
            _level: level,
            _parentId: parentId,
            _isLast: isLast,
            _ancestorHasNext: [...ancestorHasNext],
            _hasChildren: !!((_b = task.children) == null ? void 0 : _b.length),
            _startDate: start.format('YYYY-MM-DD HH:mm:ss'),
            _endDate: end.format('YYYY-MM-DD HH:mm:ss'),
            _isMilestone: isMilestone,
            _matchesSearch: matchesSearch
          })
          result.push(flatTask)
          if (
            ((_c = task.children) == null ? void 0 : _c.length) &&
            (expandedTasks.value.has(task.id) || searchKeyword.value)
          ) {
            result = result.concat(
              getFlattenedTasks(task.children, task.id, level + 1, [...ancestorHasNext, !isLast])
            )
          }
        })
        return result
      }
      const visibleAllTasks = computed16(() => {
        let list = getFlattenedTasks(props.data)
        if (searchKeyword.value) {
          return list.filter((t2) => t2._matchesSearch)
        }
        return list
      })
      const scrollTop = ref16(0)
      const viewportHeight = ref16(600)
      const virtualState = computed16(() => {
        if (!props.virtual) return { start: 0, end: visibleAllTasks.value.length, offsetTop: 0 }
        const start = Math.floor(scrollTop.value / props.rowHeight)
        const end = Math.min(
          start + Math.ceil(viewportHeight.value / props.rowHeight) + 2,
          visibleAllTasks.value.length
        )
        return { start, end, offsetTop: start * props.rowHeight }
      })
      const renderTasks = computed16(() =>
        visibleAllTasks.value.slice(virtualState.value.start, virtualState.value.end)
      )
      const totalHeight = computed16(() => visibleAllTasks.value.length * props.rowHeight)
      const resourceLoadMap = computed16(() => {
        const loadMap = {}
        visibleAllTasks.value.forEach((t2) => {
          if (!t2.assignees) return
          let current = stdin_default(t2._startDate || t2.startDate)
          const end = stdin_default(t2._endDate || t2.endDate)
          while (current.isBefore(end) || current.isSame(end, 'day')) {
            const dateStr = current.format('YYYY-MM-DD')
            t2.assignees.forEach((resId) => {
              if (!loadMap[resId]) loadMap[resId] = {}
              loadMap[resId][dateStr] = (loadMap[resId][dateStr] || 0) + 1
            })
            current = current.add(1, 'day')
          }
        })
        return loadMap
      })
      const totalDays = computed16(() =>
        Math.max(1, timelineEnd.value.diff(timelineStart.value, 'day') + 1)
      )
      const timelineWidth = computed16(() => totalDays.value * PIXELS_PER_DAY.value)
      const topHeaders = computed16(() => {
        const headers = []
        let current = timelineStart.value.clone()
        while (current.isBefore(timelineEnd.value) || current.isSame(timelineEnd.value, 'day')) {
          const nextCurrent =
            internalViewMode.value === 'day' || internalViewMode.value === 'week'
              ? current.add(1, 'month').startOf('month')
              : current.add(1, 'year').startOf('year')
          const actualEnd = nextCurrent.isAfter(timelineEnd.value) ? timelineEnd.value : nextCurrent
          const days = actualEnd.diff(current, 'day')
          if (days > 0) {
            headers.push({
              label:
                internalViewMode.value === 'year'
                  ? current.format('YYYY')
                  : current.format('YYYY-MM'),
              width: days * PIXELS_PER_DAY.value
            })
          }
          current = nextCurrent
        }
        return headers
      })
      const bottomHeaders = computed16(() => {
        const headers = []
        let current = timelineStart.value.clone()
        while (current.isBefore(timelineEnd.value) || current.isSame(timelineEnd.value, 'day')) {
          let label = '',
            days = 1
          if (internalViewMode.value === 'day') {
            label = current.format('DD')
            days = 1
            current = current.add(1, 'day')
          } else if (internalViewMode.value === 'week') {
            label = `W${current.isoWeek()}`
            days = 7
            current = current.add(1, 'week')
          } else if (internalViewMode.value === 'month') {
            label = current.format('MMM')
            days = current.daysInMonth()
            current = current.add(1, 'month')
          } else if (internalViewMode.value === 'year') {
            label = `Q${current.quarter()}`
            days = current.add(1, 'quarter').diff(current, 'day')
            current = current.add(1, 'quarter')
          }
          headers.push({
            label,
            width: days * PIXELS_PER_DAY.value,
            isToday: current.subtract(1, 'day').isSame(stdin_default(), 'day')
          })
        }
        return headers
      })
      const getTaskPosition = (task, index) => {
        const start = stdin_default(task.startDate)
        const end = stdin_default(task.endDate)
        const isMilestone = task._isMilestone || start.isSame(end, 'day')
        const daysFromStart = start.diff(timelineStart.value, 'day', true)
        let duration = Math.max(0.1, end.diff(start, 'day') + 1)
        let width = duration * PIXELS_PER_DAY.value
        let left = daysFromStart * PIXELS_PER_DAY.value
        if (isMilestone) width = 0
        return { left, width, top: index * props.rowHeight, isMilestone }
      }
      const taskStyles = computed16(() => {
        return renderTasks.value.map((task, index) => {
          const realIndex = virtualState.value.start + index
          const pos = getTaskPosition(task, realIndex)
          let hasConflict = false
          if (props.showResourceLoad && task.assignees) {
            let current = stdin_default(task.startDate)
            const end = stdin_default(task.endDate)
            while (current.isBefore(end) || current.isSame(end, 'day')) {
              const ds = current.format('YYYY-MM-DD')
              if (
                task.assignees.some((rid) => {
                  var _a2
                  return (((_a2 = resourceLoadMap.value[rid]) == null ? void 0 : _a2[ds]) || 0) > 1
                })
              ) {
                hasConflict = true
                break
              }
              current = current.add(1, 'day')
            }
          }
          const isSummary = task._hasChildren
          return __spreadProps(__spreadValues4({}, pos), {
            task,
            index: realIndex,
            hasConflict,
            isSummary,
            style: {
              left: `${pos.isMilestone ? pos.left + PIXELS_PER_DAY.value / 2 - 8 : pos.left}px`,
              width: `${pos.isMilestone ? 16 : pos.width}px`,
              top: `${pos.top + (isSummary ? 12 : 4)}px`,
              height: `${pos.isMilestone ? 16 : isSummary ? 8 : props.rowHeight - 8}px`,
              backgroundColor:
                pos.isMilestone || isSummary
                  ? 'transparent'
                  : hasConflict
                    ? 'var(--yh-color-danger)'
                    : task.color,
              color: task.textColor,
              margin: pos.isMilestone ? '4px 0' : '0'
            }
          })
        })
      })
      const dependenciesLinks = computed16(() => {
        if (!props.showDependencies) return []
        const links = []
        const idToPos = /* @__PURE__ */ new Map()
        taskStyles.value.forEach((t2) => idToPos.set(t2.task.id, t2))
        taskStyles.value.forEach((t2) => {
          if (!t2.task.dependencies) return
          t2.task.dependencies.forEach((depId) => {
            const from = idToPos.get(depId)
            if (from) {
              const x1 = from.left + from.width,
                y1 = from.top + props.rowHeight / 2
              const x2 = t2.left,
                y2 = t2.top + props.rowHeight / 2
              links.push({
                id: `${depId}-${t2.task.id}`,
                from: from.task,
                to: t2.task,
                path: `M ${x1} ${y1} L ${x2} ${y2}`
              })
            }
          })
        })
        return links
      })
      const handleBodyScroll = (e) => {
        const target = e.target
        scrollTop.value = target.scrollTop
        if (sidebarBodyRef.value && target === timelineBodyRef.value) {
          sidebarBodyRef.value.scrollTop = target.scrollTop
        } else if (timelineBodyRef.value && target === sidebarBodyRef.value) {
          timelineBodyRef.value.scrollTop = target.scrollTop
        }
        if (sidebarHeaderRef.value && target === sidebarBodyRef.value) {
          sidebarHeaderRef.value.scrollLeft = target.scrollLeft
        }
      }
      const updateSuccessors = (taskId) => {
        const findTask = (id, list) => {
          for (const t2 of list) {
            if (t2.id === id) return t2
            if (t2.children) {
              const found = findTask(id, t2.children)
              if (found) return found
            }
          }
        }
        const findAffected = (predId, list) => {
          let affected2 = []
          list.forEach((t2) => {
            var _a2
            if ((_a2 = t2.dependencies) == null ? void 0 : _a2.includes(predId)) affected2.push(t2)
            if (t2.children) affected2 = affected2.concat(findAffected(predId, t2.children))
          })
          return affected2
        }
        const pred = findTask(taskId, props.data)
        if (!pred) return
        const affected = findAffected(taskId, props.data)
        affected.forEach((task) => {
          const start = stdin_default(task.startDate),
            end = stdin_default(pred.endDate)
          if (start.isBefore(end)) {
            const dur = stdin_default(task.endDate).diff(stdin_default(task.startDate), 'day')
            const ns2 = end.add(1, 'day')
            task.startDate = ns2.format('YYYY-MM-DD HH:mm:ss')
            task.endDate = ns2.add(dur, 'day').format('YYYY-MM-DD HH:mm:ss')
            updateSuccessors(task.id)
          }
        })
      }
      const activeDragTask = ref16(null)
      let dragType = null,
        dragStartX = 0,
        dragInitS = stdin_default(),
        dragInitE = stdin_default(),
        dragInitP = 0
      const onDragStart = (e, task, type) => {
        if (type === 'progress' && !props.progressDraggable) return
        if (type !== 'progress' && !props.draggable) return
        e.preventDefault()
        e.stopPropagation()
        activeDragTask.value = task
        dragType = type
        dragStartX = e.clientX
        dragInitS = stdin_default(task.startDate)
        dragInitE = stdin_default(task.endDate)
        dragInitP = task.progress || 0
        document.addEventListener('mousemove', onDragMove)
        document.addEventListener('mouseup', onDragEnd)
      }
      const onDragMove = (e) => {
        if (!activeDragTask.value) return
        const dx = e.clientX - dragStartX
        const msPerDay = 864e5
        const msOffset = (dx / PIXELS_PER_DAY.value) * msPerDay
        const currentTask = activeDragTask.value
        const originalTask = currentTask._original || currentTask
        if (dragType === 'move') {
          const newStart = dragInitS.add(msOffset, 'ms').format('YYYY-MM-DD HH:mm:ss')
          const newEnd = dragInitE.add(msOffset, 'ms').format('YYYY-MM-DD HH:mm:ss')
          currentTask.startDate = newStart
          currentTask.endDate = newEnd
          originalTask.startDate = newStart
          originalTask.endDate = newEnd
        } else if (dragType === 'left') {
          const ns2 = dragInitS.add(msOffset, 'ms')
          if (ns2.isBefore(dragInitE)) {
            const newStart = ns2.format('YYYY-MM-DD HH:mm:ss')
            currentTask.startDate = newStart
            originalTask.startDate = newStart
          }
        } else if (dragType === 'right') {
          const ne = dragInitE.add(msOffset, 'ms')
          if (ne.isAfter(dragInitS)) {
            const newEnd = ne.format('YYYY-MM-DD HH:mm:ss')
            currentTask.endDate = newEnd
            originalTask.endDate = newEnd
          }
        } else if (dragType === 'progress') {
          const pos = getTaskPosition(currentTask, 0)
          const newProgress = Math.round(
            Math.max(0, Math.min(100, dragInitP + (dx / pos.width) * 100))
          )
          currentTask.progress = newProgress
          originalTask.progress = newProgress
        }
      }
      const onDragEnd = () => {
        const draggedTask = activeDragTask.value
        if (draggedTask && props.autoSchedule) updateSuccessors(draggedTask.id)
        if (draggedTask) {
          if (dragType === 'progress') {
            emit('progress-drag-end', draggedTask)
          } else {
            emit('task-drag-end', draggedTask)
          }
        }
        emit('update:data', [...props.data])
        activeDragTask.value = null
        dragType = null
        document.removeEventListener('mousemove', onDragMove)
        document.removeEventListener('mouseup', onDragEnd)
      }
      const handleTaskClick = (e, task) => {
        if (dragType) return
        emit('task-click', task, e)
      }
      const handleTaskDblClick = (e, task) => {
        emit('task-dblclick', task, e)
      }
      const truncatedTasks = ref16({})
      const handleMouseEnter = (e, task) => {
        const label = e.currentTarget.querySelector(`.${ns.e('task-label')}`)
        if (label) truncatedTasks.value[task.id] = label.scrollWidth > label.clientWidth
      }
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        resolvedColumns,
        ganttSearchPlaceholder,
        ganttZoomText,
        ganttMilestoneText,
        ganttRef,
        timelineBodyRef,
        sidebarBodyRef,
        sidebarHeaderRef,
        PIXELS_PER_DAY,
        internalViewModeState,
        internalViewMode,
        minPixelsPerDay,
        minMaxDates,
        timelineStart,
        timelineEnd,
        expandedTasks,
        searchKeyword,
        toggleExpand,
        getFlattenedTasks,
        visibleAllTasks,
        scrollTop,
        viewportHeight,
        virtualState,
        renderTasks,
        totalHeight,
        resourceLoadMap,
        totalDays,
        timelineWidth,
        topHeaders,
        bottomHeaders,
        getTaskPosition,
        taskStyles,
        dependenciesLinks,
        handleBodyScroll,
        updateSuccessors,
        activeDragTask,
        get dragType() {
          return dragType
        },
        set dragType(v) {
          dragType = v
        },
        get dragStartX() {
          return dragStartX
        },
        set dragStartX(v) {
          dragStartX = v
        },
        get dragInitS() {
          return dragInitS
        },
        set dragInitS(v) {
          dragInitS = v
        },
        get dragInitE() {
          return dragInitE
        },
        set dragInitE(v) {
          dragInitE = v
        },
        get dragInitP() {
          return dragInitP
        },
        set dragInitP(v) {
          dragInitP = v
        },
        onDragStart,
        onDragMove,
        onDragEnd,
        handleTaskClick,
        handleTaskDblClick,
        truncatedTasks,
        handleMouseEnter,
        ref: ref16,
        computed: computed16,
        watch: watch6,
        get dayjs() {
          return stdin_default
        },
        get isBetweenPluginModule() {
          return isBetweenPluginModule
        },
        get isoWeekPluginModule() {
          return isoWeekPluginModule
        },
        get quarterOfYearPluginModule() {
          return quarterOfYearPluginModule
        },
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get YhTooltip() {
          return YhTooltip
        },
        get YhInput() {
          return YhInput
        },
        get YhRadioGroup() {
          return YhRadioGroup
        },
        get YhRadioButton() {
          return YhRadioButton
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__6.render = render6
var stdin_default8 = __sfc__6
export { stdin_default8 as default }
