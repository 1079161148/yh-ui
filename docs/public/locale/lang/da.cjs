"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
module.exports = exports.da = void 0;
const da = exports.da = {
  name: "da",
  yh: {
    // Fælles
    common: {
      yes: "Ja",
      no: "Nej",
      confirm: "Bekr\xE6ft",
      cancel: "Annuller",
      loading: "Indl\xE6ser",
      close: "Luk",
      clear: "Ryd",
      reset: "Nulstil",
      save: "Gem",
      delete: "Slet",
      edit: "Rediger",
      add: "Tilf\xF8j",
      search: "S\xF8g",
      refresh: "Opdater",
      expand: "Udvid",
      collapse: "Skjul",
      more: "Mere",
      noData: "Ingen data",
      noMatch: "Ingen matchende data",
      selectAll: "V\xE6lg alle",
      unselectAll: "Frav\xE6lg alle"
    },
    // Farvevælger
    colorpicker: {
      confirm: "OK",
      clear: "Ryd",
      eyeDropper: "Pipette",
      suggestionDark: "Hvid tekst er bedst",
      suggestionLight: "Sort tekst er bedst",
      recentColors: "Seneste farver",
      presetColors: "Forudindstillede farver"
    },
    // Dato vælger
    datepicker: {
      now: "Nu",
      today: "I dag",
      cancel: "Annuller",
      clear: "Ryd",
      confirm: "OK",
      selectDate: "V\xE6lg dato",
      selectTime: "V\xE6lg tid",
      startDate: "Startdato",
      startTime: "Starttid",
      endDate: "Slutdato",
      endTime: "Sluttid",
      year: "",
      month: "",
      day: "",
      week: "Uge",
      monthBeforeYear: true,
      prevYear: "Forrige \xE5r",
      nextYear: "N\xE6ste \xE5r",
      prevMonth: "Forrige m\xE5ned",
      nextMonth: "N\xE6ste m\xE5ned",
      weeks: {
        sun: "S\xF8n",
        mon: "Man",
        tue: "Tir",
        wed: "Ons",
        thu: "Tor",
        fri: "Fre",
        sat: "L\xF8r"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "Maj",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Okt",
        nov: "Nov",
        dec: "Dec"
      },
      quarters: {
        q1: "Q1",
        q2: "Q2",
        q3: "Q3",
        q4: "Q4"
      }
    },
    // Tid vælger
    timepicker: {
      confirm: "OK",
      cancel: "Annuller",
      now: "Nu",
      placeholder: "V\xE6lg tid",
      startPlaceholder: "Starttid",
      endPlaceholder: "Sluttid",
      selectTime: "V\xE6lg tid"
    },
    // Tid valg
    timeselect: {
      placeholder: "V\xE6lg tid"
    },
    // Træ
    tree: {
      emptyText: "Ingen data",
      loading: "Indl\xE6ser...",
      checkAll: "V\xE6lg alle",
      uncheckAll: "Frav\xE6lg alle",
      expandAll: "Udvid alle",
      collapseAll: "Skjul alle"
    },
    // Træ valg
    treeselect: {
      placeholder: "V\xE6lg",
      emptyText: "Ingen data",
      loading: "Indl\xE6ser...",
      noMatch: "Ingen matchende data"
    },
    // Kalender
    calendar: {
      prevMonth: "Forrige m\xE5ned",
      nextMonth: "N\xE6ste m\xE5ned",
      prevYear: "Forrige \xE5r",
      nextYear: "N\xE6ste \xE5r",
      today: "I dag",
      week: "Uge",
      holiday: "Helligdag",
      workday: "Arbejde",
      monthHeaderFormat: "MMMM YYYY",
      weeks: {
        sun: "S\xF8n",
        mon: "Man",
        tue: "Tir",
        wed: "Ons",
        thu: "Tor",
        fri: "Fre",
        sat: "L\xF8r"
      }
    },
    // Autofærdiggørelse
    autocomplete: {
      loading: "Indl\xE6ser...",
      placeholder: "Indtast venligst",
      noData: "Ingen data",
      noMatch: "Ingen matchende data"
    },
    // Nedtælling
    countdown: {
      days: "dage",
      hours: "timer",
      minutes: "minutter",
      seconds: "sekunder",
      milliseconds: "millisekunder",
      finished: "Afsluttet"
    },
    // Kaskade vælger
    cascader: {
      noMatch: "Ingen matchende data",
      placeholder: "V\xE6lg",
      loading: "Indl\xE6ser...",
      noData: "Ingen data"
    },
    // Overførsel
    transfer: {
      noMatch: "Ingen matchende data",
      noData: "Ingen data",
      titles: ["Liste 1", "Liste 2"],
      filterPlaceholder: "Indtast n\xF8gleord",
      noCheckedFormat: "{total} elementer",
      hasCheckedFormat: "{checked}/{total} valgt",
      searchPlaceholder: "Indtast n\xF8gleord"
    },
    // Tabel
    table: {
      emptyText: "Ingen data",
      confirmFilter: "Bekr\xE6ft",
      resetFilter: "Nulstil",
      clearFilter: "Alle",
      sumText: "Sum",
      loading: "Indl\xE6ser...",
      index: "Indeks",
      print: "Print",
      cancel: "Annuller",
      preview: "Print forh\xE5ndsvisning",
      printTime: "Printtid",
      total: "I alt {total} elementer",
      page: "Side {page}",
      yes: "Ja",
      no: "Nej",
      // Værktøjslinje
      toolbar: {
        refresh: "Opdater",
        density: "T\xE6thed",
        densityDefault: "Standard",
        densityLarge: "Stor",
        densitySmall: "Lille",
        columnSetting: "Kolonneindstillinger",
        fullscreen: "Fuldsk\xE6rm",
        exitFullscreen: "Afslut fuldsk\xE6rm",
        export: "Eksporter",
        import: "Importer",
        search: "S\xF8g",
        searchPlaceholder: "Indtast n\xF8gleord for at s\xF8ge"
      },
      // Filter
      filter: {
        selectAll: "V\xE6lg alle",
        selectInvert: "Inverter valg",
        empty: "Er tom",
        notEmpty: "Er ikke tom",
        contains: "Indeholder",
        notContains: "Indeholder ikke",
        equals: "Lig med",
        notEquals: "Ikke lig med",
        startsWith: "Starter med",
        endsWith: "Slutter med",
        greaterThan: "St\xF8rre end",
        lessThan: "Mindre end",
        between: "Mellem"
      },
      // Sortering
      sort: {
        asc: "Stigende",
        desc: "Faldende",
        clear: "Ryd sortering"
      },
      // Eksport
      export: {
        title: "Eksporter data",
        filename: "Filnavn",
        type: "Filtype",
        scope: "Eksportomfang",
        scopeAll: "Alle data",
        scopeSelected: "Valgte data",
        scopeCurrentPage: "Nuv\xE6rende side",
        includeHeader: "Inkluder header",
        exporting: "Eksporterer...",
        success: "Eksport lykkedes",
        error: "Eksport mislykkedes"
      },
      // Import
      import: {
        title: "Importer data",
        selectFile: "V\xE6lg fil",
        dragTip: "Klik eller tr\xE6k fil hertil for at uploade",
        importing: "Importerer...",
        success: "Import lykkedes",
        error: "Import mislykkedes",
        preview: "Data forh\xE5ndsvisning",
        confirm: "Bekr\xE6ft import"
      },
      // Print
      printConfig: {
        title: "Printindstillinger",
        pageTitle: "Sidetitel",
        pageHeader: "Header",
        pageFooter: "Footer",
        printAll: "Print alle",
        printSelected: "Print valgte",
        printCurrentPage: "Print nuv\xE6rende side",
        landscape: "Landskab",
        portrait: "Portr\xE6t",
        printing: "Printer..."
      },
      // Kolonneindstillinger
      columnSetting: {
        title: "Kolonneindstillinger",
        showAll: "Vis alle",
        hideAll: "Skjul alle",
        reset: "Nulstil",
        fixedLeft: "Fastg\xF8r til venstre",
        fixedRight: "Fastg\xF8r til h\xF8jre",
        unfixed: "Frigiv"
      },
      // Kontekstmenu
      contextMenu: {
        copy: "Kopier",
        copyRow: "Kopier r\xE6kke",
        copyCell: "Kopier celle",
        paste: "Inds\xE6t",
        insertRowAbove: "Inds\xE6t r\xE6kke over",
        insertRowBelow: "Inds\xE6t r\xE6kke under",
        deleteRow: "Slet r\xE6kke",
        deleteSelectedRows: "Slet valgte r\xE6kker",
        exportSelected: "Eksporter valgte"
      },
      // Valg
      selection: {
        selectAll: "V\xE6lg alle",
        selectInvert: "Inverter valg",
        selectNone: "Ryd valg",
        selected: "{count} elementer valgt"
      },
      // Udvid
      expand: {
        expandAll: "Udvid alle",
        collapseAll: "Skjul alle"
      },
      // Træ
      tree: {
        expandAll: "Udvid alle",
        collapseAll: "Skjul alle",
        expandLevel: "Udvid til niveau {level}"
      },
      // Træk
      drag: {
        dragTip: "Tr\xE6k for at omarrangere",
        dropTip: "Slip for at placere"
      }
    },
    // Beskedboks
    messagebox: {
      title: "Besked",
      confirm: "OK",
      cancel: "Annuller",
      close: "Luk",
      error: "Ugyldig input",
      alert: "Advarsel",
      prompt: "Prompt",
      inputPlaceholder: "Indtast venligst"
    },
    // Upload
    upload: {
      deleteTip: "tryk delete for at fjerne",
      delete: "Slet",
      preview: "Forh\xE5ndsvisning",
      continue: "Forts\xE6t",
      upload: "Klik for at uploade",
      tip: "Klik eller tr\xE6k fil til dette omr\xE5de for at <em>uploade</em>",
      dragTip: "Slip fil her eller klik for at uploade",
      uploading: "Uploader...",
      success: "Upload lykkedes",
      error: "Upload mislykkedes",
      retry: "Pr\xF8v igen",
      cancel: "Annuller upload",
      fileTypeError: "Filtype underst\xF8ttes ikke",
      fileSizeError: "Filst\xF8rrelse overskrider gr\xE6nse",
      fileCountError: "Filantal overskrider gr\xE6nse"
    },
    // Formular
    form: {
      validationFailed: "Validering mislykkedes",
      required: "P\xE5kr\xE6vet",
      pleaseInput: "Indtast venligst",
      pleaseSelect: "V\xE6lg venligst"
    },
    // Knap
    button: {
      loading: "Indl\xE6ser..."
    },
    // Input
    input: {
      placeholder: "Indtast venligst",
      clear: "Ryd",
      showPassword: "Vis adgangskode",
      hidePassword: "Skjul adgangskode",
      copy: "Kopier",
      copied: "Kopieret"
    },
    // Input nummer
    inputnumber: {
      placeholder: "Indtast venligst nummer",
      increase: "For\xF8g",
      decrease: "Formindsk"
    },
    // Input tag
    inputtag: {
      placeholder: "Indtast venligst",
      add: "Tilf\xF8j",
      remove: "Fjern"
    },
    // Breadcrumb
    breadcrumb: {
      label: "Breadcrumb",
      more: "Mere"
    },
    // Tilbage til top
    backtop: {
      text: "Tilbage til top"
    },
    // Vælg
    select: {
      placeholder: "V\xE6lg venligst",
      noData: "Ingen data",
      loading: "Indl\xE6ser...",
      noMatch: "Ingen matchende data",
      selectAll: "V\xE6lg alle",
      clearAll: "Ryd alle"
    },
    // Paginering
    pagination: {
      goto: "G\xE5 til",
      page: "",
      total: "I alt {total}",
      pageSize: "/side",
      prev: "Forrige",
      next: "N\xE6ste",
      first: "F\xF8rste",
      last: "Sidste",
      pageClassifier: ""
    },
    // Popbekræftelse
    popconfirm: {
      confirm: "OK",
      cancel: "Annuller",
      dontAskAgain: "Sp\xF8rg ikke igen"
    },
    // Dialog
    dialog: {
      confirm: "OK",
      cancel: "Annuller",
      close: "Luk",
      maximize: "Maksimer",
      restore: "Gendan"
    },
    // Skuffe
    drawer: {
      close: "Luk",
      confirm: "OK",
      cancel: "Annuller"
    },
    // Dropdown menu
    dropdown: {
      loading: "Indl\xE6ser..."
    },
    // Billede
    image: {
      error: "MISLYKKEDES",
      loading: "Indl\xE6ser...",
      preview: "Forh\xE5ndsvisning",
      zoomIn: "Zoom ind",
      zoomOut: "Zoom ud",
      rotateLeft: "Roter venstre",
      rotateRight: "Roter h\xF8jre",
      originalSize: "Original st\xF8rrelse",
      fullscreen: "Fuldsk\xE6rm"
    },
    // Billedviser
    imageviewer: {
      close: "Luk",
      prev: "Forrige",
      next: "N\xE6ste",
      zoomIn: "Zoom ind",
      zoomOut: "Zoom ud",
      rotateLeft: "Roter venstre",
      rotateRight: "Roter h\xF8jre",
      reset: "Nulstil",
      fullscreen: "Fuldsk\xE6rm",
      exitFullscreen: "Afslut fuldsk\xE6rm"
    },
    // Uendelig rulning
    infinitescroll: {
      loading: "Indl\xE6ser...",
      finished: "Ikke flere data",
      error: "Indl\xE6sning mislykkedes, klik for at pr\xF8ve igen",
      retry: "Klik for at pr\xF8ve igen"
    },
    // Besked
    message: {
      close: "Luk"
    },
    // Notifikation
    notification: {
      close: "Luk"
    },
    // Indlæsning
    loading: {
      text: "Indl\xE6ser..."
    },
    // Spin
    spin: {
      text: "Indl\xE6ser..."
    },
    // Vurdering
    rate: {
      texts: ["Ekstremt d\xE5rlig", "Skuffet", "Rimelig", "Tilfreds", "Overrasket"]
    },
    // Advarsel
    alert: {
      close: "Luk"
    },
    // Tag
    tag: {
      close: "Luk"
    },
    // Faner
    tabs: {
      close: "Luk",
      add: "Tilf\xF8j",
      more: "Mere"
    },
    // Trin
    steps: {
      finish: "Afsluttet",
      process: "I gang",
      wait: "Venter",
      error: "Fejl"
    },
    // Fremskridt
    progress: {
      success: "Succes",
      exception: "Undtagelse",
      warning: "Advarsel"
    },
    // Skelet
    skeleton: {
      loading: "Indl\xE6ser..."
    },
    // Tom
    empty: {
      description: "Ingen data",
      noData: "Ingen data",
      noResult: "Ingen resultater",
      networkError: "Netv\xE6rksfejl",
      serverError: "Serverfejl"
    },
    // Resultat
    result: {
      success: "Succes",
      error: "Fejl",
      warning: "Advarsel",
      info: "Info",
      backHome: "Tilbage til hjem"
    },
    // Vandfald
    waterfall: {
      loading: "Indl\xE6ser...",
      noMore: "Ikke flere data",
      empty: "Ingen data"
    },
    // Beskrivelser
    descriptions: {
      colon: ":"
    },
    // Slider
    slider: {
      tipFormatter: "{value}"
    },
    // Kontakt
    switch: {
      on: "TIL",
      off: "FRA"
    },
    // Afkrydsningsfelt
    checkbox: {
      selectAll: "V\xE6lg alle"
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: "Skjul menu",
      expand: "Udvid menu"
    },
    // Kort
    card: {
      collapse: "Skjul",
      expand: "Udvid"
    },
    // Skjul
    collapse: {
      expand: "Udvid",
      collapse: "Skjul"
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: "Indl\xE6sning mislykkedes"
    },
    // Vandmærke
    watermark: {},
    // Skillevæg
    divider: {},
    // Karrusel
    carousel: {
      prev: "Forrige",
      next: "N\xE6ste"
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Anker
    anchor: {},
    // Mention
    mention: {
      placeholder: "Venligst indtast",
      loading: "Indl\xE6ser...",
      noData: "Ingen data"
    },
    // AI Components
    ai: {
      bubble: {
        citations: "Citatationer"
      },
      mention: {
        placeholder: "@ N\xE6vn Agent, Dokument eller Tabel...",
        agent: "Agent",
        document: "Dokument",
        table: "Tabel",
        knowledge: "Viden"
      },
      codeBlock: {
        copyCode: "Kopi\xE9r kode",
        copied: "Kopieret!",
        run: "K\xF8r kode",
        edit: "Redig\xE9r",
        save: "Gem",
        cancel: "Annull\xE9r"
      },
      codeRunner: {
        run: "K\xF8r",
        stop: "Stop",
        clear: "Ryd",
        reset: "Nulstil",
        placeholder: "Klik p\xE5 K\xF8r for at udf\xF8re koden..."
      },
      sender: {
        placeholder: "Send en besked...",
        dragTip: "Slip for at uploade filer"
      },
      thoughtChain: {
        thoughtProcess: "T\xE6nkeproces",
        thinking: "T\xE6nker...",
        defaultTitle: "Nyt trin",
        addNode: "Tilf\xF8j trin"
      },
      thinking: {
        start: "Start med at t\xE6nke",
        thinking: "T\xE6nker...",
        complete: "T\xE6nkning afsluttet",
        error: "T\xE6nkefejl"
      },
      welcome: {
        title: "Hej, jeg er YH AI",
        description: "Jeg kan hj\xE6lpe dig med kodning, overs\xE6ttelse af dokumenter eller kreativ skrivning. Hvad kan jeg hj\xE6lpe dig med i dag?"
      },
      action: {
        copy: "Kopi\xE9r",
        regenerate: "Regener\xE9r",
        share: "Del",
        like: "Synes godt om",
        dislike: "Synes ikke godt om",
        edit: "Redig\xE9r",
        delete: "Slet"
      },
      artifacts: {
        preview: "Eksempel",
        inline: "Inline",
        code: "Kilde",
        versions: "Versioner",
        rendering: "Renderer komponent...",
        renderingChart: "Renderer diagram...",
        renderingCanvas: "Forbereder l\xE6rred..."
      },
      voice: {
        trigger: "Klik for at tale",
        listening: "Lytter..."
      },
      agent: {
        uses: "bruger",
        use: "Brug nu",
        favorite: "Favorit",
        unfavorite: "Fjern favorit",
        share: "Del",
        online: "Online",
        offline: "Offline",
        busy: "Optaget",
        verified: "Verificeret",
        rating: "Vurdering",
        reviews: "anmeldelser",
        responseTime: "Gennemsnitlig responstid",
        ms: "ms"
      },
      sources: {
        references: "Referencer",
        referencedSources: "Refererede kilder",
        relevant: "Relevans",
        viewOriginal: "Se original",
        showAll: "Vis alle",
        more: "flere kilder",
        drawerTitle: "Referencer",
        expandMore: "Vis mere",
        collapseMore: "Luk",
        noSources: "Ingen kilder",
        today: "I dag",
        last7Days: "Sidste 7 dage",
        last30Days: "Sidste 30 dage",
        earlier: "Tidligere",
        pinned: "Fastgjort"
      },
      conversations: {
        today: "I dag",
        last7Days: "Sidste 7 dage",
        last30Days: "Sidste 30 dage",
        earlier: "Tidligere",
        pinned: "Fastgjort",
        pin: "Fastg\xF8r",
        unpin: "Frig\xF8r",
        newConversation: "Ny samtale",
        rename: "Omd\xF8b",
        delete: "Slet",
        deleteConfirm: "Bekr\xE6ft sletning af denne samtale?"
      }
    }
  }
};
module.exports = da;