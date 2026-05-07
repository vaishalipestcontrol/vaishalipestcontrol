/**
 * Compresses an image client-side using HTML5 Canvas.
 * Standardizes to jpeg format with adjustable quality and dimensions.
 */
export async function compressImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.8
): Promise<File> {
  return new Promise((resolve) => {
    // If it's not an image, return original file
    if (!file.type.startsWith('image/')) {
      resolve(file)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = typeof window !== 'undefined' ? new window.Image() : null
      if (!img) {
        resolve(file)
        return
      }

      img.onload = () => {
        let width = img.width
        let height = img.height

        // Calculate aspect ratio resizing
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(file)
          return
        }

        // Draw image to canvas
        ctx.drawImage(img, 0, 0, width, height)

        // Convert canvas to compressed jpeg blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create a new File from the blob
              const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".jpg"
              const compressedFile = new File([blob], newFileName, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              })
              resolve(compressedFile)
            } else {
              resolve(file)
            }
          },
          'image/jpeg',
          quality
        )
      }

      img.onerror = () => resolve(file)
      img.src = e.target?.result as string
    }

    reader.onerror = () => resolve(file)
    reader.readAsDataURL(file)
  })
}
