import type { Language } from '../index'

export const mn: Language = {
  name: 'mn',
  yh: {
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
    colorpicker: {
      confirm: 'Болно',
      clear: 'Цэвэрлэх',
      eyeDropper: 'Дуслын хэмжүүр',
      suggestionDark: 'Цагаан текст хамгийн сайн',
      suggestionLight: 'Хар текст хамгийн сайн',
      recentColors: 'Сүүлийн өнгөнүүд',
      presetColors: 'Урьдчилан тохируулсан өнгөнүүд'
    },
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
    timepicker: {
      confirm: 'Болно',
      cancel: 'Цуцлах',
      now: 'Одоо',
      placeholder: 'Цаг сонгох',
      startPlaceholder: 'Эхлэх цаг',
      endPlaceholder: 'Дуусах цаг',
      selectTime: 'Цаг сонгох'
    },
    timeselect: {
      placeholder: 'Цаг сонгох'
    },
    tree: {
      emptyText: 'Өгөгдөл байхгүй',
      loading: 'Ачааллаж байна...',
      checkAll: 'Бүгдийг шалгах',
      uncheckAll: 'Бүх шалгалтыг цуцлах',
      expandAll: 'Бүгдийг өргөжүүлэх',
      collapseAll: 'Бүгдийг нэгтгэх'
    },
    treeselect: {
      placeholder: 'Сонгох',
      emptyText: 'Өгөгдөл байхгүй',
      loading: 'Ачааллаж байна...',
      noMatch: 'Тохирох өгөгдөл байхгүй'
    },
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
    autocomplete: {
      loading: 'Ачааллаж байна...',
      placeholder: 'Оруулна уу',
      noData: 'Өгөгдөл байхгүй',
      noMatch: 'Тохирох өгөгдөл байхгүй'
    },
    countdown: {
      days: 'өдөр',
      hours: 'цаг',
      minutes: 'минут',
      seconds: 'секунд',
      milliseconds: 'миллисекунд',
      finished: 'Дууслаа'
    },
    cascader: {
      noMatch: 'Тохирох өгөгдөл байхгүй',
      placeholder: 'Сонгох',
      loading: 'Ачааллаж байна...',
      noData: 'Өгөгдөл байхгүй'
    },
    transfer: {
      noMatch: 'Тохирох өгөгдөл байхгүй',
      noData: 'Өгөгдөл байхгүй',
      titles: ['Жагсаалт 1', 'Жагсаалт 2'],
      filterPlaceholder: 'Түлхүүр үг оруулах',
      noCheckedFormat: '{total} зүйл',
      hasCheckedFormat: '{checked}/{total} сонгосон',
      searchPlaceholder: 'Түлхүүр үг оруулах'
    },
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
      sort: {
        asc: 'Өсөх',
        desc: 'Буурах',
        clear: 'Эрэмбэлэлтийг цэвэрлэх'
      },
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
      columnSetting: {
        title: 'Баганы тохиргоо',
        showAll: 'Бүгдийг харуулах',
        hideAll: 'Бүгдийг нуух',
        reset: 'Дахин тохируулах',
        fixedLeft: 'Зүүн талд бэхлэх',
        fixedRight: 'Баруун талд бэхлэх',
        unfixed: 'Суллах'
      },
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
      selection: {
        selectAll: 'Бүгдийг сонгох',
        selectInvert: 'Сонголтыг эргүүлэх',
        selectNone: 'Сонголтыг цэвэрлэх',
        selected: '{count} зүйл сонгогдсон'
      },
      expand: {
        expandAll: 'Бүгдийг өргөжүүлэх',
        collapseAll: 'Бүгдийг нэгтгэх'
      },
      tree: {
        expandAll: 'Бүгдийг өргөжүүлэх',
        collapseAll: 'Бүгдийг нэгтгэх',
        expandLevel: '{level} түвшинд хүртэл өргөжүүлэх'
      },
      drag: {
        dragTip: 'Дахин эрэмбэлэхийн тулд чирэх',
        dropTip: 'Байрлуулахын тулд буулгах'
      }
    },
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
    form: {
      validationFailed: 'Баталгаажуулалт амжилтгүй',
      required: 'Шаардлагатай',
      pleaseInput: 'Оруулна уу',
      pleaseSelect: 'Сонгоно уу'
    },
    button: {
      loading: 'Ачааллаж байна...'
    },
    input: {
      placeholder: 'Оруулна уу',
      clear: 'Цэвэрлэх',
      showPassword: 'Нууц үгийг харуулах',
      hidePassword: 'Нууц үгийг нуух',
      copy: 'Хуулах',
      copied: 'Хуулагдсан'
    },
    inputnumber: {
      placeholder: 'Тоо оруулна уу',
      increase: 'Нэмэгдүүлэх',
      decrease: 'Бууруулах'
    },
    inputtag: {
      placeholder: 'Оруулна уу',
      add: 'Нэмэх',
      remove: 'Устгах'
    },
    breadcrumb: {
      label: 'Навигацийн зам',
      more: 'Дэлгэрэнгүй'
    },
    backtop: {
      text: 'Дээш буцах'
    },
    select: {
      placeholder: 'Сонгоно уу',
      noData: 'Өгөгдөл байхгүй',
      loading: 'Ачааллаж байна...',
      noMatch: 'Тохирох өгөгдөл байхгүй',
      selectAll: 'Бүгдийг сонгох',
      clearAll: 'Бүгдийг цэвэрлэх'
    },
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
    popconfirm: {
      confirm: 'Болно',
      cancel: 'Цуцлах',
      dontAskAgain: 'Дахин асуухгүй'
    },
    dialog: {
      confirm: 'Болно',
      cancel: 'Цуцлах',
      close: 'Хаах',
      maximize: 'Ихэсгэх',
      restore: 'Сэргээх'
    },
    drawer: {
      close: 'Хаах',
      confirm: 'Болно',
      cancel: 'Цуцлах'
    },
    dropdown: {
      loading: 'Ачааллаж байна...'
    },
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
    infinitescroll: {
      loading: 'Ачааллаж байна...',
      finished: 'Өгөгдөл дууссан',
      error: 'Ачаалал амжилтгүй, дахин оролдохын тулд дарах',
      retry: 'Дахин оролдохын тулд дарах'
    },
    message: {
      close: 'Хаах'
    },
    notification: {
      close: 'Хаах'
    },
    loading: {
      text: 'Ачааллаж байна...'
    },
    spin: {
      text: 'Ачааллаж байна...'
    },
    rate: {
      texts: ['Маш муу', 'Сэтгэл дундуур', 'Дунд зэрэг', 'Сэтгэл хангалуун', 'Гайхсан']
    },
    alert: {
      close: 'Хаах'
    },
    tag: {
      close: 'Хаах'
    },
    tabs: {
      close: 'Хаах',
      add: 'Нэмэх',
      more: 'Дэлгэрэнгүй'
    },
    steps: {
      finish: 'Дууслаа',
      process: 'Явж байна',
      wait: 'Хүлээж байна',
      error: 'Алдаа'
    },
    progress: {
      success: 'Амжилт',
      exception: 'Үл хамаарах',
      warning: 'Анхааруулга'
    },
    skeleton: {
      loading: 'Ачааллаж байна...'
    },
    empty: {
      description: 'Өгөгдөл байхгүй',
      noData: 'Өгөгдөл байхгүй',
      noResult: 'Үр дүн байхгүй',
      networkError: 'Сүлжээний алдаа',
      serverError: 'Серверийн алдаа'
    },
    result: {
      success: 'Амжилт',
      error: 'Алдаа',
      warning: 'Анхааруулга',
      info: 'Мэдээлэл',
      backHome: 'Нүүр хуудас руу буцах'
    },
    waterfall: {
      loading: 'Ачааллаж байна...',
      noMore: 'Өгөгдөл дууссан',
      empty: 'Өгөгдөл байхгүй'
    },
    descriptions: {
      colon: ':'
    },
    slider: {
      tipFormatter: '{value}'
    },
    switch: {
      on: 'АСААЛТ',
      off: 'УНТАЛТ'
    },
    checkbox: {
      selectAll: 'Бүгдийг сонгох'
    },
    radio: {},
    menu: {
      collapse: 'Цэсийг нэгтгэх',
      expand: 'Цэсийг өргөжүүлэх'
    },
    card: {
      collapse: 'Нэгтгэх',
      expand: 'Өргөжүүлэх'
    },
    collapse: {
      expand: 'Өргөжүүлэх',
      collapse: 'Нэгтгэх'
    },
    tooltip: {},
    popover: {},
    badge: {},
    avatar: {
      error: 'Ачаалал амжилтгүй'
    },
    watermark: {},
    divider: {},
    carousel: {
      prev: 'Өмнөх',
      next: 'Дараагийн'
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
      placeholder: 'Оруулна уу',
      loading: 'Ачааллаж байна...',
      noData: 'Өгөгдөл байхгүй'
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
        citations: 'Лавлагаа'
      },
      mention: {
        placeholder: '@ Агент, Баримт эсвэл Хүснэгтийг дурдах...',
        agent: 'Агент',
        document: 'Баримт',
        table: 'Хүснэгт',
        knowledge: 'Мэдлэг',
        file: 'File'
      },
      codeBlock: {
        copyCode: 'Код хуулах',
        copied: 'Хуулсан!',
        run: 'Код ажиллуулах',
        edit: 'Засах',
        save: 'Хадгалах',
        cancel: 'Цуцлах'
      },
      codeRunner: {
        run: 'Ажиллуулах',
        stop: 'Зогсоох',
        clear: 'Цэвэрлэх',
        reset: 'Дахин тохируулах',
        placeholder: 'Код ажиллуулахын тулд Ажиллуулах дээр товшино уу...'
      },
      sender: {
        placeholder: 'Зурвас илгээх...',
        dragTip: 'Файлуудыг оруулахын тулд суллаарай',
        noCommands: 'No matching commands found'
      },
      thoughtChain: {
        thoughtProcess: 'Бодох үйл явц',
        thinking: 'Бодож байна...',
        defaultTitle: 'Шинэ алхам',
        addNode: 'Алхам нэмэх'
      },
      thinking: {
        start: 'Болох эхлэх',
        thinking: 'Бодож байна...',
        complete: 'Бодох явц дууслаа',
        error: 'Бодох алдаа'
      },
      welcome: {
        title: 'Сайн уу, би YH AI',
        description:
          'Би танд програмчлал, баримт орчуулах эсвэл бүтээлч бичихэд туслах болно. Өнөөдөр би танд юу хийх вэ?'
      },
      action: {
        copy: 'Хуулах',
        regenerate: 'Дахин үүсгэх',
        share: 'Хуваалцах',
        like: 'Таалагдах',
        dislike: 'Таалагдахгүй',
        edit: 'Засах',
        delete: 'Устгах'
      },
      artifacts: {
        preview: 'Урьдчилан харах',
        inline: 'Мөрөнд',
        code: 'Эх код',
        versions: 'Хувилбарууд',
        rendering: 'Компонент рендерлэж байна...',
        renderingChart: 'График рендерлэж байна...',
        renderingCanvas: 'Хэвлэх талбар бэлдэж байна...',
        chartLoadError: 'Chart loading failed'
      },
      voice: {
        trigger: 'Ярихын тулд товшино уу',
        listening: 'Сонсож байна...'
      },
      agent: {
        uses: 'ашиглалт',
        use: 'Одоо ашиглах',
        favorite: 'Дуртай',
        unfavorite: 'Дуртайгаас хасах',
        share: 'Хуваалцах',
        online: 'Онлайн',
        offline: 'Офлайн',
        busy: 'Зoccupp',
        verified: 'Баталгаажсан',
        rating: 'Үнэлгээ',
        reviews: 'сэтгэгдэл',
        responseTime: 'Дундаж хариу цаг',
        ms: 'мс'
      },
      sources: {
        references: 'Лавлагаа',
        referencedSources: 'Лавласан эх сурвалж',
        relevant: 'Холбоотой',
        viewOriginal: 'Эхлэлийг харах',
        showAll: 'Бүгдийг харах',
        more: 'илүү эх сурвалж',
        drawerTitle: 'Лавлагаа',
        expandMore: 'Илүү харах',
        collapseMore: 'Хурах',
        noSources: 'Эх сурвалж байхгүй',
        today: 'Өнөөдөр',
        last7Days: 'Сүүлийн 7 хоног',
        last30Days: 'Сүүлийн 30 хоног',
        earlier: 'Өмнөх',
        pinned: 'Зүүгдсэн'
      },
      conversations: {
        today: 'Өнөөдөр',
        last7Days: 'Сүүлийн 7 хоног',
        last30Days: 'Сүүлийн 30 хоног',
        earlier: 'Өмнөх',
        pinned: 'Зүүгдсэн',
        pin: 'Зүүх',
        unpin: 'Зүүлтийг авах',
        newConversation: 'Шинэ яриа',
        noData: 'No conversations yet',
        rename: 'Нэр өөрчлөх',
        delete: 'Устгах',
        deleteConfirm: 'Энэ яриаг устгахаа баталгаажуулах уу?'
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

export default mn
