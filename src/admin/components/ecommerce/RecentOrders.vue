<template>
  <admin-data-table
    v-model="searchQuery"
    title="Campagnes récentes"
    subtitle="Dernières missions d'évangélisation documentées"
    searchable
    filterable
  >
    <table class="admin-table admin-table--responsive">
      <thead>
        <tr>
          <th><span class="admin-table-th">Campagne</span></th>
          <th><span class="admin-table-th">Région</span></th>
          <th><span class="admin-table-th">Année</span></th>
          <th><span class="admin-table-th">Pays</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="campaign in filteredCampaigns" :key="campaign.region + campaign.year">
          <td class="admin-table-td--lead" data-label="Campagne">
            <div class="admin-table-cell-lead">
              <div class="admin-table-cell-thumb">
                <img :src="campaign.image" :alt="campaign.region" />
              </div>
              <div class="min-w-0">
                <p class="admin-table-cell-title">{{ campaign.region }}</p>
                <p class="admin-table-cell-meta">{{ campaign.description.slice(0, 60) }}…</p>
              </div>
            </div>
          </td>
          <td data-label="Région">
            <span class="admin-table-cell-text">{{ campaign.region }}</span>
          </td>
          <td data-label="Année">
            <span class="admin-table-cell-text">{{ campaign.year }}</span>
          </td>
          <td data-label="Pays">
            <span class="admin-table-status admin-table-status--brand">{{ campaign.country }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </admin-data-table>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminDataTable from '@admin/components/common/AdminDataTable.vue'
import { useAdminSiteData } from '@admin/data/site.js'

const { recentCampaigns } = useAdminSiteData()
const searchQuery = ref('')

const filteredCampaigns = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return recentCampaigns.value
  return recentCampaigns.value.filter(
    (c) =>
      c.region.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      String(c.year).includes(q) ||
      c.description.toLowerCase().includes(q)
  )
})
</script>
