var vi = Object.defineProperty;
var Li = (a, _, r) => _ in a ? vi(a, _, { enumerable: !0, configurable: !0, writable: !0, value: r }) : a[_] = r;
var G = (a, _, r) => Li(a, typeof _ != "symbol" ? _ + "" : _, r);
import { inject as re, ref as P, unref as N, computed as R, onUnmounted as Kr, watch as Br, useId as ki, shallowRef as ne, onMounted as qs, onBeforeUnmount as xi, isRef as Di } from "vue";
function c(a, _) {
  for (var r = 0; r < _.length; r++) {
    const t = _[r];
    if (typeof t != "string" && !Array.isArray(t)) {
      for (const s in t)
        if (s !== "default" && !(s in a)) {
          const n = Object.getOwnPropertyDescriptor(t, s);
          n && Object.defineProperty(a, s, n.get ? n : {
            enumerable: !0,
            get: () => t[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }));
}
const gi = "yh", Ur = "is-", Si = Symbol("namespaceContextKey"), wi = () => re(Si, P(gi)), Py = (a) => {
  const _ = wi(), r = (m = "") => {
    const f = N(_);
    return m ? `${f}-${a}-${m}` : `${f}-${a}`;
  }, t = (m) => m ? `${r()}__${m}` : "", s = (m) => m ? `${r()}--${m}` : "", n = (m, f, y) => {
    let k = r(m);
    return f && (k += `__${f}`), y && (k += `--${y}`), k;
  }, e = (m, f) => m && f ? `${r()}__${m}--${f}` : "";
  function i(m, f) {
    return arguments.length === 1 ? `${Ur}${m}` : f ? `${Ur}${m}` : "";
  }
  const o = (m) => `--${N(_)}-${a}-${m}`, u = (m) => {
    const f = {};
    return Object.entries(m).forEach(([y, k]) => {
      f[o(y)] = k;
    }), f;
  }, l = (m) => `--${N(_)}-${m}`;
  return {
    namespace: _,
    b: r,
    e: t,
    m: s,
    bem: n,
    em: e,
    is: i,
    cssVar: o,
    cssVarObj: u,
    cssVarBlock: l,
    cssVarBlockObj: (m) => {
      const f = {};
      return Object.entries(m).forEach(([y, k]) => {
        f[l(y)] = k;
      }), f;
    }
  };
}, oe = 2e3, bi = Symbol("zIndexContextKey"), Hi = Symbol("zIndexCounterKey"), ji = () => {
  if (typeof window < "u") {
    const a = window;
    return a.__YH_Z_INDEX__ === void 0 && (a.__YH_Z_INDEX__ = oe), ++a.__YH_Z_INDEX__;
  }
  return oe;
}, Ey = (a = oe) => {
  typeof window < "u" && (window.__YH_Z_INDEX__ = a);
}, zy = (a = oe) => ({ current: a }), Cy = (a) => {
  const _ = re(bi, void 0), r = re(Hi, null), t = R(() => N(a) ?? N(_) ?? oe), s = R(() => t.value);
  return {
    initialZIndex: t,
    currentZIndex: s,
    nextZIndex: () => {
      const e = N(a);
      return e !== void 0 ? e : r ? ++r.current : ji();
    }
  };
};
function Ry(a, _, r = []) {
  const t = P(r), s = R(() => {
    const u = {};
    return _.forEach((l) => {
      if (l.stock <= 0) return;
      o(l.specValueIds).forEach((m) => {
        const f = m.join(",");
        u[f] = (u[f] || 0) + l.stock;
      });
    }), u;
  }), n = (u, l) => {
    const d = [...t.value];
    d[u] === l ? d[u] = "" : d[u] = l;
    const m = d.filter((f) => !!f).sort((f, y) => String(f).localeCompare(String(y))).join(",");
    return m ? !!s.value[m] : !0;
  }, e = (u, l) => {
    t.value[u] === l ? t.value[u] = "" : t.value[u] = l;
  }, i = R(() => {
    if (!t.value.every((d) => !!d) || t.value.length < a.length) return null;
    const l = [...t.value].sort((d, m) => String(d).localeCompare(String(m))).join(",");
    return _.find(
      (d) => [...d.specValueIds].sort((m, f) => String(m).localeCompare(String(f))).join(",") === l
    ) || null;
  });
  function o(u) {
    const l = [[]];
    for (const d of u) {
      const m = l.length;
      for (let f = 0; f < m; f++)
        l.push([...l[f], d]);
    }
    return l.filter((d) => d.length > 0).map((d) => [...d].sort((m, f) => String(m).localeCompare(String(f))));
  }
  return {
    selectedValueIds: t,
    isValueSelectable: n,
    selectedSku: i,
    toggleValue: e
  };
}
function Fy(a) {
  const { time: _, interval: r = 1e3, onFinish: t, onChange: s } = a, n = P(_), e = P(null), i = R(() => e.value !== null), o = () => {
    e.value && (clearInterval(e.value), e.value = null);
  }, u = () => {
    i.value || n.value <= 0 || (e.value = setInterval(() => {
      n.value -= r, s && s(n.value), n.value <= 0 && (n.value = 0, o(), t && t());
    }, r));
  }, l = (d) => {
    o(), n.value = d !== void 0 ? d : _;
  };
  return Kr(() => {
    o();
  }), {
    remain: n,
    isRunning: i,
    start: u,
    stop: o,
    reset: l
  };
}
const Gr = {
  name: "zh-cn",
  yh: {
    // 通用
    common: {
      yes: "是",
      no: "否",
      confirm: "确认",
      cancel: "取消",
      loading: "加载中",
      close: "关闭",
      clear: "清空",
      reset: "重置",
      save: "保存",
      delete: "删除",
      edit: "编辑",
      add: "新增",
      search: "搜索",
      refresh: "刷新",
      expand: "展开",
      collapse: "收起",
      more: "更多",
      noData: "暂无数据",
      noMatch: "无匹配数据",
      selectAll: "全选",
      unselectAll: "取消全选"
    },
    // 颜色选择器
    colorpicker: {
      confirm: "确定",
      clear: "清空",
      eyeDropper: "吸色器",
      suggestionDark: "白色文字最佳",
      suggestionLight: "黑色文字最佳",
      recentColors: "最近使用",
      presetColors: "预设颜色"
    },
    // 日期选择器
    datepicker: {
      now: "此刻",
      today: "今天",
      cancel: "取消",
      clear: "清空",
      confirm: "确定",
      selectDate: "选择日期",
      selectTime: "选择时间",
      startDate: "开始日期",
      startTime: "开始时间",
      endDate: "结束日期",
      endTime: "结束时间",
      year: "年",
      month: "月",
      day: "日",
      week: "周",
      monthBeforeYear: !1,
      prevYear: "上一年",
      nextYear: "下一年",
      prevMonth: "上个月",
      nextMonth: "下个月",
      weeks: {
        sun: "日",
        mon: "一",
        tue: "二",
        wed: "三",
        thu: "四",
        fri: "五",
        sat: "六"
      },
      months: {
        jan: "一月",
        feb: "二月",
        mar: "三月",
        apr: "四月",
        may: "五月",
        jun: "六月",
        jul: "七月",
        aug: "八月",
        sep: "九月",
        oct: "十月",
        nov: "十一月",
        dec: "十二月"
      },
      quarters: {
        q1: "第一季度",
        q2: "第二季度",
        q3: "第三季度",
        q4: "第四季度"
      }
    },
    // 时间选择器
    timepicker: {
      confirm: "确定",
      cancel: "取消",
      now: "此刻",
      placeholder: "选择时间",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      selectTime: "选择时间"
    },
    // 时间选择
    timeselect: {
      placeholder: "选择时间"
    },
    // 树
    tree: {
      emptyText: "暂无数据",
      loading: "加载中...",
      checkAll: "全选",
      uncheckAll: "取消全选",
      expandAll: "展开全部",
      collapseAll: "收起全部"
    },
    // 树选择
    treeselect: {
      placeholder: "请选择",
      emptyText: "暂无数据",
      loading: "加载中...",
      noMatch: "无匹配数据"
    },
    // 日历
    calendar: {
      prevMonth: "上个月",
      nextMonth: "下个月",
      prevYear: "上一年",
      nextYear: "下一年",
      today: "今天",
      week: "周",
      holiday: "休",
      workday: "班",
      monthHeaderFormat: "YYYY年M月",
      weeks: {
        sun: "日",
        mon: "一",
        tue: "二",
        wed: "三",
        thu: "四",
        fri: "五",
        sat: "六"
      }
    },
    // 自动完成
    autocomplete: {
      loading: "加载中...",
      placeholder: "请输入",
      noData: "暂无数据",
      noMatch: "无匹配数据"
    },
    // 倒计时
    countdown: {
      days: "天",
      hours: "时",
      minutes: "分",
      seconds: "秒",
      milliseconds: "毫秒",
      finished: "已结束"
    },
    // 级联选择
    cascader: {
      noMatch: "无匹配数据",
      placeholder: "请选择",
      loading: "加载中...",
      noData: "暂无数据"
    },
    // 穿梭框
    transfer: {
      noMatch: "无匹配数据",
      noData: "无数据",
      titles: ["列表 1", "列表 2"],
      filterPlaceholder: "请输入搜索内容",
      noCheckedFormat: "共 {total} 项",
      hasCheckedFormat: "已选 {checked}/{total} 项",
      searchPlaceholder: "请输入关键词"
    },
    // 表格
    table: {
      emptyText: "暂无数据",
      confirmFilter: "筛选",
      resetFilter: "重置",
      clearFilter: "全部",
      sumText: "合计",
      loading: "正在加载...",
      index: "序号",
      print: "打 印",
      cancel: "取 消",
      preview: "打印预览",
      printTime: "打印时间",
      total: "共 {total} 条",
      page: "第 {page} 页",
      yes: "是",
      no: "否",
      // 工具栏
      toolbar: {
        refresh: "刷新",
        density: "密度",
        densityDefault: "默认",
        densityLarge: "宽松",
        densitySmall: "紧凑",
        columnSetting: "列设置",
        fullscreen: "全屏",
        exitFullscreen: "退出全屏",
        export: "导出",
        import: "导入",
        search: "搜索",
        searchPlaceholder: "请输入关键词搜索"
      },
      // 筛选
      filter: {
        selectAll: "全选",
        selectInvert: "反选",
        empty: "为空",
        notEmpty: "不为空",
        contains: "包含",
        notContains: "不包含",
        equals: "等于",
        notEquals: "不等于",
        startsWith: "开头是",
        endsWith: "结尾是",
        greaterThan: "大于",
        lessThan: "小于",
        between: "介于"
      },
      // 排序
      sort: {
        asc: "升序",
        desc: "降序",
        clear: "取消排序"
      },
      // 导出
      export: {
        title: "导出数据",
        filename: "文件名",
        type: "文件类型",
        scope: "导出范围",
        scopeAll: "全部数据",
        scopeSelected: "选中数据",
        scopeCurrentPage: "当前页数据",
        includeHeader: "包含表头",
        exporting: "正在导出...",
        success: "导出成功",
        error: "导出失败"
      },
      // 导入
      import: {
        title: "导入数据",
        selectFile: "选择文件",
        dragTip: "点击或拖拽文件到此处上传",
        importing: "正在导入...",
        success: "导入成功",
        error: "导入失败",
        preview: "数据预览",
        confirm: "确认导入"
      },
      // 打印
      printConfig: {
        title: "打印设置",
        pageTitle: "页面标题",
        pageHeader: "页眉",
        pageFooter: "页脚",
        printAll: "打印全部",
        printSelected: "打印选中",
        printCurrentPage: "打印当前页",
        landscape: "横向",
        portrait: "纵向",
        printing: "正在打印..."
      },
      // 列设置
      columnSetting: {
        title: "列设置",
        showAll: "显示全部",
        hideAll: "隐藏全部",
        reset: "重置",
        fixedLeft: "固定在左侧",
        fixedRight: "固定在右侧",
        unfixed: "取消固定"
      },
      // 右键菜单
      contextMenu: {
        copy: "复制",
        copyRow: "复制行",
        copyCell: "复制单元格",
        paste: "粘贴",
        insertRowAbove: "在上方插入行",
        insertRowBelow: "在下方插入行",
        deleteRow: "删除行",
        deleteSelectedRows: "删除选中行",
        exportSelected: "导出选中数据"
      },
      // 选择
      selection: {
        selectAll: "全选",
        selectInvert: "反选",
        selectNone: "取消选择",
        selected: "已选择 {count} 项"
      },
      // 展开
      expand: {
        expandAll: "展开全部",
        collapseAll: "收起全部"
      },
      // 树形
      tree: {
        expandAll: "展开全部",
        collapseAll: "收起全部",
        expandLevel: "展开到第 {level} 层"
      },
      // 拖拽
      drag: {
        dragTip: "拖拽以调整顺序",
        dropTip: "释放以放置"
      }
    },
    // 消息框
    messagebox: {
      title: "提示",
      confirm: "确定",
      cancel: "取消",
      close: "关闭",
      error: "输入的数据不合法!",
      alert: "警告",
      prompt: "请输入",
      inputPlaceholder: "请输入内容"
    },
    // 上传
    upload: {
      deleteTip: "按 delete 键可删除",
      delete: "删除",
      preview: "查看图片",
      continue: "继续上传",
      upload: "点击上传",
      tip: "点击或拖拽文件到此处<em>上传</em>",
      dragTip: "将文件拖到此处，或点击上传",
      uploading: "上传中...",
      success: "上传成功",
      error: "上传失败",
      retry: "重新上传",
      cancel: "取消上传",
      fileTypeError: "文件类型不支持",
      fileSizeError: "文件大小超出限制",
      fileCountError: "文件数量超出限制"
    },
    // 表单
    form: {
      validationFailed: "校验失败",
      required: "必填项",
      pleaseInput: "请输入",
      pleaseSelect: "请选择"
    },
    // 按钮
    button: {
      loading: "加载中..."
    },
    // 输入框
    input: {
      placeholder: "请输入内容",
      clear: "清空",
      showPassword: "显示密码",
      hidePassword: "隐藏密码",
      copy: "复制",
      copied: "已复制"
    },
    // 数字输入框
    inputnumber: {
      placeholder: "请输入数字",
      increase: "增加",
      decrease: "减少"
    },
    // 标签输入
    inputtag: {
      placeholder: "请输入",
      add: "添加",
      remove: "移除"
    },
    // 面包屑
    breadcrumb: {
      label: "面包屑",
      more: "更多"
    },
    // 返回顶部
    backtop: {
      text: "回到顶部"
    },
    // 选择器
    select: {
      placeholder: "请选择",
      noData: "暂无数据",
      loading: "加载中...",
      noMatch: "无匹配数据",
      selectAll: "全选",
      clearAll: "清空"
    },
    // 分页
    pagination: {
      goto: "前往",
      page: "页",
      total: "共 {total} 条",
      pageSize: "条/页",
      prev: "上一页",
      next: "下一页",
      first: "首页",
      last: "末页",
      pageClassifier: "页"
    },
    // 气泡确认
    popconfirm: {
      confirm: "确定",
      cancel: "取消",
      dontAskAgain: "不再提示"
    },
    // 对话框
    dialog: {
      confirm: "确定",
      cancel: "取消",
      close: "关闭",
      maximize: "最大化",
      restore: "还原"
    },
    // 抽屉
    drawer: {
      close: "关闭",
      confirm: "确定",
      cancel: "取消"
    },
    // 下拉菜单
    dropdown: {
      loading: "加载中..."
    },
    // 图片
    image: {
      error: "加载失败",
      loading: "加载中...",
      preview: "预览",
      zoomIn: "放大",
      zoomOut: "缩小",
      rotateLeft: "向左旋转",
      rotateRight: "向右旋转",
      originalSize: "原始大小",
      fullscreen: "全屏"
    },
    // 图片预览
    imageviewer: {
      close: "关闭",
      prev: "上一张",
      next: "下一张",
      zoomIn: "放大",
      zoomOut: "缩小",
      rotateLeft: "向左旋转",
      rotateRight: "向右旋转",
      reset: "重置",
      fullscreen: "全屏",
      exitFullscreen: "退出全屏"
    },
    // 无限滚动
    infinitescroll: {
      loading: "加载中...",
      finished: "没有更多了",
      error: "加载失败，点击重试",
      retry: "点击重试"
    },
    // 消息
    message: {
      close: "关闭"
    },
    // 通知
    notification: {
      close: "关闭"
    },
    // 加载
    loading: {
      text: "加载中..."
    },
    // 加载中
    spin: {
      text: "加载中..."
    },
    // 评分
    rate: {
      texts: ["极差", "失望", "一般", "满意", "惊喜"]
    },
    // 警告
    alert: {
      close: "关闭"
    },
    // 标签
    tag: {
      close: "关闭"
    },
    // 标签页
    tabs: {
      close: "关闭",
      add: "新增",
      more: "更多"
    },
    // 步骤条
    steps: {
      finish: "已完成",
      process: "进行中",
      wait: "等待中",
      error: "错误"
    },
    // 进度条
    progress: {
      success: "成功",
      exception: "异常",
      warning: "警告"
    },
    // 骨架屏
    skeleton: {
      loading: "加载中..."
    },
    // 空状态
    empty: {
      description: "暂无数据",
      noData: "暂无数据",
      noResult: "暂无结果",
      networkError: "网络错误",
      serverError: "服务器错误"
    },
    // 结果
    result: {
      success: "操作成功",
      error: "操作失败",
      warning: "警告",
      info: "提示",
      backHome: "返回首页"
    },
    // 瀑布流
    waterfall: {
      loading: "加载中...",
      noMore: "没有更多了",
      empty: "暂无数据"
    },
    // 描述列表
    descriptions: {
      colon: "："
    },
    // 滑块
    slider: {
      tipFormatter: "{value}"
    },
    // 开关
    switch: {
      on: "开",
      off: "关"
    },
    // 复选框
    checkbox: {
      selectAll: "全选"
    },
    // 单选框
    radio: {},
    // 菜单
    menu: {
      collapse: "收起菜单",
      expand: "展开菜单"
    },
    // 卡片
    card: {
      collapse: "收起",
      expand: "展开"
    },
    // 折叠面板
    collapse: {
      expand: "展开",
      collapse: "收起"
    },
    // 工具提示
    tooltip: {},
    // 气泡卡片
    popover: {},
    // 徽标
    badge: {},
    // 头像
    avatar: {
      error: "加载失败"
    },
    // 水印
    watermark: {},
    // 分割线
    divider: {},
    // 走马灯
    carousel: {
      prev: "上一张",
      next: "下一张"
    },
    // 跑马灯
    marquee: {},
    // 固钉
    affix: {},
    // 流程图
    flow: {
      zoomIn: "放大画布",
      zoomOut: "缩小画布",
      fitView: "自适应视图",
      lock: "锁定/解锁画布"
    },
    // 锚点
    anchor: {},
    // 提及
    mention: {
      placeholder: "请输入",
      loading: "加载中...",
      noData: "暂无数据"
    },
    // SKU 选择器
    skuselector: {
      placeholder: "请选择规格",
      emptyText: "暂无规格",
      stock: "库存",
      price: "价格",
      selected: "已选",
      outOfStock: "暂时无货"
    },
    // 商品卡片
    productcard: {
      viewDetails: "查看详情",
      buyNow: "立即购买",
      addToCart: "加入购物车",
      sold: "已售",
      soldOut: "售罄",
      vip: "会员"
    },
    // 价格
    price: {
      original: "原价"
    },
    // 优惠券
    couponcard: {
      available: "点击领取",
      used: "已使用",
      expired: "已过期",
      received: "已领取",
      limit: "满 {threshold} 元可用",
      noThreshold: "无门槛",
      validPeriod: "有效期",
      ruleTitle: "使用说明及规则"
    },
    // 幸运抽奖
    luckydraw: {
      start: "开始抽奖",
      drawing: "抽奖中...",
      end: "中奖了",
      retry: "再试一次"
    },
    // 筛选排序栏
    filterbar: {
      all: "全部",
      sort: "排序",
      filter: "筛选",
      cancel: "取消",
      reset: "重置",
      confirm: "确定",
      noOptions: "暂无筛选项",
      asc: "升序",
      desc: "降序",
      selected: "已选"
    },
    // 结算栏
    submitbar: {
      total: "小计：",
      selected: "已选 {count} 件",
      submit: "去结算",
      allSelect: "全选"
    },
    // 品类导航
    categorynav: {
      all: "全部",
      noData: "暂无数据",
      loading: "加载中..."
    },
    // 智能地址
    smartaddress: {
      placeholder: "请粘贴收货地址，自动识别姓名、手机号、地址",
      parse: "智能识别",
      province: "省/市/区",
      city: "市",
      district: "区/县",
      street: "街道/镇",
      detail: "详细地址",
      phone: "手机号",
      name: "收货人",
      parseSuccess: "地址识别成功",
      parseFailed: "未能识别，请手动填写",
      required: "请填写完整地址",
      provinceKeywords: ["省", "自治区", "特别行政区"],
      cityKeywords: ["市", "州", "盟"],
      districtKeywords: ["区", "县", "旗", "镇", "市"],
      streetKeywords: ["街道", "镇", "乡", "村"]
    },
    // AI 组件
    ai: {
      bubble: {
        citations: "参考引用"
      },
      mention: {
        placeholder: "@ 呼叫 Agent、文档或表格...",
        agent: "智能体",
        document: "文档",
        table: "表格",
        knowledge: "知识库"
      },
      codeBlock: {
        copyCode: "复制代码",
        copied: "已复制！",
        run: "运行代码",
        edit: "编辑",
        save: "保存",
        cancel: "取消"
      },
      codeRunner: {
        run: "运行",
        stop: "停止",
        clear: "清空",
        reset: "重置",
        placeholder: "点击运行按钮执行代码..."
      },
      sender: {
        placeholder: "发送消息...",
        dragTip: "释放鼠标以上传文件"
      },
      thoughtChain: {
        thoughtProcess: "思考过程",
        thinking: "思考中...",
        defaultTitle: "新步骤",
        addNode: "添加节点"
      },
      thinking: {
        start: "开始思考",
        thinking: "思考中...",
        complete: "已完成思考",
        error: "思考出错了"
      },
      welcome: {
        title: "你好，我是 YH AI",
        description: "我可以帮你写代码、翻译文档或进行创意写作。今天我能为你做点什么？"
      },
      action: {
        copy: "复制",
        regenerate: "重新生成",
        share: "分享",
        like: "赞同",
        dislike: "反对",
        edit: "编辑",
        delete: "删除"
      },
      artifacts: {
        preview: "预览",
        inline: "行内",
        code: "源码",
        versions: "版本历史",
        rendering: "正在渲染组件...",
        renderingChart: "正在渲染图表...",
        renderingCanvas: "正在准备画板..."
      },
      voice: {
        trigger: "点击说话",
        listening: "聆听中..."
      },
      // AiAgentCard
      agent: {
        uses: "次调用",
        use: "立即使用",
        favorite: "收藏",
        unfavorite: "取消收藏",
        share: "分享",
        online: "在线",
        offline: "离线",
        busy: "忙碌",
        verified: "官方认证",
        rating: "评分",
        reviews: "条评价",
        responseTime: "响应时间",
        ms: "ms"
      },
      // AiSources
      sources: {
        references: "参考来源",
        referencedSources: "引用来源",
        relevant: "相关度",
        viewOriginal: "查看原文",
        showAll: "显示全部",
        more: "更多来源",
        drawerTitle: "参考来源",
        expandMore: "展开更多",
        collapseMore: "收起",
        noSources: "暂无来源",
        today: "今天",
        last7Days: "最近 7 天",
        last30Days: "最近 30 天",
        earlier: "更早",
        pinned: "已置顶"
      },
      // AiConversations groups
      conversations: {
        today: "今天",
        last7Days: "最近 7 天",
        last30Days: "最近 30 天",
        earlier: "更早",
        pinned: "置顶",
        pin: "置顶",
        unpin: "取消置顶",
        newConversation: "新建对话",
        noData: "暂无对话记录",
        rename: "重命名",
        delete: "删除",
        deleteConfirm: "确认删除此对话？"
      },
      // AiAttachments
      attachments: {
        dropTip: "释放鼠标以上传文件",
        clickToUpload: "点击或拖拽文件到此处上传",
        uploadSuccess: "上传成功",
        uploadError: "上传失败",
        deleteConfirm: "确定删除此文件？",
        fileTooLarge: "文件大小不能超过 {size}",
        invalidFileType: "不支持的文件类型"
      },
      // AiMermaid
      mermaid: {
        image: "图片",
        code: "代码",
        zoomIn: "放大",
        zoomOut: "缩小",
        reset: "重置",
        download: "下载",
        copyCode: "复制代码",
        rendering: "正在渲染...",
        renderError: "渲染失败",
        renderSuccess: "渲染成功",
        retry: "重试"
      }
    }
  }
}, Ti = {
  yh: {
    // Common
    common: {
      yes: "Yes",
      no: "No",
      confirm: "Confirm",
      cancel: "Cancel",
      loading: "Loading",
      close: "Close",
      clear: "Clear",
      reset: "Reset",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      search: "Search",
      refresh: "Refresh",
      expand: "Expand",
      collapse: "Collapse",
      more: "More",
      noData: "No Data",
      noMatch: "No matching data",
      selectAll: "Select All",
      unselectAll: "Unselect All"
    },
    // Color Picker
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      eyeDropper: "Eye Dropper",
      suggestionDark: "White text is best",
      suggestionLight: "Black text is best",
      recentColors: "Recent Colors",
      presetColors: "Preset Colors"
    },
    // Date Picker
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      year: "",
      month: "",
      day: "",
      week: "Week",
      monthBeforeYear: !0,
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      },
      quarters: {
        q1: "Q1",
        q2: "Q2",
        q3: "Q3",
        q4: "Q4"
      }
    },
    // Time Picker
    timepicker: {
      confirm: "OK",
      cancel: "Cancel",
      now: "Now",
      placeholder: "Select time",
      startPlaceholder: "Start time",
      endPlaceholder: "End time",
      selectTime: "Select time"
    },
    // Time Select
    timeselect: {
      placeholder: "Select time"
    },
    // Tree
    tree: {
      emptyText: "No Data",
      loading: "Loading...",
      checkAll: "Check All",
      uncheckAll: "Uncheck All",
      expandAll: "Expand All",
      collapseAll: "Collapse All"
    },
    // Tree Select
    treeselect: {
      placeholder: "Select",
      emptyText: "No Data",
      loading: "Loading...",
      noMatch: "No matching data"
    },
    // Calendar
    calendar: {
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      today: "Today",
      week: "Week",
      holiday: "Holiday",
      workday: "Work",
      monthHeaderFormat: "MMMM YYYY",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      }
    },
    // Autocomplete
    autocomplete: {
      loading: "Loading...",
      placeholder: "Please input",
      noData: "No Data",
      noMatch: "No matching data"
    },
    // Countdown
    countdown: {
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      milliseconds: "milliseconds",
      finished: "Finished"
    },
    // Cascader
    cascader: {
      noMatch: "No matching data",
      placeholder: "Select",
      loading: "Loading...",
      noData: "No Data"
    },
    // Transfer
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked",
      searchPlaceholder: "Enter keyword"
    },
    // Table
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum",
      loading: "Loading...",
      index: "Index",
      print: "Print",
      cancel: "Cancel",
      preview: "Print Preview",
      printTime: "Print Time",
      total: "Total {total} items",
      page: "Page {page}",
      yes: "Yes",
      no: "No",
      // Toolbar
      toolbar: {
        refresh: "Refresh",
        density: "Density",
        densityDefault: "Default",
        densityLarge: "Large",
        densitySmall: "Small",
        columnSetting: "Column Settings",
        fullscreen: "Fullscreen",
        exitFullscreen: "Exit Fullscreen",
        export: "Export",
        import: "Import",
        search: "Search",
        searchPlaceholder: "Enter keywords to search"
      },
      // Filter
      filter: {
        selectAll: "Select All",
        selectInvert: "Invert Selection",
        empty: "Is Empty",
        notEmpty: "Is Not Empty",
        contains: "Contains",
        notContains: "Does Not Contain",
        equals: "Equals",
        notEquals: "Does Not Equal",
        startsWith: "Starts With",
        endsWith: "Ends With",
        greaterThan: "Greater Than",
        lessThan: "Less Than",
        between: "Between"
      },
      // Sort
      sort: {
        asc: "Ascending",
        desc: "Descending",
        clear: "Clear Sort"
      },
      // Export
      export: {
        title: "Export Data",
        filename: "Filename",
        type: "File Type",
        scope: "Export Scope",
        scopeAll: "All Data",
        scopeSelected: "Selected Data",
        scopeCurrentPage: "Current Page",
        includeHeader: "Include Header",
        exporting: "Exporting...",
        success: "Export Successful",
        error: "Export Failed"
      },
      // Import
      import: {
        title: "Import Data",
        selectFile: "Select File",
        dragTip: "Click or drag file here to upload",
        importing: "Importing...",
        success: "Import Successful",
        error: "Import Failed",
        preview: "Data Preview",
        confirm: "Confirm Import"
      },
      // Print
      printConfig: {
        title: "Print Settings",
        pageTitle: "Page Title",
        pageHeader: "Header",
        pageFooter: "Footer",
        printAll: "Print All",
        printSelected: "Print Selected",
        printCurrentPage: "Print Current Page",
        landscape: "Landscape",
        portrait: "Portrait",
        printing: "Printing..."
      },
      // Column Settings
      columnSetting: {
        title: "Column Settings",
        showAll: "Show All",
        hideAll: "Hide All",
        reset: "Reset",
        fixedLeft: "Fix to Left",
        fixedRight: "Fix to Right",
        unfixed: "Unfix"
      },
      // Context Menu
      contextMenu: {
        copy: "Copy",
        copyRow: "Copy Row",
        copyCell: "Copy Cell",
        paste: "Paste",
        insertRowAbove: "Insert Row Above",
        insertRowBelow: "Insert Row Below",
        deleteRow: "Delete Row",
        deleteSelectedRows: "Delete Selected Rows",
        exportSelected: "Export Selected"
      },
      // Selection
      selection: {
        selectAll: "Select All",
        selectInvert: "Invert Selection",
        selectNone: "Clear Selection",
        selected: "{count} items selected"
      },
      // Expand
      expand: {
        expandAll: "Expand All",
        collapseAll: "Collapse All"
      },
      // Tree
      tree: {
        expandAll: "Expand All",
        collapseAll: "Collapse All",
        expandLevel: "Expand to Level {level}"
      },
      // Drag
      drag: {
        dragTip: "Drag to reorder",
        dropTip: "Drop to place"
      }
    },
    // Message Box
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      close: "Close",
      error: "Illegal input",
      alert: "Alert",
      prompt: "Prompt",
      inputPlaceholder: "Please input"
    },
    // Upload
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue",
      upload: "Click to upload",
      tip: "Click or drag file to this area to <em>upload</em>",
      dragTip: "Drop file here or click to upload",
      uploading: "Uploading...",
      success: "Upload successful",
      error: "Upload failed",
      retry: "Retry",
      cancel: "Cancel upload",
      fileTypeError: "File type not supported",
      fileSizeError: "File size exceeds limit",
      fileCountError: "File count exceeds limit"
    },
    // Form
    form: {
      validationFailed: "Validation failed",
      required: "Required",
      pleaseInput: "Please input",
      pleaseSelect: "Please select"
    },
    // Button
    button: {
      loading: "Loading..."
    },
    // Input
    input: {
      placeholder: "Please input",
      clear: "Clear",
      showPassword: "Show password",
      hidePassword: "Hide password",
      copy: "Copy",
      copied: "Copied"
    },
    // Input Number
    inputnumber: {
      placeholder: "Please input number",
      increase: "Increase",
      decrease: "Decrease"
    },
    // Input Tag
    inputtag: {
      placeholder: "Please input",
      add: "Add",
      remove: "Remove"
    },
    // Breadcrumb
    breadcrumb: {
      label: "Breadcrumb",
      more: "More"
    },
    // Back Top
    backtop: {
      text: "Back to Top"
    },
    // Select
    select: {
      placeholder: "Please select",
      noData: "No Data",
      loading: "Loading...",
      noMatch: "No matching data",
      selectAll: "Select All",
      clearAll: "Clear All"
    },
    // Pagination
    pagination: {
      goto: "Go to",
      page: "",
      total: "Total {total}",
      pageSize: "/page",
      prev: "Previous",
      next: "Next",
      first: "First",
      last: "Last",
      pageClassifier: ""
    },
    // Popconfirm
    popconfirm: {
      confirm: "OK",
      cancel: "Cancel",
      dontAskAgain: "Don't ask again"
    },
    // Dialog
    dialog: {
      confirm: "OK",
      cancel: "Cancel",
      close: "Close",
      maximize: "Maximize",
      restore: "Restore"
    },
    // Drawer
    drawer: {
      close: "Close",
      confirm: "OK",
      cancel: "Cancel"
    },
    // Dropdown
    dropdown: {
      loading: "Loading..."
    },
    // Image
    image: {
      error: "FAILED",
      loading: "Loading...",
      preview: "Preview",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateLeft: "Rotate Left",
      rotateRight: "Rotate Right",
      originalSize: "Original Size",
      fullscreen: "Fullscreen"
    },
    // Image Viewer
    imageviewer: {
      close: "Close",
      prev: "Previous",
      next: "Next",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateLeft: "Rotate Left",
      rotateRight: "Rotate Right",
      reset: "Reset",
      fullscreen: "Fullscreen",
      exitFullscreen: "Exit Fullscreen"
    },
    // Infinite Scroll
    infinitescroll: {
      loading: "Loading...",
      finished: "No more data",
      error: "Load failed, click to retry",
      retry: "Click to retry"
    },
    // Message
    message: {
      close: "Close"
    },
    // Notification
    notification: {
      close: "Close"
    },
    // Loading
    loading: {
      text: "Loading..."
    },
    // Spin
    spin: {
      text: "Loading..."
    },
    // Rate
    rate: {
      texts: ["Extremely poor", "Disappointed", "Fair", "Satisfied", "Surprised"]
    },
    // Alert
    alert: {
      close: "Close"
    },
    // Tag
    tag: {
      close: "Close"
    },
    // Tabs
    tabs: {
      close: "Close",
      add: "Add",
      more: "More"
    },
    // Steps
    steps: {
      finish: "Finished",
      process: "In Progress",
      wait: "Waiting",
      error: "Error"
    },
    // Progress
    progress: {
      success: "Success",
      exception: "Exception",
      warning: "Warning"
    },
    // Skeleton
    skeleton: {
      loading: "Loading..."
    },
    // Empty
    empty: {
      description: "No Data",
      noData: "No Data",
      noResult: "No Results",
      networkError: "Network Error",
      serverError: "Server Error"
    },
    // Result
    result: {
      success: "Success",
      error: "Error",
      warning: "Warning",
      info: "Info",
      backHome: "Back to Home"
    },
    // Waterfall
    waterfall: {
      loading: "Loading...",
      noMore: "No more data",
      empty: "No Data"
    },
    // Descriptions
    descriptions: {
      colon: ":"
    },
    // Slider
    slider: {
      tipFormatter: "{value}"
    },
    // Switch
    switch: {
      on: "ON",
      off: "OFF"
    },
    // Checkbox
    checkbox: {
      selectAll: "Select All"
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: "Collapse Menu",
      expand: "Expand Menu"
    },
    // Card
    card: {
      collapse: "Collapse",
      expand: "Expand"
    },
    // Collapse
    collapse: {
      expand: "Expand",
      collapse: "Collapse"
    },
    // Tooltip
    tooltip: {},
    // Popover
    popover: {},
    // Badge
    badge: {},
    // Avatar
    avatar: {
      error: "Load failed"
    },
    // Watermark
    watermark: {},
    // Divider
    divider: {},
    // Carousel
    carousel: {
      prev: "Previous",
      next: "Next"
    },
    // Marquee
    marquee: {},
    // Affix
    affix: {},
    // Flow
    flow: {
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      fitView: "Fit View",
      lock: "Toggle Interactivity"
    },
    // Anchor
    anchor: {},
    // Mention
    mention: {
      placeholder: "Please input",
      loading: "Loading...",
      noData: "No Data"
    },
    // SKU Selector
    skuselector: {
      placeholder: "Select specifications",
      emptyText: "No specifications",
      stock: "Stock",
      price: "Price",
      selected: "Selected",
      outOfStock: "Out of Stock"
    },
    // Product Card
    productcard: {
      viewDetails: "View Details",
      buyNow: "Buy Now",
      addToCart: "Add to Cart",
      sold: "Sold",
      soldOut: "Sold Out",
      vip: "VIP"
    },
    // Price
    price: {
      original: "Original"
    },
    // Coupon Card
    couponcard: {
      available: "Claim Now",
      used: "Used",
      expired: "Expired",
      received: "Received",
      limit: "Orders over {threshold}",
      noThreshold: "No threshold",
      validPeriod: "Validity",
      ruleTitle: "Usage Rules"
    },
    // Lucky Draw
    luckydraw: {
      start: "Start",
      drawing: "Drawing...",
      end: "Winner!",
      retry: "Retry"
    },
    // Filter Bar
    filterbar: {
      all: "All",
      sort: "Sort",
      filter: "Filter",
      cancel: "Cancel",
      reset: "Reset",
      confirm: "Confirm",
      noOptions: "No options",
      asc: "Ascending",
      desc: "Descending",
      selected: "Selected"
    },
    // Submit Bar
    submitbar: {
      total: "Total: ",
      selected: "{count} selected",
      submit: "Checkout",
      allSelect: "Select All"
    },
    // Category Nav
    categorynav: {
      all: "All",
      noData: "No Data",
      loading: "Loading..."
    },
    // Smart Address
    smartaddress: {
      placeholder: "Paste address here, auto-detect name, phone, location",
      parse: "Smart Parse",
      province: "Province/City/District",
      city: "City",
      district: "District/County",
      street: "Street/Town",
      detail: "Detailed Address",
      phone: "Phone",
      name: "Recipient",
      parseSuccess: "Address parsed successfully",
      parseFailed: "Parse failed, please fill manually",
      required: "Please fill complete address",
      provinceKeywords: ["Province", "State"],
      cityKeywords: ["City", "Prefecture"],
      districtKeywords: ["District", "County", "Township"],
      streetKeywords: ["Street", "Road", "Ave", "Lane"]
    },
    ganttchart: {
      taskName: "Task Name",
      searchPlaceholder: "Search tasks...",
      zoom: "Zoom",
      day: "Day",
      week: "Week",
      month: "Month",
      year: "Year",
      milestone: "Milestone"
    },
    imagemagnifier: {
      switchToImage: "Switch to image {index}",
      galleryItem: "Gallery {index}",
      close: "Close"
    },
    // AI Components
    ai: {
      bubble: {
        citations: "Citations"
      },
      mention: {
        placeholder: "@ Mention Agent, Doc or Table...",
        agent: "Agent",
        document: "Document",
        table: "Table",
        knowledge: "Knowledge"
      },
      codeBlock: {
        copyCode: "Copy code",
        copied: "Copied!",
        run: "Run Code",
        edit: "Edit",
        save: "Save",
        cancel: "Cancel"
      },
      codeRunner: {
        run: "Run",
        stop: "Stop",
        clear: "Clear",
        reset: "Reset",
        placeholder: "Click Run to execute the code..."
      },
      sender: {
        placeholder: "Send a message...",
        dragTip: "Release to upload files"
      },
      thoughtChain: {
        thoughtProcess: "Thought Process",
        thinking: "Thinking...",
        defaultTitle: "New Step",
        addNode: "Add Step"
      },
      thinking: {
        start: "Start thinking",
        thinking: "Thinking...",
        complete: "Thinking complete",
        error: "Thinking error"
      },
      welcome: {
        title: "Hello, I am YH AI",
        description: "I can help you with coding, translating documents, or creative writing. What can I do for you today?"
      },
      action: {
        copy: "Copy",
        regenerate: "Regenerate",
        share: "Share",
        like: "Like",
        dislike: "Dislike",
        edit: "Edit",
        delete: "Delete"
      },
      artifacts: {
        preview: "Preview",
        inline: "Inline",
        code: "Source",
        versions: "Versions",
        rendering: "Rendering component...",
        renderingChart: "Rendering chart...",
        renderingCanvas: "Preparing canvas..."
      },
      voice: {
        trigger: "Click to Speak",
        listening: "Listening..."
      },
      // AiAgentCard
      agent: {
        uses: "uses",
        use: "Use Now",
        favorite: "Favorite",
        unfavorite: "Unfavorite",
        share: "Share",
        online: "Online",
        offline: "Offline",
        busy: "Busy",
        verified: "Verified",
        rating: "Rating",
        reviews: "reviews",
        responseTime: "Avg. Response",
        ms: "ms"
      },
      // AiSources
      sources: {
        references: "References",
        referencedSources: "Referenced Sources",
        relevant: "Relevance",
        viewOriginal: "View Original",
        showAll: "Show All",
        more: "more sources",
        drawerTitle: "References",
        expandMore: "Show More",
        collapseMore: "Collapse",
        noSources: "No sources",
        today: "Today",
        last7Days: "Last 7 Days",
        last30Days: "Last 30 Days",
        earlier: "Earlier",
        pinned: "Pinned"
      },
      // AiConversations groups
      conversations: {
        today: "Today",
        last7Days: "Last 7 Days",
        last30Days: "Last 30 Days",
        earlier: "Earlier",
        pinned: "Pinned",
        pin: "Pin",
        unpin: "Unpin",
        newConversation: "New Conversation",
        noData: "No conversations yet",
        rename: "Rename",
        delete: "Delete",
        deleteConfirm: "Confirm delete this conversation?"
      },
      // AiAttachments
      attachments: {
        dropTip: "Drop files here to upload",
        clickToUpload: "Click or drag files to upload",
        uploadSuccess: "Upload success",
        uploadError: "Upload failed",
        deleteConfirm: "Are you sure to delete this file?",
        fileTooLarge: "File size cannot exceed {size}",
        invalidFileType: "Invalid file type"
      },
      // AiMermaid
      mermaid: {
        image: "Image",
        code: "Code",
        zoomIn: "Zoom In",
        zoomOut: "Zoom Out",
        reset: "Reset",
        download: "Download",
        copyCode: "Copy Code",
        rendering: "Rendering...",
        renderError: "Render failed",
        renderSuccess: "Render success",
        retry: "Retry"
      }
    }
  }
}, $i = Symbol(
  "configProviderContextKey"
), Ai = () => {
  const a = re($i, null), _ = R(() => {
    const s = N(a);
    return (s == null ? void 0 : s.size) || "default";
  }), r = R(() => {
    const s = N(a);
    return (s == null ? void 0 : s.zIndex) || 2e3;
  }), t = R(() => {
    const s = N(a);
    return s == null ? void 0 : s.locale;
  });
  return {
    config: a,
    globalSize: _,
    globalZIndex: r,
    globalLocale: t
  };
};
function p(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var ie = { exports: {} }, qi = ie.exports, Zr;
function M() {
  return Zr || (Zr = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t();
    })(qi, (function() {
      var r = 1e3, t = 6e4, s = 36e5, n = "millisecond", e = "second", i = "minute", o = "hour", u = "day", l = "week", d = "month", m = "quarter", f = "year", y = "date", k = "Invalid Date", w = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, H = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, j = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(D) {
        var L = ["th", "st", "nd", "rd"], v = D % 100;
        return "[" + D + (L[(v - 20) % 10] || L[v] || L[0]) + "]";
      } }, F = function(D, L, v) {
        var Y = String(D);
        return !Y || Y.length >= L ? D : "" + Array(L + 1 - Y.length).join(v) + D;
      }, b = { s: F, z: function(D) {
        var L = -D.utcOffset(), v = Math.abs(L), Y = Math.floor(v / 60), h = v % 60;
        return (L <= 0 ? "+" : "-") + F(Y, 2, "0") + ":" + F(h, 2, "0");
      }, m: function D(L, v) {
        if (L.date() < v.date()) return -D(v, L);
        var Y = 12 * (v.year() - L.year()) + (v.month() - L.month()), h = L.clone().add(Y, d), x = v - h < 0, S = L.clone().add(Y + (x ? -1 : 1), d);
        return +(-(Y + (v - h) / (x ? h - S : S - h)) || 0);
      }, a: function(D) {
        return D < 0 ? Math.ceil(D) || 0 : Math.floor(D);
      }, p: function(D) {
        return { M: d, y: f, w: l, d: u, D: y, h: o, m: i, s: e, ms: n, Q: m }[D] || String(D || "").toLowerCase().replace(/s$/, "");
      }, u: function(D) {
        return D === void 0;
      } }, g = "en", T = {};
      T[g] = j;
      var E = "$isDayjsObject", O = function(D) {
        return D instanceof B || !(!D || !D[E]);
      }, C = function D(L, v, Y) {
        var h;
        if (!L) return g;
        if (typeof L == "string") {
          var x = L.toLowerCase();
          T[x] && (h = x), v && (T[x] = v, h = x);
          var S = L.split("-");
          if (!h && S.length > 1) return D(S[0]);
        } else {
          var $ = L.name;
          T[$] = L, h = $;
        }
        return !Y && h && (g = h), h || !Y && g;
      }, z = function(D, L) {
        if (O(D)) return D.clone();
        var v = typeof L == "object" ? L : {};
        return v.date = D, v.args = arguments, new B(v);
      }, A = b;
      A.l = C, A.i = O, A.w = function(D, L) {
        return z(D, { locale: L.$L, utc: L.$u, x: L.$x, $offset: L.$offset });
      };
      var B = (function() {
        function D(v) {
          this.$L = C(v.locale, null, !0), this.parse(v), this.$x = this.$x || v.x || {}, this[E] = !0;
        }
        var L = D.prototype;
        return L.parse = function(v) {
          this.$d = (function(Y) {
            var h = Y.date, x = Y.utc;
            if (h === null) return /* @__PURE__ */ new Date(NaN);
            if (A.u(h)) return /* @__PURE__ */ new Date();
            if (h instanceof Date) return new Date(h);
            if (typeof h == "string" && !/Z$/i.test(h)) {
              var S = h.match(w);
              if (S) {
                var $ = S[2] - 1 || 0, q = (S[7] || "0").substring(0, 3);
                return x ? new Date(Date.UTC(S[1], $, S[3] || 1, S[4] || 0, S[5] || 0, S[6] || 0, q)) : new Date(S[1], $, S[3] || 1, S[4] || 0, S[5] || 0, S[6] || 0, q);
              }
            }
            return new Date(h);
          })(v), this.init();
        }, L.init = function() {
          var v = this.$d;
          this.$y = v.getFullYear(), this.$M = v.getMonth(), this.$D = v.getDate(), this.$W = v.getDay(), this.$H = v.getHours(), this.$m = v.getMinutes(), this.$s = v.getSeconds(), this.$ms = v.getMilliseconds();
        }, L.$utils = function() {
          return A;
        }, L.isValid = function() {
          return this.$d.toString() !== k;
        }, L.isSame = function(v, Y) {
          var h = z(v);
          return this.startOf(Y) <= h && h <= this.endOf(Y);
        }, L.isAfter = function(v, Y) {
          return z(v) < this.startOf(Y);
        }, L.isBefore = function(v, Y) {
          return this.endOf(Y) < z(v);
        }, L.$g = function(v, Y, h) {
          return A.u(v) ? this[Y] : this.set(h, v);
        }, L.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, L.valueOf = function() {
          return this.$d.getTime();
        }, L.startOf = function(v, Y) {
          var h = this, x = !!A.u(Y) || Y, S = A.p(v), $ = function(X, U) {
            var ee = A.w(h.$u ? Date.UTC(h.$y, U, X) : new Date(h.$y, U, X), h);
            return x ? ee : ee.endOf(u);
          }, q = function(X, U) {
            return A.w(h.toDate()[X].apply(h.toDate("s"), (x ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(U)), h);
          }, I = this.$W, J = this.$M, K = this.$D, Q = "set" + (this.$u ? "UTC" : "");
          switch (S) {
            case f:
              return x ? $(1, 0) : $(31, 11);
            case d:
              return x ? $(1, J) : $(0, J + 1);
            case l:
              var Z = this.$locale().weekStart || 0, W = (I < Z ? I + 7 : I) - Z;
              return $(x ? K - W : K + (6 - W), J);
            case u:
            case y:
              return q(Q + "Hours", 0);
            case o:
              return q(Q + "Minutes", 1);
            case i:
              return q(Q + "Seconds", 2);
            case e:
              return q(Q + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, L.endOf = function(v) {
          return this.startOf(v, !1);
        }, L.$set = function(v, Y) {
          var h, x = A.p(v), S = "set" + (this.$u ? "UTC" : ""), $ = (h = {}, h[u] = S + "Date", h[y] = S + "Date", h[d] = S + "Month", h[f] = S + "FullYear", h[o] = S + "Hours", h[i] = S + "Minutes", h[e] = S + "Seconds", h[n] = S + "Milliseconds", h)[x], q = x === u ? this.$D + (Y - this.$W) : Y;
          if (x === d || x === f) {
            var I = this.clone().set(y, 1);
            I.$d[$](q), I.init(), this.$d = I.set(y, Math.min(this.$D, I.daysInMonth())).$d;
          } else $ && this.$d[$](q);
          return this.init(), this;
        }, L.set = function(v, Y) {
          return this.clone().$set(v, Y);
        }, L.get = function(v) {
          return this[A.p(v)]();
        }, L.add = function(v, Y) {
          var h, x = this;
          v = Number(v);
          var S = A.p(Y), $ = function(J) {
            var K = z(x);
            return A.w(K.date(K.date() + Math.round(J * v)), x);
          };
          if (S === d) return this.set(d, this.$M + v);
          if (S === f) return this.set(f, this.$y + v);
          if (S === u) return $(1);
          if (S === l) return $(7);
          var q = (h = {}, h[i] = t, h[o] = s, h[e] = r, h)[S] || 1, I = this.$d.getTime() + v * q;
          return A.w(I, this);
        }, L.subtract = function(v, Y) {
          return this.add(-1 * v, Y);
        }, L.format = function(v) {
          var Y = this, h = this.$locale();
          if (!this.isValid()) return h.invalidDate || k;
          var x = v || "YYYY-MM-DDTHH:mm:ssZ", S = A.z(this), $ = this.$H, q = this.$m, I = this.$M, J = h.weekdays, K = h.months, Q = h.meridiem, Z = function(U, ee, ae, _e) {
            return U && (U[ee] || U(Y, x)) || ae[ee].slice(0, _e);
          }, W = function(U) {
            return A.s($ % 12 || 12, U, "0");
          }, X = Q || function(U, ee, ae) {
            var _e = U < 12 ? "AM" : "PM";
            return ae ? _e.toLowerCase() : _e;
          };
          return x.replace(H, (function(U, ee) {
            return ee || (function(ae) {
              switch (ae) {
                case "YY":
                  return String(Y.$y).slice(-2);
                case "YYYY":
                  return A.s(Y.$y, 4, "0");
                case "M":
                  return I + 1;
                case "MM":
                  return A.s(I + 1, 2, "0");
                case "MMM":
                  return Z(h.monthsShort, I, K, 3);
                case "MMMM":
                  return Z(K, I);
                case "D":
                  return Y.$D;
                case "DD":
                  return A.s(Y.$D, 2, "0");
                case "d":
                  return String(Y.$W);
                case "dd":
                  return Z(h.weekdaysMin, Y.$W, J, 2);
                case "ddd":
                  return Z(h.weekdaysShort, Y.$W, J, 3);
                case "dddd":
                  return J[Y.$W];
                case "H":
                  return String($);
                case "HH":
                  return A.s($, 2, "0");
                case "h":
                  return W(1);
                case "hh":
                  return W(2);
                case "a":
                  return X($, q, !0);
                case "A":
                  return X($, q, !1);
                case "m":
                  return String(q);
                case "mm":
                  return A.s(q, 2, "0");
                case "s":
                  return String(Y.$s);
                case "ss":
                  return A.s(Y.$s, 2, "0");
                case "SSS":
                  return A.s(Y.$ms, 3, "0");
                case "Z":
                  return S;
              }
              return null;
            })(U) || S.replace(":", "");
          }));
        }, L.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, L.diff = function(v, Y, h) {
          var x, S = this, $ = A.p(Y), q = z(v), I = (q.utcOffset() - this.utcOffset()) * t, J = this - q, K = function() {
            return A.m(S, q);
          };
          switch ($) {
            case f:
              x = K() / 12;
              break;
            case d:
              x = K();
              break;
            case m:
              x = K() / 3;
              break;
            case l:
              x = (J - I) / 6048e5;
              break;
            case u:
              x = (J - I) / 864e5;
              break;
            case o:
              x = J / s;
              break;
            case i:
              x = J / t;
              break;
            case e:
              x = J / r;
              break;
            default:
              x = J;
          }
          return h ? x : A.a(x);
        }, L.daysInMonth = function() {
          return this.endOf(d).$D;
        }, L.$locale = function() {
          return T[this.$L];
        }, L.locale = function(v, Y) {
          if (!v) return this.$L;
          var h = this.clone(), x = C(v, Y, !0);
          return x && (h.$L = x), h;
        }, L.clone = function() {
          return A.w(this.$d, this);
        }, L.toDate = function() {
          return new Date(this.valueOf());
        }, L.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, L.toISOString = function() {
          return this.$d.toISOString();
        }, L.toString = function() {
          return this.$d.toUTCString();
        }, D;
      })(), V = B.prototype;
      return z.prototype = V, [["$ms", n], ["$s", e], ["$m", i], ["$H", o], ["$W", u], ["$M", d], ["$y", f], ["$D", y]].forEach((function(D) {
        V[D[1]] = function(L) {
          return this.$g(L, D[0], D[1]);
        };
      })), z.extend = function(D, L) {
        return D.$i || (D(L, B, z), D.$i = !0), z;
      }, z.locale = C, z.isDayjs = O, z.unix = function(D) {
        return z(1e3 * D);
      }, z.en = T[g], z.Ls = T, z.p = {}, z;
    }));
  })(ie)), ie.exports;
}
var Ps = M();
const Es = /* @__PURE__ */ p(Ps), Pi = /* @__PURE__ */ c({
  __proto__: null,
  default: Es
}, [Ps]), te = Es ?? Pi, Ei = /* @__PURE__ */ Object.assign({
  "../../../../node_modules/dayjs/locale/af.js": () => Promise.resolve().then(() => nu),
  "../../../../node_modules/dayjs/locale/am.js": () => Promise.resolve().then(() => _u),
  "../../../../node_modules/dayjs/locale/ar-dz.js": () => Promise.resolve().then(() => du),
  "../../../../node_modules/dayjs/locale/ar-iq.js": () => Promise.resolve().then(() => Mu),
  "../../../../node_modules/dayjs/locale/ar-kw.js": () => Promise.resolve().then(() => yu),
  "../../../../node_modules/dayjs/locale/ar-ly.js": () => Promise.resolve().then(() => xu),
  "../../../../node_modules/dayjs/locale/ar-ma.js": () => Promise.resolve().then(() => wu),
  "../../../../node_modules/dayjs/locale/ar-sa.js": () => Promise.resolve().then(() => Tu),
  "../../../../node_modules/dayjs/locale/ar-tn.js": () => Promise.resolve().then(() => Pu),
  "../../../../node_modules/dayjs/locale/ar.js": () => Promise.resolve().then(() => Ru),
  "../../../../node_modules/dayjs/locale/az.js": () => Promise.resolve().then(() => Nu),
  "../../../../node_modules/dayjs/locale/be.js": () => Promise.resolve().then(() => Wu),
  "../../../../node_modules/dayjs/locale/bg.js": () => Promise.resolve().then(() => Vu),
  "../../../../node_modules/dayjs/locale/bi.js": () => Promise.resolve().then(() => tl),
  "../../../../node_modules/dayjs/locale/bm.js": () => Promise.resolve().then(() => sl),
  "../../../../node_modules/dayjs/locale/bn-bd.js": () => Promise.resolve().then(() => ul),
  "../../../../node_modules/dayjs/locale/bn.js": () => Promise.resolve().then(() => cl),
  "../../../../node_modules/dayjs/locale/bo.js": () => Promise.resolve().then(() => hl),
  "../../../../node_modules/dayjs/locale/br.js": () => Promise.resolve().then(() => Ll),
  "../../../../node_modules/dayjs/locale/bs.js": () => Promise.resolve().then(() => gl),
  "../../../../node_modules/dayjs/locale/ca.js": () => Promise.resolve().then(() => Hl),
  "../../../../node_modules/dayjs/locale/cs.js": () => Promise.resolve().then(() => Al),
  "../../../../node_modules/dayjs/locale/cv.js": () => Promise.resolve().then(() => zl),
  "../../../../node_modules/dayjs/locale/cy.js": () => Promise.resolve().then(() => Il),
  "../../../../node_modules/dayjs/locale/da.js": () => Promise.resolve().then(() => Kl),
  "../../../../node_modules/dayjs/locale/de-at.js": () => Promise.resolve().then(() => Gl),
  "../../../../node_modules/dayjs/locale/de-ch.js": () => Promise.resolve().then(() => Ql),
  "../../../../node_modules/dayjs/locale/de.js": () => Promise.resolve().then(() => nd),
  "../../../../node_modules/dayjs/locale/dv.js": () => Promise.resolve().then(() => _d),
  "../../../../node_modules/dayjs/locale/el.js": () => Promise.resolve().then(() => dd),
  "../../../../node_modules/dayjs/locale/en-au.js": () => Promise.resolve().then(() => Md),
  "../../../../node_modules/dayjs/locale/en-ca.js": () => Promise.resolve().then(() => yd),
  "../../../../node_modules/dayjs/locale/en-gb.js": () => Promise.resolve().then(() => xd),
  "../../../../node_modules/dayjs/locale/en-ie.js": () => Promise.resolve().then(() => wd),
  "../../../../node_modules/dayjs/locale/en-il.js": () => Promise.resolve().then(() => Td),
  "../../../../node_modules/dayjs/locale/en-in.js": () => Promise.resolve().then(() => Pd),
  "../../../../node_modules/dayjs/locale/en-nz.js": () => Promise.resolve().then(() => Rd),
  "../../../../node_modules/dayjs/locale/en-sg.js": () => Promise.resolve().then(() => Nd),
  "../../../../node_modules/dayjs/locale/en-tt.js": () => Promise.resolve().then(() => Wd),
  "../../../../node_modules/dayjs/locale/en.js": () => Promise.resolve().then(() => Vd),
  "../../../../node_modules/dayjs/locale/eo.js": () => Promise.resolve().then(() => tm),
  "../../../../node_modules/dayjs/locale/es-do.js": () => Promise.resolve().then(() => sm),
  "../../../../node_modules/dayjs/locale/es-mx.js": () => Promise.resolve().then(() => um),
  "../../../../node_modules/dayjs/locale/es-pr.js": () => Promise.resolve().then(() => cm),
  "../../../../node_modules/dayjs/locale/es-us.js": () => Promise.resolve().then(() => hm),
  "../../../../node_modules/dayjs/locale/es.js": () => Promise.resolve().then(() => Lm),
  "../../../../node_modules/dayjs/locale/et.js": () => Promise.resolve().then(() => gm),
  "../../../../node_modules/dayjs/locale/eu.js": () => Promise.resolve().then(() => Hm),
  "../../../../node_modules/dayjs/locale/fa.js": () => Promise.resolve().then(() => Am),
  "../../../../node_modules/dayjs/locale/fi.js": () => Promise.resolve().then(() => zm),
  "../../../../node_modules/dayjs/locale/fo.js": () => Promise.resolve().then(() => Im),
  "../../../../node_modules/dayjs/locale/fr-ca.js": () => Promise.resolve().then(() => Km),
  "../../../../node_modules/dayjs/locale/fr-ch.js": () => Promise.resolve().then(() => Gm),
  "../../../../node_modules/dayjs/locale/fr.js": () => Promise.resolve().then(() => Qm),
  "../../../../node_modules/dayjs/locale/fy.js": () => Promise.resolve().then(() => nc),
  "../../../../node_modules/dayjs/locale/ga.js": () => Promise.resolve().then(() => _c),
  "../../../../node_modules/dayjs/locale/gd.js": () => Promise.resolve().then(() => dc),
  "../../../../node_modules/dayjs/locale/gl.js": () => Promise.resolve().then(() => Mc),
  "../../../../node_modules/dayjs/locale/gom-latn.js": () => Promise.resolve().then(() => yc),
  "../../../../node_modules/dayjs/locale/gu.js": () => Promise.resolve().then(() => xc),
  "../../../../node_modules/dayjs/locale/he.js": () => Promise.resolve().then(() => wc),
  "../../../../node_modules/dayjs/locale/hi.js": () => Promise.resolve().then(() => Tc),
  "../../../../node_modules/dayjs/locale/hr.js": () => Promise.resolve().then(() => Pc),
  "../../../../node_modules/dayjs/locale/ht.js": () => Promise.resolve().then(() => Rc),
  "../../../../node_modules/dayjs/locale/hu.js": () => Promise.resolve().then(() => Nc),
  "../../../../node_modules/dayjs/locale/hy-am.js": () => Promise.resolve().then(() => Wc),
  "../../../../node_modules/dayjs/locale/id.js": () => Promise.resolve().then(() => Vc),
  "../../../../node_modules/dayjs/locale/is.js": () => Promise.resolve().then(() => tp),
  "../../../../node_modules/dayjs/locale/it-ch.js": () => Promise.resolve().then(() => sp),
  "../../../../node_modules/dayjs/locale/it.js": () => Promise.resolve().then(() => up),
  "../../../../node_modules/dayjs/locale/ja.js": () => Promise.resolve().then(() => cp),
  "../../../../node_modules/dayjs/locale/jv.js": () => Promise.resolve().then(() => hp),
  "../../../../node_modules/dayjs/locale/ka.js": () => Promise.resolve().then(() => Lp),
  "../../../../node_modules/dayjs/locale/kk.js": () => Promise.resolve().then(() => gp),
  "../../../../node_modules/dayjs/locale/km.js": () => Promise.resolve().then(() => Hp),
  "../../../../node_modules/dayjs/locale/kn.js": () => Promise.resolve().then(() => Ap),
  "../../../../node_modules/dayjs/locale/ko.js": () => Promise.resolve().then(() => zp),
  "../../../../node_modules/dayjs/locale/ku.js": () => Promise.resolve().then(() => Ip),
  "../../../../node_modules/dayjs/locale/ky.js": () => Promise.resolve().then(() => Kp),
  "../../../../node_modules/dayjs/locale/lb.js": () => Promise.resolve().then(() => Gp),
  "../../../../node_modules/dayjs/locale/lo.js": () => Promise.resolve().then(() => Qp),
  "../../../../node_modules/dayjs/locale/lt.js": () => Promise.resolve().then(() => nM),
  "../../../../node_modules/dayjs/locale/lv.js": () => Promise.resolve().then(() => _M),
  "../../../../node_modules/dayjs/locale/me.js": () => Promise.resolve().then(() => dM),
  "../../../../node_modules/dayjs/locale/mi.js": () => Promise.resolve().then(() => MM),
  "../../../../node_modules/dayjs/locale/mk.js": () => Promise.resolve().then(() => yM),
  "../../../../node_modules/dayjs/locale/ml.js": () => Promise.resolve().then(() => xM),
  "../../../../node_modules/dayjs/locale/mn.js": () => Promise.resolve().then(() => wM),
  "../../../../node_modules/dayjs/locale/mr.js": () => Promise.resolve().then(() => TM),
  "../../../../node_modules/dayjs/locale/ms-my.js": () => Promise.resolve().then(() => PM),
  "../../../../node_modules/dayjs/locale/ms.js": () => Promise.resolve().then(() => RM),
  "../../../../node_modules/dayjs/locale/mt.js": () => Promise.resolve().then(() => NM),
  "../../../../node_modules/dayjs/locale/my.js": () => Promise.resolve().then(() => WM),
  "../../../../node_modules/dayjs/locale/nb.js": () => Promise.resolve().then(() => VM),
  "../../../../node_modules/dayjs/locale/ne.js": () => Promise.resolve().then(() => tf),
  "../../../../node_modules/dayjs/locale/nl-be.js": () => Promise.resolve().then(() => sf),
  "../../../../node_modules/dayjs/locale/nl.js": () => Promise.resolve().then(() => lf),
  "../../../../node_modules/dayjs/locale/nn.js": () => Promise.resolve().then(() => pf),
  "../../../../node_modules/dayjs/locale/oc-lnc.js": () => Promise.resolve().then(() => Yf),
  "../../../../node_modules/dayjs/locale/pa-in.js": () => Promise.resolve().then(() => kf),
  "../../../../node_modules/dayjs/locale/pl.js": () => Promise.resolve().then(() => Sf),
  "../../../../node_modules/dayjs/locale/pt-br.js": () => Promise.resolve().then(() => jf),
  "../../../../node_modules/dayjs/locale/pt.js": () => Promise.resolve().then(() => qf),
  "../../../../node_modules/dayjs/locale/rn.js": () => Promise.resolve().then(() => Cf),
  "../../../../node_modules/dayjs/locale/ro.js": () => Promise.resolve().then(() => Jf),
  "../../../../node_modules/dayjs/locale/ru.js": () => Promise.resolve().then(() => Bf),
  "../../../../node_modules/dayjs/locale/rw.js": () => Promise.resolve().then(() => Zf),
  "../../../../node_modules/dayjs/locale/sd.js": () => Promise.resolve().then(() => eh),
  "../../../../node_modules/dayjs/locale/se.js": () => Promise.resolve().then(() => ah),
  "../../../../node_modules/dayjs/locale/si.js": () => Promise.resolve().then(() => ih),
  "../../../../node_modules/dayjs/locale/sk.js": () => Promise.resolve().then(() => mh),
  "../../../../node_modules/dayjs/locale/sl.js": () => Promise.resolve().then(() => fh),
  "../../../../node_modules/dayjs/locale/sq.js": () => Promise.resolve().then(() => vh),
  "../../../../node_modules/dayjs/locale/sr-cyrl.js": () => Promise.resolve().then(() => Dh),
  "../../../../node_modules/dayjs/locale/sr.js": () => Promise.resolve().then(() => bh),
  "../../../../node_modules/dayjs/locale/ss.js": () => Promise.resolve().then(() => $h),
  "../../../../node_modules/dayjs/locale/sv-fi.js": () => Promise.resolve().then(() => Eh),
  "../../../../node_modules/dayjs/locale/sv.js": () => Promise.resolve().then(() => Fh),
  "../../../../node_modules/dayjs/locale/sw.js": () => Promise.resolve().then(() => Oh),
  "../../../../node_modules/dayjs/locale/ta.js": () => Promise.resolve().then(() => Uh),
  "../../../../node_modules/dayjs/locale/te.js": () => Promise.resolve().then(() => Xh),
  "../../../../node_modules/dayjs/locale/tet.js": () => Promise.resolve().then(() => rY),
  "../../../../node_modules/dayjs/locale/tg.js": () => Promise.resolve().then(() => oY),
  "../../../../node_modules/dayjs/locale/th.js": () => Promise.resolve().then(() => lY),
  "../../../../node_modules/dayjs/locale/tk.js": () => Promise.resolve().then(() => pY),
  "../../../../node_modules/dayjs/locale/tl-ph.js": () => Promise.resolve().then(() => YY),
  "../../../../node_modules/dayjs/locale/tlh.js": () => Promise.resolve().then(() => kY),
  "../../../../node_modules/dayjs/locale/tr.js": () => Promise.resolve().then(() => SY),
  "../../../../node_modules/dayjs/locale/tzl.js": () => Promise.resolve().then(() => jY),
  "../../../../node_modules/dayjs/locale/tzm-latn.js": () => Promise.resolve().then(() => qY),
  "../../../../node_modules/dayjs/locale/tzm.js": () => Promise.resolve().then(() => CY),
  "../../../../node_modules/dayjs/locale/ug-cn.js": () => Promise.resolve().then(() => JY),
  "../../../../node_modules/dayjs/locale/uk.js": () => Promise.resolve().then(() => BY),
  "../../../../node_modules/dayjs/locale/ur.js": () => Promise.resolve().then(() => ZY),
  "../../../../node_modules/dayjs/locale/uz-latn.js": () => Promise.resolve().then(() => ey),
  "../../../../node_modules/dayjs/locale/uz.js": () => Promise.resolve().then(() => ay),
  "../../../../node_modules/dayjs/locale/vi.js": () => Promise.resolve().then(() => iy),
  "../../../../node_modules/dayjs/locale/x-pseudo.js": () => Promise.resolve().then(() => my),
  "../../../../node_modules/dayjs/locale/yo.js": () => Promise.resolve().then(() => fy),
  "../../../../node_modules/dayjs/locale/zh-cn.js": () => Promise.resolve().then(() => vy),
  "../../../../node_modules/dayjs/locale/zh-hk.js": () => Promise.resolve().then(() => Dy),
  "../../../../node_modules/dayjs/locale/zh-tw.js": () => Promise.resolve().then(() => by),
  "../../../../node_modules/dayjs/locale/zh.js": () => Promise.resolve().then(() => $y)
}), Nr = /* @__PURE__ */ new Set(["en"]), zi = {
  "zh-cn": "zh-cn",
  "zh-tw": "zh-tw",
  "zh-hk": "zh-hk",
  "zh-mo": "zh-tw",
  en: "en",
  ja: "ja",
  ko: "ko",
  de: "de",
  fr: "fr",
  es: "es",
  pt: "pt",
  "pt-br": "pt-br",
  ru: "ru",
  ar: "ar",
  "ar-eg": "ar",
  tr: "tr",
  it: "it",
  nl: "nl",
  pl: "pl",
  th: "th",
  vi: "vi",
  id: "id",
  ms: "ms",
  da: "da",
  sv: "sv",
  fi: "fi",
  no: "nb",
  "nb-NO": "nb",
  cs: "cs",
  sk: "sk",
  uk: "uk",
  hu: "hu",
  ro: "ro",
  bg: "bg",
  az: "az",
  fa: "fa",
  hi: "hi",
  pa: "pa-in",
  el: "el",
  ca: "ca",
  tk: "tk",
  ta: "ta",
  lv: "lv",
  af: "af",
  et: "et",
  sl: "sl",
  he: "he",
  lo: "lo",
  lt: "lt",
  mn: "mn",
  kk: "kk",
  ku: "ku",
  ckb: "ku",
  "ug-cn": "ug-cn",
  km: "km",
  sr: "sr",
  eu: "eu",
  ky: "ky",
  "hy-am": "hy-am",
  hr: "hr",
  eo: "eo",
  bn: "bn",
  mg: "mg",
  sw: "sw",
  "uz-uz": "uz",
  my: "my",
  te: "te"
}, Ci = async (a) => {
  const _ = `../../../../node_modules/dayjs/locale/${a}.js`, r = Ei[_];
  if (r)
    return await r(), !0;
  try {
    return await import(
      /* @vite-ignore */
      `dayjs/locale/${a}.js`
    ), !0;
  } catch {
    return !1;
  }
}, Wr = (a) => zi[a.toLowerCase()] || "en", zs = async (a) => {
  const _ = Wr(a);
  if (Nr.has(_)) {
    te.locale(_);
    return;
  }
  if (_ === "en") {
    te.locale("en");
    return;
  }
  try {
    if (!await Ci(_)) {
      te.locale("en");
      return;
    }
    Nr.add(_), te.locale(_);
  } catch {
    te.locale("en");
  }
}, Iy = (a) => {
  const _ = Wr(a);
  Nr.has(_) ? te.locale(_) : (te.locale("en"), zs(a));
}, Jy = (a, _) => {
  const r = Wr(a), t = [
    _.jan,
    _.feb,
    _.mar,
    _.apr,
    _.may,
    _.jun,
    _.jul,
    _.aug,
    _.sep,
    _.oct,
    _.nov,
    _.dec
  ];
  try {
    const s = te.updateLocale;
    s && s(r, {
      months: t,
      monthsShort: t
    });
  } catch {
  }
}, Ny = (a) => {
  const { globalLocale: _ } = Ai(), r = R(() => N(a) ?? N(_) ?? Gr), t = R(() => r.value.name);
  Br(
    t,
    (i) => {
      zs(i);
    },
    { immediate: !0 }
  );
  const s = (i) => {
    const o = i.split("."), u = [r.value.yh, Gr.yh, Ti.yh];
    for (const l of u) {
      let d = l;
      for (const m of o)
        if (d && typeof d == "object")
          d = d[m];
        else {
          d = void 0;
          break;
        }
      if (d !== void 0) return d;
    }
  };
  return {
    locale: r,
    lang: t,
    t: (i, o) => {
      const u = s(i);
      return typeof u != "string" ? i : o ? u.replace(/\{(\w+)\}/g, (l, d) => {
        const m = o[d];
        return m !== void 0 ? String(m) : `{${d}}`;
      }) : u;
    },
    tRaw: (i) => {
      const o = s(i);
      return o === void 0 ? i : o;
    }
  };
}, Ri = Symbol("idInjectionKey"), Oy = (a) => {
  const _ = re(Ri, void 0), r = ki();
  return R(() => {
    const s = N(a);
    if (s) return s;
    const n = N(_);
    return n || r;
  });
}, Ky = () => ({
  prefix: R(() => `yh-${Date.now()}`),
  current: 0
  // No longer using counter
}), Fi = Symbol("FormContextKey"), Ii = Symbol("FormItemContextKey"), By = () => {
  const a = re(Fi, void 0), _ = re(Ii, void 0);
  return {
    form: a,
    formItem: _,
    // 触发校验
    validate: (r) => _ ? _.validate(r).catch(() => !1) : Promise.resolve(!0)
  };
};
function Wy(a) {
  const _ = P(null), r = P(0), t = R(() => Array.isArray(a.items) ? a.items : a.items.value), s = R(() => N(a.itemHeight)), n = R(() => N(a.containerHeight)), e = R(() => N(a.overscan) ?? 3), i = R(() => t.value.length * s.value), o = R(() => {
    if (t.value.length === 0) return 0;
    const y = Math.floor(r.value / s.value);
    return Math.max(0, y - e.value);
  }), u = R(() => {
    if (t.value.length === 0) return 0;
    const y = Math.ceil((r.value + n.value) / s.value);
    return Math.min(t.value.length, y + e.value);
  }), l = R(() => t.value.slice(o.value, u.value)), d = R(() => o.value * s.value);
  return {
    visibleItems: l,
    totalHeight: i,
    offsetY: d,
    startIndex: o,
    endIndex: u,
    onScroll: (y) => {
      const k = y.target;
      k && (r.value = k.scrollTop);
    },
    scrollToIndex: (y) => {
      if (_.value) {
        const k = y * s.value;
        _.value.scrollTop = k, r.value = k;
      }
    },
    containerRef: _
  };
}
function Uy(a, _) {
  const r = ne(null);
  return {
    data: r,
    execute: async () => {
      try {
        r.value = await _();
      } catch (s) {
        console.error(`[YH-UI] Cache fetcher error for key ${a}:`, s);
      }
    }
  };
}
function Vr(a, _, r, t) {
  if (typeof window > "u") return;
  const s = () => typeof a == "function" ? a() : N(a), n = () => {
    const i = s();
    i && i.addEventListener(_, r, t);
  }, e = () => {
    const i = s();
    i && i.removeEventListener(_, r, t);
  };
  qs(n), xi(e), Di(a) && Br(a, (i, o) => {
    o && o.removeEventListener(_, r, t), i && i.addEventListener(_, r, t);
  });
}
const Gy = (a) => {
  const _ = P(!1);
  let r = { overflow: "", paddingRight: "" }, t = { overflow: "", paddingRight: "" };
  const s = () => window.innerWidth - document.documentElement.clientWidth, n = () => {
    if (_.value) return;
    const i = s(), o = document.documentElement, u = document.body;
    if (r = {
      overflow: o.style.overflow,
      paddingRight: o.style.paddingRight
    }, t = {
      overflow: u.style.overflow,
      paddingRight: u.style.paddingRight
    }, i > 0) {
      const l = `${i}px`;
      o.style.setProperty("--yh-scrollbar-width", l);
      const d = window.getComputedStyle(u).paddingRight;
      u.style.paddingRight = `calc(${d} + ${l})`;
    }
    o.style.overflow = "hidden", u.style.overflow = "hidden", o.classList.add("yh-popup-parent--hidden"), _.value = !0;
  }, e = () => {
    if (!_.value) return;
    const i = document.documentElement, o = document.body;
    i.style.overflow = r.overflow, i.style.paddingRight = r.paddingRight, o.style.overflow = t.overflow, o.style.paddingRight = t.paddingRight, i.classList.remove("yh-popup-parent--hidden"), setTimeout(() => {
      i.classList.contains("yh-popup-parent--hidden") || i.style.removeProperty("--yh-scrollbar-width");
    }, 400), _.value = !1;
  };
  return Br(a, (i) => {
    i ? n() : e();
  }), Kr(e), {
    isLocked: _
  };
};
function Zy(a, _) {
  if (typeof window > "u") return;
  const r = (t) => {
    const s = N(a);
    !s || t.composedPath().includes(s) || _(t);
  };
  Vr(window, "mousedown", r, !0), Vr(window, "touchstart", r, !0);
}
const Ji = (a) => {
  var t, s, n;
  const _ = a.split(`
`);
  let r = "";
  for (const e of _) {
    if (!e.startsWith("data: ")) continue;
    const i = e.slice(6).trim();
    if (i === "[DONE]") break;
    try {
      const o = JSON.parse(i), u = (n = (s = (t = o == null ? void 0 : o.choices) == null ? void 0 : t[0]) == null ? void 0 : s.delta) == null ? void 0 : n.content;
      u && (r += u);
    } catch {
    }
  }
  return r || null;
}, Ni = (a) => {
  const _ = a.split(`
`);
  let r = "";
  for (const t of _) {
    if (!t.startsWith("data: ")) continue;
    const s = t.slice(6).trim();
    try {
      const n = JSON.parse(s);
      n != null && n.result && (r += n.result);
    } catch {
    }
  }
  return r || null;
}, Oi = (a) => {
  var t;
  const _ = a.split(`
`);
  let r = "";
  for (const s of _) {
    if (!s.startsWith("data: ")) continue;
    const n = s.slice(6).trim();
    try {
      const e = JSON.parse(n), i = (t = e == null ? void 0 : e.output) == null ? void 0 : t.text;
      i && (r += i);
    } catch {
    }
  }
  return r || null;
}, Ki = (a) => {
  var t;
  const _ = a.split(`
`);
  let r = "";
  for (const s of _) {
    if (!s.startsWith("data: ")) continue;
    const n = s.slice(6).trim();
    try {
      const e = JSON.parse(n);
      (e == null ? void 0 : e.type) === "content_block_delta" && ((t = e == null ? void 0 : e.delta) != null && t.text) && (r += e.delta.text);
    } catch {
    }
  }
  return r || null;
}, Bi = (a) => {
  var t, s, n, e, i;
  const _ = a.split(`
`);
  let r = "";
  for (const o of _) {
    const u = o.startsWith("data: ") ? o.slice(6).trim() : o.trim();
    if (u)
      try {
        const l = JSON.parse(u), d = (i = (e = (n = (s = (t = l == null ? void 0 : l.candidates) == null ? void 0 : t[0]) == null ? void 0 : s.content) == null ? void 0 : n.parts) == null ? void 0 : e[0]) == null ? void 0 : i.text;
        d && (r += d);
      } catch {
      }
  }
  return r || null;
}, Or = (a) => a || null;
class Wi {
  constructor(_, r = 3) {
    G(this, "queue", []);
    G(this, "rafId", null);
    G(this, "onUpdate");
    G(this, "charsPerFrame");
    this.onUpdate = _, this.charsPerFrame = r;
  }
  push(_) {
    this.queue.push(..._.split("")), this.rafId === null && this.schedule();
  }
  schedule() {
    this.rafId = requestAnimationFrame(() => {
      if (this.rafId = null, this.queue.length === 0) return;
      const _ = this.queue.splice(0, this.charsPerFrame).join("");
      this.onUpdate(_), this.queue.length > 0 && this.schedule();
    });
  }
  flush() {
    if (this.rafId !== null && (cancelAnimationFrame(this.rafId), this.rafId = null), this.queue.length > 0) {
      const _ = this.queue.splice(0).join("");
      this.onUpdate(_);
    }
  }
  cancel() {
    this.rafId !== null && (cancelAnimationFrame(this.rafId), this.rafId = null), this.queue = [];
  }
}
function Vy(a) {
  const _ = P(!1), r = P("");
  let t = new AbortController(), s = null;
  const n = a.parser ?? Or, e = a.typewriter !== !1, i = a.charsPerFrame ?? 3;
  return {
    isStreaming: _,
    currentContent: r,
    fetchStream: async (l, ...d) => {
      var f, y;
      _.value = !0, r.value = "", t = new AbortController(), e && (s = new Wi((k) => {
        var w;
        r.value += k, (w = a.onUpdate) == null || w.call(a, k, r.value);
      }, i));
      const m = (k) => {
        var w;
        k && (e && s ? s.push(k) : (r.value += k, (w = a.onUpdate) == null || w.call(a, k, r.value)));
      };
      try {
        const k = await a.request(l, ...d);
        if (typeof k == "object" && k !== null && Symbol.asyncIterator in k)
          for await (const w of k) {
            if (t.signal.aborted) break;
            const H = n(w);
            H !== null && m(H);
          }
        else if (k instanceof Response && k.body) {
          const w = k.body.getReader(), H = new TextDecoder("utf-8");
          for (; ; ) {
            if (t.signal.aborted) {
              w.cancel();
              break;
            }
            const { done: j, value: F } = await w.read();
            if (j) break;
            const b = H.decode(F, { stream: !0 }), g = n(b);
            g !== null && m(g);
          }
        }
        t.signal.aborted || (e && s && s.flush(), _.value = !1, (f = a.onFinish) == null || f.call(a, r.value));
      } catch (k) {
        k.name !== "AbortError" && ((y = a.onError) == null || y.call(a, k)), s == null || s.cancel(), _.value = !1;
      }
    },
    stop: () => {
      _.value && (t.abort(), _.value = !1, s == null || s.flush());
    },
    // 暴露解析器供测试/自定义使用
    parsers: {
      openaiParser: Ji,
      ernieParser: Ni,
      qwenParser: Oi,
      claudeParser: Ki,
      geminiParser: Bi,
      plainTextParser: Or
    }
  };
}
function Ui(a, _) {
  const r = [];
  let t = null;
  const s = () => {
    t = requestAnimationFrame(() => {
      if (t = null, r.length === 0) return;
      const n = r.splice(0, _).join("");
      a(n), r.length > 0 && s();
    });
  };
  return {
    push(n) {
      r.push(...n.split("")), t === null && s();
    },
    flush() {
      t !== null && (cancelAnimationFrame(t), t = null), r.length > 0 && a(r.splice(0).join(""));
    },
    cancel() {
      t !== null && (cancelAnimationFrame(t), t = null), r.length = 0;
    }
  };
}
function Xy(a = {}) {
  const {
    idGenerator: _ = () => Math.random().toString(36).substring(2, 9),
    parser: r = Or,
    typewriter: t = !0,
    charsPerFrame: s = 3,
    systemPrompt: n
  } = a, e = P(a.initialMessages ?? []), i = P(!1), o = R(() => i.value);
  let u = null;
  const l = () => {
    if (u && i.value) {
      u.abort(), i.value = !1;
      const k = e.value[e.value.length - 1];
      (k == null ? void 0 : k.role) === "assistant" && k.status === "generating" && (k.status = "stopped");
    }
  };
  return {
    /** 会话历史 */
    messages: e,
    /** 是否正在生成（等同 isSending，别名友好） */
    isGenerating: i,
    /** 同 isGenerating，语义别名 */
    isSending: o,
    /** 触发发送（自动处理流、打字机） */
    sendMessage: async (k) => {
      var F, b;
      if (!k.trim() || i.value || (e.value.push({
        id: _(),
        role: "user",
        content: k,
        createAt: Date.now(),
        status: "success"
      }), !a.request)) return;
      const w = _(), H = {
        id: w,
        role: "assistant",
        content: "",
        createAt: Date.now(),
        status: "loading"
      };
      e.value.push(H), i.value = !0, u = new AbortController();
      const j = [];
      n && j.push({
        id: "system",
        role: "system",
        content: n,
        createAt: 0,
        status: "success"
      }), j.push(...e.value.slice(0, -2));
      try {
        const g = await a.request(k, j, u.signal), T = e.value.find((C) => C.id === w);
        T.status = "generating";
        let E = null;
        t && typeof requestAnimationFrame < "u" && (E = Ui((C) => {
          T.content += C;
        }, s));
        const O = (C) => {
          C && (E ? E.push(C) : T.content += C);
        };
        if (typeof g == "object" && g !== null && Symbol.asyncIterator in g)
          for await (const C of g) {
            if (u.signal.aborted) break;
            const z = r(C);
            z && O(z);
          }
        else if (g instanceof Response && g.body) {
          const C = g.body.getReader(), z = new TextDecoder("utf-8");
          for (; ; ) {
            if (u.signal.aborted) {
              C.cancel();
              break;
            }
            const { done: A, value: B } = await C.read();
            if (A) break;
            const V = z.decode(B, { stream: !0 }), D = r(V);
            D && O(D);
          }
        } else typeof g == "string" && O(g);
        E && E.flush(), u.signal.aborted || (T.status = "success", (F = a.onFinish) == null || F.call(a, T));
      } catch (g) {
        if (g.name !== "AbortError") {
          const T = e.value.find((E) => E.id === w);
          T && (T.status = "error"), (b = a.onError) == null || b.call(a, g);
        }
      } finally {
        i.value && (i.value = !1);
      }
    },
    /** 停止/中断当前生成 */
    stop: l,
    /** 移除单条消息 */
    removeMessage: (k) => {
      const w = e.value.findIndex((H) => H.id === k);
      w !== -1 && e.value.splice(w, 1);
    },
    /** 修改单条消息内容 */
    updateMessage: (k, w) => {
      const H = e.value.find((j) => j.id === k);
      H && Object.assign(H, w);
    },
    /** 重置清空所有会话 */
    clear: () => {
      l(), e.value = [];
    }
  };
}
const Gi = {
  getItem: (a) => {
    try {
      return localStorage.getItem(a);
    } catch {
      return null;
    }
  },
  setItem: (a, _) => {
    try {
      localStorage.setItem(a, _);
    } catch {
    }
  },
  removeItem: (a) => {
    try {
      localStorage.removeItem(a);
    } catch {
    }
  }
};
class Zi {
  constructor(_ = "yh-ui-ai") {
    G(this, "db", null);
    G(this, "dbName");
    G(this, "storeName", "ai_conversations");
    G(this, "ready");
    this.dbName = _, this.ready = this.init();
  }
  init() {
    return new Promise((_, r) => {
      if (typeof indexedDB > "u") {
        _();
        return;
      }
      const t = indexedDB.open(this.dbName, 1);
      t.onupgradeneeded = () => {
        t.result.createObjectStore(this.storeName);
      }, t.onsuccess = () => {
        this.db = t.result, _();
      }, t.onerror = () => r(t.error);
    });
  }
  async getItem(_) {
    return await this.ready, this.db ? new Promise((r) => {
      const s = this.db.transaction(this.storeName, "readonly").objectStore(this.storeName).get(_);
      s.onsuccess = () => r(s.result ?? null), s.onerror = () => r(null);
    }) : null;
  }
  async setItem(_, r) {
    if (await this.ready, !!this.db)
      return new Promise((t) => {
        const s = this.db.transaction(this.storeName, "readwrite");
        s.objectStore(this.storeName).put(r, _), s.oncomplete = () => t();
      });
  }
  async removeItem(_) {
    if (await this.ready, !!this.db)
      return new Promise((r) => {
        const t = this.db.transaction(this.storeName, "readwrite");
        t.objectStore(this.storeName).delete(_), t.oncomplete = () => r();
      });
  }
}
function Vi(a) {
  const r = Date.now() - a, t = 864e5;
  return r < t ? "today" : r < 7 * t ? "last7Days" : r < 30 * t ? "last30Days" : "earlier";
}
const Xi = ["today", "last7Days", "last30Days", "earlier"];
function Qy(a = {}) {
  const {
    idGenerator: _ = () => Math.random().toString(36).substring(2, 9),
    storage: r = "localStorage",
    storageKey: t = "yh-ui-ai-conversations",
    pageSize: s = 20,
    remoteSync: n,
    autoSync: e = !1,
    syncInterval: i = 3e4
  } = a;
  let o = null;
  r === "localStorage" ? o = Gi : r === "indexedDB" ? o = new Zi() : r && typeof r == "object" && (o = r);
  const u = P([]), l = P(1), d = P(!1), m = (async () => {
    let L = [];
    if (o)
      try {
        const h = await o.getItem(t);
        h && (L = JSON.parse(h));
      } catch {
        L = [];
      }
    const Y = [...a.initialConversations ?? []];
    for (const h of L)
      Y.find((x) => x.id === h.id) || Y.push(h);
    u.value = Y.sort((h, x) => h.pinned !== x.pinned ? h.pinned ? -1 : 1 : x.updatedAt - h.updatedAt);
  })(), f = async () => {
    if (o)
      try {
        await o.setItem(t, JSON.stringify(u.value));
      } catch {
      }
  }, y = R(() => {
    const L = {
      today: [],
      last7Days: [],
      last30Days: [],
      earlier: []
    };
    for (const h of u.value) {
      if (h.pinned) continue;
      const x = Vi(h.updatedAt);
      L[x].push(h);
    }
    const v = [], Y = u.value.filter((h) => h.pinned);
    Y.length > 0 && v.push({ label: "pinned", items: Y });
    for (const h of Xi)
      L[h].length > 0 && v.push({ label: h, items: L[h] });
    return v;
  }), k = R(() => u.value.slice(0, l.value * s)), w = R(() => k.value.length < u.value.length), H = async () => {
    !w.value || d.value || (d.value = !0, await new Promise((L) => setTimeout(L, 300)), l.value++, d.value = !1);
  }, j = async (L, v) => {
    const Y = {
      id: _(),
      title: L,
      updatedAt: Date.now(),
      meta: v
    };
    return u.value.unshift(Y), await f(), Y;
  }, F = async (L) => {
    const v = u.value.findIndex((Y) => Y.id === L);
    v !== -1 && (u.value.splice(v, 1), await f());
  }, b = async (L, v) => {
    const Y = u.value.findIndex((h) => h.id === L);
    Y !== -1 && (u.value[Y] = {
      ...u.value[Y],
      ...v,
      updatedAt: Date.now()
    }, await f());
  }, g = async (L, v = !0) => {
    await b(L, { pinned: v }), u.value.sort((Y, h) => Y.pinned !== h.pinned ? Y.pinned ? -1 : 1 : h.updatedAt - Y.updatedAt), await f();
  }, T = async () => {
    u.value = [], o && await o.removeItem(t);
  }, E = P(!1), O = P(0), C = P(null), z = async () => {
    if (!(!n || E.value)) {
      E.value = !0, C.value = null;
      try {
        await n.batchUpdate(u.value), O.value = Date.now();
      } catch (L) {
        C.value = L instanceof Error ? L : new Error(String(L));
      } finally {
        E.value = !1;
      }
    }
  }, A = async () => {
    if (!(!n || E.value)) {
      E.value = !0, C.value = null;
      try {
        const L = await n.fetchConversations();
        for (const v of L)
          u.value.find((Y) => Y.id === v.id) || u.value.push(v);
        u.value.sort((v, Y) => v.pinned !== Y.pinned ? v.pinned ? -1 : 1 : Y.updatedAt - v.updatedAt), O.value = Date.now(), await f();
      } catch (L) {
        C.value = L instanceof Error ? L : new Error(String(L));
      } finally {
        E.value = !1;
      }
    }
  };
  let B = null;
  const V = () => {
    !n || B || i > 0 && (B = setInterval(z, i));
  }, D = () => {
    B && (clearInterval(B), B = null);
  };
  return n && e && V(), {
    /** 完整会话列表 */
    conversations: u,
    /** 按时间分组后的列表（置顶 / 今天 / 最近 7 天 / 更早） */
    groupedConversations: y,
    /** 分页后的列表 */
    pagedConversations: k,
    /** 是否还有更多数据 */
    hasMore: w,
    /** 加载更多 */
    loadMore: H,
    /** 加载更多状态 */
    isLoadingMore: d,
    /** 等待初始化完成（SSR 场景使用） */
    ready: m,
    /** 新建会话 */
    createConversation: j,
    /** 删除会话 */
    removeConversation: F,
    /** 更新会话属性 */
    updateConversation: b,
    /** 置顶/取消置顶 */
    pinConversation: g,
    /** 清空全部 */
    clear: T,
    /** 远程同步状态 */
    isSyncing: E,
    lastSyncTime: O,
    syncError: C,
    /** 远程同步方法 */
    syncToRemote: z,
    fetchFromRemote: A,
    startSync: V,
    stopSync: D
  };
}
function ev(a) {
  const _ = P(!1), r = P(""), t = P(null);
  return {
    loading: _,
    data: r,
    error: t,
    send: async (n, ...e) => {
      var i, o;
      _.value = !0, t.value = null;
      try {
        const u = await a.request(n, ...e);
        return r.value = u, (i = a.onSuccess) == null || i.call(a, u), u;
      } catch (u) {
        const l = u instanceof Error ? u : new Error(String(u));
        throw t.value = l, (o = a.onError) == null || o.call(a, l), l;
      } finally {
        _.value = !1;
      }
    }
  };
}
function tv(a = {}) {
  const {
    language: _ = "zh-CN",
    interimResults: r = !0,
    continuous: t = !1,
    vad: s = !0,
    vadThreshold: n = 2e3,
    volumeThreshold: e = 0.05,
    waveCount: i = 20,
    useSTT: o = !0
  } = a, u = P(!1), l = P(""), d = P(""), m = P(0), f = P(new Array(i).fill(5)), y = P(null), k = ne(null), w = ne(null), H = ne(null), j = ne(null), F = ne(null);
  let b = [], g = null, T = null;
  const E = typeof window < "u" ? window : null, O = (E == null ? void 0 : E.SpeechRecognition) || (E == null ? void 0 : E.webkitSpeechRecognition), C = !!O, z = (Y) => {
    b = [];
    const h = new MediaRecorder(Y);
    h.ondataavailable = (x) => {
      x.data.size > 0 && b.push(x.data);
    }, h.onstop = () => {
      var S;
      const x = b.length > 0 ? new Blob(b, { type: "audio/webm" }) : null;
      y.value = x, u.value || (S = a.onStop) == null || S.call(a, l.value, x);
    }, F.value = h;
  }, A = () => {
    if (!C || !o) return;
    const Y = new O();
    Y.lang = _, Y.interimResults = r, Y.continuous = t, Y.onresult = (h) => {
      var S, $;
      let x = "";
      for (let q = h.resultIndex; q < h.results.length; ++q)
        h.results[q].isFinal ? (l.value += h.results[q][0].transcript, (S = a.onResult) == null || S.call(a, l.value)) : x += h.results[q][0].transcript;
      d.value = x, ($ = a.onPartialResult) == null || $.call(a, x);
    }, Y.onerror = (h) => {
      var x;
      h.error !== "no-speech" && h.error !== "aborted" && ((x = a.onError) == null || x.call(a, h));
    }, k.value = Y;
  }, B = async (Y) => {
    var h;
    try {
      const x = window.AudioContext || window.webkitAudioContext;
      w.value = new x(), w.value.state === "suspended" && await w.value.resume(), H.value = w.value.createAnalyser(), H.value.fftSize = 256, w.value.createMediaStreamSource(Y).connect(H.value);
      const $ = H.value.frequencyBinCount, q = new Uint8Array($), I = () => {
        if (!u.value) {
          f.value = new Array(i).fill(5), m.value = 0;
          return;
        }
        g = requestAnimationFrame(I), H.value.getByteFrequencyData(q);
        let J = 0;
        for (let W = 0; W < $; W++) J += q[W];
        const K = J / $;
        m.value = Math.min(100, K / 128 * 100);
        const Q = Math.floor($ / i), Z = [];
        for (let W = 0; W < i; W++) {
          const X = q[W * Q];
          Z.push(6 + X / 255 * 34);
        }
        f.value = Z, s && (K / 255 < e ? T === null ? T = Date.now() : Date.now() - T > n && D() : T = null);
      };
      I();
    } catch (x) {
      (h = a.onError) == null || h.call(a, x);
    }
  }, V = async () => {
    var Y, h, x, S;
    if (!j.value)
      try {
        l.value = "", d.value = "", y.value = null, T = null, j.value = await navigator.mediaDevices.getUserMedia({ audio: !0 }), u.value = !0, z(j.value), A(), await B(j.value), (Y = F.value) == null || Y.start(1e3), (h = k.value) == null || h.start(), (x = a.onStart) == null || x.call(a);
      } catch ($) {
        u.value = !1, j.value && (j.value.getTracks().forEach((q) => q.stop()), j.value = null), console.error("[yh-ui/hooks] useAiVoice start failed:", $), (S = a.onError) == null || S.call(a, $);
      }
  }, D = () => {
    if (j.value) {
      if (u.value = !1, F.value && F.value.state !== "inactive")
        try {
          F.value.stop();
        } catch {
        }
      if (k.value)
        try {
          k.value.stop();
        } catch {
        }
      j.value && (j.value.getTracks().forEach((Y) => Y.stop()), j.value = null), v();
    }
  }, L = () => {
    if (!(!u.value && !j.value)) {
      if (u.value = !1, k.value)
        try {
          k.value.abort();
        } catch {
        }
      if (F.value && F.value.state !== "inactive")
        try {
          F.value.stop();
        } catch {
        }
      j.value && (j.value.getTracks().forEach((Y) => Y.stop()), j.value = null), v();
    }
  }, v = () => {
    g && (cancelAnimationFrame(g), g = null), w.value && w.value.state !== "closed" && (w.value.close().catch((Y) => {
    }), w.value = null), f.value = new Array(i).fill(5), m.value = 0;
  };
  return Kr(() => {
    u.value ? D() : v();
  }), {
    isRecording: u,
    transcript: l,
    interimTranscript: d,
    amplitudes: f,
    volume: m,
    audioBlob: y,
    start: V,
    stop: D,
    cancel: L,
    sttSupported: C
  };
}
class Qi {
  constructor(_ = "yh-ui-db", r = "yh-ui-store") {
    G(this, "dbName");
    G(this, "storeName");
    G(this, "db", null);
    this.dbName = _, this.storeName = r;
  }
  async getDB() {
    return this.db ? this.db : new Promise((_, r) => {
      const t = indexedDB.open(this.dbName, 1);
      t.onerror = () => r(t.error), t.onsuccess = () => {
        this.db = t.result, _(t.result);
      }, t.onupgradeneeded = (s) => {
        const n = s.target.result;
        n.objectStoreNames.contains(this.storeName) || n.createObjectStore(this.storeName, { keyPath: "key" });
      };
    });
  }
  async get(_) {
    const r = await this.getDB();
    return new Promise((t, s) => {
      const i = r.transaction(this.storeName, "readonly").objectStore(this.storeName).get(_);
      i.onerror = () => s(i.error), i.onsuccess = () => {
        var o;
        return t(((o = i.result) == null ? void 0 : o.value) ?? null);
      };
    });
  }
  async set(_, r) {
    const t = await this.getDB();
    return new Promise((s, n) => {
      const o = t.transaction(this.storeName, "readwrite").objectStore(this.storeName).put({ key: _, value: r });
      o.onerror = () => n(o.error), o.onsuccess = () => s();
    });
  }
  async remove(_) {
    const r = await this.getDB();
    return new Promise((t, s) => {
      const i = r.transaction(this.storeName, "readwrite").objectStore(this.storeName).delete(_);
      i.onerror = () => s(i.error), i.onsuccess = () => t();
    });
  }
  async clear() {
    const _ = await this.getDB();
    return new Promise((r, t) => {
      const e = _.transaction(this.storeName, "readwrite").objectStore(this.storeName).clear();
      e.onerror = () => t(e.error), e.onsuccess = () => r();
    });
  }
}
class rv {
  constructor(_, r = {}) {
    G(this, "baseURL");
    G(this, "headers");
    this.baseURL = _.replace(/\/$/, ""), this.headers = r;
  }
  async get(_) {
    const r = await fetch(`${this.baseURL}/storage/${_}`, {
      headers: this.headers
    });
    if (!r.ok) {
      if (r.status === 404) return null;
      throw new Error(`HTTP ${r.status}`);
    }
    return r.json();
  }
  async set(_, r) {
    const t = await fetch(`${this.baseURL}/storage/${_}`, {
      method: "PUT",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(r)
    });
    if (!t.ok)
      throw new Error(`HTTP ${t.status}`);
  }
  async remove(_) {
    const r = await fetch(`${this.baseURL}/storage/${_}`, {
      method: "DELETE",
      headers: this.headers
    });
    if (!r.ok && r.status !== 404)
      throw new Error(`HTTP ${r.status}`);
  }
  async clear() {
    const _ = await fetch(`${this.baseURL}/storage`, {
      method: "DELETE",
      headers: this.headers
    });
    if (!_.ok && _.status !== 404)
      throw new Error(`HTTP ${_.status}`);
  }
}
function nv(a = {}) {
  const {
    storage: _ = new Qi(),
    conversationKey: r = "ai-conversations",
    autoSave: t = !0
  } = a, s = P([]), n = P(null), e = P(!1), i = P(!1), o = P(null), u = async () => {
    e.value = !0, o.value = null;
    try {
      const b = await _.get(r);
      if (s.value = b || [], s.value.length > 0) {
        const g = s.value[s.value.length - 1];
        n.value = g.id;
      }
    } catch (b) {
      o.value = b instanceof Error ? b : new Error("Failed to load conversations");
    } finally {
      e.value = !1;
    }
  }, l = async () => {
    i.value = !0, o.value = null;
    try {
      await _.set(r, s.value);
    } catch (b) {
      o.value = b instanceof Error ? b : new Error("Failed to save conversations");
    } finally {
      i.value = !1;
    }
  }, d = (b = "New Conversation") => {
    const g = Date.now(), T = {
      id: `conv-${g}`,
      title: b,
      messages: [],
      createdAt: g,
      updatedAt: g
    };
    return s.value.push(T), n.value = T.id, t && l(), T;
  }, m = (b) => {
    const g = s.value.findIndex((T) => T.id === b);
    g !== -1 && (s.value.splice(g, 1), n.value === b && (n.value = s.value.length > 0 ? s.value[s.value.length - 1].id : null), t && l());
  }, f = () => s.value.find((b) => b.id === n.value), y = (b) => {
    const g = f();
    if (!g) return;
    const T = {
      ...b,
      id: `msg-${Date.now()}`,
      timestamp: Date.now()
    };
    return g.messages.push(T), g.updatedAt = Date.now(), t && l(), T;
  }, k = (b, g) => {
    const T = f();
    if (!T) return;
    const E = T.messages.findIndex((O) => O.id === b);
    E !== -1 && (T.messages[E] = {
      ...T.messages[E],
      ...g
    }, T.updatedAt = Date.now(), t && l());
  }, w = () => {
    const b = f();
    b && (b.messages = [], b.updatedAt = Date.now(), t && l());
  }, H = () => JSON.stringify(s.value, null, 2), j = async (b) => {
    try {
      const g = JSON.parse(b);
      if (!Array.isArray(g))
        throw new Error("Invalid format: expected array");
      return s.value = g, await l(), !0;
    } catch (g) {
      return o.value = g instanceof Error ? g : new Error("Failed to import conversations"), !1;
    }
  }, F = (b) => {
    s.value.some((g) => g.id === b) && (n.value = b);
  };
  return qs(() => {
    u();
  }), {
    conversations: s,
    currentConversationId: n,
    isLoading: e,
    isSaving: i,
    error: o,
    loadConversations: u,
    saveConversations: l,
    createConversation: d,
    deleteConversation: m,
    getCurrentConversation: f,
    addMessage: y,
    updateMessage: k,
    clearCurrentConversation: w,
    exportConversations: H,
    importConversations: j,
    setCurrentConversation: F
  };
}
var ue = { exports: {} }, eu = ue.exports, Xr;
function tu() {
  return Xr || (Xr = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(eu, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "af", weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"), months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"), weekStart: 1, weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"), monthsShort: "Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"), weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "oor %s", past: "%s gelede", s: "'n paar sekondes", m: "'n minuut", mm: "%d minute", h: "'n uur", hh: "%d ure", d: "'n dag", dd: "%d dae", M: "'n maand", MM: "%d maande", y: "'n jaar", yy: "%d jaar" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(ue)), ue.exports;
}
var Cs = tu();
const ru = /* @__PURE__ */ p(Cs), nu = /* @__PURE__ */ c({
  __proto__: null,
  default: ru
}, [Cs]);
var le = { exports: {} }, au = le.exports, Qr;
function su() {
  return Qr || (Qr = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(au, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "am", weekdays: "እሑድ_ሰኞ_ማክሰኞ_ረቡዕ_ሐሙስ_አርብ_ቅዳሜ".split("_"), weekdaysShort: "እሑድ_ሰኞ_ማክሰ_ረቡዕ_ሐሙስ_አርብ_ቅዳሜ".split("_"), weekdaysMin: "እሑ_ሰኞ_ማክ_ረቡ_ሐሙ_አር_ቅዳ".split("_"), months: "ጃንዋሪ_ፌብሯሪ_ማርች_ኤፕሪል_ሜይ_ጁን_ጁላይ_ኦገስት_ሴፕቴምበር_ኦክቶበር_ኖቬምበር_ዲሴምበር".split("_"), monthsShort: "ጃንዋ_ፌብሯ_ማርች_ኤፕሪ_ሜይ_ጁን_ጁላይ_ኦገስ_ሴፕቴ_ኦክቶ_ኖቬም_ዲሴም".split("_"), weekStart: 1, yearStart: 4, relativeTime: { future: "በ%s", past: "%s በፊት", s: "ጥቂት ሰከንዶች", m: "አንድ ደቂቃ", mm: "%d ደቂቃዎች", h: "አንድ ሰዓት", hh: "%d ሰዓታት", d: "አንድ ቀን", dd: "%d ቀናት", M: "አንድ ወር", MM: "%d ወራት", y: "አንድ ዓመት", yy: "%d ዓመታት" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "MMMM D ፣ YYYY", LLL: "MMMM D ፣ YYYY HH:mm", LLLL: "dddd ፣ MMMM D ፣ YYYY HH:mm" }, ordinal: function(e) {
        return e + "ኛ";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(le)), le.exports;
}
var Rs = su();
const ou = /* @__PURE__ */ p(Rs), _u = /* @__PURE__ */ c({
  __proto__: null,
  default: ou
}, [Rs]);
var de = { exports: {} }, iu = de.exports, en;
function uu() {
  return en || (en = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(iu, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ar-dz", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdaysShort: "احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"), monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdaysMin: "أح_إث_ثلا_أر_خم_جم_سب".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiem: function(e) {
        return e > 12 ? "م" : "ص";
      }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(de)), de.exports;
}
var Fs = uu();
const lu = /* @__PURE__ */ p(Fs), du = /* @__PURE__ */ c({
  __proto__: null,
  default: lu
}, [Fs]);
var me = { exports: {} }, mu = me.exports, tn;
function cu() {
  return tn || (tn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(mu, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ar-iq", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), months: "كانون الثاني_شباط_آذار_نيسان_أيار_حزيران_تموز_آب_أيلول_تشرين الأول_ تشرين الثاني_كانون الأول".split("_"), weekStart: 1, weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), monthsShort: "كانون الثاني_شباط_آذار_نيسان_أيار_حزيران_تموز_آب_أيلول_تشرين الأول_ تشرين الثاني_كانون الأول".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiem: function(e) {
        return e > 12 ? "م" : "ص";
      }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(me)), me.exports;
}
var Is = cu();
const pu = /* @__PURE__ */ p(Is), Mu = /* @__PURE__ */ c({
  __proto__: null,
  default: pu
}, [Is]);
var ce = { exports: {} }, fu = ce.exports, rn;
function hu() {
  return rn || (rn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(fu, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ar-kw", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), months: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), weekdaysShort: "احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"), monthsShort: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiem: function(e) {
        return e > 12 ? "م" : "ص";
      }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(ce)), ce.exports;
}
var Js = hu();
const Yu = /* @__PURE__ */ p(Js), yu = /* @__PURE__ */ c({
  __proto__: null,
  default: Yu
}, [Js]);
var pe = { exports: {} }, vu = pe.exports, nn;
function Lu() {
  return nn || (nn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(vu, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ar-ly", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), months: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekStart: 6, weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), monthsShort: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), ordinal: function(e) {
        return e;
      }, meridiem: function(e) {
        return e > 12 ? "م" : "ص";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/‏M/‏YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(pe)), pe.exports;
}
var Ns = Lu();
const ku = /* @__PURE__ */ p(Ns), xu = /* @__PURE__ */ c({
  __proto__: null,
  default: ku
}, [Ns]);
var Me = { exports: {} }, Du = Me.exports, an;
function gu() {
  return an || (an = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Du, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ar-ma", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), months: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), weekStart: 6, weekdaysShort: "احد_إثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"), monthsShort: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiem: function(e) {
        return e > 12 ? "م" : "ص";
      }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Me)), Me.exports;
}
var Os = gu();
const Su = /* @__PURE__ */ p(Os), wu = /* @__PURE__ */ c({
  __proto__: null,
  default: Su
}, [Os]);
var fe = { exports: {} }, bu = fe.exports, sn;
function Hu() {
  return sn || (sn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(bu, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ar-sa", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), months: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), monthsShort: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiem: function(e) {
        return e > 12 ? "م" : "ص";
      }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(fe)), fe.exports;
}
var Ks = Hu();
const ju = /* @__PURE__ */ p(Ks), Tu = /* @__PURE__ */ c({
  __proto__: null,
  default: ju
}, [Ks]);
var he = { exports: {} }, $u = he.exports, on;
function Au() {
  return on || (on = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })($u, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ar-tn", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekStart: 1, weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiem: function(e) {
        return e > 12 ? "م" : "ص";
      }, relativeTime: { future: "في %s", past: "منذ %s", s: "ثوان", m: "دقيقة", mm: "%d دقائق", h: "ساعة", hh: "%d ساعات", d: "يوم", dd: "%d أيام", M: "شهر", MM: "%d أشهر", y: "سنة", yy: "%d سنوات" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(he)), he.exports;
}
var Bs = Au();
const qu = /* @__PURE__ */ p(Bs), Pu = /* @__PURE__ */ c({
  __proto__: null,
  default: qu
}, [Bs]);
var Ye = { exports: {} }, Eu = Ye.exports, _n;
function zu() {
  return _n || (_n = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Eu, (function(r) {
      function t(f) {
        return f && typeof f == "object" && "default" in f ? f : { default: f };
      }
      var s = t(r), n = "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), e = { 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", 0: "٠" }, i = { "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "٠": "0" }, o = /[١٢٣٤٥٦٧٨٩٠]/g, u = /،/g, l = /\d/g, d = /,/g, m = { name: "ar", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), months: n, monthsShort: n, weekStart: 6, meridiem: function(f) {
        return f > 12 ? "م" : "ص";
      }, relativeTime: { future: "بعد %s", past: "منذ %s", s: "ثانية واحدة", m: "دقيقة واحدة", mm: "%d دقائق", h: "ساعة واحدة", hh: "%d ساعات", d: "يوم واحد", dd: "%d أيام", M: "شهر واحد", MM: "%d أشهر", y: "عام واحد", yy: "%d أعوام" }, preparse: function(f) {
        return f.replace(o, (function(y) {
          return i[y];
        })).replace(u, ",");
      }, postformat: function(f) {
        return f.replace(l, (function(y) {
          return e[y];
        })).replace(d, "،");
      }, ordinal: function(f) {
        return f;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/‏M/‏YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" } };
      return s.default.locale(m, null, !0), m;
    }));
  })(Ye)), Ye.exports;
}
var Ws = zu();
const Cu = /* @__PURE__ */ p(Ws), Ru = /* @__PURE__ */ c({
  __proto__: null,
  default: Cu
}, [Ws]);
var ye = { exports: {} }, Fu = ye.exports, un;
function Iu() {
  return un || (un = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Fu, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "az", weekdays: "Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"), weekdaysShort: "Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"), weekdaysMin: "Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"), months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"), monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"), weekStart: 1, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY г.", LLL: "D MMMM YYYY г., H:mm", LLLL: "dddd, D MMMM YYYY г., H:mm" }, relativeTime: { future: "%s sonra", past: "%s əvvəl", s: "bir neçə saniyə", m: "bir dəqiqə", mm: "%d dəqiqə", h: "bir saat", hh: "%d saat", d: "bir gün", dd: "%d gün", M: "bir ay", MM: "%d ay", y: "bir il", yy: "%d il" }, ordinal: function(e) {
        return e;
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(ye)), ye.exports;
}
var Us = Iu();
const Ju = /* @__PURE__ */ p(Us), Nu = /* @__PURE__ */ c({
  __proto__: null,
  default: Ju
}, [Us]);
var ve = { exports: {} }, Ou = ve.exports, ln;
function Ku() {
  return ln || (ln = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Ou, (function(r) {
      function t(y) {
        return y && typeof y == "object" && "default" in y ? y : { default: y };
      }
      var s = t(r), n = "студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_"), e = "студзень_лютый_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_"), i = "студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж.".split("_"), o = "студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split("_"), u = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
      function l(y, k, w) {
        var H, j;
        return w === "m" ? k ? "хвіліна" : "хвіліну" : w === "h" ? k ? "гадзіна" : "гадзіну" : y + " " + (H = +y, j = { ss: k ? "секунда_секунды_секунд" : "секунду_секунды_секунд", mm: k ? "хвіліна_хвіліны_хвілін" : "хвіліну_хвіліны_хвілін", hh: k ? "гадзіна_гадзіны_гадзін" : "гадзіну_гадзіны_гадзін", dd: "дзень_дні_дзён", MM: "месяц_месяцы_месяцаў", yy: "год_гады_гадоў" }[w].split("_"), H % 10 == 1 && H % 100 != 11 ? j[0] : H % 10 >= 2 && H % 10 <= 4 && (H % 100 < 10 || H % 100 >= 20) ? j[1] : j[2]);
      }
      var d = function(y, k) {
        return u.test(k) ? n[y.month()] : e[y.month()];
      };
      d.s = e, d.f = n;
      var m = function(y, k) {
        return u.test(k) ? i[y.month()] : o[y.month()];
      };
      m.s = o, m.f = i;
      var f = { name: "be", weekdays: "нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split("_"), weekdaysShort: "няд_пнд_аўт_сер_чцв_пят_суб".split("_"), weekdaysMin: "нд_пн_аў_ср_чц_пт_сб".split("_"), months: d, monthsShort: m, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY г.", LLL: "D MMMM YYYY г., HH:mm", LLLL: "dddd, D MMMM YYYY г., HH:mm" }, relativeTime: { future: "праз %s", past: "%s таму", s: "некалькі секунд", m: l, mm: l, h: l, hh: l, d: "дзень", dd: l, M: "месяц", MM: l, y: "год", yy: l }, ordinal: function(y) {
        return y;
      }, meridiem: function(y) {
        return y < 4 ? "ночы" : y < 12 ? "раніцы" : y < 17 ? "дня" : "вечара";
      } };
      return s.default.locale(f, null, !0), f;
    }));
  })(ve)), ve.exports;
}
var Gs = Ku();
const Bu = /* @__PURE__ */ p(Gs), Wu = /* @__PURE__ */ c({
  __proto__: null,
  default: Bu
}, [Gs]);
var Le = { exports: {} }, Uu = Le.exports, dn;
function Gu() {
  return dn || (dn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Uu, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "bg", weekdays: "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"), weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"), weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"), months: "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"), monthsShort: "яну_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"), weekStart: 1, ordinal: function(e) {
        var i = e % 100;
        if (i > 10 && i < 20) return e + "-ти";
        var o = e % 10;
        return o === 1 ? e + "-ви" : o === 2 ? e + "-ри" : o === 7 || o === 8 ? e + "-ми" : e + "-ти";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "D.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" }, relativeTime: { future: "след %s", past: "преди %s", s: "няколко секунди", m: "минута", mm: "%d минути", h: "час", hh: "%d часа", d: "ден", dd: "%d дена", M: "месец", MM: "%d месеца", y: "година", yy: "%d години" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Le)), Le.exports;
}
var Zs = Gu();
const Zu = /* @__PURE__ */ p(Zs), Vu = /* @__PURE__ */ c({
  __proto__: null,
  default: Zu
}, [Zs]);
var ke = { exports: {} }, Xu = ke.exports, mn;
function Qu() {
  return mn || (mn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Xu, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "bi", weekdays: "Sande_Mande_Tusde_Wenesde_Tosde_Fraede_Sarade".split("_"), months: "Januari_Februari_Maj_Eprel_Mei_Jun_Julae_Okis_Septemba_Oktoba_Novemba_Disemba".split("_"), weekStart: 1, weekdaysShort: "San_Man_Tus_Wen_Tos_Frae_Sar".split("_"), monthsShort: "Jan_Feb_Maj_Epr_Mai_Jun_Jul_Oki_Sep_Okt_Nov_Dis".split("_"), weekdaysMin: "San_Ma_Tu_We_To_Fr_Sar".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, relativeTime: { future: "lo %s", past: "%s bifo", s: "sam seken", m: "wan minit", mm: "%d minit", h: "wan haoa", hh: "%d haoa", d: "wan dei", dd: "%d dei", M: "wan manis", MM: "%d manis", y: "wan yia", yy: "%d yia" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(ke)), ke.exports;
}
var Vs = Qu();
const el = /* @__PURE__ */ p(Vs), tl = /* @__PURE__ */ c({
  __proto__: null,
  default: el
}, [Vs]);
var xe = { exports: {} }, rl = xe.exports, cn;
function nl() {
  return cn || (cn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(rl, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "bm", weekdays: "Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri".split("_"), months: "Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_Mɛkalo_Zuwɛnkalo_Zuluyekalo_Utikalo_Sɛtanburukalo_ɔkutɔburukalo_Nowanburukalo_Desanburukalo".split("_"), weekStart: 1, weekdaysShort: "Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib".split("_"), monthsShort: "Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des".split("_"), weekdaysMin: "Ka_Nt_Ta_Ar_Al_Ju_Si".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "MMMM [tile] D [san] YYYY", LLL: "MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm", LLLL: "dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm" }, relativeTime: { future: "%s kɔnɔ", past: "a bɛ %s bɔ", s: "sanga dama dama", m: "miniti kelen", mm: "miniti %d", h: "lɛrɛ kelen", hh: "lɛrɛ %d", d: "tile kelen", dd: "tile %d", M: "kalo kelen", MM: "kalo %d", y: "san kelen", yy: "san %d" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(xe)), xe.exports;
}
var Xs = nl();
const al = /* @__PURE__ */ p(Xs), sl = /* @__PURE__ */ c({
  __proto__: null,
  default: al
}, [Xs]);
var De = { exports: {} }, ol = De.exports, pn;
function _l() {
  return pn || (pn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(ol, (function(r) {
      function t(o) {
        return o && typeof o == "object" && "default" in o ? o : { default: o };
      }
      var s = t(r), n = { 1: "১", 2: "২", 3: "৩", 4: "৪", 5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯", 0: "০" }, e = { "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9", "০": "0" }, i = { name: "bn-bd", weekdays: "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"), months: "জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"), weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"), monthsShort: "জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে".split("_"), weekdaysMin: "রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি".split("_"), weekStart: 0, preparse: function(o) {
        return o.replace(/[১২৩৪৫৬৭৮৯০]/g, (function(u) {
          return e[u];
        }));
      }, postformat: function(o) {
        return o.replace(/\d/g, (function(u) {
          return n[u];
        }));
      }, ordinal: function(o) {
        var u = ["ই", "লা", "রা", "ঠা", "শে"], l = o % 100;
        return "[" + o + (u[(l - 20) % 10] || u[l] || u[0]) + "]";
      }, formats: { LT: "A h:mm সময়", LTS: "A h:mm:ss সময়", L: "DD/MM/YYYY খ্রিস্টাব্দ", LL: "D MMMM YYYY খ্রিস্টাব্দ", LLL: "D MMMM YYYY খ্রিস্টাব্দ, A h:mm সময়", LLLL: "dddd, D MMMM YYYY খ্রিস্টাব্দ, A h:mm সময়" }, meridiem: function(o) {
        return o < 4 ? "রাত" : o < 6 ? "ভোর" : o < 12 ? "সকাল" : o < 15 ? "দুপুর" : o < 18 ? "বিকাল" : o < 20 ? "সন্ধ্যা" : "রাত";
      }, relativeTime: { future: "%s পরে", past: "%s আগে", s: "কয়েক সেকেন্ড", m: "এক মিনিট", mm: "%d মিনিট", h: "এক ঘন্টা", hh: "%d ঘন্টা", d: "এক দিন", dd: "%d দিন", M: "এক মাস", MM: "%d মাস", y: "এক বছর", yy: "%d বছর" } };
      return s.default.locale(i, null, !0), i;
    }));
  })(De)), De.exports;
}
var Qs = _l();
const il = /* @__PURE__ */ p(Qs), ul = /* @__PURE__ */ c({
  __proto__: null,
  default: il
}, [Qs]);
var ge = { exports: {} }, ll = ge.exports, Mn;
function dl() {
  return Mn || (Mn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(ll, (function(r) {
      function t(o) {
        return o && typeof o == "object" && "default" in o ? o : { default: o };
      }
      var s = t(r), n = { 1: "১", 2: "২", 3: "৩", 4: "৪", 5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯", 0: "০" }, e = { "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9", "০": "0" }, i = { name: "bn", weekdays: "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"), months: "জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"), weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"), monthsShort: "জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে".split("_"), weekdaysMin: "রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি".split("_"), preparse: function(o) {
        return o.replace(/[১২৩৪৫৬৭৮৯০]/g, (function(u) {
          return e[u];
        }));
      }, postformat: function(o) {
        return o.replace(/\d/g, (function(u) {
          return n[u];
        }));
      }, ordinal: function(o) {
        return o;
      }, formats: { LT: "A h:mm সময়", LTS: "A h:mm:ss সময়", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm সময়", LLLL: "dddd, D MMMM YYYY, A h:mm সময়" }, relativeTime: { future: "%s পরে", past: "%s আগে", s: "কয়েক সেকেন্ড", m: "এক মিনিট", mm: "%d মিনিট", h: "এক ঘন্টা", hh: "%d ঘন্টা", d: "এক দিন", dd: "%d দিন", M: "এক মাস", MM: "%d মাস", y: "এক বছর", yy: "%d বছর" } };
      return s.default.locale(i, null, !0), i;
    }));
  })(ge)), ge.exports;
}
var eo = dl();
const ml = /* @__PURE__ */ p(eo), cl = /* @__PURE__ */ c({
  __proto__: null,
  default: ml
}, [eo]);
var Se = { exports: {} }, pl = Se.exports, fn;
function Ml() {
  return fn || (fn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(pl, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "bo", weekdays: "གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"), weekdaysShort: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"), weekdaysMin: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"), months: "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"), monthsShort: "ཟླ་དང་པོ_ཟླ་གཉིས་པ_ཟླ་གསུམ་པ_ཟླ་བཞི་པ_ཟླ་ལྔ་པ_ཟླ་དྲུག་པ_ཟླ་བདུན་པ_ཟླ་བརྒྱད་པ_ཟླ་དགུ་པ_ཟླ་བཅུ་པ_ཟླ་བཅུ་གཅིག་པ_ཟླ་བཅུ་གཉིས་པ".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, relativeTime: { future: "%s ལ་", past: "%s སྔོན་ལ་", s: "ཏོག་ཙམ་", m: "སྐར་མ་གཅིག་", mm: "སྐར་མ་ %d", h: "ཆུ་ཚོད་གཅིག་", hh: "ཆུ་ཚོད་ %d", d: "ཉིན་གཅིག་", dd: "ཉིན་ %d", M: "ཟླ་བ་གཅིག་", MM: "ཟླ་བ་ %d", y: "ལོ་གཅིག་", yy: "ལོ་ %d" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Se)), Se.exports;
}
var to = Ml();
const fl = /* @__PURE__ */ p(to), hl = /* @__PURE__ */ c({
  __proto__: null,
  default: fl
}, [to]);
var we = { exports: {} }, Yl = we.exports, hn;
function yl() {
  return hn || (hn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Yl, (function(r) {
      function t(o) {
        return o && typeof o == "object" && "default" in o ? o : { default: o };
      }
      var s = t(r);
      function n(o) {
        return o > 9 ? n(o % 10) : o;
      }
      function e(o, u, l) {
        return o + " " + (function(d, m) {
          return m === 2 ? (function(f) {
            return { m: "v", b: "v", d: "z" }[f.charAt(0)] + f.substring(1);
          })(d) : d;
        })({ mm: "munutenn", MM: "miz", dd: "devezh" }[l], o);
      }
      var i = { name: "br", weekdays: "Sul_Lun_Meurzh_Mercʼher_Yaou_Gwener_Sadorn".split("_"), months: "Genver_Cʼhwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"), weekStart: 1, weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"), monthsShort: "Gen_Cʼhwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"), weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"), ordinal: function(o) {
        return o;
      }, formats: { LT: "h[e]mm A", LTS: "h[e]mm:ss A", L: "DD/MM/YYYY", LL: "D [a viz] MMMM YYYY", LLL: "D [a viz] MMMM YYYY h[e]mm A", LLLL: "dddd, D [a viz] MMMM YYYY h[e]mm A" }, relativeTime: { future: "a-benn %s", past: "%s ʼzo", s: "un nebeud segondennoù", m: "ur vunutenn", mm: e, h: "un eur", hh: "%d eur", d: "un devezh", dd: e, M: "ur miz", MM: e, y: "ur bloaz", yy: function(o) {
        switch (n(o)) {
          case 1:
          case 3:
          case 4:
          case 5:
          case 9:
            return o + " bloaz";
          default:
            return o + " vloaz";
        }
      } }, meridiem: function(o) {
        return o < 12 ? "a.m." : "g.m.";
      } };
      return s.default.locale(i, null, !0), i;
    }));
  })(we)), we.exports;
}
var ro = yl();
const vl = /* @__PURE__ */ p(ro), Ll = /* @__PURE__ */ c({
  __proto__: null,
  default: vl
}, [ro]);
var be = { exports: {} }, kl = be.exports, Yn;
function xl() {
  return Yn || (Yn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(kl, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "bs", weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"), months: "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"), weekStart: 1, weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"), monthsShort: "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"), weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(be)), be.exports;
}
var no = xl();
const Dl = /* @__PURE__ */ p(no), gl = /* @__PURE__ */ c({
  __proto__: null,
  default: Dl
}, [no]);
var He = { exports: {} }, Sl = He.exports, yn;
function wl() {
  return yn || (yn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Sl, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ca", weekdays: "Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte".split("_"), weekdaysShort: "Dg._Dl._Dt._Dc._Dj._Dv._Ds.".split("_"), weekdaysMin: "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"), months: "Gener_Febrer_Març_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre".split("_"), monthsShort: "Gen._Febr._Març_Abr._Maig_Juny_Jul._Ag._Set._Oct._Nov._Des.".split("_"), weekStart: 1, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM [de] YYYY", LLL: "D MMMM [de] YYYY [a les] H:mm", LLLL: "dddd D MMMM [de] YYYY [a les] H:mm", ll: "D MMM YYYY", lll: "D MMM YYYY, H:mm", llll: "ddd D MMM YYYY, H:mm" }, relativeTime: { future: "d'aquí %s", past: "fa %s", s: "uns segons", m: "un minut", mm: "%d minuts", h: "una hora", hh: "%d hores", d: "un dia", dd: "%d dies", M: "un mes", MM: "%d mesos", y: "un any", yy: "%d anys" }, ordinal: function(e) {
        return "" + e + (e === 1 || e === 3 ? "r" : e === 2 ? "n" : e === 4 ? "t" : "è");
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(He)), He.exports;
}
var ao = wl();
const bl = /* @__PURE__ */ p(ao), Hl = /* @__PURE__ */ c({
  __proto__: null,
  default: bl
}, [ao]);
var je = { exports: {} }, jl = je.exports, vn;
function Tl() {
  return vn || (vn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(jl, (function(r) {
      function t(o) {
        return o && typeof o == "object" && "default" in o ? o : { default: o };
      }
      var s = t(r);
      function n(o) {
        return o > 1 && o < 5 && ~~(o / 10) != 1;
      }
      function e(o, u, l, d) {
        var m = o + " ";
        switch (l) {
          case "s":
            return u || d ? "pár sekund" : "pár sekundami";
          case "m":
            return u ? "minuta" : d ? "minutu" : "minutou";
          case "mm":
            return u || d ? m + (n(o) ? "minuty" : "minut") : m + "minutami";
          case "h":
            return u ? "hodina" : d ? "hodinu" : "hodinou";
          case "hh":
            return u || d ? m + (n(o) ? "hodiny" : "hodin") : m + "hodinami";
          case "d":
            return u || d ? "den" : "dnem";
          case "dd":
            return u || d ? m + (n(o) ? "dny" : "dní") : m + "dny";
          case "M":
            return u || d ? "měsíc" : "měsícem";
          case "MM":
            return u || d ? m + (n(o) ? "měsíce" : "měsíců") : m + "měsíci";
          case "y":
            return u || d ? "rok" : "rokem";
          case "yy":
            return u || d ? m + (n(o) ? "roky" : "let") : m + "lety";
        }
      }
      var i = { name: "cs", weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"), weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"), weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"), months: "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"), monthsShort: "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"), weekStart: 1, yearStart: 4, ordinal: function(o) {
        return o + ".";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd D. MMMM YYYY H:mm", l: "D. M. YYYY" }, relativeTime: { future: "za %s", past: "před %s", s: e, m: e, mm: e, h: e, hh: e, d: e, dd: e, M: e, MM: e, y: e, yy: e } };
      return s.default.locale(i, null, !0), i;
    }));
  })(je)), je.exports;
}
var so = Tl();
const $l = /* @__PURE__ */ p(so), Al = /* @__PURE__ */ c({
  __proto__: null,
  default: $l
}, [so]);
var Te = { exports: {} }, ql = Te.exports, Ln;
function Pl() {
  return Ln || (Ln = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(ql, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "cv", weekdays: "вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"), months: "кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"), weekStart: 1, weekdaysShort: "выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"), monthsShort: "кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"), weekdaysMin: "вр_тн_ыт_юн_кҫ_эр_шм".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]", LLL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm", LLLL: "dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Te)), Te.exports;
}
var oo = Pl();
const El = /* @__PURE__ */ p(oo), zl = /* @__PURE__ */ c({
  __proto__: null,
  default: El
}, [oo]);
var $e = { exports: {} }, Cl = $e.exports, kn;
function Rl() {
  return kn || (kn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Cl, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "cy", weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"), months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"), weekStart: 1, weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"), monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"), weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "mewn %s", past: "%s yn ôl", s: "ychydig eiliadau", m: "munud", mm: "%d munud", h: "awr", hh: "%d awr", d: "diwrnod", dd: "%d diwrnod", M: "mis", MM: "%d mis", y: "blwyddyn", yy: "%d flynedd" } };
      return s.default.locale(n, null, !0), n;
    }));
  })($e)), $e.exports;
}
var _o = Rl();
const Fl = /* @__PURE__ */ p(_o), Il = /* @__PURE__ */ c({
  __proto__: null,
  default: Fl
}, [_o]);
var Ae = { exports: {} }, Jl = Ae.exports, xn;
function Nl() {
  return xn || (xn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Jl, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "da", weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"), weekdaysShort: "søn._man._tirs._ons._tors._fre._lør.".split("_"), weekdaysMin: "sø._ma._ti._on._to._fr._lø.".split("_"), months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"), monthsShort: "jan._feb._mar._apr._maj_juni_juli_aug._sept._okt._nov._dec.".split("_"), weekStart: 1, yearStart: 4, ordinal: function(e) {
        return e + ".";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm" }, relativeTime: { future: "om %s", past: "%s siden", s: "få sekunder", m: "et minut", mm: "%d minutter", h: "en time", hh: "%d timer", d: "en dag", dd: "%d dage", M: "en måned", MM: "%d måneder", y: "et år", yy: "%d år" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ae)), Ae.exports;
}
var io = Nl();
const Ol = /* @__PURE__ */ p(io), Kl = /* @__PURE__ */ c({
  __proto__: null,
  default: Ol
}, [io]);
var qe = { exports: {} }, Bl = qe.exports, Dn;
function Wl() {
  return Dn || (Dn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Bl, (function(r) {
      function t(o) {
        return o && typeof o == "object" && "default" in o ? o : { default: o };
      }
      var s = t(r), n = { s: "ein paar Sekunden", m: ["eine Minute", "einer Minute"], mm: "%d Minuten", h: ["eine Stunde", "einer Stunde"], hh: "%d Stunden", d: ["ein Tag", "einem Tag"], dd: ["%d Tage", "%d Tagen"], M: ["ein Monat", "einem Monat"], MM: ["%d Monate", "%d Monaten"], y: ["ein Jahr", "einem Jahr"], yy: ["%d Jahre", "%d Jahren"] };
      function e(o, u, l) {
        var d = n[l];
        return Array.isArray(d) && (d = d[u ? 0 : 1]), d.replace("%d", o);
      }
      var i = { name: "de-at", weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), months: "Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jän._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), ordinal: function(o) {
        return o + ".";
      }, weekStart: 1, formats: { LTS: "HH:mm:ss", LT: "HH:mm", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, relativeTime: { future: "in %s", past: "vor %s", s: e, m: e, mm: e, h: e, hh: e, d: e, dd: e, M: e, MM: e, y: e, yy: e } };
      return s.default.locale(i, null, !0), i;
    }));
  })(qe)), qe.exports;
}
var uo = Wl();
const Ul = /* @__PURE__ */ p(uo), Gl = /* @__PURE__ */ c({
  __proto__: null,
  default: Ul
}, [uo]);
var Pe = { exports: {} }, Zl = Pe.exports, gn;
function Vl() {
  return gn || (gn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Zl, (function(r) {
      function t(o) {
        return o && typeof o == "object" && "default" in o ? o : { default: o };
      }
      var s = t(r), n = { s: "ein paar Sekunden", m: ["eine Minute", "einer Minute"], mm: "%d Minuten", h: ["eine Stunde", "einer Stunde"], hh: "%d Stunden", d: ["ein Tag", "einem Tag"], dd: ["%d Tage", "%d Tagen"], M: ["ein Monat", "einem Monat"], MM: ["%d Monate", "%d Monaten"], y: ["ein Jahr", "einem Jahr"], yy: ["%d Jahre", "%d Jahren"] };
      function e(o, u, l) {
        var d = n[l];
        return Array.isArray(d) && (d = d[u ? 0 : 1]), d.replace("%d", o);
      }
      var i = { name: "de-ch", weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"), ordinal: function(o) {
        return o + ".";
      }, weekStart: 1, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, relativeTime: { future: "in %s", past: "vor %s", s: e, m: e, mm: e, h: e, hh: e, d: e, dd: e, M: e, MM: e, y: e, yy: e } };
      return s.default.locale(i, null, !0), i;
    }));
  })(Pe)), Pe.exports;
}
var lo = Vl();
const Xl = /* @__PURE__ */ p(lo), Ql = /* @__PURE__ */ c({
  __proto__: null,
  default: Xl
}, [lo]);
var Ee = { exports: {} }, ed = Ee.exports, Sn;
function td() {
  return Sn || (Sn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(ed, (function(r) {
      function t(o) {
        return o && typeof o == "object" && "default" in o ? o : { default: o };
      }
      var s = t(r), n = { s: "ein paar Sekunden", m: ["eine Minute", "einer Minute"], mm: "%d Minuten", h: ["eine Stunde", "einer Stunde"], hh: "%d Stunden", d: ["ein Tag", "einem Tag"], dd: ["%d Tage", "%d Tagen"], M: ["ein Monat", "einem Monat"], MM: ["%d Monate", "%d Monaten"], y: ["ein Jahr", "einem Jahr"], yy: ["%d Jahre", "%d Jahren"] };
      function e(o, u, l) {
        var d = n[l];
        return Array.isArray(d) && (d = d[u ? 0 : 1]), d.replace("%d", o);
      }
      var i = { name: "de", weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.".split("_"), ordinal: function(o) {
        return o + ".";
      }, weekStart: 1, yearStart: 4, formats: { LTS: "HH:mm:ss", LT: "HH:mm", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, relativeTime: { future: "in %s", past: "vor %s", s: e, m: e, mm: e, h: e, hh: e, d: e, dd: e, M: e, MM: e, y: e, yy: e } };
      return s.default.locale(i, null, !0), i;
    }));
  })(Ee)), Ee.exports;
}
var mo = td();
const rd = /* @__PURE__ */ p(mo), nd = /* @__PURE__ */ c({
  __proto__: null,
  default: rd
}, [mo]);
var ze = { exports: {} }, ad = ze.exports, wn;
function sd() {
  return wn || (wn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(ad, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "dv", weekdays: "އާދިއްތަ_ހޯމަ_އަންގާރަ_ބުދަ_ބުރާސްފަތި_ހުކުރު_ހޮނިހިރު".split("_"), months: "ޖެނުއަރީ_ފެބްރުއަރީ_މާރިޗު_އޭޕްރީލު_މޭ_ޖޫން_ޖުލައި_އޯގަސްޓު_ސެޕްޓެމްބަރު_އޮކްޓޯބަރު_ނޮވެމްބަރު_ޑިސެމްބަރު".split("_"), weekStart: 7, weekdaysShort: "އާދިއްތަ_ހޯމަ_އަންގާރަ_ބުދަ_ބުރާސްފަތި_ހުކުރު_ހޮނިހިރު".split("_"), monthsShort: "ޖެނުއަރީ_ފެބްރުއަރީ_މާރިޗު_އޭޕްރީލު_މޭ_ޖޫން_ޖުލައި_އޯގަސްޓު_ސެޕްޓެމްބަރު_އޮކްޓޯބަރު_ނޮވެމްބަރު_ޑިސެމްބަރު".split("_"), weekdaysMin: "އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/M/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "ތެރޭގައި %s", past: "ކުރިން %s", s: "ސިކުންތުކޮޅެއް", m: "މިނިޓެއް", mm: "މިނިޓު %d", h: "ގަޑިއިރެއް", hh: "ގަޑިއިރު %d", d: "ދުވަހެއް", dd: "ދުވަސް %d", M: "މަހެއް", MM: "މަސް %d", y: "އަހަރެއް", yy: "އަހަރު %d" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(ze)), ze.exports;
}
var co = sd();
const od = /* @__PURE__ */ p(co), _d = /* @__PURE__ */ c({
  __proto__: null,
  default: od
}, [co]);
var Ce = { exports: {} }, id = Ce.exports, bn;
function ud() {
  return bn || (bn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(id, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "el", weekdays: "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"), weekdaysShort: "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"), weekdaysMin: "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"), months: "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"), monthsShort: "Ιαν_Φεβ_Μαρ_Απρ_Μαι_Ιουν_Ιουλ_Αυγ_Σεπτ_Οκτ_Νοε_Δεκ".split("_"), ordinal: function(e) {
        return e;
      }, weekStart: 1, relativeTime: { future: "σε %s", past: "πριν %s", s: "μερικά δευτερόλεπτα", m: "ένα λεπτό", mm: "%d λεπτά", h: "μία ώρα", hh: "%d ώρες", d: "μία μέρα", dd: "%d μέρες", M: "ένα μήνα", MM: "%d μήνες", y: "ένα χρόνο", yy: "%d χρόνια" }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ce)), Ce.exports;
}
var po = ud();
const ld = /* @__PURE__ */ p(po), dd = /* @__PURE__ */ c({
  __proto__: null,
  default: ld
}, [po]);
var Re = { exports: {} }, md = Re.exports, Hn;
function cd() {
  return Hn || (Hn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(md, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "en-au", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), weekStart: 1, weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, ordinal: function(e) {
        var i = ["th", "st", "nd", "rd"], o = e % 100;
        return "[" + e + (i[(o - 20) % 10] || i[o] || i[0]) + "]";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Re)), Re.exports;
}
var Mo = cd();
const pd = /* @__PURE__ */ p(Mo), Md = /* @__PURE__ */ c({
  __proto__: null,
  default: pd
}, [Mo]);
var Fe = { exports: {} }, fd = Fe.exports, jn;
function hd() {
  return jn || (jn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(fd, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "en-ca", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "YYYY-MM-DD", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Fe)), Fe.exports;
}
var fo = hd();
const Yd = /* @__PURE__ */ p(fo), yd = /* @__PURE__ */ c({
  __proto__: null,
  default: Yd
}, [fo]);
var Ie = { exports: {} }, vd = Ie.exports, Tn;
function Ld() {
  return Tn || (Tn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(vd, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "en-gb", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekStart: 1, yearStart: 4, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, ordinal: function(e) {
        var i = ["th", "st", "nd", "rd"], o = e % 100;
        return "[" + e + (i[(o - 20) % 10] || i[o] || i[0]) + "]";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ie)), Ie.exports;
}
var ho = Ld();
const kd = /* @__PURE__ */ p(ho), xd = /* @__PURE__ */ c({
  __proto__: null,
  default: kd
}, [ho]);
var Je = { exports: {} }, Dd = Je.exports, $n;
function gd() {
  return $n || ($n = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Dd, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "en-ie", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), weekStart: 1, weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Je)), Je.exports;
}
var Yo = gd();
const Sd = /* @__PURE__ */ p(Yo), wd = /* @__PURE__ */ c({
  __proto__: null,
  default: Sd
}, [Yo]);
var Ne = { exports: {} }, bd = Ne.exports, An;
function Hd() {
  return An || (An = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(bd, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "en-il", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ne)), Ne.exports;
}
var yo = Hd();
const jd = /* @__PURE__ */ p(yo), Td = /* @__PURE__ */ c({
  __proto__: null,
  default: jd
}, [yo]);
var Oe = { exports: {} }, $d = Oe.exports, qn;
function Ad() {
  return qn || (qn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })($d, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "en-in", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekStart: 1, yearStart: 4, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, ordinal: function(e) {
        var i = ["th", "st", "nd", "rd"], o = e % 100;
        return "[" + e + (i[(o - 20) % 10] || i[o] || i[0]) + "]";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Oe)), Oe.exports;
}
var vo = Ad();
const qd = /* @__PURE__ */ p(vo), Pd = /* @__PURE__ */ c({
  __proto__: null,
  default: qd
}, [vo]);
var Ke = { exports: {} }, Ed = Ke.exports, Pn;
function zd() {
  return Pn || (Pn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Ed, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "en-nz", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), weekStart: 1, weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ordinal: function(e) {
        var i = ["th", "st", "nd", "rd"], o = e % 100;
        return "[" + e + (i[(o - 20) % 10] || i[o] || i[0]) + "]";
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ke)), Ke.exports;
}
var Lo = zd();
const Cd = /* @__PURE__ */ p(Lo), Rd = /* @__PURE__ */ c({
  __proto__: null,
  default: Cd
}, [Lo]);
var Be = { exports: {} }, Fd = Be.exports, En;
function Id() {
  return En || (En = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Fd, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "en-sg", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), weekStart: 1, weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Be)), Be.exports;
}
var ko = Id();
const Jd = /* @__PURE__ */ p(ko), Nd = /* @__PURE__ */ c({
  __proto__: null,
  default: Jd
}, [ko]);
var We = { exports: {} }, Od = We.exports, zn;
function Kd() {
  return zn || (zn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Od, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "en-tt", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekStart: 1, yearStart: 4, relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, ordinal: function(e) {
        var i = ["th", "st", "nd", "rd"], o = e % 100;
        return "[" + e + (i[(o - 20) % 10] || i[o] || i[0]) + "]";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(We)), We.exports;
}
var xo = Kd();
const Bd = /* @__PURE__ */ p(xo), Wd = /* @__PURE__ */ c({
  __proto__: null,
  default: Bd
}, [xo]);
var Ue = { exports: {} }, Ud = Ue.exports, Cn;
function Gd() {
  return Cn || (Cn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t();
    })(Ud, (function() {
      return { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(r) {
        var t = ["th", "st", "nd", "rd"], s = r % 100;
        return "[" + r + (t[(s - 20) % 10] || t[s] || t[0]) + "]";
      } };
    }));
  })(Ue)), Ue.exports;
}
var Do = Gd();
const Zd = /* @__PURE__ */ p(Do), Vd = /* @__PURE__ */ c({
  __proto__: null,
  default: Zd
}, [Do]);
var Ge = { exports: {} }, Xd = Ge.exports, Rn;
function Qd() {
  return Rn || (Rn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Xd, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "eo", weekdays: "dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato".split("_"), months: "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"), weekStart: 1, weekdaysShort: "dim_lun_mard_merk_ĵaŭ_ven_sab".split("_"), monthsShort: "jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"), weekdaysMin: "di_lu_ma_me_ĵa_ve_sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "D[-a de] MMMM, YYYY", LLL: "D[-a de] MMMM, YYYY HH:mm", LLLL: "dddd, [la] D[-a de] MMMM, YYYY HH:mm" }, relativeTime: { future: "post %s", past: "antaŭ %s", s: "sekundoj", m: "minuto", mm: "%d minutoj", h: "horo", hh: "%d horoj", d: "tago", dd: "%d tagoj", M: "monato", MM: "%d monatoj", y: "jaro", yy: "%d jaroj" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ge)), Ge.exports;
}
var go = Qd();
const em = /* @__PURE__ */ p(go), tm = /* @__PURE__ */ c({
  __proto__: null,
  default: em
}, [go]);
var Ze = { exports: {} }, rm = Ze.exports, Fn;
function nm() {
  return Fn || (Fn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(rm, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "es-do", weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), weekStart: 1, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, ordinal: function(e) {
        return e + "º";
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY h:mm A", LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ze)), Ze.exports;
}
var So = nm();
const am = /* @__PURE__ */ p(So), sm = /* @__PURE__ */ c({
  __proto__: null,
  default: am
}, [So]);
var Ve = { exports: {} }, om = Ve.exports, In;
function _m() {
  return In || (In = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(om, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "es-mx", weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, ordinal: function(e) {
        return e + "º";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ve)), Ve.exports;
}
var wo = _m();
const im = /* @__PURE__ */ p(wo), um = /* @__PURE__ */ c({
  __proto__: null,
  default: im
}, [wo]);
var Xe = { exports: {} }, lm = Xe.exports, Jn;
function dm() {
  return Jn || (Jn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(lm, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "es-pr", monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), weekStart: 1, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "MM/DD/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY h:mm A", LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A" }, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, ordinal: function(e) {
        return e + "º";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Xe)), Xe.exports;
}
var bo = dm();
const mm = /* @__PURE__ */ p(bo), cm = /* @__PURE__ */ c({
  __proto__: null,
  default: mm
}, [bo]);
var Qe = { exports: {} }, pm = Qe.exports, Nn;
function Mm() {
  return Nn || (Nn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(pm, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "es-us", weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, ordinal: function(e) {
        return e + "º";
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "MM/DD/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY h:mm A", LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Qe)), Qe.exports;
}
var Ho = Mm();
const fm = /* @__PURE__ */ p(Ho), hm = /* @__PURE__ */ c({
  __proto__: null,
  default: fm
}, [Ho]);
var et = { exports: {} }, Ym = et.exports, On;
function ym() {
  return On || (On = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Ym, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "es", monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), weekStart: 1, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" }, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, ordinal: function(e) {
        return e + "º";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(et)), et.exports;
}
var jo = ym();
const vm = /* @__PURE__ */ p(jo), Lm = /* @__PURE__ */ c({
  __proto__: null,
  default: vm
}, [jo]);
var tt = { exports: {} }, km = tt.exports, Kn;
function xm() {
  return Kn || (Kn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(km, (function(r) {
      function t(i) {
        return i && typeof i == "object" && "default" in i ? i : { default: i };
      }
      var s = t(r);
      function n(i, o, u, l) {
        var d = { s: ["mõne sekundi", "mõni sekund", "paar sekundit"], m: ["ühe minuti", "üks minut"], mm: ["%d minuti", "%d minutit"], h: ["ühe tunni", "tund aega", "üks tund"], hh: ["%d tunni", "%d tundi"], d: ["ühe päeva", "üks päev"], M: ["kuu aja", "kuu aega", "üks kuu"], MM: ["%d kuu", "%d kuud"], y: ["ühe aasta", "aasta", "üks aasta"], yy: ["%d aasta", "%d aastat"] };
        return o ? (d[u][2] ? d[u][2] : d[u][1]).replace("%d", i) : (l ? d[u][0] : d[u][1]).replace("%d", i);
      }
      var e = { name: "et", weekdays: "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"), weekdaysShort: "P_E_T_K_N_R_L".split("_"), weekdaysMin: "P_E_T_K_N_R_L".split("_"), months: "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"), monthsShort: "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"), ordinal: function(i) {
        return i + ".";
      }, weekStart: 1, relativeTime: { future: "%s pärast", past: "%s tagasi", s: n, m: n, mm: n, h: n, hh: n, d: n, dd: "%d päeva", M: n, MM: n, y: n, yy: n }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" } };
      return s.default.locale(e, null, !0), e;
    }));
  })(tt)), tt.exports;
}
var To = xm();
const Dm = /* @__PURE__ */ p(To), gm = /* @__PURE__ */ c({
  __proto__: null,
  default: Dm
}, [To]);
var rt = { exports: {} }, Sm = rt.exports, Bn;
function wm() {
  return Bn || (Bn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Sm, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "eu", weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"), months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"), weekStart: 1, weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"), monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"), weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY[ko] MMMM[ren] D[a]", LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm", LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm", l: "YYYY-M-D", ll: "YYYY[ko] MMM D[a]", lll: "YYYY[ko] MMM D[a] HH:mm", llll: "ddd, YYYY[ko] MMM D[a] HH:mm" }, relativeTime: { future: "%s barru", past: "duela %s", s: "segundo batzuk", m: "minutu bat", mm: "%d minutu", h: "ordu bat", hh: "%d ordu", d: "egun bat", dd: "%d egun", M: "hilabete bat", MM: "%d hilabete", y: "urte bat", yy: "%d urte" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(rt)), rt.exports;
}
var $o = wm();
const bm = /* @__PURE__ */ p($o), Hm = /* @__PURE__ */ c({
  __proto__: null,
  default: bm
}, [$o]);
var nt = { exports: {} }, jm = nt.exports, Wn;
function Tm() {
  return Wn || (Wn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(jm, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "fa", weekdays: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"), weekdaysShort: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"), weekdaysMin: "ی_د_س_چ_پ_ج_ش".split("_"), weekStart: 6, months: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"), monthsShort: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "در %s", past: "%s پیش", s: "چند ثانیه", m: "یک دقیقه", mm: "%d دقیقه", h: "یک ساعت", hh: "%d ساعت", d: "یک روز", dd: "%d روز", M: "یک ماه", MM: "%d ماه", y: "یک سال", yy: "%d سال" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(nt)), nt.exports;
}
var Ao = Tm();
const $m = /* @__PURE__ */ p(Ao), Am = /* @__PURE__ */ c({
  __proto__: null,
  default: $m
}, [Ao]);
var at = { exports: {} }, qm = at.exports, Un;
function Pm() {
  return Un || (Un = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(qm, (function(r) {
      function t(i) {
        return i && typeof i == "object" && "default" in i ? i : { default: i };
      }
      var s = t(r);
      function n(i, o, u, l) {
        var d = { s: "muutama sekunti", m: "minuutti", mm: "%d minuuttia", h: "tunti", hh: "%d tuntia", d: "päivä", dd: "%d päivää", M: "kuukausi", MM: "%d kuukautta", y: "vuosi", yy: "%d vuotta", numbers: "nolla_yksi_kaksi_kolme_neljä_viisi_kuusi_seitsemän_kahdeksan_yhdeksän".split("_") }, m = { s: "muutaman sekunnin", m: "minuutin", mm: "%d minuutin", h: "tunnin", hh: "%d tunnin", d: "päivän", dd: "%d päivän", M: "kuukauden", MM: "%d kuukauden", y: "vuoden", yy: "%d vuoden", numbers: "nollan_yhden_kahden_kolmen_neljän_viiden_kuuden_seitsemän_kahdeksan_yhdeksän".split("_") }, f = l && !o ? m : d, y = f[u];
        return i < 10 ? y.replace("%d", f.numbers[i]) : y.replace("%d", i);
      }
      var e = { name: "fi", weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"), weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"), weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"), months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"), monthsShort: "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"), ordinal: function(i) {
        return i + ".";
      }, weekStart: 1, yearStart: 4, relativeTime: { future: "%s päästä", past: "%s sitten", s: n, m: n, mm: n, h: n, hh: n, d: n, dd: n, M: n, MM: n, y: n, yy: n }, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD.MM.YYYY", LL: "D. MMMM[ta] YYYY", LLL: "D. MMMM[ta] YYYY, [klo] HH.mm", LLLL: "dddd, D. MMMM[ta] YYYY, [klo] HH.mm", l: "D.M.YYYY", ll: "D. MMM YYYY", lll: "D. MMM YYYY, [klo] HH.mm", llll: "ddd, D. MMM YYYY, [klo] HH.mm" } };
      return s.default.locale(e, null, !0), e;
    }));
  })(at)), at.exports;
}
var qo = Pm();
const Em = /* @__PURE__ */ p(qo), zm = /* @__PURE__ */ c({
  __proto__: null,
  default: Em
}, [qo]);
var st = { exports: {} }, Cm = st.exports, Gn;
function Rm() {
  return Gn || (Gn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Cm, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "fo", weekdays: "sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"), months: "januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"), weekStart: 1, weekdaysShort: "sun_mán_týs_mik_hós_frí_ley".split("_"), monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"), weekdaysMin: "su_má_tý_mi_hó_fr_le".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D. MMMM, YYYY HH:mm" }, relativeTime: { future: "um %s", past: "%s síðani", s: "fá sekund", m: "ein minuttur", mm: "%d minuttir", h: "ein tími", hh: "%d tímar", d: "ein dagur", dd: "%d dagar", M: "ein mánaður", MM: "%d mánaðir", y: "eitt ár", yy: "%d ár" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(st)), st.exports;
}
var Po = Rm();
const Fm = /* @__PURE__ */ p(Po), Im = /* @__PURE__ */ c({
  __proto__: null,
  default: Fm
}, [Po]);
var ot = { exports: {} }, Jm = ot.exports, Zn;
function Nm() {
  return Zn || (Zn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Jm, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "fr-ca", weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(ot)), ot.exports;
}
var Eo = Nm();
const Om = /* @__PURE__ */ p(Eo), Km = /* @__PURE__ */ c({
  __proto__: null,
  default: Om
}, [Eo]);
var _t = { exports: {} }, Bm = _t.exports, Vn;
function Wm() {
  return Vn || (Vn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Bm, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "fr-ch", weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"), weekStart: 1, weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(_t)), _t.exports;
}
var zo = Wm();
const Um = /* @__PURE__ */ p(zo), Gm = /* @__PURE__ */ c({
  __proto__: null,
  default: Um
}, [zo]);
var it = { exports: {} }, Zm = it.exports, Xn;
function Vm() {
  return Xn || (Xn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Zm, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "fr", weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"), monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"), weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" }, ordinal: function(e) {
        return "" + e + (e === 1 ? "er" : "");
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(it)), it.exports;
}
var Co = Vm();
const Xm = /* @__PURE__ */ p(Co), Qm = /* @__PURE__ */ c({
  __proto__: null,
  default: Xm
}, [Co]);
var ut = { exports: {} }, ec = ut.exports, Qn;
function tc() {
  return Qn || (Qn = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(ec, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "fy", weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"), months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"), monthsShort: "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"), weekStart: 1, weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"), weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "oer %s", past: "%s lyn", s: "in pear sekonden", m: "ien minút", mm: "%d minuten", h: "ien oere", hh: "%d oeren", d: "ien dei", dd: "%d dagen", M: "ien moanne", MM: "%d moannen", y: "ien jier", yy: "%d jierren" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(ut)), ut.exports;
}
var Ro = tc();
const rc = /* @__PURE__ */ p(Ro), nc = /* @__PURE__ */ c({
  __proto__: null,
  default: rc
}, [Ro]);
var lt = { exports: {} }, ac = lt.exports, ea;
function sc() {
  return ea || (ea = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(ac, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ga", weekdays: "Dé Domhnaigh_Dé Luain_Dé Máirt_Dé Céadaoin_Déardaoin_Dé hAoine_Dé Sathairn".split("_"), months: "Eanáir_Feabhra_Márta_Aibreán_Bealtaine_Meitheamh_Iúil_Lúnasa_Meán Fómhair_Deireadh Fómhair_Samhain_Nollaig".split("_"), weekStart: 1, weekdaysShort: "Dom_Lua_Mái_Céa_Déa_Aoi_Sat".split("_"), monthsShort: "Ean_Fea_Már_Aib_Beal_Mei_Iúil_Lún_MFómh_DFómh_Samh_Noll".split("_"), weekdaysMin: "Do_Lu_Má_Cé_Dé_Ao_Sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "i %s", past: "%s ó shin", s: "cúpla soicind", m: "nóiméad", mm: "%d nóiméad", h: "uair an chloig", hh: "%d uair an chloig", d: "lá", dd: "%d lá", M: "mí", MM: "%d mí", y: "bliain", yy: "%d bliain" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(lt)), lt.exports;
}
var Fo = sc();
const oc = /* @__PURE__ */ p(Fo), _c = /* @__PURE__ */ c({
  __proto__: null,
  default: oc
}, [Fo]);
var dt = { exports: {} }, ic = dt.exports, ta;
function uc() {
  return ta || (ta = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(ic, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "gd", weekdays: "Didòmhnaich_Diluain_Dimàirt_Diciadain_Diardaoin_Dihaoine_Disathairne".split("_"), months: "Am Faoilleach_An Gearran_Am Màrt_An Giblean_An Cèitean_An t-Ògmhios_An t-Iuchar_An Lùnastal_An t-Sultain_An Dàmhair_An t-Samhain_An Dùbhlachd".split("_"), weekStart: 1, weekdaysShort: "Did_Dil_Dim_Dic_Dia_Dih_Dis".split("_"), monthsShort: "Faoi_Gear_Màrt_Gibl_Cèit_Ògmh_Iuch_Lùn_Sult_Dàmh_Samh_Dùbh".split("_"), weekdaysMin: "Dò_Lu_Mà_Ci_Ar_Ha_Sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "ann an %s", past: "bho chionn %s", s: "beagan diogan", m: "mionaid", mm: "%d mionaidean", h: "uair", hh: "%d uairean", d: "latha", dd: "%d latha", M: "mìos", MM: "%d mìosan", y: "bliadhna", yy: "%d bliadhna" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(dt)), dt.exports;
}
var Io = uc();
const lc = /* @__PURE__ */ p(Io), dc = /* @__PURE__ */ c({
  __proto__: null,
  default: lc
}, [Io]);
var mt = { exports: {} }, mc = mt.exports, ra;
function cc() {
  return ra || (ra = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(mc, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "gl", weekdays: "domingo_luns_martes_mércores_xoves_venres_sábado".split("_"), months: "xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro".split("_"), weekStart: 1, weekdaysShort: "dom._lun._mar._mér._xov._ven._sáb.".split("_"), monthsShort: "xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.".split("_"), weekdaysMin: "do_lu_ma_mé_xo_ve_sá".split("_"), ordinal: function(e) {
        return e + "º";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" }, relativeTime: { future: "en %s", past: "fai %s", s: "uns segundos", m: "un minuto", mm: "%d minutos", h: "unha hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un ano", yy: "%d anos" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(mt)), mt.exports;
}
var Jo = cc();
const pc = /* @__PURE__ */ p(Jo), Mc = /* @__PURE__ */ c({
  __proto__: null,
  default: pc
}, [Jo]);
var ct = { exports: {} }, fc = ct.exports, na;
function hc() {
  return na || (na = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(fc, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "gom-latn", weekdays: "Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split("_"), months: "Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"), weekStart: 1, weekdaysShort: "Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"), monthsShort: "Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"), weekdaysMin: "Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "A h:mm [vazta]", LTS: "A h:mm:ss [vazta]", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY A h:mm [vazta]", LLLL: "dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]", llll: "ddd, D MMM YYYY, A h:mm [vazta]" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(ct)), ct.exports;
}
var No = hc();
const Yc = /* @__PURE__ */ p(No), yc = /* @__PURE__ */ c({
  __proto__: null,
  default: Yc
}, [No]);
var pt = { exports: {} }, vc = pt.exports, aa;
function Lc() {
  return aa || (aa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(vc, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "gu", weekdays: "રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર".split("_"), months: "જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર".split("_"), weekdaysShort: "રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ".split("_"), monthsShort: "જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.".split("_"), weekdaysMin: "ર_સો_મં_બુ_ગુ_શુ_શ".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "A h:mm વાગ્યે", LTS: "A h:mm:ss વાગ્યે", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm વાગ્યે", LLLL: "dddd, D MMMM YYYY, A h:mm વાગ્યે" }, relativeTime: { future: "%s મા", past: "%s પેહલા", s: "અમુક પળો", m: "એક મિનિટ", mm: "%d મિનિટ", h: "એક કલાક", hh: "%d કલાક", d: "એક દિવસ", dd: "%d દિવસ", M: "એક મહિનો", MM: "%d મહિનો", y: "એક વર્ષ", yy: "%d વર્ષ" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(pt)), pt.exports;
}
var Oo = Lc();
const kc = /* @__PURE__ */ p(Oo), xc = /* @__PURE__ */ c({
  __proto__: null,
  default: kc
}, [Oo]);
var Mt = { exports: {} }, Dc = Mt.exports, sa;
function gc() {
  return sa || (sa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Dc, (function(r) {
      function t(o) {
        return o && typeof o == "object" && "default" in o ? o : { default: o };
      }
      var s = t(r), n = { s: "מספר שניות", ss: "%d שניות", m: "דקה", mm: "%d דקות", h: "שעה", hh: "%d שעות", hh2: "שעתיים", d: "יום", dd: "%d ימים", dd2: "יומיים", M: "חודש", MM: "%d חודשים", MM2: "חודשיים", y: "שנה", yy: "%d שנים", yy2: "שנתיים" };
      function e(o, u, l) {
        return (n[l + (o === 2 ? "2" : "")] || n[l]).replace("%d", o);
      }
      var i = { name: "he", weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"), weekdaysShort: "א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"), weekdaysMin: "א׳_ב׳_ג׳_ד׳_ה׳_ו_ש׳".split("_"), months: "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"), monthsShort: "ינו_פבר_מרץ_אפר_מאי_יונ_יול_אוג_ספט_אוק_נוב_דצמ".split("_"), relativeTime: { future: "בעוד %s", past: "לפני %s", s: e, m: e, mm: e, h: e, hh: e, d: e, dd: e, M: e, MM: e, y: e, yy: e }, ordinal: function(o) {
        return o;
      }, format: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [ב]MMMM YYYY", LLL: "D [ב]MMMM YYYY HH:mm", LLLL: "dddd, D [ב]MMMM YYYY HH:mm", l: "D/M/YYYY", ll: "D MMM YYYY", lll: "D MMM YYYY HH:mm", llll: "ddd, D MMM YYYY HH:mm" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [ב]MMMM YYYY", LLL: "D [ב]MMMM YYYY HH:mm", LLLL: "dddd, D [ב]MMMM YYYY HH:mm", l: "D/M/YYYY", ll: "D MMM YYYY", lll: "D MMM YYYY HH:mm", llll: "ddd, D MMM YYYY HH:mm" } };
      return s.default.locale(i, null, !0), i;
    }));
  })(Mt)), Mt.exports;
}
var Ko = gc();
const Sc = /* @__PURE__ */ p(Ko), wc = /* @__PURE__ */ c({
  __proto__: null,
  default: Sc
}, [Ko]);
var ft = { exports: {} }, bc = ft.exports, oa;
function Hc() {
  return oa || (oa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(bc, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "hi", weekdays: "रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"), months: "जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"), weekdaysShort: "रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"), monthsShort: "जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"), weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "A h:mm बजे", LTS: "A h:mm:ss बजे", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm बजे", LLLL: "dddd, D MMMM YYYY, A h:mm बजे" }, relativeTime: { future: "%s में", past: "%s पहले", s: "कुछ ही क्षण", m: "एक मिनट", mm: "%d मिनट", h: "एक घंटा", hh: "%d घंटे", d: "एक दिन", dd: "%d दिन", M: "एक महीने", MM: "%d महीने", y: "एक वर्ष", yy: "%d वर्ष" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(ft)), ft.exports;
}
var Bo = Hc();
const jc = /* @__PURE__ */ p(Bo), Tc = /* @__PURE__ */ c({
  __proto__: null,
  default: jc
}, [Bo]);
var ht = { exports: {} }, $c = ht.exports, _a;
function Ac() {
  return _a || (_a = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })($c, (function(r) {
      function t(l) {
        return l && typeof l == "object" && "default" in l ? l : { default: l };
      }
      var s = t(r), n = "siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"), e = "siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_"), i = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/, o = function(l, d) {
        return i.test(d) ? n[l.month()] : e[l.month()];
      };
      o.s = e, o.f = n;
      var u = { name: "hr", weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"), weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"), weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"), months: o, monthsShort: "sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"), weekStart: 1, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, relativeTime: { future: "za %s", past: "prije %s", s: "sekunda", m: "minuta", mm: "%d minuta", h: "sat", hh: "%d sati", d: "dan", dd: "%d dana", M: "mjesec", MM: "%d mjeseci", y: "godina", yy: "%d godine" }, ordinal: function(l) {
        return l + ".";
      } };
      return s.default.locale(u, null, !0), u;
    }));
  })(ht)), ht.exports;
}
var Wo = Ac();
const qc = /* @__PURE__ */ p(Wo), Pc = /* @__PURE__ */ c({
  __proto__: null,
  default: qc
}, [Wo]);
var Yt = { exports: {} }, Ec = Yt.exports, ia;
function zc() {
  return ia || (ia = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Ec, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ht", weekdays: "dimanch_lendi_madi_mèkredi_jedi_vandredi_samdi".split("_"), months: "janvye_fevriye_mas_avril_me_jen_jiyè_out_septanm_oktòb_novanm_desanm".split("_"), weekdaysShort: "dim._len._mad._mèk._jed._van._sam.".split("_"), monthsShort: "jan._fev._mas_avr._me_jen_jiyè._out_sept._okt._nov._des.".split("_"), weekdaysMin: "di_le_ma_mè_je_va_sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "nan %s", past: "sa gen %s", s: "kèk segond", m: "yon minit", mm: "%d minit", h: "inèdtan", hh: "%d zè", d: "yon jou", dd: "%d jou", M: "yon mwa", MM: "%d mwa", y: "yon ane", yy: "%d ane" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Yt)), Yt.exports;
}
var Uo = zc();
const Cc = /* @__PURE__ */ p(Uo), Rc = /* @__PURE__ */ c({
  __proto__: null,
  default: Cc
}, [Uo]);
var yt = { exports: {} }, Fc = yt.exports, ua;
function Ic() {
  return ua || (ua = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Fc, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "hu", weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"), weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"), weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"), months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"), monthsShort: "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"), ordinal: function(e) {
        return e + ".";
      }, weekStart: 1, relativeTime: { future: "%s múlva", past: "%s", s: function(e, i, o, u) {
        return "néhány másodperc" + (u || i ? "" : "e");
      }, m: function(e, i, o, u) {
        return "egy perc" + (u || i ? "" : "e");
      }, mm: function(e, i, o, u) {
        return e + " perc" + (u || i ? "" : "e");
      }, h: function(e, i, o, u) {
        return "egy " + (u || i ? "óra" : "órája");
      }, hh: function(e, i, o, u) {
        return e + " " + (u || i ? "óra" : "órája");
      }, d: function(e, i, o, u) {
        return "egy " + (u || i ? "nap" : "napja");
      }, dd: function(e, i, o, u) {
        return e + " " + (u || i ? "nap" : "napja");
      }, M: function(e, i, o, u) {
        return "egy " + (u || i ? "hónap" : "hónapja");
      }, MM: function(e, i, o, u) {
        return e + " " + (u || i ? "hónap" : "hónapja");
      }, y: function(e, i, o, u) {
        return "egy " + (u || i ? "év" : "éve");
      }, yy: function(e, i, o, u) {
        return e + " " + (u || i ? "év" : "éve");
      } }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY. MMMM D.", LLL: "YYYY. MMMM D. H:mm", LLLL: "YYYY. MMMM D., dddd H:mm" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(yt)), yt.exports;
}
var Go = Ic();
const Jc = /* @__PURE__ */ p(Go), Nc = /* @__PURE__ */ c({
  __proto__: null,
  default: Jc
}, [Go]);
var vt = { exports: {} }, Oc = vt.exports, la;
function Kc() {
  return la || (la = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Oc, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "hy-am", weekdays: "կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_"), months: "հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_"), weekStart: 1, weekdaysShort: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"), monthsShort: "հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_"), weekdaysMin: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY թ.", LLL: "D MMMM YYYY թ., HH:mm", LLLL: "dddd, D MMMM YYYY թ., HH:mm" }, relativeTime: { future: "%s հետո", past: "%s առաջ", s: "մի քանի վայրկյան", m: "րոպե", mm: "%d րոպե", h: "ժամ", hh: "%d ժամ", d: "օր", dd: "%d օր", M: "ամիս", MM: "%d ամիս", y: "տարի", yy: "%d տարի" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(vt)), vt.exports;
}
var Zo = Kc();
const Bc = /* @__PURE__ */ p(Zo), Wc = /* @__PURE__ */ c({
  __proto__: null,
  default: Bc
}, [Zo]);
var Lt = { exports: {} }, Uc = Lt.exports, da;
function Gc() {
  return da || (da = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Uc, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "id", weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"), months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"), weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"), monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"), weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"), weekStart: 1, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, relativeTime: { future: "dalam %s", past: "%s yang lalu", s: "beberapa detik", m: "semenit", mm: "%d menit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" }, ordinal: function(e) {
        return e + ".";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Lt)), Lt.exports;
}
var Vo = Gc();
const Zc = /* @__PURE__ */ p(Vo), Vc = /* @__PURE__ */ c({
  __proto__: null,
  default: Zc
}, [Vo]);
var kt = { exports: {} }, Xc = kt.exports, ma;
function Qc() {
  return ma || (ma = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Xc, (function(r) {
      function t(o) {
        return o && typeof o == "object" && "default" in o ? o : { default: o };
      }
      var s = t(r), n = { s: ["nokkrar sekúndur", "nokkrar sekúndur", "nokkrum sekúndum"], m: ["mínúta", "mínútu", "mínútu"], mm: ["mínútur", "mínútur", "mínútum"], h: ["klukkustund", "klukkustund", "klukkustund"], hh: ["klukkustundir", "klukkustundir", "klukkustundum"], d: ["dagur", "dag", "degi"], dd: ["dagar", "daga", "dögum"], M: ["mánuður", "mánuð", "mánuði"], MM: ["mánuðir", "mánuði", "mánuðum"], y: ["ár", "ár", "ári"], yy: ["ár", "ár", "árum"] };
      function e(o, u, l, d) {
        var m = (function(f, y, k, w) {
          var H = w ? 0 : k ? 1 : 2, j = f.length === 2 && y % 10 == 1 ? f[0] : f, F = n[j][H];
          return f.length === 1 ? F : "%d " + F;
        })(l, o, d, u);
        return m.replace("%d", o);
      }
      var i = { name: "is", weekdays: "sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"), months: "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"), weekStart: 1, weekdaysShort: "sun_mán_þri_mið_fim_fös_lau".split("_"), monthsShort: "jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"), weekdaysMin: "Su_Má_Þr_Mi_Fi_Fö_La".split("_"), ordinal: function(o) {
        return o;
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] H:mm", LLLL: "dddd, D. MMMM YYYY [kl.] H:mm" }, relativeTime: { future: "eftir %s", past: "fyrir %s síðan", s: e, m: e, mm: e, h: e, hh: e, d: e, dd: e, M: e, MM: e, y: e, yy: e } };
      return s.default.locale(i, null, !0), i;
    }));
  })(kt)), kt.exports;
}
var Xo = Qc();
const ep = /* @__PURE__ */ p(Xo), tp = /* @__PURE__ */ c({
  __proto__: null,
  default: ep
}, [Xo]);
var xt = { exports: {} }, rp = xt.exports, ca;
function np() {
  return ca || (ca = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(rp, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "it-ch", weekdays: "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"), months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"), weekStart: 1, weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"), monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"), weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "tra %s", past: "%s fa", s: "alcuni secondi", m: "un minuto", mm: "%d minuti", h: "un'ora", hh: "%d ore", d: "un giorno", dd: "%d giorni", M: "un mese", MM: "%d mesi", y: "un anno", yy: "%d anni" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(xt)), xt.exports;
}
var Qo = np();
const ap = /* @__PURE__ */ p(Qo), sp = /* @__PURE__ */ c({
  __proto__: null,
  default: ap
}, [Qo]);
var Dt = { exports: {} }, op = Dt.exports, pa;
function _p() {
  return pa || (pa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(op, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "it", weekdays: "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"), weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"), weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"), months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"), weekStart: 1, monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"), formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "tra %s", past: "%s fa", s: "qualche secondo", m: "un minuto", mm: "%d minuti", h: "un'ora", hh: "%d ore", d: "un giorno", dd: "%d giorni", M: "un mese", MM: "%d mesi", y: "un anno", yy: "%d anni" }, ordinal: function(e) {
        return e + "º";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Dt)), Dt.exports;
}
var e_ = _p();
const ip = /* @__PURE__ */ p(e_), up = /* @__PURE__ */ c({
  __proto__: null,
  default: ip
}, [e_]);
var gt = { exports: {} }, lp = gt.exports, Ma;
function dp() {
  return Ma || (Ma = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(lp, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ja", weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"), weekdaysShort: "日_月_火_水_木_金_土".split("_"), weekdaysMin: "日_月_火_水_木_金_土".split("_"), months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(e) {
        return e + "日";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日 dddd HH:mm", l: "YYYY/MM/DD", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日(ddd) HH:mm" }, meridiem: function(e) {
        return e < 12 ? "午前" : "午後";
      }, relativeTime: { future: "%s後", past: "%s前", s: "数秒", m: "1分", mm: "%d分", h: "1時間", hh: "%d時間", d: "1日", dd: "%d日", M: "1ヶ月", MM: "%dヶ月", y: "1年", yy: "%d年" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(gt)), gt.exports;
}
var t_ = dp();
const mp = /* @__PURE__ */ p(t_), cp = /* @__PURE__ */ c({
  __proto__: null,
  default: mp
}, [t_]);
var St = { exports: {} }, pp = St.exports, fa;
function Mp() {
  return fa || (fa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(pp, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "jv", weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"), months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"), weekStart: 1, weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"), monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"), weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, relativeTime: { future: "wonten ing %s", past: "%s ingkang kepengker", s: "sawetawis detik", m: "setunggal menit", mm: "%d menit", h: "setunggal jam", hh: "%d jam", d: "sedinten", dd: "%d dinten", M: "sewulan", MM: "%d wulan", y: "setaun", yy: "%d taun" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(St)), St.exports;
}
var r_ = Mp();
const fp = /* @__PURE__ */ p(r_), hp = /* @__PURE__ */ c({
  __proto__: null,
  default: fp
}, [r_]);
var wt = { exports: {} }, Yp = wt.exports, ha;
function yp() {
  return ha || (ha = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Yp, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ka", weekdays: "კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"), weekdaysShort: "კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"), weekdaysMin: "კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"), months: "იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"), monthsShort: "იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"), weekStart: 1, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, relativeTime: { future: "%s შემდეგ", past: "%s წინ", s: "წამი", m: "წუთი", mm: "%d წუთი", h: "საათი", hh: "%d საათის", d: "დღეს", dd: "%d დღის განმავლობაში", M: "თვის", MM: "%d თვის", y: "წელი", yy: "%d წლის" }, ordinal: function(e) {
        return e;
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(wt)), wt.exports;
}
var n_ = yp();
const vp = /* @__PURE__ */ p(n_), Lp = /* @__PURE__ */ c({
  __proto__: null,
  default: vp
}, [n_]);
var bt = { exports: {} }, kp = bt.exports, Ya;
function xp() {
  return Ya || (Ya = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(kp, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "kk", weekdays: "жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі".split("_"), weekdaysShort: "жек_дүй_сей_сәр_бей_жұм_сен".split("_"), weekdaysMin: "жк_дй_сй_ср_бй_жм_сн".split("_"), months: "қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан".split("_"), monthsShort: "қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел".split("_"), weekStart: 1, relativeTime: { future: "%s ішінде", past: "%s бұрын", s: "бірнеше секунд", m: "бір минут", mm: "%d минут", h: "бір сағат", hh: "%d сағат", d: "бір күн", dd: "%d күн", M: "бір ай", MM: "%d ай", y: "бір жыл", yy: "%d жыл" }, ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(bt)), bt.exports;
}
var a_ = xp();
const Dp = /* @__PURE__ */ p(a_), gp = /* @__PURE__ */ c({
  __proto__: null,
  default: Dp
}, [a_]);
var Ht = { exports: {} }, Sp = Ht.exports, ya;
function wp() {
  return ya || (ya = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Sp, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "km", weekdays: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"), months: "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"), weekStart: 1, weekdaysShort: "អា_ច_អ_ព_ព្រ_សុ_ស".split("_"), monthsShort: "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"), weekdaysMin: "អា_ច_អ_ព_ព្រ_សុ_ស".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "%sទៀត", past: "%sមុន", s: "ប៉ុន្មានវិនាទី", m: "មួយនាទី", mm: "%d នាទី", h: "មួយម៉ោង", hh: "%d ម៉ោង", d: "មួយថ្ងៃ", dd: "%d ថ្ងៃ", M: "មួយខែ", MM: "%d ខែ", y: "មួយឆ្នាំ", yy: "%d ឆ្នាំ" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ht)), Ht.exports;
}
var s_ = wp();
const bp = /* @__PURE__ */ p(s_), Hp = /* @__PURE__ */ c({
  __proto__: null,
  default: bp
}, [s_]);
var jt = { exports: {} }, jp = jt.exports, va;
function Tp() {
  return va || (va = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(jp, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "kn", weekdays: "ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ".split("_"), months: "ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್".split("_"), weekdaysShort: "ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ".split("_"), monthsShort: "ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋ_ನವೆಂ_ಡಿಸೆಂ".split("_"), weekdaysMin: "ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, relativeTime: { future: "%s ನಂತರ", past: "%s ಹಿಂದೆ", s: "ಕೆಲವು ಕ್ಷಣಗಳು", m: "ಒಂದು ನಿಮಿಷ", mm: "%d ನಿಮಿಷ", h: "ಒಂದು ಗಂಟೆ", hh: "%d ಗಂಟೆ", d: "ಒಂದು ದಿನ", dd: "%d ದಿನ", M: "ಒಂದು ತಿಂಗಳು", MM: "%d ತಿಂಗಳು", y: "ಒಂದು ವರ್ಷ", yy: "%d ವರ್ಷ" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(jt)), jt.exports;
}
var o_ = Tp();
const $p = /* @__PURE__ */ p(o_), Ap = /* @__PURE__ */ c({
  __proto__: null,
  default: $p
}, [o_]);
var Tt = { exports: {} }, qp = Tt.exports, La;
function Pp() {
  return La || (La = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(qp, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ko", weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"), weekdaysShort: "일_월_화_수_목_금_토".split("_"), weekdaysMin: "일_월_화_수_목_금_토".split("_"), months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"), monthsShort: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"), ordinal: function(e) {
        return e + "일";
      }, formats: { LT: "A h:mm", LTS: "A h:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY년 MMMM D일", LLL: "YYYY년 MMMM D일 A h:mm", LLLL: "YYYY년 MMMM D일 dddd A h:mm", l: "YYYY.MM.DD.", ll: "YYYY년 MMMM D일", lll: "YYYY년 MMMM D일 A h:mm", llll: "YYYY년 MMMM D일 dddd A h:mm" }, meridiem: function(e) {
        return e < 12 ? "오전" : "오후";
      }, relativeTime: { future: "%s 후", past: "%s 전", s: "몇 초", m: "1분", mm: "%d분", h: "한 시간", hh: "%d시간", d: "하루", dd: "%d일", M: "한 달", MM: "%d달", y: "일 년", yy: "%d년" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Tt)), Tt.exports;
}
var __ = Pp();
const Ep = /* @__PURE__ */ p(__), zp = /* @__PURE__ */ c({
  __proto__: null,
  default: Ep
}, [__]);
var se = { exports: {} }, Cp = se.exports, ka;
function Rp() {
  return ka || (ka = 1, (function(a, _) {
    (function(r, t) {
      t(_, M());
    })(Cp, (function(r, t) {
      function s(l) {
        return l && typeof l == "object" && "default" in l ? l : { default: l };
      }
      var n = s(t), e = { 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", 0: "٠" }, i = { "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "٠": "0" }, o = ["کانوونی دووەم", "شوبات", "ئادار", "نیسان", "ئایار", "حوزەیران", "تەممووز", "ئاب", "ئەیلوول", "تشرینی یەکەم", "تشرینی دووەم", "کانوونی یەکەم"], u = { name: "ku", months: o, monthsShort: o, weekdays: "یەکشەممە_دووشەممە_سێشەممە_چوارشەممە_پێنجشەممە_هەینی_شەممە".split("_"), weekdaysShort: "یەکشەم_دووشەم_سێشەم_چوارشەم_پێنجشەم_هەینی_شەممە".split("_"), weekStart: 6, weekdaysMin: "ی_د_س_چ_پ_هـ_ش".split("_"), preparse: function(l) {
        return l.replace(/[١٢٣٤٥٦٧٨٩٠]/g, (function(d) {
          return i[d];
        })).replace(/،/g, ",");
      }, postformat: function(l) {
        return l.replace(/\d/g, (function(d) {
          return e[d];
        })).replace(/,/g, "،");
      }, ordinal: function(l) {
        return l;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, meridiem: function(l) {
        return l < 12 ? "پ.ن" : "د.ن";
      }, relativeTime: { future: "لە %s", past: "لەمەوپێش %s", s: "چەند چرکەیەک", m: "یەک خولەک", mm: "%d خولەک", h: "یەک کاتژمێر", hh: "%d کاتژمێر", d: "یەک ڕۆژ", dd: "%d ڕۆژ", M: "یەک مانگ", MM: "%d مانگ", y: "یەک ساڵ", yy: "%d ساڵ" } };
      n.default.locale(u, null, !0), r.default = u, r.englishToArabicNumbersMap = e, Object.defineProperty(r, "__esModule", { value: !0 });
    }));
  })(se, se.exports)), se.exports;
}
var i_ = Rp();
const Fp = /* @__PURE__ */ p(i_), Ip = /* @__PURE__ */ c({
  __proto__: null,
  default: Fp
}, [i_]);
var $t = { exports: {} }, Jp = $t.exports, xa;
function Np() {
  return xa || (xa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Jp, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ky", weekdays: "Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби".split("_"), months: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"), weekStart: 1, weekdaysShort: "Жек_Дүй_Шей_Шар_Бей_Жум_Ише".split("_"), monthsShort: "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"), weekdaysMin: "Жк_Дй_Шй_Шр_Бй_Жм_Иш".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "%s ичинде", past: "%s мурун", s: "бирнече секунд", m: "бир мүнөт", mm: "%d мүнөт", h: "бир саат", hh: "%d саат", d: "бир күн", dd: "%d күн", M: "бир ай", MM: "%d ай", y: "бир жыл", yy: "%d жыл" } };
      return s.default.locale(n, null, !0), n;
    }));
  })($t)), $t.exports;
}
var u_ = Np();
const Op = /* @__PURE__ */ p(u_), Kp = /* @__PURE__ */ c({
  __proto__: null,
  default: Op
}, [u_]);
var At = { exports: {} }, Bp = At.exports, Da;
function Wp() {
  return Da || (Da = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Bp, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "lb", weekdays: "Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"), months: "Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), weekStart: 1, weekdaysShort: "So._Mé._Dë._Më._Do._Fr._Sa.".split("_"), monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"), weekdaysMin: "So_Mé_Dë_Më_Do_Fr_Sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "H:mm [Auer]", LTS: "H:mm:ss [Auer]", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm [Auer]", LLLL: "dddd, D. MMMM YYYY H:mm [Auer]" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(At)), At.exports;
}
var l_ = Wp();
const Up = /* @__PURE__ */ p(l_), Gp = /* @__PURE__ */ c({
  __proto__: null,
  default: Up
}, [l_]);
var qt = { exports: {} }, Zp = qt.exports, ga;
function Vp() {
  return ga || (ga = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Zp, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "lo", weekdays: "ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"), months: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"), weekdaysShort: "ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"), monthsShort: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"), weekdaysMin: "ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "ວັນdddd D MMMM YYYY HH:mm" }, relativeTime: { future: "ອີກ %s", past: "%sຜ່ານມາ", s: "ບໍ່ເທົ່າໃດວິນາທີ", m: "1 ນາທີ", mm: "%d ນາທີ", h: "1 ຊົ່ວໂມງ", hh: "%d ຊົ່ວໂມງ", d: "1 ມື້", dd: "%d ມື້", M: "1 ເດືອນ", MM: "%d ເດືອນ", y: "1 ປີ", yy: "%d ປີ" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(qt)), qt.exports;
}
var d_ = Vp();
const Xp = /* @__PURE__ */ p(d_), Qp = /* @__PURE__ */ c({
  __proto__: null,
  default: Xp
}, [d_]);
var Pt = { exports: {} }, eM = Pt.exports, Sa;
function tM() {
  return Sa || (Sa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(eM, (function(r) {
      function t(l) {
        return l && typeof l == "object" && "default" in l ? l : { default: l };
      }
      var s = t(r), n = "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"), e = "sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"), i = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/, o = function(l, d) {
        return i.test(d) ? n[l.month()] : e[l.month()];
      };
      o.s = e, o.f = n;
      var u = { name: "lt", weekdays: "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"), weekdaysShort: "sek_pir_ant_tre_ket_pen_šeš".split("_"), weekdaysMin: "s_p_a_t_k_pn_š".split("_"), months: o, monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"), ordinal: function(l) {
        return l + ".";
      }, weekStart: 1, relativeTime: { future: "už %s", past: "prieš %s", s: "kelias sekundes", m: "minutę", mm: "%d minutes", h: "valandą", hh: "%d valandas", d: "dieną", dd: "%d dienas", M: "mėnesį", MM: "%d mėnesius", y: "metus", yy: "%d metus" }, format: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY [m.] MMMM D [d.]", LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]", LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]", l: "YYYY-MM-DD", ll: "YYYY [m.] MMMM D [d.]", lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]", llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY [m.] MMMM D [d.]", LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]", LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]", l: "YYYY-MM-DD", ll: "YYYY [m.] MMMM D [d.]", lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]", llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]" } };
      return s.default.locale(u, null, !0), u;
    }));
  })(Pt)), Pt.exports;
}
var m_ = tM();
const rM = /* @__PURE__ */ p(m_), nM = /* @__PURE__ */ c({
  __proto__: null,
  default: rM
}, [m_]);
var Et = { exports: {} }, aM = Et.exports, wa;
function sM() {
  return wa || (wa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(aM, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "lv", weekdays: "svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"), months: "janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"), weekStart: 1, weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"), monthsShort: "jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"), weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY.", LL: "YYYY. [gada] D. MMMM", LLL: "YYYY. [gada] D. MMMM, HH:mm", LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm" }, relativeTime: { future: "pēc %s", past: "pirms %s", s: "dažām sekundēm", m: "minūtes", mm: "%d minūtēm", h: "stundas", hh: "%d stundām", d: "dienas", dd: "%d dienām", M: "mēneša", MM: "%d mēnešiem", y: "gada", yy: "%d gadiem" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Et)), Et.exports;
}
var c_ = sM();
const oM = /* @__PURE__ */ p(c_), _M = /* @__PURE__ */ c({
  __proto__: null,
  default: oM
}, [c_]);
var zt = { exports: {} }, iM = zt.exports, ba;
function uM() {
  return ba || (ba = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(iM, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "me", weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"), months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"), weekStart: 1, weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"), monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"), weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(zt)), zt.exports;
}
var p_ = uM();
const lM = /* @__PURE__ */ p(p_), dM = /* @__PURE__ */ c({
  __proto__: null,
  default: lM
}, [p_]);
var Ct = { exports: {} }, mM = Ct.exports, Ha;
function cM() {
  return Ha || (Ha = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(mM, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "mi", weekdays: "Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei".split("_"), months: "Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea".split("_"), weekStart: 1, weekdaysShort: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"), monthsShort: "Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"), weekdaysMin: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [i] HH:mm", LLLL: "dddd, D MMMM YYYY [i] HH:mm" }, relativeTime: { future: "i roto i %s", past: "%s i mua", s: "te hēkona ruarua", m: "he meneti", mm: "%d meneti", h: "te haora", hh: "%d haora", d: "he ra", dd: "%d ra", M: "he marama", MM: "%d marama", y: "he tau", yy: "%d tau" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ct)), Ct.exports;
}
var M_ = cM();
const pM = /* @__PURE__ */ p(M_), MM = /* @__PURE__ */ c({
  __proto__: null,
  default: pM
}, [M_]);
var Rt = { exports: {} }, fM = Rt.exports, ja;
function hM() {
  return ja || (ja = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(fM, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "mk", weekdays: "недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"), months: "јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"), weekStart: 1, weekdaysShort: "нед_пон_вто_сре_чет_пет_саб".split("_"), monthsShort: "јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"), weekdaysMin: "нe_пo_вт_ср_че_пе_сa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "D.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" }, relativeTime: { future: "после %s", past: "пред %s", s: "неколку секунди", m: "минута", mm: "%d минути", h: "час", hh: "%d часа", d: "ден", dd: "%d дена", M: "месец", MM: "%d месеци", y: "година", yy: "%d години" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Rt)), Rt.exports;
}
var f_ = hM();
const YM = /* @__PURE__ */ p(f_), yM = /* @__PURE__ */ c({
  __proto__: null,
  default: YM
}, [f_]);
var Ft = { exports: {} }, vM = Ft.exports, Ta;
function LM() {
  return Ta || (Ta = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(vM, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ml", weekdays: "ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"), months: "ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"), weekdaysShort: "ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"), monthsShort: "ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"), weekdaysMin: "ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "A h:mm -നു", LTS: "A h:mm:ss -നു", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm -നു", LLLL: "dddd, D MMMM YYYY, A h:mm -നു" }, relativeTime: { future: "%s കഴിഞ്ഞ്", past: "%s മുൻപ്", s: "അൽപ നിമിഷങ്ങൾ", m: "ഒരു മിനിറ്റ്", mm: "%d മിനിറ്റ്", h: "ഒരു മണിക്കൂർ", hh: "%d മണിക്കൂർ", d: "ഒരു ദിവസം", dd: "%d ദിവസം", M: "ഒരു മാസം", MM: "%d മാസം", y: "ഒരു വർഷം", yy: "%d വർഷം" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ft)), Ft.exports;
}
var h_ = LM();
const kM = /* @__PURE__ */ p(h_), xM = /* @__PURE__ */ c({
  __proto__: null,
  default: kM
}, [h_]);
var It = { exports: {} }, DM = It.exports, $a;
function gM() {
  return $a || ($a = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(DM, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "mn", weekdays: "Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба".split("_"), months: "Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар".split("_"), weekdaysShort: "Ням_Дав_Мяг_Лха_Пүр_Баа_Бям".split("_"), monthsShort: "1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар".split("_"), weekdaysMin: "Ня_Да_Мя_Лх_Пү_Ба_Бя".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY оны MMMMын D", LLL: "YYYY оны MMMMын D HH:mm", LLLL: "dddd, YYYY оны MMMMын D HH:mm" }, relativeTime: { future: "%s", past: "%s", s: "саяхан", m: "м", mm: "%dм", h: "1ц", hh: "%dц", d: "1ө", dd: "%dө", M: "1с", MM: "%dс", y: "1ж", yy: "%dж" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(It)), It.exports;
}
var Y_ = gM();
const SM = /* @__PURE__ */ p(Y_), wM = /* @__PURE__ */ c({
  __proto__: null,
  default: SM
}, [Y_]);
var Jt = { exports: {} }, bM = Jt.exports, Aa;
function HM() {
  return Aa || (Aa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(bM, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "mr", weekdays: "रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"), months: "जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"), weekdaysShort: "रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"), monthsShort: "जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"), weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "A h:mm वाजता", LTS: "A h:mm:ss वाजता", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm वाजता", LLLL: "dddd, D MMMM YYYY, A h:mm वाजता" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Jt)), Jt.exports;
}
var y_ = HM();
const jM = /* @__PURE__ */ p(y_), TM = /* @__PURE__ */ c({
  __proto__: null,
  default: jM
}, [y_]);
var Nt = { exports: {} }, $M = Nt.exports, qa;
function AM() {
  return qa || (qa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })($M, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ms-my", weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"), months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"), weekStart: 1, weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"), weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, relativeTime: { future: "dalam %s", past: "%s yang lepas", s: "beberapa saat", m: "seminit", mm: "%d minit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Nt)), Nt.exports;
}
var v_ = AM();
const qM = /* @__PURE__ */ p(v_), PM = /* @__PURE__ */ c({
  __proto__: null,
  default: qM
}, [v_]);
var Ot = { exports: {} }, EM = Ot.exports, Pa;
function zM() {
  return Pa || (Pa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(EM, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ms", weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"), weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"), weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"), months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"), weekStart: 1, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH.mm", LLLL: "dddd, D MMMM YYYY HH.mm" }, relativeTime: { future: "dalam %s", past: "%s yang lepas", s: "beberapa saat", m: "seminit", mm: "%d minit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" }, ordinal: function(e) {
        return e + ".";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ot)), Ot.exports;
}
var L_ = zM();
const CM = /* @__PURE__ */ p(L_), RM = /* @__PURE__ */ c({
  __proto__: null,
  default: CM
}, [L_]);
var Kt = { exports: {} }, FM = Kt.exports, Ea;
function IM() {
  return Ea || (Ea = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(FM, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "mt", weekdays: "Il-Ħadd_It-Tnejn_It-Tlieta_L-Erbgħa_Il-Ħamis_Il-Ġimgħa_Is-Sibt".split("_"), months: "Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru".split("_"), weekStart: 1, weekdaysShort: "Ħad_Tne_Tli_Erb_Ħam_Ġim_Sib".split("_"), monthsShort: "Jan_Fra_Mar_Apr_Mej_Ġun_Lul_Aww_Set_Ott_Nov_Diċ".split("_"), weekdaysMin: "Ħa_Tn_Tl_Er_Ħa_Ġi_Si".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "f’ %s", past: "%s ilu", s: "ftit sekondi", m: "minuta", mm: "%d minuti", h: "siegħa", hh: "%d siegħat", d: "ġurnata", dd: "%d ġranet", M: "xahar", MM: "%d xhur", y: "sena", yy: "%d sni" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Kt)), Kt.exports;
}
var k_ = IM();
const JM = /* @__PURE__ */ p(k_), NM = /* @__PURE__ */ c({
  __proto__: null,
  default: JM
}, [k_]);
var Bt = { exports: {} }, OM = Bt.exports, za;
function KM() {
  return za || (za = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(OM, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "my", weekdays: "တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"), months: "ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"), weekStart: 1, weekdaysShort: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"), monthsShort: "ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"), weekdaysMin: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "လာမည့် %s မှာ", past: "လွန်ခဲ့သော %s က", s: "စက္ကန်.အနည်းငယ်", m: "တစ်မိနစ်", mm: "%d မိနစ်", h: "တစ်နာရီ", hh: "%d နာရီ", d: "တစ်ရက်", dd: "%d ရက်", M: "တစ်လ", MM: "%d လ", y: "တစ်နှစ်", yy: "%d နှစ်" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Bt)), Bt.exports;
}
var x_ = KM();
const BM = /* @__PURE__ */ p(x_), WM = /* @__PURE__ */ c({
  __proto__: null,
  default: BM
}, [x_]);
var Wt = { exports: {} }, UM = Wt.exports, Ca;
function GM() {
  return Ca || (Ca = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(UM, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "nb", weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"), weekdaysShort: "sø._ma._ti._on._to._fr._lø.".split("_"), weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"), months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"), ordinal: function(e) {
        return e + ".";
      }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] HH:mm", LLLL: "dddd D. MMMM YYYY [kl.] HH:mm" }, relativeTime: { future: "om %s", past: "%s siden", s: "noen sekunder", m: "ett minutt", mm: "%d minutter", h: "en time", hh: "%d timer", d: "en dag", dd: "%d dager", M: "en måned", MM: "%d måneder", y: "ett år", yy: "%d år" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Wt)), Wt.exports;
}
var D_ = GM();
const ZM = /* @__PURE__ */ p(D_), VM = /* @__PURE__ */ c({
  __proto__: null,
  default: ZM
}, [D_]);
var Ut = { exports: {} }, XM = Ut.exports, Ra;
function QM() {
  return Ra || (Ra = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(XM, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ne", weekdays: "आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"), weekdaysShort: "आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"), weekdaysMin: "आ._सो._मं._बु._बि._शु._श.".split("_"), months: "जनवरी_फेब्रुवरी_मार्च_अप्रिल_मे_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"), monthsShort: "जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"), relativeTime: { future: "%s पछि", past: "%s अघि", s: "सेकेन्ड", m: "एक मिनेट", mm: "%d मिनेट", h: "घन्टा", hh: "%d घन्टा", d: "एक दिन", dd: "%d दिन", M: "एक महिना", MM: "%d महिना", y: "एक वर्ष", yy: "%d वर्ष" }, ordinal: function(e) {
        return ("" + e).replace(/\d/g, (function(i) {
          return "०१२३४५६७८९"[i];
        }));
      }, formats: { LT: "Aको h:mm बजे", LTS: "Aको h:mm:ss बजे", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, Aको h:mm बजे", LLLL: "dddd, D MMMM YYYY, Aको h:mm बजे" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ut)), Ut.exports;
}
var g_ = QM();
const ef = /* @__PURE__ */ p(g_), tf = /* @__PURE__ */ c({
  __proto__: null,
  default: ef
}, [g_]);
var Gt = { exports: {} }, rf = Gt.exports, Fa;
function nf() {
  return Fa || (Fa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(rf, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "nl-be", weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"), months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"), monthsShort: "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"), weekStart: 1, weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"), weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "over %s", past: "%s geleden", s: "een paar seconden", m: "één minuut", mm: "%d minuten", h: "één uur", hh: "%d uur", d: "één dag", dd: "%d dagen", M: "één maand", MM: "%d maanden", y: "één jaar", yy: "%d jaar" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Gt)), Gt.exports;
}
var S_ = nf();
const af = /* @__PURE__ */ p(S_), sf = /* @__PURE__ */ c({
  __proto__: null,
  default: af
}, [S_]);
var Zt = { exports: {} }, of = Zt.exports, Ia;
function _f() {
  return Ia || (Ia = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(of, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "nl", weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"), weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"), weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"), months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"), monthsShort: "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"), ordinal: function(e) {
        return "[" + e + (e === 1 || e === 8 || e >= 20 ? "ste" : "de") + "]";
      }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "over %s", past: "%s geleden", s: "een paar seconden", m: "een minuut", mm: "%d minuten", h: "een uur", hh: "%d uur", d: "een dag", dd: "%d dagen", M: "een maand", MM: "%d maanden", y: "een jaar", yy: "%d jaar" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Zt)), Zt.exports;
}
var w_ = _f();
const uf = /* @__PURE__ */ p(w_), lf = /* @__PURE__ */ c({
  __proto__: null,
  default: uf
}, [w_]);
var Vt = { exports: {} }, df = Vt.exports, Ja;
function mf() {
  return Ja || (Ja = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(df, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "nn", weekdays: "sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"), weekdaysShort: "sun_mån_tys_ons_tor_fre_lau".split("_"), weekdaysMin: "su_må_ty_on_to_fr_la".split("_"), months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"), ordinal: function(e) {
        return e + ".";
      }, weekStart: 1, relativeTime: { future: "om %s", past: "for %s sidan", s: "nokre sekund", m: "eitt minutt", mm: "%d minutt", h: "ein time", hh: "%d timar", d: "ein dag", dd: "%d dagar", M: "ein månad", MM: "%d månadar", y: "eitt år", yy: "%d år" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] H:mm", LLLL: "dddd D. MMMM YYYY [kl.] HH:mm" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Vt)), Vt.exports;
}
var b_ = mf();
const cf = /* @__PURE__ */ p(b_), pf = /* @__PURE__ */ c({
  __proto__: null,
  default: cf
}, [b_]);
var Xt = { exports: {} }, Mf = Xt.exports, Na;
function ff() {
  return Na || (Na = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Mf, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "oc-lnc", weekdays: "dimenge_diluns_dimars_dimècres_dijòus_divendres_dissabte".split("_"), weekdaysShort: "Dg_Dl_Dm_Dc_Dj_Dv_Ds".split("_"), weekdaysMin: "dg_dl_dm_dc_dj_dv_ds".split("_"), months: "genièr_febrièr_març_abrial_mai_junh_julhet_agost_setembre_octòbre_novembre_decembre".split("_"), monthsShort: "gen_feb_març_abr_mai_junh_julh_ago_set_oct_nov_dec".split("_"), weekStart: 1, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM [de] YYYY", LLL: "D MMMM [de] YYYY [a] H:mm", LLLL: "dddd D MMMM [de] YYYY [a] H:mm" }, relativeTime: { future: "d'aquí %s", past: "fa %s", s: "unas segondas", m: "una minuta", mm: "%d minutas", h: "una ora", hh: "%d oras", d: "un jorn", dd: "%d jorns", M: "un mes", MM: "%d meses", y: "un an", yy: "%d ans" }, ordinal: function(e) {
        return e + "º";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Xt)), Xt.exports;
}
var H_ = ff();
const hf = /* @__PURE__ */ p(H_), Yf = /* @__PURE__ */ c({
  __proto__: null,
  default: hf
}, [H_]);
var Qt = { exports: {} }, yf = Qt.exports, Oa;
function vf() {
  return Oa || (Oa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(yf, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "pa-in", weekdays: "ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ".split("_"), months: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"), weekdaysShort: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"), monthsShort: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"), weekdaysMin: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "A h:mm ਵਜੇ", LTS: "A h:mm:ss ਵਜੇ", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm ਵਜੇ", LLLL: "dddd, D MMMM YYYY, A h:mm ਵਜੇ" }, relativeTime: { future: "%s ਵਿੱਚ", past: "%s ਪਿਛਲੇ", s: "ਕੁਝ ਸਕਿੰਟ", m: "ਇਕ ਮਿੰਟ", mm: "%d ਮਿੰਟ", h: "ਇੱਕ ਘੰਟਾ", hh: "%d ਘੰਟੇ", d: "ਇੱਕ ਦਿਨ", dd: "%d ਦਿਨ", M: "ਇੱਕ ਮਹੀਨਾ", MM: "%d ਮਹੀਨੇ", y: "ਇੱਕ ਸਾਲ", yy: "%d ਸਾਲ" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Qt)), Qt.exports;
}
var j_ = vf();
const Lf = /* @__PURE__ */ p(j_), kf = /* @__PURE__ */ c({
  __proto__: null,
  default: Lf
}, [j_]);
var er = { exports: {} }, xf = er.exports, Ka;
function Df() {
  return Ka || (Ka = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(xf, (function(r) {
      function t(m) {
        return m && typeof m == "object" && "default" in m ? m : { default: m };
      }
      var s = t(r);
      function n(m) {
        return m % 10 < 5 && m % 10 > 1 && ~~(m / 10) % 10 != 1;
      }
      function e(m, f, y) {
        var k = m + " ";
        switch (y) {
          case "m":
            return f ? "minuta" : "minutę";
          case "mm":
            return k + (n(m) ? "minuty" : "minut");
          case "h":
            return f ? "godzina" : "godzinę";
          case "hh":
            return k + (n(m) ? "godziny" : "godzin");
          case "MM":
            return k + (n(m) ? "miesiące" : "miesięcy");
          case "yy":
            return k + (n(m) ? "lata" : "lat");
        }
      }
      var i = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"), o = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"), u = /D MMMM/, l = function(m, f) {
        return u.test(f) ? i[m.month()] : o[m.month()];
      };
      l.s = o, l.f = i;
      var d = { name: "pl", weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"), weekdaysShort: "ndz_pon_wt_śr_czw_pt_sob".split("_"), weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"), months: l, monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"), ordinal: function(m) {
        return m + ".";
      }, weekStart: 1, yearStart: 4, relativeTime: { future: "za %s", past: "%s temu", s: "kilka sekund", m: e, mm: e, h: e, hh: e, d: "1 dzień", dd: "%d dni", M: "miesiąc", MM: e, y: "rok", yy: e }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" } };
      return s.default.locale(d, null, !0), d;
    }));
  })(er)), er.exports;
}
var T_ = Df();
const gf = /* @__PURE__ */ p(T_), Sf = /* @__PURE__ */ c({
  __proto__: null,
  default: gf
}, [T_]);
var tr = { exports: {} }, wf = tr.exports, Ba;
function bf() {
  return Ba || (Ba = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(wf, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "pt-br", weekdays: "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"), weekdaysShort: "dom_seg_ter_qua_qui_sex_sáb".split("_"), weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sá".split("_"), months: "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"), monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"), ordinal: function(e) {
        return e + "º";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY [às] HH:mm", LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm" }, relativeTime: { future: "em %s", past: "há %s", s: "poucos segundos", m: "um minuto", mm: "%d minutos", h: "uma hora", hh: "%d horas", d: "um dia", dd: "%d dias", M: "um mês", MM: "%d meses", y: "um ano", yy: "%d anos" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(tr)), tr.exports;
}
var $_ = bf();
const Hf = /* @__PURE__ */ p($_), jf = /* @__PURE__ */ c({
  __proto__: null,
  default: Hf
}, [$_]);
var rr = { exports: {} }, Tf = rr.exports, Wa;
function $f() {
  return Wa || (Wa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Tf, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "pt", weekdays: "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"), weekdaysShort: "dom_seg_ter_qua_qui_sex_sab".split("_"), weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sa".split("_"), months: "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"), monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"), ordinal: function(e) {
        return e + "º";
      }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY [às] HH:mm", LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm" }, relativeTime: { future: "em %s", past: "há %s", s: "alguns segundos", m: "um minuto", mm: "%d minutos", h: "uma hora", hh: "%d horas", d: "um dia", dd: "%d dias", M: "um mês", MM: "%d meses", y: "um ano", yy: "%d anos" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(rr)), rr.exports;
}
var A_ = $f();
const Af = /* @__PURE__ */ p(A_), qf = /* @__PURE__ */ c({
  __proto__: null,
  default: Af
}, [A_]);
var nr = { exports: {} }, Pf = nr.exports, Ua;
function Ef() {
  return Ua || (Ua = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Pf, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "rn", weekdays: "Ku wa Mungu_Ku wa Mbere_Ku wa Kabiri_Ku wa Gatatu_Ku wa Kane_Ku wa Gatanu_Ku wa Gatandatu".split("_"), weekdaysShort: "Kngu_Kmbr_Kbri_Ktat_Kkan_Ktan_Kdat".split("_"), weekdaysMin: "K7_K1_K2_K3_K4_K5_K6".split("_"), months: "Nzero_Ruhuhuma_Ntwarante_Ndamukiza_Rusama_Ruhenshi_Mukakaro_Myandagaro_Nyakanga_Gitugutu_Munyonyo_Kigarama".split("_"), monthsShort: "Nzer_Ruhuh_Ntwar_Ndam_Rus_Ruhen_Muk_Myand_Nyak_Git_Muny_Kig".split("_"), weekStart: 1, ordinal: function(e) {
        return e;
      }, relativeTime: { future: "mu %s", past: "%s", s: "amasegonda", m: "Umunota", mm: "%d iminota", h: "isaha", hh: "%d amasaha", d: "Umunsi", dd: "%d iminsi", M: "ukwezi", MM: "%d amezi", y: "umwaka", yy: "%d imyaka" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(nr)), nr.exports;
}
var q_ = Ef();
const zf = /* @__PURE__ */ p(q_), Cf = /* @__PURE__ */ c({
  __proto__: null,
  default: zf
}, [q_]);
var ar = { exports: {} }, Rf = ar.exports, Ga;
function Ff() {
  return Ga || (Ga = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Rf, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ro", weekdays: "Duminică_Luni_Marți_Miercuri_Joi_Vineri_Sâmbătă".split("_"), weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"), weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"), months: "Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie".split("_"), monthsShort: "Ian._Febr._Mart._Apr._Mai_Iun._Iul._Aug._Sept._Oct._Nov._Dec.".split("_"), weekStart: 1, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" }, relativeTime: { future: "peste %s", past: "acum %s", s: "câteva secunde", m: "un minut", mm: "%d minute", h: "o oră", hh: "%d ore", d: "o zi", dd: "%d zile", M: "o lună", MM: "%d luni", y: "un an", yy: "%d ani" }, ordinal: function(e) {
        return e;
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(ar)), ar.exports;
}
var P_ = Ff();
const If = /* @__PURE__ */ p(P_), Jf = /* @__PURE__ */ c({
  __proto__: null,
  default: If
}, [P_]);
var sr = { exports: {} }, Nf = sr.exports, Za;
function Of() {
  return Za || (Za = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Nf, (function(r) {
      function t(y) {
        return y && typeof y == "object" && "default" in y ? y : { default: y };
      }
      var s = t(r), n = "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"), e = "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"), i = "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"), o = "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_"), u = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
      function l(y, k, w) {
        var H, j;
        return w === "m" ? k ? "минута" : "минуту" : y + " " + (H = +y, j = { mm: k ? "минута_минуты_минут" : "минуту_минуты_минут", hh: "час_часа_часов", dd: "день_дня_дней", MM: "месяц_месяца_месяцев", yy: "год_года_лет" }[w].split("_"), H % 10 == 1 && H % 100 != 11 ? j[0] : H % 10 >= 2 && H % 10 <= 4 && (H % 100 < 10 || H % 100 >= 20) ? j[1] : j[2]);
      }
      var d = function(y, k) {
        return u.test(k) ? n[y.month()] : e[y.month()];
      };
      d.s = e, d.f = n;
      var m = function(y, k) {
        return u.test(k) ? i[y.month()] : o[y.month()];
      };
      m.s = o, m.f = i;
      var f = { name: "ru", weekdays: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"), weekdaysShort: "вск_пнд_втр_срд_чтв_птн_сбт".split("_"), weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"), months: d, monthsShort: m, weekStart: 1, yearStart: 4, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY г.", LLL: "D MMMM YYYY г., H:mm", LLLL: "dddd, D MMMM YYYY г., H:mm" }, relativeTime: { future: "через %s", past: "%s назад", s: "несколько секунд", m: l, mm: l, h: "час", hh: l, d: "день", dd: l, M: "месяц", MM: l, y: "год", yy: l }, ordinal: function(y) {
        return y;
      }, meridiem: function(y) {
        return y < 4 ? "ночи" : y < 12 ? "утра" : y < 17 ? "дня" : "вечера";
      } };
      return s.default.locale(f, null, !0), f;
    }));
  })(sr)), sr.exports;
}
var E_ = Of();
const Kf = /* @__PURE__ */ p(E_), Bf = /* @__PURE__ */ c({
  __proto__: null,
  default: Kf
}, [E_]);
var or = { exports: {} }, Wf = or.exports, Va;
function Uf() {
  return Va || (Va = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Wf, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "rw", weekdays: "Ku Cyumweru_Kuwa Mbere_Kuwa Kabiri_Kuwa Gatatu_Kuwa Kane_Kuwa Gatanu_Kuwa Gatandatu".split("_"), months: "Mutarama_Gashyantare_Werurwe_Mata_Gicurasi_Kamena_Nyakanga_Kanama_Nzeri_Ukwakira_Ugushyingo_Ukuboza".split("_"), relativeTime: { future: "mu %s", past: "%s", s: "amasegonda", m: "Umunota", mm: "%d iminota", h: "isaha", hh: "%d amasaha", d: "Umunsi", dd: "%d iminsi", M: "ukwezi", MM: "%d amezi", y: "umwaka", yy: "%d imyaka" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, ordinal: function(e) {
        return e;
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(or)), or.exports;
}
var z_ = Uf();
const Gf = /* @__PURE__ */ p(z_), Zf = /* @__PURE__ */ c({
  __proto__: null,
  default: Gf
}, [z_]);
var _r = { exports: {} }, Vf = _r.exports, Xa;
function Xf() {
  return Xa || (Xa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Vf, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "sd", weekdays: "آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر".split("_"), months: "جنوري_فيبروري_مارچ_اپريل_مئي_جون_جولاءِ_آگسٽ_سيپٽمبر_آڪٽوبر_نومبر_ڊسمبر".split("_"), weekStart: 1, weekdaysShort: "آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر".split("_"), monthsShort: "جنوري_فيبروري_مارچ_اپريل_مئي_جون_جولاءِ_آگسٽ_سيپٽمبر_آڪٽوبر_نومبر_ڊسمبر".split("_"), weekdaysMin: "آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd، D MMMM YYYY HH:mm" }, relativeTime: { future: "%s پوء", past: "%s اڳ", s: "چند سيڪنڊ", m: "هڪ منٽ", mm: "%d منٽ", h: "هڪ ڪلاڪ", hh: "%d ڪلاڪ", d: "هڪ ڏينهن", dd: "%d ڏينهن", M: "هڪ مهينو", MM: "%d مهينا", y: "هڪ سال", yy: "%d سال" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(_r)), _r.exports;
}
var C_ = Xf();
const Qf = /* @__PURE__ */ p(C_), eh = /* @__PURE__ */ c({
  __proto__: null,
  default: Qf
}, [C_]);
var ir = { exports: {} }, th = ir.exports, Qa;
function rh() {
  return Qa || (Qa = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(th, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "se", weekdays: "sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat".split("_"), months: "ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu".split("_"), weekStart: 1, weekdaysShort: "sotn_vuos_maŋ_gask_duor_bear_láv".split("_"), monthsShort: "ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov".split("_"), weekdaysMin: "s_v_m_g_d_b_L".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "MMMM D. [b.] YYYY", LLL: "MMMM D. [b.] YYYY [ti.] HH:mm", LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm" }, relativeTime: { future: "%s geažes", past: "maŋit %s", s: "moadde sekunddat", m: "okta minuhta", mm: "%d minuhtat", h: "okta diimmu", hh: "%d diimmut", d: "okta beaivi", dd: "%d beaivvit", M: "okta mánnu", MM: "%d mánut", y: "okta jahki", yy: "%d jagit" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(ir)), ir.exports;
}
var R_ = rh();
const nh = /* @__PURE__ */ p(R_), ah = /* @__PURE__ */ c({
  __proto__: null,
  default: nh
}, [R_]);
var ur = { exports: {} }, sh = ur.exports, es;
function oh() {
  return es || (es = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(sh, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "si", weekdays: "ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"), months: "දුරුතු_නවම්_මැදින්_බක්_වෙසක්_පොසොන්_ඇසළ_නිකිණි_බිනර_වප්_ඉල්_උඳුවප්".split("_"), weekdaysShort: "ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"), monthsShort: "දුරු_නව_මැදි_බක්_වෙස_පොසො_ඇස_නිකි_බින_වප්_ඉල්_උඳු".split("_"), weekdaysMin: "ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "a h:mm", LTS: "a h:mm:ss", L: "YYYY/MM/DD", LL: "YYYY MMMM D", LLL: "YYYY MMMM D, a h:mm", LLLL: "YYYY MMMM D [වැනි] dddd, a h:mm:ss" }, relativeTime: { future: "%sකින්", past: "%sකට පෙර", s: "තත්පර කිහිපය", m: "විනාඩිය", mm: "විනාඩි %d", h: "පැය", hh: "පැය %d", d: "දිනය", dd: "දින %d", M: "මාසය", MM: "මාස %d", y: "වසර", yy: "වසර %d" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(ur)), ur.exports;
}
var F_ = oh();
const _h = /* @__PURE__ */ p(F_), ih = /* @__PURE__ */ c({
  __proto__: null,
  default: _h
}, [F_]);
var lr = { exports: {} }, uh = lr.exports, ts;
function lh() {
  return ts || (ts = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(uh, (function(r) {
      function t(o) {
        return o && typeof o == "object" && "default" in o ? o : { default: o };
      }
      var s = t(r);
      function n(o) {
        return o > 1 && o < 5 && ~~(o / 10) != 1;
      }
      function e(o, u, l, d) {
        var m = o + " ";
        switch (l) {
          case "s":
            return u || d ? "pár sekúnd" : "pár sekundami";
          case "m":
            return u ? "minúta" : d ? "minútu" : "minútou";
          case "mm":
            return u || d ? m + (n(o) ? "minúty" : "minút") : m + "minútami";
          case "h":
            return u ? "hodina" : d ? "hodinu" : "hodinou";
          case "hh":
            return u || d ? m + (n(o) ? "hodiny" : "hodín") : m + "hodinami";
          case "d":
            return u || d ? "deň" : "dňom";
          case "dd":
            return u || d ? m + (n(o) ? "dni" : "dní") : m + "dňami";
          case "M":
            return u || d ? "mesiac" : "mesiacom";
          case "MM":
            return u || d ? m + (n(o) ? "mesiace" : "mesiacov") : m + "mesiacmi";
          case "y":
            return u || d ? "rok" : "rokom";
          case "yy":
            return u || d ? m + (n(o) ? "roky" : "rokov") : m + "rokmi";
        }
      }
      var i = { name: "sk", weekdays: "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"), weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"), weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"), months: "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"), monthsShort: "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_"), weekStart: 1, yearStart: 4, ordinal: function(o) {
        return o + ".";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd D. MMMM YYYY H:mm", l: "D. M. YYYY" }, relativeTime: { future: "za %s", past: "pred %s", s: e, m: e, mm: e, h: e, hh: e, d: e, dd: e, M: e, MM: e, y: e, yy: e } };
      return s.default.locale(i, null, !0), i;
    }));
  })(lr)), lr.exports;
}
var I_ = lh();
const dh = /* @__PURE__ */ p(I_), mh = /* @__PURE__ */ c({
  __proto__: null,
  default: dh
}, [I_]);
var dr = { exports: {} }, ch = dr.exports, rs;
function ph() {
  return rs || (rs = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(ch, (function(r) {
      function t(u) {
        return u && typeof u == "object" && "default" in u ? u : { default: u };
      }
      var s = t(r);
      function n(u) {
        return u % 100 == 2;
      }
      function e(u) {
        return u % 100 == 3 || u % 100 == 4;
      }
      function i(u, l, d, m) {
        var f = u + " ";
        switch (d) {
          case "s":
            return l || m ? "nekaj sekund" : "nekaj sekundami";
          case "m":
            return l ? "ena minuta" : "eno minuto";
          case "mm":
            return n(u) ? f + (l || m ? "minuti" : "minutama") : e(u) ? f + (l || m ? "minute" : "minutami") : f + (l || m ? "minut" : "minutami");
          case "h":
            return l ? "ena ura" : "eno uro";
          case "hh":
            return n(u) ? f + (l || m ? "uri" : "urama") : e(u) ? f + (l || m ? "ure" : "urami") : f + (l || m ? "ur" : "urami");
          case "d":
            return l || m ? "en dan" : "enim dnem";
          case "dd":
            return n(u) ? f + (l || m ? "dneva" : "dnevoma") : f + (l || m ? "dni" : "dnevi");
          case "M":
            return l || m ? "en mesec" : "enim mesecem";
          case "MM":
            return n(u) ? f + (l || m ? "meseca" : "mesecema") : e(u) ? f + (l || m ? "mesece" : "meseci") : f + (l || m ? "mesecev" : "meseci");
          case "y":
            return l || m ? "eno leto" : "enim letom";
          case "yy":
            return n(u) ? f + (l || m ? "leti" : "letoma") : e(u) ? f + (l || m ? "leta" : "leti") : f + (l || m ? "let" : "leti");
        }
      }
      var o = { name: "sl", weekdays: "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"), months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"), weekStart: 1, weekdaysShort: "ned._pon._tor._sre._čet._pet._sob.".split("_"), monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"), weekdaysMin: "ne_po_to_sr_če_pe_so".split("_"), ordinal: function(u) {
        return u + ".";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm", l: "D. M. YYYY" }, relativeTime: { future: "čez %s", past: "pred %s", s: i, m: i, mm: i, h: i, hh: i, d: i, dd: i, M: i, MM: i, y: i, yy: i } };
      return s.default.locale(o, null, !0), o;
    }));
  })(dr)), dr.exports;
}
var J_ = ph();
const Mh = /* @__PURE__ */ p(J_), fh = /* @__PURE__ */ c({
  __proto__: null,
  default: Mh
}, [J_]);
var mr = { exports: {} }, hh = mr.exports, ns;
function Yh() {
  return ns || (ns = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(hh, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "sq", weekdays: "E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"), months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"), weekStart: 1, weekdaysShort: "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"), monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"), weekdaysMin: "D_H_Ma_Më_E_P_Sh".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "në %s", past: "%s më parë", s: "disa sekonda", m: "një minutë", mm: "%d minuta", h: "një orë", hh: "%d orë", d: "një ditë", dd: "%d ditë", M: "një muaj", MM: "%d muaj", y: "një vit", yy: "%d vite" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(mr)), mr.exports;
}
var N_ = Yh();
const yh = /* @__PURE__ */ p(N_), vh = /* @__PURE__ */ c({
  __proto__: null,
  default: yh
}, [N_]);
var cr = { exports: {} }, Lh = cr.exports, as;
function kh() {
  return as || (as = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Lh, (function(r) {
      function t(i) {
        return i && typeof i == "object" && "default" in i ? i : { default: i };
      }
      var s = t(r), n = { words: { m: ["један минут", "једног минута"], mm: ["%d минут", "%d минута", "%d минута"], h: ["један сат", "једног сата"], hh: ["%d сат", "%d сата", "%d сати"], d: ["један дан", "једног дана"], dd: ["%d дан", "%d дана", "%d дана"], M: ["један месец", "једног месеца"], MM: ["%d месец", "%d месеца", "%d месеци"], y: ["једну годину", "једне године"], yy: ["%d годину", "%d године", "%d година"] }, correctGrammarCase: function(i, o) {
        return i % 10 >= 1 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20) ? i % 10 == 1 ? o[0] : o[1] : o[2];
      }, relativeTimeFormatter: function(i, o, u, l) {
        var d = n.words[u];
        if (u.length === 1) return u === "y" && o ? "једна година" : l || o ? d[0] : d[1];
        var m = n.correctGrammarCase(i, d);
        return u === "yy" && o && m === "%d годину" ? i + " година" : m.replace("%d", i);
      } }, e = { name: "sr-cyrl", weekdays: "Недеља_Понедељак_Уторак_Среда_Четвртак_Петак_Субота".split("_"), weekdaysShort: "Нед._Пон._Уто._Сре._Чет._Пет._Суб.".split("_"), weekdaysMin: "не_по_ут_ср_че_пе_су".split("_"), months: "Јануар_Фебруар_Март_Април_Мај_Јун_Јул_Август_Септембар_Октобар_Новембар_Децембар".split("_"), monthsShort: "Јан._Феб._Мар._Апр._Мај_Јун_Јул_Авг._Сеп._Окт._Нов._Дец.".split("_"), weekStart: 1, relativeTime: { future: "за %s", past: "пре %s", s: "неколико секунди", m: n.relativeTimeFormatter, mm: n.relativeTimeFormatter, h: n.relativeTimeFormatter, hh: n.relativeTimeFormatter, d: n.relativeTimeFormatter, dd: n.relativeTimeFormatter, M: n.relativeTimeFormatter, MM: n.relativeTimeFormatter, y: n.relativeTimeFormatter, yy: n.relativeTimeFormatter }, ordinal: function(i) {
        return i + ".";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "D. M. YYYY.", LL: "D. MMMM YYYY.", LLL: "D. MMMM YYYY. H:mm", LLLL: "dddd, D. MMMM YYYY. H:mm" } };
      return s.default.locale(e, null, !0), e;
    }));
  })(cr)), cr.exports;
}
var O_ = kh();
const xh = /* @__PURE__ */ p(O_), Dh = /* @__PURE__ */ c({
  __proto__: null,
  default: xh
}, [O_]);
var pr = { exports: {} }, gh = pr.exports, ss;
function Sh() {
  return ss || (ss = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(gh, (function(r) {
      function t(i) {
        return i && typeof i == "object" && "default" in i ? i : { default: i };
      }
      var s = t(r), n = { words: { m: ["jedan minut", "jednog minuta"], mm: ["%d minut", "%d minuta", "%d minuta"], h: ["jedan sat", "jednog sata"], hh: ["%d sat", "%d sata", "%d sati"], d: ["jedan dan", "jednog dana"], dd: ["%d dan", "%d dana", "%d dana"], M: ["jedan mesec", "jednog meseca"], MM: ["%d mesec", "%d meseca", "%d meseci"], y: ["jednu godinu", "jedne godine"], yy: ["%d godinu", "%d godine", "%d godina"] }, correctGrammarCase: function(i, o) {
        return i % 10 >= 1 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20) ? i % 10 == 1 ? o[0] : o[1] : o[2];
      }, relativeTimeFormatter: function(i, o, u, l) {
        var d = n.words[u];
        if (u.length === 1) return u === "y" && o ? "jedna godina" : l || o ? d[0] : d[1];
        var m = n.correctGrammarCase(i, d);
        return u === "yy" && o && m === "%d godinu" ? i + " godina" : m.replace("%d", i);
      } }, e = { name: "sr", weekdays: "Nedelja_Ponedeljak_Utorak_Sreda_Četvrtak_Petak_Subota".split("_"), weekdaysShort: "Ned._Pon._Uto._Sre._Čet._Pet._Sub.".split("_"), weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"), months: "Januar_Februar_Mart_April_Maj_Jun_Jul_Avgust_Septembar_Oktobar_Novembar_Decembar".split("_"), monthsShort: "Jan._Feb._Mar._Apr._Maj_Jun_Jul_Avg._Sep._Okt._Nov._Dec.".split("_"), weekStart: 1, relativeTime: { future: "za %s", past: "pre %s", s: "nekoliko sekundi", m: n.relativeTimeFormatter, mm: n.relativeTimeFormatter, h: n.relativeTimeFormatter, hh: n.relativeTimeFormatter, d: n.relativeTimeFormatter, dd: n.relativeTimeFormatter, M: n.relativeTimeFormatter, MM: n.relativeTimeFormatter, y: n.relativeTimeFormatter, yy: n.relativeTimeFormatter }, ordinal: function(i) {
        return i + ".";
      }, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "D. M. YYYY.", LL: "D. MMMM YYYY.", LLL: "D. MMMM YYYY. H:mm", LLLL: "dddd, D. MMMM YYYY. H:mm" } };
      return s.default.locale(e, null, !0), e;
    }));
  })(pr)), pr.exports;
}
var K_ = Sh();
const wh = /* @__PURE__ */ p(K_), bh = /* @__PURE__ */ c({
  __proto__: null,
  default: wh
}, [K_]);
var Mr = { exports: {} }, Hh = Mr.exports, os;
function jh() {
  return os || (os = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Hh, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ss", weekdays: "Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"), months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"), weekStart: 1, weekdaysShort: "Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"), monthsShort: "Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"), weekdaysMin: "Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, relativeTime: { future: "nga %s", past: "wenteka nga %s", s: "emizuzwana lomcane", m: "umzuzu", mm: "%d emizuzu", h: "lihora", hh: "%d emahora", d: "lilanga", dd: "%d emalanga", M: "inyanga", MM: "%d tinyanga", y: "umnyaka", yy: "%d iminyaka" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Mr)), Mr.exports;
}
var B_ = jh();
const Th = /* @__PURE__ */ p(B_), $h = /* @__PURE__ */ c({
  __proto__: null,
  default: Th
}, [B_]);
var fr = { exports: {} }, Ah = fr.exports, _s;
function qh() {
  return _s || (_s = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Ah, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "sv-fi", weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"), weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"), weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"), months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"), monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"), weekStart: 1, yearStart: 4, ordinal: function(e) {
        var i = e % 10;
        return "[" + e + (i === 1 || i === 2 ? "a" : "e") + "]";
      }, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY, [kl.] HH.mm", LLLL: "dddd, D. MMMM YYYY, [kl.] HH.mm", l: "D.M.YYYY", ll: "D. MMM YYYY", lll: "D. MMM YYYY, [kl.] HH.mm", llll: "ddd, D. MMM YYYY, [kl.] HH.mm" }, relativeTime: { future: "om %s", past: "för %s sedan", s: "några sekunder", m: "en minut", mm: "%d minuter", h: "en timme", hh: "%d timmar", d: "en dag", dd: "%d dagar", M: "en månad", MM: "%d månader", y: "ett år", yy: "%d år" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(fr)), fr.exports;
}
var W_ = qh();
const Ph = /* @__PURE__ */ p(W_), Eh = /* @__PURE__ */ c({
  __proto__: null,
  default: Ph
}, [W_]);
var hr = { exports: {} }, zh = hr.exports, is;
function Ch() {
  return is || (is = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(zh, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "sv", weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"), weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"), weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"), months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"), monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"), weekStart: 1, yearStart: 4, ordinal: function(e) {
        var i = e % 10;
        return "[" + e + (i === 1 || i === 2 ? "a" : "e") + "]";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [kl.] HH:mm", LLLL: "dddd D MMMM YYYY [kl.] HH:mm", lll: "D MMM YYYY HH:mm", llll: "ddd D MMM YYYY HH:mm" }, relativeTime: { future: "om %s", past: "för %s sedan", s: "några sekunder", m: "en minut", mm: "%d minuter", h: "en timme", hh: "%d timmar", d: "en dag", dd: "%d dagar", M: "en månad", MM: "%d månader", y: "ett år", yy: "%d år" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(hr)), hr.exports;
}
var U_ = Ch();
const Rh = /* @__PURE__ */ p(U_), Fh = /* @__PURE__ */ c({
  __proto__: null,
  default: Rh
}, [U_]);
var Yr = { exports: {} }, Ih = Yr.exports, us;
function Jh() {
  return us || (us = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Ih, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "sw", weekdays: "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"), weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"), weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"), months: "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"), weekStart: 1, ordinal: function(e) {
        return e;
      }, relativeTime: { future: "%s baadaye", past: "tokea %s", s: "hivi punde", m: "dakika moja", mm: "dakika %d", h: "saa limoja", hh: "masaa %d", d: "siku moja", dd: "masiku %d", M: "mwezi mmoja", MM: "miezi %d", y: "mwaka mmoja", yy: "miaka %d" }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Yr)), Yr.exports;
}
var G_ = Jh();
const Nh = /* @__PURE__ */ p(G_), Oh = /* @__PURE__ */ c({
  __proto__: null,
  default: Nh
}, [G_]);
var yr = { exports: {} }, Kh = yr.exports, ls;
function Bh() {
  return ls || (ls = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Kh, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ta", weekdays: "ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"), months: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"), weekdaysShort: "ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"), monthsShort: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"), weekdaysMin: "ஞா_தி_செ_பு_வி_வெ_ச".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, HH:mm", LLLL: "dddd, D MMMM YYYY, HH:mm" }, relativeTime: { future: "%s இல்", past: "%s முன்", s: "ஒரு சில விநாடிகள்", m: "ஒரு நிமிடம்", mm: "%d நிமிடங்கள்", h: "ஒரு மணி நேரம்", hh: "%d மணி நேரம்", d: "ஒரு நாள்", dd: "%d நாட்கள்", M: "ஒரு மாதம்", MM: "%d மாதங்கள்", y: "ஒரு வருடம்", yy: "%d ஆண்டுகள்" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(yr)), yr.exports;
}
var Z_ = Bh();
const Wh = /* @__PURE__ */ p(Z_), Uh = /* @__PURE__ */ c({
  __proto__: null,
  default: Wh
}, [Z_]);
var vr = { exports: {} }, Gh = vr.exports, ds;
function Zh() {
  return ds || (ds = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Gh, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "te", weekdays: "ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం".split("_"), months: "జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జులై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్".split("_"), weekdaysShort: "ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని".split("_"), monthsShort: "జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జులై_ఆగ._సెప్._అక్టో._నవ._డిసె.".split("_"), weekdaysMin: "ఆ_సో_మం_బు_గు_శు_శ".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, relativeTime: { future: "%s లో", past: "%s క్రితం", s: "కొన్ని క్షణాలు", m: "ఒక నిమిషం", mm: "%d నిమిషాలు", h: "ఒక గంట", hh: "%d గంటలు", d: "ఒక రోజు", dd: "%d రోజులు", M: "ఒక నెల", MM: "%d నెలలు", y: "ఒక సంవత్సరం", yy: "%d సంవత్సరాలు" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(vr)), vr.exports;
}
var V_ = Zh();
const Vh = /* @__PURE__ */ p(V_), Xh = /* @__PURE__ */ c({
  __proto__: null,
  default: Vh
}, [V_]);
var Lr = { exports: {} }, Qh = Lr.exports, ms;
function eY() {
  return ms || (ms = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Qh, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "tet", weekdays: "Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu".split("_"), months: "Janeiru_Fevereiru_Marsu_Abril_Maiu_Juñu_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru".split("_"), weekStart: 1, weekdaysShort: "Dom_Seg_Ters_Kua_Kint_Sest_Sab".split("_"), monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"), weekdaysMin: "Do_Seg_Te_Ku_Ki_Ses_Sa".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "iha %s", past: "%s liuba", s: "minutu balun", m: "minutu ida", mm: "minutu %d", h: "oras ida", hh: "oras %d", d: "loron ida", dd: "loron %d", M: "fulan ida", MM: "fulan %d", y: "tinan ida", yy: "tinan %d" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Lr)), Lr.exports;
}
var X_ = eY();
const tY = /* @__PURE__ */ p(X_), rY = /* @__PURE__ */ c({
  __proto__: null,
  default: tY
}, [X_]);
var kr = { exports: {} }, nY = kr.exports, cs;
function aY() {
  return cs || (cs = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(nY, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "tg", weekdays: "якшанбе_душанбе_сешанбе_чоршанбе_панҷшанбе_ҷумъа_шанбе".split("_"), months: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"), weekStart: 1, weekdaysShort: "яшб_дшб_сшб_чшб_пшб_ҷум_шнб".split("_"), monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"), weekdaysMin: "яш_дш_сш_чш_пш_ҷм_шб".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "баъди %s", past: "%s пеш", s: "якчанд сония", m: "як дақиқа", mm: "%d дақиқа", h: "як соат", hh: "%d соат", d: "як рӯз", dd: "%d рӯз", M: "як моҳ", MM: "%d моҳ", y: "як сол", yy: "%d сол" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(kr)), kr.exports;
}
var Q_ = aY();
const sY = /* @__PURE__ */ p(Q_), oY = /* @__PURE__ */ c({
  __proto__: null,
  default: sY
}, [Q_]);
var xr = { exports: {} }, _Y = xr.exports, ps;
function iY() {
  return ps || (ps = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(_Y, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "th", weekdays: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"), weekdaysShort: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"), weekdaysMin: "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"), months: "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"), monthsShort: "ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.".split("_"), formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY เวลา H:mm", LLLL: "วันddddที่ D MMMM YYYY เวลา H:mm" }, relativeTime: { future: "อีก %s", past: "%sที่แล้ว", s: "ไม่กี่วินาที", m: "1 นาที", mm: "%d นาที", h: "1 ชั่วโมง", hh: "%d ชั่วโมง", d: "1 วัน", dd: "%d วัน", M: "1 เดือน", MM: "%d เดือน", y: "1 ปี", yy: "%d ปี" }, ordinal: function(e) {
        return e + ".";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(xr)), xr.exports;
}
var ei = iY();
const uY = /* @__PURE__ */ p(ei), lY = /* @__PURE__ */ c({
  __proto__: null,
  default: uY
}, [ei]);
var Dr = { exports: {} }, dY = Dr.exports, Ms;
function mY() {
  return Ms || (Ms = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(dY, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "tk", weekdays: "Ýekşenbe_Duşenbe_Sişenbe_Çarşenbe_Penşenbe_Anna_Şenbe".split("_"), weekdaysShort: "Ýek_Duş_Siş_Çar_Pen_Ann_Şen".split("_"), weekdaysMin: "Ýk_Dş_Sş_Çr_Pn_An_Şn".split("_"), months: "Ýanwar_Fewral_Mart_Aprel_Maý_Iýun_Iýul_Awgust_Sentýabr_Oktýabr_Noýabr_Dekabr".split("_"), monthsShort: "Ýan_Few_Mar_Apr_Maý_Iýn_Iýl_Awg_Sen_Okt_Noý_Dek".split("_"), weekStart: 1, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "%s soň", past: "%s öň", s: "birnäçe sekunt", m: "bir minut", mm: "%d minut", h: "bir sagat", hh: "%d sagat", d: "bir gün", dd: "%d gün", M: "bir aý", MM: "%d aý", y: "bir ýyl", yy: "%d ýyl" }, ordinal: function(e) {
        return e + ".";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Dr)), Dr.exports;
}
var ti = mY();
const cY = /* @__PURE__ */ p(ti), pY = /* @__PURE__ */ c({
  __proto__: null,
  default: cY
}, [ti]);
var gr = { exports: {} }, MY = gr.exports, fs;
function fY() {
  return fs || (fs = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(MY, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "tl-ph", weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"), months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"), weekStart: 1, weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"), monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"), weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "MM/D/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY HH:mm", LLLL: "dddd, MMMM DD, YYYY HH:mm" }, relativeTime: { future: "sa loob ng %s", past: "%s ang nakalipas", s: "ilang segundo", m: "isang minuto", mm: "%d minuto", h: "isang oras", hh: "%d oras", d: "isang araw", dd: "%d araw", M: "isang buwan", MM: "%d buwan", y: "isang taon", yy: "%d taon" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(gr)), gr.exports;
}
var ri = fY();
const hY = /* @__PURE__ */ p(ri), YY = /* @__PURE__ */ c({
  __proto__: null,
  default: hY
}, [ri]);
var Sr = { exports: {} }, yY = Sr.exports, hs;
function vY() {
  return hs || (hs = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(yY, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "tlh", weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), months: "tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split("_"), weekStart: 1, weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), monthsShort: "jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split("_"), weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Sr)), Sr.exports;
}
var ni = vY();
const LY = /* @__PURE__ */ p(ni), kY = /* @__PURE__ */ c({
  __proto__: null,
  default: LY
}, [ni]);
var wr = { exports: {} }, xY = wr.exports, Ys;
function DY() {
  return Ys || (Ys = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(xY, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "tr", weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"), weekdaysShort: "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"), weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"), months: "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"), monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"), weekStart: 1, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "%s sonra", past: "%s önce", s: "birkaç saniye", m: "bir dakika", mm: "%d dakika", h: "bir saat", hh: "%d saat", d: "bir gün", dd: "%d gün", M: "bir ay", MM: "%d ay", y: "bir yıl", yy: "%d yıl" }, ordinal: function(e) {
        return e + ".";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(wr)), wr.exports;
}
var ai = DY();
const gY = /* @__PURE__ */ p(ai), SY = /* @__PURE__ */ c({
  __proto__: null,
  default: gY
}, [ai]);
var br = { exports: {} }, wY = br.exports, ys;
function bY() {
  return ys || (ys = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(wY, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "tzl", weekdays: "Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"), months: "Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"), weekStart: 1, weekdaysShort: "Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"), monthsShort: "Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"), weekdaysMin: "Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD.MM.YYYY", LL: "D. MMMM [dallas] YYYY", LLL: "D. MMMM [dallas] YYYY HH.mm", LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(br)), br.exports;
}
var si = bY();
const HY = /* @__PURE__ */ p(si), jY = /* @__PURE__ */ c({
  __proto__: null,
  default: HY
}, [si]);
var Hr = { exports: {} }, TY = Hr.exports, vs;
function $Y() {
  return vs || (vs = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(TY, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "tzm-latn", weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"), months: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"), weekStart: 6, weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"), monthsShort: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"), weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "dadkh s yan %s", past: "yan %s", s: "imik", m: "minuḍ", mm: "%d minuḍ", h: "saɛa", hh: "%d tassaɛin", d: "ass", dd: "%d ossan", M: "ayowr", MM: "%d iyyirn", y: "asgas", yy: "%d isgasn" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Hr)), Hr.exports;
}
var oi = $Y();
const AY = /* @__PURE__ */ p(oi), qY = /* @__PURE__ */ c({
  __proto__: null,
  default: AY
}, [oi]);
var jr = { exports: {} }, PY = jr.exports, Ls;
function EY() {
  return Ls || (Ls = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(PY, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "tzm", weekdays: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"), months: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"), weekStart: 6, weekdaysShort: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"), monthsShort: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"), weekdaysMin: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s", past: "ⵢⴰⵏ %s", s: "ⵉⵎⵉⴽ", m: "ⵎⵉⵏⵓⴺ", mm: "%d ⵎⵉⵏⵓⴺ", h: "ⵙⴰⵄⴰ", hh: "%d ⵜⴰⵙⵙⴰⵄⵉⵏ", d: "ⴰⵙⵙ", dd: "%d oⵙⵙⴰⵏ", M: "ⴰⵢoⵓⵔ", MM: "%d ⵉⵢⵢⵉⵔⵏ", y: "ⴰⵙⴳⴰⵙ", yy: "%d ⵉⵙⴳⴰⵙⵏ" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(jr)), jr.exports;
}
var _i = EY();
const zY = /* @__PURE__ */ p(_i), CY = /* @__PURE__ */ c({
  __proto__: null,
  default: zY
}, [_i]);
var Tr = { exports: {} }, RY = Tr.exports, ks;
function FY() {
  return ks || (ks = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(RY, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ug-cn", weekdays: "يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە".split("_"), months: "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split("_"), weekStart: 1, weekdaysShort: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"), monthsShort: "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split("_"), weekdaysMin: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY-يىلىM-ئاينىڭD-كۈنى", LLL: "YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm", LLLL: "dddd، YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm" }, relativeTime: { future: "%s كېيىن", past: "%s بۇرۇن", s: "نەچچە سېكونت", m: "بىر مىنۇت", mm: "%d مىنۇت", h: "بىر سائەت", hh: "%d سائەت", d: "بىر كۈن", dd: "%d كۈن", M: "بىر ئاي", MM: "%d ئاي", y: "بىر يىل", yy: "%d يىل" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Tr)), Tr.exports;
}
var ii = FY();
const IY = /* @__PURE__ */ p(ii), JY = /* @__PURE__ */ c({
  __proto__: null,
  default: IY
}, [ii]);
var $r = { exports: {} }, NY = $r.exports, xs;
function OY() {
  return xs || (xs = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(NY, (function(r) {
      function t(d) {
        return d && typeof d == "object" && "default" in d ? d : { default: d };
      }
      var s = t(r), n = "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"), e = "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_"), i = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
      function o(d, m, f) {
        var y, k;
        return f === "m" ? m ? "хвилина" : "хвилину" : f === "h" ? m ? "година" : "годину" : d + " " + (y = +d, k = { ss: m ? "секунда_секунди_секунд" : "секунду_секунди_секунд", mm: m ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин", hh: m ? "година_години_годин" : "годину_години_годин", dd: "день_дні_днів", MM: "місяць_місяці_місяців", yy: "рік_роки_років" }[f].split("_"), y % 10 == 1 && y % 100 != 11 ? k[0] : y % 10 >= 2 && y % 10 <= 4 && (y % 100 < 10 || y % 100 >= 20) ? k[1] : k[2]);
      }
      var u = function(d, m) {
        return i.test(m) ? n[d.month()] : e[d.month()];
      };
      u.s = e, u.f = n;
      var l = { name: "uk", weekdays: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"), weekdaysShort: "ндл_пнд_втр_срд_чтв_птн_сбт".split("_"), weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"), months: u, monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"), weekStart: 1, relativeTime: { future: "за %s", past: "%s тому", s: "декілька секунд", m: o, mm: o, h: o, hh: o, d: "день", dd: o, M: "місяць", MM: o, y: "рік", yy: o }, ordinal: function(d) {
        return d;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY р.", LLL: "D MMMM YYYY р., HH:mm", LLLL: "dddd, D MMMM YYYY р., HH:mm" } };
      return s.default.locale(l, null, !0), l;
    }));
  })($r)), $r.exports;
}
var ui = OY();
const KY = /* @__PURE__ */ p(ui), BY = /* @__PURE__ */ c({
  __proto__: null,
  default: KY
}, [ui]);
var Ar = { exports: {} }, WY = Ar.exports, Ds;
function UY() {
  return Ds || (Ds = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(WY, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "ur", weekdays: "اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ".split("_"), months: "جنوری_فروری_مارچ_اپریل_مئی_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر".split("_"), weekStart: 1, weekdaysShort: "اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ".split("_"), monthsShort: "جنوری_فروری_مارچ_اپریل_مئی_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر".split("_"), weekdaysMin: "اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd، D MMMM YYYY HH:mm" }, relativeTime: { future: "%s بعد", past: "%s قبل", s: "چند سیکنڈ", m: "ایک منٹ", mm: "%d منٹ", h: "ایک گھنٹہ", hh: "%d گھنٹے", d: "ایک دن", dd: "%d دن", M: "ایک ماہ", MM: "%d ماہ", y: "ایک سال", yy: "%d سال" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ar)), Ar.exports;
}
var li = UY();
const GY = /* @__PURE__ */ p(li), ZY = /* @__PURE__ */ c({
  __proto__: null,
  default: GY
}, [li]);
var qr = { exports: {} }, VY = qr.exports, gs;
function XY() {
  return gs || (gs = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(VY, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "uz-latn", weekdays: "Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"), months: "Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"), weekStart: 1, weekdaysShort: "Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"), monthsShort: "Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"), weekdaysMin: "Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "D MMMM YYYY, dddd HH:mm" }, relativeTime: { future: "Yaqin %s ichida", past: "%s oldin", s: "soniya", m: "bir daqiqa", mm: "%d daqiqa", h: "bir soat", hh: "%d soat", d: "bir kun", dd: "%d kun", M: "bir oy", MM: "%d oy", y: "bir yil", yy: "%d yil" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(qr)), qr.exports;
}
var di = XY();
const QY = /* @__PURE__ */ p(di), ey = /* @__PURE__ */ c({
  __proto__: null,
  default: QY
}, [di]);
var Pr = { exports: {} }, ty = Pr.exports, Ss;
function ry() {
  return Ss || (Ss = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(ty, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "uz", weekdays: "Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"), months: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"), weekStart: 1, weekdaysShort: "Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"), monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"), weekdaysMin: "Як_Ду_Се_Чо_Па_Жу_Ша".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "D MMMM YYYY, dddd HH:mm" }, relativeTime: { future: "Якин %s ичида", past: "%s олдин", s: "фурсат", m: "бир дакика", mm: "%d дакика", h: "бир соат", hh: "%d соат", d: "бир кун", dd: "%d кун", M: "бир ой", MM: "%d ой", y: "бир йил", yy: "%d йил" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Pr)), Pr.exports;
}
var mi = ry();
const ny = /* @__PURE__ */ p(mi), ay = /* @__PURE__ */ c({
  __proto__: null,
  default: ny
}, [mi]);
var Er = { exports: {} }, sy = Er.exports, ws;
function oy() {
  return ws || (ws = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(sy, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "vi", weekdays: "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"), months: "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"), weekStart: 1, weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"), monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"), weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM [năm] YYYY", LLL: "D MMMM [năm] YYYY HH:mm", LLLL: "dddd, D MMMM [năm] YYYY HH:mm", l: "DD/M/YYYY", ll: "D MMM YYYY", lll: "D MMM YYYY HH:mm", llll: "ddd, D MMM YYYY HH:mm" }, relativeTime: { future: "%s tới", past: "%s trước", s: "vài giây", m: "một phút", mm: "%d phút", h: "một giờ", hh: "%d giờ", d: "một ngày", dd: "%d ngày", M: "một tháng", MM: "%d tháng", y: "một năm", yy: "%d năm" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Er)), Er.exports;
}
var ci = oy();
const _y = /* @__PURE__ */ p(ci), iy = /* @__PURE__ */ c({
  __proto__: null,
  default: _y
}, [ci]);
var zr = { exports: {} }, uy = zr.exports, bs;
function ly() {
  return bs || (bs = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(uy, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "x-pseudo", weekdays: "S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý".split("_"), months: "J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér".split("_"), weekStart: 1, weekdaysShort: "S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát".split("_"), monthsShort: "J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc".split("_"), weekdaysMin: "S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, relativeTime: { future: "í~ñ %s", past: "%s á~gó", s: "á ~féw ~sécó~ñds", m: "á ~míñ~úté", mm: "%d m~íñú~tés", h: "á~ñ hó~úr", hh: "%d h~óúrs", d: "á ~dáý", dd: "%d d~áýs", M: "á ~móñ~th", MM: "%d m~óñt~hs", y: "á ~ýéár", yy: "%d ý~éárs" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(zr)), zr.exports;
}
var pi = ly();
const dy = /* @__PURE__ */ p(pi), my = /* @__PURE__ */ c({
  __proto__: null,
  default: dy
}, [pi]);
var Cr = { exports: {} }, cy = Cr.exports, Hs;
function py() {
  return Hs || (Hs = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(cy, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "yo", weekdays: "Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta".split("_"), months: "Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀".split("_"), weekStart: 1, weekdaysShort: "Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá".split("_"), monthsShort: "Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀".split("_"), weekdaysMin: "Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb".split("_"), ordinal: function(e) {
        return e;
      }, formats: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, relativeTime: { future: "ní %s", past: "%s kọjá", s: "ìsẹjú aayá die", m: "ìsẹjú kan", mm: "ìsẹjú %d", h: "wákati kan", hh: "wákati %d", d: "ọjọ́ kan", dd: "ọjọ́ %d", M: "osù kan", MM: "osù %d", y: "ọdún kan", yy: "ọdún %d" } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Cr)), Cr.exports;
}
var Mi = py();
const My = /* @__PURE__ */ p(Mi), fy = /* @__PURE__ */ c({
  __proto__: null,
  default: My
}, [Mi]);
var Rr = { exports: {} }, hy = Rr.exports, js;
function Yy() {
  return js || (js = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(hy, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(e, i) {
        return i === "W" ? e + "周" : e + "日";
      }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(e, i) {
        var o = 100 * e + i;
        return o < 600 ? "凌晨" : o < 900 ? "早上" : o < 1100 ? "上午" : o < 1300 ? "中午" : o < 1800 ? "下午" : "晚上";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Rr)), Rr.exports;
}
var fi = Yy();
const yy = /* @__PURE__ */ p(fi), vy = /* @__PURE__ */ c({
  __proto__: null,
  default: yy
}, [fi]);
var Fr = { exports: {} }, Ly = Fr.exports, Ts;
function ky() {
  return Ts || (Ts = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Ly, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "zh-hk", months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), ordinal: function(e, i) {
        return i === "W" ? e + "週" : e + "日";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日dddd HH:mm", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s內", past: "%s前", s: "幾秒", m: "一分鐘", mm: "%d 分鐘", h: "一小時", hh: "%d 小時", d: "一天", dd: "%d 天", M: "一個月", MM: "%d 個月", y: "一年", yy: "%d 年" }, meridiem: function(e, i) {
        var o = 100 * e + i;
        return o < 600 ? "凌晨" : o < 900 ? "早上" : o < 1100 ? "上午" : o < 1300 ? "中午" : o < 1800 ? "下午" : "晚上";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Fr)), Fr.exports;
}
var hi = ky();
const xy = /* @__PURE__ */ p(hi), Dy = /* @__PURE__ */ c({
  __proto__: null,
  default: xy
}, [hi]);
var Ir = { exports: {} }, gy = Ir.exports, $s;
function Sy() {
  return $s || ($s = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(gy, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "zh-tw", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(e, i) {
        return i === "W" ? e + "週" : e + "日";
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日 HH:mm", LLLL: "YYYY年M月D日dddd HH:mm", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s內", past: "%s前", s: "幾秒", m: "1 分鐘", mm: "%d 分鐘", h: "1 小時", hh: "%d 小時", d: "1 天", dd: "%d 天", M: "1 個月", MM: "%d 個月", y: "1 年", yy: "%d 年" }, meridiem: function(e, i) {
        var o = 100 * e + i;
        return o < 600 ? "凌晨" : o < 900 ? "早上" : o < 1100 ? "上午" : o < 1300 ? "中午" : o < 1800 ? "下午" : "晚上";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Ir)), Ir.exports;
}
var Yi = Sy();
const wy = /* @__PURE__ */ p(Yi), by = /* @__PURE__ */ c({
  __proto__: null,
  default: wy
}, [Yi]);
var Jr = { exports: {} }, Hy = Jr.exports, As;
function jy() {
  return As || (As = 1, (function(a, _) {
    (function(r, t) {
      a.exports = t(M());
    })(Hy, (function(r) {
      function t(e) {
        return e && typeof e == "object" && "default" in e ? e : { default: e };
      }
      var s = t(r), n = { name: "zh", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(e, i) {
        return i === "W" ? e + "周" : e + "日";
      }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s后", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(e, i) {
        var o = 100 * e + i;
        return o < 600 ? "凌晨" : o < 900 ? "早上" : o < 1100 ? "上午" : o < 1300 ? "中午" : o < 1800 ? "下午" : "晚上";
      } };
      return s.default.locale(n, null, !0), n;
    }));
  })(Jr)), Jr.exports;
}
var yi = jy();
const Ty = /* @__PURE__ */ p(yi), $y = /* @__PURE__ */ c({
  __proto__: null,
  default: Ty
}, [yi]);
export {
  rv as APIClient,
  Zi as AiIndexedDBAdapter,
  Fi as FormContextKey,
  Ii as FormItemContextKey,
  Qi as IndexedDBAdapter,
  Ki as claudeParser,
  $i as configProviderContextKey,
  zy as createZIndexCounter,
  gi as defaultNamespace,
  Ni as ernieParser,
  Bi as geminiParser,
  Wr as getDayjsLocale,
  ji as getNextZIndex,
  Ri as idInjectionKey,
  Gi as localStorageAdapter,
  Si as namespaceContextKey,
  Ji as openaiParser,
  Or as plainTextParser,
  Oi as qwenParser,
  Ey as resetZIndex,
  zs as setDayjsLocale,
  Iy as setDayjsLocaleSync,
  Jy as updateDayjsMonths,
  Xy as useAiChat,
  Qy as useAiConversations,
  nv as useAiPersistence,
  ev as useAiRequest,
  Vy as useAiStream,
  tv as useAiVoice,
  Uy as useCache,
  Zy as useClickOutside,
  Ai as useConfig,
  Fy as useCountdown,
  Vr as useEventListener,
  By as useFormItem,
  wi as useGlobalNamespace,
  Oy as useId,
  Ky as useIdInjection,
  Ny as useLocale,
  Py as useNamespace,
  Ry as useSKU,
  Gy as useScrollLock,
  Wy as useVirtualScroll,
  Cy as useZIndex,
  bi as zIndexContextKey,
  Hi as zIndexCounterKey
};
