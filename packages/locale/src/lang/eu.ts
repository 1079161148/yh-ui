import type { Language } from '../index'

export const eu: Language = {
  name: 'eu',
  yh: {
    // Orokorra
    common: {
      yes: 'Bai',
      no: 'Ez',
      confirm: 'Berretsi',
      cancel: 'Utzi',
      loading: 'Kargatzen',
      close: 'Itxi',
      clear: 'Garbitu',
      reset: 'Berrezarri',
      save: 'Gorde',
      delete: 'Ezabatu',
      edit: 'Editatu',
      add: 'Gehitu',
      search: 'Bilatu',
      refresh: 'Freskatu',
      expand: 'Zabaldu',
      collapse: 'Tolestu',
      more: 'Gehiago',
      noData: 'Daturik ez',
      noMatch: 'Datu bat datorrenik ez',
      selectAll: 'Dena hautatu',
      unselectAll: 'Hautaketa guztiak kendu'
    },
    // Kolore hautatzailea
    colorpicker: {
      confirm: 'Ados',
      clear: 'Garbitu',
      eyeDropper: 'Begi-tanta',
      suggestionDark: 'Testu zuria hobea da',
      suggestionLight: 'Testu beltza hobea da',
      recentColors: 'Azken koloreak',
      presetColors: 'Aurrez definitutako koloreak'
    },
    // Data hautatzailea
    datepicker: {
      now: 'Orain',
      today: 'Gaur',
      cancel: 'Utzi',
      clear: 'Garbitu',
      confirm: 'Ados',
      selectDate: 'Data hautatu',
      selectTime: 'Ordua hautatu',
      startDate: 'Hasierako data',
      startTime: 'Hasierako ordua',
      endDate: 'Amaierako data',
      endTime: 'Amaierako ordua',
      year: '',
      month: '',
      day: '',
      week: 'Astea',
      monthBeforeYear: true,
      prevYear: 'Aurreko urtea',
      nextYear: 'Hurrengo urtea',
      prevMonth: 'Aurreko hilabetea',
      nextMonth: 'Hurrengo hilabetea',
      weeks: {
        sun: 'Iga',
        mon: 'Ast',
        tue: 'Ast',
        wed: 'Azt',
        thu: 'Ost',
        fri: 'Ost',
        sat: 'Lar'
      },
      months: {
        jan: 'Urt',
        feb: 'Ots',
        mar: 'Mar',
        apr: 'Api',
        may: 'Mai',
        jun: 'Eka',
        jul: 'Uzt',
        aug: 'Abu',
        sep: 'Ira',
        oct: 'Urr',
        nov: 'Aza',
        dec: 'Abe'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Ordu hautatzailea
    timepicker: {
      confirm: 'Ados',
      cancel: 'Utzi',
      now: 'Orain',
      placeholder: 'Ordua hautatu',
      startPlaceholder: 'Hasierako ordua',
      endPlaceholder: 'Amaierako ordua',
      selectTime: 'Ordua hautatu'
    },
    // Ordu hautaketa
    timeselect: {
      placeholder: 'Ordua hautatu'
    },
    // Zuhaitza
    tree: {
      emptyText: 'Daturik ez',
      loading: 'Kargatzen...',
      checkAll: 'Dena markatu',
      uncheckAll: 'Markaketa guztiak kendu',
      expandAll: 'Dena zabaldu',
      collapseAll: 'Dena tolestu'
    },
    // Zuhaitz hautaketa
    treeselect: {
      placeholder: 'Hautatu',
      emptyText: 'Daturik ez',
      loading: 'Kargatzen...',
      noMatch: 'Datu bat datorrenik ez'
    },
    // Egutegia
    calendar: {
      prevMonth: 'Aurreko hilabetea',
      nextMonth: 'Hurrengo hilabetea',
      prevYear: 'Aurreko urtea',
      nextYear: 'Hurrengo urtea',
      today: 'Gaur',
      week: 'Astea',
      holiday: 'Jai eguna',
      workday: 'Lan eguna',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Iga',
        mon: 'Ast',
        tue: 'Ast',
        wed: 'Azt',
        thu: 'Ost',
        fri: 'Ost',
        sat: 'Lar'
      }
    },
    // Autobetetzeko
    autocomplete: {
      loading: 'Kargatzen...',
      placeholder: 'Mesedez, sartu',
      noData: 'Daturik ez',
      noMatch: 'Datu bat datorrenik ez'
    },
    // Atzerako zenbaketa
    countdown: {
      days: 'egun',
      hours: 'ordu',
      minutes: 'minutu',
      seconds: 'segundo',
      milliseconds: 'milisegundo',
      finished: 'Amaitua'
    },
    // Kaskada hautatzailea
    cascader: {
      noMatch: 'Datu bat datorrenik ez',
      placeholder: 'Hautatu',
      loading: 'Kargatzen...',
      noData: 'Daturik ez'
    },
    // Transferentzia
    transfer: {
      noMatch: 'Datu bat datorrenik ez',
      noData: 'Daturik ez',
      titles: ['Zerrenda 1', 'Zerrenda 2'],
      filterPlaceholder: 'Gako-hitza sartu',
      noCheckedFormat: '{total} elementu',
      hasCheckedFormat: '{checked}/{total} hautatuta',
      searchPlaceholder: 'Gako-hitza sartu'
    },
    // Taula
    table: {
      emptyText: 'Daturik ez',
      confirmFilter: 'Berretsi',
      resetFilter: 'Berrezarri',
      clearFilter: 'Guztiak',
      sumText: 'Batuketa',
      loading: 'Kargatzen...',
      index: 'Indizea',
      print: 'Inprimatu',
      cancel: 'Utzi',
      preview: 'Inprimatzeko aurrebista',
      printTime: 'Inprimatzeko ordua',
      total: 'Guztira {total} elementu',
      page: '{page} orrialdea',
      yes: 'Bai',
      no: 'Ez',
      // Tresna-barra
      toolbar: {
        refresh: 'Freskatu',
        density: 'Dentsitatea',
        densityDefault: 'Lehenetsia',
        densityLarge: 'Handia',
        densitySmall: 'Txikia',
        columnSetting: 'Zutabe ezarpenak',
        fullscreen: 'Pantaila osoa',
        exitFullscreen: 'Pantaila osotik irten',
        export: 'Esportatu',
        import: 'Inportatu',
        search: 'Bilatu',
        searchPlaceholder: 'Bilatzeko gako-hitzak sartu'
      },
      // Iragazkia
      filter: {
        selectAll: 'Dena hautatu',
        selectInvert: 'Hautaketa alderantzikatu',
        empty: 'Hutsik dago',
        notEmpty: 'Ez dago hutsik',
        contains: 'Dauka',
        notContains: 'Ez dauka',
        equals: 'Berdin',
        notEquals: 'Ez da berdina',
        startsWith: 'Honekin hasten da',
        endsWith: 'Honekin amaitzen da',
        greaterThan: 'Baino handiagoa',
        lessThan: 'Baino txikiagoa',
        between: 'Artean'
      },
      // Ordenatu
      sort: {
        asc: 'Goranzkoa',
        desc: 'Beheranzkoa',
        clear: 'Ordena garbitu'
      },
      // Esportatu
      export: {
        title: 'Datuak esportatu',
        filename: 'Fitxategi izena',
        type: 'Fitxategi mota',
        scope: 'Esportatzeko esparrua',
        scopeAll: 'Datu guztiak',
        scopeSelected: 'Hautatutako datuak',
        scopeCurrentPage: 'Uneko orrialdea',
        includeHeader: 'Goiburua sartu',
        exporting: 'Esportatzen...',
        success: 'Esportatzea arrakastatsua',
        error: 'Esportatzea huts egin du'
      },
      // Inportatu
      import: {
        title: 'Datuak inportatu',
        selectFile: 'Fitxategia hautatu',
        dragTip: 'Igo ahal izateko fitxategia klik egin edo arrastatu hemen',
        importing: 'Inportatzen...',
        success: 'Inportatzea arrakastatsua',
        error: 'Inportatzea huts egin du',
        preview: 'Datuen aurrebista',
        confirm: 'Inportatzea berretsi'
      },
      // Inprimatu
      printConfig: {
        title: 'Inprimatzeko ezarpenak',
        pageTitle: 'Orrialdearen izenburua',
        pageHeader: 'Goiburua',
        pageFooter: 'Oina',
        printAll: 'Dena inprimatu',
        printSelected: 'Hautatutakoak inprimatu',
        printCurrentPage: 'Uneko orrialdea inprimatu',
        landscape: 'Horizontala',
        portrait: 'Bertikala',
        printing: 'Inprimatzen...'
      },
      // Zutabe ezarpenak
      columnSetting: {
        title: 'Zutabe ezarpenak',
        showAll: 'Dena erakutsi',
        hideAll: 'Dena ezkutatu',
        reset: 'Berrezarri',
        fixedLeft: 'Ezkerrean finkatu',
        fixedRight: 'Eskubian finkatu',
        unfixed: 'Finkatzea kendu'
      },
      // Testuinguru menua
      contextMenu: {
        copy: 'Kopiatu',
        copyRow: 'Lerroa kopiatu',
        copyCell: 'Gelaxka kopiatu',
        paste: 'Itsatsi',
        insertRowAbove: 'Goian lerroa txertatu',
        insertRowBelow: 'Behean lerroa txertatu',
        deleteRow: 'Lerroa ezabatu',
        deleteSelectedRows: 'Hautatutako lerroak ezabatu',
        exportSelected: 'Hautatutakoak esportatu'
      },
      // Hautaketa
      selection: {
        selectAll: 'Dena hautatu',
        selectInvert: 'Hautaketa alderantzikatu',
        selectNone: 'Hautaketa garbitu',
        selected: '{count} elementu hautatuta'
      },
      // Zabaltzea
      expand: {
        expandAll: 'Dena zabaldu',
        collapseAll: 'Dena tolestu'
      },
      // Zuhaitza
      tree: {
        expandAll: 'Dena zabaldu',
        collapseAll: 'Dena tolestu',
        expandLevel: '{level} mailara zabaldu'
      },
      // Arrastatu
      drag: {
        dragTip: 'Berriro ordenatzeko arrastatu',
        dropTip: 'Kokatzeko utzi'
      }
    },
    // Mezu kutxa
    messagebox: {
      title: 'Mezua',
      confirm: 'Ados',
      cancel: 'Utzi',
      close: 'Itxi',
      error: 'Sarrera baliogabea',
      alert: 'Oharra',
      prompt: 'Galdetua',
      inputPlaceholder: 'Mesedez, sartu'
    },
    // Igo
    upload: {
      deleteTip: 'ezabatzeko delete sakatu',
      delete: 'Ezabatu',
      preview: 'Aurrebista',
      continue: 'Jarraitu',
      upload: 'Igo ahal izateko klik egin',
      tip: 'Igo ahal izateko fitxategia eremu honetara klik egin edo arrastatu',
      dragTip: 'Fitxategia hemen utzi edo igo ahal izateko klik egin',
      uploading: 'Igotzen...',
      success: 'Igotzea arrakastatsua',
      error: 'Igotzea huts egin du',
      retry: 'Saiatu berriro',
      cancel: 'Igotzea utzi',
      fileTypeError: 'Fitxategi mota ez da onartzen',
      fileSizeError: 'Fitxategi tamaina muga gainditu du',
      fileCountError: 'Fitxategi kopurua muga gainditu du'
    },
    // Formularioa
    form: {
      validationFailed: 'Baliozkotzea huts egin du',
      required: 'Beharrezkoa',
      pleaseInput: 'Mesedez, sartu',
      pleaseSelect: 'Mesedez, hautatu'
    },
    // Botoia
    button: {
      loading: 'Kargatzen...'
    },
    // Sarrera
    input: {
      placeholder: 'Mesedez, sartu',
      clear: 'Garbitu',
      showPassword: 'Pasahitza erakutsi',
      hidePassword: 'Pasahitza ezkutatu',
      copy: 'Kopiatu',
      copied: 'Kopiatuta'
    },
    // Zenbaki sarrera
    inputnumber: {
      placeholder: 'Mesedez, zenbakia sartu',
      increase: 'Handitu',
      decrease: 'Txikitu'
    },
    // Etiketa sarrera
    inputtag: {
      placeholder: 'Mesedez, sartu',
      add: 'Gehitu',
      remove: 'Kendu'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Nabigazio bidea',
      more: 'Gehiago'
    },
    // Goira itzuli
    backtop: {
      text: 'Goira itzuli'
    },
    // Hautatu
    select: {
      placeholder: 'Mesedez, hautatu',
      noData: 'Daturik ez',
      loading: 'Kargatzen...',
      noMatch: 'Datu bat datorrenik ez',
      selectAll: 'Dena hautatu',
      clearAll: 'Dena garbitu'
    },
    // Orrialdekatzea
    pagination: {
      goto: 'Joan',
      page: '',
      total: 'Guztira {total}',
      pageSize: '/orrialde',
      prev: 'Aurrekoa',
      next: 'Hurrengoa',
      first: 'Lehena',
      last: 'Azkena',
      pageClassifier: ''
    },
    // Popconfirm
    popconfirm: {
      confirm: 'Ados',
      cancel: 'Utzi',
      dontAskAgain: 'Ez galdetu berriro'
    },
    // Elkarrizketa
    dialog: {
      confirm: 'Ados',
      cancel: 'Utzi',
      close: 'Itxi',
      maximize: 'Maximizatu',
      restore: 'Berreskuratu'
    },
    // Drawer
    drawer: {
      close: 'Itxi',
      confirm: 'Ados',
      cancel: 'Utzi'
    },
    // Dropdown
    dropdown: {
      loading: 'Kargatzen...'
    },
    // Irudia
    image: {
      error: 'HUTS EGIN DU',
      loading: 'Kargatzen...',
      preview: 'Aurrebista',
      zoomIn: 'Handitu',
      zoomOut: 'Txikitu',
      rotateLeft: 'Ezkerrera biratu',
      rotateRight: 'Eskubira biratu',
      originalSize: 'Jatorrizko tamaina',
      fullscreen: 'Pantaila osoa'
    },
    // Irudi ikuslea
    imageviewer: {
      close: 'Itxi',
      prev: 'Aurrekoa',
      next: 'Hurrengoa',
      zoomIn: 'Handitu',
      zoomOut: 'Txikitu',
      rotateLeft: 'Ezkerrera biratu',
      rotateRight: 'Eskubira biratu',
      reset: 'Berrezarri',
      fullscreen: 'Pantaila osoa',
      exitFullscreen: 'Pantaila osotik irten'
    },
    // Mugagabea korritzea
    infinitescroll: {
      loading: 'Kargatzen...',
      finished: 'Daturik gehiago ez',
      error: 'Kargatzeak huts egin du, saiatu berriro klik egiteko',
      retry: 'Saiatu berriro klik egiteko'
    },
    // Mezua
    message: {
      close: 'Itxi'
    },
    // Jakinarazpena
    notification: {
      close: 'Itxi'
    },
    // Kargatzen
    loading: {
      text: 'Kargatzen...'
    },
    // Spin
    spin: {
      text: 'Kargatzen...'
    },
    // Balorazioa
    rate: {
      texts: ['Oso txarra', 'Desengainatua', 'Justua', 'Asetua', 'Harritua']
    },
    // Oharra
    alert: {
      close: 'Itxi'
    },
    // Etiketa
    tag: {
      close: 'Itxi'
    },
    // Fitxak
    tabs: {
      close: 'Itxi',
      add: 'Gehitu',
      more: 'Gehiago'
    },
    // Urratsak
    steps: {
      finish: 'Amaitua',
      process: 'Prozesuan',
      wait: 'Itxaroten',
      error: 'Errorea'
    },
    // Aurrerapena
    progress: {
      success: 'Arrakasta',
      exception: 'Salbuespena',
      warning: 'Oharra'
    },
    // Skeleton
    skeleton: {
      loading: 'Kargatzen...'
    },
    // Hutsa
    empty: {
      description: 'Daturik ez',
      noData: 'Daturik ez',
      noResult: 'Emaitzarik ez',
      networkError: 'Sare errorea',
      serverError: 'Zerbitzari errorea'
    },
    // Emaitza
    result: {
      success: 'Arrakasta',
      error: 'Errorea',
      warning: 'Oharra',
      info: 'Informazioa',
      backHome: 'Etxera itzuli'
    },
    // Waterfall
    waterfall: {
      loading: 'Kargatzen...',
      noMore: 'Daturik gehiago ez',
      empty: 'Daturik ez'
    },
    // Deskribapenak
    descriptions: {
      colon: ':'
    },
    // Slider
    slider: {
      tipFormatter: '{value}'
    },
    // Switch
    switch: {
      on: 'PIZTUTA',
      off: 'ITZALITA'
    },
    // Checkbox
    checkbox: {
      selectAll: 'Dena hautatu'
    },
    // Radio
    radio: {},
    // Menua
    menu: {
      collapse: 'Menua tolestu',
      expand: 'Menua zabaldu'
    },
    // Txartela
    card: {
      collapse: 'Tolestu',
      expand: 'Zabaldu'
    },
    // Tolestu
    collapse: {
      expand: 'Zabaldu',
      collapse: 'Tolestu'
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: 'Kargatzeak huts egin du'
    },
    // Watermark
    watermark: {},
    // Divider
    divider: {},
    // Carousel
    carousel: {
      prev: 'Aurrekoa',
      next: 'Hurrengoa'
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Anchor
    anchor: {}
  }
}

export default eu
