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
  return defaultGalleryItems.map((item) => ({
    id: item.id,
    caption: item.caption,
    category: item.category,
    imageIndex: item.id,
  }))
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
      return { ...createDefaultState(), ...parsed }
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
