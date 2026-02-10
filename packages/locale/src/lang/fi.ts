import type { Language } from '../index'

export const fi: Language = {
  name: 'fi',
  yh: {
    // Yleinen
    common: {
      yes: 'Kyllä',
      no: 'Ei',
      confirm: 'Vahvista',
      cancel: 'Peruuta',
      loading: 'Ladataan',
      close: 'Sulje',
      clear: 'Tyhjennä',
      reset: 'Palauta',
      save: 'Tallenna',
      delete: 'Poista',
      edit: 'Muokkaa',
      add: 'Lisää',
      search: 'Etsi',
      refresh: 'Päivitä',
      expand: 'Laajenna',
      collapse: 'Tiivistä',
      more: 'Lisää',
      noData: 'Ei tietoja',
      noMatch: 'Ei vastaavia tietoja',
      selectAll: 'Valitse kaikki',
      unselectAll: 'Poista valinta kaikista'
    },
    // Väripicker
    colorpicker: {
      confirm: 'OK',
      clear: 'Tyhjennä',
      eyeDropper: 'Pipetti',
      suggestionDark: 'Valkoinen teksti on paras',
      suggestionLight: 'Musta teksti on paras',
      recentColors: 'Viimeisimmät värit',
      presetColors: 'Ennalta määritellyt värit'
    },
    // Päivämäärävalitsin
    datepicker: {
      now: 'Nyt',
      today: 'Tänään',
      cancel: 'Peruuta',
      clear: 'Tyhjennä',
      confirm: 'OK',
      selectDate: 'Valitse päivämäärä',
      selectTime: 'Valitse aika',
      startDate: 'Aloituspäivä',
      startTime: 'Aloitusaika',
      endDate: 'Lopetuspäivä',
      endTime: 'Lopetusaika',
      year: '',
      month: '',
      day: '',
      week: 'Viikko',
      monthBeforeYear: true,
      prevYear: 'Edellinen vuosi',
      nextYear: 'Seuraava vuosi',
      prevMonth: 'Edellinen kuukausi',
      nextMonth: 'Seuraava kuukausi',
      weeks: {
        sun: 'Su',
        mon: 'Ma',
        tue: 'Ti',
        wed: 'Ke',
        thu: 'To',
        fri: 'Pe',
        sat: 'La'
      },
      months: {
        jan: 'Tammi',
        feb: 'Helmi',
        mar: 'Maalis',
        apr: 'Huhti',
        may: 'Touko',
        jun: 'Kesä',
        jul: 'Heinä',
        aug: 'Elo',
        sep: 'Syys',
        oct: 'Loka',
        nov: 'Marras',
        dec: 'Joulu'
      },
      quarters: {
        q1: 'Q1',
        q2: 'Q2',
        q3: 'Q3',
        q4: 'Q4'
      }
    },
    // Aikavalitsin
    timepicker: {
      confirm: 'OK',
      cancel: 'Peruuta',
      now: 'Nyt',
      placeholder: 'Valitse aika',
      startPlaceholder: 'Aloitusaika',
      endPlaceholder: 'Lopetusaika',
      selectTime: 'Valitse aika'
    },
    // Aikavalinta
    timeselect: {
      placeholder: 'Valitse aika'
    },
    // Puu
    tree: {
      emptyText: 'Ei tietoja',
      loading: 'Ladataan...',
      checkAll: 'Valitse kaikki',
      uncheckAll: 'Poista valinta kaikista',
      expandAll: 'Laajenna kaikki',
      collapseAll: 'Tiivistä kaikki'
    },
    // Puuvalinta
    treeselect: {
      placeholder: 'Valitse',
      emptyText: 'Ei tietoja',
      loading: 'Ladataan...',
      noMatch: 'Ei vastaavia tietoja'
    },
    // Kalenteri
    calendar: {
      prevMonth: 'Edellinen kuukausi',
      nextMonth: 'Seuraava kuukausi',
      prevYear: 'Edellinen vuosi',
      nextYear: 'Seuraava vuosi',
      today: 'Tänään',
      week: 'Viikko',
      holiday: 'Pyhäpäivä',
      workday: 'Työpäivä',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Su',
        mon: 'Ma',
        tue: 'Ti',
        wed: 'Ke',
        thu: 'To',
        fri: 'Pe',
        sat: 'La'
      }
    },
    // Automaattinen täydennys
    autocomplete: {
      loading: 'Ladataan...',
      placeholder: 'Ole hyvä ja syötä',
      noData: 'Ei tietoja',
      noMatch: 'Ei vastaavia tietoja'
    },
    // Lähtölaskenta
    countdown: {
      days: 'päivää',
      hours: 'tuntia',
      minutes: 'minuuttia',
      seconds: 'sekuntia',
      milliseconds: 'millisekuntia',
      finished: 'Valmis'
    },
    // Kaskadivalitsin
    cascader: {
      noMatch: 'Ei vastaavia tietoja',
      placeholder: 'Valitse',
      loading: 'Ladataan...',
      noData: 'Ei tietoja'
    },
    // Siirto
    transfer: {
      noMatch: 'Ei vastaavia tietoja',
      noData: 'Ei tietoja',
      titles: ['Lista 1', 'Lista 2'],
      filterPlaceholder: 'Syötä avainsana',
      noCheckedFormat: '{total} kohdetta',
      hasCheckedFormat: '{checked}/{total} valittu',
      searchPlaceholder: 'Syötä avainsana'
    },
    // Taulukko
    table: {
      emptyText: 'Ei tietoja',
      confirmFilter: 'Vahvista',
      resetFilter: 'Palauta',
      clearFilter: 'Kaikki',
      sumText: 'Summa',
      loading: 'Ladataan...',
      index: 'Indeksi',
      print: 'Tulosta',
      cancel: 'Peruuta',
      preview: 'Tulostuksen esikatselu',
      printTime: 'Tulostusaika',
      total: 'Yhteensä {total} kohdetta',
      page: 'Sivu {page}',
      yes: 'Kyllä',
      no: 'Ei',
      // Työkalurivi
      toolbar: {
        refresh: 'Päivitä',
        density: 'Tiheys',
        densityDefault: 'Oletus',
        densityLarge: 'Suuri',
        densitySmall: 'Pieni',
        columnSetting: 'Sarakkeen asetukset',
        fullscreen: 'Koko näyttö',
        exitFullscreen: 'Poistu koko näytöstä',
        export: 'Vie',
        import: 'Tuo',
        search: 'Etsi',
        searchPlaceholder: 'Syötä avainsanoja etsiäksesi'
      },
      // Suodatin
      filter: {
        selectAll: 'Valitse kaikki',
        selectInvert: 'Käännä valinta',
        empty: 'On tyhjä',
        notEmpty: 'Ei ole tyhjä',
        contains: 'Sisältää',
        notContains: 'Ei sisällä',
        equals: 'Yhtä suuri kuin',
        notEquals: 'Ei yhtä suuri kuin',
        startsWith: 'Alkaa',
        endsWith: 'Päättyy',
        greaterThan: 'Suurempi kuin',
        lessThan: 'Pienempi kuin',
        between: 'Välillä'
      },
      // Lajittelu
      sort: {
        asc: 'Nouseva',
        desc: 'Laskeva',
        clear: 'Tyhjennä lajittelu'
      },
      // Vienti
      export: {
        title: 'Vie tiedot',
        filename: 'Tiedostonimi',
        type: 'Tiedostotyyppi',
        scope: 'Viennin laajuus',
        scopeAll: 'Kaikki tiedot',
        scopeSelected: 'Valitut tiedot',
        scopeCurrentPage: 'Nykyinen sivu',
        includeHeader: 'Sisällytä otsikko',
        exporting: 'Viedään...',
        success: 'Vienti onnistui',
        error: 'Vienti epäonnistui'
      },
      // Tuonti
      import: {
        title: 'Tuo tiedot',
        selectFile: 'Valitse tiedosto',
        dragTip: 'Klikkaa tai vedä tiedosto tähän ladataksesi',
        importing: 'Tuodaan...',
        success: 'Tuonti onnistui',
        error: 'Tuonti epäonnistui',
        preview: 'Tietojen esikatselu',
        confirm: 'Vahvista tuonti'
      },
      // Tulostus
      printConfig: {
        title: 'Tulostusasetukset',
        pageTitle: 'Sivun otsikko',
        pageHeader: 'Otsikko',
        pageFooter: 'Alatunniste',
        printAll: 'Tulosta kaikki',
        printSelected: 'Tulosta valitut',
        printCurrentPage: 'Tulosta nykyinen sivu',
        landscape: 'Vaakasuunta',
        portrait: 'Pystysuunta',
        printing: 'Tulostetaan...'
      },
      // Sarakkeen asetukset
      columnSetting: {
        title: 'Sarakkeen asetukset',
        showAll: 'Näytä kaikki',
        hideAll: 'Piilota kaikki',
        reset: 'Palauta',
        fixedLeft: 'Kiinnitä vasemmalle',
        fixedRight: 'Kiinnitä oikealle',
        unfixed: 'Vapauta'
      },
      // Kontekstivalikko
      contextMenu: {
        copy: 'Kopioi',
        copyRow: 'Kopioi rivi',
        copyCell: 'Kopioi solu',
        paste: 'Liitä',
        insertRowAbove: 'Lisää rivi yläpuolelle',
        insertRowBelow: 'Lisää rivi alapuolelle',
        deleteRow: 'Poista rivi',
        deleteSelectedRows: 'Poista valitut rivit',
        exportSelected: 'Vie valitut'
      },
      // Valinta
      selection: {
        selectAll: 'Valitse kaikki',
        selectInvert: 'Käännä valinta',
        selectNone: 'Tyhjennä valinta',
        selected: '{count} kohdetta valittu'
      },
      // Laajenna
      expand: {
        expandAll: 'Laajenna kaikki',
        collapseAll: 'Tiivistä kaikki'
      },
      // Puu
      tree: {
        expandAll: 'Laajenna kaikki',
        collapseAll: 'Tiivistä kaikki',
        expandLevel: 'Laajenna tasolle {level}'
      },
      // Vedä
      drag: {
        dragTip: 'Vedä järjestääksesi uudelleen',
        dropTip: 'Pudota sijoittaaksesi'
      }
    },
    // Viestiruutu
    messagebox: {
      title: 'Viesti',
      confirm: 'OK',
      cancel: 'Peruuta',
      close: 'Sulje',
      error: 'Virheellinen syöte',
      alert: 'Varoitus',
      prompt: 'Kehote',
      inputPlaceholder: 'Ole hyvä ja syötä'
    },
    // Lähetys
    upload: {
      deleteTip: 'paina delete poistaaksesi',
      delete: 'Poista',
      preview: 'Esikatselu',
      continue: 'Jatka',
      upload: 'Klikkaa ladataksesi',
      tip: 'Klikkaa tai vedä tiedosto tähän alueeseen <em>ladataksesi</em>',
      dragTip: 'Pudota tiedosto tähän tai klikkaa ladataksesi',
      uploading: 'Ladataan...',
      success: 'Lähetys onnistui',
      error: 'Lähetys epäonnistui',
      retry: 'Yritä uudelleen',
      cancel: 'Peruuta lähetys',
      fileTypeError: 'Tiedostotyyppiä ei tueta',
      fileSizeError: 'Tiedostokoko ylittää rajan',
      fileCountError: 'Tiedostomäärä ylittää rajan'
    },
    // Lomake
    form: {
      validationFailed: 'Validointi epäonnistui',
      required: 'Pakollinen',
      pleaseInput: 'Ole hyvä ja syötä',
      pleaseSelect: 'Ole hyvä ja valitse'
    },
    // Painike
    button: {
      loading: 'Ladataan...'
    },
    // Syöte
    input: {
      placeholder: 'Ole hyvä ja syötä',
      clear: 'Tyhjennä',
      showPassword: 'Näytä salasana',
      hidePassword: 'Piilota salasana',
      copy: 'Kopioi',
      copied: 'Kopioitu'
    },
    // Numerosyöte
    inputnumber: {
      placeholder: 'Ole hyvä ja syötä numero',
      increase: 'Kasvata',
      decrease: 'Vähennä'
    },
    // Tägisyyöte
    inputtag: {
      placeholder: 'Ole hyvä ja syötä',
      add: 'Lisää',
      remove: 'Poista'
    },
    // Breadcrumb
    breadcrumb: {
      label: 'Breadcrumb',
      more: 'Lisää'
    },
    // Takaisin ylös
    backtop: {
      text: 'Takaisin ylös'
    },
    // Valinta
    select: {
      placeholder: 'Ole hyvä ja valitse',
      noData: 'Ei tietoja',
      loading: 'Ladataan...',
      noMatch: 'Ei vastaavia tietoja',
      selectAll: 'Valitse kaikki',
      clearAll: 'Tyhjennä kaikki'
    },
    // Sivutus
    pagination: {
      goto: 'Siirry',
      page: '',
      total: 'Yhteensä {total}',
      pageSize: '/sivu',
      prev: 'Edellinen',
      next: 'Seuraava',
      first: 'Ensimmäinen',
      last: 'Viimeinen',
      pageClassifier: ''
    },
    // Popup-vahvistus
    popconfirm: {
      confirm: 'OK',
      cancel: 'Peruuta',
      dontAskAgain: 'Älä kysy uudelleen'
    },
    // Dialogi
    dialog: {
      confirm: 'OK',
      cancel: 'Peruuta',
      close: 'Sulje',
      maximize: 'Suurenna',
      restore: 'Palauta'
    },
    // Laatikko
    drawer: {
      close: 'Sulje',
      confirm: 'OK',
      cancel: 'Peruuta'
    },
    // Pudotusvalikko
    dropdown: {
      loading: 'Ladataan...'
    },
    // Kuva
    image: {
      error: 'EPÄONNISTUI',
      loading: 'Ladataan...',
      preview: 'Esikatselu',
      zoomIn: 'Lähennä',
      zoomOut: 'Loitonna',
      rotateLeft: 'Kierrä vasemmalle',
      rotateRight: 'Kierrä oikealle',
      originalSize: 'Alkuperäinen koko',
      fullscreen: 'Koko näyttö'
    },
    // Kuvankatselin
    imageviewer: {
      close: 'Sulje',
      prev: 'Edellinen',
      next: 'Seuraava',
      zoomIn: 'Lähennä',
      zoomOut: 'Loitonna',
      rotateLeft: 'Kierrä vasemmalle',
      rotateRight: 'Kierrä oikealle',
      reset: 'Palauta',
      fullscreen: 'Koko näyttö',
      exitFullscreen: 'Poistu koko näytöstä'
    },
    // Ääretön vieritys
    infinitescroll: {
      loading: 'Ladataan...',
      finished: 'Ei enää tietoja',
      error: 'Lataus epäonnistui, klikkaa yrittääksesi uudelleen',
      retry: 'Klikkaa yrittääksesi uudelleen'
    },
    // Viesti
    message: {
      close: 'Sulje'
    },
    // Ilmoitus
    notification: {
      close: 'Sulje'
    },
    // Lataus
    loading: {
      text: 'Ladataan...'
    },
    // Pyöriminen
    spin: {
      text: 'Ladataan...'
    },
    // Arviointi
    rate: {
      texts: ['Erittäin huono', 'Pettynyt', 'Kohtalainen', 'Tyytyväinen', 'Yllättynyt']
    },
    // Varoitus
    alert: {
      close: 'Sulje'
    },
    // Tägi
    tag: {
      close: 'Sulje'
    },
    // Välilehdet
    tabs: {
      close: 'Sulje',
      add: 'Lisää',
      more: 'Lisää'
    },
    // Askeleet
    steps: {
      finish: 'Valmis',
      process: 'Käynnissä',
      wait: 'Odottaa',
      error: 'Virhe'
    },
    // Edistyminen
    progress: {
      success: 'Onnistui',
      exception: 'Poikkeus',
      warning: 'Varoitus'
    },
    // Luuranko
    skeleton: {
      loading: 'Ladataan...'
    },
    // Tyhjä
    empty: {
      description: 'Ei tietoja',
      noData: 'Ei tietoja',
      noResult: 'Ei tuloksia',
      networkError: 'Verkkovirhe',
      serverError: 'Palvelinvirhe'
    },
    // Tulos
    result: {
      success: 'Onnistui',
      error: 'Virhe',
      warning: 'Varoitus',
      info: 'Tiedot',
      backHome: 'Takaisin kotiin'
    },
    // Vesiputous
    waterfall: {
      loading: 'Ladataan...',
      noMore: 'Ei enää tietoja',
      empty: 'Ei tietoja'
    },
    // Kuvaukset
    descriptions: {
      colon: ':'
    },
    // Liukusäädin
    slider: {
      tipFormatter: '{value}'
    },
    // Kytkin
    switch: {
      on: 'PÄÄLLÄ',
      off: 'POIS PÄÄLTÄ'
    },
    // Valintaruutu
    checkbox: {
      selectAll: 'Valitse kaikki'
    },
    // Radio
    radio: {},
    // Valikko
    menu: {
      collapse: 'Tiivistä valikko',
      expand: 'Laajenna valikko'
    },
    // Kortti
    card: {
      collapse: 'Tiivistä',
      expand: 'Laajenna'
    },
    // Tiivistä
    collapse: {
      expand: 'Laajenna',
      collapse: 'Tiivistä'
    },
    // Työkaluvihje
    tooltip: {},
    // Popover
    popover: {},
    // Merkki
    badge: {},
    // Avatar
    avatar: {
      error: 'Lataus epäonnistui'
    },
    // Vesileima
    watermark: {},
    // Erotin
    divider: {},
    // Karuselli
    carousel: {
      prev: 'Edellinen',
      next: 'Seuraava'
    },
    // Marquee
    marquee: {},
    // Kiinnitys
    affix: {},
    // Ankkuri
    anchor: {}
  }
}

export default fi
