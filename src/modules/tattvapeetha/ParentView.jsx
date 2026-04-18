import React from "react";
import { TEXT } from "../../shared/constants/textSystem";

export default function ParentView() {

  // 🔥 TEMP DATA (future API se aayega)
  const insights = [
    {
      type: "focus",
      message: TEXT.insightLowFocus
    },
    {
      type: "emotion",
      message: TEXT.insightLowEmotion
    },
    {
      type: "discipline",
      message: TEXT.insightGoodDiscipline
    }
  ];

  return (
    <div style={styles.container}>

      {/* 🔥 HEADER */}
      <h2 style={styles.title}>{TEXT.parentTitle}</h2>
      <p style={styles.subtitle}>{TEXT.parentSub}</p>

      {/* 🌿 INSIGHTS */}
      <div style={styles.list}>

        {insights.map((item, index) => (
          <div key={index} style={styles.card}>
            <p style={styles.message}>{item.message}</p>
          </div>
        ))}

      </div>

    </div>
  );
}

// 🎨 ULTRA CALM UI
const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(135deg, #0F0F0F, #1C1C1C)",
    color: "#fff",
    fontFamily: "sans-serif"
  },

  title: {
    marginBottom: "5px"
  },

  subtitle: {
    fontSize: "12px",
    color: "#aaa",
    marginBottom: "20px"
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "15px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,0.1)"
  },

  message: {
    fontSize: "14px",
    lineHeight: "1.5"
  }
};