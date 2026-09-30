/* ---------- together counter ---------- */
function tickTogether() {
  const s = new Date(CONTENT.startDate), n = new Date();
  if (isNaN(s) || n < s) return;
  const at = (k) => new Date(s.getFullYear(), s.getMonth() + k, s.getDate(), s.getHours(), s.getMinutes());
  let m = (n.getFullYear() - s.getFullYear()) * 12 + n.getMonth() - s.getMonth();
  if (at(m) > n) m--;
  const ms = n - at(m);
  const d = Math.floor(ms / 864e5), h = Math.floor((ms % 864e5) / 36e5), min = Math.floor((ms % 36e5) / 6e4);
  const left = Math.ceil((at(m + 1) - n) / 864e5);
  const p = (v, w) => v + " " + w + (v === 1 ? "" : "s");
  $("together").textContent = d === 0 && m > 0
    ? "Happy " + p(m, "month") + ", " + CONFIG.herName + "!"
    : "Together for " + p(m, "month") + ", " + p(d, "day") + ", " + p(h, "hour") + " & " + p(min, "minute") + " \u00B7 next monthsary in " + p(left, "day");
}
tickTogether();
setInterval(tickTogether, 60000);

/* ---------- bouquet ---------- */
// x / y: position inside a 440 x 520 canvas. w: flower size as a share of the width. Listed top to bottom so lower flowers overlap upper ones.
const SPOTS = [
  { x: 220, y: 84,  w: 24, t: "lily",    r: 0 },
  { x: 118, y: 140, w: 23, t: "lily",    r: -8 },
  { x: 322, y: 140, w: 23, t: "lily",    r: 8 },
  { x: 220, y: 168, w: 22, t: "lily",    r: 2 },
  { x: 62,  y: 236, w: 20, t: "blossom", r: -14 },
  { x: 378, y: 236, w: 20, t: "blossom", r: 14 },
  { x: 158, y: 232, w: 23, t: "lily",    r: -6 },
  { x: 282, y: 232, w: 23, t: "lily",    r: 6 },
  { x: 108, y: 296, w: 18, t: "blossom", r: -18 },
  { x: 332, y: 296, w: 18, t: "blossom", r: 18 },
  { x: 220, y: 268, w: 21, t: "lily",    r: 0 }
];
const PINKS = [["#ffc2d9", "#ff6fa3"], ["#ffb3cf", "#f0508b"], ["#ffd3e3", "#ff8fb8"], ["#ff9dc2", "#e23f76"]];
const NS = "http://www.w3.org/2000/svg";

function lilySVG(c1, c2) {
  const petal = "M0 0C-15-12-15-36 0-47C15-36 15-12 0 0Z";
  let g = "";
  [0, 120, 240].forEach((a) => { g += '<path d="' + petal + '" fill="' + c2 + '" opacity=".8" transform="rotate(' + (a + 60) + ')"/>'; });
  [0, 120, 240].forEach((a) => {
    g += '<g transform="rotate(' + a + ')"><path d="' + petal + '" fill="' + c1 + '" stroke="' + c2 + '" stroke-width=".8"/>' +
      '<path d="M0-6V-32" stroke="' + c2 + '" stroke-width="2" stroke-linecap="round" opacity=".55"/>' +
      '<circle cx="-4" cy="-18" r="1.3" fill="' + c2 + '"/><circle cx="4" cy="-23" r="1.3" fill="' + c2 + '"/><circle cx="-3" cy="-29" r="1.3" fill="' + c2 + '"/></g>';
  });
  [20, 80, 140, 200, 260, 320].forEach((a) => {
    g += '<g transform="rotate(' + a + ')"><path d="M0 0V-21" stroke="#9bb04a" stroke-width="1.4"/><ellipse cx="0" cy="-24" rx="2.2" ry="4" fill="#b5651d"/></g>';
  });
  g += '<circle r="4" fill="#c8d96b"/>';
  return g;
}

function blossomSVG(c1, c2) {
  let g = "";
  for (let k = 0; k < 8; k++) {
    g += '<ellipse cx="0" cy="-25" rx="11" ry="20" fill="' + c1 + '" stroke="' + c2 + '" stroke-width=".8" transform="rotate(' + k * 45 + ')"/>';
  }
  g += '<circle r="10" fill="#ffd166"/><circle r="5" fill="#d99a2b"/>';
  return g;
}

function bouquetBase() {
  const stems = SPOTS.map((p) =>
    '<path d="M' + p.x + " " + p.y + "C" + p.x + " " + (p.y + 140) + " " + (220 + (p.x - 220) * 0.15) + ' 300 220 400" fill="none" stroke="#4fae7f" stroke-width="5" stroke-linecap="round"/>'
  ).join("");
  const leaf = "M0 0C-18-20-18-50 0-72C18-50 18-20 0 0Z";
  const leaves = [[150, 372, -48, 1], [290, 372, 48, 1], [220, 366, 0, 1.15], [104, 384, -74, .85], [336, 384, 74, .85]]
    .map((l) => '<path d="' + leaf + '" fill="#5fbf8f" stroke="#3e9a6c" stroke-width="1.2" transform="translate(' + l[0] + " " + l[1] + ") rotate(" + l[2] + ") scale(" + l[3] + ')"/>').join("");
  const wrap =
    '<polygon points="92,362 348,362 246,506 194,506" fill="#ff8fb8"/>' +
    '<polygon points="92,362 220,398 194,506" fill="#ffb3cf"/>' +
    '<polygon points="348,362 220,398 246,506" fill="#ff9dc2"/>' +
    '<path d="M92 362L220 398L348 362" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-linejoin="round"/>';
  const bow =
    '<ellipse cx="192" cy="398" rx="26" ry="13" transform="rotate(-22 192 398)" fill="#ff5d8f"/>' +
    '<ellipse cx="248" cy="398" rx="26" ry="13" transform="rotate(22 248 398)" fill="#ff5d8f"/>' +
    '<path d="M214 404L196 446L208 440L214 452ZM226 404L244 446L232 440L226 452Z" fill="#e23f76"/>' +
    '<circle cx="220" cy="400" r="9" fill="#e23f76"/>';
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 440 520");
  svg.setAttribute("class", "bq");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = leaves + stems + wrap + bow;
  return svg;
}

const wall = $("wall");
wall.appendChild(bouquetBase());

SPOTS.forEach((sp, i) => {
  const col = PINKS[i % PINKS.length];
  const f = document.createElement("div");
  f.className = "flower";
  f.setAttribute("aria-hidden", "true");
  f.style.left = (sp.x / 440 * 100) + "%";
  f.style.top = (sp.y / 520 * 100) + "%";
  f.style.width = sp.w + "%";
  f.style.setProperty("--r", sp.r + "deg");
  f.style.setProperty("--d", (-i * 0.7) + "s");
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "-50 -50 100 100");
  svg.innerHTML = sp.t === "lily" ? lilySVG(col[0], col[1]) : blossomSVG(col[0], col[1]);
  f.appendChild(svg);
  wall.appendChild(f);
});

/* falling petals: driven by requestAnimationFrame so they always really fall */
const calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; // calm = gentler, never off
const petals = [];

function makePetal(size) {
  const col = PINKS[Math.floor(Math.random() * PINKS.length)];
  const p = document.createElement("span");
  p.className = "pt";
  p.setAttribute("aria-hidden", "true");
  p.style.width = size + "px";
  p.style.height = size * 1.35 + "px";
  p.style.setProperty("--c1", col[0]);
  p.style.setProperty("--c2", col[1]);
  p.style.opacity = 0;
  p.appendChild(document.createElement("i"));
  return p;
}

function dropPetal(startY) {
  const scale = wall.clientWidth / 440;
  const sp = SPOTS[Math.floor(Math.random() * SPOTS.length)];
  const side = sp.x < 200 ? -1 : sp.x > 240 ? 1 : (Math.random() < .5 ? -1 : 1);
  const size = (12 + Math.random() * 11) * Math.max(scale, .75);
  const el = makePetal(size);
  wall.appendChild(el);
  petals.push({
    el, size, scale, t: 0,
    x: (sp.x + (Math.random() - .5) * 40) * scale,
    y: (startY != null ? startY : sp.y) * scale,
    vx: side * (10 + Math.random() * 26) * scale,
    vy: 10 * scale,
    vt: (52 + Math.random() * 48) * scale * (calm ? .6 : 1),
    sa: (26 + Math.random() * 38) * scale, sf: 1.1 + Math.random() * 1.3, ph: Math.random() * 6.28,
    rz: Math.random() * 360, rvz: (Math.random() - .5) * 150,
    ra: Math.random() * 360, rva: calm ? 0 : 140 + Math.random() * 200
  });
}

// a few petals resting at the foot of the bouquet
[[26, 99, 15, -30], [34, 102, 12, 40], [47, 103, 14, 110], [58, 100, 13, -70], [70, 102, 15, 20], [80, 98, 11, -120], [18, 97, 11, 75]].forEach((r) => {
  const p = makePetal(r[2]);
  p.classList.add("rest");
  p.style.left = r[0] + "%";
  p.style.top = r[1] + "%";
  p.style.transform = "rotate(" + r[3] + "deg)";
  p.style.opacity = .85;
  wall.appendChild(p);
});

let running = false, last = 0, acc = 0;
function frame(now) {
  if (!running) return;
  const dt = Math.min(.05, (now - last) / 1000);
  last = now;
  acc += dt;
  if (acc > (calm ? 1 : .4) && petals.length < (calm ? 12 : 30)) { acc = 0; dropPetal(); }
  const wind = Math.sin(now / 2500) * 14;
  const endY = wall.clientHeight + 60;
  for (let i = petals.length - 1; i >= 0; i--) {
    const p = petals[i];
    p.t += dt;
    p.vy += (p.vt - p.vy) * Math.min(1, dt * 1.6);
    p.vx *= 1 - Math.min(1, dt * .5);
    p.y += p.vy * dt;
    p.x += (p.vx + wind * p.scale + Math.sin(p.t * p.sf + p.ph) * p.sa) * dt;
    p.rz += p.rvz * dt;
    p.ra += p.rva * dt;
    const fadeIn = Math.min(1, p.t / .5);
    const fadeOut = Math.max(0, Math.min(1, (endY - p.y) / (90 * p.scale)));
    p.el.style.opacity = fadeIn * fadeOut;
    p.el.style.transform = "translate3d(" + (p.x - p.size / 2) + "px," + (p.y - p.size * .675) + "px,0) perspective(400px) rotateZ(" + p.rz + "deg) rotateX(" + p.ra + "deg)";
    if (p.y > endY) { p.el.remove(); petals.splice(i, 1); }
  }
  requestAnimationFrame(frame);
}

new IntersectionObserver((en) => {
  if (en[0].isIntersecting && !running) {
    running = true;
    last = performance.now();
    if (!petals.length) [60, 150, 240, 330].forEach((y) => dropPetal(y));
    requestAnimationFrame(frame);
  } else if (!en[0].isIntersecting) {
    running = false;
  }
}, { rootMargin: "120px" }).observe(wall);

/* ---------- vinyl player ---------- */
const audio = $("audio");
let cur = 0;
const fmt = (t) => isFinite(t) ? Math.floor(t / 60) + ":" + String(Math.floor(t % 60)).padStart(2, "0") : "0:00";

function addTrack(s, i) {
  const li = document.createElement("li");
  const b = document.createElement("button");
  b.textContent = s.title + " \u2014 " + s.artist;
  b.addEventListener("click", () => loadSong(i, true));
  li.appendChild(b);
  $("tracks").appendChild(li);
}
CONTENT.songs.forEach(addTrack);

function loadSong(i, autoplay) {
  const n = CONTENT.songs.length;
  cur = (i + n) % n;
  const s = CONTENT.songs[cur];
  audio.src = s.file;
  audio.load();
  $("sTitle").textContent = s.title;
  $("sArtist").textContent = s.artist;
  $("sWhy").textContent = s.why;
  const lab = $("vLabel");
  lab.style.background = s.color;
  lab.textContent = s.title;              // shown until the cover loads (or if there is none)
  lab.classList.remove("hasCover");
  if (s.cover) {
    const img = new Image();
    img.alt = s.title + " album cover";
    img.onload = () => {
      if (CONTENT.songs[cur] !== s) return;   // user already switched songs
      lab.textContent = "";
      lab.appendChild(img);
      lab.classList.add("hasCover");
    };
    img.src = s.cover;
  }
  $("sMsg").textContent = "";
  $("seek").value = 0;
  $("time").textContent = "0:00";
  [...$("tracks").children].forEach((li, k) => li.classList.toggle("on", k === cur));
  if (autoplay) playSong();
}

function missingMsg() {
  const s = CONTENT.songs[cur];
  $("sMsg").textContent = 'Can\'t find "' + s.file + '". Put the mp3 in the songs folder and make the name match content.js exactly.';
}

function playSong() {
  const p = audio.play();
  if (p && p.catch) p.catch((err) => { if (err.name !== "AbortError") missingMsg(); });
}

$("play").addEventListener("click", () => (audio.paused ? playSong() : audio.pause()));
$("next").addEventListener("click", () => loadSong(cur + 1, !audio.paused));
$("prev").addEventListener("click", () => loadSong(cur - 1, !audio.paused));
audio.addEventListener("play", () => { $("deck").classList.add("playing"); $("play").textContent = "Pause"; $("sMsg").textContent = ""; });
audio.addEventListener("pause", () => { $("deck").classList.remove("playing"); $("play").textContent = "Play"; });
audio.addEventListener("ended", () => loadSong(cur + 1, true));
audio.addEventListener("error", () => { $("deck").classList.remove("playing"); $("play").textContent = "Play"; missingMsg(); });
audio.addEventListener("timeupdate", () => {
  if (audio.duration) $("seek").value = (audio.currentTime / audio.duration) * 100;
  $("time").textContent = fmt(audio.currentTime) + " / " + fmt(audio.duration);
});
$("seek").addEventListener("input", () => { if (audio.duration) audio.currentTime = ($("seek").value / 100) * audio.duration; });

// volume: slider + mute button (remembers your level)
let lastVol = 0.8;
function setVol(v) {
  audio.volume = v;
  if (v > 0) lastVol = v;
  const pct = Math.round(v * 100);
  $("vol").value = pct;
  $("volPct").textContent = pct + "%";
  $("mute").textContent = v === 0 ? "\uD83D\uDD07" : v < 0.4 ? "\uD83D\uDD08" : v < 0.7 ? "\uD83D\uDD09" : "\uD83D\uDD0A";
  try { localStorage.setItem("vinylVol", v); } catch (e) {}
}
$("vol").addEventListener("input", () => setVol($("vol").value / 100));
$("mute").addEventListener("click", () => setVol(audio.volume > 0 ? 0 : lastVol));
let startVol = 0.8;
try { const sv = parseFloat(localStorage.getItem("vinylVol")); if (!isNaN(sv)) startVol = Math.min(1, Math.max(0, sv)); } catch (e) {}
setVol(startVol);

// quick try-out: pick an mp3 from your device (lasts until you refresh; for the real site use the songs folder)
$("pickBtn").addEventListener("click", () => $("mp3pick").click());
$("mp3pick").addEventListener("change", (e) => {
  const f = e.target.files[0];
  if (!f) return;
  CONTENT.songs.push({ title: f.name.replace(/\.[^.]+$/, ""), artist: "From your device", file: URL.createObjectURL(f), color: "#ff5d8f",
    why: "Playing from your device. Add it to the songs folder to keep it." });
  addTrack(CONTENT.songs[CONTENT.songs.length - 1], CONTENT.songs.length - 1);
  loadSong(CONTENT.songs.length - 1, true);
  e.target.value = "";
});
loadSong(0, false);

/* ---------- letter ---------- */
$("env").addEventListener("click", () => {
  const L = CONTENT.letter, box = $("letterBox");
  box.innerHTML = "";
  [L.greeting].concat(L.paragraphs).forEach((t) => {
    const p = document.createElement("p");
    p.textContent = t;
    box.appendChild(p);
  });
  const sg = document.createElement("p");
  sg.className = "sign";
  sg.textContent = L.sign + " " + CONFIG.fromName;
  box.appendChild(sg);
  $("env").classList.add("open");
  setTimeout(() => { $("env").style.display = "none"; box.hidden = false; box.classList.add("show"); hearts(); }, 650);
});

$("foot").textContent = "Happy monthsary, " + CONFIG.herName + " \u2665";
