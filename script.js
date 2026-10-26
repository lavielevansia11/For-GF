/* ============================================================
   KONFIGURASI — ubah dua baris ini sesuai kalian berdua
   ============================================================ */
const START_DATE = new Date("2026-10-11T00:00:00"); // kapan kalian mulai bersama
const DAY_ONE_LABEL = "17 September 2026";                // tanggal itu, dalam teks cantik

/* ---------- Hitungan hari cinta (berjalan tiap detik) ---------- */
const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

function tick() {
  const diff = Math.max(0, Date.now() - START_DATE.getTime());
  const s = Math.floor(diff / 1000);
  els.days.textContent = Math.floor(s / 86400);
  els.hours.textContent = String(Math.floor(s / 3600) % 24).padStart(2, "0");
  els.minutes.textContent = String(Math.floor(s / 60) % 60).padStart(2, "0");
  els.seconds.textContent = String(s % 60).padStart(2, "0");
}

tick();
setInterval(tick, 1000);

/* ---------- Alasan cinta acak (tanpa pengulangan sampai habis) ---------- */
const REASONS = [
  "Caramu tertawa — tawa yang membuat dunia ikut hangat.",
  "Kesabaranmu saat aku tidak sedang menjadi diriku yang terbaik.",
  "Pesan pagimu, yang selalu datang tepat saat aku membutuhkannya.",
  "Kamu selalu ingat hal-hal kecil yang orang lain lupakan.",
  "Keberanianmu menghadapi hari-hari sulit tanpa mengeluh.",
  "Caramu membuat hal biasa terasa seperti perayaan kecil.",
  "Dukunganmu yang tak pernah minta balasan apa pun.",
  "Aroma pelukanmu yang selalu terasa seperti pulang.",
  "Kamu mendengarkan — benar-benar mendengarkan.",
  "Caramu mempercayaku bahkan saat aku ragu pada diriku sendiri.",
  "Senyummu di akhir hari, hadiah terbaik yang kumiliki.",
  "Kamu membuatku ingin jadi orang yang lebih baik.",
  "Selera humormu yang selalu berhasil menyelamatkan suasana.",
  "Kebaikanmu pada semua orang, tanpa memilih-milih.",
  "Caramu memilihku, lagi dan lagi, tanpa diminta.",
  "Karena bersamamu, diam pun terasa cukup.",
  "Rumah itu bukan tempat — rumah itu ada di dirimu.",
  "Kamu percaya pada mimpi-mimpiku, terkadang lebih dari aku.",
];

const btn = document.getElementById("reason-btn");
const text = document.getElementById("reason-text");
const number = document.getElementById("reason-number");
const card = btn.closest(".reason-card");
const countEl = document.getElementById("reason-count");
document.getElementById("reason-total").textContent = REASONS.length;

let bag = [];
let shown = 0;

function nextReason() {
  if (bag.length === 0) {
    bag = [...REASONS.keys()];
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
  }
  const idx = bag.pop();
  shown = Math.min(shown + 1, REASONS.length);
  number.textContent = `#${idx + 1}`;
  text.textContent = REASONS[idx];
  countEl.textContent = shown;

  card.classList.remove("pop");
  void card.offsetWidth; // restart animasi
  card.classList.add("pop");
}

btn.addEventListener("click", nextReason);
nextReason();

/* ---------- Amplop & surat cinta ---------- */
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter-card");

envelope.addEventListener("click", () => {
  const isOpen = envelope.classList.toggle("open");
  letter.hidden = !isOpen;
  envelope.setAttribute("aria-label", isOpen ? "Tutup surat cinta" : "Buka surat cinta");
  if (isOpen) {
    setTimeout(() => letter.scrollIntoView({ behavior: "smooth", block: "nearest" }), 350);
  }
});

/* ---------- Menu mobile ---------- */
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.textContent = open ? "✕" : "☰";
});

nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.textContent = "☰";
  }
});

/* ---------- Catatan hari pertama (opsional, ditampilkan sekali) ---------- */
console.log(`Halaman ini dimulai dari ${DAY_ONE_LABEL} ♥`);
