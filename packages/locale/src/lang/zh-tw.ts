import type { Language } from '../index'

export const zhTw: Language = {
  name: 'zh-tw',
  yh: {
    // 通用
    common: {
      yes: '是',
      no: '否',
      confirm: '確認',
      cancel: '取消',
      loading: '載入中',
      close: '關閉',
      clear: '清空',
      reset: '重置',
      save: '儲存',
      delete: '刪除',
      edit: '編輯',
      add: '新增',
      search: '搜尋',
      refresh: '重新整理',
      expand: '展開',
      collapse: '收起',
      more: '更多',
      noData: '暫無資料',
      noMatch: '無符合資料',
      selectAll: '全選',
      unselectAll: '取消全選'
    },
    // 顏色選擇器
    colorpicker: {
      confirm: '確定',
      clear: '清空',
      eyeDropper: '取色器',
      suggestionDark: '建議使用白色文字',
      suggestionLight: '建議使用黑色文字',
      recentColors: '最近使用',
      presetColors: '預設顏色'
    },
    // 日期選擇器
    datepicker: {
      now: '此刻',
      today: '今天',
      cancel: '取消',
      clear: '清空',
      confirm: '確定',
      selectDate: '選擇日期',
      selectTime: '選擇時間',
      startDate: '開始日期',
      startTime: '開始時間',
      endDate: '結束日期',
      endTime: '結束時間',
      year: '年',
      month: '月',
      day: '日',
      week: '週',
      monthBeforeYear: false,
      prevYear: '上一年',
      nextYear: '下一年',
      prevMonth: '上個月',
      nextMonth: '下個月',
      weeks: {
        sun: '日',
        mon: '一',
        tue: '二',
        wed: '三',
        thu: '四',
        fri: '五',
        sat: '六'
      },
      months: {
        jan: '一月',
        feb: '二月',
        mar: '三月',
        apr: '四月',
        may: '五月',
        jun: '六月',
        jul: '七月',
        aug: '八月',
        sep: '九月',
        oct: '十月',
        nov: '十一月',
        dec: '十二月'
      },
      quarters: {
        q1: '第一季',
        q2: '第二季',
        q3: '第三季',
        q4: '第四季'
      }
    },
    // 時間選擇器
    timepicker: {
      confirm: '確定',
      cancel: '取消',
      now: '此刻',
      placeholder: '選擇時間',
      startPlaceholder: '開始時間',
      endPlaceholder: '結束時間',
      selectTime: '選擇時間'
    },
    // 時間選擇
    timeselect: {
      placeholder: '選擇時間'
    },
    // 樹
    tree: {
      emptyText: '暫無資料',
      loading: '載入中...',
      checkAll: '全選',
      uncheckAll: '取消全選',
      expandAll: '展開全部',
      collapseAll: '收起全部'
    },
    // 樹選擇
    treeselect: {
      placeholder: '請選擇',
      emptyText: '暫無資料',
      loading: '載入中...',
      noMatch: '無符合資料'
    },
    // 日曆
    calendar: {
      prevMonth: '上個月',
      nextMonth: '下個月',
      prevYear: '上一年',
      nextYear: '下一年',
      today: '今天',
      week: '週',
      holiday: '休',
      workday: '班',
      monthHeaderFormat: 'YYYY 年 MM 月',
      weeks: {
        sun: '日',
        mon: '一',
        tue: '二',
        wed: '三',
        thu: '四',
        fri: '五',
        sat: '六'
      }
    },
    // 自動完成
    autocomplete: {
      loading: '載入中...',
      placeholder: '請輸入',
      noData: '暫無資料',
      noMatch: '無符合資料'
    },
    // 倒計時
    countdown: {
      days: '天',
      hours: '時',
      minutes: '分',
      seconds: '秒',
      milliseconds: '毫秒',
      finished: '已結束'
    },
    // 級聯選擇
    cascader: {
      noMatch: '無符合資料',
      placeholder: '請選擇',
      loading: '載入中...',
      noData: '暫無資料'
    },
    // 穿梭框
    transfer: {
      noMatch: '無符合資料',
      noData: '無資料',
      titles: ['列表 1', '列表 2'],
      filterPlaceholder: '請輸入搜尋內容',
      noCheckedFormat: '共 {total} 項',
      hasCheckedFormat: '已選 {checked}/{total} 項',
      searchPlaceholder: '請輸入關鍵字'
    },
    // 表格
    table: {
      emptyText: '暫無資料',
      confirmFilter: '篩選',
      resetFilter: '重置',
      clearFilter: '全部',
      sumText: '合計',
      loading: '載入中...',
      index: '序號',
      print: '列印',
      cancel: '取消',
      preview: '列印預覽',
      printTime: '列印時間',
      total: '共 {total} 條',
      page: '第 {page} 頁',
      yes: '是',
      no: '否',
      // 工具欄
      toolbar: {
        refresh: '重新整理',
        density: '密度',
        densityDefault: '預設',
        densityLarge: '寬鬆',
        densitySmall: '緊湊',
        columnSetting: '欄位設定',
        fullscreen: '全螢幕',
        exitFullscreen: '退出全螢幕',
        export: '匯出',
        import: '匯入',
        search: '搜尋',
        searchPlaceholder: '請輸入關鍵字搜尋'
      },
      // 篩選
      filter: {
        selectAll: '全選',
        selectInvert: '反選',
        empty: '為空',
        notEmpty: '不為空',
        contains: '包含',
        notContains: '不包含',
        equals: '等於',
        notEquals: '不等於',
        startsWith: '開頭是',
        endsWith: '結尾是',
        greaterThan: '大於',
        lessThan: '小於',
        between: '介於'
      },
      // 排序
      sort: {
        asc: '升序',
        desc: '降序',
        clear: '取消排序'
      },
      // 匯出
      export: {
        title: '匯出資料',
        filename: '檔案名稱',
        type: '檔案類型',
        scope: '匯出範圍',
        scopeAll: '全部資料',
        scopeSelected: '選中資料',
        scopeCurrentPage: '當前頁資料',
        includeHeader: '包含表頭',
        exporting: '正在匯出...',
        success: '匯出成功',
        error: '匯出失敗'
      },
      // 匯入
      import: {
        title: '匯入資料',
        selectFile: '選擇檔案',
        dragTip: '點選或拖曳檔案到此處上傳',
        importing: '正在匯入...',
        success: '匯入成功',
        error: '匯入失敗',
        preview: '資料預覽',
        confirm: '確認匯入'
      },
      // 列印
      printConfig: {
        title: '列印設定',
        pageTitle: '頁面標題',
        pageHeader: '頁首',
        pageFooter: '頁尾',
        printAll: '列印全部',
        printSelected: '列印選中',
        printCurrentPage: '列印當前頁',
        landscape: '橫向',
        portrait: '縱向',
        printing: '正在列印...'
      },
      // 列設定
      columnSetting: {
        title: '欄位設定',
        showAll: '顯示全部',
        hideAll: '隱藏全部',
        reset: '重置',
        fixedLeft: '固定在左側',
        fixedRight: '固定在右側',
        unfixed: '取消固定'
      },
      // 右鍵選單
      contextMenu: {
        copy: '複製',
        copyRow: '複製列',
        copyCell: '複製儲存格',
        paste: '貼上',
        insertRowAbove: '在上方插入列',
        insertRowBelow: '在下方插入列',
        deleteRow: '刪除列',
        deleteSelectedRows: '刪除選中列',
        exportSelected: '匯出選中資料'
      },
      // 選擇
      selection: {
        selectAll: '全選',
        selectInvert: '反選',
        selectNone: '取消選擇',
        selected: '已選擇 {count} 項'
      },
      // 展開
      expand: {
        expandAll: '展開全部',
        collapseAll: '收起全部'
      },
      // 樹形
      tree: {
        expandAll: '展開全部',
        collapseAll: '收起全部',
        expandLevel: '展開到第 {level} 層'
      },
      // 拖拽
      drag: {
        dragTip: '拖曳以調整順序',
        dropTip: '釋放以放置'
      }
    },
    // 訊息框
    messagebox: {
      title: '提示',
      confirm: '確定',
      cancel: '取消',
      close: '關閉',
      error: '輸入的資料不合法!',
      alert: '警告',
      prompt: '提示',
      inputPlaceholder: '請輸入'
    },
    // 上傳
    upload: {
      deleteTip: '按 delete 鍵可刪除',
      delete: '刪除',
      preview: '預覽',
      continue: '繼續上傳',
      upload: '點選上傳',
      tip: '將檔案拖到此處，或<em>點選上傳</em>',
      dragTip: '將檔案拖到此處上傳',
      uploading: '上傳中...',
      success: '上傳成功',
      error: '上傳失敗',
      retry: '重試',
      cancel: '取消上傳',
      fileTypeError: '檔案類型不支援',
      fileSizeError: '檔案大小超出限制',
      fileCountError: '檔案數量超出限制'
    },
    // 表單
    form: {
      validationFailed: '驗證失敗',
      required: '必填',
      pleaseInput: '請輸入',
      pleaseSelect: '請選擇'
    },
    // 按鈕
    button: {
      loading: '載入中...'
    },
    // 輸入框
    input: {
      placeholder: '請輸入',
      clear: '清空',
      showPassword: '顯示密碼',
      hidePassword: '隱藏密碼',
      copy: '複製',
      copied: '已複製'
    },
    // 數字輸入框
    inputnumber: {
      placeholder: '請輸入數字',
      increase: '增加',
      decrease: '減少'
    },
    // 標籤輸入
    inputtag: {
      placeholder: '請輸入',
      add: '新增',
      remove: '移除'
    },
    // 麵包屑
    breadcrumb: {
      label: '麵包屑',
      more: '更多'
    },
    // 返回頂部
    backtop: {
      text: '回到頂部'
    },
    // 選擇器
    select: {
      placeholder: '請選擇',
      noData: '無資料',
      loading: '載入中...',
      noMatch: '無符合資料',
      selectAll: '全選',
      clearAll: '清空'
    },
    // 分頁
    pagination: {
      goto: '前往',
      page: '頁',
      total: '共 {total} 條',
      pageSize: '條/頁',
      prev: '上一頁',
      next: '下一頁',
      first: '首頁',
      last: '末頁',
      pageClassifier: '頁'
    },
    // 氣泡確認
    popconfirm: {
      confirm: '確定',
      cancel: '取消',
      dontAskAgain: '不再詢問'
    },
    // 對話框
    dialog: {
      confirm: '確定',
      cancel: '取消',
      close: '關閉',
      maximize: '最大化',
      restore: '還原'
    },
    // 抽屜
    drawer: {
      close: '關閉',
      confirm: '確定',
      cancel: '取消'
    },
    // 下拉選單
    dropdown: {
      loading: '載入中...'
    },
    // 圖片
    image: {
      error: '載入失敗',
      loading: '載入中...',
      preview: '預覽',
      zoomIn: '放大',
      zoomOut: '縮小',
      rotateLeft: '向左旋轉',
      rotateRight: '向右旋轉',
      originalSize: '原始大小',
      fullscreen: '全螢幕'
    },
    // 圖片預覽
    imageviewer: {
      close: '關閉',
      prev: '上一張',
      next: '下一張',
      zoomIn: '放大',
      zoomOut: '縮小',
      rotateLeft: '向左旋轉',
      rotateRight: '向右旋轉',
      reset: '重置',
      fullscreen: '全螢幕',
      exitFullscreen: '退出全螢幕'
    },
    // 無限滾動
    infinitescroll: {
      loading: '載入中...',
      finished: '沒有更多了',
      error: '載入失敗，點選重試',
      retry: '點選重試'
    },
    // 訊息
    message: {
      close: '關閉'
    },
    // 通知
    notification: {
      close: '關閉'
    },
    // 載入
    loading: {
      text: '載入中...'
    },
    // 載入中
    spin: {
      text: '載入中...'
    },
    // 評分
    rate: {
      texts: ['極差', '失望', '一般', '滿意', '驚喜']
    },
    // 警告
    alert: {
      close: '關閉'
    },
    // 標籤
    tag: {
      close: '關閉'
    },
    // 標籤頁
    tabs: {
      close: '關閉',
      add: '新增',
      more: '更多'
    },
    // 步驟條
    steps: {
      finish: '已完成',
      process: '進行中',
      wait: '等待中',
      error: '錯誤'
    },
    // 進度條
    progress: {
      success: '成功',
      exception: '異常',
      warning: '警告'
    },
    // 骨架屏
    skeleton: {
      loading: '載入中...'
    },
    // 空狀態
    empty: {
      description: '暫無資料',
      noData: '無資料',
      noResult: '無結果',
      networkError: '網路錯誤',
      serverError: '伺服器錯誤'
    },
    // 結果
    result: {
      success: '成功',
      error: '錯誤',
      warning: '警告',
      info: '資訊',
      backHome: '返回首頁'
    },
    // 瀑布流
    waterfall: {
      loading: '載入中...',
      noMore: '沒有更多了',
      empty: '暫無資料'
    },
    // 描述列表
    descriptions: {
      colon: '：'
    },
    // 滑塊
    slider: {
      tipFormatter: '{value}'
    },
    // 開關
    switch: {
      on: '開',
      off: '關'
    },
    // 複選框
    checkbox: {
      selectAll: '全選'
    },
    // Radio
    radio: {},
    // 選單
    menu: {
      collapse: '收起選單',
      expand: '展開選單'
    },
    // 卡片
    card: {
      collapse: '收起',
      expand: '展開'
    },
    // 摺疊面板
    collapse: {
      expand: '展開',
      collapse: '收起'
    },
    // 工具提示
    tooltip: {},
    // 氣泡卡片
    popover: {},
    // 徽標
    badge: {},
    // 頭像
    avatar: {
      error: '載入失敗'
    },
    // 水印
    watermark: {},
    // 分割線
    divider: {},
    // 走馬燈
    carousel: {
      prev: '上一張',
      next: '下一張'
    },
    // 跑馬燈
    marquee: {},
    // 固釘
    affix: {},
    // 錨點
    anchor: {}
  }
}

export default zhTw
