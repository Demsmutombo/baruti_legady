<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import Campaigns from '../components/Campaigns.vue'

onMounted(() => AOS.refresh())
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-deep-blue text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p class="font-heading text-gold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">
          Évangélisation
        </p>
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
          Campagnes mondiales
        </h1>
        <p class="text-white/80 text-lg" data-aos="fade-up" data-aos-delay="200">
          L'impact du ministère du Pasteur Baruti Kasongo à travers les nations.
        </p>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Campaigns />
      </div>
    </section>
  </div>
</template>
