import React, { useState } from "react";

export default function TeacherDashboard() {

  const [student, setStudent] = useState("Aman Sharma");

  const [data, setData] = useState({
    focus: 5,
    emotion: 5,
    discipline: 5,
    participation: 5
  });

  const handleChange = (key, val) => {
    setData({ ...data, [key]: Number(val) });
  };

  const handleSubmit = () => {
    console.log("📊 Saved:", student, data);
    alert("Data Saved ✅");
  };

  return (
    <div style={styles.container}>

      <h2>👩‍🏫 Teacher Input System</h2>

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
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background: "#111",
    color: "#fff"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px"
  },
  button: {
    marginTop: "20px",
    padding: "10px",
    background: "#FFD700",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  select: {
    marginTop: "10px",
    padding: "8px",
    width: "100%"
  }
};