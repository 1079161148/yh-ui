import type { Language } from '../index'

export const uzUz: Language = {
  name: 'uz-uz',
  yh: {
    // Umumiy
    common: {
      yes: 'Ha',
      no: "Yo'q",
      confirm: 'Tasdiqlash',
      cancel: 'Bekor qilish',
      loading: 'Yuklanmoqda',
      close: 'Yopish',
      clear: 'Tozalash',
      reset: 'Qayta o\'rnatish',
      save: 'Saqlash',
      delete: "O'chirish",
      edit: 'Tahrirlash',
      add: "Qo'shish",
      search: 'Qidirish',
      refresh: 'Yangilash',
      expand: 'Kengaytirish',
      collapse: 'Yig\'ish',
      more: "Ko'proq",
      noData: "Ma'lumot yo'q",
      noMatch: "Mos ma'lumot yo'q",
      selectAll: 'Barchasini tanlash',
      unselectAll: 'Barcha tanlovni bekor qilish'
    },
    // Rang tanlovchi
    colorpicker: {
      confirm: 'OK',
      clear: 'Tozalash',
      eyeDropper: 'Ko\'z tomchisi',
      suggestionDark: 'Oq matn yaxshiroq',
      suggestionLight: 'Qora matn yaxshiroq',
      recentColors: 'So\'nggi ranglar',
      presetColors: 'Oldindan belgilangan ranglar'
    },
    // Sana tanlovchi
    datepicker: {
      now: 'Hozir',
      today: 'Bugun',
      cancel: 'Bekor qilish',
      clear: 'Tozalash',
      confirm: 'OK',
      selectDate: 'Sanani tanlang',
      selectTime: 'Vaqtni tanlang',
      startDate: 'Boshlanish sanasi',
      startTime: 'Boshlanish vaqti',
      endDate: 'Tugash sanasi',
      endTime: 'Tugash vaqti',
      year: '',
      month: '',
      day: '',
      week: 'Hafta',
      monthBeforeYear: true,
      prevYear: 'O\'tgan yil',
      nextYear: 'Keyingi yil',
      prevMonth: 'O\'tgan oy',
      nextMonth: 'Keyingi oy',
      weeks: {
        sun: 'Yak',
        mon: 'Dush',
        tue: 'Sesh',
        wed: 'Chor',
        thu: 'Pay',
        fri: 'Jum',
        sat: 'Shan'
      },
      months: {
        jan: 'Yan',
        feb: 'Fev',
        mar: 'Mar',
        apr: 'Apr',
        may: 'May',
        jun: 'Iyun',
        jul: 'Iyul',
        aug: 'Avg',
        sep: 'Sen',
        oct: 'Okt',
        nov: 'Noy',
        dec: 'Dek'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Vaqt tanlovchi
    timepicker: {
      confirm: 'OK',
      cancel: 'Bekor qilish',
      now: 'Hozir',
      placeholder: 'Vaqtni tanlang',
      startPlaceholder: 'Boshlanish vaqti',
      endPlaceholder: 'Tugash vaqti',
      selectTime: 'Vaqtni tanlang'
    },
    // Vaqt tanlash
    timeselect: {
      placeholder: 'Vaqtni tanlang'
    },
    // Daraxt
    tree: {
      emptyText: "Ma'lumot yo'q",
      loading: 'Yuklanmoqda...',
      checkAll: 'Barchasini tekshirish',
      uncheckAll: 'Barcha tekshiruvni bekor qilish',
      expandAll: 'Barchasini kengaytirish',
      collapseAll: 'Barchasini yig\'ish'
    },
    // Daraxt tanlash
    treeselect: {
      placeholder: 'Tanlang',
      emptyText: "Ma'lumot yo'q",
      loading: 'Yuklanmoqda...',
      noMatch: "Mos ma'lumot yo'q"
    },
    // Taqvim
    calendar: {
      prevMonth: 'O\'tgan oy',
      nextMonth: 'Keyingi oy',
      prevYear: 'O\'tgan yil',
      nextYear: 'Keyingi yil',
      today: 'Bugun',
      week: 'Hafta',
      holiday: 'Bayram',
      workday: 'Ish',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Yak',
        mon: 'Dush',
        tue: 'Sesh',
        wed: 'Chor',
        thu: 'Pay',
        fri: 'Jum',
        sat: 'Shan'
      }
    },
    // Avtomatik to\'ldirish
    autocomplete: {
      loading: 'Yuklanmoqda...',
      placeholder: 'Iltimos, kiriting',
      noData: "Ma'lumot yo'q",
      noMatch: "Mos ma'lumot yo'q"
    },
    // Teskari hisoblash
    countdown: {
      days: 'kun',
      hours: 'soat',
      minutes: 'daqiqa',
      seconds: 'soniya',
      milliseconds: 'millisekund',
      finished: 'Tugadi'
    },
    // Kaskad tanlovchi
    cascader: {
      noMatch: "Mos ma'lumot yo'q",
      placeholder: 'Tanlang',
      loading: 'Yuklanmoqda...',
      noData: "Ma'lumot yo'q"
    },
    // O\'tkazish
    transfer: {
      noMatch: "Mos ma'lumot yo'q",
      noData: "Ma'lumot yo'q",
      titles: ['Ro\'yxat 1', 'Ro\'yxat 2'],
      filterPlaceholder: 'Kalit so\'zni kiriting',
      noCheckedFormat: '{total} element',
      hasCheckedFormat: '{checked}/{total} tanlangan',
      searchPlaceholder: 'Kalit so\'zni kiriting'
    },
    // Jadval
    table: {
      emptyText: "Ma'lumot yo'q",
      confirmFilter: 'Tasdiqlash',
      resetFilter: 'Qayta o\'rnatish',
      clearFilter: 'Barchasi',
      sumText: 'Yig\'indi',
      loading: 'Yuklanmoqda...',
      index: 'Indeks',
      print: 'Chop etish',
      cancel: 'Bekor qilish',
      preview: 'Chop etish ko\'rinishi',
      printTime: 'Chop etish vaqti',
      total: 'Jami {total} element',
      page: 'Sahifa {page}',
      yes: 'Ha',
      no: "Yo'q",
      // Asboblar paneli
      toolbar: {
        refresh: 'Yangilash',
        density: 'Zichlik',
        densityDefault: 'Standart',
        densityLarge: 'Katta',
        densitySmall: 'Kichik',
        columnSetting: 'Ustun sozlamalari',
        fullscreen: 'To\'liq ekran',
        exitFullscreen: 'To\'liq ekrandan chiqish',
        export: 'Eksport qilish',
        import: 'Import qilish',
        search: 'Qidirish',
        searchPlaceholder: 'Qidirish uchun kalit so\'zlarni kiriting'
      },
      // Filtr
      filter: {
        selectAll: 'Barchasini tanlash',
        selectInvert: 'Tanlovni teskari aylantirish',
        empty: 'Bo\'sh',
        notEmpty: 'Bo\'sh emas',
        contains: 'O\'z ichiga oladi',
        notContains: 'O\'z ichiga olmaydi',
        equals: 'Teng',
        notEquals: 'Teng emas',
        startsWith: 'Bilan boshlanadi',
        endsWith: 'Bilan tugaydi',
        greaterThan: 'Dan katta',
        lessThan: 'Dan kichik',
        between: 'Oralig\'ida'
      },
      // Tartiblash
      sort: {
        asc: 'O\'sish',
        desc: 'Kamayish',
        clear: 'Tartibni tozalash'
      },
      // Eksport
      export: {
        title: 'Ma\'lumotlarni eksport qilish',
        filename: 'Fayl nomi',
        type: 'Fayl turi',
        scope: 'Eksport doirasi',
        scopeAll: 'Barcha ma\'lumotlar',
        scopeSelected: 'Tanlangan ma\'lumotlar',
        scopeCurrentPage: 'Joriy sahifa',
        includeHeader: 'Sarlavhani qo\'shish',
        exporting: 'Eksport qilinmoqda...',
        success: 'Eksport muvaffaqiyatli',
        error: 'Eksport muvaffaqiyatsiz'
      },
      // Import
      import: {
        title: 'Ma\'lumotlarni import qilish',
        selectFile: 'Faylni tanlang',
        dragTip: 'Yuklash uchun faylni bu yerga bosing yoki sudrab keling',
        importing: 'Import qilinmoqda...',
        success: 'Import muvaffaqiyatli',
        error: 'Import muvaffaqiyatsiz',
        preview: 'Ma\'lumotlar ko\'rinishi',
        confirm: 'Importni tasdiqlash'
      },
      // Chop etish
      printConfig: {
        title: 'Chop etish sozlamalari',
        pageTitle: 'Sahifa sarlavhasi',
        pageHeader: 'Sarlavha',
        pageFooter: 'Alt yozuv',
        printAll: 'Barchasini chop etish',
        printSelected: 'Tanlanganlarni chop etish',
        printCurrentPage: 'Joriy sahifani chop etish',
        landscape: 'Landshaft',
        portrait: 'Portret',
        printing: 'Chop etilmoqda...'
      },
      // Ustun sozlamalari
      columnSetting: {
        title: 'Ustun sozlamalari',
        showAll: 'Barchasini ko\'rsatish',
        hideAll: 'Barchasini yashirish',
        reset: 'Qayta o\'rnatish',
        fixedLeft: 'Chapga mahkamlang',
        fixedRight: 'O\'ngga mahkamlang',
        unfixed: 'Mahkamlamani olib tashlash'
      },
      // Kontekst menyusi
      contextMenu: {
        copy: 'Nusxalash',
        copyRow: 'Qatorni nusxalash',
        copyCell: 'Katakchani nusxalash',
        paste: 'Yopishtirish',
        insertRowAbove: 'Yuqoriga qator qo\'shish',
        insertRowBelow: 'Pastga qator qo\'shish',
        deleteRow: 'Qatorni o\'chirish',
        deleteSelectedRows: 'Tanlangan qatorlarni o\'chirish',
        exportSelected: 'Tanlanganlarni eksport qilish'
      },
      // Tanlash
      selection: {
        selectAll: 'Barchasini tanlash',
        selectInvert: 'Tanlovni teskari aylantirish',
        selectNone: 'Tanlovni tozalash',
        selected: '{count} element tanlangan'
      },
      // Kengaytirish
      expand: {
        expandAll: 'Barchasini kengaytirish',
        collapseAll: 'Barchasini yig\'ish'
      },
      // Daraxt
      tree: {
        expandAll: 'Barchasini kengaytirish',
        collapseAll: 'Barchasini yig\'ish',
        expandLevel: 'Daraja {level} gacha kengaytirish'
      },
      // Sudrab o\'tkazish
      drag: {
        dragTip: 'Qayta tartiblash uchun sudrab o\'tkazing',
        dropTip: 'Joylashtirish uchun qo\'ying'
      }
    },
    // Xabar qutisi
    messagebox: {
      title: 'Xabar',
      confirm: 'OK',
      cancel: 'Bekor qilish',
      close: 'Yopish',
      error: 'Noto\'g\'ri kirish',
      alert: 'Ogohlantirish',
      prompt: 'So\'rov',
      inputPlaceholder: 'Iltimos, kiriting'
    },
    // Yuklash
    upload: {
      deleteTip: 'o\'chirish uchun delete ni bosing',
      delete: "O'chirish",
      preview: 'Ko\'rinish',
      continue: 'Davom etish',
      upload: 'Yuklash uchun bosing',
      tip: '<em>Yuklash</em> uchun faylni bu maydonga bosing yoki sudrab keling',
      dragTip: 'Faylni bu yerga qo\'ying yoki yuklash uchun bosing',
      uploading: 'Yuklanmoqda...',
      success: 'Yuklash muvaffaqiyatli',
      error: 'Yuklash muvaffaqiyatsiz',
      retry: 'Qayta urinib ko\'ring',
      cancel: 'Yuklashni bekor qilish',
      fileTypeError: 'Fayl turi qo\'llab-quvvatlanmaydi',
      fileSizeError: 'Fayl hajmi chegaradan oshib ketdi',
      fileCountError: 'Fayl soni chegaradan oshib ketdi'
    },
    // Forma
    form: {
      validationFailed: 'Tekshirish muvaffaqiyatsiz',
      required: 'Majburiy',
      pleaseInput: 'Iltimos, kiriting',
      pleaseSelect: 'Iltimos, tanlang'
    },
    // Tugma
    button: {
      loading: 'Yuklanmoqda...'
    },
    // Kirish
    input: {
      placeholder: 'Iltimos, kiriting',
      clear: 'Tozalash',
      showPassword: 'Parolni ko\'rsatish',
      hidePassword: 'Parolni yashirish',
      copy: 'Nusxalash',
      copied: 'Nusxalandi'
    },
    // Raqam kirish
    inputnumber: {
      placeholder: 'Iltimos, raqam kiriting',
      increase: 'Oshirish',
      decrease: 'Kamaytirish'
    },
    // Teg kirish
    inputtag: {
      placeholder: 'Iltimos, kiriting',
      add: "Qo'shish",
      remove: 'Olib tashlash'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Navigatsiya',
      more: "Ko'proq"
    },
    // Yuqoriga qaytish
    backtop: {
      text: 'Yuqoriga qaytish'
    },
    // Tanlash
    select: {
      placeholder: 'Iltimos, tanlang',
      noData: "Ma'lumot yo'q",
      loading: 'Yuklanmoqda...',
      noMatch: "Mos ma'lumot yo'q",
      selectAll: 'Barchasini tanlash',
      clearAll: 'Barchasini tozalash'
    },
    // Sahifalash
    pagination: {
      goto: 'O\'tish',
      page: '',
      total: 'Jami {total}',
      pageSize: '/sahifa',
      prev: 'Oldingi',
      next: 'Keyingi',
      first: 'Birinchi',
      last: 'Oxirgi',
      pageClassifier: ''
    },
    // Popconfirm
    popconfirm: {
      confirm: 'OK',
      cancel: 'Bekor qilish',
      dontAskAgain: 'Yana so\'ramang'
    },
    // Dialog
    dialog: {
      confirm: 'OK',
      cancel: 'Bekor qilish',
      close: 'Yopish',
      maximize: 'Kattalashtirish',
      restore: 'Tiklash'
    },
    // Drawer
    drawer: {
      close: 'Yopish',
      confirm: 'OK',
      cancel: 'Bekor qilish'
    },
    // Dropdown
    dropdown: {
      loading: 'Yuklanmoqda...'
    },
    // Rasm
    image: {
      error: 'MUVAFFAQIYATSIZ',
      loading: 'Yuklanmoqda...',
      preview: 'Ko\'rinish',
      zoomIn: 'Kattalashtirish',
      zoomOut: 'Kichiklashtirish',
      rotateLeft: 'Chapga aylantirish',
      rotateRight: 'O\'ngga aylantirish',
      originalSize: 'Asl o\'lcham',
      fullscreen: 'To\'liq ekran'
    },
    // Rasm ko\'ruvchi
    imageviewer: {
      close: 'Yopish',
      prev: 'Oldingi',
      next: 'Keyingi',
      zoomIn: 'Kattalashtirish',
      zoomOut: 'Kichiklashtirish',
      rotateLeft: 'Chapga aylantirish',
      rotateRight: 'O\'ngga aylantirish',
      reset: 'Qayta o\'rnatish',
      fullscreen: 'To\'liq ekran',
      exitFullscreen: 'To\'liq ekrandan chiqish'
    },
    // Cheksiz aylantirish
    infinitescroll: {
      loading: 'Yuklanmoqda...',
      finished: "Ko'proq ma'lumot yo'q",
      error: 'Yuklash muvaffaqiyatsiz, qayta urinib ko\'rish uchun bosing',
      retry: 'Qayta urinib ko\'rish uchun bosing'
    },
    // Xabar
    message: {
      close: 'Yopish'
    },
    // Bildirishnoma
    notification: {
      close: 'Yopish'
    },
    // Yuklash
    loading: {
      text: 'Yuklanmoqda...'
    },
    // Spin
    spin: {
      text: 'Yuklanmoqda...'
    },
    // Baholash
    rate: {
      texts: ['Juda yomon', 'Xafa', 'O\'rtacha', 'Qoniqarli', 'Ajablanarli']
    },
    // Ogohlantirish
    alert: {
      close: 'Yopish'
    },
    // Teg
    tag: {
      close: 'Yopish'
    },
    // Tablar
    tabs: {
      close: 'Yopish',
      add: "Qo'shish",
      more: "Ko'proq"
    },
    // Qadamlar
    steps: {
      finish: 'Tugadi',
      process: 'Jarayonda',
      wait: 'Kutmoqda',
      error: 'Xato'
    },
    // Taraqqiyot
    progress: {
      success: 'Muvaffaqiyat',
      exception: 'Istisno',
      warning: 'Ogohlantirish'
    },
    // Skeleton
    skeleton: {
      loading: 'Yuklanmoqda...'
    },
    // Bo\'sh
    empty: {
      description: "Ma'lumot yo'q",
      noData: "Ma'lumot yo'q",
      noResult: "Natija yo'q",
      networkError: 'Tarmoq xatosi',
      serverError: 'Server xatosi'
    },
    // Natija
    result: {
      success: 'Muvaffaqiyat',
      error: 'Xato',
      warning: 'Ogohlantirish',
      info: 'Ma\'lumot',
      backHome: 'Bosh sahifaga qaytish'
    },
    // Waterfall
    waterfall: {
      loading: 'Yuklanmoqda...',
      noMore: "Ko'proq ma'lumot yo'q",
      empty: "Ma'lumot yo'q"
    },
    // Tavsiflar
    descriptions: {
      colon: ':'
    },
    // Slider
    slider: {
      tipFormatter: '{value}'
    },
    // Switch
    switch: {
      on: 'YOQILGAN',
      off: 'O\'CHIRILGAN'
    },
    // Checkbox
    checkbox: {
      selectAll: 'Barchasini tanlash'
    },
    // Radio
    radio: {},
    // Menyu
    menu: {
      collapse: 'Menyni yig\'ish',
      expand: 'Menyni kengaytirish'
    },
    // Karta
    card: {
      collapse: 'Yig\'ish',
      expand: 'Kengaytirish'
    },
    // Yig\'ish
    collapse: {
      expand: 'Kengaytirish',
      collapse: 'Yig\'ish'
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: 'Yuklash muvaffaqiyatsiz'
    },
    // Watermark
    watermark: {},
    // Divider
    divider: {},
    // Carousel
    carousel: {
      prev: 'Oldingi',
      next: 'Keyingi'
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Anchor
    anchor: {}
  }
}

export default uzUz
