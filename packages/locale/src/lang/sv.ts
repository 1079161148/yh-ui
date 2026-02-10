import type { Language } from '../index'

export const sv: Language = {
  name: 'sv',
  yh: {
    // Gemensamt
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
    // Färgväljare
    colorpicker: {
      confirm: 'OK',
      clear: 'Rensa',
      eyeDropper: 'Pipett',
      suggestionDark: 'Vit text är bäst',
      suggestionLight: 'Svart text är bäst',
      recentColors: 'Senaste färger',
      presetColors: 'Förinställda färger'
    },
    // Datumväljare
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
    // Tidsväljare
    timepicker: {
      confirm: 'OK',
      cancel: 'Avbryt',
      now: 'Nu',
      placeholder: 'Välj tid',
      startPlaceholder: 'Starttid',
      endPlaceholder: 'Sluttid',
      selectTime: 'Välj tid'
    },
    // Tidsval
    timeselect: {
      placeholder: 'Välj tid'
    },
    // Träd
    tree: {
      emptyText: 'Ingen data',
      loading: 'Laddar...',
      checkAll: 'Välj alla',
      uncheckAll: 'Avmarkera alla',
      expandAll: 'Expandera alla',
      collapseAll: 'Dölj alla'
    },
    // Trädval
    treeselect: {
      placeholder: 'Välj',
      emptyText: 'Ingen data',
      loading: 'Laddar...',
      noMatch: 'Ingen matchande data'
    },
    // Kalender
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
    // Autofyllning
    autocomplete: {
      loading: 'Laddar...',
      placeholder: 'Vänligen ange',
      noData: 'Ingen data',
      noMatch: 'Ingen matchande data'
    },
    // Nedräkning
    countdown: {
      days: 'dagar',
      hours: 'timmar',
      minutes: 'minuter',
      seconds: 'sekunder',
      milliseconds: 'millisekunder',
      finished: 'Klar'
    },
    // Kaskadväljare
    cascader: {
      noMatch: 'Ingen matchande data',
      placeholder: 'Välj',
      loading: 'Laddar...',
      noData: 'Ingen data'
    },
    // Överföring
    transfer: {
      noMatch: 'Ingen matchande data',
      noData: 'Ingen data',
      titles: ['Lista 1', 'Lista 2'],
      filterPlaceholder: 'Ange nyckelord',
      noCheckedFormat: '{total} objekt',
      hasCheckedFormat: '{checked}/{total} valda',
      searchPlaceholder: 'Ange nyckelord'
    },
    // Tabell
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
      // Verktygsfält
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
      // Filter
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
      // Sortering
      sort: {
        asc: 'Stigande',
        desc: 'Fallande',
        clear: 'Rensa sortering'
      },
      // Export
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
      // Import
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
      // Utskrift
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
      // Kolumninställningar
      columnSetting: {
        title: 'Kolumninställningar',
        showAll: 'Visa alla',
        hideAll: 'Dölj alla',
        reset: 'Återställ',
        fixedLeft: 'Fäst till vänster',
        fixedRight: 'Fäst till höger',
        unfixed: 'Frigör'
      },
      // Snabbmeny
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
      // Val
      selection: {
        selectAll: 'Välj alla',
        selectInvert: 'Invertera val',
        selectNone: 'Rensa val',
        selected: '{count} objekt valda'
      },
      // Expandera
      expand: {
        expandAll: 'Expandera alla',
        collapseAll: 'Dölj alla'
      },
      // Träd
      tree: {
        expandAll: 'Expandera alla',
        collapseAll: 'Dölj alla',
        expandLevel: 'Expandera till nivå {level}'
      },
      // Dra
      drag: {
        dragTip: 'Dra för att ändra ordning',
        dropTip: 'Släpp för att placera'
      }
    },
    // Meddelanderuta
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
    // Uppladdning
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
    // Formulär
    form: {
      validationFailed: 'Validering misslyckades',
      required: 'Obligatorisk',
      pleaseInput: 'Vänligen ange',
      pleaseSelect: 'Vänligen välj'
    },
    // Knapp
    button: {
      loading: 'Laddar...'
    },
    // Inmatning
    input: {
      placeholder: 'Vänligen ange',
      clear: 'Rensa',
      showPassword: 'Visa lösenord',
      hidePassword: 'Dölj lösenord',
      copy: 'Kopiera',
      copied: 'Kopierat'
    },
    // Nummerinmatning
    inputnumber: {
      placeholder: 'Vänligen ange nummer',
      increase: 'Öka',
      decrease: 'Minska'
    },
    // Tagginmatning
    inputtag: {
      placeholder: 'Vänligen ange',
      add: 'Lägg till',
      remove: 'Ta bort'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'Mer'
    },
    // Tillbaka till toppen
    backtop: {
      text: 'Tillbaka till toppen'
    },
    // Välj
    select: {
      placeholder: 'Vänligen välj',
      noData: 'Ingen data',
      loading: 'Laddar...',
      noMatch: 'Ingen matchande data',
      selectAll: 'Välj alla',
      clearAll: 'Rensa alla'
    },
    // Sidnumrering
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
    // Popbekräftelse
    popconfirm: {
      confirm: 'OK',
      cancel: 'Avbryt',
      dontAskAgain: 'Fråga inte igen'
    },
    // Dialog
    dialog: {
      confirm: 'OK',
      cancel: 'Avbryt',
      close: 'Stäng',
      maximize: 'Maximera',
      restore: 'Återställ'
    },
    // Låda
    drawer: {
      close: 'Stäng',
      confirm: 'OK',
      cancel: 'Avbryt'
    },
    // Rullgardinsmeny
    dropdown: {
      loading: 'Laddar...'
    },
    // Bild
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
    // Bildvisare
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
    // Oändlig rullning
    infinitescroll: {
      loading: 'Laddar...',
      finished: 'Ingen mer data',
      error: 'Laddning misslyckades, klicka för att försöka igen',
      retry: 'Klicka för att försöka igen'
    },
    // Meddelande
    message: {
      close: 'Stäng'
    },
    // Notifiering
    notification: {
      close: 'Stäng'
    },
    // Laddning
    loading: {
      text: 'Laddar...'
    },
    // Snurr
    spin: {
      text: 'Laddar...'
    },
    // Betyg
    rate: {
      texts: ['Mycket dålig', 'Besviken', 'Rättvis', 'Nöjd', 'Överraskad']
    },
    // Varning
    alert: {
      close: 'Stäng'
    },
    // Tag
    tag: {
      close: 'Stäng'
    },
    // Flikar
    tabs: {
      close: 'Stäng',
      add: 'Lägg till',
      more: 'Mer'
    },
    // Steg
    steps: {
      finish: 'Klar',
      process: 'Pågår',
      wait: 'Väntar',
      error: 'Fel'
    },
    // Framsteg
    progress: {
      success: 'Framgång',
      exception: 'Undantag',
      warning: 'Varning'
    },
    // Skelett
    skeleton: {
      loading: 'Laddar...'
    },
    // Tom
    empty: {
      description: 'Ingen data',
      noData: 'Ingen data',
      noResult: 'Inga resultat',
      networkError: 'Nätverksfel',
      serverError: 'Serverfel'
    },
    // Resultat
    result: {
      success: 'Framgång',
      error: 'Fel',
      warning: 'Varning',
      info: 'Info',
      backHome: 'Tillbaka till hem'
    },
    // Vattenfall
    waterfall: {
      loading: 'Laddar...',
      noMore: 'Ingen mer data',
      empty: 'Ingen data'
    },
    // Beskrivningar
    descriptions: {
      colon: ':'
    },
    // Skjutreglage
    slider: {
      tipFormatter: '{value}'
    },
    // Växel
    switch: {
      on: 'PÅ',
      off: 'AV'
    },
    // Kryssruta
    checkbox: {
      selectAll: 'Välj alla'
    },
    // Radio
    radio: {},
    // Meny
    menu: {
      collapse: 'Dölj meny',
      expand: 'Expandera meny'
    },
    // Kort
    card: {
      collapse: 'Dölj',
      expand: 'Expandera'
    },
    // Dölj
    collapse: {
      expand: 'Expandera',
      collapse: 'Dölj'
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Märke
    badge: {},
    // Avatar
    avatar: {
      error: 'Laddning misslyckades'
    },
    // Vattenstämpel
    watermark: {},
    // Avdelare
    divider: {},
    // Karusell
    carousel: {
      prev: 'Föregående',
      next: 'Nästa'
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Ankare
    anchor: {}
  }
}

export default sv
