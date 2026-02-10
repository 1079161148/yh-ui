import type { Language } from '../index'

export const sl: Language = {
  name: 'sl',
  yh: {
    // Splošno
    common: {
      yes: 'Da',
      no: 'Ne',
      confirm: 'Potrdi',
      cancel: 'Prekliči',
      loading: 'Nalaganje',
      close: 'Zapri',
      clear: 'Počisti',
      reset: 'Ponastavi',
      save: 'Shrani',
      delete: 'Izbriši',
      edit: 'Uredi',
      add: 'Dodaj',
      search: 'Iskanje',
      refresh: 'Osveži',
      expand: 'Razširi',
      collapse: 'Strni',
      more: 'Več',
      noData: 'Ni podatkov',
      noMatch: 'Ni ustreznih podatkov',
      selectAll: 'Izberi vse',
      unselectAll: 'Prekliči izbiro'
    },
    // Izbira barve
    colorpicker: {
      confirm: 'V redu',
      clear: 'Počisti',
      eyeDropper: 'Pipeta',
      suggestionDark: 'Bela besedila so najboljša',
      suggestionLight: 'Črna besedila so najboljša',
      recentColors: 'Nedavne barve',
      presetColors: 'Vnaprej nastavljene barve'
    },
    // Izbira datuma
    datepicker: {
      now: 'Zdaj',
      today: 'Danes',
      cancel: 'Prekliči',
      clear: 'Počisti',
      confirm: 'V redu',
      selectDate: 'Izberi datum',
      selectTime: 'Izberi čas',
      startDate: 'Začetni datum',
      startTime: 'Začetni čas',
      endDate: 'Končni datum',
      endTime: 'Končni čas',
      year: '',
      month: '',
      day: '',
      week: 'Teden',
      monthBeforeYear: true,
      prevYear: 'Prejšnje leto',
      nextYear: 'Naslednje leto',
      prevMonth: 'Prejšnji mesec',
      nextMonth: 'Naslednji mesec',
      weeks: {
        sun: 'Ned',
        mon: 'Pon',
        tue: 'Tor',
        wed: 'Sre',
        thu: 'Čet',
        fri: 'Pet',
        sat: 'Sob'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'Maj',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Avg',
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
    // Izbira časa
    timepicker: {
      confirm: 'V redu',
      cancel: 'Prekliči',
      now: 'Zdaj',
      placeholder: 'Izberi čas',
      startPlaceholder: 'Začetni čas',
      endPlaceholder: 'Končni čas',
      selectTime: 'Izberi čas'
    },
    // Izbira časa
    timeselect: {
      placeholder: 'Izberi čas'
    },
    // Drevo
    tree: {
      emptyText: 'Ni podatkov',
      loading: 'Nalaganje...',
      checkAll: 'Izberi vse',
      uncheckAll: 'Prekliči izbiro',
      expandAll: 'Razširi vse',
      collapseAll: 'Strni vse'
    },
    // Izbira drevesa
    treeselect: {
      placeholder: 'Izberi',
      emptyText: 'Ni podatkov',
      loading: 'Nalaganje...',
      noMatch: 'Ni ustreznih podatkov'
    },
    // Koledar
    calendar: {
      prevMonth: 'Prejšnji mesec',
      nextMonth: 'Naslednji mesec',
      prevYear: 'Prejšnje leto',
      nextYear: 'Naslednje leto',
      today: 'Danes',
      week: 'Teden',
      holiday: 'Praznik',
      workday: 'Delovni dan',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Ned',
        mon: 'Pon',
        tue: 'Tor',
        wed: 'Sre',
        thu: 'Čet',
        fri: 'Pet',
        sat: 'Sob'
      }
    },
    // Samodejno dopolnjevanje
    autocomplete: {
      loading: 'Nalaganje...',
      placeholder: 'Prosimo, vnesite',
      noData: 'Ni podatkov',
      noMatch: 'Ni ustreznih podatkov'
    },
    // Odštevanje
    countdown: {
      days: 'dni',
      hours: 'ure',
      minutes: 'minute',
      seconds: 'sekunde',
      milliseconds: 'milisekunde',
      finished: 'Končano'
    },
    // Kaskada
    cascader: {
      noMatch: 'Ni ustreznih podatkov',
      placeholder: 'Izberi',
      loading: 'Nalaganje...',
      noData: 'Ni podatkov'
    },
    // Prenos
    transfer: {
      noMatch: 'Ni ustreznih podatkov',
      noData: 'Ni podatkov',
      titles: ['Seznam 1', 'Seznam 2'],
      filterPlaceholder: 'Vnesite ključno besedo',
      noCheckedFormat: '{total} elementov',
      hasCheckedFormat: '{checked}/{total} izbranih',
      searchPlaceholder: 'Vnesite ključno besedo'
    },
    // Tabela
    table: {
      emptyText: 'Ni podatkov',
      confirmFilter: 'Potrdi',
      resetFilter: 'Ponastavi',
      clearFilter: 'Vse',
      sumText: 'Vsota',
      loading: 'Nalaganje...',
      index: 'Indeks',
      print: 'Natisni',
      cancel: 'Prekliči',
      preview: 'Predogled tiskanja',
      printTime: 'Čas tiskanja',
      total: 'Skupaj {total} elementov',
      page: 'Stran {page}',
      yes: 'Da',
      no: 'Ne',
      // Orodna vrstica
      toolbar: {
        refresh: 'Osveži',
        density: 'Gostota',
        densityDefault: 'Privzeto',
        densityLarge: 'Velika',
        densitySmall: 'Majhna',
        columnSetting: 'Nastavitve stolpcev',
        fullscreen: 'Celozaslonski način',
        exitFullscreen: 'Izhod iz celozaslonskega načina',
        export: 'Izvozi',
        import: 'Uvozi',
        search: 'Iskanje',
        searchPlaceholder: 'Vnesite ključne besede za iskanje'
      },
      // Filter
      filter: {
        selectAll: 'Izberi vse',
        selectInvert: 'Obrni izbiro',
        empty: 'Je prazno',
        notEmpty: 'Ni prazno',
        contains: 'Vsebuje',
        notContains: 'Ne vsebuje',
        equals: 'Je enako',
        notEquals: 'Ni enako',
        startsWith: 'Se začne z',
        endsWith: 'Se konča z',
        greaterThan: 'Večje od',
        lessThan: 'Manjše od',
        between: 'Med'
      },
      // Razvrščanje
      sort: {
        asc: 'Naraščajoče',
        desc: 'Padajoče',
        clear: 'Počisti razvrščanje'
      },
      // Izvoz
      export: {
        title: 'Izvozi podatke',
        filename: 'Ime datoteke',
        type: 'Vrsta datoteke',
        scope: 'Obseg izvoza',
        scopeAll: 'Vsi podatki',
        scopeSelected: 'Izbrani podatki',
        scopeCurrentPage: 'Trenutna stran',
        includeHeader: 'Vključi glavo',
        exporting: 'Izvoz...',
        success: 'Izvoz uspešen',
        error: 'Izvoz ni uspel'
      },
      // Uvoz
      import: {
        title: 'Uvozi podatke',
        selectFile: 'Izberi datoteko',
        dragTip: 'Kliknite ali povlecite datoteko sem za nalaganje',
        importing: 'Uvoz...',
        success: 'Uvoz uspešen',
        error: 'Uvoz ni uspel',
        preview: 'Predogled podatkov',
        confirm: 'Potrdi uvoz'
      },
      // Tiskanje
      printConfig: {
        title: 'Nastavitve tiskanja',
        pageTitle: 'Naslov strani',
        pageHeader: 'Glava',
        pageFooter: 'Noga',
        printAll: 'Natisni vse',
        printSelected: 'Natisni izbrano',
        printCurrentPage: 'Natisni trenutno stran',
        landscape: 'Ležeče',
        portrait: 'Pokončno',
        printing: 'Tiskanje...'
      },
      // Nastavitve stolpcev
      columnSetting: {
        title: 'Nastavitve stolpcev',
        showAll: 'Prikaži vse',
        hideAll: 'Skrij vse',
        reset: 'Ponastavi',
        fixedLeft: 'Privzemi levo',
        fixedRight: 'Privzemi desno',
        unfixed: 'Odpni'
      },
      // Kontekstni meni
      contextMenu: {
        copy: 'Kopiraj',
        copyRow: 'Kopiraj vrstico',
        copyCell: 'Kopiraj celico',
        paste: 'Prilepi',
        insertRowAbove: 'Vstavi vrstico zgoraj',
        insertRowBelow: 'Vstavi vrstico spodaj',
        deleteRow: 'Izbriši vrstico',
        deleteSelectedRows: 'Izbriši izbrane vrstice',
        exportSelected: 'Izvozi izbrano'
      },
      // Izbira
      selection: {
        selectAll: 'Izberi vse',
        selectInvert: 'Obrni izbiro',
        selectNone: 'Počisti izbiro',
        selected: '{count} elementov izbranih'
      },
      // Razširitev
      expand: {
        expandAll: 'Razširi vse',
        collapseAll: 'Strni vse'
      },
      // Drevo
      tree: {
        expandAll: 'Razširi vse',
        collapseAll: 'Strni vse',
        expandLevel: 'Razširi do nivoja {level}'
      },
      // Vlečenje
      drag: {
        dragTip: 'Povleci za preurejanje',
        dropTip: 'Spusti za postavitev'
      }
    },
    // Sporočilno okno
    messagebox: {
      title: 'Sporočilo',
      confirm: 'V redu',
      cancel: 'Prekliči',
      close: 'Zapri',
      error: 'Neveljavna vnos',
      alert: 'Opozorilo',
      prompt: 'Vprašanje',
      inputPlaceholder: 'Prosimo, vnesite'
    },
    // Nalaganje
    upload: {
      deleteTip: 'pritisnite delete za odstranitev',
      delete: 'Izbriši',
      preview: 'Predogled',
      continue: 'Nadaljuj',
      upload: 'Kliknite za nalaganje',
      tip: 'Kliknite ali povlecite datoteko na to območje za <em>nalaganje</em>',
      dragTip: 'Spustite datoteko tukaj ali kliknite za nalaganje',
      uploading: 'Nalaganje...',
      success: 'Nalaganje uspešno',
      error: 'Nalaganje ni uspelo',
      retry: 'Poskusi znova',
      cancel: 'Prekliči nalaganje',
      fileTypeError: 'Vrsta datoteke ni podprta',
      fileSizeError: 'Velikost datoteke presega omejitev',
      fileCountError: 'Število datotek presega omejitev'
    },
    // Obrazec
    form: {
      validationFailed: 'Preverjanje ni uspelo',
      required: 'Zahtevano',
      pleaseInput: 'Prosimo, vnesite',
      pleaseSelect: 'Prosimo, izberite'
    },
    // Gumb
    button: {
      loading: 'Nalaganje...'
    },
    // Vnos
    input: {
      placeholder: 'Prosimo, vnesite',
      clear: 'Počisti',
      showPassword: 'Prikaži geslo',
      hidePassword: 'Skrij geslo',
      copy: 'Kopiraj',
      copied: 'Kopirano'
    },
    // Številski vnos
    inputnumber: {
      placeholder: 'Prosimo, vnesite številko',
      increase: 'Povečaj',
      decrease: 'Zmanjšaj'
    },
    // Vnos oznake
    inputtag: {
      placeholder: 'Prosimo, vnesite',
      add: 'Dodaj',
      remove: 'Odstrani'
    },
    // Navigacijska pot
    breadcrumb: {
      label: 'Navigacijska pot',
      more: 'Več'
    },
    // Nazaj na vrh
    backtop: {
      text: 'Nazaj na vrh'
    },
    // Izbira
    select: {
      placeholder: 'Prosimo, izberite',
      noData: 'Ni podatkov',
      loading: 'Nalaganje...',
      noMatch: 'Ni ustreznih podatkov',
      selectAll: 'Izberi vse',
      clearAll: 'Počisti vse'
    },
    // Paginacija
    pagination: {
      goto: 'Pojdi na',
      page: '',
      total: 'Skupaj {total}',
      pageSize: '/stran',
      prev: 'Prejšnja',
      next: 'Naslednja',
      first: 'Prva',
      last: 'Zadnja',
      pageClassifier: ''
    },
    // Potrditveni pojavni okvir
    popconfirm: {
      confirm: 'V redu',
      cancel: 'Prekliči',
      dontAskAgain: 'Ne sprašuj več'
    },
    // Pogovorno okno
    dialog: {
      confirm: 'V redu',
      cancel: 'Prekliči',
      close: 'Zapri',
      maximize: 'Maksimiraj',
      restore: 'Obnovi'
    },
    // Predal
    drawer: {
      close: 'Zapri',
      confirm: 'V redu',
      cancel: 'Prekliči'
    },
    // Spustni meni
    dropdown: {
      loading: 'Nalaganje...'
    },
    // Slika
    image: {
      error: 'NEUSPEŠNO',
      loading: 'Nalaganje...',
      preview: 'Predogled',
      zoomIn: 'Povečaj',
      zoomOut: 'Zmanjšaj',
      rotateLeft: 'Zavrti levo',
      rotateRight: 'Zavrti desno',
      originalSize: 'Prvotna velikost',
      fullscreen: 'Celozaslonski način'
    },
    // Pregledovalnik slik
    imageviewer: {
      close: 'Zapri',
      prev: 'Prejšnja',
      next: 'Naslednja',
      zoomIn: 'Povečaj',
      zoomOut: 'Zmanjšaj',
      rotateLeft: 'Zavrti levo',
      rotateRight: 'Zavrti desno',
      reset: 'Ponastavi',
      fullscreen: 'Celozaslonski način',
      exitFullscreen: 'Izhod iz celozaslonskega načina'
    },
    // Neskončno drsenje
    infinitescroll: {
      loading: 'Nalaganje...',
      finished: 'Ni več podatkov',
      error: 'Nalaganje ni uspelo, kliknite za ponovni poskus',
      retry: 'Kliknite za ponovni poskus'
    },
    // Sporočilo
    message: {
      close: 'Zapri'
    },
    // Obvestilo
    notification: {
      close: 'Zapri'
    },
    // Nalaganje
    loading: {
      text: 'Nalaganje...'
    },
    // Vrtiljaj
    spin: {
      text: 'Nalaganje...'
    },
    // Ocena
    rate: {
      texts: ['Izjemno slabo', 'Razočaran', 'Pošteno', 'Zadovoljen', 'Presenečen']
    },
    // Opozorilo
    alert: {
      close: 'Zapri'
    },
    // Oznaka
    tag: {
      close: 'Zapri'
    },
    // Zavihki
    tabs: {
      close: 'Zapri',
      add: 'Dodaj',
      more: 'Več'
    },
    // Koraki
    steps: {
      finish: 'Končano',
      process: 'V teku',
      wait: 'Čakanje',
      error: 'Napaka'
    },
    // Napredek
    progress: {
      success: 'Uspeh',
      exception: 'Izjema',
      warning: 'Opozorilo'
    },
    // Okostje
    skeleton: {
      loading: 'Nalaganje...'
    },
    // Prazen
    empty: {
      description: 'Ni podatkov',
      noData: 'Ni podatkov',
      noResult: 'Ni rezultatov',
      networkError: 'Napaka omrežja',
      serverError: 'Napaka strežnika'
    },
    // Rezultat
    result: {
      success: 'Uspeh',
      error: 'Napaka',
      warning: 'Opozorilo',
      info: 'Informacije',
      backHome: 'Nazaj na domačo stran'
    },
    // Slap
    waterfall: {
      loading: 'Nalaganje...',
      noMore: 'Ni več podatkov',
      empty: 'Ni podatkov'
    },
    // Opisi
    descriptions: {
      colon: ':'
    },
    // Drsnik
    slider: {
      tipFormatter: '{value}'
    },
    // Stikalo
    switch: {
      on: 'VKLOPLJENO',
      off: 'IZKLOPLJENO'
    },
    // Potrditveno polje
    checkbox: {
      selectAll: 'Izberi vse'
    },
    // Radio
    radio: {},
    // Meni
    menu: {
      collapse: 'Strni meni',
      expand: 'Razširi meni'
    },
    // Kartica
    card: {
      collapse: 'Strni',
      expand: 'Razširi'
    },
    // Strnjenje
    collapse: {
      expand: 'Razširi',
      collapse: 'Strni'
    },
    // Namig
    tooltip: {},
    // Pojavni okvir
    popover: {},
    // Značka
    badge: {},
    // Avatar
    avatar: {
      error: 'Nalaganje ni uspelo'
    },
    // Vodni žig
    watermark: {},
    // Ločilnik
    divider: {},
    // Vrtiljaj
    carousel: {
      prev: 'Prejšnja',
      next: 'Naslednja'
    },
    // Marquee
    marquee: {},
    // Pritrditev
    affix: {},
    // Sidro
    anchor: {}
  }
}

export default sl
