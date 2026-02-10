import type { Language } from '../index'

export const bn: Language = {
  name: 'bn',
  yh: {
    // সাধারণ
    common: {
      yes: 'হ্যাঁ',
      no: 'না',
      confirm: 'নিশ্চিত করুন',
      cancel: 'বাতিল',
      loading: 'লোড হচ্ছে',
      close: 'বন্ধ',
      clear: 'পরিষ্কার',
      reset: 'রিসেট',
      save: 'সংরক্ষণ',
      delete: 'মুছুন',
      edit: 'সম্পাদনা',
      add: 'যোগ করুন',
      search: 'অনুসন্ধান',
      refresh: 'রিফ্রেশ',
      expand: 'প্রসারিত করুন',
      collapse: 'সংকুচিত করুন',
      more: 'আরও',
      noData: 'কোন ডেটা নেই',
      noMatch: 'কোন মিল নেই',
      selectAll: 'সব নির্বাচন করুন',
      unselectAll: 'সব নির্বাচন বাতিল করুন'
    },
    // রঙ নির্বাচক
    colorpicker: {
      confirm: 'ঠিক আছে',
      clear: 'পরিষ্কার',
      eyeDropper: 'আই ড্রপার',
      suggestionDark: 'সাদা টেক্সট ভাল',
      suggestionLight: 'কালো টেক্সট ভাল',
      recentColors: 'সাম্প্রতিক রঙ',
      presetColors: 'পূর্বনির্ধারিত রঙ'
    },
    // তারিখ নির্বাচক
    datepicker: {
      now: 'এখন',
      today: 'আজ',
      cancel: 'বাতিল',
      clear: 'পরিষ্কার',
      confirm: 'ঠিক আছে',
      selectDate: 'তারিখ নির্বাচন করুন',
      selectTime: 'সময় নির্বাচন করুন',
      startDate: 'শুরুর তারিখ',
      startTime: 'শুরুর সময়',
      endDate: 'শেষ তারিখ',
      endTime: 'শেষ সময়',
      year: '',
      month: '',
      day: '',
      week: 'সপ্তাহ',
      monthBeforeYear: true,
      prevYear: 'পূর্ববর্তী বছর',
      nextYear: 'পরবর্তী বছর',
      prevMonth: 'পূর্ববর্তী মাস',
      nextMonth: 'পরবর্তী মাস',
      weeks: {
        sun: 'রবি',
        mon: 'সোম',
        tue: 'মঙ্গল',
        wed: 'বুধ',
        thu: 'বৃহস্পতি',
        fri: 'শুক্র',
        sat: 'শনি'
      },
      months: {
        jan: 'জানু',
        feb: 'ফেব্রু',
        mar: 'মার্চ',
        apr: 'এপ্রিল',
        may: 'মে',
        jun: 'জুন',
        jul: 'জুলাই',
        aug: 'আগস্ট',
        sep: 'সেপ্টেম্বর',
        oct: 'অক্টোবর',
        nov: 'নভেম্বর',
        dec: 'ডিসেম্বর'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // সময় নির্বাচক
    timepicker: {
      confirm: 'ঠিক আছে',
      cancel: 'বাতিল',
      now: 'এখন',
      placeholder: 'সময় নির্বাচন করুন',
      startPlaceholder: 'শুরুর সময়',
      endPlaceholder: 'শেষ সময়',
      selectTime: 'সময় নির্বাচন করুন'
    },
    // সময় নির্বাচন
    timeselect: {
      placeholder: 'সময় নির্বাচন করুন'
    },
    // গাছ
    tree: {
      emptyText: 'কোন ডেটা নেই',
      loading: 'লোড হচ্ছে...',
      checkAll: 'সব চেক করুন',
      uncheckAll: 'সব চেক বাতিল করুন',
      expandAll: 'সব প্রসারিত করুন',
      collapseAll: 'সব সংকুচিত করুন'
    },
    // গাছ নির্বাচক
    treeselect: {
      placeholder: 'নির্বাচন করুন',
      emptyText: 'কোন ডেটা নেই',
      loading: 'লোড হচ্ছে...',
      noMatch: 'কোন মিল নেই'
    },
    // ক্যালেন্ডার
    calendar: {
      prevMonth: 'পূর্ববর্তী মাস',
      nextMonth: 'পরবর্তী মাস',
      prevYear: 'পূর্ববর্তী বছর',
      nextYear: 'পরবর্তী বছর',
      today: 'আজ',
      week: 'সপ্তাহ',
      holiday: 'ছুটি',
      workday: 'কাজ',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'রবি',
        mon: 'সোম',
        tue: 'মঙ্গল',
        wed: 'বুধ',
        thu: 'বৃহস্পতি',
        fri: 'শুক্র',
        sat: 'শনি'
      }
    },
    // অটো-সম্পূর্ণ
    autocomplete: {
      loading: 'লোড হচ্ছে...',
      placeholder: 'অনুগ্রহ করে ইনপুট করুন',
      noData: 'কোন ডেটা নেই',
      noMatch: 'কোন মিল নেই'
    },
    // কাউন্টডাউন
    countdown: {
      days: 'দিন',
      hours: 'ঘণ্টা',
      minutes: 'মিনিট',
      seconds: 'সেকেন্ড',
      milliseconds: 'মিলিসেকেন্ড',
      finished: 'সমাপ্ত'
    },
    // ক্যাসকেডার
    cascader: {
      noMatch: 'কোন মিল নেই',
      placeholder: 'নির্বাচন করুন',
      loading: 'লোড হচ্ছে...',
      noData: 'কোন ডেটা নেই'
    },
    // স্থানান্তর
    transfer: {
      noMatch: 'কোন মিল নেই',
      noData: 'কোন ডেটা নেই',
      titles: ['তালিকা ১', 'তালিকা ২'],
      filterPlaceholder: 'কীওয়ার্ড লিখুন',
      noCheckedFormat: '{total} আইটেম',
      hasCheckedFormat: '{checked}/{total} নির্বাচিত',
      searchPlaceholder: 'কীওয়ার্ড লিখুন'
    },
    // টেবিল
    table: {
      emptyText: 'কোন ডেটা নেই',
      confirmFilter: 'নিশ্চিত করুন',
      resetFilter: 'রিসেট',
      clearFilter: 'সব',
      sumText: 'যোগফল',
      loading: 'লোড হচ্ছে...',
      index: 'সূচক',
      print: 'প্রিন্ট',
      cancel: 'বাতিল',
      preview: 'প্রিন্ট প্রিভিউ',
      printTime: 'প্রিন্ট সময়',
      total: 'মোট {total} আইটেম',
      page: 'পৃষ্ঠা {page}',
      yes: 'হ্যাঁ',
      no: 'না',
      // টুলবার
      toolbar: {
        refresh: 'রিফ্রেশ',
        density: 'ঘনত্ব',
        densityDefault: 'ডিফল্ট',
        densityLarge: 'বড়',
        densitySmall: 'ছোট',
        columnSetting: 'কলাম সেটিংস',
        fullscreen: 'পূর্ণস্ক্রীন',
        exitFullscreen: 'পূর্ণস্ক্রীন থেকে বের হন',
        export: 'এক্সপোর্ট',
        import: 'ইমপোর্ট',
        search: 'অনুসন্ধান',
        searchPlaceholder: 'অনুসন্ধানের জন্য কীওয়ার্ড লিখুন'
      },
      // ফিল্টার
      filter: {
        selectAll: 'সব নির্বাচন করুন',
        selectInvert: 'নির্বাচন উল্টান',
        empty: 'খালি',
        notEmpty: 'খালি নয়',
        contains: 'ধারণ করে',
        notContains: 'ধারণ করে না',
        equals: 'সমান',
        notEquals: 'সমান নয়',
        startsWith: 'দিয়ে শুরু হয়',
        endsWith: 'দিয়ে শেষ হয়',
        greaterThan: 'এর চেয়ে বড়',
        lessThan: 'এর চেয়ে ছোট',
        between: 'এর মধ্যে'
      },
      // সাজান
      sort: {
        asc: 'আরোহী',
        desc: 'অবরোহী',
        clear: 'সাজানো পরিষ্কার করুন'
      },
      // এক্সপোর্ট
      export: {
        title: 'ডেটা এক্সপোর্ট করুন',
        filename: 'ফাইলের নাম',
        type: 'ফাইলের ধরন',
        scope: 'এক্সপোর্ট স্কোপ',
        scopeAll: 'সব ডেটা',
        scopeSelected: 'নির্বাচিত ডেটা',
        scopeCurrentPage: 'বর্তমান পৃষ্ঠা',
        includeHeader: 'হেডার অন্তর্ভুক্ত করুন',
        exporting: 'এক্সপোর্ট হচ্ছে...',
        success: 'এক্সপোর্ট সফল',
        error: 'এক্সপোর্ট ব্যর্থ'
      },
      // ইমপোর্ট
      import: {
        title: 'ডেটা ইমপোর্ট করুন',
        selectFile: 'ফাইল নির্বাচন করুন',
        dragTip: 'আপলোড করতে ফাইল এখানে ক্লিক করুন বা টেনে আনুন',
        importing: 'ইমপোর্ট হচ্ছে...',
        success: 'ইমপোর্ট সফল',
        error: 'ইমপোর্ট ব্যর্থ',
        preview: 'ডেটা প্রিভিউ',
        confirm: 'ইমপোর্ট নিশ্চিত করুন'
      },
      // প্রিন্ট
      printConfig: {
        title: 'প্রিন্ট সেটিংস',
        pageTitle: 'পৃষ্ঠার শিরোনাম',
        pageHeader: 'হেডার',
        pageFooter: 'ফুটার',
        printAll: 'সব প্রিন্ট করুন',
        printSelected: 'নির্বাচিত প্রিন্ট করুন',
        printCurrentPage: 'বর্তমান পৃষ্ঠা প্রিন্ট করুন',
        landscape: 'ল্যান্ডস্কেপ',
        portrait: 'পোর্ট্রেট',
        printing: 'প্রিন্ট হচ্ছে...'
      },
      // কলাম সেটিংস
      columnSetting: {
        title: 'কলাম সেটিংস',
        showAll: 'সব দেখান',
        hideAll: 'সব লুকান',
        reset: 'রিসেট',
        fixedLeft: 'বামে ফিক্স করুন',
        fixedRight: 'ডানে ফিক্স করুন',
        unfixed: 'ফিক্স বাতিল করুন'
      },
      // কনটেক্সট মেনু
      contextMenu: {
        copy: 'কপি',
        copyRow: 'সারি কপি',
        copyCell: 'সেল কপি',
        paste: 'পেস্ট',
        insertRowAbove: 'উপরে সারি ঢোকান',
        insertRowBelow: 'নিচে সারি ঢোকান',
        deleteRow: 'সারি মুছুন',
        deleteSelectedRows: 'নির্বাচিত সারি মুছুন',
        exportSelected: 'নির্বাচিত এক্সপোর্ট করুন'
      },
      // নির্বাচন
      selection: {
        selectAll: 'সব নির্বাচন করুন',
        selectInvert: 'নির্বাচন উল্টান',
        selectNone: 'নির্বাচন পরিষ্কার করুন',
        selected: '{count} আইটেম নির্বাচিত'
      },
      // প্রসারিত
      expand: {
        expandAll: 'সব প্রসারিত করুন',
        collapseAll: 'সব সংকুচিত করুন'
      },
      // গাছ
      tree: {
        expandAll: 'সব প্রসারিত করুন',
        collapseAll: 'সব সংকুচিত করুন',
        expandLevel: 'লেভেল {level} পর্যন্ত প্রসারিত করুন'
      },
      // টেনে নিয়ে যান
      drag: {
        dragTip: 'পুনরায় সাজাতে টেনে নিয়ে যান',
        dropTip: 'স্থাপন করতে ছেড়ে দিন'
      }
    },
    // মেসেজ বক্স
    messagebox: {
      title: 'বার্তা',
      confirm: 'ঠিক আছে',
      cancel: 'বাতিল',
      close: 'বন্ধ',
      error: 'অবৈধ ইনপুট',
      alert: 'সতর্কতা',
      prompt: 'প্রম্পট',
      inputPlaceholder: 'অনুগ্রহ করে ইনপুট করুন'
    },
    // আপলোড
    upload: {
      deleteTip: 'মুছতে delete চাপুন',
      delete: 'মুছুন',
      preview: 'প্রিভিউ',
      continue: 'চালিয়ে যান',
      upload: 'আপলোড করতে ক্লিক করুন',
      tip: 'আপলোড করতে ফাইল এই এলাকায় <em>টেনে আনুন</em> বা ক্লিক করুন',
      dragTip: 'ফাইল এখানে টেনে আনুন বা আপলোড করতে ক্লিক করুন',
      uploading: 'আপলোড হচ্ছে...',
      success: 'আপলোড সফল',
      error: 'আপলোড ব্যর্থ',
      retry: 'পুনরায় চেষ্টা করুন',
      cancel: 'আপলোড বাতিল করুন',
      fileTypeError: 'ফাইলের ধরন সমর্থিত নয়',
      fileSizeError: 'ফাইলের আকার সীমা অতিক্রম করেছে',
      fileCountError: 'ফাইলের সংখ্যা সীমা অতিক্রম করেছে'
    },
    // ফর্ম
    form: {
      validationFailed: 'যাচাইকরণ ব্যর্থ',
      required: 'আবশ্যক',
      pleaseInput: 'অনুগ্রহ করে ইনপুট করুন',
      pleaseSelect: 'অনুগ্রহ করে নির্বাচন করুন'
    },
    // বাটন
    button: {
      loading: 'লোড হচ্ছে...'
    },
    // ইনপুট
    input: {
      placeholder: 'অনুগ্রহ করে ইনপুট করুন',
      clear: 'পরিষ্কার',
      showPassword: 'পাসওয়ার্ড দেখান',
      hidePassword: 'পাসওয়ার্ড লুকান',
      copy: 'কপি',
      copied: 'কপি করা হয়েছে'
    },
    // সংখ্যা ইনপুট
    inputnumber: {
      placeholder: 'অনুগ্রহ করে সংখ্যা ইনপুট করুন',
      increase: 'বাড়ান',
      decrease: 'কমান'
    },
    // ট্যাগ ইনপুট
    inputtag: {
      placeholder: 'অনুগ্রহ করে ইনপুট করুন',
      add: 'যোগ করুন',
      remove: 'সরান'
    },
    // ব্রেডক্রাম্ব
    breadcrumb: {
      label: 'ব্রেডক্রাম্ব',
      more: 'আরও'
    },
    // শীর্ষে ফিরে যান
    backtop: {
      text: 'শীর্ষে ফিরে যান'
    },
    // নির্বাচন
    select: {
      placeholder: 'অনুগ্রহ করে নির্বাচন করুন',
      noData: 'কোন ডেটা নেই',
      loading: 'লোড হচ্ছে...',
      noMatch: 'কোন মিল নেই',
      selectAll: 'সব নির্বাচন করুন',
      clearAll: 'সব পরিষ্কার করুন'
    },
    // পেজিনেশন
    pagination: {
      goto: 'যান',
      page: '',
      total: 'মোট {total}',
      pageSize: '/পৃষ্ঠা',
      prev: 'পূর্ববর্তী',
      next: 'পরবর্তী',
      first: 'প্রথম',
      last: 'শেষ',
      pageClassifier: ''
    },
    // পপ কনফার্ম
    popconfirm: {
      confirm: 'ঠিক আছে',
      cancel: 'বাতিল',
      dontAskAgain: 'আর জিজ্ঞাসা করবেন না'
    },
    // ডায়ালগ
    dialog: {
      confirm: 'ঠিক আছে',
      cancel: 'বাতিল',
      close: 'বন্ধ',
      maximize: 'সর্বোচ্চ করুন',
      restore: 'পুনরুদ্ধার করুন'
    },
    // ড্রয়ার
    drawer: {
      close: 'বন্ধ',
      confirm: 'ঠিক আছে',
      cancel: 'বাতিল'
    },
    // ড্রপডাউন
    dropdown: {
      loading: 'লোড হচ্ছে...'
    },
    // ছবি
    image: {
      error: 'ব্যর্থ',
      loading: 'লোড হচ্ছে...',
      preview: 'প্রিভিউ',
      zoomIn: 'জুম ইন',
      zoomOut: 'জুম আউট',
      rotateLeft: 'বামে ঘুরান',
      rotateRight: 'ডানে ঘুরান',
      originalSize: 'মূল আকার',
      fullscreen: 'পূর্ণস্ক্রীন'
    },
    // ছবি ভিউয়ার
    imageviewer: {
      close: 'বন্ধ',
      prev: 'পূর্ববর্তী',
      next: 'পরবর্তী',
      zoomIn: 'জুম ইন',
      zoomOut: 'জুম আউট',
      rotateLeft: 'বামে ঘুরান',
      rotateRight: 'ডানে ঘুরান',
      reset: 'রিসেট',
      fullscreen: 'পূর্ণস্ক্রীন',
      exitFullscreen: 'পূর্ণস্ক্রীন থেকে বের হন'
    },
    // অসীম স্ক্রল
    infinitescroll: {
      loading: 'লোড হচ্ছে...',
      finished: 'আর ডেটা নেই',
      error: 'লোড ব্যর্থ, পুনরায় চেষ্টা করতে ক্লিক করুন',
      retry: 'পুনরায় চেষ্টা করতে ক্লিক করুন'
    },
    // বার্তা
    message: {
      close: 'বন্ধ'
    },
    // বিজ্ঞপ্তি
    notification: {
      close: 'বন্ধ'
    },
    // লোডিং
    loading: {
      text: 'লোড হচ্ছে...'
    },
    // স্পিন
    spin: {
      text: 'লোড হচ্ছে...'
    },
    // রেটিং
    rate: {
      texts: ['অত্যন্ত খারাপ', 'হতাশ', 'সঠিক', 'সন্তুষ্ট', 'আশ্চর্য']
    },
    // সতর্কতা
    alert: {
      close: 'বন্ধ'
    },
    // ট্যাগ
    tag: {
      close: 'বন্ধ'
    },
    // ট্যাবস
    tabs: {
      close: 'বন্ধ',
      add: 'যোগ করুন',
      more: 'আরও'
    },
    // ধাপ
    steps: {
      finish: 'সমাপ্ত',
      process: 'প্রক্রিয়াধীন',
      wait: 'অপেক্ষা',
      error: 'ত্রুটি'
    },
    // অগ্রগতি
    progress: {
      success: 'সফল',
      exception: 'ব্যতিক্রম',
      warning: 'সতর্কতা'
    },
    // কঙ্কাল
    skeleton: {
      loading: 'লোড হচ্ছে...'
    },
    // খালি
    empty: {
      description: 'কোন ডেটা নেই',
      noData: 'কোন ডেটা নেই',
      noResult: 'কোন ফলাফল নেই',
      networkError: 'নেটওয়ার্ক ত্রুটি',
      serverError: 'সার্ভার ত্রুটি'
    },
    // ফলাফল
    result: {
      success: 'সফল',
      error: 'ত্রুটি',
      warning: 'সতর্কতা',
      info: 'তথ্য',
      backHome: 'হোমে ফিরে যান'
    },
    // জলপ্রপাত
    waterfall: {
      loading: 'লোড হচ্ছে...',
      noMore: 'আর ডেটা নেই',
      empty: 'কোন ডেটা নেই'
    },
    // বিবরণ
    descriptions: {
      colon: ':'
    },
    // স্লাইডার
    slider: {
      tipFormatter: '{value}'
    },
    // সুইচ
    switch: {
      on: 'চালু',
      off: 'বন্ধ'
    },
    // চেকবক্স
    checkbox: {
      selectAll: 'সব নির্বাচন করুন'
    },
    // রেডিও
    radio: {},
    // মেনু
    menu: {
      collapse: 'মেনু সংকুচিত করুন',
      expand: 'মেনু প্রসারিত করুন'
    },
    // কার্ড
    card: {
      collapse: 'সংকুচিত করুন',
      expand: 'প্রসারিত করুন'
    },
    // কোলাপ্স
    collapse: {
      expand: 'প্রসারিত করুন',
      collapse: 'সংকুচিত করুন'
    },
    // টুলটিপ
    tooltip: {},
    // পপওভার
    popover: {},
    // ব্যাজ
    badge: {},
    // অ্যাভাটার
    avatar: {
      error: 'লোড ব্যর্থ'
    },
    // ওয়াটারমার্ক
    watermark: {},
    // বিভাজক
    divider: {},
    // ক্যারousel
    carousel: {
      prev: 'পূর্ববর্তী',
      next: 'পরবর্তী'
    },
    // মার্কি
    marquee: {},
    // অ্যাফিক্স
    affix: {},
    // অ্যাঙ্কর
    anchor: {}
  }
}

export default bn
