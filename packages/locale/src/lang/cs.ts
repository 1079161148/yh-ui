import type { Language } from '../index'

export const cs: Language = {
  name: 'cs',
  yh: {
    // Společné
    common: {
      yes: 'Ano',
      no: 'Ne',
      confirm: 'Potvrdit',
      cancel: 'Zrušit',
      loading: 'Načítání',
      close: 'Zavřít',
      clear: 'Vymazat',
      reset: 'Obnovit',
      save: 'Uložit',
      delete: 'Smazat',
      edit: 'Upravit',
      add: 'Přidat',
      search: 'Hledat',
      refresh: 'Obnovit',
      expand: 'Rozbalit',
      collapse: 'Sbalit',
      more: 'Více',
      noData: 'Žádná data',
      noMatch: 'Žádná odpovídající data',
      selectAll: 'Vybrat vše',
      unselectAll: 'Zrušit výběr všeho'
    },
    // Výběr barvy
    colorpicker: {
      confirm: 'OK',
      clear: 'Vymazat',
      eyeDropper: 'Kapátko',
      suggestionDark: 'Bílý text je nejlepší',
      suggestionLight: 'Černý text je nejlepší',
      recentColors: 'Nedávné barvy',
      presetColors: 'Přednastavené barvy'
    },
    // Výběr data
    datepicker: {
      now: 'Nyní',
      today: 'Dnes',
      cancel: 'Zrušit',
      clear: 'Vymazat',
      confirm: 'OK',
      selectDate: 'Vyberte datum',
      selectTime: 'Vyberte čas',
      startDate: 'Datum začátku',
      startTime: 'Čas začátku',
      endDate: 'Datum konce',
      endTime: 'Čas konce',
      year: '',
      month: '',
      day: '',
      week: 'Týden',
      monthBeforeYear: true,
      prevYear: 'Předchozí rok',
      nextYear: 'Příští rok',
      prevMonth: 'Předchozí měsíc',
      nextMonth: 'Příští měsíc',
      weeks: {
        sun: 'Ne',
        mon: 'Po',
        tue: 'Út',
        wed: 'St',
        thu: 'Čt',
        fri: 'Pá',
        sat: 'So'
      },
      months: {
        jan: 'Led',
        feb: 'Úno',
        mar: 'Bře',
        apr: 'Dub',
        may: 'Kvě',
        jun: 'Čer',
        jul: 'Čvc',
        aug: 'Srp',
        sep: 'Zář',
        oct: 'Říj',
        nov: 'Lis',
        dec: 'Pro'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Výběr času
    timepicker: {
      confirm: 'OK',
      cancel: 'Zrušit',
      now: 'Nyní',
      placeholder: 'Vyberte čas',
      startPlaceholder: 'Čas začátku',
      endPlaceholder: 'Čas konce',
      selectTime: 'Vyberte čas'
    },
    // Výběr času
    timeselect: {
      placeholder: 'Vyberte čas'
    },
    // Strom
    tree: {
      emptyText: 'Žádná data',
      loading: 'Načítání...',
      checkAll: 'Vybrat vše',
      uncheckAll: 'Zrušit výběr všeho',
      expandAll: 'Rozbalit vše',
      collapseAll: 'Sbalit vše'
    },
    // Výběr stromu
    treeselect: {
      placeholder: 'Vyberte',
      emptyText: 'Žádná data',
      loading: 'Načítání...',
      noMatch: 'Žádná odpovídající data'
    },
    // Kalendář
    calendar: {
      prevMonth: 'Předchozí měsíc',
      nextMonth: 'Příští měsíc',
      prevYear: 'Předchozí rok',
      nextYear: 'Příští rok',
      today: 'Dnes',
      week: 'Týden',
      holiday: 'Svátek',
      workday: 'Práce',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Ne',
        mon: 'Po',
        tue: 'Út',
        wed: 'St',
        thu: 'Čt',
        fri: 'Pá',
        sat: 'So'
      }
    },
    // Automatické dokončování
    autocomplete: {
      loading: 'Načítání...',
      placeholder: 'Prosím zadejte',
      noData: 'Žádná data',
      noMatch: 'Žádná odpovídající data'
    },
    // Odpočítávání
    countdown: {
      days: 'dní',
      hours: 'hodin',
      minutes: 'minut',
      seconds: 'sekund',
      milliseconds: 'milisekund',
      finished: 'Dokončeno'
    },
    // Kaskádový výběr
    cascader: {
      noMatch: 'Žádná odpovídající data',
      placeholder: 'Vyberte',
      loading: 'Načítání...',
      noData: 'Žádná data'
    },
    // Převod
    transfer: {
      noMatch: 'Žádná odpovídající data',
      noData: 'Žádná data',
      titles: ['Seznam 1', 'Seznam 2'],
      filterPlaceholder: 'Zadejte klíčové slovo',
      noCheckedFormat: '{total} položek',
      hasCheckedFormat: '{checked}/{total} vybráno',
      searchPlaceholder: 'Zadejte klíčové slovo'
    },
    // Tabulka
    table: {
      emptyText: 'Žádná data',
      confirmFilter: 'Potvrdit',
      resetFilter: 'Obnovit',
      clearFilter: 'Vše',
      sumText: 'Součet',
      loading: 'Načítání...',
      index: 'Index',
      print: 'Tisk',
      cancel: 'Zrušit',
      preview: 'Náhled tisku',
      printTime: 'Čas tisku',
      total: 'Celkem {total} položek',
      page: 'Stránka {page}',
      yes: 'Ano',
      no: 'Ne',
      // Panel nástrojů
      toolbar: {
        refresh: 'Obnovit',
        density: 'Hustota',
        densityDefault: 'Výchozí',
        densityLarge: 'Velká',
        densitySmall: 'Malá',
        columnSetting: 'Nastavení sloupců',
        fullscreen: 'Celá obrazovka',
        exitFullscreen: 'Ukončit celou obrazovku',
        export: 'Exportovat',
        import: 'Importovat',
        search: 'Hledat',
        searchPlaceholder: 'Zadejte klíčová slova pro vyhledávání'
      },
      // Filtr
      filter: {
        selectAll: 'Vybrat vše',
        selectInvert: 'Invertovat výběr',
        empty: 'Je prázdné',
        notEmpty: 'Není prázdné',
        contains: 'Obsahuje',
        notContains: 'Neobsahuje',
        equals: 'Rovná se',
        notEquals: 'Nerovná se',
        startsWith: 'Začíná na',
        endsWith: 'Končí na',
        greaterThan: 'Větší než',
        lessThan: 'Menší než',
        between: 'Mezi'
      },
      // Řazení
      sort: {
        asc: 'Vzestupně',
        desc: 'Sestupně',
        clear: 'Vymazat řazení'
      },
      // Export
      export: {
        title: 'Exportovat data',
        filename: 'Název souboru',
        type: 'Typ souboru',
        scope: 'Rozsah exportu',
        scopeAll: 'Všechna data',
        scopeSelected: 'Vybraná data',
        scopeCurrentPage: 'Aktuální stránka',
        includeHeader: 'Zahrnout hlavičku',
        exporting: 'Exportování...',
        success: 'Export úspěšný',
        error: 'Export selhal'
      },
      // Import
      import: {
        title: 'Importovat data',
        selectFile: 'Vyberte soubor',
        dragTip: 'Klikněte nebo přetáhněte soubor sem pro nahrání',
        importing: 'Importování...',
        success: 'Import úspěšný',
        error: 'Import selhal',
        preview: 'Náhled dat',
        confirm: 'Potvrdit import'
      },
      // Tisk
      printConfig: {
        title: 'Nastavení tisku',
        pageTitle: 'Název stránky',
        pageHeader: 'Hlavička',
        pageFooter: 'Patička',
        printAll: 'Tisknout vše',
        printSelected: 'Tisknout vybrané',
        printCurrentPage: 'Tisknout aktuální stránku',
        landscape: 'Na šířku',
        portrait: 'Na výšku',
        printing: 'Tisknutí...'
      },
      // Nastavení sloupců
      columnSetting: {
        title: 'Nastavení sloupců',
        showAll: 'Zobrazit vše',
        hideAll: 'Skrýt vše',
        reset: 'Obnovit',
        fixedLeft: 'Připevnit vlevo',
        fixedRight: 'Připevnit vpravo',
        unfixed: 'Uvolnit'
      },
      // Kontextové menu
      contextMenu: {
        copy: 'Kopírovat',
        copyRow: 'Kopírovat řádek',
        copyCell: 'Kopírovat buňku',
        paste: 'Vložit',
        insertRowAbove: 'Vložit řádek nad',
        insertRowBelow: 'Vložit řádek pod',
        deleteRow: 'Smazat řádek',
        deleteSelectedRows: 'Smazat vybrané řádky',
        exportSelected: 'Exportovat vybrané'
      },
      // Výběr
      selection: {
        selectAll: 'Vybrat vše',
        selectInvert: 'Invertovat výběr',
        selectNone: 'Zrušit výběr',
        selected: 'Vybráno {count} položek'
      },
      // Rozbalit
      expand: {
        expandAll: 'Rozbalit vše',
        collapseAll: 'Sbalit vše'
      },
      // Strom
      tree: {
        expandAll: 'Rozbalit vše',
        collapseAll: 'Sbalit vše',
        expandLevel: 'Rozbalit na úroveň {level}'
      },
      // Přetahování
      drag: {
        dragTip: 'Přetáhněte pro změnu pořadí',
        dropTip: 'Pusťte pro umístění'
      }
    },
    // Zpráva
    messagebox: {
      title: 'Zpráva',
      confirm: 'OK',
      cancel: 'Zrušit',
      close: 'Zavřít',
      error: 'Neplatný vstup',
      alert: 'Upozornění',
      prompt: 'Výzva',
      inputPlaceholder: 'Prosím zadejte'
    },
    // Nahrávání
    upload: {
      deleteTip: 'stiskněte delete pro odstranění',
      delete: 'Smazat',
      preview: 'Náhled',
      continue: 'Pokračovat',
      upload: 'Klikněte pro nahrání',
      tip: 'Klikněte nebo přetáhněte soubor do této oblasti pro <em>nahrání</em>',
      dragTip: 'Přetáhněte soubor sem nebo klikněte pro nahrání',
      uploading: 'Nahrávání...',
      success: 'Nahrání úspěšné',
      error: 'Nahrání selhalo',
      retry: 'Zkusit znovu',
      cancel: 'Zrušit nahrávání',
      fileTypeError: 'Typ souboru není podporován',
      fileSizeError: 'Velikost souboru překračuje limit',
      fileCountError: 'Počet souborů překračuje limit'
    },
    // Formulář
    form: {
      validationFailed: 'Ověření selhalo',
      required: 'Povinné',
      pleaseInput: 'Prosím zadejte',
      pleaseSelect: 'Prosím vyberte'
    },
    // Tlačítko
    button: {
      loading: 'Načítání...'
    },
    // Vstup
    input: {
      placeholder: 'Prosím zadejte',
      clear: 'Vymazat',
      showPassword: 'Zobrazit heslo',
      hidePassword: 'Skrýt heslo',
      copy: 'Kopírovat',
      copied: 'Zkopírováno'
    },
    // Číselný vstup
    inputnumber: {
      placeholder: 'Prosím zadejte číslo',
      increase: 'Zvýšit',
      decrease: 'Snížit'
    },
    // Vstup značek
    inputtag: {
      placeholder: 'Prosím zadejte',
      add: 'Přidat',
      remove: 'Odstranit'
    },
    // Drobečková navigace
    breadcrumb: {
      label: 'Drobečková navigace',
      more: 'Více'
    },
    // Zpět nahoru
    backtop: {
      text: 'Zpět nahoru'
    },
    // Výběr
    select: {
      placeholder: 'Prosím vyberte',
      noData: 'Žádná data',
      loading: 'Načítání...',
      noMatch: 'Žádná odpovídající data',
      selectAll: 'Vybrat vše',
      clearAll: 'Vymazat vše'
    },
    // Stránkování
    pagination: {
      goto: 'Přejít na',
      page: '',
      total: 'Celkem {total}',
      pageSize: '/stránka',
      prev: 'Předchozí',
      next: 'Další',
      first: 'První',
      last: 'Poslední',
      pageClassifier: ''
    },
    // Potvrzení
    popconfirm: {
      confirm: 'OK',
      cancel: 'Zrušit',
      dontAskAgain: 'Znovu se neptat'
    },
    // Dialog
    dialog: {
      confirm: 'OK',
      cancel: 'Zrušit',
      close: 'Zavřít',
      maximize: 'Maximalizovat',
      restore: 'Obnovit'
    },
    // Zásuvka
    drawer: {
      close: 'Zavřít',
      confirm: 'OK',
      cancel: 'Zrušit'
    },
    // Rozbalovací menu
    dropdown: {
      loading: 'Načítání...'
    },
    // Obrázek
    image: {
      error: 'SELHALO',
      loading: 'Načítání...',
      preview: 'Náhled',
      zoomIn: 'Přiblížit',
      zoomOut: 'Oddálit',
      rotateLeft: 'Otočit doleva',
      rotateRight: 'Otočit doprava',
      originalSize: 'Původní velikost',
      fullscreen: 'Celá obrazovka'
    },
    // Prohlížeč obrázků
    imageviewer: {
      close: 'Zavřít',
      prev: 'Předchozí',
      next: 'Další',
      zoomIn: 'Přiblížit',
      zoomOut: 'Oddálit',
      rotateLeft: 'Otočit doleva',
      rotateRight: 'Otočit doprava',
      reset: 'Obnovit',
      fullscreen: 'Celá obrazovka',
      exitFullscreen: 'Ukončit celou obrazovku'
    },
    // Nekonečné posouvání
    infinitescroll: {
      loading: 'Načítání...',
      finished: 'Žádná další data',
      error: 'Načtení selhalo, klikněte pro opakování',
      retry: 'Klikněte pro opakování'
    },
    // Zpráva
    message: {
      close: 'Zavřít'
    },
    // Oznámení
    notification: {
      close: 'Zavřít'
    },
    // Načítání
    loading: {
      text: 'Načítání...'
    },
    // Točení
    spin: {
      text: 'Načítání...'
    },
    // Hodnocení
    rate: {
      texts: ['Velmi špatné', 'Zklamání', 'Průměrné', 'Spokojené', 'Překvapené']
    },
    // Upozornění
    alert: {
      close: 'Zavřít'
    },
    // Značka
    tag: {
      close: 'Zavřít'
    },
    // Karty
    tabs: {
      close: 'Zavřít',
      add: 'Přidat',
      more: 'Více'
    },
    // Kroky
    steps: {
      finish: 'Dokončeno',
      process: 'Probíhá',
      wait: 'Čekání',
      error: 'Chyba'
    },
    // Průběh
    progress: {
      success: 'Úspěch',
      exception: 'Výjimka',
      warning: 'Upozornění'
    },
    // Kostra
    skeleton: {
      loading: 'Načítání...'
    },
    // Prázdné
    empty: {
      description: 'Žádná data',
      noData: 'Žádná data',
      noResult: 'Žádné výsledky',
      networkError: 'Chyba sítě',
      serverError: 'Chyba serveru'
    },
    // Výsledek
    result: {
      success: 'Úspěch',
      error: 'Chyba',
      warning: 'Upozornění',
      info: 'Informace',
      backHome: 'Zpět na začátek'
    },
    // Vodopád
    waterfall: {
      loading: 'Načítání...',
      noMore: 'Žádná další data',
      empty: 'Žádná data'
    },
    // Popisy
    descriptions: {
      colon: ':'
    },
    // Posuvník
    slider: {
      tipFormatter: '{value}'
    },
    // Přepínač
    switch: {
      on: 'ZAP',
      off: 'VYP'
    },
    // Zaškrtávací pole
    checkbox: {
      selectAll: 'Vybrat vše'
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: 'Sbalit menu',
      expand: 'Rozbalit menu'
    },
    // Karta
    card: {
      collapse: 'Sbalit',
      expand: 'Rozbalit'
    },
    // Sbalit
    collapse: {
      expand: 'Rozbalit',
      collapse: 'Sbalit'
    },
    // Nápověda
    tooltip: {},
    // Vyskakovací okno
    popover: {},
    // Odznak
    badge: {},
    // Avatar
    avatar: {
      error: 'Načtení selhalo'
    },
    // Vodoznak
    watermark: {},
    // Oddělovač
    divider: {},
    // Kolotoč
    carousel: {
      prev: 'Předchozí',
      next: 'Další'
    },
    // Běžící text
    marquee: {},
    // Připnutí
    affix: {},
    // Kotva
    anchor: {}
  }
}

export default cs
