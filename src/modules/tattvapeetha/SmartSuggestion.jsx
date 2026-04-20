import React from "react";
import { getUserState } from "./TeacherDashboard";

export default function SmartSuggestion({ userId, onAction }) {
  if (!userId) return null;

  const state = getUserState(userId);

  let suggestion = null;

  // 🧠 LOGIC
  if (state === "DISTRACTED") {
    suggestion = {
      text: "⚠ Lagta hai focus kam hai",
      action: "Start Focus Session",
      type: "FOCUS"
    };
  }

  if (state === "LOW_FOCUS") {
    suggestion = {
      text: "🧘 Discipline build karna zaruri hai",
      action: "Track Today",
      type: "TRACK"
    };
  }

  if (state === "HIGH_PERFORMANCE") {
    suggestion = {
      text: "🔥 Aaj tum peak par ho",
      action: "View Growth",
      type: "GROWTH"
    };
  }

  // 🔥 FALLBACK (IMPORTANT FIX)
  if (!suggestion) {
    suggestion = {
      text: "✨ Start your journey today",
      action: "Track Today",
      type: "TRACK"
    };
  }

  return (
    <div style={styles.card}>
      <p style={styles.text}>{suggestion.text}</p>

      <button
        style={styles.btn}
        onClick={() => onAction(suggestion.type)}
      >
        {suggestion.action}
      </button>
    </div>
  );
}

const styles = {
  card: {
    marginTop: "15px",
    padding: "14px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.3)"
  },

  text: {
    marginBottom: "10px",
    color: "#fff",
    fontSize: "14px"
  },

  btn: {
    padding: "10px 14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #FFD166, #FFB300)",
    color: "#000",
    cursor: "pointer",
    fontWeight: "600"
  }
}; 