// public/codesandbox-runtime/components/calendar/src/calendar.js
import {
  createCommentVNode as _createCommentVNode2,
  renderSlot as _renderSlot2,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  normalizeClass as _normalizeClass2,
  createElementVNode as _createElementVNode2,
  withCtx as _withCtx2,
  createVNode as _createVNode,
  openBlock as _openBlock2,
  createElementBlock as _createElementBlock2,
  renderList as _renderList,
  Fragment as _Fragment,
  normalizeStyle as _normalizeStyle2
} from 'vue'
import { ref as ref13, computed as computed12, watch as watch4, onMounted as onMounted3 } from 'vue'

// public/codesandbox-runtime/components/dayjs.js
import dayjs from 'dayjs'
var stdin_default = dayjs

// public/codesandbox-runtime/components/calendar/src/calendar.js
import isoWeekPluginModule from 'dayjs/plugin/isoWeek.js'

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

// public/codesandbox-runtime/hooks/use-form-item/index.js
import { inject as inject5 } from 'vue'
var FormContextKey = Symbol('FormContextKey')
var FormItemContextKey = Symbol('FormItemContextKey')

// public/codesandbox-runtime/hooks/use-virtual-scroll/index.js
import { ref as ref4, computed as computed7, unref as unref6 } from 'vue'

// public/codesandbox-runtime/hooks/use-cache/index.js
import { shallowRef } from 'vue'

// public/codesandbox-runtime/hooks/use-event-listener/index.js
import { onMounted, onBeforeUnmount, isRef, watch as watch2, unref as unref7 } from 'vue'

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

// public/codesandbox-runtime/components/calendar/src/calendar-meta.js
var calendarProps = {
  /** 绑定值（单选模式） */
  modelValue: {
    type: Date,
    default: void 0
  },
  /** 默认选中的日期 */
  defaultValue: {
    type: Date,
    default: void 0
  },
  /** 日历模式 */
  mode: {
    type: String,
    default: 'month'
  },
  /** 每周的第一天是星期几 (1-7，1为周一，7为周日) */
  firstDayOfWeek: {
    type: Number,
    default: 7,
    validator: (val) => val >= 1 && val <= 7
  },
  /** 日期范围限制 - 最小值 */
  minDate: {
    type: Date
  },
  /** 日期范围限制 - 最大值 */
  maxDate: {
    type: Date
  },
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 标题格式化（月份视图），默认使用国际化配置 */
  monthHeaderFormat: {
    type: String,
    default: void 0
  },
  /** 是否显示假期标记 */
  showHoliday: {
    type: Boolean,
    default: false
  },
  /** 自定义假期数据（格式：{ 'YYYY-MM-DD': { name: '假期名', isOffDay: true } }） */
  holidays: {
    type: Object,
    default: () => ({})
  },
  /** 是否显示周数 */
  showWeekNumber: {
    type: Boolean,
    default: false
  },
  /** 是否占满容器高度 */
  fullscreen: {
    type: Boolean,
    default: false
  },
  /** 选择模式: single（单选）, range（范围选择）, multiple（多选） */
  selectionMode: {
    type: String,
    default: 'single'
  },
  /** 范围选择值（当 selectionMode 为 range 时使用） */
  rangeValue: {
    type: Array,
    default: void 0
  },
  /** 多选值（当 selectionMode 为 multiple 时使用） */
  multipleValue: {
    type: Array,
    default: () => []
  },
  /** 自定义禁用日期函数 */
  disabledDate: {
    type: Function,
    default: void 0
  },
  /** 单元格额外类名 */
  cellClassName: {
    type: Function,
    default: void 0
  },
  /** 是否显示非当月日期 */
  showOtherMonths: {
    type: Boolean,
    default: true
  },
  /** 是否高亮周末 */
  highlightWeekends: {
    type: Boolean,
    default: true
  },
  /** 日历尺寸 */
  size: {
    type: String,
    default: 'default'
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
var calendarEmits = {
  'update:modelValue': (value) => value instanceof Date,
  'update:mode': (mode) => ['month', 'year'].includes(mode),
  'update:rangeValue': (value) => Array.isArray(value),
  'update:multipleValue': (value) => Array.isArray(value),
  change: (value) => value instanceof Date,
  'panel-change': (date, mode) => date instanceof Date && ['month', 'year'].includes(mode),
  select: (date, cell) => date instanceof Date && cell !== void 0,
  'range-change': (value) => Array.isArray(value)
}
var CALENDAR_INJECTION_KEY = Symbol('calendar')
var DEFAULT_CHINA_HOLIDAYS_2026 = {
  // 元旦
  '2026-01-01': { name: '\u5143\u65E6', isOffDay: true },
  '2026-01-02': { name: '\u5143\u65E6', isOffDay: true },
  '2026-01-03': { name: '\u5143\u65E6', isOffDay: true },
  // 春节 (2026年2月17日)
  '2026-02-14': { name: '\u6625\u8282', isOffDay: false },
  // 补班
  '2026-02-17': { name: '\u6625\u8282', isOffDay: true },
  // 除夕
  '2026-02-18': { name: '\u6625\u8282', isOffDay: true },
  '2026-02-19': { name: '\u6625\u8282', isOffDay: true },
  '2026-02-20': { name: '\u6625\u8282', isOffDay: true },
  '2026-02-21': { name: '\u6625\u8282', isOffDay: true },
  '2026-02-22': { name: '\u6625\u8282', isOffDay: true },
  '2026-02-23': { name: '\u6625\u8282', isOffDay: true },
  '2026-02-28': { name: '\u6625\u8282', isOffDay: false },
  // 补班
  // 清明节
  '2026-04-04': { name: '\u6E05\u660E', isOffDay: true },
  '2026-04-05': { name: '\u6E05\u660E', isOffDay: true },
  '2026-04-06': { name: '\u6E05\u660E', isOffDay: true },
  // 劳动节
  '2026-04-26': { name: '\u52B3\u52A8\u8282', isOffDay: false },
  // 补班
  '2026-05-01': { name: '\u52B3\u52A8\u8282', isOffDay: true },
  '2026-05-02': { name: '\u52B3\u52A8\u8282', isOffDay: true },
  '2026-05-03': { name: '\u52B3\u52A8\u8282', isOffDay: true },
  '2026-05-04': { name: '\u52B3\u52A8\u8282', isOffDay: true },
  '2026-05-05': { name: '\u52B3\u52A8\u8282', isOffDay: true },
  '2026-05-09': { name: '\u52B3\u52A8\u8282', isOffDay: false },
  // 补班
  // 端午节
  '2026-05-31': { name: '\u7AEF\u5348', isOffDay: true },
  '2026-06-01': { name: '\u7AEF\u5348', isOffDay: true },
  // 中秋节
  '2026-09-25': { name: '\u4E2D\u79CB', isOffDay: true },
  '2026-09-26': { name: '\u4E2D\u79CB', isOffDay: true },
  '2026-09-27': { name: '\u4E2D\u79CB', isOffDay: true },
  // 国庆节
  '2026-10-01': { name: '\u56FD\u5E86', isOffDay: true },
  '2026-10-02': { name: '\u56FD\u5E86', isOffDay: true },
  '2026-10-03': { name: '\u56FD\u5E86', isOffDay: true },
  '2026-10-04': { name: '\u56FD\u5E86', isOffDay: true },
  '2026-10-05': { name: '\u56FD\u5E86', isOffDay: true },
  '2026-10-06': { name: '\u56FD\u5E86', isOffDay: true },
  '2026-10-07': { name: '\u56FD\u5E86', isOffDay: true },
  '2026-10-10': { name: '\u56FD\u5E86', isOffDay: false }
  // 补班
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

// public/codesandbox-runtime/components/button/src/button.js
import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  createElementVNode as _createElementVNode,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  resolveDynamicComponent as _resolveDynamicComponent,
  createBlock as _createBlock,
  normalizeStyle as _normalizeStyle,
  withCtx as _withCtx
} from 'vue'
import { computed as computed11, ref as ref12, useSlots } from 'vue'
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
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock(
      _resolveDynamicComponent($props.tag),
      {
        ref: 'buttonRef',
        class: _normalizeClass($setup.buttonClasses),
        style: _normalizeStyle($setup.buttonStyles),
        type: $props.tag === 'button' ? $props.nativeType : void 0,
        disabled: $props.disabled || $props.loading,
        autofocus: $props.autofocus,
        onClick: $setup.handleClick
      },
      {
        default: _withCtx(() => [
          _createCommentVNode(
            ' 1. \u52A0\u8F7D\u56FE\u6807 (\u4F18\u5148\u7EA7\u6700\u9AD8\uFF0C\u5B58\u5728\u65F6\u901A\u5E38\u9690\u85CF\u539F\u56FE\u6807) '
          ),
          $props.loading
            ? _renderSlot(_ctx.$slots, 'loading', { key: 0 }, () => [
                _createElementVNode(
                  'span',
                  {
                    class: _normalizeClass($setup.ns.e('loading-icon'))
                  },
                  [
                    (_openBlock(),
                    _createElementBlock(
                      'svg',
                      {
                        class: _normalizeClass($setup.ns.e('loading-svg')),
                        viewBox: '0 0 1024 1024'
                      },
                      [
                        ...(_cache[0] ||
                          (_cache[0] = [
                            _createElementVNode(
                              'path',
                              {
                                fill: 'currentColor',
                                d: 'M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z'
                              },
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
                  2
                  /* CLASS */
                )
              ])
            : _createCommentVNode('v-if', true),
          _createCommentVNode(' 2. \u524D\u7F6E/\u4E0A\u7F6E\u56FE\u6807 '),
          !$props.loading &&
          $setup.hasIcon &&
          ($props.iconPosition === 'left' || $props.iconPosition === 'top')
            ? (_openBlock(),
              _createElementBlock(
                'span',
                {
                  key: 1,
                  class: _normalizeClass($setup.ns.e('icon'))
                },
                [
                  _renderSlot(_ctx.$slots, 'icon', {}, () => [
                    $props.icon && typeof $props.icon !== 'string'
                      ? (_openBlock(),
                        _createBlock(_resolveDynamicComponent($props.icon), { key: 0 }))
                      : _createCommentVNode('v-if', true)
                  ])
                ],
                2
                /* CLASS */
              ))
            : _createCommentVNode('v-if', true),
          _createCommentVNode(' 3. \u5185\u5BB9\u533A '),
          _ctx.$slots.default
            ? (_openBlock(),
              _createElementBlock(
                'span',
                {
                  key: 2,
                  class: _normalizeClass($setup.ns.e('text'))
                },
                [_renderSlot(_ctx.$slots, 'default')],
                2
                /* CLASS */
              ))
            : _createCommentVNode('v-if', true),
          _createCommentVNode(' 4. \u540E\u7F6E/\u4E0B\u7F6E\u56FE\u6807 '),
          !$props.loading &&
          $setup.hasIcon &&
          ($props.iconPosition === 'right' || $props.iconPosition === 'bottom')
            ? (_openBlock(),
              _createElementBlock(
                'span',
                {
                  key: 3,
                  class: _normalizeClass($setup.ns.e('icon'))
                },
                [
                  _renderSlot(_ctx.$slots, 'icon', {}, () => [
                    $props.icon && typeof $props.icon !== 'string'
                      ? (_openBlock(),
                        _createBlock(_resolveDynamicComponent($props.icon), { key: 0 }))
                      : _createCommentVNode('v-if', true)
                  ])
                ],
                2
                /* CLASS */
              ))
            : _createCommentVNode('v-if', true),
          _createCommentVNode(
            ' 5. \u72EC\u7ACB\u7684\u540E\u7F00\u56FE\u6807\uFF08suffixIcon \u63D2\u69FD\uFF09 '
          ),
          !$props.loading && $setup.hasSuffixIcon
            ? (_openBlock(),
              _createElementBlock(
                'span',
                {
                  key: 4,
                  class: _normalizeClass($setup.ns.e('suffix-icon'))
                },
                [
                  _renderSlot(_ctx.$slots, 'suffixIcon', {}, () => [
                    $props.suffixIcon && typeof $props.suffixIcon !== 'string'
                      ? (_openBlock(),
                        _createBlock(_resolveDynamicComponent($props.suffixIcon), { key: 0 }))
                      : _createCommentVNode('v-if', true)
                  ])
                ],
                2
                /* CLASS */
              ))
            : _createCommentVNode('v-if', true)
        ]),
        _: 3
        /* FORWARDED */
      },
      8,
      ['class', 'style', 'type', 'disabled', 'autofocus']
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhButton'
  },
  {
    __name: 'button',
    props: {
      type: { type: null, required: false, default: 'default' },
      size: { type: null, required: false },
      disabled: { type: Boolean, required: false, default: false },
      loading: { type: Boolean, required: false, default: false },
      plain: { type: Boolean, required: false, default: false },
      round: { type: Boolean, required: false, default: false },
      circle: { type: Boolean, required: false, default: false },
      text: { type: Boolean, required: false, default: false },
      link: { type: Boolean, required: false, default: false },
      nativeType: { type: null, required: false, default: 'button' },
      autofocus: { type: Boolean, required: false, default: false },
      icon: { type: null, required: false },
      suffixIcon: { type: null, required: false },
      iconPosition: { type: null, required: false, default: 'left' },
      color: { type: String, required: false },
      tag: { type: null, required: false, default: 'button' },
      block: { type: Boolean, required: false, default: false },
      themeOverrides: { type: null, required: false }
    },
    emits: ['click'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const slots = useSlots()
      const ns = useNamespace('button')
      const { globalSize } = useConfig()
      const { themeStyle } = useComponentTheme(
        'button',
        computed11(() => props.themeOverrides)
      )
      const actualSize = computed11(() => props.size || globalSize.value || 'default')
      const buttonRef = ref12()
      const hasIcon = computed11(() => props.icon || slots.icon)
      const hasSuffixIcon = computed11(() => props.suffixIcon || slots.suffixIcon)
      const isVertical = computed11(
        () => props.iconPosition === 'top' || props.iconPosition === 'bottom'
      )
      const buttonClasses = computed11(() => [
        ns.b(),
        props.type !== 'default' && ns.m(props.type),
        actualSize.value !== 'default' && ns.m(actualSize.value),
        ns.is('disabled', props.disabled),
        ns.is('loading', props.loading),
        ns.is('plain', props.plain),
        ns.is('round', props.round),
        ns.is('circle', props.circle),
        ns.is('text', props.text),
        ns.is('link', props.link),
        ns.is('block', props.block),
        ns.is('vertical', isVertical.value),
        ns.is('custom-color', !!props.color)
      ])
      const buttonStyles = computed11(() => {
        const base = themeStyle.value
        if (!props.color) return base
        const color = props.color
        return __spreadProps(__spreadValues2({}, base), {
          '--yh-button-bg-color': props.plain ? 'transparent' : color,
          '--yh-button-text-color': props.plain ? color : 'var(--yh-color-white)',
          '--yh-button-border-color': color,
          '--yh-button-hover-bg-color': color,
          '--yh-button-hover-text-color': 'var(--yh-color-white)',
          '--yh-button-hover-border-color': color,
          '--yh-button-active-bg-color': color,
          '--yh-button-active-border-color': color
        })
      })
      const handleClick = (event) => {
        if (props.disabled || props.loading) {
          event.preventDefault()
          return
        }
        emit('click', event)
      }
      __expose({
        ref: buttonRef.value,
        size: actualSize.value,
        type: props.type,
        disabled: props.disabled
      })
      const __returned__ = {
        props,
        emit,
        slots,
        ns,
        globalSize,
        themeStyle,
        actualSize,
        buttonRef,
        hasIcon,
        hasSuffixIcon,
        isVertical,
        buttonClasses,
        buttonStyles,
        handleClick,
        computed: computed11,
        ref: ref12,
        useSlots,
        get useNamespace() {
          return useNamespace
        },
        get useConfig() {
          return useConfig
        },
        get useComponentTheme() {
          return useComponentTheme
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default3 = __sfc__

// public/codesandbox-runtime/components/button/index.js
var YhButton = withInstall(stdin_default3)

// public/codesandbox-runtime/components/calendar/src/calendar.js
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
var _hoisted_1 = ['onClick', 'onMouseenter']
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock2(),
    _createElementBlock2(
      'div',
      {
        class: _normalizeClass2($setup.rootClass),
        style: _normalizeStyle2($setup.themeStyle)
      },
      [
        _createCommentVNode2(' \u9876\u680F '),
        _createElementVNode2(
          'div',
          {
            class: _normalizeClass2($setup.ns.e('header'))
          },
          [
            _createElementVNode2(
              'div',
              {
                class: _normalizeClass2($setup.ns.e('title'))
              },
              [
                _renderSlot2(_ctx.$slots, 'header', { date: $setup.title }, () => [
                  _createTextVNode(
                    _toDisplayString($setup.title),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ),
            _createElementVNode2(
              'div',
              {
                class: _normalizeClass2($setup.ns.e('controls'))
              },
              [
                _createElementVNode2(
                  'div',
                  {
                    class: _normalizeClass2($setup.ns.e('nav-group'))
                  },
                  [
                    _createVNode(
                      $setup['YhButton'],
                      {
                        class: 'yh-calendar__nav-btn',
                        size: 'small',
                        onClick: _cache[0] || (_cache[0] = ($event) => $setup.moveMonth(-1))
                      },
                      {
                        default: _withCtx2(() => [
                          _createTextVNode(
                            _toDisplayString($setup.t('calendar.prevMonth')),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }
                    ),
                    _createVNode(
                      $setup['YhButton'],
                      {
                        class: 'yh-calendar__nav-btn yh-calendar__nav-btn--today',
                        size: 'small',
                        onClick: $setup.goToday
                      },
                      {
                        default: _withCtx2(() => [
                          _createTextVNode(
                            _toDisplayString($setup.t('calendar.today')),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }
                    ),
                    _createVNode(
                      $setup['YhButton'],
                      {
                        class: 'yh-calendar__nav-btn',
                        size: 'small',
                        onClick: _cache[1] || (_cache[1] = ($event) => $setup.moveMonth(1))
                      },
                      {
                        default: _withCtx2(() => [
                          _createTextVNode(
                            _toDisplayString($setup.t('calendar.nextMonth')),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }
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
        ),
        _createCommentVNode2(' \u8868\u8EAB '),
        _createElementVNode2(
          'div',
          {
            class: _normalizeClass2($setup.ns.e('body'))
          },
          [
            _createElementVNode2(
              'table',
              {
                class: _normalizeClass2($setup.ns.e('table'))
              },
              [
                _createElementVNode2('thead', null, [
                  _createElementVNode2('tr', null, [
                    _ctx.showWeekNumber
                      ? (_openBlock2(),
                        _createElementBlock2(
                          'th',
                          {
                            key: 0,
                            class: _normalizeClass2($setup.ns.e('week-number-header'))
                          },
                          _toDisplayString($setup.t('calendar.week')),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode2('v-if', true),
                    (_openBlock2(true),
                    _createElementBlock2(
                      _Fragment,
                      null,
                      _renderList($setup.weekDays, (day, idx) => {
                        return (
                          _openBlock2(),
                          _createElementBlock2(
                            'th',
                            {
                              key: day,
                              class: _normalizeClass2([
                                $setup.ns.e('weekday'),
                                {
                                  [$setup.ns.em('weekday', 'weekend')]:
                                    _ctx.highlightWeekends && (idx === 0 || idx === 6)
                                }
                              ])
                            },
                            _toDisplayString(day),
                            3
                            /* TEXT, CLASS */
                          )
                        )
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ]),
                _createElementVNode2('tbody', null, [
                  (_openBlock2(true),
                  _createElementBlock2(
                    _Fragment,
                    null,
                    _renderList($setup.rows, (row, rowIndex) => {
                      return (
                        _openBlock2(),
                        _createElementBlock2('tr', { key: rowIndex }, [
                          _ctx.showWeekNumber
                            ? (_openBlock2(),
                              _createElementBlock2(
                                'td',
                                {
                                  key: 0,
                                  class: _normalizeClass2($setup.ns.e('week-number'))
                                },
                                _toDisplayString(row.weekNumber),
                                3
                                /* TEXT, CLASS */
                              ))
                            : _createCommentVNode2('v-if', true),
                          (_openBlock2(true),
                          _createElementBlock2(
                            _Fragment,
                            null,
                            _renderList(row.cells, (cell, cellIndex) => {
                              return (
                                _openBlock2(),
                                _createElementBlock2(
                                  'td',
                                  {
                                    key: cellIndex,
                                    class: _normalizeClass2([
                                      $setup.ns.e('day'),
                                      $setup.ns.is('today', cell.isToday),
                                      $setup.ns.is('selected', cell.isSelected),
                                      $setup.ns.is('disabled', cell.isDisabled),
                                      $setup.ns.is(
                                        'weekend',
                                        _ctx.highlightWeekends && cell.isWeekend
                                      ),
                                      $setup.ns.is('holiday', cell.isHoliday),
                                      $setup.ns.is('workday', cell.isWorkday),
                                      $setup.ns.is('in-range', cell.isInRange),
                                      $setup.ns.is('range-start', cell.isRangeStart),
                                      $setup.ns.is('range-end', cell.isRangeEnd),
                                      $setup.ns.is('other-month', cell.type !== 'current-month'),
                                      $setup.ns.is(
                                        'hidden',
                                        !_ctx.showOtherMonths && cell.type !== 'current-month'
                                      ),
                                      $setup.ns.is(cell.type, true),
                                      $setup.getCellExtraClass(cell)
                                    ]),
                                    onClick: ($event) => $setup.selectDate(cell),
                                    onMouseenter: ($event) => $setup.handleCellHover(cell)
                                  },
                                  [
                                    _createElementVNode2(
                                      'div',
                                      {
                                        class: _normalizeClass2($setup.ns.e('day-inner'))
                                      },
                                      [
                                        _createCommentVNode2(' \u65E5\u671F\u6570\u5B57 '),
                                        _createElementVNode2(
                                          'div',
                                          {
                                            class: _normalizeClass2($setup.ns.e('day-value'))
                                          },
                                          _toDisplayString(cell.day),
                                          3
                                          /* TEXT, CLASS */
                                        ),
                                        _createCommentVNode2(
                                          ' \u5047\u671F/\u8865\u73ED\u6807\u8BB0 '
                                        ),
                                        _ctx.showHoliday && (cell.isHoliday || cell.isWorkday)
                                          ? (_openBlock2(),
                                            _createElementBlock2(
                                              'div',
                                              {
                                                key: 0,
                                                class: _normalizeClass2([
                                                  $setup.ns.e('day-badge'),
                                                  cell.isHoliday
                                                    ? $setup.ns.em('day-badge', 'holiday')
                                                    : $setup.ns.em('day-badge', 'workday')
                                                ])
                                              },
                                              _toDisplayString(
                                                cell.isHoliday
                                                  ? $setup.t('calendar.holiday')
                                                  : $setup.t('calendar.workday')
                                              ),
                                              3
                                              /* TEXT, CLASS */
                                            ))
                                          : _createCommentVNode2('v-if', true),
                                        _createCommentVNode2(
                                          ' \u81EA\u5B9A\u4E49\u5185\u5BB9\u63D2\u69FD '
                                        ),
                                        _createElementVNode2(
                                          'div',
                                          {
                                            class: _normalizeClass2($setup.ns.e('day-content'))
                                          },
                                          [
                                            _renderSlot2(_ctx.$slots, 'date-cell', {
                                              data: $setup.getSlotData(cell)
                                            })
                                          ],
                                          2
                                          /* CLASS */
                                        )
                                      ],
                                      2
                                      /* CLASS */
                                    )
                                  ],
                                  42,
                                  _hoisted_1
                                )
                              )
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      )
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ],
              2
              /* CLASS */
            )
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode2(' \u5E95\u90E8\u63D2\u69FD '),
        _ctx.$slots.footer
          ? (_openBlock2(),
            _createElementBlock2(
              'div',
              {
                key: 0,
                class: _normalizeClass2($setup.ns.e('footer'))
              },
              [_renderSlot2(_ctx.$slots, 'footer')],
              2
              /* CLASS */
            ))
          : _createCommentVNode2('v-if', true)
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
var __sfc__2 = /* @__PURE__ */ Object.assign(
  {
    name: 'YhCalendar'
  },
  {
    __name: 'calendar',
    props: calendarProps,
    emits: calendarEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      var _a2, _b, _c
      stdin_default.extend(isoWeekPluginModule)
      const props = __props
      const emit = __emit
      const ns = useNamespace('calendar')
      const { t, locale } = useLocale()
      const { themeStyle } = useComponentTheme(
        'calendar',
        computed12(() => props.themeOverrides)
      )
      const now = stdin_default()
      const displayDate = ref13(props.modelValue ? stdin_default(props.modelValue) : now)
      const selectedDate = ref13(props.modelValue ? stdin_default(props.modelValue) : void 0)
      const rangeStart = ref13(
        ((_a2 = props.rangeValue) == null ? void 0 : _a2[0])
          ? stdin_default(props.rangeValue[0])
          : void 0
      )
      const rangeEnd = ref13(
        ((_b = props.rangeValue) == null ? void 0 : _b[1])
          ? stdin_default(props.rangeValue[1])
          : void 0
      )
      const hoverDate = ref13(void 0)
      const multipleSelected = ref13(
        ((_c = props.multipleValue) == null ? void 0 : _c.map((d) => stdin_default(d))) || []
      )
      const mergedHolidays = computed12(() => {
        if (props.showHoliday) {
          return __spreadValues3(__spreadValues3({}, DEFAULT_CHINA_HOLIDAYS_2026), props.holidays)
        }
        return props.holidays
      })
      const monthKeys = [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec'
      ]
      const title = computed12(() => {
        var _a22, _b2
        if (props.monthHeaderFormat) {
          return displayDate.value.format(props.monthHeaderFormat)
        }
        const calendarLocale = (_a22 = locale.value.yh) == null ? void 0 : _a22.calendar
        if (calendarLocale == null ? void 0 : calendarLocale.monthHeaderFormat) {
          return displayDate.value.format(calendarLocale.monthHeaderFormat)
        }
        const dateLocale = (_b2 = locale.value.yh) == null ? void 0 : _b2.datepicker
        if (dateLocale) {
          const monthName = dateLocale.months[monthKeys[displayDate.value.month()]]
          const year = displayDate.value.year()
          if (!dateLocale.monthBeforeYear && dateLocale.year) {
            return `${year}${dateLocale.year}${monthName}`
          }
          return dateLocale.monthBeforeYear
            ? `${monthName} ${year}`
            : `${year} ${dateLocale.year} ${monthName}`
        }
        return displayDate.value.format('YYYY-MM')
      })
      const weekDays = computed12(() => {
        const days = [
          t('calendar.weeks.sun'),
          t('calendar.weeks.mon'),
          t('calendar.weeks.tue'),
          t('calendar.weeks.wed'),
          t('calendar.weeks.thu'),
          t('calendar.weeks.fri'),
          t('calendar.weeks.sat')
        ]
        const start = props.firstDayOfWeek % 7
        return [...days.slice(start), ...days.slice(0, start)]
      })
      const isDateDisabled = (date) => {
        if (props.disabled) return true
        if (props.disabledDate && props.disabledDate(date.toDate())) return true
        if (props.minDate && date.isBefore(stdin_default(props.minDate), 'day')) return true
        if (props.maxDate && date.isAfter(stdin_default(props.maxDate), 'day')) return true
        return false
      }
      const isWeekend = (date) => {
        const day = date.day()
        return day === 0 || day === 6
      }
      const isInRange = (date) => {
        if (props.selectionMode !== 'range') return false
        const start = rangeStart.value
        const end = rangeEnd.value || hoverDate.value
        if (!start || !end) return false
        const min = start.isBefore(end) ? start : end
        const max = start.isBefore(end) ? end : start
        return date.isAfter(min, 'day') && date.isBefore(max, 'day')
      }
      const isMultipleSelected = (date) => {
        if (props.selectionMode !== 'multiple') return false
        return multipleSelected.value.some((d) => d.isSame(date, 'day'))
      }
      const rows = computed12(() => {
        var _a22, _b2
        const date = displayDate.value
        const firstDay = date.startOf('month')
        const weekday = firstDay.day()
        const offset = (weekday - (props.firstDayOfWeek % 7) + 7) % 7
        let current = firstDay.subtract(offset, 'day')
        const matrix = []
        for (let i = 0; i < 6; i++) {
          const weekNumber = current.isoWeek()
          const row = []
          for (let j = 0; j < 7; j++) {
            const dateStr = current.format('YYYY-MM-DD')
            const holidayInfo = mergedHolidays.value[dateStr]
            const isCurrentMonth = current.isSame(displayDate.value, 'month')
            const isTodayDate = current.isSame(now, 'day')
            const disabled = isDateDisabled(current)
            let isSelected = false
            if (props.selectionMode === 'single') {
              isSelected = selectedDate.value ? current.isSame(selectedDate.value, 'day') : false
            } else if (props.selectionMode === 'multiple') {
              isSelected = isMultipleSelected(current)
            } else if (props.selectionMode === 'range') {
              isSelected =
                (rangeStart.value && current.isSame(rangeStart.value, 'day')) ||
                (rangeEnd.value && current.isSame(rangeEnd.value, 'day')) ||
                false
            }
            const cell = {
              date: current,
              day: current.date(),
              type: getDayType(current),
              isCurrent: isCurrentMonth,
              isToday: isTodayDate,
              isSelected,
              isDisabled: disabled,
              isWeekend: isWeekend(current),
              isHoliday: (holidayInfo == null ? void 0 : holidayInfo.isOffDay) === true,
              holidayName: holidayInfo == null ? void 0 : holidayInfo.name,
              isWorkday: (holidayInfo == null ? void 0 : holidayInfo.isOffDay) === false,
              isInRange: isInRange(current),
              isRangeStart:
                props.selectionMode === 'range' &&
                ((_a22 = rangeStart.value) == null ? void 0 : _a22.isSame(current, 'day')),
              isRangeEnd:
                props.selectionMode === 'range' &&
                ((_b2 = rangeEnd.value) == null ? void 0 : _b2.isSame(current, 'day')),
              dateStr
            }
            row.push(cell)
            current = current.add(1, 'day')
          }
          matrix.push({ weekNumber, cells: row })
        }
        return matrix
      })
      function getDayType(date) {
        if (date.isBefore(displayDate.value, 'month')) return 'prev-month'
        if (date.isAfter(displayDate.value, 'month')) return 'next-month'
        return 'current-month'
      }
      const selectDate = (cell) => {
        if (props.readonly || cell.isDisabled) return
        const date = cell.date
        if (!props.showOtherMonths && cell.type !== 'current-month') return
        if (props.selectionMode === 'single') {
          const oldDate = selectedDate.value
          selectedDate.value = date
          if (!date.isSame(displayDate.value, 'month')) {
            displayDate.value = date
          }
          emit('update:modelValue', date.toDate())
          emit('select', date.toDate(), cell)
          if (!oldDate || !date.isSame(oldDate, 'day')) {
            emit('change', date.toDate())
          }
        } else if (props.selectionMode === 'range') {
          if (!rangeStart.value || (rangeStart.value && rangeEnd.value)) {
            rangeStart.value = date
            rangeEnd.value = void 0
          } else {
            if (date.isBefore(rangeStart.value)) {
              rangeEnd.value = rangeStart.value
              rangeStart.value = date
            } else {
              rangeEnd.value = date
            }
            emit('update:rangeValue', [rangeStart.value.toDate(), rangeEnd.value.toDate()])
            emit('range-change', [rangeStart.value.toDate(), rangeEnd.value.toDate()])
          }
          emit('select', date.toDate(), cell)
        } else if (props.selectionMode === 'multiple') {
          const idx = multipleSelected.value.findIndex((d) => d.isSame(date, 'day'))
          if (idx > -1) {
            multipleSelected.value.splice(idx, 1)
          } else {
            multipleSelected.value.push(date)
          }
          emit(
            'update:multipleValue',
            multipleSelected.value.map((d) => d.toDate())
          )
          emit('select', date.toDate(), cell)
        }
      }
      const handleCellHover = (cell) => {
        if (props.selectionMode === 'range' && rangeStart.value && !rangeEnd.value) {
          hoverDate.value = cell.date
        }
      }
      const moveMonth = (delta) => {
        displayDate.value = displayDate.value.add(delta, 'month')
        emit('panel-change', displayDate.value.toDate(), props.mode)
      }
      const goToday = () => {
        displayDate.value = now
        if (props.selectionMode === 'single' && !props.readonly && !props.disabled) {
          const todayCell = rows.value.flatMap((r) => r.cells).find((c) => c.isToday)
          if (todayCell && !todayCell.isDisabled) {
            selectDate(todayCell)
          }
        }
      }
      watch4(
        () => props.modelValue,
        (val) => {
          if (val) {
            const d = stdin_default(val)
            selectedDate.value = d
            displayDate.value = d
          }
        }
      )
      watch4(
        () => props.rangeValue,
        (val) => {
          if (val) {
            rangeStart.value = val[0] ? stdin_default(val[0]) : void 0
            rangeEnd.value = val[1] ? stdin_default(val[1]) : void 0
          }
        }
      )
      watch4(
        () => props.multipleValue,
        (val) => {
          multipleSelected.value = (val == null ? void 0 : val.map((d) => stdin_default(d))) || []
        }
      )
      onMounted3(() => {
        if (props.defaultValue && !props.modelValue) {
          selectedDate.value = stdin_default(props.defaultValue)
          displayDate.value = stdin_default(props.defaultValue)
        }
      })
      const getSlotData = (cell) => {
        return {
          isSelected: cell.isSelected,
          type: cell.type,
          day: cell.dateStr,
          date: cell.date.toDate(),
          isToday: cell.isToday,
          isDisabled: cell.isDisabled,
          isWeekend: cell.isWeekend,
          isHoliday: cell.isHoliday,
          holidayName: cell.holidayName,
          isWorkday: cell.isWorkday,
          isInRange: cell.isInRange,
          isRangeStart: cell.isRangeStart,
          isRangeEnd: cell.isRangeEnd
        }
      }
      const getCellExtraClass = (cell) => {
        if (props.cellClassName) {
          return props.cellClassName(cell.date.toDate())
        }
        return ''
      }
      const rootClass = computed12(() => [
        ns.b(),
        ns.is('fullscreen', props.fullscreen),
        ns.is('readonly', props.readonly),
        ns.is('disabled', props.disabled),
        ns.m(props.size)
      ])
      __expose({
        /** 当前显示的日期对象 (Dayjs) */
        displayDate,
        /** 当前选中的日期对象 (Dayjs - 单选模式) */
        selectedDate,
        /** 切换月份 (delta: 1 或 -1) */
        moveMonth,
        /** 跳转到今天 */
        goToday,
        /** 手动选中日期 */
        selectDate
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        locale,
        themeStyle,
        now,
        displayDate,
        selectedDate,
        rangeStart,
        rangeEnd,
        hoverDate,
        multipleSelected,
        mergedHolidays,
        monthKeys,
        title,
        weekDays,
        isDateDisabled,
        isWeekend,
        isInRange,
        isMultipleSelected,
        rows,
        getDayType,
        selectDate,
        handleCellHover,
        moveMonth,
        goToday,
        getSlotData,
        getCellExtraClass,
        rootClass,
        ref: ref13,
        computed: computed12,
        watch: watch4,
        onMounted: onMounted3,
        get dayjs() {
          return stdin_default
        },
        get isoWeekPluginModule() {
          return isoWeekPluginModule
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
        get calendarProps() {
          return calendarProps
        },
        get calendarEmits() {
          return calendarEmits
        },
        get DEFAULT_CHINA_HOLIDAYS_2026() {
          return DEFAULT_CHINA_HOLIDAYS_2026
        },
        get YhButton() {
          return YhButton
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__2.render = render2
var stdin_default4 = __sfc__2
export { stdin_default4 as default }
