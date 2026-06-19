<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import {
  testimonies,
  testimonyFilters,
  testimonyCategoryLabels,
} from '../data/content.js'

const modules = [Navigation, Pagination, Autoplay]
const activeFilter = ref('all')

const filtered = computed(() =>
  activeFilter.value === 'all'
    ? testimonies
    : testimonies.filter((t) => t.category === activeFilter.value)
)
</script>

<template>
  <div>
    <p class="text-center text-muted mb-8 max-w-2xl mx-auto">
      Ce que disent ceux qui ont connu Leonard Baruti — 12 témoignages de miracles,
      de foi et de puissance divine au travers de son ministère.
    </p>

    <div class="flex flex-wrap justify-center gap-2 mb-10">
      <button
        v-for="filter in testimonyFilters"
        :key="filter.id"
        :class="[
          'px-4 py-2 text-sm rounded-full transition-colors',
          activeFilter === filter.id
            ? 'bg-gold text-deep-blue font-medium'
            : 'bg-white text-muted hover:bg-gold/20 border border-gray-100',
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
      <SwiperSlide v-for="item in filtered" :key="item.title">
        <div class="card-hover bg-white border border-gray-100 rounded-lg p-6 h-full shadow-sm flex flex-col">
          <span class="inline-block text-xs font-medium text-gold uppercase tracking-wider mb-3">
            {{ testimonyCategoryLabels[item.category] || item.category }}
          </span>
          <h3 class="font-display text-lg font-bold text-deep-blue mb-3">{{ item.title }}</h3>
          <p class="text-deep-blue/80 leading-relaxed flex-grow">
            {{ item.text }}
          </p>
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
