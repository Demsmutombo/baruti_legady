<script setup>
import { ref, onMounted } from 'vue'
import AOS from 'aos'
import { contact } from '../data/content.js'

const form = ref({ name: '', email: '', message: '' })
const submitted = ref(false)

function onSubmit() {
  submitted.value = true
}

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
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
        <div data-aos="fade-right">
          <h2 class="font-display text-2xl font-bold text-deep-blue mb-6">Informations</h2>
          <div class="space-y-6 text-muted">
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
              <div class="flex gap-4">
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

        <div data-aos="fade-left">
          <h2 class="font-display text-2xl font-bold text-deep-blue mb-6">Envoyer un message</h2>
          <form v-if="!submitted" class="space-y-4" @submit.prevent="onSubmit">
            <div>
              <label class="block text-sm font-medium text-deep-blue mb-1">Nom</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-deep-blue mb-1">Email</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-deep-blue mb-1">Message</label>
              <textarea
                v-model="form.message"
                rows="5"
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              class="w-full py-3 bg-gold text-deep-blue font-semibold rounded-sm hover:bg-gold-light transition-colors"
            >
              Envoyer
            </button>
          </form>
          <div v-else class="p-8 bg-soft-gray rounded-lg text-center">
            <p class="font-display text-xl text-deep-blue mb-2">Merci pour votre message</p>
            <p class="text-muted text-sm">Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
