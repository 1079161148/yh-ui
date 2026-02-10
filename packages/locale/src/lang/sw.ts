import type { Language } from '../index'

export const sw: Language = {
  name: 'sw',
  yh: {
    // Jumla
    common: {
      yes: 'Ndiyo',
      no: 'Hapana',
      confirm: 'Thibitisha',
      cancel: 'Ghairi',
      loading: 'Inapakia',
      close: 'Funga',
      clear: 'Futa',
      reset: 'Weka upya',
      save: 'Hifadhi',
      delete: 'Futa',
      edit: 'Hariri',
      add: 'Ongeza',
      search: 'Tafuta',
      refresh: 'Onyesha upya',
      expand: 'Panua',
      collapse: 'Funga',
      more: 'Zaidi',
      noData: 'Hakuna data',
      noMatch: 'Hakuna data inayofanana',
      selectAll: 'Chagua zote',
      unselectAll: 'Ondoa uteuzi wote'
    },
    // Kichagua rangi
    colorpicker: {
      confirm: 'Sawa',
      clear: 'Futa',
      eyeDropper: 'Kichorongo cha jicho',
      suggestionDark: 'Nakala nyeupe ni bora',
      suggestionLight: 'Nakala nyeusi ni bora',
      recentColors: 'Rangi za hivi karibuni',
      presetColors: 'Rangi zilizowekwa awali'
    },
    // Kichagua tarehe
    datepicker: {
      now: 'Sasa',
      today: 'Leo',
      cancel: 'Ghairi',
      clear: 'Futa',
      confirm: 'Sawa',
      selectDate: 'Chagua tarehe',
      selectTime: 'Chagua muda',
      startDate: 'Tarehe ya kuanza',
      startTime: 'Muda wa kuanza',
      endDate: 'Tarehe ya mwisho',
      endTime: 'Muda wa mwisho',
      year: '',
      month: '',
      day: '',
      week: 'Wiki',
      monthBeforeYear: true,
      prevYear: 'Mwaka uliopita',
      nextYear: 'Mwaka ujao',
      prevMonth: 'Mwezi uliopita',
      nextMonth: 'Mwezi ujao',
      weeks: {
        sun: 'Jumapili',
        mon: 'Jumatatu',
        tue: 'Jumanne',
        wed: 'Jumatano',
        thu: 'Alhamisi',
        fri: 'Ijumaa',
        sat: 'Jumamosi'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mac',
        apr: 'Apr',
        may: 'Mei',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Ago',
        sep: 'Sep',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Des'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Kichagua muda
    timepicker: {
      confirm: 'Sawa',
      cancel: 'Ghairi',
      now: 'Sasa',
      placeholder: 'Chagua muda',
      startPlaceholder: 'Muda wa kuanza',
      endPlaceholder: 'Muda wa mwisho',
      selectTime: 'Chagua muda'
    },
    // Uchaguzi wa muda
    timeselect: {
      placeholder: 'Chagua muda'
    },
    // Mti
    tree: {
      emptyText: 'Hakuna data',
      loading: 'Inapakia...',
      checkAll: 'Angalia zote',
      uncheckAll: 'Ondoa uangalizi wote',
      expandAll: 'Panua zote',
      collapseAll: 'Funga zote'
    },
    // Uchaguzi wa mti
    treeselect: {
      placeholder: 'Chagua',
      emptyText: 'Hakuna data',
      loading: 'Inapakia...',
      noMatch: 'Hakuna data inayofanana'
    },
    // Kalenda
    calendar: {
      prevMonth: 'Mwezi uliopita',
      nextMonth: 'Mwezi ujao',
      prevYear: 'Mwaka uliopita',
      nextYear: 'Mwaka ujao',
      today: 'Leo',
      week: 'Wiki',
      holiday: 'Likizo',
      workday: 'Kazi',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Jumapili',
        mon: 'Jumatatu',
        tue: 'Jumanne',
        wed: 'Jumatano',
        thu: 'Alhamisi',
        fri: 'Ijumaa',
        sat: 'Jumamosi'
      }
    },
    // Kukamilisha kiotomatiki
    autocomplete: {
      loading: 'Inapakia...',
      placeholder: 'Tafadhali ingiza',
      noData: 'Hakuna data',
      noMatch: 'Hakuna data inayofanana'
    },
    // Kuhesabu nyuma
    countdown: {
      days: 'siku',
      hours: 'masaa',
      minutes: 'dakika',
      seconds: 'sekunde',
      milliseconds: 'milisekunde',
      finished: 'Imekamilika'
    },
    // Kichagua kikandamizi
    cascader: {
      noMatch: 'Hakuna data inayofanana',
      placeholder: 'Chagua',
      loading: 'Inapakia...',
      noData: 'Hakuna data'
    },
    // Uhamishaji
    transfer: {
      noMatch: 'Hakuna data inayofanana',
      noData: 'Hakuna data',
      titles: ['Orodha 1', 'Orodha 2'],
      filterPlaceholder: 'Ingiza neno kuu',
      noCheckedFormat: '{total} vitu',
      hasCheckedFormat: '{checked}/{total} zimechaguliwa',
      searchPlaceholder: 'Ingiza neno kuu'
    },
    // Jedwali
    table: {
      emptyText: 'Hakuna data',
      confirmFilter: 'Thibitisha',
      resetFilter: 'Weka upya',
      clearFilter: 'Zote',
      sumText: 'Jumla',
      loading: 'Inapakia...',
      index: 'Faharasa',
      print: 'Chapisha',
      cancel: 'Ghairi',
      preview: 'Onyesho la kuchapisha',
      printTime: 'Muda wa kuchapisha',
      total: 'Jumla {total} vitu',
      page: 'Ukurasa {page}',
      yes: 'Ndiyo',
      no: 'Hapana',
      // Toolbar
      toolbar: {
        refresh: 'Onyesha upya',
        density: 'Uzito',
        densityDefault: 'Chaguo-msingi',
        densityLarge: 'Kubwa',
        densitySmall: 'Ndogo',
        columnSetting: 'Mipangilio ya safu',
        fullscreen: 'Skrini kamili',
        exitFullscreen: 'Toka skrini kamili',
        export: 'Hamisha nje',
        import: 'Hamisha ndani',
        search: 'Tafuta',
        searchPlaceholder: 'Ingiza maneno makuu ya kutafuta'
      },
      // Kichujio
      filter: {
        selectAll: 'Chagua zote',
        selectInvert: 'Geuza uteuzi',
        empty: 'Ni tupu',
        notEmpty: 'Si tupu',
        contains: 'Ina',
        notContains: 'Haina',
        equals: 'Sawa na',
        notEquals: 'Si sawa na',
        startsWith: 'Huanza na',
        endsWith: 'Humaliza na',
        greaterThan: 'Kubwa kuliko',
        lessThan: 'Ndogo kuliko',
        between: 'Kati ya'
      },
      // Panga
      sort: {
        asc: 'Kupanda',
        desc: 'Kushuka',
        clear: 'Futa upangaji'
      },
      // Hamisha nje
      export: {
        title: 'Hamisha data nje',
        filename: 'Jina la faili',
        type: 'Aina ya faili',
        scope: 'Upeo wa kuhamisha nje',
        scopeAll: 'Data zote',
        scopeSelected: 'Data zilizochaguliwa',
        scopeCurrentPage: 'Ukurasa wa sasa',
        includeHeader: 'Jumuisha kichwa',
        exporting: 'Inahamishwa nje...',
        success: 'Kuhamisha nje kumefanikiwa',
        error: 'Kuhamisha nje kumeshindwa'
      },
      // Hamisha ndani
      import: {
        title: 'Hamisha data ndani',
        selectFile: 'Chagua faili',
        dragTip: 'Bofya au buruta faili hapa kupakia',
        importing: 'Inahamishwa ndani...',
        success: 'Kuhamisha ndani kumefanikiwa',
        error: 'Kuhamisha ndani kumeshindwa',
        preview: 'Onyesho la data',
        confirm: 'Thibitisha kuhamisha ndani'
      },
      // Chapisha
      printConfig: {
        title: 'Mipangilio ya kuchapisha',
        pageTitle: 'Kichwa cha ukurasa',
        pageHeader: 'Kichwa',
        pageFooter: 'Chini',
        printAll: 'Chapisha zote',
        printSelected: 'Chapisha zilizochaguliwa',
        printCurrentPage: 'Chapisha ukurasa wa sasa',
        landscape: 'Urefu',
        portrait: 'Urefu',
        printing: 'Inachapishwa...'
      },
      // Mipangilio ya safu
      columnSetting: {
        title: 'Mipangilio ya safu',
        showAll: 'Onyesha zote',
        hideAll: 'Ficha zote',
        reset: 'Weka upya',
        fixedLeft: 'Weka kushoto',
        fixedRight: 'Weka kulia',
        unfixed: 'Ondoa uwekaji'
      },
      // Menyu ya muktadha
      contextMenu: {
        copy: 'Nakili',
        copyRow: 'Nakili safu',
        copyCell: 'Nakili seli',
        paste: 'Bandika',
        insertRowAbove: 'Ingiza safu juu',
        insertRowBelow: 'Ingiza safu chini',
        deleteRow: 'Futa safu',
        deleteSelectedRows: 'Futa safu zilizochaguliwa',
        exportSelected: 'Hamisha nje zilizochaguliwa'
      },
      // Uteuzi
      selection: {
        selectAll: 'Chagua zote',
        selectInvert: 'Geuza uteuzi',
        selectNone: 'Futa uteuzi',
        selected: '{count} vitu vimechaguliwa'
      },
      // Panua
      expand: {
        expandAll: 'Panua zote',
        collapseAll: 'Funga zote'
      },
      // Mti
      tree: {
        expandAll: 'Panua zote',
        collapseAll: 'Funga zote',
        expandLevel: 'Panua hadi kiwango {level}'
      },
      // Buruta
      drag: {
        dragTip: 'Buruta kupanga upya',
        dropTip: 'Acha kuweka'
      }
    },
    // Sanduku la ujumbe
    messagebox: {
      title: 'Ujumbe',
      confirm: 'Sawa',
      cancel: 'Ghairi',
      close: 'Funga',
      error: 'Ingizo haramu',
      alert: 'Onyo',
      prompt: 'Haraka',
      inputPlaceholder: 'Tafadhali ingiza'
    },
    // Pakia
    upload: {
      deleteTip: 'bofya delete kuondoa',
      delete: 'Futa',
      preview: 'Onyesho',
      continue: 'Endelea',
      upload: 'Bofya kupakia',
      tip: 'Bofya au buruta faili kwenye eneo hili kwa <em>kupakia</em>',
      dragTip: 'Acha faili hapa au bofya kupakia',
      uploading: 'Inapakiwa...',
      success: 'Kupakia kumefanikiwa',
      error: 'Kupakia kumeshindwa',
      retry: 'Jaribu tena',
      cancel: 'Ghairi kupakia',
      fileTypeError: 'Aina ya faili haitengenezwi',
      fileSizeError: 'Ukubwa wa faili unazidi kikomo',
      fileCountError: 'Idadi ya faili inazidi kikomo'
    },
    // Fomu
    form: {
      validationFailed: 'Uthibitishaji umeshindwa',
      required: 'Inahitajika',
      pleaseInput: 'Tafadhali ingiza',
      pleaseSelect: 'Tafadhali chagua'
    },
    // Kitufe
    button: {
      loading: 'Inapakia...'
    },
    // Ingizo
    input: {
      placeholder: 'Tafadhali ingiza',
      clear: 'Futa',
      showPassword: 'Onyesha nenosiri',
      hidePassword: 'Ficha nenosiri',
      copy: 'Nakili',
      copied: 'Imenakiliwa'
    },
    // Ingizo la nambari
    inputnumber: {
      placeholder: 'Tafadhali ingiza nambari',
      increase: 'Ongeza',
      decrease: 'Punguza'
    },
    // Ingizo la lebo
    inputtag: {
      placeholder: 'Tafadhali ingiza',
      add: 'Ongeza',
      remove: 'Ondoa'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Njia',
      more: 'Zaidi'
    },
    // Rudi juu
    backtop: {
      text: 'Rudi juu'
    },
    // Chagua
    select: {
      placeholder: 'Tafadhali chagua',
      noData: 'Hakuna data',
      loading: 'Inapakia...',
      noMatch: 'Hakuna data inayofanana',
      selectAll: 'Chagua zote',
      clearAll: 'Futa zote'
    },
    // Ukuaji wa kurasa
    pagination: {
      goto: 'Nenda',
      page: '',
      total: 'Jumla {total}',
      pageSize: '/ukurasa',
      prev: 'Iliyotangulia',
      next: 'Inayofuata',
      first: 'Ya kwanza',
      last: 'Ya mwisho',
      pageClassifier: ''
    },
    // Popconfirm
    popconfirm: {
      confirm: 'Sawa',
      cancel: 'Ghairi',
      dontAskAgain: 'Usiulize tena'
    },
    // Mazungumzo
    dialog: {
      confirm: 'Sawa',
      cancel: 'Ghairi',
      close: 'Funga',
      maximize: 'Kuongeza kwa upeo',
      restore: 'Rudisha'
    },
    // Drawer
    drawer: {
      close: 'Funga',
      confirm: 'Sawa',
      cancel: 'Ghairi'
    },
    // Menyu ya kushuka
    dropdown: {
      loading: 'Inapakia...'
    },
    // Picha
    image: {
      error: 'IMESHINDWA',
      loading: 'Inapakia...',
      preview: 'Onyesho',
      zoomIn: 'Kuongeza',
      zoomOut: 'Kupunguza',
      rotateLeft: 'Zungusha kushoto',
      rotateRight: 'Zungusha kulia',
      originalSize: 'Ukubwa wa asili',
      fullscreen: 'Skrini kamili'
    },
    // Mwangalizi wa picha
    imageviewer: {
      close: 'Funga',
      prev: 'Iliyotangulia',
      next: 'Inayofuata',
      zoomIn: 'Kuongeza',
      zoomOut: 'Kupunguza',
      rotateLeft: 'Zungusha kushoto',
      rotateRight: 'Zungusha kulia',
      reset: 'Weka upya',
      fullscreen: 'Skrini kamili',
      exitFullscreen: 'Toka skrini kamili'
    },
    // Kusogeza usio na mwisho
    infinitescroll: {
      loading: 'Inapakia...',
      finished: 'Hakuna data zaidi',
      error: 'Kupakia kumeshindwa, bofya kujaribu tena',
      retry: 'Bofya kujaribu tena'
    },
    // Ujumbe
    message: {
      close: 'Funga'
    },
    // Arifa
    notification: {
      close: 'Funga'
    },
    // Kupakia
    loading: {
      text: 'Inapakia...'
    },
    // Spin
    spin: {
      text: 'Inapakia...'
    },
    // Kiwango
    rate: {
      texts: ['Duni sana', 'Kukatishwa tamaa', 'Haki', 'Radhi', 'Kushangaa']
    },
    // Onyo
    alert: {
      close: 'Funga'
    },
    // Lebo
    tag: {
      close: 'Funga'
    },
    // Tabo
    tabs: {
      close: 'Funga',
      add: 'Ongeza',
      more: 'Zaidi'
    },
    // Hatua
    steps: {
      finish: 'Imekamilika',
      process: 'Inaendelea',
      wait: 'Inasubiri',
      error: 'Hitilafu'
    },
    // Maendeleo
    progress: {
      success: 'Mafanikio',
      exception: 'Ubaguzi',
      warning: 'Onyo'
    },
    // Skeleton
    skeleton: {
      loading: 'Inapakia...'
    },
    // Tupu
    empty: {
      description: 'Hakuna data',
      noData: 'Hakuna data',
      noResult: 'Hakuna matokeo',
      networkError: 'Hitilafu ya mtandao',
      serverError: 'Hitilafu ya seva'
    },
    // Matokeo
    result: {
      success: 'Mafanikio',
      error: 'Hitilafu',
      warning: 'Onyo',
      info: 'Maelezo',
      backHome: 'Rudi nyumbani'
    },
    // Waterfall
    waterfall: {
      loading: 'Inapakia...',
      noMore: 'Hakuna data zaidi',
      empty: 'Hakuna data'
    },
    // Maelezo
    descriptions: {
      colon: ':'
    },
    // Slider
    slider: {
      tipFormatter: '{value}'
    },
    // Swichi
    switch: {
      on: 'WASHA',
      off: 'ZIMA'
    },
    // Checkbox
    checkbox: {
      selectAll: 'Chagua zote'
    },
    // Radio
    radio: {},
    // Menyu
    menu: {
      collapse: 'Funga menyu',
      expand: 'Panua menyu'
    },
    // Kadi
    card: {
      collapse: 'Funga',
      expand: 'Panua'
    },
    // Kufunga
    collapse: {
      expand: 'Panua',
      collapse: 'Funga'
    },
    // Kidokezo
    tooltip: {},
    // Popover
    popover: {},
    // Beji
    badge: {},
    // Avatar
    avatar: {
      error: 'Kupakia kumeshindwa'
    },
    // Watermark
    watermark: {},
    // Kigawanyiko
    divider: {},
    // Carousel
    carousel: {
      prev: 'Iliyotangulia',
      next: 'Inayofuata'
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Nanga
    anchor: {}
  }
}

export default sw
