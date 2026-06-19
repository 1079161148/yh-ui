import type { Language } from '../index'

export const bg: Language = {
  name: 'bg',
  yh: {
    common: {
      yes: 'Да',
      no: 'Не',
      confirm: 'Потвърди',
      cancel: 'Отказ',
      loading: 'Зареждане',
      close: 'Затвори',
      clear: 'Изчисти',
      reset: 'Нулиране',
      save: 'Запази',
      delete: 'Изтрий',
      edit: 'Редактирай',
      add: 'Добави',
      search: 'Търсене',
      refresh: 'Обнови',
      expand: 'Разгъни',
      collapse: 'Свий',
      more: 'Още',
      noData: 'Няма данни',
      noMatch: 'Няма съвпадение',
      selectAll: 'Избери всички',
      unselectAll: 'Премахни избора'
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Изчисти',
      eyeDropper: 'Пипета',
      suggestionDark: 'Бял текст е по-добър',
      suggestionLight: 'Черен текст е по-добър',
      recentColors: 'Последни цветове',
      presetColors: 'Предварително зададени цветове'
    },
    datepicker: {
      now: 'Сега',
      today: 'Днес',
      cancel: 'Отказ',
      clear: 'Изчисти',
      confirm: 'OK',
      selectDate: 'Изберете дата',
      selectTime: 'Изберете час',
      startDate: 'Начална дата',
      startTime: 'Начален час',
      endDate: 'Крайна дата',
      endTime: 'Краен час',
      year: '',
      month: '',
      day: '',
      week: 'Седмица',
      monthBeforeYear: true,
      prevYear: 'Предходна година',
      nextYear: 'Следваща година',
      prevMonth: 'Предходен месец',
      nextMonth: 'Следващ месец',
      weeks: {
        sun: 'Нд',
        mon: 'Пн',
        tue: 'Вт',
        wed: 'Ср',
        thu: 'Чт',
        fri: 'Пт',
        sat: 'Сб'
      },
      months: {
        jan: 'Яну',
        feb: 'Фев',
        mar: 'Мар',
        apr: 'Апр',
        may: 'Май',
        jun: 'Юни',
        jul: 'Юли',
        aug: 'Авг',
        sep: 'Сеп',
        oct: 'Окт',
        nov: 'Ное',
        dec: 'Дек'
      },
      quarters: {
        q1: 'Т1',
        q2: 'Т2',
        q3: 'Т3',
        q4: 'Т4'
      }
    },
    timepicker: {
      confirm: 'OK',
      cancel: 'Отказ',
      now: 'Сега',
      placeholder: 'Изберете час',
      startPlaceholder: 'Начален час',
      endPlaceholder: 'Краен час',
      selectTime: 'Изберете час'
    },
    timeselect: {
      placeholder: 'Изберете час'
    },
    tree: {
      emptyText: 'Няма данни',
      loading: 'Зареждане...',
      checkAll: 'Избери всички',
      uncheckAll: 'Премахни избора',
      expandAll: 'Разгъни всички',
      collapseAll: 'Свий всички'
    },
    treeselect: {
      placeholder: 'Изберете',
      emptyText: 'Няма данни',
      loading: 'Зареждане...',
      noMatch: 'Няма съвпадение'
    },
    calendar: {
      prevMonth: 'Предходен месец',
      nextMonth: 'Следващ месец',
      prevYear: 'Предходна година',
      nextYear: 'Следваща година',
      today: 'Днес',
      week: 'Седмица',
      holiday: 'Празник',
      workday: 'Работен',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Нд',
        mon: 'Пн',
        tue: 'Вт',
        wed: 'Ср',
        thu: 'Чт',
        fri: 'Пт',
        sat: 'Сб'
      }
    },
    autocomplete: {
      loading: 'Зареждане...',
      placeholder: 'Моля, въведете',
      noData: 'Няма данни',
      noMatch: 'Няма съвпадение'
    },
    countdown: {
      days: 'дни',
      hours: 'часа',
      minutes: 'минути',
      seconds: 'секунди',
      milliseconds: 'милисекунди',
      finished: 'Завършено'
    },
    cascader: {
      noMatch: 'Няма съвпадение',
      placeholder: 'Изберете',
      loading: 'Зареждане...',
      noData: 'Няма данни'
    },
    transfer: {
      noMatch: 'Няма съвпадение',
      noData: 'Няма данни',
      titles: ['Списък 1', 'Списък 2'],
      filterPlaceholder: 'Въведете ключова дума',
      noCheckedFormat: '{total} елемента',
      hasCheckedFormat: '{checked}/{total} избрани',
      searchPlaceholder: 'Въведете ключова дума'
    },
    table: {
      emptyText: 'Няма данни',
      confirmFilter: 'Потвърди',
      resetFilter: 'Нулиране',
      clearFilter: 'Всички',
      sumText: 'Сума',
      loading: 'Зареждане...',
      index: 'Индекс',
      print: 'Печат',
      cancel: 'Отказ',
      preview: 'Преглед преди печат',
      printTime: 'Време на печат',
      total: 'Общо {total} елемента',
      page: 'Страница {page}',
      yes: 'Да',
      no: 'Не',
      toolbar: {
        refresh: 'Обнови',
        density: 'Плътност',
        densityDefault: 'По подразбиране',
        densityLarge: 'Голяма',
        densitySmall: 'Малка',
        columnSetting: 'Настройки на колони',
        fullscreen: 'Цял екран',
        exitFullscreen: 'Изход от цял екран',
        export: 'Експорт',
        import: 'Импорт',
        search: 'Търсене',
        searchPlaceholder: 'Въведете ключови думи за търсене'
      },
      filter: {
        selectAll: 'Избери всички',
        selectInvert: 'Обърни избора',
        empty: 'Празно',
        notEmpty: 'Не е празно',
        contains: 'Съдържа',
        notContains: 'Не съдържа',
        equals: 'Равно на',
        notEquals: 'Не е равно на',
        startsWith: 'Започва с',
        endsWith: 'Завършва с',
        greaterThan: 'По-голямо от',
        lessThan: 'По-малко от',
        between: 'Между'
      },
      sort: {
        asc: 'Възходящо',
        desc: 'Низходящо',
        clear: 'Изчисти сортирането'
      },
      export: {
        title: 'Експорт на данни',
        filename: 'Име на файл',
        type: 'Тип файл',
        scope: 'Обхват на експорта',
        scopeAll: 'Всички данни',
        scopeSelected: 'Избрани данни',
        scopeCurrentPage: 'Текуща страница',
        includeHeader: 'Включи заглавие',
        exporting: 'Експортиране...',
        success: 'Експортът е успешен',
        error: 'Грешка при експорт'
      },
      import: {
        title: 'Импорт на данни',
        selectFile: 'Изберете файл',
        dragTip: 'Щракнете или плъзнете файл тук за качване',
        importing: 'Импортиране...',
        success: 'Импортът е успешен',
        error: 'Грешка при импорт',
        preview: 'Преглед на данни',
        confirm: 'Потвърдете импорта'
      },
      printConfig: {
        title: 'Настройки за печат',
        pageTitle: 'Заглавие на страница',
        pageHeader: 'Горен колонтитул',
        pageFooter: 'Долен колонтитул',
        printAll: 'Печат на всички',
        printSelected: 'Печат на избрани',
        printCurrentPage: 'Печат на текуща страница',
        landscape: 'Пейзаж',
        portrait: 'Портрет',
        printing: 'Печатане...'
      },
      columnSetting: {
        title: 'Настройки на колони',
        showAll: 'Покажи всички',
        hideAll: 'Скрий всички',
        reset: 'Нулиране',
        fixedLeft: 'Фиксирай вляво',
        fixedRight: 'Фиксирай вдясно',
        unfixed: 'Премахни фиксиране'
      },
      contextMenu: {
        copy: 'Копирай',
        copyRow: 'Копирай ред',
        copyCell: 'Копирай клетка',
        paste: 'Постави',
        insertRowAbove: 'Вмъкни ред отгоре',
        insertRowBelow: 'Вмъкни ред отдолу',
        deleteRow: 'Изтрий ред',
        deleteSelectedRows: 'Изтрий избрани редове',
        exportSelected: 'Експортирай избраното'
      },
      selection: {
        selectAll: 'Избери всички',
        selectInvert: 'Обърни избора',
        selectNone: 'Изчисти избора',
        selected: '{count} елемента избрани'
      },
      expand: {
        expandAll: 'Разгъни всички',
        collapseAll: 'Свий всички'
      },
      tree: {
        expandAll: 'Разгъни всички',
        collapseAll: 'Свий всички',
        expandLevel: 'Разгъни до ниво {level}'
      },
      drag: {
        dragTip: 'Плъзнете за пренареждане',
        dropTip: 'Пуснете за поставяне'
      }
    },
    messagebox: {
      title: 'Съобщение',
      confirm: 'OK',
      cancel: 'Отказ',
      close: 'Затвори',
      error: 'Невалиден вход',
      alert: 'Предупреждение',
      prompt: 'Подсказка',
      inputPlaceholder: 'Моля, въведете'
    },
    upload: {
      deleteTip: 'натиснете delete за изтриване',
      delete: 'Изтрий',
      preview: 'Преглед',
      continue: 'Продължи',
      upload: 'Щракнете за качване',
      tip: 'Щракнете или плъзнете файл в тази област за <em>качване</em>',
      dragTip: 'Плъзнете файл тук или щракнете за качване',
      uploading: 'Качване...',
      success: 'Качването е успешно',
      error: 'Грешка при качване',
      retry: 'Опитай отново',
      cancel: 'Отмени качването',
      fileTypeError: 'Типът файл не се поддържа',
      fileSizeError: 'Размерът на файла надвишава лимита',
      fileCountError: 'Броят файлове надвишава лимита'
    },
    form: {
      validationFailed: 'Валидацията е неуспешна',
      required: 'Задължително',
      pleaseInput: 'Моля, въведете',
      pleaseSelect: 'Моля, изберете'
    },
    button: {
      loading: 'Зареждане...'
    },
    input: {
      placeholder: 'Моля, въведете',
      clear: 'Изчисти',
      showPassword: 'Покажи парола',
      hidePassword: 'Скрий парола',
      copy: 'Копирай',
      copied: 'Копирано'
    },
    inputnumber: {
      placeholder: 'Моля, въведете число',
      increase: 'Увеличи',
      decrease: 'Намали'
    },
    inputtag: {
      placeholder: 'Моля, въведете',
      add: 'Добави',
      remove: 'Премахни'
    },
    breadcrumb: {
      label: 'Навигационна пътека',
      more: 'Още'
    },
    backtop: {
      text: 'Обратно нагоре'
    },
    select: {
      placeholder: 'Моля, изберете',
      noData: 'Няма данни',
      loading: 'Зареждане...',
      noMatch: 'Няма съвпадение',
      selectAll: 'Избери всички',
      clearAll: 'Изчисти всички'
    },
    pagination: {
      goto: 'Отиди на',
      page: '',
      total: 'Общо {total}',
      pageSize: '/страница',
      prev: 'Предишна',
      next: 'Следваща',
      first: 'Първа',
      last: 'Последна',
      pageClassifier: ''
    },
    popconfirm: {
      confirm: 'OK',
      cancel: 'Отказ',
      dontAskAgain: 'Не питай отново'
    },
    dialog: {
      confirm: 'OK',
      cancel: 'Отказ',
      close: 'Затвори',
      maximize: 'Увеличи',
      restore: 'Възстанови'
    },
    drawer: {
      close: 'Затвори',
      confirm: 'OK',
      cancel: 'Отказ'
    },
    dropdown: {
      loading: 'Зареждане...'
    },
    image: {
      error: 'ГРЕШКА',
      loading: 'Зареждане...',
      preview: 'Преглед',
      zoomIn: 'Увеличи',
      zoomOut: 'Намали',
      rotateLeft: 'Завърти наляво',
      rotateRight: 'Завърти надясно',
      originalSize: 'Оригинален размер',
      fullscreen: 'Цял екран'
    },
    imageviewer: {
      close: 'Затвори',
      prev: 'Предишно',
      next: 'Следващо',
      zoomIn: 'Увеличи',
      zoomOut: 'Намали',
      rotateLeft: 'Завърти наляво',
      rotateRight: 'Завърти надясно',
      reset: 'Нулиране',
      fullscreen: 'Цял екран',
      exitFullscreen: 'Изход от цял екран'
    },
    infinitescroll: {
      loading: 'Зареждане...',
      finished: 'Няма повече данни',
      error: 'Грешка при зареждане, щракнете за повторен опит',
      retry: 'Щракнете за повторен опит'
    },
    message: {
      close: 'Затвори'
    },
    notification: {
      close: 'Затвори'
    },
    loading: {
      text: 'Зареждане...'
    },
    spin: {
      text: 'Зареждане...'
    },
    rate: {
      texts: ['Много лошо', 'Разочарован', 'Добре', 'Доволен', 'Изненадан']
    },
    alert: {
      close: 'Затвори'
    },
    tag: {
      close: 'Затвори'
    },
    tabs: {
      close: 'Затвори',
      add: 'Добави',
      more: 'Още'
    },
    steps: {
      finish: 'Завършено',
      process: 'В процес',
      wait: 'Изчакване',
      error: 'Грешка'
    },
    progress: {
      success: 'Успех',
      exception: 'Изключение',
      warning: 'Предупреждение'
    },
    skeleton: {
      loading: 'Зареждане...'
    },
    empty: {
      description: 'Няма данни',
      noData: 'Няма данни',
      noResult: 'Няма резултати',
      networkError: 'Мрежова грешка',
      serverError: 'Сървърна грешка'
    },
    result: {
      success: 'Успех',
      error: 'Грешка',
      warning: 'Предупреждение',
      info: 'Информация',
      backHome: 'Обратно към началото'
    },
    waterfall: {
      loading: 'Зареждане...',
      noMore: 'Няма повече данни',
      empty: 'Няма данни'
    },
    descriptions: {
      colon: ':'
    },
    slider: {
      tipFormatter: '{value}'
    },
    switch: {
      on: 'ВКЛ',
      off: 'ИЗКЛ'
    },
    checkbox: {
      selectAll: 'Избери всички'
    },
    radio: {},
    menu: {
      collapse: 'Свий менюто',
      expand: 'Разгъни менюто'
    },
    card: {
      collapse: 'Свий',
      expand: 'Разгъни'
    },
    collapse: {
      expand: 'Разгъни',
      collapse: 'Свий'
    },
    tooltip: {},
    popover: {},
    badge: {},
    avatar: {
      error: 'Грешка при зареждане'
    },
    watermark: {},
    divider: {},
    carousel: {
      prev: 'Предишно',
      next: 'Следващо'
    },
    marquee: {},
    affix: {},
    flow: {
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      fitView: 'Fit View',
      lock: 'Toggle Interactivity'
    },
    anchor: {},
    mention: {
      placeholder: 'Моля, въведете',
      loading: 'Зареждане...',
      noData: 'Няма данни'
    },
    skuselector: {
      placeholder: 'Изберете спецификации',
      emptyText: 'Няма спецификации',
      stock: 'Наличност',
      price: 'Цена',
      selected: 'Избрано',
      outOfStock: 'Няма в наличност'
    },
    productcard: {
      viewDetails: 'Виж детайли',
      buyNow: 'Купи сега',
      addToCart: 'Добави в количката',
      sold: 'Продадено',
      soldOut: 'Изчерпано',
      vip: 'VIP'
    },
    price: {
      original: 'Оригинална цена'
    },
    couponcard: {
      available: 'Вземи сега',
      used: 'Използвано',
      expired: 'Изтекло',
      received: 'Получено',
      limit: 'Поръчки над {threshold}',
      noThreshold: 'Без минимален праг',
      validPeriod: 'Период на валидност',
      ruleTitle: 'Правила за използване'
    },
    luckydraw: {
      start: 'Старт',
      drawing: 'Теглене...',
      end: 'Победител!',
      retry: 'Опитай отново'
    },
    filterbar: {
      all: 'Всички',
      sort: 'Сортиране',
      filter: 'Филтър',
      cancel: 'Отказ',
      reset: 'Нулирай',
      confirm: 'Потвърди',
      noOptions: 'Няма опции',
      asc: 'Възходящо',
      desc: 'Низходящо',
      selected: 'Избрано'
    },
    submitbar: {
      total: 'Общо: ',
      selected: 'Избрани: {count}',
      submit: 'Към плащане',
      allSelect: 'Избери всички'
    },
    categorynav: {
      all: 'Всички',
      noData: 'Няма данни',
      loading: 'Зареждане...'
    },
    smartaddress: {
      placeholder:
        'Поставете адреса тук, за да разпознаете автоматично име, телефон и местоположение',
      parse: 'Умен анализ',
      province: 'Област/Град/Район',
      city: 'Град',
      district: 'Район/Окръг',
      street: 'Улица/Населено място',
      detail: 'Подробен адрес',
      phone: 'Телефон',
      name: 'Получател',
      parseSuccess: 'Адресът е анализиран успешно',
      parseFailed: 'Анализът е неуспешен, попълнете ръчно',
      required: 'Моля, въведете пълен адрес',
      provinceKeywords: ['Област', 'Щат'],
      cityKeywords: ['Град', 'Община'],
      districtKeywords: ['Район', 'Окръг', 'Квартал'],
      streetKeywords: ['Улица', 'Булевард', 'Път', 'Алея']
    },
    ganttchart: {
      taskName: 'Име на задача',
      searchPlaceholder: 'Търсене на задачи...',
      zoom: 'Мащаб',
      day: 'Ден',
      week: 'Седмица',
      month: 'Месец',
      year: 'Година',
      milestone: 'Етап'
    },
    imagemagnifier: {
      switchToImage: 'Превключи към изображение {index}',
      galleryItem: 'Галерия {index}',
      close: 'Затвори'
    },
    ai: {
      bubble: {
        citations: 'Цитати'
      },
      mention: {
        placeholder: '@ Споменаване на Агент, Документ или Таблица...',
        agent: 'Агент',
        document: 'Документ',
        table: 'Таблица',
        knowledge: 'Знание',
        file: 'File'
      },
      codeBlock: {
        copyCode: 'Копирай кода',
        copied: 'Копирано!',
        run: 'Стартирай кода',
        edit: 'Редактирай',
        save: 'Запази',
        cancel: 'Отмени'
      },
      codeRunner: {
        run: 'Стартирай',
        stop: 'Спри',
        clear: 'Изчисти',
        reset: 'Нулирай',
        placeholder: 'Кликнете Стартирайте, за да изпълните кода...'
      },
      sender: {
        placeholder: 'Изпратете съобщение...',
        dragTip: 'Пуснете, за да качите файлове',
        noCommands: 'No matching commands found'
      },
      thoughtChain: {
        thoughtProcess: 'Процес на мислене',
        thinking: 'Мисли...',
        defaultTitle: 'Нова стъпка',
        addNode: 'Добави стъпка'
      },
      thinking: {
        start: 'Започни да мислиш',
        thinking: 'Мисли...',
        complete: 'Мисленето приключи',
        error: 'Грешка в мисленето'
      },
      welcome: {
        title: 'Здравейте, аз съм YH AI',
        description:
          'Мога да ви помогна с програмиране, превод на документи или креативно писане. Какво мога да направя за вас днес?'
      },
      action: {
        copy: 'Копирай',
        regenerate: 'Регенерирай',
        share: 'Сподели',
        like: 'Харесвам',
        dislike: 'Не харесвам',
        edit: 'Редактирай',
        delete: 'Изтрий'
      },
      artifacts: {
        preview: 'Преглед',
        inline: 'Вграден',
        code: 'Изходен код',
        versions: 'Версии',
        rendering: 'Рендериране на компонента...',
        renderingChart: 'Рендериране на диаграмата...',
        renderingCanvas: 'Подготовка на платното...',
        chartLoadError: 'Chart loading failed'
      },
      voice: {
        trigger: 'Кликнете, за да говорите',
        listening: 'Слуша...'
      },
      agent: {
        uses: 'използвания',
        use: 'Използвай сега',
        favorite: 'Любим',
        unfavorite: 'Премахни от любими',
        share: 'Сподели',
        online: 'Онлайн',
        offline: 'Офлайн',
        busy: 'Зает',
        verified: 'Проверен',
        rating: 'Рейтинг',
        reviews: 'отзива',
        responseTime: 'Средно време за отговор',
        ms: 'мс'
      },
      sources: {
        references: 'Препратки',
        referencedSources: 'Цитирани източници',
        relevant: 'Релевантност',
        viewOriginal: 'Виж оригинала',
        showAll: 'Покажи всички',
        more: 'още източници',
        drawerTitle: 'Препратки',
        expandMore: 'Покажи още',
        collapseMore: 'Свий',
        noSources: 'Няма източници',
        today: 'Днес',
        last7Days: 'Последните 7 дни',
        last30Days: 'Последните 30 дни',
        earlier: 'По-рано',
        pinned: 'Закачено'
      },
      conversations: {
        today: 'Днес',
        last7Days: 'Последните 7 дни',
        last30Days: 'Последните 30 дни',
        earlier: 'По-рано',
        pinned: 'Закачено',
        pin: 'Закачи',
        unpin: 'Разкачи',
        newConversation: 'Нов разговор',
        noData: 'Все още няма разговори',
        rename: 'Преименувай',
        delete: 'Изтрий',
        deleteConfirm: 'Потвърдете изтриването на този разговор?'
      },
      attachments: {
        dropTip: 'Пуснете файловете тук за качване',
        clickToUpload: 'Щракнете или плъзнете файлове за качване',
        uploadSuccess: 'Качването е успешно',
        uploadError: 'Качването е неуспешно',
        deleteConfirm: 'Сигурни ли сте, че искате да изтриете този файл?',
        fileTooLarge: 'Размерът на файла не може да надвишава {size}',
        invalidFileType: 'Невалиден тип файл'
      },
      mermaid: {
        image: 'Изображение',
        code: 'Код',
        zoomIn: 'Увеличи',
        zoomOut: 'Намали',
        reset: 'Нулирай',
        download: 'Изтегли',
        copyCode: 'Копирай кода',
        rendering: 'Визуализиране...',
        renderError: 'Визуализацията е неуспешна',
        renderSuccess: 'Визуализацията е успешна',
        retry: 'Опитай отново'
      }
    }
  }
}

export default bg
