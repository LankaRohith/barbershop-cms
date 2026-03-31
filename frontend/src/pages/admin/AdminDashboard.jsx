import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Users, Image, TrendingUp } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getAdminServices, getAdminEmployees, getAdminGallery } from '../../api/index.js';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    services: 0,
    employees: 0,
    gallery: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [servicesRes, employeesRes, galleryRes] = await Promise.all([
          getAdminServices(),
          getAdminEmployees(),
          getAdminGallery(),
        ]);
        setStats({
          services: servicesRes.data.length,
          employees: employeesRes.data.length,
          gallery: galleryRes.data.length
        });
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      }
    };
    fetchCounts();
  }, []);

  const statItems = [
    { 
      title: 'Services', 
      value: stats.services, 
      icon: Scissors, 
      color: 'text-barber-gold',
      link: '/admin/services'
    },
    { 
      title: 'Employees', 
      value: stats.employees, 
      icon: Users, 
      color: 'text-blue-400',
      link: '/admin/employees'
    },
    { 
      title: 'Gallery Images', 
      value: stats.gallery, 
      icon: Image, 
      color: 'text-green-400',
      link: '/admin/gallery'
    },
  ];

  const quickActions = [
    { label: 'Add New Service', link: '/admin/services', description: 'Create a new service offering' },
    { label: 'Add Employee', link: '/admin/employees', description: 'Add a new team member' },
    { label: 'Upload Image', link: '/admin/gallery', description: 'Add to gallery' },
  ];

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-3xl font-bold text-white mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statItems.map((stat) => (
            <Link
              key={stat.title}
              to={stat.link}
              className="card hover:border-barber-gold/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-10 h-10 ${stat.color}`} />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="font-display text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.link}
              className="card hover:border-barber-gold/50 transition-colors"
            >
              <h3 className="font-medium text-white">{action.label}</h3>
              <p className="text-gray-400 text-sm mt-1">{action.description}</p>
            </Link>
          ))}
        </div>

        {/* Info Card */}
        <div className="card mt-8 bg-barber-gold/5 border-barber-gold/20">
          <div className="flex items-start gap-4">
            <TrendingUp className="w-6 h-6 text-barber-gold shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-white">Getting Started</h3>
              <p className="text-gray-400 text-sm mt-1">
                Use the sidebar to manage your services, team members, and gallery. 
                All changes are saved instantly and reflected on the public website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
