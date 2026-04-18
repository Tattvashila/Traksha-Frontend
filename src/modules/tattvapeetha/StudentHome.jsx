import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 🎨 STYLES
import { colors, primaryBtn, premiumCard } from "../../shared/constants/uiStyles";

// 🧠 CORE
import { getUserId } from "../../state/authStore";
import { generateInsight } from "../../core/ai/insightEngine";
import { getUIState } from "../../core/ai/uiStateEngine";
import { getAdaptiveTheme } from "../../core/ui/adaptiveTheme";

// 🔥 TRACKER
import { loadUserStats } from "./TrackerStore";

// 🌐 UI
import LanguageToggle from "../../shared/components/LanguageToggle";
import { roleThemes } from "../../shared/constants/roleThemes";

// 🔥 WOW
import SmartSuggestion from "./SmartSuggestion";

// =========================
// 🧠 ANIMATION
// =========================
const getBreathingStyle = (mode) => {
  if (mode === "HIGH") return { animation: "pulseFast 2s infinite" };
  if (mode === "DISTRACTED") return { animation: "shakeSoft 0.4s ease-in-out" };
  return { animation: "breathe 4s ease-in-out infinite" };
};

export default function StudentHome() {
  const navigate = useNavigate();
  const userId = getUserId();

  useEffect(() => {
    if (userId) {
      loadUserStats(userId);
    }
  }, [userId]);

  const insight = userId ? generateInsight(userId) : null;

  const uiState = getUIState(userId);

  const adaptive = getAdaptiveTheme({
    state: uiState?.mode || "CALM",
    role: "SHISHYA"
  });

  const dynamicCard = {
    ...premiumCard,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,140,66,0.2)",
    boxShadow: `0 10px 30px ${adaptive.aura}`,
    transition: "all 0.3s ease"
  };

  const dynamicBtn = {
    ...primaryBtn,
    borderRadius: "14px",
    boxShadow: adaptive.ctaShadow
  };

  const handleSuggestion = (type) => {
    if (type === "FOCUS") navigate("/tracking");
    if (type === "TRACK") navigate("/tracking");
    if (type === "GROWTH") navigate("/analytics");
  };

  const handleParentSwitch = () => {
    const pass = prompt("Enter Parent Password");
    if (pass === "parent123") navigate("/parent-dashboard");
    else alert("Wrong password");
  };

  return (
    <div style={{ ...styles.container, background: adaptive.background }}>

      <div style={styles.header}>
        <LanguageToggle />
        <h2 style={styles.title}>Shishya Path</h2>
        <p style={styles.sub}>Your growth journey begins here</p>
      </div>

      {/* SAFE FIX */}
      <div style={{ ...dynamicCard, ...getBreathingStyle(uiState?.mode) }}>
        <p style={{ ...styles.cardSub, color: adaptive.accent || "#FFD166" }}>
          {uiState?.message}
        </p>
      </div>

      <SmartSuggestion userId={userId} onAction={handleSuggestion} />

      <div style={dynamicCard}>
        <h3 style={styles.cardTitle}>🧘 Daily Sankalp</h3>
        <p style={styles.cardSub}>
          "Aaj main apne aap ko behtar banaunga"
        </p>
      </div>

      {insight && (
        <div style={dynamicCard}>
          <h3 style={styles.cardTitle}>🧠 Aaj ka Margdarshan</h3>
          <p style={styles.cardSub}>{insight}</p>
        </div>
      )}

      <div style={dynamicCard}>
        <h3 style={styles.cardTitle}>📚 Learning Zone</h3>

        <div style={styles.grid}>
          {["/tracking", "/analytics", "/ai-guru", "/ai-guru"].map((path, i) => (
            <div
              key={i}
              style={styles.card}
              onClick={() => navigate(path)}
              onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
              onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {i === 0 && "📊 Track Today"}
              {i === 1 && "📈 Growth"}
              {i === 2 && "🤖 AI Guru"}
              {i === 3 && "❓ Ask Doubt"}
            </div>
          ))}
        </div>
      </div>

      <div style={dynamicCard}>
        <h3 style={styles.cardTitle}>🔥 Self Growth</h3>

        <div style={styles.grid}>
          {["🧠 Focus Training", "💪 Discipline", "📿 Sanskar", "⚖ Decision Help"].map((item, i) => (
            <div key={i} style={styles.card}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "20px", paddingBottom: "80px" }}>
        <button style={dynamicBtn} onClick={handleParentSwitch}>
          Switch to Abhibhavak View
        </button>
      </div>

      <style>
        {`
        @keyframes breathe {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        @keyframes pulseFast {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes shakeSoft {
          0% { transform: translateX(0); }
          50% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        `}
      </style>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    maxWidth: "420px",
    margin: "0 auto",
    padding: "16px"
  },
  header: { marginBottom: "20px" },
  title: {
    background: "linear-gradient(135deg, #FF8C42, #FFD166)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  sub: { fontSize: "13px", color: "#A1A1A6" },
  cardTitle: { color: "#fff" },
  cardSub: { fontSize: "13px", color: "#ccc" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "14px",
    borderRadius: "14px",
    textAlign: "center"
  }
};