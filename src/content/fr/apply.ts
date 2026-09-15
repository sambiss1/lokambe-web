import type {ApplyContent} from '../types';

export const apply: ApplyContent = {
  meta: {
    title: 'Soumettre un projet',
    description:
      'Entrepreneurs congolais : présentez votre activité à LOKAMBE pour obtenir du capital productif et un accompagnement adapté.',
  },
  hero: {
    eyebrow: 'Entrepreneurs',
    title: 'Présentez-nous votre projet',
    intro:
      'Vous développez une activité réelle et vous avez besoin de capital productif et d’accompagnement pour changer d’échelle ? Nous ne donnons pas : nous investissons à vos côtés.',
    image: {src: '/images/apply-hero.webp', alt: 'Commerçante souriante au comptoir de sa boutique'},
  },
  eligibility: {
    eyebrow: 'Avant de commencer',
    title: 'Ce que nous regardons',
    items: [
      'Une activité réelle',
      'Des revenus existants ou démontrables',
      'Une clientèle identifiable',
      'Un besoin précis et une utilisation claire du capital',
      'Un potentiel d’amélioration et de croissance',
    ],
    note: 'Votre activité n’est pas encore formalisée ? Ce n’est pas forcément un obstacle : LOKAMBE peut accompagner sa structuration et sa formalisation.',
  },
  documents: {
    title: 'Documents utiles',
    intro: 'Joignez ce qui aide à comprendre votre activité :',
    items: [
      'Photos de votre activité (local, production, équipements)',
      'Relevés de ventes, cahier de caisse ou factures',
      'Devis des équipements ou achats envisagés',
      'RCCM ou documents administratifs si votre activité est formalisée',
    ],
    formats: 'Formats acceptés : PDF, JPG, PNG ou WEBP — 5 fichiers maximum, 10 Mo par fichier.',
  },
  nextSteps: {
    eyebrow: 'Après votre envoi',
    title: 'Comment votre dossier est étudié',
    steps: [
      {title: 'Réception', text: 'Vous recevez une référence de dossier. Conservez-la pour tout échange avec nous.'},
      {title: 'Présélection', text: 'Un premier filtre est réalisé selon nos critères d’investissement.'},
      {title: 'Visite', text: 'Si votre dossier est présélectionné, nous venons vérifier et comprendre votre activité sur le terrain.'},
      {
        title: 'Analyse et décision',
        text: 'Analyse commerciale, financière et opérationnelle, puis décision collégiale du Comité d’investissement.',
      },
    ],
  },
  form: {
    title: 'Votre candidature',
    privacyText: 'Vos informations sont utilisées uniquement pour l’étude de votre dossier par l’équipe LOKAMBE.',
    privacyLink: {label: 'Politique de confidentialité', href: '/confidentialite'},
  },
};
