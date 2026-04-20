import React, { useState } from "react";

// 🔥 NEW SYSTEMS
import { getUserId } from "../../state/authStore";
import { useTrakshaAI } from "../../core/ai/trakshaAIEngine";
import useWaterTouch from "../../shared/hooks/useWaterTouch";
import { getScreenConfig } from "../../core/ui/screenAdaptiveEngine";
import AIPresence from "../../shared/components/AIPresence";

export default function TeacherDashboard() {

  const [student, setStudent] = useState("Aman Sharma");

  const [data, setData] = useState({
    focus: 5,
    emotion: 5,
    discipline: 5,
    participation: 5
  });

  const userId = getUserId();

  // 🔥 NEW HOOKS
  const ai = useTrakshaAI(userId);
  const screen = getScreenConfig();
  useWaterTouch();

  const handleChange = (key, val) => {
    setData({ ...data, [key]: Number(val) });
  };

  const handleSubmit = () => {
    console.log("📊 Saved:", student, data);
    alert("Data Saved ✅");
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

        <h2 style={styles.title(screen)}>👩‍🏫 Teacher Input System</h2>

        <select
          value={student}
          onChange={(e) => setStudent(e.target.value)}
          style={styles.select}
        >
          <option>Aman Sharma</option>
          <option>Riya Verma</option>
        </select>

        {Object.keys(data).map((key) => (
          <div key={key} style={styles.row}>
            <span>{key}</span>

            <input
              type="range"
              min="0"
              max="10"
              value={data[key]}
              onChange={(e) => handleChange(key, e.target.value)}
            />

            <span>{data[key]}</span>
          </div>
        ))}

        <button style={styles.button} onClick={handleSubmit}>
          Submit
        </button>

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

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    background: "rgba(255,255,255,0.7)",
    padding: "10px",
    borderRadius: "10px"
  },

  button: {
    marginTop: "20px",
    padding: "12px",
    background: "linear-gradient(135deg, #FFD166, #FFB300)",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 6px 18px rgba(255,183,0,0.4)"
  },

  select: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    borderRadius: "10px",
    border: "1px solid rgba(0,0,0,0.1)"
  }
};