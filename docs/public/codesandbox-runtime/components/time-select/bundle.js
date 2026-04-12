// public/codesandbox-runtime/components/time-select/src/time-select.js
import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, withModifiers as _withModifiers, createTextVNode as _createTextVNode, renderList as _renderList, Fragment as _Fragment, vShow as _vShow, normalizeStyle as _normalizeStyle, withDirectives as _withDirectives, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, Teleport as _Teleport, createBlock as _createBlock } from "vue";
import { computed as computed11, ref as ref12, nextTick, watch as watch4, onMounted as onMounted3, onBeforeUnmount as onBeforeUnmount2 } from "vue";

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
var useId = (idOverrides) => {
  const injectedId = inject4(idInjectionKey, void 0);
  const nativeId = useVueId();
  const id = computed6(() => {
    const override = unref5(idOverrides);
    if (override) return override;
    const injected = unref5(injectedId);
    if (injected) return injected;
    return nativeId;
  });
  return id;
};

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

// public/codesandbox-runtime/components/time-select/src/time-select-meta.js
var parseTimeToMinutes = (time) => {
  if (!time) return 0;
  const parts = time.split(":");
  const hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;
  return hours * 60 + minutes;
};
var formatMinutesToTime = (minutes, format = "HH:mm") => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const HH = String(hours).padStart(2, "0");
  const mm = String(mins).padStart(2, "0");
  return format.replace("HH", HH).replace("H", String(hours)).replace("mm", mm).replace("m", String(mins));
};
var isTimeInRange = (time, start, end) => {
  const t = parseTimeToMinutes(time);
  const s = parseTimeToMinutes(start);
  const e = parseTimeToMinutes(end);
  return t >= s && t <= e;
};
var generateTimeOptions = (start, end, step, format = "HH:mm", _includeEnd = false) => {
  const options = [];
  const startMinutes = parseTimeToMinutes(start);
  const endMinutes = parseTimeToMinutes(end);
  const stepMinutes = parseTimeToMinutes(step);
  if (stepMinutes <= 0) return options;
  for (let m = startMinutes; m <= endMinutes; m += stepMinutes) {
    if (m > 24 * 60) break;
    const value = formatMinutesToTime(m, "HH:mm");
    const label = formatMinutesToTime(m, format);
    options.push({ value, label });
  }
  return options;
};

// public/codesandbox-runtime/components/time-select/src/time-select.js
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
var _hoisted_1 = ["id", "value", "placeholder", "disabled", "readonly", "name", "aria-expanded", "aria-controls"];
var _hoisted_2 = ["id"];
var _hoisted_3 = ["aria-selected", "onClick", "onMouseenter"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "wrapperRef",
      class: _normalizeClass($setup.wrapperClasses),
      style: _normalizeStyle($setup.themeStyle),
      onMouseenter: $setup.handleMouseEnter,
      onMouseleave: $setup.handleMouseLeave,
      onClick: $setup.toggleDropdown
    },
    [
      _createCommentVNode(" \u8F93\u5165\u533A\u57DF "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("wrapper"))
        },
        [
          _createCommentVNode(" \u524D\u7F00\u56FE\u6807 "),
          _createElementVNode(
            "span",
            {
              class: _normalizeClass($setup.ns.e("prefix"))
            },
            [
              _renderSlot(_ctx.$slots, "prefix", {}, () => [
                (_openBlock(), _createElementBlock(
                  "svg",
                  {
                    viewBox: "0 0 1024 1024",
                    width: "1em",
                    height: "1em",
                    class: _normalizeClass($setup.ns.e("icon"))
                  },
                  [..._cache[1] || (_cache[1] = [
                    _createElementVNode(
                      "path",
                      {
                        fill: "currentColor",
                        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 64a384 384 0 1 0 0 768 384 384 0 0 0 0-768zm0 128a32 32 0 0 1 32 32v192l128 64a32 32 0 0 1-28.864 57.088l-144-72A32 32 0 0 1 480 512V288a32 32 0 0 1 32-32z"
                      },
                      null,
                      -1
                      /* CACHED */
                    )
                  ])],
                  2
                  /* CLASS */
                ))
              ])
            ],
            2
            /* CLASS */
          ),
          _createCommentVNode(" \u8F93\u5165\u6846 "),
          _createElementVNode("input", {
            ref: "inputRef",
            id: $setup.inputId,
            class: _normalizeClass($setup.ns.e("inner")),
            value: $props.editable && $setup.visible ? $setup.query : "",
            placeholder: $setup.hasValue ? "" : $props.placeholder || $setup.t("timeselect.placeholder"),
            disabled: $props.disabled,
            readonly: !$props.editable,
            name: $props.name,
            autocomplete: "off",
            role: "combobox",
            "aria-expanded": $setup.visible,
            "aria-controls": `${$setup.inputId}-listbox`,
            onInput: $setup.handleInput,
            onFocus: $setup.handleFocus,
            onBlur: $setup.handleBlur,
            onKeydown: $setup.handleKeydown
          }, null, 42, _hoisted_1),
          _createCommentVNode(" \u663E\u793A\u503C "),
          $setup.hasValue && !($props.editable && $setup.visible && $setup.query) ? (_openBlock(), _createElementBlock(
            "span",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("display-value"))
            },
            _toDisplayString($setup.displayLabel),
            3
            /* TEXT, CLASS */
          )) : _createCommentVNode("v-if", true),
          _createCommentVNode(" \u540E\u7F00\u56FE\u6807 "),
          _createElementVNode(
            "span",
            {
              class: _normalizeClass($setup.ns.e("suffix"))
            },
            [
              _createCommentVNode(" \u6E05\u7A7A\u6309\u94AE "),
              $setup.showClear ? (_openBlock(), _createElementBlock(
                "span",
                {
                  key: 0,
                  class: _normalizeClass([$setup.ns.e("icon"), $setup.ns.e("clear")]),
                  onClick: _withModifiers($setup.handleClear, ["stop"])
                },
                [..._cache[2] || (_cache[2] = [
                  _createElementVNode(
                    "svg",
                    {
                      viewBox: "0 0 1024 1024",
                      width: "1em",
                      height: "1em"
                    },
                    [
                      _createElementVNode("path", {
                        fill: "currentColor",
                        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
                      })
                    ],
                    -1
                    /* CACHED */
                  )
                ])],
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true),
              _createCommentVNode(" \u7BAD\u5934\u56FE\u6807 "),
              _createElementVNode(
                "span",
                {
                  class: _normalizeClass([$setup.ns.e("icon"), $setup.ns.e("arrow"), {
                    "is-reverse": $setup.visible
                  }])
                },
                [..._cache[3] || (_cache[3] = [
                  _createElementVNode(
                    "svg",
                    {
                      viewBox: "0 0 1024 1024",
                      width: "1em",
                      height: "1em"
                    },
                    [
                      _createElementVNode("path", {
                        fill: "currentColor",
                        d: "M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
                      })
                    ],
                    -1
                    /* CACHED */
                  )
                ])],
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
      _createCommentVNode(" \u4E0B\u62C9\u6846 "),
      (_openBlock(), _createBlock(_Teleport, {
        to: "body",
        disabled: !$props.teleported
      }, [
        _createVNode(_Transition, {
          name: $setup.ns.b("dropdown"),
          persisted: ""
        }, {
          default: _withCtx(() => [
            _withDirectives(_createElementVNode(
              "div",
              {
                class: _normalizeClass([$setup.ns.e("dropdown"), $props.popperClass, `is-${$props.effect}`]),
                style: _normalizeStyle($props.teleported ? $setup.dropdownStyle : {}),
                onMousedown: $setup.handleDropdownMousedown,
                onMouseup: $setup.handleDropdownMouseup
              },
              [
                _createCommentVNode(" \u65E0\u6570\u636E "),
                $setup.filteredOptions.length === 0 ? (_openBlock(), _createElementBlock(
                  "div",
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e("empty"))
                  },
                  [
                    _renderSlot(_ctx.$slots, "empty", {}, () => [
                      _createTextVNode(
                        _toDisplayString($setup.t("select.noData")),
                        1
                        /* TEXT */
                      )
                    ])
                  ],
                  2
                  /* CLASS */
                )) : (_openBlock(), _createElementBlock(
                  _Fragment,
                  { key: 1 },
                  [
                    _createCommentVNode(" \u9009\u9879\u5217\u8868 "),
                    _createElementVNode("div", {
                      ref: "optionsRef",
                      id: `${$setup.inputId}-listbox`,
                      class: _normalizeClass($setup.ns.e("options")),
                      role: "listbox"
                    }, [
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList($setup.filteredOptions, (option, index) => {
                          return _openBlock(), _createElementBlock("div", {
                            key: option.value,
                            class: _normalizeClass([$setup.ns.e("option"), $setup.ns.is("selected", $props.modelValue === option.value), $setup.ns.is("disabled", option.disabled), $setup.ns.is("hovering", $setup.hoveredIndex === index)]),
                            role: "option",
                            "aria-selected": $props.modelValue === option.value,
                            onMousedown: _cache[0] || (_cache[0] = _withModifiers(() => {
                            }, ["prevent"])),
                            onClick: ($event) => $setup.handleOptionClick(option, $event),
                            onMouseenter: ($event) => $setup.hoveredIndex = index
                          }, [
                            _renderSlot(_ctx.$slots, "option", { option }, () => [
                              _createTextVNode(
                                _toDisplayString(option.label),
                                1
                                /* TEXT */
                              )
                            ]),
                            $props.modelValue === option.value ? (_openBlock(), _createElementBlock(
                              "span",
                              {
                                key: 0,
                                class: _normalizeClass($setup.ns.e("option-check"))
                              },
                              [..._cache[4] || (_cache[4] = [
                                _createElementVNode(
                                  "svg",
                                  {
                                    viewBox: "0 0 1024 1024",
                                    width: "1em",
                                    height: "1em"
                                  },
                                  [
                                    _createElementVNode("path", {
                                      fill: "currentColor",
                                      d: "M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
                                    })
                                  ],
                                  -1
                                  /* CACHED */
                                )
                              ])],
                              2
                              /* CLASS */
                            )) : _createCommentVNode("v-if", true)
                          ], 42, _hoisted_3);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ], 10, _hoisted_2)
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                ))
              ],
              38
              /* CLASS, STYLE, NEED_HYDRATION */
            ), [
              [_vShow, $setup.visible]
            ])
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["name"])
      ], 8, ["disabled"]))
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
var __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhTimeSelect"
}, {
  __name: "time-select",
  props: {
    modelValue: { type: String, required: false },
    disabled: { type: Boolean, required: false, default: false },
    editable: { type: Boolean, required: false, default: true },
    clearable: { type: Boolean, required: false, default: true },
    size: { type: String, required: false, default: void 0 },
    placeholder: { type: String, required: false, default: "" },
    name: { type: String, required: false },
    effect: { type: String, required: false, default: "light" },
    prefixIcon: { type: null, required: false },
    clearIcon: { type: null, required: false },
    start: { type: String, required: false, default: "09:00" },
    end: { type: String, required: false, default: "18:00" },
    step: { type: String, required: false, default: "00:30" },
    minTime: { type: String, required: false },
    maxTime: { type: String, required: false },
    valueOnClear: { type: String, required: false },
    format: { type: String, required: false, default: "HH:mm" },
    popperClass: { type: String, required: false },
    popperStyle: { type: [String, Object], required: false },
    teleported: { type: Boolean, required: false, default: true },
    includeEndTime: { type: Boolean, required: false, default: false },
    validateEvent: { type: Boolean, required: false, default: true },
    options: { type: Array, required: false },
    disabledHours: { type: Array, required: false },
    themeOverrides: { type: null, required: false }
  },
  emits: ["update:modelValue", "change", "focus", "blur", "clear", "visible-change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("time-select");
    const { t } = useLocale();
    const inputId = useId();
    const { themeStyle } = useComponentTheme("time-select", computed11(() => props.themeOverrides));
    const { form, formItem, validate: triggerValidate } = useFormItem();
    const { globalSize } = useConfig();
    const selectSize = computed11(() => props.size || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalSize.value || "default");
    const wrapperRef = ref12();
    const inputRef = ref12();
    const optionsRef = ref12();
    const visible = ref12(false);
    const focused = ref12(false);
    const hovering = ref12(false);
    const query = ref12("");
    const hoveredIndex = ref12(-1);
    const isClickingDropdown = ref12(false);
    const dropdownStyle = ref12({});
    const timeOptions = computed11(() => {
      if (props.options && props.options.length > 0) {
        return props.options;
      }
      return generateTimeOptions(
        props.start,
        props.end,
        props.step,
        props.format,
        props.includeEndTime
      );
    });
    const filteredOptions = computed11(() => {
      let options = timeOptions.value;
      if (props.disabledHours && props.disabledHours.length > 0) {
        options = options.map((opt) => {
          const isDisabled = props.disabledHours.some((range) => {
            if (range.length >= 2) {
              return isTimeInRange(opt.value, range[0], range[1]);
            }
            return false;
          });
          return __spreadProps(__spreadValues2({}, opt), { disabled: opt.disabled || isDisabled });
        });
      }
      if (props.minTime) {
        const minMinutes = parseTimeToMinutes(props.minTime);
        options = options.map((opt) => __spreadProps(__spreadValues2({}, opt), {
          disabled: opt.disabled || parseTimeToMinutes(opt.value) < minMinutes
        }));
      }
      if (props.maxTime) {
        const maxMinutes = parseTimeToMinutes(props.maxTime);
        options = options.map((opt) => __spreadProps(__spreadValues2({}, opt), {
          disabled: opt.disabled || parseTimeToMinutes(opt.value) > maxMinutes
        }));
      }
      if (query.value && props.editable) {
        const q = query.value.toLowerCase();
        return options.filter(
          (opt) => opt.label.toLowerCase().includes(q) || opt.value.toLowerCase().includes(q)
        );
      }
      return options;
    });
    const displayLabel = computed11(() => {
      if (!props.modelValue) return "";
      const opt = timeOptions.value.find((o) => o.value === props.modelValue);
      return opt ? opt.label : props.modelValue;
    });
    const showClear = computed11(
      () => props.clearable && !props.disabled && props.modelValue !== void 0 && props.modelValue !== "" && (focused.value || hovering.value)
    );
    const hasValue = computed11(
      () => props.modelValue !== void 0 && props.modelValue !== ""
    );
    const wrapperClasses = computed11(() => [
      ns.b(),
      ns.m(selectSize.value),
      ns.is("disabled", props.disabled),
      ns.is("focused", focused.value || visible.value)
    ]);
    const updateDropdownPosition = () => {
      if (!wrapperRef.value || !props.teleported) return;
      const rect = wrapperRef.value.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = 274;
      const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
      const styles = window.getComputedStyle(wrapperRef.value);
      const primary = styles.getPropertyValue("--yh-color-primary").trim();
      const primaryRgb = styles.getPropertyValue("--yh-color-primary-rgb").trim();
      dropdownStyle.value = __spreadValues2({
        position: "fixed",
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        zIndex: "2000",
        "--yh-color-primary": primary,
        "--yh-color-primary-rgb": primaryRgb
      }, showAbove ? { bottom: `${window.innerHeight - rect.top + 4}px` } : { top: `${rect.bottom + 4}px` });
    };
    const scrollToSelected = () => {
      if (!optionsRef.value || !props.modelValue) return;
      nextTick(() => {
        var _a2;
        const selectedEl = (_a2 = optionsRef.value) == null ? void 0 : _a2.querySelector(`.${ns.is("selected", true).slice(1)}`);
        if (selectedEl && optionsRef.value) {
          const containerHeight = optionsRef.value.clientHeight;
          const scrollTop = selectedEl.offsetTop - containerHeight / 2 + selectedEl.offsetHeight / 2;
          optionsRef.value.scrollTop = Math.max(0, scrollTop);
        }
      });
    };
    watch4(visible, (val) => {
      if (val) {
        if (props.teleported) {
          nextTick(updateDropdownPosition);
        }
        scrollToSelected();
        query.value = "";
      }
      emit("visible-change", val);
    });
    onMounted3(() => {
      if (props.teleported) {
        window.addEventListener("scroll", updateDropdownPosition, true);
        window.addEventListener("resize", updateDropdownPosition);
      }
    });
    onBeforeUnmount2(() => {
      if (props.teleported) {
        window.removeEventListener("scroll", updateDropdownPosition, true);
        window.removeEventListener("resize", updateDropdownPosition);
      }
    });
    const handleOptionSelect = (option, event) => {
      if (option.disabled) return;
      if (event) {
        event.stopPropagation();
      }
      emit("update:modelValue", option.value);
      emit("change", option.value);
      visible.value = false;
      query.value = "";
      if (props.validateEvent) {
        triggerValidate("change");
      }
    };
    const handleClear = (event) => {
      var _a2;
      event.stopPropagation();
      const value = (_a2 = props.valueOnClear) != null ? _a2 : void 0;
      emit("update:modelValue", value);
      emit("change", value);
      emit("clear");
      query.value = "";
      if (props.validateEvent) {
        triggerValidate("change");
      }
    };
    const toggleDropdown = () => {
      if (props.disabled) return;
      visible.value = !visible.value;
      if (visible.value) {
        nextTick(() => {
          var _a2;
          (_a2 = inputRef.value) == null ? void 0 : _a2.focus();
        });
      }
    };
    const handleInput = (event) => {
      if (!props.editable) return;
      const target = event.target;
      query.value = target.value;
    };
    const handleKeydown = (event) => {
      var _a2, _b;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (!visible.value) {
            visible.value = true;
          } else {
            let nextIndex = hoveredIndex.value + 1;
            while (nextIndex < filteredOptions.value.length && ((_a2 = filteredOptions.value[nextIndex]) == null ? void 0 : _a2.disabled)) {
              nextIndex++;
            }
            if (nextIndex < filteredOptions.value.length) {
              hoveredIndex.value = nextIndex;
            }
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          let prevIndex = hoveredIndex.value - 1;
          while (prevIndex >= 0 && ((_b = filteredOptions.value[prevIndex]) == null ? void 0 : _b.disabled)) {
            prevIndex--;
          }
          if (prevIndex >= 0) {
            hoveredIndex.value = prevIndex;
          }
          break;
        case "Enter":
          event.preventDefault();
          if (visible.value && hoveredIndex.value >= 0 && filteredOptions.value[hoveredIndex.value]) {
            handleOptionSelect(filteredOptions.value[hoveredIndex.value]);
          } else if (!visible.value) {
            visible.value = true;
          }
          break;
        case "Escape":
          visible.value = false;
          break;
        case "Tab":
          visible.value = false;
          break;
      }
    };
    const handleFocus = (event) => {
      focused.value = true;
      emit("focus", event);
    };
    const handleBlur = (event) => {
      if (isClickingDropdown.value) {
        return;
      }
      focused.value = false;
      visible.value = false;
      emit("blur", event);
      if (props.validateEvent) {
        triggerValidate("blur");
      }
    };
    const handleDropdownMousedown = (event) => {
      event.preventDefault();
      isClickingDropdown.value = true;
    };
    const handleDropdownMouseup = () => {
      setTimeout(() => {
        isClickingDropdown.value = false;
      }, 0);
    };
    const handleOptionClick = (option, event) => {
      event.stopPropagation();
      handleOptionSelect(option, event);
      nextTick(() => {
        var _a2;
        (_a2 = inputRef.value) == null ? void 0 : _a2.focus();
      });
    };
    const handleMouseEnter = () => {
      hovering.value = true;
    };
    const handleMouseLeave = () => {
      hovering.value = false;
    };
    const focus = () => {
      var _a2;
      (_a2 = inputRef.value) == null ? void 0 : _a2.focus();
    };
    const blur = () => {
      var _a2;
      (_a2 = inputRef.value) == null ? void 0 : _a2.blur();
    };
    __expose({
      focus,
      blur,
      inputRef: inputRef.value
    });
    const __returned__ = { props, emit, ns, t, inputId, themeStyle, form, formItem, triggerValidate, globalSize, selectSize, wrapperRef, inputRef, optionsRef, visible, focused, hovering, query, hoveredIndex, isClickingDropdown, dropdownStyle, timeOptions, filteredOptions, displayLabel, showClear, hasValue, wrapperClasses, updateDropdownPosition, scrollToSelected, handleOptionSelect, handleClear, toggleDropdown, handleInput, handleKeydown, handleFocus, handleBlur, handleDropdownMousedown, handleDropdownMouseup, handleOptionClick, handleMouseEnter, handleMouseLeave, focus, blur, computed: computed11, ref: ref12, nextTick, watch: watch4, onMounted: onMounted3, onBeforeUnmount: onBeforeUnmount2, get useNamespace() {
      return useNamespace;
    }, get useFormItem() {
      return useFormItem;
    }, get useId() {
      return useId;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get useConfig() {
      return useConfig;
    }, get generateTimeOptions() {
      return generateTimeOptions;
    }, get parseTimeToMinutes() {
      return parseTimeToMinutes;
    }, get isTimeInRange() {
      return isTimeInRange;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__.render = render;
var stdin_default2 = __sfc__;
export {
  stdin_default2 as default
};
