const $ = (id) => document.getElementById(id);
const COLORS = ["#ff5d8f", "#ffd166", "#7be0c3", "#6ec1ff", "#c79bff", "#ff9b6b"];
const pick = (a) => a[Math.floor(Math.random() * a.length)];

let deck = [], seen = new Set(), busy = false, current = "";
let kept = [];
try { kept = JSON.parse(localStorage.getItem("keptReasons")) || []; } catch (e) {}

// setup text
$("title").textContent = CONFIG.title;
$("sub").textContent = CONFIG.subtitle;
document.title = CONFIG.title;

// fill the dome with capsules
for (let i = 0; i < 15; i++) {
  const b = document.createElement("i");
  b.className = "ball";
  b.style.background = pick(COLORS);
  b.style.left = 8 + Math.random() * 180 + "px";
  b.style.top = 60 + Math.random() * 110 + "px";
  $("dome").appendChild(b);
}

function updateCount() {
  $("count").textContent = seen.size + " of " + REASONS.length + " capsules opened";
}

// shuffled deck so nothing repeats until every reason has been seen
function nextReason() {
  if (!deck.length) {
    deck = REASONS.map((_, i) => i).sort(() => Math.random() - 0.5);
  }
  const i = deck.pop();
  seen.add(i);
  return REASONS[i];
}

function turn() {
  if (busy) return;
  busy = true;
  $("hint").textContent = "";
  const color = pick(COLORS);
  const drop = document.createElement("span");
  drop.className = "drop";
  drop.style.background = color;
  $("chute").innerHTML = "";
  $("chute").appendChild(drop);
  $("machine").classList.add("shake");
  setTimeout(() => reveal(color), 1500);
}

function reveal(color) {
  $("machine").classList.remove("shake");
  current = nextReason();
  const allSeen = seen.size === REASONS.length;
  $("reason").textContent = current;
  $("sig").textContent = "Love, " + CONFIG.fromName + " (for " + CONFIG.herName + ")";
  $("cap").style.setProperty("--c", color);
  $("cap").classList.remove("open");
  $("note").classList.remove("show");
  $("keep").classList.toggle("kept", kept.includes(current));
  $("keep").innerHTML = kept.includes(current) ? "&#9829; Kept" : "&#9825; Keep it";
  $("overlay").hidden = false;
  setTimeout(() => $("cap").classList.add("open"), 500);
  setTimeout(() => { $("note").classList.add("show"); hearts(); }, 1000);
  updateCount();
  if (allSeen) { $("sig").textContent = CONFIG.finale; }
}

function closeReveal() {
  $("overlay").hidden = true;
  $("chute").innerHTML = "";
  $("hint").textContent = "Tap the machine";
  busy = false;
}

function hearts() {
  const box = $("hearts");
  for (let i = 0; i < 14; i++) {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = pick(["\u2665", "\u2764", "\u2727"]);
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 16 + Math.random() * 22 + "px";
    h.style.color = pick(COLORS);
    h.style.animationDelay = Math.random() * 0.8 + "s";
    box.appendChild(h);
    setTimeout(() => h.remove(), 4500);
  }
}

function saveKept() {
  if (!kept.includes(current)) kept.push(current);
  try { localStorage.setItem("keptReasons", JSON.stringify(kept)); } catch (e) {}
  $("keep").classList.add("kept");
  $("keep").innerHTML = "&#9829; Kept";
}

function openJar() {
  const list = $("jarList");
  list.innerHTML = "";
  if (!kept.length) {
    list.innerHTML = '<li class="empty">Nothing here yet. Keep your favorite reasons and they will live here.</li>';
  }
  kept.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = r;
    list.appendChild(li);
  });
  $("jar").hidden = false;
}

$("machine").addEventListener("click", turn);
$("machine").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); turn(); }
});
$("again").addEventListener("click", () => { closeReveal(); turn(); });
$("keep").addEventListener("click", saveKept);
$("overlay").addEventListener("click", (e) => { if (e.target === $("overlay")) closeReveal(); });
$("jarBtn").addEventListener("click", openJar);
$("jarClose").addEventListener("click", () => { $("jar").hidden = true; });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { if (!$("jar").hidden) $("jar").hidden = true; else if (!$("overlay").hidden) closeReveal(); }
});

updateCount();
