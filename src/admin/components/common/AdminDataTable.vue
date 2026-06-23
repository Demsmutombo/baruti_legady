<template>
  <div class="admin-data-table-card" :class="{ 'admin-data-table-card--flush': flush }">
    <div
      v-if="title || subtitle || searchable || filterable || $slots.toolbar"
      class="admin-data-table-header"
    >
      <div class="admin-data-table-header-text">
        <h3 v-if="title" class="admin-data-table-title">{{ title }}</h3>
        <p v-if="subtitle" class="admin-data-table-subtitle">{{ subtitle }}</p>
      </div>

      <div class="admin-data-table-toolbar">
        <slot name="toolbar">
          <div v-if="searchable" class="admin-table-search-wrap">
            <svg
              class="admin-table-search-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7.333 12.667A5.333 5.333 0 107.333 2a5.333 5.333 0 000 10.667zM14 14l-2.9-2.9"
                stroke="currentColor"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <input
              :value="modelValue"
              type="search"
              class="admin-table-search"
              :placeholder="searchPlaceholder"
              @input="$emit('update:modelValue', $event.target.value)"
            />
          </div>
          <button
            v-if="filterable"
            type="button"
            class="admin-table-filter-btn"
            @click="$emit('filter')"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 4h12M4 8h8M6 12h4"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
              />
            </svg>
            Filtrer
          </button>
        </slot>
      </div>
    </div>

    <div class="admin-data-table-scroll custom-scrollbar">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  searchable: { type: Boolean, default: false },
  filterable: { type: Boolean, default: false },
  searchPlaceholder: { type: String, default: 'Rechercher…' },
  modelValue: { type: String, default: '' },
  flush: { type: Boolean, default: false },
})

defineEmits(['update:modelValue', 'filter'])
</script>
