// 빌드 후 Service Worker 생성: out/의 모든 파일을 미리 캐시해 오프라인에서도 전체 앱이 동작하게 한다.
// 실행: next build 이후 node scripts/generate-sw.mjs
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT_DIR = join(import.meta.dirname, "..", "out");
const SW_FILE = "sw.js";
const HASH_LENGTH = 12;
const EXCLUDED = new Set([SW_FILE, "404.html", "404/index.html"]);

/** 폴더 안 모든 파일 경로 (재귀) */
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

/** 파일 경로 → URL. index.html은 폴더 URL도 함께 캐시 */
function toUrls(file) {
  // 브라우저는 [id] 같은 문자를 %5Bid%5D로 인코딩해 요청하므로 캐시 키도 인코딩한다
  const path = "/" + relative(OUT_DIR, file).split(sep).map(encodeURIComponent).join("/");
  if (path === "/index.html") return ["/", path];
  if (path.endsWith("/index.html")) return [path.slice(0, -"index.html".length), path];
  return [path];
}

const files = walk(OUT_DIR).filter((f) => !EXCLUDED.has(relative(OUT_DIR, f).split(sep).join("/")));
const hash = createHash("sha256");
for (const f of files) hash.update(readFileSync(f));
const version = hash.digest("hex").slice(0, HASH_LENGTH);
const urls = files.flatMap(toUrls);

const source = `// 자동 생성 파일 (scripts/generate-sw.mjs) — 직접 수정 금지
const CACHE = "audit-english-${version}";
const PRECACHE = ${JSON.stringify(urls)};

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// 캐시 우선: 오프라인과 빠른 실행을 위해 캐시에 있으면 바로 응답하고, 없으면 네트워크
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(request).catch(() =>
        request.mode === "navigate" ? caches.match("/") : Response.error(),
      );
    }),
  );
});
`;

writeFileSync(join(OUT_DIR, SW_FILE), source);
process.stdout.write(`✅ Service Worker 생성: ${urls.length}개 URL 사전 캐시 (버전 ${version})\n`);
