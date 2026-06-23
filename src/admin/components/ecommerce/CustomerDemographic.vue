<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6"
  >
    <div class="flex justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Portée du ministère</h3>
        <p class="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
          Provinces congolaises et missions internationales
        </p>
      </div>
    </div>
    <div
      class="px-4 py-6 my-6 overflow-hidden border border-gray-200 rounded-2xl bg-gray-50 dark:border-gray-800 dark:bg-gray-900 sm:px-6"
    >
      <div
        ref="mapOneRef"
        class="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
      ></div>
    </div>
    <div class="space-y-5">
      <div
        v-for="region in ministryRegions"
        :key="region.name"
        class="flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 overflow-hidden rounded-full ring-2 ring-brand-500/20">
            <img :src="region.image" :alt="region.name" class="h-full w-full object-cover" />
          </div>
          <div>
            <p class="font-semibold text-gray-800 text-theme-sm dark:text-white/90">{{ region.name }}</p>
            <span class="block text-gray-500 text-theme-xs dark:text-gray-400">
              {{ region.count }} zone{{ region.count > 1 ? 's' : '' }}
            </span>
          </div>
        </div>

        <div class="flex w-full max-w-[140px] items-center gap-3">
          <div class="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
            <div
              class="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500"
              :style="{ width: `${region.percent}%` }"
            ></div>
          </div>
          <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">{{ region.percent }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import jsVectorMap from 'jsvectormap'
import 'jsvectormap/dist/maps/world'
import { ADMIN_CHART_PRIMARY } from '@admin/constants/theme'
import { useAdminSiteData } from '@admin/data/site.js'

const { mapMarkers, ministryRegions } = useAdminSiteData()

const mapOneRef = ref(null)

onMounted(() => {
  if (!mapOneRef.value) return

  new jsVectorMap({
    selector: mapOneRef.value,
    map: 'world',
    zoomButtons: false,
    regionStyle: {
      initial: { fontFamily: 'Outfit', fill: '#D9D9D9' },
      hover: { fillOpacity: 1, fill: ADMIN_CHART_PRIMARY },
    },
    markers: mapMarkers.map((marker) => ({
      name: marker.name,
      coords: marker.coords,
    })),
    markerStyle: {
      initial: {
        strokeWidth: 1,
        fill: ADMIN_CHART_PRIMARY,
        fillOpacity: 1,
        r: 5,
      },
      hover: { fill: ADMIN_CHART_PRIMARY, fillOpacity: 1 },
    },
  })
})
</script>
