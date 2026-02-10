import type { Language } from '../index'

export const ru: Language = {
  name: 'ru',
  yh: {
    // Общие
    common: {
      yes: 'Да',
      no: 'Нет',
      confirm: 'Подтвердить',
      cancel: 'Отмена',
      loading: 'Загрузка',
      close: 'Закрыть',
      clear: 'Очистить',
      reset: 'Сбросить',
      save: 'Сохранить',
      delete: 'Удалить',
      edit: 'Редактировать',
      add: 'Добавить',
      search: 'Поиск',
      refresh: 'Обновить',
      expand: 'Развернуть',
      collapse: 'Свернуть',
      more: 'Еще',
      noData: 'Нет данных',
      noMatch: 'Нет совпадений',
      selectAll: 'Выбрать все',
      unselectAll: 'Снять выделение'
    },
    // Выбор цвета
    colorpicker: {
      confirm: 'OK',
      clear: 'Очистить',
      eyeDropper: 'Пипетка',
      suggestionDark: 'Белый текст лучше',
      suggestionLight: 'Черный текст лучше',
      recentColors: 'Недавние цвета',
      presetColors: 'Предустановленные цвета'
    },
    // Выбор даты
    datepicker: {
      now: 'Сейчас',
      today: 'Сегодня',
      cancel: 'Отмена',
      clear: 'Очистить',
      confirm: 'OK',
      selectDate: 'Выберите дату',
      selectTime: 'Выберите время',
      startDate: 'Дата начала',
      startTime: 'Время начала',
      endDate: 'Дата окончания',
      endTime: 'Время окончания',
      year: '',
      month: '',
      day: '',
      week: 'Неделя',
      monthBeforeYear: true,
      prevYear: 'Предыдущий год',
      nextYear: 'Следующий год',
      prevMonth: 'Предыдущий месяц',
      nextMonth: 'Следующий месяц',
      weeks: {
        sun: 'Вс',
        mon: 'Пн',
        tue: 'Вт',
        wed: 'Ср',
        thu: 'Чт',
        fri: 'Пт',
        sat: 'Сб'
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
    // Выбор времени
    timepicker: {
      confirm: 'OK',
      cancel: 'Отмена',
      now: 'Сейчас',
      placeholder: 'Выберите время',
      startPlaceholder: 'Время начала',
      endPlaceholder: 'Время окончания',
      selectTime: 'Выберите время'
    },
    // Выбор времени
    timeselect: {
      placeholder: 'Выберите время'
    },
    // Дерево
    tree: {
      emptyText: 'Нет данных',
      loading: 'Загрузка...',
      checkAll: 'Выбрать все',
      uncheckAll: 'Снять выделение',
      expandAll: 'Развернуть все',
      collapseAll: 'Свернуть все'
    },
    // Выбор дерева
    treeselect: {
      placeholder: 'Выберите',
      emptyText: 'Нет данных',
      loading: 'Загрузка...',
      noMatch: 'Нет совпадений'
    },
    // Календарь
    calendar: {
      prevMonth: 'Предыдущий месяц',
      nextMonth: 'Следующий месяц',
      prevYear: 'Предыдущий год',
      nextYear: 'Следующий год',
      today: 'Сегодня',
      week: 'Неделя',
      holiday: 'Выходной',
      workday: 'Рабочий',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Вс',
        mon: 'Пн',
        tue: 'Вт',
        wed: 'Ср',
        thu: 'Чт',
        fri: 'Пт',
        sat: 'Сб'
      }
    },
    // Автозавершение
    autocomplete: {
      loading: 'Загрузка...',
      placeholder: 'Пожалуйста, введите',
      noData: 'Нет данных',
      noMatch: 'Нет совпадений'
    },
    // Обратный отсчет
    countdown: {
      days: 'дней',
      hours: 'часов',
      minutes: 'минут',
      seconds: 'секунд',
      milliseconds: 'миллисекунд',
      finished: 'Завершено'
    },
    // Каскадный выбор
    cascader: {
      noMatch: 'Нет совпадений',
      placeholder: 'Выберите',
      loading: 'Загрузка...',
      noData: 'Нет данных'
    },
    // Передача
    transfer: {
      noMatch: 'Нет совпадений',
      noData: 'Нет данных',
      titles: ['Список 1', 'Список 2'],
      filterPlaceholder: 'Введите ключевое слово',
      noCheckedFormat: '{total} элементов',
      hasCheckedFormat: '{checked}/{total} выбрано',
      searchPlaceholder: 'Введите ключевое слово'
    },
    // Таблица
    table: {
      emptyText: 'Нет данных',
      confirmFilter: 'Подтвердить',
      resetFilter: 'Сбросить',
      clearFilter: 'Все',
      sumText: 'Сумма',
      loading: 'Загрузка...',
      index: 'Индекс',
      print: 'Печать',
      cancel: 'Отмена',
      preview: 'Предпросмотр печати',
      printTime: 'Время печати',
      total: 'Всего {total} элементов',
      page: 'Страница {page}',
      yes: 'Да',
      no: 'Нет',
      // Панель инструментов
      toolbar: {
        refresh: 'Обновить',
        density: 'Плотность',
        densityDefault: 'По умолчанию',
        densityLarge: 'Большая',
        densitySmall: 'Маленькая',
        columnSetting: 'Настройки столбцов',
        fullscreen: 'Полный экран',
        exitFullscreen: 'Выйти из полноэкранного режима',
        export: 'Экспорт',
        import: 'Импорт',
        search: 'Поиск',
        searchPlaceholder: 'Введите ключевые слова для поиска'
      },
      // Фильтр
      filter: {
        selectAll: 'Выбрать все',
        selectInvert: 'Инвертировать выбор',
        empty: 'Пусто',
        notEmpty: 'Не пусто',
        contains: 'Содержит',
        notContains: 'Не содержит',
        equals: 'Равно',
        notEquals: 'Не равно',
        startsWith: 'Начинается с',
        endsWith: 'Заканчивается на',
        greaterThan: 'Больше чем',
        lessThan: 'Меньше чем',
        between: 'Между'
      },
      // Сортировка
      sort: {
        asc: 'По возрастанию',
        desc: 'По убыванию',
        clear: 'Очистить сортировку'
      },
      // Экспорт
      export: {
        title: 'Экспорт данных',
        filename: 'Имя файла',
        type: 'Тип файла',
        scope: 'Область экспорта',
        scopeAll: 'Все данные',
        scopeSelected: 'Выбранные данные',
        scopeCurrentPage: 'Текущая страница',
        includeHeader: 'Включить заголовок',
        exporting: 'Экспорт...',
        success: 'Экспорт успешен',
        error: 'Ошибка экспорта'
      },
      // Импорт
      import: {
        title: 'Импорт данных',
        selectFile: 'Выберите файл',
        dragTip: 'Нажмите или перетащите файл сюда для загрузки',
        importing: 'Импорт...',
        success: 'Импорт успешен',
        error: 'Ошибка импорта',
        preview: 'Предпросмотр данных',
        confirm: 'Подтвердить импорт'
      },
      // Печать
      printConfig: {
        title: 'Настройки печати',
        pageTitle: 'Заголовок страницы',
        pageHeader: 'Заголовок',
        pageFooter: 'Нижний колонтитул',
        printAll: 'Печать всех',
        printSelected: 'Печать выбранных',
        printCurrentPage: 'Печать текущей страницы',
        landscape: 'Альбомная',
        portrait: 'Книжная',
        printing: 'Печать...'
      },
      // Настройки столбцов
      columnSetting: {
        title: 'Настройки столбцов',
        showAll: 'Показать все',
        hideAll: 'Скрыть все',
        reset: 'Сбросить',
        fixedLeft: 'Закрепить слева',
        fixedRight: 'Закрепить справа',
        unfixed: 'Открепить'
      },
      // Контекстное меню
      contextMenu: {
        copy: 'Копировать',
        copyRow: 'Копировать строку',
        copyCell: 'Копировать ячейку',
        paste: 'Вставить',
        insertRowAbove: 'Вставить строку выше',
        insertRowBelow: 'Вставить строку ниже',
        deleteRow: 'Удалить строку',
        deleteSelectedRows: 'Удалить выбранные строки',
        exportSelected: 'Экспортировать выбранное'
      },
      // Выбор
      selection: {
        selectAll: 'Выбрать все',
        selectInvert: 'Инвертировать выбор',
        selectNone: 'Очистить выбор',
        selected: 'Выбрано {count} элементов'
      },
      // Развернуть
      expand: {
        expandAll: 'Развернуть все',
        collapseAll: 'Свернуть все'
      },
      // Дерево
      tree: {
        expandAll: 'Развернуть все',
        collapseAll: 'Свернуть все',
        expandLevel: 'Развернуть до уровня {level}'
      },
      // Перетаскивание
      drag: {
        dragTip: 'Перетащите для изменения порядка',
        dropTip: 'Отпустите для размещения'
      }
    },
    // Окно сообщения
    messagebox: {
      title: 'Сообщение',
      confirm: 'OK',
      cancel: 'Отмена',
      close: 'Закрыть',
      error: 'Недопустимый ввод',
      alert: 'Предупреждение',
      prompt: 'Подсказка',
      inputPlaceholder: 'Пожалуйста, введите'
    },
    // Загрузка
    upload: {
      deleteTip: 'нажмите delete для удаления',
      delete: 'Удалить',
      preview: 'Предпросмотр',
      continue: 'Продолжить',
      upload: 'Нажмите для загрузки',
      tip: 'Нажмите или перетащите файл в эту область для <em>загрузки</em>',
      dragTip: 'Перетащите файл сюда или нажмите для загрузки',
      uploading: 'Загрузка...',
      success: 'Загрузка успешна',
      error: 'Ошибка загрузки',
      retry: 'Повторить',
      cancel: 'Отменить загрузку',
      fileTypeError: 'Тип файла не поддерживается',
      fileSizeError: 'Размер файла превышает лимит',
      fileCountError: 'Количество файлов превышает лимит'
    },
    // Форма
    form: {
      validationFailed: 'Проверка не пройдена',
      required: 'Обязательно',
      pleaseInput: 'Пожалуйста, введите',
      pleaseSelect: 'Пожалуйста, выберите'
    },
    // Кнопка
    button: {
      loading: 'Загрузка...'
    },
    // Ввод
    input: {
      placeholder: 'Пожалуйста, введите',
      clear: 'Очистить',
      showPassword: 'Показать пароль',
      hidePassword: 'Скрыть пароль',
      copy: 'Копировать',
      copied: 'Скопировано'
    },
    // Числовой ввод
    inputnumber: {
      placeholder: 'Пожалуйста, введите число',
      increase: 'Увеличить',
      decrease: 'Уменьшить'
    },
    // Ввод тегов
    inputtag: {
      placeholder: 'Пожалуйста, введите',
      add: 'Добавить',
      remove: 'Удалить'
    },
    // Хлебные крошки
    breadcrumb: {
      label: 'Хлебные крошки',
      more: 'Еще'
    },
    // Вернуться наверх
    backtop: {
      text: 'Вернуться наверх'
    },
    // Выбор
    select: {
      placeholder: 'Пожалуйста, выберите',
      noData: 'Нет данных',
      loading: 'Загрузка...',
      noMatch: 'Нет совпадений',
      selectAll: 'Выбрать все',
      clearAll: 'Очистить все'
    },
    // Пагинация
    pagination: {
      goto: 'Перейти',
      page: '',
      total: 'Всего {total}',
      pageSize: '/страница',
      prev: 'Предыдущая',
      next: 'Следующая',
      first: 'Первая',
      last: 'Последняя',
      pageClassifier: ''
    },
    // Подтверждение всплывающего окна
    popconfirm: {
      confirm: 'OK',
      cancel: 'Отмена',
      dontAskAgain: 'Больше не спрашивать'
    },
    // Диалог
    dialog: {
      confirm: 'OK',
      cancel: 'Отмена',
      close: 'Закрыть',
      maximize: 'Развернуть',
      restore: 'Восстановить'
    },
    // Ящик
    drawer: {
      close: 'Закрыть',
      confirm: 'OK',
      cancel: 'Отмена'
    },
    // Выпадающее меню
    dropdown: {
      loading: 'Загрузка...'
    },
    // Изображение
    image: {
      error: 'ОШИБКА',
      loading: 'Загрузка...',
      preview: 'Предпросмотр',
      zoomIn: 'Увеличить',
      zoomOut: 'Уменьшить',
      rotateLeft: 'Повернуть влево',
      rotateRight: 'Повернуть вправо',
      originalSize: 'Оригинальный размер',
      fullscreen: 'Полный экран'
    },
    // Просмотр изображений
    imageviewer: {
      close: 'Закрыть',
      prev: 'Предыдущее',
      next: 'Следующее',
      zoomIn: 'Увеличить',
      zoomOut: 'Уменьшить',
      rotateLeft: 'Повернуть влево',
      rotateRight: 'Повернуть вправо',
      reset: 'Сбросить',
      fullscreen: 'Полный экран',
      exitFullscreen: 'Выйти из полноэкранного режима'
    },
    // Бесконечная прокрутка
    infinitescroll: {
      loading: 'Загрузка...',
      finished: 'Больше нет данных',
      error: 'Ошибка загрузки, нажмите для повтора',
      retry: 'Нажмите для повтора'
    },
    // Сообщение
    message: {
      close: 'Закрыть'
    },
    // Уведомление
    notification: {
      close: 'Закрыть'
    },
    // Загрузка
    loading: {
      text: 'Загрузка...'
    },
    // Спиннер
    spin: {
      text: 'Загрузка...'
    },
    // Рейтинг
    rate: {
      texts: ['Очень плохо', 'Разочарован', 'Нормально', 'Доволен', 'Удивлен']
    },
    // Предупреждение
    alert: {
      close: 'Закрыть'
    },
    // Тег
    tag: {
      close: 'Закрыть'
    },
    // Вкладки
    tabs: {
      close: 'Закрыть',
      add: 'Добавить',
      more: 'Еще'
    },
    // Шаги
    steps: {
      finish: 'Завершено',
      process: 'В процессе',
      wait: 'Ожидание',
      error: 'Ошибка'
    },
    // Прогресс
    progress: {
      success: 'Успех',
      exception: 'Исключение',
      warning: 'Предупреждение'
    },
    // Скелетон
    skeleton: {
      loading: 'Загрузка...'
    },
    // Пусто
    empty: {
      description: 'Нет данных',
      noData: 'Нет данных',
      noResult: 'Нет результатов',
      networkError: 'Ошибка сети',
      serverError: 'Ошибка сервера'
    },
    // Результат
    result: {
      success: 'Успех',
      error: 'Ошибка',
      warning: 'Предупреждение',
      info: 'Информация',
      backHome: 'Вернуться на главную'
    },
    // Водопад
    waterfall: {
      loading: 'Загрузка...',
      noMore: 'Больше нет данных',
      empty: 'Нет данных'
    },
    // Описания
    descriptions: {
      colon: ':'
    },
    // Слайдер
    slider: {
      tipFormatter: '{value}'
    },
    // Переключатель
    switch: {
      on: 'ВКЛ',
      off: 'ВЫКЛ'
    },
    // Чекбокс
    checkbox: {
      selectAll: 'Выбрать все'
    },
    // Радио
    radio: {},
    // Меню
    menu: {
      collapse: 'Свернуть меню',
      expand: 'Развернуть меню'
    },
    // Карточка
    card: {
      collapse: 'Свернуть',
      expand: 'Развернуть'
    },
    // Свернуть
    collapse: {
      expand: 'Развернуть',
      collapse: 'Свернуть'
    },
    // Подсказка
    tooltip: {},
    // Всплывающее окно
    popover: {},
    // Значок
    badge: {},
    // Аватар
    avatar: {
      error: 'Ошибка загрузки'
    },
    // Водяной знак
    watermark: {},
    // Разделитель
    divider: {},
    // Карусель
    carousel: {
      prev: 'Предыдущее',
      next: 'Следующее'
    },
    // Бегущая строка
    marquee: {},
    // Закрепление
    affix: {},
    // Якорь
    anchor: {}
  }
}

export default ru
