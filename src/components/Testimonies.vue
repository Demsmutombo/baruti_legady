<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { testimonies } from '../data/content.js'

const modules = [Navigation, Pagination, Autoplay]
const activeFilter = ref('all')

const filters = [
  { id: 'all', label: 'Tous' },
  { id: 'guérison', label: 'Guérison' },
  { id: 'conversion', label: 'Conversion' },
  { id: 'foi', label: 'Foi' },
  { id: 'ministère', label: 'Ministère' },
]

const filtered = computed(() =>
  activeFilter.value === 'all'
    ? testimonies
    : testimonies.filter((t) => t.category === activeFilter.value)
)

const categoryLabels = {
  guérison: 'Guérison',
  conversion: 'Conversion',
  foi: 'Foi',
  ministère: 'Ministère',
}
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-center gap-2 mb-10">
      <button
        v-for="filter in filters"
        :key="filter.id"
        :class="[
          'px-4 py-2 text-sm rounded-full transition-colors',
          activeFilter === filter.id
            ? 'bg-gold text-deep-blue font-medium'
            : 'bg-soft-gray text-muted hover:bg-gold/20',
        ]"
        @click="activeFilter = filter.id"
      >
        {{ filter.label }}
      </button>
    </div>

    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="24"
      :pagination="{ clickable: true }"
      :navigation="true"
      :autoplay="{ delay: 6000, disableOnInteraction: false }"
      :breakpoints="{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }"
      class="testimonies-swiper pb-12"
    >
      <SwiperSlide v-for="item in filtered" :key="item.name + item.location">
        <div class="card-hover bg-white border border-gray-100 rounded-lg p-6 h-full shadow-sm">
          <span class="inline-block text-xs font-medium text-gold uppercase tracking-wider mb-4">
            {{ categoryLabels[item.category] || item.category }}
          </span>
          <p class="text-deep-blue/80 italic leading-relaxed mb-6">
            « {{ item.text }} »
          </p>
          <div class="border-t border-gray-100 pt-4">
            <p class="font-semibold text-deep-blue">{{ item.name }}</p>
            <p class="text-sm text-muted">{{ item.location }}</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #c9a227;
}
:deep(.swiper-pagination-bullet-active) {
  background: #c9a227;
}
</style>
