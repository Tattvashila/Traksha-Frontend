// =========================
// 🧠 TRAKSHA CONNECT ENGINE V2 (INTELLIGENCE)
// =========================

import { getUserScore, getUserState } from "../../modules/tattvapeetha/TrackerStore";

// 🔥 MAIN FUNCTION
export function processStudentActivity(userId, mode, stats) {

  if (!userId || !stats) {
    return {
      report: null
    };
  }

  // =========================
  // 📊 SCORE (UPGRADED SOURCE)
  // =========================
  const score = getUserScore(userId);

  // =========================
  // 🧠 STATE (NEW INTELLIGENCE)
  // =========================
  const state = getUserState(userId);

  // =========================
  // 🧠 STATUS (SMART)
  // =========================
  let status = "Stable";

  if (state === "HIGH_PERFORMANCE") status = "Excellent";
  else if (state === "NORMAL") status = "Good";
  else if (state === "LOW_FOCUS") status = "Needs Improvement";
  else if (state === "DISTRACTED") status = "Critical";

  // =========================
  // 🔍 PATTERN DETECTION (SMART)
  // =========================
  let pattern = "Balanced";

  if (state === "DISTRACTED") {
    pattern = "Distraction Dominant";
  } else if (state === "HIGH_PERFORMANCE") {
    pattern = "Focused Growth";
  } else if (stats.study < 2) {
    pattern = "Low Study Pattern";
  }

  // =========================
  // 🧠 ADVICE SYSTEM (UPGRADED)
  // =========================
  const advice = [];

  if (state === "LOW_FOCUS") {
    advice.push("Focus improve karne ke liye 25 min deep work sessions follow karein.");
  }

  if (state === "DISTRACTED") {
    advice.push("Distractions ko control karna zaruri hai — mobile usage limit karein.");
  }

  if (stats.study < 2) {
    advice.push("Daily study routine develop karein — chhote steps se shuru karein.");
  }

  if (state === "HIGH_PERFORMANCE") {
    advice.push("Student excellent kar raha hai — consistency maintain karein.");
  }

  if (advice.length === 0) {
    advice.push("Student stable hai — discipline maintain rakhein.");
  }

  // =========================
  // 📊 FINAL REPORT
  // =========================
  return {
    report: {
      score: Math.max(0, score),
      status,
      state, // 🔥 NEW FIELD
      pattern,
      advice
    }
  };
}