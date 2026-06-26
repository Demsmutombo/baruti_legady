<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  enrichCampaignLocation,
  enrichTestimonyLocation,
  enrichHommageLocation,
} from '../data/mapLocations.js'
import { testimonyCategoryLabels } from '../data/testimonies.js'

const props = defineProps({
  campaigns: { type: Array, default: () => [] },
  testimonies: { type: Array, default: () => [] },
  hommages: { type: Array, default: () => [] },
  defaultAction: {
    type: String,
    default: 'campagnes',
    validator: (v) => ['campagnes', 'temoignages', 'hommages'].includes(v),
  },
  availableActions: {
    type: Array,
    default: () => ['campagnes', 'temoignages', 'hommages'],
  },
})

const emit = defineEmits(['select'])

const actionConfig = {
  campagnes: {
    label: 'Campagnes',
    searchPlaceholder: 'Rechercher une campagne…',
    mapAriaLabel: 'Carte des campagnes d\'évangélisation',
    activeLabel: 'Campagne active',
  },
  temoignages: {
    label: 'Témoignages',
    searchPlaceholder: 'Rechercher un témoignage…',
    mapAriaLabel: 'Carte des témoignages du ministère',
    activeLabel: 'Témoignage actif',
  },
  hommages: {
    label: 'Hommages',
    searchPlaceholder: 'Rechercher un hommage…',
    mapAriaLabel: 'Carte des hommages et condoléances',
    activeLabel: 'Hommage actif',
  },
}

const mapRef = ref(null)
const searchQuery = ref('')
const activeAction = ref(props.defaultAction)
const activeId = ref(null)
const mapView = ref('plan')
const mapCenter = ref({ lat: -2.5, lng: 20 })
const mapZoom = ref(4)
const pointerPosition = ref(null)
const livePanelOpen = ref(false)

let mapInstance = null
let markersLayer = null
let tileLayer = null
const markerRefs = new Map()

const mapLayers = {
  plan: {
    label: 'Plan',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  },
  satellite: {
    label: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
    maxZoom: 19,
  },
  relief: {
    label: 'Relief',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map: &copy; OpenStreetMap, SRTM | Style: OpenTopoMap',
    maxZoom: 17,
  },
}

const visibleActions = computed(() =>
  props.availableActions.filter((key) => actionConfig[key]),
)

const currentConfig = computed(() => actionConfig[activeAction.value])

function normalizeCampaign(campaign, index) {
  const enriched = enrichCampaignLocation(campaign)
  if (!enriched.coords?.length) return null
  return {
    mapType: 'campagnes',
    id: enriched.id ?? `campaign-${index}`,
    raw: enriched,
    title: enriched.region,
    subtitle: `${enriched.year} · ${enriched.country}`,
    placeLabel: enriched.placeLabel || enriched.region,
    coords: enriched.coords,
    scope: enriched.scope,
    markerRadius: enriched.markerRadius || 7,
    searchText: `${enriched.region} ${enriched.country} ${enriched.year} ${enriched.description || ''}`.toLowerCase(),
  }
}

function normalizeTestimony(testimony, index) {
  const enriched = enrichTestimonyLocation(testimony)
  if (!enriched.coords?.length) return null
  return {
    mapType: 'temoignages',
    id: enriched.id ?? `testimony-${index}`,
    raw: enriched,
    title: enriched.title,
    subtitle: testimonyCategoryLabels[enriched.category] || enriched.category,
    placeLabel: enriched.placeLabel || enriched.location || 'Lieu',
    coords: enriched.coords,
    scope: enriched.scope,
    markerRadius: enriched.markerRadius || 7,
    searchText: `${enriched.title} ${enriched.text || ''} ${enriched.category || ''}`.toLowerCase(),
  }
}

function normalizeHommage(hommage, index) {
  const enriched = enrichHommageLocation(hommage)
  if (!enriched.coords?.length) return null
  return {
    mapType: 'hommages',
    id: enriched.id ?? `hommage-${index}`,
    raw: enriched,
    title: enriched.author,
    subtitle: enriched.role,
    placeLabel: enriched.placeLabel || enriched.location || 'Lieu',
    coords: enriched.coords,
    scope: enriched.scope,
    markerRadius: enriched.markerRadius || 7,
    searchText: `${enriched.author} ${enriched.role} ${enriched.message || ''}`.toLowerCase(),
  }
}

const allItemsByAction = computed(() => ({
  campagnes: props.campaigns.map(normalizeCampaign).filter(Boolean),
  temoignages: props.testimonies.map(normalizeTestimony).filter(Boolean),
  hommages: props.hommages.map(normalizeHommage).filter(Boolean),
}))

const activeItems = computed(() => allItemsByAction.value[activeAction.value] || [])

const filteredItems = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return activeItems.value
  return activeItems.value.filter((item) => item.searchText.includes(q))
})

const stats = computed(() => {
  const items = activeItems.value
  if (activeAction.value === 'campagnes') {
    return {
      primary: items.length,
      secondary: items.filter((i) => i.scope === 'rdc').length,
      tertiary: items.filter((i) => i.scope === 'international').length,
      labels: ['Campagnes', 'RDC', 'International'],
    }
  }
  if (activeAction.value === 'temoignages') {
    const categories = new Set(items.map((i) => i.subtitle).filter(Boolean))
    return {
      primary: items.length,
      secondary: categories.size,
      tertiary: items.filter((i) => i.scope === 'international').length,
      labels: ['Témoignages', 'Catégories', 'International'],
    }
  }
  return {
    primary: items.length,
    secondary: items.filter((i) => i.raw?.mediaUrl).length,
    tertiary: items.filter((i) => i.scope === 'rdc').length,
    labels: ['Hommages', 'Avec média', 'En RDC'],
  }
})

const legendItems = computed(() => {
  if (activeAction.value === 'campagnes') {
    return [
      { class: 'rdc', label: 'Provinces congolaises' },
      { class: 'intl', label: 'Missions internationales' },
    ]
  }
  if (activeAction.value === 'temoignages') {
    return [{ class: 'testimony', label: 'Miracles et faits du ministère' }]
  }
  return [{ class: 'hommage', label: 'Messages et condoléances' }]
})

const scopeDots = computed(() =>
  activeItems.value.map((item) => ({
    id: item.id,
    scope: item.scope,
    mapType: item.mapType,
  })),
)

const activeItem = computed(() => filteredItems.value.find((item) => item.id === activeId.value) ?? null)

function formatCoord(value, type) {
  const abs = Math.abs(value).toFixed(5)
  const dir = type === 'lat' ? (value >= 0 ? 'N' : 'S') : value >= 0 ? 'E' : 'W'
  return `${abs}° ${dir}`
}

function itemKey(item) {
  return item.id
}

function getMarkerFill(item, isActive) {
  if (item.mapType === 'campagnes') {
    return item.scope === 'international' ? '#c9a227' : '#0f2847'
  }
  if (item.mapType === 'temoignages') return isActive ? '#145c38' : '#1b7a4e'
  return isActive ? '#5a3d96' : '#7c5cbf'
}

function getListMarkerClass(item) {
  if (item.mapType === 'campagnes') {
    return item.scope === 'international' ? 'campaign-map__list-marker--intl' : 'campaign-map__list-marker--rdc'
  }
  if (item.mapType === 'temoignages') return 'campaign-map__list-marker--testimony'
  return 'campaign-map__list-marker--hommage'
}

function getHemicycleClass(item) {
  if (item.mapType === 'campagnes') {
    return item.scope === 'international' ? 'campaign-map__hemicycle-dot--intl' : 'campaign-map__hemicycle-dot--rdc'
  }
  if (item.mapType === 'temoignages') return 'campaign-map__hemicycle-dot--testimony'
  return 'campaign-map__hemicycle-dot--hommage'
}

function createMarkerIcon(item, isActive) {
  const radius = (item.markerRadius || 7) * (isActive ? 1.15 : 1)
  const fill = getMarkerFill(item, isActive)
  const html = `
    <span class="campaign-leaflet-marker ${isActive ? 'campaign-leaflet-marker--active' : ''}"
      style="width:${radius * 2}px;height:${radius * 2}px;background:${fill};">
    </span>
  `
  return L.divIcon({
    className: 'campaign-leaflet-marker-wrap',
    html,
    iconSize: [radius * 2, radius * 2],
    iconAnchor: [radius, radius],
  })
}

function updateLivePosition() {
  if (!mapInstance) return
  const center = mapInstance.getCenter()
  mapCenter.value = { lat: center.lat, lng: center.lng }
  mapZoom.value = mapInstance.getZoom()
}

function setTileLayer(mode) {
  if (!mapInstance) return
  const config = mapLayers[mode]
  if (!config) return

  if (tileLayer) mapInstance.removeLayer(tileLayer)

  tileLayer = L.tileLayer(config.url, {
    attribution: config.attribution,
    maxZoom: config.maxZoom,
  }).addTo(mapInstance)
}

function renderMarkers() {
  if (!mapInstance || !markersLayer) return

  markersLayer.clearLayers()
  markerRefs.clear()

  filteredItems.value.forEach((item) => {
    const key = itemKey(item)
    const [lat, lng] = item.coords
    const isActive = activeId.value === key

    const marker = L.marker([lat, lng], {
      icon: createMarkerIcon(item, isActive),
      title: item.title,
    })

    marker.bindPopup(`
      <div class="campaign-map-popup">
        <strong>${item.title}</strong>
        <span>${item.subtitle}</span>
        <em>${item.placeLabel} · ${formatCoord(lat, 'lat')} · ${formatCoord(lng, 'lng')}</em>
        <small style="display:block;margin-top:6px;color:#c9a227;font-weight:600;">Cliquer pour voir le détail</small>
      </div>
    `)

    marker.on('click', () => {
      activeId.value = key
      pointerPosition.value = { lat, lng, label: item.title }
      emit('select', { type: item.mapType, item: item.raw })
      renderMarkers()
    })

    marker.on('mouseover', () => {
      pointerPosition.value = { lat, lng, label: item.title }
    })

    marker.addTo(markersLayer)
    markerRefs.set(key, marker)
  })
}

function fitMapToItems(items) {
  if (!mapInstance || !items.length) return
  const bounds = L.latLngBounds(items.map((item) => item.coords))
  mapInstance.fitBounds(bounds.pad(0.35))
  updateLivePosition()
}

function initMap() {
  if (!mapRef.value || mapInstance) return

  mapInstance = L.map(mapRef.value, {
    center: [-2.5, 20],
    zoom: 4,
    minZoom: 2,
    maxZoom: 18,
    zoomControl: true,
    scrollWheelZoom: true,
  })

  markersLayer = L.layerGroup().addTo(mapInstance)
  setTileLayer(mapView.value)

  mapInstance.on('move zoom moveend zoomend', updateLivePosition)
  mapInstance.on('mousemove', (event) => {
    pointerPosition.value = {
      lat: event.latlng.lat,
      lng: event.latlng.lng,
      label: 'Curseur',
    }
  })

  updateLivePosition()
  renderMarkers()
  fitMapToItems(filteredItems.value)

  nextTick(() => mapInstance?.invalidateSize())
}

function destroyMap() {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
    markersLayer = null
    tileLayer = null
    markerRefs.clear()
  }
}

function focusItem(item, openPopup = false) {
  const key = itemKey(item)
  activeId.value = key
  pointerPosition.value = {
    lat: item.coords[0],
    lng: item.coords[1],
    label: item.title,
  }

  if (mapInstance) {
    mapInstance.flyTo(item.coords, Math.max(mapInstance.getZoom(), 8), { duration: 0.85 })
    renderMarkers()
    if (openPopup) nextTick(() => markerRefs.get(key)?.openPopup())
  }

  emit('select', { type: item.mapType, item: item.raw })
}

function switchAction(action) {
  if (activeAction.value === action) return
  activeAction.value = action
  searchQuery.value = ''
  activeId.value = null
  pointerPosition.value = null
  nextTick(() => {
    renderMarkers()
    fitMapToItems(filteredItems.value)
  })
}

watch(mapView, (mode) => setTileLayer(mode))

watch(filteredItems, () => renderMarkers())

watch(livePanelOpen, () => nextTick(() => mapInstance?.invalidateSize()))

watch(
  () => props.defaultAction,
  (value) => {
    if (visibleActions.value.includes(value)) activeAction.value = value
  },
)

onMounted(() => nextTick(() => initMap()))
onUnmounted(() => destroyMap())
</script>

<template>
  <div class="campaign-map ministry-map" data-aos="fade-up">
    <div class="campaign-map__toolbar">
      <div
        v-if="visibleActions.length > 1"
        class="ministry-map__action-switch"
        role="tablist"
        aria-label="Type de contenu à afficher"
      >
        <button
          v-for="key in visibleActions"
          :key="key"
          type="button"
          role="tab"
          class="ministry-map__action-btn"
          :class="{ 'ministry-map__action-btn--active': activeAction === key }"
          :aria-selected="activeAction === key"
          @click="switchAction(key)"
        >
          {{ actionConfig[key].label }}
        </button>
      </div>

      <label class="campaign-map__search-wrap">
        <svg class="campaign-map__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.75" />
          <path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
        </svg>
        <input
          v-model="searchQuery"
          type="search"
          class="campaign-map__search"
          :placeholder="currentConfig.searchPlaceholder"
          :aria-label="currentConfig.searchPlaceholder"
        />
      </label>

      <div class="campaign-map__view-switch" role="group" aria-label="Type de carte">
        <button
          v-for="(layer, key) in mapLayers"
          :key="key"
          type="button"
          class="campaign-map__view-btn"
          :class="{ 'campaign-map__view-btn--active': mapView === key }"
          @click="mapView = key"
        >
          {{ layer.label }}
        </button>
      </div>
    </div>

    <div class="campaign-map__layout">
      <div class="campaign-map__map-column">
        <div class="campaign-map__canvas-wrap">
          <div ref="mapRef" class="campaign-map__canvas" :aria-label="currentConfig.mapAriaLabel" />
        </div>

        <div
          class="campaign-map__live-panel"
          :class="{ 'campaign-map__live-panel--open': livePanelOpen }"
          aria-live="polite"
        >
          <button
            type="button"
            class="campaign-map__live-toggle"
            :aria-expanded="livePanelOpen"
            @click="livePanelOpen = !livePanelOpen"
          >
            <span class="campaign-map__live-toggle-main">
              <span class="campaign-map__live-title">Position en temps réel</span>
              <span class="campaign-map__live-summary">
                {{ mapZoom }}×
                <template v-if="activeItem"> · {{ activeItem.title }}</template>
              </span>
            </span>
            <svg
              class="campaign-map__live-chevron"
              :class="{ 'campaign-map__live-chevron--open': livePanelOpen }"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 8l5 5 5-5"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <p class="campaign-map__live-title campaign-map__live-title--desktop">Position en temps réel</p>

          <div class="campaign-map__live-content">
            <dl class="campaign-map__live-grid">
              <div>
                <dt>Centre carte</dt>
                <dd>{{ formatCoord(mapCenter.lat, 'lat') }} · {{ formatCoord(mapCenter.lng, 'lng') }}</dd>
              </div>
              <div>
                <dt>Zoom</dt>
                <dd>{{ mapZoom }}×</dd>
              </div>
              <div v-if="pointerPosition">
                <dt>{{ pointerPosition.label || 'Pointeur' }}</dt>
                <dd>{{ formatCoord(pointerPosition.lat, 'lat') }} · {{ formatCoord(pointerPosition.lng, 'lng') }}</dd>
              </div>
              <div v-if="activeItem">
                <dt>{{ currentConfig.activeLabel }}</dt>
                <dd>{{ activeItem.title }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <aside class="campaign-map__aside">
        <div class="campaign-map__stats">
          <div class="campaign-map__stat">
            <span class="campaign-map__stat-value">{{ stats.primary }}</span>
            <span class="campaign-map__stat-label">{{ stats.labels[0] }}</span>
          </div>
          <div class="campaign-map__stat">
            <span class="campaign-map__stat-value">{{ stats.secondary }}</span>
            <span class="campaign-map__stat-label">{{ stats.labels[1] }}</span>
          </div>
          <div class="campaign-map__stat">
            <span class="campaign-map__stat-value">{{ stats.tertiary }}</span>
            <span class="campaign-map__stat-label">{{ stats.labels[2] }}</span>
          </div>
        </div>

        <div class="campaign-map__legend">
          <p class="campaign-map__legend-title">Légende — {{ currentConfig.label }}</p>
          <ul class="campaign-map__legend-list">
            <li v-for="entry in legendItems" :key="entry.label">
              <span class="campaign-map__legend-dot" :class="`campaign-map__legend-dot--${entry.class}`" />
              {{ entry.label }}
            </li>
          </ul>
          <p class="campaign-map__legend-note">
            Choisissez une action ci-dessus pour explorer campagnes, témoignages ou hommages sur la carte.
          </p>
        </div>

        <div class="campaign-map__hemicycle" aria-hidden="true">
          <span
            v-for="dot in scopeDots"
            :key="dot.id"
            class="campaign-map__hemicycle-dot"
            :class="getHemicycleClass(dot)"
          />
        </div>

        <ul class="campaign-map__list">
          <li v-for="item in filteredItems" :key="item.id">
            <button
              type="button"
              class="campaign-map__list-item"
              :class="{ 'campaign-map__list-item--active': activeId === itemKey(item) }"
              @click="focusItem(item, true)"
            >
              <span class="campaign-map__list-marker" :class="getListMarkerClass(item)" />
              <span class="campaign-map__list-body">
                <span class="campaign-map__list-title">{{ item.title }}</span>
                <span class="campaign-map__list-meta">
                  {{ item.subtitle }} · {{ item.placeLabel }}
                </span>
              </span>
            </button>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>
