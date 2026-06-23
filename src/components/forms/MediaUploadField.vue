<script setup>
import { ref, computed } from 'vue'
import { processMediaFile } from '../../composables/useMediaUpload.js'

const props = defineProps({
  modelValue: { type: Object, default: null },
  label: { type: String, default: 'Photo ou vidéo (optionnel)' },
  hint: { type: String, default: 'JPG, PNG, WebP, MP4 ou WebM — max. 4 Mo (image) / 8 Mo (vidéo)' },
  imagesOnly: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const dragging = ref(false)
const loading = ref(false)
const error = ref('')
const fileName = ref('')

const preview = computed(() => props.modelValue?.mediaUrl || '')
const mediaType = computed(() => props.modelValue?.mediaType || '')

async function handleFiles(fileList) {
  const file = fileList?.[0]
  if (!file) return

  error.value = ''
  loading.value = true
  fileName.value = file.name

  try {
    if (props.imagesOnly && file.type.startsWith('video/')) {
      throw new Error('Seules les images sont acceptées ici.')
    }
    const media = await processMediaFile(file)
    emit('update:modelValue', media)
  } catch (err) {
    error.value = err.message || 'Fichier non pris en charge.'
    emit('update:modelValue', null)
  } finally {
    loading.value = false
  }
}

function onInputChange(event) {
  handleFiles(event.target.files)
  event.target.value = ''
}

function onDrop(event) {
  dragging.value = false
  handleFiles(event.dataTransfer?.files)
}

function removeMedia() {
  error.value = ''
  fileName.value = ''
  emit('update:modelValue', null)
}
</script>

<template>
  <div class="public-form-field">
    <label class="public-form-label">{{ label }}</label>
    <p class="public-form-hint">{{ hint }}</p>

    <div
      v-if="!preview"
      class="media-upload-zone"
      :class="{ 'media-upload-zone--drag': dragging, 'media-upload-zone--loading': loading }"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="onDrop"
    >
      <input
        type="file"
        :accept="imagesOnly ? 'image/jpeg,image/png,image/webp' : 'image/jpeg,image/png,image/webp,video/mp4,video/webm'"
        class="media-upload-zone__input"
        :disabled="loading"
        @change="onInputChange"
      />
      <div class="media-upload-zone__content">
        <span class="media-upload-zone__icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <p class="media-upload-zone__title">
          {{ loading ? 'Traitement en cours…' : 'Glissez un fichier ou cliquez pour parcourir' }}
        </p>
        <p class="media-upload-zone__meta">{{ imagesOnly ? 'Image JPG, PNG ou WebP' : 'Image ou courte vidéo souvenir' }}</p>
      </div>
    </div>

    <div v-else class="media-upload-preview">
      <img v-if="mediaType === 'image'" :src="preview" alt="Aperçu" class="media-upload-preview__media" />
      <video
        v-else-if="mediaType === 'video'"
        :src="preview"
        controls
        class="media-upload-preview__media"
      />
      <div class="media-upload-preview__footer">
        <span class="media-upload-preview__name">{{ fileName }}</span>
        <button type="button" class="media-upload-preview__remove" @click="removeMedia">Retirer</button>
      </div>
    </div>

    <p v-if="error" class="public-form-error">{{ error }}</p>
  </div>
</template>
