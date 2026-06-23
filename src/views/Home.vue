<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import Hero from '../components/Hero.vue'
import Campaigns from '../components/Campaigns.vue'
import Testimonies from '../components/Testimonies.vue'
import TestimonyForm from '../components/forms/TestimonyForm.vue'
import { useCmsStore } from '../composables/useCmsStore.js'
import { RouterLink } from 'vue-router'

const cms = useCmsStore()
const highlights = cms.highlights
const pastor = cms.pastor

onMounted(() => AOS.refresh())
</script>

<template>
  <div>
    <Hero />

    <section class="py-20 bg-soft-gray">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div class="section-divider mx-auto mb-6" data-aos="fade-up" />
        <h2 class="font-display text-3xl md:text-4xl font-bold text-deep-blue mb-6" data-aos="fade-up">
          Un ministère au service de l'Évangile
        </h2>
        <p class="text-muted leading-relaxed text-lg" data-aos="fade-up" data-aos-delay="100">
          {{ pastor.obituaryIntro }}
          Soldat du Christ et {{ pastor.nickname }}, le Révérend {{ pastor.shortName }}
          a consacré plus de 50 ans au message du Prophète William Marrion Branham,
          formant des pasteurs et conduisant des milliers d'âmes à Jésus-Christ
          depuis Baruti Tabernacle et à travers le monde.
        </p>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <div class="section-divider mx-auto mb-6" data-aos="fade-up" />
          <h2 class="font-display text-3xl md:text-4xl font-bold text-deep-blue" data-aos="fade-up">
            Les piliers du ministère
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(item, index) in highlights"
            :key="item.title"
            class="card-hover text-center p-8 rounded-lg border border-gray-100 bg-white shadow-sm"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <span class="text-4xl mb-4 block">{{ item.icon }}</span>
            <h3 class="font-heading text-xl text-deep-blue mb-3">{{ item.title }}</h3>
            <p class="text-muted leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-deep-blue text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <div class="section-divider mx-auto mb-6" data-aos="fade-up" />
          <h2 class="font-display text-3xl md:text-4xl font-bold" data-aos="fade-up">
            Campagnes d'évangélisation
          </h2>
          <p class="text-white/70 mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            De la RDC au Brésil, en passant par l'Australie — un impact mondial.
          </p>
        </div>
        <Campaigns :limit="3" show-link />
      </div>
    </section>

    <section class="py-20 bg-soft-gray">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <div class="section-divider mx-auto mb-6" data-aos="fade-up" />
          <h2 class="font-display text-3xl md:text-4xl font-bold text-deep-blue" data-aos="fade-up">
            Témoignages de foi
          </h2>
        </div>
        <Testimonies />
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <RouterLink
            to="/temoignages"
            class="inline-block px-8 py-3 bg-gold text-deep-blue font-semibold rounded-sm hover:bg-gold-light transition-colors"
          >
            Tous les témoignages
          </RouterLink>
          <TestimonyForm
            button-label="Partager le vôtre"
            button-variant="outline"
            auto-open-hash=""
          />
        </div>
      </div>
    </section>
  </div>
</template>
