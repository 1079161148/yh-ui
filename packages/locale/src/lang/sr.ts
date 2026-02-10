import type { Language } from '../index'

export const sr: Language = {
  name: 'sr',
  yh: {
    // Опште
    common: {
      yes: 'Да',
      no: 'Не',
      confirm: 'Потврди',
      cancel: 'Откажи',
      loading: 'Учитавање',
      close: 'Затвори',
      clear: 'Обриши',
      reset: 'Ресетуј',
      save: 'Сачувај',
      delete: 'Обриши',
      edit: 'Уреди',
      add: 'Додај',
      search: 'Претрага',
      refresh: 'Освежи',
      expand: 'Прошири',
      collapse: 'Скупи',
      more: 'Више',
      noData: 'Нема података',
      noMatch: 'Нема поклапања',
      selectAll: 'Изабери све',
      unselectAll: 'Поништи избор'
    },
    // Биранје боје
    colorpicker: {
      confirm: 'У реду',
      clear: 'Обриши',
      eyeDropper: 'Пипета',
      suggestionDark: 'Бели текст је најбољи',
      suggestionLight: 'Црни текст је најбољи',
      recentColors: 'Недавне боје',
      presetColors: 'Унапред подешене боје'
    },
    // Биранје датума
    datepicker: {
      now: 'Сада',
      today: 'Данас',
      cancel: 'Откажи',
      clear: 'Обриши',
      confirm: 'У реду',
      selectDate: 'Изабери датум',
      selectTime: 'Изабери време',
      startDate: 'Датум почетка',
      startTime: 'Време почетка',
      endDate: 'Датум завршетка',
      endTime: 'Време завршетка',
      year: '',
      month: '',
      day: '',
      week: 'Недеља',
      monthBeforeYear: true,
      prevYear: 'Претходна година',
      nextYear: 'Следећа година',
      prevMonth: 'Претходни месец',
      nextMonth: 'Следећи месец',
      weeks: {
        sun: 'Нед',
        mon: 'Пон',
        tue: 'Уто',
        wed: 'Сре',
        thu: 'Чет',
        fri: 'Пет',
        sat: 'Суб'
      },
      months: {
        jan: 'Јан',
        feb: 'Феб',
        mar: 'Мар',
        apr: 'Апр',
        may: 'Мај',
        jun: 'Јун',
        jul: 'Јул',
        aug: 'Авг',
        sep: 'Сеп',
        oct: 'Окт',
        nov: 'Нов',
        dec: 'Дец'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Биранје времена
    timepicker: {
      confirm: 'У реду',
      cancel: 'Откажи',
      now: 'Сада',
      placeholder: 'Изабери време',
      startPlaceholder: 'Време почетка',
      endPlaceholder: 'Време завршетка',
      selectTime: 'Изабери време'
    },
    // Биранје времена
    timeselect: {
      placeholder: 'Изабери време'
    },
    // Стабло
    tree: {
      emptyText: 'Нема података',
      loading: 'Учитавање...',
      checkAll: 'Изабери све',
      uncheckAll: 'Поништи избор',
      expandAll: 'Прошири све',
      collapseAll: 'Скупи све'
    },
    // Биранје стабла
    treeselect: {
      placeholder: 'Изабери',
      emptyText: 'Нема података',
      loading: 'Учитавање...',
      noMatch: 'Нема поклапања'
    },
    // Календар
    calendar: {
      prevMonth: 'Претходни месец',
      nextMonth: 'Следећи месец',
      prevYear: 'Претходна година',
      nextYear: 'Следећа година',
      today: 'Данас',
      week: 'Недеља',
      holiday: 'Празник',
      workday: 'Рад',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Нед',
        mon: 'Пон',
        tue: 'Уто',
        wed: 'Сре',
        thu: 'Чет',
        fri: 'Пет',
        sat: 'Суб'
      }
    },
    // Аутоматско довршавање
    autocomplete: {
      loading: 'Учитавање...',
      placeholder: 'Молимо унесите',
      noData: 'Нема података',
      noMatch: 'Нема поклапања'
    },
    // Обратно бројање
    countdown: {
      days: 'дана',
      hours: 'сати',
      minutes: 'минута',
      seconds: 'секунди',
      milliseconds: 'милисекунди',
      finished: 'Завршено'
    },
    // Каскадно биранје
    cascader: {
      noMatch: 'Нема поклапања',
      placeholder: 'Изабери',
      loading: 'Учитавање...',
      noData: 'Нема података'
    },
    // Пренос
    transfer: {
      noMatch: 'Нема поклапања',
      noData: 'Нема података',
      titles: ['Листа 1', 'Листа 2'],
      filterPlaceholder: 'Унеси кључну реч',
      noCheckedFormat: '{total} ставки',
      hasCheckedFormat: '{checked}/{total} изабрано',
      searchPlaceholder: 'Унеси кључну реч'
    },
    // Табела
    table: {
      emptyText: 'Нема података',
      confirmFilter: 'Потврди',
      resetFilter: 'Ресетуј',
      clearFilter: 'Све',
      sumText: 'Збир',
      loading: 'Учитавање...',
      index: 'Индекс',
      print: 'Штампај',
      cancel: 'Откажи',
      preview: 'Преглед штампе',
      printTime: 'Време штампе',
      total: 'Укупно {total} ставки',
      page: 'Страна {page}',
      yes: 'Да',
      no: 'Не',
      // Трака са алаткама
      toolbar: {
        refresh: 'Освежи',
        density: 'Густина',
        densityDefault: 'Подразумевано',
        densityLarge: 'Велика',
        densitySmall: 'Мала',
        columnSetting: 'Подешавања колона',
        fullscreen: 'Цео екран',
        exitFullscreen: 'Изађи из целог екрана',
        export: 'Извези',
        import: 'Увези',
        search: 'Претрага',
        searchPlaceholder: 'Унеси кључне речи за претрагу'
      },
      // Филтер
      filter: {
        selectAll: 'Изабери све',
        selectInvert: 'Обрни избор',
        empty: 'Празно',
        notEmpty: 'Није празно',
        contains: 'Садржи',
        notContains: 'Не садржи',
        equals: 'Једнако',
        notEquals: 'Није једнако',
        startsWith: 'Почиње са',
        endsWith: 'Завршава се са',
        greaterThan: 'Веће од',
        lessThan: 'Мање од',
        between: 'Између'
      },
      // Сортирање
      sort: {
        asc: 'Растуће',
        desc: 'Опадајуће',
        clear: 'Обриши сортирање'
      },
      // Извоз
      export: {
        title: 'Извоз података',
        filename: 'Име фајла',
        type: 'Тип фајла',
        scope: 'Опсег извоза',
        scopeAll: 'Сви подаци',
        scopeSelected: 'Изабрани подаци',
        scopeCurrentPage: 'Тренутна страна',
        includeHeader: 'Укључи заглавље',
        exporting: 'Извоз...',
        success: 'Извоз успешан',
        error: 'Извоз неуспешан'
      },
      // Увоз
      import: {
        title: 'Увоз података',
        selectFile: 'Изабери фајл',
        dragTip: 'Кликни или превуци фајл овде за отпремање',
        importing: 'Увоз...',
        success: 'Увоз успешан',
        error: 'Увоз неуспешан',
        preview: 'Преглед података',
        confirm: 'Потврди увоз'
      },
      // Штампа
      printConfig: {
        title: 'Подешавања штампе',
        pageTitle: 'Наслов стране',
        pageHeader: 'Заглавље',
        pageFooter: 'Подножје',
        printAll: 'Штампај све',
        printSelected: 'Штампај изабрано',
        printCurrentPage: 'Штампај тренутну страну',
        landscape: 'Ландшафт',
        portrait: 'Портрет',
        printing: 'Штампање...'
      },
      // Подешавања колона
      columnSetting: {
        title: 'Подешавања колона',
        showAll: 'Прикажи све',
        hideAll: 'Сакриј све',
        reset: 'Ресетуј',
        fixedLeft: 'Фиксирај лево',
        fixedRight: 'Фиксирај десно',
        unfixed: 'Поништи фиксацију'
      },
      // Контекстни мени
      contextMenu: {
        copy: 'Копирај',
        copyRow: 'Копирај ред',
        copyCell: 'Копирај ћелију',
        paste: 'Налепи',
        insertRowAbove: 'Убаци ред изнад',
        insertRowBelow: 'Убаци ред испод',
        deleteRow: 'Обриши ред',
        deleteSelectedRows: 'Обриши изабране редове',
        exportSelected: 'Извези изабрано'
      },
      // Избор
      selection: {
        selectAll: 'Изабери све',
        selectInvert: 'Обрни избор',
        selectNone: 'Обриши избор',
        selected: '{count} ставки изабрано'
      },
      // Проширивање
      expand: {
        expandAll: 'Прошири све',
        collapseAll: 'Скупи све'
      },
      // Стабло
      tree: {
        expandAll: 'Прошири све',
        collapseAll: 'Скупи све',
        expandLevel: 'Прошири до нивоа {level}'
      },
      // Превлачење
      drag: {
        dragTip: 'Превуци за преуређење',
        dropTip: 'Пусти за постављање'
      }
    },
    // Појединачна порука
    messagebox: {
      title: 'Порука',
      confirm: 'У реду',
      cancel: 'Откажи',
      close: 'Затвори',
      error: 'Неважећи унос',
      alert: 'Упозорење',
      prompt: 'Промпт',
      inputPlaceholder: 'Молимо унесите'
    },
    // Отпремање
    upload: {
      deleteTip: 'притисни delete за брисање',
      delete: 'Обриши',
      preview: 'Преглед',
      continue: 'Настави',
      upload: 'Кликни за отпремање',
      tip: 'Кликни или превуци фајл у ову област за <em>отпремање</em>',
      dragTip: 'Пусти фајл овде или кликни за отпремање',
      uploading: 'Отпремање...',
      success: 'Отпремање успешно',
      error: 'Отпремање неуспешно',
      retry: 'Покушај поново',
      cancel: 'Откажи отпремање',
      fileTypeError: 'Тип фајла није подржан',
      fileSizeError: 'Величина фајла прелази лимит',
      fileCountError: 'Број фајлова прелази лимит'
    },
    // Форма
    form: {
      validationFailed: 'Валидација неуспешна',
      required: 'Обавезно',
      pleaseInput: 'Молимо унесите',
      pleaseSelect: 'Молимо изаберите'
    },
    // Дугме
    button: {
      loading: 'Учитавање...'
    },
    // Унос
    input: {
      placeholder: 'Молимо унесите',
      clear: 'Обриши',
      showPassword: 'Прикажи лозинку',
      hidePassword: 'Сакриј лозинку',
      copy: 'Копирај',
      copied: 'Копирано'
    },
    // Унос броја
    inputnumber: {
      placeholder: 'Молимо унесите број',
      increase: 'Повећај',
      decrease: 'Смањи'
    },
    // Унос ознаке
    inputtag: {
      placeholder: 'Молимо унесите',
      add: 'Додај',
      remove: 'Уклони'
    },
    // Бредкрамб
    breadcrumb: {
      label: 'Бредкрамб',
      more: 'Више'
    },
    // Повратак на врх
    backtop: {
      text: 'Повратак на врх'
    },
    // Биранје
    select: {
      placeholder: 'Молимо изаберите',
      noData: 'Нема података',
      loading: 'Учитавање...',
      noMatch: 'Нема поклапања',
      selectAll: 'Изабери све',
      clearAll: 'Обриши све'
    },
    // Страначење
    pagination: {
      goto: 'Иди на',
      page: '',
      total: 'Укупно {total}',
      pageSize: '/страна',
      prev: 'Претходна',
      next: 'Следећа',
      first: 'Прва',
      last: 'Последња',
      pageClassifier: ''
    },
    // Потврда
    popconfirm: {
      confirm: 'У реду',
      cancel: 'Откажи',
      dontAskAgain: 'Не питај поново'
    },
    // Дијалог
    dialog: {
      confirm: 'У реду',
      cancel: 'Откажи',
      close: 'Затвори',
      maximize: 'Максимизуј',
      restore: 'Врати'
    },
    // Фиока
    drawer: {
      close: 'Затвори',
      confirm: 'У реду',
      cancel: 'Откажи'
    },
    // Падајући мени
    dropdown: {
      loading: 'Учитавање...'
    },
    // Слика
    image: {
      error: 'НЕУСПЕШНО',
      loading: 'Учитавање...',
      preview: 'Преглед',
      zoomIn: 'Увећај',
      zoomOut: 'Смањи',
      rotateLeft: 'Ротирај лево',
      rotateRight: 'Ротирај десно',
      originalSize: 'Оригинална величина',
      fullscreen: 'Цео екран'
    },
    // Прегледач слика
    imageviewer: {
      close: 'Затвори',
      prev: 'Претходна',
      next: 'Следећа',
      zoomIn: 'Увећај',
      zoomOut: 'Смањи',
      rotateLeft: 'Ротирај лево',
      rotateRight: 'Ротирај десно',
      reset: 'Ресетуј',
      fullscreen: 'Цео екран',
      exitFullscreen: 'Изађи из целог екрана'
    },
    // Бесконачно скроловање
    infinitescroll: {
      loading: 'Учитавање...',
      finished: 'Нема више података',
      error: 'Учитавање неуспешно, кликни за поновни покушај',
      retry: 'Кликни за поновни покушај'
    },
    // Порука
    message: {
      close: 'Затвори'
    },
    // Обавештење
    notification: {
      close: 'Затвори'
    },
    // Учитавање
    loading: {
      text: 'Учитавање...'
    },
    // Окретање
    spin: {
      text: 'Учитавање...'
    },
    // Оцена
    rate: {
      texts: ['Изузетно лоше', 'Разочаран', 'Добро', 'Задовољан', 'Изненађен']
    },
    // Упозорење
    alert: {
      close: 'Затвори'
    },
    // Ознака
    tag: {
      close: 'Затвори'
    },
    // Табови
    tabs: {
      close: 'Затвори',
      add: 'Додај',
      more: 'Више'
    },
    // Кораци
    steps: {
      finish: 'Завршено',
      process: 'У току',
      wait: 'Чекање',
      error: 'Грешка'
    },
    // Напредовање
    progress: {
      success: 'Успех',
      exception: 'Изузетак',
      warning: 'Упозорење'
    },
    // Скелетон
    skeleton: {
      loading: 'Учитавање...'
    },
    // Празно
    empty: {
      description: 'Нема података',
      noData: 'Нема података',
      noResult: 'Нема резултата',
      networkError: 'Грешка мреже',
      serverError: 'Грешка сервера'
    },
    // Резултат
    result: {
      success: 'Успех',
      error: 'Грешка',
      warning: 'Упозорење',
      info: 'Информација',
      backHome: 'Повратак на почетак'
    },
    // Водопад
    waterfall: {
      loading: 'Учитавање...',
      noMore: 'Нема више података',
      empty: 'Нема података'
    },
    // Описи
    descriptions: {
      colon: ':'
    },
    // Клизач
    slider: {
      tipFormatter: '{value}'
    },
    // Прекидач
    switch: {
      on: 'УКЉ',
      off: 'ИСКЉ'
    },
    // Поље за потврду
    checkbox: {
      selectAll: 'Изабери све'
    },
    // Радио
    radio: {},
    // Мени
    menu: {
      collapse: 'Скупи мени',
      expand: 'Прошири мени'
    },
    // Картица
    card: {
      collapse: 'Скупи',
      expand: 'Прошири'
    },
    // Скупљање
    collapse: {
      expand: 'Прошири',
      collapse: 'Скупи'
    },
    // Савет
    tooltip: {},
    // Поповер
    popover: {},
    // Значка
    badge: {},
    // Аватар
    avatar: {
      error: 'Учитавање неуспешно'
    },
    // Водени жиг
    watermark: {},
    // Раздвајач
    divider: {},
    // Карусел
    carousel: {
      prev: 'Претходна',
      next: 'Следећа'
    },
    // Марки
    marquee: {},
    // Афикс
    affix: {},
    // Сидро
    anchor: {}
  }
}

export default sr
