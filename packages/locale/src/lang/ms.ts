import type { Language } from '../index'

export const ms: Language = {
  name: 'ms',
  yh: {
    // Umum
    common: {
      yes: 'Ya',
      no: 'Tidak',
      confirm: 'Sahkan',
      cancel: 'Batal',
      loading: 'Memuatkan',
      close: 'Tutup',
      clear: 'Kosongkan',
      reset: 'Set semula',
      save: 'Simpan',
      delete: 'Padam',
      edit: 'Sunting',
      add: 'Tambah',
      search: 'Cari',
      refresh: 'Muat semula',
      expand: 'Kembangkan',
      collapse: 'Runtuhkan',
      more: 'Lagi',
      noData: 'Tiada data',
      noMatch: 'Tiada data yang sepadan',
      selectAll: 'Pilih semua',
      unselectAll: 'Nyahpilih semua'
    },
    // Pemilih warna
    colorpicker: {
      confirm: 'OK',
      clear: 'Kosongkan',
      eyeDropper: 'Pipet',
      suggestionDark: 'Teks putih adalah terbaik',
      suggestionLight: 'Teks hitam adalah terbaik',
      recentColors: 'Warna terkini',
      presetColors: 'Warna yang telah ditetapkan'
    },
    // Pemilih tarikh
    datepicker: {
      now: 'Sekarang',
      today: 'Hari ini',
      cancel: 'Batal',
      clear: 'Kosongkan',
      confirm: 'OK',
      selectDate: 'Pilih tarikh',
      selectTime: 'Pilih masa',
      startDate: 'Tarikh mula',
      startTime: 'Masa mula',
      endDate: 'Tarikh akhir',
      endTime: 'Masa akhir',
      year: '',
      month: '',
      day: '',
      week: 'Minggu',
      monthBeforeYear: true,
      prevYear: 'Tahun sebelumnya',
      nextYear: 'Tahun seterusnya',
      prevMonth: 'Bulan sebelumnya',
      nextMonth: 'Bulan seterusnya',
      weeks: {
        sun: 'Ahd',
        mon: 'Isn',
        tue: 'Sel',
        wed: 'Rab',
        thu: 'Kha',
        fri: 'Jum',
        sat: 'Sab'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mac',
        apr: 'Apr',
        may: 'Mei',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Ogo',
        sep: 'Sep',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Dis'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Pemilih masa
    timepicker: {
      confirm: 'OK',
      cancel: 'Batal',
      now: 'Sekarang',
      placeholder: 'Pilih masa',
      startPlaceholder: 'Masa mula',
      endPlaceholder: 'Masa akhir',
      selectTime: 'Pilih masa'
    },
    // Pilih masa
    timeselect: {
      placeholder: 'Pilih masa'
    },
    // Pokok
    tree: {
      emptyText: 'Tiada data',
      loading: 'Memuatkan...',
      checkAll: 'Pilih semua',
      uncheckAll: 'Nyahpilih semua',
      expandAll: 'Kembangkan semua',
      collapseAll: 'Runtuhkan semua'
    },
    // Pilih pokok
    treeselect: {
      placeholder: 'Pilih',
      emptyText: 'Tiada data',
      loading: 'Memuatkan...',
      noMatch: 'Tiada data yang sepadan'
    },
    // Kalendar
    calendar: {
      prevMonth: 'Bulan sebelumnya',
      nextMonth: 'Bulan seterusnya',
      prevYear: 'Tahun sebelumnya',
      nextYear: 'Tahun seterusnya',
      today: 'Hari ini',
      week: 'Minggu',
      holiday: 'Cuti',
      workday: 'Kerja',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Ahd',
        mon: 'Isn',
        tue: 'Sel',
        wed: 'Rab',
        thu: 'Kha',
        fri: 'Jum',
        sat: 'Sab'
      }
    },
    // Pelengkapan automatik
    autocomplete: {
      loading: 'Memuatkan...',
      placeholder: 'Sila masukkan',
      noData: 'Tiada data',
      noMatch: 'Tiada data yang sepadan'
    },
    // Kiraan undur
    countdown: {
      days: 'hari',
      hours: 'jam',
      minutes: 'minit',
      seconds: 'saat',
      milliseconds: 'milisaat',
      finished: 'Selesai'
    },
    // Pemilih kaskad
    cascader: {
      noMatch: 'Tiada data yang sepadan',
      placeholder: 'Pilih',
      loading: 'Memuatkan...',
      noData: 'Tiada data'
    },
    // Pemindahan
    transfer: {
      noMatch: 'Tiada data yang sepadan',
      noData: 'Tiada data',
      titles: ['Senarai 1', 'Senarai 2'],
      filterPlaceholder: 'Masukkan kata kunci',
      noCheckedFormat: '{total} item',
      hasCheckedFormat: '{checked}/{total} dipilih',
      searchPlaceholder: 'Masukkan kata kunci'
    },
    // Jadual
    table: {
      emptyText: 'Tiada data',
      confirmFilter: 'Sahkan',
      resetFilter: 'Set semula',
      clearFilter: 'Semua',
      sumText: 'Jumlah',
      loading: 'Memuatkan...',
      index: 'Indeks',
      print: 'Cetak',
      cancel: 'Batal',
      preview: 'Pratonton cetak',
      printTime: 'Masa cetak',
      total: 'Jumlah {total} item',
      page: 'Halaman {page}',
      yes: 'Ya',
      no: 'Tidak',
      // Bar alat
      toolbar: {
        refresh: 'Muat semula',
        density: 'Ketumpatan',
        densityDefault: 'Lalai',
        densityLarge: 'Besar',
        densitySmall: 'Kecil',
        columnSetting: 'Tetapan lajur',
        fullscreen: 'Skrin penuh',
        exitFullscreen: 'Keluar dari skrin penuh',
        export: 'Eksport',
        import: 'Import',
        search: 'Cari',
        searchPlaceholder: 'Masukkan kata kunci untuk mencari'
      },
      // Penapis
      filter: {
        selectAll: 'Pilih semua',
        selectInvert: 'Terbalikkan pilihan',
        empty: 'Kosong',
        notEmpty: 'Tidak kosong',
        contains: 'Mengandungi',
        notContains: 'Tidak mengandungi',
        equals: 'Sama dengan',
        notEquals: 'Tidak sama dengan',
        startsWith: 'Bermula dengan',
        endsWith: 'Berakhir dengan',
        greaterThan: 'Lebih besar daripada',
        lessThan: 'Lebih kecil daripada',
        between: 'Antara'
      },
      // Susun
      sort: {
        asc: 'Menaik',
        desc: 'Menurun',
        clear: 'Kosongkan susunan'
      },
      // Eksport
      export: {
        title: 'Eksport data',
        filename: 'Nama fail',
        type: 'Jenis fail',
        scope: 'Skop eksport',
        scopeAll: 'Semua data',
        scopeSelected: 'Data yang dipilih',
        scopeCurrentPage: 'Halaman semasa',
        includeHeader: 'Sertakan pengepala',
        exporting: 'Mengeksport...',
        success: 'Eksport berjaya',
        error: 'Eksport gagal'
      },
      // Import
      import: {
        title: 'Import data',
        selectFile: 'Pilih fail',
        dragTip: 'Klik atau seret fail ke sini untuk memuat naik',
        importing: 'Mengimport...',
        success: 'Import berjaya',
        error: 'Import gagal',
        preview: 'Pratonton data',
        confirm: 'Sahkan import'
      },
      // Cetak
      printConfig: {
        title: 'Tetapan cetak',
        pageTitle: 'Tajuk halaman',
        pageHeader: 'Pengepala',
        pageFooter: 'Pengaki',
        printAll: 'Cetak semua',
        printSelected: 'Cetak yang dipilih',
        printCurrentPage: 'Cetak halaman semasa',
        landscape: 'Landskap',
        portrait: 'Potret',
        printing: 'Mencetak...'
      },
      // Tetapan lajur
      columnSetting: {
        title: 'Tetapan lajur',
        showAll: 'Tunjukkan semua',
        hideAll: 'Sembunyikan semua',
        reset: 'Set semula',
        fixedLeft: 'Tetapkan ke kiri',
        fixedRight: 'Tetapkan ke kanan',
        unfixed: 'Lepaskan'
      },
      // Menu konteks
      contextMenu: {
        copy: 'Salin',
        copyRow: 'Salin baris',
        copyCell: 'Salin sel',
        paste: 'Tampal',
        insertRowAbove: 'Masukkan baris di atas',
        insertRowBelow: 'Masukkan baris di bawah',
        deleteRow: 'Padam baris',
        deleteSelectedRows: 'Padam baris yang dipilih',
        exportSelected: 'Eksport yang dipilih'
      },
      // Pilihan
      selection: {
        selectAll: 'Pilih semua',
        selectInvert: 'Terbalikkan pilihan',
        selectNone: 'Kosongkan pilihan',
        selected: '{count} item dipilih'
      },
      // Kembangkan
      expand: {
        expandAll: 'Kembangkan semua',
        collapseAll: 'Runtuhkan semua'
      },
      // Pokok
      tree: {
        expandAll: 'Kembangkan semua',
        collapseAll: 'Runtuhkan semua',
        expandLevel: 'Kembangkan ke peringkat {level}'
      },
      // Seret
      drag: {
        dragTip: 'Seret untuk menyusun semula',
        dropTip: 'Lepaskan untuk meletakkan'
      }
    },
    // Kotak mesej
    messagebox: {
      title: 'Mesej',
      confirm: 'OK',
      cancel: 'Batal',
      close: 'Tutup',
      error: 'Input tidak sah',
      alert: 'Amaran',
      prompt: 'Tinggal',
      inputPlaceholder: 'Sila masukkan'
    },
    // Muat naik
    upload: {
      deleteTip: 'tekan delete untuk membuang',
      delete: 'Padam',
      preview: 'Pratonton',
      continue: 'Teruskan',
      upload: 'Klik untuk memuat naik',
      tip: 'Klik atau seret fail ke kawasan ini untuk <em>memuat naik</em>',
      dragTip: 'Lepaskan fail di sini atau klik untuk memuat naik',
      uploading: 'Memuat naik...',
      success: 'Muat naik berjaya',
      error: 'Muat naik gagal',
      retry: 'Cuba lagi',
      cancel: 'Batal muat naik',
      fileTypeError: 'Jenis fail tidak disokong',
      fileSizeError: 'Saiz fail melebihi had',
      fileCountError: 'Bilangan fail melebihi had'
    },
    // Borang
    form: {
      validationFailed: 'Pengesahan gagal',
      required: 'Diperlukan',
      pleaseInput: 'Sila masukkan',
      pleaseSelect: 'Sila pilih'
    },
    // Butang
    button: {
      loading: 'Memuatkan...'
    },
    // Input
    input: {
      placeholder: 'Sila masukkan',
      clear: 'Kosongkan',
      showPassword: 'Tunjukkan kata laluan',
      hidePassword: 'Sembunyikan kata laluan',
      copy: 'Salin',
      copied: 'Disalin'
    },
    // Input nombor
    inputnumber: {
      placeholder: 'Sila masukkan nombor',
      increase: 'Tingkatkan',
      decrease: 'Kurangkan'
    },
    // Input tag
    inputtag: {
      placeholder: 'Sila masukkan',
      add: 'Tambah',
      remove: 'Buang'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Navigasi',
      more: 'Lagi'
    },
    // Kembali ke atas
    backtop: {
      text: 'Kembali ke atas'
    },
    // Pilih
    select: {
      placeholder: 'Sila pilih',
      noData: 'Tiada data',
      loading: 'Memuatkan...',
      noMatch: 'Tiada data yang sepadan',
      selectAll: 'Pilih semua',
      clearAll: 'Kosongkan semua'
    },
    // Paginasi
    pagination: {
      goto: 'Pergi ke',
      page: '',
      total: 'Jumlah {total}',
      pageSize: '/halaman',
      prev: 'Sebelumnya',
      next: 'Seterusnya',
      first: 'Pertama',
      last: 'Terakhir',
      pageClassifier: ''
    },
    // Sahkan popup
    popconfirm: {
      confirm: 'OK',
      cancel: 'Batal',
      dontAskAgain: 'Jangan tanya lagi'
    },
    // Dialog
    dialog: {
      confirm: 'OK',
      cancel: 'Batal',
      close: 'Tutup',
      maximize: 'Maksimumkan',
      restore: 'Pulihkan'
    },
    // Laci
    drawer: {
      close: 'Tutup',
      confirm: 'OK',
      cancel: 'Batal'
    },
    // Menu juntai bawah
    dropdown: {
      loading: 'Memuatkan...'
    },
    // Imej
    image: {
      error: 'GAGAL',
      loading: 'Memuatkan...',
      preview: 'Pratonton',
      zoomIn: 'Zum masuk',
      zoomOut: 'Zum keluar',
      rotateLeft: 'Putar kiri',
      rotateRight: 'Putar kanan',
      originalSize: 'Saiz asal',
      fullscreen: 'Skrin penuh'
    },
    // Penonton imej
    imageviewer: {
      close: 'Tutup',
      prev: 'Sebelumnya',
      next: 'Seterusnya',
      zoomIn: 'Zum masuk',
      zoomOut: 'Zum keluar',
      rotateLeft: 'Putar kiri',
      rotateRight: 'Putar kanan',
      reset: 'Set semula',
      fullscreen: 'Skrin penuh',
      exitFullscreen: 'Keluar dari skrin penuh'
    },
    // Tatal tak terhingga
    infinitescroll: {
      loading: 'Memuatkan...',
      finished: 'Tiada data lagi',
      error: 'Memuatkan gagal, klik untuk mencuba lagi',
      retry: 'Klik untuk mencuba lagi'
    },
    // Mesej
    message: {
      close: 'Tutup'
    },
    // Pemberitahuan
    notification: {
      close: 'Tutup'
    },
    // Memuatkan
    loading: {
      text: 'Memuatkan...'
    },
    // Putar
    spin: {
      text: 'Memuatkan...'
    },
    // Kadar
    rate: {
      texts: ['Sangat teruk', 'Kecewa', 'Sederhana', 'Berpuas hati', 'Terkejut']
    },
    // Amaran
    alert: {
      close: 'Tutup'
    },
    // Tag
    tag: {
      close: 'Tutup'
    },
    // Tab
    tabs: {
      close: 'Tutup',
      add: 'Tambah',
      more: 'Lagi'
    },
    // Langkah
    steps: {
      finish: 'Selesai',
      process: 'Sedang berlangsung',
      wait: 'Menunggu',
      error: 'Ralat'
    },
    // Kemajuan
    progress: {
      success: 'Berjaya',
      exception: 'Pengecualian',
      warning: 'Amaran'
    },
    // Rangka
    skeleton: {
      loading: 'Memuatkan...'
    },
    // Kosong
    empty: {
      description: 'Tiada data',
      noData: 'Tiada data',
      noResult: 'Tiada hasil',
      networkError: 'Ralat rangkaian',
      serverError: 'Ralat pelayan'
    },
    // Hasil
    result: {
      success: 'Berjaya',
      error: 'Ralat',
      warning: 'Amaran',
      info: 'Maklumat',
      backHome: 'Kembali ke laman utama'
    },
    // Air terjun
    waterfall: {
      loading: 'Memuatkan...',
      noMore: 'Tiada data lagi',
      empty: 'Tiada data'
    },
    // Penerangan
    descriptions: {
      colon: ':'
    },
    // Slider
    slider: {
      tipFormatter: '{value}'
    },
    // Suis
    switch: {
      on: 'HIDUP',
      off: 'MATI'
    },
    // Kotak semak
    checkbox: {
      selectAll: 'Pilih semua'
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: 'Runtuhkan menu',
      expand: 'Kembangkan menu'
    },
    // Kad
    card: {
      collapse: 'Runtuhkan',
      expand: 'Kembangkan'
    },
    // Runtuh
    collapse: {
      expand: 'Kembangkan',
      collapse: 'Runtuhkan'
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: 'Memuatkan gagal'
    },
    // Tanda air
    watermark: {},
    // Pembahagi
    divider: {},
    // Karusel
    carousel: {
      prev: 'Sebelumnya',
      next: 'Seterusnya'
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Jangkar
    anchor: {}
  }
}

export default ms
