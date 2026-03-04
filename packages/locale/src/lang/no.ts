import type { Language } from '../index'

export const no: Language = {
  name: 'no',
  yh: {
    // Felles
    common: {
      yes: 'Ja',
      no: 'Nei',
      confirm: 'Bekreft',
      cancel: 'Avbryt',
      loading: 'Laster',
      close: 'Lukk',
      clear: 'Tøm',
      reset: 'Tilbakestill',
      save: 'Lagre',
      delete: 'Slett',
      edit: 'Rediger',
      add: 'Legg til',
      search: 'Søk',
      refresh: 'Oppdater',
      expand: 'Utvid',
      collapse: 'Skjul',
      more: 'Mer',
      noData: 'Ingen data',
      noMatch: 'Ingen matchende data',
      selectAll: 'Velg alle',
      unselectAll: 'Fjern valg fra alle'
    },
    // Fargevelger
    colorpicker: {
      confirm: 'OK',
      clear: 'Tøm',
      eyeDropper: 'Pipett',
      suggestionDark: 'Hvit tekst er best',
      suggestionLight: 'Svart tekst er best',
      recentColors: 'Siste farger',
      presetColors: 'Forhåndsinnstilte farger'
    },
    // Dato velger
    datepicker: {
      now: 'Nå',
      today: 'I dag',
      cancel: 'Avbryt',
      clear: 'Tøm',
      confirm: 'OK',
      selectDate: 'Velg dato',
      selectTime: 'Velg tid',
      startDate: 'Startdato',
      startTime: 'Starttid',
      endDate: 'Sluttdato',
      endTime: 'Sluttid',
      year: '',
      month: '',
      day: '',
      week: 'Uke',
      monthBeforeYear: true,
      prevYear: 'Forrige år',
      nextYear: 'Neste år',
      prevMonth: 'Forrige måned',
      nextMonth: 'Neste måned',
      weeks: {
        sun: 'Søn',
        mon: 'Man',
        tue: 'Tir',
        wed: 'Ons',
        thu: 'Tor',
        fri: 'Fre',
        sat: 'Lør'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'Mai',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
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
    // Tid velger
    timepicker: {
      confirm: 'OK',
      cancel: 'Avbryt',
      now: 'Nå',
      placeholder: 'Velg tid',
      startPlaceholder: 'Starttid',
      endPlaceholder: 'Sluttid',
      selectTime: 'Velg tid'
    },
    // Tid valg
    timeselect: {
      placeholder: 'Velg tid'
    },
    // Tre
    tree: {
      emptyText: 'Ingen data',
      loading: 'Laster...',
      checkAll: 'Velg alle',
      uncheckAll: 'Fjern valg fra alle',
      expandAll: 'Utvid alle',
      collapseAll: 'Skjul alle'
    },
    // Tre valg
    treeselect: {
      placeholder: 'Velg',
      emptyText: 'Ingen data',
      loading: 'Laster...',
      noMatch: 'Ingen matchende data'
    },
    // Kalender
    calendar: {
      prevMonth: 'Forrige måned',
      nextMonth: 'Neste måned',
      prevYear: 'Forrige år',
      nextYear: 'Neste år',
      today: 'I dag',
      week: 'Uke',
      holiday: 'Helligdag',
      workday: 'Arbeid',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Søn',
        mon: 'Man',
        tue: 'Tir',
        wed: 'Ons',
        thu: 'Tor',
        fri: 'Fre',
        sat: 'Lør'
      }
    },
    // Autofullføring
    autocomplete: {
      loading: 'Laster...',
      placeholder: 'Vennligst skriv inn',
      noData: 'Ingen data',
      noMatch: 'Ingen matchende data'
    },
    // Nedtelling
    countdown: {
      days: 'dager',
      hours: 'timer',
      minutes: 'minutter',
      seconds: 'sekunder',
      milliseconds: 'millisekunder',
      finished: 'Ferdig'
    },
    // Kaskade velger
    cascader: {
      noMatch: 'Ingen matchende data',
      placeholder: 'Velg',
      loading: 'Laster...',
      noData: 'Ingen data'
    },
    // Overføring
    transfer: {
      noMatch: 'Ingen matchende data',
      noData: 'Ingen data',
      titles: ['Liste 1', 'Liste 2'],
      filterPlaceholder: 'Skriv inn nøkkelord',
      noCheckedFormat: '{total} elementer',
      hasCheckedFormat: '{checked}/{total} valgt',
      searchPlaceholder: 'Skriv inn nøkkelord'
    },
    // Tabell
    table: {
      emptyText: 'Ingen data',
      confirmFilter: 'Bekreft',
      resetFilter: 'Tilbakestill',
      clearFilter: 'Alle',
      sumText: 'Sum',
      loading: 'Laster...',
      index: 'Indeks',
      print: 'Skriv ut',
      cancel: 'Avbryt',
      preview: 'Forhåndsvisning av utskrift',
      printTime: 'Utskriftstid',
      total: 'Totalt {total} elementer',
      page: 'Side {page}',
      yes: 'Ja',
      no: 'Nei',
      // Verktøylinje
      toolbar: {
        refresh: 'Oppdater',
        density: 'Tetthet',
        densityDefault: 'Standard',
        densityLarge: 'Stor',
        densitySmall: 'Liten',
        columnSetting: 'Kolonneinnstillinger',
        fullscreen: 'Fullskjerm',
        exitFullscreen: 'Avslutt fullskjerm',
        export: 'Eksporter',
        import: 'Importer',
        search: 'Søk',
        searchPlaceholder: 'Skriv inn nøkkelord for å søke'
      },
      // Filter
      filter: {
        selectAll: 'Velg alle',
        selectInvert: 'Inverter valg',
        empty: 'Er tom',
        notEmpty: 'Er ikke tom',
        contains: 'Inneholder',
        notContains: 'Inneholder ikke',
        equals: 'Lik med',
        notEquals: 'Ikke lik med',
        startsWith: 'Starter med',
        endsWith: 'Slutter med',
        greaterThan: 'Større enn',
        lessThan: 'Mindre enn',
        between: 'Mellom'
      },
      // Sortering
      sort: {
        asc: 'Stigende',
        desc: 'Synkende',
        clear: 'Tøm sortering'
      },
      // Eksport
      export: {
        title: 'Eksporter data',
        filename: 'Filnavn',
        type: 'Filtype',
        scope: 'Eksportomfang',
        scopeAll: 'Alle data',
        scopeSelected: 'Valgte data',
        scopeCurrentPage: 'Gjeldende side',
        includeHeader: 'Inkluder overskrift',
        exporting: 'Eksporterer...',
        success: 'Eksport lyktes',
        error: 'Eksport mislyktes'
      },
      // Import
      import: {
        title: 'Importer data',
        selectFile: 'Velg fil',
        dragTip: 'Klikk eller dra fil hit for å laste opp',
        importing: 'Importerer...',
        success: 'Import lyktes',
        error: 'Import mislyktes',
        preview: 'Dataforhåndsvisning',
        confirm: 'Bekreft import'
      },
      // Utskrift
      printConfig: {
        title: 'Utskriftsinnstillinger',
        pageTitle: 'Sidetittel',
        pageHeader: 'Overskrift',
        pageFooter: 'Bunntekst',
        printAll: 'Skriv ut alle',
        printSelected: 'Skriv ut valgte',
        printCurrentPage: 'Skriv ut gjeldende side',
        landscape: 'Landskap',
        portrait: 'Portrett',
        printing: 'Skriver ut...'
      },
      // Kolonneinnstillinger
      columnSetting: {
        title: 'Kolonneinnstillinger',
        showAll: 'Vis alle',
        hideAll: 'Skjul alle',
        reset: 'Tilbakestill',
        fixedLeft: 'Fest til venstre',
        fixedRight: 'Fest til høyre',
        unfixed: 'Frigjør'
      },
      // Kontekstmeny
      contextMenu: {
        copy: 'Kopier',
        copyRow: 'Kopier rad',
        copyCell: 'Kopier celle',
        paste: 'Lim inn',
        insertRowAbove: 'Sett inn rad over',
        insertRowBelow: 'Sett inn rad under',
        deleteRow: 'Slett rad',
        deleteSelectedRows: 'Slett valgte rader',
        exportSelected: 'Eksporter valgte'
      },
      // Valg
      selection: {
        selectAll: 'Velg alle',
        selectInvert: 'Inverter valg',
        selectNone: 'Tøm valg',
        selected: '{count} elementer valgt'
      },
      // Utvid
      expand: {
        expandAll: 'Utvid alle',
        collapseAll: 'Skjul alle'
      },
      // Tre
      tree: {
        expandAll: 'Utvid alle',
        collapseAll: 'Skjul alle',
        expandLevel: 'Utvid til nivå {level}'
      },
      // Dra
      drag: {
        dragTip: 'Dra for å omorganisere',
        dropTip: 'Slipp for å plassere'
      }
    },
    // Meldingsboks
    messagebox: {
      title: 'Melding',
      confirm: 'OK',
      cancel: 'Avbryt',
      close: 'Lukk',
      error: 'Ugyldig inndata',
      alert: 'Advarsel',
      prompt: 'Prompt',
      inputPlaceholder: 'Vennligst skriv inn'
    },
    // Opplasting
    upload: {
      deleteTip: 'trykk delete for å fjerne',
      delete: 'Slett',
      preview: 'Forhåndsvisning',
      continue: 'Fortsett',
      upload: 'Klikk for å laste opp',
      tip: 'Klikk eller dra fil til dette området for å <em>laste opp</em>',
      dragTip: 'Slipp fil her eller klikk for å laste opp',
      uploading: 'Laster opp...',
      success: 'Opplasting lyktes',
      error: 'Opplasting mislyktes',
      retry: 'Prøv igjen',
      cancel: 'Avbryt opplasting',
      fileTypeError: 'Filtype støttes ikke',
      fileSizeError: 'Filstørrelse overskrider grense',
      fileCountError: 'Filantall overskrider grense'
    },
    // Skjema
    form: {
      validationFailed: 'Validering mislyktes',
      required: 'Påkrevd',
      pleaseInput: 'Vennligst skriv inn',
      pleaseSelect: 'Vennligst velg'
    },
    // Knapp
    button: {
      loading: 'Laster...'
    },
    // Inndata
    input: {
      placeholder: 'Vennligst skriv inn',
      clear: 'Tøm',
      showPassword: 'Vis passord',
      hidePassword: 'Skjul passord',
      copy: 'Kopier',
      copied: 'Kopiert'
    },
    // Nummerinndata
    inputnumber: {
      placeholder: 'Vennligst skriv inn nummer',
      increase: 'Øk',
      decrease: 'Reduser'
    },
    // Taginndata
    inputtag: {
      placeholder: 'Vennligst skriv inn',
      add: 'Legg til',
      remove: 'Fjern'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'Mer'
    },
    // Tilbake til toppen
    backtop: {
      text: 'Tilbake til toppen'
    },
    // Velg
    select: {
      placeholder: 'Vennligst velg',
      noData: 'Ingen data',
      loading: 'Laster...',
      noMatch: 'Ingen matchende data',
      selectAll: 'Velg alle',
      clearAll: 'Tøm alle'
    },
    // Paginering
    pagination: {
      goto: 'Gå til',
      page: '',
      total: 'Totalt {total}',
      pageSize: '/side',
      prev: 'Forrige',
      next: 'Neste',
      first: 'Første',
      last: 'Siste',
      pageClassifier: ''
    },
    // Popbekreftelse
    popconfirm: {
      confirm: 'OK',
      cancel: 'Avbryt',
      dontAskAgain: 'Ikke spør igjen'
    },
    // Dialog
    dialog: {
      confirm: 'OK',
      cancel: 'Avbryt',
      close: 'Lukk',
      maximize: 'Maksimer',
      restore: 'Gjenopprett'
    },
    // Skuff
    drawer: {
      close: 'Lukk',
      confirm: 'OK',
      cancel: 'Avbryt'
    },
    // Nedtrekksmeny
    dropdown: {
      loading: 'Laster...'
    },
    // Bilde
    image: {
      error: 'MISLYKTES',
      loading: 'Laster...',
      preview: 'Forhåndsvisning',
      zoomIn: 'Zoom inn',
      zoomOut: 'Zoom ut',
      rotateLeft: 'Roter venstre',
      rotateRight: 'Roter høyre',
      originalSize: 'Opprinnelig størrelse',
      fullscreen: 'Fullskjerm'
    },
    // Bildeviser
    imageviewer: {
      close: 'Lukk',
      prev: 'Forrige',
      next: 'Neste',
      zoomIn: 'Zoom inn',
      zoomOut: 'Zoom ut',
      rotateLeft: 'Roter venstre',
      rotateRight: 'Roter høyre',
      reset: 'Tilbakestill',
      fullscreen: 'Fullskjerm',
      exitFullscreen: 'Avslutt fullskjerm'
    },
    // Uendelig rulling
    infinitescroll: {
      loading: 'Laster...',
      finished: 'Ikke mer data',
      error: 'Lasting mislyktes, klikk for å prøve igjen',
      retry: 'Klikk for å prøve igjen'
    },
    // Melding
    message: {
      close: 'Lukk'
    },
    // Varsling
    notification: {
      close: 'Lukk'
    },
    // Lasting
    loading: {
      text: 'Laster...'
    },
    // Spinn
    spin: {
      text: 'Laster...'
    },
    // Vurdering
    rate: {
      texts: ['Ekstremt dårlig', 'Skuffet', 'Rimelig', 'Fornøyd', 'Overrasket']
    },
    // Advarsel
    alert: {
      close: 'Lukk'
    },
    // Tag
    tag: {
      close: 'Lukk'
    },
    // Faner
    tabs: {
      close: 'Lukk',
      add: 'Legg til',
      more: 'Mer'
    },
    // Steg
    steps: {
      finish: 'Ferdig',
      process: 'Pågår',
      wait: 'Venter',
      error: 'Feil'
    },
    // Fremgang
    progress: {
      success: 'Suksess',
      exception: 'Unntak',
      warning: 'Advarsel'
    },
    // Skjelett
    skeleton: {
      loading: 'Laster...'
    },
    // Tom
    empty: {
      description: 'Ingen data',
      noData: 'Ingen data',
      noResult: 'Ingen resultater',
      networkError: 'Nettverksfeil',
      serverError: 'Serverfeil'
    },
    // Resultat
    result: {
      success: 'Suksess',
      error: 'Feil',
      warning: 'Advarsel',
      info: 'Info',
      backHome: 'Tilbake til hjem'
    },
    // Vannfall
    waterfall: {
      loading: 'Laster...',
      noMore: 'Ikke mer data',
      empty: 'Ingen data'
    },
    // Beskrivelser
    descriptions: {
      colon: ':'
    },
    // Skyveknapp
    slider: {
      tipFormatter: '{value}'
    },
    // Bryter
    switch: {
      on: 'PÅ',
      off: 'AV'
    },
    // Avkryssingsboks
    checkbox: {
      selectAll: 'Velg alle'
    },
    // Radio
    radio: {},
    // Meny
    menu: {
      collapse: 'Skjul meny',
      expand: 'Utvid meny'
    },
    // Kort
    card: {
      collapse: 'Skjul',
      expand: 'Utvid'
    },
    // Skjul
    collapse: {
      expand: 'Utvid',
      collapse: 'Skjul'
    },
    // Verktøytips
    tooltip: {},
    // Popover
    popover: {},
    // Merke
    badge: {},
    // Avatar
    avatar: {
      error: 'Lasting mislyktes'
    },
    // Vannmerke
    watermark: {},
    // Skilletegn
    divider: {},
    // Karusell
    carousel: {
      prev: 'Forrige',
      next: 'Neste'
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Anker
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

export default no
