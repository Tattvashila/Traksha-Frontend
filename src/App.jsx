import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

// 🔐 AUTH INIT
import { initAuthStore } from "./state/authStore";

// 🌐 LANGUAGE INIT (NEW)
import { loadLanguage } from "./state/languageStore";

export default function App() {

  useEffect(() => {
    // 🔥 RESTORE USER
    initAuthStore();

    // 🌐 LOAD LANGUAGE (NEW)
    loadLanguage();

  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}