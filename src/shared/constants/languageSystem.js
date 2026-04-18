// =========================
// 🌐 TRAKSHA LANGUAGE SYSTEM
// =========================

export const LANG = {
  EN: "en",
  HI: "hi"
};

// 🔥 UI TEXT ONLY
export const TEXT = {
  trackingTitle: {
    en: "Daily Tracking",
    hi: "दैनिक अनुशीलन"
  },

  save: {
    en: "Save",
    hi: "सहेजें"
  },

  dashboard: {
    en: "Dashboard",
    hi: "डैशबोर्ड"
  }
};

// =========================
// 🔐 GET TEXT
// =========================
export function getText(key, lang) {
  return TEXT[key]?.[lang] || TEXT[key]?.en || key;
}