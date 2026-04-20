// =========================
// 🧠 TRAKSHA AI ENGINE V2 (ADVANCED)
// =========================

// 🔥 LOCAL STORAGE KEY
const STORAGE_KEY = "traksha_ai_memory";

// =========================
// 🧠 LOAD MEMORY
// =========================
function loadMemory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

// =========================
// 💾 SAVE MEMORY
// =========================
function saveMemory(mem) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mem));
}

// GLOBAL MEMORY
let userMemory = loadMemory();

// =========================
// 🧠 GET USER MEMORY
// =========================
function getMemory(userId) {
  if (!userId) return null;

  if (!userMemory[userId]) {
    userMemory[userId] = {
      history: [],
      lastEmotion: "CALM",
      intensity: "LOW",
      lastActive: Date.now()
    };
  }

  return userMemory[userId];
}

// =========================
// 📊 UPDATE BEHAVIOR
// =========================
export function updateBehavior(userId, data) {
  const mem = getMemory(userId);
  if (!mem) return;

  mem.history.push({
    focus: data.focus || 0,
    distraction: data.distraction || 0,
    activity: data.activity || 0,
    time: Date.now()
  });

  mem.lastActive = Date.now();

  // keep last 30 records
  if (mem.history.length > 30) {
    mem.history.shift();
  }

  saveMemory(userMemory);
}

// =========================
// 🧠 EMOTION ENGINE (UPGRADED)
// =========================
function detectEmotion(mem) {
  const recent = mem.history.slice(-5);

  if (recent.length === 0) {
    return { emotion: "CALM", intensity: "LOW" };
  }

  let focus = 0;
  let distraction = 0;
  let activity = 0;

  recent.forEach(d => {
    focus += d.focus;
    distraction += d.distraction;
    activity += d.activity;
  });

  // 🧠 INTENSITY CALCULATION
  let intensity = "LOW";

  if (distraction > focus * 2) intensity = "HIGH";
  else if (distraction > focus) intensity = "MEDIUM";

  // 🔥 EMOTION RULES
  if (Date.now() - mem.lastActive > 1000 * 60 * 60) {
    return { emotion: "INACTIVE", intensity: "LOW" };
  }

  if (distraction > focus * 1.5) {
    return { emotion: "DISTRACTED", intensity };
  }

  if (focus > distraction * 1.5) {
    return { emotion: "HIGH", intensity: "HIGH" };
  }

  return { emotion: "CALM", intensity: "LOW" };
}

// =========================
// 🧠 AI OUTPUT
// =========================
export function getAIState(userId) {
  const mem = getMemory(userId);
  if (!mem) return null;

  const { emotion, intensity } = detectEmotion(mem);

  mem.lastEmotion = emotion;
  mem.intensity = intensity;

  let message = "";
  let uiMode = "CALM";
  let uiTone = "SOFT";

  switch (emotion) {
    case "DISTRACTED":
      message =
        intensity === "HIGH"
          ? "Mann adhik bhatak raha hai. Turant dhyaan sthir karo."
          : "Dhyaan toot raha hai. Saans par focus lao.";
      uiMode = "DISTRACTED";
      uiTone = "ALERT";
      break;

    case "HIGH":
      message = "Tum uchch stithi me ho. Is flow ko banaye rakho.";
      uiMode = "HIGH";
      uiTone = "ENERGETIC";
      break;

    case "INACTIVE":
      message = "Kriya ruk gayi hai. Chhota kadam uthao.";
      uiMode = "CALM";
      uiTone = "MOTIVATE";
      break;

    default:
      message = "Sthir raho. Pragati chal rahi hai.";
      uiMode = "CALM";
      uiTone = "SOFT";
  }

  saveMemory(userMemory);

  return {
    emotion,
    intensity,
    message,
    uiMode,
    uiTone
  };
}

// =========================
// 🔌 HOOK STYLE USE
// =========================
export function useTrakshaAI(userId) {
  return getAIState(userId);
}