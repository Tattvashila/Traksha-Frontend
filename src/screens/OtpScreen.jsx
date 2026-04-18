import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setCurrentUser } from "../state/authStore";
import { TEXT } from "../shared/constants/textSystem";

const BASE_URL = "https://traksha-backend.onrender.com";

export default function OtpScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // 🔐 SAFETY: direct access block
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  const handleVerify = async () => {
    setError("");

    if (!otp) {
      setError(TEXT.errorInvalid);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          otp: Number(otp),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || TEXT.errorInvalid);
        return;
      }

      // ✅ IMPORTANT: SAVE USER
      setCurrentUser({ id: userId });

      // ✅ SUCCESS
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Server error ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2 style={styles.title}>{TEXT.otpTitle}</h2>
        <p style={styles.subtitle}>{TEXT.otpSubtitle}</p>

        {/* 🔥 DEMO INFO */}
        <p style={{ fontSize: "11px", color: "#FFD700" }}>
          Enter OTP: 1234
        </p>

        <input
          style={styles.input}
          type="number"
          placeholder="Enter verification code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} onClick={handleVerify}>
          Verify
        </button>

      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0F0F0F"
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "30px",
    borderRadius: "20px",
    width: "300px",
    textAlign: "center"
  },
  title: { color: "#fff" },
  subtitle: { color: "#aaa", fontSize: "12px", marginBottom: "10px" },
  input: {
    padding: "12px",
    width: "100%",
    borderRadius: "10px",
    border: "none",
    marginBottom: "10px"
  },
  button: {
    padding: "12px",
    width: "100%",
    borderRadius: "10px",
    border: "none",
    background: "#FFD700"
  },
  error: { color: "red", fontSize: "12px" }
};