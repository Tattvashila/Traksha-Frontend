// =========================
// 🔐 TRAKSHA AUTH STORE V2 (FINAL LOCK)
// =========================

// 🧠 GLOBAL USER STATE
let currentUser = null;

// =========================
// 🔍 GET CURRENT USER
// =========================
export function getCurrentUser() {
  return currentUser;
}

// =========================
// 🔐 SET CURRENT USER
// =========================
export function setCurrentUser(userData) {
  if (!userData || !userData.id) return;

  currentUser = userData;

  // 💾 SAVE (PERSISTENT)
  localStorage.setItem("TRAKSHA_USER", JSON.stringify(userData));
}

// =========================
// 🔄 RESTORE SESSION
// =========================
export function restoreUser() {
  try {
    const data = localStorage.getItem("TRAKSHA_USER");

    if (!data) return null;

    const parsed = JSON.parse(data);

    // 🔐 VALIDATION
    if (!parsed?.id) return null;

    currentUser = parsed;
    return currentUser;

  } catch (err) {
    return null;
  }
}

// =========================
// ❌ CLEAR USER (LOGOUT)
// =========================
export function clearUser() {
  currentUser = null;

  localStorage.removeItem("TRAKSHA_USER");
  localStorage.removeItem("traksha_user");
  localStorage.removeItem("traksha_session");
  localStorage.removeItem("traksha_login_time");
}

// =========================
// 🔐 IS AUTHENTICATED
// =========================
export function isAuthenticated() {
  return !!getUserId();
}

// =========================
// 🧠 GET USER ID (PRIMARY FIXED)
// =========================
export function getUserId() {
  // 🔥 MEMORY CHECK
  if (currentUser?.id) return currentUser.id;

  // 🔥 LOCAL STORAGE FALLBACK
  try {
    const data = localStorage.getItem("TRAKSHA_USER");
    if (!data) return null;

    const parsed = JSON.parse(data);

    if (parsed?.id) {
      currentUser = parsed; // 🔁 restore in memory
      return parsed.id;
    }

  } catch (err) {}

  return null;
}

// =========================
// 🔄 INIT STORE (IMPORTANT)
// =========================
export function initAuthStore() {
  return restoreUser();
}