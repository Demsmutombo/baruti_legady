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
  <section id="site-hero" class="hero-section relative isolate flex min-h-screen h-[100svh] items-center justify-center overflow-hidden">
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

      <div class="relative z-10 mx-auto max-w-4xl px-4 pt-24 pb-24 text-center text-white sm:px-6">
      <p
        class="mb-5 font-heading text-xs uppercase tracking-[0.35em] text-gold sm:text-sm"
        data-aos="fade-down"
      >
        Baruti Legacy Foundation
      </p>

      <h1
        class="font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {{ pastor.shortName }}
      </h1>

      <p
        class="mx-auto mt-5 max-w-xl text-base text-white/75 sm:text-lg"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        {{ pastor.birthYear }} — {{ pastor.homeYear }}
        <span class="mx-2 text-gold/60">·</span>
        Fondateur de Baruti Tabernacle
      </p>

      <div
        class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <RouterLink
          to="/biographie"
          class="w-full rounded-sm bg-gold px-8 py-3.5 font-semibold text-deep-blue transition-colors hover:bg-gold-light sm:w-auto"
        >
          Découvrir son parcours
        </RouterLink>
        <RouterLink
          to="/ministere"
          class="w-full rounded-sm border border-white/40 px-8 py-3.5 text-white transition-colors hover:bg-white/10 sm:w-auto"
        >
          Son ministère
        </RouterLink>
      </div>
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
  opacity: 0.28;
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
