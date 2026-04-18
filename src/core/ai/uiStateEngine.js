// =========================
// 🧠 TRAKSHA GOD MODE UI ENGINE (SAFE)
// =========================

import { getUserState, getUserScore } from "../../modules/tattvapeetha/TrackerStore";

// =========================
// 🎨 UI STATE GENERATOR
// =========================
export function getUIState(userId) {
  if (!userId) {
    return defaultState();
  }

  const state = getUserState(userId);
  const score = getUserScore(userId);

  // =========================
  // 🔥 HIGH PERFORMANCE
  // =========================
  if (state === "HIGH_PERFORMANCE" || score > 12) {
    return {
      mode: "HIGH",
      bg: "#FFF8E1",
      accent: "#FFD166",
      text: "#2E2E2E",
      energy: "high",
      message: "🔥 You're in peak flow"
    };
  }

  // =========================
  // ⚠ DISTRACTED
  // =========================
  if (state === "DISTRACTED") {
    return {
      mode: "DISTRACTED",
      bg: "#FFF3E0",
      accent: "#FF9800",
      text: "#2E2E2E",
      energy: "low",
      message: "⚠ Focus wapas lana zaruri hai"
    };
  }

  // =========================
  // 🧘 LOW FOCUS
  // =========================
  if (state === "LOW_FOCUS") {
    return {
      mode: "CALM",
      bg: "#FFFDF8",
      accent: "#FFE0B2",
      text: "#2E2E2E",
      energy: "calm",
      message: "🧘 Slow down & refocus"
    };
  }

  // =========================
  // ⚖ NORMAL
  // =========================
  return defaultState();
}

// =========================
// 🔹 DEFAULT
// =========================
function defaultState() {
  return {
    mode: "NORMAL",
    bg: "#FFF7E8",
    accent: "#FF8C42",
    text: "#2E2E2E",
    energy: "balanced",
    message: "✨ Keep moving forward"
  };
}