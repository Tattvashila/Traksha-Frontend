// =========================
// 🧠 TRAKSHA ID RESOLVER V3.1 (FINAL LOCK)
// =========================

// =========================
// 🔐 CHECKSUM
// =========================
function generateChecksum(str) {
  let sum = 0;

  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return (sum % 97).toString().padStart(2, "0");
}

// =========================
// 🔐 GENERATE UNIQUE (FIXED PATTERN)
// Pattern: DD L D L D LL → 27A8B9DX
// =========================
function generateUnique() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let unique = "";

  // DD
  for (let i = 0; i < 2; i++) {
    unique += numbers[Math.floor(Math.random() * numbers.length)];
  }

  // L
  unique += letters[Math.floor(Math.random() * letters.length)];

  // D
  unique += numbers[Math.floor(Math.random() * numbers.length)];

  // L
  unique += letters[Math.floor(Math.random() * letters.length)];

  // D
  unique += numbers[Math.floor(Math.random() * numbers.length)];

  // LL
  for (let i = 0; i < 2; i++) {
    unique += letters[Math.floor(Math.random() * letters.length)];
  }

  return unique;
}

// =========================
// 🔐 GENERATE TRK ID
// =========================
export function generateTrakshaId(region = "IN") {
  const year = new Date().getFullYear().toString().slice(-2);

  const unique = generateUnique();

  const base = `TRK-${year}-${region}-${unique}`;
  const checksum = generateChecksum(base);

  return `${base}-${checksum}`;
}

// =========================
// 🔍 VALIDATE TRK ID
// =========================
export function isValidTrakshaId(id) {
  if (!id || typeof id !== "string") return false;

  const clean = id.trim().toUpperCase();

  const pattern = /^TRK-\d{2}-[A-Z]{2}-\d{2}[A-Z]\d[A-Z]\d[A-Z]{2}-\d{2}$/;

  if (!pattern.test(clean)) return false;

  const parts = clean.split("-");
  const base = parts.slice(0, 4).join("-");
  const checksum = parts[4];

  return generateChecksum(base) === checksum;
}

// =========================
// 🔄 NORMALIZE INPUT
// =========================
export function normalizeTrakshaId(input) {
  if (!input) return null;

  const clean = input.toUpperCase().trim();

  return isValidTrakshaId(clean) ? clean : null;
}

// =========================
// 🧠 PARSE ID
// =========================
export function parseTrakshaId(id) {
  if (!isValidTrakshaId(id)) return null;

  const [prefix, year, region, unique, checksum] = id.split("-");

  return {
    prefix,
    year,
    region,
    unique,
    checksum
  };
}