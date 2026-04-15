"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hr = exports.default = void 0;
const hr = exports.hr = {
  name: "hr",
  yh: {
    // Opće
    common: {
      yes: "Da",
      no: "Ne",
      confirm: "Potvrdi",
      cancel: "Odustani",
      loading: "U\u010Ditavanje",
      close: "Zatvori",
      clear: "O\u010Disti",
      reset: "Resetiraj",
      save: "Spremi",
      delete: "Obri\u0161i",
      edit: "Uredi",
      add: "Dodaj",
      search: "Pretra\u017Ei",
      refresh: "Osvje\u017Ei",
      expand: "Pro\u0161iri",
      collapse: "Sa\u017Emi",
      more: "Vi\u0161e",
      noData: "Nema podataka",
      noMatch: "Nema podudaranja",
      selectAll: "Odaberi sve",
      unselectAll: "Poni\u0161ti odabir"
    },
    // Birač boja
    colorpicker: {
      confirm: "U redu",
      clear: "O\u010Disti",
      eyeDropper: "Kapaljka",
      suggestionDark: "Bijeli tekst je bolji",
      suggestionLight: "Crni tekst je bolji",
      recentColors: "Nedavne boje",
      presetColors: "Unaprijed postavljene boje"
    },
    // Birač datuma
    datepicker: {
      now: "Sada",
      today: "Danas",
      cancel: "Odustani",
      clear: "O\u010Disti",
      confirm: "U redu",
      selectDate: "Odaberi datum",
      selectTime: "Odaberi vrijeme",
      startDate: "Datum po\u010Detka",
      startTime: "Vrijeme po\u010Detka",
      endDate: "Datum zavr\u0161etka",
      endTime: "Vrijeme zavr\u0161etka",
      year: "",
      month: "",
      day: "",
      week: "Tjedan",
      monthBeforeYear: true,
      prevYear: "Prethodna godina",
      nextYear: "Sljede\u0107a godina",
      prevMonth: "Prethodni mjesec",
      nextMonth: "Sljede\u0107i mjesec",
      weeks: {
        sun: "Ned",
        mon: "Pon",
        tue: "Uto",
        wed: "Sri",
        thu: "\u010Cet",
        fri: "Pet",
        sat: "Sub"
      },
      months: {
        jan: "Sij",
        feb: "Velj",
        mar: "O\u017Eu",
        apr: "Tra",
        may: "Svi",
        jun: "Lip",
        jul: "Srp",
        aug: "Kol",
        sep: "Ruj",
        oct: "Lis",
        nov: "Stu",
        dec: "Pro"
      },
      quarters: {
        q1: "Q1",
        q2: "Q2",
        q3: "Q3",
        q4: "Q4"
      }
    },
    // Birač vremena
    timepicker: {
      confirm: "U redu",
      cancel: "Odustani",
      now: "Sada",
      placeholder: "Odaberi vrijeme",
      startPlaceholder: "Vrijeme po\u010Detka",
      endPlaceholder: "Vrijeme zavr\u0161etka",
      selectTime: "Odaberi vrijeme"
    },
    // Odabir vremena
    timeselect: {
      placeholder: "Odaberi vrijeme"
    },
    // Stablo
    tree: {
      emptyText: "Nema podataka",
      loading: "U\u010Ditavanje...",
      checkAll: "Odaberi sve",
      uncheckAll: "Poni\u0161ti odabir",
      expandAll: "Pro\u0161iri sve",
      collapseAll: "Sa\u017Emi sve"
    },
    // Odabir stabla
    treeselect: {
      placeholder: "Odaberi",
      emptyText: "Nema podataka",
      loading: "U\u010Ditavanje...",
      noMatch: "Nema podudaranja"
    },
    // Kalendar
    calendar: {
      prevMonth: "Prethodni mjesec",
      nextMonth: "Sljede\u0107i mjesec",
      prevYear: "Prethodna godina",
      nextYear: "Sljede\u0107a godina",
      today: "Danas",
      week: "Tjedan",
      holiday: "Praznik",
      workday: "Rad",
      monthHeaderFormat: "MMMM YYYY",
      weeks: {
        sun: "Ned",
        mon: "Pon",
        tue: "Uto",
        wed: "Sri",
        thu: "\u010Cet",
        fri: "Pet",
        sat: "Sub"
      }
    },
    // Automatsko dovršavanje
    autocomplete: {
      loading: "U\u010Ditavanje...",
      placeholder: "Molimo unesite",
      noData: "Nema podataka",
      noMatch: "Nema podudaranja"
    },
    // Odbrojavanje
    countdown: {
      days: "dana",
      hours: "sati",
      minutes: "minute",
      seconds: "sekunde",
      milliseconds: "milisekunde",
      finished: "Zavr\u0161eno"
    },
    // Kaskadni odabir
    cascader: {
      noMatch: "Nema podudaranja",
      placeholder: "Odaberi",
      loading: "U\u010Ditavanje...",
      noData: "Nema podataka"
    },
    // Prijenos
    transfer: {
      noMatch: "Nema podudaranja",
      noData: "Nema podataka",
      titles: ["Lista 1", "Lista 2"],
      filterPlaceholder: "Unesite klju\u010Dnu rije\u010D",
      noCheckedFormat: "{total} stavki",
      hasCheckedFormat: "{checked}/{total} odabrano",
      searchPlaceholder: "Unesite klju\u010Dnu rije\u010D"
    },
    // Tablica
    table: {
      emptyText: "Nema podataka",
      confirmFilter: "Potvrdi",
      resetFilter: "Resetiraj",
      clearFilter: "Sve",
      sumText: "Zbroj",
      loading: "U\u010Ditavanje...",
      index: "Indeks",
      print: "Ispis",
      cancel: "Odustani",
      preview: "Pregled ispisa",
      printTime: "Vrijeme ispisa",
      total: "Ukupno {total} stavki",
      page: "Stranica {page}",
      yes: "Da",
      no: "Ne",
      // Alatna traka
      toolbar: {
        refresh: "Osvje\u017Ei",
        density: "Gusto\u0107a",
        densityDefault: "Zadano",
        densityLarge: "Velika",
        densitySmall: "Mala",
        columnSetting: "Postavke stupaca",
        fullscreen: "Puni zaslon",
        exitFullscreen: "Iza\u0111i iz punog zaslona",
        export: "Izvoz",
        import: "Uvoz",
        search: "Pretra\u017Ei",
        searchPlaceholder: "Unesite klju\u010Dne rije\u010Di za pretra\u017Eivanje"
      },
      // Filtar
      filter: {
        selectAll: "Odaberi sve",
        selectInvert: "Obrni odabir",
        empty: "Je prazno",
        notEmpty: "Nije prazno",
        contains: "Sadr\u017Ei",
        notContains: "Ne sadr\u017Ei",
        equals: "Jednako",
        notEquals: "Nije jednako",
        startsWith: "Po\u010Dinje s",
        endsWith: "Zavr\u0161ava s",
        greaterThan: "Ve\u0107e od",
        lessThan: "Manje od",
        between: "Izme\u0111u"
      },
      // Sortiranje
      sort: {
        asc: "Uzlazno",
        desc: "Silazno",
        clear: "O\u010Disti sortiranje"
      },
      // Izvoz
      export: {
        title: "Izvoz podataka",
        filename: "Naziv datoteke",
        type: "Vrsta datoteke",
        scope: "Opseg izvoza",
        scopeAll: "Svi podaci",
        scopeSelected: "Odabrani podaci",
        scopeCurrentPage: "Trenutna stranica",
        includeHeader: "Uklju\u010Di zaglavlje",
        exporting: "Izvoz...",
        success: "Izvoz uspje\u0161an",
        error: "Izvoz neuspje\u0161an"
      },
      // Uvoz
      import: {
        title: "Uvoz podataka",
        selectFile: "Odaberi datoteku",
        dragTip: "Kliknite ili povucite datoteku ovdje za u\u010Ditavanje",
        importing: "Uvoz...",
        success: "Uvoz uspje\u0161an",
        error: "Uvoz neuspje\u0161an",
        preview: "Pregled podataka",
        confirm: "Potvrdi uvoz"
      },
      // Ispis
      printConfig: {
        title: "Postavke ispisa",
        pageTitle: "Naslov stranice",
        pageHeader: "Zaglavlje",
        pageFooter: "Podno\u017Eje",
        printAll: "Ispi\u0161i sve",
        printSelected: "Ispi\u0161i odabrano",
        printCurrentPage: "Ispi\u0161i trenutnu stranicu",
        landscape: "Vodoravno",
        portrait: "Okomito",
        printing: "Ispis..."
      },
      // Postavke stupaca
      columnSetting: {
        title: "Postavke stupaca",
        showAll: "Prika\u017Ei sve",
        hideAll: "Sakrij sve",
        reset: "Resetiraj",
        fixedLeft: "Fiksiraj lijevo",
        fixedRight: "Fiksiraj desno",
        unfixed: "Ukloni fiksiranje"
      },
      // Kontekstni izbornik
      contextMenu: {
        copy: "Kopiraj",
        copyRow: "Kopiraj redak",
        copyCell: "Kopiraj \u0107eliju",
        paste: "Zalijepi",
        insertRowAbove: "Umetni redak iznad",
        insertRowBelow: "Umetni redak ispod",
        deleteRow: "Obri\u0161i redak",
        deleteSelectedRows: "Obri\u0161i odabrane retke",
        exportSelected: "Izvezi odabrano"
      },
      // Odabir
      selection: {
        selectAll: "Odaberi sve",
        selectInvert: "Obrni odabir",
        selectNone: "O\u010Disti odabir",
        selected: "{count} stavki odabrano"
      },
      // Proširenje
      expand: {
        expandAll: "Pro\u0161iri sve",
        collapseAll: "Sa\u017Emi sve"
      },
      // Stablo
      tree: {
        expandAll: "Pro\u0161iri sve",
        collapseAll: "Sa\u017Emi sve",
        expandLevel: "Pro\u0161iri do razine {level}"
      },
      // Povlačenje
      drag: {
        dragTip: "Povucite za preure\u0111enje",
        dropTip: "Pustite za postavljanje"
      }
    },
    // Okvir poruke
    messagebox: {
      title: "Poruka",
      confirm: "U redu",
      cancel: "Odustani",
      close: "Zatvori",
      error: "Neispravan unos",
      alert: "Upozorenje",
      prompt: "Upozorenje",
      inputPlaceholder: "Molimo unesite"
    },
    // Učitavanje
    upload: {
      deleteTip: "pritisnite delete za brisanje",
      delete: "Obri\u0161i",
      preview: "Pregled",
      continue: "Nastavi",
      upload: "Kliknite za u\u010Ditavanje",
      tip: "Kliknite ili povucite datoteku u ovo podru\u010Dje za <em>u\u010Ditavanje</em>",
      dragTip: "Pustite datoteku ovdje ili kliknite za u\u010Ditavanje",
      uploading: "U\u010Ditavanje...",
      success: "U\u010Ditavanje uspje\u0161no",
      error: "U\u010Ditavanje neuspje\u0161no",
      retry: "Poku\u0161aj ponovno",
      cancel: "Odustani od u\u010Ditavanja",
      fileTypeError: "Vrsta datoteke nije podr\u017Eana",
      fileSizeError: "Veli\u010Dina datoteke prema\u0161uje ograni\u010Denje",
      fileCountError: "Broj datoteka prema\u0161uje ograni\u010Denje"
    },
    // Obrazac
    form: {
      validationFailed: "Provjera neuspje\u0161na",
      required: "Obavezno",
      pleaseInput: "Molimo unesite",
      pleaseSelect: "Molimo odaberite"
    },
    // Gumb
    button: {
      loading: "U\u010Ditavanje..."
    },
    // Unos
    input: {
      placeholder: "Molimo unesite",
      clear: "O\u010Disti",
      showPassword: "Prika\u017Ei lozinku",
      hidePassword: "Sakrij lozinku",
      copy: "Kopiraj",
      copied: "Kopirano"
    },
    // Brojčani unos
    inputnumber: {
      placeholder: "Molimo unesite broj",
      increase: "Pove\u0107aj",
      decrease: "Smanji"
    },
    // Unos oznake
    inputtag: {
      placeholder: "Molimo unesite",
      add: "Dodaj",
      remove: "Ukloni"
    },
    // Putokaz
    breadcrumb: {
      label: "Putokaz",
      more: "Vi\u0161e"
    },
    // Povratak na vrh
    backtop: {
      text: "Povratak na vrh"
    },
    // Odabir
    select: {
      placeholder: "Molimo odaberite",
      noData: "Nema podataka",
      loading: "U\u010Ditavanje...",
      noMatch: "Nema podudaranja",
      selectAll: "Odaberi sve",
      clearAll: "O\u010Disti sve"
    },
    // Straničenje
    pagination: {
      goto: "Idi na",
      page: "",
      total: "Ukupno {total}",
      pageSize: "/stranica",
      prev: "Prethodna",
      next: "Sljede\u0107a",
      first: "Prva",
      last: "Zadnja",
      pageClassifier: ""
    },
    // Potvrda skočnog prozora
    popconfirm: {
      confirm: "U redu",
      cancel: "Odustani",
      dontAskAgain: "Ne pitaj ponovno"
    },
    // Dijalog
    dialog: {
      confirm: "U redu",
      cancel: "Odustani",
      close: "Zatvori",
      maximize: "Maksimiziraj",
      restore: "Vrati"
    },
    // Ladica
    drawer: {
      close: "Zatvori",
      confirm: "U redu",
      cancel: "Odustani"
    },
    // Padajući izbornik
    dropdown: {
      loading: "U\u010Ditavanje..."
    },
    // Slika
    image: {
      error: "NEUSPJE\u0160NO",
      loading: "U\u010Ditavanje...",
      preview: "Pregled",
      zoomIn: "Pove\u0107aj",
      zoomOut: "Smanji",
      rotateLeft: "Rotiraj lijevo",
      rotateRight: "Rotiraj desno",
      originalSize: "Izvorna veli\u010Dina",
      fullscreen: "Puni zaslon"
    },
    // Preglednik slika
    imageviewer: {
      close: "Zatvori",
      prev: "Prethodna",
      next: "Sljede\u0107a",
      zoomIn: "Pove\u0107aj",
      zoomOut: "Smanji",
      rotateLeft: "Rotiraj lijevo",
      rotateRight: "Rotiraj desno",
      reset: "Resetiraj",
      fullscreen: "Puni zaslon",
      exitFullscreen: "Iza\u0111i iz punog zaslona"
    },
    // Beskonačno pomicanje
    infinitescroll: {
      loading: "U\u010Ditavanje...",
      finished: "Nema vi\u0161e podataka",
      error: "U\u010Ditavanje neuspje\u0161no, kliknite za ponovni poku\u0161aj",
      retry: "Kliknite za ponovni poku\u0161aj"
    },
    // Poruka
    message: {
      close: "Zatvori"
    },
    // Obavijest
    notification: {
      close: "Zatvori"
    },
    // Učitavanje
    loading: {
      text: "U\u010Ditavanje..."
    },
    // Okretanje
    spin: {
      text: "U\u010Ditavanje..."
    },
    // Ocjena
    rate: {
      texts: ["Izuzetno lo\u0161e", "Razo\u010Daran", "Po\u0161teno", "Zadovoljan", "Iznena\u0111en"]
    },
    // Upozorenje
    alert: {
      close: "Zatvori"
    },
    // Oznaka
    tag: {
      close: "Zatvori"
    },
    // Kartice
    tabs: {
      close: "Zatvori",
      add: "Dodaj",
      more: "Vi\u0161e"
    },
    // Koraci
    steps: {
      finish: "Zavr\u0161eno",
      process: "U tijeku",
      wait: "\u010Ceka",
      error: "Gre\u0161ka"
    },
    // Napredak
    progress: {
      success: "Uspjeh",
      exception: "Iznimka",
      warning: "Upozorenje"
    },
    // Kostur
    skeleton: {
      loading: "U\u010Ditavanje..."
    },
    // Prazno
    empty: {
      description: "Nema podataka",
      noData: "Nema podataka",
      noResult: "Nema rezultata",
      networkError: "Mre\u017Ena gre\u0161ka",
      serverError: "Gre\u0161ka poslu\u017Eitelja"
    },
    // Rezultat
    result: {
      success: "Uspjeh",
      error: "Gre\u0161ka",
      warning: "Upozorenje",
      info: "Informacija",
      backHome: "Povratak na po\u010Detnu"
    },
    // Vodopad
    waterfall: {
      loading: "U\u010Ditavanje...",
      noMore: "Nema vi\u0161e podataka",
      empty: "Nema podataka"
    },
    // Opisi
    descriptions: {
      colon: ":"
    },
    // Klizač
    slider: {
      tipFormatter: "{value}"
    },
    // Prekidač
    switch: {
      on: "UKLJU\u010CENO",
      off: "ISKLJU\u010CENO"
    },
    // Potvrdni okvir
    checkbox: {
      selectAll: "Odaberi sve"
    },
    // Radio
    radio: {},
    // Izbornik
    menu: {
      collapse: "Sa\u017Emi izbornik",
      expand: "Pro\u0161iri izbornik"
    },
    // Kartica
    card: {
      collapse: "Sa\u017Emi",
      expand: "Pro\u0161iri"
    },
    // Sažimanje
    collapse: {
      expand: "Pro\u0161iri",
      collapse: "Sa\u017Emi"
    },
    // Savjet
    tooltip: {},
    // Skočni prozor
    popover: {},
    // Značka
    badge: {},
    // Avatar
    avatar: {
      error: "U\u010Ditavanje neuspje\u0161no"
    },
    // Vodeni žig
    watermark: {},
    // Razdjelnik
    divider: {},
    // Vrtuljak
    carousel: {
      prev: "Prethodna",
      next: "Sljede\u0107a"
    },
    // Tekstualni pomak
    marquee: {},
    // Fiksiranje
    affix: {},
    // Sidro
    anchor: {},
    // Mention
    mention: {
      placeholder: "Molimo unesite",
      loading: "U\u010Ditavanje...",
      noData: "Nema podataka"
    },
    skuselector: {
      placeholder: "Odaberite specifikacije",
      emptyText: "Nema specifikacija",
      stock: "Zaliha",
      price: "Cijena",
      selected: "Odabrano",
      outOfStock: "Nema na zalihi"
    },
    productcard: {
      viewDetails: "Pogledaj detalje",
      buyNow: "Kupi odmah",
      addToCart: "Dodaj u ko\u0161aricu",
      sold: "Prodano",
      soldOut: "Rasprodano",
      vip: "VIP"
    },
    price: {
      original: "Izvorna"
    },
    couponcard: {
      available: "Preuzmi odmah",
      used: "Iskori\u0161teno",
      expired: "Isteklo",
      received: "Preuzeto",
      limit: "Narud\u017Ebe iznad {threshold}",
      noThreshold: "Bez minimalnog iznosa",
      validPeriod: "Razdoblje valjanosti",
      ruleTitle: "Pravila kori\u0161tenja"
    },
    luckydraw: {
      start: "Pokreni",
      drawing: "Izvla\u010Denje...",
      end: "Pobjednik!",
      retry: "Poku\u0161aj ponovno"
    },
    filterbar: {
      all: "Sve",
      sort: "Sortiraj",
      filter: "Filtriraj",
      cancel: "Odustani",
      reset: "Resetiraj",
      confirm: "Potvrdi",
      noOptions: "Nema opcija",
      asc: "Uzlazno",
      desc: "Silazno",
      selected: "Odabrano"
    },
    submitbar: {
      total: "Ukupno: ",
      selected: "{count} odabrano",
      submit: "Na pla\u0107anje",
      allSelect: "Odaberi sve"
    },
    categorynav: {
      all: "Sve",
      noData: "Nema podataka",
      loading: "U\u010Ditavanje..."
    },
    smartaddress: {
      placeholder: "Ovdje zalijepite adresu, automatski prepoznaj ime, telefon i lokaciju",
      parse: "Pametno prepoznavanje",
      province: "Pokrajina/Grad/Okrug",
      city: "Grad",
      district: "Okrug/\u017Dupanija",
      street: "Ulica/Naselje",
      detail: "Detaljna adresa",
      phone: "Telefon",
      name: "Primatelj",
      parseSuccess: "Adresa je uspje\u0161no prepoznata",
      parseFailed: "Prepoznavanje nije uspjelo, ispunite ru\u010Dno",
      required: "Unesite potpunu adresu",
      provinceKeywords: ["Pokrajina", "Dr\u017Eava"],
      cityKeywords: ["Grad", "Regija"],
      districtKeywords: ["Okrug", "\u017Dupanija", "Op\u0107ina"],
      streetKeywords: ["Ulica", "Cesta", "Avenija", "Prolaz"]
    },
    ganttchart: {
      taskName: "Naziv zadatka",
      searchPlaceholder: "Pretra\u017Ei zadatke...",
      zoom: "Zum",
      day: "Dan",
      week: "Tjedan",
      month: "Mjesec",
      year: "Godina",
      milestone: "Prekretnica"
    },
    imagemagnifier: {
      switchToImage: "Prebaci na sliku {index}",
      galleryItem: "Galerija {index}",
      close: "Zatvori"
    },
    // AI Components
    ai: {
      bubble: {
        citations: "Citati"
      },
      mention: {
        placeholder: "@ Spomeni Agenta, Dokument ili Tablicu...",
        agent: "Agent",
        document: "Dokument",
        table: "Tablica",
        knowledge: "Znanje"
      },
      codeBlock: {
        copyCode: "Kopiraj kod",
        copied: "Kopirano!",
        run: "Pokreni kod",
        edit: "Uredi",
        save: "Spremi",
        cancel: "Odustani"
      },
      codeRunner: {
        run: "Pokreni",
        stop: "Zaustavi",
        clear: "O\u010Disti",
        reset: "Resetiraj",
        placeholder: "Kliknite Pokreni za izvr\u0161avanje koda..."
      },
      sender: {
        placeholder: "Po\u0161alji poruku...",
        dragTip: "Otpu\u0161teno za prijenos datoteka"
      },
      thoughtChain: {
        thoughtProcess: "Proces razmi\u0161ljanja",
        thinking: "Razmi\u0161ljam...",
        defaultTitle: "Novi korak",
        addNode: "Dodaj korak"
      },
      thinking: {
        start: "Po\u010Dni razmi\u0161ljati",
        thinking: "Razmi\u0161ljam...",
        complete: "Razmi\u0161ljanje zavr\u0161eno",
        error: "Pogre\u0161ka u razmi\u0161ljanju"
      },
      welcome: {
        title: "Pozdrav, ja sam YH AI",
        description: "Mogu vam pomo\u0107i s kodiranjem, prevo\u0111enjem dokumenata ili kreativnim pisanjem. \u0160to mogu u\u010Diniti za vas danas?"
      },
      action: {
        copy: "Kopiraj",
        regenerate: "Regeneriraj",
        share: "Podijeli",
        like: "Svi\u0111a mi se",
        dislike: "Ne svi\u0111a mi se",
        edit: "Uredi",
        delete: "Izbri\u0161i"
      },
      artifacts: {
        preview: "Pregled",
        inline: "Ugra\u0111eno",
        code: "Izvorni kod",
        versions: "Verzije",
        rendering: "Renderiranje komponente...",
        renderingChart: "Renderiranje grafikona...",
        renderingCanvas: "Priprema platna..."
      },
      voice: {
        trigger: "Kliknite za govor",
        listening: "Slu\u0161am..."
      },
      agent: {
        uses: "kori\u0161tenja",
        use: "Koristi sada",
        favorite: "Favorit",
        unfavorite: "Ukloni iz favorita",
        share: "Podijeli",
        online: "Na mre\u017Ei",
        offline: "Izvan mre\u017Ee",
        busy: "Zauzet",
        verified: "Provjereno",
        rating: "Ocjena",
        reviews: "recenzija",
        responseTime: "Prosje\u010Dno vrijeme odgovora",
        ms: "ms"
      },
      sources: {
        references: "Reference",
        referencedSources: "Referencirani izvori",
        relevant: "Relevantnost",
        viewOriginal: "Pogledaj izvorno",
        showAll: "Prika\u017Ei sve",
        more: "vi\u0161e izvora",
        drawerTitle: "Reference",
        expandMore: "Prika\u017Ei vi\u0161e",
        collapseMore: "Sa\u017Emi",
        noSources: "Nema izvora",
        today: "Danas",
        last7Days: "Zadnjih 7 dana",
        last30Days: "Zadnjih 30 dana",
        earlier: "Prije",
        pinned: "Prika\u010Deno"
      },
      conversations: {
        today: "Danas",
        last7Days: "Zadnjih 7 dana",
        last30Days: "Zadnjih 30 dana",
        earlier: "Prije",
        pinned: "Prika\u010Deno",
        pin: "Prika\u010Di",
        unpin: "Odprika\u010Di",
        newConversation: "Novi razgovor",
        noData: "Jo\u0161 nema razgovora",
        rename: "Preimenuj",
        delete: "Izbri\u0161i",
        deleteConfirm: "Potvrdite brisanje ovog razgovora?"
      },
      attachments: {
        dropTip: "Ispustite datoteke ovdje za prijenos",
        clickToUpload: "Kliknite ili povucite datoteke za prijenos",
        uploadSuccess: "Prijenos je uspio",
        uploadError: "Prijenos nije uspio",
        deleteConfirm: "Jeste li sigurni da \u017Eelite izbrisati ovu datoteku?",
        fileTooLarge: "Veli\u010Dina datoteke ne smije biti ve\u0107a od {size}",
        invalidFileType: "Neva\u017Ee\u0107a vrsta datoteke"
      },
      mermaid: {
        image: "Slika",
        code: "Kod",
        zoomIn: "Pove\u0107aj",
        zoomOut: "Smanji",
        reset: "Poni\u0161ti",
        download: "Preuzmi",
        copyCode: "Kopiraj kod",
        rendering: "Renderiranje...",
        renderError: "Renderiranje nije uspjelo",
        renderSuccess: "Renderiranje je uspjelo",
        retry: "Poku\u0161aj ponovno"
      }
    }
  }
};
module.exports = hr;