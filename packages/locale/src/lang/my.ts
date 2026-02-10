import type { Language } from '../index'

export const my: Language = {
  name: 'my',
  yh: {
    // အထွေထွေ
    common: {
      yes: 'ဟုတ်ကဲ့',
      no: 'မဟုတ်ပါ',
      confirm: 'အတည်ပြုပါ',
      cancel: 'ပယ်ဖျက်ပါ',
      loading: 'ဖွင့်နေသည်',
      close: 'ပိတ်ပါ',
      clear: 'ရှင်းလင်းပါ',
      reset: 'ပြန်လည်သတ်မှတ်ပါ',
      save: 'သိမ်းဆည်းပါ',
      delete: 'ဖျက်ပါ',
      edit: 'တည်းဖြတ်ပါ',
      add: 'ထည့်ပါ',
      search: 'ရှာဖွေပါ',
      refresh: 'ပြန်လည်စတင်ပါ',
      expand: 'ချဲ့ထွင်ပါ',
      collapse: 'ခေါက်သိမ်းပါ',
      more: 'ပိုမို',
      noData: 'ဒေတာမရှိပါ',
      noMatch: 'ကိုက်ညီသောဒေတာမရှိပါ',
      selectAll: 'အားလုံးရွေးပါ',
      unselectAll: 'အားလုံးရွေးချယ်မှုကိုဖျက်ပါ'
    },
    // အရောင်ရွေးချယ်ရေး
    colorpicker: {
      confirm: 'အိုကေ',
      clear: 'ရှင်းလင်းပါ',
      eyeDropper: 'မျက်စိကောက်ကောက်',
      suggestionDark: 'အဖြူရောင်စာသားက အကောင်းဆုံးဖြစ်သည်',
      suggestionLight: 'အနက်ရောင်စာသားက အကောင်းဆုံးဖြစ်သည်',
      recentColors: 'လတ်တလောအရောင်များ',
      presetColors: 'ကြိုတင်သတ်မှတ်ထားသောအရောင်များ'
    },
    // ရက်စွဲရွေးချယ်ရေး
    datepicker: {
      now: 'ယခု',
      today: 'ယနေ့',
      cancel: 'ပယ်ဖျက်ပါ',
      clear: 'ရှင်းလင်းပါ',
      confirm: 'အိုကေ',
      selectDate: 'ရက်စွဲရွေးပါ',
      selectTime: 'အချိန်ရွေးပါ',
      startDate: 'စတင်ရက်စွဲ',
      startTime: 'စတင်အချိန်',
      endDate: 'အဆုံးရက်စွဲ',
      endTime: 'အဆုံးအချိန်',
      year: '',
      month: '',
      day: '',
      week: 'အပတ်',
      monthBeforeYear: true,
      prevYear: 'ယခင်နှစ်',
      nextYear: 'နောက်နှစ်',
      prevMonth: 'ယခင်လ',
      nextMonth: 'နောက်လ',
      weeks: {
        sun: 'တနင်္ဂနွေ',
        mon: 'တနင်္လာ',
        tue: 'အင်္ဂါ',
        wed: 'ဗုဒ္ဓဟူး',
        thu: 'ကြာသပတေး',
        fri: 'သောကြာ',
        sat: 'စနေ'
      },
      months: {
        jan: 'ဇန်နဝါရီ',
        feb: 'ဖေဖော်ဝါရီ',
        mar: 'မတ်',
        apr: 'ဧပြီ',
        may: 'မေ',
        jun: 'ဇွန်',
        jul: 'ဇူလိုင်',
        aug: 'ဩဂုတ်',
        sep: 'စက်တင်ဘာ',
        oct: 'အောက်တိုဘာ',
        nov: 'နိုဝင်ဘာ',
        dec: 'ဒီဇင်ဘာ'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // အချိန်ရွေးချယ်ရေး
    timepicker: {
      confirm: 'အိုကေ',
      cancel: 'ပယ်ဖျက်ပါ',
      now: 'ယခု',
      placeholder: 'အချိန်ရွေးပါ',
      startPlaceholder: 'စတင်အချိန်',
      endPlaceholder: 'အဆုံးအချိန်',
      selectTime: 'အချိန်ရွေးပါ'
    },
    // အချိန်ရွေးချယ်မှု
    timeselect: {
      placeholder: 'အချိန်ရွေးပါ'
    },
    // သစ်ပင်
    tree: {
      emptyText: 'ဒေတာမရှိပါ',
      loading: 'ဖွင့်နေသည်...',
      checkAll: 'အားလုံးစစ်ဆေးပါ',
      uncheckAll: 'အားလုံးစစ်ဆေးမှုကိုဖျက်ပါ',
      expandAll: 'အားလုံးချဲ့ထွင်ပါ',
      collapseAll: 'အားလုံးခေါက်သိမ်းပါ'
    },
    // သစ်ပင်ရွေးချယ်ရေး
    treeselect: {
      placeholder: 'ရွေးပါ',
      emptyText: 'ဒေတာမရှိပါ',
      loading: 'ဖွင့်နေသည်...',
      noMatch: 'ကိုက်ညီသောဒေတာမရှိပါ'
    },
    // ပြက္ခဒိန်
    calendar: {
      prevMonth: 'ယခင်လ',
      nextMonth: 'နောက်လ',
      prevYear: 'ယခင်နှစ်',
      nextYear: 'နောက်နှစ်',
      today: 'ယနေ့',
      week: 'အပတ်',
      holiday: 'အားလပ်ရက်',
      workday: 'အလုပ်',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'တနင်္ဂနွေ',
        mon: 'တနင်္လာ',
        tue: 'အင်္ဂါ',
        wed: 'ဗုဒ္ဓဟူး',
        thu: 'ကြာသပတေး',
        fri: 'သောကြာ',
        sat: 'စနေ'
      }
    },
    // အလိုအလျောက်ပြီးမြောက်စေရေး
    autocomplete: {
      loading: 'ဖွင့်နေသည်...',
      placeholder: 'ကျေးဇူးပြု၍ ထည့်သွင်းပါ',
      noData: 'ဒေတာမရှိပါ',
      noMatch: 'ကိုက်ညီသောဒေတာမရှိပါ'
    },
    // နောက်ပြန်ရေတွက်ခြင်း
    countdown: {
      days: 'ရက်',
      hours: 'နာရီ',
      minutes: 'မိနစ်',
      seconds: 'စက္ကန့်',
      milliseconds: 'မီလီစက္ကန့်',
      finished: 'ပြီးဆုံးသည်'
    },
    // ဆင့်ကဲရွေးချယ်ရေး
    cascader: {
      noMatch: 'ကိုက်ညီသောဒေတာမရှိပါ',
      placeholder: 'ရွေးပါ',
      loading: 'ဖွင့်နေသည်...',
      noData: 'ဒေတာမရှိပါ'
    },
    // လွှဲပြောင်းရေး
    transfer: {
      noMatch: 'ကိုက်ညီသောဒေတာမရှိပါ',
      noData: 'ဒေတာမရှိပါ',
      titles: ['စာရင်း ၁', 'စာရင်း ၂'],
      filterPlaceholder: 'သော့ချက်စကားလုံးထည့်ပါ',
      noCheckedFormat: '{total} ခု',
      hasCheckedFormat: '{checked}/{total} ရွေးထားသည်',
      searchPlaceholder: 'သော့ချက်စကားလုံးထည့်ပါ'
    },
    // ဇယား
    table: {
      emptyText: 'ဒေတာမရှိပါ',
      confirmFilter: 'အတည်ပြုပါ',
      resetFilter: 'ပြန်လည်သတ်မှတ်ပါ',
      clearFilter: 'အားလုံး',
      sumText: 'ပေါင်းလဒ်',
      loading: 'ဖွင့်နေသည်...',
      index: 'အညွှန်း',
      print: 'ပုံနှိပ်ပါ',
      cancel: 'ပယ်ဖျက်ပါ',
      preview: 'ပုံနှိပ်ရှုမြင်ခြင်း',
      printTime: 'ပုံနှိပ်အချိန်',
      total: 'စုစုပေါင်း {total} ခု',
      page: 'စာမျက်နှာ {page}',
      yes: 'ဟုတ်ကဲ့',
      no: 'မဟုတ်ပါ',
      // ကိရိယာဘားတန်း
      toolbar: {
        refresh: 'ပြန်လည်စတင်ပါ',
        density: 'သိပ်သည်းမှု',
        densityDefault: 'မူလ',
        densityLarge: 'ကြီး',
        densitySmall: 'ငယ်',
        columnSetting: 'ကော်လံဆက်တင်များ',
        fullscreen: 'ဖန်သားပြင်အပြည့်',
        exitFullscreen: 'ဖန်သားပြင်အပြည့်မှထွက်ပါ',
        export: 'တင်ပို့ပါ',
        import: 'တင်သွင်းပါ',
        search: 'ရှာဖွေပါ',
        searchPlaceholder: 'ရှာဖွေရန်သော့ချက်စကားလုံးများထည့်ပါ'
      },
      // စစ်ထုတ်ရေး
      filter: {
        selectAll: 'အားလုံးရွေးပါ',
        selectInvert: 'ရွေးချယ်မှုကိုပြောင်းပြန်လုပ်ပါ',
        empty: 'ဗလာဖြစ်သည်',
        notEmpty: 'ဗလာမဟုတ်ပါ',
        contains: 'ပါဝင်သည်',
        notContains: 'မပါဝင်ပါ',
        equals: 'ညီမျှသည်',
        notEquals: 'မညီမျှပါ',
        startsWith: 'ဖြင့်စတင်သည်',
        endsWith: 'ဖြင့်အဆုံးသတ်သည်',
        greaterThan: 'ထက်ကြီးသည်',
        lessThan: 'ထက်ငယ်သည်',
        between: 'ကြား'
      },
      // စီရေး
      sort: {
        asc: 'တိုးတက်သော',
        desc: 'လျော့ကျသော',
        clear: 'စီရမှုကိုရှင်းလင်းပါ'
      },
      // တင်ပို့ရေး
      export: {
        title: 'ဒေတာတင်ပို့ပါ',
        filename: 'ဖိုင်အမည်',
        type: 'ဖိုင်အမျိုးအစား',
        scope: 'တင်ပို့အကွာအဝေး',
        scopeAll: 'ဒေတာအားလုံး',
        scopeSelected: 'ရွေးထားသောဒေတာ',
        scopeCurrentPage: 'လက်ရှိစာမျက်နှာ',
        includeHeader: 'ခေါင်းစဉ်ပါဝင်ပါ',
        exporting: 'တင်ပို့နေသည်...',
        success: 'တင်ပို့မှုအောင်မြင်သည်',
        error: 'တင်ပို့မှုမအောင်မြင်ပါ'
      },
      // တင်သွင်းရေး
      import: {
        title: 'ဒေတာတင်သွင်းပါ',
        selectFile: 'ဖိုင်ရွေးပါ',
        dragTip: 'တင်ရန်ဖိုင်ကို ဤနေရာတွင်နှိပ်ပါ သို့မဟုတ် ဆွဲထည့်ပါ',
        importing: 'တင်သွင်းနေသည်...',
        success: 'တင်သွင်းမှုအောင်မြင်သည်',
        error: 'တင်သွင်းမှုမအောင်မြင်ပါ',
        preview: 'ဒေတာရှုမြင်ခြင်း',
        confirm: 'တင်သွင်းမှုကိုအတည်ပြုပါ'
      },
      // ပုံနှိပ်ရေး
      printConfig: {
        title: 'ပုံနှိပ်ဆက်တင်များ',
        pageTitle: 'စာမျက်နှာခေါင်းစဉ်',
        pageHeader: 'ခေါင်းစဉ်',
        pageFooter: 'အောက်ခြေ',
        printAll: 'အားလုံးပုံနှိပ်ပါ',
        printSelected: 'ရွေးထားသောကိုပုံနှိပ်ပါ',
        printCurrentPage: 'လက်ရှိစာမျက်နှာကိုပုံနှိပ်ပါ',
        landscape: 'အလျားလိုက်',
        portrait: 'ဒေါင်လိုက်',
        printing: 'ပုံနှိပ်နေသည်...'
      },
      // ကော်လံဆက်တင်များ
      columnSetting: {
        title: 'ကော်လံဆက်တင်များ',
        showAll: 'အားလုံးပြပါ',
        hideAll: 'အားလုံးကိုဖျောက်ပါ',
        reset: 'ပြန်လည်သတ်မှတ်ပါ',
        fixedLeft: 'ဘယ်ဘက်တွင် ပင်တိုင်ထားပါ',
        fixedRight: 'ညာဘက်တွင် ပင်တိုင်ထားပါ',
        unfixed: 'ပင်တိုင်မှုကိုဖျက်ပါ'
      },
      // အကြောင်းအရာမီနူး
      contextMenu: {
        copy: 'ကူးယူပါ',
        copyRow: 'အတန်းကူးယူပါ',
        copyCell: 'ဆဲလ်ကူးယူပါ',
        paste: 'ကပ်ပါ',
        insertRowAbove: 'အပေါ်တွင်အတန်းထည့်ပါ',
        insertRowBelow: 'အောက်တွင်အတန်းထည့်ပါ',
        deleteRow: 'အတန်းဖျက်ပါ',
        deleteSelectedRows: 'ရွေးထားသောအတန်းများကိုဖျက်ပါ',
        exportSelected: 'ရွေးထားသောကိုတင်ပို့ပါ'
      },
      // ရွေးချယ်မှု
      selection: {
        selectAll: 'အားလုံးရွေးပါ',
        selectInvert: 'ရွေးချယ်မှုကိုပြောင်းပြန်လုပ်ပါ',
        selectNone: 'ရွေးချယ်မှုကိုရှင်းလင်းပါ',
        selected: '{count} ခုရွေးထားသည်'
      },
      // ချဲ့ထွင်ရေး
      expand: {
        expandAll: 'အားလုံးချဲ့ထွင်ပါ',
        collapseAll: 'အားလုံးခေါက်သိမ်းပါ'
      },
      // သစ်ပင်
      tree: {
        expandAll: 'အားလုံးချဲ့ထွင်ပါ',
        collapseAll: 'အားလုံးခေါက်သိမ်းပါ',
        expandLevel: 'အဆင့် {level} အထိချဲ့ထွင်ပါ'
      },
      // ဆွဲယူရေး
      drag: {
        dragTip: 'ပြန်လည်စီရန်ဆွဲပါ',
        dropTip: 'ထားရန်ချပါ'
      }
    },
    // မက်ဆေ့ခ်ျဘောက်
    messagebox: {
      title: 'မက်ဆေ့ခ်ျ',
      confirm: 'အိုကေ',
      cancel: 'ပယ်ဖျက်ပါ',
      close: 'ပိတ်ပါ',
      error: 'မမှန်ကန်သောထည့်သွင်းမှု',
      alert: 'သတိပေးချက်',
      prompt: 'အကြံပြုချက်',
      inputPlaceholder: 'ကျေးဇူးပြု၍ ထည့်သွင်းပါ'
    },
    // တင်ရေး
    upload: {
      deleteTip: 'ဖျက်ရန် delete ကိုနှိပ်ပါ',
      delete: 'ဖျက်ပါ',
      preview: 'ရှုမြင်ခြင်း',
      continue: 'ဆက်လုပ်ပါ',
      upload: 'တင်ရန်နှိပ်ပါ',
      tip: 'တင်ရန် ဖိုင်ကို ဤနေရာသို့ <em>ဆွဲထည့်ပါ</em> သို့မဟုတ် နှိပ်ပါ',
      dragTip: 'ဖိုင်ကို ဤနေရာတွင်ချပါ သို့မဟုတ် တင်ရန်နှိပ်ပါ',
      uploading: 'တင်နေသည်...',
      success: 'တင်မှုအောင်မြင်သည်',
      error: 'တင်မှုမအောင်မြင်ပါ',
      retry: 'ပြန်လည်ကြိုးစားပါ',
      cancel: 'တင်မှုကိုပယ်ဖျက်ပါ',
      fileTypeError: 'ဖိုင်အမျိုးအစားကို မထောက်ပံ့ပါ',
      fileSizeError: 'ဖိုင်အရွယ်အစားသည် ကန့်သတ်ချက်ကိုကျော်လွန်နေသည်',
      fileCountError: 'ဖိုင်အရေအတွက်သည် ကန့်သတ်ချက်ကိုကျော်လွန်နေသည်'
    },
    // ပုံစံ
    form: {
      validationFailed: 'အတည်ပြုမှုမအောင်မြင်ပါ',
      required: 'လိုအပ်သည်',
      pleaseInput: 'ကျေးဇူးပြု၍ ထည့်သွင်းပါ',
      pleaseSelect: 'ကျေးဇူးပြု၍ ရွေးပါ'
    },
    // ခလုတ်
    button: {
      loading: 'ဖွင့်နေသည်...'
    },
    // ထည့်သွင်းရေး
    input: {
      placeholder: 'ကျေးဇူးပြု၍ ထည့်သွင်းပါ',
      clear: 'ရှင်းလင်းပါ',
      showPassword: 'စကားဝှက်ကိုပြပါ',
      hidePassword: 'စကားဝှက်ကိုဖျောက်ပါ',
      copy: 'ကူးယူပါ',
      copied: 'ကူးယူထားသည်'
    },
    // နံပါတ်ထည့်သွင်းရေး
    inputnumber: {
      placeholder: 'ကျေးဇူးပြု၍ နံပါတ်ထည့်သွင်းပါ',
      increase: 'တိုးမြှင့်ပါ',
      decrease: 'လျော့ချပါ'
    },
    // တဂ်ထည့်သွင်းရေး
    inputtag: {
      placeholder: 'ကျေးဇူးပြု၍ ထည့်သွင်းပါ',
      add: 'ထည့်ပါ',
      remove: 'ဖယ်ရှားပါ'
    },
    // ပေါင်မုန့်ကြွင်းကြွင်း
    breadcrumb: {
      label: 'ပေါင်မုန့်ကြွင်းကြွင်း',
      more: 'ပိုမို'
    },
    // အပေါ်သို့ပြန်သွားရန်
    backtop: {
      text: 'အပေါ်သို့ပြန်သွားရန်'
    },
    // ရွေးချယ်ရေး
    select: {
      placeholder: 'ကျေးဇူးပြု၍ ရွေးပါ',
      noData: 'ဒေတာမရှိပါ',
      loading: 'ဖွင့်နေသည်...',
      noMatch: 'ကိုက်ညီသောဒေတာမရှိပါ',
      selectAll: 'အားလုံးရွေးပါ',
      clearAll: 'အားလုံးရှင်းလင်းပါ'
    },
    // စာမျက်နှာခွဲရေး
    pagination: {
      goto: 'သွားပါ',
      page: '',
      total: 'စုစုပေါင်း {total}',
      pageSize: '/စာမျက်နှာ',
      prev: 'ယခင်က',
      next: 'နောက်',
      first: 'ပထမ',
      last: 'နောက်ဆုံး',
      pageClassifier: ''
    },
    // ပေါ့ပ်-အတည်ပြုခြင်း
    popconfirm: {
      confirm: 'အိုကေ',
      cancel: 'ပယ်ဖျက်ပါ',
      dontAskAgain: 'နောက်တစ်ကြိမ်မမေးပါနှင့်'
    },
    // ဒိုင်ယာလော့ဂ်
    dialog: {
      confirm: 'အိုကေ',
      cancel: 'ပယ်ဖျက်ပါ',
      close: 'ပိတ်ပါ',
      maximize: 'အများဆုံးလုပ်ပါ',
      restore: 'ပြန်လည်ထားပါ'
    },
    // ထုတ်ယူရေး
    drawer: {
      close: 'ပိတ်ပါ',
      confirm: 'အိုကေ',
      cancel: 'ပယ်ဖျက်ပါ'
    },
    // ဆင်းသက်ရေး
    dropdown: {
      loading: 'ဖွင့်နေသည်...'
    },
    // ပုံ
    image: {
      error: 'မအောင်မြင်ပါ',
      loading: 'ဖွင့်နေသည်...',
      preview: 'ရှုမြင်ခြင်း',
      zoomIn: 'ချဲ့ကြည့်ပါ',
      zoomOut: 'ကျုံ့ကြည့်ပါ',
      rotateLeft: 'ဘယ်ဘက်သို့လှည့်ပါ',
      rotateRight: 'ညာဘက်သို့လှည့်ပါ',
      originalSize: 'မူလအရွယ်အစား',
      fullscreen: 'ဖန်သားပြင်အပြည့်'
    },
    // ပုံရှုမြင်ရေး
    imageviewer: {
      close: 'ပိတ်ပါ',
      prev: 'ယခင်က',
      next: 'နောက်',
      zoomIn: 'ချဲ့ကြည့်ပါ',
      zoomOut: 'ကျုံ့ကြည့်ပါ',
      rotateLeft: 'ဘယ်ဘက်သို့လှည့်ပါ',
      rotateRight: 'ညာဘက်သို့လှည့်ပါ',
      reset: 'ပြန်လည်သတ်မှတ်ပါ',
      fullscreen: 'ဖန်သားပြင်အပြည့်',
      exitFullscreen: 'ဖန်သားပြင်အပြည့်မှထွက်ပါ'
    },
    // အဆုံးမရှိသောလှိမ့်ရေး
    infinitescroll: {
      loading: 'ဖွင့်နေသည်...',
      finished: 'ဒေတာမရှိတော့ပါ',
      error: 'ဖွင့်မှုမအောင်မြင်ပါ၊ ပြန်လည်ကြိုးစားရန်နှိပ်ပါ',
      retry: 'ပြန်လည်ကြိုးစားရန်နှိပ်ပါ'
    },
    // မက်ဆေ့ခ်ျ
    message: {
      close: 'ပိတ်ပါ'
    },
    // အကြောင်းကြားချက်
    notification: {
      close: 'ပိတ်ပါ'
    },
    // ဖွင့်နေသည်
    loading: {
      text: 'ဖွင့်နေသည်...'
    },
    // လည်နေသည်
    spin: {
      text: 'ဖွင့်နေသည်...'
    },
    // အဆင့်သတ်မှတ်ခြင်း
    rate: {
      texts: ['အလွန်ဆိုးရွားသည်', 'စိတ်ပျက်သည်', 'သာမန်', 'ကျေနပ်သည်', 'အံ့သြသည်']
    },
    // သတိပေးချက်
    alert: {
      close: 'ပိတ်ပါ'
    },
    // တဂ်
    tag: {
      close: 'ပိတ်ပါ'
    },
    // တဘ်များ
    tabs: {
      close: 'ပိတ်ပါ',
      add: 'ထည့်ပါ',
      more: 'ပိုမို'
    },
    // အဆင့်များ
    steps: {
      finish: 'ပြီးဆုံးသည်',
      process: 'လုပ်ဆောင်နေသည်',
      wait: 'စောင့်နေသည်',
      error: 'အမှား'
    },
    // တိုးတက်မှု
    progress: {
      success: 'အောင်မြင်သည်',
      exception: 'ခြွင်းချက်',
      warning: 'သတိပေးချက်'
    },
    // အရိုးစု
    skeleton: {
      loading: 'ဖွင့်နေသည်...'
    },
    // ဗလာ
    empty: {
      description: 'ဒေတာမရှိပါ',
      noData: 'ဒေတာမရှိပါ',
      noResult: 'ရလဒ်မရှိပါ',
      networkError: 'ကွန်ရက်အမှား',
      serverError: 'ဆာဗာအမှား'
    },
    // ရလဒ်
    result: {
      success: 'အောင်မြင်သည်',
      error: 'အမှား',
      warning: 'သတိပေးချက်',
      info: 'အချက်အလက်',
      backHome: 'ပင်မသို့ပြန်သွားရန်'
    },
    // ရေတံခွန်
    waterfall: {
      loading: 'ဖွင့်နေသည်...',
      noMore: 'ဒေတာမရှိတော့ပါ',
      empty: 'ဒေတာမရှိပါ'
    },
    // ဖော်ပြချက်များ
    descriptions: {
      colon: ':'
    },
    // ဆလိုက်ဒါ
    slider: {
      tipFormatter: '{value}'
    },
    // ပြောင်းလဲရေး
    switch: {
      on: 'ဖွင့်',
      off: 'ပိတ်'
    },
    // စစ်ဆေးရေးဘောက်စ်
    checkbox: {
      selectAll: 'အားလုံးရွေးပါ'
    },
    // ရေဒီယို
    radio: {},
    // မီနူး
    menu: {
      collapse: 'မီနူးကိုခေါက်သိမ်းပါ',
      expand: 'မီနူးကိုချဲ့ထွင်ပါ'
    },
    // ကတ်
    card: {
      collapse: 'ခေါက်သိမ်းပါ',
      expand: 'ချဲ့ထွင်ပါ'
    },
    // ခေါက်သိမ်းရေး
    collapse: {
      expand: 'ချဲ့ထွင်ပါ',
      collapse: 'ခေါက်သိမ်းပါ'
    },
    // ကိရိယာအကြံပြုချက်
    tooltip: {},
    // ပေါ့ပ်-အိုဗာ
    popover: {},
    // ဘေ့ဂ်
    badge: {},
    // အသွင်အပြင်
    avatar: {
      error: 'ဖွင့်မှုမအောင်မြင်ပါ'
    },
    // ရေမှတ်
    watermark: {},
    // ခွဲခြားရေး
    divider: {},
    // ကာရိုဆယ်
    carousel: {
      prev: 'ယခင်က',
      next: 'နောက်'
    },
    // မာကီ
    marquee: {},
    // အဖစ်
    affix: {},
    // သင်္ကေတ
    anchor: {}
  }
}

export default my
