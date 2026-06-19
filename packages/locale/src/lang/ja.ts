import type { Language } from '../index'

export const ja: Language = {
  name: 'ja',
  yh: {
    common: {
      yes: 'はい',
      no: 'いいえ',
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
    colorpicker: {
      confirm: 'OK',
      clear: 'クリア',
      eyeDropper: 'スポイト',
      suggestionDark: '白いテキストを推奨',
      suggestionLight: '黒いテキストを推奨',
      recentColors: '最近使った色',
      presetColors: '既定の色'
    },
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
    timepicker: {
      confirm: 'OK',
      cancel: 'キャンセル',
      now: '現在',
      placeholder: '時間を選択',
      startPlaceholder: '開始時間',
      endPlaceholder: '終了時間',
      selectTime: '時間を選択'
    },
    timeselect: {
      placeholder: '時間を選択'
    },
    tree: {
      emptyText: 'データなし',
      loading: 'ロード中...',
      checkAll: '全て選択',
      uncheckAll: '選択解除',
      expandAll: '全て展開',
      collapseAll: '全て閉じる'
    },
    treeselect: {
      placeholder: '選択してください',
      emptyText: 'データなし',
      loading: 'ロード中...',
      noMatch: 'データなし'
    },
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
    autocomplete: {
      loading: 'ロード中...',
      placeholder: '入力してください',
      noData: 'データなし',
      noMatch: 'データなし'
    },
    countdown: {
      days: '日',
      hours: '時',
      minutes: '分',
      seconds: '秒',
      milliseconds: 'ミリ秒',
      finished: '終了'
    },
    cascader: {
      noMatch: 'データなし',
      placeholder: '選択してください',
      loading: 'ロード中...',
      noData: 'データなし'
    },
    transfer: {
      noMatch: 'データなし',
      noData: 'データなし',
      titles: ['リスト 1', 'リスト 2'],
      filterPlaceholder: 'キーワードを入力',
      noCheckedFormat: '総計 {total} 件',
      hasCheckedFormat: '{checked}/{total} 選択中',
      searchPlaceholder: 'キーワードを入力'
    },
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
      sort: {
        asc: '昇順',
        desc: '降順',
        clear: 'ソート解除'
      },
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
      columnSetting: {
        title: '列設定',
        showAll: '全て表示',
        hideAll: '全て非表示',
        reset: 'リセット',
        fixedLeft: '左に固定',
        fixedRight: '右に固定',
        unfixed: '固定解除'
      },
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
      selection: {
        selectAll: '全て選択',
        selectInvert: '選択反転',
        selectNone: '選択解除',
        selected: '{count} 件選択中'
      },
      expand: {
        expandAll: '全て展開',
        collapseAll: '全て閉じる'
      },
      tree: {
        expandAll: '全て展開',
        collapseAll: '全て閉じる',
        expandLevel: 'レベル {level} まで展開'
      },
      drag: {
        dragTip: 'ドラッグして順序を調整',
        dropTip: 'ドロップして配置'
      }
    },
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
    form: {
      validationFailed: 'バリデーション失敗',
      required: '必須項目',
      pleaseInput: '入力してください',
      pleaseSelect: '選択してください'
    },
    button: {
      loading: 'ロード中...'
    },
    input: {
      placeholder: '入力してください',
      clear: 'クリア',
      showPassword: 'パスワードを表示',
      hidePassword: 'パスワードを非表示',
      copy: 'コピー',
      copied: 'コピーされました'
    },
    inputnumber: {
      placeholder: '数値を入力',
      increase: '増やす',
      decrease: '減らす'
    },
    inputtag: {
      placeholder: '入力してください',
      add: '追加',
      remove: '削除'
    },
    breadcrumb: {
      label: 'パンくずリスト',
      more: 'もっと見る'
    },
    backtop: {
      text: 'トップへ戻る'
    },
    select: {
      placeholder: '選択してください',
      noData: 'データなし',
      loading: 'ロード中...',
      noMatch: 'データなし',
      selectAll: '全て選択',
      clearAll: '全てクリア'
    },
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
    popconfirm: {
      confirm: 'OK',
      cancel: 'キャンセル',
      dontAskAgain: '次回から表示しない'
    },
    dialog: {
      confirm: 'OK',
      cancel: 'キャンセル',
      close: '閉じる',
      maximize: '最大化',
      restore: '元に戻す'
    },
    drawer: {
      close: '閉じる',
      confirm: 'OK',
      cancel: 'キャンセル'
    },
    dropdown: {
      loading: 'ロード中...'
    },
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
    infinitescroll: {
      loading: 'ロード中...',
      finished: 'これ以上データはありません',
      error: 'ロード失敗。クリックしてリトライ',
      retry: 'クリックしてリトライ'
    },
    message: {
      close: '閉じる'
    },
    notification: {
      close: '閉じる'
    },
    loading: {
      text: 'ロード中...'
    },
    spin: {
      text: 'ロード中...'
    },
    rate: {
      texts: ['最悪', '悪い', '普通', '良い', '最高']
    },
    alert: {
      close: '閉じる'
    },
    tag: {
      close: '閉じる'
    },
    tabs: {
      close: '閉じる',
      add: '追加',
      more: 'もっと見る'
    },
    steps: {
      finish: '完了',
      process: '進行中',
      wait: '待機中',
      error: 'エラー'
    },
    progress: {
      success: '成功',
      exception: '例外',
      warning: '警告'
    },
    skeleton: {
      loading: 'ロード中...'
    },
    empty: {
      description: 'データなし',
      noData: 'データなし',
      noResult: '該当なし',
      networkError: 'ネットワークエラー',
      serverError: 'サーバーエラー'
    },
    result: {
      success: '成功',
      error: 'エラー',
      warning: '警告',
      info: '情報',
      backHome: 'ホームへ戻る'
    },
    waterfall: {
      loading: 'ロード中...',
      noMore: 'これ以上データはありません',
      empty: 'データなし'
    },
    descriptions: {
      colon: ':'
    },
    slider: {
      tipFormatter: '{value}'
    },
    switch: {
      on: 'オン',
      off: 'オフ'
    },
    checkbox: {
      selectAll: '全て選択'
    },
    radio: {},
    menu: {
      collapse: 'メニューを閉じる',
      expand: 'メニューを開く'
    },
    card: {
      collapse: '折りたたむ',
      expand: '展開'
    },
    collapse: {
      expand: '展開',
      collapse: '折りたたむ'
    },
    tooltip: {},
    popover: {},
    badge: {},
    avatar: {
      error: 'ロード失敗'
    },
    watermark: {},
    divider: {},
    carousel: {
      prev: '前へ',
      next: '次へ'
    },
    marquee: {},
    affix: {},
    flow: {
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      fitView: 'Fit View',
      lock: 'Toggle Interactivity'
    },
    anchor: {},
    mention: {
      placeholder: '入力してください',
      loading: 'ロード中...',
      noData: 'データなし'
    },
    skuselector: {
      placeholder: 'Select specifications',
      emptyText: 'No specifications',
      stock: 'Stock',
      price: 'Price',
      selected: 'Selected',
      outOfStock: 'Out of Stock'
    },
    productcard: {
      viewDetails: 'View Details',
      buyNow: 'Buy Now',
      addToCart: 'Add to Cart',
      sold: 'Sold',
      soldOut: 'Sold Out',
      vip: 'VIP'
    },
    price: {
      original: 'Original'
    },
    couponcard: {
      available: 'Claim Now',
      used: 'Used',
      expired: 'Expired',
      received: 'Received',
      limit: 'Orders over {threshold}',
      noThreshold: 'No threshold',
      validPeriod: 'Validity',
      ruleTitle: 'Usage Rules'
    },
    luckydraw: {
      start: 'Start',
      drawing: 'Drawing...',
      end: 'Winner!',
      retry: 'Retry'
    },
    filterbar: {
      all: 'All',
      sort: 'Sort',
      filter: 'Filter',
      cancel: 'Cancel',
      reset: 'Reset',
      confirm: 'Confirm',
      noOptions: 'No options',
      asc: 'Ascending',
      desc: 'Descending',
      selected: 'Selected'
    },
    submitbar: {
      total: 'Total: ',
      selected: '{count} selected',
      submit: 'Checkout',
      allSelect: 'Select All'
    },
    categorynav: {
      all: 'All',
      noData: 'No Data',
      loading: 'Loading...'
    },
    smartaddress: {
      placeholder: 'Paste address here, auto-detect name, phone, location',
      parse: 'Smart Parse',
      province: 'Province/City/District',
      city: 'City',
      district: 'District/County',
      street: 'Street/Town',
      detail: 'Detailed Address',
      phone: 'Phone',
      name: 'Recipient',
      parseSuccess: 'Address parsed successfully',
      parseFailed: 'Parse failed, please fill manually',
      required: 'Please fill complete address',
      provinceKeywords: ['Province', 'State'],
      cityKeywords: ['City', 'Prefecture'],
      districtKeywords: ['District', 'County', 'Township'],
      streetKeywords: ['Street', 'Road', 'Ave', 'Lane']
    },
    ganttchart: {
      taskName: 'Task Name',
      searchPlaceholder: 'Search tasks...',
      zoom: 'Zoom',
      day: 'Day',
      week: 'Week',
      month: 'Month',
      year: 'Year',
      milestone: 'Milestone'
    },
    imagemagnifier: {
      switchToImage: 'Switch to image {index}',
      galleryItem: 'Gallery {index}',
      close: 'Close'
    },
    ai: {
      bubble: {
        citations: '引用'
      },
      mention: {
        placeholder: '@ Agent、ドキュメント、表をメンション...',
        agent: 'エージェント',
        document: 'ドキュメント',
        table: 'テーブル',
        knowledge: 'ナレッジ',
        file: 'File'
      },
      codeBlock: {
        copyCode: 'コードをコピー',
        copied: 'コピーしました！',
        run: 'コードを実行',
        edit: '編集',
        save: '保存',
        cancel: 'キャンセル'
      },
      codeRunner: {
        run: '実行',
        stop: '停止',
        clear: 'クリア',
        reset: 'リセット',
        placeholder: '実行ボタンをクリックしてコードを実行...'
      },
      sender: {
        placeholder: 'メッセージを送信...',
        dragTip: 'ファイルをアップロードするにはリリース',
        noCommands: 'No matching commands found'
      },
      thoughtChain: {
        thoughtProcess: '思考プロセス',
        thinking: '思考中...',
        defaultTitle: '新しいステップ',
        addNode: 'ステップを追加'
      },
      thinking: {
        start: '思考を開始',
        thinking: '思考中...',
        complete: '思考完了',
        error: '思考エラー'
      },
      welcome: {
        title: 'こんにちは、YH AIです',
        description:
          'コーディング、ドキュメント翻訳、クリエイティブライティングをお手伝いできます。今日は何をしますか？'
      },
      action: {
        copy: 'コピー',
        regenerate: '再生成',
        share: '共有',
        like: 'いいね',
        dislike: 'よくないね',
        edit: '編集',
        delete: '削除'
      },
      artifacts: {
        preview: 'プレビュー',
        inline: 'インライン',
        code: 'ソース',
        versions: 'バージョン',
        rendering: 'コンポーネントをレンダリング中...',
        renderingChart: 'チャートをレンダリング中...',
        renderingCanvas: 'キャンバスを準備中...',
        chartLoadError: 'Chart loading failed'
      },
      voice: {
        trigger: 'クリックして話す',
        listening: 'リスニング中...'
      },
      agent: {
        uses: '回使用',
        use: '今すぐ使用',
        favorite: 'お気に入り',
        unfavorite: 'お気に入り解除',
        share: '共有',
        online: 'オンライン',
        offline: 'オフライン',
        busy: '取り込み中',
        verified: '認証済み',
        rating: '評価',
        reviews: 'レビュー',
        responseTime: '平均応答時間',
        ms: 'ミリ秒'
      },
      sources: {
        references: '参考文献',
        referencedSources: '参照元',
        relevant: '関連性',
        viewOriginal: '原文を表示',
        showAll: 'すべて表示',
        more: '詳細',
        drawerTitle: '参考文献',
        expandMore: 'もっと見る',
        collapseMore: '閉じる',
        noSources: 'ソースなし',
        today: '今日',
        last7Days: '過去7日間',
        last30Days: '過去30日間',
        earlier: 'それ以前',
        pinned: 'ピン留め'
      },
      conversations: {
        today: '今日',
        last7Days: '過去7日間',
        last30Days: '過去30日間',
        earlier: 'それ以前',
        pinned: 'ピン留め',
        pin: 'ピン留め',
        unpin: 'ピン解除',
        newConversation: '新規会話',
        noData: 'No conversations yet',
        rename: '名前を変更',
        delete: '削除',
        deleteConfirm: 'この会話を削除しますか？'
      },
      attachments: {
        dropTip: 'ファイルをアップロードするにはリリース',
        clickToUpload: 'クリックまたはドラッグしてアップロード',
        uploadSuccess: 'アップロード成功',
        uploadError: 'アップロード失敗',
        deleteConfirm: 'このファイルを削除しますか？',
        fileTooLarge: 'ファイルサイズは {size} を超えることはできません',
        invalidFileType: '無効なファイル形式'
      },
      mermaid: {
        image: '画像',
        code: 'コード',
        zoomIn: '拡大',
        zoomOut: '縮小',
        reset: 'リセット',
        download: 'ダウンロード',
        copyCode: 'コードをコピー',
        rendering: 'レンダリング中...',
        renderError: 'レンダリング失敗',
        renderSuccess: 'レンダリング成功',
        retry: 'Retry'
      }
    }
  }
}

export default ja
