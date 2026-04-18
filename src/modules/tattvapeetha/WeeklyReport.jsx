import React from "react";

export default function WeeklyReport() {

  // 🔥 WEEK DATA (future backend)
  const logs = [
    { focus: 5, emotion: 6, discipline: 7 },
    { focus: 6, emotion: 5, discipline: 8 },
    { focus: 4, emotion: 4, discipline: 7 },
    { focus: 5, emotion: 5, discipline: 8 },
    { focus: 6, emotion: 6, discipline: 9 }
  ];

  // 🧠 AVERAGE CALC
  const avg = (key) =>
    (logs.reduce((sum, l) => sum + l[key], 0) / logs.length).toFixed(1);

  // 🧠 TREND
  const trend = (key) => {
    const diff = logs[logs.length - 1][key] - logs[0][key];
    if (diff > 1) return "📈 Improving";
    if (diff < -1) return "📉 Declining";
    return "➡ Stable";
  };

  // 🧠 AI SUMMARY
  const generateSummary = () => {
    let summary = [];

    if (avg("focus") < 5) {
      summary.push("⚠️ Focus is below average this week");
    }

    if (avg("emotion") < 5) {
      summary.push("⚠️ Emotional state needs attention");
    }

    if (avg("discipline") > 7) {
      summary.push("✅ Discipline is strong");
    }

    if (summary.length === 0) {
      summary.push("✅ Overall stable growth");
    }

    return summary;
  };

  return (
    <div style={styles.container}>

      <h2>📊 Weekly Intelligence Report</h2>

      {/* 🔥 AVERAGE */}
      <div style={styles.card}>
        <h3>📈 Weekly Averages</h3>
        <p>Focus: {avg("focus")}</p>
        <p>Emotion: {avg("emotion")}</p>
        <p>Discipline: {avg("discipline")}</p>
      </div>

      {/* 🔥 TREND */}
      <div style={styles.card}>
        <h3>🧠 Trends</h3>
        <p>Focus: {trend("focus")}</p>
        <p>Emotion: {trend("emotion")}</p>
        <p>Discipline: {trend("discipline")}</p>
      </div>

      {/* 🔥 AI SUMMARY */}
      <div style={styles.card}>
        <h3>🤖 AI Insights</h3>

        {generateSummary().map((s, i) => (
          <p key={i} style={styles.insight}>{s}</p>
        ))}
      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background: "#111",
    color: "#fff"
  },
  card: {
    background: "#1c1c1c",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "15px"
  },
  insight: {
    marginTop: "8px",
    color: "#FFD700"
  }
};