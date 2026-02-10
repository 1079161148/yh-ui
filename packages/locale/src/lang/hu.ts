import type { Language } from '../index'

export const hu: Language = {
  name: 'hu',
  yh: {
    // Általános
    common: {
      yes: 'Igen',
      no: 'Nem',
      confirm: 'Megerősítés',
      cancel: 'Mégse',
      loading: 'Betöltés',
      close: 'Bezárás',
      clear: 'Törlés',
      reset: 'Visszaállítás',
      save: 'Mentés',
      delete: 'Törlés',
      edit: 'Szerkesztés',
      add: 'Hozzáadás',
      search: 'Keresés',
      refresh: 'Frissítés',
      expand: 'Kibontás',
      collapse: 'Összecsukás',
      more: 'Több',
      noData: 'Nincs adat',
      noMatch: 'Nincs találat',
      selectAll: 'Összes kijelölése',
      unselectAll: 'Kijelölés megszüntetése'
    },
    // Színválasztó
    colorpicker: {
      confirm: 'OK',
      clear: 'Törlés',
      eyeDropper: 'Pipetta',
      suggestionDark: 'Fehér szöveg jobb',
      suggestionLight: 'Fekete szöveg jobb',
      recentColors: 'Legutóbbi színek',
      presetColors: 'Előre beállított színek'
    },
    // Dátumválasztó
    datepicker: {
      now: 'Most',
      today: 'Ma',
      cancel: 'Mégse',
      clear: 'Törlés',
      confirm: 'OK',
      selectDate: 'Válasszon dátumot',
      selectTime: 'Válasszon időt',
      startDate: 'Kezdő dátum',
      startTime: 'Kezdő idő',
      endDate: 'Befejező dátum',
      endTime: 'Befejező idő',
      year: '',
      month: '',
      day: '',
      week: 'Hét',
      monthBeforeYear: true,
      prevYear: 'Előző év',
      nextYear: 'Következő év',
      prevMonth: 'Előző hónap',
      nextMonth: 'Következő hónap',
      weeks: {
        sun: 'V',
        mon: 'H',
        tue: 'K',
        wed: 'Sze',
        thu: 'Cs',
        fri: 'P',
        sat: 'Szo'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Már',
        apr: 'Ápr',
        may: 'Máj',
        jun: 'Jún',
        jul: 'Júl',
        aug: 'Aug',
        sep: 'Szep',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Dec'
      },
      quarters: {
        q1: 'N1',
        q2: 'N2',
        q3: 'N3',
        q4: 'N4'
      }
    },
    // Időválasztó
    timepicker: {
      confirm: 'OK',
      cancel: 'Mégse',
      now: 'Most',
      placeholder: 'Válasszon időt',
      startPlaceholder: 'Kezdő idő',
      endPlaceholder: 'Befejező idő',
      selectTime: 'Válasszon időt'
    },
    // Idő kiválasztása
    timeselect: {
      placeholder: 'Válasszon időt'
    },
    // Fa
    tree: {
      emptyText: 'Nincs adat',
      loading: 'Betöltés...',
      checkAll: 'Összes kijelölése',
      uncheckAll: 'Kijelölés megszüntetése',
      expandAll: 'Összes kibontása',
      collapseAll: 'Összes összecsukása'
    },
    // Fa kiválasztó
    treeselect: {
      placeholder: 'Válasszon',
      emptyText: 'Nincs adat',
      loading: 'Betöltés...',
      noMatch: 'Nincs találat'
    },
    // Naptár
    calendar: {
      prevMonth: 'Előző hónap',
      nextMonth: 'Következő hónap',
      prevYear: 'Előző év',
      nextYear: 'Következő év',
      today: 'Ma',
      week: 'Hét',
      holiday: 'Szabadnap',
      workday: 'Munkanap',
      monthHeaderFormat: 'YYYY MMMM',
      weeks: {
        sun: 'V',
        mon: 'H',
        tue: 'K',
        wed: 'Sze',
        thu: 'Cs',
        fri: 'P',
        sat: 'Szo'
      }
    },
    // Automatikus kiegészítés
    autocomplete: {
      loading: 'Betöltés...',
      placeholder: 'Kérjük, írjon be',
      noData: 'Nincs adat',
      noMatch: 'Nincs találat'
    },
    // Visszaszámlálás
    countdown: {
      days: 'nap',
      hours: 'óra',
      minutes: 'perc',
      seconds: 'másodperc',
      milliseconds: 'ezredmásodperc',
      finished: 'Befejezve'
    },
    // Kaszkád választó
    cascader: {
      noMatch: 'Nincs találat',
      placeholder: 'Válasszon',
      loading: 'Betöltés...',
      noData: 'Nincs adat'
    },
    // Átvitel
    transfer: {
      noMatch: 'Nincs találat',
      noData: 'Nincs adat',
      titles: ['1. lista', '2. lista'],
      filterPlaceholder: 'Kulcsszó megadása',
      noCheckedFormat: '{total} elem',
      hasCheckedFormat: '{checked}/{total} kijelölve',
      searchPlaceholder: 'Kulcsszó megadása'
    },
    // Táblázat
    table: {
      emptyText: 'Nincs adat',
      confirmFilter: 'Megerősítés',
      resetFilter: 'Visszaállítás',
      clearFilter: 'Összes',
      sumText: 'Összeg',
      loading: 'Betöltés...',
      index: 'Index',
      print: 'Nyomtatás',
      cancel: 'Mégse',
      preview: 'Nyomtatási előnézet',
      printTime: 'Nyomtatás ideje',
      total: 'Összesen {total} elem',
      page: '{page}. oldal',
      yes: 'Igen',
      no: 'Nem',
      // Eszköztár
      toolbar: {
        refresh: 'Frissítés',
        density: 'Sűrűség',
        densityDefault: 'Alapértelmezett',
        densityLarge: 'Nagy',
        densitySmall: 'Kicsi',
        columnSetting: 'Oszlopbeállítások',
        fullscreen: 'Teljes képernyő',
        exitFullscreen: 'Kilépés a teljes képernyőből',
        export: 'Exportálás',
        import: 'Importálás',
        search: 'Keresés',
        searchPlaceholder: 'Adja meg a keresési kulcsszavakat'
      },
      // Szűrő
      filter: {
        selectAll: 'Összes kijelölése',
        selectInvert: 'Kijelölés megfordítása',
        empty: 'Üres',
        notEmpty: 'Nem üres',
        contains: 'Tartalmazza',
        notContains: 'Nem tartalmazza',
        equals: 'Egyenlő',
        notEquals: 'Nem egyenlő',
        startsWith: 'Kezdődik',
        endsWith: 'Végződik',
        greaterThan: 'Nagyobb mint',
        lessThan: 'Kisebb mint',
        between: 'Között'
      },
      // Rendezés
      sort: {
        asc: 'Növekvő',
        desc: 'Csökkenő',
        clear: 'Rendezés törlése'
      },
      // Exportálás
      export: {
        title: 'Adatok exportálása',
        filename: 'Fájlnév',
        type: 'Fájltípus',
        scope: 'Exportálási hatókör',
        scopeAll: 'Minden adat',
        scopeSelected: 'Kijelölt adatok',
        scopeCurrentPage: 'Aktuális oldal',
        includeHeader: 'Fejléc belefoglalása',
        exporting: 'Exportálás...',
        success: 'Exportálás sikeres',
        error: 'Exportálási hiba'
      },
      // Importálás
      import: {
        title: 'Adatok importálása',
        selectFile: 'Válasszon fájlt',
        dragTip: 'Kattintson vagy húzza ide a fájlt a feltöltéshez',
        importing: 'Importálás...',
        success: 'Importálás sikeres',
        error: 'Importálási hiba',
        preview: 'Adatok előnézete',
        confirm: 'Importálás megerősítése'
      },
      // Nyomtatás
      printConfig: {
        title: 'Nyomtatási beállítások',
        pageTitle: 'Oldal címe',
        pageHeader: 'Fejléc',
        pageFooter: 'Lábléc',
        printAll: 'Összes nyomtatása',
        printSelected: 'Kijelöltek nyomtatása',
        printCurrentPage: 'Aktuális oldal nyomtatása',
        landscape: 'Fekvő',
        portrait: 'Álló',
        printing: 'Nyomtatás...'
      },
      // Oszlopbeállítások
      columnSetting: {
        title: 'Oszlopbeállítások',
        showAll: 'Összes megjelenítése',
        hideAll: 'Összes elrejtése',
        reset: 'Visszaállítás',
        fixedLeft: 'Rögzítés balra',
        fixedRight: 'Rögzítés jobbra',
        unfixed: 'Rögzítés feloldása'
      },
      // Helyi menü
      contextMenu: {
        copy: 'Másolás',
        copyRow: 'Sor másolása',
        copyCell: 'Cella másolása',
        paste: 'Beillesztés',
        insertRowAbove: 'Sor beszúrása fölé',
        insertRowBelow: 'Sor beszúrása alá',
        deleteRow: 'Sor törlése',
        deleteSelectedRows: 'Kijelölt sorok törlése',
        exportSelected: 'Kijelöltek exportálása'
      },
      // Kijelölés
      selection: {
        selectAll: 'Összes kijelölése',
        selectInvert: 'Kijelölés megfordítása',
        selectNone: 'Kijelölés törlése',
        selected: '{count} elem kijelölve'
      },
      // Kibontás
      expand: {
        expandAll: 'Összes kibontása',
        collapseAll: 'Összes összecsukása'
      },
      // Fa
      tree: {
        expandAll: 'Összes kibontása',
        collapseAll: 'Összes összecsukása',
        expandLevel: 'Kibontás {level} szintig'
      },
      // Húzás
      drag: {
        dragTip: 'Húzza a sorrend módosításához',
        dropTip: 'Engedje el az elhelyezéshez'
      }
    },
    // Üzenetdoboz
    messagebox: {
      title: 'Üzenet',
      confirm: 'OK',
      cancel: 'Mégse',
      close: 'Bezárás',
      error: 'Érvénytelen bemenet',
      alert: 'Figyelmeztetés',
      prompt: 'Súgó',
      inputPlaceholder: 'Kérjük, írjon be'
    },
    // Feltöltés
    upload: {
      deleteTip: 'nyomja meg a delete gombot a törléshez',
      delete: 'Törlés',
      preview: 'Előnézet',
      continue: 'Folytatás',
      upload: 'Kattintson a feltöltéshez',
      tip: 'Kattintson vagy húzza a fájlt ide a <em>feltöltéshez</em>',
      dragTip: 'Húzza ide a fájlt vagy kattintson a feltöltéshez',
      uploading: 'Feltöltés...',
      success: 'Feltöltés sikeres',
      error: 'Feltöltési hiba',
      retry: 'Újrapróbálás',
      cancel: 'Feltöltés megszakítása',
      fileTypeError: 'A fájltípus nem támogatott',
      fileSizeError: 'A fájlméret meghaladja a korlátot',
      fileCountError: 'A fájlok száma meghaladja a korlátot'
    },
    // Űrlap
    form: {
      validationFailed: 'Érvényesítés sikertelen',
      required: 'Kötelező',
      pleaseInput: 'Kérjük, írjon be',
      pleaseSelect: 'Kérjük, válasszon'
    },
    // Gomb
    button: {
      loading: 'Betöltés...'
    },
    // Beviteli mező
    input: {
      placeholder: 'Kérjük, írjon be',
      clear: 'Törlés',
      showPassword: 'Jelszó megjelenítése',
      hidePassword: 'Jelszó elrejtése',
      copy: 'Másolás',
      copied: 'Másolva'
    },
    // Számláló
    inputnumber: {
      placeholder: 'Kérjük, adjon meg egy számot',
      increase: 'Növelés',
      decrease: 'Csökkentés'
    },
    // Címke bevitel
    inputtag: {
      placeholder: 'Kérjük, írjon be',
      add: 'Hozzáadás',
      remove: 'Eltávolítás'
    },
    // Morzsamenü
    breadcrumb: {
      label: 'Morzsamenü',
      more: 'Több'
    },
    // Vissza a tetejére
    backtop: {
      text: 'Vissza a tetejére'
    },
    // Választó
    select: {
      placeholder: 'Kérjük, válasszon',
      noData: 'Nincs adat',
      loading: 'Betöltés...',
      noMatch: 'Nincs találat',
      selectAll: 'Összes kijelölése',
      clearAll: 'Összes törlése'
    },
    // Lapozás
    pagination: {
      goto: 'Ugrás',
      page: '',
      total: 'Összesen {total}',
      pageSize: '/oldal',
      prev: 'Előző',
      next: 'Következő',
      first: 'Első',
      last: 'Utolsó',
      pageClassifier: ''
    },
    // Megerősítő felugró ablak
    popconfirm: {
      confirm: 'OK',
      cancel: 'Mégse',
      dontAskAgain: 'Ne kérdezze újra'
    },
    // Párbeszédablak
    dialog: {
      confirm: 'OK',
      cancel: 'Mégse',
      close: 'Bezárás',
      maximize: 'Maximalizálás',
      restore: 'Visszaállítás'
    },
    // Fiók
    drawer: {
      close: 'Bezárás',
      confirm: 'OK',
      cancel: 'Mégse'
    },
    // Legördülő menü
    dropdown: {
      loading: 'Betöltés...'
    },
    // Kép
    image: {
      error: 'HIBA',
      loading: 'Betöltés...',
      preview: 'Előnézet',
      zoomIn: 'Nagyítás',
      zoomOut: 'Kicsinyítés',
      rotateLeft: 'Forgatás balra',
      rotateRight: 'Forgatás jobbra',
      originalSize: 'Eredeti méret',
      fullscreen: 'Teljes képernyő'
    },
    // Képnézegető
    imageviewer: {
      close: 'Bezárás',
      prev: 'Előző',
      next: 'Következő',
      zoomIn: 'Nagyítás',
      zoomOut: 'Kicsinyítés',
      rotateLeft: 'Forgatás balra',
      rotateRight: 'Forgatás jobbra',
      reset: 'Visszaállítás',
      fullscreen: 'Teljes képernyő',
      exitFullscreen: 'Kilépés a teljes képernyőből'
    },
    // Végtelen görgetés
    infinitescroll: {
      loading: 'Betöltés...',
      finished: 'Nincs több adat',
      error: 'Betöltési hiba, kattintson az újrapróbálkozáshoz',
      retry: 'Kattintson az újrapróbálkozáshoz'
    },
    // Üzenet
    message: {
      close: 'Bezárás'
    },
    // Értesítés
    notification: {
      close: 'Bezárás'
    },
    // Betöltés
    loading: {
      text: 'Betöltés...'
    },
    // Pörgő
    spin: {
      text: 'Betöltés...'
    },
    // Értékelés
    rate: {
      texts: ['Nagyon rossz', 'Csalódott', 'Rendben', 'Elégedett', 'Lenyűgözött']
    },
    // Figyelmeztetés
    alert: {
      close: 'Bezárás'
    },
    // Címke
    tag: {
      close: 'Bezárás'
    },
    // Fülek
    tabs: {
      close: 'Bezárás',
      add: 'Hozzáadás',
      more: 'Több'
    },
    // Lépések
    steps: {
      finish: 'Befejezve',
      process: 'Folyamatban',
      wait: 'Várakozás',
      error: 'Hiba'
    },
    // Folyamat
    progress: {
      success: 'Sikeres',
      exception: 'Kivétel',
      warning: 'Figyelmeztetés'
    },
    // Csontváz
    skeleton: {
      loading: 'Betöltés...'
    },
    // Üres
    empty: {
      description: 'Nincs adat',
      noData: 'Nincs adat',
      noResult: 'Nincs találat',
      networkError: 'Hálózati hiba',
      serverError: 'Szerverhiba'
    },
    // Eredmény
    result: {
      success: 'Sikeres',
      error: 'Hiba',
      warning: 'Figyelmeztetés',
      info: 'Információ',
      backHome: 'Vissza a kezdőlapra'
    },
    // Vízesés
    waterfall: {
      loading: 'Betöltés...',
      noMore: 'Nincs több adat',
      empty: 'Nincs adat'
    },
    // Leírások
    descriptions: {
      colon: ':'
    },
    // Csúszka
    slider: {
      tipFormatter: '{value}'
    },
    // Kapcsoló
    switch: {
      on: 'BE',
      off: 'KI'
    },
    // Jelölőnégyzet
    checkbox: {
      selectAll: 'Összes kijelölése'
    },
    // Rádiógomb
    radio: {},
    // Menü
    menu: {
      collapse: 'Menü összecsukása',
      expand: 'Menü kibontása'
    },
    // Kártya
    card: {
      collapse: 'Összecsukás',
      expand: 'Kibontás'
    },
    // Összecsukás
    collapse: {
      expand: 'Kibontás',
      collapse: 'Összecsukás'
    },
    // Eszköztipp
    tooltip: {},
    // Felugró ablak
    popover: {},
    // Jelvény
    badge: {},
    // Profilkép
    avatar: {
      error: 'Betöltési hiba'
    },
    // Vízjel
    watermark: {},
    // Elválasztó
    divider: {},
    // Körhinta
    carousel: {
      prev: 'Előző',
      next: 'Következő'
    },
    // Futó szöveg
    marquee: {},
    // Rögzítés
    affix: {},
    // Horgony
    anchor: {}
  }
}

export default hu
