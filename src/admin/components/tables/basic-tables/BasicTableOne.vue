<template>
  <admin-data-table title="Équipe mémorial" subtitle="Auteurs et contributeurs du site Baruti Legacy">
    <table class="admin-table admin-table--responsive">
      <thead>
        <tr>
          <th><span class="admin-table-th">Auteur</span></th>
          <th><span class="admin-table-th">Rôle</span></th>
          <th><span class="admin-table-th">Équipe</span></th>
          <th><span class="admin-table-th">Statut</span></th>
          <th><span class="admin-table-th">Extrait</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.name">
          <td class="admin-table-td--lead" data-label="Auteur">
            <div class="admin-table-cell-lead">
              <div class="admin-table-cell-avatar overflow-hidden p-0">
                <img :src="user.avatar" :alt="user.name" class="h-full w-full object-cover" />
              </div>
              <div class="min-w-0">
                <span class="admin-table-cell-title">{{ user.name }}</span>
                <span class="admin-table-cell-meta">{{ user.role }}</span>
              </div>
            </div>
          </td>
          <td data-label="Rôle">
            <span class="admin-table-cell-text">{{ user.role }}</span>
          </td>
          <td data-label="Équipe">
            <div class="flex -space-x-2">
              <div
                v-for="(member, memberIndex) in user.team"
                :key="memberIndex"
                class="h-7 w-7 overflow-hidden rounded-full border-2 border-white dark:border-gray-900"
              >
                <img :src="member" alt="" class="h-full w-full object-cover" />
              </div>
            </div>
          </td>
          <td data-label="Statut">
            <span class="admin-table-status admin-table-status--success">{{ user.status }}</span>
          </td>
          <td data-label="Extrait">
            <p class="admin-table-cell-text line-clamp-2 max-w-xs">{{ user.message }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </admin-data-table>
</template>

<script setup>
import { computed } from 'vue'
import AdminDataTable from '@admin/components/common/AdminDataTable.vue'
import { useAdminSiteData, bk } from '@admin/data/site.js'

const { memorialTeam } = useAdminSiteData()

const users = computed(() =>
  memorialTeam.value.map((item, index) => ({
    ...item,
    team: [item.avatar, bk((index + 2) % 47 || 1), bk((index + 5) % 47 || 1)],
  }))
)
</script>
