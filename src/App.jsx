import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import LandingPage from './pages/public/LandingPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx';
import MemberDashboard from './pages/member/MemberDashboard.jsx';
import MemberLayout from './pages/member/layout/MemberLayout.jsx';
import BookingPage from './pages/member/BookingPage.jsx';
import AttendancePage from './pages/member/AttendancePage.jsx';
import PaymentPage from './pages/member/PaymentPage.jsx';
import WorkoutsPage from './pages/member/WorkoutsPage.jsx';
import QRCodePage from './pages/member/QRCodePage.jsx';
import ProfilePage from './pages/member/ProfilePage.jsx';
import TrainerLayout from './pages/trainer/layout/TrainerLayout.jsx';
import TrainerDashboard from './pages/trainer/TrainerDashboard.jsx';
import SchedulePage from './pages/trainer/SchedulePage.jsx';
import ClientsPage from './pages/trainer/ClientsPage.jsx';
import SessionsPage from './pages/trainer/SessionsPage.jsx';
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';
import AdminLayout from './pages/admin/layout/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ScannerPage from './pages/admin/ScannerPage.jsx';
import MembersPage from './pages/admin/MembersPage.jsx';
import TrainersPage from './pages/admin/TrainersPage.jsx';
import ReportsPage from './pages/admin/ReportsPage.jsx';
import SettingsPage from './pages/admin/SettingsPage.jsx';

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Member Routes - Protected */}
        <Route path="/member" element={<MemberLayout />}>
          <Route index element={<Navigate to="/member/dashboard" replace />} />
          <Route path="dashboard" element={<MemberDashboard />} />
          <Route path="qr" element={<QRCodePage />} />
          <Route path="bookings" element={<BookingPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="payments" element={<PaymentPage />} />
          <Route path="workouts" element={<WorkoutsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Trainer Routes - Protected */}
        <Route path="/trainer" element={<TrainerLayout />}>
          <Route index element={<Navigate to="/trainer/dashboard" replace />} />
          <Route path="dashboard" element={<TrainerDashboard />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="sessions" element={<SessionsPage />} />
        </Route>

        {/* Admin Routes - Protected */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="scanner" element={<ScannerPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="trainers" element={<TrainersPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch all - Redirect to Landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
