<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import AOS from 'aos'
import BiographyTimeline from '../components/BiographyTimeline.vue'
import BiographyChapters from '../components/BiographyChapters.vue'
import { useCmsStore } from '../composables/useCmsStore.js'
import { pastorPortrait, biographyBannerImage } from '../data/images.js'

const cms = useCmsStore()
const pastor = cms.pastor
const biographyEssentials = cms.biographyEssentials
const nameMeanings = cms.nameMeanings

const bannerImgRef = ref(null)
const bannerCoverStyle = ref({})

// Zone « HORAIRE DES CULTES » mesurée sur bk (3).jpeg (1280×720)
const HORAIRE_COVER = {
  left: 0.362,
  top: 0.864,
  width: 0.256,
  height: 0.118,
  color: '#6d6869',
}

function updateBannerCover() {
  bannerCoverStyle.value = {
    left: `${HORAIRE_COVER.left * 100}%`,
    top: `${HORAIRE_COVER.top * 100}%`,
    width: `${HORAIRE_COVER.width * 100}%`,
    height: `${HORAIRE_COVER.height * 100}%`,
    backgroundColor: HORAIRE_COVER.color,
  }
}

onMounted(() => {
  AOS.refresh()
  updateBannerCover()
  window.addEventListener('resize', updateBannerCover)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateBannerCover)
})
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
          <div class="bio-banner">
            <img
              ref="bannerImgRef"
              :src="biographyBannerImage"
              alt="Baruti Tabernacle — Pasteur Baruti Kasongo"
              class="bio-banner-img"
              @load="updateBannerCover"
            />
            <span
              class="bio-banner-cover"
              aria-hidden="true"
              :style="bannerCoverStyle"
            />
          </div>
          <div class="bio-essential-body grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr]">
            <div class="bio-identity">
              <figure class="bio-portrait-wrap">
                <img
                  :src="pastorPortrait"
                  alt="Rév. Baruti Kasongo"
                  class="bio-portrait"
                />
              </figure>
              <div class="bio-identity-text">
                <p class="font-display text-4xl font-bold leading-none text-deep-blue sm:text-5xl lg:text-[3.25rem]">
                  Leonard
                </p>
                <p class="font-display mt-1.5 text-2xl text-gold sm:text-[1.85rem]">
                  Baruti Kasongo
                </p>
                <p class="font-heading mt-5 text-[11px] uppercase tracking-[0.22em] text-muted">
                  Pasteur
                </p>
                <p class="font-display mt-2.5 text-xl text-muted sm:text-2xl">
                  {{ pastor.birthYear }} — {{ pastor.homeYear }}
                </p>
                <p class="mt-2 text-sm text-muted">
                  {{ biographyEssentials.nationality }}
                </p>
              </div>
            </div>

            <div class="bio-details">
              <div class="bio-detail-item">
                <p class="bio-detail-label">Naissance</p>
                <p class="bio-detail-value text-deep-blue">
                  {{ biographyEssentials.birth.date }} · {{ biographyEssentials.birth.place }}
                </p>
                <p class="bio-detail-sub text-muted">{{ biographyEssentials.birth.detail }}</p>
              </div>
              <div class="bio-detail-item">
                <p class="bio-detail-label">Décès</p>
                <p class="bio-detail-value text-deep-blue">
                  {{ biographyEssentials.death.date }} · {{ biographyEssentials.death.place }}
                </p>
                <p class="bio-detail-sub text-muted">{{ biographyEssentials.death.detail }}</p>
              </div>
              <div class="bio-detail-item">
                <p class="bio-detail-label">Profession</p>
                <p class="bio-detail-value text-deep-blue leading-relaxed">{{ biographyEssentials.profession }}</p>
              </div>
              <div class="bio-detail-item">
                <p class="bio-detail-label">Église</p>
                <p class="bio-detail-value text-deep-blue leading-relaxed">{{ biographyEssentials.church }}</p>
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

<style scoped>
.bio-banner {
  position: relative;
  width: 100%;
  aspect-ratio: 21 / 5;
  overflow: hidden;
  background-color: #0f2847;
}

.bio-banner-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.bio-banner-cover {
  position: absolute;
  z-index: 2;
  border-radius: 1px;
}

.bio-essential-body {
  border-top: 1px solid #f3f4f6;
}

.bio-identity {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2.25rem 1.5rem;
  text-align: center;
  border-bottom: 1px solid #f3f4f6;
}

.bio-portrait-wrap {
  margin: 0;
  flex-shrink: 0;
}

.bio-portrait {
  display: block;
  width: 9.5rem;
  height: 9.5rem;
  border-radius: 9999px;
  object-fit: cover;
  object-position: top center;
  border: 3px solid #c9a227;
  box-shadow: 0 8px 24px rgba(15, 40, 71, 0.12);
}

.bio-identity-text {
  min-width: 0;
}

.bio-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  padding: 2.25rem 1.5rem;
}

@media (min-width: 640px) {
  .bio-portrait {
    width: 10.5rem;
    height: 10.5rem;
  }
}

@media (min-width: 768px) {
  .bio-identity {
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    padding: 2.75rem 2rem 2.75rem 2.5rem;
    text-align: left;
    border-bottom: none;
    border-right: 1px solid #e5e7eb;
  }

  .bio-portrait {
    width: 11.5rem;
    height: 11.5rem;
    border-width: 3px;
  }

  .bio-details {
    gap: 1.75rem;
    padding: 2.75rem 2.25rem 2.75rem 2rem;
  }
}

@media (min-width: 1024px) {
  .bio-identity {
    gap: 2.25rem;
    padding: 3rem 2.5rem 3rem 3rem;
  }

  .bio-portrait {
    width: 12.5rem;
    height: 12.5rem;
  }

  .bio-details {
    padding: 3rem 2.5rem 3rem 2.25rem;
  }
}

.bio-detail-label {
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #c9a227;
  margin-bottom: 0.35rem;
}

.bio-detail-value {
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.5;
}

.bio-detail-sub {
  margin-top: 0.2rem;
  font-size: 0.8125rem;
}

:global(.dark) .bio-essential-body,
:global(.dark) .bio-identity {
  border-color: rgb(255 255 255 / 0.1);
}

@media (min-width: 768px) {
  :global(.dark) .bio-identity {
    border-right-color: rgb(255 255 255 / 0.1);
  }
}
</style>
