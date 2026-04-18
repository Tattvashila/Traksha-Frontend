import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GuardianLock() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔐 TEMP PASSWORD (future backend)
  const GUARDIAN_PASSWORD = "Parent@123";

  const handleAccess = () => {
    setError("");

    if (!password) {
      setError("Enter password");
      return;
    }

    if (password !== GUARDIAN_PASSWORD) {
      setError("Wrong password");
      return;
    }

    // ✅ SUCCESS
    navigate("/parent-dashboard");
  };

  return (
    <div style={styles.container}>

      <h2>🔒 Guardian Access</h2>
      <p style={styles.subText}>
        This section is protected for guardian access
      </p>

      <input
        type="password"
        placeholder="Enter Guardian Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      {error && <p style={styles.error}>{error}</p>}

      <button style={styles.button} onClick={handleAccess}>
        Access
      </button>

    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(135deg, #0F0F0F, #1C1C1C)",
    color: "#fff",
    fontFamily: "sans-serif"
  },

  subText: {
    color: "#aaa",
    fontSize: "12px",
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    marginTop: "10px"
  },

  button: {
    marginTop: "15px",
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#FFD700",
    fontWeight: "bold",
    cursor: "pointer"
  },

  error: {
    color: "red",
    marginTop: "10px"
  }
};