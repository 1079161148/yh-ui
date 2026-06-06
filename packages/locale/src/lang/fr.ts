import type { Language } from '../index'

export const fr: Language = {
  name: 'fr',
  yh: {
    common: {
      yes: 'Oui',
      no: 'Non',
      confirm: 'Confirmer',
      cancel: 'Annuler',
      loading: 'Chargement',
      close: 'Fermer',
      clear: 'Effacer',
      reset: 'Réinitialiser',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      search: 'Rechercher',
      refresh: 'Actualiser',
      expand: 'Développer',
      collapse: 'Réduire',
      more: 'Plus',
      noData: 'Aucune donnée',
      noMatch: 'Aucune correspondance',
      selectAll: 'Tout sélectionner',
      unselectAll: 'Tout désélectionner'
    },
    colorpicker: {
      confirm: 'OK',
      clear: 'Effacer',
      eyeDropper: 'Pipette',
      suggestionDark: 'Texte blanc recommandé',
      suggestionLight: 'Texte noir recommandé',
      recentColors: 'Couleurs récentes',
      presetColors: 'Couleurs prédéfinies'
    },
    datepicker: {
      now: 'Maintenant',
      today: "Aujourd'hui",
      cancel: 'Annuler',
      clear: 'Effacer',
      confirm: 'OK',
      selectDate: 'Sélectionner une date',
      selectTime: "Sélectionner l'heure",
      startDate: 'Date de début',
      startTime: 'Heure de début',
      endDate: 'Date de fin',
      endTime: 'Heure de fin',
      year: '',
      month: '',
      day: '',
      week: 'Semaine',
      monthBeforeYear: true,
      prevYear: 'Année précédente',
      nextYear: 'Année suivante',
      prevMonth: 'Mois précédent',
      nextMonth: 'Mois suivant',
      weeks: {
        sun: 'Dim',
        mon: 'Lun',
        tue: 'Mar',
        wed: 'Mer',
        thu: 'Jeu',
        fri: 'Ven',
        sat: 'Sam'
      },
      months: {
        jan: 'Jan',
        feb: 'Fév',
        mar: 'Mar',
        apr: 'Avr',
        may: 'Mai',
        jun: 'Juin',
        jul: 'Juil',
        aug: 'Août',
        sep: 'Sep',
        oct: 'Oct',
        nov: 'Nov',
        dec: 'Déc'
      },
      quarters: {
        q1: 'T1',
        q2: 'T2',
        q3: 'T3',
        q4: 'T4'
      }
    },
    timepicker: {
      confirm: 'OK',
      cancel: 'Annuler',
      now: 'Maintenant',
      placeholder: "Sélectionner l'heure",
      startPlaceholder: 'Heure de début',
      endPlaceholder: 'Heure de fin',
      selectTime: "Sélectionner l'heure"
    },
    timeselect: {
      placeholder: "Sélectionner l'heure"
    },
    tree: {
      emptyText: 'Aucune donnée',
      loading: 'Chargement...',
      checkAll: 'Tout sélectionner',
      uncheckAll: 'Tout désélectionner',
      expandAll: 'Tout développer',
      collapseAll: 'Tout réduire'
    },
    treeselect: {
      placeholder: 'Veuillez sélectionner',
      emptyText: 'Aucune donnée',
      loading: 'Chargement...',
      noMatch: 'Aucune correspondance'
    },
    calendar: {
      prevMonth: 'Mois précédent',
      nextMonth: 'Mois suivant',
      prevYear: 'Année précédente',
      nextYear: 'Année suivante',
      today: "Aujourd'hui",
      week: 'Semaine',
      holiday: 'Férié',
      workday: 'Travail',
      monthHeaderFormat: 'MMMM YYYY',
      weeks: {
        sun: 'Dim',
        mon: 'Lun',
        tue: 'Mar',
        wed: 'Mer',
        thu: 'Jeu',
        fri: 'Ven',
        sat: 'Sam'
      }
    },
    autocomplete: {
      loading: 'Chargement...',
      placeholder: 'Veuillez saisir',
      noData: 'Aucune donnée',
      noMatch: 'Aucune correspondance'
    },
    countdown: {
      days: 'jours',
      hours: 'heures',
      minutes: 'minutes',
      seconds: 'secondes',
      milliseconds: 'millisecondes',
      finished: 'Terminé'
    },
    cascader: {
      noMatch: 'Aucune correspondance',
      placeholder: 'Veuillez sélectionner',
      loading: 'Chargement...',
      noData: 'Aucune donnée'
    },
    transfer: {
      noMatch: 'Aucune correspondance',
      noData: 'Aucune donnée',
      titles: ['Liste 1', 'Liste 2'],
      filterPlaceholder: 'Entrer un mot-clé',
      noCheckedFormat: '{total} éléments',
      hasCheckedFormat: '{checked}/{total} sélectionnés',
      searchPlaceholder: 'Entrer un mot-clé'
    },
    table: {
      emptyText: 'Aucune donnée',
      confirmFilter: 'Confirmer',
      resetFilter: 'Réinitialiser',
      clearFilter: 'Tout',
      sumText: 'Total',
      loading: 'Chargement...',
      index: 'N°',
      print: 'Imprimer',
      cancel: 'Annuler',
      preview: 'Aperçu avant impression',
      printTime: "Heure d'impression",
      total: 'Total {total}',
      page: 'Page {page}',
      yes: 'Oui',
      no: 'Non',
      toolbar: {
        refresh: 'Actualiser',
        density: 'Densité',
        densityDefault: 'Par défaut',
        densityLarge: 'Large',
        densitySmall: 'Compact',
        columnSetting: 'Paramètres des colonnes',
        fullscreen: 'Plein écran',
        exitFullscreen: 'Quitter le plein écran',
        export: 'Exporter',
        import: 'Importer',
        search: 'Rechercher',
        searchPlaceholder: 'Entrer un mot-clé'
      },
      filter: {
        selectAll: 'Tout sélectionner',
        selectInvert: 'Inverser la sélection',
        empty: 'Vide',
        notEmpty: 'Non vide',
        contains: 'Contient',
        notContains: 'Ne contient pas',
        equals: 'Égal',
        notEquals: 'Différent',
        startsWith: 'Commence par',
        endsWith: 'Finit par',
        greaterThan: 'Supérieur à',
        lessThan: 'Inférieur à',
        between: 'Entre'
      },
      sort: {
        asc: 'Croissant',
        desc: 'Décroissant',
        clear: 'Annuler le tri'
      },
      export: {
        title: 'Exporter les données',
        filename: 'Nom du fichier',
        type: 'Type de fichier',
        scope: "Portée de l'export",
        scopeAll: 'Toutes les données',
        scopeSelected: 'Données sélectionnées',
        scopeCurrentPage: 'Page actuelle',
        includeHeader: "Inclure l'en-tête",
        exporting: 'Exportation...',
        success: 'Export réussi',
        error: "Échec de l'export"
      },
      import: {
        title: 'Importer des données',
        selectFile: 'Sélectionner un fichier',
        dragTip: 'Glisser-déposer ou cliquer pour téléverser',
        importing: 'Importation...',
        success: 'Import réussi',
        error: "Échec de l'import",
        preview: 'Aperçu des données',
        confirm: "Confirmer l'import"
      },
      printConfig: {
        title: "Paramètres d'impression",
        pageTitle: 'Titre de la page',
        pageHeader: 'En-tête',
        pageFooter: 'Pied de page',
        printAll: 'Tout imprimer',
        printSelected: 'Imprimer la sélection',
        printCurrentPage: 'Imprimer la page actuelle',
        landscape: 'Paysage',
        portrait: 'Portrait',
        printing: 'Impression...'
      },
      columnSetting: {
        title: 'Paramètres des colonnes',
        showAll: 'Tout afficher',
        hideAll: 'Tout masquer',
        reset: 'Réinitialiser',
        fixedLeft: 'Fixer à gauche',
        fixedRight: 'Fixer à droite',
        unfixed: 'Libérer'
      },
      contextMenu: {
        copy: 'Copier',
        copyRow: 'Copier la ligne',
        copyCell: 'Copier la cellule',
        paste: 'Coller',
        insertRowAbove: 'Insérer une ligne au-dessus',
        insertRowBelow: 'Insérer une ligne en-dessous',
        deleteRow: 'Supprimer la ligne',
        deleteSelectedRows: 'Supprimer les lignes sélectionnées',
        exportSelected: 'Exporter la sélection'
      },
      selection: {
        selectAll: 'Tout sélectionner',
        selectInvert: 'Inverser la sélection',
        selectNone: 'Tout désélectionner',
        selected: '{count} sélectionné(s)'
      },
      expand: {
        expandAll: 'Tout développer',
        collapseAll: 'Tout réduire'
      },
      tree: {
        expandAll: 'Tout développer',
        collapseAll: 'Tout réduire',
        expandLevel: "Développer jusqu'au niveau {level}"
      },
      drag: {
        dragTip: 'Glisser pour réorganiser',
        dropTip: 'Déposer pour placer'
      }
    },
    messagebox: {
      title: 'Message',
      confirm: 'OK',
      cancel: 'Annuler',
      close: 'Fermer',
      error: 'Entrée invalide',
      alert: 'Alerte',
      prompt: 'Invite',
      inputPlaceholder: 'Veuillez saisir'
    },
    upload: {
      deleteTip: 'Appuyer sur Suppr pour effacer',
      delete: 'Supprimer',
      preview: 'Aperçu',
      continue: 'Continuer',
      upload: 'Cliquer pour téléverser',
      tip: 'Glisser le fichier ici ou <em>cliquer pour téléverser</em>',
      dragTip: 'Glisser le fichier ici',
      uploading: 'Téléversement...',
      success: 'Téléversement réussi',
      error: 'Échec du téléversement',
      retry: 'Réessayer',
      cancel: 'Annuler le téléversement',
      fileTypeError: 'Type de fichier non supporté',
      fileSizeError: 'Taille de fichier dépassée',
      fileCountError: 'Nombre de fichiers dépassé'
    },
    form: {
      validationFailed: 'Échec de la validation',
      required: 'Requis',
      pleaseInput: 'Veuillez saisir',
      pleaseSelect: 'Veuillez sélectionner'
    },
    button: {
      loading: 'Chargement...'
    },
    input: {
      placeholder: 'Veuillez saisir',
      clear: 'Effacer',
      showPassword: 'Afficher le mot de passe',
      hidePassword: 'Masquer le mot de passe',
      copy: 'Copier',
      copied: 'Copié'
    },
    inputnumber: {
      placeholder: 'Entrer un nombre',
      increase: 'Augmenter',
      decrease: 'Diminuer'
    },
    inputtag: {
      placeholder: 'Veuillez saisir',
      add: 'Ajouter',
      remove: 'Supprimer'
    },
    breadcrumb: {
      label: "Fil d'Ariane",
      more: 'Plus'
    },
    backtop: {
      text: 'Retour en haut'
    },
    select: {
      placeholder: 'Veuillez sélectionner',
      noData: 'Aucune donnée',
      loading: 'Chargement...',
      noMatch: 'Aucune correspondance',
      selectAll: 'Tout sélectionner',
      clearAll: 'Tout effacer'
    },
    pagination: {
      goto: 'Aller à',
      page: '',
      total: 'Total {total}',
      pageSize: '/page',
      prev: 'Précédent',
      next: 'Suivant',
      first: 'Premier',
      last: 'Dernier',
      pageClassifier: ''
    },
    popconfirm: {
      confirm: 'OK',
      cancel: 'Annuler',
      dontAskAgain: 'Ne plus demander'
    },
    dialog: {
      confirm: 'OK',
      cancel: 'Annuler',
      close: 'Fermer',
      maximize: 'Maximiser',
      restore: 'Restaurer'
    },
    drawer: {
      close: 'Fermer',
      confirm: 'OK',
      cancel: 'Annuler'
    },
    dropdown: {
      loading: 'Chargement...'
    },
    image: {
      error: 'Échec du chargement',
      loading: 'Chargement...',
      preview: 'Aperçu',
      zoomIn: 'Zoom avant',
      zoomOut: 'Zoom arrière',
      rotateLeft: 'Rotation gauche',
      rotateRight: 'Rotation droite',
      originalSize: 'Taille originale',
      fullscreen: 'Plein écran'
    },
    imageviewer: {
      close: 'Fermer',
      prev: 'Précédent',
      next: 'Suivant',
      zoomIn: 'Zoom avant',
      zoomOut: 'Zoom arrière',
      rotateLeft: 'Rotation gauche',
      rotateRight: 'Rotation droite',
      reset: 'Réinitialiser',
      fullscreen: 'Plein écran',
      exitFullscreen: 'Quitter le plein écran'
    },
    infinitescroll: {
      loading: 'Chargement...',
      finished: 'Plus de données',
      error: 'Échec du chargement, cliquer pour réessayer',
      retry: 'Cliquer pour réessayer'
    },
    message: {
      close: 'Fermer'
    },
    notification: {
      close: 'Fermer'
    },
    loading: {
      text: 'Chargement...'
    },
    spin: {
      text: 'Chargement...'
    },
    rate: {
      texts: ['Très mauvais', 'Décevant', 'Correct', 'Satisfaisant', 'Excellent']
    },
    alert: {
      close: 'Fermer'
    },
    tag: {
      close: 'Fermer'
    },
    tabs: {
      close: 'Fermer',
      add: 'Ajouter',
      more: 'Plus'
    },
    steps: {
      finish: 'Terminé',
      process: 'En cours',
      wait: 'En attente',
      error: 'Erreur'
    },
    progress: {
      success: 'Succès',
      exception: 'Exception',
      warning: 'Avertissement'
    },
    skeleton: {
      loading: 'Chargement...'
    },
    empty: {
      description: 'Aucune donnée',
      noData: 'Aucune donnée',
      noResult: 'Aucun résultat',
      networkError: 'Erreur réseau',
      serverError: 'Erreur serveur'
    },
    result: {
      success: 'Succès',
      error: 'Erreur',
      warning: 'Avertissement',
      info: 'Information',
      backHome: "Retour à l'accueil"
    },
    waterfall: {
      loading: 'Chargement...',
      noMore: 'Plus de données',
      empty: 'Aucune donnée'
    },
    descriptions: {
      colon: ' :'
    },
    slider: {
      tipFormatter: '{value}'
    },
    switch: {
      on: 'OUI',
      off: 'NON'
    },
    checkbox: {
      selectAll: 'Tout sélectionner'
    },
    radio: {},
    menu: {
      collapse: 'Réduire le menu',
      expand: 'Développer le menu'
    },
    card: {
      collapse: 'Réduire',
      expand: 'Développer'
    },
    collapse: {
      expand: 'Développer',
      collapse: 'Réduire'
    },
    tooltip: {},
    popover: {},
    badge: {},
    avatar: {
      error: 'Échec du chargement'
    },
    watermark: {},
    divider: {},
    carousel: {
      prev: 'Précédent',
      next: 'Suivant'
    },
    marquee: {},
    affix: {},
    anchor: {},
    // Mention
    mention: {
      placeholder: 'Veuillez entrer',
      loading: 'Chargement...',
      noData: 'Aucune donnée'
    },
    skuselector: {
      placeholder: 'Sélectionner des spécifications',
      emptyText: 'Aucune spécification',
      stock: 'Stock',
      price: 'Prix',
      selected: 'Sélectionné',
      outOfStock: 'Rupture de stock'
    },
    productcard: {
      viewDetails: 'Voir les détails',
      buyNow: 'Acheter maintenant',
      addToCart: 'Ajouter au panier',
      sold: 'Vendu',
      soldOut: 'Épuisé',
      vip: 'VIP'
    },
    price: {
      original: 'Prix d’origine'
    },
    couponcard: {
      available: 'Obtenir maintenant',
      used: 'Utilisé',
      expired: 'Expiré',
      received: 'Reçu',
      limit: 'Commandes de plus de {threshold}',
      noThreshold: 'Sans minimum',
      validPeriod: 'Validité',
      ruleTitle: 'Règles d’utilisation'
    },
    luckydraw: {
      start: 'Démarrer',
      drawing: 'Tirage...',
      end: 'Gagnant !',
      retry: 'Réessayer'
    },
    filterbar: {
      all: 'Tous',
      sort: 'Trier',
      filter: 'Filtrer',
      cancel: 'Annuler',
      reset: 'Réinitialiser',
      confirm: 'Confirmer',
      noOptions: 'Aucune option',
      asc: 'Croissant',
      desc: 'Décroissant',
      selected: 'Sélectionné'
    },
    submitbar: {
      total: 'Total : ',
      selected: '{count} sélectionné(s)',
      submit: 'Commander',
      allSelect: 'Tout sélectionner'
    },
    categorynav: {
      all: 'Tous',
      noData: 'Aucune donnée',
      loading: 'Chargement...'
    },
    smartaddress: {
      placeholder:
        'Collez l’adresse ici pour détecter automatiquement le nom, le téléphone et le lieu',
      parse: 'Analyse intelligente',
      province: 'Région/Ville/District',
      city: 'Ville',
      district: 'District/Département',
      street: 'Rue/Commune',
      detail: 'Adresse détaillée',
      phone: 'Téléphone',
      name: 'Destinataire',
      parseSuccess: 'Adresse analysée avec succès',
      parseFailed: 'Échec de l’analyse, veuillez remplir manuellement',
      required: 'Veuillez renseigner l’adresse complète',
      provinceKeywords: ['Région', 'Province'],
      cityKeywords: ['Ville', 'Commune'],
      districtKeywords: ['District', 'Département', 'Arrondissement'],
      streetKeywords: ['Rue', 'Route', 'Avenue', 'Allée']
    },
    ganttchart: {
      taskName: 'Nom de la tâche',
      searchPlaceholder: 'Rechercher des tâches...',
      zoom: 'Zoom',
      day: 'Jour',
      week: 'Semaine',
      month: 'Mois',
      year: 'Année',
      milestone: 'Jalon'
    },
    imagemagnifier: {
      switchToImage: 'Passer à l’image {index}',
      galleryItem: 'Galerie {index}',
      close: 'Fermer'
    },
    // AI Components
    ai: {
      bubble: {
        citations: 'Citations'
      },
      mention: {
        placeholder: '@ Mentionner Agent, Doc ou Table...',
        agent: 'Agent',
        document: 'Document',
        table: 'Table',
        knowledge: 'Connaissance'
      },
      codeBlock: {
        copyCode: 'Copier le code',
        copied: 'Copié !',
        run: 'Exécuter le code',
        edit: 'Modifier',
        save: 'Enregistrer',
        cancel: 'Annuler'
      },
      codeRunner: {
        run: 'Exécuter',
        stop: 'Arrêter',
        clear: 'Effacer',
        reset: 'Réinitialiser',
        placeholder: 'Cliquez sur Exécuter pour exécuter le code...'
      },
      sender: {
        placeholder: 'Envoyer un message...',
        dragTip: 'Relâchez pour télécharger des fichiers'
      },
      thoughtChain: {
        thoughtProcess: 'Processus de pensée',
        thinking: 'Réflexion en cours...',
        defaultTitle: 'Nouvelle étape',
        addNode: 'Ajouter une étape'
      },
      thinking: {
        start: 'Commencer à réfléchir',
        thinking: 'Réflexion en cours...',
        complete: 'Réflexion terminée',
        error: 'Erreur de réflexion'
      },
      welcome: {
        title: 'Bonjour, je suis YH AI',
        description:
          "Je peux vous aider à programmer, traduire des documents ou écrire de manière créative. Que puis-je faire pour vous aujourd'hui ?"
      },
      action: {
        copy: 'Copier',
        regenerate: 'Régénérer',
        share: 'Partager',
        like: "J'aime",
        dislike: "Je n'aime pas",
        edit: 'Modifier',
        delete: 'Supprimer'
      },
      artifacts: {
        preview: 'Aperçu',
        inline: 'En ligne',
        code: 'Code source',
        versions: 'Versions',
        rendering: 'Rendu du composant...',
        renderingChart: 'Rendu du graphique...',
        renderingCanvas: 'Préparation du canevas...'
      },
      voice: {
        trigger: 'Cliquez pour parler',
        listening: 'Écoute en cours...'
      },
      agent: {
        uses: 'utilisations',
        use: 'Utiliser maintenant',
        favorite: 'Favori',
        unfavorite: 'Retirer des favoris',
        share: 'Partager',
        online: 'En ligne',
        offline: 'Hors ligne',
        busy: 'Occupé',
        verified: 'Vérifié',
        rating: 'Note',
        reviews: 'avis',
        responseTime: 'Temps de réponse moyen',
        ms: 'ms'
      },
      sources: {
        references: 'Références',
        referencedSources: 'Sources référencées',
        relevant: 'Pertinence',
        viewOriginal: "Voir l'original",
        showAll: 'Tout afficher',
        more: 'plus de sources',
        drawerTitle: 'Références',
        expandMore: 'Afficher plus',
        collapseMore: 'Réduire',
        noSources: 'Aucune source',
        today: "Aujourd'hui",
        last7Days: '7 derniers jours',
        last30Days: '30 derniers jours',
        earlier: 'Plus tôt',
        pinned: 'Épinglé'
      },
      conversations: {
        today: "Aujourd'hui",
        last7Days: '7 derniers jours',
        last30Days: '30 derniers jours',
        earlier: 'Plus tôt',
        pinned: 'Épinglé',
        pin: 'Épingler',
        unpin: 'Désépingler',
        newConversation: 'Nouvelle conversation',
        noData: 'Aucune conversation pour le moment',
        rename: 'Renommer',
        delete: 'Supprimer',
        deleteConfirm: 'Confirmer la suppression de cette conversation ?'
      },
      attachments: {
        dropTip: 'Déposez les fichiers ici pour les téléverser',
        clickToUpload: 'Cliquez ou glissez les fichiers pour les téléverser',
        uploadSuccess: 'Téléversement réussi',
        uploadError: 'Échec du téléversement',
        deleteConfirm: 'Supprimer ce fichier ?',
        fileTooLarge: 'La taille du fichier ne peut pas dépasser {size}',
        invalidFileType: 'Type de fichier invalide'
      },
      mermaid: {
        image: 'Image',
        code: 'Code',
        zoomIn: 'Agrandir',
        zoomOut: 'Réduire',
        reset: 'Réinitialiser',
        download: 'Télécharger',
        copyCode: 'Copier le code',
        rendering: 'Rendu en cours...',
        renderError: 'Échec du rendu',
        renderSuccess: 'Rendu réussi',
        retry: 'Réessayer'
      }
    }
  }
}

export default fr
