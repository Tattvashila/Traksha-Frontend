// =========================
// 🔔 TRAKSHA NOTIFICATION ENGINE
// =========================

import { getUserState } from "../../modules/tattvapeetha/TrackerStore";

export function getDailyNotification(userId) {
  const state = getUserState(userId);

  if (state === "DISTRACTED") {
    return "⚠ Aaj distraction kam karo — ek focused session lo";
  }

  if (state === "LOW_FOCUS") {
    return "🧠 Focus badhane ka samay — 25 min deep work";
  }

  if (state === "HIGH_PERFORMANCE") {
    return "🔥 Aapka flow strong hai — ise break mat hone do";
  }

  return "✨ Aaj ka din productive bana sakte ho";
}