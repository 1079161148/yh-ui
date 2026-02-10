import type { Language } from '../index'

export const ku: Language = {
  name: 'ku',
  yh: {
    // Giştî
    common: {
      yes: 'Erê',
      no: 'Na',
      confirm: 'Pejirandin',
      cancel: 'Betal kirin',
      loading: 'Bardibe',
      close: 'Girtin',
      clear: 'Paqij kirin',
      reset: 'Reset kirin',
      save: 'Tomar kirin',
      delete: 'Jêbirin',
      edit: 'Guhertin',
      add: 'Zêde kirin',
      search: 'Lêgerîn',
      refresh: 'Nû kirin',
      expand: 'Fireh kirin',
      collapse: 'Kêm kirin',
      more: 'Bêtir',
      noData: 'Daneyên tune',
      noMatch: 'Daneyên lihevhatî tune',
      selectAll: 'Hemû hilbijêre',
      unselectAll: 'Hemû hilbijartinê betal bike'
    },
    // Hilbijartina rengê
    colorpicker: {
      confirm: 'Baş e',
      clear: 'Paqij kirin',
      eyeDropper: 'Çavik',
      suggestionDark: 'Nivîsa spî çêtir e',
      suggestionLight: 'Nivîsa reş çêtir e',
      recentColors: 'Rengên dawî',
      presetColors: 'Rengên pêş-vekirî'
    },
    // Hilbijartina rojê
    datepicker: {
      now: 'Niha',
      today: 'Îro',
      cancel: 'Betal kirin',
      clear: 'Paqij kirin',
      confirm: 'Baş e',
      selectDate: 'Rojê hilbijêre',
      selectTime: 'Demê hilbijêre',
      startDate: 'Rojê destpêkê',
      startTime: 'Dema destpêkê',
      endDate: 'Rojê dawî',
      endTime: 'Dema dawî',
      year: '',
      month: '',
      day: '',
      week: 'Hefte',
      monthBeforeYear: true,
      prevYear: 'Salê berê',
      nextYear: 'Salê paş',
      prevMonth: 'Meha berê',
      nextMonth: 'Meha paş',
      weeks: {
        sun: 'Yek',
        mon: 'Du',
        tue: 'Sê',
        wed: 'Çar',
        thu: 'Pênc',
        fri: 'Şeş',
        sat: 'Heft'
      },
      months: {
        jan: 'Rêb',
        feb: 'Reş',
        mar: 'Ada',
        apr: 'Nîs',
        may: 'Gul',
        jun: 'Pûş',
        jul: 'Tîr',
        aug: 'Gel',
        sep: 'Rez',
        oct: 'Kew',
        nov: 'Serm',
        dec: 'Ber'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Hilbijartina demê
    timepicker: {
      confirm: 'Baş e',
      cancel: 'Betal kirin',
      now: 'Niha',
      placeholder: 'Demê hilbijêre',
      startPlaceholder: 'Dema destpêkê',
      endPlaceholder: 'Dema dawî',
      selectTime: 'Demê hilbijêre'
    },
    // Hilbijartina demê
    timeselect: {
      placeholder: 'Demê hilbijêre'
    },
    // Dar
    tree: {
      emptyText: 'Daneyên tune',
      loading: 'Bardibe...',
      checkAll: 'Hemû kontrol bike',
      uncheckAll: 'Hemû kontrolê betal bike',
      expandAll: 'Hemû fireh bike',
      collapseAll: 'Hemû kêm bike'
    },
    // Hilbijartina darê
    treeselect: {
      placeholder: 'Hilbijêre',
      emptyText: 'Daneyên tune',
      loading: 'Bardibe...',
      noMatch: 'Daneyên lihevhatî tune'
    },
    // Salname
    calendar: {
      prevMonth: 'Meha berê',
      nextMonth: 'Meha paş',
      prevYear: 'Salê berê',
      nextYear: 'Salê paş',
      today: 'Îro',
      week: 'Hefte',
      holiday: 'Roja betlaneyê',
      workday: 'Kar',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Yek',
        mon: 'Du',
        tue: 'Sê',
        wed: 'Çar',
        thu: 'Pênc',
        fri: 'Şeş',
        sat: 'Heft'
      }
    },
    // Xweber dagirtin
    autocomplete: {
      loading: 'Bardibe...',
      placeholder: 'Ji kerema xwe binivîse',
      noData: 'Daneyên tune',
      noMatch: 'Daneyên lihevhatî tune'
    },
    // Berjêr hejmartin
    countdown: {
      days: 'roj',
      hours: 'saet',
      minutes: 'deqîqe',
      seconds: 'çirke',
      milliseconds: 'mîlîçirke',
      finished: 'Qediya'
    },
    // Kaskad
    cascader: {
      noMatch: 'Daneyên lihevhatî tune',
      placeholder: 'Hilbijêre',
      loading: 'Bardibe...',
      noData: 'Daneyên tune'
    },
    // Guhertin
    transfer: {
      noMatch: 'Daneyên lihevhatî tune',
      noData: 'Daneyên tune',
      titles: ['Lîsteya 1', 'Lîsteya 2'],
      filterPlaceholder: 'Bêjeya sereke binivîse',
      noCheckedFormat: '{total} hêman',
      hasCheckedFormat: '{checked}/{total} hilbijartî',
      searchPlaceholder: 'Bêjeya sereke binivîse'
    },
    // Tablo
    table: {
      emptyText: 'Daneyên tune',
      confirmFilter: 'Pejirandin',
      resetFilter: 'Reset kirin',
      clearFilter: 'Hemû',
      sumText: 'Kom',
      loading: 'Bardibe...',
      index: 'Îndeks',
      print: 'Çap kirin',
      cancel: 'Betal kirin',
      preview: 'Pêşdîtina çapê',
      printTime: 'Dema çapê',
      total: 'Bi tevahî {total} hêman',
      page: 'Rûpel {page}',
      yes: 'Erê',
      no: 'Na',
      // Amûrbar
      toolbar: {
        refresh: 'Nû kirin',
        density: 'Tîrbûn',
        densityDefault: 'Destpêk',
        densityLarge: 'Mezin',
        densitySmall: 'Biçûk',
        columnSetting: 'Mîhengên stûnê',
        fullscreen: 'Ekrana tevahî',
        exitFullscreen: 'Ji ekrana tevahî derkeve',
        export: 'Derxistin',
        import: 'Anîn',
        search: 'Lêgerîn',
        searchPlaceholder: 'Ji bo lêgerînê bêjeyên sereke binivîse'
      },
      // Fîlter
      filter: {
        selectAll: 'Hemû hilbijêre',
        selectInvert: 'Hilbijartinê berevajî bike',
        empty: 'Vala ye',
        notEmpty: 'Vala nîne',
        contains: 'Tê de heye',
        notContains: 'Tê de nîne',
        equals: 'Wekhev e',
        notEquals: 'Wekhev nîne',
        startsWith: 'Bi dest pê dike',
        endsWith: 'Bi dawî dibe',
        greaterThan: 'Mezintir e',
        lessThan: 'Biçûktir e',
        between: 'Di navbera'
      },
      // Rêzkirin
      sort: {
        asc: 'Zêde dibe',
        desc: 'Kêm dibe',
        clear: 'Rêzkirinê paqij bike'
      },
      // Derxistin
      export: {
        title: 'Daneyan derxistin',
        filename: 'Navê dosyayê',
        type: 'Cureyê dosyayê',
        scope: 'Qada derxistinê',
        scopeAll: 'Hemû daneyên',
        scopeSelected: 'Daneyên hilbijartî',
        scopeCurrentPage: 'Rûpela niha',
        includeHeader: 'Sernavê tevlî bike',
        exporting: 'Derxistin...',
        success: 'Derxistin serkeftî',
        error: 'Derxistin têk çû'
      },
      // Anîn
      import: {
        title: 'Daneyan anîn',
        selectFile: 'Dosyayê hilbijêre',
        dragTip: 'Ji bo barkirinê dosyayê li vir bitikîne an jî bikişîne',
        importing: 'Anîn...',
        success: 'Anîn serkeftî',
        error: 'Anîn têk çû',
        preview: 'Pêşdîtina daneyan',
        confirm: 'Anînê pejirandin'
      },
      // Çap kirin
      printConfig: {
        title: 'Mîhengên çapê',
        pageTitle: 'Sernavê rûpelê',
        pageHeader: 'Sernav',
        pageFooter: 'Binê rûpelê',
        printAll: 'Hemû çap bike',
        printSelected: 'Hilbijartî çap bike',
        printCurrentPage: 'Rûpela niha çap bike',
        landscape: 'Berfireh',
        portrait: 'Rast',
        printing: 'Çap dibe...'
      },
      // Mîhengên stûnê
      columnSetting: {
        title: 'Mîhengên stûnê',
        showAll: 'Hemû nîşan bide',
        hideAll: 'Hemû veşêre',
        reset: 'Reset kirin',
        fixedLeft: 'Çepê sabit bike',
        fixedRight: 'Rastê sabit bike',
        unfixed: 'Bê sabit bike'
      },
      // Menuyê kontekstê
      contextMenu: {
        copy: 'Kopî kirin',
        copyRow: 'Rêzê kopî bike',
        copyCell: 'Xaneyê kopî bike',
        paste: 'Paste kirin',
        insertRowAbove: 'Rêzê jorê zêde bike',
        insertRowBelow: 'Rêzê jêrê zêde bike',
        deleteRow: 'Rêzê jê bibe',
        deleteSelectedRows: 'Rêzên hilbijartî jê bibe',
        exportSelected: 'Hilbijartî derxistin'
      },
      // Hilbijartin
      selection: {
        selectAll: 'Hemû hilbijêre',
        selectInvert: 'Hilbijartinê berevajî bike',
        selectNone: 'Hilbijartinê paqij bike',
        selected: '{count} hêman hilbijartî'
      },
      // Fireh kirin
      expand: {
        expandAll: 'Hemû fireh bike',
        collapseAll: 'Hemû kêm bike'
      },
      // Dar
      tree: {
        expandAll: 'Hemû fireh bike',
        collapseAll: 'Hemû kêm bike',
        expandLevel: 'Heft {level} fireh bike'
      },
      // Kişandin
      drag: {
        dragTip: 'Ji bo rêzkirina nû kişîne',
        dropTip: 'Ji bo danînê berde'
      }
    },
    // Qutiya peyamê
    messagebox: {
      title: 'Peyam',
      confirm: 'Baş e',
      cancel: 'Betal kirin',
      close: 'Girtin',
      error: 'Têketina neqanûnî',
      alert: 'Hişyarî',
      prompt: 'Pirs',
      inputPlaceholder: 'Ji kerema xwe binivîse'
    },
    // Barkirin
    upload: {
      deleteTip: 'ji bo jêbirinê delete bitikîne',
      delete: 'Jêbirin',
      preview: 'Pêşdîtin',
      continue: 'Berdewam',
      upload: 'Ji bo barkirinê bitikîne',
      tip: 'Ji bo <em>barkirinê</em> dosyayê li vê deverê bitikîne an jî bikişîne',
      dragTip: 'Dosyayê li vir berde an jî ji bo barkirinê bitikîne',
      uploading: 'Bardibe...',
      success: 'Barkirin serkeftî',
      error: 'Barkirin têk çû',
      retry: 'Dîsa biceribîne',
      cancel: 'Barkirinê betal bike',
      fileTypeError: 'Cureyê dosyayê nayê piştgirî kirin',
      fileSizeError: 'Mezinahiya dosyayê ji sînorê derbas dibe',
      fileCountError: 'Hejmara dosyayê ji sînorê derbas dibe'
    },
    // Form
    form: {
      validationFailed: 'Piştrastkirin têk çû',
      required: 'Pêdivî ye',
      pleaseInput: 'Ji kerema xwe binivîse',
      pleaseSelect: 'Ji kerema xwe hilbijêre'
    },
    // Bişkok
    button: {
      loading: 'Bardibe...'
    },
    // Têketin
    input: {
      placeholder: 'Ji kerema xwe binivîse',
      clear: 'Paqij kirin',
      showPassword: 'Şîfreya nîşan bide',
      hidePassword: 'Şîfreya veşêre',
      copy: 'Kopî kirin',
      copied: 'Kopî kirî'
    },
    // Hejmara têketinê
    inputnumber: {
      placeholder: 'Ji kerema xwe hejmarê binivîse',
      increase: 'Zêde bike',
      decrease: 'Kêm bike'
    },
    // Etîketa têketinê
    inputtag: {
      placeholder: 'Ji kerema xwe binivîse',
      add: 'Zêde kirin',
      remove: 'Jêbirin'
    },
    // Rêya navîgasyonê
    breadcrumb: {
      label: 'Rêya navîgasyonê',
      more: 'Bêtir'
    },
    // Vegere jor
    backtop: {
      text: 'Vegere jor'
    },
    // Hilbijartin
    select: {
      placeholder: 'Ji kerema xwe hilbijêre',
      noData: 'Daneyên tune',
      loading: 'Bardibe...',
      noMatch: 'Daneyên lihevhatî tune',
      selectAll: 'Hemû hilbijêre',
      clearAll: 'Hemû paqij bike'
    },
    // Rûpelkirin
    pagination: {
      goto: 'Biçe',
      page: '',
      total: 'Bi tevahî {total}',
      pageSize: '/rûpel',
      prev: 'Berê',
      next: 'Paş',
      first: 'Yekem',
      last: 'Dawî',
      pageClassifier: ''
    },
    // Popup pejirandinê
    popconfirm: {
      confirm: 'Baş e',
      cancel: 'Betal kirin',
      dontAskAgain: 'Dîsa ne pirsîne'
    },
    // Dîalog
    dialog: {
      confirm: 'Baş e',
      cancel: 'Betal kirin',
      close: 'Girtin',
      maximize: 'Mezin bike',
      restore: 'Vegerîne'
    },
    // Drawer
    drawer: {
      close: 'Girtin',
      confirm: 'Baş e',
      cancel: 'Betal kirin'
    },
    // Menuyê daketî
    dropdown: {
      loading: 'Bardibe...'
    },
    // Wêne
    image: {
      error: 'TÊK ÇÛ',
      loading: 'Bardibe...',
      preview: 'Pêşdîtin',
      zoomIn: 'Mezin bike',
      zoomOut: 'Biçûk bike',
      rotateLeft: 'Çepê bizivirîne',
      rotateRight: 'Rastê bizivirîne',
      originalSize: 'Mezinahiya orîjînal',
      fullscreen: 'Ekrana tevahî'
    },
    // Dîtina wêneyê
    imageviewer: {
      close: 'Girtin',
      prev: 'Berê',
      next: 'Paş',
      zoomIn: 'Mezin bike',
      zoomOut: 'Biçûk bike',
      rotateLeft: 'Çepê bizivirîne',
      rotateRight: 'Rastê bizivirîne',
      reset: 'Reset kirin',
      fullscreen: 'Ekrana tevahî',
      exitFullscreen: 'Ji ekrana tevahî derkeve'
    },
    // Rêzika bêdawî
    infinitescroll: {
      loading: 'Bardibe...',
      finished: 'Daneyên din tune',
      error: 'Barkirin têk çû, ji bo dîsa ceribandinê bitikîne',
      retry: 'Ji bo dîsa ceribandinê bitikîne'
    },
    // Peyam
    message: {
      close: 'Girtin'
    },
    // Agahdarî
    notification: {
      close: 'Girtin'
    },
    // Barkirin
    loading: {
      text: 'Bardibe...'
    },
    // Zivirandin
    spin: {
      text: 'Bardibe...'
    },
    // Nîşandan
    rate: {
      texts: ['Pir xirab', 'Bêhêvî', 'Navîn', 'Razî', 'Şaşmayî']
    },
    // Hişyarî
    alert: {
      close: 'Girtin'
    },
    // Etîket
    tag: {
      close: 'Girtin'
    },
    // Tab
    tabs: {
      close: 'Girtin',
      add: 'Zêde kirin',
      more: 'Bêtir'
    },
    // Gavan
    steps: {
      finish: 'Qediya',
      process: 'Di pêvajoyê de',
      wait: 'Li bendê',
      error: 'Çewtî'
    },
    // Pêşveçûn
    progress: {
      success: 'Serkeftî',
      exception: 'Îstîsna',
      warning: 'Hişyarî'
    },
    // Skelet
    skeleton: {
      loading: 'Bardibe...'
    },
    // Vala
    empty: {
      description: 'Daneyên tune',
      noData: 'Daneyên tune',
      noResult: 'Encamên tune',
      networkError: 'Çewtiya torê',
      serverError: 'Çewtiya serverê'
    },
    // Encam
    result: {
      success: 'Serkeftî',
      error: 'Çewtî',
      warning: 'Hişyarî',
      info: 'Agahî',
      backHome: 'Vegere malê'
    },
    // Şelale
    waterfall: {
      loading: 'Bardibe...',
      noMore: 'Daneyên din tune',
      empty: 'Daneyên tune'
    },
    // Dîroknivîs
    descriptions: {
      colon: ':'
    },
    // Slider
    slider: {
      tipFormatter: '{value}'
    },
    // Guhêrbar
    switch: {
      on: 'VEKIRÎ',
      off: 'GIRTÎ'
    },
    // Qutiya kontrolê
    checkbox: {
      selectAll: 'Hemû hilbijêre'
    },
    // Radio
    radio: {},
    // Menû
    menu: {
      collapse: 'Menuyê kêm bike',
      expand: 'Menuyê fireh bike'
    },
    // Kart
    card: {
      collapse: 'Kêm kirin',
      expand: 'Fireh kirin'
    },
    // Kêm kirin
    collapse: {
      expand: 'Fireh kirin',
      collapse: 'Kêm kirin'
    },
    // Rêbername
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: 'Barkirin têk çû'
    },
    // Nîşana avê
    watermark: {},
    // Dabeşker
    divider: {},
    // Karusel
    carousel: {
      prev: 'Berê',
      next: 'Paş'
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Anchor
    anchor: {}
  }
}

export default ku
