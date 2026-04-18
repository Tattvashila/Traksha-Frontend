import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../core/auth/sessionManager";
import logo from "../assets/traksha-logo.png";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, []);

  return (
    <div style={styles.container}>

      {/* 🔥 HEADER */}
      <div style={styles.header}>
        <img src={logo} style={styles.logo} />
        <h2>Traksha</h2>
      </div>

      {/* 🔥 MODE SELECTOR */}
      <div style={styles.modeBox}>
        <h3>Choose Your Mode</h3>

        <div style={styles.modeGrid}>

          <div
            style={styles.modeCard}
            onClick={() => navigate("/student-home")}
          >
            🎓 Student Mode
            <p>Learning + AI + Growth</p>
          </div>

          <div
            style={styles.modeCard}
            onClick={() => navigate("/parent-dashboard")}
          >
            📊 Parent Intelligence
            <p>Insights + Weekly Reports</p>
          </div>

        </div>
      </div>

      {/* 🔥 CORE MODULES */}
      <div style={styles.section}>
        <h3>Core Systems</h3>

        <div style={styles.grid}>

          <div style={styles.card} onClick={() => navigate("/tattvapeetha")}>
            🎓 Tattvapeetha
          </div>

          <div style={styles.card} onClick={() => navigate("/raksha")}>
            🛡 Raksha
          </div>

          <div style={styles.card} onClick={() => navigate("/vanatattva")}>
            🛒 Vanatattva
          </div>

          <div style={styles.card} onClick={() => navigate("/shreetattva")}>
            🌸 Shreetattva
          </div>

          <div style={styles.card} onClick={() => navigate("/clinic")}>
            🏥 ClinicOS
          </div>

          <div style={styles.card} onClick={() => navigate("/decision")}>
            🧠 Decision Engine
          </div>

        </div>
      </div>

      {/* 🔥 LOGOUT */}
      <button style={styles.logout} onClick={() => {
        logout();
        navigate("/");
      }}>
        Logout
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

  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px"
  },

  logo: {
    width: "45px",
    filter: "drop-shadow(0 0 10px gold)"
  },

  modeBox: {
    background: "rgba(255,255,255,0.05)",
    padding: "15px",
    borderRadius: "15px",
    marginBottom: "25px"
  },

  modeGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "10px"
  },

  modeCard: {
    background: "#1C1C1C",
    padding: "15px",
    borderRadius: "12px",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.1)"
  },

  section: {
    marginTop: "20px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px"
  },

  card: {
    background: "#1C1C1C",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.1)"
  },

  logout: {
    marginTop: "30px",
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#FF4D4D",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }
};