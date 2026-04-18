export function getAdaptiveTheme({ state, role }) {
  const base = {
    bg: "#121212",
    text: "#fff",
    subText: "#A1A1A6",
    saffron: "#FF8C42",
    gold: "#FFD166"
  };

  const stateMap = {
    CALM: {
      aura: "rgba(255,140,66,0.06)",
      intensity: 0.08
    },
    LOW_FOCUS: {
      aura: "rgba(255,140,66,0.10)",
      intensity: 0.12
    },
    DISTRACTED: {
      aura: "rgba(255,140,66,0.14)",
      intensity: 0.16
    },
    HIGH_PERFORMANCE: {
      aura: "rgba(255,209,102,0.12)",
      intensity: 0.18
    }
  };

  const roleMap = {
    SHISHYA: { accent: base.saffron },
    ABHIBHAVAK: { accent: "#6EC6FF" },
    GURU: { accent: "#A78BFA" },
    ADMIN: { accent: base.gold }
  };

  const s = stateMap[state] || stateMap.CALM;
  const r = roleMap[role] || roleMap.SHISHYA;

  return {
    ...base,
    ...s,
    ...r,

    background: `
      radial-gradient(circle at 20% 20%, ${s.aura}, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(255,209,102,0.06), transparent 40%),
      ${base.bg}
    `,

    ctaShadow: `0 6px 20px rgba(255,140,66, ${s.intensity})`
  };
}