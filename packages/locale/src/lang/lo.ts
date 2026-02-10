import type { Language } from '../index'

export const lo: Language = {
  name: 'lo',
  yh: {
    // ທົ່ວໄປ
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
    // ຕົວເລືອກສີ
    colorpicker: {
      confirm: 'ຕົກລົງ',
      clear: 'ລ້າງ',
      eyeDropper: 'ຕົວຈັບສີ',
      suggestionDark: 'ຂໍ້ຄວາມສີຂາວແມ່ນດີທີ່ສຸດ',
      suggestionLight: 'ຂໍ້ຄວາມສີດຳແມ່ນດີທີ່ສຸດ',
      recentColors: 'ສີຫຼ້າສຸດ',
      presetColors: 'ສີທີ່ກຳນົດໄວ້ລ່ວງໜ້າ'
    },
    // ຕົວເລືອກວັນທີ
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
    // ຕົວເລືອກເວລາ
    timepicker: {
      confirm: 'ຕົກລົງ',
      cancel: 'ຍົກເລີກ',
      now: 'ດຽວນີ້',
      placeholder: 'ເລືອກເວລາ',
      startPlaceholder: 'ເວລາເລີ່ມຕົ້ນ',
      endPlaceholder: 'ເວລາສິ້ນສຸດ',
      selectTime: 'ເລືອກເວລາ'
    },
    // ການເລືອກເວລາ
    timeselect: {
      placeholder: 'ເລືອກເວລາ'
    },
    // ເຄື່ອງປ່ອຍ
    tree: {
      emptyText: 'ບໍ່ມີຂໍ້ມູນ',
      loading: 'ກຳລັງໂຫຼດ...',
      checkAll: 'ເລືອກທັງໝົດ',
      uncheckAll: 'ຍົກເລີກການເລືອກ',
      expandAll: 'ຂະຫຍາຍທັງໝົດ',
      collapseAll: 'ຫຍໍ້ທັງໝົດ'
    },
    // ການເລືອກເຄື່ອງປ່ອຍ
    treeselect: {
      placeholder: 'ເລືອກ',
      emptyText: 'ບໍ່ມີຂໍ້ມູນ',
      loading: 'ກຳລັງໂຫຼດ...',
      noMatch: 'ບໍ່ມີຂໍ້ມູນທີ່ກົງກັນ'
    },
    // ປະຕິທິນ
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
    // ການຕື່ມອັດຕະໂນມັດ
    autocomplete: {
      loading: 'ກຳລັງໂຫຼດ...',
      placeholder: 'ກະລຸນາປ້ອນ',
      noData: 'ບໍ່ມີຂໍ້ມູນ',
      noMatch: 'ບໍ່ມີຂໍ້ມູນທີ່ກົງກັນ'
    },
    // ນັບຖອຍຫຼັງ
    countdown: {
      days: 'ມື້',
      hours: 'ຊົ່ວໂມງ',
      minutes: 'ນາທີ',
      seconds: 'ວິນາທີ',
      milliseconds: 'ມິລິວິນາທີ',
      finished: 'ສຳເລັດ'
    },
    // ການສະແດງລຳດັບ
    cascader: {
      noMatch: 'ບໍ່ມີຂໍ້ມູນທີ່ກົງກັນ',
      placeholder: 'ເລືອກ',
      loading: 'ກຳລັງໂຫຼດ...',
      noData: 'ບໍ່ມີຂໍ້ມູນ'
    },
    // ການໂອນຍ້າຍ
    transfer: {
      noMatch: 'ບໍ່ມີຂໍ້ມູນທີ່ກົງກັນ',
      noData: 'ບໍ່ມີຂໍ້ມູນ',
      titles: ['ລາຍການ 1', 'ລາຍການ 2'],
      filterPlaceholder: 'ປ້ອນຄຳສຳຄັນ',
      noCheckedFormat: '{total} ລາຍການ',
      hasCheckedFormat: '{checked}/{total} ເລືອກ',
      searchPlaceholder: 'ປ້ອນຄຳສຳຄັນ'
    },
    // ຕາຕະລາງ
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
      // ແຖບເຄື່ອງມື
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
      // ຕົວກອງ
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
      // ການຈັດລຽງ
      sort: {
        asc: 'ເພີ່ມຂຶ້ນ',
        desc: 'ຫຼຸດລົງ',
        clear: 'ລ້າງການຈັດລຽງ'
      },
      // ການສົ່ງອອກ
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
      // ການນຳເຂົ້າ
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
      // ການພິມ
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
      // ການຕັ້ງຄ່າຖັນ
      columnSetting: {
        title: 'ການຕັ້ງຄ່າຖັນ',
        showAll: 'ສະແດງທັງໝົດ',
        hideAll: 'ເຊື່ອງທັງໝົດ',
        reset: 'ຣີເຊັດ',
        fixedLeft: 'ຕິດຊ້າຍ',
        fixedRight: 'ຕິດຂວາ',
        unfixed: 'ຍົກເລີກການຕິດ'
      },
      // ເມນູບໍລິບົດ
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
      // ການເລືອກ
      selection: {
        selectAll: 'ເລືອກທັງໝົດ',
        selectInvert: 'ກັບການເລືອກ',
        selectNone: 'ລ້າງການເລືອກ',
        selected: '{count} ລາຍການທີ່ເລືອກ'
      },
      // ການຂະຫຍາຍ
      expand: {
        expandAll: 'ຂະຫຍາຍທັງໝົດ',
        collapseAll: 'ຫຍໍ້ທັງໝົດ'
      },
      // ເຄື່ອງປ່ອຍ
      tree: {
        expandAll: 'ຂະຫຍາຍທັງໝົດ',
        collapseAll: 'ຫຍໍ້ທັງໝົດ',
        expandLevel: 'ຂະຫຍາຍເຖິງລະດັບ {level}'
      },
      // ການລາກ
      drag: {
        dragTip: 'ລາກເພື່ອຈັດລຽງໃໝ່',
        dropTip: 'ປ່ອຍເພື່ອວາງ'
      }
    },
    // ກ່ອງຂໍ້ຄວາມ
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
    // ການອັບໂຫຼດ
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
    // ແບບຟອມ
    form: {
      validationFailed: 'ການກວດສອບລົ້ມເຫຼວ',
      required: 'ຈຳເປັນ',
      pleaseInput: 'ກະລຸນາປ້ອນ',
      pleaseSelect: 'ກະລຸນາເລືອກ'
    },
    // ປຸ່ມ
    button: {
      loading: 'ກຳລັງໂຫຼດ...'
    },
    // ການປ້ອນຂໍ້ມູນ
    input: {
      placeholder: 'ກະລຸນາປ້ອນ',
      clear: 'ລ້າງ',
      showPassword: 'ສະແດງລະຫັດຜ່ານ',
      hidePassword: 'ເຊື່ອງລະຫັດຜ່ານ',
      copy: 'ສຳເນົາ',
      copied: 'ສຳເນົາແລ້ວ'
    },
    // ການປ້ອນເລກ
    inputnumber: {
      placeholder: 'ກະລຸນາປ້ອນເລກ',
      increase: 'ເພີ່ມ',
      decrease: 'ຫຼຸດ'
    },
    // ການປ້ອນແທັກ
    inputtag: {
      placeholder: 'ກະລຸນາປ້ອນ',
      add: 'ເພີ່ມ',
      remove: 'ລຶບ'
    },
    // ເສັ້ນທາງນຳທາງ
    breadcrumb: {
      label: 'ເສັ້ນທາງນຳທາງ',
      more: 'ເພີ່ມເຕີມ'
    },
    // ກັບຂຶ້ນດ້ານເທິງ
    backtop: {
      text: 'ກັບຂຶ້ນດ້ານເທິງ'
    },
    // ການເລືອກ
    select: {
      placeholder: 'ກະລຸນາເລືອກ',
      noData: 'ບໍ່ມີຂໍ້ມູນ',
      loading: 'ກຳລັງໂຫຼດ...',
      noMatch: 'ບໍ່ມີຂໍ້ມູນທີ່ກົງກັນ',
      selectAll: 'ເລືອກທັງໝົດ',
      clearAll: 'ລ້າງທັງໝົດ'
    },
    // ການແບ່ງໜ້າ
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
    // ການຢືນຢັນປັອບອັບ
    popconfirm: {
      confirm: 'ຕົກລົງ',
      cancel: 'ຍົກເລີກ',
      dontAskAgain: 'ບໍ່ຖາມອີກ'
    },
    // ກ່ອງຂໍ້ຄວາມ
    dialog: {
      confirm: 'ຕົກລົງ',
      cancel: 'ຍົກເລີກ',
      close: 'ປິດ',
      maximize: 'ຂະຫຍາຍເຕັມ',
      restore: 'ຟື້ນຟູ'
    },
    // ລິ້ງແບບລາກ
    drawer: {
      close: 'ປິດ',
      confirm: 'ຕົກລົງ',
      cancel: 'ຍົກເລີກ'
    },
    // ເມນູລົງ
    dropdown: {
      loading: 'ກຳລັງໂຫຼດ...'
    },
    // ຮູບພາບ
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
    // ຕົວເບິ່ງຮູບພາບ
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
    // ການເລື່ອນບໍ່ຈຳກັດ
    infinitescroll: {
      loading: 'ກຳລັງໂຫຼດ...',
      finished: 'ບໍ່ມີຂໍ້ມູນເພີ່ມເຕີມ',
      error: 'ການໂຫຼດລົ້ມເຫຼວ, ກົດເພື່ອລອງອີກ',
      retry: 'ກົດເພື່ອລອງອີກ'
    },
    // ຂໍ້ຄວາມ
    message: {
      close: 'ປິດ'
    },
    // ການແຈ້ງເຕືອນ
    notification: {
      close: 'ປິດ'
    },
    // ການໂຫຼດ
    loading: {
      text: 'ກຳລັງໂຫຼດ...'
    },
    // ການຫມຸນ
    spin: {
      text: 'ກຳລັງໂຫຼດ...'
    },
    // ການຈັດອັດຕາ
    rate: {
      texts: ['ເຮັດແບບບໍ່ດີເລີຍ', 'ຜິດຫວັງ', 'ປານກາງ', 'ພໍໃຈ', 'ແປກໃຈ']
    },
    // ແຈ້ງເຕືອນ
    alert: {
      close: 'ປິດ'
    },
    // ແທັກ
    tag: {
      close: 'ປິດ'
    },
    // ແຖບ
    tabs: {
      close: 'ປິດ',
      add: 'ເພີ່ມ',
      more: 'ເພີ່ມເຕີມ'
    },
    // ຂັ້ນຕອນ
    steps: {
      finish: 'ສຳເລັດ',
      process: 'ກຳລັງດຳເນີນການ',
      wait: 'ລໍຖ້າ',
      error: 'ຂໍ້ຜິດພາດ'
    },
    // ຄວາມຄືບໜ້າ
    progress: {
      success: 'ສຳເລັດ',
      exception: 'ຂໍ້ຍົກເວັ້ນ',
      warning: 'ແຈ້ງເຕືອນ'
    },
    // ໂຄງກະດູກ
    skeleton: {
      loading: 'ກຳລັງໂຫຼດ...'
    },
    // ເປົ່າ
    empty: {
      description: 'ບໍ່ມີຂໍ້ມູນ',
      noData: 'ບໍ່ມີຂໍ້ມູນ',
      noResult: 'ບໍ່ມີຜົນລັບ',
      networkError: 'ຂໍ້ຜິດພາດເຄືອຂ່າຍ',
      serverError: 'ຂໍ້ຜິດພາດເຊີບເວີ'
    },
    // ຜົນລັບ
    result: {
      success: 'ສຳເລັດ',
      error: 'ຂໍ້ຜິດພາດ',
      warning: 'ແຈ້ງເຕືອນ',
      info: 'ຂໍ້ມູນ',
      backHome: 'ກັບໄປໜ້າຫຼັກ'
    },
    // ນ້ຳຕົກ
    waterfall: {
      loading: 'ກຳລັງໂຫຼດ...',
      noMore: 'ບໍ່ມີຂໍ້ມູນເພີ່ມເຕີມ',
      empty: 'ບໍ່ມີຂໍ້ມູນ'
    },
    // ລາຍລະອຽດ
    descriptions: {
      colon: ':'
    },
    // ສະລາຍເດີ
    slider: {
      tipFormatter: '{value}'
    },
    // ສະວິດ
    switch: {
      on: 'ເປີດ',
      off: 'ປິດ'
    },
    // ກ່ອງເລືອກ
    checkbox: {
      selectAll: 'ເລືອກທັງໝົດ'
    },
    // ວິທີການ
    radio: {},
    // ເມນູ
    menu: {
      collapse: 'ຫຍໍ້ເມນູ',
      expand: 'ຂະຫຍາຍເມນູ'
    },
    // ບັດ
    card: {
      collapse: 'ຫຍໍ້',
      expand: 'ຂະຫຍາຍ'
    },
    // ການຫຍໍ້
    collapse: {
      expand: 'ຂະຫຍາຍ',
      collapse: 'ຫຍໍ້'
    },
    // ຄຳແນະນຳ
    tooltip: {},
    // ປັອບອັບ
    popover: {},
    // ແບດຈ໌
    badge: {},
    // ຮູບພາບຕົວແທນ
    avatar: {
      error: 'ການໂຫຼດລົ້ມເຫຼວ'
    },
    // ລາຍນ້ຳ
    watermark: {},
    // ຕົວແບ່ງ
    divider: {},
    // ການສະແດງສະລອຍ
    carousel: {
      prev: 'ກ່ອນໜ້າ',
      next: 'ຖັດໄປ'
    },
    // ການເລື່ອນ
    marquee: {},
    // ການຕິດຕາມ
    affix: {},
    // ສາຍຈອກ
    anchor: {}
  }
}

export default lo
