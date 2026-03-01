export interface Language {
  name: string
  yh: {
    // 通用
    common: {
      yes: string
      no: string
      confirm: string
      cancel: string
      loading: string
      close: string
      clear: string
      reset: string
      save: string
      delete: string
      edit: string
      add: string
      search: string
      refresh: string
      expand: string
      collapse: string
      more: string
      noData: string
      noMatch: string
      selectAll: string
      unselectAll: string
    }
    // 颜色选择器
    colorpicker: {
      confirm: string
      clear: string
      eyeDropper: string
      suggestionDark: string
      suggestionLight: string
      recentColors: string
      presetColors: string
    }
    // 日期选择器
    datepicker: {
      now: string
      today: string
      cancel: string
      clear: string
      confirm: string
      selectDate: string
      selectTime: string
      startDate: string
      startTime: string
      endDate: string
      endTime: string
      year: string
      month: string
      day: string
      week: string
      monthBeforeYear: boolean
      prevYear: string
      nextYear: string
      prevMonth: string
      nextMonth: string
      weeks: {
        sun: string
        mon: string
        tue: string
        wed: string
        thu: string
        fri: string
        sat: string
      }
      months: {
        jan: string
        feb: string
        mar: string
        apr: string
        may: string
        jun: string
        jul: string
        aug: string
        sep: string
        oct: string
        nov: string
        dec: string
      }
      quarters: {
        q1: string
        q2: string
        q3: string
        q4: string
      }
    }
    // 时间选择器
    timepicker: {
      confirm: string
      cancel: string
      now: string
      placeholder: string
      startPlaceholder: string
      endPlaceholder: string
      selectTime: string
    }
    // 时间选择
    timeselect: {
      placeholder: string
    }
    // 树
    tree: {
      emptyText: string
      loading: string
      checkAll: string
      uncheckAll: string
      expandAll: string
      collapseAll: string
    }
    // 树选择
    treeselect: {
      placeholder: string
      emptyText: string
      loading: string
      noMatch: string
    }
    // 日历
    calendar: {
      prevMonth: string
      nextMonth: string
      prevYear: string
      nextYear: string
      today: string
      week: string
      holiday: string
      workday: string
      monthHeaderFormat: string
      weeks: {
        sun: string
        mon: string
        tue: string
        wed: string
        thu: string
        fri: string
        sat: string
      }
    }
    // 自动完成
    autocomplete: {
      loading: string
      placeholder: string
      noData: string
      noMatch: string
    }
    // 倒计时
    countdown: {
      days: string
      hours: string
      minutes: string
      seconds: string
      milliseconds: string
      finished: string
    }
    // 级联选择
    cascader: {
      noMatch: string
      placeholder: string
      loading: string
      noData: string
    }
    // 穿梭框
    transfer: {
      noMatch: string
      noData: string
      titles: [string, string]
      filterPlaceholder: string
      noCheckedFormat: string
      hasCheckedFormat: string
      searchPlaceholder: string
    }
    // 表格
    table: {
      emptyText: string
      confirmFilter: string
      resetFilter: string
      clearFilter: string
      sumText: string
      loading: string
      index: string
      print: string
      cancel: string
      preview: string
      printTime: string
      total: string
      page: string
      yes: string
      no: string
      // 工具栏
      toolbar: {
        refresh: string
        density: string
        densityDefault: string
        densityLarge: string
        densitySmall: string
        columnSetting: string
        fullscreen: string
        exitFullscreen: string
        export: string
        import: string
        search: string
        searchPlaceholder: string
      }
      // 筛选
      filter: {
        selectAll: string
        selectInvert: string
        empty: string
        notEmpty: string
        contains: string
        notContains: string
        equals: string
        notEquals: string
        startsWith: string
        endsWith: string
        greaterThan: string
        lessThan: string
        between: string
      }
      // 排序
      sort: {
        asc: string
        desc: string
        clear: string
      }
      // 导出
      export: {
        title: string
        filename: string
        type: string
        scope: string
        scopeAll: string
        scopeSelected: string
        scopeCurrentPage: string
        includeHeader: string
        exporting: string
        success: string
        error: string
      }
      // 导入
      import: {
        title: string
        selectFile: string
        dragTip: string
        importing: string
        success: string
        error: string
        preview: string
        confirm: string
      }
      // 打印
      printConfig: {
        title: string
        pageTitle: string
        pageHeader: string
        pageFooter: string
        printAll: string
        printSelected: string
        printCurrentPage: string
        landscape: string
        portrait: string
        printing: string
      }
      // 列设置
      columnSetting: {
        title: string
        showAll: string
        hideAll: string
        reset: string
        fixedLeft: string
        fixedRight: string
        unfixed: string
      }
      // 右键菜单
      contextMenu: {
        copy: string
        copyRow: string
        copyCell: string
        paste: string
        insertRowAbove: string
        insertRowBelow: string
        deleteRow: string
        deleteSelectedRows: string
        exportSelected: string
      }
      // 选择
      selection: {
        selectAll: string
        selectInvert: string
        selectNone: string
        selected: string
      }
      // 展开
      expand: {
        expandAll: string
        collapseAll: string
      }
      // 树形
      tree: {
        expandAll: string
        collapseAll: string
        expandLevel: string
      }
      // 拖拽
      drag: {
        dragTip: string
        dropTip: string
      }
    }
    // 消息框
    messagebox: {
      title: string
      confirm: string
      cancel: string
      close: string
      error: string
      alert: string
      prompt: string
      inputPlaceholder: string
    }
    // 上传
    upload: {
      deleteTip: string
      delete: string
      preview: string
      continue: string
      upload: string
      tip: string
      dragTip: string
      uploading: string
      success: string
      error: string
      retry: string
      cancel: string
      fileTypeError: string
      fileSizeError: string
      fileCountError: string
    }
    // 表单
    form: {
      validationFailed: string
      required: string
      pleaseInput: string
      pleaseSelect: string
    }
    // 按钮
    button: {
      loading: string
    }
    // 输入框
    input: {
      placeholder: string
      clear: string
      showPassword: string
      hidePassword: string
      copy: string
      copied: string
    }
    // 数字输入框
    inputnumber: {
      placeholder: string
      increase: string
      decrease: string
    }
    // 标签输入
    inputtag: {
      placeholder: string
      add: string
      remove: string
    }
    // 面包屑
    breadcrumb: {
      label: string
      more: string
    }
    // 返回顶部
    backtop: {
      text: string
    }
    // 选择器
    select: {
      placeholder: string
      noData: string
      loading: string
      noMatch: string
      selectAll: string
      clearAll: string
    }
    // 分页
    pagination: {
      goto: string
      page: string
      total: string
      pageSize: string
      prev: string
      next: string
      first: string
      last: string
      pageClassifier: string
    }
    // 气泡确认
    popconfirm: {
      confirm: string
      cancel: string
      dontAskAgain: string
    }
    // 对话框
    dialog: {
      confirm: string
      cancel: string
      close: string
      maximize: string
      restore: string
    }
    // 抽屉
    drawer: {
      close: string
      confirm: string
      cancel: string
    }
    // 下拉菜单
    dropdown: {
      loading: string
    }
    // 图片
    image: {
      error: string
      loading: string
      preview: string
      zoomIn: string
      zoomOut: string
      rotateLeft: string
      rotateRight: string
      originalSize: string
      fullscreen: string
    }
    // 图片预览
    imageviewer: {
      close: string
      prev: string
      next: string
      zoomIn: string
      zoomOut: string
      rotateLeft: string
      rotateRight: string
      reset: string
      fullscreen: string
      exitFullscreen: string
    }
    // 无限滚动
    infinitescroll: {
      loading: string
      finished: string
      error: string
      retry: string
    }
    // 消息
    message: {
      close: string
    }
    // 通知
    notification: {
      close: string
    }
    // 加载
    loading: {
      text: string
    }
    // 加载中
    spin: {
      text: string
    }
    // 评分
    rate: {
      texts: [string, string, string, string, string]
    }
    // 警告
    alert: {
      close: string
    }
    // 标签
    tag: {
      close: string
    }
    // 标签页
    tabs: {
      close: string
      add: string
      more: string
    }
    // 步骤条
    steps: {
      finish: string
      process: string
      wait: string
      error: string
    }
    // 进度条
    progress: {
      success: string
      exception: string
      warning: string
    }
    // 骨架屏
    skeleton: {
      loading: string
    }
    // 空状态
    empty: {
      description: string
      noData: string
      noResult: string
      networkError: string
      serverError: string
    }
    // 结果
    result: {
      success: string
      error: string
      warning: string
      info: string
      backHome: string
    }
    // 瀑布流
    waterfall: {
      loading: string
      noMore: string
      empty: string
    }
    // 描述列表
    descriptions: {
      colon: string
    }
    // 滑块
    slider: {
      tipFormatter: string
    }
    // 开关
    switch: {
      on: string
      off: string
    }
    // 复选框
    checkbox: {
      selectAll: string
    }
    // 单选框
    radio: {
      [key: string]: never
    }
    // 菜单
    menu: {
      collapse: string
      expand: string
    }
    // 卡片
    card: {
      collapse: string
      expand: string
    }
    // 折叠面板
    collapse: {
      expand: string
      collapse: string
    }
    // 工具提示
    tooltip: {
      [key: string]: never
    }
    // 气泡卡片
    popover: {
      [key: string]: never
    }
    // 徽标
    badge: {
      [key: string]: never
    }
    // 头像
    avatar: {
      error: string
    }
    // 水印
    watermark: {
      [key: string]: never
    }
    // 分割线
    divider: {
      [key: string]: never
    }
    // 走马灯
    carousel: {
      prev: string
      next: string
    }
    // 跑马灯
    marquee: {
      [key: string]: never
    }
    // 固钉
    affix: {
      [key: string]: never
    }
    // 锚点
    anchor: {
      [key: string]: never
    }
    // 提及
    mention: {
      placeholder: string
      loading: string
      noData: string
    }
    // AI Components
    ai: {
      bubble: {
        citations: string
      }
      codeBlock: {
        copyCode: string
        copied: string
        run: string
      }
      sender: {
        placeholder: string
      }
      thoughtChain: {
        thoughtProcess: string
        thinking: string
      }
      thinking: {
        start: string
        thinking: string
        complete: string
        error: string
      }
      welcome: {
        title: string
        description: string
      }
      action: {
        copy: string
        regenerate: string
        share: string
        like: string
        dislike: string
        edit: string
        delete: string
      }
      artifacts: {
        preview: string
        code: string
        versions: string
        rendering: string
      }
      voice: {
        trigger: string
        listening: string
      }
      // AiAgentCard
      agent: {
        uses: string
        use: string
        favorite: string
        unfavorite: string
        share: string
        online: string
        offline: string
        busy: string
        verified: string
        rating: string
        reviews: string
        responseTime: string
        ms: string
      }
      // AiSources
      sources: {
        references: string
        referencedSources: string
        relevant: string
        viewOriginal: string
        showAll: string
        more: string
        drawerTitle: string
        expandMore: string
        collapseMore: string
        noSources: string
        today: string
        last7Days: string
        last30Days: string
        earlier: string
        pinned: string
      }
      // AiConversations
      conversations: {
        today: string
        last7Days: string
        last30Days: string
        earlier: string
        pinned: string
        pin: string
        unpin: string
        newConversation: string
        rename: string
        delete: string
        deleteConfirm: string
      }
    }
  }
}

export * from './lang/zh-cn'
export * from './lang/en'
export * from './lang/zh-tw'
export * from './lang/ja'
export * from './lang/ko'
export * from './lang/de'
export * from './lang/fr'
export * from './lang/es'
export * from './lang/pt'
export * from './lang/ru'
export * from './lang/ar'
export * from './lang/tr'
export * from './lang/it'
export * from './lang/nl'
export * from './lang/pl'
export * from './lang/th'
export * from './lang/vi'
export * from './lang/id'
export * from './lang/ms'
export * from './lang/da'
export * from './lang/sv'
export * from './lang/fi'
export * from './lang/no'
export * from './lang/nb-NO'
export * from './lang/cs'
export * from './lang/sk'
export * from './lang/uk'
export * from './lang/hu'
export * from './lang/ro'
export * from './lang/bg'
export * from './lang/az'
export * from './lang/pt-br'
export * from './lang/fa'
export * from './lang/hi'
export * from './lang/zh-hk'
export * from './lang/zh-mo'
// 新增语言
export * from './lang/pa'
export * from './lang/el'
export * from './lang/ca'
export * from './lang/tk'
export * from './lang/ta'
export * from './lang/lv'
export * from './lang/af'
export * from './lang/et'
export * from './lang/sl'
export * from './lang/he'
export * from './lang/lo'
export * from './lang/lt'
export * from './lang/mn'
export * from './lang/kk'
export * from './lang/ku'
export * from './lang/ckb'
export * from './lang/ug-cn'
export * from './lang/km'
export * from './lang/sr'
export * from './lang/eu'
export * from './lang/ky'
export * from './lang/hy-am'
export * from './lang/hr'
export * from './lang/eo'
export * from './lang/bn'
export * from './lang/mg'
export * from './lang/sw'
export * from './lang/uz-uz'
export * from './lang/ar-eg'
export * from './lang/my'
export * from './lang/te'
