// =========================
// 🧠 TRAKSHA INSIGHT ENGINE (PASSIVE AI)
// =========================

import { getUserState, getUserScore } from "../../modules/tattvapeetha/TrackerStore";

// =========================
// 🔍 GENERATE INSIGHT
// =========================
export function generateInsight(userId) {
  const state = getUserState(userId);
  const score = getUserScore(userId);

  // 🔥 STATE BASED
  if (state === "DISTRACTED") {
    return "⚠ Aaj distractions zyada hain — mobile usage kam karein.";
  }

  if (state === "LOW_FOCUS") {
    return "🧠 Focus improve karne ke liye 25 min deep session try karein.";
  }

  if (state === "HIGH_PERFORMANCE") {
    return "🔥 Aapka performance excellent hai — isi flow ko maintain rakhein.";
  }

  // 🔥 SCORE BASED
  if (score < 5) {
    return "📉 Aapko discipline aur focus dono improve karna hoga.";
  }

  if (score > 10) {
    return "📈 Aap sahi direction me hain — consistency banaye rakhein.";
  }

  return "✨ Aapka progress stable hai — daily routine maintain rakhein.";
}