import type { Language } from '../index'

export const ca: Language = {
  name: 'ca',
  yh: {
    // Comú
    common: {
      yes: 'Sí',
      no: 'No',
      confirm: 'Confirmar',
      cancel: 'Cancel·lar',
      loading: 'Carregant',
      close: 'Tancar',
      clear: 'Netejar',
      reset: 'Restablir',
      save: 'Desar',
      delete: 'Eliminar',
      edit: 'Editar',
      add: 'Afegir',
      search: 'Cercar',
      refresh: 'Actualitzar',
      expand: 'Expandir',
      collapse: 'Contraure',
      more: 'Més',
      noData: 'Sense dades',
      noMatch: 'Sense coincidències',
      selectAll: 'Seleccionar tot',
      unselectAll: 'Desseleccionar tot'
    },
    // Selector de color
    colorpicker: {
      confirm: 'D\'acord',
      clear: 'Netejar',
      eyeDropper: 'Comptagotes',
      suggestionDark: 'El text blanc és millor',
      suggestionLight: 'El text negre és millor',
      recentColors: 'Colors recents',
      presetColors: 'Colors predefinits'
    },
    // Selector de data
    datepicker: {
      now: 'Ara',
      today: 'Avui',
      cancel: 'Cancel·lar',
      clear: 'Netejar',
      confirm: 'D\'acord',
      selectDate: 'Seleccionar data',
      selectTime: 'Seleccionar hora',
      startDate: 'Data d\'inici',
      startTime: 'Hora d\'inici',
      endDate: 'Data de fi',
      endTime: 'Hora de fi',
      year: '',
      month: '',
      day: '',
      week: 'Setmana',
      monthBeforeYear: true,
      prevYear: 'Any anterior',
      nextYear: 'Any següent',
      prevMonth: 'Mes anterior',
      nextMonth: 'Mes següent',
      weeks: {
        sun: 'Dg',
        mon: 'Dl',
        tue: 'Dt',
        wed: 'Dc',
        thu: 'Dj',
        fri: 'Dv',
        sat: 'Ds'
      },
      months: {
        jan: 'Gen',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Abr',
        may: 'Mai',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Ago',
        sep: 'Set',
        oct: 'Oct',
        nov: 'Nov',
        dec: 'Des'
      },
      quarters: {
        q1: 'T1',
        q2: 'T2',
        q3: 'T3',
        q4: 'T4'
      }
    },
    // Selector d'hora
    timepicker: {
      confirm: 'D\'acord',
      cancel: 'Cancel·lar',
      now: 'Ara',
      placeholder: 'Seleccionar hora',
      startPlaceholder: 'Hora d\'inici',
      endPlaceholder: 'Hora de fi',
      selectTime: 'Seleccionar hora'
    },
    // Selecció d'hora
    timeselect: {
      placeholder: 'Seleccionar hora'
    },
    // Arbre
    tree: {
      emptyText: 'Sense dades',
      loading: 'Carregant...',
      checkAll: 'Seleccionar tot',
      uncheckAll: 'Desseleccionar tot',
      expandAll: 'Expandir tot',
      collapseAll: 'Contraure tot'
    },
    // Selector d'arbre
    treeselect: {
      placeholder: 'Seleccionar',
      emptyText: 'Sense dades',
      loading: 'Carregant...',
      noMatch: 'Sense coincidències'
    },
    // Calendari
    calendar: {
      prevMonth: 'Mes anterior',
      nextMonth: 'Mes següent',
      prevYear: 'Any anterior',
      nextYear: 'Any següent',
      today: 'Avui',
      week: 'Setmana',
      holiday: 'Festiu',
      workday: 'Feina',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Dg',
        mon: 'Dl',
        tue: 'Dt',
        wed: 'Dc',
        thu: 'Dj',
        fri: 'Dv',
        sat: 'Ds'
      }
    },
    // Autocompletat
    autocomplete: {
      loading: 'Carregant...',
      placeholder: 'Si us plau, introduïu',
      noData: 'Sense dades',
      noMatch: 'Sense coincidències'
    },
    // Compte enrere
    countdown: {
      days: 'dies',
      hours: 'hores',
      minutes: 'minuts',
      seconds: 'segons',
      milliseconds: 'mil·lisegons',
      finished: 'Acabat'
    },
    // Cascada
    cascader: {
      noMatch: 'Sense coincidències',
      placeholder: 'Seleccionar',
      loading: 'Carregant...',
      noData: 'Sense dades'
    },
    // Transferència
    transfer: {
      noMatch: 'Sense coincidències',
      noData: 'Sense dades',
      titles: ['Llista 1', 'Llista 2'],
      filterPlaceholder: 'Introduir paraula clau',
      noCheckedFormat: '{total} elements',
      hasCheckedFormat: '{checked}/{total} seleccionats',
      searchPlaceholder: 'Introduir paraula clau'
    },
    // Taula
    table: {
      emptyText: 'Sense dades',
      confirmFilter: 'Confirmar',
      resetFilter: 'Restablir',
      clearFilter: 'Tot',
      sumText: 'Suma',
      loading: 'Carregant...',
      index: 'Índex',
      print: 'Imprimir',
      cancel: 'Cancel·lar',
      preview: 'Vista prèvia d\'impressió',
      printTime: 'Hora d\'impressió',
      total: 'Total {total} elements',
      page: 'Pàgina {page}',
      yes: 'Sí',
      no: 'No',
      // Barra d'eines
      toolbar: {
        refresh: 'Actualitzar',
        density: 'Densitat',
        densityDefault: 'Per defecte',
        densityLarge: 'Gran',
        densitySmall: 'Petit',
        columnSetting: 'Configuració de columnes',
        fullscreen: 'Pantalla completa',
        exitFullscreen: 'Sortir de pantalla completa',
        export: 'Exportar',
        import: 'Importar',
        search: 'Cercar',
        searchPlaceholder: 'Introduir paraules clau per cercar'
      },
      // Filtre
      filter: {
        selectAll: 'Seleccionar tot',
        selectInvert: 'Invertir selecció',
        empty: 'Està buit',
        notEmpty: 'No està buit',
        contains: 'Conté',
        notContains: 'No conté',
        equals: 'Igual',
        notEquals: 'No igual',
        startsWith: 'Comença amb',
        endsWith: 'Acaba amb',
        greaterThan: 'Major que',
        lessThan: 'Menor que',
        between: 'Entre'
      },
      // Ordenació
      sort: {
        asc: 'Ascendent',
        desc: 'Descendent',
        clear: 'Netejar ordenació'
      },
      // Exportació
      export: {
        title: 'Exportar dades',
        filename: 'Nom del fitxer',
        type: 'Tipus de fitxer',
        scope: 'Abast d\'exportació',
        scopeAll: 'Totes les dades',
        scopeSelected: 'Dades seleccionades',
        scopeCurrentPage: 'Pàgina actual',
        includeHeader: 'Incloure capçalera',
        exporting: 'Exportant...',
        success: 'Exportació exitosa',
        error: 'Error en l\'exportació'
      },
      // Importació
      import: {
        title: 'Importar dades',
        selectFile: 'Seleccionar fitxer',
        dragTip: 'Feu clic o arrossegueu el fitxer aquí per pujar-lo',
        importing: 'Important...',
        success: 'Importació exitosa',
        error: 'Error en l\'importació',
        preview: 'Vista prèvia de dades',
        confirm: 'Confirmar importació'
      },
      // Impressió
      printConfig: {
        title: 'Configuració d\'impressió',
        pageTitle: 'Títol de la pàgina',
        pageHeader: 'Capçalera',
        pageFooter: 'Peu de pàgina',
        printAll: 'Imprimir tot',
        printSelected: 'Imprimir seleccionat',
        printCurrentPage: 'Imprimir pàgina actual',
        landscape: 'Horitzontal',
        portrait: 'Vertical',
        printing: 'Imprimint...'
      },
      // Configuració de columnes
      columnSetting: {
        title: 'Configuració de columnes',
        showAll: 'Mostrar tot',
        hideAll: 'Ocultar tot',
        reset: 'Restablir',
        fixedLeft: 'Fixar a l\'esquerra',
        fixedRight: 'Fixar a la dreta',
        unfixed: 'Desfixar'
      },
      // Menú contextual
      contextMenu: {
        copy: 'Copiar',
        copyRow: 'Copiar fila',
        copyCell: 'Copiar cel·la',
        paste: 'Enganxar',
        insertRowAbove: 'Inserir fila a dalt',
        insertRowBelow: 'Inserir fila a baix',
        deleteRow: 'Eliminar fila',
        deleteSelectedRows: 'Eliminar files seleccionades',
        exportSelected: 'Exportar seleccionat'
      },
      // Selecció
      selection: {
        selectAll: 'Seleccionar tot',
        selectInvert: 'Invertir selecció',
        selectNone: 'Netejar selecció',
        selected: '{count} elements seleccionats'
      },
      // Expandir
      expand: {
        expandAll: 'Expandir tot',
        collapseAll: 'Contraure tot'
      },
      // Arbre
      tree: {
        expandAll: 'Expandir tot',
        collapseAll: 'Contraure tot',
        expandLevel: 'Expandir al nivell {level}'
      },
      // Arrossegar
      drag: {
        dragTip: 'Arrossegar per reordenar',
        dropTip: 'Deixar anar per col·locar'
      }
    },
    // Quadre de missatge
    messagebox: {
      title: 'Missatge',
      confirm: 'D\'acord',
      cancel: 'Cancel·lar',
      close: 'Tancar',
      error: 'Entrada no vàlida',
      alert: 'Alerta',
      prompt: 'Sol·licitud',
      inputPlaceholder: 'Si us plau, introduïu'
    },
    // Pujada
    upload: {
      deleteTip: 'premeu delete per eliminar',
      delete: 'Eliminar',
      preview: 'Vista prèvia',
      continue: 'Continuar',
      upload: 'Feu clic per pujar',
      tip: 'Feu clic o arrossegueu el fitxer a aquesta àrea per <em>pujar-lo</em>',
      dragTip: 'Deixeu anar el fitxer aquí o feu clic per pujar-lo',
      uploading: 'Pujant...',
      success: 'Pujada exitosa',
      error: 'Error en la pujada',
      retry: 'Tornar a intentar',
      cancel: 'Cancel·lar pujada',
      fileTypeError: 'El tipus de fitxer no està suportat',
      fileSizeError: 'La mida del fitxer supera el límit',
      fileCountError: 'El nombre de fitxers supera el límit'
    },
    // Formulari
    form: {
      validationFailed: 'La validació ha fallat',
      required: 'Obligatori',
      pleaseInput: 'Si us plau, introduïu',
      pleaseSelect: 'Si us plau, seleccioneu'
    },
    // Botó
    button: {
      loading: 'Carregant...'
    },
    // Entrada
    input: {
      placeholder: 'Si us plau, introduïu',
      clear: 'Netejar',
      showPassword: 'Mostrar contrasenya',
      hidePassword: 'Ocultar contrasenya',
      copy: 'Copiar',
      copied: 'Copiat'
    },
    // Entrada numèrica
    inputnumber: {
      placeholder: 'Si us plau, introduïu un nombre',
      increase: 'Augmentar',
      decrease: 'Disminuir'
    },
    // Etiqueta d\'entrada
    inputtag: {
      placeholder: 'Si us plau, introduïu',
      add: 'Afegir',
      remove: 'Eliminar'
    },
    // Ruta de navegació
    breadcrumb: {
      label: 'Ruta de navegació',
      more: 'Més'
    },
    // Tornar a dalt
    backtop: {
      text: 'Tornar a dalt'
    },
    // Selecció
    select: {
      placeholder: 'Si us plau, seleccioneu',
      noData: 'Sense dades',
      loading: 'Carregant...',
      noMatch: 'Sense coincidències',
      selectAll: 'Seleccionar tot',
      clearAll: 'Netejar tot'
    },
    // Paginació
    pagination: {
      goto: 'Anar a',
      page: '',
      total: 'Total {total}',
      pageSize: '/pàgina',
      prev: 'Anterior',
      next: 'Següent',
      first: 'Primera',
      last: 'Última',
      pageClassifier: ''
    },
    // Confirmació emergent
    popconfirm: {
      confirm: 'D\'acord',
      cancel: 'Cancel·lar',
      dontAskAgain: 'No tornar a preguntar'
    },
    // Diàleg
    dialog: {
      confirm: 'D\'acord',
      cancel: 'Cancel·lar',
      close: 'Tancar',
      maximize: 'Maximitzar',
      restore: 'Restaurar'
    },
    // Calaix
    drawer: {
      close: 'Tancar',
      confirm: 'D\'acord',
      cancel: 'Cancel·lar'
    },
    // Menú desplegable
    dropdown: {
      loading: 'Carregant...'
    },
    // Imatge
    image: {
      error: 'ERROR',
      loading: 'Carregant...',
      preview: 'Vista prèvia',
      zoomIn: 'Ampliar',
      zoomOut: 'Reduir',
      rotateLeft: 'Girar cap a l\'esquerra',
      rotateRight: 'Girar cap a la dreta',
      originalSize: 'Mida original',
      fullscreen: 'Pantalla completa'
    },
    // Visor d\'imatges
    imageviewer: {
      close: 'Tancar',
      prev: 'Anterior',
      next: 'Següent',
      zoomIn: 'Ampliar',
      zoomOut: 'Reduir',
      rotateLeft: 'Girar cap a l\'esquerra',
      rotateRight: 'Girar cap a la dreta',
      reset: 'Restablir',
      fullscreen: 'Pantalla completa',
      exitFullscreen: 'Sortir de pantalla completa'
    },
    // Desplaçament infinit
    infinitescroll: {
      loading: 'Carregant...',
      finished: 'No hi ha més dades',
      error: 'Error en la càrrega, feu clic per tornar a intentar',
      retry: 'Feu clic per tornar a intentar'
    },
    // Missatge
    message: {
      close: 'Tancar'
    },
    // Notificació
    notification: {
      close: 'Tancar'
    },
    // Càrrega
    loading: {
      text: 'Carregant...'
    },
    // Gir
    spin: {
      text: 'Carregant...'
    },
    // Valoració
    rate: {
      texts: ['Extremadament dolent', 'Decebut', 'Just', 'Satisfet', 'Sorprenent']
    },
    // Alerta
    alert: {
      close: 'Tancar'
    },
    // Etiqueta
    tag: {
      close: 'Tancar'
    },
    // Pestanyes
    tabs: {
      close: 'Tancar',
      add: 'Afegir',
      more: 'Més'
    },
    // Passos
    steps: {
      finish: 'Acabat',
      process: 'En curs',
      wait: 'Esperant',
      error: 'Error'
    },
    // Progrés
    progress: {
      success: 'Èxit',
      exception: 'Excepció',
      warning: 'Advertència'
    },
    // Esquelet
    skeleton: {
      loading: 'Carregant...'
    },
    // Buit
    empty: {
      description: 'Sense dades',
      noData: 'Sense dades',
      noResult: 'Sense resultats',
      networkError: 'Error de xarxa',
      serverError: 'Error del servidor'
    },
    // Resultat
    result: {
      success: 'Èxit',
      error: 'Error',
      warning: 'Advertència',
      info: 'Informació',
      backHome: 'Tornar a l\'inici'
    },
    // Cascada
    waterfall: {
      loading: 'Carregant...',
      noMore: 'No hi ha més dades',
      empty: 'Sense dades'
    },
    // Descripcions
    descriptions: {
      colon: ':'
    },
    // Control lliscant
    slider: {
      tipFormatter: '{value}'
    },
    // Interruptor
    switch: {
      on: 'ON',
      off: 'OFF'
    },
    // Casella de verificació
    checkbox: {
      selectAll: 'Seleccionar tot'
    },
    // Ràdio
    radio: {},
    // Menú
    menu: {
      collapse: 'Contraure menú',
      expand: 'Expandir menú'
    },
    // Targeta
    card: {
      collapse: 'Contraure',
      expand: 'Expandir'
    },
    // Contraure
    collapse: {
      expand: 'Expandir',
      collapse: 'Contraure'
    },
    // Informació sobre eines
    tooltip: {},
    // Emergent
    popover: {},
    // Insígnia
    badge: {},
    // Avatar
    avatar: {
      error: 'Error en la càrrega'
    },
    // Marca d\'aigua
    watermark: {},
    // Divisor
    divider: {},
    // Carrusel
    carousel: {
      prev: 'Anterior',
      next: 'Següent'
    },
    // Marquès
    marquee: {},
    // Fixació
    affix: {},
    // Àncora
    anchor: {}
  }
}

export default ca
