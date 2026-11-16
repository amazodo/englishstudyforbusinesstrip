// 앱 아이콘 PNG 생성 (외부 의존성 없이 zlib으로 직접 인코딩)
// 실행: node scripts/generate-icons.mjs → public/icons/*.png
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { deflateSync } from "node:zlib";

const OUT_DIR = join(import.meta.dirname, "..", "public", "icons");
const BG = [29, 78, 216]; // 파랑 (#1d4ed8)
const FG = [255, 255, 255];
const CORNER_RADIUS = 0.22;
const STROKE = 0.1;
const SUPERSAMPLE = 4;
// 체크 표시 꼭짓점 (0~1 정규화 좌표)
const CHECK = [
  [0.27, 0.52],
  [0.43, 0.68],
  [0.74, 0.35],
];

const ICONS = [
  { file: "icon-192.png", size: 192, rounded: true },
  { file: "icon-512.png", size: 512, rounded: true },
  { file: "icon-maskable-512.png", size: 512, rounded: false },
  { file: "apple-touch-icon.png", size: 180, rounded: false },
];

/** 점과 선분 사이 거리 */
function distToSegment(px, py, [ax, ay], [bx, by]) {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** 둥근 사각형 내부인지 */
function insideRounded(u, v) {
  const r = CORNER_RADIUS;
  const cx = Math.min(Math.max(u, r), 1 - r);
  const cy = Math.min(Math.max(v, r), 1 - r);
  return Math.hypot(u - cx, v - cy) <= r;
}

/** 한 픽셀의 RGBA (슈퍼샘플링으로 가장자리 부드럽게) */
function pixel(x, y, size, rounded) {
  let bgHits = 0;
  let fgHits = 0;
  for (let sy = 0; sy < SUPERSAMPLE; sy += 1) {
    for (let sx = 0; sx < SUPERSAMPLE; sx += 1) {
      const u = (x + (sx + 0.5) / SUPERSAMPLE) / size;
      const v = (y + (sy + 0.5) / SUPERSAMPLE) / size;
      if (rounded && !insideRounded(u, v)) continue;
      const onCheck =
        distToSegment(u, v, CHECK[0], CHECK[1]) < STROKE / 2 ||
        distToSegment(u, v, CHECK[1], CHECK[2]) < STROKE / 2;
      if (onCheck) fgHits += 1;
      else bgHits += 1;
    }
  }
  const total = SUPERSAMPLE * SUPERSAMPLE;
  const covered = bgHits + fgHits;
  if (covered === 0) return [0, 0, 0, 0];
  const mix = (i) => Math.round((BG[i] * bgHits + FG[i] * fgHits) / covered);
  return [mix(0), mix(1), mix(2), Math.round((covered / total) * 255)];
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

/** CRC32 */
function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** PNG 청크 */
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

/** RGBA PNG 인코딩 */
function encodePng(size, rounded) {
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y += 1) {
    const row = y * (size * 4 + 1);
    raw[row] = 0; // 필터 없음
    for (let x = 0; x < size; x += 1) {
      Buffer.from(pixel(x, y, size, rounded)).copy(raw, row + 1 + x * 4);
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr.set([8, 6, 0, 0, 0], 8); // 8bit, RGBA
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([signature, chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}

mkdirSync(OUT_DIR, { recursive: true });
for (const { file, size, rounded } of ICONS) {
  writeFileSync(join(OUT_DIR, file), encodePng(size, rounded));
  process.stdout.write(`생성: public/icons/${file}\n`);
}
