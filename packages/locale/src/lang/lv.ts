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
      placeholder: 'Please input',
      loading: 'Loading...',
      noData: 'No Data'
    },
    // AI Components
    ai: {
      bubble: {
        citations: 'Citations'
      },
      mention: {
        placeholder: '@ Mention Agent, Doc or Table...',
        agent: 'Agent',
        document: 'Document',
        table: 'Table',
        knowledge: 'Knowledge'
      },
      codeBlock: {
        copyCode: 'Copy code',
        copied: 'Copied!',
        run: 'Run Code',
        edit: 'Edit',
        save: 'Save',
        cancel: 'Cancel'
      },
      codeRunner: {
        run: 'Run',
        stop: 'Stop',
        clear: 'Clear',
        reset: 'Reset',
        placeholder: 'Click Run to execute the code...'
      },
      sender: {
        placeholder: 'Send a message...',
        dragTip: 'Release to upload files'
      },
      thoughtChain: {
        thoughtProcess: 'Thought process',
        thinking: 'Thinking...',
        defaultTitle: 'New step',
        addNode: 'Add step'
      },
      thinking: {
        start: 'Start thinking',
        thinking: 'Thinking...',
        complete: 'Thinking complete',
        error: 'Thinking error'
      },
      welcome: {
        title: 'Hello, I am YH AI',
        description:
          'I can help you with coding, translating documents, or creative writing. What can I do for you today?'
      },
      action: {
        copy: 'Copy',
        regenerate: 'Regenerate',
        share: 'Share',
        like: 'Like',
        dislike: 'Dislike',
        edit: 'Edit',
        delete: 'Delete'
      },
      artifacts: {
        preview: 'Preview',
        inline: 'Inline',
        code: 'Source',
        versions: 'Versions',
        rendering: 'Rendering component...',
        renderingChart: 'Rendering chart...',
        renderingCanvas: 'Preparing canvas...'
      },
      voice: {
        trigger: 'Click to Speak',
        listening: 'Listening...'
      },
      agent: {
        uses: 'uses',
        use: 'Use Now',
        favorite: 'Favorite',
        unfavorite: 'Unfavorite',
        share: 'Share',
        online: 'Online',
        offline: 'Offline',
        busy: 'Busy',
        verified: 'Verified',
        rating: 'Rating',
        reviews: 'reviews',
        responseTime: 'Avg. Response',
        ms: 'ms'
      },
      sources: {
        references: 'References',
        referencedSources: 'Referenced Sources',
        relevant: 'Relevance',
        viewOriginal: 'View Original',
        showAll: 'Show All',
        more: 'more sources',
        drawerTitle: 'References',
        expandMore: 'Show More',
        collapseMore: 'Collapse',
        noSources: 'No sources',
        today: 'Today',
        last7Days: 'Last 7 Days',
        last30Days: 'Last 30 Days',
        earlier: 'Earlier',
        pinned: 'Pinned'
      },
      conversations: {
        today: 'Today',
        last7Days: 'Last 7 Days',
        last30Days: 'Last 30 Days',
        earlier: 'Earlier',
        pinned: 'Pinned',
        pin: 'Pin',
        unpin: 'Unpin',
        newConversation: 'New Conversation',
        rename: 'Rename',
        delete: 'Delete',
        deleteConfirm: 'Confirm delete this conversation?'
      }
    }
  }
}

export default lv
