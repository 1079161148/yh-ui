import type { Language } from '../index'

export const ko: Language = {
  name: 'ko',
  yh: {
    common: {
      yes: '예',
      no: '아니오',
      confirm: '확인',
      cancel: '취소',
      loading: '로딩 중',
      close: '닫기',
      clear: '지우기',
      reset: '초기화',
      save: '저장',
      delete: '삭제',
      edit: '편집',
      add: '추가',
      search: '검색',
      refresh: '새로고침',
      expand: '펼치기',
      collapse: '접기',
      more: '더 보기',
      noData: '데이터 없음',
      noMatch: '일치하는 데이터 없음',
      selectAll: '전체 선택',
      unselectAll: '선택 해제'
    },
    colorpicker: {
      confirm: '확인',
      clear: '지우기',
      eyeDropper: '스포이드',
      suggestionDark: '흰색 텍스트 권장',
      suggestionLight: '검은색 텍스트 권장',
      recentColors: '최근 사용 색상',
      presetColors: '기본 색상'
    },
    datepicker: {
      now: '현재',
      today: '오늘',
      cancel: '취소',
      clear: '지우기',
      confirm: '확인',
      selectDate: '날짜 선택',
      selectTime: '시간 선택',
      startDate: '시작 날짜',
      startTime: '시작 시간',
      endDate: '종료 날짜',
      endTime: '종료 시간',
      year: '년',
      month: '월',
      day: '일',
      week: '주',
      monthBeforeYear: false,
      prevYear: '이전 해',
      nextYear: '다음 해',
      prevMonth: '이전 달',
      nextMonth: '다음 달',
      weeks: {
        sun: '일',
        mon: '월',
        tue: '화',
        wed: '수',
        thu: '목',
        fri: '금',
        sat: '토'
      },
      months: {
        jan: '1월',
        feb: '2월',
        mar: '3월',
        apr: '4월',
        may: '5월',
        jun: '6월',
        jul: '7월',
        aug: '8월',
        sep: '9월',
        oct: '10월',
        nov: '11월',
        dec: '12월'
      },
      quarters: {
        q1: '1분기',
        q2: '2분기',
        q3: '3분기',
        q4: '4분기'
      }
    },
    timepicker: {
      confirm: '확인',
      cancel: '취소',
      now: '현재',
      placeholder: '시간 선택',
      startPlaceholder: '시작 시간',
      endPlaceholder: '종료 시간',
      selectTime: '시간 선택'
    },
    timeselect: {
      placeholder: '시간 선택'
    },
    tree: {
      emptyText: '데이터 없음',
      loading: '로딩 중...',
      checkAll: '전체 선택',
      uncheckAll: '전체 해제',
      expandAll: '모두 펼치기',
      collapseAll: '모두 접기'
    },
    treeselect: {
      placeholder: '선택하세요',
      emptyText: '데이터 없음',
      loading: '로딩 중...',
      noMatch: '일치하는 데이터 없음'
    },
    calendar: {
      prevMonth: '이전 달',
      nextMonth: '다음 달',
      prevYear: '이전 해',
      nextYear: '다음 해',
      today: '오늘',
      week: '주',
      holiday: '휴',
      workday: '출',
      monthHeaderFormat: 'YYYY년 M월',
      weeks: {
        sun: '일',
        mon: '월',
        tue: '화',
        wed: '수',
        thu: '목',
        fri: '금',
        sat: '토'
      }
    },
    autocomplete: {
      loading: '로딩 중...',
      placeholder: '입력하세요',
      noData: '데이터 없음',
      noMatch: '일치하는 데이터 없음'
    },
    countdown: {
      days: '일',
      hours: '시간',
      minutes: '분',
      seconds: '초',
      milliseconds: '밀리초',
      finished: '종료'
    },
    cascader: {
      noMatch: '일치하는 데이터 없음',
      placeholder: '선택하세요',
      loading: '로딩 중...',
      noData: '데이터 없음'
    },
    transfer: {
      noMatch: '일치하는 데이터 없음',
      noData: '데이터 없음',
      titles: ['목록 1', '목록 2'],
      filterPlaceholder: '검색어 입력',
      noCheckedFormat: '총 {total} 항목',
      hasCheckedFormat: '{checked}/{total} 선택됨',
      searchPlaceholder: '검색어 입력'
    },
    table: {
      emptyText: '데이터 없음',
      confirmFilter: '필터',
      resetFilter: '초기화',
      clearFilter: '전체',
      sumText: '합계',
      loading: '로딩 중...',
      index: '번호',
      print: '인쇄',
      cancel: '취소',
      preview: '인쇄 미리보기',
      printTime: '인쇄 시간',
      total: '총 {total} 건',
      page: '{page} 페이지',
      yes: '예',
      no: '아니오',
      toolbar: {
        refresh: '새로고침',
        density: '밀도',
        densityDefault: '기본',
        densityLarge: '넓게',
        densitySmall: '좁게',
        columnSetting: '열 설정',
        fullscreen: '전체 화면',
        exitFullscreen: '전체 화면 종료',
        export: '내보내기',
        import: '가져오기',
        search: '검색',
        searchPlaceholder: '검색어로 검색'
      },
      filter: {
        selectAll: '전체 선택',
        selectInvert: '선택 반전',
        empty: '비어있음',
        notEmpty: '비어있지 않음',
        contains: '포함',
        notContains: '포함하지 않음',
        equals: '같음',
        notEquals: '같지 않음',
        startsWith: '시작',
        endsWith: '끝',
        greaterThan: '보다 큼',
        lessThan: '보다 작음',
        between: '사이'
      },
      sort: {
        asc: '오름차순',
        desc: '내림차순',
        clear: '정렬 해제'
      },
      export: {
        title: '데이터 내보내기',
        filename: '파일명',
        type: '파일 형식',
        scope: '내보내기 범위',
        scopeAll: '모든 데이터',
        scopeSelected: '선택된 데이터',
        scopeCurrentPage: '현재 페이지',
        includeHeader: '헤더 포함',
        exporting: '내보내는 중...',
        success: '내보내기 성공',
        error: '내보내기 실패'
      },
      import: {
        title: '데이터 가져오기',
        selectFile: '파일 선택',
        dragTip: '클릭 또는 파일을 드래그하여 업로드',
        importing: '가져오는 중...',
        success: '가져오기 성공',
        error: '가져오기 실패',
        preview: '데이터 미리보기',
        confirm: '가져오기 확인'
      },
      printConfig: {
        title: '인쇄 설정',
        pageTitle: '페이지 제목',
        pageHeader: '머리글',
        pageFooter: '바닥글',
        printAll: '전체 인쇄',
        printSelected: '선택 인쇄',
        printCurrentPage: '현재 페이지 인쇄',
        landscape: '가로',
        portrait: '세로',
        printing: '인쇄 중...'
      },
      columnSetting: {
        title: '열 설정',
        showAll: '모두 표시',
        hideAll: '모두 숨기기',
        reset: '초기화',
        fixedLeft: '왼쪽 고정',
        fixedRight: '오른쪽 고정',
        unfixed: '고정 해제'
      },
      contextMenu: {
        copy: '복사',
        copyRow: '행 복사',
        copyCell: '셀 복사',
        paste: '붙여넣기',
        insertRowAbove: '위에 행 삽입',
        insertRowBelow: '아래에 행 삽입',
        deleteRow: '행 삭제',
        deleteSelectedRows: '선택된 행 삭제',
        exportSelected: '선택 내보내기'
      },
      selection: {
        selectAll: '전체 선택',
        selectInvert: '선택 반전',
        selectNone: '선택 해제',
        selected: '{count} 항목 선택됨'
      },
      expand: {
        expandAll: '모두 펼치기',
        collapseAll: '모두 접기'
      },
      tree: {
        expandAll: '모두 펼치기',
        collapseAll: '모두 접기',
        expandLevel: '레벨 {level} 까지 펼치기'
      },
      drag: {
        dragTip: '드래그하여 순서 변경',
        dropTip: '놓아서 배치'
      }
    },
    messagebox: {
      title: '메시지',
      confirm: '확인',
      cancel: '취소',
      close: '닫기',
      error: '입력이 올바르지 않습니다',
      alert: '알림',
      prompt: '프롬프트',
      inputPlaceholder: '입력하세요'
    },
    upload: {
      deleteTip: 'Delete 키로 삭제',
      delete: '삭제',
      preview: '미리보기',
      continue: '계속',
      upload: '클릭하여 업로드',
      tip: '파일을 여기로 드래그하거나 <em>클릭하여 업로드</em>',
      dragTip: '파일을 드래그하여 업로드',
      uploading: '업로드 중...',
      success: '업로드 성공',
      error: '업로드 실패',
      retry: '다시 시도',
      cancel: '업로드 취소',
      fileTypeError: '지원하지 않는 파일 형식',
      fileSizeError: '파일 크기 초과',
      fileCountError: '파일 개수 초과'
    },
    form: {
      validationFailed: '유효성 검사 실패',
      required: '필수',
      pleaseInput: '입력하세요',
      pleaseSelect: '선택하세요'
    },
    button: {
      loading: '로딩 중...'
    },
    input: {
      placeholder: '입력하세요',
      clear: '지우기',
      showPassword: '비밀번호 표시',
      hidePassword: '비밀번호 숨기기',
      copy: '복사',
      copied: '복사됨'
    },
    inputnumber: {
      placeholder: '숫자 입력',
      increase: '증가',
      decrease: '감소'
    },
    inputtag: {
      placeholder: '입력하세요',
      add: '추가',
      remove: '제거'
    },
    breadcrumb: {
      label: '이동 경로',
      more: '더 보기'
    },
    backtop: {
      text: '맨 위로'
    },
    select: {
      placeholder: '선택하세요',
      noData: '데이터 없음',
      loading: '로딩 중...',
      noMatch: '일치하는 데이터 없음',
      selectAll: '전체 선택',
      clearAll: '전체 지우기'
    },
    pagination: {
      goto: '',
      page: '페이지로',
      total: '총 {total} 건',
      pageSize: '건/페이지',
      prev: '이전',
      next: '다음',
      first: '처음',
      last: '마지막',
      pageClassifier: '페이지'
    },
    popconfirm: {
      confirm: '확인',
      cancel: '취소',
      dontAskAgain: '다시 묻지 않기'
    },
    dialog: {
      confirm: '확인',
      cancel: '취소',
      close: '닫기',
      maximize: '최대화',
      restore: '복원'
    },
    drawer: {
      close: '닫기',
      confirm: '확인',
      cancel: '취소'
    },
    dropdown: {
      loading: '로딩 중...'
    },
    image: {
      error: '로드 실패',
      loading: '로딩 중...',
      preview: '미리보기',
      zoomIn: '확대',
      zoomOut: '축소',
      rotateLeft: '왼쪽으로 회전',
      rotateRight: '오른쪽으로 회전',
      originalSize: '원본 크기',
      fullscreen: '전체 화면'
    },
    imageviewer: {
      close: '닫기',
      prev: '이전',
      next: '다음',
      zoomIn: '확대',
      zoomOut: '축소',
      rotateLeft: '왼쪽으로 회전',
      rotateRight: '오른쪽으로 회전',
      reset: '초기화',
      fullscreen: '전체 화면',
      exitFullscreen: '전체 화면 종료'
    },
    infinitescroll: {
      loading: '로딩 중...',
      finished: '더 이상 데이터가 없습니다',
      error: '로드 실패, 클릭하여 다시 시도',
      retry: '클릭하여 다시 시도'
    },
    message: {
      close: '닫기'
    },
    notification: {
      close: '닫기'
    },
    loading: {
      text: '로딩 중...'
    },
    spin: {
      text: '로딩 중...'
    },
    rate: {
      texts: ['최악', '나쁨', '보통', '좋음', '훌륭함']
    },
    alert: {
      close: '닫기'
    },
    tag: {
      close: '닫기'
    },
    tabs: {
      close: '닫기',
      add: '추가',
      more: '더 보기'
    },
    steps: {
      finish: '완료',
      process: '진행 중',
      wait: '대기 중',
      error: '오류'
    },
    progress: {
      success: '성공',
      exception: '예외',
      warning: '경고'
    },
    skeleton: {
      loading: '로딩 중...'
    },
    empty: {
      description: '데이터 없음',
      noData: '데이터 없음',
      noResult: '결과 없음',
      networkError: '네트워크 오류',
      serverError: '서버 오류'
    },
    result: {
      success: '성공',
      error: '오류',
      warning: '경고',
      info: '정보',
      backHome: '홈으로 돌아가기'
    },
    waterfall: {
      loading: '로딩 중...',
      noMore: '더 이상 데이터가 없습니다',
      empty: '데이터 없음'
    },
    descriptions: {
      colon: ':'
    },
    slider: {
      tipFormatter: '{value}'
    },
    switch: {
      on: '켜기',
      off: '끄기'
    },
    checkbox: {
      selectAll: '전체 선택'
    },
    radio: {},
    menu: {
      collapse: '메뉴 접기',
      expand: '메뉴 펼치기'
    },
    card: {
      collapse: '접기',
      expand: '펼치기'
    },
    collapse: {
      expand: '펼치기',
      collapse: '접기'
    },
    tooltip: {},
    popover: {},
    badge: {},
    avatar: {
      error: '로드 실패'
    },
    watermark: {},
    divider: {},
    carousel: {
      prev: '이전',
      next: '다음'
    },
    marquee: {},
    affix: {},
    anchor: {},
    // 提及
    mention: {
      placeholder: '입력하세요',
      loading: '로딩 중...',
      noData: '데이터 없음'
    },
    // AI Components
    ai: {
      codeBlock: {
        copyCode: '코드 복사',
        copied: '복사됨!'
      },
      sender: {
        placeholder: '메시지 보내기...'
      },
      thoughtChain: {
        thoughtProcess: '생각 과정',
        thinking: '생각 중...'
      },
      thinking: {
        start: '생각 시작',
        thinking: '생각 중...',
        complete: '생각 완료',
        error: '생각 오류'
      }
    }
  }
}

export default ko
