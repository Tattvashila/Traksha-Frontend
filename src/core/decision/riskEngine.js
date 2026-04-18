// =========================
// 🧠 TRAKSHA RISK ENGINE (FINAL)
// =========================

// 📏 DISTANCE CALCULATION
function getDistance(lat1, lon1, lat2, lon2) {
  return Math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2) * 111;
}

// =========================
// 🧠 CALCULATE RISK
// =========================
export function calculateRisk(user, deviceId, location) {
  let risk = 0;

  // 🔐 DEVICE CHECK
  const trustedDevice = user.trustedDevices.includes(deviceId);

  if (!trustedDevice) {
    risk += 30;
  }

  // 📍 LOCATION CHECK
  const isSafeLocation = user.safeLocations.some(
    loc => getDistance(location.lat, location.lon, loc.lat, loc.lon) <= 5
  );

  if (!isSafeLocation) {
    risk += 30;
  }

  // 🧠 FUTURE (placeholder)
  // if abnormal behavior → +40

  // =========================
  // 🎯 FINAL RESULT
  // =========================
  if (risk >= 60) return "HIGH";
  if (risk >= 30) return "MEDIUM";

  return "LOW";
}