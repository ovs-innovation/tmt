import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = join(__dirname, '../public/logo.png')
const tmp = join(__dirname, '../public/logo-tmp.png')
const out = join(__dirname, '../public/logo-transparent.png')
const outMark = join(__dirname, '../public/logo-mark.png')

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const px = Buffer.from(data)
for (let i = 0; i < px.length; i += 4) {
  const r = px[i]
  const g = px[i + 1]
  const b = px[i + 2]
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  if (luminance < 30) {
    px[i + 3] = 0
  } else if (luminance < 55) {
    px[i + 3] = Math.round(((luminance - 30) / 25) * 255)
  }
}

await sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile(tmp)

await sharp(tmp).trim({ threshold: 12 }).png().toFile(out)

const meta = await sharp(out).metadata()
const w = meta.width || 800
const h = meta.height || 800
const markH = Math.round(h * 0.58)

await sharp(out)
  .extract({ left: 0, top: 0, width: w, height: Math.min(markH, h) })
  .trim({ threshold: 10 })
  .resize(512, 512, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(outMark)

console.log('OK', { out, outMark, w, h })
