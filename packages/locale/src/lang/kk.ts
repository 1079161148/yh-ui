import type { Language } from '../index'

export const kk: Language = {
  name: 'kk',
  yh: {
    // Жалпы
    common: {
      yes: 'Иә',
      no: 'Жоқ',
      confirm: 'Растау',
      cancel: 'Болдырмау',
      loading: 'Жүктелуде',
      close: 'Жабу',
      clear: 'Тазалау',
      reset: 'Қалпына келтіру',
      save: 'Сақтау',
      delete: 'Жою',
      edit: 'Өңдеу',
      add: 'Қосу',
      search: 'Іздеу',
      refresh: 'Жаңарту',
      expand: 'Кеңейту',
      collapse: 'Жию',
      more: 'Көбірек',
      noData: 'Деректер жоқ',
      noMatch: 'Сәйкес деректер жоқ',
      selectAll: 'Барлығын таңдау',
      unselectAll: 'Барлық таңдауды жою'
    },
    // Түс таңдау
    colorpicker: {
      confirm: 'Жарайды',
      clear: 'Тазалау',
      eyeDropper: 'Пипетка',
      suggestionDark: 'Ақ мәтін ең жақсы',
      suggestionLight: 'Қара мәтін ең жақсы',
      recentColors: 'Соңғы түстер',
      presetColors: 'Алдын ала орнатылған түстер'
    },
    // Күн таңдау
    datepicker: {
      now: 'Қазір',
      today: 'Бүгін',
      cancel: 'Болдырмау',
      clear: 'Тазалау',
      confirm: 'Жарайды',
      selectDate: 'Күнді таңдау',
      selectTime: 'Уақытты таңдау',
      startDate: 'Басталу күні',
      startTime: 'Басталу уақыты',
      endDate: 'Аяқталу күні',
      endTime: 'Аяқталу уақыты',
      year: '',
      month: '',
      day: '',
      week: 'Апта',
      monthBeforeYear: true,
      prevYear: 'Алдыңғы жыл',
      nextYear: 'Келесі жыл',
      prevMonth: 'Алдыңғы ай',
      nextMonth: 'Келесі ай',
      weeks: {
        sun: 'Жс',
        mon: 'Дс',
        tue: 'Сс',
        wed: 'Ср',
        thu: 'Бс',
        fri: 'Жм',
        sat: 'Сб'
      },
      months: {
        jan: 'Қаң',
        feb: 'Ақп',
        mar: 'Нау',
        apr: 'Сәу',
        may: 'Мам',
        jun: 'Мау',
        jul: 'Шіл',
        aug: 'Там',
        sep: 'Қыр',
        oct: 'Қаз',
        nov: 'Қар',
        dec: 'Жел'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Уақыт таңдау
    timepicker: {
      confirm: 'Жарайды',
      cancel: 'Болдырмау',
      now: 'Қазір',
      placeholder: 'Уақытты таңдау',
      startPlaceholder: 'Басталу уақыты',
      endPlaceholder: 'Аяқталу уақыты',
      selectTime: 'Уақытты таңдау'
    },
    // Уақыт таңдау
    timeselect: {
      placeholder: 'Уақытты таңдау'
    },
    // Ағаш
    tree: {
      emptyText: 'Деректер жоқ',
      loading: 'Жүктелуде...',
      checkAll: 'Барлығын тексеру',
      uncheckAll: 'Барлық тексеруді жою',
      expandAll: 'Барлығын кеңейту',
      collapseAll: 'Барлығын жию'
    },
    // Ағаш таңдау
    treeselect: {
      placeholder: 'Таңдау',
      emptyText: 'Деректер жоқ',
      loading: 'Жүктелуде...',
      noMatch: 'Сәйкес деректер жоқ'
    },
    // Күнтізбе
    calendar: {
      prevMonth: 'Алдыңғы ай',
      nextMonth: 'Келесі ай',
      prevYear: 'Алдыңғы жыл',
      nextYear: 'Келесі жыл',
      today: 'Бүгін',
      week: 'Апта',
      holiday: 'Мереке',
      workday: 'Жұмыс',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Жс',
        mon: 'Дс',
        tue: 'Сс',
        wed: 'Ср',
        thu: 'Бс',
        fri: 'Жм',
        sat: 'Сб'
      }
    },
    // Автоматтық толтыру
    autocomplete: {
      loading: 'Жүктелуде...',
      placeholder: 'Енгізіңіз',
      noData: 'Деректер жоқ',
      noMatch: 'Сәйкес деректер жоқ'
    },
    // Кері санау
    countdown: {
      days: 'күн',
      hours: 'сағат',
      minutes: 'минут',
      seconds: 'секунд',
      milliseconds: 'миллисекунд',
      finished: 'Аяқталды'
    },
    // Каскад
    cascader: {
      noMatch: 'Сәйкес деректер жоқ',
      placeholder: 'Таңдау',
      loading: 'Жүктелуде...',
      noData: 'Деректер жоқ'
    },
    // Ауыстыру
    transfer: {
      noMatch: 'Сәйкес деректер жоқ',
      noData: 'Деректер жоқ',
      titles: ['Тізім 1', 'Тізім 2'],
      filterPlaceholder: 'Кілт сөзді енгізіңіз',
      noCheckedFormat: '{total} элемент',
      hasCheckedFormat: '{checked}/{total} таңдалды',
      searchPlaceholder: 'Кілт сөзді енгізіңіз'
    },
    // Кесте
    table: {
      emptyText: 'Деректер жоқ',
      confirmFilter: 'Растау',
      resetFilter: 'Қалпына келтіру',
      clearFilter: 'Барлығы',
      sumText: 'Қосынды',
      loading: 'Жүктелуде...',
      index: 'Индекс',
      print: 'Басып шығару',
      cancel: 'Болдырмау',
      preview: 'Басып шығару алдын ала қарау',
      printTime: 'Басып шығару уақыты',
      total: 'Барлығы {total} элемент',
      page: 'Бет {page}',
      yes: 'Иә',
      no: 'Жоқ',
      // Құралдар панелі
      toolbar: {
        refresh: 'Жаңарту',
        density: 'Тығыздық',
        densityDefault: 'Әдепкі',
        densityLarge: 'Үлкен',
        densitySmall: 'Кіші',
        columnSetting: 'Бағана параметрлері',
        fullscreen: 'Толық экран',
        exitFullscreen: 'Толық экраннан шығу',
        export: 'Экспорттау',
        import: 'Импорттау',
        search: 'Іздеу',
        searchPlaceholder: 'Іздеу үшін кілт сөздерді енгізіңіз'
      },
      // Сүзгі
      filter: {
        selectAll: 'Барлығын таңдау',
        selectInvert: 'Таңдауды кері қайтару',
        empty: 'Бос',
        notEmpty: 'Бос емес',
        contains: 'Қамтиды',
        notContains: 'Қамтымайды',
        equals: 'Тең',
        notEquals: 'Тең емес',
        startsWith: 'Басталады',
        endsWith: 'Аяқталады',
        greaterThan: 'Үлкен',
        lessThan: 'Кіші',
        between: 'Арасында'
      },
      // Сұрыптау
      sort: {
        asc: 'Өсу',
        desc: 'Кему',
        clear: 'Сұрыптауды тазалау'
      },
      // Экспорттау
      export: {
        title: 'Деректерді экспорттау',
        filename: 'Файл атауы',
        type: 'Файл түрі',
        scope: 'Экспорттау ауқымы',
        scopeAll: 'Барлық деректер',
        scopeSelected: 'Таңдалған деректер',
        scopeCurrentPage: 'Ағымдағы бет',
        includeHeader: 'Тақырыпты қосу',
        exporting: 'Экспортталуда...',
        success: 'Экспорттау сәтті',
        error: 'Экспорттау сәтсіз'
      },
      // Импорттау
      import: {
        title: 'Деректерді импорттау',
        selectFile: 'Файлды таңдау',
        dragTip: 'Жүктеу үшін файлды басыңыз немесе сүйреңіз',
        importing: 'Импортталуда...',
        success: 'Импорттау сәтті',
        error: 'Импорттау сәтсіз',
        preview: 'Деректерді алдын ала қарау',
        confirm: 'Импорттауды растау'
      },
      // Басып шығару
      printConfig: {
        title: 'Басып шығару параметрлері',
        pageTitle: 'Бет тақырыбы',
        pageHeader: 'Тақырып',
        pageFooter: 'Төменгі жақ',
        printAll: 'Барлығын басып шығару',
        printSelected: 'Таңдалғанды басып шығару',
        printCurrentPage: 'Ағымдағы бетті басып шығару',
        landscape: 'Көлденең',
        portrait: 'Тік',
        printing: 'Басып шығаруда...'
      },
      // Бағана параметрлері
      columnSetting: {
        title: 'Бағана параметрлері',
        showAll: 'Барлығын көрсету',
        hideAll: 'Барлығын жасыру',
        reset: 'Қалпына келтіру',
        fixedLeft: 'Солға бекіту',
        fixedRight: 'Оңға бекіту',
        unfixed: 'Босату'
      },
      // Контекст мәзірі
      contextMenu: {
        copy: 'Көшіру',
        copyRow: 'Жолды көшіру',
        copyCell: 'Ұяшықты көшіру',
        paste: 'Қою',
        insertRowAbove: 'Жоғары жол қосу',
        insertRowBelow: 'Төмен жол қосу',
        deleteRow: 'Жолды жою',
        deleteSelectedRows: 'Таңдалған жолдарды жою',
        exportSelected: 'Таңдалғанды экспорттау'
      },
      // Таңдау
      selection: {
        selectAll: 'Барлығын таңдау',
        selectInvert: 'Таңдауды кері қайтару',
        selectNone: 'Таңдауды тазалау',
        selected: '{count} элемент таңдалды'
      },
      // Кеңейту
      expand: {
        expandAll: 'Барлығын кеңейту',
        collapseAll: 'Барлығын жию'
      },
      // Ағаш
      tree: {
        expandAll: 'Барлығын кеңейту',
        collapseAll: 'Барлығын жию',
        expandLevel: '{level} деңгейге дейін кеңейту'
      },
      // Сүйреу
      drag: {
        dragTip: 'Қайта реттеу үшін сүйреңіз',
        dropTip: 'Орналастыру үшін тастаңыз'
      }
    },
    // Хабарлама қорабы
    messagebox: {
      title: 'Хабарлама',
      confirm: 'Жарайды',
      cancel: 'Болдырмау',
      close: 'Жабу',
      error: 'Жарамсыз енгізу',
      alert: 'Ескерту',
      prompt: 'Сұрау',
      inputPlaceholder: 'Енгізіңіз'
    },
    // Жүктеу
    upload: {
      deleteTip: 'жою үшін delete басыңыз',
      delete: 'Жою',
      preview: 'Алдын ала қарау',
      continue: 'Жалғастыру',
      upload: 'Жүктеу үшін басыңыз',
      tip: '<em>Жүктеу</em> үшін файлды осы аймаққа басыңыз немесе сүйреңіз',
      dragTip: 'Файлды осы жерге тастаңыз немесе жүктеу үшін басыңыз',
      uploading: 'Жүктелуде...',
      success: 'Жүктеу сәтті',
      error: 'Жүктеу сәтсіз',
      retry: 'Қайта байқау',
      cancel: 'Жүктеуді болдырмау',
      fileTypeError: 'Файл түрі қолдау көрсетілмейді',
      fileSizeError: 'Файл өлшемі шектен асып кетті',
      fileCountError: 'Файл саны шектен асып кетті'
    },
    // Форма
    form: {
      validationFailed: 'Тексеру сәтсіз',
      required: 'Міндетті',
      pleaseInput: 'Енгізіңіз',
      pleaseSelect: 'Таңдаңыз'
    },
    // Батырма
    button: {
      loading: 'Жүктелуде...'
    },
    // Енгізу
    input: {
      placeholder: 'Енгізіңіз',
      clear: 'Тазалау',
      showPassword: 'Құпия сөзді көрсету',
      hidePassword: 'Құпия сөзді жасыру',
      copy: 'Көшіру',
      copied: 'Көшірілді'
    },
    // Сан енгізу
    inputnumber: {
      placeholder: 'Сан енгізіңіз',
      increase: 'Арттыру',
      decrease: 'Азайту'
    },
    // Тег енгізу
    inputtag: {
      placeholder: 'Енгізіңіз',
      add: 'Қосу',
      remove: 'Жою'
    },
    // Навигация жолы
    breadcrumb: {
      label: 'Навигация жолы',
      more: 'Көбірек'
    },
    // Жоғарыға оралу
    backtop: {
      text: 'Жоғарыға оралу'
    },
    // Таңдау
    select: {
      placeholder: 'Таңдаңыз',
      noData: 'Деректер жоқ',
      loading: 'Жүктелуде...',
      noMatch: 'Сәйкес деректер жоқ',
      selectAll: 'Барлығын таңдау',
      clearAll: 'Барлығын тазалау'
    },
    // Беттеме
    pagination: {
      goto: 'Бару',
      page: '',
      total: 'Барлығы {total}',
      pageSize: '/бет',
      prev: 'Алдыңғы',
      next: 'Келесі',
      first: 'Бірінші',
      last: 'Соңғы',
      pageClassifier: ''
    },
    // Растау popup
    popconfirm: {
      confirm: 'Жарайды',
      cancel: 'Болдырмау',
      dontAskAgain: 'Қайта сұрамаңыз'
    },
    // Диалог
    dialog: {
      confirm: 'Жарайды',
      cancel: 'Болдырмау',
      close: 'Жабу',
      maximize: 'Максималдау',
      restore: 'Қалпына келтіру'
    },
    // Сүйретпе
    drawer: {
      close: 'Жабу',
      confirm: 'Жарайды',
      cancel: 'Болдырмау'
    },
    // Төмендегі мәзір
    dropdown: {
      loading: 'Жүктелуде...'
    },
    // Сурет
    image: {
      error: 'СӘТСІЗ',
      loading: 'Жүктелуде...',
      preview: 'Алдын ала қарау',
      zoomIn: 'Үлкейту',
      zoomOut: 'Кішірейту',
      rotateLeft: 'Солға бұру',
      rotateRight: 'Оңға бұру',
      originalSize: 'Бастапқы өлшем',
      fullscreen: 'Толық экран'
    },
    // Сурет көруші
    imageviewer: {
      close: 'Жабу',
      prev: 'Алдыңғы',
      next: 'Келесі',
      zoomIn: 'Үлкейту',
      zoomOut: 'Кішірейту',
      rotateLeft: 'Солға бұру',
      rotateRight: 'Оңға бұру',
      reset: 'Қалпына келтіру',
      fullscreen: 'Толық экран',
      exitFullscreen: 'Толық экраннан шығу'
    },
    // Шексіз айналдыру
    infinitescroll: {
      loading: 'Жүктелуде...',
      finished: 'Деректер жоқ',
      error: 'Жүктеу сәтсіз, қайта байқау үшін басыңыз',
      retry: 'Қайта байқау үшін басыңыз'
    },
    // Хабарлама
    message: {
      close: 'Жабу'
    },
    // Хабарландыру
    notification: {
      close: 'Жабу'
    },
    // Жүктеу
    loading: {
      text: 'Жүктелуде...'
    },
    // Айналдыру
    spin: {
      text: 'Жүктелуде...'
    },
    // Бағалау
    rate: {
      texts: ['Өте нашар', 'Күйінген', 'Орташа', 'Қанағаттанған', 'Таңғалған']
    },
    // Ескерту
    alert: {
      close: 'Жабу'
    },
    // Тег
    tag: {
      close: 'Жабу'
    },
    // Қоймалар
    tabs: {
      close: 'Жабу',
      add: 'Қосу',
      more: 'Көбірек'
    },
    // Қадамдар
    steps: {
      finish: 'Аяқталды',
      process: 'Жалғасуда',
      wait: 'Күтуде',
      error: 'Қате'
    },
    // Прогресс
    progress: {
      success: 'Сәтті',
      exception: 'Ерекшелік',
      warning: 'Ескерту'
    },
    // Скелет
    skeleton: {
      loading: 'Жүктелуде...'
    },
    // Бос
    empty: {
      description: 'Деректер жоқ',
      noData: 'Деректер жоқ',
      noResult: 'Нәтижелер жоқ',
      networkError: 'Желі қатесі',
      serverError: 'Сервер қатесі'
    },
    // Нәтиже
    result: {
      success: 'Сәтті',
      error: 'Қате',
      warning: 'Ескерту',
      info: 'Ақпарат',
      backHome: 'Басты бетке оралу'
    },
    // Су ағынды
    waterfall: {
      loading: 'Жүктелуде...',
      noMore: 'Деректер жоқ',
      empty: 'Деректер жоқ'
    },
    // Сипаттамалар
    descriptions: {
      colon: ':'
    },
    // Слайдер
    slider: {
      tipFormatter: '{value}'
    },
    // Ауыстырғыш
    switch: {
      on: 'ҚОСУЛЫ',
      off: 'ӨШІРУЛІ'
    },
    // Белгілеу қорабы
    checkbox: {
      selectAll: 'Барлығын таңдау'
    },
    // Радио
    radio: {},
    // Мәзір
    menu: {
      collapse: 'Мәзірді жию',
      expand: 'Мәзірді кеңейту'
    },
    // Карта
    card: {
      collapse: 'Жию',
      expand: 'Кеңейту'
    },
    // Жию
    collapse: {
      expand: 'Кеңейту',
      collapse: 'Жию'
    },
    // Кеңес
    tooltip: {},
    // Popover
    popover: {},
    // Белгі
    badge: {},
    // Аватар
    avatar: {
      error: 'Жүктеу сәтсіз'
    },
    // Су белгісі
    watermark: {},
    // Бөлгіш
    divider: {},
    // Карусель
    carousel: {
      prev: 'Алдыңғы',
      next: 'Келесі'
    },
    // Marquee
    marquee: {},
    // Бекіту
    affix: {},
    // Якорь
    anchor: {}
  }
}

export default kk
