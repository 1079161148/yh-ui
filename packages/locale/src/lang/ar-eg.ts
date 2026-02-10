import type { Language } from '../index'

export const arEg: Language = {
  name: 'ar-eg',
  yh: {
    // عام
    common: {
      yes: 'نعم',
      no: 'لا',
      confirm: 'تأكيد',
      cancel: 'إلغاء',
      loading: 'جاري التحميل',
      close: 'إغلاق',
      clear: 'مسح',
      reset: 'إعادة تعيين',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      add: 'إضافة',
      search: 'بحث',
      refresh: 'تحديث',
      expand: 'توسيع',
      collapse: 'طي',
      more: 'المزيد',
      noData: 'لا توجد بيانات',
      noMatch: 'لا توجد بيانات مطابقة',
      selectAll: 'تحديد الكل',
      unselectAll: 'إلغاء تحديد الكل'
    },
    // منتقي الألوان
    colorpicker: {
      confirm: 'موافق',
      clear: 'مسح',
      eyeDropper: 'ماصة الألوان',
      suggestionDark: 'النص الأبيض أفضل',
      suggestionLight: 'النص الأسود أفضل',
      recentColors: 'الألوان الأخيرة',
      presetColors: 'الألوان المحددة مسبقاً'
    },
    // منتقي التاريخ
    datepicker: {
      now: 'الآن',
      today: 'اليوم',
      cancel: 'إلغاء',
      clear: 'مسح',
      confirm: 'موافق',
      selectDate: 'اختر التاريخ',
      selectTime: 'اختر الوقت',
      startDate: 'تاريخ البداية',
      startTime: 'وقت البداية',
      endDate: 'تاريخ النهاية',
      endTime: 'وقت النهاية',
      year: '',
      month: '',
      day: '',
      week: 'أسبوع',
      monthBeforeYear: true,
      prevYear: 'السنة السابقة',
      nextYear: 'السنة التالية',
      prevMonth: 'الشهر السابق',
      nextMonth: 'الشهر التالي',
      weeks: {
        sun: 'أحد',
        mon: 'إثنين',
        tue: 'ثلاثاء',
        wed: 'أربعاء',
        thu: 'خميس',
        fri: 'جمعة',
        sat: 'سبت'
      },
      months: {
        jan: 'يناير',
        feb: 'فبراير',
        mar: 'مارس',
        apr: 'أبريل',
        may: 'مايو',
        jun: 'يونيو',
        jul: 'يوليو',
        aug: 'أغسطس',
        sep: 'سبتمبر',
        oct: 'أكتوبر',
        nov: 'نوفمبر',
        dec: 'ديسمبر'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // منتقي الوقت
    timepicker: {
      confirm: 'موافق',
      cancel: 'إلغاء',
      now: 'الآن',
      placeholder: 'اختر الوقت',
      startPlaceholder: 'وقت البداية',
      endPlaceholder: 'وقت النهاية',
      selectTime: 'اختر الوقت'
    },
    // اختيار الوقت
    timeselect: {
      placeholder: 'اختر الوقت'
    },
    // الشجرة
    tree: {
      emptyText: 'لا توجد بيانات',
      loading: 'جاري التحميل...',
      checkAll: 'تحديد الكل',
      uncheckAll: 'إلغاء تحديد الكل',
      expandAll: 'توسيع الكل',
      collapseAll: 'طي الكل'
    },
    // اختيار الشجرة
    treeselect: {
      placeholder: 'اختر',
      emptyText: 'لا توجد بيانات',
      loading: 'جاري التحميل...',
      noMatch: 'لا توجد بيانات مطابقة'
    },
    // التقويم
    calendar: {
      prevMonth: 'الشهر السابق',
      nextMonth: 'الشهر التالي',
      prevYear: 'السنة السابقة',
      nextYear: 'السنة التالية',
      today: 'اليوم',
      week: 'أسبوع',
      holiday: 'عطلة',
      workday: 'عمل',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'أحد',
        mon: 'إثنين',
        tue: 'ثلاثاء',
        wed: 'أربعاء',
        thu: 'خميس',
        fri: 'جمعة',
        sat: 'سبت'
      }
    },
    // الإكمال التلقائي
    autocomplete: {
      loading: 'جاري التحميل...',
      placeholder: 'الرجاء الإدخال',
      noData: 'لا توجد بيانات',
      noMatch: 'لا توجد بيانات مطابقة'
    },
    // العد التنازلي
    countdown: {
      days: 'أيام',
      hours: 'ساعات',
      minutes: 'دقائق',
      seconds: 'ثواني',
      milliseconds: 'ميلي ثانية',
      finished: 'انتهى'
    },
    // الاختيار المتتالي
    cascader: {
      noMatch: 'لا توجد بيانات مطابقة',
      placeholder: 'اختر',
      loading: 'جاري التحميل...',
      noData: 'لا توجد بيانات'
    },
    // النقل
    transfer: {
      noMatch: 'لا توجد بيانات مطابقة',
      noData: 'لا توجد بيانات',
      titles: ['القائمة 1', 'القائمة 2'],
      filterPlaceholder: 'أدخل الكلمة المفتاحية',
      noCheckedFormat: '{total} عنصر',
      hasCheckedFormat: '{checked}/{total} محدد',
      searchPlaceholder: 'أدخل الكلمة المفتاحية'
    },
    // الجدول
    table: {
      emptyText: 'لا توجد بيانات',
      confirmFilter: 'تأكيد',
      resetFilter: 'إعادة تعيين',
      clearFilter: 'الكل',
      sumText: 'المجموع',
      loading: 'جاري التحميل...',
      index: 'الفهرس',
      print: 'طباعة',
      cancel: 'إلغاء',
      preview: 'معاينة الطباعة',
      printTime: 'وقت الطباعة',
      total: 'إجمالي {total} عنصر',
      page: 'الصفحة {page}',
      yes: 'نعم',
      no: 'لا',
      // شريط الأدوات
      toolbar: {
        refresh: 'تحديث',
        density: 'الكثافة',
        densityDefault: 'افتراضي',
        densityLarge: 'كبير',
        densitySmall: 'صغير',
        columnSetting: 'إعدادات الأعمدة',
        fullscreen: 'ملء الشاشة',
        exitFullscreen: 'الخروج من ملء الشاشة',
        export: 'تصدير',
        import: 'استيراد',
        search: 'بحث',
        searchPlaceholder: 'أدخل الكلمات المفتاحية للبحث'
      },
      // المرشح
      filter: {
        selectAll: 'تحديد الكل',
        selectInvert: 'عكس التحديد',
        empty: 'فارغ',
        notEmpty: 'غير فارغ',
        contains: 'يحتوي على',
        notContains: 'لا يحتوي على',
        equals: 'يساوي',
        notEquals: 'لا يساوي',
        startsWith: 'يبدأ بـ',
        endsWith: 'ينتهي بـ',
        greaterThan: 'أكبر من',
        lessThan: 'أصغر من',
        between: 'بين'
      },
      // الترتيب
      sort: {
        asc: 'تصاعدي',
        desc: 'تنازلي',
        clear: 'مسح الترتيب'
      },
      // التصدير
      export: {
        title: 'تصدير البيانات',
        filename: 'اسم الملف',
        type: 'نوع الملف',
        scope: 'نطاق التصدير',
        scopeAll: 'جميع البيانات',
        scopeSelected: 'البيانات المحددة',
        scopeCurrentPage: 'الصفحة الحالية',
        includeHeader: 'تضمين الرأس',
        exporting: 'جاري التصدير...',
        success: 'نجح التصدير',
        error: 'فشل التصدير'
      },
      // الاستيراد
      import: {
        title: 'استيراد البيانات',
        selectFile: 'اختر الملف',
        dragTip: 'انقر أو اسحب الملف هنا للرفع',
        importing: 'جاري الاستيراد...',
        success: 'نجح الاستيراد',
        error: 'فشل الاستيراد',
        preview: 'معاينة البيانات',
        confirm: 'تأكيد الاستيراد'
      },
      // الطباعة
      printConfig: {
        title: 'إعدادات الطباعة',
        pageTitle: 'عنوان الصفحة',
        pageHeader: 'الرأس',
        pageFooter: 'التذييل',
        printAll: 'طباعة الكل',
        printSelected: 'طباعة المحدد',
        printCurrentPage: 'طباعة الصفحة الحالية',
        landscape: 'أفقي',
        portrait: 'عمودي',
        printing: 'جاري الطباعة...'
      },
      // إعدادات الأعمدة
      columnSetting: {
        title: 'إعدادات الأعمدة',
        showAll: 'إظهار الكل',
        hideAll: 'إخفاء الكل',
        reset: 'إعادة تعيين',
        fixedLeft: 'تثبيت على اليسار',
        fixedRight: 'تثبيت على اليمين',
        unfixed: 'إلغاء التثبيت'
      },
      // القائمة السياقية
      contextMenu: {
        copy: 'نسخ',
        copyRow: 'نسخ الصف',
        copyCell: 'نسخ الخلية',
        paste: 'لصق',
        insertRowAbove: 'إدراج صف أعلاه',
        insertRowBelow: 'إدراج صف أدناه',
        deleteRow: 'حذف الصف',
        deleteSelectedRows: 'حذف الصفوف المحددة',
        exportSelected: 'تصدير المحدد'
      },
      // التحديد
      selection: {
        selectAll: 'تحديد الكل',
        selectInvert: 'عكس التحديد',
        selectNone: 'مسح التحديد',
        selected: 'تم تحديد {count} عنصر'
      },
      // التوسيع
      expand: {
        expandAll: 'توسيع الكل',
        collapseAll: 'طي الكل'
      },
      // الشجرة
      tree: {
        expandAll: 'توسيع الكل',
        collapseAll: 'طي الكل',
        expandLevel: 'توسيع إلى المستوى {level}'
      },
      // السحب
      drag: {
        dragTip: 'اسحب لإعادة الترتيب',
        dropTip: 'اترك لوضع'
      }
    },
    // صندوق الرسائل
    messagebox: {
      title: 'رسالة',
      confirm: 'موافق',
      cancel: 'إلغاء',
      close: 'إغلاق',
      error: 'إدخال غير صحيح',
      alert: 'تنبيه',
      prompt: 'مطالبة',
      inputPlaceholder: 'الرجاء الإدخال'
    },
    // الرفع
    upload: {
      deleteTip: 'اضغط delete للحذف',
      delete: 'حذف',
      preview: 'معاينة',
      continue: 'متابعة',
      upload: 'انقر للرفع',
      tip: 'انقر أو اسحب الملف إلى هذه المنطقة لل<em>رفع</em>',
      dragTip: 'اسقط الملف هنا أو انقر للرفع',
      uploading: 'جاري الرفع...',
      success: 'نجح الرفع',
      error: 'فشل الرفع',
      retry: 'إعادة المحاولة',
      cancel: 'إلغاء الرفع',
      fileTypeError: 'نوع الملف غير مدعوم',
      fileSizeError: 'حجم الملف يتجاوز الحد',
      fileCountError: 'عدد الملفات يتجاوز الحد'
    },
    // النموذج
    form: {
      validationFailed: 'فشل التحقق',
      required: 'مطلوب',
      pleaseInput: 'الرجاء الإدخال',
      pleaseSelect: 'الرجاء الاختيار'
    },
    // الزر
    button: {
      loading: 'جاري التحميل...'
    },
    // الإدخال
    input: {
      placeholder: 'الرجاء الإدخال',
      clear: 'مسح',
      showPassword: 'إظهار كلمة المرور',
      hidePassword: 'إخفاء كلمة المرور',
      copy: 'نسخ',
      copied: 'تم النسخ'
    },
    // إدخال الرقم
    inputnumber: {
      placeholder: 'الرجاء إدخال رقم',
      increase: 'زيادة',
      decrease: 'تقليل'
    },
    // إدخال العلامة
    inputtag: {
      placeholder: 'الرجاء الإدخال',
      add: 'إضافة',
      remove: 'إزالة'
    },
    // مسار التنقل
    breadcrumb: {
      label: 'مسار التنقل',
      more: 'المزيد'
    },
    // العودة للأعلى
    backtop: {
      text: 'العودة للأعلى'
    },
    // الاختيار
    select: {
      placeholder: 'الرجاء الاختيار',
      noData: 'لا توجد بيانات',
      loading: 'جاري التحميل...',
      noMatch: 'لا توجد بيانات مطابقة',
      selectAll: 'تحديد الكل',
      clearAll: 'مسح الكل'
    },
    // الترقيم
    pagination: {
      goto: 'انتقل إلى',
      page: '',
      total: 'إجمالي {total}',
      pageSize: '/صفحة',
      prev: 'السابق',
      next: 'التالي',
      first: 'الأول',
      last: 'الأخير',
      pageClassifier: ''
    },
    // تأكيد منبثق
    popconfirm: {
      confirm: 'موافق',
      cancel: 'إلغاء',
      dontAskAgain: 'لا تسأل مرة أخرى'
    },
    // الحوار
    dialog: {
      confirm: 'موافق',
      cancel: 'إلغاء',
      close: 'إغلاق',
      maximize: 'تكبير',
      restore: 'استعادة'
    },
    // الدرج
    drawer: {
      close: 'إغلاق',
      confirm: 'موافق',
      cancel: 'إلغاء'
    },
    // القائمة المنسدلة
    dropdown: {
      loading: 'جاري التحميل...'
    },
    // الصورة
    image: {
      error: 'فشل',
      loading: 'جاري التحميل...',
      preview: 'معاينة',
      zoomIn: 'تكبير',
      zoomOut: 'تصغير',
      rotateLeft: 'تدوير لليسار',
      rotateRight: 'تدوير لليمين',
      originalSize: 'الحجم الأصلي',
      fullscreen: 'ملء الشاشة'
    },
    // عارض الصور
    imageviewer: {
      close: 'إغلاق',
      prev: 'السابق',
      next: 'التالي',
      zoomIn: 'تكبير',
      zoomOut: 'تصغير',
      rotateLeft: 'تدوير لليسار',
      rotateRight: 'تدوير لليمين',
      reset: 'إعادة تعيين',
      fullscreen: 'ملء الشاشة',
      exitFullscreen: 'الخروج من ملء الشاشة'
    },
    // التمرير اللانهائي
    infinitescroll: {
      loading: 'جاري التحميل...',
      finished: 'لا مزيد من البيانات',
      error: 'فشل التحميل، انقر لإعادة المحاولة',
      retry: 'انقر لإعادة المحاولة'
    },
    // الرسالة
    message: {
      close: 'إغلاق'
    },
    // الإشعار
    notification: {
      close: 'إغلاق'
    },
    // التحميل
    loading: {
      text: 'جاري التحميل...'
    },
    // الدوران
    spin: {
      text: 'جاري التحميل...'
    },
    // التقييم
    rate: {
      texts: ['سيء جداً', 'مخيب للآمال', 'عادل', 'راضٍ', 'مفاجئ']
    },
    // التنبيه
    alert: {
      close: 'إغلاق'
    },
    // العلامة
    tag: {
      close: 'إغلاق'
    },
    // علامات التبويب
    tabs: {
      close: 'إغلاق',
      add: 'إضافة',
      more: 'المزيد'
    },
    // الخطوات
    steps: {
      finish: 'انتهى',
      process: 'قيد التنفيذ',
      wait: 'في الانتظار',
      error: 'خطأ'
    },
    // التقدم
    progress: {
      success: 'نجاح',
      exception: 'استثناء',
      warning: 'تحذير'
    },
    // الهيكل العظمي
    skeleton: {
      loading: 'جاري التحميل...'
    },
    // فارغ
    empty: {
      description: 'لا توجد بيانات',
      noData: 'لا توجد بيانات',
      noResult: 'لا توجد نتائج',
      networkError: 'خطأ في الشبكة',
      serverError: 'خطأ في الخادم'
    },
    // النتيجة
    result: {
      success: 'نجاح',
      error: 'خطأ',
      warning: 'تحذير',
      info: 'معلومات',
      backHome: 'العودة للصفحة الرئيسية'
    },
    // الشلال
    waterfall: {
      loading: 'جاري التحميل...',
      noMore: 'لا مزيد من البيانات',
      empty: 'لا توجد بيانات'
    },
    // الأوصاف
    descriptions: {
      colon: ':'
    },
    // المنزلق
    slider: {
      tipFormatter: '{value}'
    },
    // المفتاح
    switch: {
      on: 'تشغيل',
      off: 'إيقاف'
    },
    // مربع الاختيار
    checkbox: {
      selectAll: 'تحديد الكل'
    },
    // الراديو
    radio: {},
    // القائمة
    menu: {
      collapse: 'طي القائمة',
      expand: 'توسيع القائمة'
    },
    // البطاقة
    card: {
      collapse: 'طي',
      expand: 'توسيع'
    },
    // الطي
    collapse: {
      expand: 'توسيع',
      collapse: 'طي'
    },
    // تلميح
    tooltip: {},
    // النافذة المنبثقة
    popover: {},
    // الشارة
    badge: {},
    // الصورة الرمزية
    avatar: {
      error: 'فشل التحميل'
    },
    // العلامة المائية
    watermark: {},
    // الفاصل
    divider: {},
    // الدوارة
    carousel: {
      prev: 'السابق',
      next: 'التالي'
    },
    // الشريط المتحرك
    marquee: {},
    // التثبيت
    affix: {},
    // المرساة
    anchor: {}
  }
}

export default arEg
