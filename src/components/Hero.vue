<script setup>
import { RouterLink } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { pastor } from '../data/content.js'
import { heroCarouselImages } from '../data/images.js'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const modules = [Autoplay, EffectFade, Pagination]
</script>

<template>
  <section class="hero-section relative isolate flex min-h-screen h-[100svh] items-center justify-center overflow-hidden">
    <!-- Carousel plein écran en arrière-plan -->
    <div class="hero-bg absolute inset-0 z-0">
      <Swiper
        :modules="modules"
        effect="fade"
        :fade-effect="{ crossFade: true }"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :loop="true"
        :speed="1400"
        class="hero-carousel h-full w-full"
      >
        <SwiperSlide v-for="(image, index) in heroCarouselImages" :key="index">
          <img
            :src="image"
            alt=""
            class="hero-bg-image"
            loading="eager"
            :fetchpriority="index === 0 ? 'high' : 'auto'"
          />
        </SwiperSlide>
      </Swiper>
    </div>

      <div class="relative z-10 mx-auto max-w-5xl px-4 pt-24 pb-20 text-center text-white sm:px-6">
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

    <div class="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/50">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  width: 100%;
  background-color: #0f2847;
}

.hero-bg {
  width: 100%;
  height: 100%;
}

.hero-carousel :deep(.swiper),
.hero-carousel :deep(.swiper-wrapper),
.hero-carousel :deep(.swiper-slide) {
  width: 100%;
  height: 100%;
}

.hero-carousel :deep(.swiper-slide) {
  position: relative;
  overflow: hidden;
}

.hero-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  opacity: 0.15;
}

.hero-carousel :deep(.swiper-pagination) {
  bottom: 1.5rem;
  z-index: 2;
  pointer-events: auto;
}

.hero-carousel :deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.45);
  opacity: 1;
}

.hero-carousel :deep(.swiper-pagination-bullet-active) {
  background: #c9a227;
}
</style>
