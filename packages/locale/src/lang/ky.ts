import type { Language } from '../index'

export const ky: Language = {
  name: 'ky',
  yh: {
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
    colorpicker: {
      confirm: 'Макул',
      clear: 'Тазалоо',
      eyeDropper: 'Пипетка',
      suggestionDark: 'Ак текст эң жакшы',
      suggestionLight: 'Кара текст эң жакшы',
      recentColors: 'Акыркы түстөр',
      presetColors: 'Алдын ала орнотулган түстөр'
    },
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
    timepicker: {
      confirm: 'Макул',
      cancel: 'Жокко чыгаруу',
      now: 'Азыр',
      placeholder: 'Убакытты тандоо',
      startPlaceholder: 'Башталган убакыт',
      endPlaceholder: 'Аяктаган убакыт',
      selectTime: 'Убакытты тандоо'
    },
    timeselect: {
      placeholder: 'Убакытты тандоо'
    },
    tree: {
      emptyText: 'Маалымат жок',
      loading: 'Жүктөлүүдө...',
      checkAll: 'Баарын текшерүү',
      uncheckAll: 'Баарын текшерүүдөн баш тартуу',
      expandAll: 'Баарын кеңейтүү',
      collapseAll: 'Баарын жыйыштыруу'
    },
    treeselect: {
      placeholder: 'Тандоо',
      emptyText: 'Маалымат жок',
      loading: 'Жүктөлүүдө...',
      noMatch: 'Туура келген маалымат жок'
    },
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
    autocomplete: {
      loading: 'Жүктөлүүдө...',
      placeholder: 'Сураныч, киргизиңиз',
      noData: 'Маалымат жок',
      noMatch: 'Туура келген маалымат жок'
    },
    countdown: {
      days: 'күн',
      hours: 'саат',
      minutes: 'мүнөт',
      seconds: 'секунд',
      milliseconds: 'миллисекунд',
      finished: 'Бүттү'
    },
    cascader: {
      noMatch: 'Туура келген маалымат жок',
      placeholder: 'Тандоо',
      loading: 'Жүктөлүүдө...',
      noData: 'Маалымат жок'
    },
    transfer: {
      noMatch: 'Туура келген маалымат жок',
      noData: 'Маалымат жок',
      titles: ['Тизме 1', 'Тизме 2'],
      filterPlaceholder: 'Ачкыч сөздү киргизиңиз',
      noCheckedFormat: '{total} элемент',
      hasCheckedFormat: '{checked}/{total} тандалды',
      searchPlaceholder: 'Ачкыч сөздү киргизиңиз'
    },
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
      sort: {
        asc: 'Өсүү',
        desc: 'Азайып',
        clear: 'Сорттоону тазалоо'
      },
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
      columnSetting: {
        title: 'Тик барак параметрлери',
        showAll: 'Баарын көрсөтүү',
        hideAll: 'Баарын жашыруу',
        reset: 'Кайра орнотуу',
        fixedLeft: 'Солго бекемдөө',
        fixedRight: 'Оңго бекемдөө',
        unfixed: 'Бошотуу'
      },
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
      selection: {
        selectAll: 'Баарын тандоо',
        selectInvert: 'Тандоону тескери буруу',
        selectNone: 'Тандоону тазалоо',
        selected: '{count} элемент тандалды'
      },
      expand: {
        expandAll: 'Баарын кеңейтүү',
        collapseAll: 'Баарын жыйыштыруу'
      },
      tree: {
        expandAll: 'Баарын кеңейтүү',
        collapseAll: 'Баарын жыйыштыруу',
        expandLevel: '{level} деңгейге чейин кеңейтүү'
      },
      drag: {
        dragTip: 'Кайра тартипке келтирүү үчүн сүйрөңүз',
        dropTip: 'Жайгаштыруу үчүн таштаңыз'
      }
    },
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
    form: {
      validationFailed: 'Текшерүү ийгиликсиз',
      required: 'Миндеттүү',
      pleaseInput: 'Сураныч, киргизиңиз',
      pleaseSelect: 'Сураныч, тандаңыз'
    },
    button: {
      loading: 'Жүктөлүүдө...'
    },
    input: {
      placeholder: 'Сураныч, киргизиңиз',
      clear: 'Тазалоо',
      showPassword: 'Сырсөздү көрсөтүү',
      hidePassword: 'Сырсөздү жашыруу',
      copy: 'Көчүрүү',
      copied: 'Көчүрүлдү'
    },
    inputnumber: {
      placeholder: 'Сураныч, сан киргизиңиз',
      increase: 'Көбөйтүү',
      decrease: 'Азайтуу'
    },
    inputtag: {
      placeholder: 'Сураныч, киргизиңиз',
      add: 'Кошуу',
      remove: 'Жок кылуу'
    },
    breadcrumb: {
      label: 'Навигация жолу',
      more: 'Көбүрөөк'
    },
    backtop: {
      text: 'Жогоруга кайтуу'
    },
    select: {
      placeholder: 'Сураныч, тандаңыз',
      noData: 'Маалымат жок',
      loading: 'Жүктөлүүдө...',
      noMatch: 'Туура келген маалымат жок',
      selectAll: 'Баарын тандоо',
      clearAll: 'Баарын тазалоо'
    },
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
    popconfirm: {
      confirm: 'Макул',
      cancel: 'Жокко чыгаруу',
      dontAskAgain: 'Кайра сурабаңыз'
    },
    dialog: {
      confirm: 'Макул',
      cancel: 'Жокко чыгаруу',
      close: 'Жабуу',
      maximize: 'Максималдаштыруу',
      restore: 'Кайра орнотуу'
    },
    drawer: {
      close: 'Жабуу',
      confirm: 'Макул',
      cancel: 'Жокко чыгаруу'
    },
    dropdown: {
      loading: 'Жүктөлүүдө...'
    },
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
    infinitescroll: {
      loading: 'Жүктөлүүдө...',
      finished: 'Маалымат жок',
      error: 'Жүктөө ийгиликсиз, кайра аракет кылуу үчүн басыңыз',
      retry: 'Кайра аракет кылуу үчүн басыңыз'
    },
    message: {
      close: 'Жабуу'
    },
    notification: {
      close: 'Жабуу'
    },
    loading: {
      text: 'Жүктөлүүдө...'
    },
    spin: {
      text: 'Жүктөлүүдө...'
    },
    rate: {
      texts: ['Өтө начар', 'Көңүл калтырган', 'Адилеттүү', 'Канааттанган', 'Таң калган']
    },
    alert: {
      close: 'Жабуу'
    },
    tag: {
      close: 'Жабуу'
    },
    tabs: {
      close: 'Жабуу',
      add: 'Кошуу',
      more: 'Көбүрөөк'
    },
    steps: {
      finish: 'Бүттү',
      process: 'Улантууда',
      wait: 'Күтүүдө',
      error: 'Ката'
    },
    progress: {
      success: 'Ийгилик',
      exception: 'Эрекчелик',
      warning: 'Эскертүү'
    },
    skeleton: {
      loading: 'Жүктөлүүдө...'
    },
    empty: {
      description: 'Маалымат жок',
      noData: 'Маалымат жок',
      noResult: 'Натыйжалар жок',
      networkError: 'Тармак катасы',
      serverError: 'Сервер катасы'
    },
    result: {
      success: 'Ийгилик',
      error: 'Ката',
      warning: 'Эскертүү',
      info: 'Маалымат',
      backHome: 'Башкы баракка кайтуу'
    },
    waterfall: {
      loading: 'Жүктөлүүдө...',
      noMore: 'Маалымат жок',
      empty: 'Маалымат жок'
    },
    descriptions: {
      colon: ':'
    },
    slider: {
      tipFormatter: '{value}'
    },
    switch: {
      on: 'КУУЛУУ',
      off: 'ӨЧҮРҮЛГӨН'
    },
    checkbox: {
      selectAll: 'Баарын тандоо'
    },
    radio: {},
    menu: {
      collapse: 'Менюну жыйыштыруу',
      expand: 'Менюну кеңейтүү'
    },
    card: {
      collapse: 'Жыйыштыруу',
      expand: 'Кеңейтүү'
    },
    collapse: {
      expand: 'Кеңейтүү',
      collapse: 'Жыйыштыруу'
    },
    tooltip: {},
    popover: {},
    badge: {},
    avatar: {
      error: 'Жүктөө ийгиликсиз'
    },
    watermark: {},
    divider: {},
    carousel: {
      prev: 'Мурунку',
      next: 'Кийинки'
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
      placeholder: 'Сураныч, киргизиниз',
      loading: 'Жүктөлүп жатат...',
      noData: 'Маалымат жок'
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
        citations: 'Шилтемелер'
      },
      mention: {
        placeholder: '@ Агент, Документ же Таблицаны көрсөтүү...',
        agent: 'Агент',
        document: 'Документ',
        table: 'Таблица',
        knowledge: 'Билим',
        file: 'File'
      },
      codeBlock: {
        copyCode: 'Кодду көчүрүү',
        copied: 'Көчүрүлдү!',
        run: 'Кодду иштетүү',
        edit: 'Оңдоо',
        save: 'Сактоо',
        cancel: 'Болтурбоо'
      },
      codeRunner: {
        run: 'Иштет',
        stop: 'Токтор',
        clear: 'Тазалоо',
        reset: 'Кайра орнотуу',
        placeholder: 'Кодду иштетүү үчүн Иштет баскычын басыңыз...'
      },
      sender: {
        placeholder: 'Билдирүү жөнөтүү...',
        dragTip: 'Файылдарды жүктөө үчүн бошоткула',
        noCommands: 'No matching commands found'
      },
      thoughtChain: {
        thoughtProcess: 'Ойлоонун процесси',
        thinking: 'Ойло жатат...',
        defaultTitle: 'Жаңы кадам',
        addNode: 'Кадам кошуу'
      },
      thinking: {
        start: 'Ойлоону баштоо',
        thinking: 'Ойло жатат...',
        complete: 'Ойлоо бүттү',
        error: 'Ойлоо катасы'
      },
      welcome: {
        title: 'Салам, мен YH AI',
        description:
          'Сизге программалоо, документтерди которуп жазуу же чыгармачыл жазуу жөнүндө жардам бериши мүмкүн. Бүгүн сиз үчүн эмне кыла алам?'
      },
      action: {
        copy: 'Көчүр',
        regenerate: 'Кайрадан түзүү',
        share: 'Бөлүшүү',
        like: 'Жакшы көрүү',
        dislike: 'Жакшы көрбөө',
        edit: 'Оңдоо',
        delete: 'Өчүрүү'
      },
      artifacts: {
        preview: 'Алдын ала көрүү',
        inline: 'Ичинде',
        code: 'Булак коду',
        versions: 'Версиялар',
        rendering: 'Компонент көрсөтүлүп жатат...',
        renderingChart: 'График көрсөтүлүп жатат...',
        renderingCanvas: 'Кыйыр даярданып жатат...',
        chartLoadError: 'Chart loading failed'
      },
      voice: {
        trigger: 'Сөйлөө үчүн басыңыз',
        listening: 'Угуп жатат...'
      },
      agent: {
        uses: 'пайдалануу',
        use: 'Азыр пайдалануу',
        favorite: 'Сүйүктүү',
        unfavorite: 'Сүйүктүүдөн алып таштоо',
        share: 'Бөлүшүү',
        online: 'Онлайн',
        offline: 'Офлайн',
        busy: 'Жай',
        verified: 'Ырасталган',
        rating: 'Баа',
        reviews: 'пикир',
        responseTime: 'Орточо жооп убактысы',
        ms: 'мс'
      },
      sources: {
        references: 'Шилтемелер',
        referencedSources: 'Шилтеме берилген булактар',
        relevant: 'Релеванттуулук',
        viewOriginal: 'Оригиналды көрүү',
        showAll: 'Баарын көрсөтүү',
        more: 'дагы булактар',
        drawerTitle: 'Шилтемелер',
        expandMore: 'Дагы көрсөтүү',
        collapseMore: 'Жыйнаштыруу',
        noSources: 'Булактар жок',
        today: 'Бүгүн',
        last7Days: 'Акыркы 7 күн',
        last30Days: 'Акыркы 30 күн',
        earlier: 'Мурда',
        pinned: 'Бекемделген'
      },
      conversations: {
        today: 'Бүгүн',
        last7Days: 'Акыркы 7 күн',
        last30Days: 'Акыркы 30 күн',
        earlier: 'Мурда',
        pinned: 'Бекемделген',
        pin: 'Бекемдөө',
        unpin: 'Бекемдөөнү алып таштоо',
        newConversation: 'Жаңы сүйлөшүү',
        noData: 'No conversations yet',
        rename: 'Атын өзгөртүү',
        delete: 'Өчүрүү',
        deleteConfirm: 'Бул сүйлөшүүнү өчүрүүнү ыраштыкылабы?'
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

export default ky
