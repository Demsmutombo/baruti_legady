<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { campaigns } from '../data/content.js'

const props = defineProps({
  limit: { type: Number, default: 0 },
  showLink: { type: Boolean, default: false },
})

const displayed = computed(() =>
  props.limit > 0 ? campaigns.slice(0, props.limit) : campaigns
)
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="(campaign, index) in displayed"
        :key="`${campaign.year}-${campaign.region}`"
        class="card-hover group relative overflow-hidden rounded-lg bg-deep-blue shadow-md"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <div class="aspect-[4/3] overflow-hidden">
          <img
            :src="campaign.image"
            :alt="campaign.region"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/60 to-transparent" />
        <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p class="text-gold text-xs uppercase tracking-wider mb-1">
            {{ campaign.year }} · {{ campaign.country }}
          </p>
          <h3 class="font-display text-xl font-bold mb-2">{{ campaign.region }}</h3>
          <p class="text-white/80 text-sm leading-relaxed">{{ campaign.description }}</p>
        </div>
      </article>
    </div>

    <div v-if="showLink" class="text-center mt-10">
      <RouterLink
        to="/campagnes"
        class="inline-block px-8 py-3 border border-gold text-gold rounded-sm hover:bg-gold hover:text-deep-blue transition-colors font-medium"
      >
        Voir toutes les campagnes
      </RouterLink>
    </div>
  </div>
</template>
