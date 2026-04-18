import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: "Home", path: "/dashboard" },
    { name: "Raksha", path: "/raksha" },
    { name: "Learn", path: "/tattvapeetha" },
    { name: "Store", path: "/vanatattva" }
  ];

  return (
    <div style={styles.nav}>
      {tabs.map((tab, i) => (
        <div
          key={i}
          onClick={() => navigate(tab.path)}
          style={{
            ...styles.tab,
            color:
              location.pathname === tab.path ? "#FFD700" : "#aaa"
          }}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
}

const styles = {
  nav: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: "60px",
    background: "#111",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderTop: "1px solid #222"
  },
  tab: {
    cursor: "pointer",
    fontSize: "14px"
  }
};