<script setup>
import { ref } from 'vue'
import portraitSrc from '../assets/anime.png'
import { useSplashAnimation, SPLASH_TITLE, SPLASH_SLOGAN } from '../composables/useSplashAnimation.js'

const emit = defineEmits(['complete'])

const splash = ref(null)
const stage = ref(null)
const ambientLight = ref(null)
const halo = ref(null)
const particlesContainer = ref(null)
const portrait = ref(null)
const logoStage = ref(null)
const glassesSweep = ref(null)
const title = ref(null)
const slogan = ref(null)

useSplashAnimation(
  {
    splash,
    stage,
    ambientLight,
    halo,
    particlesContainer,
    portrait,
    logoStage,
    glassesSweep,
    title,
    slogan,
  },
  () => emit('complete')
)
</script>

<template>
  <div
    ref="splash"
    class="splash-screen fixed inset-0 z-[9999] overflow-hidden bg-[#081224]"
    aria-hidden="true"
    role="presentation"
  >
    <!-- Particules dorées -->
    <div ref="particlesContainer" class="absolute inset-0 z-10 pointer-events-none" />

    <!-- Lumière ambiante -->
    <div ref="ambientLight" class="absolute z-20 pointer-events-none ambient-light" />

    <!-- Scène centrale : logo Baruti uniquement -->
    <div
      ref="stage"
      class="absolute inset-0 z-30 flex flex-col items-center justify-center px-6"
    >
      <div ref="logoStage" class="relative logo-stage">
        <!-- Halo lumineux -->
        <div ref="halo" class="absolute logo-halo pointer-events-none" />

        <!-- Portrait / logo -->
        <div class="relative overflow-hidden logo-frame">
          <img
            ref="portrait"
            :src="portraitSrc"
            alt="Pasteur Léonard Baruti Kasongo"
            class="logo-portrait block w-full h-full object-contain select-none"
            draggable="false"
          />

          <!-- Light sweep — zone lunettes -->
          <div class="glasses-zone absolute inset-x-0 pointer-events-none overflow-hidden z-20">
            <div ref="glassesSweep" class="glasses-sweep absolute top-0 bottom-0 left-0" />
          </div>
        </div>
      </div>

      <!-- Textes — masqués pendant les 3 premières secondes -->
      <div class="text-block mt-5 sm:mt-6 flex flex-col items-center text-center max-w-lg">
        <h1
          ref="title"
          class="font-heading text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.28em] uppercase text-white title-text"
        >
          {{ SPLASH_TITLE }}
        </h1>

        <p
          ref="slogan"
          class="mt-4 sm:mt-5 font-display text-xs sm:text-sm md:text-base italic text-white/65 tracking-wide"
        >
          « {{ SPLASH_SLOGAN }} »
        </p>
      </div>
    </div>

    <!-- Vignette cinématique -->
    <div class="absolute inset-0 z-40 pointer-events-none cinematic-vignette" />
  </div>
</template>

<style scoped>
.splash-screen {
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
}

.ambient-light {
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: min(70vw, 320px);
  height: min(70vw, 320px);
  background: radial-gradient(
    circle,
    rgba(201, 162, 39, 0.08) 0%,
    rgba(201, 162, 39, 0.03) 40%,
    transparent 70%
  );
  filter: blur(40px);
  will-change: transform, opacity;
}

.logo-stage {
  width: min(48vw, 200px);
  aspect-ratio: 3 / 4;
  transform-origin: center center;
  will-change: transform, opacity;
}

.logo-halo {
  inset: -20%;
  background: radial-gradient(
    circle,
    rgba(232, 212, 139, 0.22) 0%,
    rgba(201, 162, 39, 0.1) 45%,
    transparent 72%
  );
  filter: blur(35px);
  will-change: transform, opacity;
}

.logo-frame {
  width: 100%;
  height: 100%;
}

.logo-portrait {
  opacity: 0;
  transform-origin: center center;
  will-change: transform, opacity, filter;
}

/* Zone lunettes — ~22 % du haut du portrait */
.glasses-zone {
  top: 19%;
  height: 13%;
}

.glasses-sweep {
  width: 50%;
  background: linear-gradient(
    100deg,
    transparent 15%,
    rgba(255, 255, 255, 0.05) 35%,
    rgba(232, 212, 139, 0.45) 50%,
    rgba(255, 255, 255, 0.08) 65%,
    transparent 85%
  );
  mix-blend-mode: screen;
  filter: blur(0.5px);
  will-change: transform, opacity;
}

.title-text {
  text-shadow:
    0 0 16px rgba(201, 162, 39, 0.25),
    0 2px 6px rgba(0, 0, 0, 0.5);
  will-change: transform, opacity;
}

.text-block p {
  will-change: transform, opacity;
}

.cinematic-vignette {
  background: radial-gradient(
    ellipse at center,
    transparent 35%,
    rgba(8, 18, 36, 0.75) 100%
  );
}

:deep(.splash-particle) {
  transform: translate(-50%, -50%);
}
</style>
