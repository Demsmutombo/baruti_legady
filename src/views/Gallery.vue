<script setup>
import { ref, computed, onMounted } from 'vue'
import AOS from 'aos'
import { galleryCategories, galleryItems } from '../data/content.js'

const activeCategory = ref('all')

const filtered = computed(() =>
  activeCategory.value === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory.value)
)

onMounted(() => AOS.refresh())
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-deep-blue text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p class="font-heading text-gold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">
          Galerie
        </p>
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
          Moments du ministère
        </h1>
        <p class="text-white/80 text-lg" data-aos="fade-up" data-aos-delay="200">
          Campagnes, église, moments historiques et ministère international.
        </p>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          <button
            v-for="cat in galleryCategories"
            :key="cat.id"
            :class="[
              'px-4 py-2 text-sm rounded-full transition-colors',
              activeCategory === cat.id
                ? 'bg-gold text-deep-blue font-medium'
                : 'bg-soft-gray text-muted hover:bg-gold/20',
            ]"
            @click="activeCategory = cat.id"
          >
            {{ cat.label }}
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <figure
            v-for="(item, index) in filtered"
            :key="item.id"
            class="card-hover group relative overflow-hidden rounded-lg aspect-square"
            data-aos="zoom-in"
            :data-aos-delay="index * 60"
          >
            <img
              :src="item.image"
              :alt="item.caption"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <figcaption
              class="absolute inset-0 bg-deep-blue/0 group-hover:bg-deep-blue/70 flex items-end transition-colors duration-300"
            >
              <p class="text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-sm font-medium">
                {{ item.caption }}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  </div>
</template>
