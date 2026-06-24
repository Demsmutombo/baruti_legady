import { reactive, computed, readonly } from 'vue'
import {
  pastor as defaultPastor,
  highlights as defaultHighlights,
  teachings as defaultTeachings,
  hommages as defaultHommages,
  ministrySections as defaultMinistrySections,
  contact as defaultContact,
} from '../data/content.js'
import {
  biographyEssentials as defaultBioEssentials,
  biographyChapters as defaultBioChapters,
  biographyEvents as defaultBioEvents,
  nameMeanings as defaultNameMeanings,
} from '../data/biography.js'
import { campaigns as defaultCampaigns } from '../data/campaigns.js'
import { testimonies as defaultTestimonies } from '../data/testimonies.js'
import { galleryItems as defaultGalleryItems, bkImages, bk } from '../data/images.js'
import { ceremonies as defaultCeremonies } from '../data/ceremonies.js'
import { ceremonyPhotos } from '../data/ceremonyImages.js'

const STORAGE_KEY = 'baruti-cms-v1'

function imageToIndex(url) {
  const idx = bkImages.indexOf(url)
  return idx >= 0 ? idx + 1 : 1
}

function withIds(items, startId = 1) {
  return items.map((item, i) => ({ ...item, id: item.id ?? startId + i }))
}

function seedCampaigns() {
  return withIds(
    defaultCampaigns.map((c) => ({
      year: c.year,
      region: c.region,
      country: c.country,
      description: c.description,
      imageIndex: imageToIndex(c.image),
    }))
  )
}

function seedGallery() {
  return defaultGalleryItems.map((item) => {
    const entry = {
      id: item.id,
      caption: item.caption,
      category: item.category,
    }
    if (item.customImage) {
      entry.customImage = item.customImage
    } else {
      entry.imageIndex = item.id
    }
    return entry
  })
}

function createDefaultState() {
  return {
    pastor: { ...defaultPastor },
    highlights: withIds(defaultHighlights),
    ministrySections: withIds(defaultMinistrySections),
    campaigns: seedCampaigns(),
    testimonies: withIds(defaultTestimonies),
    teachings: withIds(defaultTeachings),
    hommages: withIds(defaultHommages),
    ceremonies: withIds(defaultCeremonies),
    galleryItems: seedGallery(),
    contact: { ...defaultContact },
    biographyEssentials: { ...defaultBioEssentials },
    biographyChapters: withIds(defaultBioChapters),
    biographyEvents: withIds(defaultBioEvents),
    nameMeanings: withIds(defaultNameMeanings),
    contactMessages: [],
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      const merged = { ...createDefaultState(), ...parsed }
      const hasMemorialCeremony = merged.ceremonies?.some((c) => c.photoSource === 'ceremonies')
      if (!hasMemorialCeremony) {
        merged.ceremonies = withIds(defaultCeremonies)
      }
      const memorialDefaults = defaultGalleryItems.filter((item) => item.category === 'memorial')
      const existingMemorialIds = new Set(
        (merged.galleryItems || []).filter((item) => item.category === 'memorial').map((item) => item.id),
      )
      const missingMemorial = memorialDefaults
        .filter((item) => !existingMemorialIds.has(item.id))
        .map((item) => ({
          id: item.id,
          caption: item.caption,
          category: item.category,
          customImage: item.customImage,
        }))
      if (missingMemorial.length) {
        merged.galleryItems = [...(merged.galleryItems || []), ...missingMemorial]
      }
      return merged
    }
  } catch {
    /* ignore */
  }
  return createDefaultState()
}

const state = reactive(loadState())

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

function nextId(list) {
  if (!list.length) return 1
  return Math.max(...list.map((item) => Number(item.id) || 0)) + 1
}

function resolveCampaign(c) {
  return {
    ...c,
    image: bk(c.imageIndex || 1),
  }
}

function resolveCeremony(c) {
  const gallery =
    c.photoSource === 'ceremonies'
      ? ceremonyPhotos
      : c.customImage
        ? [c.customImage]
        : c.imageIndex
          ? [bk(c.imageIndex)]
          : []

  return {
    ...c,
    image: gallery[0] || null,
    gallery,
    paragraphs: String(c.description || '')
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean),
  }
}

function resolveGalleryItem(item) {
  return {
    ...item,
    image: item.customImage || bk(item.imageIndex || item.id || 1),
  }
}

const store = {
  state: readonly(state),

  // Resolved getters for public site
  pastor: computed(() => state.pastor),
  highlights: computed(() => state.highlights),
  ministrySections: computed(() => state.ministrySections),
  campaigns: computed(() => state.campaigns.map(resolveCampaign)),
  testimonies: computed(() => state.testimonies),
  teachings: computed(() => state.teachings),
  hommages: computed(() => state.hommages),
  ceremonies: computed(() => state.ceremonies.map(resolveCeremony)),
  galleryItems: computed(() => state.galleryItems.map(resolveGalleryItem)),
  contact: computed(() => state.contact),
  biographyEssentials: computed(() => state.biographyEssentials),
  biographyChapters: computed(() => state.biographyChapters),
  biographyEvents: computed(() => state.biographyEvents),
  nameMeanings: computed(() => state.nameMeanings),

  stats: computed(() => ({
    highlights: state.highlights.length,
    campaigns: state.campaigns.length,
    testimonies: state.testimonies.length,
    teachings: state.teachings.length,
    hommages: state.hommages.length,
    ceremonies: state.ceremonies.length,
    gallery: state.galleryItems.length,
    ministrySections: state.ministrySections.length,
    biographyEvents: state.biographyEvents.length,
    biographyChapters: state.biographyChapters.length,
  })),

  updatePastor(data) {
    Object.assign(state.pastor, data)
    persist()
  },

  updateContact(data) {
    Object.assign(state.contact, data)
    persist()
  },

  updateBiographyEssentials(data) {
    Object.assign(state.biographyEssentials, data)
    persist()
  },

  list(collection) {
    return state[collection] || []
  },

  create(collection, item) {
    const list = state[collection]
    if (!Array.isArray(list)) return null
    const entry = { ...item, id: nextId(list) }
    list.push(entry)
    persist()
    return entry
  },

  update(collection, id, data) {
    const list = state[collection]
    if (!Array.isArray(list)) return false
    const index = list.findIndex((item) => item.id === id)
    if (index === -1) return false
    list[index] = { ...list[index], ...data, id }
    persist()
    return true
  },

  remove(collection, id) {
    const list = state[collection]
    if (!Array.isArray(list)) return false
    const index = list.findIndex((item) => item.id === id)
    if (index === -1) return false
    list.splice(index, 1)
    persist()
    return true
  },

  resetAll() {
    const fresh = createDefaultState()
    Object.keys(fresh).forEach((key) => {
      state[key] = fresh[key]
    })
    persist()
  },
}

export function useCmsStore() {
  return store
}

export { bk, bkImages } from '../data/images.js'
