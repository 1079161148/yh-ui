"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pl = exports.default = void 0;
const pl = exports.pl = {
  name: "pl",
  yh: {
    // Wspólne
    common: {
      yes: "Tak",
      no: "Nie",
      confirm: "Potwierd\u017A",
      cancel: "Anuluj",
      loading: "\u0141adowanie",
      close: "Zamknij",
      clear: "Wyczy\u015B\u0107",
      reset: "Resetuj",
      save: "Zapisz",
      delete: "Usu\u0144",
      edit: "Edytuj",
      add: "Dodaj",
      search: "Szukaj",
      refresh: "Od\u015Bwie\u017C",
      expand: "Rozwi\u0144",
      collapse: "Zwi\u0144",
      more: "Wi\u0119cej",
      noData: "Brak danych",
      noMatch: "Brak pasuj\u0105cych danych",
      selectAll: "Zaznacz wszystko",
      unselectAll: "Odznacz wszystko"
    },
    // Wybór koloru
    colorpicker: {
      confirm: "OK",
      clear: "Wyczy\u015B\u0107",
      eyeDropper: "Kroplomierz",
      suggestionDark: "Bia\u0142y tekst jest najlepszy",
      suggestionLight: "Czarny tekst jest najlepszy",
      recentColors: "Ostatnie kolory",
      presetColors: "Wst\u0119pnie ustawione kolory"
    },
    // Wybór daty
    datepicker: {
      now: "Teraz",
      today: "Dzisiaj",
      cancel: "Anuluj",
      clear: "Wyczy\u015B\u0107",
      confirm: "OK",
      selectDate: "Wybierz dat\u0119",
      selectTime: "Wybierz czas",
      startDate: "Data rozpocz\u0119cia",
      startTime: "Czas rozpocz\u0119cia",
      endDate: "Data zako\u0144czenia",
      endTime: "Czas zako\u0144czenia",
      year: "",
      month: "",
      day: "",
      week: "Tydzie\u0144",
      monthBeforeYear: true,
      prevYear: "Poprzedni rok",
      nextYear: "Nast\u0119pny rok",
      prevMonth: "Poprzedni miesi\u0105c",
      nextMonth: "Nast\u0119pny miesi\u0105c",
      weeks: {
        sun: "Nie",
        mon: "Pon",
        tue: "Wt",
        wed: "\u015Ar",
        thu: "Czw",
        fri: "Pt",
        sat: "Sob"
      },
      months: {
        jan: "Sty",
        feb: "Lut",
        mar: "Mar",
        apr: "Kwi",
        may: "Maj",
        jun: "Cze",
        jul: "Lip",
        aug: "Sie",
        sep: "Wrz",
        oct: "Pa\u017A",
        nov: "Lis",
        dec: "Gru"
      },
      quarters: {
        q1: "Q1",
        q2: "Q2",
        q3: "Q3",
        q4: "Q4"
      }
    },
    // Wybór czasu
    timepicker: {
      confirm: "OK",
      cancel: "Anuluj",
      now: "Teraz",
      placeholder: "Wybierz czas",
      startPlaceholder: "Czas rozpocz\u0119cia",
      endPlaceholder: "Czas zako\u0144czenia",
      selectTime: "Wybierz czas"
    },
    // Wybór czasu
    timeselect: {
      placeholder: "Wybierz czas"
    },
    // Drzewo
    tree: {
      emptyText: "Brak danych",
      loading: "\u0141adowanie...",
      checkAll: "Zaznacz wszystko",
      uncheckAll: "Odznacz wszystko",
      expandAll: "Rozwi\u0144 wszystko",
      collapseAll: "Zwi\u0144 wszystko"
    },
    // Wybór drzewa
    treeselect: {
      placeholder: "Wybierz",
      emptyText: "Brak danych",
      loading: "\u0141adowanie...",
      noMatch: "Brak pasuj\u0105cych danych"
    },
    // Kalendarz
    calendar: {
      prevMonth: "Poprzedni miesi\u0105c",
      nextMonth: "Nast\u0119pny miesi\u0105c",
      prevYear: "Poprzedni rok",
      nextYear: "Nast\u0119pny rok",
      today: "Dzisiaj",
      week: "Tydzie\u0144",
      holiday: "\u015Awi\u0119to",
      workday: "Praca",
      monthHeaderFormat: "MMMM YYYY",
      weeks: {
        sun: "Nie",
        mon: "Pon",
        tue: "Wt",
        wed: "\u015Ar",
        thu: "Czw",
        fri: "Pt",
        sat: "Sob"
      }
    },
    // Autouzupełnianie
    autocomplete: {
      loading: "\u0141adowanie...",
      placeholder: "Wprowad\u017A",
      noData: "Brak danych",
      noMatch: "Brak pasuj\u0105cych danych"
    },
    // Odliczanie
    countdown: {
      days: "dni",
      hours: "godziny",
      minutes: "minuty",
      seconds: "sekundy",
      milliseconds: "milisekundy",
      finished: "Zako\u0144czono"
    },
    // Wybór kaskadowy
    cascader: {
      noMatch: "Brak pasuj\u0105cych danych",
      placeholder: "Wybierz",
      loading: "\u0141adowanie...",
      noData: "Brak danych"
    },
    // Transfer
    transfer: {
      noMatch: "Brak pasuj\u0105cych danych",
      noData: "Brak danych",
      titles: ["Lista 1", "Lista 2"],
      filterPlaceholder: "Wprowad\u017A s\u0142owo kluczowe",
      noCheckedFormat: "{total} element\xF3w",
      hasCheckedFormat: "{checked}/{total} zaznaczonych",
      searchPlaceholder: "Wprowad\u017A s\u0142owo kluczowe"
    },
    // Tabela
    table: {
      emptyText: "Brak danych",
      confirmFilter: "Potwierd\u017A",
      resetFilter: "Resetuj",
      clearFilter: "Wszystkie",
      sumText: "Suma",
      loading: "\u0141adowanie...",
      index: "Indeks",
      print: "Drukuj",
      cancel: "Anuluj",
      preview: "Podgl\u0105d wydruku",
      printTime: "Czas drukowania",
      total: "Razem {total} element\xF3w",
      page: "Strona {page}",
      yes: "Tak",
      no: "Nie",
      // Pasek narzędzi
      toolbar: {
        refresh: "Od\u015Bwie\u017C",
        density: "G\u0119sto\u015B\u0107",
        densityDefault: "Domy\u015Blna",
        densityLarge: "Du\u017Ca",
        densitySmall: "Ma\u0142a",
        columnSetting: "Ustawienia kolumn",
        fullscreen: "Pe\u0142ny ekran",
        exitFullscreen: "Wyjd\u017A z pe\u0142nego ekranu",
        export: "Eksportuj",
        import: "Importuj",
        search: "Szukaj",
        searchPlaceholder: "Wprowad\u017A s\u0142owa kluczowe do wyszukania"
      },
      // Filtr
      filter: {
        selectAll: "Zaznacz wszystko",
        selectInvert: "Odwr\xF3\u0107 zaznaczenie",
        empty: "Jest puste",
        notEmpty: "Nie jest puste",
        contains: "Zawiera",
        notContains: "Nie zawiera",
        equals: "R\xF3wna si\u0119",
        notEquals: "Nie r\xF3wna si\u0119",
        startsWith: "Zaczyna si\u0119 od",
        endsWith: "Ko\u0144czy si\u0119 na",
        greaterThan: "Wi\u0119ksze ni\u017C",
        lessThan: "Mniejsze ni\u017C",
        between: "Mi\u0119dzy"
      },
      // Sortowanie
      sort: {
        asc: "Rosn\u0105co",
        desc: "Malej\u0105co",
        clear: "Wyczy\u015B\u0107 sortowanie"
      },
      // Eksport
      export: {
        title: "Eksportuj dane",
        filename: "Nazwa pliku",
        type: "Typ pliku",
        scope: "Zakres eksportu",
        scopeAll: "Wszystkie dane",
        scopeSelected: "Zaznaczone dane",
        scopeCurrentPage: "Bie\u017C\u0105ca strona",
        includeHeader: "Uwzgl\u0119dnij nag\u0142\xF3wek",
        exporting: "Eksportowanie...",
        success: "Eksport zako\u0144czony powodzeniem",
        error: "Eksport nieudany"
      },
      // Import
      import: {
        title: "Importuj dane",
        selectFile: "Wybierz plik",
        dragTip: "Kliknij lub przeci\u0105gnij plik tutaj, aby przes\u0142a\u0107",
        importing: "Importowanie...",
        success: "Import zako\u0144czony powodzeniem",
        error: "Import nieudany",
        preview: "Podgl\u0105d danych",
        confirm: "Potwierd\u017A import"
      },
      // Druk
      printConfig: {
        title: "Ustawienia drukowania",
        pageTitle: "Tytu\u0142 strony",
        pageHeader: "Nag\u0142\xF3wek",
        pageFooter: "Stopka",
        printAll: "Drukuj wszystko",
        printSelected: "Drukuj zaznaczone",
        printCurrentPage: "Drukuj bie\u017C\u0105c\u0105 stron\u0119",
        landscape: "Poziomo",
        portrait: "Pionowo",
        printing: "Drukowanie..."
      },
      // Ustawienia kolumn
      columnSetting: {
        title: "Ustawienia kolumn",
        showAll: "Poka\u017C wszystko",
        hideAll: "Ukryj wszystko",
        reset: "Resetuj",
        fixedLeft: "Przypnij do lewej",
        fixedRight: "Przypnij do prawej",
        unfixed: "Odpi\u0144"
      },
      // Menu kontekstowe
      contextMenu: {
        copy: "Kopiuj",
        copyRow: "Kopiuj wiersz",
        copyCell: "Kopiuj kom\xF3rk\u0119",
        paste: "Wklej",
        insertRowAbove: "Wstaw wiersz powy\u017Cej",
        insertRowBelow: "Wstaw wiersz poni\u017Cej",
        deleteRow: "Usu\u0144 wiersz",
        deleteSelectedRows: "Usu\u0144 zaznaczone wiersze",
        exportSelected: "Eksportuj zaznaczone"
      },
      // Zaznaczenie
      selection: {
        selectAll: "Zaznacz wszystko",
        selectInvert: "Odwr\xF3\u0107 zaznaczenie",
        selectNone: "Wyczy\u015B\u0107 zaznaczenie",
        selected: "Zaznaczono {count} element\xF3w"
      },
      // Rozwiń
      expand: {
        expandAll: "Rozwi\u0144 wszystko",
        collapseAll: "Zwi\u0144 wszystko"
      },
      // Drzewo
      tree: {
        expandAll: "Rozwi\u0144 wszystko",
        collapseAll: "Zwi\u0144 wszystko",
        expandLevel: "Rozwi\u0144 do poziomu {level}"
      },
      // Przeciąganie
      drag: {
        dragTip: "Przeci\u0105gnij, aby zmieni\u0107 kolejno\u015B\u0107",
        dropTip: "Upu\u015B\u0107, aby umie\u015Bci\u0107"
      }
    },
    // Okno wiadomości
    messagebox: {
      title: "Wiadomo\u015B\u0107",
      confirm: "OK",
      cancel: "Anuluj",
      close: "Zamknij",
      error: "Nieprawid\u0142owe dane wej\u015Bciowe",
      alert: "Alert",
      prompt: "Monit",
      inputPlaceholder: "Wprowad\u017A"
    },
    // Przesyłanie
    upload: {
      deleteTip: "naci\u015Bnij delete, aby usun\u0105\u0107",
      delete: "Usu\u0144",
      preview: "Podgl\u0105d",
      continue: "Kontynuuj",
      upload: "Kliknij, aby przes\u0142a\u0107",
      tip: "Kliknij lub przeci\u0105gnij plik do tego obszaru, aby <em>przes\u0142a\u0107</em>",
      dragTip: "Upu\u015B\u0107 plik tutaj lub kliknij, aby przes\u0142a\u0107",
      uploading: "Przesy\u0142anie...",
      success: "Przesy\u0142anie zako\u0144czone powodzeniem",
      error: "Przesy\u0142anie nieudane",
      retry: "Pon\xF3w pr\xF3b\u0119",
      cancel: "Anuluj przesy\u0142anie",
      fileTypeError: "Typ pliku nie jest obs\u0142ugiwany",
      fileSizeError: "Rozmiar pliku przekracza limit",
      fileCountError: "Liczba plik\xF3w przekracza limit"
    },
    // Formularz
    form: {
      validationFailed: "Walidacja nieudana",
      required: "Wymagane",
      pleaseInput: "Wprowad\u017A",
      pleaseSelect: "Wybierz"
    },
    // Przycisk
    button: {
      loading: "\u0141adowanie..."
    },
    // Wprowadzanie
    input: {
      placeholder: "Wprowad\u017A",
      clear: "Wyczy\u015B\u0107",
      showPassword: "Poka\u017C has\u0142o",
      hidePassword: "Ukryj has\u0142o",
      copy: "Kopiuj",
      copied: "Skopiowano"
    },
    // Wprowadzanie liczby
    inputnumber: {
      placeholder: "Wprowad\u017A liczb\u0119",
      increase: "Zwi\u0119ksz",
      decrease: "Zmniejsz"
    },
    // Wprowadzanie tagu
    inputtag: {
      placeholder: "Wprowad\u017A",
      add: "Dodaj",
      remove: "Usu\u0144"
    },
    // Breadcrumb
    breadcrumb: {
      label: "Breadcrumb",
      more: "Wi\u0119cej"
    },
    // Powrót na górę
    backtop: {
      text: "Powr\xF3t na g\xF3r\u0119"
    },
    // Wybór
    select: {
      placeholder: "Wybierz",
      noData: "Brak danych",
      loading: "\u0141adowanie...",
      noMatch: "Brak pasuj\u0105cych danych",
      selectAll: "Zaznacz wszystko",
      clearAll: "Wyczy\u015B\u0107 wszystko"
    },
    // Paginacja
    pagination: {
      goto: "Przejd\u017A do",
      page: "",
      total: "Razem {total}",
      pageSize: "/strona",
      prev: "Poprzednia",
      next: "Nast\u0119pna",
      first: "Pierwsza",
      last: "Ostatnia",
      pageClassifier: ""
    },
    // Potwierdzenie popup
    popconfirm: {
      confirm: "OK",
      cancel: "Anuluj",
      dontAskAgain: "Nie pytaj ponownie"
    },
    // Dialog
    dialog: {
      confirm: "OK",
      cancel: "Anuluj",
      close: "Zamknij",
      maximize: "Maksymalizuj",
      restore: "Przywr\xF3\u0107"
    },
    // Szuflada
    drawer: {
      close: "Zamknij",
      confirm: "OK",
      cancel: "Anuluj"
    },
    // Menu rozwijane
    dropdown: {
      loading: "\u0141adowanie..."
    },
    // Obraz
    image: {
      error: "NIEPOWODZENIE",
      loading: "\u0141adowanie...",
      preview: "Podgl\u0105d",
      zoomIn: "Powi\u0119ksz",
      zoomOut: "Pomniejsz",
      rotateLeft: "Obr\xF3\u0107 w lewo",
      rotateRight: "Obr\xF3\u0107 w prawo",
      originalSize: "Oryginalny rozmiar",
      fullscreen: "Pe\u0142ny ekran"
    },
    // Przeglądarka obrazów
    imageviewer: {
      close: "Zamknij",
      prev: "Poprzedni",
      next: "Nast\u0119pny",
      zoomIn: "Powi\u0119ksz",
      zoomOut: "Pomniejsz",
      rotateLeft: "Obr\xF3\u0107 w lewo",
      rotateRight: "Obr\xF3\u0107 w prawo",
      reset: "Resetuj",
      fullscreen: "Pe\u0142ny ekran",
      exitFullscreen: "Wyjd\u017A z pe\u0142nego ekranu"
    },
    // Nieskończone przewijanie
    infinitescroll: {
      loading: "\u0141adowanie...",
      finished: "Brak wi\u0119cej danych",
      error: "\u0141adowanie nieudane, kliknij, aby ponowi\u0107 pr\xF3b\u0119",
      retry: "Kliknij, aby ponowi\u0107 pr\xF3b\u0119"
    },
    // Wiadomość
    message: {
      close: "Zamknij"
    },
    // Powiadomienie
    notification: {
      close: "Zamknij"
    },
    // Ładowanie
    loading: {
      text: "\u0141adowanie..."
    },
    // Obrót
    spin: {
      text: "\u0141adowanie..."
    },
    // Ocena
    rate: {
      texts: ["Bardzo s\u0142abo", "Rozczarowany", "Przeci\u0119tnie", "Zadowolony", "Zaskoczony"]
    },
    // Alert
    alert: {
      close: "Zamknij"
    },
    // Tag
    tag: {
      close: "Zamknij"
    },
    // Zakładki
    tabs: {
      close: "Zamknij",
      add: "Dodaj",
      more: "Wi\u0119cej"
    },
    // Kroki
    steps: {
      finish: "Zako\u0144czono",
      process: "W trakcie",
      wait: "Oczekiwanie",
      error: "B\u0142\u0105d"
    },
    // Postęp
    progress: {
      success: "Sukces",
      exception: "Wyj\u0105tek",
      warning: "Ostrze\u017Cenie"
    },
    // Szkielet
    skeleton: {
      loading: "\u0141adowanie..."
    },
    // Pusty
    empty: {
      description: "Brak danych",
      noData: "Brak danych",
      noResult: "Brak wynik\xF3w",
      networkError: "B\u0142\u0105d sieci",
      serverError: "B\u0142\u0105d serwera"
    },
    // Wynik
    result: {
      success: "Sukces",
      error: "B\u0142\u0105d",
      warning: "Ostrze\u017Cenie",
      info: "Informacja",
      backHome: "Powr\xF3t do strony g\u0142\xF3wnej"
    },
    // Kaskada
    waterfall: {
      loading: "\u0141adowanie...",
      noMore: "Brak wi\u0119cej danych",
      empty: "Brak danych"
    },
    // Opisy
    descriptions: {
      colon: ":"
    },
    // Suwak
    slider: {
      tipFormatter: "{value}"
    },
    // Przełącznik
    switch: {
      on: "W\u0141\u0104CZONE",
      off: "WY\u0141\u0104CZONE"
    },
    // Pole wyboru
    checkbox: {
      selectAll: "Zaznacz wszystko"
    },
    // Radio
    radio: {},
    // Menu
    menu: {
      collapse: "Zwi\u0144 menu",
      expand: "Rozwi\u0144 menu"
    },
    // Karta
    card: {
      collapse: "Zwi\u0144",
      expand: "Rozwi\u0144"
    },
    // Zwiń
    collapse: {
      expand: "Rozwi\u0144",
      collapse: "Zwi\u0144"
    },
    // Podpowiedź
    tooltip: {},
    // Popover
    popover: {},
    // Odznaka
    badge: {},
    // Avatar
    avatar: {
      error: "\u0141adowanie nieudane"
    },
    // Znak wodny
    watermark: {},
    // Separator
    divider: {},
    // Karuzela
    carousel: {
      prev: "Poprzedni",
      next: "Nast\u0119pny"
    },
    // Marquee
    marquee: {},
    // Przypięcie
    affix: {},
    // Kotwica
    anchor: {},
    // Mention
    mention: {
      placeholder: "Wprowad\u017A",
      loading: "\u0141adowanie...",
      noData: "Brak danych"
    },
    // AI Components
    skuselector: {
      placeholder: "Wybierz specyfikacj\u0119",
      emptyText: "Brak specyfikacji",
      stock: "Stan",
      price: "Cena",
      selected: "Wybrano",
      outOfStock: "Brak w magazynie"
    },
    productcard: {
      viewDetails: "Zobacz szczeg\xF3\u0142y",
      buyNow: "Kup teraz",
      addToCart: "Dodaj do koszyka",
      sold: "Sprzedano",
      soldOut: "Wyprzedane",
      vip: "VIP"
    },
    price: {
      original: "Cena pierwotna"
    },
    couponcard: {
      available: "Odbierz teraz",
      used: "U\u017Cyto",
      expired: "Wygas\u0142o",
      received: "Otrzymano",
      limit: "Zam\xF3wienia powy\u017Cej {threshold}",
      noThreshold: "Bez progu",
      validPeriod: "Okres wa\u017Cno\u015Bci",
      ruleTitle: "Zasady u\u017Cycia"
    },
    luckydraw: {
      start: "Start",
      drawing: "Losowanie...",
      end: "Zwyci\u0119zca!",
      retry: "Spr\xF3buj ponownie"
    },
    filterbar: {
      all: "Wszystko",
      sort: "Sortuj",
      filter: "Filtruj",
      cancel: "Anuluj",
      reset: "Resetuj",
      confirm: "Potwierd\u017A",
      noOptions: "Brak opcji",
      asc: "Rosn\u0105co",
      desc: "Malej\u0105co",
      selected: "Wybrano"
    },
    submitbar: {
      total: "Razem: ",
      selected: "Wybrano {count}",
      submit: "Do kasy",
      allSelect: "Zaznacz wszystko"
    },
    categorynav: {
      all: "Wszystko",
      noData: "Brak danych",
      loading: "\u0141adowanie..."
    },
    smartaddress: {
      placeholder: "Wklej tutaj adres, aby automatycznie wykry\u0107 nazw\u0119, telefon i lokalizacj\u0119",
      parse: "Inteligentna analiza",
      province: "Wojew\xF3dztwo/Miasto/Dzielnica",
      city: "Miasto",
      district: "Dzielnica/Powiat",
      street: "Ulica/Miejscowo\u015B\u0107",
      detail: "Szczeg\xF3\u0142owy adres",
      phone: "Telefon",
      name: "Odbiorca",
      parseSuccess: "Adres zosta\u0142 poprawnie rozpoznany",
      parseFailed: "Rozpoznanie nie powiod\u0142o si\u0119, uzupe\u0142nij r\u0119cznie",
      required: "Wprowad\u017A pe\u0142ny adres",
      provinceKeywords: ["Wojew\xF3dztwo", "Region"],
      cityKeywords: ["Miasto", "Gmina"],
      districtKeywords: ["Dzielnica", "Powiat", "Osiedle"],
      streetKeywords: ["Ulica", "Aleja", "Droga", "Plac"]
    },
    ganttchart: {
      taskName: "Nazwa zadania",
      searchPlaceholder: "Szukaj zada\u0144...",
      zoom: "Powi\u0119kszenie",
      day: "Dzie\u0144",
      week: "Tydzie\u0144",
      month: "Miesi\u0105c",
      year: "Rok",
      milestone: "Kamie\u0144 milowy"
    },
    imagemagnifier: {
      switchToImage: "Prze\u0142\u0105cz na obraz {index}",
      galleryItem: "Galeria {index}",
      close: "Zamknij"
    },
    ai: {
      bubble: {
        citations: "Cytowania"
      },
      mention: {
        placeholder: "@ Wymie\u0144 Agenta, Dokument lub Tabel\u0119...",
        agent: "Agent",
        document: "Dokument",
        table: "Tabela",
        knowledge: "Wiedza"
      },
      codeBlock: {
        copyCode: "Kopiuj kod",
        copied: "Skopiowano!",
        run: "Uruchom kod",
        edit: "Edytuj",
        save: "Zapisz",
        cancel: "Anuluj"
      },
      codeRunner: {
        run: "Uruchom",
        stop: "Zatrzymaj",
        clear: "Wyczy\u015B\u0107",
        reset: "Resetuj",
        placeholder: "Kliknij Uruchom, aby wykona\u0107 kod..."
      },
      sender: {
        placeholder: "Wy\u015Blij wiadomo\u015B\u0107...",
        dragTip: "Pu\u015B\u0107, aby przes\u0142a\u0107 pliki"
      },
      thoughtChain: {
        thoughtProcess: "Proces My\u015Blenia",
        thinking: "My\u015Blenie...",
        defaultTitle: "Nowy Krok",
        addNode: "Dodaj Krok"
      },
      thinking: {
        start: "Zacznij my\u015Ble\u0107",
        thinking: "My\u015Blenie...",
        complete: "My\u015Blenie zako\u0144czone",
        error: "B\u0142\u0105d my\u015Blenia"
      },
      welcome: {
        title: "Cze\u015B\u0107, jestem YH AI",
        description: "Mog\u0119 pom\xF3c Ci w programowaniu, t\u0142umaczeniu dokument\xF3w lub pisaniu kreatywnym. Co mog\u0119 dla Ciebie zrobi\u0107?"
      },
      action: {
        copy: "Kopiuj",
        regenerate: "Regeneruj",
        share: "Udost\u0119pnij",
        like: "Lubi\u0119",
        dislike: "Nie lubi\u0119",
        edit: "Edytuj",
        delete: "Usu\u0144"
      },
      artifacts: {
        preview: "Podgl\u0105d",
        inline: "W linii",
        code: "Kod \u0179r\xF3d\u0142owy",
        versions: "Wersje",
        rendering: "Renderowanie komponentu...",
        renderingChart: "Renderowanie wykresu...",
        renderingCanvas: "Przygotowanie p\u0142\xF3tna..."
      },
      voice: {
        trigger: "Kliknij, aby M\xF3wi\u0107",
        listening: "S\u0142uchanie..."
      },
      agent: {
        uses: "u\u017Cywa",
        use: "U\u017Cyj Teraz",
        favorite: "Ulubione",
        unfavorite: "Usu\u0144 z Ulubionych",
        share: "Udost\u0119pnij",
        online: "Online",
        offline: "Offline",
        busy: "Zaj\u0119ty",
        verified: "Zweryfikowany",
        rating: "Ocena",
        reviews: "recenzje",
        responseTime: "\u015Ar. Czas Odpowiedzi",
        ms: "ms"
      },
      sources: {
        references: "Referencje",
        referencedSources: "\u0179r\xF3d\u0142a Referencyjne",
        relevant: "Trafno\u015B\u0107",
        viewOriginal: "Zobacz Orygina\u0142",
        showAll: "Poka\u017C Wszystkie",
        more: "wi\u0119cej \u017Ar\xF3de\u0142",
        drawerTitle: "Referencje",
        expandMore: "Poka\u017C Wi\u0119cej",
        collapseMore: "Zwi\u0144",
        noSources: "Brak \u017Ar\xF3de\u0142",
        today: "Dzisiaj",
        last7Days: "Ostatnie 7 Dni",
        last30Days: "Ostatnie 30 Dni",
        earlier: "Wcze\u015Bniej",
        pinned: "Przypi\u0119te"
      },
      conversations: {
        today: "Dzisiaj",
        last7Days: "Ostatnie 7 Dni",
        last30Days: "Ostatnie 30 Dni",
        earlier: "Wcze\u015Bniej",
        pinned: "Przypi\u0119te",
        pin: "Przypnij",
        unpin: "Odpnij",
        newConversation: "Nowa Rozmowa",
        noData: "Brak rozm\xF3w",
        rename: "Zmie\u0144 nazw\u0119",
        delete: "Usu\u0144",
        deleteConfirm: "Czy na pewno usun\u0105\u0107 t\u0119 rozmow\u0119?"
      },
      attachments: {
        dropTip: "Upu\u015B\u0107 pliki tutaj, aby przes\u0142a\u0107",
        clickToUpload: "Kliknij lub przeci\u0105gnij pliki, aby przes\u0142a\u0107",
        uploadSuccess: "Przesy\u0142anie zako\u0144czone sukcesem",
        uploadError: "Przesy\u0142anie nie powiod\u0142o si\u0119",
        deleteConfirm: "Czy na pewno chcesz usun\u0105\u0107 ten plik?",
        fileTooLarge: "Rozmiar pliku nie mo\u017Ce przekracza\u0107 {size}",
        invalidFileType: "Nieprawid\u0142owy typ pliku"
      },
      mermaid: {
        image: "Obraz",
        code: "Kod",
        zoomIn: "Powi\u0119ksz",
        zoomOut: "Pomniejsz",
        reset: "Resetuj",
        download: "Pobierz",
        copyCode: "Kopiuj kod",
        rendering: "Renderowanie...",
        renderError: "Renderowanie nie powiod\u0142o si\u0119",
        renderSuccess: "Renderowanie zako\u0144czone sukcesem",
        retry: "Spr\xF3buj ponownie"
      }
    }
  }
};
module.exports = pl;