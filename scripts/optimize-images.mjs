import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

sharp.cache(false)

const TARGET_DIRS = ['public', 'public/images']

const IS_THUMB_OR_GALLERY = (name) => {
  const n = name.toLowerCase()
  return (
    n.includes('detail') ||
    n.includes('poster') ||
    n.includes('sofa') ||
    n.includes('mural') ||
    n.includes('thumb') ||
    n.includes('badge') ||
    n.includes('sticker')
  )
}

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const baseName = path.basename(filePath).toLowerCase()

  if (baseName.includes('icon-') || baseName.includes('favicon') || ext === '.svg' || ext === '.mp4') {
    return null
  }

  const stat = await fs.stat(filePath)
  const initialSize = stat.size

  const inputBuffer = await fs.readFile(filePath)

  let buffer

  if (ext === '.jpg' || ext === '.jpeg') {
    const isGallery = IS_THUMB_OR_GALLERY(baseName)
    const isHero = baseName.includes('hero')
    // Max dimensions adjusted so everything lands comfortably under 250KB and hero under 150KB
    const maxDim = isHero ? 1280 : isGallery ? 1100 : 1400
    const quality = isHero ? 72 : 72

    buffer = await sharp(inputBuffer)
      .rotate()
      .resize({
        width: maxDim,
        height: maxDim,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({
        quality,
        mozjpeg: true,
      })
      .toBuffer()

    // If still over 245KB, compress one step further
    if (buffer.length > 245 * 1024) {
      buffer = await sharp(inputBuffer)
        .rotate()
        .resize({
          width: 1250,
          height: 1250,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({
          quality: 70,
          mozjpeg: true,
        })
        .toBuffer()
    }
  } else if (ext === '.png') {
    const maxDim = baseName.includes('icon') ? 512 : 800
    buffer = await sharp(inputBuffer)
      .resize({
        width: maxDim,
        height: maxDim,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .png({
        quality: 80,
        compressionLevel: 9,
        palette: true,
      })
      .toBuffer()
  } else {
    return null
  }

  if (buffer && buffer.length > 0) {
    await fs.writeFile(filePath, buffer)
    return {
      file: filePath,
      before: initialSize,
      after: buffer.length,
      saved: initialSize - buffer.length,
    }
  }
  return null
}

async function run() {
  console.log('Starting image optimization pass with sharp...')
  const results = []

  for (const dir of TARGET_DIRS) {
    try {
      const files = await fs.readdir(dir)
      for (const f of files) {
        const fullPath = path.join(dir, f)
        const stat = await fs.stat(fullPath)
        if (!stat.isDirectory()) {
          try {
            const res = await optimizeFile(fullPath)
            if (res) results.push(res)
          } catch (fileErr) {
            console.error(`Error optimizing ${fullPath}:`, fileErr.message)
          }
        }
      }
    } catch (e) {
      console.warn(`Could not read dir ${dir}:`, e.message)
    }
  }

  console.log('\nOptimization Results:')
  for (const r of results) {
    console.log(
      `  ${r.file}: ${(r.before / 1024).toFixed(1)} KB -> ${(r.after / 1024).toFixed(1)} KB (saved ${(r.saved / 1024).toFixed(1)} KB)`
    )
  }

  console.log(`\nOptimized ${results.length} images.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
