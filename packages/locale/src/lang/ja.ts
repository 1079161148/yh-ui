import type { Language } from '../index'

export const ja: Language = {
  name: 'ja',
  yh: {
    // Common
    common: {
      yes: '継続',
      no: '終了',
      confirm: 'OK',
      cancel: 'キャンセル',
      loading: 'ロード中',
      close: '閉じる',
      clear: 'クリア',
      reset: 'リセット',
      save: '保存',
      delete: '削除',
      edit: '編集',
      add: '追加',
      search: '検索',
      refresh: '更新',
      expand: '展開',
      collapse: '折りたたみ',
      more: 'もっと見る',
      noData: 'データなし',
      noMatch: 'データなし',
      selectAll: '全て選択',
      unselectAll: '選択解除'
    },
    // Color Picker
    colorpicker: {
      confirm: 'OK',
      clear: 'クリア',
      eyeDropper: 'スポイト',
      suggestionDark: '白いテキストを推奨',
      suggestionLight: '黒いテキストを推奨',
      recentColors: '最近使った色',
      presetColors: '既定の色'
    },
    // Date Picker
    datepicker: {
      now: '現在',
      today: '今日',
      cancel: 'キャンセル',
      clear: 'クリア',
      confirm: 'OK',
      selectDate: '日付を選択',
      selectTime: '時間を選択',
      startDate: '開始日',
      startTime: '開始時間',
      endDate: '終了日',
      endTime: '終了時間',
      year: '年',
      month: '月',
      day: '日',
      week: '週',
      monthBeforeYear: false,
      prevYear: '前年',
      nextYear: '翌年',
      prevMonth: '前月',
      nextMonth: '翌月',
      weeks: {
        sun: '日',
        mon: '月',
        tue: '火',
        wed: '水',
        thu: '木',
        fri: '金',
        sat: '土'
      },
      months: {
        jan: '1月',
        feb: '2月',
        mar: '3月',
        apr: '4月',
        may: '5月',
        jun: '6月',
        jul: '7月',
        aug: '8月',
        sep: '9月',
        oct: '10月',
        nov: '11月',
        dec: '12月'
      },
      quarters: {
        q1: '第1四半期',
        q2: '第2四半期',
        q3: '第3四半期',
        q4: '第4四半期'
      }
    },
    // Time Picker
    timepicker: {
      confirm: 'OK',
      cancel: 'キャンセル',
      now: '現在',
      placeholder: '時間を選択',
      startPlaceholder: '開始時間',
      endPlaceholder: '終了時間',
      selectTime: '時間を選択'
    },
    // Time Select
    timeselect: {
      placeholder: '時間を選択'
    },
    // Tree
    tree: {
      emptyText: 'データなし',
      loading: 'ロード中...',
      checkAll: '全て選択',
      uncheckAll: '選択解除',
      expandAll: '全て展開',
      collapseAll: '全て閉じる'
    },
    // Tree Select
    treeselect: {
      placeholder: '選択してください',
      emptyText: 'データなし',
      loading: 'ロード中...',
      noMatch: 'データなし'
    },
    // Calendar
    calendar: {
      prevMonth: '前月',
      nextMonth: '翌月',
      prevYear: '前年',
      nextYear: '翌年',
      today: '今日',
      week: '週',
      holiday: '祝日',
      workday: '平日',
      monthHeaderFormat: 'YYYY年M月',
      weeks: {
        sun: '日',
        mon: '月',
        tue: '火',
        wed: '水',
        thu: '木',
        fri: '金',
        sat: '土'
      }
    },
    // Autocomplete
    autocomplete: {
      loading: 'ロード中...',
      placeholder: '入力してください',
      noData: 'データなし',
      noMatch: 'データなし'
    },
    // Countdown
    countdown: {
      days: '日',
      hours: '時',
      minutes: '分',
      seconds: '秒',
      milliseconds: 'ミリ秒',
      finished: '終了'
    },
    // Cascader
    cascader: {
      noMatch: 'データなし',
      placeholder: '選択してください',
      loading: 'ロード中...',
      noData: 'データなし'
    },
    // Transfer
    transfer: {
      noMatch: 'データなし',
      noData: 'データなし',
      titles: ['リスト 1', 'リスト 2'],
      filterPlaceholder: 'キーワードを入力',
      noCheckedFormat: '総計 {total} 件',
      hasCheckedFormat: '{checked}/{total} 選択中',
      searchPlaceholder: 'キーワードを入力'
    },
    // Table
    table: {
      emptyText: 'データなし',
      confirmFilter: 'フィルター',
      resetFilter: 'リセット',
      clearFilter: '全て',
      sumText: '合計',
      loading: 'ロード中...',
      index: '番号',
      print: '印刷',
      cancel: 'キャンセル',
      preview: '印刷プレビュー',
      printTime: '印刷時間',
      total: '総計 {total} 件',
      page: '{page} ページ',
      yes: 'はい',
      no: 'いいえ',
      // Toolbar
      toolbar: {
        refresh: '更新',
        density: '表示密度',
        densityDefault: '既定',
        densityLarge: '広い',
        densitySmall: '狭い',
        columnSetting: '列設定',
        fullscreen: 'フルスクリーン',
        exitFullscreen: 'フルスクリーン解除',
        export: 'エクスポート',
        import: 'インポート',
        search: '検索',
        searchPlaceholder: '検索キーワードを入力'
      },
      // Filter
      filter: {
        selectAll: '全て選択',
        selectInvert: '選択反転',
        empty: '空',
        notEmpty: '空ではない',
        contains: '含む',
        notContains: '含まない',
        equals: '等しい',
        notEquals: '等しくない',
        startsWith: 'で始まる',
        endsWith: 'で終わる',
        greaterThan: 'より大きい',
        lessThan: 'より小さい',
        between: 'の間'
      },
      // Sort
      sort: {
        asc: '昇順',
        desc: '降順',
        clear: 'ソート解除'
      },
      // Export
      export: {
        title: 'データエクスポート',
        filename: 'ファイル名',
        type: 'ファイル形式',
        scope: 'エクスポート範囲',
        scopeAll: '全てのデータ',
        scopeSelected: '選択したデータ',
        scopeCurrentPage: '現在のページ',
        includeHeader: 'ヘッダーを含める',
        exporting: 'エクスポート中...',
        success: 'エクスポート成功',
        error: 'エクスポート失敗'
      },
      // Import
      import: {
        title: 'データインポート',
        selectFile: 'ファイルを選択',
        dragTip: 'ファイルをドラッグまたはクリックしてアップロード',
        importing: 'インポート中...',
        success: 'インポート成功',
        error: 'インポート失敗',
        preview: 'データプレビュー',
        confirm: 'インポート確定'
      },
      // Print
      printConfig: {
        title: '印刷設定',
        pageTitle: 'ページタイトル',
        pageHeader: 'ヘッダー',
        pageFooter: 'フッター',
        printAll: '全て表示',
        printSelected: '選択範囲を表示',
        printCurrentPage: '現在のページを表示',
        landscape: '横向き',
        portrait: '縦向き',
        printing: '印刷中...'
      },
      // Column Setting
      columnSetting: {
        title: '列設定',
        showAll: '全て表示',
        hideAll: '全て非表示',
        reset: 'リセット',
        fixedLeft: '左に固定',
        fixedRight: '右に固定',
        unfixed: '固定解除'
      },
      // Context Menu
      contextMenu: {
        copy: 'コピー',
        copyRow: '行をコピー',
        copyCell: 'セルをコピー',
        paste: '貼り付け',
        insertRowAbove: '上に空行を挿入',
        insertRowBelow: '下に空行を挿入',
        deleteRow: '行を削除',
        deleteSelectedRows: '選択した行を削除',
        exportSelected: '選択範囲をエクスポート'
      },
      // Selection
      selection: {
        selectAll: '全て選択',
        selectInvert: '選択反転',
        selectNone: '選択解除',
        selected: '{count} 件選択中'
      },
      // Expand
      expand: {
        expandAll: '全て展開',
        collapseAll: '全て閉じる'
      },
      // Tree
      tree: {
        expandAll: '全て展開',
        collapseAll: '全て閉じる',
        expandLevel: 'レベル {level} まで展開'
      },
      // Drag
      drag: {
        dragTip: 'ドラッグして順序を調整',
        dropTip: 'ドロップして配置'
      }
    },
    // Message Box
    messagebox: {
      title: 'メッセージ',
      confirm: 'OK',
      cancel: 'キャンセル',
      close: '閉じる',
      error: '入力された値が不正です',
      alert: '警告',
      prompt: 'プロンプト',
      inputPlaceholder: '入力してください'
    },
    // Upload
    upload: {
      deleteTip: 'Deleteキーで削除',
      delete: '削除',
      preview: 'プレビュー',
      continue: '続行',
      upload: 'クリックしてアップロード',
      tip: 'ファイルをここにドラッグまたは<em>クリックしてアップロード</em>',
      dragTip: 'ファイルをドラッグしてアップロード',
      uploading: 'アップロード中...',
      success: 'アップロード成功',
      error: 'アップロード失敗',
      retry: 'リトライ',
      cancel: 'アップロードキャンセル',
      fileTypeError: 'サポートされていないファイル形式',
      fileSizeError: 'ファイルサイズ超限',
      fileCountError: 'ファイル数超限'
    },
    // Form
    form: {
      validationFailed: 'バリデーション失敗',
      required: '必須項目',
      pleaseInput: '入力してください',
      pleaseSelect: '選択してください'
    },
    // Button
    button: {
      loading: 'ロード中...'
    },
    // Input
    input: {
      placeholder: '入力してください',
      clear: 'クリア',
      showPassword: 'パスワードを表示',
      hidePassword: 'パスワードを非表示',
      copy: 'コピー',
      copied: 'コピーされました'
    },
    // Input Number
    inputnumber: {
      placeholder: '数値を入力',
      increase: '増やす',
      decrease: '減らす'
    },
    // Input Tag
    inputtag: {
      placeholder: '入力してください',
      add: '追加',
      remove: '削除'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'パンくずリスト',
      more: 'もっと見る'
    },
    // Backtop
    backtop: {
      text: 'トップへ戻る'
    },
    // Select
    select: {
      placeholder: '選択してください',
      noData: 'データなし',
      loading: 'ロード中...',
      noMatch: 'データなし',
      selectAll: '全て選択',
      clearAll: '全てクリア'
    },
    // Pagination
    pagination: {
      goto: '移動',
      page: '',
      total: '総計 {total} 件',
      pageSize: '件/ページ',
      prev: '前へ',
      next: '次へ',
      first: '最初',
      last: '最後',
      pageClassifier: ''
    },
    // Popconfirm
    popconfirm: {
      confirm: 'OK',
      cancel: 'キャンセル',
      dontAskAgain: '次回から表示しない'
    },
    // Dialog
    dialog: {
      confirm: 'OK',
      cancel: 'キャンセル',
      close: '閉じる',
      maximize: '最大化',
      restore: '元に戻す'
    },
    // Drawer
    drawer: {
      close: '閉じる',
      confirm: 'OK',
      cancel: 'キャンセル'
    },
    // Dropdown
    dropdown: {
      loading: 'ロード中...'
    },
    // Image
    image: {
      error: 'ロード失敗',
      loading: 'ロード中...',
      preview: 'プレビュー',
      zoomIn: '拡大',
      zoomOut: '縮小',
      rotateLeft: '左回転',
      rotateRight: '右回転',
      originalSize: 'オリジナルサイズ',
      fullscreen: 'フルスクリーン'
    },
    // Image Viewer
    imageviewer: {
      close: '閉じる',
      prev: '前へ',
      next: '次へ',
      zoomIn: '拡大',
      zoomOut: '縮小',
      rotateLeft: '左回転',
      rotateRight: '右回転',
      reset: 'リセット',
      fullscreen: 'フルスクリーン',
      exitFullscreen: 'フルスクリーン解除'
    },
    // Infinite Scroll
    infinitescroll: {
      loading: 'ロード中...',
      finished: 'これ以上データはありません',
      error: 'ロード失敗。クリックしてリトライ',
      retry: 'クリックしてリトライ'
    },
    // Message
    message: {
      close: '閉じる'
    },
    // Notification
    notification: {
      close: '閉じる'
    },
    // Loading
    loading: {
      text: 'ロード中...'
    },
    // Spin
    spin: {
      text: 'ロード中...'
    },
    // Rate
    rate: {
      texts: ['最悪', '悪い', '普通', '良い', '最高']
    },
    // Alert
    alert: {
      close: '閉じる'
    },
    // Tag
    tag: {
      close: '閉じる'
    },
    // Tabs
    tabs: {
      close: '閉じる',
      add: '追加',
      more: 'もっと見る'
    },
    // Steps
    steps: {
      finish: '完了',
      process: '進行中',
      wait: '待機中',
      error: 'エラー'
    },
    // Progress
    progress: {
      success: '成功',
      exception: '例外',
      warning: '警告'
    },
    // Skeleton
    skeleton: {
      loading: 'ロード中...'
    },
    // Empty
    empty: {
      description: 'データなし',
      noData: 'データなし',
      noResult: '該当なし',
      networkError: 'ネットワークエラー',
      serverError: 'サーバーエラー'
    },
    // Result
    result: {
      success: '成功',
      error: 'エラー',
      warning: '警告',
      info: '情報',
      backHome: 'ホームへ戻る'
    },
    // Waterfall
    waterfall: {
      loading: 'ロード中...',
      noMore: 'これ以上データはありません',
      empty: 'データなし'
    },
    // Descriptions
    descriptions: {
      colon: ':'
    },
    // Slider
    slider: {
      tipFormatter: '{value}'
    },
    // Switch
    switch: {
      on: 'オン',
      off: 'オフ'
    },
    // Checkbox
    checkbox: {
      selectAll: '全て選択'
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: 'メニューを閉じる',
      expand: 'メニューを開く'
    },
    // Card
    card: {
      collapse: '折りたたむ',
      expand: '展開'
    },
    // Collapse
    collapse: {
      expand: '展開',
      collapse: '折りたたむ'
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: 'ロード失敗'
    },
    // Watermark
    watermark: {},
    // Divider
    divider: {},
    // Carousel
    carousel: {
      prev: '前へ',
      next: '次へ'
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Anchor
    anchor: {},
    // 提及
    mention: {
      placeholder: '入力してください',
      loading: 'ロード中...',
      noData: 'データなし'
    },
    // AI Components
    ai: {
      codeBlock: {
        copyCode: 'コードをコピー',
        copied: 'コピーしました！'
      },
      sender: {
        placeholder: 'メッセージを送信...'
      },
      thoughtChain: {
        thoughtProcess: '思考プロセス',
        thinking: '思考中...'
      },
      thinking: {
        start: '思考開始',
        thinking: '思考中...',
        complete: '思考完了',
        error: '思考エラー'
      }
    }
  }
}

export default ja
