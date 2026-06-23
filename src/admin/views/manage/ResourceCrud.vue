<template>
  <crud-page v-if="config" :resource-key="resourceKey" :config="config" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CrudPage from '@admin/components/cms/CrudPage.vue'
import { crudResources } from '@admin/config/crud.js'

const route = useRoute()
const resourceKey = computed(() => route.meta.resource)
const config = computed(() => crudResources[resourceKey.value] || null)
</script>
