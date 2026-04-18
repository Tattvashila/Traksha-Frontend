import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../state/authStore";
import logo from "../assets/traksha-logo.png";
import { TEXT } from "../shared/constants/textSystem";
import { getAdaptiveTheme } from "../core/ui/adaptiveTheme";

const BASE_URL = "https://traksha-backend.onrender.com";

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

      // 🔥 SAFE JSON PARSE (CRASH FIX)
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

      // 🔐 OTP FLOW
      if (data.status === "OTP_REQUIRED") {
        navigate("/otp", { state: { userId: finalId } });
        return;
      }

      // ✅ SUCCESS
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

        <p style={styles.demo}>Use any TRK ID + password 1234</p>

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
    padding: "16px"
  },
  card: {
    width: "100%",
    maxWidth: "360px",
    background: "rgba(255,255,255,0.05)",
    padding: "26px",
    borderRadius: "20px",
    textAlign: "center",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,140,66,0.2)"
  },
  logo: {
    width: "60px",
    marginBottom: "10px",
    filter: "drop-shadow(0 0 8px rgba(255,140,66,0.5))" // 🔥 LOGO FIX
  },
  title: {
    background: "linear-gradient(135deg, #FF8C42, #FFD166)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  subtitle: { color: "#aaa", fontSize: "12px" },
  demo: { fontSize: "11px", color: "#FFD166" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    outline: "none"
  },
  button: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #FF8C42, #FFD166)",
    fontWeight: "bold",
    cursor: "pointer"
  },
  error: { color: "#ff4d4d", fontSize: "12px" }
};