// public/codesandbox-runtime/components/date-picker/src/date-picker.js
import { createCommentVNode as _createCommentVNode2, renderSlot as _renderSlot2, resolveDynamicComponent as _resolveDynamicComponent, openBlock as _openBlock5, createBlock as _createBlock, createElementVNode as _createElementVNode5, createElementBlock as _createElementBlock5, normalizeClass as _normalizeClass5, toDisplayString as _toDisplayString5, withModifiers as _withModifiers, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, withCtx as _withCtx, renderList as _renderList5, Fragment as _Fragment5, normalizeStyle as _normalizeStyle, Transition as _Transition, createVNode as _createVNode } from "vue";
import { ref as ref12, computed as computed15, watch as watch4, onMounted as onMounted3, onBeforeUnmount as onBeforeUnmount2 } from "vue";

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

// public/codesandbox-runtime/components/date-picker/src/date-table.js
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, renderSlot as _renderSlot, normalizeClass as _normalizeClass, createCommentVNode as _createCommentVNode } from "vue";
import { computed as computed11 } from "vue";

// public/codesandbox-runtime/components/dayjs.js
import dayjs2 from "dayjs";
var stdin_default2 = dayjs2;

// public/codesandbox-runtime/components/date-picker/src/panel-utils.js
import isBetweenPluginModule from "dayjs/plugin/isBetween.js";
import weekOfYearPluginModule from "dayjs/plugin/weekOfYear.js";
import isoWeekPluginModule from "dayjs/plugin/isoWeek.js";
import quarterOfYearPluginModule from "dayjs/plugin/quarterOfYear.js";
import advancedFormatPluginModule from "dayjs/plugin/advancedFormat.js";
import customParseFormatPluginModule from "dayjs/plugin/customParseFormat.js";
stdin_default2.extend(isBetweenPluginModule);
stdin_default2.extend(weekOfYearPluginModule);
stdin_default2.extend(isoWeekPluginModule);
stdin_default2.extend(quarterOfYearPluginModule);
stdin_default2.extend(advancedFormatPluginModule);
stdin_default2.extend(customParseFormatPluginModule);
var DEFAULT_FORMATS = {
  date: "YYYY-MM-DD",
  datetime: "YYYY-MM-DD HH:mm:ss",
  month: "YYYY-MM",
  year: "YYYY",
  week: "gggg [\u7B2C] ww [\u5468]",
  quarter: "YYYY-[Q]Q",
  daterange: "YYYY-MM-DD",
  datetimerange: "YYYY-MM-DD HH:mm:ss",
  monthrange: "YYYY-MM",
  yearrange: "YYYY",
  quarterrange: "YYYY-[Q]Q"
};
var generateCalendar = (date, firstDayOfWeek = 7, disabledDate) => {
  const startOfMonth = stdin_default2(date).startOf("month");
  const endOfMonth = stdin_default2(date).endOf("month");
  const startDay = startOfMonth.day();
  const offset = (startDay - firstDayOfWeek % 7 + 7) % 7;
  const startDate = startOfMonth.subtract(offset, "day");
  const rows = [];
  let current = startDate;
  const today = stdin_default2().startOf("day");
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      const isPrevMonth = current.isBefore(startOfMonth, "day");
      const isNextMonth = current.isAfter(endOfMonth, "day");
      const dateObj = current.toDate();
      let type = "current-month";
      if (isPrevMonth) type = "prev-month";
      if (isNextMonth) type = "next-month";
      row.push({
        date: dateObj,
        dayjs: current,
        type,
        text: current.date(),
        disabled: disabledDate ? disabledDate(dateObj) : false,
        isToday: current.isSame(today, "day")
      });
      current = current.add(1, "day");
    }
    rows.push(row);
  }
  return rows;
};
var formatDate = (date, format) => {
  if (!date) return "";
  return stdin_default2(date).format(format);
};

// public/codesandbox-runtime/components/date-picker/src/date-table.js
var _hoisted_1 = ["onClick", "onMouseenter"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "table",
    {
      class: _normalizeClass([$setup.ns.e("table"), $setup.ns.is("week-mode", $props.selectionMode === "week")]),
      onMouseleave: _cache[0] || (_cache[0] = ($event) => $setup.emit("hover", null))
    },
    [
      _createElementVNode("thead", null, [
        _createElementVNode("tr", null, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList($setup.weekDays, (day) => {
              return _openBlock(), _createElementBlock(
                "th",
                { key: day },
                _toDisplayString(day),
                1
                /* TEXT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      _createElementVNode("tbody", null, [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList($setup.rows, (row, i) => {
            return _openBlock(), _createElementBlock(
              "tr",
              {
                key: i,
                class: _normalizeClass($setup.ns.e("table-row"))
              },
              [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(row, (cell, j) => {
                    return _openBlock(), _createElementBlock("td", {
                      key: j,
                      class: _normalizeClass($setup.getCellClasses(cell)),
                      onClick: ($event) => $setup.handleClick(cell),
                      onMouseenter: ($event) => $setup.handleMouseEnter(cell)
                    }, [
                      _createElementVNode(
                        "div",
                        {
                          class: _normalizeClass($setup.ns.e("cell-content"))
                        },
                        [
                          _renderSlot(_ctx.$slots, "date-cell", { cell }, () => {
                            var _a2, _b;
                            return [
                              _createElementVNode(
                                "span",
                                {
                                  class: _normalizeClass($setup.ns.e("cell-date"))
                                },
                                _toDisplayString(cell.text),
                                3
                                /* TEXT, CLASS */
                              ),
                              $setup.getCellExtra(cell.date) ? (_openBlock(), _createElementBlock(
                                "span",
                                {
                                  key: 0,
                                  class: _normalizeClass([$setup.ns.e("cell-extra"), (_a2 = $setup.getCellExtra(cell.date)) == null ? void 0 : _a2.className])
                                },
                                _toDisplayString((_b = $setup.getCellExtra(cell.date)) == null ? void 0 : _b.text),
                                3
                                /* TEXT, CLASS */
                              )) : _createCommentVNode("v-if", true)
                            ];
                          })
                        ],
                        2
                        /* CLASS */
                      )
                    ], 42, _hoisted_1);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              2
              /* CLASS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
var __sfc__ = {
  __name: "date-table",
  props: {
    date: { type: Date, required: true },
    selectedDate: { type: [Date, Array, null], required: false },
    selectionMode: { type: String, required: false },
    rangeState: { type: Object, required: false },
    disabledDate: { type: Function, required: false },
    firstDayOfWeek: { type: Number, required: false },
    cellShape: { type: String, required: false },
    cellRender: { type: Function, required: false }
  },
  emits: ["select", "hover"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("date-picker");
    const { t } = useLocale();
    const getCellExtra = (date) => {
      if (!props.cellRender) return null;
      const res = props.cellRender(date);
      return typeof res === "string" ? { text: res } : res;
    };
    const rows = computed11(() => {
      return generateCalendar(props.date, props.firstDayOfWeek, props.disabledDate);
    });
    const weekDays = computed11(() => {
      const days = [
        t("datepicker.weeks.sun"),
        t("datepicker.weeks.mon"),
        t("datepicker.weeks.tue"),
        t("datepicker.weeks.wed"),
        t("datepicker.weeks.thu"),
        t("datepicker.weeks.fri"),
        t("datepicker.weeks.sat")
      ];
      const start = props.firstDayOfWeek ? props.firstDayOfWeek % 7 : 0;
      const result = [];
      for (let i = 0; i < 7; i++) {
        result.push(days[(start + i) % 7]);
      }
      return result;
    });
    const getCellClasses = (cell) => {
      const classes = [ns.e("cell"), ns.is(cell.type), ns.is(props.cellShape || "round")];
      if (cell.isToday) classes.push("is-today");
      if (cell.disabled) classes.push("is-disabled");
      const cellDay = cell.dayjs.startOf("day");
      if (props.selectedDate && !Array.isArray(props.selectedDate)) {
        const selectedDay = stdin_default2(props.selectedDate).startOf("day");
        if (props.selectionMode === "week") {
          if (cell.dayjs.isSame(selectedDay, "week")) {
            classes.push("is-selected");
            if (cell.dayjs.day() === (props.firstDayOfWeek || 7) % 7) classes.push("is-week-start");
            if (cell.dayjs.day() === ((props.firstDayOfWeek || 7) + 6) % 7) classes.push("is-week-end");
          }
        } else {
          if (cellDay.isSame(selectedDay)) {
            classes.push("is-selected");
          }
        }
      }
      if (props.rangeState) {
        const { from, to, hovering } = props.rangeState;
        const start = from ? stdin_default2(from).startOf("day") : null;
        const end = to ? stdin_default2(to).startOf("day") : null;
        const hover = hovering ? stdin_default2(hovering).startOf("day") : null;
        if (start && cellDay.isSame(start)) classes.push("is-range-start", "is-selected");
        if (end && cellDay.isSame(end)) classes.push("is-range-end", "is-selected");
        if (start && !end && hover) {
          const min = start.isBefore(hover) ? start : hover;
          const max = start.isBefore(hover) ? hover : start;
          if (cellDay.isAfter(min) && cellDay.isBefore(max)) {
            classes.push("is-in-range");
          }
          if (cellDay.isSame(hover) && !cellDay.isSame(start)) {
            classes.push("is-range-end", "is-selected", "is-hover-end");
          }
        } else if (start && end) {
          const min = start.isBefore(end) ? start : end;
          const max = start.isBefore(end) ? end : start;
          if (cellDay.isAfter(min) && cellDay.isBefore(max)) {
            classes.push("is-in-range");
          }
        }
      }
      return classes;
    };
    const handleClick = (cell) => {
      if (cell.disabled) return;
      if (props.selectionMode === "week") {
        const firstDay = cell.dayjs.startOf("week").toDate();
        emit("select", firstDay);
      } else {
        emit("select", cell.date);
      }
    };
    const handleMouseEnter = (cell) => {
      if (cell.disabled) return;
      emit("hover", cell.date);
    };
    const __returned__ = { props, emit, ns, t, getCellExtra, rows, weekDays, getCellClasses, handleClick, handleMouseEnter, computed: computed11, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get generateCalendar() {
      return generateCalendar;
    }, get dayjs() {
      return stdin_default2;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
__sfc__.render = render;
var stdin_default3 = __sfc__;

// public/codesandbox-runtime/components/date-picker/src/month-table.js
import { renderList as _renderList2, Fragment as _Fragment2, openBlock as _openBlock2, createElementBlock as _createElementBlock2, toDisplayString as _toDisplayString2, normalizeClass as _normalizeClass2, createElementVNode as _createElementVNode2 } from "vue";
import { computed as computed12 } from "vue";
var _hoisted_12 = ["onClick", "onMouseenter"];
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock2(), _createElementBlock2(
    "div",
    {
      class: _normalizeClass2([$setup.ns.e("table"), $setup.ns.em("table", "month")])
    },
    [
      (_openBlock2(true), _createElementBlock2(
        _Fragment2,
        null,
        _renderList2($setup.months, (m, i) => {
          return _openBlock2(), _createElementBlock2("div", {
            key: i,
            class: _normalizeClass2($setup.getCellClasses(i)),
            onClick: ($event) => $setup.handleClick(i),
            onMouseenter: ($event) => $setup.emit("hover", $setup.dayjs($props.date).month(i).startOf("month").toDate())
          }, [
            _createElementVNode2(
              "span",
              {
                class: _normalizeClass2($setup.ns.e("cell-content"))
              },
              _toDisplayString2(m),
              3
              /* TEXT, CLASS */
            )
          ], 42, _hoisted_12);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    2
    /* CLASS */
  );
}
var __sfc__2 = {
  __name: "month-table",
  props: {
    date: { type: Date, required: true },
    selectedDate: { type: [Date, Array, null], required: false },
    rangeState: { type: Object, required: false },
    disabledDate: { type: Function, required: false },
    cellShape: { type: String, required: false }
  },
  emits: ["select", "hover"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("date-picker");
    const { t } = useLocale();
    const months = computed12(() => [
      t("datepicker.months.jan"),
      t("datepicker.months.feb"),
      t("datepicker.months.mar"),
      t("datepicker.months.apr"),
      t("datepicker.months.may"),
      t("datepicker.months.jun"),
      t("datepicker.months.jul"),
      t("datepicker.months.aug"),
      t("datepicker.months.sep"),
      t("datepicker.months.oct"),
      t("datepicker.months.nov"),
      t("datepicker.months.dec")
    ]);
    const getCellClasses = (month) => {
      const classes = [ns.e("cell"), ns.is(props.cellShape || "round")];
      const cellDate = stdin_default2(props.date).month(month).startOf("month");
      const today = stdin_default2().startOf("month");
      if (cellDate.isSame(today, "month")) classes.push("is-today");
      if (props.disabledDate && props.disabledDate(cellDate.toDate())) classes.push("is-disabled");
      const isSelected = (val) => {
        if (!val || Array.isArray(val)) return false;
        const d = stdin_default2(val);
        return d.year() === stdin_default2(props.date).year() && d.month() === month;
      };
      if (props.selectedDate && !Array.isArray(props.selectedDate)) {
        if (isSelected(props.selectedDate)) {
          classes.push("is-selected");
        }
      }
      if (props.rangeState) {
        const { from, to, hovering } = props.rangeState;
        const start = from ? stdin_default2(from).startOf("month") : null;
        const end = to ? stdin_default2(to).startOf("month") : hovering ? stdin_default2(hovering).startOf("month") : null;
        if (start && cellDate.isSame(start, "month")) classes.push("is-range-start", "is-selected");
        if (end && cellDate.isSame(end, "month")) classes.push("is-range-end", "is-selected");
        if (start && end) {
          const min = start.isBefore(end) ? start : end;
          const max = start.isBefore(end) ? end : start;
          if (cellDate.isAfter(min, "month") && cellDate.isBefore(max, "month")) {
            classes.push("is-in-range");
          }
        }
      }
      return classes;
    };
    const handleClick = (month) => {
      const cellDate = stdin_default2(props.date).month(month).startOf("month").toDate();
      if (props.disabledDate && props.disabledDate(cellDate)) return;
      emit("select", month);
    };
    const __returned__ = { props, emit, ns, t, months, getCellClasses, handleClick, computed: computed12, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get dayjs() {
      return stdin_default2;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
__sfc__2.render = render2;
var stdin_default4 = __sfc__2;

// public/codesandbox-runtime/components/date-picker/src/year-table.js
import { renderList as _renderList3, Fragment as _Fragment3, openBlock as _openBlock3, createElementBlock as _createElementBlock3, toDisplayString as _toDisplayString3, normalizeClass as _normalizeClass3, createElementVNode as _createElementVNode3 } from "vue";
import { computed as computed13 } from "vue";
var _hoisted_13 = ["onClick", "onMouseenter"];
function render3(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock3(), _createElementBlock3(
    "div",
    {
      class: _normalizeClass3([$setup.ns.e("table"), $setup.ns.em("table", "year")])
    },
    [
      (_openBlock3(true), _createElementBlock3(
        _Fragment3,
        null,
        _renderList3($setup.years, (year) => {
          return _openBlock3(), _createElementBlock3("div", {
            key: year,
            class: _normalizeClass3($setup.getCellClasses(year)),
            onClick: ($event) => $setup.handleClick(year),
            onMouseenter: ($event) => $setup.emit("hover", $setup.dayjs().year(year).startOf("year").toDate())
          }, [
            _createElementVNode3(
              "span",
              {
                class: _normalizeClass3($setup.ns.e("cell-content"))
              },
              _toDisplayString3(year),
              3
              /* TEXT, CLASS */
            )
          ], 42, _hoisted_13);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    2
    /* CLASS */
  );
}
var __sfc__3 = {
  __name: "year-table",
  props: {
    date: { type: Date, required: true },
    selectedDate: { type: [Date, Array, null], required: false },
    rangeState: { type: Object, required: false },
    disabledDate: { type: Function, required: false },
    cellShape: { type: String, required: false }
  },
  emits: ["select", "hover"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("date-picker");
    const startYear = computed13(() => {
      return Math.floor(stdin_default2(props.date).year() / 10) * 10;
    });
    const years = computed13(() => {
      const start = startYear.value;
      const res = [];
      for (let i = 0; i < 10; i++) {
        res.push(start + i);
      }
      return res;
    });
    const getCellClasses = (year) => {
      const classes = [ns.e("cell"), ns.is(props.cellShape || "round")];
      const cellDate = stdin_default2().year(year).startOf("year");
      const today = stdin_default2().startOf("year");
      if (cellDate.isSame(today, "year")) classes.push("is-today");
      if (props.disabledDate && props.disabledDate(cellDate.toDate())) classes.push("is-disabled");
      const isSelected = (val) => {
        if (!val || Array.isArray(val)) return false;
        const d = stdin_default2(val);
        return d.year() === year;
      };
      if (props.selectedDate && !Array.isArray(props.selectedDate)) {
        if (isSelected(props.selectedDate)) {
          classes.push("is-selected");
        }
      }
      if (props.rangeState) {
        const { from, to, hovering } = props.rangeState;
        const start = from ? stdin_default2(from).startOf("year") : null;
        const end = to ? stdin_default2(to).startOf("year") : hovering ? stdin_default2(hovering).startOf("year") : null;
        if (start && cellDate.isSame(start)) classes.push("is-range-start", "is-selected");
        if (end && cellDate.isSame(end)) classes.push("is-range-end", "is-selected");
        if (start && end) {
          const min = start.isBefore(end) ? start : end;
          const max = start.isBefore(end) ? end : start;
          if (cellDate.isAfter(min) && cellDate.isBefore(max)) {
            classes.push("is-in-range");
          }
        }
      }
      return classes;
    };
    const handleClick = (year) => {
      const cellDate = stdin_default2().year(year).startOf("year").toDate();
      if (props.disabledDate && props.disabledDate(cellDate)) return;
      emit("select", year);
    };
    const __returned__ = { props, emit, ns, startYear, years, getCellClasses, handleClick, computed: computed13, get useNamespace() {
      return useNamespace;
    }, get dayjs() {
      return stdin_default2;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
__sfc__3.render = render3;
var stdin_default5 = __sfc__3;

// public/codesandbox-runtime/components/date-picker/src/quarter-table.js
import { renderList as _renderList4, Fragment as _Fragment4, openBlock as _openBlock4, createElementBlock as _createElementBlock4, toDisplayString as _toDisplayString4, normalizeClass as _normalizeClass4, createElementVNode as _createElementVNode4 } from "vue";
import { computed as computed14 } from "vue";
var _hoisted_14 = ["onClick", "onMouseenter"];
function render4(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock4(), _createElementBlock4(
    "div",
    {
      class: _normalizeClass4([$setup.ns.e("table"), $setup.ns.em("table", "quarter")])
    },
    [
      (_openBlock4(true), _createElementBlock4(
        _Fragment4,
        null,
        _renderList4($setup.quarters, (q) => {
          return _openBlock4(), _createElementBlock4("div", {
            key: q.value,
            class: _normalizeClass4($setup.getCellClasses(q.value)),
            onClick: ($event) => $setup.handleClick(q.value),
            onMouseenter: ($event) => $setup.emit("hover", $setup.dayjs($props.date).month((q.value - 1) * 3).startOf("month").toDate())
          }, [
            _createElementVNode4(
              "span",
              {
                class: _normalizeClass4($setup.ns.e("cell-content"))
              },
              _toDisplayString4(q.text),
              3
              /* TEXT, CLASS */
            )
          ], 42, _hoisted_14);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    2
    /* CLASS */
  );
}
var __sfc__4 = {
  __name: "quarter-table",
  props: {
    date: { type: Date, required: true },
    selectedDate: { type: [Date, Array, null], required: false },
    rangeState: { type: Object, required: false },
    disabledDate: { type: Function, required: false },
    cellShape: { type: String, required: false }
  },
  emits: ["select", "hover"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("date-picker");
    const { t } = useLocale();
    const quarters = computed14(() => [
      { text: t("datepicker.quarters.q1"), value: 1 },
      { text: t("datepicker.quarters.q2"), value: 2 },
      { text: t("datepicker.quarters.q3"), value: 3 },
      { text: t("datepicker.quarters.q4"), value: 4 }
    ]);
    const getCellClasses = (quarter) => {
      const classes = [ns.e("cell"), ns.is(props.cellShape || "round")];
      const month = (quarter - 1) * 3;
      const cellDate = stdin_default2(props.date).month(month).startOf("month");
      const today = stdin_default2().startOf("month");
      if (today.year() === cellDate.year() && Math.floor(today.month() / 3) === quarter - 1) {
        classes.push("is-today");
      }
      if (props.disabledDate && props.disabledDate(cellDate.toDate())) classes.push("is-disabled");
      const isSelected = (val) => {
        if (!val || Array.isArray(val)) return false;
        const d = stdin_default2(val);
        return d.year() === stdin_default2(props.date).year() && Math.floor(d.month() / 3) === quarter - 1;
      };
      if (props.selectedDate && !Array.isArray(props.selectedDate)) {
        if (isSelected(props.selectedDate)) {
          classes.push("is-selected");
        }
      }
      if (props.rangeState) {
        const { from, to, hovering } = props.rangeState;
        const start = from ? stdin_default2(from).startOf("month").month(Math.floor(stdin_default2(from).month() / 3) * 3) : null;
        const end = to ? stdin_default2(to).startOf("month").month(Math.floor(stdin_default2(to).month() / 3) * 3) : hovering ? stdin_default2(hovering).startOf("month").month(Math.floor(stdin_default2(hovering).month() / 3) * 3) : null;
        const current = cellDate.startOf("month");
        if (start && current.isSame(start, "month")) classes.push("is-range-start", "is-selected");
        if (end && current.isSame(end, "month")) classes.push("is-range-end", "is-selected");
        if (start && end) {
          const min = start.isBefore(end) ? start : end;
          const max = start.isBefore(end) ? end : start;
          if (current.isAfter(min, "month") && current.isBefore(max, "month")) {
            classes.push("is-in-range");
          }
        }
      }
      return classes;
    };
    const handleClick = (quarter) => {
      const month = (quarter - 1) * 3;
      const cellDate = stdin_default2(props.date).month(month).startOf("month").toDate();
      if (props.disabledDate && props.disabledDate(cellDate)) return;
      emit("select", quarter);
    };
    const __returned__ = { props, emit, ns, t, quarters, getCellClasses, handleClick, computed: computed14, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get dayjs() {
      return stdin_default2;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
__sfc__4.render = render4;
var stdin_default6 = __sfc__4;

// public/codesandbox-runtime/components/date-picker/src/date-picker-meta.js
var datePickerProps = {
  /** 绑定值 */
  modelValue: {
    type: [String, Number, Date, Array],
    default: null
  },
  /** 类型 */
  type: {
    type: String,
    default: "date"
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false
  },
  /** 是否可清空 */
  clearable: {
    type: Boolean,
    default: true
  },
  /** 尺寸 */
  size: {
    type: String,
    default: "default"
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: void 0
  },
  /** 范围选择时的开始占位符 */
  startPlaceholder: {
    type: String,
    default: void 0
  },
  /** 范围选择时的结束占位符 */
  endPlaceholder: {
    type: String,
    default: void 0
  },
  /** 格式化显示 */
  format: {
    type: String,
    default: ""
  },
  /** 绑定值的格式 */
  valueFormat: {
    type: String,
    default: ""
  },
  /** 面板显示的日期格式 */
  dateFormat: {
    type: String,
    default: "YYYY-MM-DD"
  },
  /** 面板显示的时间格式 */
  timeFormat: {
    type: String,
    default: "HH:mm:ss"
  },
  /** 范围分隔符 */
  rangeSeparator: {
    type: String,
    default: "-"
  },
  /** 第一天是星期几 */
  firstDayOfWeek: {
    type: Number,
    default: 7
    // 1-7, 7 代表周日
  },
  /** 禁用日期函数 */
  disabledDate: {
    type: Function,
    default: void 0
  },
  /** 预设快捷选项 */
  presets: {
    type: Array,
    default: () => []
  },
  /** 预设选项的位置 */
  presetPosition: {
    type: String,
    default: "bottom"
  },
  /** 是否显示底部操作栏 */
  showFooter: {
    type: Boolean,
    default: true
  },
  /** 状态 */
  status: {
    type: String,
    default: void 0
  },
  /** 是否自动排序范围（当结束日期早于开始日期时） */
  orderOnConfirm: {
    type: Boolean,
    default: false
  },
  /** 自定义前缀图标 */
  prefixIcon: {
    type: [String, Object],
    default: ""
  },
  /** 自定义清除图标 */
  clearIcon: {
    type: [String, Object],
    default: ""
  },
  /** 选择器打开时默认显示的日期 */
  defaultValue: {
    type: [Date, Array],
    default: void 0
  },
  /** 是否内联显示（只显示面板） */
  panelOnly: {
    type: Boolean,
    default: false
  },
  /** 默认时间（datetime 模式下） */
  defaultTime: {
    type: [Date, Array],
    default: void 0
  },
  /** 下拉框类名 */
  popperClass: {
    type: String,
    default: ""
  },
  /** 是否将面板插入到 body */
  teleported: {
    type: Boolean,
    default: true
  },
  /** 是否触发表单验证 */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /** 小名/标识 */
  name: {
    type: String,
    default: ""
  },
  /** ID */
  id: {
    type: String,
    default: ""
  },
  /** 单元格形状 */
  cellShape: {
    type: String,
    default: "round"
  },
  /** 自定义单元格渲染函数 */
  cellRender: {
    type: Function,
    default: void 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};

// public/codesandbox-runtime/components/date-picker/src/date-picker.js
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
var _hoisted_15 = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
var _hoisted_2 = ["placeholder", "value"];
var _hoisted_3 = ["placeholder", "value"];
var _hoisted_4 = ["placeholder", "value"];
var _hoisted_5 = {
  key: 1,
  viewBox: "0 0 1024 1024",
  width: "1em",
  height: "1em"
};
var _hoisted_6 = ["onClick"];
function render5(_ctx, _cache, $props, $setup, $data, $options) {
  var _a2, _b, _c;
  return _openBlock5(), _createElementBlock5(
    "div",
    {
      ref: "wrapperRef",
      class: _normalizeClass5($setup.wrapperClasses),
      style: _normalizeStyle($setup.themeStyle),
      onClick: $setup.togglePanel,
      onMouseenter: _cache[10] || (_cache[10] = ($event) => $setup.hovering = true),
      onMouseleave: _cache[11] || (_cache[11] = ($event) => $setup.hovering = false)
    },
    [
      _createCommentVNode2(" \u8F93\u5165\u6846\u90E8\u5206 "),
      !_ctx.panelOnly ? (_openBlock5(), _createElementBlock5(
        "div",
        {
          key: 0,
          class: _normalizeClass5($setup.ns.e("wrapper"))
        },
        [
          _createElementVNode5(
            "span",
            {
              class: _normalizeClass5($setup.ns.e("icon"))
            },
            [
              _renderSlot2(_ctx.$slots, "prefix-icon", {}, () => [
                _ctx.prefixIcon ? (_openBlock5(), _createBlock(_resolveDynamicComponent(_ctx.prefixIcon), { key: 0 })) : (_openBlock5(), _createElementBlock5("svg", _hoisted_15, [..._cache[12] || (_cache[12] = [
                  _createElementVNode5(
                    "path",
                    {
                      fill: "currentColor",
                      d: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 4H11V16h2z"
                    },
                    null,
                    -1
                    /* CACHED */
                  )
                ])]))
              ])
            ],
            2
            /* CLASS */
          ),
          !$setup.isRange ? (_openBlock5(), _createElementBlock5("input", {
            key: 0,
            class: _normalizeClass5($setup.ns.e("inner")),
            placeholder: (_a2 = _ctx.placeholder) != null ? _a2 : $setup.t("datepicker.selectDate"),
            value: $setup.displayValue,
            readonly: ""
          }, null, 10, _hoisted_2)) : (_openBlock5(), _createElementBlock5(
            "div",
            {
              key: 1,
              class: _normalizeClass5($setup.ns.e("range-input-wrapper"))
            },
            [
              _createElementVNode5("input", {
                class: _normalizeClass5($setup.ns.e("range-input")),
                placeholder: (_b = _ctx.startPlaceholder) != null ? _b : $setup.t("datepicker.startDate"),
                value: $setup.rangeDisplayValue[0],
                readonly: ""
              }, null, 10, _hoisted_3),
              _createElementVNode5(
                "span",
                {
                  class: _normalizeClass5($setup.ns.e("range-separator"))
                },
                _toDisplayString5(_ctx.rangeSeparator),
                3
                /* TEXT, CLASS */
              ),
              _createElementVNode5("input", {
                class: _normalizeClass5($setup.ns.e("range-input")),
                placeholder: (_c = _ctx.endPlaceholder) != null ? _c : $setup.t("datepicker.endDate"),
                value: $setup.rangeDisplayValue[1],
                readonly: ""
              }, null, 10, _hoisted_4)
            ],
            2
            /* CLASS */
          )),
          _createElementVNode5(
            "span",
            {
              class: _normalizeClass5($setup.ns.e("suffix"))
            },
            [
              _ctx.clearable && _ctx.modelValue && $setup.hovering && !_ctx.disabled ? (_openBlock5(), _createElementBlock5(
                "span",
                {
                  key: 0,
                  class: _normalizeClass5($setup.ns.e("clear")),
                  onClick: _withModifiers($setup.handleClear, ["stop"])
                },
                [
                  _renderSlot2(_ctx.$slots, "clear-icon", {}, () => [
                    _ctx.clearIcon ? (_openBlock5(), _createBlock(_resolveDynamicComponent(_ctx.clearIcon), { key: 0 })) : (_openBlock5(), _createElementBlock5("svg", _hoisted_5, [..._cache[13] || (_cache[13] = [
                      _createElementVNode5(
                        "path",
                        {
                          fill: "currentColor",
                          d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
                        },
                        null,
                        -1
                        /* CACHED */
                      )
                    ])]))
                  ])
                ],
                2
                /* CLASS */
              )) : _createCommentVNode2("v-if", true)
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )) : _createCommentVNode2("v-if", true),
      _createCommentVNode2(" \u5F39\u7A97\u9762\u677F "),
      (_openBlock5(), _createBlock(_resolveDynamicComponent(_ctx.panelOnly ? "div" : "Teleport"), {
        to: "body",
        disabled: !_ctx.teleported || _ctx.panelOnly
      }, {
        default: _withCtx(() => [
          _createVNode(_Transition, {
            name: _ctx.panelOnly ? "" : $setup.ns.b("panel")
          }, {
            default: _withCtx(() => [
              $setup.visible ? (_openBlock5(), _createElementBlock5(
                "div",
                {
                  key: 0,
                  class: _normalizeClass5([$setup.ns.e("panel"), _ctx.popperClass, $setup.ns.is("plain", _ctx.panelOnly)]),
                  style: _normalizeStyle(!_ctx.panelOnly && _ctx.teleported ? $setup.dropdownStyle : {}),
                  onClick: _cache[9] || (_cache[9] = _withModifiers(() => {
                  }, ["stop"]))
                },
                [
                  _createElementVNode5(
                    "div",
                    {
                      class: _normalizeClass5($setup.ns.e("header"))
                    },
                    [
                      _createElementVNode5(
                        "div",
                        {
                          class: _normalizeClass5($setup.ns.e("header-group"))
                        },
                        [
                          _createElementVNode5(
                            "button",
                            {
                              class: _normalizeClass5([$setup.ns.e("header-btns"), $setup.ns.em("header-btns", "double-left")]),
                              onClick: _cache[0] || (_cache[0] = ($event) => $setup.moveYear(-1))
                            },
                            " \xAB ",
                            2
                            /* CLASS */
                          ),
                          $setup.currentView === "date" ? (_openBlock5(), _createElementBlock5(
                            "button",
                            {
                              key: 0,
                              class: _normalizeClass5([$setup.ns.e("header-btns"), $setup.ns.em("header-btns", "left")]),
                              onClick: _cache[1] || (_cache[1] = ($event) => $setup.moveMonth(-1))
                            },
                            " \u2039 ",
                            2
                            /* CLASS */
                          )) : _createCommentVNode2("v-if", true)
                        ],
                        2
                        /* CLASS */
                      ),
                      _createElementVNode5(
                        "span",
                        {
                          class: _normalizeClass5($setup.ns.e("header-label")),
                          onClick: $setup.handleHeaderClick
                        },
                        _toDisplayString5($setup.headerLabel),
                        3
                        /* TEXT, CLASS */
                      ),
                      _createElementVNode5(
                        "div",
                        {
                          class: _normalizeClass5($setup.ns.e("header-group"))
                        },
                        [
                          $setup.currentView === "date" ? (_openBlock5(), _createElementBlock5(
                            "button",
                            {
                              key: 0,
                              class: _normalizeClass5([$setup.ns.e("header-btns"), $setup.ns.em("header-btns", "right")]),
                              onClick: _cache[2] || (_cache[2] = ($event) => $setup.moveMonth(1))
                            },
                            " \u203A ",
                            2
                            /* CLASS */
                          )) : _createCommentVNode2("v-if", true),
                          _createElementVNode5(
                            "button",
                            {
                              class: _normalizeClass5([$setup.ns.e("header-btns"), $setup.ns.em("header-btns", "double-right")]),
                              onClick: _cache[3] || (_cache[3] = ($event) => $setup.moveYear(1))
                            },
                            " \xBB ",
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
                  _createElementVNode5(
                    "div",
                    {
                      class: _normalizeClass5($setup.ns.e("content"))
                    },
                    [
                      $setup.currentView === "date" ? (_openBlock5(), _createBlock($setup["DateTable"], {
                        key: 0,
                        date: $setup.innerDate,
                        "selected-date": $setup.parsedSelectedDate,
                        "selection-mode": _ctx.type === "week" ? "week" : "date",
                        "range-state": $setup.parsedRangeState,
                        "disabled-date": _ctx.disabledDate,
                        "first-day-of-week": _ctx.firstDayOfWeek,
                        "cell-shape": _ctx.cellShape,
                        "cell-render": _ctx.cellRender,
                        onSelect: $setup.handleSelect,
                        onHover: _cache[4] || (_cache[4] = (val) => $setup.rangeHoverDate = val)
                      }, {
                        "date-cell": _withCtx((slotProps) => [
                          _renderSlot2(_ctx.$slots, "date-cell", _normalizeProps(_guardReactiveProps(slotProps)))
                        ]),
                        _: 3
                        /* FORWARDED */
                      }, 8, ["date", "selected-date", "selection-mode", "range-state", "disabled-date", "first-day-of-week", "cell-shape", "cell-render"])) : $setup.currentView === "month" ? (_openBlock5(), _createBlock($setup["MonthTable"], {
                        key: 1,
                        date: $setup.innerDate,
                        "selected-date": $setup.parsedSelectedDate,
                        "range-state": $setup.parsedRangeState,
                        "disabled-date": _ctx.disabledDate,
                        "cell-shape": _ctx.cellShape,
                        onSelect: $setup.handleSelect,
                        onHover: _cache[5] || (_cache[5] = (val) => $setup.rangeHoverDate = val)
                      }, null, 8, ["date", "selected-date", "range-state", "disabled-date", "cell-shape"])) : $setup.currentView === "year" ? (_openBlock5(), _createBlock($setup["YearTable"], {
                        key: 2,
                        date: $setup.innerDate,
                        "selected-date": $setup.parsedSelectedDate,
                        "range-state": $setup.parsedRangeState,
                        "disabled-date": _ctx.disabledDate,
                        "cell-shape": _ctx.cellShape,
                        onSelect: $setup.handleSelect,
                        onHover: _cache[6] || (_cache[6] = (val) => $setup.rangeHoverDate = val)
                      }, null, 8, ["date", "selected-date", "range-state", "disabled-date", "cell-shape"])) : $setup.currentView === "quarter" ? (_openBlock5(), _createBlock($setup["QuarterTable"], {
                        key: 3,
                        date: $setup.innerDate,
                        "selected-date": $setup.parsedSelectedDate,
                        "range-state": $setup.parsedRangeState,
                        "disabled-date": _ctx.disabledDate,
                        "cell-shape": _ctx.cellShape,
                        onSelect: $setup.handleSelect,
                        onHover: _cache[7] || (_cache[7] = (val) => $setup.rangeHoverDate = val)
                      }, null, 8, ["date", "selected-date", "range-state", "disabled-date", "cell-shape"])) : _createCommentVNode2("v-if", true)
                    ],
                    2
                    /* CLASS */
                  ),
                  _ctx.$slots.extra ? (_openBlock5(), _createElementBlock5(
                    "div",
                    {
                      key: 0,
                      class: _normalizeClass5($setup.ns.e("extra"))
                    },
                    [
                      _renderSlot2(_ctx.$slots, "extra")
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode2("v-if", true),
                  _ctx.presets.length > 0 ? (_openBlock5(), _createElementBlock5(
                    "div",
                    {
                      key: 1,
                      class: _normalizeClass5($setup.ns.e("presets"))
                    },
                    [
                      (_openBlock5(true), _createElementBlock5(
                        _Fragment5,
                        null,
                        _renderList5(_ctx.presets, (p) => {
                          return _openBlock5(), _createElementBlock5("button", {
                            key: p.label,
                            class: _normalizeClass5($setup.ns.e("preset-item")),
                            onClick: ($event) => $setup.handleSelect(typeof p.value === "function" ? p.value() : p.value)
                          }, _toDisplayString5(p.label), 11, _hoisted_6);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode2("v-if", true),
                  $setup.shouldShowFooter ? (_openBlock5(), _createElementBlock5(
                    "div",
                    {
                      key: 2,
                      class: _normalizeClass5($setup.ns.e("footer"))
                    },
                    [
                      _renderSlot2(_ctx.$slots, "footer", {}, () => [
                        _ctx.type.includes("datetime") && !$setup.isRange ? (_openBlock5(), _createElementBlock5(
                          "div",
                          {
                            key: 0,
                            class: _normalizeClass5($setup.ns.e("footer-time"))
                          },
                          _toDisplayString5($setup.dayjs(_ctx.modelValue || /* @__PURE__ */ new Date()).format($setup.props.timeFormat || "HH:mm:ss")),
                          3
                          /* TEXT, CLASS */
                        )) : _createCommentVNode2("v-if", true),
                        _createElementVNode5(
                          "div",
                          {
                            class: _normalizeClass5($setup.ns.e("footer-btns"))
                          },
                          [
                            $setup.isRange || _ctx.type.includes("datetime") ? (_openBlock5(), _createElementBlock5(
                              "button",
                              {
                                key: 0,
                                class: _normalizeClass5($setup.ns.e("footer-btn")),
                                onClick: _cache[8] || (_cache[8] = ($event) => $setup.visible = false)
                              },
                              _toDisplayString5($setup.t("datepicker.cancel")),
                              3
                              /* TEXT, CLASS */
                            )) : _createCommentVNode2("v-if", true),
                            _createElementVNode5(
                              "button",
                              {
                                class: _normalizeClass5([$setup.ns.e("footer-btn"), $setup.ns.e("footer-btn--confirm")]),
                                onClick: $setup.handleConfirmClick
                              },
                              _toDisplayString5($setup.t("datepicker.confirm")),
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
                  )) : _createCommentVNode2("v-if", true)
                ],
                6
                /* CLASS, STYLE */
              )) : _createCommentVNode2("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["name"])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["disabled"]))
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
var __sfc__5 = /* @__PURE__ */ Object.assign({
  name: "YhDatePicker"
}, {
  __name: "date-picker",
  props: datePickerProps,
  emits: ["update:modelValue", "change", "focus", "blur", "clear", "confirm", "panel-change", "visible-change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("date-picker");
    const { t, locale } = useLocale();
    const { form, formItem, validate: triggerValidate } = useFormItem();
    const { globalSize } = useConfig();
    const { themeStyle } = useComponentTheme(
      "date-picker",
      computed15(() => props.themeOverrides)
    );
    const visible = ref12(props.panelOnly);
    const hovering = ref12(false);
    const getInitialView = (type) => {
      if (type.includes("year")) return "year";
      if (type.includes("month")) return "month";
      if (type.includes("quarter")) return "quarter";
      if (type === "week") return "date";
      return "date";
    };
    const currentView = ref12(getInitialView(props.type));
    const innerDate = ref12(/* @__PURE__ */ new Date());
    const rangeHoverDate = ref12(null);
    const wrapperRef = ref12();
    const isRange = computed15(() => props.type.includes("range"));
    const selectSize = computed15(
      () => props.size || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalSize.value || "default"
    );
    const getFormat = () => {
      if (props.format) return props.format;
      return DEFAULT_FORMATS[props.type] || "YYYY-MM-DD";
    };
    const displayValue = computed15(() => {
      if (isRange.value) return "";
      if (!props.modelValue || props.modelValue === "") return "";
      const dateVal = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue;
      if (!dateVal) return "";
      const result = formatDate(dateVal, getFormat());
      return result === "Invalid Date" ? "" : result;
    });
    const rangeDisplayValue = computed15(() => {
      if (!isRange.value || !Array.isArray(props.modelValue)) return ["", ""];
      const fmt = getFormat();
      const [start, end] = props.modelValue;
      return [start ? formatDate(start, fmt) : "", end ? formatDate(end, fmt) : ""];
    });
    const parsedSelectedDate = computed15(() => {
      const val = props.modelValue;
      if (val === "" || val === null || val === void 0) return null;
      if (Array.isArray(val)) {
        return val.map((v) => v && v !== "" ? stdin_default2(v).toDate() : null).filter((v) => v !== null);
      }
      const d = stdin_default2(val);
      return d.isValid() ? d.toDate() : null;
    });
    const parsedRangeState = computed15(() => {
      if (!isRange.value) return void 0;
      const val = props.modelValue;
      const from = Array.isArray(val) && val[0] ? stdin_default2(val[0]).toDate() : null;
      const to = Array.isArray(val) && val[1] ? stdin_default2(val[1]).toDate() : null;
      return {
        from,
        to,
        hovering: rangeHoverDate.value
      };
    });
    const wrapperClasses = computed15(() => [
      ns.b(),
      ns.m(selectSize.value),
      ns.is("disabled", props.disabled),
      ns.is("focused", visible.value),
      ns.is("range", isRange.value),
      ns.is("panel-only", props.panelOnly),
      ns.m(props.status)
    ]);
    const monthKeys = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec"
    ];
    const headerLabel = computed15(() => {
      const d = stdin_default2(innerDate.value);
      const dateLocale = locale.value.yh.datepicker;
      if (currentView.value === "year") {
        const start = Math.floor(d.year() / 10) * 10;
        return `${start} - ${start + 9}`;
      }
      if (currentView.value === "month" || currentView.value === "quarter") {
        return dateLocale.monthBeforeYear ? d.format("YYYY") : `${d.year()}${dateLocale.year || ""}`;
      }
      const monthName = dateLocale.months[monthKeys[d.month()]];
      if (!dateLocale.monthBeforeYear) {
        return `${d.year()}${dateLocale.year || ""}${monthName}`;
      }
      return `${monthName} ${d.year()}`;
    });
    const moveMonth = (offset) => {
      innerDate.value = stdin_default2(innerDate.value).add(offset, "month").toDate();
    };
    const moveYear = (offset) => {
      const step = currentView.value === "year" ? 10 : 1;
      innerDate.value = stdin_default2(innerDate.value).add(offset * step, "year").toDate();
    };
    const handleHeaderClick = () => {
      if (currentView.value === "date") currentView.value = "month";
      else if (currentView.value === "month") currentView.value = "year";
    };
    const emitChange = (val) => {
      const fmt = props.valueFormat || "";
      let result = val;
      if (fmt && val) {
        if (Array.isArray(val)) {
          result = [val[0] ? formatDate(val[0], fmt) : null, val[1] ? formatDate(val[1], fmt) : null];
        } else {
          result = formatDate(val, fmt);
        }
      }
      emit("update:modelValue", result);
      emit("change", result);
      if (props.validateEvent) triggerValidate("change");
    };
    const handleSelect = (val) => {
      if (Array.isArray(val)) {
        if (isRange.value) emitChange([val[0], val[1]]);
        else emitChange(val[0]);
        if (!props.panelOnly) visible.value = false;
        return;
      }
      let targetDate;
      if (typeof val === "number") {
        if (currentView.value === "year") {
          targetDate = stdin_default2(innerDate.value).year(val).toDate();
          if (props.type.includes("year")) {
            performFinalSelect(targetDate);
          } else {
            innerDate.value = targetDate;
            currentView.value = "month";
          }
        } else if (currentView.value === "month") {
          targetDate = stdin_default2(innerDate.value).month(val).toDate();
          if (props.type.includes("month")) {
            performFinalSelect(targetDate);
          } else {
            innerDate.value = targetDate;
            currentView.value = "date";
          }
        } else if (currentView.value === "quarter") {
          targetDate = stdin_default2(innerDate.value).month((val - 1) * 3).toDate();
          performFinalSelect(targetDate);
        }
      } else {
        performFinalSelect(val);
      }
    };
    const performFinalSelect = (date) => {
      if (isRange.value) {
        const current = props.modelValue || [null, null];
        if (!current[0] || current[0] && current[1]) {
          emit("update:modelValue", [date, null]);
        } else {
          let start = stdin_default2(current[0]).toDate();
          let end = date;
          if (stdin_default2(end).isBefore(stdin_default2(start))) {
            if (props.orderOnConfirm) [start, end] = [end, start];
            else {
              start = date;
              end = null;
            }
          }
          emitChange([start, end]);
          if (end && !props.panelOnly) visible.value = false;
        }
      } else {
        emitChange(date);
        if (!props.panelOnly && !props.type.includes("datetime")) {
          visible.value = false;
        }
      }
    };
    const dropdownStyle = ref12({});
    const updatePosition = () => {
      if (!wrapperRef.value || !props.teleported || props.panelOnly) return;
      const rect = wrapperRef.value.getBoundingClientRect();
      const styles = window.getComputedStyle(wrapperRef.value);
      const primary = styles.getPropertyValue("--yh-color-primary").trim();
      const primaryRgb = styles.getPropertyValue("--yh-color-primary-rgb").trim();
      const primaryLight9 = styles.getPropertyValue("--yh-color-primary-light-9").trim();
      dropdownStyle.value = __spreadProps(__spreadValues2({}, themeStyle.value), {
        position: "fixed",
        top: `${rect.bottom + 4}px`,
        left: `${rect.left}px`,
        zIndex: "2000",
        "--yh-color-primary": primary,
        "--yh-color-primary-rgb": primaryRgb,
        "--yh-color-primary-light-9": primaryLight9
      });
    };
    const syncInnerDate = () => {
      const modelVal = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue;
      const defaultVal = Array.isArray(props.defaultValue) ? props.defaultValue[0] : props.defaultValue;
      if (modelVal && stdin_default2(modelVal).isValid()) {
        innerDate.value = stdin_default2(modelVal).toDate();
      } else if (defaultVal && stdin_default2(defaultVal).isValid()) {
        innerDate.value = stdin_default2(defaultVal).toDate();
      } else {
        innerDate.value = /* @__PURE__ */ new Date();
      }
    };
    watch4(visible, (val) => {
      if (val) {
        currentView.value = getInitialView(props.type);
        updatePosition();
        syncInnerDate();
      }
    });
    const handleClear = (e) => {
      e.stopPropagation();
      emitChange(null);
      emit("clear");
    };
    const togglePanel = (e) => {
      if (props.disabled || props.readonly || props.panelOnly) return;
      if (e) e.stopPropagation();
      visible.value = !visible.value;
    };
    const handleOutsideClick = (e) => {
      var _a2;
      if (!visible.value || props.panelOnly) return;
      const target = e.target;
      if ((_a2 = wrapperRef.value) == null ? void 0 : _a2.contains(target)) return;
      const poppers = document.querySelectorAll(`.${ns.e("panel")}`);
      for (const p of poppers) {
        if (p.contains(target)) return;
      }
      visible.value = false;
    };
    const shouldShowFooter = computed15(() => {
      if (props.showFooter === false) return false;
      return props.type.includes("datetime") || isRange.value || props.presets.length > 0;
    });
    const handleConfirmClick = () => {
      emit("confirm", props.modelValue);
      visible.value = false;
    };
    onMounted3(() => {
      syncInnerDate();
      if (!props.panelOnly) {
        window.addEventListener("click", handleOutsideClick, true);
        if (props.teleported) {
          window.addEventListener("scroll", updatePosition, true);
          window.addEventListener("resize", updatePosition);
        }
      }
    });
    onBeforeUnmount2(() => {
      window.removeEventListener("click", handleOutsideClick, true);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    });
    const __returned__ = { props, emit, ns, t, locale, form, formItem, triggerValidate, globalSize, themeStyle, visible, hovering, getInitialView, currentView, innerDate, rangeHoverDate, wrapperRef, isRange, selectSize, getFormat, displayValue, rangeDisplayValue, parsedSelectedDate, parsedRangeState, wrapperClasses, monthKeys, headerLabel, moveMonth, moveYear, handleHeaderClick, emitChange, handleSelect, performFinalSelect, dropdownStyle, updatePosition, syncInnerDate, handleClear, togglePanel, handleOutsideClick, shouldShowFooter, handleConfirmClick, ref: ref12, computed: computed15, watch: watch4, onMounted: onMounted3, onBeforeUnmount: onBeforeUnmount2, get useNamespace() {
      return useNamespace;
    }, get useFormItem() {
      return useFormItem;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get useConfig() {
      return useConfig;
    }, DateTable: stdin_default3, MonthTable: stdin_default4, YearTable: stdin_default5, QuarterTable: stdin_default6, get datePickerProps() {
      return datePickerProps;
    }, get DEFAULT_FORMATS() {
      return DEFAULT_FORMATS;
    }, get formatDate() {
      return formatDate;
    }, get dayjs() {
      return stdin_default2;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__5.render = render5;
var stdin_default7 = __sfc__5;
export {
  stdin_default7 as default
};
