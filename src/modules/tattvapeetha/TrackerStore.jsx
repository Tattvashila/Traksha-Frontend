// =========================
// 🧠 TRAKSHA TRACKER STORE (REAL BACKEND SYNC)
// =========================

const BASE_URL = "https://traksha-backend.onrender.com";

const tracker = {};

// =========================
// 📥 LOAD FROM BACKEND
// =========================
export async function loadUserStats(userId) {
  if (!userId) return null;

  try {
    const res = await fetch(`${BASE_URL}/api/stats/${userId}`);
    const data = await res.json();

    tracker[userId] = {
      study: data.study || 0,
      focus: data.focus || 0,
      distraction: data.distraction || 0,
      lastUpdated: Date.now()
    };

    return tracker[userId];

  } catch (err) {
    console.error("Load error:", err);
    return null;
  }
}

// =========================
// ➕ ADD ACTIVITY (🔥 NOW SYNCED)
// =========================
export async function addActivity(userId, type, value = 1) {
  if (!userId || !type) return;

  // LOCAL UPDATE (FAST UI)
  if (!tracker[userId]) {
    tracker[userId] = {
      study: 0,
      focus: 0,
      distraction: 0,
      lastUpdated: Date.now()
    };
  }

  if (!(type in tracker[userId])) return;

  tracker[userId][type] += value;
  tracker[userId].lastUpdated = Date.now();

  // 🔥 BACKEND SYNC
  try {
    await fetch(`${BASE_URL}/api/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        [type]: value
      })
    });
  } catch (err) {
    console.error("Sync error:", err);
  }
}

// =========================
// 📊 GET USER STATS
// =========================
export function getUserStats(userId) {
  if (!userId) {
    return {
      study: 0,
      focus: 0,
      distraction: 0,
      lastUpdated: null
    };
  }

  if (!tracker[userId]) {
    tracker[userId] = {
      study: 0,
      focus: 0,
      distraction: 0,
      lastUpdated: Date.now()
    };
  }

  return tracker[userId];
}

// =========================
// 📈 SCORE
// =========================
export function getUserScore(userId) {
  const stats = getUserStats(userId);

  return Math.max(
    0,
    stats.study * 2 +
    stats.focus * 3 -
    stats.distraction * 2
  );
}

// =========================
// 🧠 STATE ENGINE
// =========================
export function getUserState(userId) {
  const stats = getUserStats(userId);

  if (stats.distraction > stats.focus) return "DISTRACTED";
  if (stats.focus < 2) return "LOW_FOCUS";
  if (stats.study >= 3 && stats.focus >= 3) return "HIGH";
  return "NORMAL";
}