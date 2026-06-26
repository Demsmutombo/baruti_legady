<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import AOS from 'aos'
import { useCmsStore } from '../composables/useCmsStore.js'
import MinistryMap from '../components/MinistryMap.vue'
import MapContentDetailModal from '../components/MapContentDetailModal.vue'

const cms = useCmsStore()

const detailType = ref(null)
const detailItem = ref(null)
const detailOpen = ref(false)

function openDetail({ type, item }) {
  detailType.value = type
  detailItem.value = item
  detailOpen.value = true
}

function closeDetail() {
  detailOpen.value = false
}

watch(detailOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onMounted(() => AOS.refresh())
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-deep-blue text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p class="font-heading text-gold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">
          Cartographie
        </p>
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
          Carte du ministère
        </h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          Explorez les campagnes d'évangélisation, les témoignages de miracles et les hommages laissés
          en mémoire du Pasteur Baruti Kasongo. Cliquez sur un point pour voir le détail.
        </p>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MinistryMap
          :campaigns="cms.campaigns.value"
          :testimonies="cms.testimonies.value"
          :hommages="cms.hommages.value"
          @select="openDetail"
        />
      </div>
    </section>

    <MapContentDetailModal
      :type="detailType"
      :item="detailItem"
      :open="detailOpen"
      @close="closeDetail"
    />
  </div>
</template>
