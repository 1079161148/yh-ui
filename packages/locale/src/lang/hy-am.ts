import type { Language } from '../index'

export const hyAm: Language = {
  name: 'hy-am',
  yh: {
    // Ընդհանուր
    common: {
      yes: 'Այո',
      no: 'Ոչ',
      confirm: 'Հաստատել',
      cancel: 'Չեղարկել',
      loading: 'Բեռնվում է',
      close: 'Փակել',
      clear: 'Մաքրել',
      reset: 'Վերակայել',
      save: 'Պահպանել',
      delete: 'Ջնջել',
      edit: 'Խմբագրել',
      add: 'Ավելացնել',
      search: 'Որոնել',
      refresh: 'Թարմացնել',
      expand: 'Ընդլայնել',
      collapse: 'Կրճատել',
      more: 'Ավելին',
      noData: 'Տվյալներ չկան',
      noMatch: 'Համապատասխանություն չկա',
      selectAll: 'Ընտրել բոլորը',
      unselectAll: 'Չեղարկել ընտրությունը'
    },
    // Գունային ընտրիչ
    colorpicker: {
      confirm: 'Լավ',
      clear: 'Մաքրել',
      eyeDropper: 'Աչքի կաթիլաչափ',
      suggestionDark: 'Սպիտակ տեքստը ավելի լավ է',
      suggestionLight: 'Սև տեքստը ավելի լավ է',
      recentColors: 'Վերջին գույներ',
      presetColors: 'Նախապես սահմանված գույներ'
    },
    // Ամսաթվի ընտրիչ
    datepicker: {
      now: 'Հիմա',
      today: 'Այսօր',
      cancel: 'Չեղարկել',
      clear: 'Մաքրել',
      confirm: 'Լավ',
      selectDate: 'Ընտրել ամսաթիվ',
      selectTime: 'Ընտրել ժամանակ',
      startDate: 'Սկզբի ամսաթիվ',
      startTime: 'Սկզբի ժամանակ',
      endDate: 'Ավարտի ամսաթիվ',
      endTime: 'Ավարտի ժամանակ',
      year: '',
      month: '',
      day: '',
      week: 'Շաբաթ',
      monthBeforeYear: true,
      prevYear: 'Նախորդ տարի',
      nextYear: 'Հաջորդ տարի',
      prevMonth: 'Նախորդ ամիս',
      nextMonth: 'Հաջորդ ամիս',
      weeks: {
        sun: 'Կիր',
        mon: 'Երկ',
        tue: 'Երե',
        wed: 'Չոր',
        thu: 'Հին',
        fri: 'Ուրբ',
        sat: 'Շաբ'
      },
      months: {
        jan: 'Հուն',
        feb: 'Փետ',
        mar: 'Մար',
        apr: 'Ապր',
        may: 'Մայ',
        jun: 'Հուն',
        jul: 'Հուլ',
        aug: 'Օգոս',
        sep: 'Սեպ',
        oct: 'Հոկ',
        nov: 'Նոյ',
        dec: 'Դեկ'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Ժամանակի ընտրիչ
    timepicker: {
      confirm: 'Լավ',
      cancel: 'Չեղարկել',
      now: 'Հիմա',
      placeholder: 'Ընտրել ժամանակ',
      startPlaceholder: 'Սկզբի ժամանակ',
      endPlaceholder: 'Ավարտի ժամանակ',
      selectTime: 'Ընտրել ժամանակ'
    },
    // Ժամանակի ընտրություն
    timeselect: {
      placeholder: 'Ընտրել ժամանակ'
    },
    // Ծառ
    tree: {
      emptyText: 'Տվյալներ չկան',
      loading: 'Բեռնվում է...',
      checkAll: 'Ընտրել բոլորը',
      uncheckAll: 'Չեղարկել ընտրությունը',
      expandAll: 'Ընդլայնել բոլորը',
      collapseAll: 'Կրճատել բոլորը'
    },
    // Ծառի ընտրություն
    treeselect: {
      placeholder: 'Ընտրել',
      emptyText: 'Տվյալներ չկան',
      loading: 'Բեռնվում է...',
      noMatch: 'Համապատասխանություն չկա'
    },
    // Օրացույց
    calendar: {
      prevMonth: 'Նախորդ ամիս',
      nextMonth: 'Հաջորդ ամիս',
      prevYear: 'Նախորդ տարի',
      nextYear: 'Հաջորդ տարի',
      today: 'Այսօր',
      week: 'Շաբաթ',
      holiday: 'Արձակուրդ',
      workday: 'Աշխատանք',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Կիր',
        mon: 'Երկ',
        tue: 'Երե',
        wed: 'Չոր',
        thu: 'Հին',
        fri: 'Ուրբ',
        sat: 'Շաբ'
      }
    },
    // Ինքնակատարում
    autocomplete: {
      loading: 'Բեռնվում է...',
      placeholder: 'Խնդրում ենք մուտքագրել',
      noData: 'Տվյալներ չկան',
      noMatch: 'Համապատասխանություն չկա'
    },
    // Հետհաշվարկ
    countdown: {
      days: 'օր',
      hours: 'ժամ',
      minutes: 'րոպե',
      seconds: 'վայրկյան',
      milliseconds: 'միլիվայրկյան',
      finished: 'Ավարտված'
    },
    // Կասկադային ընտրիչ
    cascader: {
      noMatch: 'Համապատասխանություն չկա',
      placeholder: 'Ընտրել',
      loading: 'Բեռնվում է...',
      noData: 'Տվյալներ չկան'
    },
    // Փոխանցում
    transfer: {
      noMatch: 'Համապատասխանություն չկա',
      noData: 'Տվյալներ չկան',
      titles: ['Ցուցակ 1', 'Ցուցակ 2'],
      filterPlaceholder: 'Մուտքագրել բանալի բառ',
      noCheckedFormat: '{total} տարր',
      hasCheckedFormat: '{checked}/{total} ընտրված',
      searchPlaceholder: 'Մուտքագրել բանալի բառ'
    },
    // Աղյուսակ
    table: {
      emptyText: 'Տվյալներ չկան',
      confirmFilter: 'Հաստատել',
      resetFilter: 'Վերակայել',
      clearFilter: 'Բոլորը',
      sumText: 'Գումար',
      loading: 'Բեռնվում է...',
      index: 'Ինդեքս',
      print: 'Տպել',
      cancel: 'Չեղարկել',
      preview: 'Տպման նախադիտում',
      printTime: 'Տպման ժամանակ',
      total: 'Ընդամենը {total} տարր',
      page: 'Էջ {page}',
      yes: 'Այո',
      no: 'Ոչ',
      // Գործիքագոտի
      toolbar: {
        refresh: 'Թարմացնել',
        density: 'Խտություն',
        densityDefault: 'Լռելյայն',
        densityLarge: 'Մեծ',
        densitySmall: 'Փոքր',
        columnSetting: 'Սյունակի կարգավորումներ',
        fullscreen: 'Ամբողջ էկրան',
        exitFullscreen: 'Ելք ամբողջ էկրանից',
        export: 'Արտահանել',
        import: 'Ներմուծել',
        search: 'Որոնել',
        searchPlaceholder: 'Մուտքագրել բանալի բառեր որոնման համար'
      },
      // Զտիչ
      filter: {
        selectAll: 'Ընտրել բոլորը',
        selectInvert: 'Հակադարձել ընտրությունը',
        empty: 'Դատարկ է',
        notEmpty: 'Դատարկ չէ',
        contains: 'Պարունակում է',
        notContains: 'Չի պարունակում',
        equals: 'Հավասար է',
        notEquals: 'Հավասար չէ',
        startsWith: 'Սկսվում է',
        endsWith: 'Ավարտվում է',
        greaterThan: 'Մեծ է',
        lessThan: 'Փոքր է',
        between: 'Միջև'
      },
      // Դասավորություն
      sort: {
        asc: 'Աճող',
        desc: 'Նվազող',
        clear: 'Մաքրել դասավորությունը'
      },
      // Արտահանում
      export: {
        title: 'Արտահանել տվյալներ',
        filename: 'Ֆայլի անուն',
        type: 'Ֆայլի տեսակ',
        scope: 'Արտահանման շրջանակ',
        scopeAll: 'Բոլոր տվյալները',
        scopeSelected: 'Ընտրված տվյալները',
        scopeCurrentPage: 'Ընթացիկ էջ',
        includeHeader: 'Ներառել վերնագիրը',
        exporting: 'Արտահանվում է...',
        success: 'Արտահանումը հաջողվեց',
        error: 'Արտահանումը ձախողվեց'
      },
      // Ներմուծում
      import: {
        title: 'Ներմուծել տվյալներ',
        selectFile: 'Ընտրել ֆայլ',
        dragTip: 'Կտտացրեք կամ քաշեք ֆայլը այստեղ բեռնելու համար',
        importing: 'Ներմուծվում է...',
        success: 'Ներմուծումը հաջողվեց',
        error: 'Ներմուծումը ձախողվեց',
        preview: 'Տվյալների նախադիտում',
        confirm: 'Հաստատել ներմուծումը'
      },
      // Տպում
      printConfig: {
        title: 'Տպման կարգավորումներ',
        pageTitle: 'Էջի վերնագիր',
        pageHeader: 'Վերնագիր',
        pageFooter: 'Ներքևի գրություն',
        printAll: 'Տպել բոլորը',
        printSelected: 'Տպել ընտրվածը',
        printCurrentPage: 'Տպել ընթացիկ էջը',
        landscape: 'Հորիզոնական',
        portrait: 'Ուղղահայաց',
        printing: 'Տպվում է...'
      },
      // Սյունակի կարգավորումներ
      columnSetting: {
        title: 'Սյունակի կարգավորումներ',
        showAll: 'Ցույց տալ բոլորը',
        hideAll: 'Թաքցնել բոլորը',
        reset: 'Վերակայել',
        fixedLeft: 'Ամրացնել ձախ',
        fixedRight: 'Ամրացնել աջ',
        unfixed: 'Հանել ամրացումը'
      },
      // Համատեքստային մենյու
      contextMenu: {
        copy: 'Պատճենել',
        copyRow: 'Պատճենել տող',
        copyCell: 'Պատճենել բջիջ',
        paste: 'Տեղադրել',
        insertRowAbove: 'Տեղադրել տող վերևում',
        insertRowBelow: 'Տեղադրել տող ներքևում',
        deleteRow: 'Ջնջել տող',
        deleteSelectedRows: 'Ջնջել ընտրված տողերը',
        exportSelected: 'Արտահանել ընտրվածը'
      },
      // Ընտրություն
      selection: {
        selectAll: 'Ընտրել բոլորը',
        selectInvert: 'Հակադարձել ընտրությունը',
        selectNone: 'Մաքրել ընտրությունը',
        selected: '{count} տարր ընտրված'
      },
      // Ընդլայնում
      expand: {
        expandAll: 'Ընդլայնել բոլորը',
        collapseAll: 'Կրճատել բոլորը'
      },
      // Ծառ
      tree: {
        expandAll: 'Ընդլայնել բոլորը',
        collapseAll: 'Կրճատել բոլորը',
        expandLevel: 'Ընդլայնել մինչև {level} մակարդակ'
      },
      // Քաշել
      drag: {
        dragTip: 'Քաշեք վերադասավորելու համար',
        dropTip: 'Թողեք տեղադրելու համար'
      }
    },
    // Հաղորդագրության պատուհան
    messagebox: {
      title: 'Հաղորդագրություն',
      confirm: 'Լավ',
      cancel: 'Չեղարկել',
      close: 'Փակել',
      error: 'Անվավեր մուտքագրում',
      alert: 'Նախազգուշացում',
      prompt: 'Հուշում',
      inputPlaceholder: 'Խնդրում ենք մուտքագրել'
    },
    // Բեռնում
    upload: {
      deleteTip: 'սեղմեք delete ջնջելու համար',
      delete: 'Ջնջել',
      preview: 'Նախադիտում',
      continue: 'Շարունակել',
      upload: 'Կտտացրեք բեռնելու համար',
      tip: 'Կտտացրեք կամ քաշեք ֆայլը այս տարածք <em>բեռնելու</em> համար',
      dragTip: 'Թողեք ֆայլը այստեղ կամ կտտացրեք բեռնելու համար',
      uploading: 'Բեռնվում է...',
      success: 'Բեռնումը հաջողվեց',
      error: 'Բեռնումը ձախողվեց',
      retry: 'Կրկին փորձել',
      cancel: 'Չեղարկել բեռնումը',
      fileTypeError: 'Ֆայլի տեսակը չի աջակցվում',
      fileSizeError: 'Ֆայլի չափը գերազանցում է սահմանը',
      fileCountError: 'Ֆայլերի քանակը գերազանցում է սահմանը'
    },
    // Ձևաթուղթ
    form: {
      validationFailed: 'Վավերացումը ձախողվեց',
      required: 'Պարտադիր',
      pleaseInput: 'Խնդրում ենք մուտքագրել',
      pleaseSelect: 'Խնդրում ենք ընտրել'
    },
    // Կոճակ
    button: {
      loading: 'Բեռնվում է...'
    },
    // Մուտքագրում
    input: {
      placeholder: 'Խնդրում ենք մուտքագրել',
      clear: 'Մաքրել',
      showPassword: 'Ցույց տալ գաղտնաբառը',
      hidePassword: 'Թաքցնել գաղտնաբառը',
      copy: 'Պատճենել',
      copied: 'Պատճենված'
    },
    // Թվային մուտքագրում
    inputnumber: {
      placeholder: 'Խնդրում ենք մուտքագրել թիվ',
      increase: 'Ավելացնել',
      decrease: 'Նվազեցնել'
    },
    // Նշանի մուտքագրում
    inputtag: {
      placeholder: 'Խնդրում ենք մուտքագրել',
      add: 'Ավելացնել',
      remove: 'Հեռացնել'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Նավարկություն',
      more: 'Ավելին'
    },
    // Վերադառնալ վերև
    backtop: {
      text: 'Վերադառնալ վերև'
    },
    // Ընտրիչ
    select: {
      placeholder: 'Խնդրում ենք ընտրել',
      noData: 'Տվյալներ չկան',
      loading: 'Բեռնվում է...',
      noMatch: 'Համապատասխանություն չկա',
      selectAll: 'Ընտրել բոլորը',
      clearAll: 'Մաքրել բոլորը'
    },
    // Էջավորում
    pagination: {
      goto: 'Գնալ',
      page: '',
      total: 'Ընդամենը {total}',
      pageSize: '/էջ',
      prev: 'Նախորդ',
      next: 'Հաջորդ',
      first: 'Առաջին',
      last: 'Վերջին',
      pageClassifier: ''
    },
    // Պոպ-հաստատում
    popconfirm: {
      confirm: 'Լավ',
      cancel: 'Չեղարկել',
      dontAskAgain: 'Մի հարցրեք կրկին'
    },
    // Երկխոսություն
    dialog: {
      confirm: 'Լավ',
      cancel: 'Չեղարկել',
      close: 'Փակել',
      maximize: 'Մեծացնել',
      restore: 'Վերականգնել'
    },
    // Ծալք
    drawer: {
      close: 'Փակել',
      confirm: 'Լավ',
      cancel: 'Չեղարկել'
    },
    // Բացվող ցուցակ
    dropdown: {
      loading: 'Բեռնվում է...'
    },
    // Պատկեր
    image: {
      error: 'ՁԱԽՈՂՎԵՑ',
      loading: 'Բեռնվում է...',
      preview: 'Նախադիտում',
      zoomIn: 'Խոշորացնել',
      zoomOut: 'Փոքրացնել',
      rotateLeft: 'Պտտել ձախ',
      rotateRight: 'Պտտել աջ',
      originalSize: 'Բնօրինակ չափ',
      fullscreen: 'Ամբողջ էկրան'
    },
    // Պատկերի դիտիչ
    imageviewer: {
      close: 'Փակել',
      prev: 'Նախորդ',
      next: 'Հաջորդ',
      zoomIn: 'Խոշորացնել',
      zoomOut: 'Փոքրացնել',
      rotateLeft: 'Պտտել ձախ',
      rotateRight: 'Պտտել աջ',
      reset: 'Վերակայել',
      fullscreen: 'Ամբողջ էկրան',
      exitFullscreen: 'Ելք ամբողջ էկրանից'
    },
    // Անվերջ ոլորում
    infinitescroll: {
      loading: 'Բեռնվում է...',
      finished: 'Ավելի տվյալներ չկան',
      error: 'Բեռնումը ձախողվեց, կտտացրեք կրկին փորձելու համար',
      retry: 'Կտտացրեք կրկին փորձելու համար'
    },
    // Հաղորդագրություն
    message: {
      close: 'Փակել'
    },
    // Ծանուցում
    notification: {
      close: 'Փակել'
    },
    // Բեռնում
    loading: {
      text: 'Բեռնվում է...'
    },
    // Պտույտ
    spin: {
      text: 'Բեռնվում է...'
    },
    // Վարկանիշ
    rate: {
      texts: ['Էքստրեմալ վատ', 'Հիասթափված', 'Արդար', 'Գոհ', 'Զարմացած']
    },
    // Նախազգուշացում
    alert: {
      close: 'Փակել'
    },
    // Նշան
    tag: {
      close: 'Փակել'
    },
    // Ներդիրներ
    tabs: {
      close: 'Փակել',
      add: 'Ավելացնել',
      more: 'Ավելին'
    },
    // Քայլեր
    steps: {
      finish: 'Ավարտված',
      process: 'Ընթացքի մեջ',
      wait: 'Սպասում',
      error: 'Սխալ'
    },
    // Առաջընթաց
    progress: {
      success: 'Հաջողություն',
      exception: 'Բացառություն',
      warning: 'Նախազգուշացում'
    },
    // Կմախք
    skeleton: {
      loading: 'Բեռնվում է...'
    },
    // Դատարկ
    empty: {
      description: 'Տվյալներ չկան',
      noData: 'Տվյալներ չկան',
      noResult: 'Արդյունքներ չկան',
      networkError: 'Ցանցի սխալ',
      serverError: 'Սերվերի սխալ'
    },
    // Արդյունք
    result: {
      success: 'Հաջողություն',
      error: 'Սխալ',
      warning: 'Նախազգուշացում',
      info: 'Տեղեկություն',
      backHome: 'Վերադառնալ գլխավոր'
    },
    // Ջրվեժ
    waterfall: {
      loading: 'Բեռնվում է...',
      noMore: 'Ավելի տվյալներ չկան',
      empty: 'Տվյալներ չկան'
    },
    // Նկարագրություններ
    descriptions: {
      colon: ':'
    },
    // Սահիչ
    slider: {
      tipFormatter: '{value}'
    },
    // Անջատիչ
    switch: {
      on: 'ՄԻԱՑՎԱԾ',
      off: 'ԱՆՋԱՏՎԱԾ'
    },
    // Նշանավանդակ
    checkbox: {
      selectAll: 'Ընտրել բոլորը'
    },
    // Ռադիո
    radio: {},
    // Մենյու
    menu: {
      collapse: 'Կրճատել մենյուն',
      expand: 'Ընդլայնել մենյուն'
    },
    // Քարտ
    card: {
      collapse: 'Կրճատել',
      expand: 'Ընդլայնել'
    },
    // Կրճատում
    collapse: {
      expand: 'Ընդլայնել',
      collapse: 'Կրճատել'
    },
    // Հուշում
    tooltip: {},
    // Պոպ-օվեր
    popover: {},
    // Նշան
    badge: {},
    // Ավատար
    avatar: {
      error: 'Բեռնումը ձախողվեց'
    },
    // Ջրային նշան
    watermark: {},
    // Բաժանիչ
    divider: {},
    // Կարուսել
    carousel: {
      prev: 'Նախորդ',
      next: 'Հաջորդ'
    },
    // Մարկի
    marquee: {},
    // Աֆիքս
    affix: {},
    // Անկյուն
    anchor: {}
  }
}

export default hyAm
