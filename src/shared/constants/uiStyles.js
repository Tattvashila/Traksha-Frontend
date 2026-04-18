// =========================
// 🎨 COLOR SYSTEM (UPGRADED)
// =========================
export const colors = {
  bg: "#0F0F0F",
  glassBg: "rgba(255,255,255,0.06)",

  saffron: "#FF8C42",
  saffronSoft: "#FFA94D",
  saffronLight: "#FFE5C2",
  gold: "#FFD166",

  text: "#FFFFFF",
  subText: "#A1A1A6",

  card: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.08)",

  success: "#4CAF50",
  warning: "#FF9800",
  danger: "#FF4D4D",

  calmBg: "#1C1C1E",
  focusRing: "#FFD16666"
};

// =========================
// 🌿 GLASS EFFECT BASE
// =========================
export const glassEffect = {
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)"
};

// =========================
// 🌿 BASE CARD (UPGRADED)
// =========================
export const gurukulCard = {
  background: colors.glassBg,
  borderRadius: "18px",
  border: `1px solid ${colors.border}`,
  padding: "16px",
  ...glassEffect,
  boxShadow: "0 8px 32px rgba(0,0,0,0.35)"
};

// =========================
// 🌿 PRIMARY BUTTON (UPGRADED)
// =========================
export const primaryBtn = {
  background: "linear-gradient(135deg, #FFD166, #FFB300)",
  color: "#000",
  border: "none",
  borderRadius: "14px",
  padding: "12px 16px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(255,183,0,0.4)",
  transition: "all 0.2s ease"
};

// =========================
// 🔥 PREMIUM CARD (GLASS)
// =========================
export const premiumCard = {
  background: colors.glassBg,
  borderRadius: "20px",
  padding: "16px",
  border: `1px solid ${colors.border}`,
  ...glassEffect,
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
};

// =========================
// 🌿 SOFT CARD
// =========================
export const softCard = {
  background: "rgba(255,255,255,0.04)",
  borderRadius: "16px",
  padding: "14px",
  border: "1px solid rgba(255,255,255,0.06)"
};

// =========================
// 🌿 FLEX UTILITIES
// =========================
export const flexCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

export const flexBetween = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

// =========================
// 🌿 BADGE (MODERN)
// =========================
export const badge = {
  padding: "5px 10px",
  borderRadius: "999px",
  fontSize: "11px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff"
};

// =========================
// 🌿 DIVIDER
// =========================
export const divider = {
  height: "1px",
  background: "rgba(255,255,255,0.08)",
  margin: "12px 0"
};

// =========================
// 🌿 INTERACTION EFFECTS
// =========================
export const hoverScale = {
  transition: "all 0.2s ease"
};

export const pressEffect = {
  transform: "scale(0.96)"
};