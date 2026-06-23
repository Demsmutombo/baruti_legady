const adminChildren = [
  {
    path: '',
    name: 'AdminDashboard',
    component: () => import('../admin/views/Dashboard.vue'),
    meta: { title: 'Tableau de bord' },
  },
  {
    path: 'accueil',
    name: 'AdminHome',
    component: () => import('../admin/views/manage/HomeManage.vue'),
    meta: { title: 'Accueil' },
  },
  {
    path: 'biographie',
    name: 'AdminBiography',
    component: () => import('../admin/views/manage/BiographyManage.vue'),
    meta: { title: 'Biographie' },
  },
  {
    path: 'ministere',
    name: 'AdminMinistry',
    component: () => import('../admin/views/manage/ResourceCrud.vue'),
    meta: { title: 'Ministère', resource: 'ministrySections' },
  },
  {
    path: 'campagnes',
    name: 'AdminCampaigns',
    component: () => import('../admin/views/manage/ResourceCrud.vue'),
    meta: { title: 'Campagnes', resource: 'campaigns' },
  },
  {
    path: 'temoignages',
    name: 'AdminTestimonies',
    component: () => import('../admin/views/manage/ResourceCrud.vue'),
    meta: { title: 'Témoignages', resource: 'testimonies' },
  },
  {
    path: 'enseignements',
    name: 'AdminTeachings',
    component: () => import('../admin/views/manage/ResourceCrud.vue'),
    meta: { title: 'Enseignements', resource: 'teachings' },
  },
  {
    path: 'hommages',
    name: 'AdminHommages',
    component: () => import('../admin/views/manage/ResourceCrud.vue'),
    meta: { title: 'Hommages', resource: 'hommages' },
  },
  {
    path: 'galerie',
    name: 'AdminGallery',
    component: () => import('../admin/views/manage/ResourceCrud.vue'),
    meta: { title: 'Galerie', resource: 'galleryItems' },
  },
  {
    path: 'contact',
    name: 'AdminContact',
    component: () => import('../admin/views/manage/ContactManage.vue'),
    meta: { title: 'Contact' },
  },
  {
    path: 'error-404',
    name: 'Admin404',
    component: () => import('../admin/views/Errors/FourZeroFour.vue'),
    meta: { title: 'Page introuvable', public: true },
  },
  {
    path: 'signin',
    name: 'AdminSignin',
    component: () => import('../admin/views/Auth/Signin.vue'),
    meta: { title: 'Connexion', public: true },
  },
  {
    path: 'reset-password',
    name: 'AdminResetPassword',
    component: () => import('../admin/views/Auth/ResetPassword.vue'),
    meta: { title: 'Mot de passe oublié', public: true },
  },
]

const adminRoutes = {
  path: '/admin',
  component: () => import('../admin/AdminShell.vue'),
  children: adminChildren,
}

export function applyAdminGuards(router) {
  router.beforeEach((to, from, next) => {
    if (!to.path.startsWith('/admin')) {
      next()
      return
    }

    const pageTitle = to.meta.title ? String(to.meta.title) : 'Administration'
    document.title = `${pageTitle} | Baruti Legacy Foundation`

    next()
  })
}

export default adminRoutes
