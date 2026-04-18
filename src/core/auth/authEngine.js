// =========================
// 🧠 TRAKSHA AUTH ENGINE V12 (HYBRID SAFE)
// =========================

import { saveSession } from "./sessionManager";
import { createOtpSession, verifyOtp } from "./otpEngine";
import { calculateRisk } from "../decision/riskEngine";
import { getDeviceId, getLocation } from "../../services/deviceService";
import { setCurrentUser } from "../../state/authStore";

// 🔐 SESSION GENERATOR
function createSession() {
  return "SESSION_" + Math.random().toString(36).substring(2);
}

// 🔐 TEMP USER DB (UPDATED)
const users = [
  {
    id: "TRK-26-IN-27A8B9DX-45",
    password: "Strong@123",

    phone: "9999999999",
    email: "demo@traksha.com",

    aadhaarVerified: true,
    faceVerified: true,

    trustedDevices: [],
    safeLocations: [],

    // 🔥 NEW (HYBRID INTELLIGENCE)
    trustScore: 80,
    loginHistory: [],
    otpResendCount: 0,

    failedAttempts: 0,
    lockUntil: 0,

    pendingOTP: null,
    otpExpiry: null,
    otpAttempts: 0
  }
];

// =========================
// 🔍 GET USER
// =========================
function getUser(userId) {
  return users.find(u => u.id === userId) || null;
}

// =========================
// 🔐 LOGIN ENGINE
// =========================
export function loginEngine(userId, password) {
  const user = getUser(userId);

  if (!user) {
    return { success: false, message: "Unable to find account" };
  }

  // 🔐 VERIFY BASE IDENTITY
  if (!user.aadhaarVerified || !user.faceVerified) {
    return {
      success: false,
      message: "Identity verification incomplete"
    };
  }

  // 🔄 AUTO UNLOCK
  if (user.lockUntil && Date.now() > user.lockUntil) {
    user.lockUntil = 0;
    user.failedAttempts = 0;
  }

  // 🔒 LOCK CHECK
  if (Date.now() < user.lockUntil) {
    return {
      success: false,
      status: "BLOCKED",
      message: "Access temporarily restricted"
    };
  }

  // ❌ WRONG PASSWORD
  if (password !== user.password) {
    user.failedAttempts++;

    const a = user.failedAttempts;

    // 🔥 HYBRID LOCK SYSTEM
    if (a === 3) user.lockUntil = Date.now() + 120000;
    if (a === 6) user.lockUntil = Date.now() + 600000;
    if (a === 8) user.lockUntil = Date.now() + 1800000;
    if (a === 10) user.lockUntil = Date.now() + 3600000;

    // 🚨 12th attempt (CRITICAL)
    if (a === 12) {
      user.lockUntil = Date.now() + 43200000; // 12 hours

      // 🔐 FORCE OTP (SAFE - NO OVERWRITE)
      let otp = user.pendingOTP;

      if (!otp) {
        otp = createOtpSession(user);
      }

      user.trustScore = Math.max(0, user.trustScore - 20);

      return {
        success: false,
        status: "HIGH_SECURITY_BLOCK",
        message: "Account locked. Verification required.",
        otp
      };
    }

    return {
      success: false,
      message: "Incorrect credentials"
    };
  }

  // ✅ RESET FAIL COUNT
  user.failedAttempts = 0;

  const deviceId = getDeviceId();
  const location = getLocation();

  const riskLevel = calculateRisk(user, deviceId, location);

  // 🔐 OTP REQUIRED (SAFE - NO OVERWRITE)
  if (riskLevel === "HIGH" || riskLevel === "MEDIUM") {
    let otp = user.pendingOTP;

    if (!otp) {
      otp = createOtpSession(user);
    }

    user.trustScore = Math.max(0, user.trustScore - 5);

    return {
      success: false,
      status: "OTP_REQUIRED",
      otp
    };
  }

  return completeLogin(user, deviceId, location);
}

// =========================
// 🔐 VERIFY OTP
// =========================
export function verifyOTP(userId, inputOtp) {
  const user = getUser(userId);

  if (!user) {
    return { success: false, message: "Unable to find account" };
  }

  const result = verifyOtp(user, inputOtp);

  if (!result.success) {
    return result;
  }

  const deviceId = getDeviceId();
  const location = getLocation();

  return completeLogin(user, deviceId, location);
}

// =========================
// 🔐 FINAL LOGIN PROCESS
// =========================
function completeLogin(user, deviceId, location) {

  // 🔐 TRUST DEVICE
  if (!user.trustedDevices.includes(deviceId)) {
    user.trustedDevices.push(deviceId);
  }

  // 📍 SAFE LOCATION SAVE
  const isSafe = user.safeLocations.some(
    loc =>
      Math.abs(loc.lat - location.lat) < 0.05 &&
      Math.abs(loc.lon - location.lon) < 0.05
  );

  if (!isSafe && user.safeLocations.length < 3) {
    user.safeLocations.push(location);
  }

  // 🧠 TRUST SCORE BOOST
  user.trustScore = Math.min(100, user.trustScore + 2);

  // 📊 LOGIN HISTORY (LAST 10)
  user.loginHistory.push({
    deviceId,
    location,
    time: Date.now()
  });

  if (user.loginHistory.length > 10) {
    user.loginHistory.shift();
  }

  const session = createSession();
  saveSession(user.id, session);

  const userData = {
    id: user.id,
    phone: user.phone,
    email: user.email,
    aadhaarVerified: user.aadhaarVerified,
    faceVerified: user.faceVerified,
    trustScore: user.trustScore
  };

  setCurrentUser(userData);

  return {
    success: true,
    session
  };
}