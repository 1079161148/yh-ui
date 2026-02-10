import type { Language } from '../index'

export const es: Language = {
  name: 'es',
  yh: {
    common: {
      yes: 'Sí',
      no: 'No',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      loading: 'Cargando',
      close: 'Cerrar',
      clear: 'Limpiar',
      reset: 'Restablecer',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      add: 'Añadir',
      search: 'Buscar',
      refresh: 'Actualizar',
      expand: 'Expandir',
      collapse: 'Contraer',
      more: 'Más',
      noData: 'Sin datos',
      noMatch: 'Sin coincidencias',
      selectAll: 'Seleccionar todo',
      unselectAll: 'Deseleccionar todo'
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Limpiar',
      eyeDropper: 'Cuentagotas',
      suggestionDark: 'Se recomienda texto blanco',
      suggestionLight: 'Se recomienda texto negro',
      recentColors: 'Colores recientes',
      presetColors: 'Colores predefinidos'
    },
    datepicker: {
      now: 'Ahora',
      today: 'Hoy',
      cancel: 'Cancelar',
      clear: 'Limpiar',
      confirm: 'OK',
      selectDate: 'Seleccionar fecha',
      selectTime: 'Seleccionar hora',
      startDate: 'Fecha de inicio',
      startTime: 'Hora de inicio',
      endDate: 'Fecha de fin',
      endTime: 'Hora de fin',
      year: '',
      month: '',
      day: '',
      week: 'Semana',
      monthBeforeYear: true,
      prevYear: 'Año anterior',
      nextYear: 'Año siguiente',
      prevMonth: 'Mes anterior',
      nextMonth: 'Mes siguiente',
      weeks: {
        sun: 'Dom',
        mon: 'Lun',
        tue: 'Mar',
        wed: 'Mié',
        thu: 'Jue',
        fri: 'Vie',
        sat: 'Sáb'
      },
      months: {
        jan: 'Ene',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Abr',
        may: 'May',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Ago',
        sep: 'Sep',
        oct: 'Oct',
        nov: 'Nov',
        dec: 'Dic'
      },
      quarters: {
        q1: 'T1',
        q2: 'T2',
        q3: 'T3',
        q4: 'T4'
      }
    },
    timepicker: {
      confirm: 'OK',
      cancel: 'Cancelar',
      now: 'Ahora',
      placeholder: 'Seleccionar hora',
      startPlaceholder: 'Hora de inicio',
      endPlaceholder: 'Hora de fin',
      selectTime: 'Seleccionar hora'
    },
    timeselect: {
      placeholder: 'Seleccionar hora'
    },
    tree: {
      emptyText: 'Sin datos',
      loading: 'Cargando...',
      checkAll: 'Seleccionar todo',
      uncheckAll: 'Deseleccionar todo',
      expandAll: 'Expandir todo',
      collapseAll: 'Contraer todo'
    },
    treeselect: {
      placeholder: 'Seleccione',
      emptyText: 'Sin datos',
      loading: 'Cargando...',
      noMatch: 'Sin coincidencias'
    },
    calendar: {
      prevMonth: 'Mes anterior',
      nextMonth: 'Mes siguiente',
      prevYear: 'Año anterior',
      nextYear: 'Año siguiente',
      today: 'Hoy',
      week: 'Semana',
      holiday: 'Feriado',
      workday: 'Trabajo',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Dom',
        mon: 'Lun',
        tue: 'Mar',
        wed: 'Mié',
        thu: 'Jue',
        fri: 'Vie',
        sat: 'Sáb'
      }
    },
    autocomplete: {
      loading: 'Cargando...',
      placeholder: 'Por favor ingrese',
      noData: 'Sin datos',
      noMatch: 'Sin coincidencias'
    },
    countdown: {
      days: 'días',
      hours: 'horas',
      minutes: 'minutos',
      seconds: 'segundos',
      milliseconds: 'milisegundos',
      finished: 'Terminado'
    },
    cascader: {
      noMatch: 'Sin coincidencias',
      placeholder: 'Seleccione',
      loading: 'Cargando...',
      noData: 'Sin datos'
    },
    transfer: {
      noMatch: 'Sin coincidencias',
      noData: 'Sin datos',
      titles: ['Lista 1', 'Lista 2'],
      filterPlaceholder: 'Ingrese palabra clave',
      noCheckedFormat: '{total} elementos',
      hasCheckedFormat: '{checked}/{total} seleccionados',
      searchPlaceholder: 'Ingrese palabra clave'
    },
    table: {
      emptyText: 'Sin datos',
      confirmFilter: 'Confirmar',
      resetFilter: 'Restablecer',
      clearFilter: 'Todo',
      sumText: 'Total',
      loading: 'Cargando...',
      index: 'N°',
      print: 'Imprimir',
      cancel: 'Cancelar',
      preview: 'Vista previa',
      printTime: 'Hora de impresión',
      total: 'Total {total}',
      page: 'Página {page}',
      yes: 'Sí',
      no: 'No',
      toolbar: {
        refresh: 'Actualizar',
        density: 'Densidad',
        densityDefault: 'Por defecto',
        densityLarge: 'Grande',
        densitySmall: 'Compacto',
        columnSetting: 'Configuración de columnas',
        fullscreen: 'Pantalla completa',
        exitFullscreen: 'Salir de pantalla completa',
        export: 'Exportar',
        import: 'Importar',
        search: 'Buscar',
        searchPlaceholder: 'Ingrese palabra clave'
      },
      filter: {
        selectAll: 'Seleccionar todo',
        selectInvert: 'Invertir selección',
        empty: 'Vacío',
        notEmpty: 'No vacío',
        contains: 'Contiene',
        notContains: 'No contiene',
        equals: 'Igual',
        notEquals: 'Diferente',
        startsWith: 'Comienza con',
        endsWith: 'Termina con',
        greaterThan: 'Mayor que',
        lessThan: 'Menor que',
        between: 'Entre'
      },
      sort: {
        asc: 'Ascendente',
        desc: 'Descendente',
        clear: 'Limpiar orden'
      },
      export: {
        title: 'Exportar datos',
        filename: 'Nombre de archivo',
        type: 'Tipo de archivo',
        scope: 'Alcance de exportación',
        scopeAll: 'Todos los datos',
        scopeSelected: 'Datos seleccionados',
        scopeCurrentPage: 'Página actual',
        includeHeader: 'Incluir encabezado',
        exporting: 'Exportando...',
        success: 'Exportación exitosa',
        error: 'Error en exportación'
      },
      import: {
        title: 'Importar datos',
        selectFile: 'Seleccionar archivo',
        dragTip: 'Arrastre o haga clic para cargar',
        importing: 'Importando...',
        success: 'Importación exitosa',
        error: 'Error en importación',
        preview: 'Vista previa de datos',
        confirm: 'Confirmar importación'
      },
      printConfig: {
        title: 'Configuración de impresión',
        pageTitle: 'Título de página',
        pageHeader: 'Encabezado',
        pageFooter: 'Pie de página',
        printAll: 'Imprimir todo',
        printSelected: 'Imprimir selección',
        printCurrentPage: 'Imprimir página actual',
        landscape: 'Horizontal',
        portrait: 'Vertical',
        printing: 'Imprimiendo...'
      },
      columnSetting: {
        title: 'Configuración de columnas',
        showAll: 'Mostrar todo',
        hideAll: 'Ocultar todo',
        reset: 'Restablecer',
        fixedLeft: 'Fijar a la izquierda',
        fixedRight: 'Fijar a la derecha',
        unfixed: 'Liberar'
      },
      contextMenu: {
        copy: 'Copiar',
        copyRow: 'Copiar fila',
        copyCell: 'Copiar celda',
        paste: 'Pegar',
        insertRowAbove: 'Insertar fila arriba',
        insertRowBelow: 'Insertar fila abajo',
        deleteRow: 'Eliminar fila',
        deleteSelectedRows: 'Eliminar filas seleccionadas',
        exportSelected: 'Exportar selección'
      },
      selection: {
        selectAll: 'Seleccionar todo',
        selectInvert: 'Invertir selección',
        selectNone: 'Deseleccionar todo',
        selected: '{count} seleccionado(s)'
      },
      expand: {
        expandAll: 'Expandir todo',
        collapseAll: 'Contraer todo'
      },
      tree: {
        expandAll: 'Expandir todo',
        collapseAll: 'Contraer todo',
        expandLevel: 'Expandir hasta nivel {level}'
      },
      drag: {
        dragTip: 'Arrastrar para reorganizar',
        dropTip: 'Soltar para colocar'
      }
    },
    messagebox: {
      title: 'Mensaje',
      confirm: 'OK',
      cancel: 'Cancelar',
      close: 'Cerrar',
      error: 'Entrada inválida',
      alert: 'Alerta',
      prompt: 'Solicitud',
      inputPlaceholder: 'Por favor ingrese'
    },
    upload: {
      deleteTip: 'Presione Supr para eliminar',
      delete: 'Eliminar',
      preview: 'Vista previa',
      continue: 'Continuar',
      upload: 'Haga clic para cargar',
      tip: 'Arrastre el archivo aquí o <em>haga clic para cargar</em>',
      dragTip: 'Arrastre el archivo aquí',
      uploading: 'Cargando...',
      success: 'Carga exitosa',
      error: 'Error en carga',
      retry: 'Reintentar',
      cancel: 'Cancelar carga',
      fileTypeError: 'Tipo de archivo no soportado',
      fileSizeError: 'Tamaño de archivo excedido',
      fileCountError: 'Número de archivos excedido'
    },
    form: {
      validationFailed: 'Validación fallida',
      required: 'Requerido',
      pleaseInput: 'Por favor ingrese',
      pleaseSelect: 'Por favor seleccione'
    },
    button: {
      loading: 'Cargando...'
    },
    input: {
      placeholder: 'Por favor ingrese',
      clear: 'Limpiar',
      showPassword: 'Mostrar contraseña',
      hidePassword: 'Ocultar contraseña',
      copy: 'Copiar',
      copied: 'Copiado'
    },
    inputnumber: {
      placeholder: 'Ingrese un número',
      increase: 'Aumentar',
      decrease: 'Disminuir'
    },
    inputtag: {
      placeholder: 'Por favor ingrese',
      add: 'Añadir',
      remove: 'Eliminar'
    },
    breadcrumb: {
      label: 'Miga de pan',
      more: 'Más'
    },
    backtop: {
      text: 'Volver arriba'
    },
    select: {
      placeholder: 'Seleccione',
      noData: 'Sin datos',
      loading: 'Cargando...',
      noMatch: 'Sin coincidencias',
      selectAll: 'Seleccionar todo',
      clearAll: 'Limpiar todo'
    },
    pagination: {
      goto: 'Ir a',
      page: '',
      total: 'Total {total}',
      pageSize: '/página',
      prev: 'Anterior',
      next: 'Siguiente',
      first: 'Primero',
      last: 'Último',
      pageClassifier: ''
    },
    popconfirm: {
      confirm: 'OK',
      cancel: 'Cancelar',
      dontAskAgain: 'No preguntar de nuevo'
    },
    dialog: {
      confirm: 'OK',
      cancel: 'Cancelar',
      close: 'Cerrar',
      maximize: 'Maximizar',
      restore: 'Restaurar'
    },
    drawer: {
      close: 'Cerrar',
      confirm: 'OK',
      cancel: 'Cancelar'
    },
    dropdown: {
      loading: 'Cargando...'
    },
    image: {
      error: 'Error al cargar',
      loading: 'Cargando...',
      preview: 'Vista previa',
      zoomIn: 'Ampliar',
      zoomOut: 'Reducir',
      rotateLeft: 'Rotar izquierda',
      rotateRight: 'Rotar derecha',
      originalSize: 'Tamaño original',
      fullscreen: 'Pantalla completa'
    },
    imageviewer: {
      close: 'Cerrar',
      prev: 'Anterior',
      next: 'Siguiente',
      zoomIn: 'Ampliar',
      zoomOut: 'Reducir',
      rotateLeft: 'Rotar izquierda',
      rotateRight: 'Rotar derecha',
      reset: 'Restablecer',
      fullscreen: 'Pantalla completa',
      exitFullscreen: 'Salir de pantalla completa'
    },
    infinitescroll: {
      loading: 'Cargando...',
      finished: 'No hay más datos',
      error: 'Error al cargar, haga clic para reintentar',
      retry: 'Haga clic para reintentar'
    },
    message: {
      close: 'Cerrar'
    },
    notification: {
      close: 'Cerrar'
    },
    loading: {
      text: 'Cargando...'
    },
    spin: {
      text: 'Cargando...'
    },
    rate: {
      texts: ['Muy malo', 'Decepcionante', 'Regular', 'Satisfactorio', 'Excelente']
    },
    alert: {
      close: 'Cerrar'
    },
    tag: {
      close: 'Cerrar'
    },
    tabs: {
      close: 'Cerrar',
      add: 'Añadir',
      more: 'Más'
    },
    steps: {
      finish: 'Completado',
      process: 'En proceso',
      wait: 'Esperando',
      error: 'Error'
    },
    progress: {
      success: 'Éxito',
      exception: 'Excepción',
      warning: 'Advertencia'
    },
    skeleton: {
      loading: 'Cargando...'
    },
    empty: {
      description: 'Sin datos',
      noData: 'Sin datos',
      noResult: 'Sin resultados',
      networkError: 'Error de red',
      serverError: 'Error del servidor'
    },
    result: {
      success: 'Éxito',
      error: 'Error',
      warning: 'Advertencia',
      info: 'Información',
      backHome: 'Volver al inicio'
    },
    waterfall: {
      loading: 'Cargando...',
      noMore: 'No hay más datos',
      empty: 'Sin datos'
    },
    descriptions: {
      colon: ':'
    },
    slider: {
      tipFormatter: '{value}'
    },
    switch: {
      on: 'SÍ',
      off: 'NO'
    },
    checkbox: {
      selectAll: 'Seleccionar todo'
    },
    radio: {},
    menu: {
      collapse: 'Contraer menú',
      expand: 'Expandir menú'
    },
    card: {
      collapse: 'Contraer',
      expand: 'Expandir'
    },
    collapse: {
      expand: 'Expandir',
      collapse: 'Contraer'
    },
    tooltip: {},
    popover: {},
    badge: {},
    avatar: {
      error: 'Error al cargar'
    },
    watermark: {},
    divider: {},
    carousel: {
      prev: 'Anterior',
      next: 'Siguiente'
    },
    marquee: {},
    affix: {},
    anchor: {}
  }
}

export default es

