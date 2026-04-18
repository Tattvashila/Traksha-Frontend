import React, { useEffect, useState } from "react";
import { getUserStats, getUserScore, getUserState } from "./TrackerStore";
import { getUserId } from "../../state/authStore";

const BASE_URL = "https://traksha-backend.onrender.com";

export default function GrowthAnalytics() {

  const userId = getUserId();

  const [stats, setStats] = useState({
    study: 0,
    focus: 0,
    distraction: 0
  });

  const [loading, setLoading] = useState(true);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    const loadStats = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`${BASE_URL}/api/stats/${userId}`);
        const data = await res.json();

        const local = getUserStats(userId);

        // 🔥 MERGE (SAFE)
        setStats({
          study: data.study ?? local.study ?? 0,
          focus: data.focus ?? local.focus ?? 0,
          distraction: data.distraction ?? local.distraction ?? 0
        });

      } catch (err) {
        console.error(err);

        // 🔥 FALLBACK LOCAL
        const local = getUserStats(userId);
        setStats(local);
      }

      setLoading(false);
    };

    loadStats();
  }, [userId]);

  const score = getUserScore(userId);
  const state = getUserState(userId);

  const getTrend = () => {
    if (state === "HIGH_PERFORMANCE") return "📈 Improving";
    if (state === "DISTRACTED") return "📉 Declining";
    if (state === "LOW_FOCUS") return "⚠ Needs Attention";
    return "➡ Stable";
  };

  const getWarnings = () => {
    let warnings = [];

    if (stats.focus < 2) {
      warnings.push("⚠ Focus is low");
    }

    if (stats.distraction > stats.focus) {
      warnings.push("⚠ High distraction detected");
    }

    if (stats.study < 2) {
      warnings.push("⚠ Study consistency low");
    }

    return warnings;
  };

  return (
    <div style={styles.container}>

      <h2>📊 Growth Analytics</h2>
      <p>Real-time performance insights</p>

      {/* 🔄 LOADING */}
      {loading && (
        <p style={{ color: "#FFD166" }}>Loading analytics...</p>
      )}

      {/* ✅ DATA */}
      {!loading && (
        <>
          <div style={styles.card}>
            <h3>📌 Current Stats</h3>

            <p>📚 Study: {stats.study}</p>
            <p>🧠 Focus: {stats.focus}</p>
            <p>⚠ Distraction: {stats.distraction}</p>
          </div>

          <div style={styles.card}>
            <h3>🏆 Performance Score</h3>
            <p style={styles.score}>{score}</p>
          </div>

          <div style={styles.card}>
            <h3>📈 Trend</h3>
            <p>{getTrend()}</p>
          </div>

          <div style={styles.card}>
            <h3>⚠ Alerts</h3>

            {getWarnings().length === 0 ? (
              <p>✅ No major concerns</p>
            ) : (
              getWarnings().map((w, i) => (
                <p key={i} style={styles.warning}>{w}</p>
              ))
            )}
          </div>
        </>
      )}

    </div>
  );
}

// 🎨 STYLES (UNCHANGED)
const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background: "#111",
    color: "#fff",
    fontFamily: "-apple-system, sans-serif"
  },
  card: {
    background: "#1c1c1c",
    padding: "15px",
    borderRadius: "12px",
    marginTop: "15px"
  },
  score: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#FFD166"
  },
  warning: {
    color: "#FF4D4D",
    marginTop: "8px"
  }
};