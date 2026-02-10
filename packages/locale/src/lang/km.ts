import type { Language } from '../index'

export const km: Language = {
  name: 'km',
  yh: {
    // ទូទៅ
    common: {
      yes: 'បាទ',
      no: 'ទេ',
      confirm: 'បញ្ជាក់',
      cancel: 'បោះបង់',
      loading: 'កំពុងផ្ទុក',
      close: 'បិទ',
      clear: 'សម្អាត',
      reset: 'កំណត់ឡើងវិញ',
      save: 'រក្សាទុក',
      delete: 'លុប',
      edit: 'កែប្រែ',
      add: 'បន្ថែម',
      search: 'ស្វែងរក',
      refresh: 'ធ្វើឱ្យស្រស់',
      expand: 'ពង្រីក',
      collapse: 'បង្រួម',
      more: 'បន្ថែមទៀត',
      noData: 'គ្មានទិន្នន័យ',
      noMatch: 'គ្មានទិន្នន័យដែលត្រូវគ្នា',
      selectAll: 'ជ្រើសរើសទាំងអស់',
      unselectAll: 'លុបការជ្រើសរើសទាំងអស់'
    },
    // កម្មវិធីជ្រើសរើសពណ៌
    colorpicker: {
      confirm: 'យល់ព្រម',
      clear: 'សម្អាត',
      eyeDropper: 'ឧបករណ៍ជ្រើសពណ៌',
      suggestionDark: 'អត្ថបទស គឺល្អបំផុត',
      suggestionLight: 'អត្ថបទខ្មៅ គឺល្អបំផុត',
      recentColors: 'ពណ៌ថ្មីៗ',
      presetColors: 'ពណ៌ដែលកំណត់ជាមុន'
    },
    // កម្មវិធីជ្រើសរើសកាលបរិច្ឆេទ
    datepicker: {
      now: 'ឥឡូវ',
      today: 'ថ្ងៃនេះ',
      cancel: 'បោះបង់',
      clear: 'សម្អាត',
      confirm: 'យល់ព្រម',
      selectDate: 'ជ្រើសរើសកាលបរិច្ឆេទ',
      selectTime: 'ជ្រើសរើសពេលវេលា',
      startDate: 'កាលបរិច្ឆេទចាប់ផ្តើម',
      startTime: 'ពេលវេលាចាប់ផ្តើម',
      endDate: 'កាលបរិច្ឆេទបញ្ចប់',
      endTime: 'ពេលវេលាបញ្ចប់',
      year: '',
      month: '',
      day: '',
      week: 'សប្តាហ៍',
      monthBeforeYear: true,
      prevYear: 'ឆ្នាំមុន',
      nextYear: 'ឆ្នាំបន្ទាប់',
      prevMonth: 'ខែមុន',
      nextMonth: 'ខែបន្ទាប់',
      weeks: {
        sun: 'អាទិត្យ',
        mon: 'ច័ន្ទ',
        tue: 'អង្គារ',
        wed: 'ពុធ',
        thu: 'ព្រហស្បតិ៍',
        fri: 'សុក្រ',
        sat: 'សៅរ៍'
      },
      months: {
        jan: 'មករា',
        feb: 'កុម្ភៈ',
        mar: 'មីនា',
        apr: 'មេសា',
        may: 'ឧសភា',
        jun: 'មិថុនា',
        jul: 'កក្កដា',
        aug: 'សីហា',
        sep: 'កញ្ញា',
        oct: 'តុលា',
        nov: 'វិច្ឆិកា',
        dec: 'ធ្នូ'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // កម្មវិធីជ្រើសរើសពេលវេលា
    timepicker: {
      confirm: 'យល់ព្រម',
      cancel: 'បោះបង់',
      now: 'ឥឡូវ',
      placeholder: 'ជ្រើសរើសពេលវេលា',
      startPlaceholder: 'ពេលវេលាចាប់ផ្តើម',
      endPlaceholder: 'ពេលវេលាបញ្ចប់',
      selectTime: 'ជ្រើសរើសពេលវេលា'
    },
    // ការជ្រើសរើសពេលវេលា
    timeselect: {
      placeholder: 'ជ្រើសរើសពេលវេលា'
    },
    // ដើមឈើ
    tree: {
      emptyText: 'គ្មានទិន្នន័យ',
      loading: 'កំពុងផ្ទុក...',
      checkAll: 'ពិនិត្យទាំងអស់',
      uncheckAll: 'លុបការពិនិត្យទាំងអស់',
      expandAll: 'ពង្រីកទាំងអស់',
      collapseAll: 'បង្រួមទាំងអស់'
    },
    // ការជ្រើសរើសដើមឈើ
    treeselect: {
      placeholder: 'ជ្រើសរើស',
      emptyText: 'គ្មានទិន្នន័យ',
      loading: 'កំពុងផ្ទុក...',
      noMatch: 'គ្មានទិន្នន័យដែលត្រូវគ្នា'
    },
    // ប្រតិទិន
    calendar: {
      prevMonth: 'ខែមុន',
      nextMonth: 'ខែបន្ទាប់',
      prevYear: 'ឆ្នាំមុន',
      nextYear: 'ឆ្នាំបន្ទាប់',
      today: 'ថ្ងៃនេះ',
      week: 'សប្តាហ៍',
      holiday: 'ថ្ងៃឈប់សម្រាក',
      workday: 'ការងារ',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'អាទិត្យ',
        mon: 'ច័ន្ទ',
        tue: 'អង្គារ',
        wed: 'ពុធ',
        thu: 'ព្រហស្បតិ៍',
        fri: 'សុក្រ',
        sat: 'សៅរ៍'
      }
    },
    // បំពេញស្វ័យប្រវត្តិ
    autocomplete: {
      loading: 'កំពុងផ្ទុក...',
      placeholder: 'សូមបញ្ចូល',
      noData: 'គ្មានទិន្នន័យ',
      noMatch: 'គ្មានទិន្នន័យដែលត្រូវគ្នា'
    },
    // រាប់ថយក្រោយ
    countdown: {
      days: 'ថ្ងៃ',
      hours: 'ម៉ោង',
      minutes: 'នាទី',
      seconds: 'វិនាទី',
      milliseconds: 'មីលីវិនាទី',
      finished: 'បានបញ្ចប់'
    },
    // កម្មវិធីជ្រើសរើសជាកាត់
    cascader: {
      noMatch: 'គ្មានទិន្នន័យដែលត្រូវគ្នា',
      placeholder: 'ជ្រើសរើស',
      loading: 'កំពុងផ្ទុក...',
      noData: 'គ្មានទិន្នន័យ'
    },
    // ផ្ទេរ
    transfer: {
      noMatch: 'គ្មានទិន្នន័យដែលត្រូវគ្នា',
      noData: 'គ្មានទិន្នន័យ',
      titles: ['បញ្ជី ១', 'បញ្ជី ២'],
      filterPlaceholder: 'បញ្ចូលពាក្យគន្លឹះ',
      noCheckedFormat: '{total} ធាតុ',
      hasCheckedFormat: '{checked}/{total} បានជ្រើសរើស',
      searchPlaceholder: 'បញ្ចូលពាក្យគន្លឹះ'
    },
    // តារាង
    table: {
      emptyText: 'គ្មានទិន្នន័យ',
      confirmFilter: 'បញ្ជាក់',
      resetFilter: 'កំណត់ឡើងវិញ',
      clearFilter: 'ទាំងអស់',
      sumText: 'ផលបូក',
      loading: 'កំពុងផ្ទុក...',
      index: 'លិបិក្រម',
      print: 'បោះពុម្ព',
      cancel: 'បោះបង់',
      preview: 'មើលជាមុនការបោះពុម្ព',
      printTime: 'ពេលវេលាបោះពុម្ព',
      total: 'សរុប {total} ធាតុ',
      page: 'ទំព័រ {page}',
      yes: 'បាទ',
      no: 'ទេ',
      // របារឧបករណ៍
      toolbar: {
        refresh: 'ធ្វើឱ្យស្រស់',
        density: 'ដង់ស៊ីតេ',
        densityDefault: 'លំនាំដើម',
        densityLarge: 'ធំ',
        densitySmall: 'តូច',
        columnSetting: 'ការកំណត់ជួរឈរ',
        fullscreen: 'អេក្រង់ពេញ',
        exitFullscreen: 'ចេញពីអេក្រង់ពេញ',
        export: 'នាំចេញ',
        import: 'នាំចូល',
        search: 'ស្វែងរក',
        searchPlaceholder: 'បញ្ចូលពាក្យគន្លឹះដើម្បីស្វែងរក'
      },
      // តម្រង
      filter: {
        selectAll: 'ជ្រើសរើសទាំងអស់',
        selectInvert: 'បញ្ច្រាសការជ្រើសរើស',
        empty: 'ទទេ',
        notEmpty: 'មិនទទេ',
        contains: 'មាន',
        notContains: 'គ្មាន',
        equals: 'ស្មើ',
        notEquals: 'មិនស្មើ',
        startsWith: 'ចាប់ផ្តើមដោយ',
        endsWith: 'បញ្ចប់ដោយ',
        greaterThan: 'ធំជាង',
        lessThan: 'តូចជាង',
        between: 'រវាង'
      },
      // រៀបចំ
      sort: {
        asc: 'ឡើង',
        desc: 'ចុះ',
        clear: 'សម្អាតការរៀបចំ'
      },
      // នាំចេញ
      export: {
        title: 'នាំចេញទិន្នន័យ',
        filename: 'ឈ្មោះឯកសារ',
        type: 'ប្រភេទឯកសារ',
        scope: 'វិសាលភាពនាំចេញ',
        scopeAll: 'ទិន្នន័យទាំងអស់',
        scopeSelected: 'ទិន្នន័យដែលបានជ្រើសរើស',
        scopeCurrentPage: 'ទំព័របច្ចុប្បន្ន',
        includeHeader: 'រួមបញ្ចូលក្បាល',
        exporting: 'កំពុងនាំចេញ...',
        success: 'ការនាំចេញជោគជ័យ',
        error: 'ការនាំចេញបរាជ័យ'
      },
      // នាំចូល
      import: {
        title: 'នាំចូលទិន្នន័យ',
        selectFile: 'ជ្រើសរើសឯកសារ',
        dragTip: 'ចុច ឬទាញឯកសារទៅទីនេះដើម្បីផ្ទុកឡើង',
        importing: 'កំពុងនាំចូល...',
        success: 'ការនាំចូលជោគជ័យ',
        error: 'ការនាំចូលបរាជ័យ',
        preview: 'មើលជាមុនទិន្នន័យ',
        confirm: 'បញ្ជាក់ការនាំចូល'
      },
      // បោះពុម្ព
      printConfig: {
        title: 'ការកំណត់បោះពុម្ព',
        pageTitle: 'ចំណងជើងទំព័រ',
        pageHeader: 'ក្បាល',
        pageFooter: 'ក្រោម',
        printAll: 'បោះពុម្ពទាំងអស់',
        printSelected: 'បោះពុម្ពដែលបានជ្រើសរើស',
        printCurrentPage: 'បោះពុម្ពទំព័របច្ចុប្បន្ន',
        landscape: 'ផ្តេក',
        portrait: 'បញ្ឈរ',
        printing: 'កំពុងបោះពុម្ព...'
      },
      // ការកំណត់ជួរឈរ
      columnSetting: {
        title: 'ការកំណត់ជួរឈរ',
        showAll: 'បង្ហាញទាំងអស់',
        hideAll: 'លាក់ទាំងអស់',
        reset: 'កំណត់ឡើងវិញ',
        fixedLeft: 'ជាប់នៅខាងឆ្វេង',
        fixedRight: 'ជាប់នៅខាងស្តាំ',
        unfixed: 'លុបការជាប់'
      },
      // ម៉ឺនុយបរិបទ
      contextMenu: {
        copy: 'ចម្លង',
        copyRow: 'ចម្លងជួរ',
        copyCell: 'ចម្លងក្រឡា',
        paste: 'បិទភ្ជាប់',
        insertRowAbove: 'បញ្ចូលជួ្រខាងលើ',
        insertRowBelow: 'បញ្ចូលជួរខាងក្រោម',
        deleteRow: 'លុបជួរ',
        deleteSelectedRows: 'លុបជួរដែលបានជ្រើសរើស',
        exportSelected: 'នាំចេញដែលបានជ្រើសរើស'
      },
      // ការជ្រើសរើស
      selection: {
        selectAll: 'ជ្រើសរើសទាំងអស់',
        selectInvert: 'បញ្ច្រាសការជ្រើសរើស',
        selectNone: 'សម្អាតការជ្រើសរើស',
        selected: '{count} ធាតុបានជ្រើសរើស'
      },
      // ពង្រីក
      expand: {
        expandAll: 'ពង្រីកទាំងអស់',
        collapseAll: 'បង្រួមទាំងអស់'
      },
      // ដើមឈើ
      tree: {
        expandAll: 'ពង្រីកទាំងអស់',
        collapseAll: 'បង្រួមទាំងអស់',
        expandLevel: 'ពង្រីកដល់កម្រិត {level}'
      },
      // ទាញ
      drag: {
        dragTip: 'ទាញដើម្បីរៀបចំឡើងវិញ',
        dropTip: 'ទម្លាក់ដើម្បីដាក់'
      }
    },
    // ប្រអប់សារ
    messagebox: {
      title: 'សារ',
      confirm: 'យល់ព្រម',
      cancel: 'បោះបង់',
      close: 'បិទ',
      error: 'ការបញ្ចូលមិនត្រឹមត្រូវ',
      alert: 'ការព្រមាន',
      prompt: 'ស្នើសុំ',
      inputPlaceholder: 'សូមបញ្ចូល'
    },
    // ផ្ទុកឡើង
    upload: {
      deleteTip: 'ចុច delete ដើម្បីលុប',
      delete: 'លុប',
      preview: 'មើលជាមុន',
      continue: 'បន្ត',
      upload: 'ចុចដើម្បីផ្ទុកឡើង',
      tip: 'ចុច ឬទាញឯកសារទៅតំបន់នេះដើម្បី <em>ផ្ទុកឡើង</em>',
      dragTip: 'ទម្លាក់ឯកសារនៅទីនេះ ឬចុចដើម្បីផ្ទុកឡើង',
      uploading: 'កំពុងផ្ទុកឡើង...',
      success: 'ការផ្ទុកឡើងជោគជ័យ',
      error: 'ការផ្ទុកឡើងបរាជ័យ',
      retry: 'ព្យាយាមម្តងទៀត',
      cancel: 'បោះបង់ការផ្ទុកឡើង',
      fileTypeError: 'ប្រភេទឯកសារមិនត្រូវបានគាំទ្រ',
      fileSizeError: 'ទំហំឯកសារលើសពីកំហិត',
      fileCountError: 'ចំនួនឯកសារលើសពីកំហិត'
    },
    // ទម្រង់
    form: {
      validationFailed: 'ការផ្ទៀងផ្ទាត់បរាជ័យ',
      required: 'ត្រូវការ',
      pleaseInput: 'សូមបញ្ចូល',
      pleaseSelect: 'សូមជ្រើសរើស'
    },
    // ប៊ូតុង
    button: {
      loading: 'កំពុងផ្ទុក...'
    },
    // ការបញ្ចូល
    input: {
      placeholder: 'សូមបញ្ចូល',
      clear: 'សម្អាត',
      showPassword: 'បង្ហាញពាក្យសម្ងាត់',
      hidePassword: 'លាក់ពាក្យសម្ងាត់',
      copy: 'ចម្លង',
      copied: 'បានចម្លង'
    },
    // ការបញ្ចូលលេខ
    inputnumber: {
      placeholder: 'សូមបញ្ចូលលេខ',
      increase: 'បង្កើន',
      decrease: 'បន្ថយ'
    },
    // ការបញ្ចូលស្លាក
    inputtag: {
      placeholder: 'សូមបញ្ចូល',
      add: 'បន្ថែម',
      remove: 'យកចេញ'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'ផ្លូវ',
      more: 'បន្ថែមទៀត'
    },
    // ត្រឡប់ទៅកំពូល
    backtop: {
      text: 'ត្រឡប់ទៅកំពូល'
    },
    // ជ្រើសរើស
    select: {
      placeholder: 'សូមជ្រើសរើស',
      noData: 'គ្មានទិន្នន័យ',
      loading: 'កំពុងផ្ទុក...',
      noMatch: 'គ្មានទិន្នន័យដែលត្រូវគ្នា',
      selectAll: 'ជ្រើសរើសទាំងអស់',
      clearAll: 'សម្អាតទាំងអស់'
    },
    // ការបែងចែកទំព័រ
    pagination: {
      goto: 'ទៅ',
      page: '',
      total: 'សរុប {total}',
      pageSize: '/ទំព័រ',
      prev: 'មុន',
      next: 'បន្ទាប់',
      first: 'ទីមួយ',
      last: 'ចុងក្រោយ',
      pageClassifier: ''
    },
    // Popconfirm
    popconfirm: {
      confirm: 'យល់ព្រម',
      cancel: 'បោះបង់',
      dontAskAgain: 'កុំសួរម្តងទៀត'
    },
    // ការសន្ទនា
    dialog: {
      confirm: 'យល់ព្រម',
      cancel: 'បោះបង់',
      close: 'បិទ',
      maximize: 'ពង្រីកអតិបរមា',
      restore: 'ស្តារ'
    },
    // Drawer
    drawer: {
      close: 'បិទ',
      confirm: 'យល់ព្រម',
      cancel: 'បោះបង់'
    },
    // Dropdown
    dropdown: {
      loading: 'កំពុងផ្ទុក...'
    },
    // រូបភាព
    image: {
      error: 'បរាជ័យ',
      loading: 'កំពុងផ្ទុក...',
      preview: 'មើលជាមុន',
      zoomIn: 'ពង្រីក',
      zoomOut: 'បង្រួម',
      rotateLeft: 'បង្វិលទៅឆ្វេង',
      rotateRight: 'បង្វិលទៅស្តាំ',
      originalSize: 'ទំហំដើម',
      fullscreen: 'អេក្រង់ពេញ'
    },
    // កម្មវិធីមើលរូបភាព
    imageviewer: {
      close: 'បិទ',
      prev: 'មុន',
      next: 'បន្ទាប់',
      zoomIn: 'ពង្រីក',
      zoomOut: 'បង្រួម',
      rotateLeft: 'បង្វិលទៅឆ្វេង',
      rotateRight: 'បង្វិលទៅស្តាំ',
      reset: 'កំណត់ឡើងវិញ',
      fullscreen: 'អេក្រង់ពេញ',
      exitFullscreen: 'ចេញពីអេក្រង់ពេញ'
    },
    // ការរំកិលគ្មានកំណត់
    infinitescroll: {
      loading: 'កំពុងផ្ទុក...',
      finished: 'គ្មានទិន្នន័យបន្ថែមទៀត',
      error: 'ការផ្ទុកបរាជ័យ ចុចដើម្បីព្យាយាមម្តងទៀត',
      retry: 'ចុចដើម្បីព្យាយាមម្តងទៀត'
    },
    // សារ
    message: {
      close: 'បិទ'
    },
    // ការជូនដំណឹង
    notification: {
      close: 'បិទ'
    },
    // ការផ្ទុក
    loading: {
      text: 'កំពុងផ្ទុក...'
    },
    // Spin
    spin: {
      text: 'កំពុងផ្ទុក...'
    },
    // ការវាយតម្លៃ
    rate: {
      texts: ['អាក្រក់ណាស់', 'ខកចិត្ត', 'យុត្តិធម៌', 'ពេញចិត្ត', 'ភ្ញាក់ផ្អើល']
    },
    // ការព្រមាន
    alert: {
      close: 'បិទ'
    },
    // ស្លាក
    tag: {
      close: 'បិទ'
    },
    // ផ្ទាំង
    tabs: {
      close: 'បិទ',
      add: 'បន្ថែម',
      more: 'បន្ថែមទៀត'
    },
    // ជំហាន
    steps: {
      finish: 'បានបញ្ចប់',
      process: 'កំពុងដំណើរការ',
      wait: 'កំពុងរង់ចាំ',
      error: 'កំហុស'
    },
    // វឌ្ឍនភាព
    progress: {
      success: 'ជោគជ័យ',
      exception: 'ករណីលើកលែង',
      warning: 'ការព្រមាន'
    },
    // Skeleton
    skeleton: {
      loading: 'កំពុងផ្ទុក...'
    },
    // ទទេ
    empty: {
      description: 'គ្មានទិន្នន័យ',
      noData: 'គ្មានទិន្នន័យ',
      noResult: 'គ្មានលទ្ធផល',
      networkError: 'កំហុសបណ្តាញ',
      serverError: 'កំហុសម៉ាស៊ីនបម្រើ'
    },
    // លទ្ធផល
    result: {
      success: 'ជោគជ័យ',
      error: 'កំហុស',
      warning: 'ការព្រមាន',
      info: 'ព័ត៌មាន',
      backHome: 'ត្រឡប់ទៅទំព័រដើម'
    },
    // Waterfall
    waterfall: {
      loading: 'កំពុងផ្ទុក...',
      noMore: 'គ្មានទិន្នន័យបន្ថែមទៀត',
      empty: 'គ្មានទិន្នន័យ'
    },
    // ការពិពណ៌នា
    descriptions: {
      colon: ':'
    },
    // Slider
    slider: {
      tipFormatter: '{value}'
    },
    // Switch
    switch: {
      on: 'បើក',
      off: 'បិទ'
    },
    // Checkbox
    checkbox: {
      selectAll: 'ជ្រើសរើសទាំងអស់'
    },
    // Radio
    radio: {},
    // ម៉ឺនុយ
    menu: {
      collapse: 'បង្រួមម៉ឺនុយ',
      expand: 'ពង្រីកម៉ឺនុយ'
    },
    // កាត
    card: {
      collapse: 'បង្រួម',
      expand: 'ពង្រីក'
    },
    // បង្រួម
    collapse: {
      expand: 'ពង្រីក',
      collapse: 'បង្រួម'
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: 'ការផ្ទុកបរាជ័យ'
    },
    // Watermark
    watermark: {},
    // Divider
    divider: {},
    // Carousel
    carousel: {
      prev: 'មុន',
      next: 'បន្ទាប់'
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Anchor
    anchor: {}
  }
}

export default km
