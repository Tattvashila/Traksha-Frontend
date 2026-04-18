import React, { useState } from "react";

export default function StudentProfile() {
  const [student] = useState({
    name: "Aman Sharma",
    class: "8",
    section: "A",

    academic: {
      Maths: 85,
      Science: 78,
      English: 90
    },

    skills: {
      Communication: 7,
      Leadership: 6,
      Creativity: 8
    },

    character: {
      Discipline: 8,
      Respect: 9,
      Honesty: 7
    }
  });

  return (
    <div style={styles.container}>

      {/* 🔥 HEADER */}
      <div style={styles.header}>
        <h2>{student.name}</h2>
        <p>Class {student.class}-{student.section}</p>
      </div>

      {/* 🔥 ACADEMIC */}
      <div style={styles.card}>
        <h3>📚 Academic</h3>
        {Object.entries(student.academic).map(([sub, val]) => (
          <div key={sub} style={styles.row}>
            <span>{sub}</span>
            <span>{val}</span>
          </div>
        ))}
      </div>

      {/* 🔥 SKILLS */}
      <div style={styles.card}>
        <h3>🚀 Skills</h3>
        {Object.entries(student.skills).map(([skill, val]) => (
          <div key={skill} style={styles.row}>
            <span>{skill}</span>
            <span>{val}/10</span>
          </div>
        ))}
      </div>

      {/* 🔥 CHARACTER */}
      <div style={styles.card}>
        <h3>🧠 Character</h3>
        {Object.entries(student.character).map(([trait, val]) => (
          <div key={trait} style={styles.row}>
            <span>{trait}</span>
            <span>{val}/10</span>
          </div>
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
    color: "#fff",
    fontFamily: "sans-serif"
  },

  header: {
    marginBottom: "20px"
  },

  card: {
    background: "#1c1c1c",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px"
  }
};