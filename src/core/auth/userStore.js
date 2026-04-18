// =========================
// 🧠 TRAKSHA USER STORE (GLOBAL DB)
// =========================

const users = [];

// ➕ ADD USER
export function addUser(user) {
  users.push(user);
}

// 🔍 GET USER BY ID
export function getUserById(userId) {
  return users.find(u => u.id === userId) || null;
}

// 🔍 GET ALL USERS (DEBUG)
export function getAllUsers() {
  return users;
}

// 🔍 DUPLICATE CHECK
export function isDuplicate({ phone, email, aadhaarHash }) {
  return users.some(
    u =>
      u.phone === phone ||
      u.email === email ||
      u.aadhaarHash === aadhaarHash
  );
}