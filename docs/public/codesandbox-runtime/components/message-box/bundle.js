// public/codesandbox-runtime/components/message-box/src/message-box.js
import { normalizeClass as _normalizeClass3, openBlock as _openBlock4, createElementBlock as _createElementBlock4, createCommentVNode as _createCommentVNode4, toDisplayString as _toDisplayString2, createElementVNode as _createElementVNode3, createVNode as _createVNode, resolveDynamicComponent as _resolveDynamicComponent4, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, createBlock as _createBlock4, mergeProps as _mergeProps2, withKeys as _withKeys, vShow as _vShow, withDirectives as _withDirectives, Transition as _Transition, withCtx as _withCtx2, createTextVNode as _createTextVNode, normalizeStyle as _normalizeStyle3 } from "vue";
import {
  ref as ref14,
  reactive,
  computed as computed14,
  watch as watch5,
  h,
  onMounted as onMounted4,
  onUnmounted as onUnmounted4,
  markRaw,
  nextTick as nextTick2,
  shallowReactive
} from "vue";

// public/codesandbox-runtime/hooks/use-namespace/index.js
import { inject, ref, unref } from "vue";
var defaultNamespace = "yh";
var statePrefix = "is-";
var namespaceContextKey = Symbol("namespaceContextKey");
var useGlobalNamespace = () => {
  return inject(namespaceContextKey, ref(defaultNamespace));
};
var useNamespace = (block) => {
  const namespace = useGlobalNamespace();
  const b = (blockSuffix = "") => {
    const ns = unref(namespace);
    return blockSuffix ? `${ns}-${block}-${blockSuffix}` : `${ns}-${block}`;
  };
  const e = (element) => {
    return element ? `${b()}__${element}` : "";
  };
  const m = (modifier) => {
    return modifier ? `${b()}--${modifier}` : "";
  };
  const bem = (blockSuffix, element, modifier) => {
    let cls = b(blockSuffix);
    if (element) cls += `__${element}`;
    if (modifier) cls += `--${modifier}`;
    return cls;
  };
  const em = (element, modifier) => {
    return element && modifier ? `${b()}__${element}--${modifier}` : "";
  };
  function is(state, value) {
    if (arguments.length === 1) {
      return `${statePrefix}${state}`;
    }
    return value ? `${statePrefix}${state}` : "";
  }
  const cssVar = (name) => {
    return `--${unref(namespace)}-${block}-${name}`;
  };
  const cssVarObj = (vars) => {
    const obj = {};
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVar(key)] = value;
    });
    return obj;
  };
  const cssVarBlock = (name) => {
    return `--${unref(namespace)}-${name}`;
  };
  const cssVarBlockObj = (vars) => {
    const obj = {};
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVarBlock(key)] = value;
    });
    return obj;
  };
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
  };
};

// public/codesandbox-runtime/hooks/use-z-index/index.js
import { computed, inject as inject2, unref as unref2 } from "vue";
var zIndexContextKey = Symbol("zIndexContextKey");
var zIndexCounterKey = Symbol("zIndexCounterKey");

// public/codesandbox-runtime/hooks/use-sku/index.js
import { ref as ref2, computed as computed2 } from "vue";

// public/codesandbox-runtime/hooks/use-countdown/index.js
import { ref as ref3, computed as computed3, onUnmounted } from "vue";

// public/codesandbox-runtime/hooks/use-locale/index.js
import { computed as computed5, unref as unref4, watch } from "vue";

// public/codesandbox-runtime/locale/lang/zh-cn.js
var zhCn = {
  name: "zh-cn",
  yh: {
    // 通用
    common: {
      yes: "\u662F",
      no: "\u5426",
      confirm: "\u786E\u8BA4",
      cancel: "\u53D6\u6D88",
      loading: "\u52A0\u8F7D\u4E2D",
      close: "\u5173\u95ED",
      clear: "\u6E05\u7A7A",
      reset: "\u91CD\u7F6E",
      save: "\u4FDD\u5B58",
      delete: "\u5220\u9664",
      edit: "\u7F16\u8F91",
      add: "\u65B0\u589E",
      search: "\u641C\u7D22",
      refresh: "\u5237\u65B0",
      expand: "\u5C55\u5F00",
      collapse: "\u6536\u8D77",
      more: "\u66F4\u591A",
      noData: "\u6682\u65E0\u6570\u636E",
      noMatch: "\u65E0\u5339\u914D\u6570\u636E",
      selectAll: "\u5168\u9009",
      unselectAll: "\u53D6\u6D88\u5168\u9009"
    },
    // 颜色选择器
    colorpicker: {
      confirm: "\u786E\u5B9A",
      clear: "\u6E05\u7A7A",
      eyeDropper: "\u5438\u8272\u5668",
      suggestionDark: "\u767D\u8272\u6587\u5B57\u6700\u4F73",
      suggestionLight: "\u9ED1\u8272\u6587\u5B57\u6700\u4F73",
      recentColors: "\u6700\u8FD1\u4F7F\u7528",
      presetColors: "\u9884\u8BBE\u989C\u8272"
    },
    // 日期选择器
    datepicker: {
      now: "\u6B64\u523B",
      today: "\u4ECA\u5929",
      cancel: "\u53D6\u6D88",
      clear: "\u6E05\u7A7A",
      confirm: "\u786E\u5B9A",
      selectDate: "\u9009\u62E9\u65E5\u671F",
      selectTime: "\u9009\u62E9\u65F6\u95F4",
      startDate: "\u5F00\u59CB\u65E5\u671F",
      startTime: "\u5F00\u59CB\u65F6\u95F4",
      endDate: "\u7ED3\u675F\u65E5\u671F",
      endTime: "\u7ED3\u675F\u65F6\u95F4",
      year: "\u5E74",
      month: "\u6708",
      day: "\u65E5",
      week: "\u5468",
      monthBeforeYear: false,
      prevYear: "\u4E0A\u4E00\u5E74",
      nextYear: "\u4E0B\u4E00\u5E74",
      prevMonth: "\u4E0A\u4E2A\u6708",
      nextMonth: "\u4E0B\u4E2A\u6708",
      weeks: {
        sun: "\u65E5",
        mon: "\u4E00",
        tue: "\u4E8C",
        wed: "\u4E09",
        thu: "\u56DB",
        fri: "\u4E94",
        sat: "\u516D"
      },
      months: {
        jan: "\u4E00\u6708",
        feb: "\u4E8C\u6708",
        mar: "\u4E09\u6708",
        apr: "\u56DB\u6708",
        may: "\u4E94\u6708",
        jun: "\u516D\u6708",
        jul: "\u4E03\u6708",
        aug: "\u516B\u6708",
        sep: "\u4E5D\u6708",
        oct: "\u5341\u6708",
        nov: "\u5341\u4E00\u6708",
        dec: "\u5341\u4E8C\u6708"
      },
      quarters: {
        q1: "\u7B2C\u4E00\u5B63\u5EA6",
        q2: "\u7B2C\u4E8C\u5B63\u5EA6",
        q3: "\u7B2C\u4E09\u5B63\u5EA6",
        q4: "\u7B2C\u56DB\u5B63\u5EA6"
      }
    },
    // 时间选择器
    timepicker: {
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88",
      now: "\u6B64\u523B",
      placeholder: "\u9009\u62E9\u65F6\u95F4",
      startPlaceholder: "\u5F00\u59CB\u65F6\u95F4",
      endPlaceholder: "\u7ED3\u675F\u65F6\u95F4",
      selectTime: "\u9009\u62E9\u65F6\u95F4"
    },
    // 时间选择
    timeselect: {
      placeholder: "\u9009\u62E9\u65F6\u95F4"
    },
    // 树
    tree: {
      emptyText: "\u6682\u65E0\u6570\u636E",
      loading: "\u52A0\u8F7D\u4E2D...",
      checkAll: "\u5168\u9009",
      uncheckAll: "\u53D6\u6D88\u5168\u9009",
      expandAll: "\u5C55\u5F00\u5168\u90E8",
      collapseAll: "\u6536\u8D77\u5168\u90E8"
    },
    // 树选择
    treeselect: {
      placeholder: "\u8BF7\u9009\u62E9",
      emptyText: "\u6682\u65E0\u6570\u636E",
      loading: "\u52A0\u8F7D\u4E2D...",
      noMatch: "\u65E0\u5339\u914D\u6570\u636E"
    },
    // 日历
    calendar: {
      prevMonth: "\u4E0A\u4E2A\u6708",
      nextMonth: "\u4E0B\u4E2A\u6708",
      prevYear: "\u4E0A\u4E00\u5E74",
      nextYear: "\u4E0B\u4E00\u5E74",
      today: "\u4ECA\u5929",
      week: "\u5468",
      holiday: "\u4F11",
      workday: "\u73ED",
      monthHeaderFormat: "YYYY\u5E74M\u6708",
      weeks: {
        sun: "\u65E5",
        mon: "\u4E00",
        tue: "\u4E8C",
        wed: "\u4E09",
        thu: "\u56DB",
        fri: "\u4E94",
        sat: "\u516D"
      }
    },
    // 自动完成
    autocomplete: {
      loading: "\u52A0\u8F7D\u4E2D...",
      placeholder: "\u8BF7\u8F93\u5165",
      noData: "\u6682\u65E0\u6570\u636E",
      noMatch: "\u65E0\u5339\u914D\u6570\u636E"
    },
    // 倒计时
    countdown: {
      days: "\u5929",
      hours: "\u65F6",
      minutes: "\u5206",
      seconds: "\u79D2",
      milliseconds: "\u6BEB\u79D2",
      finished: "\u5DF2\u7ED3\u675F"
    },
    // 级联选择
    cascader: {
      noMatch: "\u65E0\u5339\u914D\u6570\u636E",
      placeholder: "\u8BF7\u9009\u62E9",
      loading: "\u52A0\u8F7D\u4E2D...",
      noData: "\u6682\u65E0\u6570\u636E"
    },
    // 穿梭框
    transfer: {
      noMatch: "\u65E0\u5339\u914D\u6570\u636E",
      noData: "\u65E0\u6570\u636E",
      titles: ["\u5217\u8868 1", "\u5217\u8868 2"],
      filterPlaceholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
      noCheckedFormat: "\u5171 {total} \u9879",
      hasCheckedFormat: "\u5DF2\u9009 {checked}/{total} \u9879",
      searchPlaceholder: "\u8BF7\u8F93\u5165\u5173\u952E\u8BCD"
    },
    // 表格
    table: {
      emptyText: "\u6682\u65E0\u6570\u636E",
      confirmFilter: "\u7B5B\u9009",
      resetFilter: "\u91CD\u7F6E",
      clearFilter: "\u5168\u90E8",
      sumText: "\u5408\u8BA1",
      loading: "\u6B63\u5728\u52A0\u8F7D...",
      index: "\u5E8F\u53F7",
      print: "\u6253 \u5370",
      cancel: "\u53D6 \u6D88",
      preview: "\u6253\u5370\u9884\u89C8",
      printTime: "\u6253\u5370\u65F6\u95F4",
      total: "\u5171 {total} \u6761",
      page: "\u7B2C {page} \u9875",
      yes: "\u662F",
      no: "\u5426",
      // 工具栏
      toolbar: {
        refresh: "\u5237\u65B0",
        density: "\u5BC6\u5EA6",
        densityDefault: "\u9ED8\u8BA4",
        densityLarge: "\u5BBD\u677E",
        densitySmall: "\u7D27\u51D1",
        columnSetting: "\u5217\u8BBE\u7F6E",
        fullscreen: "\u5168\u5C4F",
        exitFullscreen: "\u9000\u51FA\u5168\u5C4F",
        export: "\u5BFC\u51FA",
        import: "\u5BFC\u5165",
        search: "\u641C\u7D22",
        searchPlaceholder: "\u8BF7\u8F93\u5165\u5173\u952E\u8BCD\u641C\u7D22"
      },
      // 筛选
      filter: {
        selectAll: "\u5168\u9009",
        selectInvert: "\u53CD\u9009",
        empty: "\u4E3A\u7A7A",
        notEmpty: "\u4E0D\u4E3A\u7A7A",
        contains: "\u5305\u542B",
        notContains: "\u4E0D\u5305\u542B",
        equals: "\u7B49\u4E8E",
        notEquals: "\u4E0D\u7B49\u4E8E",
        startsWith: "\u5F00\u5934\u662F",
        endsWith: "\u7ED3\u5C3E\u662F",
        greaterThan: "\u5927\u4E8E",
        lessThan: "\u5C0F\u4E8E",
        between: "\u4ECB\u4E8E"
      },
      // 排序
      sort: {
        asc: "\u5347\u5E8F",
        desc: "\u964D\u5E8F",
        clear: "\u53D6\u6D88\u6392\u5E8F"
      },
      // 导出
      export: {
        title: "\u5BFC\u51FA\u6570\u636E",
        filename: "\u6587\u4EF6\u540D",
        type: "\u6587\u4EF6\u7C7B\u578B",
        scope: "\u5BFC\u51FA\u8303\u56F4",
        scopeAll: "\u5168\u90E8\u6570\u636E",
        scopeSelected: "\u9009\u4E2D\u6570\u636E",
        scopeCurrentPage: "\u5F53\u524D\u9875\u6570\u636E",
        includeHeader: "\u5305\u542B\u8868\u5934",
        exporting: "\u6B63\u5728\u5BFC\u51FA...",
        success: "\u5BFC\u51FA\u6210\u529F",
        error: "\u5BFC\u51FA\u5931\u8D25"
      },
      // 导入
      import: {
        title: "\u5BFC\u5165\u6570\u636E",
        selectFile: "\u9009\u62E9\u6587\u4EF6",
        dragTip: "\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904\u4E0A\u4F20",
        importing: "\u6B63\u5728\u5BFC\u5165...",
        success: "\u5BFC\u5165\u6210\u529F",
        error: "\u5BFC\u5165\u5931\u8D25",
        preview: "\u6570\u636E\u9884\u89C8",
        confirm: "\u786E\u8BA4\u5BFC\u5165"
      },
      // 打印
      printConfig: {
        title: "\u6253\u5370\u8BBE\u7F6E",
        pageTitle: "\u9875\u9762\u6807\u9898",
        pageHeader: "\u9875\u7709",
        pageFooter: "\u9875\u811A",
        printAll: "\u6253\u5370\u5168\u90E8",
        printSelected: "\u6253\u5370\u9009\u4E2D",
        printCurrentPage: "\u6253\u5370\u5F53\u524D\u9875",
        landscape: "\u6A2A\u5411",
        portrait: "\u7EB5\u5411",
        printing: "\u6B63\u5728\u6253\u5370..."
      },
      // 列设置
      columnSetting: {
        title: "\u5217\u8BBE\u7F6E",
        showAll: "\u663E\u793A\u5168\u90E8",
        hideAll: "\u9690\u85CF\u5168\u90E8",
        reset: "\u91CD\u7F6E",
        fixedLeft: "\u56FA\u5B9A\u5728\u5DE6\u4FA7",
        fixedRight: "\u56FA\u5B9A\u5728\u53F3\u4FA7",
        unfixed: "\u53D6\u6D88\u56FA\u5B9A"
      },
      // 右键菜单
      contextMenu: {
        copy: "\u590D\u5236",
        copyRow: "\u590D\u5236\u884C",
        copyCell: "\u590D\u5236\u5355\u5143\u683C",
        paste: "\u7C98\u8D34",
        insertRowAbove: "\u5728\u4E0A\u65B9\u63D2\u5165\u884C",
        insertRowBelow: "\u5728\u4E0B\u65B9\u63D2\u5165\u884C",
        deleteRow: "\u5220\u9664\u884C",
        deleteSelectedRows: "\u5220\u9664\u9009\u4E2D\u884C",
        exportSelected: "\u5BFC\u51FA\u9009\u4E2D\u6570\u636E"
      },
      // 选择
      selection: {
        selectAll: "\u5168\u9009",
        selectInvert: "\u53CD\u9009",
        selectNone: "\u53D6\u6D88\u9009\u62E9",
        selected: "\u5DF2\u9009\u62E9 {count} \u9879"
      },
      // 展开
      expand: {
        expandAll: "\u5C55\u5F00\u5168\u90E8",
        collapseAll: "\u6536\u8D77\u5168\u90E8"
      },
      // 树形
      tree: {
        expandAll: "\u5C55\u5F00\u5168\u90E8",
        collapseAll: "\u6536\u8D77\u5168\u90E8",
        expandLevel: "\u5C55\u5F00\u5230\u7B2C {level} \u5C42"
      },
      // 拖拽
      drag: {
        dragTip: "\u62D6\u62FD\u4EE5\u8C03\u6574\u987A\u5E8F",
        dropTip: "\u91CA\u653E\u4EE5\u653E\u7F6E"
      }
    },
    // 消息框
    messagebox: {
      title: "\u63D0\u793A",
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88",
      close: "\u5173\u95ED",
      error: "\u8F93\u5165\u7684\u6570\u636E\u4E0D\u5408\u6CD5!",
      alert: "\u8B66\u544A",
      prompt: "\u8BF7\u8F93\u5165",
      inputPlaceholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    // 上传
    upload: {
      deleteTip: "\u6309 delete \u952E\u53EF\u5220\u9664",
      delete: "\u5220\u9664",
      preview: "\u67E5\u770B\u56FE\u7247",
      continue: "\u7EE7\u7EED\u4E0A\u4F20",
      upload: "\u70B9\u51FB\u4E0A\u4F20",
      tip: "\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904<em>\u4E0A\u4F20</em>",
      dragTip: "\u5C06\u6587\u4EF6\u62D6\u5230\u6B64\u5904\uFF0C\u6216\u70B9\u51FB\u4E0A\u4F20",
      uploading: "\u4E0A\u4F20\u4E2D...",
      success: "\u4E0A\u4F20\u6210\u529F",
      error: "\u4E0A\u4F20\u5931\u8D25",
      retry: "\u91CD\u65B0\u4E0A\u4F20",
      cancel: "\u53D6\u6D88\u4E0A\u4F20",
      fileTypeError: "\u6587\u4EF6\u7C7B\u578B\u4E0D\u652F\u6301",
      fileSizeError: "\u6587\u4EF6\u5927\u5C0F\u8D85\u51FA\u9650\u5236",
      fileCountError: "\u6587\u4EF6\u6570\u91CF\u8D85\u51FA\u9650\u5236"
    },
    // 表单
    form: {
      validationFailed: "\u6821\u9A8C\u5931\u8D25",
      required: "\u5FC5\u586B\u9879",
      pleaseInput: "\u8BF7\u8F93\u5165",
      pleaseSelect: "\u8BF7\u9009\u62E9"
    },
    // 按钮
    button: {
      loading: "\u52A0\u8F7D\u4E2D..."
    },
    // 输入框
    input: {
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      clear: "\u6E05\u7A7A",
      showPassword: "\u663E\u793A\u5BC6\u7801",
      hidePassword: "\u9690\u85CF\u5BC6\u7801",
      copy: "\u590D\u5236",
      copied: "\u5DF2\u590D\u5236"
    },
    // 数字输入框
    inputnumber: {
      placeholder: "\u8BF7\u8F93\u5165\u6570\u5B57",
      increase: "\u589E\u52A0",
      decrease: "\u51CF\u5C11"
    },
    // 标签输入
    inputtag: {
      placeholder: "\u8BF7\u8F93\u5165",
      add: "\u6DFB\u52A0",
      remove: "\u79FB\u9664"
    },
    // 面包屑
    breadcrumb: {
      label: "\u9762\u5305\u5C51",
      more: "\u66F4\u591A"
    },
    // 返回顶部
    backtop: {
      text: "\u56DE\u5230\u9876\u90E8"
    },
    // 选择器
    select: {
      placeholder: "\u8BF7\u9009\u62E9",
      noData: "\u6682\u65E0\u6570\u636E",
      loading: "\u52A0\u8F7D\u4E2D...",
      noMatch: "\u65E0\u5339\u914D\u6570\u636E",
      selectAll: "\u5168\u9009",
      clearAll: "\u6E05\u7A7A"
    },
    // 分页
    pagination: {
      goto: "\u524D\u5F80",
      page: "\u9875",
      total: "\u5171 {total} \u6761",
      pageSize: "\u6761/\u9875",
      prev: "\u4E0A\u4E00\u9875",
      next: "\u4E0B\u4E00\u9875",
      first: "\u9996\u9875",
      last: "\u672B\u9875",
      pageClassifier: "\u9875"
    },
    // 气泡确认
    popconfirm: {
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88",
      dontAskAgain: "\u4E0D\u518D\u63D0\u793A"
    },
    // 对话框
    dialog: {
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88",
      close: "\u5173\u95ED",
      maximize: "\u6700\u5927\u5316",
      restore: "\u8FD8\u539F"
    },
    // 抽屉
    drawer: {
      close: "\u5173\u95ED",
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88"
    },
    // 下拉菜单
    dropdown: {
      loading: "\u52A0\u8F7D\u4E2D..."
    },
    // 图片
    image: {
      error: "\u52A0\u8F7D\u5931\u8D25",
      loading: "\u52A0\u8F7D\u4E2D...",
      preview: "\u9884\u89C8",
      zoomIn: "\u653E\u5927",
      zoomOut: "\u7F29\u5C0F",
      rotateLeft: "\u5411\u5DE6\u65CB\u8F6C",
      rotateRight: "\u5411\u53F3\u65CB\u8F6C",
      originalSize: "\u539F\u59CB\u5927\u5C0F",
      fullscreen: "\u5168\u5C4F"
    },
    // 图片预览
    imageviewer: {
      close: "\u5173\u95ED",
      prev: "\u4E0A\u4E00\u5F20",
      next: "\u4E0B\u4E00\u5F20",
      zoomIn: "\u653E\u5927",
      zoomOut: "\u7F29\u5C0F",
      rotateLeft: "\u5411\u5DE6\u65CB\u8F6C",
      rotateRight: "\u5411\u53F3\u65CB\u8F6C",
      reset: "\u91CD\u7F6E",
      fullscreen: "\u5168\u5C4F",
      exitFullscreen: "\u9000\u51FA\u5168\u5C4F"
    },
    // 无限滚动
    infinitescroll: {
      loading: "\u52A0\u8F7D\u4E2D...",
      finished: "\u6CA1\u6709\u66F4\u591A\u4E86",
      error: "\u52A0\u8F7D\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5",
      retry: "\u70B9\u51FB\u91CD\u8BD5"
    },
    // 消息
    message: {
      close: "\u5173\u95ED"
    },
    // 通知
    notification: {
      close: "\u5173\u95ED"
    },
    // 加载
    loading: {
      text: "\u52A0\u8F7D\u4E2D..."
    },
    // 加载中
    spin: {
      text: "\u52A0\u8F7D\u4E2D..."
    },
    // 评分
    rate: {
      texts: ["\u6781\u5DEE", "\u5931\u671B", "\u4E00\u822C", "\u6EE1\u610F", "\u60CA\u559C"]
    },
    // 警告
    alert: {
      close: "\u5173\u95ED"
    },
    // 标签
    tag: {
      close: "\u5173\u95ED"
    },
    // 标签页
    tabs: {
      close: "\u5173\u95ED",
      add: "\u65B0\u589E",
      more: "\u66F4\u591A"
    },
    // 步骤条
    steps: {
      finish: "\u5DF2\u5B8C\u6210",
      process: "\u8FDB\u884C\u4E2D",
      wait: "\u7B49\u5F85\u4E2D",
      error: "\u9519\u8BEF"
    },
    // 进度条
    progress: {
      success: "\u6210\u529F",
      exception: "\u5F02\u5E38",
      warning: "\u8B66\u544A"
    },
    // 骨架屏
    skeleton: {
      loading: "\u52A0\u8F7D\u4E2D..."
    },
    // 空状态
    empty: {
      description: "\u6682\u65E0\u6570\u636E",
      noData: "\u6682\u65E0\u6570\u636E",
      noResult: "\u6682\u65E0\u7ED3\u679C",
      networkError: "\u7F51\u7EDC\u9519\u8BEF",
      serverError: "\u670D\u52A1\u5668\u9519\u8BEF"
    },
    // 结果
    result: {
      success: "\u64CD\u4F5C\u6210\u529F",
      error: "\u64CD\u4F5C\u5931\u8D25",
      warning: "\u8B66\u544A",
      info: "\u63D0\u793A",
      backHome: "\u8FD4\u56DE\u9996\u9875"
    },
    // 瀑布流
    waterfall: {
      loading: "\u52A0\u8F7D\u4E2D...",
      noMore: "\u6CA1\u6709\u66F4\u591A\u4E86",
      empty: "\u6682\u65E0\u6570\u636E"
    },
    // 描述列表
    descriptions: {
      colon: "\uFF1A"
    },
    // 滑块
    slider: {
      tipFormatter: "{value}"
    },
    // 开关
    switch: {
      on: "\u5F00",
      off: "\u5173"
    },
    // 复选框
    checkbox: {
      selectAll: "\u5168\u9009"
    },
    // 单选框
    radio: {},
    // 菜单
    menu: {
      collapse: "\u6536\u8D77\u83DC\u5355",
      expand: "\u5C55\u5F00\u83DC\u5355"
    },
    // 卡片
    card: {
      collapse: "\u6536\u8D77",
      expand: "\u5C55\u5F00"
    },
    // 折叠面板
    collapse: {
      expand: "\u5C55\u5F00",
      collapse: "\u6536\u8D77"
    },
    // 工具提示
    tooltip: {},
    // 气泡卡片
    popover: {},
    // 徽标
    badge: {},
    // 头像
    avatar: {
      error: "\u52A0\u8F7D\u5931\u8D25"
    },
    // 水印
    watermark: {},
    // 分割线
    divider: {},
    // 走马灯
    carousel: {
      prev: "\u4E0A\u4E00\u5F20",
      next: "\u4E0B\u4E00\u5F20"
    },
    // 跑马灯
    marquee: {},
    // 固钉
    affix: {},
    // 流程图
    flow: {
      zoomIn: "\u653E\u5927\u753B\u5E03",
      zoomOut: "\u7F29\u5C0F\u753B\u5E03",
      fitView: "\u81EA\u9002\u5E94\u89C6\u56FE",
      lock: "\u9501\u5B9A/\u89E3\u9501\u753B\u5E03"
    },
    // 锚点
    anchor: {},
    // 提及
    mention: {
      placeholder: "\u8BF7\u8F93\u5165",
      loading: "\u52A0\u8F7D\u4E2D...",
      noData: "\u6682\u65E0\u6570\u636E"
    },
    // SKU 选择器
    skuselector: {
      placeholder: "\u8BF7\u9009\u62E9\u89C4\u683C",
      emptyText: "\u6682\u65E0\u89C4\u683C",
      stock: "\u5E93\u5B58",
      price: "\u4EF7\u683C",
      selected: "\u5DF2\u9009",
      outOfStock: "\u6682\u65F6\u65E0\u8D27"
    },
    // 商品卡片
    productcard: {
      viewDetails: "\u67E5\u770B\u8BE6\u60C5",
      buyNow: "\u7ACB\u5373\u8D2D\u4E70",
      addToCart: "\u52A0\u5165\u8D2D\u7269\u8F66",
      sold: "\u5DF2\u552E"
    },
    // 价格
    price: {
      original: "\u539F\u4EF7"
    },
    // 优惠券
    couponcard: {
      available: "\u70B9\u51FB\u9886\u53D6",
      used: "\u5DF2\u4F7F\u7528",
      expired: "\u5DF2\u8FC7\u671F",
      received: "\u5DF2\u9886\u53D6",
      limit: "\u6EE1 {threshold} \u5143\u53EF\u7528",
      noThreshold: "\u65E0\u95E8\u69DB",
      validPeriod: "\u6709\u6548\u671F",
      ruleTitle: "\u4F7F\u7528\u8BF4\u660E\u53CA\u89C4\u5219"
    },
    // 幸运抽奖
    luckydraw: {
      start: "\u5F00\u59CB\u62BD\u5956",
      drawing: "\u62BD\u5956\u4E2D...",
      end: "\u4E2D\u5956\u4E86",
      retry: "\u518D\u8BD5\u4E00\u6B21"
    },
    // 筛选排序栏
    filterbar: {
      all: "\u5168\u90E8",
      sort: "\u6392\u5E8F",
      filter: "\u7B5B\u9009",
      reset: "\u91CD\u7F6E",
      confirm: "\u786E\u5B9A",
      noOptions: "\u6682\u65E0\u7B5B\u9009\u9879",
      asc: "\u5347\u5E8F",
      desc: "\u964D\u5E8F",
      selected: "\u5DF2\u9009"
    },
    // 结算栏
    submitbar: {
      total: "\u5C0F\u8BA1\uFF1A",
      selected: "\u5DF2\u9009 {count} \u4EF6",
      submit: "\u53BB\u7ED3\u7B97",
      allSelect: "\u5168\u9009"
    },
    // 品类导航
    categorynav: {
      all: "\u5168\u90E8",
      noData: "\u6682\u65E0\u6570\u636E",
      loading: "\u52A0\u8F7D\u4E2D..."
    },
    // 智能地址
    smartaddress: {
      placeholder: "\u8BF7\u7C98\u8D34\u6536\u8D27\u5730\u5740\uFF0C\u81EA\u52A8\u8BC6\u522B\u59D3\u540D\u3001\u624B\u673A\u53F7\u3001\u5730\u5740",
      parse: "\u667A\u80FD\u8BC6\u522B",
      province: "\u7701/\u5E02/\u533A",
      city: "\u5E02",
      district: "\u533A/\u53BF",
      street: "\u8857\u9053/\u9547",
      detail: "\u8BE6\u7EC6\u5730\u5740",
      phone: "\u624B\u673A\u53F7",
      name: "\u6536\u8D27\u4EBA",
      parseSuccess: "\u5730\u5740\u8BC6\u522B\u6210\u529F",
      parseFailed: "\u672A\u80FD\u8BC6\u522B\uFF0C\u8BF7\u624B\u52A8\u586B\u5199",
      required: "\u8BF7\u586B\u5199\u5B8C\u6574\u5730\u5740",
      provinceKeywords: ["\u7701", "\u81EA\u6CBB\u533A", "\u7279\u522B\u884C\u653F\u533A"],
      cityKeywords: ["\u5E02", "\u5DDE", "\u76DF"],
      districtKeywords: ["\u533A", "\u53BF", "\u65D7", "\u9547", "\u5E02"],
      streetKeywords: ["\u8857\u9053", "\u9547", "\u4E61", "\u6751"]
    },
    // AI 组件
    ai: {
      bubble: {
        citations: "\u53C2\u8003\u5F15\u7528"
      },
      mention: {
        placeholder: "@ \u547C\u53EB Agent\u3001\u6587\u6863\u6216\u8868\u683C...",
        agent: "\u667A\u80FD\u4F53",
        document: "\u6587\u6863",
        table: "\u8868\u683C",
        knowledge: "\u77E5\u8BC6\u5E93"
      },
      codeBlock: {
        copyCode: "\u590D\u5236\u4EE3\u7801",
        copied: "\u5DF2\u590D\u5236\uFF01",
        run: "\u8FD0\u884C\u4EE3\u7801",
        edit: "\u7F16\u8F91",
        save: "\u4FDD\u5B58",
        cancel: "\u53D6\u6D88"
      },
      codeRunner: {
        run: "\u8FD0\u884C",
        stop: "\u505C\u6B62",
        clear: "\u6E05\u7A7A",
        reset: "\u91CD\u7F6E",
        placeholder: "\u70B9\u51FB\u8FD0\u884C\u6309\u94AE\u6267\u884C\u4EE3\u7801..."
      },
      sender: {
        placeholder: "\u53D1\u9001\u6D88\u606F...",
        dragTip: "\u91CA\u653E\u9F20\u6807\u4EE5\u4E0A\u4F20\u6587\u4EF6"
      },
      thoughtChain: {
        thoughtProcess: "\u601D\u8003\u8FC7\u7A0B",
        thinking: "\u601D\u8003\u4E2D...",
        defaultTitle: "\u65B0\u6B65\u9AA4",
        addNode: "\u6DFB\u52A0\u8282\u70B9"
      },
      thinking: {
        start: "\u5F00\u59CB\u601D\u8003",
        thinking: "\u601D\u8003\u4E2D...",
        complete: "\u5DF2\u5B8C\u6210\u601D\u8003",
        error: "\u601D\u8003\u51FA\u9519\u4E86"
      },
      welcome: {
        title: "\u4F60\u597D\uFF0C\u6211\u662F YH AI",
        description: "\u6211\u53EF\u4EE5\u5E2E\u4F60\u5199\u4EE3\u7801\u3001\u7FFB\u8BD1\u6587\u6863\u6216\u8FDB\u884C\u521B\u610F\u5199\u4F5C\u3002\u4ECA\u5929\u6211\u80FD\u4E3A\u4F60\u505A\u70B9\u4EC0\u4E48\uFF1F"
      },
      action: {
        copy: "\u590D\u5236",
        regenerate: "\u91CD\u65B0\u751F\u6210",
        share: "\u5206\u4EAB",
        like: "\u8D5E\u540C",
        dislike: "\u53CD\u5BF9",
        edit: "\u7F16\u8F91",
        delete: "\u5220\u9664"
      },
      artifacts: {
        preview: "\u9884\u89C8",
        inline: "\u884C\u5185",
        code: "\u6E90\u7801",
        versions: "\u7248\u672C\u5386\u53F2",
        rendering: "\u6B63\u5728\u6E32\u67D3\u7EC4\u4EF6...",
        renderingChart: "\u6B63\u5728\u6E32\u67D3\u56FE\u8868...",
        renderingCanvas: "\u6B63\u5728\u51C6\u5907\u753B\u677F..."
      },
      voice: {
        trigger: "\u70B9\u51FB\u8BF4\u8BDD",
        listening: "\u8046\u542C\u4E2D..."
      },
      // AiAgentCard
      agent: {
        uses: "\u6B21\u8C03\u7528",
        use: "\u7ACB\u5373\u4F7F\u7528",
        favorite: "\u6536\u85CF",
        unfavorite: "\u53D6\u6D88\u6536\u85CF",
        share: "\u5206\u4EAB",
        online: "\u5728\u7EBF",
        offline: "\u79BB\u7EBF",
        busy: "\u5FD9\u788C",
        verified: "\u5B98\u65B9\u8BA4\u8BC1",
        rating: "\u8BC4\u5206",
        reviews: "\u6761\u8BC4\u4EF7",
        responseTime: "\u54CD\u5E94\u65F6\u95F4",
        ms: "ms"
      },
      // AiSources
      sources: {
        references: "\u53C2\u8003\u6765\u6E90",
        referencedSources: "\u5F15\u7528\u6765\u6E90",
        relevant: "\u76F8\u5173\u5EA6",
        viewOriginal: "\u67E5\u770B\u539F\u6587",
        showAll: "\u663E\u793A\u5168\u90E8",
        more: "\u66F4\u591A\u6765\u6E90",
        drawerTitle: "\u53C2\u8003\u6765\u6E90",
        expandMore: "\u5C55\u5F00\u66F4\u591A",
        collapseMore: "\u6536\u8D77",
        noSources: "\u6682\u65E0\u6765\u6E90",
        today: "\u4ECA\u5929",
        last7Days: "\u6700\u8FD1 7 \u5929",
        last30Days: "\u6700\u8FD1 30 \u5929",
        earlier: "\u66F4\u65E9",
        pinned: "\u5DF2\u7F6E\u9876"
      },
      // AiConversations groups
      conversations: {
        today: "\u4ECA\u5929",
        last7Days: "\u6700\u8FD1 7 \u5929",
        last30Days: "\u6700\u8FD1 30 \u5929",
        earlier: "\u66F4\u65E9",
        pinned: "\u7F6E\u9876",
        pin: "\u7F6E\u9876",
        unpin: "\u53D6\u6D88\u7F6E\u9876",
        newConversation: "\u65B0\u5EFA\u5BF9\u8BDD",
        noData: "\u6682\u65E0\u5BF9\u8BDD\u8BB0\u5F55",
        rename: "\u91CD\u547D\u540D",
        delete: "\u5220\u9664",
        deleteConfirm: "\u786E\u8BA4\u5220\u9664\u6B64\u5BF9\u8BDD\uFF1F"
      },
      // AiAttachments
      attachments: {
        dropTip: "\u91CA\u653E\u9F20\u6807\u4EE5\u4E0A\u4F20\u6587\u4EF6",
        clickToUpload: "\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904\u4E0A\u4F20",
        uploadSuccess: "\u4E0A\u4F20\u6210\u529F",
        uploadError: "\u4E0A\u4F20\u5931\u8D25",
        deleteConfirm: "\u786E\u5B9A\u5220\u9664\u6B64\u6587\u4EF6\uFF1F",
        fileTooLarge: "\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 {size}",
        invalidFileType: "\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B"
      },
      // AiMermaid
      mermaid: {
        image: "\u56FE\u7247",
        code: "\u4EE3\u7801",
        zoomIn: "\u653E\u5927",
        zoomOut: "\u7F29\u5C0F",
        reset: "\u91CD\u7F6E",
        download: "\u4E0B\u8F7D",
        copyCode: "\u590D\u5236\u4EE3\u7801",
        rendering: "\u6B63\u5728\u6E32\u67D3...",
        renderError: "\u6E32\u67D3\u5931\u8D25",
        renderSuccess: "\u6E32\u67D3\u6210\u529F",
        retry: "\u91CD\u8BD5"
      }
    }
  }
};

// public/codesandbox-runtime/hooks/use-config/index.js
import { inject as inject3, computed as computed4, unref as unref3 } from "vue";
var configProviderContextKey = Symbol(
  "configProviderContextKey"
);
var useConfig = () => {
  const configRef = inject3(configProviderContextKey, null);
  const globalSize = computed4(() => {
    const config = unref3(configRef);
    return (config == null ? void 0 : config.size) || "default";
  });
  const globalZIndex = computed4(() => {
    const config = unref3(configRef);
    return (config == null ? void 0 : config.zIndex) || 2e3;
  });
  const globalLocale = computed4(() => {
    const config = unref3(configRef);
    return config == null ? void 0 : config.locale;
  });
  return {
    config: configRef,
    globalSize,
    globalZIndex,
    globalLocale
  };
};

// public/codesandbox-runtime/hooks/dayjs.js
import * as dayjsModule from "dayjs";
var _a;
var dayjs = "default" in dayjsModule ? (_a = dayjsModule.default) != null ? _a : dayjsModule : dayjsModule;
var stdin_default = dayjs;

// public/codesandbox-runtime/hooks/use-locale/dayjs-locale.js
import "dayjs/locale/en";
var dayjsLocales = {};
var loadedLocales = /* @__PURE__ */ new Set(["en"]);
var localeMapping = {
  "zh-cn": "zh-cn",
  "zh-tw": "zh-tw",
  "zh-hk": "zh-hk",
  "zh-mo": "zh-tw",
  en: "en",
  ja: "ja",
  ko: "ko",
  de: "de",
  fr: "fr",
  es: "es",
  pt: "pt",
  "pt-br": "pt-br",
  ru: "ru",
  ar: "ar",
  "ar-eg": "ar",
  tr: "tr",
  it: "it",
  nl: "nl",
  pl: "pl",
  th: "th",
  vi: "vi",
  id: "id",
  ms: "ms",
  da: "da",
  sv: "sv",
  fi: "fi",
  no: "nb",
  "nb-NO": "nb",
  cs: "cs",
  sk: "sk",
  uk: "uk",
  hu: "hu",
  ro: "ro",
  bg: "bg",
  az: "az",
  fa: "fa",
  hi: "hi",
  pa: "pa-in",
  el: "el",
  ca: "ca",
  tk: "tk",
  ta: "ta",
  lv: "lv",
  af: "af",
  et: "et",
  sl: "sl",
  he: "he",
  lo: "lo",
  lt: "lt",
  mn: "mn",
  kk: "kk",
  ku: "ku",
  ckb: "ku",
  "ug-cn": "ug-cn",
  km: "km",
  sr: "sr",
  eu: "eu",
  ky: "ky",
  "hy-am": "hy-am",
  hr: "hr",
  eo: "eo",
  bn: "bn",
  mg: "mg",
  sw: "sw",
  "uz-uz": "uz",
  my: "my",
  te: "te"
};
var loadDayjsLocale = async (dayjsLocale) => {
  const path = `../../../../node_modules/dayjs/locale/${dayjsLocale}.js`;
  const loader = dayjsLocales[path];
  if (loader) {
    await loader();
    return true;
  }
  try {
    await import(
      /* @vite-ignore */
      `dayjs/locale/${dayjsLocale}.js`
    );
    return true;
  } catch (e) {
    return false;
  }
};
var getDayjsLocale = (localeCode) => {
  return localeMapping[localeCode.toLowerCase()] || "en";
};
var setDayjsLocale = async (localeCode) => {
  const dayjsLocale = getDayjsLocale(localeCode);
  if (loadedLocales.has(dayjsLocale)) {
    stdin_default.locale(dayjsLocale);
    return;
  }
  if (dayjsLocale === "en") {
    stdin_default.locale("en");
    return;
  }
  try {
    const loaded = await loadDayjsLocale(dayjsLocale);
    if (!loaded) {
      stdin_default.locale("en");
      return;
    }
    loadedLocales.add(dayjsLocale);
    stdin_default.locale(dayjsLocale);
  } catch (e) {
    stdin_default.locale("en");
  }
};

// public/codesandbox-runtime/hooks/use-locale/index.js
var useLocale = (localeOverrides) => {
  const { globalLocale } = useConfig();
  const locale = computed5(() => {
    var _a2, _b;
    return (_b = (_a2 = unref4(localeOverrides)) != null ? _a2 : unref4(globalLocale)) != null ? _b : zhCn;
  });
  const lang = computed5(() => locale.value.name);
  watch(
    lang,
    (newLang) => {
      setDayjsLocale(newLang);
    },
    { immediate: true }
  );
  const t = (path, options) => {
    const keys = path.split(".");
    let result = locale.value.yh;
    for (const key of keys) {
      if (result && typeof result === "object") {
        result = result[key];
      } else {
        result = void 0;
      }
      if (result === void 0) return path;
    }
    if (typeof result !== "string") return path;
    if (options) {
      return result.replace(/\{(\w+)\}/g, (_match, key) => {
        const val = options[key];
        return val !== void 0 ? String(val) : `{${key}}`;
      });
    }
    return result;
  };
  const tRaw = (path) => {
    const keys = path.split(".");
    let result = locale.value.yh;
    for (const key of keys) {
      if (result && typeof result === "object") {
        result = result[key];
      } else {
        result = void 0;
      }
      if (result === void 0) return path;
    }
    return result;
  };
  return {
    locale,
    lang,
    t,
    tRaw
  };
};

// public/codesandbox-runtime/hooks/use-id/index.js
import { computed as computed6, inject as inject4, unref as unref5, useId as useVueId } from "vue";
var idInjectionKey = Symbol("idInjectionKey");

// public/codesandbox-runtime/hooks/use-form-item/index.js
import { inject as inject5 } from "vue";
var FormContextKey = Symbol("FormContextKey");
var FormItemContextKey = Symbol("FormItemContextKey");
var useFormItem = () => {
  const form = inject5(FormContextKey, void 0);
  const formItem = inject5(FormItemContextKey, void 0);
  return {
    form,
    formItem,
    // 触发校验
    validate: (trigger) => {
      if (formItem) {
        return formItem.validate(trigger).catch(() => {
          return false;
        });
      }
      return Promise.resolve(true);
    }
  };
};

// public/codesandbox-runtime/hooks/use-virtual-scroll/index.js
import { ref as ref4, computed as computed7, unref as unref6 } from "vue";

// public/codesandbox-runtime/hooks/use-cache/index.js
import { shallowRef } from "vue";

// public/codesandbox-runtime/hooks/use-event-listener/index.js
import { onMounted, onBeforeUnmount, isRef, watch as watch2, unref as unref7 } from "vue";

// public/codesandbox-runtime/hooks/use-scroll-lock/index.js
import { ref as ref5, watch as watch3, onUnmounted as onUnmounted2 } from "vue";
var useScrollLock = (trigger) => {
  const isLocked = ref5(false);
  let initialHtmlStyle = { overflow: "", paddingRight: "" };
  let initialBodyStyle = { overflow: "", paddingRight: "" };
  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };
  const lock = () => {
    if (isLocked.value) return;
    const width = getScrollbarWidth();
    const html = document.documentElement;
    const body = document.body;
    initialHtmlStyle = {
      overflow: html.style.overflow,
      paddingRight: html.style.paddingRight
    };
    initialBodyStyle = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight
    };
    if (width > 0) {
      const scrollbarWidth = `${width}px`;
      html.style.setProperty("--yh-scrollbar-width", scrollbarWidth);
      const computedBodyPadding = window.getComputedStyle(body).paddingRight;
      body.style.paddingRight = `calc(${computedBodyPadding} + ${scrollbarWidth})`;
    }
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.classList.add("yh-popup-parent--hidden");
    isLocked.value = true;
  };
  const unlock = () => {
    if (!isLocked.value) return;
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = initialHtmlStyle.overflow;
    html.style.paddingRight = initialHtmlStyle.paddingRight;
    body.style.overflow = initialBodyStyle.overflow;
    body.style.paddingRight = initialBodyStyle.paddingRight;
    html.classList.remove("yh-popup-parent--hidden");
    setTimeout(() => {
      if (!html.classList.contains("yh-popup-parent--hidden")) {
        html.style.removeProperty("--yh-scrollbar-width");
      }
    }, 400);
    isLocked.value = false;
  };
  watch3(trigger, (val) => {
    if (val) {
      lock();
    } else {
      unlock();
    }
  });
  onUnmounted2(unlock);
  return {
    isLocked
  };
};

// public/codesandbox-runtime/hooks/use-click-outside/index.js
import { unref as unref8 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-chat.js
import { ref as ref7, computed as computed8 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-stream.js
import { ref as ref6 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-conversations.js
import { ref as ref8, computed as computed9 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-request.js
import { ref as ref9 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-voice.js
import { ref as ref10, onUnmounted as onUnmounted3, shallowRef as shallowRef2 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-persistence.js
import { ref as ref11, onMounted as onMounted2 } from "vue";

// public/codesandbox-runtime/theme/component-theme.js
import { inject as inject6, provide, computed as computed10, unref as unref9 } from "vue";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var COMPONENT_THEME_KEY = Symbol("component-theme");
function useComponentTheme(componentName, localOverrides) {
  const globalThemes = inject6(COMPONENT_THEME_KEY, {});
  const mergedVars = computed10(() => {
    const globalVars = globalThemes[componentName] || {};
    const local = unref9(localOverrides) || {};
    return __spreadValues(__spreadValues({}, globalVars), local);
  });
  const themeStyle = computed10(() => {
    const vars = mergedVars.value;
    const style = {};
    Object.entries(vars).forEach(([key, value]) => {
      if (value !== void 0) {
        const cssVarName = `--yh-${componentName}-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        style[cssVarName] = value;
      }
    });
    return style;
  });
  const hasCustomTheme = computed10(() => {
    return Object.keys(mergedVars.value).length > 0;
  });
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  };
}

// public/codesandbox-runtime/utils/vue.js
var withInstall = (main, extra) => {
  ;
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
      const name = comp.name || comp.__name;
      if (name) {
        app.component(name, comp);
      }
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;
      main[key] = comp;
    }
  }
  return main;
};

// public/codesandbox-runtime/components/button/src/button.js
import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveDynamicComponent as _resolveDynamicComponent, createBlock as _createBlock, normalizeStyle as _normalizeStyle, withCtx as _withCtx } from "vue";
import { computed as computed11, ref as ref12, useSlots } from "vue";
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createBlock(_resolveDynamicComponent($props.tag), {
    ref: "buttonRef",
    class: _normalizeClass($setup.buttonClasses),
    style: _normalizeStyle($setup.buttonStyles),
    type: $props.tag === "button" ? $props.nativeType : void 0,
    disabled: $props.disabled || $props.loading,
    autofocus: $props.autofocus,
    onClick: $setup.handleClick
  }, {
    default: _withCtx(() => [
      _createCommentVNode(" 1. \u52A0\u8F7D\u56FE\u6807 (\u4F18\u5148\u7EA7\u6700\u9AD8\uFF0C\u5B58\u5728\u65F6\u901A\u5E38\u9690\u85CF\u539F\u56FE\u6807) "),
      $props.loading ? _renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
        _createElementVNode(
          "span",
          {
            class: _normalizeClass($setup.ns.e("loading-icon"))
          },
          [
            (_openBlock(), _createElementBlock(
              "svg",
              {
                class: _normalizeClass($setup.ns.e("loading-svg")),
                viewBox: "0 0 1024 1024"
              },
              [..._cache[0] || (_cache[0] = [
                _createElementVNode(
                  "path",
                  {
                    fill: "currentColor",
                    d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
                  },
                  null,
                  -1
                  /* CACHED */
                )
              ])],
              2
              /* CLASS */
            ))
          ],
          2
          /* CLASS */
        )
      ]) : _createCommentVNode("v-if", true),
      _createCommentVNode(" 2. \u524D\u7F6E/\u4E0A\u7F6E\u56FE\u6807 "),
      !$props.loading && $setup.hasIcon && ($props.iconPosition === "left" || $props.iconPosition === "top") ? (_openBlock(), _createElementBlock(
        "span",
        {
          key: 1,
          class: _normalizeClass($setup.ns.e("icon"))
        },
        [
          _renderSlot(_ctx.$slots, "icon", {}, () => [
            $props.icon && typeof $props.icon !== "string" ? (_openBlock(), _createBlock(_resolveDynamicComponent($props.icon), { key: 0 })) : _createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" 3. \u5185\u5BB9\u533A "),
      _ctx.$slots.default ? (_openBlock(), _createElementBlock(
        "span",
        {
          key: 2,
          class: _normalizeClass($setup.ns.e("text"))
        },
        [
          _renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" 4. \u540E\u7F6E/\u4E0B\u7F6E\u56FE\u6807 "),
      !$props.loading && $setup.hasIcon && ($props.iconPosition === "right" || $props.iconPosition === "bottom") ? (_openBlock(), _createElementBlock(
        "span",
        {
          key: 3,
          class: _normalizeClass($setup.ns.e("icon"))
        },
        [
          _renderSlot(_ctx.$slots, "icon", {}, () => [
            $props.icon && typeof $props.icon !== "string" ? (_openBlock(), _createBlock(_resolveDynamicComponent($props.icon), { key: 0 })) : _createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" 5. \u72EC\u7ACB\u7684\u540E\u7F00\u56FE\u6807\uFF08suffixIcon \u63D2\u69FD\uFF09 "),
      !$props.loading && $setup.hasSuffixIcon ? (_openBlock(), _createElementBlock(
        "span",
        {
          key: 4,
          class: _normalizeClass($setup.ns.e("suffix-icon"))
        },
        [
          _renderSlot(_ctx.$slots, "suffixIcon", {}, () => [
            $props.suffixIcon && typeof $props.suffixIcon !== "string" ? (_openBlock(), _createBlock(_resolveDynamicComponent($props.suffixIcon), { key: 0 })) : _createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["class", "style", "type", "disabled", "autofocus"]);
}
var __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhButton"
}, {
  __name: "button",
  props: {
    type: { type: null, required: false, default: "default" },
    size: { type: null, required: false },
    disabled: { type: Boolean, required: false, default: false },
    loading: { type: Boolean, required: false, default: false },
    plain: { type: Boolean, required: false, default: false },
    round: { type: Boolean, required: false, default: false },
    circle: { type: Boolean, required: false, default: false },
    text: { type: Boolean, required: false, default: false },
    link: { type: Boolean, required: false, default: false },
    nativeType: { type: null, required: false, default: "button" },
    autofocus: { type: Boolean, required: false, default: false },
    icon: { type: null, required: false },
    suffixIcon: { type: null, required: false },
    iconPosition: { type: null, required: false, default: "left" },
    color: { type: String, required: false },
    tag: { type: null, required: false, default: "button" },
    block: { type: Boolean, required: false, default: false },
    themeOverrides: { type: null, required: false }
  },
  emits: ["click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const ns = useNamespace("button");
    const { globalSize } = useConfig();
    const { themeStyle } = useComponentTheme(
      "button",
      computed11(() => props.themeOverrides)
    );
    const actualSize = computed11(() => props.size || globalSize.value || "default");
    const buttonRef = ref12();
    const hasIcon = computed11(() => props.icon || slots.icon);
    const hasSuffixIcon = computed11(() => props.suffixIcon || slots.suffixIcon);
    const isVertical = computed11(() => props.iconPosition === "top" || props.iconPosition === "bottom");
    const buttonClasses = computed11(() => [
      ns.b(),
      props.type !== "default" && ns.m(props.type),
      actualSize.value !== "default" && ns.m(actualSize.value),
      ns.is("disabled", props.disabled),
      ns.is("loading", props.loading),
      ns.is("plain", props.plain),
      ns.is("round", props.round),
      ns.is("circle", props.circle),
      ns.is("text", props.text),
      ns.is("link", props.link),
      ns.is("block", props.block),
      ns.is("vertical", isVertical.value),
      ns.is("custom-color", !!props.color)
    ]);
    const buttonStyles = computed11(() => {
      const base = themeStyle.value;
      if (!props.color) return base;
      const color = props.color;
      return __spreadProps(__spreadValues2({}, base), {
        "--yh-button-bg-color": props.plain ? "transparent" : color,
        "--yh-button-text-color": props.plain ? color : "var(--yh-color-white)",
        "--yh-button-border-color": color,
        "--yh-button-hover-bg-color": color,
        "--yh-button-hover-text-color": "var(--yh-color-white)",
        "--yh-button-hover-border-color": color,
        "--yh-button-active-bg-color": color,
        "--yh-button-active-border-color": color
      });
    });
    const handleClick = (event) => {
      if (props.disabled || props.loading) {
        event.preventDefault();
        return;
      }
      emit("click", event);
    };
    __expose({
      ref: buttonRef.value,
      size: actualSize.value,
      type: props.type,
      disabled: props.disabled
    });
    const __returned__ = { props, emit, slots, ns, globalSize, themeStyle, actualSize, buttonRef, hasIcon, hasSuffixIcon, isVertical, buttonClasses, buttonStyles, handleClick, computed: computed11, ref: ref12, useSlots, get useNamespace() {
      return useNamespace;
    }, get useConfig() {
      return useConfig;
    }, get useComponentTheme() {
      return useComponentTheme;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__.render = render;
var stdin_default2 = __sfc__;

// public/codesandbox-runtime/components/button/index.js
var YhButton = withInstall(stdin_default2);

// public/codesandbox-runtime/components/input/src/input.js
import { createCommentVNode as _createCommentVNode2, renderSlot as _renderSlot2, normalizeClass as _normalizeClass2, openBlock as _openBlock2, createElementBlock as _createElementBlock2, toDisplayString as _toDisplayString, resolveDynamicComponent as _resolveDynamicComponent2, createBlock as _createBlock2, normalizeStyle as _normalizeStyle2, createElementVNode as _createElementVNode2, Fragment as _Fragment, withModifiers as _withModifiers } from "vue";
import { computed as computed12, ref as ref13, watch as watch4, nextTick, useSlots as useSlots2, onMounted as onMounted3 } from "vue";

// public/codesandbox-runtime/components/input/src/utils.js
var hiddenTextarea;
var HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`;
var CONTEXT_STYLE = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing"
];
function calculateNodeStyling(targetElement) {
  const style = window.getComputedStyle(targetElement);
  const boxSizing = style.getPropertyValue("box-sizing");
  const paddingSize = Number.parseFloat(style.getPropertyValue("padding-bottom")) + Number.parseFloat(style.getPropertyValue("padding-top"));
  const borderSize = Number.parseFloat(style.getPropertyValue("border-bottom-width")) + Number.parseFloat(style.getPropertyValue("border-top-width"));
  const contextStyle = CONTEXT_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(
    ";"
  );
  return { contextStyle, boxSizing, paddingSize, borderSize };
}
function calcTextareaHeight(targetElement, minRows = 1, maxRows) {
  var _a2;
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    document.body.appendChild(hiddenTextarea);
  }
  const { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElement);
  hiddenTextarea.setAttribute("style", `${contextStyle};${HIDDEN_STYLE}`);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
  let height = hiddenTextarea.scrollHeight;
  const result = { height: "", minHeight: "" };
  if (boxSizing === "border-box") {
    height = height + borderSize;
  } else if (boxSizing === "content-box") {
    height = height - paddingSize;
  }
  hiddenTextarea.value = "";
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
  if (minRows > 0) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === "border-box") {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight}px`;
  }
  if (maxRows && maxRows > 0) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === "border-box") {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = `${height}px`;
  (_a2 = hiddenTextarea.parentNode) == null ? void 0 : _a2.removeChild(hiddenTextarea);
  hiddenTextarea = void 0;
  return result;
}

// public/codesandbox-runtime/components/input/src/input.js
var __defProp3 = Object.defineProperty;
var __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __propIsEnum3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp3.call(b, prop))
      __defNormalProp3(a, prop, b[prop]);
  if (__getOwnPropSymbols3)
    for (var prop of __getOwnPropSymbols3(b)) {
      if (__propIsEnum3.call(b, prop))
        __defNormalProp3(a, prop, b[prop]);
    }
  return a;
};
var _hoisted_1 = ["value", "placeholder", "disabled", "readonly", "maxlength", "minlength", "rows", "name", "id", "tabindex", "autocomplete", "autofocus", "aria-label", "inputmode"];
var _hoisted_2 = ["type", "value", "placeholder", "disabled", "readonly", "maxlength", "minlength", "name", "id", "tabindex", "list", "autocomplete", "autofocus", "aria-label", "inputmode", "aria-invalid", "aria-describedby"];
var _hoisted_3 = {
  key: 0,
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  style: { "overflow": "visible" }
};
var _hoisted_4 = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  style: { "overflow": "visible" }
};
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  var _a2;
  return _openBlock2(), _createElementBlock2(
    "div",
    {
      ref: "wrapperRef",
      class: _normalizeClass2($setup.wrapperClasses),
      style: _normalizeStyle2($setup.wrapperStyle),
      onMouseenter: $setup.handleMouseEnter,
      onMouseleave: $setup.handleMouseLeave
    },
    [
      _createCommentVNode2(" \u524D\u7F6E\u5143\u7D20 "),
      $setup.hasPrepend ? (_openBlock2(), _createElementBlock2(
        "div",
        {
          key: 0,
          class: _normalizeClass2($setup.ns.e("prepend"))
        },
        [
          _renderSlot2(_ctx.$slots, "prepend")
        ],
        2
        /* CLASS */
      )) : _createCommentVNode2("v-if", true),
      _createCommentVNode2(" \u8F93\u5165\u6846\u5305\u88C5\u5668 "),
      _createElementVNode2(
        "div",
        {
          class: _normalizeClass2($setup.ns.e("wrapper"))
        },
        [
          _createCommentVNode2(" \u524D\u7F6E\u56FE\u6807/\u6587\u672C/\u5185\u5BB9 "),
          $setup.hasPrefix ? (_openBlock2(), _createElementBlock2(
            "span",
            {
              key: 0,
              class: _normalizeClass2($setup.ns.e("prefix"))
            },
            [
              _renderSlot2(_ctx.$slots, "prefix", {}, () => [
                _createCommentVNode2(" Feature 6: prefix string prop "),
                $props.prefix ? (_openBlock2(), _createElementBlock2(
                  "span",
                  {
                    key: 0,
                    class: _normalizeClass2($setup.ns.e("prefix-text"))
                  },
                  _toDisplayString($props.prefix),
                  3
                  /* TEXT, CLASS */
                )) : $props.prefixIcon && typeof $props.prefixIcon !== "string" ? (_openBlock2(), _createBlock2(_resolveDynamicComponent2($props.prefixIcon), {
                  key: 1,
                  class: _normalizeClass2($setup.ns.e("icon"))
                }, null, 8, ["class"])) : $props.prefixIcon ? (_openBlock2(), _createElementBlock2(
                  "span",
                  {
                    key: 2,
                    class: _normalizeClass2($setup.ns.e("icon"))
                  },
                  _toDisplayString($props.prefixIcon),
                  3
                  /* TEXT, CLASS */
                )) : _createCommentVNode2("v-if", true)
              ])
            ],
            2
            /* CLASS */
          )) : _createCommentVNode2("v-if", true),
          _createCommentVNode2(" \u6587\u672C\u57DF "),
          $setup.isTextarea ? (_openBlock2(), _createElementBlock2("textarea", {
            key: 1,
            ref: "textareaRef",
            class: _normalizeClass2($setup.inputClasses),
            value: $setup.nativeInputValue,
            placeholder: $props.placeholder || $setup.t("input.placeholder"),
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
            "aria-label": $props.ariaLabel || $props.label,
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
          }, null, 46, _hoisted_1)) : (_openBlock2(), _createElementBlock2(
            _Fragment,
            { key: 2 },
            [
              _createCommentVNode2(" \u666E\u901A\u8F93\u5165\u6846 "),
              _createElementVNode2("input", {
                ref: "inputRef",
                class: _normalizeClass2($setup.inputClasses),
                type: $props.showPassword ? $setup.passwordVisible ? "text" : "password" : $props.type,
                value: $setup.nativeInputValue,
                placeholder: $props.placeholder || $setup.t("input.placeholder"),
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
                "aria-label": $props.ariaLabel || $props.label,
                inputmode: $props.inputmode,
                "aria-invalid": $setup.mergedStatus === "error",
                "aria-describedby": $setup.mergedStatus === "error" ? (_a2 = $setup.formItem) == null ? void 0 : _a2.errorId : void 0,
                onInput: $setup.handleInput,
                onChange: $setup.handleChange,
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur,
                onKeydown: $setup.handleKeydown,
                onKeyup: $setup.handleKeyup,
                onCompositionstart: $setup.handleCompositionStart,
                onCompositionupdate: $setup.handleCompositionUpdate,
                onCompositionend: $setup.handleCompositionEnd
              }, null, 46, _hoisted_2)
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          )),
          _createCommentVNode2(" \u540E\u7F6E\u56FE\u6807/\u6587\u672C/\u5185\u5BB9 "),
          $setup.hasSuffix ? (_openBlock2(), _createElementBlock2(
            "span",
            {
              key: 3,
              class: _normalizeClass2($setup.ns.e("suffix"))
            },
            [
              _createCommentVNode2(" Feature 2: \u52A0\u8F7D\u72B6\u6001\u56FE\u6807 "),
              $setup.isLoading ? (_openBlock2(), _createElementBlock2(
                "span",
                {
                  key: 0,
                  class: _normalizeClass2([$setup.ns.e("icon"), $setup.ns.e("loading")])
                },
                [
                  _renderSlot2(_ctx.$slots, "loadingIcon", {}, () => [
                    _cache[1] || (_cache[1] = _createElementVNode2(
                      "svg",
                      {
                        viewBox: "0 0 1024 1024",
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "1em",
                        height: "1em",
                        class: "yh-input__loading-spin"
                      },
                      [
                        _createElementVNode2("path", {
                          fill: "currentColor",
                          d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
                        })
                      ],
                      -1
                      /* CACHED */
                    ))
                  ])
                ],
                2
                /* CLASS */
              )) : _createCommentVNode2("v-if", true),
              _createCommentVNode2(" \u6E05\u7A7A\u6309\u94AE "),
              $setup.showClear && !$setup.isLoading ? (_openBlock2(), _createElementBlock2(
                "span",
                {
                  key: 1,
                  class: _normalizeClass2([$setup.ns.e("icon"), $setup.ns.e("clear")]),
                  onMousedown: _cache[0] || (_cache[0] = _withModifiers(() => {
                  }, ["prevent"])),
                  onClick: _withModifiers($setup.handleClear, ["stop"])
                },
                [
                  _renderSlot2(_ctx.$slots, "clearIcon", {}, () => [
                    _cache[2] || (_cache[2] = _createElementVNode2(
                      "svg",
                      {
                        viewBox: "0 0 1024 1024",
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "1em",
                        height: "1em"
                      },
                      [
                        _createElementVNode2("path", {
                          fill: "currentColor",
                          d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512zM512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 1 0 0-768 384 384 0 0 0 0 768z"
                        })
                      ],
                      -1
                      /* CACHED */
                    ))
                  ])
                ],
                34
                /* CLASS, NEED_HYDRATION */
              )) : _createCommentVNode2("v-if", true),
              _createCommentVNode2(" \u5BC6\u7801\u5207\u6362\u6309\u94AE "),
              $setup.showPasswordIcon ? (_openBlock2(), _createElementBlock2(
                "span",
                {
                  key: 2,
                  class: _normalizeClass2([$setup.ns.e("icon"), $setup.ns.e("password")]),
                  onClick: _withModifiers($setup.handlePasswordToggle, ["stop"])
                },
                [
                  $setup.passwordVisible ? (_openBlock2(), _createElementBlock2("svg", _hoisted_3, [..._cache[3] || (_cache[3] = [
                    _createElementVNode2(
                      "path",
                      { d: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" },
                      null,
                      -1
                      /* CACHED */
                    ),
                    _createElementVNode2(
                      "circle",
                      {
                        cx: "12",
                        cy: "12",
                        r: "3"
                      },
                      null,
                      -1
                      /* CACHED */
                    )
                  ])])) : (_openBlock2(), _createElementBlock2("svg", _hoisted_4, [..._cache[4] || (_cache[4] = [
                    _createElementVNode2(
                      "path",
                      { d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" },
                      null,
                      -1
                      /* CACHED */
                    ),
                    _createElementVNode2(
                      "line",
                      {
                        x1: "3",
                        y1: "3",
                        x2: "21",
                        y2: "21"
                      },
                      null,
                      -1
                      /* CACHED */
                    )
                  ])]))
                ],
                2
                /* CLASS */
              )) : _createCommentVNode2("v-if", true),
              _createCommentVNode2(" \u540E\u7F6E\u56FE\u6807/\u6587\u672C\u63D2\u69FD "),
              _renderSlot2(_ctx.$slots, "suffix", {}, () => [
                _createCommentVNode2(" Feature 6: suffix string prop "),
                $props.suffix ? (_openBlock2(), _createElementBlock2(
                  "span",
                  {
                    key: 0,
                    class: _normalizeClass2($setup.ns.e("suffix-text"))
                  },
                  _toDisplayString($props.suffix),
                  3
                  /* TEXT, CLASS */
                )) : $props.suffixIcon && typeof $props.suffixIcon !== "string" ? (_openBlock2(), _createBlock2(_resolveDynamicComponent2($props.suffixIcon), {
                  key: 1,
                  class: _normalizeClass2($setup.ns.e("icon"))
                }, null, 8, ["class"])) : $props.suffixIcon ? (_openBlock2(), _createElementBlock2(
                  "span",
                  {
                    key: 2,
                    class: _normalizeClass2($setup.ns.e("icon"))
                  },
                  _toDisplayString($props.suffixIcon),
                  3
                  /* TEXT, CLASS */
                )) : _createCommentVNode2("v-if", true)
              ])
            ],
            2
            /* CLASS */
          )) : _createCommentVNode2("v-if", true),
          _createCommentVNode2(" \u5B57\u6570\u7EDF\u8BA1 (\u8F93\u5165\u6846\u5185\u90E8\uFF0C\u4EC5\u9488\u5BF9 type=text) "),
          $setup.showWordLimitCount && !$setup.isTextarea ? (_openBlock2(), _createElementBlock2(
            "span",
            {
              key: 4,
              class: _normalizeClass2($setup.ns.e("count"))
            },
            _toDisplayString($setup.textLength) + " / " + _toDisplayString($props.maxlength),
            3
            /* TEXT, CLASS */
          )) : _createCommentVNode2("v-if", true)
        ],
        2
        /* CLASS */
      ),
      _createCommentVNode2(" \u540E\u7F6E\u5143\u7D20 "),
      $setup.hasAppend ? (_openBlock2(), _createElementBlock2(
        "div",
        {
          key: 1,
          class: _normalizeClass2($setup.ns.e("append"))
        },
        [
          _renderSlot2(_ctx.$slots, "append")
        ],
        2
        /* CLASS */
      )) : _createCommentVNode2("v-if", true),
      _createCommentVNode2(" \u5B57\u6570\u7EDF\u8BA1 (Textarea \u5916\u90E8\u53F3\u4E0B\u89D2) "),
      $setup.showWordLimitCount && $setup.isTextarea ? (_openBlock2(), _createElementBlock2(
        "span",
        {
          key: 2,
          class: _normalizeClass2([$setup.ns.e("count"), $setup.ns.em("count", "textarea")])
        },
        _toDisplayString($setup.textLength) + " / " + _toDisplayString($props.maxlength),
        3
        /* TEXT, CLASS */
      )) : _createCommentVNode2("v-if", true)
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
var __sfc__2 = /* @__PURE__ */ Object.assign({
  name: "YhInput"
}, {
  __name: "input",
  props: {
    modelValue: { type: [String, Number], required: false },
    type: { type: null, required: false, default: "text" },
    size: { type: null, required: false, default: void 0 },
    variant: { type: null, required: false, default: "default" },
    status: { type: null, required: false, default: "" },
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
    autocomplete: { type: String, required: false, default: "off" },
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
  emits: ["update:modelValue", "input", "change", "focus", "blur", "clear", "keydown", "keyup", "compositionstart", "compositionupdate", "compositionend"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots2();
    const ns = useNamespace("input");
    const { t } = useLocale();
    const inputRef = ref13();
    const textareaRef = ref13();
    const wrapperRef = ref13();
    const { form, formItem, validate: triggerValidate } = useFormItem();
    const { themeStyle } = useComponentTheme(
      "input",
      computed12(() => props.themeOverrides)
    );
    const { globalSize } = useConfig();
    const inputSize = computed12(
      () => props.size || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalSize.value || "default"
    );
    const focused = ref13(false);
    const hovering = ref13(false);
    const isComposing = ref13(false);
    const passwordVisible = ref13(false);
    const textareaCalcStyle = ref13({});
    const inputOrTextarea = computed12(() => inputRef.value || textareaRef.value);
    const isTextarea = computed12(() => props.type === "textarea");
    const nativeInputValue = computed12(() => {
      const value = props.modelValue === null || props.modelValue === void 0 ? "" : String(props.modelValue);
      if (props.formatter && !isTextarea.value) {
        return props.formatter(value);
      }
      return value;
    });
    const showClear = computed12(
      () => props.clearable && !props.disabled && !props.readonly && !!nativeInputValue.value && (focused.value || hovering.value)
    );
    const showPasswordIcon = computed12(
      () => props.showPassword && !props.disabled && !props.readonly && !!nativeInputValue.value
    );
    const textLength = computed12(() => {
      var _a2;
      const value = props.modelValue === null || props.modelValue === void 0 ? "" : String(props.modelValue);
      if ((_a2 = props.countConfig) == null ? void 0 : _a2.calculate) {
        return props.countConfig.calculate(value);
      }
      return value.length;
    });
    const showWordLimitCount = computed12(
      () => props.showWordLimit && !!props.maxlength && (props.type === "text" || props.type === "textarea") && !props.disabled && !props.readonly
    );
    const inputExceed = computed12(
      () => showWordLimitCount.value && textLength.value > Number(props.maxlength)
    );
    const isLoading = computed12(() => props.loading && !props.disabled);
    const hasPrepend = computed12(() => !!slots.prepend);
    const hasAppend = computed12(() => !!slots.append);
    const hasPrefix = computed12(() => !!slots.prefix || !!props.prefixIcon || !!props.prefix);
    const hasSuffix = computed12(
      () => !!slots.suffix || !!props.suffixIcon || !!props.suffix || showClear.value || showPasswordIcon.value || isLoading.value
    );
    const mergedStatus = computed12(() => {
      if (props.status) return props.status;
      if ((formItem == null ? void 0 : formItem.validateStatus) === "error") return "error";
      if ((formItem == null ? void 0 : formItem.validateStatus) === "success") return "success";
      return "";
    });
    const wrapperClasses = computed12(() => [
      ns.b(),
      ns.m(inputSize.value),
      ns.is("disabled", props.disabled),
      ns.is("focused", focused.value),
      ns.is("textarea", isTextarea.value),
      ns.is("exceed", inputExceed.value),
      ns.is("loading", isLoading.value),
      // Feature 1: Variant
      props.variant && props.variant !== "default" ? ns.m(`variant-${props.variant}`) : "",
      // Feature 3: Status
      mergedStatus.value ? ns.m(`status-${mergedStatus.value}`) : "",
      {
        [ns.b("group")]: hasPrepend.value || hasAppend.value,
        [ns.is("prepend")]: hasPrepend.value,
        [ns.is("append")]: hasAppend.value
      }
    ]);
    const wrapperStyle = computed12(() => __spreadValues3({}, themeStyle.value));
    const inputClasses = computed12(() => [ns.e("inner"), ns.is("disabled", props.disabled)]);
    const textareaStyle = computed12(() => {
      return [props.inputStyle, textareaCalcStyle.value, { resize: props.resize }];
    });
    const setNativeInputValue = () => {
      const input = inputOrTextarea.value;
      if (!input || input.value === nativeInputValue.value) return;
      input.value = nativeInputValue.value;
    };
    const handleInput = (event) => {
      var _a2, _b;
      const target = event.target;
      let value = target.value;
      if (isComposing.value) return;
      if (props.parser) {
        value = props.parser(value);
      }
      if ((_a2 = props.modelModifiers) == null ? void 0 : _a2.trim) {
        value = value.trim();
      }
      if ((_b = props.modelModifiers) == null ? void 0 : _b.number) {
        const n = parseFloat(value);
        emit("update:modelValue", isNaN(n) ? value : n);
        emit("input", isNaN(n) ? value : n);
      } else {
        emit("update:modelValue", value);
        emit("input", value);
      }
    };
    const handleChange = (event) => {
      const target = event.target;
      emit("change", target.value);
      if (props.validateEvent) {
        nextTick(() => {
          triggerValidate("change");
        });
      }
    };
    const handleFocus = (event) => {
      focused.value = true;
      emit("focus", event);
      if (props.selectOnFocus) {
        nextTick(() => {
          var _a2;
          (_a2 = inputOrTextarea.value) == null ? void 0 : _a2.select();
        });
      }
    };
    const handleBlur = (event) => {
      focused.value = false;
      emit("blur", event);
      if (props.validateEvent) {
        nextTick(() => {
          triggerValidate("blur");
        });
      }
    };
    const handleMouseEnter = () => {
      hovering.value = true;
    };
    const handleMouseLeave = () => {
      hovering.value = false;
    };
    const handleClear = () => {
      emit("update:modelValue", "");
      emit("change", "");
      emit("clear");
      emit("input", "");
      const input = inputOrTextarea.value;
      if (input) {
        input.value = "";
      }
      nextTick(() => {
        focus();
      });
    };
    const handleKeydown = (event) => {
      if (props.clearOnEscape && event.key === "Escape" && !props.disabled && !props.readonly) {
        handleClear();
      }
      emit("keydown", event);
    };
    const handleKeyup = (event) => {
      emit("keyup", event);
    };
    const handlePasswordToggle = () => {
      passwordVisible.value = !passwordVisible.value;
      nextTick(() => {
        focus();
      });
    };
    const handleCompositionStart = (event) => {
      isComposing.value = true;
      emit("compositionstart", event);
    };
    const handleCompositionUpdate = (event) => {
      emit("compositionupdate", event);
    };
    const handleCompositionEnd = (event) => {
      if (isComposing.value) {
        isComposing.value = false;
        handleInput(event);
      }
      emit("compositionend", event);
    };
    const focus = () => {
      var _a2;
      (_a2 = inputOrTextarea.value) == null ? void 0 : _a2.focus();
    };
    const blur = () => {
      var _a2;
      (_a2 = inputOrTextarea.value) == null ? void 0 : _a2.blur();
    };
    const select = () => {
      var _a2;
      (_a2 = inputOrTextarea.value) == null ? void 0 : _a2.select();
    };
    const clear = () => {
      handleClear();
    };
    const resizeTextarea = () => {
      const { type, autosize } = props;
      if (type !== "textarea") return;
      if (!autosize) {
        textareaCalcStyle.value = {};
        return;
      }
      const minRows = typeof autosize === "object" ? autosize.minRows : void 0;
      const maxRows = typeof autosize === "object" ? autosize.maxRows : void 0;
      const textarea = textareaRef.value;
      if (!textarea) return;
      const style = calcTextareaHeight(textarea, minRows, maxRows);
      textareaCalcStyle.value = {
        height: style.height,
        minHeight: style.minHeight
      };
    };
    watch4(
      () => props.modelValue,
      () => {
        nextTick(() => {
          setNativeInputValue();
          resizeTextarea();
        });
      }
    );
    onMounted3(() => {
      setNativeInputValue();
      resizeTextarea();
      if (props.autofocus) {
        focus();
      }
    });
    __expose({
      ref: inputOrTextarea.value,
      wrapperRef: wrapperRef.value,
      focus,
      blur,
      select,
      clear,
      get textLength() {
        return textLength.value;
      }
    });
    const __returned__ = { props, emit, slots, ns, t, inputRef, textareaRef, wrapperRef, form, formItem, triggerValidate, themeStyle, globalSize, inputSize, focused, hovering, isComposing, passwordVisible, textareaCalcStyle, inputOrTextarea, isTextarea, nativeInputValue, showClear, showPasswordIcon, textLength, showWordLimitCount, inputExceed, isLoading, hasPrepend, hasAppend, hasPrefix, hasSuffix, mergedStatus, wrapperClasses, wrapperStyle, inputClasses, textareaStyle, setNativeInputValue, handleInput, handleChange, handleFocus, handleBlur, handleMouseEnter, handleMouseLeave, handleClear, handleKeydown, handleKeyup, handlePasswordToggle, handleCompositionStart, handleCompositionUpdate, handleCompositionEnd, focus, blur, select, clear, resizeTextarea, computed: computed12, ref: ref13, watch: watch4, nextTick, useSlots: useSlots2, onMounted: onMounted3, get useNamespace() {
      return useNamespace;
    }, get useFormItem() {
      return useFormItem;
    }, get useLocale() {
      return useLocale;
    }, get useConfig() {
      return useConfig;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get calcTextareaHeight() {
      return calcTextareaHeight;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__2.render = render2;
var stdin_default3 = __sfc__2;

// public/codesandbox-runtime/components/input/index.js
var YhInput = withInstall(stdin_default3);

// public/codesandbox-runtime/components/icon/src/icon.js
import { createCommentVNode as _createCommentVNode3, resolveDynamicComponent as _resolveDynamicComponent3, openBlock as _openBlock3, createBlock as _createBlock3, createElementBlock as _createElementBlock3, Fragment as _Fragment2, renderSlot as _renderSlot3, mergeProps as _mergeProps } from "vue";
import { computed as computed13, useSlots as useSlots3 } from "vue";

// public/codesandbox-runtime/components/icon/src/icon-meta.js
var iconProps = {
  /**
   * 图标名称（使用内置图标时）
   */
  name: {
    type: String,
    default: ""
  },
  /**
   * SVG 字符串（直接渲染 SVG）
   */
  svg: {
    type: String,
    default: ""
  },
  /**
   * 图标组件（传入 Vue 组件）
   */
  icon: {
    type: Object,
    default: void 0
  },
  /**
   * 图标尺寸
   * - number: 像素值
   * - string: CSS 尺寸值（如 '1em', '24px'）
   */
  size: {
    type: [Number, String],
    default: void 0
  },
  /**
   * 图标颜色
   * - 默认继承父元素的 color
   */
  color: {
    type: String,
    default: void 0
  },
  /**
   * 是否启用旋转动画
   */
  spin: {
    type: Boolean,
    default: false
  },
  /**
   * 旋转角度（度数）
   */
  rotate: {
    type: Number,
    default: 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
var iconRegistry = /* @__PURE__ */ new Map();
function registerIcon(icon) {
  iconRegistry.set(icon.name, icon);
}
function registerIcons(icons) {
  icons.forEach((icon) => registerIcon(icon));
}
function getIcon(name) {
  return iconRegistry.get(name);
}

// public/codesandbox-runtime/components/icon/src/icon.js
var __defProp4 = Object.defineProperty;
var __getOwnPropSymbols4 = Object.getOwnPropertySymbols;
var __hasOwnProp4 = Object.prototype.hasOwnProperty;
var __propIsEnum4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp4 = (obj, key, value) => key in obj ? __defProp4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp4.call(b, prop))
      __defNormalProp4(a, prop, b[prop]);
  if (__getOwnPropSymbols4)
    for (var prop of __getOwnPropSymbols4(b)) {
      if (__propIsEnum4.call(b, prop))
        __defNormalProp4(a, prop, b[prop]);
    }
  return a;
};
var _hoisted_12 = ["viewBox", "innerHTML"];
function render3(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock3(), _createElementBlock3(
    "i",
    _mergeProps({
      class: $setup.iconClass,
      style: $setup.iconStyle
    }, _ctx.$attrs),
    [
      _createCommentVNode3(" \u4F7F\u7528\u4F20\u5165\u7684\u56FE\u6807\u7EC4\u4EF6 "),
      $setup.useIconComponent ? (_openBlock3(), _createBlock3(_resolveDynamicComponent3(_ctx.icon), {
        key: 0,
        class: "yh-icon__inner"
      })) : $setup.svgContent && !$setup.hasSlot ? (_openBlock3(), _createElementBlock3(
        _Fragment2,
        { key: 1 },
        [
          _createCommentVNode3(" \u4F7F\u7528 SVG \u5B57\u7B26\u4E32\u6E32\u67D3 "),
          _createCommentVNode3(" eslint-disable vue/no-v-html "),
          (_openBlock3(), _createElementBlock3("svg", {
            class: "yh-icon__svg",
            viewBox: $setup.viewBox,
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": "true",
            innerHTML: $setup.svgContent
          }, null, 8, _hoisted_12))
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      )) : $setup.hasSlot ? (_openBlock3(), _createElementBlock3(
        _Fragment2,
        { key: 2 },
        [
          _createCommentVNode3(" eslint-enable vue/no-v-html "),
          _createCommentVNode3(" \u4F7F\u7528\u63D2\u69FD\u81EA\u5B9A\u4E49\u5185\u5BB9 "),
          _renderSlot3(_ctx.$slots, "default")
        ],
        64
        /* STABLE_FRAGMENT */
      )) : _createCommentVNode3("v-if", true)
    ],
    16
    /* FULL_PROPS */
  );
}
var __sfc__3 = /* @__PURE__ */ Object.assign({
  name: "YhIcon",
  inheritAttrs: false
}, {
  __name: "icon",
  props: iconProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const slots = useSlots3();
    const ns = useNamespace("icon");
    const { themeStyle } = useComponentTheme(
      "icon",
      computed13(() => props.themeOverrides)
    );
    const iconStyle = computed13(() => {
      const style = __spreadValues4({}, themeStyle.value);
      if (props.size) {
        const size = typeof props.size === "number" ? `${props.size}px` : props.size;
        style.fontSize = size;
        style.width = size;
        style.height = size;
      }
      if (props.color) {
        style.color = props.color;
      }
      if (props.rotate) {
        style.transform = `rotate(${props.rotate}deg)`;
      }
      return style;
    });
    const iconClass = computed13(() => [
      ns.b(),
      {
        [ns.m("spin")]: props.spin
      }
    ]);
    const svgContent = computed13(() => {
      if (props.svg) {
        return props.svg;
      }
      if (props.name) {
        const icon = getIcon(props.name);
        if (icon) {
          return icon.svg;
        }
      }
      if (props.icon && "__svg" in props.icon) {
        return props.icon.__svg;
      }
      return "";
    });
    const viewBox = computed13(() => {
      if (props.name) {
        const icon = getIcon(props.name);
        if (icon == null ? void 0 : icon.viewBox) {
          return icon.viewBox;
        }
      }
      if (props.icon && "__viewBox" in props.icon) {
        return props.icon.__viewBox;
      }
      return "0 0 24 24";
    });
    const hasSlot = computed13(() => !!slots.default);
    const useIconComponent = computed13(() => {
      return props.icon && !("__svg" in props.icon);
    });
    const __returned__ = { props, slots, ns, themeStyle, iconStyle, iconClass, svgContent, viewBox, hasSlot, useIconComponent, computed: computed13, useSlots: useSlots3, get iconProps() {
      return iconProps;
    }, get getIcon() {
      return getIcon;
    }, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__3.render = render3;
var stdin_default4 = __sfc__3;

// public/codesandbox-runtime/components/icon/src/icons/index.js
var IconClose = {
  name: "close",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>'
};
var IconCheck = {
  name: "check",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>'
};
var IconArrowUp = {
  name: "arrow-up",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>'
};
var IconArrowDown = {
  name: "arrow-down",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>'
};
var IconArrowLeft = {
  name: "arrow-left",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>'
};
var IconArrowRight = {
  name: "arrow-right",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>'
};
var IconLoading = {
  name: "loading",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"/>'
};
var IconSearch = {
  name: "search",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>'
};
var IconPlus = {
  name: "plus",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>'
};
var IconMinus = {
  name: "minus",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 13H5v-2h14v2z"/>'
};
var IconInfo = {
  name: "info",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>'
};
var IconWarning = {
  name: "warning",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>'
};
var IconError = {
  name: "error",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>'
};
var IconSuccess = {
  name: "success",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
};
var IconEye = {
  name: "eye",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>'
};
var IconEyeOff = {
  name: "eye-off",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>'
};
var IconCalendar = {
  name: "calendar",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>'
};
var IconTime = {
  name: "time",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>'
};
var IconUser = {
  name: "user",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>'
};
var IconSettings = {
  name: "settings",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>'
};
var IconSetting = {
  name: "setting",
  viewBox: "0 0 24 24",
  svg: IconSettings.svg
};
var IconHome = {
  name: "home",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>'
};
var IconImage = {
  name: "image",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>'
};
var IconDocument = {
  name: "document",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>'
};
var IconRefresh = {
  name: "refresh",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>'
};
var IconZoomIn = {
  name: "zoom-in",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" fill-rule="evenodd" d="M17.414 16l4.293 4.293-1.414 1.414L16 17.414A8.96 8.96 0 0111 19c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.586 5zM11 17c3.86 0 7-3.14 7-7s-3.14-7-7-7-7 3.14-7 7 3.14 7 7 7zm-1-8V7h2v2h2v2h-2v2h-2v-2H8v-2h2z" clip-rule="evenodd" />'
};
var IconZoomOut = {
  name: "zoom-out",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" fill-rule="evenodd" d="M17.414 16l4.293 4.293-1.414 1.414L16 17.414A8.96 8.96 0 0111 19c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.586 5zM11 17c3.86 0 7-3.14 7-7s-3.14-7-7-7-7 3.14-7 7 3.14 7 7 7zm-3-8h6v2H8v-2z" clip-rule="evenodd" />'
};
var IconDelete = {
  name: "delete",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>'
};
var IconUpload = {
  name: "upload",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96M14 13v4h-4v-4H7l5-5 5 5h-3z"/>'
};
var IconDownload = {
  name: "download",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>'
};
var IconFilePdf = {
  name: "file-pdf",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3.5h-1.5v1.5h-1V7h2.5v1zm-6.5 3.5h1v-3h-1v3zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>'
};
var IconFileExcel = {
  name: "file-excel",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25H21.17M7 13.06L8.18 15.28L10.14 15.28L8.59 12.19L10.11 9.22L8.12 9.22L7 11.24L5.87 9.22L3.89 9.22L5.41 12.19L3.86 15.28L5.82 15.28L7 13.06M20.5 19.25V4.75H8.5V7H9.17Q9.5 7 9.76 7.24 10 7.5 10 7.83V16.17Q10 16.5 9.76 16.76 9.5 17 9.17 17H8.5V19.25H20.5Z"/>'
};
var IconFileWord = {
  name: "file-word",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25H21.17M7 13.06L8.18 15.28L10.14 15.28L8.59 12.19L10.11 9.22L8.12 9.22L7 11.24L5.87 9.22L3.89 9.22L5.41 12.19L3.86 15.28L5.82 15.28L7 13.06M20.5 19.25V4.75H8.5V7H9.17Q9.5 7 9.76 7.24 10 7.5 10 7.83V16.17Q10 16.5 9.76 16.76 9.5 17 9.17 17H8.5V19.25H20.5Z"/>'
};
var IconFileVideo = {
  name: "file-video",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>'
};
var IconFileAudio = {
  name: "file-audio",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z"/>'
};
var IconFileTxt = {
  name: "file-txt",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>'
};
var IconAttachment = {
  name: "attachment",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M16.5 6V17.5C16.5 19.71 14.71 21.5 12.5 21.5C10.29 21.5 8.5 19.71 8.5 17.5V5C8.5 3.34 9.84 2 11.5 2C13.16 2 14.5 3.34 14.5 5V15.5C14.5 16.05 14.05 16.5 13.5 16.5C12.95 16.5 12.5 16.05 12.5 15.5V6H11V15.5C11 16.88 12.12 18 13.5 18C14.88 18 16 16.88 16 15.5V5C16 2.51 13.99 0.5 11.5 0.5C9.01 0.5 7 2.51 7 5V17.5C7 20.54 9.46 23 12.5 23C15.54 23 18 20.54 18 17.5V6H16.5Z"/>'
};
var IconEdit = {
  name: "edit",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>'
};
var IconCopy = {
  name: "copy",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>'
};
var IconStar = {
  name: "star",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>'
};
var IconFolder = {
  name: "folder",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>'
};
var IconFolderOpened = {
  name: "folder-opened",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>'
};
var IconRobot = {
  name: "robot",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M22,10h-2V7c0-1.66-1.34-3-3-3H7C5.34,4,4,5.34,4,7v3H2C1.45,10,1,10.45,1,11v4c0,0.55,0.45,1,1,1h2v3c0,1.66,1.34,3,3,3h10c1.66,0,3-1.34,3-3v-3h2c0.55,0,1-0.45,1-1v-4C23,10.45,22.55,10,22,10z M8,11c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1S7,12.55,7,12C7,11.45,7.45,11,8,11z M16,11c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1s-1-0.45-1-1C15,11.45,15.45,11,16,11z M16,18H8v-2h8V18z"/>'
};
var IconCloseCircle = {
  name: "close-circle",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>'
};
var IconCheckCircle = {
  name: "check-circle",
  viewBox: "0 0 24 24",
  svg: IconSuccess.svg
};
var IconSend = {
  name: "send",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>'
};
var IconSendArrow = {
  name: "send-arrow",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M11 4.586V20h2V4.586l6.29 6.294 1.414-1.414L12 0.758 3.293 9.466l1.414 1.414z"/>'
};
var IconClean = {
  name: "clean",
  viewBox: "0 0 1024 1024",
  svg: '<path fill="currentColor" d="M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V342c0-14.4-11.6-26-26-26H611.8l-4.8-27.4c-9.6-55.6-58.4-96.6-114.7-96.6s-105.1 41-114.7 96.6l-4.8 27.4H160c-14.4 0-26 11.6-26 26v196c0 14.4 11.6 26 26 26h17.9l-53 305.6c-.3 1.5-.4 3-.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-.1 4.4-.4 14.2-2.4 23.7-15.9 21.2-30.4zM492.2 263.3c3.2-18.4 19.2-31.3 37.8-31.3s34.6 12.9 37.8 31.3l2.8 52.7h-81.2l2.8-52.7zm321 563.3H210.7l41.5-238h519.5l41.5 238zM206 518v-84h612v84H206z"></path>'
};
var IconPaperclip = {
  name: "paperclip",
  viewBox: "0 0 24 24",
  svg: IconAttachment.svg
};
var IconMicrophone = {
  name: "microphone",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>'
};
var IconThumbUp = {
  name: "thumb-up",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>'
};
var IconThumbDown = {
  name: "thumb-down",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.37-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>'
};
var IconSparkles = {
  name: "sparkles",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M11,1L12.5,4L15.5,5.5L12.5,7L11,10L9.5,7L6.5,5.5L9.5,4L11,1M5,10L6.5,13L9.5,14.5L6.5,16L5,19L3.5,16L0.5,14.5L3.5,13L5,10M17.5,12L19,15L22,16.5L19,18L17.5,21L16,18L13,16.5L16,15L17.5,12Z"/>'
};
var IconShare = {
  name: "share",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>'
};
var IconChat = {
  name: "chat",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>'
};
var IconVideoPlay = {
  name: "video-play",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M8 5v14l11-7L8 5z"/>'
};
var IconGlobe = {
  name: "globe",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>'
};
var IconTable = {
  name: "table",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 10.02h5V21h-5V10.02zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9zm12-11H9V3h6v5zm2 0h5V3h-5v5zM7 3H4c-1.1 0-2 .9-2 2v3h5V3z"/>'
};
var IconChartBar = {
  name: "chart-bar",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8h2.8v6h-2.8v-6z"/>'
};
var IconLaunch = {
  name: "launch",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>'
};
var IconCode = {
  name: "code",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>'
};
var IconStarFilled = {
  name: "star-filled",
  viewBox: "0 0 24 24",
  svg: IconStar.svg
};
var IconCheckmarkCircle = {
  name: "checkmark-circle",
  viewBox: "0 0 24 24",
  svg: IconCheckCircle.svg
};
var IconPresentation = {
  name: "presentation",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM21 17H3V5h18v12zM10 7l6 4-6 4V7z"/>'
};
var IconDocumentText = {
  name: "document-text",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>'
};
var IconVideoPause = {
  name: "video-pause",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'
};
var IconBook = {
  name: "book",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8V9zm0 3h4v2h-4v-2zm0-6h8v2h-8V6z"/>'
};
var IconLink = {
  name: "link",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>'
};
var IconBold = {
  name: "bold",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>'
};
var IconItalic = {
  name: "italic",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"/>'
};
var IconHeading = {
  name: "heading",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M5 4v3h5.5v12h3V7H19V4z"/>'
};
var IconFormat = {
  name: "format",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M3 10h11v2H3v-2zm0-4h11v2H3V6zm0 8h7v2H3v-2zm13-1v8l-4-4 4-4z"/>'
};
var builtInIcons = [
  IconClose,
  IconCheck,
  IconArrowUp,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconLoading,
  IconSearch,
  IconPlus,
  IconMinus,
  IconInfo,
  IconWarning,
  IconError,
  IconSuccess,
  IconEye,
  IconEyeOff,
  IconCalendar,
  IconTime,
  IconUser,
  IconSettings,
  IconSetting,
  IconHome,
  IconImage,
  IconDocument,
  IconRefresh,
  IconDelete,
  IconUpload,
  IconDownload,
  IconFilePdf,
  IconFileExcel,
  IconFileWord,
  IconFileVideo,
  IconFileAudio,
  IconFileTxt,
  IconAttachment,
  IconEdit,
  IconCopy,
  IconStar,
  IconFolder,
  IconFolderOpened,
  IconRobot,
  IconCloseCircle,
  IconCheckCircle,
  IconSend,
  IconSendArrow,
  IconClean,
  IconPaperclip,
  IconMicrophone,
  IconThumbUp,
  IconThumbDown,
  IconSparkles,
  IconShare,
  IconChat,
  IconVideoPlay,
  IconVideoPause,
  IconGlobe,
  IconTable,
  IconChartBar,
  IconLaunch,
  IconCode,
  IconZoomIn,
  IconZoomOut,
  IconStarFilled,
  IconCheckmarkCircle,
  IconPresentation,
  IconDocumentText,
  IconBook,
  // 命令菜单相关图标
  IconLink,
  IconBold,
  IconItalic,
  IconHeading,
  IconFormat
];
registerIcons(builtInIcons);

// public/codesandbox-runtime/components/icon/index.js
var YhIcon = withInstall(stdin_default4);

// public/codesandbox-runtime/components/message-box/src/message-box.js
var __defProp5 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols5 = Object.getOwnPropertySymbols;
var __hasOwnProp5 = Object.prototype.hasOwnProperty;
var __propIsEnum5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp5 = (obj, key, value) => key in obj ? __defProp5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp5.call(b, prop))
      __defNormalProp5(a, prop, b[prop]);
  if (__getOwnPropSymbols5)
    for (var prop of __getOwnPropSymbols5(b)) {
      if (__propIsEnum5.call(b, prop))
        __defNormalProp5(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp5.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols5)
    for (var prop of __getOwnPropSymbols5(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum5.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var _hoisted_13 = ["aria-label"];
function render4(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock4(), _createBlock4(_Transition, {
    name: $setup.ns.b("fade")
  }, {
    default: _withCtx2(() => [
      $setup.visible ? (_openBlock4(), _createElementBlock4(
        "div",
        {
          key: 0,
          class: _normalizeClass3($setup.ns.b("wrapper")),
          onMousedown: $setup.handleWrapperMousedown,
          onClick: $setup.handleWrapperClick,
          role: "dialog",
          "aria-modal": "true"
        },
        [
          _createElementVNode3(
            "div",
            {
              ref: "boxRef",
              class: _normalizeClass3([$setup.ns.b(), $setup.state.options.customClass, {
                [$setup.ns.m("glass")]: $setup.state.options.glass
              }, {
                [$setup.ns.m("center")]: $setup.state.options.center
              }, {
                "is-dragging": $setup.isDragging
              }]),
              style: _normalizeStyle3([$setup.boxStyle, $setup.themeStyle])
            },
            [
              $setup.state.options.glass ? (_openBlock4(), _createElementBlock4(
                "div",
                {
                  key: 0,
                  class: _normalizeClass3($setup.ns.e("bg"))
                },
                null,
                2
                /* CLASS */
              )) : _createCommentVNode4("v-if", true),
              _createElementVNode3(
                "div",
                {
                  class: _normalizeClass3([$setup.ns.e("header"), {
                    "is-draggable": $setup.state.options.draggable
                  }]),
                  onMousedown: $setup.onMousedown
                },
                [
                  _createElementVNode3(
                    "div",
                    {
                      class: _normalizeClass3($setup.ns.e("title"))
                    },
                    _toDisplayString2($setup.state.options.title || $setup.t("messagebox.title")),
                    3
                    /* TEXT, CLASS */
                  ),
                  $setup.state.options.showClose !== false ? (_openBlock4(), _createElementBlock4("button", {
                    key: 0,
                    class: _normalizeClass3($setup.ns.e("close")),
                    onClick: _cache[0] || (_cache[0] = ($event) => $setup.handleAction("close")),
                    "aria-label": $setup.t("messagebox.close")
                  }, [
                    _createVNode($setup["YhIcon"], {
                      svg: $setup.IconClose.svg,
                      "view-box": $setup.IconClose.viewBox
                    }, null, 8, ["svg", "view-box"])
                  ], 10, _hoisted_13)) : _createCommentVNode4("v-if", true)
                ],
                34
                /* CLASS, NEED_HYDRATION */
              ),
              _createElementVNode3(
                "div",
                {
                  class: _normalizeClass3($setup.ns.e("content"))
                },
                [
                  $setup.state.options.iconType || $setup.state.options.icon ? (_openBlock4(), _createElementBlock4(
                    "div",
                    {
                      key: 0,
                      class: _normalizeClass3([$setup.ns.e("status"), $setup.ns.is($setup.state.options.iconType || "")])
                    },
                    [
                      $setup.state.options.icon ? (_openBlock4(), _createBlock4(
                        _resolveDynamicComponent4(typeof $setup.state.options.icon === "string" ? $setup.YhIcon : $setup.state.options.icon),
                        _normalizeProps(_mergeProps2({ key: 0 }, typeof $setup.state.options.icon === "string" ? {
                          name: $setup.state.options.icon
                        } : {})),
                        null,
                        16
                        /* FULL_PROPS */
                      )) : $setup.state.options.iconType ? (_openBlock4(), _createBlock4($setup["YhIcon"], {
                        key: 1,
                        svg: $setup.getStatusIcon($setup.state.options.iconType).svg,
                        "view-box": $setup.getStatusIcon($setup.state.options.iconType).viewBox
                      }, null, 8, ["svg", "view-box"])) : _createCommentVNode4("v-if", true)
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode4("v-if", true),
                  _createElementVNode3(
                    "div",
                    {
                      class: _normalizeClass3($setup.ns.e("message"))
                    },
                    [
                      _createVNode($setup["MessageContent"])
                    ],
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              ),
              $setup.state.options.type === "prompt" ? (_openBlock4(), _createElementBlock4(
                "div",
                {
                  key: 1,
                  class: _normalizeClass3($setup.ns.e("input"))
                },
                [
                  _createVNode($setup["YhInput"], {
                    ref: "inputRef",
                    modelValue: $setup.state.inputValue,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.state.inputValue = $event),
                    placeholder: $setup.state.options.inputPlaceholder,
                    class: _normalizeClass3({
                      "is-error": !!$setup.state.validateError
                    }),
                    onKeyup: _cache[2] || (_cache[2] = _withKeys(($event) => $setup.handleAction("confirm"), ["enter"])),
                    onBlur: $setup.validate,
                    onInput: _cache[3] || (_cache[3] = ($event) => $setup.state.validateError && $setup.validate())
                  }, null, 8, ["modelValue", "placeholder", "class"]),
                  _createVNode(_Transition, {
                    name: "yh-zoom-in-top",
                    persisted: ""
                  }, {
                    default: _withCtx2(() => [
                      _withDirectives(_createElementVNode3(
                        "div",
                        {
                          class: _normalizeClass3($setup.ns.e("err-msg"))
                        },
                        _toDisplayString2($setup.state.validateError),
                        3
                        /* TEXT, CLASS */
                      ), [
                        [_vShow, $setup.state.validateError]
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ],
                2
                /* CLASS */
              )) : _createCommentVNode4("v-if", true),
              _createElementVNode3(
                "div",
                {
                  class: _normalizeClass3($setup.ns.e("footer"))
                },
                [
                  $setup.state.options.showCancelButton !== false ? (_openBlock4(), _createBlock4($setup["YhButton"], {
                    key: 0,
                    size: "small",
                    round: $setup.state.options.roundButton,
                    loading: $setup.state.cancelLoading || $setup.state.options.cancelButtonLoading,
                    disabled: $setup.state.confirmLoading || $setup.state.cancelLoading,
                    onClick: _cache[4] || (_cache[4] = ($event) => $setup.handleAction("cancel"))
                  }, {
                    default: _withCtx2(() => [
                      _createTextVNode(
                        _toDisplayString2($setup.state.options.cancelButtonText || $setup.t("messagebox.cancel")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["round", "loading", "disabled"])) : _createCommentVNode4("v-if", true),
                  $setup.state.options.showConfirmButton !== false ? (_openBlock4(), _createBlock4($setup["YhButton"], {
                    key: 1,
                    ref: "confirmRef",
                    type: "primary",
                    size: "small",
                    loading: $setup.state.confirmLoading || $setup.state.options.confirmButtonLoading,
                    disabled: $setup.state.confirmLoading || $setup.state.cancelLoading,
                    round: $setup.state.options.roundButton,
                    onClick: _cache[5] || (_cache[5] = ($event) => $setup.handleAction("confirm"))
                  }, {
                    default: _withCtx2(() => [
                      _createTextVNode(
                        _toDisplayString2($setup.state.options.confirmButtonText || $setup.t("messagebox.confirm")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["loading", "disabled", "round"])) : _createCommentVNode4("v-if", true)
                ],
                2
                /* CLASS */
              )
            ],
            6
            /* CLASS, STYLE */
          )
        ],
        34
        /* CLASS, NEED_HYDRATION */
      )) : _createCommentVNode4("v-if", true)
    ]),
    _: 1
    /* STABLE */
  }, 8, ["name"]);
}
var __sfc__4 = /* @__PURE__ */ Object.assign({
  name: "YhMessageBox",
  inheritAttrs: false
}, {
  __name: "message-box",
  props: {
    title: { type: String, required: false },
    message: { type: [String, Object, Function], required: false },
    type: { type: String, required: false },
    dangerouslyUseHTMLString: { type: Boolean, required: false },
    iconType: { type: String, required: false },
    icon: { type: null, required: false },
    confirmButtonText: { type: String, required: false },
    cancelButtonText: { type: String, required: false },
    showCancelButton: { type: Boolean, required: false },
    showConfirmButton: { type: Boolean, required: false },
    showClose: { type: Boolean, required: false },
    closeOnClickModal: { type: Boolean, required: false },
    closeOnPressEscape: { type: Boolean, required: false },
    lockScroll: { type: Boolean, required: false },
    glass: { type: Boolean, required: false },
    center: { type: Boolean, required: false },
    roundButton: { type: Boolean, required: false },
    draggable: { type: Boolean, required: false },
    draggableBoundary: { type: Boolean, required: false },
    width: { type: [String, Number], required: false },
    customClass: { type: String, required: false },
    inputPlaceholder: { type: String, required: false },
    inputValue: { type: String, required: false },
    inputPattern: { type: null, required: false },
    inputValidator: { type: Function, required: false },
    inputErrorMessage: { type: String, required: false },
    beforeClose: { type: Function, required: false },
    callback: { type: Function, required: false },
    appContext: { type: [Object, null], required: false },
    autofocus: { type: Boolean, required: false },
    appendTo: { type: null, required: false },
    confirmButtonLoading: { type: Boolean, required: false },
    cancelButtonLoading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false },
    themeOverrides: { type: null, required: false }
  },
  setup(__props, { expose: __expose }) {
    const ns = useNamespace("message-box");
    const { t } = useLocale();
    const DEFAULT_OPTIONS = {
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      showClose: true,
      lockScroll: true,
      draggableBoundary: true,
      autofocus: true,
      closeOnClickModal: true,
      closeOnPressEscape: true,
      width: 420
    };
    const props = __props;
    const { themeStyle } = useComponentTheme(
      "message-box",
      computed14(() => state.options.themeOverrides)
    );
    const visible = ref14(
      typeof window === "undefined" || !!props.title || !!props.message || !!props.type || !!props.glass
    );
    const boxRef = ref14(null);
    const inputRef = ref14(null);
    const confirmRef = ref14(null);
    const state = shallowReactive({
      options: Object.assign({}, DEFAULT_OPTIONS, props),
      confirmLoading: false,
      cancelLoading: false,
      inputValue: props.inputValue || "",
      validateError: ""
    });
    watch5(
      props,
      (val) => {
        state.options = __spreadValues5(__spreadValues5({}, state.options), val);
      },
      { deep: true }
    );
    watch5(
      () => visible.value,
      async (val) => {
        var _a2, _b, _c, _d;
        if (val && state.options.autofocus !== false) {
          await nextTick2();
          if (state.options.type === "prompt") {
            (_b = (_a2 = inputRef.value) == null ? void 0 : _a2.focus) == null ? void 0 : _b.call(_a2);
          } else {
            const el = ((_c = confirmRef.value) == null ? void 0 : _c.$el) || confirmRef.value;
            (_d = el == null ? void 0 : el.focus) == null ? void 0 : _d.call(el);
          }
        }
      }
    );
    const shouldLockScroll = computed14(() => !!(visible.value && state.options.lockScroll));
    useScrollLock(shouldLockScroll);
    const isDragging = ref14(false);
    const transform = reactive({ x: 0, y: 0 });
    const onMousedown = (e) => {
      if (!state.options.draggable || !boxRef.value) return;
      if (e.target.closest(`.${ns.e("close")}`)) return;
      isDragging.value = true;
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const { x: initialX, y: initialY } = transform;
      const onMousemove = (moveE) => {
        if (!isDragging.value) return;
        const deltaX = moveE.clientX - startX;
        const deltaY = moveE.clientY - startY;
        let nextX = initialX + deltaX;
        let nextY = initialY + deltaY;
        if (state.options.draggableBoundary && boxRef.value) {
          const rect = boxRef.value.getBoundingClientRect();
          const viewportW = window.innerWidth;
          const viewportH = window.innerHeight;
          const maxX = Math.max(0, (viewportW - rect.width) / 2);
          const maxY = Math.max(0, (viewportH - rect.height) / 2);
          nextX = Math.max(-maxX, Math.min(maxX, nextX));
          nextY = Math.max(-maxY, Math.min(maxY, nextY));
        }
        transform.x = nextX;
        transform.y = nextY;
      };
      const onMouseup = () => {
        isDragging.value = false;
        document.removeEventListener("mousemove", onMousemove);
        document.removeEventListener("mouseup", onMouseup);
      };
      document.addEventListener("mousemove", onMousemove);
      document.addEventListener("mouseup", onMouseup);
    };
    let isMousedownOnWrapper = false;
    const handleWrapperMousedown = (e) => {
      isMousedownOnWrapper = e.target === e.currentTarget;
    };
    const handleWrapperClick = (e) => {
      if (isMousedownOnWrapper && e.target === e.currentTarget) {
        if (state.options.closeOnClickModal) {
          handleAction("close");
        }
      }
      isMousedownOnWrapper = false;
    };
    const validate = () => {
      if (state.options.type !== "prompt") return true;
      const { inputPattern, inputValidator, inputErrorMessage } = state.options;
      const value = state.inputValue;
      if (inputPattern && !inputPattern.test(value)) {
        state.validateError = inputErrorMessage || t("messagebox.error");
        return false;
      }
      if (inputValidator) {
        const result = inputValidator(value);
        if (typeof result === "string") {
          state.validateError = result;
          return false;
        } else if (result === false) {
          state.validateError = inputErrorMessage || t("messagebox.error");
          return false;
        }
      }
      state.validateError = "";
      return true;
    };
    watch5(
      () => state.inputValue,
      () => {
        if (state.options.type === "prompt" && state.validateError) {
          validate();
        }
      }
    );
    const open = (options) => {
      const _a2 = options, { appContext } = _a2, rest = __objRest(_a2, ["appContext"]);
      state.options = __spreadProps2(__spreadValues5(__spreadValues5({}, DEFAULT_OPTIONS), rest), {
        appContext: appContext ? markRaw(appContext) : null
      });
      state.inputValue = options.inputValue || "";
      state.validateError = "";
      state.confirmLoading = false;
      state.cancelLoading = false;
      transform.x = 0;
      transform.y = 0;
      visible.value = true;
    };
    const close = () => {
      visible.value = false;
    };
    const handleAction = (action) => {
      if (action === "confirm" && !validate()) {
        return;
      }
      if (state.options.beforeClose) {
        state.options.beforeClose(action, exposed, () => {
          state.confirmLoading = false;
          state.cancelLoading = false;
          doClose(action);
        });
      } else {
        doClose(action);
      }
    };
    let _callback;
    const setCallback = (cb) => {
      _callback = cb;
    };
    const doClose = (action) => {
      close();
      if (_callback) {
        _callback({
          action,
          value: state.inputValue
        });
      }
    };
    const onKeydown = (e) => {
      if (visible.value && state.options.closeOnPressEscape && e.code === "Escape") {
        handleAction("close");
      }
    };
    onMounted4(() => document.addEventListener("keydown", onKeydown));
    onUnmounted4(() => {
      document.removeEventListener("keydown", onKeydown);
    });
    const MessageContent = () => {
      const { message, dangerouslyUseHTMLString } = state.options;
      if (!message) return null;
      if (typeof message === "function") return message();
      if (typeof message === "object") return message;
      if (dangerouslyUseHTMLString) {
        return h("div", { class: ns.e("html"), innerHTML: message });
      }
      return h("span", message);
    };
    const boxStyle = computed14(() => ({
      width: typeof state.options.width === "number" ? `${state.options.width}px` : state.options.width,
      transform: `translate(${transform.x}px, ${transform.y}px)`
    }));
    const exposed = reactive({
      open,
      close,
      setCallback,
      get confirmLoading() {
        return state.confirmLoading;
      },
      set confirmLoading(val) {
        state.confirmLoading = val;
      },
      get cancelLoading() {
        return state.cancelLoading;
      },
      set cancelLoading(val) {
        state.cancelLoading = val;
      }
    });
    __expose(exposed);
    const getStatusIcon = (type) => {
      switch (type) {
        case "success":
          return IconSuccess;
        case "warning":
          return IconWarning;
        case "error":
          return IconError;
        default:
          return IconInfo;
      }
    };
    const __returned__ = { ns, t, DEFAULT_OPTIONS, props, themeStyle, visible, boxRef, inputRef, confirmRef, state, shouldLockScroll, isDragging, transform, onMousedown, get isMousedownOnWrapper() {
      return isMousedownOnWrapper;
    }, set isMousedownOnWrapper(v) {
      isMousedownOnWrapper = v;
    }, handleWrapperMousedown, handleWrapperClick, validate, open, close, handleAction, get _callback() {
      return _callback;
    }, set _callback(v) {
      _callback = v;
    }, setCallback, doClose, onKeydown, MessageContent, boxStyle, exposed, getStatusIcon, ref: ref14, reactive, computed: computed14, watch: watch5, h, onMounted: onMounted4, onUnmounted: onUnmounted4, markRaw, nextTick: nextTick2, shallowReactive, get useNamespace() {
      return useNamespace;
    }, get useScrollLock() {
      return useScrollLock;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get YhButton() {
      return YhButton;
    }, get YhInput() {
      return YhInput;
    }, get YhIcon() {
      return YhIcon;
    }, get IconClose() {
      return IconClose;
    }, get IconSuccess() {
      return IconSuccess;
    }, get IconWarning() {
      return IconWarning;
    }, get IconError() {
      return IconError;
    }, get IconInfo() {
      return IconInfo;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__4.render = render4;
var stdin_default5 = __sfc__4;
export {
  stdin_default5 as default
};
