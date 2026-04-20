import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../state/authStore";
import logo from "../assets/traksha-logo.png";
import { TEXT } from "../shared/constants/textSystem";
import { getAdaptiveTheme } from "../core/ui/adaptiveTheme";

const BASE_URL = "https://traksha-backend-production.up.railway.app";

export default function LoginScreen() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = getAdaptiveTheme({
    state: "CALM",
    role: "SHISHYA"
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!userId || !password) {
      setError(TEXT.errorInvalid);
      return;
    }

    try {
      setLoading(true);

      const finalId = userId.toUpperCase().trim();

      const res = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: finalId, password })
      });

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!data.success) {
        setError(data.message || TEXT.errorInvalid);
        setLoading(false);
        return;
      }

      if (data.status === "OTP_REQUIRED") {
        navigate("/otp", { state: { userId: finalId } });
        return;
      }

      setCurrentUser({ id: finalId });
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("⏳ Server starting... try again");
    }

    setLoading(false);
  };

  return (
    <div style={{ ...styles.container, background: theme.background }}>

      <div style={styles.card}>

        <img src={logo} alt="traksha" style={styles.logo} />

        <h2 style={styles.title}>Traksha</h2>

        <p style={styles.subtitle}>{TEXT.loginSubtitle}</p>

        <p style={styles.tagline}>
          प्रवेश करें एक ऐसे संसार में जहाँ अनुशासन ही स्वतंत्रता है
        </p>

        <form onSubmit={handleLogin} style={styles.form}>

          <input
            style={styles.input}
            placeholder="TRK-26-IN-XXXXXXX-CC"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={styles.error}>{error}</p>}

          {/* 🔥 LOGIN BUTTON */}
          <button
            type="submit"
            style={{
              ...styles.button,
              boxShadow: theme.ctaShadow,
              opacity: loading ? 0.7 : 1
            }}
            disabled={loading}
          >
            {loading ? "Please wait..." : "Continue"}
          </button>

          {/* 🔥 SIGNUP LINK */}
          <p
            style={styles.signup}
            onClick={() => navigate("/signup")}
          >
            New here? Create Account
          </p>

        </form>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "clamp(12px, 4vw, 40px)",
    background: `
      radial-gradient(circle at top, #FFF3E0, #FFE0B2, #FFD180)
    `
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "clamp(20px, 4vw, 32px)",
    borderRadius: "24px",
    textAlign: "center",
    background: "rgba(255,255,255,0.65)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,140,66,0.3)",
    boxShadow: "0 20px 40px rgba(255,140,66,0.2)"
  },

  logo: {
    width: "clamp(50px, 12vw, 70px)",
    marginBottom: "12px",
    filter: "drop-shadow(0 0 12px rgba(255,140,66,0.5))"
  },

  title: {
    fontSize: "clamp(22px, 5vw, 28px)",
    marginBottom: "4px",
    background: "linear-gradient(135deg, #FF8C42, #FFD166)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },

  subtitle: {
    color: "#555",
    fontSize: "clamp(12px, 2.5vw, 14px)"
  },

  tagline: {
    fontSize: "12px",
    color: "#a66b00",
    marginBottom: "10px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "10px"
  },

  input: {
    padding: "14px",
    fontSize: "clamp(14px, 2.5vw, 16px)",
    borderRadius: "14px",
    border: "1px solid rgba(255,140,66,0.3)",
    background: "rgba(255,255,255,0.9)",
    outline: "none"
  },

  button: {
    padding: "clamp(12px, 3vw, 16px)",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #FF8C42, #FFD166)",
    fontWeight: "bold",
    cursor: "pointer"
  },

  signup: {
    marginTop: "12px",
    textAlign: "center",
    fontSize: "13px",
    color: "#888",
    cursor: "pointer"
  },

  error: {
    color: "#d32f2f",
    fontSize: "12px"
  }
};