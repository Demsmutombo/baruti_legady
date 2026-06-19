import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'

const TOTAL_PARTICLES_DESKTOP = 40
const TOTAL_PARTICLES_MOBILE = 20
export const SPLASH_DURATION = 3

function isMobile() {
  return window.matchMedia('(max-width: 768px)').matches
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function waitForImage(img) {
  if (!img) return Promise.resolve()
  if (img.complete && img.naturalWidth > 0) return Promise.resolve()
  return new Promise((resolve) => {
    img.addEventListener('load', resolve, { once: true })
    img.addEventListener('error', resolve, { once: true })
  })
}

export function useSplashAnimation(refs, onComplete) {
  const isAnimating = ref(true)
  let timeline = null
  let particleElements = []

  function createParticles(container) {
    if (!container) return []

    const count = isMobile() ? TOTAL_PARTICLES_MOBILE : TOTAL_PARTICLES_DESKTOP
    const particles = []

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'splash-particle absolute rounded-full pointer-events-none'
      const size = isMobile() ? 1 + Math.random() * 2 : 1.5 + Math.random() * 2.5
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.background =
        'radial-gradient(circle, rgba(232,212,139,0.7) 0%, rgba(201,162,39,0.4) 60%, transparent 100%)'
      particle.style.boxShadow = '0 0 4px rgba(201, 162, 39, 0.35)'
      particle.style.left = `${20 + Math.random() * 60}%`
      particle.style.top = `${15 + Math.random() * 70}%`
      particle.style.opacity = '0'
      particle.style.willChange = 'transform, opacity'
      container.appendChild(particle)
      particles.push(particle)
    }

    return particles
  }

  function animateFloatingParticles(tl, particles, startAt) {
    particles.forEach((particle, i) => {
      tl.to(
        particle,
        {
          opacity: 0.1 + Math.random() * 0.25,
          duration: 0.5,
          ease: 'power2.out',
        },
        startAt + i * 0.008
      )
    })
  }

  function setInitialState() {
    const { ambientLight, halo, logoStage, portrait, glassesSweep, title, slogan } = refs

    gsap.set(ambientLight.value, { opacity: 0, scale: 0.6 })
    gsap.set(halo.value, { opacity: 0, scale: 0.65 })
    gsap.set(logoStage.value, { scale: 0.72, opacity: 1 })
    gsap.set(portrait.value, {
      opacity: 0,
      scale: 1,
      filter: 'brightness(0.4) blur(8px)',
    })
    gsap.set(glassesSweep.value, { xPercent: -250, opacity: 0 })
    gsap.set(title.value, { opacity: 0, y: 10 })
    gsap.set(slogan.value, { opacity: 0, y: 8 })
  }

  function buildTimeline() {
    const {
      splash,
      ambientLight,
      halo,
      particlesContainer,
      logoStage,
      portrait,
      glassesSweep,
      title,
      slogan,
      stage,
    } = refs

    if (!splash.value) return null

    particleElements = createParticles(particlesContainer.value)

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.value = false
        onComplete?.()
      },
    })

    // Phase 1 — Ouverture + zoom in (0 → ~1.3s)
    tl.to(
      ambientLight.value,
      { opacity: 0.35, scale: 1, duration: 0.7, ease: 'power1.inOut' },
      0
    )

    animateFloatingParticles(tl, particleElements, 0.05)

    tl.to(
      halo.value,
      { opacity: 0.35, scale: 1, duration: 0.75, ease: 'power2.out' },
      0.05
    )

    tl.to(
      logoStage.value,
      { scale: 1, duration: 1, ease: 'power3.out' },
      0.08
    )

    tl.to(
      portrait.value,
      {
        opacity: 1,
        filter: 'brightness(1) blur(0px) drop-shadow(0 0 20px rgba(201, 162, 39, 0.2))',
        duration: 0.85,
        ease: 'power3.out',
      },
      0.1
    )

    tl.set(glassesSweep.value, { opacity: 0.45 }, 0.65)
    tl.to(
      glassesSweep.value,
      { xPercent: 350, duration: 0.45, ease: 'power2.inOut' },
      0.65
    )

    // Phase 2 — Textes
    tl.to(
      title.value,
      { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' },
      1.3
    )

    tl.to(
      slogan.value,
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
      1.6
    )

    // Phase 3 — Fermeture + zoom out (2.3s → 3s)
    tl.to(
      [title.value, slogan.value],
      { opacity: 0, y: -10, duration: 0.3, ease: 'power2.in' },
      2.3
    )

    tl.to(
      logoStage.value,
      { scale: 0.78, opacity: 0, duration: 0.45, ease: 'power2.in' },
      2.35
    )

    tl.to(
      halo.value,
      { scale: 0.85, opacity: 0, duration: 0.4, ease: 'power2.in' },
      2.35
    )

    tl.to(
      particleElements,
      { opacity: 0, duration: 0.35, stagger: 0.004, ease: 'power2.in' },
      2.4
    )

    tl.to(
      [ambientLight.value, stage.value],
      { opacity: 0, duration: 0.4, ease: 'power2.in' },
      2.5
    )

    tl.to(
      splash.value,
      { opacity: 0, duration: 0.45, ease: 'power2.in' },
      2.55
    )

    return tl
  }

  function buildReducedTimeline() {
    const { splash, logoStage, portrait, title, slogan, stage } = refs

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.value = false
        onComplete?.()
      },
    })

    tl.fromTo(logoStage.value, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55 })
    tl.fromTo(portrait.value, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0.1)
    tl.fromTo(title.value, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.3)
    tl.fromTo(slogan.value, { opacity: 0 }, { opacity: 1, duration: 0.25 }, 1.6)
    tl.to(logoStage.value, { scale: 0.85, opacity: 0, duration: 0.4 }, 2.35)
    tl.to(stage.value, { opacity: 0, duration: 0.3 }, 2.5)
    tl.to(splash.value, { opacity: 0, duration: 0.4 }, 2.55)

    return tl
  }

  async function play() {
    await nextTick()
    await waitForImage(refs.portrait.value)

    gsap.set(document.body, { overflow: 'hidden' })
    setInitialState()

    timeline = prefersReducedMotion() ? buildReducedTimeline() : buildTimeline()
  }

  function cleanup() {
    timeline?.kill()
    particleElements.forEach((p) => p.remove())
    particleElements = []
    gsap.set(document.body, { overflow: '' })
  }

  onMounted(() => {
    requestAnimationFrame(() => play())
  })

  onUnmounted(cleanup)

  return { isAnimating, cleanup, SPLASH_DURATION }
}

export const SPLASH_TITLE = 'BARUTI LEGACY FOUNDATION'
export const SPLASH_SLOGAN = 'Un héritage de foi, une mémoire éternelle'
