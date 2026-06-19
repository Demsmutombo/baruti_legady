<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import BiographyTimeline from '../components/BiographyTimeline.vue'
import { pastor } from '../data/content.js'

onMounted(() => AOS.refresh())
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-deep-blue text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p class="font-heading text-gold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">
          Biographie
        </p>
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
          {{ pastor.fullName }}
        </h1>
        <p class="text-white/80 text-lg leading-relaxed" data-aos="fade-up" data-aos-delay="200">
          Une vie consacrée à Dieu, un parcours marqué par la foi, l'appel et la fidélité
          au ministère pastoral et à l'évangélisation mondiale.
        </p>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="section-divider mx-auto mb-6" />
          <h2 class="font-display text-2xl md:text-3xl font-bold text-deep-blue">
            Chronologie de vie
          </h2>
        </div>
        <BiographyTimeline />
      </div>
    </section>
  </div>
</template>
