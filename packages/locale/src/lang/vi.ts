import type { Language } from '../index'

export const vi: Language = {
  name: 'vi',
  yh: {
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
    colorpicker: {
      confirm: 'OK',
      clear: 'Xóa',
      eyeDropper: 'Ống nhỏ mắt',
      suggestionDark: 'Văn bản trắng là tốt nhất',
      suggestionLight: 'Văn bản đen là tốt nhất',
      recentColors: 'Màu gần đây',
      presetColors: 'Màu đặt trước'
    },
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
    timepicker: {
      confirm: 'OK',
      cancel: 'Hủy',
      now: 'Bây giờ',
      placeholder: 'Chọn giờ',
      startPlaceholder: 'Giờ bắt đầu',
      endPlaceholder: 'Giờ kết thúc',
      selectTime: 'Chọn giờ'
    },
    timeselect: {
      placeholder: 'Chọn giờ'
    },
    tree: {
      emptyText: 'Không có dữ liệu',
      loading: 'Đang tải...',
      checkAll: 'Chọn tất cả',
      uncheckAll: 'Bỏ chọn tất cả',
      expandAll: 'Mở rộng tất cả',
      collapseAll: 'Thu gọn tất cả'
    },
    treeselect: {
      placeholder: 'Chọn',
      emptyText: 'Không có dữ liệu',
      loading: 'Đang tải...',
      noMatch: 'Không có dữ liệu khớp'
    },
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
    autocomplete: {
      loading: 'Đang tải...',
      placeholder: 'Vui lòng nhập',
      noData: 'Không có dữ liệu',
      noMatch: 'Không có dữ liệu khớp'
    },
    countdown: {
      days: 'ngày',
      hours: 'giờ',
      minutes: 'phút',
      seconds: 'giây',
      milliseconds: 'mili giây',
      finished: 'Hoàn thành'
    },
    cascader: {
      noMatch: 'Không có dữ liệu khớp',
      placeholder: 'Chọn',
      loading: 'Đang tải...',
      noData: 'Không có dữ liệu'
    },
    transfer: {
      noMatch: 'Không có dữ liệu khớp',
      noData: 'Không có dữ liệu',
      titles: ['Danh sách 1', 'Danh sách 2'],
      filterPlaceholder: 'Nhập từ khóa',
      noCheckedFormat: '{total} mục',
      hasCheckedFormat: '{checked}/{total} đã chọn',
      searchPlaceholder: 'Nhập từ khóa'
    },
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
      sort: {
        asc: 'Tăng dần',
        desc: 'Giảm dần',
        clear: 'Xóa sắp xếp'
      },
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
      columnSetting: {
        title: 'Cài đặt cột',
        showAll: 'Hiển thị tất cả',
        hideAll: 'Ẩn tất cả',
        reset: 'Đặt lại',
        fixedLeft: 'Cố định bên trái',
        fixedRight: 'Cố định bên phải',
        unfixed: 'Bỏ cố định'
      },
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
      selection: {
        selectAll: 'Chọn tất cả',
        selectInvert: 'Đảo ngược lựa chọn',
        selectNone: 'Xóa lựa chọn',
        selected: 'Đã chọn {count} mục'
      },
      expand: {
        expandAll: 'Mở rộng tất cả',
        collapseAll: 'Thu gọn tất cả'
      },
      tree: {
        expandAll: 'Mở rộng tất cả',
        collapseAll: 'Thu gọn tất cả',
        expandLevel: 'Mở rộng đến cấp {level}'
      },
      drag: {
        dragTip: 'Kéo để sắp xếp lại',
        dropTip: 'Thả để đặt'
      }
    },
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
    form: {
      validationFailed: 'Xác thực thất bại',
      required: 'Bắt buộc',
      pleaseInput: 'Vui lòng nhập',
      pleaseSelect: 'Vui lòng chọn'
    },
    button: {
      loading: 'Đang tải...'
    },
    input: {
      placeholder: 'Vui lòng nhập',
      clear: 'Xóa',
      showPassword: 'Hiển thị mật khẩu',
      hidePassword: 'Ẩn mật khẩu',
      copy: 'Sao chép',
      copied: 'Đã sao chép'
    },
    inputnumber: {
      placeholder: 'Vui lòng nhập số',
      increase: 'Tăng',
      decrease: 'Giảm'
    },
    inputtag: {
      placeholder: 'Vui lòng nhập',
      add: 'Thêm',
      remove: 'Xóa'
    },
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'Thêm'
    },
    backtop: {
      text: 'Quay lại đầu trang'
    },
    select: {
      placeholder: 'Vui lòng chọn',
      noData: 'Không có dữ liệu',
      loading: 'Đang tải...',
      noMatch: 'Không có dữ liệu khớp',
      selectAll: 'Chọn tất cả',
      clearAll: 'Xóa tất cả'
    },
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
    popconfirm: {
      confirm: 'OK',
      cancel: 'Hủy',
      dontAskAgain: 'Không hỏi lại'
    },
    dialog: {
      confirm: 'OK',
      cancel: 'Hủy',
      close: 'Đóng',
      maximize: 'Phóng to',
      restore: 'Khôi phục'
    },
    drawer: {
      close: 'Đóng',
      confirm: 'OK',
      cancel: 'Hủy'
    },
    dropdown: {
      loading: 'Đang tải...'
    },
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
    infinitescroll: {
      loading: 'Đang tải...',
      finished: 'Không còn dữ liệu',
      error: 'Tải thất bại, nhấp để thử lại',
      retry: 'Nhấp để thử lại'
    },
    message: {
      close: 'Đóng'
    },
    notification: {
      close: 'Đóng'
    },
    loading: {
      text: 'Đang tải...'
    },
    spin: {
      text: 'Đang tải...'
    },
    rate: {
      texts: ['Rất kém', 'Thất vọng', 'Bình thường', 'Hài lòng', 'Ngạc nhiên']
    },
    alert: {
      close: 'Đóng'
    },
    tag: {
      close: 'Đóng'
    },
    tabs: {
      close: 'Đóng',
      add: 'Thêm',
      more: 'Thêm'
    },
    steps: {
      finish: 'Hoàn thành',
      process: 'Đang tiến hành',
      wait: 'Chờ đợi',
      error: 'Lỗi'
    },
    progress: {
      success: 'Thành công',
      exception: 'Ngoại lệ',
      warning: 'Cảnh báo'
    },
    skeleton: {
      loading: 'Đang tải...'
    },
    empty: {
      description: 'Không có dữ liệu',
      noData: 'Không có dữ liệu',
      noResult: 'Không có kết quả',
      networkError: 'Lỗi mạng',
      serverError: 'Lỗi máy chủ'
    },
    result: {
      success: 'Thành công',
      error: 'Lỗi',
      warning: 'Cảnh báo',
      info: 'Thông tin',
      backHome: 'Về trang chủ'
    },
    waterfall: {
      loading: 'Đang tải...',
      noMore: 'Không còn dữ liệu',
      empty: 'Không có dữ liệu'
    },
    descriptions: {
      colon: ':'
    },
    slider: {
      tipFormatter: '{value}'
    },
    switch: {
      on: 'BẬT',
      off: 'TẮT'
    },
    checkbox: {
      selectAll: 'Chọn tất cả'
    },
    radio: {},
    menu: {
      collapse: 'Thu gọn menu',
      expand: 'Mở rộng menu'
    },
    card: {
      collapse: 'Thu gọn',
      expand: 'Mở rộng'
    },
    collapse: {
      expand: 'Mở rộng',
      collapse: 'Thu gọn'
    },
    tooltip: {},
    popover: {},
    badge: {},
    avatar: {
      error: 'Tải thất bại'
    },
    watermark: {},
    divider: {},
    carousel: {
      prev: 'Trước',
      next: 'Tiếp'
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
      placeholder: 'Vui lòng nhập',
      loading: 'Đang tải...',
      noData: 'Không có dữ liệu'
    },
    skuselector: {
      placeholder: 'Chọn thông số',
      emptyText: 'Không có thông số',
      stock: 'Tồn kho',
      price: 'Giá',
      selected: 'Đã chọn',
      outOfStock: 'Hết hàng'
    },
    productcard: {
      viewDetails: 'Xem chi tiết',
      buyNow: 'Mua ngay',
      addToCart: 'Thêm vào giỏ',
      sold: 'Đã bán',
      soldOut: 'Hết hàng',
      vip: 'Thành viên'
    },
    price: {
      original: 'Giá gốc'
    },
    couponcard: {
      available: 'Nhận ngay',
      used: 'Đã dùng',
      expired: 'Hết hạn',
      received: 'Đã nhận',
      limit: 'Đơn hàng trên {threshold}',
      noThreshold: 'Không yêu cầu tối thiểu',
      validPeriod: 'Thời hạn',
      ruleTitle: 'Quy tắc sử dụng'
    },
    luckydraw: {
      start: 'Bắt đầu',
      drawing: 'Đang quay...',
      end: 'Trúng thưởng!',
      retry: 'Thử lại'
    },
    filterbar: {
      all: 'Tất cả',
      sort: 'Sắp xếp',
      filter: 'Lọc',
      cancel: 'Hủy',
      reset: 'Đặt lại',
      confirm: 'Xác nhận',
      noOptions: 'Không có tùy chọn',
      asc: 'Tăng dần',
      desc: 'Giảm dần',
      selected: 'Đã chọn'
    },
    submitbar: {
      total: 'Tổng: ',
      selected: 'Đã chọn {count}',
      submit: 'Thanh toán',
      allSelect: 'Chọn tất cả'
    },
    categorynav: {
      all: 'Tất cả',
      noData: 'Không có dữ liệu',
      loading: 'Đang tải...'
    },
    smartaddress: {
      placeholder: 'Dán địa chỉ vào đây để tự động nhận diện tên, số điện thoại và vị trí',
      parse: 'Phân tích thông minh',
      province: 'Tỉnh/Thành phố/Quận',
      city: 'Thành phố',
      district: 'Quận/Huyện',
      street: 'Đường/Thị trấn',
      detail: 'Địa chỉ chi tiết',
      phone: 'Điện thoại',
      name: 'Người nhận',
      parseSuccess: 'Phân tích địa chỉ thành công',
      parseFailed: 'Phân tích thất bại, vui lòng nhập thủ công',
      required: 'Vui lòng nhập đầy đủ địa chỉ',
      provinceKeywords: ['Tỉnh', 'Thành phố'],
      cityKeywords: ['Thành phố', 'Thị xã'],
      districtKeywords: ['Quận', 'Huyện', 'Phường'],
      streetKeywords: ['Đường', 'Phố', 'Ngõ', 'Ấp']
    },
    ganttchart: {
      taskName: 'Tên nhiệm vụ',
      searchPlaceholder: 'Tìm kiếm nhiệm vụ...',
      zoom: 'Thu phóng',
      day: 'Ngày',
      week: 'Tuần',
      month: 'Tháng',
      year: 'Năm',
      milestone: 'Mốc'
    },
    imagemagnifier: {
      switchToImage: 'Chuyển sang ảnh {index}',
      galleryItem: 'Thư viện {index}',
      close: 'Đóng'
    },
    ai: {
      bubble: {
        citations: 'Trích dẫn'
      },
      mention: {
        placeholder: '@ Đề cập Agent, Tài liệu hoặc Bảng...',
        agent: 'Agent',
        document: 'Tài liệu',
        table: 'Bảng',
        knowledge: 'Kiến thức',
        file: 'File'
      },
      codeBlock: {
        copyCode: 'Sao chép mã',
        copied: 'Đã sao chép!',
        run: 'Chạy mã',
        edit: 'Chỉnh sửa',
        save: 'Lưu',
        cancel: 'Hủy'
      },
      codeRunner: {
        run: 'Chạy',
        stop: 'Dừng',
        clear: 'Xóa',
        reset: 'Đặt lại',
        placeholder: 'Nhấn Chạy để thực thi mã...'
      },
      sender: {
        placeholder: 'Gửi tin nhắn...',
        dragTip: 'Thả để tải tệp lên',
        noCommands: 'No matching commands found'
      },
      thoughtChain: {
        thoughtProcess: 'Quá trình suy nghĩ',
        thinking: 'Đang suy nghĩ...',
        defaultTitle: 'Bước mới',
        addNode: 'Thêm bước'
      },
      thinking: {
        start: 'Bắt đầu suy nghĩ',
        thinking: 'Đang suy nghĩ...',
        complete: 'Suy nghĩ hoàn tất',
        error: 'Lỗi suy nghĩ'
      },
      welcome: {
        title: 'Xin chào, tôi là YH AI',
        description:
          'Tôi có thể giúp bạn với lập trình, dịch tài liệu hoặc viết sáng tạo. Tôi có thể giúp gì cho bạn hôm nay?'
      },
      action: {
        copy: 'Sao chép',
        regenerate: 'Tạo lại',
        share: 'Chia sẻ',
        like: 'Thích',
        dislike: 'Không thích',
        edit: 'Chỉnh sửa',
        delete: 'Xóa'
      },
      artifacts: {
        preview: 'Xem trước',
        inline: 'Nội dòng',
        code: 'Mã nguồn',
        versions: 'Phiên bản',
        rendering: 'Đang hiển thị component...',
        renderingChart: 'Đang hiển thị biểu đồ...',
        renderingCanvas: 'Đang chuẩn bị canvas...',
        chartLoadError: 'Chart loading failed'
      },
      voice: {
        trigger: 'Nhấn để nói',
        listening: 'Đang nghe...'
      },
      agent: {
        uses: 'sử dụng',
        use: 'Sử dụng ngay',
        favorite: 'Yêu thích',
        unfavorite: 'Bỏ yêu thích',
        share: 'Chia sẻ',
        online: 'Trực tuyến',
        offline: 'Ngoại tuyến',
        busy: 'Bận',
        verified: 'Đã xác minh',
        rating: 'Đánh giá',
        reviews: 'đánh giá',
        responseTime: 'Thời gian phản hồi TB',
        ms: 'ms'
      },
      sources: {
        references: 'Tài liệu tham khảo',
        referencedSources: 'Nguồn được trích dẫn',
        relevant: 'Mức độ liên quan',
        viewOriginal: 'Xem bản gốc',
        showAll: 'Hiển thị tất cả',
        more: 'nguồn khác',
        drawerTitle: 'Tài liệu tham khảo',
        expandMore: 'Hiển thị thêm',
        collapseMore: 'Thu gọn',
        noSources: 'Không có nguồn',
        today: 'Hôm nay',
        last7Days: '7 ngày trước',
        last30Days: '30 ngày trước',
        earlier: 'Trước đó',
        pinned: 'Đã ghim'
      },
      conversations: {
        today: 'Hôm nay',
        last7Days: '7 ngày trước',
        last30Days: '30 ngày trước',
        earlier: 'Trước đó',
        pinned: 'Đã ghim',
        pin: 'Ghim',
        unpin: 'Bỏ ghim',
        newConversation: 'Cuộc trò chuyện mới',
        noData: 'Chưa có cuộc trò chuyện nào',
        rename: 'Đổi tên',
        delete: 'Xóa',
        deleteConfirm: 'Xác nhận xóa cuộc trò chuyện này?'
      },
      attachments: {
        dropTip: 'Thả tệp vào đây để tải lên',
        clickToUpload: 'Nhấp hoặc kéo tệp để tải lên',
        uploadSuccess: 'Tải lên thành công',
        uploadError: 'Tải lên thất bại',
        deleteConfirm: 'Bạn có chắc muốn xóa tệp này không?',
        fileTooLarge: 'Kích thước tệp không được vượt quá {size}',
        invalidFileType: 'Loại tệp không hợp lệ'
      },
      mermaid: {
        image: 'Hình ảnh',
        code: 'Mã',
        zoomIn: 'Phóng to',
        zoomOut: 'Thu nhỏ',
        reset: 'Đặt lại',
        download: 'Tải xuống',
        copyCode: 'Sao chép mã',
        rendering: 'Đang dựng...',
        renderError: 'Dựng thất bại',
        renderSuccess: 'Dựng thành công',
        retry: 'Thử lại'
      }
    }
  }
}

export default vi
