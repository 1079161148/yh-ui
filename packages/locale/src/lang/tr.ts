import type { Language } from '../index'

export const tr: Language = {
  name: 'tr',
  yh: {
    // Genel
    common: {
      yes: 'Evet',
      no: 'Hayır',
      confirm: 'Onayla',
      cancel: 'İptal',
      loading: 'Yükleniyor',
      close: 'Kapat',
      clear: 'Temizle',
      reset: 'Sıfırla',
      save: 'Kaydet',
      delete: 'Sil',
      edit: 'Düzenle',
      add: 'Ekle',
      search: 'Ara',
      refresh: 'Yenile',
      expand: 'Genişlet',
      collapse: 'Daralt',
      more: 'Daha fazla',
      noData: 'Veri yok',
      noMatch: 'Eşleşen veri yok',
      selectAll: 'Tümünü seç',
      unselectAll: 'Tümünü kaldır'
    },
    // Renk Seçici
    colorpicker: {
      confirm: 'Tamam',
      clear: 'Temizle',
      eyeDropper: 'Göz damlalığı',
      suggestionDark: 'Beyaz metin en iyisi',
      suggestionLight: 'Siyah metin en iyisi',
      recentColors: 'Son Renkler',
      presetColors: 'Önceden Ayarlanmış Renkler'
    },
    // Tarih Seçici
    datepicker: {
      now: 'Şimdi',
      today: 'Bugün',
      cancel: 'İptal',
      clear: 'Temizle',
      confirm: 'Tamam',
      selectDate: 'Tarih seç',
      selectTime: 'Saat seç',
      startDate: 'Başlangıç Tarihi',
      startTime: 'Başlangıç Saati',
      endDate: 'Bitiş Tarihi',
      endTime: 'Bitiş Saati',
      year: '',
      month: '',
      day: '',
      week: 'Hafta',
      monthBeforeYear: true,
      prevYear: 'Önceki Yıl',
      nextYear: 'Sonraki Yıl',
      prevMonth: 'Önceki Ay',
      nextMonth: 'Sonraki Ay',
      weeks: {
        sun: 'Paz',
        mon: 'Pzt',
        tue: 'Sal',
        wed: 'Çar',
        thu: 'Per',
        fri: 'Cum',
        sat: 'Cmt'
      },
      months: {
        jan: 'Oca',
        feb: 'Şub',
        mar: 'Mar',
        apr: 'Nis',
        may: 'May',
        jun: 'Haz',
        jul: 'Tem',
        aug: 'Ağu',
        sep: 'Eyl',
        oct: 'Eki',
        nov: 'Kas',
        dec: 'Ara'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Saat Seçici
    timepicker: {
      confirm: 'Tamam',
      cancel: 'İptal',
      now: 'Şimdi',
      placeholder: 'Saat seç',
      startPlaceholder: 'Başlangıç saati',
      endPlaceholder: 'Bitiş saati',
      selectTime: 'Saat seç'
    },
    // Saat Seçimi
    timeselect: {
      placeholder: 'Saat seç'
    },
    // Ağaç
    tree: {
      emptyText: 'Veri yok',
      loading: 'Yükleniyor...',
      checkAll: 'Tümünü işaretle',
      uncheckAll: 'Tümünü kaldır',
      expandAll: 'Tümünü genişlet',
      collapseAll: 'Tümünü daralt'
    },
    // Ağaç Seçimi
    treeselect: {
      placeholder: 'Seç',
      emptyText: 'Veri yok',
      loading: 'Yükleniyor...',
      noMatch: 'Eşleşen veri yok'
    },
    // Takvim
    calendar: {
      prevMonth: 'Önceki Ay',
      nextMonth: 'Sonraki Ay',
      prevYear: 'Önceki Yıl',
      nextYear: 'Sonraki Yıl',
      today: 'Bugün',
      week: 'Hafta',
      holiday: 'Tatil',
      workday: 'İş',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Paz',
        mon: 'Pzt',
        tue: 'Sal',
        wed: 'Çar',
        thu: 'Per',
        fri: 'Cum',
        sat: 'Cmt'
      }
    },
    // Otomatik Tamamlama
    autocomplete: {
      loading: 'Yükleniyor...',
      placeholder: 'Lütfen girin',
      noData: 'Veri yok',
      noMatch: 'Eşleşen veri yok'
    },
    // Geri Sayım
    countdown: {
      days: 'gün',
      hours: 'saat',
      minutes: 'dakika',
      seconds: 'saniye',
      milliseconds: 'milisaniye',
      finished: 'Bitti'
    },
    // Kaskad Seçim
    cascader: {
      noMatch: 'Eşleşen veri yok',
      placeholder: 'Seç',
      loading: 'Yükleniyor...',
      noData: 'Veri yok'
    },
    // Transfer
    transfer: {
      noMatch: 'Eşleşen veri yok',
      noData: 'Veri yok',
      titles: ['Liste 1', 'Liste 2'],
      filterPlaceholder: 'Anahtar kelime girin',
      noCheckedFormat: '{total} öğe',
      hasCheckedFormat: '{checked}/{total} seçildi',
      searchPlaceholder: 'Anahtar kelime girin'
    },
    // Tablo
    table: {
      emptyText: 'Veri yok',
      confirmFilter: 'Onayla',
      resetFilter: 'Sıfırla',
      clearFilter: 'Tümü',
      sumText: 'Toplam',
      loading: 'Yükleniyor...',
      index: 'İndeks',
      print: 'Yazdır',
      cancel: 'İptal',
      preview: 'Yazdırma Önizlemesi',
      printTime: 'Yazdırma Zamanı',
      total: 'Toplam {total} öğe',
      page: 'Sayfa {page}',
      yes: 'Evet',
      no: 'Hayır',
      // Araç Çubuğu
      toolbar: {
        refresh: 'Yenile',
        density: 'Yoğunluk',
        densityDefault: 'Varsayılan',
        densityLarge: 'Büyük',
        densitySmall: 'Küçük',
        columnSetting: 'Sütun Ayarları',
        fullscreen: 'Tam Ekran',
        exitFullscreen: 'Tam Ekrandan Çık',
        export: 'Dışa Aktar',
        import: 'İçe Aktar',
        search: 'Ara',
        searchPlaceholder: 'Aramak için anahtar kelimeler girin'
      },
      // Filtre
      filter: {
        selectAll: 'Tümünü seç',
        selectInvert: 'Seçimi tersine çevir',
        empty: 'Boş',
        notEmpty: 'Boş değil',
        contains: 'İçerir',
        notContains: 'İçermez',
        equals: 'Eşittir',
        notEquals: 'Eşit değildir',
        startsWith: 'İle başlar',
        endsWith: 'İle biter',
        greaterThan: 'Büyüktür',
        lessThan: 'Küçüktür',
        between: 'Arasında'
      },
      // Sıralama
      sort: {
        asc: 'Artan',
        desc: 'Azalan',
        clear: 'Sıralamayı temizle'
      },
      // Dışa Aktarma
      export: {
        title: 'Verileri Dışa Aktar',
        filename: 'Dosya Adı',
        type: 'Dosya Türü',
        scope: 'Dışa Aktarma Kapsamı',
        scopeAll: 'Tüm Veriler',
        scopeSelected: 'Seçili Veriler',
        scopeCurrentPage: 'Mevcut Sayfa',
        includeHeader: 'Başlığı Dahil Et',
        exporting: 'Dışa aktarılıyor...',
        success: 'Dışa Aktarma Başarılı',
        error: 'Dışa Aktarma Başarısız'
      },
      // İçe Aktarma
      import: {
        title: 'Verileri İçe Aktar',
        selectFile: 'Dosya Seç',
        dragTip: 'Yüklemek için tıklayın veya dosyayı buraya sürükleyin',
        importing: 'İçe aktarılıyor...',
        success: 'İçe Aktarma Başarılı',
        error: 'İçe Aktarma Başarısız',
        preview: 'Veri Önizlemesi',
        confirm: 'İçe Aktarmayı Onayla'
      },
      // Yazdırma
      printConfig: {
        title: 'Yazdırma Ayarları',
        pageTitle: 'Sayfa Başlığı',
        pageHeader: 'Başlık',
        pageFooter: 'Alt Bilgi',
        printAll: 'Tümünü Yazdır',
        printSelected: 'Seçileni Yazdır',
        printCurrentPage: 'Mevcut Sayfayı Yazdır',
        landscape: 'Yatay',
        portrait: 'Dikey',
        printing: 'Yazdırılıyor...'
      },
      // Sütun Ayarları
      columnSetting: {
        title: 'Sütun Ayarları',
        showAll: 'Tümünü Göster',
        hideAll: 'Tümünü Gizle',
        reset: 'Sıfırla',
        fixedLeft: 'Sola Sabitle',
        fixedRight: 'Sağa Sabitle',
        unfixed: 'Sabitlemeyi Kaldır'
      },
      // Bağlam Menüsü
      contextMenu: {
        copy: 'Kopyala',
        copyRow: 'Satırı Kopyala',
        copyCell: 'Hücreyi Kopyala',
        paste: 'Yapıştır',
        insertRowAbove: 'Yukarıya Satır Ekle',
        insertRowBelow: 'Aşağıya Satır Ekle',
        deleteRow: 'Satırı Sil',
        deleteSelectedRows: 'Seçili Satırları Sil',
        exportSelected: 'Seçileni Dışa Aktar'
      },
      // Seçim
      selection: {
        selectAll: 'Tümünü seç',
        selectInvert: 'Seçimi tersine çevir',
        selectNone: 'Seçimi temizle',
        selected: '{count} öğe seçildi'
      },
      // Genişlet
      expand: {
        expandAll: 'Tümünü genişlet',
        collapseAll: 'Tümünü daralt'
      },
      // Ağaç
      tree: {
        expandAll: 'Tümünü genişlet',
        collapseAll: 'Tümünü daralt',
        expandLevel: 'Seviye {level}\'ye genişlet'
      },
      // Sürükle
      drag: {
        dragTip: 'Yeniden sıralamak için sürükle',
        dropTip: 'Yerleştirmek için bırak'
      }
    },
    // Mesaj Kutusu
    messagebox: {
      title: 'Mesaj',
      confirm: 'Tamam',
      cancel: 'İptal',
      close: 'Kapat',
      error: 'Geçersiz giriş',
      alert: 'Uyarı',
      prompt: 'İstem',
      inputPlaceholder: 'Lütfen girin'
    },
    // Yükleme
    upload: {
      deleteTip: 'kaldırmak için delete tuşuna basın',
      delete: 'Sil',
      preview: 'Önizleme',
      continue: 'Devam Et',
      upload: 'Yüklemek için tıklayın',
      tip: 'Yüklemek için dosyayı bu alana tıklayın veya sürükleyin',
      dragTip: 'Dosyayı buraya bırakın veya yüklemek için tıklayın',
      uploading: 'Yükleniyor...',
      success: 'Yükleme başarılı',
      error: 'Yükleme başarısız',
      retry: 'Yeniden Dene',
      cancel: 'Yüklemeyi iptal et',
      fileTypeError: 'Dosya türü desteklenmiyor',
      fileSizeError: 'Dosya boyutu limiti aşıyor',
      fileCountError: 'Dosya sayısı limiti aşıyor'
    },
    // Form
    form: {
      validationFailed: 'Doğrulama başarısız',
      required: 'Gerekli',
      pleaseInput: 'Lütfen girin',
      pleaseSelect: 'Lütfen seçin'
    },
    // Buton
    button: {
      loading: 'Yükleniyor...'
    },
    // Giriş
    input: {
      placeholder: 'Lütfen girin',
      clear: 'Temizle',
      showPassword: 'Şifreyi göster',
      hidePassword: 'Şifreyi gizle',
      copy: 'Kopyala',
      copied: 'Kopyalandı'
    },
    // Sayı Girişi
    inputnumber: {
      placeholder: 'Lütfen sayı girin',
      increase: 'Artır',
      decrease: 'Azalt'
    },
    // Etiket Girişi
    inputtag: {
      placeholder: 'Lütfen girin',
      add: 'Ekle',
      remove: 'Kaldır'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'Daha fazla'
    },
    // Yukarı Dön
    backtop: {
      text: 'Yukarı Dön'
    },
    // Seçim
    select: {
      placeholder: 'Lütfen seçin',
      noData: 'Veri yok',
      loading: 'Yükleniyor...',
      noMatch: 'Eşleşen veri yok',
      selectAll: 'Tümünü seç',
      clearAll: 'Tümünü temizle'
    },
    // Sayfalama
    pagination: {
      goto: 'Git',
      page: '',
      total: 'Toplam {total}',
      pageSize: '/sayfa',
      prev: 'Önceki',
      next: 'Sonraki',
      first: 'İlk',
      last: 'Son',
      pageClassifier: ''
    },
    // Popconfirm
    popconfirm: {
      confirm: 'Tamam',
      cancel: 'İptal',
      dontAskAgain: 'Tekrar sorma'
    },
    // Diyalog
    dialog: {
      confirm: 'Tamam',
      cancel: 'İptal',
      close: 'Kapat',
      maximize: 'Büyüt',
      restore: 'Geri Yükle'
    },
    // Çekmece
    drawer: {
      close: 'Kapat',
      confirm: 'Tamam',
      cancel: 'İptal'
    },
    // Açılır Menü
    dropdown: {
      loading: 'Yükleniyor...'
    },
    // Resim
    image: {
      error: 'BAŞARISIZ',
      loading: 'Yükleniyor...',
      preview: 'Önizleme',
      zoomIn: 'Yakınlaştır',
      zoomOut: 'Uzaklaştır',
      rotateLeft: 'Sola döndür',
      rotateRight: 'Sağa döndür',
      originalSize: 'Orijinal Boyut',
      fullscreen: 'Tam Ekran'
    },
    // Resim Görüntüleyici
    imageviewer: {
      close: 'Kapat',
      prev: 'Önceki',
      next: 'Sonraki',
      zoomIn: 'Yakınlaştır',
      zoomOut: 'Uzaklaştır',
      rotateLeft: 'Sola döndür',
      rotateRight: 'Sağa döndür',
      reset: 'Sıfırla',
      fullscreen: 'Tam Ekran',
      exitFullscreen: 'Tam Ekrandan Çık'
    },
    // Sonsuz Kaydırma
    infinitescroll: {
      loading: 'Yükleniyor...',
      finished: 'Daha fazla veri yok',
      error: 'Yükleme başarısız, yeniden denemek için tıklayın',
      retry: 'Yeniden denemek için tıklayın'
    },
    // Mesaj
    message: {
      close: 'Kapat'
    },
    // Bildirim
    notification: {
      close: 'Kapat'
    },
    // Yükleme
    loading: {
      text: 'Yükleniyor...'
    },
    // Döndürme
    spin: {
      text: 'Yükleniyor...'
    },
    // Oran
    rate: {
      texts: ['Çok kötü', 'Hayal kırıklığı', 'Adil', 'Memnun', 'Şaşırtıcı']
    },
    // Uyarı
    alert: {
      close: 'Kapat'
    },
    // Etiket
    tag: {
      close: 'Kapat'
    },
    // Sekmeler
    tabs: {
      close: 'Kapat',
      add: 'Ekle',
      more: 'Daha fazla'
    },
    // Adımlar
    steps: {
      finish: 'Bitti',
      process: 'Devam Ediyor',
      wait: 'Bekliyor',
      error: 'Hata'
    },
    // İlerleme
    progress: {
      success: 'Başarılı',
      exception: 'İstisna',
      warning: 'Uyarı'
    },
    // İskelet
    skeleton: {
      loading: 'Yükleniyor...'
    },
    // Boş
    empty: {
      description: 'Veri yok',
      noData: 'Veri yok',
      noResult: 'Sonuç yok',
      networkError: 'Ağ Hatası',
      serverError: 'Sunucu Hatası'
    },
    // Sonuç
    result: {
      success: 'Başarılı',
      error: 'Hata',
      warning: 'Uyarı',
      info: 'Bilgi',
      backHome: 'Ana Sayfaya Dön'
    },
    // Şelale
    waterfall: {
      loading: 'Yükleniyor...',
      noMore: 'Daha fazla veri yok',
      empty: 'Veri yok'
    },
    // Açıklamalar
    descriptions: {
      colon: ':'
    },
    // Kaydırıcı
    slider: {
      tipFormatter: '{value}'
    },
    // Anahtar
    switch: {
      on: 'AÇIK',
      off: 'KAPALI'
    },
    // Onay Kutusu
    checkbox: {
      selectAll: 'Tümünü seç'
    },
    // Radyo
    radio: {},
    // Menü
    menu: {
      collapse: 'Menüyü Daralt',
      expand: 'Menüyü Genişlet'
    },
    // Kart
    card: {
      collapse: 'Daralt',
      expand: 'Genişlet'
    },
    // Daralt
    collapse: {
      expand: 'Genişlet',
      collapse: 'Daralt'
    },
    // İpucu
    tooltip: {},
    // Popover
    popover: {},
    // Rozet
    badge: {},
    // Avatar
    avatar: {
      error: 'Yükleme başarısız'
    },
    // Filigran
    watermark: {},
    // Ayırıcı
    divider: {},
    // Karyola
    carousel: {
      prev: 'Önceki',
      next: 'Sonraki'
    },
    // Kayan Yazı
    marquee: {},
    // Sabitleme
    affix: {},
    // Çapa
    anchor: {}
  }
}

export default tr
