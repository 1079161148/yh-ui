"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ro = exports.default = void 0;
const ro = exports.ro = {
  name: "ro",
  yh: {
    // Comun
    common: {
      yes: "Da",
      no: "Nu",
      confirm: "Confirm\u0103",
      cancel: "Anuleaz\u0103",
      loading: "Se \xEEncarc\u0103",
      close: "\xCEnchide",
      clear: "\u0218terge",
      reset: "Reseteaz\u0103",
      save: "Salveaz\u0103",
      delete: "\u0218terge",
      edit: "Editeaz\u0103",
      add: "Adaug\u0103",
      search: "Caut\u0103",
      refresh: "Re\xEEmprosp\u0103teaz\u0103",
      expand: "Extinde",
      collapse: "Restr\xE2nge",
      more: "Mai mult",
      noData: "F\u0103r\u0103 date",
      noMatch: "Nicio potrivire",
      selectAll: "Selecteaz\u0103 tot",
      unselectAll: "Deselecteaz\u0103 tot"
    },
    // Selector de culori
    colorpicker: {
      confirm: "OK",
      clear: "\u0218terge",
      eyeDropper: "Pipet\u0103",
      suggestionDark: "Textul alb este mai bun",
      suggestionLight: "Textul negru este mai bun",
      recentColors: "Culori recente",
      presetColors: "Culori prestabilite"
    },
    // Selector de dată
    datepicker: {
      now: "Acum",
      today: "Ast\u0103zi",
      cancel: "Anuleaz\u0103",
      clear: "\u0218terge",
      confirm: "OK",
      selectDate: "Selecta\u021Bi data",
      selectTime: "Selecta\u021Bi ora",
      startDate: "Data de \xEEnceput",
      startTime: "Ora de \xEEnceput",
      endDate: "Data de sf\xE2r\u0219it",
      endTime: "Ora de sf\xE2r\u0219it",
      year: "",
      month: "",
      day: "",
      week: "S\u0103pt\u0103m\xE2n\u0103",
      monthBeforeYear: true,
      prevYear: "Anul precedent",
      nextYear: "Anul urm\u0103tor",
      prevMonth: "Luna precedent\u0103",
      nextMonth: "Luna urm\u0103toare",
      weeks: {
        sun: "Du",
        mon: "Lu",
        tue: "Ma",
        wed: "Mi",
        thu: "Jo",
        fri: "Vi",
        sat: "S\xE2"
      },
      months: {
        jan: "Ian",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "Mai",
        jun: "Iun",
        jul: "Iul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      },
      quarters: {
        q1: "T1",
        q2: "T2",
        q3: "T3",
        q4: "T4"
      }
    },
    // Selector de oră
    timepicker: {
      confirm: "OK",
      cancel: "Anuleaz\u0103",
      now: "Acum",
      placeholder: "Selecta\u021Bi ora",
      startPlaceholder: "Ora de \xEEnceput",
      endPlaceholder: "Ora de sf\xE2r\u0219it",
      selectTime: "Selecta\u021Bi ora"
    },
    // Selectare oră
    timeselect: {
      placeholder: "Selecta\u021Bi ora"
    },
    // Arbore
    tree: {
      emptyText: "F\u0103r\u0103 date",
      loading: "Se \xEEncarc\u0103...",
      checkAll: "Selecteaz\u0103 tot",
      uncheckAll: "Deselecteaz\u0103 tot",
      expandAll: "Extinde tot",
      collapseAll: "Restr\xE2nge tot"
    },
    // Selector arbore
    treeselect: {
      placeholder: "Selecta\u021Bi",
      emptyText: "F\u0103r\u0103 date",
      loading: "Se \xEEncarc\u0103...",
      noMatch: "Nicio potrivire"
    },
    // Calendar
    calendar: {
      prevMonth: "Luna precedent\u0103",
      nextMonth: "Luna urm\u0103toare",
      prevYear: "Anul precedent",
      nextYear: "Anul urm\u0103tor",
      today: "Ast\u0103zi",
      week: "S\u0103pt\u0103m\xE2n\u0103",
      holiday: "S\u0103rb\u0103toare",
      workday: "Lucru",
      monthHeaderFormat: "MMMM YYYY",
      weeks: {
        sun: "Du",
        mon: "Lu",
        tue: "Ma",
        wed: "Mi",
        thu: "Jo",
        fri: "Vi",
        sat: "S\xE2"
      }
    },
    // Autocompletare
    autocomplete: {
      loading: "Se \xEEncarc\u0103...",
      placeholder: "V\u0103 rug\u0103m s\u0103 introduce\u021Bi",
      noData: "F\u0103r\u0103 date",
      noMatch: "Nicio potrivire"
    },
    // Numărătoare inversă
    countdown: {
      days: "zile",
      hours: "ore",
      minutes: "minute",
      seconds: "secunde",
      milliseconds: "milisecunde",
      finished: "Terminat"
    },
    // Cascadă
    cascader: {
      noMatch: "Nicio potrivire",
      placeholder: "Selecta\u021Bi",
      loading: "Se \xEEncarc\u0103...",
      noData: "F\u0103r\u0103 date"
    },
    // Transfer
    transfer: {
      noMatch: "Nicio potrivire",
      noData: "F\u0103r\u0103 date",
      titles: ["Lista 1", "Lista 2"],
      filterPlaceholder: "Introduce\u021Bi cuv\xE2ntul cheie",
      noCheckedFormat: "{total} elemente",
      hasCheckedFormat: "{checked}/{total} selectate",
      searchPlaceholder: "Introduce\u021Bi cuv\xE2ntul cheie"
    },
    // Tabel
    table: {
      emptyText: "F\u0103r\u0103 date",
      confirmFilter: "Confirm\u0103",
      resetFilter: "Reseteaz\u0103",
      clearFilter: "Tot",
      sumText: "Sum\u0103",
      loading: "Se \xEEncarc\u0103...",
      index: "Index",
      print: "Tip\u0103re\u0219te",
      cancel: "Anuleaz\u0103",
      preview: "Previzualizare tip\u0103rire",
      printTime: "Ora tip\u0103ririi",
      total: "Total {total} elemente",
      page: "Pagina {page}",
      yes: "Da",
      no: "Nu",
      // Bara de instrumente
      toolbar: {
        refresh: "Re\xEEmprosp\u0103teaz\u0103",
        density: "Densitate",
        densityDefault: "Implicit",
        densityLarge: "Mare",
        densitySmall: "Mic",
        columnSetting: "Set\u0103ri coloane",
        fullscreen: "Ecran complet",
        exitFullscreen: "Ie\u0219ire ecran complet",
        export: "Export\u0103",
        import: "Import\u0103",
        search: "Caut\u0103",
        searchPlaceholder: "Introduce\u021Bi cuvintele cheie pentru c\u0103utare"
      },
      // Filtru
      filter: {
        selectAll: "Selecteaz\u0103 tot",
        selectInvert: "Inverseaz\u0103 selec\u021Bia",
        empty: "Gol",
        notEmpty: "Nu este gol",
        contains: "Con\u021Bine",
        notContains: "Nu con\u021Bine",
        equals: "Egal cu",
        notEquals: "Nu este egal cu",
        startsWith: "\xCEncepe cu",
        endsWith: "Se termin\u0103 cu",
        greaterThan: "Mai mare dec\xE2t",
        lessThan: "Mai mic dec\xE2t",
        between: "\xCEntre"
      },
      // Sortare
      sort: {
        asc: "Cresc\u0103tor",
        desc: "Descresc\u0103tor",
        clear: "\u0218terge sortarea"
      },
      // Exportare
      export: {
        title: "Exportare date",
        filename: "Nume fi\u0219ier",
        type: "Tip fi\u0219ier",
        scope: "Domeniu export",
        scopeAll: "Toate datele",
        scopeSelected: "Date selectate",
        scopeCurrentPage: "Pagina curent\u0103",
        includeHeader: "Include antetul",
        exporting: "Se export\u0103...",
        success: "Export reu\u0219it",
        error: "Eroare la export"
      },
      // Importare
      import: {
        title: "Importare date",
        selectFile: "Selecta\u021Bi fi\u0219ierul",
        dragTip: "Face\u021Bi clic sau trage\u021Bi fi\u0219ierul aici pentru \xEEnc\u0103rcare",
        importing: "Se import\u0103...",
        success: "Import reu\u0219it",
        error: "Eroare la import",
        preview: "Previzualizare date",
        confirm: "Confirm\u0103 importul"
      },
      // Tipărire
      printConfig: {
        title: "Set\u0103ri tip\u0103rire",
        pageTitle: "Titlul paginii",
        pageHeader: "Antet",
        pageFooter: "Subsol",
        printAll: "Tip\u0103re\u0219te tot",
        printSelected: "Tip\u0103re\u0219te selec\u021Bia",
        printCurrentPage: "Tip\u0103re\u0219te pagina curent\u0103",
        landscape: "Peisaj",
        portrait: "Portret",
        printing: "Se tip\u0103re\u0219te..."
      },
      // Setări coloane
      columnSetting: {
        title: "Set\u0103ri coloane",
        showAll: "Afi\u0219eaz\u0103 tot",
        hideAll: "Ascunde tot",
        reset: "Reseteaz\u0103",
        fixedLeft: "Fixeaz\u0103 la st\xE2nga",
        fixedRight: "Fixeaz\u0103 la dreapta",
        unfixed: "Anuleaz\u0103 fixarea"
      },
      // Meniu contextual
      contextMenu: {
        copy: "Copiaz\u0103",
        copyRow: "Copiaz\u0103 r\xE2ndul",
        copyCell: "Copiaz\u0103 celula",
        paste: "Lipe\u0219te",
        insertRowAbove: "Insereaz\u0103 r\xE2nd deasupra",
        insertRowBelow: "Insereaz\u0103 r\xE2nd dedesubt",
        deleteRow: "\u0218terge r\xE2ndul",
        deleteSelectedRows: "\u0218terge r\xE2ndurile selectate",
        exportSelected: "Export\u0103 selec\u021Bia"
      },
      // Selecție
      selection: {
        selectAll: "Selecteaz\u0103 tot",
        selectInvert: "Inverseaz\u0103 selec\u021Bia",
        selectNone: "\u0218terge selec\u021Bia",
        selected: "{count} elemente selectate"
      },
      // Extindere
      expand: {
        expandAll: "Extinde tot",
        collapseAll: "Restr\xE2nge tot"
      },
      // Arbore
      tree: {
        expandAll: "Extinde tot",
        collapseAll: "Restr\xE2nge tot",
        expandLevel: "Extinde p\xE2n\u0103 la nivelul {level}"
      },
      // Tragere
      drag: {
        dragTip: "Trage\u021Bi pentru a reordona",
        dropTip: "Elibera\u021Bi pentru a plasa"
      }
    },
    // Casetă de mesaj
    messagebox: {
      title: "Mesaj",
      confirm: "OK",
      cancel: "Anuleaz\u0103",
      close: "\xCEnchide",
      error: "Intrare invalid\u0103",
      alert: "Alert\u0103",
      prompt: "Sugestie",
      inputPlaceholder: "V\u0103 rug\u0103m s\u0103 introduce\u021Bi"
    },
    // Încărcare
    upload: {
      deleteTip: "ap\u0103sa\u021Bi delete pentru a \u0219terge",
      delete: "\u0218terge",
      preview: "Previzualizare",
      continue: "Continu\u0103",
      upload: "Face\u021Bi clic pentru a \xEEnc\u0103rca",
      tip: "Face\u021Bi clic sau trage\u021Bi fi\u0219ierul \xEEn aceast\u0103 zon\u0103 pentru <em>\xEEnc\u0103rcare</em>",
      dragTip: "Trage\u021Bi fi\u0219ierul aici sau face\u021Bi clic pentru a \xEEnc\u0103rca",
      uploading: "Se \xEEncarc\u0103...",
      success: "\xCEnc\u0103rcare reu\u0219it\u0103",
      error: "Eroare la \xEEnc\u0103rcare",
      retry: "Re\xEEncearc\u0103",
      cancel: "Anuleaz\u0103 \xEEnc\u0103rcarea",
      fileTypeError: "Tipul de fi\u0219ier nu este acceptat",
      fileSizeError: "Dimensiunea fi\u0219ierului dep\u0103\u0219e\u0219te limita",
      fileCountError: "Num\u0103rul de fi\u0219iere dep\u0103\u0219e\u0219te limita"
    },
    // Formular
    form: {
      validationFailed: "Validare e\u0219uat\u0103",
      required: "Obligatoriu",
      pleaseInput: "V\u0103 rug\u0103m s\u0103 introduce\u021Bi",
      pleaseSelect: "V\u0103 rug\u0103m s\u0103 selecta\u021Bi"
    },
    // Buton
    button: {
      loading: "Se \xEEncarc\u0103..."
    },
    // Intrare
    input: {
      placeholder: "V\u0103 rug\u0103m s\u0103 introduce\u021Bi",
      clear: "\u0218terge",
      showPassword: "Afi\u0219eaz\u0103 parola",
      hidePassword: "Ascunde parola",
      copy: "Copiaz\u0103",
      copied: "Copiat"
    },
    // Număr
    inputnumber: {
      placeholder: "V\u0103 rug\u0103m s\u0103 introduce\u021Bi un num\u0103r",
      increase: "Cre\u0219te",
      decrease: "Scade"
    },
    // Etichetă de intrare
    inputtag: {
      placeholder: "V\u0103 rug\u0103m s\u0103 introduce\u021Bi",
      add: "Adaug\u0103",
      remove: "Elimin\u0103"
    },
    // Breadcrumb
    breadcrumb: {
      label: "Breadcrumb",
      more: "Mai mult"
    },
    // Înapoi sus
    backtop: {
      text: "\xCEnapoi sus"
    },
    // Selectare
    select: {
      placeholder: "V\u0103 rug\u0103m s\u0103 selecta\u021Bi",
      noData: "F\u0103r\u0103 date",
      loading: "Se \xEEncarc\u0103...",
      noMatch: "Nicio potrivire",
      selectAll: "Selecteaz\u0103 tot",
      clearAll: "\u0218terge tot"
    },
    // Paginare
    pagination: {
      goto: "Mergi la",
      page: "",
      total: "Total {total}",
      pageSize: "/pagin\u0103",
      prev: "Precedent",
      next: "Urm\u0103tor",
      first: "Prima",
      last: "Ultima",
      pageClassifier: ""
    },
    // Confirmare popup
    popconfirm: {
      confirm: "OK",
      cancel: "Anuleaz\u0103",
      dontAskAgain: "Nu \xEEntreba din nou"
    },
    // Dialog
    dialog: {
      confirm: "OK",
      cancel: "Anuleaz\u0103",
      close: "\xCEnchide",
      maximize: "Maximizeaz\u0103",
      restore: "Restaureaz\u0103"
    },
    // Sertar
    drawer: {
      close: "\xCEnchide",
      confirm: "OK",
      cancel: "Anuleaz\u0103"
    },
    // Meniu dropdown
    dropdown: {
      loading: "Se \xEEncarc\u0103..."
    },
    // Imagine
    image: {
      error: "EROARE",
      loading: "Se \xEEncarc\u0103...",
      preview: "Previzualizare",
      zoomIn: "M\u0103re\u0219te",
      zoomOut: "Mic\u0219oreaz\u0103",
      rotateLeft: "Rote\u0219te la st\xE2nga",
      rotateRight: "Rote\u0219te la dreapta",
      originalSize: "Dimensiune original\u0103",
      fullscreen: "Ecran complet"
    },
    // Vizualizator imagini
    imageviewer: {
      close: "\xCEnchide",
      prev: "Precedent",
      next: "Urm\u0103tor",
      zoomIn: "M\u0103re\u0219te",
      zoomOut: "Mic\u0219oreaz\u0103",
      rotateLeft: "Rote\u0219te la st\xE2nga",
      rotateRight: "Rote\u0219te la dreapta",
      reset: "Reseteaz\u0103",
      fullscreen: "Ecran complet",
      exitFullscreen: "Ie\u0219ire ecran complet"
    },
    // Derulare infinită
    infinitescroll: {
      loading: "Se \xEEncarc\u0103...",
      finished: "Nu mai sunt date",
      error: "Eroare la \xEEnc\u0103rcare, face\u021Bi clic pentru a re\xEEncerca",
      retry: "Face\u021Bi clic pentru a re\xEEncerca"
    },
    // Mesaj
    message: {
      close: "\xCEnchide"
    },
    // Notificare
    notification: {
      close: "\xCEnchide"
    },
    // Încărcare
    loading: {
      text: "Se \xEEncarc\u0103..."
    },
    // Spinner
    spin: {
      text: "Se \xEEncarc\u0103..."
    },
    // Evaluare
    rate: {
      texts: ["Foarte r\u0103u", "Dezam\u0103git", "OK", "Mul\u021Bumit", "Surprins"]
    },
    // Alertă
    alert: {
      close: "\xCEnchide"
    },
    // Etichetă
    tag: {
      close: "\xCEnchide"
    },
    // File
    tabs: {
      close: "\xCEnchide",
      add: "Adaug\u0103",
      more: "Mai mult"
    },
    // Pași
    steps: {
      finish: "Terminat",
      process: "\xCEn curs",
      wait: "A\u0219teptare",
      error: "Eroare"
    },
    // Progres
    progress: {
      success: "Succes",
      exception: "Excep\u021Bie",
      warning: "Avertisment"
    },
    // Schelet
    skeleton: {
      loading: "Se \xEEncarc\u0103..."
    },
    // Gol
    empty: {
      description: "F\u0103r\u0103 date",
      noData: "F\u0103r\u0103 date",
      noResult: "Niciun rezultat",
      networkError: "Eroare de re\u021Bea",
      serverError: "Eroare de server"
    },
    // Rezultat
    result: {
      success: "Succes",
      error: "Eroare",
      warning: "Avertisment",
      info: "Informa\u021Bie",
      backHome: "\xCEnapoi acas\u0103"
    },
    // Cascadă
    waterfall: {
      loading: "Se \xEEncarc\u0103...",
      noMore: "Nu mai sunt date",
      empty: "F\u0103r\u0103 date"
    },
    // Descrieri
    descriptions: {
      colon: ":"
    },
    // Cursor
    slider: {
      tipFormatter: "{value}"
    },
    // Comutator
    switch: {
      on: "DA",
      off: "NU"
    },
    // Casetă de bifare
    checkbox: {
      selectAll: "Selecteaz\u0103 tot"
    },
    // Radio
    radio: {},
    // Meniu
    menu: {
      collapse: "Restr\xE2nge meniul",
      expand: "Extinde meniul"
    },
    // Card
    card: {
      collapse: "Restr\xE2nge",
      expand: "Extinde"
    },
    // Restrângere
    collapse: {
      expand: "Extinde",
      collapse: "Restr\xE2nge"
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Insignă
    badge: {},
    // Avatar
    avatar: {
      error: "Eroare la \xEEnc\u0103rcare"
    },
    // Filigran
    watermark: {},
    // Separator
    divider: {},
    // Carusel
    carousel: {
      prev: "Precedent",
      next: "Urm\u0103tor"
    },
    // Text defilant
    marquee: {},
    // Fixare
    affix: {},
    // Ancoră
    anchor: {},
    // Mention
    mention: {
      placeholder: "V\u0103 rug\u0103m s\u0103 introduce\u021Bi",
      loading: "Se \xEEncarc\u0103...",
      noData: "Nu exist\u0103 date"
    },
    // AI Components
    ai: {
      bubble: {
        citations: "Cit\u0103ri"
      },
      mention: {
        placeholder: "@ Men\u021Bioneaz\u0103 Agent, Document sau Tabel...",
        agent: "Agent",
        document: "Document",
        table: "Tabel",
        knowledge: "Cuno\u0219tin\u021Be"
      },
      codeBlock: {
        copyCode: "Copiaz\u0103 codul",
        copied: "Copiat!",
        run: "Ruleaz\u0103 codul",
        edit: "Editeaz\u0103",
        save: "Salveaz\u0103",
        cancel: "Anuleaz\u0103"
      },
      codeRunner: {
        run: "Ruleaz\u0103",
        stop: "Opre\u0219te",
        clear: "\u0218terge",
        reset: "Reseteaz\u0103",
        placeholder: "Face\u021Bi clic pe Ruleaz\u0103 pentru a executa codul..."
      },
      sender: {
        placeholder: "Trimite un mesaj...",
        dragTip: "Elibera\u021Bi pentru a \xEEnc\u0103rca fi\u0219iere"
      },
      thoughtChain: {
        thoughtProcess: "Proces de G\xE2ndire",
        thinking: "Se g\xE2nde\u0219te...",
        defaultTitle: "Pas Nou",
        addNode: "Adaug\u0103 Pas"
      },
      thinking: {
        start: "\xCEncepe s\u0103 te g\xE2nde\u0219ti",
        thinking: "Se g\xE2nde\u0219te...",
        complete: "G\xE2ndire complet\u0103",
        error: "Eroare de g\xE2ndire"
      },
      welcome: {
        title: "Bun\u0103, sunt YH AI",
        description: "V\u0103 pot ajuta cu programarea, traducerea documentelor sau scrierea creativ\u0103. Ce pot face pentru dumneavoastr\u0103 ast\u0103zi?"
      },
      action: {
        copy: "Copiaz\u0103",
        regenerate: "Regenereaz\u0103",
        share: "Distribuie",
        like: "Apreciaz\u0103",
        dislike: "Nu apreciaz\u0103",
        edit: "Editeaz\u0103",
        delete: "\u0218terge"
      },
      artifacts: {
        preview: "Previzualizare",
        inline: "Inline",
        code: "Surs\u0103",
        versions: "Versiuni",
        rendering: "Se red\u0103 componenta...",
        renderingChart: "Se red\u0103 graficul...",
        renderingCanvas: "Se preg\u0103te\u0219te p\xE2nza..."
      },
      voice: {
        trigger: "Face\u021Bi clic pentru a vorbi",
        listening: "Ascult\u0103..."
      },
      agent: {
        uses: "folose\u0219te",
        use: "Folose\u0219te Acum",
        favorite: "Preferat",
        unfavorite: "Elimin\u0103 din Preferate",
        share: "Distribuie",
        online: "Online",
        offline: "Offline",
        busy: "Ocupat",
        verified: "Verificat",
        rating: "Evaluare",
        reviews: "recenzii",
        responseTime: "Timp Mediu de R\u0103spuns",
        ms: "ms"
      },
      sources: {
        references: "Referin\u021Be",
        referencedSources: "Surse Referen\u021Biate",
        relevant: "Relevan\u021B\u0103",
        viewOriginal: "Vezi Originalul",
        showAll: "Arat\u0103 Tot",
        more: "mai multe surse",
        drawerTitle: "Referin\u021Be",
        expandMore: "Arat\u0103 Mai Mult",
        collapseMore: "Restr\xE2nge",
        noSources: "F\u0103r\u0103 surse",
        today: "Ast\u0103zi",
        last7Days: "Ultimele 7 Zile",
        last30Days: "Ultimele 30 Zile",
        earlier: "Mai Devreme",
        pinned: "Fixat"
      },
      conversations: {
        today: "Ast\u0103zi",
        last7Days: "Ultimele 7 Zile",
        last30Days: "Ultimele 30 Zile",
        earlier: "Mai Devreme",
        pinned: "Fixat",
        pin: "Fixeaz\u0103",
        unpin: "Elibereaz\u0103",
        newConversation: "Conversa\u021Bie Nou\u0103",
        rename: "Redenume\u0219te",
        delete: "\u0218terge",
        deleteConfirm: "Confirma\u021Bi \u0219tergerea acestei conversa\u021Bii?"
      }
    }
  }
};
module.exports = ro;