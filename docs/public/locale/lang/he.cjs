"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.he = exports.default = void 0;
const he = exports.he = {
  name: "he",
  yh: {
    // נפוץ
    common: {
      yes: "\u05DB\u05DF",
      no: "\u05DC\u05D0",
      confirm: "\u05D0\u05D9\u05E9\u05D5\u05E8",
      cancel: "\u05D1\u05D9\u05D8\u05D5\u05DC",
      loading: "\u05D8\u05D5\u05E2\u05DF",
      close: "\u05E1\u05D2\u05D5\u05E8",
      clear: "\u05E0\u05E7\u05D4",
      reset: "\u05D0\u05D9\u05E4\u05D5\u05E1",
      save: "\u05E9\u05DE\u05D5\u05E8",
      delete: "\u05DE\u05D7\u05E7",
      edit: "\u05E2\u05E8\u05D5\u05DA",
      add: "\u05D4\u05D5\u05E1\u05E3",
      search: "\u05D7\u05D9\u05E4\u05D5\u05E9",
      refresh: "\u05E8\u05E2\u05E0\u05D5\u05DF",
      expand: "\u05D4\u05E8\u05D7\u05D1",
      collapse: "\u05DB\u05D5\u05D5\u05E5",
      more: "\u05E2\u05D5\u05D3",
      noData: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      noMatch: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05EA\u05D5\u05D0\u05DE\u05D9\u05DD",
      selectAll: "\u05D1\u05D7\u05E8 \u05D4\u05DB\u05DC",
      unselectAll: "\u05D1\u05D8\u05DC \u05D1\u05D7\u05D9\u05E8\u05D4"
    },
    // בוחר צבעים
    colorpicker: {
      confirm: "\u05D0\u05D9\u05E9\u05D5\u05E8",
      clear: "\u05E0\u05E7\u05D4",
      eyeDropper: "\u05E4\u05D9\u05E4\u05D8\u05D4",
      suggestionDark: "\u05D8\u05E7\u05E1\u05D8 \u05DC\u05D1\u05DF \u05D4\u05D5\u05D0 \u05D4\u05D8\u05D5\u05D1 \u05D1\u05D9\u05D5\u05EA\u05E8",
      suggestionLight: "\u05D8\u05E7\u05E1\u05D8 \u05E9\u05D7\u05D5\u05E8 \u05D4\u05D5\u05D0 \u05D4\u05D8\u05D5\u05D1 \u05D1\u05D9\u05D5\u05EA\u05E8",
      recentColors: "\u05E6\u05D1\u05E2\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD",
      presetColors: "\u05E6\u05D1\u05E2\u05D9\u05DD \u05DE\u05D5\u05D2\u05D3\u05E8\u05D9\u05DD \u05DE\u05E8\u05D0\u05E9"
    },
    // בוחר תאריך
    datepicker: {
      now: "\u05E2\u05DB\u05E9\u05D9\u05D5",
      today: "\u05D4\u05D9\u05D5\u05DD",
      cancel: "\u05D1\u05D9\u05D8\u05D5\u05DC",
      clear: "\u05E0\u05E7\u05D4",
      confirm: "\u05D0\u05D9\u05E9\u05D5\u05E8",
      selectDate: "\u05D1\u05D7\u05E8 \u05EA\u05D0\u05E8\u05D9\u05DA",
      selectTime: "\u05D1\u05D7\u05E8 \u05E9\u05E2\u05D4",
      startDate: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05EA\u05D7\u05DC\u05D4",
      startTime: "\u05E9\u05E2\u05EA \u05D4\u05EA\u05D7\u05DC\u05D4",
      endDate: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05E1\u05D9\u05D5\u05DD",
      endTime: "\u05E9\u05E2\u05EA \u05E1\u05D9\u05D5\u05DD",
      year: "",
      month: "",
      day: "",
      week: "\u05E9\u05D1\u05D5\u05E2",
      monthBeforeYear: true,
      prevYear: "\u05E9\u05E0\u05D4 \u05E7\u05D5\u05D3\u05DE\u05EA",
      nextYear: "\u05E9\u05E0\u05D4 \u05D4\u05D1\u05D0\u05D4",
      prevMonth: "\u05D7\u05D5\u05D3\u05E9 \u05E7\u05D5\u05D3\u05DD",
      nextMonth: "\u05D7\u05D5\u05D3\u05E9 \u05D4\u05D1\u05D0",
      weeks: {
        sun: "\u05D0",
        mon: "\u05D1",
        tue: "\u05D2",
        wed: "\u05D3",
        thu: "\u05D4",
        fri: "\u05D5",
        sat: "\u05E9"
      },
      months: {
        jan: "\u05D9\u05E0\u05D5",
        feb: "\u05E4\u05D1\u05E8",
        mar: "\u05DE\u05E8\u05E5",
        apr: "\u05D0\u05E4\u05E8",
        may: "\u05DE\u05D0\u05D9",
        jun: "\u05D9\u05D5\u05E0",
        jul: "\u05D9\u05D5\u05DC",
        aug: "\u05D0\u05D5\u05D2",
        sep: "\u05E1\u05E4\u05D8",
        oct: "\u05D0\u05D5\u05E7",
        nov: "\u05E0\u05D5\u05D1",
        dec: "\u05D3\u05E6\u05DE"
      },
      quarters: {
        q1: "Q1",
        q2: "Q2",
        q3: "Q3",
        q4: "Q4"
      }
    },
    // בוחר שעה
    timepicker: {
      confirm: "\u05D0\u05D9\u05E9\u05D5\u05E8",
      cancel: "\u05D1\u05D9\u05D8\u05D5\u05DC",
      now: "\u05E2\u05DB\u05E9\u05D9\u05D5",
      placeholder: "\u05D1\u05D7\u05E8 \u05E9\u05E2\u05D4",
      startPlaceholder: "\u05E9\u05E2\u05EA \u05D4\u05EA\u05D7\u05DC\u05D4",
      endPlaceholder: "\u05E9\u05E2\u05EA \u05E1\u05D9\u05D5\u05DD",
      selectTime: "\u05D1\u05D7\u05E8 \u05E9\u05E2\u05D4"
    },
    // בחירת שעה
    timeselect: {
      placeholder: "\u05D1\u05D7\u05E8 \u05E9\u05E2\u05D4"
    },
    // עץ
    tree: {
      emptyText: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      loading: "\u05D8\u05D5\u05E2\u05DF...",
      checkAll: "\u05E1\u05DE\u05DF \u05D4\u05DB\u05DC",
      uncheckAll: "\u05D1\u05D8\u05DC \u05E1\u05D9\u05DE\u05D5\u05DF",
      expandAll: "\u05D4\u05E8\u05D7\u05D1 \u05D4\u05DB\u05DC",
      collapseAll: "\u05DB\u05D5\u05D5\u05E5 \u05D4\u05DB\u05DC"
    },
    // בחירת עץ
    treeselect: {
      placeholder: "\u05D1\u05D7\u05E8",
      emptyText: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      loading: "\u05D8\u05D5\u05E2\u05DF...",
      noMatch: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05EA\u05D5\u05D0\u05DE\u05D9\u05DD"
    },
    // לוח שנה
    calendar: {
      prevMonth: "\u05D7\u05D5\u05D3\u05E9 \u05E7\u05D5\u05D3\u05DD",
      nextMonth: "\u05D7\u05D5\u05D3\u05E9 \u05D4\u05D1\u05D0",
      prevYear: "\u05E9\u05E0\u05D4 \u05E7\u05D5\u05D3\u05DE\u05EA",
      nextYear: "\u05E9\u05E0\u05D4 \u05D4\u05D1\u05D0\u05D4",
      today: "\u05D4\u05D9\u05D5\u05DD",
      week: "\u05E9\u05D1\u05D5\u05E2",
      holiday: "\u05D7\u05D2",
      workday: "\u05E2\u05D1\u05D5\u05D3\u05D4",
      monthHeaderFormat: "MMMM YYYY",
      weeks: {
        sun: "\u05D0",
        mon: "\u05D1",
        tue: "\u05D2",
        wed: "\u05D3",
        thu: "\u05D4",
        fri: "\u05D5",
        sat: "\u05E9"
      }
    },
    // השלמה אוטומטית
    autocomplete: {
      loading: "\u05D8\u05D5\u05E2\u05DF...",
      placeholder: "\u05D0\u05E0\u05D0 \u05D4\u05D6\u05DF",
      noData: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      noMatch: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05EA\u05D5\u05D0\u05DE\u05D9\u05DD"
    },
    // ספירה לאחור
    countdown: {
      days: "\u05D9\u05DE\u05D9\u05DD",
      hours: "\u05E9\u05E2\u05D5\u05EA",
      minutes: "\u05D3\u05E7\u05D5\u05EA",
      seconds: "\u05E9\u05E0\u05D9\u05D5\u05EA",
      milliseconds: "\u05DE\u05D9\u05DC\u05D9\u05E9\u05E0\u05D9\u05D5\u05EA",
      finished: "\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD"
    },
    // קסקייד
    cascader: {
      noMatch: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05EA\u05D5\u05D0\u05DE\u05D9\u05DD",
      placeholder: "\u05D1\u05D7\u05E8",
      loading: "\u05D8\u05D5\u05E2\u05DF...",
      noData: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD"
    },
    // העברה
    transfer: {
      noMatch: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05EA\u05D5\u05D0\u05DE\u05D9\u05DD",
      noData: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      titles: ["\u05E8\u05E9\u05D9\u05DE\u05D4 1", "\u05E8\u05E9\u05D9\u05DE\u05D4 2"],
      filterPlaceholder: "\u05D4\u05D6\u05DF \u05DE\u05D9\u05DC\u05EA \u05DE\u05E4\u05EA\u05D7",
      noCheckedFormat: "{total} \u05E4\u05E8\u05D9\u05D8\u05D9\u05DD",
      hasCheckedFormat: "{checked}/{total} \u05E0\u05D1\u05D7\u05E8\u05D5",
      searchPlaceholder: "\u05D4\u05D6\u05DF \u05DE\u05D9\u05DC\u05EA \u05DE\u05E4\u05EA\u05D7"
    },
    // טבלה
    table: {
      emptyText: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      confirmFilter: "\u05D0\u05D9\u05E9\u05D5\u05E8",
      resetFilter: "\u05D0\u05D9\u05E4\u05D5\u05E1",
      clearFilter: "\u05D4\u05DB\u05DC",
      sumText: "\u05E1\u05DB\u05D5\u05DD",
      loading: "\u05D8\u05D5\u05E2\u05DF...",
      index: "\u05D0\u05D9\u05E0\u05D3\u05E7\u05E1",
      print: "\u05D4\u05D3\u05E4\u05E1",
      cancel: "\u05D1\u05D9\u05D8\u05D5\u05DC",
      preview: "\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4",
      printTime: "\u05D6\u05DE\u05DF \u05D4\u05D3\u05E4\u05E1\u05D4",
      total: '\u05E1\u05D4"\u05DB {total} \u05E4\u05E8\u05D9\u05D8\u05D9\u05DD',
      page: "\u05E2\u05DE\u05D5\u05D3 {page}",
      yes: "\u05DB\u05DF",
      no: "\u05DC\u05D0",
      // סרגל כלים
      toolbar: {
        refresh: "\u05E8\u05E2\u05E0\u05D5\u05DF",
        density: "\u05E6\u05E4\u05D9\u05E4\u05D5\u05EA",
        densityDefault: "\u05D1\u05E8\u05D9\u05E8\u05EA \u05DE\u05D7\u05D3\u05DC",
        densityLarge: "\u05D2\u05D3\u05D5\u05DC",
        densitySmall: "\u05E7\u05D8\u05DF",
        columnSetting: "\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05E2\u05DE\u05D5\u05D3\u05D5\u05EA",
        fullscreen: "\u05DE\u05E1\u05DA \u05DE\u05DC\u05D0",
        exitFullscreen: "\u05E6\u05D0 \u05DE\u05DE\u05E1\u05DA \u05DE\u05DC\u05D0",
        export: "\u05D9\u05D9\u05E6\u05D5\u05D0",
        import: "\u05D9\u05D9\u05D1\u05D5\u05D0",
        search: "\u05D7\u05D9\u05E4\u05D5\u05E9",
        searchPlaceholder: "\u05D4\u05D6\u05DF \u05DE\u05D9\u05DC\u05D5\u05EA \u05DE\u05E4\u05EA\u05D7 \u05DC\u05D7\u05D9\u05E4\u05D5\u05E9"
      },
      // מסנן
      filter: {
        selectAll: "\u05D1\u05D7\u05E8 \u05D4\u05DB\u05DC",
        selectInvert: "\u05D4\u05E4\u05D5\u05DA \u05D1\u05D7\u05D9\u05E8\u05D4",
        empty: "\u05E8\u05D9\u05E7",
        notEmpty: "\u05DC\u05D0 \u05E8\u05D9\u05E7",
        contains: "\u05DE\u05DB\u05D9\u05DC",
        notContains: "\u05DC\u05D0 \u05DE\u05DB\u05D9\u05DC",
        equals: "\u05E9\u05D5\u05D5\u05D4",
        notEquals: "\u05DC\u05D0 \u05E9\u05D5\u05D5\u05D4",
        startsWith: "\u05DE\u05EA\u05D7\u05D9\u05DC \u05D1",
        endsWith: "\u05DE\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1",
        greaterThan: "\u05D2\u05D3\u05D5\u05DC \u05DE",
        lessThan: "\u05E7\u05D8\u05DF \u05DE",
        between: "\u05D1\u05D9\u05DF"
      },
      // מיון
      sort: {
        asc: "\u05E2\u05D5\u05DC\u05D4",
        desc: "\u05D9\u05D5\u05E8\u05D3",
        clear: "\u05E0\u05E7\u05D4 \u05DE\u05D9\u05D5\u05DF"
      },
      // ייצוא
      export: {
        title: "\u05D9\u05D9\u05E6\u05D5\u05D0 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
        filename: "\u05E9\u05DD \u05E7\u05D5\u05D1\u05E5",
        type: "\u05E1\u05D5\u05D2 \u05E7\u05D5\u05D1\u05E5",
        scope: "\u05D4\u05D9\u05E7\u05E3 \u05D9\u05D9\u05E6\u05D5\u05D0",
        scopeAll: "\u05DB\u05DC \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
        scopeSelected: "\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E0\u05D1\u05D7\u05E8\u05D9\u05DD",
        scopeCurrentPage: "\u05E2\u05DE\u05D5\u05D3 \u05E0\u05D5\u05DB\u05D7\u05D9",
        includeHeader: "\u05DB\u05DC\u05D5\u05DC \u05DB\u05D5\u05EA\u05E8\u05EA",
        exporting: "\u05DE\u05D9\u05D9\u05E6\u05D0...",
        success: "\u05D9\u05D9\u05E6\u05D5\u05D0 \u05D4\u05E6\u05DC\u05D9\u05D7",
        error: "\u05D9\u05D9\u05E6\u05D5\u05D0 \u05E0\u05DB\u05E9\u05DC"
      },
      // ייבוא
      import: {
        title: "\u05D9\u05D9\u05D1\u05D5\u05D0 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
        selectFile: "\u05D1\u05D7\u05E8 \u05E7\u05D5\u05D1\u05E5",
        dragTip: "\u05DC\u05D7\u05E5 \u05D0\u05D5 \u05D2\u05E8\u05D5\u05E8 \u05E7\u05D5\u05D1\u05E5 \u05DC\u05DB\u05D0\u05DF \u05DC\u05D4\u05E2\u05DC\u05D0\u05D4",
        importing: "\u05DE\u05D9\u05D9\u05D1\u05D0...",
        success: "\u05D9\u05D9\u05D1\u05D5\u05D0 \u05D4\u05E6\u05DC\u05D9\u05D7",
        error: "\u05D9\u05D9\u05D1\u05D5\u05D0 \u05E0\u05DB\u05E9\u05DC",
        preview: "\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4 \u05E9\u05DC \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
        confirm: "\u05D0\u05E9\u05E8 \u05D9\u05D9\u05D1\u05D5\u05D0"
      },
      // הדפסה
      printConfig: {
        title: "\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05D4\u05D3\u05E4\u05E1\u05D4",
        pageTitle: "\u05DB\u05D5\u05EA\u05E8\u05EA \u05E2\u05DE\u05D5\u05D3",
        pageHeader: "\u05DB\u05D5\u05EA\u05E8\u05EA \u05E2\u05DC\u05D9\u05D5\u05E0\u05D4",
        pageFooter: "\u05DB\u05D5\u05EA\u05E8\u05EA \u05EA\u05D7\u05EA\u05D5\u05E0\u05D4",
        printAll: "\u05D4\u05D3\u05E4\u05E1 \u05D4\u05DB\u05DC",
        printSelected: "\u05D4\u05D3\u05E4\u05E1 \u05E0\u05D1\u05D7\u05E8",
        printCurrentPage: "\u05D4\u05D3\u05E4\u05E1 \u05E2\u05DE\u05D5\u05D3 \u05E0\u05D5\u05DB\u05D7\u05D9",
        landscape: "\u05D0\u05D5\u05E4\u05E7\u05D9",
        portrait: "\u05D0\u05E0\u05DB\u05D9",
        printing: "\u05DE\u05D3\u05E4\u05D9\u05E1..."
      },
      // הגדרות עמודות
      columnSetting: {
        title: "\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05E2\u05DE\u05D5\u05D3\u05D5\u05EA",
        showAll: "\u05D4\u05E6\u05D2 \u05D4\u05DB\u05DC",
        hideAll: "\u05D4\u05E1\u05EA\u05E8 \u05D4\u05DB\u05DC",
        reset: "\u05D0\u05D9\u05E4\u05D5\u05E1",
        fixedLeft: "\u05E7\u05D1\u05E2 \u05DC\u05E9\u05DE\u05D0\u05DC",
        fixedRight: "\u05E7\u05D1\u05E2 \u05DC\u05D9\u05DE\u05D9\u05DF",
        unfixed: "\u05E9\u05D7\u05E8\u05E8"
      },
      // תפריט הקשר
      contextMenu: {
        copy: "\u05D4\u05E2\u05EA\u05E7",
        copyRow: "\u05D4\u05E2\u05EA\u05E7 \u05E9\u05D5\u05E8\u05D4",
        copyCell: "\u05D4\u05E2\u05EA\u05E7 \u05EA\u05D0",
        paste: "\u05D4\u05D3\u05D1\u05E7",
        insertRowAbove: "\u05D4\u05D5\u05E1\u05E3 \u05E9\u05D5\u05E8\u05D4 \u05DC\u05DE\u05E2\u05DC\u05D4",
        insertRowBelow: "\u05D4\u05D5\u05E1\u05E3 \u05E9\u05D5\u05E8\u05D4 \u05DC\u05DE\u05D8\u05D4",
        deleteRow: "\u05DE\u05D7\u05E7 \u05E9\u05D5\u05E8\u05D4",
        deleteSelectedRows: "\u05DE\u05D7\u05E7 \u05E9\u05D5\u05E8\u05D5\u05EA \u05E0\u05D1\u05D7\u05E8\u05D5\u05EA",
        exportSelected: "\u05D9\u05D9\u05E6\u05D0 \u05E0\u05D1\u05D7\u05E8"
      },
      // בחירה
      selection: {
        selectAll: "\u05D1\u05D7\u05E8 \u05D4\u05DB\u05DC",
        selectInvert: "\u05D4\u05E4\u05D5\u05DA \u05D1\u05D7\u05D9\u05E8\u05D4",
        selectNone: "\u05E0\u05E7\u05D4 \u05D1\u05D7\u05D9\u05E8\u05D4",
        selected: "{count} \u05E4\u05E8\u05D9\u05D8\u05D9\u05DD \u05E0\u05D1\u05D7\u05E8\u05D5"
      },
      // הרחבה
      expand: {
        expandAll: "\u05D4\u05E8\u05D7\u05D1 \u05D4\u05DB\u05DC",
        collapseAll: "\u05DB\u05D5\u05D5\u05E5 \u05D4\u05DB\u05DC"
      },
      // עץ
      tree: {
        expandAll: "\u05D4\u05E8\u05D7\u05D1 \u05D4\u05DB\u05DC",
        collapseAll: "\u05DB\u05D5\u05D5\u05E5 \u05D4\u05DB\u05DC",
        expandLevel: "\u05D4\u05E8\u05D7\u05D1 \u05DC\u05E8\u05DE\u05D4 {level}"
      },
      // גרירה
      drag: {
        dragTip: "\u05D2\u05E8\u05D5\u05E8 \u05DC\u05E1\u05D9\u05D3\u05D5\u05E8 \u05DE\u05D7\u05D3\u05E9",
        dropTip: "\u05E9\u05D7\u05E8\u05E8 \u05DC\u05DE\u05D9\u05E7\u05D5\u05DD"
      }
    },
    // תיבת הודעה
    messagebox: {
      title: "\u05D4\u05D5\u05D3\u05E2\u05D4",
      confirm: "\u05D0\u05D9\u05E9\u05D5\u05E8",
      cancel: "\u05D1\u05D9\u05D8\u05D5\u05DC",
      close: "\u05E1\u05D2\u05D5\u05E8",
      error: "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05D7\u05D5\u05E7\u05D9",
      alert: "\u05D4\u05EA\u05E8\u05D0\u05D4",
      prompt: "\u05D1\u05E7\u05E9\u05D4",
      inputPlaceholder: "\u05D0\u05E0\u05D0 \u05D4\u05D6\u05DF"
    },
    // העלאה
    upload: {
      deleteTip: "\u05DC\u05D7\u05E5 delete \u05DC\u05D4\u05E1\u05E8\u05D4",
      delete: "\u05DE\u05D7\u05E7",
      preview: "\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4",
      continue: "\u05D4\u05DE\u05E9\u05DA",
      upload: "\u05DC\u05D7\u05E5 \u05DC\u05D4\u05E2\u05DC\u05D0\u05D4",
      tip: "\u05DC\u05D7\u05E5 \u05D0\u05D5 \u05D2\u05E8\u05D5\u05E8 \u05E7\u05D5\u05D1\u05E5 \u05DC\u05D0\u05D6\u05D5\u05E8 \u05D6\u05D4 \u05DB\u05D3\u05D9 <em>\u05DC\u05D4\u05E2\u05DC\u05D5\u05EA</em>",
      dragTip: "\u05E9\u05D7\u05E8\u05E8 \u05E7\u05D5\u05D1\u05E5 \u05DB\u05D0\u05DF \u05D0\u05D5 \u05DC\u05D7\u05E5 \u05DC\u05D4\u05E2\u05DC\u05D0\u05D4",
      uploading: "\u05DE\u05E2\u05DC\u05D4...",
      success: "\u05D4\u05E2\u05DC\u05D0\u05D4 \u05D4\u05E6\u05DC\u05D9\u05D7\u05D4",
      error: "\u05D4\u05E2\u05DC\u05D0\u05D4 \u05E0\u05DB\u05E9\u05DC\u05D4",
      retry: "\u05E0\u05E1\u05D4 \u05E9\u05D5\u05D1",
      cancel: "\u05D1\u05D8\u05DC \u05D4\u05E2\u05DC\u05D0\u05D4",
      fileTypeError: "\u05E1\u05D5\u05D2 \u05E7\u05D5\u05D1\u05E5 \u05DC\u05D0 \u05E0\u05EA\u05DE\u05DA",
      fileSizeError: "\u05D2\u05D5\u05D3\u05DC \u05E7\u05D5\u05D1\u05E5 \u05D7\u05D5\u05E8\u05D2 \u05DE\u05D4\u05D2\u05D1\u05D5\u05DC",
      fileCountError: "\u05DE\u05E1\u05E4\u05E8 \u05E7\u05D1\u05E6\u05D9\u05DD \u05D7\u05D5\u05E8\u05D2 \u05DE\u05D4\u05D2\u05D1\u05D5\u05DC"
    },
    // טופס
    form: {
      validationFailed: "\u05D0\u05D9\u05DE\u05D5\u05EA \u05E0\u05DB\u05E9\u05DC",
      required: "\u05E0\u05D3\u05E8\u05E9",
      pleaseInput: "\u05D0\u05E0\u05D0 \u05D4\u05D6\u05DF",
      pleaseSelect: "\u05D0\u05E0\u05D0 \u05D1\u05D7\u05E8"
    },
    // כפתור
    button: {
      loading: "\u05D8\u05D5\u05E2\u05DF..."
    },
    // קלט
    input: {
      placeholder: "\u05D0\u05E0\u05D0 \u05D4\u05D6\u05DF",
      clear: "\u05E0\u05E7\u05D4",
      showPassword: "\u05D4\u05E6\u05D2 \u05E1\u05D9\u05E1\u05DE\u05D4",
      hidePassword: "\u05D4\u05E1\u05EA\u05E8 \u05E1\u05D9\u05E1\u05DE\u05D4",
      copy: "\u05D4\u05E2\u05EA\u05E7",
      copied: "\u05D4\u05D5\u05E2\u05EA\u05E7"
    },
    // קלט מספר
    inputnumber: {
      placeholder: "\u05D0\u05E0\u05D0 \u05D4\u05D6\u05DF \u05DE\u05E1\u05E4\u05E8",
      increase: "\u05D4\u05D2\u05D3\u05DC",
      decrease: "\u05D4\u05E7\u05D8\u05DF"
    },
    // קלט תג
    inputtag: {
      placeholder: "\u05D0\u05E0\u05D0 \u05D4\u05D6\u05DF",
      add: "\u05D4\u05D5\u05E1\u05E3",
      remove: "\u05D4\u05E1\u05E8"
    },
    // פירורי לחם
    breadcrumb: {
      label: "\u05E4\u05D9\u05E8\u05D5\u05E8\u05D9 \u05DC\u05D7\u05DD",
      more: "\u05E2\u05D5\u05D3"
    },
    // חזרה למעלה
    backtop: {
      text: "\u05D7\u05D6\u05E8\u05D4 \u05DC\u05DE\u05E2\u05DC\u05D4"
    },
    // בחירה
    select: {
      placeholder: "\u05D0\u05E0\u05D0 \u05D1\u05D7\u05E8",
      noData: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      loading: "\u05D8\u05D5\u05E2\u05DF...",
      noMatch: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05EA\u05D5\u05D0\u05DE\u05D9\u05DD",
      selectAll: "\u05D1\u05D7\u05E8 \u05D4\u05DB\u05DC",
      clearAll: "\u05E0\u05E7\u05D4 \u05D4\u05DB\u05DC"
    },
    // עימוד
    pagination: {
      goto: "\u05E2\u05D1\u05D5\u05E8 \u05DC",
      page: "",
      total: '\u05E1\u05D4"\u05DB {total}',
      pageSize: "/\u05E2\u05DE\u05D5\u05D3",
      prev: "\u05D4\u05E7\u05D5\u05D3\u05DD",
      next: "\u05D4\u05D1\u05D0",
      first: "\u05E8\u05D0\u05E9\u05D5\u05DF",
      last: "\u05D0\u05D7\u05E8\u05D5\u05DF",
      pageClassifier: ""
    },
    // אישור קופץ
    popconfirm: {
      confirm: "\u05D0\u05D9\u05E9\u05D5\u05E8",
      cancel: "\u05D1\u05D9\u05D8\u05D5\u05DC",
      dontAskAgain: "\u05D0\u05DC \u05EA\u05E9\u05D0\u05DC \u05E9\u05D5\u05D1"
    },
    // דיאלוג
    dialog: {
      confirm: "\u05D0\u05D9\u05E9\u05D5\u05E8",
      cancel: "\u05D1\u05D9\u05D8\u05D5\u05DC",
      close: "\u05E1\u05D2\u05D5\u05E8",
      maximize: "\u05D4\u05D2\u05D3\u05DC \u05DC\u05DE\u05E7\u05E1\u05D9\u05DE\u05D5\u05DD",
      restore: "\u05E9\u05D7\u05D6\u05E8"
    },
    // מגירה
    drawer: {
      close: "\u05E1\u05D2\u05D5\u05E8",
      confirm: "\u05D0\u05D9\u05E9\u05D5\u05E8",
      cancel: "\u05D1\u05D9\u05D8\u05D5\u05DC"
    },
    // תפריט נפתח
    dropdown: {
      loading: "\u05D8\u05D5\u05E2\u05DF..."
    },
    // תמונה
    image: {
      error: "\u05E0\u05DB\u05E9\u05DC",
      loading: "\u05D8\u05D5\u05E2\u05DF...",
      preview: "\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4",
      zoomIn: "\u05D4\u05D2\u05D3\u05DC",
      zoomOut: "\u05D4\u05E7\u05D8\u05DF",
      rotateLeft: "\u05E1\u05D5\u05D1\u05D1 \u05E9\u05DE\u05D0\u05DC\u05D4",
      rotateRight: "\u05E1\u05D5\u05D1\u05D1 \u05D9\u05DE\u05D9\u05E0\u05D4",
      originalSize: "\u05D2\u05D5\u05D3\u05DC \u05DE\u05E7\u05D5\u05E8\u05D9",
      fullscreen: "\u05DE\u05E1\u05DA \u05DE\u05DC\u05D0"
    },
    // מציג תמונות
    imageviewer: {
      close: "\u05E1\u05D2\u05D5\u05E8",
      prev: "\u05D4\u05E7\u05D5\u05D3\u05DD",
      next: "\u05D4\u05D1\u05D0",
      zoomIn: "\u05D4\u05D2\u05D3\u05DC",
      zoomOut: "\u05D4\u05E7\u05D8\u05DF",
      rotateLeft: "\u05E1\u05D5\u05D1\u05D1 \u05E9\u05DE\u05D0\u05DC\u05D4",
      rotateRight: "\u05E1\u05D5\u05D1\u05D1 \u05D9\u05DE\u05D9\u05E0\u05D4",
      reset: "\u05D0\u05D9\u05E4\u05D5\u05E1",
      fullscreen: "\u05DE\u05E1\u05DA \u05DE\u05DC\u05D0",
      exitFullscreen: "\u05E6\u05D0 \u05DE\u05DE\u05E1\u05DA \u05DE\u05DC\u05D0"
    },
    // גלילה אינסופית
    infinitescroll: {
      loading: "\u05D8\u05D5\u05E2\u05DF...",
      finished: "\u05D0\u05D9\u05DF \u05E2\u05D5\u05D3 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      error: "\u05D8\u05E2\u05D9\u05E0\u05D4 \u05E0\u05DB\u05E9\u05DC\u05D4, \u05DC\u05D7\u05E5 \u05DC\u05E0\u05D9\u05E1\u05D9\u05D5\u05DF \u05D7\u05D5\u05D6\u05E8",
      retry: "\u05DC\u05D7\u05E5 \u05DC\u05E0\u05D9\u05E1\u05D9\u05D5\u05DF \u05D7\u05D5\u05D6\u05E8"
    },
    // הודעה
    message: {
      close: "\u05E1\u05D2\u05D5\u05E8"
    },
    // התראה
    notification: {
      close: "\u05E1\u05D2\u05D5\u05E8"
    },
    // טעינה
    loading: {
      text: "\u05D8\u05D5\u05E2\u05DF..."
    },
    // סיבוב
    spin: {
      text: "\u05D8\u05D5\u05E2\u05DF..."
    },
    // דירוג
    rate: {
      texts: ["\u05D2\u05E8\u05D5\u05E2 \u05DE\u05D0\u05D5\u05D3", "\u05DE\u05D0\u05D5\u05DB\u05D6\u05D1", "\u05D4\u05D5\u05D2\u05DF", "\u05DE\u05E8\u05D5\u05E6\u05D4", "\u05DE\u05D5\u05E4\u05EA\u05E2"]
    },
    // התראה
    alert: {
      close: "\u05E1\u05D2\u05D5\u05E8"
    },
    // תג
    tag: {
      close: "\u05E1\u05D2\u05D5\u05E8"
    },
    // כרטיסיות
    tabs: {
      close: "\u05E1\u05D2\u05D5\u05E8",
      add: "\u05D4\u05D5\u05E1\u05E3",
      more: "\u05E2\u05D5\u05D3"
    },
    // שלבים
    steps: {
      finish: "\u05D4\u05D5\u05E9\u05DC\u05DD",
      process: "\u05D1\u05EA\u05D4\u05DC\u05D9\u05DA",
      wait: "\u05DE\u05DE\u05EA\u05D9\u05DF",
      error: "\u05E9\u05D2\u05D9\u05D0\u05D4"
    },
    // התקדמות
    progress: {
      success: "\u05D4\u05E6\u05DC\u05D7\u05D4",
      exception: "\u05D9\u05D5\u05E6\u05D0 \u05D3\u05D5\u05E4\u05DF",
      warning: "\u05D0\u05D6\u05D4\u05E8\u05D4"
    },
    // שלד
    skeleton: {
      loading: "\u05D8\u05D5\u05E2\u05DF..."
    },
    // ריק
    empty: {
      description: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      noData: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      noResult: "\u05D0\u05D9\u05DF \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA",
      networkError: "\u05E9\u05D2\u05D9\u05D0\u05EA \u05E8\u05E9\u05EA",
      serverError: "\u05E9\u05D2\u05D9\u05D0\u05EA \u05E9\u05E8\u05EA"
    },
    // תוצאה
    result: {
      success: "\u05D4\u05E6\u05DC\u05D7\u05D4",
      error: "\u05E9\u05D2\u05D9\u05D0\u05D4",
      warning: "\u05D0\u05D6\u05D4\u05E8\u05D4",
      info: "\u05DE\u05D9\u05D3\u05E2",
      backHome: "\u05D7\u05D6\u05E8\u05D4 \u05DC\u05D3\u05E3 \u05D4\u05D1\u05D9\u05EA"
    },
    // מפל
    waterfall: {
      loading: "\u05D8\u05D5\u05E2\u05DF...",
      noMore: "\u05D0\u05D9\u05DF \u05E2\u05D5\u05D3 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      empty: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD"
    },
    // תיאורים
    descriptions: {
      colon: ":"
    },
    // מחוון
    slider: {
      tipFormatter: "{value}"
    },
    // מתג
    switch: {
      on: "\u05E4\u05D5\u05E2\u05DC",
      off: "\u05DB\u05D1\u05D5\u05D9"
    },
    // תיבת סימון
    checkbox: {
      selectAll: "\u05D1\u05D7\u05E8 \u05D4\u05DB\u05DC"
    },
    // רדיו
    radio: {},
    // תפריט
    menu: {
      collapse: "\u05DB\u05D5\u05D5\u05E5 \u05EA\u05E4\u05E8\u05D9\u05D8",
      expand: "\u05D4\u05E8\u05D7\u05D1 \u05EA\u05E4\u05E8\u05D9\u05D8"
    },
    // כרטיס
    card: {
      collapse: "\u05DB\u05D5\u05D5\u05E5",
      expand: "\u05D4\u05E8\u05D7\u05D1"
    },
    // כיווץ
    collapse: {
      expand: "\u05D4\u05E8\u05D7\u05D1",
      collapse: "\u05DB\u05D5\u05D5\u05E5"
    },
    // רמז
    tooltip: {},
    // חלון קופץ
    popover: {},
    // תג
    badge: {},
    // אווטר
    avatar: {
      error: "\u05D8\u05E2\u05D9\u05E0\u05D4 \u05E0\u05DB\u05E9\u05DC\u05D4"
    },
    // סימן מים
    watermark: {},
    // מפריד
    divider: {},
    // קרוסלה
    carousel: {
      prev: "\u05D4\u05E7\u05D5\u05D3\u05DD",
      next: "\u05D4\u05D1\u05D0"
    },
    // מרקיז
    marquee: {},
    // היצמדות
    affix: {},
    // עוגן
    anchor: {},
    // Mention
    mention: {
      placeholder: "\u05D0\u05E0\u05D0 \u05D4\u05D6\u05DF",
      loading: "\u05D8\u05D5\u05E2\u05DF...",
      noData: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD"
    },
    // AI Components
    ai: {
      bubble: {
        citations: "\u05E6\u05D9\u05D8\u05D5\u05D8\u05D9\u05DD"
      },
      mention: {
        placeholder: "@ \u05D4\u05D6\u05DB\u05E8 \u05E1\u05D5\u05DB\u05DF, \u05DE\u05E1\u05DE\u05DA \u05D0\u05D5 \u05D8\u05D1\u05DC\u05D4...",
        agent: "\u05E1\u05D5\u05DB\u05DF",
        document: "\u05DE\u05E1\u05DE\u05DA",
        table: "\u05D8\u05D1\u05DC\u05D4",
        knowledge: "\u05D9\u05D3\u05E2"
      },
      codeBlock: {
        copyCode: "\u05D4\u05E2\u05EA\u05E7 \u05E7\u05D5\u05D3",
        copied: "\u05D4\u05D5\u05E2\u05EA\u05E7!",
        run: "\u05D4\u05E8\u05E5 \u05E7\u05D5\u05D3",
        edit: "\u05E2\u05E8\u05D5\u05DA",
        save: "\u05E9\u05DE\u05D5\u05E8",
        cancel: "\u05D1\u05D8\u05DC"
      },
      codeRunner: {
        run: "\u05D4\u05E8\u05E5",
        stop: "\u05E2\u05E6\u05D5\u05E8",
        clear: "\u05E0\u05E7\u05D4",
        reset: "\u05D0\u05E4\u05E1",
        placeholder: "\u05DC\u05D7\u05E5 \u05E2\u05DC \u05D4\u05E8\u05E5 \u05DC\u05D4\u05E4\u05E2\u05DC\u05EA \u05D4\u05E7\u05D5\u05D3..."
      },
      sender: {
        placeholder: "\u05E9\u05DC\u05D7 \u05D4\u05D5\u05D3\u05E2\u05D4...",
        dragTip: "\u05E9\u05D7\u05E8\u05E8 \u05DC\u05D4\u05E2\u05DC\u05D0\u05EA \u05E7\u05D1\u05E6\u05D9\u05DD"
      },
      thoughtChain: {
        thoughtProcess: "\u05EA\u05D4\u05DC\u05D9\u05DA \u05D7\u05E9\u05D9\u05D1\u05D4",
        thinking: "\u05D7\u05D5\u05E9\u05D1...",
        defaultTitle: "\u05E9\u05DC\u05D1 \u05D7\u05D3\u05E9",
        addNode: "\u05D4\u05D5\u05E1\u05E3 \u05E9\u05DC\u05D1"
      },
      thinking: {
        start: "\u05D4\u05EA\u05D7\u05DC \u05DC\u05D7\u05E9\u05D5\u05D1",
        thinking: "\u05D7\u05D5\u05E9\u05D1...",
        complete: "\u05D4\u05D7\u05E9\u05D9\u05D1\u05D4 \u05D4\u05D5\u05E9\u05DC\u05DE\u05D4",
        error: "\u05E9\u05D2\u05D9\u05D0\u05EA \u05D7\u05E9\u05D9\u05D1\u05D4"
      },
      welcome: {
        title: "\u05E9\u05DC\u05D5\u05DD, \u05D0\u05E0\u05D9 YH AI",
        description: "\u05D0\u05E0\u05D9 \u05D9\u05DB\u05D5\u05DC \u05DC\u05E2\u05D6\u05D5\u05E8 \u05DC\u05DA \u05D1\u05EA\u05DB\u05E0\u05D5\u05EA, \u05EA\u05E8\u05D2\u05D5\u05DD \u05DE\u05E1\u05DE\u05DB\u05D9\u05DD \u05D0\u05D5 \u05DB\u05EA\u05D9\u05D1\u05D4 \u05D9\u05E6\u05D9\u05E8\u05EA\u05D9\u05EA. \u05DE\u05D4 \u05D0\u05E0\u05D9 \u05D9\u05DB\u05D5\u05DC \u05DC\u05E2\u05E9\u05D5\u05EA \u05D1\u05E9\u05D1\u05D9\u05DC\u05DA \u05D4\u05D9\u05D5\u05DD?"
      },
      action: {
        copy: "\u05D4\u05E2\u05EA\u05E7",
        regenerate: "\u05E6\u05D5\u05E8 \u05DE\u05D7\u05D3\u05E9",
        share: "\u05E9\u05EA\u05E3",
        like: "\u05D0\u05D4\u05D1\u05EA\u05D9",
        dislike: "\u05DC\u05D0 \u05D0\u05D4\u05D1\u05EA\u05D9",
        edit: "\u05E2\u05E8\u05D5\u05DA",
        delete: "\u05DE\u05D7\u05E7"
      },
      artifacts: {
        preview: "\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4",
        inline: "\u05DE\u05D5\u05D8\u05D1\u05E2",
        code: "\u05DE\u05E7\u05D5\u05E8",
        versions: "\u05D2\u05E8\u05E1\u05D0\u05D5\u05EA",
        rendering: "\u05DE\u05E2\u05D1\u05D3 \u05E8\u05DB\u05D9\u05D1...",
        renderingChart: "\u05DE\u05E2\u05D1\u05D3 \u05D2\u05E8\u05E3...",
        renderingCanvas: "\u05DE\u05DB\u05D9\u05DF \u05D1\u05D3..."
      },
      voice: {
        trigger: "\u05DC\u05D7\u05E5 \u05DC\u05D3\u05D9\u05D1\u05D5\u05E8",
        listening: "\u05DE\u05E7\u05E9\u05D9\u05D1..."
      },
      agent: {
        uses: "\u05DE\u05E9\u05EA\u05DE\u05E9",
        use: "\u05D4\u05E9\u05EA\u05DE\u05E9 \u05E2\u05DB\u05E9\u05D9\u05D5",
        favorite: "\u05DE\u05D5\u05E2\u05D3\u05E3",
        unfavorite: "\u05D4\u05E1\u05E8 \u05DE\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD",
        share: "\u05E9\u05EA\u05E3",
        online: "\u05DE\u05D7\u05D5\u05D1\u05E8",
        offline: "\u05DC\u05D0 \u05DE\u05D7\u05D5\u05D1\u05E8",
        busy: "\u05E2\u05E1\u05D5\u05E7",
        verified: "\u05DE\u05D0\u05D5\u05DE\u05EA",
        rating: "\u05D3\u05D9\u05E8\u05D5\u05D2",
        reviews: "\u05D1\u05D9\u05E7\u05D5\u05E8\u05D5\u05EA",
        responseTime: "\u05D6\u05DE\u05DF \u05EA\u05D2\u05D5\u05D1\u05D4 \u05DE\u05DE\u05D5\u05E6\u05E2",
        ms: '\u05DE"\u05E9'
      },
      sources: {
        references: "\u05DE\u05E7\u05D5\u05E8\u05D5\u05EA",
        referencedSources: "\u05DE\u05E7\u05D5\u05E8\u05D5\u05EA \u05DE\u05D0\u05D5\u05D6\u05DB\u05E8\u05D9\u05DD",
        relevant: "\u05E8\u05DC\u05D5\u05D5\u05E0\u05D8\u05D9\u05D5\u05EA",
        viewOriginal: "\u05E6\u05E4\u05D4 \u05D1\u05DE\u05E7\u05D5\u05E8",
        showAll: "\u05D4\u05E6\u05D2 \u05D4\u05DB\u05DC",
        more: "\u05DE\u05E7\u05D5\u05E8\u05D5\u05EA \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD",
        drawerTitle: "\u05DE\u05E7\u05D5\u05E8\u05D5\u05EA",
        expandMore: "\u05D4\u05E6\u05D2 \u05E2\u05D5\u05D3",
        collapseMore: "\u05DB\u05D5\u05D5\u05E5",
        noSources: "\u05D0\u05D9\u05DF \u05DE\u05E7\u05D5\u05E8\u05D5\u05EA",
        today: "\u05D4\u05D9\u05D5\u05DD",
        last7Days: "7 \u05D9\u05DE\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD",
        last30Days: "30 \u05D9\u05DE\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD",
        earlier: "\u05E7\u05D5\u05D3\u05DD",
        pinned: "\u05DE\u05D5\u05E6\u05DE\u05D3"
      },
      conversations: {
        today: "\u05D4\u05D9\u05D5\u05DD",
        last7Days: "7 \u05D9\u05DE\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD",
        last30Days: "30 \u05D9\u05DE\u05D9\u05DD \u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD",
        earlier: "\u05E7\u05D5\u05D3\u05DD",
        pinned: "\u05DE\u05D5\u05E6\u05DE\u05D3",
        pin: "\u05D4\u05E6\u05DE\u05D3",
        unpin: "\u05D1\u05D8\u05DC \u05D4\u05E6\u05DE\u05D3\u05D4",
        newConversation: "\u05E9\u05D9\u05D7\u05D4 \u05D7\u05D3\u05E9\u05D4",
        rename: "\u05E9\u05E0\u05D4 \u05E9\u05DD",
        delete: "\u05DE\u05D7\u05E7",
        deleteConfirm: "\u05D0\u05E9\u05E8 \u05DE\u05D7\u05D9\u05E7\u05EA \u05E9\u05D9\u05D7\u05D4 \u05D6\u05D5?"
      }
    }
  }
};
module.exports = he;