import type { Language } from '../index'

export const ro: Language = {
  name: 'ro',
  yh: {
    // Comun
    common: {
      yes: 'Da',
      no: 'Nu',
      confirm: 'Confirmă',
      cancel: 'Anulează',
      loading: 'Se încarcă',
      close: 'Închide',
      clear: 'Șterge',
      reset: 'Resetează',
      save: 'Salvează',
      delete: 'Șterge',
      edit: 'Editează',
      add: 'Adaugă',
      search: 'Caută',
      refresh: 'Reîmprospătează',
      expand: 'Extinde',
      collapse: 'Restrânge',
      more: 'Mai mult',
      noData: 'Fără date',
      noMatch: 'Nicio potrivire',
      selectAll: 'Selectează tot',
      unselectAll: 'Deselectează tot'
    },
    // Selector de culori
    colorpicker: {
      confirm: 'OK',
      clear: 'Șterge',
      eyeDropper: 'Pipetă',
      suggestionDark: 'Textul alb este mai bun',
      suggestionLight: 'Textul negru este mai bun',
      recentColors: 'Culori recente',
      presetColors: 'Culori prestabilite'
    },
    // Selector de dată
    datepicker: {
      now: 'Acum',
      today: 'Astăzi',
      cancel: 'Anulează',
      clear: 'Șterge',
      confirm: 'OK',
      selectDate: 'Selectați data',
      selectTime: 'Selectați ora',
      startDate: 'Data de început',
      startTime: 'Ora de început',
      endDate: 'Data de sfârșit',
      endTime: 'Ora de sfârșit',
      year: '',
      month: '',
      day: '',
      week: 'Săptămână',
      monthBeforeYear: true,
      prevYear: 'Anul precedent',
      nextYear: 'Anul următor',
      prevMonth: 'Luna precedentă',
      nextMonth: 'Luna următoare',
      weeks: {
        sun: 'Du',
        mon: 'Lu',
        tue: 'Ma',
        wed: 'Mi',
        thu: 'Jo',
        fri: 'Vi',
        sat: 'Sâ'
      },
      months: {
        jan: 'Ian',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'Mai',
        jun: 'Iun',
        jul: 'Iul',
        aug: 'Aug',
        sep: 'Sep',
        oct: 'Oct',
        nov: 'Nov',
        dec: 'Dec'
      },
      quarters: {
        q1: 'T1',
        q2: 'T2',
        q3: 'T3',
        q4: 'T4'
      }
    },
    // Selector de oră
    timepicker: {
      confirm: 'OK',
      cancel: 'Anulează',
      now: 'Acum',
      placeholder: 'Selectați ora',
      startPlaceholder: 'Ora de început',
      endPlaceholder: 'Ora de sfârșit',
      selectTime: 'Selectați ora'
    },
    // Selectare oră
    timeselect: {
      placeholder: 'Selectați ora'
    },
    // Arbore
    tree: {
      emptyText: 'Fără date',
      loading: 'Se încarcă...',
      checkAll: 'Selectează tot',
      uncheckAll: 'Deselectează tot',
      expandAll: 'Extinde tot',
      collapseAll: 'Restrânge tot'
    },
    // Selector arbore
    treeselect: {
      placeholder: 'Selectați',
      emptyText: 'Fără date',
      loading: 'Se încarcă...',
      noMatch: 'Nicio potrivire'
    },
    // Calendar
    calendar: {
      prevMonth: 'Luna precedentă',
      nextMonth: 'Luna următoare',
      prevYear: 'Anul precedent',
      nextYear: 'Anul următor',
      today: 'Astăzi',
      week: 'Săptămână',
      holiday: 'Sărbătoare',
      workday: 'Lucru',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Du',
        mon: 'Lu',
        tue: 'Ma',
        wed: 'Mi',
        thu: 'Jo',
        fri: 'Vi',
        sat: 'Sâ'
      }
    },
    // Autocompletare
    autocomplete: {
      loading: 'Se încarcă...',
      placeholder: 'Vă rugăm să introduceți',
      noData: 'Fără date',
      noMatch: 'Nicio potrivire'
    },
    // Numărătoare inversă
    countdown: {
      days: 'zile',
      hours: 'ore',
      minutes: 'minute',
      seconds: 'secunde',
      milliseconds: 'milisecunde',
      finished: 'Terminat'
    },
    // Cascadă
    cascader: {
      noMatch: 'Nicio potrivire',
      placeholder: 'Selectați',
      loading: 'Se încarcă...',
      noData: 'Fără date'
    },
    // Transfer
    transfer: {
      noMatch: 'Nicio potrivire',
      noData: 'Fără date',
      titles: ['Lista 1', 'Lista 2'],
      filterPlaceholder: 'Introduceți cuvântul cheie',
      noCheckedFormat: '{total} elemente',
      hasCheckedFormat: '{checked}/{total} selectate',
      searchPlaceholder: 'Introduceți cuvântul cheie'
    },
    // Tabel
    table: {
      emptyText: 'Fără date',
      confirmFilter: 'Confirmă',
      resetFilter: 'Resetează',
      clearFilter: 'Tot',
      sumText: 'Sumă',
      loading: 'Se încarcă...',
      index: 'Index',
      print: 'Tipărește',
      cancel: 'Anulează',
      preview: 'Previzualizare tipărire',
      printTime: 'Ora tipăririi',
      total: 'Total {total} elemente',
      page: 'Pagina {page}',
      yes: 'Da',
      no: 'Nu',
      // Bara de instrumente
      toolbar: {
        refresh: 'Reîmprospătează',
        density: 'Densitate',
        densityDefault: 'Implicit',
        densityLarge: 'Mare',
        densitySmall: 'Mic',
        columnSetting: 'Setări coloane',
        fullscreen: 'Ecran complet',
        exitFullscreen: 'Ieșire ecran complet',
        export: 'Exportă',
        import: 'Importă',
        search: 'Caută',
        searchPlaceholder: 'Introduceți cuvintele cheie pentru căutare'
      },
      // Filtru
      filter: {
        selectAll: 'Selectează tot',
        selectInvert: 'Inversează selecția',
        empty: 'Gol',
        notEmpty: 'Nu este gol',
        contains: 'Conține',
        notContains: 'Nu conține',
        equals: 'Egal cu',
        notEquals: 'Nu este egal cu',
        startsWith: 'Începe cu',
        endsWith: 'Se termină cu',
        greaterThan: 'Mai mare decât',
        lessThan: 'Mai mic decât',
        between: 'Între'
      },
      // Sortare
      sort: {
        asc: 'Crescător',
        desc: 'Descrescător',
        clear: 'Șterge sortarea'
      },
      // Exportare
      export: {
        title: 'Exportare date',
        filename: 'Nume fișier',
        type: 'Tip fișier',
        scope: 'Domeniu export',
        scopeAll: 'Toate datele',
        scopeSelected: 'Date selectate',
        scopeCurrentPage: 'Pagina curentă',
        includeHeader: 'Include antetul',
        exporting: 'Se exportă...',
        success: 'Export reușit',
        error: 'Eroare la export'
      },
      // Importare
      import: {
        title: 'Importare date',
        selectFile: 'Selectați fișierul',
        dragTip: 'Faceți clic sau trageți fișierul aici pentru încărcare',
        importing: 'Se importă...',
        success: 'Import reușit',
        error: 'Eroare la import',
        preview: 'Previzualizare date',
        confirm: 'Confirmă importul'
      },
      // Tipărire
      printConfig: {
        title: 'Setări tipărire',
        pageTitle: 'Titlul paginii',
        pageHeader: 'Antet',
        pageFooter: 'Subsol',
        printAll: 'Tipărește tot',
        printSelected: 'Tipărește selecția',
        printCurrentPage: 'Tipărește pagina curentă',
        landscape: 'Peisaj',
        portrait: 'Portret',
        printing: 'Se tipărește...'
      },
      // Setări coloane
      columnSetting: {
        title: 'Setări coloane',
        showAll: 'Afișează tot',
        hideAll: 'Ascunde tot',
        reset: 'Resetează',
        fixedLeft: 'Fixează la stânga',
        fixedRight: 'Fixează la dreapta',
        unfixed: 'Anulează fixarea'
      },
      // Meniu contextual
      contextMenu: {
        copy: 'Copiază',
        copyRow: 'Copiază rândul',
        copyCell: 'Copiază celula',
        paste: 'Lipește',
        insertRowAbove: 'Inserează rând deasupra',
        insertRowBelow: 'Inserează rând dedesubt',
        deleteRow: 'Șterge rândul',
        deleteSelectedRows: 'Șterge rândurile selectate',
        exportSelected: 'Exportă selecția'
      },
      // Selecție
      selection: {
        selectAll: 'Selectează tot',
        selectInvert: 'Inversează selecția',
        selectNone: 'Șterge selecția',
        selected: '{count} elemente selectate'
      },
      // Extindere
      expand: {
        expandAll: 'Extinde tot',
        collapseAll: 'Restrânge tot'
      },
      // Arbore
      tree: {
        expandAll: 'Extinde tot',
        collapseAll: 'Restrânge tot',
        expandLevel: 'Extinde până la nivelul {level}'
      },
      // Tragere
      drag: {
        dragTip: 'Trageți pentru a reordona',
        dropTip: 'Eliberați pentru a plasa'
      }
    },
    // Casetă de mesaj
    messagebox: {
      title: 'Mesaj',
      confirm: 'OK',
      cancel: 'Anulează',
      close: 'Închide',
      error: 'Intrare invalidă',
      alert: 'Alertă',
      prompt: 'Sugestie',
      inputPlaceholder: 'Vă rugăm să introduceți'
    },
    // Încărcare
    upload: {
      deleteTip: 'apăsați delete pentru a șterge',
      delete: 'Șterge',
      preview: 'Previzualizare',
      continue: 'Continuă',
      upload: 'Faceți clic pentru a încărca',
      tip: 'Faceți clic sau trageți fișierul în această zonă pentru <em>încărcare</em>',
      dragTip: 'Trageți fișierul aici sau faceți clic pentru a încărca',
      uploading: 'Se încarcă...',
      success: 'Încărcare reușită',
      error: 'Eroare la încărcare',
      retry: 'Reîncearcă',
      cancel: 'Anulează încărcarea',
      fileTypeError: 'Tipul de fișier nu este acceptat',
      fileSizeError: 'Dimensiunea fișierului depășește limita',
      fileCountError: 'Numărul de fișiere depășește limita'
    },
    // Formular
    form: {
      validationFailed: 'Validare eșuată',
      required: 'Obligatoriu',
      pleaseInput: 'Vă rugăm să introduceți',
      pleaseSelect: 'Vă rugăm să selectați'
    },
    // Buton
    button: {
      loading: 'Se încarcă...'
    },
    // Intrare
    input: {
      placeholder: 'Vă rugăm să introduceți',
      clear: 'Șterge',
      showPassword: 'Afișează parola',
      hidePassword: 'Ascunde parola',
      copy: 'Copiază',
      copied: 'Copiat'
    },
    // Număr
    inputnumber: {
      placeholder: 'Vă rugăm să introduceți un număr',
      increase: 'Crește',
      decrease: 'Scade'
    },
    // Etichetă de intrare
    inputtag: {
      placeholder: 'Vă rugăm să introduceți',
      add: 'Adaugă',
      remove: 'Elimină'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'Mai mult'
    },
    // Înapoi sus
    backtop: {
      text: 'Înapoi sus'
    },
    // Selectare
    select: {
      placeholder: 'Vă rugăm să selectați',
      noData: 'Fără date',
      loading: 'Se încarcă...',
      noMatch: 'Nicio potrivire',
      selectAll: 'Selectează tot',
      clearAll: 'Șterge tot'
    },
    // Paginare
    pagination: {
      goto: 'Mergi la',
      page: '',
      total: 'Total {total}',
      pageSize: '/pagină',
      prev: 'Precedent',
      next: 'Următor',
      first: 'Prima',
      last: 'Ultima',
      pageClassifier: ''
    },
    // Confirmare popup
    popconfirm: {
      confirm: 'OK',
      cancel: 'Anulează',
      dontAskAgain: 'Nu întreba din nou'
    },
    // Dialog
    dialog: {
      confirm: 'OK',
      cancel: 'Anulează',
      close: 'Închide',
      maximize: 'Maximizează',
      restore: 'Restaurează'
    },
    // Sertar
    drawer: {
      close: 'Închide',
      confirm: 'OK',
      cancel: 'Anulează'
    },
    // Meniu dropdown
    dropdown: {
      loading: 'Se încarcă...'
    },
    // Imagine
    image: {
      error: 'EROARE',
      loading: 'Se încarcă...',
      preview: 'Previzualizare',
      zoomIn: 'Mărește',
      zoomOut: 'Micșorează',
      rotateLeft: 'Rotește la stânga',
      rotateRight: 'Rotește la dreapta',
      originalSize: 'Dimensiune originală',
      fullscreen: 'Ecran complet'
    },
    // Vizualizator imagini
    imageviewer: {
      close: 'Închide',
      prev: 'Precedent',
      next: 'Următor',
      zoomIn: 'Mărește',
      zoomOut: 'Micșorează',
      rotateLeft: 'Rotește la stânga',
      rotateRight: 'Rotește la dreapta',
      reset: 'Resetează',
      fullscreen: 'Ecran complet',
      exitFullscreen: 'Ieșire ecran complet'
    },
    // Derulare infinită
    infinitescroll: {
      loading: 'Se încarcă...',
      finished: 'Nu mai sunt date',
      error: 'Eroare la încărcare, faceți clic pentru a reîncerca',
      retry: 'Faceți clic pentru a reîncerca'
    },
    // Mesaj
    message: {
      close: 'Închide'
    },
    // Notificare
    notification: {
      close: 'Închide'
    },
    // Încărcare
    loading: {
      text: 'Se încarcă...'
    },
    // Spinner
    spin: {
      text: 'Se încarcă...'
    },
    // Evaluare
    rate: {
      texts: ['Foarte rău', 'Dezamăgit', 'OK', 'Mulțumit', 'Surprins']
    },
    // Alertă
    alert: {
      close: 'Închide'
    },
    // Etichetă
    tag: {
      close: 'Închide'
    },
    // File
    tabs: {
      close: 'Închide',
      add: 'Adaugă',
      more: 'Mai mult'
    },
    // Pași
    steps: {
      finish: 'Terminat',
      process: 'În curs',
      wait: 'Așteptare',
      error: 'Eroare'
    },
    // Progres
    progress: {
      success: 'Succes',
      exception: 'Excepție',
      warning: 'Avertisment'
    },
    // Schelet
    skeleton: {
      loading: 'Se încarcă...'
    },
    // Gol
    empty: {
      description: 'Fără date',
      noData: 'Fără date',
      noResult: 'Niciun rezultat',
      networkError: 'Eroare de rețea',
      serverError: 'Eroare de server'
    },
    // Rezultat
    result: {
      success: 'Succes',
      error: 'Eroare',
      warning: 'Avertisment',
      info: 'Informație',
      backHome: 'Înapoi acasă'
    },
    // Cascadă
    waterfall: {
      loading: 'Se încarcă...',
      noMore: 'Nu mai sunt date',
      empty: 'Fără date'
    },
    // Descrieri
    descriptions: {
      colon: ':'
    },
    // Cursor
    slider: {
      tipFormatter: '{value}'
    },
    // Comutator
    switch: {
      on: 'DA',
      off: 'NU'
    },
    // Casetă de bifare
    checkbox: {
      selectAll: 'Selectează tot'
    },
    // Radio
    radio: {},
    // Meniu
    menu: {
      collapse: 'Restrânge meniul',
      expand: 'Extinde meniul'
    },
    // Card
    card: {
      collapse: 'Restrânge',
      expand: 'Extinde'
    },
    // Restrângere
    collapse: {
      expand: 'Extinde',
      collapse: 'Restrânge'
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Insignă
    badge: {},
    // Avatar
    avatar: {
      error: 'Eroare la încărcare'
    },
    // Filigran
    watermark: {},
    // Separator
    divider: {},
    // Carusel
    carousel: {
      prev: 'Precedent',
      next: 'Următor'
    },
    // Text defilant
    marquee: {},
    // Fixare
    affix: {},
    // Ancoră
    anchor: {}
  }
}

export default ro
