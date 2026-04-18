// =========================
// 🧠 TRAKSHA PARENT SYSTEM V1
// =========================

// 🔐 Dummy student data (future backend)
const studentData = {
  name: "Student",
  learning: 75,
  discipline: 60,
  focus: 55,
  emotional: 70,
  consistency: 65,
  lastWeekActivity: [
    { type: "study", value: 3 },
    { type: "distraction", value: 2 },
    { type: "focus", value: 4 }
  ]
};

// =========================
// 📊 ANALYSIS ENGINE
// =========================
function analyzeStudent(data) {
  let score =
    data.learning +
    data.discipline +
    data.focus +
    data.emotional +
    data.consistency;

  let avg = score / 5;

  let status = "GOOD";

  if (avg < 50) status = "CRITICAL";
  else if (avg < 65) status = "WARNING";

  return {
    avg,
    status
  };
}

// =========================
// 🧠 PATTERN DETECTION
// =========================
function detectPattern(data) {
  let distractionCount = data.lastWeekActivity.filter(
    a => a.type === "distraction"
  ).length;

  if (distractionCount >= 3) {
    return "High Distraction Detected";
  }

  if (data.focus < 50) {
    return "Low Focus";
  }

  return "Stable";
}

// =========================
// 🧠 RECOMMENDATION ENGINE
// =========================
function generateAdvice(data) {
  let advice = [];

  if (data.focus < 60) {
    advice.push("Improve focus time");
  }

  if (data.discipline < 60) {
    advice.push("Needs better routine");
  }

  if (data.learning < 70) {
    advice.push("Concept clarity required");
  }

  return advice;
}

// =========================
// 🔥 WEEKLY REPORT GENERATOR
// =========================
export function generateWeeklyReport() {
  const analysis = analyzeStudent(studentData);
  const pattern = detectPattern(studentData);
  const advice = generateAdvice(studentData);

  return {
    studentName: studentData.name,
    score: analysis.avg.toFixed(1),
    status: analysis.status,
    pattern,
    advice
  };
}