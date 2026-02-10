import type { Language } from '../index'

export const te: Language = {
  name: 'te',
  yh: {
    // సాధారణం
    common: {
      yes: 'అవును',
      no: 'కాదు',
      confirm: 'నిర్ధారించండి',
      cancel: 'రద్దు చేయండి',
      loading: 'లోడ్ అవుతోంది',
      close: 'మూసివేయండి',
      clear: 'తొలగించండి',
      reset: 'రీసెట్ చేయండి',
      save: 'సేవ్ చేయండి',
      delete: 'తొలగించండి',
      edit: 'సవరించండి',
      add: 'జోడించండి',
      search: 'శోధించండి',
      refresh: 'రిఫ్రెష్ చేయండి',
      expand: 'విస్తరించండి',
      collapse: 'కుదించండి',
      more: 'మరిన్ని',
      noData: 'డేటా లేదు',
      noMatch: 'సరిపోలే డేటా లేదు',
      selectAll: 'అన్నీ ఎంచుకోండి',
      unselectAll: 'అన్నీ ఎంపికలను తొలగించండి'
    },
    // రంగు ఎంచుకోండి
    colorpicker: {
      confirm: 'సరే',
      clear: 'తొలగించండి',
      eyeDropper: 'కన్ను డ్రాపర్',
      suggestionDark: 'తెల్లని టెక్స్ట్ మంచిది',
      suggestionLight: 'నల్లని టెక్స్ట్ మంచిది',
      recentColors: 'ఇటీవలి రంగులు',
      presetColors: 'ముందుగా నిర్ణయించిన రంగులు'
    },
    // తేదీ ఎంచుకోండి
    datepicker: {
      now: 'ఇప్పుడు',
      today: 'ఈరోజు',
      cancel: 'రద్దు చేయండి',
      clear: 'తొలగించండి',
      confirm: 'సరే',
      selectDate: 'తేదీ ఎంచుకోండి',
      selectTime: 'సమయం ఎంచుకోండి',
      startDate: 'ప్రారంభ తేదీ',
      startTime: 'ప్రారంభ సమయం',
      endDate: 'ముగింపు తేదీ',
      endTime: 'ముగింపు సమయం',
      year: '',
      month: '',
      day: '',
      week: 'వారం',
      monthBeforeYear: true,
      prevYear: 'గత సంవత్సరం',
      nextYear: 'తర్వాతి సంవత్సరం',
      prevMonth: 'గత నెల',
      nextMonth: 'తర్వాతి నెల',
      weeks: {
        sun: 'ఆది',
        mon: 'సోమ',
        tue: 'మంగళ',
        wed: 'బుధ',
        thu: 'గురు',
        fri: 'శుక్ర',
        sat: 'శని'
      },
      months: {
        jan: 'జన',
        feb: 'ఫిబ్ర',
        mar: 'మార్చి',
        apr: 'ఏప్రి',
        may: 'మే',
        jun: 'జూన్',
        jul: 'జులై',
        aug: 'ఆగ',
        sep: 'సెప్టెం',
        oct: 'అక్టో',
        nov: 'నవం',
        dec: 'డిసెం'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // సమయం ఎంచుకోండి
    timepicker: {
      confirm: 'సరే',
      cancel: 'రద్దు చేయండి',
      now: 'ఇప్పుడు',
      placeholder: 'సమయం ఎంచుకోండి',
      startPlaceholder: 'ప్రారంభ సమయం',
      endPlaceholder: 'ముగింపు సమయం',
      selectTime: 'సమయం ఎంచుకోండి'
    },
    // సమయం ఎంపిక
    timeselect: {
      placeholder: 'సమయం ఎంచుకోండి'
    },
    // చెట్టు
    tree: {
      emptyText: 'డేటా లేదు',
      loading: 'లోడ్ అవుతోంది...',
      checkAll: 'అన్నీ తనిఖీ చేయండి',
      uncheckAll: 'అన్నీ తనిఖీలను తొలగించండి',
      expandAll: 'అన్నీ విస్తరించండి',
      collapseAll: 'అన్నీ కుదించండి'
    },
    // చెట్టు ఎంపిక
    treeselect: {
      placeholder: 'ఎంచుకోండి',
      emptyText: 'డేటా లేదు',
      loading: 'లోడ్ అవుతోంది...',
      noMatch: 'సరిపోలే డేటా లేదు'
    },
    // క్యాలెండర్
    calendar: {
      prevMonth: 'గత నెల',
      nextMonth: 'తర్వాతి నెల',
      prevYear: 'గత సంవత్సరం',
      nextYear: 'తర్వాతి సంవత్సరం',
      today: 'ఈరోజు',
      week: 'వారం',
      holiday: 'సెలవు',
      workday: 'పని',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'ఆది',
        mon: 'సోమ',
        tue: 'మంగళ',
        wed: 'బుధ',
        thu: 'గురు',
        fri: 'శుక్ర',
        sat: 'శని'
      }
    },
    // ఆటో-పూర్తి
    autocomplete: {
      loading: 'లోడ్ అవుతోంది...',
      placeholder: 'దయచేసి నమోదు చేయండి',
      noData: 'డేటా లేదు',
      noMatch: 'సరిపోలే డేటా లేదు'
    },
    // కౌంట్డౌన్
    countdown: {
      days: 'రోజులు',
      hours: 'గంటలు',
      minutes: 'నిమిషాలు',
      seconds: 'సెకన్లు',
      milliseconds: 'మిల్లీసెకన్లు',
      finished: 'పూర్తయింది'
    },
    // కాస్కేడర్
    cascader: {
      noMatch: 'సరిపోలే డేటా లేదు',
      placeholder: 'ఎంచుకోండి',
      loading: 'లోడ్ అవుతోంది...',
      noData: 'డేటా లేదు'
    },
    // బదిలీ
    transfer: {
      noMatch: 'సరిపోలే డేటా లేదు',
      noData: 'డేటా లేదు',
      titles: ['జాబితా 1', 'జాబితా 2'],
      filterPlaceholder: 'కీవర్డ్ నమోదు చేయండి',
      noCheckedFormat: '{total} అంశాలు',
      hasCheckedFormat: '{checked}/{total} ఎంచుకున్నవి',
      searchPlaceholder: 'కీవర్డ్ నమోదు చేయండి'
    },
    // పట్టిక
    table: {
      emptyText: 'డేటా లేదు',
      confirmFilter: 'నిర్ధారించండి',
      resetFilter: 'రీసెట్ చేయండి',
      clearFilter: 'అన్నీ',
      sumText: 'మొత్తం',
      loading: 'లోడ్ అవుతోంది...',
      index: 'సూచిక',
      print: 'ప్రింట్ చేయండి',
      cancel: 'రద్దు చేయండి',
      preview: 'ప్రింట్ ప్రివ్యూ',
      printTime: 'ప్రింట్ సమయం',
      total: 'మొత్తం {total} అంశాలు',
      page: 'పేజీ {page}',
      yes: 'అవును',
      no: 'కాదు',
      // టూల్బార్
      toolbar: {
        refresh: 'రిఫ్రెష్ చేయండి',
        density: 'సాంద్రత',
        densityDefault: 'డిఫాల్ట్',
        densityLarge: 'పెద్ద',
        densitySmall: 'చిన్న',
        columnSetting: 'కాలమ్ సెట్టింగ్‌లు',
        fullscreen: 'పూర్తి స్క్రీన్',
        exitFullscreen: 'పూర్తి స్క్రీన్ నుండి నిష్క్రమించండి',
        export: 'ఎగుమతి చేయండి',
        import: 'దిగుమతి చేయండి',
        search: 'శోధించండి',
        searchPlaceholder: 'శోధించడానికి కీవర్డ్‌లను నమోదు చేయండి'
      },
      // ఫిల్టర్
      filter: {
        selectAll: 'అన్నీ ఎంచుకోండి',
        selectInvert: 'ఎంపికను విలోమం చేయండి',
        empty: 'ఖాళీ',
        notEmpty: 'ఖాళీ కాదు',
        contains: 'కలిగి ఉంది',
        notContains: 'కలిగి లేదు',
        equals: 'సమానం',
        notEquals: 'సమానం కాదు',
        startsWith: 'తో మొదలవుతుంది',
        endsWith: 'తో ముగుస్తుంది',
        greaterThan: 'కంటే ఎక్కువ',
        lessThan: 'కంటే తక్కువ',
        between: 'మధ్య'
      },
      // క్రమబద్ధీకరణ
      sort: {
        asc: 'ఆరోహణ',
        desc: 'అవరోహణ',
        clear: 'క్రమబద్ధీకరణను తొలగించండి'
      },
      // ఎగుమతి
      export: {
        title: 'డేటాను ఎగుమతి చేయండి',
        filename: 'ఫైల్ పేరు',
        type: 'ఫైల్ రకం',
        scope: 'ఎగుమతి పరిధి',
        scopeAll: 'అన్ని డేటా',
        scopeSelected: 'ఎంచుకున్న డేటా',
        scopeCurrentPage: 'ప్రస్తుత పేజీ',
        includeHeader: 'హెడర్‌ను చేర్చండి',
        exporting: 'ఎగుమతి అవుతోంది...',
        success: 'ఎగుమతి విజయవంతమైంది',
        error: 'ఎగుమతి విఫలమైంది'
      },
      // దిగుమతి
      import: {
        title: 'డేటాను దిగుమతి చేయండి',
        selectFile: 'ఫైల్ ఎంచుకోండి',
        dragTip: 'అప్‌లోడ్ చేయడానికి ఫైల్‌ను ఇక్కడ క్లిక్ చేయండి లేదా లాగండి',
        importing: 'దిగుమతి అవుతోంది...',
        success: 'దిగుమతి విజయవంతమైంది',
        error: 'దిగుమతి విఫలమైంది',
        preview: 'డేటా ప్రివ్యూ',
        confirm: 'దిగుమతిని నిర్ధారించండి'
      },
      // ప్రింట్
      printConfig: {
        title: 'ప్రింట్ సెట్టింగ్‌లు',
        pageTitle: 'పేజీ శీర్షిక',
        pageHeader: 'హెడర్',
        pageFooter: 'ఫుటర్',
        printAll: 'అన్నీ ప్రింట్ చేయండి',
        printSelected: 'ఎంచుకున్నవి ప్రింట్ చేయండి',
        printCurrentPage: 'ప్రస్తుత పేజీని ప్రింట్ చేయండి',
        landscape: 'ల్యాండ్‌స్కేప్',
        portrait: 'పోర్ట్రెయిట్',
        printing: 'ప్రింట్ అవుతోంది...'
      },
      // కాలమ్ సెట్టింగ్‌లు
      columnSetting: {
        title: 'కాలమ్ సెట్టింగ్‌లు',
        showAll: 'అన్నీ చూపించండి',
        hideAll: 'అన్నీ దాచండి',
        reset: 'రీసెట్ చేయండి',
        fixedLeft: 'ఎడమకు స్థిరపరచండి',
        fixedRight: 'కుడికి స్థిరపరచండి',
        unfixed: 'స్థిరపరచడాన్ని తొలగించండి'
      },
      // కాంటెక్స్ట్ మెనూ
      contextMenu: {
        copy: 'కాపీ చేయండి',
        copyRow: 'వరుసను కాపీ చేయండి',
        copyCell: 'సెల్‌ను కాపీ చేయండి',
        paste: 'అతికించండి',
        insertRowAbove: 'పైన వరుసను చేర్చండి',
        insertRowBelow: 'క్రింద వరుసను చేర్చండి',
        deleteRow: 'వరుసను తొలగించండి',
        deleteSelectedRows: 'ఎంచుకున్న వరుసలను తొలగించండి',
        exportSelected: 'ఎంచుకున్నవి ఎగుమతి చేయండి'
      },
      // ఎంపిక
      selection: {
        selectAll: 'అన్నీ ఎంచుకోండి',
        selectInvert: 'ఎంపికను విలోమం చేయండి',
        selectNone: 'ఎంపికను తొలగించండి',
        selected: '{count} అంశాలు ఎంచుకున్నవి'
      },
      // విస్తరణ
      expand: {
        expandAll: 'అన్నీ విస్తరించండి',
        collapseAll: 'అన్నీ కుదించండి'
      },
      // చెట్టు
      tree: {
        expandAll: 'అన్నీ విస్తరించండి',
        collapseAll: 'అన్నీ కుదించండి',
        expandLevel: 'స్థాయి {level} వరకు విస్తరించండి'
      },
      // లాగండి
      drag: {
        dragTip: 'మళ్లీ క్రమబద్ధీకరించడానికి లాగండి',
        dropTip: 'ఉంచడానికి వదలండి'
      }
    },
    // సందేశ పెట్టె
    messagebox: {
      title: 'సందేశం',
      confirm: 'సరే',
      cancel: 'రద్దు చేయండి',
      close: 'మూసివేయండి',
      error: 'చట్టవిరుద్ధమైన ఇన్‌పుట్',
      alert: 'హెచ్చరిక',
      prompt: 'ప్రాంప్ట్',
      inputPlaceholder: 'దయచేసి నమోదు చేయండి'
    },
    // అప్‌లోడ్
    upload: {
      deleteTip: 'తొలగించడానికి delete నొక్కండి',
      delete: 'తొలగించండి',
      preview: 'ప్రివ్యూ',
      continue: 'కొనసాగించండి',
      upload: 'అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి',
      tip: '<em>అప్‌లోడ్</em> చేయడానికి ఫైల్‌ను ఈ ప్రాంతానికి క్లిక్ చేయండి లేదా లాగండి',
      dragTip: 'ఫైల్‌ను ఇక్కడ వదలండి లేదా అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి',
      uploading: 'అప్‌లోడ్ అవుతోంది...',
      success: 'అప్‌లోడ్ విజయవంతమైంది',
      error: 'అప్‌లోడ్ విఫలమైంది',
      retry: 'మళ్లీ ప్రయత్నించండి',
      cancel: 'అప్‌లోడ్‌ను రద్దు చేయండి',
      fileTypeError: 'ఫైల్ రకం మద్దతు లేదు',
      fileSizeError: 'ఫైల్ పరిమాణం పరిమితిని మించింది',
      fileCountError: 'ఫైల్ సంఖ్య పరిమితిని మించింది'
    },
    // ఫారమ్
    form: {
      validationFailed: 'ధృవీకరణ విఫలమైంది',
      required: 'అవసరం',
      pleaseInput: 'దయచేసి నమోదు చేయండి',
      pleaseSelect: 'దయచేసి ఎంచుకోండి'
    },
    // బటన్
    button: {
      loading: 'లోడ్ అవుతోంది...'
    },
    // ఇన్‌పుట్
    input: {
      placeholder: 'దయచేసి నమోదు చేయండి',
      clear: 'తొలగించండి',
      showPassword: 'పాస్‌వర్డ్ చూపించండి',
      hidePassword: 'పాస్‌వర్డ్ దాచండి',
      copy: 'కాపీ చేయండి',
      copied: 'కాపీ చేయబడింది'
    },
    // సంఖ్య ఇన్‌పుట్
    inputnumber: {
      placeholder: 'దయచేసి సంఖ్యను నమోదు చేయండి',
      increase: 'పెంచండి',
      decrease: 'తగ్గించండి'
    },
    // ట్యాగ్ ఇన్‌పుట్
    inputtag: {
      placeholder: 'దయచేసి నమోదు చేయండి',
      add: 'జోడించండి',
      remove: 'తొలగించండి'
    },
    // బ్రెడ్‌క్రంబ్
    breadcrumb: {
      label: 'బ్రెడ్‌క్రంబ్',
      more: 'మరిన్ని'
    },
    // పైకి తిరిగి వెళ్ళండి
    backtop: {
      text: 'పైకి తిరిగి వెళ్ళండి'
    },
    // ఎంచుకోండి
    select: {
      placeholder: 'దయచేసి ఎంచుకోండి',
      noData: 'డేటా లేదు',
      loading: 'లోడ్ అవుతోంది...',
      noMatch: 'సరిపోలే డేటా లేదు',
      selectAll: 'అన్నీ ఎంచుకోండి',
      clearAll: 'అన్నీ తొలగించండి'
    },
    // పేజినేషన్
    pagination: {
      goto: 'వెళ్ళండి',
      page: '',
      total: 'మొత్తం {total}',
      pageSize: '/పేజీ',
      prev: 'మునుపటి',
      next: 'తర్వాతి',
      first: 'మొదటి',
      last: 'చివరి',
      pageClassifier: ''
    },
    // పాప్‌కన్‌ఫర్మ్
    popconfirm: {
      confirm: 'సరే',
      cancel: 'రద్దు చేయండి',
      dontAskAgain: 'మళ్లీ అడగవద్దు'
    },
    // డైలాగ్
    dialog: {
      confirm: 'సరే',
      cancel: 'రద్దు చేయండి',
      close: 'మూసివేయండి',
      maximize: 'గరిష్ఠం చేయండి',
      restore: 'పునరుద్ధరించండి'
    },
    // డ్రాయర్
    drawer: {
      close: 'మూసివేయండి',
      confirm: 'సరే',
      cancel: 'రద్దు చేయండి'
    },
    // డ్రాప్‌డౌన్
    dropdown: {
      loading: 'లోడ్ అవుతోంది...'
    },
    // చిత్రం
    image: {
      error: 'విఫలమైంది',
      loading: 'లోడ్ అవుతోంది...',
      preview: 'ప్రివ్యూ',
      zoomIn: 'జూమ్ ఇన్',
      zoomOut: 'జూమ్ అవుట్',
      rotateLeft: 'ఎడమకు తిప్పండి',
      rotateRight: 'కుడికి తిప్పండి',
      originalSize: 'అసలు పరిమాణం',
      fullscreen: 'పూర్తి స్క్రీన్'
    },
    // చిత్ర వీక్షకుడు
    imageviewer: {
      close: 'మూసివేయండి',
      prev: 'మునుపటి',
      next: 'తర్వాతి',
      zoomIn: 'జూమ్ ఇన్',
      zoomOut: 'జూమ్ అవుట్',
      rotateLeft: 'ఎడమకు తిప్పండి',
      rotateRight: 'కుడికి తిప్పండి',
      reset: 'రీసెట్ చేయండి',
      fullscreen: 'పూర్తి స్క్రీన్',
      exitFullscreen: 'పూర్తి స్క్రీన్ నుండి నిష్క్రమించండి'
    },
    // అనంత స్క్రోల్
    infinitescroll: {
      loading: 'లోడ్ అవుతోంది...',
      finished: 'మరిన్ని డేటా లేదు',
      error: 'లోడ్ విఫలమైంది, మళ్లీ ప్రయత్నించడానికి క్లిక్ చేయండి',
      retry: 'మళ్లీ ప్రయత్నించడానికి క్లిక్ చేయండి'
    },
    // సందేశం
    message: {
      close: 'మూసివేయండి'
    },
    // నోటిఫికేషన్
    notification: {
      close: 'మూసివేయండి'
    },
    // లోడింగ్
    loading: {
      text: 'లోడ్ అవుతోంది...'
    },
    // స్పిన్
    spin: {
      text: 'లోడ్ అవుతోంది...'
    },
    // రేట్
    rate: {
      texts: ['చాలా చెడ్డది', 'నిరాశ', 'సరసమైనది', 'సంతృప్తి', 'ఆశ్చర్యం']
    },
    // హెచ్చరిక
    alert: {
      close: 'మూసివేయండి'
    },
    // ట్యాగ్
    tag: {
      close: 'మూసివేయండి'
    },
    // ట్యాబ్‌లు
    tabs: {
      close: 'మూసివేయండి',
      add: 'జోడించండి',
      more: 'మరిన్ని'
    },
    // దశలు
    steps: {
      finish: 'పూర్తయింది',
      process: 'ప్రగతిలో ఉంది',
      wait: 'వేచి ఉంది',
      error: 'దోషం'
    },
    // ప్రగతి
    progress: {
      success: 'విజయం',
      exception: 'అసాధారణం',
      warning: 'హెచ్చరిక'
    },
    // స్కెలిటన్
    skeleton: {
      loading: 'లోడ్ అవుతోంది...'
    },
    // ఖాళీ
    empty: {
      description: 'డేటా లేదు',
      noData: 'డేటా లేదు',
      noResult: 'ఫలితాలు లేవు',
      networkError: 'నెట్‌వర్క్ దోషం',
      serverError: 'సర్వర్ దోషం'
    },
    // ఫలితం
    result: {
      success: 'విజయం',
      error: 'దోషం',
      warning: 'హెచ్చరిక',
      info: 'సమాచారం',
      backHome: 'హోమ్‌కు తిరిగి వెళ్ళండి'
    },
    // వాటర్‌ఫాల్
    waterfall: {
      loading: 'లోడ్ అవుతోంది...',
      noMore: 'మరిన్ని డేటా లేదు',
      empty: 'డేటా లేదు'
    },
    // వివరణలు
    descriptions: {
      colon: ':'
    },
    // స్లైడర్
    slider: {
      tipFormatter: '{value}'
    },
    // స్విచ్
    switch: {
      on: 'ఆన్',
      off: 'ఆఫ్'
    },
    // చెక్‌బాక్స్
    checkbox: {
      selectAll: 'అన్నీ ఎంచుకోండి'
    },
    // రేడియో
    radio: {},
    // మెనూ
    menu: {
      collapse: 'మెనూను కుదించండి',
      expand: 'మెనూను విస్తరించండి'
    },
    // కార్డ్
    card: {
      collapse: 'కుదించండి',
      expand: 'విస్తరించండి'
    },
    // కుదించడం
    collapse: {
      expand: 'విస్తరించండి',
      collapse: 'కుదించండి'
    },
    // టూల్‌టిప్
    tooltip: {},
    // పాప్‌ఓవర్
    popover: {},
    // బ్యాడ్జ్
    badge: {},
    // అవతార్
    avatar: {
      error: 'లోడ్ విఫలమైంది'
    },
    // వాటర్‌మార్క్
    watermark: {},
    // డివైడర్
    divider: {},
    // కారసెల్
    carousel: {
      prev: 'మునుపటి',
      next: 'తర్వాతి'
    },
    // మార్కీ
    marquee: {},
    // అఫిక్స్
    affix: {},
    // యాంకర్
    anchor: {}
  }
}

export default te
