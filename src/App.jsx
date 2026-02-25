import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/public/LandingPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx';
import MemberDashboard from './pages/member/MemberDashboard.jsx';
import QRCodePage from './pages/member/QRCodePage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      {/* Protected Routes would go here later */}
      <Route path="/member/dashboard" element={<MemberDashboard />} />
      <Route path="/member/qr" element={<QRCodePage />} />
    </Routes>
  );
}

export default App;
