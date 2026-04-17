import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingFallback from './components/LoadingFallback';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import PendingPage from './pages/PendingPage';

function ProtectedHome() {
  const { user, userStatus, isAdmin, loading } = useAuth();
  if (loading) return <LoadingFallback />;
  if (!user) return <Navigate to="/login" replace />;
  if (isAdmin || userStatus === 'approved') return <HomePage />;
  return <Navigate to="/pending" replace />;
}

function AdminRoute() {
  const { isAdmin, loading } = useAuth();
  if (loading) return <LoadingFallback />;
  if (!isAdmin) return <Navigate to="/login" replace />;
  return <AdminPage />;
}

function GuestOnly({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingFallback />;
  if (user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<ProtectedHome />} />
            <Route path="/login" element={<GuestOnly><LoginPage /></GuestOnly>} />
            <Route path="/admin" element={<AdminRoute />} />
            <Route path="/pending" element={<PendingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}
