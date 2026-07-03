import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync } from 'fs';
import { join, extname, basename } from 'path';

const ASSETS_DIR = './public/assets';
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 82;

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

const files = readdirSync(ASSETS_DIR).filter(f =>
  IMAGE_EXTS.includes(extname(f).toLowerCase())
);

console.log(`\n🗜  Compressing ${files.length} images in public/assets...\n`);

for (const file of files) {
  const inputPath = join(ASSETS_DIR, file);
  const tempPath = inputPath + '.tmp';
  const ext = extname(file).toLowerCase();
  const before = statSync(inputPath).size;

  try {
    let pipeline = sharp(inputPath).resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
    });

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: JPEG_QUALITY, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
    }

    // Write to temp file first
    await pipeline.toFile(tempPath);

    // Replace original with temp
    unlinkSync(inputPath);
    renameSync(tempPath, inputPath);

    const after = statSync(inputPath).size;
    const saved = (((before - after) / before) * 100).toFixed(1);
    const beforeKB = (before / 1024).toFixed(0);
    const afterKB = (after / 1024).toFixed(0);

    console.log(`  ✅ ${basename(file).padEnd(40)} ${beforeKB.padStart(5)}KB → ${afterKB.padStart(5)}KB  (${saved}% saved)`);
  } catch (err) {
    // Clean up temp if it exists
    try { unlinkSync(tempPath); } catch {}
    console.error(`  ❌ ${file}: ${err.message}`);
  }
}

console.log('\n✨ Done. All images compressed in place.\n');
