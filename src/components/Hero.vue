<script setup>
import { RouterLink } from 'vue-router'
import { pastor } from '../data/content.js'
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
      style="background-image: url('https://images.unsplash.com/photo-1507692049790-de582cc9ef34?w=1920&q=80')"
    />
    <div class="absolute inset-0 hero-overlay" />

    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white pt-24 pb-16">
      <p
        class="font-heading text-gold tracking-[0.3em] uppercase text-sm mb-6"
        data-aos="fade-down"
      >
        Baruti Legacy Foundation
      </p>

      <h1
        class="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {{ pastor.fullName }}
      </h1>

      <p
        class="text-gold-light text-lg sm:text-xl font-heading tracking-wide mb-2"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {{ pastor.title }}
      </p>

      <p
        class="text-white/70 font-display text-base sm:text-lg mb-8"
        data-aos="fade-up"
        data-aos-delay="250"
      >
        {{ pastor.birthYear }} — {{ pastor.homeYear }} · {{ pastor.nickname }}
      </p>

      <blockquote
        class="max-w-2xl mx-auto text-white/90 text-lg italic font-display mb-12 leading-relaxed"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        « {{ pastor.quote }} »
      </blockquote>

      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-4"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <RouterLink
          to="/biographie"
          class="w-full sm:w-auto px-8 py-3.5 bg-gold text-deep-blue font-semibold rounded-sm hover:bg-gold-light transition-colors"
        >
          Voir la biographie
        </RouterLink>
        <RouterLink
          to="/ministere"
          class="w-full sm:w-auto px-8 py-3.5 border border-white/40 text-white rounded-sm hover:bg-white/10 transition-colors"
        >
          Explorer le ministère
        </RouterLink>
        <RouterLink
          to="/temoignages"
          class="w-full sm:w-auto px-8 py-3.5 border border-gold/60 text-gold rounded-sm hover:bg-gold/10 transition-colors"
        >
          Témoignages
        </RouterLink>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>
