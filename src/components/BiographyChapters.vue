<script setup>
import { useCmsStore } from '../composables/useCmsStore.js'

const cms = useCmsStore()
const biographyChapters = cms.biographyChapters
</script>

<template>
  <div class="space-y-12">
    <article
      v-for="chapter in biographyChapters"
      :key="chapter.id"
      class="card-hover rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden"
      data-aos="fade-up"
    >
      <div class="bg-deep-blue text-white px-6 py-5 flex items-start gap-4">
        <span
          class="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-deep-blue font-display font-bold flex items-center justify-center"
        >
          {{ chapter.id }}
        </span>
        <div>
          <h3 class="font-display text-xl md:text-2xl font-bold">{{ chapter.title }}</h3>
          <p class="text-white/75 text-sm mt-1 leading-relaxed">{{ chapter.summary }}</p>
        </div>
      </div>
      <div class="p-6 md:p-8 space-y-6">
        <div
          v-for="section in chapter.sections"
          :key="section.title"
          class="border-l-2 border-gold/40 pl-5"
        >
          <h4 class="font-heading text-deep-blue font-semibold mb-2">{{ section.title }}</h4>
          <p class="text-muted leading-relaxed">{{ section.text }}</p>
        </div>
      </div>
    </article>
  </div>
</template>
