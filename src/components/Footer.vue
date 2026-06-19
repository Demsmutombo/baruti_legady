<script setup>
import { RouterLink } from 'vue-router'
import { contact } from '../data/content.js'
</script>

<template>
  <footer class="bg-deep-blue text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 class="font-heading text-gold tracking-widest uppercase text-sm mb-4">
            Baruti Legacy Foundation
          </h3>
          <p class="font-display text-xl font-semibold mb-4">
            Mémorial du ministère du Pasteur Baruti Kasongo
          </p>
          <p class="text-white/70 text-sm leading-relaxed">
            Un hommage numérique vivant à l'héritage spirituel, à la foi et à l'œuvre
            d'évangélisation mondiale du Révérend Léonard Baruti Kasongo Bin N'djadi.
          </p>
        </div>

        <div>
          <h4 class="font-heading text-gold text-sm tracking-wider uppercase mb-4">Navigation</h4>
          <ul class="space-y-2 text-sm text-white/70">
            <li><RouterLink to="/biographie" class="hover:text-gold transition-colors">Biographie</RouterLink></li>
            <li><RouterLink to="/ministere" class="hover:text-gold transition-colors">Ministère</RouterLink></li>
            <li><RouterLink to="/campagnes" class="hover:text-gold transition-colors">Campagnes</RouterLink></li>
            <li><RouterLink to="/temoignages" class="hover:text-gold transition-colors">Témoignages</RouterLink></li>
            <li><RouterLink to="/galerie" class="hover:text-gold transition-colors">Galerie</RouterLink></li>
            <li><RouterLink to="/contact" class="hover:text-gold transition-colors">Contact</RouterLink></li>
          </ul>
        </div>

        <div>
          <h4 class="font-heading text-gold text-sm tracking-wider uppercase mb-4">Contact</h4>
          <p class="text-white/70 text-sm mb-2">{{ contact.church }}</p>
          <p class="text-white/70 text-sm mb-4">{{ contact.address }}</p>
          <a :href="`mailto:${contact.email}`" class="text-gold text-sm hover:text-gold-light transition-colors">
            {{ contact.email }}
          </a>
          <div class="flex gap-4 mt-6">
            <a
              v-for="social in contact.social"
              :key="social.name"
              :href="social.url"
              class="text-white/60 hover:text-gold text-sm transition-colors"
            >
              {{ social.name }}
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-white/10 mt-12 pt-8 text-center text-white/50 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} Baruti Legacy Foundation. Tous droits réservés.</p>
        <p class="mt-1 text-xs">À la gloire de Dieu — En mémoire d'un serviteur fidèle</p>
      </div>
    </div>
  </footer>
</template>
