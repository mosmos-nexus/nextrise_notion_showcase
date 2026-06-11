#!/usr/bin/env node
/**
 * build.mjs — NextRise Notion Showcase build script
 *
 * Concatenates src/ partials in manifest order → index.html
 * Inserts exactly ONE generated-file banner as an HTML comment
 * directly after the <head> opening tag.
 *
 * Usage:
 *   node scripts/build.mjs              # write index.html
 *   node scripts/build.mjs --out PATH   # write to alternate path
 *   node scripts/build.mjs --check      # compare to index.html, exit 1 on drift
 *
 * The emitted file is LF-only (no reformatting, no extra whitespace).
 * Do NOT hand-edit index.html — edit src/ partials and rebuild.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const MANIFEST_PATH = resolve(__dirname, 'build-manifest.json');
const INDEX_PATH    = resolve(ROOT, 'index.html');

const BANNER = '<!-- GENERATED FILE — edit src/ partials and run `npm run build`. Do not hand-edit. -->';

// ── Parse args ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const checkMode = args.includes('--check');
const outIdx    = args.indexOf('--out');
const outPath   = outIdx !== -1 ? resolve(process.cwd(), args[outIdx + 1]) : INDEX_PATH;

// ── Read manifest ─────────────────────────────────────────────────────────────
const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));

// ── Assemble pieces ───────────────────────────────────────────────────────────
// Each piece contributes its text. Pieces are joined with '\n' between them,
// matching the original file's line structure (each partial ends without a
// trailing newline; each literal is a single line of text without trailing LF).
// The final file gets one trailing '\n'.

const chunks = [];
for (const piece of manifest.pieces) {
  if (piece.file) {
    const content = readFileSync(resolve(ROOT, piece.file), 'utf8');
    chunks.push(content);
  } else if (piece.literal !== undefined) {
    chunks.push(piece.literal);
  } else {
    throw new Error(`Unknown manifest piece: ${JSON.stringify(piece)}`);
  }
}

// Join all chunks with '\n', then add the single trailing '\n'
let assembled = chunks.join('\n') + '\n';

// ── Insert GENERATED banner ───────────────────────────────────────────────────
// The banner goes on a NEW LINE directly after the '<head>' opening tag.
// head.html opens with the doctype/html/head structure; '<head>' is on line 3
// of the original file (index 2 in the assembled content).
// We insert the banner line AFTER the '<head>' line.
//
// Strategy: find the first occurrence of '<head>' followed by a newline
// and insert the banner line between them.
const HEAD_TAG = '<head>';
const headPos = assembled.indexOf(HEAD_TAG);
if (headPos === -1) {
  throw new Error('Could not find <head> tag in assembled output — manifest may be broken');
}
// Insert '\n' + BANNER immediately after '<head>'
const insertAt = headPos + HEAD_TAG.length;
assembled = assembled.slice(0, insertAt) + '\n' + BANNER + assembled.slice(insertAt);

// ── Guard: exactly one banner, no @@include markers ──────────────────────────
const bannerCount = assembled.split(BANNER).length - 1;
if (bannerCount !== 1) {
  throw new Error(`Expected exactly 1 banner in output, found ${bannerCount}`);
}
if (assembled.includes('@@include')) {
  throw new Error('@@include marker found in assembled output — strip it from src/ partials');
}

// ── Check mode ────────────────────────────────────────────────────────────────
if (checkMode) {
  let existing;
  try {
    existing = readFileSync(INDEX_PATH, 'utf8');
  } catch (e) {
    console.error(`build:check — cannot read index.html: ${e.message}`);
    process.exit(1);
  }
  if (assembled === existing) {
    console.log('build:check PASS — index.html is in sync with src/ partials');
    process.exit(0);
  } else {
    // Show first differing line for diagnosis
    const aLines = assembled.split('\n');
    const bLines = existing.split('\n');
    const maxLen = Math.max(aLines.length, bLines.length);
    let firstDiff = -1;
    for (let i = 0; i < maxLen; i++) {
      if (aLines[i] !== bLines[i]) { firstDiff = i + 1; break; }
    }
    console.error(`build:check FAIL — index.html is OUT OF SYNC with src/ partials`);
    if (firstDiff > 0) {
      console.error(`  First diff at line ${firstDiff}:`);
      console.error(`  built:     ${JSON.stringify((aLines[firstDiff - 1] || '').slice(0, 120))}`);
      console.error(`  on-disk:   ${JSON.stringify((bLines[firstDiff - 1] || '').slice(0, 120))}`);
    }
    console.error(`  Run: npm run build   to regenerate index.html from src/`);
    process.exit(1);
  }
}

// ── Write output ──────────────────────────────────────────────────────────────
writeFileSync(outPath, assembled, 'utf8');
const sha = createHash('sha256').update(assembled).digest('hex').slice(0, 16);
console.log(`build OK — wrote ${outPath}  sha256:${sha}`);
