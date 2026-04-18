// =========================
// 🧠 TRAKSHA SIGNUP ENGINE V2 (CONNECTED)
// =========================

import { generateTrakshaId } from "./idResolver";
import { addUser, isDuplicate } from "./userStore"; // ✅ CONNECTED

// =========================
// 🔐 FAKE HASH (FRONTEND PHASE)
// =========================
function hashAadhaar(aadhaar) {
  let hash = 0;

  for (let i = 0; i < aadhaar.length; i++) {
    hash += aadhaar.charCodeAt(i);
  }

  return "AADH_" + hash;
}

// =========================
// 🔐 SIGNUP ENGINE
// =========================
export function signupEngine({
  phone,
  email,
  password,
  aadhaar,
  faceVerified
}) {
  // ❌ BASIC VALIDATION
  if (!phone || !email || !password || !aadhaar) {
    return {
      success: false,
      message: "All fields are required"
    };
  }

  // 🔐 HASH AADHAAR
  const aadhaarHash = hashAadhaar(aadhaar);

  // ❌ DUPLICATE CHECK (GLOBAL STORE)
  if (isDuplicate({ phone, email, aadhaarHash })) {
    return {
      success: false,
      message: "User already exists"
    };
  }

  // ❌ FACE VERIFICATION
  if (!faceVerified) {
    return {
      success: false,
      message: "Face verification required"
    };
  }

  // =========================
  // ✅ CREATE USER
  // =========================

  const newUser = {
    id: generateTrakshaId("IN"), // 🔥 FINAL ID SYSTEM

    phone,
    email,
    password,

    aadhaarHash,
    aadhaarVerified: true,
    faceVerified: true,

    trustedDevices: [],
    safeLocations: [],

    failedAttempts: 0,
    lockUntil: 0,

    pendingOTP: null,
    otpExpiry: null,
    otpAttempts: 0
  };

  // 💾 SAVE USER (GLOBAL STORE)
  addUser(newUser); // ✅ FIXED

  return {
    success: true,
    userId: newUser.id
  };
}