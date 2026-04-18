import React, { useState } from "react";
import { TEXT } from "../../shared/constants/textSystem";
import { getUserId } from "../../state/authStore";
import { addActivity } from "./TrackerStore"; // 🔥 LOCAL + BACKEND SYNC

const BASE_URL = "https://traksha-backend.onrender.com";

export default function DailyTracking() {
  const [data, setData] = useState({
    focus: "",
    discipline: "",
    emotion: "",
    participation: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 NEW

  const userId = getUserId();

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const isValid = () => {
    return data.focus && data.discipline && data.emotion && data.participation;
  };

  // 🔥 MAP TO BACKEND FORMAT
  const mapToPayload = () => {
    let study = 0;
    let focus = 0;
    let distraction = 0;

    if (data.focus === "high") focus += 3;
    if (data.focus === "medium") focus += 2;
    if (data.focus === "low") focus += 1;

    if (data.discipline === "good") study += 3;
    if (data.discipline === "average") study += 2;
    if (data.discipline === "poor") study += 1;

    if (data.emotion === "disturbed") distraction += 3;
    if (data.emotion === "sensitive") distraction += 2;

    if (data.participation === "active") focus += 2;
    if (data.participation === "moderate") focus += 1;
    if (data.participation === "low") distraction += 1;

    return { study, focus, distraction };
  };

  const handleSave = async () => {
    if (!userId) return;

    if (!isValid()) {
      setMessage("⚠ Please fill all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const payload = mapToPayload();

      // 🔥 1. BACKEND SAVE
      const res = await fetch(`${BASE_URL}/api/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          ...payload
        })
      });

      const result = await res.json();

      if (!result.success) {
        setMessage("❌ Failed to save");
        setLoading(false);
        return;
      }

      // 🔥 2. LOCAL STORE SYNC (IMPORTANT FOR UI)
      if (payload.study) await addActivity(userId, "study", payload.study);
      if (payload.focus) await addActivity(userId, "focus", payload.focus);
      if (payload.distraction) await addActivity(userId, "distraction", payload.distraction);

      setMessage("✅ Data Saved Successfully");

      // RESET
      setData({
        focus: "",
        discipline: "",
        emotion: "",
        participation: ""
      });

      setTimeout(() => {
        setMessage("");
      }, 2000);

    } catch (err) {
      console.error(err);
      setMessage("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>{TEXT.trackingTitle}</h2>
      <p style={styles.subtitle}>{TEXT.trackingSub}</p>

      <div style={styles.form}>

        {[
          {
            label: "Focus Level",
            key: "focus",
            options: [
              { v: "high", t: "High" },
              { v: "medium", t: "Moderate" },
              { v: "low", t: "Needs Attention" }
            ]
          },
          {
            label: "Discipline",
            key: "discipline",
            options: [
              { v: "good", t: "Consistent" },
              { v: "average", t: "Improving" },
              { v: "poor", t: "Needs Guidance" }
            ]
          },
          {
            label: "Emotional State",
            key: "emotion",
            options: [
              { v: "stable", t: "Stable" },
              { v: "sensitive", t: "Sensitive" },
              { v: "disturbed", t: "Needs Support" }
            ]
          },
          {
            label: "Participation",
            key: "participation",
            options: [
              { v: "active", t: "Active" },
              { v: "moderate", t: "Moderate" },
              { v: "low", t: "Low Engagement" }
            ]
          }
        ].map((field, i) => (
          <div key={i} style={styles.field}>
            <label>{field.label}</label>
            <select
              value={data[field.key]}
              style={styles.select}
              onChange={(e) => handleChange(field.key, e.target.value)}
            >
              <option value="">Select</option>
              {field.options.map((o, idx) => (
                <option key={idx} value={o.v}>{o.t}</option>
              ))}
            </select>
          </div>
        ))}

        {message && <p style={styles.message}>{message}</p>}

        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1
          }}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : TEXT.save}
        </button>

      </div>

    </div>
  );
}

// 🎨 SAME UI (SLIGHT POLISH)
const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background: "#0F0F0F",
    color: "#fff",
    fontFamily: "-apple-system, sans-serif"
  },
  title: {
    marginBottom: "5px"
  },
  subtitle: {
    fontSize: "12px",
    color: "#A1A1A6",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },
  select: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "#fff"
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #FF8C42, #FFD166)", // 🔥 saffron fix
    fontWeight: "bold",
    cursor: "pointer"
  },
  message: {
    color: "#00ffcc",
    fontSize: "13px"
  }
};