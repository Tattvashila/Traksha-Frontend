// =========================
// 🔐 TRAKSHA SESSION MANAGER (FINAL V3)
// =========================

import { setCurrentUser, clearUser } from "../../state/authStore";

// =========================
// 💾 SAVE SESSION
// =========================
export function saveSession(userId, session) {
  localStorage.setItem("TRK_USER_ID", userId);
  localStorage.setItem("TRK_SESSION", session);
  localStorage.setItem("TRK_LOGIN_TIME", Date.now());
}

// =========================
// 🔍 GET SESSION
// =========================
export function getSession() {
  return {
    userId: localStorage.getItem("TRK_USER_ID"),
    session: localStorage.getItem("TRK_SESSION"),
    loginTime: localStorage.getItem("TRK_LOGIN_TIME")
  };
}

// =========================
// 🔐 CHECK AUTH
// =========================
export function isAuthenticated() {
  const session = localStorage.getItem("TRK_SESSION");
  return !!session;
}

// =========================
// 🔄 RESTORE SESSION (CRITICAL)
// =========================
export function restoreSession() {
  const userId = localStorage.getItem("TRK_USER_ID");
  const session = localStorage.getItem("TRK_SESSION");

  if (!userId || !session) return false;

  // 🧠 SET USER BACK TO GLOBAL STATE
  setCurrentUser({
    id: userId
  });

  return true;
}

// =========================
// ❌ LOGOUT
// =========================
export function logout() {
  localStorage.removeItem("TRK_USER_ID");
  localStorage.removeItem("TRK_SESSION");
  localStorage.removeItem("TRK_LOGIN_TIME");

  // 🧠 CLEAR GLOBAL USER
  clearUser();
}

// =========================
// ⏳ VALIDATE SESSION
// =========================
export function validateSession() {
  const loginTime = localStorage.getItem("TRK_LOGIN_TIME");

  if (!loginTime) return false;

  const now = Date.now();
  const isValid = now - loginTime < 24 * 60 * 60 * 1000;

  if (!isValid) {
    logout();
    return false;
  }

  return true;
}