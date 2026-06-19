import type { Language } from '../index'

export const sv: Language = {
  name: 'sv',
  yh: {
    common: {
      yes: 'Ja',
      no: 'Nej',
      confirm: 'Bekräfta',
      cancel: 'Avbryt',
      loading: 'Laddar',
      close: 'Stäng',
      clear: 'Rensa',
      reset: 'Återställ',
      save: 'Spara',
      delete: 'Radera',
      edit: 'Redigera',
      add: 'Lägg till',
      search: 'Sök',
      refresh: 'Uppdatera',
      expand: 'Expandera',
      collapse: 'Dölj',
      more: 'Mer',
      noData: 'Ingen data',
      noMatch: 'Ingen matchande data',
      selectAll: 'Välj alla',
      unselectAll: 'Avmarkera alla'
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Rensa',
      eyeDropper: 'Pipett',
      suggestionDark: 'Vit text är bäst',
      suggestionLight: 'Svart text är bäst',
      recentColors: 'Senaste färger',
      presetColors: 'Förinställda färger'
    },
    datepicker: {
      now: 'Nu',
      today: 'Idag',
      cancel: 'Avbryt',
      clear: 'Rensa',
      confirm: 'OK',
      selectDate: 'Välj datum',
      selectTime: 'Välj tid',
      startDate: 'Startdatum',
      startTime: 'Starttid',
      endDate: 'Slutdatum',
      endTime: 'Sluttid',
      year: '',
      month: '',
      day: '',
      week: 'Vecka',
      monthBeforeYear: true,
      prevYear: 'Föregående år',
      nextYear: 'Nästa år',
      prevMonth: 'Föregående månad',
      nextMonth: 'Nästa månad',
      weeks: {
        sun: 'Sön',
        mon: 'Mån',
        tue: 'Tis',
        wed: 'Ons',
        thu: 'Tor',
        fri: 'Fre',
        sat: 'Lör'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'Maj',
        jun: 'Jun',
        jul: 'Jul',
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
    timepicker: {
      confirm: 'OK',
      cancel: 'Avbryt',
      now: 'Nu',
      placeholder: 'Välj tid',
      startPlaceholder: 'Starttid',
      endPlaceholder: 'Sluttid',
      selectTime: 'Välj tid'
    },
    timeselect: {
      placeholder: 'Välj tid'
    },
    tree: {
      emptyText: 'Ingen data',
      loading: 'Laddar...',
      checkAll: 'Välj alla',
      uncheckAll: 'Avmarkera alla',
      expandAll: 'Expandera alla',
      collapseAll: 'Dölj alla'
    },
    treeselect: {
      placeholder: 'Välj',
      emptyText: 'Ingen data',
      loading: 'Laddar...',
      noMatch: 'Ingen matchande data'
    },
    calendar: {
      prevMonth: 'Föregående månad',
      nextMonth: 'Nästa månad',
      prevYear: 'Föregående år',
      nextYear: 'Nästa år',
      today: 'Idag',
      week: 'Vecka',
      holiday: 'Helgdag',
      workday: 'Arbete',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Sön',
        mon: 'Mån',
        tue: 'Tis',
        wed: 'Ons',
        thu: 'Tor',
        fri: 'Fre',
        sat: 'Lör'
      }
    },
    autocomplete: {
      loading: 'Laddar...',
      placeholder: 'Vänligen ange',
      noData: 'Ingen data',
      noMatch: 'Ingen matchande data'
    },
    countdown: {
      days: 'dagar',
      hours: 'timmar',
      minutes: 'minuter',
      seconds: 'sekunder',
      milliseconds: 'millisekunder',
      finished: 'Klar'
    },
    cascader: {
      noMatch: 'Ingen matchande data',
      placeholder: 'Välj',
      loading: 'Laddar...',
      noData: 'Ingen data'
    },
    transfer: {
      noMatch: 'Ingen matchande data',
      noData: 'Ingen data',
      titles: ['Lista 1', 'Lista 2'],
      filterPlaceholder: 'Ange nyckelord',
      noCheckedFormat: '{total} objekt',
      hasCheckedFormat: '{checked}/{total} valda',
      searchPlaceholder: 'Ange nyckelord'
    },
    table: {
      emptyText: 'Ingen data',
      confirmFilter: 'Bekräfta',
      resetFilter: 'Återställ',
      clearFilter: 'Alla',
      sumText: 'Summa',
      loading: 'Laddar...',
      index: 'Index',
      print: 'Skriv ut',
      cancel: 'Avbryt',
      preview: 'Förhandsgranska utskrift',
      printTime: 'Utskriftstid',
      total: 'Totalt {total} objekt',
      page: 'Sida {page}',
      yes: 'Ja',
      no: 'Nej',
      toolbar: {
        refresh: 'Uppdatera',
        density: 'Täthet',
        densityDefault: 'Standard',
        densityLarge: 'Stor',
        densitySmall: 'Liten',
        columnSetting: 'Kolumninställningar',
        fullscreen: 'Helskärm',
        exitFullscreen: 'Avsluta helskärm',
        export: 'Exportera',
        import: 'Importera',
        search: 'Sök',
        searchPlaceholder: 'Ange nyckelord för att söka'
      },
      filter: {
        selectAll: 'Välj alla',
        selectInvert: 'Invertera val',
        empty: 'Är tom',
        notEmpty: 'Är inte tom',
        contains: 'Innehåller',
        notContains: 'Innehåller inte',
        equals: 'Lika med',
        notEquals: 'Inte lika med',
        startsWith: 'Börjar med',
        endsWith: 'Slutar med',
        greaterThan: 'Större än',
        lessThan: 'Mindre än',
        between: 'Mellan'
      },
      sort: {
        asc: 'Stigande',
        desc: 'Fallande',
        clear: 'Rensa sortering'
      },
      export: {
        title: 'Exportera data',
        filename: 'Filnamn',
        type: 'Filtyp',
        scope: 'Exportomfattning',
        scopeAll: 'All data',
        scopeSelected: 'Vald data',
        scopeCurrentPage: 'Aktuell sida',
        includeHeader: 'Inkludera rubrik',
        exporting: 'Exporterar...',
        success: 'Export lyckades',
        error: 'Export misslyckades'
      },
      import: {
        title: 'Importera data',
        selectFile: 'Välj fil',
        dragTip: 'Klicka eller dra fil hit för att ladda upp',
        importing: 'Importerar...',
        success: 'Import lyckades',
        error: 'Import misslyckades',
        preview: 'Dataförhandsvisning',
        confirm: 'Bekräfta import'
      },
      printConfig: {
        title: 'Utskriftsinställningar',
        pageTitle: 'Sidtitel',
        pageHeader: 'Rubrik',
        pageFooter: 'Sidfot',
        printAll: 'Skriv ut alla',
        printSelected: 'Skriv ut valda',
        printCurrentPage: 'Skriv ut aktuell sida',
        landscape: 'Liggande',
        portrait: 'Stående',
        printing: 'Skriver ut...'
      },
      columnSetting: {
        title: 'Kolumninställningar',
        showAll: 'Visa alla',
        hideAll: 'Dölj alla',
        reset: 'Återställ',
        fixedLeft: 'Fäst till vänster',
        fixedRight: 'Fäst till höger',
        unfixed: 'Frigör'
      },
      contextMenu: {
        copy: 'Kopiera',
        copyRow: 'Kopiera rad',
        copyCell: 'Kopiera cell',
        paste: 'Klistra in',
        insertRowAbove: 'Infoga rad ovanför',
        insertRowBelow: 'Infoga rad under',
        deleteRow: 'Radera rad',
        deleteSelectedRows: 'Radera valda rader',
        exportSelected: 'Exportera valda'
      },
      selection: {
        selectAll: 'Välj alla',
        selectInvert: 'Invertera val',
        selectNone: 'Rensa val',
        selected: '{count} objekt valda'
      },
      expand: {
        expandAll: 'Expandera alla',
        collapseAll: 'Dölj alla'
      },
      tree: {
        expandAll: 'Expandera alla',
        collapseAll: 'Dölj alla',
        expandLevel: 'Expandera till nivå {level}'
      },
      drag: {
        dragTip: 'Dra för att ändra ordning',
        dropTip: 'Släpp för att placera'
      }
    },
    messagebox: {
      title: 'Meddelande',
      confirm: 'OK',
      cancel: 'Avbryt',
      close: 'Stäng',
      error: 'Ogiltig inmatning',
      alert: 'Varning',
      prompt: 'Prompt',
      inputPlaceholder: 'Vänligen ange'
    },
    upload: {
      deleteTip: 'tryck delete för att ta bort',
      delete: 'Radera',
      preview: 'Förhandsgranska',
      continue: 'Fortsätt',
      upload: 'Klicka för att ladda upp',
      tip: 'Klicka eller dra fil till detta område för att <em>ladda upp</em>',
      dragTip: 'Släpp fil här eller klicka för att ladda upp',
      uploading: 'Laddar upp...',
      success: 'Uppladdning lyckades',
      error: 'Uppladdning misslyckades',
      retry: 'Försök igen',
      cancel: 'Avbryt uppladdning',
      fileTypeError: 'Filtyp stöds inte',
      fileSizeError: 'Filstorlek överskrider gräns',
      fileCountError: 'Filantal överskrider gräns'
    },
    form: {
      validationFailed: 'Validering misslyckades',
      required: 'Obligatorisk',
      pleaseInput: 'Vänligen ange',
      pleaseSelect: 'Vänligen välj'
    },
    button: {
      loading: 'Laddar...'
    },
    input: {
      placeholder: 'Vänligen ange',
      clear: 'Rensa',
      showPassword: 'Visa lösenord',
      hidePassword: 'Dölj lösenord',
      copy: 'Kopiera',
      copied: 'Kopierat'
    },
    inputnumber: {
      placeholder: 'Vänligen ange nummer',
      increase: 'Öka',
      decrease: 'Minska'
    },
    inputtag: {
      placeholder: 'Vänligen ange',
      add: 'Lägg till',
      remove: 'Ta bort'
    },
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'Mer'
    },
    backtop: {
      text: 'Tillbaka till toppen'
    },
    select: {
      placeholder: 'Vänligen välj',
      noData: 'Ingen data',
      loading: 'Laddar...',
      noMatch: 'Ingen matchande data',
      selectAll: 'Välj alla',
      clearAll: 'Rensa alla'
    },
    pagination: {
      goto: 'Gå till',
      page: '',
      total: 'Totalt {total}',
      pageSize: '/sida',
      prev: 'Föregående',
      next: 'Nästa',
      first: 'Första',
      last: 'Sista',
      pageClassifier: ''
    },
    popconfirm: {
      confirm: 'OK',
      cancel: 'Avbryt',
      dontAskAgain: 'Fråga inte igen'
    },
    dialog: {
      confirm: 'OK',
      cancel: 'Avbryt',
      close: 'Stäng',
      maximize: 'Maximera',
      restore: 'Återställ'
    },
    drawer: {
      close: 'Stäng',
      confirm: 'OK',
      cancel: 'Avbryt'
    },
    dropdown: {
      loading: 'Laddar...'
    },
    image: {
      error: 'MISSLYCKADES',
      loading: 'Laddar...',
      preview: 'Förhandsgranska',
      zoomIn: 'Zooma in',
      zoomOut: 'Zooma ut',
      rotateLeft: 'Rotera vänster',
      rotateRight: 'Rotera höger',
      originalSize: 'Originalstorlek',
      fullscreen: 'Helskärm'
    },
    imageviewer: {
      close: 'Stäng',
      prev: 'Föregående',
      next: 'Nästa',
      zoomIn: 'Zooma in',
      zoomOut: 'Zooma ut',
      rotateLeft: 'Rotera vänster',
      rotateRight: 'Rotera höger',
      reset: 'Återställ',
      fullscreen: 'Helskärm',
      exitFullscreen: 'Avsluta helskärm'
    },
    infinitescroll: {
      loading: 'Laddar...',
      finished: 'Ingen mer data',
      error: 'Laddning misslyckades, klicka för att försöka igen',
      retry: 'Klicka för att försöka igen'
    },
    message: {
      close: 'Stäng'
    },
    notification: {
      close: 'Stäng'
    },
    loading: {
      text: 'Laddar...'
    },
    spin: {
      text: 'Laddar...'
    },
    rate: {
      texts: ['Mycket dålig', 'Besviken', 'Rättvis', 'Nöjd', 'Överraskad']
    },
    alert: {
      close: 'Stäng'
    },
    tag: {
      close: 'Stäng'
    },
    tabs: {
      close: 'Stäng',
      add: 'Lägg till',
      more: 'Mer'
    },
    steps: {
      finish: 'Klar',
      process: 'Pågår',
      wait: 'Väntar',
      error: 'Fel'
    },
    progress: {
      success: 'Framgång',
      exception: 'Undantag',
      warning: 'Varning'
    },
    skeleton: {
      loading: 'Laddar...'
    },
    empty: {
      description: 'Ingen data',
      noData: 'Ingen data',
      noResult: 'Inga resultat',
      networkError: 'Nätverksfel',
      serverError: 'Serverfel'
    },
    result: {
      success: 'Framgång',
      error: 'Fel',
      warning: 'Varning',
      info: 'Info',
      backHome: 'Tillbaka till hem'
    },
    waterfall: {
      loading: 'Laddar...',
      noMore: 'Ingen mer data',
      empty: 'Ingen data'
    },
    descriptions: {
      colon: ':'
    },
    slider: {
      tipFormatter: '{value}'
    },
    switch: {
      on: 'PÅ',
      off: 'AV'
    },
    checkbox: {
      selectAll: 'Välj alla'
    },
    radio: {},
    menu: {
      collapse: 'Dölj meny',
      expand: 'Expandera meny'
    },
    card: {
      collapse: 'Dölj',
      expand: 'Expandera'
    },
    collapse: {
      expand: 'Expandera',
      collapse: 'Dölj'
    },
    tooltip: {},
    popover: {},
    badge: {},
    avatar: {
      error: 'Laddning misslyckades'
    },
    watermark: {},
    divider: {},
    carousel: {
      prev: 'Föregående',
      next: 'Nästa'
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
      placeholder: 'Var god ange',
      loading: 'Laddar...',
      noData: 'Ingen data'
    },
    skuselector: {
      placeholder: 'Välj specifikationer',
      emptyText: 'Inga specifikationer',
      stock: 'Lager',
      price: 'Pris',
      selected: 'Vald',
      outOfStock: 'Slut i lager'
    },
    productcard: {
      viewDetails: 'Visa detaljer',
      buyNow: 'Köp nu',
      addToCart: 'Lägg i kundvagn',
      sold: 'Såld',
      soldOut: 'Slutsåld',
      vip: 'Medlem'
    },
    price: {
      original: 'Ordinarie pris'
    },
    couponcard: {
      available: 'Hämta nu',
      used: 'Använd',
      expired: 'Utgången',
      received: 'Mottagen',
      limit: 'Beställningar över {threshold}',
      noThreshold: 'Ingen miniminivå',
      validPeriod: 'Giltighetstid',
      ruleTitle: 'Användningsregler'
    },
    luckydraw: {
      start: 'Starta',
      drawing: 'Drar...',
      end: 'Vinnare!',
      retry: 'Försök igen'
    },
    filterbar: {
      all: 'Alla',
      sort: 'Sortera',
      filter: 'Filtrera',
      cancel: 'Avbryt',
      reset: 'Återställ',
      confirm: 'Bekräfta',
      noOptions: 'Inga alternativ',
      asc: 'Stigande',
      desc: 'Fallande',
      selected: 'Vald'
    },
    submitbar: {
      total: 'Totalt: ',
      selected: '{count} valda',
      submit: 'Till kassan',
      allSelect: 'Välj alla'
    },
    categorynav: {
      all: 'Alla',
      noData: 'Ingen data',
      loading: 'Laddar...'
    },
    smartaddress: {
      placeholder: 'Klistra in adressen här för att automatiskt upptäcka namn, telefon och plats',
      parse: 'Smart analys',
      province: 'Län/Stad/Distrikt',
      city: 'Stad',
      district: 'Distrikt/Kommun',
      street: 'Gata/Ort',
      detail: 'Detaljerad adress',
      phone: 'Telefon',
      name: 'Mottagare',
      parseSuccess: 'Adressen analyserades korrekt',
      parseFailed: 'Analysen misslyckades, fyll i manuellt',
      required: 'Fyll i fullständig adress',
      provinceKeywords: ['Län', 'Region'],
      cityKeywords: ['Stad', 'Kommun'],
      districtKeywords: ['Distrikt', 'Kommun', 'Område'],
      streetKeywords: ['Gata', 'Väg', 'Allé', 'Gränd']
    },
    ganttchart: {
      taskName: 'Aktivitetsnamn',
      searchPlaceholder: 'Sök uppgifter...',
      zoom: 'Zoom',
      day: 'Dag',
      week: 'Vecka',
      month: 'Månad',
      year: 'År',
      milestone: 'Milstolpe'
    },
    imagemagnifier: {
      switchToImage: 'Byt till bild {index}',
      galleryItem: 'Galleri {index}',
      close: 'Stäng'
    },
    ai: {
      bubble: {
        citations: 'Citat'
      },
      mention: {
        placeholder: '@ Nämna Agent, Dokument eller Tabell...',
        agent: 'Agent',
        document: 'Dokument',
        table: 'Tabell',
        knowledge: 'Kunskap',
        file: 'File'
      },
      codeBlock: {
        copyCode: 'Kopiera kod',
        copied: 'Kopierad!',
        run: 'Kör kod',
        edit: 'Redigera',
        save: 'Spara',
        cancel: 'Avbryt'
      },
      codeRunner: {
        run: 'Kör',
        stop: 'Stopp',
        clear: 'Rensa',
        reset: 'Återställ',
        placeholder: 'Klicka på Kör för att köra koden...'
      },
      sender: {
        placeholder: 'Skicka ett meddelande...',
        dragTip: 'Släpp för att ladda upp filer',
        noCommands: 'No matching commands found'
      },
      thoughtChain: {
        thoughtProcess: 'Tankeprocess',
        thinking: 'Tänker...',
        defaultTitle: 'Nytt steg',
        addNode: 'Lägg till steg'
      },
      thinking: {
        start: 'Börja tänka',
        thinking: 'Tänker...',
        complete: 'Tänkande klart',
        error: 'Tänkfel'
      },
      welcome: {
        title: 'Hej, jag är YH AI',
        description:
          'Jag kan hjälpa dig med kodning, översättning av dokument eller kreativt skrivande. Vad kan jag hjälpa dig med idag?'
      },
      action: {
        copy: 'Kopiera',
        regenerate: 'Regenerera',
        share: 'Dela',
        like: 'Gillar',
        dislike: 'Gillar inte',
        edit: 'Redigera',
        delete: 'Radera'
      },
      artifacts: {
        preview: 'Förhandsvisning',
        inline: 'Inline',
        code: 'Källa',
        versions: 'Versioner',
        rendering: 'Renderar komponent...',
        renderingChart: 'Renderar diagram...',
        renderingCanvas: 'Förbereder canvas...',
        chartLoadError: 'Chart loading failed'
      },
      voice: {
        trigger: 'Klicka för att tala',
        listening: 'Lyssnar...'
      },
      agent: {
        uses: 'använder',
        use: 'Använd nu',
        favorite: 'Favorit',
        unfavorite: 'Ta bort favorit',
        share: 'Dela',
        online: 'Online',
        offline: 'Offline',
        busy: 'Upptagen',
        verified: 'Verifierad',
        rating: 'Betyg',
        reviews: 'recensioner',
        responseTime: 'Genomsnittlig svarstid',
        ms: 'ms'
      },
      sources: {
        references: 'Referenser',
        referencedSources: 'Refererade källor',
        relevant: 'Relevans',
        viewOriginal: 'Visa original',
        showAll: 'Visa alla',
        more: 'fler källor',
        drawerTitle: 'Referenser',
        expandMore: 'Visa mer',
        collapseMore: 'Dölj',
        noSources: 'Inga källor',
        today: 'Idag',
        last7Days: 'Senaste 7 dagarna',
        last30Days: 'Senaste 30 dagarna',
        earlier: 'Tidigare',
        pinned: 'Nålad'
      },
      conversations: {
        today: 'Idag',
        last7Days: 'Senaste 7 dagarna',
        last30Days: 'Senaste 30 dagarna',
        earlier: 'Tidigare',
        pinned: 'Nålad',
        pin: 'Nåla',
        unpin: 'Ta bort nål',
        newConversation: 'Ny konversation',
        noData: 'Inga konversationer ännu',
        rename: 'Döpa om',
        delete: 'Radera',
        deleteConfirm: 'Bekräfta radering av denna konversation?'
      },
      attachments: {
        dropTip: 'Släpp filer här för att ladda upp',
        clickToUpload: 'Klicka eller dra filer för att ladda upp',
        uploadSuccess: 'Uppladdningen lyckades',
        uploadError: 'Uppladdningen misslyckades',
        deleteConfirm: 'Är du säker på att du vill ta bort den här filen?',
        fileTooLarge: 'Filstorleken får inte överstiga {size}',
        invalidFileType: 'Ogiltig filtyp'
      },
      mermaid: {
        image: 'Bild',
        code: 'Kod',
        zoomIn: 'Zooma in',
        zoomOut: 'Zooma ut',
        reset: 'Återställ',
        download: 'Ladda ner',
        copyCode: 'Kopiera kod',
        rendering: 'Renderar...',
        renderError: 'Renderingen misslyckades',
        renderSuccess: 'Renderingen lyckades',
        retry: 'Försök igen'
      }
    }
  }
}

export default sv
