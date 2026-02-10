import type { Language } from '../index'

export const hr: Language = {
  name: 'hr',
  yh: {
    // Opće
    common: {
      yes: 'Da',
      no: 'Ne',
      confirm: 'Potvrdi',
      cancel: 'Odustani',
      loading: 'Učitavanje',
      close: 'Zatvori',
      clear: 'Očisti',
      reset: 'Resetiraj',
      save: 'Spremi',
      delete: 'Obriši',
      edit: 'Uredi',
      add: 'Dodaj',
      search: 'Pretraži',
      refresh: 'Osvježi',
      expand: 'Proširi',
      collapse: 'Sažmi',
      more: 'Više',
      noData: 'Nema podataka',
      noMatch: 'Nema podudaranja',
      selectAll: 'Odaberi sve',
      unselectAll: 'Poništi odabir'
    },
    // Birač boja
    colorpicker: {
      confirm: 'U redu',
      clear: 'Očisti',
      eyeDropper: 'Kapaljka',
      suggestionDark: 'Bijeli tekst je bolji',
      suggestionLight: 'Crni tekst je bolji',
      recentColors: 'Nedavne boje',
      presetColors: 'Unaprijed postavljene boje'
    },
    // Birač datuma
    datepicker: {
      now: 'Sada',
      today: 'Danas',
      cancel: 'Odustani',
      clear: 'Očisti',
      confirm: 'U redu',
      selectDate: 'Odaberi datum',
      selectTime: 'Odaberi vrijeme',
      startDate: 'Datum početka',
      startTime: 'Vrijeme početka',
      endDate: 'Datum završetka',
      endTime: 'Vrijeme završetka',
      year: '',
      month: '',
      day: '',
      week: 'Tjedan',
      monthBeforeYear: true,
      prevYear: 'Prethodna godina',
      nextYear: 'Sljedeća godina',
      prevMonth: 'Prethodni mjesec',
      nextMonth: 'Sljedeći mjesec',
      weeks: {
        sun: 'Ned',
        mon: 'Pon',
        tue: 'Uto',
        wed: 'Sri',
        thu: 'Čet',
        fri: 'Pet',
        sat: 'Sub'
      },
      months: {
        jan: 'Sij',
        feb: 'Velj',
        mar: 'Ožu',
        apr: 'Tra',
        may: 'Svi',
        jun: 'Lip',
        jul: 'Srp',
        aug: 'Kol',
        sep: 'Ruj',
        oct: 'Lis',
        nov: 'Stu',
        dec: 'Pro'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Birač vremena
    timepicker: {
      confirm: 'U redu',
      cancel: 'Odustani',
      now: 'Sada',
      placeholder: 'Odaberi vrijeme',
      startPlaceholder: 'Vrijeme početka',
      endPlaceholder: 'Vrijeme završetka',
      selectTime: 'Odaberi vrijeme'
    },
    // Odabir vremena
    timeselect: {
      placeholder: 'Odaberi vrijeme'
    },
    // Stablo
    tree: {
      emptyText: 'Nema podataka',
      loading: 'Učitavanje...',
      checkAll: 'Odaberi sve',
      uncheckAll: 'Poništi odabir',
      expandAll: 'Proširi sve',
      collapseAll: 'Sažmi sve'
    },
    // Odabir stabla
    treeselect: {
      placeholder: 'Odaberi',
      emptyText: 'Nema podataka',
      loading: 'Učitavanje...',
      noMatch: 'Nema podudaranja'
    },
    // Kalendar
    calendar: {
      prevMonth: 'Prethodni mjesec',
      nextMonth: 'Sljedeći mjesec',
      prevYear: 'Prethodna godina',
      nextYear: 'Sljedeća godina',
      today: 'Danas',
      week: 'Tjedan',
      holiday: 'Praznik',
      workday: 'Rad',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Ned',
        mon: 'Pon',
        tue: 'Uto',
        wed: 'Sri',
        thu: 'Čet',
        fri: 'Pet',
        sat: 'Sub'
      }
    },
    // Automatsko dovršavanje
    autocomplete: {
      loading: 'Učitavanje...',
      placeholder: 'Molimo unesite',
      noData: 'Nema podataka',
      noMatch: 'Nema podudaranja'
    },
    // Odbrojavanje
    countdown: {
      days: 'dana',
      hours: 'sati',
      minutes: 'minute',
      seconds: 'sekunde',
      milliseconds: 'milisekunde',
      finished: 'Završeno'
    },
    // Kaskadni odabir
    cascader: {
      noMatch: 'Nema podudaranja',
      placeholder: 'Odaberi',
      loading: 'Učitavanje...',
      noData: 'Nema podataka'
    },
    // Prijenos
    transfer: {
      noMatch: 'Nema podudaranja',
      noData: 'Nema podataka',
      titles: ['Lista 1', 'Lista 2'],
      filterPlaceholder: 'Unesite ključnu riječ',
      noCheckedFormat: '{total} stavki',
      hasCheckedFormat: '{checked}/{total} odabrano',
      searchPlaceholder: 'Unesite ključnu riječ'
    },
    // Tablica
    table: {
      emptyText: 'Nema podataka',
      confirmFilter: 'Potvrdi',
      resetFilter: 'Resetiraj',
      clearFilter: 'Sve',
      sumText: 'Zbroj',
      loading: 'Učitavanje...',
      index: 'Indeks',
      print: 'Ispis',
      cancel: 'Odustani',
      preview: 'Pregled ispisa',
      printTime: 'Vrijeme ispisa',
      total: 'Ukupno {total} stavki',
      page: 'Stranica {page}',
      yes: 'Da',
      no: 'Ne',
      // Alatna traka
      toolbar: {
        refresh: 'Osvježi',
        density: 'Gustoća',
        densityDefault: 'Zadano',
        densityLarge: 'Velika',
        densitySmall: 'Mala',
        columnSetting: 'Postavke stupaca',
        fullscreen: 'Puni zaslon',
        exitFullscreen: 'Izađi iz punog zaslona',
        export: 'Izvoz',
        import: 'Uvoz',
        search: 'Pretraži',
        searchPlaceholder: 'Unesite ključne riječi za pretraživanje'
      },
      // Filtar
      filter: {
        selectAll: 'Odaberi sve',
        selectInvert: 'Obrni odabir',
        empty: 'Je prazno',
        notEmpty: 'Nije prazno',
        contains: 'Sadrži',
        notContains: 'Ne sadrži',
        equals: 'Jednako',
        notEquals: 'Nije jednako',
        startsWith: 'Počinje s',
        endsWith: 'Završava s',
        greaterThan: 'Veće od',
        lessThan: 'Manje od',
        between: 'Između'
      },
      // Sortiranje
      sort: {
        asc: 'Uzlazno',
        desc: 'Silazno',
        clear: 'Očisti sortiranje'
      },
      // Izvoz
      export: {
        title: 'Izvoz podataka',
        filename: 'Naziv datoteke',
        type: 'Vrsta datoteke',
        scope: 'Opseg izvoza',
        scopeAll: 'Svi podaci',
        scopeSelected: 'Odabrani podaci',
        scopeCurrentPage: 'Trenutna stranica',
        includeHeader: 'Uključi zaglavlje',
        exporting: 'Izvoz...',
        success: 'Izvoz uspješan',
        error: 'Izvoz neuspješan'
      },
      // Uvoz
      import: {
        title: 'Uvoz podataka',
        selectFile: 'Odaberi datoteku',
        dragTip: 'Kliknite ili povucite datoteku ovdje za učitavanje',
        importing: 'Uvoz...',
        success: 'Uvoz uspješan',
        error: 'Uvoz neuspješan',
        preview: 'Pregled podataka',
        confirm: 'Potvrdi uvoz'
      },
      // Ispis
      printConfig: {
        title: 'Postavke ispisa',
        pageTitle: 'Naslov stranice',
        pageHeader: 'Zaglavlje',
        pageFooter: 'Podnožje',
        printAll: 'Ispiši sve',
        printSelected: 'Ispiši odabrano',
        printCurrentPage: 'Ispiši trenutnu stranicu',
        landscape: 'Vodoravno',
        portrait: 'Okomito',
        printing: 'Ispis...'
      },
      // Postavke stupaca
      columnSetting: {
        title: 'Postavke stupaca',
        showAll: 'Prikaži sve',
        hideAll: 'Sakrij sve',
        reset: 'Resetiraj',
        fixedLeft: 'Fiksiraj lijevo',
        fixedRight: 'Fiksiraj desno',
        unfixed: 'Ukloni fiksiranje'
      },
      // Kontekstni izbornik
      contextMenu: {
        copy: 'Kopiraj',
        copyRow: 'Kopiraj redak',
        copyCell: 'Kopiraj ćeliju',
        paste: 'Zalijepi',
        insertRowAbove: 'Umetni redak iznad',
        insertRowBelow: 'Umetni redak ispod',
        deleteRow: 'Obriši redak',
        deleteSelectedRows: 'Obriši odabrane retke',
        exportSelected: 'Izvezi odabrano'
      },
      // Odabir
      selection: {
        selectAll: 'Odaberi sve',
        selectInvert: 'Obrni odabir',
        selectNone: 'Očisti odabir',
        selected: '{count} stavki odabrano'
      },
      // Proširenje
      expand: {
        expandAll: 'Proširi sve',
        collapseAll: 'Sažmi sve'
      },
      // Stablo
      tree: {
        expandAll: 'Proširi sve',
        collapseAll: 'Sažmi sve',
        expandLevel: 'Proširi do razine {level}'
      },
      // Povlačenje
      drag: {
        dragTip: 'Povucite za preuređenje',
        dropTip: 'Pustite za postavljanje'
      }
    },
    // Okvir poruke
    messagebox: {
      title: 'Poruka',
      confirm: 'U redu',
      cancel: 'Odustani',
      close: 'Zatvori',
      error: 'Neispravan unos',
      alert: 'Upozorenje',
      prompt: 'Upozorenje',
      inputPlaceholder: 'Molimo unesite'
    },
    // Učitavanje
    upload: {
      deleteTip: 'pritisnite delete za brisanje',
      delete: 'Obriši',
      preview: 'Pregled',
      continue: 'Nastavi',
      upload: 'Kliknite za učitavanje',
      tip: 'Kliknite ili povucite datoteku u ovo područje za <em>učitavanje</em>',
      dragTip: 'Pustite datoteku ovdje ili kliknite za učitavanje',
      uploading: 'Učitavanje...',
      success: 'Učitavanje uspješno',
      error: 'Učitavanje neuspješno',
      retry: 'Pokušaj ponovno',
      cancel: 'Odustani od učitavanja',
      fileTypeError: 'Vrsta datoteke nije podržana',
      fileSizeError: 'Veličina datoteke premašuje ograničenje',
      fileCountError: 'Broj datoteka premašuje ograničenje'
    },
    // Obrazac
    form: {
      validationFailed: 'Provjera neuspješna',
      required: 'Obavezno',
      pleaseInput: 'Molimo unesite',
      pleaseSelect: 'Molimo odaberite'
    },
    // Gumb
    button: {
      loading: 'Učitavanje...'
    },
    // Unos
    input: {
      placeholder: 'Molimo unesite',
      clear: 'Očisti',
      showPassword: 'Prikaži lozinku',
      hidePassword: 'Sakrij lozinku',
      copy: 'Kopiraj',
      copied: 'Kopirano'
    },
    // Brojčani unos
    inputnumber: {
      placeholder: 'Molimo unesite broj',
      increase: 'Povećaj',
      decrease: 'Smanji'
    },
    // Unos oznake
    inputtag: {
      placeholder: 'Molimo unesite',
      add: 'Dodaj',
      remove: 'Ukloni'
    },
    // Putokaz
    breadcrumb: {
      label: 'Putokaz',
      more: 'Više'
    },
    // Povratak na vrh
    backtop: {
      text: 'Povratak na vrh'
    },
    // Odabir
    select: {
      placeholder: 'Molimo odaberite',
      noData: 'Nema podataka',
      loading: 'Učitavanje...',
      noMatch: 'Nema podudaranja',
      selectAll: 'Odaberi sve',
      clearAll: 'Očisti sve'
    },
    // Straničenje
    pagination: {
      goto: 'Idi na',
      page: '',
      total: 'Ukupno {total}',
      pageSize: '/stranica',
      prev: 'Prethodna',
      next: 'Sljedeća',
      first: 'Prva',
      last: 'Zadnja',
      pageClassifier: ''
    },
    // Potvrda skočnog prozora
    popconfirm: {
      confirm: 'U redu',
      cancel: 'Odustani',
      dontAskAgain: 'Ne pitaj ponovno'
    },
    // Dijalog
    dialog: {
      confirm: 'U redu',
      cancel: 'Odustani',
      close: 'Zatvori',
      maximize: 'Maksimiziraj',
      restore: 'Vrati'
    },
    // Ladica
    drawer: {
      close: 'Zatvori',
      confirm: 'U redu',
      cancel: 'Odustani'
    },
    // Padajući izbornik
    dropdown: {
      loading: 'Učitavanje...'
    },
    // Slika
    image: {
      error: 'NEUSPJEŠNO',
      loading: 'Učitavanje...',
      preview: 'Pregled',
      zoomIn: 'Povećaj',
      zoomOut: 'Smanji',
      rotateLeft: 'Rotiraj lijevo',
      rotateRight: 'Rotiraj desno',
      originalSize: 'Izvorna veličina',
      fullscreen: 'Puni zaslon'
    },
    // Preglednik slika
    imageviewer: {
      close: 'Zatvori',
      prev: 'Prethodna',
      next: 'Sljedeća',
      zoomIn: 'Povećaj',
      zoomOut: 'Smanji',
      rotateLeft: 'Rotiraj lijevo',
      rotateRight: 'Rotiraj desno',
      reset: 'Resetiraj',
      fullscreen: 'Puni zaslon',
      exitFullscreen: 'Izađi iz punog zaslona'
    },
    // Beskonačno pomicanje
    infinitescroll: {
      loading: 'Učitavanje...',
      finished: 'Nema više podataka',
      error: 'Učitavanje neuspješno, kliknite za ponovni pokušaj',
      retry: 'Kliknite za ponovni pokušaj'
    },
    // Poruka
    message: {
      close: 'Zatvori'
    },
    // Obavijest
    notification: {
      close: 'Zatvori'
    },
    // Učitavanje
    loading: {
      text: 'Učitavanje...'
    },
    // Okretanje
    spin: {
      text: 'Učitavanje...'
    },
    // Ocjena
    rate: {
      texts: ['Izuzetno loše', 'Razočaran', 'Pošteno', 'Zadovoljan', 'Iznenađen']
    },
    // Upozorenje
    alert: {
      close: 'Zatvori'
    },
    // Oznaka
    tag: {
      close: 'Zatvori'
    },
    // Kartice
    tabs: {
      close: 'Zatvori',
      add: 'Dodaj',
      more: 'Više'
    },
    // Koraci
    steps: {
      finish: 'Završeno',
      process: 'U tijeku',
      wait: 'Čeka',
      error: 'Greška'
    },
    // Napredak
    progress: {
      success: 'Uspjeh',
      exception: 'Iznimka',
      warning: 'Upozorenje'
    },
    // Kostur
    skeleton: {
      loading: 'Učitavanje...'
    },
    // Prazno
    empty: {
      description: 'Nema podataka',
      noData: 'Nema podataka',
      noResult: 'Nema rezultata',
      networkError: 'Mrežna greška',
      serverError: 'Greška poslužitelja'
    },
    // Rezultat
    result: {
      success: 'Uspjeh',
      error: 'Greška',
      warning: 'Upozorenje',
      info: 'Informacija',
      backHome: 'Povratak na početnu'
    },
    // Vodopad
    waterfall: {
      loading: 'Učitavanje...',
      noMore: 'Nema više podataka',
      empty: 'Nema podataka'
    },
    // Opisi
    descriptions: {
      colon: ':'
    },
    // Klizač
    slider: {
      tipFormatter: '{value}'
    },
    // Prekidač
    switch: {
      on: 'UKLJUČENO',
      off: 'ISKLJUČENO'
    },
    // Potvrdni okvir
    checkbox: {
      selectAll: 'Odaberi sve'
    },
    // Radio
    radio: {},
    // Izbornik
    menu: {
      collapse: 'Sažmi izbornik',
      expand: 'Proširi izbornik'
    },
    // Kartica
    card: {
      collapse: 'Sažmi',
      expand: 'Proširi'
    },
    // Sažimanje
    collapse: {
      expand: 'Proširi',
      collapse: 'Sažmi'
    },
    // Savjet
    tooltip: {},
    // Skočni prozor
    popover: {},
    // Značka
    badge: {},
    // Avatar
    avatar: {
      error: 'Učitavanje neuspješno'
    },
    // Vodeni žig
    watermark: {},
    // Razdjelnik
    divider: {},
    // Vrtuljak
    carousel: {
      prev: 'Prethodna',
      next: 'Sljedeća'
    },
    // Tekstualni pomak
    marquee: {},
    // Fiksiranje
    affix: {},
    // Sidro
    anchor: {}
  }
}

export default hr
