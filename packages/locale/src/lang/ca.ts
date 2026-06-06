import type { Language } from '../index'

export const ca: Language = {
  name: 'ca',
  yh: {
    // Com煤
    common: {
      yes: 'S铆',
      no: 'No',
      confirm: 'Confirmar',
      cancel: 'Cancel路lar',
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
      more: 'M茅s',
      noData: 'Sense dades',
      noMatch: 'Sense coincid猫ncies',
      selectAll: 'Seleccionar tot',
      unselectAll: 'Desseleccionar tot'
    },
    // Selector de color
    colorpicker: {
      confirm: "D'acord",
      clear: 'Netejar',
      eyeDropper: 'Comptagotes',
      suggestionDark: 'El text blanc 茅s millor',
      suggestionLight: 'El text negre 茅s millor',
      recentColors: 'Colors recents',
      presetColors: 'Colors predefinits'
    },
    // Selector de data
    datepicker: {
      now: 'Ara',
      today: 'Avui',
      cancel: 'Cancel路lar',
      clear: 'Netejar',
      confirm: "D'acord",
      selectDate: 'Seleccionar data',
      selectTime: 'Seleccionar hora',
      startDate: "Data d'inici",
      startTime: "Hora d'inici",
      endDate: 'Data de fi',
      endTime: 'Hora de fi',
      year: '',
      month: '',
      day: '',
      week: 'Setmana',
      monthBeforeYear: true,
      prevYear: 'Any anterior',
      nextYear: 'Any seg眉ent',
      prevMonth: 'Mes anterior',
      nextMonth: 'Mes seg眉ent',
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
      confirm: "D'acord",
      cancel: 'Cancel路lar',
      now: 'Ara',
      placeholder: 'Seleccionar hora',
      startPlaceholder: "Hora d'inici",
      endPlaceholder: 'Hora de fi',
      selectTime: 'Seleccionar hora'
    },
    // Selecci贸 d'hora
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
      noMatch: 'Sense coincid猫ncies'
    },
    // Calendari
    calendar: {
      prevMonth: 'Mes anterior',
      nextMonth: 'Mes seg眉ent',
      prevYear: 'Any anterior',
      nextYear: 'Any seg眉ent',
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
      placeholder: 'Si us plau, introdu茂u',
      noData: 'Sense dades',
      noMatch: 'Sense coincid猫ncies'
    },
    // Compte enrere
    countdown: {
      days: 'dies',
      hours: 'hores',
      minutes: 'minuts',
      seconds: 'segons',
      milliseconds: 'mil路lisegons',
      finished: 'Acabat'
    },
    // Cascada
    cascader: {
      noMatch: 'Sense coincid猫ncies',
      placeholder: 'Seleccionar',
      loading: 'Carregant...',
      noData: 'Sense dades'
    },
    // Transfer猫ncia
    transfer: {
      noMatch: 'Sense coincid猫ncies',
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
      index: '脥ndex',
      print: 'Imprimir',
      cancel: 'Cancel路lar',
      preview: "Vista pr猫via d'impressi贸",
      printTime: "Hora d'impressi贸",
      total: 'Total {total} elements',
      page: 'P脿gina {page}',
      yes: 'S铆',
      no: 'No',
      // Barra d'eines
      toolbar: {
        refresh: 'Actualitzar',
        density: 'Densitat',
        densityDefault: 'Per defecte',
        densityLarge: 'Gran',
        densitySmall: 'Petit',
        columnSetting: 'Configuraci贸 de columnes',
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
        selectInvert: 'Invertir selecci贸',
        empty: 'Est脿 buit',
        notEmpty: 'No est脿 buit',
        contains: 'Cont茅',
        notContains: 'No cont茅',
        equals: 'Igual',
        notEquals: 'No igual',
        startsWith: 'Comen莽a amb',
        endsWith: 'Acaba amb',
        greaterThan: 'Major que',
        lessThan: 'Menor que',
        between: 'Entre'
      },
      // Ordenaci贸
      sort: {
        asc: 'Ascendent',
        desc: 'Descendent',
        clear: 'Netejar ordenaci贸'
      },
      // Exportaci贸
      export: {
        title: 'Exportar dades',
        filename: 'Nom del fitxer',
        type: 'Tipus de fitxer',
        scope: "Abast d'exportaci贸",
        scopeAll: 'Totes les dades',
        scopeSelected: 'Dades seleccionades',
        scopeCurrentPage: 'P脿gina actual',
        includeHeader: 'Incloure cap莽alera',
        exporting: 'Exportant...',
        success: 'Exportaci贸 exitosa',
        error: "Error en l'exportaci贸"
      },
      // Importaci贸
      import: {
        title: 'Importar dades',
        selectFile: 'Seleccionar fitxer',
        dragTip: 'Feu clic o arrossegueu el fitxer aqu铆 per pujar-lo',
        importing: 'Important...',
        success: 'Importaci贸 exitosa',
        error: "Error en l'importaci贸",
        preview: 'Vista pr猫via de dades',
        confirm: 'Confirmar importaci贸'
      },
      // Impressi贸
      printConfig: {
        title: "Configuraci贸 d'impressi贸",
        pageTitle: 'T铆tol de la p脿gina',
        pageHeader: 'Cap莽alera',
        pageFooter: 'Peu de p脿gina',
        printAll: 'Imprimir tot',
        printSelected: 'Imprimir seleccionat',
        printCurrentPage: 'Imprimir p脿gina actual',
        landscape: 'Horitzontal',
        portrait: 'Vertical',
        printing: 'Imprimint...'
      },
      // Configuraci贸 de columnes
      columnSetting: {
        title: 'Configuraci贸 de columnes',
        showAll: 'Mostrar tot',
        hideAll: 'Ocultar tot',
        reset: 'Restablir',
        fixedLeft: "Fixar a l'esquerra",
        fixedRight: 'Fixar a la dreta',
        unfixed: 'Desfixar'
      },
      // Men煤 contextual
      contextMenu: {
        copy: 'Copiar',
        copyRow: 'Copiar fila',
        copyCell: 'Copiar cel路la',
        paste: 'Enganxar',
        insertRowAbove: 'Inserir fila a dalt',
        insertRowBelow: 'Inserir fila a baix',
        deleteRow: 'Eliminar fila',
        deleteSelectedRows: 'Eliminar files seleccionades',
        exportSelected: 'Exportar seleccionat'
      },
      // Selecci贸
      selection: {
        selectAll: 'Seleccionar tot',
        selectInvert: 'Invertir selecci贸',
        selectNone: 'Netejar selecci贸',
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
        dropTip: 'Deixar anar per col路locar'
      }
    },
    // Quadre de missatge
    messagebox: {
      title: 'Missatge',
      confirm: "D'acord",
      cancel: 'Cancel路lar',
      close: 'Tancar',
      error: 'Entrada no v脿lida',
      alert: 'Alerta',
      prompt: 'Sol路licitud',
      inputPlaceholder: 'Si us plau, introdu茂u'
    },
    // Pujada
    upload: {
      deleteTip: 'premeu delete per eliminar',
      delete: 'Eliminar',
      preview: 'Vista pr猫via',
      continue: 'Continuar',
      upload: 'Feu clic per pujar',
      tip: 'Feu clic o arrossegueu el fitxer a aquesta 脿rea per <em>pujar-lo</em>',
      dragTip: 'Deixeu anar el fitxer aqu铆 o feu clic per pujar-lo',
      uploading: 'Pujant...',
      success: 'Pujada exitosa',
      error: 'Error en la pujada',
      retry: 'Tornar a intentar',
      cancel: 'Cancel路lar pujada',
      fileTypeError: 'El tipus de fitxer no est脿 suportat',
      fileSizeError: 'La mida del fitxer supera el l铆mit',
      fileCountError: 'El nombre de fitxers supera el l铆mit'
    },
    // Formulari
    form: {
      validationFailed: 'La validaci贸 ha fallat',
      required: 'Obligatori',
      pleaseInput: 'Si us plau, introdu茂u',
      pleaseSelect: 'Si us plau, seleccioneu'
    },
    // Bot贸
    button: {
      loading: 'Carregant...'
    },
    // Entrada
    input: {
      placeholder: 'Si us plau, introdu茂u',
      clear: 'Netejar',
      showPassword: 'Mostrar contrasenya',
      hidePassword: 'Ocultar contrasenya',
      copy: 'Copiar',
      copied: 'Copiat'
    },
    // Entrada num猫rica
    inputnumber: {
      placeholder: 'Si us plau, introdu茂u un nombre',
      increase: 'Augmentar',
      decrease: 'Disminuir'
    },
    // Etiqueta d\'entrada
    inputtag: {
      placeholder: 'Si us plau, introdu茂u',
      add: 'Afegir',
      remove: 'Eliminar'
    },
    // Ruta de navegaci贸
    breadcrumb: {
      label: 'Ruta de navegaci贸',
      more: 'M茅s'
    },
    // Tornar a dalt
    backtop: {
      text: 'Tornar a dalt'
    },
    // Selecci贸
    select: {
      placeholder: 'Si us plau, seleccioneu',
      noData: 'Sense dades',
      loading: 'Carregant...',
      noMatch: 'Sense coincid猫ncies',
      selectAll: 'Seleccionar tot',
      clearAll: 'Netejar tot'
    },
    // Paginaci贸
    pagination: {
      goto: 'Anar a',
      page: '',
      total: 'Total {total}',
      pageSize: '/p脿gina',
      prev: 'Anterior',
      next: 'Seg眉ent',
      first: 'Primera',
      last: '脷ltima',
      pageClassifier: ''
    },
    // Confirmaci贸 emergent
    popconfirm: {
      confirm: "D'acord",
      cancel: 'Cancel路lar',
      dontAskAgain: 'No tornar a preguntar'
    },
    // Di脿leg
    dialog: {
      confirm: "D'acord",
      cancel: 'Cancel路lar',
      close: 'Tancar',
      maximize: 'Maximitzar',
      restore: 'Restaurar'
    },
    // Calaix
    drawer: {
      close: 'Tancar',
      confirm: "D'acord",
      cancel: 'Cancel路lar'
    },
    // Men煤 desplegable
    dropdown: {
      loading: 'Carregant...'
    },
    // Imatge
    image: {
      error: 'ERROR',
      loading: 'Carregant...',
      preview: 'Vista pr猫via',
      zoomIn: 'Ampliar',
      zoomOut: 'Reduir',
      rotateLeft: "Girar cap a l'esquerra",
      rotateRight: 'Girar cap a la dreta',
      originalSize: 'Mida original',
      fullscreen: 'Pantalla completa'
    },
    // Visor d\'imatges
    imageviewer: {
      close: 'Tancar',
      prev: 'Anterior',
      next: 'Seg眉ent',
      zoomIn: 'Ampliar',
      zoomOut: 'Reduir',
      rotateLeft: "Girar cap a l'esquerra",
      rotateRight: 'Girar cap a la dreta',
      reset: 'Restablir',
      fullscreen: 'Pantalla completa',
      exitFullscreen: 'Sortir de pantalla completa'
    },
    // Despla莽ament infinit
    infinitescroll: {
      loading: 'Carregant...',
      finished: 'No hi ha m茅s dades',
      error: 'Error en la c脿rrega, feu clic per tornar a intentar',
      retry: 'Feu clic per tornar a intentar'
    },
    // Missatge
    message: {
      close: 'Tancar'
    },
    // Notificaci贸
    notification: {
      close: 'Tancar'
    },
    // C脿rrega
    loading: {
      text: 'Carregant...'
    },
    // Gir
    spin: {
      text: 'Carregant...'
    },
    // Valoraci贸
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
      more: 'M茅s'
    },
    // Passos
    steps: {
      finish: 'Acabat',
      process: 'En curs',
      wait: 'Esperant',
      error: 'Error'
    },
    // Progr茅s
    progress: {
      success: '脠xit',
      exception: 'Excepci贸',
      warning: 'Advert猫ncia'
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
      success: '脠xit',
      error: 'Error',
      warning: 'Advert猫ncia',
      info: 'Informaci贸',
      backHome: "Tornar a l'inici"
    },
    // Cascada
    waterfall: {
      loading: 'Carregant...',
      noMore: 'No hi ha m茅s dades',
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
    // Casella de verificaci贸
    checkbox: {
      selectAll: 'Seleccionar tot'
    },
    // R脿dio
    radio: {},
    // Men煤
    menu: {
      collapse: 'Contraure men煤',
      expand: 'Expandir men煤'
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
    // Informaci贸 sobre eines
    tooltip: {},
    // Emergent
    popover: {},
    // Ins铆gnia
    badge: {},
    // Avatar
    avatar: {
      error: 'Error en la c脿rrega'
    },
    // Marca d\'aigua
    watermark: {},
    // Divisor
    divider: {},
    // Carrusel
    carousel: {
      prev: 'Anterior',
      next: 'Seg眉ent'
    },
    // Marqu猫s
    marquee: {},
    // Fixaci贸
    affix: {},
    // 脌ncora
    anchor: {},
    // Mention
    mention: {
      placeholder: 'Si us plau, introdu茂u',
      loading: 'Carregant...',
      noData: 'Sense dades'
    },
    // AI Components
    skuselector: {
      placeholder: 'Seleccioneu les especificacions',
      emptyText: 'No hi ha especificacions',
      stock: 'Estoc',
      price: 'Preu',
      selected: 'Seleccionat',
      outOfStock: 'Sense estoc'
    },
    productcard: {
      viewDetails: 'Veure detalls',
      buyNow: 'Compra ara',
      addToCart: 'Afegeix a la cistella',
      sold: 'Venut',
      soldOut: 'Esgotat',
      vip: 'VIP'
    },
    price: {
      original: 'Preu original'
    },
    couponcard: {
      available: "Obt茅'l ara",
      used: 'Utilitzat',
      expired: 'Caducat',
      received: 'Rebut',
      limit: 'Comandes superiors a {threshold}',
      noThreshold: 'Sense m铆nim',
      validPeriod: 'Per铆ode de validesa',
      ruleTitle: 'Normes d鈥櫭簊'
    },
    luckydraw: {
      start: 'Comen莽a',
      drawing: 'Sortejant...',
      end: 'Guanyador!',
      retry: 'Torna-ho a provar'
    },
    filterbar: {
      all: 'Tot',
      sort: 'Ordena',
      filter: 'Filtra',
      cancel: 'Cancel路la',
      reset: 'Reinicia',
      confirm: 'Confirma',
      noOptions: 'No hi ha opcions',
      asc: 'Ascendent',
      desc: 'Descendent',
      selected: 'Seleccionat'
    },
    submitbar: {
      total: 'Total: ',
      selected: '{count} seleccionat(s)',
      submit: 'Finalitza la compra',
      allSelect: 'Selecciona-ho tot'
    },
    categorynav: {
      all: 'Tot',
      noData: 'No hi ha dades',
      loading: 'S鈥檈st脿 carregant...'
    },
    smartaddress: {
      placeholder:
        'Enganxeu aqu铆 l鈥檃dre莽a per detectar autom脿ticament nom, tel猫fon i ubicaci贸',
      parse: 'An脿lisi intel路ligent',
      province: 'Prov铆ncia/Ciutat/Districte',
      city: 'Ciutat',
      district: 'Districte/Comarca',
      street: 'Carrer/Poble',
      detail: 'Adre莽a detallada',
      phone: 'Tel猫fon',
      name: 'Destinatari',
      parseSuccess: 'L鈥檃dre莽a s鈥檋a analitzat correctament',
      parseFailed: 'L鈥檃n脿lisi ha fallat, empleneu-ho manualment',
      required: 'Empleneu l鈥檃dre莽a completa',
      provinceKeywords: ['Prov铆ncia', 'Estat'],
      cityKeywords: ['Ciutat', 'Municipi'],
      districtKeywords: ['Districte', 'Comarca', 'Barri'],
      streetKeywords: ['Carrer', 'Avinguda', 'Cam铆', 'Passatge']
    },
    ganttchart: {
      taskName: 'Nom de la tasca',
      searchPlaceholder: 'Cerca tasques...',
      zoom: 'Zoom',
      day: 'Dia',
      week: 'Setmana',
      month: 'Mes',
      year: 'Any',
      milestone: 'Fita'
    },
    imagemagnifier: {
      switchToImage: 'Canvia a la imatge {index}',
      galleryItem: 'Galeria {index}',
      close: 'Tanca'
    },
    ai: {
      bubble: {
        citations: 'Citacions'
      },
      mention: {
        placeholder: '@ Esmentar Agent, Document o Taula...',
        agent: 'Agent',
        document: 'Document',
        table: 'Taula',
        knowledge: 'Coneixement'
      },
      codeBlock: {
        copyCode: 'Copiar codi',
        copied: 'Copiat!',
        run: 'Executar codi',
        edit: 'Editar',
        save: 'Guardar',
        cancel: 'Cancel路lar'
      },
      codeRunner: {
        run: 'Executar',
        stop: 'Aturar',
        clear: 'Netejar',
        reset: 'Reiniciar',
        placeholder: 'Feu clic a Executar per executar el codi...'
      },
      sender: {
        placeholder: 'Enviar missatge...',
        dragTip: 'Allibereu per pujar fitxers'
      },
      thoughtChain: {
        thoughtProcess: 'Proc茅s de pensament',
        thinking: 'Pensant...',
        defaultTitle: 'Nou pas',
        addNode: 'Afegir pas'
      },
      thinking: {
        start: 'Comen莽ar a pensar',
        thinking: 'Pensant...',
        complete: 'Pensament completat',
        error: 'Error de pensament'
      },
      welcome: {
        title: 'Hola, s贸c YH AI',
        description:
          'Us puc ajudar amb programaci贸, traducci贸 de documents o escriptura creativa. Qu猫 puc fer per vosaltres avui?'
      },
      action: {
        copy: 'Copiar',
        regenerate: 'Regenerar',
        share: 'Compartir',
        like: "M'agrada",
        dislike: "No m'agrada",
        edit: 'Editar',
        delete: 'Eliminar'
      },
      artifacts: {
        preview: 'Vista pr猫via',
        inline: 'En l铆nia',
        code: 'Codi font',
        versions: 'Versions',
        rendering: 'Renderitzant component...',
        renderingChart: 'Renderitzant gr脿fic...',
        renderingCanvas: 'Preparant llen莽...'
      },
      voice: {
        trigger: 'Feu clic per parlar',
        listening: 'Escoltant...'
      },
      agent: {
        uses: '煤sos',
        use: 'Usar ara',
        favorite: 'Favorit',
        unfavorite: 'Treure de favorits',
        share: 'Compartir',
        online: 'En l铆nia',
        offline: 'Fora de l铆nia',
        busy: 'Ocupat',
        verified: 'Verificat',
        rating: 'Valoraci贸',
        reviews: 'resenyes',
        responseTime: 'Temps de resposta mitj脿',
        ms: 'ms'
      },
      sources: {
        references: 'Refer猫ncies',
        referencedSources: 'Fonts referenciades',
        relevant: 'Rellev脿ncia',
        viewOriginal: 'Veure original',
        showAll: 'Mostrar tot',
        more: 'm茅s fonts',
        drawerTitle: 'Refer猫ncies',
        expandMore: 'Mostrar m茅s',
        collapseMore: 'Reduir',
        noSources: 'Sense fonts',
        today: 'Avui',
        last7Days: '脷ltims 7 dies',
        last30Days: '脷ltims 30 dies',
        earlier: 'Anterior',
        pinned: 'Fixat'
      },
      conversations: {
        today: 'Avui',
        last7Days: '脷ltims 7 dies',
        last30Days: '脷ltims 30 dies',
        earlier: 'Anterior',
        pinned: 'Fixat',
        pin: 'Fixar',
        unpin: 'Desfixar',
        newConversation: 'Nova conversa',
        noData: 'Encara no hi ha converses',
        rename: 'Renombrar',
        delete: 'Eliminar',
        deleteConfirm: 'Confirmeu eliminar aquesta conversa?'
      },
      attachments: {
        dropTip: 'Deixa anar els fitxers aqu铆 per pujar-los',
        clickToUpload: 'Fes clic o arrossega fitxers per pujar-los',
        uploadSuccess: 'C脿rrega correcta',
        uploadError: 'La c脿rrega ha fallat',
        deleteConfirm: 'Segur que vols eliminar aquest fitxer?',
        fileTooLarge: 'La mida del fitxer no pot superar {size}',
        invalidFileType: 'Tipus de fitxer no v脿lid'
      },
      mermaid: {
        image: 'Imatge',
        code: 'Codi',
        zoomIn: 'Apropa',
        zoomOut: 'Allunya',
        reset: 'Restableix',
        download: 'Descarrega',
        copyCode: 'Copiar codi',
        rendering: 'S鈥檈st脿 renderitzant...',
        renderError: 'La renderitzaci贸 ha fallat',
        renderSuccess: 'Renderitzaci贸 correcta',
        retry: 'Torna-ho a provar'
      }
    }
  }
}

export default ca
