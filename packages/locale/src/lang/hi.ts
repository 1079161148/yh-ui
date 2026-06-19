import type { Language } from '../index'

export const hi: Language = {
  name: 'hi',
  yh: {
    common: {
      yes: 'हां',
      no: 'नहीं',
      confirm: 'पुष्टि करें',
      cancel: 'रद्द करें',
      loading: 'लोड हो रहा है',
      close: 'बंद करें',
      clear: 'साफ़ करें',
      reset: 'रीसेट करें',
      save: 'सहेजें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      add: 'जोड़ें',
      search: 'खोजें',
      refresh: 'ताज़ा करें',
      expand: 'विस्तार करें',
      collapse: 'संक्षिप्त करें',
      more: 'अधिक',
      noData: 'कोई डेटा नहीं',
      noMatch: 'कोई मेल नहीं',
      selectAll: 'सभी चुनें',
      unselectAll: 'सभी का चयन हटाएं'
    },
    colorpicker: {
      confirm: 'ठीक है',
      clear: 'साफ़ करें',
      eyeDropper: 'आई ड्रॉपर',
      suggestionDark: 'सफेद टेक्स्ट बेहतर है',
      suggestionLight: 'काला टेक्स्ट बेहतर है',
      recentColors: 'हाल के रंग',
      presetColors: 'प्रीसेट रंग'
    },
    datepicker: {
      now: 'अभी',
      today: 'आज',
      cancel: 'रद्द करें',
      clear: 'साफ़ करें',
      confirm: 'ठीक है',
      selectDate: 'दिनांक चुनें',
      selectTime: 'समय चुनें',
      startDate: 'प्रारंभ दिनांक',
      startTime: 'प्रारंभ समय',
      endDate: 'समाप्ति दिनांक',
      endTime: 'समाप्ति समय',
      year: '',
      month: '',
      day: '',
      week: 'सप्ताह',
      monthBeforeYear: true,
      prevYear: 'पिछला वर्ष',
      nextYear: 'अगला वर्ष',
      prevMonth: 'पिछला महीना',
      nextMonth: 'अगला महीना',
      weeks: {
        sun: 'रवि',
        mon: 'सोम',
        tue: 'मंगल',
        wed: 'बुध',
        thu: 'गुरु',
        fri: 'शुक्र',
        sat: 'शनि'
      },
      months: {
        jan: 'जन',
        feb: 'फ़र',
        mar: 'मार्च',
        apr: 'अप्रैल',
        may: 'मई',
        jun: 'जून',
        jul: 'जुल',
        aug: 'अग',
        sep: 'सित',
        oct: 'अक्टू',
        nov: 'नव',
        dec: 'दिस'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    timepicker: {
      confirm: 'ठीक है',
      cancel: 'रद्द करें',
      now: 'अभी',
      placeholder: 'समय चुनें',
      startPlaceholder: 'प्रारंभ समय',
      endPlaceholder: 'समाप्ति समय',
      selectTime: 'समय चुनें'
    },
    timeselect: {
      placeholder: 'समय चुनें'
    },
    tree: {
      emptyText: 'कोई डेटा नहीं',
      loading: 'लोड हो रहा है...',
      checkAll: 'सभी चुनें',
      uncheckAll: 'सभी का चयन हटाएं',
      expandAll: 'सभी विस्तार करें',
      collapseAll: 'सभी संक्षिप्त करें'
    },
    treeselect: {
      placeholder: 'चुनें',
      emptyText: 'कोई डेटा नहीं',
      loading: 'लोड हो रहा है...',
      noMatch: 'कोई मेल नहीं'
    },
    calendar: {
      prevMonth: 'पिछला महीना',
      nextMonth: 'अगला महीना',
      prevYear: 'पिछला वर्ष',
      nextYear: 'अगला वर्ष',
      today: 'आज',
      week: 'सप्ताह',
      holiday: 'छुट्टी',
      workday: 'कार्य दिवस',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'रवि',
        mon: 'सोम',
        tue: 'मंगल',
        wed: 'बुध',
        thu: 'गुरु',
        fri: 'शुक्र',
        sat: 'शनि'
      }
    },
    autocomplete: {
      loading: 'लोड हो रहा है...',
      placeholder: 'कृपया दर्ज करें',
      noData: 'कोई डेटा नहीं',
      noMatch: 'कोई मेल नहीं'
    },
    countdown: {
      days: 'दिन',
      hours: 'घंटे',
      minutes: 'मिनट',
      seconds: 'सेकंड',
      milliseconds: 'मिलीसेकंड',
      finished: 'समाप्त'
    },
    cascader: {
      noMatch: 'कोई मेल नहीं',
      placeholder: 'चुनें',
      loading: 'लोड हो रहा है...',
      noData: 'कोई डेटा नहीं'
    },
    transfer: {
      noMatch: 'कोई मेल नहीं',
      noData: 'कोई डेटा नहीं',
      titles: ['सूची 1', 'सूची 2'],
      filterPlaceholder: 'कीवर्ड दर्ज करें',
      noCheckedFormat: '{total} आइटम',
      hasCheckedFormat: '{checked}/{total} चयनित',
      searchPlaceholder: 'कीवर्ड दर्ज करें'
    },
    table: {
      emptyText: 'कोई डेटा नहीं',
      confirmFilter: 'पुष्टि करें',
      resetFilter: 'रीसेट करें',
      clearFilter: 'सभी',
      sumText: 'योग',
      loading: 'लोड हो रहा है...',
      index: 'अनुक्रमणिका',
      print: 'प्रिंट करें',
      cancel: 'रद्द करें',
      preview: 'प्रिंट पूर्वावलोकन',
      printTime: 'प्रिंट समय',
      total: 'कुल {total} आइटम',
      page: 'पृष्ठ {page}',
      yes: 'हां',
      no: 'नहीं',
      toolbar: {
        refresh: 'ताज़ा करें',
        density: 'घनत्व',
        densityDefault: 'डिफ़ॉल्ट',
        densityLarge: 'बड़ा',
        densitySmall: 'छोटा',
        columnSetting: 'कॉलम सेटिंग्स',
        fullscreen: 'पूर्ण स्क्रीन',
        exitFullscreen: 'पूर्ण स्क्रीन से बाहर निकलें',
        export: 'निर्यात करें',
        import: 'आयात करें',
        search: 'खोजें',
        searchPlaceholder: 'खोजने के लिए कीवर्ड दर्ज करें'
      },
      filter: {
        selectAll: 'सभी चुनें',
        selectInvert: 'चयन उलटें',
        empty: 'खाली',
        notEmpty: 'खाली नहीं',
        contains: 'शामिल है',
        notContains: 'शामिल नहीं है',
        equals: 'बराबर',
        notEquals: 'बराबर नहीं',
        startsWith: 'से शुरू होता है',
        endsWith: 'से समाप्त होता है',
        greaterThan: 'से बड़ा',
        lessThan: 'से छोटा',
        between: 'के बीच'
      },
      sort: {
        asc: 'आरोही',
        desc: 'अवरोही',
        clear: 'सॉर्ट साफ़ करें'
      },
      export: {
        title: 'डेटा निर्यात करें',
        filename: 'फ़ाइल का नाम',
        type: 'फ़ाइल प्रकार',
        scope: 'निर्यात दायरा',
        scopeAll: 'सभी डेटा',
        scopeSelected: 'चयनित डेटा',
        scopeCurrentPage: 'वर्तमान पृष्ठ',
        includeHeader: 'हेडर शामिल करें',
        exporting: 'निर्यात हो रहा है...',
        success: 'निर्यात सफल',
        error: 'निर्यात त्रुटि'
      },
      import: {
        title: 'डेटा आयात करें',
        selectFile: 'फ़ाइल चुनें',
        dragTip: 'अपलोड करने के लिए फ़ाइल यहाँ खींचें या क्लिक करें',
        importing: 'आयात हो रहा है...',
        success: 'आयात सफल',
        error: 'आयात त्रुटि',
        preview: 'डेटा पूर्वावलोकन',
        confirm: 'आयात की पुष्टि करें'
      },
      printConfig: {
        title: 'प्रिंट सेटिंग्स',
        pageTitle: 'पृष्ठ शीर्षक',
        pageHeader: 'हेडर',
        pageFooter: 'फुटर',
        printAll: 'सभी प्रिंट करें',
        printSelected: 'चयनित प्रिंट करें',
        printCurrentPage: 'वर्तमान पृष्ठ प्रिंट करें',
        landscape: 'लैंडस्केप',
        portrait: 'पोर्ट्रेट',
        printing: 'प्रिंट हो रहा है...'
      },
      columnSetting: {
        title: 'कॉलम सेटिंग्स',
        showAll: 'सभी दिखाएं',
        hideAll: 'सभी छुपाएं',
        reset: 'रीसेट करें',
        fixedLeft: 'बाएं फिक्स करें',
        fixedRight: 'दाएं फिक्स करें',
        unfixed: 'अनफिक्स करें'
      },
      contextMenu: {
        copy: 'कॉपी करें',
        copyRow: 'पंक्ति कॉपी करें',
        copyCell: 'सेल कॉपी करें',
        paste: 'पेस्ट करें',
        insertRowAbove: 'ऊपर पंक्ति जोड़ें',
        insertRowBelow: 'नीचे पंक्ति जोड़ें',
        deleteRow: 'पंक्ति हटाएं',
        deleteSelectedRows: 'चयनित पंक्तियां हटाएं',
        exportSelected: 'चयनित निर्यात करें'
      },
      selection: {
        selectAll: 'सभी चुनें',
        selectInvert: 'चयन उलटें',
        selectNone: 'चयन साफ़ करें',
        selected: '{count} आइटम चयनित'
      },
      expand: {
        expandAll: 'सभी विस्तार करें',
        collapseAll: 'सभी संक्षिप्त करें'
      },
      tree: {
        expandAll: 'सभी विस्तार करें',
        collapseAll: 'सभी संक्षिप्त करें',
        expandLevel: 'स्तर {level} तक विस्तार करें'
      },
      drag: {
        dragTip: 'पुनर्व्यवस्थित करने के लिए खींचें',
        dropTip: 'रखने के लिए छोड़ें'
      }
    },
    messagebox: {
      title: 'संदेश',
      confirm: 'ठीक है',
      cancel: 'रद्द करें',
      close: 'बंद करें',
      error: 'अमान्य इनपुट',
      alert: 'चेतावनी',
      prompt: 'संकेत',
      inputPlaceholder: 'कृपया दर्ज करें'
    },
    upload: {
      deleteTip: 'हटाने के लिए delete दबाएं',
      delete: 'हटाएं',
      preview: 'पूर्वावलोकन',
      continue: 'जारी रखें',
      upload: 'अपलोड करने के लिए क्लिक करें',
      tip: '<em>अपलोड</em> करने के लिए फ़ाइल को इस क्षेत्र में खींचें या क्लिक करें',
      dragTip: 'फ़ाइल को यहाँ खींचें या अपलोड करने के लिए क्लिक करें',
      uploading: 'अपलोड हो रहा है...',
      success: 'अपलोड सफल',
      error: 'अपलोड त्रुटि',
      retry: 'पुनः प्रयास करें',
      cancel: 'अपलोड रद्द करें',
      fileTypeError: 'फ़ाइल प्रकार समर्थित नहीं है',
      fileSizeError: 'फ़ाइल का आकार सीमा से अधिक है',
      fileCountError: 'फ़ाइलों की संख्या सीमा से अधिक है'
    },
    form: {
      validationFailed: 'सत्यापन विफल',
      required: 'आवश्यक',
      pleaseInput: 'कृपया दर्ज करें',
      pleaseSelect: 'कृपया चुनें'
    },
    button: {
      loading: 'लोड हो रहा है...'
    },
    input: {
      placeholder: 'कृपया दर्ज करें',
      clear: 'साफ़ करें',
      showPassword: 'पासवर्ड दिखाएं',
      hidePassword: 'पासवर्ड छुपाएं',
      copy: 'कॉपी करें',
      copied: 'कॉपी किया गया'
    },
    inputnumber: {
      placeholder: 'कृपया संख्या दर्ज करें',
      increase: 'बढ़ाएं',
      decrease: 'घटाएं'
    },
    inputtag: {
      placeholder: 'कृपया दर्ज करें',
      add: 'जोड़ें',
      remove: 'हटाएं'
    },
    breadcrumb: {
      label: 'ब्रेडक्रंब',
      more: 'अधिक'
    },
    backtop: {
      text: 'शीर्ष पर वापस जाएं'
    },
    select: {
      placeholder: 'कृपया चुनें',
      noData: 'कोई डेटा नहीं',
      loading: 'लोड हो रहा है...',
      noMatch: 'कोई मेल नहीं',
      selectAll: 'सभी चुनें',
      clearAll: 'सभी साफ़ करें'
    },
    pagination: {
      goto: 'जाएं',
      page: '',
      total: 'कुल {total}',
      pageSize: '/पृष्ठ',
      prev: 'पिछला',
      next: 'अगला',
      first: 'पहला',
      last: 'अंतिम',
      pageClassifier: ''
    },
    popconfirm: {
      confirm: 'ठीक है',
      cancel: 'रद्द करें',
      dontAskAgain: 'फिर मत पूछो'
    },
    dialog: {
      confirm: 'ठीक है',
      cancel: 'रद्द करें',
      close: 'बंद करें',
      maximize: 'अधिकतम करें',
      restore: 'पुनर्स्थापित करें'
    },
    drawer: {
      close: 'बंद करें',
      confirm: 'ठीक है',
      cancel: 'रद्द करें'
    },
    dropdown: {
      loading: 'लोड हो रहा है...'
    },
    image: {
      error: 'त्रुटि',
      loading: 'लोड हो रहा है...',
      preview: 'पूर्वावलोकन',
      zoomIn: 'ज़ूम इन',
      zoomOut: 'ज़ूम आउट',
      rotateLeft: 'बाएं घुमाएं',
      rotateRight: 'दाएं घुमाएं',
      originalSize: 'मूल आकार',
      fullscreen: 'पूर्ण स्क्रीन'
    },
    imageviewer: {
      close: 'बंद करें',
      prev: 'पिछला',
      next: 'अगला',
      zoomIn: 'ज़ूम इन',
      zoomOut: 'ज़ूम आउट',
      rotateLeft: 'बाएं घुमाएं',
      rotateRight: 'दाएं घुमाएं',
      reset: 'रीसेट करें',
      fullscreen: 'पूर्ण स्क्रीन',
      exitFullscreen: 'पूर्ण स्क्रीन से बाहर निकलें'
    },
    infinitescroll: {
      loading: 'लोड हो रहा है...',
      finished: 'और डेटा नहीं है',
      error: 'लोड त्रुटि, पुनः प्रयास के लिए क्लिक करें',
      retry: 'पुनः प्रयास के लिए क्लिक करें'
    },
    message: {
      close: 'बंद करें'
    },
    notification: {
      close: 'बंद करें'
    },
    loading: {
      text: 'लोड हो रहा है...'
    },
    spin: {
      text: 'लोड हो रहा है...'
    },
    rate: {
      texts: ['बहुत खराब', 'निराश', 'ठीक', 'संतुष्ट', 'आश्चर्यित']
    },
    alert: {
      close: 'बंद करें'
    },
    tag: {
      close: 'बंद करें'
    },
    tabs: {
      close: 'बंद करें',
      add: 'जोड़ें',
      more: 'अधिक'
    },
    steps: {
      finish: 'समाप्त',
      process: 'प्रगति में',
      wait: 'प्रतीक्षा',
      error: 'त्रुटि'
    },
    progress: {
      success: 'सफल',
      exception: 'अपवाद',
      warning: 'चेतावनी'
    },
    skeleton: {
      loading: 'लोड हो रहा है...'
    },
    empty: {
      description: 'कोई डेटा नहीं',
      noData: 'कोई डेटा नहीं',
      noResult: 'कोई परिणाम नहीं',
      networkError: 'नेटवर्क त्रुटि',
      serverError: 'सर्वर त्रुटि'
    },
    result: {
      success: 'सफल',
      error: 'त्रुटि',
      warning: 'चेतावनी',
      info: 'जानकारी',
      backHome: 'होम पर वापस जाएं'
    },
    waterfall: {
      loading: 'लोड हो रहा है...',
      noMore: 'और डेटा नहीं है',
      empty: 'कोई डेटा नहीं'
    },
    descriptions: {
      colon: ':'
    },
    slider: {
      tipFormatter: '{value}'
    },
    switch: {
      on: 'चालू',
      off: 'बंद'
    },
    checkbox: {
      selectAll: 'सभी चुनें'
    },
    radio: {},
    menu: {
      collapse: 'मेनू संक्षिप्त करें',
      expand: 'मेनू विस्तार करें'
    },
    card: {
      collapse: 'संक्षिप्त करें',
      expand: 'विस्तार करें'
    },
    collapse: {
      expand: 'विस्तार करें',
      collapse: 'संक्षिप्त करें'
    },
    tooltip: {},
    popover: {},
    badge: {},
    avatar: {
      error: 'लोड त्रुटि'
    },
    watermark: {},
    divider: {},
    carousel: {
      prev: 'पिछला',
      next: 'अगला'
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
      placeholder: 'कृपया दर्ज करें',
      loading: 'लोड हो रहा है...',
      noData: 'कोई डेटा नहीं'
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
        citations: 'उद्धरण'
      },
      mention: {
        placeholder: '@ एजेंट, डॉक्यूमेंट या टेबल का उल्लेख करें...',
        agent: 'एजेंट',
        document: 'दस्तावेज़',
        table: 'टेबल',
        knowledge: 'ज्ञान',
        file: 'File'
      },
      codeBlock: {
        copyCode: 'कोड कॉपी करें',
        copied: 'कॉपी हो गया!',
        run: 'कोड चलाएं',
        edit: 'संपादित करें',
        save: 'सहेजें',
        cancel: 'रद्द करें'
      },
      codeRunner: {
        run: 'चलाएं',
        stop: 'रोकें',
        clear: 'साफ़ करें',
        reset: 'रीसेट करें',
        placeholder: 'कोड चलाने के लिए रन पर क्लिक करें...'
      },
      sender: {
        placeholder: 'संदेश भेजें...',
        dragTip: 'फ़ाइलें अपलोड करने के लिए छोड़ें',
        noCommands: 'No matching commands found'
      },
      thoughtChain: {
        thoughtProcess: 'विचार प्रक्रिया',
        thinking: 'सोच रहे हैं...',
        defaultTitle: 'नया कदम',
        addNode: 'कदम जोड़ें'
      },
      thinking: {
        start: 'सोचना शुरू करें',
        thinking: 'सोच रहे हैं...',
        complete: 'सोच पूर्ण',
        error: 'सोच में त्रुटि'
      },
      welcome: {
        title: 'नमस्ते, मैं YH AI हूं',
        description:
          'मैं कोडिंग, दस्तावेज़ों का अनुवाद या रचनात्मक लेखन में आपकी मदद कर सकता हूं। आज मैं आपके लिए क्या कर सकता हूं?'
      },
      action: {
        copy: 'कॉपी करें',
        regenerate: 'पुनः उत्पन्न करें',
        share: 'साझा करें',
        like: 'पसंद है',
        dislike: 'पसंद नहीं',
        edit: 'संपादित करें',
        delete: 'हटाएं'
      },
      artifacts: {
        preview: 'पूर्वावलोकन',
        inline: 'इनलाइन',
        code: 'स्रोत',
        versions: 'संस्करण',
        rendering: 'कंपोनेंट रेंडर हो रहा है...',
        renderingChart: 'चार्ट रेंडर हो रहा है...',
        renderingCanvas: 'कैनवास तैयार हो रहा है...',
        chartLoadError: 'Chart loading failed'
      },
      voice: {
        trigger: 'बोलने के लिए क्लिक करें',
        listening: 'सुन रहे हैं...'
      },
      agent: {
        uses: 'उपयोग करता है',
        use: 'अभी उपयोग करें',
        favorite: 'पसंदीदा',
        unfavorite: 'पसंदीदा हटाएं',
        share: 'साझा करें',
        online: 'ऑनलाइन',
        offline: 'ऑफ़लाइन',
        busy: 'व्यस्त',
        verified: 'सत्यापित',
        rating: 'रेटिंग',
        reviews: 'समीक्षाएं',
        responseTime: 'औसत प्रतिक्रिया समय',
        ms: 'मि.से.'
      },
      sources: {
        references: 'संदर्भ',
        referencedSources: 'संदर्भित स्रोत',
        relevant: 'प्रासंगिकता',
        viewOriginal: 'मूल देखें',
        showAll: 'सभी दिखाएं',
        more: 'और स्रोत',
        drawerTitle: 'संदर्भ',
        expandMore: 'और दिखाएं',
        collapseMore: 'संक्षिप्त करें',
        noSources: 'कोई स्रोत नहीं',
        today: 'आज',
        last7Days: 'पिछले 7 दिन',
        last30Days: 'पिछले 30 दिन',
        earlier: 'पहले',
        pinned: 'पिन किया हुआ'
      },
      conversations: {
        today: 'आज',
        last7Days: 'पिछले 7 दिन',
        last30Days: 'पिछले 30 दिन',
        earlier: 'पहले',
        pinned: 'पिन किया हुआ',
        pin: 'पिन करें',
        unpin: 'अनपिन करें',
        newConversation: 'नई बातचीत',
        noData: 'No conversations yet',
        rename: 'नाम बदलें',
        delete: 'हटाएं',
        deleteConfirm: 'इस बातचीत को हटाने की पुष्टि करें?'
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

export default hi
