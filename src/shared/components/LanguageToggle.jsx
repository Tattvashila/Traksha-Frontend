import React from "react";
import { setLanguage, getLanguage } from "../../state/languageStore";

export default function LanguageToggle() {
  const lang = getLanguage();

  const toggle = () => {
    const newLang = lang === "en" ? "hi" : "en";
    setLanguage(newLang);
    window.location.reload(); // simple refresh
  };

  return (
    <button onClick={toggle} style={styles.btn}>
      🌐 {lang === "en" ? "हिंदी" : "English"}
    </button>
  );
}

const styles = {
  btn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "6px 10px",
    borderRadius: "8px",
    border: "1px solid #FFE0B2",
    background: "#FFF8F0",
    cursor: "pointer",
    fontSize: "12px"
  }
};