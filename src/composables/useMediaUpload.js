const MAX_IMAGE_BYTES = 4 * 1024 * 1024
const MAX_VIDEO_BYTES = 8 * 1024 * 1024
const MAX_IMAGE_WIDTH = 1280

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Impossible de lire le fichier'))
    reader.readAsDataURL(file)
  })
}

function compressImage(file, maxWidth = MAX_IMAGE_WIDTH, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)
      const scale = Math.min(1, maxWidth / img.width)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Image invalide'))
    }

    img.src = url
  })
}

export async function processMediaFile(file) {
  if (!file) return null

  const isVideo = file.type.startsWith('video/')
  const isImage = file.type.startsWith('image/')

  if (!isImage && !isVideo) {
    throw new Error('Formats acceptés : JPG, PNG, WebP, MP4 ou WebM.')
  }

  if (isImage && file.size > MAX_IMAGE_BYTES) {
    throw new Error('L\'image ne doit pas dépasser 4 Mo.')
  }

  if (isVideo && file.size > MAX_VIDEO_BYTES) {
    throw new Error('La vidéo ne doit pas dépasser 8 Mo.')
  }

  if (isImage) {
    const mediaUrl = await compressImage(file)
    return { mediaType: 'image', mediaUrl }
  }

  const mediaUrl = await readAsDataUrl(file)
  return { mediaType: 'video', mediaUrl }
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}
