import type { Language } from '../index'

export const it: Language = {
  name: 'it',
  yh: {
    // Comune
    common: {
      yes: 'Sì',
      no: 'No',
      confirm: 'Conferma',
      cancel: 'Annulla',
      loading: 'Caricamento',
      close: 'Chiudi',
      clear: 'Cancella',
      reset: 'Reimposta',
      save: 'Salva',
      delete: 'Elimina',
      edit: 'Modifica',
      add: 'Aggiungi',
      search: 'Cerca',
      refresh: 'Aggiorna',
      expand: 'Espandi',
      collapse: 'Comprimi',
      more: 'Altro',
      noData: 'Nessun dato',
      noMatch: 'Nessun dato corrispondente',
      selectAll: 'Seleziona tutto',
      unselectAll: 'Deseleziona tutto'
    },
    // Selettore colori
    colorpicker: {
      confirm: 'OK',
      clear: 'Cancella',
      eyeDropper: 'Contagocce',
      suggestionDark: 'Testo bianco è migliore',
      suggestionLight: 'Testo nero è migliore',
      recentColors: 'Colori recenti',
      presetColors: 'Colori preimpostati'
    },
    // Selettore data
    datepicker: {
      now: 'Ora',
      today: 'Oggi',
      cancel: 'Annulla',
      clear: 'Cancella',
      confirm: 'OK',
      selectDate: 'Seleziona data',
      selectTime: 'Seleziona ora',
      startDate: 'Data di inizio',
      startTime: 'Ora di inizio',
      endDate: 'Data di fine',
      endTime: 'Ora di fine',
      year: '',
      month: '',
      day: '',
      week: 'Settimana',
      monthBeforeYear: true,
      prevYear: 'Anno precedente',
      nextYear: 'Anno successivo',
      prevMonth: 'Mese precedente',
      nextMonth: 'Mese successivo',
      weeks: {
        sun: 'Dom',
        mon: 'Lun',
        tue: 'Mar',
        wed: 'Mer',
        thu: 'Gio',
        fri: 'Ven',
        sat: 'Sab'
      },
      months: {
        jan: 'Gen',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'Mag',
        jun: 'Giu',
        jul: 'Lug',
        aug: 'Ago',
        sep: 'Set',
        oct: 'Ott',
        nov: 'Nov',
        dec: 'Dic'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Selettore ora
    timepicker: {
      confirm: 'OK',
      cancel: 'Annulla',
      now: 'Ora',
      placeholder: 'Seleziona ora',
      startPlaceholder: 'Ora di inizio',
      endPlaceholder: 'Ora di fine',
      selectTime: 'Seleziona ora'
    },
    // Selezione ora
    timeselect: {
      placeholder: 'Seleziona ora'
    },
    // Albero
    tree: {
      emptyText: 'Nessun dato',
      loading: 'Caricamento...',
      checkAll: 'Seleziona tutto',
      uncheckAll: 'Deseleziona tutto',
      expandAll: 'Espandi tutto',
      collapseAll: 'Comprimi tutto'
    },
    // Selezione albero
    treeselect: {
      placeholder: 'Seleziona',
      emptyText: 'Nessun dato',
      loading: 'Caricamento...',
      noMatch: 'Nessun dato corrispondente'
    },
    // Calendario
    calendar: {
      prevMonth: 'Mese precedente',
      nextMonth: 'Mese successivo',
      prevYear: 'Anno precedente',
      nextYear: 'Anno successivo',
      today: 'Oggi',
      week: 'Settimana',
      holiday: 'Festività',
      workday: 'Lavoro',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Dom',
        mon: 'Lun',
        tue: 'Mar',
        wed: 'Mer',
        thu: 'Gio',
        fri: 'Ven',
        sat: 'Sab'
      }
    },
    // Completamento automatico
    autocomplete: {
      loading: 'Caricamento...',
      placeholder: 'Inserisci',
      noData: 'Nessun dato',
      noMatch: 'Nessun dato corrispondente'
    },
    // Conto alla rovescia
    countdown: {
      days: 'giorni',
      hours: 'ore',
      minutes: 'minuti',
      seconds: 'secondi',
      milliseconds: 'millisecondi',
      finished: 'Finito'
    },
    // Selettore a cascata
    cascader: {
      noMatch: 'Nessun dato corrispondente',
      placeholder: 'Seleziona',
      loading: 'Caricamento...',
      noData: 'Nessun dato'
    },
    // Trasferimento
    transfer: {
      noMatch: 'Nessun dato corrispondente',
      noData: 'Nessun dato',
      titles: ['Lista 1', 'Lista 2'],
      filterPlaceholder: 'Inserisci parola chiave',
      noCheckedFormat: '{total} elementi',
      hasCheckedFormat: '{checked}/{total} selezionati',
      searchPlaceholder: 'Inserisci parola chiave'
    },
    // Tabella
    table: {
      emptyText: 'Nessun dato',
      confirmFilter: 'Conferma',
      resetFilter: 'Reimposta',
      clearFilter: 'Tutti',
      sumText: 'Somma',
      loading: 'Caricamento...',
      index: 'Indice',
      print: 'Stampa',
      cancel: 'Annulla',
      preview: 'Anteprima di stampa',
      printTime: 'Ora di stampa',
      total: 'Totale {total} elementi',
      page: 'Pagina {page}',
      yes: 'Sì',
      no: 'No',
      // Barra degli strumenti
      toolbar: {
        refresh: 'Aggiorna',
        density: 'Densità',
        densityDefault: 'Predefinito',
        densityLarge: 'Grande',
        densitySmall: 'Piccolo',
        columnSetting: 'Impostazioni colonne',
        fullscreen: 'Schermo intero',
        exitFullscreen: 'Esci da schermo intero',
        export: 'Esporta',
        import: 'Importa',
        search: 'Cerca',
        searchPlaceholder: 'Inserisci parole chiave per cercare'
      },
      // Filtro
      filter: {
        selectAll: 'Seleziona tutto',
        selectInvert: 'Inverti selezione',
        empty: 'È vuoto',
        notEmpty: 'Non è vuoto',
        contains: 'Contiene',
        notContains: 'Non contiene',
        equals: 'Uguale a',
        notEquals: 'Diverso da',
        startsWith: 'Inizia con',
        endsWith: 'Termina con',
        greaterThan: 'Maggiore di',
        lessThan: 'Minore di',
        between: 'Tra'
      },
      // Ordinamento
      sort: {
        asc: 'Crescente',
        desc: 'Decrescente',
        clear: 'Cancella ordinamento'
      },
      // Esportazione
      export: {
        title: 'Esporta dati',
        filename: 'Nome file',
        type: 'Tipo di file',
        scope: 'Ambito di esportazione',
        scopeAll: 'Tutti i dati',
        scopeSelected: 'Dati selezionati',
        scopeCurrentPage: 'Pagina corrente',
        includeHeader: 'Includi intestazione',
        exporting: 'Esportazione...',
        success: 'Esportazione riuscita',
        error: 'Esportazione fallita'
      },
      // Importazione
      import: {
        title: 'Importa dati',
        selectFile: 'Seleziona file',
        dragTip: 'Clicca o trascina il file qui per caricare',
        importing: 'Importazione...',
        success: 'Importazione riuscita',
        error: 'Importazione fallita',
        preview: 'Anteprima dati',
        confirm: 'Conferma importazione'
      },
      // Stampa
      printConfig: {
        title: 'Impostazioni di stampa',
        pageTitle: 'Titolo pagina',
        pageHeader: 'Intestazione',
        pageFooter: 'Piè di pagina',
        printAll: 'Stampa tutto',
        printSelected: 'Stampa selezionato',
        printCurrentPage: 'Stampa pagina corrente',
        landscape: 'Orizzontale',
        portrait: 'Verticale',
        printing: 'Stampa...'
      },
      // Impostazioni colonne
      columnSetting: {
        title: 'Impostazioni colonne',
        showAll: 'Mostra tutto',
        hideAll: 'Nascondi tutto',
        reset: 'Reimposta',
        fixedLeft: 'Fissa a sinistra',
        fixedRight: 'Fissa a destra',
        unfixed: 'Rimuovi fissaggio'
      },
      // Menu contestuale
      contextMenu: {
        copy: 'Copia',
        copyRow: 'Copia riga',
        copyCell: 'Copia cella',
        paste: 'Incolla',
        insertRowAbove: 'Inserisci riga sopra',
        insertRowBelow: 'Inserisci riga sotto',
        deleteRow: 'Elimina riga',
        deleteSelectedRows: 'Elimina righe selezionate',
        exportSelected: 'Esporta selezionato'
      },
      // Selezione
      selection: {
        selectAll: 'Seleziona tutto',
        selectInvert: 'Inverti selezione',
        selectNone: 'Cancella selezione',
        selected: '{count} elementi selezionati'
      },
      // Espandi
      expand: {
        expandAll: 'Espandi tutto',
        collapseAll: 'Comprimi tutto'
      },
      // Albero
      tree: {
        expandAll: 'Espandi tutto',
        collapseAll: 'Comprimi tutto',
        expandLevel: 'Espandi al livello {level}'
      },
      // Trascina
      drag: {
        dragTip: 'Trascina per riordinare',
        dropTip: 'Rilascia per posizionare'
      }
    },
    // Finestra messaggio
    messagebox: {
      title: 'Messaggio',
      confirm: 'OK',
      cancel: 'Annulla',
      close: 'Chiudi',
      error: 'Input non valido',
      alert: 'Avviso',
      prompt: 'Richiesta',
      inputPlaceholder: 'Inserisci'
    },
    // Caricamento
    upload: {
      deleteTip: 'premi delete per rimuovere',
      delete: 'Elimina',
      preview: 'Anteprima',
      continue: 'Continua',
      upload: 'Clicca per caricare',
      tip: 'Clicca o trascina il file in quest\'area per <em>caricare</em>',
      dragTip: 'Rilascia il file qui o clicca per caricare',
      uploading: 'Caricamento...',
      success: 'Caricamento riuscito',
      error: 'Caricamento fallito',
      retry: 'Riprova',
      cancel: 'Annulla caricamento',
      fileTypeError: 'Tipo di file non supportato',
      fileSizeError: 'Dimensione file supera il limite',
      fileCountError: 'Numero di file supera il limite'
    },
    // Modulo
    form: {
      validationFailed: 'Validazione fallita',
      required: 'Obbligatorio',
      pleaseInput: 'Inserisci',
      pleaseSelect: 'Seleziona'
    },
    // Pulsante
    button: {
      loading: 'Caricamento...'
    },
    // Input
    input: {
      placeholder: 'Inserisci',
      clear: 'Cancella',
      showPassword: 'Mostra password',
      hidePassword: 'Nascondi password',
      copy: 'Copia',
      copied: 'Copiato'
    },
    // Input numero
    inputnumber: {
      placeholder: 'Inserisci numero',
      increase: 'Aumenta',
      decrease: 'Diminuisci'
    },
    // Input tag
    inputtag: {
      placeholder: 'Inserisci',
      add: 'Aggiungi',
      remove: 'Rimuovi'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'Altro'
    },
    // Torna su
    backtop: {
      text: 'Torna su'
    },
    // Selezione
    select: {
      placeholder: 'Seleziona',
      noData: 'Nessun dato',
      loading: 'Caricamento...',
      noMatch: 'Nessun dato corrispondente',
      selectAll: 'Seleziona tutto',
      clearAll: 'Cancella tutto'
    },
    // Paginazione
    pagination: {
      goto: 'Vai a',
      page: '',
      total: 'Totale {total}',
      pageSize: '/pagina',
      prev: 'Precedente',
      next: 'Successivo',
      first: 'Prima',
      last: 'Ultima',
      pageClassifier: ''
    },
    // Conferma popup
    popconfirm: {
      confirm: 'OK',
      cancel: 'Annulla',
      dontAskAgain: 'Non chiedere più'
    },
    // Dialogo
    dialog: {
      confirm: 'OK',
      cancel: 'Annulla',
      close: 'Chiudi',
      maximize: 'Massimizza',
      restore: 'Ripristina'
    },
    // Cassetto
    drawer: {
      close: 'Chiudi',
      confirm: 'OK',
      cancel: 'Annulla'
    },
    // Menu a discesa
    dropdown: {
      loading: 'Caricamento...'
    },
    // Immagine
    image: {
      error: 'FALLITO',
      loading: 'Caricamento...',
      preview: 'Anteprima',
      zoomIn: 'Ingrandisci',
      zoomOut: 'Riduci',
      rotateLeft: 'Ruota a sinistra',
      rotateRight: 'Ruota a destra',
      originalSize: 'Dimensione originale',
      fullscreen: 'Schermo intero'
    },
    // Visualizzatore immagini
    imageviewer: {
      close: 'Chiudi',
      prev: 'Precedente',
      next: 'Successivo',
      zoomIn: 'Ingrandisci',
      zoomOut: 'Riduci',
      rotateLeft: 'Ruota a sinistra',
      rotateRight: 'Ruota a destra',
      reset: 'Reimposta',
      fullscreen: 'Schermo intero',
      exitFullscreen: 'Esci da schermo intero'
    },
    // Scorrimento infinito
    infinitescroll: {
      loading: 'Caricamento...',
      finished: 'Nessun altro dato',
      error: 'Caricamento fallito, clicca per riprovare',
      retry: 'Clicca per riprovare'
    },
    // Messaggio
    message: {
      close: 'Chiudi'
    },
    // Notifica
    notification: {
      close: 'Chiudi'
    },
    // Caricamento
    loading: {
      text: 'Caricamento...'
    },
    // Rotazione
    spin: {
      text: 'Caricamento...'
    },
    // Valutazione
    rate: {
      texts: ['Estremamente scarso', 'Deludente', 'Discreto', 'Soddisfacente', 'Sorprendente']
    },
    // Avviso
    alert: {
      close: 'Chiudi'
    },
    // Tag
    tag: {
      close: 'Chiudi'
    },
    // Schede
    tabs: {
      close: 'Chiudi',
      add: 'Aggiungi',
      more: 'Altro'
    },
    // Passi
    steps: {
      finish: 'Finito',
      process: 'In corso',
      wait: 'In attesa',
      error: 'Errore'
    },
    // Progresso
    progress: {
      success: 'Successo',
      exception: 'Eccezione',
      warning: 'Avviso'
    },
    // Scheletro
    skeleton: {
      loading: 'Caricamento...'
    },
    // Vuoto
    empty: {
      description: 'Nessun dato',
      noData: 'Nessun dato',
      noResult: 'Nessun risultato',
      networkError: 'Errore di rete',
      serverError: 'Errore del server'
    },
    // Risultato
    result: {
      success: 'Successo',
      error: 'Errore',
      warning: 'Avviso',
      info: 'Informazione',
      backHome: 'Torna alla home'
    },
    // Cascata
    waterfall: {
      loading: 'Caricamento...',
      noMore: 'Nessun altro dato',
      empty: 'Nessun dato'
    },
    // Descrizioni
    descriptions: {
      colon: ':'
    },
    // Slider
    slider: {
      tipFormatter: '{value}'
    },
    // Interruttore
    switch: {
      on: 'ACCESO',
      off: 'SPENTO'
    },
    // Casella di controllo
    checkbox: {
      selectAll: 'Seleziona tutto'
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: 'Comprimi menu',
      expand: 'Espandi menu'
    },
    // Carta
    card: {
      collapse: 'Comprimi',
      expand: 'Espandi'
    },
    // Comprimi
    collapse: {
      expand: 'Espandi',
      collapse: 'Comprimi'
    },
    // Suggerimento
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: 'Caricamento fallito'
    },
    // Filigrana
    watermark: {},
    // Divisore
    divider: {},
    // Carosello
    carousel: {
      prev: 'Precedente',
      next: 'Successivo'
    },
    // Marquee
    marquee: {},
    // Affisso
    affix: {},
    // Ancora
    anchor: {}
  }
}

export default it
