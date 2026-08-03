import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dir = join(__dirname, '../public/products')

const jobs = [
  { out: 'tmt-8.jpg', src: 'rebar-stack.jpg', left: 80, top: 120, w: 700, h: 700 },
  { out: 'tmt-10.jpg', src: 'rebar-coil.jpg', left: 100, top: 80, w: 700, h: 700 },
  { out: 'tmt-12.jpg', src: 'rebar-stack.jpg', left: 200, top: 200, w: 650, h: 650 },
  { out: 'tmt-16.jpg', src: 'steel-rods.jpg', left: 80, top: 80, w: 700, h: 700 },
  { out: 'angle.jpg', src: 'steel-structure.jpg', left: 120, top: 100, w: 700, h: 700 },
  { out: 'channel.jpg', src: 'rebar-site.jpg', left: 50, top: 50, w: 600, h: 600 },
]

for (const job of jobs) {
  const input = join(dir, job.src)
  const meta = await sharp(input).metadata()
  const maxW = meta.width || 800
  const maxH = meta.height || 800
  const left = Math.min(job.left, Math.max(0, maxW - 400))
  const top = Math.min(job.top, Math.max(0, maxH - 400))
  const w = Math.min(job.w, maxW - left)
  const h = Math.min(job.h, maxH - top)

  // Square product tile: crop + slight contrast for catalogue look
  await sharp(input)
    .extract({ left, top, width: w, height: h })
    .resize(640, 640, { fit: 'cover' })
    .modulate({ brightness: 1.02, saturation: 0.92 })
    .sharpen()
    .jpeg({ quality: 88 })
    .toFile(join(dir, job.out))

  console.log('made', job.out)
}

// Also refresh welcome/hero rebar
await sharp(join(dir, 'rebar-stack.jpg'))
  .resize(1000, 700, { fit: 'cover' })
  .jpeg({ quality: 90 })
  .toFile(join(dir, 'tmt.jpg'))

console.log('done')
