import React from "react";

export default function RakshaAI() {
  return (
    <div style={styles.fab}>
      🤖
    </div>
  );
}

const styles = {
  fab: {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    background: "#FFD700",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    cursor: "pointer",
    boxShadow: "0 0 15px rgba(255,215,0,0.6)"
  }
};