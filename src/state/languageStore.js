let currentLang = "en";

export function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("TRAKSHA_LANG", lang);
}

export function getLanguage() {
  return currentLang;
}

export function loadLanguage() {
  const saved = localStorage.getItem("TRAKSHA_LANG");
  if (saved) currentLang = saved;
}