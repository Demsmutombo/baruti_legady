<template>
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
    <div v-for="item in images" :key="item.src" class="overflow-hidden rounded-xl">
      <img
        :src="item.src"
        :alt="item.alt"
        class="w-full border border-gray-200 rounded-xl dark:border-gray-800 object-cover h-48"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCmsStore } from '../../../composables/useCmsStore.js'

const galleryItems = computed(() => useCmsStore().galleryItems.value)
const images = computed(() =>
  galleryItems.value.slice(3, 6).map((item) => ({
    src: item.image,
    alt: item.caption,
  }))
)
</script>
