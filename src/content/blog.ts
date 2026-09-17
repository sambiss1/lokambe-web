/**
 * Contenu éditorial du blog LOKAMBE (français).
 *
 * Les articles ci-dessous sont des ARTICLES D’EXEMPLE : ils illustrent la ligne
 * éditoriale du blog (conseils concrets pour entrepreneurs de Kinshasa) et ne
 * contiennent aucune donnée sur le fonds, son portefeuille ou ses performances.
 * Ce module est autonome : il ne dépend pas de `src/content/types.ts`.
 */

/* ------------------------------------------------------------------ types */

export type BlogImage = {src: string; alt: string};

export type BlogCategoryId =
  | 'entrepreneuriat'
  | 'financement'
  | 'creation'
  | 'commerce'
  | 'restauration'
  | 'investissement'
  | 'histoires'
  | 'portefeuille';

export type BlogCategory = {
  id: BlogCategoryId;
  /** Intitulé complet, utilisé dans les filtres et l’en-tête d’article. */
  label: string;
  /** Intitulé court, pour les pastilles des cartes. */
  short: string;
};

export type BlogBlock =
  | {kind: 'paragraph'; text: string}
  | {kind: 'heading'; text: string}
  | {kind: 'quote'; text: string; attribution?: string}
  | {kind: 'list'; title?: string; ordered?: boolean; items: string[]};

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategoryId;
  /** Date de publication au format ISO (AAAA-MM-JJ). */
  publishedAt: string;
  readingMinutes: number;
  image: BlogImage;
  author: string;
  body: BlogBlock[];
};

/* ------------------------------------------------------------- catégories */

export const blogCategories: readonly BlogCategory[] = [
  {id: 'entrepreneuriat', label: 'Entrepreneuriat congolais', short: 'Entrepreneuriat'},
  {id: 'financement', label: 'Financement des PME', short: 'Financement'},
  {id: 'creation', label: 'Création d’entreprise', short: 'Création'},
  {id: 'commerce', label: 'Commerce de proximité', short: 'Commerce'},
  {id: 'restauration', label: 'Restauration', short: 'Restauration'},
  {id: 'investissement', label: 'Investissement et économie réelle', short: 'Investissement'},
  {id: 'histoires', label: 'Histoires d’entrepreneurs', short: 'Histoires'},
  {id: 'portefeuille', label: 'Actualités du portefeuille', short: 'Portefeuille'},
];

const CATEGORY_BY_ID = new Map(blogCategories.map((category) => [category.id, category]));

export function getCategory(id: BlogCategoryId): BlogCategory {
  return CATEGORY_BY_ID.get(id) ?? blogCategories[0];
}

/* ----------------------------------------------------------- mentions UI */

export const BLOG_BASE_PATH = '/blog';

export const BLOG_AUTHOR = 'L’équipe LOKAMBE';

/** Mention discrète rappelant que les articles sont des exemples. */
export const BLOG_EXAMPLE_LABEL = 'Article d’exemple';

export const BLOG_EXAMPLE_NOTICE =
  'Article d’exemple. Ce texte illustre la ligne éditoriale du blog LOKAMBE : il ne décrit ni une opération, ni une entreprise financée par le fonds.';

/* ------------------------------------------------------------ page index */

export const blogPage = {
  meta: {
    title: 'Blog',
    description:
      'Analyses et conseils pratiques sur l’entrepreneuriat congolais, le financement des PME et l’économie réelle en République démocratique du Congo.',
  },
  hero: {
    eyebrow: 'Le blog',
    title: 'Comprendre le capital privé et l’entreprise en RDC',
    intro:
      'Des repères concrets pour les entrepreneurs de Kinshasa et d’ailleurs : gestion, financement, formalisation, commerce, restauration. Des textes courts, utiles, sans jargon.',
    image: {
      src: '/images/home-kinshasa.webp',
      alt: 'Rue commerçante animée de Kinshasa',
    },
  },
  filterLabel: 'Filtrer par thème',
  allLabel: 'Tous les articles',
  featuredLabel: 'À la une',
  countLabel: (count: number) => (count > 1 ? `${count} articles` : `${count} article`),
  emptyLabel: 'Aucun article dans ce thème pour le moment.',
  tocLabel: 'Sommaire',
  latest: {
    eyebrow: 'Continuer la lecture',
    title: 'Derniers articles',
  },
  backLabel: 'Tous les articles',
  cta: {
    title: 'Votre projet mérite mieux qu’un dossier de plus',
    text: 'Vous dirigez une activité rentable à Kinshasa et vous cherchez du capital et de l’accompagnement pour changer d’échelle ? Parlons-en.',
    primary: {label: 'Soumettre un projet', href: '/soumettre-un-projet'},
    secondary: {label: 'Nous écrire', href: '/contact'},
  },
} as const;

/* ---------------------------------------------------------------- articles */

const ARTICLES: BlogArticle[] = [
  {
    slug: 'tenir-un-livre-de-caisse',
    title: 'Tenir un livre de caisse qui tient la route',
    excerpt:
      'Beaucoup d’activités rentables restent invisibles faute de traces écrites. Voici comment tenir un livre de caisse simple, quotidien et crédible.',
    category: 'entrepreneuriat',
    publishedAt: '2026-02-10',
    readingMinutes: 5,
    image: {src: '/images/sector-services.webp', alt: 'Artisan au travail dans son atelier'},
    author: BLOG_AUTHOR,
    body: [
      {
        kind: 'paragraph',
        text: 'Une activité peut tourner depuis six ans, employer huit personnes et dégager un revenu régulier sans que personne, à l’extérieur, ne puisse le vérifier. Ce n’est pas un problème de rentabilité : c’est un problème de trace. Le livre de caisse est l’outil le plus simple pour transformer une activité réelle en activité démontrable.',
      },
      {
        kind: 'paragraph',
        text: 'Il ne s’agit pas de comptabilité analytique. Il s’agit d’écrire, chaque jour, ce qui entre et ce qui sort de la caisse. Un cahier de 200 pages et une règle suffisent. Ce qui compte, c’est la régularité : un livre tenu trois jours par semaine ne vaut rien, un livre tenu tous les jours pendant six mois vaut une conversation avec un financeur.',
      },
      {kind: 'heading', text: 'Les cinq colonnes indispensables'},
      {
        kind: 'paragraph',
        text: 'Tracez cinq colonnes sur chaque page et ne changez plus jamais leur ordre. Le format doit être si stable qu’une personne extérieure puisse le lire sans explication.',
      },
      {
        kind: 'list',
        ordered: true,
        items: [
          'La date, écrite en entier, une ligne par opération et jamais deux jours sur la même ligne.',
          'La nature de l’opération, en trois ou quatre mots : « achat farine », « vente comptoir », « transport livraison ».',
          'L’entrée, c’est-à-dire l’argent qui arrive dans la caisse.',
          'La sortie, c’est-à-dire l’argent qui quitte la caisse, y compris vos propres prélèvements.',
          'Le solde après l’opération, recalculé à chaque ligne.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'La cinquième colonne est celle que l’on saute le plus souvent, et c’est la plus utile : un solde recalculé à chaque ligne permet de détecter une erreur le jour même, pas trois semaines plus tard.',
      },
      {kind: 'heading', text: 'Séparer la caisse de l’entreprise et la poche du dirigeant'},
      {
        kind: 'paragraph',
        text: 'C’est la règle qui change tout, et celle qui coûte le plus d’efforts au début. Tant que l’argent du ménage et l’argent de l’activité circulent dans la même poche, aucun chiffre n’est interprétable. Ni par vous, ni par une banque, ni par un investisseur.',
      },
      {
        kind: 'paragraph',
        text: 'La solution n’est pas de cesser de se rémunérer : c’est de se verser un montant fixe, à date fixe, et de l’inscrire comme une sortie ordinaire. « Prélèvement dirigeant, 15 du mois. » À partir de là, la marge de l’activité devient lisible, et vous savez enfin si l’entreprise vous nourrit ou si c’est vous qui la financez.',
      },
      {
        kind: 'quote',
        text: 'Un livre de caisse n’a pas besoin d’être beau. Il a besoin d’être quotidien, continu et honnête, y compris sur les mauvais jours.',
      },
      {kind: 'heading', text: 'Ce qu’on en tire au bout de trois mois'},
      {
        kind: 'paragraph',
        text: 'Après trois mois de tenue continue, additionnez les entrées et les sorties de chaque mois. Vous obtenez trois informations que la plupart des dirigeants ne possèdent pas : le chiffre d’affaires mensuel réel, la saisonnalité de l’activité, et le montant en dessous duquel la caisse ne doit jamais descendre.',
      },
      {
        kind: 'list',
        title: 'Trois erreurs qui reviennent souvent',
        items: [
          'Inscrire les ventes à crédit comme des entrées : tant que l’argent n’est pas encaissé, il ne rentre pas dans le livre de caisse. Tenez une page séparée pour les créances.',
          'Oublier les petites sorties. Le transport, le crédit téléphonique et les pourboires finissent par représenter une part significative des charges.',
          'Réécrire au propre. Un livre raturé mais original est plus crédible qu’un livre recopié sans erreur.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'Une fois ce réflexe installé, le passage au tableur ou à un logiciel devient une formalité : les colonnes sont déjà les bonnes. L’outil ne fait jamais la discipline. C’est la discipline qui rend l’outil utile.',
      },
    ],
  },
  {
    slug: 'ce-que-regarde-un-financeur',
    title: 'Ce qu’un financeur regarde vraiment dans votre dossier',
    excerpt:
      'Ni la beauté du plan, ni l’ambition du chiffre. Ce qu’un financeur cherche à comprendre, ce sont vos flux, votre marge et votre capacité à tenir vos engagements.',
    category: 'financement',
    publishedAt: '2026-08-25',
    readingMinutes: 6,
    image: {src: '/images/investors-hero.webp', alt: 'Réunion de travail autour d’une table'},
    author: BLOG_AUTHOR,
    body: [
      {
        kind: 'paragraph',
        text: 'Un dossier de financement n’est pas un exercice de séduction. C’est une réponse à une question simple, que se pose toute personne qui vous confie de l’argent : dans quelles conditions cet argent revient-il, et que se passe-t-il si le marché se retourne ?',
      },
      {
        kind: 'paragraph',
        text: 'Les dossiers rejetés le sont rarement parce que l’activité est mauvaise. Ils le sont parce qu’ils ne permettent pas de répondre à cette question. Voici, dans l’ordre, ce qu’un analyste cherche à établir.',
      },
      {kind: 'heading', text: '1. D’où vient l’argent, réellement'},
      {
        kind: 'paragraph',
        text: 'Avant les projections, on regarde l’historique. Six à douze mois de flux de trésorerie réels valent davantage qu’un plan à cinq ans. Relevés bancaires, livre de caisse, carnets de commandes, factures fournisseurs : tout document daté et continu est recevable. Ce qui n’est pas recevable, c’est un chiffre annoncé sans support.',
      },
      {
        kind: 'paragraph',
        text: 'Si vos recettes proviennent à 70 % d’un seul client, dites-le. La concentration n’est pas rédhibitoire ; la découvrir en cours d’analyse l’est souvent.',
      },
      {kind: 'heading', text: '2. La marge, pas le chiffre d’affaires'},
      {
        kind: 'paragraph',
        text: 'Un chiffre d’affaires élevé avec une marge de 4 % est plus fragile qu’une activité deux fois plus petite qui dégage 25 %. L’analyste reconstruit donc votre marge brute : le prix auquel vous vendez, moins ce que la marchandise ou le service vous a coûté. Puis il retire les charges fixes — loyer, salaires, énergie, transport — pour voir ce qui reste.',
      },
      {
        kind: 'paragraph',
        text: 'Savoir énoncer votre marge brute de tête, avec un ordre de grandeur juste, est l’un des signaux les plus forts que vous puissiez envoyer. Cela montre que vous pilotez l’activité au lieu de la subir.',
      },
      {kind: 'heading', text: '3. À quoi sert précisément l’argent demandé'},
      {
        kind: 'paragraph',
        text: 'Une demande de financement « pour développer l’activité » n’est pas une demande. Une demande, c’est un poste, un montant et un effet attendu.',
      },
      {
        kind: 'list',
        items: [
          'Un second four, pour passer de 300 à 700 unités par jour et absorber des commandes déjà refusées.',
          'Un stock de départ, pour acheter en gros et gagner des points de marge sur un produit à rotation rapide.',
          'Un aménagement de salle, pour augmenter le nombre de couverts aux heures de forte affluence.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'Chaque ligne doit être reliée à un devis ou à un prix de marché. Un investisseur n’attend pas une précision comptable au franc près ; il attend la preuve que vous avez fait le tour de la question.',
      },
      {
        kind: 'quote',
        text: 'La question n’est jamais « combien voulez-vous ? » mais « que devient l’entreprise avec cet argent, et que devient-elle sans ? ».',
      },
      {kind: 'heading', text: '4. Le risque, énoncé par vous'},
      {
        kind: 'paragraph',
        text: 'Tout financeur identifiera vos risques. La seule chose que vous contrôlez, c’est de les avoir nommés en premier : dépendance à un fournisseur, hausse du prix des intrants, bail non écrit, matériel sans contrat de maintenance, savoir-faire concentré sur une seule personne. Un dirigeant qui liste ses trois principaux risques et les mesures prises pour les réduire inspire plus confiance qu’un dirigeant qui n’en voit aucun.',
      },
      {kind: 'heading', text: '5. La gouvernance, même minimale'},
      {
        kind: 'paragraph',
        text: 'Qui décide d’un achat important ? Qui détient les clés de la caisse ? Que se passe-t-il si le dirigeant est absent trois semaines ? Dans une entreprise de dix personnes, une réponse claire à ces trois questions constitue déjà une gouvernance. Elle rassure davantage qu’un organigramme dessiné pour l’occasion.',
      },
      {
        kind: 'paragraph',
        text: 'Le dossier idéal n’existe pas. Le dossier crédible, si : des chiffres vérifiables, une marge connue, un usage précis des fonds, des risques assumés et des décisions traçables. Le reste relève de la conversation.',
      },
    ],
  },
  {
    slug: 'formaliser-son-entreprise-a-kinshasa',
    title: 'Formaliser son entreprise, ce que cela change vraiment',
    excerpt:
      'La formalisation est souvent vécue comme une contrainte. Elle est surtout la condition d’accès au crédit, aux marchés et à la transmission de l’entreprise.',
    category: 'creation',
    publishedAt: '2026-04-02',
    readingMinutes: 5,
    image: {src: '/images/apply-hero.webp', alt: 'Entrepreneure préparant son dossier'},
    author: BLOG_AUTHOR,
    body: [
      {
        kind: 'paragraph',
        text: 'La question revient dans presque toutes les conversations : « à quoi bon se formaliser ? ». Elle est légitime. Les démarches ont un coût, les obligations sont réelles et l’activité informelle fonctionne. Mais la formalisation ne se juge pas à ce qu’elle coûte : elle se juge à ce qu’elle rend possible.',
      },
      {kind: 'heading', text: 'Ce que la formalisation débloque'},
      {
        kind: 'list',
        items: [
          'L’accès au crédit. Une banque ou un fonds d’investissement ne peut contracter qu’avec une personne morale identifiée. Sans immatriculation, il n’y a pas de contrepartie juridique, donc pas de financement.',
          'L’accès aux marchés structurés. Hôtels, écoles, ONG, sociétés minières et administrations exigent une facture conforme. C’est souvent le segment qui paie le mieux et le plus régulièrement.',
          'La séparation des patrimoines. Une société protège en principe vos biens personnels des dettes de l’activité, ce qu’aucune entreprise individuelle de fait ne permet.',
          'La transmission. Une entreprise immatriculée peut être cédée, partagée entre associés ou transmise. Une activité informelle disparaît avec celui qui la porte.',
        ],
      },
      {kind: 'heading', text: 'Les repères du parcours'},
      {
        kind: 'paragraph',
        text: 'En République démocratique du Congo, la création d’une société passe par le guichet unique de création d’entreprise, qui regroupe les principales formalités : immatriculation au Registre du commerce et du crédit mobilier (RCCM), obtention du numéro d’identification nationale, enregistrement auprès de l’administration fiscale et affiliation aux organismes sociaux.',
      },
      {
        kind: 'paragraph',
        text: 'Les montants, les pièces exigées et les délais évoluent : vérifiez-les auprès du guichet unique avant de vous engager, plutôt que de vous fier au récit d’un voisin qui a créé sa société il y a quatre ans. La forme juridique la plus courante pour une PME est la société à responsabilité limitée, qui peut être constituée avec un associé unique.',
      },
      {
        kind: 'quote',
        text: 'Se formaliser ne consiste pas à devenir une grande entreprise. Cela consiste à rendre l’entreprise indépendante de la personne qui la dirige.',
      },
      {kind: 'heading', text: 'Préparer le dossier avant de se déplacer'},
      {
        kind: 'list',
        ordered: true,
        items: [
          'Fixez le nom commercial et vérifiez sa disponibilité, avant d’imprimer la moindre enseigne.',
          'Décidez de la répartition du capital entre associés et écrivez-la, même entre membres d’une même famille.',
          'Rassemblez les pièces d’identité, le justificatif d’adresse du siège et le bail des locaux.',
          'Rédigez les statuts avec un professionnel du droit : c’est le document qui tranchera les désaccords futurs.',
          'Ouvrez un compte bancaire au nom de la société et cessez d’encaisser sur un compte personnel.',
        ],
      },
      {kind: 'heading', text: 'Les obligations qui suivent'},
      {
        kind: 'paragraph',
        text: 'La formalisation crée des rendez-vous réguliers : déclarations fiscales, cotisations sociales pour les salariés, tenue d’une comptabilité conforme au référentiel OHADA. Ces obligations demandent de l’organisation, mais elles produisent aussi des documents que vous pourrez présenter à un financeur. Un bilan certifié vaut mieux que dix conversations de confiance.',
      },
      {
        kind: 'paragraph',
        text: 'Le bon moment pour se formaliser n’est pas « quand l’activité sera assez grande ». C’est le moment où vous commencez à refuser des clients faute de facture, ou à refuser un financement faute d’existence juridique. Ce moment arrive plus tôt qu’on ne le croit.',
      },
      {
        kind: 'paragraph',
        text: 'Anticipez enfin le coût de fonctionnement de la structure : un comptable, même à temps partiel, des déclarations à déposer aux échéances et un minimum d’archivage. Provisionnez ce budget dès la première année plutôt que de le découvrir au premier contrôle. Une société immatriculée mais silencieuse vis-à-vis de l’administration coûte plus cher, à terme, qu’une activité restée informelle.',
      },
    ],
  },
  {
    slug: 'commerce-de-proximite-calculer-sa-marge',
    title: 'Calculer sa marge avant d’ouvrir un second point de vente',
    excerpt:
      'Dans le commerce de détail, dupliquer un magasin sans connaître sa marge par famille de produits revient à doubler un problème plutôt qu’un résultat.',
    category: 'commerce',
    publishedAt: '2026-06-18',
    readingMinutes: 5,
    image: {src: '/images/sector-commerce.webp', alt: 'Étal d’un commerce de proximité'},
    author: BLOG_AUTHOR,
    body: [
      {
        kind: 'paragraph',
        text: 'Dans le commerce de détail, la tentation de l’agrandissement arrive vite : la boutique ne désemplit pas, les clients réclament plus de choix, un local se libère à deux rues. Pourtant, une part importante des deuxièmes points de vente ferment dans les dix-huit mois. Presque toujours pour la même raison : on a dupliqué un chiffre d’affaires sans avoir mesuré une marge.',
      },
      {kind: 'heading', text: 'Commencer par le taux de marge, famille par famille'},
      {
        kind: 'paragraph',
        text: 'Un commerce ne gagne pas de l’argent : il gagne de l’argent sur certains produits et en perd sur d’autres. Tant que la moyenne masque ce détail, aucune décision n’est fiable. Regroupez donc vos références en cinq à huit familles — boissons, produits d’entretien, conserves, hygiène, recharges téléphoniques — et calculez pour chacune la marge brute.',
      },
      {
        kind: 'paragraph',
        text: 'Prenons un exemple chiffré volontairement simple. Un carton de douze bouteilles acheté 24 000 et revendu 2 400 l’unité génère 28 800 de recette, soit 4 800 de marge brute, c’est-à-dire 20 % du prix de vente. Refaites ce calcul pour chaque famille : l’écart entre la meilleure et la moins bonne est en général bien plus important que ce que l’on imagine.',
      },
      {
        kind: 'list',
        title: 'Les trois chiffres à connaître par famille',
        items: [
          'Le taux de marge : marge brute divisée par le prix de vente, exprimé en pourcentage.',
          'La rotation : combien de fois le stock se renouvelle dans le mois.',
          'La contribution mensuelle : marge unitaire multipliée par les quantités vendues dans le mois.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'Un produit à 8 % de marge qui tourne quinze fois par mois rapporte souvent davantage qu’un produit à 35 % qui dort sur l’étagère. La marge seule ne dit rien ; c’est la marge multipliée par la rotation qui paie le loyer.',
      },
      {kind: 'heading', text: 'Le stock dormant, coût invisible'},
      {
        kind: 'paragraph',
        text: 'Chaque article immobilisé depuis plus de trois mois est de l’argent qui aurait pu être investi ailleurs. Faites l’inventaire de ces références et traitez-les franchement : remise, mise en avant, ou arrêt de réapprovisionnement. Une boutique qui libère une partie de son stock dormant dégage souvent de quoi financer elle-même une part de sa croissance, sans emprunter.',
      },
      {
        kind: 'paragraph',
        text: 'Le même raisonnement vaut pour les ventes à crédit accordées aux habitués. Elles fidélisent, mais elles immobilisent de la trésorerie et ne figurent nulle part tant qu’elles ne sont pas écrites. Tenez un cahier de créances avec le nom, la date, le montant et l’échéance convenue, et relisez-le chaque semaine : une créance réclamée au bout de huit jours se récupère presque toujours, au bout de trois mois beaucoup plus rarement.',
      },
      {
        kind: 'quote',
        text: 'Avant d’ouvrir un deuxième point de vente, assurez-vous que le premier survivrait à trois semaines d’absence du dirigeant.',
      },
      {kind: 'heading', text: 'Les conditions d’un deuxième point de vente'},
      {
        kind: 'list',
        ordered: true,
        items: [
          'Le premier magasin dégage un résultat positif depuis au moins six mois consécutifs, prélèvement du dirigeant inclus.',
          'Les prix, les procédures d’achat et le contrôle de caisse sont écrits, donc transmissibles à un responsable.',
          'Une personne de confiance est déjà formée : on ne recrute pas un gérant le mois de l’ouverture.',
          'La trésorerie couvre le stock de départ, le dépôt de garantie et au moins trois mois de charges du nouveau point de vente.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'Si l’une de ces conditions manque, l’agrandissement n’est pas annulé : il est reporté. Le temps gagné à mesurer sa marge coûte toujours moins cher qu’un deuxième loyer payé pendant un an pour rien.',
      },
    ],
  },
  {
    slug: 'restaurant-maitriser-son-cout-matiere',
    title: 'Maîtriser son coût matière, plat par plat',
    excerpt:
      'Une salle pleine ne garantit rien. Tant que le coût matière de chaque plat n’est pas connu, la rentabilité d’un restaurant reste une hypothèse.',
    category: 'restauration',
    publishedAt: '2026-09-02',
    readingMinutes: 6,
    image: {src: '/images/sector-restauration.webp', alt: 'Cuisinier dressant une assiette en cuisine'},
    author: BLOG_AUTHOR,
    body: [
      {
        kind: 'paragraph',
        text: 'La restauration est un métier à faible marge et à forte rotation : les erreurs ne se voient pas tout de suite, elles s’accumulent. Un restaurant peut servir cent couverts par jour et perdre de l’argent sur la moitié de sa carte sans que personne s’en aperçoive avant la fin du trimestre.',
      },
      {
        kind: 'paragraph',
        text: 'L’outil qui évite cela tient en une page par plat : la fiche technique. Elle liste les ingrédients d’une portion, leur quantité exacte et leur coût. Additionnés, ces coûts donnent le coût matière du plat, que l’on rapporte au prix de vente.',
      },
      {kind: 'heading', text: 'Construire une fiche technique en une heure'},
      {
        kind: 'list',
        ordered: true,
        items: [
          'Pesez les ingrédients d’une portion réelle, telle qu’elle sort en salle — pas la recette théorique.',
          'Notez le prix d’achat de chaque ingrédient à l’unité de mesure utilisée : le kilo, le litre, la pièce.',
          'Tenez compte des pertes : parures, épluchures, os, réduction à la cuisson. Un poisson acheté entier ne se sert jamais entier.',
          'Additionnez, puis divisez le coût matière obtenu par le prix de vente hors taxes pour obtenir le ratio.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'Illustration : 180 grammes de viande à 12 000 le kilo représentent 2 160 ; ajoutez 400 d’accompagnement, 300 de sauce et 150 d’huile et d’assaisonnement, vous obtenez un coût matière d’environ 3 010. Vendu 9 000, ce plat affiche un ratio matière d’environ 33 %.',
      },
      {kind: 'heading', text: 'Lire le ratio sans se raconter d’histoires'},
      {
        kind: 'paragraph',
        text: 'Le ratio matière acceptable dépend du positionnement, du niveau de service et des charges fixes. Il n’existe pas de valeur universelle : ce qui compte, c’est de fixer votre seuil, plat par plat, et de constater les écarts. Un plat dont le ratio dépasse largement votre cible a trois issues possibles : revoir la portion, renégocier l’ingrédient qui pèse le plus, ou ajuster le prix.',
      },
      {
        kind: 'paragraph',
        text: 'La quatrième issue, la plus difficile, consiste à retirer le plat de la carte. Une carte de quarante références produit mécaniquement du gaspillage, des ruptures et des achats dispersés. Les cartes courtes coûtent moins cher à produire et se vendent mieux.',
      },
      {
        kind: 'quote',
        text: 'Ce n’est pas la salle pleine qui fait la rentabilité d’un restaurant, c’est l’écart entre le coût matière et le prix de vente, répété à chaque assiette.',
      },
      {kind: 'heading', text: 'Les fuites les plus fréquentes'},
      {
        kind: 'list',
        items: [
          'Les portions non pesées : sans balance en cuisine, l’écart entre deux services atteint facilement 15 %.',
          'Les repas du personnel non comptabilisés, qui disparaissent du stock sans apparaître nulle part.',
          'Les offerts commerciaux non enregistrés : la tournée offerte est une charge, pas un geste gratuit.',
          'Les achats de dépannage au détail, systématiquement plus chers que les achats planifiés.',
          'Les pertes de conservation liées aux coupures d’électricité, à anticiper dans le plan d’achat plutôt qu’à subir.',
        ],
      },
      {
        kind: 'heading',
        text: 'Ce que le suivi rend possible',
      },
      {
        kind: 'paragraph',
        text: 'Un inventaire hebdomadaire des dix produits les plus coûteux, comparé aux ventes de la semaine, suffit à détecter une dérive avant qu’elle ne devienne une perte. C’est aussi le document qui rend un projet de restaurant finançable : sans coût matière connu, aucune projection de rentabilité n’est vérifiable, et aucun financeur ne s’engage sur une hypothèse.',
      },
    ],
  },
  {
    slug: 'economie-reelle-capital-patient',
    title: 'Pourquoi l’économie réelle exige du capital patient',
    excerpt:
      'Un atelier, un commerce ou un restaurant ne se développe pas au rythme d’une application. Comprendre cette différence évite des financements mal calibrés.',
    category: 'investissement',
    publishedAt: '2026-05-07',
    readingMinutes: 5,
    image: {src: '/images/impact-hero.webp', alt: 'Ouvriers d’un atelier de production'},
    author: BLOG_AUTHOR,
    body: [
      {
        kind: 'paragraph',
        text: 'On appelle économie réelle la part de l’activité qui produit des biens et des services tangibles : transformer, réparer, cuisiner, distribuer, transporter, construire. C’est l’essentiel de l’emploi en République démocratique du Congo, et c’est aussi la part la moins bien servie par les circuits de financement classiques.',
      },
      {
        kind: 'paragraph',
        text: 'La raison n’est pas idéologique, elle est mécanique : ces activités croissent par paliers, à un rythme imposé par le matériel, les locaux et les compétences. Un financement conçu pour une croissance rapide et continue s’y adapte mal.',
      },
      {kind: 'heading', text: 'Croître par paliers, pas en courbe'},
      {
        kind: 'paragraph',
        text: 'Une boulangerie qui sature son four ne peut pas augmenter sa production de 10 %. Elle doit acheter un second four, donc financer un investissement, former quelqu’un, tenir plusieurs mois de sous-utilisation, puis atteindre un nouveau palier. Entre les deux, la marge se dégrade avant de s’améliorer. C’est normal ; encore faut-il que le plan de financement l’ait prévu.',
      },
      {
        kind: 'list',
        title: 'Ce qui allonge le délai de retour dans l’économie réelle',
        items: [
          'L’équipement s’achète avant d’être rentabilisé, et sa mise en service prend rarement moins de deux mois.',
          'Le besoin en fonds de roulement augmente avec l’activité : plus on vend, plus on doit avancer de stock.',
          'Les compétences se transmettent lentement ; un second atelier suppose un second responsable formé.',
          'Les délais de paiement des clients institutionnels sont longs et rarement négociables.',
        ],
      },
      {kind: 'heading', text: 'Pourquoi le crédit court ne suffit pas'},
      {
        kind: 'paragraph',
        text: 'Financer un équipement amorti sur cinq ans avec un crédit remboursable sur douze mois revient à demander à l’entreprise de payer avant d’avoir produit. Beaucoup de défaillances n’ont pas d’autre origine : le projet était bon, le calendrier de remboursement ne l’était pas.',
      },
      {
        kind: 'quote',
        text: 'Le capital patient n’est pas un capital indulgent. C’est un capital dont l’horizon correspond à celui de l’actif qu’il finance.',
      },
      {
        kind: 'paragraph',
        text: 'C’est précisément ce qu’apporte un financement en fonds propres ou quasi-fonds propres : il n’exige pas de remboursement dès le premier mois, il partage le risque, et il accepte que la valeur se construise sur plusieurs exercices. En contrepartie, il demande de la transparence, une gouvernance lisible et un dialogue régulier.',
      },
      {kind: 'heading', text: 'Ce que l’entrepreneur doit vérifier de son côté'},
      {
        kind: 'list',
        ordered: true,
        items: [
          'La durée du financement correspond-elle à la durée de vie de ce qu’il finance ?',
          'Le calendrier de remboursement laisse-t-il passer les mois creux connus de l’activité ?',
          'Le besoin en fonds de roulement supplémentaire est-il financé, ou seulement l’équipement ?',
          'Que se passe-t-il si le palier de production visé est atteint avec six mois de retard ?',
        ],
      },
      {
        kind: 'paragraph',
        text: 'Poser ces questions avant de signer n’est pas un signe de méfiance. C’est la marque d’un dirigeant qui sait que le bon montant, mal calibré dans le temps, produit les mêmes effets qu’un mauvais montant.',
      },
      {kind: 'heading', text: 'Le temps, condition de la valeur'},
      {
        kind: 'paragraph',
        text: 'Dans l’économie réelle, la valeur ne se crée pas au moment de l’investissement mais plusieurs exercices plus tard : quand l’équipement tourne à plein, quand l’équipe formée est stable, quand les procédures sont écrites et que l’entreprise peut fonctionner sans son fondateur. Ce délai n’est pas un défaut du modèle, c’en est la condition. Un capital qui l’ignore pousse à des décisions courtes — vendre le stock à perte, repousser un entretien, renoncer à une formation — dont l’entreprise paie le prix ensuite.',
      },
      {
        kind: 'paragraph',
        text: 'C’est aussi ce qui rend ces activités intéressantes pour un investisseur qui accepte cet horizon : elles répondent à une demande locale existante, elles emploient, et leur croissance repose sur des actifs identifiables plutôt que sur des paris. Encore faut-il que les deux parties acceptent de compter en années plutôt qu’en trimestres.',
      },
    ],
  },
  {
    slug: 'trajectoires-entrepreneurs-six-etapes',
    title: 'Les six étapes qui reviennent dans toute trajectoire',
    excerpt:
      'Les parcours diffèrent, mais les points de bascule se ressemblent. Une lecture des étapes qui séparent une activité rentable d’une entreprise installée.',
    category: 'histoires',
    publishedAt: '2026-07-15',
    readingMinutes: 5,
    image: {src: '/images/cta-entrepreneur.webp', alt: 'Entrepreneur devant son lieu d’activité'},
    author: BLOG_AUTHOR,
    body: [
      {
        kind: 'paragraph',
        text: 'Cette rubrique est consacrée aux parcours d’entrepreneurs : comment une activité démarre, où elle bloque, ce qui la fait repartir. Nous y publierons des portraits menés avec les personnes concernées et publiés avec leur accord. En attendant, voici la trame commune que l’on retrouve d’un parcours à l’autre.',
      },
      {kind: 'heading', text: '1. L’amorçage par l’épargne et l’entourage'},
      {
        kind: 'paragraph',
        text: 'Presque aucune activité ne commence avec un financement extérieur. Elle commence avec une épargne personnelle, une avance familiale, parfois une tontine. Cette étape a une vertu : elle impose la frugalité. Elle a un défaut : elle brouille dès le départ la frontière entre les comptes du ménage et ceux de l’entreprise.',
      },
      {kind: 'heading', text: '2. Le premier client qui paie régulièrement'},
      {
        kind: 'paragraph',
        text: 'Le basculement ne se produit pas au premier client, mais au premier client récurrent. C’est lui qui transforme une suite d’opportunités en activité prévisible. C’est aussi à ce moment qu’apparaît le risque de dépendance : un client qui représente plus de la moitié des recettes est une force à court terme et une fragilité à moyen terme.',
      },
      {kind: 'heading', text: '3. Le plafond du dirigeant'},
      {
        kind: 'paragraph',
        text: 'Vient le moment où l’entreprise ne peut plus grandir parce qu’une seule personne vend, produit, achète, encaisse et décide. Ce plafond n’est pas financier : il est humain. Le franchir suppose de déléguer une tâche entière — souvent les achats ou la caisse — et d’accepter qu’elle soit faite autrement.',
      },
      {
        kind: 'quote',
        text: 'Une entreprise devient solide le jour où elle continue de fonctionner correctement pendant l’absence de celui qui l’a créée.',
      },
      {kind: 'heading', text: '4. L’écrit'},
      {
        kind: 'paragraph',
        text: 'Livre de caisse, fiches techniques, contrats de travail, bail signé, statuts : l’écrit arrive rarement par goût administratif. Il arrive parce qu’un litige, un vol ou un refus de crédit l’a rendu indispensable. Les parcours qui accélèrent sont presque toujours ceux qui ont pris cette étape en avance plutôt qu’en réaction.',
      },
      {kind: 'heading', text: '5. Le premier investissement lourd'},
      {
        kind: 'paragraph',
        text: 'Machine, véhicule, local, chambre froide : le premier investissement significatif est le moment où l’entreprise cesse d’être entièrement réversible. Il change la structure de coûts, ajoute des charges fixes et impose un niveau d’activité minimum. C’est là que la qualité de la préparation se paie, dans un sens ou dans l’autre.',
      },
      {kind: 'heading', text: '6. L’ouverture du capital ou du management'},
      {
        kind: 'paragraph',
        text: 'Dernière étape, la plus rare : accepter qu’une partie du pouvoir soit partagée, avec un associé, un investisseur ou un directeur recruté. Elle suppose une information financière fiable et une règle de décision claire. Les entreprises qui y parviennent ne sont pas les plus grandes ; ce sont celles qui ont commencé à écrire tôt.',
      },
      {
        kind: 'list',
        title: 'Ce que nous retiendrons dans nos portraits',
        items: [
          'Le point de départ réel, y compris les tentatives qui n’ont pas abouti.',
          'La décision la plus difficile et ce qu’elle a coûté.',
          'Ce que le dirigeant referait différemment aujourd’hui.',
          'Le conseil qu’il donnerait à quelqu’un qui démarre dans le même secteur.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'Ces six étapes ne sont pas un classement ni une méthode à appliquer dans l’ordre. Certaines entreprises franchissent l’écrit avant le premier client récurrent ; d’autres n’ouvrent jamais leur capital et se portent très bien. Ce que la trame indique, c’est où se situent les points de friction : c’est presque toujours à ces endroits qu’un accompagnement extérieur sert à quelque chose.',
      },
      {
        kind: 'paragraph',
        text: 'Si vous dirigez une entreprise à Kinshasa et que votre parcours éclaire l’une de ces étapes, écrivez-nous. Les portraits publiés ici seront construits à partir d’entretiens, relus par les personnes citées et datés. Aucun témoignage ne sera reconstitué ni illustré par des chiffres que l’entreprise n’aurait pas elle-même communiqués.',
      },
    ],
  },
  {
    slug: 'actualites-du-portefeuille-ce-que-vous-lirez-ici',
    title: 'Ce que vous lirez dans les actualités du portefeuille',
    excerpt:
      'Cette rubrique accueillera les informations relatives aux entreprises accompagnées par LOKAMBE. Voici ce qu’elle publiera, et selon quelles règles.',
    category: 'portefeuille',
    publishedAt: '2026-03-12',
    readingMinutes: 4,
    image: {src: '/images/model-hero.webp', alt: 'Équipe en réunion de suivi'},
    author: BLOG_AUTHOR,
    body: [
      {
        kind: 'paragraph',
        text: 'Cette rubrique est ouverte dès aujourd’hui, mais elle ne publie encore aucune actualité d’entreprise. C’est volontaire : une information de portefeuille n’a de valeur que si elle est exacte, vérifiée et publiée avec l’accord de l’entreprise concernée. Cet article décrit donc ce que la rubrique contiendra et les règles que nous nous imposons.',
      },
      {kind: 'heading', text: 'Ce que nous publierons'},
      {
        kind: 'list',
        items: [
          'Les annonces d’accompagnement, une fois l’opération finalisée et l’accord de l’entreprise obtenu.',
          'Les étapes industrielles et commerciales significatives : mise en service d’un équipement, ouverture d’un site, obtention d’une certification.',
          'Les enseignements transversaux tirés de l’accompagnement, présentés de manière anonyme lorsqu’ils touchent à des informations sensibles.',
          'Les rendez-vous publics : rencontres entrepreneurs, sessions de formation, appels à candidatures.',
        ],
      },
      {kind: 'heading', text: 'Ce que nous ne publierons pas'},
      {
        kind: 'list',
        items: [
          'Aucun chiffre d’affaires, aucune marge et aucune valorisation d’entreprise accompagnée sans autorisation écrite de ses dirigeants.',
          'Aucune performance du fonds présentée hors de son cadre de reporting officiel, destiné aux souscripteurs.',
          'Aucun témoignage reconstitué, reformulé ou publié sans relecture de la personne citée.',
          'Aucune annonce d’opération avant sa signature effective.',
        ],
      },
      {
        kind: 'quote',
        text: 'Une communication de portefeuille engage d’abord les entreprises dont on parle. Elle se construit avec elles, jamais à leur place.',
      },
      {kind: 'heading', text: 'Pourquoi ces règles'},
      {
        kind: 'paragraph',
        text: 'Une entreprise accompagnée est d’abord une entreprise qui travaille. Publier son chiffre d’affaires, ses difficultés passagères ou ses marges peut la desservir auprès de ses fournisseurs, de ses concurrents et parfois de ses propres salariés. La communication d’un investisseur ne doit jamais fragiliser la position commerciale de celui qu’il finance.',
      },
      {
        kind: 'paragraph',
        text: 'Ces règles protègent aussi le lecteur. Un secteur du financement où chaque acteur annonce des réussites invérifiables finit par produire de la méfiance générale, y compris envers les projets sérieux. Nous préférons une rubrique qui publie peu, tard et exactement, à une rubrique qui publie souvent et approximativement.',
      },
      {kind: 'heading', text: 'Comment nous vérifions une information'},
      {
        kind: 'paragraph',
        text: 'Chaque publication suit le même circuit : rédaction à partir d’éléments factuels documentés, relecture par l’entreprise concernée, validation interne, puis publication datée. Les corrections éventuelles sont signalées en bas d’article plutôt que réécrites en silence.',
      },
      {
        kind: 'paragraph',
        text: 'Les articles portant sur des enseignements généraux, eux, continueront de paraître dans les autres rubriques du blog : gestion, financement, création d’entreprise, commerce et restauration. Ils n’attendent l’accord de personne puisqu’ils ne parlent d’aucune entreprise en particulier.',
      },
      {kind: 'heading', text: 'Où trouver l’information officielle'},
      {
        kind: 'paragraph',
        text: 'Les documents relatifs au fonds, à sa stratégie d’investissement et à sa gouvernance sont présentés dans les pages dédiées du site. Les investisseurs et partenaires disposent par ailleurs d’un canal de reporting spécifique : le blog n’a pas vocation à s’y substituer. Il donne un cadre, du contexte et des repères ; il ne remplace ni un document contractuel, ni un conseil professionnel.',
      },
      {
        kind: 'paragraph',
        text: 'Si vous dirigez une entreprise et souhaitez être accompagné, la page de candidature décrit les critères d’éligibilité et les pièces attendues. Si vous êtes journaliste ou partenaire et cherchez une information précise, la page de contact est le chemin le plus court : nous préférons répondre directement plutôt que laisser circuler une donnée approximative.',
      },
      {
        kind: 'paragraph',
        text: 'En résumé, cette rubrique publiera des faits datés, validés et attribuables, à un rythme dicté par l’activité réelle et non par le calendrier éditorial. Tant qu’il n’y a rien à annoncer, il n’y aura rien à lire ici — et c’est une information en soi.',
      },
    ],
  },
];

/* ---------------------------------------------------------------- accès */

/** Articles triés du plus récent au plus ancien. */
export const blogArticles: readonly BlogArticle[] = [...ARTICLES].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export const blogSlugs: readonly string[] = blogArticles.map((article) => article.slug);

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}

/** Derniers articles publiés, en excluant éventuellement celui que l’on lit. */
export function getLatestArticles(limit = 3, excludeSlug?: string): BlogArticle[] {
  return blogArticles.filter((article) => article.slug !== excludeSlug).slice(0, limit);
}

/** Catégories effectivement utilisées, dans l’ordre de `blogCategories`. */
export function getUsedCategories(): BlogCategory[] {
  const used = new Set(blogArticles.map((article) => article.category));
  return blogCategories.filter((category) => used.has(category.id));
}

/** Chemin d’un article, relatif à la locale (`Link` de next-intl ajoute le préfixe). */
export function articlePath(slug: string): string {
  return `${BLOG_BASE_PATH}/${slug}`;
}

/** Date de publication en toutes lettres, par exemple « 2 septembre 2026 ». */
export function formatArticleDate(iso: string): string {
  return new Intl.DateTimeFormat('fr-FR', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'}).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

/** Ancre d’un intertitre, utilisée par le sommaire de l’article. */
export function headingAnchor(text: string, index: number): string {
  const base = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${index + 1}-${base || 'section'}`;
}

/** Durée de lecture affichée, par exemple « 5 min de lecture ». */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min de lecture`;
}
