import type { Language } from '../index'

export const da: Language = {
  name: 'da',
  yh: {
    // Fælles
    common: {
      yes: 'Ja',
      no: 'Nej',
      confirm: 'Bekræft',
      cancel: 'Annuller',
      loading: 'Indlæser',
      close: 'Luk',
      clear: 'Ryd',
      reset: 'Nulstil',
      save: 'Gem',
      delete: 'Slet',
      edit: 'Rediger',
      add: 'Tilføj',
      search: 'Søg',
      refresh: 'Opdater',
      expand: 'Udvid',
      collapse: 'Skjul',
      more: 'Mere',
      noData: 'Ingen data',
      noMatch: 'Ingen matchende data',
      selectAll: 'Vælg alle',
      unselectAll: 'Fravælg alle'
    },
    // Farvevælger
    colorpicker: {
      confirm: 'OK',
      clear: 'Ryd',
      eyeDropper: 'Pipette',
      suggestionDark: 'Hvid tekst er bedst',
      suggestionLight: 'Sort tekst er bedst',
      recentColors: 'Seneste farver',
      presetColors: 'Forudindstillede farver'
    },
    // Dato vælger
    datepicker: {
      now: 'Nu',
      today: 'I dag',
      cancel: 'Annuller',
      clear: 'Ryd',
      confirm: 'OK',
      selectDate: 'Vælg dato',
      selectTime: 'Vælg tid',
      startDate: 'Startdato',
      startTime: 'Starttid',
      endDate: 'Slutdato',
      endTime: 'Sluttid',
      year: '',
      month: '',
      day: '',
      week: 'Uge',
      monthBeforeYear: true,
      prevYear: 'Forrige år',
      nextYear: 'Næste år',
      prevMonth: 'Forrige måned',
      nextMonth: 'Næste måned',
      weeks: {
        sun: 'Søn',
        mon: 'Man',
        tue: 'Tir',
        wed: 'Ons',
        thu: 'Tor',
        fri: 'Fre',
        sat: 'Lør'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'Maj',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
        sep: 'Sep',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Dec'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Tid vælger
    timepicker: {
      confirm: 'OK',
      cancel: 'Annuller',
      now: 'Nu',
      placeholder: 'Vælg tid',
      startPlaceholder: 'Starttid',
      endPlaceholder: 'Sluttid',
      selectTime: 'Vælg tid'
    },
    // Tid valg
    timeselect: {
      placeholder: 'Vælg tid'
    },
    // Træ
    tree: {
      emptyText: 'Ingen data',
      loading: 'Indlæser...',
      checkAll: 'Vælg alle',
      uncheckAll: 'Fravælg alle',
      expandAll: 'Udvid alle',
      collapseAll: 'Skjul alle'
    },
    // Træ valg
    treeselect: {
      placeholder: 'Vælg',
      emptyText: 'Ingen data',
      loading: 'Indlæser...',
      noMatch: 'Ingen matchende data'
    },
    // Kalender
    calendar: {
      prevMonth: 'Forrige måned',
      nextMonth: 'Næste måned',
      prevYear: 'Forrige år',
      nextYear: 'Næste år',
      today: 'I dag',
      week: 'Uge',
      holiday: 'Helligdag',
      workday: 'Arbejde',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Søn',
        mon: 'Man',
        tue: 'Tir',
        wed: 'Ons',
        thu: 'Tor',
        fri: 'Fre',
        sat: 'Lør'
      }
    },
    // Autofærdiggørelse
    autocomplete: {
      loading: 'Indlæser...',
      placeholder: 'Indtast venligst',
      noData: 'Ingen data',
      noMatch: 'Ingen matchende data'
    },
    // Nedtælling
    countdown: {
      days: 'dage',
      hours: 'timer',
      minutes: 'minutter',
      seconds: 'sekunder',
      milliseconds: 'millisekunder',
      finished: 'Afsluttet'
    },
    // Kaskade vælger
    cascader: {
      noMatch: 'Ingen matchende data',
      placeholder: 'Vælg',
      loading: 'Indlæser...',
      noData: 'Ingen data'
    },
    // Overførsel
    transfer: {
      noMatch: 'Ingen matchende data',
      noData: 'Ingen data',
      titles: ['Liste 1', 'Liste 2'],
      filterPlaceholder: 'Indtast nøgleord',
      noCheckedFormat: '{total} elementer',
      hasCheckedFormat: '{checked}/{total} valgt',
      searchPlaceholder: 'Indtast nøgleord'
    },
    // Tabel
    table: {
      emptyText: 'Ingen data',
      confirmFilter: 'Bekræft',
      resetFilter: 'Nulstil',
      clearFilter: 'Alle',
      sumText: 'Sum',
      loading: 'Indlæser...',
      index: 'Indeks',
      print: 'Print',
      cancel: 'Annuller',
      preview: 'Print forhåndsvisning',
      printTime: 'Printtid',
      total: 'I alt {total} elementer',
      page: 'Side {page}',
      yes: 'Ja',
      no: 'Nej',
      // Værktøjslinje
      toolbar: {
        refresh: 'Opdater',
        density: 'Tæthed',
        densityDefault: 'Standard',
        densityLarge: 'Stor',
        densitySmall: 'Lille',
        columnSetting: 'Kolonneindstillinger',
        fullscreen: 'Fuldskærm',
        exitFullscreen: 'Afslut fuldskærm',
        export: 'Eksporter',
        import: 'Importer',
        search: 'Søg',
        searchPlaceholder: 'Indtast nøgleord for at søge'
      },
      // Filter
      filter: {
        selectAll: 'Vælg alle',
        selectInvert: 'Inverter valg',
        empty: 'Er tom',
        notEmpty: 'Er ikke tom',
        contains: 'Indeholder',
        notContains: 'Indeholder ikke',
        equals: 'Lig med',
        notEquals: 'Ikke lig med',
        startsWith: 'Starter med',
        endsWith: 'Slutter med',
        greaterThan: 'Større end',
        lessThan: 'Mindre end',
        between: 'Mellem'
      },
      // Sortering
      sort: {
        asc: 'Stigende',
        desc: 'Faldende',
        clear: 'Ryd sortering'
      },
      // Eksport
      export: {
        title: 'Eksporter data',
        filename: 'Filnavn',
        type: 'Filtype',
        scope: 'Eksportomfang',
        scopeAll: 'Alle data',
        scopeSelected: 'Valgte data',
        scopeCurrentPage: 'Nuværende side',
        includeHeader: 'Inkluder header',
        exporting: 'Eksporterer...',
        success: 'Eksport lykkedes',
        error: 'Eksport mislykkedes'
      },
      // Import
      import: {
        title: 'Importer data',
        selectFile: 'Vælg fil',
        dragTip: 'Klik eller træk fil hertil for at uploade',
        importing: 'Importerer...',
        success: 'Import lykkedes',
        error: 'Import mislykkedes',
        preview: 'Data forhåndsvisning',
        confirm: 'Bekræft import'
      },
      // Print
      printConfig: {
        title: 'Printindstillinger',
        pageTitle: 'Sidetitel',
        pageHeader: 'Header',
        pageFooter: 'Footer',
        printAll: 'Print alle',
        printSelected: 'Print valgte',
        printCurrentPage: 'Print nuværende side',
        landscape: 'Landskab',
        portrait: 'Portræt',
        printing: 'Printer...'
      },
      // Kolonneindstillinger
      columnSetting: {
        title: 'Kolonneindstillinger',
        showAll: 'Vis alle',
        hideAll: 'Skjul alle',
        reset: 'Nulstil',
        fixedLeft: 'Fastgør til venstre',
        fixedRight: 'Fastgør til højre',
        unfixed: 'Frigiv'
      },
      // Kontekstmenu
      contextMenu: {
        copy: 'Kopier',
        copyRow: 'Kopier række',
        copyCell: 'Kopier celle',
        paste: 'Indsæt',
        insertRowAbove: 'Indsæt række over',
        insertRowBelow: 'Indsæt række under',
        deleteRow: 'Slet række',
        deleteSelectedRows: 'Slet valgte rækker',
        exportSelected: 'Eksporter valgte'
      },
      // Valg
      selection: {
        selectAll: 'Vælg alle',
        selectInvert: 'Inverter valg',
        selectNone: 'Ryd valg',
        selected: '{count} elementer valgt'
      },
      // Udvid
      expand: {
        expandAll: 'Udvid alle',
        collapseAll: 'Skjul alle'
      },
      // Træ
      tree: {
        expandAll: 'Udvid alle',
        collapseAll: 'Skjul alle',
        expandLevel: 'Udvid til niveau {level}'
      },
      // Træk
      drag: {
        dragTip: 'Træk for at omarrangere',
        dropTip: 'Slip for at placere'
      }
    },
    // Beskedboks
    messagebox: {
      title: 'Besked',
      confirm: 'OK',
      cancel: 'Annuller',
      close: 'Luk',
      error: 'Ugyldig input',
      alert: 'Advarsel',
      prompt: 'Prompt',
      inputPlaceholder: 'Indtast venligst'
    },
    // Upload
    upload: {
      deleteTip: 'tryk delete for at fjerne',
      delete: 'Slet',
      preview: 'Forhåndsvisning',
      continue: 'Fortsæt',
      upload: 'Klik for at uploade',
      tip: 'Klik eller træk fil til dette område for at <em>uploade</em>',
      dragTip: 'Slip fil her eller klik for at uploade',
      uploading: 'Uploader...',
      success: 'Upload lykkedes',
      error: 'Upload mislykkedes',
      retry: 'Prøv igen',
      cancel: 'Annuller upload',
      fileTypeError: 'Filtype understøttes ikke',
      fileSizeError: 'Filstørrelse overskrider grænse',
      fileCountError: 'Filantal overskrider grænse'
    },
    // Formular
    form: {
      validationFailed: 'Validering mislykkedes',
      required: 'Påkrævet',
      pleaseInput: 'Indtast venligst',
      pleaseSelect: 'Vælg venligst'
    },
    // Knap
    button: {
      loading: 'Indlæser...'
    },
    // Input
    input: {
      placeholder: 'Indtast venligst',
      clear: 'Ryd',
      showPassword: 'Vis adgangskode',
      hidePassword: 'Skjul adgangskode',
      copy: 'Kopier',
      copied: 'Kopieret'
    },
    // Input nummer
    inputnumber: {
      placeholder: 'Indtast venligst nummer',
      increase: 'Forøg',
      decrease: 'Formindsk'
    },
    // Input tag
    inputtag: {
      placeholder: 'Indtast venligst',
      add: 'Tilføj',
      remove: 'Fjern'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'Mere'
    },
    // Tilbage til top
    backtop: {
      text: 'Tilbage til top'
    },
    // Vælg
    select: {
      placeholder: 'Vælg venligst',
      noData: 'Ingen data',
      loading: 'Indlæser...',
      noMatch: 'Ingen matchende data',
      selectAll: 'Vælg alle',
      clearAll: 'Ryd alle'
    },
    // Paginering
    pagination: {
      goto: 'Gå til',
      page: '',
      total: 'I alt {total}',
      pageSize: '/side',
      prev: 'Forrige',
      next: 'Næste',
      first: 'Første',
      last: 'Sidste',
      pageClassifier: ''
    },
    // Popbekræftelse
    popconfirm: {
      confirm: 'OK',
      cancel: 'Annuller',
      dontAskAgain: 'Spørg ikke igen'
    },
    // Dialog
    dialog: {
      confirm: 'OK',
      cancel: 'Annuller',
      close: 'Luk',
      maximize: 'Maksimer',
      restore: 'Gendan'
    },
    // Skuffe
    drawer: {
      close: 'Luk',
      confirm: 'OK',
      cancel: 'Annuller'
    },
    // Dropdown menu
    dropdown: {
      loading: 'Indlæser...'
    },
    // Billede
    image: {
      error: 'MISLYKKEDES',
      loading: 'Indlæser...',
      preview: 'Forhåndsvisning',
      zoomIn: 'Zoom ind',
      zoomOut: 'Zoom ud',
      rotateLeft: 'Roter venstre',
      rotateRight: 'Roter højre',
      originalSize: 'Original størrelse',
      fullscreen: 'Fuldskærm'
    },
    // Billedviser
    imageviewer: {
      close: 'Luk',
      prev: 'Forrige',
      next: 'Næste',
      zoomIn: 'Zoom ind',
      zoomOut: 'Zoom ud',
      rotateLeft: 'Roter venstre',
      rotateRight: 'Roter højre',
      reset: 'Nulstil',
      fullscreen: 'Fuldskærm',
      exitFullscreen: 'Afslut fuldskærm'
    },
    // Uendelig rulning
    infinitescroll: {
      loading: 'Indlæser...',
      finished: 'Ikke flere data',
      error: 'Indlæsning mislykkedes, klik for at prøve igen',
      retry: 'Klik for at prøve igen'
    },
    // Besked
    message: {
      close: 'Luk'
    },
    // Notifikation
    notification: {
      close: 'Luk'
    },
    // Indlæsning
    loading: {
      text: 'Indlæser...'
    },
    // Spin
    spin: {
      text: 'Indlæser...'
    },
    // Vurdering
    rate: {
      texts: ['Ekstremt dårlig', 'Skuffet', 'Rimelig', 'Tilfreds', 'Overrasket']
    },
    // Advarsel
    alert: {
      close: 'Luk'
    },
    // Tag
    tag: {
      close: 'Luk'
    },
    // Faner
    tabs: {
      close: 'Luk',
      add: 'Tilføj',
      more: 'Mere'
    },
    // Trin
    steps: {
      finish: 'Afsluttet',
      process: 'I gang',
      wait: 'Venter',
      error: 'Fejl'
    },
    // Fremskridt
    progress: {
      success: 'Succes',
      exception: 'Undtagelse',
      warning: 'Advarsel'
    },
    // Skelet
    skeleton: {
      loading: 'Indlæser...'
    },
    // Tom
    empty: {
      description: 'Ingen data',
      noData: 'Ingen data',
      noResult: 'Ingen resultater',
      networkError: 'Netværksfejl',
      serverError: 'Serverfejl'
    },
    // Resultat
    result: {
      success: 'Succes',
      error: 'Fejl',
      warning: 'Advarsel',
      info: 'Info',
      backHome: 'Tilbage til hjem'
    },
    // Vandfald
    waterfall: {
      loading: 'Indlæser...',
      noMore: 'Ikke flere data',
      empty: 'Ingen data'
    },
    // Beskrivelser
    descriptions: {
      colon: ':'
    },
    // Slider
    slider: {
      tipFormatter: '{value}'
    },
    // Kontakt
    switch: {
      on: 'TIL',
      off: 'FRA'
    },
    // Afkrydsningsfelt
    checkbox: {
      selectAll: 'Vælg alle'
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: 'Skjul menu',
      expand: 'Udvid menu'
    },
    // Kort
    card: {
      collapse: 'Skjul',
      expand: 'Udvid'
    },
    // Skjul
    collapse: {
      expand: 'Udvid',
      collapse: 'Skjul'
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: 'Indlæsning mislykkedes'
    },
    // Vandmærke
    watermark: {},
    // Skillevæg
    divider: {},
    // Karrusel
    carousel: {
      prev: 'Forrige',
      next: 'Næste'
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Anker
    anchor: {}
  }
}

export default da
