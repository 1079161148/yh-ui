import type { Language } from '../index'

export const fa: Language = {
  name: 'fa',
  yh: {
    // عمومی
    common: {
      yes: 'بله',
      no: 'خیر',
      confirm: 'تایید',
      cancel: 'لغو',
      loading: 'در حال بارگذاری',
      close: 'بستن',
      clear: 'پاک کردن',
      reset: 'بازنشانی',
      save: 'ذخیره',
      delete: 'حذف',
      edit: 'ویرایش',
      add: 'افزودن',
      search: 'جستجو',
      refresh: 'تازه‌سازی',
      expand: 'باز کردن',
      collapse: 'جمع کردن',
      more: 'بیشتر',
      noData: 'داده‌ای وجود ندارد',
      noMatch: 'موردی یافت نشد',
      selectAll: 'انتخاب همه',
      unselectAll: 'لغو انتخاب همه'
    },
    // انتخابگر رنگ
    colorpicker: {
      confirm: 'تایید',
      clear: 'پاک کردن',
      eyeDropper: 'قطره‌چکان',
      suggestionDark: 'متن سفید بهتر است',
      suggestionLight: 'متن سیاه بهتر است',
      recentColors: 'رنگ‌های اخیر',
      presetColors: 'رنگ‌های از پیش تعیین شده'
    },
    // انتخابگر تاریخ
    datepicker: {
      now: 'اکنون',
      today: 'امروز',
      cancel: 'لغو',
      clear: 'پاک کردن',
      confirm: 'تایید',
      selectDate: 'تاریخ را انتخاب کنید',
      selectTime: 'زمان را انتخاب کنید',
      startDate: 'تاریخ شروع',
      startTime: 'زمان شروع',
      endDate: 'تاریخ پایان',
      endTime: 'زمان پایان',
      year: '',
      month: '',
      day: '',
      week: 'هفته',
      monthBeforeYear: true,
      prevYear: 'سال قبل',
      nextYear: 'سال بعد',
      prevMonth: 'ماه قبل',
      nextMonth: 'ماه بعد',
      weeks: {
        sun: 'یک',
        mon: 'دو',
        tue: 'سه',
        wed: 'چهار',
        thu: 'پنج',
        fri: 'جمعه',
        sat: 'شنبه'
      },
      months: {
        jan: 'ژان',
        feb: 'فور',
        mar: 'مارس',
        apr: 'آور',
        may: 'مه',
        jun: 'ژوئن',
        jul: 'ژوئی',
        aug: 'اوت',
        sep: 'سپت',
        oct: 'اکت',
        nov: 'نوا',
        dec: 'دسا'
      },
      quarters: {
        q1: 'ف۱',
        q2: 'ف۲',
        q3: 'ف۳',
        q4: 'ف۴'
      }
    },
    // انتخابگر زمان
    timepicker: {
      confirm: 'تایید',
      cancel: 'لغو',
      now: 'اکنون',
      placeholder: 'زمان را انتخاب کنید',
      startPlaceholder: 'زمان شروع',
      endPlaceholder: 'زمان پایان',
      selectTime: 'زمان را انتخاب کنید'
    },
    // انتخاب زمان
    timeselect: {
      placeholder: 'زمان را انتخاب کنید'
    },
    // درخت
    tree: {
      emptyText: 'داده‌ای وجود ندارد',
      loading: 'در حال بارگذاری...',
      checkAll: 'انتخاب همه',
      uncheckAll: 'لغو انتخاب همه',
      expandAll: 'باز کردن همه',
      collapseAll: 'جمع کردن همه'
    },
    // انتخابگر درختی
    treeselect: {
      placeholder: 'انتخاب کنید',
      emptyText: 'داده‌ای وجود ندارد',
      loading: 'در حال بارگذاری...',
      noMatch: 'موردی یافت نشد'
    },
    // تقویم
    calendar: {
      prevMonth: 'ماه قبل',
      nextMonth: 'ماه بعد',
      prevYear: 'سال قبل',
      nextYear: 'سال بعد',
      today: 'امروز',
      week: 'هفته',
      holiday: 'تعطیل',
      workday: 'کاری',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'یک',
        mon: 'دو',
        tue: 'سه',
        wed: 'چهار',
        thu: 'پنج',
        fri: 'جمعه',
        sat: 'شنبه'
      }
    },
    // تکمیل خودکار
    autocomplete: {
      loading: 'در حال بارگذاری...',
      placeholder: 'لطفا وارد کنید',
      noData: 'داده‌ای وجود ندارد',
      noMatch: 'موردی یافت نشد'
    },
    // شمارش معکوس
    countdown: {
      days: 'روز',
      hours: 'ساعت',
      minutes: 'دقیقه',
      seconds: 'ثانیه',
      milliseconds: 'میلی‌ثانیه',
      finished: 'تمام شد'
    },
    // انتخابگر آبشاری
    cascader: {
      noMatch: 'موردی یافت نشد',
      placeholder: 'انتخاب کنید',
      loading: 'در حال بارگذاری...',
      noData: 'داده‌ای وجود ندارد'
    },
    // انتقال
    transfer: {
      noMatch: 'موردی یافت نشد',
      noData: 'داده‌ای وجود ندارد',
      titles: ['لیست ۱', 'لیست ۲'],
      filterPlaceholder: 'کلمه کلیدی را وارد کنید',
      noCheckedFormat: '{total} مورد',
      hasCheckedFormat: '{checked}/{total} انتخاب شده',
      searchPlaceholder: 'کلمه کلیدی را وارد کنید'
    },
    // جدول
    table: {
      emptyText: 'داده‌ای وجود ندارد',
      confirmFilter: 'تایید',
      resetFilter: 'بازنشانی',
      clearFilter: 'همه',
      sumText: 'مجموع',
      loading: 'در حال بارگذاری...',
      index: 'ردیف',
      print: 'چاپ',
      cancel: 'لغو',
      preview: 'پیش‌نمایش چاپ',
      printTime: 'زمان چاپ',
      total: 'مجموع {total} مورد',
      page: 'صفحه {page}',
      yes: 'بله',
      no: 'خیر',
      // نوار ابزار
      toolbar: {
        refresh: 'تازه‌سازی',
        density: 'تراکم',
        densityDefault: 'پیش‌فرض',
        densityLarge: 'بزرگ',
        densitySmall: 'کوچک',
        columnSetting: 'تنظیمات ستون',
        fullscreen: 'تمام صفحه',
        exitFullscreen: 'خروج از تمام صفحه',
        export: 'صدور',
        import: 'واردات',
        search: 'جستجو',
        searchPlaceholder: 'کلمات کلیدی را برای جستجو وارد کنید'
      },
      // فیلتر
      filter: {
        selectAll: 'انتخاب همه',
        selectInvert: 'معکوس کردن انتخاب',
        empty: 'خالی',
        notEmpty: 'خالی نیست',
        contains: 'شامل',
        notContains: 'شامل نمی‌شود',
        equals: 'برابر',
        notEquals: 'نابرابر',
        startsWith: 'شروع با',
        endsWith: 'پایان با',
        greaterThan: 'بزرگتر از',
        lessThan: 'کوچکتر از',
        between: 'بین'
      },
      // مرتب‌سازی
      sort: {
        asc: 'صعودی',
        desc: 'نزولی',
        clear: 'پاک کردن مرتب‌سازی'
      },
      // صدور
      export: {
        title: 'صدور داده‌ها',
        filename: 'نام فایل',
        type: 'نوع فایل',
        scope: 'محدوده صدور',
        scopeAll: 'همه داده‌ها',
        scopeSelected: 'داده‌های انتخاب شده',
        scopeCurrentPage: 'صفحه فعلی',
        includeHeader: 'شامل سرصفحه',
        exporting: 'در حال صدور...',
        success: 'صدور موفق',
        error: 'خطا در صدور'
      },
      // واردات
      import: {
        title: 'واردات داده‌ها',
        selectFile: 'فایل را انتخاب کنید',
        dragTip: 'برای آپلود فایل را اینجا بکشید یا کلیک کنید',
        importing: 'در حال واردات...',
        success: 'واردات موفق',
        error: 'خطا در واردات',
        preview: 'پیش‌نمایش داده‌ها',
        confirm: 'تایید واردات'
      },
      // چاپ
      printConfig: {
        title: 'تنظیمات چاپ',
        pageTitle: 'عنوان صفحه',
        pageHeader: 'سرصفحه',
        pageFooter: 'پاصفحه',
        printAll: 'چاپ همه',
        printSelected: 'چاپ انتخاب شده‌ها',
        printCurrentPage: 'چاپ صفحه فعلی',
        landscape: 'افقی',
        portrait: 'عمودی',
        printing: 'در حال چاپ...'
      },
      // تنظیمات ستون
      columnSetting: {
        title: 'تنظیمات ستون',
        showAll: 'نمایش همه',
        hideAll: 'پنهان کردن همه',
        reset: 'بازنشانی',
        fixedLeft: 'ثابت در چپ',
        fixedRight: 'ثابت در راست',
        unfixed: 'لغو ثابت کردن'
      },
      // منوی زمینه
      contextMenu: {
        copy: 'کپی',
        copyRow: 'کپی ردیف',
        copyCell: 'کپی سلول',
        paste: 'چسباندن',
        insertRowAbove: 'درج ردیف بالا',
        insertRowBelow: 'درج ردیف پایین',
        deleteRow: 'حذف ردیف',
        deleteSelectedRows: 'حذف ردیف‌های انتخاب شده',
        exportSelected: 'صدور انتخاب شده‌ها'
      },
      // انتخاب
      selection: {
        selectAll: 'انتخاب همه',
        selectInvert: 'معکوس کردن انتخاب',
        selectNone: 'پاک کردن انتخاب',
        selected: '{count} مورد انتخاب شده'
      },
      // باز کردن
      expand: {
        expandAll: 'باز کردن همه',
        collapseAll: 'جمع کردن همه'
      },
      // درخت
      tree: {
        expandAll: 'باز کردن همه',
        collapseAll: 'جمع کردن همه',
        expandLevel: 'باز کردن تا سطح {level}'
      },
      // کشیدن
      drag: {
        dragTip: 'برای تغییر ترتیب بکشید',
        dropTip: 'برای قرار دادن رها کنید'
      }
    },
    // کادر پیام
    messagebox: {
      title: 'پیام',
      confirm: 'تایید',
      cancel: 'لغو',
      close: 'بستن',
      error: 'ورودی نامعتبر',
      alert: 'هشدار',
      prompt: 'راهنمایی',
      inputPlaceholder: 'لطفا وارد کنید'
    },
    // آپلود
    upload: {
      deleteTip: 'برای حذف delete را فشار دهید',
      delete: 'حذف',
      preview: 'پیش‌نمایش',
      continue: 'ادامه',
      upload: 'برای آپلود کلیک کنید',
      tip: 'فایل را به این ناحیه بکشید یا برای <em>آپلود</em> کلیک کنید',
      dragTip: 'فایل را اینجا بکشید یا برای آپلود کلیک کنید',
      uploading: 'در حال آپلود...',
      success: 'آپلود موفق',
      error: 'خطا در آپلود',
      retry: 'تلاش مجدد',
      cancel: 'لغو آپلود',
      fileTypeError: 'نوع فایل پشتیبانی نمی‌شود',
      fileSizeError: 'اندازه فایل از حد مجاز بیشتر است',
      fileCountError: 'تعداد فایل‌ها از حد مجاز بیشتر است'
    },
    // فرم
    form: {
      validationFailed: 'اعتبارسنجی ناموفق',
      required: 'الزامی',
      pleaseInput: 'لطفا وارد کنید',
      pleaseSelect: 'لطفا انتخاب کنید'
    },
    // دکمه
    button: {
      loading: 'در حال بارگذاری...'
    },
    // ورودی
    input: {
      placeholder: 'لطفا وارد کنید',
      clear: 'پاک کردن',
      showPassword: 'نمایش رمز عبور',
      hidePassword: 'پنهان کردن رمز عبور',
      copy: 'کپی',
      copied: 'کپی شد'
    },
    // ورودی عددی
    inputnumber: {
      placeholder: 'لطفا عدد وارد کنید',
      increase: 'افزایش',
      decrease: 'کاهش'
    },
    // ورودی برچسب
    inputtag: {
      placeholder: 'لطفا وارد کنید',
      add: 'افزودن',
      remove: 'حذف'
    },
    // مسیر راهنما
    breadcrumb: {
      label: 'مسیر راهنما',
      more: 'بیشتر'
    },
    // بازگشت به بالا
    backtop: {
      text: 'بازگشت به بالا'
    },
    // انتخاب
    select: {
      placeholder: 'لطفا انتخاب کنید',
      noData: 'داده‌ای وجود ندارد',
      loading: 'در حال بارگذاری...',
      noMatch: 'موردی یافت نشد',
      selectAll: 'انتخاب همه',
      clearAll: 'پاک کردن همه'
    },
    // صفحه‌بندی
    pagination: {
      goto: 'برو به',
      page: '',
      total: 'مجموع {total}',
      pageSize: '/صفحه',
      prev: 'قبلی',
      next: 'بعدی',
      first: 'اول',
      last: 'آخر',
      pageClassifier: ''
    },
    // تایید بازشو
    popconfirm: {
      confirm: 'تایید',
      cancel: 'لغو',
      dontAskAgain: 'دیگر نپرس'
    },
    // دیالوگ
    dialog: {
      confirm: 'تایید',
      cancel: 'لغو',
      close: 'بستن',
      maximize: 'بزرگ کردن',
      restore: 'بازگرداندن'
    },
    // کشو
    drawer: {
      close: 'بستن',
      confirm: 'تایید',
      cancel: 'لغو'
    },
    // منوی کشویی
    dropdown: {
      loading: 'در حال بارگذاری...'
    },
    // تصویر
    image: {
      error: 'خطا',
      loading: 'در حال بارگذاری...',
      preview: 'پیش‌نمایش',
      zoomIn: 'بزرگنمایی',
      zoomOut: 'کوچک‌نمایی',
      rotateLeft: 'چرخش به چپ',
      rotateRight: 'چرخش به راست',
      originalSize: 'اندازه اصلی',
      fullscreen: 'تمام صفحه'
    },
    // نمایشگر تصویر
    imageviewer: {
      close: 'بستن',
      prev: 'قبلی',
      next: 'بعدی',
      zoomIn: 'بزرگنمایی',
      zoomOut: 'کوچک‌نمایی',
      rotateLeft: 'چرخش به چپ',
      rotateRight: 'چرخش به راست',
      reset: 'بازنشانی',
      fullscreen: 'تمام صفحه',
      exitFullscreen: 'خروج از تمام صفحه'
    },
    // پیمایش بی‌نهایت
    infinitescroll: {
      loading: 'در حال بارگذاری...',
      finished: 'داده بیشتری وجود ندارد',
      error: 'خطا در بارگذاری، برای تلاش مجدد کلیک کنید',
      retry: 'برای تلاش مجدد کلیک کنید'
    },
    // پیام
    message: {
      close: 'بستن'
    },
    // اعلان
    notification: {
      close: 'بستن'
    },
    // بارگذاری
    loading: {
      text: 'در حال بارگذاری...'
    },
    // چرخنده
    spin: {
      text: 'در حال بارگذاری...'
    },
    // امتیازدهی
    rate: {
      texts: ['خیلی بد', 'ناامید', 'خوب', 'راضی', 'شگفت‌زده']
    },
    // هشدار
    alert: {
      close: 'بستن'
    },
    // برچسب
    tag: {
      close: 'بستن'
    },
    // تب‌ها
    tabs: {
      close: 'بستن',
      add: 'افزودن',
      more: 'بیشتر'
    },
    // مراحل
    steps: {
      finish: 'تمام شد',
      process: 'در حال انجام',
      wait: 'در انتظار',
      error: 'خطا'
    },
    // پیشرفت
    progress: {
      success: 'موفق',
      exception: 'استثنا',
      warning: 'هشدار'
    },
    // اسکلت
    skeleton: {
      loading: 'در حال بارگذاری...'
    },
    // خالی
    empty: {
      description: 'داده‌ای وجود ندارد',
      noData: 'داده‌ای وجود ندارد',
      noResult: 'نتیجه‌ای وجود ندارد',
      networkError: 'خطای شبکه',
      serverError: 'خطای سرور'
    },
    // نتیجه
    result: {
      success: 'موفق',
      error: 'خطا',
      warning: 'هشدار',
      info: 'اطلاعات',
      backHome: 'بازگشت به خانه'
    },
    // آبشار
    waterfall: {
      loading: 'در حال بارگذاری...',
      noMore: 'داده بیشتری وجود ندارد',
      empty: 'داده‌ای وجود ندارد'
    },
    // توضیحات
    descriptions: {
      colon: ':'
    },
    // لغزنده
    slider: {
      tipFormatter: '{value}'
    },
    // سوئیچ
    switch: {
      on: 'روشن',
      off: 'خاموش'
    },
    // چک‌باکس
    checkbox: {
      selectAll: 'انتخاب همه'
    },
    // رادیو
    radio: {},
    // منو
    menu: {
      collapse: 'جمع کردن منو',
      expand: 'باز کردن منو'
    },
    // کارت
    card: {
      collapse: 'جمع کردن',
      expand: 'باز کردن'
    },
    // جمع‌شونده
    collapse: {
      expand: 'باز کردن',
      collapse: 'جمع کردن'
    },
    // راهنما
    tooltip: {},
    // پاپ‌اور
    popover: {},
    // نشان
    badge: {},
    // آواتار
    avatar: {
      error: 'خطا در بارگذاری'
    },
    // واترمارک
    watermark: {},
    // جداکننده
    divider: {},
    // کاروسل
    carousel: {
      prev: 'قبلی',
      next: 'بعدی'
    },
    // متن متحرک
    marquee: {},
    // چسبنده
    affix: {},
    // لنگر
    anchor: {}
  }
}

export default fa
