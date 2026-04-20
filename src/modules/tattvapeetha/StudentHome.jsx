import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 🎨 STYLES
import { colors, primaryBtn, premiumCard } from "../../shared/constants/uiStyles";

// 🧠 CORE
import { getUserId } from "../../state/authStore";
import { generateInsight } from "../../core/ai/insightEngine";
import { getUIState } from "../../core/ai/uiStateEngine";
import { getAdaptiveTheme } from "../../core/ui/adaptiveTheme";
import { useTrakshaAI } from "../../core/ai/trakshaAIEngine";

// 🔥 TEXT SYSTEM
import { TEXT } from "../../shared/constants/textSystem";

// 🔥 AUTO TRACKING
import useAutoTracking from "../../shared/hooks/useAutoTracking";

// 💧 WATER TOUCH
import useWaterTouch from "../../shared/hooks/useWaterTouch";

// 🧠 SCREEN ENGINE
import { getScreenConfig } from "../../core/ui/screenAdaptiveEngine";

// 🔥 TRACKER
import { loadUserStats } from "./TrackerStore";

// 🌐 UI
import LanguageToggle from "../../shared/components/LanguageToggle";

// 🔥 WOW
import SmartSuggestion from "./SmartSuggestion";

// 🔮 AI PRESENCE (ADDED)
import AIPresence from "../../shared/components/AIPresence";

// =========================
// 🧠 GREETING
// =========================
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Day";
  return "Good Evening";
};

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

  const screen = getScreenConfig();

  useEffect(() => {
    if (userId) loadUserStats(userId);
  }, [userId]);

  useAutoTracking(userId);
  useWaterTouch();

  const insight = userId ? generateInsight(userId) : null;
  const uiState = getUIState(userId);

  const adaptive = getAdaptiveTheme({
    state: uiState?.mode || "CALM",
    role: "SHISHYA"
  });

  const ai = useTrakshaAI(userId);

  const aiMessage =
    ai?.uiMode === "HIGH"
      ? TEXT.ai_high
      : ai?.uiMode === "DISTRACTED"
      ? TEXT.ai_distracted
      : ai?.uiMode === "INACTIVE"
      ? TEXT.ai_inactive
      : TEXT.ai_calm;

  const dynamicCard = {
    ...premiumCard,
    background:
      ai?.uiMode === "DISTRACTED"
        ? "rgba(255,240,240,0.7)"
        : ai?.uiMode === "HIGH"
        ? "rgba(255,248,225,0.8)"
        : "rgba(255,255,255,0.65)",
    border: "1px solid rgba(255,140,66,0.25)",
    boxShadow:
      ai?.uiMode === "HIGH"
        ? "0 12px 30px rgba(255,215,0,0.4)"
        : ai?.uiMode === "DISTRACTED"
        ? "0 10px 25px rgba(255,107,107,0.3)"
        : `0 12px 30px ${adaptive.aura}`,
    transition: "all 0.3s ease"
  };

  const dynamicBtn = {
    ...primaryBtn,
    borderRadius: "16px",
    boxShadow:
      ai?.uiMode === "HIGH"
        ? "0 6px 20px rgba(255,215,0,0.5)"
        : adaptive.ctaShadow
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
    <>
      <div
        style={{
          ...styles.container(screen),
          background:
            ai?.uiMode === "DISTRACTED"
              ? "linear-gradient(135deg, #FFE5E5, #FFF3E0)"
              : ai?.uiMode === "HIGH"
              ? "linear-gradient(135deg, #FFF8E1, #FFE082)"
              : adaptive.background
        }}
      >

        <div style={styles.header}>
          <LanguageToggle />

          <h2 style={styles.title(screen)}>
            {getGreeting()}, Shishya
          </h2>

          <p
            style={{
              ...styles.sub(screen),
              color:
                ai?.uiMode === "DISTRACTED"
                  ? "#FF6B6B"
                  : ai?.uiMode === "HIGH"
                  ? "#FFD700"
                  : "#5c5c5c"
            }}
          >
            {aiMessage}
          </p>
        </div>

        <div style={{ ...dynamicCard, ...getBreathingStyle(ai?.uiMode) }}>
          <p style={styles.cardSub}>
            {uiState?.message}
          </p>
        </div>

        <SmartSuggestion userId={userId} onAction={handleSuggestion} />

        <div style={dynamicCard}>
          <h3 style={styles.cardTitle}>🧘 {TEXT.sankalp}</h3>
          <p style={styles.cardSub}>
            "Today I will become a better version of myself"
          </p>
        </div>

        {insight && (
          <div style={dynamicCard}>
            <h3 style={styles.cardTitle}>🧠 Guidance</h3>
            <p style={styles.cardSub}>{insight}</p>
          </div>
        )}

        <div style={dynamicCard}>
          <h3 style={styles.cardTitle}>📚 {TEXT.tattvaTitle}</h3>

          <div style={styles.grid(screen)}>
            {["/tracking", "/analytics", "/ai-guru", "/ai-guru"].map((path, i) => (
              <div
                key={i}
                style={styles.card}
                onClick={() => navigate(path)}
                onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.94)")}
                onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {["📊 Track Today","📈 Growth","🤖 AI Guru","❓ Ask Doubt"][i]}
              </div>
            ))}
          </div>
        </div>

        <div style={dynamicCard}>
          <h3 style={styles.cardTitle}>🔥 {TEXT.selfGrowth}</h3>

          <div style={styles.grid(screen)}>
            {["🧠 Focus Training","💪 Discipline","📿 Values","⚖ Decision Help"].map((item, i) => (
              <div key={i} style={styles.card}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "20px", paddingBottom: "80px" }}>
          <button style={dynamicBtn} onClick={handleParentSwitch}>
            {TEXT.parentView}
          </button>
        </div>

        <style>{`
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
        `}</style>

      </div>

      {/* 🔮 AI PRESENCE */}
      <AIPresence ai={ai} />
    </>
  );
}

const styles = { /* SAME AS BEFORE */ };