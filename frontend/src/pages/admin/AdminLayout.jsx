import { Link } from 'react-router-dom';
import { Scissors, Users, Image, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/services', icon: Scissors, label: 'Services' },
    { to: '/admin/employees', icon: Users, label: 'Employees' },
    { to: '/admin/gallery', icon: Image, label: 'Gallery' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-barber-800 border-r border-barber-700 hidden md:flex flex-col">
        <div className="p-6 border-b border-barber-700">
          <Link to="/" className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-barber-gold" />
            <span className="font-display text-lg font-bold text-white">Classic Cuts</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-barber-700 rounded-md transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-barber-700">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 w-full rounded-md transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-barber-800 border-b border-barber-700 p-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold text-white">Admin Panel</span>
            <button onClick={logout} className="text-gray-400 hover:text-red-400">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
