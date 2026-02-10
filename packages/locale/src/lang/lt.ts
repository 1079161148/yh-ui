import type { Language } from '../index'

export const lt: Language = {
  name: 'lt',
  yh: {
    // Bendras
    common: {
      yes: 'Taip',
      no: 'Ne',
      confirm: 'Patvirtinti',
      cancel: 'Atšaukti',
      loading: 'Įkeliama',
      close: 'Uždaryti',
      clear: 'Išvalyti',
      reset: 'Atkurti',
      save: 'Išsaugoti',
      delete: 'Ištrinti',
      edit: 'Redaguoti',
      add: 'Pridėti',
      search: 'Ieškoti',
      refresh: 'Atnaujinti',
      expand: 'Išplėsti',
      collapse: 'Suskleisti',
      more: 'Daugiau',
      noData: 'Nėra duomenų',
      noMatch: 'Nėra atitinkančių duomenų',
      selectAll: 'Pasirinkti viską',
      unselectAll: 'Atšaukti visą pasirinkimą'
    },
    // Spalvų pasirinkimas
    colorpicker: {
      confirm: 'Gerai',
      clear: 'Išvalyti',
      eyeDropper: 'Pipetė',
      suggestionDark: 'Baltas tekstas geriausias',
      suggestionLight: 'Juodas tekstas geriausias',
      recentColors: 'Paskutinės spalvos',
      presetColors: 'Iš anksto nustatytos spalvos'
    },
    // Data pasirinkimas
    datepicker: {
      now: 'Dabar',
      today: 'Šiandien',
      cancel: 'Atšaukti',
      clear: 'Išvalyti',
      confirm: 'Gerai',
      selectDate: 'Pasirinkite datą',
      selectTime: 'Pasirinkite laiką',
      startDate: 'Pradžios data',
      startTime: 'Pradžios laikas',
      endDate: 'Pabaigos data',
      endTime: 'Pabaigos laikas',
      year: '',
      month: '',
      day: '',
      week: 'Savaitė',
      monthBeforeYear: true,
      prevYear: 'Ankstesni metai',
      nextYear: 'Kiti metai',
      prevMonth: 'Ankstesnis mėnuo',
      nextMonth: 'Kitas mėnuo',
      weeks: {
        sun: 'Sk',
        mon: 'Pr',
        tue: 'An',
        wed: 'Tr',
        thu: 'Kt',
        fri: 'Pn',
        sat: 'Št'
      },
      months: {
        jan: 'Sau',
        feb: 'Vas',
        mar: 'Kov',
        apr: 'Bal',
        may: 'Geg',
        jun: 'Bir',
        jul: 'Lie',
        aug: 'Rgp',
        sep: 'Rgs',
        oct: 'Spa',
        nov: 'Lap',
        dec: 'Grd'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Laiko pasirinkimas
    timepicker: {
      confirm: 'Gerai',
      cancel: 'Atšaukti',
      now: 'Dabar',
      placeholder: 'Pasirinkite laiką',
      startPlaceholder: 'Pradžios laikas',
      endPlaceholder: 'Pabaigos laikas',
      selectTime: 'Pasirinkite laiką'
    },
    // Laiko pasirinkimas
    timeselect: {
      placeholder: 'Pasirinkite laiką'
    },
    // Medis
    tree: {
      emptyText: 'Nėra duomenų',
      loading: 'Įkeliama...',
      checkAll: 'Pažymėti viską',
      uncheckAll: 'Atžymėti viską',
      expandAll: 'Išplėsti viską',
      collapseAll: 'Suskleisti viską'
    },
    // Medžio pasirinkimas
    treeselect: {
      placeholder: 'Pasirinkite',
      emptyText: 'Nėra duomenų',
      loading: 'Įkeliama...',
      noMatch: 'Nėra atitinkančių duomenų'
    },
    // Kalendorius
    calendar: {
      prevMonth: 'Ankstesnis mėnuo',
      nextMonth: 'Kitas mėnuo',
      prevYear: 'Ankstesni metai',
      nextYear: 'Kiti metai',
      today: 'Šiandien',
      week: 'Savaitė',
      holiday: 'Šventė',
      workday: 'Darbo diena',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Sk',
        mon: 'Pr',
        tue: 'An',
        wed: 'Tr',
        thu: 'Kt',
        fri: 'Pn',
        sat: 'Št'
      }
    },
    // Automatinis užpildymas
    autocomplete: {
      loading: 'Įkeliama...',
      placeholder: 'Prašome įvesti',
      noData: 'Nėra duomenų',
      noMatch: 'Nėra atitinkančių duomenų'
    },
    // Atgalinis skaičiavimas
    countdown: {
      days: 'dienos',
      hours: 'valandos',
      minutes: 'minutės',
      seconds: 'sekundės',
      milliseconds: 'milisekundės',
      finished: 'Baigta'
    },
    // Kaskada
    cascader: {
      noMatch: 'Nėra atitinkančių duomenų',
      placeholder: 'Pasirinkite',
      loading: 'Įkeliama...',
      noData: 'Nėra duomenų'
    },
    // Perkėlimas
    transfer: {
      noMatch: 'Nėra atitinkančių duomenų',
      noData: 'Nėra duomenų',
      titles: ['Sąrašas 1', 'Sąrašas 2'],
      filterPlaceholder: 'Įveskite raktažodį',
      noCheckedFormat: '{total} elementai',
      hasCheckedFormat: '{checked}/{total} pasirinkta',
      searchPlaceholder: 'Įveskite raktažodį'
    },
    // Lentelė
    table: {
      emptyText: 'Nėra duomenų',
      confirmFilter: 'Patvirtinti',
      resetFilter: 'Atkurti',
      clearFilter: 'Viskas',
      sumText: 'Suma',
      loading: 'Įkeliama...',
      index: 'Indeksas',
      print: 'Spausdinti',
      cancel: 'Atšaukti',
      preview: 'Spausdinimo peržiūra',
      printTime: 'Spausdinimo laikas',
      total: 'Iš viso {total} elementų',
      page: 'Puslapis {page}',
      yes: 'Taip',
      no: 'Ne',
      // Įrankių juosta
      toolbar: {
        refresh: 'Atnaujinti',
        density: 'Tankis',
        densityDefault: 'Numatytasis',
        densityLarge: 'Didelis',
        densitySmall: 'Mažas',
        columnSetting: 'Stulpelių nustatymai',
        fullscreen: 'Visas ekranas',
        exitFullscreen: 'Išeiti iš viso ekrano',
        export: 'Eksportuoti',
        import: 'Importuoti',
        search: 'Ieškoti',
        searchPlaceholder: 'Įveskite raktažodžius paieškai'
      },
      // Filtras
      filter: {
        selectAll: 'Pasirinkti viską',
        selectInvert: 'Apversti pasirinkimą',
        empty: 'Tuščia',
        notEmpty: 'Ne tuščia',
        contains: 'Turi',
        notContains: 'Neturi',
        equals: 'Lygu',
        notEquals: 'Nelygu',
        startsWith: 'Prasideda',
        endsWith: 'Baigiasi',
        greaterThan: 'Didesnis nei',
        lessThan: 'Mažesnis nei',
        between: 'Tarp'
      },
      // Rūšiavimas
      sort: {
        asc: 'Didėjančia tvarka',
        desc: 'Mažėjančia tvarka',
        clear: 'Išvalyti rūšiavimą'
      },
      // Eksportavimas
      export: {
        title: 'Eksportuoti duomenis',
        filename: 'Failo pavadinimas',
        type: 'Failo tipas',
        scope: 'Eksportavimo apimtis',
        scopeAll: 'Visi duomenys',
        scopeSelected: 'Pasirinkti duomenys',
        scopeCurrentPage: 'Dabartinis puslapis',
        includeHeader: 'Įtraukti antraštę',
        exporting: 'Eksportuojama...',
        success: 'Eksportavimas sėkmingas',
        error: 'Eksportavimas nepavyko'
      },
      // Importavimas
      import: {
        title: 'Importuoti duomenis',
        selectFile: 'Pasirinkite failą',
        dragTip: 'Spustelėkite arba vilkite failą čia, kad įkeltumėte',
        importing: 'Importuojama...',
        success: 'Importavimas sėkmingas',
        error: 'Importavimas nepavyko',
        preview: 'Duomenų peržiūra',
        confirm: 'Patvirtinti importavimą'
      },
      // Spausdinimas
      printConfig: {
        title: 'Spausdinimo nustatymai',
        pageTitle: 'Puslapio antraštė',
        pageHeader: 'Antraštė',
        pageFooter: 'Poraištis',
        printAll: 'Spausdinti viską',
        printSelected: 'Spausdinti pasirinktą',
        printCurrentPage: 'Spausdinti dabartinį puslapį',
        landscape: 'Gulsčias',
        portrait: 'Stačias',
        printing: 'Spausdinama...'
      },
      // Stulpelių nustatymai
      columnSetting: {
        title: 'Stulpelių nustatymai',
        showAll: 'Rodyti viską',
        hideAll: 'Slėpti viską',
        reset: 'Atkurti',
        fixedLeft: 'Pritvirtinti kairėje',
        fixedRight: 'Pritvirtinti dešinėje',
        unfixed: 'Atlaisvinti'
      },
      // Kontekstinis meniu
      contextMenu: {
        copy: 'Kopijuoti',
        copyRow: 'Kopijuoti eilutę',
        copyCell: 'Kopijuoti langelį',
        paste: 'Įklijuoti',
        insertRowAbove: 'Įterpti eilutę aukščiau',
        insertRowBelow: 'Įterpti eilutę žemiau',
        deleteRow: 'Ištrinti eilutę',
        deleteSelectedRows: 'Ištrinti pasirinktas eilutes',
        exportSelected: 'Eksportuoti pasirinktą'
      },
      // Pasirinkimas
      selection: {
        selectAll: 'Pasirinkti viską',
        selectInvert: 'Apversti pasirinkimą',
        selectNone: 'Išvalyti pasirinkimą',
        selected: '{count} elementai pasirinkti'
      },
      // Išplėtimas
      expand: {
        expandAll: 'Išplėsti viską',
        collapseAll: 'Suskleisti viską'
      },
      // Medis
      tree: {
        expandAll: 'Išplėsti viską',
        collapseAll: 'Suskleisti viską',
        expandLevel: 'Išplėsti iki lygio {level}'
      },
      // Vilkimas
      drag: {
        dragTip: 'Vilkite, kad pertvarkytumėte',
        dropTip: 'Paleiskite, kad pastatytumėte'
      }
    },
    // Pranešimo langas
    messagebox: {
      title: 'Pranešimas',
      confirm: 'Gerai',
      cancel: 'Atšaukti',
      close: 'Uždaryti',
      error: 'Netinkamas įvedimas',
      alert: 'Perspėjimas',
      prompt: 'Užklausimas',
      inputPlaceholder: 'Prašome įvesti'
    },
    // Įkėlimas
    upload: {
      deleteTip: 'paspauskite delete, kad pašalintumėte',
      delete: 'Ištrinti',
      preview: 'Peržiūra',
      continue: 'Tęsti',
      upload: 'Spustelėkite, kad įkeltumėte',
      tip: 'Spustelėkite arba vilkite failą į šią sritį, kad <em>įkeltumėte</em>',
      dragTip: 'Paleiskite failą čia arba spustelėkite, kad įkeltumėte',
      uploading: 'Įkeliama...',
      success: 'Įkėlimas sėkmingas',
      error: 'Įkėlimas nepavyko',
      retry: 'Bandyti dar kartą',
      cancel: 'Atšaukti įkėlimą',
      fileTypeError: 'Failo tipas nepalaikomas',
      fileSizeError: 'Failo dydis viršija limitą',
      fileCountError: 'Failų skaičius viršija limitą'
    },
    // Forma
    form: {
      validationFailed: 'Tikrinimas nepavyko',
      required: 'Privaloma',
      pleaseInput: 'Prašome įvesti',
      pleaseSelect: 'Prašome pasirinkti'
    },
    // Mygtukas
    button: {
      loading: 'Įkeliama...'
    },
    // Įvedimas
    input: {
      placeholder: 'Prašome įvesti',
      clear: 'Išvalyti',
      showPassword: 'Rodyti slaptažodį',
      hidePassword: 'Slėpti slaptažodį',
      copy: 'Kopijuoti',
      copied: 'Nukopijuota'
    },
    // Skaičiaus įvedimas
    inputnumber: {
      placeholder: 'Prašome įvesti skaičių',
      increase: 'Padidinti',
      decrease: 'Sumažinti'
    },
    // Žymės įvedimas
    inputtag: {
      placeholder: 'Prašome įvesti',
      add: 'Pridėti',
      remove: 'Pašalinti'
    },
    // Navigacijos kelias
    breadcrumb: {
      label: 'Navigacijos kelias',
      more: 'Daugiau'
    },
    // Grįžti į viršų
    backtop: {
      text: 'Grįžti į viršų'
    },
    // Pasirinkimas
    select: {
      placeholder: 'Prašome pasirinkti',
      noData: 'Nėra duomenų',
      loading: 'Įkeliama...',
      noMatch: 'Nėra atitinkančių duomenų',
      selectAll: 'Pasirinkti viską',
      clearAll: 'Išvalyti viską'
    },
    // Puslapiavimas
    pagination: {
      goto: 'Eiti į',
      page: '',
      total: 'Iš viso {total}',
      pageSize: '/puslapis',
      prev: 'Ankstesnis',
      next: 'Kitas',
      first: 'Pirmas',
      last: 'Paskutinis',
      pageClassifier: ''
    },
    // Patvirtinimo iššokantis langas
    popconfirm: {
      confirm: 'Gerai',
      cancel: 'Atšaukti',
      dontAskAgain: 'Neklausti dar kartą'
    },
    // Dialogas
    dialog: {
      confirm: 'Gerai',
      cancel: 'Atšaukti',
      close: 'Uždaryti',
      maximize: 'Maksimizuoti',
      restore: 'Atkurti'
    },
    // Šalutinė juosta
    drawer: {
      close: 'Uždaryti',
      confirm: 'Gerai',
      cancel: 'Atšaukti'
    },
    // Išskleidžiamasis meniu
    dropdown: {
      loading: 'Įkeliama...'
    },
    // Paveikslėlis
    image: {
      error: 'NEPAVYKO',
      loading: 'Įkeliama...',
      preview: 'Peržiūra',
      zoomIn: 'Padidinti',
      zoomOut: 'Sumažinti',
      rotateLeft: 'Pasukti kairėn',
      rotateRight: 'Pasukti dešinėn',
      originalSize: 'Originalus dydis',
      fullscreen: 'Visas ekranas'
    },
    // Paveikslėlių peržiūros programa
    imageviewer: {
      close: 'Uždaryti',
      prev: 'Ankstesnis',
      next: 'Kitas',
      zoomIn: 'Padidinti',
      zoomOut: 'Sumažinti',
      rotateLeft: 'Pasukti kairėn',
      rotateRight: 'Pasukti dešinėn',
      reset: 'Atkurti',
      fullscreen: 'Visas ekranas',
      exitFullscreen: 'Išeiti iš viso ekrano'
    },
    // Begalinis slinkimas
    infinitescroll: {
      loading: 'Įkeliama...',
      finished: 'Daugiau duomenų nėra',
      error: 'Įkėlimas nepavyko, spustelėkite, kad bandytumėte dar kartą',
      retry: 'Spustelėkite, kad bandytumėte dar kartą'
    },
    // Pranešimas
    message: {
      close: 'Uždaryti'
    },
    // Pranešimas
    notification: {
      close: 'Uždaryti'
    },
    // Įkėlimas
    loading: {
      text: 'Įkeliama...'
    },
    // Sukimas
    spin: {
      text: 'Įkeliama...'
    },
    // Įvertinimas
    rate: {
      texts: ['Labai blogai', 'Nusivylęs', 'Vidutiniškai', 'Patenkintas', 'Nustebęs']
    },
    // Perspėjimas
    alert: {
      close: 'Uždaryti'
    },
    // Žymė
    tag: {
      close: 'Uždaryti'
    },
    // Skirtukai
    tabs: {
      close: 'Uždaryti',
      add: 'Pridėti',
      more: 'Daugiau'
    },
    // Žingsniai
    steps: {
      finish: 'Baigta',
      process: 'Vykdoma',
      wait: 'Laukiama',
      error: 'Klaida'
    },
    // Pažanga
    progress: {
      success: 'Sėkmė',
      exception: 'Išimtis',
      warning: 'Perspėjimas'
    },
    // Skeletas
    skeleton: {
      loading: 'Įkeliama...'
    },
    // Tuščia
    empty: {
      description: 'Nėra duomenų',
      noData: 'Nėra duomenų',
      noResult: 'Nėra rezultatų',
      networkError: 'Tinklo klaida',
      serverError: 'Serverio klaida'
    },
    // Rezultatas
    result: {
      success: 'Sėkmė',
      error: 'Klaida',
      warning: 'Perspėjimas',
      info: 'Informacija',
      backHome: 'Grįžti į pagrindinį puslapį'
    },
    // Krioklys
    waterfall: {
      loading: 'Įkeliama...',
      noMore: 'Daugiau duomenų nėra',
      empty: 'Nėra duomenų'
    },
    // Aprašymai
    descriptions: {
      colon: ':'
    },
    // Slankiklis
    slider: {
      tipFormatter: '{value}'
    },
    // Perjungiklis
    switch: {
      on: 'ĮJUNGTAS',
      off: 'IŠJUNGTAS'
    },
    // Pažymėjimo langelis
    checkbox: {
      selectAll: 'Pasirinkti viską'
    },
    // Radijas
    radio: {},
    // Meniu
    menu: {
      collapse: 'Suskleisti meniu',
      expand: 'Išplėsti meniu'
    },
    // Kortelė
    card: {
      collapse: 'Suskleisti',
      expand: 'Išplėsti'
    },
    // Suskleidimas
    collapse: {
      expand: 'Išplėsti',
      collapse: 'Suskleisti'
    },
    // Patarimas
    tooltip: {},
    // Iššokantis langas
    popover: {},
    // Ženklelis
    badge: {},
    // Avataras
    avatar: {
      error: 'Įkėlimas nepavyko'
    },
    // Vandens ženklas
    watermark: {},
    // Skirtukas
    divider: {},
    // Karuselė
    carousel: {
      prev: 'Ankstesnis',
      next: 'Kitas'
    },
    // Marquee
    marquee: {},
    // Pritvirtinimas
    affix: {},
    // Inkaras
    anchor: {}
  }
}

export default lt
