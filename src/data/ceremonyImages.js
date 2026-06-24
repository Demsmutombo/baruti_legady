const modules = import.meta.glob('../assets/ceremonies/*.{jpeg,jpg,JPG,JPEG,png,webp}', {
  eager: true,
  import: 'default',
})

function sortCeremonyPaths([pathA], [pathB]) {
  const a = pathA.toLowerCase()
  const b = pathB.toLowerCase()
  if (a.includes('mos.')) return -1
  if (b.includes('mos.')) return 1
  return pathA.localeCompare(pathB, undefined, { numeric: true })
}

/** Photos BK Memorial — dossier src/assets/ceremonies */
export const ceremonyPhotos = Object.entries(modules)
  .sort(sortCeremonyPaths)
  .map(([, url]) => url)

/** Photo principale (mos.jpeg) — en-tête de la section */
export const ceremonyMosImage = ceremonyPhotos[0] ?? null
