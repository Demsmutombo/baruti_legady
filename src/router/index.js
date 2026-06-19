import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/biographie', name: 'Biography', component: () => import('../views/Biography.vue') },
  { path: '/ministere', name: 'Ministry', component: () => import('../views/Ministry.vue') },
  { path: '/campagnes', name: 'Campaigns', component: () => import('../views/CampaignsPage.vue') },
  { path: '/temoignages', name: 'Testimonies', component: () => import('../views/TestimoniesPage.vue') },
  { path: '/enseignements', name: 'Teachings', component: () => import('../views/Teachings.vue') },
  { path: '/hommages', name: 'Hommages', component: () => import('../views/Hommages.vue') },
  { path: '/galerie', name: 'Gallery', component: () => import('../views/Gallery.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/Contact.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
