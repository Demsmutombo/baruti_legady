import { computed } from 'vue'
import { useCmsStore } from '../../composables/useCmsStore.js'
import { bk, pastorPortrait, heroImage, bkImages } from '../../data/images.js'
import { testimonyCategoryLabels } from '../../data/testimonies.js'

export { bk, pastorPortrait, heroImage, bkImages, testimonyCategoryLabels }

export function useAdminSiteData() {
  const cms = useCmsStore()

  const dashboardStats = computed(() => cms.stats.value)

  const campaignsByYear = computed(() => {
    const counts = {}
    for (const c of cms.campaigns.value) {
      counts[c.year] = (counts[c.year] || 0) + 1
    }
    const years = Object.keys(counts).sort()
    return { years, counts: years.map((y) => counts[y]) }
  })

  const testimonyByCategory = computed(() => {
    const counts = {}
    for (const t of cms.testimonies.value) {
      counts[t.category] = (counts[t.category] || 0) + 1
    }
    return Object.entries(counts).map(([category, count]) => ({
      category,
      label: testimonyCategoryLabels[category] || category,
      count,
    }))
  })

  const recentCampaigns = computed(() => cms.campaigns.value.slice(0, 5))

  const ministryRegions = [
    { name: 'RDC — provinces', count: 7, percent: 78, image: bk(36) },
    { name: 'International', count: 2, percent: 22, image: bk(33) },
  ]

  const mapMarkers = [
    { name: 'Kinshasa', coords: [-4.32, 15.31] },
    { name: 'Brésil', coords: [-14.24, -51.93] },
    { name: 'Australie', coords: [-25.27, 133.78] },
    { name: 'Gemena', coords: [3.25, 19.77] },
  ]

  const adminProfile = computed(() => ({
    name: cms.pastor.value.shortName,
    fullName: cms.pastor.value.fullName,
    title: cms.pastor.value.title,
    email: cms.contact.value.email,
    church: cms.contact.value.church,
    address: cms.contact.value.address,
    portrait: pastorPortrait,
    nickname: cms.pastor.value.nickname,
    birth: cms.biographyEssentials.value.birth,
    death: cms.biographyEssentials.value.death,
    ministry: cms.biographyEssentials.value.ministryYears,
    spouse: cms.biographyEssentials.value.spouse,
  }))

  const adminNotifications = computed(() => [
    {
      id: 1,
      userName: 'Baruti Legacy Foundation',
      action: '— contenu du mémorial',
      project: 'Site public',
      time: 'En ligne',
      image: pastorPortrait,
    },
    {
      id: 2,
      userName: cms.campaigns.value[0]?.region || 'Campagnes',
      action: '— dernière campagne',
      project: 'Campagnes',
      time: cms.campaigns.value[0]?.year || '',
      image: cms.campaigns.value[0]?.image || bk(10),
    },
    {
      id: 3,
      userName: cms.testimonies.value[0]?.title || 'Témoignages',
      action: '— témoignage publié',
      project: 'Témoignages',
      time: 'Actif',
      image: bk(13),
    },
  ])

  const memorialTeam = computed(() =>
    cms.hommages.value.map((item, index) => ({
      name: item.author,
      role: item.role,
      avatar: bk((index % 47) + 1),
      message: item.message.slice(0, 80) + '…',
      status: 'Actif',
    }))
  )

  return {
    cms,
    dashboardStats,
    campaignsByYear,
    testimonyByCategory,
    recentCampaigns,
    ministryRegions,
    mapMarkers,
    adminProfile,
    adminNotifications,
    memorialTeam,
  }
}
