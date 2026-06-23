<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import { useCmsStore } from '../composables/useCmsStore.js'
import ContactForm from '../components/forms/ContactForm.vue'

const cms = useCmsStore()
const contact = cms.contact

onMounted(() => AOS.refresh())
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-deep-blue text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p class="font-heading text-gold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">
          Contact
        </p>
        <h1 class="font-display text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="100">
          Baruti Tabernacle
        </h1>
        <p class="text-white/80 text-lg" data-aos="fade-up" data-aos-delay="200">
          Contactez l'église et la Baruti Legacy Foundation.
        </p>
      </div>
    </section>

    <section class="py-20">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12" data-aos="fade-up">
          <h2 class="font-display text-2xl font-bold text-deep-blue mb-6">Informations</h2>
          <div class="space-y-6 text-muted text-left max-w-lg mx-auto">
            <div>
              <p class="font-semibold text-deep-blue mb-1">{{ contact.church }}</p>
              <p>{{ contact.address }}</p>
            </div>
            <div>
              <p class="font-semibold text-deep-blue mb-1">Email</p>
              <a :href="`mailto:${contact.email}`" class="text-gold hover:text-gold-light transition-colors">
                {{ contact.email }}
              </a>
            </div>
            <div>
              <p class="font-semibold text-deep-blue mb-2">Réseaux sociaux</p>
              <div class="flex flex-wrap gap-3">
                <a
                  v-for="social in contact.social"
                  :key="social.name"
                  :href="social.url"
                  class="px-4 py-2 border border-gray-200 rounded-sm text-sm hover:border-gold hover:text-gold transition-colors"
                >
                  {{ social.name }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center" data-aos="fade-up" data-aos-delay="100">
          <p class="text-muted mb-6">
            Une question, une demande de prière ou un commentaire pour la fondation ?
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>
