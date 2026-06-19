<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import { ministrySections, pastor, biographyEssentials } from '../data/content.js'

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

    <section class="py-20">
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
