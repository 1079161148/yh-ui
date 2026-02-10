import type { Language } from '../index'

export const de: Language = {
  name: 'de',
  yh: {
    common: {
      yes: 'Ja',
      no: 'Nein',
      confirm: 'Bestätigen',
      cancel: 'Abbrechen',
      loading: 'Laden',
      close: 'Schließen',
      clear: 'Leeren',
      reset: 'Zurücksetzen',
      save: 'Speichern',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      add: 'Hinzufügen',
      search: 'Suchen',
      refresh: 'Aktualisieren',
      expand: 'Erweitern',
      collapse: 'Zusammenklappen',
      more: 'Mehr',
      noData: 'Keine Daten',
      noMatch: 'Keine Übereinstimmung',
      selectAll: 'Alle auswählen',
      unselectAll: 'Auswahl aufheben'
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Leeren',
      eyeDropper: 'Pipette',
      suggestionDark: 'Weißer Text empfohlen',
      suggestionLight: 'Schwarzer Text empfohlen',
      recentColors: 'Zuletzt verwendet',
      presetColors: 'Voreingestellte Farben'
    },
    datepicker: {
      now: 'Jetzt',
      today: 'Heute',
      cancel: 'Abbrechen',
      clear: 'Leeren',
      confirm: 'OK',
      selectDate: 'Datum auswählen',
      selectTime: 'Zeit auswählen',
      startDate: 'Startdatum',
      startTime: 'Startzeit',
      endDate: 'Enddatum',
      endTime: 'Endzeit',
      year: '',
      month: '',
      day: '',
      week: 'Woche',
      monthBeforeYear: true,
      prevYear: 'Vorheriges Jahr',
      nextYear: 'Nächstes Jahr',
      prevMonth: 'Vorheriger Monat',
      nextMonth: 'Nächster Monat',
      weeks: {
        sun: 'So',
        mon: 'Mo',
        tue: 'Di',
        wed: 'Mi',
        thu: 'Do',
        fri: 'Fr',
        sat: 'Sa'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mär',
        apr: 'Apr',
        may: 'Mai',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Aug',
        sep: 'Sep',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Dez'
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
      cancel: 'Abbrechen',
      now: 'Jetzt',
      placeholder: 'Zeit auswählen',
      startPlaceholder: 'Startzeit',
      endPlaceholder: 'Endzeit',
      selectTime: 'Zeit auswählen'
    },
    timeselect: {
      placeholder: 'Zeit auswählen'
    },
    tree: {
      emptyText: 'Keine Daten',
      loading: 'Laden...',
      checkAll: 'Alle auswählen',
      uncheckAll: 'Auswahl aufheben',
      expandAll: 'Alle erweitern',
      collapseAll: 'Alle zusammenklappen'
    },
    treeselect: {
      placeholder: 'Bitte auswählen',
      emptyText: 'Keine Daten',
      loading: 'Laden...',
      noMatch: 'Keine Übereinstimmung'
    },
    calendar: {
      prevMonth: 'Vorheriger Monat',
      nextMonth: 'Nächster Monat',
      prevYear: 'Vorheriges Jahr',
      nextYear: 'Nächstes Jahr',
      today: 'Heute',
      week: 'Woche',
      holiday: 'Frei',
      workday: 'Arbeit',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'So',
        mon: 'Mo',
        tue: 'Di',
        wed: 'Mi',
        thu: 'Do',
        fri: 'Fr',
        sat: 'Sa'
      }
    },
    autocomplete: {
      loading: 'Laden...',
      placeholder: 'Bitte eingeben',
      noData: 'Keine Daten',
      noMatch: 'Keine Übereinstimmung'
    },
    countdown: {
      days: 'Tage',
      hours: 'Stunden',
      minutes: 'Minuten',
      seconds: 'Sekunden',
      milliseconds: 'Millisekunden',
      finished: 'Beendet'
    },
    cascader: {
      noMatch: 'Keine Übereinstimmung',
      placeholder: 'Bitte auswählen',
      loading: 'Laden...',
      noData: 'Keine Daten'
    },
    transfer: {
      noMatch: 'Keine Übereinstimmung',
      noData: 'Keine Daten',
      titles: ['Liste 1', 'Liste 2'],
      filterPlaceholder: 'Suchbegriff eingeben',
      noCheckedFormat: '{total} Elemente',
      hasCheckedFormat: '{checked}/{total} ausgewählt',
      searchPlaceholder: 'Suchbegriff eingeben'
    },
    table: {
      emptyText: 'Keine Daten',
      confirmFilter: 'Bestätigen',
      resetFilter: 'Zurücksetzen',
      clearFilter: 'Alle',
      sumText: 'Summe',
      loading: 'Laden...',
      index: 'Nr.',
      print: 'Drucken',
      cancel: 'Abbrechen',
      preview: 'Druckvorschau',
      printTime: 'Druckzeit',
      total: 'Gesamt {total}',
      page: 'Seite {page}',
      yes: 'Ja',
      no: 'Nein',
      toolbar: {
        refresh: 'Aktualisieren',
        density: 'Dichte',
        densityDefault: 'Standard',
        densityLarge: 'Groß',
        densitySmall: 'Klein',
        columnSetting: 'Spalteneinstellungen',
        fullscreen: 'Vollbild',
        exitFullscreen: 'Vollbild beenden',
        export: 'Exportieren',
        import: 'Importieren',
        search: 'Suchen',
        searchPlaceholder: 'Suchbegriff eingeben'
      },
      filter: {
        selectAll: 'Alle auswählen',
        selectInvert: 'Auswahl umkehren',
        empty: 'Leer',
        notEmpty: 'Nicht leer',
        contains: 'Enthält',
        notContains: 'Enthält nicht',
        equals: 'Gleich',
        notEquals: 'Ungleich',
        startsWith: 'Beginnt mit',
        endsWith: 'Endet mit',
        greaterThan: 'Größer als',
        lessThan: 'Kleiner als',
        between: 'Zwischen'
      },
      sort: {
        asc: 'Aufsteigend',
        desc: 'Absteigend',
        clear: 'Sortierung aufheben'
      },
      export: {
        title: 'Daten exportieren',
        filename: 'Dateiname',
        type: 'Dateityp',
        scope: 'Exportbereich',
        scopeAll: 'Alle Daten',
        scopeSelected: 'Ausgewählte Daten',
        scopeCurrentPage: 'Aktuelle Seite',
        includeHeader: 'Kopfzeile einschließen',
        exporting: 'Exportieren...',
        success: 'Export erfolgreich',
        error: 'Export fehlgeschlagen'
      },
      import: {
        title: 'Daten importieren',
        selectFile: 'Datei auswählen',
        dragTip: 'Datei hierher ziehen oder klicken',
        importing: 'Importieren...',
        success: 'Import erfolgreich',
        error: 'Import fehlgeschlagen',
        preview: 'Datenvorschau',
        confirm: 'Import bestätigen'
      },
      printConfig: {
        title: 'Druckeinstellungen',
        pageTitle: 'Seitentitel',
        pageHeader: 'Kopfzeile',
        pageFooter: 'Fußzeile',
        printAll: 'Alle drucken',
        printSelected: 'Auswahl drucken',
        printCurrentPage: 'Aktuelle Seite drucken',
        landscape: 'Querformat',
        portrait: 'Hochformat',
        printing: 'Drucken...'
      },
      columnSetting: {
        title: 'Spalteneinstellungen',
        showAll: 'Alle anzeigen',
        hideAll: 'Alle ausblenden',
        reset: 'Zurücksetzen',
        fixedLeft: 'Links fixieren',
        fixedRight: 'Rechts fixieren',
        unfixed: 'Fixierung aufheben'
      },
      contextMenu: {
        copy: 'Kopieren',
        copyRow: 'Zeile kopieren',
        copyCell: 'Zelle kopieren',
        paste: 'Einfügen',
        insertRowAbove: 'Zeile darüber einfügen',
        insertRowBelow: 'Zeile darunter einfügen',
        deleteRow: 'Zeile löschen',
        deleteSelectedRows: 'Ausgewählte Zeilen löschen',
        exportSelected: 'Auswahl exportieren'
      },
      selection: {
        selectAll: 'Alle auswählen',
        selectInvert: 'Auswahl umkehren',
        selectNone: 'Auswahl aufheben',
        selected: '{count} ausgewählt'
      },
      expand: {
        expandAll: 'Alle erweitern',
        collapseAll: 'Alle zusammenklappen'
      },
      tree: {
        expandAll: 'Alle erweitern',
        collapseAll: 'Alle zusammenklappen',
        expandLevel: 'Bis Ebene {level} erweitern'
      },
      drag: {
        dragTip: 'Zum Sortieren ziehen',
        dropTip: 'Zum Platzieren ablegen'
      }
    },
    messagebox: {
      title: 'Nachricht',
      confirm: 'OK',
      cancel: 'Abbrechen',
      close: 'Schließen',
      error: 'Ungültige Eingabe',
      alert: 'Warnung',
      prompt: 'Eingabe',
      inputPlaceholder: 'Bitte eingeben'
    },
    upload: {
      deleteTip: 'Zum Löschen Entf drücken',
      delete: 'Löschen',
      preview: 'Vorschau',
      continue: 'Fortfahren',
      upload: 'Klicken zum Hochladen',
      tip: 'Datei hierher ziehen oder <em>klicken zum Hochladen</em>',
      dragTip: 'Datei hierher ziehen',
      uploading: 'Hochladen...',
      success: 'Hochladen erfolgreich',
      error: 'Hochladen fehlgeschlagen',
      retry: 'Wiederholen',
      cancel: 'Hochladen abbrechen',
      fileTypeError: 'Dateityp nicht unterstützt',
      fileSizeError: 'Dateigröße überschritten',
      fileCountError: 'Dateianzahl überschritten'
    },
    form: {
      validationFailed: 'Validierung fehlgeschlagen',
      required: 'Erforderlich',
      pleaseInput: 'Bitte eingeben',
      pleaseSelect: 'Bitte auswählen'
    },
    button: {
      loading: 'Laden...'
    },
    input: {
      placeholder: 'Bitte eingeben',
      clear: 'Leeren',
      showPassword: 'Passwort anzeigen',
      hidePassword: 'Passwort ausblenden',
      copy: 'Kopieren',
      copied: 'Kopiert'
    },
    inputnumber: {
      placeholder: 'Zahl eingeben',
      increase: 'Erhöhen',
      decrease: 'Verringern'
    },
    inputtag: {
      placeholder: 'Bitte eingeben',
      add: 'Hinzufügen',
      remove: 'Entfernen'
    },
    breadcrumb: {
      label: 'Brotkrumen',
      more: 'Mehr'
    },
    backtop: {
      text: 'Nach oben'
    },
    select: {
      placeholder: 'Bitte auswählen',
      noData: 'Keine Daten',
      loading: 'Laden...',
      noMatch: 'Keine Übereinstimmung',
      selectAll: 'Alle auswählen',
      clearAll: 'Alle leeren'
    },
    pagination: {
      goto: 'Gehe zu',
      page: '',
      total: 'Gesamt {total}',
      pageSize: '/Seite',
      prev: 'Zurück',
      next: 'Weiter',
      first: 'Erste',
      last: 'Letzte',
      pageClassifier: ''
    },
    popconfirm: {
      confirm: 'OK',
      cancel: 'Abbrechen',
      dontAskAgain: 'Nicht mehr fragen'
    },
    dialog: {
      confirm: 'OK',
      cancel: 'Abbrechen',
      close: 'Schließen',
      maximize: 'Maximieren',
      restore: 'Wiederherstellen'
    },
    drawer: {
      close: 'Schließen',
      confirm: 'OK',
      cancel: 'Abbrechen'
    },
    dropdown: {
      loading: 'Laden...'
    },
    image: {
      error: 'Laden fehlgeschlagen',
      loading: 'Laden...',
      preview: 'Vorschau',
      zoomIn: 'Vergrößern',
      zoomOut: 'Verkleinern',
      rotateLeft: 'Links drehen',
      rotateRight: 'Rechts drehen',
      originalSize: 'Originalgröße',
      fullscreen: 'Vollbild'
    },
    imageviewer: {
      close: 'Schließen',
      prev: 'Zurück',
      next: 'Weiter',
      zoomIn: 'Vergrößern',
      zoomOut: 'Verkleinern',
      rotateLeft: 'Links drehen',
      rotateRight: 'Rechts drehen',
      reset: 'Zurücksetzen',
      fullscreen: 'Vollbild',
      exitFullscreen: 'Vollbild beenden'
    },
    infinitescroll: {
      loading: 'Laden...',
      finished: 'Keine weiteren Daten',
      error: 'Laden fehlgeschlagen, zum Wiederholen klicken',
      retry: 'Zum Wiederholen klicken'
    },
    message: {
      close: 'Schließen'
    },
    notification: {
      close: 'Schließen'
    },
    loading: {
      text: 'Laden...'
    },
    spin: {
      text: 'Laden...'
    },
    rate: {
      texts: ['Sehr schlecht', 'Enttäuschend', 'Akzeptabel', 'Zufriedenstellend', 'Überraschend']
    },
    alert: {
      close: 'Schließen'
    },
    tag: {
      close: 'Schließen'
    },
    tabs: {
      close: 'Schließen',
      add: 'Hinzufügen',
      more: 'Mehr'
    },
    steps: {
      finish: 'Abgeschlossen',
      process: 'In Bearbeitung',
      wait: 'Wartend',
      error: 'Fehler'
    },
    progress: {
      success: 'Erfolg',
      exception: 'Ausnahme',
      warning: 'Warnung'
    },
    skeleton: {
      loading: 'Laden...'
    },
    empty: {
      description: 'Keine Daten',
      noData: 'Keine Daten',
      noResult: 'Kein Ergebnis',
      networkError: 'Netzwerkfehler',
      serverError: 'Serverfehler'
    },
    result: {
      success: 'Erfolg',
      error: 'Fehler',
      warning: 'Warnung',
      info: 'Information',
      backHome: 'Zurück zur Startseite'
    },
    waterfall: {
      loading: 'Laden...',
      noMore: 'Keine weiteren Daten',
      empty: 'Keine Daten'
    },
    descriptions: {
      colon: ':'
    },
    slider: {
      tipFormatter: '{value}'
    },
    switch: {
      on: 'AN',
      off: 'AUS'
    },
    checkbox: {
      selectAll: 'Alle auswählen'
    },
    radio: {},
    menu: {
      collapse: 'Menü zusammenklappen',
      expand: 'Menü erweitern'
    },
    card: {
      collapse: 'Zusammenklappen',
      expand: 'Erweitern'
    },
    collapse: {
      expand: 'Erweitern',
      collapse: 'Zusammenklappen'
    },
    tooltip: {},
    popover: {},
    badge: {},
    avatar: {
      error: 'Laden fehlgeschlagen'
    },
    watermark: {},
    divider: {},
    carousel: {
      prev: 'Zurück',
      next: 'Weiter'
    },
    marquee: {},
    affix: {},
    anchor: {}
  }
}

export default de

