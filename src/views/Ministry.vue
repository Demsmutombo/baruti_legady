<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'

onMounted(() => AOS.refresh())

const sections = [
  {
    title: 'Fondation Baruti Tabernacle',
    content:
      "Fondée à Kinshasa, l'église Baruti Tabernacle est née de la vision du Pasteur Baruti Kasongo : créer une communauté où la Parole de Dieu est enseignée avec puissance, où la prière est une priorité et où chaque âme peut rencontrer le Seigneur.",
  },
  {
    title: 'Vision du message',
    content:
      "Le message central du ministère repose sur la foi vivante, la guérison divine, l'onction du Saint-Esprit et l'évangélisation sans frontières. Une doctrine ancrée dans les Écritures, transmise avec amour et autorité spirituelle.",
  },
  {
    title: "Organisation de l'église",
    content:
      "Baruti Tabernacle est structurée autour d'un conseil pastoral, de départements ministériels (jeunesse, femmes, hommes, louange) et de cellules de prière qui perpétuent l'œuvre d'évangélisation au quotidien.",
  },
  {
    title: 'Expansion internationale',
    content:
      "Au fil des décennies, le ministère s'est étendu au-delà de la RDC : missions au Brésil, en Australie, en Europe et en Afrique de l'Ouest. Des églises filiales et des partenariats pastoraux portent l'héritage Baruti dans le monde entier.",
  },
]
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
          Une œuvre spirituelle fondée sur la Parole, la prière et l'évangélisation mondiale.
        </p>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <article
          v-for="(section, index) in sections"
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
