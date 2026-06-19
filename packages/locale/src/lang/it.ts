import type { Language } from '../index'

export const it: Language = {
  name: 'it',
  yh: {
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
    colorpicker: {
      confirm: 'OK',
      clear: 'Cancella',
      eyeDropper: 'Contagocce',
      suggestionDark: 'Testo bianco è migliore',
      suggestionLight: 'Testo nero è migliore',
      recentColors: 'Colori recenti',
      presetColors: 'Colori preimpostati'
    },
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
    timepicker: {
      confirm: 'OK',
      cancel: 'Annulla',
      now: 'Ora',
      placeholder: 'Seleziona ora',
      startPlaceholder: 'Ora di inizio',
      endPlaceholder: 'Ora di fine',
      selectTime: 'Seleziona ora'
    },
    timeselect: {
      placeholder: 'Seleziona ora'
    },
    tree: {
      emptyText: 'Nessun dato',
      loading: 'Caricamento...',
      checkAll: 'Seleziona tutto',
      uncheckAll: 'Deseleziona tutto',
      expandAll: 'Espandi tutto',
      collapseAll: 'Comprimi tutto'
    },
    treeselect: {
      placeholder: 'Seleziona',
      emptyText: 'Nessun dato',
      loading: 'Caricamento...',
      noMatch: 'Nessun dato corrispondente'
    },
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
    autocomplete: {
      loading: 'Caricamento...',
      placeholder: 'Inserisci',
      noData: 'Nessun dato',
      noMatch: 'Nessun dato corrispondente'
    },
    countdown: {
      days: 'giorni',
      hours: 'ore',
      minutes: 'minuti',
      seconds: 'secondi',
      milliseconds: 'millisecondi',
      finished: 'Finito'
    },
    cascader: {
      noMatch: 'Nessun dato corrispondente',
      placeholder: 'Seleziona',
      loading: 'Caricamento...',
      noData: 'Nessun dato'
    },
    transfer: {
      noMatch: 'Nessun dato corrispondente',
      noData: 'Nessun dato',
      titles: ['Lista 1', 'Lista 2'],
      filterPlaceholder: 'Inserisci parola chiave',
      noCheckedFormat: '{total} elementi',
      hasCheckedFormat: '{checked}/{total} selezionati',
      searchPlaceholder: 'Inserisci parola chiave'
    },
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
      sort: {
        asc: 'Crescente',
        desc: 'Decrescente',
        clear: 'Cancella ordinamento'
      },
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
      columnSetting: {
        title: 'Impostazioni colonne',
        showAll: 'Mostra tutto',
        hideAll: 'Nascondi tutto',
        reset: 'Reimposta',
        fixedLeft: 'Fissa a sinistra',
        fixedRight: 'Fissa a destra',
        unfixed: 'Rimuovi fissaggio'
      },
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
      selection: {
        selectAll: 'Seleziona tutto',
        selectInvert: 'Inverti selezione',
        selectNone: 'Cancella selezione',
        selected: '{count} elementi selezionati'
      },
      expand: {
        expandAll: 'Espandi tutto',
        collapseAll: 'Comprimi tutto'
      },
      tree: {
        expandAll: 'Espandi tutto',
        collapseAll: 'Comprimi tutto',
        expandLevel: 'Espandi al livello {level}'
      },
      drag: {
        dragTip: 'Trascina per riordinare',
        dropTip: 'Rilascia per posizionare'
      }
    },
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
    upload: {
      deleteTip: 'premi delete per rimuovere',
      delete: 'Elimina',
      preview: 'Anteprima',
      continue: 'Continua',
      upload: 'Clicca per caricare',
      tip: "Clicca o trascina il file in quest'area per <em>caricare</em>",
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
    form: {
      validationFailed: 'Validazione fallita',
      required: 'Obbligatorio',
      pleaseInput: 'Inserisci',
      pleaseSelect: 'Seleziona'
    },
    button: {
      loading: 'Caricamento...'
    },
    input: {
      placeholder: 'Inserisci',
      clear: 'Cancella',
      showPassword: 'Mostra password',
      hidePassword: 'Nascondi password',
      copy: 'Copia',
      copied: 'Copiato'
    },
    inputnumber: {
      placeholder: 'Inserisci numero',
      increase: 'Aumenta',
      decrease: 'Diminuisci'
    },
    inputtag: {
      placeholder: 'Inserisci',
      add: 'Aggiungi',
      remove: 'Rimuovi'
    },
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'Altro'
    },
    backtop: {
      text: 'Torna su'
    },
    select: {
      placeholder: 'Seleziona',
      noData: 'Nessun dato',
      loading: 'Caricamento...',
      noMatch: 'Nessun dato corrispondente',
      selectAll: 'Seleziona tutto',
      clearAll: 'Cancella tutto'
    },
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
    popconfirm: {
      confirm: 'OK',
      cancel: 'Annulla',
      dontAskAgain: 'Non chiedere più'
    },
    dialog: {
      confirm: 'OK',
      cancel: 'Annulla',
      close: 'Chiudi',
      maximize: 'Massimizza',
      restore: 'Ripristina'
    },
    drawer: {
      close: 'Chiudi',
      confirm: 'OK',
      cancel: 'Annulla'
    },
    dropdown: {
      loading: 'Caricamento...'
    },
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
    infinitescroll: {
      loading: 'Caricamento...',
      finished: 'Nessun altro dato',
      error: 'Caricamento fallito, clicca per riprovare',
      retry: 'Clicca per riprovare'
    },
    message: {
      close: 'Chiudi'
    },
    notification: {
      close: 'Chiudi'
    },
    loading: {
      text: 'Caricamento...'
    },
    spin: {
      text: 'Caricamento...'
    },
    rate: {
      texts: ['Estremamente scarso', 'Deludente', 'Discreto', 'Soddisfacente', 'Sorprendente']
    },
    alert: {
      close: 'Chiudi'
    },
    tag: {
      close: 'Chiudi'
    },
    tabs: {
      close: 'Chiudi',
      add: 'Aggiungi',
      more: 'Altro'
    },
    steps: {
      finish: 'Finito',
      process: 'In corso',
      wait: 'In attesa',
      error: 'Errore'
    },
    progress: {
      success: 'Successo',
      exception: 'Eccezione',
      warning: 'Avviso'
    },
    skeleton: {
      loading: 'Caricamento...'
    },
    empty: {
      description: 'Nessun dato',
      noData: 'Nessun dato',
      noResult: 'Nessun risultato',
      networkError: 'Errore di rete',
      serverError: 'Errore del server'
    },
    result: {
      success: 'Successo',
      error: 'Errore',
      warning: 'Avviso',
      info: 'Informazione',
      backHome: 'Torna alla home'
    },
    waterfall: {
      loading: 'Caricamento...',
      noMore: 'Nessun altro dato',
      empty: 'Nessun dato'
    },
    descriptions: {
      colon: ':'
    },
    slider: {
      tipFormatter: '{value}'
    },
    switch: {
      on: 'ACCESO',
      off: 'SPENTO'
    },
    checkbox: {
      selectAll: 'Seleziona tutto'
    },
    radio: {},
    menu: {
      collapse: 'Comprimi menu',
      expand: 'Espandi menu'
    },
    card: {
      collapse: 'Comprimi',
      expand: 'Espandi'
    },
    collapse: {
      expand: 'Espandi',
      collapse: 'Comprimi'
    },
    tooltip: {},
    popover: {},
    badge: {},
    avatar: {
      error: 'Caricamento fallito'
    },
    watermark: {},
    divider: {},
    carousel: {
      prev: 'Precedente',
      next: 'Successivo'
    },
    marquee: {},
    affix: {},
    flow: {
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      fitView: 'Fit View',
      lock: 'Toggle Interactivity'
    },
    anchor: {},
    mention: {
      placeholder: 'Inserisci',
      loading: 'Caricamento...',
      noData: 'Nessun dato'
    },
    skuselector: {
      placeholder: 'Seleziona specifiche',
      emptyText: 'Nessuna specifica',
      stock: 'Disponibilità',
      price: 'Prezzo',
      selected: 'Selezionato',
      outOfStock: 'Esaurito'
    },
    productcard: {
      viewDetails: 'Vedi dettagli',
      buyNow: 'Acquista ora',
      addToCart: 'Aggiungi al carrello',
      sold: 'Venduto',
      soldOut: 'Esaurito',
      vip: 'VIP'
    },
    price: {
      original: 'Prezzo originale'
    },
    couponcard: {
      available: 'Ottieni ora',
      used: 'Usato',
      expired: 'Scaduto',
      received: 'Ricevuto',
      limit: 'Ordini superiori a {threshold}',
      noThreshold: 'Nessuna soglia',
      validPeriod: 'Validità',
      ruleTitle: 'Regole di utilizzo'
    },
    luckydraw: {
      start: 'Avvia',
      drawing: 'Estrazione...',
      end: 'Vincitore!',
      retry: 'Riprova'
    },
    filterbar: {
      all: 'Tutti',
      sort: 'Ordina',
      filter: 'Filtra',
      cancel: 'Annulla',
      reset: 'Reimposta',
      confirm: 'Conferma',
      noOptions: 'Nessuna opzione',
      asc: 'Crescente',
      desc: 'Decrescente',
      selected: 'Selezionato'
    },
    submitbar: {
      total: 'Totale: ',
      selected: '{count} selezionato/i',
      submit: 'Vai al pagamento',
      allSelect: 'Seleziona tutto'
    },
    categorynav: {
      all: 'Tutti',
      noData: 'Nessun dato',
      loading: 'Caricamento...'
    },
    smartaddress: {
      placeholder: 'Incolla qui l’indirizzo per rilevare automaticamente nome, telefono e località',
      parse: 'Analisi intelligente',
      province: 'Provincia/Città/Distretto',
      city: 'Città',
      district: 'Distretto/Provincia',
      street: 'Via/Località',
      detail: 'Indirizzo dettagliato',
      phone: 'Telefono',
      name: 'Destinatario',
      parseSuccess: 'Indirizzo analizzato correttamente',
      parseFailed: 'Analisi non riuscita, compila manualmente',
      required: 'Compila l’indirizzo completo',
      provinceKeywords: ['Provincia', 'Regione'],
      cityKeywords: ['Città', 'Comune'],
      districtKeywords: ['Distretto', 'Provincia', 'Quartiere'],
      streetKeywords: ['Via', 'Strada', 'Viale', 'Piazza']
    },
    ganttchart: {
      taskName: 'Nome attività',
      searchPlaceholder: 'Cerca attività...',
      zoom: 'Zoom',
      day: 'Giorno',
      week: 'Settimana',
      month: 'Mese',
      year: 'Anno',
      milestone: 'Milestone'
    },
    imagemagnifier: {
      switchToImage: 'Passa all’immagine {index}',
      galleryItem: 'Galleria {index}',
      close: 'Chiudi'
    },
    ai: {
      bubble: {
        citations: 'Citazioni'
      },
      mention: {
        placeholder: '@ Menziona Agente, Doc o Tabella...',
        agent: 'Agente',
        document: 'Documento',
        table: 'Tabella',
        knowledge: 'Conoscenza',
        file: 'File'
      },
      codeBlock: {
        copyCode: 'Copia codice',
        copied: 'Copiato!',
        run: 'Esegui codice',
        edit: 'Modifica',
        save: 'Salva',
        cancel: 'Annulla'
      },
      codeRunner: {
        run: 'Esegui',
        stop: 'Ferma',
        clear: 'Cancella',
        reset: 'Reimposta',
        placeholder: 'Clicca Esegui per eseguire il codice...'
      },
      sender: {
        placeholder: 'Invia un messaggio...',
        dragTip: 'Rilascia per caricare file',
        noCommands: 'No matching commands found'
      },
      thoughtChain: {
        thoughtProcess: 'Processo di Pensiero',
        thinking: 'Pensando...',
        defaultTitle: 'Nuovo Passaggio',
        addNode: 'Aggiungi Passaggio'
      },
      thinking: {
        start: 'Inizia a pensare',
        thinking: 'Pensando...',
        complete: 'Pensiero completato',
        error: 'Errore nel pensiero'
      },
      welcome: {
        title: 'Ciao, sono YH AI',
        description:
          'Posso aiutarti con la programmazione, la traduzione di documenti o la scrittura creativa. Cosa posso fare per te oggi?'
      },
      action: {
        copy: 'Copia',
        regenerate: 'Rigenera',
        share: 'Condividi',
        like: 'Mi piace',
        dislike: 'Non mi piace',
        edit: 'Modifica',
        delete: 'Elimina'
      },
      artifacts: {
        preview: 'Anteprima',
        inline: 'In linea',
        code: 'Codice',
        versions: 'Versioni',
        rendering: 'Rendering componente...',
        renderingChart: 'Rendering grafico...',
        renderingCanvas: 'Preparazione tela...',
        chartLoadError: 'Chart loading failed'
      },
      voice: {
        trigger: 'Clicca per Parlare',
        listening: 'Ascoltando...'
      },
      agent: {
        uses: 'usa',
        use: 'Usa Ora',
        favorite: 'Preferito',
        unfavorite: 'Rimuovi Preferito',
        share: 'Condividi',
        online: 'Online',
        offline: 'Offline',
        busy: 'Occupato',
        verified: 'Verificato',
        rating: 'Valutazione',
        reviews: 'recensioni',
        responseTime: 'Tempo di Risposta',
        ms: 'ms'
      },
      sources: {
        references: 'Riferimenti',
        referencedSources: 'Fonti Riferite',
        relevant: 'Rilevanza',
        viewOriginal: 'Vedi Originale',
        showAll: 'Mostra Tutti',
        more: 'altre fonti',
        drawerTitle: 'Riferimenti',
        expandMore: 'Mostra Altro',
        collapseMore: 'Comprimi',
        noSources: 'Nessuna fonte',
        today: 'Oggi',
        last7Days: 'Ultimi 7 Giorni',
        last30Days: 'Ultimi 30 Giorni',
        earlier: 'Precedente',
        pinned: 'Fissato'
      },
      conversations: {
        today: 'Oggi',
        last7Days: 'Ultimi 7 Giorni',
        last30Days: 'Ultimi 30 Giorni',
        earlier: 'Precedente',
        pinned: 'Fissato',
        pin: 'Fissa',
        unpin: 'Sblocca',
        newConversation: 'Nuova Conversazione',
        noData: 'Nessuna conversazione ancora',
        rename: 'Rinomina',
        delete: 'Elimina',
        deleteConfirm: 'Confermi eliminazione di questa conversazione?'
      },
      attachments: {
        dropTip: 'Rilascia qui i file per caricarli',
        clickToUpload: 'Clicca o trascina i file per caricarli',
        uploadSuccess: 'Caricamento riuscito',
        uploadError: 'Caricamento non riuscito',
        deleteConfirm: 'Eliminare questo file?',
        fileTooLarge: 'La dimensione del file non può superare {size}',
        invalidFileType: 'Tipo di file non valido'
      },
      mermaid: {
        image: 'Immagine',
        code: 'Codice',
        zoomIn: 'Ingrandisci',
        zoomOut: 'Riduci',
        reset: 'Reimposta',
        download: 'Scarica',
        copyCode: 'Copia codice',
        rendering: 'Rendering in corso...',
        renderError: 'Rendering non riuscito',
        renderSuccess: 'Rendering completato',
        retry: 'Riprova'
      }
    }
  }
}

export default it
