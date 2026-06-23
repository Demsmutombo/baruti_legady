<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import Testimonies from '../components/Testimonies.vue'
import TestimonyForm from '../components/forms/TestimonyForm.vue'

onMounted(() => AOS.refresh())
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-deep-blue text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p class="font-heading text-gold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">
          Témoignages
        </p>
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
          Miracles & expériences de foi
        </h1>
        <p class="text-white/80 text-lg mb-8" data-aos="fade-up" data-aos-delay="200">
          Des vies transformées par la puissance de Dieu à travers le ministère du Pasteur Baruti.
        </p>
        <div data-aos="fade-up" data-aos-delay="300">
          <TestimonyForm auto-open-hash="#partager" />
        </div>
      </div>
    </section>

    <section class="py-20 bg-soft-gray">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Testimonies />
      </div>
    </section>
  </div>
</template>
