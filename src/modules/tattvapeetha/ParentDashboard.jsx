import React, { useState } from "react";
import { processStudentActivity } from "../../core/decision/connectEngine";
import { getUserId } from "../../state/authStore";
import { getUserStats } from "./TrackerStore"; // ✅ KEEP CAPITAL T (IMPORTANT)

const BASE_URL = "https://traksha-backend-production.up.railway.app";

export default function ParentDashboard() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = getUserId();

  const generateReport = async () => {
    if (!userId) {
      alert("No user found");
      return;
    }

    setLoading(true);

    try {
      // 🔥 1. FETCH FROM BACKEND
      const res = await fetch(`${BASE_URL}/api/stats/${userId}`);
      const backendStats = await res.json();

      // 🔥 2. LOCAL FALLBACK (SAFE)
      const localStats = getUserStats(userId);

      const stats = {
        study: backendStats.study ?? localStats.study ?? 0,
        focus: backendStats.focus ?? localStats.focus ?? 0,
        distraction: backendStats.distraction ?? localStats.distraction ?? 0
      };

      // 🔥 3. PROCESS INTELLIGENCE
      const result = processStudentActivity(userId, "weekly", stats);

      setReport(result?.report || null);

    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>

      <h2>📊 Abhibhavak Dashboard</h2>
      <p style={styles.sub}>Weekly Intelligence Report</p>

      <button style={styles.btn} onClick={generateReport}>
        {loading ? "Generating..." : "Generate Weekly Report"}
      </button>

      {/* 🔥 EMPTY STATE */}
      {!report && !loading && (
        <p style={styles.empty}>
          No report generated yet
        </p>
      )}

      {/* 🔄 LOADING */}
      {loading && (
        <p style={styles.loading}>
          Processing student intelligence...
        </p>
      )}

      {/* ✅ REPORT */}
      {report && (
        <div style={styles.card}>

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
  );
}

// 🎨 STYLES
const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    maxWidth: "420px",
    margin: "0 auto",
    padding: "20px",
    background: "#0F0F0F",
    color: "#fff",
    fontFamily: "-apple-system, sans-serif"
  },

  sub: {
    fontSize: "12px",
    color: "#A1A1A6",
    marginBottom: "10px"
  },

  btn: {
    padding: "12px",
    marginTop: "10px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #FFD166, #FFB300)",
    fontWeight: "bold",
    cursor: "pointer"
  },

  empty: {
    marginTop: "15px",
    color: "#888"
  },

  loading: {
    marginTop: "15px",
    color: "#FFD166"
  },

  card: {
    marginTop: "20px",
    padding: "16px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)"
  }
};