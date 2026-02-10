import type { Language } from '../index'

export const eo: Language = {
  name: 'eo',
  yh: {
    // Komuna
    common: {
      yes: 'Jes',
      no: 'Ne',
      confirm: 'Konfirmi',
      cancel: 'Nuligi',
      loading: 'Ŝarĝado',
      close: 'Fermi',
      clear: 'Malplenigi',
      reset: 'Restarigi',
      save: 'Konservi',
      delete: 'Forigi',
      edit: 'Redakti',
      add: 'Aldoni',
      search: 'Serĉi',
      refresh: 'Refreŝigi',
      expand: 'Etendi',
      collapse: 'Faldi',
      more: 'Pli',
      noData: 'Neniu datumaro',
      noMatch: 'Neniu kongruo',
      selectAll: 'Elekti ĉion',
      unselectAll: 'Malplenigi elekton'
    },
    // Kolorselektilo
    colorpicker: {
      confirm: 'Bone',
      clear: 'Malplenigi',
      eyeDropper: 'Okulŝovilo',
      suggestionDark: 'Blanka teksto estas plej bona',
      suggestionLight: 'Nigra teksto estas plej bona',
      recentColors: 'Lastaj koloroj',
      presetColors: 'Antaŭdifinitaj koloroj'
    },
    // Datoselektilo
    datepicker: {
      now: 'Nun',
      today: 'Hodiaŭ',
      cancel: 'Nuligi',
      clear: 'Malplenigi',
      confirm: 'Bone',
      selectDate: 'Elekti daton',
      selectTime: 'Elekti tempon',
      startDate: 'Komenca dato',
      startTime: 'Komenca tempo',
      endDate: 'Fina dato',
      endTime: 'Fina tempo',
      year: '',
      month: '',
      day: '',
      week: 'Semajno',
      monthBeforeYear: true,
      prevYear: 'Antaŭa jaro',
      nextYear: 'Sekva jaro',
      prevMonth: 'Antaŭa monato',
      nextMonth: 'Sekva monato',
      weeks: {
        sun: 'Dim',
        mon: 'Lun',
        tue: 'Mar',
        wed: 'Mer',
        thu: 'Ĵaŭ',
        fri: 'Ven',
        sat: 'Sab'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'Maj',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aŭg',
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
    // Temposelektilo
    timepicker: {
      confirm: 'Bone',
      cancel: 'Nuligi',
      now: 'Nun',
      placeholder: 'Elekti tempon',
      startPlaceholder: 'Komenca tempo',
      endPlaceholder: 'Fina tempo',
      selectTime: 'Elekti tempon'
    },
    // Tempoelekto
    timeselect: {
      placeholder: 'Elekti tempon'
    },
    // Arbo
    tree: {
      emptyText: 'Neniu datumaro',
      loading: 'Ŝarĝado...',
      checkAll: 'Elekti ĉion',
      uncheckAll: 'Malplenigi elekton',
      expandAll: 'Etendi ĉion',
      collapseAll: 'Faldi ĉion'
    },
    // Arboselekto
    treeselect: {
      placeholder: 'Elekti',
      emptyText: 'Neniu datumaro',
      loading: 'Ŝarĝado...',
      noMatch: 'Neniu kongruo'
    },
    // Kalendaro
    calendar: {
      prevMonth: 'Antaŭa monato',
      nextMonth: 'Sekva monato',
      prevYear: 'Antaŭa jaro',
      nextYear: 'Sekva jaro',
      today: 'Hodiaŭ',
      week: 'Semajno',
      holiday: 'Festo',
      workday: 'Laboro',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Dim',
        mon: 'Lun',
        tue: 'Mar',
        wed: 'Mer',
        thu: 'Ĵaŭ',
        fri: 'Ven',
        sat: 'Sab'
      }
    },
    // Aŭtomata kompletigo
    autocomplete: {
      loading: 'Ŝarĝado...',
      placeholder: 'Bonvolu enigi',
      noData: 'Neniu datumaro',
      noMatch: 'Neniu kongruo'
    },
    // Malantaŭen kalkulo
    countdown: {
      days: 'tagoj',
      hours: 'horoj',
      minutes: 'minutoj',
      seconds: 'sekundoj',
      milliseconds: 'milisekundoj',
      finished: 'Finita'
    },
    // Kaskada selektilo
    cascader: {
      noMatch: 'Neniu kongruo',
      placeholder: 'Elekti',
      loading: 'Ŝarĝado...',
      noData: 'Neniu datumaro'
    },
    // Transigo
    transfer: {
      noMatch: 'Neniu kongruo',
      noData: 'Neniu datumaro',
      titles: ['Listo 1', 'Listo 2'],
      filterPlaceholder: 'Enigi ŝlosilvorton',
      noCheckedFormat: '{total} eroj',
      hasCheckedFormat: '{checked}/{total} elektitaj',
      searchPlaceholder: 'Enigi ŝlosilvorton'
    },
    // Tabelo
    table: {
      emptyText: 'Neniu datumaro',
      confirmFilter: 'Konfirmi',
      resetFilter: 'Restarigi',
      clearFilter: 'Ĉio',
      sumText: 'Sumo',
      loading: 'Ŝarĝado...',
      index: 'Indekso',
      print: 'Presi',
      cancel: 'Nuligi',
      preview: 'Presanta antaŭrigardo',
      printTime: 'Presanta tempo',
      total: 'Totalo {total} eroj',
      page: 'Paĝo {page}',
      yes: 'Jes',
      no: 'Ne',
      // Ilobreto
      toolbar: {
        refresh: 'Refreŝigi',
        density: 'Denseco',
        densityDefault: 'Defaŭlta',
        densityLarge: 'Granda',
        densitySmall: 'Malgranda',
        columnSetting: 'Kolumno agordoj',
        fullscreen: 'Plena ekrano',
        exitFullscreen: 'Eliri plenan ekranon',
        export: 'Eksporti',
        import: 'Importi',
        search: 'Serĉi',
        searchPlaceholder: 'Enigi ŝlosilvortojn por serĉi'
      },
      // Filtrilo
      filter: {
        selectAll: 'Elekti ĉion',
        selectInvert: 'Inversigi elekton',
        empty: 'Estas malplena',
        notEmpty: 'Ne estas malplena',
        contains: 'Enhavas',
        notContains: 'Ne enhavas',
        equals: 'Egalas',
        notEquals: 'Ne egalas',
        startsWith: 'Komencas per',
        endsWith: 'Finiĝas per',
        greaterThan: 'Pli granda ol',
        lessThan: 'Pli malgranda ol',
        between: 'Inter'
      },
      // Ordigi
      sort: {
        asc: 'Kreskanta',
        desc: 'Malkreskanta',
        clear: 'Malplenigi ordigon'
      },
      // Eksporti
      export: {
        title: 'Eksporti datumaron',
        filename: 'Dosiernomo',
        type: 'Dosiertipo',
        scope: 'Eksporta amplekso',
        scopeAll: 'Ĉiu datumaro',
        scopeSelected: 'Elektita datumaro',
        scopeCurrentPage: 'Nuna paĝo',
        includeHeader: 'Inkluzivi kapon',
        exporting: 'Eksportado...',
        success: 'Eksporto sukcesis',
        error: 'Eksporto malsukcesis'
      },
      // Importi
      import: {
        title: 'Importi datumaron',
        selectFile: 'Elekti dosieron',
        dragTip: 'Klaku aŭ trenu dosieron ĉi tien por alŝuti',
        importing: 'Importado...',
        success: 'Importo sukcesis',
        error: 'Importo malsukcesis',
        preview: 'Datumara antaŭrigardo',
        confirm: 'Konfirmi importon'
      },
      // Presi
      printConfig: {
        title: 'Presaj agordoj',
        pageTitle: 'Paĝa titolo',
        pageHeader: 'Kapo',
        pageFooter: 'Piedo',
        printAll: 'Presi ĉion',
        printSelected: 'Presi elektitan',
        printCurrentPage: 'Presi nunan paĝon',
        landscape: 'Horizontala',
        portrait: 'Vertikala',
        printing: 'Presado...'
      },
      // Kolumno agordoj
      columnSetting: {
        title: 'Kolumno agordoj',
        showAll: 'Montri ĉion',
        hideAll: 'Kaŝi ĉion',
        reset: 'Restarigi',
        fixedLeft: 'Fiksi maldekstren',
        fixedRight: 'Fiksi dekstren',
        unfixed: 'Malplenigi fikson'
      },
      // Kunteksta menuo
      contextMenu: {
        copy: 'Kopii',
        copyRow: 'Kopii vicon',
        copyCell: 'Kopii ĉelon',
        paste: 'Alglui',
        insertRowAbove: 'Enmeti vicon supre',
        insertRowBelow: 'Enmeti vicon sube',
        deleteRow: 'Forigi vicon',
        deleteSelectedRows: 'Forigi elektitajn vicojn',
        exportSelected: 'Eksporti elektitan'
      },
      // Elekto
      selection: {
        selectAll: 'Elekti ĉion',
        selectInvert: 'Inversigi elekton',
        selectNone: 'Malplenigi elekton',
        selected: '{count} eroj elektitaj'
      },
      // Etendi
      expand: {
        expandAll: 'Etendi ĉion',
        collapseAll: 'Faldi ĉion'
      },
      // Arbo
      tree: {
        expandAll: 'Etendi ĉion',
        collapseAll: 'Faldi ĉion',
        expandLevel: 'Etendi al nivelo {level}'
      },
      // Treni
      drag: {
        dragTip: 'Treni por reordigi',
        dropTip: 'Demeti por meti'
      }
    },
    // Mesaĝa skatolo
    messagebox: {
      title: 'Mesaĝo',
      confirm: 'Bone',
      cancel: 'Nuligi',
      close: 'Fermi',
      error: 'Nekonforma enigo',
      alert: 'Averto',
      prompt: 'Peti',
      inputPlaceholder: 'Bonvolu enigi'
    },
    // Alŝuti
    upload: {
      deleteTip: 'premu delete por forigi',
      delete: 'Forigi',
      preview: 'Antaŭrigardo',
      continue: 'Daŭrigi',
      upload: 'Klaku por alŝuti',
      tip: 'Klaku aŭ trenu dosieron al ĉi tiu areo por <em>alŝuti</em>',
      dragTip: 'Demetu dosieron ĉi tien aŭ klaku por alŝuti',
      uploading: 'Alŝutado...',
      success: 'Alŝuto sukcesis',
      error: 'Alŝuto malsukcesis',
      retry: 'Reprovi',
      cancel: 'Nuligi alŝuton',
      fileTypeError: 'Dosiertipo ne estas subtenata',
      fileSizeError: 'Dosiergrando superas limon',
      fileCountError: 'Dosiernombro superas limon'
    },
    // Formularo
    form: {
      validationFailed: 'Validado malsukcesis',
      required: 'Postulata',
      pleaseInput: 'Bonvolu enigi',
      pleaseSelect: 'Bonvolu elekti'
    },
    // Butono
    button: {
      loading: 'Ŝarĝado...'
    },
    // Enigo
    input: {
      placeholder: 'Bonvolu enigi',
      clear: 'Malplenigi',
      showPassword: 'Montri pasvorton',
      hidePassword: 'Kaŝi pasvorton',
      copy: 'Kopii',
      copied: 'Kopiita'
    },
    // Nombra enigo
    inputnumber: {
      placeholder: 'Bonvolu enigi nombron',
      increase: 'Pliigi',
      decrease: 'Malpliigi'
    },
    // Etikeda enigo
    inputtag: {
      placeholder: 'Bonvolu enigi',
      add: 'Aldoni',
      remove: 'Forigi'
    },
    // Panero
    breadcrumb: {
      label: 'Panero',
      more: 'Pli'
    },
    // Reen supre
    backtop: {
      text: 'Reen supre'
    },
    // Selektilo
    select: {
      placeholder: 'Bonvolu elekti',
      noData: 'Neniu datumaro',
      loading: 'Ŝarĝado...',
      noMatch: 'Neniu kongruo',
      selectAll: 'Elekti ĉion',
      clearAll: 'Malplenigi ĉion'
    },
    // Paĝigo
    pagination: {
      goto: 'Iri al',
      page: '',
      total: 'Totalo {total}',
      pageSize: '/paĝo',
      prev: 'Antaŭa',
      next: 'Sekva',
      first: 'Unua',
      last: 'Lasta',
      pageClassifier: ''
    },
    // Popkonfirmo
    popconfirm: {
      confirm: 'Bone',
      cancel: 'Nuligi',
      dontAskAgain: 'Ne demandi denove'
    },
    // Dialogo
    dialog: {
      confirm: 'Bone',
      cancel: 'Nuligi',
      close: 'Fermi',
      maximize: 'Maksimumigi',
      restore: 'Restaŭri'
    },
    // Tirkesto
    drawer: {
      close: 'Fermi',
      confirm: 'Bone',
      cancel: 'Nuligi'
    },
    // Falmenuo
    dropdown: {
      loading: 'Ŝarĝado...'
    },
    // Bildo
    image: {
      error: 'MALSUKCESIS',
      loading: 'Ŝarĝado...',
      preview: 'Antaŭrigardo',
      zoomIn: 'Zomi enen',
      zoomOut: 'Zomi eksteren',
      rotateLeft: 'Rotacii maldekstren',
      rotateRight: 'Rotacii dekstren',
      originalSize: 'Originala grandeco',
      fullscreen: 'Plena ekrano'
    },
    // Bilda spektanto
    imageviewer: {
      close: 'Fermi',
      prev: 'Antaŭa',
      next: 'Sekva',
      zoomIn: 'Zomi enen',
      zoomOut: 'Zomi eksteren',
      rotateLeft: 'Rotacii maldekstren',
      rotateRight: 'Rotacii dekstren',
      reset: 'Restarigi',
      fullscreen: 'Plena ekrano',
      exitFullscreen: 'Eliri plenan ekranon'
    },
    // Senfina rulumado
    infinitescroll: {
      loading: 'Ŝarĝado...',
      finished: 'Neniu plia datumaro',
      error: 'Ŝarĝado malsukcesis, klaku por reprovi',
      retry: 'Klaku por reprovi'
    },
    // Mesaĝo
    message: {
      close: 'Fermi'
    },
    // Sciigo
    notification: {
      close: 'Fermi'
    },
    // Ŝarĝado
    loading: {
      text: 'Ŝarĝado...'
    },
    // Spino
    spin: {
      text: 'Ŝarĝado...'
    },
    // Takso
    rate: {
      texts: ['Ekstreme malbona', 'Seniluziiĝinta', 'Justa', 'Kontenta', 'Surprizita']
    },
    // Averto
    alert: {
      close: 'Fermi'
    },
    // Etikedo
    tag: {
      close: 'Fermi'
    },
    // Langetoj
    tabs: {
      close: 'Fermi',
      add: 'Aldoni',
      more: 'Pli'
    },
    // Paŝoj
    steps: {
      finish: 'Finita',
      process: 'En progreso',
      wait: 'Atendante',
      error: 'Eraro'
    },
    // Progreso
    progress: {
      success: 'Sukceso',
      exception: 'Escepto',
      warning: 'Averto'
    },
    // Skeletono
    skeleton: {
      loading: 'Ŝarĝado...'
    },
    // Malplena
    empty: {
      description: 'Neniu datumaro',
      noData: 'Neniu datumaro',
      noResult: 'Neniu rezulto',
      networkError: 'Reta eraro',
      serverError: 'Servila eraro'
    },
    // Rezulto
    result: {
      success: 'Sukceso',
      error: 'Eraro',
      warning: 'Averto',
      info: 'Informo',
      backHome: 'Reen al hejmo'
    },
    // Akvofalo
    waterfall: {
      loading: 'Ŝarĝado...',
      noMore: 'Neniu plia datumaro',
      empty: 'Neniu datumaro'
    },
    // Priskriboj
    descriptions: {
      colon: ':'
    },
    // Glitilo
    slider: {
      tipFormatter: '{value}'
    },
    // Ŝaltilo
    switch: {
      on: 'ŜALTITA',
      off: 'MALŜALTITA'
    },
    // Markobutono
    checkbox: {
      selectAll: 'Elekti ĉion'
    },
    // Radio
    radio: {},
    // Menuo
    menu: {
      collapse: 'Faldi menuon',
      expand: 'Etendi menuon'
    },
    // Karto
    card: {
      collapse: 'Faldi',
      expand: 'Etendi'
    },
    // Faldi
    collapse: {
      expand: 'Etendi',
      collapse: 'Faldi'
    },
    // Konsilo
    tooltip: {},
    // Popover
    popover: {},
    // Emblemo
    badge: {},
    // Avataro
    avatar: {
      error: 'Ŝarĝado malsukcesis'
    },
    // Akvomarko
    watermark: {},
    // Dividilo
    divider: {},
    // Karuselo
    carousel: {
      prev: 'Antaŭa',
      next: 'Sekva'
    },
    // Marqueo
    marquee: {},
    // Afikso
    affix: {},
    // Ankro
    anchor: {}
  }
}

export default eo
