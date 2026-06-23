<template>
  <div class="relative">
    <div class="overflow-hidden">
      <img
        :src="heroImage"
        alt="Pasteur Baruti Kasongo"
        class="w-full border border-gray-200 rounded-xl dark:border-gray-800 object-cover max-h-80"
      />
    </div>
  </div>
</template>

<script setup>
import { heroImage } from '@admin/data/site.js'
</script>
