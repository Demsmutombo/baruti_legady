<script setup>
import { useCmsStore } from '../composables/useCmsStore.js'

const cms = useCmsStore()
const biographyEvents = cms.biographyEvents
</script>

<template>
  <div class="relative timeline-line py-8">
    <div
      v-for="(event, index) in biographyEvents"
      :key="`${event.year}-${event.title}`"
      class="relative mb-12 md:mb-16"
      data-aos="fade-up"
      :data-aos-delay="index * 80"
    >
      <div
        :class="[
          'flex flex-col md:flex-row items-start md:items-center gap-6',
          index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
        ]"
      >
        <div class="hidden md:block md:w-1/2" />

        <div
          class="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-gold border-4 border-white shadow-lg flex items-center justify-center z-10"
        >
          <span class="w-2 h-2 rounded-full bg-deep-blue" />
        </div>

        <div
          :class="[
            'md:w-1/2 pl-16 md:pl-0',
            index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left',
          ]"
        >
          <span class="inline-block font-heading text-gold text-sm tracking-widest mb-2">
            {{ event.year }}
          </span>
          <h3 class="font-display text-xl font-bold text-deep-blue mb-3">
            {{ event.title }}
          </h3>
          <p class="text-muted leading-relaxed">
            {{ event.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
