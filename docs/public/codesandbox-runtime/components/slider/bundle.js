// docs/public/codesandbox-runtime/components/slider/src/slider.js
import {
  createVNode as _createVNode2,
  normalizeClass as _normalizeClass3,
  openBlock as _openBlock3,
  createElementBlock as _createElementBlock3,
  createCommentVNode as _createCommentVNode3,
  normalizeStyle as _normalizeStyle3,
  createElementVNode as _createElementVNode3,
  normalizeProps as _normalizeProps,
  guardReactiveProps as _guardReactiveProps,
  renderSlot as _renderSlot3,
  withCtx as _withCtx2,
  createSlots as _createSlots,
  createBlock as _createBlock2,
  renderList as _renderList,
  Fragment as _Fragment,
  toDisplayString as _toDisplayString3
} from 'vue'
import {
  ref as ref14,
  computed as computed13,
  watch as watch4,
  onMounted as onMounted3,
  provide as provide2,
  toRefs
} from 'vue'

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

// docs/public/codesandbox-runtime/hooks/use-form-item/index.js
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

// docs/public/codesandbox-runtime/components/slider/src/slider-meta.js
var sliderProps = {
  /** 绑定值 */
  modelValue: {
    type: [Number, Array],
    default: 0
  },
  /** 最小值 */
  min: {
    type: Number,
    default: 0
  },
  /** 最大值 */
  max: {
    type: Number,
    default: 100
  },
  /** 步长 */
  step: {
    type: Number,
    default: 1
  },
  /** 是否显示输入框，仅在非范围选择时有效 */
  showInput: {
    type: Boolean,
    default: false
  },
  /** 在显示输入框时，是否显示控制按钮 */
  showInputControls: {
    type: Boolean,
    default: true
  },
  /** 滑块的大小 */
  size: {
    type: String,
    default: ''
  },
  /** 输入框的大小 */
  inputSize: {
    type: String,
    default: ''
  },
  /** 是否显示间断点 */
  showStops: {
    type: Boolean,
    default: false
  },
  /** 是否显示提示 */
  showTooltip: {
    type: Boolean,
    default: true
  },
  /** 格式化提示文字 */
  formatTooltip: {
    type: Function,
    default: void 0
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否为范围选择 */
  range: {
    type: Boolean,
    default: false
  },
  /** 是否垂直模式 */
  vertical: {
    type: Boolean,
    default: false
  },
  /** 垂直模式下的高度 */
  height: {
    type: String,
    default: ''
  },
  /** 屏幕阅读器标签 */
  label: {
    type: String,
    default: void 0
  },
  /** 输入时的去抖延迟，单位为毫秒 */
  debounce: {
    type: Number,
    default: 300
  },
  /** 提示的自定义类名 */
  tooltipClass: {
    type: String,
    default: void 0
  },
  /** 提示出现的位置 */
  placement: {
    type: String,
    default: 'top'
  },
  /** 标记， key 的类型必须为 number ，且在 [min, max] 范围内，每个标记可以是一个对象或字符串 */
  marks: {
    type: Object,
    default: void 0
  },
  /** 改变滑块值时是否触发表单的校验 */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /** 自定义范围选择时的最小值属性名，用于 aria-label */
  rangeStartLabel: {
    type: String,
    default: void 0
  },
  /** 自定义范围选择时的最大值属性名，用于 aria-label */
  rangeEndLabel: {
    type: String,
    default: void 0
  },
  /** 自定义按钮类名 */
  buttonClass: {
    type: String,
    default: void 0
  },
  /** 自定义主题颜色 */
  color: {
    type: String,
    default: void 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
var sliderEmits = {
  'update:modelValue': (_val) => true,
  change: (_val) => true,
  input: (_val) => true
}

// docs/public/codesandbox-runtime/components/slider/src/slider-button.js
import {
  renderSlot as _renderSlot,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode,
  Transition as _Transition,
  withCtx as _withCtx,
  createVNode as _createVNode,
  normalizeStyle as _normalizeStyle
} from 'vue'
import {
  ref as ref12,
  computed as computed11,
  onBeforeUnmount as onBeforeUnmount2,
  inject as inject7
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        ref: 'button',
        class: _normalizeClass([
          $setup.ns.e('button-wrapper'),
          $setup.ns.is('dragging', $setup.dragging)
        ]),
        style: _normalizeStyle($setup.wrapperStyle),
        onMouseenter: $setup.handleMouseEnter,
        onMouseleave: $setup.handleMouseLeave,
        onMousedown: $setup.onButtonDown,
        onTouchstart: $setup.onButtonDown
      },
      [
        _renderSlot(_ctx.$slots, 'thumb', { value: $props.modelValue }, () => [
          _createElementVNode(
            'div',
            {
              class: _normalizeClass([
                $setup.ns.e('button'),
                $setup.ns.is('hover', $setup.hovering),
                $setup.ns.is('dragging', $setup.dragging)
              ])
            },
            null,
            2
            /* CLASS */
          )
        ]),
        _createVNode(
          _Transition,
          { name: 'yh-fade' },
          {
            default: _withCtx(() => [
              $setup.tooltipVisible
                ? (_openBlock(),
                  _createElementBlock(
                    'div',
                    {
                      key: 0,
                      class: _normalizeClass([$setup.ns.e('tooltip'), $props.tooltipClass])
                    },
                    [
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('tooltip-content'))
                        },
                        _toDisplayString($setup.displayValue),
                        3
                        /* TEXT, CLASS */
                      ),
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('tooltip-arrow'))
                        },
                        null,
                        2
                        /* CLASS */
                      )
                    ],
                    2
                    /* CLASS */
                  ))
                : _createCommentVNode('v-if', true)
            ]),
            _: 1
            /* STABLE */
          }
        )
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
var __sfc__ = {
  __name: 'slider-button',
  props: {
    modelValue: { type: Number, required: true },
    vertical: { type: Boolean, required: true, default: false },
    disabled: { type: Boolean, required: true, default: false },
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    step: { type: Number, required: true },
    showTooltip: { type: Boolean, required: true, default: true },
    formatTooltip: { type: Function, required: false, default: void 0 },
    tooltipClass: { type: String, required: false, default: void 0 },
    placement: { type: String, required: false, default: 'top' }
  },
  emits: ['update:modelValue', 'input', 'change'],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props
    const emit = __emit
    const ns = useNamespace('slider')
    const slider = inject7('slider')
    const dragging = ref12(false)
    const hovering = ref12(false)
    const isClick = ref12(false)
    const startX = ref12(0)
    const startY = ref12(0)
    const startPosition = ref12(0)
    const newPosition = ref12(0)
    const tooltipVisible = computed11(() => props.showTooltip && (dragging.value || hovering.value))
    const currentPosition = computed11(() => {
      return `${((props.modelValue - props.min) / (props.max - props.min)) * 100}%`
    })
    const wrapperStyle = computed11(() => {
      return props.vertical
        ? { bottom: currentPosition.value, top: 'auto' }
        : { left: currentPosition.value, top: '50%' }
    })
    const displayValue = computed11(() => {
      if (props.formatTooltip) {
        return props.formatTooltip(props.modelValue)
      }
      return props.modelValue
    })
    const handleMouseEnter = () => {
      hovering.value = true
    }
    const handleMouseLeave = () => {
      hovering.value = false
    }
    const onButtonDown = (event) => {
      if (props.disabled) return
      event.preventDefault()
      onDragStart(event)
      window.addEventListener('mousemove', onDragging)
      window.addEventListener('touchmove', onDragging)
      window.addEventListener('mouseup', onDragEnd)
      window.addEventListener('touchend', onDragEnd)
      window.addEventListener('contextmenu', onDragEnd)
    }
    const onDragStart = (event) => {
      dragging.value = true
      isClick.value = true
      if (event instanceof MouseEvent) {
        startX.value = event.clientX
        startY.value = event.clientY
      } else {
        startX.value = event.touches[0].clientX
        startY.value = event.touches[0].clientY
      }
      startPosition.value = parseFloat(currentPosition.value)
      newPosition.value = startPosition.value
    }
    const onDragging = (event) => {
      if (dragging.value) {
        isClick.value = false
        let diff = 0
        const sliderSize = getSliderSize()
        if (sliderSize > 0) {
          if (event instanceof MouseEvent) {
            if (props.vertical) {
              diff = ((startY.value - event.clientY) / sliderSize) * 100
            } else {
              diff = ((event.clientX - startX.value) / sliderSize) * 100
            }
          } else {
            if (props.vertical) {
              diff = ((startY.value - event.touches[0].clientY) / sliderSize) * 100
            } else {
              diff = ((event.touches[0].clientX - startX.value) / sliderSize) * 100
            }
          }
          newPosition.value = startPosition.value + diff
          setPosition(newPosition.value)
        }
      }
    }
    const onDragEnd = () => {
      if (dragging.value) {
        setTimeout(() => {
          dragging.value = false
          if (!isClick.value) {
            setPosition(newPosition.value)
          }
          emit('change', props.modelValue)
        }, 0)
        window.removeEventListener('mousemove', onDragging)
        window.removeEventListener('touchmove', onDragging)
        window.removeEventListener('mouseup', onDragEnd)
        window.removeEventListener('touchend', onDragEnd)
        window.removeEventListener('contextmenu', onDragEnd)
      }
    }
    const getSliderSize = () => {
      var _a2
      if (!((_a2 = slider == null ? void 0 : slider.sliderRef) == null ? void 0 : _a2.value))
        return 0
      return props.vertical
        ? slider.sliderRef.value.offsetHeight
        : slider.sliderRef.value.offsetWidth
    }
    const setPosition = (percent) => {
      if (percent < 0) percent = 0
      if (percent > 100) percent = 100
      const lengthPerStep = 100 / ((props.max - props.min) / props.step)
      const steps = Math.round(percent / lengthPerStep)
      let value = steps * lengthPerStep * (props.max - props.min) * 0.01 + props.min
      value = parseFloat(value.toFixed(getPrecision(props.step)))
      if (value !== props.modelValue) {
        emit('update:modelValue', value)
        emit('input', value)
      }
    }
    const getPrecision = (step) => {
      const stepStr = step.toString()
      const dotIndex = stepStr.indexOf('.')
      return dotIndex > -1 ? stepStr.length - dotIndex - 1 : 0
    }
    onBeforeUnmount2(() => {
      window.removeEventListener('mousemove', onDragging)
      window.removeEventListener('touchmove', onDragging)
      window.removeEventListener('mouseup', onDragEnd)
      window.removeEventListener('touchend', onDragEnd)
      window.removeEventListener('contextmenu', onDragEnd)
    })
    __expose({
      onButtonDown
    })
    const __returned__ = {
      props,
      emit,
      ns,
      slider,
      dragging,
      hovering,
      isClick,
      startX,
      startY,
      startPosition,
      newPosition,
      tooltipVisible,
      currentPosition,
      wrapperStyle,
      displayValue,
      handleMouseEnter,
      handleMouseLeave,
      onButtonDown,
      onDragStart,
      onDragging,
      onDragEnd,
      getSliderSize,
      setPosition,
      getPrecision,
      ref: ref12,
      computed: computed11,
      onBeforeUnmount: onBeforeUnmount2,
      inject: inject7,
      get useNamespace() {
        return useNamespace
      }
    }
    Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
    return __returned__
  }
}
__sfc__.render = render
var stdin_default2 = __sfc__

// docs/public/codesandbox-runtime/components/input-number/src/input-number.js
import {
  renderSlot as _renderSlot2,
  createElementVNode as _createElementVNode2,
  openBlock as _openBlock2,
  createElementBlock as _createElementBlock2,
  normalizeClass as _normalizeClass2,
  createCommentVNode as _createCommentVNode2,
  toDisplayString as _toDisplayString2,
  resolveDynamicComponent as _resolveDynamicComponent,
  createBlock as _createBlock,
  withModifiers as _withModifiers,
  normalizeStyle as _normalizeStyle2
} from 'vue'
import { computed as computed12, ref as ref13, useSlots, nextTick } from 'vue'
var _hoisted_1 = ['value', 'name', 'id', 'placeholder', 'disabled', 'readonly']
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock2(),
    _createElementBlock2(
      'div',
      {
        class: _normalizeClass2($setup.inputNumberClasses),
        style: _normalizeStyle2($setup.themeStyle),
        onMouseenter: _cache[0] || (_cache[0] = ($event) => ($setup.hovering = true)),
        onMouseleave: _cache[1] || (_cache[1] = ($event) => ($setup.hovering = false))
      },
      [
        $props.controls && $props.controlsPosition !== 'right'
          ? (_openBlock2(),
            _createElementBlock2(
              'span',
              {
                key: 0,
                class: _normalizeClass2([
                  $setup.ns.e('decrease'),
                  $setup.ns.is('disabled', $setup.minDisabled || $setup.mergedDisabled)
                ]),
                onClick: $setup.decrease
              },
              [
                _renderSlot2(_ctx.$slots, 'decreaseIcon', {}, () => [
                  _cache[2] ||
                    (_cache[2] = _createElementVNode2(
                      'svg',
                      {
                        viewBox: '0 0 1024 1024',
                        width: '1em',
                        height: '1em'
                      },
                      [
                        _createElementVNode2('path', {
                          fill: 'currentColor',
                          d: 'M128 544h768a32 32 0 0 0 0-64H128a32 32 0 0 0 0 64z'
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
        _createElementVNode2(
          'div',
          {
            class: _normalizeClass2($setup.ns.e('wrapper'))
          },
          [
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
                        : _createCommentVNode2('v-if', true),
                      $props.prefixIcon && typeof $props.prefixIcon !== 'string'
                        ? (_openBlock2(),
                          _createBlock(_resolveDynamicComponent($props.prefixIcon), { key: 1 }))
                        : _createCommentVNode2('v-if', true)
                    ])
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode2('v-if', true),
            _createElementVNode2(
              'input',
              {
                ref: 'inputRef',
                type: 'text',
                class: _normalizeClass2($setup.ns.e('inner')),
                value: $setup.displayValue,
                name: $props.name,
                id: $props.id || $setup.inputId,
                placeholder: $props.placeholder || $setup.t('input.placeholder'),
                disabled: $setup.mergedDisabled,
                readonly: $props.readonly,
                autocomplete: 'off',
                onInput: $setup.handleInput,
                onChange: $setup.handleChange,
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur,
                onKeydown: $setup.handleKeydown
              },
              null,
              42,
              _hoisted_1
            ),
            $setup.hasSuffix
              ? (_openBlock2(),
                _createElementBlock2(
                  'span',
                  {
                    key: 1,
                    class: _normalizeClass2($setup.ns.e('suffix'))
                  },
                  [
                    $setup.showClear
                      ? (_openBlock2(),
                        _createElementBlock2(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass2($setup.ns.e('clear')),
                            onClick: _withModifiers($setup.handleClear, ['stop'])
                          },
                          [
                            ...(_cache[3] ||
                              (_cache[3] = [
                                _createElementVNode2(
                                  'svg',
                                  {
                                    viewBox: '0 0 1024 1024',
                                    width: '1em',
                                    height: '1em'
                                  },
                                  [
                                    _createElementVNode2('path', {
                                      fill: 'currentColor',
                                      d: 'M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm-160-448l128 128-128 128 45.248 45.248L525.248 621.248l128 128L698.496 704l-128-128 128-128L653.248 402.752 525.248 530.752l-128-128z'
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
                      : _createCommentVNode2('v-if', true),
                    _renderSlot2(_ctx.$slots, 'suffix', {}, () => [
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
                        : _createCommentVNode2('v-if', true),
                      $props.suffixIcon && typeof $props.suffixIcon !== 'string'
                        ? (_openBlock2(),
                          _createBlock(_resolveDynamicComponent($props.suffixIcon), { key: 1 }))
                        : _createCommentVNode2('v-if', true)
                    ])
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode2('v-if', true)
          ],
          2
          /* CLASS */
        ),
        $props.controls && $props.controlsPosition !== 'right'
          ? (_openBlock2(),
            _createElementBlock2(
              'span',
              {
                key: 1,
                class: _normalizeClass2([
                  $setup.ns.e('increase'),
                  $setup.ns.is('disabled', $setup.maxDisabled || $setup.mergedDisabled)
                ]),
                onClick: $setup.increase
              },
              [
                _renderSlot2(_ctx.$slots, 'increaseIcon', {}, () => [
                  _cache[4] ||
                    (_cache[4] = _createElementVNode2(
                      'svg',
                      {
                        viewBox: '0 0 1024 1024',
                        width: '1em',
                        height: '1em'
                      },
                      [
                        _createElementVNode2('path', {
                          fill: 'currentColor',
                          d: 'M544 128v352h352a32 32 0 0 1 0 64H544v352a32 32 0 0 1-64 0V544H128a32 32 0 0 1 0-64h352V128a32 32 0 0 1 64 0z'
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
        $props.controls && $props.controlsPosition === 'right'
          ? (_openBlock2(),
            _createElementBlock2(
              'span',
              {
                key: 2,
                class: _normalizeClass2($setup.ns.e('controls'))
              },
              [
                _createElementVNode2(
                  'span',
                  {
                    class: _normalizeClass2([
                      $setup.ns.e('increase'),
                      $setup.ns.is('disabled', $setup.maxDisabled || $setup.mergedDisabled)
                    ]),
                    onClick: $setup.increase
                  },
                  [
                    ...(_cache[5] ||
                      (_cache[5] = [
                        _createElementVNode2(
                          'svg',
                          {
                            viewBox: '0 0 1024 1024',
                            width: '1em',
                            height: '1em'
                          },
                          [
                            _createElementVNode2('path', {
                              fill: 'currentColor',
                              d: 'M488.832 344.32l-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z'
                            })
                          ],
                          -1
                          /* CACHED */
                        )
                      ]))
                  ],
                  2
                  /* CLASS */
                ),
                _createElementVNode2(
                  'span',
                  {
                    class: _normalizeClass2([
                      $setup.ns.e('decrease'),
                      $setup.ns.is('disabled', $setup.minDisabled || $setup.mergedDisabled)
                    ]),
                    onClick: $setup.decrease
                  },
                  [
                    ...(_cache[6] ||
                      (_cache[6] = [
                        _createElementVNode2(
                          'svg',
                          {
                            viewBox: '0 0 1024 1024',
                            width: '1em',
                            height: '1em'
                          },
                          [
                            _createElementVNode2('path', {
                              fill: 'currentColor',
                              d: 'M488.832 679.68l-339.84-356.672a32 32 0 0 1 0-44.16l.384-.384a29.44 29.44 0 0 1 42.688 0l320 335.872 319.872-335.872a29.44 29.44 0 0 1 42.688 0l.384.384a32 32 0 0 1 0 44.16L535.168 679.68a32 32 0 0 1-46.336 0z'
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
    name: 'YhInputNumber'
  },
  {
    __name: 'input-number',
    props: {
      modelValue: { type: Number, required: false },
      min: { type: Number, required: false, default: -Infinity },
      max: { type: Number, required: false, default: Infinity },
      step: { type: Number, required: false, default: 1 },
      stepStrictly: { type: Boolean, required: false, default: false },
      precision: { type: Number, required: false },
      size: { type: null, required: false, default: void 0 },
      readonly: { type: Boolean, required: false, default: false },
      disabled: { type: Boolean, required: false, default: false },
      controlsPosition: { type: null, required: false, default: '' },
      controls: { type: Boolean, required: false, default: true },
      name: { type: String, required: false },
      placeholder: { type: String, required: false },
      id: { type: String, required: false },
      tabindex: { type: [String, Number], required: false },
      valueOnClear: { type: [Number, null, String], required: false, default: null },
      prefix: { type: String, required: false },
      suffix: { type: String, required: false },
      prefixIcon: { type: null, required: false },
      suffixIcon: { type: null, required: false },
      clearable: { type: Boolean, required: false, default: false },
      validateEvent: { type: Boolean, required: false, default: true },
      validator: { type: Function, required: false },
      themeOverrides: { type: null, required: false }
    },
    emits: ['update:modelValue', 'change', 'input', 'focus', 'blur', 'clear'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const slots = useSlots()
      const ns = useNamespace('input-number')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'input-number',
        computed12(() => props.themeOverrides)
      )
      const inputRef = ref13()
      const inputId = useId()
      const focused = ref13(false)
      const hovering = ref13(false)
      const userInput = ref13(null)
      const validationError = ref13('')
      const { form, formItem, validate: triggerValidate } = useFormItem()
      const { globalSize } = useConfig()
      const mergedDisabled = computed12(
        () => props.disabled || (form == null ? void 0 : form.disabled) || false
      )
      const mergedSize = computed12(
        () =>
          props.size ||
          (formItem == null ? void 0 : formItem.size) ||
          (form == null ? void 0 : form.size) ||
          globalSize.value ||
          'default'
      )
      const numPrecision = computed12(() => {
        if (props.precision !== void 0) return props.precision
        const stepPrecision = getPrecision(props.step)
        if (props.modelValue !== void 0) {
          return Math.max(getPrecision(props.modelValue), stepPrecision)
        }
        return stepPrecision
      })
      const getPrecision = (value) => {
        if (value === void 0) return 0
        const valueString = value.toString()
        const dotPosition = valueString.indexOf('.')
        return dotPosition !== -1 ? valueString.length - dotPosition - 1 : 0
      }
      const toPrecision = (num, pre) => {
        const precision = pre != null ? pre : numPrecision.value
        return Number(Number(num).toFixed(precision))
      }
      const displayValue = computed12(() => {
        if (userInput.value !== null) return userInput.value
        let currentValue = props.modelValue
        if (currentValue === void 0 || currentValue === null || Number.isNaN(currentValue))
          return ''
        if (props.precision !== void 0) return Number(currentValue).toFixed(props.precision)
        return toPrecision(currentValue).toString()
      })
      const minDisabled = computed12(
        () => props.modelValue !== void 0 && props.modelValue <= props.min
      )
      const maxDisabled = computed12(
        () => props.modelValue !== void 0 && props.modelValue >= props.max
      )
      const showClear = computed12(
        () =>
          props.clearable &&
          !mergedDisabled.value &&
          !props.readonly &&
          props.modelValue !== void 0 &&
          props.modelValue !== null &&
          (focused.value || hovering.value)
      )
      const hasPrefix = computed12(() => !!props.prefix || !!props.prefixIcon || !!slots.prefix)
      const hasSuffix = computed12(
        () => !!props.suffix || !!props.suffixIcon || !!slots.suffix || showClear.value
      )
      const inputNumberClasses = computed12(() => [
        ns.b(),
        ns.m(mergedSize.value),
        ns.is('disabled', mergedDisabled.value),
        ns.is('focused', focused.value),
        ns.is('controls-right', props.controlsPosition === 'right'),
        ns.is('without-controls', !props.controls),
        ns.is('has-prefix', hasPrefix.value),
        ns.is('has-suffix', hasSuffix.value),
        ns.is('error', (formItem == null ? void 0 : formItem.validateStatus) === 'error')
      ])
      const validate = (value) => {
        if (props.validator) {
          const result = props.validator(value)
          if (typeof result === 'string') {
            validationError.value = result
            return false
          }
          if (!result) {
            validationError.value = t('form.validationFailed')
            return false
          }
        }
        validationError.value = ''
        return true
      }
      const setCurrentValue = (newValue, emitChange = true) => {
        const oldValue = props.modelValue
        if (newValue !== void 0 && newValue !== null) {
          if (Number.isNaN(newValue)) return
          if (props.stepStrictly) {
            newValue = toPrecision(
              Math.round(newValue / props.step) * props.step,
              numPrecision.value
            )
          }
          if (props.precision !== void 0) newValue = toPrecision(newValue, props.precision)
          if (newValue > props.max) newValue = props.max
          if (newValue < props.min) newValue = props.min
        }
        if (oldValue === newValue) return
        if (props.validateEvent) validate(newValue)
        userInput.value = null
        emit('update:modelValue', newValue)
        if (props.validateEvent) {
          nextTick(() => {
            triggerValidate('change')
          })
        }
        if (emitChange) emit('change', newValue, oldValue)
      }
      const increase = () => {
        var _a2
        if (mergedDisabled.value || props.readonly || maxDisabled.value) return
        setCurrentValue(toPrecision(((_a2 = props.modelValue) != null ? _a2 : 0) + props.step))
      }
      const decrease = () => {
        var _a2
        if (mergedDisabled.value || props.readonly || minDisabled.value) return
        setCurrentValue(toPrecision(((_a2 = props.modelValue) != null ? _a2 : 0) - props.step))
      }
      const handleClear = () => {
        if (mergedDisabled.value || props.readonly) return
        setCurrentValue(void 0)
        emit('clear')
      }
      const handleInput = (event) => {
        const target = event.target
        userInput.value = target.value
        emit('input', target.value === '' ? void 0 : Number(target.value))
      }
      const handleChange = (event) => {
        const target = event.target
        const value = target.value
        userInput.value = null
        if (value === '') {
          const clearVal =
            props.valueOnClear === 'min'
              ? props.min
              : props.valueOnClear === 'max'
                ? props.max
                : props.valueOnClear
          setCurrentValue(clearVal === null ? void 0 : clearVal)
          return
        }
        const newValue = Number(value)
        if (!Number.isNaN(newValue)) setCurrentValue(newValue)
      }
      const handleFocus = (event) => {
        focused.value = true
        emit('focus', event)
      }
      const handleBlur = (event) => {
        focused.value = false
        userInput.value = null
        emit('blur', event)
        if (props.validateEvent) {
          nextTick(() => {
            triggerValidate('blur')
          })
        }
      }
      const handleKeydown = (event) => {
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          increase()
        } else if (event.key === 'ArrowDown') {
          event.preventDefault()
          decrease()
        }
      }
      __expose({
        focus: () => {
          var _a2
          return (_a2 = inputRef.value) == null ? void 0 : _a2.focus()
        },
        blur: () => {
          var _a2
          return (_a2 = inputRef.value) == null ? void 0 : _a2.blur()
        },
        clear: handleClear
      })
      const __returned__ = {
        props,
        emit,
        slots,
        ns,
        t,
        themeStyle,
        inputRef,
        inputId,
        focused,
        hovering,
        userInput,
        validationError,
        form,
        formItem,
        triggerValidate,
        globalSize,
        mergedDisabled,
        mergedSize,
        numPrecision,
        getPrecision,
        toPrecision,
        displayValue,
        minDisabled,
        maxDisabled,
        showClear,
        hasPrefix,
        hasSuffix,
        inputNumberClasses,
        validate,
        setCurrentValue,
        increase,
        decrease,
        handleClear,
        handleInput,
        handleChange,
        handleFocus,
        handleBlur,
        handleKeydown,
        computed: computed12,
        ref: ref13,
        useSlots,
        nextTick,
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
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__2.render = render2
var stdin_default3 = __sfc__2

// docs/public/codesandbox-runtime/components/slider/src/slider.js
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
function render3(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock3(),
    _createElementBlock3(
      'div',
      {
        class: _normalizeClass3($setup.sliderClasses),
        style: _normalizeStyle3($setup.sliderStyle)
      },
      [
        _ctx.showInput && !_ctx.range
          ? (_openBlock3(),
            _createElementBlock3(
              'div',
              {
                key: 0,
                class: _normalizeClass3($setup.ns.e('input'))
              },
              [
                _createVNode2(
                  $setup['YhInputNumber'],
                  {
                    'model-value': $setup.firstValue,
                    min: _ctx.min,
                    max: _ctx.max,
                    step: _ctx.step,
                    disabled: $setup.mergedDisabled,
                    size: _ctx.inputSize || $setup.mergedSize,
                    controls: _ctx.showInputControls,
                    onChange: $setup.handleInputChange
                  },
                  null,
                  8,
                  ['model-value', 'min', 'max', 'step', 'disabled', 'size', 'controls']
                )
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode3('v-if', true),
        _createElementVNode3(
          'div',
          {
            ref: 'sliderRef',
            class: _normalizeClass3($setup.ns.e('runway')),
            onMousedown: $setup.onSliderClick
          },
          [
            _createElementVNode3(
              'div',
              {
                class: _normalizeClass3($setup.ns.e('bar')),
                style: _normalizeStyle3($setup.barStyle)
              },
              null,
              6
              /* CLASS, STYLE */
            ),
            _createVNode2(
              $setup['SliderButton'],
              {
                modelValue: $setup.firstValue,
                'onUpdate:modelValue':
                  _cache[0] || (_cache[0] = ($event) => ($setup.firstValue = $event)),
                vertical: $setup.vertical,
                disabled: $setup.mergedDisabled,
                min: _ctx.min,
                max: _ctx.max,
                step: _ctx.step,
                'show-tooltip': _ctx.showTooltip,
                'format-tooltip': _ctx.formatTooltip,
                'tooltip-class': _ctx.tooltipClass,
                placement: _ctx.placement,
                onChange: $setup.handleButtonChange,
                onInput: $setup.handleButtonInput
              },
              _createSlots(
                {
                  _: 2
                  /* DYNAMIC */
                },
                [
                  _ctx.$slots.thumb
                    ? {
                        name: 'thumb',
                        fn: _withCtx2((scope) => [
                          _renderSlot3(
                            _ctx.$slots,
                            'thumb',
                            _normalizeProps(_guardReactiveProps(scope))
                          )
                        ]),
                        key: '0'
                      }
                    : void 0
                ]
              ),
              1032,
              [
                'modelValue',
                'vertical',
                'disabled',
                'min',
                'max',
                'step',
                'show-tooltip',
                'format-tooltip',
                'tooltip-class',
                'placement'
              ]
            ),
            _ctx.range
              ? (_openBlock3(),
                _createBlock2(
                  $setup['SliderButton'],
                  {
                    key: 0,
                    modelValue: $setup.secondValue,
                    'onUpdate:modelValue':
                      _cache[1] || (_cache[1] = ($event) => ($setup.secondValue = $event)),
                    vertical: $setup.vertical,
                    disabled: $setup.mergedDisabled,
                    min: _ctx.min,
                    max: _ctx.max,
                    step: _ctx.step,
                    'show-tooltip': _ctx.showTooltip,
                    'format-tooltip': _ctx.formatTooltip,
                    'tooltip-class': _ctx.tooltipClass,
                    placement: _ctx.placement,
                    onChange: $setup.handleButtonChange,
                    onInput: $setup.handleButtonInput
                  },
                  _createSlots(
                    {
                      _: 2
                      /* DYNAMIC */
                    },
                    [
                      _ctx.$slots.thumb
                        ? {
                            name: 'thumb',
                            fn: _withCtx2((scope) => [
                              _renderSlot3(
                                _ctx.$slots,
                                'thumb',
                                _normalizeProps(_guardReactiveProps(scope))
                              )
                            ]),
                            key: '0'
                          }
                        : void 0
                    ]
                  ),
                  1032,
                  [
                    'modelValue',
                    'vertical',
                    'disabled',
                    'min',
                    'max',
                    'step',
                    'show-tooltip',
                    'format-tooltip',
                    'tooltip-class',
                    'placement'
                  ]
                ))
              : _createCommentVNode3('v-if', true),
            _ctx.showStops
              ? (_openBlock3(true),
                _createElementBlock3(
                  _Fragment,
                  { key: 1 },
                  _renderList($setup.stops, (stop, index) => {
                    return (
                      _openBlock3(),
                      _createElementBlock3(
                        'div',
                        {
                          key: index,
                          class: _normalizeClass3($setup.ns.e('stop')),
                          style: _normalizeStyle3(
                            $setup.vertical
                              ? {
                                  bottom: stop + '%'
                                }
                              : {
                                  left: stop + '%'
                                }
                          )
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
              : _createCommentVNode3('v-if', true),
            $setup.markList.length > 0
              ? (_openBlock3(),
                _createElementBlock3(
                  _Fragment,
                  { key: 2 },
                  [
                    _createElementVNode3('div', null, [
                      (_openBlock3(true),
                      _createElementBlock3(
                        _Fragment,
                        null,
                        _renderList($setup.markList, (item, index) => {
                          return (
                            _openBlock3(),
                            _createElementBlock3(
                              'div',
                              {
                                key: index,
                                class: _normalizeClass3($setup.ns.e('stop')),
                                style: _normalizeStyle3(
                                  $setup.vertical
                                    ? {
                                        bottom: item.point + '%'
                                      }
                                    : {
                                        left: item.point + '%'
                                      }
                                )
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
                    ]),
                    _createElementVNode3(
                      'div',
                      {
                        class: _normalizeClass3($setup.ns.e('marks'))
                      },
                      [
                        (_openBlock3(true),
                        _createElementBlock3(
                          _Fragment,
                          null,
                          _renderList($setup.markList, (item, index) => {
                            return (
                              _openBlock3(),
                              _createElementBlock3(
                                'div',
                                {
                                  key: index,
                                  class: _normalizeClass3($setup.ns.e('mark-text')),
                                  style: _normalizeStyle3(
                                    $setup.vertical
                                      ? {
                                          bottom: item.point + '%'
                                        }
                                      : {
                                          left: item.point + '%'
                                        }
                                  )
                                },
                                [
                                  _renderSlot3(
                                    _ctx.$slots,
                                    'mark',
                                    {
                                      mark: item.label.label
                                    },
                                    () => [
                                      _createElementVNode3(
                                        'div',
                                        {
                                          style: _normalizeStyle3(item.label.style)
                                        },
                                        _toDisplayString3(item.label.label),
                                        5
                                        /* TEXT, STYLE */
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
                      2
                      /* CLASS */
                    )
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              : _createCommentVNode3('v-if', true)
          ],
          34
          /* CLASS, NEED_HYDRATION */
        ),
        _renderSlot3(_ctx.$slots, 'default')
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
var __sfc__3 = /* @__PURE__ */ Object.assign(
  {
    name: 'YhSlider'
  },
  {
    __name: 'slider',
    props: sliderProps,
    emits: sliderEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const { vertical } = toRefs(props)
      const emit = __emit
      const ns = useNamespace('slider')
      const { form, formItem, validate: triggerValidate } = useFormItem()
      const { themeStyle } = useComponentTheme(
        'slider',
        computed13(() => props.themeOverrides)
      )
      const { globalSize } = useConfig()
      const sliderRef = ref14()
      const firstValue = ref14(0)
      const secondValue = ref14(0)
      const mergedDisabled = computed13(
        () => props.disabled || (form == null ? void 0 : form.disabled) || false
      )
      const mergedSize = computed13(() => {
        const size =
          props.size ||
          (formItem == null ? void 0 : formItem.size) ||
          (form == null ? void 0 : form.size) ||
          globalSize.value ||
          'default'
        return size === '' ? 'default' : size
      })
      provide2('slider', {
        sliderRef,
        props,
        emit
      })
      const initValues = () => {
        if (props.range && Array.isArray(props.modelValue)) {
          firstValue.value = Math.max(props.min, Math.min(props.max, props.modelValue[0] || 0))
          secondValue.value = Math.max(props.min, Math.min(props.max, props.modelValue[1] || 0))
        } else {
          const val = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue
          firstValue.value = Math.max(props.min, Math.min(props.max, Number(val) || 0))
          secondValue.value = props.min
        }
      }
      watch4(
        () => props.modelValue,
        () => {
          initValues()
        },
        { deep: true }
      )
      initValues()
      const minValue = computed13(() =>
        props.range ? Math.min(firstValue.value, secondValue.value) : props.min
      )
      const maxValue = computed13(() =>
        props.range ? Math.max(firstValue.value, secondValue.value) : firstValue.value
      )
      const barSize = computed13(() => {
        return props.range
          ? `${(100 * (maxValue.value - minValue.value)) / (props.max - props.min)}%`
          : `${(100 * (firstValue.value - props.min)) / (props.max - props.min)}%`
      })
      const barStart = computed13(() => {
        return props.range
          ? `${(100 * (minValue.value - props.min)) / (props.max - props.min)}%`
          : '0%'
      })
      const barStyle = computed13(() => {
        const style = props.vertical
          ? {
              height: barSize.value,
              bottom: barStart.value,
              top: 'auto'
            }
          : {
              width: barSize.value,
              left: barStart.value,
              right: 'auto'
            }
        if (props.color) {
          style.background = props.color
        }
        return style
      })
      const stops = computed13(() => {
        if (!props.showStops || props.min >= props.max) return []
        const stopCount = (props.max - props.min) / props.step
        const stepWidth = 100 / stopCount
        const result = []
        for (let i = 1; i < stopCount; i++) {
          result.push(i * stepWidth)
        }
        if (props.range) {
          return result.filter((step) => {
            const val = props.min + (step * (props.max - props.min)) / 100
            return val < minValue.value || val > maxValue.value
          })
        } else {
          return result.filter(
            (step) => props.min + (step * (props.max - props.min)) / 100 > firstValue.value
          )
        }
      })
      const markList = computed13(() => {
        if (!props.marks) return []
        const marksKeys = Object.keys(props.marks)
          .map(Number)
          .filter((n) => !isNaN(n) && n >= props.min && n <= props.max)
        return marksKeys.map((key) => {
          var _a2
          const mark = (_a2 = props.marks) == null ? void 0 : _a2[key]
          return {
            point: ((key - props.min) / (props.max - props.min)) * 100,
            label:
              typeof mark === 'string'
                ? { label: mark, style: void 0 }
                : mark != null
                  ? mark
                  : { label: '', style: void 0 }
          }
        })
      })
      const sliderClasses = computed13(() =>
        [
          ns.b(),
          ns.m(mergedSize.value),
          vertical.value ? ns.is('vertical') : '',
          mergedDisabled.value ? ns.is('disabled') : '',
          props.showInput && !props.range ? ns.is('with-input') : ''
        ].filter(Boolean)
      )
      const sliderStyle = computed13(() => {
        const style = {}
        if (props.color) {
          style['--yh-slider-main-color'] = props.color
          style['--yh-slider-secondary-color'] = props.color
        }
        if (props.vertical && props.height) {
          style.height = props.height
        }
        return __spreadValues2(__spreadValues2({}, themeStyle.value), style)
      })
      const emitValue = (val) => {
        emit('update:modelValue', val)
        emit('input', val)
        if (props.validateEvent) {
          triggerValidate('change')
        }
      }
      const updateValue = (isChange = false) => {
        const val = props.range ? [minValue.value, maxValue.value] : firstValue.value
        emitValue(val)
        if (isChange) {
          emit('change', val)
        }
      }
      const handleButtonChange = () => updateValue(true)
      const handleButtonInput = () => updateValue(false)
      const onSliderClick = (event) => {
        if (mergedDisabled.value) return
        const slider = sliderRef.value
        if (!slider) return
        const rect = slider.getBoundingClientRect()
        let percent = 0
        if (props.vertical) {
          const clientY = event.clientY
          percent = ((rect.bottom - clientY) / rect.height) * 100
        } else {
          const clientX = event.clientX
          percent = ((clientX - rect.left) / rect.width) * 100
        }
        if (percent < 0) percent = 0
        if (percent > 100) percent = 100
        const lengthPerStep = 100 / ((props.max - props.min) / props.step)
        const steps = Math.round(percent / lengthPerStep)
        let value = steps * lengthPerStep * (props.max - props.min) * 0.01 + props.min
        value = parseFloat(value.toFixed(getPrecision(props.step)))
        if (props.range) {
          if (Math.abs(value - firstValue.value) < Math.abs(value - secondValue.value)) {
            firstValue.value = value
          } else {
            secondValue.value = value
          }
        } else {
          firstValue.value = value
        }
        updateValue()
      }
      const getPrecision = (step) => {
        const stepStr = step.toString()
        const dotIndex = stepStr.indexOf('.')
        return dotIndex > -1 ? stepStr.length - dotIndex - 1 : 0
      }
      const handleInputChange = (val) => {
        if (val === void 0) return
        firstValue.value = val
        updateValue()
      }
      onMounted3(() => {
        initValues()
      })
      const __returned__ = {
        props,
        vertical,
        emit,
        ns,
        form,
        formItem,
        triggerValidate,
        themeStyle,
        globalSize,
        sliderRef,
        firstValue,
        secondValue,
        mergedDisabled,
        mergedSize,
        initValues,
        minValue,
        maxValue,
        barSize,
        barStart,
        barStyle,
        stops,
        markList,
        sliderClasses,
        sliderStyle,
        emitValue,
        updateValue,
        handleButtonChange,
        handleButtonInput,
        onSliderClick,
        getPrecision,
        handleInputChange,
        ref: ref14,
        computed: computed13,
        watch: watch4,
        onMounted: onMounted3,
        provide: provide2,
        toRefs,
        get useNamespace() {
          return useNamespace
        },
        get useFormItem() {
          return useFormItem
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get useConfig() {
          return useConfig
        },
        get sliderProps() {
          return sliderProps
        },
        get sliderEmits() {
          return sliderEmits
        },
        SliderButton: stdin_default2,
        YhInputNumber: stdin_default3
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__3.render = render3
var stdin_default4 = __sfc__3
export { stdin_default4 as default }
