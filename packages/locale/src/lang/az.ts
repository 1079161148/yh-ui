import type { Language } from '../index'

export const az: Language = {
  name: 'az',
  yh: {
    // Ümumi
    common: {
      yes: 'Bəli',
      no: 'Xeyr',
      confirm: 'Təsdiq et',
      cancel: 'Ləğv et',
      loading: 'Yüklənir',
      close: 'Bağla',
      clear: 'Təmizlə',
      reset: 'Sıfırla',
      save: 'Yadda saxla',
      delete: 'Sil',
      edit: 'Redaktə et',
      add: 'Əlavə et',
      search: 'Axtar',
      refresh: 'Yenilə',
      expand: 'Genişləndir',
      collapse: 'Yığ',
      more: 'Daha çox',
      noData: 'Məlumat yoxdur',
      noMatch: 'Uyğunluq yoxdur',
      selectAll: 'Hamısını seç',
      unselectAll: 'Seçimi ləğv et'
    },
    // Rəng seçici
    colorpicker: {
      confirm: 'OK',
      clear: 'Təmizlə',
      eyeDropper: 'Pipet',
      suggestionDark: 'Ağ mətn daha yaxşıdır',
      suggestionLight: 'Qara mətn daha yaxşıdır',
      recentColors: 'Son rənglər',
      presetColors: 'Əvvəlcədən təyin edilmiş rənglər'
    },
    // Tarix seçici
    datepicker: {
      now: 'İndi',
      today: 'Bu gün',
      cancel: 'Ləğv et',
      clear: 'Təmizlə',
      confirm: 'OK',
      selectDate: 'Tarix seçin',
      selectTime: 'Vaxt seçin',
      startDate: 'Başlanğıc tarixi',
      startTime: 'Başlanğıc vaxtı',
      endDate: 'Bitiş tarixi',
      endTime: 'Bitiş vaxtı',
      year: '',
      month: '',
      day: '',
      week: 'Həftə',
      monthBeforeYear: true,
      prevYear: 'Əvvəlki il',
      nextYear: 'Növbəti il',
      prevMonth: 'Əvvəlki ay',
      nextMonth: 'Növbəti ay',
      weeks: {
        sun: 'Bz',
        mon: 'Be',
        tue: 'Ça',
        wed: 'Çə',
        thu: 'Ca',
        fri: 'Cü',
        sat: 'Şə'
      },
      months: {
        jan: 'Yan',
        feb: 'Fev',
        mar: 'Mar',
        apr: 'Apr',
        may: 'May',
        jun: 'İyn',
        jul: 'İyl',
        aug: 'Avq',
        sep: 'Sen',
        oct: 'Okt',
        nov: 'Noy',
        dec: 'Dek'
      },
      quarters: {
        q1: 'R1',
        q2: 'R2',
        q3: 'R3',
        q4: 'R4'
      }
    },
    // Vaxt seçici
    timepicker: {
      confirm: 'OK',
      cancel: 'Ləğv et',
      now: 'İndi',
      placeholder: 'Vaxt seçin',
      startPlaceholder: 'Başlanğıc vaxtı',
      endPlaceholder: 'Bitiş vaxtı',
      selectTime: 'Vaxt seçin'
    },
    // Vaxt seçimi
    timeselect: {
      placeholder: 'Vaxt seçin'
    },
    // Ağac
    tree: {
      emptyText: 'Məlumat yoxdur',
      loading: 'Yüklənir...',
      checkAll: 'Hamısını seç',
      uncheckAll: 'Seçimi ləğv et',
      expandAll: 'Hamısını genişləndir',
      collapseAll: 'Hamısını yığ'
    },
    // Ağac seçici
    treeselect: {
      placeholder: 'Seçin',
      emptyText: 'Məlumat yoxdur',
      loading: 'Yüklənir...',
      noMatch: 'Uyğunluq yoxdur'
    },
    // Təqvim
    calendar: {
      prevMonth: 'Əvvəlki ay',
      nextMonth: 'Növbəti ay',
      prevYear: 'Əvvəlki il',
      nextYear: 'Növbəti il',
      today: 'Bu gün',
      week: 'Həftə',
      holiday: 'Bayram',
      workday: 'İş günü',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Bz',
        mon: 'Be',
        tue: 'Ça',
        wed: 'Çə',
        thu: 'Ca',
        fri: 'Cü',
        sat: 'Şə'
      }
    },
    // Avtomatik tamamlama
    autocomplete: {
      loading: 'Yüklənir...',
      placeholder: 'Zəhmət olmasa daxil edin',
      noData: 'Məlumat yoxdur',
      noMatch: 'Uyğunluq yoxdur'
    },
    // Geri sayım
    countdown: {
      days: 'gün',
      hours: 'saat',
      minutes: 'dəqiqə',
      seconds: 'saniyə',
      milliseconds: 'millisaniyə',
      finished: 'Tamamlandı'
    },
    // Kaskad seçici
    cascader: {
      noMatch: 'Uyğunluq yoxdur',
      placeholder: 'Seçin',
      loading: 'Yüklənir...',
      noData: 'Məlumat yoxdur'
    },
    // Transfer
    transfer: {
      noMatch: 'Uyğunluq yoxdur',
      noData: 'Məlumat yoxdur',
      titles: ['Siyahı 1', 'Siyahı 2'],
      filterPlaceholder: 'Açar söz daxil edin',
      noCheckedFormat: '{total} element',
      hasCheckedFormat: '{checked}/{total} seçildi',
      searchPlaceholder: 'Açar söz daxil edin'
    },
    // Cədvəl
    table: {
      emptyText: 'Məlumat yoxdur',
      confirmFilter: 'Təsdiq et',
      resetFilter: 'Sıfırla',
      clearFilter: 'Hamısı',
      sumText: 'Cəm',
      loading: 'Yüklənir...',
      index: 'İndeks',
      print: 'Çap et',
      cancel: 'Ləğv et',
      preview: 'Çap önbaxışı',
      printTime: 'Çap vaxtı',
      total: 'Cəmi {total} element',
      page: 'Səhifə {page}',
      yes: 'Bəli',
      no: 'Xeyr',
      // Alətlər paneli
      toolbar: {
        refresh: 'Yenilə',
        density: 'Sıxlıq',
        densityDefault: 'Standart',
        densityLarge: 'Böyük',
        densitySmall: 'Kiçik',
        columnSetting: 'Sütun parametrləri',
        fullscreen: 'Tam ekran',
        exitFullscreen: 'Tam ekrandan çıx',
        export: 'İxrac et',
        import: 'İdxal et',
        search: 'Axtar',
        searchPlaceholder: 'Axtarış üçün açar sözlər daxil edin'
      },
      // Filtr
      filter: {
        selectAll: 'Hamısını seç',
        selectInvert: 'Seçimi çevir',
        empty: 'Boş',
        notEmpty: 'Boş deyil',
        contains: 'Ehtiva edir',
        notContains: 'Ehtiva etmir',
        equals: 'Bərabərdir',
        notEquals: 'Bərabər deyil',
        startsWith: 'İlə başlayır',
        endsWith: 'İlə bitir',
        greaterThan: 'Böyükdür',
        lessThan: 'Kiçikdir',
        between: 'Arasında'
      },
      // Sıralama
      sort: {
        asc: 'Artan',
        desc: 'Azalan',
        clear: 'Sıralamanı təmizlə'
      },
      // İxrac
      export: {
        title: 'Məlumat ixracı',
        filename: 'Fayl adı',
        type: 'Fayl növü',
        scope: 'İxrac əhatəsi',
        scopeAll: 'Bütün məlumatlar',
        scopeSelected: 'Seçilmiş məlumatlar',
        scopeCurrentPage: 'Cari səhifə',
        includeHeader: 'Başlığı daxil et',
        exporting: 'İxrac edilir...',
        success: 'İxrac uğurlu oldu',
        error: 'İxrac xətası'
      },
      // İdxal
      import: {
        title: 'Məlumat idxalı',
        selectFile: 'Fayl seçin',
        dragTip: 'Yükləmək üçün faylı bura sürükləyin və ya klikləyin',
        importing: 'İdxal edilir...',
        success: 'İdxal uğurlu oldu',
        error: 'İdxal xətası',
        preview: 'Məlumat önbaxışı',
        confirm: 'İdxalı təsdiq et'
      },
      // Çap
      printConfig: {
        title: 'Çap parametrləri',
        pageTitle: 'Səhifə başlığı',
        pageHeader: 'Başlıq',
        pageFooter: 'Alt yazı',
        printAll: 'Hamısını çap et',
        printSelected: 'Seçilmişləri çap et',
        printCurrentPage: 'Cari səhifəni çap et',
        landscape: 'Landşaft',
        portrait: 'Portret',
        printing: 'Çap edilir...'
      },
      // Sütun parametrləri
      columnSetting: {
        title: 'Sütun parametrləri',
        showAll: 'Hamısını göstər',
        hideAll: 'Hamısını gizlət',
        reset: 'Sıfırla',
        fixedLeft: 'Sola bərkid',
        fixedRight: 'Sağa bərkid',
        unfixed: 'Bərkidməni ləğv et'
      },
      // Kontekst menyusu
      contextMenu: {
        copy: 'Kopyala',
        copyRow: 'Sətri kopyala',
        copyCell: 'Hüceyrəni kopyala',
        paste: 'Yapışdır',
        insertRowAbove: 'Yuxarıya sətir əlavə et',
        insertRowBelow: 'Aşağıya sətir əlavə et',
        deleteRow: 'Sətri sil',
        deleteSelectedRows: 'Seçilmiş sətirləri sil',
        exportSelected: 'Seçilmişləri ixrac et'
      },
      // Seçim
      selection: {
        selectAll: 'Hamısını seç',
        selectInvert: 'Seçimi çevir',
        selectNone: 'Seçimi təmizlə',
        selected: '{count} element seçildi'
      },
      // Genişləndirmə
      expand: {
        expandAll: 'Hamısını genişləndir',
        collapseAll: 'Hamısını yığ'
      },
      // Ağac
      tree: {
        expandAll: 'Hamısını genişləndir',
        collapseAll: 'Hamısını yığ',
        expandLevel: '{level} səviyyəsinə qədər genişləndir'
      },
      // Sürükləmə
      drag: {
        dragTip: 'Sıranı dəyişdirmək üçün sürükləyin',
        dropTip: 'Yerləşdirmək üçün buraxın'
      }
    },
    // Mesaj qutusu
    messagebox: {
      title: 'Mesaj',
      confirm: 'OK',
      cancel: 'Ləğv et',
      close: 'Bağla',
      error: 'Yanlış giriş',
      alert: 'Xəbərdarlıq',
      prompt: 'Göstəriş',
      inputPlaceholder: 'Zəhmət olmasa daxil edin'
    },
    // Yükləmə
    upload: {
      deleteTip: 'silmək üçün delete düyməsini basın',
      delete: 'Sil',
      preview: 'Önbaxış',
      continue: 'Davam et',
      upload: 'Yükləmək üçün klikləyin',
      tip: 'Yükləmək üçün faylı bura <em>sürükləyin</em> və ya klikləyin',
      dragTip: 'Faylı bura sürükləyin və ya yükləmək üçün klikləyin',
      uploading: 'Yüklənir...',
      success: 'Yükləmə uğurlu oldu',
      error: 'Yükləmə xətası',
      retry: 'Yenidən cəhd et',
      cancel: 'Yükləməni ləğv et',
      fileTypeError: 'Fayl növü dəstəklənmir',
      fileSizeError: 'Fayl ölçüsü limiti aşır',
      fileCountError: 'Fayl sayı limiti aşır'
    },
    // Form
    form: {
      validationFailed: 'Doğrulama uğursuz oldu',
      required: 'Məcburidir',
      pleaseInput: 'Zəhmət olmasa daxil edin',
      pleaseSelect: 'Zəhmət olmasa seçin'
    },
    // Düymə
    button: {
      loading: 'Yüklənir...'
    },
    // Giriş
    input: {
      placeholder: 'Zəhmət olmasa daxil edin',
      clear: 'Təmizlə',
      showPassword: 'Parolu göstər',
      hidePassword: 'Parolu gizlət',
      copy: 'Kopyala',
      copied: 'Kopyalandı'
    },
    // Rəqəm girişi
    inputnumber: {
      placeholder: 'Zəhmət olmasa rəqəm daxil edin',
      increase: 'Artır',
      decrease: 'Azalt'
    },
    // Teq girişi
    inputtag: {
      placeholder: 'Zəhmət olmasa daxil edin',
      add: 'Əlavə et',
      remove: 'Sil'
    },
    // Çörək qırıntıları
    breadcrumb: {
      label: 'Çörək qırıntıları',
      more: 'Daha çox'
    },
    // Yuxarı qayıt
    backtop: {
      text: 'Yuxarı qayıt'
    },
    // Seçim
    select: {
      placeholder: 'Zəhmət olmasa seçin',
      noData: 'Məlumat yoxdur',
      loading: 'Yüklənir...',
      noMatch: 'Uyğunluq yoxdur',
      selectAll: 'Hamısını seç',
      clearAll: 'Hamısını təmizlə'
    },
    // Səhifələmə
    pagination: {
      goto: 'Get',
      page: '',
      total: 'Cəmi {total}',
      pageSize: '/səhifə',
      prev: 'Əvvəlki',
      next: 'Növbəti',
      first: 'Birinci',
      last: 'Sonuncu',
      pageClassifier: ''
    },
    // Təsdiq açılan pəncərəsi
    popconfirm: {
      confirm: 'OK',
      cancel: 'Ləğv et',
      dontAskAgain: 'Yenidən soruşma'
    },
    // Dialoq
    dialog: {
      confirm: 'OK',
      cancel: 'Ləğv et',
      close: 'Bağla',
      maximize: 'Böyüt',
      restore: 'Bərpa et'
    },
    // Çəkmə
    drawer: {
      close: 'Bağla',
      confirm: 'OK',
      cancel: 'Ləğv et'
    },
    // Açılan menyu
    dropdown: {
      loading: 'Yüklənir...'
    },
    // Şəkil
    image: {
      error: 'XƏTA',
      loading: 'Yüklənir...',
      preview: 'Önbaxış',
      zoomIn: 'Böyüt',
      zoomOut: 'Kiçilt',
      rotateLeft: 'Sola döndər',
      rotateRight: 'Sağa döndər',
      originalSize: 'Orijinal ölçü',
      fullscreen: 'Tam ekran'
    },
    // Şəkil baxıcısı
    imageviewer: {
      close: 'Bağla',
      prev: 'Əvvəlki',
      next: 'Növbəti',
      zoomIn: 'Böyüt',
      zoomOut: 'Kiçilt',
      rotateLeft: 'Sola döndər',
      rotateRight: 'Sağa döndər',
      reset: 'Sıfırla',
      fullscreen: 'Tam ekran',
      exitFullscreen: 'Tam ekrandan çıx'
    },
    // Sonsuz sürüşmə
    infinitescroll: {
      loading: 'Yüklənir...',
      finished: 'Daha çox məlumat yoxdur',
      error: 'Yükləmə xətası, yenidən cəhd etmək üçün klikləyin',
      retry: 'Yenidən cəhd etmək üçün klikləyin'
    },
    // Mesaj
    message: {
      close: 'Bağla'
    },
    // Bildiriş
    notification: {
      close: 'Bağla'
    },
    // Yükləmə
    loading: {
      text: 'Yüklənir...'
    },
    // Fırlanma
    spin: {
      text: 'Yüklənir...'
    },
    // Reytinq
    rate: {
      texts: ['Çox pis', 'Məyus', 'Yaxşı', 'Məmnun', 'Təəccüblü']
    },
    // Xəbərdarlıq
    alert: {
      close: 'Bağla'
    },
    // Teq
    tag: {
      close: 'Bağla'
    },
    // Tablar
    tabs: {
      close: 'Bağla',
      add: 'Əlavə et',
      more: 'Daha çox'
    },
    // Addımlar
    steps: {
      finish: 'Tamamlandı',
      process: 'Davam edir',
      wait: 'Gözləyir',
      error: 'Xəta'
    },
    // İrəliləmə
    progress: {
      success: 'Uğurlu',
      exception: 'İstisna',
      warning: 'Xəbərdarlıq'
    },
    // Skelet
    skeleton: {
      loading: 'Yüklənir...'
    },
    // Boş
    empty: {
      description: 'Məlumat yoxdur',
      noData: 'Məlumat yoxdur',
      noResult: 'Nəticə yoxdur',
      networkError: 'Şəbəkə xətası',
      serverError: 'Server xətası'
    },
    // Nəticə
    result: {
      success: 'Uğurlu',
      error: 'Xəta',
      warning: 'Xəbərdarlıq',
      info: 'Məlumat',
      backHome: 'Ana səhifəyə qayıt'
    },
    // Şəlalə
    waterfall: {
      loading: 'Yüklənir...',
      noMore: 'Daha çox məlumat yoxdur',
      empty: 'Məlumat yoxdur'
    },
    // Təsvirlər
    descriptions: {
      colon: ':'
    },
    // Sürüşdürmə
    slider: {
      tipFormatter: '{value}'
    },
    // Açar
    switch: {
      on: 'AÇ',
      off: 'BAĞLA'
    },
    // Onay qutusu
    checkbox: {
      selectAll: 'Hamısını seç'
    },
    // Radio
    radio: {},
    // Menyu
    menu: {
      collapse: 'Menyunu yığ',
      expand: 'Menyunu genişləndir'
    },
    // Kart
    card: {
      collapse: 'Yığ',
      expand: 'Genişləndir'
    },
    // Yığma
    collapse: {
      expand: 'Genişləndir',
      collapse: 'Yığ'
    },
    // Göstəriş
    tooltip: {},
    // Açılan pəncərə
    popover: {},
    // Nişan
    badge: {},
    // Avatar
    avatar: {
      error: 'Yükləmə xətası'
    },
    // Su nişanı
    watermark: {},
    // Ayırıcı
    divider: {},
    // Karusel
    carousel: {
      prev: 'Əvvəlki',
      next: 'Növbəti'
    },
    // Hərəkətli mətn
    marquee: {},
    // Bərkitmə
    affix: {},
    // Lövbər
    anchor: {}
  }
}

export default az
