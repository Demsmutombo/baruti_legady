/** Registre des lieux [lat, lng] pour la cartographie du ministère */
export const mapLocationByName = {
  Kahemba: { coords: [-6.38, 18.58], scope: 'rdc', label: 'Kahemba' },
  'Katako-Kombe': { coords: [-3.68, 23.95], scope: 'rdc', label: 'Katako-Kombe' },
  Boende: { coords: [-0.28, 20.88], scope: 'rdc', label: 'Boende' },
  Mbandaka: { coords: [0.05, 18.26], scope: 'rdc', label: 'Mbandaka' },
  Kinshasa: { coords: [-4.32, 15.31], scope: 'rdc', label: 'Kinshasa' },
  'Kinshasa — « Docteur Jésus »': { coords: [-4.32, 15.31], scope: 'rdc', label: 'Kinshasa' },
  Ngaliema: { coords: [-4.38, 15.22], scope: 'rdc', label: 'Ngaliema, Kinshasa' },
  Kimpese: { coords: [-5.55, 14.73], scope: 'rdc', label: 'Kimpese' },
  Gemena: { coords: [3.25, 19.77], scope: 'rdc', label: 'Gemena' },
  Idiofa: { coords: [-1.98, 19.6], scope: 'rdc', label: 'Idiofa' },
  Bulungu: { coords: [-4.72, 17.73], scope: 'rdc', label: 'Bulungu' },
  RDC: { coords: [-2.5, 23.5], scope: 'rdc', label: 'République Démocratique du Congo' },
  Brésil: { coords: [-15.78, -47.93], scope: 'international', label: 'Brésil' },
  Australie: { coords: [-25.27, 133.78], scope: 'international', label: 'Australie' },
  Montréal: { coords: [45.5, -73.57], scope: 'international', label: 'Montréal, Canada' },
}

/** Alias pour compatibilité campagnes */
export const campaignLocationByRegion = mapLocationByName

const testimonyTextHints = [
  { pattern: /gemena/i, key: 'Gemena' },
  { pattern: /brésil|bresil/i, key: 'Brésil' },
  { pattern: /montréal|montreal/i, key: 'Montréal' },
  { pattern: /idiofa/i, key: 'Idiofa' },
  { pattern: /bulungu/i, key: 'Bulungu' },
  { pattern: /docteur jésus|tata raphaël|30 juin|kinshasa/i, key: 'Kinshasa' },
  { pattern: /15\s*000 fidèles|15\s*000 fideles/i, key: 'Kinshasa' },
]

const hommageRoleHints = [
  { pattern: /ngaliema|righini|tabernacle/i, key: 'Ngaliema' },
  { pattern: /\brdc\b|congo|kinshasa/i, key: 'Kinshasa' },
]

export function markerRadiusFromYear(year) {
  const y = Number.parseInt(String(year), 10) || 2000
  if (y >= 2020) return 9
  if (y >= 2015) return 8
  if (y >= 2010) return 7
  return 6
}

export function resolveMapLocation(name) {
  if (!name) return null
  const trimmed = String(name).trim()
  if (mapLocationByName[trimmed]) return mapLocationByName[trimmed]

  const key = Object.keys(mapLocationByName).find(
    (entry) =>
      entry.toLowerCase() === trimmed.toLowerCase() ||
      entry.toLowerCase().includes(trimmed.toLowerCase()) ||
      trimmed.toLowerCase().includes(entry.toLowerCase().split('—')[0].trim()),
  )
  return key ? mapLocationByName[key] : null
}

function inferLocationFromText(text, hints) {
  if (!text) return null
  const match = hints.find((hint) => hint.pattern.test(text))
  return match ? resolveMapLocation(match.key) : null
}

export function enrichCampaignLocation(campaign) {
  const meta =
    campaign.coords?.length === 2
      ? { coords: campaign.coords, scope: campaign.scope || 'rdc', label: campaign.region }
      : resolveMapLocation(campaign.location || campaign.region)

  if (!meta) return campaign

  return {
    ...campaign,
    coords: meta.coords,
    scope: meta.scope,
    placeLabel: meta.label,
    markerRadius: markerRadiusFromYear(campaign.year),
  }
}

export function enrichTestimonyLocation(testimony) {
  if (testimony.coords?.length === 2) {
    return {
      ...testimony,
      placeLabel: testimony.location || testimony.placeLabel || 'Lieu',
      scope: testimony.scope || 'rdc',
      markerRadius: 7,
    }
  }

  const meta =
    resolveMapLocation(testimony.location) ||
    inferLocationFromText(`${testimony.title} ${testimony.text}`, testimonyTextHints) ||
    resolveMapLocation('Kinshasa')

  if (!meta) return testimony

  return {
    ...testimony,
    coords: meta.coords,
    scope: meta.scope,
    placeLabel: meta.label,
    markerRadius: 7,
  }
}

export function enrichHommageLocation(hommage) {
  if (hommage.coords?.length === 2) {
    return {
      ...hommage,
      placeLabel: hommage.location || hommage.placeLabel || 'Lieu',
      scope: hommage.scope || 'rdc',
      markerRadius: 7,
    }
  }

  const meta =
    resolveMapLocation(hommage.location) ||
    inferLocationFromText(`${hommage.role} ${hommage.author}`, hommageRoleHints) ||
    resolveMapLocation('Kinshasa')

  if (!meta) return hommage

  return {
    ...hommage,
    coords: meta.coords,
    scope: meta.scope,
    placeLabel: meta.label,
    markerRadius: 7,
  }
}
