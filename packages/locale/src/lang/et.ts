import type { Language } from '../index'

export const et: Language = {
  name: 'et',
  yh: {
    // Üldine
    common: {
      yes: 'Jah',
      no: 'Ei',
      confirm: 'Kinnita',
      cancel: 'Tühista',
      loading: 'Laadimine',
      close: 'Sulge',
      clear: 'Tühjenda',
      reset: 'Lähtesta',
      save: 'Salvesta',
      delete: 'Kustuta',
      edit: 'Redigeeri',
      add: 'Lisa',
      search: 'Otsi',
      refresh: 'Värskenda',
      expand: 'Laienda',
      collapse: 'Ahenda',
      more: 'Rohkem',
      noData: 'Andmeid pole',
      noMatch: 'Sobivaid andmeid pole',
      selectAll: 'Vali kõik',
      unselectAll: 'Tühista kõik valikud'
    },
    // Värvi valik
    colorpicker: {
      confirm: 'OK',
      clear: 'Tühjenda',
      eyeDropper: 'Pipett',
      suggestionDark: 'Valge tekst on parem',
      suggestionLight: 'Must tekst on parem',
      recentColors: 'Hiljutised värvid',
      presetColors: 'Eelseadistatud värvid'
    },
    // Kuupäeva valik
    datepicker: {
      now: 'Nüüd',
      today: 'Täna',
      cancel: 'Tühista',
      clear: 'Tühjenda',
      confirm: 'OK',
      selectDate: 'Vali kuupäev',
      selectTime: 'Vali kellaaeg',
      startDate: 'Alguskuupäev',
      startTime: 'Algusaeg',
      endDate: 'Lõppkuupäev',
      endTime: 'Lõppaeg',
      year: '',
      month: '',
      day: '',
      week: 'Nädal',
      monthBeforeYear: true,
      prevYear: 'Eelmine aasta',
      nextYear: 'Järgmine aasta',
      prevMonth: 'Eelmine kuu',
      nextMonth: 'Järgmine kuu',
      weeks: {
        sun: 'P',
        mon: 'E',
        tue: 'T',
        wed: 'K',
        thu: 'N',
        fri: 'R',
        sat: 'L'
      },
      months: {
        jan: 'Jaan',
        feb: 'Veebr',
        mar: 'Märts',
        apr: 'Apr',
        may: 'Mai',
        jun: 'Juuni',
        jul: 'Juuli',
        aug: 'Aug',
        sep: 'Sept',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Dets'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Kellaaja valik
    timepicker: {
      confirm: 'OK',
      cancel: 'Tühista',
      now: 'Nüüd',
      placeholder: 'Vali kellaaeg',
      startPlaceholder: 'Algusaeg',
      endPlaceholder: 'Lõppaeg',
      selectTime: 'Vali kellaaeg'
    },
    // Kellaaja valik
    timeselect: {
      placeholder: 'Vali kellaaeg'
    },
    // Puu
    tree: {
      emptyText: 'Andmeid pole',
      loading: 'Laadimine...',
      checkAll: 'Märgi kõik',
      uncheckAll: 'Eemalda kõik märgid',
      expandAll: 'Laienda kõik',
      collapseAll: 'Ahenda kõik'
    },
    // Puu valik
    treeselect: {
      placeholder: 'Vali',
      emptyText: 'Andmeid pole',
      loading: 'Laadimine...',
      noMatch: 'Sobivaid andmeid pole'
    },
    // Kalender
    calendar: {
      prevMonth: 'Eelmine kuu',
      nextMonth: 'Järgmine kuu',
      prevYear: 'Eelmine aasta',
      nextYear: 'Järgmine aasta',
      today: 'Täna',
      week: 'Nädal',
      holiday: 'Puhkepäev',
      workday: 'Tööpäev',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'P',
        mon: 'E',
        tue: 'T',
        wed: 'K',
        thu: 'N',
        fri: 'R',
        sat: 'L'
      }
    },
    // Automaattäide
    autocomplete: {
      loading: 'Laadimine...',
      placeholder: 'Palun sisesta',
      noData: 'Andmeid pole',
      noMatch: 'Sobivaid andmeid pole'
    },
    // Loendus
    countdown: {
      days: 'päeva',
      hours: 'tundi',
      minutes: 'minutit',
      seconds: 'sekundit',
      milliseconds: 'millisekundit',
      finished: 'Lõpetatud'
    },
    // Kaskaad
    cascader: {
      noMatch: 'Sobivaid andmeid pole',
      placeholder: 'Vali',
      loading: 'Laadimine...',
      noData: 'Andmeid pole'
    },
    // Ülekanne
    transfer: {
      noMatch: 'Sobivaid andmeid pole',
      noData: 'Andmeid pole',
      titles: ['Nimekiri 1', 'Nimekiri 2'],
      filterPlaceholder: 'Sisesta märksõna',
      noCheckedFormat: '{total} üksust',
      hasCheckedFormat: '{checked}/{total} valitud',
      searchPlaceholder: 'Sisesta märksõna'
    },
    // Tabel
    table: {
      emptyText: 'Andmeid pole',
      confirmFilter: 'Kinnita',
      resetFilter: 'Lähtesta',
      clearFilter: 'Kõik',
      sumText: 'Summa',
      loading: 'Laadimine...',
      index: 'Indeks',
      print: 'Prindi',
      cancel: 'Tühista',
      preview: 'Printimise eelvaade',
      printTime: 'Printimise aeg',
      total: 'Kokku {total} üksust',
      page: 'Lehekülg {page}',
      yes: 'Jah',
      no: 'Ei',
      // Tööriistariba
      toolbar: {
        refresh: 'Värskenda',
        density: 'Tihedus',
        densityDefault: 'Vaikimisi',
        densityLarge: 'Suur',
        densitySmall: 'Väike',
        columnSetting: 'Veeru seaded',
        fullscreen: 'Täisekraan',
        exitFullscreen: 'Välju täisekraanist',
        export: 'Ekspordi',
        import: 'Impordi',
        search: 'Otsi',
        searchPlaceholder: 'Sisesta märksõnad otsimiseks'
      },
      // Filter
      filter: {
        selectAll: 'Vali kõik',
        selectInvert: 'Pööra valik ümber',
        empty: 'On tühi',
        notEmpty: 'Ei ole tühi',
        contains: 'Sisaldab',
        notContains: 'Ei sisalda',
        equals: 'Võrdub',
        notEquals: 'Ei võrdu',
        startsWith: 'Algab',
        endsWith: 'Lõpeb',
        greaterThan: 'Suurem kui',
        lessThan: 'Väiksem kui',
        between: 'Vahel'
      },
      // Sorteerimine
      sort: {
        asc: 'Kasvavalt',
        desc: 'Kahanevalt',
        clear: 'Tühjenda sorteerimine'
      },
      // Eksport
      export: {
        title: 'Ekspordi andmed',
        filename: 'Faili nimi',
        type: 'Faili tüüp',
        scope: 'Ekspordi ulatus',
        scopeAll: 'Kõik andmed',
        scopeSelected: 'Valitud andmed',
        scopeCurrentPage: 'Praegune lehekülg',
        includeHeader: 'Lisa päis',
        exporting: 'Eksportimine...',
        success: 'Eksport õnnestus',
        error: 'Eksport ebaõnnestus'
      },
      // Import
      import: {
        title: 'Impordi andmed',
        selectFile: 'Vali fail',
        dragTip: 'Klõpsa või lohista fail siia üleslaadimiseks',
        importing: 'Importimine...',
        success: 'Import õnnestus',
        error: 'Import ebaõnnestus',
        preview: 'Andmete eelvaade',
        confirm: 'Kinnita import'
      },
      // Printimine
      printConfig: {
        title: 'Printimise seaded',
        pageTitle: 'Lehekülje pealkiri',
        pageHeader: 'Päis',
        pageFooter: 'Jalus',
        printAll: 'Prindi kõik',
        printSelected: 'Prindi valitud',
        printCurrentPage: 'Prindi praegune lehekülg',
        landscape: 'Rõhtne',
        portrait: 'Püstine',
        printing: 'Printimine...'
      },
      // Veeru seaded
      columnSetting: {
        title: 'Veeru seaded',
        showAll: 'Näita kõiki',
        hideAll: 'Peida kõik',
        reset: 'Lähtesta',
        fixedLeft: 'Kinnita vasakule',
        fixedRight: 'Kinnita paremale',
        unfixed: 'Vabasta'
      },
      // Kontekstimenüü
      contextMenu: {
        copy: 'Kopeeri',
        copyRow: 'Kopeeri rida',
        copyCell: 'Kopeeri lahtri',
        paste: 'Kleebi',
        insertRowAbove: 'Lisa rida üles',
        insertRowBelow: 'Lisa rida alla',
        deleteRow: 'Kustuta rida',
        deleteSelectedRows: 'Kustuta valitud read',
        exportSelected: 'Ekspordi valitud'
      },
      // Valik
      selection: {
        selectAll: 'Vali kõik',
        selectInvert: 'Pööra valik ümber',
        selectNone: 'Tühjenda valik',
        selected: '{count} üksust valitud'
      },
      // Laiendamine
      expand: {
        expandAll: 'Laienda kõik',
        collapseAll: 'Ahenda kõik'
      },
      // Puu
      tree: {
        expandAll: 'Laienda kõik',
        collapseAll: 'Ahenda kõik',
        expandLevel: 'Laienda tasemeni {level}'
      },
      // Lohistamine
      drag: {
        dragTip: 'Lohista ümberkorraldamiseks',
        dropTip: 'Lase paigutamiseks'
      }
    },
    // Sõnumikast
    messagebox: {
      title: 'Sõnum',
      confirm: 'OK',
      cancel: 'Tühista',
      close: 'Sulge',
      error: 'Vigane sisend',
      alert: 'Hoiatus',
      prompt: 'Küsimus',
      inputPlaceholder: 'Palun sisesta'
    },
    // Üleslaadimine
    upload: {
      deleteTip: 'vajuta delete kustutamiseks',
      delete: 'Kustuta',
      preview: 'Eelvaade',
      continue: 'Jätka',
      upload: 'Klõpsa üleslaadimiseks',
      tip: 'Klõpsa või lohista fail sellele alale <em>üleslaadimiseks</em>',
      dragTip: 'Lase fail siia või klõpsa üleslaadimiseks',
      uploading: 'Laadimine...',
      success: 'Üleslaadimine õnnestus',
      error: 'Üleslaadimine ebaõnnestus',
      retry: 'Proovi uuesti',
      cancel: 'Tühista üleslaadimine',
      fileTypeError: 'Faili tüüpi ei toetata',
      fileSizeError: 'Faili suurus ületab piirangu',
      fileCountError: 'Failide arv ületab piirangu'
    },
    // Vorm
    form: {
      validationFailed: 'Kontroll ebaõnnestus',
      required: 'Nõutud',
      pleaseInput: 'Palun sisesta',
      pleaseSelect: 'Palun vali'
    },
    // Nupp
    button: {
      loading: 'Laadimine...'
    },
    // Sisend
    input: {
      placeholder: 'Palun sisesta',
      clear: 'Tühjenda',
      showPassword: 'Näita parooli',
      hidePassword: 'Peida parool',
      copy: 'Kopeeri',
      copied: 'Kopeeritud'
    },
    // Numbri sisend
    inputnumber: {
      placeholder: 'Palun sisesta number',
      increase: 'Suurenda',
      decrease: 'Vähenda'
    },
    // Sildi sisend
    inputtag: {
      placeholder: 'Palun sisesta',
      add: 'Lisa',
      remove: 'Eemalda'
    },
    // Navigeerimistee
    breadcrumb: {
      label: 'Navigeerimistee',
      more: 'Rohkem'
    },
    // Tagasi üles
    backtop: {
      text: 'Tagasi üles'
    },
    // Valik
    select: {
      placeholder: 'Palun vali',
      noData: 'Andmeid pole',
      loading: 'Laadimine...',
      noMatch: 'Sobivaid andmeid pole',
      selectAll: 'Vali kõik',
      clearAll: 'Tühjenda kõik'
    },
    // Lehekülgede nummerdamine
    pagination: {
      goto: 'Mine',
      page: '',
      total: 'Kokku {total}',
      pageSize: '/lehekülg',
      prev: 'Eelmine',
      next: 'Järgmine',
      first: 'Esimene',
      last: 'Viimane',
      pageClassifier: ''
    },
    // Kinnituse hüpikaken
    popconfirm: {
      confirm: 'OK',
      cancel: 'Tühista',
      dontAskAgain: 'Ära küsi enam'
    },
    // Dialoog
    dialog: {
      confirm: 'OK',
      cancel: 'Tühista',
      close: 'Sulge',
      maximize: 'Maksimeeri',
      restore: 'Taasta'
    },
    // Sahtel
    drawer: {
      close: 'Sulge',
      confirm: 'OK',
      cancel: 'Tühista'
    },
    // Ripmenüü
    dropdown: {
      loading: 'Laadimine...'
    },
    // Pilt
    image: {
      error: 'EBAÕNNESTUS',
      loading: 'Laadimine...',
      preview: 'Eelvaade',
      zoomIn: 'Suurenda',
      zoomOut: 'Vähenda',
      rotateLeft: 'Pööra vasakule',
      rotateRight: 'Pööra paremale',
      originalSize: 'Originaalne suurus',
      fullscreen: 'Täisekraan'
    },
    // Pildivaatur
    imageviewer: {
      close: 'Sulge',
      prev: 'Eelmine',
      next: 'Järgmine',
      zoomIn: 'Suurenda',
      zoomOut: 'Vähenda',
      rotateLeft: 'Pööra vasakule',
      rotateRight: 'Pööra paremale',
      reset: 'Lähtesta',
      fullscreen: 'Täisekraan',
      exitFullscreen: 'Välju täisekraanist'
    },
    // Lõpmatu kerimine
    infinitescroll: {
      loading: 'Laadimine...',
      finished: 'Rohkem andmeid pole',
      error: 'Laadimine ebaõnnestus, klõpsa uuesti proovimiseks',
      retry: 'Klõpsa uuesti proovimiseks'
    },
    // Sõnum
    message: {
      close: 'Sulge'
    },
    // Teavitus
    notification: {
      close: 'Sulge'
    },
    // Laadimine
    loading: {
      text: 'Laadimine...'
    },
    // Pöörlemine
    spin: {
      text: 'Laadimine...'
    },
    // Hinnang
    rate: {
      texts: ['Väga halb', 'Pettunud', 'Keskmine', 'Rahul', 'Üllatunud']
    },
    // Hoiatus
    alert: {
      close: 'Sulge'
    },
    // Silt
    tag: {
      close: 'Sulge'
    },
    // Kaardid
    tabs: {
      close: 'Sulge',
      add: 'Lisa',
      more: 'Rohkem'
    },
    // Sammud
    steps: {
      finish: 'Lõpetatud',
      process: 'Käimas',
      wait: 'Ootan',
      error: 'Viga'
    },
    // Edenemine
    progress: {
      success: 'Õnnestus',
      exception: 'Erand',
      warning: 'Hoiatus'
    },
    // Skelett
    skeleton: {
      loading: 'Laadimine...'
    },
    // Tühi
    empty: {
      description: 'Andmeid pole',
      noData: 'Andmeid pole',
      noResult: 'Tulemusi pole',
      networkError: 'Võrgu viga',
      serverError: 'Serveri viga'
    },
    // Tulemus
    result: {
      success: 'Õnnestus',
      error: 'Viga',
      warning: 'Hoiatus',
      info: 'Info',
      backHome: 'Tagasi avalehele'
    },
    // Kosk
    waterfall: {
      loading: 'Laadimine...',
      noMore: 'Rohkem andmeid pole',
      empty: 'Andmeid pole'
    },
    // Kirjeldused
    descriptions: {
      colon: ':'
    },
    // Liugur
    slider: {
      tipFormatter: '{value}'
    },
    // Lüliti
    switch: {
      on: 'SEES',
      off: 'VÄLJAS'
    },
    // Märkeruut
    checkbox: {
      selectAll: 'Vali kõik'
    },
    // Raadio
    radio: {},
    // Menüü
    menu: {
      collapse: 'Ahenda menüü',
      expand: 'Laienda menüü'
    },
    // Kaart
    card: {
      collapse: 'Ahenda',
      expand: 'Laienda'
    },
    // Ahendamine
    collapse: {
      expand: 'Laienda',
      collapse: 'Ahenda'
    },
    // Näpunäide
    tooltip: {},
    // Hüpikaken
    popover: {},
    // Märgis
    badge: {},
    // Avatari
    avatar: {
      error: 'Laadimine ebaõnnestus'
    },
    // Vesimärk
    watermark: {},
    // Eraldaja
    divider: {},
    // Karussell
    carousel: {
      prev: 'Eelmine',
      next: 'Järgmine'
    },
    // Marquee
    marquee: {},
    // Kinnitamine
    affix: {},
    // Ankur
    anchor: {}
  }
}

export default et
