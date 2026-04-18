// =========================
// 🧠 TRAKSHA HABIT ENGINE
// =========================

import { getUserStats } from "../../modules/tattvapeetha/TrackerStore";

// 🔐 IN-MEMORY (frontend phase)
const streakStore = {};

// =========================
// 🔥 UPDATE STREAK
// =========================
export function updateStreak(userId) {
  if (!userId) return;

  const today = new Date().toDateString();

  if (!streakStore[userId]) {
    streakStore[userId] = {
      streak: 1,
      lastDate: today
    };
    return;
  }

  const last = streakStore[userId].lastDate;

  if (last === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (new Date(last).toDateString() === yesterday.toDateString()) {
    streakStore[userId].streak += 1;
  } else {
    streakStore[userId].streak = 1;
  }

  streakStore[userId].lastDate = today;
}

// =========================
// 📊 GET STREAK
// =========================
export function getStreak(userId) {
  return streakStore[userId]?.streak || 0;
}