import type { Language } from '../index'

export const vi: Language = {
  name: 'vi',
  yh: {
    // Chung
    common: {
      yes: 'Có',
      no: 'Không',
      confirm: 'Xác nhận',
      cancel: 'Hủy',
      loading: 'Đang tải',
      close: 'Đóng',
      clear: 'Xóa',
      reset: 'Đặt lại',
      save: 'Lưu',
      delete: 'Xóa',
      edit: 'Chỉnh sửa',
      add: 'Thêm',
      search: 'Tìm kiếm',
      refresh: 'Làm mới',
      expand: 'Mở rộng',
      collapse: 'Thu gọn',
      more: 'Thêm',
      noData: 'Không có dữ liệu',
      noMatch: 'Không có dữ liệu khớp',
      selectAll: 'Chọn tất cả',
      unselectAll: 'Bỏ chọn tất cả'
    },
    // Bộ chọn màu
    colorpicker: {
      confirm: 'OK',
      clear: 'Xóa',
      eyeDropper: 'Ống nhỏ mắt',
      suggestionDark: 'Văn bản trắng là tốt nhất',
      suggestionLight: 'Văn bản đen là tốt nhất',
      recentColors: 'Màu gần đây',
      presetColors: 'Màu đặt trước'
    },
    // Bộ chọn ngày
    datepicker: {
      now: 'Bây giờ',
      today: 'Hôm nay',
      cancel: 'Hủy',
      clear: 'Xóa',
      confirm: 'OK',
      selectDate: 'Chọn ngày',
      selectTime: 'Chọn giờ',
      startDate: 'Ngày bắt đầu',
      startTime: 'Giờ bắt đầu',
      endDate: 'Ngày kết thúc',
      endTime: 'Giờ kết thúc',
      year: '',
      month: '',
      day: '',
      week: 'Tuần',
      monthBeforeYear: true,
      prevYear: 'Năm trước',
      nextYear: 'Năm sau',
      prevMonth: 'Tháng trước',
      nextMonth: 'Tháng sau',
      weeks: {
        sun: 'CN',
        mon: 'T2',
        tue: 'T3',
        wed: 'T4',
        thu: 'T5',
        fri: 'T6',
        sat: 'T7'
      },
      months: {
        jan: 'Th1',
        feb: 'Th2',
        mar: 'Th3',
        apr: 'Th4',
        may: 'Th5',
        jun: 'Th6',
        jul: 'Th7',
        aug: 'Th8',
        sep: 'Th9',
        oct: 'Th10',
        nov: 'Th11',
        dec: 'Th12'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Bộ chọn giờ
    timepicker: {
      confirm: 'OK',
      cancel: 'Hủy',
      now: 'Bây giờ',
      placeholder: 'Chọn giờ',
      startPlaceholder: 'Giờ bắt đầu',
      endPlaceholder: 'Giờ kết thúc',
      selectTime: 'Chọn giờ'
    },
    // Chọn giờ
    timeselect: {
      placeholder: 'Chọn giờ'
    },
    // Cây
    tree: {
      emptyText: 'Không có dữ liệu',
      loading: 'Đang tải...',
      checkAll: 'Chọn tất cả',
      uncheckAll: 'Bỏ chọn tất cả',
      expandAll: 'Mở rộng tất cả',
      collapseAll: 'Thu gọn tất cả'
    },
    // Chọn cây
    treeselect: {
      placeholder: 'Chọn',
      emptyText: 'Không có dữ liệu',
      loading: 'Đang tải...',
      noMatch: 'Không có dữ liệu khớp'
    },
    // Lịch
    calendar: {
      prevMonth: 'Tháng trước',
      nextMonth: 'Tháng sau',
      prevYear: 'Năm trước',
      nextYear: 'Năm sau',
      today: 'Hôm nay',
      week: 'Tuần',
      holiday: 'Ngày lễ',
      workday: 'Làm việc',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'CN',
        mon: 'T2',
        tue: 'T3',
        wed: 'T4',
        thu: 'T5',
        fri: 'T6',
        sat: 'T7'
      }
    },
    // Tự động hoàn thành
    autocomplete: {
      loading: 'Đang tải...',
      placeholder: 'Vui lòng nhập',
      noData: 'Không có dữ liệu',
      noMatch: 'Không có dữ liệu khớp'
    },
    // Đếm ngược
    countdown: {
      days: 'ngày',
      hours: 'giờ',
      minutes: 'phút',
      seconds: 'giây',
      milliseconds: 'mili giây',
      finished: 'Hoàn thành'
    },
    // Chọn tầng
    cascader: {
      noMatch: 'Không có dữ liệu khớp',
      placeholder: 'Chọn',
      loading: 'Đang tải...',
      noData: 'Không có dữ liệu'
    },
    // Chuyển giao
    transfer: {
      noMatch: 'Không có dữ liệu khớp',
      noData: 'Không có dữ liệu',
      titles: ['Danh sách 1', 'Danh sách 2'],
      filterPlaceholder: 'Nhập từ khóa',
      noCheckedFormat: '{total} mục',
      hasCheckedFormat: '{checked}/{total} đã chọn',
      searchPlaceholder: 'Nhập từ khóa'
    },
    // Bảng
    table: {
      emptyText: 'Không có dữ liệu',
      confirmFilter: 'Xác nhận',
      resetFilter: 'Đặt lại',
      clearFilter: 'Tất cả',
      sumText: 'Tổng',
      loading: 'Đang tải...',
      index: 'Chỉ mục',
      print: 'In',
      cancel: 'Hủy',
      preview: 'Xem trước khi in',
      printTime: 'Thời gian in',
      total: 'Tổng {total} mục',
      page: 'Trang {page}',
      yes: 'Có',
      no: 'Không',
      // Thanh công cụ
      toolbar: {
        refresh: 'Làm mới',
        density: 'Mật độ',
        densityDefault: 'Mặc định',
        densityLarge: 'Lớn',
        densitySmall: 'Nhỏ',
        columnSetting: 'Cài đặt cột',
        fullscreen: 'Toàn màn hình',
        exitFullscreen: 'Thoát toàn màn hình',
        export: 'Xuất',
        import: 'Nhập',
        search: 'Tìm kiếm',
        searchPlaceholder: 'Nhập từ khóa để tìm kiếm'
      },
      // Bộ lọc
      filter: {
        selectAll: 'Chọn tất cả',
        selectInvert: 'Đảo ngược lựa chọn',
        empty: 'Trống',
        notEmpty: 'Không trống',
        contains: 'Chứa',
        notContains: 'Không chứa',
        equals: 'Bằng',
        notEquals: 'Không bằng',
        startsWith: 'Bắt đầu bằng',
        endsWith: 'Kết thúc bằng',
        greaterThan: 'Lớn hơn',
        lessThan: 'Nhỏ hơn',
        between: 'Giữa'
      },
      // Sắp xếp
      sort: {
        asc: 'Tăng dần',
        desc: 'Giảm dần',
        clear: 'Xóa sắp xếp'
      },
      // Xuất
      export: {
        title: 'Xuất dữ liệu',
        filename: 'Tên tệp',
        type: 'Loại tệp',
        scope: 'Phạm vi xuất',
        scopeAll: 'Tất cả dữ liệu',
        scopeSelected: 'Dữ liệu đã chọn',
        scopeCurrentPage: 'Trang hiện tại',
        includeHeader: 'Bao gồm tiêu đề',
        exporting: 'Đang xuất...',
        success: 'Xuất thành công',
        error: 'Xuất thất bại'
      },
      // Nhập
      import: {
        title: 'Nhập dữ liệu',
        selectFile: 'Chọn tệp',
        dragTip: 'Nhấp hoặc kéo tệp vào đây để tải lên',
        importing: 'Đang nhập...',
        success: 'Nhập thành công',
        error: 'Nhập thất bại',
        preview: 'Xem trước dữ liệu',
        confirm: 'Xác nhận nhập'
      },
      // In
      printConfig: {
        title: 'Cài đặt in',
        pageTitle: 'Tiêu đề trang',
        pageHeader: 'Đầu trang',
        pageFooter: 'Chân trang',
        printAll: 'In tất cả',
        printSelected: 'In đã chọn',
        printCurrentPage: 'In trang hiện tại',
        landscape: 'Ngang',
        portrait: 'Dọc',
        printing: 'Đang in...'
      },
      // Cài đặt cột
      columnSetting: {
        title: 'Cài đặt cột',
        showAll: 'Hiển thị tất cả',
        hideAll: 'Ẩn tất cả',
        reset: 'Đặt lại',
        fixedLeft: 'Cố định bên trái',
        fixedRight: 'Cố định bên phải',
        unfixed: 'Bỏ cố định'
      },
      // Menu ngữ cảnh
      contextMenu: {
        copy: 'Sao chép',
        copyRow: 'Sao chép hàng',
        copyCell: 'Sao chép ô',
        paste: 'Dán',
        insertRowAbove: 'Chèn hàng phía trên',
        insertRowBelow: 'Chèn hàng phía dưới',
        deleteRow: 'Xóa hàng',
        deleteSelectedRows: 'Xóa các hàng đã chọn',
        exportSelected: 'Xuất đã chọn'
      },
      // Lựa chọn
      selection: {
        selectAll: 'Chọn tất cả',
        selectInvert: 'Đảo ngược lựa chọn',
        selectNone: 'Xóa lựa chọn',
        selected: 'Đã chọn {count} mục'
      },
      // Mở rộng
      expand: {
        expandAll: 'Mở rộng tất cả',
        collapseAll: 'Thu gọn tất cả'
      },
      // Cây
      tree: {
        expandAll: 'Mở rộng tất cả',
        collapseAll: 'Thu gọn tất cả',
        expandLevel: 'Mở rộng đến cấp {level}'
      },
      // Kéo
      drag: {
        dragTip: 'Kéo để sắp xếp lại',
        dropTip: 'Thả để đặt'
      }
    },
    // Hộp thông báo
    messagebox: {
      title: 'Thông báo',
      confirm: 'OK',
      cancel: 'Hủy',
      close: 'Đóng',
      error: 'Đầu vào không hợp lệ',
      alert: 'Cảnh báo',
      prompt: 'Nhắc nhở',
      inputPlaceholder: 'Vui lòng nhập'
    },
    // Tải lên
    upload: {
      deleteTip: 'nhấn delete để xóa',
      delete: 'Xóa',
      preview: 'Xem trước',
      continue: 'Tiếp tục',
      upload: 'Nhấp để tải lên',
      tip: 'Nhấp hoặc kéo tệp vào khu vực này để <em>tải lên</em>',
      dragTip: 'Thả tệp vào đây hoặc nhấp để tải lên',
      uploading: 'Đang tải lên...',
      success: 'Tải lên thành công',
      error: 'Tải lên thất bại',
      retry: 'Thử lại',
      cancel: 'Hủy tải lên',
      fileTypeError: 'Loại tệp không được hỗ trợ',
      fileSizeError: 'Kích thước tệp vượt quá giới hạn',
      fileCountError: 'Số lượng tệp vượt quá giới hạn'
    },
    // Biểu mẫu
    form: {
      validationFailed: 'Xác thực thất bại',
      required: 'Bắt buộc',
      pleaseInput: 'Vui lòng nhập',
      pleaseSelect: 'Vui lòng chọn'
    },
    // Nút
    button: {
      loading: 'Đang tải...'
    },
    // Đầu vào
    input: {
      placeholder: 'Vui lòng nhập',
      clear: 'Xóa',
      showPassword: 'Hiển thị mật khẩu',
      hidePassword: 'Ẩn mật khẩu',
      copy: 'Sao chép',
      copied: 'Đã sao chép'
    },
    // Đầu vào số
    inputnumber: {
      placeholder: 'Vui lòng nhập số',
      increase: 'Tăng',
      decrease: 'Giảm'
    },
    // Đầu vào thẻ
    inputtag: {
      placeholder: 'Vui lòng nhập',
      add: 'Thêm',
      remove: 'Xóa'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'Thêm'
    },
    // Quay lại đầu trang
    backtop: {
      text: 'Quay lại đầu trang'
    },
    // Chọn
    select: {
      placeholder: 'Vui lòng chọn',
      noData: 'Không có dữ liệu',
      loading: 'Đang tải...',
      noMatch: 'Không có dữ liệu khớp',
      selectAll: 'Chọn tất cả',
      clearAll: 'Xóa tất cả'
    },
    // Phân trang
    pagination: {
      goto: 'Đi đến',
      page: '',
      total: 'Tổng {total}',
      pageSize: '/trang',
      prev: 'Trước',
      next: 'Tiếp',
      first: 'Đầu',
      last: 'Cuối',
      pageClassifier: ''
    },
    // Xác nhận popup
    popconfirm: {
      confirm: 'OK',
      cancel: 'Hủy',
      dontAskAgain: 'Không hỏi lại'
    },
    // Hộp thoại
    dialog: {
      confirm: 'OK',
      cancel: 'Hủy',
      close: 'Đóng',
      maximize: 'Phóng to',
      restore: 'Khôi phục'
    },
    // Ngăn kéo
    drawer: {
      close: 'Đóng',
      confirm: 'OK',
      cancel: 'Hủy'
    },
    // Menu thả xuống
    dropdown: {
      loading: 'Đang tải...'
    },
    // Hình ảnh
    image: {
      error: 'THẤT BẠI',
      loading: 'Đang tải...',
      preview: 'Xem trước',
      zoomIn: 'Phóng to',
      zoomOut: 'Thu nhỏ',
      rotateLeft: 'Xoay trái',
      rotateRight: 'Xoay phải',
      originalSize: 'Kích thước gốc',
      fullscreen: 'Toàn màn hình'
    },
    // Trình xem hình ảnh
    imageviewer: {
      close: 'Đóng',
      prev: 'Trước',
      next: 'Tiếp',
      zoomIn: 'Phóng to',
      zoomOut: 'Thu nhỏ',
      rotateLeft: 'Xoay trái',
      rotateRight: 'Xoay phải',
      reset: 'Đặt lại',
      fullscreen: 'Toàn màn hình',
      exitFullscreen: 'Thoát toàn màn hình'
    },
    // Cuộn vô hạn
    infinitescroll: {
      loading: 'Đang tải...',
      finished: 'Không còn dữ liệu',
      error: 'Tải thất bại, nhấp để thử lại',
      retry: 'Nhấp để thử lại'
    },
    // Thông báo
    message: {
      close: 'Đóng'
    },
    // Thông báo
    notification: {
      close: 'Đóng'
    },
    // Đang tải
    loading: {
      text: 'Đang tải...'
    },
    // Quay
    spin: {
      text: 'Đang tải...'
    },
    // Đánh giá
    rate: {
      texts: ['Rất kém', 'Thất vọng', 'Bình thường', 'Hài lòng', 'Ngạc nhiên']
    },
    // Cảnh báo
    alert: {
      close: 'Đóng'
    },
    // Thẻ
    tag: {
      close: 'Đóng'
    },
    // Tab
    tabs: {
      close: 'Đóng',
      add: 'Thêm',
      more: 'Thêm'
    },
    // Bước
    steps: {
      finish: 'Hoàn thành',
      process: 'Đang tiến hành',
      wait: 'Chờ đợi',
      error: 'Lỗi'
    },
    // Tiến trình
    progress: {
      success: 'Thành công',
      exception: 'Ngoại lệ',
      warning: 'Cảnh báo'
    },
    // Bộ xương
    skeleton: {
      loading: 'Đang tải...'
    },
    // Trống
    empty: {
      description: 'Không có dữ liệu',
      noData: 'Không có dữ liệu',
      noResult: 'Không có kết quả',
      networkError: 'Lỗi mạng',
      serverError: 'Lỗi máy chủ'
    },
    // Kết quả
    result: {
      success: 'Thành công',
      error: 'Lỗi',
      warning: 'Cảnh báo',
      info: 'Thông tin',
      backHome: 'Về trang chủ'
    },
    // Thác nước
    waterfall: {
      loading: 'Đang tải...',
      noMore: 'Không còn dữ liệu',
      empty: 'Không có dữ liệu'
    },
    // Mô tả
    descriptions: {
      colon: ':'
    },
    // Thanh trượt
    slider: {
      tipFormatter: '{value}'
    },
    // Công tắc
    switch: {
      on: 'BẬT',
      off: 'TẮT'
    },
    // Hộp kiểm
    checkbox: {
      selectAll: 'Chọn tất cả'
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: 'Thu gọn menu',
      expand: 'Mở rộng menu'
    },
    // Thẻ
    card: {
      collapse: 'Thu gọn',
      expand: 'Mở rộng'
    },
    // Thu gọn
    collapse: {
      expand: 'Mở rộng',
      collapse: 'Thu gọn'
    },
    // Gợi ý
    tooltip: {},
    // Popover
    popover: {},
    // Huy hiệu
    badge: {},
    // Avatar
    avatar: {
      error: 'Tải thất bại'
    },
    // Hình mờ
    watermark: {},
    // Dải phân cách
    divider: {},
    // Băng chuyền
    carousel: {
      prev: 'Trước',
      next: 'Tiếp'
    },
    // Marquee
    marquee: {},
    // Gắn cố định
    affix: {},
    // Neo
    anchor: {}
  }
}

export default vi
