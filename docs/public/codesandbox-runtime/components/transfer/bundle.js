// docs/public/codesandbox-runtime/components/transfer/src/transfer.js
import {
  renderSlot as _renderSlot2,
  withCtx as _withCtx,
  createSlots as _createSlots,
  createVNode as _createVNode,
  createElementVNode as _createElementVNode2,
  normalizeClass as _normalizeClass2,
  openBlock as _openBlock2,
  createElementBlock as _createElementBlock2,
  toDisplayString as _toDisplayString2,
  createCommentVNode as _createCommentVNode2,
  normalizeStyle as _normalizeStyle2
} from 'vue'
import { computed as computed12, ref as ref13, watch as watch5 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-namespace/index.js
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

// docs/public/codesandbox-runtime/hooks/use-z-index/index.js
import { computed, inject as inject2, unref as unref2 } from 'vue'
var zIndexContextKey = Symbol('zIndexContextKey')
var zIndexCounterKey = Symbol('zIndexCounterKey')

// docs/public/codesandbox-runtime/hooks/use-sku/index.js
import { ref as ref2, computed as computed2 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-countdown/index.js
import { ref as ref3, computed as computed3, onUnmounted } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-locale/index.js
import { computed as computed5, unref as unref4, watch } from 'vue'

// docs/public/codesandbox-runtime/locale/lang/zh-cn.js
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
      sold: '\u5DF2\u552E'
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

// docs/public/codesandbox-runtime/hooks/use-config/index.js
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

// docs/public/codesandbox-runtime/hooks/dayjs.js
import * as dayjsModule from 'dayjs'
var _a
var dayjs =
  'default' in dayjsModule ? ((_a = dayjsModule.default) != null ? _a : dayjsModule) : dayjsModule
var stdin_default = dayjs

// docs/public/codesandbox-runtime/hooks/use-locale/dayjs-locale.js
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

// docs/public/codesandbox-runtime/hooks/use-locale/index.js
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
  const t = (path, options) => {
    const keys = path.split('.')
    let result = locale.value.yh
    for (const key of keys) {
      if (result && typeof result === 'object') {
        result = result[key]
      } else {
        result = void 0
      }
      if (result === void 0) return path
    }
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
    const keys = path.split('.')
    let result = locale.value.yh
    for (const key of keys) {
      if (result && typeof result === 'object') {
        result = result[key]
      } else {
        result = void 0
      }
      if (result === void 0) return path
    }
    return result
  }
  return {
    locale,
    lang,
    t,
    tRaw
  }
}

// docs/public/codesandbox-runtime/hooks/use-id/index.js
import { computed as computed6, inject as inject4, unref as unref5, useId as useVueId } from 'vue'
var idInjectionKey = Symbol('idInjectionKey')

// docs/public/codesandbox-runtime/hooks/use-form-item/index.js
import { inject as inject5 } from 'vue'
var FormContextKey = Symbol('FormContextKey')
var FormItemContextKey = Symbol('FormItemContextKey')

// docs/public/codesandbox-runtime/hooks/use-virtual-scroll/index.js
import { ref as ref4, computed as computed7, unref as unref6 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-cache/index.js
import { shallowRef } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-event-listener/index.js
import { onMounted, onBeforeUnmount, isRef, watch as watch2, unref as unref7 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-scroll-lock/index.js
import { ref as ref5, watch as watch3, onUnmounted as onUnmounted2 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-click-outside/index.js
import { unref as unref8 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-chat.js
import { ref as ref7, computed as computed8 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-stream.js
import { ref as ref6 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-conversations.js
import { ref as ref8, computed as computed9 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-request.js
import { ref as ref9 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-voice.js
import { ref as ref10, onUnmounted as onUnmounted3, shallowRef as shallowRef2 } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-ai/use-ai-persistence.js
import { ref as ref11, onMounted as onMounted2 } from 'vue'

// docs/public/codesandbox-runtime/theme/component-theme.js
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

// docs/public/codesandbox-runtime/components/transfer/src/transfer-panel.js
import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  createElementVNode as _createElementVNode,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  vModelText as _vModelText,
  withDirectives as _withDirectives,
  renderList as _renderList,
  Fragment as _Fragment,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle
} from 'vue'
import { computed as computed11, ref as ref12, watch as watch4, provide as provide2 } from 'vue'

// docs/public/codesandbox-runtime/components/transfer/src/transfer-meta.js
var transferPanelContextKey = Symbol('transferPanelContextKey')

// docs/public/codesandbox-runtime/components/transfer/src/transfer-panel.js
var _hoisted_1 = ['placeholder', 'disabled']
var _hoisted_2 = ['onClick']
var _hoisted_3 = ['onClick']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.ns.b())
      },
      [
        _createCommentVNode(' \u5934\u90E8 '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('header'))
          },
          [
            _renderSlot(_ctx.$slots, 'header', {}, () => [
              _createElementVNode(
                'div',
                {
                  class: _normalizeClass([
                    $setup.ns.e('check-all'),
                    {
                      'is-disabled': $props.disabled || $setup.checkableData.length === 0
                    }
                  ]),
                  onClick: $setup.handleCheckAll
                },
                [
                  _createElementVNode(
                    'span',
                    {
                      class: _normalizeClass([
                        $setup.ns.e('item-checkbox'),
                        {
                          'is-checked': $setup.isAllChecked,
                          'is-indeterminate': $setup.isIndeterminate
                        }
                      ])
                    },
                    [
                      _createCommentVNode(' \u9009\u4E2D\u56FE\u6807 '),
                      $setup.isAllChecked
                        ? (_openBlock(),
                          _createElementBlock(
                            'svg',
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e('item-checkbox__icon')),
                              viewBox: '0 0 1024 1024'
                            },
                            [
                              ...(_cache[1] ||
                                (_cache[1] = [
                                  _createElementVNode(
                                    'path',
                                    {
                                      fill: 'currentColor',
                                      d: 'M406.4 726.4l-236.8-236.8 57.6-57.6 179.2 179.2 390.4-390.4 57.6 57.6z'
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
                        : _createCommentVNode('v-if', true),
                      _createCommentVNode(' \u534A\u9009\u56FE\u6807 '),
                      $setup.isIndeterminate && !$setup.isAllChecked
                        ? (_openBlock(),
                          _createElementBlock(
                            'svg',
                            {
                              key: 1,
                              class: _normalizeClass($setup.ns.e('item-checkbox__icon')),
                              viewBox: '0 0 1024 1024'
                            },
                            [
                              ...(_cache[2] ||
                                (_cache[2] = [
                                  _createElementVNode(
                                    'path',
                                    {
                                      fill: 'currentColor',
                                      d: 'M192 480h640v64H192z'
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
                        : _createCommentVNode('v-if', true)
                    ],
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              ),
              _createElementVNode(
                'div',
                {
                  class: _normalizeClass($setup.ns.e('title'))
                },
                [
                  _createElementVNode(
                    'span',
                    null,
                    _toDisplayString($props.title),
                    1
                    /* TEXT */
                  ),
                  _createElementVNode(
                    'span',
                    {
                      class: _normalizeClass($setup.ns.e('count'))
                    },
                    _toDisplayString(
                      $setup.totalCheckedCount > 0
                        ? $setup.t('transfer.hasCheckedFormat', {
                            checked: $setup.totalCheckedCount,
                            total: $props.data.length
                          })
                        : $setup.t('transfer.noCheckedFormat', {
                            total: $props.data.length
                          })
                    ),
                    3
                    /* TEXT, CLASS */
                  )
                ],
                2
                /* CLASS */
              )
            ])
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u641C\u7D22\u6846 '),
        $props.filterable
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('filter'))
              },
              [
                _withDirectives(
                  _createElementVNode(
                    'input',
                    {
                      'onUpdate:modelValue':
                        _cache[0] || (_cache[0] = ($event) => ($setup.query = $event)),
                      type: 'text',
                      class: _normalizeClass($setup.ns.e('filter-input')),
                      placeholder:
                        $props.filterPlaceholder || $setup.t('transfer.filterPlaceholder'),
                      disabled: $props.disabled
                    },
                    null,
                    10,
                    _hoisted_1
                  ),
                  [[_vModelText, $setup.query]]
                )
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u5217\u8868\u533A\u57DF '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('body'))
          },
          [
            _createCommentVNode(' \u7A7A\u72B6\u6001 '),
            $setup.filteredData.length === 0
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('empty'))
                  },
                  [
                    _renderSlot(_ctx.$slots, 'empty', {}, () => [
                      (_openBlock(),
                      _createElementBlock(
                        'svg',
                        {
                          class: _normalizeClass($setup.ns.e('empty-icon')),
                          viewBox: '0 0 1024 1024'
                        },
                        [
                          ...(_cache[3] ||
                            (_cache[3] = [
                              _createElementVNode(
                                'path',
                                {
                                  fill: 'currentColor',
                                  d: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'
                                },
                                null,
                                -1
                                /* CACHED */
                              ),
                              _createElementVNode(
                                'path',
                                {
                                  fill: 'currentColor',
                                  d: 'M464 336a48 48 0 1096 0 48 48 0 10-96 0zM464 512v176c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16V512c0-8.8-7.2-16-16-16h-64c-8.8 0-16 7.2-16 16z'
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
                        {
                          class: _normalizeClass($setup.ns.e('empty-text'))
                        },
                        _toDisplayString($props.emptyText || $setup.t('transfer.noData')),
                        3
                        /* TEXT, CLASS */
                      )
                    ])
                  ],
                  2
                  /* CLASS */
                ))
              : $props.virtual
                ? (_openBlock(),
                  _createElementBlock(
                    _Fragment,
                    { key: 1 },
                    [
                      _createCommentVNode(' \u865A\u62DF\u6EDA\u52A8\u5217\u8868 '),
                      _createElementVNode(
                        'div',
                        {
                          ref: 'virtualWrapperRef',
                          class: _normalizeClass($setup.ns.e('virtual-wrapper')),
                          style: _normalizeStyle({
                            height: $props.height + 'px'
                          }),
                          onScroll: $setup.handleVirtualScroll
                        },
                        [
                          _createElementVNode(
                            'div',
                            {
                              style: _normalizeStyle({
                                height: $setup.virtualConfig.totalHeight + 'px',
                                position: 'relative'
                              })
                            },
                            [
                              _createElementVNode(
                                'ul',
                                {
                                  class: _normalizeClass($setup.ns.e('list')),
                                  style: _normalizeStyle({
                                    transform: `translateY(${$setup.virtualConfig.offsetY}px)`
                                  })
                                },
                                [
                                  (_openBlock(true),
                                  _createElementBlock(
                                    _Fragment,
                                    null,
                                    _renderList($setup.displayItems, (item) => {
                                      return (
                                        _openBlock(),
                                        _createElementBlock(
                                          'li',
                                          {
                                            key: $setup.getKey(item),
                                            class: _normalizeClass([
                                              $setup.ns.e('item'),
                                              {
                                                'is-checked': $setup.isChecked($setup.getKey(item)),
                                                'is-disabled': $setup.isItemDisabled(item)
                                              }
                                            ]),
                                            style: _normalizeStyle({
                                              height: $props.itemHeight + 'px'
                                            }),
                                            onClick: ($event) => $setup.handleItemClick(item)
                                          },
                                          [
                                            _createElementVNode(
                                              'span',
                                              {
                                                class: _normalizeClass([
                                                  $setup.ns.e('item-checkbox'),
                                                  {
                                                    'is-checked': $setup.isChecked(
                                                      $setup.getKey(item)
                                                    )
                                                  }
                                                ])
                                              },
                                              [
                                                $setup.isChecked($setup.getKey(item))
                                                  ? (_openBlock(),
                                                    _createElementBlock(
                                                      'svg',
                                                      {
                                                        key: 0,
                                                        class: _normalizeClass(
                                                          $setup.ns.e('item-checkbox__icon')
                                                        ),
                                                        viewBox: '0 0 1024 1024'
                                                      },
                                                      [
                                                        ...(_cache[4] ||
                                                          (_cache[4] = [
                                                            _createElementVNode(
                                                              'path',
                                                              {
                                                                fill: 'currentColor',
                                                                d: 'M406.4 726.4l-236.8-236.8 57.6-57.6 179.2 179.2 390.4-390.4 57.6 57.6z'
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
                                                  : _createCommentVNode('v-if', true)
                                              ],
                                              2
                                              /* CLASS */
                                            ),
                                            _createElementVNode(
                                              'span',
                                              {
                                                class: _normalizeClass($setup.ns.e('item-label'))
                                              },
                                              [
                                                _renderSlot(
                                                  _ctx.$slots,
                                                  'default',
                                                  { option: item },
                                                  () => [
                                                    _createTextVNode(
                                                      _toDisplayString($setup.getLabel(item)),
                                                      1
                                                      /* TEXT */
                                                    )
                                                  ]
                                                )
                                              ],
                                              2
                                              /* CLASS */
                                            )
                                          ],
                                          14,
                                          _hoisted_2
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
                            4
                            /* STYLE */
                          )
                        ],
                        38
                        /* CLASS, STYLE, NEED_HYDRATION */
                      )
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  ))
                : (_openBlock(),
                  _createElementBlock(
                    _Fragment,
                    { key: 2 },
                    [
                      _createCommentVNode(' \u666E\u901A\u5217\u8868 '),
                      _createElementVNode(
                        'ul',
                        {
                          class: _normalizeClass($setup.ns.e('list'))
                        },
                        [
                          (_openBlock(true),
                          _createElementBlock(
                            _Fragment,
                            null,
                            _renderList($setup.displayItems, (item) => {
                              return (
                                _openBlock(),
                                _createElementBlock(
                                  'li',
                                  {
                                    key: $setup.getKey(item),
                                    class: _normalizeClass([
                                      $setup.ns.e('item'),
                                      {
                                        'is-checked': $setup.isChecked($setup.getKey(item)),
                                        'is-disabled': $setup.isItemDisabled(item)
                                      }
                                    ]),
                                    onClick: ($event) => $setup.handleItemClick(item)
                                  },
                                  [
                                    _createElementVNode(
                                      'span',
                                      {
                                        class: _normalizeClass([
                                          $setup.ns.e('item-checkbox'),
                                          {
                                            'is-checked': $setup.isChecked($setup.getKey(item))
                                          }
                                        ])
                                      },
                                      [
                                        $setup.isChecked($setup.getKey(item))
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              'svg',
                                              {
                                                key: 0,
                                                class: _normalizeClass(
                                                  $setup.ns.e('item-checkbox__icon')
                                                ),
                                                viewBox: '0 0 1024 1024'
                                              },
                                              [
                                                ...(_cache[5] ||
                                                  (_cache[5] = [
                                                    _createElementVNode(
                                                      'path',
                                                      {
                                                        fill: 'currentColor',
                                                        d: 'M406.4 726.4l-236.8-236.8 57.6-57.6 179.2 179.2 390.4-390.4 57.6 57.6z'
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
                                          : _createCommentVNode('v-if', true)
                                      ],
                                      2
                                      /* CLASS */
                                    ),
                                    _createElementVNode(
                                      'span',
                                      {
                                        class: _normalizeClass($setup.ns.e('item-label'))
                                      },
                                      [
                                        _renderSlot(
                                          _ctx.$slots,
                                          'default',
                                          { option: item },
                                          () => [
                                            _createTextVNode(
                                              _toDisplayString($setup.getLabel(item)),
                                              1
                                              /* TEXT */
                                            )
                                          ]
                                        )
                                      ],
                                      2
                                      /* CLASS */
                                    )
                                  ],
                                  10,
                                  _hoisted_3
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
                    2112
                    /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                  ))
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u5E95\u90E8\u63D2\u69FD '),
        _ctx.$slots.footer
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 1,
                class: _normalizeClass($setup.ns.e('footer'))
              },
              [_renderSlot(_ctx.$slots, 'footer')],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true)
      ],
      2
      /* CLASS */
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhTransferPanel'
  },
  {
    __name: 'transfer-panel',
    props: {
      data: { type: Array, required: true, default: () => [] },
      checked: { type: Array, required: true, default: () => [] },
      title: { type: String, required: false, default: '' },
      filterable: { type: Boolean, required: false, default: false },
      filterPlaceholder: { type: String, required: false },
      filterMethod: { type: Function, required: false },
      disabled: { type: Boolean, required: false, default: false },
      size: { type: null, required: false, default: 'default' },
      props: { type: Object, required: false },
      renderContent: { type: Function, required: false },
      virtual: { type: Boolean, required: false, default: false },
      itemHeight: { type: Number, required: false, default: 40 },
      height: { type: Number, required: false, default: 280 },
      showAllCheckbox: { type: Boolean, required: false, default: true },
      emptyText: { type: String, required: false }
    },
    emits: ['update:checked', 'checked-change'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('transfer-panel')
      const { t } = useLocale()
      const query = ref12('')
      const scrollTop = ref12(0)
      const virtualWrapperRef = ref12()
      const keyProp = computed11(() => {
        var _a2
        return ((_a2 = props.props) == null ? void 0 : _a2.key) || 'key'
      })
      const labelProp = computed11(() => {
        var _a2
        return ((_a2 = props.props) == null ? void 0 : _a2.label) || 'label'
      })
      const disabledProp = computed11(() => {
        var _a2
        return ((_a2 = props.props) == null ? void 0 : _a2.disabled) || 'disabled'
      })
      const getKey = (item) => {
        var _a2
        return (_a2 = item[keyProp.value]) != null ? _a2 : ''
      }
      const getLabel = (item) => {
        return String(item[labelProp.value] || '')
      }
      const isItemDisabled = (item) => {
        var _a2
        return Boolean(item[disabledProp.value]) || ((_a2 = props.disabled) != null ? _a2 : false)
      }
      const filteredData = computed11(() => {
        if (!query.value) return props.data
        const q = query.value.toLowerCase()
        if (props.filterMethod) {
          return props.data.filter((item) => props.filterMethod(query.value, item))
        }
        return props.data.filter((item) => {
          const label = getLabel(item)
          return label.toLowerCase().includes(q)
        })
      })
      const checkableData = computed11(() => {
        return filteredData.value.filter((item) => !isItemDisabled(item))
      })
      const checkedKeys = computed11(() => props.checked)
      const isChecked = (key) => {
        return checkedKeys.value.includes(key)
      }
      const isAllChecked = computed11(() => {
        if (checkableData.value.length === 0) return false
        return checkableData.value.every((item) => isChecked(getKey(item)))
      })
      const isIndeterminate = computed11(() => {
        const checkedCount = checkableData.value.filter((item) => isChecked(getKey(item))).length
        return checkedCount > 0 && checkedCount < checkableData.value.length
      })
      const totalCheckedCount = computed11(() => {
        return props.data.filter((item) => isChecked(getKey(item))).length
      })
      const virtualConfig = computed11(() => {
        const itemHeight = props.itemHeight || 40
        const containerHeight = props.height || 280
        const overscan = 3
        const items = filteredData.value
        if (!props.virtual || items.length === 0) {
          return {
            visibleItems: items,
            totalHeight: items.length * itemHeight,
            offsetY: 0,
            startIndex: 0,
            endIndex: items.length
          }
        }
        const totalHeight = items.length * itemHeight
        const startIndex = Math.max(0, Math.floor(scrollTop.value / itemHeight) - overscan)
        const visibleCount = Math.ceil(containerHeight / itemHeight)
        const endIndex = Math.min(items.length, startIndex + visibleCount + overscan * 2)
        return {
          visibleItems: items.slice(startIndex, endIndex),
          totalHeight,
          offsetY: startIndex * itemHeight,
          startIndex,
          endIndex
        }
      })
      const displayItems = computed11(() => {
        return props.virtual ? virtualConfig.value.visibleItems : filteredData.value
      })
      const handleVirtualScroll = (event) => {
        const target = event.target
        scrollTop.value = target.scrollTop
      }
      const handleCheck = (key, checked) => {
        if (props.disabled) return
        const newChecked = [...checkedKeys.value]
        const index = newChecked.indexOf(key)
        if (checked) {
          if (index === -1) {
            newChecked.push(key)
          }
        } else {
          if (index > -1) {
            newChecked.splice(index, 1)
          }
        }
        emit('update:checked', newChecked)
        emit('checked-change', newChecked, [key])
      }
      const handleItemClick = (item) => {
        if (isItemDisabled(item)) return
        const key = getKey(item)
        handleCheck(key, !isChecked(key))
      }
      const handleCheckAll = () => {
        if (props.disabled || checkableData.value.length === 0) return
        let newChecked
        if (isAllChecked.value) {
          const checkableKeys = new Set(checkableData.value.map((item) => getKey(item)))
          newChecked = checkedKeys.value.filter((key) => !checkableKeys.has(key))
        } else {
          const checkableKeys = checkableData.value.map((item) => getKey(item))
          newChecked = [.../* @__PURE__ */ new Set([...checkedKeys.value, ...checkableKeys])]
        }
        emit('update:checked', newChecked)
        emit('checked-change', newChecked)
      }
      const clearChecked = () => {
        emit('update:checked', [])
        emit('checked-change', [])
      }
      provide2(transferPanelContextKey, {
        props,
        checked: checkedKeys.value,
        handleCheck
      })
      __expose({
        clearChecked,
        query: query.value
      })
      watch4(query, () => {
        scrollTop.value = 0
        if (virtualWrapperRef.value) {
          virtualWrapperRef.value.scrollTop = 0
        }
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        query,
        scrollTop,
        virtualWrapperRef,
        keyProp,
        labelProp,
        disabledProp,
        getKey,
        getLabel,
        isItemDisabled,
        filteredData,
        checkableData,
        checkedKeys,
        isChecked,
        isAllChecked,
        isIndeterminate,
        totalCheckedCount,
        virtualConfig,
        displayItems,
        handleVirtualScroll,
        handleCheck,
        handleItemClick,
        handleCheckAll,
        clearChecked,
        computed: computed11,
        ref: ref12,
        watch: watch4,
        provide: provide2,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get transferPanelContextKey() {
          return transferPanelContextKey
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default2 = __sfc__

// docs/public/codesandbox-runtime/components/transfer/src/transfer.js
var _hoisted_12 = ['disabled']
var _hoisted_22 = ['disabled']
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock2(),
    _createElementBlock2(
      'div',
      {
        class: _normalizeClass2($setup.containerClasses),
        style: _normalizeStyle2($setup.themeStyle)
      },
      [
        _createVNode(
          $setup['TransferPanel'],
          {
            ref: 'leftPanelRef',
            data: $setup.leftData,
            checked: $setup.leftChecked,
            title: $setup.leftTitle,
            filterable: $props.filterable,
            'filter-placeholder': $setup.filterPlaceholder,
            'filter-method': $props.filterMethod,
            disabled: $props.disabled,
            size: $props.size,
            props: $setup.props.props,
            'render-content': $props.renderContent,
            virtual: $props.virtual,
            'item-height': $props.itemHeight,
            height: $props.height,
            'show-all-checkbox': $props.showAllCheckbox,
            'empty-text': $setup.leftEmptyText,
            'onUpdate:checked': $setup.handleLeftCheckedChange,
            onCheckedChange: $setup.handleLeftCheckedChange
          },
          _createSlots(
            {
              _: 2
              /* DYNAMIC */
            },
            [
              _ctx.$slots['left-header']
                ? {
                    name: 'header',
                    fn: _withCtx(() => [_renderSlot2(_ctx.$slots, 'left-header')]),
                    key: '0'
                  }
                : void 0,
              _ctx.$slots.default
                ? {
                    name: 'default',
                    fn: _withCtx(({ option }) => [
                      _renderSlot2(_ctx.$slots, 'default', { option })
                    ]),
                    key: '1'
                  }
                : void 0,
              _ctx.$slots['left-empty']
                ? {
                    name: 'empty',
                    fn: _withCtx(() => [_renderSlot2(_ctx.$slots, 'left-empty')]),
                    key: '2'
                  }
                : void 0,
              _ctx.$slots['left-footer']
                ? {
                    name: 'footer',
                    fn: _withCtx(() => [_renderSlot2(_ctx.$slots, 'left-footer')]),
                    key: '3'
                  }
                : void 0
            ]
          ),
          1032,
          [
            'data',
            'checked',
            'title',
            'filterable',
            'filter-placeholder',
            'filter-method',
            'disabled',
            'size',
            'props',
            'render-content',
            'virtual',
            'item-height',
            'height',
            'show-all-checkbox',
            'empty-text'
          ]
        ),
        _createElementVNode2(
          'div',
          {
            class: _normalizeClass2($setup.ns.e('buttons'))
          },
          [
            _renderSlot2(
              _ctx.$slots,
              'buttons',
              {
                moveToLeft: $setup.moveToLeft,
                moveToRight: $setup.moveToRight,
                leftChecked: $setup.leftChecked,
                rightChecked: $setup.rightChecked
              },
              () => [
                _createElementVNode2(
                  'button',
                  {
                    type: 'button',
                    class: _normalizeClass2([
                      $setup.ns.e('button'),
                      {
                        'is-disabled': !$setup.canMoveToRight || $props.disabled
                      }
                    ]),
                    disabled: !$setup.canMoveToRight || $props.disabled,
                    onClick: $setup.moveToRight
                  },
                  [
                    (_openBlock2(),
                    _createElementBlock2(
                      'svg',
                      {
                        class: _normalizeClass2($setup.ns.e('button__icon')),
                        viewBox: '0 0 1024 1024'
                      },
                      [
                        ...(_cache[0] ||
                          (_cache[0] = [
                            _createElementVNode2(
                              'path',
                              {
                                fill: 'currentColor',
                                d: 'M340.864 149.312a30.592 30.592 0 000 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0042.752 43.458l355.136-362.88a30.592 30.592 0 000-43.52L383.616 106.56a30.592 30.592 0 00-42.752 42.752z'
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
                    $props.buttonTexts && $props.buttonTexts[0]
                      ? (_openBlock2(),
                        _createElementBlock2(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass2($setup.ns.e('button__text'))
                          },
                          _toDisplayString2($props.buttonTexts[0]),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode2('v-if', true)
                  ],
                  10,
                  _hoisted_12
                ),
                _createElementVNode2(
                  'button',
                  {
                    type: 'button',
                    class: _normalizeClass2([
                      $setup.ns.e('button'),
                      {
                        'is-disabled': !$setup.canMoveToLeft || $props.disabled
                      }
                    ]),
                    disabled: !$setup.canMoveToLeft || $props.disabled,
                    onClick: $setup.moveToLeft
                  },
                  [
                    (_openBlock2(),
                    _createElementBlock2(
                      'svg',
                      {
                        class: _normalizeClass2($setup.ns.e('button__icon')),
                        viewBox: '0 0 1024 1024'
                      },
                      [
                        ...(_cache[1] ||
                          (_cache[1] = [
                            _createElementVNode2(
                              'path',
                              {
                                fill: 'currentColor',
                                d: 'M685.248 104.256a30.592 30.592 0 010 42.752L373.376 512l311.872 364.992a30.592 30.592 0 11-42.752 43.458L287.38 555.52a30.592 30.592 0 010-43.52l355.136-364.93a30.592 30.592 0 0142.752 0z'
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
                    $props.buttonTexts && $props.buttonTexts[1]
                      ? (_openBlock2(),
                        _createElementBlock2(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass2($setup.ns.e('button__text'))
                          },
                          _toDisplayString2($props.buttonTexts[1]),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode2('v-if', true)
                  ],
                  10,
                  _hoisted_22
                )
              ]
            )
          ],
          2
          /* CLASS */
        ),
        _createVNode(
          $setup['TransferPanel'],
          {
            ref: 'rightPanelRef',
            data: $setup.rightData,
            checked: $setup.rightChecked,
            title: $setup.rightTitle,
            filterable: $props.filterable,
            'filter-placeholder': $setup.filterPlaceholder,
            'filter-method': $props.filterMethod,
            disabled: $props.disabled,
            size: $props.size,
            props: $setup.props.props,
            'render-content': $props.renderContent,
            virtual: $props.virtual,
            'item-height': $props.itemHeight,
            height: $props.height,
            'show-all-checkbox': $props.showAllCheckbox,
            'empty-text': $setup.rightEmptyText,
            'onUpdate:checked': $setup.handleRightCheckedChange,
            onCheckedChange: $setup.handleRightCheckedChange
          },
          _createSlots(
            {
              _: 2
              /* DYNAMIC */
            },
            [
              _ctx.$slots['right-header']
                ? {
                    name: 'header',
                    fn: _withCtx(() => [_renderSlot2(_ctx.$slots, 'right-header')]),
                    key: '0'
                  }
                : void 0,
              _ctx.$slots.default
                ? {
                    name: 'default',
                    fn: _withCtx(({ option }) => [
                      _renderSlot2(_ctx.$slots, 'default', { option })
                    ]),
                    key: '1'
                  }
                : void 0,
              _ctx.$slots['right-empty']
                ? {
                    name: 'empty',
                    fn: _withCtx(() => [_renderSlot2(_ctx.$slots, 'right-empty')]),
                    key: '2'
                  }
                : void 0,
              _ctx.$slots['right-footer']
                ? {
                    name: 'footer',
                    fn: _withCtx(() => [_renderSlot2(_ctx.$slots, 'right-footer')]),
                    key: '3'
                  }
                : void 0
            ]
          ),
          1032,
          [
            'data',
            'checked',
            'title',
            'filterable',
            'filter-placeholder',
            'filter-method',
            'disabled',
            'size',
            'props',
            'render-content',
            'virtual',
            'item-height',
            'height',
            'show-all-checkbox',
            'empty-text'
          ]
        )
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
var __sfc__2 = /* @__PURE__ */ Object.assign(
  {
    name: 'YhTransfer'
  },
  {
    __name: 'transfer',
    props: {
      modelValue: { type: Array, required: false, default: () => [] },
      data: { type: Array, required: false, default: () => [] },
      filterable: { type: Boolean, required: false, default: false },
      filterMethod: { type: Function, required: false },
      filterPlaceholder: { type: String, required: false },
      targetOrder: { type: String, required: false, default: 'original' },
      titles: { type: Array, required: false },
      buttonTexts: { type: Array, required: false, default: () => [] },
      renderContent: { type: Function, required: false },
      leftDefaultChecked: { type: Array, required: false, default: () => [] },
      rightDefaultChecked: { type: Array, required: false, default: () => [] },
      props: { type: Object, required: false },
      disabled: { type: Boolean, required: false, default: false },
      size: { type: null, required: false, default: 'default' },
      validateEvent: { type: Boolean, required: false, default: true },
      virtual: { type: Boolean, required: false, default: false },
      itemHeight: { type: Number, required: false, default: 40 },
      height: { type: Number, required: false, default: 280 },
      leftTitle: { type: String, required: false },
      rightTitle: { type: String, required: false },
      showAllCheckbox: { type: Boolean, required: false, default: true },
      emptyText: { type: String, required: false },
      leftEmptyText: { type: String, required: false },
      rightEmptyText: { type: String, required: false },
      themeOverrides: { type: null, required: false }
    },
    emits: ['update:modelValue', 'change', 'left-check-change', 'right-check-change'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('transfer')
      const { t } = useLocale()
      const { globalSize } = useConfig()
      const { themeStyle } = useComponentTheme(
        'transfer',
        computed12(() => props.themeOverrides)
      )
      const leftPanelRef = ref13()
      const rightPanelRef = ref13()
      const leftChecked = ref13([...props.leftDefaultChecked])
      const rightChecked = ref13([...props.rightDefaultChecked])
      const keyProp = computed12(() => {
        var _a2
        return ((_a2 = props.props) == null ? void 0 : _a2.key) || 'key'
      })
      const getKey = (item) => {
        var _a2
        return (_a2 = item[keyProp.value]) != null ? _a2 : ''
      }
      const targetKeys = computed12(() => new Set(props.modelValue))
      const leftData = computed12(() => {
        return props.data.filter((item) => !targetKeys.value.has(getKey(item)))
      })
      const rightData = computed12(() => {
        var _a2
        if (props.targetOrder === 'original') {
          return props.data.filter((item) => targetKeys.value.has(getKey(item)))
        }
        const dataMap = new Map(props.data.map((item) => [getKey(item), item]))
        return ((_a2 = props.modelValue) != null ? _a2 : [])
          .map((key) => dataMap.get(key))
          .filter((item) => item !== void 0)
      })
      const leftTitle = computed12(() => {
        var _a2
        return (
          props.leftTitle ||
          ((_a2 = props.titles) == null ? void 0 : _a2[0]) ||
          t('transfer.titles.0')
        )
      })
      const rightTitle = computed12(() => {
        var _a2
        return (
          props.rightTitle ||
          ((_a2 = props.titles) == null ? void 0 : _a2[1]) ||
          t('transfer.titles.1')
        )
      })
      const leftEmptyText = computed12(
        () => props.leftEmptyText || props.emptyText || t('transfer.noData')
      )
      const rightEmptyText = computed12(
        () => props.rightEmptyText || props.emptyText || t('transfer.noData')
      )
      const filterPlaceholder = computed12(
        () => props.filterPlaceholder || t('transfer.filterPlaceholder')
      )
      const canMoveToRight = computed12(() => leftChecked.value.length > 0)
      const canMoveToLeft = computed12(() => rightChecked.value.length > 0)
      const containerClasses = computed12(() => [
        ns.b(),
        ns.m(props.size || globalSize.value || 'default'),
        ns.is('disabled', props.disabled)
      ])
      const moveToRight = () => {
        var _a2, _b
        if (!canMoveToRight.value || props.disabled) return
        const movedKeys = [...leftChecked.value]
        let newValue
        if (props.targetOrder === 'unshift') {
          newValue = [...movedKeys, ...((_a2 = props.modelValue) != null ? _a2 : [])]
        } else {
          newValue = [...((_b = props.modelValue) != null ? _b : []), ...movedKeys]
        }
        if (props.targetOrder === 'original') {
          const keySet = new Set(newValue)
          newValue = props.data
            .filter((item) => keySet.has(getKey(item)))
            .map((item) => getKey(item))
        }
        emit('update:modelValue', newValue)
        emit('change', newValue, 'right', movedKeys)
        leftChecked.value = []
      }
      const moveToLeft = () => {
        var _a2
        if (!canMoveToLeft.value || props.disabled) return
        const movedKeys = [...rightChecked.value]
        const movedKeysSet = new Set(movedKeys)
        const newValue = ((_a2 = props.modelValue) != null ? _a2 : []).filter(
          (key) => !movedKeysSet.has(key)
        )
        emit('update:modelValue', newValue)
        emit('change', newValue, 'left', movedKeys)
        rightChecked.value = []
      }
      const handleLeftCheckedChange = (value, movedKeys) => {
        leftChecked.value = value
        emit('left-check-change', value, movedKeys)
      }
      const handleRightCheckedChange = (value, movedKeys) => {
        rightChecked.value = value
        emit('right-check-change', value, movedKeys)
      }
      const clearLeftChecked = () => {
        leftChecked.value = []
      }
      const clearRightChecked = () => {
        rightChecked.value = []
      }
      watch5(
        () => props.modelValue,
        () => {
          const leftDataKeys = new Set(leftData.value.map((item) => getKey(item)))
          leftChecked.value = leftChecked.value.filter((key) => leftDataKeys.has(key))
          const rightDataKeys = new Set(rightData.value.map((item) => getKey(item)))
          rightChecked.value = rightChecked.value.filter((key) => rightDataKeys.has(key))
        },
        { deep: true }
      )
      __expose({
        clearLeftChecked,
        clearRightChecked,
        leftPanel: leftPanelRef.value,
        rightPanel: rightPanelRef.value
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        globalSize,
        themeStyle,
        leftPanelRef,
        rightPanelRef,
        leftChecked,
        rightChecked,
        keyProp,
        getKey,
        targetKeys,
        leftData,
        rightData,
        leftTitle,
        rightTitle,
        leftEmptyText,
        rightEmptyText,
        filterPlaceholder,
        canMoveToRight,
        canMoveToLeft,
        containerClasses,
        moveToRight,
        moveToLeft,
        handleLeftCheckedChange,
        handleRightCheckedChange,
        clearLeftChecked,
        clearRightChecked,
        computed: computed12,
        ref: ref13,
        watch: watch5,
        get useNamespace() {
          return useNamespace
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
        TransferPanel: stdin_default2
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__2.render = render2
var stdin_default3 = __sfc__2
export { stdin_default3 as default }
