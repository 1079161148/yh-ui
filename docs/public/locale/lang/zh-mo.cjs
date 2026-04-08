"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zhMo = exports.default = void 0;
const zhMo = exports.zhMo = {
  name: "zh-mo",
  yh: {
    // 通用
    common: {
      yes: "\u662F",
      no: "\u5426",
      confirm: "\u78BA\u8A8D",
      cancel: "\u53D6\u6D88",
      loading: "\u8F09\u5165\u4E2D",
      close: "\u95DC\u9589",
      clear: "\u6E05\u7A7A",
      reset: "\u91CD\u7F6E",
      save: "\u5132\u5B58",
      delete: "\u522A\u9664",
      edit: "\u7DE8\u8F2F",
      add: "\u65B0\u589E",
      search: "\u641C\u5C0B",
      refresh: "\u91CD\u65B0\u6574\u7406",
      expand: "\u5C55\u958B",
      collapse: "\u6536\u8D77",
      more: "\u66F4\u591A",
      noData: "\u66AB\u7121\u8CC7\u6599",
      noMatch: "\u7121\u7B26\u5408\u8CC7\u6599",
      selectAll: "\u5168\u9078",
      unselectAll: "\u53D6\u6D88\u5168\u9078"
    },
    // 顏色選擇器
    colorpicker: {
      confirm: "\u78BA\u5B9A",
      clear: "\u6E05\u7A7A",
      eyeDropper: "\u53D6\u8272\u5668",
      suggestionDark: "\u5EFA\u8B70\u4F7F\u7528\u767D\u8272\u6587\u5B57",
      suggestionLight: "\u5EFA\u8B70\u4F7F\u7528\u9ED1\u8272\u6587\u5B57",
      recentColors: "\u6700\u8FD1\u4F7F\u7528",
      presetColors: "\u9810\u8A2D\u984F\u8272"
    },
    // 日期選擇器
    datepicker: {
      now: "\u6B64\u523B",
      today: "\u4ECA\u5929",
      cancel: "\u53D6\u6D88",
      clear: "\u6E05\u7A7A",
      confirm: "\u78BA\u5B9A",
      selectDate: "\u9078\u64C7\u65E5\u671F",
      selectTime: "\u9078\u64C7\u6642\u9593",
      startDate: "\u958B\u59CB\u65E5\u671F",
      startTime: "\u958B\u59CB\u6642\u9593",
      endDate: "\u7D50\u675F\u65E5\u671F",
      endTime: "\u7D50\u675F\u6642\u9593",
      year: "\u5E74",
      month: "\u6708",
      day: "\u65E5",
      week: "\u9031",
      monthBeforeYear: false,
      prevYear: "\u4E0A\u4E00\u5E74",
      nextYear: "\u4E0B\u4E00\u5E74",
      prevMonth: "\u4E0A\u500B\u6708",
      nextMonth: "\u4E0B\u500B\u6708",
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
        q1: "\u7B2C\u4E00\u5B63",
        q2: "\u7B2C\u4E8C\u5B63",
        q3: "\u7B2C\u4E09\u5B63",
        q4: "\u7B2C\u56DB\u5B63"
      }
    },
    // 時間選擇器
    timepicker: {
      confirm: "\u78BA\u5B9A",
      cancel: "\u53D6\u6D88",
      now: "\u6B64\u523B",
      placeholder: "\u9078\u64C7\u6642\u9593",
      startPlaceholder: "\u958B\u59CB\u6642\u9593",
      endPlaceholder: "\u7D50\u675F\u6642\u9593",
      selectTime: "\u9078\u64C7\u6642\u9593"
    },
    // 時間選擇
    timeselect: {
      placeholder: "\u9078\u64C7\u6642\u9593"
    },
    // 樹
    tree: {
      emptyText: "\u66AB\u7121\u8CC7\u6599",
      loading: "\u8F09\u5165\u4E2D...",
      checkAll: "\u5168\u9078",
      uncheckAll: "\u53D6\u6D88\u5168\u9078",
      expandAll: "\u5C55\u958B\u5168\u90E8",
      collapseAll: "\u6536\u8D77\u5168\u90E8"
    },
    // 樹選擇
    treeselect: {
      placeholder: "\u8ACB\u9078\u64C7",
      emptyText: "\u66AB\u7121\u8CC7\u6599",
      loading: "\u8F09\u5165\u4E2D...",
      noMatch: "\u7121\u7B26\u5408\u8CC7\u6599"
    },
    // 日曆
    calendar: {
      prevMonth: "\u4E0A\u500B\u6708",
      nextMonth: "\u4E0B\u500B\u6708",
      prevYear: "\u4E0A\u4E00\u5E74",
      nextYear: "\u4E0B\u4E00\u5E74",
      today: "\u4ECA\u5929",
      week: "\u9031",
      holiday: "\u4F11",
      workday: "\u73ED",
      monthHeaderFormat: "YYYY \u5E74 MM \u6708",
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
    // 自動完成
    autocomplete: {
      loading: "\u8F09\u5165\u4E2D...",
      placeholder: "\u8ACB\u8F38\u5165",
      noData: "\u66AB\u7121\u8CC7\u6599",
      noMatch: "\u7121\u7B26\u5408\u8CC7\u6599"
    },
    // 倒計時
    countdown: {
      days: "\u5929",
      hours: "\u6642",
      minutes: "\u5206",
      seconds: "\u79D2",
      milliseconds: "\u6BEB\u79D2",
      finished: "\u5DF2\u7D50\u675F"
    },
    // 級聯選擇
    cascader: {
      noMatch: "\u7121\u7B26\u5408\u8CC7\u6599",
      placeholder: "\u8ACB\u9078\u64C7",
      loading: "\u8F09\u5165\u4E2D...",
      noData: "\u66AB\u7121\u8CC7\u6599"
    },
    // 穿梭框
    transfer: {
      noMatch: "\u7121\u7B26\u5408\u8CC7\u6599",
      noData: "\u7121\u8CC7\u6599",
      titles: ["\u5217\u8868 1", "\u5217\u8868 2"],
      filterPlaceholder: "\u8ACB\u8F38\u5165\u641C\u5C0B\u5167\u5BB9",
      noCheckedFormat: "\u5171 {total} \u9805",
      hasCheckedFormat: "\u5DF2\u9078 {checked}/{total} \u9805",
      searchPlaceholder: "\u8ACB\u8F38\u5165\u95DC\u9375\u5B57"
    },
    // 表格
    table: {
      emptyText: "\u66AB\u7121\u8CC7\u6599",
      confirmFilter: "\u7BE9\u9078",
      resetFilter: "\u91CD\u7F6E",
      clearFilter: "\u5168\u90E8",
      sumText: "\u5408\u8A08",
      loading: "\u8F09\u5165\u4E2D...",
      index: "\u5E8F\u865F",
      print: "\u5217\u5370",
      cancel: "\u53D6\u6D88",
      preview: "\u5217\u5370\u9810\u89BD",
      printTime: "\u5217\u5370\u6642\u9593",
      total: "\u5171 {total} \u689D",
      page: "\u7B2C {page} \u9801",
      yes: "\u662F",
      no: "\u5426",
      // 工具欄
      toolbar: {
        refresh: "\u91CD\u65B0\u6574\u7406",
        density: "\u5BC6\u5EA6",
        densityDefault: "\u9810\u8A2D",
        densityLarge: "\u5BEC\u9B06",
        densitySmall: "\u7DCA\u6E4A",
        columnSetting: "\u6B04\u4F4D\u8A2D\u5B9A",
        fullscreen: "\u5168\u87A2\u5E55",
        exitFullscreen: "\u9000\u51FA\u5168\u87A2\u5E55",
        export: "\u532F\u51FA",
        import: "\u532F\u5165",
        search: "\u641C\u5C0B",
        searchPlaceholder: "\u8ACB\u8F38\u5165\u95DC\u9375\u5B57\u641C\u5C0B"
      },
      // 篩選
      filter: {
        selectAll: "\u5168\u9078",
        selectInvert: "\u53CD\u9078",
        empty: "\u70BA\u7A7A",
        notEmpty: "\u4E0D\u70BA\u7A7A",
        contains: "\u5305\u542B",
        notContains: "\u4E0D\u5305\u542B",
        equals: "\u7B49\u65BC",
        notEquals: "\u4E0D\u7B49\u65BC",
        startsWith: "\u958B\u982D\u662F",
        endsWith: "\u7D50\u5C3E\u662F",
        greaterThan: "\u5927\u65BC",
        lessThan: "\u5C0F\u65BC",
        between: "\u4ECB\u65BC"
      },
      // 排序
      sort: {
        asc: "\u5347\u5E8F",
        desc: "\u964D\u5E8F",
        clear: "\u53D6\u6D88\u6392\u5E8F"
      },
      // 匯出
      export: {
        title: "\u532F\u51FA\u8CC7\u6599",
        filename: "\u6A94\u6848\u540D\u7A31",
        type: "\u6A94\u6848\u985E\u578B",
        scope: "\u532F\u51FA\u7BC4\u570D",
        scopeAll: "\u5168\u90E8\u8CC7\u6599",
        scopeSelected: "\u9078\u4E2D\u8CC7\u6599",
        scopeCurrentPage: "\u7576\u524D\u9801\u8CC7\u6599",
        includeHeader: "\u5305\u542B\u8868\u982D",
        exporting: "\u6B63\u5728\u532F\u51FA...",
        success: "\u532F\u51FA\u6210\u529F",
        error: "\u532F\u51FA\u5931\u6557"
      },
      // 匯入
      import: {
        title: "\u532F\u5165\u8CC7\u6599",
        selectFile: "\u9078\u64C7\u6A94\u6848",
        dragTip: "\u9EDE\u9078\u6216\u62D6\u66F3\u6A94\u6848\u5230\u6B64\u8655\u4E0A\u50B3",
        importing: "\u6B63\u5728\u532F\u5165...",
        success: "\u532F\u5165\u6210\u529F",
        error: "\u532F\u5165\u5931\u6557",
        preview: "\u8CC7\u6599\u9810\u89BD",
        confirm: "\u78BA\u8A8D\u532F\u5165"
      },
      // 列印
      printConfig: {
        title: "\u5217\u5370\u8A2D\u5B9A",
        pageTitle: "\u9801\u9762\u6A19\u984C",
        pageHeader: "\u9801\u9996",
        pageFooter: "\u9801\u5C3E",
        printAll: "\u5217\u5370\u5168\u90E8",
        printSelected: "\u5217\u5370\u9078\u4E2D",
        printCurrentPage: "\u5217\u5370\u7576\u524D\u9801",
        landscape: "\u6A6B\u5411",
        portrait: "\u7E31\u5411",
        printing: "\u6B63\u5728\u5217\u5370..."
      },
      // 列設定
      columnSetting: {
        title: "\u6B04\u4F4D\u8A2D\u5B9A",
        showAll: "\u986F\u793A\u5168\u90E8",
        hideAll: "\u96B1\u85CF\u5168\u90E8",
        reset: "\u91CD\u7F6E",
        fixedLeft: "\u56FA\u5B9A\u5728\u5DE6\u5074",
        fixedRight: "\u56FA\u5B9A\u5728\u53F3\u5074",
        unfixed: "\u53D6\u6D88\u56FA\u5B9A"
      },
      // 右鍵選單
      contextMenu: {
        copy: "\u8907\u88FD",
        copyRow: "\u8907\u88FD\u5217",
        copyCell: "\u8907\u88FD\u5132\u5B58\u683C",
        paste: "\u8CBC\u4E0A",
        insertRowAbove: "\u5728\u4E0A\u65B9\u63D2\u5165\u5217",
        insertRowBelow: "\u5728\u4E0B\u65B9\u63D2\u5165\u5217",
        deleteRow: "\u522A\u9664\u5217",
        deleteSelectedRows: "\u522A\u9664\u9078\u4E2D\u5217",
        exportSelected: "\u532F\u51FA\u9078\u4E2D\u8CC7\u6599"
      },
      // 選擇
      selection: {
        selectAll: "\u5168\u9078",
        selectInvert: "\u53CD\u9078",
        selectNone: "\u53D6\u6D88\u9078\u64C7",
        selected: "\u5DF2\u9078\u64C7 {count} \u9805"
      },
      // 展開
      expand: {
        expandAll: "\u5C55\u958B\u5168\u90E8",
        collapseAll: "\u6536\u8D77\u5168\u90E8"
      },
      // 樹形
      tree: {
        expandAll: "\u5C55\u958B\u5168\u90E8",
        collapseAll: "\u6536\u8D77\u5168\u90E8",
        expandLevel: "\u5C55\u958B\u5230\u7B2C {level} \u5C64"
      },
      // 拖拽
      drag: {
        dragTip: "\u62D6\u66F3\u4EE5\u8ABF\u6574\u9806\u5E8F",
        dropTip: "\u91CB\u653E\u4EE5\u653E\u7F6E"
      }
    },
    // 訊息框
    messagebox: {
      title: "\u63D0\u793A",
      confirm: "\u78BA\u5B9A",
      cancel: "\u53D6\u6D88",
      close: "\u95DC\u9589",
      error: "\u8F38\u5165\u7684\u8CC7\u6599\u4E0D\u5408\u6CD5!",
      alert: "\u8B66\u544A",
      prompt: "\u63D0\u793A",
      inputPlaceholder: "\u8ACB\u8F38\u5165"
    },
    // 上傳
    upload: {
      deleteTip: "\u6309 delete \u9375\u53EF\u522A\u9664",
      delete: "\u522A\u9664",
      preview: "\u9810\u89BD",
      continue: "\u7E7C\u7E8C\u4E0A\u50B3",
      upload: "\u9EDE\u9078\u4E0A\u50B3",
      tip: "\u5C07\u6A94\u6848\u62D6\u5230\u6B64\u8655\uFF0C\u6216<em>\u9EDE\u9078\u4E0A\u50B3</em>",
      dragTip: "\u5C07\u6A94\u6848\u62D6\u5230\u6B64\u8655\u4E0A\u50B3",
      uploading: "\u4E0A\u50B3\u4E2D...",
      success: "\u4E0A\u50B3\u6210\u529F",
      error: "\u4E0A\u50B3\u5931\u6557",
      retry: "\u91CD\u8A66",
      cancel: "\u53D6\u6D88\u4E0A\u50B3",
      fileTypeError: "\u6A94\u6848\u985E\u578B\u4E0D\u652F\u63F4",
      fileSizeError: "\u6A94\u6848\u5927\u5C0F\u8D85\u51FA\u9650\u5236",
      fileCountError: "\u6A94\u6848\u6578\u91CF\u8D85\u51FA\u9650\u5236"
    },
    // 表單
    form: {
      validationFailed: "\u9A57\u8B49\u5931\u6557",
      required: "\u5FC5\u586B",
      pleaseInput: "\u8ACB\u8F38\u5165",
      pleaseSelect: "\u8ACB\u9078\u64C7"
    },
    // 按鈕
    button: {
      loading: "\u8F09\u5165\u4E2D..."
    },
    // 輸入框
    input: {
      placeholder: "\u8ACB\u8F38\u5165",
      clear: "\u6E05\u7A7A",
      showPassword: "\u986F\u793A\u5BC6\u78BC",
      hidePassword: "\u96B1\u85CF\u5BC6\u78BC",
      copy: "\u8907\u88FD",
      copied: "\u5DF2\u8907\u88FD"
    },
    // 數字輸入框
    inputnumber: {
      placeholder: "\u8ACB\u8F38\u5165\u6578\u5B57",
      increase: "\u589E\u52A0",
      decrease: "\u6E1B\u5C11"
    },
    // 標籤輸入
    inputtag: {
      placeholder: "\u8ACB\u8F38\u5165",
      add: "\u65B0\u589E",
      remove: "\u79FB\u9664"
    },
    // 麵包屑
    breadcrumb: {
      label: "\u9EB5\u5305\u5C51",
      more: "\u66F4\u591A"
    },
    // 返回頂部
    backtop: {
      text: "\u56DE\u5230\u9802\u90E8"
    },
    // 選擇器
    select: {
      placeholder: "\u8ACB\u9078\u64C7",
      noData: "\u7121\u8CC7\u6599",
      loading: "\u8F09\u5165\u4E2D...",
      noMatch: "\u7121\u7B26\u5408\u8CC7\u6599",
      selectAll: "\u5168\u9078",
      clearAll: "\u6E05\u7A7A"
    },
    // 分頁
    pagination: {
      goto: "\u524D\u5F80",
      page: "\u9801",
      total: "\u5171 {total} \u689D",
      pageSize: "\u689D/\u9801",
      prev: "\u4E0A\u4E00\u9801",
      next: "\u4E0B\u4E00\u9801",
      first: "\u9996\u9801",
      last: "\u672B\u9801",
      pageClassifier: "\u9801"
    },
    // 氣泡確認
    popconfirm: {
      confirm: "\u78BA\u5B9A",
      cancel: "\u53D6\u6D88",
      dontAskAgain: "\u4E0D\u518D\u8A62\u554F"
    },
    // 對話框
    dialog: {
      confirm: "\u78BA\u5B9A",
      cancel: "\u53D6\u6D88",
      close: "\u95DC\u9589",
      maximize: "\u6700\u5927\u5316",
      restore: "\u9084\u539F"
    },
    // 抽屜
    drawer: {
      close: "\u95DC\u9589",
      confirm: "\u78BA\u5B9A",
      cancel: "\u53D6\u6D88"
    },
    // 下拉選單
    dropdown: {
      loading: "\u8F09\u5165\u4E2D..."
    },
    // 圖片
    image: {
      error: "\u8F09\u5165\u5931\u6557",
      loading: "\u8F09\u5165\u4E2D...",
      preview: "\u9810\u89BD",
      zoomIn: "\u653E\u5927",
      zoomOut: "\u7E2E\u5C0F",
      rotateLeft: "\u5411\u5DE6\u65CB\u8F49",
      rotateRight: "\u5411\u53F3\u65CB\u8F49",
      originalSize: "\u539F\u59CB\u5927\u5C0F",
      fullscreen: "\u5168\u87A2\u5E55"
    },
    // 圖片預覽
    imageviewer: {
      close: "\u95DC\u9589",
      prev: "\u4E0A\u4E00\u5F35",
      next: "\u4E0B\u4E00\u5F35",
      zoomIn: "\u653E\u5927",
      zoomOut: "\u7E2E\u5C0F",
      rotateLeft: "\u5411\u5DE6\u65CB\u8F49",
      rotateRight: "\u5411\u53F3\u65CB\u8F49",
      reset: "\u91CD\u7F6E",
      fullscreen: "\u5168\u87A2\u5E55",
      exitFullscreen: "\u9000\u51FA\u5168\u87A2\u5E55"
    },
    // 無限滾動
    infinitescroll: {
      loading: "\u8F09\u5165\u4E2D...",
      finished: "\u6C92\u6709\u66F4\u591A\u4E86",
      error: "\u8F09\u5165\u5931\u6557\uFF0C\u9EDE\u9078\u91CD\u8A66",
      retry: "\u9EDE\u9078\u91CD\u8A66"
    },
    // 訊息
    message: {
      close: "\u95DC\u9589"
    },
    // 通知
    notification: {
      close: "\u95DC\u9589"
    },
    // 載入
    loading: {
      text: "\u8F09\u5165\u4E2D..."
    },
    // 載入中
    spin: {
      text: "\u8F09\u5165\u4E2D..."
    },
    // 評分
    rate: {
      texts: ["\u6975\u5DEE", "\u5931\u671B", "\u4E00\u822C", "\u6EFF\u610F", "\u9A5A\u559C"]
    },
    // 警告
    alert: {
      close: "\u95DC\u9589"
    },
    // 標籤
    tag: {
      close: "\u95DC\u9589"
    },
    // 標籤頁
    tabs: {
      close: "\u95DC\u9589",
      add: "\u65B0\u589E",
      more: "\u66F4\u591A"
    },
    // 步驟條
    steps: {
      finish: "\u5DF2\u5B8C\u6210",
      process: "\u9032\u884C\u4E2D",
      wait: "\u7B49\u5F85\u4E2D",
      error: "\u932F\u8AA4"
    },
    // 進度條
    progress: {
      success: "\u6210\u529F",
      exception: "\u7570\u5E38",
      warning: "\u8B66\u544A"
    },
    // 骨架屏
    skeleton: {
      loading: "\u8F09\u5165\u4E2D..."
    },
    // 空狀態
    empty: {
      description: "\u66AB\u7121\u8CC7\u6599",
      noData: "\u7121\u8CC7\u6599",
      noResult: "\u7121\u7D50\u679C",
      networkError: "\u7DB2\u8DEF\u932F\u8AA4",
      serverError: "\u4F3A\u670D\u5668\u932F\u8AA4"
    },
    // 結果
    result: {
      success: "\u6210\u529F",
      error: "\u932F\u8AA4",
      warning: "\u8B66\u544A",
      info: "\u8CC7\u8A0A",
      backHome: "\u8FD4\u56DE\u9996\u9801"
    },
    // 瀑布流
    waterfall: {
      loading: "\u8F09\u5165\u4E2D...",
      noMore: "\u6C92\u6709\u66F4\u591A\u4E86",
      empty: "\u66AB\u7121\u8CC7\u6599"
    },
    // 描述列表
    descriptions: {
      colon: "\uFF1A"
    },
    // 滑塊
    slider: {
      tipFormatter: "{value}"
    },
    // 開關
    switch: {
      on: "\u958B",
      off: "\u95DC"
    },
    // 複選框
    checkbox: {
      selectAll: "\u5168\u9078"
    },
    // 單選框
    radio: {},
    // 選單
    menu: {
      collapse: "\u6536\u8D77\u9078\u55AE",
      expand: "\u5C55\u958B\u9078\u55AE"
    },
    // 卡片
    card: {
      collapse: "\u6536\u8D77",
      expand: "\u5C55\u958B"
    },
    // 摺疊面板
    collapse: {
      expand: "\u5C55\u958B",
      collapse: "\u6536\u8D77"
    },
    // 工具提示
    tooltip: {},
    // 氣泡卡片
    popover: {},
    // 徽標
    badge: {},
    // 頭像
    avatar: {
      error: "\u8F09\u5165\u5931\u6557"
    },
    // 水印
    watermark: {},
    // 分割線
    divider: {},
    // 走馬燈
    carousel: {
      prev: "\u4E0A\u4E00\u5F35",
      next: "\u4E0B\u4E00\u5F35"
    },
    // 跑馬燈
    marquee: {},
    // 固釘
    affix: {},
    // 錨點
    anchor: {},
    // 提及
    mention: {
      placeholder: "\u8ACB\u8F38\u5165",
      loading: "\u8F09\u5165\u4E2D...",
      noData: "\u66AB\u7121\u8CC7\u6599"
    },
    // AI 组件
    ai: {
      bubble: {
        citations: "\u5F15\u7528"
      },
      mention: {
        placeholder: "@ \u63D0\u53CA Agent\u3001\u6587\u4EF6\u6216\u8868\u683C...",
        agent: "\u667A\u6167\u9AD4",
        document: "\u6587\u4EF6",
        table: "\u8868\u683C",
        knowledge: "\u77E5\u8B58\u5EAB"
      },
      codeBlock: {
        copyCode: "\u8907\u88FD\u4EE3\u78BC",
        copied: "\u5DF2\u8907\u88FD\uFF01",
        run: "\u57F7\u884C\u4EE3\u78BC",
        edit: "\u7DE8\u8F2F",
        save: "\u5132\u5B58",
        cancel: "\u53D6\u6D88"
      },
      codeRunner: {
        run: "\u57F7\u884C",
        stop: "\u505C\u6B62",
        clear: "\u6E05\u7A7A",
        reset: "\u91CD\u7F6E",
        placeholder: "\u9EDE\u9078\u57F7\u884C\u6309\u9215\u57F7\u884C\u4EE3\u78BC..."
      },
      sender: {
        placeholder: "\u50B3\u9001\u8A0A\u606F...",
        dragTip: "\u91CB\u653E\u6ED1\u9F20\u4EE5\u4E0A\u50B3\u6A94\u6848"
      },
      thoughtChain: {
        thoughtProcess: "\u601D\u8003\u904E\u7A0B",
        thinking: "\u601D\u8003\u4E2D...",
        defaultTitle: "\u65B0\u6B65\u9A5F",
        addNode: "\u65B0\u589E\u7BC0\u9EDE"
      },
      thinking: {
        start: "\u958B\u59CB\u601D\u8003",
        thinking: "\u601D\u8003\u4E2D...",
        complete: "\u5DF2\u5B8C\u6210\u601D\u8003",
        error: "\u601D\u8003\u51FA\u932F\u4E86"
      },
      welcome: {
        title: "\u4F60\u597D\uFF0C\u6211\u662F YH AI",
        description: "\u6211\u53EF\u4EE5\u5E6B\u4F60\u5BEB\u7A0B\u5F0F\u3001\u7FFB\u8B6F\u6587\u4EF6\u6216\u9032\u884C\u5275\u610F\u5BEB\u4F5C\u3002\u4ECA\u5929\u6211\u80FD\u70BA\u4F60\u505A\u9EDE\u4EC0\u9EBC\uFF1F"
      },
      action: {
        copy: "\u8907\u88FD",
        regenerate: "\u91CD\u65B0\u751F\u6210",
        share: "\u5206\u4EAB",
        like: "\u8B9A",
        dislike: "\u5012\u8B9A",
        edit: "\u7DE8\u8F2F",
        delete: "\u522A\u9664"
      },
      artifacts: {
        preview: "\u9810\u89BD",
        inline: "\u884C\u5167",
        code: "\u539F\u59CB\u78BC",
        versions: "\u7248\u672C\u6B77\u53F2",
        rendering: "\u6B63\u5728\u6E32\u67D3\u5143\u4EF6...",
        renderingChart: "\u6B63\u5728\u6E32\u67D3\u5716\u8868...",
        renderingCanvas: "\u6B63\u5728\u6E96\u5099\u756B\u677F..."
      },
      voice: {
        trigger: "\u9EDE\u9078\u8AAA\u8A71",
        listening: "\u8046\u807D\u4E2D..."
      },
      agent: {
        uses: "\u6B21\u547C\u53EB",
        use: "\u7ACB\u5373\u4F7F\u7528",
        favorite: "\u6536\u85CF",
        unfavorite: "\u53D6\u6D88\u6536\u85CF",
        share: "\u5206\u4EAB",
        online: "\u7DDA\u4E0A",
        offline: "\u96E2\u7DDA",
        busy: "\u5FD9\u788C",
        verified: "\u5B98\u65B9\u8A8D\u8B49",
        rating: "\u8A55\u5206",
        reviews: "\u5247\u8A55\u50F9",
        responseTime: "\u56DE\u61C9\u6642\u9593",
        ms: "\u6BEB\u79D2"
      },
      sources: {
        references: "\u53C3\u8003\u4F86\u6E90",
        referencedSources: "\u5F15\u7528\u4F86\u6E90",
        relevant: "\u76F8\u95DC\u5EA6",
        viewOriginal: "\u67E5\u770B\u539F\u6587",
        showAll: "\u986F\u793A\u5168\u90E8",
        more: "\u66F4\u591A\u4F86\u6E90",
        drawerTitle: "\u53C3\u8003\u4F86\u6E90",
        expandMore: "\u5C55\u958B\u66F4\u591A",
        collapseMore: "\u6536\u8D77",
        noSources: "\u66AB\u7121\u4F86\u6E90",
        today: "\u4ECA\u5929",
        last7Days: "\u6700\u8FD1 7 \u5929",
        last30Days: "\u6700\u8FD1 30 \u5929",
        earlier: "\u66F4\u65E9",
        pinned: "\u5DF2\u7F6E\u9802"
      },
      conversations: {
        today: "\u4ECA\u5929",
        last7Days: "\u6700\u8FD1 7 \u5929",
        last30Days: "\u6700\u8FD1 30 \u5929",
        earlier: "\u66F4\u65E9",
        pinned: "\u7F6E\u9802",
        pin: "\u7F6E\u9802",
        unpin: "\u53D6\u6D88\u7F6E\u9802",
        newConversation: "\u65B0\u5EFA\u5C0D\u8A71",
        rename: "\u91CD\u65B0\u547D\u540D",
        delete: "\u522A\u9664",
        deleteConfirm: "\u78BA\u8A8D\u522A\u9664\u6B64\u5C0D\u8A71\uFF1F"
      },
      // AiAttachments
      attachments: {
        dropTip: "\u91CB\u653E\u6ED1\u9F20\u4EE5\u4E0A\u50B3\u6A94\u6848",
        clickToUpload: "\u9EDE\u64CA\u6216\u62D6\u62FD\u6A94\u6848\u5230\u6B64\u8655\u4E0A\u50B3",
        uploadSuccess: "\u4E0A\u50B3\u6210\u529F",
        uploadError: "\u4E0A\u50B3\u5931\u6557",
        deleteConfirm: "\u78BA\u5B9A\u522A\u9664\u6B64\u6A94\u6848\uFF1F",
        fileTooLarge: "\u6A94\u6848\u5927\u5C0F\u4E0D\u80FD\u8D85\u904E {size}",
        invalidFileType: "\u4E0D\u652F\u63F4\u7684\u6A94\u6848\u985E\u578B"
      },
      // AiMermaid
      mermaid: {
        image: "\u5716\u7247",
        code: "\u4EE3\u78BC",
        zoomIn: "\u653E\u5927",
        zoomOut: "\u7E2E\u5C0F",
        reset: "\u91CD\u7F6E",
        download: "\u4E0B\u8F09",
        copyCode: "\u8907\u88FD\u4EE3\u78BC",
        rendering: "\u6B63\u5728\u6E32\u67D3...",
        renderError: "\u6E32\u67D3\u5931\u6557",
        renderSuccess: "\u6E32\u67D3\u6210\u529F"
      },
      // AiCanvas
      canvas: {
        reset: "\u91CD\u7F6E",
        zoom: "\u7E2E\u653E",
        zoomIn: "\u653E\u5927",
        zoomOut: "\u7E2E\u5C0F",
        toggleGrid: "\u5207\u63DB\u7DB2\u683C",
        resetView: "\u5C45\u4E2D\u8996\u5716"
      }
    }
  }
};
module.exports = zhMo;