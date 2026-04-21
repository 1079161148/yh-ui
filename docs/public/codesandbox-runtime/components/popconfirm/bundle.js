// public/codesandbox-runtime/components/popconfirm/src/popconfirm.js
import { createCommentVNode as _createCommentVNode6, renderSlot as _renderSlot6, createVNode as _createVNode2, normalizeClass as _normalizeClass5, normalizeStyle as _normalizeStyle5, openBlock as _openBlock6, createElementBlock as _createElementBlock6, toDisplayString as _toDisplayString3, createTextVNode as _createTextVNode2, createElementVNode as _createElementVNode4, withCtx as _withCtx4, withModifiers as _withModifiers, createBlock as _createBlock5, Fragment as _Fragment3 } from "vue";
import { ref as ref15, computed as computed16 } from "vue";

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
      sold: "\u5DF2\u552E",
      soldOut: "\u552E\u7F44",
      vip: "\u4F1A\u5458"
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
      cancel: "\u53D6\u6D88",
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

// public/codesandbox-runtime/locale/lang/en.js
var en = {
  name: "en",
  yh: {
    // Common
    common: {
      yes: "Yes",
      no: "No",
      confirm: "Confirm",
      cancel: "Cancel",
      loading: "Loading",
      close: "Close",
      clear: "Clear",
      reset: "Reset",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      search: "Search",
      refresh: "Refresh",
      expand: "Expand",
      collapse: "Collapse",
      more: "More",
      noData: "No Data",
      noMatch: "No matching data",
      selectAll: "Select All",
      unselectAll: "Unselect All"
    },
    // Color Picker
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      eyeDropper: "Eye Dropper",
      suggestionDark: "White text is best",
      suggestionLight: "Black text is best",
      recentColors: "Recent Colors",
      presetColors: "Preset Colors"
    },
    // Date Picker
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      year: "",
      month: "",
      day: "",
      week: "Week",
      monthBeforeYear: true,
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      },
      quarters: {
        q1: "Q1",
        q2: "Q2",
        q3: "Q3",
        q4: "Q4"
      }
    },
    // Time Picker
    timepicker: {
      confirm: "OK",
      cancel: "Cancel",
      now: "Now",
      placeholder: "Select time",
      startPlaceholder: "Start time",
      endPlaceholder: "End time",
      selectTime: "Select time"
    },
    // Time Select
    timeselect: {
      placeholder: "Select time"
    },
    // Tree
    tree: {
      emptyText: "No Data",
      loading: "Loading...",
      checkAll: "Check All",
      uncheckAll: "Uncheck All",
      expandAll: "Expand All",
      collapseAll: "Collapse All"
    },
    // Tree Select
    treeselect: {
      placeholder: "Select",
      emptyText: "No Data",
      loading: "Loading...",
      noMatch: "No matching data"
    },
    // Calendar
    calendar: {
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      today: "Today",
      week: "Week",
      holiday: "Holiday",
      workday: "Work",
      monthHeaderFormat: "MMMM YYYY",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      }
    },
    // Autocomplete
    autocomplete: {
      loading: "Loading...",
      placeholder: "Please input",
      noData: "No Data",
      noMatch: "No matching data"
    },
    // Countdown
    countdown: {
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      milliseconds: "milliseconds",
      finished: "Finished"
    },
    // Cascader
    cascader: {
      noMatch: "No matching data",
      placeholder: "Select",
      loading: "Loading...",
      noData: "No Data"
    },
    // Transfer
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked",
      searchPlaceholder: "Enter keyword"
    },
    // Table
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum",
      loading: "Loading...",
      index: "Index",
      print: "Print",
      cancel: "Cancel",
      preview: "Print Preview",
      printTime: "Print Time",
      total: "Total {total} items",
      page: "Page {page}",
      yes: "Yes",
      no: "No",
      // Toolbar
      toolbar: {
        refresh: "Refresh",
        density: "Density",
        densityDefault: "Default",
        densityLarge: "Large",
        densitySmall: "Small",
        columnSetting: "Column Settings",
        fullscreen: "Fullscreen",
        exitFullscreen: "Exit Fullscreen",
        export: "Export",
        import: "Import",
        search: "Search",
        searchPlaceholder: "Enter keywords to search"
      },
      // Filter
      filter: {
        selectAll: "Select All",
        selectInvert: "Invert Selection",
        empty: "Is Empty",
        notEmpty: "Is Not Empty",
        contains: "Contains",
        notContains: "Does Not Contain",
        equals: "Equals",
        notEquals: "Does Not Equal",
        startsWith: "Starts With",
        endsWith: "Ends With",
        greaterThan: "Greater Than",
        lessThan: "Less Than",
        between: "Between"
      },
      // Sort
      sort: {
        asc: "Ascending",
        desc: "Descending",
        clear: "Clear Sort"
      },
      // Export
      export: {
        title: "Export Data",
        filename: "Filename",
        type: "File Type",
        scope: "Export Scope",
        scopeAll: "All Data",
        scopeSelected: "Selected Data",
        scopeCurrentPage: "Current Page",
        includeHeader: "Include Header",
        exporting: "Exporting...",
        success: "Export Successful",
        error: "Export Failed"
      },
      // Import
      import: {
        title: "Import Data",
        selectFile: "Select File",
        dragTip: "Click or drag file here to upload",
        importing: "Importing...",
        success: "Import Successful",
        error: "Import Failed",
        preview: "Data Preview",
        confirm: "Confirm Import"
      },
      // Print
      printConfig: {
        title: "Print Settings",
        pageTitle: "Page Title",
        pageHeader: "Header",
        pageFooter: "Footer",
        printAll: "Print All",
        printSelected: "Print Selected",
        printCurrentPage: "Print Current Page",
        landscape: "Landscape",
        portrait: "Portrait",
        printing: "Printing..."
      },
      // Column Settings
      columnSetting: {
        title: "Column Settings",
        showAll: "Show All",
        hideAll: "Hide All",
        reset: "Reset",
        fixedLeft: "Fix to Left",
        fixedRight: "Fix to Right",
        unfixed: "Unfix"
      },
      // Context Menu
      contextMenu: {
        copy: "Copy",
        copyRow: "Copy Row",
        copyCell: "Copy Cell",
        paste: "Paste",
        insertRowAbove: "Insert Row Above",
        insertRowBelow: "Insert Row Below",
        deleteRow: "Delete Row",
        deleteSelectedRows: "Delete Selected Rows",
        exportSelected: "Export Selected"
      },
      // Selection
      selection: {
        selectAll: "Select All",
        selectInvert: "Invert Selection",
        selectNone: "Clear Selection",
        selected: "{count} items selected"
      },
      // Expand
      expand: {
        expandAll: "Expand All",
        collapseAll: "Collapse All"
      },
      // Tree
      tree: {
        expandAll: "Expand All",
        collapseAll: "Collapse All",
        expandLevel: "Expand to Level {level}"
      },
      // Drag
      drag: {
        dragTip: "Drag to reorder",
        dropTip: "Drop to place"
      }
    },
    // Message Box
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      close: "Close",
      error: "Illegal input",
      alert: "Alert",
      prompt: "Prompt",
      inputPlaceholder: "Please input"
    },
    // Upload
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue",
      upload: "Click to upload",
      tip: "Click or drag file to this area to <em>upload</em>",
      dragTip: "Drop file here or click to upload",
      uploading: "Uploading...",
      success: "Upload successful",
      error: "Upload failed",
      retry: "Retry",
      cancel: "Cancel upload",
      fileTypeError: "File type not supported",
      fileSizeError: "File size exceeds limit",
      fileCountError: "File count exceeds limit"
    },
    // Form
    form: {
      validationFailed: "Validation failed",
      required: "Required",
      pleaseInput: "Please input",
      pleaseSelect: "Please select"
    },
    // Button
    button: {
      loading: "Loading..."
    },
    // Input
    input: {
      placeholder: "Please input",
      clear: "Clear",
      showPassword: "Show password",
      hidePassword: "Hide password",
      copy: "Copy",
      copied: "Copied"
    },
    // Input Number
    inputnumber: {
      placeholder: "Please input number",
      increase: "Increase",
      decrease: "Decrease"
    },
    // Input Tag
    inputtag: {
      placeholder: "Please input",
      add: "Add",
      remove: "Remove"
    },
    // Breadcrumb
    breadcrumb: {
      label: "Breadcrumb",
      more: "More"
    },
    // Back Top
    backtop: {
      text: "Back to Top"
    },
    // Select
    select: {
      placeholder: "Please select",
      noData: "No Data",
      loading: "Loading...",
      noMatch: "No matching data",
      selectAll: "Select All",
      clearAll: "Clear All"
    },
    // Pagination
    pagination: {
      goto: "Go to",
      page: "",
      total: "Total {total}",
      pageSize: "/page",
      prev: "Previous",
      next: "Next",
      first: "First",
      last: "Last",
      pageClassifier: ""
    },
    // Popconfirm
    popconfirm: {
      confirm: "OK",
      cancel: "Cancel",
      dontAskAgain: "Don't ask again"
    },
    // Dialog
    dialog: {
      confirm: "OK",
      cancel: "Cancel",
      close: "Close",
      maximize: "Maximize",
      restore: "Restore"
    },
    // Drawer
    drawer: {
      close: "Close",
      confirm: "OK",
      cancel: "Cancel"
    },
    // Dropdown
    dropdown: {
      loading: "Loading..."
    },
    // Image
    image: {
      error: "FAILED",
      loading: "Loading...",
      preview: "Preview",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateLeft: "Rotate Left",
      rotateRight: "Rotate Right",
      originalSize: "Original Size",
      fullscreen: "Fullscreen"
    },
    // Image Viewer
    imageviewer: {
      close: "Close",
      prev: "Previous",
      next: "Next",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateLeft: "Rotate Left",
      rotateRight: "Rotate Right",
      reset: "Reset",
      fullscreen: "Fullscreen",
      exitFullscreen: "Exit Fullscreen"
    },
    // Infinite Scroll
    infinitescroll: {
      loading: "Loading...",
      finished: "No more data",
      error: "Load failed, click to retry",
      retry: "Click to retry"
    },
    // Message
    message: {
      close: "Close"
    },
    // Notification
    notification: {
      close: "Close"
    },
    // Loading
    loading: {
      text: "Loading..."
    },
    // Spin
    spin: {
      text: "Loading..."
    },
    // Rate
    rate: {
      texts: ["Extremely poor", "Disappointed", "Fair", "Satisfied", "Surprised"]
    },
    // Alert
    alert: {
      close: "Close"
    },
    // Tag
    tag: {
      close: "Close"
    },
    // Tabs
    tabs: {
      close: "Close",
      add: "Add",
      more: "More"
    },
    // Steps
    steps: {
      finish: "Finished",
      process: "In Progress",
      wait: "Waiting",
      error: "Error"
    },
    // Progress
    progress: {
      success: "Success",
      exception: "Exception",
      warning: "Warning"
    },
    // Skeleton
    skeleton: {
      loading: "Loading..."
    },
    // Empty
    empty: {
      description: "No Data",
      noData: "No Data",
      noResult: "No Results",
      networkError: "Network Error",
      serverError: "Server Error"
    },
    // Result
    result: {
      success: "Success",
      error: "Error",
      warning: "Warning",
      info: "Info",
      backHome: "Back to Home"
    },
    // Waterfall
    waterfall: {
      loading: "Loading...",
      noMore: "No more data",
      empty: "No Data"
    },
    // Descriptions
    descriptions: {
      colon: ":"
    },
    // Slider
    slider: {
      tipFormatter: "{value}"
    },
    // Switch
    switch: {
      on: "ON",
      off: "OFF"
    },
    // Checkbox
    checkbox: {
      selectAll: "Select All"
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: "Collapse Menu",
      expand: "Expand Menu"
    },
    // Card
    card: {
      collapse: "Collapse",
      expand: "Expand"
    },
    // Collapse
    collapse: {
      expand: "Expand",
      collapse: "Collapse"
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: "Load failed"
    },
    // Watermark
    watermark: {},
    // Divider
    divider: {},
    // Carousel
    carousel: {
      prev: "Previous",
      next: "Next"
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Flow
    flow: {
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      fitView: "Fit View",
      lock: "Toggle Interactivity"
    },
    // Anchor
    anchor: {},
    // Mention
    mention: {
      placeholder: "Please input",
      loading: "Loading...",
      noData: "No Data"
    },
    // SKU Selector
    skuselector: {
      placeholder: "Select specifications",
      emptyText: "No specifications",
      stock: "Stock",
      price: "Price",
      selected: "Selected",
      outOfStock: "Out of Stock"
    },
    // Product Card
    productcard: {
      viewDetails: "View Details",
      buyNow: "Buy Now",
      addToCart: "Add to Cart",
      sold: "Sold",
      soldOut: "Sold Out",
      vip: "VIP"
    },
    // Price
    price: {
      original: "Original"
    },
    // Coupon Card
    couponcard: {
      available: "Claim Now",
      used: "Used",
      expired: "Expired",
      received: "Received",
      limit: "Orders over {threshold}",
      noThreshold: "No threshold",
      validPeriod: "Validity",
      ruleTitle: "Usage Rules"
    },
    // Lucky Draw
    luckydraw: {
      start: "Start",
      drawing: "Drawing...",
      end: "Winner!",
      retry: "Retry"
    },
    // Filter Bar
    filterbar: {
      all: "All",
      sort: "Sort",
      filter: "Filter",
      cancel: "Cancel",
      reset: "Reset",
      confirm: "Confirm",
      noOptions: "No options",
      asc: "Ascending",
      desc: "Descending",
      selected: "Selected"
    },
    // Submit Bar
    submitbar: {
      total: "Total: ",
      selected: "{count} selected",
      submit: "Checkout",
      allSelect: "Select All"
    },
    // Category Nav
    categorynav: {
      all: "All",
      noData: "No Data",
      loading: "Loading..."
    },
    // Smart Address
    smartaddress: {
      placeholder: "Paste address here, auto-detect name, phone, location",
      parse: "Smart Parse",
      province: "Province/City/District",
      city: "City",
      district: "District/County",
      street: "Street/Town",
      detail: "Detailed Address",
      phone: "Phone",
      name: "Recipient",
      parseSuccess: "Address parsed successfully",
      parseFailed: "Parse failed, please fill manually",
      required: "Please fill complete address",
      provinceKeywords: ["Province", "State"],
      cityKeywords: ["City", "Prefecture"],
      districtKeywords: ["District", "County", "Township"],
      streetKeywords: ["Street", "Road", "Ave", "Lane"]
    },
    ganttchart: {
      taskName: "Task Name",
      searchPlaceholder: "Search tasks...",
      zoom: "Zoom",
      day: "Day",
      week: "Week",
      month: "Month",
      year: "Year",
      milestone: "Milestone"
    },
    imagemagnifier: {
      switchToImage: "Switch to image {index}",
      galleryItem: "Gallery {index}",
      close: "Close"
    },
    // AI Components
    ai: {
      bubble: {
        citations: "Citations"
      },
      mention: {
        placeholder: "@ Mention Agent, Doc or Table...",
        agent: "Agent",
        document: "Document",
        table: "Table",
        knowledge: "Knowledge"
      },
      codeBlock: {
        copyCode: "Copy code",
        copied: "Copied!",
        run: "Run Code",
        edit: "Edit",
        save: "Save",
        cancel: "Cancel"
      },
      codeRunner: {
        run: "Run",
        stop: "Stop",
        clear: "Clear",
        reset: "Reset",
        placeholder: "Click Run to execute the code..."
      },
      sender: {
        placeholder: "Send a message...",
        dragTip: "Release to upload files"
      },
      thoughtChain: {
        thoughtProcess: "Thought Process",
        thinking: "Thinking...",
        defaultTitle: "New Step",
        addNode: "Add Step"
      },
      thinking: {
        start: "Start thinking",
        thinking: "Thinking...",
        complete: "Thinking complete",
        error: "Thinking error"
      },
      welcome: {
        title: "Hello, I am YH AI",
        description: "I can help you with coding, translating documents, or creative writing. What can I do for you today?"
      },
      action: {
        copy: "Copy",
        regenerate: "Regenerate",
        share: "Share",
        like: "Like",
        dislike: "Dislike",
        edit: "Edit",
        delete: "Delete"
      },
      artifacts: {
        preview: "Preview",
        inline: "Inline",
        code: "Source",
        versions: "Versions",
        rendering: "Rendering component...",
        renderingChart: "Rendering chart...",
        renderingCanvas: "Preparing canvas..."
      },
      voice: {
        trigger: "Click to Speak",
        listening: "Listening..."
      },
      // AiAgentCard
      agent: {
        uses: "uses",
        use: "Use Now",
        favorite: "Favorite",
        unfavorite: "Unfavorite",
        share: "Share",
        online: "Online",
        offline: "Offline",
        busy: "Busy",
        verified: "Verified",
        rating: "Rating",
        reviews: "reviews",
        responseTime: "Avg. Response",
        ms: "ms"
      },
      // AiSources
      sources: {
        references: "References",
        referencedSources: "Referenced Sources",
        relevant: "Relevance",
        viewOriginal: "View Original",
        showAll: "Show All",
        more: "more sources",
        drawerTitle: "References",
        expandMore: "Show More",
        collapseMore: "Collapse",
        noSources: "No sources",
        today: "Today",
        last7Days: "Last 7 Days",
        last30Days: "Last 30 Days",
        earlier: "Earlier",
        pinned: "Pinned"
      },
      // AiConversations groups
      conversations: {
        today: "Today",
        last7Days: "Last 7 Days",
        last30Days: "Last 30 Days",
        earlier: "Earlier",
        pinned: "Pinned",
        pin: "Pin",
        unpin: "Unpin",
        newConversation: "New Conversation",
        noData: "No conversations yet",
        rename: "Rename",
        delete: "Delete",
        deleteConfirm: "Confirm delete this conversation?"
      },
      // AiAttachments
      attachments: {
        dropTip: "Drop files here to upload",
        clickToUpload: "Click or drag files to upload",
        uploadSuccess: "Upload success",
        uploadError: "Upload failed",
        deleteConfirm: "Are you sure to delete this file?",
        fileTooLarge: "File size cannot exceed {size}",
        invalidFileType: "Invalid file type"
      },
      // AiMermaid
      mermaid: {
        image: "Image",
        code: "Code",
        zoomIn: "Zoom In",
        zoomOut: "Zoom Out",
        reset: "Reset",
        download: "Download",
        copyCode: "Copy Code",
        rendering: "Rendering...",
        renderError: "Render failed",
        renderSuccess: "Render success",
        retry: "Retry"
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
  const resolveLocaleValue = (path) => {
    const keys = path.split(".");
    const sources = [locale.value.yh, zhCn.yh, en.yh];
    for (const source of sources) {
      let result = source;
      for (const key of keys) {
        if (result && typeof result === "object") {
          result = result[key];
        } else {
          result = void 0;
          break;
        }
      }
      if (result !== void 0) return result;
    }
    return void 0;
  };
  const t = (path, options) => {
    const result = resolveLocaleValue(path);
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
    const result = resolveLocaleValue(path);
    if (result === void 0) return path;
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
function useEventListener(target, event, handler, options) {
  if (typeof window === "undefined") return;
  const getTarget = () => {
    if (typeof target === "function") {
      return target();
    }
    return unref7(target);
  };
  const add = () => {
    const el = getTarget();
    if (el) {
      el.addEventListener(event, handler, options);
    }
  };
  const remove = () => {
    const el = getTarget();
    if (el) {
      el.removeEventListener(event, handler, options);
    }
  };
  onMounted(add);
  onBeforeUnmount(remove);
  if (isRef(target)) {
    watch2(target, (newVal, oldVal) => {
      if (oldVal) {
        oldVal.removeEventListener(event, handler, options);
      }
      if (newVal) {
        newVal.addEventListener(event, handler, options);
      }
    });
  }
}

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

// public/codesandbox-runtime/components/checkbox/src/checkbox.js
import { normalizeClass as _normalizeClass2, createElementVNode as _createElementVNode2, renderSlot as _renderSlot2, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, openBlock as _openBlock2, createElementBlock as _createElementBlock2, createCommentVNode as _createCommentVNode2, normalizeStyle as _normalizeStyle2 } from "vue";
import { computed as computed12, ref as ref13, inject as inject7, onMounted as onMounted3, watch as watch4 } from "vue";

// public/codesandbox-runtime/components/checkbox/src/checkbox-meta.js
var checkboxGroupContextKey = Symbol("checkboxGroupContextKey");

// public/codesandbox-runtime/components/checkbox/src/checkbox.js
var _hoisted_1 = ["name", "id", "tabindex", "disabled", "checked"];
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock2(), _createElementBlock2(
    "label",
    {
      class: _normalizeClass2($setup.checkboxClasses),
      style: _normalizeStyle2($setup.themeStyle),
      onMouseenter: _cache[0] || (_cache[0] = ($event) => $setup.hovering = true),
      onMouseleave: _cache[1] || (_cache[1] = ($event) => $setup.hovering = false)
    },
    [
      _createElementVNode2(
        "span",
        {
          class: _normalizeClass2([$setup.ns.e("input"), $setup.ns.is("disabled", $setup.actualDisabled), $setup.ns.is("checked", $setup.isChecked), $setup.ns.is("indeterminate", $setup.props.indeterminate)])
        },
        [
          _createElementVNode2(
            "span",
            {
              class: _normalizeClass2($setup.innerClasses)
            },
            null,
            2
            /* CLASS */
          ),
          _createElementVNode2("input", {
            ref: "inputRef",
            class: _normalizeClass2($setup.ns.e("original")),
            type: "checkbox",
            name: $props.name,
            id: $props.id,
            tabindex: $props.tabindex,
            disabled: $setup.actualDisabled,
            checked: $setup.isChecked,
            onChange: $setup.handleChange,
            onFocus: $setup.handleFocus,
            onBlur: $setup.handleBlur
          }, null, 42, _hoisted_1)
        ],
        2
        /* CLASS */
      ),
      _ctx.$slots.default || $props.label ? (_openBlock2(), _createElementBlock2(
        "span",
        {
          key: 0,
          class: _normalizeClass2($setup.ns.e("label"))
        },
        [
          _renderSlot2(_ctx.$slots, "default", {}, () => [
            _createTextVNode(
              _toDisplayString($props.label),
              1
              /* TEXT */
            )
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode2("v-if", true)
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
var __sfc__2 = /* @__PURE__ */ Object.assign({
  name: "YhCheckbox"
}, {
  __name: "checkbox",
  props: {
    modelValue: { type: [String, Number, Boolean], required: false },
    trueValue: { type: [String, Number, Boolean], required: false, default: true },
    falseValue: { type: [String, Number, Boolean], required: false, default: false },
    value: { type: [String, Number, Boolean], required: false },
    name: { type: String, required: false },
    label: { type: String, required: false },
    size: { type: null, required: false, default: "default" },
    disabled: { type: Boolean, required: false, default: false },
    indeterminate: { type: Boolean, required: false, default: false },
    border: { type: Boolean, required: false, default: false },
    validateEvent: { type: Boolean, required: false, default: true },
    id: { type: String, required: false },
    tabindex: { type: [String, Number], required: false },
    checked: { type: Boolean, required: false },
    themeOverrides: { type: null, required: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("checkbox");
    const checkboxGroup = inject7(checkboxGroupContextKey, void 0);
    const { themeStyle } = useComponentTheme("checkbox", computed12(() => props.themeOverrides || (checkboxGroup == null ? void 0 : checkboxGroup.themeOverrides)));
    const inputRef = ref13();
    const focused = ref13(false);
    const hovering = ref13(false);
    const { globalSize } = useConfig();
    const isGroup = computed12(() => !!checkboxGroup);
    const checkboxSize = computed12(() => {
      return (props.size !== "default" ? props.size : checkboxGroup == null ? void 0 : checkboxGroup.size) || globalSize.value || "default";
    });
    const isDisabled = computed12(() => {
      return props.disabled || (checkboxGroup == null ? void 0 : checkboxGroup.disabled) || false;
    });
    const isLimitDisabled = computed12(() => {
      if (isGroup.value && checkboxGroup) {
        const modelValue = checkboxGroup.modelValue || [];
        const isChecked2 = modelValue.includes(props.value);
        if (checkboxGroup.max !== void 0 && modelValue.length >= checkboxGroup.max && !isChecked2) {
          return true;
        }
        if (checkboxGroup.min !== void 0 && modelValue.length <= checkboxGroup.min && isChecked2) {
          return true;
        }
      }
      return false;
    });
    const actualDisabled = computed12(() => isDisabled.value || isLimitDisabled.value);
    const isChecked = computed12(() => {
      if (isGroup.value && checkboxGroup) {
        return (checkboxGroup.modelValue || []).includes(
          props.value
        );
      }
      return props.modelValue === props.trueValue;
    });
    const checkboxClasses = computed12(() => [
      ns.b(),
      ns.m(checkboxSize.value),
      ns.is("disabled", actualDisabled.value),
      ns.is("checked", isChecked.value),
      ns.is("indeterminate", props.indeterminate),
      ns.is("focused", focused.value),
      ns.is("border", props.border)
    ]);
    const innerClasses = computed12(() => [
      ns.e("inner")
    ]);
    const handleChange = (event) => {
      var _a2;
      if (actualDisabled.value) return;
      const target = event.target;
      if (isGroup.value && checkboxGroup) {
        const currentValue = [...checkboxGroup.modelValue || []];
        const value = props.value;
        if (target.checked) {
          if (!currentValue.includes(value)) {
            currentValue.push(value);
          }
        } else {
          const index = currentValue.indexOf(value);
          if (index > -1) {
            currentValue.splice(index, 1);
          }
        }
        (_a2 = checkboxGroup.changeEvent) == null ? void 0 : _a2.call(checkboxGroup, currentValue);
      } else {
        const newValue = target.checked ? props.trueValue : props.falseValue;
        emit("update:modelValue", newValue);
        emit("change", newValue);
      }
    };
    const handleFocus = () => {
      focused.value = true;
    };
    const handleBlur = () => {
      focused.value = false;
    };
    const focus = () => {
      var _a2;
      (_a2 = inputRef.value) == null ? void 0 : _a2.focus();
    };
    const blur = () => {
      var _a2;
      (_a2 = inputRef.value) == null ? void 0 : _a2.blur();
    };
    watch4(
      () => props.checked,
      (val) => {
        if (val !== void 0 && !isGroup.value) {
          const newValue = val ? props.trueValue : props.falseValue;
          if (props.modelValue !== newValue) {
            emit("update:modelValue", newValue);
          }
        }
      },
      { immediate: true }
    );
    onMounted3(() => {
      if (inputRef.value && props.checked !== void 0 && !isGroup.value) {
        inputRef.value.checked = isChecked.value;
      }
    });
    __expose({
      get ref() {
        return inputRef.value;
      },
      get checked() {
        return isChecked.value;
      },
      focus,
      blur
    });
    const __returned__ = { props, emit, ns, checkboxGroup, themeStyle, inputRef, focused, hovering, globalSize, isGroup, checkboxSize, isDisabled, isLimitDisabled, actualDisabled, isChecked, checkboxClasses, innerClasses, handleChange, handleFocus, handleBlur, focus, blur, computed: computed12, ref: ref13, inject: inject7, onMounted: onMounted3, watch: watch4, get useNamespace() {
      return useNamespace;
    }, get useConfig() {
      return useConfig;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get checkboxGroupContextKey() {
      return checkboxGroupContextKey;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__2.render = render2;
var stdin_default3 = __sfc__2;

// public/codesandbox-runtime/components/checkbox/src/checkbox-group.js
import { renderSlot as _renderSlot3, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock3, createElementBlock as _createElementBlock3, createBlock as _createBlock2, createCommentVNode as _createCommentVNode3, resolveDynamicComponent as _resolveDynamicComponent2, normalizeClass as _normalizeClass3, normalizeStyle as _normalizeStyle3, withCtx as _withCtx2 } from "vue";
import { computed as computed13, provide as provide2, toRefs } from "vue";
function render3(_ctx, _cache, $props, $setup, $data, $options) {
  var _a2, _b, _c;
  return _openBlock3(), _createBlock2(_resolveDynamicComponent2($props.tag), {
    class: _normalizeClass3($setup.groupClasses),
    style: _normalizeStyle3($setup.themeStyle),
    role: "group",
    "aria-labelledby": $setup.labelId,
    "aria-invalid": ((_a2 = $setup.formItem) == null ? void 0 : _a2.validateStatus) === "error",
    "aria-describedby": ((_b = $setup.formItem) == null ? void 0 : _b.validateStatus) === "error" ? (_c = $setup.formItem) == null ? void 0 : _c.errorId : void 0
  }, {
    default: _withCtx2(() => [
      _renderSlot3(_ctx.$slots, "default", {}, () => [
        $props.options && $props.options.length ? (_openBlock3(true), _createElementBlock3(
          _Fragment,
          { key: 0 },
          _renderList($props.options, (item) => {
            return _openBlock3(), _createBlock2($setup["YhCheckbox"], {
              key: String(item.value),
              value: item.value,
              label: item.label,
              disabled: item.disabled
            }, null, 8, ["value", "label", "disabled"]);
          }),
          128
          /* KEYED_FRAGMENT */
        )) : _createCommentVNode3("v-if", true)
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["class", "style", "aria-labelledby", "aria-invalid", "aria-describedby"]);
}
var __sfc__3 = /* @__PURE__ */ Object.assign({
  name: "YhCheckboxGroup"
}, {
  __name: "checkbox-group",
  props: {
    modelValue: { type: Array, required: false, default: () => [] },
    options: { type: Array, required: false },
    size: { type: null, required: false },
    disabled: { type: Boolean, required: false, default: false },
    min: { type: Number, required: false },
    max: { type: Number, required: false },
    validateEvent: { type: Boolean, required: false, default: true },
    textColor: { type: String, required: false },
    fill: { type: String, required: false },
    tag: { type: null, required: false, default: "div" },
    themeOverrides: { type: null, required: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("checkbox-group");
    const { formItem } = useFormItem();
    const { validate } = useFormItem();
    const labelId = useId().value;
    const { globalSize } = useConfig();
    const changeEvent = (value) => {
      emit("update:modelValue", value);
      emit("change", value);
      if (props.validateEvent) {
        validate("change");
      }
    };
    const { themeStyle } = useComponentTheme(
      "checkbox-group",
      computed13(() => props.themeOverrides)
    );
    const { modelValue, size, disabled, min, max } = toRefs(props);
    provide2(checkboxGroupContextKey, {
      get modelValue() {
        return modelValue.value;
      },
      get size() {
        return (size == null ? void 0 : size.value) || globalSize.value || "default";
      },
      get disabled() {
        return disabled.value;
      },
      get min() {
        return min == null ? void 0 : min.value;
      },
      get max() {
        return max == null ? void 0 : max.value;
      },
      get themeOverrides() {
        return props.themeOverrides;
      },
      changeEvent
    });
    const groupClasses = computed13(() => [ns.b()]);
    const __returned__ = { props, emit, ns, formItem, validate, labelId, globalSize, changeEvent, themeStyle, modelValue, size, disabled, min, max, groupClasses, computed: computed13, provide: provide2, toRefs, get useNamespace() {
      return useNamespace;
    }, get useFormItem() {
      return useFormItem;
    }, get useId() {
      return useId;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get useConfig() {
      return useConfig;
    }, YhCheckbox: stdin_default3, get checkboxGroupContextKey() {
      return checkboxGroupContextKey;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__3.render = render3;
var stdin_default4 = __sfc__3;

// public/codesandbox-runtime/components/checkbox/index.js
var YhCheckbox = withInstall(stdin_default3);
var YhCheckboxGroup = withInstall(stdin_default4);

// public/codesandbox-runtime/components/icon/src/icon.js
import { createCommentVNode as _createCommentVNode4, resolveDynamicComponent as _resolveDynamicComponent3, openBlock as _openBlock4, createBlock as _createBlock3, createElementBlock as _createElementBlock4, Fragment as _Fragment2, renderSlot as _renderSlot4, mergeProps as _mergeProps } from "vue";
import { computed as computed14, useSlots as useSlots2 } from "vue";

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
var _hoisted_12 = ["viewBox", "innerHTML"];
function render4(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock4(), _createElementBlock4(
    "i",
    _mergeProps({
      class: $setup.iconClass,
      style: $setup.iconStyle
    }, _ctx.$attrs),
    [
      _createCommentVNode4(" \u4F7F\u7528\u4F20\u5165\u7684\u56FE\u6807\u7EC4\u4EF6 "),
      $setup.useIconComponent ? (_openBlock4(), _createBlock3(_resolveDynamicComponent3(_ctx.icon), {
        key: 0,
        class: "yh-icon__inner"
      })) : $setup.svgContent && !$setup.hasSlot ? (_openBlock4(), _createElementBlock4(
        _Fragment2,
        { key: 1 },
        [
          _createCommentVNode4(" \u4F7F\u7528 SVG \u5B57\u7B26\u4E32\u6E32\u67D3 "),
          _createCommentVNode4(" eslint-disable vue/no-v-html "),
          (_openBlock4(), _createElementBlock4("svg", {
            class: "yh-icon__svg",
            viewBox: $setup.viewBox,
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": "true",
            innerHTML: $setup.svgContent
          }, null, 8, _hoisted_12))
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      )) : $setup.hasSlot ? (_openBlock4(), _createElementBlock4(
        _Fragment2,
        { key: 2 },
        [
          _createCommentVNode4(" eslint-enable vue/no-v-html "),
          _createCommentVNode4(" \u4F7F\u7528\u63D2\u69FD\u81EA\u5B9A\u4E49\u5185\u5BB9 "),
          _renderSlot4(_ctx.$slots, "default")
        ],
        64
        /* STABLE_FRAGMENT */
      )) : _createCommentVNode4("v-if", true)
    ],
    16
    /* FULL_PROPS */
  );
}
var __sfc__4 = /* @__PURE__ */ Object.assign({
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
      computed14(() => props.themeOverrides)
    );
    const iconStyle = computed14(() => {
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
    const iconClass = computed14(() => [
      ns.b(),
      {
        [ns.m("spin")]: props.spin
      }
    ]);
    const svgContent = computed14(() => {
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
    const viewBox = computed14(() => {
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
    const hasSlot = computed14(() => !!slots.default);
    const useIconComponent = computed14(() => {
      return props.icon && !("__svg" in props.icon);
    });
    const __returned__ = { props, slots, ns, themeStyle, iconStyle, iconClass, svgContent, viewBox, hasSlot, useIconComponent, computed: computed14, useSlots: useSlots2, get iconProps() {
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
__sfc__4.render = render4;
var stdin_default5 = __sfc__4;

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
var YhIcon = withInstall(stdin_default5);

// public/codesandbox-runtime/components/tooltip/src/tooltip.js
import { renderSlot as _renderSlot5, createCommentVNode as _createCommentVNode5, openBlock as _openBlock5, createElementBlock as _createElementBlock5, toDisplayString as _toDisplayString2, normalizeClass as _normalizeClass4, normalizeStyle as _normalizeStyle4, createElementVNode as _createElementVNode3, vShow as _vShow, withDirectives as _withDirectives, Transition as _Transition, withCtx as _withCtx3, createVNode as _createVNode, Teleport as _Teleport, createBlock as _createBlock4 } from "vue";
import { ref as ref14, computed as computed15, watch as watch5, onMounted as onMounted4, onUnmounted as onUnmounted4, nextTick } from "vue";
import { computePosition, offset, flip, shift, arrow, autoUpdate } from "@floating-ui/dom";

// public/codesandbox-runtime/components/tooltip/src/tooltip-meta.js
var tooltipProps = {
  /** 显示内容 */
  content: {
    type: String,
    default: ""
  },
  /** 出现位置 */
  placement: {
    type: String,
    default: "top"
  },
  /** 触发方式 */
  trigger: {
    type: [String, Array],
    default: "hover"
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
    default: "dark"
  },
  /** 是否跟随鼠标移动 (高级功能) */
  followCursor: {
    type: Boolean,
    default: false
  },
  /** 弹出层的自定义类名 */
  popperClass: {
    type: String,
    default: ""
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
    default: "yh-tooltip-fade"
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
    default: "auto"
  },
  /** 弹出层最大高度 */
  maxHeight: {
    type: [String, Number],
    default: "none"
  },
  /** 内容是否可滚动 */
  scrollable: {
    type: Boolean,
    default: false
  },
  /** 弹出内容自定义类名 */
  contentClass: {
    type: String,
    default: ""
  },
  /** 弹出内容自定义样式 */
  contentStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 箭头自定义类名 */
  arrowClass: {
    type: String,
    default: ""
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
    default: ""
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
};
var tooltipEmits = {
  "update:visible": (visible) => typeof visible === "boolean",
  show: () => true,
  hide: () => true
};

// public/codesandbox-runtime/components/tooltip/src/tooltip.js
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
var _hoisted_13 = ["id", "data-placement"];
var _hoisted_2 = ["innerHTML"];
var _hoisted_3 = { key: 1 };
function render5(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock5(), _createElementBlock5(
    "div",
    {
      class: _normalizeClass4($setup.ns.b()),
      ref: "triggerRef",
      onMouseenter: _cache[2] || (_cache[2] = ($event) => $setup.handleTrigger($event, "hover")),
      onMouseleave: _cache[3] || (_cache[3] = ($event) => $setup.triggers.has("hover") && $setup.toggleVisible(false)),
      onClick: _cache[4] || (_cache[4] = ($event) => $setup.handleTrigger($event, "click")),
      onContextmenu: _cache[5] || (_cache[5] = ($event) => $setup.handleTrigger($event, "contextmenu")),
      onFocusin: _cache[6] || (_cache[6] = ($event) => $setup.handleTrigger($event, "focus")),
      onFocusout: _cache[7] || (_cache[7] = ($event) => $setup.triggers.has("focus") && $setup.toggleVisible(false))
    },
    [
      _renderSlot5(_ctx.$slots, "default"),
      (_openBlock5(), _createBlock4(_Teleport, {
        to: "body",
        disabled: !_ctx.teleported
      }, [
        _createVNode(_Transition, { name: _ctx.transition }, {
          default: _withCtx3(() => [
            $setup.shouldRender ? _withDirectives((_openBlock5(), _createElementBlock5("div", {
              key: 0,
              id: $setup.tooltipId,
              ref: "popperRef",
              class: _normalizeClass4($setup.popperClasses),
              style: _normalizeStyle4($setup.computedPopperStyle),
              "data-placement": $setup.actualPlacement,
              onMouseenter: _cache[0] || (_cache[0] = ($event) => _ctx.interactive && $setup.toggleVisible(true)),
              onMouseleave: _cache[1] || (_cache[1] = ($event) => _ctx.interactive && $setup.triggers.has("hover") && $setup.toggleVisible(false))
            }, [
              _createElementVNode3(
                "div",
                {
                  class: _normalizeClass4([$setup.ns.e("content"), $setup.props.contentClass]),
                  style: _normalizeStyle4($setup.computedContentStyle)
                },
                [
                  _renderSlot5(_ctx.$slots, "content", {}, () => [
                    _createCommentVNode5(" eslint-disable-next-line vue/no-v-html "),
                    _ctx.rawContent ? (_openBlock5(), _createElementBlock5("span", {
                      key: 0,
                      innerHTML: _ctx.content
                    }, null, 8, _hoisted_2)) : (_openBlock5(), _createElementBlock5(
                      "span",
                      _hoisted_3,
                      _toDisplayString2(_ctx.content),
                      1
                      /* TEXT */
                    ))
                  ])
                ],
                6
                /* CLASS, STYLE */
              ),
              _createCommentVNode5(" \u5C0F\u4E09\u89D2 - \u4F7F\u7528 Floating UI \u5B98\u65B9\u63A8\u8350\u7684 SVG \u8DEF\u5F84\u65B9\u6848 "),
              _ctx.showArrow ? (_openBlock5(), _createElementBlock5(
                "div",
                {
                  key: 0,
                  ref: "arrowRef",
                  class: _normalizeClass4($setup.ns.e("arrow-wrapper")),
                  style: _normalizeStyle4($setup.arrowStyle)
                },
                [
                  (_openBlock5(), _createElementBlock5(
                    "svg",
                    {
                      class: _normalizeClass4($setup.ns.e("arrow")),
                      width: "12",
                      height: "12",
                      viewBox: "0 0 12 12",
                      xmlns: "http://www.w3.org/2000/svg"
                    },
                    [..._cache[8] || (_cache[8] = [
                      _createElementVNode3(
                        "path",
                        { d: "M0,0 L6,6 L12,0" },
                        null,
                        -1
                        /* CACHED */
                      )
                    ])],
                    2
                    /* CLASS */
                  ))
                ],
                6
                /* CLASS, STYLE */
              )) : _createCommentVNode5("v-if", true)
            ], 46, _hoisted_13)), [
              [_vShow, $setup.showPopper]
            ]) : _createCommentVNode5("v-if", true)
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["name"])
      ], 8, ["disabled"]))
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
var __sfc__5 = /* @__PURE__ */ Object.assign({
  name: "YhTooltip"
}, {
  __name: "tooltip",
  props: tooltipProps,
  emits: tooltipEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("tooltip");
    const tooltipId = useId();
    const { themeStyle } = useComponentTheme(
      "tooltip",
      computed15(() => props.themeOverrides)
    );
    const triggerRef = ref14(null);
    const popperRef = ref14(null);
    const arrowRef = ref14(null);
    const visible = ref14(false);
    const popperStyle = ref14({});
    const arrowStyle = ref14({});
    const computedPopperStyle = computed15(() => {
      const styles = __spreadValues4(__spreadValues4({}, themeStyle.value), popperStyle.value);
      if (typeof props.popperStyle === "object") {
        Object.assign(styles, props.popperStyle);
      }
      return styles;
    });
    const computedContentStyle = computed15(() => {
      const styles = {
        width: typeof props.width === "number" ? `${props.width}px` : props.width,
        maxHeight: typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight,
        overflowY: props.scrollable ? "auto" : "visible"
      };
      if (typeof props.contentStyle === "object") {
        Object.assign(styles, props.contentStyle);
      }
      return styles;
    });
    const actualPlacement = ref14(props.placement);
    let cleanup = null;
    let showTimer = null;
    let hideTimer = null;
    const showPopper = computed15(() => {
      if (props.disabled) return false;
      return props.visible !== null ? props.visible : visible.value;
    });
    const shouldRender = computed15(() => props.persistent || showPopper.value);
    const popperClasses = computed15(() => [
      ns.e("popper"),
      ns.is(props.effect, true),
      // 使用 is-dark / is-light 更加稳定
      ns.em("popper", props.effect),
      ns.is("interactive", props.interactive),
      props.popperClass
    ]);
    const updatePosition = async () => {
      if (!triggerRef.value || !popperRef.value || typeof window === "undefined") return;
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
      );
      popperStyle.value = {
        left: `${x}px`,
        top: `${y}px`,
        zIndex: String(props.zIndex)
      };
      actualPlacement.value = placement;
      if (middlewareData.arrow && arrowRef.value) {
        const { x: ax, y: ay } = middlewareData.arrow;
        const side = placement.split("-")[0];
        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[side];
        arrowStyle.value = {
          left: ax != null ? `${ax}px` : "",
          top: ay != null ? `${ay}px` : "",
          [staticSide]: "-12px"
        };
      }
    };
    const handleMouseMove = async (e) => {
      if (!props.followCursor || !visible.value || typeof window === "undefined") return;
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
          };
          return rect;
        }
      };
      const { x, y } = await computePosition(virtualElement, popperRef.value, {
        placement: props.placement,
        middleware: [offset(10), flip(), shift()]
      });
      popperStyle.value = {
        left: `${x}px`,
        top: `${y}px`,
        zIndex: String(props.zIndex)
      };
    };
    const toggleVisible = (value) => {
      if (props.disabled) return;
      if (showTimer) {
        clearTimeout(showTimer);
        showTimer = null;
      }
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      if (value) {
        const delay = props.showAfter;
        if (delay <= 0) {
          visible.value = true;
          emit("update:visible", true);
          emit("show");
          nextTick(startAutoUpdate);
        } else {
          showTimer = setTimeout(() => {
            visible.value = true;
            emit("update:visible", true);
            emit("show");
            nextTick(startAutoUpdate);
          }, delay);
        }
      } else {
        const delay = props.hideAfter;
        if (delay <= 0) {
          visible.value = false;
          emit("update:visible", false);
          emit("hide");
          stopAutoUpdate();
        } else {
          hideTimer = setTimeout(() => {
            visible.value = false;
            emit("update:visible", false);
            emit("hide");
            stopAutoUpdate();
          }, delay);
        }
      }
    };
    const startAutoUpdate = async () => {
      if (cleanup) cleanup();
      if (triggerRef.value && popperRef.value && !props.followCursor && typeof window !== "undefined") {
        cleanup = autoUpdate(triggerRef.value, popperRef.value, updatePosition);
      }
    };
    const stopAutoUpdate = () => {
      if (cleanup) {
        cleanup();
        cleanup = null;
      }
    };
    const triggers = computed15(() => {
      const t = Array.isArray(props.trigger) ? props.trigger : [props.trigger];
      return new Set(t);
    });
    const handleTrigger = (e, type) => {
      if (!triggers.value.has(type)) return;
      if (type === "hover") {
        toggleVisible(true);
      } else if (type === "click") {
        const isShowing = visible.value && !hideTimer || showTimer;
        toggleVisible(!isShowing);
      } else if (type === "contextmenu") {
        e.preventDefault();
        toggleVisible(true);
      } else if (type === "focus") {
        toggleVisible(true);
      }
    };
    useEventListener(
      () => window,
      "click",
      (e) => {
        var _a2, _b;
        const me = e;
        if (!visible.value) return;
        const needsClose = triggers.value.has("click") || triggers.value.has("contextmenu");
        if (!needsClose) return;
        const target = me.target;
        if (!((_a2 = triggerRef.value) == null ? void 0 : _a2.contains(target)) && !((_b = popperRef.value) == null ? void 0 : _b.contains(target))) {
          toggleVisible(false);
        }
      }
    );
    watch5(
      () => props.visible,
      (val) => {
        if (val !== null && val !== visible.value) {
          visible.value = val;
          if (val) nextTick(startAutoUpdate);
          else stopAutoUpdate();
        }
      },
      { immediate: true }
    );
    watch5(
      () => props.followCursor,
      (val) => {
        if (typeof window === "undefined") return;
        if (val) {
          window.addEventListener("mousemove", handleMouseMove);
        } else {
          window.removeEventListener("mousemove", handleMouseMove);
        }
      }
    );
    onMounted4(() => {
      if (props.followCursor && typeof window !== "undefined") {
        window.addEventListener("mousemove", handleMouseMove);
      }
    });
    onUnmounted4(() => {
      stopAutoUpdate();
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    });
    __expose({
      updatePosition,
      visible,
      triggerRef,
      popperRef
    });
    const __returned__ = { props, emit, ns, tooltipId, themeStyle, triggerRef, popperRef, arrowRef, visible, popperStyle, arrowStyle, computedPopperStyle, computedContentStyle, actualPlacement, get cleanup() {
      return cleanup;
    }, set cleanup(v) {
      cleanup = v;
    }, get showTimer() {
      return showTimer;
    }, set showTimer(v) {
      showTimer = v;
    }, get hideTimer() {
      return hideTimer;
    }, set hideTimer(v) {
      hideTimer = v;
    }, showPopper, shouldRender, popperClasses, updatePosition, handleMouseMove, toggleVisible, startAutoUpdate, stopAutoUpdate, triggers, handleTrigger, ref: ref14, computed: computed15, watch: watch5, onMounted: onMounted4, onUnmounted: onUnmounted4, nextTick, get computePosition() {
      return computePosition;
    }, get offset() {
      return offset;
    }, get flip() {
      return flip;
    }, get shift() {
      return shift;
    }, get arrow() {
      return arrow;
    }, get autoUpdate() {
      return autoUpdate;
    }, get useNamespace() {
      return useNamespace;
    }, get useId() {
      return useId;
    }, get useEventListener() {
      return useEventListener;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get tooltipProps() {
      return tooltipProps;
    }, get tooltipEmits() {
      return tooltipEmits;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__5.render = render5;
var stdin_default6 = __sfc__5;

// public/codesandbox-runtime/components/tooltip/index.js
var YhTooltip = withInstall(stdin_default6);

// public/codesandbox-runtime/components/popconfirm/src/popconfirm-meta.js
var popconfirmProps = {
  /** 标题 */
  title: {
    type: String,
    default: ""
  },
  /** 描述内容 */
  description: {
    type: String,
    default: ""
  },
  confirmButtonText: {
    type: String,
    default: ""
  },
  cancelButtonText: {
    type: String,
    default: ""
  },
  /** 确认按钮类型 */
  confirmButtonType: {
    type: String,
    default: "primary"
  },
  /** 取消按钮类型 */
  cancelButtonType: {
    type: String,
    default: "default"
  },
  /** 图标 */
  icon: {
    type: String,
    default: "warning"
  },
  /** 图标颜色 */
  iconColor: {
    type: String,
    default: "#faad14"
  },
  /** 是否隐藏图标 */
  hideIcon: {
    type: Boolean,
    default: false
  },
  /** 是否隐藏取消按钮 */
  hideCancel: {
    type: Boolean,
    default: false
  },
  /** 偏移量 [skidding, distance] */
  offset: {
    type: Array,
    default: () => [0, 12]
  },
  /** 出现位置 */
  placement: {
    type: String,
    default: "top"
  },
  /** 手动控制可见性 */
  visible: {
    type: Boolean,
    default: null
  },
  /** 宽度 */
  width: {
    type: [String, Number],
    default: 180
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** z-index */
  zIndex: {
    type: Number,
    default: 2e3
  },
  /** 是否显示小三角 */
  showArrow: {
    type: Boolean,
    default: true
  },
  /** 弹出层的自定义类名 */
  popperClass: {
    type: String,
    default: ""
  },
  /** 弹出层自定义样式 */
  popperStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 挂载节点 */
  teleported: {
    type: Boolean,
    default: true
  },
  /** 是否显示“不再提示”勾选框 (高级自创功能) */
  showDontAskAgain: {
    type: Boolean,
    default: false
  },
  dontAskAgainText: {
    type: String,
    default: ""
  },
  /** 是否反置确认和取消按钮位置 (高级自创功能) */
  swapButtons: {
    type: Boolean,
    default: false
  },
  /** 确认前执行的异步逻辑 */
  beforeConfirm: {
    type: Function,
    default: null
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
var popconfirmEmits = {
  confirm: (_dontAskAgain) => true,
  cancel: () => true,
  "update:visible": (visible) => typeof visible === "boolean"
};

// public/codesandbox-runtime/components/popconfirm/src/popconfirm.js
function render6(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock6(), _createBlock5($setup["YhTooltip"], {
    visible: $setup.visible,
    "onUpdate:visible": _cache[2] || (_cache[2] = ($event) => $setup.visible = $event),
    class: _normalizeClass5($setup.ns.b()),
    trigger: "click",
    placement: _ctx.placement,
    disabled: _ctx.disabled,
    teleported: _ctx.teleported,
    offset: _ctx.offset,
    "z-index": _ctx.zIndex,
    "show-arrow": _ctx.showArrow,
    "show-after": 0,
    "hide-after": 0,
    "popper-class": `${$setup.ns.e("popper")} ${_ctx.popperClass}`,
    "popper-style": _ctx.popperStyle,
    persistent: "",
    interactive: ""
  }, {
    content: _withCtx4(() => [
      _createElementVNode4(
        "div",
        {
          class: _normalizeClass5($setup.ns.e("content")),
          style: _normalizeStyle5([{
            width: typeof _ctx.width === "number" ? `${_ctx.width}px` : _ctx.width
          }, $setup.themeStyle])
        },
        [
          _createElementVNode4(
            "div",
            {
              class: _normalizeClass5($setup.ns.e("main"))
            },
            [
              !_ctx.hideIcon ? (_openBlock6(), _createElementBlock6(
                "div",
                {
                  key: 0,
                  class: _normalizeClass5($setup.ns.e("icon")),
                  style: _normalizeStyle5({
                    color: _ctx.iconColor
                  })
                },
                [
                  _renderSlot6(_ctx.$slots, "icon", {}, () => [
                    _createCommentVNode6(" \u652F\u6301\u65E7\u7248\u56FE\u6807\u540D\u79F0 "),
                    _createVNode2($setup["YhIcon"], { name: _ctx.icon }, null, 8, ["name"])
                  ])
                ],
                6
                /* CLASS, STYLE */
              )) : _createCommentVNode6("v-if", true),
              _createElementVNode4(
                "div",
                {
                  class: _normalizeClass5($setup.ns.e("inner"))
                },
                [
                  _createElementVNode4(
                    "div",
                    {
                      class: _normalizeClass5($setup.ns.e("title"))
                    },
                    [
                      _renderSlot6(_ctx.$slots, "title", {}, () => [
                        _createTextVNode2(
                          _toDisplayString3(_ctx.title),
                          1
                          /* TEXT */
                        )
                      ])
                    ],
                    2
                    /* CLASS */
                  ),
                  _ctx.description || _ctx.$slots.description ? (_openBlock6(), _createElementBlock6(
                    "div",
                    {
                      key: 0,
                      class: _normalizeClass5($setup.ns.e("description"))
                    },
                    [
                      _renderSlot6(_ctx.$slots, "description", {}, () => [
                        _createTextVNode2(
                          _toDisplayString3(_ctx.description),
                          1
                          /* TEXT */
                        )
                      ])
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
          ),
          _createCommentVNode6(" YH-UI \u81EA\u521B\u9AD8\u7EA7\u529F\u80FD\uFF1A\u4E0D\u518D\u63D0\u793A "),
          _ctx.showDontAskAgain ? (_openBlock6(), _createElementBlock6(
            "div",
            {
              key: 0,
              class: _normalizeClass5($setup.ns.e("extra"))
            },
            [
              _createVNode2($setup["YhCheckbox"], {
                modelValue: $setup.dontAskAgainChecked,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.dontAskAgainChecked = $event)
              }, {
                default: _withCtx4(() => [
                  _createTextVNode2(
                    _toDisplayString3(_ctx.dontAskAgainText || $setup.t("popconfirm.dontAskAgain")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue"])
            ],
            2
            /* CLASS */
          )) : _createCommentVNode6("v-if", true),
          _createElementVNode4(
            "div",
            {
              class: _normalizeClass5($setup.ns.e("footer")),
              onClick: _cache[1] || (_cache[1] = _withModifiers(() => {
              }, ["stop"]))
            },
            [
              _createCommentVNode6(" \u81EA\u521B\u9AD8\u7EA7\u529F\u80FD\uFF1A\u4EA4\u6362\u6309\u94AE\u4F4D\u7F6E "),
              _ctx.swapButtons ? (_openBlock6(), _createElementBlock6(
                _Fragment3,
                { key: 0 },
                [
                  _createVNode2($setup["YhButton"], {
                    size: "small",
                    type: _ctx.confirmButtonType,
                    loading: $setup.confirmLoading,
                    onClick: _withModifiers($setup.handleConfirm, ["stop"])
                  }, {
                    default: _withCtx4(() => [
                      _createTextVNode2(
                        _toDisplayString3(_ctx.confirmButtonText || $setup.t("popconfirm.confirm")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["type", "loading"]),
                  !_ctx.hideCancel ? (_openBlock6(), _createBlock5($setup["YhButton"], {
                    key: 0,
                    size: "small",
                    type: _ctx.cancelButtonType,
                    disabled: $setup.confirmLoading,
                    onClick: _withModifiers($setup.handleCancel, ["stop"])
                  }, {
                    default: _withCtx4(() => [
                      _createTextVNode2(
                        _toDisplayString3(_ctx.cancelButtonText || $setup.t("popconfirm.cancel")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["type", "disabled"])) : _createCommentVNode6("v-if", true)
                ],
                64
                /* STABLE_FRAGMENT */
              )) : (_openBlock6(), _createElementBlock6(
                _Fragment3,
                { key: 1 },
                [
                  !_ctx.hideCancel ? (_openBlock6(), _createBlock5($setup["YhButton"], {
                    key: 0,
                    size: "small",
                    type: _ctx.cancelButtonType,
                    disabled: $setup.confirmLoading,
                    onClick: _withModifiers($setup.handleCancel, ["stop"])
                  }, {
                    default: _withCtx4(() => [
                      _createTextVNode2(
                        _toDisplayString3(_ctx.cancelButtonText || $setup.t("popconfirm.cancel")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["type", "disabled"])) : _createCommentVNode6("v-if", true),
                  _createVNode2($setup["YhButton"], {
                    size: "small",
                    type: _ctx.confirmButtonType,
                    loading: $setup.confirmLoading,
                    onClick: _withModifiers($setup.handleConfirm, ["stop"])
                  }, {
                    default: _withCtx4(() => [
                      _createTextVNode2(
                        _toDisplayString3(_ctx.confirmButtonText || $setup.t("popconfirm.confirm")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["type", "loading"])
                ],
                64
                /* STABLE_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          )
        ],
        6
        /* CLASS, STYLE */
      )
    ]),
    default: _withCtx4(() => [
      _renderSlot6(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["visible", "class", "placement", "disabled", "teleported", "offset", "z-index", "show-arrow", "popper-class", "popper-style"]);
}
var __sfc__6 = /* @__PURE__ */ Object.assign({
  name: "YhPopconfirm"
}, {
  __name: "popconfirm",
  props: popconfirmProps,
  emits: popconfirmEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("popconfirm");
    const { themeStyle } = useComponentTheme(
      "popconfirm",
      computed16(() => props.themeOverrides)
    );
    const { t } = useLocale();
    const internalVisible = ref15(false);
    const visible = computed16({
      get: () => props.visible !== null ? props.visible : internalVisible.value,
      set: (val) => {
        internalVisible.value = val;
        emit("update:visible", val);
      }
    });
    const confirmLoading = ref15(false);
    const dontAskAgainChecked = ref15(false);
    const handleConfirm = async () => {
      if (confirmLoading.value) return;
      if (props.beforeConfirm) {
        confirmLoading.value = true;
        try {
          const result = await props.beforeConfirm();
          if (result !== false) {
            visible.value = false;
            emit("confirm", dontAskAgainChecked.value);
          }
        } catch (e) {
        } finally {
          confirmLoading.value = false;
        }
      } else {
        visible.value = false;
        emit("confirm", dontAskAgainChecked.value);
      }
    };
    const handleCancel = () => {
      if (confirmLoading.value) return;
      visible.value = false;
      emit("cancel");
    };
    __expose({
      visible,
      toggle: (val) => visible.value = val
    });
    const __returned__ = { props, emit, ns, themeStyle, t, internalVisible, visible, confirmLoading, dontAskAgainChecked, handleConfirm, handleCancel, ref: ref15, computed: computed16, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get YhButton() {
      return YhButton;
    }, get YhCheckbox() {
      return YhCheckbox;
    }, get YhIcon() {
      return YhIcon;
    }, get YhTooltip() {
      return YhTooltip;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get popconfirmProps() {
      return popconfirmProps;
    }, get popconfirmEmits() {
      return popconfirmEmits;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__6.render = render6;
var stdin_default7 = __sfc__6;
export {
  stdin_default7 as default
};
