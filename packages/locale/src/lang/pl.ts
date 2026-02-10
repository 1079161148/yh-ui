import type { Language } from '../index'

export const pl: Language = {
  name: 'pl',
  yh: {
    // Wspólne
    common: {
      yes: 'Tak',
      no: 'Nie',
      confirm: 'Potwierdź',
      cancel: 'Anuluj',
      loading: 'Ładowanie',
      close: 'Zamknij',
      clear: 'Wyczyść',
      reset: 'Resetuj',
      save: 'Zapisz',
      delete: 'Usuń',
      edit: 'Edytuj',
      add: 'Dodaj',
      search: 'Szukaj',
      refresh: 'Odśwież',
      expand: 'Rozwiń',
      collapse: 'Zwiń',
      more: 'Więcej',
      noData: 'Brak danych',
      noMatch: 'Brak pasujących danych',
      selectAll: 'Zaznacz wszystko',
      unselectAll: 'Odznacz wszystko'
    },
    // Wybór koloru
    colorpicker: {
      confirm: 'OK',
      clear: 'Wyczyść',
      eyeDropper: 'Kroplomierz',
      suggestionDark: 'Biały tekst jest najlepszy',
      suggestionLight: 'Czarny tekst jest najlepszy',
      recentColors: 'Ostatnie kolory',
      presetColors: 'Wstępnie ustawione kolory'
    },
    // Wybór daty
    datepicker: {
      now: 'Teraz',
      today: 'Dzisiaj',
      cancel: 'Anuluj',
      clear: 'Wyczyść',
      confirm: 'OK',
      selectDate: 'Wybierz datę',
      selectTime: 'Wybierz czas',
      startDate: 'Data rozpoczęcia',
      startTime: 'Czas rozpoczęcia',
      endDate: 'Data zakończenia',
      endTime: 'Czas zakończenia',
      year: '',
      month: '',
      day: '',
      week: 'Tydzień',
      monthBeforeYear: true,
      prevYear: 'Poprzedni rok',
      nextYear: 'Następny rok',
      prevMonth: 'Poprzedni miesiąc',
      nextMonth: 'Następny miesiąc',
      weeks: {
        sun: 'Nie',
        mon: 'Pon',
        tue: 'Wt',
        wed: 'Śr',
        thu: 'Czw',
        fri: 'Pt',
        sat: 'Sob'
      },
      months: {
        jan: 'Sty',
        feb: 'Lut',
        mar: 'Mar',
        apr: 'Kwi',
        may: 'Maj',
        jun: 'Cze',
        jul: 'Lip',
        aug: 'Sie',
        sep: 'Wrz',
        oct: 'Paź',
        nov: 'Lis',
        dec: 'Gru'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Wybór czasu
    timepicker: {
      confirm: 'OK',
      cancel: 'Anuluj',
      now: 'Teraz',
      placeholder: 'Wybierz czas',
      startPlaceholder: 'Czas rozpoczęcia',
      endPlaceholder: 'Czas zakończenia',
      selectTime: 'Wybierz czas'
    },
    // Wybór czasu
    timeselect: {
      placeholder: 'Wybierz czas'
    },
    // Drzewo
    tree: {
      emptyText: 'Brak danych',
      loading: 'Ładowanie...',
      checkAll: 'Zaznacz wszystko',
      uncheckAll: 'Odznacz wszystko',
      expandAll: 'Rozwiń wszystko',
      collapseAll: 'Zwiń wszystko'
    },
    // Wybór drzewa
    treeselect: {
      placeholder: 'Wybierz',
      emptyText: 'Brak danych',
      loading: 'Ładowanie...',
      noMatch: 'Brak pasujących danych'
    },
    // Kalendarz
    calendar: {
      prevMonth: 'Poprzedni miesiąc',
      nextMonth: 'Następny miesiąc',
      prevYear: 'Poprzedni rok',
      nextYear: 'Następny rok',
      today: 'Dzisiaj',
      week: 'Tydzień',
      holiday: 'Święto',
      workday: 'Praca',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Nie',
        mon: 'Pon',
        tue: 'Wt',
        wed: 'Śr',
        thu: 'Czw',
        fri: 'Pt',
        sat: 'Sob'
      }
    },
    // Autouzupełnianie
    autocomplete: {
      loading: 'Ładowanie...',
      placeholder: 'Wprowadź',
      noData: 'Brak danych',
      noMatch: 'Brak pasujących danych'
    },
    // Odliczanie
    countdown: {
      days: 'dni',
      hours: 'godziny',
      minutes: 'minuty',
      seconds: 'sekundy',
      milliseconds: 'milisekundy',
      finished: 'Zakończono'
    },
    // Wybór kaskadowy
    cascader: {
      noMatch: 'Brak pasujących danych',
      placeholder: 'Wybierz',
      loading: 'Ładowanie...',
      noData: 'Brak danych'
    },
    // Transfer
    transfer: {
      noMatch: 'Brak pasujących danych',
      noData: 'Brak danych',
      titles: ['Lista 1', 'Lista 2'],
      filterPlaceholder: 'Wprowadź słowo kluczowe',
      noCheckedFormat: '{total} elementów',
      hasCheckedFormat: '{checked}/{total} zaznaczonych',
      searchPlaceholder: 'Wprowadź słowo kluczowe'
    },
    // Tabela
    table: {
      emptyText: 'Brak danych',
      confirmFilter: 'Potwierdź',
      resetFilter: 'Resetuj',
      clearFilter: 'Wszystkie',
      sumText: 'Suma',
      loading: 'Ładowanie...',
      index: 'Indeks',
      print: 'Drukuj',
      cancel: 'Anuluj',
      preview: 'Podgląd wydruku',
      printTime: 'Czas drukowania',
      total: 'Razem {total} elementów',
      page: 'Strona {page}',
      yes: 'Tak',
      no: 'Nie',
      // Pasek narzędzi
      toolbar: {
        refresh: 'Odśwież',
        density: 'Gęstość',
        densityDefault: 'Domyślna',
        densityLarge: 'Duża',
        densitySmall: 'Mała',
        columnSetting: 'Ustawienia kolumn',
        fullscreen: 'Pełny ekran',
        exitFullscreen: 'Wyjdź z pełnego ekranu',
        export: 'Eksportuj',
        import: 'Importuj',
        search: 'Szukaj',
        searchPlaceholder: 'Wprowadź słowa kluczowe do wyszukania'
      },
      // Filtr
      filter: {
        selectAll: 'Zaznacz wszystko',
        selectInvert: 'Odwróć zaznaczenie',
        empty: 'Jest puste',
        notEmpty: 'Nie jest puste',
        contains: 'Zawiera',
        notContains: 'Nie zawiera',
        equals: 'Równa się',
        notEquals: 'Nie równa się',
        startsWith: 'Zaczyna się od',
        endsWith: 'Kończy się na',
        greaterThan: 'Większe niż',
        lessThan: 'Mniejsze niż',
        between: 'Między'
      },
      // Sortowanie
      sort: {
        asc: 'Rosnąco',
        desc: 'Malejąco',
        clear: 'Wyczyść sortowanie'
      },
      // Eksport
      export: {
        title: 'Eksportuj dane',
        filename: 'Nazwa pliku',
        type: 'Typ pliku',
        scope: 'Zakres eksportu',
        scopeAll: 'Wszystkie dane',
        scopeSelected: 'Zaznaczone dane',
        scopeCurrentPage: 'Bieżąca strona',
        includeHeader: 'Uwzględnij nagłówek',
        exporting: 'Eksportowanie...',
        success: 'Eksport zakończony powodzeniem',
        error: 'Eksport nieudany'
      },
      // Import
      import: {
        title: 'Importuj dane',
        selectFile: 'Wybierz plik',
        dragTip: 'Kliknij lub przeciągnij plik tutaj, aby przesłać',
        importing: 'Importowanie...',
        success: 'Import zakończony powodzeniem',
        error: 'Import nieudany',
        preview: 'Podgląd danych',
        confirm: 'Potwierdź import'
      },
      // Druk
      printConfig: {
        title: 'Ustawienia drukowania',
        pageTitle: 'Tytuł strony',
        pageHeader: 'Nagłówek',
        pageFooter: 'Stopka',
        printAll: 'Drukuj wszystko',
        printSelected: 'Drukuj zaznaczone',
        printCurrentPage: 'Drukuj bieżącą stronę',
        landscape: 'Poziomo',
        portrait: 'Pionowo',
        printing: 'Drukowanie...'
      },
      // Ustawienia kolumn
      columnSetting: {
        title: 'Ustawienia kolumn',
        showAll: 'Pokaż wszystko',
        hideAll: 'Ukryj wszystko',
        reset: 'Resetuj',
        fixedLeft: 'Przypnij do lewej',
        fixedRight: 'Przypnij do prawej',
        unfixed: 'Odpiń'
      },
      // Menu kontekstowe
      contextMenu: {
        copy: 'Kopiuj',
        copyRow: 'Kopiuj wiersz',
        copyCell: 'Kopiuj komórkę',
        paste: 'Wklej',
        insertRowAbove: 'Wstaw wiersz powyżej',
        insertRowBelow: 'Wstaw wiersz poniżej',
        deleteRow: 'Usuń wiersz',
        deleteSelectedRows: 'Usuń zaznaczone wiersze',
        exportSelected: 'Eksportuj zaznaczone'
      },
      // Zaznaczenie
      selection: {
        selectAll: 'Zaznacz wszystko',
        selectInvert: 'Odwróć zaznaczenie',
        selectNone: 'Wyczyść zaznaczenie',
        selected: 'Zaznaczono {count} elementów'
      },
      // Rozwiń
      expand: {
        expandAll: 'Rozwiń wszystko',
        collapseAll: 'Zwiń wszystko'
      },
      // Drzewo
      tree: {
        expandAll: 'Rozwiń wszystko',
        collapseAll: 'Zwiń wszystko',
        expandLevel: 'Rozwiń do poziomu {level}'
      },
      // Przeciąganie
      drag: {
        dragTip: 'Przeciągnij, aby zmienić kolejność',
        dropTip: 'Upuść, aby umieścić'
      }
    },
    // Okno wiadomości
    messagebox: {
      title: 'Wiadomość',
      confirm: 'OK',
      cancel: 'Anuluj',
      close: 'Zamknij',
      error: 'Nieprawidłowe dane wejściowe',
      alert: 'Alert',
      prompt: 'Monit',
      inputPlaceholder: 'Wprowadź'
    },
    // Przesyłanie
    upload: {
      deleteTip: 'naciśnij delete, aby usunąć',
      delete: 'Usuń',
      preview: 'Podgląd',
      continue: 'Kontynuuj',
      upload: 'Kliknij, aby przesłać',
      tip: 'Kliknij lub przeciągnij plik do tego obszaru, aby <em>przesłać</em>',
      dragTip: 'Upuść plik tutaj lub kliknij, aby przesłać',
      uploading: 'Przesyłanie...',
      success: 'Przesyłanie zakończone powodzeniem',
      error: 'Przesyłanie nieudane',
      retry: 'Ponów próbę',
      cancel: 'Anuluj przesyłanie',
      fileTypeError: 'Typ pliku nie jest obsługiwany',
      fileSizeError: 'Rozmiar pliku przekracza limit',
      fileCountError: 'Liczba plików przekracza limit'
    },
    // Formularz
    form: {
      validationFailed: 'Walidacja nieudana',
      required: 'Wymagane',
      pleaseInput: 'Wprowadź',
      pleaseSelect: 'Wybierz'
    },
    // Przycisk
    button: {
      loading: 'Ładowanie...'
    },
    // Wprowadzanie
    input: {
      placeholder: 'Wprowadź',
      clear: 'Wyczyść',
      showPassword: 'Pokaż hasło',
      hidePassword: 'Ukryj hasło',
      copy: 'Kopiuj',
      copied: 'Skopiowano'
    },
    // Wprowadzanie liczby
    inputnumber: {
      placeholder: 'Wprowadź liczbę',
      increase: 'Zwiększ',
      decrease: 'Zmniejsz'
    },
    // Wprowadzanie tagu
    inputtag: {
      placeholder: 'Wprowadź',
      add: 'Dodaj',
      remove: 'Usuń'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'Więcej'
    },
    // Powrót na górę
    backtop: {
      text: 'Powrót na górę'
    },
    // Wybór
    select: {
      placeholder: 'Wybierz',
      noData: 'Brak danych',
      loading: 'Ładowanie...',
      noMatch: 'Brak pasujących danych',
      selectAll: 'Zaznacz wszystko',
      clearAll: 'Wyczyść wszystko'
    },
    // Paginacja
    pagination: {
      goto: 'Przejdź do',
      page: '',
      total: 'Razem {total}',
      pageSize: '/strona',
      prev: 'Poprzednia',
      next: 'Następna',
      first: 'Pierwsza',
      last: 'Ostatnia',
      pageClassifier: ''
    },
    // Potwierdzenie popup
    popconfirm: {
      confirm: 'OK',
      cancel: 'Anuluj',
      dontAskAgain: 'Nie pytaj ponownie'
    },
    // Dialog
    dialog: {
      confirm: 'OK',
      cancel: 'Anuluj',
      close: 'Zamknij',
      maximize: 'Maksymalizuj',
      restore: 'Przywróć'
    },
    // Szuflada
    drawer: {
      close: 'Zamknij',
      confirm: 'OK',
      cancel: 'Anuluj'
    },
    // Menu rozwijane
    dropdown: {
      loading: 'Ładowanie...'
    },
    // Obraz
    image: {
      error: 'NIEPOWODZENIE',
      loading: 'Ładowanie...',
      preview: 'Podgląd',
      zoomIn: 'Powiększ',
      zoomOut: 'Pomniejsz',
      rotateLeft: 'Obróć w lewo',
      rotateRight: 'Obróć w prawo',
      originalSize: 'Oryginalny rozmiar',
      fullscreen: 'Pełny ekran'
    },
    // Przeglądarka obrazów
    imageviewer: {
      close: 'Zamknij',
      prev: 'Poprzedni',
      next: 'Następny',
      zoomIn: 'Powiększ',
      zoomOut: 'Pomniejsz',
      rotateLeft: 'Obróć w lewo',
      rotateRight: 'Obróć w prawo',
      reset: 'Resetuj',
      fullscreen: 'Pełny ekran',
      exitFullscreen: 'Wyjdź z pełnego ekranu'
    },
    // Nieskończone przewijanie
    infinitescroll: {
      loading: 'Ładowanie...',
      finished: 'Brak więcej danych',
      error: 'Ładowanie nieudane, kliknij, aby ponowić próbę',
      retry: 'Kliknij, aby ponowić próbę'
    },
    // Wiadomość
    message: {
      close: 'Zamknij'
    },
    // Powiadomienie
    notification: {
      close: 'Zamknij'
    },
    // Ładowanie
    loading: {
      text: 'Ładowanie...'
    },
    // Obrót
    spin: {
      text: 'Ładowanie...'
    },
    // Ocena
    rate: {
      texts: ['Bardzo słabo', 'Rozczarowany', 'Przeciętnie', 'Zadowolony', 'Zaskoczony']
    },
    // Alert
    alert: {
      close: 'Zamknij'
    },
    // Tag
    tag: {
      close: 'Zamknij'
    },
    // Zakładki
    tabs: {
      close: 'Zamknij',
      add: 'Dodaj',
      more: 'Więcej'
    },
    // Kroki
    steps: {
      finish: 'Zakończono',
      process: 'W trakcie',
      wait: 'Oczekiwanie',
      error: 'Błąd'
    },
    // Postęp
    progress: {
      success: 'Sukces',
      exception: 'Wyjątek',
      warning: 'Ostrzeżenie'
    },
    // Szkielet
    skeleton: {
      loading: 'Ładowanie...'
    },
    // Pusty
    empty: {
      description: 'Brak danych',
      noData: 'Brak danych',
      noResult: 'Brak wyników',
      networkError: 'Błąd sieci',
      serverError: 'Błąd serwera'
    },
    // Wynik
    result: {
      success: 'Sukces',
      error: 'Błąd',
      warning: 'Ostrzeżenie',
      info: 'Informacja',
      backHome: 'Powrót do strony głównej'
    },
    // Kaskada
    waterfall: {
      loading: 'Ładowanie...',
      noMore: 'Brak więcej danych',
      empty: 'Brak danych'
    },
    // Opisy
    descriptions: {
      colon: ':'
    },
    // Suwak
    slider: {
      tipFormatter: '{value}'
    },
    // Przełącznik
    switch: {
      on: 'WŁĄCZONE',
      off: 'WYŁĄCZONE'
    },
    // Pole wyboru
    checkbox: {
      selectAll: 'Zaznacz wszystko'
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: 'Zwiń menu',
      expand: 'Rozwiń menu'
    },
    // Karta
    card: {
      collapse: 'Zwiń',
      expand: 'Rozwiń'
    },
    // Zwiń
    collapse: {
      expand: 'Rozwiń',
      collapse: 'Zwiń'
    },
    // Podpowiedź
    tooltip: {},
    // Popover
    popover: {},
    // Odznaka
    badge: {},
    // Avatar
    avatar: {
      error: 'Ładowanie nieudane'
    },
    // Znak wodny
    watermark: {},
    // Separator
    divider: {},
    // Karuzela
    carousel: {
      prev: 'Poprzedni',
      next: 'Następny'
    },
    // Marquee
    marquee: {},
    // Przypięcie
    affix: {},
    // Kotwica
    anchor: {}
  }
}

export default pl
