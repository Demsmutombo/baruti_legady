import { ceremonyPhotos } from './ceremonyImages.js'

const modules = import.meta.glob('../assets/bk/*.jpeg', { eager: true, import: 'default' })

function extractNum(path) {
  const match = path.match(/\((\d+)\)/)
  return match ? parseInt(match[1], 10) : 0
}

const sorted = Object.entries(modules).sort(
  ([a], [b]) => extractNum(a) - extractNum(b)
)

/** Toutes les images bk (1) à bk (47), triées par numéro */
export const bkImages = sorted.map(([, url]) => url)

/** Accès par numéro de fichier : bk(3) → bk (3).jpeg */
export const bk = (n) => bkImages[n - 1] ?? bkImages[0]

/** Images clés */
export const heroImage = bk(42)
export const biographyBannerImage = bk(3)
export const heroCarouselImages = [bk(42), bk(16), bk(27), bk(10), bk(11)]
export const pastorPortrait = bk(6)
export const pastorPreaching = bk(8)
export const pastorMinistry = bk(4)
export const pastorFamily = bk(15)
export const pastorCouple = bk(7)
export const pastorMemorial = bk(25)
export const pastorCrusade = bk(29)

const galleryMeta = {
  1: { category: 'campaigns', caption: 'Mémorial Pasteur Léonard Baruti Kasongo — Réveil 2026' },
  2: { category: 'historical', caption: 'Pasteur Baruti Kasongo' },
  3: { category: 'church', caption: 'Baruti Tabernacle — Kinshasa, Righini' },
  4: { category: 'historical', caption: 'Prédication au Tabernacle' },
  5: { category: 'historical', caption: 'Pasteur Baruti Kasongo — Ministère' },
  6: { category: 'historical', caption: 'Rév. Baruti Kasongo — Bureau pastoral' },
  7: { category: 'historical', caption: 'Pasteur Baruti et Mme Bazenga Alphoncine' },
  8: { category: 'campaigns', caption: 'Prédication devant l\'assemblée' },
  9: { category: 'campaigns', caption: 'Ministère de la Parole' },
  10: { category: 'campaigns', caption: 'Campagne d\'évangélisation' },
  11: { category: 'campaigns', caption: 'Prédication — Baruti Tabernacle' },
  12: { category: 'international', caption: 'Évangélisation — Pasteur Baruti Kasongo' },
  13: { category: 'campaigns', caption: 'Crusade — Guérison et salut' },
  14: { category: 'campaigns', caption: 'Campagne Docteur Jésus' },
  15: { category: 'historical', caption: 'Famille Kasongo — Joyeux anniversaire Pasteur Baruti' },
  16: { category: 'historical', caption: 'Pasteur Baruti Kasongo — Portrait' },
  17: { category: 'historical', caption: 'Révérend Baruti Kasongo' },
  18: { category: 'church', caption: 'Baruti Tabernacle' },
  19: { category: 'church', caption: 'Assemblée chrétienne — Righini' },
  20: { category: 'historical', caption: 'Pasteur Baruti Kasongo' },
  21: { category: 'historical', caption: 'Ministère pastoral' },
  22: { category: 'campaigns', caption: 'Évangélisation — Kinshasa' },
  23: { category: 'campaigns', caption: 'Campagne de guérison' },
  24: { category: 'church', caption: 'Baruti Tabernacle — Culte' },
  25: { category: 'historical', caption: 'Patriarche Baruti Kasongo — Notre fierté' },
  26: { category: 'church', caption: 'Baruti Tabernacle — Logo' },
  27: { category: 'church', caption: 'Pasteur Baruti Ministries' },
  28: { category: 'church', caption: 'Baruti Tabernacle — Affiche' },
  29: { category: 'campaigns', caption: 'Campagne d\'évangélisation — RTVA Direct' },
  30: { category: 'church', caption: 'Baruti Tabernacle' },
  31: { category: 'international', caption: 'Ministère international — Pasteur Baruti' },
  32: { category: 'international', caption: 'Évangélisation mondiale' },
  33: { category: 'international', caption: 'Campagne — Amérique du Sud' },
  34: { category: 'international', caption: 'Campagne — Océanie' },
  35: { category: 'campaigns', caption: 'Crusade — Mbandaka' },
  36: { category: 'campaigns', caption: 'Campagne — Kahemba' },
  37: { category: 'campaigns', caption: 'Campagne — Boende' },
  38: { category: 'campaigns', caption: 'Campagne — Gemena' },
  39: { category: 'campaigns', caption: 'Campagne — Kimpese' },
  40: { category: 'campaigns', caption: 'Campagne — Katako-Kombe' },
  41: { category: 'historical', caption: 'Pasteur Baruti Kasongo — Message de l\'heure' },
  42: { category: 'historical', caption: 'Révérend Baruti Kasongo Bin N\'djadi' },
  43: { category: 'historical', caption: 'L\'homme de la relève' },
  44: { category: 'historical', caption: 'Ministère depuis 1973' },
  45: { category: 'historical', caption: 'Pasteur élu — Righini 1990' },
  46: { category: 'campaigns', caption: 'Docteur Jésus — Stade Tata Raphaël 2016' },
  47: { category: 'historical', caption: 'Héritage — Pasteur Léonard Baruti Kasongo' },
}

const defaultCategories = ['historical', 'campaigns', 'church', 'international']

const ceremonyGalleryCaption = 'BK MEMORIAL — Mercredi 23.06.2026'
const CEREMONY_GALLERY_BASE_ID = 1000

const bkGalleryItems = bkImages.map((image, index) => {
  const num = index + 1
  const meta = galleryMeta[num]
  return {
    id: num,
    image,
    category: meta?.category ?? defaultCategories[index % defaultCategories.length],
    caption: meta?.caption ?? `Pasteur Baruti Kasongo — Ministère (${num})`,
  }
})

const ceremonyGalleryItems = ceremonyPhotos.map((image, index) => ({
  id: CEREMONY_GALLERY_BASE_ID + index,
  image,
  customImage: image,
  category: 'memorial',
  caption: ceremonyGalleryCaption,
}))

export const galleryItems = [...bkGalleryItems, ...ceremonyGalleryItems]

/** Images assignées aux campagnes (ordre = campaigns.js) */
export const campaignImages = [
  bk(36), // Kahemba
  bk(40), // Katako-Kombe
  bk(37), // Boende
  bk(35), // Mbandaka
  bk(46), // Docteur Jésus Kinshasa
  bk(39), // Kimpese
  bk(33), // Brésil
  bk(34), // Australie
  bk(38), // Gemena
]
