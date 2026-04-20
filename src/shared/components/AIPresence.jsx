// =========================
// 🔮 AI PRESENCE UI
// =========================

import React from "react";

export default function AIPresence({ ai }) {
  if (!ai) return null;

  const getColor = () => {
    if (ai.uiMode === "HIGH") return "#FFD700";
    if (ai.uiMode === "DISTRACTED") return "#FF6B6B";
    return "#4CAF50";
  };

  return (
    <div style={styles.container}>

      {/* 💬 MESSAGE */}
      <div style={styles.message}>
        {ai.message}
      </div>

      {/* 🔮 ORB */}
      <div
        style={{
          ...styles.orb,
          background: getColor(),
          boxShadow: `0 0 20px ${getColor()}`
        }}
      />

    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 999
  },

  orb: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    animation: "breathe 3s infinite"
  },

  message: {
    position: "absolute",
    bottom: "30px",
    right: "0",
    background: "rgba(0,0,0,0.75)",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "10px",
    fontSize: "12px",
    whiteSpace: "nowrap"
  }
}; 