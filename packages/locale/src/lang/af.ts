import type { Language } from '../index'

export const af: Language = {
  name: 'af',
  yh: {
    // Algemeen
    common: {
      yes: 'Ja',
      no: 'Nee',
      confirm: 'Bevestig',
      cancel: 'Kanselleer',
      loading: 'Laai',
      close: 'Sluit',
      clear: 'Maak skoon',
      reset: 'Herstel',
      save: 'Stoor',
      delete: 'Verwyder',
      edit: 'Wysig',
      add: 'Voeg by',
      search: 'Soek',
      refresh: 'Verfris',
      expand: 'Brei uit',
      collapse: 'Vou saam',
      more: 'Meer',
      noData: 'Geen data',
      noMatch: 'Geen ooreenstemmende data',
      selectAll: 'Kies alles',
      unselectAll: 'Ontkies alles'
    },
    // Kleurkeuse
    colorpicker: {
      confirm: 'OK',
      clear: 'Maak skoon',
      eyeDropper: 'Pipet',
      suggestionDark: 'Wit teks is die beste',
      suggestionLight: 'Swart teks is die beste',
      recentColors: 'Onlangse kleure',
      presetColors: 'Vooraf ingestelde kleure'
    },
    // Datumkeuse
    datepicker: {
      now: 'Nou',
      today: 'Vandag',
      cancel: 'Kanselleer',
      clear: 'Maak skoon',
      confirm: 'OK',
      selectDate: 'Kies datum',
      selectTime: 'Kies tyd',
      startDate: 'Begindatum',
      startTime: 'Begintyd',
      endDate: 'Einddatum',
      endTime: 'Eindtyd',
      year: '',
      month: '',
      day: '',
      week: 'Week',
      monthBeforeYear: true,
      prevYear: 'Vorige jaar',
      nextYear: 'Volgende jaar',
      prevMonth: 'Vorige maand',
      nextMonth: 'Volgende maand',
      weeks: {
        sun: 'Son',
        mon: 'Maa',
        tue: 'Din',
        wed: 'Woe',
        thu: 'Don',
        fri: 'Vry',
        sat: 'Sat'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mrt',
        apr: 'Apr',
        may: 'Mei',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
        sep: 'Sep',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Des'
      },
      quarters: {
        q1: 'K1',
        q2: 'K2',
        q3: 'K3',
        q4: 'K4'
      }
    },
    // Tydkeuse
    timepicker: {
      confirm: 'OK',
      cancel: 'Kanselleer',
      now: 'Nou',
      placeholder: 'Kies tyd',
      startPlaceholder: 'Begintyd',
      endPlaceholder: 'Eindtyd',
      selectTime: 'Kies tyd'
    },
    // Tydkeuse
    timeselect: {
      placeholder: 'Kies tyd'
    },
    // Boom
    tree: {
      emptyText: 'Geen data',
      loading: 'Laai...',
      checkAll: 'Merk alles',
      uncheckAll: 'Ontmerk alles',
      expandAll: 'Brei alles uit',
      collapseAll: 'Vou alles saam'
    },
    // Boomkeuse
    treeselect: {
      placeholder: 'Kies',
      emptyText: 'Geen data',
      loading: 'Laai...',
      noMatch: 'Geen ooreenstemmende data'
    },
    // Kalender
    calendar: {
      prevMonth: 'Vorige maand',
      nextMonth: 'Volgende maand',
      prevYear: 'Vorige jaar',
      nextYear: 'Volgende jaar',
      today: 'Vandag',
      week: 'Week',
      holiday: 'Vakansiedag',
      workday: 'Werkdag',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Son',
        mon: 'Maa',
        tue: 'Din',
        wed: 'Woe',
        thu: 'Don',
        fri: 'Vry',
        sat: 'Sat'
      }
    },
    // Outomatiese aanvulling
    autocomplete: {
      loading: 'Laai...',
      placeholder: 'Voer asseblief in',
      noData: 'Geen data',
      noMatch: 'Geen ooreenstemmende data'
    },
    // Aftelling
    countdown: {
      days: 'dae',
      hours: 'ure',
      minutes: 'minute',
      seconds: 'sekondes',
      milliseconds: 'millisekondes',
      finished: 'Voltooi'
    },
    // Kaskade
    cascader: {
      noMatch: 'Geen ooreenstemmende data',
      placeholder: 'Kies',
      loading: 'Laai...',
      noData: 'Geen data'
    },
    // Oordrag
    transfer: {
      noMatch: 'Geen ooreenstemmende data',
      noData: 'Geen data',
      titles: ['Lys 1', 'Lys 2'],
      filterPlaceholder: 'Voer sleutelwoord in',
      noCheckedFormat: '{total} items',
      hasCheckedFormat: '{checked}/{total} gekies',
      searchPlaceholder: 'Voer sleutelwoord in'
    },
    // Tabel
    table: {
      emptyText: 'Geen data',
      confirmFilter: 'Bevestig',
      resetFilter: 'Herstel',
      clearFilter: 'Alles',
      sumText: 'Som',
      loading: 'Laai...',
      index: 'Indeks',
      print: 'Druk',
      cancel: 'Kanselleer',
      preview: 'Drukvoorskou',
      printTime: 'Druktyd',
      total: 'Totaal {total} items',
      page: 'Bladsy {page}',
      yes: 'Ja',
      no: 'Nee',
      // Werkbalk
      toolbar: {
        refresh: 'Verfris',
        density: 'Digtheid',
        densityDefault: 'Standaard',
        densityLarge: 'Groot',
        densitySmall: 'Klein',
        columnSetting: 'Kolominstellings',
        fullscreen: 'Volledige skerm',
        exitFullscreen: 'Verlaat volledige skerm',
        export: 'Eksporteer',
        import: 'Importeer',
        search: 'Soek',
        searchPlaceholder: 'Voer sleutelwoorde in om te soek'
      },
      // Filter
      filter: {
        selectAll: 'Kies alles',
        selectInvert: 'Keer keuse om',
        empty: 'Is leeg',
        notEmpty: 'Is nie leeg nie',
        contains: 'Bevat',
        notContains: 'Bevat nie',
        equals: 'Gelyk aan',
        notEquals: 'Nie gelyk aan nie',
        startsWith: 'Begin met',
        endsWith: 'Eindig met',
        greaterThan: 'Groter as',
        lessThan: 'Kleiner as',
        between: 'Tussen'
      },
      // Sorteer
      sort: {
        asc: 'Stygend',
        desc: 'Dalend',
        clear: 'Maak sorteer skoon'
      },
      // Eksporteer
      export: {
        title: 'Eksporteer data',
        filename: 'Lêernaam',
        type: 'Lêertipe',
        scope: 'Eksportomvang',
        scopeAll: 'Alle data',
        scopeSelected: 'Gekose data',
        scopeCurrentPage: 'Huidige bladsy',
        includeHeader: 'Sluit kop in',
        exporting: 'Eksporteer...',
        success: 'Eksport suksesvol',
        error: 'Eksport het misluk'
      },
      // Importeer
      import: {
        title: 'Importeer data',
        selectFile: 'Kies lêer',
        dragTip: 'Klik of sleep lêer hierheen om op te laai',
        importing: 'Importeer...',
        success: 'Import suksesvol',
        error: 'Import het misluk',
        preview: 'Datavoorskou',
        confirm: 'Bevestig import'
      },
      // Druk
      printConfig: {
        title: 'Drukinstellings',
        pageTitle: 'Bladsytitel',
        pageHeader: 'Kop',
        pageFooter: 'Voetskrif',
        printAll: 'Druk alles',
        printSelected: 'Druk gekose',
        printCurrentPage: 'Druk huidige bladsy',
        landscape: 'Liggend',
        portrait: 'Staand',
        printing: 'Druk...'
      },
      // Kolominstellings
      columnSetting: {
        title: 'Kolominstellings',
        showAll: 'Wys alles',
        hideAll: 'Versteek alles',
        reset: 'Herstel',
        fixedLeft: 'Vas links',
        fixedRight: 'Vas regs',
        unfixed: 'Maak los'
      },
      // Konteksmenu
      contextMenu: {
        copy: 'Kopieer',
        copyRow: 'Kopieer ry',
        copyCell: 'Kopieer sel',
        paste: 'Plak',
        insertRowAbove: 'Voeg ry bo in',
        insertRowBelow: 'Voeg ry onder in',
        deleteRow: 'Verwyder ry',
        deleteSelectedRows: 'Verwyder gekose rye',
        exportSelected: 'Eksporteer gekose'
      },
      // Keuse
      selection: {
        selectAll: 'Kies alles',
        selectInvert: 'Keer keuse om',
        selectNone: 'Maak keuse skoon',
        selected: '{count} items gekies'
      },
      // Brei uit
      expand: {
        expandAll: 'Brei alles uit',
        collapseAll: 'Vou alles saam'
      },
      // Boom
      tree: {
        expandAll: 'Brei alles uit',
        collapseAll: 'Vou alles saam',
        expandLevel: 'Brei uit tot vlak {level}'
      },
      // Sleep
      drag: {
        dragTip: 'Sleep om te herrangskik',
        dropTip: 'Los om te plaas'
      }
    },
    // Boodskapboks
    messagebox: {
      title: 'Boodskap',
      confirm: 'OK',
      cancel: 'Kanselleer',
      close: 'Sluit',
      error: 'Ongeldige invoer',
      alert: 'Waarskuwing',
      prompt: 'Vra',
      inputPlaceholder: 'Voer asseblief in'
    },
    // Oplaai
    upload: {
      deleteTip: 'druk delete om te verwyder',
      delete: 'Verwyder',
      preview: 'Voorskou',
      continue: 'Gaan voort',
      upload: 'Klik om op te laai',
      tip: 'Klik of sleep lêer na hierdie area om <em>op te laai</em>',
      dragTip: 'Los lêer hier of klik om op te laai',
      uploading: 'Laai op...',
      success: 'Oplaai suksesvol',
      error: 'Oplaai het misluk',
      retry: 'Probeer weer',
      cancel: 'Kanselleer oplaai',
      fileTypeError: 'Lêertipe word nie ondersteun nie',
      fileSizeError: 'Lêergrootte oorskry limiet',
      fileCountError: 'Lêertelling oorskry limiet'
    },
    // Vorm
    form: {
      validationFailed: 'Validasie het misluk',
      required: 'Vereis',
      pleaseInput: 'Voer asseblief in',
      pleaseSelect: 'Kies asseblief'
    },
    // Knoppie
    button: {
      loading: 'Laai...'
    },
    // Invoer
    input: {
      placeholder: 'Voer asseblief in',
      clear: 'Maak skoon',
      showPassword: 'Wys wagwoord',
      hidePassword: 'Versteek wagwoord',
      copy: 'Kopieer',
      copied: 'Gekopieer'
    },
    // Nommer invoer
    inputnumber: {
      placeholder: 'Voer asseblief nommer in',
      increase: 'Vermeerder',
      decrease: 'Verminder'
    },
    // Etiket invoer
    inputtag: {
      placeholder: 'Voer asseblief in',
      add: 'Voeg by',
      remove: 'Verwyder'
    },
    // Broodkrummel
    breadcrumb: {
      label: 'Broodkrummel',
      more: 'Meer'
    },
    // Terug na bo
    backtop: {
      text: 'Terug na bo'
    },
    // Keuse
    select: {
      placeholder: 'Kies asseblief',
      noData: 'Geen data',
      loading: 'Laai...',
      noMatch: 'Geen ooreenstemmende data',
      selectAll: 'Kies alles',
      clearAll: 'Maak alles skoon'
    },
    // Bladsy
    pagination: {
      goto: 'Gaan na',
      page: '',
      total: 'Totaal {total}',
      pageSize: '/bladsy',
      prev: 'Vorige',
      next: 'Volgende',
      first: 'Eerste',
      last: 'Laaste',
      pageClassifier: ''
    },
    // Bevestig popup
    popconfirm: {
      confirm: 'OK',
      cancel: 'Kanselleer',
      dontAskAgain: 'Moenie weer vra nie'
    },
    // Dialoog
    dialog: {
      confirm: 'OK',
      cancel: 'Kanselleer',
      close: 'Sluit',
      maximize: 'Maksimeer',
      restore: 'Herstel'
    },
    // Laaie
    drawer: {
      close: 'Sluit',
      confirm: 'OK',
      cancel: 'Kanselleer'
    },
    // Afrolmenu
    dropdown: {
      loading: 'Laai...'
    },
    // Beeld
    image: {
      error: 'MISLUK',
      loading: 'Laai...',
      preview: 'Voorskou',
      zoomIn: 'Vergroot',
      zoomOut: 'Verklein',
      rotateLeft: 'Roteer links',
      rotateRight: 'Roteer regs',
      originalSize: 'Oorspronklike grootte',
      fullscreen: 'Volledige skerm'
    },
    // Beeldkyker
    imageviewer: {
      close: 'Sluit',
      prev: 'Vorige',
      next: 'Volgende',
      zoomIn: 'Vergroot',
      zoomOut: 'Verklein',
      rotateLeft: 'Roteer links',
      rotateRight: 'Roteer regs',
      reset: 'Herstel',
      fullscreen: 'Volledige skerm',
      exitFullscreen: 'Verlaat volledige skerm'
    },
    // Oneindige scroll
    infinitescroll: {
      loading: 'Laai...',
      finished: 'Geen meer data',
      error: 'Laai het misluk, klik om weer te probeer',
      retry: 'Klik om weer te probeer'
    },
    // Boodskap
    message: {
      close: 'Sluit'
    },
    // Kennisgewing
    notification: {
      close: 'Sluit'
    },
    // Laai
    loading: {
      text: 'Laai...'
    },
    // Draai
    spin: {
      text: 'Laai...'
    },
    // Gradering
    rate: {
      texts: ['Uiters swak', 'Teleurgesteld', 'Redelik', 'Tevrede', 'Verbaas']
    },
    // Waarskuwing
    alert: {
      close: 'Sluit'
    },
    // Etiket
    tag: {
      close: 'Sluit'
    },
    // Oortjies
    tabs: {
      close: 'Sluit',
      add: 'Voeg by',
      more: 'Meer'
    },
    // Stappe
    steps: {
      finish: 'Voltooi',
      process: 'In proses',
      wait: 'Wag',
      error: 'Fout'
    },
    // Vordering
    progress: {
      success: 'Sukses',
      exception: 'Uitsondering',
      warning: 'Waarskuwing'
    },
    // Geraamte
    skeleton: {
      loading: 'Laai...'
    },
    // Leeg
    empty: {
      description: 'Geen data',
      noData: 'Geen data',
      noResult: 'Geen resultate',
      networkError: 'Netwerkfout',
      serverError: 'Bedienerfout'
    },
    // Resultaat
    result: {
      success: 'Sukses',
      error: 'Fout',
      warning: 'Waarskuwing',
      info: 'Inligting',
      backHome: 'Terug na tuis'
    },
    // Waterval
    waterfall: {
      loading: 'Laai...',
      noMore: 'Geen meer data',
      empty: 'Geen data'
    },
    // Beskrywings
    descriptions: {
      colon: ':'
    },
    // Skuiwer
    slider: {
      tipFormatter: '{value}'
    },
    // Skakelaar
    switch: {
      on: 'AAN',
      off: 'AF'
    },
    // Keusevakkie
    checkbox: {
      selectAll: 'Kies alles'
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: 'Vou menu saam',
      expand: 'Brei menu uit'
    },
    // Kaart
    card: {
      collapse: 'Vou saam',
      expand: 'Brei uit'
    },
    // Vou saam
    collapse: {
      expand: 'Brei uit',
      collapse: 'Vou saam'
    },
    // Wenktip
    tooltip: {},
    // Popover
    popover: {},
    // Kenteken
    badge: {},
    // Avatar
    avatar: {
      error: 'Laai het misluk'
    },
    // Watermerk
    watermark: {},
    // Skeider
    divider: {},
    // Karosel
    carousel: {
      prev: 'Vorige',
      next: 'Volgende'
    },
    // Marquee
    marquee: {},
    // Vashegting
    affix: {},
    // Anker
    anchor: {}
  }
}

export default af
