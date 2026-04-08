"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fi = exports.default = void 0;
const fi = exports.fi = {
  name: "fi",
  yh: {
    // Yleinen
    common: {
      yes: "Kyll\xE4",
      no: "Ei",
      confirm: "Vahvista",
      cancel: "Peruuta",
      loading: "Ladataan",
      close: "Sulje",
      clear: "Tyhjenn\xE4",
      reset: "Palauta",
      save: "Tallenna",
      delete: "Poista",
      edit: "Muokkaa",
      add: "Lis\xE4\xE4",
      search: "Etsi",
      refresh: "P\xE4ivit\xE4",
      expand: "Laajenna",
      collapse: "Tiivist\xE4",
      more: "Lis\xE4\xE4",
      noData: "Ei tietoja",
      noMatch: "Ei vastaavia tietoja",
      selectAll: "Valitse kaikki",
      unselectAll: "Poista valinta kaikista"
    },
    // Väripicker
    colorpicker: {
      confirm: "OK",
      clear: "Tyhjenn\xE4",
      eyeDropper: "Pipetti",
      suggestionDark: "Valkoinen teksti on paras",
      suggestionLight: "Musta teksti on paras",
      recentColors: "Viimeisimm\xE4t v\xE4rit",
      presetColors: "Ennalta m\xE4\xE4ritellyt v\xE4rit"
    },
    // Päivämäärävalitsin
    datepicker: {
      now: "Nyt",
      today: "T\xE4n\xE4\xE4n",
      cancel: "Peruuta",
      clear: "Tyhjenn\xE4",
      confirm: "OK",
      selectDate: "Valitse p\xE4iv\xE4m\xE4\xE4r\xE4",
      selectTime: "Valitse aika",
      startDate: "Aloitusp\xE4iv\xE4",
      startTime: "Aloitusaika",
      endDate: "Lopetusp\xE4iv\xE4",
      endTime: "Lopetusaika",
      year: "",
      month: "",
      day: "",
      week: "Viikko",
      monthBeforeYear: true,
      prevYear: "Edellinen vuosi",
      nextYear: "Seuraava vuosi",
      prevMonth: "Edellinen kuukausi",
      nextMonth: "Seuraava kuukausi",
      weeks: {
        sun: "Su",
        mon: "Ma",
        tue: "Ti",
        wed: "Ke",
        thu: "To",
        fri: "Pe",
        sat: "La"
      },
      months: {
        jan: "Tammi",
        feb: "Helmi",
        mar: "Maalis",
        apr: "Huhti",
        may: "Touko",
        jun: "Kes\xE4",
        jul: "Hein\xE4",
        aug: "Elo",
        sep: "Syys",
        oct: "Loka",
        nov: "Marras",
        dec: "Joulu"
      },
      quarters: {
        q1: "Q1",
        q2: "Q2",
        q3: "Q3",
        q4: "Q4"
      }
    },
    // Aikavalitsin
    timepicker: {
      confirm: "OK",
      cancel: "Peruuta",
      now: "Nyt",
      placeholder: "Valitse aika",
      startPlaceholder: "Aloitusaika",
      endPlaceholder: "Lopetusaika",
      selectTime: "Valitse aika"
    },
    // Aikavalinta
    timeselect: {
      placeholder: "Valitse aika"
    },
    // Puu
    tree: {
      emptyText: "Ei tietoja",
      loading: "Ladataan...",
      checkAll: "Valitse kaikki",
      uncheckAll: "Poista valinta kaikista",
      expandAll: "Laajenna kaikki",
      collapseAll: "Tiivist\xE4 kaikki"
    },
    // Puuvalinta
    treeselect: {
      placeholder: "Valitse",
      emptyText: "Ei tietoja",
      loading: "Ladataan...",
      noMatch: "Ei vastaavia tietoja"
    },
    // Kalenteri
    calendar: {
      prevMonth: "Edellinen kuukausi",
      nextMonth: "Seuraava kuukausi",
      prevYear: "Edellinen vuosi",
      nextYear: "Seuraava vuosi",
      today: "T\xE4n\xE4\xE4n",
      week: "Viikko",
      holiday: "Pyh\xE4p\xE4iv\xE4",
      workday: "Ty\xF6p\xE4iv\xE4",
      monthHeaderFormat: "MMMM YYYY",
      weeks: {
        sun: "Su",
        mon: "Ma",
        tue: "Ti",
        wed: "Ke",
        thu: "To",
        fri: "Pe",
        sat: "La"
      }
    },
    // Automaattinen täydennys
    autocomplete: {
      loading: "Ladataan...",
      placeholder: "Ole hyv\xE4 ja sy\xF6t\xE4",
      noData: "Ei tietoja",
      noMatch: "Ei vastaavia tietoja"
    },
    // Lähtölaskenta
    countdown: {
      days: "p\xE4iv\xE4\xE4",
      hours: "tuntia",
      minutes: "minuuttia",
      seconds: "sekuntia",
      milliseconds: "millisekuntia",
      finished: "Valmis"
    },
    // Kaskadivalitsin
    cascader: {
      noMatch: "Ei vastaavia tietoja",
      placeholder: "Valitse",
      loading: "Ladataan...",
      noData: "Ei tietoja"
    },
    // Siirto
    transfer: {
      noMatch: "Ei vastaavia tietoja",
      noData: "Ei tietoja",
      titles: ["Lista 1", "Lista 2"],
      filterPlaceholder: "Sy\xF6t\xE4 avainsana",
      noCheckedFormat: "{total} kohdetta",
      hasCheckedFormat: "{checked}/{total} valittu",
      searchPlaceholder: "Sy\xF6t\xE4 avainsana"
    },
    // Taulukko
    table: {
      emptyText: "Ei tietoja",
      confirmFilter: "Vahvista",
      resetFilter: "Palauta",
      clearFilter: "Kaikki",
      sumText: "Summa",
      loading: "Ladataan...",
      index: "Indeksi",
      print: "Tulosta",
      cancel: "Peruuta",
      preview: "Tulostuksen esikatselu",
      printTime: "Tulostusaika",
      total: "Yhteens\xE4 {total} kohdetta",
      page: "Sivu {page}",
      yes: "Kyll\xE4",
      no: "Ei",
      // Työkalurivi
      toolbar: {
        refresh: "P\xE4ivit\xE4",
        density: "Tiheys",
        densityDefault: "Oletus",
        densityLarge: "Suuri",
        densitySmall: "Pieni",
        columnSetting: "Sarakkeen asetukset",
        fullscreen: "Koko n\xE4ytt\xF6",
        exitFullscreen: "Poistu koko n\xE4yt\xF6st\xE4",
        export: "Vie",
        import: "Tuo",
        search: "Etsi",
        searchPlaceholder: "Sy\xF6t\xE4 avainsanoja etsi\xE4ksesi"
      },
      // Suodatin
      filter: {
        selectAll: "Valitse kaikki",
        selectInvert: "K\xE4\xE4nn\xE4 valinta",
        empty: "On tyhj\xE4",
        notEmpty: "Ei ole tyhj\xE4",
        contains: "Sis\xE4lt\xE4\xE4",
        notContains: "Ei sis\xE4ll\xE4",
        equals: "Yht\xE4 suuri kuin",
        notEquals: "Ei yht\xE4 suuri kuin",
        startsWith: "Alkaa",
        endsWith: "P\xE4\xE4ttyy",
        greaterThan: "Suurempi kuin",
        lessThan: "Pienempi kuin",
        between: "V\xE4lill\xE4"
      },
      // Lajittelu
      sort: {
        asc: "Nouseva",
        desc: "Laskeva",
        clear: "Tyhjenn\xE4 lajittelu"
      },
      // Vienti
      export: {
        title: "Vie tiedot",
        filename: "Tiedostonimi",
        type: "Tiedostotyyppi",
        scope: "Viennin laajuus",
        scopeAll: "Kaikki tiedot",
        scopeSelected: "Valitut tiedot",
        scopeCurrentPage: "Nykyinen sivu",
        includeHeader: "Sis\xE4llyt\xE4 otsikko",
        exporting: "Vied\xE4\xE4n...",
        success: "Vienti onnistui",
        error: "Vienti ep\xE4onnistui"
      },
      // Tuonti
      import: {
        title: "Tuo tiedot",
        selectFile: "Valitse tiedosto",
        dragTip: "Klikkaa tai ved\xE4 tiedosto t\xE4h\xE4n ladataksesi",
        importing: "Tuodaan...",
        success: "Tuonti onnistui",
        error: "Tuonti ep\xE4onnistui",
        preview: "Tietojen esikatselu",
        confirm: "Vahvista tuonti"
      },
      // Tulostus
      printConfig: {
        title: "Tulostusasetukset",
        pageTitle: "Sivun otsikko",
        pageHeader: "Otsikko",
        pageFooter: "Alatunniste",
        printAll: "Tulosta kaikki",
        printSelected: "Tulosta valitut",
        printCurrentPage: "Tulosta nykyinen sivu",
        landscape: "Vaakasuunta",
        portrait: "Pystysuunta",
        printing: "Tulostetaan..."
      },
      // Sarakkeen asetukset
      columnSetting: {
        title: "Sarakkeen asetukset",
        showAll: "N\xE4yt\xE4 kaikki",
        hideAll: "Piilota kaikki",
        reset: "Palauta",
        fixedLeft: "Kiinnit\xE4 vasemmalle",
        fixedRight: "Kiinnit\xE4 oikealle",
        unfixed: "Vapauta"
      },
      // Kontekstivalikko
      contextMenu: {
        copy: "Kopioi",
        copyRow: "Kopioi rivi",
        copyCell: "Kopioi solu",
        paste: "Liit\xE4",
        insertRowAbove: "Lis\xE4\xE4 rivi yl\xE4puolelle",
        insertRowBelow: "Lis\xE4\xE4 rivi alapuolelle",
        deleteRow: "Poista rivi",
        deleteSelectedRows: "Poista valitut rivit",
        exportSelected: "Vie valitut"
      },
      // Valinta
      selection: {
        selectAll: "Valitse kaikki",
        selectInvert: "K\xE4\xE4nn\xE4 valinta",
        selectNone: "Tyhjenn\xE4 valinta",
        selected: "{count} kohdetta valittu"
      },
      // Laajenna
      expand: {
        expandAll: "Laajenna kaikki",
        collapseAll: "Tiivist\xE4 kaikki"
      },
      // Puu
      tree: {
        expandAll: "Laajenna kaikki",
        collapseAll: "Tiivist\xE4 kaikki",
        expandLevel: "Laajenna tasolle {level}"
      },
      // Vedä
      drag: {
        dragTip: "Ved\xE4 j\xE4rjest\xE4\xE4ksesi uudelleen",
        dropTip: "Pudota sijoittaaksesi"
      }
    },
    // Viestiruutu
    messagebox: {
      title: "Viesti",
      confirm: "OK",
      cancel: "Peruuta",
      close: "Sulje",
      error: "Virheellinen sy\xF6te",
      alert: "Varoitus",
      prompt: "Kehote",
      inputPlaceholder: "Ole hyv\xE4 ja sy\xF6t\xE4"
    },
    // Lähetys
    upload: {
      deleteTip: "paina delete poistaaksesi",
      delete: "Poista",
      preview: "Esikatselu",
      continue: "Jatka",
      upload: "Klikkaa ladataksesi",
      tip: "Klikkaa tai ved\xE4 tiedosto t\xE4h\xE4n alueeseen <em>ladataksesi</em>",
      dragTip: "Pudota tiedosto t\xE4h\xE4n tai klikkaa ladataksesi",
      uploading: "Ladataan...",
      success: "L\xE4hetys onnistui",
      error: "L\xE4hetys ep\xE4onnistui",
      retry: "Yrit\xE4 uudelleen",
      cancel: "Peruuta l\xE4hetys",
      fileTypeError: "Tiedostotyyppi\xE4 ei tueta",
      fileSizeError: "Tiedostokoko ylitt\xE4\xE4 rajan",
      fileCountError: "Tiedostom\xE4\xE4r\xE4 ylitt\xE4\xE4 rajan"
    },
    // Lomake
    form: {
      validationFailed: "Validointi ep\xE4onnistui",
      required: "Pakollinen",
      pleaseInput: "Ole hyv\xE4 ja sy\xF6t\xE4",
      pleaseSelect: "Ole hyv\xE4 ja valitse"
    },
    // Painike
    button: {
      loading: "Ladataan..."
    },
    // Syöte
    input: {
      placeholder: "Ole hyv\xE4 ja sy\xF6t\xE4",
      clear: "Tyhjenn\xE4",
      showPassword: "N\xE4yt\xE4 salasana",
      hidePassword: "Piilota salasana",
      copy: "Kopioi",
      copied: "Kopioitu"
    },
    // Numerosyöte
    inputnumber: {
      placeholder: "Ole hyv\xE4 ja sy\xF6t\xE4 numero",
      increase: "Kasvata",
      decrease: "V\xE4henn\xE4"
    },
    // Tägisyyöte
    inputtag: {
      placeholder: "Ole hyv\xE4 ja sy\xF6t\xE4",
      add: "Lis\xE4\xE4",
      remove: "Poista"
    },
    // Breadcrumb
    breadcrumb: {
      label: "Breadcrumb",
      more: "Lis\xE4\xE4"
    },
    // Takaisin ylös
    backtop: {
      text: "Takaisin yl\xF6s"
    },
    // Valinta
    select: {
      placeholder: "Ole hyv\xE4 ja valitse",
      noData: "Ei tietoja",
      loading: "Ladataan...",
      noMatch: "Ei vastaavia tietoja",
      selectAll: "Valitse kaikki",
      clearAll: "Tyhjenn\xE4 kaikki"
    },
    // Sivutus
    pagination: {
      goto: "Siirry",
      page: "",
      total: "Yhteens\xE4 {total}",
      pageSize: "/sivu",
      prev: "Edellinen",
      next: "Seuraava",
      first: "Ensimm\xE4inen",
      last: "Viimeinen",
      pageClassifier: ""
    },
    // Popup-vahvistus
    popconfirm: {
      confirm: "OK",
      cancel: "Peruuta",
      dontAskAgain: "\xC4l\xE4 kysy uudelleen"
    },
    // Dialogi
    dialog: {
      confirm: "OK",
      cancel: "Peruuta",
      close: "Sulje",
      maximize: "Suurenna",
      restore: "Palauta"
    },
    // Laatikko
    drawer: {
      close: "Sulje",
      confirm: "OK",
      cancel: "Peruuta"
    },
    // Pudotusvalikko
    dropdown: {
      loading: "Ladataan..."
    },
    // Kuva
    image: {
      error: "EP\xC4ONNISTUI",
      loading: "Ladataan...",
      preview: "Esikatselu",
      zoomIn: "L\xE4henn\xE4",
      zoomOut: "Loitonna",
      rotateLeft: "Kierr\xE4 vasemmalle",
      rotateRight: "Kierr\xE4 oikealle",
      originalSize: "Alkuper\xE4inen koko",
      fullscreen: "Koko n\xE4ytt\xF6"
    },
    // Kuvankatselin
    imageviewer: {
      close: "Sulje",
      prev: "Edellinen",
      next: "Seuraava",
      zoomIn: "L\xE4henn\xE4",
      zoomOut: "Loitonna",
      rotateLeft: "Kierr\xE4 vasemmalle",
      rotateRight: "Kierr\xE4 oikealle",
      reset: "Palauta",
      fullscreen: "Koko n\xE4ytt\xF6",
      exitFullscreen: "Poistu koko n\xE4yt\xF6st\xE4"
    },
    // Ääretön vieritys
    infinitescroll: {
      loading: "Ladataan...",
      finished: "Ei en\xE4\xE4 tietoja",
      error: "Lataus ep\xE4onnistui, klikkaa yritt\xE4\xE4ksesi uudelleen",
      retry: "Klikkaa yritt\xE4\xE4ksesi uudelleen"
    },
    // Viesti
    message: {
      close: "Sulje"
    },
    // Ilmoitus
    notification: {
      close: "Sulje"
    },
    // Lataus
    loading: {
      text: "Ladataan..."
    },
    // Pyöriminen
    spin: {
      text: "Ladataan..."
    },
    // Arviointi
    rate: {
      texts: ["Eritt\xE4in huono", "Pettynyt", "Kohtalainen", "Tyytyv\xE4inen", "Yll\xE4ttynyt"]
    },
    // Varoitus
    alert: {
      close: "Sulje"
    },
    // Tägi
    tag: {
      close: "Sulje"
    },
    // Välilehdet
    tabs: {
      close: "Sulje",
      add: "Lis\xE4\xE4",
      more: "Lis\xE4\xE4"
    },
    // Askeleet
    steps: {
      finish: "Valmis",
      process: "K\xE4ynniss\xE4",
      wait: "Odottaa",
      error: "Virhe"
    },
    // Edistyminen
    progress: {
      success: "Onnistui",
      exception: "Poikkeus",
      warning: "Varoitus"
    },
    // Luuranko
    skeleton: {
      loading: "Ladataan..."
    },
    // Tyhjä
    empty: {
      description: "Ei tietoja",
      noData: "Ei tietoja",
      noResult: "Ei tuloksia",
      networkError: "Verkkovirhe",
      serverError: "Palvelinvirhe"
    },
    // Tulos
    result: {
      success: "Onnistui",
      error: "Virhe",
      warning: "Varoitus",
      info: "Tiedot",
      backHome: "Takaisin kotiin"
    },
    // Vesiputous
    waterfall: {
      loading: "Ladataan...",
      noMore: "Ei en\xE4\xE4 tietoja",
      empty: "Ei tietoja"
    },
    // Kuvaukset
    descriptions: {
      colon: ":"
    },
    // Liukusäädin
    slider: {
      tipFormatter: "{value}"
    },
    // Kytkin
    switch: {
      on: "P\xC4\xC4LL\xC4",
      off: "POIS P\xC4\xC4LT\xC4"
    },
    // Valintaruutu
    checkbox: {
      selectAll: "Valitse kaikki"
    },
    // Radio
    radio: {},
    // Valikko
    menu: {
      collapse: "Tiivist\xE4 valikko",
      expand: "Laajenna valikko"
    },
    // Kortti
    card: {
      collapse: "Tiivist\xE4",
      expand: "Laajenna"
    },
    // Tiivistä
    collapse: {
      expand: "Laajenna",
      collapse: "Tiivist\xE4"
    },
    // Työkaluvihje
    tooltip: {},
    // Popover
    popover: {},
    // Merkki
    badge: {},
    // Avatar
    avatar: {
      error: "Lataus ep\xE4onnistui"
    },
    // Vesileima
    watermark: {},
    // Erotin
    divider: {},
    // Karuselli
    carousel: {
      prev: "Edellinen",
      next: "Seuraava"
    },
    // Marquee
    marquee: {},
    // Kiinnitys
    affix: {},
    // Ankkuri
    anchor: {},
    // Mention
    mention: {
      placeholder: "Sy\xF6t\xE4",
      loading: "Ladataan...",
      noData: "Ei tietoja"
    },
    // AI Components
    ai: {
      bubble: {
        citations: "Lainaukset"
      },
      mention: {
        placeholder: "@ Mainitse agentti, dokumentti tai taulukko...",
        agent: "Agentti",
        document: "Dokumentti",
        table: "Taulukko",
        knowledge: "Tieto"
      },
      codeBlock: {
        copyCode: "Kopioi koodi",
        copied: "Kopioitu!",
        run: "Suorita koodi",
        edit: "Muokkaa",
        save: "Tallenna",
        cancel: "Peru"
      },
      codeRunner: {
        run: "Suorita",
        stop: "Pys\xE4yt\xE4",
        clear: "Tyhjenn\xE4",
        reset: "Nollaa",
        placeholder: "Klikkaa Suorita suorittaaksesi koodin..."
      },
      sender: {
        placeholder: "L\xE4het\xE4 viesti...",
        dragTip: "Vapauta ladataksesi tiedostoja"
      },
      thoughtChain: {
        thoughtProcess: "Ajatteluprosessi",
        thinking: "Ajattelee...",
        defaultTitle: "Uusi vaihe",
        addNode: "Lis\xE4\xE4 vaihe"
      },
      thinking: {
        start: "Aloita ajattelu",
        thinking: "Ajattelee...",
        complete: "Ajattelu valmis",
        error: "Ajatteluvirhe"
      },
      welcome: {
        title: "Hei, olen YH AI",
        description: "Voin auttaa sinua koodaamisessa, dokumenttien k\xE4\xE4nt\xE4misess\xE4 tai luovassa kirjoittamisessa. Mit\xE4 voin tehd\xE4 sinulle t\xE4n\xE4\xE4n?"
      },
      action: {
        copy: "Kopioi",
        regenerate: "Luo uudelleen",
        share: "Jaa",
        like: "Tykk\xE4\xE4",
        dislike: "\xC4l\xE4 tykk\xE4\xE4",
        edit: "Muokkaa",
        delete: "Poista"
      },
      artifacts: {
        preview: "Esikatselu",
        inline: "Inline",
        code: "Koodi",
        versions: "Versiot",
        rendering: "Renderoidaan komponenttia...",
        renderingChart: "Renderoidaan kaaviota...",
        renderingCanvas: "Valmistellaan canvasta..."
      },
      voice: {
        trigger: "Klikkaa puhuaksesi",
        listening: "Kuunnellaan..."
      },
      agent: {
        uses: "k\xE4ytt\xE4\xE4",
        use: "K\xE4yt\xE4 nyt",
        favorite: "Suosikki",
        unfavorite: "Poista suosikki",
        share: "Jaa",
        online: "Online",
        offline: "Offline",
        busy: "Varattu",
        verified: "Vahvistettu",
        rating: "Arvosana",
        reviews: "arvostelua",
        responseTime: "Keskim. vastausaika",
        ms: "ms"
      },
      sources: {
        references: "Viitteet",
        referencedSources: "Viitatut l\xE4hteet",
        relevant: "Osuvuus",
        viewOriginal: "N\xE4yt\xE4 alkuper\xE4inen",
        showAll: "N\xE4yt\xE4 kaikki",
        more: "lis\xE4\xE4 l\xE4hteit\xE4",
        drawerTitle: "Viitteet",
        expandMore: "N\xE4yt\xE4 lis\xE4\xE4",
        collapseMore: "Tiivist\xE4",
        noSources: "Ei l\xE4hteit\xE4",
        today: "T\xE4n\xE4\xE4n",
        last7Days: "Viimeiset 7 p\xE4iv\xE4\xE4",
        last30Days: "Viimeiset 30 p\xE4iv\xE4\xE4",
        earlier: "Aiemmat",
        pinned: "Kiinnitetty"
      },
      conversations: {
        today: "T\xE4n\xE4\xE4n",
        last7Days: "Viimeiset 7 p\xE4iv\xE4\xE4",
        last30Days: "Viimeiset 30 p\xE4iv\xE4\xE4",
        earlier: "Aiemmat",
        pinned: "Kiinnitetty",
        pin: "Kiinnit\xE4",
        unpin: "Poista kiinnitys",
        newConversation: "Uusi keskustelu",
        rename: "Nime\xE4 uudelleen",
        delete: "Poista",
        deleteConfirm: "Vahvista t\xE4m\xE4n keskustelun poistaminen?"
      }
    }
  }
};
module.exports = fi;