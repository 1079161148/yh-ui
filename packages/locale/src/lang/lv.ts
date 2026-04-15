import type { Language } from '../index'

export const lv: Language = {
  name: 'lv',
  yh: {
    // Kopīgs
    common: {
      yes: 'Jā',
      no: 'Nē',
      confirm: 'Apstiprināt',
      cancel: 'Atcelt',
      loading: 'Ielādē',
      close: 'Aizvērt',
      clear: 'Notīrīt',
      reset: 'Atiestatīt',
      save: 'Saglabāt',
      delete: 'Dzēst',
      edit: 'Rediģēt',
      add: 'Pievienot',
      search: 'Meklēt',
      refresh: 'Atjaunot',
      expand: 'Izvērst',
      collapse: 'Sakļaut',
      more: 'Vairāk',
      noData: 'Nav datu',
      noMatch: 'Nav atbilstošu datu',
      selectAll: 'Izvēlēties visu',
      unselectAll: 'Noņemt visu izvēli'
    },
    // Krāsu izvēle
    colorpicker: {
      confirm: 'Labi',
      clear: 'Notīrīt',
      eyeDropper: 'Pipete',
      suggestionDark: 'Balts teksts ir labāks',
      suggestionLight: 'Melns teksts ir labāks',
      recentColors: 'Pēdējās krāsas',
      presetColors: 'Iepriekš iestatītās krāsas'
    },
    // Datuma izvēle
    datepicker: {
      now: 'Tagad',
      today: 'Šodien',
      cancel: 'Atcelt',
      clear: 'Notīrīt',
      confirm: 'Labi',
      selectDate: 'Izvēlieties datumu',
      selectTime: 'Izvēlieties laiku',
      startDate: 'Sākuma datums',
      startTime: 'Sākuma laiks',
      endDate: 'Beigu datums',
      endTime: 'Beigu laiks',
      year: '',
      month: '',
      day: '',
      week: 'Nedēļa',
      monthBeforeYear: true,
      prevYear: 'Iepriekšējais gads',
      nextYear: 'Nākamais gads',
      prevMonth: 'Iepriekšējais mēnesis',
      nextMonth: 'Nākamais mēnesis',
      weeks: {
        sun: 'Sv',
        mon: 'Pr',
        tue: 'Ot',
        wed: 'Tr',
        thu: 'Ct',
        fri: 'Pk',
        sat: 'Se'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'Mai',
        jun: 'Jūn',
        jul: 'Jūl',
        aug: 'Aug',
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
    // Laika izvēle
    timepicker: {
      confirm: 'Labi',
      cancel: 'Atcelt',
      now: 'Tagad',
      placeholder: 'Izvēlieties laiku',
      startPlaceholder: 'Sākuma laiks',
      endPlaceholder: 'Beigu laiks',
      selectTime: 'Izvēlieties laiku'
    },
    // Laika izvēle
    timeselect: {
      placeholder: 'Izvēlieties laiku'
    },
    // Koks
    tree: {
      emptyText: 'Nav datu',
      loading: 'Ielādē...',
      checkAll: 'Atzīmēt visu',
      uncheckAll: 'Noņemt visu atzīmi',
      expandAll: 'Izvērst visu',
      collapseAll: 'Sakļaut visu'
    },
    // Koka izvēle
    treeselect: {
      placeholder: 'Izvēlieties',
      emptyText: 'Nav datu',
      loading: 'Ielādē...',
      noMatch: 'Nav atbilstošu datu'
    },
    // Kalendārs
    calendar: {
      prevMonth: 'Iepriekšējais mēnesis',
      nextMonth: 'Nākamais mēnesis',
      prevYear: 'Iepriekšējais gads',
      nextYear: 'Nākamais gads',
      today: 'Šodien',
      week: 'Nedēļa',
      holiday: 'Brīvdiena',
      workday: 'Darbs',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Sv',
        mon: 'Pr',
        tue: 'Ot',
        wed: 'Tr',
        thu: 'Ct',
        fri: 'Pk',
        sat: 'Se'
      }
    },
    // Automātiskā aizpilde
    autocomplete: {
      loading: 'Ielādē...',
      placeholder: 'Lūdzu, ievadiet',
      noData: 'Nav datu',
      noMatch: 'Nav atbilstošu datu'
    },
    // Atpakaļskaitīšana
    countdown: {
      days: 'dienas',
      hours: 'stundas',
      minutes: 'minūtes',
      seconds: 'sekundes',
      milliseconds: 'milisekundes',
      finished: 'Pabeigts'
    },
    // Kaskāde
    cascader: {
      noMatch: 'Nav atbilstošu datu',
      placeholder: 'Izvēlieties',
      loading: 'Ielādē...',
      noData: 'Nav datu'
    },
    // Pārsūtīšana
    transfer: {
      noMatch: 'Nav atbilstošu datu',
      noData: 'Nav datu',
      titles: ['Saraksts 1', 'Saraksts 2'],
      filterPlaceholder: 'Ievadiet atslēgvārdu',
      noCheckedFormat: '{total} vienības',
      hasCheckedFormat: '{checked}/{total} izvēlēts',
      searchPlaceholder: 'Ievadiet atslēgvārdu'
    },
    // Tabula
    table: {
      emptyText: 'Nav datu',
      confirmFilter: 'Apstiprināt',
      resetFilter: 'Atiestatīt',
      clearFilter: 'Viss',
      sumText: 'Summa',
      loading: 'Ielādē...',
      index: 'Indekss',
      print: 'Drukāt',
      cancel: 'Atcelt',
      preview: 'Drukas priekšskatījums',
      printTime: 'Drukas laiks',
      total: 'Kopā {total} vienības',
      page: 'Lapa {page}',
      yes: 'Jā',
      no: 'Nē',
      // Rīkjosla
      toolbar: {
        refresh: 'Atjaunot',
        density: 'Blīvums',
        densityDefault: 'Noklusējums',
        densityLarge: 'Liels',
        densitySmall: 'Mazs',
        columnSetting: 'Kolonnu iestatījumi',
        fullscreen: 'Pilnekrāns',
        exitFullscreen: 'Iziet no pilnekrāna',
        export: 'Eksportēt',
        import: 'Importēt',
        search: 'Meklēt',
        searchPlaceholder: 'Ievadiet atslēgvārdus meklēšanai'
      },
      // Filtrs
      filter: {
        selectAll: 'Izvēlēties visu',
        selectInvert: 'Apgriezt izvēli',
        empty: 'Ir tukšs',
        notEmpty: 'Nav tukšs',
        contains: 'Satur',
        notContains: 'Nesatur',
        equals: 'Vienāds',
        notEquals: 'Nav vienāds',
        startsWith: 'Sākas ar',
        endsWith: 'Beidzas ar',
        greaterThan: 'Lielāks par',
        lessThan: 'Mazāks par',
        between: 'Starp'
      },
      // Kārtošana
      sort: {
        asc: 'Augošā secībā',
        desc: 'Dilstošā secībā',
        clear: 'Notīrīt kārtošanu'
      },
      // Eksportēšana
      export: {
        title: 'Eksportēt datus',
        filename: 'Faila nosaukums',
        type: 'Faila tips',
        scope: 'Eksporta apjoms',
        scopeAll: 'Visi dati',
        scopeSelected: 'Izvēlētie dati',
        scopeCurrentPage: 'Pašreizējā lapa',
        includeHeader: 'Iekļaut galveni',
        exporting: 'Eksportē...',
        success: 'Eksports veiksmīgs',
        error: 'Eksporta kļūda'
      },
      // Importēšana
      import: {
        title: 'Importēt datus',
        selectFile: 'Izvēlieties failu',
        dragTip: 'Noklikšķiniet vai velciet failu šeit, lai augšupielādētu',
        importing: 'Importē...',
        success: 'Imports veiksmīgs',
        error: 'Importa kļūda',
        preview: 'Datu priekšskatījums',
        confirm: 'Apstiprināt importu'
      },
      // Drukāšana
      printConfig: {
        title: 'Drukas iestatījumi',
        pageTitle: 'Lapas nosaukums',
        pageHeader: 'Galvene',
        pageFooter: 'Kājene',
        printAll: 'Drukāt visu',
        printSelected: 'Drukāt izvēlēto',
        printCurrentPage: 'Drukāt pašreizējo lapu',
        landscape: 'Ainava',
        portrait: 'Portrets',
        printing: 'Drukā...'
      },
      // Kolonnu iestatījumi
      columnSetting: {
        title: 'Kolonnu iestatījumi',
        showAll: 'Rādīt visu',
        hideAll: 'Paslēpt visu',
        reset: 'Atiestatīt',
        fixedLeft: 'Fiksēt pa kreisi',
        fixedRight: 'Fiksēt pa labi',
        unfixed: 'Atbrīvot'
      },
      // Konteksta izvēlne
      contextMenu: {
        copy: 'Kopēt',
        copyRow: 'Kopēt rindu',
        copyCell: 'Kopēt šūnu',
        paste: 'Ielīmēt',
        insertRowAbove: 'Ievietot rindu augšā',
        insertRowBelow: 'Ievietot rindu apakšā',
        deleteRow: 'Dzēst rindu',
        deleteSelectedRows: 'Dzēst izvēlētās rindas',
        exportSelected: 'Eksportēt izvēlēto'
      },
      // Izvēle
      selection: {
        selectAll: 'Izvēlēties visu',
        selectInvert: 'Apgriezt izvēli',
        selectNone: 'Notīrīt izvēli',
        selected: '{count} vienības izvēlētas'
      },
      // Izvēršana
      expand: {
        expandAll: 'Izvērst visu',
        collapseAll: 'Sakļaut visu'
      },
      // Koks
      tree: {
        expandAll: 'Izvērst visu',
        collapseAll: 'Sakļaut visu',
        expandLevel: 'Izvērst līdz līmenim {level}'
      },
      // Vilkšana
      drag: {
        dragTip: 'Velciet, lai pārkārtotu',
        dropTip: 'Atlaidiet, lai novietotu'
      }
    },
    // Ziņojuma lodziņš
    messagebox: {
      title: 'Ziņojums',
      confirm: 'Labi',
      cancel: 'Atcelt',
      close: 'Aizvērt',
      error: 'Nederīga ievade',
      alert: 'Brīdinājums',
      prompt: 'Pieprasījums',
      inputPlaceholder: 'Lūdzu, ievadiet'
    },
    // Augšupielāde
    upload: {
      deleteTip: 'nospiediet delete, lai dzēstu',
      delete: 'Dzēst',
      preview: 'Priekšskatījums',
      continue: 'Turpināt',
      upload: 'Noklikšķiniet, lai augšupielādētu',
      tip: 'Noklikšķiniet vai velciet failu uz šo apgabalu, lai <em>augšupielādētu</em>',
      dragTip: 'Atlaidiet failu šeit vai noklikšķiniet, lai augšupielādētu',
      uploading: 'Augšupielādē...',
      success: 'Augšupielāde veiksmīga',
      error: 'Augšupielādes kļūda',
      retry: 'Mēģināt vēlreiz',
      cancel: 'Atcelt augšupielādi',
      fileTypeError: 'Faila tips netiek atbalstīts',
      fileSizeError: 'Faila izmērs pārsniedz ierobežojumu',
      fileCountError: 'Failu skaits pārsniedz ierobežojumu'
    },
    // Forma
    form: {
      validationFailed: 'Validācija neizdevās',
      required: 'Obligāts',
      pleaseInput: 'Lūdzu, ievadiet',
      pleaseSelect: 'Lūdzu, izvēlieties'
    },
    // Poga
    button: {
      loading: 'Ielādē...'
    },
    // Ievade
    input: {
      placeholder: 'Lūdzu, ievadiet',
      clear: 'Notīrīt',
      showPassword: 'Rādīt paroli',
      hidePassword: 'Paslēpt paroli',
      copy: 'Kopēt',
      copied: 'Nokopēts'
    },
    // Skaitļa ievade
    inputnumber: {
      placeholder: 'Lūdzu, ievadiet skaitli',
      increase: 'Palielināt',
      decrease: 'Samazināt'
    },
    // Birka ievade
    inputtag: {
      placeholder: 'Lūdzu, ievadiet',
      add: 'Pievienot',
      remove: 'Noņemt'
    },
    // Navigācijas ceļš
    breadcrumb: {
      label: 'Navigācijas ceļš',
      more: 'Vairāk'
    },
    // Atgriezties uz augšu
    backtop: {
      text: 'Atgriezties uz augšu'
    },
    // Izvēle
    select: {
      placeholder: 'Lūdzu, izvēlieties',
      noData: 'Nav datu',
      loading: 'Ielādē...',
      noMatch: 'Nav atbilstošu datu',
      selectAll: 'Izvēlēties visu',
      clearAll: 'Notīrīt visu'
    },
    // Lapošana
    pagination: {
      goto: 'Doties uz',
      page: '',
      total: 'Kopā {total}',
      pageSize: '/lapa',
      prev: 'Iepriekšējā',
      next: 'Nākamā',
      first: 'Pirmā',
      last: 'Pēdējā',
      pageClassifier: ''
    },
    // Apstiprinājuma izlecošais logs
    popconfirm: {
      confirm: 'Labi',
      cancel: 'Atcelt',
      dontAskAgain: 'Vairs nejautāt'
    },
    // Dialogs
    dialog: {
      confirm: 'Labi',
      cancel: 'Atcelt',
      close: 'Aizvērt',
      maximize: 'Maksimizēt',
      restore: 'Atjaunot'
    },
    // Atvilktne
    drawer: {
      close: 'Aizvērt',
      confirm: 'Labi',
      cancel: 'Atcelt'
    },
    // Nolaižamā izvēlne
    dropdown: {
      loading: 'Ielādē...'
    },
    // Attēls
    image: {
      error: 'NEIZDEVAS',
      loading: 'Ielādē...',
      preview: 'Priekšskatījums',
      zoomIn: 'Tuvināt',
      zoomOut: 'Tālināt',
      rotateLeft: 'Pagriezt pa kreisi',
      rotateRight: 'Pagriezt pa labi',
      originalSize: 'Sākotnējais izmērs',
      fullscreen: 'Pilnekrāns'
    },
    // Attēla skatītājs
    imageviewer: {
      close: 'Aizvērt',
      prev: 'Iepriekšējais',
      next: 'Nākamais',
      zoomIn: 'Tuvināt',
      zoomOut: 'Tālināt',
      rotateLeft: 'Pagriezt pa kreisi',
      rotateRight: 'Pagriezt pa labi',
      reset: 'Atiestatīt',
      fullscreen: 'Pilnekrāns',
      exitFullscreen: 'Iziet no pilnekrāna'
    },
    // Bezgalīga ritināšana
    infinitescroll: {
      loading: 'Ielādē...',
      finished: 'Nav vairāk datu',
      error: 'Ielādes kļūda, noklikšķiniet, lai mēģinātu vēlreiz',
      retry: 'Noklikšķiniet, lai mēģinātu vēlreiz'
    },
    // Ziņojums
    message: {
      close: 'Aizvērt'
    },
    // Paziņojums
    notification: {
      close: 'Aizvērt'
    },
    // Ielāde
    loading: {
      text: 'Ielādē...'
    },
    // Griešanās
    spin: {
      text: 'Ielādē...'
    },
    // Vērtējums
    rate: {
      texts: ['Ļoti slikti', 'Vīlies', 'Viduvēji', 'Apmierināts', 'Pārsteigts']
    },
    // Brīdinājums
    alert: {
      close: 'Aizvērt'
    },
    // Birka
    tag: {
      close: 'Aizvērt'
    },
    // Cilnes
    tabs: {
      close: 'Aizvērt',
      add: 'Pievienot',
      more: 'Vairāk'
    },
    // Soļi
    steps: {
      finish: 'Pabeigts',
      process: 'Notiek',
      wait: 'Gaida',
      error: 'Kļūda'
    },
    // Progress
    progress: {
      success: 'Veiksmīgi',
      exception: 'Izņēmums',
      warning: 'Brīdinājums'
    },
    // Skelets
    skeleton: {
      loading: 'Ielādē...'
    },
    // Tukšs
    empty: {
      description: 'Nav datu',
      noData: 'Nav datu',
      noResult: 'Nav rezultātu',
      networkError: 'Tīkla kļūda',
      serverError: 'Servera kļūda'
    },
    // Rezultāts
    result: {
      success: 'Veiksmīgi',
      error: 'Kļūda',
      warning: 'Brīdinājums',
      info: 'Informācija',
      backHome: 'Atgriezties uz sākumu'
    },
    // Ūdenskritums
    waterfall: {
      loading: 'Ielādē...',
      noMore: 'Nav vairāk datu',
      empty: 'Nav datu'
    },
    // Apraksti
    descriptions: {
      colon: ':'
    },
    // Slīdnis
    slider: {
      tipFormatter: '{value}'
    },
    // Slēdzis
    switch: {
      on: 'ON',
      off: 'OFF'
    },
    // Izvēles rūtiņa
    checkbox: {
      selectAll: 'Izvēlēties visu'
    },
    // Radio
    radio: {},
    // Izvēlne
    menu: {
      collapse: 'Sakļaut izvēlni',
      expand: 'Izvērst izvēlni'
    },
    // Karte
    card: {
      collapse: 'Sakļaut',
      expand: 'Izvērst'
    },
    // Sakļaut
    collapse: {
      expand: 'Izvērst',
      collapse: 'Sakļaut'
    },
    // Padoms
    tooltip: {},
    // Izlecošais logs
    popover: {},
    // Nozīme
    badge: {},
    // Avatārs
    avatar: {
      error: 'Ielādes kļūda'
    },
    // Ūdenszīme
    watermark: {},
    // Atdalītājs
    divider: {},
    // Karuselis
    carousel: {
      prev: 'Iepriekšējais',
      next: 'Nākamais'
    },
    // Marquee
    marquee: {},
    // Piestiprināšana
    affix: {},
    // Enkura
    anchor: {},
    // Mention
    mention: {
      placeholder: 'Lūdzu, ievadiet',
      loading: 'Ielādē...',
      noData: 'Nav datu'
    },
    skuselector: {
      placeholder: 'Izvēlieties specifikācijas',
      emptyText: 'Nav specifikāciju',
      stock: 'Krājums',
      price: 'Cena',
      selected: 'Izvēlēts',
      outOfStock: 'Nav noliktavā'
    },
    productcard: {
      viewDetails: 'Skatīt informāciju',
      buyNow: 'Pirkt tagad',
      addToCart: 'Pievienot grozam',
      sold: 'Pārdots',
      soldOut: 'Izpārdots',
      vip: 'VIP'
    },
    price: {
      original: 'Sākotnējā'
    },
    couponcard: {
      available: 'Saņemt tagad',
      used: 'Izmantots',
      expired: 'Beidzies termiņš',
      received: 'Saņemts',
      limit: 'Pasūtījumiem virs {threshold}',
      noThreshold: 'Bez minimālās summas',
      validPeriod: 'Derīguma periods',
      ruleTitle: 'Lietošanas noteikumi'
    },
    luckydraw: {
      start: 'Sākt',
      drawing: 'Notiek izloze...',
      end: 'Uzvarētājs!',
      retry: 'Mēģināt vēlreiz'
    },
    filterbar: {
      all: 'Visi',
      sort: 'Kārtot',
      filter: 'Filtrs',
      cancel: 'Atcelt',
      reset: 'Atiestatīt',
      confirm: 'Apstiprināt',
      noOptions: 'Nav iespēju',
      asc: 'Augošā secībā',
      desc: 'Dilstošā secībā',
      selected: 'Izvēlēts'
    },
    submitbar: {
      total: 'Kopā: ',
      selected: '{count} izvēlēti',
      submit: 'Uz apmaksu',
      allSelect: 'Izvēlēties visu'
    },
    categorynav: {
      all: 'Visi',
      noData: 'Nav datu',
      loading: 'Ielādē...'
    },
    smartaddress: {
      placeholder:
        'Ielīmējiet adresi šeit, vārds, tālrunis un atrašanās vieta tiks noteikti automātiski',
      parse: 'Viedā analīze',
      province: 'Province/Pilsēta/Rajons',
      city: 'Pilsēta',
      district: 'Rajons/Novads',
      street: 'Iela/Ciems',
      detail: 'Detalizēta adrese',
      phone: 'Tālrunis',
      name: 'Saņēmējs',
      parseSuccess: 'Adrese veiksmīgi atpazīta',
      parseFailed: 'Atpazīšana neizdevās, lūdzu aizpildiet manuāli',
      required: 'Lūdzu, ievadiet pilnu adresi',
      provinceKeywords: ['Province', 'Reģions'],
      cityKeywords: ['Pilsēta', 'Novads'],
      districtKeywords: ['Rajons', 'Novads', 'Pagasts'],
      streetKeywords: ['Iela', 'Ceļš', 'Prospekts', 'Šķērsiela']
    },
    ganttchart: {
      taskName: 'Uzdevuma nosaukums',
      searchPlaceholder: 'Meklēt uzdevumus...',
      zoom: 'Tālummaiņa',
      day: 'Diena',
      week: 'Nedēļa',
      month: 'Mēnesis',
      year: 'Gads',
      milestone: 'Atskaites punkts'
    },
    imagemagnifier: {
      switchToImage: 'Pārslēgt uz attēlu {index}',
      galleryItem: 'Galerija {index}',
      close: 'Aizvērt'
    },
    // AI Components
    ai: {
      bubble: {
        citations: 'Atsauces'
      },
      mention: {
        placeholder: '@ Minēt Aģentu, Dokumentu vai Tabulu...',
        agent: 'Aģents',
        document: 'Dokuments',
        table: 'Tabula',
        knowledge: 'Zināšanas'
      },
      codeBlock: {
        copyCode: 'Kopēt kodu',
        copied: 'Kopēts!',
        run: 'Palaist kodu',
        edit: 'Rediģēt',
        save: 'Saglabāt',
        cancel: 'Atcelt'
      },
      codeRunner: {
        run: 'Palaist',
        stop: 'Apturēt',
        clear: 'Notīrīt',
        reset: 'Atiestatīt',
        placeholder: 'Noklikšķiniet uz Palaist, lai izpildītu kodu...'
      },
      sender: {
        placeholder: 'Sūtīt ziņu...',
        dragTip: 'Atlaidiet, lai augšupielādētu failus'
      },
      thoughtChain: {
        thoughtProcess: 'Domāšanas process',
        thinking: 'Domā...',
        defaultTitle: 'Jauns solis',
        addNode: 'Pievienot soli'
      },
      thinking: {
        start: 'Sākt domāt',
        thinking: 'Domā...',
        complete: 'Domāšana pabeigta',
        error: 'Domāšanas kļūda'
      },
      welcome: {
        title: 'Sveiks, es esmu YH AI',
        description:
          'Es varu palīdzēt jums ar programmēšanu, dokumentu tulkošanu vai radošo rakstīšanu. Ko es varu darīt jums šodien?'
      },
      action: {
        copy: 'Kopēt',
        regenerate: 'Regenerēt',
        share: 'Kopīgot',
        like: 'Patīk',
        dislike: 'Nepatīk',
        edit: 'Rediģēt',
        delete: 'Dzēst'
      },
      artifacts: {
        preview: 'Priekšskatījums',
        inline: 'Inline',
        code: 'Avota kods',
        versions: 'Versijas',
        rendering: 'Renderē komponentu...',
        renderingChart: 'Renderē diagrammu...',
        renderingCanvas: 'Sagatavo audeklu...'
      },
      voice: {
        trigger: 'Noklikšķiniet, lai runātu',
        listening: 'Klausās...'
      },
      agent: {
        uses: 'lietošanas',
        use: 'Lietot tūlīt',
        favorite: 'Favorīts',
        unfavorite: 'Noņemt no favorītiem',
        share: 'Kopīgot',
        online: 'Tiešsaistē',
        offline: 'Bezsaistē',
        busy: 'Aizņemts',
        verified: 'Pārbaudīts',
        rating: 'Vērtējums',
        reviews: 'atsauksmes',
        responseTime: 'Vidējais atbildes laiks',
        ms: 'ms'
      },
      sources: {
        references: 'Atsauces',
        referencedSources: 'Atsauktie avoti',
        relevant: 'Atbilstība',
        viewOriginal: 'Skatīt oriģinālu',
        showAll: 'Rādīt visus',
        more: 'vairāk avotu',
        drawerTitle: 'Atsauces',
        expandMore: 'Rādīt vairāk',
        collapseMore: 'Sakļaut',
        noSources: 'Nav avotu',
        today: 'Šodien',
        last7Days: 'Pēdējās 7 dienas',
        last30Days: 'Pēdējās 30 dienas',
        earlier: 'Agrāk',
        pinned: 'Piestiprināts'
      },
      conversations: {
        today: 'Šodien',
        last7Days: 'Pēdējās 7 dienas',
        last30Days: 'Pēdējās 30 dienas',
        earlier: 'Agrāk',
        pinned: 'Piestiprināts',
        pin: 'Piestiprināt',
        unpin: 'Noņemt',
        newConversation: 'Jauna saruna',
        noData: 'Sarunu vēl nav',
        rename: 'Pārdēvēt',
        delete: 'Dzēst',
        deleteConfirm: 'Vai tiešām vēlaties dzēst šo sarunu?'
      },
      attachments: {
        dropTip: 'Nometiet failus šeit, lai augšupielādētu',
        clickToUpload: 'Noklikšķiniet vai velciet failus augšupielādei',
        uploadSuccess: 'Augšupielāde veiksmīga',
        uploadError: 'Augšupielāde neizdevās',
        deleteConfirm: 'Vai tiešām vēlaties dzēst šo failu?',
        fileTooLarge: 'Faila izmērs nedrīkst pārsniegt {size}',
        invalidFileType: 'Nederīgs faila tips'
      },
      mermaid: {
        image: 'Attēls',
        code: 'Kods',
        zoomIn: 'Pietuvināt',
        zoomOut: 'Attālināt',
        reset: 'Atiestatīt',
        download: 'Lejupielādēt',
        copyCode: 'Kopēt kodu',
        rendering: 'Renderē...',
        renderError: 'Renderēšana neizdevās',
        renderSuccess: 'Renderēšana izdevās',
        retry: 'Mēģināt vēlreiz'
      }
    }
  }
}

export default lv
