import type { Language } from '../index'

export const ckb: Language = {
  name: 'ckb',
  yh: {
    // گشتی
    common: {
      yes: 'بەڵێ',
      no: 'نەخێر',
      confirm: 'دڵنیاکردنەوە',
      cancel: 'هەڵوەشاندن',
      loading: 'بارکردن',
      close: 'داخستن',
      clear: 'پاککردنەوە',
      reset: 'دووبارەکردنەوە',
      save: 'پاشەکەوتکردن',
      delete: 'سڕینەوە',
      edit: 'دەستکاریکردن',
      add: 'زیادکردن',
      search: 'گەڕان',
      refresh: 'نوێکردنەوە',
      expand: 'فراوانکردن',
      collapse: 'کەمکردنەوە',
      more: 'زیاتر',
      noData: 'داتا نییە',
      noMatch: 'داتای گونجاو نییە',
      selectAll: 'هەموو هەڵبژێرە',
      unselectAll: 'هەموو هەڵبژاردن هەڵوەشێنەوە'
    },
    // هەڵبژاردنی ڕەنگ
    colorpicker: {
      confirm: 'باشە',
      clear: 'پاککردنەوە',
      eyeDropper: 'چەقۆی چاو',
      suggestionDark: 'دەقی سپی باشترە',
      suggestionLight: 'دەقی ڕەش باشترە',
      recentColors: 'ڕەنگەکانی دواتر',
      presetColors: 'ڕەنگە پێشتر دیاریکراوەکان'
    },
    // هەڵبژاردنی بەروار
    datepicker: {
      now: 'ئێستا',
      today: 'ئەمڕۆ',
      cancel: 'هەڵوەشاندن',
      clear: 'پاککردنەوە',
      confirm: 'باشە',
      selectDate: 'بەروار هەڵبژێرە',
      selectTime: 'کات هەڵبژێرە',
      startDate: 'بەرواری دەستپێکردن',
      startTime: 'کاتی دەستپێکردن',
      endDate: 'بەرواری کۆتایی',
      endTime: 'کاتی کۆتایی',
      year: '',
      month: '',
      day: '',
      week: 'هەفتە',
      monthBeforeYear: true,
      prevYear: 'ساڵی پێشوو',
      nextYear: 'ساڵی داهاتوو',
      prevMonth: 'مانگی پێشوو',
      nextMonth: 'مانگی داهاتوو',
      weeks: {
        sun: 'یەک',
        mon: 'دوو',
        tue: 'سێ',
        wed: 'چوار',
        thu: 'پێنج',
        fri: 'شەش',
        sat: 'حەوت'
      },
      months: {
        jan: 'کانوونی دووەم',
        feb: 'شوبات',
        mar: 'ئازار',
        apr: 'نیسان',
        may: 'ئایار',
        jun: 'حوزەیران',
        jul: 'تەممووز',
        aug: 'ئاب',
        sep: 'ئەیلوول',
        oct: 'تشرینی یەکەم',
        nov: 'تشرینی دووەم',
        dec: 'کانوونی یەکەم'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // هەڵبژاردنی کات
    timepicker: {
      confirm: 'باشە',
      cancel: 'هەڵوەشاندن',
      now: 'ئێستا',
      placeholder: 'کات هەڵبژێرە',
      startPlaceholder: 'کاتی دەستپێکردن',
      endPlaceholder: 'کاتی کۆتایی',
      selectTime: 'کات هەڵبژێرە'
    },
    // هەڵبژاردنی کات
    timeselect: {
      placeholder: 'کات هەڵبژێرە'
    },
    // دار
    tree: {
      emptyText: 'داتا نییە',
      loading: 'بارکردن...',
      checkAll: 'هەموو پشکنین بکە',
      uncheckAll: 'هەموو پشکنین هەڵوەشێنەوە',
      expandAll: 'هەموو فراوان بکە',
      collapseAll: 'هەموو کەم بکەوە'
    },
    // هەڵبژاردنی دار
    treeselect: {
      placeholder: 'هەڵبژێرە',
      emptyText: 'داتا نییە',
      loading: 'بارکردن...',
      noMatch: 'داتای گونجاو نییە'
    },
    // کاتژمێر
    calendar: {
      prevMonth: 'مانگی پێشوو',
      nextMonth: 'مانگی داهاتوو',
      prevYear: 'ساڵی پێشوو',
      nextYear: 'ساڵی داهاتوو',
      today: 'ئەمڕۆ',
      week: 'هەفتە',
      holiday: 'جێژنی پشوو',
      workday: 'کار',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'یەک',
        mon: 'دوو',
        tue: 'سێ',
        wed: 'چوار',
        thu: 'پێنج',
        fri: 'شەش',
        sat: 'حەوت'
      }
    },
    // خۆکار پڕکردنەوە
    autocomplete: {
      loading: 'بارکردن...',
      placeholder: 'تکایە بنووسە',
      noData: 'داتا نییە',
      noMatch: 'داتای گونجاو نییە'
    },
    // ژماردن بەپێچەوانە
    countdown: {
      days: 'ڕۆژ',
      hours: 'کاتژمێر',
      minutes: 'خولەک',
      seconds: 'چرکە',
      milliseconds: 'ملی چرکە',
      finished: 'تەواو بوو'
    },
    // کاسکاد
    cascader: {
      noMatch: 'داتای گونجاو نییە',
      placeholder: 'هەڵبژێرە',
      loading: 'بارکردن...',
      noData: 'داتا نییە'
    },
    // گواستنەوە
    transfer: {
      noMatch: 'داتای گونجاو نییە',
      noData: 'داتا نییە',
      titles: ['لیست 1', 'لیست 2'],
      filterPlaceholder: 'وشەی سەرەکی بنووسە',
      noCheckedFormat: '{total} بەند',
      hasCheckedFormat: '{checked}/{total} هەڵبژێردراو',
      searchPlaceholder: 'وشەی سەرەکی بنووسە'
    },
    // خشتە
    table: {
      emptyText: 'داتا نییە',
      confirmFilter: 'دڵنیاکردنەوە',
      resetFilter: 'دووبارەکردنەوە',
      clearFilter: 'هەموو',
      sumText: 'کۆ',
      loading: 'بارکردن...',
      index: 'نیشانە',
      print: 'چاپکردن',
      cancel: 'هەڵوەشاندن',
      preview: 'پێشبینینی چاپ',
      printTime: 'کاتی چاپ',
      total: 'کۆی {total} بەند',
      page: 'لاپەڕە {page}',
      yes: 'بەڵێ',
      no: 'نەخێر',
      // تووڵی ئامراز
      toolbar: {
        refresh: 'نوێکردنەوە',
        density: 'چڕی',
        densityDefault: 'بنەڕەتی',
        densityLarge: 'گەورە',
        densitySmall: 'بچووک',
        columnSetting: 'ڕێکخستنی ستوون',
        fullscreen: 'پڕ شاشە',
        exitFullscreen: 'دەرچوون لە پڕ شاشە',
        export: 'دەرهێنان',
        import: 'هاوردەکردن',
        search: 'گەڕان',
        searchPlaceholder: 'بۆ گەڕان وشەی سەرەکی بنووسە'
      },
      // فلتەر
      filter: {
        selectAll: 'هەموو هەڵبژێرە',
        selectInvert: 'هەڵبژاردن پێچەوانە بکە',
        empty: 'بەتاڵە',
        notEmpty: 'بەتاڵ نییە',
        contains: 'تێدایە',
        notContains: 'تێدا نییە',
        equals: 'یەکسانە',
        notEquals: 'یەکسان نییە',
        startsWith: 'دەست پێدەکات',
        endsWith: 'کۆتایی دێت',
        greaterThan: 'گەورەترە',
        lessThan: 'بچووکترە',
        between: 'لە نێوان'
      },
      // ڕیزکردن
      sort: {
        asc: 'زیادبوون',
        desc: 'کەمبوون',
        clear: 'ڕیزکردن پاک بکە'
      },
      // دەرهێنان
      export: {
        title: 'داتا دەرهێنە',
        filename: 'ناوی فایل',
        type: 'جۆری فایل',
        scope: 'سنوری دەرهێنان',
        scopeAll: 'هەموو داتاکان',
        scopeSelected: 'داتای هەڵبژێردراو',
        scopeCurrentPage: 'لاپەڕەی ئێستا',
        includeHeader: 'سەردێڕ تێکەڵ بکە',
        exporting: 'دەرهێنان...',
        success: 'دەرهێنان سەرکەوتوو بوو',
        error: 'دەرهێنان سەرکەوتوو نەبوو'
      },
      // هاوردەکردن
      import: {
        title: 'داتا هاوردە بکە',
        selectFile: 'فایل هەڵبژێرە',
        dragTip: 'بۆ بارکردن فایل لێ بدە یان بکێشە',
        importing: 'هاوردەکردن...',
        success: 'هاوردەکردن سەرکەوتوو بوو',
        error: 'هاوردەکردن سەرکەوتوو نەبوو',
        preview: 'پێشبینینی داتا',
        confirm: 'هاوردەکردن دڵنیا بکەوە'
      },
      // چاپکردن
      printConfig: {
        title: 'ڕێکخستنی چاپ',
        pageTitle: 'سەردێڕی لاپەڕە',
        pageHeader: 'سەردێڕ',
        pageFooter: 'ژێردێڕ',
        printAll: 'هەموو چاپ بکە',
        printSelected: 'هەڵبژێردراو چاپ بکە',
        printCurrentPage: 'لاپەڕەی ئێستا چاپ بکە',
        landscape: 'ئاسۆیی',
        portrait: 'ستوونی',
        printing: 'چاپ دەکرێت...'
      },
      // ڕێکخستنی ستوون
      columnSetting: {
        title: 'ڕێکخستنی ستوون',
        showAll: 'هەموو پیشان بدە',
        hideAll: 'هەموو بشارەوە',
        reset: 'دووبارەکردنەوە',
        fixedLeft: 'لە چەپ جێگیر بکە',
        fixedRight: 'لە ڕاست جێگیر بکە',
        unfixed: 'جێگیر نەکە'
      },
      // مێنیوی دۆخ
      contextMenu: {
        copy: 'کۆپی بکە',
        copyRow: 'ڕیزی کۆپی بکە',
        copyCell: 'خانە کۆپی بکە',
        paste: 'لکاندن',
        insertRowAbove: 'ڕیزی سەرەوە زیاد بکە',
        insertRowBelow: 'ڕیزی خوارەوە زیاد بکە',
        deleteRow: 'ڕیزی بسڕەوە',
        deleteSelectedRows: 'ڕیزە هەڵبژێردراوەکان بسڕەوە',
        exportSelected: 'هەڵبژێردراو دەرهێنە'
      },
      // هەڵبژاردن
      selection: {
        selectAll: 'هەموو هەڵبژێرە',
        selectInvert: 'هەڵبژاردن پێچەوانە بکە',
        selectNone: 'هەڵبژاردن پاک بکە',
        selected: '{count} بەند هەڵبژێردراو'
      },
      // فراوانکردن
      expand: {
        expandAll: 'هەموو فراوان بکە',
        collapseAll: 'هەموو کەم بکەوە'
      },
      // دار
      tree: {
        expandAll: 'هەموو فراوان بکە',
        collapseAll: 'هەموو کەم بکەوە',
        expandLevel: 'بۆ ئاست {level} فراوان بکە'
      },
      // کێشاندن
      drag: {
        dragTip: 'بۆ ڕیزکردنی نوێ بکێشە',
        dropTip: 'بۆ دانان بەجێی بهێڵە'
      }
    },
    // بۆکسەی پەیام
    messagebox: {
      title: 'پەیام',
      confirm: 'باشە',
      cancel: 'هەڵوەشاندن',
      close: 'داخستن',
      error: 'داخلکردنی نادروست',
      alert: 'ئاگاداری',
      prompt: 'داوای',
      inputPlaceholder: 'تکایە بنووسە'
    },
    // بارکردن
    upload: {
      deleteTip: 'بۆ سڕینەوە delete بگرە',
      delete: 'سڕینەوە',
      preview: 'پێشبینین',
      continue: 'بەردەوام بە',
      upload: 'بۆ بارکردن کلیک بکە',
      tip: 'بۆ <em>بارکردن</em> فایل لەم ناوچەیە کلیک بکە یان بکێشە',
      dragTip: 'فایل لێ بدە یان بۆ بارکردن کلیک بکە',
      uploading: 'بار دەکرێت...',
      success: 'بارکردن سەرکەوتوو بوو',
      error: 'بارکردن سەرکەوتوو نەبوو',
      retry: 'دووبارە هەوڵ بدە',
      cancel: 'بارکردن هەڵوەشێنەوە',
      fileTypeError: 'جۆری فایل پشتگیری ناکرێت',
      fileSizeError: 'قەبارەی فایل لە سنور دەرچوو',
      fileCountError: 'ژمارەی فایل لە سنور دەرچوو'
    },
    // فۆرم
    form: {
      validationFailed: 'پشتڕاستکردنەوە سەرکەوتوو نەبوو',
      required: 'پێویستە',
      pleaseInput: 'تکایە بنووسە',
      pleaseSelect: 'تکایە هەڵبژێرە'
    },
    // دوگمە
    button: {
      loading: 'بارکردن...'
    },
    // داخلکردن
    input: {
      placeholder: 'تکایە بنووسە',
      clear: 'پاککردنەوە',
      showPassword: 'تێپەڕەوش پێشان بدە',
      hidePassword: 'تێپەڕەوش بشارەوە',
      copy: 'کۆپی بکە',
      copied: 'کۆپی کرا'
    },
    // ژمارەی داخلکردن
    inputnumber: {
      placeholder: 'تکایە ژمارە بنووسە',
      increase: 'زیاد بکە',
      decrease: 'کەم بکە'
    },
    // تاگی داخلکردن
    inputtag: {
      placeholder: 'تکایە بنووسە',
      add: 'زیادکردن',
      remove: 'سڕینەوە'
    },
    // ڕێگەی ناوبردن
    breadcrumb: {
      label: 'ڕێگەی ناوبردن',
      more: 'زیاتر'
    },
    // گەڕانەوە بۆ سەرەوە
    backtop: {
      text: 'گەڕانەوە بۆ سەرەوە'
    },
    // هەڵبژاردن
    select: {
      placeholder: 'تکایە هەڵبژێرە',
      noData: 'داتا نییە',
      loading: 'بارکردن...',
      noMatch: 'داتای گونجاو نییە',
      selectAll: 'هەموو هەڵبژێرە',
      clearAll: 'هەموو پاک بکە'
    },
    // لاپەڕەکردن
    pagination: {
      goto: 'بچۆ بۆ',
      page: '',
      total: 'کۆی {total}',
      pageSize: '/لاپەڕە',
      prev: 'پێشوو',
      next: 'دواتر',
      first: 'یەکەم',
      last: 'کۆتایی',
      pageClassifier: ''
    },
    // پۆپ دڵنیاکردنەوە
    popconfirm: {
      confirm: 'باشە',
      cancel: 'هەڵوەشاندن',
      dontAskAgain: 'دووبارە پرسیار مەکە'
    },
    // دیالۆگ
    dialog: {
      confirm: 'باشە',
      cancel: 'هەڵوەشاندن',
      close: 'داخستن',
      maximize: 'زۆر گەورە بکە',
      restore: 'گەڕاندنەوە'
    },
    // کشاوە
    drawer: {
      close: 'داخستن',
      confirm: 'باشە',
      cancel: 'هەڵوەشاندن'
    },
    // مێنیوی داکەوتوو
    dropdown: {
      loading: 'بارکردن...'
    },
    // وێنە
    image: {
      error: 'سەرکەوتوو نەبوو',
      loading: 'بارکردن...',
      preview: 'پێشبینین',
      zoomIn: 'گەورە بکە',
      zoomOut: 'بچووک بکە',
      rotateLeft: 'لە چەپ بگێڕەوە',
      rotateRight: 'لە ڕاست بگێڕەوە',
      originalSize: 'قەبارەی بنەڕەتی',
      fullscreen: 'پڕ شاشە'
    },
    // بینەری وێنە
    imageviewer: {
      close: 'داخستن',
      prev: 'پێشوو',
      next: 'دواتر',
      zoomIn: 'گەورە بکە',
      zoomOut: 'بچووک بکە',
      rotateLeft: 'لە چەپ بگێڕەوە',
      rotateRight: 'لە ڕاست بگێڕەوە',
      reset: 'دووبارەکردنەوە',
      fullscreen: 'پڕ شاشە',
      exitFullscreen: 'دەرچوون لە پڕ شاشە'
    },
    // هاتن بێ کۆتایی
    infinitescroll: {
      loading: 'بارکردن...',
      finished: 'داتای زیاتر نییە',
      error: 'بارکردن سەرکەوتوو نەبوو، بۆ دووبارە هەوڵدان کلیک بکە',
      retry: 'بۆ دووبارە هەوڵدان کلیک بکە'
    },
    // پەیام
    message: {
      close: 'داخستن'
    },
    // ئاگاداری
    notification: {
      close: 'داخستن'
    },
    // بارکردن
    loading: {
      text: 'بارکردن...'
    },
    // خولانەوە
    spin: {
      text: 'بارکردن...'
    },
    // نرخاندن
    rate: {
      texts: ['زۆر خراپ', 'ناامید', 'مامناوەند', 'ڕازی', 'سەرسام']
    },
    // ئاگاداری
    alert: {
      close: 'داخستن'
    },
    // تاگ
    tag: {
      close: 'داخستن'
    },
    // تاب
    tabs: {
      close: 'داخستن',
      add: 'زیادکردن',
      more: 'زیاتر'
    },
    // هەنگاو
    steps: {
      finish: 'تەواو بوو',
      process: 'لە جریاندا',
      wait: 'چاوەڕێ دەکات',
      error: 'هەڵە'
    },
    // پێشکەوتن
    progress: {
      success: 'سەرکەوتوو',
      exception: 'جیاوازی',
      warning: 'ئاگاداری'
    },
    // پەیکەر
    skeleton: {
      loading: 'بارکردن...'
    },
    // بەتاڵ
    empty: {
      description: 'داتا نییە',
      noData: 'داتا نییە',
      noResult: 'ئەنجام نییە',
      networkError: 'هەڵەی تۆڕ',
      serverError: 'هەڵەی سێرڤەر'
    },
    // ئەنجام
    result: {
      success: 'سەرکەوتوو',
      error: 'هەڵە',
      warning: 'ئاگاداری',
      info: 'زانیاری',
      backHome: 'گەڕانەوە بۆ ماڵەوە'
    },
    // شەڵەڵە
    waterfall: {
      loading: 'بارکردن...',
      noMore: 'داتای زیاتر نییە',
      empty: 'داتا نییە'
    },
    // وەسف
    descriptions: {
      colon: ':'
    },
    // سلایدەر
    slider: {
      tipFormatter: '{value}'
    },
    // گۆڕان
    switch: {
      on: 'کراوە',
      off: 'داخراو'
    },
    // بۆکسەی پشکنین
    checkbox: {
      selectAll: 'هەموو هەڵبژێرە'
    },
    // ڕادیۆ
    radio: {},
    // مێنیو
    menu: {
      collapse: 'مێنیو کەم بکەوە',
      expand: 'مێنیو فراوان بکە'
    },
    // کارت
    card: {
      collapse: 'کەمکردنەوە',
      expand: 'فراوانکردن'
    },
    // کەمکردنەوە
    collapse: {
      expand: 'فراوانکردن',
      collapse: 'کەمکردنەوە'
    },
    // ئامۆژگاری
    tooltip: {},
    // پۆپۆڤەر
    popover: {},
    // نیشانە
    badge: {},
    // ئاڤاتار
    avatar: {
      error: 'بارکردن سەرکەوتوو نەبوو'
    },
    // نیشانەی ئاو
    watermark: {},
    // جیاکەرەوە
    divider: {},
    // کاروسێل
    carousel: {
      prev: 'پێشوو',
      next: 'دواتر'
    },
    // مارکی
    marquee: {},
    // بەستن
    affix: {},
    // لەنگەر
    anchor: {},
    // Mention
    mention: {
      placeholder: 'تکایە بنووسە',
      loading: 'بارکردن...',
      noData: 'هیچ داتایەک نییە'
    },
    // AI Components
    ai: {
      bubble: {
        citations: 'بەستەرەکان'
      },
      mention: {
        placeholder: '@ ئەیجێنت، دۆکومێنت یان خشتە ئاماژە بکە...',
        agent: 'ئەیجێنت',
        document: 'دۆکومێنت',
        table: 'خشتە',
        knowledge: 'زانیاری'
      },
      codeBlock: {
        copyCode: 'کۆد کۆپی بکە',
        copied: 'کۆپی کرا!',
        run: 'کۆد بەرێنە',
        edit: 'دەستکاری',
        save: 'پاشەکەوت',
        cancel: 'هەڵوەشاندنەوە'
      },
      codeRunner: {
        run: 'بەرێنە',
        stop: 'وەستێنە',
        clear: 'پاکبکەوە',
        reset: 'دووبارە دانانەوە',
        placeholder: 'بۆ بەرێنانی کۆد کلیک لەسەر بەرێنە بکە...'
      },
      sender: {
        placeholder: 'پەیام بنێرە...',
        dragTip: 'بۆ ئەپلۆدکردنی فایلەکان ئازادی بکە'
      },
      thoughtChain: {
        thoughtProcess: 'پرۆسەی ئەندێشە',
        thinking: 'ئەندێشەدەکات...',
        defaultTitle: 'هەنگاوێکی نوێ',
        addNode: 'هەنگاو زیاد بکە'
      },
      thinking: {
        start: 'دەست بکە بە ئەندێشە',
        thinking: 'ئەندێشەدەکات...',
        complete: 'ئەندێشەکە تەواو بوو',
        error: 'هەڵەیەک لە ئەندێشە'
      },
      welcome: {
        title: 'سڵاو، من YH AI یم',
        description:
          'دەتوانم یارمەتیت بدەم لە کۆدنووسین، وەرگێڕانی دۆکومێنت یان نووسینی داهێنەرانە. ئەمرۆ دەتوانم چی بکەم بۆ تۆ؟'
      },
      action: {
        copy: 'کۆپی',
        regenerate: 'دووبارە دروستکردن',
        share: 'هاوبەشی',
        like: 'بەدڵنیایی',
        dislike: 'بەدڵنیایی نییە',
        edit: 'دەستکاری',
        delete: 'سڕینەوە'
      },
      artifacts: {
        preview: 'پێشەنگانە',
        inline: 'ناو هێڵ',
        code: 'سەرچاوەی کۆد',
        versions: 'وەشانەکان',
        rendering: 'بەستەرەکە دەردەکەوێت...',
        renderingChart: 'وێنەیەکە دەردەکەوێت...',
        renderingCanvas: 'سێڵا دەست دەکەوێت...'
      },
      voice: {
        trigger: 'کلیک بکە بۆ قسەکردن',
        listening: 'گوێدەدات...'
      },
      agent: {
        uses: 'بەکارهێنان',
        use: 'ئێستا بەکاربێنە',
        favorite: 'دڵخواز',
        unfavorite: 'لابردنی دڵخواز',
        share: 'هاوبەشی',
        online: 'ئۆنلاین',
        offline: 'ئۆفلاین',
        busy: '_BUSY_',
        verified: 'دڵنیاکراوە',
        rating: 'پلە',
        reviews: 'رەخنە',
        responseTime: 'کاتی وەڵامدانەوەی مامناوەند',
        ms: 'میلیۆنیەکان'
      },
      sources: {
        references: 'سەرچاوەکان',
        referencedSources: 'سەرچاوە ئاماژەپێکراوەکان',
        relevant: 'پەیوەندیدار',
        viewOriginal: 'ئەسڵی ببینە',
        showAll: 'هەمووی ببینە',
        more: 'سەرچاوەی تر',
        drawerTitle: 'سەرچاوەکان',
        expandMore: 'زیاتر ببینە',
        collapseMore: 'کۆکردنەوە',
        noSources: 'هیچ سەرچاوەیەک نییە',
        today: 'ئەمرۆ',
        last7Days: '7 ڕۆژی پێشوو',
        last30Days: '30 ڕۆژی پێشوو',
        earlier: 'پێشتر',
        pinned: 'پینکراو'
      },
      conversations: {
        today: 'ئەمرۆ',
        last7Days: '7 ڕۆژی پێشوو',
        last30Days: '30 ڕۆژی پێشوو',
        earlier: 'پێشتر',
        pinned: 'پینکراو',
        pin: 'پینک بکە',
        unpin: 'پینکەکە لاببە',
        newConversation: 'گفتوگۆیەکی نوێ',
        rename: 'ناو بگۆڕە',
        delete: 'سڕینەوە',
        deleteConfirm: 'دڵنیایی لە سڕینەوەی ئەم گفتوگۆیە؟'
      }
    }
  }
}

export default ckb
