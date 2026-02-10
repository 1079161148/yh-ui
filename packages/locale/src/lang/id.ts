import type { Language } from '../index'

export const id: Language = {
  name: 'id',
  yh: {
    // Umum
    common: {
      yes: 'Ya',
      no: 'Tidak',
      confirm: 'Konfirmasi',
      cancel: 'Batal',
      loading: 'Memuat',
      close: 'Tutup',
      clear: 'Hapus',
      reset: 'Atur ulang',
      save: 'Simpan',
      delete: 'Hapus',
      edit: 'Ubah',
      add: 'Tambah',
      search: 'Cari',
      refresh: 'Muat ulang',
      expand: 'Perluas',
      collapse: 'Ciutkan',
      more: 'Lainnya',
      noData: 'Tidak ada data',
      noMatch: 'Tidak ada data yang cocok',
      selectAll: 'Pilih semua',
      unselectAll: 'Batalkan pilihan semua'
    },
    // Pemilih warna
    colorpicker: {
      confirm: 'OK',
      clear: 'Hapus',
      eyeDropper: 'Pipet',
      suggestionDark: 'Teks putih terbaik',
      suggestionLight: 'Teks hitam terbaik',
      recentColors: 'Warna terbaru',
      presetColors: 'Warna yang telah ditetapkan'
    },
    // Pemilih tanggal
    datepicker: {
      now: 'Sekarang',
      today: 'Hari ini',
      cancel: 'Batal',
      clear: 'Hapus',
      confirm: 'OK',
      selectDate: 'Pilih tanggal',
      selectTime: 'Pilih waktu',
      startDate: 'Tanggal mulai',
      startTime: 'Waktu mulai',
      endDate: 'Tanggal akhir',
      endTime: 'Waktu akhir',
      year: '',
      month: '',
      day: '',
      week: 'Minggu',
      monthBeforeYear: true,
      prevYear: 'Tahun sebelumnya',
      nextYear: 'Tahun berikutnya',
      prevMonth: 'Bulan sebelumnya',
      nextMonth: 'Bulan berikutnya',
      weeks: {
        sun: 'Min',
        mon: 'Sen',
        tue: 'Sel',
        wed: 'Rab',
        thu: 'Kam',
        fri: 'Jum',
        sat: 'Sab'
      },
      months: {
        jan: 'Jan',
        feb: 'Feb',
        mar: 'Mar',
        apr: 'Apr',
        may: 'Mei',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Agu',
        sep: 'Sep',
        oct: 'Okt',
        nov: 'Nov',
        dec: 'Des'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Pemilih waktu
    timepicker: {
      confirm: 'OK',
      cancel: 'Batal',
      now: 'Sekarang',
      placeholder: 'Pilih waktu',
      startPlaceholder: 'Waktu mulai',
      endPlaceholder: 'Waktu akhir',
      selectTime: 'Pilih waktu'
    },
    // Pilih waktu
    timeselect: {
      placeholder: 'Pilih waktu'
    },
    // Pohon
    tree: {
      emptyText: 'Tidak ada data',
      loading: 'Memuat...',
      checkAll: 'Pilih semua',
      uncheckAll: 'Batalkan pilihan semua',
      expandAll: 'Perluas semua',
      collapseAll: 'Ciutkan semua'
    },
    // Pilih pohon
    treeselect: {
      placeholder: 'Pilih',
      emptyText: 'Tidak ada data',
      loading: 'Memuat...',
      noMatch: 'Tidak ada data yang cocok'
    },
    // Kalender
    calendar: {
      prevMonth: 'Bulan sebelumnya',
      nextMonth: 'Bulan berikutnya',
      prevYear: 'Tahun sebelumnya',
      nextYear: 'Tahun berikutnya',
      today: 'Hari ini',
      week: 'Minggu',
      holiday: 'Libur',
      workday: 'Kerja',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Min',
        mon: 'Sen',
        tue: 'Sel',
        wed: 'Rab',
        thu: 'Kam',
        fri: 'Jum',
        sat: 'Sab'
      }
    },
    // Pelengkapan otomatis
    autocomplete: {
      loading: 'Memuat...',
      placeholder: 'Silakan masukkan',
      noData: 'Tidak ada data',
      noMatch: 'Tidak ada data yang cocok'
    },
    // Hitung mundur
    countdown: {
      days: 'hari',
      hours: 'jam',
      minutes: 'menit',
      seconds: 'detik',
      milliseconds: 'milidetik',
      finished: 'Selesai'
    },
    // Pemilih kaskade
    cascader: {
      noMatch: 'Tidak ada data yang cocok',
      placeholder: 'Pilih',
      loading: 'Memuat...',
      noData: 'Tidak ada data'
    },
    // Transfer
    transfer: {
      noMatch: 'Tidak ada data yang cocok',
      noData: 'Tidak ada data',
      titles: ['Daftar 1', 'Daftar 2'],
      filterPlaceholder: 'Masukkan kata kunci',
      noCheckedFormat: '{total} item',
      hasCheckedFormat: '{checked}/{total} dipilih',
      searchPlaceholder: 'Masukkan kata kunci'
    },
    // Tabel
    table: {
      emptyText: 'Tidak ada data',
      confirmFilter: 'Konfirmasi',
      resetFilter: 'Atur ulang',
      clearFilter: 'Semua',
      sumText: 'Jumlah',
      loading: 'Memuat...',
      index: 'Indeks',
      print: 'Cetak',
      cancel: 'Batal',
      preview: 'Pratinjau cetak',
      printTime: 'Waktu cetak',
      total: 'Total {total} item',
      page: 'Halaman {page}',
      yes: 'Ya',
      no: 'Tidak',
      // Toolbar
      toolbar: {
        refresh: 'Muat ulang',
        density: 'Kepadatan',
        densityDefault: 'Default',
        densityLarge: 'Besar',
        densitySmall: 'Kecil',
        columnSetting: 'Pengaturan kolom',
        fullscreen: 'Layar penuh',
        exitFullscreen: 'Keluar dari layar penuh',
        export: 'Ekspor',
        import: 'Impor',
        search: 'Cari',
        searchPlaceholder: 'Masukkan kata kunci untuk mencari'
      },
      // Filter
      filter: {
        selectAll: 'Pilih semua',
        selectInvert: 'Balikkan pilihan',
        empty: 'Kosong',
        notEmpty: 'Tidak kosong',
        contains: 'Berisi',
        notContains: 'Tidak berisi',
        equals: 'Sama dengan',
        notEquals: 'Tidak sama dengan',
        startsWith: 'Dimulai dengan',
        endsWith: 'Diakhiri dengan',
        greaterThan: 'Lebih besar dari',
        lessThan: 'Lebih kecil dari',
        between: 'Antara'
      },
      // Urutkan
      sort: {
        asc: 'Naik',
        desc: 'Turun',
        clear: 'Hapus pengurutan'
      },
      // Ekspor
      export: {
        title: 'Ekspor data',
        filename: 'Nama file',
        type: 'Jenis file',
        scope: 'Ruang lingkup ekspor',
        scopeAll: 'Semua data',
        scopeSelected: 'Data yang dipilih',
        scopeCurrentPage: 'Halaman saat ini',
        includeHeader: 'Sertakan header',
        exporting: 'Mengekspor...',
        success: 'Ekspor berhasil',
        error: 'Ekspor gagal'
      },
      // Impor
      import: {
        title: 'Impor data',
        selectFile: 'Pilih file',
        dragTip: 'Klik atau seret file ke sini untuk mengunggah',
        importing: 'Mengimpor...',
        success: 'Impor berhasil',
        error: 'Impor gagal',
        preview: 'Pratinjau data',
        confirm: 'Konfirmasi impor'
      },
      // Cetak
      printConfig: {
        title: 'Pengaturan cetak',
        pageTitle: 'Judul halaman',
        pageHeader: 'Kepala',
        pageFooter: 'Kaki',
        printAll: 'Cetak semua',
        printSelected: 'Cetak yang dipilih',
        printCurrentPage: 'Cetak halaman saat ini',
        landscape: 'Lanskap',
        portrait: 'Potret',
        printing: 'Mencetak...'
      },
      // Pengaturan kolom
      columnSetting: {
        title: 'Pengaturan kolom',
        showAll: 'Tampilkan semua',
        hideAll: 'Sembunyikan semua',
        reset: 'Atur ulang',
        fixedLeft: 'Tetapkan ke kiri',
        fixedRight: 'Tetapkan ke kanan',
        unfixed: 'Lepaskan'
      },
      // Menu konteks
      contextMenu: {
        copy: 'Salin',
        copyRow: 'Salin baris',
        copyCell: 'Salin sel',
        paste: 'Tempel',
        insertRowAbove: 'Sisipkan baris di atas',
        insertRowBelow: 'Sisipkan baris di bawah',
        deleteRow: 'Hapus baris',
        deleteSelectedRows: 'Hapus baris yang dipilih',
        exportSelected: 'Ekspor yang dipilih'
      },
      // Pilihan
      selection: {
        selectAll: 'Pilih semua',
        selectInvert: 'Balikkan pilihan',
        selectNone: 'Hapus pilihan',
        selected: '{count} item dipilih'
      },
      // Perluas
      expand: {
        expandAll: 'Perluas semua',
        collapseAll: 'Ciutkan semua'
      },
      // Pohon
      tree: {
        expandAll: 'Perluas semua',
        collapseAll: 'Ciutkan semua',
        expandLevel: 'Perluas ke level {level}'
      },
      // Seret
      drag: {
        dragTip: 'Seret untuk mengurutkan ulang',
        dropTip: 'Jatuhkan untuk menempatkan'
      }
    },
    // Kotak pesan
    messagebox: {
      title: 'Pesan',
      confirm: 'OK',
      cancel: 'Batal',
      close: 'Tutup',
      error: 'Input tidak valid',
      alert: 'Peringatan',
      prompt: 'Permintaan',
      inputPlaceholder: 'Silakan masukkan'
    },
    // Unggah
    upload: {
      deleteTip: 'tekan delete untuk menghapus',
      delete: 'Hapus',
      preview: 'Pratinjau',
      continue: 'Lanjutkan',
      upload: 'Klik untuk mengunggah',
      tip: 'Klik atau seret file ke area ini untuk <em>mengunggah</em>',
      dragTip: 'Jatuhkan file di sini atau klik untuk mengunggah',
      uploading: 'Mengunggah...',
      success: 'Unggah berhasil',
      error: 'Unggah gagal',
      retry: 'Coba lagi',
      cancel: 'Batalkan unggah',
      fileTypeError: 'Jenis file tidak didukung',
      fileSizeError: 'Ukuran file melebihi batas',
      fileCountError: 'Jumlah file melebihi batas'
    },
    // Formulir
    form: {
      validationFailed: 'Validasi gagal',
      required: 'Diperlukan',
      pleaseInput: 'Silakan masukkan',
      pleaseSelect: 'Silakan pilih'
    },
    // Tombol
    button: {
      loading: 'Memuat...'
    },
    // Input
    input: {
      placeholder: 'Silakan masukkan',
      clear: 'Hapus',
      showPassword: 'Tampilkan kata sandi',
      hidePassword: 'Sembunyikan kata sandi',
      copy: 'Salin',
      copied: 'Disalin'
    },
    // Input angka
    inputnumber: {
      placeholder: 'Silakan masukkan angka',
      increase: 'Tingkatkan',
      decrease: 'Kurangi'
    },
    // Input tag
    inputtag: {
      placeholder: 'Silakan masukkan',
      add: 'Tambah',
      remove: 'Hapus'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Navigasi',
      more: 'Lainnya'
    },
    // Kembali ke atas
    backtop: {
      text: 'Kembali ke atas'
    },
    // Pilih
    select: {
      placeholder: 'Silakan pilih',
      noData: 'Tidak ada data',
      loading: 'Memuat...',
      noMatch: 'Tidak ada data yang cocok',
      selectAll: 'Pilih semua',
      clearAll: 'Hapus semua'
    },
    // Paginasi
    pagination: {
      goto: 'Pergi ke',
      page: '',
      total: 'Total {total}',
      pageSize: '/halaman',
      prev: 'Sebelumnya',
      next: 'Berikutnya',
      first: 'Pertama',
      last: 'Terakhir',
      pageClassifier: ''
    },
    // Konfirmasi popup
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
      maximize: 'Maksimalkan',
      restore: 'Pulihkan'
    },
    // Laci
    drawer: {
      close: 'Tutup',
      confirm: 'OK',
      cancel: 'Batal'
    },
    // Menu dropdown
    dropdown: {
      loading: 'Memuat...'
    },
    // Gambar
    image: {
      error: 'GAGAL',
      loading: 'Memuat...',
      preview: 'Pratinjau',
      zoomIn: 'Perbesar',
      zoomOut: 'Perkecil',
      rotateLeft: 'Putar kiri',
      rotateRight: 'Putar kanan',
      originalSize: 'Ukuran asli',
      fullscreen: 'Layar penuh'
    },
    // Penampil gambar
    imageviewer: {
      close: 'Tutup',
      prev: 'Sebelumnya',
      next: 'Berikutnya',
      zoomIn: 'Perbesar',
      zoomOut: 'Perkecil',
      rotateLeft: 'Putar kiri',
      rotateRight: 'Putar kanan',
      reset: 'Atur ulang',
      fullscreen: 'Layar penuh',
      exitFullscreen: 'Keluar dari layar penuh'
    },
    // Gulir tak terbatas
    infinitescroll: {
      loading: 'Memuat...',
      finished: 'Tidak ada data lagi',
      error: 'Memuat gagal, klik untuk mencoba lagi',
      retry: 'Klik untuk mencoba lagi'
    },
    // Pesan
    message: {
      close: 'Tutup'
    },
    // Notifikasi
    notification: {
      close: 'Tutup'
    },
    // Memuat
    loading: {
      text: 'Memuat...'
    },
    // Putar
    spin: {
      text: 'Memuat...'
    },
    // Rating
    rate: {
      texts: ['Sangat buruk', 'Kecewa', 'Cukup', 'Puas', 'Terkejut']
    },
    // Peringatan
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
      more: 'Lainnya'
    },
    // Langkah
    steps: {
      finish: 'Selesai',
      process: 'Sedang berlangsung',
      wait: 'Menunggu',
      error: 'Kesalahan'
    },
    // Kemajuan
    progress: {
      success: 'Berhasil',
      exception: 'Pengecualian',
      warning: 'Peringatan'
    },
    // Kerangka
    skeleton: {
      loading: 'Memuat...'
    },
    // Kosong
    empty: {
      description: 'Tidak ada data',
      noData: 'Tidak ada data',
      noResult: 'Tidak ada hasil',
      networkError: 'Kesalahan jaringan',
      serverError: 'Kesalahan server'
    },
    // Hasil
    result: {
      success: 'Berhasil',
      error: 'Kesalahan',
      warning: 'Peringatan',
      info: 'Informasi',
      backHome: 'Kembali ke beranda'
    },
    // Air terjun
    waterfall: {
      loading: 'Memuat...',
      noMore: 'Tidak ada data lagi',
      empty: 'Tidak ada data'
    },
    // Deskripsi
    descriptions: {
      colon: ':'
    },
    // Slider
    slider: {
      tipFormatter: '{value}'
    },
    // Sakelar
    switch: {
      on: 'HIDUP',
      off: 'MATI'
    },
    // Kotak centang
    checkbox: {
      selectAll: 'Pilih semua'
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: 'Ciutkan menu',
      expand: 'Perluas menu'
    },
    // Kartu
    card: {
      collapse: 'Ciutkan',
      expand: 'Perluas'
    },
    // Ciutkan
    collapse: {
      expand: 'Perluas',
      collapse: 'Ciutkan'
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: 'Memuat gagal'
    },
    // Tanda air
    watermark: {},
    // Pembagi
    divider: {},
    // Karusel
    carousel: {
      prev: 'Sebelumnya',
      next: 'Berikutnya'
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Jangkar
    anchor: {}
  }
}

export default id
