import type { Language } from '../index'

export const ky: Language = {
  name: 'ky',
  yh: {
    // Жалпы
    common: {
      yes: 'Ооба',
      no: 'Жок',
      confirm: 'Ырастоо',
      cancel: 'Жокко чыгаруу',
      loading: 'Жүктөлүүдө',
      close: 'Жабуу',
      clear: 'Тазалоо',
      reset: 'Кайра орнотуу',
      save: 'Сактоо',
      delete: 'Жок кылуу',
      edit: 'Оңдоо',
      add: 'Кошуу',
      search: 'Издөө',
      refresh: 'Жаңылоо',
      expand: 'Кеңейтүү',
      collapse: 'Жыйыштыруу',
      more: 'Көбүрөөк',
      noData: 'Маалымат жок',
      noMatch: 'Туура келген маалымат жок',
      selectAll: 'Баарын тандоо',
      unselectAll: 'Баарын тандоодон баш тартуу'
    },
    // Түс тандоо
    colorpicker: {
      confirm: 'Макул',
      clear: 'Тазалоо',
      eyeDropper: 'Пипетка',
      suggestionDark: 'Ак текст эң жакшы',
      suggestionLight: 'Кара текст эң жакшы',
      recentColors: 'Акыркы түстөр',
      presetColors: 'Алдын ала орнотулган түстөр'
    },
    // Күн тандоо
    datepicker: {
      now: 'Азыр',
      today: 'Бүгүн',
      cancel: 'Жокко чыгаруу',
      clear: 'Тазалоо',
      confirm: 'Макул',
      selectDate: 'Күндү тандоо',
      selectTime: 'Убакытты тандоо',
      startDate: 'Башталган күн',
      startTime: 'Башталган убакыт',
      endDate: 'Аяктаган күн',
      endTime: 'Аяктаган убакыт',
      year: '',
      month: '',
      day: '',
      week: 'Апта',
      monthBeforeYear: true,
      prevYear: 'Мурунку жыл',
      nextYear: 'Кийинки жыл',
      prevMonth: 'Мурунку ай',
      nextMonth: 'Кийинки ай',
      weeks: {
        sun: 'Жек',
        mon: 'Дүй',
        tue: 'Шей',
        wed: 'Шар',
        thu: 'Бей',
        fri: 'Жум',
        sat: 'Ише'
      },
      months: {
        jan: 'Янв',
        feb: 'Фев',
        mar: 'Мар',
        apr: 'Апр',
        may: 'Май',
        jun: 'Июн',
        jul: 'Июл',
        aug: 'Авг',
        sep: 'Сен',
        oct: 'Окт',
        nov: 'Ноя',
        dec: 'Дек'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Убакыт тандоо
    timepicker: {
      confirm: 'Макул',
      cancel: 'Жокко чыгаруу',
      now: 'Азыр',
      placeholder: 'Убакытты тандоо',
      startPlaceholder: 'Башталган убакыт',
      endPlaceholder: 'Аяктаган убакыт',
      selectTime: 'Убакытты тандоо'
    },
    // Убакыт тандоо
    timeselect: {
      placeholder: 'Убакытты тандоо'
    },
    // Дарак
    tree: {
      emptyText: 'Маалымат жок',
      loading: 'Жүктөлүүдө...',
      checkAll: 'Баарын текшерүү',
      uncheckAll: 'Баарын текшерүүдөн баш тартуу',
      expandAll: 'Баарын кеңейтүү',
      collapseAll: 'Баарын жыйыштыруу'
    },
    // Дарак тандоо
    treeselect: {
      placeholder: 'Тандоо',
      emptyText: 'Маалымат жок',
      loading: 'Жүктөлүүдө...',
      noMatch: 'Туура келген маалымат жок'
    },
    // Күн календары
    calendar: {
      prevMonth: 'Мурунку ай',
      nextMonth: 'Кийинки ай',
      prevYear: 'Мурунку жыл',
      nextYear: 'Кийинки жыл',
      today: 'Бүгүн',
      week: 'Апта',
      holiday: 'Майрам',
      workday: 'Жумуш',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Жек',
        mon: 'Дүй',
        tue: 'Шей',
        wed: 'Шар',
        thu: 'Бей',
        fri: 'Жум',
        sat: 'Ише'
      }
    },
    // Автоматтык толтуруу
    autocomplete: {
      loading: 'Жүктөлүүдө...',
      placeholder: 'Сураныч, киргизиңиз',
      noData: 'Маалымат жок',
      noMatch: 'Туура келген маалымат жок'
    },
    // Кері саноо
    countdown: {
      days: 'күн',
      hours: 'саат',
      minutes: 'мүнөт',
      seconds: 'секунд',
      milliseconds: 'миллисекунд',
      finished: 'Бүттү'
    },
    // Каскад
    cascader: {
      noMatch: 'Туура келген маалымат жок',
      placeholder: 'Тандоо',
      loading: 'Жүктөлүүдө...',
      noData: 'Маалымат жок'
    },
    // Которуу
    transfer: {
      noMatch: 'Туура келген маалымат жок',
      noData: 'Маалымат жок',
      titles: ['Тизме 1', 'Тизме 2'],
      filterPlaceholder: 'Ачкыч сөздү киргизиңиз',
      noCheckedFormat: '{total} элемент',
      hasCheckedFormat: '{checked}/{total} тандалды',
      searchPlaceholder: 'Ачкыч сөздү киргизиңиз'
    },
    // Таблица
    table: {
      emptyText: 'Маалымат жок',
      confirmFilter: 'Ырастоо',
      resetFilter: 'Кайра орнотуу',
      clearFilter: 'Баары',
      sumText: 'Сумма',
      loading: 'Жүктөлүүдө...',
      index: 'Индекс',
      print: 'Басып чыгаруу',
      cancel: 'Жокко чыгаруу',
      preview: 'Басып чыгаруу алдын ала көрүү',
      printTime: 'Басып чыгаруу убактысы',
      total: 'Баары {total} элемент',
      page: 'Барак {page}',
      yes: 'Ооба',
      no: 'Жок',
      // Куралдар панели
      toolbar: {
        refresh: 'Жаңылоо',
        density: 'Жыштык',
        densityDefault: 'Демейки',
        densityLarge: 'Чоң',
        densitySmall: 'Кичине',
        columnSetting: 'Тик барак параметрлери',
        fullscreen: 'Толук экран',
        exitFullscreen: 'Толук экрандан чыгуу',
        export: 'Экспорттоо',
        import: 'Импорттоо',
        search: 'Издөө',
        searchPlaceholder: 'Издөө үчүн ачкыч сөздөрдү киргизиңиз'
      },
      // Фильтр
      filter: {
        selectAll: 'Баарын тандоо',
        selectInvert: 'Тандоону тескери буруу',
        empty: 'Бош',
        notEmpty: 'Бош эмес',
        contains: 'Камтыйт',
        notContains: 'Камтыбайт',
        equals: 'Барабар',
        notEquals: 'Барабар эмес',
        startsWith: 'Башталат',
        endsWith: 'Аяктайт',
        greaterThan: 'Чоңураак',
        lessThan: 'Кичине',
        between: 'Ортосунда'
      },
      // Сорттоо
      sort: {
        asc: 'Өсүү',
        desc: 'Азайып',
        clear: 'Сорттоону тазалоо'
      },
      // Экспорттоо
      export: {
        title: 'Маалыматты экспорттоо',
        filename: 'Файл аты',
        type: 'Файл түрү',
        scope: 'Экспорттоо көлөмү',
        scopeAll: 'Баары маалымат',
        scopeSelected: 'Тандалган маалымат',
        scopeCurrentPage: 'Учурдагы барак',
        includeHeader: 'Баштыкты кошуу',
        exporting: 'Экспорттоолууда...',
        success: 'Экспорттоо ийгиликтүү',
        error: 'Экспорттоо ийгиликсиз'
      },
      // Импорттоо
      import: {
        title: 'Маалыматты импорттоо',
        selectFile: 'Файлды тандоо',
        dragTip: 'Жүктөө үчүн файлды басыңыз же сүйрөңүз',
        importing: 'Импорттоолууда...',
        success: 'Импорттоо ийгиликтүү',
        error: 'Импорттоо ийгиликсиз',
        preview: 'Маалыматты алдын ала көрүү',
        confirm: 'Импорттоону ырастоо'
      },
      // Басып чыгаруу
      printConfig: {
        title: 'Басып чыгаруу параметрлери',
        pageTitle: 'Барак аталышы',
        pageHeader: 'Баштык',
        pageFooter: 'Төмөнкү бөлүк',
        printAll: 'Баарын басып чыгаруу',
        printSelected: 'Тандалганды басып чыгаруу',
        printCurrentPage: 'Учурдагы баракты басып чыгаруу',
        landscape: 'Кылаң',
        portrait: 'Тик',
        printing: 'Басып чыгарууда...'
      },
      // Тик барак параметрлери
      columnSetting: {
        title: 'Тик барак параметрлери',
        showAll: 'Баарын көрсөтүү',
        hideAll: 'Баарын жашыруу',
        reset: 'Кайра орнотуу',
        fixedLeft: 'Солго бекемдөө',
        fixedRight: 'Оңго бекемдөө',
        unfixed: 'Бошотуу'
      },
      // Контекст менюсу
      contextMenu: {
        copy: 'Көчүрүү',
        copyRow: 'Сапты көчүрүү',
        copyCell: 'Уячаны көчүрүү',
        paste: 'Кыстыруу',
        insertRowAbove: 'Жогору сап кошуу',
        insertRowBelow: 'Төмөн сап кошуу',
        deleteRow: 'Сапты жок кылуу',
        deleteSelectedRows: 'Тандалган саптарды жок кылуу',
        exportSelected: 'Тандалганды экспорттоо'
      },
      // Тандоо
      selection: {
        selectAll: 'Баарын тандоо',
        selectInvert: 'Тандоону тескери буруу',
        selectNone: 'Тандоону тазалоо',
        selected: '{count} элемент тандалды'
      },
      // Кеңейтүү
      expand: {
        expandAll: 'Баарын кеңейтүү',
        collapseAll: 'Баарын жыйыштыруу'
      },
      // Дарак
      tree: {
        expandAll: 'Баарын кеңейтүү',
        collapseAll: 'Баарын жыйыштыруу',
        expandLevel: '{level} деңгейге чейин кеңейтүү'
      },
      // Сүйрөө
      drag: {
        dragTip: 'Кайра тартипке келтирүү үчүн сүйрөңүз',
        dropTip: 'Жайгаштыруу үчүн таштаңыз'
      }
    },
    // Билдирүү кутусу
    messagebox: {
      title: 'Билдирүү',
      confirm: 'Макул',
      cancel: 'Жокко чыгаруу',
      close: 'Жабуу',
      error: 'Жараксыз киргизүү',
      alert: 'Эскертүү',
      prompt: 'Суроо',
      inputPlaceholder: 'Сураныч, киргизиңиз'
    },
    // Жүктөө
    upload: {
      deleteTip: 'жок кылуу үчүн delete басыңыз',
      delete: 'Жок кылуу',
      preview: 'Алдын ала көрүү',
      continue: 'Улантуу',
      upload: 'Жүктөө үчүн басыңыз',
      tip: '<em>Жүктөө</em> үчүн файлды бул аймакка басыңыз же сүйрөңүз',
      dragTip: 'Файлды бул жерге таштаңыз же жүктөө үчүн басыңыз',
      uploading: 'Жүктөлүүдө...',
      success: 'Жүктөө ийгиликтүү',
      error: 'Жүктөө ийгиликсиз',
      retry: 'Кайра аракет кылуу',
      cancel: 'Жүктөөдөн баш тартуу',
      fileTypeError: 'Файл түрү колдоого алынбайт',
      fileSizeError: 'Файл көлөмү чектен ашты',
      fileCountError: 'Файл саны чектен ашты'
    },
    // Форма
    form: {
      validationFailed: 'Текшерүү ийгиликсиз',
      required: 'Миндеттүү',
      pleaseInput: 'Сураныч, киргизиңиз',
      pleaseSelect: 'Сураныч, тандаңыз'
    },
    // Баскыч
    button: {
      loading: 'Жүктөлүүдө...'
    },
    // Киргизүү
    input: {
      placeholder: 'Сураныч, киргизиңиз',
      clear: 'Тазалоо',
      showPassword: 'Сырсөздү көрсөтүү',
      hidePassword: 'Сырсөздү жашыруу',
      copy: 'Көчүрүү',
      copied: 'Көчүрүлдү'
    },
    // Сан киргизүү
    inputnumber: {
      placeholder: 'Сураныч, сан киргизиңиз',
      increase: 'Көбөйтүү',
      decrease: 'Азайтуу'
    },
    // Тег киргизүү
    inputtag: {
      placeholder: 'Сураныч, киргизиңиз',
      add: 'Кошуу',
      remove: 'Жок кылуу'
    },
    // Навигация жолу
    breadcrumb: {
      label: 'Навигация жолу',
      more: 'Көбүрөөк'
    },
    // Жогоруга кайтуу
    backtop: {
      text: 'Жогоруга кайтуу'
    },
    // Тандоо
    select: {
      placeholder: 'Сураныч, тандаңыз',
      noData: 'Маалымат жок',
      loading: 'Жүктөлүүдө...',
      noMatch: 'Туура келген маалымат жок',
      selectAll: 'Баарын тандоо',
      clearAll: 'Баарын тазалоо'
    },
    // Барактама
    pagination: {
      goto: 'Баруу',
      page: '',
      total: 'Баары {total}',
      pageSize: '/барак',
      prev: 'Мурунку',
      next: 'Кийинки',
      first: 'Биринчи',
      last: 'Акыркы',
      pageClassifier: ''
    },
    // Расталоо popup
    popconfirm: {
      confirm: 'Макул',
      cancel: 'Жокко чыгаруу',
      dontAskAgain: 'Кайра сурабаңыз'
    },
    // Диалог
    dialog: {
      confirm: 'Макул',
      cancel: 'Жокко чыгаруу',
      close: 'Жабуу',
      maximize: 'Максималдаштыруу',
      restore: 'Кайра орнотуу'
    },
    // Сүйрөмө
    drawer: {
      close: 'Жабуу',
      confirm: 'Макул',
      cancel: 'Жокко чыгаруу'
    },
    // Төмөнкү меню
    dropdown: {
      loading: 'Жүктөлүүдө...'
    },
    // Сүрөт
    image: {
      error: 'ИЙГИЛИКСИЗ',
      loading: 'Жүктөлүүдө...',
      preview: 'Алдын ала көрүү',
      zoomIn: 'Чоңойтуу',
      zoomOut: 'Кичирейтүү',
      rotateLeft: 'Солго буруу',
      rotateRight: 'Оңго буруу',
      originalSize: 'Баштапкы көлөм',
      fullscreen: 'Толук экран'
    },
    // Сүрөт көрүүчү
    imageviewer: {
      close: 'Жабуу',
      prev: 'Мурунку',
      next: 'Кийинки',
      zoomIn: 'Чоңойтуу',
      zoomOut: 'Кичирейтүү',
      rotateLeft: 'Солго буруу',
      rotateRight: 'Оңго буруу',
      reset: 'Кайра орнотуу',
      fullscreen: 'Толук экран',
      exitFullscreen: 'Толук экрандан чыгуу'
    },
    // Чексиз айландыруу
    infinitescroll: {
      loading: 'Жүктөлүүдө...',
      finished: 'Маалымат жок',
      error: 'Жүктөө ийгиликсиз, кайра аракет кылуу үчүн басыңыз',
      retry: 'Кайра аракет кылуу үчүн басыңыз'
    },
    // Билдирүү
    message: {
      close: 'Жабуу'
    },
    // Эскертүү
    notification: {
      close: 'Жабуу'
    },
    // Жүктөө
    loading: {
      text: 'Жүктөлүүдө...'
    },
    // Айландыруу
    spin: {
      text: 'Жүктөлүүдө...'
    },
    // Баалоо
    rate: {
      texts: ['Өтө начар', 'Көңүл калтырган', 'Адилеттүү', 'Канааттанган', 'Таң калган']
    },
    // Эскертүү
    alert: {
      close: 'Жабуу'
    },
    // Тег
    tag: {
      close: 'Жабуу'
    },
    // Коймалар
    tabs: {
      close: 'Жабуу',
      add: 'Кошуу',
      more: 'Көбүрөөк'
    },
    // Кадамдар
    steps: {
      finish: 'Бүттү',
      process: 'Улантууда',
      wait: 'Күтүүдө',
      error: 'Ката'
    },
    // Прогресс
    progress: {
      success: 'Ийгилик',
      exception: 'Эрекчелик',
      warning: 'Эскертүү'
    },
    // Скелет
    skeleton: {
      loading: 'Жүктөлүүдө...'
    },
    // Бош
    empty: {
      description: 'Маалымат жок',
      noData: 'Маалымат жок',
      noResult: 'Натыйжалар жок',
      networkError: 'Тармак катасы',
      serverError: 'Сервер катасы'
    },
    // Натыйжа
    result: {
      success: 'Ийгилик',
      error: 'Ката',
      warning: 'Эскертүү',
      info: 'Маалымат',
      backHome: 'Башкы баракка кайтуу'
    },
    // Суу агымы
    waterfall: {
      loading: 'Жүктөлүүдө...',
      noMore: 'Маалымат жок',
      empty: 'Маалымат жок'
    },
    // Сыпаттамалар
    descriptions: {
      colon: ':'
    },
    // Слайдер
    slider: {
      tipFormatter: '{value}'
    },
    // Калкыгыч
    switch: {
      on: 'КУУЛУУ',
      off: 'ӨЧҮРҮЛГӨН'
    },
    // Белгилөө кутусу
    checkbox: {
      selectAll: 'Баарын тандоо'
    },
    // Радио
    radio: {},
    // Меню
    menu: {
      collapse: 'Менюну жыйыштыруу',
      expand: 'Менюну кеңейтүү'
    },
    // Карта
    card: {
      collapse: 'Жыйыштыруу',
      expand: 'Кеңейтүү'
    },
    // Жыйыштыруу
    collapse: {
      expand: 'Кеңейтүү',
      collapse: 'Жыйыштыруу'
    },
    // Кеңеш
    tooltip: {},
    // Popover
    popover: {},
    // Белги
    badge: {},
    // Аватар
    avatar: {
      error: 'Жүктөө ийгиликсиз'
    },
    // Суу белгиси
    watermark: {},
    // Бөлгүч
    divider: {},
    // Карусель
    carousel: {
      prev: 'Мурунку',
      next: 'Кийинки'
    },
    // Marquee
    marquee: {},
    // Бекемдөө
    affix: {},
    // Якорь
    anchor: {}
  }
}

export default ky
