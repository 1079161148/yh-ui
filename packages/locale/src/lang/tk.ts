import type { Language } from '../index'

export const tk: Language = {
  name: 'tk',
  yh: {
    // Umumy
    common: {
      yes: 'Hawa',
      no: '\xDDok',
      confirm: 'Tassyklamak',
      cancel: '\xDDatyrmak',
      loading: '\xDD\xFCklen\xFD\xE4r',
      close: '\xDDapmak',
      clear: 'Arassalamak',
      reset: 'Ba\u015Fdan d\xFCzmek',
      save: 'Saklamak',
      delete: 'Pozmak',
      edit: '\xDC\xFDtgetmek',
      add: 'Go\u015Fmak',
      search: 'G\xF6zlemek',
      refresh: 'T\xE4zelemek',
      expand: 'Gi\u0148eltmek',
      collapse: 'Ki\xE7eltmek',
      more: 'Has k\xF6p',
      noData: 'Maglumat \xFDok',
      noMatch: 'Gabat gel\xFD\xE4n maglumat \xFDok',
      selectAll: 'Hemmesini sa\xFDlamak',
      unselectAll: 'Sa\xFDlamagy a\xFDyrmak'
    },
    // Reňk saýlaýjy
    colorpicker: {
      confirm: 'Bol\xFDar',
      clear: 'Arassalamak',
      eyeDropper: 'G\xF6z damjasy',
      suggestionDark: 'Ak teksti\u0148 has gowy',
      suggestionLight: 'Gara teksti\u0148 has gowy',
      recentColors: 'So\u0148ky re\u0148kler',
      presetColors: '\xD6\u0148\xFCnden d\xFC\u015F\xFCrilen re\u0148kler'
    },
    // Sene saýlaýjy
    datepicker: {
      now: '\u015Eu wagt',
      today: '\u015Eu g\xFCn',
      cancel: '\xDDatyrmak',
      clear: 'Arassalamak',
      confirm: 'Bol\xFDar',
      selectDate: 'Sene sa\xFDla\u0148',
      selectTime: 'Wagt sa\xFDla\u0148',
      startDate: 'Ba\u015Flan\xFDan sene',
      startTime: 'Ba\u015Flan\xFDan wagt',
      endDate: 'Gutar\xFDan sene',
      endTime: 'Gutar\xFDan wagt',
      year: '',
      month: '',
      day: '',
      week: 'Hepde',
      monthBeforeYear: true,
      prevYear: '\xD6\u0148ki \xFDyl',
      nextYear: 'Indiki \xFDyl',
      prevMonth: '\xD6\u0148ki a\xFD',
      nextMonth: 'Indiki a\xFD',
      weeks: {
        sun: '\xDDek',
        mon: 'Du\u015F',
        tue: 'Si\u015F',
        wed: '\xC7ar',
        thu: 'Pen',
        fri: 'Ann',
        sat: '\u015Een'
      },
      months: {
        jan: '\xDDan',
        feb: 'Few',
        mar: 'Mar',
        apr: 'Apr',
        may: 'Ma\xFD',
        jun: 'I\xFDun',
        jul: 'I\xFDul',
        aug: 'Awg',
        sep: 'Sen',
        oct: 'Okt',
        nov: 'No\xFD',
        dec: 'Dek'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Wagt saýlaýjy
    timepicker: {
      confirm: 'Bol\xFDar',
      cancel: '\xDDatyrmak',
      now: '\u015Eu wagt',
      placeholder: 'Wagt sa\xFDla\u0148',
      startPlaceholder: 'Ba\u015Flan\xFDan wagt',
      endPlaceholder: 'Gutar\xFDan wagt',
      selectTime: 'Wagt sa\xFDla\u0148'
    },
    // Wagt saýlamak
    timeselect: {
      placeholder: 'Wagt sa\xFDla\u0148'
    },
    // Agaj
    tree: {
      emptyText: 'Maglumat \xFDok',
      loading: '\xDD\xFCklen\xFD\xE4r...',
      checkAll: 'Hemmesini barla\u0148',
      uncheckAll: 'Barlamagy a\xFDyrmak',
      expandAll: 'Hemmesini gi\u0148eltmek',
      collapseAll: 'Hemmesini ki\xE7eltmek'
    },
    // Agaj saýlaýjy
    treeselect: {
      placeholder: 'Sa\xFDla\u0148',
      emptyText: 'Maglumat \xFDok',
      loading: '\xDD\xFCklen\xFD\xE4r...',
      noMatch: 'Gabat gel\xFD\xE4n maglumat \xFDok'
    },
    // Kalendar
    calendar: {
      prevMonth: '\xD6\u0148ki a\xFD',
      nextMonth: 'Indiki a\xFD',
      prevYear: '\xD6\u0148ki \xFDyl',
      nextYear: 'Indiki \xFDyl',
      today: '\u015Eu g\xFCn',
      week: 'Hepde',
      holiday: 'Ba\xFDram',
      workday: 'I\u015F',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: '\xDDek',
        mon: 'Du\u015F',
        tue: 'Si\u015F',
        wed: '\xC7ar',
        thu: 'Pen',
        fri: 'Ann',
        sat: '\u015Een'
      }
    },
    // Awto doldurma
    autocomplete: {
      loading: '\xDD\xFCklen\xFD\xE4r...',
      placeholder: '\xDDazmagy\u0148yzy ha\xFDy\u015F ed\xFD\xE4ris',
      noData: 'Maglumat \xFDok',
      noMatch: 'Gabat gel\xFD\xE4n maglumat \xFDok'
    },
    // Geri sanama
    countdown: {
      days: 'g\xFCnler',
      hours: 'sagatlar',
      minutes: 'minutlar',
      seconds: 'sekuntlar',
      milliseconds: 'millisekuntlar',
      finished: 'Tamamlandy'
    },
    // Kaskad
    cascader: {
      noMatch: 'Gabat gel\xFD\xE4n maglumat \xFDok',
      placeholder: 'Sa\xFDla\u0148',
      loading: '\xDD\xFCklen\xFD\xE4r...',
      noData: 'Maglumat \xFDok'
    },
    // Geçirmek
    transfer: {
      noMatch: 'Gabat gel\xFD\xE4n maglumat \xFDok',
      noData: 'Maglumat \xFDok',
      titles: ['Sanaw 1', 'Sanaw 2'],
      filterPlaceholder: 'A\xE7ar s\xF6z girizi\u0148',
      noCheckedFormat: '{total} element',
      hasCheckedFormat: '{checked}/{total} sa\xFDlandy',
      searchPlaceholder: 'A\xE7ar s\xF6z girizi\u0148'
    },
    // Tabela
    table: {
      emptyText: 'Maglumat \xFDok',
      confirmFilter: 'Tassyklamak',
      resetFilter: 'Ba\u015Fdan d\xFCzmek',
      clearFilter: 'Hemmesi',
      sumText: 'Jemi',
      loading: '\xDD\xFCklen\xFD\xE4r...',
      index: 'Indeks',
      print: '\xC7ap etmek',
      cancel: '\xDDatyrmak',
      preview: '\xC7ap \xF6\u0148\xFCnden g\xF6r\xFCni\u015Fi',
      printTime: '\xC7ap wagty',
      total: 'Jemi {total} element',
      page: 'Sahypa {page}',
      yes: 'Hawa',
      no: '\xDDok',
      // Gural paneli
      toolbar: {
        refresh: 'T\xE4zelemek',
        density: 'G\xFDyglylyk',
        densityDefault: 'Bellenen',
        densityLarge: 'Uly',
        densitySmall: 'Ki\xE7i',
        columnSetting: 'S\xFCtun sazlamalary',
        fullscreen: 'Doly ekran',
        exitFullscreen: 'Doly ekrandan \xE7ykmak',
        export: 'Eksport',
        import: 'Import',
        search: 'G\xF6zlemek',
        searchPlaceholder: 'G\xF6zlemek \xFC\xE7in a\xE7ar s\xF6zler girizi\u0148'
      },
      // Filter
      filter: {
        selectAll: 'Hemmesini sa\xFDlamak',
        selectInvert: 'Sa\xFDlamany tersine \xE7evirmek',
        empty: 'Bo\u015F',
        notEmpty: 'Bo\u015F d\xE4l',
        contains: '\xD6z i\xE7ine al\xFDar',
        notContains: '\xD6z i\xE7ine alm\xFDar',
        equals: 'De\u0148',
        notEquals: 'De\u0148 d\xE4l',
        startsWith: 'Ba\u015Flan\xFDar',
        endsWith: 'Gutaryar',
        greaterThan: 'Uly',
        lessThan: 'Ki\xE7i',
        between: 'Aralygynda'
      },
      // Tertiplemek
      sort: {
        asc: 'Art\xFDan',
        desc: 'Az\xFDan',
        clear: 'Tertiplem\xE4ni arassalamak'
      },
      // Eksport
      export: {
        title: 'Maglumat eksport etmek',
        filename: 'Fa\xFDl ady',
        type: 'Fa\xFDl g\xF6rn\xFC\u015Fi',
        scope: 'Eksport \xE7\xE4kleri',
        scopeAll: 'Hemme maglumat',
        scopeSelected: 'Sa\xFDlanan maglumat',
        scopeCurrentPage: 'H\xE4zirki sahypa',
        includeHeader: 'Ba\u015Flygy go\u015Fmak',
        exporting: 'Eksport edil\xFD\xE4r...',
        success: 'Eksport \xFCst\xFCnlikli',
        error: 'Eksport \xFDal\u0148y\u015Flygy'
      },
      // Import
      import: {
        title: 'Maglumat import etmek',
        selectFile: 'Fa\xFDl sa\xFDla\u0148',
        dragTip:
          '\xDD\xFCklemek \xFC\xE7in fa\xFDly \u015Fu \xFDere basy\u0148 \xFDa-da s\xFC\xFD\xFC\u0148',
        importing: 'Import edil\xFD\xE4r...',
        success: 'Import \xFCst\xFCnlikli',
        error: 'Import \xFDal\u0148y\u015Flygy',
        preview: 'Maglumat \xF6\u0148\xFCnden g\xF6r\xFCni\u015Fi',
        confirm: 'Importy tassyklamak'
      },
      // Çap
      printConfig: {
        title: '\xC7ap sazlamalary',
        pageTitle: 'Sahypa ady',
        pageHeader: 'Ba\u015Flyk',
        pageFooter: 'A\u015Faklyk',
        printAll: 'Hemmesini \xE7ap etmek',
        printSelected: 'Sa\xFDlanany \xE7ap etmek',
        printCurrentPage: 'H\xE4zirki sahypany \xE7ap etmek',
        landscape: 'Gorizontal',
        portrait: 'Wertikal',
        printing: '\xC7ap edil\xFD\xE4r...'
      },
      // Sütun sazlamalary
      columnSetting: {
        title: 'S\xFCtun sazlamalary',
        showAll: 'Hemmesini g\xF6rkezmek',
        hideAll: 'Hemmesini gizlemek',
        reset: 'Ba\u015Fdan d\xFCzmek',
        fixedLeft: '\xC7epe berkemek',
        fixedRight: 'Saga berkemek',
        unfixed: 'Berkem\xE4ni a\xFDyrmak'
      },
      // Kontekst menýu
      contextMenu: {
        copy: 'Kop\xFDalamak',
        copyRow: 'Setiri kop\xFDalamak',
        copyCell: '\xDDa\xE7kany kop\xFDalamak',
        paste: '\xDDapy\u015Fdyrmak',
        insertRowAbove: '\xDCst\xFCne setir go\u015Fmak',
        insertRowBelow: 'A\u015Fagyna setir go\u015Fmak',
        deleteRow: 'Setiri pozmak',
        deleteSelectedRows: 'Sa\xFDlanan setirleri pozmak',
        exportSelected: 'Sa\xFDlanany eksport etmek'
      },
      // Saýlamak
      selection: {
        selectAll: 'Hemmesini sa\xFDlamak',
        selectInvert: 'Sa\xFDlamany tersine \xE7evirmek',
        selectNone: 'Sa\xFDlamany arassalamak',
        selected: '{count} element sa\xFDlandy'
      },
      // Giňeltmek
      expand: {
        expandAll: 'Hemmesini gi\u0148eltmek',
        collapseAll: 'Hemmesini ki\xE7eltmek'
      },
      // Agaj
      tree: {
        expandAll: 'Hemmesini gi\u0148eltmek',
        collapseAll: 'Hemmesini ki\xE7eltmek',
        expandLevel: '{level} derej\xE4 gi\u0148eltmek'
      },
      // Süýürmek
      drag: {
        dragTip: 'Tertibi \xFC\xFDtgetmek \xFC\xE7in s\xFC\xFD\xFC\u0148',
        dropTip: '\xDDerle\u015Fdirmek \xFC\xE7in go\xFDu\u0148'
      }
    },
    // Habar gutusy
    messagebox: {
      title: 'Habar',
      confirm: 'Bol\xFDar',
      cancel: '\xDDatyrmak',
      close: '\xDDapmak',
      error: 'N\xE4dogry girizme',
      alert: 'Du\xFDdury\u015F',
      prompt: 'Teklip',
      inputPlaceholder: '\xDDazmagy\u0148yzy ha\xFDy\u015F ed\xFD\xE4ris'
    },
    // Ýüklemek
    upload: {
      deleteTip: 'pozmak \xFC\xE7in delete basy\u0148',
      delete: 'Pozmak',
      preview: '\xD6\u0148\xFCnden g\xF6r\xFCni\u015F',
      continue: 'Dowam etdirmek',
      upload: '\xDD\xFCklemek \xFC\xE7in basy\u0148',
      tip: '<em>\xDD\xFCklemek</em> \xFC\xE7in fa\xFDly \u015Fu \xFDere basy\u0148 \xFDa-da s\xFC\xFD\xFC\u0148',
      dragTip:
        'Fa\xFDly \u015Fu \xFDere go\xFDu\u0148 \xFDa-da \xFD\xFCklemek \xFC\xE7in basy\u0148',
      uploading: '\xDD\xFCklen\xFD\xE4r...',
      success: '\xDD\xFCkleme \xFCst\xFCnlikli',
      error: '\xDD\xFCkleme \xFDal\u0148y\u015Flygy',
      retry: 'T\xE4zeden synany\u015Fmak',
      cancel: '\xDD\xFCklem\xE4ni \xFDatyrmak',
      fileTypeError: 'Fa\xFDl g\xF6rn\xFC\u015Fi goldanylma\xFDar',
      fileSizeError: 'Fa\xFDl \xF6l\xE7egi \xE7\xE4gi ge\xE7\xFD\xE4r',
      fileCountError: 'Fa\xFDl sany \xE7\xE4gi ge\xE7\xFD\xE4r'
    },
    // Forma
    form: {
      validationFailed: 'Barlama \u015Fowsuz',
      required: 'M\xF6h\xFCm',
      pleaseInput: '\xDDazmagy\u0148yzy ha\xFDy\u015F ed\xFD\xE4ris',
      pleaseSelect: 'Sa\xFDlamagy\u0148yzy ha\xFDy\u015F ed\xFD\xE4ris'
    },
    // Düwme
    button: {
      loading: '\xDD\xFCklen\xFD\xE4r...'
    },
    // Girizmek
    input: {
      placeholder: '\xDDazmagy\u0148yzy ha\xFDy\u015F ed\xFD\xE4ris',
      clear: 'Arassalamak',
      showPassword: 'Paroly g\xF6rkezmek',
      hidePassword: 'Paroly gizlemek',
      copy: 'Kop\xFDalamak',
      copied: 'Kop\xFDalandy'
    },
    // San girizmek
    inputnumber: {
      placeholder: 'San \xFDazmagy\u0148yzy ha\xFDy\u015F ed\xFD\xE4ris',
      increase: 'K\xF6pe\xFDtmek',
      decrease: 'Azaltmak'
    },
    // Bellik girizmek
    inputtag: {
      placeholder: '\xDDazmagy\u0148yzy ha\xFDy\u015F ed\xFD\xE4ris',
      add: 'Go\u015Fmak',
      remove: 'A\xFDyrmak'
    },
    // Çörüň ýoly
    breadcrumb: {
      label: '\xC7\xF6r\xFC\u0148 \xFDoly',
      more: 'Has k\xF6p'
    },
    // Ýokary gaýtmak
    backtop: {
      text: '\xDDokary ga\xFDtmak'
    },
    // Saýlamak
    select: {
      placeholder: 'Sa\xFDlamagy\u0148yzy ha\xFDy\u015F ed\xFD\xE4ris',
      noData: 'Maglumat \xFDok',
      loading: '\xDD\xFCklen\xFD\xE4r...',
      noMatch: 'Gabat gel\xFD\xE4n maglumat \xFDok',
      selectAll: 'Hemmesini sa\xFDlamak',
      clearAll: 'Hemmesini arassalamak'
    },
    // Sahypalama
    pagination: {
      goto: 'Ga\xFDtmak',
      page: '',
      total: 'Jemi {total}',
      pageSize: '/sahypa',
      prev: '\xD6\u0148ki',
      next: 'Indiki',
      first: 'Birinjisi',
      last: 'So\u0148kysy',
      pageClassifier: ''
    },
    // Tassyklama popup
    popconfirm: {
      confirm: 'Bol\xFDar',
      cancel: '\xDDatyrmak',
      dontAskAgain: 'T\xE4zeden sorama\u0148'
    },
    // Dialog
    dialog: {
      confirm: 'Bol\xFDar',
      cancel: '\xDDatyrmak',
      close: '\xDDapmak',
      maximize: 'Ulyla\u015Fdyrmak',
      restore: 'Yzyna getirmek'
    },
    // Çekmeje
    drawer: {
      close: '\xDDapmak',
      confirm: 'Bol\xFDar',
      cancel: '\xDDatyrmak'
    },
    // Aşak menýu
    dropdown: {
      loading: '\xDD\xFCklen\xFD\xE4r...'
    },
    // Surat
    image: {
      error: '\u015EOWSYZ',
      loading: '\xDD\xFCklen\xFD\xE4r...',
      preview: '\xD6\u0148\xFCnden g\xF6r\xFCni\u015F',
      zoomIn: 'Ulyla\u015Fdyrmak',
      zoomOut: 'Ki\xE7eltmek',
      rotateLeft: '\xC7epe a\xFDlamak',
      rotateRight: 'Saga a\xFDlamak',
      originalSize: 'Asyl \xF6l\xE7egi',
      fullscreen: 'Doly ekran'
    },
    // Surat görüjisi
    imageviewer: {
      close: '\xDDapmak',
      prev: '\xD6\u0148ki',
      next: 'Indiki',
      zoomIn: 'Ulyla\u015Fdyrmak',
      zoomOut: 'Ki\xE7eltmek',
      rotateLeft: '\xC7epe a\xFDlamak',
      rotateRight: 'Saga a\xFDlamak',
      reset: 'Ba\u015Fdan d\xFCzmek',
      fullscreen: 'Doly ekran',
      exitFullscreen: 'Doly ekrandan \xE7ykmak'
    },
    // Çäksiz skroll
    infinitescroll: {
      loading: '\xDD\xFCklen\xFD\xE4r...',
      finished: 'Has maglumat \xFDok',
      error:
        '\xDD\xFCkleme \xFDal\u0148y\u015Flygy, t\xE4zeden synany\u015Fmak \xFC\xE7in basy\u0148',
      retry: 'T\xE4zeden synany\u015Fmak \xFC\xE7in basy\u0148'
    },
    // Habar
    message: {
      close: '\xDDapmak'
    },
    // Bildiriş
    notification: {
      close: '\xDDapmak'
    },
    // Ýüklemek
    loading: {
      text: '\xDD\xFCklen\xFD\xE4r...'
    },
    // Aýlanma
    spin: {
      text: '\xDD\xFCklen\xFD\xE4r...'
    },
    // Bahalandyrmak
    rate: {
      texts: [
        '\xD6r\xE4n \xFDaman',
        'Gynan\xE7ly',
        'Orta\xE7a',
        'Razyla\u015Fdyrylan',
        'Ha\xFDran galdyrylan'
      ]
    },
    // Duýduryş
    alert: {
      close: '\xDDapmak'
    },
    // Bellik
    tag: {
      close: '\xDDapmak'
    },
    // Tablar
    tabs: {
      close: '\xDDapmak',
      add: 'Go\u015Fmak',
      more: 'Has k\xF6p'
    },
    // Basgançaklar
    steps: {
      finish: 'Tamamlandy',
      process: 'Dowam ed\xFD\xE4r',
      wait: 'Gara\u015Fmak',
      error: '\xDDal\u0148y\u015Flyk'
    },
    // Öňe gitmek
    progress: {
      success: '\xDCst\xFCnlik',
      exception: '\xDDal\u0148y\u015Flyk',
      warning: 'Du\xFDdury\u015F'
    },
    // Skelet
    skeleton: {
      loading: '\xDD\xFCklen\xFD\xE4r...'
    },
    // Boş
    empty: {
      description: 'Maglumat \xFDok',
      noData: 'Maglumat \xFDok',
      noResult: 'Netije \xFDok',
      networkError: 'Tor \xFDal\u0148y\u015Flygy',
      serverError: 'Serwer \xFDal\u0148y\u015Flygy'
    },
    // Netije
    result: {
      success: '\xDCst\xFCnlik',
      error: '\xDDal\u0148y\u015Flyk',
      warning: 'Du\xFDdury\u015F',
      info: 'Maglumat',
      backHome: 'Ba\u015F sahypa ga\xFDtmak'
    },
    // Suw agşy
    waterfall: {
      loading: '\xDD\xFCklen\xFD\xE4r...',
      noMore: 'Has maglumat \xFDok',
      empty: 'Maglumat \xFDok'
    },
    // Düşündirişler
    descriptions: {
      colon: ':'
    },
    // Slýder
    slider: {
      tipFormatter: '{value}'
    },
    // Geçiriji
    switch: {
      on: 'ON',
      off: 'OFF'
    },
    // Barlag gutusy
    checkbox: {
      selectAll: 'Hemmesini sa\xFDlamak'
    },
    // Radio
    radio: {},
    // Menýu
    menu: {
      collapse: 'Men\xFDuny ki\xE7eltmek',
      expand: 'Men\xFDuny gi\u0148eltmek'
    },
    // Karta
    card: {
      collapse: 'Ki\xE7eltmek',
      expand: 'Gi\u0148eltmek'
    },
    // Kiçeltmek
    collapse: {
      expand: 'Gi\u0148eltmek',
      collapse: 'Ki\xE7eltmek'
    },
    // Gural maslahaty
    tooltip: {},
    // Popover
    popover: {},
    // Nyşan
    badge: {},
    // Awatar
    avatar: {
      error: '\xDD\xFCkleme \xFDal\u0148y\u015Flygy'
    },
    // Suw nyşany
    watermark: {},
    // Bölüjik
    divider: {},
    // Karusel
    carousel: {
      prev: '\xD6\u0148ki',
      next: 'Indiki'
    },
    // Marquee
    marquee: {},
    // Berkemek
    affix: {},
    // Ýakor
    anchor: {},
    // Mention
    mention: {
      placeholder: 'Girizi\u0148',
      loading: '\xDD\xFCklen\xFD\xE4r...',
      noData: 'Maglumat \xFDok'
    },
    // AI Components
    ai: {
      bubble: {
        citations: 'Sitatlar'
      },
      mention: {
        placeholder: '@ Agent, Resminama \xFDa-da Tablisany bell\xE4\u0148...',
        agent: 'Agent',
        document: 'Resminama',
        table: 'Tablisa',
        knowledge: 'Bilim'
      },
      codeBlock: {
        copyCode: 'Kody g\xF6\xE7\xFCr',
        copied: 'G\xF6\xE7\xFCrildi!',
        run: 'Kody i\u015Flet',
        edit: '\xDC\xFDtget',
        save: 'Sakla',
        cancel: 'Cancel'
      },
      codeRunner: {
        run: 'I\u015Flet',
        stop: 'Dur',
        clear: 'T\xE4zele',
        reset: 'Resetle',
        placeholder: 'Kody i\u015Fletmek \xFC\xE7in I\u015Flet d\xFCwmesine basy\u0148...'
      },
      sender: {
        placeholder: 'Habarlar ugrat...',
        dragTip: 'Fa\xFDllary \xFD\xFCklemek \xFC\xE7in go\xFDberi\u0148'
      },
      thoughtChain: {
        thoughtProcess: 'O\xFDlanma prosesi',
        thinking: 'O\xFDlan\xFDar...',
        defaultTitle: 'T\xE4ze \xE4dim',
        addNode: '\xC4dim go\u015F'
      },
      thinking: {
        start: 'O\xFDlanmaga ba\u015Fla',
        thinking: 'O\xFDlan\xFDar...',
        complete: 'O\xFDlanma tamamlandy',
        error: 'O\xFDlanma s\xE4wligi'
      },
      welcome: {
        title: 'Salam, men YH AI',
        description:
          'Kodlamada, resminamalary terjime etmekde \xFDa-da d\xF6rediji \xFDazuwda size k\xF6mek edip bilerin. Bu g\xFCn size n\xE4me edip bilerin?'
      },
      action: {
        copy: 'G\xF6\xE7\xFCr',
        regenerate: 'T\xE4zeden d\xF6ret',
        share: 'Pa\xFDla\u015F',
        like: 'Halan',
        dislike: 'Halanma',
        edit: '\xDC\xFDtget',
        delete: 'Poz'
      },
      artifacts: {
        preview: '\xD6\u0148\xFCnden g\xF6rmek',
        inline: 'Setirde',
        code: '\xC7e\u015Fme kody',
        versions: 'Wersi\xFDalar',
        rendering: 'Komponent g\xF6rkezil\xFD\xE4r...',
        renderingChart: 'Grafik g\xF6rkezil\xFD\xE4r...',
        renderingCanvas: 'Tuwralyk ta\xFD\xFDarlanyl\xFD\xE4r...'
      },
      voice: {
        trigger: 'S\xF6\xFDlemek \xFC\xE7in basy\u0148',
        listening: 'Di\u0148le\xFD\xE4r...'
      },
      agent: {
        uses: 'ulany\u015Flar',
        use: '\u015Eimdi ulan',
        favorite: 'Halanan',
        unfavorite: 'Halananlardan a\xFDyr',
        share: 'Pa\xFDla\u015F',
        online: 'Onla\xFDn',
        offline: 'Ofla\xFDn',
        busy: 'Me\u015Fgul',
        verified: 'Tassyklanan',
        rating: 'Re\xFDting',
        reviews: 'teswirlar',
        responseTime: 'Orta jogap wagty',
        ms: 'ms'
      },
      sources: {
        references: 'Ssalgalar',
        referencedSources: 'Ssalga berilen \xE7e\u015Fmeler',
        relevant: 'Baglany\u015Fykly',
        viewOriginal: 'Aslyny g\xF6r',
        showAll: 'Hemmesini g\xF6r',
        more: 'k\xE4bir \xE7e\u015Fmeler',
        drawerTitle: 'Ssalgalar',
        expandMore: 'K\xF6pr\xE4k g\xF6r',
        collapseMore: '\xDDygy\u015F',
        noSources: '\xC7e\u015Fme \xFDok',
        today: '\u015Eu g\xFCn',
        last7Days: 'So\u0148ky 7 g\xFCn',
        last30Days: 'So\u0148ky 30 g\xFCn',
        earlier: '\xD6\u0148',
        pinned: 'Pipet'
      },
      conversations: {
        today: '\u015Eu g\xFCn',
        last7Days: 'So\u0148ky 7 g\xFCn',
        last30Days: 'So\u0148ky 30 g\xFCn',
        earlier: '\xD6\u0148',
        pinned: 'Pipet',
        pin: 'Pip et',
        unpin: 'Pipden a\xFDyr',
        newConversation: 'T\xE4ze s\xF6hbet',
        rename: 'Ady \xFC\xFDtget',
        delete: 'Poz',
        deleteConfirm: '\u015Eu s\xF6hbeti pozmagy tassykla\u0148?'
      }
    }
  }
}
export default tk
