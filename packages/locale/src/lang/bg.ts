import type { Language } from '../index'

export const bg: Language = {
  name: 'bg',
  yh: {
    // Общи
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
    // Избор на цвят
    colorpicker: {
      confirm: 'OK',
      clear: 'Изчисти',
      eyeDropper: 'Пипета',
      suggestionDark: 'Бял текст е по-добър',
      suggestionLight: 'Черен текст е по-добър',
      recentColors: 'Последни цветове',
      presetColors: 'Предварително зададени цветове'
    },
    // Избор на дата
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
    // Избор на час
    timepicker: {
      confirm: 'OK',
      cancel: 'Отказ',
      now: 'Сега',
      placeholder: 'Изберете час',
      startPlaceholder: 'Начален час',
      endPlaceholder: 'Краен час',
      selectTime: 'Изберете час'
    },
    // Избор на време
    timeselect: {
      placeholder: 'Изберете час'
    },
    // Дърво
    tree: {
      emptyText: 'Няма данни',
      loading: 'Зареждане...',
      checkAll: 'Избери всички',
      uncheckAll: 'Премахни избора',
      expandAll: 'Разгъни всички',
      collapseAll: 'Свий всички'
    },
    // Избор на дърво
    treeselect: {
      placeholder: 'Изберете',
      emptyText: 'Няма данни',
      loading: 'Зареждане...',
      noMatch: 'Няма съвпадение'
    },
    // Календар
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
    // Автоматично довършване
    autocomplete: {
      loading: 'Зареждане...',
      placeholder: 'Моля, въведете',
      noData: 'Няма данни',
      noMatch: 'Няма съвпадение'
    },
    // Обратно броене
    countdown: {
      days: 'дни',
      hours: 'часа',
      minutes: 'минути',
      seconds: 'секунди',
      milliseconds: 'милисекунди',
      finished: 'Завършено'
    },
    // Каскаден избор
    cascader: {
      noMatch: 'Няма съвпадение',
      placeholder: 'Изберете',
      loading: 'Зареждане...',
      noData: 'Няма данни'
    },
    // Трансфер
    transfer: {
      noMatch: 'Няма съвпадение',
      noData: 'Няма данни',
      titles: ['Списък 1', 'Списък 2'],
      filterPlaceholder: 'Въведете ключова дума',
      noCheckedFormat: '{total} елемента',
      hasCheckedFormat: '{checked}/{total} избрани',
      searchPlaceholder: 'Въведете ключова дума'
    },
    // Таблица
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
      // Лента с инструменти
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
      // Филтър
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
      // Сортиране
      sort: {
        asc: 'Възходящо',
        desc: 'Низходящо',
        clear: 'Изчисти сортирането'
      },
      // Експорт
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
      // Импорт
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
      // Печат
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
      // Настройки на колони
      columnSetting: {
        title: 'Настройки на колони',
        showAll: 'Покажи всички',
        hideAll: 'Скрий всички',
        reset: 'Нулиране',
        fixedLeft: 'Фиксирай вляво',
        fixedRight: 'Фиксирай вдясно',
        unfixed: 'Премахни фиксиране'
      },
      // Контекстно меню
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
      // Избор
      selection: {
        selectAll: 'Избери всички',
        selectInvert: 'Обърни избора',
        selectNone: 'Изчисти избора',
        selected: '{count} елемента избрани'
      },
      // Разгъване
      expand: {
        expandAll: 'Разгъни всички',
        collapseAll: 'Свий всички'
      },
      // Дърво
      tree: {
        expandAll: 'Разгъни всички',
        collapseAll: 'Свий всички',
        expandLevel: 'Разгъни до ниво {level}'
      },
      // Плъзгане
      drag: {
        dragTip: 'Плъзнете за пренареждане',
        dropTip: 'Пуснете за поставяне'
      }
    },
    // Прозорец за съобщение
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
    // Качване
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
    // Формуляр
    form: {
      validationFailed: 'Валидацията е неуспешна',
      required: 'Задължително',
      pleaseInput: 'Моля, въведете',
      pleaseSelect: 'Моля, изберете'
    },
    // Бутон
    button: {
      loading: 'Зареждане...'
    },
    // Вход
    input: {
      placeholder: 'Моля, въведете',
      clear: 'Изчисти',
      showPassword: 'Покажи парола',
      hidePassword: 'Скрий парола',
      copy: 'Копирай',
      copied: 'Копирано'
    },
    // Числов вход
    inputnumber: {
      placeholder: 'Моля, въведете число',
      increase: 'Увеличи',
      decrease: 'Намали'
    },
    // Вход за тагове
    inputtag: {
      placeholder: 'Моля, въведете',
      add: 'Добави',
      remove: 'Премахни'
    },
    // Навигационна пътека
    breadcrumb: {
      label: 'Навигационна пътека',
      more: 'Още'
    },
    // Обратно нагоре
    backtop: {
      text: 'Обратно нагоре'
    },
    // Избор
    select: {
      placeholder: 'Моля, изберете',
      noData: 'Няма данни',
      loading: 'Зареждане...',
      noMatch: 'Няма съвпадение',
      selectAll: 'Избери всички',
      clearAll: 'Изчисти всички'
    },
    // Пагинация
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
    // Потвърждение
    popconfirm: {
      confirm: 'OK',
      cancel: 'Отказ',
      dontAskAgain: 'Не питай отново'
    },
    // Диалог
    dialog: {
      confirm: 'OK',
      cancel: 'Отказ',
      close: 'Затвори',
      maximize: 'Увеличи',
      restore: 'Възстанови'
    },
    // Чекмедже
    drawer: {
      close: 'Затвори',
      confirm: 'OK',
      cancel: 'Отказ'
    },
    // Падащо меню
    dropdown: {
      loading: 'Зареждане...'
    },
    // Изображение
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
    // Преглед на изображения
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
    // Безкрайно превъртане
    infinitescroll: {
      loading: 'Зареждане...',
      finished: 'Няма повече данни',
      error: 'Грешка при зареждане, щракнете за повторен опит',
      retry: 'Щракнете за повторен опит'
    },
    // Съобщение
    message: {
      close: 'Затвори'
    },
    // Известие
    notification: {
      close: 'Затвори'
    },
    // Зареждане
    loading: {
      text: 'Зареждане...'
    },
    // Въртящо се
    spin: {
      text: 'Зареждане...'
    },
    // Оценка
    rate: {
      texts: ['Много лошо', 'Разочарован', 'Добре', 'Доволен', 'Изненадан']
    },
    // Предупреждение
    alert: {
      close: 'Затвори'
    },
    // Таг
    tag: {
      close: 'Затвори'
    },
    // Табове
    tabs: {
      close: 'Затвори',
      add: 'Добави',
      more: 'Още'
    },
    // Стъпки
    steps: {
      finish: 'Завършено',
      process: 'В процес',
      wait: 'Изчакване',
      error: 'Грешка'
    },
    // Прогрес
    progress: {
      success: 'Успех',
      exception: 'Изключение',
      warning: 'Предупреждение'
    },
    // Скелет
    skeleton: {
      loading: 'Зареждане...'
    },
    // Празно
    empty: {
      description: 'Няма данни',
      noData: 'Няма данни',
      noResult: 'Няма резултати',
      networkError: 'Мрежова грешка',
      serverError: 'Сървърна грешка'
    },
    // Резултат
    result: {
      success: 'Успех',
      error: 'Грешка',
      warning: 'Предупреждение',
      info: 'Информация',
      backHome: 'Обратно към началото'
    },
    // Водопад
    waterfall: {
      loading: 'Зареждане...',
      noMore: 'Няма повече данни',
      empty: 'Няма данни'
    },
    // Описания
    descriptions: {
      colon: ':'
    },
    // Плъзгач
    slider: {
      tipFormatter: '{value}'
    },
    // Превключвател
    switch: {
      on: 'ВКЛ',
      off: 'ИЗКЛ'
    },
    // Чекбокс
    checkbox: {
      selectAll: 'Избери всички'
    },
    // Радио
    radio: {},
    // Меню
    menu: {
      collapse: 'Свий менюто',
      expand: 'Разгъни менюто'
    },
    // Карта
    card: {
      collapse: 'Свий',
      expand: 'Разгъни'
    },
    // Свиване
    collapse: {
      expand: 'Разгъни',
      collapse: 'Свий'
    },
    // Подсказка
    tooltip: {},
    // Изскачащ прозорец
    popover: {},
    // Значка
    badge: {},
    // Аватар
    avatar: {
      error: 'Грешка при зареждане'
    },
    // Воден знак
    watermark: {},
    // Разделител
    divider: {},
    // Въртележка
    carousel: {
      prev: 'Предишно',
      next: 'Следващо'
    },
    // Бягащ текст
    marquee: {},
    // Фиксиране
    affix: {},
    // Котва
    anchor: {}
  }
}

export default bg
