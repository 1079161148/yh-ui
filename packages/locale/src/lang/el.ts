import type { Language } from '../index'

export const el: Language = {
  name: 'el',
  yh: {
    // Κοινά
    common: {
      yes: 'Ναι',
      no: 'Όχι',
      confirm: 'Επιβεβαίωση',
      cancel: 'Ακύρωση',
      loading: 'Φόρτωση',
      close: 'Κλείσιμο',
      clear: 'Καθαρισμός',
      reset: 'Επαναφορά',
      save: 'Αποθήκευση',
      delete: 'Διαγραφή',
      edit: 'Επεξεργασία',
      add: 'Προσθήκη',
      search: 'Αναζήτηση',
      refresh: 'Ανανέωση',
      expand: 'Ανάπτυξη',
      collapse: 'Σύμπτυξη',
      more: 'Περισσότερα',
      noData: 'Δεν υπάρχουν δεδομένα',
      noMatch: 'Δεν βρέθηκαν αποτελέσματα',
      selectAll: 'Επιλογή όλων',
      unselectAll: 'Αποεπιλογή όλων'
    },
    // Επιλογέας χρώματος
    colorpicker: {
      confirm: 'Εντάξει',
      clear: 'Καθαρισμός',
      eyeDropper: 'Σταγονόμετρο',
      suggestionDark: 'Λευκό κείμενο είναι καλύτερο',
      suggestionLight: 'Μαύρο κείμενο είναι καλύτερο',
      recentColors: 'Πρόσφατα χρώματα',
      presetColors: 'Προκαθορισμένα χρώματα'
    },
    // Επιλογέας ημερομηνίας
    datepicker: {
      now: 'Τώρα',
      today: 'Σήμερα',
      cancel: 'Ακύρωση',
      clear: 'Καθαρισμός',
      confirm: 'Εντάξει',
      selectDate: 'Επιλέξτε ημερομηνία',
      selectTime: 'Επιλέξτε ώρα',
      startDate: 'Ημερομηνία έναρξης',
      startTime: 'Ώρα έναρξης',
      endDate: 'Ημερομηνία λήξης',
      endTime: 'Ώρα λήξης',
      year: '',
      month: '',
      day: '',
      week: 'Εβδομάδα',
      monthBeforeYear: true,
      prevYear: 'Προηγούμενο έτος',
      nextYear: 'Επόμενο έτος',
      prevMonth: 'Προηγούμενος μήνας',
      nextMonth: 'Επόμενος μήνας',
      weeks: {
        sun: 'Κυρ',
        mon: 'Δευ',
        tue: 'Τρι',
        wed: 'Τετ',
        thu: 'Πεμ',
        fri: 'Παρ',
        sat: 'Σαβ'
      },
      months: {
        jan: 'Ιαν',
        feb: 'Φεβ',
        mar: 'Μαρ',
        apr: 'Απρ',
        may: 'Μαϊ',
        jun: 'Ιουν',
        jul: 'Ιουλ',
        aug: 'Αυγ',
        sep: 'Σεπ',
        oct: 'Οκτ',
        nov: 'Νοε',
        dec: 'Δεκ'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Επιλογέας ώρας
    timepicker: {
      confirm: 'Εντάξει',
      cancel: 'Ακύρωση',
      now: 'Τώρα',
      placeholder: 'Επιλέξτε ώρα',
      startPlaceholder: 'Ώρα έναρξης',
      endPlaceholder: 'Ώρα λήξης',
      selectTime: 'Επιλέξτε ώρα'
    },
    // Επιλογή ώρας
    timeselect: {
      placeholder: 'Επιλέξτε ώρα'
    },
    // Δέντρο
    tree: {
      emptyText: 'Δεν υπάρχουν δεδομένα',
      loading: 'Φόρτωση...',
      checkAll: 'Επιλογή όλων',
      uncheckAll: 'Αποεπιλογή όλων',
      expandAll: 'Ανάπτυξη όλων',
      collapseAll: 'Σύμπτυξη όλων'
    },
    // Επιλογέας δέντρου
    treeselect: {
      placeholder: 'Επιλέξτε',
      emptyText: 'Δεν υπάρχουν δεδομένα',
      loading: 'Φόρτωση...',
      noMatch: 'Δεν βρέθηκαν αποτελέσματα'
    },
    // Ημερολόγιο
    calendar: {
      prevMonth: 'Προηγούμενος μήνας',
      nextMonth: 'Επόμενος μήνας',
      prevYear: 'Προηγούμενο έτος',
      nextYear: 'Επόμενο έτος',
      today: 'Σήμερα',
      week: 'Εβδομάδα',
      holiday: 'Αργία',
      workday: 'Εργασία',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Κυρ',
        mon: 'Δευ',
        tue: 'Τρι',
        wed: 'Τετ',
        thu: 'Πεμ',
        fri: 'Παρ',
        sat: 'Σαβ'
      }
    },
    // Αυτόματη συμπλήρωση
    autocomplete: {
      loading: 'Φόρτωση...',
      placeholder: 'Παρακαλώ εισάγετε',
      noData: 'Δεν υπάρχουν δεδομένα',
      noMatch: 'Δεν βρέθηκαν αποτελέσματα'
    },
    // Αντίστροφη μέτρηση
    countdown: {
      days: 'ημέρες',
      hours: 'ώρες',
      minutes: 'λεπτά',
      seconds: 'δευτερόλεπτα',
      milliseconds: 'χιλιοστά του δευτερολέπτου',
      finished: 'Ολοκληρώθηκε'
    },
    // Κασκαντέρ
    cascader: {
      noMatch: 'Δεν βρέθηκαν αποτελέσματα',
      placeholder: 'Επιλέξτε',
      loading: 'Φόρτωση...',
      noData: 'Δεν υπάρχουν δεδομένα'
    },
    // Μεταφορά
    transfer: {
      noMatch: 'Δεν βρέθηκαν αποτελέσματα',
      noData: 'Δεν υπάρχουν δεδομένα',
      titles: ['Λίστα 1', 'Λίστα 2'],
      filterPlaceholder: 'Εισάγετε λέξη-κλειδί',
      noCheckedFormat: '{total} στοιχεία',
      hasCheckedFormat: '{checked}/{total} επιλεγμένα',
      searchPlaceholder: 'Εισάγετε λέξη-κλειδί'
    },
    // Πίνακας
    table: {
      emptyText: 'Δεν υπάρχουν δεδομένα',
      confirmFilter: 'Επιβεβαίωση',
      resetFilter: 'Επαναφορά',
      clearFilter: 'Όλα',
      sumText: 'Άθροισμα',
      loading: 'Φόρτωση...',
      index: 'Ευρετήριο',
      print: 'Εκτύπωση',
      cancel: 'Ακύρωση',
      preview: 'Προεπισκόπηση εκτύπωσης',
      printTime: 'Ώρα εκτύπωσης',
      total: 'Σύνολο {total} στοιχείων',
      page: 'Σελίδα {page}',
      yes: 'Ναι',
      no: 'Όχι',
      // Γραμμή εργαλείων
      toolbar: {
        refresh: 'Ανανέωση',
        density: 'Πυκνότητα',
        densityDefault: 'Προεπιλογή',
        densityLarge: 'Μεγάλη',
        densitySmall: 'Μικρή',
        columnSetting: 'Ρυθμίσεις στήλης',
        fullscreen: 'Πλήρης οθόνη',
        exitFullscreen: 'Έξοδος από πλήρη οθόνη',
        export: 'Εξαγωγή',
        import: 'Εισαγωγή',
        search: 'Αναζήτηση',
        searchPlaceholder: 'Εισάγετε λέξεις-κλειδιά για αναζήτηση'
      },
      // Φίλτρο
      filter: {
        selectAll: 'Επιλογή όλων',
        selectInvert: 'Αντιστροφή επιλογής',
        empty: 'Είναι άδειο',
        notEmpty: 'Δεν είναι άδειο',
        contains: 'Περιέχει',
        notContains: 'Δεν περιέχει',
        equals: 'Ισούται',
        notEquals: 'Δεν ισούται',
        startsWith: 'Ξεκινάει με',
        endsWith: 'Τελειώνει με',
        greaterThan: 'Μεγαλύτερο από',
        lessThan: 'Μικρότερο από',
        between: 'Μεταξύ'
      },
      // Ταξινόμηση
      sort: {
        asc: 'Αύξουσα',
        desc: 'Φθίνουσα',
        clear: 'Καθαρισμός ταξινόμησης'
      },
      // Εξαγωγή
      export: {
        title: 'Εξαγωγή δεδομένων',
        filename: 'Όνομα αρχείου',
        type: 'Τύπος αρχείου',
        scope: 'Εύρος εξαγωγής',
        scopeAll: 'Όλα τα δεδομένα',
        scopeSelected: 'Επιλεγμένα δεδομένα',
        scopeCurrentPage: 'Τρέχουσα σελίδα',
        includeHeader: 'Συμπερίληψη κεφαλίδας',
        exporting: 'Εξαγωγή...',
        success: 'Εξαγωγή επιτυχής',
        error: 'Αποτυχία εξαγωγής'
      },
      // Εισαγωγή
      import: {
        title: 'Εισαγωγή δεδομένων',
        selectFile: 'Επιλέξτε αρχείο',
        dragTip: 'Κάντε κλικ ή σύρετε αρχείο εδώ για μεταφόρτωση',
        importing: 'Εισαγωγή...',
        success: 'Εισαγωγή επιτυχής',
        error: 'Αποτυχία εισαγωγής',
        preview: 'Προεπισκόπηση δεδομένων',
        confirm: 'Επιβεβαίωση εισαγωγής'
      },
      // Εκτύπωση
      printConfig: {
        title: 'Ρυθμίσεις εκτύπωσης',
        pageTitle: 'Τίτλος σελίδας',
        pageHeader: 'Κεφαλίδα',
        pageFooter: 'Υποσέλιδο',
        printAll: 'Εκτύπωση όλων',
        printSelected: 'Εκτύπωση επιλεγμένων',
        printCurrentPage: 'Εκτύπωση τρέχουσας σελίδας',
        landscape: 'Οριζόντια',
        portrait: 'Κατακόρυφη',
        printing: 'Εκτύπωση...'
      },
      // Ρυθμίσεις στήλης
      columnSetting: {
        title: 'Ρυθμίσεις στήλης',
        showAll: 'Εμφάνιση όλων',
        hideAll: 'Απόκρυψη όλων',
        reset: 'Επαναφορά',
        fixedLeft: 'Στερέωση αριστερά',
        fixedRight: 'Στερέωση δεξιά',
        unfixed: 'Αποδέσμευση'
      },
      // Μενού περιβάλλοντος
      contextMenu: {
        copy: 'Αντιγραφή',
        copyRow: 'Αντιγραφή γραμμής',
        copyCell: 'Αντιγραφή κελιού',
        paste: 'Επικόλληση',
        insertRowAbove: 'Εισαγωγή γραμμής πάνω',
        insertRowBelow: 'Εισαγωγή γραμμής κάτω',
        deleteRow: 'Διαγραφή γραμμής',
        deleteSelectedRows: 'Διαγραφή επιλεγμένων γραμμών',
        exportSelected: 'Εξαγωγή επιλεγμένων'
      },
      // Επιλογή
      selection: {
        selectAll: 'Επιλογή όλων',
        selectInvert: 'Αντιστροφή επιλογής',
        selectNone: 'Καθαρισμός επιλογής',
        selected: '{count} επιλεγμένα στοιχεία'
      },
      // Ανάπτυξη
      expand: {
        expandAll: 'Ανάπτυξη όλων',
        collapseAll: 'Σύμπτυξη όλων'
      },
      // Δέντρο
      tree: {
        expandAll: 'Ανάπτυξη όλων',
        collapseAll: 'Σύμπτυξη όλων',
        expandLevel: 'Ανάπτυξη στο επίπεδο {level}'
      },
      // Σύρσιμο
      drag: {
        dragTip: 'Σύρετε για αναδιάταξη',
        dropTip: 'Αφήστε για τοποθέτηση'
      }
    },
    // Κουτί μηνύματος
    messagebox: {
      title: 'Μήνυμα',
      confirm: 'Εντάξει',
      cancel: 'Ακύρωση',
      close: 'Κλείσιμο',
      error: 'Μη έγκυρη εισαγωγή',
      alert: 'Ειδοποίηση',
      prompt: 'Προτροπή',
      inputPlaceholder: 'Παρακαλώ εισάγετε'
    },
    // Μεταφόρτωση
    upload: {
      deleteTip: 'πατήστε delete για διαγραφή',
      delete: 'Διαγραφή',
      preview: 'Προεπισκόπηση',
      continue: 'Συνέχεια',
      upload: 'Κάντε κλικ για μεταφόρτωση',
      tip: 'Κάντε κλικ ή σύρετε αρχείο σε αυτήν την περιοχή για <em>μεταφόρτωση</em>',
      dragTip: 'Σύρετε αρχείο εδώ ή κάντε κλικ για μεταφόρτωση',
      uploading: 'Μεταφόρτωση...',
      success: 'Μεταφόρτωση επιτυχής',
      error: 'Αποτυχία μεταφόρτωσης',
      retry: 'Επανάληψη',
      cancel: 'Ακύρωση μεταφόρτωσης',
      fileTypeError: 'Ο τύπος αρχείου δεν υποστηρίζεται',
      fileSizeError: 'Το μέγεθος αρχείου υπερβαίνει το όριο',
      fileCountError: 'Ο αριθμός αρχείων υπερβαίνει το όριο'
    },
    // Φόρμα
    form: {
      validationFailed: 'Η επικύρωση απέτυχε',
      required: 'Απαιτείται',
      pleaseInput: 'Παρακαλώ εισάγετε',
      pleaseSelect: 'Παρακαλώ επιλέξτε'
    },
    // Κουμπί
    button: {
      loading: 'Φόρτωση...'
    },
    // Εισαγωγή
    input: {
      placeholder: 'Παρακαλώ εισάγετε',
      clear: 'Καθαρισμός',
      showPassword: 'Εμφάνιση κωδικού',
      hidePassword: 'Απόκρυψη κωδικού',
      copy: 'Αντιγραφή',
      copied: 'Αντιγράφηκε'
    },
    // Εισαγωγή αριθμού
    inputnumber: {
      placeholder: 'Παρακαλώ εισάγετε αριθμό',
      increase: 'Αύξηση',
      decrease: 'Μείωση'
    },
    // Εισαγωγή ετικέτας
    inputtag: {
      placeholder: 'Παρακαλώ εισάγετε',
      add: 'Προσθήκη',
      remove: 'Αφαίρεση'
    },
    // Πλοηγός
    breadcrumb: {
      label: 'Πλοηγός',
      more: 'Περισσότερα'
    },
    // Επιστροφή στην κορυφή
    backtop: {
      text: 'Επιστροφή στην κορυφή'
    },
    // Επιλογή
    select: {
      placeholder: 'Παρακαλώ επιλέξτε',
      noData: 'Δεν υπάρχουν δεδομένα',
      loading: 'Φόρτωση...',
      noMatch: 'Δεν βρέθηκαν αποτελέσματα',
      selectAll: 'Επιλογή όλων',
      clearAll: 'Καθαρισμός όλων'
    },
    // Σελιδοποίηση
    pagination: {
      goto: 'Μετάβαση σε',
      page: '',
      total: 'Σύνολο {total}',
      pageSize: '/σελίδα',
      prev: 'Προηγούμενη',
      next: 'Επόμενη',
      first: 'Πρώτη',
      last: 'Τελευταία',
      pageClassifier: ''
    },
    // Επιβεβαίωση αναδυόμενου
    popconfirm: {
      confirm: 'Εντάξει',
      cancel: 'Ακύρωση',
      dontAskAgain: 'Μην ρωτήσετε ξανά'
    },
    // Διάλογος
    dialog: {
      confirm: 'Εντάξει',
      cancel: 'Ακύρωση',
      close: 'Κλείσιμο',
      maximize: 'Μεγιστοποίηση',
      restore: 'Επαναφορά'
    },
    // Συρτάρι
    drawer: {
      close: 'Κλείσιμο',
      confirm: 'Εντάξει',
      cancel: 'Ακύρωση'
    },
    // Αναπτυσσόμενη λίστα
    dropdown: {
      loading: 'Φόρτωση...'
    },
    // Εικόνα
    image: {
      error: 'ΑΠΟΤΥΧΙΑ',
      loading: 'Φόρτωση...',
      preview: 'Προεπισκόπηση',
      zoomIn: 'Μεγέθυνση',
      zoomOut: 'Σμίκρυνση',
      rotateLeft: 'Περιστροφή αριστερά',
      rotateRight: 'Περιστροφή δεξιά',
      originalSize: 'Αρχικό μέγεθος',
      fullscreen: 'Πλήρης οθόνη'
    },
    // Προβολή εικόνας
    imageviewer: {
      close: 'Κλείσιμο',
      prev: 'Προηγούμενη',
      next: 'Επόμενη',
      zoomIn: 'Μεγέθυνση',
      zoomOut: 'Σμίκρυνση',
      rotateLeft: 'Περιστροφή αριστερά',
      rotateRight: 'Περιστροφή δεξιά',
      reset: 'Επαναφορά',
      fullscreen: 'Πλήρης οθόνη',
      exitFullscreen: 'Έξοδος από πλήρη οθόνη'
    },
    // Άπειρη κύλιση
    infinitescroll: {
      loading: 'Φόρτωση...',
      finished: 'Δεν υπάρχουν άλλα δεδομένα',
      error: 'Αποτυχία φόρτωσης, κάντε κλικ για επανάληψη',
      retry: 'Κάντε κλικ για επανάληψη'
    },
    // Μήνυμα
    message: {
      close: 'Κλείσιμο'
    },
    // Ειδοποίηση
    notification: {
      close: 'Κλείσιμο'
    },
    // Φόρτωση
    loading: {
      text: 'Φόρτωση...'
    },
    // Περιστροφή
    spin: {
      text: 'Φόρτωση...'
    },
    // Αξιολόγηση
    rate: {
      texts: ['Εξαιρετικά κακή', 'Απογοητευμένος', 'Μέτρια', 'Ευχαριστημένος', 'Εκπληκτικός']
    },
    // Ειδοποίηση
    alert: {
      close: 'Κλείσιμο'
    },
    // Ετικέτα
    tag: {
      close: 'Κλείσιμο'
    },
    // Καρτέλες
    tabs: {
      close: 'Κλείσιμο',
      add: 'Προσθήκη',
      more: 'Περισσότερα'
    },
    // Βήματα
    steps: {
      finish: 'Ολοκληρώθηκε',
      process: 'Σε εξέλιξη',
      wait: 'Αναμονή',
      error: 'Σφάλμα'
    },
    // Πρόοδος
    progress: {
      success: 'Επιτυχία',
      exception: 'Εξαίρεση',
      warning: 'Προειδοποίηση'
    },
    // Σκελετός
    skeleton: {
      loading: 'Φόρτωση...'
    },
    // Άδειο
    empty: {
      description: 'Δεν υπάρχουν δεδομένα',
      noData: 'Δεν υπάρχουν δεδομένα',
      noResult: 'Δεν υπάρχουν αποτελέσματα',
      networkError: 'Σφάλμα δικτύου',
      serverError: 'Σφάλμα διακομιστή'
    },
    // Αποτέλεσμα
    result: {
      success: 'Επιτυχία',
      error: 'Σφάλμα',
      warning: 'Προειδοποίηση',
      info: 'Πληροφορία',
      backHome: 'Επιστροφή στην αρχική σελίδα'
    },
    // Καταρράκτης
    waterfall: {
      loading: 'Φόρτωση...',
      noMore: 'Δεν υπάρχουν άλλα δεδομένα',
      empty: 'Δεν υπάρχουν δεδομένα'
    },
    // Περιγραφές
    descriptions: {
      colon: ':'
    },
    // Ολισθητήρας
    slider: {
      tipFormatter: '{value}'
    },
    // Διακόπτης
    switch: {
      on: 'ON',
      off: 'OFF'
    },
    // Κουτί επιλογής
    checkbox: {
      selectAll: 'Επιλογή όλων'
    },
    // Ραδιόφωνο
    radio: {},
    // Μενού
    menu: {
      collapse: 'Σύμπτυξη μενού',
      expand: 'Ανάπτυξη μενού'
    },
    // Κάρτα
    card: {
      collapse: 'Σύμπτυξη',
      expand: 'Ανάπτυξη'
    },
    // Σύμπτυξη
    collapse: {
      expand: 'Ανάπτυξη',
      collapse: 'Σύμπτυξη'
    },
    // Συμβουλή
    tooltip: {},
    // Αναδυόμενο
    popover: {},
    // Σήμα
    badge: {},
    // Αβατάρ
    avatar: {
      error: 'Αποτυχία φόρτωσης'
    },
    // Υδατόσημο
    watermark: {},
    // Διαχωριστικό
    divider: {},
    // Καρούζελ
    carousel: {
      prev: 'Προηγούμενη',
      next: 'Επόμενη'
    },
    // Κινούμενη γραμμή
    marquee: {},
    // Στερέωση
    affix: {},
    // Άγκυρα
    anchor: {}
  }
}

export default el
