import React, { useState, useEffect, useRef } from "react";
import { gurukulCard, primaryBtn } from "../../shared/constants/uiStyles";
import {
  getUserStats,
  getUserState,
  getUserScore,
  loadUserStats
} from "./TrackerStore";
import { getUserId } from "../../state/authStore";

export default function AIGuru() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = getUserId();

  const lastResponse = useRef("");

  useEffect(() => {
    const init = async () => {
      if (userId) await loadUserStats(userId);
      setLoading(false);
    };
    init();
  }, [userId]);

  // 🔥 AUTO GUIDANCE (NEW)
  const getAutoGuidance = () => {
    if (!userId) return null;

    const state = getUserState(userId);
    const score = getUserScore(userId);

    if (state === "DISTRACTED") {
      return "⚠ Aaj distraction zyada hai — ek kaam choose karo aur complete karo.";
    }

    if (state === "LOW_FOCUS") {
      return "🧠 Focus build karo — 25 min ka deep work karo.";
    }

    if (score > 8) {
      return "🔥 Tum strong progress me ho — consistency maintain karo.";
    }

    return null;
  };

  // 🔥 SMART ENGINE (UPGRADED)
  const generateSmartResponse = (text) => {
    if (!userId) return "Pehle login karein.";

    const stats = getUserStats(userId);
    const state = getUserState(userId);
    const score = getUserScore(userId);

    const t = text.toLowerCase();

    const focusLevel = stats.focus;
    const studyLevel = stats.study;
    const distractionLevel = stats.distraction;

    let final = "";

    // 🎯 INTENT BASED
    if (t.includes("focus")) {
      if (focusLevel <= 1) {
        final = "Tumhara focus weak hai. Phone hatao aur 25 min ka deep session karo.";
      } else if (focusLevel <= 3) {
        final = "Focus improving hai. Pomodoro technique use karo.";
      } else {
        final = "Tumhara focus strong hai. Ab deep work ko habit bana lo.";
      }
    }

    else if (t.includes("study") || t.includes("padhai")) {
      if (studyLevel <= 1) {
        final = "Consistency missing hai. Roz 20 min se shuru karo.";
      } else if (studyLevel <= 3) {
        final = "Tum sahi track par ho. Ab quality improve karo.";
      } else {
        final = "Excellent. Ab revision aur teaching method use karo.";
      }
    }

    else if (t.includes("stress") || t.includes("tension")) {
      if (distractionLevel > focusLevel) {
        final = "Tumhara mann overloaded hai. 5 deep breaths lo aur ek kaam par focus karo.";
      } else {
        final = "Routine stable rakho, stress automatically control hoga.";
      }
    }

    else if (t.includes("motivation")) {
      if (score < 5) {
        final = "Motivation nahi, discipline chahiye. Abhi 10 min ka kaam shuru karo.";
      } else {
        final = "Momentum ban chuka hai. Break mat hone do.";
      }
    }

    // 🧠 STATE LAYER
    if (!final) {
      if (state === "DISTRACTED") {
        final = "Tumhara mann bhatak raha hai. Environment clean karo aur ek task pick karo.";
      } else if (state === "LOW_FOCUS") {
        final = "Focus low hai. Timer lagao aur 25 min ka deep session karo.";
      } else if (state === "HIGH") {
        final = "Tum peak state me ho. Consistency maintain karo.";
      }
    }

    // 📊 SCORE LAYER
    if (!final) {
      if (score <= 3) {
        final = "Abhi basics strong karo. Daily routine banao.";
      } else if (score <= 8) {
        final = "Tum progress kar rahe ho. Distraction kam karo.";
      } else {
        final = "Tum strong discipline state me ho. Ab mastery par kaam karo.";
      }
    }

    // 🧘 FALLBACK
    if (!final) {
      final = "Prashn puchna hi pehla kadam hai. Tum sahi marg par ho.";
    }

    // 🔁 ANTI-REPEAT
    if (final === lastResponse.current) {
      final += " Thoda approach badlo aur fir try karo.";
    }

    lastResponse.current = final;

    return final;
  };

  const handleAsk = () => {
    if (!input.trim()) {
      setResponse("Kuch to pucho... mann me jo hai wahi likho.");
      return;
    }

    const reply = generateSmartResponse(input);
    setResponse(reply);
  };

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <h2>🪔 AI Guru</h2>
        <p style={styles.sub}>Real Intelligence Active</p>
      </div>

      {loading && <p style={{ color: "#FFD166" }}>Initializing Guru...</p>}

      {!loading && (
        <>
          <div style={styles.guruBox}>
            <p>"Prashn hi marg ka prarambh hai."</p>
          </div>

          {/* 🔥 AUTO GUIDANCE */}
          {getAutoGuidance() && (
            <div style={styles.autoBox}>
              <p>{getAutoGuidance()}</p>
            </div>
          )}

          <div style={{ ...gurukulCard, marginTop: "20px" }}>
            <textarea
              placeholder="Apna prashn likho..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={styles.input}
            />

            <button style={primaryBtn} onClick={handleAsk}>
              Seek Guidance
            </button>
          </div>

          {response && (
            <div style={styles.response}>
              <p>{response}</p>
            </div>
          )}
        </>
      )}

    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background: "#0F0F0F",
    color: "#fff"
  },
  header: {
    textAlign: "center",
    marginBottom: "15px"
  },
  sub: {
    fontSize: "12px",
    color: "#aaa"
  },
  guruBox: {
    background: "rgba(255,255,255,0.05)",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center"
  },
  autoBox: {
    marginTop: "15px",
    background: "rgba(255,140,66,0.1)",
    padding: "12px",
    borderRadius: "10px"
  },
  input: {
    width: "100%",
    minHeight: "100px",
    padding: "10px",
    marginBottom: "10px"
  },
  response: {
    marginTop: "20px",
    background: "#1C1C1C",
    padding: "15px",
    borderRadius: "12px"
  }
};