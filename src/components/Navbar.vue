<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logoSrc from '../assets/anime.png'
import { useTheme } from '../composables/useTheme.js'

const route = useRoute()
const { theme, isDark, toggleTheme } = useTheme()
const isOpen = ref(false)
const isScrolled = ref(false)
const openMobileGroup = ref(null)

const navItems = [
  { type: 'link', to: '/', label: 'Accueil' },
  {
    type: 'group',
    label: 'Découvrir',
    items: [
      { to: '/biographie', label: 'Biographie', desc: 'Vie et héritage spirituel' },
      { to: '/ministere', label: 'Ministère', desc: 'Mission et vision' },
    ],
  },
  {
    type: 'group',
    label: 'Activités',
    items: [
      { to: '/campagnes', label: 'Campagnes', desc: 'Missions d\'évangélisation' },
      { to: '/temoignages', label: 'Témoignages', desc: 'Vies transformées' },
      { to: '/enseignements', label: 'Enseignements', desc: 'Paroles et messages' },
    ],
  },
  {
    type: 'group',
    label: 'Mémoire',
    items: [
      { to: '/hommages', label: 'Hommages', desc: 'Mots de reconnaissance' },
      { to: '/ceremonies', label: 'Cérémonies', desc: 'Moments commémoratifs' },
      { to: '/galerie', label: 'Galerie', desc: 'Photos et souvenirs' },
    ],
  },
  { type: 'link', to: '/contact', label: 'Contact' },
]

const useSolidNav = computed(() => isScrolled.value || route.path !== '/')

const headerClass = computed(() => {
  if (isDark.value) {
    return useSolidNav.value
      ? 'bg-deep-blue/98 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
      : 'bg-transparent py-5'
  }

  return 'bg-white/98 backdrop-blur-md shadow-lg border-b border-gray-200 py-3'
})

function isLinkActive(path) {
  if (path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(`${path}/`)
}

function isGroupActive(items) {
  return items.some((item) => isLinkActive(item.to))
}

function navLinkClass(isActive) {
  if (!isDark.value) {
    return isActive
      ? 'bg-gold text-deep-blue font-semibold shadow-sm'
      : 'text-deep-blue hover:bg-deep-blue/5 hover:text-gold'
  }

  if (useSolidNav.value) {
    return isActive
      ? 'bg-gold text-deep-blue font-semibold shadow-sm'
      : 'text-white hover:bg-white/10 hover:text-gold-light'
  }

  return isActive
    ? 'bg-white/15 text-gold font-semibold'
    : 'text-white hover:bg-white/10 hover:text-gold-light'
}

function mobileLinkClass(isActive) {
  if (!isDark.value) {
    return isActive
      ? 'bg-gold text-deep-blue font-semibold'
      : 'text-deep-blue hover:bg-deep-blue/5 hover:text-gold'
  }

  if (isActive) {
    return 'text-deep-blue bg-gold font-semibold'
  }

  return 'text-white hover:bg-white/10 hover:text-gold-light'
}

function onScroll() {
  isScrolled.value = window.scrollY > 40
}

function closeMenu() {
  isOpen.value = false
  openMobileGroup.value = null
}

function toggleMobileGroup(label) {
  openMobileGroup.value = openMobileGroup.value === label ? null : label
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      headerClass,
    ]"
  >
    <nav class="max-w-7xl mx-auto flex min-w-0 items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8 xl:grid xl:grid-cols-[auto_1fr_auto] xl:items-center xl:gap-4">
      <RouterLink to="/admin/signin" class="group flex shrink-0 items-center gap-2 sm:gap-3" @click="closeMenu">
        <span
          :class="[
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12',
            isDark ? '' : 'bg-deep-blue p-[2px]',
          ]"
        >
          <img
            :src="logoSrc"
            alt="Baruti Legacy Foundation"
            class="h-full w-full rounded-full object-cover object-top"
          />
        </span>
        <span
          :class="[
            'font-display text-sm font-semibold leading-tight transition-colors sm:text-lg',
            isDark
              ? 'text-white group-hover:text-gold-light'
              : 'text-deep-blue group-hover:text-gold',
          ]"
        >
          Baruti Legacy
        </span>
      </RouterLink>

      <ul class="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex xl:min-w-0">
        <li v-for="item in navItems" :key="item.label">
          <RouterLink
            v-if="item.type === 'link'"
            :to="item.to"
            :class="[
              'rounded-md px-2.5 py-2 text-sm font-medium transition-colors lg:px-3',
              navLinkClass(isLinkActive(item.to)),
            ]"
          >
            {{ item.label }}
          </RouterLink>

          <div v-else class="nav-dropdown group/drop relative">
            <button
              type="button"
              :class="[
                'nav-dropdown__trigger inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-sm font-medium transition-colors lg:px-3',
                navLinkClass(isGroupActive(item.items)),
              ]"
              :aria-expanded="false"
              :aria-haspopup="true"
            >
              {{ item.label }}
              <svg
                class="nav-dropdown__chevron h-3.5 w-3.5 opacity-70 transition-transform group-hover/drop:rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <div class="nav-dropdown__menu" role="menu">
              <span class="nav-dropdown__caret" aria-hidden="true" />
              <div class="nav-dropdown__accent" aria-hidden="true" />

              <div class="nav-dropdown__header">
                <p class="nav-dropdown__eyebrow">{{ item.label }}</p>
              </div>

              <ul class="nav-dropdown__list">
                <li v-for="link in item.items" :key="link.to" role="none">
                  <RouterLink
                    :to="link.to"
                    role="menuitem"
                    :class="[
                      'nav-dropdown__link',
                      isLinkActive(link.to) ? 'nav-dropdown__link--active' : '',
                    ]"
                  >
                    <span class="nav-dropdown__link-body">
                      <span class="nav-dropdown__link-label">{{ link.label }}</span>
                      <span v-if="link.desc" class="nav-dropdown__link-desc">{{ link.desc }}</span>
                    </span>
                    <svg
                      class="nav-dropdown__link-arrow"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>

      <div class="ml-auto flex shrink-0 items-center gap-2 xl:ml-0 xl:justify-end">
        <button
          :class="[
            'p-2 xl:hidden',
            isDark ? 'text-white' : 'text-deep-blue',
          ]"
          aria-label="Menu"
          @click="isOpen = !isOpen"
        >
          <svg v-if="!isOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button
          type="button"
          :class="[
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 shadow-md transition-colors',
            isDark
              ? 'border-gold bg-gold text-deep-blue hover:bg-gold-light'
              : 'border-deep-blue bg-deep-blue text-white hover:bg-deep-blue-light',
          ]"
          :aria-label="theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'"
          :title="theme === 'dark' ? 'Thème clair' : 'Thème sombre'"
          @click="toggleTheme"
        >
          <svg
            v-if="theme === 'dark'"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            v-else
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>
    </nav>

    <div
      v-if="isOpen"
      :class="[
        'xl:hidden backdrop-blur-md border-t max-h-[calc(100vh-4.5rem)] overflow-y-auto',
        isDark
          ? 'bg-deep-blue/98 border-white/10'
          : 'bg-white/98 border-gray-200',
      ]"
    >
      <ul class="space-y-1 px-4 py-4">
        <template v-for="item in navItems" :key="item.label">
          <li v-if="item.type === 'link'">
            <RouterLink
              :to="item.to"
              :class="[
                'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                mobileLinkClass(isLinkActive(item.to)),
              ]"
              @click="closeMenu"
            >
              {{ item.label }}
            </RouterLink>
          </li>

          <li v-else class="rounded-lg border border-transparent">
            <button
              type="button"
              :class="[
                'flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors',
                mobileLinkClass(isGroupActive(item.items)),
              ]"
              @click="toggleMobileGroup(item.label)"
            >
              {{ item.label }}
              <svg
                :class="[
                  'h-4 w-4 shrink-0 transition-transform',
                  openMobileGroup === item.label ? 'rotate-180' : '',
                ]"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <ul v-show="openMobileGroup === item.label" class="nav-mobile-sub space-y-0.5 pb-2 pl-2">
              <li v-for="link in item.items" :key="link.to">
                <RouterLink
                  :to="link.to"
                  :class="[
                    'block rounded-lg py-2.5 pl-6 pr-4 transition-colors',
                    mobileLinkClass(isLinkActive(link.to)),
                  ]"
                  @click="closeMenu"
                >
                  <span class="block text-sm font-medium">{{ link.label }}</span>
                  <span
                    v-if="link.desc"
                    class="mt-0.5 block text-xs opacity-70"
                  >
                    {{ link.desc }}
                  </span>
                </RouterLink>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.nav-dropdown__menu {
  position: absolute;
  top: calc(100% + 0.65rem);
  left: 0;
  z-index: 60;
  min-width: 15.5rem;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid rgb(201 162 39 / 0.22);
  background: linear-gradient(180deg, #ffffff 0%, #faf9f6 100%);
  box-shadow:
    0 4px 6px rgb(15 40 71 / 0.04),
    0 18px 40px rgb(15 40 71 / 0.14);
  backdrop-filter: blur(12px);
  opacity: 0;
  visibility: hidden;
  transform: translateY(0.5rem) scale(0.98);
  transform-origin: top left;
  transition:
    opacity 0.22s ease,
    transform 0.22s ease,
    visibility 0.22s ease;
}

:global(.dark) .nav-dropdown__menu {
  border-color: rgb(201 162 39 / 0.28);
  background: linear-gradient(180deg, #132d4d 0%, #0f2847 100%);
  box-shadow:
    0 4px 6px rgb(0 0 0 / 0.15),
    0 20px 44px rgb(0 0 0 / 0.4);
}

.nav-dropdown__caret {
  position: absolute;
  top: -0.42rem;
  left: 1.35rem;
  width: 0.85rem;
  height: 0.85rem;
  rotate: 45deg;
  border-top: 1px solid rgb(201 162 39 / 0.22);
  border-left: 1px solid rgb(201 162 39 / 0.22);
  background: #ffffff;
}

:global(.dark) .nav-dropdown__caret {
  border-color: rgb(201 162 39 / 0.28);
  background: #132d4d;
}

.nav-dropdown__accent {
  height: 3px;
  background: linear-gradient(90deg, #c9a227 0%, #e8d48b 50%, #c9a227 100%);
}

.nav-dropdown__header {
  padding: 0.85rem 1rem 0.55rem;
  border-bottom: 1px solid rgb(15 40 71 / 0.06);
}

:global(.dark) .nav-dropdown__header {
  border-bottom-color: rgb(255 255 255 / 0.08);
}

.nav-dropdown__eyebrow {
  font-family: var(--font-heading);
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #c9a227;
}

.nav-dropdown__list {
  padding: 0.45rem;
}

.nav-dropdown:hover .nav-dropdown__menu,
.nav-dropdown:focus-within .nav-dropdown__menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.nav-dropdown__link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border-radius: 0.65rem;
  padding: 0.7rem 0.85rem;
  overflow: hidden;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.nav-dropdown__link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55rem;
  bottom: 0.55rem;
  width: 3px;
  border-radius: 9999px;
  background: #c9a227;
  opacity: 0;
  transform: scaleY(0.4);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.nav-dropdown__link:hover::before,
.nav-dropdown__link--active::before {
  opacity: 1;
  transform: scaleY(1);
}

.nav-dropdown__link-body {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.15rem;
  padding-left: 0.15rem;
}

.nav-dropdown__link-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #0f2847;
  line-height: 1.25;
}

:global(.dark) .nav-dropdown__link-label {
  color: rgb(255 255 255 / 0.95);
}

.nav-dropdown__link-desc {
  font-size: 0.72rem;
  line-height: 1.35;
  color: #6b7280;
}

:global(.dark) .nav-dropdown__link-desc {
  color: rgb(255 255 255 / 0.55);
}

.nav-dropdown__link-arrow {
  flex-shrink: 0;
  color: #c9a227;
  opacity: 0;
  transform: translateX(-0.25rem);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.nav-dropdown__link:hover {
  background: rgb(201 162 39 / 0.08);
}

.nav-dropdown__link:hover .nav-dropdown__link-label {
  color: #96761a;
}

.nav-dropdown__link:hover .nav-dropdown__link-arrow {
  opacity: 1;
  transform: translateX(0);
}

:global(.dark) .nav-dropdown__link:hover {
  background: rgb(201 162 39 / 0.12);
}

:global(.dark) .nav-dropdown__link:hover .nav-dropdown__link-label {
  color: #e8d48b;
}

.nav-dropdown__link--active {
  background: rgb(201 162 39 / 0.12);
}

.nav-dropdown__link--active .nav-dropdown__link-label {
  color: #96761a;
}

.nav-dropdown__link--active .nav-dropdown__link-desc {
  color: #8a7340;
}

.nav-dropdown__link--active .nav-dropdown__link-arrow {
  opacity: 1;
  transform: translateX(0);
}

:global(.dark) .nav-dropdown__link--active {
  background: rgb(201 162 39 / 0.16);
}

:global(.dark) .nav-dropdown__link--active .nav-dropdown__link-label {
  color: #e8d48b;
}

:global(.dark) .nav-dropdown__link--active .nav-dropdown__link-desc {
  color: rgb(232 212 139 / 0.7);
}
</style>
