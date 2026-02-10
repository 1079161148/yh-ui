import type { Language } from '../index'

export const th: Language = {
  name: 'th',
  yh: {
    // ทั่วไป
    common: {
      yes: 'ใช่',
      no: 'ไม่',
      confirm: 'ยืนยัน',
      cancel: 'ยกเลิก',
      loading: 'กำลังโหลด',
      close: 'ปิด',
      clear: 'ล้าง',
      reset: 'รีเซ็ต',
      save: 'บันทึก',
      delete: 'ลบ',
      edit: 'แก้ไข',
      add: 'เพิ่ม',
      search: 'ค้นหา',
      refresh: 'รีเฟรช',
      expand: 'ขยาย',
      collapse: 'ย่อ',
      more: 'เพิ่มเติม',
      noData: 'ไม่มีข้อมูล',
      noMatch: 'ไม่มีข้อมูลที่ตรงกัน',
      selectAll: 'เลือกทั้งหมด',
      unselectAll: 'ยกเลิกการเลือกทั้งหมด'
    },
    // ตัวเลือกสี
    colorpicker: {
      confirm: 'ตกลง',
      clear: 'ล้าง',
      eyeDropper: 'หยดสี',
      suggestionDark: 'ข้อความสีขาวดีที่สุด',
      suggestionLight: 'ข้อความสีดำดีที่สุด',
      recentColors: 'สีล่าสุด',
      presetColors: 'สีที่กำหนดไว้ล่วงหน้า'
    },
    // ตัวเลือกวันที่
    datepicker: {
      now: 'ตอนนี้',
      today: 'วันนี้',
      cancel: 'ยกเลิก',
      clear: 'ล้าง',
      confirm: 'ตกลง',
      selectDate: 'เลือกวันที่',
      selectTime: 'เลือกเวลา',
      startDate: 'วันที่เริ่มต้น',
      startTime: 'เวลาเริ่มต้น',
      endDate: 'วันที่สิ้นสุด',
      endTime: 'เวลาสิ้นสุด',
      year: '',
      month: '',
      day: '',
      week: 'สัปดาห์',
      monthBeforeYear: true,
      prevYear: 'ปีที่แล้ว',
      nextYear: 'ปีหน้า',
      prevMonth: 'เดือนที่แล้ว',
      nextMonth: 'เดือนหน้า',
      weeks: {
        sun: 'อา',
        mon: 'จ',
        tue: 'อ',
        wed: 'พ',
        thu: 'พฤ',
        fri: 'ศ',
        sat: 'ส'
      },
      months: {
        jan: 'ม.ค.',
        feb: 'ก.พ.',
        mar: 'มี.ค.',
        apr: 'เม.ย.',
        may: 'พ.ค.',
        jun: 'มิ.ย.',
        jul: 'ก.ค.',
        aug: 'ส.ค.',
        sep: 'ก.ย.',
        oct: 'ต.ค.',
        nov: 'พ.ย.',
        dec: 'ธ.ค.'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // ตัวเลือกเวลา
    timepicker: {
      confirm: 'ตกลง',
      cancel: 'ยกเลิก',
      now: 'ตอนนี้',
      placeholder: 'เลือกเวลา',
      startPlaceholder: 'เวลาเริ่มต้น',
      endPlaceholder: 'เวลาสิ้นสุด',
      selectTime: 'เลือกเวลา'
    },
    // การเลือกเวลา
    timeselect: {
      placeholder: 'เลือกเวลา'
    },
    // 树
    tree: {
      emptyText: 'ไม่มีข้อมูล',
      loading: 'กำลังโหลด...',
      checkAll: 'เลือกทั้งหมด',
      uncheckAll: 'ยกเลิกการเลือกทั้งหมด',
      expandAll: 'ขยายทั้งหมด',
      collapseAll: 'ย่อทั้งหมด'
    },
    // การเลือกต้นไม้
    treeselect: {
      placeholder: 'เลือก',
      emptyText: 'ไม่มีข้อมูล',
      loading: 'กำลังโหลด...',
      noMatch: 'ไม่มีข้อมูลที่ตรงกัน'
    },
    // ปฏิทิน
    calendar: {
      prevMonth: 'เดือนที่แล้ว',
      nextMonth: 'เดือนหน้า',
      prevYear: 'ปีที่แล้ว',
      nextYear: 'ปีหน้า',
      today: 'วันนี้',
      week: 'สัปดาห์',
      holiday: 'วันหยุด',
      workday: 'วันทำงาน',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'อา',
        mon: 'จ',
        tue: 'อ',
        wed: 'พ',
        thu: 'พฤ',
        fri: 'ศ',
        sat: 'ส'
      }
    },
    // การเติมอัตโนมัติ
    autocomplete: {
      loading: 'กำลังโหลด...',
      placeholder: 'กรุณากรอก',
      noData: 'ไม่มีข้อมูล',
      noMatch: 'ไม่มีข้อมูลที่ตรงกัน'
    },
    // นับถอยหลัง
    countdown: {
      days: 'วัน',
      hours: 'ชั่วโมง',
      minutes: 'นาที',
      seconds: 'วินาที',
      milliseconds: 'มิลลิวินาที',
      finished: 'เสร็จสิ้น'
    },
    // การเลือกแบบคาสเคด
    cascader: {
      noMatch: 'ไม่มีข้อมูลที่ตรงกัน',
      placeholder: 'เลือก',
      loading: 'กำลังโหลด...',
      noData: 'ไม่มีข้อมูล'
    },
    // การโอนย้าย
    transfer: {
      noMatch: 'ไม่มีข้อมูลที่ตรงกัน',
      noData: 'ไม่มีข้อมูล',
      titles: ['รายการ 1', 'รายการ 2'],
      filterPlaceholder: 'ป้อนคำสำคัญ',
      noCheckedFormat: '{total} รายการ',
      hasCheckedFormat: '{checked}/{total} ที่เลือก',
      searchPlaceholder: 'ป้อนคำสำคัญ'
    },
    // ตาราง
    table: {
      emptyText: 'ไม่มีข้อมูล',
      confirmFilter: 'ยืนยัน',
      resetFilter: 'รีเซ็ต',
      clearFilter: 'ทั้งหมด',
      sumText: 'รวม',
      loading: 'กำลังโหลด...',
      index: 'ดัชนี',
      print: 'พิมพ์',
      cancel: 'ยกเลิก',
      preview: 'ตัวอย่างการพิมพ์',
      printTime: 'เวลาพิมพ์',
      total: 'รวม {total} รายการ',
      page: 'หน้า {page}',
      yes: 'ใช่',
      no: 'ไม่',
      // แถบเครื่องมือ
      toolbar: {
        refresh: 'รีเฟรช',
        density: 'ความหนาแน่น',
        densityDefault: 'ค่าเริ่มต้น',
        densityLarge: 'ใหญ่',
        densitySmall: 'เล็ก',
        columnSetting: 'การตั้งค่าคอลัมน์',
        fullscreen: 'เต็มหน้าจอ',
        exitFullscreen: 'ออกจากเต็มหน้าจอ',
        export: 'ส่งออก',
        import: 'นำเข้า',
        search: 'ค้นหา',
        searchPlaceholder: 'ป้อนคำสำคัญเพื่อค้นหา'
      },
      // ตัวกรอง
      filter: {
        selectAll: 'เลือกทั้งหมด',
        selectInvert: 'กลับการเลือก',
        empty: 'ว่างเปล่า',
        notEmpty: 'ไม่ว่างเปล่า',
        contains: 'ประกอบด้วย',
        notContains: 'ไม่ประกอบด้วย',
        equals: 'เท่ากับ',
        notEquals: 'ไม่เท่ากับ',
        startsWith: 'เริ่มต้นด้วย',
        endsWith: 'ลงท้ายด้วย',
        greaterThan: 'มากกว่า',
        lessThan: 'น้อยกว่า',
        between: 'ระหว่าง'
      },
      // การเรียงลำดับ
      sort: {
        asc: 'จากน้อยไปมาก',
        desc: 'จากมากไปน้อย',
        clear: 'ล้างการเรียงลำดับ'
      },
      // การส่งออก
      export: {
        title: 'ส่งออกข้อมูล',
        filename: 'ชื่อไฟล์',
        type: 'ประเภทไฟล์',
        scope: 'ขอบเขตการส่งออก',
        scopeAll: 'ข้อมูลทั้งหมด',
        scopeSelected: 'ข้อมูลที่เลือก',
        scopeCurrentPage: 'หน้าปัจจุบัน',
        includeHeader: 'รวมส่วนหัว',
        exporting: 'กำลังส่งออก...',
        success: 'ส่งออกสำเร็จ',
        error: 'ส่งออกล้มเหลว'
      },
      // การนำเข้า
      import: {
        title: 'นำเข้าข้อมูล',
        selectFile: 'เลือกไฟล์',
        dragTip: 'คลิกหรือลากไฟล์มาที่นี่เพื่ออัปโหลด',
        importing: 'กำลังนำเข้า...',
        success: 'นำเข้าสำเร็จ',
        error: 'นำเข้าล้มเหลว',
        preview: 'ตัวอย่างข้อมูล',
        confirm: 'ยืนยันการนำเข้า'
      },
      // การพิมพ์
      printConfig: {
        title: 'การตั้งค่าการพิมพ์',
        pageTitle: 'ชื่อหน้า',
        pageHeader: 'ส่วนหัว',
        pageFooter: 'ส่วนท้าย',
        printAll: 'พิมพ์ทั้งหมด',
        printSelected: 'พิมพ์ที่เลือก',
        printCurrentPage: 'พิมพ์หน้าปัจจุบัน',
        landscape: 'แนวนอน',
        portrait: 'แนวตั้ง',
        printing: 'กำลังพิมพ์...'
      },
      // การตั้งค่าคอลัมน์
      columnSetting: {
        title: 'การตั้งค่าคอลัมน์',
        showAll: 'แสดงทั้งหมด',
        hideAll: 'ซ่อนทั้งหมด',
        reset: 'รีเซ็ต',
        fixedLeft: 'ตรึงไปทางซ้าย',
        fixedRight: 'ตรึงไปทางขวา',
        unfixed: 'ยกเลิกการตรึง'
      },
      // เมนูบริบท
      contextMenu: {
        copy: 'คัดลอก',
        copyRow: 'คัดลอกแถว',
        copyCell: 'คัดลอกเซลล์',
        paste: 'วาง',
        insertRowAbove: 'แทรกแถวด้านบน',
        insertRowBelow: 'แทรกแถวด้านล่าง',
        deleteRow: 'ลบแถว',
        deleteSelectedRows: 'ลบแถวที่เลือก',
        exportSelected: 'ส่งออกที่เลือก'
      },
      // การเลือก
      selection: {
        selectAll: 'เลือกทั้งหมด',
        selectInvert: 'กลับการเลือก',
        selectNone: 'ล้างการเลือก',
        selected: 'เลือก {count} รายการ'
      },
      // ขยาย
      expand: {
        expandAll: 'ขยายทั้งหมด',
        collapseAll: 'ย่อทั้งหมด'
      },
      // ต้นไม้
      tree: {
        expandAll: 'ขยายทั้งหมด',
        collapseAll: 'ย่อทั้งหมด',
        expandLevel: 'ขยายถึงระดับ {level}'
      },
      // ลาก
      drag: {
        dragTip: 'ลากเพื่อจัดเรียงใหม่',
        dropTip: 'ปล่อยเพื่อวาง'
      }
    },
    // กล่องข้อความ
    messagebox: {
      title: 'ข้อความ',
      confirm: 'ตกลง',
      cancel: 'ยกเลิก',
      close: 'ปิด',
      error: 'ข้อมูลไม่ถูกต้อง',
      alert: 'แจ้งเตือน',
      prompt: 'พร้อมท์',
      inputPlaceholder: 'กรุณากรอก'
    },
    // การอัปโหลด
    upload: {
      deleteTip: 'กด delete เพื่อลบ',
      delete: 'ลบ',
      preview: 'ตัวอย่าง',
      continue: 'ดำเนินการต่อ',
      upload: 'คลิกเพื่ออัปโหลด',
      tip: 'คลิกหรือลากไฟล์มาที่นี่เพื่อ<em>อัปโหลด</em>',
      dragTip: 'วางไฟล์ที่นี่หรือคลิกเพื่ออัปโหลด',
      uploading: 'กำลังอัปโหลด...',
      success: 'อัปโหลดสำเร็จ',
      error: 'อัปโหลดล้มเหลว',
      retry: 'ลองอีกครั้ง',
      cancel: 'ยกเลิกการอัปโหลด',
      fileTypeError: 'ประเภทไฟล์ไม่รองรับ',
      fileSizeError: 'ขนาดไฟล์เกินขีดจำกัด',
      fileCountError: 'จำนวนไฟล์เกินขีดจำกัด'
    },
    // ฟอร์ม
    form: {
      validationFailed: 'การตรวจสอบล้มเหลว',
      required: 'จำเป็น',
      pleaseInput: 'กรุณากรอก',
      pleaseSelect: 'กรุณาเลือก'
    },
    // ปุ่ม
    button: {
      loading: 'กำลังโหลด...'
    },
    // การป้อนข้อมูล
    input: {
      placeholder: 'กรุณากรอก',
      clear: 'ล้าง',
      showPassword: 'แสดงรหัสผ่าน',
      hidePassword: 'ซ่อนรหัสผ่าน',
      copy: 'คัดลอก',
      copied: 'คัดลอกแล้ว'
    },
    // การป้อนตัวเลข
    inputnumber: {
      placeholder: 'กรุณากรอกตัวเลข',
      increase: 'เพิ่ม',
      decrease: 'ลด'
    },
    // การป้อนแท็ก
    inputtag: {
      placeholder: 'กรุณากรอก',
      add: 'เพิ่ม',
      remove: 'ลบ'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'เพิ่มเติม'
    },
    // กลับขึ้นด้านบน
    backtop: {
      text: 'กลับขึ้นด้านบน'
    },
    // การเลือก
    select: {
      placeholder: 'กรุณาเลือก',
      noData: 'ไม่มีข้อมูล',
      loading: 'กำลังโหลด...',
      noMatch: 'ไม่มีข้อมูลที่ตรงกัน',
      selectAll: 'เลือกทั้งหมด',
      clearAll: 'ล้างทั้งหมด'
    },
    // การแบ่งหน้า
    pagination: {
      goto: 'ไปที่',
      page: '',
      total: 'รวม {total}',
      pageSize: '/หน้า',
      prev: 'ก่อนหน้า',
      next: 'ถัดไป',
      first: 'แรก',
      last: 'สุดท้าย',
      pageClassifier: ''
    },
    // การยืนยันแบบป๊อปอัป
    popconfirm: {
      confirm: 'ตกลง',
      cancel: 'ยกเลิก',
      dontAskAgain: 'ไม่ถามอีก'
    },
    // กล่องโต้ตอบ
    dialog: {
      confirm: 'ตกลง',
      cancel: 'ยกเลิก',
      close: 'ปิด',
      maximize: 'ขยายใหญ่สุด',
      restore: 'คืนค่า'
    },
    // ลิ้นชัก
    drawer: {
      close: 'ปิด',
      confirm: 'ตกลง',
      cancel: 'ยกเลิก'
    },
    // เมนูแบบดรอปดาวน์
    dropdown: {
      loading: 'กำลังโหลด...'
    },
    // รูปภาพ
    image: {
      error: 'ล้มเหลว',
      loading: 'กำลังโหลด...',
      preview: 'ตัวอย่าง',
      zoomIn: 'ขยาย',
      zoomOut: 'ย่อ',
      rotateLeft: 'หมุนซ้าย',
      rotateRight: 'หมุนขวา',
      originalSize: 'ขนาดเดิม',
      fullscreen: 'เต็มหน้าจอ'
    },
    // ตัวดูรูปภาพ
    imageviewer: {
      close: 'ปิด',
      prev: 'ก่อนหน้า',
      next: 'ถัดไป',
      zoomIn: 'ขยาย',
      zoomOut: 'ย่อ',
      rotateLeft: 'หมุนซ้าย',
      rotateRight: 'หมุนขวา',
      reset: 'รีเซ็ต',
      fullscreen: 'เต็มหน้าจอ',
      exitFullscreen: 'ออกจากเต็มหน้าจอ'
    },
    // การเลื่อนไม่สิ้นสุด
    infinitescroll: {
      loading: 'กำลังโหลด...',
      finished: 'ไม่มีข้อมูลเพิ่มเติม',
      error: 'โหลดล้มเหลว คลิกเพื่อลองอีกครั้ง',
      retry: 'คลิกเพื่อลองอีกครั้ง'
    },
    // ข้อความ
    message: {
      close: 'ปิด'
    },
    // การแจ้งเตือน
    notification: {
      close: 'ปิด'
    },
    // การโหลด
    loading: {
      text: 'กำลังโหลด...'
    },
    // การหมุน
    spin: {
      text: 'กำลังโหลด...'
    },
    // การให้คะแนน
    rate: {
      texts: ['แย่มาก', 'ผิดหวัง', 'พอใช้', 'พอใจ', 'ประหลาดใจ']
    },
    // การแจ้งเตือน
    alert: {
      close: 'ปิด'
    },
    // แท็ก
    tag: {
      close: 'ปิด'
    },
    // แท็บ
    tabs: {
      close: 'ปิด',
      add: 'เพิ่ม',
      more: 'เพิ่มเติม'
    },
    // ขั้นตอน
    steps: {
      finish: 'เสร็จสิ้น',
      process: 'กำลังดำเนินการ',
      wait: 'รอ',
      error: 'ข้อผิดพลาด'
    },
    // ความคืบหน้า
    progress: {
      success: 'สำเร็จ',
      exception: 'ข้อยกเว้น',
      warning: 'คำเตือน'
    },
    // โครงกระดูก
    skeleton: {
      loading: 'กำลังโหลด...'
    },
    // ว่างเปล่า
    empty: {
      description: 'ไม่มีข้อมูล',
      noData: 'ไม่มีข้อมูล',
      noResult: 'ไม่มีผลลัพธ์',
      networkError: 'ข้อผิดพลาดเครือข่าย',
      serverError: 'ข้อผิดพลาดเซิร์ฟเวอร์'
    },
    // ผลลัพธ์
    result: {
      success: 'สำเร็จ',
      error: 'ข้อผิดพลาด',
      warning: 'คำเตือน',
      info: 'ข้อมูล',
      backHome: 'กลับหน้าแรก'
    },
    // น้ำตก
    waterfall: {
      loading: 'กำลังโหลด...',
      noMore: 'ไม่มีข้อมูลเพิ่มเติม',
      empty: 'ไม่มีข้อมูล'
    },
    // คำอธิบาย
    descriptions: {
      colon: ':'
    },
    // สไลเดอร์
    slider: {
      tipFormatter: '{value}'
    },
    // สวิตช์
    switch: {
      on: 'เปิด',
      off: 'ปิด'
    },
    // กล่องกาเครื่องหมาย
    checkbox: {
      selectAll: 'เลือกทั้งหมด'
    },
    // วิทยุ
    radio: {},
    // เมนู
    menu: {
      collapse: 'ย่อเมนู',
      expand: 'ขยายเมนู'
    },
    // การ์ด
    card: {
      collapse: 'ย่อ',
      expand: 'ขยาย'
    },
    // ย่อ
    collapse: {
      expand: 'ขยาย',
      collapse: 'ย่อ'
    },
    // คำแนะนำ
    tooltip: {},
    // ป๊อปโอเวอร์
    popover: {},
    // ตรา
    badge: {},
    // อวตาร
    avatar: {
      error: 'โหลดล้มเหลว'
    },
    // ลายน้ำ
    watermark: {},
    // ตัวแบ่ง
    divider: {},
    // ภาพหมุน
    carousel: {
      prev: 'ก่อนหน้า',
      next: 'ถัดไป'
    },
    // มาร์ควี
    marquee: {},
    // การตรึง
    affix: {},
    // สมอ
    anchor: {}
  }
}

export default th
