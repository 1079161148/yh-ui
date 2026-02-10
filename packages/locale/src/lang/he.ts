import type { Language } from '../index'

export const he: Language = {
  name: 'he',
  yh: {
    // נפוץ
    common: {
      yes: 'כן',
      no: 'לא',
      confirm: 'אישור',
      cancel: 'ביטול',
      loading: 'טוען',
      close: 'סגור',
      clear: 'נקה',
      reset: 'איפוס',
      save: 'שמור',
      delete: 'מחק',
      edit: 'ערוך',
      add: 'הוסף',
      search: 'חיפוש',
      refresh: 'רענון',
      expand: 'הרחב',
      collapse: 'כווץ',
      more: 'עוד',
      noData: 'אין נתונים',
      noMatch: 'אין נתונים תואמים',
      selectAll: 'בחר הכל',
      unselectAll: 'בטל בחירה'
    },
    // בוחר צבעים
    colorpicker: {
      confirm: 'אישור',
      clear: 'נקה',
      eyeDropper: 'פיפטה',
      suggestionDark: 'טקסט לבן הוא הטוב ביותר',
      suggestionLight: 'טקסט שחור הוא הטוב ביותר',
      recentColors: 'צבעים אחרונים',
      presetColors: 'צבעים מוגדרים מראש'
    },
    // בוחר תאריך
    datepicker: {
      now: 'עכשיו',
      today: 'היום',
      cancel: 'ביטול',
      clear: 'נקה',
      confirm: 'אישור',
      selectDate: 'בחר תאריך',
      selectTime: 'בחר שעה',
      startDate: 'תאריך התחלה',
      startTime: 'שעת התחלה',
      endDate: 'תאריך סיום',
      endTime: 'שעת סיום',
      year: '',
      month: '',
      day: '',
      week: 'שבוע',
      monthBeforeYear: true,
      prevYear: 'שנה קודמת',
      nextYear: 'שנה הבאה',
      prevMonth: 'חודש קודם',
      nextMonth: 'חודש הבא',
      weeks: {
        sun: 'א',
        mon: 'ב',
        tue: 'ג',
        wed: 'ד',
        thu: 'ה',
        fri: 'ו',
        sat: 'ש'
      },
      months: {
        jan: 'ינו',
        feb: 'פבר',
        mar: 'מרץ',
        apr: 'אפר',
        may: 'מאי',
        jun: 'יונ',
        jul: 'יול',
        aug: 'אוג',
        sep: 'ספט',
        oct: 'אוק',
        nov: 'נוב',
        dec: 'דצמ'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // בוחר שעה
    timepicker: {
      confirm: 'אישור',
      cancel: 'ביטול',
      now: 'עכשיו',
      placeholder: 'בחר שעה',
      startPlaceholder: 'שעת התחלה',
      endPlaceholder: 'שעת סיום',
      selectTime: 'בחר שעה'
    },
    // בחירת שעה
    timeselect: {
      placeholder: 'בחר שעה'
    },
    // עץ
    tree: {
      emptyText: 'אין נתונים',
      loading: 'טוען...',
      checkAll: 'סמן הכל',
      uncheckAll: 'בטל סימון',
      expandAll: 'הרחב הכל',
      collapseAll: 'כווץ הכל'
    },
    // בחירת עץ
    treeselect: {
      placeholder: 'בחר',
      emptyText: 'אין נתונים',
      loading: 'טוען...',
      noMatch: 'אין נתונים תואמים'
    },
    // לוח שנה
    calendar: {
      prevMonth: 'חודש קודם',
      nextMonth: 'חודש הבא',
      prevYear: 'שנה קודמת',
      nextYear: 'שנה הבאה',
      today: 'היום',
      week: 'שבוע',
      holiday: 'חג',
      workday: 'עבודה',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'א',
        mon: 'ב',
        tue: 'ג',
        wed: 'ד',
        thu: 'ה',
        fri: 'ו',
        sat: 'ש'
      }
    },
    // השלמה אוטומטית
    autocomplete: {
      loading: 'טוען...',
      placeholder: 'אנא הזן',
      noData: 'אין נתונים',
      noMatch: 'אין נתונים תואמים'
    },
    // ספירה לאחור
    countdown: {
      days: 'ימים',
      hours: 'שעות',
      minutes: 'דקות',
      seconds: 'שניות',
      milliseconds: 'מילישניות',
      finished: 'הסתיים'
    },
    // קסקייד
    cascader: {
      noMatch: 'אין נתונים תואמים',
      placeholder: 'בחר',
      loading: 'טוען...',
      noData: 'אין נתונים'
    },
    // העברה
    transfer: {
      noMatch: 'אין נתונים תואמים',
      noData: 'אין נתונים',
      titles: ['רשימה 1', 'רשימה 2'],
      filterPlaceholder: 'הזן מילת מפתח',
      noCheckedFormat: '{total} פריטים',
      hasCheckedFormat: '{checked}/{total} נבחרו',
      searchPlaceholder: 'הזן מילת מפתח'
    },
    // טבלה
    table: {
      emptyText: 'אין נתונים',
      confirmFilter: 'אישור',
      resetFilter: 'איפוס',
      clearFilter: 'הכל',
      sumText: 'סכום',
      loading: 'טוען...',
      index: 'אינדקס',
      print: 'הדפס',
      cancel: 'ביטול',
      preview: 'תצוגה מקדימה',
      printTime: 'זמן הדפסה',
      total: 'סה"כ {total} פריטים',
      page: 'עמוד {page}',
      yes: 'כן',
      no: 'לא',
      // סרגל כלים
      toolbar: {
        refresh: 'רענון',
        density: 'צפיפות',
        densityDefault: 'ברירת מחדל',
        densityLarge: 'גדול',
        densitySmall: 'קטן',
        columnSetting: 'הגדרות עמודות',
        fullscreen: 'מסך מלא',
        exitFullscreen: 'צא ממסך מלא',
        export: 'ייצוא',
        import: 'ייבוא',
        search: 'חיפוש',
        searchPlaceholder: 'הזן מילות מפתח לחיפוש'
      },
      // מסנן
      filter: {
        selectAll: 'בחר הכל',
        selectInvert: 'הפוך בחירה',
        empty: 'ריק',
        notEmpty: 'לא ריק',
        contains: 'מכיל',
        notContains: 'לא מכיל',
        equals: 'שווה',
        notEquals: 'לא שווה',
        startsWith: 'מתחיל ב',
        endsWith: 'מסתיים ב',
        greaterThan: 'גדול מ',
        lessThan: 'קטן מ',
        between: 'בין'
      },
      // מיון
      sort: {
        asc: 'עולה',
        desc: 'יורד',
        clear: 'נקה מיון'
      },
      // ייצוא
      export: {
        title: 'ייצוא נתונים',
        filename: 'שם קובץ',
        type: 'סוג קובץ',
        scope: 'היקף ייצוא',
        scopeAll: 'כל הנתונים',
        scopeSelected: 'נתונים נבחרים',
        scopeCurrentPage: 'עמוד נוכחי',
        includeHeader: 'כלול כותרת',
        exporting: 'מייצא...',
        success: 'ייצוא הצליח',
        error: 'ייצוא נכשל'
      },
      // ייבוא
      import: {
        title: 'ייבוא נתונים',
        selectFile: 'בחר קובץ',
        dragTip: 'לחץ או גרור קובץ לכאן להעלאה',
        importing: 'מייבא...',
        success: 'ייבוא הצליח',
        error: 'ייבוא נכשל',
        preview: 'תצוגה מקדימה של נתונים',
        confirm: 'אשר ייבוא'
      },
      // הדפסה
      printConfig: {
        title: 'הגדרות הדפסה',
        pageTitle: 'כותרת עמוד',
        pageHeader: 'כותרת עליונה',
        pageFooter: 'כותרת תחתונה',
        printAll: 'הדפס הכל',
        printSelected: 'הדפס נבחר',
        printCurrentPage: 'הדפס עמוד נוכחי',
        landscape: 'אופקי',
        portrait: 'אנכי',
        printing: 'מדפיס...'
      },
      // הגדרות עמודות
      columnSetting: {
        title: 'הגדרות עמודות',
        showAll: 'הצג הכל',
        hideAll: 'הסתר הכל',
        reset: 'איפוס',
        fixedLeft: 'קבע לשמאל',
        fixedRight: 'קבע לימין',
        unfixed: 'שחרר'
      },
      // תפריט הקשר
      contextMenu: {
        copy: 'העתק',
        copyRow: 'העתק שורה',
        copyCell: 'העתק תא',
        paste: 'הדבק',
        insertRowAbove: 'הוסף שורה למעלה',
        insertRowBelow: 'הוסף שורה למטה',
        deleteRow: 'מחק שורה',
        deleteSelectedRows: 'מחק שורות נבחרות',
        exportSelected: 'ייצא נבחר'
      },
      // בחירה
      selection: {
        selectAll: 'בחר הכל',
        selectInvert: 'הפוך בחירה',
        selectNone: 'נקה בחירה',
        selected: '{count} פריטים נבחרו'
      },
      // הרחבה
      expand: {
        expandAll: 'הרחב הכל',
        collapseAll: 'כווץ הכל'
      },
      // עץ
      tree: {
        expandAll: 'הרחב הכל',
        collapseAll: 'כווץ הכל',
        expandLevel: 'הרחב לרמה {level}'
      },
      // גרירה
      drag: {
        dragTip: 'גרור לסידור מחדש',
        dropTip: 'שחרר למיקום'
      }
    },
    // תיבת הודעה
    messagebox: {
      title: 'הודעה',
      confirm: 'אישור',
      cancel: 'ביטול',
      close: 'סגור',
      error: 'קלט לא חוקי',
      alert: 'התראה',
      prompt: 'בקשה',
      inputPlaceholder: 'אנא הזן'
    },
    // העלאה
    upload: {
      deleteTip: 'לחץ delete להסרה',
      delete: 'מחק',
      preview: 'תצוגה מקדימה',
      continue: 'המשך',
      upload: 'לחץ להעלאה',
      tip: 'לחץ או גרור קובץ לאזור זה כדי <em>להעלות</em>',
      dragTip: 'שחרר קובץ כאן או לחץ להעלאה',
      uploading: 'מעלה...',
      success: 'העלאה הצליחה',
      error: 'העלאה נכשלה',
      retry: 'נסה שוב',
      cancel: 'בטל העלאה',
      fileTypeError: 'סוג קובץ לא נתמך',
      fileSizeError: 'גודל קובץ חורג מהגבול',
      fileCountError: 'מספר קבצים חורג מהגבול'
    },
    // טופס
    form: {
      validationFailed: 'אימות נכשל',
      required: 'נדרש',
      pleaseInput: 'אנא הזן',
      pleaseSelect: 'אנא בחר'
    },
    // כפתור
    button: {
      loading: 'טוען...'
    },
    // קלט
    input: {
      placeholder: 'אנא הזן',
      clear: 'נקה',
      showPassword: 'הצג סיסמה',
      hidePassword: 'הסתר סיסמה',
      copy: 'העתק',
      copied: 'הועתק'
    },
    // קלט מספר
    inputnumber: {
      placeholder: 'אנא הזן מספר',
      increase: 'הגדל',
      decrease: 'הקטן'
    },
    // קלט תג
    inputtag: {
      placeholder: 'אנא הזן',
      add: 'הוסף',
      remove: 'הסר'
    },
    // פירורי לחם
    breadcrumb: {
      label: 'פירורי לחם',
      more: 'עוד'
    },
    // חזרה למעלה
    backtop: {
      text: 'חזרה למעלה'
    },
    // בחירה
    select: {
      placeholder: 'אנא בחר',
      noData: 'אין נתונים',
      loading: 'טוען...',
      noMatch: 'אין נתונים תואמים',
      selectAll: 'בחר הכל',
      clearAll: 'נקה הכל'
    },
    // עימוד
    pagination: {
      goto: 'עבור ל',
      page: '',
      total: 'סה"כ {total}',
      pageSize: '/עמוד',
      prev: 'הקודם',
      next: 'הבא',
      first: 'ראשון',
      last: 'אחרון',
      pageClassifier: ''
    },
    // אישור קופץ
    popconfirm: {
      confirm: 'אישור',
      cancel: 'ביטול',
      dontAskAgain: 'אל תשאל שוב'
    },
    // דיאלוג
    dialog: {
      confirm: 'אישור',
      cancel: 'ביטול',
      close: 'סגור',
      maximize: 'הגדל למקסימום',
      restore: 'שחזר'
    },
    // מגירה
    drawer: {
      close: 'סגור',
      confirm: 'אישור',
      cancel: 'ביטול'
    },
    // תפריט נפתח
    dropdown: {
      loading: 'טוען...'
    },
    // תמונה
    image: {
      error: 'נכשל',
      loading: 'טוען...',
      preview: 'תצוגה מקדימה',
      zoomIn: 'הגדל',
      zoomOut: 'הקטן',
      rotateLeft: 'סובב שמאלה',
      rotateRight: 'סובב ימינה',
      originalSize: 'גודל מקורי',
      fullscreen: 'מסך מלא'
    },
    // מציג תמונות
    imageviewer: {
      close: 'סגור',
      prev: 'הקודם',
      next: 'הבא',
      zoomIn: 'הגדל',
      zoomOut: 'הקטן',
      rotateLeft: 'סובב שמאלה',
      rotateRight: 'סובב ימינה',
      reset: 'איפוס',
      fullscreen: 'מסך מלא',
      exitFullscreen: 'צא ממסך מלא'
    },
    // גלילה אינסופית
    infinitescroll: {
      loading: 'טוען...',
      finished: 'אין עוד נתונים',
      error: 'טעינה נכשלה, לחץ לניסיון חוזר',
      retry: 'לחץ לניסיון חוזר'
    },
    // הודעה
    message: {
      close: 'סגור'
    },
    // התראה
    notification: {
      close: 'סגור'
    },
    // טעינה
    loading: {
      text: 'טוען...'
    },
    // סיבוב
    spin: {
      text: 'טוען...'
    },
    // דירוג
    rate: {
      texts: ['גרוע מאוד', 'מאוכזב', 'הוגן', 'מרוצה', 'מופתע']
    },
    // התראה
    alert: {
      close: 'סגור'
    },
    // תג
    tag: {
      close: 'סגור'
    },
    // כרטיסיות
    tabs: {
      close: 'סגור',
      add: 'הוסף',
      more: 'עוד'
    },
    // שלבים
    steps: {
      finish: 'הושלם',
      process: 'בתהליך',
      wait: 'ממתין',
      error: 'שגיאה'
    },
    // התקדמות
    progress: {
      success: 'הצלחה',
      exception: 'יוצא דופן',
      warning: 'אזהרה'
    },
    // שלד
    skeleton: {
      loading: 'טוען...'
    },
    // ריק
    empty: {
      description: 'אין נתונים',
      noData: 'אין נתונים',
      noResult: 'אין תוצאות',
      networkError: 'שגיאת רשת',
      serverError: 'שגיאת שרת'
    },
    // תוצאה
    result: {
      success: 'הצלחה',
      error: 'שגיאה',
      warning: 'אזהרה',
      info: 'מידע',
      backHome: 'חזרה לדף הבית'
    },
    // מפל
    waterfall: {
      loading: 'טוען...',
      noMore: 'אין עוד נתונים',
      empty: 'אין נתונים'
    },
    // תיאורים
    descriptions: {
      colon: ':'
    },
    // מחוון
    slider: {
      tipFormatter: '{value}'
    },
    // מתג
    switch: {
      on: 'פועל',
      off: 'כבוי'
    },
    // תיבת סימון
    checkbox: {
      selectAll: 'בחר הכל'
    },
    // רדיו
    radio: {},
    // תפריט
    menu: {
      collapse: 'כווץ תפריט',
      expand: 'הרחב תפריט'
    },
    // כרטיס
    card: {
      collapse: 'כווץ',
      expand: 'הרחב'
    },
    // כיווץ
    collapse: {
      expand: 'הרחב',
      collapse: 'כווץ'
    },
    // רמז
    tooltip: {},
    // חלון קופץ
    popover: {},
    // תג
    badge: {},
    // אווטר
    avatar: {
      error: 'טעינה נכשלה'
    },
    // סימן מים
    watermark: {},
    // מפריד
    divider: {},
    // קרוסלה
    carousel: {
      prev: 'הקודם',
      next: 'הבא'
    },
    // מרקיז
    marquee: {},
    // היצמדות
    affix: {},
    // עוגן
    anchor: {}
  }
}

export default he
