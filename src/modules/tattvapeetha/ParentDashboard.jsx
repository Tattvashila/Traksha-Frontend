import React, { useState } from "react";
import { processStudentActivity } from "../../core/decision/connectEngine";
import { getUserId } from "../../state/authStore";
import { getUserStats } from "./TrackerStore";

// 🔥 NEW SYSTEMS
import { useTrakshaAI } from "../../core/ai/trakshaAIEngine";
import useWaterTouch from "../../shared/hooks/useWaterTouch";
import { getScreenConfig } from "../../core/ui/screenAdaptiveEngine";
import AIPresence from "../../shared/components/AIPresence";

const BASE_URL = "https://traksha-backend.onrender.com";

export default function ParentDashboard() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = getUserId();

  // 🔥 NEW HOOKS
  const ai = useTrakshaAI(userId);
  const screen = getScreenConfig();
  useWaterTouch();

  const generateReport = async () => {
    if (!userId) {
      alert("No user found");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/stats/${userId}`);
      const backendStats = await res.json();

      const localStats = getUserStats(userId);

      const stats = {
        study: backendStats.study ?? localStats.study ?? 0,
        focus: backendStats.focus ?? localStats.focus ?? 0,
        distraction: backendStats.distraction ?? localStats.distraction ?? 0
      };

      const result = processStudentActivity(userId, "weekly", stats);

      setReport(result?.report || null);

    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <>
      <div
        style={{
          ...styles.container(screen),
          background:
            ai?.uiMode === "DISTRACTED"
              ? "linear-gradient(135deg, #FFE5E5, #FFF3E0)"
              : ai?.uiMode === "HIGH"
              ? "linear-gradient(135deg, #FFF8E1, #FFE082)"
              : "linear-gradient(135deg, #FFFDF7, #FFF3E0)"
        }}
      >

        <h2 style={styles.title(screen)}>📊 Abhibhavak Dashboard</h2>
        <p style={styles.sub(screen)}>Weekly Intelligence Report</p>

        <button style={styles.btn} onClick={generateReport}>
          {loading ? "Generating..." : "Generate Weekly Report"}
        </button>

        {/* EMPTY */}
        {!report && !loading && (
          <p style={styles.empty}>No report generated yet</p>
        )}

        {/* LOADING */}
        {loading && (
          <p style={styles.loading}>
            Processing student intelligence...
          </p>
        )}

        {/* REPORT */}
        {report && (
          <div style={styles.card(ai)}>

            <h3>📌 Overview</h3>
            <p>Score: {report.score}</p>
            <p>Status: {report.status}</p>
            <p>Pattern: {report.pattern}</p>

            <h3 style={{ marginTop: "15px" }}>🧠 Guidance</h3>
            <ul>
              {report.advice?.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>

          </div>
        )}

      </div>

      {/* 🔮 AI PRESENCE */}
      <AIPresence ai={ai} />
    </>
  );
}

// 🎨 ADAPTIVE STYLES
const styles = {
  container: (screen) => ({
    minHeight: "100vh",
    width: "100%",
    maxWidth: screen.container.maxWidth,
    margin: "0 auto",
    padding: screen.container.padding
  }),

  title: (screen) => ({
    fontSize: screen.font.title,
    color: "#5a3e1b"
  }),

  sub: (screen) => ({
    fontSize: screen.font.text,
    color: "#8c6b3c",
    marginBottom: "10px"
  }),

  btn: {
    padding: "12px",
    marginTop: "10px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #FFD166, #FFB300)",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(255,183,0,0.4)"
  },

  empty: {
    marginTop: "15px",
    color: "#999"
  },

  loading: {
    marginTop: "15px",
    color: "#FF9800"
  },

  card: (ai) => ({
    marginTop: "20px",
    padding: "16px",
    borderRadius: "16px",
    background:
      ai?.uiMode === "HIGH"
        ? "rgba(255,248,225,0.9)"
        : ai?.uiMode === "DISTRACTED"
        ? "rgba(255,235,235,0.9)"
        : "rgba(255,255,255,0.8)",
    border: "1px solid rgba(255,140,66,0.2)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  })
};