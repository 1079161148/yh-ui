import type { Language } from '../index'

export const ta: Language = {
  name: 'ta',
  yh: {
    // பொதுவான
    common: {
      yes: 'ஆம்',
      no: 'இல்லை',
      confirm: 'உறுதிப்படுத்து',
      cancel: 'ரத்துசெய்',
      loading: 'ஏற்றுகிறது',
      close: 'மூடு',
      clear: 'அழிக்க',
      reset: 'மீட்டமை',
      save: 'சேமி',
      delete: 'நீக்கு',
      edit: 'திருத்து',
      add: 'சேர்',
      search: 'தேடு',
      refresh: 'புதுப்பி',
      expand: 'விரிவாக்கு',
      collapse: 'சுருக்கு',
      more: 'மேலும்',
      noData: 'தரவு இல்லை',
      noMatch: 'பொருந்தும் தரவு இல்லை',
      selectAll: 'அனைத்தையும் தேர்ந்தெடு',
      unselectAll: 'அனைத்தையும் தேர்வு நீக்கு'
    },
    // நிறம் தேர்வு
    colorpicker: {
      confirm: 'சரி',
      clear: 'அழிக்க',
      eyeDropper: 'கண் துளி',
      suggestionDark: 'வெள்ளை உரை சிறந்தது',
      suggestionLight: 'கருப்பு உரை சிறந்தது',
      recentColors: 'சமீபத்திய நிறங்கள்',
      presetColors: 'முன்னமைக்கப்பட்ட நிறங்கள்'
    },
    // தேதி தேர்வு
    datepicker: {
      now: 'இப்போது',
      today: 'இன்று',
      cancel: 'ரத்துசெய்',
      clear: 'அழிக்க',
      confirm: 'சரி',
      selectDate: 'தேதியைத் தேர்ந்தெடு',
      selectTime: 'நேரத்தைத் தேர்ந்தெடு',
      startDate: 'தொடக்க தேதி',
      startTime: 'தொடக்க நேரம்',
      endDate: 'முடிவு தேதி',
      endTime: 'முடிவு நேரம்',
      year: '',
      month: '',
      day: '',
      week: 'வாரம்',
      monthBeforeYear: true,
      prevYear: 'முந்தைய ஆண்டு',
      nextYear: 'அடுத்த ஆண்டு',
      prevMonth: 'முந்தைய மாதம்',
      nextMonth: 'அடுத்த மாதம்',
      weeks: {
        sun: 'ஞா',
        mon: 'தி',
        tue: 'செ',
        wed: 'பு',
        thu: 'வி',
        fri: 'வெ',
        sat: 'ச'
      },
      months: {
        jan: 'ஜன',
        feb: 'பிப்',
        mar: 'மார்',
        apr: 'ஏப்',
        may: 'மே',
        jun: 'ஜூன்',
        jul: 'ஜூலை',
        aug: 'ஆக',
        sep: 'செப்',
        oct: 'அக்',
        nov: 'நவ',
        dec: 'டிச'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // நேரம் தேர்வு
    timepicker: {
      confirm: 'சரி',
      cancel: 'ரத்துசெய்',
      now: 'இப்போது',
      placeholder: 'நேரத்தைத் தேர்ந்தெடு',
      startPlaceholder: 'தொடக்க நேரம்',
      endPlaceholder: 'முடிவு நேரம்',
      selectTime: 'நேரத்தைத் தேர்ந்தெடு'
    },
    // நேரம் தேர்வு
    timeselect: {
      placeholder: 'நேரத்தைத் தேர்ந்தெடு'
    },
    // மரம்
    tree: {
      emptyText: 'தரவு இல்லை',
      loading: 'ஏற்றுகிறது...',
      checkAll: 'அனைத்தையும் சரிபார்',
      uncheckAll: 'சரிபார்ப்பை நீக்கு',
      expandAll: 'அனைத்தையும் விரிவாக்கு',
      collapseAll: 'அனைத்தையும் சுருக்கு'
    },
    // மரம் தேர்வு
    treeselect: {
      placeholder: 'தேர்ந்தெடு',
      emptyText: 'தரவு இல்லை',
      loading: 'ஏற்றுகிறது...',
      noMatch: 'பொருந்தும் தரவு இல்லை'
    },
    // நாட்காட்டி
    calendar: {
      prevMonth: 'முந்தைய மாதம்',
      nextMonth: 'அடுத்த மாதம்',
      prevYear: 'முந்தைய ஆண்டு',
      nextYear: 'அடுத்த ஆண்டு',
      today: 'இன்று',
      week: 'வாரம்',
      holiday: 'விடுமுறை',
      workday: 'வேலை',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'ஞா',
        mon: 'தி',
        tue: 'செ',
        wed: 'பு',
        thu: 'வி',
        fri: 'வெ',
        sat: 'ச'
      }
    },
    // தானியங்கி நிரப்பு
    autocomplete: {
      loading: 'ஏற்றுகிறது...',
      placeholder: 'தயவுசெய்து உள்ளிடவும்',
      noData: 'தரவு இல்லை',
      noMatch: 'பொருந்தும் தரவு இல்லை'
    },
    // எதிர் எண்ணிக்கை
    countdown: {
      days: 'நாட்கள்',
      hours: 'மணிகள்',
      minutes: 'நிமிடங்கள்',
      seconds: 'வினாடிகள்',
      milliseconds: 'மில்லி வினாடிகள்',
      finished: 'முடிந்தது'
    },
    // அடுக்கு தேர்வு
    cascader: {
      noMatch: 'பொருந்தும் தரவு இல்லை',
      placeholder: 'தேர்ந்தெடு',
      loading: 'ஏற்றுகிறது...',
      noData: 'தரவு இல்லை'
    },
    // மாற்றம்
    transfer: {
      noMatch: 'பொருந்தும் தரவு இல்லை',
      noData: 'தரவு இல்லை',
      titles: ['பட்டியல் 1', 'பட்டியல் 2'],
      filterPlaceholder: 'முக்கிய சொல்லை உள்ளிடவும்',
      noCheckedFormat: '{total} உருப்படிகள்',
      hasCheckedFormat: '{checked}/{total} தேர்ந்தெடுக்கப்பட்டது',
      searchPlaceholder: 'முக்கிய சொல்லை உள்ளிடவும்'
    },
    // அட்டவணை
    table: {
      emptyText: 'தரவு இல்லை',
      confirmFilter: 'உறுதிப்படுத்து',
      resetFilter: 'மீட்டமை',
      clearFilter: 'அனைத்தும்',
      sumText: 'தொகை',
      loading: 'ஏற்றுகிறது...',
      index: 'குறியீடு',
      print: 'அச்சிடு',
      cancel: 'ரத்துசெய்',
      preview: 'அச்சு முன்னோட்டம்',
      printTime: 'அச்சு நேரம்',
      total: 'மொத்தம் {total} உருப்படிகள்',
      page: 'பக்கம் {page}',
      yes: 'ஆம்',
      no: 'இல்லை',
      // கருவிப்பட்டி
      toolbar: {
        refresh: 'புதுப்பி',
        density: 'அடர்த்தி',
        densityDefault: 'இயல்புநிலை',
        densityLarge: 'பெரியது',
        densitySmall: 'சிறியது',
        columnSetting: 'நெடுவரிசை அமைப்புகள்',
        fullscreen: 'முழுத்திரை',
        exitFullscreen: 'முழுத்திரையிலிருந்து வெளியேறு',
        export: 'ஏற்றுமதி',
        import: 'இறக்குமதி',
        search: 'தேடு',
        searchPlaceholder: 'தேடுவதற்கு முக்கிய சொற்களை உள்ளிடவும்'
      },
      // வடிகட்டி
      filter: {
        selectAll: 'அனைத்தையும் தேர்ந்தெடு',
        selectInvert: 'தேர்வை மாற்று',
        empty: 'வெற்று',
        notEmpty: 'வெற்று அல்ல',
        contains: 'கொண்டுள்ளது',
        notContains: 'கொண்டிருக்கவில்லை',
        equals: 'சமம்',
        notEquals: 'சமமல்ல',
        startsWith: 'தொடங்குகிறது',
        endsWith: 'முடிகிறது',
        greaterThan: 'அதிகமானது',
        lessThan: 'குறைவானது',
        between: 'இடையில்'
      },
      // வரிசைப்படுத்து
      sort: {
        asc: 'ஏறுவரிசை',
        desc: 'இறங்குவரிசை',
        clear: 'வரிசையை அழிக்க'
      },
      // ஏற்றுமதி
      export: {
        title: 'தரவை ஏற்றுமதி செய்',
        filename: 'கோப்பு பெயர்',
        type: 'கோப்பு வகை',
        scope: 'ஏற்றுமதி வரம்பு',
        scopeAll: 'அனைத்து தரவு',
        scopeSelected: 'தேர்ந்தெடுக்கப்பட்ட தரவு',
        scopeCurrentPage: 'தற்போதைய பக்கம்',
        includeHeader: 'தலைப்பைச் சேர்',
        exporting: 'ஏற்றுமதி செய்கிறது...',
        success: 'ஏற்றுமதி வெற்றிகரமாக',
        error: 'ஏற்றுமதி தோல்வி'
      },
      // இறக்குமதி
      import: {
        title: 'தரவை இறக்குமதி செய்',
        selectFile: 'கோப்பைத் தேர்ந்தெடு',
        dragTip: 'பதிவேற்றுவதற்கு கோப்பை இங்கே கிளிக் செய்யவும் அல்லது இழுக்கவும்',
        importing: 'இறக்குமதி செய்கிறது...',
        success: 'இறக்குமதி வெற்றிகரமாக',
        error: 'இறக்குமதி தோல்வி',
        preview: 'தரவு முன்னோட்டம்',
        confirm: 'இறக்குமதியை உறுதிப்படுத்து'
      },
      // அச்சிடு
      printConfig: {
        title: 'அச்சு அமைப்புகள்',
        pageTitle: 'பக்கம் தலைப்பு',
        pageHeader: 'தலைப்பு',
        pageFooter: 'அடிக்குறிப்பு',
        printAll: 'அனைத்தையும் அச்சிடு',
        printSelected: 'தேர்ந்தெடுக்கப்பட்டவற்றை அச்சிடு',
        printCurrentPage: 'தற்போதைய பக்கத்தை அச்சிடு',
        landscape: 'கிடைமட்ட',
        portrait: 'செங்குத்து',
        printing: 'அச்சிடுகிறது...'
      },
      // நெடுவரிசை அமைப்புகள்
      columnSetting: {
        title: 'நெடுவரிசை அமைப்புகள்',
        showAll: 'அனைத்தையும் காட்டு',
        hideAll: 'அனைத்தையும் மறை',
        reset: 'மீட்டமை',
        fixedLeft: 'இடதுபுறம் நிலையாக்கு',
        fixedRight: 'வலதுபுறம் நிலையாக்கு',
        unfixed: 'நிலையாக்கலை நீக்கு'
      },
      // சூழல் மெனு
      contextMenu: {
        copy: 'நகலெடு',
        copyRow: 'வரியை நகலெடு',
        copyCell: 'கலத்தை நகலெடு',
        paste: 'ஒட்டு',
        insertRowAbove: 'மேலே வரியைச் சேர்',
        insertRowBelow: 'கீழே வரியைச் சேர்',
        deleteRow: 'வரியை நீக்கு',
        deleteSelectedRows: 'தேர்ந்தெடுக்கப்பட்ட வரிகளை நீக்கு',
        exportSelected: 'தேர்ந்தெடுக்கப்பட்டவற்றை ஏற்றுமதி செய்'
      },
      // தேர்வு
      selection: {
        selectAll: 'அனைத்தையும் தேர்ந்தெடு',
        selectInvert: 'தேர்வை மாற்று',
        selectNone: 'தேர்வை அழிக்க',
        selected: '{count} உருப்படிகள் தேர்ந்தெடுக்கப்பட்டது'
      },
      // விரிவாக்கு
      expand: {
        expandAll: 'அனைத்தையும் விரிவாக்கு',
        collapseAll: 'அனைத்தையும் சுருக்கு'
      },
      // மரம்
      tree: {
        expandAll: 'அனைத்தையும் விரிவாக்கு',
        collapseAll: 'அனைத்தையும் சுருக்கு',
        expandLevel: 'நிலை {level} வரை விரிவாக்கு'
      },
      // இழு
      drag: {
        dragTip: 'மறுசீரமைப்பதற்கு இழுக்கவும்',
        dropTip: 'வைப்பதற்கு விடவும்'
      }
    },
    // செய்தி பெட்டி
    messagebox: {
      title: 'செய்தி',
      confirm: 'சரி',
      cancel: 'ரத்துசெய்',
      close: 'மூடு',
      error: 'செல்லாத உள்ளீடு',
      alert: 'எச்சரிக்கை',
      prompt: 'கேட்க',
      inputPlaceholder: 'தயவுசெய்து உள்ளிடவும்'
    },
    // பதிவேற்று
    upload: {
      deleteTip: 'நீக்க delete அழுத்தவும்',
      delete: 'நீக்கு',
      preview: 'முன்னோட்டம்',
      continue: 'தொடர்',
      upload: 'பதிவேற்ற கிளிக் செய்யவும்',
      tip: '<em>பதிவேற்ற</em>வதற்கு கோப்பை இந்த பகுதிக்கு கிளிக் செய்யவும் அல்லது இழுக்கவும்',
      dragTip: 'கோப்பை இங்கே விடவும் அல்லது பதிவேற்ற கிளிக் செய்யவும்',
      uploading: 'பதிவேற்றுகிறது...',
      success: 'பதிவேற்றம் வெற்றிகரமாக',
      error: 'பதிவேற்றம் தோல்வி',
      retry: 'மீண்டும் முயற்சி',
      cancel: 'பதிவேற்றத்தை ரத்துசெய்',
      fileTypeError: 'கோப்பு வகை ஆதரிக்கப்படவில்லை',
      fileSizeError: 'கோப்பு அளவு வரம்பை மீறுகிறது',
      fileCountError: 'கோப்பு எண்ணிக்கை வரம்பை மீறுகிறது'
    },
    // படிவம்
    form: {
      validationFailed: 'சரிபார்ப்பு தோல்வி',
      required: 'தேவையானது',
      pleaseInput: 'தயவுசெய்து உள்ளிடவும்',
      pleaseSelect: 'தயவுசெய்து தேர்ந்தெடுக்கவும்'
    },
    // பொத்தான்
    button: {
      loading: 'ஏற்றுகிறது...'
    },
    // உள்ளீடு
    input: {
      placeholder: 'தயவுசெய்து உள்ளிடவும்',
      clear: 'அழிக்க',
      showPassword: 'கடவுச்சொல்லைக் காட்டு',
      hidePassword: 'கடவுச்சொல்லை மறை',
      copy: 'நகலெடு',
      copied: 'நகலெடுக்கப்பட்டது'
    },
    // எண் உள்ளீடு
    inputnumber: {
      placeholder: 'தயவுசெய்து எண்ணை உள்ளிடவும்',
      increase: 'அதிகரிக்க',
      decrease: 'குறைக்க'
    },
    // குறிச்சொல் உள்ளீடு
    inputtag: {
      placeholder: 'தயவுசெய்து உள்ளிடவும்',
      add: 'சேர்',
      remove: 'நீக்கு'
    },
    // பிரெட்க்ரம்ப்
    breadcrumb: {
      label: 'பிரெட்க்ரம்ப்',
      more: 'மேலும்'
    },
    // மேலே திரும்பு
    backtop: {
      text: 'மேலே திரும்பு'
    },
    // தேர்வு
    select: {
      placeholder: 'தயவுசெய்து தேர்ந்தெடுக்கவும்',
      noData: 'தரவு இல்லை',
      loading: 'ஏற்றுகிறது...',
      noMatch: 'பொருந்தும் தரவு இல்லை',
      selectAll: 'அனைத்தையும் தேர்ந்தெடு',
      clearAll: 'அனைத்தையும் அழிக்க'
    },
    // பக்கமாக்கல்
    pagination: {
      goto: 'செல்',
      page: '',
      total: 'மொத்தம் {total}',
      pageSize: '/பக்கம்',
      prev: 'முந்தைய',
      next: 'அடுத்த',
      first: 'முதல்',
      last: 'கடைசி',
      pageClassifier: ''
    },
    // உறுதிப்படுத்தல் பாப்
    popconfirm: {
      confirm: 'சரி',
      cancel: 'ரத்துசெய்',
      dontAskAgain: 'மீண்டும் கேட்க வேண்டாம்'
    },
    // உரையாடல்
    dialog: {
      confirm: 'சரி',
      cancel: 'ரத்துசெய்',
      close: 'மூடு',
      maximize: 'பெரிதாக்கு',
      restore: 'மீட்டமை'
    },
    // இழுப்பறை
    drawer: {
      close: 'மூடு',
      confirm: 'சரி',
      cancel: 'ரத்துசெய்'
    },
    // கீழ்தோன்றும் மெனு
    dropdown: {
      loading: 'ஏற்றுகிறது...'
    },
    // படம்
    image: {
      error: 'தோல்வி',
      loading: 'ஏற்றுகிறது...',
      preview: 'முன்னோட்டம்',
      zoomIn: 'பெரிதாக்கு',
      zoomOut: 'சிறிதாக்கு',
      rotateLeft: 'இடதுபுறம் சுழற்று',
      rotateRight: 'வலதுபுறம் சுழற்று',
      originalSize: 'அசல் அளவு',
      fullscreen: 'முழுத்திரை'
    },
    // படம் காட்டி
    imageviewer: {
      close: 'மூடு',
      prev: 'முந்தைய',
      next: 'அடுத்த',
      zoomIn: 'பெரிதாக்கு',
      zoomOut: 'சிறிதாக்கு',
      rotateLeft: 'இடதுபுறம் சுழற்று',
      rotateRight: 'வலதுபுறம் சுழற்று',
      reset: 'மீட்டமை',
      fullscreen: 'முழுத்திரை',
      exitFullscreen: 'முழுத்திரையிலிருந்து வெளியேறு'
    },
    // முடிவிலா ஸ்க்ரோல்
    infinitescroll: {
      loading: 'ஏற்றுகிறது...',
      finished: 'மேலும் தரவு இல்லை',
      error: 'ஏற்றுதல் தோல்வி, மீண்டும் முயற்சிக்க கிளிக் செய்யவும்',
      retry: 'மீண்டும் முயற்சிக்க கிளிக் செய்யவும்'
    },
    // செய்தி
    message: {
      close: 'மூடு'
    },
    // அறிவிப்பு
    notification: {
      close: 'மூடு'
    },
    // ஏற்றுகிறது
    loading: {
      text: 'ஏற்றுகிறது...'
    },
    // சுழல்
    spin: {
      text: 'ஏற்றுகிறது...'
    },
    // மதிப்பீடு
    rate: {
      texts: ['மிகவும் மோசமானது', 'ஏமாற்றம்', 'நியாயமானது', 'திருப்தி', 'ஆச்சரியம்']
    },
    // எச்சரிக்கை
    alert: {
      close: 'மூடு'
    },
    // குறிச்சொல்
    tag: {
      close: 'மூடு'
    },
    // தாவல்கள்
    tabs: {
      close: 'மூடு',
      add: 'சேர்',
      more: 'மேலும்'
    },
    // படிகள்
    steps: {
      finish: 'முடிந்தது',
      process: 'நடந்து கொண்டிருக்கிறது',
      wait: 'காத்திருக்கிறது',
      error: 'பிழை'
    },
    // முன்னேற்றம்
    progress: {
      success: 'வெற்றி',
      exception: 'விதிவிலக்கு',
      warning: 'எச்சரிக்கை'
    },
    // எலும்புக்கூடு
    skeleton: {
      loading: 'ஏற்றுகிறது...'
    },
    // வெற்று
    empty: {
      description: 'தரவு இல்லை',
      noData: 'தரவு இல்லை',
      noResult: 'முடிவுகள் இல்லை',
      networkError: 'வலைப்பின்னல் பிழை',
      serverError: 'சேவையக பிழை'
    },
    // முடிவு
    result: {
      success: 'வெற்றி',
      error: 'பிழை',
      warning: 'எச்சரிக்கை',
      info: 'தகவல்',
      backHome: 'வீட்டிற்கு திரும்பு'
    },
    // நீர்வீழ்ச்சி
    waterfall: {
      loading: 'ஏற்றுகிறது...',
      noMore: 'மேலும் தரவு இல்லை',
      empty: 'தரவு இல்லை'
    },
    // விளக்கங்கள்
    descriptions: {
      colon: ':'
    },
    // ஸ்லைடர்
    slider: {
      tipFormatter: '{value}'
    },
    // சுவிட்ச்
    switch: {
      on: 'ON',
      off: 'OFF'
    },
    // சரிபார்ப்பு பெட்டி
    checkbox: {
      selectAll: 'அனைத்தையும் தேர்ந்தெடு'
    },
    // ரேடியோ
    radio: {},
    // மெனு
    menu: {
      collapse: 'மெனுவை சுருக்கு',
      expand: 'மெனுவை விரிவாக்கு'
    },
    // அட்டை
    card: {
      collapse: 'சுருக்கு',
      expand: 'விரிவாக்கு'
    },
    // சுருக்கு
    collapse: {
      expand: 'விரிவாக்கு',
      collapse: 'சுருக்கு'
    },
    // கருவி குறிப்பு
    tooltip: {},
    // பாப்ஓவர்
    popover: {},
    // பேட்ஜ்
    badge: {},
    // அவதார்
    avatar: {
      error: 'ஏற்றுதல் தோல்வி'
    },
    // நீர் அடையாளம்
    watermark: {},
    // பிரிப்பான்
    divider: {},
    // கேரசல்
    carousel: {
      prev: 'முந்தைய',
      next: 'அடுத்த'
    },
    // மார்க்கி
    marquee: {},
    // இணைப்பு
    affix: {},
    // நங்கூரம்
    anchor: {}
  }
}

export default ta
