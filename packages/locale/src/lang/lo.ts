import type { Language } from '../index'

export const lo: Language = {
  name: 'lo',
  yh: {
    common: {
      yes: 'ແມ່ນ',
      no: 'ບໍ່',
      confirm: 'ຢືນຢັນ',
      cancel: 'ຍົກເລີກ',
      loading: 'ກຳລັງໂຫຼດ',
      close: 'ປິດ',
      clear: 'ລ້າງ',
      reset: 'ຣີເຊັດ',
      save: 'ບັນທຶກ',
      delete: 'ລຶບ',
      edit: 'ແກ້ໄຂ',
      add: 'ເພີ່ມ',
      search: 'ຄົ້ນຫາ',
      refresh: 'ຣີເຟຣດ',
      expand: 'ຂະຫຍາຍ',
      collapse: 'ຫຍໍ້',
      more: 'ເພີ່ມເຕີມ',
      noData: 'ບໍ່ມີຂໍ້ມູນ',
      noMatch: 'ບໍ່ມີຂໍ້ມູນທີ່ກົງກັນ',
      selectAll: 'ເລືອກທັງໝົດ',
      unselectAll: 'ຍົກເລີກການເລືອກທັງໝົດ'
    },
    colorpicker: {
      confirm: 'ຕົກລົງ',
      clear: 'ລ້າງ',
      eyeDropper: 'ຕົວຈັບສີ',
      suggestionDark: 'ຂໍ້ຄວາມສີຂາວແມ່ນດີທີ່ສຸດ',
      suggestionLight: 'ຂໍ້ຄວາມສີດຳແມ່ນດີທີ່ສຸດ',
      recentColors: 'ສີຫຼ້າສຸດ',
      presetColors: 'ສີທີ່ກຳນົດໄວ້ລ່ວງໜ້າ'
    },
    datepicker: {
      now: 'ດຽວນີ້',
      today: 'ມື້ນີ້',
      cancel: 'ຍົກເລີກ',
      clear: 'ລ້າງ',
      confirm: 'ຕົກລົງ',
      selectDate: 'ເລືອກວັນທີ',
      selectTime: 'ເລືອກເວລາ',
      startDate: 'ວັນທີເລີ່ມຕົ້ນ',
      startTime: 'ເວລາເລີ່ມຕົ້ນ',
      endDate: 'ວັນທີສິ້ນສຸດ',
      endTime: 'ເວລາສິ້ນສຸດ',
      year: '',
      month: '',
      day: '',
      week: 'ອາທິດ',
      monthBeforeYear: true,
      prevYear: 'ປີກ່ອນໜ້າ',
      nextYear: 'ປີຖັດໄປ',
      prevMonth: 'ເດືອນກ່ອນໜ້າ',
      nextMonth: 'ເດືອນຖັດໄປ',
      weeks: {
        sun: 'ອາ',
        mon: 'ຈ',
        tue: 'ອ',
        wed: 'ພ',
        thu: 'ພຫ',
        fri: 'ສຸ',
        sat: 'ສ'
      },
      months: {
        jan: 'ມ.ກ.',
        feb: 'ກ.ພ.',
        mar: 'ມ.ນ.',
        apr: 'ມ.ສ.',
        may: 'ພ.ພ.',
        jun: 'ມິ.ຖ.',
        jul: 'ກ.ລ.',
        aug: 'ສ.ຫ.',
        sep: 'ກ.ຍ.',
        oct: 'ຕ.ລ.',
        nov: 'ພ.ຈ.',
        dec: 'ທ.ວ.'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    timepicker: {
      confirm: 'ຕົກລົງ',
      cancel: 'ຍົກເລີກ',
      now: 'ດຽວນີ້',
      placeholder: 'ເລືອກເວລາ',
      startPlaceholder: 'ເວລາເລີ່ມຕົ້ນ',
      endPlaceholder: 'ເວລາສິ້ນສຸດ',
      selectTime: 'ເລືອກເວລາ'
    },
    timeselect: {
      placeholder: 'ເລືອກເວລາ'
    },
    tree: {
      emptyText: 'ບໍ່ມີຂໍ້ມູນ',
      loading: 'ກຳລັງໂຫຼດ...',
      checkAll: 'ເລືອກທັງໝົດ',
      uncheckAll: 'ຍົກເລີກການເລືອກ',
      expandAll: 'ຂະຫຍາຍທັງໝົດ',
      collapseAll: 'ຫຍໍ້ທັງໝົດ'
    },
    treeselect: {
      placeholder: 'ເລືອກ',
      emptyText: 'ບໍ່ມີຂໍ້ມູນ',
      loading: 'ກຳລັງໂຫຼດ...',
      noMatch: 'ບໍ່ມີຂໍ້ມູນທີ່ກົງກັນ'
    },
    calendar: {
      prevMonth: 'ເດືອນກ່ອນໜ້າ',
      nextMonth: 'ເດືອນຖັດໄປ',
      prevYear: 'ປີກ່ອນໜ້າ',
      nextYear: 'ປີຖັດໄປ',
      today: 'ມື້ນີ້',
      week: 'ອາທິດ',
      holiday: 'ວັນພັກ',
      workday: 'ວັນເຮັດວຽກ',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'ອາ',
        mon: 'ຈ',
        tue: 'ອ',
        wed: 'ພ',
        thu: 'ພຫ',
        fri: 'ສຸ',
        sat: 'ສ'
      }
    },
    autocomplete: {
      loading: 'ກຳລັງໂຫຼດ...',
      placeholder: 'ກະລຸນາປ້ອນ',
      noData: 'ບໍ່ມີຂໍ້ມູນ',
      noMatch: 'ບໍ່ມີຂໍ້ມູນທີ່ກົງກັນ'
    },
    countdown: {
      days: 'ມື້',
      hours: 'ຊົ່ວໂມງ',
      minutes: 'ນາທີ',
      seconds: 'ວິນາທີ',
      milliseconds: 'ມິລິວິນາທີ',
      finished: 'ສຳເລັດ'
    },
    cascader: {
      noMatch: 'ບໍ່ມີຂໍ້ມູນທີ່ກົງກັນ',
      placeholder: 'ເລືອກ',
      loading: 'ກຳລັງໂຫຼດ...',
      noData: 'ບໍ່ມີຂໍ້ມູນ'
    },
    transfer: {
      noMatch: 'ບໍ່ມີຂໍ້ມູນທີ່ກົງກັນ',
      noData: 'ບໍ່ມີຂໍ້ມູນ',
      titles: ['ລາຍການ 1', 'ລາຍການ 2'],
      filterPlaceholder: 'ປ້ອນຄຳສຳຄັນ',
      noCheckedFormat: '{total} ລາຍການ',
      hasCheckedFormat: '{checked}/{total} ເລືອກ',
      searchPlaceholder: 'ປ້ອນຄຳສຳຄັນ'
    },
    table: {
      emptyText: 'ບໍ່ມີຂໍ້ມູນ',
      confirmFilter: 'ຢືນຢັນ',
      resetFilter: 'ຣີເຊັດ',
      clearFilter: 'ທັງໝົດ',
      sumText: 'ລວມ',
      loading: 'ກຳລັງໂຫຼດ...',
      index: 'ດັດຊະນີ',
      print: 'ພິມ',
      cancel: 'ຍົກເລີກ',
      preview: 'ຕົວຢ່າງການພິມ',
      printTime: 'ເວລາພິມ',
      total: 'ລວມ {total} ລາຍການ',
      page: 'ໜ້າ {page}',
      yes: 'ແມ່ນ',
      no: 'ບໍ່',
      toolbar: {
        refresh: 'ຣີເຟຣດ',
        density: 'ຄວາມໜາແໜ້ນ',
        densityDefault: 'ເລີ່ມຕົ້ນ',
        densityLarge: 'ໃຫຍ່',
        densitySmall: 'ນ້ອຍ',
        columnSetting: 'ການຕັ້ງຄ່າຖັນ',
        fullscreen: 'ໜ້າຈໍເຕັມ',
        exitFullscreen: 'ອອກຈາກໜ້າຈໍເຕັມ',
        export: 'ສົ່ງອອກ',
        import: 'ນຳເຂົ້າ',
        search: 'ຄົ້ນຫາ',
        searchPlaceholder: 'ປ້ອນຄຳສຳຄັນເພື່ອຄົ້ນຫາ'
      },
      filter: {
        selectAll: 'ເລືອກທັງໝົດ',
        selectInvert: 'ກັບການເລືອກ',
        empty: 'ເປົ່າ',
        notEmpty: 'ບໍ່ເປົ່າ',
        contains: 'ມີ',
        notContains: 'ບໍ່ມີ',
        equals: 'ເທົ່າ',
        notEquals: 'ບໍ່ເທົ່າ',
        startsWith: 'ເລີ່ມຕົ້ນດ້ວຍ',
        endsWith: 'ສິ້ນສຸດດ້ວຍ',
        greaterThan: 'ໃຫຍ່ກວ່າ',
        lessThan: 'ນ້ອຍກວ່າ',
        between: 'ລະຫວ່າງ'
      },
      sort: {
        asc: 'ເພີ່ມຂຶ້ນ',
        desc: 'ຫຼຸດລົງ',
        clear: 'ລ້າງການຈັດລຽງ'
      },
      export: {
        title: 'ສົ່ງອອກຂໍ້ມູນ',
        filename: 'ຊື່ໄຟລ໌',
        type: 'ປະເພດໄຟລ໌',
        scope: 'ຂອບເຂດການສົ່ງອອກ',
        scopeAll: 'ຂໍ້ມູນທັງໝົດ',
        scopeSelected: 'ຂໍ້ມູນທີ່ເລືອກ',
        scopeCurrentPage: 'ໜ້າປັດຈຸບັນ',
        includeHeader: 'ລວມຫົວຂໍ້',
        exporting: 'ກຳລັງສົ່ງອອກ...',
        success: 'ການສົ່ງອອກສຳເລັດ',
        error: 'ການສົ່ງອອກລົ້ມເຫຼວ'
      },
      import: {
        title: 'ນຳເຂົ້າຂໍ້ມູນ',
        selectFile: 'ເລືອກໄຟລ໌',
        dragTip: 'ກົດຫຼືລາກໄຟລ໌ມາທີ່ນີ້ເພື່ອອັບໂຫຼດ',
        importing: 'ກຳລັງນຳເຂົ້າ...',
        success: 'ການນຳເຂົ້າສຳເລັດ',
        error: 'ການນຳເຂົ້າລົ້ມເຫຼວ',
        preview: 'ຕົວຢ່າງຂໍ້ມູນ',
        confirm: 'ຢືນຢັນການນຳເຂົ້າ'
      },
      printConfig: {
        title: 'ການຕັ້ງຄ່າການພິມ',
        pageTitle: 'ຫົວຂໍ້ໜ້າ',
        pageHeader: 'ຫົວຂໍ້',
        pageFooter: 'ສ່ວນທ້າຍ',
        printAll: 'ພິມທັງໝົດ',
        printSelected: 'ພິມທີ່ເລືອກ',
        printCurrentPage: 'ພິມໜ້າປັດຈຸບັນ',
        landscape: 'ນອນ',
        portrait: 'ຕັ້ງ',
        printing: 'ກຳລັງພິມ...'
      },
      columnSetting: {
        title: 'ການຕັ້ງຄ່າຖັນ',
        showAll: 'ສະແດງທັງໝົດ',
        hideAll: 'ເຊື່ອງທັງໝົດ',
        reset: 'ຣີເຊັດ',
        fixedLeft: 'ຕິດຊ້າຍ',
        fixedRight: 'ຕິດຂວາ',
        unfixed: 'ຍົກເລີກການຕິດ'
      },
      contextMenu: {
        copy: 'ສຳເນົາ',
        copyRow: 'ສຳເນົາບັນທັດ',
        copyCell: 'ສຳເນົາເຊລ',
        paste: 'ວາງ',
        insertRowAbove: 'ເພີ່ມບັນທັດຂ້າງເທິງ',
        insertRowBelow: 'ເພີ່ມບັນທັດຂ້າງລຸ່ມ',
        deleteRow: 'ລຶບບັນທັດ',
        deleteSelectedRows: 'ລຶບບັນທັດທີ່ເລືອກ',
        exportSelected: 'ສົ່ງອອກທີ່ເລືອກ'
      },
      selection: {
        selectAll: 'ເລືອກທັງໝົດ',
        selectInvert: 'ກັບການເລືອກ',
        selectNone: 'ລ້າງການເລືອກ',
        selected: '{count} ລາຍການທີ່ເລືອກ'
      },
      expand: {
        expandAll: 'ຂະຫຍາຍທັງໝົດ',
        collapseAll: 'ຫຍໍ້ທັງໝົດ'
      },
      tree: {
        expandAll: 'ຂະຫຍາຍທັງໝົດ',
        collapseAll: 'ຫຍໍ້ທັງໝົດ',
        expandLevel: 'ຂະຫຍາຍເຖິງລະດັບ {level}'
      },
      drag: {
        dragTip: 'ລາກເພື່ອຈັດລຽງໃໝ່',
        dropTip: 'ປ່ອຍເພື່ອວາງ'
      }
    },
    messagebox: {
      title: 'ຂໍ້ຄວາມ',
      confirm: 'ຕົກລົງ',
      cancel: 'ຍົກເລີກ',
      close: 'ປິດ',
      error: 'ການປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ',
      alert: 'ແຈ້ງເຕືອນ',
      prompt: 'ການກະຕຸ້ນ',
      inputPlaceholder: 'ກະລຸນາປ້ອນ'
    },
    upload: {
      deleteTip: 'ກົດ delete ເພື່ອລຶບ',
      delete: 'ລຶບ',
      preview: 'ຕົວຢ່າງ',
      continue: 'ສືບຕໍ່',
      upload: 'ກົດເພື່ອອັບໂຫຼດ',
      tip: 'ກົດຫຼືລາກໄຟລ໌ມາພື້ນທີ່ນີ້ເພື່ອ <em>ອັບໂຫຼດ</em>',
      dragTip: 'ປ່ອຍໄຟລ໌ທີ່ນີ້ຫຼືກົດເພື່ອອັບໂຫຼດ',
      uploading: 'ກຳລັງອັບໂຫຼດ...',
      success: 'ການອັບໂຫຼດສຳເລັດ',
      error: 'ການອັບໂຫຼດລົ້ມເຫຼວ',
      retry: 'ລອງອີກ',
      cancel: 'ຍົກເລີກການອັບໂຫຼດ',
      fileTypeError: 'ປະເພດໄຟລ໌ບໍ່ຮອງຮັບ',
      fileSizeError: 'ຂະໜາດໄຟລ໌ເກີນຂີດຈຳກັດ',
      fileCountError: 'ຈຳນວນໄຟລ໌ເກີນຂີດຈຳກັດ'
    },
    form: {
      validationFailed: 'ການກວດສອບລົ້ມເຫຼວ',
      required: 'ຈຳເປັນ',
      pleaseInput: 'ກະລຸນາປ້ອນ',
      pleaseSelect: 'ກະລຸນາເລືອກ'
    },
    button: {
      loading: 'ກຳລັງໂຫຼດ...'
    },
    input: {
      placeholder: 'ກະລຸນາປ້ອນ',
      clear: 'ລ້າງ',
      showPassword: 'ສະແດງລະຫັດຜ່ານ',
      hidePassword: 'ເຊື່ອງລະຫັດຜ່ານ',
      copy: 'ສຳເນົາ',
      copied: 'ສຳເນົາແລ້ວ'
    },
    inputnumber: {
      placeholder: 'ກະລຸນາປ້ອນເລກ',
      increase: 'ເພີ່ມ',
      decrease: 'ຫຼຸດ'
    },
    inputtag: {
      placeholder: 'ກະລຸນາປ້ອນ',
      add: 'ເພີ່ມ',
      remove: 'ລຶບ'
    },
    breadcrumb: {
      label: 'ເສັ້ນທາງນຳທາງ',
      more: 'ເພີ່ມເຕີມ'
    },
    backtop: {
      text: 'ກັບຂຶ້ນດ້ານເທິງ'
    },
    select: {
      placeholder: 'ກະລຸນາເລືອກ',
      noData: 'ບໍ່ມີຂໍ້ມູນ',
      loading: 'ກຳລັງໂຫຼດ...',
      noMatch: 'ບໍ່ມີຂໍ້ມູນທີ່ກົງກັນ',
      selectAll: 'ເລືອກທັງໝົດ',
      clearAll: 'ລ້າງທັງໝົດ'
    },
    pagination: {
      goto: 'ໄປທີ່',
      page: '',
      total: 'ລວມ {total}',
      pageSize: '/ໜ້າ',
      prev: 'ກ່ອນໜ້າ',
      next: 'ຖັດໄປ',
      first: 'ທຳອິດ',
      last: 'ສຸດທ້າຍ',
      pageClassifier: ''
    },
    popconfirm: {
      confirm: 'ຕົກລົງ',
      cancel: 'ຍົກເລີກ',
      dontAskAgain: 'ບໍ່ຖາມອີກ'
    },
    dialog: {
      confirm: 'ຕົກລົງ',
      cancel: 'ຍົກເລີກ',
      close: 'ປິດ',
      maximize: 'ຂະຫຍາຍເຕັມ',
      restore: 'ຟື້ນຟູ'
    },
    drawer: {
      close: 'ປິດ',
      confirm: 'ຕົກລົງ',
      cancel: 'ຍົກເລີກ'
    },
    dropdown: {
      loading: 'ກຳລັງໂຫຼດ...'
    },
    image: {
      error: 'ລົ້ມເຫຼວ',
      loading: 'ກຳລັງໂຫຼດ...',
      preview: 'ຕົວຢ່າງ',
      zoomIn: 'ຂະຫຍາຍ',
      zoomOut: 'ຫຍໍ້',
      rotateLeft: 'ຫມຸນຊ້າຍ',
      rotateRight: 'ຫມຸນຂວາ',
      originalSize: 'ຂະໜາດເດີມ',
      fullscreen: 'ໜ້າຈໍເຕັມ'
    },
    imageviewer: {
      close: 'ປິດ',
      prev: 'ກ່ອນໜ້າ',
      next: 'ຖັດໄປ',
      zoomIn: 'ຂະຫຍາຍ',
      zoomOut: 'ຫຍໍ້',
      rotateLeft: 'ຫມຸນຊ້າຍ',
      rotateRight: 'ຫມຸນຂວາ',
      reset: 'ຣີເຊັດ',
      fullscreen: 'ໜ້າຈໍເຕັມ',
      exitFullscreen: 'ອອກຈາກໜ້າຈໍເຕັມ'
    },
    infinitescroll: {
      loading: 'ກຳລັງໂຫຼດ...',
      finished: 'ບໍ່ມີຂໍ້ມູນເພີ່ມເຕີມ',
      error: 'ການໂຫຼດລົ້ມເຫຼວ, ກົດເພື່ອລອງອີກ',
      retry: 'ກົດເພື່ອລອງອີກ'
    },
    message: {
      close: 'ປິດ'
    },
    notification: {
      close: 'ປິດ'
    },
    loading: {
      text: 'ກຳລັງໂຫຼດ...'
    },
    spin: {
      text: 'ກຳລັງໂຫຼດ...'
    },
    rate: {
      texts: ['ເຮັດແບບບໍ່ດີເລີຍ', 'ຜິດຫວັງ', 'ປານກາງ', 'ພໍໃຈ', 'ແປກໃຈ']
    },
    alert: {
      close: 'ປິດ'
    },
    tag: {
      close: 'ປິດ'
    },
    tabs: {
      close: 'ປິດ',
      add: 'ເພີ່ມ',
      more: 'ເພີ່ມເຕີມ'
    },
    steps: {
      finish: 'ສຳເລັດ',
      process: 'ກຳລັງດຳເນີນການ',
      wait: 'ລໍຖ້າ',
      error: 'ຂໍ້ຜິດພາດ'
    },
    progress: {
      success: 'ສຳເລັດ',
      exception: 'ຂໍ້ຍົກເວັ້ນ',
      warning: 'ແຈ້ງເຕືອນ'
    },
    skeleton: {
      loading: 'ກຳລັງໂຫຼດ...'
    },
    empty: {
      description: 'ບໍ່ມີຂໍ້ມູນ',
      noData: 'ບໍ່ມີຂໍ້ມູນ',
      noResult: 'ບໍ່ມີຜົນລັບ',
      networkError: 'ຂໍ້ຜິດພາດເຄືອຂ່າຍ',
      serverError: 'ຂໍ້ຜິດພາດເຊີບເວີ'
    },
    result: {
      success: 'ສຳເລັດ',
      error: 'ຂໍ້ຜິດພາດ',
      warning: 'ແຈ້ງເຕືອນ',
      info: 'ຂໍ້ມູນ',
      backHome: 'ກັບໄປໜ້າຫຼັກ'
    },
    waterfall: {
      loading: 'ກຳລັງໂຫຼດ...',
      noMore: 'ບໍ່ມີຂໍ້ມູນເພີ່ມເຕີມ',
      empty: 'ບໍ່ມີຂໍ້ມູນ'
    },
    descriptions: {
      colon: ':'
    },
    slider: {
      tipFormatter: '{value}'
    },
    switch: {
      on: 'ເປີດ',
      off: 'ປິດ'
    },
    checkbox: {
      selectAll: 'ເລືອກທັງໝົດ'
    },
    radio: {},
    menu: {
      collapse: 'ຫຍໍ້ເມນູ',
      expand: 'ຂະຫຍາຍເມນູ'
    },
    card: {
      collapse: 'ຫຍໍ້',
      expand: 'ຂະຫຍາຍ'
    },
    collapse: {
      expand: 'ຂະຫຍາຍ',
      collapse: 'ຫຍໍ້'
    },
    tooltip: {},
    popover: {},
    badge: {},
    avatar: {
      error: 'ການໂຫຼດລົ້ມເຫຼວ'
    },
    watermark: {},
    divider: {},
    carousel: {
      prev: 'ກ່ອນໜ້າ',
      next: 'ຖັດໄປ'
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
      placeholder: 'ກະລຸນາໃສ່',
      loading: 'ກໍາລັງໂຫຼດ...',
      noData: '�ໍ່ມີຂໍ້ມູນ'
    },
    skuselector: {
      placeholder: 'Select specifications',
      emptyText: 'No specifications',
      stock: 'Stock',
      price: 'Price',
      selected: 'Selected',
      outOfStock: 'Out of Stock'
    },
    productcard: {
      viewDetails: 'View Details',
      buyNow: 'Buy Now',
      addToCart: 'Add to Cart',
      sold: 'Sold',
      soldOut: 'Sold Out',
      vip: 'VIP'
    },
    price: {
      original: 'Original'
    },
    couponcard: {
      available: 'Claim Now',
      used: 'Used',
      expired: 'Expired',
      received: 'Received',
      limit: 'Orders over {threshold}',
      noThreshold: 'No threshold',
      validPeriod: 'Validity',
      ruleTitle: 'Usage Rules'
    },
    luckydraw: {
      start: 'Start',
      drawing: 'Drawing...',
      end: 'Winner!',
      retry: 'Retry'
    },
    filterbar: {
      all: 'All',
      sort: 'Sort',
      filter: 'Filter',
      cancel: 'Cancel',
      reset: 'Reset',
      confirm: 'Confirm',
      noOptions: 'No options',
      asc: 'Ascending',
      desc: 'Descending',
      selected: 'Selected'
    },
    submitbar: {
      total: 'Total: ',
      selected: '{count} selected',
      submit: 'Checkout',
      allSelect: 'Select All'
    },
    categorynav: {
      all: 'All',
      noData: 'No Data',
      loading: 'Loading...'
    },
    smartaddress: {
      placeholder: 'Paste address here, auto-detect name, phone, location',
      parse: 'Smart Parse',
      province: 'Province/City/District',
      city: 'City',
      district: 'District/County',
      street: 'Street/Town',
      detail: 'Detailed Address',
      phone: 'Phone',
      name: 'Recipient',
      parseSuccess: 'Address parsed successfully',
      parseFailed: 'Parse failed, please fill manually',
      required: 'Please fill complete address',
      provinceKeywords: ['Province', 'State'],
      cityKeywords: ['City', 'Prefecture'],
      districtKeywords: ['District', 'County', 'Township'],
      streetKeywords: ['Street', 'Road', 'Ave', 'Lane']
    },
    ganttchart: {
      taskName: 'Task Name',
      searchPlaceholder: 'Search tasks...',
      zoom: 'Zoom',
      day: 'Day',
      week: 'Week',
      month: 'Month',
      year: 'Year',
      milestone: 'Milestone'
    },
    imagemagnifier: {
      switchToImage: 'Switch to image {index}',
      galleryItem: 'Gallery {index}',
      close: 'Close'
    },
    ai: {
      bubble: {
        citations: 'ໝາຍ​ເຫດ'
      },
      mention: {
        placeholder: '@ ກ່າວ​ເຖິງ Agent, ເອ​ກະ​ສານ ຫຼື ຕາ​ຕະ​ລາງ...',
        agent: 'Agent',
        document: 'ເອ​ກະ​ສານ',
        table: 'ຕາ​ຕະ​ລາງ',
        knowledge: '​ເອ​ກະ​ພົບ',
        file: 'File'
      },
      codeBlock: {
        copyCode: '​ເຄ​າ​ະ​ລື​ໂ​ຄ້​ດ',
        copied: '​ເຄ​າ​ະ​ລື​ແ​ລ້​ວ!',
        run: '​ແ​ລ​່​ນ​ໂ​ຄ້​ດ',
        edit: '​ແ​ກ​້​ໄ​ຂ',
        save: '​​ເກ​ັ​ບ​ຮ​ັ​ກ​ສາ',
        cancel: '​​​ເລ​ີ​ກ'
      },
      codeRunner: {
        run: '​ແ​ລ​່​ນ',
        stop: '​ຢ​ຸ​ດ',
        clear: '​ເອົາ​ເ',
        reset: '​​​ຕ​ັ​້​ງ​ໃ​ໝ່',
        placeholder: '​ກ​ົດ Run ເ​ພື​່​ອ​ແ​ລ​່​ນ​ໂ​ຄ້​ດ...'
      },
      sender: {
        placeholder: '​​ສ​່ຽງ​ຂໍ​້​ຄ​ວາ​ມ...',
        dragTip: '​ป​ล่อย​เพื่อ​อัป​โหลด​ไฟล์',
        noCommands: 'No matching commands found'
      },
      thoughtChain: {
        thoughtProcess: '​ກ​ະ​ຣິ​ມ​ແ​ນ​່​ນ​ິ​',
        thinking: '​ກ​ໍາ​ລັ​ງ​ຄິ​ດ...',
        defaultTitle: '​ຂ​ັ້​ນ​ຕ​ອ​ນ​ໃ​ໝ່',
        addNode: '​ເພິ​່​ມ​​ຂ​ັ້​ນ​ຕ​ອ​ນ'
      },
      thinking: {
        start: '​ເ​ລ​ີ​່​ມ​​​ຄິ​ດ',
        thinking: '​ກ​ໍາ​ລັ​ງ​ຄິ​ດ...',
        complete: '​ຄິ​�​ແ​ລ້​ວ',
        error: '​ຄ​ວາ​ມ​​�​ິ​ດ​​ພ​າ​ດ​​ໃ​ນ​​ກ​າ​ນ​​ຄິ​ດ'
      },
      welcome: {
        title: '​ສ​ະ​ບາຍ​, ຂ​້​າ​​,YH AI',
        description:
          '​ຂ​້​າ​​ສ​�​ມ​າ​ດ​​ຊ​່​ວ​ຍ​​ເ​ຫ​ຼື​​ດ​​ເ​ຈ​ົ້​າ​​ໃ​ນ​​ກ​າ​ນ​​ເ​ຂ​ີ​​�​​ໂ​ຄ້​​, ແ​ປ​​ເ​ອ​​ກ​​ະ​​ສ​​າ​ນ ຫ​ຼື ​ຂ​ຽ​​�​​ເ​ລ​​ກ​​າ​​ໃ​ໝ່​.  ​​ມ​​ີ​​​​อ​​ะ​​ໄ​​ร​​?​'
      },
      action: {
        copy: '​ເ​ຄ​າ​ະ​​',
        regenerate: '​�​້​າ​​ງ​​ໃ​ໝ່',
        share: '​ແ​ບ​່​ງ​​',
        like: '​ມ​​່​າ​',
        dislike: '​ບ​ໍ​​່​​ມ​​່​າ',
        edit: '​ແ​ກ​້​​',
        delete: '​�​ຶ​'
      },
      artifacts: {
        preview: '​ເ​ບ​່​ອ​​',
        inline: '​ໃ​ນ​​',
        code: '​source',
        versions: '​',
        rendering: '​ກ​ໍ​າ​ລັ​ງ​​',
        renderingChart: '​',
        renderingCanvas: '​',
        chartLoadError: 'Chart loading failed'
      },
      voice: {
        trigger: '​',
        listening: '​'
      },
      agent: {
        uses: '​',
        use: '​',
        favorite: '​',
        unfavorite: '​',
        share: '​',
        online: '​',
        offline: '​',
        busy: '​',
        verified: '​',
        rating: '​',
        reviews: '​',
        responseTime: '​',
        ms: '​'
      },
      sources: {
        references: '​',
        referencedSources: '​',
        relevant: '​',
        viewOriginal: '​',
        showAll: '​',
        more: '​',
        drawerTitle: '​',
        expandMore: '​',
        collapseMore: '​',
        noSources: '​',
        today: '​',
        last7Days: '7  ',
        last30Days: '30  ',
        earlier: '​',
        pinned: '​'
      },
      conversations: {
        today: '​',
        last7Days: '7  ',
        last30Days: '30  ',
        earlier: '​',
        pinned: '​',
        pin: '​',
        unpin: '​',
        newConversation: '​',
        noData: 'No conversations yet',
        rename: '​',
        delete: '​',
        deleteConfirm: '?'
      },
      attachments: {
        dropTip: 'Drop files here to upload',
        clickToUpload: 'Click or drag files to upload',
        uploadSuccess: 'Upload success',
        uploadError: 'Upload failed',
        deleteConfirm: 'Are you sure to delete this file?',
        fileTooLarge: 'File size cannot exceed {size}',
        invalidFileType: 'Invalid file type'
      },
      mermaid: {
        image: 'Image',
        code: 'Code',
        zoomIn: 'Zoom In',
        zoomOut: 'Zoom Out',
        reset: 'Reset',
        download: 'Download',
        copyCode: 'Copy Code',
        rendering: 'Rendering...',
        renderError: 'Render failed',
        renderSuccess: 'Render success',
        retry: 'Retry'
      }
    }
  }
}

export default lo
