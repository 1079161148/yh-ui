import type { Language } from '../index'

export const pa: Language = {
  name: 'pa',
  yh: {
    // عمومي
    common: {
      yes: 'هو',
      no: 'نه',
      confirm: 'تایید',
      cancel: 'لغوه',
      loading: 'برسېرېدل',
      close: 'تړل',
      clear: 'پاکول',
      reset: 'بیا تنظیمول',
      save: 'خوندي کول',
      delete: 'ړنګول',
      edit: 'سمول',
      add: 'زیاتول',
      search: 'لټون',
      refresh: 'تازه کول',
      expand: 'پراخول',
      collapse: 'کمول',
      more: 'نور',
      noData: 'هیڅ معلومات نشته',
      noMatch: 'هیڅ مطابقت نشته',
      selectAll: 'ټول غوره کړئ',
      unselectAll: 'ټول غوره کول لغوه کړئ'
    },
    // رنګ غوره کونکی
    colorpicker: {
      confirm: 'سمه ده',
      clear: 'پاکول',
      eyeDropper: 'سترګه قطره',
      suggestionDark: 'سپین متن غوره دی',
      suggestionLight: 'تور متن غوره دی',
      recentColors: 'وروستي رنګونه',
      presetColors: 'پیش تنظیم شوي رنګونه'
    },
    // نیټه غوره کونکی
    datepicker: {
      now: 'اوس',
      today: 'نن',
      cancel: 'لغوه',
      clear: 'پاکول',
      confirm: 'سمه ده',
      selectDate: 'نیټه غوره کړئ',
      selectTime: 'وخت غوره کړئ',
      startDate: 'د پیل نیټه',
      startTime: 'د پیل وخت',
      endDate: 'د پای نیټه',
      endTime: 'د پای وخت',
      year: '',
      month: '',
      day: '',
      week: 'اونۍ',
      monthBeforeYear: true,
      prevYear: 'تیر کال',
      nextYear: 'راتلونکی کال',
      prevMonth: 'تیر میاشت',
      nextMonth: 'راتلونکې میاشت',
      weeks: {
        sun: 'یکشنبه',
        mon: 'دوشنبه',
        tue: 'سه‌شنبه',
        wed: 'چهارشنبه',
        thu: 'پنجشنبه',
        fri: 'جمعه',
        sat: 'شنبه'
      },
      months: {
        jan: 'جنوري',
        feb: 'فبروري',
        mar: 'مارچ',
        apr: 'اپریل',
        may: 'می',
        jun: 'جون',
        jul: 'جولای',
        aug: 'اګست',
        sep: 'سپتمبر',
        oct: 'اکتوبر',
        nov: 'نومبر',
        dec: 'دسمبر'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // وخت غوره کونکی
    timepicker: {
      confirm: 'سمه ده',
      cancel: 'لغوه',
      now: 'اوس',
      placeholder: 'وخت غوره کړئ',
      startPlaceholder: 'د پیل وخت',
      endPlaceholder: 'د پای وخت',
      selectTime: 'وخت غوره کړئ'
    },
    // وخت غوره کول
    timeselect: {
      placeholder: 'وخت غوره کړئ'
    },
    // ونه
    tree: {
      emptyText: 'هیڅ معلومات نشته',
      loading: 'برسېرېدل...',
      checkAll: 'ټول وګورئ',
      uncheckAll: 'ټول ناګورل',
      expandAll: 'ټول پراخول',
      collapseAll: 'ټول کمول'
    },
    // ونه غوره کول
    treeselect: {
      placeholder: 'غوره کړئ',
      emptyText: 'هیڅ معلومات نشته',
      loading: 'برسېرېدل...',
      noMatch: 'هیڅ مطابقت نشته'
    },
    // کیلنډر
    calendar: {
      prevMonth: 'تیر میاشت',
      nextMonth: 'راتلونکې میاشت',
      prevYear: 'تیر کال',
      nextYear: 'راتلونکی کال',
      today: 'نن',
      week: 'اونۍ',
      holiday: 'رخصتي',
      workday: 'کار',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'یکشنبه',
        mon: 'دوشنبه',
        tue: 'سه‌شنبه',
        wed: 'چهارشنبه',
        thu: 'پنجشنبه',
        fri: 'جمعه',
        sat: 'شنبه'
      }
    },
    // خپلکاره بشپړول
    autocomplete: {
      loading: 'برسېرېدل...',
      placeholder: 'مهرباني وکړئ داخل کړئ',
      noData: 'هیڅ معلومات نشته',
      noMatch: 'هیڅ مطابقت نشته'
    },
    // شمېرنې وروسته
    countdown: {
      days: 'ورځې',
      hours: 'ساعتونه',
      minutes: 'دقیقې',
      seconds: 'ثانیې',
      milliseconds: 'ملی ثانیې',
      finished: 'بشپړ شو'
    },
    // کاسکاډ غوره کول
    cascader: {
      noMatch: 'هیڅ مطابقت نشته',
      placeholder: 'غوره کړئ',
      loading: 'برسېرېدل...',
      noData: 'هیڅ معلومات نشته'
    },
    // لیږد
    transfer: {
      noMatch: 'هیڅ مطابقت نشته',
      noData: 'هیڅ معلومات نشته',
      titles: ['لیست 1', 'لیست 2'],
      filterPlaceholder: 'کلیدي کلمه داخل کړئ',
      noCheckedFormat: '{total} توکي',
      hasCheckedFormat: '{checked}/{total} غوره شوي',
      searchPlaceholder: 'کلیدي کلمه داخل کړئ'
    },
    // جدول
    table: {
      emptyText: 'هیڅ معلومات نشته',
      confirmFilter: 'تایید',
      resetFilter: 'بیا تنظیمول',
      clearFilter: 'ټول',
      sumText: 'مجموعه',
      loading: 'برسېرېدل...',
      index: 'شاخص',
      print: 'چاپ',
      cancel: 'لغوه',
      preview: 'د چاپ مخکتنه',
      printTime: 'د چاپ وخت',
      total: 'مجموعي {total} توکي',
      page: 'پاڼه {page}',
      yes: 'هو',
      no: 'نه',
      // د اوزارونو پینل
      toolbar: {
        refresh: 'تازه کول',
        density: 'کثافت',
        densityDefault: 'تلوالیز',
        densityLarge: 'لوی',
        densitySmall: 'وړوکی',
        columnSetting: 'د کالمونو تنظیمات',
        fullscreen: 'بشپړه پرده',
        exitFullscreen: 'د بشپړې پردې څخه ووتل',
        export: 'صادرول',
        import: 'واردول',
        search: 'لټون',
        searchPlaceholder: 'د لټون لپاره کلیدي کلمې داخل کړئ'
      },
      // فلټر
      filter: {
        selectAll: 'ټول غوره کړئ',
        selectInvert: 'د غوره کولو معکوس',
        empty: 'خالي دی',
        notEmpty: 'خالي نه دی',
        contains: 'شامل دی',
        notContains: 'شامل نه دی',
        equals: 'برابر دی',
        notEquals: 'برابر نه دی',
        startsWith: 'پیل کیږي',
        endsWith: 'پای کیږي',
        greaterThan: 'لوی دی',
        lessThan: 'وړوکی دی',
        between: 'تر منځ'
      },
      // ترتیب
      sort: {
        asc: 'د پورته کولو',
        desc: 'د ښکته کولو',
        clear: 'د ترتیب پاکول'
      },
      // صادرول
      export: {
        title: 'معلومات صادرول',
        filename: 'د فایل نوم',
        type: 'د فایل ډول',
        scope: 'د صادرولو ساحه',
        scopeAll: 'ټول معلومات',
        scopeSelected: 'غوره شوي معلومات',
        scopeCurrentPage: 'اوسنۍ پاڼه',
        includeHeader: 'سرلیک شامل کړئ',
        exporting: 'صادرېدل...',
        success: 'صادرول بریالی شو',
        error: 'د صادرولو تېروتنه'
      },
      // واردول
      import: {
        title: 'معلومات واردول',
        selectFile: 'فایل غوره کړئ',
        dragTip: 'د پورته کولو لپاره فایل دلته کلیک یا راکښل',
        importing: 'واردېدل...',
        success: 'واردول بریالی شو',
        error: 'د واردولو تېروتنه',
        preview: 'د معلوماتو مخکتنه',
        confirm: 'د واردولو تایید'
      },
      // چاپ
      printConfig: {
        title: 'د چاپ تنظیمات',
        pageTitle: 'د پاڼې سرلیک',
        pageHeader: 'سرلیک',
        pageFooter: 'فوټر',
        printAll: 'ټول چاپ کړئ',
        printSelected: 'غوره شوي چاپ کړئ',
        printCurrentPage: 'اوسنۍ پاڼه چاپ کړئ',
        landscape: 'افقی',
        portrait: 'عمودي',
        printing: 'چاپېدل...'
      },
      // د کالمونو تنظیمات
      columnSetting: {
        title: 'د کالمونو تنظیمات',
        showAll: 'ټول وښایاست',
        hideAll: 'ټول پټول',
        reset: 'بیا تنظیمول',
        fixedLeft: 'کیڼ ته ثابت کړئ',
        fixedRight: 'ښي ته ثابت کړئ',
        unfixed: 'ثابت کول لغوه کړئ'
      },
      // د سیاق مینو
      contextMenu: {
        copy: 'کاپي',
        copyRow: 'قطار کاپي کړئ',
        copyCell: 'حجره کاپي کړئ',
        paste: 'پیسټ',
        insertRowAbove: 'پورته قطار اضافه کړئ',
        insertRowBelow: 'لاندې قطار اضافه کړئ',
        deleteRow: 'قطار ړنګول',
        deleteSelectedRows: 'غوره شوي قطارونه ړنګول',
        exportSelected: 'غوره شوي صادرول'
      },
      // غوره کول
      selection: {
        selectAll: 'ټول غوره کړئ',
        selectInvert: 'د غوره کولو معکوس',
        selectNone: 'د غوره کولو پاکول',
        selected: '{count} توکي غوره شوي'
      },
      // پراخول
      expand: {
        expandAll: 'ټول پراخول',
        collapseAll: 'ټول کمول'
      },
      // ونه
      tree: {
        expandAll: 'ټول پراخول',
        collapseAll: 'ټول کمول',
        expandLevel: 'د {level} کچې ته پراخول'
      },
      // راکښل
      drag: {
        dragTip: 'د بیا ترتیب لپاره راکښل',
        dropTip: 'د ځای لپاره پرېږدئ'
      }
    },
    // د پیغام بکس
    messagebox: {
      title: 'پیغام',
      confirm: 'سمه ده',
      cancel: 'لغوه',
      close: 'تړل',
      error: 'ناسم داخل',
      alert: 'خبرداری',
      prompt: 'لارښود',
      inputPlaceholder: 'مهرباني وکړئ داخل کړئ'
    },
    // پورته کول
    upload: {
      deleteTip: 'د ړنګولو لپاره delete فشار ورکړئ',
      delete: 'ړنګول',
      preview: 'مخکتنه',
      continue: 'دوام',
      upload: 'د پورته کولو لپاره کلیک وکړئ',
      tip: 'د <em>پورته کولو</em> لپاره فایل دلته کلیک یا راکښل',
      dragTip: 'فایل دلته راکښل یا د پورته کولو لپاره کلیک وکړئ',
      uploading: 'پورته کېدل...',
      success: 'پورته کول بریالی شو',
      error: 'د پورته کولو تېروتنه',
      retry: 'بیا هڅه',
      cancel: 'د پورته کولو لغوه کول',
      fileTypeError: 'د فایل ډول ملاتړ نه کیږي',
      fileSizeError: 'د فایل اندازه حد څخه زیاته ده',
      fileCountError: 'د فایلونو شمیر حد څخه زیات دی'
    },
    // فورمه
    form: {
      validationFailed: 'د اعتبار چک ناکام شو',
      required: 'اړین',
      pleaseInput: 'مهرباني وکړئ داخل کړئ',
      pleaseSelect: 'مهرباني وکړئ غوره کړئ'
    },
    // تڼۍ
    button: {
      loading: 'برسېرېدل...'
    },
    // داخلول
    input: {
      placeholder: 'مهرباني وکړئ داخل کړئ',
      clear: 'پاکول',
      showPassword: 'پاسورډ وښایاست',
      hidePassword: 'پاسورډ پټول',
      copy: 'کاپي',
      copied: 'کاپي شو'
    },
    // شمیره داخلول
    inputnumber: {
      placeholder: 'مهرباني وکړئ شمیره داخل کړئ',
      increase: 'زیاتول',
      decrease: 'کمول'
    },
    // نښه داخلول
    inputtag: {
      placeholder: 'مهرباني وکړئ داخل کړئ',
      add: 'زیاتول',
      remove: 'ړنګول'
    },
    // د ډبرو کړۍ
    breadcrumb: {
      label: 'د ډبرو کړۍ',
      more: 'نور'
    },
    // پورته ته بیرته
    backtop: {
      text: 'پورته ته بیرته'
    },
    // غوره کول
    select: {
      placeholder: 'مهرباني وکړئ غوره کړئ',
      noData: 'هیڅ معلومات نشته',
      loading: 'برسېرېدل...',
      noMatch: 'هیڅ مطابقت نشته',
      selectAll: 'ټول غوره کړئ',
      clearAll: 'ټول پاکول'
    },
    // پاڼه کول
    pagination: {
      goto: 'ته لاړ شئ',
      page: '',
      total: 'مجموعي {total}',
      pageSize: '/پاڼه',
      prev: 'تیر',
      next: 'راتلونکی',
      first: 'لومړی',
      last: 'وروستی',
      pageClassifier: ''
    },
    // د تایید پاپ اپ
    popconfirm: {
      confirm: 'سمه ده',
      cancel: 'لغوه',
      dontAskAgain: 'بیا مه پوښتنه وکړئ'
    },
    // دیالوګ
    dialog: {
      confirm: 'سمه ده',
      cancel: 'لغوه',
      close: 'تړل',
      maximize: 'زیاتول',
      restore: 'بیا راګرځول'
    },
    // کشو
    drawer: {
      close: 'تړل',
      confirm: 'سمه ده',
      cancel: 'لغوه'
    },
    // ښکته مینو
    dropdown: {
      loading: 'برسېرېدل...'
    },
    // انځور
    image: {
      error: 'ناکام',
      loading: 'برسېرېدل...',
      preview: 'مخکتنه',
      zoomIn: 'زیاتول',
      zoomOut: 'کمول',
      rotateLeft: 'کیڼ ته چورلول',
      rotateRight: 'ښي ته چورلول',
      originalSize: 'اصلي اندازه',
      fullscreen: 'بشپړه پرده'
    },
    // د انځور لیدونکی
    imageviewer: {
      close: 'تړل',
      prev: 'تیر',
      next: 'راتلونکی',
      zoomIn: 'زیاتول',
      zoomOut: 'کمول',
      rotateLeft: 'کیڼ ته چورلول',
      rotateRight: 'ښي ته چورلول',
      reset: 'بیا تنظیمول',
      fullscreen: 'بشپړه پرده',
      exitFullscreen: 'د بشپړې پردې څخه ووتل'
    },
    // بې پایه سکرول
    infinitescroll: {
      loading: 'برسېرېدل...',
      finished: 'نور معلومات نشته',
      error: 'د برسېرولو تېروتنه، د بیا هڅې لپاره کلیک وکړئ',
      retry: 'د بیا هڅې لپاره کلیک وکړئ'
    },
    // پیغام
    message: {
      close: 'تړل'
    },
    // خبرتیا
    notification: {
      close: 'تړل'
    },
    // برسېرېدل
    loading: {
      text: 'برسېرېدل...'
    },
    // سپینر
    spin: {
      text: 'برسېرېدل...'
    },
    // درجه بندي
    rate: {
      texts: ['ډیر خراب', 'ناامید', 'مناسب', 'خوښ', 'حیران']
    },
    // خبرداری
    alert: {
      close: 'تړل'
    },
    // نښه
    tag: {
      close: 'تړل'
    },
    // ټیبونه
    tabs: {
      close: 'تړل',
      add: 'زیاتول',
      more: 'نور'
    },
    // ګامونه
    steps: {
      finish: 'بشپړ شو',
      process: 'پرمختګ کې',
      wait: 'انتظار',
      error: 'تېروتنه'
    },
    // پرمختګ
    progress: {
      success: 'بریالیتوب',
      exception: 'استثنا',
      warning: 'خبرداری'
    },
    // سکلېټون
    skeleton: {
      loading: 'برسېرېدل...'
    },
    // خالي
    empty: {
      description: 'هیڅ معلومات نشته',
      noData: 'هیڅ معلومات نشته',
      noResult: 'هیڅ پایله نشته',
      networkError: 'د شبکې تېروتنه',
      serverError: 'د سرور تېروتنه'
    },
    // پایله
    result: {
      success: 'بریالیتوب',
      error: 'تېروتنه',
      warning: 'خبرداری',
      info: 'معلومات',
      backHome: 'کور ته بیرته'
    },
    // اوبه
    waterfall: {
      loading: 'برسېرېدل...',
      noMore: 'نور معلومات نشته',
      empty: 'هیڅ معلومات نشته'
    },
    // توضیحات
    descriptions: {
      colon: ':'
    },
    // سلیډر
    slider: {
      tipFormatter: '{value}'
    },
    // سویچ
    switch: {
      on: 'ON',
      off: 'OFF'
    },
    // چک بکس
    checkbox: {
      selectAll: 'ټول غوره کړئ'
    },
    // رادیو
    radio: {},
    // مینو
    menu: {
      collapse: 'مینو کمول',
      expand: 'مینو پراخول'
    },
    // کارت
    card: {
      collapse: 'کمول',
      expand: 'پراخول'
    },
    // کمول
    collapse: {
      expand: 'پراخول',
      collapse: 'کمول'
    },
    // د لارښود نوک
    tooltip: {},
    // پاپ اوور
    popover: {},
    // بیج
    badge: {},
    // اوتار
    avatar: {
      error: 'د برسېرولو تېروتنه'
    },
    // د اوبو نښه
    watermark: {},
    // ویشونکی
    divider: {},
    // کاروسل
    carousel: {
      prev: 'تیر',
      next: 'راتلونکی'
    },
    // مارکیو
    marquee: {},
    // تثبیت
    affix: {},
    // انکر
    anchor: {}
  }
}

export default pa
