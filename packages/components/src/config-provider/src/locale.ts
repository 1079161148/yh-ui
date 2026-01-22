export interface Language {
  name: string
  el: {
    colorpicker: { confirm: string; clear: string }
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
      // ... 更多
    }
    transfer: {
      noMatch: string
      noData: string
      titles: [string, string]
      filterPlaceholder: string
      noCheckedFormat: string
      hasCheckedFormat: string
    }
    table: {
      emptyText: string
      confirmFilter: string
      resetFilter: string
      clearFilter: string
      sumText: string
    }
    messagebox: {
      title: string
      confirm: string
      cancel: string
      error: string
    }
    upload: {
      deleteTip: string
      delete: string
      preview: string
      continue: string
    }
  }
}

export const zhCn: Language = {
  name: 'zh-cn',
  el: {
    colorpicker: { confirm: '确定', clear: '清空' },
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
      endTime: '结束时间'
    },
    transfer: {
      noMatch: '无匹配数据',
      noData: '无数据',
      titles: ['列表 1', '列表 2'],
      filterPlaceholder: '请输入搜索内容',
      noCheckedFormat: '共 {total} 项',
      hasCheckedFormat: '已选 {checked}/{total} 项'
    },
    table: {
      emptyText: '暂无数据',
      confirmFilter: '筛选',
      resetFilter: '重置',
      clearFilter: '全部',
      sumText: '合计'
    },
    messagebox: {
      title: '提示',
      confirm: '确定',
      cancel: '取消',
      error: '输入的数据不合法!'
    },
    upload: {
      deleteTip: '按 delete 键可删除',
      delete: '删除',
      preview: '查看图片',
      continue: '继续上传'
    }
  }
}

export const en: Language = {
  name: 'en',
  el: {
    colorpicker: { confirm: 'OK', clear: 'Clear' },
    datepicker: {
      now: 'Now',
      today: 'Today',
      cancel: 'Cancel',
      clear: 'Clear',
      confirm: 'OK',
      selectDate: 'Select date',
      selectTime: 'Select time',
      startDate: 'Start Date',
      startTime: 'Start Time',
      endDate: 'End Date',
      endTime: 'End Time'
    },
    transfer: {
      noMatch: 'No matching data',
      noData: 'No data',
      titles: ['List 1', 'List 2'],
      filterPlaceholder: 'Enter keyword',
      noCheckedFormat: '{total} items',
      hasCheckedFormat: '{checked}/{total} checked'
    },
    table: {
      emptyText: 'No Data',
      confirmFilter: 'Confirm',
      resetFilter: 'Reset',
      clearFilter: 'All',
      sumText: 'Sum'
    },
    messagebox: {
      title: 'Message',
      confirm: 'OK',
      cancel: 'Cancel',
      error: 'Illegal input'
    },
    upload: {
      deleteTip: 'press delete to remove',
      delete: 'Delete',
      preview: 'Preview',
      continue: 'Continue'
    }
  }
}
