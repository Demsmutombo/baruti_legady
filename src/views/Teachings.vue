<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import { useCmsStore } from '../composables/useCmsStore.js'

const cms = useCmsStore()
const teachings = cms.teachings

onMounted(() => AOS.refresh())
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-deep-blue text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p class="font-heading text-gold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">
          Doctrine
        </p>
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
          Enseignements
        </h1>
        <p class="text-white/80 text-lg" data-aos="fade-up" data-aos-delay="200">
          Prédications et messages spirituels transmis par le Révérend Pasteur Baruti Kasongo.
        </p>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8">
        <article
          v-for="(item, index) in teachings"
          :key="item.title"
          class="card-hover p-8 rounded-lg border border-gray-100 bg-white shadow-sm"
          data-aos="fade-up"
          :data-aos-delay="index * 80"
        >
          <div class="flex flex-wrap items-center gap-3 mb-4">
            <h2 class="font-display text-2xl font-bold text-deep-blue">{{ item.title }}</h2>
            <span
              v-if="item.year"
              class="text-xs font-heading uppercase tracking-widest bg-gold/15 text-gold px-3 py-1 rounded-full"
            >
              {{ item.year }}
            </span>
          </div>
          <p v-if="item.date" class="text-sm text-muted mb-4">{{ item.date }}</p>
          <p class="text-muted leading-relaxed mb-6">{{ item.excerpt }}</p>
          <blockquote class="border-l-4 border-gold pl-4 text-deep-blue/80 italic font-display">
            {{ item.quote }}
          </blockquote>
        </article>
      </div>
    </section>
  </div>
</template>
