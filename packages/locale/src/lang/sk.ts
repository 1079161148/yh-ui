import type { Language } from '../index'

export const sk: Language = {
  name: 'sk',
  yh: {
    // Všeobecné
    common: {
      yes: 'Áno',
      no: 'Nie',
      confirm: 'Potvrdiť',
      cancel: 'Zrušiť',
      loading: 'Načítava sa',
      close: 'Zavrieť',
      clear: 'Vymazať',
      reset: 'Obnoviť',
      save: 'Uložiť',
      delete: 'Odstrániť',
      edit: 'Upraviť',
      add: 'Pridať',
      search: 'Hľadať',
      refresh: 'Obnoviť',
      expand: 'Rozbaliť',
      collapse: 'Zbaliť',
      more: 'Viac',
      noData: 'Žiadne údaje',
      noMatch: 'Žiadna zhoda',
      selectAll: 'Vybrať všetko',
      unselectAll: 'Zrušiť výber'
    },
    // Výber farby
    colorpicker: {
      confirm: 'OK',
      clear: 'Vymazať',
      eyeDropper: 'Pipeta',
      suggestionDark: 'Biely text je lepší',
      suggestionLight: 'Čierny text je lepší',
      recentColors: 'Posledné farby',
      presetColors: 'Prednastavené farby'
    },
    // Výber dátumu
    datepicker: {
      now: 'Teraz',
      today: 'Dnes',
      cancel: 'Zrušiť',
      clear: 'Vymazať',
      confirm: 'OK',
      selectDate: 'Vyberte dátum',
      selectTime: 'Vyberte čas',
      startDate: 'Dátum začiatku',
      startTime: 'Čas začiatku',
      endDate: 'Dátum konca',
      endTime: 'Čas konca',
      year: '',
      month: '',
      day: '',
      week: 'Týždeň',
      monthBeforeYear: true,
      prevYear: 'Predchádzajúci rok',
      nextYear: 'Nasledujúci rok',
      prevMonth: 'Predchádzajúci mesiac',
      nextMonth: 'Nasledujúci mesiac',
      weeks: {
        sun: 'Ne',
        mon: 'Po',
        tue: 'Ut',
        wed: 'St',
        thu: 'Št',
        fri: 'Pi',
        sat: 'So'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'Máj',
        jun: 'Jún',
        jul: 'Júl',
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
    // Výber času
    timepicker: {
      confirm: 'OK',
      cancel: 'Zrušiť',
      now: 'Teraz',
      placeholder: 'Vyberte čas',
      startPlaceholder: 'Čas začiatku',
      endPlaceholder: 'Čas konca',
      selectTime: 'Vyberte čas'
    },
    // Výber času
    timeselect: {
      placeholder: 'Vyberte čas'
    },
    // Strom
    tree: {
      emptyText: 'Žiadne údaje',
      loading: 'Načítava sa...',
      checkAll: 'Vybrať všetko',
      uncheckAll: 'Zrušiť výber',
      expandAll: 'Rozbaliť všetko',
      collapseAll: 'Zbaliť všetko'
    },
    // Výber stromu
    treeselect: {
      placeholder: 'Vyberte',
      emptyText: 'Žiadne údaje',
      loading: 'Načítava sa...',
      noMatch: 'Žiadna zhoda'
    },
    // Kalendár
    calendar: {
      prevMonth: 'Predchádzajúci mesiac',
      nextMonth: 'Nasledujúci mesiac',
      prevYear: 'Predchádzajúci rok',
      nextYear: 'Nasledujúci rok',
      today: 'Dnes',
      week: 'Týždeň',
      holiday: 'Sviatok',
      workday: 'Pracovný',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Ne',
        mon: 'Po',
        tue: 'Ut',
        wed: 'St',
        thu: 'Št',
        fri: 'Pi',
        sat: 'So'
      }
    },
    // Automatické dopĺňanie
    autocomplete: {
      loading: 'Načítava sa...',
      placeholder: 'Prosím, zadajte',
      noData: 'Žiadne údaje',
      noMatch: 'Žiadna zhoda'
    },
    // Odpočítavanie
    countdown: {
      days: 'dní',
      hours: 'hodín',
      minutes: 'minút',
      seconds: 'sekúnd',
      milliseconds: 'milisekúnd',
      finished: 'Dokončené'
    },
    // Kaskádový výber
    cascader: {
      noMatch: 'Žiadna zhoda',
      placeholder: 'Vyberte',
      loading: 'Načítava sa...',
      noData: 'Žiadne údaje'
    },
    // Prenos
    transfer: {
      noMatch: 'Žiadna zhoda',
      noData: 'Žiadne údaje',
      titles: ['Zoznam 1', 'Zoznam 2'],
      filterPlaceholder: 'Zadajte kľúčové slovo',
      noCheckedFormat: '{total} položiek',
      hasCheckedFormat: '{checked}/{total} vybraných',
      searchPlaceholder: 'Zadajte kľúčové slovo'
    },
    // Tabuľka
    table: {
      emptyText: 'Žiadne údaje',
      confirmFilter: 'Potvrdiť',
      resetFilter: 'Obnoviť',
      clearFilter: 'Všetko',
      sumText: 'Súčet',
      loading: 'Načítava sa...',
      index: 'Index',
      print: 'Tlačiť',
      cancel: 'Zrušiť',
      preview: 'Náhľad tlače',
      printTime: 'Čas tlače',
      total: 'Celkom {total} položiek',
      page: 'Strana {page}',
      yes: 'Áno',
      no: 'Nie',
      // Panel nástrojov
      toolbar: {
        refresh: 'Obnoviť',
        density: 'Hustota',
        densityDefault: 'Predvolená',
        densityLarge: 'Veľká',
        densitySmall: 'Malá',
        columnSetting: 'Nastavenia stĺpcov',
        fullscreen: 'Celá obrazovka',
        exitFullscreen: 'Ukončiť celú obrazovku',
        export: 'Export',
        import: 'Import',
        search: 'Hľadať',
        searchPlaceholder: 'Zadajte kľúčové slová na vyhľadávanie'
      },
      // Filter
      filter: {
        selectAll: 'Vybrať všetko',
        selectInvert: 'Invertovať výber',
        empty: 'Prázdne',
        notEmpty: 'Nie prázdne',
        contains: 'Obsahuje',
        notContains: 'Neobsahuje',
        equals: 'Rovná sa',
        notEquals: 'Nerovná sa',
        startsWith: 'Začína na',
        endsWith: 'Končí na',
        greaterThan: 'Väčší ako',
        lessThan: 'Menší ako',
        between: 'Medzi'
      },
      // Triedenie
      sort: {
        asc: 'Vzostupne',
        desc: 'Zostupne',
        clear: 'Zrušiť triedenie'
      },
      // Export
      export: {
        title: 'Export údajov',
        filename: 'Názov súboru',
        type: 'Typ súboru',
        scope: 'Rozsah exportu',
        scopeAll: 'Všetky údaje',
        scopeSelected: 'Vybrané údaje',
        scopeCurrentPage: 'Aktuálna strana',
        includeHeader: 'Zahrnúť hlavičku',
        exporting: 'Exportuje sa...',
        success: 'Export úspešný',
        error: 'Chyba exportu'
      },
      // Import
      import: {
        title: 'Import údajov',
        selectFile: 'Vyberte súbor',
        dragTip: 'Kliknite alebo presuňte súbor sem na nahratie',
        importing: 'Importuje sa...',
        success: 'Import úspešný',
        error: 'Chyba importu',
        preview: 'Náhľad údajov',
        confirm: 'Potvrdiť import'
      },
      // Tlač
      printConfig: {
        title: 'Nastavenia tlače',
        pageTitle: 'Názov strany',
        pageHeader: 'Hlavička',
        pageFooter: 'Päta',
        printAll: 'Tlačiť všetko',
        printSelected: 'Tlačiť vybrané',
        printCurrentPage: 'Tlačiť aktuálnu stranu',
        landscape: 'Na šírku',
        portrait: 'Na výšku',
        printing: 'Tlačí sa...'
      },
      // Nastavenia stĺpcov
      columnSetting: {
        title: 'Nastavenia stĺpcov',
        showAll: 'Zobraziť všetko',
        hideAll: 'Skryť všetko',
        reset: 'Obnoviť',
        fixedLeft: 'Fixovať vľavo',
        fixedRight: 'Fixovať vpravo',
        unfixed: 'Zrušiť fixáciu'
      },
      // Kontextové menu
      contextMenu: {
        copy: 'Kopírovať',
        copyRow: 'Kopírovať riadok',
        copyCell: 'Kopírovať bunku',
        paste: 'Prilepiť',
        insertRowAbove: 'Vložiť riadok nad',
        insertRowBelow: 'Vložiť riadok pod',
        deleteRow: 'Odstrániť riadok',
        deleteSelectedRows: 'Odstrániť vybrané riadky',
        exportSelected: 'Exportovať vybrané'
      },
      // Výber
      selection: {
        selectAll: 'Vybrať všetko',
        selectInvert: 'Invertovať výber',
        selectNone: 'Zrušiť výber',
        selected: '{count} položiek vybraných'
      },
      // Rozbalenie
      expand: {
        expandAll: 'Rozbaliť všetko',
        collapseAll: 'Zbaliť všetko'
      },
      // Strom
      tree: {
        expandAll: 'Rozbaliť všetko',
        collapseAll: 'Zbaliť všetko',
        expandLevel: 'Rozbaliť do úrovne {level}'
      },
      // Presúvanie
      drag: {
        dragTip: 'Presuňte na zmenu poradia',
        dropTip: 'Pustite na umiestnenie'
      }
    },
    // Okno správy
    messagebox: {
      title: 'Správa',
      confirm: 'OK',
      cancel: 'Zrušiť',
      close: 'Zavrieť',
      error: 'Neplatný vstup',
      alert: 'Upozornenie',
      prompt: 'Tip',
      inputPlaceholder: 'Prosím, zadajte'
    },
    // Nahrávanie
    upload: {
      deleteTip: 'stlačte delete na odstránenie',
      delete: 'Odstrániť',
      preview: 'Náhľad',
      continue: 'Pokračovať',
      upload: 'Kliknite na nahratie',
      tip: 'Kliknite alebo presuňte súbor do tejto oblasti na <em>nahratie</em>',
      dragTip: 'Presuňte súbor sem alebo kliknite na nahratie',
      uploading: 'Nahráva sa...',
      success: 'Nahratie úspešné',
      error: 'Chyba nahrávania',
      retry: 'Skúsiť znova',
      cancel: 'Zrušiť nahrávanie',
      fileTypeError: 'Typ súboru nie je podporovaný',
      fileSizeError: 'Veľkosť súboru prekračuje limit',
      fileCountError: 'Počet súborov prekračuje limit'
    },
    // Formulár
    form: {
      validationFailed: 'Overenie zlyhalo',
      required: 'Povinné',
      pleaseInput: 'Prosím, zadajte',
      pleaseSelect: 'Prosím, vyberte'
    },
    // Tlačidlo
    button: {
      loading: 'Načítava sa...'
    },
    // Vstup
    input: {
      placeholder: 'Prosím, zadajte',
      clear: 'Vymazať',
      showPassword: 'Zobraziť heslo',
      hidePassword: 'Skryť heslo',
      copy: 'Kopírovať',
      copied: 'Skopírované'
    },
    // Číselný vstup
    inputnumber: {
      placeholder: 'Prosím, zadajte číslo',
      increase: 'Zvýšiť',
      decrease: 'Znížiť'
    },
    // Vstup tagov
    inputtag: {
      placeholder: 'Prosím, zadajte',
      add: 'Pridať',
      remove: 'Odstrániť'
    },
    // Drobková navigácia
    breadcrumb: {
      label: 'Drobková navigácia',
      more: 'Viac'
    },
    // Späť nahor
    backtop: {
      text: 'Späť nahor'
    },
    // Výber
    select: {
      placeholder: 'Prosím, vyberte',
      noData: 'Žiadne údaje',
      loading: 'Načítava sa...',
      noMatch: 'Žiadna zhoda',
      selectAll: 'Vybrať všetko',
      clearAll: 'Vymazať všetko'
    },
    // Stránkovanie
    pagination: {
      goto: 'Prejsť na',
      page: '',
      total: 'Celkom {total}',
      pageSize: '/strana',
      prev: 'Predchádzajúca',
      next: 'Nasledujúca',
      first: 'Prvá',
      last: 'Posledná',
      pageClassifier: ''
    },
    // Potvrdenie
    popconfirm: {
      confirm: 'OK',
      cancel: 'Zrušiť',
      dontAskAgain: 'Nepýtať sa znova'
    },
    // Dialóg
    dialog: {
      confirm: 'OK',
      cancel: 'Zrušiť',
      close: 'Zavrieť',
      maximize: 'Maximalizovať',
      restore: 'Obnoviť'
    },
    // Zásuvka
    drawer: {
      close: 'Zavrieť',
      confirm: 'OK',
      cancel: 'Zrušiť'
    },
    // Rozbaľovacie menu
    dropdown: {
      loading: 'Načítava sa...'
    },
    // Obrázok
    image: {
      error: 'CHYBA',
      loading: 'Načítava sa...',
      preview: 'Náhľad',
      zoomIn: 'Priblížiť',
      zoomOut: 'Oddialiť',
      rotateLeft: 'Otočiť vľavo',
      rotateRight: 'Otočiť vpravo',
      originalSize: 'Pôvodná veľkosť',
      fullscreen: 'Celá obrazovka'
    },
    // Prehliadač obrázkov
    imageviewer: {
      close: 'Zavrieť',
      prev: 'Predchádzajúci',
      next: 'Nasledujúci',
      zoomIn: 'Priblížiť',
      zoomOut: 'Oddialiť',
      rotateLeft: 'Otočiť vľavo',
      rotateRight: 'Otočiť vpravo',
      reset: 'Obnoviť',
      fullscreen: 'Celá obrazovka',
      exitFullscreen: 'Ukončiť celú obrazovku'
    },
    // Nekonečné posúvanie
    infinitescroll: {
      loading: 'Načítava sa...',
      finished: 'Žiadne ďalšie údaje',
      error: 'Chyba načítavania, kliknite na opakovanie',
      retry: 'Kliknite na opakovanie'
    },
    // Správa
    message: {
      close: 'Zavrieť'
    },
    // Oznámenie
    notification: {
      close: 'Zavrieť'
    },
    // Načítavanie
    loading: {
      text: 'Načítava sa...'
    },
    // Spinner
    spin: {
      text: 'Načítava sa...'
    },
    // Hodnotenie
    rate: {
      texts: ['Veľmi zlé', 'Sklamaný', 'OK', 'Spokojný', 'Prekvapený']
    },
    // Upozornenie
    alert: {
      close: 'Zavrieť'
    },
    // Tag
    tag: {
      close: 'Zavrieť'
    },
    // Karty
    tabs: {
      close: 'Zavrieť',
      add: 'Pridať',
      more: 'Viac'
    },
    // Kroky
    steps: {
      finish: 'Dokončené',
      process: 'Prebieha',
      wait: 'Čaká',
      error: 'Chyba'
    },
    // Priebeh
    progress: {
      success: 'Úspech',
      exception: 'Výnimka',
      warning: 'Varovanie'
    },
    // Kostra
    skeleton: {
      loading: 'Načítava sa...'
    },
    // Prázdne
    empty: {
      description: 'Žiadne údaje',
      noData: 'Žiadne údaje',
      noResult: 'Žiadne výsledky',
      networkError: 'Chyba siete',
      serverError: 'Chyba servera'
    },
    // Výsledok
    result: {
      success: 'Úspech',
      error: 'Chyba',
      warning: 'Varovanie',
      info: 'Informácia',
      backHome: 'Späť domov'
    },
    // Vodopád
    waterfall: {
      loading: 'Načítava sa...',
      noMore: 'Žiadne ďalšie údaje',
      empty: 'Žiadne údaje'
    },
    // Popisy
    descriptions: {
      colon: ':'
    },
    // Posuvník
    slider: {
      tipFormatter: '{value}'
    },
    // Prepínač
    switch: {
      on: 'ZAP',
      off: 'VYP'
    },
    // Zaškrtávacie políčko
    checkbox: {
      selectAll: 'Vybrať všetko'
    },
    // Rádio
    radio: {},
    // Menu
    menu: {
      collapse: 'Zbaliť menu',
      expand: 'Rozbaliť menu'
    },
    // Karta
    card: {
      collapse: 'Zbaliť',
      expand: 'Rozbaliť'
    },
    // Zbalenie
    collapse: {
      expand: 'Rozbaliť',
      collapse: 'Zbaliť'
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Odznak
    badge: {},
    // Avatar
    avatar: {
      error: 'Chyba načítavania'
    },
    // Vodoznak
    watermark: {},
    // Oddeľovač
    divider: {},
    // Kolotoč
    carousel: {
      prev: 'Predchádzajúci',
      next: 'Nasledujúci'
    },
    // Bežiaci text
    marquee: {},
    // Pripnutie
    affix: {},
    // Kotva
    anchor: {}
  }
}

export default sk
