<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import { useCmsStore } from '../composables/useCmsStore.js'
import { heroImage, pastorPreaching } from '../data/images.js'

const cms = useCmsStore()
const ministrySections = cms.ministrySections
const pastor = cms.pastor
const biographyEssentials = cms.biographyEssentials

onMounted(() => AOS.refresh())
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-deep-blue text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p class="font-heading text-gold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">
          Ministère & Église
        </p>
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
          Baruti Tabernacle
        </h1>
        <p class="text-white/80 text-lg" data-aos="fade-up" data-aos-delay="200">
          {{ biographyEssentials.fullTitle }}
        </p>
        <p class="text-gold-light mt-4 font-heading" data-aos="fade-up" data-aos-delay="250">
          {{ pastor.nickname }} · Ministère depuis {{ pastor.ministryStart }}
        </p>
      </div>
    </section>

    <section class="relative py-0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 -mt-8 mb-16" data-aos="fade-up">
          <div class="rounded-lg overflow-hidden shadow-md aspect-[16/10]">
            <img :src="heroImage" alt="Baruti Tabernacle" class="w-full h-full object-cover" />
          </div>
          <div class="rounded-lg overflow-hidden shadow-md aspect-[16/10]">
            <img :src="pastorPreaching" alt="Pasteur Baruti en prédication" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-12">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <article
          v-for="(section, index) in ministrySections"
          :key="section.title"
          class="flex flex-col md:flex-row gap-8 items-start"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="md:w-1/3">
            <span class="font-heading text-gold text-5xl font-bold opacity-30">
              0{{ index + 1 }}
            </span>
            <h2 class="font-display text-2xl font-bold text-deep-blue -mt-4">
              {{ section.title }}
            </h2>
          </div>
          <p class="md:w-2/3 text-muted leading-relaxed text-lg">
            {{ section.content }}
          </p>
        </article>
      </div>
    </section>
  </div>
</template>
