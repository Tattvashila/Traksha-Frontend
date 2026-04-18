import React from "react";
import { Routes, Route } from "react-router-dom";

// 🔐 AUTH
import LoginScreen from "../screens/LoginScreen.jsx";
import OtpScreen from "../screens/OtpScreen.jsx";
import Dashboard from "../screens/Dashboard.jsx";
import SignupScreen from "../screens/SignupScreen.jsx";

// 🎓 TATTVAPEETHA MODULE
import TattvapeethaDashboard from "../modules/tattvapeetha/TattvapeethaDashboard.jsx";
import StudentProfile from "../modules/tattvapeetha/StudentProfile.jsx";
import DailyTracking from "../modules/tattvapeetha/DailyTracking.jsx";
import ParentView from "../modules/tattvapeetha/ParentView.jsx";
import GrowthAnalytics from "../modules/tattvapeetha/GrowthAnalytics.jsx";
import WeeklyReport from "../modules/tattvapeetha/WeeklyReport.jsx";
import TeacherDashboard from "../modules/tattvapeetha/TeacherDashboard.jsx";

// 🔥 NEW INTELLIGENCE UI
import StudentHome from "../modules/tattvapeetha/StudentHome.jsx";
import ParentDashboard from "../modules/tattvapeetha/ParentDashboard.jsx";
import AIGuru from "../modules/tattvapeetha/AIGuru.jsx";

// 🔥 TEMP MODULE PLACEHOLDER
const Module = ({ name }) => (
  <div style={{ padding: 20 }}>
    <h2>{name}</h2>
    <p>Coming soon 🚀</p>
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>

      {/* 🔐 AUTH FLOW */}
      <Route path="/" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/otp" element={<OtpScreen />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* 🎓 TATTVAPEETHA */}
      <Route path="/tattvapeetha" element={<TattvapeethaDashboard />} />
      <Route path="/student" element={<StudentProfile />} />
      <Route path="/tracking" element={<DailyTracking />} />
      <Route path="/parent" element={<ParentView />} />
      <Route path="/analytics" element={<GrowthAnalytics />} />
      <Route path="/weekly" element={<WeeklyReport />} />
      <Route path="/teacher" element={<TeacherDashboard />} />

      {/* 🔥 NEW INTELLIGENCE UI */}
      <Route path="/student-home" element={<StudentHome />} />
      <Route path="/parent-dashboard" element={<ParentDashboard />} />
      <Route path="/ai-guru" element={<AIGuru />} />

      {/* 🔥 OTHER MODULES */}
      <Route path="/raksha" element={<Module name="Raksha" />} />
      <Route path="/vanatattva" element={<Module name="Vanatattva" />} />
      <Route path="/shreetattva" element={<Module name="Shreetattva" />} />
      <Route path="/clinic" element={<Module name="ClinicOS" />} />
      <Route path="/decision" element={<Module name="Decision Engine" />} />

    </Routes>
  );
}