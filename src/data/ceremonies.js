export const ceremonyTypeLabels = {
  veillee: 'Veillée mortuaire',
  culte: 'Culte d\'hommage',
  inhumation: 'Inhumation',
  commemoration: 'Commémoration',
  autre: 'Autre',
}

export const ceremonyTypeOptions = Object.entries(ceremonyTypeLabels).map(([value, label]) => ({
  value,
  label,
}))

export const ceremonyMemorialIntro = {
  eyebrow: 'BK MEMORIAL',
  dateLine: 'Mercredi 23.06.2026',
  title: 'Dépôt de gerbe au mausolée du Pasteur Baruti Kasongo',
}

export const ceremonyMemorialParagraphs = [
  'Dans un moment empreint de recueillement et de profonde émotion, une cérémonie de dépôt de gerbe de fleurs a été organisée au mausolée du Pasteur **BARUTI KASONGO**.',
  'Deux ans après son départ dans la gloire, sa mémoire demeure vivante dans les cœurs et continue d\'inspirer respect, reconnaissance et admiration.',
  'Le geste solennel a été accompli par le Pasteur **BARUTI KALALA Carlos**, en hommage à l\'héritage spirituel et humain laissé par l\'illustre disparu. À travers ce symbole de fidélité et de souvenir, la famille, les proches et les fidèles réaffirment leur attachement à son œuvre et à sa vision.',
  'Ce moment de mémoire s\'inscrit dans la continuité du devoir de reconnaissance envers un serviteur de Dieu dont l\'impact reste profondément marqué dans la communauté.',
]

export const ceremonies = [
  {
    title: ceremonyMemorialIntro.title,
    type: 'commemoration',
    date: '23 juin 2026',
    time: '',
    location: 'Mausolée du Pasteur Baruti Kasongo',
    city: 'Kinshasa, RDC',
    description: ceremonyMemorialParagraphs.join('\n\n'),
    photoSource: 'ceremonies',
  },
]
