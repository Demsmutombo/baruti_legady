<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import BiographyTimeline from '../components/BiographyTimeline.vue'
import BiographyChapters from '../components/BiographyChapters.vue'
import {
  pastor,
  biographyEssentials,
  nameMeanings,
} from '../data/content.js'

onMounted(() => AOS.refresh())
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-deep-blue text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p class="font-heading text-gold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">
          Biographie
        </p>
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up" data-aos-delay="100">
          {{ pastor.fullName }}
        </h1>
        <p class="text-gold-light font-heading tracking-wide mb-6" data-aos="fade-up" data-aos-delay="150">
          {{ biographyEssentials.nickname }} · {{ pastor.birthYear }} — {{ pastor.homeYear }}
        </p>
        <p class="text-white/80 text-lg leading-relaxed" data-aos="fade-up" data-aos-delay="200">
          Il en est ainsi de Baruti Kasongo dont la personnalité ne cesse de s'affirmer dans toutes
          les circonstances de la vie depuis son plus jeune âge — un serviteur consacré, un pasteur
          du message de l'heure pendant plus de cinq décennies.
        </p>
      </div>
    </section>

    <!-- Essentiel -->
    <section class="py-20 bg-soft-gray">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="section-divider mx-auto mb-6" />
          <h2 class="font-display text-2xl md:text-3xl font-bold text-deep-blue">Essentiel</h2>
        </div>

        <div
          class="card-hover bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden"
          data-aos="fade-up"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div class="p-8 text-center md:text-left">
              <p class="font-display text-5xl md:text-6xl font-bold text-deep-blue leading-none">
                Leonard
              </p>
              <p class="font-display text-3xl text-gold mt-1">Baruti Kasongo</p>
              <p class="font-heading text-muted uppercase tracking-widest text-sm mt-3">Pasteur</p>
              <p class="font-display text-2xl text-deep-blue/60 mt-4">
                {{ pastor.birthYear }} — {{ pastor.homeYear }}
              </p>
              <p class="text-muted mt-2">{{ biographyEssentials.nationality }}</p>
            </div>
            <div class="p-8 space-y-5">
              <div>
                <p class="text-xs uppercase tracking-widest text-gold font-heading mb-1">Naissance</p>
                <p class="text-deep-blue font-medium">
                  {{ biographyEssentials.birth.date }} · {{ biographyEssentials.birth.place }}
                </p>
                <p class="text-sm text-muted">{{ biographyEssentials.birth.detail }}</p>
              </div>
              <div>
                <p class="text-xs uppercase tracking-widest text-gold font-heading mb-1">Décès</p>
                <p class="text-deep-blue font-medium">
                  {{ biographyEssentials.death.date }} · {{ biographyEssentials.death.place }}
                </p>
                <p class="text-sm text-muted">{{ biographyEssentials.death.detail }}</p>
              </div>
              <div>
                <p class="text-xs uppercase tracking-widest text-gold font-heading mb-1">Profession</p>
                <p class="text-deep-blue">{{ biographyEssentials.profession }}</p>
              </div>
              <div>
                <p class="text-xs uppercase tracking-widest text-gold font-heading mb-1">Église</p>
                <p class="text-deep-blue">{{ biographyEssentials.church }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Signification du nom -->
        <div class="mt-10" data-aos="fade-up">
          <h3 class="font-display text-xl font-bold text-deep-blue mb-6 text-center">
            Signification du nom
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="item in nameMeanings"
              :key="item.name"
              class="bg-white rounded-lg border border-gray-100 p-5 shadow-sm"
            >
              <p class="font-heading text-gold font-semibold tracking-wider">{{ item.name }}</p>
              <p class="text-muted text-sm mt-1 leading-relaxed">{{ item.meaning }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nécrologie -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <div class="section-divider mx-auto mb-6" />
          <h2 class="font-display text-2xl md:text-3xl font-bold text-deep-blue">
            Disparition du Pasteur Baruti
          </h2>
          <p class="text-muted mt-2">1er juin 2024 · Montréal, Canada</p>
        </div>
        <div class="prose prose-lg max-w-none text-muted leading-relaxed space-y-4" data-aos="fade-up">
          <p>{{ pastor.obituaryIntro }}</p>
          <p>
            Ayant connu une vie ordinaire comme plusieurs Congolais, avant de faire la rencontre
            avec le message sacré du Prophète américain William Marrion Branham, le Pasteur Baruti
            Kasongo avait une force physique extraordinaire et une foi inébranlable. Il fut durant
            plus de 50 ans le pasteur du message du temps de la fin en République Démocratique du
            Congo, formant de nombreux serviteurs et conduisant des milliers d'âmes à Jésus-Christ.
          </p>
          <p class="text-sm italic border-l-4 border-gold pl-4 text-deep-blue/70">
            Source : Eventsrdc.com — 2 juin 2024
          </p>
        </div>
      </div>
    </section>

    <!-- Chapitres de vie -->
    <section class="py-20 bg-soft-gray">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <div class="section-divider mx-auto mb-6" />
          <h2 class="font-display text-2xl md:text-3xl font-bold text-deep-blue">
            Chapitres de vie
          </h2>
          <p class="text-muted mt-3 max-w-2xl mx-auto">
            De ses origines maniema à son appel pastoral — le récit d'une vie entièrement consacrée
            au service du Seigneur.
          </p>
        </div>
        <BiographyChapters />
      </div>
    </section>

    <!-- Chronologie -->
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
