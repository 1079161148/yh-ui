import type { Language } from '../index'

export const hi: Language = {
  name: 'hi',
  yh: {
    // सामान्य
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
    // रंग चयनकर्ता
    colorpicker: {
      confirm: 'ठीक है',
      clear: 'साफ़ करें',
      eyeDropper: 'आई ड्रॉपर',
      suggestionDark: 'सफेद टेक्स्ट बेहतर है',
      suggestionLight: 'काला टेक्स्ट बेहतर है',
      recentColors: 'हाल के रंग',
      presetColors: 'प्रीसेट रंग'
    },
    // दिनांक चयनकर्ता
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
    // समय चयनकर्ता
    timepicker: {
      confirm: 'ठीक है',
      cancel: 'रद्द करें',
      now: 'अभी',
      placeholder: 'समय चुनें',
      startPlaceholder: 'प्रारंभ समय',
      endPlaceholder: 'समाप्ति समय',
      selectTime: 'समय चुनें'
    },
    // समय चयन
    timeselect: {
      placeholder: 'समय चुनें'
    },
    // वृक्ष
    tree: {
      emptyText: 'कोई डेटा नहीं',
      loading: 'लोड हो रहा है...',
      checkAll: 'सभी चुनें',
      uncheckAll: 'सभी का चयन हटाएं',
      expandAll: 'सभी विस्तार करें',
      collapseAll: 'सभी संक्षिप्त करें'
    },
    // वृक्ष चयनकर्ता
    treeselect: {
      placeholder: 'चुनें',
      emptyText: 'कोई डेटा नहीं',
      loading: 'लोड हो रहा है...',
      noMatch: 'कोई मेल नहीं'
    },
    // कैलेंडर
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
    // ऑटो-पूर्ण
    autocomplete: {
      loading: 'लोड हो रहा है...',
      placeholder: 'कृपया दर्ज करें',
      noData: 'कोई डेटा नहीं',
      noMatch: 'कोई मेल नहीं'
    },
    // उलटी गिनती
    countdown: {
      days: 'दिन',
      hours: 'घंटे',
      minutes: 'मिनट',
      seconds: 'सेकंड',
      milliseconds: 'मिलीसेकंड',
      finished: 'समाप्त'
    },
    // कैस्केडर
    cascader: {
      noMatch: 'कोई मेल नहीं',
      placeholder: 'चुनें',
      loading: 'लोड हो रहा है...',
      noData: 'कोई डेटा नहीं'
    },
    // स्थानांतरण
    transfer: {
      noMatch: 'कोई मेल नहीं',
      noData: 'कोई डेटा नहीं',
      titles: ['सूची 1', 'सूची 2'],
      filterPlaceholder: 'कीवर्ड दर्ज करें',
      noCheckedFormat: '{total} आइटम',
      hasCheckedFormat: '{checked}/{total} चयनित',
      searchPlaceholder: 'कीवर्ड दर्ज करें'
    },
    // तालिका
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
      // टूलबार
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
      // फ़िल्टर
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
      // सॉर्ट
      sort: {
        asc: 'आरोही',
        desc: 'अवरोही',
        clear: 'सॉर्ट साफ़ करें'
      },
      // निर्यात
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
      // आयात
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
      // प्रिंट
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
      // कॉलम सेटिंग्स
      columnSetting: {
        title: 'कॉलम सेटिंग्स',
        showAll: 'सभी दिखाएं',
        hideAll: 'सभी छुपाएं',
        reset: 'रीसेट करें',
        fixedLeft: 'बाएं फिक्स करें',
        fixedRight: 'दाएं फिक्स करें',
        unfixed: 'अनफिक्स करें'
      },
      // संदर्भ मेनू
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
      // चयन
      selection: {
        selectAll: 'सभी चुनें',
        selectInvert: 'चयन उलटें',
        selectNone: 'चयन साफ़ करें',
        selected: '{count} आइटम चयनित'
      },
      // विस्तार
      expand: {
        expandAll: 'सभी विस्तार करें',
        collapseAll: 'सभी संक्षिप्त करें'
      },
      // वृक्ष
      tree: {
        expandAll: 'सभी विस्तार करें',
        collapseAll: 'सभी संक्षिप्त करें',
        expandLevel: 'स्तर {level} तक विस्तार करें'
      },
      // खींचें
      drag: {
        dragTip: 'पुनर्व्यवस्थित करने के लिए खींचें',
        dropTip: 'रखने के लिए छोड़ें'
      }
    },
    // संदेश बॉक्स
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
    // अपलोड
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
    // फॉर्म
    form: {
      validationFailed: 'सत्यापन विफल',
      required: 'आवश्यक',
      pleaseInput: 'कृपया दर्ज करें',
      pleaseSelect: 'कृपया चुनें'
    },
    // बटन
    button: {
      loading: 'लोड हो रहा है...'
    },
    // इनपुट
    input: {
      placeholder: 'कृपया दर्ज करें',
      clear: 'साफ़ करें',
      showPassword: 'पासवर्ड दिखाएं',
      hidePassword: 'पासवर्ड छुपाएं',
      copy: 'कॉपी करें',
      copied: 'कॉपी किया गया'
    },
    // संख्या इनपुट
    inputnumber: {
      placeholder: 'कृपया संख्या दर्ज करें',
      increase: 'बढ़ाएं',
      decrease: 'घटाएं'
    },
    // टैग इनपुट
    inputtag: {
      placeholder: 'कृपया दर्ज करें',
      add: 'जोड़ें',
      remove: 'हटाएं'
    },
    // ब्रेडक्रंब
    breadcrumb: {
      label: 'ब्रेडक्रंब',
      more: 'अधिक'
    },
    // शीर्ष पर वापस जाएं
    backtop: {
      text: 'शीर्ष पर वापस जाएं'
    },
    // चयन
    select: {
      placeholder: 'कृपया चुनें',
      noData: 'कोई डेटा नहीं',
      loading: 'लोड हो रहा है...',
      noMatch: 'कोई मेल नहीं',
      selectAll: 'सभी चुनें',
      clearAll: 'सभी साफ़ करें'
    },
    // पृष्ठांकन
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
    // पॉप कन्फर्म
    popconfirm: {
      confirm: 'ठीक है',
      cancel: 'रद्द करें',
      dontAskAgain: 'फिर मत पूछो'
    },
    // डायलॉग
    dialog: {
      confirm: 'ठीक है',
      cancel: 'रद्द करें',
      close: 'बंद करें',
      maximize: 'अधिकतम करें',
      restore: 'पुनर्स्थापित करें'
    },
    // ड्रॉअर
    drawer: {
      close: 'बंद करें',
      confirm: 'ठीक है',
      cancel: 'रद्द करें'
    },
    // ड्रॉपडाउन
    dropdown: {
      loading: 'लोड हो रहा है...'
    },
    // छवि
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
    // छवि व्यूअर
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
    // अनंत स्क्रॉल
    infinitescroll: {
      loading: 'लोड हो रहा है...',
      finished: 'और डेटा नहीं है',
      error: 'लोड त्रुटि, पुनः प्रयास के लिए क्लिक करें',
      retry: 'पुनः प्रयास के लिए क्लिक करें'
    },
    // संदेश
    message: {
      close: 'बंद करें'
    },
    // सूचना
    notification: {
      close: 'बंद करें'
    },
    // लोडिंग
    loading: {
      text: 'लोड हो रहा है...'
    },
    // स्पिन
    spin: {
      text: 'लोड हो रहा है...'
    },
    // रेटिंग
    rate: {
      texts: ['बहुत खराब', 'निराश', 'ठीक', 'संतुष्ट', 'आश्चर्यित']
    },
    // चेतावनी
    alert: {
      close: 'बंद करें'
    },
    // टैग
    tag: {
      close: 'बंद करें'
    },
    // टैब्स
    tabs: {
      close: 'बंद करें',
      add: 'जोड़ें',
      more: 'अधिक'
    },
    // स्टेप्स
    steps: {
      finish: 'समाप्त',
      process: 'प्रगति में',
      wait: 'प्रतीक्षा',
      error: 'त्रुटि'
    },
    // प्रगति
    progress: {
      success: 'सफल',
      exception: 'अपवाद',
      warning: 'चेतावनी'
    },
    // स्केलेटन
    skeleton: {
      loading: 'लोड हो रहा है...'
    },
    // खाली
    empty: {
      description: 'कोई डेटा नहीं',
      noData: 'कोई डेटा नहीं',
      noResult: 'कोई परिणाम नहीं',
      networkError: 'नेटवर्क त्रुटि',
      serverError: 'सर्वर त्रुटि'
    },
    // परिणाम
    result: {
      success: 'सफल',
      error: 'त्रुटि',
      warning: 'चेतावनी',
      info: 'जानकारी',
      backHome: 'होम पर वापस जाएं'
    },
    // वॉटरफॉल
    waterfall: {
      loading: 'लोड हो रहा है...',
      noMore: 'और डेटा नहीं है',
      empty: 'कोई डेटा नहीं'
    },
    // विवरण
    descriptions: {
      colon: ':'
    },
    // स्लाइडर
    slider: {
      tipFormatter: '{value}'
    },
    // स्विच
    switch: {
      on: 'चालू',
      off: 'बंद'
    },
    // चेकबॉक्स
    checkbox: {
      selectAll: 'सभी चुनें'
    },
    // रेडियो
    radio: {},
    // मेनू
    menu: {
      collapse: 'मेनू संक्षिप्त करें',
      expand: 'मेनू विस्तार करें'
    },
    // कार्ड
    card: {
      collapse: 'संक्षिप्त करें',
      expand: 'विस्तार करें'
    },
    // कोलैप्स
    collapse: {
      expand: 'विस्तार करें',
      collapse: 'संक्षिप्त करें'
    },
    // टूलटिप
    tooltip: {},
    // पॉपओवर
    popover: {},
    // बैज
    badge: {},
    // अवतार
    avatar: {
      error: 'लोड त्रुटि'
    },
    // वॉटरमार्क
    watermark: {},
    // विभाजक
    divider: {},
    // कैरोसेल
    carousel: {
      prev: 'पिछला',
      next: 'अगला'
    },
    // मार्की
    marquee: {},
    // एफिक्स
    affix: {},
    // एंकर
    anchor: {}
  }
}

export default hi
