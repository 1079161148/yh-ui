// public/codesandbox-runtime/components/ai-sender/src/ai-sender.js
import { createCommentVNode as _createCommentVNode7, createVNode as _createVNode3, toDisplayString as _toDisplayString4, createElementVNode as _createElementVNode6, normalizeClass as _normalizeClass6, openBlock as _openBlock7, createElementBlock as _createElementBlock7, Transition as _Transition3, withCtx as _withCtx4, renderList as _renderList3, Fragment as _Fragment5, renderSlot as _renderSlot6, createBlock as _createBlock7, normalizeStyle as _normalizeStyle6 } from "vue";

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
var defaultInitialZIndex = 2e3;
var zIndexContextKey = Symbol("zIndexContextKey");
var zIndexCounterKey = Symbol("zIndexCounterKey");
var getNextZIndex = () => {
  if (typeof window !== "undefined") {
    const windowContext = window;
    if (windowContext.__YH_Z_INDEX__ === void 0) {
      windowContext.__YH_Z_INDEX__ = defaultInitialZIndex;
    }
    return ++windowContext.__YH_Z_INDEX__;
  }
  return defaultInitialZIndex;
};
var useZIndex = (zIndexOverrides) => {
  const injectedZIndex = inject2(zIndexContextKey, void 0);
  const appCounter = inject2(zIndexCounterKey, null);
  const initialZIndex = computed(() => {
    var _a3;
    const override = unref2(zIndexOverrides);
    return (_a3 = override != null ? override : unref2(injectedZIndex)) != null ? _a3 : defaultInitialZIndex;
  });
  const currentZIndex = computed(() => initialZIndex.value);
  const nextZIndex = () => {
    const override = unref2(zIndexOverrides);
    if (override !== void 0) return override;
    if (appCounter) {
      return ++appCounter.current;
    }
    return getNextZIndex();
  };
  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  };
};

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
    var _a3, _b;
    return (_b = (_a3 = unref4(localeOverrides)) != null ? _a3 : unref4(globalLocale)) != null ? _b : zhCn;
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

// public/codesandbox-runtime/components/ai-sender/src/ai-sender.js
import { ref as ref17, computed as computed17, nextTick as nextTick2, watch as watch7 } from "vue";

// public/codesandbox-runtime/components/ai-sender/src/ai-sender-meta.js
var aiSenderProps = {
  /**
   * 绑定值
   */
  modelValue: {
    type: String,
    default: ""
  },
  /**
   * 占位符
   */
  placeholder: {
    type: String,
    default: "Send a message..."
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 是否加载中
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * 是否显示清空按钮
   */
  clearable: {
    type: Boolean,
    default: false
  },
  /**
   * 最大长度
   */
  maxLength: Number,
  /**
   * 是否显示字数限制
   */
  showWordLimit: {
    type: Boolean,
    default: false
  },
  /**
   * 快捷命令列表
   */
  commands: {
    type: Array,
    default: () => []
  },
  /**
   * AI 提及配置
   */
  mentionOptions: {
    type: Array,
    default: () => []
  },
  /**
   * 已选附件列表
   */
  attachments: {
    type: Array,
    default: () => []
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
var aiSenderEmits = {
  "update:modelValue": (_val) => true,
  send: (_val) => true,
  change: (_val) => true,
  clear: () => true,
  focus: (_e) => true,
  blur: (_e) => true,
  /**
   * 快捷命令选中时触发
   */
  command: (_command) => true,
  /**
   * 附件移除时触发
   */
  "remove-attachment": (_attachment) => true,
  /**
   * 文件上传/拖入时触发
   */
  upload: (_files) => true
};

// public/codesandbox-runtime/utils/dom.js
var isClient = typeof window !== "undefined";
var getStyle = (element, styleName) => {
  var _a3;
  if (!isClient || !element || !styleName) return "";
  try {
    const style = element.style[styleName];
    if (style) return style;
    const computed18 = (_a3 = document.defaultView) == null ? void 0 : _a3.getComputedStyle(element, "");
    return computed18 ? computed18[styleName] : "";
  } catch (e) {
    return element.style[styleName];
  }
};
var getScrollContainer = (el, isVertical) => {
  if (!isClient) return void 0;
  let parent = el;
  while (parent) {
    if ([document.documentElement, document.body].includes(parent)) {
      return window;
    }
    const overflow = isVertical ? getStyle(parent, "overflowY") : getStyle(parent, "overflow");
    if (/(scroll|auto)/.test(overflow)) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return void 0;
};

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

// public/codesandbox-runtime/components/button/src/button.js
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

// public/codesandbox-runtime/components/icon/src/icon.js
import { createCommentVNode as _createCommentVNode2, resolveDynamicComponent as _resolveDynamicComponent2, openBlock as _openBlock2, createBlock as _createBlock2, createElementBlock as _createElementBlock2, Fragment as _Fragment, renderSlot as _renderSlot2, mergeProps as _mergeProps } from "vue";
import { computed as computed12, useSlots as useSlots2 } from "vue";

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
var _hoisted_1 = ["viewBox", "innerHTML"];
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock2(), _createElementBlock2(
    "i",
    _mergeProps({
      class: $setup.iconClass,
      style: $setup.iconStyle
    }, _ctx.$attrs),
    [
      _createCommentVNode2(" \u4F7F\u7528\u4F20\u5165\u7684\u56FE\u6807\u7EC4\u4EF6 "),
      $setup.useIconComponent ? (_openBlock2(), _createBlock2(_resolveDynamicComponent2(_ctx.icon), {
        key: 0,
        class: "yh-icon__inner"
      })) : $setup.svgContent && !$setup.hasSlot ? (_openBlock2(), _createElementBlock2(
        _Fragment,
        { key: 1 },
        [
          _createCommentVNode2(" \u4F7F\u7528 SVG \u5B57\u7B26\u4E32\u6E32\u67D3 "),
          _createCommentVNode2(" eslint-disable vue/no-v-html "),
          (_openBlock2(), _createElementBlock2("svg", {
            class: "yh-icon__svg",
            viewBox: $setup.viewBox,
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": "true",
            innerHTML: $setup.svgContent
          }, null, 8, _hoisted_1))
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      )) : $setup.hasSlot ? (_openBlock2(), _createElementBlock2(
        _Fragment,
        { key: 2 },
        [
          _createCommentVNode2(" eslint-enable vue/no-v-html "),
          _createCommentVNode2(" \u4F7F\u7528\u63D2\u69FD\u81EA\u5B9A\u4E49\u5185\u5BB9 "),
          _renderSlot2(_ctx.$slots, "default")
        ],
        64
        /* STABLE_FRAGMENT */
      )) : _createCommentVNode2("v-if", true)
    ],
    16
    /* FULL_PROPS */
  );
}
var __sfc__2 = /* @__PURE__ */ Object.assign({
  name: "YhIcon",
  inheritAttrs: false
}, {
  __name: "icon",
  props: iconProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const slots = useSlots2();
    const ns = useNamespace("icon");
    const { themeStyle } = useComponentTheme(
      "icon",
      computed12(() => props.themeOverrides)
    );
    const iconStyle = computed12(() => {
      const style = __spreadValues3({}, themeStyle.value);
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
    const iconClass = computed12(() => [
      ns.b(),
      {
        [ns.m("spin")]: props.spin
      }
    ]);
    const svgContent = computed12(() => {
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
    const viewBox = computed12(() => {
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
    const hasSlot = computed12(() => !!slots.default);
    const useIconComponent = computed12(() => {
      return props.icon && !("__svg" in props.icon);
    });
    const __returned__ = { props, slots, ns, themeStyle, iconStyle, iconClass, svgContent, viewBox, hasSlot, useIconComponent, computed: computed12, useSlots: useSlots2, get iconProps() {
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
__sfc__2.render = render2;
var stdin_default3 = __sfc__2;

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
var YhIcon = withInstall(stdin_default3);

// public/codesandbox-runtime/components/image/src/image.js
import { renderSlot as _renderSlot3, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass3, createElementVNode as _createElementVNode3, createCommentVNode as _createCommentVNode4, normalizeStyle as _normalizeStyle3, openBlock as _openBlock4, createElementBlock as _createElementBlock4, createBlock as _createBlock4 } from "vue";
import { computed as computed14, ref as ref14, onMounted as onMounted4, onUnmounted as onUnmounted5, watch as watch5 } from "vue";

// public/codesandbox-runtime/components/image/src/image-meta.js
var imageProps = {
  /**
   * @description 图片源地址
   */
  src: {
    type: String,
    default: ""
  },
  /**
   * @description 确定图片如何适应容器框
   */
  fit: {
    type: String,
    default: ""
  },
  /**
   * @description 是否使用懒加载
   */
  lazy: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否开启预览
   */
  previewSrcList: {
    type: Array,
    default: () => []
  },
  /**
   * @description 预览的 z-index
   */
  zIndex: {
    type: Number
  },
  /**
   * @description 开启预览图片时，第一张显示的图片索引
   */
  initialIndex: {
    type: Number,
    default: 0
  },
  /**
   * @description 预览是否可以按 ESC 关闭
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /**
   * @description 预览是否在点击遮罩层时关闭
   */
  hideOnClickModal: {
    type: Boolean,
    default: false
  },
  /**
   * @description 预览模式下是否展示操作栏
   */
  showProgress: {
    type: Boolean,
    default: true
  },
  /**
   * @description 预览模式下是否可以缩放
   */
  zoomRate: {
    type: Number,
    default: 1.2
  },
  /**
   * @description 无限循环预览
   */
  infinite: {
    type: Boolean,
    default: true
  },
  /**
   * @description 跨域设置
   */
  crossorigin: {
    type: String
  },
  /**
   * @description 原生 alt 属性
   */
  alt: String,
  /**
   * @description 原生 loading 属性
   */
  loading: String,
  /**
   * @description 预览容器渲染到的目标节点
   */
  previewTeleported: {
    type: Boolean,
    default: true
  },
  /**
   * @description 开启懒加载后，指定滚动的容器
   */
  scrollContainer: {
    type: [String, Object]
  },
  /**
   * @description 预览模式，'default' 为内置预览器，'viewerjs' 为外部 viewerjs (需自行安装依赖)
   */
  viewerMode: {
    type: String,
    default: "default"
  },
  /**
   * @description 传递给 viewerjs 的配置项
   */
  viewerOptions: {
    type: Object,
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};

// public/codesandbox-runtime/components/image/src/image-viewer.js
import { normalizeClass as _normalizeClass2, createElementVNode as _createElementVNode2, createCommentVNode as _createCommentVNode3, openBlock as _openBlock3, createElementBlock as _createElementBlock3, Fragment as _Fragment2, normalizeStyle as _normalizeStyle2, Teleport as _Teleport, createBlock as _createBlock3 } from "vue";
import { computed as computed13, ref as ref13, onMounted as onMounted3, onUnmounted as onUnmounted4, watch as watch4 } from "vue";

// public/codesandbox-runtime/components/image/src/image-viewer-meta.js
var imageViewerProps = {
  /**
   * @description 预览图片源列表
   */
  urlList: {
    type: Array,
    default: () => []
  },
  /**
   * @description 预览的 z-index
   */
  zIndex: {
    type: Number,
    default: 2e3
  },
  /**
   * @description 开启预览图片时，第一张显示的图片索引
   */
  initialIndex: {
    type: Number,
    default: 0
  },
  /**
   * @description 无限循环预览
   */
  infinite: {
    type: Boolean,
    default: true
  },
  /**
   * @description 点击遮罩层是否关闭
   */
  hideOnClickModal: {
    type: Boolean,
    default: false
  },
  /**
   * @description 预览是否可以按 ESC 关闭
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /**
   * @description 缩放比例
   */
  zoomRate: {
    type: Number,
    default: 1.2
  },
  /**
   * @description 是否展示操作栏
   */
  showProgress: {
    type: Boolean,
    default: true
  },
  /**
   * @description 预览容器渲染到的目标节点
   */
  teleported: {
    type: Boolean,
    default: true
  },
  /**
   * @description 预览模式，'default' 为内置预览器，'viewerjs' 为外部 viewerjs
   */
  viewerMode: {
    type: String,
    default: "default"
  },
  /**
   * @description 传递给 viewerjs 的配置项
   */
  viewerOptions: {
    type: Object,
    default: () => ({})
  }
};
var imageViewerEmits = {
  close: () => true,
  switch: (index) => typeof index === "number"
};

// public/codesandbox-runtime/components/viewerjs.js
import * as viewerModule from "viewerjs";
var _a2;
var Viewer = "default" in viewerModule ? (_a2 = viewerModule.default) != null ? _a2 : viewerModule : viewerModule;
var stdin_default4 = Viewer;

// public/codesandbox-runtime/components/image/src/image-viewer.js
import "viewerjs/dist/viewer.css";
var __defProp4 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
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
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
var _hoisted_12 = ["src"];
function render3(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock3(), _createBlock3(_Teleport, {
    to: "body",
    disabled: !_ctx.teleported
  }, [
    _ctx.viewerMode !== "viewerjs" ? (_openBlock3(), _createElementBlock3(
      "div",
      {
        key: 0,
        class: _normalizeClass2($setup.ns.b()),
        style: _normalizeStyle2({
          zIndex: _ctx.zIndex
        })
      },
      [
        _createElementVNode2(
          "div",
          {
            class: _normalizeClass2($setup.ns.e("mask")),
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.hideOnClickModal && $setup.handleClose())
          },
          null,
          2
          /* CLASS */
        ),
        _createCommentVNode3(" Close "),
        _createElementVNode2(
          "span",
          {
            class: _normalizeClass2([$setup.ns.e("btn"), $setup.ns.e("close")]),
            onClick: $setup.handleClose
          },
          [..._cache[1] || (_cache[1] = [
            _createElementVNode2(
              "svg",
              {
                viewBox: "0 0 1024 1024",
                width: "1em",
                height: "1em"
              },
              [
                _createElementVNode2("path", {
                  fill: "currentColor",
                  d: "M512 456.2L794.8 173.4l55.8 55.8L567.8 512l282.8 282.8-55.8 55.8L512 567.8 229.2 850.6l-55.8-55.8L456.2 512 173.4 229.2l55.8-55.8L512 456.2z"
                })
              ],
              -1
              /* CACHED */
            )
          ])],
          2
          /* CLASS */
        ),
        _createCommentVNode3(" Arrows "),
        _ctx.urlList.length > 1 ? (_openBlock3(), _createElementBlock3(
          _Fragment2,
          { key: 0 },
          [
            _createElementVNode2(
              "span",
              {
                class: _normalizeClass2([$setup.ns.e("btn"), $setup.ns.e("prev")]),
                onClick: $setup.handlePrev
              },
              [..._cache[2] || (_cache[2] = [
                _createElementVNode2(
                  "svg",
                  {
                    viewBox: "0 0 1024 1024",
                    width: "1em",
                    height: "1em"
                  },
                  [
                    _createElementVNode2("path", {
                      fill: "currentColor",
                      d: "M609.4 824.6L296.8 512l312.6-312.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L228.9 489.4c-12.5 12.5-12.5 32.8 0 45.3l335.2 335.2c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"
                    })
                  ],
                  -1
                  /* CACHED */
                )
              ])],
              2
              /* CLASS */
            ),
            _createElementVNode2(
              "span",
              {
                class: _normalizeClass2([$setup.ns.e("btn"), $setup.ns.e("next")]),
                onClick: $setup.handleNext
              },
              [..._cache[3] || (_cache[3] = [
                _createElementVNode2(
                  "svg",
                  {
                    viewBox: "0 0 1024 1024",
                    width: "1em",
                    height: "1em"
                  },
                  [
                    _createElementVNode2("path", {
                      fill: "currentColor",
                      d: "M414.6 824.6l312.6-312.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L346.7 802.1c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L727.2 512 414.6 199.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l335.2 335.2c12.5 12.5 12.5 32.8 0 45.3L369.3 915.1c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
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
          64
          /* STABLE_FRAGMENT */
        )) : _createCommentVNode3("v-if", true),
        _createCommentVNode3(" Actions "),
        _ctx.showProgress ? (_openBlock3(), _createElementBlock3(
          "div",
          {
            key: 1,
            class: _normalizeClass2($setup.ns.e("actions"))
          },
          [
            _createElementVNode2(
              "div",
              {
                class: _normalizeClass2($setup.ns.e("actions-inner"))
              },
              [
                _createElementVNode2(
                  "i",
                  {
                    class: _normalizeClass2($setup.ns.e("zoom-out")),
                    onClick: $setup.handleZoomOut
                  },
                  [..._cache[4] || (_cache[4] = [
                    _createElementVNode2(
                      "svg",
                      {
                        viewBox: "0 0 1024 1024",
                        width: "1em",
                        height: "1em"
                      },
                      [
                        _createElementVNode2("path", {
                          fill: "currentColor",
                          d: "M192 480h640v64H192z"
                        })
                      ],
                      -1
                      /* CACHED */
                    )
                  ])],
                  2
                  /* CLASS */
                ),
                _createElementVNode2(
                  "i",
                  {
                    class: _normalizeClass2($setup.ns.e("zoom-in")),
                    onClick: $setup.handleZoomIn
                  },
                  [..._cache[5] || (_cache[5] = [
                    _createElementVNode2(
                      "svg",
                      {
                        viewBox: "0 0 1024 1024",
                        width: "1em",
                        height: "1em"
                      },
                      [
                        _createElementVNode2("path", {
                          fill: "currentColor",
                          d: "M480 480V224h64v256h256v64H544v256h-64V544H224v-64h256z"
                        })
                      ],
                      -1
                      /* CACHED */
                    )
                  ])],
                  2
                  /* CLASS */
                ),
                _createElementVNode2(
                  "i",
                  {
                    class: _normalizeClass2($setup.ns.e("reset")),
                    onClick: $setup.reset
                  },
                  [..._cache[6] || (_cache[6] = [
                    _createElementVNode2(
                      "svg",
                      {
                        viewBox: "0 0 1024 1024",
                        width: "1em",
                        height: "1em"
                      },
                      [
                        _createElementVNode2("path", {
                          fill: "currentColor",
                          d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 64a384 384 0 1 0 0 768 384 384 0 0 0 0-768zm0 128a256 256 0 1 1 0 512 256 256 0 0 1 0-512z"
                        })
                      ],
                      -1
                      /* CACHED */
                    )
                  ])],
                  2
                  /* CLASS */
                ),
                _createElementVNode2(
                  "i",
                  {
                    class: _normalizeClass2($setup.ns.e("rotate-left")),
                    onClick: $setup.handleRotateLeft
                  },
                  [..._cache[7] || (_cache[7] = [
                    _createElementVNode2(
                      "svg",
                      {
                        viewBox: "0 0 1024 1024",
                        width: "1em",
                        height: "1em"
                      },
                      [
                        _createElementVNode2("path", {
                          fill: "currentColor",
                          d: "M512 128c-212.1 0-384 171.9-384 384s171.9 384 384 384 384-171.9 384-384h-64c0 176.7-143.3 320-320 320s-320-143.3-320-320 143.3-320 320-320v64l192-128-192-128v64z"
                        })
                      ],
                      -1
                      /* CACHED */
                    )
                  ])],
                  2
                  /* CLASS */
                ),
                _createElementVNode2(
                  "i",
                  {
                    class: _normalizeClass2($setup.ns.e("rotate-right")),
                    onClick: $setup.handleRotateRight
                  },
                  [..._cache[8] || (_cache[8] = [
                    _createElementVNode2(
                      "svg",
                      {
                        viewBox: "0 0 1024 1024",
                        width: "1em",
                        height: "1em"
                      },
                      [
                        _createElementVNode2("path", {
                          fill: "currentColor",
                          d: "M512 128V64L320 192l192 128v-64c176.7 0 320 143.3 320 320s-143.3 320-320 320-320-143.3-320-320h-64c0 212.1 171.9 384 384 384s384-171.9 384-384-171.9-384-384-384z"
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
        )) : _createCommentVNode3("v-if", true),
        _createCommentVNode3(" Canvas "),
        _createElementVNode2(
          "div",
          {
            class: _normalizeClass2($setup.ns.e("canvas"))
          },
          [
            _createElementVNode2("img", {
              src: _ctx.urlList[$setup.index],
              class: _normalizeClass2($setup.ns.e("img")),
              style: _normalizeStyle2({
                transform: $setup.transform
              })
            }, null, 14, _hoisted_12)
          ],
          2
          /* CLASS */
        )
      ],
      6
      /* CLASS, STYLE */
    )) : _createCommentVNode3("v-if", true)
  ], 8, ["disabled"]);
}
var __sfc__3 = /* @__PURE__ */ Object.assign({
  name: "YhImageViewer"
}, {
  __name: "image-viewer",
  props: imageViewerProps,
  emits: imageViewerEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("viewer");
    const index = ref13(props.initialIndex);
    const scale = ref13(1);
    const rotate = ref13(0);
    let viewer = null;
    let viewerList = null;
    const transform = computed13(() => {
      return `scale(${scale.value}) rotate(${rotate.value}deg)`;
    });
    const handleClose = () => {
      emit("close");
    };
    const initViewerJS = () => {
      const list = document.createElement("div");
      list.style.display = "none";
      props.urlList.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        list.appendChild(img);
      });
      document.body.appendChild(list);
      viewerList = list;
      const nextViewer = new stdin_default4(list, __spreadProps2(__spreadValues4({}, props.viewerOptions), {
        initialViewIndex: props.initialIndex,
        hidden: () => {
          if (viewerList) {
            document.body.removeChild(viewerList);
            viewerList = null;
          }
          viewer == null ? void 0 : viewer.destroy();
          viewer = null;
          emit("close");
        }
      }));
      viewer = nextViewer;
      nextViewer.show();
    };
    const handlePrev = () => {
      const len = props.urlList.length;
      if (len <= 1) return;
      if (index.value > 0) {
        index.value--;
      } else if (props.infinite) {
        index.value = len - 1;
      }
    };
    const handleNext = () => {
      const len = props.urlList.length;
      if (len <= 1) return;
      if (index.value < len - 1) {
        index.value++;
      } else if (props.infinite) {
        index.value = 0;
      }
    };
    const handleZoomIn = () => {
      scale.value *= props.zoomRate;
    };
    const handleZoomOut = () => {
      scale.value /= props.zoomRate;
    };
    const handleRotateLeft = () => {
      rotate.value -= 90;
    };
    const handleRotateRight = () => {
      rotate.value += 90;
    };
    const reset = () => {
      scale.value = 1;
      rotate.value = 0;
    };
    watch4(index, (val) => {
      reset();
      emit("switch", val);
    });
    watch4(
      () => props.initialIndex,
      (val) => {
        index.value = val;
      }
    );
    const handleKeyDown = (e) => {
      if (props.viewerMode === "viewerjs") return;
      if (e.key === "Escape" && props.closeOnPressEscape) {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowUp") {
        handleZoomIn();
      } else if (e.key === "ArrowDown") {
        handleZoomOut();
      }
    };
    onMounted3(() => {
      if (props.viewerMode === "viewerjs") {
        initViewerJS();
      } else {
        window.addEventListener("keydown", handleKeyDown);
      }
    });
    onUnmounted4(() => {
      window.removeEventListener("keydown", handleKeyDown);
      if (viewer) {
        viewer.destroy();
        viewer = null;
      }
      if (viewerList) {
        document.body.removeChild(viewerList);
        viewerList = null;
      }
    });
    const __returned__ = { props, emit, ns, index, scale, rotate, get viewer() {
      return viewer;
    }, set viewer(v) {
      viewer = v;
    }, get viewerList() {
      return viewerList;
    }, set viewerList(v) {
      viewerList = v;
    }, transform, handleClose, initViewerJS, handlePrev, handleNext, handleZoomIn, handleZoomOut, handleRotateLeft, handleRotateRight, reset, handleKeyDown, computed: computed13, ref: ref13, onMounted: onMounted3, onUnmounted: onUnmounted4, watch: watch4, get useNamespace() {
      return useNamespace;
    }, get imageViewerProps() {
      return imageViewerProps;
    }, get imageViewerEmits() {
      return imageViewerEmits;
    }, get Viewer() {
      return stdin_default4;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__3.render = render3;
var stdin_default5 = __sfc__3;

// public/codesandbox-runtime/components/image/src/image.js
import "viewerjs/dist/viewer.css";
var __defProp5 = Object.defineProperty;
var __defProps3 = Object.defineProperties;
var __getOwnPropDescs3 = Object.getOwnPropertyDescriptors;
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
var __spreadProps3 = (a, b) => __defProps3(a, __getOwnPropDescs3(b));
var _hoisted_13 = ["src", "alt", "crossorigin", "loading"];
function render4(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock4(), _createElementBlock4(
    "div",
    {
      ref: "container",
      class: _normalizeClass3($setup.ns.b()),
      style: _normalizeStyle3($setup.themeStyle)
    },
    [
      $setup.isLoading ? _renderSlot3(_ctx.$slots, "placeholder", { key: 0 }, () => [
        _createElementVNode3(
          "div",
          {
            class: _normalizeClass3($setup.ns.e("placeholder"))
          },
          _toDisplayString($setup.t("button.loading")),
          3
          /* TEXT, CLASS */
        )
      ]) : $setup.error ? _renderSlot3(_ctx.$slots, "error", { key: 1 }, () => [
        _createElementVNode3(
          "div",
          {
            class: _normalizeClass3($setup.ns.e("error"))
          },
          _toDisplayString($setup.t("image.error")),
          3
          /* TEXT, CLASS */
        )
      ]) : (_openBlock4(), _createElementBlock4("img", {
        key: 2,
        src: _ctx.src,
        alt: _ctx.alt,
        class: _normalizeClass3([$setup.ns.e("inner"), $setup.preview && $setup.ns.is("preview")]),
        style: _normalizeStyle3($setup.imageStyle),
        crossorigin: _ctx.crossorigin,
        loading: $setup.props.loading,
        onClick: $setup.clickHandler
      }, null, 14, _hoisted_13)),
      _createCommentVNode4(" Viewer "),
      $setup.preview && $setup.showViewer ? (_openBlock4(), _createBlock4($setup["YhImageViewer"], {
        key: 3,
        "url-list": _ctx.previewSrcList,
        "z-index": _ctx.zIndex,
        "initial-index": _ctx.initialIndex,
        infinite: _ctx.infinite,
        "hide-on-click-modal": _ctx.hideOnClickModal,
        "close-on-press-escape": _ctx.closeOnPressEscape,
        "show-progress": _ctx.showProgress,
        "zoom-rate": _ctx.zoomRate,
        teleported: _ctx.previewTeleported,
        onClose: $setup.closeViewer,
        onSwitch: $setup.handleSwitch
      }, null, 8, ["url-list", "z-index", "initial-index", "infinite", "hide-on-click-modal", "close-on-press-escape", "show-progress", "zoom-rate", "teleported"])) : _createCommentVNode4("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__4 = /* @__PURE__ */ Object.assign({
  name: "YhImage"
}, {
  __name: "image",
  props: imageProps,
  emits: ["load", "error", "switch", "close", "show"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("image");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme(
      "image",
      computed14(() => props.themeOverrides)
    );
    const isLoading = ref14(true);
    const error = ref14(false);
    const showViewer = ref14(false);
    const container = ref14();
    const isLazy = ref14(false);
    let viewer = null;
    let viewerList = null;
    const isSupportNativeLazy = isClient && "loading" in HTMLImageElement.prototype;
    const imageStyle = computed14(() => {
      const { fit } = props;
      if (fit) {
        return { "object-fit": fit };
      }
      return {};
    });
    const preview = computed14(() => {
      const { previewSrcList } = props;
      return Array.isArray(previewSrcList) && previewSrcList.length > 0;
    });
    const loadImage = () => {
      if (!isClient) return;
      isLoading.value = true;
      error.value = false;
      const img = new Image();
      img.src = props.src;
      if (props.crossorigin) img.crossOrigin = props.crossorigin;
      img.onload = (e) => {
        isLoading.value = false;
        emit("load", e);
      };
      img.onerror = (e) => {
        isLoading.value = false;
        error.value = true;
        emit("error", e);
      };
    };
    let observer = null;
    const handleLazyLoad = () => {
      if (!isClient) return;
      if (props.lazy) {
        if (isSupportNativeLazy && props.loading === "lazy") {
          loadImage();
        } else {
          isLazy.value = true;
          initLazyLoad();
        }
      } else {
        loadImage();
      }
    };
    const initLazyLoad = () => {
      if (!isClient || !container.value) return;
      if (!isLoading.value && !error.value) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage();
              stopLazyLoad();
            }
          });
        },
        {
          root: getRoot(),
          rootMargin: "200px"
          // 提前 200px 开始加载
        }
      );
      observer.observe(container.value);
    };
    const getRoot = () => {
      if (!isClient || !container.value) return null;
      if (typeof props.scrollContainer === "string") {
        return document.querySelector(props.scrollContainer);
      } else if (props.scrollContainer instanceof HTMLElement) {
        return props.scrollContainer;
      }
      const scrollContainer = getScrollContainer(container.value);
      return scrollContainer instanceof HTMLElement ? scrollContainer : null;
    };
    const stopLazyLoad = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
    const initViewerJS = () => {
      if (!isClient || !container.value) return;
      const imgElement = container.value.querySelector("img");
      if (!imgElement) return;
      if (props.previewSrcList && props.previewSrcList.length > 0) {
        const list = document.createElement("div");
        list.style.display = "none";
        props.previewSrcList.forEach((src) => {
          const img = document.createElement("img");
          img.src = src;
          list.appendChild(img);
        });
        document.body.appendChild(list);
        viewerList = list;
        const nextViewer = new stdin_default4(list, __spreadProps3(__spreadValues5({}, props.viewerOptions), {
          hidden: () => {
            if (viewerList) {
              document.body.removeChild(viewerList);
              viewerList = null;
            }
            viewer == null ? void 0 : viewer.destroy();
            viewer = null;
          }
        }));
        viewer = nextViewer;
        nextViewer.view(props.initialIndex);
      } else {
        const nextViewer = new stdin_default4(imgElement, props.viewerOptions);
        viewer = nextViewer;
        nextViewer.show();
      }
    };
    watch5(
      () => props.src,
      () => {
        if (isLazy.value) {
          stopLazyLoad();
          initLazyLoad();
        } else {
          loadImage();
        }
      }
    );
    onMounted4(() => {
      handleLazyLoad();
    });
    onUnmounted5(() => {
      stopLazyLoad();
      if (viewer) {
        viewer.destroy();
        viewer = null;
      }
      if (viewerList) {
        document.body.removeChild(viewerList);
        viewerList = null;
      }
    });
    const clickHandler = () => {
      if (!preview.value) return;
      if (props.viewerMode === "viewerjs") {
        initViewerJS();
      } else {
        showViewer.value = true;
      }
      emit("show");
    };
    const closeViewer = () => {
      showViewer.value = false;
      emit("close");
    };
    const handleSwitch = (index) => {
      emit("switch", index);
    };
    const __returned__ = { props, emit, ns, t, themeStyle, isLoading, error, showViewer, container, isLazy, get viewer() {
      return viewer;
    }, set viewer(v) {
      viewer = v;
    }, get viewerList() {
      return viewerList;
    }, set viewerList(v) {
      viewerList = v;
    }, isSupportNativeLazy, imageStyle, preview, loadImage, get observer() {
      return observer;
    }, set observer(v) {
      observer = v;
    }, handleLazyLoad, initLazyLoad, getRoot, stopLazyLoad, initViewerJS, clickHandler, closeViewer, handleSwitch, computed: computed14, ref: ref14, onMounted: onMounted4, onUnmounted: onUnmounted5, watch: watch5, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get isClient() {
      return isClient;
    }, get getScrollContainer() {
      return getScrollContainer;
    }, get imageProps() {
      return imageProps;
    }, YhImageViewer: stdin_default5, get Viewer() {
      return stdin_default4;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__4.render = render4;
var stdin_default6 = __sfc__4;

// public/codesandbox-runtime/components/image/index.js
var YhImage = withInstall(stdin_default6);
var YhImageViewer = withInstall(stdin_default5);

// public/codesandbox-runtime/components/ai-mention/src/ai-mention.js
import { createVNode as _createVNode2, normalizeClass as _normalizeClass5, createElementVNode as _createElementVNode5, toDisplayString as _toDisplayString3, openBlock as _openBlock6, createElementBlock as _createElementBlock6, createCommentVNode as _createCommentVNode6, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, renderSlot as _renderSlot5, mergeProps as _mergeProps2, withCtx as _withCtx3, renderList as _renderList2, createSlots as _createSlots, Fragment as _Fragment4, withModifiers as _withModifiers2, createBlock as _createBlock6, normalizeStyle as _normalizeStyle5, Transition as _Transition2, Teleport as _Teleport3 } from "vue";
import { computed as computed16, ref as ref16, useSlots as useSlots4 } from "vue";

// public/codesandbox-runtime/components/ai-mention/src/ai-mention-meta.js
var aiMentionProps = {
  /**
   * 绑定值
   */
  modelValue: {
    type: String,
    default: ""
  },
  /**
   * AI 提及类型，支持多种类型过滤
   */
  types: {
    type: Array,
    default: () => ["agent", "document", "table", "knowledge", "file"]
  },
  /**
   * 选项列表
   */
  options: {
    type: Array,
    default: () => []
  },
  /**
   * 触发字符
   */
  triggers: {
    type: Array,
    default: () => ["@"]
  },
  /**
   * 是否在输入框中
   */
  type: {
    type: String,
    default: "textarea"
  },
  /**
   * 占位符
   */
  placeholder: String,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 尺寸
   */
  size: String,
  /**
   * 最大长度
   */
  maxLength: Number,
  /**
   * 文本域行数
   */
  rows: {
    type: Number,
    default: 3
  },
  /**
   * 是否正在加载
   */
  loading: Boolean,
  /**
   * 主题覆盖
   */
  themeOverrides: {
    type: Object,
    default: () => ({})
  },
  /**
   * 选项过滤
   */
  filterOption: {
    type: [Function, Boolean],
    default: void 0
  },
  /**
   * 是否启用文件树选择器（@文档/@表格/@文件）
   */
  enableFileTree: {
    type: Boolean,
    default: true
  },
  /**
   * 文件树数据加载函数
   * 当用户触发 @文档/@表格/@文件 时调用
   */
  fileLoader: {
    type: [Function, Object],
    default: void 0
  },
  /**
   * 文件树根路径
   */
  fileRoot: {
    type: String,
    default: "/"
  },
  /**
   * 文件树展开层级
   */
  fileTreeExpandedLevel: {
    type: Number,
    default: 2
  },
  /**
   * 是否显示文件图标
   */
  showFileIcon: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示文件大小
   */
  showFileSize: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示最后修改时间
   */
  showModifiedTime: {
    type: Boolean,
    default: true
  },
  /**
   * 文件大小格式化函数
   */
  formatFileSize: {
    type: Function,
    default: (size) => {
      if (size < 1024) return size + " B";
      if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
      if (size < 1024 * 1024 * 1024) return (size / 1024 / 1024).toFixed(1) + " MB";
      return (size / 1024 / 1024 / 1024).toFixed(1) + " GB";
    }
  },
  /**
   * 搜索防抖延迟（毫秒）
   */
  searchDebounce: {
    type: Number,
    default: 300
  }
};
var aiMentionEmits = {
  "update:modelValue": (value) => typeof value === "string",
  input: (value) => typeof value === "string",
  change: (value) => typeof value === "string",
  select: (option, trigger) => !!option && !!trigger,
  search: (keyword, trigger) => typeof keyword === "string" && !!trigger,
  "file-load": (_type, _nodes) => true,
  "file-select": (node, option) => !!node && !!option,
  focus: (event) => event instanceof FocusEvent,
  blur: (event) => event instanceof FocusEvent,
  keydown: (event) => event instanceof KeyboardEvent
};

// public/codesandbox-runtime/components/mention/src/mention.js
import { createCommentVNode as _createCommentVNode5, renderSlot as _renderSlot4, resolveDynamicComponent as _resolveDynamicComponent3, normalizeClass as _normalizeClass4, openBlock as _openBlock5, createBlock as _createBlock5, toDisplayString as _toDisplayString2, createElementBlock as _createElementBlock5, createElementVNode as _createElementVNode4, withModifiers as _withModifiers, Fragment as _Fragment3, renderList as _renderList, vShow as _vShow, normalizeStyle as _normalizeStyle4, withDirectives as _withDirectives, Transition as _Transition, withCtx as _withCtx2, createVNode as _createVNode, Teleport as _Teleport2 } from "vue";
import { ref as ref15, computed as computed15, watch as watch6, nextTick, onMounted as onMounted5, onBeforeUnmount as onBeforeUnmount2, useSlots as useSlots3 } from "vue";
var __defProp6 = Object.defineProperty;
var __getOwnPropSymbols6 = Object.getOwnPropertySymbols;
var __hasOwnProp6 = Object.prototype.hasOwnProperty;
var __propIsEnum6 = Object.prototype.propertyIsEnumerable;
var __defNormalProp6 = (obj, key, value) => key in obj ? __defProp6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues6 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp6.call(b, prop))
      __defNormalProp6(a, prop, b[prop]);
  if (__getOwnPropSymbols6)
    for (var prop of __getOwnPropSymbols6(b)) {
      if (__propIsEnum6.call(b, prop))
        __defNormalProp6(a, prop, b[prop]);
    }
  return a;
};
var _hoisted_14 = ["id", "value", "placeholder", "disabled", "readonly", "maxlength", "rows", "autofocus", "aria-expanded", "aria-controls", "aria-activedescendant"];
var _hoisted_2 = ["id", "value", "placeholder", "disabled", "readonly", "maxlength", "autofocus", "aria-expanded", "aria-controls", "aria-activedescendant"];
var _hoisted_3 = ["id"];
var _hoisted_4 = ["id", "aria-selected", "aria-disabled", "onClick", "onMouseenter"];
var _hoisted_5 = ["src", "alt"];
function render5(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock5(), _createElementBlock5(
    "div",
    {
      ref: "wrapperRef",
      class: _normalizeClass4($setup.wrapperClasses),
      style: _normalizeStyle4($setup.themeStyle),
      onMouseenter: _cache[4] || (_cache[4] = ($event) => $setup.hovering = true),
      onMouseleave: _cache[5] || (_cache[5] = ($event) => $setup.hovering = false)
    },
    [
      _createCommentVNode5(" \u524D\u7F00 "),
      $setup.slots.prefix || $props.prefixIcon ? (_openBlock5(), _createElementBlock5(
        "span",
        {
          key: 0,
          class: _normalizeClass4($setup.ns.e("prefix"))
        },
        [
          _renderSlot4(_ctx.$slots, "prefix", {}, () => [
            $props.prefixIcon && typeof $props.prefixIcon !== "string" ? (_openBlock5(), _createBlock5(_resolveDynamicComponent3($props.prefixIcon), {
              key: 0,
              class: _normalizeClass4($setup.ns.e("icon"))
            }, null, 8, ["class"])) : $props.prefixIcon ? (_openBlock5(), _createElementBlock5(
              "span",
              {
                key: 1,
                class: _normalizeClass4($setup.ns.e("icon"))
              },
              _toDisplayString2($props.prefixIcon),
              3
              /* TEXT, CLASS */
            )) : _createCommentVNode5("v-if", true)
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode5("v-if", true),
      _createCommentVNode5(" \u8F93\u5165\u6846 "),
      $props.type === "textarea" ? (_openBlock5(), _createElementBlock5("textarea", {
        key: 1,
        id: $setup.inputId,
        ref: "inputRef",
        class: _normalizeClass4($setup.ns.e("inner")),
        value: $props.modelValue,
        placeholder: $props.placeholder || $setup.t("mention.placeholder"),
        disabled: $setup.mentionDisabled,
        readonly: $props.readonly,
        maxlength: $props.maxlength,
        rows: $props.rows,
        autofocus: $props.autofocus,
        role: "combobox",
        "aria-expanded": $setup.dropdownVisible,
        "aria-autocomplete": "list",
        "aria-controls": `${$setup.inputId}-listbox`,
        "aria-activedescendant": $setup.highlightedIndex >= 0 ? `${$setup.inputId}-option-${$setup.highlightedIndex}` : void 0,
        onInput: $setup.handleInput,
        onChange: $setup.handleChange,
        onFocus: $setup.handleFocus,
        onBlur: $setup.handleBlur,
        onKeydown: $setup.handleKeydown
      }, null, 42, _hoisted_14)) : (_openBlock5(), _createElementBlock5("input", {
        key: 2,
        id: $setup.inputId,
        ref: "inputRef",
        class: _normalizeClass4($setup.ns.e("inner")),
        type: "text",
        value: $props.modelValue,
        placeholder: $props.placeholder || $setup.t("mention.placeholder"),
        disabled: $setup.mentionDisabled,
        readonly: $props.readonly,
        maxlength: $props.maxlength,
        autofocus: $props.autofocus,
        role: "combobox",
        "aria-expanded": $setup.dropdownVisible,
        "aria-autocomplete": "list",
        "aria-controls": `${$setup.inputId}-listbox`,
        "aria-activedescendant": $setup.highlightedIndex >= 0 ? `${$setup.inputId}-option-${$setup.highlightedIndex}` : void 0,
        onInput: $setup.handleInput,
        onChange: $setup.handleChange,
        onFocus: $setup.handleFocus,
        onBlur: $setup.handleBlur,
        onKeydown: $setup.handleKeydown
      }, null, 42, _hoisted_2)),
      _createCommentVNode5(" \u540E\u7F00 / \u6E05\u7A7A "),
      $setup.slots.suffix || $props.suffixIcon || $setup.showClear || $props.showWordLimit ? (_openBlock5(), _createElementBlock5(
        "span",
        {
          key: 3,
          class: _normalizeClass4($setup.ns.e("suffix"))
        },
        [
          _createCommentVNode5(" \u6E05\u7A7A\u6309\u94AE "),
          $setup.showClear ? (_openBlock5(), _createElementBlock5(
            "span",
            {
              key: 0,
              class: _normalizeClass4([$setup.ns.e("icon"), $setup.ns.e("clear")]),
              onMousedown: _cache[0] || (_cache[0] = _withModifiers(() => {
              }, ["prevent"])),
              onClick: _withModifiers($setup.handleClear, ["stop"]),
              "aria-label": "Clear"
            },
            [..._cache[6] || (_cache[6] = [
              _createElementVNode4(
                "svg",
                {
                  viewBox: "0 0 1024 1024",
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "1em",
                  height: "1em"
                },
                [
                  _createElementVNode4("path", {
                    fill: "currentColor",
                    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
                  })
                ],
                -1
                /* CACHED */
              )
            ])],
            34
            /* CLASS, NEED_HYDRATION */
          )) : _createCommentVNode5("v-if", true),
          _createCommentVNode5(" \u5B57\u6570\u7EDF\u8BA1 "),
          $props.showWordLimit && $props.maxlength ? (_openBlock5(), _createElementBlock5(
            "span",
            {
              key: 1,
              class: _normalizeClass4($setup.ns.e("count"))
            },
            _toDisplayString2($setup.textLength) + " / " + _toDisplayString2($props.maxlength),
            3
            /* TEXT, CLASS */
          )) : _createCommentVNode5("v-if", true),
          _createCommentVNode5(" \u81EA\u5B9A\u4E49\u540E\u7F00 "),
          _renderSlot4(_ctx.$slots, "suffix", {}, () => [
            $props.suffixIcon && typeof $props.suffixIcon !== "string" ? (_openBlock5(), _createBlock5(_resolveDynamicComponent3($props.suffixIcon), {
              key: 0,
              class: _normalizeClass4($setup.ns.e("icon"))
            }, null, 8, ["class"])) : $props.suffixIcon ? (_openBlock5(), _createElementBlock5(
              "span",
              {
                key: 1,
                class: _normalizeClass4($setup.ns.e("icon"))
              },
              _toDisplayString2($props.suffixIcon),
              3
              /* TEXT, CLASS */
            )) : _createCommentVNode5("v-if", true)
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode5("v-if", true),
      _createCommentVNode5(" \u4E0B\u62C9\u9762\u677F "),
      (_openBlock5(), _createBlock5(_Teleport2, {
        to: "body",
        disabled: !$props.teleported
      }, [
        _createVNode(_Transition, {
          name: $setup.ns.b("dropdown"),
          persisted: ""
        }, {
          default: _withCtx2(() => [
            _withDirectives(_createElementVNode4("div", {
              ref: "dropdownRef",
              id: `${$setup.inputId}-listbox`,
              class: _normalizeClass4([$setup.ns.e("dropdown"), $props.popperClass]),
              style: _normalizeStyle4($props.teleported ? __spreadValues6(__spreadValues6({}, $setup.themeStyle), $setup.dropdownStyle) : $setup.themeStyle),
              role: "listbox",
              onMousedown: _cache[2] || (_cache[2] = ($event) => $setup.isClickingDropdown = true),
              onMouseup: _cache[3] || (_cache[3] = ($event) => $setup.isClickingDropdown = false)
            }, [
              _createCommentVNode5(" \u52A0\u8F7D\u4E2D "),
              $props.loading ? (_openBlock5(), _createElementBlock5(
                "div",
                {
                  key: 0,
                  class: _normalizeClass4($setup.ns.e("loading"))
                },
                [
                  _renderSlot4(_ctx.$slots, "loading", {}, () => [
                    (_openBlock5(), _createElementBlock5(
                      "svg",
                      {
                        class: _normalizeClass4($setup.ns.e("loading-icon")),
                        viewBox: "0 0 1024 1024",
                        xmlns: "http://www.w3.org/2000/svg"
                      },
                      [..._cache[7] || (_cache[7] = [
                        _createElementVNode4(
                          "path",
                          {
                            fill: "currentColor",
                            d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32z"
                          },
                          null,
                          -1
                          /* CACHED */
                        )
                      ])],
                      2
                      /* CLASS */
                    )),
                    _createElementVNode4(
                      "span",
                      null,
                      _toDisplayString2($props.loadingText || $setup.t("mention.loading")),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : !$props.loading && $setup.filteredOptions.length === 0 ? (_openBlock5(), _createElementBlock5(
                _Fragment3,
                { key: 1 },
                [
                  _createCommentVNode5(" \u65E0\u6570\u636E "),
                  _createElementVNode4(
                    "div",
                    {
                      class: _normalizeClass4($setup.ns.e("empty"))
                    },
                    [
                      _renderSlot4(_ctx.$slots, "empty", {}, () => [
                        _createElementVNode4(
                          "span",
                          null,
                          _toDisplayString2($props.noDataText || $setup.t("mention.noData")),
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
              )) : (_openBlock5(), _createElementBlock5(
                _Fragment3,
                { key: 2 },
                [
                  _createCommentVNode5(" \u9009\u9879\u5217\u8868\uFF08\u5206\u7EC4\u652F\u6301\uFF09 "),
                  (_openBlock5(true), _createElementBlock5(
                    _Fragment3,
                    null,
                    _renderList($setup.groupedOptions, ([group, groupOpts]) => {
                      return _openBlock5(), _createElementBlock5(
                        _Fragment3,
                        { key: group },
                        [
                          _createCommentVNode5(" \u5206\u7EC4\u6807\u9898 "),
                          group ? (_openBlock5(), _createElementBlock5(
                            "div",
                            {
                              key: 0,
                              class: _normalizeClass4($setup.ns.e("group-label"))
                            },
                            _toDisplayString2(group),
                            3
                            /* TEXT, CLASS */
                          )) : _createCommentVNode5("v-if", true),
                          _createCommentVNode5(" \u9009\u9879\u6761\u76EE "),
                          (_openBlock5(true), _createElementBlock5(
                            _Fragment3,
                            null,
                            _renderList(groupOpts, (option) => {
                              var _a3, _b;
                              return _openBlock5(), _createElementBlock5("div", {
                                key: option.value,
                                id: `${$setup.inputId}-option-${$setup.filteredOptions.indexOf(option)}`,
                                class: _normalizeClass4([$setup.ns.e("option"), $setup.ns.is("highlighted", $setup.filteredOptions.indexOf(option) === $setup.highlightedIndex), $setup.ns.is("disabled", !!option.disabled)]),
                                role: "option",
                                "aria-selected": $setup.filteredOptions.indexOf(option) === $setup.highlightedIndex,
                                "aria-disabled": option.disabled,
                                onMousedown: _cache[1] || (_cache[1] = _withModifiers(() => {
                                }, ["prevent"])),
                                onClick: ($event) => $setup.selectOption(option),
                                onMouseenter: ($event) => $setup.highlightedIndex = $setup.filteredOptions.indexOf(option)
                              }, [
                                _renderSlot4(_ctx.$slots, "option", {
                                  option,
                                  keyword: (_b = (_a3 = $setup.triggerPos) == null ? void 0 : _a3.keyword) != null ? _b : ""
                                }, () => {
                                  var _a22, _b2;
                                  return [
                                    _createCommentVNode5(" \u5934\u50CF "),
                                    option.avatar ? (_openBlock5(), _createElementBlock5("img", {
                                      key: 0,
                                      src: option.avatar,
                                      class: _normalizeClass4($setup.ns.e("option-avatar")),
                                      alt: (_a22 = option.label) != null ? _a22 : option.value
                                    }, null, 10, _hoisted_5)) : _createCommentVNode5("v-if", true),
                                    _createElementVNode4(
                                      "div",
                                      {
                                        class: _normalizeClass4($setup.ns.e("option-content"))
                                      },
                                      [
                                        _createElementVNode4(
                                          "span",
                                          {
                                            class: _normalizeClass4($setup.ns.e("option-label"))
                                          },
                                          _toDisplayString2((_b2 = option.label) != null ? _b2 : option.value),
                                          3
                                          /* TEXT, CLASS */
                                        ),
                                        option.description ? (_openBlock5(), _createElementBlock5(
                                          "span",
                                          {
                                            key: 0,
                                            class: _normalizeClass4($setup.ns.e("option-desc"))
                                          },
                                          _toDisplayString2(option.description),
                                          3
                                          /* TEXT, CLASS */
                                        )) : _createCommentVNode5("v-if", true)
                                      ],
                                      2
                                      /* CLASS */
                                    )
                                  ];
                                })
                              ], 42, _hoisted_4);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                64
                /* STABLE_FRAGMENT */
              ))
            ], 46, _hoisted_3), [
              [_vShow, $setup.dropdownVisible]
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
var __sfc__5 = /* @__PURE__ */ Object.assign({ name: "YhMention" }, {
  __name: "mention",
  props: {
    modelValue: { type: String, required: false, default: "" },
    options: { type: Array, required: false, default: () => [] },
    triggers: { type: Array, required: false, default: () => ["@"] },
    type: { type: String, required: false, default: "input" },
    placement: { type: null, required: false, default: "bottom" },
    placeholder: { type: String, required: false },
    disabled: { type: Boolean, required: false, default: false },
    readonly: { type: Boolean, required: false, default: false },
    size: { type: null, required: false, default: void 0 },
    maxlength: { type: Number, required: false },
    clearable: { type: Boolean, required: false, default: false },
    showWordLimit: { type: Boolean, required: false, default: false },
    prefixIcon: { type: null, required: false },
    suffixIcon: { type: null, required: false },
    maxCount: { type: Number, required: false, default: 8 },
    filterOption: { type: [Function, Boolean], required: false, default: void 0 },
    loading: { type: Boolean, required: false, default: false },
    loadingText: { type: String, required: false, default: void 0 },
    noDataText: { type: String, required: false, default: void 0 },
    teleported: { type: Boolean, required: false, default: true },
    popperClass: { type: String, required: false, default: "" },
    split: { type: String, required: false, default: " " },
    wholeWord: { type: Boolean, required: false, default: false },
    autofocus: { type: Boolean, required: false, default: false },
    rows: { type: Number, required: false, default: 3 },
    autosize: { type: [Boolean, Object], required: false },
    debounce: { type: Number, required: false, default: 100 },
    validateEvent: { type: Boolean, required: false, default: true },
    themeOverrides: { type: null, required: false }
  },
  emits: ["update:modelValue", "input", "change", "focus", "blur", "clear", "search", "select", "open", "close", "keydown"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots3();
    const ns = useNamespace("mention");
    const inputId = useId();
    const { t } = useLocale();
    const { nextZIndex } = useZIndex();
    const { themeStyle } = useComponentTheme(
      "mention",
      computed15(() => props.themeOverrides)
    );
    const { form, formItem, validate: triggerValidate } = useFormItem();
    const { globalSize } = useConfig();
    const mentionSize = computed15(
      () => props.size || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalSize.value || "default"
    );
    const mentionDisabled = computed15(() => props.disabled || (form == null ? void 0 : form.disabled) || false);
    const inputRef = ref15();
    const wrapperRef = ref15();
    const dropdownRef = ref15();
    const focused = ref15(false);
    const hovering = ref15(false);
    const dropdownVisible = ref15(false);
    const isClickingDropdown = ref15(false);
    const highlightedIndex = ref15(-1);
    const dropdownZIndex = ref15(nextZIndex());
    const triggerPos = ref15(null);
    const filteredOptions = computed15(() => {
      var _a3, _b;
      const keyword = (_b = (_a3 = triggerPos.value) == null ? void 0 : _a3.keyword) != null ? _b : "";
      return props.options.filter((opt) => {
        var _a22;
        if (props.filterOption === false) return true;
        if (typeof props.filterOption === "function") {
          return props.filterOption(keyword, opt);
        }
        const text = ((_a22 = opt.label) != null ? _a22 : opt.value).toLowerCase();
        return text.includes(keyword.toLowerCase());
      });
    });
    const groupedOptions = computed15(() => {
      var _a3;
      const map = /* @__PURE__ */ new Map();
      for (const opt of filteredOptions.value) {
        const g = (_a3 = opt.group) != null ? _a3 : "";
        if (!map.has(g)) map.set(g, []);
        map.get(g).push(opt);
      }
      return map;
    });
    const wrapperClasses = computed15(() => [
      ns.b(),
      ns.m(mentionSize.value),
      ns.is("disabled", mentionDisabled.value),
      ns.is("focused", focused.value),
      ns.is("textarea", props.type === "textarea"),
      !!slots.prefix || !!props.prefixIcon ? ns.is("prefix", true) : "",
      !!slots.suffix || !!props.suffixIcon || props.clearable ? ns.is("suffix", true) : ""
    ]);
    const dropdownStyle = ref15({});
    const updateDropdownPosition = () => {
      if (!wrapperRef.value || !props.teleported) return;
      const rect = wrapperRef.value.getBoundingClientRect();
      const style = {
        position: "fixed",
        zIndex: String(dropdownZIndex.value),
        minWidth: `${rect.width}px`
      };
      if (props.placement === "top") {
        style.bottom = `${window.innerHeight - rect.top + 4}px`;
        style.left = `${rect.left}px`;
      } else {
        style.top = `${rect.bottom + 4}px`;
        style.left = `${rect.left}px`;
      }
      dropdownStyle.value = style;
    };
    watch6(dropdownVisible, (val) => {
      if (val) {
        dropdownZIndex.value = nextZIndex();
        nextTick(updateDropdownPosition);
        emit("open");
      } else {
        emit("close");
      }
    });
    const parseTrigger = (value, cursorIndex) => {
      for (const trigger of props.triggers) {
        const segment = value.substring(0, cursorIndex);
        const lastIdx = segment.lastIndexOf(trigger);
        if (lastIdx === -1) continue;
        const after = segment.substring(lastIdx + trigger.length);
        if (/\s/.test(after)) continue;
        const before = segment[lastIdx - 1];
        if (before !== void 0 && !/[\s\n]/.test(before)) continue;
        return {
          index: lastIdx,
          trigger,
          keyword: after
        };
      }
      return null;
    };
    let debounceTimer = null;
    const debouncedSearch = (keyword, trigger) => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        emit("search", keyword, trigger);
      }, props.debounce);
    };
    const handleInput = (event) => {
      const target = event.target;
      const value = target.value;
      const rawCursor = target.selectionStart;
      const cursor = rawCursor === null || rawCursor === 0 && value.length > 0 ? value.length : rawCursor;
      emit("update:modelValue", value);
      emit("input", value);
      const hit = parseTrigger(value, cursor);
      if (hit) {
        triggerPos.value = hit;
        dropdownVisible.value = true;
        highlightedIndex.value = 0;
        debouncedSearch(hit.keyword, hit.trigger);
      } else {
        dropdownVisible.value = false;
        triggerPos.value = null;
      }
    };
    const handleChange = (event) => {
      const target = event.target;
      emit("change", target.value);
      if (props.validateEvent) triggerValidate("change");
    };
    const handleFocus = (event) => {
      focused.value = true;
      emit("focus", event);
    };
    const handleBlur = (event) => {
      setTimeout(() => {
        if (!isClickingDropdown.value) {
          focused.value = false;
          dropdownVisible.value = false;
          triggerPos.value = null;
          emit("blur", event);
          if (props.validateEvent) triggerValidate("blur");
        }
      }, 150);
    };
    const handleKeydown = (event) => {
      emit("keydown", event);
      if (!dropdownVisible.value) return;
      const total = filteredOptions.value.length;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          highlightedIndex.value = (highlightedIndex.value + 1) % total;
          break;
        case "ArrowUp":
          event.preventDefault();
          highlightedIndex.value = (highlightedIndex.value - 1 + total) % total;
          break;
        case "Enter":
          event.preventDefault();
          if (highlightedIndex.value >= 0 && filteredOptions.value[highlightedIndex.value]) {
            selectOption(filteredOptions.value[highlightedIndex.value]);
          }
          break;
        case "Escape":
          event.preventDefault();
          dropdownVisible.value = false;
          triggerPos.value = null;
          break;
        case "Tab":
          if (highlightedIndex.value >= 0 && filteredOptions.value[highlightedIndex.value]) {
            event.preventDefault();
            selectOption(filteredOptions.value[highlightedIndex.value]);
          } else {
            dropdownVisible.value = false;
          }
          break;
      }
    };
    const selectOption = (option) => {
      var _a3, _b;
      if (option.disabled || !triggerPos.value) return;
      const { index, trigger } = triggerPos.value;
      const before = ((_a3 = props.modelValue) != null ? _a3 : "").substring(0, index);
      const after = (() => {
        var _a22, _b2, _c, _d;
        const cursor = (_c = (_a22 = inputRef.value) == null ? void 0 : _a22.selectionStart) != null ? _c : ((_b2 = props.modelValue) != null ? _b2 : "").length;
        return ((_d = props.modelValue) != null ? _d : "").substring(cursor);
      })();
      const label = (_b = option.label) != null ? _b : option.value;
      const insertText = props.wholeWord ? `${trigger}${label}${props.split}` : `${trigger}${label}${props.split}`;
      const newValue = before + insertText + after;
      emit("update:modelValue", newValue);
      emit("select", option, trigger);
      dropdownVisible.value = false;
      triggerPos.value = null;
      nextTick(() => {
        const el = inputRef.value;
        if (!el) return;
        const pos = before.length + insertText.length;
        el.setSelectionRange(pos, pos);
        el.focus();
      });
      if (props.validateEvent) triggerValidate("change");
    };
    const showClear = computed15(
      () => props.clearable && !mentionDisabled.value && !props.readonly && !!props.modelValue && (focused.value || hovering.value)
    );
    const handleClear = () => {
      emit("update:modelValue", "");
      emit("change", "");
      emit("clear");
      dropdownVisible.value = false;
      triggerPos.value = null;
      nextTick(() => focus());
    };
    const handleOutsideClick = (e) => {
      var _a3, _b;
      const target = e.target;
      if (((_a3 = wrapperRef.value) == null ? void 0 : _a3.contains(target)) || ((_b = dropdownRef.value) == null ? void 0 : _b.contains(target))) return;
      dropdownVisible.value = false;
      triggerPos.value = null;
    };
    const handleResize = () => {
      if (dropdownVisible.value) updateDropdownPosition();
    };
    onMounted5(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("click", handleOutsideClick);
        window.addEventListener("resize", handleResize);
        if (props.teleported) {
          window.addEventListener("scroll", handleResize, true);
        }
      }
    });
    onBeforeUnmount2(() => {
      if (typeof window !== "undefined") {
        window.removeEventListener("click", handleOutsideClick);
        window.removeEventListener("resize", handleResize);
        if (props.teleported) {
          window.removeEventListener("scroll", handleResize, true);
        }
      }
      if (debounceTimer) clearTimeout(debounceTimer);
    });
    const insertMention = (option, trigger) => {
      var _a3, _b, _c, _d, _e;
      const t2 = (_a3 = trigger != null ? trigger : props.triggers[0]) != null ? _a3 : "@";
      const label = (_b = option.label) != null ? _b : option.value;
      const insertText = `${t2}${label}${props.split}`;
      const current = (_c = props.modelValue) != null ? _c : "";
      const cursor = (_e = (_d = inputRef.value) == null ? void 0 : _d.selectionStart) != null ? _e : current.length;
      const newValue = current.substring(0, cursor) + insertText + current.substring(cursor);
      emit("update:modelValue", newValue);
    };
    const focus = () => {
      var _a3;
      return (_a3 = inputRef.value) == null ? void 0 : _a3.focus();
    };
    const blur = () => {
      var _a3;
      return (_a3 = inputRef.value) == null ? void 0 : _a3.blur();
    };
    const clear = () => handleClear();
    __expose({
      get ref() {
        return inputRef.value;
      },
      get wrapperRef() {
        return wrapperRef.value;
      },
      focus,
      blur,
      clear,
      insertMention
    });
    const textLength = computed15(() => {
      var _a3;
      return ((_a3 = props.modelValue) != null ? _a3 : "").length;
    });
    const __returned__ = { props, emit, slots, ns, inputId, t, nextZIndex, themeStyle, form, formItem, triggerValidate, globalSize, mentionSize, mentionDisabled, inputRef, wrapperRef, dropdownRef, focused, hovering, dropdownVisible, isClickingDropdown, highlightedIndex, dropdownZIndex, triggerPos, filteredOptions, groupedOptions, wrapperClasses, dropdownStyle, updateDropdownPosition, parseTrigger, get debounceTimer() {
      return debounceTimer;
    }, set debounceTimer(v) {
      debounceTimer = v;
    }, debouncedSearch, handleInput, handleChange, handleFocus, handleBlur, handleKeydown, selectOption, showClear, handleClear, handleOutsideClick, handleResize, insertMention, focus, blur, clear, textLength, ref: ref15, computed: computed15, watch: watch6, nextTick, onMounted: onMounted5, onBeforeUnmount: onBeforeUnmount2, useSlots: useSlots3, get useNamespace() {
      return useNamespace;
    }, get useFormItem() {
      return useFormItem;
    }, get useId() {
      return useId;
    }, get useZIndex() {
      return useZIndex;
    }, get useLocale() {
      return useLocale;
    }, get useConfig() {
      return useConfig;
    }, get useComponentTheme() {
      return useComponentTheme;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__5.render = render5;
var stdin_default7 = __sfc__5;

// public/codesandbox-runtime/components/mention/index.js
var YhMention = withInstall(stdin_default7);

// public/codesandbox-runtime/components/ai-mention/src/ai-mention.js
var __defProp7 = Object.defineProperty;
var __defProps4 = Object.defineProperties;
var __getOwnPropDescs4 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols7 = Object.getOwnPropertySymbols;
var __hasOwnProp7 = Object.prototype.hasOwnProperty;
var __propIsEnum7 = Object.prototype.propertyIsEnumerable;
var __defNormalProp7 = (obj, key, value) => key in obj ? __defProp7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues7 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp7.call(b, prop))
      __defNormalProp7(a, prop, b[prop]);
  if (__getOwnPropSymbols7)
    for (var prop of __getOwnPropSymbols7(b)) {
      if (__propIsEnum7.call(b, prop))
        __defNormalProp7(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps4 = (a, b) => __defProps4(a, __getOwnPropDescs4(b));
var _hoisted_15 = ["onClick"];
var _hoisted_22 = ["onClick"];
var _hoisted_32 = ["onClick"];
function render6(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock6(), _createElementBlock6(
    "div",
    {
      class: _normalizeClass5($setup.ns.b()),
      style: _normalizeStyle5($setup.themeStyle)
    },
    [
      _createVNode2($setup["YhMention"], _mergeProps2({ ref: "mentionRef" }, _ctx.$attrs, {
        "model-value": _ctx.modelValue,
        options: $setup.filteredOptions,
        triggers: _ctx.triggers,
        type: _ctx.type,
        placeholder: _ctx.placeholder || $setup.t("ai.mention.placeholder"),
        disabled: _ctx.disabled,
        size: _ctx.size,
        loading: _ctx.loading || $setup.fileTreeLoading,
        "filter-option": _ctx.filterOption,
        maxlength: _ctx.maxLength,
        rows: _ctx.rows,
        "onUpdate:modelValue": $setup.handleUpdateValue,
        onSelect: $setup.handleSelect,
        onSearch: $setup.handleSearch,
        onFocus: _cache[0] || (_cache[0] = ($event) => $setup.emit("focus", $event)),
        onBlur: _cache[1] || (_cache[1] = ($event) => $setup.emit("blur", $event)),
        onInput: _cache[2] || (_cache[2] = ($event) => $setup.emit("input", $event)),
        onKeydown: _cache[3] || (_cache[3] = ($event) => $setup.emit("keydown", $event))
      }), _createSlots({
        option: _withCtx3(({ option }) => [
          _createElementVNode5(
            "div",
            {
              class: _normalizeClass5($setup.ns.e("option-item"))
            },
            [
              _createElementVNode5(
                "div",
                {
                  class: _normalizeClass5([$setup.ns.e("option-icon"), $setup.asAiMentionOption(option).type ? $setup.ns.em("option-icon", $setup.asAiMentionOption(option).type) : ""])
                },
                [
                  _createVNode2($setup["YhIcon"], {
                    name: $setup.asAiMentionOption(option).icon || $setup.getOptionIcon($setup.asAiMentionOption(option).type)
                  }, null, 8, ["name"])
                ],
                2
                /* CLASS */
              ),
              _createElementVNode5(
                "div",
                {
                  class: _normalizeClass5($setup.ns.e("option-info"))
                },
                [
                  _createElementVNode5(
                    "div",
                    {
                      class: _normalizeClass5($setup.ns.e("option-label"))
                    },
                    _toDisplayString3($setup.asAiMentionOption(option).label || $setup.asAiMentionOption(option).value),
                    3
                    /* TEXT, CLASS */
                  ),
                  $setup.asAiMentionOption(option).description ? (_openBlock6(), _createElementBlock6(
                    "div",
                    {
                      key: 0,
                      class: _normalizeClass5($setup.ns.e("option-desc"))
                    },
                    _toDisplayString3($setup.asAiMentionOption(option).description),
                    3
                    /* TEXT, CLASS */
                  )) : _createCommentVNode6("v-if", true)
                ],
                2
                /* CLASS */
              ),
              $setup.asAiMentionOption(option).type ? (_openBlock6(), _createElementBlock6(
                "div",
                {
                  key: 0,
                  class: _normalizeClass5([$setup.ns.e("option-tag"), $setup.ns.em("option-tag", $setup.asAiMentionOption(option).type)])
                },
                _toDisplayString3($setup.t(`ai.mention.${$setup.asAiMentionOption(option).type}`) || $setup.asAiMentionOption(option).type),
                3
                /* TEXT, CLASS */
              )) : _createCommentVNode6("v-if", true)
            ],
            2
            /* CLASS */
          )
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        _renderList2($setup.forwardedSlotNames, (name) => {
          return {
            name,
            fn: _withCtx3((slotProps) => [
              _renderSlot5(_ctx.$slots, name, _normalizeProps(_guardReactiveProps(slotProps)))
            ])
          };
        })
      ]), 1040, ["model-value", "options", "triggers", "type", "placeholder", "disabled", "size", "loading", "filter-option", "maxlength", "rows"]),
      _createCommentVNode6(" \u6587\u4EF6\u6811\u9762\u677F "),
      (_openBlock6(), _createBlock6(_Teleport3, { to: "body" }, [
        _createVNode2(_Transition2, { name: "yh-fade-in-scale-up" }, {
          default: _withCtx3(() => [
            $setup.showFileTree ? (_openBlock6(), _createElementBlock6(
              "div",
              {
                key: 0,
                class: _normalizeClass5($setup.ns.e("file-tree-panel")),
                style: _normalizeStyle5($setup.fileTreePanelStyle)
              },
              [
                _createElementVNode5(
                  "div",
                  {
                    class: _normalizeClass5($setup.ns.e("file-tree-header"))
                  },
                  [
                    _createVNode2($setup["YhIcon"], {
                      name: $setup.getTypeIcon($setup.currentFileType)
                    }, null, 8, ["name"]),
                    _createElementVNode5(
                      "span",
                      null,
                      _toDisplayString3($setup.getTypeLabel($setup.currentFileType)),
                      1
                      /* TEXT */
                    ),
                    _createElementVNode5(
                      "span",
                      {
                        class: _normalizeClass5($setup.ns.e("file-tree-count"))
                      },
                      _toDisplayString3($setup.fileTreeData.length),
                      3
                      /* TEXT, CLASS */
                    )
                  ],
                  2
                  /* CLASS */
                ),
                _createElementVNode5(
                  "div",
                  {
                    class: _normalizeClass5($setup.ns.e("file-tree-content"))
                  },
                  [
                    _createElementVNode5(
                      "div",
                      {
                        class: _normalizeClass5($setup.ns.e("file-tree-list"))
                      },
                      [
                        (_openBlock6(true), _createElementBlock6(
                          _Fragment4,
                          null,
                          _renderList2($setup.fileTreeData, (node) => {
                            return _openBlock6(), _createElementBlock6(
                              _Fragment4,
                              {
                                key: node.key
                              },
                              [
                                _createElementVNode5("div", {
                                  class: _normalizeClass5([$setup.ns.e("file-tree-node"), $setup.ns.is("folder", node.isFolder), $setup.ns.is("expanded", $setup.isFolderExpanded(node.key))]),
                                  onClick: ($event) => $setup.handleFileSelect(node)
                                }, [
                                  node.isFolder ? (_openBlock6(), _createElementBlock6("span", {
                                    key: 0,
                                    class: _normalizeClass5($setup.ns.e("folder-toggle")),
                                    onClick: _withModifiers2(($event) => $setup.toggleFolder(node.key), ["stop"])
                                  }, [
                                    _createVNode2($setup["YhIcon"], {
                                      name: $setup.isFolderExpanded(node.key) ? "chevron-down" : "chevron-right"
                                    }, null, 8, ["name"])
                                  ], 10, _hoisted_22)) : (_openBlock6(), _createElementBlock6(
                                    "span",
                                    {
                                      key: 1,
                                      class: _normalizeClass5($setup.ns.e("file-tree-indent"))
                                    },
                                    null,
                                    2
                                    /* CLASS */
                                  )),
                                  _ctx.showFileIcon ? (_openBlock6(), _createBlock6($setup["YhIcon"], {
                                    key: 2,
                                    name: $setup.getFileIcon(node),
                                    class: _normalizeClass5($setup.ns.e("file-tree-icon"))
                                  }, null, 8, ["name", "class"])) : _createCommentVNode6("v-if", true),
                                  _createElementVNode5(
                                    "span",
                                    {
                                      class: _normalizeClass5($setup.ns.e("file-tree-label"))
                                    },
                                    _toDisplayString3(node.label),
                                    3
                                    /* TEXT, CLASS */
                                  ),
                                  _ctx.showFileSize && !node.isFolder ? (_openBlock6(), _createElementBlock6(
                                    "span",
                                    {
                                      key: 3,
                                      class: _normalizeClass5($setup.ns.e("file-tree-size"))
                                    },
                                    _toDisplayString3($setup.formatFileSizeFn(node.size)),
                                    3
                                    /* TEXT, CLASS */
                                  )) : _createCommentVNode6("v-if", true),
                                  _ctx.showModifiedTime && !node.isFolder ? (_openBlock6(), _createElementBlock6(
                                    "span",
                                    {
                                      key: 4,
                                      class: _normalizeClass5($setup.ns.e("file-tree-time"))
                                    },
                                    _toDisplayString3($setup.formatTimeFn(node.modifiedAt)),
                                    3
                                    /* TEXT, CLASS */
                                  )) : _createCommentVNode6("v-if", true)
                                ], 10, _hoisted_15),
                                node.isFolder && node.children && $setup.isFolderExpanded(node.key) ? (_openBlock6(true), _createElementBlock6(
                                  _Fragment4,
                                  { key: 0 },
                                  _renderList2(node.children, (child) => {
                                    return _openBlock6(), _createElementBlock6("div", {
                                      key: child.key,
                                      class: _normalizeClass5([$setup.ns.e("file-tree-node"), $setup.ns.e("file-tree-child"), $setup.ns.is("folder", child.isFolder)]),
                                      onClick: ($event) => $setup.handleFileSelect(child)
                                    }, [
                                      _createElementVNode5(
                                        "span",
                                        {
                                          class: _normalizeClass5($setup.ns.e("file-tree-indent"))
                                        },
                                        null,
                                        2
                                        /* CLASS */
                                      ),
                                      _createElementVNode5(
                                        "span",
                                        {
                                          class: _normalizeClass5($setup.ns.e("file-tree-indent"))
                                        },
                                        null,
                                        2
                                        /* CLASS */
                                      ),
                                      _ctx.showFileIcon ? (_openBlock6(), _createBlock6($setup["YhIcon"], {
                                        key: 0,
                                        name: $setup.getFileIcon(child),
                                        class: _normalizeClass5($setup.ns.e("file-tree-icon"))
                                      }, null, 8, ["name", "class"])) : _createCommentVNode6("v-if", true),
                                      _createElementVNode5(
                                        "span",
                                        {
                                          class: _normalizeClass5($setup.ns.e("file-tree-label"))
                                        },
                                        _toDisplayString3(child.label),
                                        3
                                        /* TEXT, CLASS */
                                      ),
                                      _ctx.showFileSize && !child.isFolder ? (_openBlock6(), _createElementBlock6(
                                        "span",
                                        {
                                          key: 1,
                                          class: _normalizeClass5($setup.ns.e("file-tree-size"))
                                        },
                                        _toDisplayString3($setup.formatFileSizeFn(child.size)),
                                        3
                                        /* TEXT, CLASS */
                                      )) : _createCommentVNode6("v-if", true),
                                      _ctx.showModifiedTime && !child.isFolder ? (_openBlock6(), _createElementBlock6(
                                        "span",
                                        {
                                          key: 2,
                                          class: _normalizeClass5($setup.ns.e("file-tree-time"))
                                        },
                                        _toDisplayString3($setup.formatTimeFn(child.modifiedAt)),
                                        3
                                        /* TEXT, CLASS */
                                      )) : _createCommentVNode6("v-if", true)
                                    ], 10, _hoisted_32);
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                )) : _createCommentVNode6("v-if", true)
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        )),
                        $setup.fileTreeData.length === 0 && !$setup.fileTreeLoading ? (_openBlock6(), _createElementBlock6(
                          "div",
                          {
                            key: 0,
                            class: _normalizeClass5($setup.ns.e("file-tree-empty"))
                          },
                          [
                            _createVNode2($setup["YhIcon"], { name: "folder-opened" }),
                            _createElementVNode5(
                              "span",
                              null,
                              _toDisplayString3($setup.t("ai.mention.noFiles")),
                              1
                              /* TEXT */
                            )
                          ],
                          2
                          /* CLASS */
                        )) : _createCommentVNode6("v-if", true)
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
            )) : _createCommentVNode6("v-if", true)
          ]),
          _: 1
          /* STABLE */
        })
      ]))
    ],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__6 = /* @__PURE__ */ Object.assign({
  name: "YhAiMention"
}, {
  __name: "ai-mention",
  props: aiMentionProps,
  emits: aiMentionEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots4();
    const forwardedSlotNames = computed16(() => Object.keys(slots));
    const ns = useNamespace("ai-mention");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme("ai-mention", props.themeOverrides);
    const mentionRef = ref16(null);
    const fileTreeData = ref16([]);
    const fileTreeLoading = ref16(false);
    const expandedFolders = ref16(/* @__PURE__ */ new Set());
    const currentFileType = ref16(null);
    let searchDebounceTimer = null;
    const filteredOptions = computed16(() => {
      if (!props.types || props.types.length === 0) return props.options;
      return props.options.filter((option) => !option.type || props.types.includes(option.type));
    });
    const handleUpdateValue = (val) => {
      emit("update:modelValue", val);
    };
    const handleSelect = (option, trigger) => {
      emit("select", option, trigger);
    };
    const getTypeIcon = (type) => {
      const iconMap = {
        document: "document",
        table: "grid",
        file: "folder",
        knowledge: "book"
      };
      return iconMap[type] || "document";
    };
    const getTypeLabel = (type) => {
      const labelMap = {
        document: "\u6587\u6863",
        table: "\u8868\u683C",
        file: "\u6587\u4EF6",
        knowledge: "\u77E5\u8BC6\u5E93"
      };
      return labelMap[type] || type;
    };
    const getOptionIcon = (type) => {
      switch (type) {
        case "agent":
          return "robot";
        case "document":
          return "document";
        case "table":
          return "table";
        case "knowledge":
          return "book";
        case "file":
          return "folder";
        default:
          return "sparkles";
      }
    };
    const asAiMentionOption = (option) => option;
    const fileTreePanelStyle = computed16(() => ({
      position: "fixed",
      top: "200px",
      left: "100px",
      width: "320px",
      maxHeight: "400px",
      zIndex: 9999
    }));
    const loadFileTree = async (type, keyword = "") => {
      if (!props.enableFileTree) return;
      fileTreeLoading.value = true;
      currentFileType.value = type;
      try {
        let nodes = [];
        if (props.fileLoader) {
          nodes = await props.fileLoader(keyword, type);
        } else {
          nodes = generateMockFileTree(type, keyword);
        }
        fileTreeData.value = nodes;
        emit("file-load", type, nodes);
        if (props.fileTreeExpandedLevel > 0) {
          nodes.forEach((node) => {
            var _a3;
            if (node.isFolder && ((_a3 = node.children) == null ? void 0 : _a3.length)) {
              expandedFolders.value.add(node.key);
            }
          });
        }
      } catch (error) {
        console.error("Failed to load file tree:", error);
        fileTreeData.value = [];
      } finally {
        fileTreeLoading.value = false;
      }
    };
    const generateMockFileTree = (type, keyword) => {
      const mockData = {
        document: [
          {
            key: "docs",
            label: "\u6587\u6863",
            isFolder: true,
            path: "/docs",
            children: [
              {
                key: "docs/readme",
                label: "README.md",
                isFolder: false,
                path: "/docs/README.md",
                size: 2048,
                modifiedAt: Date.now() - 864e5
              },
              {
                key: "docs/guide",
                label: "\u4F7F\u7528\u6307\u5357.md",
                isFolder: false,
                path: "/docs/guide.md",
                size: 5120,
                modifiedAt: Date.now() - 1728e5
              },
              {
                key: "docs/api",
                label: "API \u6587\u6863.md",
                isFolder: false,
                path: "/docs/api.md",
                size: 10240,
                modifiedAt: Date.now() - 2592e5
              }
            ]
          },
          {
            key: "contracts",
            label: "\u5408\u540C",
            isFolder: true,
            path: "/contracts",
            children: [
              {
                key: "contracts/2024",
                label: "2024\u5408\u540C",
                isFolder: true,
                path: "/contracts/2024",
                children: [
                  {
                    key: "contracts/2024/a",
                    label: "\u5408\u540CA.pdf",
                    isFolder: false,
                    path: "/contracts/2024/a.pdf",
                    size: 1048576,
                    modifiedAt: Date.now() - 3456e5
                  }
                ]
              }
            ]
          },
          {
            key: "notes",
            label: "\u7B14\u8BB0.txt",
            isFolder: false,
            path: "/notes.txt",
            size: 1024,
            modifiedAt: Date.now()
          }
        ],
        table: [
          {
            key: "excel",
            label: "Excel \u6587\u4EF6",
            isFolder: true,
            path: "/excel",
            children: [
              {
                key: "excel/sales",
                label: "\u9500\u552E\u62A5\u8868.xlsx",
                isFolder: false,
                path: "/excel/sales.xlsx",
                size: 524288,
                modifiedAt: Date.now() - 864e5
              },
              {
                key: "excel/inventory",
                label: "\u5E93\u5B58\u8868.xlsx",
                isFolder: false,
                path: "/excel/inventory.xlsx",
                size: 262144,
                modifiedAt: Date.now() - 1728e5
              }
            ]
          },
          {
            key: "csv",
            label: "CSV \u6570\u636E",
            isFolder: true,
            path: "/csv",
            children: [
              {
                key: "csv/users",
                label: "\u7528\u6237\u6570\u636E.csv",
                isFolder: false,
                path: "/csv/users.csv",
                size: 4096,
                modifiedAt: Date.now()
              }
            ]
          }
        ],
        knowledge: [
          {
            key: "kb",
            label: "\u77E5\u8BC6\u5E93",
            isFolder: true,
            path: "/knowledge",
            children: [
              {
                key: "kb/faq",
                label: "\u5E38\u89C1\u95EE\u9898",
                isFolder: false,
                path: "/knowledge/faq",
                size: 8192,
                modifiedAt: Date.now() - 2592e5
              },
              {
                key: "kb/product",
                label: "\u4EA7\u54C1\u77E5\u8BC6",
                isFolder: false,
                path: "/knowledge/product",
                size: 12288,
                modifiedAt: Date.now() - 432e6
              }
            ]
          },
          {
            key: "wiki",
            label: "Wiki",
            isFolder: true,
            path: "/wiki",
            children: [
              {
                key: "wiki/tech",
                label: "\u6280\u672F\u6587\u6863",
                isFolder: false,
                path: "/wiki/tech",
                size: 20480,
                modifiedAt: Date.now() - 6048e5
              }
            ]
          }
        ],
        file: [
          {
            key: "root",
            label: "\u5168\u90E8\u6587\u4EF6",
            isFolder: true,
            path: "/",
            children: [
              {
                key: "images",
                label: "\u56FE\u7247",
                isFolder: true,
                path: "/images",
                children: [
                  {
                    key: "images/logo",
                    label: "logo.png",
                    isFolder: false,
                    path: "/images/logo.png",
                    size: 25600,
                    modifiedAt: Date.now() - 864e5
                  }
                ]
              },
              {
                key: "videos",
                label: "\u89C6\u9891",
                isFolder: true,
                path: "/videos",
                children: [
                  {
                    key: "videos/demo",
                    label: "demo.mp4",
                    isFolder: false,
                    path: "/videos/demo.mp4",
                    size: 104857600,
                    modifiedAt: Date.now() - 1728e5
                  }
                ]
              }
            ]
          }
        ]
      };
      let data = mockData[type] || [];
      if (keyword) {
        const filterNodes = (nodes) => {
          const result = [];
          for (const node of nodes) {
            if (node.label.toLowerCase().includes(keyword.toLowerCase())) {
              result.push(node);
            } else if (node.children) {
              const filteredChildren = filterNodes(node.children);
              if (filteredChildren.length > 0) {
                result.push(__spreadProps4(__spreadValues7({}, node), { children: filteredChildren }));
              }
            }
          }
          return result;
        };
        data = filterNodes(data);
      }
      return data;
    };
    const handleSearch = (keyword, trigger) => {
      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
      }
      if (trigger === "@" && props.enableFileTree) {
        const typeMap = {
          \u6587\u6863: "document",
          \u6587\u4EF6: "file",
          \u8868\u683C: "table",
          \u77E5\u8BC6\u5E93: "knowledge"
        };
        const raw = (keyword || "").trimStart();
        for (const [key, type] of Object.entries(typeMap)) {
          if (raw.startsWith(key)) {
            const rest = raw.slice(key.length).trim();
            searchDebounceTimer = setTimeout(() => {
              loadFileTree(type, rest);
            }, props.searchDebounce);
            emit("search", keyword, trigger);
            return;
          }
        }
        currentFileType.value = null;
        fileTreeData.value = [];
      }
      emit("search", keyword, trigger);
    };
    const toggleFolder = (key) => {
      if (expandedFolders.value.has(key)) {
        expandedFolders.value.delete(key);
      } else {
        expandedFolders.value.add(key);
      }
    };
    const isFolderExpanded = (key) => expandedFolders.value.has(key);
    const handleFileSelect = (node) => {
      if (node.isFolder) {
        toggleFolder(node.key);
        return;
      }
      const option = {
        value: node.path,
        label: node.label,
        type: currentFileType.value,
        path: node.path,
        size: node.size,
        modifiedAt: node.modifiedAt,
        icon: getFileIcon(node)
      };
      emit("select", option, "@");
      emit("file-select", node, option);
    };
    const getFileIcon = (node) => {
      var _a3;
      if (node.isFolder) return "folder";
      if (node.icon) return node.icon;
      const ext = ((_a3 = node.path.split(".").pop()) == null ? void 0 : _a3.toLowerCase()) || "";
      const iconMap = {
        pdf: "file-pdf",
        doc: "file-word",
        docx: "file-word",
        xlsx: "file-excel",
        xls: "file-excel",
        csv: "file-excel",
        txt: "document",
        md: "document",
        png: "picture",
        jpg: "picture",
        jpeg: "picture",
        gif: "picture",
        mp4: "video-play",
        mp3: "headset"
      };
      return iconMap[ext] || "document";
    };
    const formatFileSizeFn = (size) => {
      if (!size) return "";
      return props.formatFileSize(size);
    };
    const formatTimeFn = (timestamp) => {
      if (!timestamp) return "";
      const date = new Date(timestamp);
      const now = /* @__PURE__ */ new Date();
      const diff = now.getTime() - date.getTime();
      if (diff < 864e5) {
        return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
      }
      if (diff < 6048e5) {
        return Math.floor(diff / 864e5) + "\u5929\u524D";
      }
      return date.toLocaleDateString("zh-CN");
    };
    const showFileTree = computed16(() => {
      return props.enableFileTree && currentFileType.value !== null && fileTreeData.value.length > 0;
    });
    const refreshFileTree = () => {
      if (currentFileType.value) {
        loadFileTree(currentFileType.value);
      }
    };
    __expose({
      focus: () => {
        var _a3;
        return (_a3 = mentionRef.value) == null ? void 0 : _a3.focus();
      },
      blur: () => {
        var _a3;
        return (_a3 = mentionRef.value) == null ? void 0 : _a3.blur();
      },
      clear: () => {
        var _a3;
        return (_a3 = mentionRef.value) == null ? void 0 : _a3.clear();
      },
      getRef: () => {
        var _a3;
        return (_a3 = mentionRef.value) == null ? void 0 : _a3.ref;
      },
      insertMention: (option, trigger) => {
        var _a3;
        return (_a3 = mentionRef.value) == null ? void 0 : _a3.insertMention(option, trigger);
      },
      refreshFileTree,
      toggleFolder: (key) => toggleFolder(key)
    });
    const __returned__ = { props, emit, slots, forwardedSlotNames, ns, t, themeStyle, mentionRef, fileTreeData, fileTreeLoading, expandedFolders, currentFileType, get searchDebounceTimer() {
      return searchDebounceTimer;
    }, set searchDebounceTimer(v) {
      searchDebounceTimer = v;
    }, filteredOptions, handleUpdateValue, handleSelect, getTypeIcon, getTypeLabel, getOptionIcon, asAiMentionOption, fileTreePanelStyle, loadFileTree, generateMockFileTree, handleSearch, toggleFolder, isFolderExpanded, handleFileSelect, getFileIcon, formatFileSizeFn, formatTimeFn, showFileTree, refreshFileTree, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, computed: computed16, ref: ref16, useSlots: useSlots4, get aiMentionProps() {
      return aiMentionProps;
    }, get aiMentionEmits() {
      return aiMentionEmits;
    }, get YhMention() {
      return YhMention;
    }, get YhIcon() {
      return YhIcon;
    }, get useComponentTheme() {
      return useComponentTheme;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__6.render = render6;
var stdin_default8 = __sfc__6;

// public/codesandbox-runtime/components/ai-mention/index.js
var YhAiMention = withInstall(stdin_default8);

// public/codesandbox-runtime/components/ai-sender/src/ai-sender.js
var _hoisted_16 = ["onClick"];
var _hoisted_23 = ["title"];
var _hoisted_33 = ["onClick"];
function render7(_ctx, _cache, $props, $setup, $data, $options) {
  var _a3;
  return _openBlock7(), _createElementBlock7(
    "div",
    {
      class: _normalizeClass6([$setup.ns.b(), $setup.ns.is("disabled", _ctx.disabled), $setup.ns.is("loading", _ctx.loading), $setup.ns.is("focused", $setup.isFocused)]),
      style: _normalizeStyle6($setup.themeStyle),
      onDragenter: $setup.handleDragEnter,
      onDragover: $setup.handleDragOver,
      onDragleave: $setup.handleDragLeave,
      onDrop: $setup.handleDrop
    },
    [
      _createCommentVNode7(" Drag Overlay "),
      _createVNode3(_Transition3, { name: "yh-fade-in" }, {
        default: _withCtx4(() => [
          $setup.isDragging ? (_openBlock7(), _createElementBlock7(
            "div",
            {
              key: 0,
              class: _normalizeClass6($setup.ns.e("drag-overlay"))
            },
            [
              _createElementVNode6(
                "div",
                {
                  class: _normalizeClass6($setup.ns.e("drag-message"))
                },
                [
                  _createVNode3($setup["YhIcon"], { name: "upload" }),
                  _createElementVNode6(
                    "span",
                    null,
                    _toDisplayString4($setup.t("ai.sender.dragTip")),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )) : _createCommentVNode7("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }),
      _createCommentVNode7(" Slash Commands Panel "),
      _createVNode3(_Transition3, { name: "yh-zoom-in-bottom" }, {
        default: _withCtx4(() => [
          $setup.showCommands && $setup.filteredCommands.length > 0 ? (_openBlock7(), _createElementBlock7(
            "div",
            {
              key: 0,
              ref: "commandPanelRef",
              class: _normalizeClass6($setup.ns.e("command-panel"))
            },
            [
              (_openBlock7(true), _createElementBlock7(
                _Fragment5,
                null,
                _renderList3($setup.filteredCommands, (cmd, index) => {
                  return _openBlock7(), _createElementBlock7("div", {
                    key: cmd.key,
                    class: _normalizeClass6([$setup.ns.e("command-item"), $setup.ns.is("active", index === $setup.selectedCommandIndex)]),
                    onClick: ($event) => $setup.handleSelectCommand(cmd)
                  }, [
                    _createElementVNode6(
                      "div",
                      {
                        class: _normalizeClass6($setup.ns.e("command-icon"))
                      },
                      [
                        _createVNode3($setup["YhIcon"], {
                          name: cmd.icon || "sparkles"
                        }, null, 8, ["name"])
                      ],
                      2
                      /* CLASS */
                    ),
                    _createElementVNode6(
                      "div",
                      {
                        class: _normalizeClass6($setup.ns.e("command-info"))
                      },
                      [
                        _createElementVNode6(
                          "div",
                          {
                            class: _normalizeClass6($setup.ns.e("command-label"))
                          },
                          "/" + _toDisplayString4(cmd.key),
                          3
                          /* TEXT, CLASS */
                        ),
                        cmd.description ? (_openBlock7(), _createElementBlock7(
                          "div",
                          {
                            key: 0,
                            class: _normalizeClass6($setup.ns.e("command-desc"))
                          },
                          _toDisplayString4(cmd.description),
                          3
                          /* TEXT, CLASS */
                        )) : _createCommentVNode7("v-if", true)
                      ],
                      2
                      /* CLASS */
                    )
                  ], 10, _hoisted_16);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          )) : _createCommentVNode7("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }),
      _createElementVNode6(
        "div",
        {
          class: _normalizeClass6($setup.ns.e("input-wrapper"))
        },
        [
          _ctx.$slots.prefix ? (_openBlock7(), _createElementBlock7(
            "div",
            {
              key: 0,
              class: _normalizeClass6($setup.ns.e("prefix"))
            },
            [
              _renderSlot6(_ctx.$slots, "prefix")
            ],
            2
            /* CLASS */
          )) : _createCommentVNode7("v-if", true),
          _createCommentVNode7(" Attachments Area "),
          _ctx.attachments && _ctx.attachments.length > 0 ? (_openBlock7(), _createElementBlock7(
            "div",
            {
              key: 1,
              class: _normalizeClass6($setup.ns.e("attachments"))
            },
            [
              (_openBlock7(true), _createElementBlock7(
                _Fragment5,
                null,
                _renderList3(_ctx.attachments, (file) => {
                  return _openBlock7(), _createElementBlock7(
                    "div",
                    {
                      key: file.id,
                      class: _normalizeClass6([$setup.ns.e("attachment-item"), $setup.ns.is(file.status || "success")])
                    },
                    [
                      _createElementVNode6(
                        "div",
                        {
                          class: _normalizeClass6($setup.ns.e("attachment-preview"))
                        },
                        [
                          file.type.startsWith("image/") ? (_openBlock7(), _createBlock7($setup["YhImage"], {
                            key: 0,
                            src: file.url,
                            alt: file.name,
                            "preview-src-list": file.url ? [file.url] : [],
                            "preview-teleported": "",
                            fit: "cover"
                          }, null, 8, ["src", "alt", "preview-src-list"])) : (_openBlock7(), _createBlock7($setup["YhIcon"], {
                            key: 1,
                            name: "document"
                          }))
                        ],
                        2
                        /* CLASS */
                      ),
                      _createElementVNode6(
                        "div",
                        {
                          class: _normalizeClass6($setup.ns.e("attachment-info"))
                        },
                        [
                          _createElementVNode6("div", {
                            class: _normalizeClass6($setup.ns.e("attachment-name")),
                            title: file.name
                          }, _toDisplayString4(file.name), 11, _hoisted_23),
                          file.status === "uploading" ? (_openBlock7(), _createElementBlock7(
                            "div",
                            {
                              key: 0,
                              class: _normalizeClass6($setup.ns.e("attachment-progress"))
                            },
                            [
                              _createElementVNode6(
                                "div",
                                {
                                  class: _normalizeClass6($setup.ns.e("progress-bar")),
                                  style: _normalizeStyle6({
                                    width: (file.progress || 0) + "%"
                                  })
                                },
                                null,
                                6
                                /* CLASS, STYLE */
                              )
                            ],
                            2
                            /* CLASS */
                          )) : _createCommentVNode7("v-if", true)
                        ],
                        2
                        /* CLASS */
                      ),
                      _createElementVNode6("button", {
                        class: _normalizeClass6($setup.ns.e("attachment-remove")),
                        onClick: ($event) => $setup.handleRemoveAttachment(file)
                      }, [
                        _createVNode3($setup["YhIcon"], { name: "close" })
                      ], 10, _hoisted_33)
                    ],
                    2
                    /* CLASS */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          )) : _createCommentVNode7("v-if", true),
          _createElementVNode6(
            "div",
            {
              class: _normalizeClass6($setup.ns.e("textarea-container"))
            },
            [
              _createVNode3($setup["YhAiMention"], {
                ref: "textareaRef",
                modelValue: $setup.innerValue,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.innerValue = $event),
                type: "textarea",
                class: _normalizeClass6($setup.ns.e("textarea")),
                placeholder: _ctx.placeholder === "Send a message..." ? $setup.t("ai.sender.placeholder") : _ctx.placeholder,
                disabled: _ctx.disabled || _ctx.loading,
                "max-length": _ctx.maxLength,
                rows: 1,
                options: _ctx.mentionOptions,
                trigger: ["@", "#"],
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur,
                onInput: $setup.handleInput,
                onKeydown: $setup.handleKeyDown
              }, null, 8, ["modelValue", "class", "placeholder", "disabled", "max-length", "options"])
            ],
            2
            /* CLASS */
          ),
          _createElementVNode6(
            "div",
            {
              class: _normalizeClass6($setup.ns.e("suffix"))
            },
            [
              _ctx.showWordLimit && _ctx.maxLength ? (_openBlock7(), _createElementBlock7(
                "span",
                {
                  key: 0,
                  class: _normalizeClass6($setup.ns.e("word-limit"))
                },
                _toDisplayString4($setup.innerValue.length) + " / " + _toDisplayString4(_ctx.maxLength),
                3
                /* TEXT, CLASS */
              )) : _createCommentVNode7("v-if", true)
            ],
            2
            /* CLASS */
          ),
          _createElementVNode6(
            "div",
            {
              class: _normalizeClass6($setup.ns.e("actions"))
            },
            [
              _renderSlot6(_ctx.$slots, "actions"),
              _ctx.clearable && $setup.innerValue.length > 0 ? (_openBlock7(), _createBlock7($setup["YhButton"], {
                key: 0,
                class: _normalizeClass6($setup.ns.e("clear-btn")),
                circle: "",
                onClick: $setup.handleClear,
                disabled: _ctx.loading
              }, {
                icon: _withCtx4(() => [
                  _createVNode3($setup["YhIcon"], { name: "clean" })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class", "disabled"])) : _createCommentVNode7("v-if", true),
              _renderSlot6(_ctx.$slots, "submit", {
                disabled: !((_a3 = $setup.innerValue) == null ? void 0 : _a3.trim()) || _ctx.disabled,
                loading: _ctx.loading,
                submit: $setup.handleSend
              }, () => {
                var _a22, _b;
                return [
                  _createVNode3($setup["YhButton"], {
                    type: ((_a22 = $setup.innerValue) == null ? void 0 : _a22.trim()) && !_ctx.disabled && !_ctx.loading ? "primary" : "default",
                    class: _normalizeClass6($setup.ns.e("send-btn")),
                    disabled: !((_b = $setup.innerValue) == null ? void 0 : _b.trim()) || _ctx.disabled,
                    loading: _ctx.loading,
                    onClick: $setup.handleSend,
                    circle: ""
                  }, {
                    icon: _withCtx4(() => [
                      _createVNode3($setup["YhIcon"], { name: "send-arrow" })
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["type", "class", "disabled", "loading"])
                ];
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
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
var __sfc__7 = /* @__PURE__ */ Object.assign({
  name: "YhAiSender"
}, {
  __name: "ai-sender",
  props: aiSenderProps,
  emits: aiSenderEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    var _a3;
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("ai-sender");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme(
      "ai-sender",
      computed17(() => props.themeOverrides)
    );
    const textareaRef = ref17(null);
    const localValue = ref17((_a3 = props.modelValue) != null ? _a3 : "");
    const isFocused = ref17(false);
    const commandPanelRef = ref17();
    const isDragging = ref17(false);
    const showCommands = ref17(false);
    const commandSearch = ref17("");
    const selectedCommandIndex = ref17(0);
    const handleDragEnter = (e) => {
      if (props.disabled || props.loading) return;
      e.preventDefault();
      isDragging.value = true;
    };
    const handleDragOver = (e) => {
      if (props.disabled || props.loading) return;
      e.preventDefault();
      isDragging.value = true;
    };
    const handleDragLeave = (e) => {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      if (e.clientX <= rect.left || e.clientX >= rect.right || e.clientY <= rect.top || e.clientY >= rect.bottom) {
        isDragging.value = false;
      }
    };
    const handleDrop = (e) => {
      var _a22;
      if (props.disabled || props.loading) return;
      e.preventDefault();
      isDragging.value = false;
      const files = (_a22 = e.dataTransfer) == null ? void 0 : _a22.files;
      if (files && files.length > 0) {
        handleFiles(Array.from(files));
      }
    };
    const handleFiles = (files) => {
      emit("upload", files);
    };
    const handleRemoveAttachment = (attachment) => {
      emit("remove-attachment", attachment);
    };
    watch7(
      () => props.modelValue,
      (val) => {
        localValue.value = val;
      }
    );
    const innerValue = computed17({
      get: () => localValue.value,
      set: (val) => {
        localValue.value = val;
        emit("update:modelValue", val);
        emit("change", val);
      }
    });
    const filteredCommands = computed17(() => {
      if (!commandSearch.value) return props.commands;
      const search = commandSearch.value.toLowerCase();
      return props.commands.filter(
        (cmd) => cmd.key.toLowerCase().includes(search) || cmd.label.toLowerCase().includes(search)
      );
    });
    const autoResize = () => {
      var _a22;
      const el = (_a22 = textareaRef.value) == null ? void 0 : _a22.getRef();
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    };
    const handleInput = (val) => {
      var _a22;
      innerValue.value = val;
      const el = (_a22 = textareaRef.value) == null ? void 0 : _a22.getRef();
      if (!el) return;
      const cursorPosition = el.selectionStart || 0;
      const textBeforeCursor = val.slice(0, cursorPosition);
      const lastSlashIndex = textBeforeCursor.lastIndexOf("/");
      if (lastSlashIndex !== -1) {
        const textAfterSlash = textBeforeCursor.slice(lastSlashIndex + 1);
        if (lastSlashIndex === 0 || textBeforeCursor[lastSlashIndex - 1] === " " || textBeforeCursor[lastSlashIndex - 1] === "\n") {
          if (!textAfterSlash.includes(" ")) {
            showCommands.value = true;
            commandSearch.value = textAfterSlash;
            selectedCommandIndex.value = 0;
          } else {
            showCommands.value = false;
          }
        } else {
          showCommands.value = false;
        }
      } else {
        showCommands.value = false;
      }
      nextTick2(autoResize);
    };
    const handleSelectCommand = (command) => {
      var _a22;
      const val = innerValue.value;
      const el = (_a22 = textareaRef.value) == null ? void 0 : _a22.getRef();
      const cursorPosition = (el == null ? void 0 : el.selectionStart) || 0;
      const textBeforeCursor = val.slice(0, cursorPosition);
      const lastSlashIndex = textBeforeCursor.lastIndexOf("/");
      const textAfterCursor = val.slice(cursorPosition);
      const replacement = command.prompt || `/${command.key} `;
      innerValue.value = textBeforeCursor.slice(0, lastSlashIndex) + replacement + textAfterCursor;
      showCommands.value = false;
      emit("command", command);
      nextTick2(() => {
        var _a32;
        (_a32 = textareaRef.value) == null ? void 0 : _a32.focus();
        autoResize();
      });
    };
    const handleKeyDown = (e) => {
      var _a22;
      if (showCommands.value && filteredCommands.value.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          selectedCommandIndex.value = (selectedCommandIndex.value + 1) % filteredCommands.value.length;
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          selectedCommandIndex.value = (selectedCommandIndex.value - 1 + filteredCommands.value.length) % filteredCommands.value.length;
        } else if (e.key === "Enter" || e.key === "Tab") {
          e.preventDefault();
          handleSelectCommand(filteredCommands.value[selectedCommandIndex.value]);
        } else if (e.key === "Escape") {
          showCommands.value = false;
        }
        return;
      }
      if (e.key === "Enter" && !e.shiftKey) {
        if (!((_a22 = innerValue.value) == null ? void 0 : _a22.trim()) || props.loading || props.disabled) {
          e.preventDefault();
        } else {
          e.preventDefault();
          handleSend();
        }
      }
    };
    const handleSend = () => {
      var _a22;
      if (!((_a22 = innerValue.value) == null ? void 0 : _a22.trim()) || props.loading || props.disabled) return;
      emit("send", innerValue.value);
      innerValue.value = "";
      nextTick2(() => {
        var _a32;
        const el = (_a32 = textareaRef.value) == null ? void 0 : _a32.getRef();
        if (el) {
          el.style.height = "auto";
        }
      });
    };
    const handleClear = () => {
      innerValue.value = "";
      emit("clear");
      nextTick2(autoResize);
    };
    const handleBlur = (e) => {
      isFocused.value = false;
      setTimeout(() => {
        showCommands.value = false;
      }, 200);
      emit("blur", e);
    };
    const handleFocus = (e) => {
      isFocused.value = true;
      emit("focus", e);
    };
    const __returned__ = { props, emit, ns, t, themeStyle, textareaRef, localValue, isFocused, commandPanelRef, isDragging, showCommands, commandSearch, selectedCommandIndex, handleDragEnter, handleDragOver, handleDragLeave, handleDrop, handleFiles, handleRemoveAttachment, innerValue, filteredCommands, autoResize, handleInput, handleSelectCommand, handleKeyDown, handleSend, handleClear, handleBlur, handleFocus, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, ref: ref17, computed: computed17, nextTick: nextTick2, watch: watch7, get aiSenderProps() {
      return aiSenderProps;
    }, get aiSenderEmits() {
      return aiSenderEmits;
    }, get YhButton() {
      return YhButton;
    }, get YhIcon() {
      return YhIcon;
    }, get YhImage() {
      return YhImage;
    }, get YhAiMention() {
      return YhAiMention;
    }, get useComponentTheme() {
      return useComponentTheme;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__7.render = render7;
var stdin_default9 = __sfc__7;
export {
  stdin_default9 as default
};
