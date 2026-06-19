<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import { hommages, pastor, galleryItems } from '../data/content.js'

onMounted(() => AOS.refresh())
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-deep-blue text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p class="font-heading text-gold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">
          Espace mémoire
        </p>
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
          Hommages
        </h1>
        <p class="text-white/80 text-lg italic font-display" data-aos="fade-up" data-aos-delay="200">
          « {{ pastor.quote }} »
        </p>
      </div>
    </section>

    <section class="py-20 bg-soft-gray">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <article
          v-for="(item, index) in hommages"
          :key="item.author"
          class="card-hover bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <p class="text-deep-blue/80 italic leading-relaxed text-lg mb-6">
            « {{ item.message }} »
          </p>
          <div class="border-t border-gray-100 pt-4">
            <p class="font-semibold text-deep-blue">{{ item.author }}</p>
            <p class="text-sm text-muted">{{ item.role }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="py-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 class="font-display text-2xl font-bold text-deep-blue mb-8" data-aos="fade-up">
          Souvenirs en images
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="(item, i) in galleryItems.slice(0, 4)"
            :key="item.id"
            class="aspect-square rounded-lg overflow-hidden"
            data-aos="zoom-in"
            :data-aos-delay="i * 80"
          >
            <img
              :src="item.image"
              :alt="item.caption"
              class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
