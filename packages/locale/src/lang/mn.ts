import type { Language } from '../index'

export const mn: Language = {
  name: 'mn',
  yh: {
    // Ерөнхий
    common: {
      yes: 'Тийм',
      no: 'Үгүй',
      confirm: 'Баталгаажуулах',
      cancel: 'Цуцлах',
      loading: 'Ачааллаж байна',
      close: 'Хаах',
      clear: 'Цэвэрлэх',
      reset: 'Дахин тохируулах',
      save: 'Хадгалах',
      delete: 'Устгах',
      edit: 'Засах',
      add: 'Нэмэх',
      search: 'Хайх',
      refresh: 'Сэргээх',
      expand: 'Өргөжүүлэх',
      collapse: 'Нэгтгэх',
      more: 'Дэлгэрэнгүй',
      noData: 'Өгөгдөл байхгүй',
      noMatch: 'Тохирох өгөгдөл байхгүй',
      selectAll: 'Бүгдийг сонгох',
      unselectAll: 'Бүх сонголтыг цуцлах'
    },
    // Өнгө сонгох
    colorpicker: {
      confirm: 'Болно',
      clear: 'Цэвэрлэх',
      eyeDropper: 'Дуслын хэмжүүр',
      suggestionDark: 'Цагаан текст хамгийн сайн',
      suggestionLight: 'Хар текст хамгийн сайн',
      recentColors: 'Сүүлийн өнгөнүүд',
      presetColors: 'Урьдчилан тохируулсан өнгөнүүд'
    },
    // Огноо сонгох
    datepicker: {
      now: 'Одоо',
      today: 'Өнөөдөр',
      cancel: 'Цуцлах',
      clear: 'Цэвэрлэх',
      confirm: 'Болно',
      selectDate: 'Огноо сонгох',
      selectTime: 'Цаг сонгох',
      startDate: 'Эхлэх огноо',
      startTime: 'Эхлэх цаг',
      endDate: 'Дуусах огноо',
      endTime: 'Дуусах цаг',
      year: '',
      month: '',
      day: '',
      week: 'Долоо хоног',
      monthBeforeYear: true,
      prevYear: 'Өмнөх жил',
      nextYear: 'Дараагийн жил',
      prevMonth: 'Өмнөх сар',
      nextMonth: 'Дараагийн сар',
      weeks: {
        sun: 'Ня',
        mon: 'Да',
        tue: 'Мя',
        wed: 'Лх',
        thu: 'Пү',
        fri: 'Ба',
        sat: 'Бя'
      },
      months: {
        jan: '1-р сар',
        feb: '2-р сар',
        mar: '3-р сар',
        apr: '4-р сар',
        may: '5-р сар',
        jun: '6-р сар',
        jul: '7-р сар',
        aug: '8-р сар',
        sep: '9-р сар',
        oct: '10-р сар',
        nov: '11-р сар',
        dec: '12-р сар'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Цаг сонгох
    timepicker: {
      confirm: 'Болно',
      cancel: 'Цуцлах',
      now: 'Одоо',
      placeholder: 'Цаг сонгох',
      startPlaceholder: 'Эхлэх цаг',
      endPlaceholder: 'Дуусах цаг',
      selectTime: 'Цаг сонгох'
    },
    // Цаг сонгох
    timeselect: {
      placeholder: 'Цаг сонгох'
    },
    // Мод
    tree: {
      emptyText: 'Өгөгдөл байхгүй',
      loading: 'Ачааллаж байна...',
      checkAll: 'Бүгдийг шалгах',
      uncheckAll: 'Бүх шалгалтыг цуцлах',
      expandAll: 'Бүгдийг өргөжүүлэх',
      collapseAll: 'Бүгдийг нэгтгэх'
    },
    // Мод сонгох
    treeselect: {
      placeholder: 'Сонгох',
      emptyText: 'Өгөгдөл байхгүй',
      loading: 'Ачааллаж байна...',
      noMatch: 'Тохирох өгөгдөл байхгүй'
    },
    // Календарь
    calendar: {
      prevMonth: 'Өмнөх сар',
      nextMonth: 'Дараагийн сар',
      prevYear: 'Өмнөх жил',
      nextYear: 'Дараагийн жил',
      today: 'Өнөөдөр',
      week: 'Долоо хоног',
      holiday: 'Амралтын өдөр',
      workday: 'Ажлын өдөр',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Ня',
        mon: 'Да',
        tue: 'Мя',
        wed: 'Лх',
        thu: 'Пү',
        fri: 'Ба',
        sat: 'Бя'
      }
    },
    // Автомат бөглөлт
    autocomplete: {
      loading: 'Ачааллаж байна...',
      placeholder: 'Оруулна уу',
      noData: 'Өгөгдөл байхгүй',
      noMatch: 'Тохирох өгөгдөл байхгүй'
    },
    // Тоолох
    countdown: {
      days: 'өдөр',
      hours: 'цаг',
      minutes: 'минут',
      seconds: 'секунд',
      milliseconds: 'миллисекунд',
      finished: 'Дууслаа'
    },
    // Каскад
    cascader: {
      noMatch: 'Тохирох өгөгдөл байхгүй',
      placeholder: 'Сонгох',
      loading: 'Ачааллаж байна...',
      noData: 'Өгөгдөл байхгүй'
    },
    // Шилжүүлэх
    transfer: {
      noMatch: 'Тохирох өгөгдөл байхгүй',
      noData: 'Өгөгдөл байхгүй',
      titles: ['Жагсаалт 1', 'Жагсаалт 2'],
      filterPlaceholder: 'Түлхүүр үг оруулах',
      noCheckedFormat: '{total} зүйл',
      hasCheckedFormat: '{checked}/{total} сонгосон',
      searchPlaceholder: 'Түлхүүр үг оруулах'
    },
    // Хүснэгт
    table: {
      emptyText: 'Өгөгдөл байхгүй',
      confirmFilter: 'Баталгаажуулах',
      resetFilter: 'Дахин тохируулах',
      clearFilter: 'Бүгд',
      sumText: 'Нийт',
      loading: 'Ачааллаж байна...',
      index: 'Индекс',
      print: 'Хэвлэх',
      cancel: 'Цуцлах',
      preview: 'Хэвлэх урьдчилсан харагдац',
      printTime: 'Хэвлэх цаг',
      total: 'Нийт {total} зүйл',
      page: 'Хуудас {page}',
      yes: 'Тийм',
      no: 'Үгүй',
      // Хэрэгслийн самбар
      toolbar: {
        refresh: 'Сэргээх',
        density: 'Нягтрал',
        densityDefault: 'Анхдагч',
        densityLarge: 'Том',
        densitySmall: 'Жижиг',
        columnSetting: 'Баганы тохиргоо',
        fullscreen: 'Бүтэн дэлгэц',
        exitFullscreen: 'Бүтэн дэлгэцнээс гарах',
        export: 'Экспорт',
        import: 'Импорт',
        search: 'Хайх',
        searchPlaceholder: 'Хайх түлхүүр үгс оруулах'
      },
      // Шүүлт
      filter: {
        selectAll: 'Бүгдийг сонгох',
        selectInvert: 'Сонголтыг эргүүлэх',
        empty: 'Хоосон',
        notEmpty: 'Хоосон биш',
        contains: 'Агуулна',
        notContains: 'Агуулахгүй',
        equals: 'Тэнцүү',
        notEquals: 'Тэнцүү биш',
        startsWith: 'Эхэлнэ',
        endsWith: 'Дуусна',
        greaterThan: 'Илүү их',
        lessThan: 'Бага',
        between: 'Хооронд'
      },
      // Эрэмбэлэх
      sort: {
        asc: 'Өсөх',
        desc: 'Буурах',
        clear: 'Эрэмбэлэлтийг цэвэрлэх'
      },
      // Экспорт
      export: {
        title: 'Өгөгдөл экспортлох',
        filename: 'Файлын нэр',
        type: 'Файлын төрөл',
        scope: 'Экспортын хүрээ',
        scopeAll: 'Бүх өгөгдөл',
        scopeSelected: 'Сонгосон өгөгдөл',
        scopeCurrentPage: 'Одоогийн хуудас',
        includeHeader: 'Толгойг оруулах',
        exporting: 'Экспортлож байна...',
        success: 'Экспорт амжилттай',
        error: 'Экспорт амжилтгүй'
      },
      // Импорт
      import: {
        title: 'Өгөгдөл импортлох',
        selectFile: 'Файл сонгох',
        dragTip: 'Байршуулахын тулд файл дээр дарах эсвэл чирэх',
        importing: 'Импортлож байна...',
        success: 'Импорт амжилттай',
        error: 'Импорт амжилтгүй',
        preview: 'Өгөгдлийн урьдчилсан харагдац',
        confirm: 'Импортыг баталгаажуулах'
      },
      // Хэвлэх
      printConfig: {
        title: 'Хэвлэх тохиргоо',
        pageTitle: 'Хуудасны гарчиг',
        pageHeader: 'Толгой',
        pageFooter: 'Хөл',
        printAll: 'Бүгдийг хэвлэх',
        printSelected: 'Сонгосоныг хэвлэх',
        printCurrentPage: 'Одоогийн хуудсыг хэвлэх',
        landscape: 'Хэвтээ',
        portrait: 'Босоо',
        printing: 'Хэвлэж байна...'
      },
      // Баганы тохиргоо
      columnSetting: {
        title: 'Баганы тохиргоо',
        showAll: 'Бүгдийг харуулах',
        hideAll: 'Бүгдийг нуух',
        reset: 'Дахин тохируулах',
        fixedLeft: 'Зүүн талд бэхлэх',
        fixedRight: 'Баруун талд бэхлэх',
        unfixed: 'Суллах'
      },
      // Контекст цэс
      contextMenu: {
        copy: 'Хуулах',
        copyRow: 'Мөрийг хуулах',
        copyCell: 'Нүдийг хуулах',
        paste: 'Оруулах',
        insertRowAbove: 'Дээр мөр нэмэх',
        insertRowBelow: 'Доор мөр нэмэх',
        deleteRow: 'Мөрийг устгах',
        deleteSelectedRows: 'Сонгосон мөрүүдийг устгах',
        exportSelected: 'Сонгосоныг экспортлох'
      },
      // Сонголт
      selection: {
        selectAll: 'Бүгдийг сонгох',
        selectInvert: 'Сонголтыг эргүүлэх',
        selectNone: 'Сонголтыг цэвэрлэх',
        selected: '{count} зүйл сонгогдсон'
      },
      // Өргөжүүлэх
      expand: {
        expandAll: 'Бүгдийг өргөжүүлэх',
        collapseAll: 'Бүгдийг нэгтгэх'
      },
      // Мод
      tree: {
        expandAll: 'Бүгдийг өргөжүүлэх',
        collapseAll: 'Бүгдийг нэгтгэх',
        expandLevel: '{level} түвшинд хүртэл өргөжүүлэх'
      },
      // Чирэх
      drag: {
        dragTip: 'Дахин эрэмбэлэхийн тулд чирэх',
        dropTip: 'Байрлуулахын тулд буулгах'
      }
    },
    // Мессеж хайрцаг
    messagebox: {
      title: 'Мессеж',
      confirm: 'Болно',
      cancel: 'Цуцлах',
      close: 'Хаах',
      error: 'Буруу оруулга',
      alert: 'Анхааруулга',
      prompt: 'Уриалга',
      inputPlaceholder: 'Оруулна уу'
    },
    // Байршуулах
    upload: {
      deleteTip: 'устгахын тулд delete дарах',
      delete: 'Устгах',
      preview: 'Урьдчилсан харагдац',
      continue: 'Үргэлжлүүлэх',
      upload: 'Байршуулахын тулд дарах',
      tip: '<em>Байршуулах</em>ын тулд файлыг энэ хэсэгт дарах эсвэл чирэх',
      dragTip: 'Файлыг энд буулгах эсвэл байршуулахын тулд дарах',
      uploading: 'Байршуулж байна...',
      success: 'Байршуулалт амжилттай',
      error: 'Байршуулалт амжилтгүй',
      retry: 'Дахин оролдох',
      cancel: 'Байршуулалтыг цуцлах',
      fileTypeError: 'Файлын төрөл дэмжигдэхгүй',
      fileSizeError: 'Файлын хэмжээ хязгаараас хэтэрсэн',
      fileCountError: 'Файлын тоо хязгаараас хэтэрсэн'
    },
    // Форм
    form: {
      validationFailed: 'Баталгаажуулалт амжилтгүй',
      required: 'Шаардлагатай',
      pleaseInput: 'Оруулна уу',
      pleaseSelect: 'Сонгоно уу'
    },
    // Товч
    button: {
      loading: 'Ачааллаж байна...'
    },
    // Оруулга
    input: {
      placeholder: 'Оруулна уу',
      clear: 'Цэвэрлэх',
      showPassword: 'Нууц үгийг харуулах',
      hidePassword: 'Нууц үгийг нуух',
      copy: 'Хуулах',
      copied: 'Хуулагдсан'
    },
    // Тоо оруулах
    inputnumber: {
      placeholder: 'Тоо оруулна уу',
      increase: 'Нэмэгдүүлэх',
      decrease: 'Бууруулах'
    },
    // Шошго оруулах
    inputtag: {
      placeholder: 'Оруулна уу',
      add: 'Нэмэх',
      remove: 'Устгах'
    },
    // Навигацийн зам
    breadcrumb: {
      label: 'Навигацийн зам',
      more: 'Дэлгэрэнгүй'
    },
    // Дээш буцах
    backtop: {
      text: 'Дээш буцах'
    },
    // Сонголт
    select: {
      placeholder: 'Сонгоно уу',
      noData: 'Өгөгдөл байхгүй',
      loading: 'Ачааллаж байна...',
      noMatch: 'Тохирох өгөгдөл байхгүй',
      selectAll: 'Бүгдийг сонгох',
      clearAll: 'Бүгдийг цэвэрлэх'
    },
    // Хуудаслалт
    pagination: {
      goto: 'Явах',
      page: '',
      total: 'Нийт {total}',
      pageSize: '/хуудас',
      prev: 'Өмнөх',
      next: 'Дараагийн',
      first: 'Эхнийх',
      last: 'Сүүлийнх',
      pageClassifier: ''
    },
    // Баталгаажуулах popup
    popconfirm: {
      confirm: 'Болно',
      cancel: 'Цуцлах',
      dontAskAgain: 'Дахин асуухгүй'
    },
    // Диалог
    dialog: {
      confirm: 'Болно',
      cancel: 'Цуцлах',
      close: 'Хаах',
      maximize: 'Ихэсгэх',
      restore: 'Сэргээх'
    },
    // Шургуулга
    drawer: {
      close: 'Хаах',
      confirm: 'Болно',
      cancel: 'Цуцлах'
    },
    // Доош цэс
    dropdown: {
      loading: 'Ачааллаж байна...'
    },
    // Зураг
    image: {
      error: 'АМЖИЛТГҮЙ',
      loading: 'Ачааллаж байна...',
      preview: 'Урьдчилсан харагдац',
      zoomIn: 'Томруулах',
      zoomOut: 'Жижигрүүлэх',
      rotateLeft: 'Зүүн тийш эргүүлэх',
      rotateRight: 'Баруун тийш эргүүлэх',
      originalSize: 'Анхны хэмжээ',
      fullscreen: 'Бүтэн дэлгэц'
    },
    // Зургийн харагч
    imageviewer: {
      close: 'Хаах',
      prev: 'Өмнөх',
      next: 'Дараагийн',
      zoomIn: 'Томруулах',
      zoomOut: 'Жижигрүүлэх',
      rotateLeft: 'Зүүн тийш эргүүлэх',
      rotateRight: 'Баруун тийш эргүүлэх',
      reset: 'Дахин тохируулах',
      fullscreen: 'Бүтэн дэлгэц',
      exitFullscreen: 'Бүтэн дэлгэцнээс гарах'
    },
    // Хязгааргүй гүйлгэх
    infinitescroll: {
      loading: 'Ачааллаж байна...',
      finished: 'Өгөгдөл дууссан',
      error: 'Ачаалал амжилтгүй, дахин оролдохын тулд дарах',
      retry: 'Дахин оролдохын тулд дарах'
    },
    // Мессеж
    message: {
      close: 'Хаах'
    },
    // Мэдэгдэл
    notification: {
      close: 'Хаах'
    },
    // Ачаалал
    loading: {
      text: 'Ачааллаж байна...'
    },
    // Эргэлт
    spin: {
      text: 'Ачааллаж байна...'
    },
    // Үнэлгээ
    rate: {
      texts: ['Маш муу', 'Сэтгэл дундуур', 'Дунд зэрэг', 'Сэтгэл хангалуун', 'Гайхсан']
    },
    // Анхааруулга
    alert: {
      close: 'Хаах'
    },
    // Шошго
    tag: {
      close: 'Хаах'
    },
    // Таб
    tabs: {
      close: 'Хаах',
      add: 'Нэмэх',
      more: 'Дэлгэрэнгүй'
    },
    // Алхам
    steps: {
      finish: 'Дууслаа',
      process: 'Явж байна',
      wait: 'Хүлээж байна',
      error: 'Алдаа'
    },
    // Явц
    progress: {
      success: 'Амжилт',
      exception: 'Үл хамаарах',
      warning: 'Анхааруулга'
    },
    // Хүрээ
    skeleton: {
      loading: 'Ачааллаж байна...'
    },
    // Хоосон
    empty: {
      description: 'Өгөгдөл байхгүй',
      noData: 'Өгөгдөл байхгүй',
      noResult: 'Үр дүн байхгүй',
      networkError: 'Сүлжээний алдаа',
      serverError: 'Серверийн алдаа'
    },
    // Үр дүн
    result: {
      success: 'Амжилт',
      error: 'Алдаа',
      warning: 'Анхааруулга',
      info: 'Мэдээлэл',
      backHome: 'Нүүр хуудас руу буцах'
    },
    // Усны урсгал
    waterfall: {
      loading: 'Ачааллаж байна...',
      noMore: 'Өгөгдөл дууссан',
      empty: 'Өгөгдөл байхгүй'
    },
    // Тайлбар
    descriptions: {
      colon: ':'
    },
    // Гүйлгэх
    slider: {
      tipFormatter: '{value}'
    },
    // Солих
    switch: {
      on: 'АСААЛТ',
      off: 'УНТАЛТ'
    },
    // Шалгах хайрцаг
    checkbox: {
      selectAll: 'Бүгдийг сонгох'
    },
    // Радио
    radio: {},
    // Цэс
    menu: {
      collapse: 'Цэсийг нэгтгэх',
      expand: 'Цэсийг өргөжүүлэх'
    },
    // Карт
    card: {
      collapse: 'Нэгтгэх',
      expand: 'Өргөжүүлэх'
    },
    // Нэгтгэх
    collapse: {
      expand: 'Өргөжүүлэх',
      collapse: 'Нэгтгэх'
    },
    // Зөвлөмж
    tooltip: {},
    // Popover
    popover: {},
    // Тэмдэг
    badge: {},
    // Аватар
    avatar: {
      error: 'Ачаалал амжилтгүй'
    },
    // Усны тэмдэг
    watermark: {},
    // Хуваагч
    divider: {},
    // Карусель
    carousel: {
      prev: 'Өмнөх',
      next: 'Дараагийн'
    },
    // Marquee
    marquee: {},
    // Бэхлэх
    affix: {},
    // Зангуу
    anchor: {}
  }
}

export default mn
