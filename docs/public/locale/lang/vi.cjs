"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vi = exports.default = void 0;
const vi = exports.vi = {
  name: "vi",
  yh: {
    // Chung
    common: {
      yes: "C\xF3",
      no: "Kh\xF4ng",
      confirm: "X\xE1c nh\u1EADn",
      cancel: "H\u1EE7y",
      loading: "\u0110ang t\u1EA3i",
      close: "\u0110\xF3ng",
      clear: "X\xF3a",
      reset: "\u0110\u1EB7t l\u1EA1i",
      save: "L\u01B0u",
      delete: "X\xF3a",
      edit: "Ch\u1EC9nh s\u1EEDa",
      add: "Th\xEAm",
      search: "T\xECm ki\u1EBFm",
      refresh: "L\xE0m m\u1EDBi",
      expand: "M\u1EDF r\u1ED9ng",
      collapse: "Thu g\u1ECDn",
      more: "Th\xEAm",
      noData: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u",
      noMatch: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u kh\u1EDBp",
      selectAll: "Ch\u1ECDn t\u1EA5t c\u1EA3",
      unselectAll: "B\u1ECF ch\u1ECDn t\u1EA5t c\u1EA3"
    },
    // Bộ chọn màu
    colorpicker: {
      confirm: "OK",
      clear: "X\xF3a",
      eyeDropper: "\u1ED0ng nh\u1ECF m\u1EAFt",
      suggestionDark: "V\u0103n b\u1EA3n tr\u1EAFng l\xE0 t\u1ED1t nh\u1EA5t",
      suggestionLight: "V\u0103n b\u1EA3n \u0111en l\xE0 t\u1ED1t nh\u1EA5t",
      recentColors: "M\xE0u g\u1EA7n \u0111\xE2y",
      presetColors: "M\xE0u \u0111\u1EB7t tr\u01B0\u1EDBc"
    },
    // Bộ chọn ngày
    datepicker: {
      now: "B\xE2y gi\u1EDD",
      today: "H\xF4m nay",
      cancel: "H\u1EE7y",
      clear: "X\xF3a",
      confirm: "OK",
      selectDate: "Ch\u1ECDn ng\xE0y",
      selectTime: "Ch\u1ECDn gi\u1EDD",
      startDate: "Ng\xE0y b\u1EAFt \u0111\u1EA7u",
      startTime: "Gi\u1EDD b\u1EAFt \u0111\u1EA7u",
      endDate: "Ng\xE0y k\u1EBFt th\xFAc",
      endTime: "Gi\u1EDD k\u1EBFt th\xFAc",
      year: "",
      month: "",
      day: "",
      week: "Tu\u1EA7n",
      monthBeforeYear: true,
      prevYear: "N\u0103m tr\u01B0\u1EDBc",
      nextYear: "N\u0103m sau",
      prevMonth: "Th\xE1ng tr\u01B0\u1EDBc",
      nextMonth: "Th\xE1ng sau",
      weeks: {
        sun: "CN",
        mon: "T2",
        tue: "T3",
        wed: "T4",
        thu: "T5",
        fri: "T6",
        sat: "T7"
      },
      months: {
        jan: "Th1",
        feb: "Th2",
        mar: "Th3",
        apr: "Th4",
        may: "Th5",
        jun: "Th6",
        jul: "Th7",
        aug: "Th8",
        sep: "Th9",
        oct: "Th10",
        nov: "Th11",
        dec: "Th12"
      },
      quarters: {
        q1: "Q1",
        q2: "Q2",
        q3: "Q3",
        q4: "Q4"
      }
    },
    // Bộ chọn giờ
    timepicker: {
      confirm: "OK",
      cancel: "H\u1EE7y",
      now: "B\xE2y gi\u1EDD",
      placeholder: "Ch\u1ECDn gi\u1EDD",
      startPlaceholder: "Gi\u1EDD b\u1EAFt \u0111\u1EA7u",
      endPlaceholder: "Gi\u1EDD k\u1EBFt th\xFAc",
      selectTime: "Ch\u1ECDn gi\u1EDD"
    },
    // Chọn giờ
    timeselect: {
      placeholder: "Ch\u1ECDn gi\u1EDD"
    },
    // Cây
    tree: {
      emptyText: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u",
      loading: "\u0110ang t\u1EA3i...",
      checkAll: "Ch\u1ECDn t\u1EA5t c\u1EA3",
      uncheckAll: "B\u1ECF ch\u1ECDn t\u1EA5t c\u1EA3",
      expandAll: "M\u1EDF r\u1ED9ng t\u1EA5t c\u1EA3",
      collapseAll: "Thu g\u1ECDn t\u1EA5t c\u1EA3"
    },
    // Chọn cây
    treeselect: {
      placeholder: "Ch\u1ECDn",
      emptyText: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u",
      loading: "\u0110ang t\u1EA3i...",
      noMatch: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u kh\u1EDBp"
    },
    // Lịch
    calendar: {
      prevMonth: "Th\xE1ng tr\u01B0\u1EDBc",
      nextMonth: "Th\xE1ng sau",
      prevYear: "N\u0103m tr\u01B0\u1EDBc",
      nextYear: "N\u0103m sau",
      today: "H\xF4m nay",
      week: "Tu\u1EA7n",
      holiday: "Ng\xE0y l\u1EC5",
      workday: "L\xE0m vi\u1EC7c",
      monthHeaderFormat: "MMMM YYYY",
      weeks: {
        sun: "CN",
        mon: "T2",
        tue: "T3",
        wed: "T4",
        thu: "T5",
        fri: "T6",
        sat: "T7"
      }
    },
    // Tự động hoàn thành
    autocomplete: {
      loading: "\u0110ang t\u1EA3i...",
      placeholder: "Vui l\xF2ng nh\u1EADp",
      noData: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u",
      noMatch: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u kh\u1EDBp"
    },
    // Đếm ngược
    countdown: {
      days: "ng\xE0y",
      hours: "gi\u1EDD",
      minutes: "ph\xFAt",
      seconds: "gi\xE2y",
      milliseconds: "mili gi\xE2y",
      finished: "Ho\xE0n th\xE0nh"
    },
    // Chọn tầng
    cascader: {
      noMatch: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u kh\u1EDBp",
      placeholder: "Ch\u1ECDn",
      loading: "\u0110ang t\u1EA3i...",
      noData: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u"
    },
    // Chuyển giao
    transfer: {
      noMatch: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u kh\u1EDBp",
      noData: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u",
      titles: ["Danh s\xE1ch 1", "Danh s\xE1ch 2"],
      filterPlaceholder: "Nh\u1EADp t\u1EEB kh\xF3a",
      noCheckedFormat: "{total} m\u1EE5c",
      hasCheckedFormat: "{checked}/{total} \u0111\xE3 ch\u1ECDn",
      searchPlaceholder: "Nh\u1EADp t\u1EEB kh\xF3a"
    },
    // Bảng
    table: {
      emptyText: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u",
      confirmFilter: "X\xE1c nh\u1EADn",
      resetFilter: "\u0110\u1EB7t l\u1EA1i",
      clearFilter: "T\u1EA5t c\u1EA3",
      sumText: "T\u1ED5ng",
      loading: "\u0110ang t\u1EA3i...",
      index: "Ch\u1EC9 m\u1EE5c",
      print: "In",
      cancel: "H\u1EE7y",
      preview: "Xem tr\u01B0\u1EDBc khi in",
      printTime: "Th\u1EDDi gian in",
      total: "T\u1ED5ng {total} m\u1EE5c",
      page: "Trang {page}",
      yes: "C\xF3",
      no: "Kh\xF4ng",
      // Thanh công cụ
      toolbar: {
        refresh: "L\xE0m m\u1EDBi",
        density: "M\u1EADt \u0111\u1ED9",
        densityDefault: "M\u1EB7c \u0111\u1ECBnh",
        densityLarge: "L\u1EDBn",
        densitySmall: "Nh\u1ECF",
        columnSetting: "C\xE0i \u0111\u1EB7t c\u1ED9t",
        fullscreen: "To\xE0n m\xE0n h\xECnh",
        exitFullscreen: "Tho\xE1t to\xE0n m\xE0n h\xECnh",
        export: "Xu\u1EA5t",
        import: "Nh\u1EADp",
        search: "T\xECm ki\u1EBFm",
        searchPlaceholder: "Nh\u1EADp t\u1EEB kh\xF3a \u0111\u1EC3 t\xECm ki\u1EBFm"
      },
      // Bộ lọc
      filter: {
        selectAll: "Ch\u1ECDn t\u1EA5t c\u1EA3",
        selectInvert: "\u0110\u1EA3o ng\u01B0\u1EE3c l\u1EF1a ch\u1ECDn",
        empty: "Tr\u1ED1ng",
        notEmpty: "Kh\xF4ng tr\u1ED1ng",
        contains: "Ch\u1EE9a",
        notContains: "Kh\xF4ng ch\u1EE9a",
        equals: "B\u1EB1ng",
        notEquals: "Kh\xF4ng b\u1EB1ng",
        startsWith: "B\u1EAFt \u0111\u1EA7u b\u1EB1ng",
        endsWith: "K\u1EBFt th\xFAc b\u1EB1ng",
        greaterThan: "L\u1EDBn h\u01A1n",
        lessThan: "Nh\u1ECF h\u01A1n",
        between: "Gi\u1EEFa"
      },
      // Sắp xếp
      sort: {
        asc: "T\u0103ng d\u1EA7n",
        desc: "Gi\u1EA3m d\u1EA7n",
        clear: "X\xF3a s\u1EAFp x\u1EBFp"
      },
      // Xuất
      export: {
        title: "Xu\u1EA5t d\u1EEF li\u1EC7u",
        filename: "T\xEAn t\u1EC7p",
        type: "Lo\u1EA1i t\u1EC7p",
        scope: "Ph\u1EA1m vi xu\u1EA5t",
        scopeAll: "T\u1EA5t c\u1EA3 d\u1EEF li\u1EC7u",
        scopeSelected: "D\u1EEF li\u1EC7u \u0111\xE3 ch\u1ECDn",
        scopeCurrentPage: "Trang hi\u1EC7n t\u1EA1i",
        includeHeader: "Bao g\u1ED3m ti\xEAu \u0111\u1EC1",
        exporting: "\u0110ang xu\u1EA5t...",
        success: "Xu\u1EA5t th\xE0nh c\xF4ng",
        error: "Xu\u1EA5t th\u1EA5t b\u1EA1i"
      },
      // Nhập
      import: {
        title: "Nh\u1EADp d\u1EEF li\u1EC7u",
        selectFile: "Ch\u1ECDn t\u1EC7p",
        dragTip: "Nh\u1EA5p ho\u1EB7c k\xE9o t\u1EC7p v\xE0o \u0111\xE2y \u0111\u1EC3 t\u1EA3i l\xEAn",
        importing: "\u0110ang nh\u1EADp...",
        success: "Nh\u1EADp th\xE0nh c\xF4ng",
        error: "Nh\u1EADp th\u1EA5t b\u1EA1i",
        preview: "Xem tr\u01B0\u1EDBc d\u1EEF li\u1EC7u",
        confirm: "X\xE1c nh\u1EADn nh\u1EADp"
      },
      // In
      printConfig: {
        title: "C\xE0i \u0111\u1EB7t in",
        pageTitle: "Ti\xEAu \u0111\u1EC1 trang",
        pageHeader: "\u0110\u1EA7u trang",
        pageFooter: "Ch\xE2n trang",
        printAll: "In t\u1EA5t c\u1EA3",
        printSelected: "In \u0111\xE3 ch\u1ECDn",
        printCurrentPage: "In trang hi\u1EC7n t\u1EA1i",
        landscape: "Ngang",
        portrait: "D\u1ECDc",
        printing: "\u0110ang in..."
      },
      // Cài đặt cột
      columnSetting: {
        title: "C\xE0i \u0111\u1EB7t c\u1ED9t",
        showAll: "Hi\u1EC3n th\u1ECB t\u1EA5t c\u1EA3",
        hideAll: "\u1EA8n t\u1EA5t c\u1EA3",
        reset: "\u0110\u1EB7t l\u1EA1i",
        fixedLeft: "C\u1ED1 \u0111\u1ECBnh b\xEAn tr\xE1i",
        fixedRight: "C\u1ED1 \u0111\u1ECBnh b\xEAn ph\u1EA3i",
        unfixed: "B\u1ECF c\u1ED1 \u0111\u1ECBnh"
      },
      // Menu ngữ cảnh
      contextMenu: {
        copy: "Sao ch\xE9p",
        copyRow: "Sao ch\xE9p h\xE0ng",
        copyCell: "Sao ch\xE9p \xF4",
        paste: "D\xE1n",
        insertRowAbove: "Ch\xE8n h\xE0ng ph\xEDa tr\xEAn",
        insertRowBelow: "Ch\xE8n h\xE0ng ph\xEDa d\u01B0\u1EDBi",
        deleteRow: "X\xF3a h\xE0ng",
        deleteSelectedRows: "X\xF3a c\xE1c h\xE0ng \u0111\xE3 ch\u1ECDn",
        exportSelected: "Xu\u1EA5t \u0111\xE3 ch\u1ECDn"
      },
      // Lựa chọn
      selection: {
        selectAll: "Ch\u1ECDn t\u1EA5t c\u1EA3",
        selectInvert: "\u0110\u1EA3o ng\u01B0\u1EE3c l\u1EF1a ch\u1ECDn",
        selectNone: "X\xF3a l\u1EF1a ch\u1ECDn",
        selected: "\u0110\xE3 ch\u1ECDn {count} m\u1EE5c"
      },
      // Mở rộng
      expand: {
        expandAll: "M\u1EDF r\u1ED9ng t\u1EA5t c\u1EA3",
        collapseAll: "Thu g\u1ECDn t\u1EA5t c\u1EA3"
      },
      // Cây
      tree: {
        expandAll: "M\u1EDF r\u1ED9ng t\u1EA5t c\u1EA3",
        collapseAll: "Thu g\u1ECDn t\u1EA5t c\u1EA3",
        expandLevel: "M\u1EDF r\u1ED9ng \u0111\u1EBFn c\u1EA5p {level}"
      },
      // Kéo
      drag: {
        dragTip: "K\xE9o \u0111\u1EC3 s\u1EAFp x\u1EBFp l\u1EA1i",
        dropTip: "Th\u1EA3 \u0111\u1EC3 \u0111\u1EB7t"
      }
    },
    // Hộp thông báo
    messagebox: {
      title: "Th\xF4ng b\xE1o",
      confirm: "OK",
      cancel: "H\u1EE7y",
      close: "\u0110\xF3ng",
      error: "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7",
      alert: "C\u1EA3nh b\xE1o",
      prompt: "Nh\u1EAFc nh\u1EDF",
      inputPlaceholder: "Vui l\xF2ng nh\u1EADp"
    },
    // Tải lên
    upload: {
      deleteTip: "nh\u1EA5n delete \u0111\u1EC3 x\xF3a",
      delete: "X\xF3a",
      preview: "Xem tr\u01B0\u1EDBc",
      continue: "Ti\u1EBFp t\u1EE5c",
      upload: "Nh\u1EA5p \u0111\u1EC3 t\u1EA3i l\xEAn",
      tip: "Nh\u1EA5p ho\u1EB7c k\xE9o t\u1EC7p v\xE0o khu v\u1EF1c n\xE0y \u0111\u1EC3 <em>t\u1EA3i l\xEAn</em>",
      dragTip: "Th\u1EA3 t\u1EC7p v\xE0o \u0111\xE2y ho\u1EB7c nh\u1EA5p \u0111\u1EC3 t\u1EA3i l\xEAn",
      uploading: "\u0110ang t\u1EA3i l\xEAn...",
      success: "T\u1EA3i l\xEAn th\xE0nh c\xF4ng",
      error: "T\u1EA3i l\xEAn th\u1EA5t b\u1EA1i",
      retry: "Th\u1EED l\u1EA1i",
      cancel: "H\u1EE7y t\u1EA3i l\xEAn",
      fileTypeError: "Lo\u1EA1i t\u1EC7p kh\xF4ng \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3",
      fileSizeError: "K\xEDch th\u01B0\u1EDBc t\u1EC7p v\u01B0\u1EE3t qu\xE1 gi\u1EDBi h\u1EA1n",
      fileCountError: "S\u1ED1 l\u01B0\u1EE3ng t\u1EC7p v\u01B0\u1EE3t qu\xE1 gi\u1EDBi h\u1EA1n"
    },
    // Biểu mẫu
    form: {
      validationFailed: "X\xE1c th\u1EF1c th\u1EA5t b\u1EA1i",
      required: "B\u1EAFt bu\u1ED9c",
      pleaseInput: "Vui l\xF2ng nh\u1EADp",
      pleaseSelect: "Vui l\xF2ng ch\u1ECDn"
    },
    // Nút
    button: {
      loading: "\u0110ang t\u1EA3i..."
    },
    // Đầu vào
    input: {
      placeholder: "Vui l\xF2ng nh\u1EADp",
      clear: "X\xF3a",
      showPassword: "Hi\u1EC3n th\u1ECB m\u1EADt kh\u1EA9u",
      hidePassword: "\u1EA8n m\u1EADt kh\u1EA9u",
      copy: "Sao ch\xE9p",
      copied: "\u0110\xE3 sao ch\xE9p"
    },
    // Đầu vào số
    inputnumber: {
      placeholder: "Vui l\xF2ng nh\u1EADp s\u1ED1",
      increase: "T\u0103ng",
      decrease: "Gi\u1EA3m"
    },
    // Đầu vào thẻ
    inputtag: {
      placeholder: "Vui l\xF2ng nh\u1EADp",
      add: "Th\xEAm",
      remove: "X\xF3a"
    },
    // Breadcrumb
    breadcrumb: {
      label: "Breadcrumb",
      more: "Th\xEAm"
    },
    // Quay lại đầu trang
    backtop: {
      text: "Quay l\u1EA1i \u0111\u1EA7u trang"
    },
    // Chọn
    select: {
      placeholder: "Vui l\xF2ng ch\u1ECDn",
      noData: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u",
      loading: "\u0110ang t\u1EA3i...",
      noMatch: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u kh\u1EDBp",
      selectAll: "Ch\u1ECDn t\u1EA5t c\u1EA3",
      clearAll: "X\xF3a t\u1EA5t c\u1EA3"
    },
    // Phân trang
    pagination: {
      goto: "\u0110i \u0111\u1EBFn",
      page: "",
      total: "T\u1ED5ng {total}",
      pageSize: "/trang",
      prev: "Tr\u01B0\u1EDBc",
      next: "Ti\u1EBFp",
      first: "\u0110\u1EA7u",
      last: "Cu\u1ED1i",
      pageClassifier: ""
    },
    // Xác nhận popup
    popconfirm: {
      confirm: "OK",
      cancel: "H\u1EE7y",
      dontAskAgain: "Kh\xF4ng h\u1ECFi l\u1EA1i"
    },
    // Hộp thoại
    dialog: {
      confirm: "OK",
      cancel: "H\u1EE7y",
      close: "\u0110\xF3ng",
      maximize: "Ph\xF3ng to",
      restore: "Kh\xF4i ph\u1EE5c"
    },
    // Ngăn kéo
    drawer: {
      close: "\u0110\xF3ng",
      confirm: "OK",
      cancel: "H\u1EE7y"
    },
    // Menu thả xuống
    dropdown: {
      loading: "\u0110ang t\u1EA3i..."
    },
    // Hình ảnh
    image: {
      error: "TH\u1EA4T B\u1EA0I",
      loading: "\u0110ang t\u1EA3i...",
      preview: "Xem tr\u01B0\u1EDBc",
      zoomIn: "Ph\xF3ng to",
      zoomOut: "Thu nh\u1ECF",
      rotateLeft: "Xoay tr\xE1i",
      rotateRight: "Xoay ph\u1EA3i",
      originalSize: "K\xEDch th\u01B0\u1EDBc g\u1ED1c",
      fullscreen: "To\xE0n m\xE0n h\xECnh"
    },
    // Trình xem hình ảnh
    imageviewer: {
      close: "\u0110\xF3ng",
      prev: "Tr\u01B0\u1EDBc",
      next: "Ti\u1EBFp",
      zoomIn: "Ph\xF3ng to",
      zoomOut: "Thu nh\u1ECF",
      rotateLeft: "Xoay tr\xE1i",
      rotateRight: "Xoay ph\u1EA3i",
      reset: "\u0110\u1EB7t l\u1EA1i",
      fullscreen: "To\xE0n m\xE0n h\xECnh",
      exitFullscreen: "Tho\xE1t to\xE0n m\xE0n h\xECnh"
    },
    // Cuộn vô hạn
    infinitescroll: {
      loading: "\u0110ang t\u1EA3i...",
      finished: "Kh\xF4ng c\xF2n d\u1EEF li\u1EC7u",
      error: "T\u1EA3i th\u1EA5t b\u1EA1i, nh\u1EA5p \u0111\u1EC3 th\u1EED l\u1EA1i",
      retry: "Nh\u1EA5p \u0111\u1EC3 th\u1EED l\u1EA1i"
    },
    // Thông báo
    message: {
      close: "\u0110\xF3ng"
    },
    // Thông báo
    notification: {
      close: "\u0110\xF3ng"
    },
    // Đang tải
    loading: {
      text: "\u0110ang t\u1EA3i..."
    },
    // Quay
    spin: {
      text: "\u0110ang t\u1EA3i..."
    },
    // Đánh giá
    rate: {
      texts: ["R\u1EA5t k\xE9m", "Th\u1EA5t v\u1ECDng", "B\xECnh th\u01B0\u1EDDng", "H\xE0i l\xF2ng", "Ng\u1EA1c nhi\xEAn"]
    },
    // Cảnh báo
    alert: {
      close: "\u0110\xF3ng"
    },
    // Thẻ
    tag: {
      close: "\u0110\xF3ng"
    },
    // Tab
    tabs: {
      close: "\u0110\xF3ng",
      add: "Th\xEAm",
      more: "Th\xEAm"
    },
    // Bước
    steps: {
      finish: "Ho\xE0n th\xE0nh",
      process: "\u0110ang ti\u1EBFn h\xE0nh",
      wait: "Ch\u1EDD \u0111\u1EE3i",
      error: "L\u1ED7i"
    },
    // Tiến trình
    progress: {
      success: "Th\xE0nh c\xF4ng",
      exception: "Ngo\u1EA1i l\u1EC7",
      warning: "C\u1EA3nh b\xE1o"
    },
    // Bộ xương
    skeleton: {
      loading: "\u0110ang t\u1EA3i..."
    },
    // Trống
    empty: {
      description: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u",
      noData: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u",
      noResult: "Kh\xF4ng c\xF3 k\u1EBFt qu\u1EA3",
      networkError: "L\u1ED7i m\u1EA1ng",
      serverError: "L\u1ED7i m\xE1y ch\u1EE7"
    },
    // Kết quả
    result: {
      success: "Th\xE0nh c\xF4ng",
      error: "L\u1ED7i",
      warning: "C\u1EA3nh b\xE1o",
      info: "Th\xF4ng tin",
      backHome: "V\u1EC1 trang ch\u1EE7"
    },
    // Thác nước
    waterfall: {
      loading: "\u0110ang t\u1EA3i...",
      noMore: "Kh\xF4ng c\xF2n d\u1EEF li\u1EC7u",
      empty: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u"
    },
    // Mô tả
    descriptions: {
      colon: ":"
    },
    // Thanh trượt
    slider: {
      tipFormatter: "{value}"
    },
    // Công tắc
    switch: {
      on: "B\u1EACT",
      off: "T\u1EAET"
    },
    // Hộp kiểm
    checkbox: {
      selectAll: "Ch\u1ECDn t\u1EA5t c\u1EA3"
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: "Thu g\u1ECDn menu",
      expand: "M\u1EDF r\u1ED9ng menu"
    },
    // Thẻ
    card: {
      collapse: "Thu g\u1ECDn",
      expand: "M\u1EDF r\u1ED9ng"
    },
    // Thu gọn
    collapse: {
      expand: "M\u1EDF r\u1ED9ng",
      collapse: "Thu g\u1ECDn"
    },
    // Gợi ý
    tooltip: {},
    // Popover
    popover: {},
    // Huy hiệu
    badge: {},
    // Avatar
    avatar: {
      error: "T\u1EA3i th\u1EA5t b\u1EA1i"
    },
    // Hình mờ
    watermark: {},
    // Dải phân cách
    divider: {},
    // Băng chuyền
    carousel: {
      prev: "Tr\u01B0\u1EDBc",
      next: "Ti\u1EBFp"
    },
    // Marquee
    marquee: {},
    // Gắn cố định
    affix: {},
    // Neo
    anchor: {},
    // Mention
    mention: {
      placeholder: "Vui l\xF2ng nh\u1EADp",
      loading: "\u0110ang t\u1EA3i...",
      noData: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u"
    },
    // AI Components
    ai: {
      bubble: {
        citations: "Tr\xEDch d\u1EABn"
      },
      mention: {
        placeholder: "@ \u0110\u1EC1 c\u1EADp Agent, T\xE0i li\u1EC7u ho\u1EB7c B\u1EA3ng...",
        agent: "Agent",
        document: "T\xE0i li\u1EC7u",
        table: "B\u1EA3ng",
        knowledge: "Ki\u1EBFn th\u1EE9c"
      },
      codeBlock: {
        copyCode: "Sao ch\xE9p m\xE3",
        copied: "\u0110\xE3 sao ch\xE9p!",
        run: "Ch\u1EA1y m\xE3",
        edit: "Ch\u1EC9nh s\u1EEDa",
        save: "L\u01B0u",
        cancel: "H\u1EE7y"
      },
      codeRunner: {
        run: "Ch\u1EA1y",
        stop: "D\u1EEBng",
        clear: "X\xF3a",
        reset: "\u0110\u1EB7t l\u1EA1i",
        placeholder: "Nh\u1EA5n Ch\u1EA1y \u0111\u1EC3 th\u1EF1c thi m\xE3..."
      },
      sender: {
        placeholder: "G\u1EEDi tin nh\u1EAFn...",
        dragTip: "Th\u1EA3 \u0111\u1EC3 t\u1EA3i t\u1EC7p l\xEAn"
      },
      thoughtChain: {
        thoughtProcess: "Qu\xE1 tr\xECnh suy ngh\u0129",
        thinking: "\u0110ang suy ngh\u0129...",
        defaultTitle: "B\u01B0\u1EDBc m\u1EDBi",
        addNode: "Th\xEAm b\u01B0\u1EDBc"
      },
      thinking: {
        start: "B\u1EAFt \u0111\u1EA7u suy ngh\u0129",
        thinking: "\u0110ang suy ngh\u0129...",
        complete: "Suy ngh\u0129 ho\xE0n t\u1EA5t",
        error: "L\u1ED7i suy ngh\u0129"
      },
      welcome: {
        title: "Xin ch\xE0o, t\xF4i l\xE0 YH AI",
        description: "T\xF4i c\xF3 th\u1EC3 gi\xFAp b\u1EA1n v\u1EDBi l\u1EADp tr\xECnh, d\u1ECBch t\xE0i li\u1EC7u ho\u1EB7c vi\u1EBFt s\xE1ng t\u1EA1o. T\xF4i c\xF3 th\u1EC3 gi\xFAp g\xEC cho b\u1EA1n h\xF4m nay?"
      },
      action: {
        copy: "Sao ch\xE9p",
        regenerate: "T\u1EA1o l\u1EA1i",
        share: "Chia s\u1EBB",
        like: "Th\xEDch",
        dislike: "Kh\xF4ng th\xEDch",
        edit: "Ch\u1EC9nh s\u1EEDa",
        delete: "X\xF3a"
      },
      artifacts: {
        preview: "Xem tr\u01B0\u1EDBc",
        inline: "N\u1ED9i d\xF2ng",
        code: "M\xE3 ngu\u1ED3n",
        versions: "Phi\xEAn b\u1EA3n",
        rendering: "\u0110ang hi\u1EC3n th\u1ECB component...",
        renderingChart: "\u0110ang hi\u1EC3n th\u1ECB bi\u1EC3u \u0111\u1ED3...",
        renderingCanvas: "\u0110ang chu\u1EA9n b\u1ECB canvas..."
      },
      voice: {
        trigger: "Nh\u1EA5n \u0111\u1EC3 n\xF3i",
        listening: "\u0110ang nghe..."
      },
      agent: {
        uses: "s\u1EED d\u1EE5ng",
        use: "S\u1EED d\u1EE5ng ngay",
        favorite: "Y\xEAu th\xEDch",
        unfavorite: "B\u1ECF y\xEAu th\xEDch",
        share: "Chia s\u1EBB",
        online: "Tr\u1EF1c tuy\u1EBFn",
        offline: "Ngo\u1EA1i tuy\u1EBFn",
        busy: "B\u1EADn",
        verified: "\u0110\xE3 x\xE1c minh",
        rating: "\u0110\xE1nh gi\xE1",
        reviews: "\u0111\xE1nh gi\xE1",
        responseTime: "Th\u1EDDi gian ph\u1EA3n h\u1ED3i TB",
        ms: "ms"
      },
      sources: {
        references: "T\xE0i li\u1EC7u tham kh\u1EA3o",
        referencedSources: "Ngu\u1ED3n \u0111\u01B0\u1EE3c tr\xEDch d\u1EABn",
        relevant: "M\u1EE9c \u0111\u1ED9 li\xEAn quan",
        viewOriginal: "Xem b\u1EA3n g\u1ED1c",
        showAll: "Hi\u1EC3n th\u1ECB t\u1EA5t c\u1EA3",
        more: "ngu\u1ED3n kh\xE1c",
        drawerTitle: "T\xE0i li\u1EC7u tham kh\u1EA3o",
        expandMore: "Hi\u1EC3n th\u1ECB th\xEAm",
        collapseMore: "Thu g\u1ECDn",
        noSources: "Kh\xF4ng c\xF3 ngu\u1ED3n",
        today: "H\xF4m nay",
        last7Days: "7 ng\xE0y tr\u01B0\u1EDBc",
        last30Days: "30 ng\xE0y tr\u01B0\u1EDBc",
        earlier: "Tr\u01B0\u1EDBc \u0111\xF3",
        pinned: "\u0110\xE3 ghim"
      },
      conversations: {
        today: "H\xF4m nay",
        last7Days: "7 ng\xE0y tr\u01B0\u1EDBc",
        last30Days: "30 ng\xE0y tr\u01B0\u1EDBc",
        earlier: "Tr\u01B0\u1EDBc \u0111\xF3",
        pinned: "\u0110\xE3 ghim",
        pin: "Ghim",
        unpin: "B\u1ECF ghim",
        newConversation: "Cu\u1ED9c tr\xF2 chuy\u1EC7n m\u1EDBi",
        rename: "\u0110\u1ED5i t\xEAn",
        delete: "X\xF3a",
        deleteConfirm: "X\xE1c nh\u1EADn x\xF3a cu\u1ED9c tr\xF2 chuy\u1EC7n n\xE0y?"
      }
    }
  }
};
module.exports = vi;