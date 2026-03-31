import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ServicesManager from './pages/admin/ServicesManager';
import EmployeesManager from './pages/admin/EmployeesManager';
import GalleryManager from './pages/admin/GalleryManager';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-barber-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

// Public Layout
const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

// Admin Layout Wrapper
const AdminRoute = ({ element: Element }) => (
  <ProtectedRoute>
    <Element />
  </ProtectedRoute>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><main className="flex-1"><Home /></main><Footer /></>} />
          <Route path="/services" element={<><Navbar /><main className="flex-1"><Services /></main><Footer /></>} />
          <Route path="/gallery" element={<><Navbar /><main className="flex-1"><Gallery /></main><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><main className="flex-1"><Contact /></main><Footer /></>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute element={AdminDashboard} />} />
          <Route path="/admin/services" element={<AdminRoute element={ServicesManager} />} />
          <Route path="/admin/employees" element={<AdminRoute element={EmployeesManager} />} />
          <Route path="/admin/gallery" element={<AdminRoute element={GalleryManager} />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
