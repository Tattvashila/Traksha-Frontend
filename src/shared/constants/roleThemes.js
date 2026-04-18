// =========================
// 🧠 ROLE BASED UI THEMES
// =========================

import { colors } from "./uiStyles";

export const roleThemes = {

  SHISHYA: {
    bg: colors.bg,
    card: colors.card,
    accent: colors.saffronSoft,
    text: colors.text,
    mood: "calm"
  },

  GURU: {
    bg: "#FFF3E0",
    card: "#FFFFFF",
    accent: "#E65100", // deeper saffron
    text: "#2E2E2E",
    mood: "authority"
  },

  PARENT: {
    bg: "#FFF8F0",
    card: "#FFFFFF",
    accent: "#FF9800",
    text: "#2E2E2E",
    mood: "trust"
  }
};