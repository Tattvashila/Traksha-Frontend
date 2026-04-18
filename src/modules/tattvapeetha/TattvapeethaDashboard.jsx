import React from "react";
import { useNavigate } from "react-router-dom";

export default function TattvapeethaDashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      <h2>🎓 Tattvapeetha</h2>
      <p>Holistic Student Growth System</p>

      <div style={styles.grid}>

        <div style={styles.card} onClick={() => navigate("/student")}>
          👤 Student Profile
        </div>

        <div style={styles.card} onClick={() => navigate("/tracking")}>
          📝 Daily Tracking
        </div>

        <div style={styles.card} onClick={() => navigate("/analytics")}>
          📊 Analytics
        </div>

        <div style={styles.card} onClick={() => navigate("/parent")}>
          👨‍👩‍👧 Parent View
        </div>

        <div style={styles.card} onClick={() => navigate("/weekly")}>
          📈 Weekly Report
        </div>

        <div style={styles.card} onClick={() => navigate("/teacher")}>
          👩‍🏫 Teacher Panel
        </div>

      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background: "#111",
    color: "#fff"
  },
  grid: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px"
  },
  card: {
    padding: "15px",
    background: "#1c1c1c",
    borderRadius: "10px",
    cursor: "pointer",
    textAlign: "center"
  }
};