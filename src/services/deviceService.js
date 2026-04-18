// =========================
// 📱 DEVICE SERVICE (FINAL)
// =========================

// 🔍 GET DEVICE INFO
export function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language
  };
}

// 🔍 GET DEVICE ID (basic fingerprint)
export function getDeviceId() {
  const base = navigator.userAgent + navigator.platform;

  let hash = 0;

  for (let i = 0; i < base.length; i++) {
    hash = (hash << 5) - hash + base.charCodeAt(i);
    hash |= 0;
  }

  return "DEV_" + Math.abs(hash);
}

// 📍 GET LOCATION (future upgrade ready)
export function getLocation() {
  return {
    lat: 23.25, // temp
    lon: 77.41
  };
}