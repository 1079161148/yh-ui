import type { Language } from '../index'

export const sr: Language = {
  name: 'sr',
  yh: {
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
    colorpicker: {
      confirm: 'У реду',
      clear: 'Обриши',
      eyeDropper: 'Пипета',
      suggestionDark: 'Бели текст је најбољи',
      suggestionLight: 'Црни текст је најбољи',
      recentColors: 'Недавне боје',
      presetColors: 'Унапред подешене боје'
    },
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
    timepicker: {
      confirm: 'У реду',
      cancel: 'Откажи',
      now: 'Сада',
      placeholder: 'Изабери време',
      startPlaceholder: 'Време почетка',
      endPlaceholder: 'Време завршетка',
      selectTime: 'Изабери време'
    },
    timeselect: {
      placeholder: 'Изабери време'
    },
    tree: {
      emptyText: 'Нема података',
      loading: 'Учитавање...',
      checkAll: 'Изабери све',
      uncheckAll: 'Поништи избор',
      expandAll: 'Прошири све',
      collapseAll: 'Скупи све'
    },
    treeselect: {
      placeholder: 'Изабери',
      emptyText: 'Нема података',
      loading: 'Учитавање...',
      noMatch: 'Нема поклапања'
    },
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
    autocomplete: {
      loading: 'Учитавање...',
      placeholder: 'Молимо унесите',
      noData: 'Нема података',
      noMatch: 'Нема поклапања'
    },
    countdown: {
      days: 'дана',
      hours: 'сати',
      minutes: 'минута',
      seconds: 'секунди',
      milliseconds: 'милисекунди',
      finished: 'Завршено'
    },
    cascader: {
      noMatch: 'Нема поклапања',
      placeholder: 'Изабери',
      loading: 'Учитавање...',
      noData: 'Нема података'
    },
    transfer: {
      noMatch: 'Нема поклапања',
      noData: 'Нема података',
      titles: ['Листа 1', 'Листа 2'],
      filterPlaceholder: 'Унеси кључну реч',
      noCheckedFormat: '{total} ставки',
      hasCheckedFormat: '{checked}/{total} изабрано',
      searchPlaceholder: 'Унеси кључну реч'
    },
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
      sort: {
        asc: 'Растуће',
        desc: 'Опадајуће',
        clear: 'Обриши сортирање'
      },
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
      columnSetting: {
        title: 'Подешавања колона',
        showAll: 'Прикажи све',
        hideAll: 'Сакриј све',
        reset: 'Ресетуј',
        fixedLeft: 'Фиксирај лево',
        fixedRight: 'Фиксирај десно',
        unfixed: 'Поништи фиксацију'
      },
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
      selection: {
        selectAll: 'Изабери све',
        selectInvert: 'Обрни избор',
        selectNone: 'Обриши избор',
        selected: '{count} ставки изабрано'
      },
      expand: {
        expandAll: 'Прошири све',
        collapseAll: 'Скупи све'
      },
      tree: {
        expandAll: 'Прошири све',
        collapseAll: 'Скупи све',
        expandLevel: 'Прошири до нивоа {level}'
      },
      drag: {
        dragTip: 'Превуци за преуређење',
        dropTip: 'Пусти за постављање'
      }
    },
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
    form: {
      validationFailed: 'Валидација неуспешна',
      required: 'Обавезно',
      pleaseInput: 'Молимо унесите',
      pleaseSelect: 'Молимо изаберите'
    },
    button: {
      loading: 'Учитавање...'
    },
    input: {
      placeholder: 'Молимо унесите',
      clear: 'Обриши',
      showPassword: 'Прикажи лозинку',
      hidePassword: 'Сакриј лозинку',
      copy: 'Копирај',
      copied: 'Копирано'
    },
    inputnumber: {
      placeholder: 'Молимо унесите број',
      increase: 'Повећај',
      decrease: 'Смањи'
    },
    inputtag: {
      placeholder: 'Молимо унесите',
      add: 'Додај',
      remove: 'Уклони'
    },
    breadcrumb: {
      label: 'Бредкрамб',
      more: 'Више'
    },
    backtop: {
      text: 'Повратак на врх'
    },
    select: {
      placeholder: 'Молимо изаберите',
      noData: 'Нема података',
      loading: 'Учитавање...',
      noMatch: 'Нема поклапања',
      selectAll: 'Изабери све',
      clearAll: 'Обриши све'
    },
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
    popconfirm: {
      confirm: 'У реду',
      cancel: 'Откажи',
      dontAskAgain: 'Не питај поново'
    },
    dialog: {
      confirm: 'У реду',
      cancel: 'Откажи',
      close: 'Затвори',
      maximize: 'Максимизуј',
      restore: 'Врати'
    },
    drawer: {
      close: 'Затвори',
      confirm: 'У реду',
      cancel: 'Откажи'
    },
    dropdown: {
      loading: 'Учитавање...'
    },
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
    infinitescroll: {
      loading: 'Учитавање...',
      finished: 'Нема више података',
      error: 'Учитавање неуспешно, кликни за поновни покушај',
      retry: 'Кликни за поновни покушај'
    },
    message: {
      close: 'Затвори'
    },
    notification: {
      close: 'Затвори'
    },
    loading: {
      text: 'Учитавање...'
    },
    spin: {
      text: 'Учитавање...'
    },
    rate: {
      texts: ['Изузетно лоше', 'Разочаран', 'Добро', 'Задовољан', 'Изненађен']
    },
    alert: {
      close: 'Затвори'
    },
    tag: {
      close: 'Затвори'
    },
    tabs: {
      close: 'Затвори',
      add: 'Додај',
      more: 'Више'
    },
    steps: {
      finish: 'Завршено',
      process: 'У току',
      wait: 'Чекање',
      error: 'Грешка'
    },
    progress: {
      success: 'Успех',
      exception: 'Изузетак',
      warning: 'Упозорење'
    },
    skeleton: {
      loading: 'Учитавање...'
    },
    empty: {
      description: 'Нема података',
      noData: 'Нема података',
      noResult: 'Нема резултата',
      networkError: 'Грешка мреже',
      serverError: 'Грешка сервера'
    },
    result: {
      success: 'Успех',
      error: 'Грешка',
      warning: 'Упозорење',
      info: 'Информација',
      backHome: 'Повратак на почетак'
    },
    waterfall: {
      loading: 'Учитавање...',
      noMore: 'Нема више података',
      empty: 'Нема података'
    },
    descriptions: {
      colon: ':'
    },
    slider: {
      tipFormatter: '{value}'
    },
    switch: {
      on: 'УКЉ',
      off: 'ИСКЉ'
    },
    checkbox: {
      selectAll: 'Изабери све'
    },
    radio: {},
    menu: {
      collapse: 'Скупи мени',
      expand: 'Прошири мени'
    },
    card: {
      collapse: 'Скупи',
      expand: 'Прошири'
    },
    collapse: {
      expand: 'Прошири',
      collapse: 'Скупи'
    },
    tooltip: {},
    popover: {},
    badge: {},
    avatar: {
      error: 'Учитавање неуспешно'
    },
    watermark: {},
    divider: {},
    carousel: {
      prev: 'Претходна',
      next: 'Следећа'
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
      placeholder: 'Молимо унесите',
      loading: 'Учитавање...',
      noData: 'Нема података'
    },
    skuselector: {
      placeholder: 'Select specifications',
      emptyText: 'No specifications',
      stock: 'Stock',
      price: 'Price',
      selected: 'Selected',
      outOfStock: 'Out of Stock'
    },
    productcard: {
      viewDetails: 'View Details',
      buyNow: 'Buy Now',
      addToCart: 'Add to Cart',
      sold: 'Sold',
      soldOut: 'Sold Out',
      vip: 'VIP'
    },
    price: {
      original: 'Original'
    },
    couponcard: {
      available: 'Claim Now',
      used: 'Used',
      expired: 'Expired',
      received: 'Received',
      limit: 'Orders over {threshold}',
      noThreshold: 'No threshold',
      validPeriod: 'Validity',
      ruleTitle: 'Usage Rules'
    },
    luckydraw: {
      start: 'Start',
      drawing: 'Drawing...',
      end: 'Winner!',
      retry: 'Retry'
    },
    filterbar: {
      all: 'All',
      sort: 'Sort',
      filter: 'Filter',
      cancel: 'Cancel',
      reset: 'Reset',
      confirm: 'Confirm',
      noOptions: 'No options',
      asc: 'Ascending',
      desc: 'Descending',
      selected: 'Selected'
    },
    submitbar: {
      total: 'Total: ',
      selected: '{count} selected',
      submit: 'Checkout',
      allSelect: 'Select All'
    },
    categorynav: {
      all: 'All',
      noData: 'No Data',
      loading: 'Loading...'
    },
    smartaddress: {
      placeholder: 'Paste address here, auto-detect name, phone, location',
      parse: 'Smart Parse',
      province: 'Province/City/District',
      city: 'City',
      district: 'District/County',
      street: 'Street/Town',
      detail: 'Detailed Address',
      phone: 'Phone',
      name: 'Recipient',
      parseSuccess: 'Address parsed successfully',
      parseFailed: 'Parse failed, please fill manually',
      required: 'Please fill complete address',
      provinceKeywords: ['Province', 'State'],
      cityKeywords: ['City', 'Prefecture'],
      districtKeywords: ['District', 'County', 'Township'],
      streetKeywords: ['Street', 'Road', 'Ave', 'Lane']
    },
    ganttchart: {
      taskName: 'Task Name',
      searchPlaceholder: 'Search tasks...',
      zoom: 'Zoom',
      day: 'Day',
      week: 'Week',
      month: 'Month',
      year: 'Year',
      milestone: 'Milestone'
    },
    imagemagnifier: {
      switchToImage: 'Switch to image {index}',
      galleryItem: 'Gallery {index}',
      close: 'Close'
    },
    ai: {
      bubble: {
        citations: 'Цитати'
      },
      mention: {
        placeholder: '@ Помени Агента, Документ или Табелу...',
        agent: 'Агент',
        document: 'Документ',
        table: 'Табела',
        knowledge: 'Знање',
        file: 'File'
      },
      codeBlock: {
        copyCode: 'Копирај код',
        copied: 'Копирано!',
        run: 'Покрени код',
        edit: 'Уреди',
        save: 'Сачувај',
        cancel: 'Откажи'
      },
      codeRunner: {
        run: 'Покрени',
        stop: 'Заустави',
        clear: 'Очисти',
        reset: 'Ресетуј',
        placeholder: 'Кликните Покрени да бисте извршили код...'
      },
      sender: {
        placeholder: 'Пошаљи поруку...',
        dragTip: 'Отпустите да бисте отпремили датотеке',
        noCommands: 'No matching commands found'
      },
      thoughtChain: {
        thoughtProcess: 'Процес размишљања',
        thinking: 'Размишљам...',
        defaultTitle: 'Нови корак',
        addNode: 'Додај корак'
      },
      thinking: {
        start: 'Почни да размишљаш',
        thinking: 'Размишљам...',
        complete: 'Размишљање завршено',
        error: 'Грешка у размишљању'
      },
      welcome: {
        title: 'Здраво, ја сам YH AI',
        description:
          'Могу вам помоћи са програмирањем, превођењем докумената или креативним писањем. Шта могу да урадим за вас данас?'
      },
      action: {
        copy: 'Копирај',
        regenerate: 'Регенериши',
        share: 'Подели',
        like: 'Свиђа ми се',
        dislike: 'Не свиђа ми се',
        edit: 'Уреди',
        delete: 'Обриши'
      },
      artifacts: {
        preview: 'Преглед',
        inline: 'У линији',
        code: 'Изворни код',
        versions: 'Верзије',
        rendering: 'Рендеровање компоненте...',
        renderingChart: 'Рендеровање графикона...',
        renderingCanvas: 'Припрема платна...',
        chartLoadError: 'Chart loading failed'
      },
      voice: {
        trigger: 'Кликните да бисте говорили',
        listening: 'Слушам...'
      },
      agent: {
        uses: 'употребе',
        use: 'Користи сада',
        favorite: 'Омиљено',
        unfavorite: 'Уклони из омиљених',
        share: 'Подели',
        online: 'Онлајн',
        offline: 'Офлајн',
        busy: 'Заузет',
        verified: 'Верификован',
        rating: 'Оцена',
        reviews: 'рецензије',
        responseTime: 'Просечно време одговора',
        ms: 'мс'
      },
      sources: {
        references: 'Референце',
        referencedSources: 'Референцирани извори',
        relevant: 'Релевантност',
        viewOriginal: 'Погледај оригинал',
        showAll: 'Прикажи све',
        more: 'више извора',
        drawerTitle: 'Референце',
        expandMore: 'Прикажи више',
        collapseMore: 'Скупи',
        noSources: 'Нема извора',
        today: 'Данас',
        last7Days: 'Последњих 7 дана',
        last30Days: 'Последњих 30 дана',
        earlier: 'Раније',
        pinned: 'Прикачено'
      },
      conversations: {
        today: 'Данас',
        last7Days: 'Последњих 7 дана',
        last30Days: 'Последњих 30 дана',
        earlier: 'Раније',
        pinned: 'Прикачено',
        pin: 'Прикачи',
        unpin: 'Откачи',
        newConversation: 'Нови разговор',
        noData: 'No conversations yet',
        rename: 'Преименуј',
        delete: 'Обриши',
        deleteConfirm: 'Потврдите брисање овог разговора?'
      },
      attachments: {
        dropTip: 'Drop files here to upload',
        clickToUpload: 'Click or drag files to upload',
        uploadSuccess: 'Upload success',
        uploadError: 'Upload failed',
        deleteConfirm: 'Are you sure to delete this file?',
        fileTooLarge: 'File size cannot exceed {size}',
        invalidFileType: 'Invalid file type'
      },
      mermaid: {
        image: 'Image',
        code: 'Code',
        zoomIn: 'Zoom In',
        zoomOut: 'Zoom Out',
        reset: 'Reset',
        download: 'Download',
        copyCode: 'Copy Code',
        rendering: 'Rendering...',
        renderError: 'Render failed',
        renderSuccess: 'Render success',
        retry: 'Retry'
      }
    }
  }
}

export default sr
