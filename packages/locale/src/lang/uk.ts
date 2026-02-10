import type { Language } from '../index'

export const uk: Language = {
  name: 'uk',
  yh: {
    // Загальні
    common: {
      yes: 'Так',
      no: 'Ні',
      confirm: 'Підтвердити',
      cancel: 'Скасувати',
      loading: 'Завантаження',
      close: 'Закрити',
      clear: 'Очистити',
      reset: 'Скинути',
      save: 'Зберегти',
      delete: 'Видалити',
      edit: 'Редагувати',
      add: 'Додати',
      search: 'Пошук',
      refresh: 'Оновити',
      expand: 'Розгорнути',
      collapse: 'Згорнути',
      more: 'Ще',
      noData: 'Немає даних',
      noMatch: 'Немає збігів',
      selectAll: 'Вибрати все',
      unselectAll: 'Зняти виділення'
    },
    // Вибір кольору
    colorpicker: {
      confirm: 'OK',
      clear: 'Очистити',
      eyeDropper: 'Піпетка',
      suggestionDark: 'Білий текст краще',
      suggestionLight: 'Чорний текст краще',
      recentColors: 'Останні кольори',
      presetColors: 'Попередньо встановлені кольори'
    },
    // Вибір дати
    datepicker: {
      now: 'Зараз',
      today: 'Сьогодні',
      cancel: 'Скасувати',
      clear: 'Очистити',
      confirm: 'OK',
      selectDate: 'Виберіть дату',
      selectTime: 'Виберіть час',
      startDate: 'Дата початку',
      startTime: 'Час початку',
      endDate: 'Дата закінчення',
      endTime: 'Час закінчення',
      year: '',
      month: '',
      day: '',
      week: 'Тиждень',
      monthBeforeYear: true,
      prevYear: 'Попередній рік',
      nextYear: 'Наступний рік',
      prevMonth: 'Попередній місяць',
      nextMonth: 'Наступний місяць',
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
        jan: 'Січ',
        feb: 'Лют',
        mar: 'Бер',
        apr: 'Кві',
        may: 'Тра',
        jun: 'Чер',
        jul: 'Лип',
        aug: 'Сер',
        sep: 'Вер',
        oct: 'Жов',
        nov: 'Лис',
        dec: 'Гру'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Вибір часу
    timepicker: {
      confirm: 'OK',
      cancel: 'Скасувати',
      now: 'Зараз',
      placeholder: 'Виберіть час',
      startPlaceholder: 'Час початку',
      endPlaceholder: 'Час закінчення',
      selectTime: 'Виберіть час'
    },
    // Вибір часу
    timeselect: {
      placeholder: 'Виберіть час'
    },
    // Дерево
    tree: {
      emptyText: 'Немає даних',
      loading: 'Завантаження...',
      checkAll: 'Вибрати все',
      uncheckAll: 'Зняти виділення',
      expandAll: 'Розгорнути все',
      collapseAll: 'Згорнути все'
    },
    // Вибір дерева
    treeselect: {
      placeholder: 'Виберіть',
      emptyText: 'Немає даних',
      loading: 'Завантаження...',
      noMatch: 'Немає збігів'
    },
    // Календар
    calendar: {
      prevMonth: 'Попередній місяць',
      nextMonth: 'Наступний місяць',
      prevYear: 'Попередній рік',
      nextYear: 'Наступний рік',
      today: 'Сьогодні',
      week: 'Тиждень',
      holiday: 'Вихідний',
      workday: 'Робочий',
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
    // Автодоповнення
    autocomplete: {
      loading: 'Завантаження...',
      placeholder: 'Будь ласка, введіть',
      noData: 'Немає даних',
      noMatch: 'Немає збігів'
    },
    // Зворотний відлік
    countdown: {
      days: 'днів',
      hours: 'годин',
      minutes: 'хвилин',
      seconds: 'секунд',
      milliseconds: 'мілісекунд',
      finished: 'Завершено'
    },
    // Каскадний вибір
    cascader: {
      noMatch: 'Немає збігів',
      placeholder: 'Виберіть',
      loading: 'Завантаження...',
      noData: 'Немає даних'
    },
    // Передача
    transfer: {
      noMatch: 'Немає збігів',
      noData: 'Немає даних',
      titles: ['Список 1', 'Список 2'],
      filterPlaceholder: 'Введіть ключове слово',
      noCheckedFormat: '{total} елементів',
      hasCheckedFormat: '{checked}/{total} вибрано',
      searchPlaceholder: 'Введіть ключове слово'
    },
    // Таблиця
    table: {
      emptyText: 'Немає даних',
      confirmFilter: 'Підтвердити',
      resetFilter: 'Скинути',
      clearFilter: 'Все',
      sumText: 'Сума',
      loading: 'Завантаження...',
      index: 'Індекс',
      print: 'Друк',
      cancel: 'Скасувати',
      preview: 'Попередній перегляд друку',
      printTime: 'Час друку',
      total: 'Всього {total} елементів',
      page: 'Сторінка {page}',
      yes: 'Так',
      no: 'Ні',
      // Панель інструментів
      toolbar: {
        refresh: 'Оновити',
        density: 'Щільність',
        densityDefault: 'За замовчуванням',
        densityLarge: 'Велика',
        densitySmall: 'Мала',
        columnSetting: 'Налаштування стовпців',
        fullscreen: 'Повноекранний режим',
        exitFullscreen: 'Вийти з повноекранного режиму',
        export: 'Експорт',
        import: 'Імпорт',
        search: 'Пошук',
        searchPlaceholder: 'Введіть ключові слова для пошуку'
      },
      // Фільтр
      filter: {
        selectAll: 'Вибрати все',
        selectInvert: 'Інвертувати вибір',
        empty: 'Порожньо',
        notEmpty: 'Не порожньо',
        contains: 'Містить',
        notContains: 'Не містить',
        equals: 'Дорівнює',
        notEquals: 'Не дорівнює',
        startsWith: 'Починається з',
        endsWith: 'Закінчується на',
        greaterThan: 'Більше ніж',
        lessThan: 'Менше ніж',
        between: 'Між'
      },
      // Сортування
      sort: {
        asc: 'За зростанням',
        desc: 'За спаданням',
        clear: 'Очистити сортування'
      },
      // Експорт
      export: {
        title: 'Експорт даних',
        filename: 'Ім\'я файлу',
        type: 'Тип файлу',
        scope: 'Область експорту',
        scopeAll: 'Всі дані',
        scopeSelected: 'Вибрані дані',
        scopeCurrentPage: 'Поточна сторінка',
        includeHeader: 'Включити заголовок',
        exporting: 'Експорт...',
        success: 'Експорт успішний',
        error: 'Помилка експорту'
      },
      // Імпорт
      import: {
        title: 'Імпорт даних',
        selectFile: 'Виберіть файл',
        dragTip: 'Натисніть або перетягніть файл сюди для завантаження',
        importing: 'Імпорт...',
        success: 'Імпорт успішний',
        error: 'Помилка імпорту',
        preview: 'Попередній перегляд даних',
        confirm: 'Підтвердити імпорт'
      },
      // Друк
      printConfig: {
        title: 'Налаштування друку',
        pageTitle: 'Заголовок сторінки',
        pageHeader: 'Заголовок',
        pageFooter: 'Нижній колонтитул',
        printAll: 'Друк усіх',
        printSelected: 'Друк вибраних',
        printCurrentPage: 'Друк поточної сторінки',
        landscape: 'Альбомна',
        portrait: 'Книжна',
        printing: 'Друк...'
      },
      // Налаштування стовпців
      columnSetting: {
        title: 'Налаштування стовпців',
        showAll: 'Показати все',
        hideAll: 'Приховати все',
        reset: 'Скинути',
        fixedLeft: 'Закріпити зліва',
        fixedRight: 'Закріпити справа',
        unfixed: 'Відкріпити'
      },
      // Контекстне меню
      contextMenu: {
        copy: 'Копіювати',
        copyRow: 'Копіювати рядок',
        copyCell: 'Копіювати комірку',
        paste: 'Вставити',
        insertRowAbove: 'Вставити рядок вище',
        insertRowBelow: 'Вставити рядок нижче',
        deleteRow: 'Видалити рядок',
        deleteSelectedRows: 'Видалити вибрані рядки',
        exportSelected: 'Експортувати вибране'
      },
      // Вибір
      selection: {
        selectAll: 'Вибрати все',
        selectInvert: 'Інвертувати вибір',
        selectNone: 'Очистити вибір',
        selected: 'Вибрано {count} елементів'
      },
      // Розгорнути
      expand: {
        expandAll: 'Розгорнути все',
        collapseAll: 'Згорнути все'
      },
      // Дерево
      tree: {
        expandAll: 'Розгорнути все',
        collapseAll: 'Згорнути все',
        expandLevel: 'Розгорнути до рівня {level}'
      },
      // Перетягування
      drag: {
        dragTip: 'Перетягніть для зміни порядку',
        dropTip: 'Відпустіть для розміщення'
      }
    },
    // Вікно повідомлення
    messagebox: {
      title: 'Повідомлення',
      confirm: 'OK',
      cancel: 'Скасувати',
      close: 'Закрити',
      error: 'Недопустимий ввід',
      alert: 'Попередження',
      prompt: 'Підказка',
      inputPlaceholder: 'Будь ласка, введіть'
    },
    // Завантаження
    upload: {
      deleteTip: 'натисніть delete для видалення',
      delete: 'Видалити',
      preview: 'Попередній перегляд',
      continue: 'Продовжити',
      upload: 'Натисніть для завантаження',
      tip: 'Натисніть або перетягніть файл у цю область для <em>завантаження</em>',
      dragTip: 'Перетягніть файл сюди або натисніть для завантаження',
      uploading: 'Завантаження...',
      success: 'Завантаження успішне',
      error: 'Помилка завантаження',
      retry: 'Повторити',
      cancel: 'Скасувати завантаження',
      fileTypeError: 'Тип файлу не підтримується',
      fileSizeError: 'Розмір файлу перевищує ліміт',
      fileCountError: 'Кількість файлів перевищує ліміт'
    },
    // Форма
    form: {
      validationFailed: 'Перевірка не пройдена',
      required: 'Обов\'язково',
      pleaseInput: 'Будь ласка, введіть',
      pleaseSelect: 'Будь ласка, виберіть'
    },
    // Кнопка
    button: {
      loading: 'Завантаження...'
    },
    // Введення
    input: {
      placeholder: 'Будь ласка, введіть',
      clear: 'Очистити',
      showPassword: 'Показати пароль',
      hidePassword: 'Приховати пароль',
      copy: 'Копіювати',
      copied: 'Скопійовано'
    },
    // Числове введення
    inputnumber: {
      placeholder: 'Будь ласка, введіть число',
      increase: 'Збільшити',
      decrease: 'Зменшити'
    },
    // Введення тегів
    inputtag: {
      placeholder: 'Будь ласка, введіть',
      add: 'Додати',
      remove: 'Видалити'
    },
    // Хлібні крихти
    breadcrumb: {
      label: 'Хлібні крихти',
      more: 'Ще'
    },
    // Повернутися наверх
    backtop: {
      text: 'Повернутися наверх'
    },
    // Вибір
    select: {
      placeholder: 'Будь ласка, виберіть',
      noData: 'Немає даних',
      loading: 'Завантаження...',
      noMatch: 'Немає збігів',
      selectAll: 'Вибрати все',
      clearAll: 'Очистити все'
    },
    // Пагінація
    pagination: {
      goto: 'Перейти',
      page: '',
      total: 'Всього {total}',
      pageSize: '/сторінка',
      prev: 'Попередня',
      next: 'Наступна',
      first: 'Перша',
      last: 'Остання',
      pageClassifier: ''
    },
    // Підтвердження спливаючого вікна
    popconfirm: {
      confirm: 'OK',
      cancel: 'Скасувати',
      dontAskAgain: 'Більше не питати'
    },
    // Діалог
    dialog: {
      confirm: 'OK',
      cancel: 'Скасувати',
      close: 'Закрити',
      maximize: 'Розгорнути',
      restore: 'Відновити'
    },
    // Ящик
    drawer: {
      close: 'Закрити',
      confirm: 'OK',
      cancel: 'Скасувати'
    },
    // Випадаюче меню
    dropdown: {
      loading: 'Завантаження...'
    },
    // Зображення
    image: {
      error: 'ПОМИЛКА',
      loading: 'Завантаження...',
      preview: 'Попередній перегляд',
      zoomIn: 'Збільшити',
      zoomOut: 'Зменшити',
      rotateLeft: 'Повернути вліво',
      rotateRight: 'Повернути вправо',
      originalSize: 'Оригінальний розмір',
      fullscreen: 'Повноекранний режим'
    },
    // Переглядач зображень
    imageviewer: {
      close: 'Закрити',
      prev: 'Попереднє',
      next: 'Наступне',
      zoomIn: 'Збільшити',
      zoomOut: 'Зменшити',
      rotateLeft: 'Повернути вліво',
      rotateRight: 'Повернути вправо',
      reset: 'Скинути',
      fullscreen: 'Повноекранний режим',
      exitFullscreen: 'Вийти з повноекранного режиму'
    },
    // Нескінченне прокручування
    infinitescroll: {
      loading: 'Завантаження...',
      finished: 'Більше немає даних',
      error: 'Помилка завантаження, натисніть для повтору',
      retry: 'Натисніть для повтору'
    },
    // Повідомлення
    message: {
      close: 'Закрити'
    },
    // Сповіщення
    notification: {
      close: 'Закрити'
    },
    // Завантаження
    loading: {
      text: 'Завантаження...'
    },
    // Спиннер
    spin: {
      text: 'Завантаження...'
    },
    // Рейтинг
    rate: {
      texts: ['Дуже погано', 'Розчарований', 'Нормально', 'Задоволений', 'Здивований']
    },
    // Попередження
    alert: {
      close: 'Закрити'
    },
    // Тег
    tag: {
      close: 'Закрити'
    },
    // Вкладки
    tabs: {
      close: 'Закрити',
      add: 'Додати',
      more: 'Ще'
    },
    // Кроки
    steps: {
      finish: 'Завершено',
      process: 'В процесі',
      wait: 'Очікування',
      error: 'Помилка'
    },
    // Прогрес
    progress: {
      success: 'Успіх',
      exception: 'Виняток',
      warning: 'Попередження'
    },
    // Скелетон
    skeleton: {
      loading: 'Завантаження...'
    },
    // Порожньо
    empty: {
      description: 'Немає даних',
      noData: 'Немає даних',
      noResult: 'Немає результатів',
      networkError: 'Помилка мережі',
      serverError: 'Помилка сервера'
    },
    // Результат
    result: {
      success: 'Успіх',
      error: 'Помилка',
      warning: 'Попередження',
      info: 'Інформація',
      backHome: 'Повернутися на головну'
    },
    // Водоспад
    waterfall: {
      loading: 'Завантаження...',
      noMore: 'Більше немає даних',
      empty: 'Немає даних'
    },
    // Опис
    descriptions: {
      colon: ':'
    },
    // Слайдер
    slider: {
      tipFormatter: '{value}'
    },
    // Перемикач
    switch: {
      on: 'ВКЛ',
      off: 'ВИКЛ'
    },
    // Чекбокс
    checkbox: {
      selectAll: 'Вибрати все'
    },
    // Радіо
    radio: {},
    // Меню
    menu: {
      collapse: 'Згорнути меню',
      expand: 'Розгорнути меню'
    },
    // Картка
    card: {
      collapse: 'Згорнути',
      expand: 'Розгорнути'
    },
    // Згорнути
    collapse: {
      expand: 'Розгорнути',
      collapse: 'Згорнути'
    },
    // Підказка
    tooltip: {},
    // Спливаюче вікно
    popover: {},
    // Значок
    badge: {},
    // Аватар
    avatar: {
      error: 'Помилка завантаження'
    },
    // Водяний знак
    watermark: {},
    // Роздільник
    divider: {},
    // Карусель
    carousel: {
      prev: 'Попереднє',
      next: 'Наступне'
    },
    // Бігучий рядок
    marquee: {},
    // Закріплення
    affix: {},
    // Якір
    anchor: {}
  }
}

export default uk
