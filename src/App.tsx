import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminLeads from "@/pages/AdminLeads";
import AdminNews from "@/pages/AdminNews";
import AdminCMS from "@/pages/AdminCMS";
import AdminPerformance from "@/pages/AdminPerformance";
import AdminViews from "@/pages/AdminViews";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/leads" element={<AdminLeads />} />
        <Route path="/admin/cms" element={<AdminCMS />} />
        <Route path="/admin/noticias" element={<AdminNews />} />
        <Route path="/admin/performance" element={<AdminPerformance />} />
        <Route path="/admin/acessos" element={<AdminViews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
