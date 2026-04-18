// =========================
// 🧠 TRAKSHA ACTIVITY TRACKER V1
// =========================

// 🔐 In-memory store (future backend)
let activityStore = {};

// =========================
// 🆕 INIT STUDENT
// =========================
export function initStudentTracker(studentId) {
  if (!activityStore[studentId]) {
    activityStore[studentId] = [];
  }
}

// =========================
// ➕ ADD ACTIVITY
// =========================
export function addActivity(studentId, type, value) {
  if (!activityStore[studentId]) {
    initStudentTracker(studentId);
  }

  activityStore[studentId].push({
    type,          // study / distraction / focus / emotion
    value,         // intensity or count
    timestamp: Date.now()
  });
}

// =========================
// 📅 GET WEEKLY DATA
// =========================
export function getWeeklyData(studentId) {
  const data = activityStore[studentId] || [];

  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  return data.filter(d => d.timestamp >= oneWeekAgo);
}

// =========================
// 📊 SUMMARIZE DATA
// =========================
export function summarizeWeekly(studentId) {
  const weekly = getWeeklyData(studentId);

  let summary = {
    study: 0,
    distraction: 0,
    focus: 0,
    emotion: 0
  };

  weekly.forEach(item => {
    if (summary[item.type] !== undefined) {
      summary[item.type] += item.value;
    }
  });

  return summary;
}

// =========================
// 🧪 DEBUG VIEW
// =========================
export function getAllActivity(studentId) {
  return activityStore[studentId] || [];
}