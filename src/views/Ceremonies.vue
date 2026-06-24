<script setup>
import { computed, onMounted, ref } from 'vue'
import AOS from 'aos'
import { useCmsStore } from '../composables/useCmsStore.js'
import { ceremonyTypeLabels, ceremonyMemorialIntro, ceremonyMemorialParagraphs } from '../data/ceremonies.js'
import { ceremonyPhotos, ceremonyMosImage } from '../data/ceremonyImages.js'
import GalleryLightbox from '../components/GalleryLightbox.vue'

const cms = useCmsStore()
const ceremonies = cms.ceremonies
const pastor = cms.pastor

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const mainCeremony = computed(() => ceremonies.value[0] ?? null)

const galleryPhotos = computed(() => {
  const fromCeremony = mainCeremony.value?.gallery?.length ? mainCeremony.value.gallery : []
  return fromCeremony.length ? fromCeremony : ceremonyPhotos
})

const lightboxItems = computed(() =>
  galleryPhotos.value.map((photo, index) => ({
    id: index,
    image: photo,
    caption: `${ceremonyMemorialIntro.eyebrow} — ${ceremonyMemorialIntro.dateLine}`,
  })),
)

const headerImage = computed(() => ceremonyMosImage || galleryPhotos.value[0] || null)

const memorialParagraphs = computed(() => {
  if (mainCeremony.value?.paragraphs?.length) return mainCeremony.value.paragraphs
  return ceremonyMemorialParagraphs
})

function formatMemorialParagraph(text) {
  return String(text).replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="text-deep-blue">$1</strong>',
  )
}

function openLightbox(index) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

onMounted(() => AOS.refresh())
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-deep-blue text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p class="font-heading text-gold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">
          {{ ceremonyMemorialIntro.eyebrow }}
        </p>
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up" data-aos-delay="100">
          Cérémonies
        </h1>
        <p class="font-heading text-gold-light tracking-widest uppercase text-sm mb-6" data-aos="fade-up" data-aos-delay="150">
          {{ ceremonyMemorialIntro.dateLine }}
        </p>
        <p class="text-white/80 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          Hommages et moments de mémoire en l'honneur du Révérend {{ pastor.shortName }}.
        </p>
      </div>
    </section>

    <section v-if="mainCeremony" class="py-16 bg-gold/10 border-b border-gold/20">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
        <span class="ceremony-timeline__badge">
          {{ ceremonyTypeLabels[mainCeremony.type] || mainCeremony.type }}
        </span>
        <h2 class="font-display text-2xl md:text-3xl font-bold text-deep-blue mt-4 mb-6">
          {{ mainCeremony.title }}
        </h2>

        <ul class="ceremony-timeline__meta ceremony-timeline__meta--center mb-8">
          <li v-if="mainCeremony.date">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M8 2v3M16 2v3M4 9h16M6 5h12a2 2 0 012 2v13a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            {{ mainCeremony.date }}
          </li>
          <li v-if="mainCeremony.location || mainCeremony.city">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5" />
            </svg>
            <span>
              {{ mainCeremony.location }}<template v-if="mainCeremony.city"> — {{ mainCeremony.city }}</template>
            </span>
          </li>
        </ul>

        <button
          v-if="headerImage"
          type="button"
          class="ceremony-hero-image group"
          :aria-label="`Ouvrir le diaporama — ${ceremonyMemorialIntro.eyebrow}`"
          @click="openLightbox(0)"
        >
          <img
            :src="headerImage"
            :alt="`${ceremonyMemorialIntro.eyebrow} — ${ceremonyMemorialIntro.dateLine}`"
            class="ceremony-hero-image__img"
            loading="eager"
          />
          <span class="ceremony-hero-image__overlay">
            <span class="ceremony-hero-image__hint">Voir le diaporama</span>
          </span>
        </button>

        <div class="space-y-4 text-left text-muted leading-relaxed">
          <p
            v-for="(paragraph, index) in memorialParagraphs"
            :key="index"
            v-html="formatMemorialParagraph(paragraph)"
          />
        </div>
      </div>
    </section>

    <section class="py-20 bg-soft-gray">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10" data-aos="fade-up">
          <div class="section-divider mx-auto mb-6" />
          <h2 class="font-display text-2xl md:text-3xl font-bold text-deep-blue">
            Souvenirs de la cérémonie
          </h2>
          <p class="text-muted mt-3 text-sm md:text-base">
            {{ ceremonyMemorialIntro.eyebrow }} — {{ ceremonyMemorialIntro.dateLine }}
          </p>
        </div>

        <div class="ceremony-gallery">
          <figure
            v-for="(photo, index) in galleryPhotos"
            :key="photo"
            class="ceremony-gallery__item card-hover"
            data-aos="zoom-in"
            :data-aos-delay="(index % 6) * 60"
            role="button"
            tabindex="0"
            :aria-label="`Ouvrir le diaporama — photo ${index + 1}`"
            @click="openLightbox(index)"
            @keydown.enter="openLightbox(index)"
            @keydown.space.prevent="openLightbox(index)"
          >
            <img
              :src="photo"
              :alt="`BK Memorial — photo ${index + 1}`"
              class="ceremony-gallery__image"
              loading="lazy"
            />
            <figcaption class="ceremony-gallery__caption">
              <span class="ceremony-gallery__caption-eyebrow">{{ ceremonyMemorialIntro.eyebrow }}</span>
              <span class="ceremony-gallery__caption-text">{{ ceremonyMemorialIntro.dateLine }}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section v-if="ceremonies.length > 1" class="py-16 bg-white border-t border-gray-100">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="ceremony-timeline">
          <article
            v-for="(item, index) in ceremonies.slice(1)"
            :key="item.id ?? item.title"
            class="ceremony-timeline__item"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="ceremony-timeline__marker" aria-hidden="true">
              <span class="ceremony-timeline__dot" />
            </div>

            <div class="ceremony-timeline__card card-hover">
              <div v-if="item.image" class="ceremony-timeline__image-wrap">
                <img :src="item.image" :alt="item.title" class="ceremony-timeline__image" loading="lazy" />
              </div>

              <div class="ceremony-timeline__body">
                <span class="ceremony-timeline__badge">
                  {{ ceremonyTypeLabels[item.type] || item.type }}
                </span>
                <h2 class="font-display text-xl md:text-2xl font-bold text-deep-blue mb-3">{{ item.title }}</h2>
                <p class="text-muted leading-relaxed">{{ item.description }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <GalleryLightbox
      :items="lightboxItems"
      :start-index="lightboxIndex"
      :open="lightboxOpen"
      @close="closeLightbox"
    />
  </div>
</template>
