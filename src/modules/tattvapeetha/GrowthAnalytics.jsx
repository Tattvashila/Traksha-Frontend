import React, { useEffect, useState } from "react";
import { getUserStats, getUserScore, getUserState } from "./TrackerStore";
import { getUserId } from "../../state/authStore";

const BASE_URL = "https://traksha-backend.onrender.com";

// 🔥 NEW SYSTEMS
import { useTrakshaAI } from "../../core/ai/trakshaAIEngine";
import useWaterTouch from "../../shared/hooks/useWaterTouch";
import { getScreenConfig } from "../../core/ui/screenAdaptiveEngine";
import AIPresence from "../../shared/components/AIPresence";

export default function GrowthAnalytics() {

  const userId = getUserId();

  const [stats, setStats] = useState({
    study: 0,
    focus: 0,
    distraction: 0
  });

  const [loading, setLoading] = useState(true);

  // 🔥 NEW HOOKS
  const ai = useTrakshaAI(userId);
  const screen = getScreenConfig();
  useWaterTouch();

  useEffect(() => {
    const loadStats = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`${BASE_URL}/api/stats/${userId}`);
        const data = await res.json();

        const local = getUserStats(userId);

        setStats({
          study: data.study ?? local.study ?? 0,
          focus: data.focus ?? local.focus ?? 0,
          distraction: data.distraction ?? local.distraction ?? 0
        });

      } catch (err) {
        console.error(err);

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

        <h2 style={styles.title(screen)}>📊 Growth Analytics</h2>
        <p style={styles.sub(screen)}>Real-time performance insights</p>

        {loading && (
          <p style={{ color: "#FF9800" }}>Loading analytics...</p>
        )}

        {!loading && (
          <>
            <div style={styles.card(ai)}>
              <h3>📌 Current Stats</h3>
              <p>📚 Study: {stats.study}</p>
              <p>🧠 Focus: {stats.focus}</p>
              <p>⚠ Distraction: {stats.distraction}</p>
            </div>

            <div style={styles.card(ai)}>
              <h3>🏆 Performance Score</h3>
              <p style={styles.score}>{score}</p>
            </div>

            <div style={styles.card(ai)}>
              <h3>📈 Trend</h3>
              <p>{getTrend()}</p>
            </div>

            <div style={styles.card(ai)}>
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

      {/* 🔮 AI PRESENCE */}
      <AIPresence ai={ai} />
    </>
  );
}

// 🎨 ADAPTIVE STYLES
const styles = {
  container: (screen) => ({
    minHeight: "100vh",
    padding: screen.container.padding,
    maxWidth: screen.container.maxWidth,
    margin: "0 auto",
    width: "100%"
  }),

  title: (screen) => ({
    fontSize: screen.font.title,
    color: "#5a3e1b"
  }),

  sub: (screen) => ({
    fontSize: screen.font.text,
    color: "#8c6b3c"
  }),

  card: (ai) => ({
    background:
      ai?.uiMode === "HIGH"
        ? "rgba(255,248,225,0.9)"
        : ai?.uiMode === "DISTRACTED"
        ? "rgba(255,235,235,0.9)"
        : "rgba(255,255,255,0.85)",
    padding: "15px",
    borderRadius: "14px",
    marginTop: "15px",
    border: "1px solid rgba(255,140,66,0.2)"
  }),

  score: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#FF9800"
  },

  warning: {
    color: "#FF4D4D",
    marginTop: "8px"
  }
};