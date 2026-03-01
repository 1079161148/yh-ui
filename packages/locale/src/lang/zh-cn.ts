import type { Language } from '../index'

export const zhCn: Language = {
  name: 'zh-cn',
  yh: {
    // 通用
    common: {
      yes: '是',
      no: '否',
      confirm: '确认',
      cancel: '取消',
      loading: '加载中',
      close: '关闭',
      clear: '清空',
      reset: '重置',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      add: '新增',
      search: '搜索',
      refresh: '刷新',
      expand: '展开',
      collapse: '收起',
      more: '更多',
      noData: '暂无数据',
      noMatch: '无匹配数据',
      selectAll: '全选',
      unselectAll: '取消全选'
    },
    // 颜色选择器
    colorpicker: {
      confirm: '确定',
      clear: '清空',
      eyeDropper: '吸色器',
      suggestionDark: '白色文字最佳',
      suggestionLight: '黑色文字最佳',
      recentColors: '最近使用',
      presetColors: '预设颜色'
    },
    // 日期选择器
    datepicker: {
      now: '此刻',
      today: '今天',
      cancel: '取消',
      clear: '清空',
      confirm: '确定',
      selectDate: '选择日期',
      selectTime: '选择时间',
      startDate: '开始日期',
      startTime: '开始时间',
      endDate: '结束日期',
      endTime: '结束时间',
      year: '年',
      month: '月',
      day: '日',
      week: '周',
      monthBeforeYear: false,
      prevYear: '上一年',
      nextYear: '下一年',
      prevMonth: '上个月',
      nextMonth: '下个月',
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
        q1: '第一季度',
        q2: '第二季度',
        q3: '第三季度',
        q4: '第四季度'
      }
    },
    // 时间选择器
    timepicker: {
      confirm: '确定',
      cancel: '取消',
      now: '此刻',
      placeholder: '选择时间',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      selectTime: '选择时间'
    },
    // 时间选择
    timeselect: {
      placeholder: '选择时间'
    },
    // 树
    tree: {
      emptyText: '暂无数据',
      loading: '加载中...',
      checkAll: '全选',
      uncheckAll: '取消全选',
      expandAll: '展开全部',
      collapseAll: '收起全部'
    },
    // 树选择
    treeselect: {
      placeholder: '请选择',
      emptyText: '暂无数据',
      loading: '加载中...',
      noMatch: '无匹配数据'
    },
    // 日历
    calendar: {
      prevMonth: '上个月',
      nextMonth: '下个月',
      prevYear: '上一年',
      nextYear: '下一年',
      today: '今天',
      week: '周',
      holiday: '休',
      workday: '班',
      monthHeaderFormat: 'YYYY年M月',
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
    // 自动完成
    autocomplete: {
      loading: '加载中...',
      placeholder: '请输入',
      noData: '暂无数据',
      noMatch: '无匹配数据'
    },
    // 倒计时
    countdown: {
      days: '天',
      hours: '时',
      minutes: '分',
      seconds: '秒',
      milliseconds: '毫秒',
      finished: '已结束'
    },
    // 级联选择
    cascader: {
      noMatch: '无匹配数据',
      placeholder: '请选择',
      loading: '加载中...',
      noData: '暂无数据'
    },
    // 穿梭框
    transfer: {
      noMatch: '无匹配数据',
      noData: '无数据',
      titles: ['列表 1', '列表 2'],
      filterPlaceholder: '请输入搜索内容',
      noCheckedFormat: '共 {total} 项',
      hasCheckedFormat: '已选 {checked}/{total} 项',
      searchPlaceholder: '请输入关键词'
    },
    // 表格
    table: {
      emptyText: '暂无数据',
      confirmFilter: '筛选',
      resetFilter: '重置',
      clearFilter: '全部',
      sumText: '合计',
      loading: '正在加载...',
      index: '序号',
      print: '打 印',
      cancel: '取 消',
      preview: '打印预览',
      printTime: '打印时间',
      total: '共 {total} 条',
      page: '第 {page} 页',
      yes: '是',
      no: '否',
      // 工具栏
      toolbar: {
        refresh: '刷新',
        density: '密度',
        densityDefault: '默认',
        densityLarge: '宽松',
        densitySmall: '紧凑',
        columnSetting: '列设置',
        fullscreen: '全屏',
        exitFullscreen: '退出全屏',
        export: '导出',
        import: '导入',
        search: '搜索',
        searchPlaceholder: '请输入关键词搜索'
      },
      // 筛选
      filter: {
        selectAll: '全选',
        selectInvert: '反选',
        empty: '为空',
        notEmpty: '不为空',
        contains: '包含',
        notContains: '不包含',
        equals: '等于',
        notEquals: '不等于',
        startsWith: '开头是',
        endsWith: '结尾是',
        greaterThan: '大于',
        lessThan: '小于',
        between: '介于'
      },
      // 排序
      sort: {
        asc: '升序',
        desc: '降序',
        clear: '取消排序'
      },
      // 导出
      export: {
        title: '导出数据',
        filename: '文件名',
        type: '文件类型',
        scope: '导出范围',
        scopeAll: '全部数据',
        scopeSelected: '选中数据',
        scopeCurrentPage: '当前页数据',
        includeHeader: '包含表头',
        exporting: '正在导出...',
        success: '导出成功',
        error: '导出失败'
      },
      // 导入
      import: {
        title: '导入数据',
        selectFile: '选择文件',
        dragTip: '点击或拖拽文件到此处上传',
        importing: '正在导入...',
        success: '导入成功',
        error: '导入失败',
        preview: '数据预览',
        confirm: '确认导入'
      },
      // 打印
      printConfig: {
        title: '打印设置',
        pageTitle: '页面标题',
        pageHeader: '页眉',
        pageFooter: '页脚',
        printAll: '打印全部',
        printSelected: '打印选中',
        printCurrentPage: '打印当前页',
        landscape: '横向',
        portrait: '纵向',
        printing: '正在打印...'
      },
      // 列设置
      columnSetting: {
        title: '列设置',
        showAll: '显示全部',
        hideAll: '隐藏全部',
        reset: '重置',
        fixedLeft: '固定在左侧',
        fixedRight: '固定在右侧',
        unfixed: '取消固定'
      },
      // 右键菜单
      contextMenu: {
        copy: '复制',
        copyRow: '复制行',
        copyCell: '复制单元格',
        paste: '粘贴',
        insertRowAbove: '在上方插入行',
        insertRowBelow: '在下方插入行',
        deleteRow: '删除行',
        deleteSelectedRows: '删除选中行',
        exportSelected: '导出选中数据'
      },
      // 选择
      selection: {
        selectAll: '全选',
        selectInvert: '反选',
        selectNone: '取消选择',
        selected: '已选择 {count} 项'
      },
      // 展开
      expand: {
        expandAll: '展开全部',
        collapseAll: '收起全部'
      },
      // 树形
      tree: {
        expandAll: '展开全部',
        collapseAll: '收起全部',
        expandLevel: '展开到第 {level} 层'
      },
      // 拖拽
      drag: {
        dragTip: '拖拽以调整顺序',
        dropTip: '释放以放置'
      }
    },
    // 消息框
    messagebox: {
      title: '提示',
      confirm: '确定',
      cancel: '取消',
      close: '关闭',
      error: '输入的数据不合法!',
      alert: '警告',
      prompt: '请输入',
      inputPlaceholder: '请输入内容'
    },
    // 上传
    upload: {
      deleteTip: '按 delete 键可删除',
      delete: '删除',
      preview: '查看图片',
      continue: '继续上传',
      upload: '点击上传',
      tip: '点击或拖拽文件到此处<em>上传</em>',
      dragTip: '将文件拖到此处，或点击上传',
      uploading: '上传中...',
      success: '上传成功',
      error: '上传失败',
      retry: '重新上传',
      cancel: '取消上传',
      fileTypeError: '文件类型不支持',
      fileSizeError: '文件大小超出限制',
      fileCountError: '文件数量超出限制'
    },
    // 表单
    form: {
      validationFailed: '校验失败',
      required: '必填项',
      pleaseInput: '请输入',
      pleaseSelect: '请选择'
    },
    // 按钮
    button: {
      loading: '加载中...'
    },
    // 输入框
    input: {
      placeholder: '请输入内容',
      clear: '清空',
      showPassword: '显示密码',
      hidePassword: '隐藏密码',
      copy: '复制',
      copied: '已复制'
    },
    // 数字输入框
    inputnumber: {
      placeholder: '请输入数字',
      increase: '增加',
      decrease: '减少'
    },
    // 标签输入
    inputtag: {
      placeholder: '请输入',
      add: '添加',
      remove: '移除'
    },
    // 面包屑
    breadcrumb: {
      label: '面包屑',
      more: '更多'
    },
    // 返回顶部
    backtop: {
      text: '回到顶部'
    },
    // 选择器
    select: {
      placeholder: '请选择',
      noData: '暂无数据',
      loading: '加载中...',
      noMatch: '无匹配数据',
      selectAll: '全选',
      clearAll: '清空'
    },
    // 分页
    pagination: {
      goto: '前往',
      page: '页',
      total: '共 {total} 条',
      pageSize: '条/页',
      prev: '上一页',
      next: '下一页',
      first: '首页',
      last: '末页',
      pageClassifier: '页'
    },
    // 气泡确认
    popconfirm: {
      confirm: '确定',
      cancel: '取消',
      dontAskAgain: '不再提示'
    },
    // 对话框
    dialog: {
      confirm: '确定',
      cancel: '取消',
      close: '关闭',
      maximize: '最大化',
      restore: '还原'
    },
    // 抽屉
    drawer: {
      close: '关闭',
      confirm: '确定',
      cancel: '取消'
    },
    // 下拉菜单
    dropdown: {
      loading: '加载中...'
    },
    // 图片
    image: {
      error: '加载失败',
      loading: '加载中...',
      preview: '预览',
      zoomIn: '放大',
      zoomOut: '缩小',
      rotateLeft: '向左旋转',
      rotateRight: '向右旋转',
      originalSize: '原始大小',
      fullscreen: '全屏'
    },
    // 图片预览
    imageviewer: {
      close: '关闭',
      prev: '上一张',
      next: '下一张',
      zoomIn: '放大',
      zoomOut: '缩小',
      rotateLeft: '向左旋转',
      rotateRight: '向右旋转',
      reset: '重置',
      fullscreen: '全屏',
      exitFullscreen: '退出全屏'
    },
    // 无限滚动
    infinitescroll: {
      loading: '加载中...',
      finished: '没有更多了',
      error: '加载失败，点击重试',
      retry: '点击重试'
    },
    // 消息
    message: {
      close: '关闭'
    },
    // 通知
    notification: {
      close: '关闭'
    },
    // 加载
    loading: {
      text: '加载中...'
    },
    // 加载中
    spin: {
      text: '加载中...'
    },
    // 评分
    rate: {
      texts: ['极差', '失望', '一般', '满意', '惊喜']
    },
    // 警告
    alert: {
      close: '关闭'
    },
    // 标签
    tag: {
      close: '关闭'
    },
    // 标签页
    tabs: {
      close: '关闭',
      add: '新增',
      more: '更多'
    },
    // 步骤条
    steps: {
      finish: '已完成',
      process: '进行中',
      wait: '等待中',
      error: '错误'
    },
    // 进度条
    progress: {
      success: '成功',
      exception: '异常',
      warning: '警告'
    },
    // 骨架屏
    skeleton: {
      loading: '加载中...'
    },
    // 空状态
    empty: {
      description: '暂无数据',
      noData: '暂无数据',
      noResult: '暂无结果',
      networkError: '网络错误',
      serverError: '服务器错误'
    },
    // 结果
    result: {
      success: '操作成功',
      error: '操作失败',
      warning: '警告',
      info: '提示',
      backHome: '返回首页'
    },
    // 瀑布流
    waterfall: {
      loading: '加载中...',
      noMore: '没有更多了',
      empty: '暂无数据'
    },
    // 描述列表
    descriptions: {
      colon: '：'
    },
    // 滑块
    slider: {
      tipFormatter: '{value}'
    },
    // 开关
    switch: {
      on: '开',
      off: '关'
    },
    // 复选框
    checkbox: {
      selectAll: '全选'
    },
    // 单选框
    radio: {},
    // 菜单
    menu: {
      collapse: '收起菜单',
      expand: '展开菜单'
    },
    // 卡片
    card: {
      collapse: '收起',
      expand: '展开'
    },
    // 折叠面板
    collapse: {
      expand: '展开',
      collapse: '收起'
    },
    // 工具提示
    tooltip: {},
    // 气泡卡片
    popover: {},
    // 徽标
    badge: {},
    // 头像
    avatar: {
      error: '加载失败'
    },
    // 水印
    watermark: {},
    // 分割线
    divider: {},
    // 走马灯
    carousel: {
      prev: '上一张',
      next: '下一张'
    },
    // 跑马灯
    marquee: {},
    // 固钉
    affix: {},
    // 锚点
    anchor: {},
    // 提及
    mention: {
      placeholder: '请输入',
      loading: '加载中...',
      noData: '暂无数据'
    },
    // AI 组件
    ai: {
      bubble: {
        citations: '参考引用'
      },
      codeBlock: {
        copyCode: '复制代码',
        copied: '已复制！',
        run: '运行代码'
      },
      sender: {
        placeholder: '发送消息...'
      },
      thoughtChain: {
        thoughtProcess: '思考过程',
        thinking: '思考中...'
      },
      thinking: {
        start: '开始思考',
        thinking: '思考中...',
        complete: '已完成思考',
        error: '思考出错了'
      },
      welcome: {
        title: '你好，我是 YH AI',
        description: '我可以帮你写代码、翻译文档或进行创意写作。今天我能为你做点什么？'
      },
      action: {
        copy: '复制',
        regenerate: '重新生成',
        share: '分享',
        like: '赞同',
        dislike: '反对',
        edit: '编辑',
        delete: '删除'
      },
      artifacts: {
        preview: '预览',
        code: '源码',
        versions: '版本历史',
        rendering: '正在渲染组件...'
      },
      voice: {
        trigger: '点击说话',
        listening: '聆听中...'
      },
      // AiAgentCard
      agent: {
        uses: '次调用',
        use: '立即使用',
        favorite: '收藏',
        unfavorite: '取消收藏',
        share: '分享',
        online: '在线',
        offline: '离线',
        busy: '忙碌',
        verified: '官方认证',
        rating: '评分',
        reviews: '条评价',
        responseTime: '响应时间',
        ms: 'ms'
      },
      // AiSources
      sources: {
        references: '参考来源',
        referencedSources: '引用来源',
        relevant: '相关度',
        viewOriginal: '查看原文',
        showAll: '显示全部',
        more: '更多来源',
        drawerTitle: '参考来源',
        expandMore: '展开更多',
        collapseMore: '收起',
        noSources: '暂无来源',
        today: '今天',
        last7Days: '最近 7 天',
        last30Days: '最近 30 天',
        earlier: '更早',
        pinned: '已置顶'
      },
      // AiConversations groups
      conversations: {
        today: '今天',
        last7Days: '最近 7 天',
        last30Days: '最近 30 天',
        earlier: '更早',
        pinned: '置顶',
        pin: '置顶',
        unpin: '取消置顶',
        newConversation: '新建对话',
        rename: '重命名',
        delete: '删除',
        deleteConfirm: '确认删除此对话？'
      }
    }
  }
}

export default zhCn
