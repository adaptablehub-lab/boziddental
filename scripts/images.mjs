// Builds the WebP versions of every photo and brand graphic, so they always match the .jpg/.png originals.
// Runs as part of `npm run build` (locally and on GitHub). To change a photo, just replace the .jpg in public/assets/img.
import { readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const jobs = [];
const imgDir = "dist/assets/img";
for (const f of readdirSync(imgDir).filter((f) => /\.jpe?g$/i.test(f))) {
  const big = /^(hero-|cta)/.test(f);
  jobs.push(
    sharp(join(imgDir, f))
      .resize({ width: big ? 1600 : 1000, withoutEnlargement: true })
      .webp({ quality: big ? 68 : 72 })
      .toFile(join(imgDir, f.replace(/\.jpe?g$/i, ".webp")))
  );
}
const brandDir = "dist/assets/brand";
for (const f of readdirSync(brandDir).filter((f) => f.endsWith(".png"))) {
  const logo = f.startsWith("logo");
  jobs.push(
    sharp(join(brandDir, f))
      .resize(logo ? { height: 160 } : { width: 640 })
      .webp({ quality: logo ? 90 : 85, alphaQuality: 100 })
      .toFile(join(brandDir, f.replace(/\.png$/, ".webp")))
  );
}
await Promise.all(jobs);
console.log(`images: ${jobs.length} WebP files generated`);
