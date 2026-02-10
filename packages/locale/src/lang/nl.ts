import type { Language } from '../index'

export const nl: Language = {
  name: 'nl',
  yh: {
    // Algemeen
    common: {
      yes: 'Ja',
      no: 'Nee',
      confirm: 'Bevestigen',
      cancel: 'Annuleren',
      loading: 'Laden',
      close: 'Sluiten',
      clear: 'Wissen',
      reset: 'Resetten',
      save: 'Opslaan',
      delete: 'Verwijderen',
      edit: 'Bewerken',
      add: 'Toevoegen',
      search: 'Zoeken',
      refresh: 'Vernieuwen',
      expand: 'Uitklappen',
      collapse: 'Inklappen',
      more: 'Meer',
      noData: 'Geen gegevens',
      noMatch: 'Geen overeenkomende gegevens',
      selectAll: 'Alles selecteren',
      unselectAll: 'Alles deselecteren'
    },
    // Kleurkiezer
    colorpicker: {
      confirm: 'OK',
      clear: 'Wissen',
      eyeDropper: 'Pipet',
      suggestionDark: 'Witte tekst is het beste',
      suggestionLight: 'Zwarte tekst is het beste',
      recentColors: 'Recente kleuren',
      presetColors: 'Vooraf ingestelde kleuren'
    },
    // Datumkiezer
    datepicker: {
      now: 'Nu',
      today: 'Vandaag',
      cancel: 'Annuleren',
      clear: 'Wissen',
      confirm: 'OK',
      selectDate: 'Selecteer datum',
      selectTime: 'Selecteer tijd',
      startDate: 'Startdatum',
      startTime: 'Starttijd',
      endDate: 'Einddatum',
      endTime: 'Eindtijd',
      year: '',
      month: '',
      day: '',
      week: 'Week',
      monthBeforeYear: true,
      prevYear: 'Vorig jaar',
      nextYear: 'Volgend jaar',
      prevMonth: 'Vorige maand',
      nextMonth: 'Volgende maand',
      weeks: {
        sun: 'Zo',
        mon: 'Ma',
        tue: 'Di',
        wed: 'Wo',
        thu: 'Do',
        fri: 'Vr',
        sat: 'Za'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mrt',
        apr: 'Apr',
        may: 'Mei',
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
    // Tijdkiezer
    timepicker: {
      confirm: 'OK',
      cancel: 'Annuleren',
      now: 'Nu',
      placeholder: 'Selecteer tijd',
      startPlaceholder: 'Starttijd',
      endPlaceholder: 'Eindtijd',
      selectTime: 'Selecteer tijd'
    },
    // Tijdselectie
    timeselect: {
      placeholder: 'Selecteer tijd'
    },
    // Boom
    tree: {
      emptyText: 'Geen gegevens',
      loading: 'Laden...',
      checkAll: 'Alles aanvinken',
      uncheckAll: 'Alles uitvinken',
      expandAll: 'Alles uitklappen',
      collapseAll: 'Alles inklappen'
    },
    // Boomselectie
    treeselect: {
      placeholder: 'Selecteer',
      emptyText: 'Geen gegevens',
      loading: 'Laden...',
      noMatch: 'Geen overeenkomende gegevens'
    },
    // Kalender
    calendar: {
      prevMonth: 'Vorige maand',
      nextMonth: 'Volgende maand',
      prevYear: 'Vorig jaar',
      nextYear: 'Volgend jaar',
      today: 'Vandaag',
      week: 'Week',
      holiday: 'Feestdag',
      workday: 'Werkdag',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Zo',
        mon: 'Ma',
        tue: 'Di',
        wed: 'Wo',
        thu: 'Do',
        fri: 'Vr',
        sat: 'Za'
      }
    },
    // Automatisch aanvullen
    autocomplete: {
      loading: 'Laden...',
      placeholder: 'Voer in',
      noData: 'Geen gegevens',
      noMatch: 'Geen overeenkomende gegevens'
    },
    // Aftellen
    countdown: {
      days: 'dagen',
      hours: 'uren',
      minutes: 'minuten',
      seconds: 'seconden',
      milliseconds: 'milliseconden',
      finished: 'Voltooid'
    },
    // Cascadeselectie
    cascader: {
      noMatch: 'Geen overeenkomende gegevens',
      placeholder: 'Selecteer',
      loading: 'Laden...',
      noData: 'Geen gegevens'
    },
    // Overdracht
    transfer: {
      noMatch: 'Geen overeenkomende gegevens',
      noData: 'Geen gegevens',
      titles: ['Lijst 1', 'Lijst 2'],
      filterPlaceholder: 'Voer trefwoord in',
      noCheckedFormat: '{total} items',
      hasCheckedFormat: '{checked}/{total} geselecteerd',
      searchPlaceholder: 'Voer trefwoord in'
    },
    // Tabel
    table: {
      emptyText: 'Geen gegevens',
      confirmFilter: 'Bevestigen',
      resetFilter: 'Resetten',
      clearFilter: 'Alles',
      sumText: 'Som',
      loading: 'Laden...',
      index: 'Index',
      print: 'Afdrukken',
      cancel: 'Annuleren',
      preview: 'Afdrukvoorbeeld',
      printTime: 'Afdruktijd',
      total: 'Totaal {total} items',
      page: 'Pagina {page}',
      yes: 'Ja',
      no: 'Nee',
      // Werkbalk
      toolbar: {
        refresh: 'Vernieuwen',
        density: 'Dichtheid',
        densityDefault: 'Standaard',
        densityLarge: 'Groot',
        densitySmall: 'Klein',
        columnSetting: 'Kolominstellingen',
        fullscreen: 'Volledig scherm',
        exitFullscreen: 'Volledig scherm afsluiten',
        export: 'Exporteren',
        import: 'Importeren',
        search: 'Zoeken',
        searchPlaceholder: 'Voer trefwoorden in om te zoeken'
      },
      // Filter
      filter: {
        selectAll: 'Alles selecteren',
        selectInvert: 'Selectie omkeren',
        empty: 'Is leeg',
        notEmpty: 'Is niet leeg',
        contains: 'Bevat',
        notContains: 'Bevat niet',
        equals: 'Is gelijk aan',
        notEquals: 'Is niet gelijk aan',
        startsWith: 'Begint met',
        endsWith: 'Eindigt met',
        greaterThan: 'Groter dan',
        lessThan: 'Kleiner dan',
        between: 'Tussen'
      },
      // Sorteren
      sort: {
        asc: 'Oplopend',
        desc: 'Aflopend',
        clear: 'Sortering wissen'
      },
      // Exporteren
      export: {
        title: 'Gegevens exporteren',
        filename: 'Bestandsnaam',
        type: 'Bestandstype',
        scope: 'Exportbereik',
        scopeAll: 'Alle gegevens',
        scopeSelected: 'Geselecteerde gegevens',
        scopeCurrentPage: 'Huidige pagina',
        includeHeader: 'Koptekst opnemen',
        exporting: 'Exporteren...',
        success: 'Export succesvol',
        error: 'Export mislukt'
      },
      // Importeren
      import: {
        title: 'Gegevens importeren',
        selectFile: 'Selecteer bestand',
        dragTip: 'Klik of sleep bestand hierheen om te uploaden',
        importing: 'Importeren...',
        success: 'Import succesvol',
        error: 'Import mislukt',
        preview: 'Gegevensvoorbeeld',
        confirm: 'Import bevestigen'
      },
      // Afdrukken
      printConfig: {
        title: 'Afdrukinstellingen',
        pageTitle: 'Paginatitel',
        pageHeader: 'Koptekst',
        pageFooter: 'Voettekst',
        printAll: 'Alles afdrukken',
        printSelected: 'Geselecteerde afdrukken',
        printCurrentPage: 'Huidige pagina afdrukken',
        landscape: 'Liggend',
        portrait: 'Staand',
        printing: 'Afdrukken...'
      },
      // Kolominstellingen
      columnSetting: {
        title: 'Kolominstellingen',
        showAll: 'Alles tonen',
        hideAll: 'Alles verbergen',
        reset: 'Resetten',
        fixedLeft: 'Links vastzetten',
        fixedRight: 'Rechts vastzetten',
        unfixed: 'Vastzetten opheffen'
      },
      // Contextmenu
      contextMenu: {
        copy: 'Kopiëren',
        copyRow: 'Rij kopiëren',
        copyCell: 'Cel kopiëren',
        paste: 'Plakken',
        insertRowAbove: 'Rij boven invoegen',
        insertRowBelow: 'Rij onder invoegen',
        deleteRow: 'Rij verwijderen',
        deleteSelectedRows: 'Geselecteerde rijen verwijderen',
        exportSelected: 'Geselecteerde exporteren'
      },
      // Selectie
      selection: {
        selectAll: 'Alles selecteren',
        selectInvert: 'Selectie omkeren',
        selectNone: 'Selectie wissen',
        selected: '{count} items geselecteerd'
      },
      // Uitklappen
      expand: {
        expandAll: 'Alles uitklappen',
        collapseAll: 'Alles inklappen'
      },
      // Boom
      tree: {
        expandAll: 'Alles uitklappen',
        collapseAll: 'Alles inklappen',
        expandLevel: 'Uitklappen tot niveau {level}'
      },
      // Slepen
      drag: {
        dragTip: 'Sleep om te herordenen',
        dropTip: 'Laat los om te plaatsen'
      }
    },
    // Berichtvenster
    messagebox: {
      title: 'Bericht',
      confirm: 'OK',
      cancel: 'Annuleren',
      close: 'Sluiten',
      error: 'Ongeldige invoer',
      alert: 'Waarschuwing',
      prompt: 'Prompt',
      inputPlaceholder: 'Voer in'
    },
    // Uploaden
    upload: {
      deleteTip: 'druk op delete om te verwijderen',
      delete: 'Verwijderen',
      preview: 'Voorbeeld',
      continue: 'Doorgaan',
      upload: 'Klik om te uploaden',
      tip: 'Klik of sleep bestand naar dit gebied om te <em>uploaden</em>',
      dragTip: 'Sleep bestand hierheen of klik om te uploaden',
      uploading: 'Uploaden...',
      success: 'Upload succesvol',
      error: 'Upload mislukt',
      retry: 'Opnieuw proberen',
      cancel: 'Upload annuleren',
      fileTypeError: 'Bestandstype niet ondersteund',
      fileSizeError: 'Bestandsgrootte overschrijdt limiet',
      fileCountError: 'Aantal bestanden overschrijdt limiet'
    },
    // Formulier
    form: {
      validationFailed: 'Validatie mislukt',
      required: 'Verplicht',
      pleaseInput: 'Voer in',
      pleaseSelect: 'Selecteer'
    },
    // Knop
    button: {
      loading: 'Laden...'
    },
    // Invoer
    input: {
      placeholder: 'Voer in',
      clear: 'Wissen',
      showPassword: 'Wachtwoord tonen',
      hidePassword: 'Wachtwoord verbergen',
      copy: 'Kopiëren',
      copied: 'Gekopieerd'
    },
    // Nummerinvoer
    inputnumber: {
      placeholder: 'Voer nummer in',
      increase: 'Verhogen',
      decrease: 'Verlagen'
    },
    // Taginvoer
    inputtag: {
      placeholder: 'Voer in',
      add: 'Toevoegen',
      remove: 'Verwijderen'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'Meer'
    },
    // Terug naar boven
    backtop: {
      text: 'Terug naar boven'
    },
    // Selectie
    select: {
      placeholder: 'Selecteer',
      noData: 'Geen gegevens',
      loading: 'Laden...',
      noMatch: 'Geen overeenkomende gegevens',
      selectAll: 'Alles selecteren',
      clearAll: 'Alles wissen'
    },
    // Paginering
    pagination: {
      goto: 'Ga naar',
      page: '',
      total: 'Totaal {total}',
      pageSize: '/pagina',
      prev: 'Vorige',
      next: 'Volgende',
      first: 'Eerste',
      last: 'Laatste',
      pageClassifier: ''
    },
    // Popconfirm
    popconfirm: {
      confirm: 'OK',
      cancel: 'Annuleren',
      dontAskAgain: 'Niet meer vragen'
    },
    // Dialoog
    dialog: {
      confirm: 'OK',
      cancel: 'Annuleren',
      close: 'Sluiten',
      maximize: 'Maximaliseren',
      restore: 'Herstellen'
    },
    // Lade
    drawer: {
      close: 'Sluiten',
      confirm: 'OK',
      cancel: 'Annuleren'
    },
    // Dropdownmenu
    dropdown: {
      loading: 'Laden...'
    },
    // Afbeelding
    image: {
      error: 'MISLUKT',
      loading: 'Laden...',
      preview: 'Voorbeeld',
      zoomIn: 'Inzoomen',
      zoomOut: 'Uitzoomen',
      rotateLeft: 'Linksom draaien',
      rotateRight: 'Rechtsom draaien',
      originalSize: 'Originele grootte',
      fullscreen: 'Volledig scherm'
    },
    // Afbeeldingviewer
    imageviewer: {
      close: 'Sluiten',
      prev: 'Vorige',
      next: 'Volgende',
      zoomIn: 'Inzoomen',
      zoomOut: 'Uitzoomen',
      rotateLeft: 'Linksom draaien',
      rotateRight: 'Rechtsom draaien',
      reset: 'Resetten',
      fullscreen: 'Volledig scherm',
      exitFullscreen: 'Volledig scherm afsluiten'
    },
    // Oneindig scrollen
    infinitescroll: {
      loading: 'Laden...',
      finished: 'Geen gegevens meer',
      error: 'Laden mislukt, klik om opnieuw te proberen',
      retry: 'Klik om opnieuw te proberen'
    },
    // Bericht
    message: {
      close: 'Sluiten'
    },
    // Melding
    notification: {
      close: 'Sluiten'
    },
    // Laden
    loading: {
      text: 'Laden...'
    },
    // Spinner
    spin: {
      text: 'Laden...'
    },
    // Beoordeling
    rate: {
      texts: ['Zeer slecht', 'Teleurgesteld', 'Redelijk', 'Tevreden', 'Verrast']
    },
    // Waarschuwing
    alert: {
      close: 'Sluiten'
    },
    // Tag
    tag: {
      close: 'Sluiten'
    },
    // Tabs
    tabs: {
      close: 'Sluiten',
      add: 'Toevoegen',
      more: 'Meer'
    },
    // Stappen
    steps: {
      finish: 'Voltooid',
      process: 'In uitvoering',
      wait: 'Wachten',
      error: 'Fout'
    },
    // Voortgang
    progress: {
      success: 'Succes',
      exception: 'Uitzondering',
      warning: 'Waarschuwing'
    },
    // Skelet
    skeleton: {
      loading: 'Laden...'
    },
    // Leeg
    empty: {
      description: 'Geen gegevens',
      noData: 'Geen gegevens',
      noResult: 'Geen resultaten',
      networkError: 'Netwerkfout',
      serverError: 'Serverfout'
    },
    // Resultaat
    result: {
      success: 'Succes',
      error: 'Fout',
      warning: 'Waarschuwing',
      info: 'Informatie',
      backHome: 'Terug naar start'
    },
    // Waterval
    waterfall: {
      loading: 'Laden...',
      noMore: 'Geen gegevens meer',
      empty: 'Geen gegevens'
    },
    // Beschrijvingen
    descriptions: {
      colon: ':'
    },
    // Schuifregelaar
    slider: {
      tipFormatter: '{value}'
    },
    // Schakelaar
    switch: {
      on: 'AAN',
      off: 'UIT'
    },
    // Selectievakje
    checkbox: {
      selectAll: 'Alles selecteren'
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: 'Menu inklappen',
      expand: 'Menu uitklappen'
    },
    // Kaart
    card: {
      collapse: 'Inklappen',
      expand: 'Uitklappen'
    },
    // Inklappen
    collapse: {
      expand: 'Uitklappen',
      collapse: 'Inklappen'
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: 'Laden mislukt'
    },
    // Watermerk
    watermark: {},
    // Scheidingslijn
    divider: {},
    // Carrousel
    carousel: {
      prev: 'Vorige',
      next: 'Volgende'
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Anker
    anchor: {}
  }
}

export default nl
