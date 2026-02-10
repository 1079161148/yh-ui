import type { Language } from '../index'

export const tk: Language = {
  name: 'tk',
  yh: {
    // Umumy
    common: {
      yes: 'Hawa',
      no: 'Ýok',
      confirm: 'Tassyklamak',
      cancel: 'Ýatyrmak',
      loading: 'Ýüklenýär',
      close: 'Ýapmak',
      clear: 'Arassalamak',
      reset: 'Başdan düzmek',
      save: 'Saklamak',
      delete: 'Pozmak',
      edit: 'Üýtgetmek',
      add: 'Goşmak',
      search: 'Gözlemek',
      refresh: 'Täzelemek',
      expand: 'Giňeltmek',
      collapse: 'Kiçeltmek',
      more: 'Has köp',
      noData: 'Maglumat ýok',
      noMatch: 'Gabat gelýän maglumat ýok',
      selectAll: 'Hemmesini saýlamak',
      unselectAll: 'Saýlamagy aýyrmak'
    },
    // Reňk saýlaýjy
    colorpicker: {
      confirm: 'Bolýar',
      clear: 'Arassalamak',
      eyeDropper: 'Göz damjasy',
      suggestionDark: 'Ak tekstiň has gowy',
      suggestionLight: 'Gara tekstiň has gowy',
      recentColors: 'Soňky reňkler',
      presetColors: 'Öňünden düşürilen reňkler'
    },
    // Sene saýlaýjy
    datepicker: {
      now: 'Şu wagt',
      today: 'Şu gün',
      cancel: 'Ýatyrmak',
      clear: 'Arassalamak',
      confirm: 'Bolýar',
      selectDate: 'Sene saýlaň',
      selectTime: 'Wagt saýlaň',
      startDate: 'Başlanýan sene',
      startTime: 'Başlanýan wagt',
      endDate: 'Gutarýan sene',
      endTime: 'Gutarýan wagt',
      year: '',
      month: '',
      day: '',
      week: 'Hepde',
      monthBeforeYear: true,
      prevYear: 'Öňki ýyl',
      nextYear: 'Indiki ýyl',
      prevMonth: 'Öňki aý',
      nextMonth: 'Indiki aý',
      weeks: {
        sun: 'Ýek',
        mon: 'Duş',
        tue: 'Siş',
        wed: 'Çar',
        thu: 'Pen',
        fri: 'Ann',
        sat: 'Şen'
      },
      months: {
        jan: 'Ýan',
        feb: 'Few',
        mar: 'Mar',
        apr: 'Apr',
        may: 'Maý',
        jun: 'Iýun',
        jul: 'Iýul',
        aug: 'Awg',
        sep: 'Sen',
        oct: 'Okt',
        nov: 'Noý',
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
      confirm: 'Bolýar',
      cancel: 'Ýatyrmak',
      now: 'Şu wagt',
      placeholder: 'Wagt saýlaň',
      startPlaceholder: 'Başlanýan wagt',
      endPlaceholder: 'Gutarýan wagt',
      selectTime: 'Wagt saýlaň'
    },
    // Wagt saýlamak
    timeselect: {
      placeholder: 'Wagt saýlaň'
    },
    // Agaj
    tree: {
      emptyText: 'Maglumat ýok',
      loading: 'Ýüklenýär...',
      checkAll: 'Hemmesini barlaň',
      uncheckAll: 'Barlamagy aýyrmak',
      expandAll: 'Hemmesini giňeltmek',
      collapseAll: 'Hemmesini kiçeltmek'
    },
    // Agaj saýlaýjy
    treeselect: {
      placeholder: 'Saýlaň',
      emptyText: 'Maglumat ýok',
      loading: 'Ýüklenýär...',
      noMatch: 'Gabat gelýän maglumat ýok'
    },
    // Kalendar
    calendar: {
      prevMonth: 'Öňki aý',
      nextMonth: 'Indiki aý',
      prevYear: 'Öňki ýyl',
      nextYear: 'Indiki ýyl',
      today: 'Şu gün',
      week: 'Hepde',
      holiday: 'Baýram',
      workday: 'Iş',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Ýek',
        mon: 'Duş',
        tue: 'Siş',
        wed: 'Çar',
        thu: 'Pen',
        fri: 'Ann',
        sat: 'Şen'
      }
    },
    // Awto doldurma
    autocomplete: {
      loading: 'Ýüklenýär...',
      placeholder: 'Ýazmagyňyzy haýyş edýäris',
      noData: 'Maglumat ýok',
      noMatch: 'Gabat gelýän maglumat ýok'
    },
    // Geri sanama
    countdown: {
      days: 'günler',
      hours: 'sagatlar',
      minutes: 'minutlar',
      seconds: 'sekuntlar',
      milliseconds: 'millisekuntlar',
      finished: 'Tamamlandy'
    },
    // Kaskad
    cascader: {
      noMatch: 'Gabat gelýän maglumat ýok',
      placeholder: 'Saýlaň',
      loading: 'Ýüklenýär...',
      noData: 'Maglumat ýok'
    },
    // Geçirmek
    transfer: {
      noMatch: 'Gabat gelýän maglumat ýok',
      noData: 'Maglumat ýok',
      titles: ['Sanaw 1', 'Sanaw 2'],
      filterPlaceholder: 'Açar söz giriziň',
      noCheckedFormat: '{total} element',
      hasCheckedFormat: '{checked}/{total} saýlandy',
      searchPlaceholder: 'Açar söz giriziň'
    },
    // Tabela
    table: {
      emptyText: 'Maglumat ýok',
      confirmFilter: 'Tassyklamak',
      resetFilter: 'Başdan düzmek',
      clearFilter: 'Hemmesi',
      sumText: 'Jemi',
      loading: 'Ýüklenýär...',
      index: 'Indeks',
      print: 'Çap etmek',
      cancel: 'Ýatyrmak',
      preview: 'Çap öňünden görünişi',
      printTime: 'Çap wagty',
      total: 'Jemi {total} element',
      page: 'Sahypa {page}',
      yes: 'Hawa',
      no: 'Ýok',
      // Gural paneli
      toolbar: {
        refresh: 'Täzelemek',
        density: 'Gýyglylyk',
        densityDefault: 'Bellenen',
        densityLarge: 'Uly',
        densitySmall: 'Kiçi',
        columnSetting: 'Sütun sazlamalary',
        fullscreen: 'Doly ekran',
        exitFullscreen: 'Doly ekrandan çykmak',
        export: 'Eksport',
        import: 'Import',
        search: 'Gözlemek',
        searchPlaceholder: 'Gözlemek üçin açar sözler giriziň'
      },
      // Filter
      filter: {
        selectAll: 'Hemmesini saýlamak',
        selectInvert: 'Saýlamany tersine çevirmek',
        empty: 'Boş',
        notEmpty: 'Boş däl',
        contains: 'Öz içine alýar',
        notContains: 'Öz içine almýar',
        equals: 'Deň',
        notEquals: 'Deň däl',
        startsWith: 'Başlanýar',
        endsWith: 'Gutaryar',
        greaterThan: 'Uly',
        lessThan: 'Kiçi',
        between: 'Aralygynda'
      },
      // Tertiplemek
      sort: {
        asc: 'Artýan',
        desc: 'Azýan',
        clear: 'Tertiplemäni arassalamak'
      },
      // Eksport
      export: {
        title: 'Maglumat eksport etmek',
        filename: 'Faýl ady',
        type: 'Faýl görnüşi',
        scope: 'Eksport çäkleri',
        scopeAll: 'Hemme maglumat',
        scopeSelected: 'Saýlanan maglumat',
        scopeCurrentPage: 'Häzirki sahypa',
        includeHeader: 'Başlygy goşmak',
        exporting: 'Eksport edilýär...',
        success: 'Eksport üstünlikli',
        error: 'Eksport ýalňyşlygy'
      },
      // Import
      import: {
        title: 'Maglumat import etmek',
        selectFile: 'Faýl saýlaň',
        dragTip: 'Ýüklemek üçin faýly şu ýere basyň ýa-da süýüň',
        importing: 'Import edilýär...',
        success: 'Import üstünlikli',
        error: 'Import ýalňyşlygy',
        preview: 'Maglumat öňünden görünişi',
        confirm: 'Importy tassyklamak'
      },
      // Çap
      printConfig: {
        title: 'Çap sazlamalary',
        pageTitle: 'Sahypa ady',
        pageHeader: 'Başlyk',
        pageFooter: 'Aşaklyk',
        printAll: 'Hemmesini çap etmek',
        printSelected: 'Saýlanany çap etmek',
        printCurrentPage: 'Häzirki sahypany çap etmek',
        landscape: 'Gorizontal',
        portrait: 'Wertikal',
        printing: 'Çap edilýär...'
      },
      // Sütun sazlamalary
      columnSetting: {
        title: 'Sütun sazlamalary',
        showAll: 'Hemmesini görkezmek',
        hideAll: 'Hemmesini gizlemek',
        reset: 'Başdan düzmek',
        fixedLeft: 'Çepe berkemek',
        fixedRight: 'Saga berkemek',
        unfixed: 'Berkemäni aýyrmak'
      },
      // Kontekst menýu
      contextMenu: {
        copy: 'Kopýalamak',
        copyRow: 'Setiri kopýalamak',
        copyCell: 'Ýaçkany kopýalamak',
        paste: 'Ýapyşdyrmak',
        insertRowAbove: 'Üstüne setir goşmak',
        insertRowBelow: 'Aşagyna setir goşmak',
        deleteRow: 'Setiri pozmak',
        deleteSelectedRows: 'Saýlanan setirleri pozmak',
        exportSelected: 'Saýlanany eksport etmek'
      },
      // Saýlamak
      selection: {
        selectAll: 'Hemmesini saýlamak',
        selectInvert: 'Saýlamany tersine çevirmek',
        selectNone: 'Saýlamany arassalamak',
        selected: '{count} element saýlandy'
      },
      // Giňeltmek
      expand: {
        expandAll: 'Hemmesini giňeltmek',
        collapseAll: 'Hemmesini kiçeltmek'
      },
      // Agaj
      tree: {
        expandAll: 'Hemmesini giňeltmek',
        collapseAll: 'Hemmesini kiçeltmek',
        expandLevel: '{level} derejä giňeltmek'
      },
      // Süýürmek
      drag: {
        dragTip: 'Tertibi üýtgetmek üçin süýüň',
        dropTip: 'Ýerleşdirmek üçin goýuň'
      }
    },
    // Habar gutusy
    messagebox: {
      title: 'Habar',
      confirm: 'Bolýar',
      cancel: 'Ýatyrmak',
      close: 'Ýapmak',
      error: 'Nädogry girizme',
      alert: 'Duýduryş',
      prompt: 'Teklip',
      inputPlaceholder: 'Ýazmagyňyzy haýyş edýäris'
    },
    // Ýüklemek
    upload: {
      deleteTip: 'pozmak üçin delete basyň',
      delete: 'Pozmak',
      preview: 'Öňünden görüniş',
      continue: 'Dowam etdirmek',
      upload: 'Ýüklemek üçin basyň',
      tip: '<em>Ýüklemek</em> üçin faýly şu ýere basyň ýa-da süýüň',
      dragTip: 'Faýly şu ýere goýuň ýa-da ýüklemek üçin basyň',
      uploading: 'Ýüklenýär...',
      success: 'Ýükleme üstünlikli',
      error: 'Ýükleme ýalňyşlygy',
      retry: 'Täzeden synanyşmak',
      cancel: 'Ýüklemäni ýatyrmak',
      fileTypeError: 'Faýl görnüşi goldanylmaýar',
      fileSizeError: 'Faýl ölçegi çägi geçýär',
      fileCountError: 'Faýl sany çägi geçýär'
    },
    // Forma
    form: {
      validationFailed: 'Barlama şowsuz',
      required: 'Möhüm',
      pleaseInput: 'Ýazmagyňyzy haýyş edýäris',
      pleaseSelect: 'Saýlamagyňyzy haýyş edýäris'
    },
    // Düwme
    button: {
      loading: 'Ýüklenýär...'
    },
    // Girizmek
    input: {
      placeholder: 'Ýazmagyňyzy haýyş edýäris',
      clear: 'Arassalamak',
      showPassword: 'Paroly görkezmek',
      hidePassword: 'Paroly gizlemek',
      copy: 'Kopýalamak',
      copied: 'Kopýalandy'
    },
    // San girizmek
    inputnumber: {
      placeholder: 'San ýazmagyňyzy haýyş edýäris',
      increase: 'Köpeýtmek',
      decrease: 'Azaltmak'
    },
    // Bellik girizmek
    inputtag: {
      placeholder: 'Ýazmagyňyzy haýyş edýäris',
      add: 'Goşmak',
      remove: 'Aýyrmak'
    },
    // Çörüň ýoly
    breadcrumb: {
      label: 'Çörüň ýoly',
      more: 'Has köp'
    },
    // Ýokary gaýtmak
    backtop: {
      text: 'Ýokary gaýtmak'
    },
    // Saýlamak
    select: {
      placeholder: 'Saýlamagyňyzy haýyş edýäris',
      noData: 'Maglumat ýok',
      loading: 'Ýüklenýär...',
      noMatch: 'Gabat gelýän maglumat ýok',
      selectAll: 'Hemmesini saýlamak',
      clearAll: 'Hemmesini arassalamak'
    },
    // Sahypalama
    pagination: {
      goto: 'Gaýtmak',
      page: '',
      total: 'Jemi {total}',
      pageSize: '/sahypa',
      prev: 'Öňki',
      next: 'Indiki',
      first: 'Birinjisi',
      last: 'Soňkysy',
      pageClassifier: ''
    },
    // Tassyklama popup
    popconfirm: {
      confirm: 'Bolýar',
      cancel: 'Ýatyrmak',
      dontAskAgain: 'Täzeden soramaň'
    },
    // Dialog
    dialog: {
      confirm: 'Bolýar',
      cancel: 'Ýatyrmak',
      close: 'Ýapmak',
      maximize: 'Ulylaşdyrmak',
      restore: 'Yzyna getirmek'
    },
    // Çekmeje
    drawer: {
      close: 'Ýapmak',
      confirm: 'Bolýar',
      cancel: 'Ýatyrmak'
    },
    // Aşak menýu
    dropdown: {
      loading: 'Ýüklenýär...'
    },
    // Surat
    image: {
      error: 'ŞOWSYZ',
      loading: 'Ýüklenýär...',
      preview: 'Öňünden görüniş',
      zoomIn: 'Ulylaşdyrmak',
      zoomOut: 'Kiçeltmek',
      rotateLeft: 'Çepe aýlamak',
      rotateRight: 'Saga aýlamak',
      originalSize: 'Asyl ölçegi',
      fullscreen: 'Doly ekran'
    },
    // Surat görüjisi
    imageviewer: {
      close: 'Ýapmak',
      prev: 'Öňki',
      next: 'Indiki',
      zoomIn: 'Ulylaşdyrmak',
      zoomOut: 'Kiçeltmek',
      rotateLeft: 'Çepe aýlamak',
      rotateRight: 'Saga aýlamak',
      reset: 'Başdan düzmek',
      fullscreen: 'Doly ekran',
      exitFullscreen: 'Doly ekrandan çykmak'
    },
    // Çäksiz skroll
    infinitescroll: {
      loading: 'Ýüklenýär...',
      finished: 'Has maglumat ýok',
      error: 'Ýükleme ýalňyşlygy, täzeden synanyşmak üçin basyň',
      retry: 'Täzeden synanyşmak üçin basyň'
    },
    // Habar
    message: {
      close: 'Ýapmak'
    },
    // Bildiriş
    notification: {
      close: 'Ýapmak'
    },
    // Ýüklemek
    loading: {
      text: 'Ýüklenýär...'
    },
    // Aýlanma
    spin: {
      text: 'Ýüklenýär...'
    },
    // Bahalandyrmak
    rate: {
      texts: ['Örän ýaman', 'Gynançly', 'Ortaça', 'Razylaşdyrylan', 'Haýran galdyrylan']
    },
    // Duýduryş
    alert: {
      close: 'Ýapmak'
    },
    // Bellik
    tag: {
      close: 'Ýapmak'
    },
    // Tablar
    tabs: {
      close: 'Ýapmak',
      add: 'Goşmak',
      more: 'Has köp'
    },
    // Basgançaklar
    steps: {
      finish: 'Tamamlandy',
      process: 'Dowam edýär',
      wait: 'Garaşmak',
      error: 'Ýalňyşlyk'
    },
    // Öňe gitmek
    progress: {
      success: 'Üstünlik',
      exception: 'Ýalňyşlyk',
      warning: 'Duýduryş'
    },
    // Skelet
    skeleton: {
      loading: 'Ýüklenýär...'
    },
    // Boş
    empty: {
      description: 'Maglumat ýok',
      noData: 'Maglumat ýok',
      noResult: 'Netije ýok',
      networkError: 'Tor ýalňyşlygy',
      serverError: 'Serwer ýalňyşlygy'
    },
    // Netije
    result: {
      success: 'Üstünlik',
      error: 'Ýalňyşlyk',
      warning: 'Duýduryş',
      info: 'Maglumat',
      backHome: 'Baş sahypa gaýtmak'
    },
    // Suw agşy
    waterfall: {
      loading: 'Ýüklenýär...',
      noMore: 'Has maglumat ýok',
      empty: 'Maglumat ýok'
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
      selectAll: 'Hemmesini saýlamak'
    },
    // Radio
    radio: {},
    // Menýu
    menu: {
      collapse: 'Menýuny kiçeltmek',
      expand: 'Menýuny giňeltmek'
    },
    // Karta
    card: {
      collapse: 'Kiçeltmek',
      expand: 'Giňeltmek'
    },
    // Kiçeltmek
    collapse: {
      expand: 'Giňeltmek',
      collapse: 'Kiçeltmek'
    },
    // Gural maslahaty
    tooltip: {},
    // Popover
    popover: {},
    // Nyşan
    badge: {},
    // Awatar
    avatar: {
      error: 'Ýükleme ýalňyşlygy'
    },
    // Suw nyşany
    watermark: {},
    // Bölüjik
    divider: {},
    // Karusel
    carousel: {
      prev: 'Öňki',
      next: 'Indiki'
    },
    // Marquee
    marquee: {},
    // Berkemek
    affix: {},
    // Ýakor
    anchor: {}
  }
}

export default tk
