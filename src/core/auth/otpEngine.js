// =========================
// 🔐 TRAKSHA OTP ENGINE (FINAL V3 HYBRID)
// =========================

// 🔥 GENERATE OTP
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// =========================
// 🔍 CREATE OTP SESSION
// =========================
export function createOtpSession(user) {

  // ❌ PREVENT OVERWRITE (NEW)
  if (user.pendingOTP && Date.now() < user.otpExpiry) {
    return user.pendingOTP;
  }

  const otp = generateOTP();

  user.pendingOTP = otp;
  user.otpExpiry = Date.now() + 2 * 60 * 1000; // 2 min
  user.otpAttempts = 0;

  // 🔥 NEW
  user.otpResendCount = 0;

  return otp;
}

// =========================
// 🔁 RESEND OTP (NEW)
// =========================
export function resendOtp(user) {

  if (!user.pendingOTP) {
    return {
      success: false,
      message: "No active OTP"
    };
  }

  // ⛔ LIMIT (MAX 2)
  if (user.otpResendCount >= 2) {
    return {
      success: false,
      message: "Resend limit reached"
    };
  }

  const otp = generateOTP();

  user.pendingOTP = otp;
  user.otpExpiry = Date.now() + 2 * 60 * 1000;
  user.otpResendCount++;

  return {
    success: true,
    otp
  };
}

// =========================
// 🔐 VERIFY OTP
// =========================
export function verifyOtp(user, inputOtp) {
  // ❌ SAFETY CHECK
  if (!user || !user.pendingOTP) {
    return {
      success: false,
      message: "No OTP pending"
    };
  }

  // ⏳ EXPIRY CHECK
  if (Date.now() > user.otpExpiry) {
    clearOtp(user);
    return {
      success: false,
      message: "OTP expired"
    };
  }

  // ❌ WRONG OTP
  if (Number(inputOtp) !== Number(user.pendingOTP)) {
    user.otpAttempts++;

    // 🔒 HARD BLOCK
    if (user.otpAttempts >= 2) {
      user.lockUntil = Date.now() + 5 * 60 * 1000; // 5 min
      clearOtp(user);

      return {
        success: false,
        status: "BLOCKED",
        message: "Too many failed attempts"
      };
    }

    return {
      success: false,
      message: "Incorrect OTP"
    };
  }

  // =========================
  // ✅ SUCCESS
  // =========================
  clearOtp(user);

  return {
    success: true
  };
}

// =========================
// 🧹 CLEAR OTP (INTERNAL)
// =========================
function clearOtp(user) {
  user.pendingOTP = null;
  user.otpExpiry = null;
  user.otpAttempts = 0;

  // 🔥 NEW RESET
  user.otpResendCount = 0;
}