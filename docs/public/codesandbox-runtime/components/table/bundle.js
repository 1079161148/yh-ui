// public/codesandbox-runtime/components/table/src/table.js
import {
  createCommentVNode as _createCommentVNode3,
  renderSlot as _renderSlot3,
  normalizeClass as _normalizeClass3,
  createElementVNode as _createElementVNode3,
  openBlock as _openBlock3,
  createElementBlock as _createElementBlock3,
  normalizeStyle as _normalizeStyle3,
  renderList as _renderList2,
  Fragment as _Fragment2,
  toDisplayString as _toDisplayString3,
  resolveDynamicComponent as _resolveDynamicComponent,
  createBlock as _createBlock3,
  createTextVNode as _createTextVNode2,
  withModifiers as _withModifiers,
  mergeProps as _mergeProps,
  withCtx as _withCtx3,
  createVNode as _createVNode3
} from 'vue'
import {
  computed as computed17,
  ref as ref19,
  provide as provide2,
  watch as watch8,
  onMounted as onMounted5,
  nextTick as nextTick2,
  useSlots
} from 'vue'

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

// public/codesandbox-runtime/components/table/src/table-meta.js
var tableProps = {
  /** 数据源 */
  data: {
    type: Array,
    default: () => []
  },
  /** 列配置 */
  columns: {
    type: Array,
    default: () => []
  },
  /** 行唯一标识 */
  rowKey: {
    type: [String, Function],
    default: 'id'
  },
  /** 表格尺寸 */
  size: {
    type: String,
    default: 'default'
  },
  /** 表格高度 */
  height: {
    type: [Number, String]
  },
  /** 表格最大高度 */
  maxHeight: {
    type: [Number, String]
  },
  /** 表格宽度 */
  width: {
    type: [Number, String]
  },
  /** 是否显示边框 */
  border: {
    type: [Boolean, String],
    default: false
  },
  /** 是否显示斑马纹 */
  stripe: {
    type: Boolean,
    default: false
  },
  /** 是否高亮当前行 */
  highlightCurrentRow: {
    type: Boolean,
    default: false
  },
  /** 当前选中行 */
  currentRowKey: {
    type: [String, Number]
  },
  /** 是否显示表头 */
  showHeader: {
    type: Boolean,
    default: true
  },
  /** 空数据显示文本 */
  emptyText: {
    type: String,
    default: ''
  },
  /** 是否自适应父容器 */
  fit: {
    type: Boolean,
    default: true
  },
  /** 排序配置 */
  sortConfig: {
    type: Object
  },
  /** 筛选配置 */
  filterConfig: {
    type: Object
  },
  /** 分页配置 */
  pagination: {
    type: [Boolean, Object],
    default: false
  },
  /** 选择配置 */
  selectionConfig: {
    type: Object
  },
  /** 展开配置 */
  expandConfig: {
    type: Object
  },
  /** 树形配置 */
  treeConfig: {
    type: Object
  },
  /** 虚拟滚动配置 */
  virtualConfig: {
    type: Object
  },
  /** 拖拽配置 */
  dragConfig: {
    type: Object
  },
  /** 汇总配置 */
  summaryConfig: {
    type: Object
  },
  /** 工具栏配置 */
  toolbarConfig: {
    type: Object
  },
  /** 空状态配置 */
  emptyConfig: {
    type: Object
  },
  /** 加载配置 */
  loading: {
    type: [Boolean, Object],
    default: false
  },
  /** 行配置 */
  rowConfig: {
    type: Object
  },
  /** 表头配置 */
  headerConfig: {
    type: Object
  },
  /** 右键菜单配置 */
  contextMenuConfig: {
    type: Object
  },
  /** 表格布局 */
  tableLayout: {
    type: String,
    default: 'fixed'
  },
  /** 溢出提示效果 */
  tooltipEffect: {
    type: String,
    default: 'dark'
  },
  /** 合并单元格方法 */
  spanMethod: {
    type: Function
  },
  /** 行类名 */
  rowClassName: {
    type: [String, Function]
  },
  /** 行样式 */
  rowStyle: {
    type: [Object, Function]
  },
  /** 单元格类名 */
  cellClassName: {
    type: [String, Function]
  },
  /** 单元格样式 */
  cellStyle: {
    type: [Object, Function]
  },
  /** 表头行类名 */
  headerRowClassName: {
    type: [String, Function]
  },
  /** 表头行样式 */
  headerRowStyle: {
    type: [Object, Function]
  },
  /** 表头单元格类名 */
  headerCellClassName: {
    type: [String, Function]
  },
  /** 表头单元格样式 */
  headerCellStyle: {
    type: [Object, Function]
  },
  /** 是否懒加载 */
  lazy: {
    type: Boolean,
    default: false
  },
  /** 懒加载方法 */
  loadMethod: {
    type: Function
  },
  /** 是否可调整列宽 */
  resizable: {
    type: Boolean,
    default: false
  },
  /** 是否显示序号 */
  showIndex: {
    type: Boolean,
    default: false
  },
  /** 序号列配置 */
  indexConfig: {
    type: Object
  },
  /** 自适应内容高度 */
  autoHeight: {
    type: Boolean,
    default: false
  },
  /** 保持滚动位置 */
  keepScroll: {
    type: Boolean,
    default: false
  },
  /** 同步滚动 */
  syncScroll: {
    type: Boolean,
    default: true
  },
  /** 滚动优化 */
  scrollOptimize: {
    type: Boolean,
    default: true
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
var tableEmits = {
  /** 排序变化 */
  'sort-change': (_params) => true,
  /** 筛选变化 */
  'filter-change': (_filters) => true,
  /** 分页变化 */
  'page-change': (_params) => true,
  /** 选择变化 */
  'selection-change': (_selectedRows, _selectedRowKeys) => true,
  /** 当前行变化 */
  'current-change': (_currentRow, _oldRow) => true,
  /** 展开变化 */
  'expand-change': (_row, _expandedRows) => true,
  /** 行点击 */
  'row-click': (_row, _column, _event) => true,
  /** 行双击 */
  'row-dblclick': (_row, _column, _event) => true,
  /** 行右键 */
  'row-contextmenu': (_row, _column, _event) => true,
  /** 单元格点击 */
  'cell-click': (_row, _column, _cell, _event) => true,
  /** 单元格双击 */
  'cell-dblclick': (_row, _column, _cell, _event) => true,
  /** 表头点击 */
  'header-click': (_column, _event) => true,
  /** 表头右键 */
  'header-contextmenu': (_column, _event) => true,
  /** 全选 */
  'select-all': (_selection) => true,
  /** 选择行 */
  select: (_selection, _row) => true,
  /** 滚动事件 */
  scroll: (_params) => true,
  /** 拖拽结束 */
  'drag-end': (_params) => true,
  /** 列宽变化 */
  'column-resize': (_column, _width) => true,
  /** 列可见性变化 */
  'column-visible-change': (_columns) => true,
  /** 数据更新 */
  'update:data': (_data) => true,
  /** 当前行 key 更新 */
  'update:currentRowKey': (_key) => true
}
var tableContextKey = Symbol('tableContextKey')

// public/codesandbox-runtime/components/table/src/utils.js
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
var getRowKey = (row, rowKey) => {
  if (typeof rowKey === 'function') {
    return rowKey(row)
  }
  return row[rowKey]
}
var flattenColumns = (columns) => {
  const result = []
  const flatten = (cols) => {
    cols.forEach((col) => {
      var _a2
      if ((_a2 = col.children) == null ? void 0 : _a2.length) {
        flatten(col.children)
      } else {
        result.push(col)
      }
    })
  }
  flatten(columns)
  return result
}
var getColumnDepth = (columns) => {
  let depth = 1
  const getDepth = (cols, level) => {
    cols.forEach((col) => {
      var _a2
      if ((_a2 = col.children) == null ? void 0 : _a2.length) {
        depth = Math.max(depth, level + 1)
        getDepth(col.children, level + 1)
      }
    })
  }
  getDepth(columns, 1)
  return depth
}
var getLeafCount = (col) => {
  var _a2
  if (!((_a2 = col.children) == null ? void 0 : _a2.length)) return 1
  return col.children.reduce((sum, child) => sum + getLeafCount(child), 0)
}
var buildHeaderRows = (columns) => {
  const maxDepth = getColumnDepth(columns)
  if (maxDepth <= 1) return []
  const rows = Array.from({ length: maxDepth }, () => [])
  const traverse = (cols, level) => {
    cols.forEach((col) => {
      var _a2
      if ((_a2 = col.children) == null ? void 0 : _a2.length) {
        rows[level].push({
          column: col,
          colspan: getLeafCount(col),
          rowspan: 1
        })
        traverse(col.children, level + 1)
      } else {
        rows[level].push({
          column: col,
          colspan: 1,
          rowspan: maxDepth - level
        })
      }
    })
  }
  traverse(columns, 0)
  return rows
}
var defaultSortMethod = (a, b, prop, order) => {
  if (!order) return 0
  const aVal = a[prop]
  const bVal = b[prop]
  if (aVal == null && bVal == null) return 0
  if (aVal == null) return order === 'asc' ? 1 : -1
  if (bVal == null) return order === 'asc' ? -1 : 1
  if (typeof aVal === 'number' && typeof bVal === 'number') {
    return order === 'asc' ? aVal - bVal : bVal - aVal
  }
  const aStr = String(aVal)
  const bStr = String(bVal)
  const result = aStr.localeCompare(bStr, 'zh-CN')
  return order === 'asc' ? result : -result
}
var defaultFilterMethod = (value, row, column) => {
  const prop = column.prop
  if (!prop) return true
  const cellValue = row[prop]
  return cellValue === value
}
var multiValueFilter = (data, filters, columns, filterMultiple = true) => {
  const activeFilters = Object.entries(filters).filter(([, values]) => values.length > 0)
  if (!activeFilters.length) return data
  return data.filter((row) => {
    return activeFilters.every(([prop, values]) => {
      const column = columns.find((col) => col.prop === prop)
      if (!column) return true
      const filterMethod = column.filterMethod || defaultFilterMethod
      if (filterMultiple || column.filterMultiple !== false) {
        return values.some((value) => filterMethod(value, row, column))
      }
      return filterMethod(values[0], row, column)
    })
  })
}
var flattenTreeData = (data, childrenKey = 'children', expandedKeys, rowKey, level = 0) => {
  const result = []
  data.forEach((item) => {
    const key = getRowKey(item, rowKey)
    const children = item[childrenKey]
    const hasChildren = Array.isArray(children) && children.length > 0
    const isExpanded = expandedKeys.has(key)
    result.push(
      __spreadProps(__spreadValues2({}, item), {
        _level: level,
        _isExpanded: isExpanded,
        _hasChildren: hasChildren,
        _isLeaf: !hasChildren
      })
    )
    if (hasChildren && isExpanded) {
      result.push(...flattenTreeData(children, childrenKey, expandedKeys, rowKey, level + 1))
    }
  })
  return result
}
var formatSize = (value) => {
  if (value === void 0) return ''
  if (typeof value === 'number') return `${value}px`
  if (/^\d+(\.\d+)?$/.test(value)) return `${value}px`
  return value
}
var calculateSpan = (row, column, rowIndex, columnIndex, spanMethod) => {
  if (!spanMethod) {
    return { rowspan: 1, colspan: column.colSpan || 1 }
  }
  const result = spanMethod({ row, column, rowIndex, columnIndex })
  if (Array.isArray(result)) {
    return { rowspan: result[0], colspan: result[1] }
  }
  if (result && typeof result === 'object') {
    return result
  }
  return { rowspan: 1, colspan: column.colSpan || 1 }
}
var throttle = (fn, delay) => {
  let lastTime = 0
  let timer = null
  return (...args) => {
    const now = Date.now()
    const remaining = delay - (now - lastTime)
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      lastTime = now
      fn(...args)
    } else if (!timer) {
      timer = setTimeout(() => {
        lastTime = Date.now()
        timer = null
        fn(...args)
      }, remaining)
    }
  }
}

// public/codesandbox-runtime/components/table/src/use-virtual-scroll.js
import {
  ref as ref12,
  computed as computed11,
  watch as watch4,
  onMounted as onMounted3,
  onUnmounted as onUnmounted4,
  shallowRef as shallowRef3
} from 'vue'
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
var useVirtualScroll = (options) => {
  const { data, containerRef, config, rowKey } = options
  const defaultConfig = {
    enabled: false,
    rowHeight: 48,
    buffer: 5,
    overscan: 3,
    columnVirtual: false,
    columnBuffer: 3
  }
  const mergedConfig = computed11(() =>
    __spreadValues3(__spreadValues3({}, defaultConfig), config.value)
  )
  const isVirtual = computed11(() => {
    if (!mergedConfig.value.enabled) return false
    return data.value.length > 100
  })
  const scrollTop = ref12(0)
  const containerHeight = ref12(0)
  const rowHeightCache = shallowRef3(/* @__PURE__ */ new Map())
  const MAX_SCROLL_HEIGHT = 15e6
  const isFixedRowHeight = computed11(() => typeof mergedConfig.value.rowHeight !== 'function')
  const fixedHeight = computed11(() => (isFixedRowHeight.value ? mergedConfig.value.rowHeight : 0))
  const getRowHeight = (row, index) => {
    if (isFixedRowHeight.value) return fixedHeight.value
    const key = rowKey(row)
    const cached = rowHeightCache.value.get(key)
    if (cached !== void 0) return cached
    const { rowHeight } = mergedConfig.value
    if (typeof rowHeight === 'function') {
      const height = rowHeight(row, index)
      rowHeightCache.value.set(key, height)
      return height
    }
    return rowHeight
  }
  const rowPositions = computed11(() => {
    if (!isVirtual.value || isFixedRowHeight.value) return []
    const positions = []
    let top = 0
    data.value.forEach((row, index) => {
      const height = getRowHeight(row, index)
      positions.push({ index, top, height, bottom: top + height })
      top += height
    })
    return positions
  })
  const realTotalHeight = computed11(() => {
    var _a2
    if (!isVirtual.value) return 0
    if (isFixedRowHeight.value) return data.value.length * fixedHeight.value
    if (rowPositions.value.length === 0) return 0
    return (
      ((_a2 = rowPositions.value[rowPositions.value.length - 1]) == null ? void 0 : _a2.bottom) || 0
    )
  })
  const needScale = computed11(() => realTotalHeight.value > MAX_SCROLL_HEIGHT)
  const heightScale = computed11(() =>
    needScale.value ? realTotalHeight.value / MAX_SCROLL_HEIGHT : 1
  )
  const totalHeight = computed11(() => {
    if (!isVirtual.value) return 0
    return needScale.value ? MAX_SCROLL_HEIGHT : realTotalHeight.value
  })
  const findStartIndexDynamic = (scrollPos) => {
    const positions = rowPositions.value
    if (positions.length === 0) return 0
    let low = 0
    let high = positions.length - 1
    while (low <= high) {
      const mid = (low + high) >>> 1
      const { top, bottom } = positions[mid]
      if (scrollPos >= top && scrollPos < bottom) {
        return mid
      } else if (scrollPos < top) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    }
    return Math.max(0, low - 1)
  }
  const findEndIndexDynamic = (startIndex, viewportHeight) => {
    const positions = rowPositions.value
    if (positions.length === 0) return 0
    const startPosition = positions[startIndex]
    if (!startPosition) return startIndex
    const endScrollTop = startPosition.top + viewportHeight
    let endIndex = startIndex
    while (endIndex < positions.length && positions[endIndex].top < endScrollTop) {
      endIndex++
    }
    return Math.min(endIndex, positions.length - 1)
  }
  const findStartIndex = (scrollPos) => {
    if (isFixedRowHeight.value) {
      return Math.floor(scrollPos / fixedHeight.value)
    }
    return findStartIndexDynamic(scrollPos)
  }
  const findEndIndex = (startIndex, viewportHeight) => {
    if (isFixedRowHeight.value) {
      return Math.min(
        startIndex + Math.ceil(viewportHeight / fixedHeight.value),
        data.value.length - 1
      )
    }
    return findEndIndexDynamic(startIndex, viewportHeight)
  }
  const realScrollTop = computed11(() => scrollTop.value * heightScale.value)
  const visibleRange = computed11(() => {
    if (!isVirtual.value) {
      return { start: 0, end: data.value.length - 1 }
    }
    const { buffer, overscan } = mergedConfig.value
    const extra = buffer + overscan
    const startIndex = findStartIndex(realScrollTop.value)
    const endIndex = findEndIndex(startIndex, containerHeight.value)
    return {
      start: Math.max(0, startIndex - extra),
      end: Math.min(data.value.length - 1, endIndex + extra)
    }
  })
  const visibleData = computed11(() => {
    if (!isVirtual.value) return data.value
    const { start, end } = visibleRange.value
    return data.value.slice(start, end + 1)
  })
  const offsetTop = computed11(() => {
    var _a2
    if (!isVirtual.value || visibleRange.value.start === 0) return 0
    if (isFixedRowHeight.value) {
      return visibleRange.value.start * fixedHeight.value
    }
    const positions = rowPositions.value
    return ((_a2 = positions[visibleRange.value.start]) == null ? void 0 : _a2.top) || 0
  })
  const scaledOffsetTop = computed11(() => {
    if (!needScale.value) return offsetTop.value
    return offsetTop.value / heightScale.value
  })
  let rafId = null
  const handleScroll = (_event) => {
    const target = containerRef.value
    if (!target) return
    const currentScrollTop = target.scrollTop
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
    rafId = requestAnimationFrame(() => {
      rafId = null
      scrollTop.value = currentScrollTop
    })
  }
  const scrollToIndex = (index, behavior = 'auto') => {
    const container = containerRef.value
    if (!container) return
    let realTop
    if (isFixedRowHeight.value) {
      realTop = index * fixedHeight.value
    } else if (!isVirtual.value) {
      realTop = index * mergedConfig.value.rowHeight
    } else {
      const positions = rowPositions.value
      const position = positions[index]
      if (!position) return
      realTop = position.top
    }
    const scrollTarget = needScale.value ? realTop / heightScale.value : realTop
    container.scrollTo({ top: scrollTarget, behavior })
  }
  const scrollToRow = (row, behavior = 'auto') => {
    const key = rowKey(row)
    const index = data.value.findIndex((item) => rowKey(item) === key)
    if (index !== -1) {
      scrollToIndex(index, behavior)
    }
  }
  const refresh = () => {
    rowHeightCache.value.clear()
    updateContainerHeight()
  }
  const updateContainerHeight = () => {
    const container = containerRef.value
    if (container) {
      containerHeight.value = container.clientHeight
    }
  }
  let resizeObserver = null
  onMounted3(() => {
    updateContainerHeight()
    if (typeof ResizeObserver !== 'undefined' && containerRef.value) {
      resizeObserver = new ResizeObserver(() => {
        updateContainerHeight()
      })
      resizeObserver.observe(containerRef.value)
    }
  })
  onUnmounted4(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  })
  watch4(
    () => data.value.length,
    () => {
      rowHeightCache.value.clear()
    }
  )
  return {
    visibleData,
    visibleRange,
    offsetTop: scaledOffsetTop,
    totalHeight,
    handleScroll,
    scrollToIndex,
    scrollToRow,
    refresh,
    isVirtual
  }
}

// public/codesandbox-runtime/components/table/src/use-table-selection.js
import { ref as ref13, computed as computed12, watch as watch5 } from 'vue'
var useTableSelection = (options) => {
  const { data, rowKey, config } = options
  const selectedRowKeys = ref13([])
  const selectionType = computed12(() => {
    var _a2
    return ((_a2 = config.value) == null ? void 0 : _a2.type) || 'checkbox'
  })
  const reserveSelection = computed12(() => {
    var _a2, _b
    return (_b = (_a2 = config.value) == null ? void 0 : _a2.reserve) != null ? _b : true
  })
  const isRowSelectable = (row, rowIndex) => {
    var _a2
    if (!((_a2 = config.value) == null ? void 0 : _a2.checkable)) return true
    return config.value.checkable(row, rowIndex)
  }
  const selectableCount = computed12(() => {
    return data.value.filter((row, index) => isRowSelectable(row, index)).length
  })
  const isRowSelected = (row) => {
    const key = getRowKey(row, rowKey)
    return selectedRowKeys.value.includes(key)
  }
  const selectedRows = computed12(() => {
    const keySet = new Set(selectedRowKeys.value)
    return data.value.filter((row) => {
      const key = getRowKey(row, rowKey)
      return keySet.has(key)
    })
  })
  const selectedCountInCurrentPage = computed12(() => {
    return data.value.filter((row, index) => {
      if (!isRowSelectable(row, index)) return false
      return isRowSelected(row)
    }).length
  })
  const isAllSelected = computed12(() => {
    if (selectableCount.value === 0) return false
    return selectedCountInCurrentPage.value === selectableCount.value
  })
  const isIndeterminate = computed12(() => {
    if (selectableCount.value === 0) return false
    return (
      selectedCountInCurrentPage.value > 0 &&
      selectedCountInCurrentPage.value < selectableCount.value
    )
  })
  const toggleRowSelection = (row, selected) => {
    var _a2, _b
    const key = getRowKey(row, rowKey)
    const index = data.value.findIndex((item) => getRowKey(item, rowKey) === key)
    if (!isRowSelectable(row, index)) return
    const isCurrentlySelected = selectedRowKeys.value.includes(key)
    const shouldSelect = selected != null ? selected : !isCurrentlySelected
    if (selectionType.value === 'radio') {
      if (shouldSelect) {
        selectedRowKeys.value = [key]
      } else {
        selectedRowKeys.value = []
      }
    } else {
      if (shouldSelect && !isCurrentlySelected) {
        selectedRowKeys.value = [...selectedRowKeys.value, key]
      } else if (!shouldSelect && isCurrentlySelected) {
        selectedRowKeys.value = selectedRowKeys.value.filter((k) => k !== key)
      }
    }
    ;(_b = (_a2 = config.value) == null ? void 0 : _a2.onChange) == null
      ? void 0
      : _b.call(_a2, selectedRowKeys.value, selectedRows.value)
  }
  const toggleAllSelection = () => {
    var _a2, _b, _c
    const selectAllMode =
      ((_a2 = config.value) == null ? void 0 : _a2.selectAllMode) || 'currentPage'
    if (isAllSelected.value) {
      if (selectAllMode === 'currentPage') {
        const currentPageKeys = new Set(
          data.value
            .filter((row, index) => isRowSelectable(row, index))
            .map((row) => getRowKey(row, rowKey))
        )
        selectedRowKeys.value = selectedRowKeys.value.filter((key) => !currentPageKeys.has(key))
      } else {
        selectedRowKeys.value = []
      }
    } else {
      if (selectAllMode === 'currentPage') {
        const currentPageKeys = data.value
          .filter((row, index) => isRowSelectable(row, index))
          .map((row) => getRowKey(row, rowKey))
        if (reserveSelection.value) {
          const otherPageKeys = selectedRowKeys.value.filter((key) => {
            return !data.value.some((row) => getRowKey(row, rowKey) === key)
          })
          selectedRowKeys.value = [
            .../* @__PURE__ */ new Set([...otherPageKeys, ...currentPageKeys])
          ]
        } else {
          selectedRowKeys.value = currentPageKeys
        }
      } else {
        const allKeys = data.value
          .filter((row, index) => isRowSelectable(row, index))
          .map((row) => getRowKey(row, rowKey))
        selectedRowKeys.value = allKeys
      }
    }
    ;(_c = (_b = config.value) == null ? void 0 : _b.onChange) == null
      ? void 0
      : _c.call(_b, selectedRowKeys.value, selectedRows.value)
  }
  const clearSelection = () => {
    var _a2, _b
    selectedRowKeys.value = []
    ;(_b = (_a2 = config.value) == null ? void 0 : _a2.onChange) == null
      ? void 0
      : _b.call(_a2, [], [])
  }
  const setSelection = (rows) => {
    var _a2, _b
    selectedRowKeys.value = rows.map((row) => getRowKey(row, rowKey))
    ;(_b = (_a2 = config.value) == null ? void 0 : _a2.onChange) == null
      ? void 0
      : _b.call(_a2, selectedRowKeys.value, rows)
  }
  const setSelectionByKeys = (keys) => {
    var _a2, _b
    selectedRowKeys.value = keys
    ;(_b = (_a2 = config.value) == null ? void 0 : _a2.onChange) == null
      ? void 0
      : _b.call(_a2, selectedRowKeys.value, selectedRows.value)
  }
  watch5(
    () => {
      var _a2
      return (_a2 = config.value) == null ? void 0 : _a2.selectedRowKeys
    },
    (newKeys) => {
      if (newKeys && Array.isArray(newKeys)) {
        selectedRowKeys.value = [...newKeys]
      }
    },
    { immediate: true }
  )
  watch5(
    () => data.value,
    (newData) => {
      if (!reserveSelection.value) {
        const validKeys = new Set(newData.map((row) => getRowKey(row, rowKey)))
        selectedRowKeys.value = selectedRowKeys.value.filter((key) => validKeys.has(key))
      }
    }
  )
  return {
    selectedRowKeys,
    selectedRows,
    isAllSelected,
    isIndeterminate,
    selectionType,
    toggleRowSelection,
    toggleAllSelection,
    clearSelection,
    setSelection,
    setSelectionByKeys,
    isRowSelected,
    isRowSelectable,
    selectableCount
  }
}

// public/codesandbox-runtime/components/table/src/use-row-drag.js
import { ref as ref14, computed as computed13 } from 'vue'
var useRowDrag = (options) => {
  const { data, rawData, dragConfig, treeConfig, emit } = options
  const isDraggingRow = ref14(false)
  const dragRowIndex = ref14(-1)
  const dropRowIndex = ref14(-1)
  let lastMouseDownTarget = null
  const isRowDragEnabled = computed13(() => {
    var _a2
    return !!((_a2 = dragConfig.value) == null ? void 0 : _a2.row)
  })
  const hasHandle = computed13(() => {
    var _a2
    return !!((_a2 = dragConfig.value) == null ? void 0 : _a2.handle)
  })
  const onMouseDown = (event) => {
    lastMouseDownTarget = event.target
  }
  const onDragStart = (rowIndex, event) => {
    var _a2, _b, _c, _d
    if (hasHandle.value) {
      const handleSelector = (_a2 = dragConfig.value) == null ? void 0 : _a2.handle
      if (handleSelector && lastMouseDownTarget) {
        if (!lastMouseDownTarget.closest(handleSelector)) {
          event.preventDefault()
          return
        }
      } else {
        event.preventDefault()
        return
      }
    }
    isDraggingRow.value = true
    dragRowIndex.value = rowIndex
    dropRowIndex.value = rowIndex
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', String(rowIndex))
      const dragClass = (_b = dragConfig.value) == null ? void 0 : _b.dragClass
      if (dragClass) {
        const target = event.target
        target.classList.add(dragClass)
      }
      const tr = event.target
      if (tr && tr.tagName === 'TR') {
        createDragImage(tr, event)
      }
    }
    ;(_d = (_c = dragConfig.value) == null ? void 0 : _c.onDragStart) == null
      ? void 0
      : _d.call(_c, {
          type: 'row',
          data: data.value[rowIndex],
          index: rowIndex
        })
  }
  const onDragOver = (rowIndex, event) => {
    event.preventDefault()
    if (!isDraggingRow.value) return
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
    dropRowIndex.value = rowIndex
  }
  const onDragEnter = (rowIndex, event) => {
    event.preventDefault()
    if (!isDraggingRow.value) return
    dropRowIndex.value = rowIndex
  }
  const onDrop = (rowIndex, event) => {
    var _a2, _b
    event.preventDefault()
    if (!isDraggingRow.value) return
    const oldIndex = dragRowIndex.value
    const newIndex = rowIndex
    if (oldIndex !== newIndex && oldIndex >= 0 && newIndex >= 0) {
      if (treeConfig.value) {
        performTreeDrop(oldIndex, newIndex)
      } else {
        const arr = data.value
        const [movedItem] = arr.splice(oldIndex, 1)
        arr.splice(newIndex, 0, movedItem)
        emit('update:data', [...arr])
        const params = {
          type: 'row',
          oldIndex,
          newIndex,
          data: [...arr]
        }
        ;(_b = (_a2 = dragConfig.value) == null ? void 0 : _a2.onDragEnd) == null
          ? void 0
          : _b.call(_a2, params)
        emit('drag-end', params)
      }
    }
    resetDragState()
  }
  const findNodeInTree = (tree, targetKey, childrenKey) => {
    for (let i = 0; i < tree.length; i++) {
      const key = options.rowKey(tree[i])
      if (key === targetKey) {
        return { parent: tree, index: i }
      }
      const children = tree[i][childrenKey]
      if (Array.isArray(children) && children.length > 0) {
        const result = findNodeInTree(children, targetKey, childrenKey)
        if (result) return result
      }
    }
    return null
  }
  const performTreeDrop = (oldIndex, newIndex) => {
    var _a2, _b, _c
    const flatData = data.value
    const draggedRow = flatData[oldIndex]
    const targetRow = flatData[newIndex]
    if (!draggedRow || !targetRow) return
    const draggedKey = options.rowKey(draggedRow)
    const targetKey = options.rowKey(targetRow)
    const childrenKey = ((_a2 = treeConfig.value) == null ? void 0 : _a2.childrenKey) || 'children'
    const tree = rawData.value
    const draggedInfo = findNodeInTree(tree, draggedKey, childrenKey)
    const targetInfo = findNodeInTree(tree, targetKey, childrenKey)
    if (!draggedInfo || !targetInfo) return
    const [movedNode] = draggedInfo.parent.splice(draggedInfo.index, 1)
    const newTargetInfo = findNodeInTree(tree, targetKey, childrenKey)
    if (!newTargetInfo) {
      draggedInfo.parent.splice(draggedInfo.index, 0, movedNode)
      return
    }
    const insertIndex = oldIndex < newIndex ? newTargetInfo.index + 1 : newTargetInfo.index
    newTargetInfo.parent.splice(insertIndex, 0, movedNode)
    emit('update:data', [...tree])
    const params = {
      type: 'row',
      oldIndex,
      newIndex,
      data: [...tree]
    }
    ;(_c = (_b = dragConfig.value) == null ? void 0 : _b.onDragEnd) == null
      ? void 0
      : _c.call(_b, params)
    emit('drag-end', params)
  }
  const onDragEnd = (_event) => {
    resetDragState()
  }
  const createDragImage = (tr, event) => {
    const clone = tr.cloneNode(true)
    const cells = tr.querySelectorAll('td, th')
    const cloneCells = clone.querySelectorAll('td, th')
    cells.forEach((cell, i) => {
      const computed22 = window.getComputedStyle(cell)
      const cloneCell = cloneCells[i]
      if (cloneCell) {
        cloneCell.style.position = 'static'
        cloneCell.style.width = computed22.width
        cloneCell.style.minWidth = computed22.width
        cloneCell.style.maxWidth = computed22.width
        cloneCell.style.backgroundColor = computed22.backgroundColor || '#fff'
      }
    })
    clone.style.position = 'fixed'
    clone.style.top = '-9999px'
    clone.style.left = '-9999px'
    clone.style.display = 'table'
    clone.style.tableLayout = 'fixed'
    clone.style.width = tr.offsetWidth + 'px'
    clone.style.opacity = '0.85'
    clone.style.backgroundColor = '#fff'
    clone.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)'
    clone.style.borderRadius = '2px'
    clone.style.zIndex = '9999'
    document.body.appendChild(clone)
    const rect = tr.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top
    event.dataTransfer.setDragImage(clone, offsetX, offsetY)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (clone.parentNode) {
          document.body.removeChild(clone)
        }
      })
    })
  }
  const resetDragState = () => {
    isDraggingRow.value = false
    dragRowIndex.value = -1
    dropRowIndex.value = -1
    lastMouseDownTarget = null
  }
  const getRowDragAttrs = (rowIndex) => {
    if (!isRowDragEnabled.value) return {}
    return {
      draggable: true,
      onMousedown: (e) => onMouseDown(e),
      onDragstart: (e) => onDragStart(rowIndex, e),
      onDragover: (e) => onDragOver(rowIndex, e),
      onDragenter: (e) => onDragEnter(rowIndex, e),
      onDrop: (e) => onDrop(rowIndex, e),
      onDragend: (e) => onDragEnd(e)
    }
  }
  const getRowDragClass = (rowIndex) => {
    var _a2
    if (!isRowDragEnabled.value || !isDraggingRow.value) return ''
    const classes = []
    if (rowIndex === dragRowIndex.value) {
      classes.push('is-dragging')
      if ((_a2 = dragConfig.value) == null ? void 0 : _a2.ghostClass) {
        classes.push(dragConfig.value.ghostClass)
      }
    }
    if (rowIndex === dropRowIndex.value && rowIndex !== dragRowIndex.value) {
      if (dropRowIndex.value < dragRowIndex.value) {
        classes.push('is-drop-target-above')
      } else {
        classes.push('is-drop-target-below')
      }
    }
    return classes.join(' ')
  }
  return {
    isRowDragEnabled,
    isDraggingRow,
    dragRowIndex,
    dropRowIndex,
    getRowDragAttrs,
    getRowDragClass
  }
}

// public/codesandbox-runtime/components/table/src/use-column-resize.js
import { ref as ref15, onUnmounted as onUnmounted5 } from 'vue'
var useColumnResize = (options) => {
  const { resizable, tableRef, emit } = options
  const isResizing = ref15(false)
  const resizingColumn = ref15(null)
  const resizeLineLeft = ref15(0)
  const resizeLineVisible = ref15(false)
  let startX = 0
  let startWidth = 0
  let currentColumn = null
  const isColumnResizable = (column) => {
    if (column.resizable !== void 0) return column.resizable
    return resizable.value
  }
  const handleResizeStart = (event, column, el) => {
    var _a2, _b
    if (!isColumnResizable(column)) return
    event.preventDefault()
    event.stopPropagation()
    isResizing.value = true
    resizingColumn.value = column
    currentColumn = column
    startX = event.clientX
    startWidth = el.offsetWidth
    if (tableRef.value) {
      const tableRect = tableRef.value.getBoundingClientRect()
      resizeLineLeft.value = event.clientX - tableRect.left
      resizeLineVisible.value = true
    }
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    ;(_b = (_a2 = event.target).setPointerCapture) == null ? void 0 : _b.call(_a2, event.pointerId)
    document.addEventListener('pointermove', handleResizeMove)
    document.addEventListener('pointerup', handleResizeEnd)
  }
  const handleResizeMove = (event) => {
    if (!isResizing.value || !currentColumn) return
    const deltaX = event.clientX - startX
    let newWidth = Math.max(startWidth + deltaX, 40)
    const minWidth = parseInt(String(currentColumn.minWidth || 40))
    if (newWidth < minWidth) newWidth = minWidth
    if (currentColumn.maxWidth) {
      const maxWidth = parseInt(String(currentColumn.maxWidth))
      if (newWidth > maxWidth) newWidth = maxWidth
    }
    currentColumn.width = newWidth
    if (tableRef.value) {
      const tableRect = tableRef.value.getBoundingClientRect()
      resizeLineLeft.value = event.clientX - tableRect.left
    }
  }
  const handleResizeEnd = (_event) => {
    if (currentColumn) {
      const finalWidth = parseInt(String(currentColumn.width)) || startWidth
      emit('column-resize', currentColumn, finalWidth)
    }
    isResizing.value = false
    resizingColumn.value = null
    resizeLineVisible.value = false
    currentColumn = null
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    document.removeEventListener('pointermove', handleResizeMove)
    document.removeEventListener('pointerup', handleResizeEnd)
  }
  onUnmounted5(() => {
    document.removeEventListener('pointermove', handleResizeMove)
    document.removeEventListener('pointerup', handleResizeEnd)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  })
  return {
    isResizing,
    resizingColumn,
    resizeLineLeft,
    resizeLineVisible,
    isColumnResizable,
    handleResizeStart
  }
}

// public/codesandbox-runtime/components/table/src/use-column-drag.js
import { ref as ref16, computed as computed14 } from 'vue'
var useColumnDrag = (options) => {
  const { columns, dragConfig, flatColumns, emit } = options
  const isDraggingColumn = ref16(false)
  const dragColumnIndex = ref16(-1)
  const dropColumnIndex = ref16(-1)
  const isColumnDragEnabled = computed14(() => {
    var _a2
    return !!((_a2 = dragConfig.value) == null ? void 0 : _a2.column)
  })
  const isColumnDraggable = (column) => {
    if (!isColumnDragEnabled.value) return false
    if (column.fixed) return false
    if (column.draggable !== void 0) return column.draggable
    return true
  }
  const onHeaderDragStart = (column, columnIndex, event) => {
    var _a2, _b
    if (!isColumnDraggable(column)) {
      event.preventDefault()
      return
    }
    isDraggingColumn.value = true
    dragColumnIndex.value = columnIndex
    dropColumnIndex.value = columnIndex
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', String(columnIndex))
      const target = event.target
      if (target) {
        const clone = target.cloneNode(true)
        clone.style.opacity = '0.7'
        clone.style.position = 'absolute'
        clone.style.top = '-9999px'
        document.body.appendChild(clone)
        event.dataTransfer.setDragImage(clone, event.offsetX, event.offsetY)
        requestAnimationFrame(() => document.body.removeChild(clone))
      }
    }
    ;(_b = (_a2 = dragConfig.value) == null ? void 0 : _a2.onDragStart) == null
      ? void 0
      : _b.call(_a2, {
          type: 'column',
          data: column,
          index: columnIndex
        })
  }
  const onHeaderDragOver = (column, columnIndex, event) => {
    event.preventDefault()
    if (!isDraggingColumn.value) return
    if (!isColumnDraggable(column)) return
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
    dropColumnIndex.value = columnIndex
  }
  const onHeaderDragEnter = (column, columnIndex, event) => {
    event.preventDefault()
    if (!isDraggingColumn.value) return
    if (!isColumnDraggable(column)) return
    dropColumnIndex.value = columnIndex
  }
  const onHeaderDrop = (_column, columnIndex, event) => {
    var _a2, _b
    event.preventDefault()
    if (!isDraggingColumn.value) return
    const oldIndex = dragColumnIndex.value
    const newIndex = columnIndex
    if (oldIndex !== newIndex && oldIndex >= 0 && newIndex >= 0) {
      const cols = flatColumns.value
      const newCols = [...cols]
      const [movedCol] = newCols.splice(oldIndex, 1)
      newCols.splice(newIndex, 0, movedCol)
      reorderColumns(columns.value, oldIndex, newIndex)
      const params = {
        type: 'column',
        oldIndex,
        newIndex,
        data: newCols
      }
      ;(_b = (_a2 = dragConfig.value) == null ? void 0 : _a2.onDragEnd) == null
        ? void 0
        : _b.call(_a2, params)
      emit('drag-end', params)
    }
    resetDragState()
  }
  const onHeaderDragEnd = (_event) => {
    resetDragState()
  }
  const resetDragState = () => {
    isDraggingColumn.value = false
    dragColumnIndex.value = -1
    dropColumnIndex.value = -1
  }
  const reorderColumns = (cols, oldIndex, newIndex) => {
    const flat = flatColumns.value
    const movedColumn = flat[oldIndex]
    const targetColumn = flat[newIndex]
    if (!movedColumn || !targetColumn) return
    const findAndRemove = (arr, target) => {
      var _a2
      const idx = arr.indexOf(target)
      if (idx !== -1) {
        arr.splice(idx, 1)
        return true
      }
      for (const col of arr) {
        if ((_a2 = col.children) == null ? void 0 : _a2.length) {
          if (findAndRemove(col.children, target)) return true
        }
      }
      return false
    }
    const findAndInsert = (arr, target, toInsert, after) => {
      var _a2
      const idx = arr.indexOf(target)
      if (idx !== -1) {
        arr.splice(after ? idx + 1 : idx, 0, toInsert)
        return true
      }
      for (const col of arr) {
        if ((_a2 = col.children) == null ? void 0 : _a2.length) {
          if (findAndInsert(col.children, target, toInsert, after)) return true
        }
      }
      return false
    }
    findAndRemove(cols, movedColumn)
    findAndInsert(cols, targetColumn, movedColumn, oldIndex > newIndex ? false : true)
  }
  const getHeaderDragAttrs = (column, columnIndex) => {
    if (!isColumnDragEnabled.value || !isColumnDraggable(column)) return {}
    return {
      draggable: true,
      onDragstart: (e) => onHeaderDragStart(column, columnIndex, e),
      onDragover: (e) => onHeaderDragOver(column, columnIndex, e),
      onDragenter: (e) => onHeaderDragEnter(column, columnIndex, e),
      onDrop: (e) => onHeaderDrop(column, columnIndex, e),
      onDragend: (e) => onHeaderDragEnd(e)
    }
  }
  const getHeaderDragClass = (columnIndex) => {
    if (!isColumnDragEnabled.value || !isDraggingColumn.value) return ''
    const classes = []
    if (columnIndex === dragColumnIndex.value) {
      classes.push('is-column-dragging')
    }
    if (columnIndex === dropColumnIndex.value && columnIndex !== dragColumnIndex.value) {
      if (dropColumnIndex.value < dragColumnIndex.value) {
        classes.push('is-column-drop-left')
      } else {
        classes.push('is-column-drop-right')
      }
    }
    return classes.join(' ')
  }
  return {
    isColumnDragEnabled,
    isDraggingColumn,
    dragColumnIndex,
    dropColumnIndex,
    isColumnDraggable,
    getHeaderDragAttrs,
    getHeaderDragClass
  }
}

// public/codesandbox-runtime/components/table/src/use-table-export.js
import * as XLSX from 'xlsx'
var __defProp4 = Object.defineProperty
var __defProps2 = Object.defineProperties
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors
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
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b))
function useTableExport(data, columns) {
  const { t } = useLocale()
  function getExportColumns(config = {}) {
    var _a2, _b
    let cols = columns.value.filter((col) => col.prop)
    if (config.visibleOnly !== false) {
      cols = cols.filter((c) => c.visible !== false)
    }
    if ((_a2 = config.columns) == null ? void 0 : _a2.length) {
      cols = cols.filter((c) => config.columns.includes(c.prop))
    }
    if ((_b = config.excludeColumns) == null ? void 0 : _b.length) {
      cols = cols.filter((c) => !config.excludeColumns.includes(c.prop))
    }
    return cols
  }
  function getCellValue(row, col, config) {
    const raw = col.prop ? row[col.prop] : ''
    if (config.formatCell) {
      return config.formatCell(raw, col, row)
    }
    if (typeof raw === 'boolean') {
      return raw ? t('table.yes') : t('table.no')
    }
    return raw == null ? '' : String(raw)
  }
  function getLabel(col, config) {
    var _a2
    if ((_a2 = config.columnTitles) == null ? void 0 : _a2[col.prop]) {
      return config.columnTitles[col.prop]
    }
    return col.label || col.prop || ''
  }
  function toCSV(config = {}) {
    const sep = config.separator || ','
    const cols = getExportColumns(config)
    const rows = config.data || data.value
    const escapeCSV = (val) => {
      if (val.includes(sep) || val.includes('\n') || val.includes('"')) {
        return `"${val.replace(/"/g, '""')}"`
      }
      return val
    }
    const lines = []
    if (config.includeHeader !== false) {
      const headerCells = []
      if (config.showIndex) headerCells.push(escapeCSV(config.indexTitle || t('table.index')))
      cols.forEach((col) => headerCells.push(escapeCSV(getLabel(col, config))))
      lines.push(headerCells.join(sep))
    }
    rows.forEach((row, idx) => {
      const cells = []
      if (config.showIndex) cells.push(String(idx + 1))
      cols.forEach((col) => cells.push(escapeCSV(getCellValue(row, col, config))))
      lines.push(cells.join(sep))
    })
    const content = lines.join('\n')
    return config.bom !== false ? '\uFEFF' + content : content
  }
  function toTXT(config = {}) {
    return toCSV(
      __spreadProps2(__spreadValues4({}, config), { separator: '	', bom: config.bom !== false })
    )
  }
  function toJSON(config = {}) {
    const cols = getExportColumns(config)
    const rows = config.data || data.value
    const result = rows.map((row, idx) => {
      const obj = {}
      if (config.showIndex) obj[config.indexTitle || t('table.index')] = idx + 1
      cols.forEach((col) => {
        const key = getLabel(col, config)
        obj[key] = config.formatCell
          ? config.formatCell(col.prop ? row[col.prop] : '', col, row)
          : col.prop
            ? row[col.prop]
            : ''
      })
      return obj
    })
    return JSON.stringify(result, null, 2)
  }
  function toXML(config = {}) {
    const cols = getExportColumns(config)
    const rows = config.data || data.value
    const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<table>']
    if (config.includeHeader !== false) {
      lines.push('  <columns>')
      if (config.showIndex)
        lines.push(`    <column name="${escapeXML(config.indexTitle || t('table.index'))}" />`)
      cols.forEach((col) => {
        lines.push(`    <column name="${escapeXML(getLabel(col, config))}" />`)
      })
      lines.push('  </columns>')
    }
    lines.push('  <rows>')
    rows.forEach((row, idx) => {
      lines.push('    <row>')
      if (config.showIndex) lines.push(`      <cell>${idx + 1}</cell>`)
      cols.forEach((col) => {
        lines.push(`      <cell>${escapeXML(getCellValue(row, col, config))}</cell>`)
      })
      lines.push('    </row>')
    })
    lines.push('  </rows>')
    lines.push('</table>')
    return lines.join('\n')
  }
  function escapeXML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }
  function toHTML(config = {}) {
    const cols = getExportColumns(config)
    const rows = config.data || data.value
    const lines = [
      '<!DOCTYPE html>',
      '<html><head><meta charset="UTF-8">',
      '<style>',
      'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;padding:20px}',
      'table{width:100%;border-collapse:collapse;font-size:14px}',
      'th,td{padding:8px 12px;border:1px solid #dcdfe6;text-align:left}',
      'th{background:#f5f7fa;font-weight:600;color:#303133}',
      'tr:nth-child(even){background:#fafafa}',
      '</style></head><body>',
      '<table>'
    ]
    if (config.includeHeader !== false) {
      lines.push('<thead><tr>')
      if (config.showIndex)
        lines.push(`<th>${escapeHTML(config.indexTitle || t('table.index'))}</th>`)
      cols.forEach((col) => lines.push(`<th>${escapeHTML(getLabel(col, config))}</th>`))
      lines.push('</tr></thead>')
    }
    lines.push('<tbody>')
    rows.forEach((row, idx) => {
      lines.push('<tr>')
      if (config.showIndex) lines.push(`<td style="text-align:center">${idx + 1}</td>`)
      cols.forEach((col) => lines.push(`<td>${escapeHTML(getCellValue(row, col, config))}</td>`))
      lines.push('</tr>')
    })
    lines.push('</tbody></table></body></html>')
    return lines.join('\n')
  }
  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
  function toXLSX(config = {}) {
    const cols = getExportColumns(config)
    const rows = config.data || data.value
    const sheetName = config.sheetName || 'Sheet1'
    const headers = []
    if (config.showIndex) headers.push(config.indexTitle || t('table.index'))
    cols.forEach((col) => headers.push(getLabel(col, config)))
    const dataRows = rows.map((row, idx) => {
      const rowData = []
      if (config.showIndex) rowData.push(idx + 1)
      cols.forEach((col) => {
        const val = col.prop ? row[col.prop] : ''
        if (config.formatCell) {
          rowData.push(config.formatCell(val, col, row))
        } else {
          rowData.push(val == null ? '' : val)
        }
      })
      return rowData
    })
    const wsData = [headers, ...dataRows]
    const ws = XLSX.utils.aoa_to_sheet(wsData)
    const colWidths = []
    headers.forEach((h, i) => {
      var _a2
      let width = config.defaultColWidth || 12
      const col = cols[config.showIndex ? i - 1 : i]
      if (
        (col == null ? void 0 : col.prop) &&
        ((_a2 = config.columnWidths) == null ? void 0 : _a2[col.prop])
      ) {
        width = config.columnWidths[col.prop]
      } else if (config.autoWidth !== false) {
        let maxLen = h.length
        dataRows.forEach((row) => {
          var _a22
          const cellVal = String((_a22 = row[i]) != null ? _a22 : '')
          maxLen = Math.max(maxLen, cellVal.length)
        })
        width = Math.min(Math.max(maxLen + 2, 8), 50)
      }
      colWidths.push({ wch: width })
    })
    ws['!cols'] = colWidths
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, sheetName)
    return XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  }
  function downloadXLSX(buffer, filename) {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  function downloadFile(content, filename, mime) {
    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  const MIME_MAP = {
    csv: 'text/csv;charset=utf-8',
    json: 'application/json;charset=utf-8',
    txt: 'text/plain;charset=utf-8',
    xml: 'application/xml;charset=utf-8',
    html: 'text/html;charset=utf-8',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }
  const EXT_MAP = {
    csv: '.csv',
    json: '.json',
    txt: '.txt',
    xml: '.xml',
    html: '.html',
    xlsx: '.xlsx'
  }
  async function exportData(config = {}) {
    var _a2, _b, _c, _d
    const type = config.type || 'csv'
    const filename = config.filename || 'export'
    if (config.beforeExport) {
      const ok = await config.beforeExport()
      if (!ok) return
    }
    if (type === 'xlsx') {
      const buffer = toXLSX(config)
      if (config.mode === 'string') {
        const uint8 = new Uint8Array(buffer)
        let binary = ''
        for (let i = 0; i < uint8.length; i++) {
          binary += String.fromCharCode(uint8[i])
        }
        ;(_a2 = config.afterExport) == null ? void 0 : _a2.call(config, type)
        return btoa(binary)
      }
      downloadXLSX(buffer, `${filename}.xlsx`)
      ;(_b = config.afterExport) == null ? void 0 : _b.call(config, type)
      return
    }
    let content
    switch (type) {
      case 'csv':
        content = toCSV(config)
        break
      case 'txt':
        content = toTXT(config)
        break
      case 'json':
        content = toJSON(config)
        break
      case 'xml':
        content = toXML(config)
        break
      case 'html':
        content = toHTML(config)
        break
      default:
        content = toCSV(config)
    }
    if (config.mode === 'string') {
      ;(_c = config.afterExport) == null ? void 0 : _c.call(config, type)
      return content
    }
    downloadFile(content, `${filename}${EXT_MAP[type]}`, MIME_MAP[type])
    ;(_d = config.afterExport) == null ? void 0 : _d.call(config, type)
  }
  return {
    exportData,
    toCSV,
    toJSON,
    toTXT,
    toXML,
    toHTML,
    toXLSX,
    getExportColumns
  }
}

// public/codesandbox-runtime/components/table/src/use-table-import.js
import * as XLSX2 from 'xlsx'
var __defProp5 = Object.defineProperty
var __defProps3 = Object.defineProperties
var __getOwnPropDescs3 = Object.getOwnPropertyDescriptors
var __getOwnPropSymbols5 = Object.getOwnPropertySymbols
var __hasOwnProp5 = Object.prototype.hasOwnProperty
var __propIsEnum5 = Object.prototype.propertyIsEnumerable
var __defNormalProp5 = (obj, key, value) =>
  key in obj
    ? __defProp5(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp5.call(b, prop)) __defNormalProp5(a, prop, b[prop])
  if (__getOwnPropSymbols5)
    for (var prop of __getOwnPropSymbols5(b)) {
      if (__propIsEnum5.call(b, prop)) __defNormalProp5(a, prop, b[prop])
    }
  return a
}
var __spreadProps3 = (a, b) => __defProps3(a, __getOwnPropDescs3(b))
function useTableImport(data, columns) {
  const { t } = useLocale()
  function buildLabelMap() {
    const map = /* @__PURE__ */ new Map()
    columns.value.forEach((col) => {
      if (col.prop) {
        map.set(col.prop, { prop: col.prop })
        if (col.label) {
          map.set(col.label, { prop: col.prop })
        }
      }
    })
    return map
  }
  function mapRow(row, labelMap, config) {
    const mapped = {}
    Object.entries(row).forEach(([key, val]) => {
      var _a2, _b
      let prop = key
      if ((_a2 = config.fieldMapping) == null ? void 0 : _a2[key]) {
        prop = config.fieldMapping[key]
      } else if (config.autoMapping !== false) {
        const info = labelMap.get(key)
        if (info) prop = info.prop
      }
      if ((_b = config.numberFields) == null ? void 0 : _b.includes(prop)) {
        const num = Number(val)
        mapped[prop] = isNaN(num) ? val : num
      } else {
        mapped[prop] = val
      }
    })
    return mapped
  }
  function parseCSV(text, config = {}) {
    const sep = config.separator || ','
    const lines = text.split(/\r?\n/).filter((l) => l.trim())
    if (lines.length < 2) return []
    const headers = parseCSVLine(lines[0], sep)
    const labelMap = buildLabelMap()
    let rows = lines.slice(1).map((line) => {
      const vals = parseCSVLine(line, sep)
      const row = {}
      headers.forEach((h, i) => {
        var _a2
        row[h] = (_a2 = vals[i]) != null ? _a2 : ''
      })
      return mapRow(row, labelMap, config)
    })
    if (config.maxRows) rows = rows.slice(0, config.maxRows)
    return rows
  }
  function parseCSVLine(line, sep) {
    const result = []
    let current = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (inQuotes) {
        if (ch === '"') {
          if (i + 1 < line.length && line[i + 1] === '"') {
            current += '"'
            i++
          } else {
            inQuotes = false
          }
        } else {
          current += ch
        }
      } else {
        if (ch === '"') {
          inQuotes = true
        } else if (ch === sep) {
          result.push(current.trim())
          current = ''
        } else {
          current += ch
        }
      }
    }
    result.push(current.trim())
    return result
  }
  function parseTXT(text, config = {}) {
    return parseCSV(text, __spreadProps3(__spreadValues5({}, config), { separator: '	' }))
  }
  function parseJSON(text, config = {}) {
    try {
      const parsed = JSON.parse(text)
      const arr = Array.isArray(parsed) ? parsed : [parsed]
      const labelMap = buildLabelMap()
      let rows = arr.map((item) => mapRow(item, labelMap, config))
      if (config.maxRows) rows = rows.slice(0, config.maxRows)
      return rows
    } catch (e) {
      console.warn('[YhTable] JSON \u89E3\u6790\u5931\u8D25')
      return []
    }
  }
  function parseXML(text, config = {}) {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(text, 'application/xml')
      const labelMap = buildLabelMap()
      const colNodes = doc.querySelectorAll('column')
      const colNames = []
      colNodes.forEach((n) => colNames.push(n.getAttribute('name') || ''))
      const rowNodes = doc.querySelectorAll('row')
      let rows = []
      rowNodes.forEach((rn) => {
        const cellNodes = rn.querySelectorAll('cell')
        const row = {}
        cellNodes.forEach((cn, i) => {
          const key = colNames[i] || `col${i}`
          row[key] = cn.textContent || ''
        })
        rows.push(mapRow(row, labelMap, config))
      })
      if (config.maxRows) rows = rows.slice(0, config.maxRows)
      return rows
    } catch (e) {
      console.warn('[YhTable] XML \u89E3\u6790\u5931\u8D25')
      return []
    }
  }
  function parseHTML(text, config = {}) {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(text, 'text/html')
      const labelMap = buildLabelMap()
      const ths = doc.querySelectorAll('thead th, thead td')
      const headers = []
      ths.forEach((th) => {
        var _a2
        return headers.push(((_a2 = th.textContent) == null ? void 0 : _a2.trim()) || '')
      })
      const trs = doc.querySelectorAll('tbody tr')
      let rows = []
      trs.forEach((tr) => {
        const tds = tr.querySelectorAll('td')
        const row = {}
        tds.forEach((td, i) => {
          var _a2
          const key = headers[i] || `col${i}`
          row[key] = ((_a2 = td.textContent) == null ? void 0 : _a2.trim()) || ''
        })
        rows.push(mapRow(row, labelMap, config))
      })
      if (config.maxRows) rows = rows.slice(0, config.maxRows)
      return rows
    } catch (e) {
      console.warn('[YhTable] HTML \u89E3\u6790\u5931\u8D25')
      return []
    }
  }
  function applyImport(rows, mode = 'insertBottom') {
    switch (mode) {
      case 'covering':
        data.value = rows
        break
      case 'insertTop':
        data.value = [...rows, ...data.value]
        break
      case 'insertBottom':
      default:
        data.value = [...data.value, ...rows]
        break
    }
  }
  function parseXLSX(buffer, config = {}) {
    var _a2
    try {
      const labelMap = buildLabelMap()
      const wb = XLSX2.read(buffer, { type: 'array' })
      let sheetName = config.sheetName
      if (!sheetName) {
        const idx = (_a2 = config.sheetIndex) != null ? _a2 : 0
        sheetName = wb.SheetNames[idx]
      }
      const ws = wb.Sheets[sheetName]
      if (!ws) {
        console.warn('[YhTable] XLSX \u5DE5\u4F5C\u8868\u4E0D\u5B58\u5728:', sheetName)
        return []
      }
      const useHeader = config.headerRow !== false
      const jsonData = XLSX2.utils.sheet_to_json(ws, {
        header: useHeader ? void 0 : 1,
        defval: ''
      })
      let rows = jsonData.map((item) => mapRow(item, labelMap, config))
      if (config.maxRows) rows = rows.slice(0, config.maxRows)
      return rows
    } catch (err) {
      console.warn('[YhTable] XLSX \u89E3\u6790\u5931\u8D25', err)
      return []
    }
  }
  function guessType(filename) {
    var _a2
    const ext = (_a2 = filename.split('.').pop()) == null ? void 0 : _a2.toLowerCase()
    switch (ext) {
      case 'csv':
        return 'csv'
      case 'json':
        return 'json'
      case 'txt':
        return 'txt'
      case 'xml':
        return 'xml'
      case 'html':
      case 'htm':
        return 'html'
      case 'xlsx':
      case 'xls':
      case 'xlsm':
        return 'xlsx'
      default:
        return 'csv'
    }
  }
  function parseContent(text, type, config = {}) {
    switch (type) {
      case 'csv':
        return parseCSV(text, config)
      case 'txt':
        return parseTXT(text, config)
      case 'json':
        return parseJSON(text, config)
      case 'xml':
        return parseXML(text, config)
      case 'html':
        return parseHTML(text, config)
      default:
        return parseCSV(text, config)
    }
  }
  async function importFile(file, config = {}) {
    const type = config.type || guessType(file.name)
    const encoding = config.encoding || 'utf-8'
    const mode = config.mode || 'insertBottom'
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (ev) => {
        var _a2, _b, _c
        let rows
        if (type === 'xlsx') {
          const buffer = (_a2 = ev.target) == null ? void 0 : _a2.result
          rows = parseXLSX(buffer, config)
        } else {
          const text = (_b = ev.target) == null ? void 0 : _b.result
          rows = parseContent(text, type, config)
        }
        if (config.beforeImport) {
          const result = await config.beforeImport(rows)
          if (result === false) {
            resolve([])
            return
          }
          if (Array.isArray(result)) {
            rows = result
          }
        }
        applyImport(rows, mode)
        ;(_c = config.afterImport) == null ? void 0 : _c.call(config, rows, mode)
        resolve(rows)
      }
      reader.onerror = () => reject(new Error(t('upload.error')))
      if (type === 'xlsx') {
        reader.readAsArrayBuffer(file)
      } else {
        reader.readAsText(file, encoding)
      }
    })
  }
  async function importData(content, config = {}) {
    var _a2
    const mode = config.mode || 'insertBottom'
    let rows
    if (typeof content === 'string') {
      const type = config.type || 'csv'
      rows = parseContent(content, type, config)
    } else {
      rows = content
    }
    if (config.beforeImport) {
      const result = await config.beforeImport(rows)
      if (result === false) return []
      if (Array.isArray(result)) rows = result
    }
    applyImport(rows, mode)
    ;(_a2 = config.afterImport) == null ? void 0 : _a2.call(config, rows, mode)
    return rows
  }
  function openImport(config = {}) {
    return new Promise((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      const acceptMap = {
        csv: '.csv',
        json: '.json',
        txt: '.txt',
        xml: '.xml',
        html: '.html,.htm',
        xlsx: '.xlsx,.xls,.xlsm'
      }
      input.accept = config.type
        ? acceptMap[config.type] || '*'
        : '.csv,.json,.txt,.xml,.html,.xlsx,.xls'
      input.onchange = async (e) => {
        var _a2
        const file = (_a2 = e.target.files) == null ? void 0 : _a2[0]
        if (file) {
          const rows = await importFile(file, config)
          resolve(rows)
        } else {
          resolve([])
        }
      }
      input.click()
    })
  }
  return {
    importFile,
    importData,
    openImport,
    parseCSV,
    parseTXT,
    parseJSON,
    parseXML,
    parseHTML,
    parseXLSX,
    parseContent,
    applyImport
  }
}

// public/codesandbox-runtime/components/table/src/use-table-print.js
var __defProp6 = Object.defineProperty
var __getOwnPropSymbols6 = Object.getOwnPropertySymbols
var __hasOwnProp6 = Object.prototype.hasOwnProperty
var __propIsEnum6 = Object.prototype.propertyIsEnumerable
var __defNormalProp6 = (obj, key, value) =>
  key in obj
    ? __defProp6(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues6 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp6.call(b, prop)) __defNormalProp6(a, prop, b[prop])
  if (__getOwnPropSymbols6)
    for (var prop of __getOwnPropSymbols6(b)) {
      if (__propIsEnum6.call(b, prop)) __defNormalProp6(a, prop, b[prop])
    }
  return a
}
function useTablePrint(data, columns) {
  const { t } = useLocale()
  function getPrintColumns(config = {}) {
    var _a2, _b
    let cols = columns.value.filter((col) => col.visible !== false && col.prop)
    if ((_a2 = config.columns) == null ? void 0 : _a2.length) {
      cols = cols.filter((c) => config.columns.includes(c.prop))
    }
    if ((_b = config.excludeColumns) == null ? void 0 : _b.length) {
      cols = cols.filter((c) => !config.excludeColumns.includes(c.prop))
    }
    return cols
  }
  function getLabel(col, config) {
    var _a2
    if ((_a2 = config.columnTitles) == null ? void 0 : _a2[col.prop]) {
      return config.columnTitles[col.prop]
    }
    return col.label || col.prop || ''
  }
  function getCellValue(row, col, config) {
    const raw = col.prop ? row[col.prop] : ''
    if (config.formatCell) {
      return config.formatCell(raw, col, row)
    }
    return raw == null ? '' : String(raw)
  }
  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
  function buildStyles(config) {
    const margin = config.margin || {}
    const mt = margin.top || '10mm'
    const mr = margin.right || '10mm'
    const mb = margin.bottom || '10mm'
    const ml = margin.left || '10mm'
    let css = [
      '*{margin:0;padding:0;box-sizing:border-box}',
      `@page{size:${config.orientation === 'landscape' ? 'landscape' : 'portrait'};margin:${mt} ${mr} ${mb} ${ml}}`,
      'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;color:#303133;padding:20px}',
      '.print-title{text-align:center;font-size:18px;font-weight:700;margin-bottom:12px;color:#303133}',
      '.print-header,.print-footer{text-align:center;color:#909399;font-size:12px;line-height:1.6}',
      '.print-header{margin-bottom:12px;border-bottom:1px solid #ebeef5;padding-bottom:8px}',
      '.print-footer{margin-top:12px;border-top:1px solid #ebeef5;padding-top:8px}',
      'table{width:100%;border-collapse:collapse;font-size:13px}',
      'th,td{padding:8px 12px;border:1px solid #dcdfe6;text-align:left;word-break:break-all}',
      'th{background:#f5f7fa;font-weight:600;color:#303133}',
      'tr:nth-child(even) td{background:#fafafa}',
      '.page-break{page-break-after:always}',
      '.page-number{text-align:center;font-size:11px;color:#909399;margin-top:8px}',
      '.no-print{text-align:center;margin-top:20px}',
      '.no-print button{padding:8px 24px;border-radius:4px;cursor:pointer;font-size:14px;border:none;margin:0 4px}',
      '.btn-print{background:#409eff;color:#fff}',
      '.btn-cancel{background:#fff;color:#606266;border:1px solid #dcdfe6!important}',
      '@media print{.no-print{display:none!important}.page-number{position:fixed;bottom:10mm;width:100%}}'
    ]
    if (config.extraCss) css.push(config.extraCss)
    if (config.tableStyle) css.push(`.print-table{${config.tableStyle}}`)
    return css.join('\n')
  }
  function buildTableHead(cols, config) {
    let html = '<thead><tr>'
    if (config.showIndex) {
      html += `<th style="width:50px;text-align:center">${escapeHTML(config.indexTitle || t('table.index'))}</th>`
    }
    cols.forEach((col) => {
      const align = col.headerAlign || col.align || 'left'
      html += `<th style="text-align:${align}">${escapeHTML(getLabel(col, config))}</th>`
    })
    html += '</tr></thead>'
    return html
  }
  function buildTableRows(rows, cols, config, startIndex = 0) {
    let html = ''
    rows.forEach((row, idx) => {
      html += '<tr>'
      if (config.showIndex) {
        html += `<td style="text-align:center">${startIndex + idx + 1}</td>`
      }
      cols.forEach((col) => {
        const align = col.align || 'left'
        html += `<td style="text-align:${align}">${escapeHTML(getCellValue(row, col, config))}</td>`
      })
      html += '</tr>'
    })
    return html
  }
  function buildInfoFooter(config, totalRows) {
    const parts = []
    if (config.showTime !== false) {
      parts.push(t('table.printTime') + /* @__PURE__ */ new Date().toLocaleString())
    }
    if (config.showCount !== false) {
      parts.push(t('table.total', { total: totalRows }))
    }
    if (parts.length === 0) return ''
    return '<div class="print-footer">' + parts.join('&nbsp;&nbsp;') + '</div>'
  }
  async function print(config = {}) {
    var _a2
    if (config.beforePrint) {
      const ok = await config.beforePrint()
      if (!ok) return
    }
    const cols = getPrintColumns(config)
    const rows = config.data || data.value
    const title = config.title || ''
    const styles = buildStyles(config)
    const thead = buildTableHead(cols, config)
    let body = ''
    if (config.pageSize && config.pageSize > 0) {
      const totalPages = Math.ceil(rows.length / config.pageSize)
      for (let p = 0; p < totalPages; p++) {
        const pageRows = rows.slice(p * config.pageSize, (p + 1) * config.pageSize)
        const startIdx = p * config.pageSize
        const isLast = p === totalPages - 1
        if (title) body += `<div class="print-title">${escapeHTML(title)}</div>`
        if (config.headerHtml) body += `<div class="print-header">${config.headerHtml}</div>`
        body += '<table class="print-table">'
        body += thead
        body += '<tbody>' + buildTableRows(pageRows, cols, config, startIdx) + '</tbody>'
        body += '</table>'
        if (config.showPageNumber) {
          body += `<div class="page-number">${t('table.page', { page: p + 1, total: totalPages })}</div>`
        }
        if (config.footerHtml) body += `<div class="print-footer">${config.footerHtml}</div>`
        if (!isLast) body += '<div class="page-break"></div>'
      }
      body += buildInfoFooter(config, rows.length)
    } else {
      if (title) body += `<div class="print-title">${escapeHTML(title)}</div>`
      if (config.headerHtml) body += `<div class="print-header">${config.headerHtml}</div>`
      body += '<table class="print-table">'
      body += thead
      body += '<tbody>' + buildTableRows(rows, cols, config) + '</tbody>'
      body += '</table>'
      body += buildInfoFooter(config, rows.length)
      if (config.footerHtml) body += `<div class="print-footer">${config.footerHtml}</div>`
    }
    body += '<div class="no-print">'
    body += `<button class="btn-print" onclick="window.print()">${t('table.print')}</button>`
    body += `<button class="btn-cancel" onclick="window.close()">${t('table.cancel')}</button>`
    body += '</div>'
    const printWin = window.open('', '_blank')
    if (!printWin) {
      console.warn(
        '[YhTable] \u65E0\u6CD5\u6253\u5F00\u6253\u5370\u7A97\u53E3\uFF0C\u8BF7\u68C0\u67E5\u6D4F\u89C8\u5668\u5F39\u7A97\u8BBE\u7F6E'
      )
      return
    }
    const html = [
      '<!DOCTYPE html><html><head><meta charset="UTF-8">',
      '<title>' + escapeHTML(title || t('table.preview')) + '</title>',
      '<style>' + styles + '</style>',
      '</head><body>',
      body,
      '</body></html>'
    ].join('')
    printWin.document.write(html)
    printWin.document.close()
    if (config.autoPrint) {
      printWin.onload = () => {
        printWin.print()
      }
    }
    ;(_a2 = config.afterPrint) == null ? void 0 : _a2.call(config)
  }
  async function printMultiple(tables, globalConfig = {}) {
    var _a2
    if (globalConfig.beforePrint) {
      const ok = await globalConfig.beforePrint()
      if (!ok) return
    }
    const styles = buildStyles(globalConfig)
    let body = ''
    tables.forEach((table, tIdx) => {
      const cfg = __spreadValues6(__spreadValues6({}, globalConfig), table.config)
      const cols = table.columns
        ? table.columns.filter((c) => c.visible !== false && c.prop)
        : getPrintColumns(cfg)
      const rows = table.data
      if (table.title) body += `<div class="print-title">${escapeHTML(table.title)}</div>`
      if (cfg.headerHtml) body += `<div class="print-header">${cfg.headerHtml}</div>`
      body += '<table class="print-table">'
      body += buildTableHead(cols, cfg)
      body += '<tbody>' + buildTableRows(rows, cols, cfg) + '</tbody>'
      body += '</table>'
      body += buildInfoFooter(cfg, rows.length)
      if (cfg.footerHtml) body += `<div class="print-footer">${cfg.footerHtml}</div>`
      if (tIdx < tables.length - 1) {
        body += '<div class="page-break"></div>'
      }
    })
    body += '<div class="no-print">'
    body += `<button class="btn-print" onclick="window.print()">${t('table.print')}</button>`
    body += `<button class="btn-cancel" onclick="window.close()">${t('table.cancel')}</button>`
    body += '</div>'
    const printWin = window.open('', '_blank')
    if (!printWin) return
    const html = [
      '<!DOCTYPE html><html><head><meta charset="UTF-8">',
      '<title>' + escapeHTML(globalConfig.title || t('table.preview')) + '</title>',
      '<style>' + styles + '</style>',
      '</head><body>',
      body,
      '</body></html>'
    ].join('')
    printWin.document.write(html)
    printWin.document.close()
    if (globalConfig.autoPrint) {
      printWin.onload = () => printWin.print()
    }
    ;(_a2 = globalConfig.afterPrint) == null ? void 0 : _a2.call(globalConfig)
  }
  async function printTemplate(templateHtml, config = {}) {
    var _a2
    if (config.beforePrint) {
      const ok = await config.beforePrint()
      if (!ok) return
    }
    const styles = buildStyles(config)
    const printWin = window.open('', '_blank')
    if (!printWin) return
    const html = [
      '<!DOCTYPE html><html><head><meta charset="UTF-8">',
      '<title>' + escapeHTML(config.title || t('table.preview')) + '</title>',
      '<style>' + styles + '</style>',
      '</head><body>',
      templateHtml,
      '<div class="no-print">',
      `<button class="btn-print" onclick="window.print()">${t('table.print')}</button>`,
      `<button class="btn-cancel" onclick="window.close()">${t('table.cancel')}</button>`,
      '</div>',
      '</body></html>'
    ].join('')
    printWin.document.write(html)
    printWin.document.close()
    if (config.autoPrint) {
      printWin.onload = () => printWin.print()
    }
    ;(_a2 = config.afterPrint) == null ? void 0 : _a2.call(config)
  }
  return {
    print,
    printMultiple,
    printTemplate,
    getPrintColumns
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
  ref as ref17,
  computed as computed15,
  watch as watch6,
  onMounted as onMounted4,
  onUnmounted as onUnmounted6,
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
var __defProp7 = Object.defineProperty
var __getOwnPropSymbols7 = Object.getOwnPropertySymbols
var __hasOwnProp7 = Object.prototype.hasOwnProperty
var __propIsEnum7 = Object.prototype.propertyIsEnumerable
var __defNormalProp7 = (obj, key, value) =>
  key in obj
    ? __defProp7(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues7 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp7.call(b, prop)) __defNormalProp7(a, prop, b[prop])
  if (__getOwnPropSymbols7)
    for (var prop of __getOwnPropSymbols7(b)) {
      if (__propIsEnum7.call(b, prop)) __defNormalProp7(a, prop, b[prop])
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
        computed15(() => props.themeOverrides)
      )
      const triggerRef = ref17(null)
      const popperRef = ref17(null)
      const arrowRef = ref17(null)
      const visible = ref17(false)
      const popperStyle = ref17({})
      const arrowStyle = ref17({})
      const computedPopperStyle = computed15(() => {
        const styles = __spreadValues7(__spreadValues7({}, themeStyle.value), popperStyle.value)
        if (typeof props.popperStyle === 'object') {
          Object.assign(styles, props.popperStyle)
        }
        return styles
      })
      const computedContentStyle = computed15(() => {
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
      const actualPlacement = ref17(props.placement)
      let cleanup = null
      let showTimer = null
      let hideTimer = null
      const showPopper = computed15(() => {
        if (props.disabled) return false
        return props.visible !== null ? props.visible : visible.value
      })
      const shouldRender = computed15(() => props.persistent || showPopper.value)
      const popperClasses = computed15(() => [
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
      const triggers = computed15(() => {
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
      watch6(
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
      watch6(
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
      onMounted4(() => {
        if (props.followCursor && typeof window !== 'undefined') {
          window.addEventListener('mousemove', handleMouseMove)
        }
      })
      onUnmounted6(() => {
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
        ref: ref17,
        computed: computed15,
        watch: watch6,
        onMounted: onMounted4,
        onUnmounted: onUnmounted6,
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
var stdin_default2 = __sfc__

// public/codesandbox-runtime/components/tooltip/index.js
var YhTooltip = withInstall(stdin_default2)

// public/codesandbox-runtime/components/pagination/src/pagination.js
import {
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock2,
  createElementBlock as _createElementBlock2,
  createCommentVNode as _createCommentVNode2,
  toDisplayString as _toDisplayString2,
  normalizeClass as _normalizeClass2,
  resolveComponent as _resolveComponent,
  createBlock as _createBlock2,
  withCtx as _withCtx2,
  createVNode as _createVNode2,
  renderSlot as _renderSlot2,
  createElementVNode as _createElementVNode2,
  withKeys as _withKeys,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle2
} from 'vue'
import { computed as computed16, ref as ref18, watch as watch7 } from 'vue'

// public/codesandbox-runtime/components/pagination/src/pagination-meta.js
var paginationProps = {
  /**
   * @description 当前页码
   * @default 1
   */
  currentPage: {
    type: Number,
    default: 1
  },
  /**
   * @description 总条数
   * @default 0
   */
  total: {
    type: Number,
    default: 0
  },
  /**
   * @description 每页条数
   * @default 10
   */
  pageSize: {
    type: Number,
    default: 10
  },
  /**
   * @description 每页显示个数选择器的选项设置
   * @default [10, 20, 30, 40, 50, 100]
   */
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 40, 50, 100]
  },
  /**
   * @description 组件布局，子组件名用逗号隔开
   * @default 'prev, pager, next'
   */
  layout: {
    type: String,
    default: 'prev, pager, next'
  },
  /**
   * @description 页码按钮的数量，当总页数超过该值时会折叠
   * @default 7
   */
  pagerCount: {
    type: Number,
    default: 7
  },
  /**
   * @description 是否为背景颜色模式
   * @default false
   */
  background: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否使用小型分页
   * @default false
   */
  small: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否禁用
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 只有一页时是否隐藏
   * @default false
   */
  hideOnSinglePage: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否使用圆形分页
   * @default false
   */
  circle: {
    type: Boolean,
    default: false
  },
  /**
   * @description 替代图标的文字 - 上一页
   */
  prevText: String,
  /**
   * @description 替代图标的文字 - 下一页
   */
  nextText: String,
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}

// public/codesandbox-runtime/components/pagination/src/pagination.js
var _hoisted_12 = ['disabled']
var _hoisted_22 = { key: 0 }
var _hoisted_32 = {
  key: 1,
  viewBox: '0 0 1024 1024',
  width: '1em',
  height: '1em'
}
var _hoisted_4 = ['onClick']
var _hoisted_5 = ['disabled']
var _hoisted_6 = { key: 0 }
var _hoisted_7 = {
  key: 1,
  viewBox: '0 0 1024 1024',
  width: '1em',
  height: '1em'
}
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_yh_option = _resolveComponent('yh-option')
  const _component_yh_select = _resolveComponent('yh-select')
  const _component_yh_input = _resolveComponent('yh-input')
  return !_ctx.hideOnSinglePage || $setup.pageCount > 1
    ? (_openBlock2(),
      _createElementBlock2(
        'nav',
        {
          key: 0,
          class: _normalizeClass2($setup.paginationClasses),
          style: _normalizeStyle2($setup.themeStyle)
        },
        [
          (_openBlock2(true),
          _createElementBlock2(
            _Fragment,
            null,
            _renderList($setup.layoutComponents, (item) => {
              return (
                _openBlock2(),
                _createElementBlock2(
                  _Fragment,
                  { key: item },
                  [
                    _createCommentVNode2(' Total '),
                    item === 'total'
                      ? (_openBlock2(),
                        _createElementBlock2(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass2($setup.ns.e('total'))
                          },
                          _toDisplayString2($setup.t('pagination.total', { total: _ctx.total })),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode2('v-if', true),
                    _createCommentVNode2(' Sizes '),
                    item === 'sizes'
                      ? (_openBlock2(),
                        _createElementBlock2(
                          'div',
                          {
                            key: 1,
                            class: _normalizeClass2($setup.ns.e('sizes'))
                          },
                          [
                            _createVNode2(
                              _component_yh_select,
                              {
                                'model-value': _ctx.pageSize,
                                disabled: _ctx.disabled,
                                size: _ctx.small ? 'small' : 'default',
                                'onUpdate:modelValue':
                                  _cache[0] ||
                                  (_cache[0] = (val) => $setup.handleSizeChange(Number(val)))
                              },
                              {
                                default: _withCtx2(() => [
                                  (_openBlock2(true),
                                  _createElementBlock2(
                                    _Fragment,
                                    null,
                                    _renderList(_ctx.pageSizes, (size) => {
                                      return (
                                        _openBlock2(),
                                        _createBlock2(
                                          _component_yh_option,
                                          {
                                            key: size,
                                            label: `${size}${$setup.t('pagination.pageSize')}`,
                                            value: size
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
                              ['model-value', 'disabled', 'size']
                            )
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode2('v-if', true),
                    _createCommentVNode2(' Prev '),
                    item === 'prev'
                      ? (_openBlock2(),
                        _createElementBlock2(
                          'button',
                          {
                            key: 2,
                            class: _normalizeClass2($setup.ns.e('prev')),
                            disabled: _ctx.disabled || $setup.internalCurrentPage <= 1,
                            onClick: $setup.handlePrev
                          },
                          [
                            _renderSlot2(_ctx.$slots, 'prev-icon', {}, () => [
                              _ctx.prevText
                                ? (_openBlock2(),
                                  _createElementBlock2(
                                    'span',
                                    _hoisted_22,
                                    _toDisplayString2(_ctx.prevText),
                                    1
                                    /* TEXT */
                                  ))
                                : (_openBlock2(),
                                  _createElementBlock2('svg', _hoisted_32, [
                                    ...(_cache[6] ||
                                      (_cache[6] = [
                                        _createElementVNode2(
                                          'path',
                                          {
                                            fill: 'currentColor',
                                            d: 'M609.4 824.6L296.8 512l312.6-312.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L228.9 489.4c-12.5 12.5-12.5 32.8 0 45.3l335.2 335.2c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z'
                                          },
                                          null,
                                          -1
                                          /* CACHED */
                                        )
                                      ]))
                                  ]))
                            ])
                          ],
                          10,
                          _hoisted_12
                        ))
                      : _createCommentVNode2('v-if', true),
                    _createCommentVNode2(' Pager '),
                    item === 'pager'
                      ? (_openBlock2(),
                        _createElementBlock2(
                          'ul',
                          {
                            key: 3,
                            class: _normalizeClass2($setup.ns.e('pager'))
                          },
                          [
                            _createElementVNode2(
                              'li',
                              {
                                class: _normalizeClass2([
                                  $setup.ns.e('item'),
                                  $setup.ns.is('active', $setup.internalCurrentPage === 1)
                                ]),
                                onClick:
                                  _cache[1] ||
                                  (_cache[1] = ($event) => $setup.handleCurrentChange(1))
                              },
                              ' 1 ',
                              2
                              /* CLASS */
                            ),
                            $setup.pagers.showPrevMore
                              ? (_openBlock2(),
                                _createElementBlock2(
                                  'li',
                                  {
                                    key: 0,
                                    class: _normalizeClass2([
                                      $setup.ns.e('item'),
                                      $setup.ns.e('more')
                                    ]),
                                    onClick:
                                      _cache[2] ||
                                      (_cache[2] = ($event) =>
                                        $setup.handleCurrentChange(
                                          Math.max(1, $setup.internalCurrentPage - 5)
                                        ))
                                  },
                                  [
                                    _createElementVNode2(
                                      'span',
                                      {
                                        class: _normalizeClass2($setup.ns.e('more-icon'))
                                      },
                                      '...',
                                      2
                                      /* CLASS */
                                    )
                                  ],
                                  2
                                  /* CLASS */
                                ))
                              : _createCommentVNode2('v-if', true),
                            (_openBlock2(true),
                            _createElementBlock2(
                              _Fragment,
                              null,
                              _renderList($setup.pagers.array, (page) => {
                                return (
                                  _openBlock2(),
                                  _createElementBlock2(
                                    'li',
                                    {
                                      key: page,
                                      class: _normalizeClass2([
                                        $setup.ns.e('item'),
                                        $setup.ns.is('active', $setup.internalCurrentPage === page)
                                      ]),
                                      onClick: ($event) => $setup.handleCurrentChange(page)
                                    },
                                    _toDisplayString2(page),
                                    11,
                                    _hoisted_4
                                  )
                                )
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            )),
                            $setup.pagers.showNextMore
                              ? (_openBlock2(),
                                _createElementBlock2(
                                  'li',
                                  {
                                    key: 1,
                                    class: _normalizeClass2([
                                      $setup.ns.e('item'),
                                      $setup.ns.e('more')
                                    ]),
                                    onClick:
                                      _cache[3] ||
                                      (_cache[3] = ($event) =>
                                        $setup.handleCurrentChange(
                                          Math.min($setup.pageCount, $setup.internalCurrentPage + 5)
                                        ))
                                  },
                                  [
                                    _createElementVNode2(
                                      'span',
                                      {
                                        class: _normalizeClass2($setup.ns.e('more-icon'))
                                      },
                                      '...',
                                      2
                                      /* CLASS */
                                    )
                                  ],
                                  2
                                  /* CLASS */
                                ))
                              : _createCommentVNode2('v-if', true),
                            $setup.pageCount > 1
                              ? (_openBlock2(),
                                _createElementBlock2(
                                  'li',
                                  {
                                    key: 2,
                                    class: _normalizeClass2([
                                      $setup.ns.e('item'),
                                      $setup.ns.is(
                                        'active',
                                        $setup.internalCurrentPage === $setup.pageCount
                                      )
                                    ]),
                                    onClick:
                                      _cache[4] ||
                                      (_cache[4] = ($event) =>
                                        $setup.handleCurrentChange($setup.pageCount))
                                  },
                                  _toDisplayString2($setup.pageCount),
                                  3
                                  /* TEXT, CLASS */
                                ))
                              : _createCommentVNode2('v-if', true)
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode2('v-if', true),
                    _createCommentVNode2(' Next '),
                    item === 'next'
                      ? (_openBlock2(),
                        _createElementBlock2(
                          'button',
                          {
                            key: 4,
                            class: _normalizeClass2($setup.ns.e('next')),
                            disabled:
                              _ctx.disabled || $setup.internalCurrentPage >= $setup.pageCount,
                            onClick: $setup.handleNext
                          },
                          [
                            _renderSlot2(_ctx.$slots, 'next-icon', {}, () => [
                              _ctx.nextText
                                ? (_openBlock2(),
                                  _createElementBlock2(
                                    'span',
                                    _hoisted_6,
                                    _toDisplayString2(_ctx.nextText),
                                    1
                                    /* TEXT */
                                  ))
                                : (_openBlock2(),
                                  _createElementBlock2('svg', _hoisted_7, [
                                    ...(_cache[7] ||
                                      (_cache[7] = [
                                        _createElementVNode2(
                                          'path',
                                          {
                                            fill: 'currentColor',
                                            d: 'M341.3 824.6l312.6-312.6L341.3 199.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L721.8 489.4c12.5 12.5 12.5 32.8 0 45.3L386.6 869.9c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3z'
                                          },
                                          null,
                                          -1
                                          /* CACHED */
                                        )
                                      ]))
                                  ]))
                            ])
                          ],
                          10,
                          _hoisted_5
                        ))
                      : _createCommentVNode2('v-if', true),
                    _createCommentVNode2(' Jumper '),
                    item === 'jumper'
                      ? (_openBlock2(),
                        _createElementBlock2(
                          'div',
                          {
                            key: 5,
                            class: _normalizeClass2($setup.ns.e('jumper'))
                          },
                          [
                            _createTextVNode(
                              _toDisplayString2($setup.t('pagination.goto')) + ' ',
                              1
                              /* TEXT */
                            ),
                            _createVNode2(
                              _component_yh_input,
                              {
                                modelValue: $setup.jumpValue,
                                'onUpdate:modelValue':
                                  _cache[5] ||
                                  (_cache[5] = ($event) => ($setup.jumpValue = $event)),
                                size: _ctx.small ? 'small' : 'default',
                                disabled: _ctx.disabled,
                                onBlur: $setup.handleJump,
                                onKeyup: _withKeys($setup.handleJump, ['enter'])
                              },
                              null,
                              8,
                              ['modelValue', 'size', 'disabled']
                            ),
                            _createTextVNode(
                              ' ' + _toDisplayString2($setup.t('pagination.page')),
                              1
                              /* TEXT */
                            )
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode2('v-if', true),
                    _createCommentVNode2(' Slot '),
                    item === 'slot'
                      ? _renderSlot2(_ctx.$slots, 'default', { key: 6 })
                      : _createCommentVNode2('v-if', true)
                  ],
                  64
                  /* STABLE_FRAGMENT */
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
    : _createCommentVNode2('v-if', true)
}
var __sfc__2 = /* @__PURE__ */ Object.assign(
  {
    name: 'YhPagination'
  },
  {
    __name: 'pagination',
    props: paginationProps,
    emits: [
      'update:currentPage',
      'update:pageSize',
      'current-change',
      'size-change',
      'prev-click',
      'next-click'
    ],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('pagination')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'pagination',
        computed16(() => props.themeOverrides)
      )
      const pageCount = computed16(() => {
        if (props.total > 0) {
          return Math.max(1, Math.ceil(props.total / props.pageSize))
        }
        return 1
      })
      const internalCurrentPage = ref18(props.currentPage)
      watch7(
        () => props.currentPage,
        (val) => {
          internalCurrentPage.value = val
        }
      )
      const pagers = computed16(() => {
        const count = props.pagerCount
        const currentPage = internalCurrentPage.value
        const totalPages = pageCount.value
        const showPrevMore = totalPages > count && currentPage > count - (count - 1) / 2
        const showNextMore = totalPages > count && currentPage < totalPages - (count - 1) / 2
        const array = []
        if (showPrevMore && !showNextMore) {
          const startPage = totalPages - (count - 2)
          for (let i = startPage; i < totalPages; i++) {
            array.push(i)
          }
        } else if (!showPrevMore && showNextMore) {
          for (let i = 2; i < count; i++) {
            array.push(i)
          }
        } else if (showPrevMore && showNextMore) {
          const offset2 = Math.floor(count / 2) - 1
          for (let i = currentPage - offset2; i <= currentPage + offset2; i++) {
            array.push(i)
          }
        } else {
          for (let i = 2; i < totalPages; i++) {
            array.push(i)
          }
        }
        return {
          showPrevMore,
          showNextMore,
          array
        }
      })
      const handleCurrentChange = (val) => {
        if (props.disabled || val < 1 || val > pageCount.value || val === internalCurrentPage.value)
          return
        internalCurrentPage.value = val
        emit('update:currentPage', val)
        emit('current-change', val)
      }
      const handlePrev = () => {
        if (internalCurrentPage.value <= 1) return
        const val = internalCurrentPage.value - 1
        handleCurrentChange(val)
        emit('prev-click', val)
      }
      const handleNext = () => {
        if (internalCurrentPage.value >= pageCount.value) return
        const val = internalCurrentPage.value + 1
        handleCurrentChange(val)
        emit('next-click', val)
      }
      const handleSizeChange = (val) => {
        emit('update:pageSize', val)
        emit('size-change', val)
      }
      const jumpValue = ref18(internalCurrentPage.value)
      watch7(internalCurrentPage, (val) => {
        jumpValue.value = val
      })
      const handleJump = () => {
        let val = Number(jumpValue.value)
        if (isNaN(val)) val = internalCurrentPage.value
        val = Math.max(1, Math.min(pageCount.value, Math.floor(val)))
        handleCurrentChange(val)
        jumpValue.value = val
      }
      const paginationClasses = computed16(() => [
        ns.b(),
        ns.is('background', props.background),
        ns.is('small', props.small),
        ns.is('circle', props.circle),
        ns.is('disabled', props.disabled)
      ])
      const layoutComponents = computed16(() => {
        return props.layout.split(',').map((item) => item.trim())
      })
      __expose({
        currentPage: internalCurrentPage.value,
        pageSize: props.pageSize,
        pageCount: pageCount.value
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        pageCount,
        internalCurrentPage,
        pagers,
        handleCurrentChange,
        handlePrev,
        handleNext,
        handleSizeChange,
        jumpValue,
        handleJump,
        paginationClasses,
        layoutComponents,
        computed: computed16,
        ref: ref18,
        watch: watch7,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get paginationProps() {
          return paginationProps
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__2.render = render2
var stdin_default3 = __sfc__2

// public/codesandbox-runtime/components/pagination/index.js
var YhPagination = withInstall(stdin_default3)

// public/codesandbox-runtime/components/table/src/table.js
var __defProp8 = Object.defineProperty
var __defProps4 = Object.defineProperties
var __getOwnPropDescs4 = Object.getOwnPropertyDescriptors
var __getOwnPropSymbols8 = Object.getOwnPropertySymbols
var __hasOwnProp8 = Object.prototype.hasOwnProperty
var __propIsEnum8 = Object.prototype.propertyIsEnumerable
var __defNormalProp8 = (obj, key, value) =>
  key in obj
    ? __defProp8(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues8 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp8.call(b, prop)) __defNormalProp8(a, prop, b[prop])
  if (__getOwnPropSymbols8)
    for (var prop of __getOwnPropSymbols8(b)) {
      if (__propIsEnum8.call(b, prop)) __defNormalProp8(a, prop, b[prop])
    }
  return a
}
var __spreadProps4 = (a, b) => __defProps4(a, __getOwnPropDescs4(b))
var _hoisted_13 = ['rowspan']
var _hoisted_23 = ['checked', 'indeterminate']
var _hoisted_33 = ['rowspan']
var _hoisted_42 = ['rowspan']
var _hoisted_52 = ['colspan', 'rowspan', 'onClick']
var _hoisted_62 = ['onPointerdown']
var _hoisted_72 = ['checked', 'indeterminate']
var _hoisted_8 = ['onClick']
var _hoisted_9 = ['onPointerdown']
var _hoisted_10 = ['src', 'alt']
var _hoisted_11 = ['onClick', 'onDblclick']
var _hoisted_122 = ['type', 'checked', 'disabled', 'onChange']
var _hoisted_132 = ['onClick']
var _hoisted_14 = ['colspan', 'rowspan', 'data-row-key', 'data-prop', 'onClick', 'onDblclick']
var _hoisted_15 = ['onClick']
var _hoisted_16 = ['colspan']
var _hoisted_17 = {
  key: 1,
  style: { display: 'none' },
  'aria-hidden': 'true'
}
function render3(_ctx, _cache, $props, $setup, $data, $options) {
  var _a2, _b, _c, _d
  return (
    _openBlock3(),
    _createElementBlock3(
      'div',
      {
        ref: 'tableRef',
        class: _normalizeClass3($setup.tableClasses),
        style: _normalizeStyle3($setup.tableStyle)
      },
      [
        _createElementVNode3(
          'div',
          {
            class: _normalizeClass3($setup.innerWrapperClasses)
          },
          [
            _createCommentVNode3(' \u5DE5\u5177\u680F '),
            $setup.showToolbar
              ? (_openBlock3(),
                _createElementBlock3(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass3($setup.ns.e('toolbar'))
                  },
                  [
                    _renderSlot3(_ctx.$slots, 'toolbar', {}, () => [
                      _createElementVNode3(
                        'div',
                        {
                          class: _normalizeClass3($setup.ns.e('toolbar-left'))
                        },
                        [
                          _renderSlot3(_ctx.$slots, 'toolbar-left-prefix'),
                          _renderSlot3(_ctx.$slots, 'toolbar-left'),
                          _renderSlot3(_ctx.$slots, 'toolbar-left-suffix')
                        ],
                        2
                        /* CLASS */
                      ),
                      _createElementVNode3(
                        'div',
                        {
                          class: _normalizeClass3($setup.ns.e('toolbar-right'))
                        },
                        [
                          _renderSlot3(_ctx.$slots, 'toolbar-right-prefix'),
                          _renderSlot3(_ctx.$slots, 'toolbar-right'),
                          _renderSlot3(_ctx.$slots, 'toolbar-right-suffix')
                        ],
                        2
                        /* CLASS */
                      )
                    ])
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode3('v-if', true),
            _createCommentVNode3(' \u8868\u5934 '),
            _ctx.showHeader
              ? (_openBlock3(),
                _createElementBlock3(
                  'div',
                  {
                    key: 1,
                    ref: 'headerRef',
                    class: _normalizeClass3($setup.ns.e('header-wrapper'))
                  },
                  [
                    _createElementVNode3(
                      'table',
                      {
                        class: _normalizeClass3($setup.ns.e('header')),
                        style: _normalizeStyle3({
                          tableLayout: _ctx.tableLayout
                        })
                      },
                      [
                        _createElementVNode3('colgroup', null, [
                          $setup.selectionConfig
                            ? (_openBlock3(),
                              _createElementBlock3(
                                'col',
                                {
                                  key: 0,
                                  style: _normalizeStyle3({
                                    width: $setup.formatSize(
                                      $setup.selectionConfig.columnWidth || 50
                                    )
                                  })
                                },
                                null,
                                4
                                /* STYLE */
                              ))
                            : _createCommentVNode3('v-if', true),
                          _ctx.expandConfig
                            ? (_openBlock3(),
                              _createElementBlock3(
                                'col',
                                {
                                  key: 1,
                                  style: _normalizeStyle3({
                                    width: $setup.formatSize(_ctx.expandConfig.columnWidth || 50)
                                  })
                                },
                                null,
                                4
                                /* STYLE */
                              ))
                            : _createCommentVNode3('v-if', true),
                          _ctx.showIndex
                            ? (_openBlock3(),
                              _createElementBlock3(
                                'col',
                                {
                                  key: 2,
                                  style: _normalizeStyle3({
                                    width: $setup.formatSize(
                                      ((_a2 = _ctx.indexConfig) == null ? void 0 : _a2.width) || 50
                                    )
                                  })
                                },
                                null,
                                4
                                /* STYLE */
                              ))
                            : _createCommentVNode3('v-if', true),
                          (_openBlock3(true),
                          _createElementBlock3(
                            _Fragment2,
                            null,
                            _renderList2($setup.visibleColumns, (column) => {
                              return (
                                _openBlock3(),
                                _createElementBlock3(
                                  'col',
                                  {
                                    key: column.prop || column.key,
                                    style: _normalizeStyle3({
                                      width: $setup.formatSize(column.width)
                                    })
                                  },
                                  null,
                                  4
                                  /* STYLE */
                                )
                              )
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        _createElementVNode3('thead', null, [
                          _createCommentVNode3(' \u591A\u7EA7\u8868\u5934 '),
                          $setup.headerRows.length > 0
                            ? (_openBlock3(true),
                              _createElementBlock3(
                                _Fragment2,
                                { key: 0 },
                                _renderList2($setup.headerRows, (hRow, rowIdx) => {
                                  var _a22, _b2
                                  return (
                                    _openBlock3(),
                                    _createElementBlock3(
                                      'tr',
                                      {
                                        key: rowIdx,
                                        class: _normalizeClass3($setup.ns.e('header-row'))
                                      },
                                      [
                                        _createCommentVNode3(
                                          ' \u9009\u62E9\u5217\uFF08\u4EC5\u7B2C\u4E00\u884C\uFF0C\u8DE8\u6240\u6709\u884C\uFF09 '
                                        ),
                                        $setup.selectionConfig && rowIdx === 0
                                          ? (_openBlock3(),
                                            _createElementBlock3(
                                              'th',
                                              {
                                                key: 0,
                                                rowspan: $setup.columnDepth,
                                                class: _normalizeClass3([
                                                  $setup.ns.e('header-cell'),
                                                  $setup.isAnyColumnFixedLeft ? 'is-fixed-left' : ''
                                                ]),
                                                style: _normalizeStyle3(
                                                  __spreadValues8(
                                                    {
                                                      width: $setup.formatSize(
                                                        $setup.selectionConfig.columnWidth || 50
                                                      )
                                                    },
                                                    $setup.getSpecialFixedStyle('selection')
                                                  )
                                                )
                                              },
                                              [
                                                _createElementVNode3(
                                                  'div',
                                                  {
                                                    class: _normalizeClass3(
                                                      $setup.ns.e('selection-cell')
                                                    )
                                                  },
                                                  [
                                                    $setup.selectionType === 'checkbox' &&
                                                    $setup.selectionConfig.showSelectAll !== false
                                                      ? (_openBlock3(),
                                                        _createElementBlock3(
                                                          'input',
                                                          {
                                                            key: 0,
                                                            type: 'checkbox',
                                                            checked: $setup.isAllSelected,
                                                            indeterminate: $setup.isIndeterminate,
                                                            onChange:
                                                              _cache[0] ||
                                                              (_cache[0] = (...args) =>
                                                                $setup.toggleAllSelection &&
                                                                $setup.toggleAllSelection(...args))
                                                          },
                                                          null,
                                                          40,
                                                          _hoisted_23
                                                        ))
                                                      : _createCommentVNode3('v-if', true)
                                                  ],
                                                  2
                                                  /* CLASS */
                                                )
                                              ],
                                              14,
                                              _hoisted_13
                                            ))
                                          : _createCommentVNode3('v-if', true),
                                        _createCommentVNode3(
                                          ' \u5C55\u5F00\u5217\uFF08\u4EC5\u7B2C\u4E00\u884C\uFF0C\u8DE8\u6240\u6709\u884C\uFF09 '
                                        ),
                                        _ctx.expandConfig && rowIdx === 0
                                          ? (_openBlock3(),
                                            _createElementBlock3(
                                              'th',
                                              {
                                                key: 1,
                                                rowspan: $setup.columnDepth,
                                                class: _normalizeClass3([
                                                  $setup.ns.e('header-cell'),
                                                  $setup.isAnyColumnFixedLeft ? 'is-fixed-left' : ''
                                                ]),
                                                style: _normalizeStyle3(
                                                  __spreadValues8(
                                                    {
                                                      width: $setup.formatSize(
                                                        _ctx.expandConfig.columnWidth || 50
                                                      )
                                                    },
                                                    $setup.getSpecialFixedStyle('expand')
                                                  )
                                                )
                                              },
                                              [
                                                _createElementVNode3(
                                                  'div',
                                                  {
                                                    class: _normalizeClass3(
                                                      $setup.ns.e('expand-cell')
                                                    )
                                                  },
                                                  null,
                                                  2
                                                  /* CLASS */
                                                )
                                              ],
                                              14,
                                              _hoisted_33
                                            ))
                                          : _createCommentVNode3('v-if', true),
                                        _createCommentVNode3(
                                          ' \u5E8F\u53F7\u5217\uFF08\u4EC5\u7B2C\u4E00\u884C\uFF0C\u8DE8\u6240\u6709\u884C\uFF09 '
                                        ),
                                        _ctx.showIndex && rowIdx === 0
                                          ? (_openBlock3(),
                                            _createElementBlock3(
                                              'th',
                                              {
                                                key: 2,
                                                rowspan: $setup.columnDepth,
                                                class: _normalizeClass3([
                                                  $setup.ns.e('header-cell'),
                                                  $setup.isAnyColumnFixedLeft ? 'is-fixed-left' : ''
                                                ]),
                                                style: _normalizeStyle3(
                                                  __spreadValues8(
                                                    {
                                                      width: $setup.formatSize(
                                                        ((_a22 = _ctx.indexConfig) == null
                                                          ? void 0
                                                          : _a22.width) || 50
                                                      )
                                                    },
                                                    $setup.getSpecialFixedStyle('index')
                                                  )
                                                )
                                              },
                                              [
                                                _createElementVNode3(
                                                  'div',
                                                  {
                                                    class: _normalizeClass3(
                                                      $setup.ns.e('index-cell')
                                                    )
                                                  },
                                                  _toDisplayString3(
                                                    ((_b2 = _ctx.indexConfig) == null
                                                      ? void 0
                                                      : _b2.label) || $setup.t('table.index')
                                                  ),
                                                  3
                                                  /* TEXT, CLASS */
                                                )
                                              ],
                                              14,
                                              _hoisted_42
                                            ))
                                          : _createCommentVNode3('v-if', true),
                                        _createCommentVNode3(' \u6570\u636E\u5217 '),
                                        (_openBlock3(true),
                                        _createElementBlock3(
                                          _Fragment2,
                                          null,
                                          _renderList2(hRow, (cell, cellIdx) => {
                                            var _a3, _b3, _c2
                                            return (
                                              _openBlock3(),
                                              _createElementBlock3(
                                                'th',
                                                {
                                                  key:
                                                    cell.column.prop || cell.column.key || cellIdx,
                                                  colspan: cell.colspan > 1 ? cell.colspan : void 0,
                                                  rowspan: cell.rowspan > 1 ? cell.rowspan : void 0,
                                                  class: _normalizeClass3([
                                                    $setup.ns.e('header-cell'),
                                                    cell.column.headerClassName,
                                                    cell.column.headerAlign
                                                      ? `is-${cell.column.headerAlign}`
                                                      : '',
                                                    cell.column.sortable ? 'is-sortable' : '',
                                                    cell.column.fixed
                                                      ? `is-fixed-${cell.column.fixed === true ? 'left' : cell.column.fixed}`
                                                      : '',
                                                    (
                                                      (_a3 = cell.column.children) == null
                                                        ? void 0
                                                        : _a3.length
                                                    )
                                                      ? 'is-group'
                                                      : '',
                                                    $setup.isColumnDraggable(cell.column)
                                                      ? 'is-column-draggable'
                                                      : ''
                                                  ]),
                                                  style: _normalizeStyle3(
                                                    __spreadProps4(
                                                      __spreadValues8({}, cell.column.headerStyle),
                                                      {
                                                        textAlign:
                                                          cell.column.headerAlign ||
                                                          cell.column.align ||
                                                          ((
                                                            (_b3 = cell.column.children) == null
                                                              ? void 0
                                                              : _b3.length
                                                          )
                                                            ? 'center'
                                                            : 'left')
                                                      }
                                                    )
                                                  ),
                                                  onClick: ($event) =>
                                                    $setup.handleHeaderClick(cell.column, $event)
                                                },
                                                [
                                                  _createElementVNode3(
                                                    'div',
                                                    {
                                                      class: _normalizeClass3(
                                                        $setup.ns.e('cell-content')
                                                      )
                                                    },
                                                    [
                                                      _createCommentVNode3(
                                                        ' \u8868\u5934\u524D\u7F00\u56FE\u6807 '
                                                      ),
                                                      cell.column.headerPrefixIcon &&
                                                      typeof cell.column.headerPrefixIcon !==
                                                        'string'
                                                        ? (_openBlock3(),
                                                          _createBlock3(
                                                            _resolveDynamicComponent(
                                                              cell.column.headerPrefixIcon
                                                            ),
                                                            {
                                                              key: 0,
                                                              class: _normalizeClass3(
                                                                $setup.ns.e('header-icon-prefix')
                                                              )
                                                            },
                                                            null,
                                                            8,
                                                            ['class']
                                                          ))
                                                        : cell.column.headerPrefixIcon
                                                          ? (_openBlock3(),
                                                            _createElementBlock3(
                                                              'span',
                                                              {
                                                                key: 1,
                                                                class: _normalizeClass3(
                                                                  $setup.ns.e('header-icon-prefix')
                                                                )
                                                              },
                                                              _toDisplayString3(
                                                                cell.column.headerPrefixIcon
                                                              ),
                                                              3
                                                              /* TEXT, CLASS */
                                                            ))
                                                          : _createCommentVNode3('v-if', true),
                                                      cell.column.prop &&
                                                      _ctx.$slots['header-' + cell.column.prop]
                                                        ? _renderSlot3(
                                                            _ctx.$slots,
                                                            'header-' + cell.column.prop,
                                                            {
                                                              key: 2,
                                                              column: cell.column,
                                                              columnIndex: cellIdx
                                                            }
                                                          )
                                                        : cell.column.headerRender
                                                          ? (_openBlock3(),
                                                            _createBlock3(
                                                              $setup['RenderColumn'],
                                                              {
                                                                key: 3,
                                                                render: cell.column.headerRender,
                                                                params: {
                                                                  column: cell.column,
                                                                  columnIndex: cellIdx
                                                                }
                                                              },
                                                              null,
                                                              8,
                                                              ['render', 'params']
                                                            ))
                                                          : (_openBlock3(),
                                                            _createElementBlock3(
                                                              _Fragment2,
                                                              { key: 4 },
                                                              [
                                                                _createTextVNode2(
                                                                  _toDisplayString3(
                                                                    cell.column.label
                                                                  ),
                                                                  1
                                                                  /* TEXT */
                                                                )
                                                              ],
                                                              64
                                                              /* STABLE_FRAGMENT */
                                                            )),
                                                      _createCommentVNode3(
                                                        ' \u8868\u5934\u540E\u7F00\u56FE\u6807 '
                                                      ),
                                                      cell.column.headerSuffixIcon &&
                                                      typeof cell.column.headerSuffixIcon !==
                                                        'string'
                                                        ? (_openBlock3(),
                                                          _createBlock3(
                                                            _resolveDynamicComponent(
                                                              cell.column.headerSuffixIcon
                                                            ),
                                                            {
                                                              key: 5,
                                                              class: _normalizeClass3(
                                                                $setup.ns.e('header-icon-suffix')
                                                              )
                                                            },
                                                            null,
                                                            8,
                                                            ['class']
                                                          ))
                                                        : cell.column.headerSuffixIcon
                                                          ? (_openBlock3(),
                                                            _createElementBlock3(
                                                              'span',
                                                              {
                                                                key: 6,
                                                                class: _normalizeClass3(
                                                                  $setup.ns.e('header-icon-suffix')
                                                                )
                                                              },
                                                              _toDisplayString3(
                                                                cell.column.headerSuffixIcon
                                                              ),
                                                              3
                                                              /* TEXT, CLASS */
                                                            ))
                                                          : _createCommentVNode3('v-if', true),
                                                      cell.column.sortable
                                                        ? (_openBlock3(),
                                                          _createElementBlock3(
                                                            'span',
                                                            {
                                                              key: 7,
                                                              class: _normalizeClass3(
                                                                $setup.ns.e('sort-icon')
                                                              )
                                                            },
                                                            [
                                                              _createElementVNode3(
                                                                'span',
                                                                {
                                                                  class: _normalizeClass3([
                                                                    'sort-caret',
                                                                    'ascending',
                                                                    $setup.getSortOrder(
                                                                      cell.column
                                                                    ) === 'asc'
                                                                      ? 'is-active'
                                                                      : ''
                                                                  ])
                                                                },
                                                                null,
                                                                2
                                                                /* CLASS */
                                                              ),
                                                              _createElementVNode3(
                                                                'span',
                                                                {
                                                                  class: _normalizeClass3([
                                                                    'sort-caret',
                                                                    'descending',
                                                                    $setup.getSortOrder(
                                                                      cell.column
                                                                    ) === 'desc'
                                                                      ? 'is-active'
                                                                      : ''
                                                                  ])
                                                                },
                                                                null,
                                                                2
                                                                /* CLASS */
                                                              )
                                                            ],
                                                            2
                                                            /* CLASS */
                                                          ))
                                                        : _createCommentVNode3('v-if', true)
                                                    ],
                                                    2
                                                    /* CLASS */
                                                  ),
                                                  _createCommentVNode3(
                                                    ' \u5217\u5BBD\u8C03\u6574\u624B\u67C4\uFF08\u4EC5\u53F6\u5B50\u5217\uFF09 '
                                                  ),
                                                  !((_c2 = cell.column.children) == null
                                                    ? void 0
                                                    : _c2.length) &&
                                                  $setup.isColumnResizable(cell.column)
                                                    ? (_openBlock3(),
                                                      _createElementBlock3(
                                                        'span',
                                                        {
                                                          key: 0,
                                                          class: _normalizeClass3(
                                                            $setup.ns.e('resize-handle')
                                                          ),
                                                          onPointerdown: _withModifiers(
                                                            ($event) =>
                                                              $setup.handleResizeStart(
                                                                $event,
                                                                cell.column,
                                                                $event.currentTarget.parentElement
                                                              ),
                                                            ['stop']
                                                          )
                                                        },
                                                        null,
                                                        42,
                                                        _hoisted_62
                                                      ))
                                                    : _createCommentVNode3('v-if', true)
                                                ],
                                                14,
                                                _hoisted_52
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
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            : (_openBlock3(),
                              _createElementBlock3(
                                _Fragment2,
                                { key: 1 },
                                [
                                  _createCommentVNode3(
                                    ' \u5355\u5C42\u8868\u5934\uFF08\u539F\u6709\u903B\u8F91\uFF09 '
                                  ),
                                  _createElementVNode3(
                                    'tr',
                                    {
                                      class: _normalizeClass3($setup.ns.e('header-row'))
                                    },
                                    [
                                      _createCommentVNode3(' \u9009\u62E9\u5217 '),
                                      $setup.selectionConfig
                                        ? (_openBlock3(),
                                          _createElementBlock3(
                                            'th',
                                            {
                                              key: 0,
                                              class: _normalizeClass3([
                                                $setup.ns.e('header-cell'),
                                                $setup.isAnyColumnFixedLeft ? 'is-fixed-left' : ''
                                              ]),
                                              style: _normalizeStyle3(
                                                __spreadValues8(
                                                  {
                                                    width: $setup.formatSize(
                                                      $setup.selectionConfig.columnWidth || 50
                                                    )
                                                  },
                                                  $setup.getSpecialFixedStyle('selection')
                                                )
                                              )
                                            },
                                            [
                                              _createElementVNode3(
                                                'div',
                                                {
                                                  class: _normalizeClass3(
                                                    $setup.ns.e('selection-cell')
                                                  )
                                                },
                                                [
                                                  $setup.selectionType === 'checkbox' &&
                                                  $setup.selectionConfig.showSelectAll !== false
                                                    ? (_openBlock3(),
                                                      _createElementBlock3(
                                                        'input',
                                                        {
                                                          key: 0,
                                                          type: 'checkbox',
                                                          checked: $setup.isAllSelected,
                                                          indeterminate: $setup.isIndeterminate,
                                                          onChange:
                                                            _cache[1] ||
                                                            (_cache[1] = (...args) =>
                                                              $setup.toggleAllSelection &&
                                                              $setup.toggleAllSelection(...args))
                                                        },
                                                        null,
                                                        40,
                                                        _hoisted_72
                                                      ))
                                                    : _createCommentVNode3('v-if', true)
                                                ],
                                                2
                                                /* CLASS */
                                              )
                                            ],
                                            6
                                            /* CLASS, STYLE */
                                          ))
                                        : _createCommentVNode3('v-if', true),
                                      _createCommentVNode3(' \u5C55\u5F00\u5217 '),
                                      _ctx.expandConfig
                                        ? (_openBlock3(),
                                          _createElementBlock3(
                                            'th',
                                            {
                                              key: 1,
                                              class: _normalizeClass3([
                                                $setup.ns.e('header-cell'),
                                                $setup.isAnyColumnFixedLeft ? 'is-fixed-left' : ''
                                              ]),
                                              style: _normalizeStyle3(
                                                __spreadValues8(
                                                  {
                                                    width: $setup.formatSize(
                                                      _ctx.expandConfig.columnWidth || 50
                                                    )
                                                  },
                                                  $setup.getSpecialFixedStyle('expand')
                                                )
                                              )
                                            },
                                            [
                                              _createElementVNode3(
                                                'div',
                                                {
                                                  class: _normalizeClass3(
                                                    $setup.ns.e('expand-cell')
                                                  )
                                                },
                                                null,
                                                2
                                                /* CLASS */
                                              )
                                            ],
                                            6
                                            /* CLASS, STYLE */
                                          ))
                                        : _createCommentVNode3('v-if', true),
                                      _createCommentVNode3(' \u5E8F\u53F7\u5217 '),
                                      _ctx.showIndex
                                        ? (_openBlock3(),
                                          _createElementBlock3(
                                            'th',
                                            {
                                              key: 2,
                                              class: _normalizeClass3([
                                                $setup.ns.e('header-cell'),
                                                $setup.isAnyColumnFixedLeft ? 'is-fixed-left' : ''
                                              ]),
                                              style: _normalizeStyle3(
                                                __spreadValues8(
                                                  {
                                                    width: $setup.formatSize(
                                                      ((_b = _ctx.indexConfig) == null
                                                        ? void 0
                                                        : _b.width) || 50
                                                    )
                                                  },
                                                  $setup.getSpecialFixedStyle('index')
                                                )
                                              )
                                            },
                                            [
                                              _createElementVNode3(
                                                'div',
                                                {
                                                  class: _normalizeClass3($setup.ns.e('index-cell'))
                                                },
                                                _toDisplayString3(
                                                  ((_c = _ctx.indexConfig) == null
                                                    ? void 0
                                                    : _c.label) || $setup.t('table.index')
                                                ),
                                                3
                                                /* TEXT, CLASS */
                                              )
                                            ],
                                            6
                                            /* CLASS, STYLE */
                                          ))
                                        : _createCommentVNode3('v-if', true),
                                      _createCommentVNode3(' \u6570\u636E\u5217 '),
                                      (_openBlock3(true),
                                      _createElementBlock3(
                                        _Fragment2,
                                        null,
                                        _renderList2(
                                          $setup.visibleColumns,
                                          (column, columnIndex) => {
                                            return (
                                              _openBlock3(),
                                              _createElementBlock3(
                                                'th',
                                                _mergeProps(
                                                  {
                                                    key: column.prop || column.key || columnIndex,
                                                    class: [
                                                      $setup.ns.e('header-cell'),
                                                      column.headerClassName,
                                                      column.headerAlign
                                                        ? `is-${column.headerAlign}`
                                                        : '',
                                                      column.sortable ? 'is-sortable' : '',
                                                      column.fixed
                                                        ? `is-fixed-${column.fixed === true ? 'left' : column.fixed}`
                                                        : '',
                                                      $setup.isColumnDragEnabled
                                                        ? $setup.getHeaderDragClass(columnIndex)
                                                        : '',
                                                      $setup.isColumnDraggable(column)
                                                        ? 'is-column-draggable'
                                                        : ''
                                                    ],
                                                    style: __spreadProps4(
                                                      __spreadValues8(
                                                        __spreadValues8({}, column.headerStyle),
                                                        $setup.getFixedStyle(column, columnIndex)
                                                      ),
                                                      {
                                                        width: $setup.formatSize(column.width),
                                                        textAlign:
                                                          column.headerAlign ||
                                                          column.align ||
                                                          'left'
                                                      }
                                                    )
                                                  },
                                                  { ref_for: true },
                                                  $setup.getHeaderDragAttrs(column, columnIndex),
                                                  {
                                                    onClick: ($event) =>
                                                      $setup.handleHeaderClick(column, $event)
                                                  }
                                                ),
                                                [
                                                  _createElementVNode3(
                                                    'div',
                                                    {
                                                      class: _normalizeClass3(
                                                        $setup.ns.e('cell-content')
                                                      )
                                                    },
                                                    [
                                                      _createCommentVNode3(
                                                        ' \u8868\u5934\u524D\u7F00\u56FE\u6807 '
                                                      ),
                                                      column.headerPrefixIcon &&
                                                      typeof column.headerPrefixIcon !== 'string'
                                                        ? (_openBlock3(),
                                                          _createBlock3(
                                                            _resolveDynamicComponent(
                                                              column.headerPrefixIcon
                                                            ),
                                                            {
                                                              key: 0,
                                                              class: _normalizeClass3(
                                                                $setup.ns.e('header-icon-prefix')
                                                              )
                                                            },
                                                            null,
                                                            8,
                                                            ['class']
                                                          ))
                                                        : column.headerPrefixIcon
                                                          ? (_openBlock3(),
                                                            _createElementBlock3(
                                                              'span',
                                                              {
                                                                key: 1,
                                                                class: _normalizeClass3(
                                                                  $setup.ns.e('header-icon-prefix')
                                                                )
                                                              },
                                                              _toDisplayString3(
                                                                column.headerPrefixIcon
                                                              ),
                                                              3
                                                              /* TEXT, CLASS */
                                                            ))
                                                          : _createCommentVNode3('v-if', true),
                                                      _createCommentVNode3(
                                                        ' \u81EA\u5B9A\u4E49\u8868\u5934 '
                                                      ),
                                                      column.prop &&
                                                      _ctx.$slots['header-' + column.prop]
                                                        ? _renderSlot3(
                                                            _ctx.$slots,
                                                            'header-' + column.prop,
                                                            {
                                                              key: 2,
                                                              column,
                                                              columnIndex
                                                            }
                                                          )
                                                        : column.headerRender
                                                          ? (_openBlock3(),
                                                            _createBlock3(
                                                              $setup['RenderColumn'],
                                                              {
                                                                key: 3,
                                                                render: column.headerRender,
                                                                params: {
                                                                  column,
                                                                  columnIndex
                                                                }
                                                              },
                                                              null,
                                                              8,
                                                              ['render', 'params']
                                                            ))
                                                          : (_openBlock3(),
                                                            _createElementBlock3(
                                                              _Fragment2,
                                                              { key: 4 },
                                                              [
                                                                _createTextVNode2(
                                                                  _toDisplayString3(column.label),
                                                                  1
                                                                  /* TEXT */
                                                                )
                                                              ],
                                                              64
                                                              /* STABLE_FRAGMENT */
                                                            )),
                                                      _createCommentVNode3(
                                                        ' \u8868\u5934\u540E\u7F00\u56FE\u6807 '
                                                      ),
                                                      column.headerSuffixIcon &&
                                                      typeof column.headerSuffixIcon !== 'string'
                                                        ? (_openBlock3(),
                                                          _createBlock3(
                                                            _resolveDynamicComponent(
                                                              column.headerSuffixIcon
                                                            ),
                                                            {
                                                              key: 5,
                                                              class: _normalizeClass3(
                                                                $setup.ns.e('header-icon-suffix')
                                                              )
                                                            },
                                                            null,
                                                            8,
                                                            ['class']
                                                          ))
                                                        : column.headerSuffixIcon
                                                          ? (_openBlock3(),
                                                            _createElementBlock3(
                                                              'span',
                                                              {
                                                                key: 6,
                                                                class: _normalizeClass3(
                                                                  $setup.ns.e('header-icon-suffix')
                                                                )
                                                              },
                                                              _toDisplayString3(
                                                                column.headerSuffixIcon
                                                              ),
                                                              3
                                                              /* TEXT, CLASS */
                                                            ))
                                                          : _createCommentVNode3('v-if', true),
                                                      _createCommentVNode3(
                                                        ' \u6392\u5E8F\u56FE\u6807 '
                                                      ),
                                                      column.sortable
                                                        ? (_openBlock3(),
                                                          _createElementBlock3(
                                                            'span',
                                                            {
                                                              key: 7,
                                                              class: _normalizeClass3(
                                                                $setup.ns.e('sort-icon')
                                                              )
                                                            },
                                                            [
                                                              _createElementVNode3(
                                                                'span',
                                                                {
                                                                  class: _normalizeClass3([
                                                                    'sort-caret',
                                                                    'ascending',
                                                                    $setup.getSortOrder(column) ===
                                                                    'asc'
                                                                      ? 'is-active'
                                                                      : ''
                                                                  ])
                                                                },
                                                                null,
                                                                2
                                                                /* CLASS */
                                                              ),
                                                              _createElementVNode3(
                                                                'span',
                                                                {
                                                                  class: _normalizeClass3([
                                                                    'sort-caret',
                                                                    'descending',
                                                                    $setup.getSortOrder(column) ===
                                                                    'desc'
                                                                      ? 'is-active'
                                                                      : ''
                                                                  ])
                                                                },
                                                                null,
                                                                2
                                                                /* CLASS */
                                                              )
                                                            ],
                                                            2
                                                            /* CLASS */
                                                          ))
                                                        : _createCommentVNode3('v-if', true)
                                                    ],
                                                    2
                                                    /* CLASS */
                                                  ),
                                                  _createCommentVNode3(
                                                    ' \u5217\u5BBD\u8C03\u6574\u624B\u67C4 '
                                                  ),
                                                  $setup.isColumnResizable(column)
                                                    ? (_openBlock3(),
                                                      _createElementBlock3(
                                                        'span',
                                                        {
                                                          key: 0,
                                                          class: _normalizeClass3(
                                                            $setup.ns.e('resize-handle')
                                                          ),
                                                          onPointerdown: _withModifiers(
                                                            ($event) =>
                                                              $setup.handleResizeStart(
                                                                $event,
                                                                column,
                                                                $event.currentTarget.parentElement
                                                              ),
                                                            ['stop']
                                                          )
                                                        },
                                                        null,
                                                        42,
                                                        _hoisted_9
                                                      ))
                                                    : _createCommentVNode3('v-if', true)
                                                ],
                                                16,
                                                _hoisted_8
                                              )
                                            )
                                          }
                                        ),
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
                        ])
                      ],
                      6
                      /* CLASS, STYLE */
                    )
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode3('v-if', true),
            _createCommentVNode3(' \u8868\u4F53 '),
            _createElementVNode3(
              'div',
              {
                ref: 'bodyRef',
                class: _normalizeClass3([
                  $setup.ns.e('body-wrapper'),
                  $setup.isVirtual ? $setup.ns.em('body-wrapper', 'virtual') : ''
                ]),
                style: _normalizeStyle3($setup.bodyStyle),
                onScroll:
                  _cache[3] ||
                  (_cache[3] = (...args) => $setup.handleScroll && $setup.handleScroll(...args))
              },
              [
                _createCommentVNode3(
                  ' \u865A\u62DF\u6EDA\u52A8\uFF1A\u5355\u4E00 phantom div \u6491\u8D77\u6EDA\u52A8\u6761\u9AD8\u5EA6 '
                ),
                $setup.isVirtual
                  ? (_openBlock3(),
                    _createElementBlock3(
                      'div',
                      {
                        key: 0,
                        class: _normalizeClass3($setup.ns.e('virtual-phantom')),
                        style: _normalizeStyle3({
                          height: `${$setup.totalHeight}px`
                        })
                      },
                      null,
                      6
                      /* CLASS, STYLE */
                    ))
                  : _createCommentVNode3('v-if', true),
                _createCommentVNode3(' \u7A7A\u6570\u636E '),
                $setup.tableData.length === 0
                  ? (_openBlock3(),
                    _createElementBlock3(
                      'div',
                      {
                        key: 1,
                        class: _normalizeClass3($setup.ns.e('empty'))
                      },
                      [
                        _renderSlot3(_ctx.$slots, 'empty', {}, () => {
                          var _a22, _b2, _c2
                          return [
                            _createElementVNode3(
                              'div',
                              {
                                class: _normalizeClass3($setup.ns.e('empty-content'))
                              },
                              [
                                ((_a22 = _ctx.emptyConfig) == null ? void 0 : _a22.render)
                                  ? (_openBlock3(),
                                    _createBlock3(
                                      _resolveDynamicComponent(_ctx.emptyConfig.render()),
                                      { key: 0 }
                                    ))
                                  : (_openBlock3(),
                                    _createElementBlock3(
                                      _Fragment2,
                                      { key: 1 },
                                      [
                                        ((_b2 = _ctx.emptyConfig) == null ? void 0 : _b2.image)
                                          ? (_openBlock3(),
                                            _createElementBlock3(
                                              'div',
                                              {
                                                key: 0,
                                                class: _normalizeClass3($setup.ns.e('empty-image'))
                                              },
                                              [
                                                _createElementVNode3(
                                                  'img',
                                                  {
                                                    src: _ctx.emptyConfig.image,
                                                    alt: $setup.t('common.noData')
                                                  },
                                                  null,
                                                  8,
                                                  _hoisted_10
                                                )
                                              ],
                                              2
                                              /* CLASS */
                                            ))
                                          : _createCommentVNode3('v-if', true),
                                        _createElementVNode3(
                                          'div',
                                          {
                                            class: _normalizeClass3($setup.ns.e('empty-text'))
                                          },
                                          _toDisplayString3(
                                            ((_c2 = _ctx.emptyConfig) == null
                                              ? void 0
                                              : _c2.description) ||
                                              _ctx.emptyText ||
                                              $setup.t('table.emptyText')
                                          ),
                                          3
                                          /* TEXT, CLASS */
                                        )
                                      ],
                                      64
                                      /* STABLE_FRAGMENT */
                                    ))
                              ],
                              2
                              /* CLASS */
                            )
                          ]
                        })
                      ],
                      2
                      /* CLASS */
                    ))
                  : (_openBlock3(),
                    _createElementBlock3(
                      _Fragment2,
                      { key: 2 },
                      [
                        _createCommentVNode3(
                          ' \u6570\u636E\u8868\u683C\uFF08\u865A\u62DF\u6A21\u5F0F\u4E0B\u901A\u8FC7 transform \u5B9A\u4F4D\uFF0CGPU \u52A0\u901F\u65E0\u91CD\u6392\uFF09 '
                        ),
                        _createElementVNode3(
                          'table',
                          {
                            class: _normalizeClass3([
                              $setup.ns.e('body'),
                              $setup.isVirtual ? $setup.ns.em('body', 'virtual') : ''
                            ]),
                            style: _normalizeStyle3(
                              __spreadValues8(
                                {
                                  tableLayout: _ctx.tableLayout
                                },
                                $setup.isVirtual
                                  ? {
                                      transform: `translate3d(0, ${$setup.offsetTop}px, 0)`
                                    }
                                  : {}
                              )
                            )
                          },
                          [
                            _createElementVNode3('colgroup', null, [
                              $setup.selectionConfig
                                ? (_openBlock3(),
                                  _createElementBlock3(
                                    'col',
                                    {
                                      key: 0,
                                      style: _normalizeStyle3({
                                        width: $setup.formatSize(
                                          $setup.selectionConfig.columnWidth || 50
                                        )
                                      })
                                    },
                                    null,
                                    4
                                    /* STYLE */
                                  ))
                                : _createCommentVNode3('v-if', true),
                              _ctx.expandConfig
                                ? (_openBlock3(),
                                  _createElementBlock3(
                                    'col',
                                    {
                                      key: 1,
                                      style: _normalizeStyle3({
                                        width: $setup.formatSize(
                                          _ctx.expandConfig.columnWidth || 50
                                        )
                                      })
                                    },
                                    null,
                                    4
                                    /* STYLE */
                                  ))
                                : _createCommentVNode3('v-if', true),
                              _ctx.showIndex
                                ? (_openBlock3(),
                                  _createElementBlock3(
                                    'col',
                                    {
                                      key: 2,
                                      style: _normalizeStyle3({
                                        width: $setup.formatSize(
                                          ((_d = _ctx.indexConfig) == null ? void 0 : _d.width) ||
                                            50
                                        )
                                      })
                                    },
                                    null,
                                    4
                                    /* STYLE */
                                  ))
                                : _createCommentVNode3('v-if', true),
                              (_openBlock3(true),
                              _createElementBlock3(
                                _Fragment2,
                                null,
                                _renderList2($setup.visibleColumns, (column) => {
                                  return (
                                    _openBlock3(),
                                    _createElementBlock3(
                                      'col',
                                      {
                                        key: column.prop || column.key,
                                        style: _normalizeStyle3({
                                          width: $setup.formatSize(column.width)
                                        })
                                      },
                                      null,
                                      4
                                      /* STYLE */
                                    )
                                  )
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ]),
                            _createElementVNode3('tbody', null, [
                              (_openBlock3(true),
                              _createElementBlock3(
                                _Fragment2,
                                null,
                                _renderList2($setup.renderData, (row, rowIndex) => {
                                  var _a22
                                  return (
                                    _openBlock3(),
                                    _createElementBlock3(
                                      _Fragment2,
                                      {
                                        key: $setup.getRowKeyFn(row)
                                      },
                                      [
                                        _createElementVNode3(
                                          'tr',
                                          _mergeProps(
                                            {
                                              class: $setup.getRowClass(row, rowIndex),
                                              style: $setup.getRowStyle(row, rowIndex)
                                            },
                                            { ref_for: true },
                                            $setup.getRowDragAttrs(rowIndex),
                                            {
                                              onClick: ($event) =>
                                                $setup.handleRowClick(
                                                  row,
                                                  $setup.visibleColumns[0],
                                                  $event
                                                ),
                                              onDblclick: ($event) =>
                                                $setup.handleRowDblclick(
                                                  row,
                                                  $setup.visibleColumns[0],
                                                  $event
                                                )
                                            }
                                          ),
                                          [
                                            _createCommentVNode3(' \u9009\u62E9\u5217 '),
                                            $setup.selectionConfig
                                              ? (_openBlock3(),
                                                _createElementBlock3(
                                                  'td',
                                                  {
                                                    key: 0,
                                                    class: _normalizeClass3([
                                                      $setup.ns.e('cell'),
                                                      $setup.ns.e('selection-cell'),
                                                      $setup.isAnyColumnFixedLeft
                                                        ? 'is-fixed-left'
                                                        : ''
                                                    ]),
                                                    style: _normalizeStyle3(
                                                      $setup.getSpecialFixedStyle('selection')
                                                    ),
                                                    onClick:
                                                      _cache[2] ||
                                                      (_cache[2] = _withModifiers(() => {}, [
                                                        'stop'
                                                      ]))
                                                  },
                                                  [
                                                    _createElementVNode3(
                                                      'input',
                                                      {
                                                        type:
                                                          $setup.selectionType === 'radio'
                                                            ? 'radio'
                                                            : 'checkbox',
                                                        checked: $setup.isRowSelected(row),
                                                        disabled: !$setup.isRowSelectable(
                                                          row,
                                                          rowIndex
                                                        ),
                                                        onChange: ($event) =>
                                                          $setup.toggleRowSelection(row)
                                                      },
                                                      null,
                                                      40,
                                                      _hoisted_122
                                                    )
                                                  ],
                                                  6
                                                  /* CLASS, STYLE */
                                                ))
                                              : _createCommentVNode3('v-if', true),
                                            _createCommentVNode3(' \u5C55\u5F00\u5217 '),
                                            _ctx.expandConfig
                                              ? (_openBlock3(),
                                                _createElementBlock3(
                                                  'td',
                                                  {
                                                    key: 1,
                                                    class: _normalizeClass3([
                                                      $setup.ns.e('cell'),
                                                      $setup.ns.e('expand-cell'),
                                                      $setup.isAnyColumnFixedLeft
                                                        ? 'is-fixed-left'
                                                        : ''
                                                    ]),
                                                    style: _normalizeStyle3(
                                                      $setup.getSpecialFixedStyle('expand')
                                                    ),
                                                    onClick: _withModifiers(
                                                      ($event) => $setup.handleToggleExpand(row),
                                                      ['stop']
                                                    )
                                                  },
                                                  [
                                                    _createElementVNode3(
                                                      'span',
                                                      {
                                                        class: _normalizeClass3([
                                                          $setup.ns.e('expand-icon'),
                                                          $setup.expandedRowKeys.has(
                                                            $setup.getRowKeyFn(row)
                                                          )
                                                            ? 'is-expanded'
                                                            : ''
                                                        ])
                                                      },
                                                      [
                                                        ...(_cache[6] ||
                                                          (_cache[6] = [
                                                            _createElementVNode3(
                                                              'svg',
                                                              {
                                                                viewBox: '0 0 24 24',
                                                                width: '16',
                                                                height: '16'
                                                              },
                                                              [
                                                                _createElementVNode3('path', {
                                                                  fill: 'currentColor',
                                                                  d: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'
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
                                                  14,
                                                  _hoisted_132
                                                ))
                                              : _createCommentVNode3('v-if', true),
                                            _createCommentVNode3(' \u5E8F\u53F7\u5217 '),
                                            _ctx.showIndex
                                              ? (_openBlock3(),
                                                _createElementBlock3(
                                                  'td',
                                                  {
                                                    key: 2,
                                                    class: _normalizeClass3([
                                                      $setup.ns.e('cell'),
                                                      $setup.ns.e('index-cell'),
                                                      $setup.isAnyColumnFixedLeft
                                                        ? 'is-fixed-left'
                                                        : ''
                                                    ]),
                                                    style: _normalizeStyle3(
                                                      $setup.getSpecialFixedStyle('index')
                                                    )
                                                  },
                                                  _toDisplayString3(
                                                    (
                                                      (_a22 = _ctx.indexConfig) == null
                                                        ? void 0
                                                        : _a22.method
                                                    )
                                                      ? _ctx.indexConfig.method(rowIndex)
                                                      : rowIndex + 1
                                                  ),
                                                  7
                                                  /* TEXT, CLASS, STYLE */
                                                ))
                                              : _createCommentVNode3('v-if', true),
                                            _createCommentVNode3(
                                              ' \u6570\u636E\u5217 (\u5408\u5E76\u5355\u5143\u683C\u65F6\u8DF3\u8FC7 span=0 \u7684\u5355\u5143\u683C) '
                                            ),
                                            (_openBlock3(true),
                                            _createElementBlock3(
                                              _Fragment2,
                                              null,
                                              _renderList2(
                                                $setup.visibleColumns,
                                                (column, columnIndex) => {
                                                  return (
                                                    _openBlock3(),
                                                    _createElementBlock3(
                                                      _Fragment2,
                                                      {
                                                        key:
                                                          column.prop || column.key || columnIndex
                                                      },
                                                      [
                                                        $setup.isSpanVisible(
                                                          row,
                                                          column,
                                                          rowIndex,
                                                          columnIndex
                                                        )
                                                          ? (_openBlock3(),
                                                            _createElementBlock3(
                                                              'td',
                                                              {
                                                                key: 0,
                                                                class: _normalizeClass3([
                                                                  $setup.getCellClass(
                                                                    row,
                                                                    column,
                                                                    rowIndex,
                                                                    columnIndex
                                                                  )
                                                                ]),
                                                                style: _normalizeStyle3(
                                                                  $setup.getCellStyle(
                                                                    row,
                                                                    column,
                                                                    rowIndex,
                                                                    columnIndex
                                                                  )
                                                                ),
                                                                colspan:
                                                                  $setup.calculateSpan(
                                                                    row,
                                                                    column,
                                                                    rowIndex,
                                                                    columnIndex,
                                                                    _ctx.spanMethod
                                                                  ).colspan || void 0,
                                                                rowspan:
                                                                  $setup.calculateSpan(
                                                                    row,
                                                                    column,
                                                                    rowIndex,
                                                                    columnIndex,
                                                                    _ctx.spanMethod
                                                                  ).rowspan || void 0,
                                                                'data-row-key':
                                                                  $setup.getRowKeyFn(row),
                                                                'data-prop': column.prop,
                                                                onClick: ($event) =>
                                                                  $setup.handleCellClick(
                                                                    row,
                                                                    column,
                                                                    $event.currentTarget,
                                                                    $event
                                                                  ),
                                                                onDblclick: ($event) =>
                                                                  $setup.handleCellDblclick(
                                                                    row,
                                                                    column,
                                                                    $event.currentTarget,
                                                                    $event
                                                                  )
                                                              },
                                                              [
                                                                _createElementVNode3(
                                                                  'div',
                                                                  {
                                                                    class: _normalizeClass3(
                                                                      $setup.ns.e('cell-content')
                                                                    )
                                                                  },
                                                                  [
                                                                    _createCommentVNode3(
                                                                      ' \u6811\u5F62\u7F29\u8FDB '
                                                                    ),
                                                                    _ctx.treeConfig &&
                                                                    column.treeNode
                                                                      ? (_openBlock3(),
                                                                        _createElementBlock3(
                                                                          'span',
                                                                          {
                                                                            key: 0,
                                                                            class: _normalizeClass3(
                                                                              [
                                                                                $setup.ns.e(
                                                                                  'tree-indent'
                                                                                )
                                                                              ]
                                                                            ),
                                                                            style: _normalizeStyle3(
                                                                              {
                                                                                paddingLeft: `${(row._level || 0) * (_ctx.treeConfig.indent || 16)}px`
                                                                              }
                                                                            )
                                                                          },
                                                                          [
                                                                            row._hasChildren
                                                                              ? (_openBlock3(),
                                                                                _createElementBlock3(
                                                                                  'span',
                                                                                  {
                                                                                    key: 0,
                                                                                    class:
                                                                                      _normalizeClass3(
                                                                                        [
                                                                                          $setup.ns.e(
                                                                                            'tree-icon'
                                                                                          ),
                                                                                          row._isExpanded
                                                                                            ? 'is-expanded'
                                                                                            : ''
                                                                                        ]
                                                                                      ),
                                                                                    onClick:
                                                                                      _withModifiers(
                                                                                        ($event) =>
                                                                                          $setup.handleToggleTreeExpand(
                                                                                            row
                                                                                          ),
                                                                                        ['stop']
                                                                                      )
                                                                                  },
                                                                                  [
                                                                                    ...(_cache[7] ||
                                                                                      (_cache[7] = [
                                                                                        _createElementVNode3(
                                                                                          'svg',
                                                                                          {
                                                                                            viewBox:
                                                                                              '0 0 24 24',
                                                                                            width:
                                                                                              '16',
                                                                                            height:
                                                                                              '16'
                                                                                          },
                                                                                          [
                                                                                            _createElementVNode3(
                                                                                              'path',
                                                                                              {
                                                                                                fill: 'currentColor',
                                                                                                d: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'
                                                                                              }
                                                                                            )
                                                                                          ],
                                                                                          -1
                                                                                          /* CACHED */
                                                                                        )
                                                                                      ]))
                                                                                  ],
                                                                                  10,
                                                                                  _hoisted_15
                                                                                ))
                                                                              : (_openBlock3(),
                                                                                _createElementBlock3(
                                                                                  'span',
                                                                                  {
                                                                                    key: 1,
                                                                                    class:
                                                                                      _normalizeClass3(
                                                                                        $setup.ns.e(
                                                                                          'tree-leaf-spacer'
                                                                                        )
                                                                                      )
                                                                                  },
                                                                                  null,
                                                                                  2
                                                                                  /* CLASS */
                                                                                ))
                                                                          ],
                                                                          6
                                                                          /* CLASS, STYLE */
                                                                        ))
                                                                      : _createCommentVNode3(
                                                                          'v-if',
                                                                          true
                                                                        ),
                                                                    _createCommentVNode3(
                                                                      ' \u5185\u5BB9\u5C55\u793A '
                                                                    ),
                                                                    row &&
                                                                    column.prop &&
                                                                    _ctx.$slots[column.prop]
                                                                      ? _renderSlot3(
                                                                          _ctx.$slots,
                                                                          column.prop,
                                                                          {
                                                                            key: 1,
                                                                            row,
                                                                            column,
                                                                            rowIndex,
                                                                            cellValue: column.prop
                                                                              ? row[column.prop]
                                                                              : void 0
                                                                          }
                                                                        )
                                                                      : row && column.render
                                                                        ? (_openBlock3(),
                                                                          _createBlock3(
                                                                            $setup['RenderColumn'],
                                                                            {
                                                                              key: 2,
                                                                              render: column.render,
                                                                              params: {
                                                                                row,
                                                                                column,
                                                                                rowIndex,
                                                                                cellValue:
                                                                                  column.prop
                                                                                    ? row[
                                                                                        column.prop
                                                                                      ]
                                                                                    : void 0
                                                                              }
                                                                            },
                                                                            null,
                                                                            8,
                                                                            ['render', 'params']
                                                                          ))
                                                                        : (_openBlock3(),
                                                                          _createElementBlock3(
                                                                            _Fragment2,
                                                                            { key: 3 },
                                                                            [
                                                                              column.showOverflowTooltip
                                                                                ? (_openBlock3(),
                                                                                  _createBlock3(
                                                                                    $setup[
                                                                                      'YhTooltip'
                                                                                    ],
                                                                                    {
                                                                                      key: 0,
                                                                                      content:
                                                                                        String(
                                                                                          $setup.getCellContent(
                                                                                            row,
                                                                                            column,
                                                                                            rowIndex
                                                                                          )
                                                                                        ),
                                                                                      effect:
                                                                                        typeof column.showOverflowTooltip ===
                                                                                        'object'
                                                                                          ? column
                                                                                              .showOverflowTooltip
                                                                                              .effect ||
                                                                                            _ctx.tooltipEffect
                                                                                          : _ctx.tooltipEffect,
                                                                                      placement:
                                                                                        typeof column.showOverflowTooltip ===
                                                                                        'object'
                                                                                          ? column
                                                                                              .showOverflowTooltip
                                                                                              .placement ||
                                                                                            'top'
                                                                                          : 'top'
                                                                                    },
                                                                                    {
                                                                                      default:
                                                                                        _withCtx3(
                                                                                          () => [
                                                                                            _createElementVNode3(
                                                                                              'div',
                                                                                              {
                                                                                                class:
                                                                                                  _normalizeClass3(
                                                                                                    [
                                                                                                      $setup.ns.e(
                                                                                                        'cell-text'
                                                                                                      ),
                                                                                                      $setup.ns.is(
                                                                                                        'ellipsis',
                                                                                                        true
                                                                                                      )
                                                                                                    ]
                                                                                                  )
                                                                                              },
                                                                                              _toDisplayString3(
                                                                                                $setup.getCellContent(
                                                                                                  row,
                                                                                                  column,
                                                                                                  rowIndex
                                                                                                )
                                                                                              ),
                                                                                              3
                                                                                              /* TEXT, CLASS */
                                                                                            )
                                                                                          ]
                                                                                        ),
                                                                                      _: 2
                                                                                      /* DYNAMIC */
                                                                                    },
                                                                                    1032,
                                                                                    [
                                                                                      'content',
                                                                                      'effect',
                                                                                      'placement'
                                                                                    ]
                                                                                  ))
                                                                                : (_openBlock3(),
                                                                                  _createElementBlock3(
                                                                                    _Fragment2,
                                                                                    { key: 1 },
                                                                                    [
                                                                                      _createTextVNode2(
                                                                                        _toDisplayString3(
                                                                                          $setup.getCellContent(
                                                                                            row,
                                                                                            column,
                                                                                            rowIndex
                                                                                          )
                                                                                        ),
                                                                                        1
                                                                                        /* TEXT */
                                                                                      )
                                                                                    ],
                                                                                    64
                                                                                    /* STABLE_FRAGMENT */
                                                                                  ))
                                                                            ],
                                                                            64
                                                                            /* STABLE_FRAGMENT */
                                                                          ))
                                                                  ],
                                                                  2
                                                                  /* CLASS */
                                                                )
                                                              ],
                                                              46,
                                                              _hoisted_14
                                                            ))
                                                          : _createCommentVNode3('v-if', true)
                                                      ],
                                                      64
                                                      /* STABLE_FRAGMENT */
                                                    )
                                                  )
                                                }
                                              ),
                                              128
                                              /* KEYED_FRAGMENT */
                                            ))
                                          ],
                                          16,
                                          _hoisted_11
                                        ),
                                        _createCommentVNode3(' \u5C55\u5F00\u884C\u5185\u5BB9 '),
                                        _ctx.expandConfig &&
                                        $setup.expandedRowKeys.has($setup.getRowKeyFn(row))
                                          ? (_openBlock3(),
                                            _createElementBlock3(
                                              'tr',
                                              {
                                                key: 0,
                                                class: _normalizeClass3($setup.ns.e('expanded-row'))
                                              },
                                              [
                                                _createElementVNode3(
                                                  'td',
                                                  {
                                                    colspan:
                                                      $setup.visibleColumns.length +
                                                      ($setup.selectionConfig ? 1 : 0) +
                                                      (_ctx.showIndex ? 1 : 0) +
                                                      1
                                                  },
                                                  [
                                                    _renderSlot3(
                                                      _ctx.$slots,
                                                      'expand',
                                                      {
                                                        row,
                                                        rowIndex
                                                      },
                                                      () => [
                                                        _ctx.expandConfig.render
                                                          ? (_openBlock3(),
                                                            _createBlock3(
                                                              _resolveDynamicComponent(
                                                                _ctx.expandConfig.render({
                                                                  row,
                                                                  rowIndex
                                                                })
                                                              ),
                                                              { key: 0 }
                                                            ))
                                                          : _createCommentVNode3('v-if', true)
                                                      ]
                                                    )
                                                  ],
                                                  8,
                                                  _hoisted_16
                                                )
                                              ],
                                              2
                                              /* CLASS */
                                            ))
                                          : _createCommentVNode3('v-if', true)
                                      ],
                                      64
                                      /* STABLE_FRAGMENT */
                                    )
                                  )
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ])
                          ],
                          6
                          /* CLASS, STYLE */
                        )
                      ],
                      2112
                      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                    ))
              ],
              38
              /* CLASS, STYLE, NEED_HYDRATION */
            ),
            _createCommentVNode3(' \u6C47\u603B\u884C '),
            _ctx.summaryConfig
              ? (_openBlock3(),
                _createElementBlock3(
                  'div',
                  {
                    key: 2,
                    ref: 'footerRef',
                    class: _normalizeClass3($setup.ns.e('footer-wrapper'))
                  },
                  [
                    _renderSlot3(_ctx.$slots, 'summary', {}, () => {
                      var _a22
                      return [
                        _createElementVNode3(
                          'table',
                          {
                            class: _normalizeClass3($setup.ns.e('footer')),
                            style: _normalizeStyle3({
                              tableLayout: _ctx.tableLayout
                            })
                          },
                          [
                            _createElementVNode3('colgroup', null, [
                              $setup.selectionConfig
                                ? (_openBlock3(),
                                  _createElementBlock3(
                                    'col',
                                    {
                                      key: 0,
                                      style: _normalizeStyle3({
                                        width: $setup.formatSize(
                                          $setup.selectionConfig.columnWidth || 50
                                        )
                                      })
                                    },
                                    null,
                                    4
                                    /* STYLE */
                                  ))
                                : _createCommentVNode3('v-if', true),
                              _ctx.expandConfig
                                ? (_openBlock3(),
                                  _createElementBlock3(
                                    'col',
                                    {
                                      key: 1,
                                      style: _normalizeStyle3({
                                        width: $setup.formatSize(
                                          _ctx.expandConfig.columnWidth || 50
                                        )
                                      })
                                    },
                                    null,
                                    4
                                    /* STYLE */
                                  ))
                                : _createCommentVNode3('v-if', true),
                              _ctx.showIndex
                                ? (_openBlock3(),
                                  _createElementBlock3(
                                    'col',
                                    {
                                      key: 2,
                                      style: _normalizeStyle3({
                                        width: $setup.formatSize(
                                          ((_a22 = _ctx.indexConfig) == null
                                            ? void 0
                                            : _a22.width) || 50
                                        )
                                      })
                                    },
                                    null,
                                    4
                                    /* STYLE */
                                  ))
                                : _createCommentVNode3('v-if', true),
                              (_openBlock3(true),
                              _createElementBlock3(
                                _Fragment2,
                                null,
                                _renderList2($setup.visibleColumns, (column) => {
                                  return (
                                    _openBlock3(),
                                    _createElementBlock3(
                                      'col',
                                      {
                                        key: column.prop || column.key,
                                        style: _normalizeStyle3({
                                          width: $setup.formatSize(column.width)
                                        })
                                      },
                                      null,
                                      4
                                      /* STYLE */
                                    )
                                  )
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ]),
                            _createElementVNode3('tbody', null, [
                              _createElementVNode3(
                                'tr',
                                {
                                  class: _normalizeClass3([
                                    $setup.ns.e('row'),
                                    $setup.ns.e('summary-row'),
                                    _ctx.summaryConfig.className
                                  ])
                                },
                                [
                                  _createCommentVNode3(' \u9009\u62E9\u5217\u5360\u4F4D '),
                                  $setup.selectionConfig
                                    ? (_openBlock3(),
                                      _createElementBlock3(
                                        'td',
                                        {
                                          key: 0,
                                          class: _normalizeClass3([
                                            $setup.ns.e('cell'),
                                            $setup.ns.e('selection-cell')
                                          ]),
                                          style: _normalizeStyle3(
                                            $setup.getSpecialFixedStyle('selection')
                                          )
                                        },
                                        null,
                                        6
                                        /* CLASS, STYLE */
                                      ))
                                    : _createCommentVNode3('v-if', true),
                                  _createCommentVNode3(' \u5C55\u5F00\u5217\u5360\u4F4D '),
                                  _ctx.expandConfig
                                    ? (_openBlock3(),
                                      _createElementBlock3(
                                        'td',
                                        {
                                          key: 1,
                                          class: _normalizeClass3([
                                            $setup.ns.e('cell'),
                                            $setup.ns.e('expand-cell')
                                          ]),
                                          style: _normalizeStyle3(
                                            $setup.getSpecialFixedStyle('expand')
                                          )
                                        },
                                        null,
                                        6
                                        /* CLASS, STYLE */
                                      ))
                                    : _createCommentVNode3('v-if', true),
                                  _createCommentVNode3(' \u5E8F\u53F7\u5217\u5360\u4F4D '),
                                  _ctx.showIndex
                                    ? (_openBlock3(),
                                      _createElementBlock3(
                                        'td',
                                        {
                                          key: 2,
                                          class: _normalizeClass3([
                                            $setup.ns.e('cell'),
                                            $setup.ns.e('index-cell')
                                          ]),
                                          style: _normalizeStyle3(
                                            $setup.getSpecialFixedStyle('index')
                                          )
                                        },
                                        null,
                                        6
                                        /* CLASS, STYLE */
                                      ))
                                    : _createCommentVNode3('v-if', true),
                                  _createCommentVNode3(' \u6570\u636E\u5217 '),
                                  (_openBlock3(true),
                                  _createElementBlock3(
                                    _Fragment2,
                                    null,
                                    _renderList2($setup.visibleColumns, (column, columnIndex) => {
                                      return (
                                        _openBlock3(),
                                        _createElementBlock3(
                                          'td',
                                          {
                                            key: column.prop || column.key || columnIndex,
                                            class: _normalizeClass3(
                                              $setup.getCellClass({}, column, 0, columnIndex)
                                            ),
                                            style: _normalizeStyle3(
                                              $setup.getCellStyle({}, column, 0, columnIndex)
                                            )
                                          },
                                          [
                                            _createElementVNode3(
                                              'div',
                                              {
                                                class: _normalizeClass3($setup.ns.e('cell-content'))
                                              },
                                              [
                                                _renderSlot3(
                                                  _ctx.$slots,
                                                  `summary-${column.prop}`,
                                                  {
                                                    column,
                                                    columnIndex,
                                                    data: $setup.tableData
                                                  },
                                                  () => [
                                                    _createTextVNode2(
                                                      _toDisplayString3(
                                                        $setup.summaryValues.length > 0
                                                          ? $setup.summaryValues[columnIndex]
                                                          : columnIndex === 0
                                                            ? _ctx.summaryConfig.text ||
                                                              $setup.t('table.sumText')
                                                            : ''
                                                      ),
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
                                          6
                                          /* CLASS, STYLE */
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
                            ])
                          ],
                          6
                          /* CLASS, STYLE */
                        )
                      ]
                    })
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode3('v-if', true),
            _createCommentVNode3(' \u5217\u5BBD\u8C03\u6574\u6307\u793A\u7EBF '),
            $setup.resizeLineVisible
              ? (_openBlock3(),
                _createElementBlock3(
                  'div',
                  {
                    key: 3,
                    class: _normalizeClass3($setup.ns.e('resize-line')),
                    style: _normalizeStyle3({
                      left: `${$setup.resizeLineLeft}px`
                    })
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                ))
              : _createCommentVNode3('v-if', true),
            _createCommentVNode3(' \u52A0\u8F7D\u72B6\u6001 '),
            (typeof _ctx.loading === 'object' ? _ctx.loading.visible !== false : !!_ctx.loading)
              ? (_openBlock3(),
                _createElementBlock3(
                  'div',
                  {
                    key: 4,
                    class: _normalizeClass3($setup.ns.e('loading')),
                    style: _normalizeStyle3(
                      typeof _ctx.loading === 'object' && _ctx.loading.background
                        ? {
                            backgroundColor: _ctx.loading.background
                          }
                        : {}
                    )
                  },
                  [
                    _renderSlot3(_ctx.$slots, 'loading', {}, () => [
                      _createElementVNode3(
                        'div',
                        {
                          class: _normalizeClass3($setup.ns.e('loading-content'))
                        },
                        [
                          _createElementVNode3(
                            'span',
                            {
                              class: _normalizeClass3($setup.ns.e('loading-spinner'))
                            },
                            null,
                            2
                            /* CLASS */
                          ),
                          typeof _ctx.loading === 'object' && _ctx.loading.text
                            ? (_openBlock3(),
                              _createElementBlock3(
                                'span',
                                {
                                  key: 0,
                                  class: _normalizeClass3($setup.ns.e('loading-text'))
                                },
                                _toDisplayString3(_ctx.loading.text),
                                3
                                /* TEXT, CLASS */
                              ))
                            : typeof _ctx.loading === 'boolean'
                              ? (_openBlock3(),
                                _createElementBlock3(
                                  'span',
                                  {
                                    key: 1,
                                    class: _normalizeClass3($setup.ns.e('loading-text'))
                                  },
                                  _toDisplayString3($setup.t('table.loading')),
                                  3
                                  /* TEXT, CLASS */
                                ))
                              : _createCommentVNode3('v-if', true)
                        ],
                        2
                        /* CLASS */
                      )
                    ])
                  ],
                  6
                  /* CLASS, STYLE */
                ))
              : _createCommentVNode3('v-if', true)
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode3(' \u5206\u9875 '),
        _ctx.pagination
          ? (_openBlock3(),
            _createElementBlock3(
              'div',
              {
                key: 0,
                class: _normalizeClass3([
                  $setup.ns.e('pagination-wrapper'),
                  typeof _ctx.pagination === 'object' && _ctx.pagination.align
                    ? $setup.ns.is('align-' + _ctx.pagination.align)
                    : ''
                ])
              },
              [
                _createVNode3(
                  $setup['YhPagination'],
                  _mergeProps(typeof _ctx.pagination === 'object' ? _ctx.pagination : {}, {
                    class: $setup.ns.e('pagination'),
                    'onUpdate:currentPage':
                      _cache[4] ||
                      (_cache[4] = (val) =>
                        $setup.emit('page-change', {
                          currentPage: val,
                          pageSize:
                            (typeof _ctx.pagination === 'object' ? _ctx.pagination.pageSize : 10) ||
                            10
                        })),
                    'onUpdate:pageSize':
                      _cache[5] ||
                      (_cache[5] = (val) =>
                        $setup.emit('page-change', {
                          currentPage:
                            (typeof _ctx.pagination === 'object'
                              ? _ctx.pagination.currentPage
                              : 1) || 1,
                          pageSize: val
                        }))
                  }),
                  null,
                  16,
                  ['class']
                )
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode3('v-if', true),
        _createCommentVNode3(
          ' \u6E32\u67D3\u9690\u85CF\u7684\u9ED8\u8BA4\u63D2\u69FD\uFF0C\u7528\u4E8E\u6536\u96C6\u5217\u914D\u7F6E(\u4EC5\u6E32\u67D3 YhTableColumn \u5B50\u7EC4\u4EF6) '
        ),
        _ctx.$slots.default && (!_ctx.columns || _ctx.columns.length === 0)
          ? (_openBlock3(),
            _createElementBlock3('div', _hoisted_17, [_renderSlot3(_ctx.$slots, 'default')]))
          : _createCommentVNode3('v-if', true)
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
var __sfc__3 = /* @__PURE__ */ Object.assign(
  {
    name: 'YhTable'
  },
  {
    __name: 'table',
    props: tableProps,
    emits: tableEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const slots = useSlots()
      const ns = useNamespace('table')
      const { t } = useLocale()
      const RenderColumn = (props2) => {
        return props2.render(props2.params)
      }
      const { themeStyle } = useComponentTheme(
        'table',
        computed17(() => props.themeOverrides)
      )
      const tableRef = ref19(null)
      const headerRef = ref19(null)
      const bodyRef = ref19(null)
      const footerRef = ref19(null)
      const currentRowKey = ref19(props.currentRowKey)
      const sortStates = ref19([])
      const filterStates = ref19({})
      const expandedRowKeys = ref19(/* @__PURE__ */ new Set())
      const treeExpandedKeys = ref19(/* @__PURE__ */ new Set())
      const isFullscreen = ref19(false)
      const scrollState = ref19('left')
      const collectedColumns = ref19([])
      const getRowKeyFn = (row) => {
        if (!row) return Math.random().toString(36).slice(2)
        return getRowKey(row, props.rowKey)
      }
      const allColumns = computed17(() => {
        if (props.columns && props.columns.length > 0) {
          return props.columns
        }
        return collectedColumns.value
      })
      const flatColumns = computed17(() => flattenColumns(allColumns.value))
      const headerRows = computed17(() => buildHeaderRows(allColumns.value))
      const columnDepth = computed17(() => getColumnDepth(allColumns.value))
      const visibleColumns = computed17(() => {
        return flatColumns.value.filter((col) => col.visible !== false)
      })
      const fixedLeftColumns = computed17(() => {
        return visibleColumns.value.filter((col) => col.fixed === 'left' || col.fixed === true)
      })
      const fixedRightColumns = computed17(() => {
        return visibleColumns.value.filter((col) => col.fixed === 'right')
      })
      const treeProcessedData = computed17(() => {
        if (!props.treeConfig) return props.data
        const childrenKey = props.treeConfig.childrenKey || 'children'
        return flattenTreeData(props.data, childrenKey, treeExpandedKeys.value, props.rowKey)
      })
      watch8(
        () => props.data,
        (newData) => {
          var _a2
          if (
            ((_a2 = props.treeConfig) == null ? void 0 : _a2.expandAll) &&
            treeExpandedKeys.value.size === 0
          ) {
            const childrenKey = props.treeConfig.childrenKey || 'children'
            const allKeys = /* @__PURE__ */ new Set()
            const collectKeys = (items) => {
              items.forEach((item) => {
                const children = item[childrenKey]
                if (children == null ? void 0 : children.length) {
                  allKeys.add(getRowKeyFn(item))
                  collectKeys(children)
                }
              })
            }
            collectKeys(newData)
            treeExpandedKeys.value = allKeys
          }
        },
        { immediate: true }
      )
      const sortedData = computed17(() => {
        const data = treeProcessedData.value
        if (!sortStates.value.length) return data
        const activeSortStates = sortStates.value.filter((s) => s.order)
        if (!activeSortStates.length) return data
        return [...data].sort((a, b) => {
          for (const state of activeSortStates) {
            const column = flatColumns.value.find((col) => col.prop === state.prop)
            let result
            if (column == null ? void 0 : column.sortMethod) {
              result = column.sortMethod(a, b, state.order)
            } else {
              result = defaultSortMethod(a, b, state.prop, state.order)
            }
            if (result !== 0) return result
          }
          return 0
        })
      })
      const filteredData = computed17(() => {
        return multiValueFilter(sortedData.value, filterStates.value, flatColumns.value)
      })
      const selectionWidth = computed17(() =>
        props.selectionConfig ? parseInt(String(props.selectionConfig.columnWidth || 50)) : 0
      )
      const expandWidth = computed17(() =>
        props.expandConfig ? parseInt(String(props.expandConfig.columnWidth || 50)) : 0
      )
      const indexWidth = computed17(() => {
        var _a2
        return props.showIndex
          ? parseInt(String(((_a2 = props.indexConfig) == null ? void 0 : _a2.width) || 50))
          : 0
      })
      const isAnyColumnFixedLeft = computed17(() =>
        visibleColumns.value.some((col) => col.fixed === 'left' || col.fixed === true)
      )
      const tableData = computed17(() => {
        const data = filteredData.value
        if (
          !props.pagination ||
          (typeof props.pagination === 'object' && props.pagination.remote)
        ) {
          return data
        }
        const currentPage =
          typeof props.pagination === 'object' ? props.pagination.currentPage || 1 : 1
        const pageSize = typeof props.pagination === 'object' ? props.pagination.pageSize || 10 : 10
        const start = (currentPage - 1) * pageSize
        const end = start + pageSize
        return data.slice(start, end)
      })
      const virtualConfig = computed17(() => props.virtualConfig)
      const {
        visibleData,
        offsetTop,
        totalHeight,
        handleScroll: handleVirtualScroll,
        scrollToIndex,
        scrollToRow,
        refresh: refreshVirtual,
        isVirtual
      } = useVirtualScroll({
        data: tableData,
        containerRef: bodyRef,
        config: virtualConfig,
        rowKey: getRowKeyFn
      })
      const renderData = computed17(() => {
        return isVirtual.value ? visibleData.value : tableData.value
      })
      const selectionConfig = computed17(() => props.selectionConfig)
      const {
        selectedRowKeys,
        selectedRows,
        isAllSelected,
        isIndeterminate,
        selectionType,
        toggleRowSelection,
        toggleAllSelection,
        clearSelection,
        // setSelection,
        // setSelectionByKeys,
        isRowSelected,
        isRowSelectable
      } = useTableSelection({
        data: tableData,
        rowKey: props.rowKey,
        config: selectionConfig
      })
      const dragConfigRef = computed17(() => props.dragConfig)
      const {
        isRowDragEnabled,
        // isDraggingRow,
        getRowDragAttrs,
        getRowDragClass
      } = useRowDrag({
        data: tableData,
        rawData: computed17(() => props.data),
        dragConfig: dragConfigRef,
        treeConfig: computed17(() => props.treeConfig),
        rowKey: getRowKeyFn,
        emit
      })
      const resizableRef = computed17(() => props.resizable)
      const {
        // isResizing,
        // resizingColumn: activeResizingColumn,
        resizeLineLeft,
        resizeLineVisible,
        isColumnResizable,
        handleResizeStart
      } = useColumnResize({
        resizable: resizableRef,
        columns: visibleColumns,
        tableRef,
        emit
      })
      const {
        isColumnDragEnabled,
        // isDraggingColumn,
        isColumnDraggable,
        getHeaderDragAttrs,
        getHeaderDragClass
      } = useColumnDrag({
        columns: allColumns,
        dragConfig: dragConfigRef,
        flatColumns: visibleColumns,
        emit
      })
      const {
        exportData: doExportData
        // toCSV,
        // toJSON: toJSONExport,
        // toTXT,
        // toXML,
        // toHTML: toHTMLExport,
        // getExportColumns
      } = useTableExport(tableData, visibleColumns)
      const {
        importFile,
        importData: doImportData,
        openImport
        // parseCSV,
        // parseTXT: parseTXTImport,
        // parseJSON: parseJSONImport,
        // parseXML: parseXMLImport,
        // parseHTML: parseHTMLImport,
        // parseContent,
        // applyImport
      } = useTableImport(
        computed17({
          get: () => props.data,
          set: (val) => emit('update:data', val)
        }),
        visibleColumns
      )
      const {
        print: doPrint,
        printMultiple,
        printTemplate
        // getPrintColumns
      } = useTablePrint(tableData, visibleColumns)
      const toolbarSlotNames = [
        'toolbar',
        'toolbar-left',
        'toolbar-left-prefix',
        'toolbar-left-suffix',
        'toolbar-right',
        'toolbar-right-prefix',
        'toolbar-right-suffix'
      ]
      const showToolbar = computed17(() => {
        var _a2
        if ((_a2 = props.toolbarConfig) == null ? void 0 : _a2.visible) return true
        return toolbarSlotNames.some((name) => !!slots[name])
      })
      const tableClasses = computed17(() => [
        ns.b(),
        ns.m(props.size),
        ns.is('border', !!props.border),
        ns.is('stripe', props.stripe),
        ns.is('highlight-current-row', props.highlightCurrentRow),
        ns.is('fullscreen', isFullscreen.value),
        ns.is('fixed-header', !!(props.height || props.maxHeight)),
        ns.is(
          'fixed-column',
          fixedLeftColumns.value.length > 0 || fixedRightColumns.value.length > 0
        ),
        ns.is(`scrolling-${scrollState.value}`, true)
      ])
      const innerWrapperClasses = computed17(() => [
        ns.e('inner-wrapper'),
        ns.is('border', !!props.border)
      ])
      const tableStyle = computed17(() => {
        const style = __spreadValues8({}, themeStyle.value)
        if (props.width) {
          style.width = formatSize(props.width)
        }
        if (props.height) {
          style.height = formatSize(props.height)
        }
        if (props.maxHeight) {
          style.maxHeight = formatSize(props.maxHeight)
        }
        return style
      })
      const bodyStyle = computed17(() => {
        const style = {}
        if (props.height || props.maxHeight) {
          style.overflow = 'auto'
          style.flex = '1'
          style.minHeight = '0'
        }
        return style
      })
      const summaryValues = computed17(() => {
        var _a2
        if (!((_a2 = props.summaryConfig) == null ? void 0 : _a2.method)) return []
        return props.summaryConfig.method({
          columns: visibleColumns.value,
          data: tableData.value
        })
      })
      const isSpanVisible = (row, column, rowIndex, columnIndex) => {
        if (!props.spanMethod) return true
        const result = calculateSpan(row, column, rowIndex, columnIndex, props.spanMethod)
        return result.rowspan !== 0 && result.colspan !== 0
      }
      const handleScroll = throttle((event) => {
        const target = event.target
        const { scrollLeft, scrollWidth, clientWidth } = target
        if (scrollWidth <= clientWidth) {
          scrollState.value = 'none'
        } else if (scrollLeft <= 0) {
          scrollState.value = 'left'
        } else if (scrollLeft + clientWidth >= scrollWidth - 1) {
          scrollState.value = 'right'
        } else {
          scrollState.value = 'middle'
        }
        if (headerRef.value && props.syncScroll) {
          headerRef.value.scrollLeft = scrollLeft
        }
        if (footerRef.value && props.syncScroll) {
          footerRef.value.scrollLeft = scrollLeft
        }
        if (isVirtual.value) {
          handleVirtualScroll(event)
        }
        emit('scroll', {
          scrollTop: target.scrollTop,
          scrollLeft,
          isEnd: target.scrollHeight - target.scrollTop <= target.clientHeight + 1
        })
      }, 10)
      const handleRowClick = (row, column, event) => {
        emit('row-click', row, column, event)
        if (props.highlightCurrentRow) {
          const key = getRowKeyFn(row)
          currentRowKey.value = key
          emit('current-change', row, null)
          emit('update:currentRowKey', key)
        }
      }
      const handleRowDblclick = (row, column, event) => {
        emit('row-dblclick', row, column, event)
      }
      const handleCellClick = (row, column, cell, event) => {
        emit('cell-click', row, column, cell, event)
      }
      const handleCellDblclick = (row, column, cell, event) => {
        emit('cell-dblclick', row, column, cell, event)
      }
      const handleHeaderClick = (column, event) => {
        emit('header-click', column, event)
        if (column.sortable) {
          handleSort(column)
        }
      }
      const handleSort = (column) => {
        var _a2
        const prop = column.prop
        if (!prop) return
        const currentSort = sortStates.value.find((s) => s.prop === prop)
        let newOrder = 'asc'
        if (currentSort) {
          if (currentSort.order === 'asc') {
            newOrder = 'desc'
          } else if (currentSort.order === 'desc') {
            newOrder = null
          }
        }
        if ((_a2 = props.sortConfig) == null ? void 0 : _a2.multiple) {
          const index = sortStates.value.findIndex((s) => s.prop === prop)
          if (index > -1) {
            if (newOrder) {
              sortStates.value[index].order = newOrder
            } else {
              sortStates.value.splice(index, 1)
            }
          } else if (newOrder) {
            sortStates.value.push({ prop, order: newOrder })
          }
        } else {
          if (newOrder) {
            sortStates.value = [{ prop, order: newOrder }]
          } else {
            sortStates.value = []
          }
        }
        emit('sort-change', { column, prop, order: newOrder })
      }
      const handleToggleExpand = (row) => {
        var _a2
        const key = getRowKeyFn(row)
        if (expandedRowKeys.value.has(key)) {
          expandedRowKeys.value.delete(key)
        } else {
          if ((_a2 = props.expandConfig) == null ? void 0 : _a2.accordion) {
            expandedRowKeys.value.clear()
          }
          expandedRowKeys.value.add(key)
        }
        emit(
          'expand-change',
          row,
          Array.from(expandedRowKeys.value)
            .map((k) => {
              return tableData.value.find((r) => getRowKeyFn(r) === k)
            })
            .filter(Boolean)
        )
      }
      const handleToggleTreeExpand = (row) => {
        var _a2
        const key = getRowKeyFn(row)
        if (treeExpandedKeys.value.has(key)) {
          treeExpandedKeys.value.delete(key)
        } else {
          if ((_a2 = props.treeConfig) == null ? void 0 : _a2.accordion) {
            treeExpandedKeys.value.clear()
          }
          treeExpandedKeys.value.add(key)
        }
      }
      const getRowClass = (row, rowIndex) => {
        const classes = [ns.e('row')]
        if (props.highlightCurrentRow && currentRowKey.value === getRowKeyFn(row)) {
          classes.push('is-current')
        }
        if (isRowSelected(row)) {
          classes.push('is-selected')
        }
        if (props.stripe && rowIndex % 2 === 1) {
          classes.push('is-striped')
        }
        if (isRowDragEnabled.value) {
          classes.push('is-row-draggable')
          const dragClass = getRowDragClass(rowIndex)
          if (dragClass) classes.push(dragClass)
        }
        if (props.rowClassName) {
          if (typeof props.rowClassName === 'function') {
            classes.push(props.rowClassName({ row, rowIndex }))
          } else {
            classes.push(props.rowClassName)
          }
        }
        return classes.join(' ')
      }
      const getRowStyle = (row, rowIndex) => {
        if (!props.rowStyle) return {}
        if (typeof props.rowStyle === 'function') {
          return props.rowStyle({ row, rowIndex })
        }
        return props.rowStyle
      }
      const getCellClass = (row, column, rowIndex, columnIndex) => {
        const classes = [ns.e('cell')]
        if (column.className) {
          classes.push(column.className)
        }
        if (column.align) {
          classes.push(`is-${column.align}`)
        }
        if (column.fixed) {
          const fixedPosition = column.fixed === true ? 'left' : column.fixed
          classes.push(`is-fixed-${fixedPosition}`)
          if (fixedPosition === 'left') {
            const fixedLeftIndices = visibleColumns.value
              .map((col, idx) => (col.fixed === 'left' || col.fixed === true ? idx : -1))
              .filter((idx) => idx !== -1)
            if (columnIndex === Math.max(...fixedLeftIndices)) {
              classes.push('is-last-fixed-left')
            }
          }
          if (fixedPosition === 'right') {
            const fixedRightIndices = visibleColumns.value
              .map((col, idx) => (col.fixed === 'right' ? idx : -1))
              .filter((idx) => idx !== -1)
            if (columnIndex === Math.min(...fixedRightIndices)) {
              classes.push('is-first-fixed-right')
            }
          }
          classes.push('is-fixed')
        }
        if (props.cellClassName) {
          if (typeof props.cellClassName === 'function') {
            classes.push(props.cellClassName({ row, column, rowIndex, columnIndex }))
          } else {
            classes.push(props.cellClassName)
          }
        }
        return classes.join(' ')
      }
      const getFixedStyle = (column, columnIndex) => {
        if (!column.fixed) return {}
        const style = {}
        let offset2 = 0
        if (column.fixed === 'left' || column.fixed === true) {
          offset2 = selectionWidth.value + expandWidth.value + indexWidth.value
          const prevColumns = visibleColumns.value.slice(0, columnIndex)
          offset2 += prevColumns.reduce((acc, col) => acc + (parseInt(String(col.width)) || 0), 0)
          style.left = `${offset2}px`
        } else if (column.fixed === 'right') {
          const nextColumns = visibleColumns.value.slice(columnIndex + 1)
          offset2 = nextColumns.reduce((acc, col) => acc + (parseInt(String(col.width)) || 0), 0)
          style.right = `${offset2}px`
        }
        return style
      }
      const getSpecialFixedStyle = (type) => {
        if (!isAnyColumnFixedLeft.value) return {}
        const style = { position: 'sticky' }
        if (type === 'selection') style.left = '0px'
        if (type === 'expand') style.left = `${selectionWidth.value}px`
        if (type === 'index') style.left = `${selectionWidth.value + expandWidth.value}px`
        return style
      }
      const getCellStyle = (row, column, rowIndex, columnIndex) => {
        const style = __spreadProps4(
          __spreadValues8(__spreadValues8({}, column.style), getFixedStyle(column, columnIndex)),
          {
            textAlign: column.align || 'left'
          }
        )
        if (column.width) {
          style.width = formatSize(column.width)
        }
        if (column.minWidth) {
          style.minWidth = formatSize(column.minWidth)
        }
        if (props.cellStyle) {
          if (typeof props.cellStyle === 'function') {
            Object.assign(style, props.cellStyle({ row, column, rowIndex, columnIndex }))
          } else {
            Object.assign(style, props.cellStyle)
          }
        }
        return style
      }
      const getCellContent = (row, column, rowIndex) => {
        if (!row) return ''
        const prop = column.prop
        if (!prop) return ''
        const cellValue = row[prop]
        if (column.formatter) {
          return column.formatter(row, column, cellValue, rowIndex)
        }
        if (column.displayMap && cellValue !== void 0 && cellValue !== null) {
          const mappedValue = column.displayMap[String(cellValue)]
          if (mappedValue !== void 0) return mappedValue
        }
        if (typeof cellValue === 'boolean') {
          return cellValue ? t('table.yes') : t('table.no')
        }
        return cellValue !== void 0 && cellValue !== null ? String(cellValue) : ''
      }
      const getSortOrder = (column) => {
        const prop = column.prop
        if (!prop) return null
        const sort2 = sortStates.value.find((s) => s.prop === prop)
        return (sort2 == null ? void 0 : sort2.order) || null
      }
      const doLayout = () => {
        nextTick2(() => {
          refreshVirtual()
        })
      }
      const refresh = () => {
        refreshVirtual()
      }
      const scrollTo = (options) => {
        const container = bodyRef.value
        if (!container) return
        if (options.row) {
          scrollToRow(options.row)
          return
        }
        if (options.rowIndex !== void 0) {
          scrollToIndex(options.rowIndex)
          return
        }
        container.scrollTo({
          left: options.left,
          top: options.top
        })
      }
      const sort = (prop, order) => {
        sortStates.value = order ? [{ prop, order }] : []
      }
      const clearSort = () => {
        sortStates.value = []
      }
      const filter = (prop, values) => {
        filterStates.value[prop] = values
        emit('filter-change', filterStates.value)
      }
      const clearFilter = (propOrProps) => {
        if (!propOrProps) {
          filterStates.value = {}
        } else if (typeof propOrProps === 'string') {
          delete filterStates.value[propOrProps]
        } else {
          propOrProps.forEach((p) => delete filterStates.value[p])
        }
        emit('filter-change', filterStates.value)
      }
      const setCurrentRow = (row) => {
        const oldKey = currentRowKey.value
        const oldRow = oldKey ? tableData.value.find((r) => getRowKeyFn(r) === oldKey) : null
        currentRowKey.value = row ? getRowKeyFn(row) : void 0
        emit('current-change', row, oldRow || null)
        emit('update:currentRowKey', currentRowKey.value)
      }
      const toggleRowExpansion = (row, expanded) => {
        const key = getRowKeyFn(row)
        const isExpanded = expandedRowKeys.value.has(key)
        const shouldExpand = expanded != null ? expanded : !isExpanded
        if (shouldExpand && !isExpanded) {
          expandedRowKeys.value.add(key)
        } else if (!shouldExpand && isExpanded) {
          expandedRowKeys.value.delete(key)
        }
      }
      const setExpandedRowKeys = (keys) => {
        expandedRowKeys.value = new Set(keys)
      }
      const getExpandedRowKeys = () => {
        return Array.from(expandedRowKeys.value)
      }
      const getTableData = () => ({
        fullData: props.data,
        tableData: tableData.value
      })
      const exportData = async (config) => {
        return doExportData(config)
      }
      const print = (config) => {
        return doPrint(config)
      }
      const toggleFullscreen = () => {
        isFullscreen.value = !isFullscreen.value
      }
      const getColumns = () => visibleColumns.value
      const setColumnVisible = (prop, visible) => {
        const column = flatColumns.value.find((col) => col.prop === prop)
        if (column) {
          column.visible = visible
          emit('column-visible-change', visibleColumns.value)
        }
      }
      const resetColumns = () => {
        flatColumns.value.forEach((col) => {
          col.visible = true
        })
        emit('column-visible-change', visibleColumns.value)
      }
      const insertRow = (row, index) => {
        const newData = [...props.data]
        if (index !== void 0) {
          newData.splice(index, 0, row)
        } else {
          newData.push(row)
        }
        emit('update:data', newData)
      }
      const removeRow = (row) => {
        const rows = Array.isArray(row) ? row : [row]
        const keysToRemove = new Set(rows.map((r) => getRowKeyFn(r)))
        const newData = props.data.filter((r) => !keysToRemove.has(getRowKeyFn(r)))
        emit('update:data', newData)
      }
      const updateRow = (row, newRow) => {
        const key = getRowKeyFn(row)
        const newData = props.data.map((r) => {
          if (getRowKeyFn(r) === key) {
            return __spreadValues8(__spreadValues8({}, r), newRow)
          }
          return r
        })
        emit('update:data', newData)
      }
      const expose = {
        getSelectionRows: () => selectedRows.value,
        getSelectionRowKeys: () => selectedRowKeys.value,
        toggleRowSelection,
        toggleAllSelection,
        clearSelection,
        setCurrentRow,
        toggleRowExpansion,
        setExpandedRowKeys,
        getExpandedRowKeys,
        sort,
        clearSort,
        filter,
        clearFilter,
        doLayout,
        refresh,
        scrollTo,
        getTableData,
        exportData,
        print,
        openImport,
        importFile,
        importData: doImportData,
        printMultiple,
        printTemplate,
        toggleFullscreen,
        getColumns,
        setColumnVisible,
        resetColumns,
        insertRow,
        removeRow,
        updateRow
      }
      __expose(expose)
      provide2(tableContextKey, {
        props,
        slots,
        registerColumn: (column) => {
          if (!collectedColumns.value.includes(column)) {
            collectedColumns.value.push(column)
          }
        },
        unregisterColumn: (column) => {
          const index = collectedColumns.value.indexOf(column)
          if (index > -1) {
            collectedColumns.value.splice(index, 1)
          }
        }
      })
      onMounted5(() => {
        doLayout()
      })
      watch8(
        () => props.data,
        () => {
          nextTick2(() => {
            doLayout()
          })
        }
      )
      watch8(
        () => props.currentRowKey,
        (val) => {
          currentRowKey.value = val
        }
      )
      watch8(selectedRowKeys, () => {
        emit('selection-change', selectedRows.value, selectedRowKeys.value)
      })
      const __returned__ = {
        props,
        emit,
        slots,
        ns,
        t,
        RenderColumn,
        themeStyle,
        tableRef,
        headerRef,
        bodyRef,
        footerRef,
        currentRowKey,
        sortStates,
        filterStates,
        expandedRowKeys,
        treeExpandedKeys,
        isFullscreen,
        scrollState,
        collectedColumns,
        getRowKeyFn,
        allColumns,
        flatColumns,
        headerRows,
        columnDepth,
        visibleColumns,
        fixedLeftColumns,
        fixedRightColumns,
        treeProcessedData,
        sortedData,
        filteredData,
        selectionWidth,
        expandWidth,
        indexWidth,
        isAnyColumnFixedLeft,
        tableData,
        virtualConfig,
        visibleData,
        offsetTop,
        totalHeight,
        handleVirtualScroll,
        scrollToIndex,
        scrollToRow,
        refreshVirtual,
        isVirtual,
        renderData,
        selectionConfig,
        selectedRowKeys,
        selectedRows,
        isAllSelected,
        isIndeterminate,
        selectionType,
        toggleRowSelection,
        toggleAllSelection,
        clearSelection,
        isRowSelected,
        isRowSelectable,
        dragConfigRef,
        isRowDragEnabled,
        getRowDragAttrs,
        getRowDragClass,
        resizableRef,
        resizeLineLeft,
        resizeLineVisible,
        isColumnResizable,
        handleResizeStart,
        isColumnDragEnabled,
        isColumnDraggable,
        getHeaderDragAttrs,
        getHeaderDragClass,
        doExportData,
        importFile,
        doImportData,
        openImport,
        doPrint,
        printMultiple,
        printTemplate,
        toolbarSlotNames,
        showToolbar,
        tableClasses,
        innerWrapperClasses,
        tableStyle,
        bodyStyle,
        summaryValues,
        isSpanVisible,
        handleScroll,
        handleRowClick,
        handleRowDblclick,
        handleCellClick,
        handleCellDblclick,
        handleHeaderClick,
        handleSort,
        handleToggleExpand,
        handleToggleTreeExpand,
        getRowClass,
        getRowStyle,
        getCellClass,
        getFixedStyle,
        getSpecialFixedStyle,
        getCellStyle,
        getCellContent,
        getSortOrder,
        doLayout,
        refresh,
        scrollTo,
        sort,
        clearSort,
        filter,
        clearFilter,
        setCurrentRow,
        toggleRowExpansion,
        setExpandedRowKeys,
        getExpandedRowKeys,
        getTableData,
        exportData,
        print,
        toggleFullscreen,
        getColumns,
        setColumnVisible,
        resetColumns,
        insertRow,
        removeRow,
        updateRow,
        expose,
        computed: computed17,
        ref: ref19,
        provide: provide2,
        watch: watch8,
        onMounted: onMounted5,
        nextTick: nextTick2,
        useSlots,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get tableProps() {
          return tableProps
        },
        get tableEmits() {
          return tableEmits
        },
        get tableContextKey() {
          return tableContextKey
        },
        get getRowKey() {
          return getRowKey
        },
        get flattenColumns() {
          return flattenColumns
        },
        get getColumnDepth() {
          return getColumnDepth
        },
        get buildHeaderRows() {
          return buildHeaderRows
        },
        get formatSize() {
          return formatSize
        },
        get defaultSortMethod() {
          return defaultSortMethod
        },
        get multiValueFilter() {
          return multiValueFilter
        },
        get flattenTreeData() {
          return flattenTreeData
        },
        get calculateSpan() {
          return calculateSpan
        },
        get throttle() {
          return throttle
        },
        get useVirtualScroll() {
          return useVirtualScroll
        },
        get useTableSelection() {
          return useTableSelection
        },
        get useRowDrag() {
          return useRowDrag
        },
        get useColumnResize() {
          return useColumnResize
        },
        get useColumnDrag() {
          return useColumnDrag
        },
        get useTableExport() {
          return useTableExport
        },
        get useTableImport() {
          return useTableImport
        },
        get useTablePrint() {
          return useTablePrint
        },
        get YhTooltip() {
          return YhTooltip
        },
        get YhPagination() {
          return YhPagination
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__3.render = render3
var stdin_default4 = __sfc__3
export { stdin_default4 as default }
