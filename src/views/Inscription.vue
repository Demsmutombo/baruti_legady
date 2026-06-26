<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import VisitorRegistrationForm from '../components/forms/VisitorRegistrationForm.vue'

onMounted(() => AOS.refresh())
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-deep-blue text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p class="font-heading text-gold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">
          Visiteurs
        </p>
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
          Inscription
        </h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          Vous nous rendez visite pour la première fois ? Laissez-nous vos coordonnées afin de mieux vous
          accueillir et rester en lien avec vous.
        </p>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        <VisitorRegistrationForm />
      </div>
    </section>
  </div>
</template>
