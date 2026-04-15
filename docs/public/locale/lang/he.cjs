"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.he = exports.default = void 0;
const he = exports.he = {
  name: "he",
  yh: {
    // 谞驻讜抓
    common: {
      yes: "\u8BBB\u8C09",
      no: "\u8BC7\u8B97",
      confirm: "\u8B97\u8BAC\u7816\u8B9C\u4E13",
      cancel: "\u8B98\u8BAC\u8B9F\u8B9C\u8BC7",
      loading: "\u8B9F\u8B9C\u6CE8\u8C09",
      close: "\u4F4F\u8B99\u8B9C\u4E13",
      clear: "\u8C1E\u62FD\u8B9B",
      reset: "\u8B97\u8BAC\u9A7B\u8B9C\u4F4F",
      save: "\u7816\u8BEA\u8B9C\u4E13",
      delete: "\u8BEA\u8B9E\u62FD",
      edit: "\u6CE8\u4E13\u8B9C\u8BB1",
      add: "\u8B9B\u8B9C\u4F4F\u795D",
      search: "\u8B9E\u8BAC\u9A7B\u8B9C\u7816",
      refresh: "\u4E13\u6CE8\u8C1E\u8B9C\u8C09",
      expand: "\u8B9B\u4E13\u8B9E\u8B98",
      collapse: "\u8BBB\u8B9C\u8B9C\u6293",
      more: "\u6CE8\u8B9C\u8B9A",
      noData: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
      noMatch: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0 \u8F6C\u8B9C\u8B97\u8BEA\u8BAC\u8BD0",
      selectAll: "\u8B98\u8B9E\u4E13 \u8B9B\u8BBB\u8BC7",
      unselectAll: "\u8B98\u8B9F\u8BC7 \u8B98\u8B9E\u8BAC\u4E13\u8B9B"
    },
    // 讘讜讞专 爪讘注讬诐
    colorpicker: {
      confirm: "\u8B97\u8BAC\u7816\u8B9C\u4E13",
      clear: "\u8C1E\u62FD\u8B9B",
      eyeDropper: "\u9A7B\u8BAC\u9A7B\u8B9F\u8B9B",
      suggestionDark: "\u8B9F\u62FD\u4F4F\u8B9F \u8BC7\u8B98\u8C09 \u8B9B\u8B9C\u8B97 \u8B9B\u8B9F\u8B9C\u8B98 \u8B98\u8BAC\u8B9C\u8F6C\u4E13",
      suggestionLight: "\u8B9F\u62FD\u4F4F\u8B9F \u7816\u8B9E\u8B9C\u4E13 \u8B9B\u8B9C\u8B97 \u8B9B\u8B9F\u8B9C\u8B98 \u8B98\u8BAC\u8B9C\u8F6C\u4E13",
      recentColors: "\u722A\u8B98\u6CE8\u8BAC\u8BD0 \u8B97\u8B9E\u4E13\u8B9C\u8C1E\u8BAC\u8BD0",
      presetColors: "\u722A\u8B98\u6CE8\u8BAC\u8BD0 \u8BEA\u8B9C\u8B99\u8B9A\u4E13\u8BAC\u8BD0 \u8BEA\u4E13\u8B97\u7816"
    },
    // 讘讜讞专 转讗专讬讱
    datepicker: {
      now: "\u6CE8\u8BBB\u7816\u8BAC\u8B9C",
      today: "\u8B9B\u8BAC\u8B9C\u8BD0",
      cancel: "\u8B98\u8BAC\u8B9F\u8B9C\u8BC7",
      clear: "\u8C1E\u62FD\u8B9B",
      confirm: "\u8B97\u8BAC\u7816\u8B9C\u4E13",
      selectDate: "\u8B98\u8B9E\u4E13 \u8F6C\u8B97\u4E13\u8BAC\u8BB1",
      selectTime: "\u8B98\u8B9E\u4E13 \u7816\u6CE8\u8B9B",
      startDate: "\u8F6C\u8B97\u4E13\u8BAC\u8BB1 \u8B9B\u8F6C\u8B9E\u8BC7\u8B9B",
      startTime: "\u7816\u6CE8\u8F6C \u8B9B\u8F6C\u8B9E\u8BC7\u8B9B",
      endDate: "\u8F6C\u8B97\u4E13\u8BAC\u8BB1 \u4F4F\u8BAC\u8B9C\u8BD0",
      endTime: "\u7816\u6CE8\u8F6C \u4F4F\u8BAC\u8B9C\u8BD0",
      year: "",
      month: "",
      day: "",
      week: "\u7816\u8B98\u8B9C\u6CE8",
      monthBeforeYear: true,
      prevYear: "\u7816\u8C1E\u8B9B \u62FD\u8B9C\u8B9A\u8BEA\u8F6C",
      nextYear: "\u7816\u8C1E\u8B9B \u8B9B\u8B98\u8B97\u8B9B",
      prevMonth: "\u8B9E\u8B9C\u8B9A\u7816 \u62FD\u8B9C\u8B9A\u8BD0",
      nextMonth: "\u8B9E\u8B9C\u8B9A\u7816 \u8B9B\u8B98\u8B97",
      weeks: {
        sun: "\u8B97",
        mon: "\u8B98",
        tue: "\u8B99",
        wed: "\u8B9A",
        thu: "\u8B9B",
        fri: "\u8B9C",
        sat: "\u7816"
      },
      months: {
        jan: "\u8BAC\u8C1E\u8B9C",
        feb: "\u9A7B\u8B98\u4E13",
        mar: "\u8BEA\u4E13\u6293",
        apr: "\u8B97\u9A7B\u4E13",
        may: "\u8BEA\u8B97\u8BAC",
        jun: "\u8BAC\u8B9C\u8C1E",
        jul: "\u8BAC\u8B9C\u8BC7",
        aug: "\u8B97\u8B9C\u8B99",
        sep: "\u4F4F\u9A7B\u8B9F",
        oct: "\u8B97\u8B9C\u62FD",
        nov: "\u8C1E\u8B9C\u8B98",
        dec: "\u8B9A\u722A\u8BEA"
      },
      quarters: {
        q1: "Q1",
        q2: "Q2",
        q3: "Q3",
        q4: "Q4"
      }
    },
    // 讘讜讞专 砖注讛
    timepicker: {
      confirm: "\u8B97\u8BAC\u7816\u8B9C\u4E13",
      cancel: "\u8B98\u8BAC\u8B9F\u8B9C\u8BC7",
      now: "\u6CE8\u8BBB\u7816\u8BAC\u8B9C",
      placeholder: "\u8B98\u8B9E\u4E13 \u7816\u6CE8\u8B9B",
      startPlaceholder: "\u7816\u6CE8\u8F6C \u8B9B\u8F6C\u8B9E\u8BC7\u8B9B",
      endPlaceholder: "\u7816\u6CE8\u8F6C \u4F4F\u8BAC\u8B9C\u8BD0",
      selectTime: "\u8B98\u8B9E\u4E13 \u7816\u6CE8\u8B9B"
    },
    // 讘讞讬专转 砖注讛
    timeselect: {
      placeholder: "\u8B98\u8B9E\u4E13 \u7816\u6CE8\u8B9B"
    },
    // 注抓
    tree: {
      emptyText: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
      loading: "\u8B9F\u8B9C\u6CE8\u8C09...",
      checkAll: "\u4F4F\u8BEA\u8C09 \u8B9B\u8BBB\u8BC7",
      uncheckAll: "\u8B98\u8B9F\u8BC7 \u4F4F\u8BAC\u8BEA\u8B9C\u8C09",
      expandAll: "\u8B9B\u4E13\u8B9E\u8B98 \u8B9B\u8BBB\u8BC7",
      collapseAll: "\u8BBB\u8B9C\u8B9C\u6293 \u8B9B\u8BBB\u8BC7"
    },
    // 讘讞讬专转 注抓
    treeselect: {
      placeholder: "\u8B98\u8B9E\u4E13",
      emptyText: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
      loading: "\u8B9F\u8B9C\u6CE8\u8C09...",
      noMatch: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0 \u8F6C\u8B9C\u8B97\u8BEA\u8BAC\u8BD0"
    },
    // 诇讜讞 砖谞讛
    calendar: {
      prevMonth: "\u8B9E\u8B9C\u8B9A\u7816 \u62FD\u8B9C\u8B9A\u8BD0",
      nextMonth: "\u8B9E\u8B9C\u8B9A\u7816 \u8B9B\u8B98\u8B97",
      prevYear: "\u7816\u8C1E\u8B9B \u62FD\u8B9C\u8B9A\u8BEA\u8F6C",
      nextYear: "\u7816\u8C1E\u8B9B \u8B9B\u8B98\u8B97\u8B9B",
      today: "\u8B9B\u8BAC\u8B9C\u8BD0",
      week: "\u7816\u8B98\u8B9C\u6CE8",
      holiday: "\u8B9E\u8B99",
      workday: "\u6CE8\u8B98\u8B9C\u8B9A\u8B9B",
      monthHeaderFormat: "MMMM YYYY",
      weeks: {
        sun: "\u8B97",
        mon: "\u8B98",
        tue: "\u8B99",
        wed: "\u8B9A",
        thu: "\u8B9B",
        fri: "\u8B9C",
        sat: "\u7816"
      }
    },
    // 讛砖诇诪讛 讗讜讟讜诪讟讬转
    autocomplete: {
      loading: "\u8B9F\u8B9C\u6CE8\u8C09...",
      placeholder: "\u8B97\u8C1E\u8B97 \u8B9B\u8B9D\u8C09",
      noData: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
      noMatch: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0 \u8F6C\u8B9C\u8B97\u8BEA\u8BAC\u8BD0"
    },
    // 住驻讬专讛 诇讗讞讜专
    countdown: {
      days: "\u8BAC\u8BEA\u8BAC\u8BD0",
      hours: "\u7816\u6CE8\u8B9C\u8F6C",
      minutes: "\u8B9A\u62FD\u8B9C\u8F6C",
      seconds: "\u7816\u8C1E\u8BAC\u8B9C\u8F6C",
      milliseconds: "\u8BEA\u8BAC\u8BC7\u8BAC\u7816\u8C1E\u8BAC\u8B9C\u8F6C",
      finished: "\u8B9B\u4F4F\u8F6C\u8BAC\u8BAC\u8BD0"
    },
    // 拽住拽讬讬讚
    cascader: {
      noMatch: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0 \u8F6C\u8B9C\u8B97\u8BEA\u8BAC\u8BD0",
      placeholder: "\u8B98\u8B9E\u4E13",
      loading: "\u8B9F\u8B9C\u6CE8\u8C09...",
      noData: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0"
    },
    // 讛注讘专讛
    transfer: {
      noMatch: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0 \u8F6C\u8B9C\u8B97\u8BEA\u8BAC\u8BD0",
      noData: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
      titles: ["\u4E13\u7816\u8BAC\u8BEA\u8B9B 1", "\u4E13\u7816\u8BAC\u8BEA\u8B9B 2"],
      filterPlaceholder: "\u8B9B\u8B9D\u8C09 \u8BEA\u8BAC\u8BC7\u8F6C \u8BEA\u9A7B\u8F6C\u8B9E",
      noCheckedFormat: "{total} \u9A7B\u4E13\u8BAC\u8B9F\u8BAC\u8BD0",
      hasCheckedFormat: "{checked}/{total} \u8C1E\u8B98\u8B9E\u4E13\u8B9C",
      searchPlaceholder: "\u8B9B\u8B9D\u8C09 \u8BEA\u8BAC\u8BC7\u8F6C \u8BEA\u9A7B\u8F6C\u8B9E"
    },
    // 讟讘诇讛
    table: {
      emptyText: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
      confirmFilter: "\u8B97\u8BAC\u7816\u8B9C\u4E13",
      resetFilter: "\u8B97\u8BAC\u9A7B\u8B9C\u4F4F",
      clearFilter: "\u8B9B\u8BBB\u8BC7",
      sumText: "\u4F4F\u8BBB\u8B9C\u8BD0",
      loading: "\u8B9F\u8B9C\u6CE8\u8C09...",
      index: "\u8B97\u8BAC\u8C1E\u8B9A\u62FD\u4F4F",
      print: "\u8B9B\u8B9A\u9A7B\u4F4F",
      cancel: "\u8B98\u8BAC\u8B9F\u8B9C\u8BC7",
      preview: "\u8F6C\u722A\u8B9C\u8B99\u8B9B \u8BEA\u62FD\u8B9A\u8BAC\u8BEA\u8B9B",
      printTime: "\u8B9D\u8BEA\u8C09 \u8B9B\u8B9A\u9A7B\u4F4F\u8B9B",
      total: '\u4F4F\u8B9B"\u8BBB {total} \u9A7B\u4E13\u8BAC\u8B9F\u8BAC\u8BD0',
      page: "\u6CE8\u8BEA\u8B9C\u8B9A {page}",
      yes: "\u8BBB\u8C09",
      no: "\u8BC7\u8B97",
      // 住专讙诇 讻诇讬诐
      toolbar: {
        refresh: "\u4E13\u6CE8\u8C1E\u8B9C\u8C09",
        density: "\u722A\u9A7B\u8BAC\u9A7B\u8B9C\u8F6C",
        densityDefault: "\u8B98\u4E13\u8BAC\u4E13\u8F6C \u8BEA\u8B9E\u8B9A\u8BC7",
        densityLarge: "\u8B99\u8B9A\u8B9C\u8BC7",
        densitySmall: "\u62FD\u8B9F\u8C09",
        columnSetting: "\u8B9B\u8B99\u8B9A\u4E13\u8B9C\u8F6C \u6CE8\u8BEA\u8B9C\u8B9A\u8B9C\u8F6C",
        fullscreen: "\u8BEA\u4F4F\u8BB1 \u8BEA\u8BC7\u8B97",
        exitFullscreen: "\u722A\u8B97 \u8BEA\u8BEA\u4F4F\u8BB1 \u8BEA\u8BC7\u8B97",
        export: "\u8BAC\u8BAC\u722A\u8B9C\u8B97",
        import: "\u8BAC\u8BAC\u8B98\u8B9C\u8B97",
        search: "\u8B9E\u8BAC\u9A7B\u8B9C\u7816",
        searchPlaceholder: "\u8B9B\u8B9D\u8C09 \u8BEA\u8BAC\u8BC7\u8B9C\u8F6C \u8BEA\u9A7B\u8F6C\u8B9E \u8BC7\u8B9E\u8BAC\u9A7B\u8B9C\u7816"
      },
      // 诪住谞谉
      filter: {
        selectAll: "\u8B98\u8B9E\u4E13 \u8B9B\u8BBB\u8BC7",
        selectInvert: "\u8B9B\u9A7B\u8B9C\u8BB1 \u8B98\u8B9E\u8BAC\u4E13\u8B9B",
        empty: "\u4E13\u8BAC\u62FD",
        notEmpty: "\u8BC7\u8B97 \u4E13\u8BAC\u62FD",
        contains: "\u8BEA\u8BBB\u8BAC\u8BC7",
        notContains: "\u8BC7\u8B97 \u8BEA\u8BBB\u8BAC\u8BC7",
        equals: "\u7816\u8B9C\u8B9C\u8B9B",
        notEquals: "\u8BC7\u8B97 \u7816\u8B9C\u8B9C\u8B9B",
        startsWith: "\u8BEA\u8F6C\u8B9E\u8BAC\u8BC7 \u8B98",
        endsWith: "\u8BEA\u4F4F\u8F6C\u8BAC\u8BAC\u8BD0 \u8B98",
        greaterThan: "\u8B99\u8B9A\u8B9C\u8BC7 \u8BEA",
        lessThan: "\u62FD\u8B9F\u8C09 \u8BEA",
        between: "\u8B98\u8BAC\u8C09"
      },
      // 诪讬讜谉
      sort: {
        asc: "\u6CE8\u8B9C\u8BC7\u8B9B",
        desc: "\u8BAC\u8B9C\u4E13\u8B9A",
        clear: "\u8C1E\u62FD\u8B9B \u8BEA\u8BAC\u8B9C\u8C09"
      },
      // 讬讬爪讜讗
      export: {
        title: "\u8BAC\u8BAC\u722A\u8B9C\u8B97 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
        filename: "\u7816\u8BD0 \u62FD\u8B9C\u8B98\u6293",
        type: "\u4F4F\u8B9C\u8B99 \u62FD\u8B9C\u8B98\u6293",
        scope: "\u8B9B\u8BAC\u62FD\u795D \u8BAC\u8BAC\u722A\u8B9C\u8B97",
        scopeAll: "\u8BBB\u8BC7 \u8B9B\u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
        scopeSelected: "\u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0 \u8C1E\u8B98\u8B9E\u4E13\u8BAC\u8BD0",
        scopeCurrentPage: "\u6CE8\u8BEA\u8B9C\u8B9A \u8C1E\u8B9C\u8BBB\u8B9E\u8BAC",
        includeHeader: "\u8BBB\u8BC7\u8B9C\u8BC7 \u8BBB\u8B9C\u8F6C\u4E13\u8F6C",
        exporting: "\u8BEA\u8BAC\u8BAC\u722A\u8B97...",
        success: "\u8BAC\u8BAC\u722A\u8B9C\u8B97 \u8B9B\u722A\u8BC7\u8BAC\u8B9E",
        error: "\u8BAC\u8BAC\u722A\u8B9C\u8B97 \u8C1E\u8BBB\u7816\u8BC7"
      },
      // 讬讬讘讜讗
      import: {
        title: "\u8BAC\u8BAC\u8B98\u8B9C\u8B97 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
        selectFile: "\u8B98\u8B9E\u4E13 \u62FD\u8B9C\u8B98\u6293",
        dragTip: "\u8BC7\u8B9E\u6293 \u8B97\u8B9C \u8B99\u4E13\u8B9C\u4E13 \u62FD\u8B9C\u8B98\u6293 \u8BC7\u8BBB\u8B97\u8C09 \u8BC7\u8B9B\u6CE8\u8BC7\u8B97\u8B9B",
        importing: "\u8BEA\u8BAC\u8BAC\u8B98\u8B97...",
        success: "\u8BAC\u8BAC\u8B98\u8B9C\u8B97 \u8B9B\u722A\u8BC7\u8BAC\u8B9E",
        error: "\u8BAC\u8BAC\u8B98\u8B9C\u8B97 \u8C1E\u8BBB\u7816\u8BC7",
        preview: "\u8F6C\u722A\u8B9C\u8B99\u8B9B \u8BEA\u62FD\u8B9A\u8BAC\u8BEA\u8B9B \u7816\u8BC7 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
        confirm: "\u8B97\u7816\u4E13 \u8BAC\u8BAC\u8B98\u8B9C\u8B97"
      },
      // 讛讚驻住讛
      printConfig: {
        title: "\u8B9B\u8B99\u8B9A\u4E13\u8B9C\u8F6C \u8B9B\u8B9A\u9A7B\u4F4F\u8B9B",
        pageTitle: "\u8BBB\u8B9C\u8F6C\u4E13\u8F6C \u6CE8\u8BEA\u8B9C\u8B9A",
        pageHeader: "\u8BBB\u8B9C\u8F6C\u4E13\u8F6C \u6CE8\u8BC7\u8BAC\u8B9C\u8C1E\u8B9B",
        pageFooter: "\u8BBB\u8B9C\u8F6C\u4E13\u8F6C \u8F6C\u8B9E\u8F6C\u8B9C\u8C1E\u8B9B",
        printAll: "\u8B9B\u8B9A\u9A7B\u4F4F \u8B9B\u8BBB\u8BC7",
        printSelected: "\u8B9B\u8B9A\u9A7B\u4F4F \u8C1E\u8B98\u8B9E\u4E13",
        printCurrentPage: "\u8B9B\u8B9A\u9A7B\u4F4F \u6CE8\u8BEA\u8B9C\u8B9A \u8C1E\u8B9C\u8BBB\u8B9E\u8BAC",
        landscape: "\u8B97\u8B9C\u9A7B\u62FD\u8BAC",
        portrait: "\u8B97\u8C1E\u8BBB\u8BAC",
        printing: "\u8BEA\u8B9A\u9A7B\u8BAC\u4F4F..."
      },
      // 讛讙讚专讜转 注诪讜讚讜转
      columnSetting: {
        title: "\u8B9B\u8B99\u8B9A\u4E13\u8B9C\u8F6C \u6CE8\u8BEA\u8B9C\u8B9A\u8B9C\u8F6C",
        showAll: "\u8B9B\u722A\u8B99 \u8B9B\u8BBB\u8BC7",
        hideAll: "\u8B9B\u4F4F\u8F6C\u4E13 \u8B9B\u8BBB\u8BC7",
        reset: "\u8B97\u8BAC\u9A7B\u8B9C\u4F4F",
        fixedLeft: "\u62FD\u8B98\u6CE8 \u8BC7\u7816\u8BEA\u8B97\u8BC7",
        fixedRight: "\u62FD\u8B98\u6CE8 \u8BC7\u8BAC\u8BEA\u8BAC\u8C09",
        unfixed: "\u7816\u8B9E\u4E13\u4E13"
      },
      // 转驻专讬讟 讛拽砖专
      contextMenu: {
        copy: "\u8B9B\u6CE8\u8F6C\u62FD",
        copyRow: "\u8B9B\u6CE8\u8F6C\u62FD \u7816\u8B9C\u4E13\u8B9B",
        copyCell: "\u8B9B\u6CE8\u8F6C\u62FD \u8F6C\u8B97",
        paste: "\u8B9B\u8B9A\u8B98\u62FD",
        insertRowAbove: "\u8B9B\u8B9C\u4F4F\u795D \u7816\u8B9C\u4E13\u8B9B \u8BC7\u8BEA\u6CE8\u8BC7\u8B9B",
        insertRowBelow: "\u8B9B\u8B9C\u4F4F\u795D \u7816\u8B9C\u4E13\u8B9B \u8BC7\u8BEA\u8B9F\u8B9B",
        deleteRow: "\u8BEA\u8B9E\u62FD \u7816\u8B9C\u4E13\u8B9B",
        deleteSelectedRows: "\u8BEA\u8B9E\u62FD \u7816\u8B9C\u4E13\u8B9C\u8F6C \u8C1E\u8B98\u8B9E\u4E13\u8B9C\u8F6C",
        exportSelected: "\u8BAC\u8BAC\u722A\u8B97 \u8C1E\u8B98\u8B9E\u4E13"
      },
      // 讘讞讬专讛
      selection: {
        selectAll: "\u8B98\u8B9E\u4E13 \u8B9B\u8BBB\u8BC7",
        selectInvert: "\u8B9B\u9A7B\u8B9C\u8BB1 \u8B98\u8B9E\u8BAC\u4E13\u8B9B",
        selectNone: "\u8C1E\u62FD\u8B9B \u8B98\u8B9E\u8BAC\u4E13\u8B9B",
        selected: "{count} \u9A7B\u4E13\u8BAC\u8B9F\u8BAC\u8BD0 \u8C1E\u8B98\u8B9E\u4E13\u8B9C"
      },
      // 讛专讞讘讛
      expand: {
        expandAll: "\u8B9B\u4E13\u8B9E\u8B98 \u8B9B\u8BBB\u8BC7",
        collapseAll: "\u8BBB\u8B9C\u8B9C\u6293 \u8B9B\u8BBB\u8BC7"
      },
      // 注抓
      tree: {
        expandAll: "\u8B9B\u4E13\u8B9E\u8B98 \u8B9B\u8BBB\u8BC7",
        collapseAll: "\u8BBB\u8B9C\u8B9C\u6293 \u8B9B\u8BBB\u8BC7",
        expandLevel: "\u8B9B\u4E13\u8B9E\u8B98 \u8BC7\u4E13\u8BEA\u8B9B {level}"
      },
      // 讙专讬专讛
      drag: {
        dragTip: "\u8B99\u4E13\u8B9C\u4E13 \u8BC7\u4F4F\u8BAC\u8B9A\u8B9C\u4E13 \u8BEA\u8B9E\u8B9A\u7816",
        dropTip: "\u7816\u8B9E\u4E13\u4E13 \u8BC7\u8BEA\u8BAC\u62FD\u8B9C\u8BD0"
      }
    },
    // 转讬讘转 讛讜讚注讛
    messagebox: {
      title: "\u8B9B\u8B9C\u8B9A\u6CE8\u8B9B",
      confirm: "\u8B97\u8BAC\u7816\u8B9C\u4E13",
      cancel: "\u8B98\u8BAC\u8B9F\u8B9C\u8BC7",
      close: "\u4F4F\u8B99\u8B9C\u4E13",
      error: "\u62FD\u8BC7\u8B9F \u8BC7\u8B97 \u8B9E\u8B9C\u62FD\u8BAC",
      alert: "\u8B9B\u8F6C\u4E13\u8B97\u8B9B",
      prompt: "\u8B98\u62FD\u7816\u8B9B",
      inputPlaceholder: "\u8B97\u8C1E\u8B97 \u8B9B\u8B9D\u8C09"
    },
    // 讛注诇讗讛
    upload: {
      deleteTip: "\u8BC7\u8B9E\u6293 delete \u8BC7\u8B9B\u4F4F\u4E13\u8B9B",
      delete: "\u8BEA\u8B9E\u62FD",
      preview: "\u8F6C\u722A\u8B9C\u8B99\u8B9B \u8BEA\u62FD\u8B9A\u8BAC\u8BEA\u8B9B",
      continue: "\u8B9B\u8BEA\u7816\u8BB1",
      upload: "\u8BC7\u8B9E\u6293 \u8BC7\u8B9B\u6CE8\u8BC7\u8B97\u8B9B",
      tip: "\u8BC7\u8B9E\u6293 \u8B97\u8B9C \u8B99\u4E13\u8B9C\u4E13 \u62FD\u8B9C\u8B98\u6293 \u8BC7\u8B97\u8B9D\u8B9C\u4E13 \u8B9D\u8B9B \u8BBB\u8B9A\u8BAC <em>\u8BC7\u8B9B\u6CE8\u8BC7\u8B9C\u8F6C</em>",
      dragTip: "\u7816\u8B9E\u4E13\u4E13 \u62FD\u8B9C\u8B98\u6293 \u8BBB\u8B97\u8C09 \u8B97\u8B9C \u8BC7\u8B9E\u6293 \u8BC7\u8B9B\u6CE8\u8BC7\u8B97\u8B9B",
      uploading: "\u8BEA\u6CE8\u8BC7\u8B9B...",
      success: "\u8B9B\u6CE8\u8BC7\u8B97\u8B9B \u8B9B\u722A\u8BC7\u8BAC\u8B9E\u8B9B",
      error: "\u8B9B\u6CE8\u8BC7\u8B97\u8B9B \u8C1E\u8BBB\u7816\u8BC7\u8B9B",
      retry: "\u8C1E\u4F4F\u8B9B \u7816\u8B9C\u8B98",
      cancel: "\u8B98\u8B9F\u8BC7 \u8B9B\u6CE8\u8BC7\u8B97\u8B9B",
      fileTypeError: "\u4F4F\u8B9C\u8B99 \u62FD\u8B9C\u8B98\u6293 \u8BC7\u8B97 \u8C1E\u8F6C\u8BEA\u8BB1",
      fileSizeError: "\u8B99\u8B9C\u8B9A\u8BC7 \u62FD\u8B9C\u8B98\u6293 \u8B9E\u8B9C\u4E13\u8B99 \u8BEA\u8B9B\u8B99\u8B98\u8B9C\u8BC7",
      fileCountError: "\u8BEA\u4F4F\u9A7B\u4E13 \u62FD\u8B98\u722A\u8BAC\u8BD0 \u8B9E\u8B9C\u4E13\u8B99 \u8BEA\u8B9B\u8B99\u8B98\u8B9C\u8BC7"
    },
    // 讟讜驻住
    form: {
      validationFailed: "\u8B97\u8BAC\u8BEA\u8B9C\u8F6C \u8C1E\u8BBB\u7816\u8BC7",
      required: "\u8C1E\u8B9A\u4E13\u7816",
      pleaseInput: "\u8B97\u8C1E\u8B97 \u8B9B\u8B9D\u8C09",
      pleaseSelect: "\u8B97\u8C1E\u8B97 \u8B98\u8B9E\u4E13"
    },
    // 讻驻转讜专
    button: {
      loading: "\u8B9F\u8B9C\u6CE8\u8C09..."
    },
    // 拽诇讟
    input: {
      placeholder: "\u8B97\u8C1E\u8B97 \u8B9B\u8B9D\u8C09",
      clear: "\u8C1E\u62FD\u8B9B",
      showPassword: "\u8B9B\u722A\u8B99 \u4F4F\u8BAC\u4F4F\u8BEA\u8B9B",
      hidePassword: "\u8B9B\u4F4F\u8F6C\u4E13 \u4F4F\u8BAC\u4F4F\u8BEA\u8B9B",
      copy: "\u8B9B\u6CE8\u8F6C\u62FD",
      copied: "\u8B9B\u8B9C\u6CE8\u8F6C\u62FD"
    },
    // 拽诇讟 诪住驻专
    inputnumber: {
      placeholder: "\u8B97\u8C1E\u8B97 \u8B9B\u8B9D\u8C09 \u8BEA\u4F4F\u9A7B\u4E13",
      increase: "\u8B9B\u8B99\u8B9A\u8BC7",
      decrease: "\u8B9B\u62FD\u8B9F\u8C09"
    },
    // 拽诇讟 转讙
    inputtag: {
      placeholder: "\u8B97\u8C1E\u8B97 \u8B9B\u8B9D\u8C09",
      add: "\u8B9B\u8B9C\u4F4F\u795D",
      remove: "\u8B9B\u4F4F\u4E13"
    },
    // 驻讬专讜专讬 诇讞诐
    breadcrumb: {
      label: "\u9A7B\u8BAC\u4E13\u8B9C\u4E13\u8BAC \u8BC7\u8B9E\u8BD0",
      more: "\u6CE8\u8B9C\u8B9A"
    },
    // 讞讝专讛 诇诪注诇讛
    backtop: {
      text: "\u8B9E\u8B9D\u4E13\u8B9B \u8BC7\u8BEA\u6CE8\u8BC7\u8B9B"
    },
    // 讘讞讬专讛
    select: {
      placeholder: "\u8B97\u8C1E\u8B97 \u8B98\u8B9E\u4E13",
      noData: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
      loading: "\u8B9F\u8B9C\u6CE8\u8C09...",
      noMatch: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0 \u8F6C\u8B9C\u8B97\u8BEA\u8BAC\u8BD0",
      selectAll: "\u8B98\u8B9E\u4E13 \u8B9B\u8BBB\u8BC7",
      clearAll: "\u8C1E\u62FD\u8B9B \u8B9B\u8BBB\u8BC7"
    },
    // 注讬诪讜讚
    pagination: {
      goto: "\u6CE8\u8B98\u8B9C\u4E13 \u8BC7",
      page: "",
      total: '\u4F4F\u8B9B"\u8BBB {total}',
      pageSize: "/\u6CE8\u8BEA\u8B9C\u8B9A",
      prev: "\u8B9B\u62FD\u8B9C\u8B9A\u8BD0",
      next: "\u8B9B\u8B98\u8B97",
      first: "\u4E13\u8B97\u7816\u8B9C\u8C09",
      last: "\u8B97\u8B9E\u4E13\u8B9C\u8C09",
      pageClassifier: ""
    },
    // 讗讬砖讜专 拽讜驻抓
    popconfirm: {
      confirm: "\u8B97\u8BAC\u7816\u8B9C\u4E13",
      cancel: "\u8B98\u8BAC\u8B9F\u8B9C\u8BC7",
      dontAskAgain: "\u8B97\u8BC7 \u8F6C\u7816\u8B97\u8BC7 \u7816\u8B9C\u8B98"
    },
    // 讚讬讗诇讜讙
    dialog: {
      confirm: "\u8B97\u8BAC\u7816\u8B9C\u4E13",
      cancel: "\u8B98\u8BAC\u8B9F\u8B9C\u8BC7",
      close: "\u4F4F\u8B99\u8B9C\u4E13",
      maximize: "\u8B9B\u8B99\u8B9A\u8BC7 \u8BC7\u8BEA\u62FD\u4F4F\u8BAC\u8BEA\u8B9C\u8BD0",
      restore: "\u7816\u8B9E\u8B9D\u4E13"
    },
    // 诪讙讬专讛
    drawer: {
      close: "\u4F4F\u8B99\u8B9C\u4E13",
      confirm: "\u8B97\u8BAC\u7816\u8B9C\u4E13",
      cancel: "\u8B98\u8BAC\u8B9F\u8B9C\u8BC7"
    },
    // 转驻专讬讟 谞驻转讞
    dropdown: {
      loading: "\u8B9F\u8B9C\u6CE8\u8C09..."
    },
    // 转诪讜谞讛
    image: {
      error: "\u8C1E\u8BBB\u7816\u8BC7",
      loading: "\u8B9F\u8B9C\u6CE8\u8C09...",
      preview: "\u8F6C\u722A\u8B9C\u8B99\u8B9B \u8BEA\u62FD\u8B9A\u8BAC\u8BEA\u8B9B",
      zoomIn: "\u8B9B\u8B99\u8B9A\u8BC7",
      zoomOut: "\u8B9B\u62FD\u8B9F\u8C09",
      rotateLeft: "\u4F4F\u8B9C\u8B98\u8B98 \u7816\u8BEA\u8B97\u8BC7\u8B9B",
      rotateRight: "\u4F4F\u8B9C\u8B98\u8B98 \u8BAC\u8BEA\u8BAC\u8C1E\u8B9B",
      originalSize: "\u8B99\u8B9C\u8B9A\u8BC7 \u8BEA\u62FD\u8B9C\u4E13\u8BAC",
      fullscreen: "\u8BEA\u4F4F\u8BB1 \u8BEA\u8BC7\u8B97"
    },
    // 诪爪讬讙 转诪讜谞讜转
    imageviewer: {
      close: "\u4F4F\u8B99\u8B9C\u4E13",
      prev: "\u8B9B\u62FD\u8B9C\u8B9A\u8BD0",
      next: "\u8B9B\u8B98\u8B97",
      zoomIn: "\u8B9B\u8B99\u8B9A\u8BC7",
      zoomOut: "\u8B9B\u62FD\u8B9F\u8C09",
      rotateLeft: "\u4F4F\u8B9C\u8B98\u8B98 \u7816\u8BEA\u8B97\u8BC7\u8B9B",
      rotateRight: "\u4F4F\u8B9C\u8B98\u8B98 \u8BAC\u8BEA\u8BAC\u8C1E\u8B9B",
      reset: "\u8B97\u8BAC\u9A7B\u8B9C\u4F4F",
      fullscreen: "\u8BEA\u4F4F\u8BB1 \u8BEA\u8BC7\u8B97",
      exitFullscreen: "\u722A\u8B97 \u8BEA\u8BEA\u4F4F\u8BB1 \u8BEA\u8BC7\u8B97"
    },
    // 讙诇讬诇讛 讗讬谞住讜驻讬转
    infinitescroll: {
      loading: "\u8B9F\u8B9C\u6CE8\u8C09...",
      finished: "\u8B97\u8BAC\u8C09 \u6CE8\u8B9C\u8B9A \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
      error: "\u8B9F\u6CE8\u8BAC\u8C1E\u8B9B \u8C1E\u8BBB\u7816\u8BC7\u8B9B, \u8BC7\u8B9E\u6293 \u8BC7\u8C1E\u8BAC\u4F4F\u8BAC\u8B9C\u8C09 \u8B9E\u8B9C\u8B9D\u4E13",
      retry: "\u8BC7\u8B9E\u6293 \u8BC7\u8C1E\u8BAC\u4F4F\u8BAC\u8B9C\u8C09 \u8B9E\u8B9C\u8B9D\u4E13"
    },
    // 讛讜讚注讛
    message: {
      close: "\u4F4F\u8B99\u8B9C\u4E13"
    },
    // 讛转专讗讛
    notification: {
      close: "\u4F4F\u8B99\u8B9C\u4E13"
    },
    // 讟注讬谞讛
    loading: {
      text: "\u8B9F\u8B9C\u6CE8\u8C09..."
    },
    // 住讬讘讜讘
    spin: {
      text: "\u8B9F\u8B9C\u6CE8\u8C09..."
    },
    // 讚讬专讜讙
    rate: {
      texts: ["\u8B99\u4E13\u8B9C\u6CE8 \u8BEA\u8B97\u8B9C\u8B9A", "\u8BEA\u8B97\u8B9C\u8BBB\u8B9D\u8B98", "\u8B9B\u8B9C\u8B99\u8C09", "\u8BEA\u4E13\u8B9C\u722A\u8B9B", "\u8BEA\u8B9C\u9A7B\u8F6C\u6CE8"]
    },
    // 讛转专讗讛
    alert: {
      close: "\u4F4F\u8B99\u8B9C\u4E13"
    },
    // 转讙
    tag: {
      close: "\u4F4F\u8B99\u8B9C\u4E13"
    },
    // 讻专讟讬住讬讜转
    tabs: {
      close: "\u4F4F\u8B99\u8B9C\u4E13",
      add: "\u8B9B\u8B9C\u4F4F\u795D",
      more: "\u6CE8\u8B9C\u8B9A"
    },
    // 砖诇讘讬诐
    steps: {
      finish: "\u8B9B\u8B9C\u7816\u8BC7\u8BD0",
      process: "\u8B98\u8F6C\u8B9B\u8BC7\u8BAC\u8BB1",
      wait: "\u8BEA\u8BEA\u8F6C\u8BAC\u8C09",
      error: "\u7816\u8B99\u8BAC\u8B97\u8B9B"
    },
    // 讛转拽讚诪讜转
    progress: {
      success: "\u8B9B\u722A\u8BC7\u8B9E\u8B9B",
      exception: "\u8BAC\u8B9C\u722A\u8B97 \u8B9A\u8B9C\u9A7B\u8C09",
      warning: "\u8B97\u8B9D\u8B9B\u4E13\u8B9B"
    },
    // 砖诇讚
    skeleton: {
      loading: "\u8B9F\u8B9C\u6CE8\u8C09..."
    },
    // 专讬拽
    empty: {
      description: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
      noData: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
      noResult: "\u8B97\u8BAC\u8C09 \u8F6C\u8B9C\u722A\u8B97\u8B9C\u8F6C",
      networkError: "\u7816\u8B99\u8BAC\u8B97\u8F6C \u4E13\u7816\u8F6C",
      serverError: "\u7816\u8B99\u8BAC\u8B97\u8F6C \u7816\u4E13\u8F6C"
    },
    // 转讜爪讗讛
    result: {
      success: "\u8B9B\u722A\u8BC7\u8B9E\u8B9B",
      error: "\u7816\u8B99\u8BAC\u8B97\u8B9B",
      warning: "\u8B97\u8B9D\u8B9B\u4E13\u8B9B",
      info: "\u8BEA\u8BAC\u8B9A\u6CE8",
      backHome: "\u8B9E\u8B9D\u4E13\u8B9B \u8BC7\u8B9A\u795D \u8B9B\u8B98\u8BAC\u8F6C"
    },
    // 诪驻诇
    waterfall: {
      loading: "\u8B9F\u8B9C\u6CE8\u8C09...",
      noMore: "\u8B97\u8BAC\u8C09 \u6CE8\u8B9C\u8B9A \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
      empty: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0"
    },
    // 转讬讗讜专讬诐
    descriptions: {
      colon: ":"
    },
    // 诪讞讜讜谉
    slider: {
      tipFormatter: "{value}"
    },
    // 诪转讙
    switch: {
      on: "\u9A7B\u8B9C\u6CE8\u8BC7",
      off: "\u8BBB\u8B98\u8B9C\u8BAC"
    },
    // 转讬讘转 住讬诪讜谉
    checkbox: {
      selectAll: "\u8B98\u8B9E\u4E13 \u8B9B\u8BBB\u8BC7"
    },
    // 专讚讬讜
    radio: {},
    // 转驻专讬讟
    menu: {
      collapse: "\u8BBB\u8B9C\u8B9C\u6293 \u8F6C\u9A7B\u4E13\u8BAC\u8B9F",
      expand: "\u8B9B\u4E13\u8B9E\u8B98 \u8F6C\u9A7B\u4E13\u8BAC\u8B9F"
    },
    // 讻专讟讬住
    card: {
      collapse: "\u8BBB\u8B9C\u8B9C\u6293",
      expand: "\u8B9B\u4E13\u8B9E\u8B98"
    },
    // 讻讬讜讜抓
    collapse: {
      expand: "\u8B9B\u4E13\u8B9E\u8B98",
      collapse: "\u8BBB\u8B9C\u8B9C\u6293"
    },
    // 专诪讝
    tooltip: {},
    // 讞诇讜谉 拽讜驻抓
    popover: {},
    // 转讙
    badge: {},
    // 讗讜讜讟专
    avatar: {
      error: "\u8B9F\u6CE8\u8BAC\u8C1E\u8B9B \u8C1E\u8BBB\u7816\u8BC7\u8B9B"
    },
    // 住讬诪谉 诪讬诐
    watermark: {},
    // 诪驻专讬讚
    divider: {},
    // 拽专讜住诇讛
    carousel: {
      prev: "\u8B9B\u62FD\u8B9C\u8B9A\u8BD0",
      next: "\u8B9B\u8B98\u8B97"
    },
    // 诪专拽讬讝
    marquee: {},
    // 讛讬爪诪讚讜转
    affix: {},
    // 注讜讙谉
    anchor: {},
    // Mention
    mention: {
      placeholder: "\u8B97\u8C1E\u8B97 \u8B9B\u8B9D\u8C09",
      loading: "\u8B9F\u8B9C\u6CE8\u8C09...",
      noData: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0"
    },
    skuselector: {
      placeholder: "\u8B98\u8B9E\u4E13 \u8BEA\u9A7B\u4E13\u8B9F",
      emptyText: "\u8B97\u8BAC\u8C09 \u8BEA\u9A7B\u4E13\u8B9F\u8BAC\u8BD0",
      stock: "\u8BEA\u8BC7\u8B97\u8BAC",
      price: "\u8BEA\u8B9E\u8BAC\u4E13",
      selected: "\u8C1E\u8B98\u8B9E\u4E13",
      outOfStock: "\u8B97\u8B9D\u8BC7 \u8BEA\u8B9B\u8BEA\u8BC7\u8B97\u8BAC"
    },
    productcard: {
      viewDetails: "\u8B9B\u722A\u8B99 \u9A7B\u4E13\u8B9F\u8BAC\u8BD0",
      buyNow: "\u62FD\u8C1E\u8B9B \u6CE8\u8BBB\u7816\u8BAC\u8B9C",
      addToCart: "\u8B9B\u8B9C\u4F4F\u795D \u8BC7\u6CE8\u8B99\u8BC7\u8B9B",
      sold: "\u8C1E\u8BEA\u8BBB\u4E13\u8B9C",
      soldOut: "\u8B97\u8B9D\u8BC7 \u8B9B\u8BEA\u8BC7\u8B97\u8BAC",
      vip: "VIP"
    },
    price: {
      original: "\u8BEA\u62FD\u8B9C\u4E13\u8BAC"
    },
    couponcard: {
      available: "\u62FD\u8B98\u8BC7 \u6CE8\u8BBB\u7816\u8BAC\u8B9C",
      used: "\u7816\u8B9C\u8BEA\u7816",
      expired: "\u9A7B\u8B99 \u8F6C\u8B9C\u62FD\u795D",
      received: "\u8B9B\u8F6C\u62FD\u8B98\u8BC7",
      limit: "\u8BC7\u8B9B\u8B9D\u8BEA\u8C1E\u8B9C\u8F6C \u8BEA\u6CE8\u8BC7 {threshold}",
      noThreshold: "\u8BC7\u8BC7\u8B97 \u4F4F\u8BBB\u8B9C\u8BD0 \u8BEA\u8BAC\u8C1E\u8BAC\u8BEA\u8B9C\u8BD0",
      validPeriod: "\u8F6C\u62FD\u8B9C\u9A7B\u8F6C \u8F6C\u8B9C\u62FD\u795D",
      ruleTitle: "\u8BBB\u8BC7\u8BC7\u8BAC \u7816\u8BAC\u8BEA\u8B9C\u7816"
    },
    luckydraw: {
      start: "\u8B9B\u8F6C\u8B9E\u8BC7",
      drawing: "\u8BEA\u8B99\u4E13\u8BAC\u8BC7...",
      end: "\u8BAC\u7816 \u8B9D\u8B9C\u8BBB\u8B9B!",
      retry: "\u8C1E\u4F4F\u8B9B \u7816\u8B9C\u8B98"
    },
    filterbar: {
      all: "\u8B9B\u8BBB\u8B9C\u8BC7",
      sort: "\u8BEA\u8BAC\u8B9C\u8C09",
      filter: "\u4F4F\u8BAC\u8C1E\u8B9C\u8C09",
      cancel: "\u8B98\u8BAC\u8B9F\u8B9C\u8BC7",
      reset: "\u8B97\u8BAC\u9A7B\u8B9C\u4F4F",
      confirm: "\u8B97\u8BAC\u7816\u8B9C\u4E13",
      noOptions: "\u8B97\u8BAC\u8C09 \u8B97\u9A7B\u7816\u4E13\u8B9C\u8BAC\u8B9C\u8F6C",
      asc: "\u6CE8\u8B9C\u8BC7\u8B9B",
      desc: "\u8BAC\u8B9C\u4E13\u8B9A",
      selected: "\u8C1E\u8B98\u8B9E\u4E13"
    },
    submitbar: {
      total: "\u4F4F\u8B9B\u72B6\u8BBB: ",
      selected: "{count} \u8C1E\u8B98\u8B9E\u4E13\u8B9C",
      submit: "\u8BC7\u8F6C\u7816\u8BC7\u8B9C\u8BD0",
      allSelect: "\u8B98\u8B9E\u4E13 \u8B9B\u8BBB\u8B9C\u8BC7"
    },
    categorynav: {
      all: "\u8B9B\u8BBB\u8B9C\u8BC7",
      noData: "\u8B97\u8BAC\u8C09 \u8C1E\u8F6C\u8B9C\u8C1E\u8BAC\u8BD0",
      loading: "\u8B9F\u8B9C\u6CE8\u8C09..."
    },
    smartaddress: {
      placeholder: "\u8B9B\u8B9A\u8B98\u62FD \u8BBB\u8B97\u8C09 \u8BBB\u8F6C\u8B9C\u8B98\u8F6C, \u8B9D\u8BAC\u8B9B\u8B9C\u8BAC \u8B97\u8B9C\u8B9F\u8B9C\u8BEA\u8B9F\u8BAC \u7816\u8BC7 \u7816\u8BD0, \u8B9F\u8BC7\u9A7B\u8B9C\u8C09 \u8B9C\u8BEA\u8BAC\u62FD\u8B9C\u8BD0",
      parse: "\u9A7B\u6CE8\u8C1E\u8B9C\u8B9E \u8B9E\u8BBB\u8BD0",
      province: "\u8BEA\u8B9E\u8B9C\u8B9D/\u6CE8\u8BAC\u4E13/\u8B97\u8B9D\u8B9C\u4E13",
      city: "\u6CE8\u8BAC\u4E13",
      district: "\u8B97\u8B9D\u8B9C\u4E13/\u8C1E\u9A7B\u8B9B",
      street: "\u4E13\u8B9E\u8B9C\u8B98/\u8BAC\u8BAC\u7816\u8B9C\u8B98",
      detail: "\u8BBB\u8F6C\u8B9C\u8B98\u8F6C \u8BEA\u9A7B\u8B9C\u4E13\u8B9F\u8F6C",
      phone: "\u8B9F\u8BC7\u9A7B\u8B9C\u8C09",
      name: "\u8C1E\u8BEA\u6CE8\u8C09",
      parseSuccess: "\u8B9B\u8BBB\u8F6C\u8B9C\u8B98\u8F6C \u8B9D\u8B9C\u8B9B\u8F6C\u8B9B \u8B98\u8B9B\u722A\u8BC7\u8B9E\u8B9B",
      parseFailed: "\u8B9B\u8B9D\u8BAC\u8B9B\u8B9C\u8BAC \u8C1E\u8BBB\u7816\u8BC7, \u8C1E\u8B97 \u8BC7\u8BEA\u8BC7\u8B97 \u8BAC\u8B9A\u8C1E\u8BAC\u8F6C",
      required: "\u8C1E\u8B97 \u8BC7\u8BEA\u8BC7\u8B97 \u8BBB\u8F6C\u8B9C\u8B98\u8F6C \u8BEA\u8BC7\u8B97\u8B9B",
      provinceKeywords: ["\u8BEA\u8B9E\u8B9C\u8B9D", "\u8BEA\u8B9A\u8BAC\u8C1E\u8B9B"],
      cityKeywords: ["\u6CE8\u8BAC\u4E13", "\u8B97\u8B9D\u8B9C\u4E13"],
      districtKeywords: ["\u8B97\u8B9D\u8B9C\u4E13", "\u8C1E\u9A7B\u8B9B", "\u8BAC\u8BAC\u7816\u8B9C\u8B98"],
      streetKeywords: ["\u4E13\u8B9E\u8B9C\u8B98", "\u8B9A\u4E13\u8BB1", "\u7816\u8B9A\u4E13\u8B9B", "\u4F4F\u8BEA\u8B9F\u8B9B"]
    },
    ganttchart: {
      taskName: "\u7816\u8BD0 \u8B9B\u8BEA\u7816\u8BAC\u8BEA\u8B9B",
      searchPlaceholder: "\u8B9E\u9A7B\u7816 \u8BEA\u7816\u8BAC\u8BEA\u8B9C\u8F6C...",
      zoom: "\u8B9D\u8B9C\u8BD0",
      day: "\u8BAC\u8B9C\u8BD0",
      week: "\u7816\u8B98\u8B9C\u6CE8",
      month: "\u8B9E\u8B9C\u8B9A\u7816",
      year: "\u7816\u8C1E\u8B9B",
      milestone: "\u8B97\u8B98\u8C09 \u8B9A\u4E13\u8BB1"
    },
    imagemagnifier: {
      switchToImage: "\u6CE8\u8B98\u8B9C\u4E13 \u8BC7\u8F6C\u8BEA\u8B9C\u8C1E\u8B9B {index}",
      galleryItem: "\u8B99\u8BC7\u4E13\u8BAC\u8B9B {index}",
      close: "\u4F4F\u8B99\u8B9C\u4E13"
    },
    // AI Components
    ai: {
      bubble: {
        citations: "\u722A\u8BAC\u8B9F\u8B9C\u8B9F\u8BAC\u8BD0"
      },
      mention: {
        placeholder: "@ \u8B9B\u8B9D\u8BBB\u4E13 \u4F4F\u8B9C\u8BBB\u8C09, \u8BEA\u4F4F\u8BEA\u8BB1 \u8B97\u8B9C \u8B9F\u8B98\u8BC7\u8B9B...",
        agent: "\u4F4F\u8B9C\u8BBB\u8C09",
        document: "\u8BEA\u4F4F\u8BEA\u8BB1",
        table: "\u8B9F\u8B98\u8BC7\u8B9B",
        knowledge: "\u8BAC\u8B9A\u6CE8"
      },
      codeBlock: {
        copyCode: "\u8B9B\u6CE8\u8F6C\u62FD \u62FD\u8B9C\u8B9A",
        copied: "\u8B9B\u8B9C\u6CE8\u8F6C\u62FD!",
        run: "\u8B9B\u4E13\u6293 \u62FD\u8B9C\u8B9A",
        edit: "\u6CE8\u4E13\u8B9C\u8BB1",
        save: "\u7816\u8BEA\u8B9C\u4E13",
        cancel: "\u8B98\u8B9F\u8BC7"
      },
      codeRunner: {
        run: "\u8B9B\u4E13\u6293",
        stop: "\u6CE8\u722A\u8B9C\u4E13",
        clear: "\u8C1E\u62FD\u8B9B",
        reset: "\u8B97\u9A7B\u4F4F",
        placeholder: "\u8BC7\u8B9E\u6293 \u6CE8\u8BC7 \u8B9B\u4E13\u6293 \u8BC7\u8B9B\u9A7B\u6CE8\u8BC7\u8F6C \u8B9B\u62FD\u8B9C\u8B9A..."
      },
      sender: {
        placeholder: "\u7816\u8BC7\u8B9E \u8B9B\u8B9C\u8B9A\u6CE8\u8B9B...",
        dragTip: "\u7816\u8B9E\u4E13\u4E13 \u8BC7\u8B9B\u6CE8\u8BC7\u8B97\u8F6C \u62FD\u8B98\u722A\u8BAC\u8BD0"
      },
      thoughtChain: {
        thoughtProcess: "\u8F6C\u8B9B\u8BC7\u8BAC\u8BB1 \u8B9E\u7816\u8BAC\u8B98\u8B9B",
        thinking: "\u8B9E\u8B9C\u7816\u8B98...",
        defaultTitle: "\u7816\u8BC7\u8B98 \u8B9E\u8B9A\u7816",
        addNode: "\u8B9B\u8B9C\u4F4F\u795D \u7816\u8BC7\u8B98"
      },
      thinking: {
        start: "\u8B9B\u8F6C\u8B9E\u8BC7 \u8BC7\u8B9E\u7816\u8B9C\u8B98",
        thinking: "\u8B9E\u8B9C\u7816\u8B98...",
        complete: "\u8B9B\u8B9E\u7816\u8BAC\u8B98\u8B9B \u8B9B\u8B9C\u7816\u8BC7\u8BEA\u8B9B",
        error: "\u7816\u8B99\u8BAC\u8B97\u8F6C \u8B9E\u7816\u8BAC\u8B98\u8B9B"
      },
      welcome: {
        title: "\u7816\u8BC7\u8B9C\u8BD0, \u8B97\u8C1E\u8BAC YH AI",
        description: "\u8B97\u8C1E\u8BAC \u8BAC\u8BBB\u8B9C\u8BC7 \u8BC7\u6CE8\u8B9D\u8B9C\u4E13 \u8BC7\u8BB1 \u8B98\u8F6C\u8BBB\u8C1E\u8B9C\u8F6C, \u8F6C\u4E13\u8B99\u8B9C\u8BD0 \u8BEA\u4F4F\u8BEA\u8BBB\u8BAC\u8BD0 \u8B97\u8B9C \u8BBB\u8F6C\u8BAC\u8B98\u8B9B \u8BAC\u722A\u8BAC\u4E13\u8F6C\u8BAC\u8F6C. \u8BEA\u8B9B \u8B97\u8C1E\u8BAC \u8BAC\u8BBB\u8B9C\u8BC7 \u8BC7\u6CE8\u7816\u8B9C\u8F6C \u8B98\u7816\u8B98\u8BAC\u8BC7\u8BB1 \u8B9B\u8BAC\u8B9C\u8BD0?"
      },
      action: {
        copy: "\u8B9B\u6CE8\u8F6C\u62FD",
        regenerate: "\u722A\u8B9C\u4E13 \u8BEA\u8B9E\u8B9A\u7816",
        share: "\u7816\u8F6C\u795D",
        like: "\u8B97\u8B9B\u8B98\u8F6C\u8BAC",
        dislike: "\u8BC7\u8B97 \u8B97\u8B9B\u8B98\u8F6C\u8BAC",
        edit: "\u6CE8\u4E13\u8B9C\u8BB1",
        delete: "\u8BEA\u8B9E\u62FD"
      },
      artifacts: {
        preview: "\u8F6C\u722A\u8B9C\u8B99\u8B9B \u8BEA\u62FD\u8B9A\u8BAC\u8BEA\u8B9B",
        inline: "\u8BEA\u8B9C\u8B9F\u8B98\u6CE8",
        code: "\u8BEA\u62FD\u8B9C\u4E13",
        versions: "\u8B99\u4E13\u4F4F\u8B97\u8B9C\u8F6C",
        rendering: "\u8BEA\u6CE8\u8B98\u8B9A \u4E13\u8BBB\u8BAC\u8B98...",
        renderingChart: "\u8BEA\u6CE8\u8B98\u8B9A \u8B99\u4E13\u795D...",
        renderingCanvas: "\u8BEA\u8BBB\u8BAC\u8C09 \u8B98\u8B9A..."
      },
      voice: {
        trigger: "\u8BC7\u8B9E\u6293 \u8BC7\u8B9A\u8BAC\u8B98\u8B9C\u4E13",
        listening: "\u8BEA\u62FD\u7816\u8BAC\u8B98..."
      },
      agent: {
        uses: "\u8BEA\u7816\u8F6C\u8BEA\u7816",
        use: "\u8B9B\u7816\u8F6C\u8BEA\u7816 \u6CE8\u8BBB\u7816\u8BAC\u8B9C",
        favorite: "\u8BEA\u8B9C\u6CE8\u8B9A\u795D",
        unfavorite: "\u8B9B\u4F4F\u4E13 \u8BEA\u8BEA\u8B9C\u6CE8\u8B9A\u9A7B\u8BAC\u8BD0",
        share: "\u7816\u8F6C\u795D",
        online: "\u8BEA\u8B9E\u8B9C\u8B98\u4E13",
        offline: "\u8BC7\u8B97 \u8BEA\u8B9E\u8B9C\u8B98\u4E13",
        busy: "\u6CE8\u4F4F\u8B9C\u62FD",
        verified: "\u8BEA\u8B97\u8B9C\u8BEA\u8F6C",
        rating: "\u8B9A\u8BAC\u4E13\u8B9C\u8B99",
        reviews: "\u8B98\u8BAC\u62FD\u8B9C\u4E13\u8B9C\u8F6C",
        responseTime: "\u8B9D\u8BEA\u8C09 \u8F6C\u8B99\u8B9C\u8B98\u8B9B \u8BEA\u8BEA\u8B9C\u722A\u6CE8",
        ms: '\u8BEA"\u7816'
      },
      sources: {
        references: "\u8BEA\u62FD\u8B9C\u4E13\u8B9C\u8F6C",
        referencedSources: "\u8BEA\u62FD\u8B9C\u4E13\u8B9C\u8F6C \u8BEA\u8B97\u8B9C\u8B9D\u8BBB\u4E13\u8BAC\u8BD0",
        relevant: "\u4E13\u8BC7\u8B9C\u8B9C\u8C1E\u8B9F\u8BAC\u8B9C\u8F6C",
        viewOriginal: "\u722A\u9A7B\u8B9B \u8B98\u8BEA\u62FD\u8B9C\u4E13",
        showAll: "\u8B9B\u722A\u8B99 \u8B9B\u8BBB\u8BC7",
        more: "\u8BEA\u62FD\u8B9C\u4E13\u8B9C\u8F6C \u8C1E\u8B9C\u4F4F\u9A7B\u8BAC\u8BD0",
        drawerTitle: "\u8BEA\u62FD\u8B9C\u4E13\u8B9C\u8F6C",
        expandMore: "\u8B9B\u722A\u8B99 \u6CE8\u8B9C\u8B9A",
        collapseMore: "\u8BBB\u8B9C\u8B9C\u6293",
        noSources: "\u8B97\u8BAC\u8C09 \u8BEA\u62FD\u8B9C\u4E13\u8B9C\u8F6C",
        today: "\u8B9B\u8BAC\u8B9C\u8BD0",
        last7Days: "7 \u8BAC\u8BEA\u8BAC\u8BD0 \u8B97\u8B9E\u4E13\u8B9C\u8C1E\u8BAC\u8BD0",
        last30Days: "30 \u8BAC\u8BEA\u8BAC\u8BD0 \u8B97\u8B9E\u4E13\u8B9C\u8C1E\u8BAC\u8BD0",
        earlier: "\u62FD\u8B9C\u8B9A\u8BD0",
        pinned: "\u8BEA\u8B9C\u722A\u8BEA\u8B9A"
      },
      conversations: {
        today: "\u8B9B\u8BAC\u8B9C\u8BD0",
        last7Days: "7 \u8B9B\u8BAC\u8BEA\u8BAC\u8BD0 \u8B9B\u8B97\u8B9E\u4E13\u8B9C\u8C1E\u8BAC\u8BD0",
        last30Days: "30 \u8B9B\u8BAC\u8BEA\u8BAC\u8BD0 \u8B9B\u8B97\u8B9E\u4E13\u8B9C\u8C1E\u8BAC\u8BD0",
        earlier: "\u8BEA\u8B9C\u62FD\u8B9A\u8BD0 \u8BAC\u8B9C\u8F6C\u4E13",
        pinned: "\u8BEA\u8B9C\u722A\u8BEA\u8B9A",
        pin: "\u8B9B\u722A\u8BEA\u8B9A",
        unpin: "\u8B98\u8B9F\u8BC7 \u8B9B\u722A\u8BEA\u8B9A\u8B9B",
        newConversation: "\u7816\u8BAC\u8B9E\u8B9B \u8B9E\u8B9A\u7816\u8B9B",
        noData: "\u8B97\u8BAC\u8C09 \u6CE8\u8B9A\u8BAC\u8BAC\u8C09 \u7816\u8BAC\u8B9E\u8B9C\u8F6C",
        rename: "\u7816\u8C1E\u8B9B \u7816\u8BD0",
        delete: "\u8BEA\u8B9E\u62FD",
        deleteConfirm: "\u8BC7\u8B97\u7816\u4E13 \u8BEA\u8B9E\u8BAC\u62FD\u8B9B \u7816\u8BC7 \u8B9B\u7816\u8BAC\u8B9E\u8B9B \u8B9B\u8B9D\u8B9C?"
      },
      attachments: {
        dropTip: "\u7816\u8B9E\u4E13\u4E13 \u8BBB\u8B97\u8C09 \u62FD\u8B98\u722A\u8BAC\u8BD0 \u8BBB\u8B9A\u8BAC \u8BC7\u8B9B\u6CE8\u8BC7\u8B9C\u8F6C",
        clickToUpload: "\u8BC7\u8B9E\u6293 \u8B97\u8B9C \u8B99\u4E13\u8B9C\u4E13 \u62FD\u8B98\u722A\u8BAC\u8BD0 \u8BBB\u8B9A\u8BAC \u8BC7\u8B9B\u6CE8\u8BC7\u8B9C\u8F6C",
        uploadSuccess: "\u8B9B\u8B9B\u6CE8\u8BC7\u8B97\u8B9B \u8B9B\u722A\u8BC7\u8BAC\u8B9E\u8B9B",
        uploadError: "\u8B9B\u8B9B\u6CE8\u8BC7\u8B97\u8B9B \u8C1E\u8BBB\u7816\u8BC7\u8B9B",
        deleteConfirm: "\u8B9B\u8B97\u8BD0 \u8B97\u8F6C\u8B9B \u8B98\u8B9F\u8B9C\u8B9E \u7816\u8B98\u4E13\u722A\u8B9C\u8C1E\u8BB1 \u8BC7\u8BEA\u8B9E\u8B9C\u62FD \u8B97\u8F6C \u8B9B\u62FD\u8B9C\u8B98\u6293 \u8B9B\u8B9D\u8B9B?",
        fileTooLarge: "\u8B99\u8B9C\u8B9A\u8BC7 \u8B9B\u62FD\u8B9C\u8B98\u6293 \u8BC7\u8B97 \u8BAC\u8BBB\u8B9C\u8BC7 \u8BC7\u6CE8\u8BC7\u8B9C\u8F6C \u6CE8\u8BC7 {size}",
        invalidFileType: "\u4F4F\u8B9C\u8B99 \u62FD\u8B9C\u8B98\u6293 \u8BC7\u8B97 \u8B9E\u8B9C\u62FD\u8BAC"
      },
      mermaid: {
        image: "\u8F6C\u8BEA\u8B9C\u8C1E\u8B9B",
        code: "\u62FD\u8B9C\u8B9A",
        zoomIn: "\u8B9B\u8B99\u8B9A\u8BC7",
        zoomOut: "\u8B9B\u62FD\u8B9F\u8C09",
        reset: "\u8B97\u9A7B\u4F4F",
        download: "\u8B9B\u8B9C\u4E13\u8B9A",
        copyCode: "\u8B9B\u6CE8\u8F6C\u62FD \u62FD\u8B9C\u8B9A",
        rendering: "\u8BEA\u8F6C\u8B98\u722A\u6CE8 \u4E13\u8BAC\u8C1E\u8B9A\u8B9C\u4E13...",
        renderError: "\u8B9B\u4E13\u8BAC\u8C1E\u8B9A\u8B9C\u4E13 \u8C1E\u8BBB\u7816\u8BC7",
        renderSuccess: "\u8B9B\u4E13\u8BAC\u8C1E\u8B9A\u8B9C\u4E13 \u8B9B\u722A\u8BC7\u8BAC\u8B9E",
        retry: "\u8C1E\u4F4F\u8B9B \u7816\u8B9C\u8B98"
      }
    }
  }
};
module.exports = he;