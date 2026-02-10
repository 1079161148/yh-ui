import type { Language } from '../index'

export const mg: Language = {
  name: 'mg',
  yh: {
    // Fitsipika
    common: {
      yes: 'Eny',
      no: 'Tsia',
      confirm: 'Manamarina',
      cancel: 'Atsahatra',
      loading: 'Ampidirina',
      close: 'Akatona',
      clear: 'Fafana',
      reset: 'Averina',
      save: 'Tehirizina',
      delete: 'Fafana',
      edit: 'Ovaina',
      add: 'Ampidirina',
      search: 'Karohina',
      refresh: 'Averina',
      expand: 'Ampitomboina',
      collapse: 'Ahena',
      more: 'Bebe kokoa',
      noData: 'Tsy misy angona',
      noMatch: 'Tsy misy angona mifanaraka',
      selectAll: 'Misafidy ny rehetra',
      unselectAll: 'Manafoana ny safidy rehetra'
    },
    // Mpanoratra loko
    colorpicker: {
      confirm: 'OK',
      clear: 'Fafana',
      eyeDropper: 'Mpanoratra loko',
      suggestionDark: 'Ny soratra fotsy no tsara indrindra',
      suggestionLight: 'Ny soratra mainty no tsara indrindra',
      recentColors: 'Loko vao haingana',
      presetColors: 'Loko voafaritra mialoha'
    },
    // Mpanoratra daty
    datepicker: {
      now: 'Amin\'izao fotoana izao',
      today: 'Androany',
      cancel: 'Atsahatra',
      clear: 'Fafana',
      confirm: 'OK',
      selectDate: 'Misafidy daty',
      selectTime: 'Misafidy fotoana',
      startDate: 'Daty fanombohana',
      startTime: 'Fotoana fanombohana',
      endDate: 'Daty fiafarana',
      endTime: 'Fotoana fiafarana',
      year: '',
      month: '',
      day: '',
      week: 'Herinandro',
      monthBeforeYear: true,
      prevYear: 'Taona teo aloha',
      nextYear: 'Taona manaraka',
      prevMonth: 'Volana teo aloha',
      nextMonth: 'Volana manaraka',
      weeks: {
        sun: 'Alahady',
        mon: 'Alatsinainy',
        tue: 'Talata',
        wed: 'Alarobia',
        thu: 'Alakamisy',
        fri: 'Zoma',
        sat: 'Sabotsy'
      },
      months: {
        jan: 'Janoary',
        feb: 'Febroary',
        mar: 'Martsa',
        apr: 'Aprily',
        may: 'Mey',
        jun: 'Jona',
        jul: 'Jolay',
        aug: 'Aogositra',
        sep: 'Septambra',
        oct: 'Oktobra',
        nov: 'Novambra',
        dec: 'Desambra'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Mpanoratra fotoana
    timepicker: {
      confirm: 'OK',
      cancel: 'Atsahatra',
      now: 'Amin\'izao fotoana izao',
      placeholder: 'Misafidy fotoana',
      startPlaceholder: 'Fotoana fanombohana',
      endPlaceholder: 'Fotoana fiafarana',
      selectTime: 'Misafidy fotoana'
    },
    // Fidirana fotoana
    timeselect: {
      placeholder: 'Misafidy fotoana'
    },
    // Hazo
    tree: {
      emptyText: 'Tsy misy angona',
      loading: 'Ampidirina...',
      checkAll: 'Mamantatra ny rehetra',
      uncheckAll: 'Manafoana ny famantarana rehetra',
      expandAll: 'Ampitomboina ny rehetra',
      collapseAll: 'Ahena ny rehetra'
    },
    // Fidirana hazo
    treeselect: {
      placeholder: 'Misafidy',
      emptyText: 'Tsy misy angona',
      loading: 'Ampidirina...',
      noMatch: 'Tsy misy angona mifanaraka'
    },
    // Kalandrie
    calendar: {
      prevMonth: 'Volana teo aloha',
      nextMonth: 'Volana manaraka',
      prevYear: 'Taona teo aloha',
      nextYear: 'Taona manaraka',
      today: 'Androany',
      week: 'Herinandro',
      holiday: 'Fety',
      workday: 'Asa',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Alahady',
        mon: 'Alatsinainy',
        tue: 'Talata',
        wed: 'Alarobia',
        thu: 'Alakamisy',
        fri: 'Zoma',
        sat: 'Sabotsy'
      }
    },
    // Fenoana ho azy
    autocomplete: {
      loading: 'Ampidirina...',
      placeholder: 'Ampidiro azafady',
      noData: 'Tsy misy angona',
      noMatch: 'Tsy misy angona mifanaraka'
    },
    // Fampidirana miverina
    countdown: {
      days: 'andro',
      hours: 'ora',
      minutes: 'minitra',
      seconds: 'segondra',
      milliseconds: 'milisegondra',
      finished: 'Vita'
    },
    // Mpanoratra cascade
    cascader: {
      noMatch: 'Tsy misy angona mifanaraka',
      placeholder: 'Misafidy',
      loading: 'Ampidirina...',
      noData: 'Tsy misy angona'
    },
    // Fampitana
    transfer: {
      noMatch: 'Tsy misy angona mifanaraka',
      noData: 'Tsy misy angona',
      titles: ['Lisitra 1', 'Lisitra 2'],
      filterPlaceholder: 'Ampidiro teny fanalahidy',
      noCheckedFormat: '{total} zavatra',
      hasCheckedFormat: '{checked}/{total} voafantina',
      searchPlaceholder: 'Ampidiro teny fanalahidy'
    },
    // Tabilao
    table: {
      emptyText: 'Tsy misy angona',
      confirmFilter: 'Manamarina',
      resetFilter: 'Averina',
      clearFilter: 'Rehetra',
      sumText: 'Fitambaran\'ny',
      loading: 'Ampidirina...',
      index: 'Fampidirana',
      print: 'Fampirinty',
      cancel: 'Atsahatra',
      preview: 'Fijerena mialoha ny fampirinty',
      printTime: 'Fotoana fampirinty',
      total: 'Fitambaran\'ny {total} zavatra',
      page: 'Pejy {page}',
      yes: 'Eny',
      no: 'Tsia',
      // Toolbar
      toolbar: {
        refresh: 'Averina',
        density: 'Habe',
        densityDefault: 'Voalohany',
        densityLarge: 'Lehibe',
        densitySmall: 'Kely',
        columnSetting: 'Fikiraketana tsanganana',
        fullscreen: 'Efijery feno',
        exitFullscreen: 'Mivoaka amin\'ny efijery feno',
        export: 'Famoahana',
        import: 'Fampidirana',
        search: 'Karohina',
        searchPlaceholder: 'Ampidiro teny fanalahidy karohina'
      },
      // Filter
      filter: {
        selectAll: 'Misafidy ny rehetra',
        selectInvert: 'Averina ny safidy',
        empty: 'Foana',
        notEmpty: 'Tsy foana',
        contains: 'Misy',
        notContains: 'Tsy misy',
        equals: 'Mitovy',
        notEquals: 'Tsy mitovy',
        startsWith: 'Manomboka amin\'ny',
        endsWith: 'Miafara amin\'ny',
        greaterThan: 'Lehibe kokoa noho',
        lessThan: 'Kely kokoa noho',
        between: 'Eo anelanelan\'ny'
      },
      // Sort
      sort: {
        asc: 'Miakatra',
        desc: 'Midina',
        clear: 'Fafana ny sort'
      },
      // Export
      export: {
        title: 'Export angona',
        filename: 'Anaran\'ny rakitra',
        type: 'Karazana rakitra',
        scope: 'Fampidirana export',
        scopeAll: 'Angona rehetra',
        scopeSelected: 'Angona voafantina',
        scopeCurrentPage: 'Pejy ankehitriny',
        includeHeader: 'Ampidiro lohateny',
        exporting: 'Export...',
        success: 'Export nahomby',
        error: 'Export tsy nahomby'
      },
      // Import
      import: {
        title: 'Import angona',
        selectFile: 'Misafidy rakitra',
        dragTip: 'Tsindrio na sinty rakitra eto ho ampitondraina',
        importing: 'Import...',
        success: 'Import nahomby',
        error: 'Import tsy nahomby',
        preview: 'Fijerena mialoha ny angona',
        confirm: 'Manamarina ny import'
      },
      // Print
      printConfig: {
        title: 'Fikiraketana fampirinty',
        pageTitle: 'Lohatenin\'ny pejy',
        pageHeader: 'Lohateny',
        pageFooter: 'Tongotra',
        printAll: 'Fampirinty ny rehetra',
        printSelected: 'Fampirinty voafantina',
        printCurrentPage: 'Fampirinty ny pejy ankehitriny',
        landscape: 'Ampahany',
        portrait: 'Mitsangana',
        printing: 'Fampirinty...'
      },
      // Column Settings
      columnSetting: {
        title: 'Fikiraketana tsanganana',
        showAll: 'Asehoy ny rehetra',
        hideAll: 'Afeno ny rehetra',
        reset: 'Averina',
        fixedLeft: 'Mametraka amin\'ny ankavia',
        fixedRight: 'Mametraka amin\'ny ankavanana',
        unfixed: 'Manafoana ny fametrahana'
      },
      // Context Menu
      contextMenu: {
        copy: 'Nakopy',
        copyRow: 'Nakopy ny tsanganana',
        copyCell: 'Nakopy ny sela',
        paste: 'Nampiditra',
        insertRowAbove: 'Mampiditra tsanganana eo ambony',
        insertRowBelow: 'Mampiditra tsanganana eo ambany',
        deleteRow: 'Fafana ny tsanganana',
        deleteSelectedRows: 'Fafana ny tsanganana voafantina',
        exportSelected: 'Export voafantina'
      },
      // Selection
      selection: {
        selectAll: 'Misafidy ny rehetra',
        selectInvert: 'Averina ny safidy',
        selectNone: 'Fafana ny safidy',
        selected: '{count} zavatra voafantina'
      },
      // Expand
      expand: {
        expandAll: 'Ampitomboina ny rehetra',
        collapseAll: 'Ahena ny rehetra'
      },
      // Tree
      tree: {
        expandAll: 'Ampitomboina ny rehetra',
        collapseAll: 'Ahena ny rehetra',
        expandLevel: 'Ampitomboina amin\'ny ambaratonga {level}'
      },
      // Drag
      drag: {
        dragTip: 'Sinty mba hanova ny filaharana',
        dropTip: 'Avelao mba hametraka'
      }
    },
    // Message Box
    messagebox: {
      title: 'Hafatra',
      confirm: 'OK',
      cancel: 'Atsahatra',
      close: 'Akatona',
      error: 'Fidirana tsy ara-dalàna',
      alert: 'Fampitandremana',
      prompt: 'Fampitandremana',
      inputPlaceholder: 'Ampidiro azafady'
    },
    // Upload
    upload: {
      deleteTip: 'tsindrio delete mba hanafoana',
      delete: 'Fafana',
      preview: 'Fijerena mialoha',
      continue: 'Manohy',
      upload: 'Tsindrio mba hampitondraina',
      tip: 'Tsindrio na sinty rakitra amin\'ity faritra ity mba <em>hampitondraina</em>',
      dragTip: 'Avelao rakitra eto na tsindrio mba hampitondraina',
      uploading: 'Ampitondraina...',
      success: 'Fampitondraina nahomby',
      error: 'Fampitondraina tsy nahomby',
      retry: 'Andramana indray',
      cancel: 'Atsahatra ny fampitondraina',
      fileTypeError: 'Karazana rakitra tsy voarohirohy',
      fileSizeError: 'Habe rakitra mihoatra ny fetra',
      fileCountError: 'Isan\'ny rakitra mihoatra ny fetra'
    },
    // Form
    form: {
      validationFailed: 'Fanamarinana tsy nahomby',
      required: 'Ilaina',
      pleaseInput: 'Ampidiro azafady',
      pleaseSelect: 'Safidio azafady'
    },
    // Button
    button: {
      loading: 'Ampidirina...'
    },
    // Input
    input: {
      placeholder: 'Ampidiro azafady',
      clear: 'Fafana',
      showPassword: 'Asehoy ny tenimiafina',
      hidePassword: 'Afeno ny tenimiafina',
      copy: 'Nakopy',
      copied: 'Nakopy'
    },
    // Input Number
    inputnumber: {
      placeholder: 'Ampidiro isa azafady',
      increase: 'Ampitomboina',
      decrease: 'Ahena'
    },
    // Input Tag
    inputtag: {
      placeholder: 'Ampidiro azafady',
      add: 'Ampidirina',
      remove: 'Esorina'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Lalana',
      more: 'Bebe kokoa'
    },
    // Back Top
    backtop: {
      text: 'Miverina any ambony'
    },
    // Select
    select: {
      placeholder: 'Safidio azafady',
      noData: 'Tsy misy angona',
      loading: 'Ampidirina...',
      noMatch: 'Tsy misy angona mifanaraka',
      selectAll: 'Misafidy ny rehetra',
      clearAll: 'Fafana ny rehetra'
    },
    // Pagination
    pagination: {
      goto: 'Mandeha',
      page: '',
      total: 'Fitambaran\'ny {total}',
      pageSize: '/pejy',
      prev: 'Teo aloha',
      next: 'Manaraka',
      first: 'Voalohany',
      last: 'Farany',
      pageClassifier: ''
    },
    // Popconfirm
    popconfirm: {
      confirm: 'OK',
      cancel: 'Atsahatra',
      dontAskAgain: 'Aza manontany indray'
    },
    // Dialog
    dialog: {
      confirm: 'OK',
      cancel: 'Atsahatra',
      close: 'Akatona',
      maximize: 'Ampitomboina',
      restore: 'Averina'
    },
    // Drawer
    drawer: {
      close: 'Akatona',
      confirm: 'OK',
      cancel: 'Atsahatra'
    },
    // Dropdown
    dropdown: {
      loading: 'Ampidirina...'
    },
    // Image
    image: {
      error: 'TSY NAHOMBY',
      loading: 'Ampidirina...',
      preview: 'Fijerena mialoha',
      zoomIn: 'Ampitomboina',
      zoomOut: 'Ahena',
      rotateLeft: 'Averina miankavia',
      rotateRight: 'Averina miankavanana',
      originalSize: 'Habe tany am-boalohany',
      fullscreen: 'Efijery feno'
    },
    // Image Viewer
    imageviewer: {
      close: 'Akatona',
      prev: 'Teo aloha',
      next: 'Manaraka',
      zoomIn: 'Ampitomboina',
      zoomOut: 'Ahena',
      rotateLeft: 'Averina miankavia',
      rotateRight: 'Averina miankavanana',
      reset: 'Averina',
      fullscreen: 'Efijery feno',
      exitFullscreen: 'Mivoaka amin\'ny efijery feno'
    },
    // Infinite Scroll
    infinitescroll: {
      loading: 'Ampidirina...',
      finished: 'Tsy misy angona intsony',
      error: 'Fampidirana tsy nahomby, tsindrio mba handramana indray',
      retry: 'Tsindrio mba handramana indray'
    },
    // Message
    message: {
      close: 'Akatona'
    },
    // Notification
    notification: {
      close: 'Akatona'
    },
    // Loading
    loading: {
      text: 'Ampidirina...'
    },
    // Spin
    spin: {
      text: 'Ampidirina...'
    },
    // Rate
    rate: {
      texts: ['Ratsy be', 'Diso fanantenana', 'Mahitsy', 'Afaka', 'Gaga']
    },
    // Alert
    alert: {
      close: 'Akatona'
    },
    // Tag
    tag: {
      close: 'Akatona'
    },
    // Tabs
    tabs: {
      close: 'Akatona',
      add: 'Ampidirina',
      more: 'Bebe kokoa'
    },
    // Steps
    steps: {
      finish: 'Vita',
      process: 'Mandeha',
      wait: 'Miandry',
      error: 'Fahadisoana'
    },
    // Progress
    progress: {
      success: 'Nahomby',
      exception: 'Tsy ara-dalàna',
      warning: 'Fampitandremana'
    },
    // Skeleton
    skeleton: {
      loading: 'Ampidirina...'
    },
    // Empty
    empty: {
      description: 'Tsy misy angona',
      noData: 'Tsy misy angona',
      noResult: 'Tsy misy vokatra',
      networkError: 'Fahadisoana tambajotra',
      serverError: 'Fahadisoana server'
    },
    // Result
    result: {
      success: 'Nahomby',
      error: 'Fahadisoana',
      warning: 'Fampitandremana',
      info: 'Fampahalalana',
      backHome: 'Miverina any an-tranony'
    },
    // Waterfall
    waterfall: {
      loading: 'Ampidirina...',
      noMore: 'Tsy misy angona intsony',
      empty: 'Tsy misy angona'
    },
    // Descriptions
    descriptions: {
      colon: ':'
    },
    // Slider
    slider: {
      tipFormatter: '{value}'
    },
    // Switch
    switch: {
      on: 'ON',
      off: 'OFF'
    },
    // Checkbox
    checkbox: {
      selectAll: 'Misafidy ny rehetra'
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: 'Ahena ny menu',
      expand: 'Ampitomboina ny menu'
    },
    // Card
    card: {
      collapse: 'Ahena',
      expand: 'Ampitomboina'
    },
    // Collapse
    collapse: {
      expand: 'Ampitomboina',
      collapse: 'Ahena'
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: 'Fampidirana tsy nahomby'
    },
    // Watermark
    watermark: {},
    // Divider
    divider: {},
    // Carousel
    carousel: {
      prev: 'Teo aloha',
      next: 'Manaraka'
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Anchor
    anchor: {}
  }
}

export default mg
